// build_T4.js — Edexcel GCSE Biology 1BI0 Topic 4 Natural selection and genetic modification (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T4.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 4,
  title: 'Natural selection and genetic modification',
  shortTitle: 'T4',
  subtitle: 'Evolution, human origins, classification, selective breeding and genetic engineering',
  specRange: '4.1–4.13',
  pOnly: [],
  paper: 'Paper 1',
  keywords: ['Evolution', 'Resistance', 'Human fossils', 'Classification', 'Selective breeding', 'Genetic engineering'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const pct = (a, b) => (b - a) / a * 100;

// ======================= CALCULATIONS (asserted) =======================
calc('moths: 360 dark of 400 (%)', 360 / 400 * 100, 90, 1e-9);
const MOTH = [[1850, 2], [1860, 10], [1870, 35], [1880, 70], [1890, 92], [1900, 98], [1960, 95], [1980, 70], [2000, 20]];
calc('moth % increase in proportion 1850 → 1900 (points)', MOTH[5][1] - MOTH[0][1], 96);
calc('bacteria 2 h at 20 min', 2 ** (120 / 20), 64);
calc('bacteria 4 h at 20 min', 2 ** (240 / 20), 4096);
calc('YT bacteria 3 h at 30 min', 2 ** (180 / 30), 64);
const BRAIN = [['Ardi', 4.4, 350], ['Lucy', 3.2, 400], ['Turkana Boy', 1.6, 880], ['Modern human', 0, 1350]];
calc('brain % Lucy → modern', pct(400, 1350), 237.5, 1e-9);
calc('brain % Ardi → Turkana (3 s.f.)', sf(pct(350, 880), 3), 151, 1e-9);
calc('brain % Lucy → Turkana', pct(400, 880), 120, 1e-9);
calc('years Ardi → Lucy (million)', 4.4 - 3.2, 1.2, 1e-12);
calc('GM yield 3.2 → 4.0', pct(3.2, 4.0), 25, 1e-9);
calc('pesticide 12 → 3', pct(12, 3), -75, 1e-9);
calc('aphids 800 → 120', pct(800, 120), -85, 1e-9);
calc('YT aphids 500 → 150', pct(500, 150), -70, 1e-9);
calc('YT yield 6.0 → 7.5', pct(6.0, 7.5), 25, 1e-9);
calc('tissue culture 50 × 50', 50 * 50, 2500);
calc('milk 4000 → 8000', pct(4000, 8000), 100, 1e-9);
calc('wheat yield 2.5 → 8.0 (%)', pct(2.5, 8.0), 220, 1e-9);
const FERT = x => 9 * x / (60 + x) + 2;
calc('fertiliser curve at 0', FERT(0), 2, 1e-12);
calc('fertiliser curve at 60', FERT(60), 6.5, 1e-12);
calc('FQ bacteria 1 → after 5 h at 30 min', 2 ** (300 / 30), 1024);
calc('FQ GM yield 5.0 → 6.2', pct(5.0, 6.2), 24, 1e-9);
calc('HW brain 600 → 1350', pct(600, 1350), 125, 1e-9);
calc('R5 pesticide 20 → 5', pct(20, 5), -75, 1e-9);

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

function moth(s, cx, cy, col, k = 1) {
  oval(s, cx - 0.14 * k, cy, 0.3 * k, 0.22 * k, col, '333333', { lw: 0.5, rot: -25 });
  oval(s, cx + 0.14 * k, cy, 0.3 * k, 0.22 * k, col, '333333', { lw: 0.5, rot: 25 });
  oval(s, cx, cy, 0.07 * k, 0.26 * k, '333333', '333333');
}
function bird(s, x, y) { polyline(s, [[x - 0.25, y - 0.1], [x - 0.1, y], [x, y - 0.06], [x + 0.1, y], [x + 0.25, y - 0.1]], '333333', 2); }
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
function plasmid(s, cx, cy, r, o = {}) {
  s.addShape(SH.ARC, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, angleRange: o.gap ? [20, 340] : [0, 359.9], line: { color: '2F5F8F', width: 4 } });
  if (o.insert) s.addShape(SH.ARC, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, angleRange: [340, 20], line: { color: C.red, width: 6 } });
}
function plant(s, x, yb, h, col = '3E8E41') {
  line(s, x, yb, x, yb - h, '5E8A4A', 3);
  [[0.3, -0.35], [0.55, 0.3], [0.8, -0.3]].forEach(([f, d]) => oval(s, x + d * 0.6, yb - h * f, 0.45, 0.2, col, '2E6B30', { rot: d > 0 ? -25 : 25 }));
}
function tool(s, kind, cx, cy, k = 1) {
  if (kind === 'oldowan') poly(s, [[cx - 0.3 * k, cy + 0.15 * k], [cx - 0.2 * k, cy - 0.2 * k], [cx + 0.15 * k, cy - 0.25 * k], [cx + 0.3 * k, cy], [cx + 0.2 * k, cy + 0.2 * k]], 'B8A58A', '6E5E45', { lw: 1.25 });
  if (kind === 'acheulean') poly(s, [[cx, cy - 0.38 * k], [cx + 0.2 * k, cy - 0.1 * k], [cx + 0.22 * k, cy + 0.2 * k], [cx, cy + 0.32 * k], [cx - 0.22 * k, cy + 0.2 * k], [cx - 0.2 * k, cy - 0.1 * k]], 'A8977A', '5E5038', { lw: 1.25 });
  if (kind === 'flake') poly(s, [[cx - 0.08 * k, cy - 0.4 * k], [cx + 0.1 * k, cy - 0.38 * k], [cx + 0.13 * k, cy + 0.35 * k], [cx - 0.12 * k, cy + 0.38 * k]], '9C8D72', '4E4330', { lw: 1.25 });
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Natural selection & GM',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • evolution, human origins, classification and genetic technology` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and BIOLOGY ONLY slides are marked' },
    { icon: '4', text: 'Topic 4 of 9 • assessed on Paper 1' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 4. Paper 1. Higher only (HT pill): 4.9 stages of genetic engineering (medium confidence). Biology only (BIOLOGY ONLY pill): 4.10B tissue culture, 4.11B insect-resistant crops, 4.12B fertilisers and biological control. No Core Practical. See SPEC_T4.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '4.1–4.2', text: 'Describe the work of **Darwin and Wallace**; explain **natural selection**.' },
  { code: '4.3', text: 'Explain how **antibiotic resistance** supports Darwin’s theory.' },
  { code: '4.4–4.5', text: 'Describe evidence for **human evolution**: **fossils** and **stone tools**.' },
  { code: '4.6', text: 'Describe how **genetic analysis** led to the **three-domain** system.' },
  { code: '4.7', text: 'Explain **selective breeding** and its impact.' },
  { code: '4.8–4.9', text: 'Describe **genetic engineering** and its main **stages**.', ht: true },
  { code: '4.10B–4.12B', text: 'Explain **tissue culture**, **insect-resistant crops**, **fertilisers** and **biological control**.' },
  { code: '4.13', text: 'Evaluate the **benefits and risks** of genetic engineering and selective breeding.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT = 4.9 (stages: restriction enzymes, ligase, sticky ends, vectors). B suffix = biology only.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 4 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['4.1–4.3', 'Darwin, Wallace, natural selection, resistance', 'BOTH COURSES'],
    ['4.4–4.5', 'Human evolution: fossils and stone tools', 'BOTH COURSES'],
    ['4.6', 'Classification: three domains', 'BOTH COURSES'],
    ['4.7–4.9', 'Selective breeding; genetic engineering (4.9 HT)', 'BOTH COURSES'],
    ['4.10B', 'Tissue culture', 'BIOLOGY ONLY'],
    ['4.11B–4.12B', 'Bt crops; fertilisers; biological control', 'BIOLOGY ONLY'],
    ['4.13', 'Benefits and risks of GM and breeding', 'BOTH COURSES'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 4\nSelection and GM', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 3 genetics and mutation • Topic 5 antibiotics • Topic 9 ecosystems', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 4 is tested on **Paper 1** (1 h 45 min, 100 marks).',
      'Combined Science 1SC0 tests the statements **without** a B.',
      'Maths: **% change**, **2ⁿ** bacterial growth, reading **graphs and timelines**.',
      'Expect **evaluate** and **discuss** questions (benefits vs risks).',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: tissue culture, Bt crops, fertilisers and biological control (4.10B–4.12B).',
      '**HT** pill: stages of genetic engineering (4.9).',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Combined Science route: skip slides 18–21 (tissue culture, Bt crops, fertilisers, biological control and recap 4). Foundation route: skip slide 16 and recap 3 Q3. Check the H marker on 4.9 against the Pearson PDF.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 3 • genetics', q: 'What is an **allele**?' },
  { from: 'Topic 3 • mutation', q: 'What is a **mutation**? What does it create?' },
  { from: 'Topic 3 • variation', q: 'Give **two** causes of genetic variation.' },
  { from: 'Topic 1 • cells', q: 'Name the small rings of DNA found in **bacteria**.' },
  { from: 'Topic 1 • enzymes', q: 'What is an enzyme’s **active site**?' },
  { from: 'KS3 • maths', q: 'Bacteria double every hour. Starting with 1, how many after **4 hours**?' },
], { subtitle: 'Recall from Topics 1 and 3 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. A different version of a gene.\n2. A random change in the DNA base sequence; new alleles.\n3. Mutation; sexual reproduction (meiosis and random fertilisation).\n4. Plasmids.\n5. The region where the substrate binds.\n6. 2⁴ = 16.' }), 'Retrieval starter');
calc('starter 2^4', 2 ** 4, 16);

