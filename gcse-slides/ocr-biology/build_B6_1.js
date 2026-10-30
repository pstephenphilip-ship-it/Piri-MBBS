// build_B6_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B6 Life on Earth – past, present and future, B6.1 How was the theory of evolution developed?
// (one deck, Higher & Foundation; Part 1 of 3 B6 decks in J260)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B6_1.js
// Structure copied from build_B5_6.js. ocr_bio_template.js is NOT edited: ball/oval/poly/callout/pbox (from build_B5_6.js)
// and the moth, bark, bacterium, giraffe, rock-strata and fossil helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_B6_1.md): B6.1.1 genetic variation; B6.1.2 mutations and phenotype; B6.1.3 natural selection;
// B6.1.4 competition; B6.1.5 evolution as change in inherited characteristics (may form new species); B6.1.6 fossils;
// B6.1.7 modern evidence incl. antibiotic resistance; B6.1.8 Darwin and Wallace and the impact of their ideas.
// No HT statements were found for B6.1. Isolation as a speciation mechanism is GRADE 7–9 STRETCH.
// Overlap: B1 (genes, alleles, genotype/phenotype) recap only; B2 antibiotic resistance recapped and used as EVIDENCE only;
// classification (B6.2) and extinction / biodiversity (B6.3) not taught; selective breeding only as Darwin's analogy.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B6', chapterTitle: 'Life on Earth – past, present and future', code: 'B6.1', title: 'How was the theory of evolution developed?',
  part: 1, parts: 3, specRange: 'B6.1.1–B6.1.8',
  subtitle: 'How was the theory of evolution developed?',
  keywords: ['Variation', 'Mutation', 'Competition', 'Natural selection', 'Fossils', 'Darwin & Wallace'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));

