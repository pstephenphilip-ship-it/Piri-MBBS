// build_T3.js — Edexcel GCSE Biology 1BI0 Topic 3 Genetics (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T3.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_bio_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 3,
  title: 'Genetics',
  shortTitle: 'T3',
  subtitle: 'Meiosis, DNA, protein synthesis, inheritance, variation and mutation',
  specRange: '3.1B–3.23',
  pOnly: [],
  paper: 'Paper 1',
  keywords: ['Meiosis', 'DNA', 'Protein synthesis', 'Inheritance', 'Variation', 'Mutation'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
calc('bases: A 20% → T', 20, 20);
calc('bases: G = C = (100 − 40) / 2', (100 - 2 * 20) / 2, 30, 1e-12);
calc('YT bases: C 35% → A', (100 - 2 * 35) / 2, 15, 1e-12);
calc('YT bases: T 28% → G', (100 - 2 * 28) / 2, 22, 1e-12);
calc('bases for 150 amino acids', 150 * 3, 450);
calc('amino acids from 900 bases', 900 / 3, 300);
// Punnett squares
const cross = (p1, p2) => { const o = []; for (const a of p1) for (const b of p2) o.push([a, b].sort().join('')); return o; };
const frac = (arr, f) => arr.filter(f).length / arr.length;
const Bb_Bb = cross('Bb', 'Bb');
calc('Bb × Bb recessive bb', frac(Bb_Bb, g => g === 'bb'), 0.25, 1e-12);
calc('Bb × Bb dominant phenotype', frac(Bb_Bb, g => g.includes('B')), 0.75, 1e-12);
calc('Bb × Bb heterozygous', frac(Bb_Bb, g => g === 'Bb'), 0.5, 1e-12);
const Bb_bb = cross('Bb', 'bb');
calc('Bb × bb recessive', frac(Bb_bb, g => g === 'bb'), 0.5, 1e-12);
const Ff = cross('Ff', 'Ff');
calc('CF Ff × Ff affected', frac(Ff, g => g === 'ff'), 0.25, 1e-12);
calc('two children both affected 1/4 × 1/4 (%)', 0.25 * 0.25 * 100, 6.25, 1e-12);
calc('carrier among unaffected (2/3)', frac(Ff, g => g === 'Ff') / frac(Ff, g => g !== 'ff'), 2 / 3, 1e-12);
const XY = cross(['X', 'X'], ['X', 'Y']);
calc('boy probability', frac(XY, g => g.includes('Y')), 0.5, 1e-12);
// sex-linked: carrier mother XHXh × normal father XHY
const SL = []; for (const m of ['XH', 'Xh']) for (const f of ['XH', 'Y']) SL.push(m + f);
calc('haemophilia: all children affected', frac(SL, g => g === 'XhY'), 0.25, 1e-12);
calc('haemophilia: sons affected', SL.filter(g => g === 'XhY').length / SL.filter(g => g.includes('Y')).length, 0.5, 1e-12);
calc('haemophilia: daughters carriers', SL.filter(g => g === 'XhXH').length / SL.filter(g => !g.includes('Y')).length, 0.5, 1e-12);
// ABO: IAIO × IBIO
const ABO = []; for (const a of ['A', 'O']) for (const b of ['B', 'O']) ABO.push(a + b);
const grp = g => (g.includes('A') && g.includes('B') ? 'AB' : g.includes('A') ? 'A' : g.includes('B') ? 'B' : 'O');
['A', 'B', 'AB', 'O'].forEach(x => calc('ABO ' + x, frac(ABO, g => grp(g) === x), 0.25, 1e-12));
const ABO2 = []; for (const a of ['A', 'A']) for (const b of ['B', 'O']) ABO2.push(a + b);
calc('YT IAIA × IBIO: AB', frac(ABO2, g => grp(g) === 'AB'), 0.5, 1e-12);
// Mendel ratios
calc('Mendel tall:short 787/277', sf(787 / 277, 3), 2.84, 1e-12);
calc('Mendel round:wrinkled 5474/1850', sf(5474 / 1850, 3), 2.96, 1e-12);
calc('Mendel yellow:green 6022/2001', sf(6022 / 2001, 3), 3.01, 1e-12);
calc('expected 3:1 out of 400', 400 * 0.75, 300, 1e-12);
calc('offspring 92:31 ratio', sf(92 / 31, 3), 2.97, 1e-12);
// variation
const HEIGHT = x => 30 * Math.exp(-((x - 165) ** 2) / (2 * 8 * 8));
calc('height curve peak at mean', HEIGHT(165), 30, 1e-12);
calc('recap % 3/4', 0.75 * 100, 75, 1e-12);
calc('HW Tt × tt short %', frac(cross('Tt', 'tt'), g => g === 'tt') * 100, 50, 1e-12);

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

const BASE = { A: 'E74C3C', T: 'F1C40F', G: '27AE60', C: '3498DB' };
const PAIR = { A: 'T', T: 'A', G: 'C', C: 'G' };
function helix(s, x0, x1, yc, amp, seq) {
  const n = seq.length, pts1 = [], pts2 = [];
  for (let i = 0; i <= 60; i++) { const x = x0 + (x1 - x0) * i / 60, ph = (i / 60) * Math.PI * 2 * 1.5; pts1.push([x, yc - amp * Math.cos(ph)]); pts2.push([x, yc + amp * Math.cos(ph)]); }
  for (let i = 0; i < n; i++) {
    const t = (i + 0.5) / n, x = x0 + (x1 - x0) * t, ph = t * Math.PI * 2 * 1.5, y1 = yc - amp * Math.cos(ph), y2 = yc + amp * Math.cos(ph);
    const ym = (y1 + y2) / 2;
    line(s, x, y1, x, ym, BASE[seq[i]], 4.5); line(s, x, ym, x, y2, BASE[PAIR[seq[i]]], 4.5);
  }
  polyline(s, pts1, '555555', 3); polyline(s, pts2, '8E44AD', 3);
}
function nucleotide(s, x, y, b, k = 1) {
  ball(s, x, y, 0.16 * k, 'F7D9A8', 'B5782E', 1.25);
  label(s, x - 0.16 * k, y - 0.1, 0.32 * k, 'P', { size: 9, bold: true, h: 0.2 });
  line(s, x + 0.16 * k, y, x + 0.35 * k, y + 0.15 * k, '555555', 1.5);
  poly(s, [[x + 0.35 * k, y + 0.0], [x + 0.65 * k, y + 0.0], [x + 0.75 * k, y + 0.25 * k], [x + 0.5 * k, y + 0.45 * k], [x + 0.25 * k, y + 0.25 * k]], 'E8E3F5', '6A4C93', { lw: 1.25 });
  label(s, x + 0.3 * k, y + 0.08, 0.4 * k, 'S', { size: 9, bold: true, h: 0.2 });
  line(s, x + 0.75 * k, y + 0.25 * k, x + 0.95 * k, y + 0.25 * k, '555555', 1.5);
  box(s, x + 0.95 * k, y + 0.08 * k, 0.55 * k, 0.34 * k, BASE[b], '555555', { lw: 1 });
  label(s, x + 0.95 * k, y + 0.08 * k, 0.55 * k, b, { size: 11, bold: true, h: 0.34 * k });
}
// Punnett square: top = gametes of parent 1, left = gametes of parent 2
function punnett(s, x, y, c, top, left, inner, o = {}) {
  const hl = o.hl || (() => false);
  box(s, x, y, c, c, C.white, null);
  top.forEach((g, i) => { box(s, x + c * (i + 1), y, c, c, 'E3F2E8', C.line); label(s, x + c * (i + 1), y, c, g, { size: o.size || 15, bold: true, color: C.blue, h: c }); });
  left.forEach((g, j) => { box(s, x, y + c * (j + 1), c, c, 'FBE9E7', C.line); label(s, x, y + c * (j + 1), c, g, { size: o.size || 15, bold: true, color: C.red, h: c }); });
  for (let i = 0; i < top.length; i++) for (let j = 0; j < left.length; j++) {
    const g = inner[j][i];
    box(s, x + c * (i + 1), y + c * (j + 1), c, c, hl(g) ? C.cream : C.white, '555555', { lw: 1 });
    label(s, x + c * (i + 1), y + c * (j + 1), c, g, { size: o.size || 15, bold: true, h: c });
  }
}
// pedigree person; sex 'M' square / 'F' circle
function person(s, x, y, sex, aff, o = {}) {
  const r = o.r || 0.19;
  const st = { fill: { color: aff ? '2F4858' : C.white }, line: { color: '2F4858', width: 1.5 } };
  if (sex === 'M') s.addShape(SH.RECTANGLE, Object.assign({ x: x - r, y: y - r, w: 2 * r, h: 2 * r }, st));
  else s.addShape(SH.OVAL, Object.assign({ x: x - r, y: y - r, w: 2 * r, h: 2 * r }, st));
  if (o.carrier) ball(s, x, y, r * 0.38, '2F4858', '2F4858');
  if (o.n) label(s, x - 0.3, y + r + 0.02, 0.6, String(o.n), { size: 9.5, color: C.grey, h: 0.2 });
}
function meiosisCell(s, cx, cy, w, h, chroms) {
  oval(s, cx, cy, w, h, CELL[0], CELL[1], { lw: 1.75 });
  chroms.forEach(([dx, col, x2], i) => (x2 ? xchrom(s, cx + dx, cy, col, 0.85) : chromatid(s, cx + dx, cy, col, 0.85)));
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Genetics',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • Core Practical 3.5 (extracting DNA)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and BIOLOGY ONLY slides are marked' },
    { icon: '3', text: 'Topic 3 of 9 • assessed on Paper 1' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Biology 1BI0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 3 Genetics. Paper 1. Higher only (HT pill): 3.8B, 3.9B (genetic variants) and 3.18B (sex-linked inheritance). Biology only (BIOLOGY ONLY pill): 3.1B, 3.6B, 3.7B, 3.8B, 3.9B, 3.10B, 3.17B, 3.18B. Core Practical 3.5 extracting DNA from fruit. Numbering of 3.11–3.16 is low-medium confidence: see SPEC_T3.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '3.1B–3.2', text: 'Compare **asexual and sexual** reproduction; explain **meiosis**.' },
  { code: '3.3–3.5', text: 'Describe the structure of **DNA**, **genes** and the **genome**; **extract DNA** (Core Practical).' },
  { code: '3.6B–3.7B', text: 'Explain how DNA codes for **proteins**: **transcription** and **translation**.' },
  { code: '3.8B–3.9B', text: 'Explain how **genetic variants** in DNA affect the **phenotype**.', ht: true },
  { code: '3.10B–3.12', text: 'Describe **Mendel**’s work; use **alleles**, **genotype**, **phenotype** and the other key terms.' },
  { code: '3.13–3.16', text: 'Use **Punnett squares** and **pedigrees**; determine **sex**; calculate **probabilities**.' },
  { code: '3.17B–3.18B', text: 'Explain **ABO blood groups** and **sex-linked** disorders.', ht: true },
  { code: '3.19–3.23', text: 'Explain **variation**, the **Human Genome Project** and **mutations**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT = 3.8B, 3.9B, 3.18B. B suffix = biology only. 3.17B (ABO) is biology only but both tiers.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 3 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['3.1B', 'Asexual vs sexual reproduction', 'BIOLOGY ONLY'],
    ['3.2–3.5', 'Meiosis, DNA, genome; CP extracting DNA', 'BOTH COURSES'],
    ['3.6B–3.10B', 'Protein synthesis, variants (HT), Mendel', 'BIOLOGY ONLY'],
    ['3.11–3.16', 'Alleles, Punnett squares, pedigrees, sex', 'BOTH COURSES'],
    ['3.17B', 'ABO blood groups', 'BIOLOGY ONLY'],
    ['3.18B', 'Sex-linked inheritance (HT)', 'BIOLOGY ONLY'],
    ['3.19–3.23', 'Variation, Human Genome Project, mutation', 'BOTH COURSES'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 3\nGenetics', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'BIOLOGY ONLY' ? 'E3F2E8' : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, tg === 'BIOLOGY ONLY' ? C.blue : C.grey, 1.25);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 2 mitosis • Topic 4 natural selection and genetic modification', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 3 is tested on **Paper 1** (1 h 45 min, 100 marks).',
      'Combined Science 1SC0 tests the statements **without** a B.',
      'Maths: **ratios**, **probabilities** and **percentages** from Punnett squares and pedigrees.',
      '**Core Practical 3.5**: extracting DNA from fruit.',
    ], { size: 11.5, color: 'E6F4EA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**BIOLOGY ONLY** pill: 3.1B, 3.6B–3.10B, 3.17B, 3.18B. Combined classes skip these.',
      '**HT** pill: genetic variants (3.8B–3.9B) and sex-linked inheritance (3.18B).',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Combined Science route: skip slides 5, 14–16, 18, 25–26 (and the BIOLOGY ONLY recap questions). Foundation route: skip 16 and 26. Check H markers against the Pearson PDF.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 2 • mitosis', q: 'How many chromosomes are in a human **body** cell?' },
  { from: 'Topic 2 • mitosis', q: 'Mitosis makes two cells. Are they genetically **identical** or **different**?' },
  { from: 'Topic 1 • cells', q: 'What does **haploid** mean?' },
  { from: 'Topic 1 • cells', q: 'Name the structure where **proteins** are made.' },
  { from: 'Topic 1 • enzymes', q: 'Why does each enzyme only work on one **substrate**?' },
  { from: 'KS3 • maths', q: 'Write **1 in 4** as a fraction, a decimal and a percentage.' },
], { subtitle: 'Recall from Topics 1–2 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. 46 (23 pairs).\n2. Identical.\n3. One set of chromosomes (23 in humans).\n4. Ribosomes.\n5. The active site has a specific shape that only fits one substrate.\n6. 1/4, 0.25, 25%.' }), 'Retrieval starter');

