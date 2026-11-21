// build_T8.js — Edexcel GCSE Biology 1BI0 Topic 8 Exchange and transport in animals (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T8.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 8,
  title: 'Exchange and transport in animals',
  shortTitle: 'T8',
  subtitle: 'Surface area, the lungs, blood, the heart, respiration and cardiac output',
  specRange: '8.1–8.12',
  pOnly: [],
  paper: 'Paper 2',
  keywords: ['SA : V', 'Alveoli', 'Blood', 'The heart', 'Respiration', 'Cardiac output'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
const cube = a => [6 * a * a, a ** 3, 6 * a * a / a ** 3];
calc('SA:V 1 cm', cube(1)[2], 6, 1e-12);
calc('SA:V 2 cm', cube(2)[2], 3, 1e-12);
calc('SA:V 3 cm', cube(3)[2], 2, 1e-12);
calc('SA:V 4 cm', cube(4)[2], 1.5, 1e-12);
calc('SA:V 10 cm', cube(10)[2], 0.6, 1e-12);
calc('cuboid 2×3×4 SA', 2 * (2 * 3 + 3 * 4 + 2 * 4), 52);
calc('cuboid 2×3×4 SA:V (3 s.f.)', sf(52 / 24, 3), 2.17, 1e-12);
calc('YT cuboid 1×2×5 SA', 2 * (1 * 2 + 2 * 5 + 1 * 5), 34);
calc('YT cuboid 1×2×5 SA:V', 34 / 10, 3.4, 1e-12);
const fick = (A, dc, t) => A * dc / t;
calc('Fick SA ×2, thickness ÷2', fick(2, 1, 0.5) / fick(1, 1, 1), 4, 1e-12);
calc('Fick conc diff ×3', fick(1, 3, 1) / fick(1, 1, 1), 3, 1e-12);
calc('Fick thickness ×2 (emphysema-like)', fick(1, 1, 2) / fick(1, 1, 1), 0.5, 1e-12);
calc('YT Fick SA ÷ 2, thickness ×2', fick(0.5, 1, 2) / fick(1, 1, 1), 0.25, 1e-12);
calc('respirometer 24 mm / 10 min', 24 / 10, 2.4, 1e-12);
const vol = (r, d) => Math.PI * r * r * d;
calc('respirometer volume (3 s.f.)', sf(vol(0.5, 24), 3), 18.8, 1e-9);
calc('respirometer volume per min (3 s.f.)', sf(vol(0.5, 24) / 10, 3), 1.88, 1e-9);
calc('per gram for 5 g (3 s.f.)', sf(vol(0.5, 24) / 10 / 5, 3), 0.377, 1e-9);
calc('YT 15 mm / 5 min', 15 / 5, 3, 1e-12);
calc('YT 36 mm / 12 min', 36 / 12, 3, 1e-12);
const RESP = [[10, 0.8], [15, 1.3], [20, 2.0], [25, 2.9], [30, 3.8]];
calc('CP temp 20 → 30 % increase', (3.8 - 2.0) / 2.0 * 100, 90, 1e-9);
calc('CO 70 × 72', 70 * 72, 5040);
calc('CO dm³', 70 * 72 / 1000, 5.04, 1e-12);
calc('SV 5000 / 50', 5000 / 50, 100, 1e-12);
calc('YT CO 120 × 150 (dm³)', 120 * 150 / 1000, 18, 1e-12);
calc('YT HR 6000 / 80', 6000 / 80, 75, 1e-12);
calc('YT SV 4.9 dm³ / 70 (cm³)', 4900 / 70, 70, 1e-12);
calc('pulse 18 in 15 s → bpm', 18 * 4, 72);
calc('pulse 22 in 15 s → bpm', 22 * 4, 88);
calc('O2 21% → 16%', 21 - 16, 5);
calc('glucose energy ratio aerobic / anaerobic (≈ 19)', Math.round(2880 / 150), 19);
calc('R5 CO 80 × 65', 80 * 65, 5200);
calc('FQ SA:V 5 cm', cube(5)[2], 1.2, 1e-12);
calc('FQ CO 75 × 70 (dm³)', 75 * 70 / 1000, 5.25, 1e-12);
calc('HW SA:V 3 cm', cube(3)[2], 2, 1e-12);
calc('HW SV 6300 / 90', 6300 / 90, 70, 1e-12);

// ======================= DECK-SPECIFIC drawing helpers =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: fill ? { color: fill } : { type: 'none' }, line: { color: edge || fill, width: lw } }); }
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
const NUC = ['C9B6E4', '6A4C93'], CHR = ['C8414C', '2F6DB5'], CELL = ['FBE9E7', 'B5655B'];
function fbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1 });
  label(s, x + 0.05, y, w - 0.1, text, { size: o.size || 11, h, bold: o.bold, color: o.color || C.text });
}
// chromosomes
function xchrom(s, x, y, col, k = 1) { line(s, x - 0.07 * k, y - 0.12 * k, x + 0.07 * k, y + 0.12 * k, col, 3.5); line(s, x + 0.07 * k, y - 0.12 * k, x - 0.07 * k, y + 0.12 * k, col, 3.5); }
function chromatid(s, x, y, col, k = 1) { line(s, x, y - 0.12 * k, x, y + 0.12 * k, col, 3.5); }
function cellOut(s, cx, cy, w = 1.7, h = 1.45) { oval(s, cx, cy, w, h, CELL[0], CELL[1], { lw: 1.75 }); }
function spindle(s, cx, cy, half, ys) { ys.forEach(dy => { line(s, cx - half, cy, cx, cy + dy, '9AA5B1', 0.75); line(s, cx + half, cy, cx, cy + dy, '9AA5B1', 0.75); }); }
function mitosisStage(s, stage, cx, cy) {
  const cols = [CHR[0], CHR[1], CHR[0], CHR[1]];
  if (stage === 'cyto') {
    oval(s, cx - 0.43, cy, 0.82, 1.0, CELL[0], CELL[1], { lw: 1.75 }); oval(s, cx + 0.43, cy, 0.82, 1.0, CELL[0], CELL[1], { lw: 1.75 });
    [-0.43, 0.43].forEach(dx => { ball(s, cx + dx, cy, 0.22, NUC[0], NUC[1], 1); polyline(s, [[cx + dx - 0.12, cy - 0.05], [cx + dx - 0.03, cy + 0.08], [cx + dx + 0.05, cy - 0.06], [cx + dx + 0.12, cy + 0.06]], CHR[0], 1.25); });
    return;
  }
  if (stage === 'telo') {
    oval(s, cx, cy, 1.95, 1.2, CELL[0], CELL[1], { lw: 1.75 });
    box(s, cx - 0.06, cy - 0.62, 0.12, 0.14, C.panel, null); box(s, cx - 0.06, cy + 0.48, 0.12, 0.14, C.panel, null);
    [-0.5, 0.5].forEach(dx => { oval(s, cx + dx, cy, 0.6, 0.6, NUC[0], NUC[1], { lw: 1, dash: 'dash' }); cols.forEach((c, i) => chromatid(s, cx + dx - 0.15 + i * 0.1, cy, c, 0.8)); });
    return;
  }
  cellOut(s, cx, cy);
  if (stage === 'inter') {
    ball(s, cx, cy, 0.42, NUC[0], NUC[1], 1.25);
    polyline(s, [[cx - 0.25, cy - 0.1], [cx - 0.12, cy + 0.15], [cx, cy - 0.15], [cx + 0.1, cy + 0.12], [cx + 0.25, cy - 0.05]], CHR[0], 1.25);
    polyline(s, [[cx - 0.2, cy + 0.22], [cx - 0.05, cy + 0.05], [cx + 0.12, cy + 0.25], [cx + 0.22, cy + 0.1]], CHR[1], 1.25);
  } else if (stage === 'pro') {
    oval(s, cx, cy, 0.95, 0.95, null, NUC[1], { lw: 1, dash: 'dash' });
    [[-0.2, -0.18], [0.18, -0.15], [-0.15, 0.2], [0.22, 0.18]].forEach(([dx, dy], i) => xchrom(s, cx + dx, cy + dy, cols[i]));
  } else if (stage === 'meta') {
    spindle(s, cx, cy, 0.7, [-0.39, -0.13, 0.13, 0.39]);
    [-0.39, -0.13, 0.13, 0.39].forEach((dy, i) => xchrom(s, cx, cy + dy, cols[i], 0.85));
  } else if (stage === 'ana') {
    spindle(s, cx, cy, 0.7, [-0.3, -0.1, 0.1, 0.3]);
    [-0.3, -0.1, 0.1, 0.3].forEach((dy, i) => { polyline(s, [[cx - 0.48, cy + dy - 0.08], [cx - 0.36, cy + dy], [cx - 0.48, cy + dy + 0.08]], cols[i], 3); polyline(s, [[cx + 0.48, cy + dy - 0.08], [cx + 0.36, cy + dy], [cx + 0.48, cy + dy + 0.08]], cols[i], 3); });
  }
}
// neurone drawn left → right

