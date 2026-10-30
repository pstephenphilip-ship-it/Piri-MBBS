// build_B5_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B5 The human body – staying alive, B5.1 How do substances get into, out of and around our bodies?
// (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B5_1.js
// Structure copied from build_B4_3.js. ocr_bio_template.js is NOT edited by this deck: cube, vessel (tube), heart,
// lungs, villus, blood-cell and agar-cube helpers are in the DECK-SPECIFIC block below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B5', chapterTitle: 'The human body – staying alive', code: 'B5.1', title: 'How do substances get into, out of and around our bodies?',
  part: 1, parts: 6, specRange: 'B5.1.1–B5.1.6',
  subtitle: 'How do substances get into, out of and around our bodies?',
  keywords: ['Exchange surfaces', 'SA:V ratio', 'Alveoli', 'Villi', 'Double circulation', 'Heart', 'Blood vessels', 'Blood'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
// slide 6: SA:V of cubes
const cubeSA = a => 6 * a * a, cubeV = a => a ** 3, cubeR = a => cubeSA(a) / cubeV(a);
const CUBES = [1, 2, 4];
[6, 24, 96].forEach((v, i) => calc(`SA of ${CUBES[i]} cm cube`, cubeSA(CUBES[i]), v));
[1, 8, 64].forEach((v, i) => calc(`V of ${CUBES[i]} cm cube`, cubeV(CUBES[i]), v));
[6, 3, 1.5].forEach((v, i) => calc(`SA:V of ${CUBES[i]} cm cube`, cubeR(CUBES[i]), v));
calc('WE 3 cm cube SA', cubeSA(3), 54); calc('WE 3 cm cube V', cubeV(3), 27); calc('WE 3 cm cube ratio', cubeR(3), 2);
calc('QC 5 cm cube SA', cubeSA(5), 150); calc('QC 5 cm cube V', cubeV(5), 125); calc('QC 5 cm cube ratio', cubeR(5), 1.2);
// slide 7: diffusion distance
calc('distance 100 mm / 0.1 mm', 100 / 0.1, 1000);
calc('QC 2 cm cube SA:V', cubeR(2), 3);
// practical (slides 9–10): agar cubes in acid; illustrative class data
const AG = [
  [0.5, [82, 88, 85]],
  [1.0, [325, 338, 327]],
  [1.5, [752, 731, 752]],
  [2.0, [1301, 1342, 1317]],
];
const agSA = AG.map(([a]) => cubeSA(a)), agV = AG.map(([a]) => cubeV(a)), agR = AG.map(([a]) => cubeR(a));
[1.5, 6, 13.5, 24].forEach((v, i) => calc(`agar SA ${AG[i][0]} cm`, agSA[i], v));
[0.125, 1, 3.375, 8].forEach((v, i) => calc(`agar V ${AG[i][0]} cm`, agV[i], v));
[12, 6, 4, 3].forEach((v, i) => calc(`agar SA:V ${AG[i][0]} cm`, agR[i], v));
const agMean = AG.map(([, t]) => t.reduce((a, b) => a + b, 0) / t.length);
[85, 330, 745, 1320].forEach((v, i) => calc(`agar mean time ${AG[i][0]} cm`, agMean[i], v));
const agRange = AG.map(([, t]) => Math.max(...t) - Math.min(...t));
[6, 13, 21, 41].forEach((v, i) => calc(`agar range ${AG[i][0]} cm`, agRange[i], v));
const agK = 11880; // model curve t = 11880 / (SA:V)^2  (time ∝ distance², distance = half side)
[82.5, 330, 742.5, 1320].forEach((v, i) => calc(`agar model ${AG[i][0]} cm`, agK / agR[i] ** 2, v));
calc('agar 1320 s in minutes', 1320 / 60, 22);
calc('R2 0.5 cm cube ratio', cubeR(0.5), 12);
// slide 12: alveoli
calc('alveolus + capillary wall 0.0005 + 0.0005 mm', 0.0005 + 0.0005, 0.001, 1e-12);
calc('0.001 mm in µm', 0.001 * 1000, 1, 1e-12);
// slide 13: villus as a cylinder, h = 1 mm, d = 0.1 mm
const vilSide = calc('villus side area π d h', Math.PI * 0.1 * 1, 0.3141592653589793, 1e-12);
const vilBase = calc('villus base area π r²', Math.PI * 0.05 ** 2, 0.007853981633974483, 1e-12);
calc('villus area ratio', vilSide / vilBase, 40, 1e-9);
calc('villus side area 2 s.f.', sf(vilSide, 2), 0.31, 1e-12);
// slide 17: heart
calc('volume per minute 70 × 72', 70 * 72, 5040);
calc('5040 cm³ in dm³', 5040 / 1000, 5.04, 1e-12);
calc('QC beats per hour 70 × 60', 70 * 60, 4200);
// slide 19: vessels
calc('artery wall / capillary wall 1 / 0.001', 1 / 0.001, 1000, 1e-9);
// slide 20: blood
const PL = 55, RB = 44, WP = 1;
calc('blood fractions sum', PL + RB + WP, 100);
calc('plasma in 5 dm³ 5 × 0.55', 5 * PL / 100, 2.75, 1e-12);
calc('QC red cells in 5 dm³ 5 × 0.44', 5 * RB / 100, 2.2, 1e-12);
// full question and homework
calc('FQ 3 cm cube ratio', cubeR(3), 2);
calc('HW 4 cm cube SA', cubeSA(4), 96); calc('HW 4 cm cube V', cubeV(4), 64); calc('HW 4 cm ratio', cubeR(4), 1.5);
calc('HW 1 cm ratio', cubeR(1), 6);
calc('HW ratio comparison 6 / 1.5', 6 / 1.5, 4);

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
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const fmt = v => String(+v.toFixed(6));
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
const plain = t => T.rich(t, {}).map(x => x.text).join('');

// blood colours: oxygenated red, deoxygenated blue (convention in diagrams)
const OX = 'D9534F', OXE = '8E2A33', OXL = 'F6C4C4';
const DE = '4F7FC9', DEE = '1F4E8C', DEL = 'C3D6F2';
const MUS = 'E3A99B', MUSE = '8E4A3A';
const GLOW = 'F5A742';

// isometric cube: front face a×a at (x, y + d); d = depth offset
function cube(s, x, y, a, o = {}) {
  const d = o.d != null ? o.d : a * 0.4, f = o.fill || 'F4B6C8', e = o.edge || '9E3B5E';
  poly(s, [[x, y + d], [x + d, y], [x + d + a, y], [x + a, y + d]], o.top || 'F9D3DF', e, { lw: 1 });
  poly(s, [[x + a, y + d], [x + a + d, y], [x + a + d, y + a], [x + a, y + a + d]], o.side || 'E58FAE', e, { lw: 1 });
  box(s, x, y + d, a, a, f, e, { lw: 1 });
  return { x, y: y + d, a, d };
}
// tube along a polyline: a dark edge line under a coloured fill line; w = tube width in inches
function vessel(s, pts, fill, edge, w = 0.28) {
  const pe = w * 72 + 3, pf = w * 72;
  for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], edge, pe);
  pts.slice(1, -1).forEach(([x, y]) => ball(s, x, y, w / 2 + 1.5 / 72, edge, edge, 0));
  for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], fill, pf);
  pts.slice(1, -1).forEach(([x, y]) => ball(s, x, y, w / 2, fill, fill, 0));
}
// red blood cell face-on (pale centre) and side-on (biconcave: thick rim, thin middle)
function rbc(s, cx, cy, r) { ball(s, cx, cy, r, OX, OXE, 1); ball(s, cx, cy, r * 0.45, 'EE8A8F', 'EE8A8F'); }
function rbcSide(s, cx, cy, w) {
  const r = w * 0.17;
  box(s, cx - w / 2 + r, cy - r * 0.45, w - 2 * r, r * 0.9, OX, null);
  ball(s, cx - w / 2 + r, cy, r, OX, OXE, 1); ball(s, cx + w / 2 - r, cy, r, OX, OXE, 1);
  line(s, cx - w / 2 + r, cy - r * 0.45, cx + w / 2 - r, cy - r * 0.45, OXE, 1);
  line(s, cx - w / 2 + r, cy + r * 0.45, cx + w / 2 - r, cy + r * 0.45, OXE, 1);
  box(s, cx - w / 2 + r * 0.9, cy - r * 0.43, w - 1.8 * r, r * 0.86, OX, null);
}
function wbc(s, cx, cy, r) {
  ball(s, cx, cy, r, 'EEEAF7', '6A4C93', 1);
  [[-0.35, -0.2], [0.25, -0.25], [0, 0.3]].forEach(([dx, dy]) => ball(s, cx + dx * r, cy + dy * r, r * 0.3, '8C7BC0', '5A4A99', 0.5));
}
// small flow arrow
const flow = (s, x1, y1, x2, y2, col = C.ink) => arrow(s, x1, y1, x2, y2, col, 1.5);
// leader line + label; side 'l' (text right-aligned ending at x) or 'r' (text starts at x)
function tag(s, px, py, tx, ty, t, side, w = 1.7, o = {}) {
  line(s, px, py, tx, ty, o.lc || C.ink, 0.75);
  if (side === 'l') label(s, tx - w - 0.04, ty - (o.h || 0.28) / 2, w, t, { size: o.size || 10.5, align: 'right', h: o.h, bold: o.bold, color: o.color });
  else label(s, tx + 0.04, ty - (o.h || 0.28) / 2, w, t, { size: o.size || 10.5, align: 'left', h: o.h, bold: o.bold, color: o.color });
}
// node chain box
function node(s, x, y, w, h, t, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: o.lw || 1 });
  label(s, x + 0.04, y, w - 0.08, t, { size: o.size || 10, h, bold: o.bold, color: o.color });
}

