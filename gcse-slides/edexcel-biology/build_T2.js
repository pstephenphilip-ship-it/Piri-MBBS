// build_T2.js — Edexcel GCSE Biology 1BI0 Topic 2 Cells and control (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T2.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 2,
  title: 'Cells and control',
  shortTitle: 'T2',
  subtitle: 'Mitosis, growth, stem cells, the brain, the nervous system and the eye',
  specRange: '2.1–2.17B',
  pOnly: [],
  paper: 'Paper 1',
  keywords: ['Mitosis', 'Growth', 'Stem cells', 'Brain', 'Neurones', 'The eye'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
calc('cells after 3 cycles (72 h / 24 h)', 2 ** (72 / 24), 8);
calc('cells after 10 cycles', 2 ** 10, 1024);
calc('mitosis % 30/300', 30 / 300 * 100, 10, 1e-9);
calc('time in mitosis 10% of 20 h', 0.10 * 20, 2, 1e-12);
calc('YT % 48/400', 48 / 400 * 100, 12, 1e-9);
calc('YT time 12% of 25 h', 0.12 * 25, 3, 1e-12);
calc('YT cells after 5 cycles', 2 ** 5, 32);
calc('YT cycles to exceed 1000 cells', Math.ceil(Math.log2(1000)), 10);
calc('QC 2^6', 2 ** 6, 64);
// percentile chart (model data, boys mass in kg)
const P50 = [[0, 3.5], [2, 5.6], [4, 7.0], [6, 7.9], [8, 8.6], [10, 9.2], [12, 9.6]];
const P91 = P50.map(([a, m]) => [a, +(m * 1.13).toFixed(2)]);
const P09 = P50.map(([a, m]) => [a, +(m * 0.88).toFixed(2)]);
calc('9th at 6 months', P09[3][1], 6.95, 1e-9);
calc('91st at 6 months', P91[3][1], 8.93, 1e-9);
calc('9th at 12 months', P09[6][1], 8.45, 1e-9);
const BABY = [[0, 3.6], [2, 5.4], [4, 6.6], [6, 7.0], [8, 7.4]];
calc('% increase 3.5 → 7.0', (7.0 - 3.5) / 3.5 * 100, 100, 1e-9);
calc('baby % increase 3.6 → 7.4 (3 s.f.)', sf((7.4 - 3.6) / 3.6 * 100, 3), 106, 1e-9);
calc('QC % increase 3.2 → 8.0', (8.0 - 3.2) / 3.2 * 100, 150, 1e-9);
// nervous system
calc('impulse speed 0.9 m / 0.009 s', 0.9 / 0.009, 100, 1e-9);
const RT = [0.21, 0.19, 0.23, 0.20, 0.22];
calc('mean reaction time', RT.reduce((a, b) => a + b) / RT.length, 0.21, 1e-12);
calc('YT impulse 1.2 m / 0.02 s', 1.2 / 0.02, 60, 1e-9);
const RT2 = [0.30, 0.28, 0.35, 0.27];
calc('YT mean RT2', RT2.reduce((a, b) => a + b) / RT2.length, 0.30, 1e-12);
calc('FQ mitosis % 18/120', 18 / 120 * 100, 15, 1e-9);
calc('FQ time 15% of 22 h', 0.15 * 22, 3.3, 1e-12);
calc('HW cells after 4 cycles', 2 ** 4, 16);

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
function neurone(s, x, y, len, o = {}) {
  const col = o.col || '2F5F8F';
  const bx = o.bodyAt === 'mid' ? x + len * 0.45 : x;
  ball(s, bx + 0.25, y, 0.25, o.body || 'DCE6F5', col, 1.5);
  ball(s, bx + 0.25, y, 0.09, NUC[0], NUC[1], 0.75);
  [[-0.35, -0.25], [-0.4, 0.05], [-0.3, 0.3], [0.1, -0.4], [0.15, 0.38]].forEach(([dx, dy]) => line(s, bx + 0.25 + dx * 0.55, y + dy * 0.6, bx + 0.25 + dx, y + dy, col, 1.25));
  line(s, x + 0.5, y, x + len, y, col, 2.5);
  if (o.myelin !== false) for (let mx = x + 0.7; mx < x + len - 0.5; mx += 0.55) { if (o.bodyAt === 'mid' && Math.abs(mx - bx) < 0.5) continue; box(s, mx, y - 0.09, 0.42, 0.18, 'FFF3B0', 'C9A227', { shape: SH.ROUNDED_RECTANGLE, r: 0.5, lw: 0.75 }); }
  const ex = x + len;
  [[0.3, -0.25], [0.35, 0], [0.3, 0.25]].forEach(([dx, dy]) => { line(s, ex, y, ex + dx, y + dy, col, 1.25); ball(s, ex + dx, y + dy, 0.05, col); });
}
// brain side view (facing left)
function brain(s, cx, cy, k = 1) {
  oval(s, cx, cy - 0.15 * k, 3.3 * k, 2.2 * k, 'F4C7C3', 'A65A55', { lw: 2 });
  polyline(s, [[cx - 1.1 * k, cy - 0.6 * k], [cx - 0.6 * k, cy - 0.35 * k], [cx - 0.1 * k, cy - 0.75 * k], [cx + 0.5 * k, cy - 0.4 * k], [cx + 1.0 * k, cy - 0.7 * k]], 'A65A55', 1);
  polyline(s, [[cx - 1.2 * k, cy + 0.15 * k], [cx - 0.5 * k, cy + 0.0 * k], [cx + 0.1 * k, cy + 0.25 * k], [cx + 0.6 * k, cy + 0.05 * k]], 'A65A55', 1);
  oval(s, cx + 0.95 * k, cy + 0.95 * k, 1.15 * k, 0.7 * k, 'C6DDB4', '5E8A4A', { lw: 1.75 });
  for (let i = -2; i <= 2; i++) line(s, cx + 0.55 * k, cy + (0.95 + i * 0.11) * k, cx + 1.4 * k, cy + (0.95 + i * 0.11) * k, '5E8A4A', 0.5);
  box(s, cx + 0.15 * k, cy + 0.75 * k, 0.38 * k, 1.25 * k, 'B9D3EE', '2F5F8F', { lw: 1.75, shape: SH.ROUNDED_RECTANGLE, r: 0.3 });
}
function head(s, cx, cy, k = 1, fill = 'D9D9D9') {
  oval(s, cx, cy, 2.0 * k, 2.4 * k, fill, '555555', { lw: 2 });
  poly(s, [[cx - 1.0 * k, cy - 0.1 * k], [cx - 1.2 * k, cy + 0.2 * k], [cx - 0.98 * k, cy + 0.3 * k]], fill, '555555', { lw: 1.5 });
}
// eye cross-section; light enters from the left
function eye(s, cx, cy, r, o = {}) {
  ball(s, cx, cy, r, 'FFFFFF', '555555', 2.5);
  ball(s, cx, cy, r - 0.1, 'F6FAFD', null);
  s.addShape(SH.ARC, { x: cx - r + 0.03, y: cy - r + 0.03, w: 2 * r - 0.06, h: 2 * r - 0.06, angleRange: [300, 60], line: { color: 'C8414C', width: 5 } });
  oval(s, cx - r + 0.08, cy, 0.62, 1.15 * r, 'F6FAFD', '5B87B5', { lw: 2.5 });
  line(s, cx - r * 0.72, cy - r * 0.7, cx - r * 0.72, cy - r * 0.25, '7A5A2E', 5);
  line(s, cx - r * 0.72, cy + r * 0.25, cx - r * 0.72, cy + r * 0.7, '7A5A2E', 5);
  oval(s, cx - r * 0.55, cy, r * 0.28, r * 0.62, 'DDEBF7', '2F5F8F', { lw: 1.5 });
  box(s, cx + r - 0.05, cy + r * 0.05, r * 0.7, r * 0.22, 'F0D3A0', 'B5782E', { lw: 1.25 });
}
// arrow-free ray helper
const ray = (s, pts, col = 'E0A040') => polyline(s, pts, col, 1.5);

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Cells and control',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • mitosis, growth, stem cells, the nervous system and the eye` },
    { icon: 'H', text: 'Higher & Foundation in one deck • BIOLOGY ONLY slides are marked' },
    { icon: '2', text: 'Topic 2 of 9 • assessed on Paper 1' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 2 Cells and control. Paper 1. Biology only (BIOLOGY ONLY pill, not in Combined Science 1SC0): 2.10B–2.12B (brain), 2.15B–2.17B (eye). No Higher-only statements and no Core Practical in this topic (medium confidence: see SPEC_T2.md).',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '2.1–2.3', text: 'Describe **mitosis** and the **cell cycle**; explain why mitosis makes **identical diploid** cells.' },
  { code: '2.4', text: 'Describe **cancer** as **uncontrolled cell division**.' },
  { code: '2.5–2.7', text: 'Describe **growth** and **differentiation**; use **percentile charts**.' },
  { code: '2.8–2.9', text: 'Describe **stem cells** and **meristems**; discuss their **benefits and risks**.' },
  { code: '2.10B–2.12B', text: 'Describe the **brain**; explain **CT and PET** scans and limits of treatment.' },
  { code: '2.13', text: 'Explain **neurones**, **synapses**, receptors and effectors.' },
  { code: '2.14', text: 'Explain the **reflex arc**.' },
  { code: '2.15B–2.17B', text: 'Explain the **eye**; describe eye **defects** and how they are **treated**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'B suffix = biology only (not in Combined Science 1SC0): 2.10B, 2.11B, 2.12B, 2.15B, 2.16B, 2.17B. No HT statements believed in Topic 2.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 2 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['2.1–2.4', 'Mitosis, the cell cycle and cancer', 'BOTH COURSES'],
    ['2.5–2.7', 'Growth, differentiation, percentile charts', 'BOTH COURSES'],
    ['2.8–2.9', 'Stem cells and meristems', 'BOTH COURSES'],
    ['2.10B–2.12B', 'The brain; CT and PET; treatment limits', 'BIOLOGY ONLY'],
    ['2.13', 'Neurones, synapses, receptors, effectors', 'BOTH COURSES'],
    ['2.14', 'The reflex arc', 'BOTH COURSES'],
    ['2.15B–2.17B', 'The eye; defects and treatments', 'BIOLOGY ONLY'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 2\nCells and control', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 cells • Topic 3 meiosis • Topic 7 hormones and homeostasis', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 2 is tested on **Paper 1** (1 h 45 min, 100 marks).',
      'Combined Science 1SC0 tests the statements **without** a B.',
      'Maths: **2ⁿ** cell numbers, **percentages**, **percentile charts**, **speed = distance ÷ time**.',
      'No Core Practical in this topic.',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: the brain (2.10B–2.12B) and the eye (2.15B–2.17B). Combined classes skip these.',
      'No HT-only statements are believed to be in Topic 2.',
      'Higher students should push the **explain** questions and the 6-mark answer.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Biology-only statements (not in 1SC0): 2.10B, 2.11B, 2.12B, 2.15B, 2.16B, 2.17B. Combined Science route: skip the brain slides (19–22) and the eye slides (29–31). Check the bold H markers against the Pearson spec PDF.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • cells', q: 'Which part of a cell contains the **genetic material**?' },
  { from: 'Topic 1 • cells', q: 'Name the cell structure where **proteins** are made.' },
  { from: 'Topic 1 • cells', q: 'What does **haploid** mean? Which cells are haploid?' },
  { from: 'Topic 1 • microscopy', q: 'Calculate the magnification: image **30 mm**, real size **0.01 mm**.' },
  { from: 'KS3 • body', q: 'Name **two** organs in the **nervous system**.' },
  { from: 'KS3 • light', q: 'Which part of the eye **focuses** light?' },
], { subtitle: 'Recall from Topic 1 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Nucleus.\n2. Ribosomes.\n3. One set of chromosomes (23 in humans); gametes (sperm and egg).\n4. 30 ÷ 0.01 = × 3000.\n5. Brain, spinal cord (also nerves, eyes etc.).\n6. Lens (and cornea).' }), 'Retrieval starter');
calc('starter mag 30/0.01', 30 / 0.01, 3000, 1e-9);