function stepBoxes(s, x, y, w, items, o = {}) {
  const h = o.h || 0.62, gap = o.gap || 0.15;
  items.forEach(([t, col], i) => {
    const yy = y + i * (h + gap);
    box(s, x, yy, w, h, col || C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
    ball(s, x + 0.3, yy + h / 2, 0.19, C.blue, C.blue); label(s, x + 0.11, yy + h / 2 - 0.15, 0.38, String(i + 1), { size: 11, bold: true, color: C.white, h: 0.3 });
    s.addText(T.rich(t), { x: x + 0.6, y: yy, w: w - 0.7, h, fontFace: 'Calibri', fontSize: o.size || 11, valign: 'middle', margin: 0, color: C.text });
    if (i < items.length - 1) arrow(s, x + 0.3, yy + h, x + 0.3, yy + h + gap, C.ink, 1.25);
  });
}
function cubeDraw(s, x, y, a, col = 'D6EAF8', edge = '2F5F8F') {
  const d = a * 0.35;
  box(s, x, y + d, a, a, col, edge, { lw: 1.5 });
  poly(s, [[x, y + d], [x + d, y], [x + a + d, y], [x + a, y + d]], 'EAF3FB', edge, { lw: 1.5 });
  poly(s, [[x + a, y + d], [x + a + d, y], [x + a + d, y + a], [x + a, y + a + d]], 'B9D3EE', edge, { lw: 1.5 });
}
const BL = '2F6DB5', RD = 'C8414C';

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Exchange and transport',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • exchange surfaces, blood, the heart, respiration • Core Practical 8.11` },
    { icon: 'H', text: 'Higher & Foundation in one deck • BIOLOGY ONLY slides are marked' },
    { icon: '8', text: 'Topic 8 of 9 • assessed on Paper 2' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 8 Exchange and transport in animals. Paper 2. Confirmed by search: 8.10 compare respiration, 8.11 Core Practical respiration rate, 8.12 cardiac output. Biology only: Fick’s law (8.4B, medium-low confidence). No Higher-only statements believed. See SPEC_T8.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '8.1–8.2', text: 'Explain the need for **transport** and **exchange surfaces**; calculate **SA : V**.' },
  { code: '8.3', text: 'Explain how **alveoli** are adapted for gas exchange.' },
  { code: '8.4B', text: 'Use **Fick’s law** to explain the rate of diffusion.' },
  { code: '8.5', text: 'Explain the structure and function of the parts of the **blood**.' },
  { code: '8.6–8.7', text: 'Explain **arteries, veins, capillaries** and the **heart**.' },
  { code: '8.8–8.10', text: 'Describe **respiration**; compare **aerobic** and **anaerobic** respiration.' },
  { code: '8.11', text: '**Core Practical:** investigate the rate of respiration.' },
  { code: '8.12', text: 'Calculate **cardiac output = stroke volume × heart rate**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'B suffix = biology only: 8.4B (Fick’s law; medium-low confidence). No HT statements believed in Topic 8.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 8 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['8.1–8.3', 'Transport, SA : V, alveoli', 'BOTH COURSES'],
    ['8.4B', 'Fick’s law', 'BIOLOGY ONLY'],
    ['8.5', 'Blood', 'BOTH COURSES'],
    ['8.6–8.7', 'Blood vessels and the heart', 'BOTH COURSES'],
    ['8.8–8.10', 'Aerobic and anaerobic respiration', 'BOTH COURSES'],
    ['8.11', 'CP rate of respiration', 'BOTH COURSES'],
    ['8.12', 'Cardiac output', 'BOTH COURSES'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 8\nExchange and transport', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 diffusion • Topic 5 CVD • Topic 6 transport in plants • Topic 7 hormones', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 8 is tested on **Paper 2** (1 h 45 min, 100 marks).',
      'Combined Science 1SC0 tests the statements **without** a B.',
      'Maths: **SA : V**, **rates**, **πr² × distance**, **cardiac output**.',
      '**Core Practical 8.11**: rate of respiration.',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: Fick’s law (8.4B).',
      'No Higher-only statements are believed to be in Topic 8.',
      'Higher students should push the **explain** questions and the 6-mark answer.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Combined Science route: skip slide 10 (Fick’s law), recap 2 Q3 and the key word Fick’s law. No Higher-only content believed. Check the code and biology-only marker for Fick’s law (8.4B) against the Pearson PDF.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • transport', q: 'Define **diffusion**.' },
  { from: 'Topic 1 • transport', q: 'Give **two** factors that increase the rate of diffusion.' },
  { from: 'Topic 1 • cells', q: 'Which organelle is the site of **aerobic respiration**?' },
  { from: 'Topic 5 • CVD', q: 'What does a **stent** do?' },
  { from: 'KS3 • body', q: 'Name the blood vessels that carry blood **away** from the heart.' },
  { from: 'KS3 • maths', q: 'Calculate the **surface area** of a 2 cm cube.' },
], { subtitle: 'Recall from Topics 1 and 5 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Net movement of particles from a high to a low concentration.\n2. Any two: larger concentration gradient; higher temperature; larger surface area; shorter distance.\n3. Mitochondria.\n4. Holds a narrowed artery open.\n5. Arteries.\n6. 6 × 2 × 2 = 24 cm².' }), 'Retrieval starter');

// ======================= 5 NEED FOR TRANSPORT =======================
reg(D.contentSlide({
  title: 'Why organisms need to exchange substances',
  subtitle: 'Specification 8.1 • what goes in and what comes out',
  tag: '8.1', caption: 'substances exchanged by a cell',
  draw: (s, p) => {
    oval(s, 3.5, 3.4, 2.6, 2.0, 'FBE9E7', 'B5655B', { lw: 2 }); ball(s, 3.4, 3.4, 0.35, 'C9B6E4', '6A4C93', 1);
    const ex = (y, side) => { const dy = (y - 3.4) / 1.0; return 3.5 + side * 1.3 * Math.sqrt(Math.max(0, 1 - dy * dy)); };
    [['oxygen', 2.6], ['glucose / food molecules', 3.1], ['water', 3.6], ['mineral ions', 4.1]].forEach(([t, y]) => { label(s, 0.55, y - 0.15, 1.55, t, { size: 10.5, bold: true, color: C.blue, h: 0.3, align: 'right' }); arrow(s, 2.12, y, ex(y, -1), y, C.blue, 1.75); });
    [['carbon dioxide', 2.9], ['urea', 3.9]].forEach(([t, y]) => { arrow(s, ex(y, 1), y, 5.0, y, C.red, 1.75); label(s, 5.05, y - 0.15, 1.4, t, { size: 10.5, bold: true, color: C.red, h: 0.3, align: 'left' }); });
    label(s, 0.7, 4.9, 2.6, '**IN**', { size: 12, color: C.blue }); label(s, 4.1, 4.9, 2.2, '**OUT**', { size: 12, color: C.red });
  },
  head: 'What and why',
  lines: [
    '**In:** **oxygen** and **glucose** (for respiration), **water**, **mineral ions**, dissolved **food molecules** (amino acids, fatty acids).',
    '**Out:** **carbon dioxide** (from respiration) and **urea** (from breaking down excess amino acids in the liver).',
    'Single-celled organisms exchange directly across the **cell membrane** by diffusion; large organisms need **exchange surfaces** and a **transport system**.',
  ],
  worked: { head: 'Explain', q: 'Why must carbon dioxide be removed from cells?',
    steps: [['Made', 'waste product of respiration'], ['Problem', 'forms an acid in solution'], ['Effect', 'changes pH; enzymes affected'], ['Answer', 'must be removed and breathed out']] },
  qc: 'Name **two** substances cells take in and **two** waste products they remove.',
  notes: 'QUICK CHECK ANSWER: in: any two of oxygen, glucose, water, mineral ions, amino acids (1); out: carbon dioxide, urea (1).\nSpec 8.1.',
}), '8.1 The need for exchange');