// ======================= 5 DARWIN & WALLACE =======================
reg(D.contentSlide({
  title: 'Darwin and Wallace',
  subtitle: 'Specification 4.1 • developing the theory of evolution by natural selection',
  tag: '4.1', caption: 'timeline of the theory',
  draw: (s, p) => {
    line(s, 1.0, 1.7, 1.0, 5.6, C.blue, 3);
    [['1831–36', 'Darwin sails on HMS Beagle; studies finches, tortoises and fossils (Galápagos)'], ['1850s', 'Wallace studies species in South-East Asia; reaches the same idea'], ['1858', 'Darwin and Wallace present their ideas together'], ['1859', 'Darwin publishes "On the Origin of Species"'], ['1900s', 'genes and Mendel’s work explain how variation is inherited']].forEach(([y, t], i) => {
      const yy = 1.85 + i * 0.78;
      ball(s, 1.0, yy + 0.15, 0.12, C.blue, C.white, 2);
      label(s, 1.25, yy - 0.05, 1.1, `**${y}**`, { size: 11.5, color: C.blue, align: 'left', h: 0.4 });
      label(s, 2.35, yy - 0.08, 4.0, t, { size: 10.5, align: 'left', h: 0.58, valign: 'top' });
    });
  },
  head: 'Their work and its impact',
  lines: [
    '**Darwin** collected evidence for 20 years: variation within species, fossils, and breeding of animals.',
    '**Wallace** independently came to the same conclusion and collected evidence, e.g. **warning colours** in animals.',
    'Their theory was **controversial**: it challenged the belief that God created all species, and there was **little evidence** at the time (genes unknown).',
    '**Impact today:** the basis of modern biology: classification, understanding antibiotic resistance and how species change.',
  ],
  worked: { head: 'Exam technique', q: 'Why was the theory slow to be accepted?',
    steps: [['Religion', 'went against the idea of creation'], ['Evidence', 'not enough evidence at the time'], ['Mechanism', 'genes and inheritance not yet known'], ['Answer', 'give two reasons with detail']] },
  qc: 'Give **two** reasons why many people did not accept Darwin’s theory at first.',
  notes: 'QUICK CHECK ANSWER: any two: conflicted with religious beliefs / creation; insufficient evidence at the time; the mechanism of inheritance (genes) was unknown (1 each).\nSpec 4.1.',
}), '4.1 Darwin and Wallace');

