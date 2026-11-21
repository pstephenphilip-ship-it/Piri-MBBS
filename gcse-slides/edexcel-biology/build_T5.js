// build_T5.js — Edexcel GCSE Biology 1BI0 Topic 5 Health, disease and the development of medicines (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T5.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 5,
  title: 'Health, disease and the development of medicines',
  shortTitle: 'T5',
  subtitle: 'Pathogens, defences, immunity, medicines and non-communicable disease',
  specRange: '5.1–5.24',
  pOnly: [],
  paper: 'Paper 1',
  keywords: ['Pathogens', 'Spread', 'Immunity', 'Vaccines', 'Medicines', 'Lifestyle'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const area = d => Math.PI * (d / 2) ** 2;
const bmi = (m, h) => m / (h * h);

// ======================= CALCULATIONS (asserted) =======================
calc('clear zone 14 mm area (3 s.f.)', sf(area(14), 3), 154, 1e-9);
calc('clear zone 20 mm area (3 s.f.)', sf(area(20), 3), 314, 1e-9);
calc('clear zone 8 mm area (3 s.f.)', sf(area(8), 3), 50.3, 1e-9);
calc('YT 9 mm (3 s.f.)', sf(area(9), 3), 63.6, 1e-9);
calc('YT 12 mm (3 s.f.)', sf(area(12), 3), 113, 1e-9);
calc('YT radius 5 mm area (3 s.f.)', sf(Math.PI * 25, 3), 78.5, 1e-9);
calc('BMI 70 / 1.75² (3 s.f.)', sf(bmi(70, 1.75), 3), 22.9, 1e-9);
calc('BMI 95 / 1.80² (3 s.f.)', sf(bmi(95, 1.80), 3), 29.3, 1e-9);
calc('YT BMI 60 / 1.6² (3 s.f.)', sf(bmi(60, 1.6), 3), 23.4, 1e-9);
calc('YT BMI 110 / 1.85² (3 s.f.)', sf(bmi(110, 1.85), 3), 32.1, 1e-9);
calc('YT mass for BMI 25 at 1.70 m (3 s.f.)', sf(25 * 1.7 * 1.7, 3), 72.3, 1e-9);
calc('waist:hip 90/100', 90 / 100, 0.9, 1e-12);
calc('waist:hip 84/96', 84 / 96, 0.875, 1e-12);
calc('YT waist:hip 102/98 (2 d.p.)', +(102 / 98).toFixed(2), 1.04, 1e-12);
calc('herd 900/1000 %', 900 / 1000 * 100, 90, 1e-9);
calc('herd YT 1140/1200 %', 1140 / 1200 * 100, 95, 1e-9);
calc('herd YT unvaccinated of 1200 at 95%', 1200 * 0.05, 60, 1e-9);
const IMM = t => (t < 28 ? 2.5 * Math.exp(-((t - 12) ** 2) / (2 * 3.5 * 3.5)) : 2.5 * Math.exp(-((t - 12) ** 2) / (2 * 3.5 * 3.5)) + 10 * Math.exp(-((t - 35) ** 2) / (2 * 3 * 3)) * (t >= 28 ? 1 : 0));
calc('primary peak', IMM(12), 2.5, 1e-9);
assert(IMM(35) > 9.9 && IMM(35) < 10.1, 'secondary peak about 10');
calc('drug funnel 10000 → 1 (%)', 1 / 10000 * 100, 0.01, 1e-12);
calc('R4 area 16 mm (3 s.f.)', sf(area(16), 3), 201, 1e-9);
calc('R6 BMI 81 / 1.8² ', bmi(81, 1.8), 25, 1e-9);
calc('FQ area 10 mm (3 s.f.)', sf(area(10), 3), 78.5, 1e-9);
calc('FQ BMI 88 / 1.75² (3 s.f.)', sf(bmi(88, 1.75), 3), 28.7, 1e-9);
calc('HW BMI 54 / 1.5²', bmi(54, 1.5), 24, 1e-9);
calc('bacteria 2^8', 2 ** 8, 256);

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

function plant(s, x, yb, h, col = '3E8E41') {
  line(s, x, yb, x, yb - h, '5E8A4A', 3);
  [[0.3, -0.35], [0.55, 0.3], [0.8, -0.3]].forEach(([f, d]) => oval(s, x + d * 0.6, yb - h * f, 0.45, 0.2, col, '2E6B30', { rot: d > 0 ? -25 : 25 }));
}

function virus(s, cx, cy, k = 1, col = '8E44AD') {
  const r = 0.22 * k, pts = [];
  for (let i = 0; i < 6; i++) { const a = Math.PI / 6 + i * Math.PI / 3; pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  poly(s, pts, 'E8DAEF', col, { lw: 1.5 });
  line(s, cx, cy + r, cx, cy + r + 0.3 * k, col, 2.5);
  [[-0.18, 0.15], [0.18, 0.15], [-0.12, 0.2], [0.12, 0.2]].forEach(([dx, dy]) => line(s, cx, cy + r + 0.3 * k, cx + dx * k, cy + r + 0.3 * k + dy * k, col, 1.25));
}
function bact(s, cx, cy, w = 1.0, h = 0.5, fill = 'D6EAF8', edge = '2A6F8E') { box(s, cx - w / 2, cy - h / 2, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 1.5 }); }
function antibody(s, cx, cy, col = '2E7D4F', k = 1) {
  line(s, cx, cy + 0.25 * k, cx, cy, col, 3); line(s, cx, cy, cx - 0.15 * k, cy - 0.2 * k, col, 3); line(s, cx, cy, cx + 0.15 * k, cy - 0.2 * k, col, 3);
}
function wbc(s, cx, cy, r, col = 'D6EAF8', nuc = '6A4C93') { ball(s, cx, cy, r, col, '2F5F8F', 1.5); ball(s, cx, cy, r * 0.45, 'C9B6E4', nuc, 1); }
function petri(s, cx, cy, r, discs) {
  ball(s, cx, cy, r, 'F7E7B4', '8A6A0A', 2);
  discs.forEach(([dx, dy, zone, lab]) => { if (zone) ball(s, cx + dx, cy + dy, zone, 'FFFBEF', 'D9C27A', 0.75); ball(s, cx + dx, cy + dy, 0.13, C.white, '555555', 1); if (lab) label(s, cx + dx - 0.13, cy + dy - 0.1, 0.26, lab, { size: 9, bold: true, h: 0.2 }); });
}
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

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Health and disease',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • health, disease and the development of medicines • Core Practical 5.18B` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and BIOLOGY ONLY slides are marked' },
    { icon: '5', text: 'Topic 5 of 9 • assessed on Paper 1' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 5 Health, disease and the development of medicines. Paper 1. Higher only (HT pill): 5.20B–5.21B monoclonal antibodies (medium confidence). Biology only: 5.7B, 5.8B, 5.9B–5.11B, 5.15B, 5.18B–5.21B. Core Practical 5.18B antiseptics, antibiotics or plant extracts (confirmed). See SPEC_T5.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '5.1–5.3', text: 'Define **health**; compare **communicable** and **non-communicable** disease.' },
  { code: '5.4–5.6', text: 'Describe **pathogens**, common **infections** and how their **spread** is reduced.' },
  { code: '5.7B–5.11B', text: 'Describe **viral life cycles**, **STIs**, and **plant defences** and **disease detection**.' },
  { code: '5.12–5.15B', text: 'Explain body **barriers**, the **immune system**, **vaccination** and **herd immunity**.' },
  { code: '5.16–5.17', text: 'Explain how **antibiotics** work and how **new medicines** are developed.' },
  { code: '5.18B–5.19B', text: '**Core Practical:** antiseptics and antibiotics; calculate areas with **πr²**.' },
  { code: '5.20B–5.21B', text: 'Describe the production and uses of **monoclonal antibodies**.', ht: true },
  { code: '5.22–5.24', text: 'Explain **lifestyle** and **non-communicable** disease; **BMI**; treating **CVD**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT = 5.20B, 5.21B (monoclonal antibodies). B suffix = biology only.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 5 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['5.1–5.6', 'Health, pathogens, infections and spread', 'BOTH COURSES'],
    ['5.7B–5.11B', 'Viral cycles, STIs, plant defences', 'BIOLOGY ONLY'],
    ['5.12–5.14', 'Barriers, immune system, vaccination', 'BOTH COURSES'],
    ['5.15B', 'Herd immunity', 'BIOLOGY ONLY'],
    ['5.16–5.17', 'Antibiotics; developing new medicines', 'BOTH COURSES'],
    ['5.18B–5.21B', 'CP antiseptics; monoclonal antibodies (HT)', 'BIOLOGY ONLY'],
    ['5.22–5.24', 'Non-communicable disease, BMI, CVD', 'BOTH COURSES'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 5\nHealth and disease', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 cells and microscopy • Topic 4 antibiotic resistance • Topic 8 the heart', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 5 is tested on **Paper 1** (1 h 45 min, 100 marks).',
      'Combined Science 1SC0 tests the statements **without** a B.',
      'Maths: **πr²**, **BMI**, **waist:hip ratio**, percentages, graphs.',
      '**Core Practical 5.18B**: antiseptics, antibiotics or plant extracts.',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: viral cycles, STIs, plant defences, herd immunity, the Core Practical and monoclonal antibodies.',
      '**HT** pill: monoclonal antibodies (5.20B–5.21B).',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Combined Science route: skip slides 9–13 (viral cycles, STIs, plant defences and detection, recap 2), 17 (herd immunity), 21–22 (Core Practical and πr²) and 24–26 (monoclonal antibodies and recap 5); also skip recap 3 Q3, recap 4 Q3, full question (d) and key words lytic, lysogenic, herd immunity, hybridoma. Foundation route: skip 24–26.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • cells', q: 'Name **two** structures in a bacterial cell that are not in an animal cell.' },
  { from: 'Topic 1 • cells', q: 'How do **ciliated** cells help protect the airways?' },
  { from: 'Topic 4 • selection', q: 'How do bacteria become **resistant** to antibiotics?' },
  { from: 'Topic 2 • cancer', q: 'What is a **tumour**?' },
  { from: 'KS3 • maths', q: 'Calculate the area of a circle with radius **3 cm** (use π = 3.14).' },
  { from: 'KS3 • body', q: 'Name **one** organ damaged by **smoking** and **one** by **alcohol**.' },
], { subtitle: 'Recall from Topics 1, 2 and 4 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Any two: cell wall, plasmid, flagellum, chromosomal DNA loop (no nucleus).\n2. Cilia beat to move mucus (with trapped microbes and dust) out of the airways.\n3. Mutation gives resistance; antibiotic kills non-resistant bacteria; resistant ones survive and reproduce.\n4. A mass of cells formed by uncontrolled cell division.\n5. 3.14 × 9 = 28.26 cm² (≈ 28.3).\n6. Lungs / heart / blood vessels; liver / brain.' }), 'Retrieval starter');
calc('starter circle r 3 (π 3.14)', 3.14 * 9, 28.26, 1e-9);