// ======================= 6 SA:V =======================
reg(D.contentSlide({
  title: 'Surface area to volume ratio',
  subtitle: 'Specification 8.2 • why large organisms need exchange surfaces',
  tag: '8.2', caption: 'cubes of side 1, 2 and 3 cm',
  draw: (s, p) => {
    cubeDraw(s, 0.9, 2.95, 0.45); cubeDraw(s, 2.05, 2.5, 0.9); cubeDraw(s, 3.75, 2.05, 1.35);
    const rows = [[HDR('Side (cm)'), HDR('SA (cm²)'), HDR('Volume (cm³)'), HDR('SA : V')], ...[1, 2, 3, 4].map((a, i) => { const [A, V, r] = cube(a); return [tcell(String(a), i, { bold: true }), tcell(String(A), i), tcell(String(V), i), tcell(r + ' : 1', i, { bold: true, color: C.red })]; })];
    table(s, rows, { x: 0.75, y: 3.85, w: 5.5, colW: [1.2, 1.3, 1.6, 1.4], rowH: 0.36, fontSize: 11 });
  },
  head: 'Key ideas',
  lines: [
    'As an organism gets **bigger**, its **SA : V ratio gets smaller**.',
    'Small organisms (e.g. amoeba) have a **large SA : V**: diffusion across the surface is **fast enough** to supply every cell.',
    'Large organisms have a **small SA : V** and long **diffusion distances**: they need **exchange surfaces** (lungs, gills, villi) and a **transport system** (blood).',
  ],
  worked: { head: 'Worked example', q: 'Calculate SA : V for a 2 cm × 3 cm × 4 cm cuboid.',
    steps: [['SA', '2 × (2×3 + 3×4 + 2×4) = 52 cm²'], ['V', '2 × 3 × 4 = 24 cm³'], ['Ratio', '52 ÷ 24 = 2.17'], ['Answer', '2.17 : 1']] },
  qc: 'Calculate the SA : V ratio of a **10 cm** cube.',
  notes: 'QUICK CHECK ANSWER: SA = 600 cm², V = 1000 cm³, ratio 0.6 : 1.\nSpec 8.2. All values checked.',
}), '8.2 SA : V ratio');

