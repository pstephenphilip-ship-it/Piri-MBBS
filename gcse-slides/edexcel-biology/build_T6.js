// build_T6.js — Edexcel GCSE Biology 1BI0 Topic 6 Plant structures and their functions (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T6.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 6,
  title: 'Plant structures and their functions',
  shortTitle: 'T6',
  subtitle: 'Photosynthesis, transport in plants, leaves and plant hormones',
  specRange: '6.1–6.16B',
  pOnly: [],
  paper: 'Paper 2',
  keywords: ['Photosynthesis', 'Limiting factors', 'Xylem & phloem', 'Transpiration', 'Leaves', 'Plant hormones'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
const CP = [[10, 60], [20, 35], [30, 18], [40, 10], [50, 6]];
calc('CP bubbles 45 in 3 min', 45 / 3, 15, 1e-12);
calc('O2 12 cm³ in 5 min', 12 / 5, 2.4, 1e-12);
const I = d => 10000 / (d * d);
calc('intensity at 10 cm', I(10), 100, 1e-9);
calc('intensity at 20 cm', I(20), 25, 1e-9);
calc('intensity at 30 cm (3 s.f.)', sf(I(30), 3), 11.1, 1e-9);
calc('double distance → 1/4', I(20) / I(10), 0.25, 1e-12);
calc('triple distance → 1/9', I(30) / I(10), 1 / 9, 1e-12);
calc('half distance → 4×', I(5) / I(10), 4, 1e-12);
calc('YT 10 → 40 cm factor', I(40) / I(10), 1 / 16, 1e-12);
calc('YT 50 → 25 cm factor', I(25) / I(50), 4, 1e-12);
// photosynthesis limiting curves
const LIM = (L, cap) => cap * L / (cap * 0.25 + L);
calc('curve check', LIM(0, 10), 0, 1e-12);
// potometer
const vol = (r, dist) => Math.PI * r * r * dist;
calc('potometer 36 mm / 6 min', 36 / 6, 6, 1e-12);
calc('volume r 0.5 × 36 (3 s.f.)', sf(vol(0.5, 36), 3), 28.3, 1e-9);
calc('volume per min (3 s.f.)', sf(vol(0.5, 36) / 6, 3), 4.71, 1e-9);
calc('YT 48 mm / 4 min', 48 / 4, 12, 1e-12);
calc('YT vol r 0.4 × 48 / 4 (3 s.f.)', sf(vol(0.4, 48) / 4, 3), 6.03, 1e-9);
calc('mass loss 250 → 238 over 24 h', (250 - 238) / 24, 0.5, 1e-12);
calc('YT mass loss 180 → 171 over 6 h', (180 - 171) / 6, 1.5, 1e-12);
calc('stomata 30 per 0.1 mm²', 30 / 0.1, 300, 1e-9);
calc('YT stomata 12 per 0.05 mm²', 12 / 0.05, 240, 1e-9);
calc('% change transp 4.0 → 6.0', (6.0 - 4.0) / 4.0 * 100, 50, 1e-9);
const POT = [[0, 2], [1, 3.5], [2, 5], [3, 6.5], [4, 8]];
calc('fan rate slope', (POT[4][1] - POT[0][1]) / 4, 1.5, 1e-12);
calc('R2 bubbles 72 in 4 min', 72 / 4, 18, 1e-12);
calc('FQ 1 → 3 distance factor', I(30) / I(10), 1 / 9, 1e-12);
calc('FQ potometer 30 mm / 5 min', 30 / 5, 6, 1e-12);
calc('HW mean bubbles (24+26+22)/3', (24 + 26 + 22) / 3, 24, 1e-12);
calc('HW potometer 20 mm / 4 min', 20 / 4, 5, 1e-12);

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
const GRN = ['D2E8C4', '3E7A2E'];
function chloros(s, x, y, w, h, n) { for (let i = 0; i < n; i++) oval(s, x + w * (0.25 + 0.5 * (i % 2)), y + h * (i + 0.5) / n, Math.min(0.12, w * 0.35), 0.08, CHL[0], CHL[1], { lw: 0.5 }); }
const CHL = ['6DBE5A', '35582A'];
function lamp(s, x, y) {
  poly(s, [[x - 0.35, y], [x + 0.35, y], [x + 0.2, y - 0.35], [x - 0.2, y - 0.35]], '555555', '333333');
  ball(s, x, y + 0.12, 0.17, 'FFF3B0', 'C9A227', 1.25);
  line(s, x, y - 0.35, x, y - 0.6, '555555', 2.5);
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Plant structures',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • photosynthesis, transport, leaves and hormones • Core Practical 6.5` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and BIOLOGY ONLY slides are marked' },
    { icon: '6', text: 'Topic 6 of 9 • assessed on Paper 2' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 6 Plant structures and their functions. Paper 2. Higher only (HT pill): 6.4 interacting limiting factors, 6.6 inverse square law. Biology only: 6.14B extreme environments, 6.15B auxins, 6.16B commercial uses of plant hormones. Core Practical 6.5 light intensity and photosynthesis. See SPEC_T6.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '6.1–6.2', text: 'Describe **photosynthesis** as an **endothermic** reaction; plants as **producers**.' },
  { code: '6.3', text: 'Explain **limiting factors**: light, CO₂ and temperature.' },
  { code: '6.4, 6.6', text: 'Explain how limiting factors **interact**; use the **inverse square law**.', ht: true },
  { code: '6.5', text: '**Core Practical:** light intensity and the rate of photosynthesis.' },
  { code: '6.7–6.8', text: 'Explain how **root hair cells**, **xylem** and **phloem** are adapted.' },
  { code: '6.9–6.11', text: 'Explain **transpiration**, **translocation**, **stomata** and **leaf structure**.' },
  { code: '6.12–6.13', text: 'Explain factors affecting **water uptake**; calculate **transpiration rates**.' },
  { code: '6.14B–6.16B', text: 'Explain **adaptations** to extreme environments and **plant hormones**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT = 6.4, 6.6. B suffix = biology only.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 6 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['6.1–6.3', 'Photosynthesis and limiting factors', 'BOTH COURSES'],
    ['6.4, 6.6', 'Interacting factors; inverse square law (HT)', 'BOTH COURSES'],
    ['6.5', 'CP light intensity and photosynthesis', 'BOTH COURSES'],
    ['6.7–6.10', 'Root hairs, xylem, phloem, transpiration, translocation', 'BOTH COURSES'],
    ['6.11–6.13', 'Leaf structure; water uptake; rate calculations', 'BOTH COURSES'],
    ['6.14B', 'Adaptations to extreme environments', 'BIOLOGY ONLY'],
    ['6.15B–6.16B', 'Plant hormones and their uses', 'BIOLOGY ONLY'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 6\nPlant structures', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 diffusion, osmosis, active transport • Topic 8 respiration • Topic 9 cycles', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 6 is tested on **Paper 2** (1 h 45 min, 100 marks).',
      'Combined Science 1SC0 tests the statements **without** a B.',
      'Maths: **inverse square law** (HT), **rates**, **πr² × distance**.',
      '**Core Practical 6.5**: light intensity and photosynthesis.',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: extreme environments and plant hormones (6.14B–6.16B).',
      '**HT** pill: interacting limiting factors (6.4) and the inverse square law (6.6).',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Combined Science route: skip slides 22–25 (extreme environments, auxins, uses of hormones, recap 5) and the key words auxin and phototropism. Foundation route: skip slides 7 and 11, recap 1 Q3, recap 2 Q4 and full question (c).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • cells', q: 'Which plant cell structure carries out **photosynthesis**?' },
  { from: 'Topic 1 • transport', q: 'Define **osmosis**.' },
  { from: 'Topic 1 • transport', q: 'What does **active transport** need that diffusion does not?' },
  { from: 'Topic 1 • enzymes', q: 'Why do enzymes stop working at high **temperatures**?' },
  { from: 'KS3 • plants', q: 'Write the **word equation** for photosynthesis.' },
  { from: 'KS3 • maths', q: 'Calculate the area of a circle of radius **0.5 mm**.' },
], { subtitle: 'Recall from Topic 1 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Chloroplasts.\n2. Net movement of water from a dilute to a more concentrated solution across a partially permeable membrane.\n3. Energy from respiration (and carrier proteins).\n4. Active site changes shape / denatured.\n5. carbon dioxide + water → glucose + oxygen (light, chlorophyll).\n6. π × 0.25 = 0.785 mm².' }), 'Retrieval starter');
calc('starter area r 0.5', Math.PI * 0.25, 0.7853981633974483, 1e-12);