// ======================= 5 ASEXUAL vs SEXUAL (B) =======================
reg(D.contentSlide({
  title: 'Asexual and sexual reproduction',
  subtitle: 'Specification 3.1B • advantages and disadvantages',
  tag: '3.1B', p: true, caption: 'one parent (left) or two parents (right)',
  draw: (s, p) => {
    label(s, 0.6, 1.4, 2.8, '**Asexual**', { size: 13, color: C.blue });
    ball(s, 2.0, 2.2, 0.35, 'B9D3EE', '2F5F8F', 1.5);
    arrow(s, 2.0, 2.6, 2.0, 3.1, C.ink, 1.5); label(s, 2.05, 2.65, 1.2, 'mitosis', { size: 10, italic: true, align: 'left' });
    [1.2, 2.0, 2.8].forEach(x => ball(s, x, 3.5, 0.3, 'B9D3EE', '2F5F8F', 1.5));
    label(s, 0.6, 3.95, 2.8, 'clones: **identical**', { size: 11 });
    label(s, 3.6, 1.4, 2.8, '**Sexual**', { size: 13, color: C.red });
    ball(s, 4.3, 2.2, 0.32, 'B9D3EE', '2F5F8F', 1.5); ball(s, 5.7, 2.2, 0.32, 'F7C6CB', C.red, 1.5);
    arrow(s, 4.5, 2.5, 4.9, 3.0, C.ink, 1.5); arrow(s, 5.5, 2.5, 5.1, 3.0, C.ink, 1.5);
    label(s, 4.2, 2.6, 1.6, 'gametes', { size: 10, italic: true });
    [4.3, 5.0, 5.7].forEach((x, i) => ball(s, x, 3.5, 0.3, ['D8C4E8', 'C9D9EE', 'EBCBD8'][i], '6A4C93', 1.5));
    label(s, 3.6, 3.95, 2.8, 'offspring: **varied**', { size: 11 });
    D.card(s, 0.75, 4.45, 5.5, 1.3, null, ['Examples: bacteria, strawberry runners, potato tubers (asexual); humans, flowering plants (sexual).'], { size: 11, fill: C.white });
  },
  head: 'Comparing them',
  lines: [
    '**Asexual +**: only **one parent** needed; **fast**; no energy spent finding a mate; good when conditions are stable.',
    '**Asexual −**: **no variation**: if conditions change, or a disease spreads, the whole population may die.',
    '**Sexual +**: **variation** in offspring, so some may survive a change in the environment (natural selection).',
    '**Sexual −**: needs **two parents**; slower; uses time and energy to find a mate.',
  ],
  worked: { head: 'Apply', q: 'Strawberry farmers grow plants from runners. Explain one risk.',
    steps: [['Method', 'runners are asexual: clones'], ['Problem', 'no variation between plants'], ['Risk', 'one disease could affect all plants'], ['Answer', 'whole crop could be lost']] },
  qc: 'Give **one** advantage of asexual reproduction and **one** advantage of sexual reproduction.',
  notes: 'QUICK CHECK ANSWER: asexual: only one parent / fast / no mate needed (1); sexual: variation, so better able to survive change (1).\nSpec 3.1B (biology only).',
}), '3.1B Asexual vs sexual (BIOLOGY ONLY)');

// ======================= 6 MEIOSIS =======================
reg(D.contentSlide({
  title: 'Meiosis',
  subtitle: 'Specification 3.2 • making genetically different haploid gametes',
  tag: '3.2', caption: 'two pairs of chromosomes shown; red = from mother, blue = from father',
  draw: (s, p) => {
    meiosisCell(s, 3.5, 1.95, 1.5, 0.95, [[-0.35, CHR[0], 1], [-0.12, CHR[1], 1], [0.12, CHR[0], 1], [0.35, CHR[1], 1]]);
    label(s, 4.35, 1.75, 2.2, '**diploid** cell; DNA copied', { size: 10.5, align: 'left' });
    arrow(s, 3.1, 2.45, 2.0, 2.9, C.ink, 1.5); arrow(s, 3.9, 2.45, 5.0, 2.9, C.ink, 1.5);
    label(s, 0.6, 2.4, 2.2, '**division 1**: pairs separate', { size: 10, align: 'left', color: C.blue });
    meiosisCell(s, 1.75, 3.35, 1.3, 0.85, [[-0.15, CHR[0], 1], [0.15, CHR[1], 1]]);
    meiosisCell(s, 5.25, 3.35, 1.3, 0.85, [[-0.15, CHR[1], 1], [0.15, CHR[0], 1]]);
    [[1.75, 1.1], [1.75, 2.4], [5.25, 4.6], [5.25, 5.9]].forEach(([fx, tx]) => arrow(s, fx, 3.8, tx * 0.85 + 0.15, 4.35, C.ink, 1.25));
    label(s, 2.5, 3.85, 2.0, '**division 2**: chromatids separate', { size: 10, color: C.blue, h: 0.45 });
    const g = [[1.1, [[-0.08, CHR[0]], [0.08, CHR[1]]]], [2.2, [[-0.08, CHR[0]], [0.08, CHR[1]]]], [4.0, [[-0.08, CHR[1]], [0.08, CHR[0]]]], [5.1, [[-0.08, CHR[1]], [0.08, CHR[0]]]]];
    g.forEach(([cx, ch]) => meiosisCell(s, cx, 4.75, 0.75, 0.62, ch));
    label(s, 0.6, 5.15, 5.8, '**four haploid gametes**, genetically different', { size: 11 });
  },
  head: 'Key points',
  lines: [
    'Meiosis happens in the **testes** and **ovaries**.',
    'The DNA is **copied**, then the cell divides **twice**.',
    'It makes **four** daughter cells, each with **half** the number of chromosomes (**haploid**: 23 in humans).',
    'Each gamete gets a **random mix** of chromosomes, so the gametes are **genetically different**.',
    'At fertilisation two haploid gametes fuse to make a **diploid** zygote (46).',
  ],
  worked: { head: 'Exam technique', q: 'Explain why gametes need to be haploid.',
    steps: [['Fuse', 'two gametes join at fertilisation'], ['Number', '23 + 23 = 46'], ['Result', 'zygote has the normal diploid number'], ['Answer', 'chromosome number does not double each generation']] },
  qc: 'How many cells does meiosis make, and how many chromosomes does each human gamete have?',
  notes: 'QUICK CHECK ANSWER: four (1); 23 (1).\nSpec 3.2. Diagram simplified: crossing over is not required at GCSE.',
}), '3.2 Meiosis');