// ======================= 7 SA:V PRACTICE =======================
{
  const s = D.contentHeader('Practice: surface area and exchange', 'Specification 8.2 • calculations and explanations', { tag: '8.2' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'Compare a **1 cm** cube and a **4 cm** cube.',
    [['1 cm', 'SA 6, V 1 → **6 : 1**'], ['4 cm', 'SA 96, V 64 → **1.5 : 1**'], ['Compare', 'small cube has 4 × the SA per unit volume'], ['Answer', 'bigger organism → smaller SA : V']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Calculate the SA : V of a **3 cm** cube.',
    '**2** Calculate the SA : V of a **1 cm × 2 cm × 5 cm** cuboid.',
    '**3** Explain why a flatworm does **not** need a blood system.',
    '**4** Explain why an **elephant** has a lower SA : V than a mouse and how it copes.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'As the size of a cube **doubles**, what happens to its SA : V ratio?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 54 : 27 = 2 : 1. 2) SA 34, V 10 → 3.4 : 1. 3) flat body = large SA : V and short diffusion distance, so diffusion is fast enough. 4) larger volume relative to surface; has lungs, a heart and blood vessels (transport system).\nQUICK CHECK: it halves.');
  reg(s, '8.2 Practice: SA : V');
}

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 8.1–8.2 • exchange and SA : V', [
  { q: 'Name the waste product made when the liver breaks down excess amino acids.', marks: 1, ms: 'Urea (1).' },
  { q: 'Calculate the SA : V ratio of a 5 cm cube.', marks: 2, ms: 'SA 150, V 125 (1); 1.2 : 1 (1).' },
  { q: 'Explain why multicellular organisms need a transport system.', marks: 3, ms: 'Small SA : V (1); long diffusion distances to inner cells (1); diffusion alone is too slow to supply / remove substances (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 ALVEOLI =======================
reg(D.contentSlide({
  title: 'Gas exchange in the alveoli',
  subtitle: 'Specification 8.3 • adapted for fast diffusion',
  tag: '8.3', caption: 'an alveolus and its capillary',
  draw: (s, p) => {
    ball(s, 2.9, 3.3, 1.45, 'EAF3FB', '5B87B5', 2);
    label(s, 2.0, 2.6, 1.8, 'air in alveolus\nhigh O₂, low CO₂', { size: 10.5, h: 0.6 });
    s.addShape(SH.ARC, { x: 1.25, y: 1.65, w: 3.3, h: 3.3, angleRange: [10, 170], line: { color: RD, width: 10 } });
    arrow(s, 2.9, 3.5, 2.9, 4.45, '2E7D4F', 2.5); label(s, 2.95, 3.6, 0.5, 'O₂', { size: 12, bold: true, color: '2E7D4F', align: 'left' });
    arrow(s, 3.5, 4.45, 3.5, 3.5, '8E44AD', 2.5); label(s, 3.55, 3.6, 0.6, 'CO₂', { size: 12, bold: true, color: '8E44AD', align: 'left' });
    callout(s, 4.6, 5.25, 1.6, 'capillary', 4.2, 4.6, RD, { size: 10.5 });
    callout(s, 4.6, 1.75, 1.6, 'wall one cell thick', 3.9, 2.25, '5B87B5', { size: 10.5, h: 0.45 });
    [[1.85, 4.55], [2.35, 4.7], [3.4, 4.75], [3.95, 4.5]].forEach(([x, y]) => oval(s, x, y, 0.22, 0.12, 'E74C3C', 'A93226'));
  },
  head: 'Adaptations',
  lines: [
    '**Huge surface area**: about 700 million alveoli in the lungs.',
    '**Thin walls** (one cell thick) and **capillary walls** one cell thick: **short diffusion distance**.',
    '**Rich blood supply** carries O₂ away and brings CO₂: keeps a **steep concentration gradient**.',
    '**Ventilation** (breathing) brings fresh air: keeps O₂ high and CO₂ low in the alveoli.',
    '**Moist** lining: gases dissolve before diffusing.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why a good blood supply speeds up gas exchange.',
    steps: [['Remove', 'blood carries oxygen away'], ['Low', 'O₂ stays low in the blood'], ['Gradient', 'steep concentration gradient kept'], ['Answer', 'diffusion stays fast']] },
  qc: 'Give **three** adaptations of alveoli for gas exchange.',
  notes: 'QUICK CHECK ANSWER: any three: large surface area; thin walls / one cell thick; good blood supply / many capillaries; moist; ventilated (1 each).\nSpec 8.3. Inhaled air is about 21% O₂; exhaled about 16%.',
}), '8.3 Alveoli');

// ======================= 10 FICK'S LAW (B) =======================
{
  const s = D.contentHeader('Fick’s law', 'Specification 8.4B • factors affecting the rate of diffusion', { tag: '8.4B', p: true });
  D.card(s, 0.45, 1.3, 6.1, 2.2, 'The law', [
    '**rate of diffusion ∝ (surface area × concentration difference) ÷ thickness of membrane**',
    'Double the surface area → **double** the rate. Double the thickness → **half** the rate.',
  ], { size: 13 });
  D.workedSteps(s, 0.45, 3.65, 6.1, 2.6, 'My turn', 'The surface area doubles and the membrane is half as thick.', [
    ['SA', '× 2'], ['Thickness', '÷ 2, so rate × 2'], ['Combine', '2 × 2 = 4'], ['Answer', 'rate is **4 times** faster']], { size: 12.5 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** The concentration difference **triples**. How does the rate change?',
    '**2** In emphysema the alveolar walls break down (less surface area). Explain the effect on gas exchange.',
    '**3** In a lung disease the membrane becomes **twice** as thick. How does the rate change?',
    '**4** The surface area **halves** and the thickness **doubles**. Calculate the new rate as a fraction.',
  ], { size: 13.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Use Fick’s law to explain why villi in the small intestine increase absorption.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) × 3. 2) smaller surface area so slower diffusion; less O₂ into the blood (patients are breathless). 3) halves. 4) 1/2 × 1/2 = 1/4.\nQUICK CHECK: villi greatly increase the surface area, so rate of diffusion increases (rate ∝ surface area).\nSpec 8.4B (biology only; code and marker medium-low confidence).');
  reg(s, '8.4B Fick’s law (BIOLOGY ONLY)');
}

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 8.3–8.4B • alveoli and diffusion', [
  { q: 'Explain how ventilation helps gas exchange in the alveoli.', marks: 2, ms: 'Brings fresh air with high O₂ / removes CO₂ (1); maintains a steep concentration gradient (1).' },
  { q: 'Explain why the walls of the alveoli are only one cell thick.', marks: 2, ms: 'Short diffusion distance (1); so faster diffusion of gases (1).' },
  { q: 'Use Fick’s law to predict the effect of doubling the concentration difference and doubling the surface area.', marks: 2, ms: 'Each doubles the rate (1); overall rate × 4 (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 BLOOD =======================
reg(D.contentSlide({
  title: 'The blood',
  subtitle: 'Specification 8.5 • structure related to function',
  tag: '8.5', caption: 'blood cells (not to scale)',
  draw: (s, p) => {
    box(s, 0.75, 1.55, 5.5, 4.15, 'FBEFD3', 'E0C88A', { lw: 1 });
    label(s, 0.85, 1.6, 2.5, '**plasma** (55%)', { size: 10.5, align: 'left', color: '8A6A0A', h: 0.3 });
    [[1.5, 2.5], [2.4, 2.9], [1.8, 3.6], [4.9, 2.4], [5.4, 3.3], [4.6, 4.9]].forEach(([x, y]) => { oval(s, x, y, 0.6, 0.6, 'E74C3C', 'A93226', { lw: 1.25 }); oval(s, x, y, 0.28, 0.28, 'F1948A', null); });
    callout(s, 0.9, 4.45, 1.8, 'red blood cell', 1.8, 3.85, 'A93226', { size: 10.5 });
    ball(s, 3.5, 2.7, 0.45, 'E8EEF7', '2F5F8F', 1.5); poly(s, [[3.3, 2.5], [3.55, 2.55], [3.6, 2.8], [3.4, 2.95], [3.25, 2.75]], 'B9A2D8', '6A4C93');
    label(s, 3.0, 3.2, 1.0, 'phagocyte', { size: 10, bold: true, color: '2F5F8F', h: 0.3 });
    ball(s, 3.3, 4.3, 0.35, 'E8EEF7', '2F5F8F', 1.5); ball(s, 3.3, 4.3, 0.27, 'B9A2D8', '6A4C93', 0.5);
    label(s, 2.8, 4.7, 1.0, 'lymphocyte', { size: 10, bold: true, color: '2F5F8F', h: 0.3 });
    [[4.3, 3.6], [4.45, 3.75], [4.2, 3.85]].forEach(([x, y]) => oval(s, x, y, 0.14, 0.08, 'D7A8C8', '8E4A7A'));
    label(s, 4.05, 3.95, 0.9, 'platelets', { size: 10, bold: true, color: '8E4A7A', h: 0.3 });
  },
  head: 'Parts and functions',
  lines: [
    '**Red blood cells** carry **oxygen**: **haemoglobin** binds O₂; **no nucleus** (more room); **biconcave** shape (large surface area).',
    '**White blood cells:** **phagocytes** engulf and digest pathogens; **lymphocytes** make **antibodies**.',
    '**Platelets:** cell fragments that help the blood **clot** at a wound.',
    '**Plasma:** liquid that carries **glucose**, amino acids, **CO₂**, **urea**, hormones, antibodies and the cells.',
  ],
  worked: { head: 'Explain', q: 'Why do red blood cells have no nucleus?',
    steps: [['Space', 'more room inside the cell'], ['Haemoglobin', 'more haemoglobin fits in'], ['Oxygen', 'carries more oxygen'], ['Answer', 'adapted to transport oxygen']] },
  qc: 'Name the part of the blood that **clots** and the part that carries **urea**.',
  notes: 'QUICK CHECK ANSWER: platelets (1); plasma (1).\nSpec 8.5.',
}), '8.5 Blood');

// ======================= 13 VESSELS =======================
reg(D.contentSlide({
  title: 'Blood vessels',
  subtitle: 'Specification 8.6 • arteries, veins and capillaries',
  tag: '8.6', caption: 'cross-sections (not to scale)',
  draw: (s, p) => {
    const v = [[1.4, 'Artery', 0.85, 0.28, RD], [3.4, 'Vein', 0.85, 0.6, BL], [5.3, 'Capillary', 0.25, 0.18, RD]];
    v.forEach(([x, n, R, r, c]) => {
      ball(s, x, 2.6, R, 'F2D0B8', '8C4A42', 2); ball(s, x, 2.6, r, c === RD ? 'F5B7B1' : 'AED6F1', c, 1.5);
      label(s, x - 0.8, 3.6, 1.6, `**${n}**`, { size: 12, color: c });
    });
    label(s, 0.6, 3.95, 1.8, 'thick muscular, elastic wall; narrow lumen', { size: 9.5, h: 0.6, valign: 'top' });
    label(s, 2.6, 3.95, 1.7, 'thin wall; wide lumen', { size: 9.5, h: 0.6, valign: 'top' });
    label(s, 4.5, 3.95, 1.7, 'wall one cell thick', { size: 9.5, h: 0.6, valign: 'top' });
    box(s, 2.95, 4.65, 0.9, 1.0, 'AED6F1', BL, { lw: 2 });
    poly(s, [[2.97, 4.8], [3.4, 5.25], [2.97, 5.25]], 'F2D0B8', '8C4A42'); poly(s, [[3.83, 4.8], [3.4, 5.25], [3.83, 5.25]], 'F2D0B8', '8C4A42');
    arrow(s, 3.4, 5.6, 3.4, 4.75, BL, 1.5); label(s, 3.95, 4.95, 1.6, 'valve stops backflow', { size: 9.5, h: 0.3, align: 'left' });
  },
  head: 'Structure and function',
  lines: [
    '**Arteries** carry blood **away** from the heart at **high pressure**: **thick, muscular, elastic** walls stretch and recoil.',
    '**Veins** carry blood **to** the heart at **low pressure**: **thin** walls, **wide lumen**, **valves** stop blood flowing backwards.',
    '**Capillaries** exchange substances with cells: walls **one cell thick** (short diffusion distance); very narrow, so close to every cell.',
  ],
  worked: { head: 'Explain', q: 'Why do veins need valves but arteries do not?',
    steps: [['Pressure', 'blood in veins is at low pressure'], ['Risk', 'blood could flow backwards'], ['Valves', 'close to stop backflow'], ['Answer', 'arteries have high pressure from the heart']] },
  qc: 'Explain why arteries have **thick, elastic** walls.',
  notes: 'QUICK CHECK ANSWER: blood is at high pressure (from the heart) (1); thick walls withstand the pressure, elastic tissue stretches and recoils / smooths flow (1).\nSpec 8.6.',
}), '8.6 Blood vessels');

// ======================= 14 HEART =======================
reg(D.contentSlide({
  title: 'The heart',
  subtitle: 'Specification 8.7 • four chambers, valves and major vessels',
  tag: '8.7', caption: 'front view: the left side of the heart is on the right of the diagram',
  draw: (s, p) => {
    box(s, 1.6, 2.3, 1.6, 1.25, 'AED6F1', BL, { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 2 });
    box(s, 3.4, 2.3, 1.6, 1.25, 'F5B7B1', RD, { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 2 });
    box(s, 1.6, 3.7, 1.6, 1.8, 'AED6F1', BL, { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 3 });
    box(s, 3.4, 3.7, 1.6, 1.8, 'F5B7B1', RD, { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 6 });
    label(s, 1.62, 2.65, 1.2, '**right\natrium**', { size: 10.5, h: 0.6 }); label(s, 3.82, 2.65, 1.18, '**left\natrium**', { size: 10.5, h: 0.6 });
    label(s, 1.6, 4.3, 1.6, '**right ventricle**', { size: 10.5, h: 0.4 }); label(s, 3.4, 4.3, 1.6, '**left ventricle**', { size: 10.5, h: 0.4 });
    [[2.4, BL], [4.2, RD]].forEach(([x, c]) => { line(s, x - 0.35, 3.62, x - 0.05, 3.85, '333333', 2.5); line(s, x + 0.35, 3.62, x + 0.05, 3.85, '333333', 2.5); });
    box(s, 1.0, 1.6, 0.4, 1.3, 'AED6F1', BL, { lw: 1.5 }); arrow(s, 1.2, 1.75, 1.2, 2.8, BL, 1.5); line(s, 1.4, 2.7, 1.6, 2.7, BL, 4);
    label(s, 0.55, 1.3, 1.3, 'vena cava', { size: 9.5, bold: true, color: BL, h: 0.3 });
    box(s, 2.8, 1.45, 0.32, 2.3, 'AED6F1', BL, { lw: 1.5 }); arrow(s, 2.96, 3.6, 2.96, 1.6, BL, 1.5);
    label(s, 2.2, 1.15, 1.5, 'pulmonary artery', { size: 9.5, bold: true, color: BL, h: 0.3 });
    box(s, 5.2, 1.6, 0.4, 1.3, 'F5B7B1', RD, { lw: 1.5 }); arrow(s, 5.4, 1.75, 5.4, 2.8, RD, 1.5); line(s, 5.0, 2.7, 5.2, 2.7, RD, 4);
    label(s, 4.85, 1.3, 1.5, 'pulmonary vein', { size: 9.5, bold: true, color: RD, h: 0.3 });
    box(s, 3.48, 1.45, 0.32, 2.3, 'F5B7B1', RD, { lw: 1.5 }); arrow(s, 3.64, 3.6, 3.64, 1.6, RD, 1.5);
    label(s, 3.45, 1.15, 0.9, 'aorta', { size: 9.5, bold: true, color: RD, h: 0.3 });
    label(s, 0.7, 5.55, 5.6, 'Valves (black) stop backflow. The left ventricle wall is **thickest**.', { size: 10.5, h: 0.3 });
  },
  head: 'Structure and function',
  lines: [
    '**Atria** receive blood; **ventricles** pump it out.',
    '**Right side:** deoxygenated blood from the body (**vena cava**) → right atrium → right ventricle → **pulmonary artery** → lungs.',
    '**Left side:** oxygenated blood from the lungs (**pulmonary vein**) → left atrium → left ventricle → **aorta** → body.',
    '**Valves** prevent backflow. The **left ventricle** has a **thicker muscular wall** to pump blood all round the body at high pressure.',
  ],
  worked: { head: 'Explain', q: 'Why is the left ventricle wall thicker than the right?',
    steps: [['Left', 'pumps blood to the whole body'], ['Right', 'pumps only to the nearby lungs'], ['Pressure', 'left needs much higher pressure'], ['Answer', 'more muscle to contract more strongly']] },
  qc: 'Name the blood vessel that carries **oxygenated** blood from the lungs to the heart.',
  notes: 'QUICK CHECK ANSWER: pulmonary vein (1).\nSpec 8.7. Remind students that the diagram is drawn as if facing the person, so left and right are swapped.',
}), '8.7 The heart');

// ======================= 15 DOUBLE CIRCULATION =======================
reg(D.contentSlide({
  title: 'The double circulatory system',
  subtitle: 'Specification 8.7 • blood passes through the heart twice per circuit',
  tag: '8.7', caption: 'pulmonary circuit (top) and systemic circuit (bottom)',
  draw: (s, p) => {
    box(s, 2.4, 1.55, 2.2, 0.7, 'FFFFFF', '777777', { shape: SH.ROUNDED_RECTANGLE, r: 0.2 }); label(s, 2.4, 1.55, 2.2, '**lungs**', { size: 12, h: 0.7 });
    box(s, 2.4, 4.85, 2.2, 0.75, 'FFFFFF', '777777', { shape: SH.ROUNDED_RECTANGLE, r: 0.2 }); label(s, 2.4, 4.85, 2.2, '**body organs**', { size: 12, h: 0.75 });
    box(s, 2.6, 3.0, 0.9, 1.1, 'AED6F1', BL, { lw: 2 }); box(s, 3.5, 3.0, 0.9, 1.1, 'F5B7B1', RD, { lw: 2 });
    label(s, 2.6, 3.0, 0.9, 'R', { size: 14, bold: true, h: 1.1 }); label(s, 3.5, 3.0, 0.9, 'L', { size: 14, bold: true, h: 1.1 });
    polyline(s, [[2.8, 3.0], [1.6, 2.6], [1.6, 1.9], [2.4, 1.9]], BL, 3); arrow(s, 2.1, 1.9, 2.4, 1.9, BL, 3);
    polyline(s, [[4.6, 1.9], [5.4, 1.9], [5.4, 2.6], [4.2, 3.0]], RD, 3); arrow(s, 4.6, 2.75, 4.2, 3.0, RD, 3);
    polyline(s, [[4.2, 4.1], [5.4, 4.5], [5.4, 5.2], [4.6, 5.2]], RD, 3); arrow(s, 4.9, 5.2, 4.6, 5.2, RD, 3);
    polyline(s, [[2.4, 5.2], [1.6, 5.2], [1.6, 4.5], [2.8, 4.1]], BL, 3); arrow(s, 2.4, 4.3, 2.8, 4.1, BL, 3);
    label(s, 0.7, 2.2, 0.9, 'to lungs', { size: 9.5, color: BL, h: 0.3 }); label(s, 5.45, 2.2, 0.9, 'from lungs', { size: 9.5, color: RD, h: 0.3, align: 'left' });
  },
  head: 'Why two circuits?',
  lines: [
    '**Pulmonary circuit:** right ventricle → lungs → left atrium (blood picks up **oxygen**).',
    '**Systemic circuit:** left ventricle → body → right atrium (blood delivers oxygen).',
    'Blood returns to the heart after the lungs, so it can be **pumped again at high pressure** to the body.',
    'Keeps **oxygenated** and **deoxygenated** blood **separate**, so tissues get blood rich in oxygen.',
  ],
  worked: { head: 'Explain', q: 'Why is a double circulation efficient?',
    steps: [['Pressure', 'blood re-pumped after the lungs'], ['Speed', 'reaches organs quickly at high pressure'], ['Separate', 'oxygenated blood not mixed'], ['Answer', 'more oxygen delivered to respiring cells']] },
  qc: 'Trace the path of a red blood cell from the **vena cava** to the **aorta**.',
  notes: 'QUICK CHECK ANSWER: vena cava → right atrium → right ventricle → pulmonary artery → lungs → pulmonary vein → left atrium → left ventricle → aorta (2 for correct full order; 1 for mostly correct).\nSpec 8.7.',
}), '8.7 Double circulation');

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 8.5–8.7 • blood, vessels and the heart', [
  { q: 'Describe **two** adaptations of red blood cells.', marks: 2, ms: 'Any two: no nucleus; haemoglobin; biconcave / large surface area; small and flexible (1 each).' },
  { q: 'Explain how capillaries are adapted for exchange.', marks: 2, ms: 'Walls one cell thick (1); short diffusion distance / close to cells / large network (1).' },
  { q: 'Explain the function of the valves in the heart.', marks: 2, ms: 'Prevent backflow of blood (1); so blood flows one way: atria → ventricles → arteries (1).' },
  { q: 'Name the blood vessel that carries blood from the left ventricle.', marks: 1, ms: 'Aorta (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 RESPIRATION =======================
reg(D.contentSlide({
  title: 'Cellular respiration',
  subtitle: 'Specification 8.8 • an exothermic reaction in every living cell',
  tag: '8.8', caption: 'what the energy from respiration is used for',
  draw: (s, p) => {
    ball(s, 3.5, 3.35, 0.85, 'F0B26B', 'B5782E', 2); label(s, 2.65, 3.1, 1.7, '**respiration** (mitochondria)', { size: 10.5, h: 0.55 });
    const u = [['muscle contraction', 3.5, 1.75], ['keeping warm (mammals, birds)', 5.4, 2.55], ['active transport', 5.4, 4.3], ['making large molecules (proteins)', 3.5, 5.1], ['nerve impulses', 1.6, 4.3], ['cell division', 1.6, 2.55]];
    u.forEach(([t, x, y]) => { line(s, 3.5, 3.35, x, y, '999999', 1.25); box(s, x - 0.85, y - 0.3, 1.7, 0.6, C.white, 'B5782E', { shape: SH.ROUNDED_RECTANGLE, r: 0.15 }); label(s, x - 0.82, y - 0.3, 1.64, t, { size: 9.5, h: 0.6 }); });
    ball(s, 3.5, 3.35, 0.85, 'F0B26B', 'B5782E', 2); label(s, 2.65, 3.1, 1.7, '**respiration** (mitochondria)', { size: 10.5, h: 0.55 });
  },
  head: 'Key ideas',
  lines: [
    '**Respiration** is an **exothermic** reaction that happens **continuously** in all living cells.',
    'It **releases energy** from glucose for **metabolic processes**. (Respiration is **not** breathing.)',
    '**Aerobic:** glucose + oxygen → carbon dioxide + water. C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O.',
    'Aerobic respiration happens in the **mitochondria**.',
  ],
  worked: { head: 'Common mistake', q: '"Respiration makes energy." Correct this.',
    steps: [['Error', 'energy cannot be made'], ['Correct', 'respiration releases energy'], ['From', 'stored in glucose'], ['Answer', 'respiration releases energy from glucose']] },
  qc: 'Give **three** uses of the energy released by respiration.',
  notes: 'QUICK CHECK ANSWER: any three: muscle contraction; keeping warm; active transport; building large molecules (protein synthesis); nerve impulses; cell division (1 each).\nSpec 8.8.',
}), '8.8 Respiration');

// ======================= 18 ANAEROBIC =======================
reg(D.contentSlide({
  title: 'Anaerobic respiration',
  subtitle: 'Specification 8.9 • respiration without oxygen',
  tag: '8.9', caption: 'oxygen uptake during and after hard exercise (model data)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.2, xmin: 0, xmax: 20, xstep: 5, ymin: 0, ymax: 4, ystep: 1, xlabel: 'Time (min)', ylabel: 'O₂ uptake (dm³/min)' };
    const f = t => (t < 2 ? 0.4 : t < 3 ? 0.4 + (t - 2) * 2.6 : t <= 10 ? 3.0 : 0.4 + 2.6 * Math.exp(-(t - 10) / 2.2));
    axes(s, g); fnLine(s, g, f, 0, 20, 120, C.blue, 2.5);
    box(s, px(g, 2), py(g, 4), px(g, 10) - px(g, 2), py(g, 0) - py(g, 4), 'F5B041', null, { tr: 85 });
    label(s, px(g, 3), py(g, 3.9), 2.0, 'exercise', { size: 10, bold: true, color: '8A560A', align: 'left' });
    label(s, px(g, 10.5), py(g, 2.5), 2.0, 'oxygen debt repaid', { size: 10, bold: true, color: C.red, align: 'left' });
  },
  head: 'In muscles and yeast',
  lines: [
    'During hard exercise, muscles cannot get enough oxygen, so they also respire **anaerobically**.',
    '**Muscles (animals):** glucose → **lactic acid**. Releases **much less energy**; lactic acid causes **fatigue** (cramp).',
    'After exercise, extra oxygen is needed to break down the lactic acid: the **oxygen debt** (EPOC). Breathing stays fast.',
    '**Yeast and plants:** glucose → **ethanol + carbon dioxide** (**fermentation**): used in bread and brewing.',
  ],
  worked: { head: 'Explain', q: 'Why do you keep breathing hard after a sprint?',
    steps: [['Anaerobic', 'lactic acid built up in muscles'], ['Debt', 'oxygen needed to break it down'], ['Breathing', 'fast and deep to take in O₂'], ['Answer', 'repaying the oxygen debt']] },
  qc: 'Write the word equation for anaerobic respiration in **yeast**.',
  notes: 'QUICK CHECK ANSWER: glucose → ethanol + carbon dioxide (1 each side).\nSpec 8.9. Graph shape is model data.',
}), '8.9 Anaerobic respiration');

// ======================= 19 COMPARE =======================
{
  const s = D.contentHeader('Comparing aerobic and anaerobic respiration', 'Specification 8.10', { tag: '8.10' });
  const rows = [[HDR(''), HDR('Aerobic'), HDR('Anaerobic (muscles)'), HDR('Anaerobic (yeast)')], ...[
    ['Oxygen needed?', 'yes', 'no', 'no'],
    ['Products', 'carbon dioxide + water', 'lactic acid', 'ethanol + carbon dioxide'],
    ['Energy released', 'a lot (complete breakdown)', 'much less', 'much less'],
    ['Where', 'mitochondria', 'cytoplasm', 'cytoplasm'],
    ['When', 'all the time', 'hard exercise', 'no oxygen (fermentation)'],
  ].map(([a, b, c, d], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i), tcell(d, i)])];
  table(s, rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.4, 3.4, 3.2, 3.43], rowH: 0.6, fontSize: 13 });
  D.workedSteps(s, 0.45, 5.0, 12.43, 1.25, 'Exam technique: compare', '', [['Rule', 'each point needs both sides, e.g. "aerobic needs oxygen whereas anaerobic does not"'], ['Answer', 'aerobic releases about 19 times more energy per glucose']], { size: 12 });
  D.quickCheck(s, 'Give **two** differences between aerobic and anaerobic respiration in humans.');
  D.notes(s, 'QUICK CHECK ANSWER: any two with both sides: oxygen needed vs not; CO₂ + water vs lactic acid; more vs less energy; mitochondria vs cytoplasm (1 each).\nSpec 8.10 (confirmed). The ≈19× figure (2880 vs ~150 kJ per mole) is extension only.');
  reg(s, '8.10 Comparing respiration');
}