// ======================= CALCULATIONS (asserted) =======================
// slide 5: heights of 100 Year 10 students (illustrative)
const HCL = [140, 150, 160, 170, 180, 190], HN = [4, 15, 36, 30, 12, 3];
calc('height total', HN.reduce((a, b) => a + b, 0), 100);
const hMean = HCL.reduce((a, c, i) => a + (c + 4.5) * HN[i], 0) / 100;
calc('height estimated mean from midpoints', hMean, 168.5, 1e-9);
calc('modal class %', 36 / 100 * 100, 36, 1e-9);
calc('QC % 180 cm or taller', (12 + 3) / 100 * 100, 15, 1e-9);
// slide 6: one base changed in a 1200-base gene
calc('1 ÷ 1200 × 100', 1 / 1200 * 100, 0.08333333333333333, 1e-12);
calc('1/1200 % 2 s.f.', sf(1 / 1200 * 100, 2), 0.083, 1e-12);
calc('QC codons: 1200 ÷ 3', 1200 / 3, 400);
// slide 8: frog spawn survival
calc('frog survival 2 ÷ 2000 × 100', 2 / 2000 * 100, 0.1, 1e-12);
calc('frog deaths 2000 − 2', 2000 - 2, 1998);
calc('QC 4 of 5000 %', 4 / 5000 * 100, 0.08, 1e-12);
// slide 10: peppered moths near Manchester (illustrative, shaped on historical accounts; UNVERIFIED values)
const MY = [1848, 1870, 1895, 1920, 1950, 1970, 1985, 2000], MP = [2, 40, 95, 95, 90, 75, 40, 10];
calc('moth rise 95 − 2', MP[2] - MP[0], 93);
calc('moth rise years 1895 − 1848', MY[2] - MY[0], 47);
calc('moth fall 1950 → 2000', MP[4] - MP[7], 80);
calc('QC pale % in 1895', 100 - MP[2], 5);
calc('QC pale in 200 moths 1895', 200 * (100 - MP[2]) / 100, 10, 1e-9);
// slide 13: fossil depth (illustrative deposition rate 1 cm per 1000 years)
calc('350 cm × 1000 years', 350 * 1000, 350000);
calc('QC 1.2 m = 120 cm × 1000', 1.2 * 100 * 1000, 120000, 1e-6);
// slide 14: bacteria dividing every 20 min
const gens4h = calc('generations in 4 h', 240 / 20, 12);
calc('2^12', 2 ** gens4h, 4096);
calc('QC generations in 3 h', 180 / 20, 9);
calc('QC 2^9', 2 ** 9, 512);
// slides 16–17: camouflage model (class means, illustrative)
const GEN = [
  { g: 0, d: 20, p: 20, de: 5, pe: 15 },
  { g: 1, d: 30, p: 10, de: 12, pe: 8 },
  { g: 2, d: 36, p: 4, de: 17, pe: 3 },
  { g: 3, d: 38, p: 2 },
];
GEN.forEach((r, i) => {
  calc(`gen ${r.g} total 40`, r.d + r.p, 40);
  if (r.de != null) {
    calc(`gen ${r.g} eaten 20`, r.de + r.pe, 20);
    const nd = 2 * (r.d - r.de), np = 2 * (r.p - r.pe);
    calc(`gen ${r.g + 1} dark after doubling`, nd, GEN[i + 1].d);
    calc(`gen ${r.g + 1} pale after doubling`, np, GEN[i + 1].p);
  }
});
const pctD = GEN.map(r => r.d / 40 * 100);
[50, 75, 90, 95].forEach((v, i) => calc(`% dark gen ${i}`, pctD[i], v, 1e-9));
calc('QC % pale eaten gen 0', 15 / 20 * 100, 75, 1e-9);
// slide 19: timeline
calc('Beagle return to Origin 1859 − 1836', 1859 - 1836, 23);
calc('Lamarck 1809 to Origin 1859', 1859 - 1809, 50);
calc('Wallace letter to Origin 1859 − 1858', 1859 - 1858, 1);
// starter, recaps, FQ, HW
calc('R1 % 9 of 30', 9 / 30 * 100, 30, 1e-9);
calc('R3 2^5', 2 ** 5, 32);
calc('R4 % dark 30/40', 30 / 40 * 100, 75, 1e-9);
calc('FQ 18 of 60 %', 18 / 60 * 100, 30, 1e-9);
calc('FQ 51 of 60 %', 51 / 60 * 100, 85, 1e-9);
calc('HW 2: 6 h = 360 min ÷ 30', 360 / 30, 12);
calc('HW 2: 2^12', 2 ** 12, 4096);
calc('HW 6 mean (12 + 15 + 9) / 3', (12 + 15 + 9) / 3, 12, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_bio_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: fill ? { color: fill } : { type: 'none' }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: o.rot, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' },
    line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle', align: o.align });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
const HI = 'C8414C', DARKM = '2B2622', PALEM = 'E9E3CF', PALE_EDGE = '8C8270', LICHEN = 'D9D6C2', SOOT = '3A3532';
const BAC = '5B9BD5', BAC_E = '2F5F8F', RES = 'C8414C', RES_E = '7E1F27', GIR = 'E3B35A', GIR_E = '9A6B1F';
// peppered moth seen from above: two wing pairs, body, antennae. w = wingspan
function moth(s, cx, cy, w, fill, edge) {
  const L = [[cx, cy - 0.08 * w], [cx - 0.5 * w, cy - 0.24 * w], [cx - 0.44 * w, cy + 0.12 * w], [cx - 0.2 * w, cy + 0.3 * w], [cx, cy + 0.14 * w]];
  poly(s, L, fill, edge, { lw: 0.75 });
  poly(s, L.map(([x, y]) => [2 * cx - x, y]), fill, edge, { lw: 0.75 });
  oval(s, cx, cy + 0.03 * w, 0.09 * w, 0.42 * w, '4A3F35', '2A221C', { lw: 0.5 });
  line(s, cx - 0.02 * w, cy - 0.16 * w, cx - 0.12 * w, cy - 0.32 * w, '2A221C', 0.75);
  line(s, cx + 0.02 * w, cy - 0.16 * w, cx + 0.12 * w, cy - 0.32 * w, '2A221C', 0.75);
  if (fill === PALEM) [[-0.28, -0.05], [0.28, -0.05], [-0.2, 0.1], [0.2, 0.1], [-0.36, -0.14], [0.36, -0.14]].forEach(([dx, dy]) => ball(s, cx + dx * w, cy + dy * w, 0.02 * w, '5A5248', '5A5248'));
}
// tree bark panel; lichen = pale bark with lichen patches, else soot-covered
function bark(s, x, y, w, h, sooty) {
  box(s, x, y, w, h, sooty ? SOOT : 'C9C3AE', sooty ? '1E1B19' : '8C8270', { lw: 1 });
  for (let i = 1; i < 7; i++) { const xx = x + i * w / 7; line(s, xx, y + 0.04, xx + (i % 2 ? 0.05 : -0.05), y + h - 0.04, sooty ? '24201E' : 'A79F86', 1.25); }
  if (!sooty) [[0.2, 0.2, 0.32], [0.65, 0.35, 0.28], [0.35, 0.7, 0.3], [0.8, 0.8, 0.24]].forEach(([fx, fy, r]) => oval(s, x + fx * w, y + fy * h, r, r * 0.7, LICHEN, 'B9B59E', { lw: 0.5 }));
}
// rod-shaped bacterium
function bacterium(s, cx, cy, resistant, rot = 0, k = 1) {
  s.addShape(SH.ROUNDED_RECTANGLE, { x: cx - 0.15 * k, y: cy - 0.065 * k, w: 0.3 * k, h: 0.13 * k, rectRadius: 0.065 * k, rotate: rot,
    fill: { color: resistant ? RES : BAC }, line: { color: resistant ? RES_E : BAC_E, width: 0.75 } });
}
function deadBac(s, cx, cy, rot = 0) {
  s.addShape(SH.ROUNDED_RECTANGLE, { x: cx - 0.15, y: cy - 0.065, w: 0.3, h: 0.13, rectRadius: 0.065, rotate: rot, fill: { color: 'DDE3EA' }, line: { color: '9AA3B0', width: 0.75, dashType: 'dash' } });
  line(s, cx - 0.08, cy - 0.08, cx + 0.08, cy + 0.08, '6B7385', 1); line(s, cx - 0.08, cy + 0.08, cx + 0.08, cy - 0.08, '6B7385', 1);
}
// giraffe side view standing on ground y = yb, body centred on cx, neck length nl (in), scale k
function giraffe(s, cx, yb, nl, k = 1) {
  const bw = 0.6 * k, bh = 0.28 * k, legH = 0.42 * k, by = yb - legH - bh;
  [-0.24, -0.14, 0.12, 0.22].forEach(dx => box(s, cx + dx * k - 0.025 * k, yb - legH - 0.02 * k, 0.05 * k, legH + 0.02 * k, GIR, GIR_E, { lw: 0.75 }));
  box(s, cx + 0.16 * k, by - nl + 0.06 * k, 0.11 * k, nl, GIR, GIR_E, { lw: 0.75 });
  box(s, cx - bw / 2, by, bw, bh, GIR, GIR_E, { shape: SH.ROUNDED_RECTANGLE, r: 0.1 * k, lw: 0.75 });
  oval(s, cx + 0.3 * k, by - nl + 0.06 * k, 0.26 * k, 0.12 * k, GIR, GIR_E, { lw: 0.75 });
  line(s, cx + 0.2 * k, by - nl + 0.02 * k, cx + 0.19 * k, by - nl - 0.07 * k, GIR_E, 1.25);
  [[-0.12, 0.08], [0.06, 0.12], [0.18, 0.06]].forEach(([dx, dy]) => ball(s, cx + dx * k, by + dy * k, 0.03 * k, 'B5832F', 'B5832F'));
  line(s, cx - bw / 2, by + 0.06 * k, cx - bw / 2 - 0.12 * k, by + 0.2 * k, GIR_E, 1);
  return { top: by - nl };
}
// tree with leaves at height (for the giraffe slide)
function tree(s, x, yb, h) {
  box(s, x - 0.04, yb - h, 0.08, h, '8A6A3A', '6B4F2A', { lw: 0.5 });
  oval(s, x, yb - h, 0.6, 0.32, '6FAE5C', '3E7F2E', { lw: 0.75 });
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Evolution',
  footer: 'OCR J260 Combined Science B • B6.1 How was the theory of evolution developed? • teacher deck • mark schemes in the notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • variation, mutation, competition, natural selection, evidence, Darwin and Wallace` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no HT-only statements found • stretch marked' },
    { icon: '▲', text: 'Peppered moths • fossils • antibiotic resistance • camouflage model activity • Lamarck vs Darwin' },
  ],
  notes: 'B6.1 How was the theory of evolution developed? is Part 1 of 3 in J260 Chapter B6 Life on Earth – past, present and future (B6.1 evolution, B6.2 classification, B6.3 biodiversity). The separate-science Biology B (J257) has a fourth sub-topic on sexual and asexual reproduction, which is NOT in J260.\nScope (see SPEC_B6_1.md): B6.1.1–B6.1.8. Genes, alleles and genotype/phenotype (Chapter B1) are recapped only. Antibiotic resistance was taught in Chapter B2: here it is recapped and used as evidence for evolution only.\nThe wording comes from search extracts of the OCR J257 transition guide and specification mirrors (ocr.org.uk and the mirrors could not be fetched directly). Confidence: medium–high for the statements, medium for exact numbering.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B6.1.1', text: 'State that there is usually **extensive genetic variation** within a population of a species.' },
  { code: 'B6.1.2', text: 'Recall that genetic variants arise from **mutations**; most have **no effect** on the phenotype, some **influence** it, a very few **determine** it.' },
  { code: 'B6.1.4', text: 'Explain the importance of **competition** in a community for natural selection.' },
  { code: 'B6.1.3', text: 'Explain how evolution happens by **natural selection** of variants better suited to their environment.' },
  { code: 'B6.1.5', text: 'Describe **evolution** as a change in the inherited characteristics of a population, which may form **new species**.' },
  { code: 'B6.1.6', text: 'Describe how **fossils** provide evidence for evolution.' },
  { code: 'B6.1.7', text: 'Describe modern evidence for evolution, including **antibiotic resistance** in bacteria.' },
  { code: 'B6.1.8', text: 'Describe the work of **Darwin** and **Wallace**, and how a scientific theory develops (**Lamarck** vs Darwin).' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (search extracts of the OCR J257 Biology B transition guide "natural selection", which shares B6.1 with J260; see SPEC_B6_1.md):\nB6.1.1 state that there is usually extensive genetic variation within a population of a species.\nB6.1.2 recall that genetic variants arise from mutations, and that most have no effect on the phenotype, some influence phenotype and a very few determine phenotype.\nB6.1.3 explain how evolution occurs through natural selection of variants that give rise to phenotypes better suited to their environment.\nB6.1.4 explain the importance of competition in a community, with regard to natural selection.\nB6.1.5 describe evolution as a change in the inherited characteristics of a population over time, through a process of natural selection, which may result in the formation of new species.\nB6.1.6 describe how fossils provide evidence for evolution.\nB6.1.7 describe modern examples of evidence for evolution including antibiotic resistance in bacteria.\nB6.1.8 describe the work of Darwin and Wallace in the development of the theory of evolution by natural selection and explain the impact of these ideas on biology.\nNo statement in B6.1 was found in bold (HT). Lamarck is an Ideas about Science context (how explanations are developed and accepted), not a named statement.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B6 Life on Earth – past, present and future • B6.1 is Part 1 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B6.1.1–2', 'Variation and mutation', 'Both tiers', C.blue],
    ['B6.1.3–4', 'Competition and natural selection: peppered moths', 'Both tiers', C.blue],
    ['B6.1.5', 'Evolution and new species', 'Both tiers', C.blue],
    ['B6.1.6–7', 'Evidence: fossils and antibiotic resistance', 'Both tiers', C.blue],
    ['Activity', 'Modelling natural selection (camouflage)', 'Practical', C.orange],
    ['B6.1.8', 'Darwin, Wallace and Lamarck: how theories develop', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B6.1\nEvolution', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B1 genes, alleles, genotype and phenotype • B2 antibiotics • B3 competition in ecosystems', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.0, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**B6.1 How was the theory of evolution developed?** (this deck)',
      'B6.2 How does our understanding of biology help us classify the diversity of organisms on Earth?',
      'B6.3 How is biodiversity threatened and how can we protect it?',
    ], { size: 11.5, color: 'E3F2F0', space: 4 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.8, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.5, 5.53, 2.35, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'No B6.1 statement is Higher-only: every slide is for **both tiers**.',
      'The red **GRADE 7–9 STRETCH** pill marks extra depth (how isolation leads to new species).',
      'Maths: **histograms**, **means**, **percentages**, **powers of 2**, reading **graphs**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.6, w: 5.15, h: 2.15, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B6 has three sub-topics (B6.1 evolution, B6.2 classification, B6.3 biodiversity), per the OCR J260 specification-at-a-glance and the docbrown Combined Science B page (B6.2 = classification), from search extracts. Biology B (J257) adds "How do sexual and asexual reproduction affect evolution?" as its B6.2, so its classification and biodiversity sub-topics are numbered B6.3 and B6.4.\nOverlap control: genes, alleles, genotype and phenotype (Chapter B1) are recapped only; antibiotic resistance (Chapter B2) is recapped and used as evidence for evolution only; competition (B3) is recalled. Classification (B6.2) and extinction and biodiversity (B6.3) are left to the later decks.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B1 • genes', q: 'What is a **gene**? What is an **allele**?' },
  { from: 'B1 • genotype and phenotype', q: 'What is the difference between **genotype** and **phenotype**?' },
  { from: 'B1 • variation', q: 'Give one characteristic caused by **genes only** and one affected by the **environment** as well.' },
  { from: 'B2 • antibiotics', q: 'What do **antibiotics** kill? Why are doctors worried about **antibiotic resistance**?' },
  { from: 'B3 • ecosystems', q: 'Name **two** things that animals compete for and **two** that plants compete for.' },
  { from: 'KS3 • fossils', q: 'What is a **fossil**? In a cliff of rock layers, are the **oldest** layers at the top or the bottom?' },
], { subtitle: 'Recall from B1, B2, B3 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Gene: a section of DNA that codes for a protein / a characteristic. Allele: a different version of the same gene.\n2. Genotype: the alleles an organism has. Phenotype: its observable characteristics (from the genotype and the environment).\n3. Genes only: e.g. blood group, eye colour (accept natural hair colour). Genes and environment: height, mass, skin colour, intelligence (any reasonable).\n4. Bacteria (not viruses). Some bacteria are not killed; infections become hard to treat.\n5. Animals: food, water, space / territory, mates. Plants: light, water, mineral ions, space.\n6. Remains or traces of organisms from long ago preserved in rock. Oldest at the bottom (if the layers have not been disturbed).' }), 'Retrieval starter');