// ======================= 5 CHROMOSOMES & CELL CYCLE =======================
reg(D.contentSlide({
  title: 'Chromosomes and the cell cycle',
  subtitle: 'Specification 2.1 • cells grow, copy their DNA, then divide',
  tag: '2.1', caption: 'the cell cycle (not to scale: interphase is the longest stage)',
  draw: (s, p) => {
    const cx = 3.5, cy = 3.55, R = 1.75;
    s.addShape(SH.PIE, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, angleRange: [270, 198], fill: { color: 'CFE6D6' }, line: { color: C.white, width: 2 } });
    s.addShape(SH.PIE, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, angleRange: [198, 252], fill: { color: 'F7D9A8' }, line: { color: C.white, width: 2 } });
    s.addShape(SH.PIE, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, angleRange: [252, 270], fill: { color: 'F2B8BC' }, line: { color: C.white, width: 2 } });
    ball(s, cx, cy, 0.75, C.panel, C.panel);
    label(s, cx - 0.7, cy - 0.25, 1.4, '**one cell\ncycle**', { size: 11, h: 0.5 });
    label(s, cx + 0.45, cy + 0.25, 1.3, '**Interphase**', { size: 12, color: '2E7D4F' });
    label(s, cx - 1.75, cy - 0.85, 1.0, '**Mitosis**', { size: 11.5, color: 'A4561C' });
    label(s, cx - 0.95, cy - 1.55, 1.2, '**Cytokinesis**', { size: 10, color: C.red });
    label(s, 0.7, 5.45, 5.6, 'Interphase: the cell **grows**, makes more **organelles** and **copies its DNA**.', { size: 10.5, h: 0.4 });
    xchrom(s, 5.85, 1.75, CHR[0], 1.4); label(s, 5.1, 2.05, 1.5, 'copied chromosome (2 chromatids)', { size: 9, h: 0.45, color: C.grey });
  },
  head: 'Key facts',
  lines: [
    'Chromosomes are long molecules of **DNA** found in the **nucleus**. They carry **genes**.',
    'Human body cells are **diploid**: **46** chromosomes in **23 pairs**.',
    'Before a cell divides, each chromosome is **copied**, giving an X shape (two identical **chromatids**).',
    'The **cell cycle** = interphase → mitosis → cytokinesis.',
  ],
  worked: { head: 'Cell numbers', q: 'A cell divides every 24 hours. How many cells are there after 72 hours?',
    steps: [['Cycles', '72 ÷ 24 = 3 cycles'], ['Rule', 'cells = 2ⁿ'], ['Work', '2³ = 2 × 2 × 2'], ['Answer', '8 cells']] },
  qc: 'What happens to the DNA during **interphase**? How many chromosomes are in a human skin cell?',
  notes: 'QUICK CHECK ANSWER: the DNA is copied / replicated (1); 46 (1).\nSpec 2.1. The pie proportions are illustrative. Cell numbers checked: 2³ = 8.',
}), '2.1 Chromosomes and the cell cycle');

// ======================= 6 STAGES OF MITOSIS =======================
reg(D.contentSlide({
  title: 'The stages of mitosis',
  subtitle: 'Specification 2.1 • four chromosomes shown for clarity (humans have 46)',
  tag: '2.1', caption: 'red and blue = the two chromosomes of each pair',
  draw: (s, p) => {
    const st = [['inter', 'Interphase'], ['pro', 'Prophase'], ['meta', 'Metaphase'], ['ana', 'Anaphase'], ['telo', 'Telophase'], ['cyto', 'Cytokinesis']];
    st.forEach(([k, n], i) => {
      const cx = 1.5 + (i % 3) * 2.0, cy = 2.3 + Math.floor(i / 3) * 2.15;
      mitosisStage(s, k, cx, cy);
      label(s, cx - 0.95, cy + 0.78, 1.9, `**${i + 1} ${n}**`, { size: 11.5 });
      if (i % 3 < 2) arrow(s, cx + 0.92, cy, cx + 1.08, cy, C.ink, 1.5);
    });
  },
  head: 'What happens',
  lines: [
    '**Prophase:** chromosomes **condense** (shorten, thicken); the **nuclear membrane breaks down**.',
    '**Metaphase:** chromosomes **line up** across the **middle** of the cell; spindle fibres attach.',
    '**Anaphase:** spindle fibres **pull the chromatids apart** to opposite **poles**.',
    '**Telophase:** a **new nuclear membrane** forms around each set.',
    '**Cytokinesis:** the **cytoplasm and membrane divide**: two cells.',
  ],
  worked: { head: 'Memory aid', q: 'Put the stages in order: "I Picked My Apples To Cook".',
    steps: [['I', 'Interphase'], ['P M A T', 'Prophase, Metaphase, Anaphase, Telophase'], ['C', 'Cytokinesis']], size: 11 },
  workedH: 1.75,
  qc: 'In which stage do the chromosomes **line up** across the middle of the cell?',
  notes: 'QUICK CHECK ANSWER: metaphase (1).\nSpec 2.1. Students must name the stages in order and describe each. Interphase is part of the cell cycle but is not a stage of mitosis itself.',
}), '2.1 Stages of mitosis');

// ======================= 7 IMPORTANCE / OUTCOME =======================
reg(D.contentSlide({
  title: 'Why mitosis matters',
  subtitle: 'Specification 2.2–2.3 • two genetically identical diploid cells',
  tag: '2.2–2.3', caption: 'one diploid parent cell → two identical diploid daughter cells',
  draw: (s, p) => {
    cellOut(s, 3.5, 2.2, 1.6, 1.3); ball(s, 3.5, 2.2, 0.4, NUC[0], NUC[1], 1);
    [CHR[0], CHR[1], CHR[0], CHR[1]].forEach((c, i) => chromatid(s, 3.29 + i * 0.14, 2.2, c, 0.9));
    label(s, 4.35, 1.95, 2.0, '**parent cell** (46)', { size: 11, align: 'left' });
    arrow(s, 3.0, 2.9, 2.0, 3.65, C.ink, 2); arrow(s, 4.0, 2.9, 5.0, 3.65, C.ink, 2);
    label(s, 2.85, 3.05, 1.3, 'mitosis', { size: 11, italic: true, color: C.blue });
    [1.7, 5.3].forEach(cx => { cellOut(s, cx, 4.35, 1.5, 1.2); ball(s, cx, 4.35, 0.36, NUC[0], NUC[1], 1); [CHR[0], CHR[1], CHR[0], CHR[1]].forEach((c, i) => chromatid(s, cx - 0.21 + i * 0.14, 4.35, c, 0.9)); });
    label(s, 0.7, 5.05, 2.0, '**daughter** (46)', { size: 11 }); label(s, 4.3, 5.05, 2.0, '**daughter** (46)', { size: 11 });
    label(s, 2.4, 4.15, 1.9, 'identical', { size: 11, bold: true, color: C.red });
  },
  head: 'Uses of mitosis',
  lines: [
    '**Growth:** more cells, so the organism gets bigger.',
    '**Repair:** replaces damaged cells, e.g. healing a cut.',
    '**Asexual reproduction:** one parent makes genetically **identical** offspring (e.g. strawberry runners, potato tubers, yeast budding).',
    'Each daughter cell has the **same number** (diploid) and the **same** chromosomes as the parent.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why skin cells made by mitosis are genetically identical.',
    steps: [['Copy', 'DNA is copied exactly in interphase'], ['Split', 'chromatids are pulled apart equally'], ['Result', 'each cell gets a full identical set'], ['Answer', 'same genes as the parent cell']] },
  qc: 'Give **two** reasons why organisms need mitosis.',
  notes: 'QUICK CHECK ANSWER: any two: growth; repair / replacing damaged cells; asexual reproduction (1 each).\nSpec 2.2 and 2.3. Students should use the words diploid and genetically identical.',
}), '2.2–2.3 Importance of mitosis');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 2.1–2.3 • mitosis and the cell cycle', [
  { q: 'Describe what happens during **anaphase**.', marks: 2, ms: 'Spindle fibres pull / chromatids separate (1); move to opposite poles / ends of the cell (1).' },
  { q: 'A human cell divides by mitosis. State the number of chromosomes in each daughter cell and describe how they compare with the parent.', marks: 2, ms: '46 (1); genetically identical to the parent / same chromosomes (1).' },
  { q: 'A cell divides every 20 hours. How many cells are made from one cell in 100 hours?', marks: 2, ms: '100 ÷ 20 = 5 cycles (1); 2⁵ = 32 cells (1).' },
]);
calc('R1 2^(100/20)', 2 ** (100 / 20), 32);
reg(R1.s, 'Recap 1');