// ======================= 5 HEALTH & DISEASE =======================
reg(D.contentSlide({
  title: 'Health and disease',
  subtitle: 'Specification 5.1–5.3 • what health means; types of disease',
  tag: '5.1–5.3', caption: 'the WHO definition of health has three parts',
  draw: (s, p) => {
    [['physical', 1.8, 2.5, 'F2B8BC'], ['mental', 4.4, 2.5, 'C9D9EE'], ['social', 3.1, 3.9, 'CFE6D6']].forEach(([t, x, y, c]) => { ball(s, x, y, 1.05, c, '777777', 1); label(s, x - 0.9, y - 0.2, 1.8, `**${t}**`, { size: 13, h: 0.4 }); });
    label(s, 2.3, 2.95, 2.0, '**well-being**', { size: 12, color: C.blue, h: 0.4 });
    label(s, 0.7, 5.15, 5.6, '“…and **not merely** the absence of disease or infirmity.” (WHO)', { size: 11, italic: true, h: 0.45 });
  },
  head: 'Key ideas',
  lines: [
    '**Health** is a state of complete **physical, mental and social well-being**, not just the absence of disease.',
    '**Communicable** diseases are caused by **pathogens** and can be **spread** (e.g. TB, flu).',
    '**Non-communicable** diseases **cannot be passed on** (e.g. heart disease, most cancers, diabetes).',
    'One disease can make you **more likely** to get another, e.g. **HIV** damages the immune system so **TB** is more likely; poor **mental health** can lead to poor diet and less exercise.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why people with HIV are more likely to get TB.',
    steps: [['HIV', 'destroys white blood cells'], ['Immune', 'immune system weakened'], ['TB', 'bacteria not destroyed'], ['Answer', 'more susceptible to infection']] },
  qc: 'Classify as communicable or non-communicable: **malaria**, **lung cancer**, **cholera**, **obesity**.',
  notes: 'QUICK CHECK ANSWER: communicable: malaria, cholera; non-communicable: lung cancer, obesity (2 marks for all four).\nSpec 5.1–5.3.',
}), '5.1–5.3 Health and disease');

// ======================= 6 PATHOGENS & INFECTIONS =======================
{
  const s = D.contentHeader('Pathogens and common infections', 'Specification 5.4–5.5 • viruses, bacteria, fungi and protists', { tag: '5.4–5.5' });
  const rows = [[HDR('Disease'), HDR('Pathogen'), HDR('Signs and effects')], ...[
    ['Cholera', 'bacterium', 'watery diarrhoea; dehydration'],
    ['Tuberculosis (TB)', 'bacterium', 'lung damage; coughing (blood)'],
    ['Stomach ulcers', 'bacterium (Helicobacter)', 'stomach pain; bleeding'],
    ['Chalara ash dieback', 'fungus', 'leaf loss; bark lesions on ash trees'],
    ['Malaria', 'protist', 'damage to blood and liver; fever'],
    ['HIV', 'virus', 'destroys white blood cells → AIDS'],
    ['Ebola', 'virus', 'haemorrhagic fever (internal bleeding)'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i, { color: b.startsWith('virus') ? '8E44AD' : b.startsWith('bact') ? '2A6F8E' : b === 'fungus' ? '8A560A' : '2E7D4F', bold: true }), tcell(c, i)])];
  table(s, rows, { x: 0.45, y: 1.3, w: 7.3, colW: [2.0, 2.1, 3.2], rowH: 0.58, fontSize: 12 });
  D.card(s, 8.0, 1.3, 4.88, 4.95, 'Pathogens', [
    'A **pathogen** is a **disease-causing organism**.',
    '**Bacteria**: single cells; can release **toxins**.',
    '**Viruses**: not cells; reproduce **inside** host cells, damaging them.',
    '**Fungi**: some single-celled, others grow **hyphae**.',
    '**Protists**: single-celled eukaryotes, often spread by **vectors**.',
  ], { size: 12.5 });
  D.quickCheck(s, 'Name the type of pathogen that causes **malaria** and the type that causes **TB**.');
  D.notes(s, 'QUICK CHECK ANSWER: protist (1); bacterium (1).\nSpec 5.4–5.5. These seven infections are named in the specification.');
  reg(s, '5.4–5.5 Pathogens and infections');
}