// ======================= 5 PHOTOSYNTHESIS =======================
reg(D.contentSlide({
  title: 'Photosynthesis',
  subtitle: 'Specification 6.1–6.2 • the reaction that makes food for almost all life',
  tag: '6.1–6.2', caption: 'inputs and outputs of a leaf',
  draw: (s, p) => {
    poly(s, [[1.8, 3.4], [3.0, 2.2], [4.8, 2.3], [5.6, 3.4], [4.8, 4.5], [3.0, 4.6]], '6DBE5A', '35582A', { lw: 2 });
    line(s, 1.8, 3.4, 5.6, 3.4, '35582A', 2);
    ball(s, 5.9, 1.75, 0.35, 'FFE066', 'E0A040', 1.5); label(s, 5.15, 2.15, 1.5, 'light energy', { size: 10.5, bold: true, color: 'B5782E', h: 0.3 });
    arrow(s, 5.6, 2.0, 4.8, 2.6, 'E0A040', 2);
    arrow(s, 0.7, 2.6, 2.4, 3.0, C.blue, 2); label(s, 0.6, 2.15, 2.0, '**carbon dioxide** (air, through stomata)', { size: 10, h: 0.45, align: 'left' });
    arrow(s, 0.7, 4.4, 2.4, 3.8, C.blue, 2); label(s, 0.6, 4.45, 2.0, '**water** (from roots, via xylem)', { size: 10, h: 0.45, align: 'left' });
    arrow(s, 4.6, 4.3, 5.8, 5.0, '2E7D4F', 2); label(s, 4.6, 5.05, 2.0, '**oxygen** (released)', { size: 10, h: 0.3, align: 'left' });
    arrow(s, 3.5, 4.6, 3.5, 5.2, '2E7D4F', 2); label(s, 2.3, 5.2, 2.0, '**glucose** (used / stored)', { size: 10, h: 0.3 });
  },
  head: 'Key facts',
  lines: [
    '**carbon dioxide + water → glucose + oxygen** (light energy; chlorophyll).',
    '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂',
    'It is **endothermic**: energy is **taken in** from light, absorbed by **chlorophyll** in **chloroplasts**.',
    'Plants and algae are **producers**: they make the **food** and **biomass** at the start of almost every food chain.',
    'Glucose is used for **respiration**, or turned into **starch** (storage), **cellulose** (cell walls), **proteins** (with nitrates) and **fats**.',
  ],
  worked: { head: 'Explain', q: 'Why is photosynthesis described as endothermic?',
    steps: [['Energy', 'light energy is absorbed'], ['Store', 'energy stored in glucose'], ['Overall', 'more energy taken in than released'], ['Answer', 'it transfers energy from the surroundings']] },
  qc: 'Write the **balanced symbol equation** for photosynthesis.',
  notes: 'QUICK CHECK ANSWER: 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂ (1 for formulae, 1 for balancing).\nSpec 6.1–6.2.',
}), '6.1–6.2 Photosynthesis');

// ======================= 6 LIMITING FACTORS =======================
reg(D.contentSlide({
  title: 'Limiting factors',
  subtitle: 'Specification 6.3 • light intensity, carbon dioxide and temperature',
  tag: '6.3', caption: 'model data: each graph changes one factor',
  draw: (s, p) => {
    const mk = (x, xl, f, a, b, lab) => {
      const g = { x, y: 1.7, w: 1.45, h: 2.6, xmin: a, xmax: b, xstep: (b - a), ymin: 0, ymax: 10, ystep: 10, xlabel: xl, ylabel: 'Rate', fmt: () => '', yfmt: () => '' };
      axes(s, g); fnLine(s, g, f, a, b, 50, C.blue, 2.5);
      label(s, x - 0.2, 4.95, 1.9, lab, { size: 9.5, h: 0.65, valign: 'top' });
    };
    mk(0.95, 'Light', L => LIM(L, 8), 0, 10, 'rises, then levels off: another factor limits');
    mk(2.95, 'CO₂', L => LIM(L, 8), 0, 10, 'same shape as light');
    mk(4.95, 'Temp (°C)', t => (t <= 30 ? 9 * Math.exp(-((t - 30) ** 2) / 200) : 9 * Math.exp(-((t - 30) ** 2) / 30)), 0, 45, 'rises to an optimum, then enzymes denature');
  },
  head: 'What is a limiting factor?',
  lines: [
    'A **limiting factor** is the factor in **shortest supply**: increasing it increases the rate.',
    '**Light intensity** and **CO₂**: the rate rises, then **levels off** when something else becomes limiting.',
    '**Temperature**: affects the **enzymes**; rate rises to an **optimum**, then falls as enzymes **denature**.',
  ],
  worked: { head: 'Reading graphs', q: 'On the light graph, what limits the rate on the flat part?',
    steps: [['Flat', 'more light gives no increase'], ['So', 'light is no longer limiting'], ['Other', 'CO₂ or temperature limits'], ['Answer', 'CO₂ concentration or temperature']] },
  qc: 'Explain why photosynthesis is slow on a **cold, sunny** winter day.',
  notes: 'QUICK CHECK ANSWER: temperature is the limiting factor (1); enzymes work slowly / few collisions at low temperatures (1).\nSpec 6.3. Curves are model shapes.',
}), '6.3 Limiting factors');