// ======================= 7 MITOSIS vs MEIOSIS =======================
{
  const s = D.contentHeader('Comparing mitosis and meiosis', 'Specification 3.2 • link to Topic 2', { tag: '3.2' });
  const rows = [[HDR(''), HDR('Mitosis'), HDR('Meiosis')], ...[
    ['Number of divisions', 'one', 'two'],
    ['Cells made', '2', '4'],
    ['Chromosome number', 'diploid (46)', 'haploid (23)'],
    ['Genetically', 'identical to the parent', 'different from each other and the parent'],
    ['Where', 'all body cells', 'testes and ovaries only'],
    ['Used for', 'growth, repair, asexual reproduction', 'making gametes for sexual reproduction'],
  ].map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i)])];
  table(s, rows, { x: 0.45, y: 1.3, w: 7.4, colW: [2.1, 2.5, 2.8], rowH: 0.66, fontSize: 12.5 });
  D.workedSteps(s, 8.1, 1.3, 4.78, 4.95, 'Exam technique: compare', 'Compare mitosis and meiosis. (4 marks)', [
    ['Point 1', 'mitosis: 2 cells; meiosis: 4 cells'],
    ['Point 2', 'mitosis: diploid; meiosis: haploid'],
    ['Point 3', 'mitosis: identical; meiosis: varied'],
    ['Point 4', 'mitosis: one division; meiosis: two'],
    ['Answer', 'use "whereas" in each point'],
  ], { size: 12 });
  D.quickCheck(s, 'A cell with **46** chromosomes divides by **meiosis**. How many chromosomes are in each new cell?');
  D.notes(s, 'QUICK CHECK ANSWER: 23.\nSpec 3.2 with Topic 2.1–2.3. Compare questions need both sides in each point.');
  reg(s, '3.2 Mitosis vs meiosis');
}

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 3.1B–3.2 • reproduction and meiosis', [
  { q: 'Give **one** disadvantage of asexual reproduction.', marks: 1, ms: 'No variation, so the population may not survive a change in the environment / disease (1).' },
  { q: 'Describe **two** differences between the cells made by mitosis and those made by meiosis.', marks: 2, ms: 'Mitosis: diploid, meiosis: haploid (1); mitosis: genetically identical, meiosis: genetically different (1). Also 2 vs 4 cells.' },
  { q: 'Explain why meiosis is important for sexual reproduction.', marks: 3, ms: 'Makes haploid gametes (1); so the zygote formed at fertilisation is diploid / has 46 (1); gametes are genetically different, giving variation (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 DNA STRUCTURE =======================
reg(D.contentSlide({
  title: 'The structure of DNA',
  subtitle: 'Specification 3.3 • a polymer of nucleotides',
  tag: '3.3', caption: 'double helix (top) and one nucleotide (bottom)',
  draw: (s, p) => {
    helix(s, 0.8, 6.2, 2.55, 0.65, 'ATGCCGTAAGCTTAGC');
    label(s, 0.7, 3.3, 5.6, 'two strands twisted into a **double helix**', { size: 11 });
    nucleotide(s, 1.3, 4.25, 'A', 1.3);
    callout(s, 3.75, 4.0, 2.2, 'phosphate (P)', 1.3, 4.04, 'B5782E', { size: 10.5 });
    callout(s, 3.75, 4.55, 2.2, 'sugar (S)', 2.15, 4.55, '6A4C93', { size: 10.5 });
    callout(s, 3.75, 5.1, 2.2, 'base (A, T, C or G)', 3.3, 4.6, '555555', { size: 10.5 });
    [['A', 0], ['T', 1], ['G', 2], ['C', 3]].forEach(([b, i]) => { box(s, 0.8 + i * 0.55, 5.35, 0.45, 0.3, BASE[b], '555555', { lw: 0.75 }); label(s, 0.8 + i * 0.55, 5.35, 0.45, b, { size: 10, bold: true, h: 0.3 }); });
  },
  head: 'DNA is…',
  lines: [
    'A **polymer** made of repeating units called **nucleotides**.',
    'Each nucleotide = a **sugar**, a **phosphate** group and one of **four bases**: **A, T, C, G**.',
    'Two strands are coiled to form a **double helix**.',
    'The strands are linked by **complementary base pairs**: **A–T** and **C–G**, joined by **weak hydrogen bonds**.',
  ],
  worked: { head: 'Complementary strand', q: 'Write the strand that pairs with A T G C C G.',
    steps: [['Rule', 'A pairs with T; C pairs with G'], ['Pair', 'A→T, T→A, G→C, C→G, C→G, G→C'], ['Answer', 'T A C G G C']] , size: 11 },
  workedH: 1.9,
  qc: 'What holds the two strands of DNA together? Which base pairs with **G**?',
  notes: 'QUICK CHECK ANSWER: (weak) hydrogen bonds between complementary bases (1); C / cytosine (1).\nSpec 3.3. Full base names (adenine, thymine, cytosine, guanine) are useful but letters are accepted.',
}), '3.3 DNA structure');

// ======================= 10 BASE PAIRING MATHS =======================
{
  const s = D.contentHeader('Practice: base pairing', 'Specification 3.3 • complementary bases mean A = T and C = G', { tag: '3.3' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'In a DNA sample, **20%** of the bases are **A**. Find the % of T, C and G.',
    [['Pair', 'A pairs with T, so **T = 20%**'], ['Left', '100 − 20 − 20 = 60%'], ['Split', 'C = G, so 60 ÷ 2'], ['Answer', '**T 20%, C 30%, G 30%**']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Write the complementary strand to **G G A T C A**.',
    '**2** **35%** of the bases are **C**. Calculate the % of **A**.',
    '**3** **28%** of the bases are **T**. Calculate the % of **G**.',
    '**4** Explain why the amount of A always equals the amount of T in double-stranded DNA.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Which base pairs with **A**, and which with **C**?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) C C T A G T. 2) G = 35%, so A = T = (100 − 70) ÷ 2 = 15%. 3) A = 28%, so G = C = (100 − 56) ÷ 2 = 22%. 4) every A on one strand pairs with a T on the other (complementary base pairing).\nQUICK CHECK: T; G.');
  reg(s, '3.3 Practice: base pairing');
}

// ======================= 11 GENOME & GENE =======================
reg(D.contentSlide({
  title: 'Genes and the genome',
  subtitle: 'Specification 3.4 • from cell to base',
  tag: '3.4', caption: 'zooming in: nucleus → chromosome → gene → DNA bases',
  draw: (s, p) => {
    oval(s, 1.3, 2.7, 1.5, 1.2, CELL[0], CELL[1], { lw: 1.5 }); ball(s, 1.3, 2.7, 0.35, NUC[0], NUC[1], 1);
    label(s, 0.55, 3.35, 1.5, '**cell**', { size: 10.5 });
    line(s, 1.65, 2.6, 2.5, 1.9, C.grey, 1, { dash: 'dash' }); line(s, 1.65, 2.8, 2.5, 3.5, C.grey, 1, { dash: 'dash' });
    box(s, 2.6, 1.85, 0.32, 1.7, 'F2B8BC', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.4, lw: 1.5 });
    box(s, 2.6, 2.35, 0.32, 0.35, '8E2A33', '8E2A33');
    label(s, 2.15, 3.6, 1.3, '**chromosome**', { size: 10.5 });
    line(s, 2.93, 2.35, 3.7, 1.75, C.grey, 1, { dash: 'dash' }); line(s, 2.93, 2.7, 3.7, 3.3, C.grey, 1, { dash: 'dash' });
    helix(s, 3.8, 6.2, 2.5, 0.5, 'GCATTAGC');
    label(s, 3.9, 3.25, 2.3, '**gene** = a section of DNA', { size: 10.5 });
    D.card(s, 0.75, 4.15, 5.5, 1.55, null, [
      'The human genome has about **3 billion** base pairs and about **20 000** genes.',
      'Each gene codes for one specific **protein**.',
    ], { size: 11, fill: C.white });
  },
  head: 'Definitions',
  lines: [
    '**Genome**: the **entire DNA** of an organism.',
    '**Gene**: a **section of a DNA molecule** that **codes for a specific protein**.',
    '**Chromosome**: a long, coiled molecule of DNA carrying many genes.',
    'Proteins (e.g. enzymes, haemoglobin, keratin) control the **characteristics** of an organism.',
  ],
  worked: { head: 'Order these', q: 'Put in order of size, largest first: gene, nucleus, genome, base.',
    steps: [['Largest', 'genome (all the DNA)'], ['Then', 'nucleus contains it; chromosome'], ['Then', 'gene; then a single base'], ['Answer', 'genome → chromosome → gene → base']] },
  qc: 'Define **gene** and **genome**.',
  notes: 'QUICK CHECK ANSWER: gene: a section of DNA that codes for a specific protein (1); genome: all the DNA of an organism (1).\nSpec 3.4. Ordering task: the nucleus holds the genome in eukaryotes; accept sensible orders.',
}), '3.4 Genes and the genome');

// ======================= 12 CP DNA EXTRACTION =======================
reg(D.contentSlide({
  title: 'Core Practical: extracting DNA from fruit',
  subtitle: 'Specification 3.5 • strawberries or kiwi fruit',
  tag: '3.5', cp: true, caption: 'DNA collects where the ice-cold ethanol meets the filtrate',
  draw: (s, p) => {
    box(s, 2.6, 1.6, 1.6, 3.6, C.white, '555555', { lw: 1.75 });
    box(s, 2.64, 1.95, 1.52, 1.3, 'EAF3FB', 'EAF3FB');
    box(s, 2.64, 3.25, 1.52, 1.91, 'F5C6CB', 'F5C6CB');
    for (let i = 0; i < 9; i++) polyline(s, [[2.8 + i * 0.15, 3.25], [2.85 + i * 0.15, 3.0], [2.78 + i * 0.15, 2.75]], 'F7F7F7', 2.5);
    line(s, 2.64, 3.25, 4.16, 3.25, 'D9A0A8', 1);
    label(s, 4.35, 2.2, 2.0, '**ice-cold ethanol**', { size: 11, align: 'left', color: '2F5F8F' });
    label(s, 4.35, 2.8, 2.0, '**white strands of DNA**', { size: 11, align: 'left' });
    line(s, 4.3, 2.95, 3.6, 3.0, C.grey, 1);
    label(s, 4.35, 3.9, 2.1, '**fruit filtrate** (detergent + salt)', { size: 11, align: 'left', color: C.red, h: 0.5 });
    label(s, 0.6, 2.2, 1.9, 'pour the ethanol slowly down the side', { size: 10, italic: true, h: 0.6, align: 'left' });
  },
  head: 'Method',
  lines: [
    '**Mash** the fruit with a solution of **detergent** and **salt**.',
    '**Detergent** breaks down the **cell and nuclear membranes**; **salt** makes the DNA clump together.',
    'Warm in a **water bath at about 60 °C** for 15 min (denatures enzymes that break down DNA), then cool in ice.',
    '**Filter** the mixture. Gently pour **ice-cold ethanol** down the side of the tube.',
    'DNA is **insoluble** in cold ethanol, so it **precipitates** as white strands; lift it out with a glass rod.',
  ],
  worked: { head: 'Explain a step', q: 'Why is the ethanol ice-cold?', steps: [['Idea', 'DNA is less soluble in cold ethanol'], ['Answer', 'more DNA precipitates out']], size: 11 },
  workedH: 1.4,
  qc: 'What is the job of the **detergent**? What is the job of the **salt**?',
  notes: 'QUICK CHECK ANSWER: detergent breaks down / dissolves the (lipid) membranes to release the DNA (1); salt makes the DNA strands clump together (1).\nCP 3.5. Some methods add protease (e.g. pineapple juice) to break down proteins around the DNA. Safety: ethanol is flammable; no naked flames.',
}), '3.5 CP: extracting DNA');

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 3.3–3.5 • DNA, genes and the Core Practical', [
  { q: 'Describe the structure of a **nucleotide**.', marks: 2, ms: 'Sugar and phosphate (1); one of four bases attached to the sugar (1).' },
  { q: 'A DNA sample has 18% G. Calculate the % of A.', marks: 2, ms: 'C = 18%, so 100 − 36 = 64 (1); A = 64 ÷ 2 = 32% (1).' },
  { q: 'Explain why ice-cold ethanol is added in DNA extraction.', marks: 2, ms: 'DNA is insoluble in (cold) ethanol (1); so it precipitates / comes out of solution and can be seen / collected (1).' },
]);
calc('R2 G 18% → A', (100 - 2 * 18) / 2, 32, 1e-12);
reg(R2.s, 'Recap 2');