// ======================= 5 VARIATION =======================
{
  const g = { x: 1.4, y: 1.6, w: 4.85, h: 3.4, xmin: 140, xmax: 200, ymin: 0, ymax: 40, xstep: 10, ystep: 10, minor: 2, xlabel: 'Height / cm', ylabel: 'Number of students' };
  reg(D.contentSlide({
    title: 'Variation in a population',
    subtitle: `Specification ${sp('B6.1.1')} • there is usually extensive genetic variation within a population of a species`,
    tag: 'B6.1.1', caption: 'heights of 100 Year 10 students, histogram to scale (illustrative data)',
    draw: (s) => {
      D.axes(s, g);
      HCL.forEach((c, i) => {
        box(s, D.px(g, c), D.py(g, HN[i]), D.px(g, c + 10) - D.px(g, c), D.py(g, 0) - D.py(g, HN[i]), i === 2 ? '0D7877' : '5FB3AE', '0B4F4E', { lw: 0.75 });
        label(s, D.px(g, c), D.py(g, HN[i]) - 0.24, D.px(g, c + 10) - D.px(g, c), String(HN[i]), { size: 10, bold: true, h: 0.22 });
      });
      label(s, D.px(g, 181), D.py(g, 37), 1.3, 'continuous variation: a **range** of values', { size: 10, italic: true, color: C.grey, h: 0.6, align: 'left', valign: 'top' });
    },
    head: 'Every population varies',
    lines: [
      'Individuals of the **same species** are not identical: there is **variation**.',
      '**Genetic variation**: different **alleles** of genes (from B1). There is usually **a lot** of it in a population.',
      '**Environmental variation**: caused by conditions, e.g. diet. Most features, like height, depend on **both**.',
      'Only **genetic** variation is **inherited**, so only it matters for evolution.',
    ],
    size: 11,
    worked: { head: 'Worked example: estimate the mean height', q: 'Use the midpoint of each class (e.g. 144.5 cm for 140–149).',
      steps: [['Multiply', '144.5×4 + 154.5×15 + 164.5×36 + … = 16 850'], ['Divide', '16 850 ÷ 100'], ['Answer', `mean ≈ **${hMean} cm**`]], size: 10.5 },
    workedH: 1.6,
    qc: 'What **percentage** of the students are 180 cm or taller? Why can a feature caused only by the **environment** not be passed on to offspring?',
    notes: `QUICK CHECK ANSWER: 12 + 3 = 15 of 100 = 15%. Environmental changes do not change the alleles in the gametes, so they are not inherited (e.g. a scar, a dyed hair colour, muscles from training).\nNode: midpoints × frequencies = 16 850; ÷ 100 = ${hMean}. Data illustrative (class of 100). Modal class 160–169 cm (36%).\nB6.1.1 wording: "state that there is usually extensive genetic variation within a population of a species". Genetic vs environmental variation is recap of Chapter B1.`,
  }), 'B6.1.1 Variation');
}