// ======================= 9 CELL CYCLE MATHS =======================
{
  const s = D.contentHeader('Calculations: the cell cycle', 'Specification 2.1 • using numbers of cells in each stage', { tag: '2.1' });
  D.card(s, 0.45, 1.3, 6.1, 2.05, 'Two rules', [
    '**cells after n cycles = 2ⁿ** (from one starting cell).',
    '**% in mitosis = cells in mitosis ÷ total cells × 100.** The % of cells in a stage ≈ the % of the cycle time spent in that stage.',
  ], { size: 12 });
  D.workedSteps(s, 0.45, 3.5, 6.1, 2.75, 'My turn', 'A root tip slide shows 300 cells; 30 are in mitosis. The cycle takes 20 hours.',
    [['%', '30 ÷ 300 × 100 = **10%**'], ['Time', '10% of 20 h = 0.10 × 20'], ['Answer', '**2 hours** in mitosis']], { size: 12.5 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** 48 of 400 cells are in mitosis. Calculate the percentage.',
    '**2** The cell cycle in Q1 takes 25 hours. Estimate the time spent in mitosis.',
    '**3** How many cells are made from one cell after **5** cycles?',
    '**4** How many cycles until one cell becomes **more than 1000** cells?',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'One cell divides **6** times. How many cells are there?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 48 ÷ 400 × 100 = 12%. 2) 0.12 × 25 = 3 hours. 3) 2⁵ = 32. 4) 2¹⁰ = 1024, so 10 cycles (2⁹ = 512 is not enough).\nQUICK CHECK: 2⁶ = 64.\nAll checked in the build script.');
  reg(s, '2.1 Cell cycle calculations');
}

// ======================= 10 CANCER =======================
reg(D.contentSlide({
  title: 'Cancer',
  subtitle: 'Specification 2.4 • changes in cells lead to uncontrolled cell division',
  tag: '2.4', caption: 'a tumour forms when one cell divides out of control',
  draw: (s, p) => {
    for (let c = 0; c < 9; c++) for (let r = 0; r < 2; r++) { const x = 0.8 + c * 0.62, y = 4.3 + r * 0.55; box(s, x, y, 0.6, 0.53, 'FBE9E7', 'B5655B', { lw: 1 }); ball(s, x + 0.3, y + 0.27, 0.08, NUC[0], NUC[1], 0.5); }
    let r0 = 7; const rnd = () => { r0 = (r0 * 9301 + 49297) % 233280; return r0 / 233280; };
    for (let i = 0; i < 26; i++) { const a = rnd() * Math.PI, d = rnd() * 1.1; const x = 3.6 + Math.cos(a) * d * 1.3, y = 4.25 - Math.sin(a) * d * 1.9; ball(s, x, y, 0.2, 'E6B0C8', '8E3B5E', 1); ball(s, x, y, 0.07, '6A4C93', '6A4C93'); }
    label(s, 4.6, 1.75, 1.8, '**tumour**', { size: 12, color: '8E3B5E', align: 'left' });
    line(s, 4.55, 1.9, 4.1, 2.5, '8E3B5E', 1);
    label(s, 0.8, 5.4, 2.6, 'normal tissue', { size: 10.5, italic: true, align: 'left' });
  },
  head: 'What is cancer?',
  lines: [
    'A **change (mutation)** in a cell’s DNA stops the cell cycle being controlled.',
    'The cell divides by mitosis **again and again**, forming a lump: a **tumour**.',
    '**Benign** tumours stay in one place. **Malignant** tumours invade tissues and can spread in the blood to form **secondary tumours**.',
    'Risk factors include **smoking**, **UV light**, some **viruses** and **inherited** genes.',
  ],
  worked: { head: 'Link to treatment', q: 'Why do some cancer drugs stop cells dividing?',
    steps: [['Problem', 'cancer cells divide uncontrollably'], ['Drug', 'stops DNA copying or mitosis'], ['Side effect', 'also affects normal dividing cells, e.g. hair'], ['Answer', 'slows the growth of the tumour']] },
  qc: 'Describe how a **tumour** forms.',
  notes: 'QUICK CHECK ANSWER: a change / mutation in a cell (1) leads to uncontrolled cell division / mitosis (1) forming a mass of cells (1).\nSpec 2.4. Benign/malignant is useful extension (also in Topic 5 non-communicable disease).',
}), '2.4 Cancer');

// ======================= 11 GROWTH =======================
reg(D.contentSlide({
  title: 'Growth in animals and plants',
  subtitle: 'Specification 2.5 • division, elongation and differentiation',
  tag: '2.5', caption: 'zones of growth in a root tip',
  draw: (s, p) => {
    const x = 2.2;
    poly(s, [[x, 1.55], [x + 1.4, 1.55], [x + 1.4, 4.55], [x + 0.7, 5.35], [x, 4.55]], 'EEF7E8', '3E7A2E', { lw: 2 });
    for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) box(s, x + 0.05 + c * 0.325, 1.65 + r * 0.42, 0.32, 0.4, 'E3F1DA', '6A9E58', { lw: 0.75 });
    for (let r = 0; r < 5; r++) for (let c = 0; c < 4; c++) box(s, x + 0.05 + c * 0.325, 3.35 + r * 0.22, 0.32, 0.21, 'D2E8C4', '6A9E58', { lw: 0.75 });
    for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) { ball(s, x + 0.21 + c * 0.325, 3.45 + r * 0.22, 0.04, NUC[1]); }
    poly(s, [[x + 0.15, 4.5], [x + 1.25, 4.5], [x + 0.7, 5.25]], 'E8D5B0', 'A88B63');
    const lab = (y, t, col) => { line(s, x + 1.5, y, x + 1.85, y, col, 1.25); label(s, x + 1.9, y - 0.25, 2.3, t, { size: 10.5, bold: true, color: col, align: 'left', h: 0.5 }); };
    lab(2.4, 'differentiation: cells become specialised', '2E7D4F');
    lab(3.0, 'elongation: cells get longer', C.blue);
    lab(3.8, 'division: mitosis in the meristem', C.red);
    lab(4.9, 'root cap', 'A88B63');
    arrow(s, 1.7, 4.8, 1.7, 2.4, C.grey, 1.5); label(s, 0.5, 3.3, 1.15, 'older cells', { size: 9.5, italic: true, color: C.grey, h: 0.4 });
  },
  head: 'How organisms grow',
  lines: [
    '**Growth** is a permanent increase in **size** or **mass**.',
    '**Animals:** grow by **cell division** (mitosis) and **differentiation**. Most animal cells lose the ability to differentiate early in life.',
    '**Plants:** grow by **cell division** in **meristems**, **cell elongation** (cells get longer) and **differentiation**. Plants keep growing all their lives.',
  ],
  worked: { head: 'Compare', q: 'Give one way plant growth differs from animal growth.',
    steps: [['Plants', 'cell elongation is a main way of growing'], ['Plants', 'meristems keep dividing throughout life'], ['Animals', 'growth stops when adult'], ['Answer', 'plants grow by elongation; animals do not']] },
  qc: 'Name the **three** processes involved in plant growth.',
  notes: 'QUICK CHECK ANSWER: cell division (mitosis) (1); elongation (1); differentiation (1).\nSpec 2.5a and b.',
}), '2.5 Growth');