// ======================= 7 INTERACTIONS (HT) =======================
reg(D.contentSlide({
  title: 'Interacting limiting factors',
  subtitle: 'Specification 6.4 • which factor limits the rate at each point?',
  tag: '6.4', ht: true, caption: 'model data: rate at two CO₂ concentrations',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.3, xmin: 0, xmax: 10, xstep: 2, ymin: 0, ymax: 10, ystep: 2, xlabel: 'Light intensity', ylabel: 'Rate of photosynthesis', fmt: () => '', yfmt: () => '' };
    axes(s, g);
    fnLine(s, g, L => LIM(L, 8.5), 0, 10, 60, C.red, 2.5); fnLine(s, g, L => LIM(L, 4.5), 0, 10, 60, C.blue, 2.5);
    label(s, px(g, 7), py(g, 8.6) - 0.35, 1.6, '0.4% CO₂', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, px(g, 7), py(g, 4.4) - 0.35, 1.6, '0.04% CO₂', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, px(g, 0.6), py(g, 3.2), 0.4, '**A**', { size: 12, color: C.ink }); label(s, px(g, 8.5), py(g, 7.8) + 0.05, 0.4, '**B**', { size: 12, color: C.ink });
  },
  head: 'Interpreting the graph',
  lines: [
    'At **A** the two lines are the **same**: **light** is limiting (more CO₂ makes no difference).',
    'At **B** the higher-CO₂ line is higher: **CO₂** was limiting the lower line.',
    'Where a line is **flat**, increasing light has no effect: **CO₂** or **temperature** is limiting.',
    'Growers use **greenhouses** with heaters, lamps and extra CO₂ to raise all three, but only if the **extra yield** pays for the **cost**.',
  ],
  worked: { head: 'Exam technique', q: 'What limits the rate on the flat part of the 0.4% CO₂ line?',
    steps: [['Light', 'not limiting: line is flat'], ['CO₂', 'already high'], ['So', 'temperature is limiting'], ['Answer', 'temperature (or chlorophyll / enzymes)']] },
  qc: 'Why might a farmer **not** add extra CO₂ to a greenhouse?',
  notes: 'QUICK CHECK ANSWER: another factor (light / temperature) may be limiting so no increase (1); extra cost may be more than the value of the extra crop (1).\nSpec 6.4 (Higher only).',
}), '6.4 Interacting factors (HT)');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 6.1–6.4 • photosynthesis and limiting factors', [
  { q: 'Write the word equation for photosynthesis.', marks: 2, ms: 'carbon dioxide + water (1) → glucose + oxygen (1).' },
  { q: 'Explain why the rate of photosynthesis decreases at very high temperatures.', marks: 2, ms: 'Enzymes denature / active site changes shape (1); substrates no longer fit, so fewer reactions (1).' },
  { q: 'Explain how a graph shows that light is limiting the rate of photosynthesis.', marks: 2, ht: true, ms: 'Rate increases as light intensity increases (1); lines at different CO₂ / temperature are the same at that point (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 CP PHOTOSYNTHESIS =======================
reg(D.contentSlide({
  title: 'Core Practical: light intensity and photosynthesis',
  subtitle: 'Specification 6.5 • counting oxygen bubbles from pondweed',
  tag: '6.5', cp: true, caption: 'pondweed in sodium hydrogencarbonate solution',
  draw: (s, p) => {
    lamp(s, 1.2, 3.0);
    for (let i = 0; i < 4; i++) line(s, 1.45, 3.1 + (i - 1.5) * 0.15, 2.3, 3.1 + (i - 1.5) * 0.25, 'E0A040', 1.25, { dash: 'dash' });
    box(s, 2.5, 2.2, 0.5, 2.0, 'EAF3FB', '7FA9C9', { lw: 1 }); label(s, 2.2, 4.25, 1.1, 'heat shield (water)', { size: 9, h: 0.4 });
    box(s, 3.4, 1.8, 1.8, 2.6, 'D6EAF8', '555555', { lw: 2 });
    box(s, 3.9, 2.1, 0.8, 0.35, 'C9C9C9', '777777'); line(s, 4.3, 2.45, 4.3, 2.7, '777777', 2);
    polyline(s, [[4.3, 2.7], [4.25, 3.1], [4.35, 3.5], [4.25, 3.9], [4.3, 4.2]], '3E8E41', 4);
    [[4.1, 3.2], [4.5, 3.5], [4.0, 3.7]].forEach(([x, y]) => oval(s, x, y, 0.3, 0.1, '6DBE5A', '35582A', { rot: x > 4.3 ? -30 : 30 }));
    [2.55, 2.35, 2.15, 1.95].forEach(y => ball(s, 4.32, y + 0.5, 0.05, C.white, '2F5F8F', 0.75));
    label(s, 5.25, 2.6, 1.2, 'oxygen bubbles', { size: 10, align: 'left', h: 0.4 });
    line(s, 1.2, 4.75, 4.3, 4.75, C.red, 1.5, { head: true, tail: true }); label(s, 1.7, 4.8, 2.4, '**distance d** (ruler)', { size: 10.5, color: C.red });
  },
  head: 'Method',
  lines: [
    'Place pondweed in a tube of **sodium hydrogencarbonate** solution (supplies **CO₂**).',
    'Put a lamp at a measured **distance** (e.g. 10 cm); leave **5 min** to acclimatise.',
    '**Count bubbles** (or collect gas in a syringe/gas tube) for a set time, e.g. 1 min. Repeat.',
    'Move the lamp to **20, 30, 40, 50 cm** and repeat. Calculate **mean** rates.',
    '**Control:** temperature (water heat shield / LED lamp), CO₂ concentration, same piece of pondweed, dark room.',
  ],
  worked: { head: 'Rate', q: '45 bubbles are counted in 3 minutes.', steps: [['Rate', '45 ÷ 3'], ['Answer', '15 bubbles per minute']], size: 11 },
  workedH: 1.4,
  qc: 'Why is a beaker of water placed between the lamp and the pondweed?',
  notes: 'QUICK CHECK ANSWER: absorbs heat from the lamp (1) so temperature stays constant / is a control variable (1).\nCP 6.5. Measuring the gas volume is more accurate than counting bubbles (bubbles vary in size).',
}), '6.5 CP: photosynthesis');

// ======================= 10 CP RESULTS =======================
reg(D.contentSlide({
  title: 'Core Practical: analysing results',
  subtitle: 'Specification 6.5 • rate falls as the lamp moves away',
  tag: '6.5', cp: true, caption: 'mean bubbles per minute at each distance (model data)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.3, xmin: 0, xmax: 50, xstep: 10, ymin: 0, ymax: 70, ystep: 10, xlabel: 'Distance from lamp (cm)', ylabel: 'Bubbles per minute', grid: true };
    axes(s, g); points(s, g, CP, C.red);
    fnLine(s, g, d => 6000 / (d * d) + 0.0 * d + (d < 10 ? 0 : 0), 10, 50, 60, 'C9C9C9', 1);
    plotLine(s, g, CP, C.red, 2);
  },
  head: 'Conclusion and evaluation',
  lines: [
    'As distance **increases**, light intensity **decreases**, so the rate of photosynthesis **decreases**.',
    'The relationship is **not linear**: the rate falls quickly at first.',
    '**Errors:** bubbles vary in size; hard to count fast bubbles; lamp may warm the water. **Improve** by measuring **gas volume** and using an **LED** lamp.',
  ],
  worked: { head: 'Gas volume', q: '12 cm³ of oxygen is collected in 5 minutes. Calculate the rate.',
    steps: [['Rate', 'volume ÷ time'], ['Work', '12 ÷ 5'], ['Answer', '2.4 cm³/min']], size: 11 },
  workedH: 1.75,
  qc: 'Suggest why measuring the **volume** of gas is better than counting bubbles.',
  notes: 'QUICK CHECK ANSWER: bubbles are not all the same size (1); so volume is more accurate / a measuring tube or syringe gives a precise measurement (1).\nCP 6.5. Grey line = idealised 1/d² trend.',
}), '6.5 CP: results');