// ======================= 6 NATURAL SELECTION =======================
{
  const s = D.contentHeader('Evolution by natural selection', 'Specification 4.2 • Darwin’s theory, step by step', { tag: '4.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'peppered moths on soot-blackened tree bark (1800s)');
  box(s, 0.9, 1.6, 2.4, 3.9, '3A3A3A', '222222');
  box(s, 3.7, 1.6, 2.4, 3.9, 'C8C4B8', '8A857A');
  label(s, 0.9, 1.62, 2.4, 'polluted (sooty) bark', { size: 10, color: C.white, h: 0.3 });
  label(s, 3.7, 1.62, 2.4, 'clean (lichen) bark', { size: 10, h: 0.3 });
  [[1.4, 2.4, '2B2B2B'], [2.6, 3.0, '2B2B2B'], [1.8, 4.1, '2B2B2B'], [2.7, 4.8, 'EDEAE0']].forEach(([x, y, c]) => moth(s, x, y, c, 1.2));
  [[4.3, 2.5, 'EDEAE0'], [5.4, 3.1, 'EDEAE0'], [4.6, 4.2, 'EDEAE0'], [5.6, 4.7, '2B2B2B']].forEach(([x, y, c]) => moth(s, x, y, c, 1.2));
  bird(s, 2.85, 4.4); bird(s, 5.25, 4.35);
  label(s, 0.7, 5.55, 5.6, 'Birds eat the moths that **stand out**.', { size: 11, h: 0.3 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'The steps', [
    '**1 Variation:** individuals in a population vary, because of **mutations** that create new alleles.',
    '**2 Competition:** more offspring are born than can survive; they compete for food, mates, space.',
    '**3 Selection:** individuals with **advantageous** characteristics are more likely to **survive** (e.g. dark moths on sooty bark are not seen by birds).',
    '**4 Reproduce:** survivors **breed** and pass on the **advantageous alleles**.',
    '**5 Change:** over many generations the allele becomes **more common**: the species **evolves**.',
  ], { size: 12.5 });
  D.quickCheck(s, 'Explain why the number of **dark** peppered moths increased in industrial cities.');
  D.notes(s, 'QUICK CHECK ANSWER: dark moths camouflaged on sooty bark (1); less likely to be eaten by birds, so survive and reproduce (1); pass on the allele for dark colour, which becomes more common (1).\nSpec 4.2. Use the five-step chain in every natural selection answer: variation → competition → survival → reproduce → allele frequency increases.');
  reg(s, '4.2 Natural selection');
}

// ======================= 7 MOTH DATA =======================
reg(D.contentSlide({
  title: 'Natural selection data: peppered moths',
  subtitle: 'Specification 4.2 • applying the theory to evidence',
  tag: '4.2', caption: 'percentage of dark moths near Manchester (model data)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.7, h: 3.4, xmin: 1850, xmax: 2000, xstep: 25, ymin: 0, ymax: 100, ystep: 20, xlabel: 'Year', ylabel: '% dark moths', grid: true };
    axes(s, g); points(s, g, MOTH, C.red); plotLine(s, g, MOTH, C.red, 2);
    label(s, px(g, 1956) - 2.05, py(g, 55), 2.0, '1956 Clean Air Act', { size: 9.5, bold: true, color: C.blue, align: 'right' });
    line(s, px(g, 1956), py(g, 95), px(g, 1956), py(g, 0), C.blue, 1.25, { dash: 'dash' });
  },
  head: 'Interpreting the data',
  lines: [
    '1850–1900: factories covered trees in **soot**: dark moths were **camouflaged**, so the % rose from **2% to 98%**.',
    'After the **Clean Air Act** (1956) trees became lighter again, so **pale** moths had the advantage and the % of dark moths **fell**.',
    'The changes happened over **generations**, not within one moth’s life.',
  ],
  worked: { head: 'Sampling', q: 'A survey caught 400 moths; 360 were dark. Calculate the % dark.',
    steps: [['Divide', '360 ÷ 400'], ['× 100', '0.9 × 100'], ['Answer', '90% dark']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why the percentage of dark moths **fell** after 1960.',
  notes: 'QUICK CHECK ANSWER: less soot / bark lighter so dark moths more visible (1); eaten by birds more, so fewer survive to reproduce / pass on the dark allele (1).\nSpec 4.2. Graph values are model data.',
}), '4.2 Peppered moth data');

// ======================= 8 ANTIBIOTIC RESISTANCE =======================
reg(D.contentSlide({
  title: 'Antibiotic resistance',
  subtitle: 'Specification 4.3 • evidence for natural selection happening now',
  tag: '4.3', caption: 'one resistant bacterium survives and multiplies',
  draw: (s, p) => {
    const stage = (x, title, cells) => {
      box(s, x, 1.75, 1.75, 2.4, C.white, '777777', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
      label(s, x - 0.05, 4.2, 1.85, title, { size: 10.5, bold: true, h: 0.5, valign: 'top' });
      cells.forEach(([dx, dy, res]) => box(s, x + dx, 1.75 + dy, 0.38, 0.2, res ? 'E0A040' : '7FB3E0', res ? '9A5A0A' : '2F5F8F', { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 1 }));
    };
    const all = []; for (let i = 0; i < 12; i++) all.push([0.15 + (i % 3) * 0.52, 0.25 + Math.floor(i / 3) * 0.5, i === 7]);
    stage(0.65, '1 a mutation makes one resistant', all);
    stage(2.6, '2 antibiotic kills the non-resistant', [[0.68, 1.75, true]]);
    stage(4.55, '3 resistant bacteria multiply', all.map(([a, b]) => [a, b, true]));
    arrow(s, 2.42, 2.95, 2.58, 2.95, C.ink, 1.5); arrow(s, 4.37, 2.95, 4.53, 2.95, C.ink, 1.5);
    box(s, 0.75, 4.85, 0.38, 0.2, '7FB3E0', '2F5F8F', { shape: SH.ROUNDED_RECTANGLE, r: 0.5 }); label(s, 1.2, 4.75, 1.5, 'not resistant', { size: 10, align: 'left' });
    box(s, 3.1, 4.85, 0.38, 0.2, 'E0A040', '9A5A0A', { shape: SH.ROUNDED_RECTANGLE, r: 0.5 }); label(s, 3.55, 4.75, 1.5, 'resistant', { size: 10, align: 'left' });
  },
  head: 'How resistance spreads',
  lines: [
    'A random **mutation** gives one bacterium an allele for **resistance**.',
    'When an **antibiotic** is used, the non-resistant bacteria **die**; the resistant ones **survive**.',
    'They **reproduce** quickly (binary fission), passing on the resistance allele, so the population becomes **resistant** (e.g. **MRSA**).',
    'This supports Darwin’s theory: we can **observe** natural selection in a short time because bacteria reproduce so fast.',
  ],
  worked: { head: 'How fast?', q: 'A bacterium divides every 20 min. How many after 2 hours?',
    steps: [['Divisions', '120 ÷ 20 = 6'], ['Rule', '2⁶'], ['Answer', '64 bacteria']], size: 11 },
  workedH: 1.75,
  qc: 'Give **two** ways to reduce the spread of antibiotic resistance.',
  notes: 'QUICK CHECK ANSWER: any two: do not prescribe antibiotics for viral infections / unnecessarily; patients finish the course; reduce use in farming; good hygiene in hospitals (1 each).\nSpec 4.3. Link to Topic 5 antibiotics.',
}), '4.3 Antibiotic resistance');

// ======================= 9 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 4.1–4.3 • natural selection and resistance', [
  { q: 'Describe the contribution of **Wallace** to the theory of evolution.', marks: 2, ms: 'Independently developed the theory of natural selection (1); published with Darwin / collected evidence, e.g. warning colouration (1).' },
  { q: 'Explain how a population of bacteria becomes resistant to an antibiotic.', marks: 4, ms: 'Mutation produces a resistant bacterium (1); antibiotic kills non-resistant bacteria (1); resistant bacteria survive and reproduce (1); allele for resistance passed on / population becomes resistant (1).' },
  { q: 'A bacterium divides every 30 minutes. How many bacteria are there after 3 hours?', marks: 1, ms: '2⁶ = 64 (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 10 HUMAN FOSSILS =======================
reg(D.contentSlide({
  title: 'Evidence for human evolution: fossils',
  subtitle: 'Specification 4.4 • Ardi, Lucy and Turkana Boy',
  tag: '4.4', caption: 'brain volume of hominid fossils (approximate)',
  draw: (s, p) => {
    const g = { x: 1.35, y: 1.6, w: 4.7, h: 3.25, xmin: 0, xmax: 4, xstep: 1, ymin: 0, ymax: 1400, ystep: 200, xlabel: '', ylabel: 'Brain volume (cm³)' };
    axes(s, g);
    BRAIN.forEach(([n, a, v], i) => {
      const x0 = px(g, i + 0.15), x1 = px(g, i + 0.85);
      box(s, x0, py(g, v), x1 - x0, py(g, 0) - py(g, v), ['C9A66B', 'B5895A', '9C6B3C', '5E8A4A'][i], '555555', { lw: 0.75 });
      label(s, x0 - 0.15, py(g, 0) + 0.25, x1 - x0 + 0.3, `**${n}**`, { size: 9.5, h: 0.25 });
      label(s, x0 - 0.15, py(g, 0) + 0.48, x1 - x0 + 0.3, a ? `${a} mya` : 'today', { size: 9, color: C.grey, h: 0.22 });
      label(s, x0 - 0.1, py(g, v) - 0.25, x1 - x0 + 0.2, String(v), { size: 9.5, bold: true, h: 0.22 });
    });
  },
  head: 'Key fossils',
  lines: [
    '**Ardi** (Ardipithecus, **4.4 mya**): ape-like feet for climbing, long arms; probably walked **upright**; small brain (≈ 350 cm³).',
    '**Lucy** (Australopithecus, **3.2 mya**): walked **upright**; feet more human-like; brain ≈ 400 cm³.',
    '**Turkana Boy** (Homo erectus, **1.6 mya**, found by **Leakey**’s team): taller, more human body; shorter arms; brain ≈ 880 cm³.',
    'Trend: **larger brains**, more **upright** walking, shorter arms over time.',
  ],
  worked: { head: 'Calculation', q: 'Calculate the % increase in brain volume from Lucy to modern humans.',
    steps: [['Change', '1350 − 400 = 950'], ['Divide', '950 ÷ 400 × 100'], ['Answer', '237.5% (≈ 240%)']], size: 11 },
  workedH: 1.75,
  qc: 'Describe **two** trends shown by the fossil evidence.',
  notes: 'QUICK CHECK ANSWER: any two: brain size increases; walking becomes more upright; arms get shorter / legs longer; body becomes taller (1 each).\nSpec 4.4. mya = million years ago. Brain volumes approximate (values asserted in build).',
}), '4.4 Human fossils');

// ======================= 11 STONE TOOLS =======================
reg(D.contentSlide({
  title: 'Evidence for human evolution: stone tools',
  subtitle: 'Specification 4.5 • tools became more complex; dated from their surroundings',
  tag: '4.5', caption: 'rock layers: deeper = older',
  draw: (s, p) => {
    const L = [['E8D9B5', 'about 0.2 mya: flake tools (Homo sapiens / Neanderthals)', 'flake'], ['D8C49A', 'about 1.6 mya: hand axes (Homo erectus)', 'acheulean'], ['C4AB7C', 'about 2.4 mya: simple pebble tools (Homo habilis)', 'oldowan']];
    L.forEach(([c, t, k], i) => {
      const y = 1.6 + i * 1.3;
      box(s, 0.75, y, 5.5, 1.25, c, 'A88B63', { lw: 1 });
      tool(s, k, 1.4, y + 0.62, 1.3);
      label(s, 2.0, y, 4.1, t, { size: 11, align: 'left', h: 1.25 });
    });
    arrow(s, 6.35, 1.7, 6.35, 5.4, C.red, 1.5);
    label(s, 0.75, 5.55, 5.6, 'Dating: **radiometric dating** of volcanic rock layers above and below the tools.', { size: 10.5, h: 0.4 });
  },
  head: 'What the tools show',
  lines: [
    '**Homo habilis** (≈ 2.4 mya): simple **pebble** tools made by hitting stones together.',
    '**Homo erectus** (≈ 1.6 mya): **hand axes**, shaped on both sides; more skill and planning.',
    '**Homo sapiens / Neanderthals**: finer **flake** tools, points and blades.',
    'Tools are dated by the **layer of rock** they are found in (older layers are deeper) and by **carbon dating** of materials found with them.',
  ],
  worked: { head: 'Explain', q: 'Why do more complex tools suggest brains were evolving?',
    steps: [['Skill', 'complex tools need planning and fine control'], ['Link', 'larger brains in later fossils'], ['Pattern', 'tools and brain size change together'], ['Answer', 'supports increasing intelligence over time']] },
  qc: 'How can scientists tell which tools are **older**?',
  notes: 'QUICK CHECK ANSWER: older tools are found in deeper rock layers (1); radiometric / carbon dating of rock or material around them (1).\nSpec 4.5. Dates are approximate.',
}), '4.5 Stone tools');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 4.4–4.5 • human evolution', [
  { q: 'Give **two** differences between Ardi and Turkana Boy.', marks: 2, ms: 'Turkana Boy: larger brain (1); taller / shorter arms / fully upright, more human body (1). Ardi older (4.4 mya vs 1.6 mya).' },
  { q: 'Brain volume increased from 600 cm³ to 1350 cm³. Calculate the % increase.', marks: 2, ms: '750 ÷ 600 × 100 (1); = 125% (1).' },
  { q: 'Explain how stone tools found in rock layers can be dated.', marks: 2, ms: 'Deeper layers are older (1); date the rock layer / material around them, e.g. radiometric / carbon dating (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 CLASSIFICATION =======================
reg(D.contentSlide({
  title: 'Classification: five kingdoms to three domains',
  subtitle: 'Specification 4.6 • genetic analysis changed how we group organisms',
  tag: '4.6', caption: 'Woese’s three-domain system (1990)',
  draw: (s, p) => {
    box(s, 2.6, 1.6, 1.8, 0.55, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.1 }); label(s, 2.6, 1.6, 1.8, 'common ancestor', { size: 11, bold: true, color: C.white, h: 0.55 });
    const d = [[1.4, 'Bacteria', 'true bacteria', '2F5F8F'], [3.5, 'Archaea', 'extremophiles; DNA closer to eukaryotes', '8E44AD'], [5.6, 'Eukarya', 'animals, plants, fungi, protists', '2E7D4F']];
    d.forEach(([x, n, t, c]) => {
      line(s, 3.5, 2.15, x, 2.95, c, 2.5);
      box(s, x - 0.95, 2.95, 1.9, 0.6, c, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.1 }); label(s, x - 0.95, 2.95, 1.9, n, { size: 12, bold: true, color: C.white, h: 0.6 });
      label(s, x - 0.95, 3.6, 1.9, t, { size: 10, h: 0.7, valign: 'top' });
    });
    D.card(s, 0.75, 4.4, 5.5, 1.35, 'Old system: five kingdoms', ['animals • plants • fungi • protists • prokaryotes (based on **what organisms look like**)'], { size: 11, fill: C.white });
  },
  head: 'What changed and why',
  lines: [
    'The old **five-kingdom** system grouped organisms by **observable features** (structure, cell type).',
    '**Genetic analysis** (comparing DNA / RNA base sequences) showed that **prokaryotes** are really **two very different groups**.',
    '**Archaea** (often in extreme places, e.g. hot springs) are genetically **as different from bacteria** as from us.',
    'So Carl **Woese** proposed **three domains**: **Archaea, Bacteria, Eukarya**.',
  ],
  worked: { head: 'Why DNA is better', q: 'Why does DNA give a more accurate classification than appearance?',
    steps: [['Looks', 'unrelated organisms can look similar'], ['DNA', 'shows how closely related organisms are'], ['Compare', 'more similar sequences = closer relatives'], ['Answer', 'groups reflect evolutionary relationships']] },
  qc: 'Name the **three domains**. Which domain do humans belong to?',
  notes: 'QUICK CHECK ANSWER: Archaea, Bacteria, Eukarya (1); Eukarya (1).\nSpec 4.6.',
}), '4.6 Three domains');

// ======================= 14 SELECTIVE BREEDING =======================
reg(D.contentSlide({
  title: 'Selective breeding',
  subtitle: 'Specification 4.7 • humans choose which organisms reproduce',
  tag: '4.7', caption: 'the process is repeated over many generations',
  draw: (s, p) => {
    stepBoxes(s, 0.75, 1.55, 5.5, [
      ['Decide on the **desired characteristic**, e.g. high milk yield.'],
      ['Choose **parents** that show the characteristic best.'],
      ['**Breed** them together.'],
      ['Select the **best offspring** and breed them.'],
      ['**Repeat** for many generations until all offspring show it.'],
    ], { h: 0.62, gap: 0.2, size: 11.5 });
  },
  head: 'Impact and examples',
  lines: [
    '**Food plants:** high yields, disease resistance, large fruit (e.g. modern **wheat** from wild grasses; **broccoli** and **cabbage** from wild mustard).',
    '**Domesticated animals:** cows with high **milk** yield; chickens that lay more eggs; gentle **dogs**.',
    '**Problems:** less **variation** (a smaller **gene pool**), so more risk from **disease**; more **inherited defects** from **inbreeding**.',
  ],
  worked: { head: 'Calculation', q: 'Average milk yield rose from 4000 to 8000 litres per cow per year. Calculate the % increase.',
    steps: [['Change', '8000 − 4000 = 4000'], ['Divide', '4000 ÷ 4000 × 100'], ['Answer', '100% increase']], size: 11 },
  workedH: 1.75,
  qc: 'Explain **one** disadvantage of selective breeding.',
  notes: 'QUICK CHECK ANSWER: reduces variation / gene pool (1) so a new disease could kill all the organisms OR inbreeding leads to more inherited disorders (1).\nSpec 4.7.',
}), '4.7 Selective breeding');

// ======================= 15 GENETIC ENGINEERING =======================
reg(D.contentSlide({
  title: 'Genetic engineering',
  subtitle: 'Specification 4.8 • modifying the genome to add a useful characteristic',
  tag: '4.8', caption: 'the human insulin gene inserted into bacteria',
  draw: (s, p) => {
    box(s, 0.8, 1.7, 1.8, 1.2, 'FBE9E7', 'B5655B', { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1.75 });
    label(s, 0.8, 1.7, 1.8, 'human cell', { size: 10.5, bold: true, h: 0.35 });
    line(s, 1.1, 2.45, 2.3, 2.45, '6A4C93', 3); line(s, 1.5, 2.45, 1.9, 2.45, C.red, 5);
    label(s, 0.8, 2.55, 1.8, 'insulin gene', { size: 9.5, color: C.red, h: 0.3 });
    arrow(s, 2.7, 2.3, 3.6, 2.3, C.ink, 2);
    box(s, 3.7, 1.7, 2.5, 1.2, 'E7F0F7', '2A6F8E', { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 2.5 });
    plasmid(s, 4.95, 2.3, 0.32, { insert: true });
    label(s, 3.7, 2.95, 2.5, 'bacterium with the gene', { size: 10, h: 0.3 });
    arrow(s, 4.95, 3.3, 4.95, 3.8, C.ink, 2);
    box(s, 3.9, 3.85, 2.1, 1.25, 'D6EAF8', '2F5F8F', { lw: 1.5 });
    label(s, 3.9, 3.9, 2.1, '**fermenter**', { size: 11, h: 0.3 });
    for (let i = 0; i < 8; i++) box(s, 4.05 + (i % 4) * 0.47, 4.3 + Math.floor(i / 4) * 0.35, 0.32, 0.16, 'E7F0F7', '2A6F8E', { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 1 });
    arrow(s, 3.85, 4.5, 2.7, 4.5, C.ink, 2);
    label(s, 0.75, 4.2, 1.95, '**human insulin** for people with diabetes', { size: 10.5, color: C.red, h: 0.7 });
  },
  head: 'What it is',
  lines: [
    '**Genetic engineering** modifies the **genome** of an organism by inserting a **gene** from another organism to give a **desirable characteristic**.',
    'The organism is **genetically modified (GM)**.',
    '**Examples:** bacteria making **human insulin**; **golden rice** (vitamin A); crops resistant to **insects** or **herbicides**.',
  ],
  worked: { head: 'Why bacteria?', q: 'Why are bacteria used to make insulin?',
    steps: [['Fast', 'reproduce very quickly'], ['Plasmids', 'easy to insert genes'], ['Product', 'large amounts made cheaply'], ['Answer', 'identical human insulin; no animal source needed']] },
  qc: 'Define **genetic engineering** and give **one** example.',
  notes: 'QUICK CHECK ANSWER: changing / modifying the genome of an organism by adding a gene (from another organism) to give a desired characteristic (1); any example: insulin-producing bacteria, golden rice, Bt / herbicide-resistant crops (1).\nSpec 4.8.',
}), '4.8 Genetic engineering');

// ======================= 16 STAGES OF GE (HT) =======================
reg(D.contentSlide({
  title: 'The stages of genetic engineering',
  subtitle: 'Specification 4.9 • restriction enzymes, sticky ends, ligase and vectors',
  tag: '4.9', ht: true, caption: 'cutting and pasting a gene into a plasmid',
  draw: (s, p) => {
    label(s, 0.6, 1.4, 3, '**1 Cut**', { size: 11.5, align: 'left', color: C.blue });
    line(s, 0.8, 1.95, 3.2, 1.95, '6A4C93', 4); line(s, 1.6, 1.95, 2.4, 1.95, C.red, 6);
    [1.6, 2.4].forEach(x => { line(s, x, 1.7, x, 2.2, C.ink, 1.5, { dash: 'dash' }); });
    label(s, 0.7, 2.25, 2.7, 'restriction enzyme cuts out the gene', { size: 9.5, h: 0.3 });
    plasmid(s, 4.9, 1.95, 0.42, { gap: true });
    label(s, 3.9, 2.45, 2.0, 'same enzyme cuts the plasmid', { size: 9.5, h: 0.3 });
    label(s, 0.6, 2.85, 3, '**2 Sticky ends**', { size: 11.5, align: 'left', color: C.blue });
    box(s, 1.0, 3.35, 2.0, 0.22, C.red, C.red); box(s, 0.7, 3.57, 2.0, 0.22, C.red, C.red);
    label(s, 0.55, 3.15, 0.4, 'AATT', { size: 8, h: 0.2 }); label(s, 2.75, 3.6, 0.4, 'TTAA', { size: 8, h: 0.2 });
    label(s, 3.3, 3.25, 3.0, 'unpaired bases on each end that **match** the cut plasmid', { size: 10, align: 'left', h: 0.55 });
    label(s, 0.6, 4.05, 3, '**3 Join**', { size: 11.5, align: 'left', color: C.blue });
    plasmid(s, 1.6, 4.85, 0.42, { insert: true });
    label(s, 2.2, 4.45, 4.1, '**ligase** joins the sticky ends: **recombinant** plasmid', { size: 10, align: 'left', h: 0.5 });
    label(s, 2.2, 4.95, 4.1, '**4 Vector**: the plasmid carries the gene into the host cell', { size: 10, align: 'left', h: 0.5 });
  },
  head: 'Stages',
  lines: [
    '**Restriction enzymes** cut the DNA at specific base sequences, leaving **sticky ends**.',
    'The **same** restriction enzyme cuts open a **plasmid** (or virus), so the sticky ends are **complementary**.',
    '**Ligase** enzyme joins the gene into the plasmid: a **recombinant** DNA molecule.',
    'The **vector** (plasmid or virus) inserts the gene into the **host** cell, e.g. a bacterium, which then makes the protein.',
  ],
  worked: { head: 'Exam technique', q: 'Why must the same restriction enzyme cut both the gene and the plasmid?',
    steps: [['Enzyme', 'cuts at the same base sequence'], ['Ends', 'gives complementary sticky ends'], ['Pair', 'bases on the ends pair up'], ['Answer', 'gene can be joined into the plasmid']] },
  qc: 'What is the job of **ligase**? What is a **vector**?',
  notes: 'QUICK CHECK ANSWER: ligase joins (pieces of) DNA / joins the gene into the plasmid (1); a vector carries the gene into the host cell, e.g. a plasmid or virus (1).\nSpec 4.9 (Higher only, medium confidence).',
}), '4.9 Stages of genetic engineering (HT)');

// ======================= 17 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 4.6–4.9 • classification, breeding and GE', [
  { q: 'Explain why genetic analysis led to the three-domain system.', marks: 2, ms: 'DNA / RNA sequences compared (1); showed archaea are very different from bacteria / prokaryotes are two separate groups (1).' },
  { q: 'Describe how farmers could breed cows that produce more milk.', marks: 3, ms: 'Choose cows (and bulls from mothers) with high milk yield (1); breed them together (1); select best offspring and repeat for many generations (1).' },
  { q: 'Describe the role of restriction enzymes in genetic engineering.', marks: 2, ht: true, ms: 'Cut DNA at specific sequences / cut out the gene and open the plasmid (1); leaving sticky ends (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 18 TISSUE CULTURE (B) =======================
reg(D.contentSlide({
  title: 'Tissue culture',
  subtitle: 'Specification 4.10B • growing cells or whole plants from small samples',
  tag: '4.10B', p: true, caption: 'plant tissue culture: many identical plants from one parent',
  draw: (s, p) => {
    plant(s, 1.2, 3.1, 1.3); label(s, 0.6, 3.15, 1.3, 'parent plant', { size: 10, h: 0.3 });
    arrow(s, 1.75, 2.4, 2.35, 2.4, C.ink, 1.5); label(s, 1.6, 1.95, 0.9, 'cut small pieces', { size: 9, h: 0.4 });
    [2.6, 3.15, 3.7].forEach(x => { box(s, x, 1.9, 0.38, 1.2, C.white, '555555', { lw: 1 }); box(s, x + 0.03, 2.6, 0.32, 0.47, 'F7E3A8', 'F7E3A8'); ball(s, x + 0.19, 2.5, 0.07, '6DBE5A', '35582A'); });
    label(s, 2.4, 3.15, 1.8, 'explants on sterile agar with nutrients and hormones', { size: 9, h: 0.55, valign: 'top' });
    arrow(s, 4.25, 2.4, 4.75, 2.4, C.ink, 1.5);
    [4.9, 5.35, 5.8].forEach(x => plant(s, x, 3.1, 0.7));
    label(s, 4.6, 3.15, 1.7, 'identical plantlets (clones)', { size: 9.5, h: 0.4 });
    D.card(s, 0.75, 4.0, 5.5, 1.75, 'Animal tissue culture', ['Cells are separated with **enzymes** and grown in a nutrient medium.', 'Used in **medical research**: testing drugs, studying how cells grow or how cancer develops, without using whole animals.'], { size: 10.5, fill: C.white });
  },
  head: 'Advantages',
  lines: [
    '**Plant breeding:** large numbers of **identical** plants quickly, all with the desired characteristics.',
    'Grows plants that are hard to grow from seed; **preserves rare species**.',
    'Plants can be grown **all year** in a small space.',
    '**Medical research:** cells can be studied in controlled conditions; results are **reproducible**; fewer animals used.',
    '**Disadvantage:** clones have **no variation**, so are all at risk from the same disease.',
  ],
  worked: { head: 'Calculation', q: 'One plant gives 50 explants. Each plantlet gives 50 more. How many plants after two rounds?',
    steps: [['Round 1', '50 plantlets'], ['Round 2', '50 × 50'], ['Answer', '2500 plants']], size: 11 },
  workedH: 1.75,
  qc: 'Why must the agar and equipment be **sterile**?',
  notes: 'QUICK CHECK ANSWER: to stop microorganisms (bacteria / fungi) growing (1); which would compete for nutrients / kill or contaminate the plantlets (1).\nSpec 4.10B (biology only).',
}), '4.10B Tissue culture (BIOLOGY ONLY)');

// ======================= 19 Bt CROPS (B) =======================
reg(D.contentSlide({
  title: 'Insect-resistant crops',
  subtitle: 'Specification 4.11B • genetic engineering to protect plants',
  tag: '4.11B', p: true, caption: 'Bt maize vs non-GM maize (model data)',
  draw: (s, p) => {
    const rows = [[HDR(''), HDR('Non-GM maize'), HDR('Bt maize')], ...[['Yield (tonnes per hectare)', '3.2', '4.0'], ['Insecticide used (kg per hectare)', '12', '3']].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i, { bold: true, color: C.blue })])];
    table(s, rows, { x: 0.75, y: 1.6, w: 5.5, colW: [2.5, 1.5, 1.5], rowH: 0.55, fontSize: 12 });
    D.card(s, 0.75, 3.45, 5.5, 2.3, 'How it works', [
      'A gene from the bacterium **Bacillus thuringiensis** (Bt) is put into the crop.',
      'The plant makes **Bt toxin**, which kills insect larvae that eat it.',
      'The toxin is **harmless** to humans and most other animals.',
    ], { size: 11, fill: C.white });
  },
  head: 'Advantages and disadvantages',
  lines: [
    '**+** Higher **yields**: less crop lost to insects.',
    '**+** **Less insecticide** sprayed: cheaper; less harm to other insects; less pollution.',
    '**−** Insects may evolve **resistance** to the Bt toxin (natural selection).',
    '**−** May harm **non-target** insects (e.g. butterflies); genes could spread to **wild plants**.',
    '**−** **GM seed** is expensive; some people worry about eating GM food.',
  ],
  worked: { head: 'Use the data', q: 'Calculate the % change in insecticide use.',
    steps: [['Change', '3 − 12 = −9 kg'], ['Divide', '−9 ÷ 12 × 100'], ['Answer', '75% decrease']], size: 11 },
  workedH: 1.75,
  qc: 'Calculate the % increase in yield for Bt maize.',
  notes: 'QUICK CHECK ANSWER: (4.0 − 3.2) ÷ 3.2 × 100 = 25%.\nSpec 4.11B (biology only). Data are model values.',
}), '4.11B Bt crops (BIOLOGY ONLY)');

// ======================= 20 FERTILISERS & BIO CONTROL (B) =======================
reg(D.contentSlide({
  title: 'Fertilisers and biological control',
  subtitle: 'Specification 4.12B • feeding a growing population: advantages and disadvantages',
  tag: '4.12B', p: true, caption: 'aphids on a crop before and after releasing ladybirds (model data)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.7, h: 3.2, xmin: 0, xmax: 8, xstep: 1, ymin: 0, ymax: 1000, ystep: 200, xlabel: 'Week', ylabel: 'Number of aphids', grid: true };
    const A = [[0, 500], [1, 650], [2, 800], [3, 600], [4, 380], [5, 220], [6, 150], [7, 120], [8, 120]];
    axes(s, g); points(s, g, A, C.red); plotLine(s, g, A, C.red, 2);
    line(s, px(g, 2), py(g, 1000), px(g, 2), py(g, 0), C.blue, 1.5, { dash: 'dash' });
    label(s, px(g, 2) + 0.05, py(g, 980), 1.8, 'ladybirds released', { size: 10, bold: true, color: C.blue, align: 'left' });
  },
  head: 'Two solutions',
  lines: [
    '**Fertilisers** add **minerals** (e.g. nitrates) so crops grow faster: **higher yields**. **But** run-off into rivers causes **eutrophication**; costly to make.',
    '**Biological control** uses a **natural predator** or parasite to reduce a **pest** (e.g. ladybirds eat aphids). **+** no chemicals; long-lasting; specific.',
    '**−** Slower than pesticides; the control organism may **eat other species** or become a pest itself (e.g. **cane toads** in Australia).',
  ],
  worked: { head: 'Use the graph', q: 'Calculate the % fall in aphids from week 2 to week 7.',
    steps: [['Values', '800 → 120'], ['Change', '(120 − 800) ÷ 800 × 100'], ['Answer', '85% decrease']], size: 11 },
  workedH: 1.75,
  qc: 'Give **one** advantage and **one** disadvantage of biological control compared with pesticides.',
  notes: 'QUICK CHECK ANSWER: advantage: no chemical pollution / not toxic to other organisms / no need to keep reapplying / pests do not become resistant (1); disadvantage: slower / control organism may become a pest / may eat useful species / does not wipe out the pest (1).\nSpec 4.12B (biology only). Eutrophication links to Topic 9. Data are model values.',
}), '4.12B Fertilisers and biological control (BIOLOGY ONLY)');

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 4.10B–4.12B • tissue culture and farming', [
  { q: 'Give **two** advantages of using tissue culture to grow plants.', marks: 2, ms: 'Any two: many plants quickly; identical / clones with desired features; preserves rare species; all year round / small space (1 each).' },
  { q: 'Explain why insects might become resistant to Bt crops.', marks: 3, ms: 'Mutation gives some insects resistance (1); these survive eating the crop and reproduce (1); resistance allele passed on / becomes more common (1).' },
  { q: 'Pesticide use fell from 20 kg to 5 kg per hectare. Calculate the % decrease.', marks: 2, ms: '15 ÷ 20 × 100 (1); = 75% (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 BENEFITS & RISKS =======================
{
  const s = D.contentHeader('Evaluating GM and selective breeding', 'Specification 4.13 • agriculture and medicine; practical and ethical issues', { tag: '4.13' });
  D.card(s, 0.45, 1.3, 3.0, 4.95, '+ Benefits', [
    '**Agriculture:** higher yields; pest and disease resistance; crops grow in drought or poor soil; extra nutrients (**golden rice**).',
    '**Medicine:** insulin and other drugs made cheaply in large amounts; possible **gene therapy**.',
    'Can help **feed** a growing population.',
  ], { size: 11.5, fill: 'E3F2E8', border: '9FCDAF' });
  D.card(s, 3.6, 1.3, 2.95, 4.95, '− Risks and issues', [
    'GM genes may **spread** to wild plants (e.g. herbicide-resistant weeds).',
    '**Less variation** (both methods): crops vulnerable to new diseases.',
    'Long-term **health effects** of GM food not fully known.',
    '**Ethics:** is it right to change organisms’ genes? Seed cost and control by large companies.',
  ], { size: 11.5, fill: 'FBE5E6', border: 'E9A9AE' });
  D.workedSteps(s, 6.8, 1.3, 6.08, 4.95, 'Exam technique: "evaluate"', 'Evaluate the use of GM crops to increase food production. (6 marks)', [
    ['For', 'higher yields; less pesticide; more nutrients'],
    ['For', 'can grow in poor conditions; feeds more people'],
    ['Against', 'gene spread; resistance; reduced variation'],
    ['Against', 'cost; ethical and health concerns'],
    ['Judgement', 'say which side is stronger and why'],
    ['Answer', 'balanced points + a justified conclusion'],
  ], { size: 12 });
  D.quickCheck(s, 'Give **one** practical risk and **one** ethical concern about genetic engineering.');
  D.notes(s, 'QUICK CHECK ANSWER: practical: genes spread to wild relatives / reduced variation / pests become resistant / unknown long-term effects (1); ethical: interfering with nature / "playing God" / animal welfare / big companies controlling seed supply (1).\nSpec 4.13.');
  reg(s, '4.13 Benefits and risks');
}

// ======================= 23 EVALUATION DATA =======================
{
  const s = D.contentHeader('Practice: using data to evaluate', 'Specification 4.7–4.13 • percentages and conclusions', { tag: '4.13' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'Selective breeding raised the yield of wheat from 2.5 to 8.0 tonnes per hectare. Calculate the % increase.',
    [['Change', '8.0 − 2.5 = 5.5'], ['Divide', '5.5 ÷ 2.5 × 100'], ['Answer', '**220% increase**'], ['Evaluate', 'large gain, but less genetic variation']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Aphids fell from **500** to **150** after biological control. Calculate the % decrease.',
    '**2** A GM crop’s yield rose from **6.0** to **7.5** tonnes per hectare. Calculate the % increase.',
    '**3** Suggest **one** reason why the GM crop’s yield might fall again after several years.',
    '**4** A bacterium divides every **30 min**. How many are there after **5 hours** from one cell?',
  ], { size: 13.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Why do scientists compare **percentage** change rather than the actual change?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 350 ÷ 500 × 100 = 70% decrease. 2) 1.5 ÷ 6.0 × 100 = 25% increase. 3) pests evolve resistance / disease spreads through low-variation crop / soil nutrients used up. 4) 10 divisions: 2¹⁰ = 1024.\nQUICK CHECK: starting values differ, so % allows a fair comparison.');
  reg(s, '4.13 Practice: evaluating data');
}

// ======================= 24 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 4.1–4.13 • mixed', [
  { q: 'Describe how genetically modified bacteria are used to make human insulin.', marks: 3, ms: 'Insulin gene cut from human DNA (1); inserted into a plasmid / bacterium (1); bacteria grown in a fermenter and make insulin (1).' },
  { q: 'Give **one** benefit and **one** risk of growing GM crops.', marks: 2, ms: 'Benefit: higher yield / pest resistance / less pesticide / more nutrients (1); risk: genes spread to wild plants / reduced variation / resistance / unknown health effects (1).' },
  { q: 'Explain why selective breeding can lead to health problems in dogs.', marks: 2, ms: 'Inbreeding / breeding closely related animals (1); increases chance of inheriting harmful recessive alleles / reduced variation (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 25 KEY WORDS =======================
reg(D.keyWords([
  ['Natural selection', 'Better-adapted individuals survive, reproduce and pass on alleles.'],
  ['Evolution', 'Change in the inherited characteristics of a population over time.'],
  ['Adaptation', 'A feature that helps an organism survive in its environment.'],
  ['Antibiotic resistance', 'Bacteria not killed by an antibiotic; spreads by natural selection.'],
  ['Hominid', 'Humans and their ancestors, e.g. Ardi, Lucy.'],
  ['mya', 'Million years ago.'],
  ['Three domains', 'Archaea, Bacteria, Eukarya.'],
  ['Selective breeding', 'Humans choosing parents with desired characteristics.'],
  ['Genetic engineering', 'Modifying a genome by inserting a gene from another organism.'],
  ['Restriction enzyme', 'Cuts DNA at a specific sequence, leaving sticky ends (HT).'],
  ['Ligase', 'Enzyme that joins pieces of DNA (HT).'],
  ['Vector', 'Plasmid or virus carrying a gene into a cell (HT).'],
  ['Tissue culture', 'Growing cells or plants from small samples on a medium.'],
  ['Bt crop', 'GM crop that makes a toxin to kill insect pests.'],
  ['Biological control', 'Using a predator or parasite to reduce a pest.'],
  ['Clone', 'Genetically identical copy of an organism.'],
], { notes: 'Cover-and-recall. HT terms: restriction enzyme, ligase, vector (4.9). Biology-only: tissue culture, Bt crop, biological control.' }), 'Summary: key words');

// ======================= 26 FULL QUESTION =======================
reg(D.fullQuestion('MRSA is a type of bacterium that is resistant to many antibiotics.', [
  { l: 'a', q: 'Explain how MRSA became resistant to antibiotics.', marks: 4, ms: 'Random mutation gave resistance (1); antibiotic kills non-resistant bacteria (1); resistant bacteria survive and reproduce (1); resistance allele passed on, so population becomes resistant (1).', h: 1.3 },
  { l: 'b', q: 'MRSA divides every 30 minutes. Calculate how many bacteria come from one cell after 5 hours.', marks: 2, ms: '10 divisions (1); 2¹⁰ = 1024 (1).' },
  { l: 'c', q: 'Explain why the development of resistant bacteria supports Darwin’s theory.', marks: 2, ms: 'Natural selection observed happening (1); quickly because bacteria reproduce fast (1).' },
  { l: 'd', q: 'A GM crop increases yield from 5.0 to 6.2 tonnes per hectare. Calculate the % increase.', marks: 2, ms: '1.2 ÷ 5.0 × 100 (1); = 24% (1).' },
  { l: 'e', q: 'Describe how scientists classify organisms using the three-domain system.', marks: 3, ms: 'Archaea, Bacteria, Eukarya (1); based on genetic analysis / DNA or RNA sequences (1); archaea found to be different from bacteria (1).', h: 1.2 },
], 13, { subtitle: 'Specification 4.2–4.3, 4.6, 4.13 • answer every part • 13 marks' }), 'Full question');

// ======================= 27–28 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the fossil hominid found by Leakey’s team that is about **1.6 million** years old.', marks: 1, ms: 'Turkana Boy / Homo erectus (1).' },
  { n: '2', q: 'Brain volume increased from **600 cm³** to **1350 cm³**. Calculate the % increase.', marks: 2, ms: '750 ÷ 600 × 100 (1); 125% (1).' },
  { n: '3', q: 'Describe how stone tools changed over time.', marks: 2, ms: 'Simple pebble tools to more complex hand axes / flakes (1); needed more skill / planning / sharper edges (1).' },
  { n: '4', q: 'Give **two** disadvantages of selective breeding.', marks: 2, ms: 'Any two: reduces variation / gene pool; more vulnerable to disease; inbreeding causes inherited defects (1 each).' },
  { n: '5', q: 'Explain why biological control may be better than chemical pesticides.', marks: 3, ms: 'No chemicals / no pollution (1); does not harm other species / specific to pest (1); long-lasting / pest less likely to become resistant (1).' },
  { n: '6', q: 'Explain how natural selection leads to evolution. Use an example.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'There is variation in a population, caused by mutations (new alleles) and sexual reproduction.',
    'More offspring are produced than can survive; competition for food, mates, space; predators / disease.',
    'Individuals with characteristics best suited to the environment are more likely to survive.',
    'They reproduce and pass on the advantageous alleles to their offspring.',
    'Over many generations the advantageous allele becomes more common in the population.',
    'Example: peppered moths (dark moths camouflaged on sooty bark) or antibiotic-resistant bacteria.',
    'Over a long time this may lead to a new species.',
  ], 'Level 3 answers give the full chain (variation → competition → survival → reproduction → allele frequency) applied to an example.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 16);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7);
assert(D.slideNo >= 28 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T4_NaturalSelectionGM.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