// ======================= 12 DIFFERENTIATION =======================
reg(D.contentSlide({
  title: 'Cell differentiation',
  subtitle: 'Specification 2.6 • unspecialised cells become specialised',
  tag: '2.6', caption: 'one unspecialised cell can become many cell types',
  draw: (s, p) => {
    ball(s, 1.4, 3.55, 0.55, 'E8E3F5', '6A4C93', 2); ball(s, 1.4, 3.55, 0.2, NUC[0], NUC[1], 1);
    label(s, 0.6, 4.2, 1.6, '**unspecialised** cell', { size: 10.5, h: 0.45 });
    const outs = [[2.15, 'muscle cell', '8C4A42'], [2.95, 'nerve cell', '2F5F8F'], [3.75, 'red blood cell', C.red], [4.55, 'ciliated cell', '8E2A33'], [5.35, 'sperm / egg', 'B5782E']];
    outs.forEach(([y, n, col]) => { arrow(s, 2.0, 3.55, 3.3, y - 0.12 + 0.12, col, 1.5); label(s, 3.4, y - 0.27, 2.9, `**${n}**`, { size: 11.5, color: col, align: 'left', h: 0.3 }); });
    label(s, 3.4, 1.55, 2.9, 'specialised cells', { size: 11, italic: true, color: C.grey, align: 'left' });
  },
  head: 'Why differentiation matters',
  lines: [
    '**Differentiation** is the process by which a cell becomes **specialised** for a particular **function**.',
    'Different **genes** are switched on, so the cell makes different **proteins** and develops a different **structure**.',
    'This lets multicellular organisms have **tissues** and **organs** with cells adapted to different jobs, which is more **efficient**.',
  ],
  worked: { head: 'Example', q: 'Describe how a cell becomes a red blood cell.',
    steps: [['Start', 'unspecialised cell in bone marrow'], ['Genes', 'genes for haemoglobin switched on'], ['Change', 'loses its nucleus; biconcave shape'], ['Answer', 'adapted to carry oxygen']] },
  qc: 'Explain why multicellular organisms need **differentiated** cells.',
  notes: 'QUICK CHECK ANSWER: different cells / tissues carry out different functions (1); each specialised cell is adapted to do its job efficiently (1).\nSpec 2.6.',
}), '2.6 Differentiation');

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 2.1–2.6 • cell cycle maths, cancer, growth', [
  { q: 'Describe how a malignant tumour differs from a benign tumour.', marks: 2, ms: 'Malignant invades nearby tissue (1); can spread in the blood to form secondary tumours (1).' },
  { q: '60 of 500 cells are in mitosis. The cell cycle takes 15 hours. Calculate the time spent in mitosis.', marks: 2, ms: '60 ÷ 500 = 0.12 / 12% (1); 0.12 × 15 = 1.8 hours (1).' },
  { q: 'Explain the role of a meristem in plant growth.', marks: 2, ms: 'Cells divide by mitosis (1); cells are unspecialised so they can elongate and differentiate (1).' },
]);
calc('R2 60/500 × 15', 60 / 500 * 15, 1.8, 1e-12);
reg(R2.s, 'Recap 2');

// ======================= 14 PERCENTILE CHARTS =======================
reg(D.contentSlide({
  title: 'Percentile charts',
  subtitle: 'Specification 2.7 • monitoring growth',
  tag: '2.7', caption: 'mass of baby boys (model data) with one baby plotted',
  draw: (s, p) => {
    const g = { x: 1.25, y: 1.55, w: 4.35, h: 3.55, xmin: 0, xmax: 12, xstep: 2, ymin: 2, ymax: 12, ystep: 2, xlabel: 'Age (months)', ylabel: 'Mass (kg)', grid: true };
    axes(s, g);
    plotLine(s, g, P91, '7FA9C9', 2); plotLine(s, g, P50, C.blue, 2.5); plotLine(s, g, P09, '7FA9C9', 2);
    label(s, px(g, 12) + 0.05, py(g, P91[6][1]) - 0.15, 0.6, '91st', { size: 10, bold: true, align: 'left', color: '2F5F8F' });
    label(s, px(g, 12) + 0.05, py(g, P50[6][1]) - 0.15, 0.6, '50th', { size: 10, bold: true, align: 'left', color: C.blue });
    label(s, px(g, 12) + 0.05, py(g, P09[6][1]) - 0.1, 0.6, '9th', { size: 10, bold: true, align: 'left', color: '2F5F8F' });
    points(s, g, BABY, C.red); plotLine(s, g, BABY, C.red, 1.5, { dash: 'dash' });
    label(s, px(g, 8) - 0.3, py(g, 7.4) + 0.08, 1.5, 'Sam', { size: 10.5, bold: true, color: C.red, align: 'left' });
  },
  head: 'Reading a percentile chart',
  lines: [
    'The **50th percentile** line: **50%** of babies of that age are lighter than this.',
    'The **9th percentile**: only 9% are lighter. The **91st**: 91% are lighter.',
    'Doctors check that a baby **follows** a curve. **Crossing** percentile lines, or being below the 2nd or above the 98th, may show a **problem** (e.g. poor diet or illness).',
  ],
  worked: { head: 'Interpret Sam’s growth', q: 'Sam is plotted in red.',
    steps: [['Birth', '3.6 kg, close to the 50th percentile'], ['6 months', '7.0 kg, close to the 9th (6.95 kg)'], ['Trend', 'Sam has crossed percentile lines downwards'], ['Answer', 'a doctor should check his feeding and health']] },
  qc: 'What does it mean if a baby’s mass is on the **91st percentile**?',
  notes: 'QUICK CHECK ANSWER: 91% of babies of the same age are lighter / 9% are heavier (1).\nSpec 2.7. Chart values are model data (50th × 0.88 and × 1.13), checked in the build script. Real UK-WHO charts show 0.4th, 2nd, 9th, 25th, 50th, 75th, 91st, 98th, 99.6th.',
}), '2.7 Percentile charts');

// ======================= 15 PERCENTILE PRACTICE =======================
{
  const s = D.contentHeader('Practice: growth data', 'Specification 2.7 • percentage change and reading charts', { tag: '2.7' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A baby on the 50th percentile grows from 3.5 kg at birth to 7.0 kg at 4 months. Calculate the % increase.',
    [['Rule', '% change = (new − old) ÷ old × 100'], ['Change', '7.0 − 3.5 = 3.5 kg'], ['Divide', '3.5 ÷ 3.5 × 100'], ['Answer', '**100%** increase']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn (use the chart on the previous slide)', [
    '**1** Calculate the % increase in Sam’s mass from birth (3.6 kg) to 8 months (7.4 kg). Give 3 significant figures.',
    '**2** Read the **91st** percentile mass at **6 months**.',
    '**3** A 12-month-old has a mass of **8.4 kg**. Which percentile is this closest to?',
    '**4** Suggest **two** reasons why a baby’s growth may fall across percentile lines.',
  ], { size: 13.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'A baby grows from **3.2 kg** to **8.0 kg**. Calculate the % increase.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) (7.4 − 3.6) ÷ 3.6 × 100 = 105.6 → 106%. 2) about 8.9 kg (model value 8.93). 3) the 9th percentile (8.45 kg). 4) any two: poor diet / not feeding well; illness or infection; a health condition.\nQUICK CHECK: 4.8 ÷ 3.2 × 100 = 150%.');
  reg(s, '2.7 Practice: growth data');
}

// ======================= 16 STEM CELLS =======================
reg(D.contentSlide({
  title: 'Stem cells and meristems',
  subtitle: 'Specification 2.8 • unspecialised cells that can divide and differentiate',
  tag: '2.8', caption: 'where stem cells are found',
  draw: (s, p) => {
    const cards = [
      ['Embryonic stem cells', 'early embryo', 'can become **any** cell type', '6A4C93', 1.55],
      ['Adult stem cells', 'e.g. bone marrow', 'can only become a **few** cell types (e.g. blood cells)', C.red, 2.95],
      ['Meristems (plants)', 'tips of roots and shoots', 'can become **any** plant cell, for life', '2E7D4F', 4.35],
    ];
    cards.forEach(([t, w, d, col, y]) => {
      box(s, 0.75, y, 5.5, 1.2, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.75 });
      ball(s, 1.25, y + 0.6, 0.32, col, col); ball(s, 1.25, y + 0.6, 0.11, C.white, C.white);
      s.addText([{ text: t, options: { bold: true, color: col, breakLine: true } }, { text: w, options: { italic: true, color: C.grey, breakLine: true } }, ...T.rich(d)], { x: 1.75, y: y + 0.05, w: 4.4, h: 1.1, fontFace: 'Calibri', fontSize: 11.5, valign: 'middle', margin: 0 });
    });
  },
  head: 'Functions',
  lines: [
    'A **stem cell** is an **unspecialised** cell that can **divide** to make more stem cells and can **differentiate** into specialised cells.',
    '**Embryonic stem cells** form all the cells of the body as the embryo develops.',
    '**Adult stem cells** **replace** and **repair** cells, e.g. making new blood cells.',
    '**Meristem** cells let plants grow **throughout their lives** and grow new parts.',
  ],
  worked: { head: 'Compare', q: 'Why are embryonic stem cells more useful in medicine than adult stem cells?',
    steps: [['Embryonic', 'can differentiate into any cell type'], ['Adult', 'only a few types'], ['Use', 'could replace many kinds of damaged tissue'], ['Answer', 'they are more versatile']] },
  qc: 'Where are **meristems** found in a plant? What is their function?',
  notes: 'QUICK CHECK ANSWER: at the tips of roots and shoots (1); divide by mitosis to make new cells that can differentiate into any plant cell / allow growth (1).\nSpec 2.8.',
}), '2.8 Stem cells and meristems');

// ======================= 17 STEM CELLS IN MEDICINE =======================
{
  const s = D.contentHeader('Stem cells in medicine: benefits and risks', 'Specification 2.9 • discuss both sides', { tag: '2.9' });
  D.card(s, 0.45, 1.3, 6.1, 2.4, 'Possible uses', [
    '**Bone marrow transplants** already treat **leukaemia**.',
    'Research: new **nerve** cells for spinal injuries, **insulin-making** cells for type 1 diabetes, new **heart muscle** after a heart attack.',
  ], { size: 12 });
  D.card(s, 0.45, 3.85, 2.95, 2.4, '+ Benefits', [
    'Could **repair or replace** damaged tissue.',
    'Treat diseases with **no cure** now.',
    'Fewer people waiting for **organ donors**.',
  ], { size: 11.5, fill: 'E3F2E8', border: '9FCDAF' });
  D.card(s, 3.6, 3.85, 2.95, 2.4, '− Risks and issues', [
    'Cells may divide **uncontrollably** → **cancer**.',
    '**Rejection** by the immune system.',
    'Cells may carry **viruses**.',
    '**Ethics**: embryos are destroyed.',
  ], { size: 11.5, fill: 'FBE5E6', border: 'E9A9AE' });
  D.workedSteps(s, 6.8, 1.3, 6.08, 4.95, 'Exam technique: "discuss"', 'Discuss the use of embryonic stem cells to treat spinal injuries. (6 marks)', [
    ['Benefit', 'embryonic stem cells can differentiate into nerve cells'],
    ['Benefit', 'could restore movement; no other cure'],
    ['Risk', 'may form tumours; may be rejected'],
    ['Ethics', 'embryo is destroyed; some people object'],
    ['Balance', 'research is still at an early stage'],
    ['Answer', 'give both sides and a reasoned conclusion'],
  ], { size: 12 });
  D.quickCheck(s, 'Give **one** benefit and **one** risk of using stem cells to treat disease.');
  D.notes(s, 'QUICK CHECK ANSWER: benefit: can replace damaged/diseased cells, e.g. treat paralysis or diabetes (1); risk: tumour/cancer, rejection, infection with viruses, ethical objections (1).\nSpec 2.9. Therapeutic cloning (using the patient’s own cells to avoid rejection) is useful extension.');
  reg(s, '2.9 Stem cells in medicine');
}

// ======================= 18 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 2.7–2.9 • percentiles and stem cells', [
  { q: 'A baby’s mass is on the 25th percentile. What does this mean?', marks: 1, ms: '25% of babies of the same age are lighter / 75% heavier (1).' },
  { q: 'Describe **two** differences between embryonic stem cells and adult stem cells.', marks: 2, ms: 'Embryonic can become any cell type, adult only a few (1); embryonic from early embryos, adult from tissues e.g. bone marrow (1).' },
  { q: 'Explain **one** risk of using stem cells in medicine.', marks: 2, ms: 'Stem cells may keep dividing uncontrollably (1) causing a tumour / cancer (1). OR rejection (1) as the immune system attacks foreign cells (1).' },
  { q: 'A baby grows from 3.0 kg to 6.6 kg. Calculate the % increase.', marks: 2, ms: '3.6 ÷ 3.0 × 100 (1); = 120% (1).' },
]);
calc('R3 % 3.0 → 6.6', (6.6 - 3.0) / 3.0 * 100, 120, 1e-9);
reg(R3.s, 'Recap 3');