// ======================= 11 INVERSE SQUARE (HT) =======================
{
  const s = D.contentHeader('The inverse square law', 'Specification 6.6 • light intensity ∝ 1 / distance²', { tag: '6.6', ht: true });
  D.card(s, 0.45, 1.3, 6.1, 2.05, 'The law', [
    '**light intensity ∝ 1 ÷ d²**: doubling the distance gives **¼** of the light intensity.',
    'Rate of photosynthesis is **directly proportional** to light intensity (while light is limiting).',
  ], { size: 12.5 });
  D.workedSteps(s, 0.45, 3.5, 6.1, 2.75, 'My turn', 'A lamp is moved from 10 cm to 30 cm. How does the light intensity change?',
    [['Ratio', 'distance × 3'], ['Square', '3² = 9'], ['Inverse', 'intensity × 1/9'], ['Answer', 'light intensity falls to **1/9**']], { size: 12.5 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A lamp moves from **10 cm** to **40 cm**. What fraction of the light intensity is left?',
    '**2** A lamp moves from **50 cm** to **25 cm**. By what factor does intensity change?',
    '**3** Using I = 10 000 ÷ d², calculate the relative intensity at **20 cm** and **30 cm**.',
    '**4** Explain why halving the distance does **not** always make the rate four times faster.',
  ], { size: 13.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'The lamp is moved from **20 cm** to **10 cm**. How many times greater is the light intensity?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) (10/40)² = 1/16. 2) × 4 (half the distance). 3) 25 and 11.1. 4) another factor (CO₂, temperature) may become limiting, so rate stops rising in proportion.\nQUICK CHECK: 4 times.\nSpec 6.6 (Higher only).');
  reg(s, '6.6 Inverse square law (HT)');
}

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 6.5–6.6 • the Core Practical', [
  { q: 'Give **two** variables that should be controlled in the pondweed experiment.', marks: 2, ms: 'Any two: temperature; CO₂ concentration / volume of NaHCO₃; same pondweed / length; time of counting (1 each).' },
  { q: '72 bubbles are counted in 4 minutes. Calculate the rate.', marks: 1, ms: '18 bubbles per minute (1).' },
  { q: 'Explain why the rate decreases as the lamp moves further away.', marks: 2, ms: 'Light intensity decreases (1); light is the limiting factor so less photosynthesis / fewer bubbles (1).' },
  { q: 'A lamp moves from 15 cm to 30 cm. By what fraction does light intensity change?', marks: 2, ht: true, ms: 'Distance doubled so intensity × 1/2² (1); = 1/4 (1).' },
]);
calc('R2 15 → 30 factor', I(30) / I(15), 0.25, 1e-12);
reg(R2.s, 'Recap 2');

// ======================= 13 ROOT HAIR CELLS =======================
reg(D.contentSlide({
  title: 'Root hair cells',
  subtitle: 'Specification 6.7 • absorbing water and mineral ions',
  tag: '6.7', caption: 'a root hair cell in the soil',
  draw: (s, p) => {
    box(s, 0.75, 1.55, 5.5, 4.2, 'E8D5B0', 'A88B63', { lw: 1 });
    poly(s, [[0.9, 3.2], [2.6, 3.2], [2.6, 3.5], [5.6, 3.5], [5.9, 3.65], [5.6, 3.8], [2.6, 3.8], [2.6, 4.4], [0.9, 4.4]], 'EEF7E8', '3E7A2E', { lw: 2.5 });
    oval(s, 1.6, 3.8, 1.0, 0.45, 'DDEBF7', '5B87B5'); ball(s, 2.3, 3.55, 0.16, 'C9B6E4', '6A4C93', 1);
    [[3.3, 3.62], [4.3, 3.66]].forEach(([x, y]) => oval(s, x, y, 0.3, 0.12, 'F0B26B', 'B5782E'));
    [[1.3, 2.2], [3.0, 2.5], [4.8, 2.4], [5.4, 4.5], [3.6, 4.9], [1.6, 5.1]].forEach(([x, y]) => ball(s, x, y, 0.32, 'C9A97C', '8A6A3A', 1));
    [[2.0, 2.8], [4.0, 3.1], [5.0, 4.0], [4.4, 4.3]].forEach(([x, y]) => { ball(s, x, y, 0.05, '5B9BD5', '2F5F8F'); });
    [[2.8, 2.9], [3.8, 4.2]].forEach(([x, y]) => ball(s, x, y, 0.07, '8E44AD', '5E2D73'));
    callout(s, 0.9, 1.85, 1.6, 'long thin extension', 4.9, 3.6, '3E7A2E', { size: 10 });
    callout(s, 0.9, 5.4, 1.2, 'vacuole', 1.5, 3.95, '5B87B5', { size: 10 });
    callout(s, 4.6, 5.45, 1.5, 'mitochondria', 3.3, 3.62, 'B5782E', { size: 10 });
    waterLegend(s);
  },
  head: 'Adaptations',
  lines: [
    'A long, thin **root hair** gives a **large surface area** for absorption.',
    '**Thin cell wall**: a short distance for water to move.',
    'Water enters by **osmosis** (soil water is more **dilute** than cell sap).',
    'Mineral ions (e.g. **nitrates**) are absorbed by **active transport** against the concentration gradient: many **mitochondria** release the energy.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why root hair cells need mitochondria.',
    steps: [['Ions', 'mineral ions are more concentrated inside'], ['Method', 'active transport against the gradient'], ['Energy', 'needs energy from respiration'], ['Answer', 'mitochondria release this energy']] },
  qc: 'By which process does **water** enter a root hair cell? By which process do **mineral ions** enter?',
  notes: 'QUICK CHECK ANSWER: osmosis (1); active transport (1).\nSpec 6.7. Legend: blue = water molecules, purple = mineral ions.',
}), '6.7 Root hair cells');

// ======================= 14 XYLEM & PHLOEM =======================
reg(D.contentSlide({
  title: 'Xylem and phloem',
  subtitle: 'Specification 6.8 • transport tissues in plants',
  tag: '6.8', caption: 'xylem (left) and phloem (right), simplified',
  draw: (s, p) => {
    label(s, 0.8, 1.45, 2.2, '**Xylem**', { size: 13, color: '8A560A' });
    box(s, 1.3, 1.85, 1.2, 3.75, 'EAF3FB', '8A560A', { lw: 3 });
    for (let y = 2.0; y < 5.5; y += 0.25) { line(s, 1.3, y, 1.42, y + 0.08, '8A560A', 2); line(s, 2.38, y, 2.5, y + 0.08, '8A560A', 2); }
    arrow(s, 1.9, 5.3, 1.9, 2.1, C.blue, 3);
    label(s, 0.55, 5.65, 2.7, 'water + minerals: **up** only', { size: 10, h: 0.3 });
    label(s, 3.6, 1.45, 2.4, '**Phloem**', { size: 13, color: '2E7D4F' });
    box(s, 3.9, 1.85, 1.1, 3.75, 'E3F1DA', '2E7D4F', { lw: 2 });
    [2.9, 4.1].forEach(y => { box(s, 3.9, y, 1.1, 0.08, '2E7D4F', '2E7D4F'); [4.1, 4.35, 4.6, 4.85].forEach(x => ball(s, x, y + 0.04, 0.035, C.white, C.white)); });
    box(s, 5.05, 1.95, 0.55, 3.5, 'FBE9E7', 'B5655B', { lw: 1.5 }); ball(s, 5.33, 3.0, 0.13, 'C9B6E4', '6A4C93'); [3.6, 4.2, 4.8].forEach(y => oval(s, 5.33, y, 0.28, 0.12, 'F0B26B', 'B5782E'));
    arrow(s, 4.45, 2.1, 4.45, 3.0, C.red, 2.5); arrow(s, 4.45, 5.3, 4.45, 4.3, C.red, 2.5);
    label(s, 3.5, 5.65, 2.9, 'sucrose: **up and down**', { size: 10, h: 0.3 });
    label(s, 5.6, 2.35, 0.9, 'companion cell', { size: 9, h: 0.45, align: 'left' });
    label(s, 3.0, 2.65, 0.9, 'sieve plate', { size: 9, h: 0.3, align: 'right' });
  },
  head: 'Adaptations',
  lines: [
    '**Xylem:** **dead** cells joined end to end with **no end walls**: a continuous hollow tube. Walls are strengthened with **lignin** (support and stops collapse). Carries **water and mineral ions** from roots to leaves.',
    '**Phloem:** living **sieve tube** cells with **sieve plates** (pores) so sap can flow; little cytoplasm. **Companion cells** have many **mitochondria** to supply **energy**. Carries **sucrose** (and amino acids) both ways.',
  ],
  worked: { head: 'Compare', q: 'Give two differences between xylem and phloem.',
    steps: [['Cells', 'xylem dead; phloem living'], ['Carries', 'xylem water/ions; phloem sucrose'], ['Direction', 'xylem up; phloem both ways'], ['Answer', 'any two with both sides']] },
  qc: 'Why do companion cells contain many **mitochondria**?',
  notes: 'QUICK CHECK ANSWER: release energy (by respiration) (1) for (active) loading of sucrose into the sieve tubes / translocation (1).\nSpec 6.8.',
}), '6.8 Xylem and phloem');