// ======================= 20 CP RESPIROMETER =======================
reg(D.contentSlide({
  title: 'Core Practical: the rate of respiration',
  subtitle: 'Specification 8.11 • using a respirometer',
  tag: '8.11', cp: true, caption: 'a simple respirometer with woodlice or germinating seeds',
  draw: (s, p) => {
    box(s, 0.9, 2.0, 1.4, 2.6, 'EAF3FB', '555555', { lw: 2 });
    box(s, 0.95, 3.8, 1.3, 0.75, 'F5F5F5', 'BBBBBB'); for (let i = 0; i < 12; i++) ball(s, 1.05 + (i % 6) * 0.2, 3.95 + Math.floor(i / 6) * 0.3, 0.06, 'FFFFFF', '999999', 0.5);
    label(s, 0.4, 4.6, 2.3, 'soda lime (absorbs CO₂)', { size: 9.5, h: 0.3 });
    box(s, 0.95, 3.45, 1.3, 0.08, '777777', '777777');
    [[1.3, 3.25], [1.8, 3.2], [1.55, 3.0]].forEach(([x, y]) => oval(s, x, y, 0.3, 0.14, 'B8A58A', '6E5E45'));
    label(s, 0.7, 2.25, 1.8, 'woodlice', { size: 10, bold: true, h: 0.3 });
    box(s, 0.9, 1.75, 1.4, 0.25, '444444', '222222');
    polyline(s, [[1.6, 1.75], [1.6, 1.45], [5.8, 1.45], [5.8, 1.75]], '777777', 3);
    box(s, 3.0, 1.38, 0.35, 0.14, C.red, C.red); label(s, 2.6, 1.85, 2.2, 'coloured liquid moves this way', { size: 9.5, color: C.red, h: 0.3 });
    arrow(s, 4.3, 2.2, 3.0, 2.2, C.red, 1.5);
    for (let i = 0; i <= 10; i++) line(s, 2.4 + i * 0.3, 1.55, 2.4 + i * 0.3, 1.65 + (i % 5 === 0 ? 0.06 : 0), '555555', 0.75);
    box(s, 5.1, 1.75, 1.4, 2.85, 'EAF3FB', '555555', { lw: 2 }); box(s, 5.15, 3.8, 1.3, 0.75, 'F5F5F5', 'BBBBBB');
    box(s, 5.1, 1.75, 1.4, 0.25, '444444', '222222');
    label(s, 4.9, 2.3, 1.8, 'control: glass beads', { size: 10, bold: true, h: 0.45 });
    line(s, 0.75, 4.95, 6.3, 4.95, '7FB3E0', 2); label(s, 0.75, 5.0, 5.6, 'both tubes in a **water bath** at a set temperature', { size: 10.5, h: 0.4 });
  },
  head: 'Method',
  lines: [
    'Put organisms (woodlice, maggots or seeds) in a tube with **soda lime**, which **absorbs CO₂**.',
    'As the organisms use **oxygen**, the gas volume falls and the **coloured liquid moves** towards them.',
    'Measure the **distance moved** in a set time. Repeat at different **temperatures** (water bath).',
    '**Control tube** with glass beads (same volume) shows any change not caused by respiration.',
    '**Ethics:** handle animals carefully; do not let soda lime touch them; return them afterwards.',
  ],
  worked: { head: 'Rate', q: 'The liquid moves 24 mm in 10 minutes.', steps: [['Rate', '24 ÷ 10'], ['Answer', '2.4 mm/min']], size: 11 },
  workedH: 1.4,
  qc: 'Why does the coloured liquid move **towards** the organisms?',
  notes: 'QUICK CHECK ANSWER: organisms take in oxygen (1); CO₂ produced is absorbed by soda lime, so gas volume / pressure decreases and liquid is pushed towards them (1).\nCP 8.11 (confirmed). Safety: soda lime is corrosive.',
}), '8.11 CP: respirometer');