// ======================= 7 SPREAD =======================
{
  const s = D.contentHeader('How pathogens spread and how to stop them', 'Specification 5.6 • reducing or preventing spread', { tag: '5.6' });
  const rows = [[HDR('Disease'), HDR('How it spreads'), HDR('Reducing spread')], ...[
    ['Cholera', 'water contaminated with faeces', 'clean water; sewage treatment'],
    ['TB', 'airborne droplets (coughs)', 'cover mouth; isolate patients; BCG vaccine'],
    ['Chalara ash dieback', 'airborne spores; moving infected trees', 'remove and burn trees; restrict import'],
    ['Malaria', 'animal vector: mosquitoes', 'nets; insecticides; drain standing water'],
    ['Stomach ulcers', 'oral transmission (contaminated food/water)', 'hygiene; clean water; antibiotics'],
    ['Ebola', 'body fluids', 'isolation; protective clothing; safe burial'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i)])];
  table(s, rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.3, 4.6, 5.53], rowH: 0.48, fontSize: 11.5 });
  D.workedSteps(s, 0.45, 5.0, 12.43, 1.25, 'Exam technique', '', [['Pattern', 'name the route, then a matching way to block that route'], ['Answer', 'e.g. malaria: mosquito vector → bed nets stop bites']], { size: 12 });
  D.quickCheck(s, 'Explain how using **bed nets** reduces the spread of malaria.');
  D.notes(s, 'QUICK CHECK ANSWER: stops mosquitoes (vectors) biting people at night (1); so the protist is not transferred to / from people (1).\nSpec 5.6.');
  reg(s, '5.6 Spread of disease');
}

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 5.1–5.6 • health, pathogens and spread', [
  { q: 'State the WHO definition of **health**.', marks: 1, ms: 'A state of complete physical, mental and social well-being (and not merely the absence of disease) (1).' },
  { q: 'Describe the symptoms of **cholera** and explain how it is spread.', marks: 3, ms: 'Diarrhoea / dehydration (1); spread by water (1) contaminated with faeces containing the bacteria (1).' },
  { q: 'Explain why removing infected ash trees reduces the spread of Chalara.', marks: 2, ms: 'Infected trees produce fungal spores (1); removing / burning them stops spores spreading in the air to healthy trees (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 LYTIC / LYSOGENIC (B) =======================
reg(D.contentSlide({
  title: 'Viral life cycles: lytic and lysogenic',
  subtitle: 'Specification 5.7B • how viruses reproduce inside host cells',
  tag: '5.7B', p: true, caption: 'a virus that infects bacteria (bacteriophage)',
  draw: (s, p) => {
    virus(s, 1.2, 1.75, 1.1); bact(s, 1.2, 2.75, 1.2, 0.55);
    label(s, 0.55, 3.1, 1.3, '1 attaches; injects DNA', { size: 9.5, h: 0.45 });
    arrow(s, 1.9, 2.75, 2.4, 2.3, C.red, 1.5); arrow(s, 1.9, 2.75, 2.4, 4.2, C.blue, 1.5);
    label(s, 2.5, 1.45, 3.8, '**Lytic** (fast)', { size: 11.5, color: C.red, align: 'left' });
    bact(s, 3.1, 2.25, 1.0, 0.5); [[2.85, 2.25], [3.1, 2.2], [3.35, 2.3]].forEach(([x, y]) => virus(s, x, y - 0.12, 0.45));
    label(s, 2.5, 2.55, 1.3, 'copies made', { size: 9, h: 0.3 });
    arrow(s, 3.7, 2.25, 4.1, 2.25, C.red, 1.5);
    [[4.5, 1.95], [5.0, 2.35], [5.5, 1.95], [5.85, 2.4]].forEach(([x, y]) => virus(s, x, y - 0.1, 0.5));
    label(s, 4.2, 2.55, 2.0, 'cell bursts (lysis)', { size: 9, h: 0.3 });
    label(s, 2.5, 3.5, 3.8, '**Lysogenic** (dormant)', { size: 11.5, color: C.blue, align: 'left' });
    bact(s, 3.1, 4.25, 1.0, 0.5); line(s, 2.75, 4.25, 3.45, 4.25, '2A6F8E', 2); line(s, 3.0, 4.25, 3.2, 4.25, '8E44AD', 4);
    label(s, 2.5, 4.55, 1.3, 'viral DNA joins host DNA', { size: 9, h: 0.45 });
    arrow(s, 3.7, 4.25, 4.1, 4.25, C.blue, 1.5);
    bact(s, 4.6, 4.05, 0.8, 0.35); bact(s, 4.6, 4.5, 0.8, 0.35); line(s, 4.4, 4.05, 4.8, 4.05, '8E44AD', 3); line(s, 4.4, 4.5, 4.8, 4.5, '8E44AD', 3);
    label(s, 4.1, 4.8, 2.1, 'copied each time the cell divides', { size: 9, h: 0.45 });
    line(s, 5.4, 4.2, 5.8, 2.75, C.grey, 1.25, { dash: 'dash', head: true }); label(s, 5.5, 3.3, 1.0, 'trigger', { size: 9, italic: true, h: 0.3 });
  },
  head: 'Two pathways',
  lines: [
    '**Lytic:** the virus injects its genetic material; the cell makes **new virus parts**; they are assembled and the cell **bursts (lyses)**, releasing many viruses.',
    '**Lysogenic:** the viral DNA is **inserted into the host DNA** and copied whenever the cell divides; the virus is **dormant** (no symptoms).',
    'A **trigger** (e.g. stress, UV, chemicals) can switch the virus to the **lytic** pathway.',
  ],
  worked: { head: 'Apply', q: 'Why can a person carry a virus for years without symptoms?',
    steps: [['Pathway', 'virus is in the lysogenic pathway'], ['DNA', 'viral DNA is inside host DNA'], ['Effect', 'no new viruses made; cells not destroyed'], ['Answer', 'dormant until a trigger']] },
  qc: 'Describe what happens to a host cell at the end of the **lytic** pathway.',
  notes: 'QUICK CHECK ANSWER: the cell bursts / lyses (1); releasing many new virus particles (1).\nSpec 5.7B (biology only). Example: herpes (cold sores) and HIV can remain dormant.',
}), '5.7B Lytic and lysogenic (BIOLOGY ONLY)');

// ======================= 10 STIs (B) =======================
reg(D.contentSlide({
  title: 'Sexually transmitted infections',
  subtitle: 'Specification 5.8B • Chlamydia and HIV',
  tag: '5.8B', p: true, caption: 'ways of reducing the spread of STIs',
  draw: (s, p) => {
    const rows = [[HDR(''), HDR('Chlamydia'), HDR('HIV')], ...[
      ['Pathogen', 'bacterium', 'virus'],
      ['Spread by', 'unprotected sex; mother to baby', 'sex; sharing needles; blood; mother to baby (breast milk)'],
      ['Effects', 'often no symptoms; can cause infertility', 'destroys white blood cells → AIDS'],
      ['Treatment', 'antibiotics', 'antiretroviral drugs (no cure)'],
    ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i)])];
    table(s, rows, { x: 0.75, y: 1.55, w: 5.5, colW: [1.25, 2.0, 2.25], rowH: 0.62, fontSize: 11 });
    D.card(s, 0.75, 4.75, 5.5, 1.0, null, ['**Reducing spread:** condoms; screening and testing; treating partners; needle exchanges; screening blood.'], { size: 11, fill: C.white });
  },
  head: 'Key ideas',
  lines: [
    '**STIs** are passed on through **sexual contact**, including exchange of body fluids.',
    '**Condoms** are a **physical barrier** to pathogens.',
    '**Screening** finds people who have no symptoms (common with Chlamydia) so they can be **treated** and stop infecting others.',
    'HIV can also spread through **blood**: drug users should not **share needles**; donated blood is screened.',
  ],
  worked: { head: 'Explain', q: 'Why is screening young people for Chlamydia important?',
    steps: [['Symptoms', 'many infected people have none'], ['Spread', 'they pass it on without knowing'], ['Treat', 'antibiotics cure it once found'], ['Answer', 'reduces spread and prevents infertility']] },
  qc: 'Give **two** ways to reduce the spread of HIV.',
  notes: 'QUICK CHECK ANSWER: any two: condoms; not sharing needles / needle exchange; screening blood; antiretroviral drugs for infected people / mothers; testing (1 each).\nSpec 5.8B (biology only).',
}), '5.8B STIs (BIOLOGY ONLY)');