// ======================= 15 TRANSPIRATION =======================
reg(D.contentSlide({
  title: 'Transpiration and stomata',
  subtitle: 'Specification 6.9 • moving water and minerals through the plant',
  tag: '6.9', caption: 'the transpiration stream: roots → xylem → leaves → air',
  draw: (s, p) => {
    plant(s, 2.2, 4.6, 2.6);
    box(s, 0.9, 4.6, 2.6, 1.0, 'E8D5B0', 'A88B63');
    arrow(s, 2.35, 4.4, 2.35, 2.3, C.blue, 3); label(s, 2.45, 3.3, 1.5, 'water up xylem', { size: 9.5, color: C.blue, align: 'left' });
    [[2.9, 1.9], [1.4, 2.3], [3.0, 2.8]].forEach(([x, y]) => { arrow(s, x, y, x + (x > 2.2 ? 0.45 : -0.45), y - 0.3, '7FA9C9', 1.5); });
    label(s, 0.7, 1.45, 3.0, 'water vapour evaporates', { size: 9.5, color: '2F5F8F', h: 0.3 });
    label(s, 0.95, 5.0, 2.5, 'water enters root hairs by osmosis', { size: 9.5, h: 0.5 });
    // stomata
    const sx = 5.0;
    label(s, 3.9, 1.5, 2.4, '**open** (day)', { size: 11 });
    oval(s, sx - 0.25, 2.5, 0.42, 1.1, 'B7E1A1', '35582A', { lw: 1.5 }); oval(s, sx + 0.25, 2.5, 0.42, 1.1, 'B7E1A1', '35582A', { lw: 1.5 });
    oval(s, sx, 2.5, 0.14, 0.6, C.white, '35582A');
    label(s, 3.9, 3.4, 2.4, '**closed** (night / dry)', { size: 11 });
    oval(s, sx - 0.13, 4.45, 0.3, 1.0, 'D9E8CE', '35582A', { lw: 1.5 }); oval(s, sx + 0.13, 4.45, 0.3, 1.0, 'D9E8CE', '35582A', { lw: 1.5 });
    label(s, 3.9, 5.1, 2.4, 'guard cells', { size: 10, italic: true });
  },
  head: 'How it works',
  lines: [
    '**Transpiration** is the loss of **water vapour** from leaves, mainly through the **stomata**.',
    'Water **evaporates** from cells inside the leaf and **diffuses** out. This **pulls** water up the **xylem** in a continuous column (the transpiration stream), carrying **mineral ions**.',
    '**Stomata** are pores controlled by **guard cells**: when the guard cells take in water they become **turgid** and the stoma **opens**; when they lose water they become **flaccid** and it **closes**.',
  ],
  worked: { head: 'Explain', q: 'Why do stomata usually close at night?',
    steps: [['Night', 'no light: no photosynthesis'], ['CO₂', 'no need to let CO₂ in'], ['Water', 'closing reduces water loss'], ['Answer', 'saves water when not photosynthesising']] },
  qc: 'Describe how guard cells **open** a stoma.',
  notes: 'QUICK CHECK ANSWER: guard cells take in water / become turgid (1); they curve / bend apart, opening the pore (1).\nSpec 6.9.',
}), '6.9 Transpiration and stomata');

// ======================= 16 TRANSLOCATION =======================
reg(D.contentSlide({
  title: 'Translocation',
  subtitle: 'Specification 6.10 • moving sucrose in the phloem',
  tag: '6.10', caption: 'sources and sinks',
  draw: (s, p) => {
    plant(s, 3.5, 4.4, 2.6);
    box(s, 1.5, 4.4, 4.0, 1.1, 'E8D5B0', 'A88B63');
    oval(s, 4.4, 5.0, 0.9, 0.55, 'E8C78A', '8A6A3A', { lw: 1.5 }); label(s, 4.0, 5.1, 2.0, 'storage organ (sink)', { size: 9.5, h: 0.3, align: 'left' });
    oval(s, 3.9, 1.75, 0.35, 0.35, 'F5B7B1', C.red); label(s, 4.15, 1.55, 2.2, 'growing tip / flower (sink)', { size: 9.5, h: 0.3, align: 'left' });
    label(s, 0.6, 2.75, 2.5, '**leaf** (source): sucrose made from glucose', { size: 10, h: 0.5, align: 'left' });
    arrow(s, 3.3, 2.9, 3.3, 4.6, C.red, 2.5); arrow(s, 3.7, 2.4, 3.8, 1.95, C.red, 2.5);
  },
  head: 'Key ideas',
  lines: [
    'Glucose made in leaves is converted to **sucrose** for transport.',
    '**Translocation** is the movement of **sucrose** through the **phloem** from where it is made or stored (**source**) to where it is used or stored (**sink**).',
    'It can go **up or down** the plant.',
    'It needs **energy** (from **companion cells**), so it is an **active** process.',
  ],
  worked: { head: 'Compare', q: 'Compare transpiration and translocation.',
    steps: [['Tissue', 'xylem vs phloem'], ['Substance', 'water and ions vs sucrose'], ['Direction', 'up only vs up and down'], ['Energy', 'passive vs needs energy']] },
  qc: 'In spring a potato tuber sends sucrose to new shoots. Is the tuber a **source** or a **sink**?',
  notes: 'QUICK CHECK ANSWER: source (1) (it is supplying sucrose to the growing shoots).\nSpec 6.10.',
}), '6.10 Translocation');