// ======================= 21 CP RESULTS =======================
{
  const s = D.contentHeader('Core Practical: results and calculations', 'Specification 8.11 • rate, volume and temperature', { tag: '8.11', cp: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'rate of oxygen uptake at different temperatures (model data)');
  const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.3, xmin: 5, xmax: 35, xstep: 5, ymin: 0, ymax: 4, ystep: 1, xlabel: 'Temperature (°C)', ylabel: 'Rate (mm/min)', grid: true };
  axes(s, g); points(s, g, RESP, C.red); plotLine(s, g, RESP, C.red, 2);
  D.workedSteps(s, 6.8, 1.3, 6.08, 2.55, 'My turn: volume', 'Liquid moves 24 mm in 10 min; tube radius 0.5 mm; 5 g of woodlice.', [['Volume', 'π × 0.5² × 24 = 18.8 mm³'], ['Per min', '18.8 ÷ 10 = 1.88 mm³/min'], ['Per gram', '1.88 ÷ 5 = **0.377 mm³/min/g**']], { size: 11.5 });
  D.card(s, 6.8, 4.0, 6.08, 2.25, 'Your turn', [
    '**1** Liquid moves 15 mm in 5 min. Calculate the rate.',
    '**2** Calculate the % increase in rate from 20 °C to 30 °C (use the graph).',
    '**3** Explain why the rate increases with temperature.',
  ], { size: 12, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Why is the rate divided by the **mass** of the organisms?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 3 mm/min. 2) (3.8 − 2.0) ÷ 2.0 × 100 = 90%. 3) enzymes in respiration work faster / more collisions as temperature rises (up to the optimum).\nQUICK CHECK: different groups have different masses of organisms, so dividing by mass allows a fair comparison.');
  reg(s, '8.11 CP: results');
}