// ---------- the heart (front view: the person's RIGHT side is on the viewer's LEFT) ----------
// fixed layout designed for the panel x 0.45–7.65, y 1.3–6.25. Returns nothing; draws labels too.
function heart(s) {
  // vena cava (superior and inferior) as one tube on the left, entering the right atrium
  vessel(s, [[2.1, 1.5], [2.1, 3.0], [2.62, 3.0]], DE, DEE, 0.3);
  vessel(s, [[2.1, 5.75], [2.1, 3.0]], DE, DEE, 0.3);
  // heart muscle body
  box(s, 2.4, 2.62, 3.2, 3.13, MUS, MUSE, { shape: SH.ROUNDED_RECTANGLE, r: 0.45, lw: 1.5 });
  // cavities
  box(s, 2.62, 2.8, 0.72, 0.75, DEL, DEE, { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1 }); // RA
  box(s, 4.62, 2.8, 0.72, 0.75, OXL, OXE, { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1 }); // LA
  box(s, 2.62, 3.8, 1.18, 1.62, DEL, DEE, { shape: SH.ROUNDED_RECTANGLE, r: 0.18, lw: 1 }); // RV (thin wall 0.22)
  box(s, 4.1, 3.8, 0.92, 1.33, OXL, OXE, { shape: SH.ROUNDED_RECTANGLE, r: 0.18, lw: 1 }); // LV (thick wall 0.58)
  // atrioventricular openings + valves (flaps point into the ventricle)
  box(s, 2.72, 3.5, 0.52, 0.35, DEL, null);
  box(s, 4.66, 3.5, 0.32, 0.35, OXL, null);
  const flaps = (x1, x2, y, col) => { line(s, x1, y, x1 + 0.13, y + 0.26, col, 3); line(s, x2, y, x2 - 0.13, y + 0.26, col, 3); };
  flaps(2.72, 3.24, 3.56, 'F5F5F5'); flaps(4.66, 4.98, 3.56, 'F5F5F5');
  flaps(2.72, 3.24, 3.56, C.ink); flaps(4.66, 4.98, 3.56, C.ink);
  // pulmonary artery from the right ventricle (blue), branches to both lungs; drawn before the aorta (it passes behind)
  vessel(s, [[3.56, 3.95], [3.56, 2.25]], DE, DEE, 0.3);
  vessel(s, [[2.62, 2.25], [5.15, 2.25]], DE, DEE, 0.26);
  // aorta from the left ventricle (red), arches over and down
  vessel(s, [[4.28, 3.95], [4.28, 1.75], [4.55, 1.5], [5.6, 1.5], [5.95, 1.8], [5.95, 2.45]], OX, OXE, 0.32);
  // pulmonary veins into the left atrium (red)
  vessel(s, [[6.45, 2.98], [5.3, 2.98]], OX, OXE, 0.22);
  vessel(s, [[6.45, 3.36], [5.3, 3.36]], OX, OXE, 0.22);
  // semilunar valves at the base of the arteries
  [[3.56, 0.3], [4.28, 0.32]].forEach(([x, w]) => { line(s, x - w / 2 + 0.03, 3.62, x, 3.78, C.ink, 2.25); line(s, x + w / 2 - 0.03, 3.62, x, 3.78, C.ink, 2.25); });
  // chamber names inside
  label(s, 2.62, 2.8, 0.72, 'right\natrium', { size: 10, bold: true, color: DEE, h: 0.75 });
  label(s, 4.62, 2.8, 0.72, 'left\natrium', { size: 10, bold: true, color: OXE, h: 0.75 });
  label(s, 2.62, 4.55, 1.18, 'right\nventricle', { size: 10.5, bold: true, color: DEE, h: 0.6 });
  label(s, 4.1, 4.45, 0.92, 'left\nventricle', { size: 10.5, bold: true, color: OXE, h: 0.6 });
  // flow arrows (white on vessels, ink in chambers)
  flow(s, 2.1, 1.75, 2.1, 2.3, C.white); flow(s, 2.1, 5.45, 2.1, 4.6, C.white);
  flow(s, 2.95, 3.25, 2.95, 4.05, DEE); flow(s, 3.4, 4.5, 3.56, 4.02, DEE);
  flow(s, 3.56, 3.3, 3.56, 2.55, C.white);
  flow(s, 3.25, 2.25, 2.7, 2.25, C.white); flow(s, 4.6, 2.25, 5.12, 2.25, C.white);
  flow(s, 4.82, 3.2, 4.82, 4.05, OXE); flow(s, 4.42, 4.45, 4.28, 4.02, OXE);
  flow(s, 4.28, 3.3, 4.28, 2.0, C.white); flow(s, 5.95, 1.95, 5.95, 2.42, C.white);
  flow(s, 6.4, 2.98, 5.8, 2.98, C.white); flow(s, 6.4, 3.36, 5.8, 3.36, C.white);
  // labels: left side
  tag(s, 2.0, 1.62, 1.75, 1.62, '**vena cava** from the body', 'l', 1.25, { h: 0.45 });
  tag(s, 2.68, 2.25, 1.9, 2.4, '**pulmonary artery** to the lungs', 'l', 1.3, { h: 0.45 });
  tag(s, 2.8, 3.72, 1.75, 3.72, '**valve**: stops backflow into the atrium', 'l', 1.25, { h: 0.6, size: 10 });
  tag(s, 2.5, 4.95, 1.75, 4.95, 'thin wall: pumps to the **lungs**', 'l', 1.25, { h: 0.45, size: 10 });
  tag(s, 2.0, 5.55, 1.75, 5.55, 'vena cava', 'l', 1.25, { size: 10 });
  // labels: right side
  tag(s, 5.6, 1.5, 6.0, 1.42, '**aorta** to the body', 'r', 1.55, { h: 0.45 });
  label(s, 4.48, 1.86, 1.4, 'to the lungs', { size: 10, italic: true, color: DEE, align: 'left', h: 0.24 });
  tag(s, 6.45, 3.17, 6.55, 3.17, '**pulmonary vein** from the lungs', 'r', 1.05, { h: 0.6, size: 10 });
  tag(s, 5.4, 4.6, 6.0, 4.6, 'thick wall of **cardiac muscle**: pumps to the whole **body**', 'r', 1.6, { h: 0.6, size: 10 });
  tag(s, 4.92, 3.68, 6.0, 3.92, '**valves**: one-way flow', 'r', 1.45, { size: 10 });
  line(s, 4.42, 3.72, 6.0, 3.92, C.ink, 0.75);
  tag(s, 3.95, 5.32, 6.0, 5.32, '**septum**: keeps the two sides apart', 'r', 1.6, { h: 0.45, size: 10 });
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Exchange and transport',
  footer: 'OCR J260 Combined Science B • B5.1 How do substances get into, out of and around our bodies? • teacher deck • mark schemes and answers in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • suggested practical: modelling SA:V with agar cubes` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found • stretch marked' },
    { icon: '♥', text: 'SA:V • exchange surfaces • alveoli • villi • double circulation • heart • vessels • blood' },
  ],
  notes: 'B5.1 How do substances get into, out of and around our bodies? is Part 1 of 6 in J260 Chapter B5 (B5.1–B5.6). The OCR Summer 2022 J260 advance information lists all six B5 sections for both the Foundation and Higher papers.\nStatement wordings come from search extracts (ocr.org.uk and the spec mirrors could not be fetched): see SPEC_B5_1.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B5.1.1', text: 'Describe the **substances** transported into and out of organisms: oxygen, carbon dioxide, water, dissolved food molecules, mineral ions, urea.' },
  { code: 'B5.1.2', text: 'Calculate **surface area : volume ratios** and explain why multicellular organisms need **exchange surfaces**.' },
  { code: 'B5.1.2', text: 'Explain why large organisms need a **transport system**, using diffusion distance and SA:V.' },
  { code: 'B5.1.2', text: 'Model the effect of SA:V on diffusion with **agar cubes** (suggested practical) and analyse the data.' },
  { code: 'B5.1.3', text: 'Explain how the **alveoli** and the **villi** are adapted for exchange (gas exchange and digestive systems).' },
  { code: 'B5.1.3', text: 'Describe the **double circulatory system** and how it links to the gas exchange, digestive and excretory systems.' },
  { code: 'B5.1.4', text: 'Label the **heart** and explain how its cardiac muscle, chambers and valves are adapted to its function.' },
  { code: 'B5.1.5', text: 'Explain how **arteries**, **veins** and **capillaries** are adapted, including their walls and valves.' },
  { code: 'B5.1.6', text: 'Explain how **red blood cells** and **plasma** are adapted to their transport functions.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'No B5.1 statement was found to be Higher tier only (bold) in J260 (UNVERIFIED). Oak National Academy runs the OCR combined science lessons on the heart and double circulatory system, diffusion and SA:V, and blood cells and vessels in BOTH its Foundation and Higher programmes, which suggests no HT-only content.\nNumbering B5.1.1–B5.1.6 is inferred from the order of the statements in search extracts (UNVERIFIED). The wording of B5.1.3–B5.1.6 was found in extracts; B5.1.1 and B5.1.2 are paraphrased. Alveoli and villi are taught as exchange surfaces under B5.1.2/B5.1.3 (relationships with the gas exchange and digestive systems). Check SPEC_B5_1.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B5 The human body – staying alive • B5.1 is Part 1 of 6 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B5.1.1, B5.1.2', 'Substances moved; SA:V and exchange surfaces', 'Both tiers', C.blue],
    ['Practical', 'Modelling SA:V and diffusion with agar cubes', 'Practical', C.orange],
    ['B5.1.2, B5.1.3', 'Exchange surfaces: alveoli and villi', 'Both tiers', C.blue],
    ['B5.1.3, B5.1.4', 'Double circulation and the heart', 'Both tiers', C.blue],
    ['B5.1.5, B5.1.6', 'Arteries, veins, capillaries; red cells and plasma', 'Both tiers', C.blue],
    ['B5.1.3', 'Putting it together: journeys around the body', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B5.1\nExchange and transport', { size: 11, bold: true, color: C.white, h: 0.75 });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B2 white blood cells • B3 diffusion, osmosis, active transport • B4.1 respiration • B4.3 stem cells', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.3, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**B5.1 How do substances get into, out of and around our bodies?** (this deck)',
      'B5.2 How does the nervous system help us respond to changes?',
      'B5.3 How do hormones control responses in the human body?',
      'B5.4 Why do we need to maintain a constant internal environment?',
      'B5.5 What role do hormones play in human reproduction?',
      'B5.6 What can happen when organs and control systems stop working?',
    ], { size: 11, color: 'E3F2F0' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 3.1, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.8, 5.53, 2.05, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Every slide is for both tiers: no B5.1 statement was found to be Higher only.',
      'Maths: **SA:V ratios**, means, unit conversions and a graph.',
      'Diagrams of the heart show the person\'s **right** side on **your left**.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.9, w: 5.15, h: 1.85, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B5 has six sub-topics, B5.1–B5.6; the OCR Summer 2022 J260 advance information lists all six for both tiers (search extract).\nOverlap control: diffusion, osmosis and active transport are taught in Chapter B3 of this series (recap only here). The kidneys and water balance belong to B5.4 and are only named here as the organ that removes urea. Heart disease and risk factors belong to Chapter B2 and are not taught here. White blood cells and defence are B2: named only as a component of blood.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B3 • diffusion', q: 'Define **diffusion**. Give **one** way to make diffusion faster.' },
  { from: 'B4.1 • respiration', q: 'Write the **word equation** for aerobic respiration.' },
  { from: 'B4.2 • cell structures', q: 'Name the organelle where aerobic respiration happens. Which cell part controls what enters and leaves?' },
  { from: 'B4.3 • stem cells', q: 'Adult stem cells in **bone marrow** make three types of cell. Name them.' },
  { from: 'B2 • keeping healthy', q: 'Give **one** way that white blood cells protect the body from pathogens.' },
  { from: 'KS3 • breathing', q: 'Name the tube that carries air from the mouth towards the lungs. Which gas do we need to take in?' },
], { subtitle: 'Recall from B2, B3, B4.1, B4.2, B4.3 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. The net movement of particles from a region of higher concentration to a region of lower concentration (down a concentration gradient). Faster with: a steeper concentration gradient, a higher temperature, a larger surface area, a shorter distance.\n2. glucose + oxygen → carbon dioxide + water (energy released / ATP made).\n3. Mitochondria. The cell membrane.\n4. Red blood cells, white blood cells, platelets.\n5. Any one: engulf / ingest pathogens (phagocytosis); make antibodies; make antitoxins.\n6. Trachea (windpipe). Oxygen.' }), 'Retrieval starter');