// ======================= 14 BASES → PROTEIN (B) =======================
reg(D.contentSlide({
  title: 'How DNA codes for proteins',
  subtitle: 'Specification 3.6B • the order of bases decides the order of amino acids',
  tag: '3.6B', p: true, caption: 'three bases = one amino acid',
  draw: (s, p) => {
    const seq = 'TACGGATTC';
    for (let i = 0; i < 9; i++) { box(s, 0.95 + i * 0.55, 1.7, 0.5, 0.45, BASE[seq[i]], '555555', { lw: 0.75 }); label(s, 0.95 + i * 0.55, 1.7, 0.5, seq[i], { size: 12, bold: true, h: 0.45 }); }
    for (let t = 0; t < 3; t++) { line(s, 0.95 + t * 1.65, 2.3, 0.95 + t * 1.65 + 1.6, 2.3, C.ink, 2); }
    label(s, 0.7, 2.35, 5.6, 'each **triplet** of bases codes for one amino acid', { size: 10.5 });
    ['8E44AD', 'E67E22', '16A085'].forEach((c, i) => { ball(s, 1.75 + i * 1.65, 3.2, 0.3, c, C.white, 1.5); if (i) line(s, 1.75 + (i - 1) * 1.65 + 0.3, 3.2, 1.75 + i * 1.65 - 0.3, 3.2, C.ink, 2); });
    label(s, 0.7, 3.55, 5.6, 'amino acids joined in a chain', { size: 10.5 });
    arrow(s, 3.5, 3.9, 3.5, 4.3, C.ink, 1.5);
    polyline(s, [[1.5, 4.9], [2.0, 4.45], [2.6, 5.1], [3.1, 4.5], [3.6, 5.2], [4.2, 4.5], [4.7, 5.05], [5.3, 4.6]], '8E44AD', 4);
    label(s, 0.7, 5.25, 5.6, 'the chain **folds** into a specific **shape**', { size: 10.5 });
  },
  head: 'From gene to protein shape',
  lines: [
    'A gene is a sequence of **bases**. Every **three bases** (a **triplet**) code for **one amino acid**.',
    'The **order of bases** decides the **order of amino acids** in the protein.',
    'The chain of amino acids **folds** into a **specific 3D shape**.',
    'The shape decides the protein’s **function**, e.g. an enzyme’s **active site** must fit its substrate.',
  ],
  worked: { head: 'Calculation', q: 'A protein has 150 amino acids. How many bases code for it?',
    steps: [['Rule', '3 bases per amino acid'], ['Work', '150 × 3'], ['Answer', '450 bases']], size: 11 },
  workedH: 1.75,
  qc: 'A gene has **900** bases. How many amino acids does it code for?',
  notes: 'QUICK CHECK ANSWER: 900 ÷ 3 = 300 amino acids.\nSpec 3.6B (biology only). Stop codons are not required.',
}), '3.6B Bases to proteins (BIOLOGY ONLY)');

// ======================= 15 PROTEIN SYNTHESIS (B) =======================
{
  const s = D.contentHeader('Protein synthesis: transcription and translation', 'Specification 3.7B • making a protein from a gene', { tag: '3.7B', p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'transcription in the nucleus (top); translation at a ribosome (bottom)');
  label(s, 0.6, 1.4, 3, '**1 Transcription** (nucleus)', { size: 11.5, align: 'left', color: C.blue });
  box(s, 0.75, 1.85, 1.0, 0.35, 'D9D9D9', '777777'); label(s, 0.75, 1.85, 1.0, 'non-coding', { size: 9, h: 0.35 });
  const dna = 'TACGGATTC';
  for (let i = 0; i < 9; i++) { box(s, 1.8 + i * 0.47, 1.85, 0.44, 0.35, BASE[dna[i]], '555555', { lw: 0.5 }); label(s, 1.8 + i * 0.47, 1.85, 0.44, dna[i], { size: 10, bold: true, h: 0.35 }); }
  oval(s, 1.75, 2.02, 0.9, 0.6, 'F5B041', 'B9770E', { tr: 65, lw: 1.5 });
  label(s, 0.6, 2.35, 1.5, 'RNA polymerase', { size: 9.5, bold: true, color: 'B9770E' });
  const mr = 'AUGCCUAAG';
  for (let i = 0; i < 9; i++) { box(s, 1.8 + i * 0.47, 2.45, 0.44, 0.35, 'FDEBD0', 'B9770E', { lw: 0.5 }); label(s, 1.8 + i * 0.47, 2.45, 0.44, mr[i], { size: 10, bold: true, h: 0.35 }); }
  label(s, 3.4, 2.82, 3.0, 'complementary **mRNA** (U instead of T)', { size: 9.5, align: 'left' });
  label(s, 0.6, 3.25, 3, '**2 Translation** (ribosome)', { size: 11.5, align: 'left', color: C.red });
  for (let i = 0; i < 9; i++) { box(s, 1.0 + i * 0.47, 4.6, 0.44, 0.35, 'FDEBD0', 'B9770E', { lw: 0.5 }); label(s, 1.0 + i * 0.47, 4.6, 0.44, mr[i], { size: 10, bold: true, h: 0.35 }); }
  oval(s, 2.65, 4.85, 2.2, 0.9, '9AA5B1', '555555', { tr: 65, lw: 1.5 });
  label(s, 3.8, 5.1, 1.2, 'ribosome', { size: 10, bold: true, color: '333333', align: 'left' });
  box(s, 2.47, 4.05, 1.36, 0.45, 'D5F5E3', '1E8449', { lw: 1.25 }); label(s, 2.47, 4.05, 1.36, 'tRNA: GGA', { size: 9.5, bold: true, h: 0.45, color: '1E8449' });
  ball(s, 3.15, 3.75, 0.2, 'E67E22', C.white, 1.25);
  ball(s, 2.55, 3.7, 0.2, '8E44AD', C.white, 1.25); line(s, 2.75, 3.72, 2.95, 3.75, C.ink, 2);
  label(s, 3.45, 3.55, 2.9, 'amino acids linked → **polypeptide**', { size: 9.5, align: 'left' });
  label(s, 0.7, 5.15, 1.8, 'codon = 3 bases', { size: 9.5, italic: true, align: 'left' });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Stages', [
    '**Transcription:** **RNA polymerase** binds to **non-coding DNA** in front of the gene.',
    'It moves along the gene, making a **complementary mRNA** strand from the coding DNA.',
    'The **mRNA** leaves the nucleus and attaches to a **ribosome**.',
    '**Translation:** each **codon** (3 bases) on the mRNA codes for one **amino acid**.',
    '**tRNA** molecules bring the matching amino acids to the ribosome.',
    'Amino acids are **joined** to form a **polypeptide**, which folds into a protein.',
  ], { size: 12 });
  D.quickCheck(s, 'Where does **transcription** happen? What is the job of **tRNA**?');
  D.notes(s, 'QUICK CHECK ANSWER: in the nucleus (1); carries / transfers specific amino acids to the ribosome (1).\nSpec 3.7B a–f (biology only). Anticodon terminology is not required but is a useful extension.');
  reg(s, '3.7B Protein synthesis (BIOLOGY ONLY)');
}