// ======================= 22 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 8.8–8.11 • respiration', [
  { q: 'Write the word equation for aerobic respiration.', marks: 2, ms: 'glucose + oxygen (1) → carbon dioxide + water (1).' },
  { q: 'Explain why muscles become fatigued during hard exercise.', marks: 2, ms: 'Anaerobic respiration (1); lactic acid builds up in muscles (1).' },
  { q: 'In a respirometer the liquid moves 36 mm in 12 minutes. Calculate the rate.', marks: 1, ms: '3 mm/min (1).' },
  { q: 'Explain the purpose of the soda lime in a respirometer.', marks: 2, ms: 'Absorbs carbon dioxide (1); so the change in volume is due only to oxygen uptake (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 23 CARDIAC OUTPUT =======================
reg(D.contentSlide({
  title: 'Cardiac output',
  subtitle: 'Specification 8.12 • heart rate, stroke volume and cardiac output',
  tag: '8.12', caption: 'the equation triangle',
  draw: (s, p) => {
    const tx = 1.6, ty = 1.65, tw = 3.8, th = 3.1;
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: tx, y: ty, w: tw, h: th, fill: { color: 'FBE5E6' }, line: { color: RD, width: 2.5 } });
    line(s, tx + tw * 0.2, ty + th * 0.58, tx + tw * 0.8, ty + th * 0.58, RD, 2.5);
    line(s, tx + tw / 2, ty + th * 0.58, tx + tw / 2, ty + th, RD, 2.5);
    label(s, tx + tw / 2 - 1.0, ty + th * 0.3, 2.0, '**cardiac output**', { size: 13 });
    label(s, tx + tw * 0.1, ty + th * 0.72, 1.7, '**stroke volume**', { size: 11.5 });
    label(s, tx + tw * 0.52, ty + th * 0.72, 1.6, '**heart rate**', { size: 12 });
    label(s, 0.7, 5.0, 5.6, 'cm³/min = cm³ × beats/min', { size: 11, italic: true, h: 0.4 });
  },
  head: 'Definitions',
  lines: [
    '**Heart rate**: beats per minute (bpm). Find it from the **pulse**: e.g. 18 beats in 15 s × 4 = **72 bpm**.',
    '**Stroke volume**: the volume of blood pumped by **one ventricle** in **one beat** (cm³).',
    '**Cardiac output**: the volume of blood pumped by one ventricle in **one minute**.',
    '**cardiac output = stroke volume × heart rate**',
    'Exercise increases heart rate and stroke volume, so more **oxygen and glucose** reach muscles.',
  ],
  worked: { head: 'Worked example', q: 'Stroke volume 70 cm³; heart rate 72 bpm.',
    steps: [['Equation', 'CO = SV × HR'], ['Substitute', '70 × 72'], ['Answer', '5040 cm³/min = 5.04 dm³/min']], size: 11 },
  workedH: 1.75,
  qc: 'An athlete has a cardiac output of **5000 cm³/min** and a heart rate of **50 bpm**. Calculate the stroke volume.',
  notes: 'QUICK CHECK ANSWER: SV = 5000 ÷ 50 = 100 cm³.\nSpec 8.12 (confirmed). Training makes the heart muscle stronger, so stroke volume rises and resting heart rate falls.',
}), '8.12 Cardiac output');