// ======================= 5 SUBSTANCES IN AND OUT =======================
reg(D.contentSlide({
  title: 'What goes in and out of the body?',
  subtitle: `Specification ${sp('B5.1.1')} • substances organisms must take in or get rid of, and why`,
  tag: 'B5.1.1', caption: 'a simplified human: where each substance enters (green) or leaves (red)',
  draw: (s, p) => {
    // body outline (shifted right to leave room for the labels)
    const X = 0.4;
    ball(s, 2.1 + X, 1.85, 0.36, 'F6E3D3', 'B07A50', 1.25);
    box(s, 1.45 + X, 2.3, 1.3, 2.4, 'F6E3D3', 'B07A50', { shape: SH.ROUNDED_RECTANGLE, r: 0.35, lw: 1.25 });
    box(s, 1.55 + X, 4.6, 0.48, 1.15, 'F6E3D3', 'B07A50', { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1.25 });
    box(s, 2.17 + X, 4.6, 0.48, 1.15, 'F6E3D3', 'B07A50', { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1.25 });
    oval(s, 1.82 + X, 2.85, 0.42, 0.7, 'F4B6B6', OXE, { lw: 1 }); oval(s, 2.38 + X, 2.85, 0.42, 0.7, 'F4B6B6', OXE, { lw: 1 });
    line(s, 2.1 + X, 2.15, 2.1 + X, 2.6, '8C96A8', 3);
    box(s, 1.7 + X, 3.55, 0.8, 0.55, 'F2D29B', 'B8730A', { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1 });
    oval(s, 1.72 + X, 4.3, 0.2, 0.3, 'B5651D', '7A3E10'); oval(s, 2.48 + X, 4.3, 0.2, 0.3, 'B5651D', '7A3E10');
    label(s, 1.55 + X, 3.25, 1.1, 'lungs', { size: 10, bold: true, h: 0.22 });
    label(s, 1.7 + X, 3.55, 0.8, 'gut', { size: 10, bold: true, h: 0.55 });
    label(s, 1.6 + X, 4.47, 1.0, 'kidneys', { size: 10, bold: true, h: 0.22 });
    // in arrows (left, green): label right-aligned just before the arrow tail
    const IN = [[2.0, 'oxygen', 2.1 + X - 0.25, 2.75], [3.05, 'water', 1.7 + X, 3.65], [3.55, 'dissolved food molecules', 1.7 + X, 3.82], [4.15, 'mineral ions', 1.7 + X, 3.98]];
    IN.forEach(([y, t, tx, ty]) => { arrow(s, 1.3, y, tx, ty, C.green, 2); label(s, 0.52, y - 0.25, 0.76, t, { size: 10, bold: true, color: C.green, h: 0.5, align: 'right' }); });
    // out arrows (right, red)
    const OUT = [[2.75, 'carbon dioxide', 2.0], [3.05, 'water (breath)', 2.55], [4.3, 'urea (in urine)', 4.55], [3.95, 'water (urine, sweat)', 5.0]];
    OUT.forEach(([fy, t, ty]) => { arrow(s, 2.6 + X, fy, 3.55, ty, C.red, 2); label(s, 3.6, ty - 0.14, 1.25, t, { size: 10, bold: true, color: C.red, h: 0.28, align: 'left' }); });
    // other organisms
    box(s, 4.85, 1.45, 1.55, 2.3, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.9, 1.48, 1.45, 'Other organisms', { size: 10.5, bold: true, color: C.blue, h: 0.26 });
    oval(s, 5.2, 2.0, 0.5, 0.36, 'E6F0F5', '7FA9C4', { lw: 1 }); ball(s, 5.2, 2.0, 0.07, C.nucleus, C.nucleusEdge);
    label(s, 4.95, 2.22, 1.4, 'single cell: all through its membrane', { size: 10, h: 0.5, align: 'left', valign: 'top' });
    oval(s, 5.2, 2.92, 0.5, 0.22, C.chloro, C.chloroEdge, { rot: -20 });
    label(s, 4.95, 3.08, 1.4, 'plant: gases at leaves; water, ions at roots', { size: 10, h: 0.6, align: 'left', valign: 'top' });
  },
  head: 'Substances that must be transported',
  lines: [
    '**Oxygen** in: for aerobic **respiration**, which releases energy.',
    '**Carbon dioxide** out: a waste product of respiration.',
    '**Water** in and out: cells are mostly water; keeps the balance.',
    '**Dissolved food molecules** in (glucose, amino acids): for respiration and growth.',
    '**Mineral ions** in (e.g. iron for haemoglobin).',
    '**Urea** out: a waste made in the liver from excess amino acids; removed by the kidneys.',
  ],
  size: 11,
  worked: { head: 'Worked example: in or out?', q: 'A muscle cell is respiring. Which substances must reach it, and which must be removed?',
    steps: [['Needs', 'glucose and oxygen for aerobic respiration'], ['Makes', 'carbon dioxide and water'], ['Removed', 'carbon dioxide must be taken away (it is toxic in excess)'], ['Answer', 'in: glucose, oxygen • out: carbon dioxide']], size: 10.5 },
  workedH: 1.95,
  qc: 'Name the **waste** substance made from excess amino acids. Which organ removes it from the blood?',
  notes: 'QUICK CHECK ANSWER: Urea. The kidneys (it leaves the body in urine).\nB5.1.1 wording (search extract and J257 copies): describe some of the substances transported into and out of a range of organisms in terms of their requirements, including oxygen, carbon dioxide, water, dissolved food molecules, mineral ions and urea. Mineral ions are from memory (UNVERIFIED). How the kidneys make urine is B5.4: name only. Urea is made in the liver (deamination is not required).',
}), 'B5.1.1 Substances in and out');