// ======================= 16 GENETIC VARIANTS (HT, B) =======================
reg(D.contentSlide({
  title: 'Genetic variants and the phenotype',
  subtitle: 'Specification 3.8B–3.9B • changes in non-coding and coding DNA',
  tag: '3.8B–3.9B', ht: true, p: true, caption: 'where a variant (change in bases) can occur',
  draw: (s, p) => {
    box(s, 0.8, 1.9, 1.6, 0.5, 'D9D9D9', '777777', { lw: 1.25 }); label(s, 0.8, 1.9, 1.6, 'non-coding DNA', { size: 10.5, bold: true, h: 0.5 });
    box(s, 2.4, 1.9, 3.8, 0.5, 'D6EAF8', '2F5F8F', { lw: 1.25 }); label(s, 2.4, 1.9, 3.8, 'coding DNA (the gene)', { size: 10.5, bold: true, h: 0.5 });
    line(s, 1.4, 1.75, 1.8, 1.75, C.red, 3); label(s, 0.8, 1.4, 1.8, 'variant 1', { size: 10, bold: true, color: C.red });
    line(s, 4.0, 1.75, 4.4, 1.75, C.red, 3); label(s, 3.4, 1.4, 1.8, 'variant 2', { size: 10, bold: true, color: C.red });
    D.card(s, 0.75, 2.7, 2.65, 3.05, 'Non-coding (3.8B)', ['RNA polymerase may bind **more or less** easily.', 'So **more or less mRNA** and **protein** is made.', 'Phenotype changes because of the **amount** of protein.'], { size: 10.5, fill: C.white });
    D.card(s, 3.55, 2.7, 2.7, 3.05, 'Coding (3.9B)', ['A changed **codon** may code for a **different amino acid**.', 'The protein **folds differently**: new **shape**.', 'e.g. an enzyme’s **active site** no longer fits: **activity** changes.'], { size: 10.5, fill: C.white });
  },
  head: 'Key ideas',
  lines: [
    'A **genetic variant** is a change in the **sequence of bases** in DNA.',
    'Variants in **non-coding** DNA affect **whether / how much** a gene is transcribed.',
    'Variants in **coding** DNA can change the **amino acid sequence**, so the protein’s **shape** and **activity** change.',
    'Many variants have **no effect** (e.g. the new codon codes for the same amino acid).',
  ],
  worked: { head: 'Exam technique', q: 'Explain how a variant in the coding DNA could stop an enzyme working.',
    steps: [['DNA', 'base sequence changed'], ['Amino acids', 'different amino acid sequence'], ['Shape', 'protein folds differently; active site changes'], ['Answer', 'substrate no longer fits']] },
  qc: 'Explain how a variant in **non-coding** DNA can change the **amount** of protein made.',
  notes: 'QUICK CHECK ANSWER: affects the binding of RNA polymerase (1); so more / less transcription / mRNA (1); so more / less protein (1).\nSpec 3.8B and 3.9B (Higher and biology only; H marker medium confidence).',
}), '3.8B–3.9B Genetic variants (HT, BIOLOGY ONLY)');

// ======================= 17 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 3.6B–3.9B • protein synthesis and variants', [
  { q: 'Describe the role of **RNA polymerase** in protein synthesis.', marks: 2, ms: 'Binds to non-coding DNA in front of the gene (1); makes a complementary mRNA strand / transcription (1).' },
  { q: 'Explain why a gene of 600 bases codes for 200 amino acids.', marks: 2, ms: 'Each amino acid coded for by three bases / a triplet / codon (1); 600 ÷ 3 = 200 (1).' },
  { q: 'Explain how a change in a gene could change the activity of a protein.', marks: 3, ht: true, ms: 'Different base sequence → different amino acid sequence (1); protein folds into a different shape (1); e.g. active site changes so it no longer fits the substrate (1).' },
]);
calc('R3 600/3', 600 / 3, 200);
reg(R3.s, 'Recap 3');

// ======================= 18 MENDEL (B) =======================
reg(D.contentSlide({
  title: 'Mendel’s work',
  subtitle: 'Specification 3.10B • the start of genetics',
  tag: '3.10B', p: true, caption: 'Mendel’s pea plant results (1860s)',
  draw: (s, p) => {
    const rows = [[HDR('Characteristic'), HDR('Dominant'), HDR('Recessive'), HDR('Ratio')], ...[
      ['Stem height', 'tall 787', 'short 277', '2.84 : 1'],
      ['Seed shape', 'round 5474', 'wrinkled 1850', '2.96 : 1'],
      ['Seed colour', 'yellow 6022', 'green 2001', '3.01 : 1'],
    ].map(([a, b, c, d], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i), tcell(d, i, { bold: true, color: C.red })])];
    table(s, rows, { x: 0.75, y: 1.6, w: 5.5, colW: [1.5, 1.4, 1.5, 1.1], rowH: 0.5, fontSize: 11.5 });
    [[1.4, 'F4D03F'], [2.0, 'F4D03F'], [2.6, 'F4D03F'], [3.2, '7DCEA0']].forEach(([x, c]) => ball(s, x, 4.15, 0.22, c, '7D6608', 1.25));
    label(s, 3.6, 3.95, 2.6, 'about **3 : 1** in every cross', { size: 12, bold: true, color: C.red, align: 'left' });
    label(s, 0.75, 4.6, 5.5, 'Mendel called the inherited units “**factors**”: we now call them **genes** (alleles).', { size: 11, h: 0.5 });
  },
  head: 'What Mendel did',
  lines: [
    'Gregor **Mendel** bred **pea plants** and counted thousands of offspring.',
    'He showed characteristics are passed on in **separate units** (genes) that are **dominant** or **recessive**.',
    'His work was **not accepted** in his lifetime: **chromosomes**, **genes** and **DNA** had not been discovered, so there was **no mechanism** to explain his results.',
    'In the early 1900s, chromosomes were seen behaving like his “factors”, and his ideas were accepted.',
  ],
  worked: { head: 'Ratio', q: 'Mendel counted 787 tall and 277 short plants. Calculate the ratio.',
    steps: [['Divide', '787 ÷ 277'], ['Work', '= 2.84'], ['Answer', '2.84 : 1, close to 3 : 1']], size: 11 },
  workedH: 1.75,
  qc: 'Suggest **one** reason why scientists did not accept Mendel’s ideas at the time.',
  notes: 'QUICK CHECK ANSWER: any one: genes / chromosomes / DNA not yet discovered; no mechanism to explain it; he was a monk, not a well-known scientist; work published in an obscure journal (1).\nSpec 3.10B (biology only). Ratios checked.',
}), '3.10B Mendel (BIOLOGY ONLY)');

// ======================= 19 KEY TERMS =======================
{
  const s = D.contentHeader('The language of genetics', 'Specification 3.11–3.12 • alleles and key terms', { tag: '3.11–3.12' });
  const terms = [
    ['Gene', 'section of DNA coding for a protein'],
    ['Allele', 'a different version of a gene, e.g. B or b'],
    ['Dominant', 'allele always expressed if present (capital: B)'],
    ['Recessive', 'only expressed with two copies (small: b)'],
    ['Homozygous', 'two identical alleles: BB or bb'],
    ['Heterozygous', 'two different alleles: Bb'],
    ['Genotype', 'the alleles present, e.g. Bb'],
    ['Phenotype', 'the characteristic shown, e.g. brown eyes'],
    ['Gamete', 'sex cell (sperm or egg); haploid'],
    ['Zygote', 'fertilised egg cell; diploid'],
    ['Chromosome', 'long DNA molecule carrying many genes'],
  ];
  const rows = [[HDR('Term'), HDR('Meaning')], ...terms.map(([a, b], i) => [tcell(a, i, { bold: true, color: C.blue }), tcell(b, i)])];
  table(s, rows, { x: 0.45, y: 1.3, w: 6.6, colW: [1.7, 4.9], rowH: 0.4, fontSize: 11.5 });
  D.card(s, 7.3, 1.3, 5.58, 2.3, 'Why alleles matter (3.11)', [
    'We all have the **same genes**, but we inherit **different alleles**, so we have different **characteristics**.',
    'You inherit **one allele** of each gene from each **parent**.',
  ], { size: 12 });
  D.workedSteps(s, 7.3, 3.75, 5.58, 2.5, 'Apply', 'Brown eyes (B) are dominant to blue (b). A person is Bb.', [['Genotype', 'Bb: heterozygous'], ['Phenotype', 'brown eyes'], ['Answer', 'carries a hidden blue allele']], { size: 12 });
  D.quickCheck(s, 'Give the genotype of someone **homozygous recessive** for eye colour. What is their phenotype?');
  D.notes(s, 'QUICK CHECK ANSWER: bb (1); blue eyes (1).\nSpec 3.11–3.12 (numbering low-medium confidence).');
  reg(s, '3.11–3.12 Key terms');
}