// ======================= 11 PLANT DEFENCES (B) =======================
reg(D.contentSlide({
  title: 'How plants defend themselves',
  subtitle: 'Specification 5.9B • physical and chemical defences',
  tag: '5.9B', p: true, caption: 'section through a leaf surface',
  draw: (s, p) => {
    box(s, 0.8, 1.9, 5.4, 0.25, 'F7E3A8', 'C9A227', { lw: 1 }); label(s, 4.3, 1.55, 1.9, '**waxy cuticle**', { size: 10.5, color: '8A6A0A', align: 'left' });
    for (let i = 0; i < 6; i++) box(s, 0.8 + i * 0.9, 2.15, 0.9, 0.8, 'E3F1DA', '3E7A2E', { lw: 2.5 });
    label(s, 0.8, 3.0, 2.5, '**cell walls** (cellulose)', { size: 10.5, color: '3E7A2E', align: 'left' });
    [1.0, 3.4].forEach(x => { for (let k = 0; k < 4; k++) ball(s, x + k * 0.12, 1.72 + (k % 2) * 0.08, 0.06, '8A6A0A', '8A6A0A'); });
    label(s, 1.6, 1.62, 1.75, 'fungal spores cannot get through', { size: 9.5, italic: true, color: '8A6A0A', h: 0.25 });
    box(s, 0.8, 3.55, 1.0, 1.9, '7A5A3A', '4E3626'); label(s, 0.6, 5.45, 1.4, '**bark**', { size: 10.5, h: 0.3 });
    plant(s, 3.3, 5.5, 1.6, '3E8E41');
    label(s, 3.9, 3.7, 2.4, '**chemicals**: antiseptics kill microbes; some repel or poison insects (e.g. mint, nicotine)', { size: 10, align: 'left', h: 1.0, valign: 'top' });
  },
  head: 'Plant defences',
  lines: [
    '**Physical:** **waxy cuticle** on leaves; **cellulose cell walls**; **bark** on trees (dead cells that fall off with pathogens); some have **thorns** or hairs against animals.',
    '**Chemical:** **antiseptic** / antimicrobial substances kill bacteria and fungi; chemicals that **repel** or **poison** insects (e.g. caffeine, nicotine, mint oils).',
    'Some plant chemicals are used as **medicines**: aspirin from willow; digitalis from foxgloves.',
  ],
  worked: { head: 'Explain', q: 'How does a waxy cuticle protect a leaf from fungi?',
    steps: [['Layer', 'continuous waterproof barrier'], ['Block', 'spores cannot reach the cells'], ['Dry', 'less water on the surface for spores to grow'], ['Answer', 'stops infection entering the leaf']] },
  qc: 'Give **one** physical and **one** chemical defence of plants.',
  notes: 'QUICK CHECK ANSWER: physical: cuticle / cell wall / bark / thorns (1); chemical: antiseptics / antimicrobial chemicals / insect-repelling or poisonous chemicals (1).\nSpec 5.9B (biology only).',
}), '5.9B Plant defences (BIOLOGY ONLY)');