// ======================= 6 SA:V RATIO =======================
reg(D.contentSlide({
  title: 'Surface area to volume ratio',
  subtitle: `Specification ${sp('B5.1.2')} • as an organism gets bigger, its surface area : volume ratio gets smaller`,
  tag: 'B5.1.2', caption: 'cubes drawn to the same scale (1 cm = 0.38 in)',
  draw: (s, p) => {
    const k = 0.38, base = 3.75;
    const xs = [0.95, 2.05, 3.65];
    CUBES.forEach((a, i) => {
      const L = a * k, d = L * 0.4;
      cube(s, xs[i], base - L - d, L, { d });
      label(s, xs[i] - 0.3, base + 0.06, L + d + 0.6, `side ${a} cm`, { size: 10.5, bold: true, h: 0.26 });
    });
    const rows = [[HDR('Side / cm'), HDR('Surface area / cm²'), HDR('Volume / cm³'), HDR('SA : V')],
      ...CUBES.map((a, i) => [tcell(String(a), i, { bold: true }), tcell(`6 × ${a} × ${a} = ${cubeSA(a)}`, i), tcell(`${a} × ${a} × ${a} = ${cubeV(a)}`, i), tcell(`${fmt(cubeR(a))} : 1`, i, { bold: true, color: C.red })])];
    s.addTable(rows, { x: 0.65, y: 4.25, w: 5.7, colW: [1.0, 1.75, 1.75, 1.2], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    label(s, 0.65, 5.55, 5.7, 'Side doubles → area × 4, volume × 8 → SA:V halves', { size: 10.5, bold: true, color: C.blue });
  },
  head: 'Why size matters',
  lines: [
    'Substances enter and leave through the **surface**. The **volume** decides how much the organism needs and makes.',
    '**SA : V ratio** = surface area ÷ volume.',
    'As size increases, **volume grows faster** than surface area, so the **SA:V ratio falls**.',
    'A large organism has too little surface for its volume to exchange enough by diffusion.',
  ],
  size: 11,
  worked: { head: 'Worked example: a 3 cm cube', q: 'Calculate the SA:V ratio of a cube with sides of 3 cm.',
    steps: [['Area', 'SA = 6 × 3 × 3 = 54 cm²'], ['Volume', 'V = 3 × 3 × 3 = 27 cm³'], ['Ratio', 'SA : V = 54 : 27'], ['Answer', 'divide both by 27: 2 : 1']], size: 10.5 },
  qc: 'Calculate the SA:V ratio of a cube with sides of **5 cm**. Is it larger or smaller than for the 4 cm cube?',
  notes: `QUICK CHECK ANSWER: SA = 6 × 25 = 150 cm²; V = 125 cm³; SA:V = 150 : 125 = 1.2 : 1. Smaller than the 4 cm cube (1.5 : 1).\nAll values asserted in node: 1, 2, 4 cm cubes give 6, 3, 1.5 : 1; 3 cm gives 2 : 1; 5 cm gives 1.2 : 1. Common misconception: larger organisms have a LARGER SA:V ratio (they have a larger SA but a smaller ratio). Ratios are written as n : 1. The SA:V calculation is the maths link (ratios, area and volume of a cube) for B5.1.2.`,
}), 'B5.1.2 SA:V ratio');

// ======================= 7 EXCHANGE SURFACES AND TRANSPORT =======================
reg(D.contentSlide({
  title: 'Why we need exchange surfaces and transport',
  subtitle: `Specification ${sp('B5.1.2')} • diffusion is fast over short distances but far too slow over long ones`,
  tag: 'B5.1.2', caption: 'single-celled organism (top) and a block of cells (bottom); not to scale',
  draw: (s, p) => {
    label(s, 0.65, 1.42, 5.7, 'Single-celled organism, e.g. amoeba: **large SA:V**', { size: 11, color: C.blue, align: 'left' });
    poly(s, [[1.0, 2.35], [1.4, 1.9], [2.1, 1.95], [2.5, 1.8], [2.9, 2.2], [2.75, 2.75], [2.2, 2.95], [1.5, 2.85]], 'E6F0F5', '5B8FA8', { lw: 1.5 });
    ball(s, 1.95, 2.4, 0.15, C.nucleus, C.nucleusEdge, 1);
    [[0.6, 2.35, 0.98, 2.35], [2.0, 1.55, 2.0, 1.9], [3.3, 2.5, 2.9, 2.45]].forEach(([a, b, c, d]) => arrow(s, a, b, c, d, C.green, 1.75));
    label(s, 3.4, 1.85, 2.95, 'O₂ diffuses straight in through the membrane; every part is **close to the surface**', { size: 10.5, align: 'left', valign: 'top', h: 0.8 });
    line(s, 0.65, 3.2, 6.35, 3.2, C.line, 1, { dash: 'dash' });
    label(s, 0.65, 3.27, 5.7, 'Multicellular organism: **small SA:V**', { size: 11, color: C.red, align: 'left' });
    const gx = 0.8, gy = 3.65, cs = 0.3;
    for (let r = 0; r < 6; r++) for (let c = 0; c < 9; c++) {
      const inner = r > 0 && r < 5 && c > 0 && c < 8;
      box(s, gx + c * cs, gy + r * cs, cs, cs, inner ? 'F7E8C8' : 'E8F4E0', '9C8A5A', { lw: 0.5 });
    }
    box(s, gx + 4 * cs, gy + 2 * cs, cs, cs, 'F2B8B8', C.red, { lw: 1.5 });
    arrow(s, gx - 0.25, gy + 2.5 * cs, gx + 4 * cs, gy + 2.5 * cs, C.green, 1.75);
    label(s, gx + 4 * cs - 0.6, gy + 6 * cs + 0.03, 1.5, 'cell deep inside', { size: 10, color: C.red, bold: true });
    label(s, 3.65, 3.65, 2.7, 'O₂ must cross **many cells** to reach the middle: the distance is too long', { size: 10.5, align: 'left', valign: 'top', h: 0.85 });
    label(s, 3.65, 4.55, 2.7, 'Solution: **exchange surfaces** + a **transport system** (blood)', { size: 10.5, bold: true, color: C.blue, align: 'left', valign: 'top', h: 0.85 });
  },
  head: 'Exchange surfaces and transport',
  lines: [
    'Small organisms have a **large SA:V** and short distances: diffusion through the surface is enough.',
    'Large organisms have a **small SA:V** and cells far from the surface.',
    'They need **exchange surfaces** with a huge area (lungs, small intestine) and a **transport system** to carry substances close to every cell.',
    'A good exchange surface: **large area**, **thin** (short distance), **good blood supply** to keep a steep concentration gradient.',
  ],
  size: 11,
  worked: { head: 'Worked example: diffusion distance', q: 'Oxygen travels 0.1 mm into an amoeba. A cell in a human leg is about 100 mm from the lungs. How many times further is that?',
    steps: [['Same units', 'both in mm: 100 mm and 0.1 mm'], ['Divide', '100 ÷ 0.1'], ['Answer', '1000 times further: far too far for diffusion']], size: 10.5 },
  workedH: 1.85,
  qc: 'A **2 cm** cube has a SA:V of 3 : 1. Use this to explain why a 2 cm animal could not survive by diffusion through its skin alone.',
  notes: 'QUICK CHECK ANSWER: Its SA:V (3 : 1) is much smaller than that of a single cell, so its surface is too small for its volume to supply enough oxygen / remove enough CO₂ (1); cells in the middle are far from the surface, so diffusion would be too slow (1). (Accept: it needs an exchange surface and a transport system.)\nTime for diffusion increases with the square of the distance (stretch idea), so doubling the distance makes diffusion about four times slower. B5.1.2 wording (paraphrase from search extracts): explain the need for exchange surfaces and a transport system in multicellular organisms in terms of surface area : volume ratio. A J260/05 sample paper asks for "ideas about surface area, volume and diffusion".',
}), 'B5.1.2 Exchange surfaces and transport');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B5.1.1')}, ${sp('B5.1.2')} • substances, SA:V, exchange surfaces`, [
  { q: 'Name **two** substances the human body must take **in**, and **one** waste substance it must get rid of.', marks: 3, ms: 'Any two in (1 each): oxygen; water; dissolved food molecules, e.g. glucose / amino acids; mineral ions. Waste (1): carbon dioxide / urea.' },
  { q: 'Calculate the **SA : V ratio** of a cube with sides of **2 cm**.', marks: 2, ms: 'SA = 24 cm² and V = 8 cm³ (1); 3 : 1 (1).' },
  { q: 'Explain why a single-celled organism does **not** need a transport system but a human **does**.', marks: 2, ms: 'Single cell has a large SA:V / short diffusion distance, so diffusion through the membrane is enough (1); human has a small SA:V / cells far from the surface, so diffusion alone is too slow (1).' },
  { q: 'Give **one** feature of an efficient exchange surface.', marks: 1, ms: 'Large surface area / thin, short diffusion distance / good blood supply / ventilated, maintains a concentration gradient (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 PRACTICAL: METHOD =======================
reg(D.contentSlide({
  title: 'Practical: modelling SA:V with agar cubes',
  subtitle: `Specification ${sp('B5.1.2')} • how does cube size affect the time for acid to diffuse to the centre?`,
  tag: 'Practical', pag: 'Suggested practical', caption: 'apparatus: pink agar contains an alkali and indicator; acid turns it colourless',
  draw: (s, p) => {
    const tiles = [[0.6, 1.42, '1  Cut cubes: 0.5, 1, 1.5, 2 cm'], [3.6, 1.42, '2  Drop each into acid; start timer'], [0.6, 3.68, '3  Watch the pink fade'], [3.6, 3.68, '4  Time until all colourless']];
    tiles.forEach(([x, y, t]) => { box(s, x, y, 2.85, 2.12, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, x + 0.1, y + 0.04, 2.65, t, { size: 10.5, bold: true, color: C.blue, align: 'left', h: 0.28 }); });
    // tile 1: cubes + ruler + scalpel
    [0.5, 1.0, 1.5, 2.0].forEach((a, i) => { const L = a * 0.33; cube(s, 0.8 + [0, 0.32, 0.8, 1.42][i], 3.1 - L - L * 0.4, L, { d: L * 0.4 }); });
    box(s, 0.78, 3.25, 2.1, 0.18, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let i = 0; i <= 12; i++) line(s, 0.8 + i * 0.17, 3.25, 0.8 + i * 0.17, 3.25 + (i % 2 ? 0.05 : 0.09), '6B5A2A', 0.75);
    line(s, 2.95, 2.0, 3.35, 1.85, '6B7385', 3); line(s, 2.95, 2.0, 2.75, 2.08, '9AA3B0', 2);
    label(s, 0.7, 3.47, 2.65, 'ruler • scalpel • white tile', { size: 10, h: 0.26 });
    // tile 2: beaker of acid with cube; stopwatch
    D.liquidColumn(s, 3.85, 2.2, 1.25, 1.2, 0.75, { color: 'E8F1FA' });
    cube(s, 4.3, 2.85, 0.33, { d: 0.13 });
    ball(s, 5.95, 2.55, 0.38, C.white, C.ink, 1.5); box(s, 5.9, 2.08, 0.1, 0.1, C.ink, null);
    line(s, 5.95, 2.55, 5.95, 2.3, C.red, 1.5); line(s, 5.95, 2.55, 6.12, 2.62, C.ink, 1.5);
    label(s, 3.7, 3.45, 2.65, 'dilute hydrochloric acid • stop clock', { size: 10, h: 0.26 });
    // tile 3: sequence of a cube clearing (cross-section)
    [0, 1, 2, 3].forEach(i => {
      const x = 0.85 + i * 0.62, y = 4.35, a = 0.5, inner = a * (1 - i / 3);
      box(s, x, y, a, a, 'F7FAFC', '9E3B5E', { lw: 1 });
      if (inner > 0) box(s, x + (a - inner) / 2, y + (a - inner) / 2, inner, inner, 'E58FAE', null);
      if (i < 3) arrow(s, x + a + 0.02, y + a / 2, x + 0.6, y + a / 2, C.ink, 1);
    });
    label(s, 0.7, 4.95, 2.65, 'cut-through view: acid diffuses in from **every face**; the pink core shrinks', { size: 10, h: 0.6, valign: 'top' });
    // tile 4: table sketch
    const rows = [['Side / cm', 'Time / s'], ['0.5', ''], ['1.0', ''], ['1.5', ''], ['2.0', '']].map((r, i) => r.map(t => ({ text: t, options: { bold: i === 0, fill: { color: i === 0 ? C.band : C.white } } })));
    s.addTable(rows, { x: 3.85, y: 4.1, w: 2.35, colW: [1.15, 1.2], rowH: 0.27, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', border: { type: 'solid', color: C.line, pt: 0.75 } });
    label(s, 3.7, 5.5, 2.65, 'repeat 3 times; calculate a mean', { size: 10, h: 0.26 });
  },
  head: 'Method',
  lines: [
    'Cut cubes of agar (made with alkali and **phenolphthalein** indicator) with sides 0.5, 1.0, 1.5 and 2.0 cm.',
    'Put each cube into the same volume of dilute **hydrochloric acid**; start the stop clock.',
    'The acid **diffuses** into the cube and neutralises the alkali, so the pink colour disappears.',
    'Stop the clock when the cube is **completely colourless**. Repeat 3 times for each size.',
  ],
  size: 10.5,
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'cube size (so SA:V ratio)'], ['Dependent', 'time for the cube to go colourless'], ['Control', 'acid concentration and volume; temperature; same agar'], ['Safety', 'acid irritant: eye protection; cut on a tile, away from fingers']], size: 10.5 },
  workedH: 2.05,
  qc: 'Why is the **centre** of the biggest cube the last part to turn colourless? What does this model about a large organism?',
  notes: 'QUICK CHECK ANSWER: The centre is furthest from every surface, so the acid takes longest to diffuse to it (and the large cube has the smallest SA:V). It models cells deep inside a large organism, which are too far from the surface to be supplied quickly enough by diffusion alone.\nPAG link: this is the usual SA:V / diffusion model practical; it fits the OCR biology PAG group on transport in and out of cells (PAG B8 in OCR numbering), but no B5.1 PAG reference was found for J260 (UNVERIFIED), so it is labelled a suggested practical.\nTypical recipe: 2% agar with 0.1 mol/dm³ sodium hydroxide and phenolphthalein; 0.1–1 mol/dm³ hydrochloric acid. Teacher prepares the agar. Data on the next slide are illustrative.',
}), 'Practical: agar cubes method');

// ======================= 10 PRACTICAL: RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('B5.1.2')} • time for cubes to go colourless (sample class data)`, { pag: 'Suggested practical', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 5.9, 4.95, 'graph drawn to scale from the mean times');
  const g = { x: 1.45, y: 1.55, w: 4.55, h: 3.7, xmin: 0, xmax: 12, ymin: 0, ymax: 1400, xstep: 2, ystep: 200, minor: 2, xlabel: 'surface area : volume ratio (per cm)', ylabel: 'mean time to go colourless / s' };
  D.axes(s, g);
  const curve = []; for (let i = 0; i <= 60; i++) { const r = 3 + i * 9 / 60; curve.push([r, agK / r ** 2]); }
  D.plotLine(s, g, curve, C.blue, 1.75);
  D.points(s, g, agR.map((r, i) => [r, agMean[i]]), C.red);
  agR.forEach((r, i) => label(s, D.px(g, r) + 0.08, D.py(g, agMean[i]) - 0.3, 0.9, `${AG[i][0]} cm`, { size: 10, color: C.red, align: 'left', h: 0.22 }));
  // table
  const rows = [[HDR('Side / cm'), HDR('SA / cm²'), HDR('V / cm³'), HDR('SA:V'), HDR('Time 1 / s'), HDR('Time 2 / s'), HDR('Time 3 / s'), HDR('Mean / s')],
    ...AG.map(([a, t], i) => [tcell(String(a), i, { bold: true }), tcell(fmt(agSA[i]), i), tcell(fmt(agV[i]), i), tcell(fmt(agR[i]), i), ...t.map(v => tcell(String(v), i)), tcell(fmt(agMean[i]), i, { bold: true, color: C.red })])];
  s.addTable(rows, { x: 6.55, y: 1.3, w: 6.33, colW: [0.78, 0.78, 0.78, 0.65, 0.84, 0.84, 0.84, 0.82], rowH: 0.3, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.55, 2.95, 6.33, 1.6, 'Worked example: the 1.5 cm cube', '', [
    ['SA:V', `SA = 6 × 1.5² = ${fmt(agSA[2])} cm²; V = 1.5³ = ${fmt(agV[2])} cm³; ratio = ${fmt(agR[2])} : 1`],
    ['Mean', `(752 + 731 + 752) ÷ 3 = ${fmt(agMean[2])} s`],
    ['Answer', `larger SA:V → shorter time; 2 cm cube: ${fmt(agMean[3])} s = ${1320 / 60} min`]], { size: 10.5 });
  D.card(s, 6.55, 4.65, 6.33, 1.6, 'Sources of error and improvements', [
    'Cubes not cut exactly to size → measure with a ruler; use a cube cutter.',
    'Hard to judge "completely colourless" → white tile behind; one person judges every cube.',
    'Cube touches the beaker, so one face gets less acid → stir gently or use a mesh.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Describe the **pattern** in the results. Which cube has the biggest **range** of repeat times?');
  D.notes(s, `QUICK CHECK ANSWER: As the SA:V ratio increases (smaller cubes), the time to go colourless decreases; the curve is steep at small SA:V. The 2.0 cm cube has the biggest range: 1342 − 1301 = 41 s (ranges ${agRange.join(', ')} s).\nNode: SA ${agSA.join(', ')} cm²; V ${agV.join(', ')} cm³; SA:V ${agR.join(', ')}; means ${agMean.join(', ')} s. The blue curve is t = ${agK} ÷ (SA:V)², the model for diffusion time ∝ (distance)², which passes through the means (82.5, 330, 742.5, 1320 s). Data are illustrative, chosen to follow that model. Stretch: time ∝ distance² (Fick / random walk) is beyond GCSE.`);
  reg(s, 'Practical: agar cubes results');
}

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B5.1.2')} • agar cube practical`, [
  { q: 'Explain why the agar cubes turn from pink to **colourless**.', marks: 1, ms: 'Acid diffuses into the cube and neutralises the alkali, so the indicator turns colourless (1).' },
  { q: 'Calculate the SA:V ratio of a cube with sides of **0.5 cm**.', marks: 2, ms: 'SA = 1.5 cm², V = 0.125 cm³ (1); 12 : 1 (1).' },
  { q: 'Use the results to describe the link between **SA:V ratio** and the time taken to go colourless.', marks: 2, ms: 'The larger the SA:V ratio, the shorter the time (1); e.g. 12 : 1 took 85 s but 3 : 1 took 1320 s / quote data (1).' },
  { q: 'Give **one** control variable and explain why it must be kept the same.', marks: 2, ms: 'e.g. acid concentration / volume of acid / temperature / same batch of agar (1); because it also affects the rate of diffusion, so the test is fair / only cube size affects the time (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 LUNGS AND ALVEOLI =======================
reg(D.contentSlide({
  title: 'The lungs: a gas exchange surface',
  subtitle: `Specification ${sp('B5.1.3')} • millions of alveoli give a huge, thin surface next to the blood`,
  tag: 'B5.1.3', caption: 'gas exchange system (left) and one alveolus with a capillary (right)',
  draw: (s, p) => {
    // lungs
    oval(s, 1.35, 3.55, 1.25, 2.55, 'F8D7DA', 'C77C86', { lw: 1.25 });
    oval(s, 3.15, 3.55, 1.25, 2.55, 'F8D7DA', 'C77C86', { lw: 1.25 });
    // trachea with rings
    box(s, 2.13, 1.45, 0.24, 1.15, 'F4F0E8', '8C96A8', { lw: 1 });
    for (let y = 1.55; y < 2.55; y += 0.15) line(s, 2.13, y, 2.37, y, '8C96A8', 1);
    // bronchi and bronchioles (recursive branching)
    const br = (x, y, ang, len, depth, w) => {
      const x2 = x + len * Math.sin(ang), y2 = y + len * Math.cos(ang);
      line(s, x, y, x2, y2, 'B0A79A', w);
      if (depth === 0) { [[0, 0], [0.06, 0.05], [-0.06, 0.05]].forEach(([dx, dy]) => ball(s, x2 + dx, y2 + dy, 0.045, 'F2A6B0', 'B5545C', 0.5)); return; }
      br(x2, y2, ang - 0.45, len * 0.62, depth - 1, w * 0.65); br(x2, y2, ang + 0.45, len * 0.62, depth - 1, w * 0.65);
    };
    line(s, 2.25, 2.6, 1.6, 2.95, 'B0A79A', 5); line(s, 2.25, 2.6, 2.9, 2.95, 'B0A79A', 5);
    br(1.6, 2.95, -0.25, 0.75, 3, 3.5); br(2.9, 2.95, 0.25, 0.75, 3, 3.5);
    // diaphragm
    const dia = []; for (let i = 0; i <= 20; i++) { const x = 0.6 + i * 0.165; dia.push([x, 5.25 - 0.35 * Math.sin(Math.PI * i / 20)]); }
    for (let i = 0; i < 20; i++) line(s, dia[i][0], dia[i][1], dia[i + 1][0], dia[i + 1][1], MUSE, 4);
    // labels
    tag(s, 2.37, 1.8, 2.75, 1.6, '**trachea**', 'r', 1.0);
    tag(s, 2.75, 2.88, 3.05, 2.45, '**bronchus**', 'r', 1.0);
    tag(s, 1.42, 3.68, 0.8, 2.12, '**bronchioles**', 'r', 1.0);
    tag(s, 1.05, 4.45, 0.75, 4.95, '**alveoli**', 'l', 0.6, { size: 10 });
    label(s, 2.3, 5.4, 1.6, '**diaphragm**', { size: 10.5, align: 'left' });
    label(s, 0.55, 1.42, 1.5, "person's right lung", { size: 10, italic: true, color: C.grey, align: 'left' });
    // inset alveolus
    box(s, 4.15, 1.45, 2.25, 4.4, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.2, 1.5, 2.15, 'One alveolus', { size: 10.5, bold: true, color: C.blue, h: 0.26 });
    ball(s, 5.27, 2.75, 0.72, 'EEF6FB', 'C77C86', 2);
    label(s, 4.75, 2.45, 1.05, 'air', { size: 10.5, italic: true, color: C.grey });
    // capillary under the alveolus: blue (left) to red (right)
    box(s, 4.25, 3.55, 1.0, 0.42, DEL, DEE, { lw: 1 }); box(s, 5.25, 3.55, 1.05, 0.42, OXL, OXE, { lw: 1 });
    [4.55, 5.0, 5.55, 6.0].forEach((x, i) => rbc(s, x, 3.76, 0.11));
    arrow(s, 4.3, 4.12, 6.25, 4.12, C.ink, 1.5);
    label(s, 4.25, 4.18, 2.1, 'blood flow in a **capillary**', { size: 10, h: 0.24 });
    arrow(s, 5.08, 2.95, 5.08, 3.62, C.green, 2.25); label(s, 4.2, 3.05, 0.8, 'O₂ in', { size: 10.5, bold: true, color: C.green, align: 'right' });
    arrow(s, 5.46, 3.62, 5.46, 2.95, C.red, 2.25); label(s, 5.55, 3.05, 0.8, 'CO₂ out', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 4.25, 4.5, 2.1, 'walls: **one cell thick**; total distance about **1 µm**', { size: 10, h: 0.45, valign: 'top' });
    label(s, 4.25, 5.0, 2.1, 'moist lining: gases dissolve first', { size: 10, h: 0.45, valign: 'top' });
  },
  head: 'How the alveoli are adapted',
  lines: [
    'Air goes down the **trachea**, **bronchi** and **bronchioles** to millions of tiny air sacs, the **alveoli**.',
    'Oxygen **diffuses** from the air in the alveoli into the blood; carbon dioxide diffuses out.',
    '**Huge surface area** (millions of alveoli); **thin walls**, one cell thick: short distance.',
    '**Rich blood supply** and **breathing** (ventilation) keep a steep concentration gradient.',
  ],
  size: 11,
  worked: { head: 'Worked example: diffusion distance', q: 'The alveolus wall and capillary wall are each 0.0005 mm thick. What is the total diffusion distance in µm?',
    steps: [['Add', '0.0005 + 0.0005 = 0.001 mm'], ['Convert', '1 mm = 1000 µm, so × 1000'], ['Answer', '0.001 × 1000 = 1 µm']], size: 10.5 },
  workedH: 1.75,
  qc: 'Explain why the **blood flowing** past the alveoli helps oxygen to keep diffusing into it.',
  notes: 'QUICK CHECK ANSWER: Blood carries oxygen away as soon as it diffuses in, so the oxygen concentration in the blood stays low (and fresh air keeps it high in the alveoli) (1); this keeps a steep concentration gradient, so diffusion stays fast (1).\nThe J260 circulatory-system statement includes its relationship with the gaseous exchange system (search extract); the lungs are the human example of an exchange surface for B5.1.2. Mechanics of breathing (rib and diaphragm muscles) are not required: diaphragm labelled only. Wall thickness values are typical textbook values (about 0.5 µm each); node: 0.0005 + 0.0005 = 0.001 mm = 1 µm. The person\'s right lung is on the viewer\'s left.',
}), 'B5.1.3 Lungs and alveoli');

// ======================= 13 SMALL INTESTINE AND VILLI =======================
reg(D.contentSlide({
  title: 'The small intestine: absorbing food',
  subtitle: `Specification ${sp('B5.1.3')} • villi give a huge surface for dissolved food molecules to enter the blood`,
  tag: 'B5.1.3', caption: 'part of the small intestine wall (left) and one villus enlarged (right)',
  draw: (s, p) => {
    label(s, 0.6, 1.42, 3.5, 'Inside the small intestine (lumen)', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    // food molecules
    [[0.9, 1.9], [1.6, 1.8], [2.4, 1.95], [3.1, 1.82], [3.7, 1.95], [1.2, 2.3], [2.8, 2.25]].forEach(([x, y], i) => i % 2 ? ball(s, x, y, 0.06, GLOW, C.orange) : box(s, x - 0.06, y - 0.06, 0.12, 0.12, C.green, '1E6B40'));
    // wall base
    box(s, 0.6, 4.75, 3.4, 0.55, 'E3B8A8', MUSE, { lw: 1 });
    label(s, 0.6, 5.3, 3.4, 'muscle and wall of the intestine', { size: 10, italic: true, color: C.grey, h: 0.24 });
    // villi: rounded fingers
    for (let i = 0; i < 6; i++) {
      const x = 0.68 + i * 0.55;
      box(s, x, 2.55, 0.42, 2.3, 'F6D5C8', 'B5654A', { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1.25 });
      line(s, x + 0.13, 2.85, x + 0.13, 4.75, OX, 1.5); line(s, x + 0.29, 2.85, x + 0.29, 4.75, DE, 1.5);
      line(s, x + 0.13, 2.85, x + 0.29, 2.85, OX, 1.5);
    }
    arrow(s, 1.05, 2.05, 0.95, 2.55, C.orange, 1.5); arrow(s, 2.55, 2.05, 2.5, 2.55, C.orange, 1.5);
    // enlarged villus
    box(s, 4.15, 1.45, 2.25, 4.4, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.2, 1.5, 2.15, 'One villus', { size: 10.5, bold: true, color: C.blue, h: 0.26 });
    box(s, 4.4, 1.95, 0.8, 3.4, 'F6D5C8', 'B5654A', { shape: SH.ROUNDED_RECTANGLE, r: 0.38, lw: 2 });
    for (let y = 2.3; y < 5.3; y += 0.12) { line(s, 4.4, y, 4.32, y, 'B5654A', 0.75); line(s, 5.2, y, 5.28, y, 'B5654A', 0.75); }
    vessel(s, [[4.62, 5.35], [4.62, 2.45], [4.98, 2.45], [4.98, 5.35]], OXL, OX, 0.08);
    line(s, 4.98, 2.6, 4.98, 5.3, DE, 2.5);
    tag(s, 5.18, 2.75, 5.38, 2.75, '**one layer** of cells', 'r', 0.95, { h: 0.45, size: 10 });
    tag(s, 5.26, 3.55, 5.38, 3.55, '**microvilli**', 'r', 0.95, { size: 10 });
    tag(s, 4.98, 4.25, 5.38, 4.25, '**capillary** network', 'r', 0.95, { h: 0.45, size: 10 });
    arrow(s, 6.05, 5.0, 5.3, 5.0, C.orange, 1.75);
    label(s, 5.38, 5.08, 0.95, 'glucose in', { size: 10, bold: true, color: C.orange, h: 0.26, align: 'left' });
  },
  head: 'How villi are adapted',
  lines: [
    'Digestion breaks food into **small, soluble** molecules, e.g. **glucose**, **amino acids**.',
    'They are absorbed into the blood through the wall of the **small intestine**.',
    'Millions of **villi** (with **microvilli**) give a **huge surface area**.',
    'Wall **one cell thick**: short distance. **Capillary network**: blood carries molecules away, keeping a steep gradient.',
    'Absorption is by **diffusion** and **active transport** (B3 recap).',
  ],
  size: 11,
  worked: { head: 'Worked example: how much area?', q: 'Model a villus as a cylinder 1 mm tall and 0.1 mm across. Compare its side area with the flat base it stands on.',
    steps: [['Side', 'π × d × h = π × 0.1 × 1 = 0.31 mm²'], ['Base', 'π × r² = π × 0.05² = 0.0079 mm²'], ['Answer', '0.31 ÷ 0.0079: about 40 times more area']], size: 10.5 },
  workedH: 1.85,
  qc: 'Give **two** ways the villi and the alveoli are **similar** as exchange surfaces.',
  notes: `QUICK CHECK ANSWER: Any two: both have a large surface area; both have thin walls (one cell thick) / short diffusion distance; both have a rich blood supply / capillary network that maintains a concentration gradient.\nNode: side area = π × 0.1 × 1 = ${vilSide.toFixed(4)} mm²; base = π × 0.05² = ${vilBase.toFixed(5)} mm²; exact ratio = 4h ÷ d = 40. The J260 circulatory-system statement includes its relationship with the digestive system (search extract). Enzymes and digestion itself are not in B5.1 of J260 (UNVERIFIED): taught here only as "large molecules broken into small soluble ones". Lacteals and the hepatic portal vein are not required.`,
}), 'B5.1.3 Small intestine and villi');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B5.1.2')}, ${sp('B5.1.3')} • alveoli and villi`, [
  { q: 'Name the tiny air sacs in the lungs where gas exchange happens.', marks: 1, ms: 'Alveoli (1).' },
  { q: 'Explain **three** ways the alveoli are adapted for efficient gas exchange.', marks: 3, ms: 'Any three (1 each), each with its reason: huge number / large surface area for more diffusion; thin walls / one cell thick for a short diffusion distance; rich blood supply / many capillaries maintain a concentration gradient; moist so gases dissolve; ventilation keeps the gradient.' },
  { q: 'Name **two** dissolved food molecules absorbed by the villi.', marks: 2, ms: 'Any two (1 each): glucose / amino acids / fatty acids and glycerol / vitamins / mineral ions / water.' },
  { q: 'Explain why a good **blood supply** to the villi increases the rate of absorption.', marks: 2, ms: 'Blood carries absorbed molecules away (1); keeps the concentration in the blood low / maintains a steep concentration gradient (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 DOUBLE CIRCULATION =======================
reg(D.contentSlide({
  title: 'The double circulatory system',
  subtitle: `Specification ${sp('B5.1.3')} • blood passes through the heart twice in every circuit of the body`,
  tag: 'B5.1.3', caption: "heart drawn from the front: the person's right side is on your left",
  draw: (s, p) => {
    // lungs
    box(s, 2.3, 1.5, 2.6, 0.75, 'F8D7DA', 'C77C86', { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1.25 });
    label(s, 2.3, 1.5, 2.6, '**lungs** (gas exchange system)\nO₂ in • CO₂ out', { size: 10, h: 0.75 });
    // heart chambers
    box(s, 2.6, 3.2, 0.7, 0.5, DEL, DEE, { lw: 1 }); label(s, 2.6, 3.2, 0.7, 'RA', { size: 10.5, bold: true, color: DEE, h: 0.5 });
    box(s, 3.7, 3.2, 0.7, 0.5, OXL, OXE, { lw: 1 }); label(s, 3.7, 3.2, 0.7, 'LA', { size: 10.5, bold: true, color: OXE, h: 0.5 });
    box(s, 2.6, 3.75, 0.95, 0.65, DEL, DEE, { lw: 1 }); label(s, 2.6, 3.75, 0.85, 'RV', { size: 10.5, bold: true, color: DEE, h: 0.65 });
    box(s, 3.6, 3.75, 0.8, 0.65, OXL, OXE, { lw: 1 }); label(s, 3.6, 3.75, 0.8, 'LV', { size: 10.5, bold: true, color: OXE, h: 0.65 });
    label(s, 2.4, 4.42, 2.2, '**heart**', { size: 10.5, h: 0.24 });
    // body
    box(s, 0.8, 5.0, 5.5, 0.82, 'F3EBDD', 'A08F6A', { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.25 });
    [['small intestine\nfood molecules in', 'F2D29B'], ['kidneys\nurea out', 'E6C2A8'], ['muscles, brain…\ncells use O₂, glucose', 'F4E3D8']].forEach(([t, f], i) => {
      box(s, 1.75 + i * 1.47, 5.08, 1.38, 0.66, f, 'A08F6A', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 });
      label(s, 1.75 + i * 1.47, 5.08, 1.38, t, { size: 10, h: 0.66 });
    });
    label(s, 0.82, 5.0, 0.95, '**body**', { size: 10.5, h: 0.82 });
    // vessels
    vessel(s, [[3.42, 3.78], [3.42, 2.22]], DE, DEE, 0.16);              // pulmonary artery (RV → lungs)
    vessel(s, [[4.1, 2.22], [4.1, 3.22]], OX, OXE, 0.16);                // pulmonary vein (lungs → LA)
    vessel(s, [[4.38, 4.05], [5.9, 4.05], [5.9, 5.02]], OX, OXE, 0.16);  // aorta (LV → body)
    vessel(s, [[1.25, 5.02], [1.25, 3.45], [2.62, 3.45]], DE, DEE, 0.16); // vena cava (body → RA)
    flow(s, 3.42, 3.1, 3.42, 2.6, C.white); flow(s, 4.1, 2.5, 4.1, 3.0, C.white);
    flow(s, 4.95, 4.05, 5.5, 4.05, C.white); flow(s, 5.9, 4.3, 5.9, 4.85, C.white);
    flow(s, 1.25, 4.85, 1.25, 4.0, C.white); flow(s, 1.6, 3.45, 2.3, 3.45, C.white);
    label(s, 1.6, 2.65, 1.62, 'pulmonary artery', { size: 10, align: 'right', h: 0.24 });
    label(s, 4.25, 2.6, 1.6, 'pulmonary vein', { size: 10, align: 'left', h: 0.24 });
    label(s, 4.5, 3.75, 1.4, 'aorta', { size: 10, bold: true, align: 'left', h: 0.24 });
    label(s, 0.55, 3.0, 1.5, 'vena cava', { size: 10, bold: true, align: 'left', h: 0.24 });
    // circuit names
    label(s, 4.95, 1.55, 1.5, '1  lungs circuit', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, 4.65, 4.45, 1.85, '2  body circuit', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    box(s, 0.65, 1.5, 1.45, 1.0, C.white, C.line, { lw: 0.75 });
    box(s, 0.75, 1.62, 0.22, 0.14, OX, null); label(s, 1.02, 1.55, 1.05, 'oxygenated', { size: 10, align: 'left', h: 0.28 });
    box(s, 0.75, 1.98, 0.22, 0.14, DE, null); label(s, 1.02, 1.91, 1.05, 'deoxygenated', { size: 10, align: 'left', h: 0.28 });
  },
  head: 'Two circuits, one heart',
  lines: [
    'The **right** side of the heart pumps deoxygenated blood to the **lungs**; it returns oxygenated to the **left** side.',
    'The **left** side pumps oxygenated blood to the **rest of the body**; it returns deoxygenated to the right side.',
    'Blood passes through the heart **twice** per circuit: a **double circulation**.',
    'Blood returning from the lungs is pumped again, so it reaches the body at **high pressure**: fast delivery.',
    'The circulation links the **gas exchange** (lungs), **digestive** (gut) and **excretory** (kidneys) systems.',
  ],
  size: 11,
  worked: { head: 'Worked example: explain', q: 'Why does a mammal need a double circulation, not a single one like a fish?',
    steps: [['Lungs', 'blood loses pressure in the lung capillaries'], ['Re-pump', 'it returns to the heart and is pumped again'], ['Answer', 'high pressure to the body: O₂ and glucose delivered fast for a high respiration rate']], size: 10.5 },
  workedH: 1.75,
  qc: 'Which side of the heart receives blood from the **lungs**? Is this blood oxygenated or deoxygenated?',
  notes: 'QUICK CHECK ANSWER: The left side (left atrium), via the pulmonary vein. Oxygenated.\nB5.1.3 wording (search extract): "describe the human circulatory system, including its relationships with the gaseous exchange system, the digestive system and the excretory system". Fish single circulation is a comparison only (not required). Pulmonary artery carries deoxygenated blood; pulmonary vein carries oxygenated blood: a common exam point. Diagram convention: red = oxygenated, blue = deoxygenated (real blood is always red).',
}), 'B5.1.3 Double circulation');

// ======================= 16 THE HEART (LARGE DIAGRAM) =======================
{
  const s = D.contentHeader('The structure of the heart', `Specification ${sp('B5.1.4')} • four chambers, four valves, four main blood vessels`, { tag: 'B5.1.4' });
  D.panel(s, 0.45, 1.3, 7.2, 4.95);
  heart(s);
  box(s, 0.6, 5.97, 6.9, 0.26, C.white, null);
  label(s, 0.6, 5.97, 6.9, "Illustrative diagram — front view: the person's **RIGHT** side is on **YOUR LEFT**. Red = oxygenated, blue = deoxygenated.", { size: 10, italic: true, color: C.grey, h: 0.26 });
  D.card(s, 7.85, 1.3, 5.03, 4.95, 'How the structure fits the job', [
    '**Cardiac muscle** in the walls contracts again and again without tiring, to pump blood.',
    '**Four chambers**: two **atria** (top) receive blood; two **ventricles** (bottom) pump it out.',
    'The **left ventricle** has the **thickest wall**: it pumps blood all round the body at high pressure.',
    'The right ventricle wall is thinner: it pumps only to the nearby lungs (lower pressure protects the alveoli).',
    '**Valves** stop blood flowing backwards: between atria and ventricles, and at the base of the arteries.',
    'The **septum** keeps oxygenated and deoxygenated blood apart.',
  ], { size: 11 });
  D.quickCheck(s, 'Name the chamber with the **thickest** wall and explain why. Name the vessel that carries blood **from** this chamber.');
  D.notes(s, 'QUICK CHECK ANSWER: The left ventricle; it must pump blood at high pressure all the way round the body (the right ventricle only pumps to the lungs). The aorta.\nB5.1.4 wording (search extract): "explain how the structure of the heart is adapted to its function, including cardiac muscle, chambers and valves".\nDiagram checks: the person\'s right side (right atrium, right ventricle, vena cava, pulmonary artery) is on the viewer\'s left. Vena cava → right atrium → valve → right ventricle → pulmonary artery (semilunar valve at its base) → lungs; pulmonary veins → left atrium → valve → left ventricle → aorta (semilunar valve) → body. The pulmonary artery passes behind the aorta. Valve names (tricuspid, bicuspid / mitral, semilunar) are not required at GCSE: stretch only. The coronary arteries that supply the heart muscle itself are B2 (heart disease) and are not drawn.');
  reg(s, 'B5.1.4 Heart structure');
}

// ======================= 17 HOW THE HEART PUMPS =======================
reg(D.contentSlide({
  title: 'The path of blood through the heart',
  subtitle: `Specification ${sp('B5.1.4')} • atria fill, ventricles contract, valves keep the flow one way`,
  tag: 'B5.1.4', caption: 'read the right side top to bottom, then the left side bottom to top',
  draw: (s, p) => {
    label(s, 0.6, 1.4, 2.8, "**Right** side: deoxygenated", { size: 11, color: DEE, h: 0.32 });
    label(s, 3.55, 1.4, 2.8, "**Left** side: oxygenated", { size: 11, color: OXE, h: 0.32 });
    const L = ['body', 'vena cava', 'right atrium', 'valve', 'right ventricle', 'pulmonary artery', 'lungs'];
    const R = ['body', 'aorta', 'left ventricle', 'valve', 'left atrium', 'pulmonary vein', 'lungs'];
    const y0 = 1.82, st = 0.58, bh = 0.44, bw = 2.2;
    L.forEach((t, i) => {
      const y = y0 + i * st, ends = i === 0 || i === 6;
      node(s, 0.9, y, bw, bh, t, ends ? 'F3EBDD' : t === 'valve' ? 'FFF4E0' : DEL, ends ? 'A08F6A' : t === 'valve' ? C.orangeBorder : DEE, { bold: !ends, size: 10.5 });
      if (i < 6) arrow(s, 2.0, y + bh, 2.0, y + st, DEE, 1.75);
    });
    R.forEach((t, i) => {
      const y = y0 + i * st, ends = i === 0 || i === 6;
      node(s, 3.85, y, bw, bh, t, ends ? 'F3EBDD' : t === 'valve' ? 'FFF4E0' : OXL, ends ? 'A08F6A' : t === 'valve' ? C.orangeBorder : OXE, { bold: !ends, size: 10.5 });
      if (i < 6) arrow(s, 4.95, y + st, 4.95, y + bh, OXE, 1.75);
    });
    arrow(s, 3.1, y0 + 6 * st + bh / 2, 3.85, y0 + 6 * st + bh / 2, C.ink, 1.75);
    arrow(s, 3.85, y0 + bh / 2, 3.1, y0 + bh / 2, C.ink, 1.75);
  },
  head: 'One heartbeat',
  lines: [
    'Blood flows into both **atria**, which **contract** together and push blood into the ventricles.',
    'Both **ventricles** then **contract** and push blood out into the arteries.',
    'The valves between atria and ventricles **shut** so blood cannot go back; the valves in the arteries open.',
    'Then the heart relaxes and fills again. The two sides pump at the **same time**.',
  ],
  size: 11,
  worked: { head: 'Worked example: volume pumped', q: 'Each beat, the left ventricle pumps 70 cm³ of blood. The heart beats 72 times a minute. Calculate the volume per minute in dm³.',
    steps: [['Multiply', '70 cm³ × 72 = 5040 cm³ per minute'], ['Convert', '1 dm³ = 1000 cm³, so ÷ 1000'], ['Answer', '5.04 dm³ per minute']], size: 10.5 },
  workedH: 1.85,
  qc: 'A heart beats **70** times a minute. How many times does it beat in **one hour**? Why must the valves close when the ventricles contract?',
  notes: 'QUICK CHECK ANSWER: 70 × 60 = 4200 beats. So blood is pushed out into the arteries and does not flow back into the atria (one-way flow).\nThe volume-per-minute calculation is maths practice (multiplication and unit conversion); "cardiac output" is not named in the J260 statements found (UNVERIFIED), so the term is not used on the slide. Node: 70 × 72 = 5040 cm³ = 5.04 dm³; 70 × 60 = 4200.',
}), 'B5.1.4 Path of blood through the heart');

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B5.1.3')}, ${sp('B5.1.4')} • double circulation and the heart`, [
  { q: 'Explain why the human circulatory system is called a **double** circulation.', marks: 2, ms: 'Blood passes through the heart twice in one complete circuit (1); one circuit to the lungs and one to the rest of the body (1).' },
  { q: 'Name the blood vessel that carries blood (a) **from the right ventricle** (b) **into the left atrium**.', marks: 2, ms: '(a) pulmonary artery (1); (b) pulmonary vein (1).' },
  { q: 'Explain why the wall of the **left ventricle** is thicker than the wall of the right ventricle.', marks: 2, ms: 'More (cardiac) muscle to contract more strongly / make a higher pressure (1); to pump blood all round the body, not just to the lungs (1).' },
  { q: 'State the function of the **valves** in the heart.', marks: 1, ms: 'Stop blood flowing backwards / keep blood flowing in one direction (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 19 BLOOD VESSELS =======================
reg(D.contentSlide({
  title: 'Arteries, veins and capillaries',
  subtitle: `Specification ${sp('B5.1.5')} • each vessel's wall and size suit the pressure and the job`,
  tag: 'B5.1.5', caption: 'cross-sections (top; capillary enlarged) and a vein cut lengthways (bottom)',
  draw: (s, p) => {
    // artery
    ball(s, 1.45, 2.55, 0.75, 'E8A0A0', MUSE, 1.25);
    ball(s, 1.45, 2.55, 0.5, 'F2C9C9', MUSE, 0.75);
    ball(s, 1.45, 2.55, 0.24, OX, OXE, 1);
    label(s, 0.6, 1.4, 1.7, '**Artery**', { size: 11, color: OXE });
    label(s, 0.6, 3.38, 1.7, 'thick muscle and elastic wall; **narrow** lumen', { size: 10, h: 0.45, valign: 'top' });
    // vein
    oval(s, 3.5, 2.55, 1.5, 1.2, 'E8C8C8', MUSE, { lw: 1.25 });
    oval(s, 3.5, 2.55, 1.3, 1.0, DEL, DEE, { lw: 1 });
    label(s, 2.7, 1.4, 1.6, '**Vein**', { size: 11, color: DEE });
    label(s, 2.65, 3.38, 1.7, 'thin wall; **wide** lumen', { size: 10, h: 0.45, valign: 'top' });
    // capillary
    ball(s, 5.5, 2.55, 0.48, 'F8E4E4', 'B5545C', 1.5);
    ball(s, 5.5, 2.55, 0.4, 'FBEFEF', 'B5545C', 0.75);
    line(s, 5.5, 2.07, 5.5, 2.15, 'B5545C', 1.5); line(s, 5.5, 2.95, 5.5, 3.03, 'B5545C', 1.5);
    rbc(s, 5.5, 2.55, 0.26);
    label(s, 4.75, 1.4, 1.5, '**Capillary**', { size: 11, color: C.blue });
    label(s, 4.65, 3.38, 1.7, 'wall **one cell thick**; lumen fits one red cell', { size: 10, h: 0.45, valign: 'top' });
    // vein lengthways with valves
    const vy = 4.55, x1 = 0.85, x2 = 6.15;
    box(s, x1, vy - 0.32, x2 - x1, 0.64, DEL, null);
    line(s, x1, vy - 0.32, x2, vy - 0.32, DEE, 2.5); line(s, x1, vy + 0.32, x2, vy + 0.32, DEE, 2.5);
    // open valve (flow to the right)
    line(s, 2.3, vy - 0.32, 2.75, vy - 0.1, DEE, 2.5); line(s, 2.3, vy + 0.32, 2.75, vy + 0.1, DEE, 2.5);
    arrow(s, 1.2, vy, 2.0, vy, C.green, 2); arrow(s, 2.85, vy, 3.4, vy, C.green, 2);
    label(s, 1.3, vy + 0.35, 2.0, 'valve **open**: blood flows to the heart', { size: 10, color: C.green, h: 0.45, valign: 'top' });
    // closed valve (backflow)
    line(s, 4.6, vy - 0.32, 5.0, vy, DEE, 2.5); line(s, 4.6, vy + 0.32, 5.0, vy, DEE, 2.5);
    arrow(s, 5.9, vy, 5.15, vy, C.red, 2);
    label(s, 4.0, vy + 0.35, 2.15, 'valve **shut**: stops backflow', { size: 10, color: C.red, h: 0.45, valign: 'top' });
    label(s, x2 - 0.9, vy - 0.62, 1.0, 'to heart →', { size: 10, bold: true, align: 'right', h: 0.26 });
  },
  head: 'Structure and function',
  lines: [
    '**Arteries** carry blood **away** from the heart at **high pressure**: thick muscular, elastic walls stretch and recoil.',
    '**Veins** carry blood **back** to the heart at **low pressure**: thin walls, wide lumen, **valves** stop backflow.',
    '**Capillaries** link arteries to veins in every tissue: walls **one cell thick** for a short diffusion distance; huge numbers give a large surface area.',
  ],
  size: 11,
  worked: { head: 'Worked example: comparing walls', q: 'An artery wall is 1 mm thick. A capillary wall is 0.001 mm thick. How many times thicker is the artery wall?',
    steps: [['Divide', '1 ÷ 0.001'], ['Answer', '1000 times thicker'], ['Why', 'the artery resists high pressure; the capillary lets substances diffuse']], size: 10.5 },
  workedH: 1.75,
  qc: 'Explain why **veins** need valves but **arteries** do not.',
  notes: 'QUICK CHECK ANSWER: Blood in veins is at low pressure and could flow backwards (e.g. in the legs, against gravity); valves stop this (1). Blood in arteries is at high pressure from the heart pushing it forward, so it does not flow back (1).\nB5.1.5 wording (search extract): "explain how the structures of arteries, veins and capillaries are adapted to their functions, including differences in the vessel walls and the presence of valves". Wall thicknesses are typical values (UNVERIFIED for any one vessel); node: 1 ÷ 0.001 = 1000.',
}), 'B5.1.5 Arteries, veins, capillaries');

// ======================= 20 BLOOD =======================
reg(D.contentSlide({
  title: 'Blood: red blood cells and plasma',
  subtitle: `Specification ${sp('B5.1.6')} • red blood cells carry oxygen; plasma carries almost everything else`,
  tag: 'B5.1.6', caption: 'blood sample after spinning, drawn to scale (left); cells not to scale',
  draw: (s, p) => {
    // test tube to scale: 55% plasma, 1% white cells and platelets, 44% red cells
    const tx = 0.95, ty = 1.75, tw = 0.6, th = 3.6;
    const hp = th * PL / 100, hw = th * WP / 100, hr = th * RB / 100;
    box(s, tx, ty, tw, hp, 'F7E08A', null);
    box(s, tx, ty + hp, tw, hw, 'FAFAFA', null);
    box(s, tx, ty + hp + hw, tw, hr, 'B8323C', null);
    line(s, tx, ty - 0.15, tx, ty + th, C.ink, 2); line(s, tx + tw, ty - 0.15, tx + tw, ty + th, C.ink, 2); line(s, tx, ty + th, tx + tw, ty + th, C.ink, 2);
    tag(s, tx + tw, ty + hp / 2, 1.75, ty + hp / 2, `**plasma** ${PL}%`, 'r', 1.1);
    tag(s, tx + tw, ty + hp + hw / 2, 1.75, ty + hp + 0.25, `white cells, platelets ${WP}%`, 'r', 1.2, { h: 0.45, size: 10 });
    tag(s, tx + tw, ty + hp + hw + hr / 2, 1.75, ty + hp + hw + hr / 2, `**red cells** ${RB}%`, 'r', 1.1);
    // red blood cells
    label(s, 3.15, 1.42, 3.2, 'Red blood cell', { size: 11, bold: true, color: OXE, align: 'left' });
    rbc(s, 3.6, 2.15, 0.36); label(s, 3.15, 2.55, 0.9, 'from above', { size: 10, h: 0.24 });
    rbcSide(s, 4.85, 2.15, 0.85); label(s, 4.4, 2.55, 0.9, 'from the side', { size: 10, h: 0.24 });
    label(s, 3.15, 2.85, 3.2, '**biconcave** disc • **no nucleus** • full of **haemoglobin**', { size: 10, h: 0.45, align: 'left', valign: 'top' });
    // oxyhaemoglobin
    box(s, 3.15, 3.35, 3.2, 0.62, C.white, OXE, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 3.2, 3.35, 3.1, 'lungs: haemoglobin + oxygen → **oxyhaemoglobin**\ntissues: it releases the oxygen', { size: 10, h: 0.62 });
    // other components
    label(s, 3.15, 4.1, 3.2, 'Also in blood', { size: 10.5, bold: true, color: C.grey, align: 'left' });
    wbc(s, 3.45, 4.62, 0.22); label(s, 3.75, 4.45, 1.2, 'white blood cell: defence (B2)', { size: 10, h: 0.4, align: 'left', valign: 'top' });
    [[5.1, 4.55], [5.25, 4.7], [5.05, 4.75]].forEach(([x, y]) => ball(s, x, y, 0.05, 'C9A0D0', '8A5A99'));
    label(s, 5.35, 4.45, 1.0, 'platelets: clotting', { size: 10, h: 0.4, align: 'left', valign: 'top' });
  },
  head: 'Adapted for transport',
  lines: [
    '**Red blood cells** carry **oxygen** from the lungs to the tissues.',
    'Full of **haemoglobin**, which joins with oxygen. **No nucleus**: more room for haemoglobin.',
    '**Biconcave** shape: large surface area for oxygen to diffuse in and out fast; flexible to squeeze through capillaries.',
    '**Plasma** is a pale yellow liquid, mostly **water**. Substances **dissolve** in it: glucose, amino acids, mineral ions, **carbon dioxide**, **urea**, hormones.',
  ],
  size: 11,
  worked: { head: 'Worked example: how much plasma?', q: 'An adult has 5 dm³ of blood. 55% of it is plasma. Calculate the volume of plasma.',
    steps: [['Percent', '55% = 0.55'], ['Multiply', '5 dm³ × 0.55'], ['Answer', '2.75 dm³ of plasma']], size: 10.5 },
  workedH: 1.6,
  qc: 'Calculate the volume of **red cells** in 5 dm³ of blood (44%). Name **two** substances carried in **plasma**.',
  notes: 'QUICK CHECK ANSWER: 5 × 0.44 = 2.2 dm³. Any two: glucose / amino acids / mineral ions / carbon dioxide / urea / hormones / water / antibodies / proteins.\nB5.1.6 wording (search extract): "explain how red blood cells and plasma are adapted to their transport functions in the blood". White blood cells and platelets are included only as context (defence is B2). Percentages are typical values (55% plasma, about 44% red cells, under 1% white cells and platelets); the tube is drawn to scale. Node: 55 + 44 + 1 = 100; 5 × 0.55 = 2.75; 5 × 0.44 = 2.2. Most CO₂ is carried in plasma as hydrogencarbonate ions (stretch).',
}), 'B5.1.6 Red blood cells and plasma');

// ======================= 21 JOURNEYS =======================
{
  const s = D.contentHeader('Putting it together: journeys around the body', `Specification ${sp('B5.1.3')} • how the circulatory system links gas exchange, digestion and excretion`, { tag: 'B5.1.3' });
  const lanes = [
    ['Oxygen', OXE, OXL, ['air in alveoli', 'diffuses into blood', 'joins haemoglobin', 'pulmonary vein', 'left side of heart', 'aorta → arteries', 'capillary', 'muscle cell: respiration']],
    ['Glucose', C.orange, 'FFF4E0', ['villi of small intestine', 'into capillaries', 'dissolved in plasma', 'vena cava', 'right side of heart → lungs', 'left side of heart', 'aorta → capillary', 'muscle cell: respiration']],
    ['Carbon dioxide', DEE, DEL, ['muscle cell', 'into capillary plasma', 'veins', 'vena cava', 'right side of heart', 'pulmonary artery', 'diffuses into alveoli', 'breathed out']],
    ['Urea', '6B5A2A', 'F3EBDD', ['made in the liver', 'dissolved in plasma', 'vena cava', 'heart and lungs', 'left side of heart', 'aorta → artery', 'kidneys filter it', 'leaves in urine']],
  ];
  const x0 = 1.95, bw = 1.27, gap = 0.12;
  lanes.forEach(([nm, col, fill, steps], r) => {
    const y = 1.32 + r * 0.74;
    label(s, 0.45, y, 1.4, nm, { size: 11.5, bold: true, color: col, h: 0.6, align: 'left' });
    steps.forEach((t, i) => {
      const x = x0 + i * (bw + gap);
      node(s, x, y, bw, 0.6, t, fill, col, { size: 10 });
      if (i < steps.length - 1) arrow(s, x + bw, y + 0.3, x + bw + gap, y + 0.3, col, 1.25);
    });
  });
  D.card(s, 0.45, 4.35, 6.1, 1.9, 'The systems work together', [
    '**Gas exchange system** (lungs): O₂ into the blood, CO₂ out.',
    '**Digestive system** (small intestine): dissolved food molecules into the blood.',
    '**Excretory system** (kidneys): urea out of the blood. **Circulatory system** links them all.',
  ], { size: 11 });
  D.workedSteps(s, 6.7, 4.35, 6.18, 1.9, 'Worked example: count the heart visits', 'A glucose molecule goes from the gut to a leg muscle. How many times does it pass through the heart?', [
    ['Route', 'gut → vena cava → right side → lungs → left side → body'], ['Count', 'right side once, left side once'], ['Answer', 'twice (once through each side): a double circulation']], { size: 10.5 });
  D.quickCheck(s, 'Glucose absorbed in the gut passes through the **lungs** before it reaches a muscle. Use the diagram to explain why.');
  D.notes(s, 'QUICK CHECK ANSWER: Blood from the gut returns to the right side of the heart (via the vena cava), and the right side pumps all its blood to the lungs; only after returning to the left side is it pumped to the body / muscles (double circulation).\nSimplified: blood from the gut goes first to the liver (hepatic portal vein) before the vena cava; not required. How the kidneys filter blood is B5.4: named only. This slide supports the B5.1.3 "relationships with the gaseous exchange, digestive and excretory systems" wording.');
  reg(s, 'B5.1.3 Journeys around the body');
}

// ======================= 22 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('B5.1.3')}, ${sp('B5.1.5')}, ${sp('B5.1.6')} • vessels, blood, linked systems`, [
  { q: 'Explain how the structure of an **artery** is related to its function.', marks: 2, ms: 'Thick muscular / elastic wall (1); to withstand / maintain high pressure of blood pumped from the heart (1).' },
  { q: 'Explain how **capillaries** are adapted for exchanging substances with cells.', marks: 2, ms: 'Wall one cell thick / thin, short diffusion distance (1); many capillaries / close to every cell, large surface area (1).' },
  { q: 'Give **two** ways a **red blood cell** is adapted to carry oxygen.', marks: 2, ms: 'Any two (1 each): contains haemoglobin (binds oxygen); no nucleus (more room for haemoglobin); biconcave shape (large surface area for diffusion); small and flexible (fits through capillaries).' },
  { q: 'Name the part of the blood that carries **urea**, and the organ that removes urea from the blood.', marks: 2, ms: 'Plasma (1); kidneys (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Exchange surface', 'A surface where substances move into or out of the body, e.g. alveoli, villi.'],
  ['SA : V ratio', 'Surface area ÷ volume. It gets smaller as an organism gets bigger.'],
  ['Diffusion', 'Net movement of particles from high to low concentration.'],
  ['Alveoli', 'Tiny air sacs in the lungs: large area, thin walls, rich blood supply.'],
  ['Villi', 'Finger-like folds of the small intestine wall that absorb food molecules.'],
  ['Double circulation', 'Blood passes through the heart twice per circuit: lungs, then body.'],
  ['Atrium', 'Upper heart chamber; receives blood from the veins.'],
  ['Ventricle', 'Lower heart chamber; pumps blood into the arteries. Left wall is thickest.'],
  ['Valve', 'Flap that stops blood flowing backwards; in the heart and in veins.'],
  ['Cardiac muscle', 'Heart muscle: contracts again and again without tiring.'],
  ['Artery', 'Carries blood away from the heart at high pressure; thick, elastic wall.'],
  ['Vein', 'Carries blood back to the heart at low pressure; thin wall, valves.'],
  ['Capillary', 'Tiny vessel with a wall one cell thick; exchange with cells.'],
  ['Plasma', 'Liquid part of blood; carries dissolved glucose, CO₂, urea, hormones.'],
  ['Red blood cell', 'Biconcave, no nucleus, full of haemoglobin; carries oxygen.'],
  ['Haemoglobin', 'Red protein that joins with oxygen to form oxyhaemoglobin.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('Humans are large, multicellular organisms. They need **exchange surfaces** and a **circulatory system** to supply their cells.', [
  { l: 'a', q: 'Name the blood vessel that carries blood (i) from the heart to the body (ii) from the lungs back to the heart.', marks: 2, ms: '(i) aorta (1); (ii) pulmonary vein (1).' },
  { l: 'b', q: 'Explain why the human circulatory system is described as a **double** circulation.', marks: 2, ms: 'Blood passes through the heart twice in one complete circuit (1); once through the lungs circuit and once through the body circuit (1).' },
  { l: 'c', q: 'Calculate the SA:V ratio of a cube with sides of **3 cm**. Give your answer as a ratio.', marks: 2, ms: 'SA = 54 cm² and V = 27 cm³ (1); 2 : 1 (1).' },
  { l: 'd', q: 'Use ideas about **SA:V ratio** and **diffusion** to explain why humans need lungs.', marks: 3, ms: 'Humans have a small SA:V ratio (1); the body surface is too small / cells too far from the surface for diffusion alone to supply enough oxygen (1); lungs / alveoli give a very large surface area with a short diffusion distance (1).', h: 1.15 },
  { l: 'e', q: 'Explain **two** ways red blood cells are adapted to carry oxygen.', marks: 2, ms: 'Any two (1 each), with reason: haemoglobin binds oxygen; no nucleus, more room for haemoglobin; biconcave, large surface area for diffusion; flexible, squeeze through capillaries.' },
  { l: 'f', q: 'A patient has a **leaking valve** between the left atrium and the left ventricle. Suggest **two** effects on the patient.', marks: 2, ms: 'Blood flows back into the left atrium when the ventricle contracts (1); less blood / oxygen pumped to the body, so the patient gets tired / breathless easily (1).', h: 1.15 },
], 13, { subtitle: `Specification ${sp('B5.1.2')}–${sp('B5.1.6')} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Gas exchange system: air reaches the alveoli; oxygen diffuses into the blood across thin walls; large surface area; rich blood supply keeps the gradient; carbon dioxide diffuses out and is breathed out.',
    'Oxygen joins haemoglobin in red blood cells (oxyhaemoglobin).',
    'Digestive system: food broken down into small soluble molecules; glucose absorbed through the villi (large surface area, one cell thick, capillary network) into the blood plasma.',
    'Circulatory system: double circulation; blood from the gut goes to the right side of the heart, then the lungs, then the left side; the left ventricle pumps it through the aorta and arteries at high pressure.',
    'Capillaries in the muscle: walls one cell thick; oxygen and glucose diffuse into muscle cells for aerobic respiration; carbon dioxide diffuses out into the plasma.',
    'Carbon dioxide returns in veins to the heart and is pumped to the lungs to be breathed out.',
    'The systems are linked: each depends on the others.',
  ], {
    l3: 'Explains how the gas exchange, digestive AND circulatory systems each contribute, including at least one adaptation, AND links them in a correct sequence to the muscle cell.',
    l2: 'Describes the role of at least two systems with some detail, e.g. oxygen from the alveoli and glucose from the villi carried in the blood; sequence may be incomplete.',
    l1: 'Simple statements, e.g. "oxygen comes from the lungs" or "the heart pumps blood to the muscles".',
  });
}
const HW = [
  { n: '1', q: 'Name the **liquid** part of the blood.', marks: 1, ms: 'Plasma (1).' },
  { n: '2', q: 'Give **two** differences between the structure of an **artery** and a **vein**.', marks: 2, ms: 'Any two (1 each): artery has a thicker wall / more muscle and elastic tissue; artery has a narrower lumen, vein a wider one; veins have valves, arteries do not (except at the heart).' },
  { n: '3', q: 'A cube has sides of **4 cm**. Calculate its SA:V ratio. How many times **smaller** is this than the ratio for a **1 cm** cube?', marks: 3, ms: 'SA = 96 cm² and V = 64 cm³ (1); 1.5 : 1 (1); 1 cm cube is 6 : 1, so 6 ÷ 1.5 = 4 times smaller (1).', h: 1.2 },
  { n: '4', q: 'Explain how the **villi** increase the rate at which glucose is absorbed into the blood.', marks: 2, ms: 'Large surface area (1); AND one of: wall one cell thick / short diffusion distance; capillary network carries glucose away, keeping a steep concentration gradient (1).' },
  { n: '5', q: 'Explain why the walls of capillaries are only **one cell thick**.', marks: 1, ms: 'Short diffusion distance, so substances move quickly between blood and cells (1).' },
  { n: '6', q: 'Name the waste substance made in the liver that is carried in the plasma, and the organ that removes it.', marks: 2, ms: 'Urea (1); kidneys (1).' },
  { n: '7', q: 'A leg muscle cell needs oxygen and glucose for respiration. **Explain** how the **gas exchange**, **digestive** and **circulatory** systems work together to supply them, and to remove the carbon dioxide made.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q3 is a calculation: show your working. Q7 is a 6-mark extended answer.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 8);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 8);
const out = path.join(__dirname, 'OCR21C_B5.1_ExchangeTransport_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