// ======================= 19 BRAIN =======================
reg(D.contentSlide({
  title: 'The brain',
  subtitle: 'Specification 2.10B • the cerebral hemispheres, cerebellum and medulla oblongata',
  tag: '2.10B', p: true, caption: 'the human brain from the side (front on the left)',
  draw: (s, p) => {
    brain(s, 3.35, 3.2, 1.05);
    callout(s, 0.6, 1.75, 2.0, 'cerebral hemispheres', 2.4, 2.25, 'A65A55');
    callout(s, 4.75, 5.05, 1.4, 'cerebellum', 4.75, 4.3, '5E8A4A');
    callout(s, 1.1, 5.05, 2.0, 'medulla oblongata', 3.68, 4.85, '2F5F8F');
    label(s, 0.7, 5.4, 5.6, 'The brain is protected by the **skull**.', { size: 10.5, h: 0.35 });
  },
  head: 'Structures and functions',
  lines: [
    '**Cerebral hemispheres** (cerebrum): the largest part, with left and right halves. Controls **conscious** activity: thinking, memory, language, vision, voluntary movement.',
    '**Cerebellum**: coordinates **movement**, **balance** and muscle control.',
    '**Medulla oblongata**: controls **unconscious** activities such as **heart rate** and **breathing rate**.',
  ],
  worked: { head: 'Apply', q: 'A patient has a damaged cerebellum. Predict the symptoms.',
    steps: [['Function', 'cerebellum coordinates movement and balance'], ['Damage', 'muscle movements poorly controlled'], ['Symptoms', 'unsteady walking; poor balance'], ['Answer', 'problems with coordination and balance']] },
  qc: 'Which part of the brain controls **breathing rate**? Which part controls **memory**?',
  notes: 'QUICK CHECK ANSWER: medulla oblongata (1); cerebral hemispheres / cerebrum (1).\nSpec 2.10B (biology only).',
}), '2.10B The brain (BIOLOGY ONLY)');

// ======================= 20 CT & PET =======================
reg(D.contentSlide({
  title: 'Investigating the brain: CT and PET scans',
  subtitle: 'Specification 2.11B • studying the brain without opening the skull',
  tag: '2.11B', p: true, caption: 'simplified scan images',
  draw: (s, p) => {
    head(s, 1.95, 3.2, 1.0, '2B2B2B'); oval(s, 1.95, 3.15, 1.6, 2.0, '8C8C8C', 'E6E6E6', { lw: 3 });
    oval(s, 2.2, 3.4, 0.5, 0.45, 'E6E6E6', 'FFFFFF', { lw: 1 });
    label(s, 0.8, 4.55, 2.3, '**CT scan**', { size: 12 });
    label(s, 0.7, 4.85, 2.5, 'X-rays: shows **structure**, e.g. a tumour (white)', { size: 10, h: 0.5, color: C.grey });
    head(s, 5.0, 3.2, 1.0, '1C2541'); oval(s, 5.0, 3.15, 1.6, 2.0, '24346A', '3B5BA0', { lw: 1.5 });
    [[4.6, 2.7, 'E74C3C', 0.28], [5.35, 2.85, 'F1C40F', 0.24], [4.9, 3.55, 'E67E22', 0.3], [5.4, 3.6, '2ECC71', 0.2]].forEach(([x, y, c, r]) => ball(s, x, y, r, c, c));
    label(s, 3.85, 4.55, 2.3, '**PET scan**', { size: 12 });
    label(s, 3.75, 4.85, 2.5, 'radioactive tracer: shows **activity** (bright = active)', { size: 10, h: 0.5, color: C.grey });
  },
  head: 'The problem and the solutions',
  lines: [
    'Brain tissue is **inside the skull**, so it is hard to reach, and surgery can **damage** it.',
    '**CT scan**: many **X-ray** images are combined to show the brain’s **structure**. Damaged areas or tumours can be linked to lost functions.',
    '**PET scan**: a **radioactive tracer** (e.g. labelled glucose) is injected; **active** areas take up more and show up brighter. Shows brain **function**.',
  ],
  worked: { head: 'Compare', q: 'Which scan would show which part of the brain is used when a person speaks?',
    steps: [['CT', 'shows structure only'], ['PET', 'shows active regions'], ['Test', 'scan while the person speaks'], ['Answer', 'PET: active areas take up more tracer']] },
  qc: 'Give **one** disadvantage of each type of scan.',
  notes: 'QUICK CHECK ANSWER: CT: uses X-rays (ionising radiation) / shows structure not function (1). PET: radioactive tracer (ionising radiation) / expensive / limited number of scans (1).\nSpec 2.11B (biology only; tier marker unverified: see SPEC_T2.md).',
}), '2.11B CT and PET scans (BIOLOGY ONLY)');

// ======================= 21 LIMITS OF TREATMENT =======================
reg(D.contentSlide({
  title: 'Limits to treating the nervous system',
  subtitle: 'Specification 2.12B • spinal injuries and brain tumours',
  tag: '2.12B', p: true, caption: 'the spinal cord runs inside the vertebrae',
  draw: (s, p) => {
    for (let i = 0; i < 8; i++) { const y = 1.6 + i * 0.48; box(s, 1.2, y, 1.2, 0.4, 'F2E8D5', '9C7B4A', { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1.25 }); }
    box(s, 1.68, 1.55, 0.24, 3.95, 'F7E36B', 'B59A10', { lw: 1 });
    line(s, 1.45, 3.62, 2.15, 3.32, C.red, 3); line(s, 1.45, 3.32, 2.15, 3.62, C.red, 3);
    label(s, 2.55, 3.25, 3.6, '**injury**: nerve fibres cut; messages cannot pass', { size: 10.5, color: C.red, align: 'left', h: 0.5 });
    label(s, 2.55, 1.7, 3.6, 'vertebrae (bone)', { size: 10.5, color: '9C7B4A', align: 'left' });
    label(s, 2.55, 2.2, 3.6, 'spinal cord (nerve tissue)', { size: 10.5, color: 'B59A10', align: 'left' });
    label(s, 2.55, 4.4, 3.7, 'Below the injury: loss of feeling and movement (paralysis).', { size: 10.5, align: 'left', h: 0.5, italic: true });
  },
  head: 'Why treatment is difficult',
  lines: [
    'Nerve cells **do not easily repair or replace** themselves.',
    '**Spinal injuries:** damaged nerve tissue rarely regrows, so paralysis is usually **permanent**.',
    '**Brain tumours:** hard to **reach**; surgery or radiotherapy may **damage healthy tissue** nearby and affect important functions.',
    'Many drugs cannot cross from the blood into the brain (the **blood–brain barrier**).',
    'We still do not fully **understand** how the brain works.',
  ],
  worked: { head: 'Link to 2.9', q: 'Suggest how stem cells might help a spinal injury.',
    steps: [['Idea', 'stem cells could differentiate into nerve cells'], ['Replace', 'new cells bridge the damaged region'], ['Limit', 'still experimental; risk of tumours'], ['Answer', 'might restore some feeling and movement']] },
  qc: 'Give **two** reasons why brain tumours are difficult to treat.',
  notes: 'QUICK CHECK ANSWER: any two: hard to access inside the skull; surgery may damage healthy brain tissue / affect functions; drugs may not reach the brain; nerve tissue does not repair easily (1 each).\nSpec 2.12B (biology only).',
}), '2.12B Limits of treatment (BIOLOGY ONLY)');