// ======================= 17 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 6.7–6.10 • transport in plants', [
  { q: 'Explain how root hair cells are adapted to absorb mineral ions.', marks: 3, ms: 'Long / large surface area (1); active transport against the concentration gradient (1); many mitochondria release energy (1).' },
  { q: 'Describe **two** ways xylem is adapted for transporting water.', marks: 2, ms: 'Any two: dead cells / no end walls form a continuous tube; lignin strengthens / stops collapse; no cytoplasm (1 each).' },
  { q: 'Explain why translocation is described as an active process.', marks: 2, ms: 'Requires energy (1); provided by respiration in companion cells (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 18 LEAF STRUCTURE =======================
reg(D.contentSlide({
  title: 'Leaf structure',
  subtitle: 'Specification 6.11 • adapted for photosynthesis and gas exchange',
  tag: '6.11', caption: 'cross-section through a leaf',
  draw: (s, p) => {
    const x0 = 0.75, W = 4.2;
    box(s, x0, 1.6, W, 0.12, 'F7E3A8', 'C9A227');
    for (let i = 0; i < 8; i++) box(s, x0 + i * W / 8, 1.72, W / 8, 0.3, 'F4FAF0', '6A9E58', { lw: 0.75 });
    for (let i = 0; i < 10; i++) { const x = x0 + i * W / 10; box(s, x + 0.02, 2.02, W / 10 - 0.04, 1.0, 'CFE6C0', '3E7A2E', { lw: 0.75 }); chloros(s, x + 0.02, 2.05, W / 10 - 0.04, 0.95, 5); }
    [[1.0, 3.35], [1.6, 3.55], [2.3, 3.3], [3.0, 3.6], [3.7, 3.35], [4.4, 3.55], [1.3, 3.95], [2.7, 3.95], [4.0, 3.95]].forEach(([x, y]) => { oval(s, x, y, 0.5, 0.32, 'DCEFD0', '3E7A2E', { lw: 0.75 }); });
    for (let i = 0; i < 8; i++) if (i !== 4) box(s, x0 + i * W / 8, 4.2, W / 8, 0.28, 'F4FAF0', '6A9E58', { lw: 0.75 });
    oval(s, x0 + 4 * W / 8 + 0.1, 4.34, 0.2, 0.28, 'B7E1A1', '35582A'); oval(s, x0 + 5 * W / 8 - 0.1, 4.34, 0.2, 0.28, 'B7E1A1', '35582A');
    box(s, x0, 4.48, W, 0.1, 'F7E3A8', 'C9A227');
    ball(s, 2.0, 3.75, 0.15, 'EAF3FB', '8A560A', 1.25);
    const cl = (y, t) => { line(s, x0 + W + 0.05, y, x0 + W + 0.3, y, C.grey, 1); label(s, x0 + W + 0.35, y - 0.15, 1.6, t, { size: 9.5, align: 'left', h: 0.3 }); };
    cl(1.66, 'waxy cuticle'); cl(1.87, 'upper epidermis'); cl(2.5, 'palisade mesophyll'); cl(3.5, 'spongy mesophyll'); cl(3.85, 'air spaces'); cl(4.34, 'stoma + guard cells');
    label(s, 0.75, 4.75, 2.5, 'xylem + phloem (vein)', { size: 9.5, h: 0.3, align: 'left' }); line(s, 1.5, 4.75, 2.0, 3.92, C.grey, 1);
    arrow(s, x0 + W / 2, 5.35, x0 + W / 2, 4.62, C.blue, 1.5); label(s, x0 + W / 2 + 0.1, 5.05, 2.0, 'CO₂ in', { size: 9.5, color: C.blue, align: 'left', h: 0.25 });
  },
  head: 'Adaptations',
  lines: [
    '**Broad, thin** leaf: large **surface area** for light; short **diffusion** distance for gases.',
    '**Transparent epidermis** lets light through; **waxy cuticle** reduces water loss.',
    '**Palisade cells**: packed with **chloroplasts**, near the top to absorb most light.',
    '**Spongy mesophyll** with **air spaces**: CO₂ diffuses to cells; large internal surface area.',
    '**Stomata** let CO₂ in and O₂ out; **veins** bring water and take away sucrose.',
  ],
  worked: { head: 'Stomatal density', q: '30 stomata are counted in an area of 0.1 mm². Calculate stomata per mm².',
    steps: [['Divide', '30 ÷ 0.1'], ['Answer', '300 per mm²']], size: 11 },
  workedH: 1.4,
  qc: 'Why are most stomata on the **lower** surface of a leaf?',
  notes: 'QUICK CHECK ANSWER: lower surface is cooler / shaded (1); so less water is lost by evaporation (1).\nSpec 6.11.',
}), '6.11 Leaf structure');

// ======================= 19 FACTORS & POTOMETER =======================
reg(D.contentSlide({
  title: 'Factors affecting the rate of water uptake',
  subtitle: 'Specification 6.12 • light intensity, air movement and temperature',
  tag: '6.12', caption: 'a bubble potometer: the bubble moves as the shoot takes up water',
  draw: (s, p) => {
    polyline(s, [[1.2, 2.2], [1.2, 3.3], [5.8, 3.3]], '777777', 5);
    line(s, 1.2, 3.3, 5.8, 3.3, 'D6EAF8', 3);
    ball(s, 4.2, 3.3, 0.07, C.white, '333333', 1); label(s, 3.8, 3.4, 0.9, 'air bubble', { size: 9.5, h: 0.25 });
    for (let i = 0; i <= 10; i++) line(s, 2.2 + i * 0.32, 3.45, 2.2 + i * 0.32, 3.55 + (i % 5 === 0 ? 0.08 : 0), '555555', 0.75);
    label(s, 2.2, 3.7, 3.2, 'scale (mm)', { size: 9.5, h: 0.25 });
    box(s, 0.95, 1.9, 0.5, 0.35, '777777', '444444');
    plant(s, 1.2, 1.9, 0.7);
    box(s, 5.6, 3.15, 0.5, 0.9, 'EAF3FB', '777777'); label(s, 5.3, 4.1, 1.1, 'beaker of water', { size: 9.5, h: 0.4 });
    arrow(s, 5.2, 2.85, 3.0, 2.85, C.blue, 1.5); label(s, 3.0, 2.5, 2.2, 'bubble moves this way', { size: 9.5, color: C.blue, h: 0.3 });
    label(s, 0.7, 4.65, 5.6, 'distance moved ÷ time = rate of water uptake', { size: 11, bold: true, h: 0.35 });
  },
  head: 'Factors',
  lines: [
    '**Light intensity ↑:** stomata **open** wider for photosynthesis → more water vapour lost → faster uptake.',
    '**Temperature ↑:** water molecules have more **kinetic energy** → faster **evaporation** and **diffusion**.',
    '**Air movement ↑:** wind removes water vapour from around the leaf → **steeper concentration gradient** → faster diffusion.',
    '**Humidity ↑** (extra): smaller gradient → slower transpiration.',
  ],
  worked: { head: 'Explain', q: 'Why does a fan increase transpiration?',
    steps: [['Air', 'moving air carries vapour away'], ['Gradient', 'lower concentration outside the leaf'], ['Diffusion', 'water vapour diffuses out faster'], ['Answer', 'more water lost, so faster uptake']] },
  qc: 'Explain why a plant loses **less** water on a cold, still, dark night.',
  notes: 'QUICK CHECK ANSWER: stomata closed in the dark (1); low temperature slows evaporation / diffusion (1); still air means vapour builds up, small concentration gradient (1).\nSpec 6.12. A potometer measures water uptake, which is roughly equal to the water lost.',
}), '6.12 Factors affecting water uptake');

// ======================= 20 TRANSPIRATION CALCS =======================
{
  const s = D.contentHeader('Calculating the rate of transpiration', 'Specification 6.13 • rate calculations', { tag: '6.13' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'In a potometer the bubble moves **36 mm** in **6 minutes**. The capillary radius is **0.5 mm**.',
    [['Distance rate', '36 ÷ 6 = **6 mm/min**'], ['Volume', 'πr² × d = π × 0.5² × 36'], ['=', '**28.3 mm³** in 6 min'], ['Answer', '28.3 ÷ 6 = **4.71 mm³/min**']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A bubble moves **48 mm** in **4 min**. Calculate the rate in mm/min.',
    '**2** The capillary in Q1 has a radius of **0.4 mm**. Calculate the volume of water taken up per minute.',
    '**3** A potted plant falls from **180 g** to **171 g** in **6 hours**. Calculate the rate of water loss in g/h.',
    '**4** With a fan the rate rose from **4.0** to **6.0 mm/min**. Calculate the % increase.',
  ], { size: 13.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'A plant loses **12 g** of water in **24 hours**. Calculate the rate in g per hour.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 12 mm/min. 2) π × 0.4² × 48 ÷ 4 = 6.03 mm³/min. 3) 9 ÷ 6 = 1.5 g/h. 4) 2.0 ÷ 4.0 × 100 = 50%.\nQUICK CHECK: 0.5 g/h.\nSpec 6.13.');
  reg(s, '6.13 Transpiration rate calculations');
}

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 6.11–6.13 • leaves and transpiration', [
  { q: 'Explain how the palisade layer is adapted for photosynthesis.', marks: 2, ms: 'Many chloroplasts (1); near the upper surface to absorb most light (1).' },
  { q: 'Explain how an increase in temperature affects the rate of transpiration.', marks: 2, ms: 'Rate increases (1); water molecules have more kinetic energy, so faster evaporation / diffusion (1).' },
  { q: 'A bubble moves 30 mm in 5 minutes. Calculate the rate of water uptake.', marks: 1, ms: '6 mm/min (1).' },
  { q: 'Explain why the potometer measures water uptake rather than transpiration exactly.', marks: 2, ms: 'Some water is used by the plant (photosynthesis / turgor) (1); so not all water taken up is lost by transpiration (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 EXTREME ENVIRONMENTS (B) =======================
reg(D.contentSlide({
  title: 'Plants in extreme environments',
  subtitle: 'Specification 6.14B • adaptations to deserts and other harsh places',
  tag: '6.14B', p: true, caption: 'a cactus: adapted to hot, dry deserts',
  draw: (s, p) => {
    box(s, 0.75, 5.0, 5.5, 0.7, 'F2D49B', 'C9A227');
    box(s, 2.8, 2.0, 0.9, 3.0, '6DBE5A', '35582A', { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 2 });
    box(s, 2.0, 3.0, 0.5, 1.3, '6DBE5A', '35582A', { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 2 }); line(s, 2.5, 3.9, 2.8, 3.9, '35582A', 6);
    box(s, 4.0, 2.6, 0.5, 1.2, '6DBE5A', '35582A', { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 2 }); line(s, 3.7, 3.5, 4.0, 3.5, '35582A', 6);
    for (let i = 0; i < 8; i++) { const y = 2.2 + i * 0.35; line(s, 2.8, y, 2.65, y - 0.08, '555555', 1); line(s, 3.7, y, 3.85, y - 0.08, '555555', 1); }
    polyline(s, [[3.25, 5.0], [2.0, 5.4], [1.0, 5.5]], 'A0784A', 2); polyline(s, [[3.25, 5.0], [4.6, 5.35], [5.9, 5.5]], 'A0784A', 2); line(s, 3.25, 5.0, 3.25, 5.65, 'A0784A', 2);
    callout(s, 4.6, 2.1, 1.6, 'spines (leaves)', 3.85, 2.35, '555555', { size: 10 });
    callout(s, 0.8, 2.2, 1.2, 'thick stem stores water', 2.8, 2.6, '35582A', { size: 10, h: 0.45 });
    callout(s, 4.7, 4.6, 1.5, 'shallow, wide roots', 4.6, 5.35, 'A0784A', { size: 10 });
  },
  head: 'Adaptations',
  lines: [
    '**Deserts:** leaves reduced to **spines** (small surface area: less water loss; protection); **thick waxy cuticle**; **sunken stomata** or few stomata, often surrounded by **hairs** (trap moist air); stomata open at **night**; **stems** store water and photosynthesise.',
    '**Roots:** **shallow and wide** to absorb rain quickly, or very **deep** to reach groundwater.',
    '**Other extremes:** marram grass has **rolled leaves**; plants in **salty** soils store salt in vacuoles.',
  ],
  worked: { head: 'Explain', q: 'How do hairs around sunken stomata reduce water loss?',
    steps: [['Trap', 'moist air is trapped near the stomata'], ['Gradient', 'smaller concentration gradient'], ['Diffusion', 'water vapour diffuses out more slowly'], ['Answer', 'less water lost by transpiration']] },
  qc: 'Explain why cactus leaves are reduced to **spines**.',
  notes: 'QUICK CHECK ANSWER: reduces surface area (1) so less water is lost by transpiration (1); also deters animals.\nSpec 6.14B (biology only).',
}), '6.14B Extreme environments (BIOLOGY ONLY)');

// ======================= 23 AUXINS (B) =======================
reg(D.contentSlide({
  title: 'Plant hormones: auxins and tropisms',
  subtitle: 'Specification 6.15B • phototropism and gravitropism',
  tag: '6.15B', p: true, caption: 'shoot bending towards light (left); root growing down (right)',
  draw: (s, p) => {
    ball(s, 0.95, 1.95, 0.3, 'FFE066', 'E0A040', 1.5);
    for (let i = 0; i < 3; i++) arrow(s, 1.3, 1.85 + i * 0.25, 1.85, 2.0 + i * 0.3, 'E0A040', 1.25);
    polyline(s, [[2.6, 5.2], [2.6, 3.6], [2.45, 2.8], [2.1, 2.2]], '3E8E41', 8);
    [[2.75, 3.3], [2.7, 3.0], [2.6, 2.6], [2.8, 3.6]].forEach(([x, y]) => ball(s, x, y, 0.06, C.red, C.red));
    label(s, 2.9, 2.45, 1.2, 'auxin on the shaded side', { size: 9.5, color: C.red, h: 0.45, align: 'left' });
    label(s, 1.2, 5.3, 2.6, '**phototropism**: shoot grows towards light', { size: 10, h: 0.45 });
    line(s, 4.0, 2.0, 5.6, 2.0, '3E8E41', 6); polyline(s, [[5.6, 2.0], [5.95, 2.3], [6.05, 3.0], [6.05, 3.8]], 'A0784A', 6);
    [[5.65, 2.25], [5.85, 2.5], [5.85, 2.8]].forEach(([x, y]) => ball(s, x, y, 0.06, C.red, C.red));
    arrow(s, 5.0, 3.0, 5.0, 4.2, C.grey, 1.5); label(s, 4.2, 3.4, 0.8, 'gravity', { size: 9.5, h: 0.25 });
    label(s, 4.2, 4.3, 2.2, '**gravitropism**: roots grow down; shoots grow up', { size: 10, h: 0.6 });
  },
  head: 'How auxin works',
  lines: [
    '**Auxins** are plant hormones made in **shoot and root tips**; they control **growth**.',
    '**Phototropism:** auxin moves to the **shaded side** of a shoot; in shoots, auxin **increases** cell **elongation**, so the shaded side grows more and the shoot **bends towards the light**.',
    '**Gravitropism (geotropism):** auxin collects on the **lower side**. In shoots this side grows more (shoot bends **up**); in **roots** auxin **inhibits** elongation, so the upper side grows more and the root bends **down**.',
  ],
  worked: { head: 'Explain', q: 'Why is it useful for roots to grow downwards?',
    steps: [['Anchor', 'holds the plant firmly'], ['Water', 'reaches water in the soil'], ['Minerals', 'absorbs mineral ions'], ['Answer', 'anchorage and uptake of water and ions']] },
  qc: 'Explain why a shoot bends towards light.',
  notes: 'QUICK CHECK ANSWER: auxin moves to the shaded side (1); stimulates cell elongation there (1); shaded side grows faster, so shoot bends towards light (1).\nSpec 6.15B (biology only).',
}), '6.15B Auxins (BIOLOGY ONLY)');

// ======================= 24 COMMERCIAL USES (B) =======================
{
  const s = D.contentHeader('Using plant hormones', 'Specification 6.16B • auxins, gibberellins and ethene', { tag: '6.16B', p: true });
  const rows = [[HDR('Hormone'), HDR('Use'), HDR('How it works')], ...[
    ['Auxins', 'selective weedkillers', 'make broad-leaved weeds grow too fast and die; narrow-leaved crops (cereals, grass) unaffected'],
    ['Auxins', 'rooting powder', 'cuttings dipped in auxin grow roots quickly: many identical plants'],
    ['Gibberellins', 'seed germination', 'end seed dormancy so seeds germinate at the same time (e.g. barley for brewing)'],
    ['Gibberellins', 'fruit and flower size', 'larger fruit (grapes); flowering at any time'],
    ['Gibberellins / auxins', 'seedless fruit', 'fruit develops without fertilisation'],
    ['Ethene (gas)', 'fruit ripening', 'fruit picked unripe and transported, then ripened with ethene before sale'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i, { bold: true, color: C.blue }), tcell(c, i)])];
  table(s, rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.3, 2.6, 7.53], rowH: 0.48, fontSize: 11 });
  D.workedSteps(s, 0.45, 5.15, 12.43, 1.1, 'Evaluate', '', [['Ripening', 'unripe fruit is firm, so less damage in transport; ripened on arrival: less waste']], { size: 12 });
  D.quickCheck(s, 'Explain why a farmer can spray auxin weedkiller on a **wheat** field without killing the wheat.');
  D.notes(s, 'QUICK CHECK ANSWER: the weedkiller only affects broad-leaved plants / is selective (1); wheat is narrow-leaved so is not affected (1).\nSpec 6.16B (biology only).');
  reg(s, '6.16B Uses of plant hormones (BIOLOGY ONLY)');
}

// ======================= 25 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 6.14B–6.16B • adaptations and hormones', [
  { q: 'Give **two** adaptations of desert plants that reduce water loss.', marks: 2, ms: 'Any two: spines / small leaves; thick waxy cuticle; sunken stomata / few stomata; hairs; stomata open at night (1 each).' },
  { q: 'Explain how auxin causes a root to grow downwards.', marks: 3, ms: 'Auxin collects on the lower side (1); in roots auxin inhibits elongation (1); upper side grows more so root bends down (1).' },
  { q: 'Give **one** use of gibberellins and **one** use of ethene.', marks: 2, ms: 'Gibberellins: germination / larger fruit / flowering / seedless fruit (1); ethene: ripening fruit (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 26 KEY WORDS =======================
reg(D.keyWords([
  ['Photosynthesis', 'CO₂ + water → glucose + oxygen, using light energy.'],
  ['Endothermic', 'Takes in energy from the surroundings.'],
  ['Limiting factor', 'The factor in shortest supply that limits the rate.'],
  ['Inverse square law', 'Light intensity ∝ 1 ÷ distance² (HT).'],
  ['Producer', 'Organism that makes its own food by photosynthesis.'],
  ['Root hair cell', 'Long cell with large surface area for absorption.'],
  ['Xylem', 'Dead, lignified tubes carrying water and minerals.'],
  ['Phloem', 'Sieve tubes and companion cells carrying sucrose.'],
  ['Transpiration', 'Loss of water vapour from leaves through stomata.'],
  ['Translocation', 'Movement of sucrose in the phloem.'],
  ['Stoma', 'Pore in the leaf surface for gas exchange.'],
  ['Guard cells', 'Cells that open and close a stoma.'],
  ['Palisade', 'Leaf layer packed with chloroplasts.'],
  ['Potometer', 'Apparatus measuring water uptake by a shoot.'],
  ['Auxin', 'Plant hormone controlling cell elongation.'],
  ['Phototropism', 'Growth response towards or away from light.'],
], { notes: 'Cover-and-recall. HT: inverse square law. Biology-only: auxin, phototropism.' }), 'Summary: key words');

// ======================= 27 FULL QUESTION =======================
reg(D.fullQuestion('A student investigates how light intensity affects the rate of photosynthesis in pondweed, then measures transpiration in a leafy shoot.', [
  { l: 'a', q: 'Name the gas in the bubbles released by the pondweed.', marks: 1, ms: 'Oxygen (1).' },
  { l: 'b', q: 'Give **two** variables the student should control.', marks: 2, ms: 'Any two: temperature; CO₂ concentration; same pondweed; time interval (1 each).' },
  { l: 'c', q: 'The lamp is moved from 10 cm to 30 cm. Calculate how the light intensity changes.', marks: 2, ht: true, ms: 'Distance × 3, so intensity × 1/3² (1); = 1/9 (1).' },
  { l: 'd', q: 'Explain why the rate of photosynthesis stops increasing at high light intensity.', marks: 2, ms: 'Another factor becomes limiting (1); e.g. CO₂ concentration or temperature (1).' },
  { l: 'e', q: 'In a potometer the bubble moves 30 mm in 5 minutes. Calculate the rate of water uptake.', marks: 2, ms: '30 ÷ 5 (1); 6 mm/min (1).' },
  { l: 'f', q: 'Explain how moving air increases the rate of transpiration.', marks: 2, ms: 'Removes water vapour from around the leaf (1); steeper concentration gradient, faster diffusion (1).' },
  { l: 'g', q: 'Describe the role of xylem in transpiration.', marks: 2, ms: 'Carries water and mineral ions (1); from roots to leaves in a continuous column (1).' },
], 13, { subtitle: 'Specification 6.3, 6.5–6.6, 6.8–6.9, 6.12–6.13 • answer every part • 13 marks' }), 'Full question');

// ======================= 28–29 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the cells that control the opening and closing of stomata.', marks: 1, ms: 'Guard cells (1).' },
  { n: '2', q: 'A student counts **24, 26** and **22** bubbles per minute. Calculate the mean.', marks: 2, ms: '72 ÷ 3 (1); 24 bubbles per minute (1).' },
  { n: '3', q: 'Describe **two** differences between xylem and phloem.', marks: 2, ms: 'Any two: dead vs living; water/ions vs sucrose; up only vs both ways; lignin vs sieve plates (1 each).' },
  { n: '4', q: 'A bubble moves **20 mm** in **4 minutes**. Calculate the rate of water uptake.', marks: 2, ms: '20 ÷ 4 (1); 5 mm/min (1).' },
  { n: '5', q: 'Explain why rooting powder is useful to gardeners.', marks: 3, ms: 'Contains auxin (1); cuttings develop roots quickly (1); many identical plants produced (1).' },
  { n: '6', q: 'Explain how the structure of a leaf is adapted for photosynthesis.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Broad / flat: large surface area to absorb light.',
    'Thin: short diffusion distance for CO₂ to reach cells.',
    'Transparent epidermis / cuticle lets light through to the palisade.',
    'Palisade cells packed with chloroplasts near the upper surface absorb most light.',
    'Spongy mesophyll with air spaces allows CO₂ to diffuse to cells; large internal surface area.',
    'Stomata let CO₂ in (and O₂ out); guard cells control opening.',
    'Veins: xylem brings water; phloem removes sucrose.',
  ], 'Level 3 answers link each structure to how it helps photosynthesis (light absorption, gas exchange, water supply).');
}
D.homework('Answer every question. Show your working for calculations.', HW, 16);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7);
assert(D.slideNo >= 28 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T6_PlantStructures.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
function waterLegend(s) {
  ball(s, 4.75, 1.85, 0.05, '5B9BD5', '2F5F8F'); label(s, 4.85, 1.73, 0.8, 'water', { size: 9, align: 'left', h: 0.25 });
  ball(s, 5.5, 1.85, 0.07, '8E44AD', '5E2D73'); label(s, 5.6, 1.73, 0.7, 'ions', { size: 9, align: 'left', h: 0.25 });
}