// ======================= 6 MUTATION =======================
reg(D.contentSlide({
  title: 'Mutations make new variants',
  subtitle: `Specification ${sp('B6.1.2')} • genetic variants arise from mutations`,
  tag: 'B6.1.2', caption: 'a mutation changes one base in a gene; not to scale',
  draw: (s) => {
    const BC = { A: 'E07A5F', T: 'F2CC8F', G: '81B29A', C: '7FA7D9' };
    const orig = 'ATGGACTTC'.split(''), mut = 'ATGGCCTTC'.split('');
    const row = (y, seq, title, hi) => {
      label(s, 0.7, y - 0.33, 5.5, title, { size: 10.5, bold: true, align: 'left', h: 0.28 });
      line(s, 0.75, y + 0.48, 6.25, y + 0.48, '6B7385', 3);
      seq.forEach((b, i) => {
        const x = 0.8 + i * 0.6;
        box(s, x, y, 0.5, 0.45, BC[b], i === hi ? HI : '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: i === hi ? 3 : 0.75 });
        label(s, x, y, 0.5, b, { size: 14, bold: true, h: 0.45 });
      });
    };
    row(1.85, orig, 'Original DNA base sequence (part of a gene)', -1);
    row(3.05, mut, 'After a mutation: one base changed (A → C)', 4);
    arrow(s, 3.5, 2.42, 3.5, 2.7, HI, 2);
    label(s, 3.6, 2.4, 2.6, 'mutation = a change in the DNA', { size: 10, color: HI, bold: true, align: 'left', h: 0.3 });
    label(s, 0.7, 3.75, 5.6, 'The new allele may change the **protein** made, and so the **phenotype**:', { size: 10.5, align: 'left', h: 0.3 });
    const cards = [['**Most**', 'no effect on the phenotype', '8FD19E'], ['**Some**', 'influence the phenotype', 'F5D58A'], ['**Very few**', 'determine the phenotype', 'EE8A8F']];
    cards.forEach(([a, b, col], i) => {
      const x = 0.75 + i * 1.88;
      box(s, x, 4.15, 1.75, 1.55, col, '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 });
      label(s, x + 0.05, 4.2, 1.65, a, { size: 14, h: 0.4 });
      label(s, x + 0.05, 4.6, 1.65, b, { size: 11, h: 0.75, valign: 'top' });
    });
  },
  head: 'Where new alleles come from',
  lines: [
    'A **mutation** is a change in the **DNA** base sequence. It creates a new **variant** (allele) of a gene.',
    'Mutations happen **randomly**, e.g. when DNA is copied. Radiation and some chemicals make them more likely.',
    '**Most** mutations have **no effect** on the phenotype. **Some influence** it. A **very few** decide it on their own.',
    'A mutation in a **gamete** (sex cell) can be **inherited**: it adds to the genetic variation of the population.',
  ],
  size: 11,
  worked: { head: 'Worked example: how big a change?', q: 'A gene is 1200 bases long. One base is changed.',
    steps: [['Fraction', '1 ÷ 1200'], ['Percentage', '1 ÷ 1200 × 100 = 0.0833…'], ['Answer', 'only **0.083%** of the gene (2 s.f.), but it can still change the protein']], size: 10.5 },
  workedH: 1.6,
  qc: 'What is a **mutation**? Why do **most** mutations have no effect on the phenotype? (Every 3 bases code for one amino acid: how many in 1200 bases?)',
  notes: 'QUICK CHECK ANSWER: A change in the base sequence of DNA (a gene). Most do not change the protein (or its function), e.g. the new triplet codes for the same amino acid, or the change is in DNA that does not code for a protein; many alleles are recessive. 1200 ÷ 3 = 400 amino acids.\nB6.1.2 wording: "recall that genetic variants arise from mutations, and that most have no effect on the phenotype, some influence phenotype and a very few determine phenotype". The triplet code is a stretch hint (protein synthesis detail is in B1 / not required). Node: 1/1200 × 100 = 0.0833.\nThe card labels under the boxes are illustrative examples only.',
}), 'B6.1.2 Mutations');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B6.1.1')}, ${sp('B6.1.2')} • variation and mutation`, [
  { q: 'Give **two** causes of variation between individuals of the same species.', marks: 2, ms: 'Genes / alleles inherited / genetic (1); environment / conditions, e.g. diet (1).' },
  { q: 'What is a **mutation**, and how can it add to the variation in a population?', marks: 2, ms: 'A change in the DNA (base sequence) / gene (1); produces a new allele / variant that can be inherited (if in a gamete) (1).' },
  { q: 'Most mutations have **no effect** on the phenotype. Describe the effects of the others.', marks: 2, ms: 'Some influence / partly change the phenotype (1); a very few determine the phenotype (on their own) (1).' },
  { q: 'In a class of **30** students, **9** can roll their tongue. Calculate the percentage.', marks: 2, ms: '9 ÷ 30 × 100 (1); = 30% (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 COMPETITION =======================
reg(D.contentSlide({
  title: 'Competition: not everyone survives',
  subtitle: `Specification ${sp('B6.1.4')} • the importance of competition in a community, with regard to natural selection`,
  tag: 'B6.1.4', caption: 'many more offspring are produced than survive; not to scale',
  draw: (s) => {
    label(s, 0.7, 1.42, 5.6, 'A pair of frogs lays about **2000** eggs', { size: 11, bold: true, h: 0.3 });
    for (let r = 0; r < 3; r++) for (let c = 0; c < 18; c++) ball(s, 0.95 + c * 0.3 + (r % 2) * 0.15, 1.9 + r * 0.22, 0.07, '3E4A3A', '1E261C', 0.5);
    poly(s, [[0.8, 2.6], [6.2, 2.6], [3.95, 4.75], [2.95, 4.75]], 'F3E3DA', 'B07A66', { lw: 1.25 });
    const fs = ['eaten by **predators**', 'killed by **disease**', 'not enough **food**', 'no **space** / mates'];
    fs.forEach((t, i) => label(s, 1.6 + (i % 2) * 1.75, 2.75 + Math.floor(i / 2) * 0.45, 1.75, t, { size: 10.5, color: '6B3318', h: 0.4 }));
    label(s, 2.4, 3.75, 2.1, '**competition** for limited resources', { size: 10.5, bold: true, color: HI, h: 0.45 });
    [3.15, 3.75].forEach(x => { oval(s, x, 5.1, 0.42, 0.3, '6FAE5C', '3E7F2E', { lw: 1 }); ball(s, x - 0.09, 4.98, 0.04, C.white, '1E261C'); ball(s, x + 0.09, 4.98, 0.04, C.white, '1E261C'); });
    label(s, 4.15, 4.95, 2.2, 'about **2** survive to breed', { size: 11, bold: true, color: '1E6B40', h: 0.32, align: 'left' });
    label(s, 0.7, 5.4, 5.6, 'the survivors are more likely to be those best suited to the conditions', { size: 10, italic: true, color: C.grey, h: 0.3 });
  },
  head: 'Why competition matters',
  lines: [
    'Organisms produce **more offspring** than the environment can support.',
    'Resources are **limited**. Animals compete for **food**, **water**, **space** and **mates**; plants for **light**, **water**, **mineral ions** and **space**.',
    'Individuals in a population **vary**. Those with features that help them **compete** are more likely to **survive** and **reproduce**.',
    'Without competition (and predators, disease) there would be **no selection**.',
  ],
  size: 11,
  worked: { head: 'Worked example: survival rate', q: '2000 eggs; on average 2 frogs survive to breed.',
    steps: [['Fraction', '2 ÷ 2000'], ['Percentage', '2 ÷ 2000 × 100'], ['Answer', '**0.1%** survive; 1998 do not']], size: 10.5 },
  workedH: 1.5,
  qc: 'A fish lays **5000** eggs and **4** survive to breed. Calculate the percentage that survive. Give **two** resources the young fish compete for.',
  notes: 'QUICK CHECK ANSWER: 4 ÷ 5000 × 100 = 0.08%. Any two: food, space / territory, oxygen, (later) mates. Not light.\nB6.1.4 wording: "explain the importance of competition in a community, with regard to natural selection". Competition within and between species was met in B3 (recall only). 2000 eggs is a typical frog spawn figure (order of magnitude); node: 2/2000 × 100 = 0.1; 4/5000 × 100 = 0.08.',
}), 'B6.1.4 Competition');

// ======================= 9 NATURAL SELECTION: PEPPERED MOTHS =======================
{
  const s = D.contentHeader('Natural selection step by step', `Specification ${sp('B6.1.3')} • evolution occurs through natural selection of variants better suited to their environment`, { tag: 'B6.1.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'peppered moths resting on tree bark; not to scale');
  // two barks
  bark(s, 0.75, 1.75, 2.55, 2.5, false);
  bark(s, 3.7, 1.75, 2.55, 2.5, true);
  label(s, 0.75, 1.42, 2.55, 'Clean air: pale, lichen bark', { size: 10.5, bold: true, h: 0.3 });
  label(s, 3.7, 1.42, 2.55, 'Polluted: soot-covered bark', { size: 10.5, bold: true, h: 0.3 });
  moth(s, 1.45, 2.45, 0.75, PALEM, PALE_EDGE); moth(s, 2.55, 3.5, 0.75, DARKM, '000000');
  moth(s, 4.35, 2.55, 0.75, DARKM, '000000'); moth(s, 5.5, 3.45, 0.75, PALEM, PALE_EDGE);
  ball(s, 2.55, 3.53, 0.44, null, HI, 2.5); ball(s, 5.5, 3.48, 0.44, null, HI, 2.5);
  label(s, 0.75, 4.3, 2.55, 'pale moth **camouflaged**; dark moth easily **seen** and eaten by birds', { size: 10, h: 0.55, valign: 'top' });
  label(s, 3.7, 4.3, 2.55, 'dark moth **camouflaged**; pale moth easily **seen** and eaten by birds', { size: 10, h: 0.55, valign: 'top' });
  // legend
  ball(s, 0.95, 5.1, 0.12, null, HI, 2); label(s, 1.12, 4.98, 2.3, '= seen by predators (birds)', { size: 10, align: 'left', h: 0.25 });
  moth(s, 3.85, 5.1, 0.4, PALEM, PALE_EDGE); label(s, 4.1, 4.98, 0.8, 'pale', { size: 10, align: 'left', h: 0.25 });
  moth(s, 4.85, 5.1, 0.4, DARKM, '000000'); label(s, 5.1, 4.98, 0.9, 'dark', { size: 10, align: 'left', h: 0.25 });
  label(s, 0.7, 5.4, 5.6, 'Wing colour is controlled by a gene; the **dark allele** arose by **mutation**.', { size: 10.5, h: 0.4 });
  // steps
  const steps = [
    ['1 Variation', 'Moths vary in wing colour (pale or dark) because of different **alleles**.'],
    ['2 Change', 'Soot from factories blackens the bark (1800s).'],
    ['3 Selection', 'Birds see and eat more **pale** moths. Dark moths are **better suited**: they survive.'],
    ['4 Reproduce', 'Dark moths **survive and breed**, passing on the **dark allele**.'],
    ['5 Evolution', 'Over many **generations** the dark allele and dark moths become **more common**.'],
  ];
  steps.forEach(([h, t], i) => {
    const y = 1.3 + i * 0.99;
    box(s, 6.8, y, 6.08, 0.89, i % 2 ? C.white : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    box(s, 6.8, y, 1.45, 0.89, C.blue, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 6.85, y, 1.35, h, { size: 12, bold: true, color: C.white, h: 0.89 });
    s.addText(D.rich(t, { fontSize: 11.5, color: C.text }), { x: 8.4, y, w: 4.38, h: 0.89, fontFace: 'Calibri', valign: 'middle', margin: 0 });
  });
  D.quickCheck(s, 'Use the five steps to explain why **pale** moths became common again after the air was cleaned up in the 1950s–60s.');
  D.notes(s, 'QUICK CHECK ANSWER: (1) Variation: pale and dark moths still present. (2) Change: clean air, lichen grows back, bark becomes pale. (3) Selection: dark moths now easily seen and eaten; pale moths camouflaged, so survive. (4) Pale moths breed, passing on the pale allele. (5) Over many generations the pale allele and pale moths become more common again.\nB6.1.3 wording: "explain how evolution occurs through natural selection of variants that give rise to phenotypes better suited to their environment". Exam tip: the moths do NOT change colour because they need to, and individuals do not change: the population changes over generations because of which individuals survive to breed. The dark (carbonaria) form is due to a single dominant allele (stretch). Antibiotic resistance is the second example (slide 14).');
  reg(s, 'B6.1.3 Natural selection: peppered moths');
}

// ======================= 10 PEPPERED MOTH DATA =======================
{
  const g = { x: 1.45, y: 1.6, w: 4.85, h: 3.4, xmin: 1840, xmax: 2020, ymin: 0, ymax: 100, xstep: 20, ystep: 20, minor: 2, xlabel: 'Year', ylabel: '% of moths that are dark' };
  reg(D.contentSlide({
    title: 'Data: peppered moths near Manchester',
    subtitle: `Specification ${sp('B6.1.3')}, ${sp('B6.1.5')} • evolution is a change in the inherited characteristics of a population`,
    tag: 'B6.1.3', caption: 'plotted to scale; values illustrative, based on historical accounts',
    draw: (s) => {
      D.axes(s, Object.assign({}, g, { fmt: v => String(v) }));
      const pts = MY.map((y, i) => [y, MP[i]]);
      D.plotLine(s, g, pts, DARKM, 2.25); D.points(s, g, pts, HI);
      line(s, D.px(g, 1956), g.y, D.px(g, 1956), g.y + g.h, C.green, 1.5, { dash: 'dash' });
      label(s, D.px(g, 1956) - 1.45, D.py(g, 22), 1.4, '1956 Clean Air Act', { size: 10, bold: true, color: C.green, align: 'right', h: 0.24 });
      label(s, D.px(g, 1878), D.py(g, 50), 1.4, 'soot from industry', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.24 });
    },
    head: 'Reading the graph',
    lines: [
      `In ${MY[0]} only about **${MP[0]}%** of moths were dark. By ${MY[2]} it was about **${MP[2]}%**.`,
      'The **population** changed, not individual moths: the **dark allele** became more common.',
      'After the **Clean Air Act**, bark became paler again and dark moths **fell** to about 10% by 2000.',
      'This is **evolution**: a change in the inherited characteristics of a population over time, by natural selection.',
    ],
    size: 11,
    worked: { head: 'Worked example: describe the change', q: 'By how much did the percentage of dark moths change from 1848 to 1895?',
      steps: [['Subtract', `${MP[2]} − ${MP[0]} = ${MP[2] - MP[0]}`], ['Time', `${MY[2]} − ${MY[0]} = ${MY[2] - MY[0]} years`], ['Answer', `a rise of **93 percentage points** in about 50 years`]], size: 10.5 },
    workedH: 1.6,
    qc: 'In 1895, what **percentage** of moths were pale? In a sample of **200** moths caught in 1895, how many would you expect to be pale?',
    notes: `QUICK CHECK ANSWER: 100 − 95 = 5% pale; 5% of 200 = 10 moths.\nData: shaped on the classic accounts (first dark moth recorded near Manchester in 1848; about 95–98% dark by the 1890s; steep fall after the Clean Air Acts, to under 10% by about 2000). Exact values are illustrative and UNVERIFIED to the percent. Node: 95 − 2 = 93; 1895 − 1848 = 47; 90 − 10 = 80.\nB6.1.5 wording: "describe evolution as a change in the inherited characteristics of a population over time, through a process of natural selection, which may result in the formation of new species".`,
  }), 'B6.1.3 Data: peppered moths');
}

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B6.1.3')}, ${sp('B6.1.4')} • competition and natural selection`, [
  { q: 'Explain why **competition** is important for natural selection.', marks: 2, ms: 'Resources are limited / more offspring than can survive (1); only the individuals best suited / best at competing survive and reproduce (1).' },
  { q: 'Before industry, most peppered moths were pale. Explain why.', marks: 2, ms: 'Pale moths camouflaged on pale / lichen bark (1); so fewer eaten by birds, survive and breed / pass on pale allele (1).' },
  { q: 'A student writes: "The moths turned dark so that they would not be eaten." Explain what is wrong with this.', marks: 2, ms: 'Individual moths cannot change colour / do not change because they need to (1); dark moths already existed (mutation) and were selected / survived and bred, so the proportion changed over generations (1).' },
  { q: 'Use the graph on the previous slide: describe how the percentage of dark moths changed between 1950 and 2000.', marks: 2, ms: 'Fell (1); from about 90% to about 10% / by about 80 percentage points (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 NEW SPECIES =======================
{
  const s = D.contentHeader('Evolution and new species', `Specification ${sp('B6.1.5')} • natural selection may result in the formation of new species`, { tag: 'B6.1.5' });
  D.panel(s, 0.45, 1.3, 7.2, 4.95, 'how one species can become two; not to scale');
  const pop = (x, y, w, h, cols, n, seed) => {
    box(s, x, y, w, h, 'E4F1D8', '5E9E4A', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1 });
    for (let i = 0; i < n; i++) {
      const fx = ((i * 37 + seed) % 97) / 97, fy = ((i * 53 + seed * 3) % 89) / 89;
      ball(s, x + 0.18 + fx * (w - 0.36), y + 0.18 + fy * (h - 0.36), 0.075, cols[i % cols.length], '3A3532', 0.5);
    }
  };
  // stage 1
  label(s, 0.65, 1.42, 2.1, '**1** One population', { size: 11, h: 0.3, align: 'left' });
  pop(0.7, 1.8, 2.0, 1.6, ['E07A5F', '7FA7D9', 'F2CC8F', '81B29A'], 18, 5);
  label(s, 0.65, 3.45, 2.1, 'lots of variation; all can **interbreed**', { size: 10, h: 0.5, valign: 'top' });
  arrow(s, 2.8, 2.6, 3.05, 2.6, C.ink, 2);
  // stage 2
  label(s, 3.05, 1.42, 2.2, '**2** Split by a barrier', { size: 11, h: 0.3, align: 'left' });
  pop(3.1, 1.8, 0.85, 1.6, ['E07A5F', '7FA7D9', 'F2CC8F', '81B29A'], 7, 2);
  box(s, 3.97, 1.8, 0.26, 1.6, C.water, C.waterDark, { lw: 0.75 });
  pop(4.25, 1.8, 0.85, 1.6, ['E07A5F', '7FA7D9', 'F2CC8F', '81B29A'], 7, 11);
  label(s, 3.05, 3.45, 2.1, 'e.g. a **river**, mountains or sea', { size: 10, h: 0.5, valign: 'top' });
  arrow(s, 5.2, 2.6, 5.45, 2.6, C.ink, 2);
  // stage 3
  label(s, 5.4, 1.42, 2.2, '**3** Different conditions', { size: 11, h: 0.3, align: 'left' });
  box(s, 5.5, 1.8, 0.95, 0.75, 'FBE3C8', 'B8730A', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 });
  label(s, 5.5, 1.8, 0.95, 'dry, hot', { size: 10, h: 0.75, bold: true, color: '8A4E06' });
  box(s, 6.5, 1.8, 0.95, 0.75, 'D6E8F7', C.waterDark, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 });
  label(s, 6.5, 1.8, 0.95, 'wet, cold', { size: 10, h: 0.75, bold: true, color: '2F5F8F' });
  label(s, 5.45, 2.62, 2.05, 'different **mutations** and **natural selection** on each side', { size: 10, h: 0.8, valign: 'top' });
  // stage 4 (bottom)
  arrow(s, 4.05, 3.95, 4.05, 4.2, C.ink, 2);
  label(s, 0.65, 3.95, 3.3, '**4** After many generations', { size: 11, h: 0.3, align: 'left' });
  pop(0.7, 4.3, 2.6, 1.15, ['E07A5F', 'F2CC8F'], 10, 3);
  box(s, 3.4, 4.3, 0.26, 1.15, C.water, C.waterDark, { lw: 0.75 });
  pop(3.75, 4.3, 2.6, 1.15, ['7FA7D9', '81B29A'], 10, 7);
  label(s, 0.7, 5.5, 6.8, 'So different they **cannot interbreed** to produce **fertile** offspring: **two species**', { size: 10.5, bold: true, color: HI, h: 0.3, align: 'left' });
  D.pill(s, 6.45, 4.35, 'GRADE 7–9 STRETCH', C.red, 1.15);
  label(s, 6.45, 4.7, 1.15, 'isolation as the cause', { size: 10, italic: true, color: C.grey, h: 0.5, valign: 'top' });
  D.card(s, 7.9, 1.3, 4.98, 3.05, 'Evolution can make new species', [
    '**Evolution**: a change in the **inherited characteristics** of a **population** over time, through **natural selection**.',
    'If two groups of a species evolve **differently** for long enough, they may form **new species**.',
    'A **species** is a group whose members can **interbreed** to produce **fertile** offspring.',
  ], { size: 11.5 });
  D.card(s, 7.9, 4.5, 4.98, 1.75, 'Stretch: why isolation matters', [
    'The barrier stops **alleles** being shared between the groups, so their differences **build up**.',
    'Darwin\'s **Galápagos** finches: one mainland species → many island species.',
  ], { size: 11, fill: 'FBEDEE', border: 'E9B7BB' });
  D.quickCheck(s, 'Define a **species**. Explain why two groups separated by a mountain range may become **different** species over time.');
  D.notes(s, 'QUICK CHECK ANSWER: A group of organisms that can interbreed to produce fertile offspring. The groups cannot interbreed, so alleles are not shared; they face different conditions, so different variants are selected (and different mutations arise); over many generations they become so different that they can no longer interbreed to produce fertile offspring.\nB6.1.5 wording ends "...which may result in the formation of new species". The isolation mechanism (geographical isolation → speciation) is not spelled out in the J260 statements found, so it is marked GRADE 7–9 STRETCH. Classification of species is B6.2 (not taught here). Extinction is not in the B6.1 statements found (it belongs with biodiversity, B6.3).');
  reg(s, 'B6.1.5 Evolution and new species');
}

// ======================= 13 FOSSILS =======================
reg(D.contentSlide({
  title: 'Evidence: fossils',
  subtitle: `Specification ${sp('B6.1.6')} • describe how fossils provide evidence for evolution`,
  tag: 'B6.1.6', caption: 'rock layers (strata) seen in a cliff; not to scale',
  draw: (s) => {
    const L = [['E9DCB8', 'mammals'], ['D9C08E', 'reptiles'], ['C7A777', 'fish'], ['B38F65', 'trilobites, shells'], ['9E7B57', 'simple sea life']];
    const x0 = 1.6, w = 3.2, h = 0.82, y0 = 1.5;
    L.forEach(([col, t], i) => {
      const y = y0 + i * h;
      poly(s, [[x0, y + (i % 2 ? 0.05 : 0)], [x0 + w, y + (i % 2 ? 0 : 0.05)], [x0 + w, y + h], [x0, y + h]], col, '7A5E3E', { lw: 0.75 });
      label(s, x0 + w + 0.1, y + 0.2, 1.6, t, { size: 10.5, bold: true, align: 'left', h: 0.4 });
    });
    // fossils in layers
    const yc = i => y0 + i * h + h / 2;
    // simple sea life: small blobs
    [0.5, 1.3, 2.2, 2.8].forEach(dx => oval(s, x0 + dx, yc(4), 0.2, 0.1, 'F2E8D2', '5A4632', { lw: 0.75 }));
    // trilobite: segmented oval; shell: fan
    oval(s, x0 + 0.9, yc(3), 0.42, 0.28, 'E8DCC2', '5A4632', { lw: 1 });
    [-0.08, 0, 0.08].forEach(d => line(s, x0 + 0.72, yc(3) + d, x0 + 1.08, yc(3) + d, '5A4632', 0.75));
    s.addShape(SH.PIE, { x: x0 + 2.0, y: yc(3) - 0.2, w: 0.45, h: 0.45, angleRange: [200, 340], fill: { color: 'E8DCC2' }, line: { color: '5A4632', width: 1 } });
    // fish
    oval(s, x0 + 1.5, yc(2), 0.6, 0.22, 'E8DCC2', '5A4632', { lw: 1 });
    poly(s, [[x0 + 1.8, yc(2)], [x0 + 2.0, yc(2) - 0.12], [x0 + 2.0, yc(2) + 0.12]], 'E8DCC2', '5A4632', { lw: 1 });
    // reptile skeleton: spine and ribs
    line(s, x0 + 0.6, yc(1), x0 + 2.4, yc(1), '5A4632', 2);
    for (let i = 0; i < 7; i++) line(s, x0 + 1.0 + i * 0.18, yc(1) - 0.14, x0 + 1.0 + i * 0.18, yc(1) + 0.14, '5A4632', 1);
    oval(s, x0 + 0.5, yc(1), 0.25, 0.16, 'E8DCC2', '5A4632', { lw: 1 });
    // mammal skull
    oval(s, x0 + 1.6, yc(0), 0.55, 0.32, 'F5EEDC', '5A4632', { lw: 1 });
    ball(s, x0 + 1.5, yc(0) - 0.03, 0.05, '5A4632', '5A4632');
    poly(s, [[x0 + 1.85, yc(0) - 0.05], [x0 + 2.2, yc(0) + 0.02], [x0 + 1.85, yc(0) + 0.12]], 'F5EEDC', '5A4632', { lw: 1 });
    // age arrow
    arrow(s, 1.35, y0 + 5 * h - 0.05, 1.35, y0 + 0.05, C.ink, 2.25);
    label(s, 0.5, y0 + 2.2 * h, 0.8, 'younger ↑\n\nolder ↓', { size: 10, bold: true, h: 1.0 });
    label(s, 0.6, y0 + 5 * h + 0.03, 5.8, 'deeper layers formed **earlier**, so their fossils are **older**', { size: 10.5, h: 0.3 });
  },
  head: 'What fossils show',
  lines: [
    'A **fossil** is the remains or traces of an organism from long ago, preserved in **rock** (e.g. hard parts replaced by minerals, footprints, organisms in amber or ice).',
    'Rock layers can be **dated**: deeper layers are usually **older**.',
    'Older rocks hold **simpler** organisms; newer rocks hold more **complex** ones, and some species appear that were not there before.',
    'This shows that organisms have **changed over time**: evidence for evolution.',
    'The record has **gaps**: soft bodies decay, many fossils were destroyed by rock movement, or not yet found.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: how old?', q: 'A layer of mud built up at about 1 cm every 1000 years. A fossil is 350 cm deep.',
    steps: [['Multiply', '350 cm × 1000 years per cm'], ['Answer', 'about **350 000 years** old']], size: 10.5 },
  workedH: 1.25,
  qc: 'Give **two** reasons why the fossil record is **incomplete**. Using the same rate, how old is a fossil **1.2 m** deep?',
  notes: 'QUICK CHECK ANSWER: Any two: soft-bodied organisms decay before they can fossilise; most organisms never fossilise (conditions rarely right); fossils destroyed by geological activity / erosion; many not yet found. 1.2 m = 120 cm × 1000 = 120 000 years.\nB6.1.6 wording: "describe how fossils provide evidence for evolution". The deposition rate is illustrative (real rates vary hugely). Strata drawing is a teaching model; the order shown (simple sea life → trilobites → fish → reptiles → mammals) follows the broad fossil record. Node: 350 × 1000 = 350 000; 120 × 1000 = 120 000.',
}), 'B6.1.6 Evidence: fossils');

// ======================= 14 ANTIBIOTIC RESISTANCE =======================
reg(D.contentSlide({
  title: 'Evidence: antibiotic resistance',
  subtitle: `Specification ${sp('B6.1.7')} • modern evidence for evolution (recap of Chapter B2)`,
  tag: 'B6.1.7', caption: 'a population of bacteria in a patient; not to scale',
  draw: (s) => {
    const P = [[1.75, 2.6], [4.95, 2.6], [4.95, 4.65], [1.75, 4.65]];
    const R = 0.82;
    P.forEach(([cx, cy]) => ball(s, cx, cy, R, 'F7F3E8', '8C8270', 1.25));
    const spots = [[-0.45, -0.35, 20], [0.1, -0.5, -30], [0.45, -0.15, 60], [-0.2, 0.05, -10], [0.3, 0.35, 30], [-0.5, 0.35, 70], [0.05, 0.6, 0], [-0.1, -0.2, 45]];
    // 1 mutation
    spots.forEach(([dx, dy, r], i) => bacterium(s, P[0][0] + dx, P[0][1] + dy, i === 3, r));
    // 2 antibiotic
    spots.forEach(([dx, dy, r], i) => (i === 3 ? bacterium(s, P[1][0] + dx, P[1][1] + dy, true, r) : deadBac(s, P[1][0] + dx, P[1][1] + dy, r)));
    // 3 survivor divides
    [[-0.2, 0.05, -10], [0.15, 0.05, 20], [-0.05, -0.3, 60], [0.05, 0.38, -40]].forEach(([dx, dy, r]) => bacterium(s, P[2][0] + dx, P[2][1] + dy, true, r));
    // 4 resistant population
    spots.forEach(([dx, dy, r]) => bacterium(s, P[3][0] + dx, P[3][1] + dy, true, r));
    arrow(s, 2.7, 2.6, 4.0, 2.6, C.ink, 2); arrow(s, 4.95, 3.48, 4.95, 3.78, C.ink, 2); arrow(s, 4.0, 4.65, 2.7, 4.65, C.ink, 2);
    label(s, 0.6, 1.38, 2.6, '**1** a **mutation** makes one bacterium resistant', { size: 10, h: 0.45, valign: 'top', align: 'left' });
    label(s, 3.65, 1.38, 2.8, '**2** antibiotic kills the **non-resistant** bacteria', { size: 10, h: 0.45, valign: 'top', align: 'left' });
    label(s, 2.85, 2.68, 1.0, 'antibiotic', { size: 10, bold: true, color: C.orange, h: 0.25 });
    label(s, 5.55, 5.5, 1.0, '**3** it survives and **divides**', { size: 10, h: 0.4, valign: 'top', align: 'left' });
    label(s, 0.6, 5.52, 3.3, '**4** the population is now **resistant**', { size: 10, h: 0.4, valign: 'top', align: 'left' });
    bacterium(s, 2.9, 3.45, false); label(s, 3.1, 3.32, 1.4, 'not resistant', { size: 10, align: 'left', h: 0.25 });
    bacterium(s, 2.9, 3.8, true); label(s, 3.1, 3.67, 1.4, 'resistant', { size: 10, align: 'left', h: 0.25, color: HI, bold: true });
  },
  head: 'Evolution we can watch',
  lines: [
    '**Recap B2**: antibiotics kill **bacteria**; some bacteria are now **resistant**, e.g. **MRSA**.',
    'This is **natural selection**: variation (a **mutation**), selection (the antibiotic), survivors **reproduce** and pass on the resistance allele.',
    'Bacteria reproduce very **fast**, so we can see evolution happen in **years**, not millions of years.',
    'So it is **modern evidence** for evolution that supports the fossil record.',
  ],
  size: 11,
  worked: { head: 'Worked example: how fast?', q: 'A resistant bacterium divides every 20 minutes. How many after 4 hours?',
    steps: [['Generations', '240 min ÷ 20 min = 12'], ['Powers of 2', '2¹² = 4096'], ['Answer', `**${2 ** gens4h}** resistant bacteria from one`]], size: 10.5 },
  workedH: 1.6,
  qc: 'Why does antibiotic resistance count as **evidence** for evolution? How many bacteria would one resistant bacterium produce in **3 hours**?',
  notes: 'QUICK CHECK ANSWER: It shows a population changing its inherited characteristics by natural selection, observed directly in a short time (the proportion of resistant bacteria increases because of a selection pressure). 180 ÷ 20 = 9 generations; 2⁹ = 512.\nB6.1.7 wording: "describe modern examples of evidence for evolution including antibiotic resistance in bacteria". OVERLAP: antibiotics, MRSA and how to reduce resistance (finish the course, do not overuse) were taught in Chapter B2: recap only here. Ideal conditions assumed in the maths (no deaths, unlimited food). Node: 240/20 = 12; 2^12 = 4096; 2^9 = 512. Other modern evidence (stretch): warfarin-resistant rats, pesticide-resistant insects, DNA comparisons (DNA and classification are B6.2).',
}), 'B6.1.7 Evidence: antibiotic resistance');

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B6.1.5')}–${sp('B6.1.7')} • new species and evidence`, [
  { q: 'Define **evolution**.', marks: 2, ms: 'A change in the inherited characteristics of a population (1); over time / many generations, by natural selection (1).' },
  { q: 'Describe how **fossils** provide evidence for evolution.', marks: 2, ms: 'Fossils in different rock layers can be dated / older in deeper layers (1); show organisms changing over time / simpler organisms in older rocks (1).' },
  { q: 'A resistant bacterium divides every 20 minutes. How many are there after **100 minutes**?', marks: 2, ms: '100 ÷ 20 = 5 generations (1); 2⁵ = 32 (1).' },
  { q: 'Explain how a population of bacteria becomes **resistant** to an antibiotic.', marks: 2, ms: 'A mutation makes some bacteria resistant (1); antibiotic kills non-resistant bacteria so resistant ones survive and reproduce / pass on resistance (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 ACTIVITY: METHOD =======================
reg(D.contentSlide({
  title: 'Modelling natural selection: method',
  subtitle: `Specification ${sp('B6.1.3')} • a camouflage model of predators and prey`,
  tag: 'Activity', pag: 'SUGGESTED ACTIVITY', caption: 'apparatus: patterned background, paper "moths", forceps, stop clock, tally chart',
  draw: (s) => {
    // dark bark background with dark and pale paper squares
    bark(s, 0.75, 1.5, 3.3, 2.7, true);
    const pts = [[0.95, 1.7], [1.5, 2.1], [2.2, 1.65], [2.85, 2.0], [3.6, 1.75], [1.1, 2.6], [1.85, 2.9], [2.55, 2.55], [3.3, 2.75], [3.75, 3.3], [1.0, 3.5], [1.7, 3.75], [2.4, 3.45], [3.0, 3.85], [2.05, 2.25], [3.2, 3.3]];
    pts.forEach(([x, y], i) => box(s, x, y, 0.16, 0.12, i % 2 ? '1F1C1A' : PALEM, i % 2 ? '000000' : PALE_EDGE, { lw: 0.5 }));
    label(s, 0.75, 4.25, 3.3, 'dark background ("sooty bark") with 20 dark and 20 pale paper squares', { size: 10, h: 0.5, valign: 'top' });
    // forceps
    line(s, 4.55, 1.7, 5.2, 3.2, '6B7385', 3); line(s, 4.75, 1.65, 5.24, 3.2, '6B7385', 3);
    label(s, 4.3, 3.3, 1.4, 'forceps ("beak")', { size: 10, h: 0.25 });
    // stop clock
    ball(s, 5.95, 2.2, 0.35, C.white, C.ink, 1.5);
    line(s, 5.95, 2.2, 5.95, 1.95, C.ink, 1.5); line(s, 5.95, 2.2, 6.12, 2.27, C.ink, 1.5);
    box(s, 5.89, 1.77, 0.12, 0.08, C.ink, null);
    label(s, 5.4, 2.6, 1.1, '15 s per turn', { size: 10, h: 0.25 });
    // tally table
    box(s, 4.35, 3.75, 2.0, 1.45, C.white, '5A6275', { lw: 0.75 });
    line(s, 4.35, 4.1, 6.35, 4.1, '5A6275', 0.75); line(s, 5.35, 3.75, 5.35, 5.2, '5A6275', 0.75);
    label(s, 4.35, 3.75, 1.0, 'Dark eaten', { size: 10, bold: true, h: 0.35 }); label(s, 5.35, 3.75, 1.0, 'Pale eaten', { size: 10, bold: true, h: 0.35 });
    label(s, 4.35, 4.15, 1.0, '| | | | |', { size: 12, bold: true, h: 0.4 }); label(s, 5.35, 4.15, 1.0, '15', { size: 12, bold: true, h: 0.4 });
    label(s, 0.7, 4.85, 3.5, 'Model: squares = moths; forceps = birds; background = bark', { size: 10, italic: true, color: C.grey, h: 0.5, valign: 'top' });
  },
  head: 'Method',
  lines: [
    'Scatter **20 dark** and **20 pale** squares on the dark background.',
    'The "bird" uses forceps to pick up squares, one at a time, until **20** are removed. Record the colours.',
    'Each **survivor** "breeds": add one more square of the same colour (double the survivors) to give **40** again.',
    'Repeat for **3 generations**. Calculate the **% dark** each generation. Pool class results.',
    '**IV**: generation. **DV**: % dark moths. **Control**: same background, square size, number removed, same "bird" method.',
    '**Safety**: forceps can pinch; do not wave them near eyes. Pick up dropped squares to avoid slips.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: first generation', q: 'The bird removed 5 dark and 15 pale squares.',
    steps: [['Survivors', 'dark 20 − 5 = 15; pale 20 − 15 = 5'], ['Breed (×2)', 'dark 30; pale 10; total 40'], ['Answer', '% dark = 30 ÷ 40 × 100 = **75%**']], size: 10.5 },
  workedH: 1.6,
  qc: 'In this model, what do the **forceps**, the **squares** and the **background** represent? What has been **removed** from real life to make the model simpler?',
  notes: 'QUICK CHECK ANSWER: Forceps = birds (predators); squares = moths (prey, two variants); background = tree bark (environment). Simplified: no mutation, no genes / alleles (offspring copy the parent exactly), one generation is instant, predator always searches the same way, no other causes of death, constant population size.\nSuggested activity (no PAG code linked to B6.1 was found). Node: gen 0 survivors 15 and 5; doubled 30 and 10; 30/40 × 100 = 75%. Make the squares with a hole punch or cut 1 cm squares of black and cream paper. A pale background reverses the result: good for a class comparison.',
}), 'Activity: modelling natural selection (method)');

// ======================= 17 ACTIVITY: RESULTS =======================
{
  const s = D.contentHeader('Modelling natural selection: results', `Specification ${sp('B6.1.3')} • the dark variant becomes more common each generation`, { pag: 'SUGGESTED ACTIVITY', tag: 'Activity' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'percentage of dark squares at the start of each generation, plotted to scale');
  const g = { x: 1.5, y: 1.6, w: 4.7, h: 3.5, xmin: 0, xmax: 3, ymin: 0, ymax: 100, xstep: 1, ystep: 20, minor: 2, xlabel: 'Generation', ylabel: '% dark squares' };
  D.axes(s, g);
  const pts = GEN.map((r, i) => [r.g, pctD[i]]);
  D.plotLine(s, g, pts, DARKM, 2.25); D.points(s, g, pts, HI);
  pts.forEach(([x, y]) => label(s, D.px(g, x) + (x === 3 ? -0.65 : 0.1), D.py(g, y) + (x === 3 ? 0.12 : 0.02), 0.6, `${y}%`, { size: 10, bold: true, h: 0.22 }));
  const rows = [[HDR('Gen'), HDR('Dark at start'), HDR('Pale at start'), HDR('Dark eaten'), HDR('Pale eaten'), HDR('% dark')],
    ...GEN.map((r, i) => [tcell(String(r.g), i), tcell(String(r.d), i), tcell(String(r.p), i), tcell(r.de != null ? String(r.de) : '–', i), tcell(r.pe != null ? String(r.pe) : '–', i), tcell(`${pctD[i]}`, i, { bold: true })])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [0.6, 1.15, 1.15, 1.05, 1.05, 1.08], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 2.95, 6.08, 1.45, 'Worked example: generation 2', 'Start: 36 dark, 4 pale (40 squares).', [
    ['Divide', '36 ÷ 40 = 0.9'], ['Answer', '× 100 = **90%** dark']], { size: 10.5 });
  D.card(s, 6.8, 4.5, 6.08, 1.75, 'Errors and limits of the model', [
    'The "bird" learns where to look: **random error**; take turns and pool class results.',
    'Squares may be picked by **touch** not sight: pick with eyes on the sheet, timed.',
    'No **genes** or **mutations**; real selection takes many more generations.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Describe the **trend** in the graph and explain it using natural selection. Predict the result on a **pale** background.');
  D.notes(s, `QUICK CHECK ANSWER: The percentage of dark squares rises each generation (50 → 75 → 90 → 95%), rising more slowly as it approaches 100%. Dark squares are camouflaged on the dark background, so fewer are picked (eaten); more dark survive and "breed", so the dark variant becomes more common. On a pale background the pale squares would become more common instead.\nData: illustrative class means, checked in node (each round removes 20; survivors doubled; totals 40). % dark: ${pctD.join(', ')}. Generation 0: 15 of 20 pale eaten = 75%.`);
  reg(s, 'Activity: modelling natural selection (results)');
}

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B6.1.3')} • the camouflage model`, [
  { q: 'In the model, a generation started with **30** dark and **10** pale squares. Calculate the percentage of dark squares.', marks: 2, ms: '30 ÷ 40 × 100 (1); = 75% (1).' },
  { q: 'Name the **independent** and **dependent** variables in the camouflage model.', marks: 2, ms: 'IV: generation (number) / background colour (1); DV: percentage / number of dark (or pale) squares (1).' },
  { q: 'Give **two** ways in which the model is **different** from natural selection in real moths.', marks: 2, ms: 'Any two (1 each): no genes / alleles / inheritance; no mutations; fewer generations / faster; only one predator; no other causes of death; offspring identical to parent; population fixed at 40.' },
  { q: 'Explain why the class results were **pooled** (combined).', marks: 2, ms: 'Reduces the effect of random error / one unusual result / one predator\'s habits (1); gives a more reliable / repeatable mean / trend (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 19 DARWIN AND WALLACE =======================
{
  const s = D.contentHeader('Darwin and Wallace', `Specification ${sp('B6.1.8')} • the work of Darwin and Wallace in developing the theory of evolution by natural selection`, { tag: 'B6.1.8' });
  D.panel(s, 0.45, 1.3, 12.43, 2.15, 'timeline drawn to scale, 1800–1870');
  const X = y => 0.95 + (y - 1800) / 70 * 11.4, ty = 2.3;
  line(s, X(1800), ty, X(1870), ty, C.ink, 2.5);
  for (let y = 1800; y <= 1870; y += 10) { line(s, X(y), ty - 0.07, X(y), ty + 0.07, C.ink, 1.25); label(s, X(y) - 0.3, ty + 0.1, 0.6, String(y), { size: 10, h: 0.2 }); }
  const ev = [[1809, 'Lamarck\'s theory published', 'above', C.grey], [1831, 'Beagle voyage begins (to 1836)', 'below', C.blue], [1835, 'Galápagos finches and tortoises', 'above', C.blue], [1854, 'Wallace in the Malay Archipelago', 'below', C.orange], [1858, 'Wallace\'s letter; joint paper read', 'above', C.orange], [1859, 'On the Origin of Species', 'below', HI]];
  ev.forEach(([y, t, pos, col]) => {
    ball(s, X(y), ty, 0.08, col, col);
    const up = pos === 'above';
    line(s, X(y), up ? ty - 0.42 : ty + 0.32, X(y), up ? ty - 0.08 : ty + 0.08, col, 1);
    const lx = y === 1854 ? X(y) - 2.15 : y === 1859 ? X(y) - 0.05 : X(y) - 1.1, al = y === 1854 ? 'right' : y === 1859 ? 'left' : 'center';
    label(s, lx, up ? ty - 0.82 : ty + 0.34, 2.2, `**${y}** ${t}`, { size: 10, color: col === C.grey ? C.text : col, h: 0.4, valign: up ? 'bottom' : 'top', align: al });
  });
  D.card(s, 0.45, 3.6, 4.05, 2.65, 'Charles Darwin', [
    'Voyage on the **Beagle**: collected fossils, plants and animals; noticed **finches** on the Galápagos differed from island to island.',
    'Used **selective breeding** (pigeons) as a model for selection.',
    'Spent ~20 years gathering **evidence** before publishing.',
  ], { size: 10.5 });
  D.card(s, 4.64, 3.6, 4.05, 2.65, 'Alfred Russel Wallace', [
    'Collected thousands of species in South America and SE Asia.',
    '**Independently** reached the same idea of natural selection; sent Darwin his essay in **1858**.',
    'Their ideas were **presented together** in 1858; Darwin published the next year.',
  ], { size: 10.5 });
  D.workedSteps(s, 8.83, 3.6, 4.05, 2.65, 'Worked example: reading the timeline', 'How long after returning from the voyage did Darwin publish?', [
    ['Subtract', '1859 − 1836'], ['Answer', '**23 years**: he kept collecting evidence']], { size: 10.5 });
  D.quickCheck(s, 'Why was it important that Wallace reached the **same** idea **independently**? How many years were there between Lamarck\'s theory and the Origin?');
  D.notes(s, 'QUICK CHECK ANSWER: Two scientists reaching the same explanation from different evidence (different places and species) makes the explanation more convincing / supports it. 1859 − 1809 = 50 years.\nB6.1.8 wording: "describe the work of Darwin and Wallace in the development of the theory of evolution by natural selection and explain the impact of these ideas on biology". Dates: Lamarck Philosophie zoologique 1809; Beagle voyage 1831–1836 (Galápagos visit 1835); Wallace in the Malay Archipelago 1854–1862; Wallace\'s Ternate essay 1858, joint Darwin–Wallace papers read at the Linnean Society on 1 July 1858; On the Origin of Species, November 1859. Node: 1859 − 1836 = 23; 1859 − 1809 = 50. Selective breeding appears only as Darwin\'s model (it is taught elsewhere in the course).');
  reg(s, 'B6.1.8 Darwin and Wallace');
}

// ======================= 20 LAMARCK VS DARWIN =======================
{
  const s = D.contentHeader('How theories develop: Lamarck vs Darwin', `Specification ${sp('B6.1.8')} • Ideas about Science: how explanations are tested and accepted`, { tag: 'B6.1.8' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'two explanations of why giraffes have long necks; not to scale');
  // Lamarck row
  label(s, 0.65, 1.38, 6.2, '**Lamarck (1809)**: changes during life are passed on', { size: 11, h: 0.3, align: 'left', color: '5A6275' });
  const yb1 = 3.45;
  tree(s, 0.9, yb1, 1.55); giraffe(s, 1.75, yb1, 0.55, 0.75);
  arrow(s, 2.35, 2.9, 2.75, 2.9, C.ink, 1.5);
  tree(s, 3.05, yb1, 1.55); giraffe(s, 3.85, yb1, 0.95, 0.75);
  arrow(s, 4.45, 2.9, 4.85, 2.9, C.ink, 1.5);
  giraffe(s, 5.75, yb1, 0.95, 0.75);
  label(s, 1.15, yb1 + 0.02, 1.3, 'stretches to reach leaves', { size: 10, h: 0.4, valign: 'top' });
  label(s, 3.2, yb1 + 0.02, 1.3, 'neck gets longer in its life', { size: 10, h: 0.4, valign: 'top' });
  label(s, 5.1, yb1 + 0.02, 1.4, 'offspring born with long neck ✗', { size: 10, h: 0.4, valign: 'top', color: HI, bold: true });
  line(s, 0.65, 3.95, 6.85, 3.95, C.line, 1, { dash: 'dash' });
  // Darwin row
  label(s, 0.65, 3.98, 6.2, '**Darwin (1859)**: natural selection of inherited variation', { size: 11, h: 0.3, align: 'left', color: C.blue });
  const yb2 = 5.55;
  giraffe(s, 0.95, yb2, 0.35, 0.6); giraffe(s, 1.5, yb2, 0.6, 0.6); giraffe(s, 2.05, yb2, 0.45, 0.6);
  arrow(s, 2.45, 5.1, 2.8, 5.1, C.ink, 1.5);
  tree(s, 3.05, yb2, 1.05); giraffe(s, 3.55, yb2, 0.6, 0.6);
  line(s, 2.95, 5.35, 3.15, 5.55, HI, 2); line(s, 2.95, 5.55, 3.15, 5.35, HI, 2);
  arrow(s, 4.05, 5.1, 4.4, 5.1, C.ink, 1.5);
  giraffe(s, 4.85, yb2, 0.6, 0.6); giraffe(s, 5.45, yb2, 0.6, 0.6); giraffe(s, 6.05, yb2, 0.55, 0.6);
  label(s, 0.6, 5.56, 1.9, 'necks **vary**', { size: 10, h: 0.25 });
  label(s, 2.65, 5.56, 1.6, 'short necks starve', { size: 10, h: 0.25 });
  label(s, 4.4, 5.56, 2.2, 'long necks breed: **inherited** ✓', { size: 10, h: 0.25, color: C.green, bold: true });
  D.card(s, 7.3, 1.3, 5.58, 2.55, 'Why Darwin\'s explanation won', [
    'Lamarck\'s idea was **tested**: features gained in life (e.g. cut tails, big muscles) are **not** inherited. It was **rejected**.',
    'Darwin\'s explained **more** observations (fossils, finches, breeding) and made **predictions** that were later confirmed.',
    'Later **genetics** (Mendel, genes, DNA, mutations) explained **how** variation is inherited.',
  ], { size: 10.5 });
  D.card(s, 7.3, 4.0, 5.58, 2.25, 'Slow acceptance and impact on biology', [
    'At first many objected: it conflicted with **religious** beliefs; there was little evidence of **how** features were inherited.',
    '**Impact**: all living things share **common ancestors**; it is the basis of modern biology, from classification to fighting **antibiotic resistance**.',
  ], { size: 10.5, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'A bodybuilder has large muscles. Use this to explain why scientists rejected **Lamarck\'s** theory.');
  D.notes(s, 'QUICK CHECK ANSWER: The muscles were gained during the bodybuilder\'s life (acquired by use); their children are not born with large muscles because the change is not in the DNA / gametes. Lamarck predicted acquired characteristics would be inherited; the evidence does not support this, so his explanation was rejected.\nIdeas about Science: scientific explanations are developed from data, tested by predictions, discussed by the scientific community, and accepted when they explain more and survive testing; they can be modified when new evidence arrives (e.g. genetics added to Darwin, the "modern synthesis"). B6.1.8 includes "explain the impact of these ideas on biology". Lamarck is the comparison for how theories develop; the exact phrase "Lamarck" was not found in the J260 statements (medium confidence that it is assessed by name). Epigenetics is beyond GCSE.');
  reg(s, 'B6.1.8 Lamarck vs Darwin (Ideas about Science)');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('B6.1.8')} • Darwin, Wallace and Lamarck`, [
  { q: 'Describe **one** observation Darwin made on his voyage that helped him develop his theory.', marks: 2, ms: 'Finches / tortoises / animals differed between the Galápagos islands (1); each suited / adapted to the food or conditions on its island / fossils similar to living species (1).' },
  { q: 'Describe the part **Wallace** played in the theory of evolution by natural selection.', marks: 2, ms: 'Came up with the same idea / natural selection independently (1); sent his essay to Darwin; ideas presented jointly in 1858 / prompted Darwin to publish (1).' },
  { q: 'Explain how **Lamarck\'s** explanation differs from Darwin\'s.', marks: 2, ms: 'Lamarck: changes acquired during life (by use) are passed on (1); Darwin: individuals already vary (inherited variation); the best suited survive and breed (1).' },
  { q: 'Give **two** reasons why Darwin\'s theory was not accepted by everyone at first.', marks: 2, ms: 'Any two (1 each): conflicted with religious belief / creation; not enough evidence at the time; no explanation of how characteristics were inherited (genes unknown); people found it hard to accept humans share ancestors with apes.' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Variation', 'Differences between individuals of the same species.'],
  ['Genetic variation', 'Variation caused by different alleles; can be inherited.'],
  ['Mutation', 'A change in the DNA base sequence; makes a new variant.'],
  ['Variant', 'A different version (allele) of a gene in a population.'],
  ['Phenotype', 'The observable characteristics of an organism (recap of B1).'],
  ['Competition', 'Organisms trying to get the same limited resources.'],
  ['Natural selection', 'Better-suited variants survive, breed and pass on their alleles.'],
  ['Evolution', 'Change in the inherited characteristics of a population over time.'],
  ['Species', 'Organisms that can interbreed to produce fertile offspring.'],
  ['Camouflage', 'Colouring that makes an organism hard for predators to see.'],
  ['Fossil', 'Remains or traces of an organism from long ago, preserved in rock.'],
  ['Fossil record', 'All the fossils found; shows change over time but has gaps.'],
  ['Antibiotic resistance', 'Bacteria not killed by an antibiotic; evidence for evolution.'],
  ['Darwin', 'Published On the Origin of Species (1859): evolution by natural selection.'],
  ['Wallace', 'Reached the idea of natural selection independently (1858).'],
  ['Lamarck', 'Wrongly proposed that changes gained in life are inherited.'],
], { notes: 'Use as a cover-and-recall activity. Exam tip: write "better suited" or "better adapted" and "survive AND reproduce, passing on their alleles"; never "they evolved because they needed to". Phenotype is a recap term from B1.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A species of lizard lives on an island. Some lizards are **pale** and some are **dark**. A volcano erupts and covers much of the island in **black lava rock**. Birds eat the lizards.', [
  { l: 'a', q: 'Lizard colour is controlled by genes. Explain how the **dark** variant first arose.', marks: 2, ms: 'A mutation (1); a change in the DNA / gene produced a new allele / variant (1).' },
  { l: 'b', q: 'Before the eruption, **18** of a sample of **60** lizards were dark. Calculate the percentage that were dark.', marks: 2, ms: '18 ÷ 60 × 100 (1); = 30% (1).' },
  { l: 'c', q: 'Twenty years later, **51** of **60** lizards were dark. Explain this change using the idea of **natural selection**.', marks: 4, h: 1.5, ms: 'Variation: some lizards already dark (1); dark lizards camouflaged on black rock, so fewer eaten by birds / pale ones seen and eaten (1); dark lizards survive and reproduce (1); pass on the dark allele, so over generations the proportion of dark lizards increases (to 85%) (1).' },
  { l: 'd', q: 'Explain why **competition** between the lizards matters for natural selection.', marks: 2, ms: 'Resources (food / space / mates) are limited, so not all survive (1); those best suited / best at competing survive to reproduce (1).' },
  { l: 'e', q: 'Describe how **fossils** could show that the lizards\' ancestors were different.', marks: 2, ms: 'Fossils in older / deeper rock layers can be dated (1); comparing them with living lizards shows how features changed over time (1).' },
  { l: 'f', q: 'Name the scientist who, **with Darwin**, first proposed the theory of evolution by natural selection.', marks: 1, ms: 'Alfred Russel Wallace (1).' },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • both tiers` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Variation: the moth population contained pale and dark moths; wing colour is inherited (alleles); the dark allele arose by mutation.',
    'Before industry: pale lichen bark; pale moths camouflaged, dark moths easily seen and eaten by birds; pale moths survived and bred; dark rare.',
    'Industrial pollution: soot killed lichen / blackened bark; dark moths now camouflaged; pale moths seen and eaten.',
    'Dark moths survived, reproduced and passed on the dark allele; over many generations the proportion of dark moths rose (to about 95%).',
    'Clean Air Act / less pollution: bark paler again; selection reversed; pale moths survive and breed; dark moths fall.',
    'Competition / predation is the selection pressure; individuals do not change colour; the population changes over generations: evolution.',
  ], {
    l3: 'Explains BOTH the rise AND the fall in dark moths using all the steps of natural selection (variation, selection by predators, survival and reproduction, inheritance of alleles over generations).',
    l2: 'Explains either the rise or the fall using most steps of natural selection, OR describes both changes with some explanation.',
    l1: 'Simple statements, e.g. "dark moths were camouflaged on the dark trees" or "birds ate the pale moths".',
  });
}
const HW = [
  { n: '1', q: 'State what is meant by **evolution**.', marks: 1, ms: 'A change in the inherited characteristics of a population over time (by natural selection) (1).' },
  { n: '2', q: 'A bacterium divides every **30 minutes**. How many bacteria will one bacterium produce in **6 hours**?', marks: 2, ms: '360 ÷ 30 = 12 generations (1); 2¹² = 4096 (1).' },
  { n: '3', q: 'Give **two** reasons why there are **gaps** in the fossil record.', marks: 2, ms: 'Any two (1 each): soft-bodied organisms decay / do not fossilise; conditions for fossils are rare; fossils destroyed by geological activity / erosion; many not yet found.' },
  { n: '4', q: 'A giraffe stretches its neck all its life. Lamarck said its offspring would have longer necks. Explain why this idea was **rejected**.', marks: 2, ms: 'Changes gained during life are not passed on / not in the genes / gametes (1); evidence (e.g. experiments, cut tails, muscles) shows acquired features are not inherited (1).' },
  { n: '5', q: 'Explain why most **mutations** do not change an organism\'s phenotype.', marks: 2, h: 1.1, ms: 'Most mutations do not change the protein / its function (1); e.g. same amino acid coded / in non-coding DNA / recessive allele masked (1). Accept: most have no effect, some influence, very few determine the phenotype (1 max).' },
  { n: '6', q: 'Three groups modelled natural selection and found **12**, **15** and **9** dark squares eaten. Calculate the mean.', marks: 2, h: 0.9, ms: '(12 + 15 + 9) ÷ 3 (1); = 12 (1).' },
  { n: '7', q: 'In the 1800s dark peppered moths became common near Manchester. After the 1950s pale moths became common again. Use **natural selection** to explain **both** changes.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. All questions are for both tiers.', HW, 17, { dividerSub: 'B6.1 Evolution • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
const out = path.join(__dirname, 'OCR21C_B6.1_Evolution_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