// ======================= 22 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 2.10B–2.12B • the brain', [
  { q: 'State the function of the **medulla oblongata**.', marks: 1, ms: 'Controls unconscious activities, e.g. heart rate / breathing (1).' },
  { q: 'Explain why a PET scan is more useful than a CT scan for finding out which part of the brain is used for memory.', marks: 2, ms: 'PET shows which areas are active (1); CT only shows structure (1).' },
  { q: 'Explain why damage to the spinal cord often causes permanent paralysis.', marks: 2, ms: 'Nerve cells / tissue do not repair or regrow (easily) (1); impulses cannot pass between the brain and the body below the injury (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 23 NERVOUS SYSTEM =======================
reg(D.contentSlide({
  title: 'The nervous system',
  subtitle: 'Specification 2.13 • receptors, neurones and effectors',
  tag: '2.13', caption: 'the pathway for a conscious response',
  draw: (s, p) => {
    const steps = [['stimulus', 'a change, e.g. a sound', 'D9D9D9', C.text], ['receptor', 'e.g. in the ear', 'F7D9A8', '8A560A'], ['sensory neurone', '', 'DCE6F5', '2F5F8F'], ['CNS', 'brain and spinal cord', 'E8E3F5', '6A4C93'], ['motor neurone', '', 'DCE6F5', '2F5F8F'], ['effector', 'muscle or gland', 'F2B8BC', '8E2A33'], ['response', 'e.g. turn head', 'CFE6D6', '2E7D4F']];
    steps.forEach(([t, d, f, col], i) => {
      const y = 1.5 + i * 0.6;
      box(s, 1.6, y, 3.8, 0.46, f, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.25 });
      s.addText([{ text: t, options: { bold: true, color: col } }, { text: d ? '   ' + d : '', options: { color: C.grey, italic: true } }], { x: 1.7, y, w: 3.6, h: 0.46, fontFace: 'Calibri', fontSize: 11.5, align: 'center', valign: 'middle', margin: 0 });
      if (i < steps.length - 1) arrow(s, 3.5, y + 0.46, 3.5, y + 0.6, C.ink, 1.5);
    });
  },
  head: 'Key ideas',
  lines: [
    'The **central nervous system (CNS)** is the **brain** and **spinal cord**. It **coordinates** responses.',
    '**Receptors** detect **stimuli** (light, sound, touch, temperature, chemicals).',
    'Information travels as **electrical impulses** along **neurones**: **sensory** neurones to the CNS, **motor** neurones from the CNS.',
    '**Effectors** are **muscles** (contract) or **glands** (release hormones).',
  ],
  worked: { head: 'Apply', q: 'You see a ball and catch it. Name the receptor and effector.',
    steps: [['Stimulus', 'light from the ball'], ['Receptor', 'light receptors in the retina of the eye'], ['Effector', 'muscles in the arm and hand'], ['Answer', 'receptor: eye (retina); effector: arm muscles']] },
  qc: 'What are the **two** types of effector? What makes up the **CNS**?',
  notes: 'QUICK CHECK ANSWER: muscles and glands (1); brain and spinal cord (1).\nSpec 2.13.',
}), '2.13 The nervous system');

// ======================= 24 NEURONES =======================
reg(D.contentSlide({
  title: 'Neurones',
  subtitle: 'Specification 2.13 • structure and function',
  tag: '2.13', caption: 'impulses travel from left to right',
  draw: (s, p) => {
    label(s, 0.6, 1.45, 3, '**Motor neurone**', { size: 12, align: 'left', color: '2F5F8F' });
    neurone(s, 1.0, 2.35, 4.6);
    callout(s, 0.55, 3.05, 1.3, 'cell body', 1.25, 2.55, '2F5F8F', { size: 10.5 });
    callout(s, 0.55, 1.85, 1.0, 'dendrites', 0.95, 2.1, '2F5F8F', { size: 10.5 });
    callout(s, 2.4, 3.05, 1.9, 'myelin sheath', 2.62, 2.44, 'B59A10', { size: 10.5 });
    callout(s, 3.7, 1.85, 0.7, 'axon', 3.4, 2.35, '2F5F8F', { size: 10.5 });
    callout(s, 4.9, 3.05, 1.5, 'axon terminals', 5.9, 2.6, '2F5F8F', { size: 10.5 });
    label(s, 0.6, 3.55, 3, '**Sensory neurone**', { size: 12, align: 'left', color: '8A560A' });
    neurone(s, 0.9, 4.45, 4.8, { bodyAt: 'mid', col: '8A560A', body: 'F7E3C6' });
    label(s, 0.6, 4.75, 2.0, 'from receptor', { size: 10, italic: true, align: 'left' });
    label(s, 0.6, 5.2, 5.8, '**Relay neurones** are short and found only in the **CNS**; they link sensory and motor neurones.', { size: 10.5, align: 'left', h: 0.5 });
  },
  head: 'Adaptations',
  lines: [
    '**Long axon**: carries impulses over long distances quickly.',
    '**Myelin sheath**: a fatty layer that **insulates** the axon and makes impulses travel **faster**.',
    '**Dendrites**: many branches to **connect** with other neurones.',
    '**Sensory** neurones carry impulses **to** the CNS; **motor** neurones carry impulses **from** the CNS **to** effectors.',
  ],
  worked: { head: 'Impulse speed', q: 'An impulse travels 0.9 m along a neurone in 0.009 s. Calculate its speed.',
    steps: [['Equation', 'speed = distance ÷ time'], ['Substitute', '0.9 ÷ 0.009'], ['Answer', '100 m/s']], size: 11 },
  workedH: 1.85,
  qc: 'Explain how the **myelin sheath** helps a neurone carry out its function.',
  notes: 'QUICK CHECK ANSWER: insulates the axon (1); so the impulse travels faster (1).\nSpec 2.13. Speed checked: 0.9 ÷ 0.009 = 100 m/s.',
}), '2.13 Neurones');

// ======================= 25 SYNAPSES =======================
reg(D.contentSlide({
  title: 'Synapses',
  subtitle: 'Specification 2.13 • the junction between two neurones',
  tag: '2.13', caption: 'a synapse (greatly magnified)',
  draw: (s, p) => {
    poly(s, [[0.8, 1.9], [2.6, 1.9], [3.35, 2.4], [3.45, 3.55], [3.35, 4.7], [2.6, 5.2], [0.8, 5.2]], 'DCE6F5', '2F5F8F', { lw: 2 });
    [[2.2, 2.7], [2.8, 3.0], [2.4, 3.55], [2.9, 3.9], [2.3, 4.4], [2.95, 4.5], [1.8, 3.2]].forEach(([x, y]) => { ball(s, x, y, 0.17, 'FFF3B0', 'B5782E', 1); for (let k = 0; k < 3; k++) ball(s, x - 0.06 + k * 0.06, y, 0.025, C.red); });
    box(s, 3.9, 1.9, 2.4, 3.3, 'F7E3C6', '8A560A', { lw: 2 });
    [2.4, 2.95, 3.5, 4.05, 4.6].forEach(y => box(s, 3.88, y, 0.12, 0.22, '2E8B57', '1E5E3A'));
    [[3.6, 3.0], [3.65, 3.6], [3.58, 4.2]].forEach(([x, y]) => ball(s, x, y, 0.035, C.red));
    arrow(s, 0.8, 1.6, 2.5, 1.6, '2F5F8F', 2); label(s, 0.8, 1.3, 2.5, 'impulse arrives', { size: 10, color: '2F5F8F', align: 'left' });
    label(s, 3.25, 5.25, 1.0, '**gap**', { size: 10.5 });
    callout(s, 0.6, 5.55, 2.3, 'vesicles of neurotransmitter', 1.8, 3.37, 'B5782E', { size: 10.5 });
    callout(s, 4.4, 1.55, 1.9, 'receptor molecules', 3.95, 2.5, '1E5E3A', { size: 10.5 });
    label(s, 4.0, 3.3, 2.2, 'next neurone', { size: 11, bold: true, color: '8A560A' });
  },
  head: 'How a synapse works',
  lines: [
    'An impulse arrives at the end of the first neurone.',
    '**Neurotransmitter** is released from **vesicles** into the **gap**.',
    'It **diffuses** across the gap and **binds** to **receptors** on the next neurone.',
    'This starts a **new electrical impulse** in the next neurone.',
    'Synapses make sure impulses travel in **one direction** only; they are **slower** than electrical impulses.',
  ],
  worked: { head: 'Exam technique', q: 'Explain how an impulse passes across a synapse. (3 marks)',
    steps: [['Release', 'neurotransmitter released into the gap'], ['Diffuse', 'diffuses across the gap'], ['Bind', 'binds to receptors on the next neurone'], ['Answer', 'triggers a new impulse']] },
  qc: 'By what process does the neurotransmitter cross the gap?',
  notes: 'QUICK CHECK ANSWER: diffusion (1).\nSpec 2.13 (synapses and neurotransmitters). Some drugs act at synapses (link to Topic 5).',
}), '2.13 Synapses');