// ======================= 24 CARDIAC PRACTICE =======================
{
  const s = D.contentHeader('Practice: cardiac output', 'Specification 8.12 • rearranging the equation', { tag: '8.12' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A student counts **22** pulse beats in **15 s**. Her stroke volume is **75 cm³**.',
    [['Heart rate', '22 × 4 = **88 bpm**'], ['Equation', 'CO = SV × HR = 75 × 88'], ['=', '6600 cm³/min'], ['Answer', '**6.6 dm³/min**']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** During exercise: stroke volume **120 cm³**, heart rate **150 bpm**. Calculate the cardiac output in dm³/min.',
    '**2** Cardiac output is **6000 cm³/min** and stroke volume is **80 cm³**. Calculate the heart rate.',
    '**3** Cardiac output is **4.9 dm³/min** at **70 bpm**. Calculate the stroke volume in cm³.',
    '**4** Explain why cardiac output increases during exercise.',
  ], { size: 13.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Convert **5040 cm³/min** to dm³/min.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 18 000 cm³/min = 18 dm³/min. 2) 75 bpm. 3) 4900 ÷ 70 = 70 cm³. 4) muscles respire faster and need more oxygen and glucose (and CO₂ removed), so more blood is pumped per minute.\nQUICK CHECK: 5.04 dm³/min.');
  calc('MT 75 × 88', 75 * 88, 6600);
  reg(s, '8.12 Practice: cardiac output');
}

// ======================= 25 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 8.12 • cardiac output', [
  { q: 'Define **stroke volume**.', marks: 1, ms: 'Volume of blood pumped by one ventricle in one beat (1).' },
  { q: 'Stroke volume is 80 cm³ and heart rate is 65 bpm. Calculate the cardiac output.', marks: 2, ms: '80 × 65 (1); 5200 cm³/min (1).' },
  { q: 'Explain why a trained athlete has a lower resting heart rate.', marks: 2, ms: 'Larger / stronger heart gives a bigger stroke volume (1); same cardiac output needs fewer beats (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 26 KEY WORDS =======================
reg(D.keyWords([
  ['SA : V ratio', 'Surface area divided by volume; smaller in bigger organisms.'],
  ['Alveoli', 'Tiny air sacs in the lungs where gas exchange happens.'],
  ['Fick’s law', 'Rate ∝ surface area × concentration difference ÷ thickness.'],
  ['Haemoglobin', 'Protein in red blood cells that carries oxygen.'],
  ['Phagocyte', 'White blood cell that engulfs pathogens.'],
  ['Platelets', 'Cell fragments that help blood clot.'],
  ['Plasma', 'Liquid part of blood carrying dissolved substances.'],
  ['Artery', 'Thick-walled vessel carrying blood away from the heart.'],
  ['Vein', 'Thin-walled vessel with valves returning blood to the heart.'],
  ['Capillary', 'Vessel with walls one cell thick, for exchange.'],
  ['Ventricle', 'Lower heart chamber that pumps blood out.'],
  ['Double circulation', 'Blood passes through the heart twice per circuit.'],
  ['Aerobic', 'Respiration using oxygen: CO₂ + water made.'],
  ['Anaerobic', 'Respiration without oxygen: lactic acid (or ethanol + CO₂).'],
  ['Oxygen debt', 'Extra oxygen needed after exercise to remove lactic acid.'],
  ['Cardiac output', 'Stroke volume × heart rate.'],
], { notes: 'Cover-and-recall. Biology-only: Fick’s law.' }), 'Summary: key words');

// ======================= 27 FULL QUESTION =======================
reg(D.fullQuestion('Large animals need lungs, a heart and blood vessels to supply their cells.', [
  { l: 'a', q: 'Calculate the SA : V ratio of a 5 cm cube.', marks: 2, ms: 'SA 150, V 125 (1); 1.2 : 1 (1).' },
  { l: 'b', q: 'Explain why large animals need a transport system.', marks: 2, ms: 'Small SA : V / long diffusion distance (1); diffusion too slow to supply all cells (1).' },
  { l: 'c', q: 'Describe the route of blood from the lungs to the body through the heart.', marks: 3, ms: 'Pulmonary vein → left atrium (1); → left ventricle (1); → aorta (1).', h: 1.2 },
  { l: 'd', q: 'A person has a stroke volume of 75 cm³ and a heart rate of 70 bpm. Calculate the cardiac output in dm³/min.', marks: 2, ms: '75 × 70 = 5250 cm³/min (1); 5.25 dm³/min (1).' },
  { l: 'e', q: 'Explain why the person’s breathing rate stays high after a sprint.', marks: 2, ms: 'Lactic acid made by anaerobic respiration (1); extra oxygen needed to break it down / oxygen debt (1).' },
  { l: 'f', q: 'State the function of platelets and of lymphocytes.', marks: 2, ms: 'Platelets: blood clotting (1); lymphocytes: make antibodies (1).' },
], 13, { subtitle: 'Specification 8.2, 8.5, 8.7, 8.9, 8.12 • answer every part • 13 marks' }), 'Full question');

// ======================= 28–29 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the blood vessel that carries blood to the lungs.', marks: 1, ms: 'Pulmonary artery (1).' },
  { n: '2', q: 'Calculate the SA : V ratio of a **3 cm** cube.', marks: 2, ms: 'SA 54, V 27 (1); 2 : 1 (1).' },
  { n: '3', q: 'Cardiac output is **6300 cm³/min** and heart rate is **90 bpm**. Calculate the stroke volume.', marks: 2, ms: '6300 ÷ 90 (1); 70 cm³ (1).' },
  { n: '4', q: 'Describe how veins are adapted to carry blood back to the heart.', marks: 3, ms: 'Valves prevent backflow (1); wide lumen / low resistance (1); thin walls as low pressure (1).' },
  { n: '5', q: 'Give **two** products of anaerobic respiration in yeast.', marks: 2, ms: 'Ethanol (1); carbon dioxide (1).' },
  { n: '6', q: 'Explain how the lungs and blood are adapted to supply oxygen to respiring muscle cells.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Alveoli give a large surface area for diffusion of oxygen.',
    'Alveolar and capillary walls are one cell thick: short diffusion distance.',
    'Ventilation and blood flow maintain a steep concentration gradient.',
    'Red blood cells contain haemoglobin to carry oxygen; no nucleus / biconcave shape.',
    'Heart pumps blood at high pressure through arteries to the muscles; double circulation.',
    'Capillaries in muscles are close to cells; oxygen diffuses into cells for aerobic respiration in mitochondria.',
  ], 'Level 3 answers follow oxygen from the alveoli to the muscle cells, linking structures to functions.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 16);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 5);
assert(D.slideNo >= 28 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T8_ExchangeTransport.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