// ======================= 20 PUNNETT SQUARES =======================
{
  const s = D.contentHeader('Monohybrid crosses and Punnett squares', 'Specification 3.13 • predicting offspring', { tag: '3.13' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'Bb × Bb: two heterozygous brown-eyed parents');
  label(s, 0.7, 1.45, 5.6, 'Parents: **Bb** × **Bb** • gametes: **B, b** and **B, b**', { size: 12 });
  punnett(s, 1.6, 2.0, 0.85, ['B', 'b'], ['B', 'b'], [['BB', 'Bb'], ['Bb', 'bb']], { hl: g => g === 'bb' });
  label(s, 4.35, 2.4, 2.0, 'mother’s gametes', { size: 10, color: C.blue, align: 'left' });
  label(s, 0.6, 3.95, 1.0, 'father’s gametes', { size: 10, color: C.red, h: 0.5 });
  label(s, 4.35, 3.4, 2.1, '**3 brown : 1 blue**', { size: 12, align: 'left' });
  label(s, 4.35, 3.8, 2.1, 'P(blue) = 1/4 = **25%**', { size: 11, align: 'left' });
  label(s, 4.35, 4.2, 2.1, 'P(Bb) = 2/4 = **50%**', { size: 11, align: 'left' });
  D.workedSteps(s, 6.8, 1.3, 6.08, 4.95, 'Five steps', 'Two heterozygous parents have a child. What is the probability it has blue eyes?', [
    ['1 Parents', 'write the parent genotypes: Bb × Bb'],
    ['2 Gametes', 'each parent: B or b'],
    ['3 Square', 'fill in the Punnett square'],
    ['4 Offspring', 'BB, Bb, Bb, bb'],
    ['5 Answer', 'bb = 1 in 4 = 0.25 = 25%'],
  ], { size: 13 });
  D.quickCheck(s, 'Draw a Punnett square for **Bb × bb**. What percentage of offspring have **blue** eyes?');
  D.notes(s, 'QUICK CHECK ANSWER: Bb, Bb, bb, bb; 50% blue.\nSpec 3.13. Each child is an independent event: a 3:1 ratio is a probability, not a guarantee for a family of 4.');
  reg(s, '3.13 Punnett squares');
}

// ======================= 21 SEX DETERMINATION =======================
{
  const s = D.contentHeader('Sex determination', 'Specification 3.14 • X and Y chromosomes', { tag: '3.14' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'XX × XY: a 50% chance of a boy each time');
  punnett(s, 1.8, 1.75, 0.95, ['X', 'Y'], ['X', 'X'], [['XX', 'XY'], ['XX', 'XY']], { hl: g => g === 'XY', size: 16 });
  label(s, 4.75, 2.05, 1.7, 'father’s sperm', { size: 10.5, color: C.blue, align: 'left' });
  label(s, 0.55, 3.25, 1.2, 'mother’s eggs', { size: 10.5, color: C.red, h: 0.5 });
  label(s, 0.7, 4.75, 5.6, '**2 XX (girls) : 2 XY (boys)** = **1 : 1** = **50%** boys', { size: 12.5 });
  D.card(s, 6.8, 1.3, 6.08, 3.05, 'Key facts', [
    'Humans have **23 pairs** of chromosomes; **one pair** are the **sex chromosomes**.',
    'Females are **XX**; males are **XY**.',
    'All **eggs** carry an **X**. Half of **sperm** carry an **X**, half carry a **Y**.',
    'So the **sperm** decides the sex of the baby at **fertilisation**.',
  ], { size: 12 });
  D.workedSteps(s, 6.8, 4.5, 6.08, 1.75, 'Common question', 'A couple have three girls. Chance the next baby is a boy?', [['Idea', 'each fertilisation is independent'], ['Answer', 'still 50%']], { size: 12 });
  D.quickCheck(s, 'Which **gamete** decides whether a baby is a boy or a girl? Explain why.');
  D.notes(s, 'QUICK CHECK ANSWER: the sperm (1); eggs all carry X but sperm carry X or Y (1).\nSpec 3.14.');
  reg(s, '3.14 Sex determination');
}

// ======================= 22 PEDIGREES =======================
reg(D.contentSlide({
  title: 'Family pedigrees',
  subtitle: 'Specification 3.15 • tracing a recessive disorder (cystic fibrosis)',
  tag: '3.15', caption: 'filled = has cystic fibrosis; square = male, circle = female',
  draw: (s, p) => {
    const G1 = 1.9, G2 = 3.2, G3 = 4.5;
    person(s, 1.4, G1, 'M', false, { n: 1 }); person(s, 2.4, G1, 'F', false, { n: 2 }); line(s, 1.59, G1, 2.21, G1, '2F4858', 1.5);
    person(s, 4.6, G1, 'M', false, { n: 3 }); person(s, 5.6, G1, 'F', true, { n: 4 }); line(s, 4.79, G1, 5.41, G1, '2F4858', 1.5);
    line(s, 1.9, G1, 1.9, G2 - 0.5, '2F4858', 1.5); line(s, 1.4, G2 - 0.5, 2.4, G2 - 0.5, '2F4858', 1.5);
    line(s, 1.4, G2 - 0.5, 1.4, G2 - 0.19, '2F4858', 1.5); line(s, 2.4, G2 - 0.5, 2.4, G2 - 0.19, '2F4858', 1.5);
    person(s, 1.4, G2, 'F', false, { n: 5 }); person(s, 2.4, G2, 'M', false, { n: 6 });
    line(s, 5.1, G1, 5.1, G2 - 0.5, '2F4858', 1.5); line(s, 4.6, G2 - 0.5, 5.6, G2 - 0.5, '2F4858', 1.5);
    line(s, 4.6, G2 - 0.5, 4.6, G2 - 0.19, '2F4858', 1.5); line(s, 5.6, G2 - 0.5, 5.6, G2 - 0.19, '2F4858', 1.5);
    person(s, 4.6, G2, 'M', false, { n: 7 }); person(s, 5.6, G2, 'F', false, { n: 8 });
    line(s, 2.59, G2, 4.41, G2, '2F4858', 1.5);
    line(s, 3.5, G2, 3.5, G3 - 0.5, '2F4858', 1.5); line(s, 2.9, G3 - 0.5, 4.1, G3 - 0.5, '2F4858', 1.5);
    [[2.9, 'F', false, 9], [3.5, 'M', true, 10], [4.1, 'F', false, 11]].forEach(([x, sx, a, n]) => { line(s, x, G3 - 0.5, x, G3 - 0.19, '2F4858', 1.5); person(s, x, G3, sx, a, { n }); });
    label(s, 0.7, 5.05, 5.6, 'Person 10 has CF but parents 6 and 7 do **not**, so CF must be **recessive**.', { size: 10.5, h: 0.5 });
  },
  head: 'Reading pedigrees',
  lines: [
    'Cystic fibrosis is caused by a **recessive** allele (f). Affected people are **ff**.',
    'Unaffected parents with an affected child must both be **carriers** (**Ff**).',
    'Person 4 is **ff**, so all her children must get an **f** from her: person 7 is **Ff**.',
    'A dominant disorder (e.g. polydactyly) shows up in **every** generation; an affected person has at least one affected parent.',
  ],
  worked: { head: 'Deduce', q: 'What is the genotype of person 6? Explain.',
    steps: [['Child', 'person 10 is ff'], ['Inherit', '10 got one f from each parent'], ['6 is', 'unaffected, so has an F'], ['Answer', '6 is Ff (a carrier)']] },
  qc: 'Give the genotype of person **4** and person **10**.',
  notes: 'QUICK CHECK ANSWER: both ff (1).\nSpec 3.15 (numbering low-medium confidence). Persons 1 or 2 must include a carrier (6 is Ff); exact genotypes of 1 and 2 cannot be fully determined.',
}), '3.15 Family pedigrees');

// ======================= 23 PROBABILITIES =======================
{
  const s = D.contentHeader('Calculating outcomes', 'Specification 3.16 • probabilities, ratios and percentages', { tag: '3.16' });
  D.card(s, 0.45, 1.3, 6.1, 1.65, 'Four ways to write the same answer', ['**1 in 4** = **1/4** = **0.25** = **25%** = ratio **1 : 3** (affected : unaffected).'], { size: 13 });
  D.workedSteps(s, 0.45, 3.1, 6.1, 3.15, 'My turn', 'Persons 6 and 7 (both Ff) plan two more children.', [
    ['One child', 'P(ff) = 1/4 = 25%'],
    ['Two children', 'both affected: 1/4 × 1/4 = 1/16'],
    ['Percent', '1/16 = 6.25%'],
    ['Carrier', 'unaffected child: P(Ff) = 2/3'],
  ], { size: 12.5 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Tt × tt (T = tall). What % of offspring are short?',
    '**2** Two carriers of CF have a child. What is the ratio of unaffected : affected?',
    '**3** 400 offspring are expected from Bb × Bb. How many are expected to show the **dominant** phenotype?',
    '**4** A cross gives 92 dominant : 31 recessive. Calculate the ratio to 3 s.f. and say which cross this suggests.',
  ], { size: 13.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Bb × Bb: what **fraction** of offspring are **heterozygous**?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 50%. 2) 3 : 1. 3) 400 × 3/4 = 300. 4) 92 ÷ 31 = 2.97 : 1 ≈ 3 : 1, so both parents heterozygous (Bb × Bb).\nQUICK CHECK: 2/4 = 1/2.\nThe 2/3 carrier figure is extension for the most able.');
  reg(s, '3.16 Calculating outcomes');
}

// ======================= 24 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 3.10B–3.16 • Mendel and inheritance', [
  { q: 'Define **heterozygous** and **phenotype**.', marks: 2, ms: 'Heterozygous: two different alleles of a gene (1); phenotype: the observable characteristic (1).' },
  { q: 'Two parents are Tt (T = tall). Draw a Punnett square and give the probability of a short child.', marks: 3, ms: 'Gametes T, t and T, t (1); offspring TT, Tt, Tt, tt (1); 1/4 / 25% / 0.25 (1).' },
  { q: 'Explain why the father determines the sex of a child.', marks: 2, ms: 'Eggs all carry an X (1); sperm carry X or Y (half each) (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 25 ABO (B) =======================
{
  const s = D.contentHeader('ABO blood groups', 'Specification 3.17B • multiple alleles and codominance', { tag: '3.17B', p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'IᴬIᴼ × IᴮIᴼ: all four blood groups are possible');
  label(s, 0.7, 1.45, 5.6, 'Parents: **IᴬIᴼ** (group A) × **IᴮIᴼ** (group B)', { size: 12 });
  punnett(s, 1.3, 1.85, 0.75, ['Iᴮ', 'Iᴼ'], ['Iᴬ', 'Iᴼ'], [['IᴬIᴮ', 'IᴬIᴼ'], ['IᴮIᴼ', 'IᴼIᴼ']], { size: 13 });
  [['AB', 2.05, 2.6], ['A', 2.8, 2.6], ['B', 2.05, 3.35], ['O', 2.8, 3.35]].forEach(([g, x, y]) => label(s, x, y + 0.52, 0.75, 'group ' + g, { size: 8.5, color: C.red, bold: true, h: 0.2 }));
  label(s, 4.3, 2.6, 2.1, '**A : B : AB : O**', { size: 12, align: 'left' });
  label(s, 4.3, 3.0, 2.1, '**1 : 1 : 1 : 1**', { size: 12, align: 'left' });
  label(s, 4.3, 3.4, 2.1, 'each **25%**', { size: 11, align: 'left' });
  const rows = [[HDR('Blood group'), HDR('Possible genotypes')], ...[['A', 'IᴬIᴬ or IᴬIᴼ'], ['B', 'IᴮIᴮ or IᴮIᴼ'], ['AB', 'IᴬIᴮ'], ['O', 'IᴼIᴼ']].map(([a, b], i) => [tcell(a, i, { bold: true }), tcell(b, i)])];
  table(s, rows, { x: 0.75, y: 4.4, w: 5.5, colW: [1.8, 3.7], rowH: 0.27, fontSize: 10.5 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Key ideas', [
    '**Multiple alleles**: the gene has **three** alleles, **Iᴬ**, **Iᴮ** and **Iᴼ** (a person still has only **two**).',
    '**Codominance**: **Iᴬ** and **Iᴮ** are **both expressed** in the phenotype, so **IᴬIᴮ** gives group **AB**.',
    '**Iᴼ** is **recessive** to both Iᴬ and Iᴮ, so group O must be **IᴼIᴼ**.',
    'A group A person could be **IᴬIᴬ** or **IᴬIᴼ**: you cannot tell from the phenotype alone.',
  ], { size: 12.5 });
  D.quickCheck(s, 'Parents **IᴬIᴬ** × **IᴮIᴼ**: what is the probability of a group **AB** child?');
  D.notes(s, 'QUICK CHECK ANSWER: gametes Iᴬ, Iᴬ and Iᴮ, Iᴼ → IᴬIᴮ, IᴬIᴼ, IᴬIᴮ, IᴬIᴼ → 1/2 (50%) group AB.\nSpec 3.17B (biology only). All ratios checked in the build script.');
  reg(s, '3.17B ABO blood groups (BIOLOGY ONLY)');
}

// ======================= 26 SEX-LINKED (HT, B) =======================
{
  const s = D.contentHeader('Sex-linked inheritance', 'Specification 3.18B • genes carried on the X chromosome', { tag: '3.18B', ht: true, p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'carrier mother XᴴXʰ × unaffected father XᴴY (haemophilia)');
  label(s, 0.7, 1.45, 5.6, 'Xʰ = allele for **haemophilia** (recessive)', { size: 12 });
  punnett(s, 1.3, 2.0, 0.95, ['Xᴴ', 'Y'], ['Xᴴ', 'Xʰ'], [['XᴴXᴴ', 'XᴴY'], ['XᴴXʰ', 'XʰY']], { hl: g => g === 'XʰY', size: 14 });
  label(s, 0.55, 2.9, 0.75, 'mother', { size: 10, color: C.red, h: 0.3 }); label(s, 2.25, 1.75, 1.9, 'father', { size: 10, color: C.blue, h: 0.25 });
  label(s, 4.3, 2.3, 2.15, 'girls: **XᴴXᴴ** normal, **XᴴXʰ** carrier', { size: 10.5, align: 'left', h: 0.5 });
  label(s, 4.3, 2.95, 2.15, 'boys: **XᴴY** normal, **XʰY** has haemophilia', { size: 10.5, align: 'left', h: 0.5 });
  label(s, 0.7, 4.95, 5.6, 'P(son affected) = **1/2** • P(any child affected) = **1/4**', { size: 12 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Why males are affected more often', [
    'Some genes are on the **X** chromosome but **not** on the Y.',
    'Males (XY) have only **one** X, so a single recessive allele is **always expressed**.',
    'Females (XX) need **two** recessive alleles; with one they are a **carrier**.',
    'Examples: **haemophilia** (blood does not clot properly) and **red–green colour blindness**.',
    'Sons get their X from their **mother**, so an affected boy inherited the allele from her.',
  ], { size: 12.5 });
  D.quickCheck(s, 'Explain why a father with haemophilia cannot pass it to his **son**.');
  D.notes(s, 'QUICK CHECK ANSWER: the son inherits the Y chromosome from his father (1); the haemophilia allele is on the X chromosome (1).\nSpec 3.18B (Higher and biology only: confirmed by PMT and Save My Exams headings). Ratios checked.');
  reg(s, '3.18B Sex-linked inheritance (HT, BIOLOGY ONLY)');
}

// ======================= 27 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 3.17B–3.18B • blood groups and sex linkage', [
  { q: 'Explain what is meant by **codominance**, using blood groups as an example.', marks: 2, ms: 'Both alleles are expressed in the phenotype (1); IᴬIᴮ gives blood group AB (1).' },
  { q: 'Explain why a person with blood group O must be homozygous.', marks: 2, ms: 'Iᴼ is recessive (1); only expressed when no Iᴬ or Iᴮ is present, so IᴼIᴼ (1).' },
  { q: 'A carrier woman (XᴮXᵇ) has children with a colour-blind man (XᵇY). Calculate the probability of a colour-blind daughter.', marks: 3, ht: true, ms: 'Correct gametes Xᴮ, Xᵇ and Xᵇ, Y (1); offspring XᴮXᵇ, XᵇXᵇ, XᴮY, XᵇY (1); P = 1/4 (25%) of all children (or 1/2 of daughters) (1).' },
]);
{ const o = []; for (const m of ['XB', 'Xb']) for (const f of ['Xb', 'Y']) o.push(m + f); calc('R5 colour-blind daughter', frac(o, g => g === 'XbXb'), 0.25, 1e-12); }
reg(R5.s, 'Recap 5');

// ======================= 28 VARIATION =======================
reg(D.contentSlide({
  title: 'Variation',
  subtitle: 'Specification 3.19–3.20 • genetic and environmental causes',
  tag: '3.19–3.20', caption: 'height in a population: continuous variation (model data)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.2, xmin: 140, xmax: 190, xstep: 10, ymin: 0, ymax: 35, ystep: 10, xlabel: 'Height (cm)', ylabel: 'Number of people' };
    axes(s, g);
    for (let h = 142.5; h < 190; h += 5) { const v = HEIGHT(h); box(s, px(g, h - 2.5), py(g, v), px(g, h + 2.5) - px(g, h - 2.5), py(g, 0) - py(g, v), 'B9D3EE', '2F5F8F', { lw: 0.75 }); }
    fnLine(s, g, HEIGHT, 140, 190, 60, C.red, 2);
    label(s, 0.7, 5.25, 5.6, 'Many genes + environment → a **bell-shaped** curve.', { size: 11, h: 0.4 });
  },
  head: 'Causes of variation',
  lines: [
    '**Genetic variation**: different **alleles**, from **mutation** and **sexual reproduction** (meiosis and random fertilisation). e.g. blood group, eye colour.',
    '**Environmental variation**: caused by the organism’s response to its **surroundings**, e.g. diet, sunlight, exercise. e.g. scars, language, plant height in shade.',
    'Most characteristics (e.g. **height**, **weight**) are affected by **both**.',
    'Most phenotypic features are controlled by **multiple genes**, not a single gene: this gives **continuous** variation.',
  ],
  worked: { head: 'Identical twins', q: 'Identical twins have different masses. Explain.',
    steps: [['Genes', 'identical twins have the same alleles'], ['So', 'differences must be environmental'], ['Example', 'different diet or exercise'], ['Answer', 'mass is affected by environment']] },
  qc: 'Give **one** characteristic caused only by genes and **one** caused only by the environment.',
  notes: 'QUICK CHECK ANSWER: genetic: blood group / eye colour (natural) / inherited disorder (1); environmental: scar / tattoo / language / accent (1).\nSpec 3.19 (multiple genes) and 3.20 (causes of variation). Numbering medium confidence.',
}), '3.19–3.20 Variation');

// ======================= 29 HUMAN GENOME PROJECT =======================
reg(D.contentSlide({
  title: 'The Human Genome Project',
  subtitle: 'Specification 3.21 • outcomes and uses in medicine',
  tag: '3.21', caption: 'timeline of the project',
  draw: (s, p) => {
    line(s, 0.9, 3.0, 6.1, 3.0, C.ink, 3);
    [[1.1, '1990', 'project starts: scientists in many countries'], [3.5, '2003', 'sequence of about 3 billion base pairs published'], [5.8, 'today', 'genomes sequenced quickly and cheaply']].forEach(([x, y, t], i) => {
      ball(s, x, 3.0, 0.14, C.blue, C.white, 2);
      label(s, x - 0.6, 2.45, 1.2, `**${y}**`, { size: 12, color: C.blue });
      label(s, x - 0.85, 3.25, 1.7, t, { size: 10, h: 0.8, valign: 'top' });
    });
    D.card(s, 0.75, 4.3, 5.5, 1.45, null, ['Humans have about **20 000** genes: far fewer than expected. Most DNA is **non-coding**.'], { size: 11, fill: C.white });
  },
  head: 'Outcomes and uses',
  lines: [
    'The **entire human genome** was sequenced and the **genes** were located.',
    '**Medicine:** find **alleles linked to diseases** (e.g. breast cancer, BRCA1); **predict** and **prevent** disease; **genetic testing**.',
    '**Personalised medicine:** choose the best **drug and dose** for a person’s genome.',
    '**Issues:** stress from knowing risk; **discrimination** by insurers or employers; data privacy.',
  ],
  worked: { head: 'Discuss', q: 'Give one benefit and one concern of genetic testing for a disease risk.',
    steps: [['Benefit', 'early checks or lifestyle changes'], ['Concern', 'anxiety; insurance discrimination'], ['Balance', 'risk is not certainty'], ['Answer', 'one benefit and one concern, explained']] },
  qc: 'Describe **one** way the Human Genome Project could improve medical treatment.',
  notes: 'QUICK CHECK ANSWER: any one: identify alleles that increase disease risk so people can be screened / take precautions; personalised medicines that suit a person’s genotype; develop new treatments / gene therapy (1–2).\nSpec 3.21.',
}), '3.21 Human Genome Project');

// ======================= 30 MUTATION =======================
reg(D.contentSlide({
  title: 'Mutations',
  subtitle: 'Specification 3.22–3.23 • the source of new alleles',
  tag: '3.22–3.23', caption: 'a single base change',
  draw: (s, p) => {
    const a = 'ATGGCATCC', b = 'ATGGTATCC';
    [[a, 1.8, 'original'], [b, 3.1, 'mutated']].forEach(([sq, y, t]) => {
      label(s, 0.6, y, 1.2, t, { size: 11, bold: true, align: 'left', h: 0.45 });
      for (let i = 0; i < 9; i++) { const hit = sq === b && i === 4; box(s, 1.8 + i * 0.47, y, 0.44, 0.45, BASE[sq[i]], hit ? C.red : '555555', { lw: hit ? 3 : 0.5 }); label(s, 1.8 + i * 0.47, y, 0.44, sq[i], { size: 12, bold: true, h: 0.45 }); }
    });
    arrow(s, 3.9, 2.35, 3.9, 3.0, C.red, 2);
    const bars = [['no effect', 4.2, '2E7D4F'], ['small effect', 1.2, 'E0A040'], ['large effect', 0.25, C.red]];
    bars.forEach(([t, v, c], i) => { const y = 4.0 + i * 0.5; label(s, 0.6, y, 1.4, t, { size: 10.5, align: 'left', h: 0.4 }); box(s, 2.05, y + 0.07, v, 0.26, c, c); });
    label(s, 2.05, 5.45, 4.2, 'how often (not to scale)', { size: 9.5, italic: true, color: C.grey, align: 'left' });
  },
  head: 'Key facts',
  lines: [
    'A **mutation** is a random change in the **base sequence** of DNA.',
    'Mutations create **new alleles**, so there is usually **extensive genetic variation** within a population.',
    '**Most** mutations have **no effect** on the phenotype.',
    '**Some** have a **small** effect; **rarely**, a single mutation has a **large** effect (e.g. cystic fibrosis).',
    'Mutation rate increases with **ionising radiation** and some **chemicals**.',
  ],
  worked: { head: 'Explain', q: 'Why do most mutations have no effect?',
    steps: [['Where', 'many are in non-coding DNA'], ['Code', 'some code for the same amino acid'], ['Protein', 'shape and activity unchanged'], ['Answer', 'phenotype is not affected']] },
  qc: 'What is a **mutation**? Why are mutations important for variation?',
  notes: 'QUICK CHECK ANSWER: a (random) change in the DNA base sequence (1); creates new alleles / new variants (1).\nSpec 3.22–3.23. Bar lengths are illustrative only.',
}), '3.22–3.23 Mutations');

// ======================= 31 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification 3.19–3.23 • variation, genome and mutation', [
  { q: 'Explain why height shows continuous variation.', marks: 2, ms: 'Controlled by many genes (1); also affected by the environment, e.g. diet (1).' },
  { q: 'Describe **two** possible uses of the Human Genome Project in medicine.', marks: 2, ms: 'Any two: identify disease alleles / genetic testing / predict risk; personalised medicine / drugs suited to genotype; understand inherited disorders / new treatments (1 each).' },
  { q: 'State how most mutations affect the phenotype.', marks: 1, ms: 'No effect (1).' },
  { q: 'Explain how mutation and sexual reproduction both cause genetic variation.', marks: 2, ms: 'Mutation produces new alleles (1); sexual reproduction mixes alleles from two parents / random gametes from meiosis (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 32 KEY WORDS =======================
reg(D.keyWords([
  ['Meiosis', 'Division making four genetically different haploid gametes.'],
  ['Nucleotide', 'Sugar + phosphate + base: the unit of DNA.'],
  ['Double helix', 'Two DNA strands coiled; bases paired A–T, C–G.'],
  ['Genome', 'The entire DNA of an organism.'],
  ['Gene', 'Section of DNA coding for a specific protein.'],
  ['Allele', 'A different version of the same gene.'],
  ['Dominant', 'Allele expressed whenever present.'],
  ['Recessive', 'Allele expressed only when two copies are present.'],
  ['Homozygous', 'Two identical alleles (BB or bb).'],
  ['Heterozygous', 'Two different alleles (Bb).'],
  ['Genotype', 'The alleles an organism has.'],
  ['Phenotype', 'The characteristics an organism shows.'],
  ['Transcription', 'Making mRNA from DNA (in the nucleus).'],
  ['Translation', 'Making a polypeptide at a ribosome.'],
  ['Codominance', 'Both alleles expressed, e.g. blood group AB.'],
  ['Mutation', 'A random change in the base sequence of DNA.'],
], { notes: 'Cover-and-recall. Biology-only terms: transcription, translation, codominance.' }), 'Summary: key words');

// ======================= 33 FULL QUESTION =======================
reg(D.fullQuestion('Cystic fibrosis (CF) is caused by a recessive allele, f. Two parents who do not have CF have a child with CF.', [
  { l: 'a', q: 'Give the genotypes of both parents.', marks: 1, ms: 'Ff and Ff (1).' },
  { l: 'b', q: 'Draw a Punnett square for the parents and give the probability that their next child has CF.', marks: 3, ms: 'Gametes F, f and F, f (1); FF, Ff, Ff, ff (1); 1/4 / 25% / 0.25 (1).' },
  { l: 'c', q: 'Calculate the probability that their next two children both have CF.', marks: 1, ms: '1/16 / 0.0625 / 6.25% (1).' },
  { l: 'd', q: 'Describe how gametes are made by meiosis.', marks: 3, ms: 'DNA copied then cell divides twice (1); four cells made (1); each haploid / half the chromosomes / genetically different (1).', h: 1.2 },
  { l: 'e', q: 'Explain why the allele that causes CF is still found in the population even though it is harmful.', marks: 2, ms: 'Carriers (Ff) do not have the disorder / are unaffected (1); so they survive and pass on the allele (1).' },
  { l: 'f', q: 'Describe how DNA could be extracted from cells to test for the allele.', marks: 3, ms: 'Mash cells with detergent (breaks membranes) and salt (1); filter (1); add ice-cold ethanol so DNA precipitates (1).', h: 1.2 },
], 13, { subtitle: 'Specification 3.2, 3.5, 3.13–3.16 • answer every part • 13 marks' }), 'Full question');

// ======================= 34–35 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the type of cell division that makes gametes.', marks: 1, ms: 'Meiosis (1).' },
  { n: '2', q: 'Tall (T) is dominant to short (t). Calculate the % of short offspring from **Tt × tt**.', marks: 2, ms: 'Tt, Tt, tt, tt (1); 50% (1).' },
  { n: '3', q: 'Describe the structure of DNA.', marks: 3, ms: 'Double helix / two strands (1); made of nucleotides: sugar, phosphate, base (1); complementary base pairs A–T, C–G joined by (weak hydrogen) bonds (1).' },
  { n: '4', q: 'Explain the difference between **genotype** and **phenotype**.', marks: 2, ms: 'Genotype: the alleles present (1); phenotype: the characteristics shown (1).' },
  { n: '5', q: 'Give **two** reasons why Mendel’s work was not accepted at first.', marks: 2, ms: 'Any two: genes / chromosomes / DNA not known; no mechanism; not well known / obscure journal; other theories (blending) preferred (1 each).' },
  { n: '6', q: 'Explain how a gene is used to make a protein.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'A gene is a section of DNA; the base sequence codes for the order of amino acids (3 bases / triplet per amino acid).',
    'Transcription: RNA polymerase binds to non-coding DNA in front of the gene.',
    'A complementary mRNA strand is made from the coding DNA (in the nucleus).',
    'mRNA leaves the nucleus and attaches to a ribosome.',
    'Translation: each codon on the mRNA codes for a specific amino acid; tRNA brings the amino acids.',
    'Amino acids are joined into a polypeptide / protein chain.',
    'The chain folds into a specific shape, e.g. an enzyme with an active site.',
  ], 'Biology-only question (3.6B–3.7B). Level 3 answers describe BOTH transcription and translation in the correct order with key terms.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 16);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7);
assert(D.slideNo >= 34 && D.slideNo <= 45, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1BI0_T3_Genetics.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