// ======================= 26 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 2.13 • neurones and synapses', [
  { q: 'Describe the function of a **sensory neurone** and a **motor neurone**.', marks: 2, ms: 'Sensory carries impulses from receptors to the CNS (1); motor carries impulses from the CNS to effectors (1).' },
  { q: 'Explain why impulses travel faster in neurones with a myelin sheath.', marks: 2, ms: 'Myelin insulates the axon (1); impulse jumps between gaps in the sheath / is not slowed (1).' },
  { q: 'Explain why impulses can only cross a synapse in one direction.', marks: 2, ms: 'Neurotransmitter is only released from the first neurone / vesicles only on one side (1); receptors only on the next neurone (1).' },
  { q: 'An impulse travels 1.2 m in 0.02 s. Calculate its speed.', marks: 1, ms: '60 m/s (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 27 REFLEX ARC =======================
reg(D.contentSlide({
  title: 'The reflex arc',
  subtitle: 'Specification 2.14 • fast, automatic responses that protect the body',
  tag: '2.14', caption: 'touching a hot object: the impulse bypasses the brain',
  draw: (s, p) => {
    oval(s, 4.9, 3.0, 1.7, 1.5, 'F2F2F2', '777777', { lw: 2 });
    poly(s, [[4.45, 2.55], [4.9, 2.85], [5.35, 2.55], [5.2, 3.0], [5.35, 3.45], [4.9, 3.15], [4.45, 3.45], [4.6, 3.0]], 'C9C9C9', '999999');
    label(s, 4.05, 1.95, 1.7, '**spinal cord**', { size: 11 });
    box(s, 0.75, 4.95, 1.5, 0.4, 'F39C12', 'D35400'); label(s, 0.75, 5.35, 1.5, 'hot object', { size: 10, color: 'D35400' });
    ball(s, 1.5, 4.6, 0.32, 'F7D9A8', '8A560A', 1.5); label(s, 0.45, 4.25, 0.75, '**receptor** (skin)', { size: 9.5, h: 0.45, color: '8A560A' });
    polyline(s, [[1.5, 4.28], [1.5, 3.45], [3.3, 3.45], [4.35, 3.25]], '8A560A', 2.5);
    label(s, 1.6, 3.55, 2.2, '**sensory neurone**', { size: 10.5, color: '8A560A', align: 'left' });
    line(s, 4.65, 3.25, 5.0, 2.85, '6A4C93', 2.5); label(s, 5.8, 2.75, 0.75, '**relay**', { size: 10.5, color: '6A4C93', align: 'left' });
    polyline(s, [[5.1, 2.75], [4.3, 2.45], [2.6, 2.3], [1.6, 2.3]], '2F5F8F', 2.5);
    label(s, 2.0, 1.95, 2.2, '**motor neurone**', { size: 10.5, color: '2F5F8F', align: 'left' });
    oval(s, 1.15, 2.3, 0.9, 0.6, 'F2B8BC', '8E2A33', { lw: 1.5 }); label(s, 0.55, 1.5, 1.3, '**effector** (muscle)', { size: 9.5, h: 0.45, color: '8E2A33' });
    [[3.3, 3.45, 1], [2.6, 2.3, -1]].forEach(([x, y, d]) => arrow(s, x - 0.3 * d, y, x + 0.0, y, C.red, 2));
  },
  head: 'Reflexes',
  lines: [
    'A **reflex** is a **rapid, automatic** (involuntary) response to a stimulus, e.g. pulling your hand away from something hot, blinking.',
    '**Pathway:** stimulus → receptor → **sensory neurone** → **relay neurone** (in spinal cord) → **motor neurone** → effector → response.',
    'The impulse does **not** go through the conscious part of the brain, so the response is **faster** and helps prevent **harm**.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why a reflex is faster than a conscious response.',
    steps: [['Route', 'goes via a relay neurone in the spinal cord'], ['Skip', 'does not involve the conscious brain'], ['Fewer', 'fewer synapses for the impulse to cross'], ['Answer', 'shorter pathway, so a quicker response']] },
  qc: 'Name the **three** types of neurone in a reflex arc, in order.',
  notes: 'QUICK CHECK ANSWER: sensory, relay, motor (1 for all three in order).\nSpec 2.14. Diagram is a simplified spinal cord cross-section.',
}), '2.14 The reflex arc');

// ======================= 28 REACTION TIME =======================
{
  const s = D.contentHeader('Reaction time data', 'Specification 2.13–2.14 • working with means', { tag: '2.14' });
  const rows = [[HDR('Trial'), HDR('1'), HDR('2'), HDR('3'), HDR('4'), HDR('5'), HDR('Mean')], [tcell('Reaction time (s)', 0, { bold: true }), ...RT.map(v => tcell(v.toFixed(2), 0)), tcell('?', 0, { bold: true, color: C.red })]];
  table(s, rows, { x: 0.45, y: 1.3, w: 6.1, colW: [1.6, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75], rowH: 0.45, fontSize: 12 });
  D.workedSteps(s, 0.45, 2.4, 6.1, 3.85, 'My turn', 'A student catches a falling ruler 5 times. Calculate the mean reaction time.',
    [['Add', '0.21 + 0.19 + 0.23 + 0.20 + 0.22 = 1.05 s'], ['Divide', '1.05 ÷ 5'], ['Answer', '**0.21 s**'], ['Note', 'this is a conscious response: slower than a reflex']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Calculate the mean of **0.30, 0.28, 0.35, 0.27 s**.',
    '**2** Give **two** variables to control in the ruler drop test.',
    '**3** A student drinks coffee and the mean falls to **0.18 s**. Suggest why.',
    '**4** Explain why the ruler test is **not** a reflex.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Why do scientists repeat the test and calculate a **mean**?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 1.20 ÷ 4 = 0.30 s. 2) same hand; same starting height/position of ruler; same person dropping; no warning; same distractions. 3) caffeine is a stimulant / speeds up transmission at synapses. 4) it involves the conscious brain / a decision to catch.\nQUICK CHECK: to reduce the effect of random errors / spot anomalies / make results more reliable (repeatable).');
  reg(s, '2.13–2.14 Reaction time data');
}

// ======================= 29 EYE =======================
reg(D.contentSlide({
  title: 'The eye',
  subtitle: 'Specification 2.15B • a sense organ containing light receptors',
  tag: '2.15B', p: true, caption: 'horizontal section through the eye; light enters from the left',
  draw: (s, p) => {
    eye(s, 3.5, 3.35, 1.55);
    callout(s, 0.6, 1.8, 1.1, 'cornea', 1.8, 2.85, '5B87B5', { size: 10.5 });
    callout(s, 0.6, 2.35, 1.1, 'iris', 2.38, 2.65, '7A5A2E', { size: 10.5 });
    callout(s, 0.6, 4.9, 1.1, 'pupil', 2.38, 3.35, C.ink, { size: 10.5 });
    callout(s, 0.6, 4.35, 1.1, 'lens', 2.65, 3.8, '2F5F8F', { size: 10.5 });
    callout(s, 5.2, 1.6, 1.2, 'retina', 4.55, 2.2, C.red, { size: 10.5 });
    callout(s, 5.3, 4.85, 1.2, 'optic nerve', 5.4, 3.5, 'B5782E', { size: 10.5, h: 0.45 });
  },
  head: 'Structures and functions',
  lines: [
    '**Cornea**: transparent; **refracts** (bends) light into the eye.',
    '**Iris**: muscles control the size of the **pupil** and so how much light enters.',
    '**Lens**: **focuses** light onto the retina (changes shape to focus near or far).',
    '**Retina**: contains light receptors: **rods** (work in dim light, black and white) and **cones** (colour, bright light).',
    '**Optic nerve**: carries impulses to the **brain**.',
  ],
  worked: { head: 'Pupil reflex', q: 'Describe what happens to the pupil in bright light.',
    steps: [['Detect', 'receptors in the retina detect bright light'], ['Effector', 'iris muscles contract / relax'], ['Change', 'pupil gets smaller'], ['Answer', 'less light enters; protects the retina']] },
  qc: 'Which receptors in the retina detect **colour**? Which work best in **dim** light?',
  notes: 'QUICK CHECK ANSWER: cones (1); rods (1).\nSpec 2.15B (biology only). The pupil reflex in detail: circular muscles contract and radial muscles relax in bright light.',
}), '2.15B The eye (BIOLOGY ONLY)');

// ======================= 30 EYE DEFECTS =======================
reg(D.contentSlide({
  title: 'Defects of the eye',
  subtitle: 'Specification 2.16B • cataracts, short and long sight, colour blindness',
  tag: '2.16B', p: true, caption: 'where light focuses (orange rays from a point)',
  draw: (s, p) => {
    const one = (cx, cy, fx, t, sub) => {
      ball(s, cx, cy, 0.75, 'F6FAFD', '555555', 2);
      s.addShape(SH.ARC, { x: cx - 0.72, y: cy - 0.72, w: 1.44, h: 1.44, angleRange: [300, 60], line: { color: 'C8414C', width: 4 } });
      oval(s, cx - 0.45, cy, 0.2, 0.55, 'DDEBF7', '2F5F8F');
      ray(s, [[cx - 2.0, cy - 0.25], [cx - 0.45, cy - 0.25], [fx, cy]]); ray(s, [[cx - 2.0, cy + 0.25], [cx - 0.45, cy + 0.25], [fx, cy]]);
      if (fx < cx + 0.7) { ray(s, [[fx, cy], [cx + 0.72, cy + (cx + 0.72 - fx) * 0.25 / (fx - cx + 0.45)]]); ray(s, [[fx, cy], [cx + 0.72, cy - (cx + 0.72 - fx) * 0.25 / (fx - cx + 0.45)]]); }
      ball(s, fx, cy, 0.05, C.red);
      label(s, cx - 2.1, cy - 0.68, 2.0, `**${t}**`, { size: 11.5, align: 'left' });
      label(s, cx - 2.1, cy + 0.38, 1.6, sub, { size: 9.5, italic: true, color: C.grey, align: 'left', h: 0.45 });
    };
    one(4.2, 2.3, 4.6, 'Short-sighted', 'focuses in front of the retina');
    one(4.2, 4.3, 5.4, 'Long-sighted', 'focuses behind the retina');
  },
  head: 'Common defects',
  lines: [
    '**Short-sightedness (myopia):** distant objects are blurred. Light focuses **in front of** the retina (eyeball too long or lens too strong).',
    '**Long-sightedness (hyperopia):** near objects are blurred. Light focuses **behind** the retina (eyeball too short or lens too weak).',
    '**Cataracts:** the lens becomes **cloudy**, so vision is blurred and colours fade.',
    '**Colour blindness:** some **cones** do not work properly (often red–green); it is **inherited**.',
  ],
  worked: { head: 'Apply', q: 'A person can read but cannot see the board clearly. Which defect? Why?',
    steps: [['Symptom', 'distant objects blurred'], ['Defect', 'short-sightedness'], ['Cause', 'light focuses in front of the retina'], ['Answer', 'short-sighted']] },
  qc: 'Explain why colour blindness **cannot** be cured with glasses.',
  notes: 'QUICK CHECK ANSWER: it is caused by faulty cones in the retina / it is inherited (1); glasses only change where light focuses, not how cones respond (1).\nSpec 2.16B (biology only).',
}), '2.16B Eye defects (BIOLOGY ONLY)');

// ======================= 31 TREATING DEFECTS =======================
{
  const s = D.contentHeader('Treating eye defects', 'Specification 2.17B • spectacles, contact lenses, laser surgery and cataract surgery', { tag: '2.17B', p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'correcting lenses (shape exaggerated)');
  // concave lens
  poly(s, [[1.3, 1.8], [1.75, 1.8], [1.6, 2.7], [1.75, 3.6], [1.3, 3.6], [1.45, 2.7]], 'DDEBF7', '2F5F8F', { lw: 1.5 });
  label(s, 0.6, 3.7, 1.9, '**concave** (diverging)', { size: 10.5, h: 0.3 });
  label(s, 0.6, 4.0, 1.9, 'for **short** sight', { size: 10.5, color: C.red, h: 0.3 });
  ray(s, [[0.7, 2.4], [1.5, 2.4], [2.4, 2.15]]); ray(s, [[0.7, 3.0], [1.5, 3.0], [2.4, 3.25]]);
  // convex lens
  oval(s, 4.6, 2.7, 0.5, 1.8, 'DDEBF7', '2F5F8F', { lw: 1.5 });
  label(s, 3.65, 3.7, 1.9, '**convex** (converging)', { size: 10.5, h: 0.3 });
  label(s, 3.65, 4.0, 1.9, 'for **long** sight', { size: 10.5, color: C.red, h: 0.3 });
  ray(s, [[3.6, 2.3], [4.6, 2.3], [5.9, 2.65]]); ray(s, [[3.6, 3.1], [4.6, 3.1], [5.9, 2.75]]);
  label(s, 0.7, 4.6, 5.6, 'The lens moves the focus point back onto the **retina**.', { size: 11, h: 0.4 });
  const rows = [[HDR('Treatment'), HDR('How it works'), HDR('Pros / cons')], ...[
    ['Spectacles', 'lenses in a frame refract light', 'cheap, safe / can break, steam up'],
    ['Contact lenses', 'thin lenses on the cornea', 'not seen / infection risk, care needed'],
    ['Laser surgery', 'reshapes the cornea to change how it refracts', 'permanent / risks: infection, damage, cost'],
    ['Cataract surgery', 'cloudy lens replaced with an artificial lens', 'restores clear vision / surgery risks'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i)])];
  table(s, rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.5, 2.45, 2.13], rowH: 0.75, fontSize: 11 });
  D.card(s, 6.8, 5.15, 6.08, 1.1, null, ['Laser surgery makes the cornea **thinner/flatter** for short sight, or changes its curve for long sight.'], { size: 11 });
  D.quickCheck(s, 'Which type of lens corrects **long-sightedness**? Give **one** risk of laser eye surgery.');
  D.notes(s, 'QUICK CHECK ANSWER: convex / converging lens (1); any one: infection, damage to the eye / cornea, vision may get worse, expensive (1).\nSpec 2.17B (biology only).');
  reg(s, '2.17B Treating eye defects (BIOLOGY ONLY)');
}