// ======================= 12 DETECTING PLANT DISEASE (B) =======================
reg(D.contentSlide({
  title: 'Detecting and identifying plant diseases',
  subtitle: 'Specification 5.10B–5.11B • in the field and in the laboratory',
  tag: '5.10B–5.11B', p: true, caption: 'from observing symptoms to confirming the pathogen',
  draw: (s, p) => {
    D.card(s, 0.75, 1.55, 2.65, 4.2, 'In the field', ['Look for **symptoms**: spots, discoloured or wilting leaves, stunted growth, rotting, lesions on bark.', 'Note the **pattern**: one plant or many? Spreading?', 'Use **testing kits** with monoclonal antibodies on site.'], { size: 10.5, fill: C.white });
    D.card(s, 3.6, 1.55, 2.65, 4.2, 'In the laboratory', ['**Microscopy** of samples.', 'Grow the pathogen on **agar**.', '**DNA analysis** to identify the pathogen exactly.', '**Antibody tests** for specific pathogen proteins.'], { size: 10.5, fill: C.white });
  },
  head: 'Why it matters',
  lines: [
    'Symptoms can be caused by **pathogens**, **pests** or **mineral deficiencies** (e.g. yellow leaves from lack of **nitrates** or **magnesium**).',
    'Field observations give a **quick** idea; laboratory tests give an **accurate identification**.',
    'Knowing the exact pathogen means the right **treatment** can be chosen and its **spread** controlled.',
  ],
  worked: { head: 'Apply', q: 'Ash trees show leaf loss and bark lesions. How could Chalara be confirmed?',
    steps: [['Field', 'record symptoms and how many trees affected'], ['Sample', 'send leaves or bark to a lab'], ['Lab', 'culture or DNA test for the fungus'], ['Answer', 'confirms the pathogen identity']] },
  qc: 'Why might **yellow leaves** not mean that a plant has a disease?',
  notes: 'QUICK CHECK ANSWER: could be a mineral (ion) deficiency, e.g. lack of magnesium or nitrates (1); or lack of light / water / pests (1).\nSpec 5.10B–5.11B (biology only; numbering medium-low confidence).',
}), '5.10B–5.11B Detecting plant disease (BIOLOGY ONLY)');

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 5.7B–5.11B • viruses, STIs and plants', [
  { q: 'Describe the **lysogenic** pathway.', marks: 2, ms: 'Viral DNA inserted into host DNA (1); copied when the cell divides / virus dormant until triggered (1).' },
  { q: 'Explain how condoms reduce the spread of Chlamydia.', marks: 2, ms: 'Physical barrier (1); prevents exchange of body fluids containing the bacteria (1).' },
  { q: 'Give **two** physical defences of plants against pathogens.', marks: 2, ms: 'Any two: waxy cuticle; cellulose cell walls; bark (1 each).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 14 BODY BARRIERS =======================
reg(D.contentSlide({
  title: 'The body’s first line of defence',
  subtitle: 'Specification 5.12 • physical and chemical barriers',
  tag: '5.12', caption: 'barriers that stop pathogens entering',
  draw: (s, p) => {
    const items = [['Skin', 'physical barrier; scabs seal cuts', 'F2D0B8'], ['Mucus and cilia', 'mucus traps microbes; cilia sweep it out of the airways', 'FFF3B0'], ['Lysozymes in tears', 'enzymes that break down bacterial cell walls', 'D6EAF8'], ['Stomach acid', 'hydrochloric acid kills pathogens in food', 'F5C6CB']];
    items.forEach(([t, d, c], i) => {
      const y = 1.55 + i * 1.03;
      box(s, 0.75, y, 5.5, 0.9, c, '999999', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
      s.addText([{ text: t, options: { bold: true, breakLine: true } }, { text: d, options: {} }], { x: 0.9, y, w: 5.25, h: 0.9, fontFace: 'Calibri', fontSize: 11.5, valign: 'middle', margin: 0, color: C.text });
    });
  },
  head: 'Non-specific defences',
  lines: [
    'These defences work against **all** pathogens (they are **non-specific**).',
    '**Physical** barriers: **skin**, **mucus**, **cilia**.',
    '**Chemical** defences: **lysozymes** in tears, **hydrochloric acid** in the stomach.',
    'If pathogens get past these, the **immune system** responds.',
  ],
  worked: { head: 'Link', q: 'Why are smokers more likely to get chest infections?',
    steps: [['Smoke', 'damages / paralyses cilia'], ['Mucus', 'not moved out of the airways'], ['Pathogens', 'stay in the lungs'], ['Answer', 'more chance of infection']] },
  qc: 'Name **one** chemical defence of the body and explain how it works.',
  notes: 'QUICK CHECK ANSWER: lysozymes in tears break down / digest bacterial cell walls (2) OR stomach hydrochloric acid kills pathogens (2).\nSpec 5.12.',
}), '5.12 Physical and chemical barriers');

// ======================= 15 IMMUNE SYSTEM =======================
reg(D.contentSlide({
  title: 'The specific immune system',
  subtitle: 'Specification 5.13 • lymphocytes, antibodies and memory',
  tag: '5.13', caption: 'antibody levels after first and second infection with the same pathogen (model data)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.7, h: 3.3, xmin: 0, xmax: 50, xstep: 10, ymin: 0, ymax: 12, ystep: 2, xlabel: 'Time (days)', ylabel: 'Antibody concentration' };
    axes(s, g); fnLine(s, g, IMM, 0, 50, 100, C.blue, 2.5);
    [[0, 'first infection'], [28, 'second infection']].forEach(([t, l]) => { arrow(s, px(g, t), py(g, 12) + 0.1, px(g, t), py(g, 0) - 0.05, C.red, 1.5); label(s, px(g, t) + 0.05, py(g, 11.6), 1.5, l, { size: 9.5, bold: true, color: C.red, align: 'left' }); });
    label(s, px(g, 7), py(g, 3.6), 1.3, 'primary: slow, small', { size: 9.5, align: 'left', h: 0.25 });
    label(s, px(g, 37), py(g, 9), 1.4, 'secondary: fast, large', { size: 9.5, align: 'left', h: 0.25 });
  },
  head: 'How it works',
  lines: [
    'Every pathogen has unique proteins on its surface called **antigens**.',
    'The antigens trigger a **specific lymphocyte** (white blood cell) with matching receptors.',
    'The lymphocyte divides; the copies make **antibodies** that fit the antigen and help destroy the pathogen.',
    '**Memory lymphocytes** stay in the blood. If the same pathogen returns, the **secondary response** is **faster** and **stronger**, so you do not get ill: you are **immune**.',
  ],
  worked: { head: 'Use the graph', q: 'Compare the two responses.',
    steps: [['Speed', 'secondary starts sooner'], ['Size', 'much higher antibody concentration'], ['Reason', 'memory lymphocytes already present'], ['Answer', 'pathogen destroyed before symptoms']] },
  qc: 'What is an **antigen**? Why does a second infection not usually make you ill?',
  notes: 'QUICK CHECK ANSWER: a (protein) molecule on the surface of a pathogen that triggers an immune response (1); memory lymphocytes produce antibodies quickly / in large amounts, destroying the pathogen before symptoms (1).\nSpec 5.13. Curve is model data.',
}), '5.13 Specific immune system');

// ======================= 16 IMMUNISATION =======================
reg(D.contentSlide({
  title: 'Immunisation',
  subtitle: 'Specification 5.14 • using vaccines to make memory lymphocytes',
  tag: '5.14', caption: 'how a vaccine leads to immunity',
  draw: (s, p) => {
    stepBoxes(s, 0.75, 1.55, 5.5, [
      ['A **vaccine** containing an **inactive / dead / weakened** pathogen (or its antigens) is injected.'],
      ['The **antigens** trigger specific **lymphocytes**.'],
      ['Lymphocytes make **antibodies** and **memory lymphocytes**.'],
      ['If the real pathogen enters, memory cells give a **fast secondary response**.'],
      ['The pathogen is destroyed **before** symptoms develop.'],
    ], { h: 0.66, gap: 0.16, size: 11 });
  },
  head: 'Key points',
  lines: [
    'Vaccines contain the **same antigens** as the pathogen, but the pathogen **cannot cause disease**.',
    'The person becomes **immune** without having the illness.',
    'Some vaccines need **boosters** to keep memory cell numbers high.',
    'Examples: **MMR** (measles, mumps, rubella), **BCG** (TB), flu, HPV.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why a vaccine against one strain of flu may not protect against another.',
    steps: [['Antigens', 'different strains have different antigens'], ['Specific', 'memory lymphocytes match one antigen'], ['Result', 'no fast secondary response'], ['Answer', 'new vaccine needed each year']] },
  qc: 'Why does a vaccine contain an **inactive** form of the pathogen?',
  notes: 'QUICK CHECK ANSWER: it still has the antigens so it triggers an immune response / memory cells (1); but cannot cause the disease (1).\nSpec 5.14.',
}), '5.14 Immunisation');

// ======================= 17 HERD IMMUNITY (B) =======================
reg(D.contentSlide({
  title: 'Vaccination and herd immunity',
  subtitle: 'Specification 5.15B • advantages and disadvantages of immunisation; protecting people who cannot be vaccinated',
  tag: '5.15B', p: true, caption: 'blue = vaccinated; white = not vaccinated; red = infected',
  draw: (s, p) => {
    let r = 3; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    for (let i = 0; i < 10; i++) for (let j = 0; j < 6; j++) {
      const x = 1.0 + i * 0.52, y = 1.8 + j * 0.52, v = rnd() < 0.85;
      const inf = (i === 4 && j === 2);
      ball(s, x, y, 0.17, inf ? C.red : v ? '7FB3E0' : C.white, '555555', 1);
    }
    label(s, 0.7, 5.0, 5.6, 'With most people immune, the pathogen **cannot spread** from the infected person.', { size: 11, h: 0.45 });
  },
  head: 'Weighing it up',
  lines: [
    '**Herd immunity:** if a **high percentage** of a population is vaccinated, the pathogen cannot spread, which protects people who **cannot** be vaccinated (e.g. babies, people with weak immune systems).',
    '**+** Prevents **epidemics**; can **eradicate** diseases (smallpox); fewer deaths and less cost to health services.',
    '**−** Rare **side effects**; vaccines do not always give immunity; some people **refuse**, so coverage falls; needles and cost.',
  ],
  worked: { head: 'Calculation', q: '900 of 1000 children in a town are vaccinated. Calculate the % vaccinated.',
    steps: [['Divide', '900 ÷ 1000'], ['× 100', '0.9 × 100'], ['Answer', '90% (measles needs about 95%)']], size: 11 },
  workedH: 1.75,
  qc: 'Explain how herd immunity protects a baby too young to be vaccinated.',
  notes: 'QUICK CHECK ANSWER: most people around the baby are immune (1); so the pathogen cannot spread / few infected people to pass it on (1).\nSpec 5.15B (biology only). The 95% figure for measles is a commonly quoted threshold.',
}), '5.15B Herd immunity (BIOLOGY ONLY)');

// ======================= 18 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 5.12–5.15B • defences and immunity', [
  { q: 'Describe how **mucus and cilia** protect the body.', marks: 2, ms: 'Mucus traps pathogens / dust (1); cilia move / sweep mucus out of the airways (1).' },
  { q: 'Explain how a vaccine makes a person immune to a disease.', marks: 4, ms: 'Contains inactive pathogen / antigens (1); triggers lymphocytes to make antibodies (1); memory lymphocytes made (1); on infection, fast secondary response destroys pathogen before symptoms (1).' },
  { q: '1140 of 1200 people are vaccinated. Calculate the % vaccinated.', marks: 1, ms: '95% (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 19 ANTIBIOTICS =======================
reg(D.contentSlide({
  title: 'Antibiotics',
  subtitle: 'Specification 5.16 • only for bacterial infections',
  tag: '5.16', caption: 'antibiotics target structures found in bacteria, not in human cells',
  draw: (s, p) => {
    bact(s, 2.0, 2.4, 2.2, 1.0); label(s, 0.9, 1.6, 2.2, '**bacterium**', { size: 11.5 });
    label(s, 0.95, 3.0, 2.2, 'cell wall, ribosomes, enzymes: targets', { size: 9.5, h: 0.45 });
    line(s, 3.3, 2.4, 3.8, 2.4, C.red, 3); label(s, 3.15, 1.95, 0.9, '✕', { size: 22, bold: true, color: C.red, h: 0.4 });
    ball(s, 5.0, 2.4, 0.75, 'FBE9E7', 'B5655B', 2); ball(s, 5.0, 2.4, 0.25, 'C9B6E4', '6A4C93'); label(s, 4.2, 3.2, 1.6, '**human cell**: unharmed', { size: 10.5 });
    virus(s, 1.5, 4.35, 1.0); ball(s, 2.6, 4.6, 0.45, 'FBE9E7', 'B5655B', 1.5);
    label(s, 3.3, 4.2, 3.0, '**viruses** live **inside** host cells and have no cell wall: antibiotics **do not work**', { size: 10.5, align: 'left', h: 0.85, valign: 'top' });
  },
  head: 'How antibiotics work',
  lines: [
    'Antibiotics **kill bacteria** or **stop them growing** by **inhibiting cell processes** (e.g. making cell walls, protein synthesis).',
    'These processes are **different** in human cells, so the **host** is not harmed.',
    'Antibiotics do **not** work on **viruses**: viruses use the host cell’s own processes, so they cannot be targeted without harming the host.',
    'Overuse leads to **antibiotic resistance** (Topic 4).',
  ],
  worked: { head: 'Exam technique', q: 'Why should a doctor not prescribe antibiotics for a cold?',
    steps: [['Cause', 'colds are caused by viruses'], ['Effect', 'antibiotics do not affect viruses'], ['Risk', 'unnecessary use selects for resistant bacteria'], ['Answer', 'no benefit; increases resistance']] },
  qc: 'Explain why antibiotics can kill bacteria without harming human cells.',
  notes: 'QUICK CHECK ANSWER: antibiotics inhibit processes / structures in bacteria (e.g. cell wall) (1); that human cells do not have / are different in human cells (1).\nSpec 5.16.',
}), '5.16 Antibiotics');

// ======================= 20 DRUG DEVELOPMENT =======================
reg(D.contentSlide({
  title: 'Developing new medicines',
  subtitle: 'Specification 5.17 • discovery, development, preclinical and clinical testing',
  tag: '5.17', caption: 'about 10–12 years from discovery to use',
  draw: (s, p) => {
    stepBoxes(s, 0.75, 1.55, 5.5, [
      ['**Discovery:** find a possible drug (e.g. from plants, microbes, computer models).'],
      ['**Development:** make and test the compound in the lab.'],
      ['**Preclinical:** test on **cells / tissues**, then **animals**: is it **toxic**? Does it work?'],
      ['**Clinical trials:** small doses on **healthy volunteers** (safety), then **patients** (efficacy, best **dose**).'],
      ['**Approval** by a regulator; then monitored after release.'],
    ], { h: 0.68, gap: 0.14, size: 10.5 });
  },
  head: 'Clinical trials',
  lines: [
    '**Double-blind** trials: neither doctors nor patients know who gets the drug or a **placebo**, so results are not **biased**.',
    'A **placebo** looks like the drug but has no active ingredient: it is the **control**.',
    'Trials check the drug is **safe** (not toxic), **effective**, and find the right **dose**.',
    'Of about **10 000** compounds tested, roughly **1** becomes a medicine (0.01%).',
  ],
  worked: { head: 'Explain', q: 'Why are drugs tested on healthy volunteers first?',
    steps: [['Aim', 'check for side effects / toxicity'], ['Dose', 'start with very low doses'], ['Safety', 'healthy people better able to cope'], ['Answer', 'establish safety before patients']] },
  qc: 'What is a **double-blind** trial and why is it used?',
  notes: 'QUICK CHECK ANSWER: neither the patients nor the doctors know who receives the drug or the placebo (1); to prevent bias in reporting / assessing results (1).\nSpec 5.17.',
}), '5.17 Developing medicines');

// ======================= 21 CP ANTISEPTICS (B) =======================
reg(D.contentSlide({
  title: 'Core Practical: antiseptics and antibiotics',
  subtitle: 'Specification 5.18B • effects on microbial cultures',
  tag: '5.18B', p: true, cp: true, caption: 'agar plate with discs: A, B, C = different antiseptics; W = water (control)',
  draw: (s, p) => {
    petri(s, 2.7, 3.35, 1.85, [[-0.85, -0.7, 0.7, 'A'], [0.85, -0.7, 0.4, 'B'], [-0.85, 0.8, 1.0 * 0.5, 'C'], [0.85, 0.8, 0, 'W']]);
    label(s, 4.7, 2.1, 1.7, '**clear zone** = bacteria killed (zone of inhibition)', { size: 10, align: 'left', h: 0.8, valign: 'top' });
    line(s, 4.65, 2.3, 2.55, 2.35, C.grey, 1);
    label(s, 4.7, 3.5, 1.7, 'measure the **diameter**; area = **πr²**', { size: 10, align: 'left', h: 0.6, valign: 'top' });
  },
  head: 'Method (aseptic technique)',
  lines: [
    '**Sterilise** the inoculating loop in a flame; work near a **Bunsen** (rising air carries microbes away).',
    'Spread bacteria evenly on the **agar** plate; lift the lid only slightly.',
    'Place **filter-paper discs** soaked in different antiseptics (and **sterile water** as a control) on the agar.',
    'Tape the lid (do **not** seal fully) and incubate at **25 °C** (not 37 °C: stops human pathogens growing).',
    'Measure each **clear zone** and calculate its **area**.',
  ],
  worked: { head: 'Conclusion', q: 'Which antiseptic is most effective?', steps: [['Look', 'largest clear zone'], ['Answer', 'A: the largest area of bacteria killed']], size: 11 },
  workedH: 1.4,
  qc: 'Why is the plate incubated at **25 °C** rather than 37 °C?',
  notes: 'QUICK CHECK ANSWER: to reduce the chance of growing human pathogens (which grow best at body temperature) (1).\nCP 5.18B (biology only; confirmed). Safety: do not open plates after incubation; dispose by autoclaving.',
}), '5.18B CP: antiseptics (BIOLOGY ONLY)');

// ======================= 22 πr² PRACTICE (B) =======================
{
  const s = D.contentHeader('Calculating the area of clear zones', 'Specification 5.19B • area = πr²', { tag: '5.19B', p: true });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A clear zone has a **diameter of 14 mm**. Calculate its area.',
    [['Radius', 'r = 14 ÷ 2 = 7 mm'], ['Square', 'r² = 49 mm²'], ['× π', '3.14159 × 49 = 153.9…'], ['Answer', '**154 mm²** (3 s.f.)']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A clear zone has a diameter of **9 mm**. Calculate its area.',
    '**2** A clear zone has a diameter of **12 mm**. Calculate its area.',
    '**3** A clear zone has a **radius** of **5 mm**. Calculate its area.',
    '**4** Why is **area** a better comparison than diameter if the zones are not perfect circles?',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'A clear zone is **20 mm** across. Calculate its area to 3 significant figures.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) π × 4.5² = 63.6 mm². 2) π × 6² = 113 mm². 3) π × 5² = 78.5 mm². 4) area reflects the total amount of bacteria killed; measuring two diameters at right angles and averaging also helps.\nQUICK CHECK: π × 10² = 314 mm².\nSpec 5.19B (biology only).');
  reg(s, '5.19B Area of clear zones (BIOLOGY ONLY)');
}

// ======================= 23 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 5.16–5.19B • antibiotics, medicines, Core Practical', [
  { q: 'Explain why antibiotics cannot be used to treat viral infections.', marks: 2, ms: 'Viruses live / reproduce inside host cells (1); antibiotics target bacterial structures / processes that viruses do not have (1).' },
  { q: 'Give **two** stages of preclinical testing.', marks: 2, ms: 'Tests on cells / tissues (1); tests on animals (1).' },
  { q: 'A clear zone has a diameter of 16 mm. Calculate its area.', marks: 2, ms: 'r = 8 mm; π × 8² (1); = 201 mm² (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 24 MONOCLONAL PRODUCTION (HT, B) =======================
reg(D.contentSlide({
  title: 'Producing monoclonal antibodies',
  subtitle: 'Specification 5.20B • hybridoma cells',
  tag: '5.20B', ht: true, p: true, caption: 'making many identical antibodies against one antigen',
  draw: (s, p) => {
    stepBoxes(s, 0.75, 1.55, 5.5, [
      ['Inject a **mouse** with an **antigen**; it makes **lymphocytes** that produce the matching antibody.'],
      ['Collect the lymphocytes from the mouse’s spleen.'],
      ['**Fuse** each lymphocyte with a **tumour (myeloma) cell**, which divides rapidly: a **hybridoma** cell.'],
      ['**Clone** the hybridoma: it divides many times and makes **one type** of antibody.'],
      ['**Collect and purify** the antibodies.'],
    ], { h: 0.68, gap: 0.14, size: 10.5 });
  },
  head: 'Why fuse the cells?',
  lines: [
    '**Lymphocytes** make the antibody but **cannot divide** on their own.',
    '**Tumour cells** divide **rapidly and indefinitely** but do not make antibodies.',
    'A **hybridoma** does **both**: it divides quickly and makes the antibody.',
    '**Monoclonal** = identical antibodies from **one clone** of cells; they bind to **one specific antigen**.',
  ],
  worked: { head: 'Exam technique', q: 'Why are the antibodies all identical?',
    steps: [['Start', 'one hybridoma cell'], ['Divide', 'mitosis gives a clone'], ['Same', 'all cells have the same genes'], ['Answer', 'all make the same antibody']] },
  qc: 'What is a **hybridoma**? Why is it used?',
  notes: 'QUICK CHECK ANSWER: a cell made by fusing a lymphocyte with a tumour cell (1); it divides rapidly and makes a specific antibody (1).\nSpec 5.20B (Higher and biology only; H marker medium confidence).',
}), '5.20B Monoclonal antibodies: production (HT, BIOLOGY ONLY)');

// ======================= 25 MONOCLONAL USES (HT, B) =======================
reg(D.contentSlide({
  title: 'Using monoclonal antibodies',
  subtitle: 'Specification 5.21B • pregnancy tests, diagnosis and treatment',
  tag: '5.21B', ht: true, p: true, caption: 'a pregnancy test strip',
  draw: (s, p) => {
    box(s, 0.9, 2.2, 5.2, 0.9, C.white, '777777', { shape: SH.ROUNDED_RECTANGLE, r: 0.3, lw: 1.5 });
    box(s, 0.95, 2.25, 1.0, 0.8, 'D6EAF8', 'D6EAF8'); label(s, 0.95, 3.1, 1.2, 'urine applied', { size: 9.5, h: 0.3 });
    box(s, 3.6, 2.3, 0.12, 0.7, C.red, C.red); box(s, 4.6, 2.3, 0.12, 0.7, C.red, C.red);
    label(s, 3.1, 3.1, 1.1, '**test** line', { size: 9.5, h: 0.3 }); label(s, 4.2, 3.1, 1.1, '**control** line', { size: 9.5, h: 0.3 });
    label(s, 0.75, 1.55, 5.5, 'hCG hormone binds to **coloured monoclonal antibodies**, which then stick to fixed antibodies at the test line.', { size: 10, h: 0.6, valign: 'top' });
    D.card(s, 0.75, 3.6, 5.5, 2.15, 'Two lines = pregnant', ['**Test line** colours only if **hCG** is present.', '**Control line** always colours: shows the test worked.', 'One line = not pregnant.'], { size: 10.5, fill: C.white });
  },
  head: 'Uses',
  lines: [
    '**Pregnancy tests:** detect the hormone **hCG** in urine.',
    '**Diagnosis:** detect pathogens or cancer markers in blood; locate **blood clots** or **cancer cells** using antibodies attached to a dye or radioactive marker.',
    '**Treating cancer:** antibodies bind to antigens on **cancer cells**, carrying a **drug** or **radioactive** substance to them, or triggering the immune system to destroy them. Healthy cells are **not harmed**.',
  ],
  worked: { head: 'Evaluate', q: 'Why are monoclonal antibodies useful for treating cancer?',
    steps: [['Specific', 'bind only to antigens on cancer cells'], ['Target', 'drug delivered directly to the tumour'], ['Benefit', 'fewer side effects than chemotherapy'], ['Limit', 'expensive; some side effects']] },
  qc: 'Why does a pregnancy test have a **control** line?',
  notes: 'QUICK CHECK ANSWER: shows the test is working / the antibodies have moved along the strip (1); so a negative result is reliable (1).\nSpec 5.21B (Higher and biology only; H marker medium confidence).',
}), '5.21B Monoclonal antibodies: uses (HT, BIOLOGY ONLY)');

// ======================= 26 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 5.20B–5.21B • monoclonal antibodies', [
  { q: 'Explain why lymphocytes are fused with tumour cells to make monoclonal antibodies.', marks: 2, ht: true, ms: 'Lymphocytes make the antibody but do not divide (1); tumour cells divide rapidly, so the hybridoma makes lots of antibody (1).' },
  { q: 'Describe how monoclonal antibodies can be used to treat cancer.', marks: 3, ht: true, ms: 'Antibodies specific to antigens on cancer cells (1); attached to a drug / radioactive substance / toxin (1); delivered directly to cancer cells, so healthy cells less harmed (1).' },
  { q: 'Explain how a pregnancy test shows a positive result.', marks: 2, ht: true, ms: 'hCG binds to (coloured) antibodies (1); these are trapped by fixed antibodies at the test line, giving a coloured line (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 27 NCDs =======================
reg(D.contentSlide({
  title: 'Non-communicable diseases',
  subtitle: 'Specification 5.22 • caused by the interaction of several factors',
  tag: '5.22', caption: 'risk factors interact',
  draw: (s, p) => {
    const f = [['genes', 3.5, 1.75], ['diet', 5.4, 2.4], ['exercise', 5.5, 4.4], ['smoking', 3.5, 5.15], ['alcohol', 1.5, 4.4], ['age', 1.6, 2.4]];
    f.forEach(([t, x, y]) => { line(s, 3.5, 3.4, x, y, C.blue, 1.5); ball(s, x, y, 0.42, 'D6EAF8', C.blue, 1.5); label(s, x - 0.5, y - 0.15, 1.0, t, { size: 10.5, bold: true, h: 0.3 }); });
    ball(s, 3.5, 3.4, 0.85, C.ink, C.ink); label(s, 2.7, 3.1, 1.6, 'non-\ncommunicable\ndisease', { size: 10.5, bold: true, color: C.white, h: 0.6 });
  },
  head: 'Key ideas',
  lines: [
    'Many non-communicable diseases are caused by a **combination** of **genetic** and **lifestyle** factors.',
    'Examples: **cardiovascular disease**, many **cancers**, some **lung** and **liver** diseases, diseases linked to **nutrition** (e.g. type 2 diabetes).',
    'A **risk factor** increases the **chance** of a disease; it does not mean you will definitely get it.',
    'A **correlation** between a factor and a disease does not prove it is the **cause**.',
  ],
  worked: { head: 'Explain', q: 'Why can a non-smoker still get lung cancer?',
    steps: [['Many', 'several risk factors exist'], ['Others', 'genes, air pollution, radon, passive smoking'], ['Chance', 'risk factors change probability'], ['Answer', 'smoking is not the only cause']] },
  qc: 'What is a **risk factor**? Give **two** risk factors for cardiovascular disease.',
  notes: 'QUICK CHECK ANSWER: something that increases the chance of getting a disease (1); any two: smoking, poor diet / high fat, lack of exercise, obesity, high blood pressure, genes, age (1).\nSpec 5.22.',
}), '5.22 Non-communicable disease');

// ======================= 28 LIFESTYLE =======================
reg(D.contentSlide({
  title: 'Lifestyle and disease',
  subtitle: 'Specification 5.23 • diet, exercise, alcohol and smoking at local, national and global levels',
  tag: '5.23', caption: 'BMI categories for adults',
  draw: (s, p) => {
    const cats = [['under 18.5', 'underweight', 'D6EAF8'], ['18.5–24.9', 'healthy', 'CFE6D6'], ['25–29.9', 'overweight', 'F7E3A8'], ['30–39.9', 'obese', 'F5C6CB'], ['40 and over', 'severely obese', 'E6A0A6']];
    cats.forEach(([r, n, c], i) => { const y = 1.6 + i * 0.6; box(s, 0.8, y, 5.4, 0.52, c, '999999', { lw: 0.75 }); label(s, 0.9, y, 2.0, `**${r}**`, { size: 12, align: 'left', h: 0.52 }); label(s, 3.0, y, 3.0, n, { size: 12, align: 'left', h: 0.52 }); });
    label(s, 0.75, 4.75, 5.5, '**BMI = mass (kg) ÷ height² (m²)**', { size: 14, color: C.blue, h: 0.4 });
    label(s, 0.75, 5.15, 5.5, '**waist : hip ratio** = waist ÷ hip: above about 0.9 (men) or 0.85 (women) increases risk', { size: 10.5, h: 0.5 });
  },
  head: 'Lifestyle factors',
  lines: [
    '**Diet and exercise:** too much energy in food and too little exercise → **obesity** → type 2 diabetes, heart disease. Too little food → **malnutrition**.',
    '**Alcohol:** damages **liver** cells (cirrhosis) and the brain.',
    '**Smoking:** chemicals damage blood vessels → **cardiovascular disease**; tar → lung cancer.',
    '**Local / national / global**: costs to the NHS; lost working days; obesity is rising worldwide, while malnutrition is common in poorer countries.',
  ],
  worked: { head: 'Calculation', q: 'A man has a mass of 70 kg and is 1.75 m tall. Calculate his BMI.',
    steps: [['Square', '1.75² = 3.0625'], ['Divide', '70 ÷ 3.0625'], ['Answer', '22.9: healthy']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why BMI may wrongly classify a very muscular athlete.',
  notes: 'QUICK CHECK ANSWER: muscle is denser / heavier than fat (1); so a high BMI may not mean too much body fat (1). Waist:hip ratio or body-fat measurements are better.\nSpec 5.23.',
}), '5.23 Lifestyle and disease');

// ======================= 29 BMI PRACTICE =======================
{
  const s = D.contentHeader('Practice: BMI and waist:hip ratio', 'Specification 5.23 • calculations', { tag: '5.23' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A man has a mass of **95 kg** and height **1.80 m**. His waist is **90 cm** and hips **100 cm**.',
    [['BMI', '95 ÷ 1.80² = 95 ÷ 3.24'], ['=', '**29.3**: overweight'], ['Ratio', '90 ÷ 100 = **0.90**'], ['Answer', 'BMI 29.3; ratio 0.90: increased risk']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Calculate the BMI of a woman of mass **60 kg** and height **1.6 m**.',
    '**2** Calculate the BMI of a man of mass **110 kg** and height **1.85 m**. Which category?',
    '**3** Calculate the waist:hip ratio for waist **102 cm**, hips **98 cm**.',
    '**4** What mass would give a BMI of exactly **25** for someone **1.70 m** tall?',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'A woman has waist **84 cm** and hips **96 cm**. Calculate her waist:hip ratio.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 60 ÷ 2.56 = 23.4 (healthy). 2) 110 ÷ 3.4225 = 32.1 (obese). 3) 102 ÷ 98 = 1.04. 4) 25 × 1.70² = 72.3 kg.\nQUICK CHECK: 84 ÷ 96 = 0.875 (0.88).');
  reg(s, '5.23 Practice: BMI');
}

// ======================= 30 CVD TREATMENTS =======================
{
  const s = D.contentHeader('Treating cardiovascular disease', 'Specification 5.24 • evaluate medication, surgery and lifestyle changes', { tag: '5.24' });
  const rows = [[HDR('Treatment'), HDR('How it helps'), HDR('Advantages'), HDR('Disadvantages')], ...[
    ['Lifestyle changes', 'healthy diet, exercise, stop smoking', 'cheap; no side effects; lowers other risks', 'slow; needs willpower; may not be enough'],
    ['Medication', 'statins lower cholesterol; anticoagulants (e.g. aspirin) stop clots; drugs lower blood pressure', 'effective; no surgery', 'taken for life; side effects; cost'],
    ['Stents', 'mesh tube holds a narrowed artery open', 'quick recovery; immediate effect', 'surgery risks; artery can narrow again'],
    ['Bypass surgery', 'a vein is used to go around a blocked artery', 'long-lasting', 'major surgery; infection; long recovery'],
    ['Transplant', 'replace a failing heart', 'can save life', 'rejection; donor shortage; immunosuppressants for life'],
  ].map(([a, b, c, d], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i, { color: '2E7D4F' }), tcell(d, i, { color: C.red })])];
  table(s, rows, { x: 0.45, y: 1.3, w: 12.43, colW: [1.9, 4.0, 3.1, 3.43], rowH: 0.6, fontSize: 10.5 });
  D.workedSteps(s, 0.45, 5.15, 12.43, 1.1, 'Evaluate', '', [['Method', 'compare effectiveness, risk, cost and time; finish with a justified judgement for the patient described']], { size: 12 });
  D.quickCheck(s, 'Give **one** advantage and **one** disadvantage of using **stents** compared with lifestyle changes.');
  D.notes(s, 'QUICK CHECK ANSWER: advantage: works immediately / effective for a severe blockage (1); disadvantage: surgery risks (infection, clots) / cost / artery may narrow again (1).\nSpec 5.24. Links to Topic 8 (the heart and blood vessels).');
  reg(s, '5.24 Treating CVD');
}

// ======================= 31 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification 5.22–5.24 • non-communicable disease', [
  { q: 'Explain why many non-communicable diseases are described as **multifactorial**.', marks: 2, ms: 'Caused by interaction of several factors (1); e.g. genes and lifestyle (diet, smoking, exercise) (1).' },
  { q: 'Calculate the BMI of a person with mass 81 kg and height 1.8 m.', marks: 2, ms: '81 ÷ 1.8² / 81 ÷ 3.24 (1); = 25 (1).' },
  { q: 'Evaluate the use of statins to treat cardiovascular disease.', marks: 3, ms: 'Lower (LDL) cholesterol so less fatty build-up in arteries (1); effective / no surgery (1); must be taken for life / side effects (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 32 KEY WORDS =======================
reg(D.keyWords([
  ['Health', 'Complete physical, mental and social well-being (WHO).'],
  ['Communicable', 'A disease caused by a pathogen that can be spread.'],
  ['Pathogen', 'A disease-causing organism: virus, bacterium, fungus, protist.'],
  ['Vector', 'An organism that carries a pathogen, e.g. a mosquito.'],
  ['Lytic', 'Virus replicates and the host cell bursts.'],
  ['Lysogenic', 'Viral DNA inserted into host DNA; dormant.'],
  ['Lysozyme', 'Enzyme in tears that breaks down bacterial cell walls.'],
  ['Antigen', 'Molecule on a pathogen that triggers an immune response.'],
  ['Antibody', 'Protein made by lymphocytes that binds to a specific antigen.'],
  ['Memory lymphocyte', 'White blood cell giving a fast secondary response.'],
  ['Herd immunity', 'Protection when most of a population is immune.'],
  ['Antibiotic', 'Drug that kills or stops the growth of bacteria.'],
  ['Placebo', 'Dummy treatment used as a control in trials.'],
  ['Hybridoma', 'Lymphocyte fused with a tumour cell (HT).'],
  ['Risk factor', 'Something that increases the chance of a disease.'],
  ['BMI', 'mass (kg) ÷ height² (m²).'],
], { notes: 'Cover-and-recall. Biology-only: lytic, lysogenic, herd immunity, hybridoma (HT).' }), 'Summary: key words');

// ======================= 33 FULL QUESTION =======================
reg(D.fullQuestion('Measles is a disease caused by a virus. It is spread by droplets in the air.', [
  { l: 'a', q: 'Give **two** ways the spread of measles could be reduced.', marks: 2, ms: 'Any two: vaccination; isolating infected people; covering mouth when coughing / hygiene (1 each).' },
  { l: 'b', q: 'Explain why measles cannot be treated with antibiotics.', marks: 2, ms: 'Caused by a virus (1); antibiotics only affect bacteria / viruses inside host cells (1).' },
  { l: 'c', q: 'Explain how the MMR vaccine prevents a child getting measles.', marks: 4, ms: 'Contains inactive / weakened virus / antigens (1); lymphocytes produce antibodies (1); memory lymphocytes made (1); fast secondary response on infection (1).', h: 1.3 },
  { l: 'd', q: 'An antiseptic gives a clear zone of diameter 10 mm. Calculate its area.', marks: 2, ms: 'π × 5² (1); 78.5 mm² (1).' },
  { l: 'e', q: 'A man has a mass of 88 kg and a height of 1.75 m. Calculate his BMI and state his category.', marks: 3, ms: '1.75² = 3.0625 (1); 88 ÷ 3.0625 = 28.7 (1); overweight (1).', h: 1.1 },
], 13, { subtitle: 'Specification 5.6, 5.14, 5.16, 5.19B, 5.23 • answer every part • 13 marks' }), 'Full question');

// ======================= 34–35 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the type of pathogen that causes **Chalara ash dieback**.', marks: 1, ms: 'Fungus (1).' },
  { n: '2', q: 'Calculate the BMI of a person of mass **54 kg** and height **1.5 m**.', marks: 2, ms: '54 ÷ 2.25 (1); = 24 (1).' },
  { n: '3', q: 'Describe how malaria is spread and **two** ways of reducing its spread.', marks: 3, ms: 'Spread by mosquitoes (vector) (1); any two: bed nets; insecticide; drain standing water; antimalarial drugs (1 each).' },
  { n: '4', q: 'Explain why a drug is tested on cells and animals before humans.', marks: 2, ms: 'To check it is not toxic / is safe (1); and that it works / find a dose (1).' },
  { n: '5', q: 'Explain how HIV leads to **AIDS**.', marks: 2, ms: 'HIV destroys white blood cells / lymphocytes (1); immune system fails, so other infections (e.g. TB) develop: AIDS (1).' },
  { n: '6', q: 'Explain how the body defends itself against pathogens. Include barriers and the immune response.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Skin acts as a physical barrier; scabs seal cuts.',
    'Mucus traps pathogens; cilia sweep mucus out of the airways.',
    'Lysozymes in tears break down bacterial cell walls; stomach acid kills pathogens.',
    'Pathogens that get in have antigens that trigger specific lymphocytes.',
    'Lymphocytes divide and produce antibodies specific to the antigen; antibodies help destroy the pathogen.',
    'Memory lymphocytes remain, giving a faster, larger secondary response.',
    'Vaccination can produce memory lymphocytes without the disease.',
  ], 'Level 3 answers cover BOTH non-specific barriers AND the specific immune response, including memory cells.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 16);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 6); assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7);
assert(D.slideNo >= 30 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T5_HealthDisease.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