// ======================= 32 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification 2.14–2.17B • reflexes and the eye', [
  { q: 'Describe the pathway of a reflex arc from receptor to effector.', marks: 3, ms: 'Receptor → sensory neurone (1); relay neurone in the spinal cord / CNS (1); motor neurone → effector (1).' },
  { q: 'Describe the function of the **iris**.', marks: 1, ms: 'Controls the size of the pupil / how much light enters the eye (1).' },
  { q: 'Explain why a short-sighted person sees distant objects as blurred and how this can be corrected.', marks: 3, ms: 'Light focuses in front of the retina (1); concave / diverging lens (spectacles or contact lenses) (1); moves the focus back onto the retina / laser surgery reshapes the cornea (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 33 KEY WORDS =======================
reg(D.keyWords([
  ['Mitosis', 'Cell division making two genetically identical diploid cells.'],
  ['Diploid', 'Two sets of chromosomes (46 in human body cells).'],
  ['Interphase', 'Cell grows, makes organelles and copies its DNA.'],
  ['Cytokinesis', 'Division of the cytoplasm and membrane: two cells.'],
  ['Cancer', 'Uncontrolled cell division caused by changes in cells.'],
  ['Differentiation', 'A cell becoming specialised for a function.'],
  ['Percentile', 'The percentage of a population below a value.'],
  ['Stem cell', 'Unspecialised cell that can divide and differentiate.'],
  ['Meristem', 'Plant tissue at root and shoot tips with dividing cells.'],
  ['Cerebellum', 'Brain region coordinating movement and balance.'],
  ['Medulla', 'Brain region controlling heart and breathing rate.'],
  ['Myelin sheath', 'Fatty layer that insulates an axon; speeds impulses.'],
  ['Synapse', 'Gap between neurones crossed by neurotransmitter.'],
  ['Reflex arc', 'Receptor → sensory → relay → motor → effector.'],
  ['Retina', 'Layer of rods and cones that detect light.'],
  ['Cataract', 'Cloudy lens causing blurred vision.'],
], { notes: 'Use as a cover-and-recall activity. Biology-only terms: cerebellum, medulla, retina, cataract.' }), 'Summary: key words');

// ======================= 34 FULL QUESTION =======================
reg(D.fullQuestion('Root tip cells are dividing by mitosis. Later, a student investigates reaction times.', [
  { l: 'a', q: 'Name the stage of mitosis in which the nuclear membrane breaks down and chromosomes condense.', marks: 1, ms: 'Prophase (1).' },
  { l: 'b', q: '18 out of 120 cells are in mitosis. The cell cycle takes 22 hours. Calculate the time spent in mitosis.', marks: 2, ms: '18 ÷ 120 = 0.15 (1); 0.15 × 22 = 3.3 hours (1).' },
  { l: 'c', q: 'Explain why the daughter cells are genetically identical.', marks: 2, ms: 'DNA / chromosomes copied before division (1); each cell receives one copy of every chromosome / identical sets (1).' },
  { l: 'd', q: 'Describe the role of meristems in plant growth.', marks: 2, ms: 'Cells divide by mitosis (1); new cells elongate / differentiate into specialised cells (1).' },
  { l: 'e', q: 'Explain how an impulse crosses a synapse.', marks: 3, ms: 'Neurotransmitter released (1); diffuses across the gap (1); binds to receptors on the next neurone, starting an impulse (1).', h: 1.2 },
  { l: 'f', q: 'Explain why touching a hot pan causes a faster response than catching a ball.', marks: 3, ms: 'Touching a hot pan is a reflex (1); impulse passes through a relay neurone in the spinal cord, not the conscious brain (1); fewer synapses / shorter pathway (1).', h: 1.2 },
], 13, { subtitle: 'Specification 2.1–2.5, 2.13–2.14 • answer every part • 13 marks' }), 'Full question');

// ======================= 35–36 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the stage of mitosis in which a new nuclear membrane forms.', marks: 1, ms: 'Telophase (1).' },
  { n: '2', q: 'One cell divides **4** times. How many cells are there? Show your working.', marks: 2, ms: '2⁴ (1); = 16 (1).' },
  { n: '3', q: 'Describe the function of the **cerebellum** and the **medulla oblongata**.', marks: 2, ms: 'Cerebellum: coordinates movement / balance (1); medulla: unconscious activities e.g. heart / breathing rate (1).' },
  { n: '4', q: 'Explain what is meant by a **stem cell**.', marks: 2, ms: 'Unspecialised cell (1); can divide and differentiate into specialised cells (1).' },
  { n: '5', q: 'Describe how a **cataract** affects vision and how it is treated.', marks: 3, ms: 'Lens becomes cloudy (1); vision blurred / colours faded (1); lens replaced with an artificial lens (1).' },
  { n: '6', q: 'Discuss the benefits and risks of using **stem cells** in medicine.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Stem cells are unspecialised and can differentiate into specialised cells.',
    'Embryonic stem cells can become any cell type; adult stem cells (e.g. bone marrow) only some types.',
    'Benefit: could replace damaged or diseased cells, e.g. nerve cells after spinal injury, insulin-making cells for type 1 diabetes.',
    'Benefit: bone marrow transplants already treat leukaemia; could reduce need for organ donors.',
    'Risk: stem cells may divide uncontrollably and form tumours / cancer.',
    'Risk: rejection by the immune system; cells may carry viruses.',
    'Ethical issues: embryos destroyed; religious/moral objections; embryos could become a person.',
    'Conclusion weighing up benefits and risks.',
  ], 'Level 3 answers include benefits AND risks (including ethics) and reach a reasoned conclusion.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 16);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 5); assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7);
assert(D.slideNo >= 36 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T2_CellsControl.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
