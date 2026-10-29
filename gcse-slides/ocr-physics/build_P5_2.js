// build_P5_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter P5 Radioactive materials, P5.2 How can radioactive materials be used safely? (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_P5_2.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'P5', chapterTitle: 'Radioactive materials', code: 'P5.2', title: 'How can radioactive materials be used safely?',
  part: 2, parts: 2, specRange: 'P5.2.1–P5.2.4',
  subtitle: 'Penetration and ionisation, background radiation, hazards, and uses in medicine and industry',
  keywords: ['Ionisation', 'Penetration', 'Background', 'Irradiation', 'Contamination', 'Tracer', 'Radiotherapy', 'Risk'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, plotLine, fnLine, px, py, nuclide, nucleus, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const N = (A, Z, X) => `^^${A}^^~~${Z < 0 ? '−' + (-Z) : Z}~~${X}`;
const ALPHA = C.red, BETA = C.blue, GAMMA = C.green;

// ======================= CALCULATIONS (asserted) =======================
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
// retrieval starter
calc('starter 1200 Bq, T = 4 h, after 12 h', 1200 / 2 ** (12 / 4), 150);
calc('starter Am-241 alpha: A', 237 + 4, 241); calc('starter Am-241 alpha: Z', 93 + 2, 95);
// suggested practical (slides 8–9): background and absorber counts (counts per minute, three 1-minute counts)
const bgCounts = [22, 27, 23];
const BG = calc('background mean (cpm)', mean(bgCounts), 24);
const PR = [
  ['No absorber', [531, 517, 524], 524, 500],
  ['Paper', [512, 528, 520], 520, 496],
  ['Aluminium 5 mm', [190, 181, 187], 186, 162],
  ['Lead 25 mm', [61, 55, 58], 58, 34],
];
PR.forEach(([n, c, m, corr]) => { calc(`practical mean ${n}`, mean(c), m); calc(`practical corrected ${n}`, m - BG, corr); });
calc('practical drop due to beta (paper - Al)', PR[1][3] - PR[2][3], 334);
calc('practical drop due to alpha (none - paper)', PR[0][3] - PR[1][3], 4);
// recap 2
calc('R2 background 120 counts in 5 min', 120 / 5, 24);
calc('R2 corrected 750 - 24', 750 - 24, 726);
calc('R2 2.4 mm Al reading 30 cpm - 24', 30 - 24, 6);
// background pie (slide 11): UK average annual dose shares (HPA/PHE 2010 review, rounded)
const PIE = [
  ['Radon gas (from rocks and soil)', 50, 'C8414C', true],
  ['Medical (X-rays, CT, nuclear medicine)', 15, '2E5BD8', false],
  ['Ground and buildings (gamma)', 13, 'B8730A', true],
  ['Cosmic rays (from space)', 12, '6A4FB3', true],
  ['Food and drink', 9.5, '2E8B57', true],
  ['Other (fallout, nuclear industry, work)', 0.5, '6B7385', false],
];
calc('pie sums to 100 %', PIE.reduce((a, p) => a + p[1], 0), 100);
const natural = calc('natural share %', PIE.filter(p => p[3]).reduce((a, p) => a + p[1], 0), 84.5);
const manMade = calc('man-made share %', PIE.filter(p => !p[3]).reduce((a, p) => a + p[1], 0), 15.5);
calc('natural + man-made', natural + manMade, 100);
const UKDOSE = 2.7; // mSv per year (notes only)
calc('radon dose share of 2.7 mSv', UKDOSE * 0.5, 1.35);
// half-life and hazard (slide 16): same number of nuclei, X: T = 2 d, A0 = 800 Bq; Y: T = 8 d, A0 = 200 Bq
const AX = t => 800 * 0.5 ** (t / 2), AY = t => 200 * 0.5 ** (t / 8);
calc('A0 ratio = T ratio (same N)', 800 / 200, 8 / 2);
const tCross = calc('curves cross at t = 16/3 days', 16 / 3, 16 / 3);
calc('AX(tCross) = AY(tCross)', AX(tCross), AY(tCross), 1e-9);
calc('AX(8 d)', AX(8), 50); calc('AY(8 d)', AY(8), 100); calc('AY(16 d)', AY(16), 50);
calc('AX(4 d)', AX(4), 200);
// recap 4 HT: 5 half-lives
calc('R4 (1/2)^5', 0.5 ** 5, 1 / 32);
calc('R4 waste 120 000 y / 24 000 y', 120000 / 24000, 5);
// tracer (slide 18): Tc-99m T = 6 h
const tcT = 6;
calc('Tc-99m after 24 h fraction', 0.5 ** (24 / tcT), 1 / 16);
calc('Tc-99m after 24 h percent', 100 * 0.5 ** (24 / tcT), 6.25);
calc('Tc-99m after 2 days fraction', 0.5 ** (48 / tcT), 1 / 256);
// recap 5
calc('R5 I-131 8 d after 24 d', 400 / 2 ** (24 / 8), 50);
// full question
calc('FQ corrected 270 - 30', 270 - 30, 240); calc('FQ corrected paper 268 - 30', 268 - 30, 238); calc('FQ corrected Al 32 - 30', 32 - 30, 2);
calc('FQ 1296 / 432 half-lives', 1296 / 432, 3); calc('FQ ratio 2^3', 2 ** 3, 8);
// homework
calc('HW 1218 counts in 2 min', 1218 / 2, 609); calc('HW corrected 609 - 18', 609 - 18, 591);
calc('HW 24 h / 6 h', 24 / 6, 4); calc('HW ratio 2^4', 2 ** 4, 16);

// ======================= extra drawing helpers =======================
function ball(s, cx, cy, r, fill, edge) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: 0.75 } }); }
// sine wave between two points (any direction)
function waveP(s, x1, y1, x2, y2, amp = 0.08, cycles = 4, color = GAMMA, w = 2.25) {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux;
  const n = Math.max(16, Math.round(cycles * 16)); let lx = x1, ly = y1;
  for (let i = 1; i <= n; i++) { const t = i / n, a = amp * Math.sin(2 * Math.PI * cycles * t); const x = x1 + ux * L * t + nx * a, y = y1 + uy * L * t + ny * a; line(s, lx, ly, x, y, color, w); lx = x; ly = y; }
}
const wave = (s, x1, x2, y, amp, cycles, color, w) => waveP(s, x1, y, x2, y, amp, cycles, color, w);
// ion pair: + ion (red) and freed electron (blue)
function ionPair(s, x, y, r = 0.05) {
  ball(s, x, y - r * 1.15, r, 'F2B8BD', C.red); label(s, x - r, y - r * 2.15, 2 * r, '+', { h: 2 * r, size: 10, bold: true, color: C.red });
  ball(s, x, y + r * 1.15, r * 0.7, C.blue, '1F3F9E');
}
// simple person: head + body + legs + arms, cx centre, y top; k scale
function person(s, cx, y, k = 1, col = '8C96A8') {
  const hr = 0.2 * k;
  s.addShape(SH.OVAL, { x: cx - hr, y, w: 2 * hr, h: 2 * hr, fill: { color: 'F2D7C2' }, line: { color: '9A7B66', width: 0.75 } });
  box(s, cx - 0.3 * k, y + 0.44 * k, 0.6 * k, 0.95 * k, col, '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 * k, lw: 0.75 });
  box(s, cx - 0.27 * k, y + 1.4 * k, 0.22 * k, 0.8 * k, '4A5262', '4A5262');
  box(s, cx + 0.05 * k, y + 1.4 * k, 0.22 * k, 0.8 * k, '4A5262', '4A5262');
  box(s, cx - 0.44 * k, y + 0.5 * k, 0.13 * k, 0.75 * k, col, '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 * k, lw: 0.75 });
  box(s, cx + 0.31 * k, y + 0.5 * k, 0.13 * k, 0.75 * k, col, '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 * k, lw: 0.75 });
}
// radiation trefoil warning sign (small)
function trefoil(s, cx, cy, r) {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - r, y: cy - r * 0.95, w: 2 * r, h: 1.8 * r, fill: { color: 'F5C518' }, line: { color: '1A1A1A', width: 1 } });
  label(s, cx - r, cy - r * 0.35, 2 * r, '☢', { h: r * 1.1, size: Math.max(10, r * 30), bold: true, color: '1A1A1A' });
}
function table(s, rows, o) {
  const hd = rows[0].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
  const body = rows.slice(1).map((r, i) => r.map((t, j) => ({ text: String(t), options: { bold: j === 0 || (o.boldCols || []).includes(j), color: (o.colColors && o.colColors[i]) && j === 0 ? o.colColors[i] : C.text, fill: { color: i % 2 ? C.white : C.cardBlue } } })));
  s.addTable([hd, ...body], Object.assign({ fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } }, o.t));
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Using radioactive materials safely',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • suggested practical: identifying radiation with absorbers and a GM tube` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT pill = Higher tier only (P5.1.9 ratio questions in the practice)' },
    { icon: '☢', text: 'Ionisation and penetration • background • hazards • medical and other uses • risk' },
  ],
  notes: 'P5.2 How can radioactive materials be used safely? is Part 2 of 2 in J260 Chapter P5 and the last deck in the chapter. P5.3 (fission and fusion) is in Physics B (J259) only.\nThe cover title is shortened to fit; the full sub-topic title is in the footer.\nSpec wording and numbering in this deck were reconstructed from search extracts because ocr.org.uk could not be fetched: see SPEC_P5_2.md before publishing.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'P5.2.1', text: 'Recall the differences in **penetration** of alpha, beta and gamma, and link them to **ionising power** and **range in air**.' },
  { code: 'P5.2.1', text: 'Use absorbers and a GM tube to **identify** radiation, **correcting** count rates for background (suggested practical).' },
  { code: 'P5.2', text: 'Describe the sources of **background radiation** and read a pie chart of them.' },
  { code: 'P5.2', text: 'Explain how ionising radiation can **damage cells and DNA**.' },
  { code: 'P5.2.3', text: 'Recall the difference between **contamination** and **irradiation**, and compare their hazards.' },
  { code: 'P5.2.2', text: 'Explain why hazards depend on the **type of radiation** and the **half-life**.' },
  { code: 'P5.2.4', text: 'Describe medical uses: **tracers**, **radiotherapy** and **sterilising**; choose a suitable isotope.' },
  { code: 'IaS', text: 'Describe other uses and **safety precautions**; weigh **risk against benefit** and explain **perceived risk**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'No P5.2 statement is believed to be Higher-only (UNVERIFIED). The HT pill appears only on practice questions that use the P5.1.9 net-decline ratio.\nCodes "P5.2" mark content taught within the P5.2 statements (background, cell damage) whose exact J260 code was not confirmed. IaS = Ideas about Science (risk). See SPEC_P5_2.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter P5 Radioactive materials • P5.2 is Part 2 of 2 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['P5.2.1', 'Ionisation, penetration, range; absorbers practical', 'Both tiers', C.blue],
    ['P5.2', 'Background radiation and damage to cells', 'Both tiers', C.blue],
    ['P5.2.3', 'Contamination and irradiation; inside vs outside', 'Both tiers', C.blue],
    ['P5.2.2', 'Hazard depends on radiation type and half-life', 'Both tiers', C.blue],
    ['P5.2.4', 'Medicine: tracers, radiotherapy, sterilising', 'Both tiers', C.blue],
    ['IaS', 'Other uses, safety, risk and benefit', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'P5.2\nUsing materials safely', { h: 0.75, size: 12.5, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: P5.1 emissions and half-life • P1.1 ionising radiation • B1 cells and DNA', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter P5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**P5.1 What is radioactivity?** Nuclei, isotopes, decay equations, half-life.',
      '**P5.2 How can radioactive materials be used safely?** (this deck, the last in P5)',
      'P5.3 (fission and fusion) is in **Physics B J259 only**.',
      'Next chapter: **P6 Matter – models and explanations**.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'All the P5.2 content is for **both tiers**. The **HT** pill marks only practice questions that use the P5.1.9 ratio.',
      'P5.1 slide 25 previewed penetration. Slides 5–6 here **re-teach it in full**.',
      'Foundation homework: Q1–Q4, Q6 and Q7 (15 marks).',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter P5 has two sub-topics in Combined Science: P5.1 and P5.2. P5.3 is separate science (J259) only.\nOCR topic summary (search extract): "In Topic P5.2 learners learn about the penetration properties of ionising radiation" and how radioactive materials are handled safely, including in health settings, and how to interpret risk data.\nDose in sieverts: no J260 statement was found, so it appears only in the speaker notes (slides 11, 12 and 24).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'P5.1.5 • emissions', q: 'What is an **alpha particle** made of? What is a **beta particle**?' },
  { from: 'P5.1.8 • half-life', q: 'Define **half-life**. What is the unit of **activity**?' },
  { from: 'P5.1.8 • half-life', q: 'A source has an activity of **1200 Bq** and a half-life of **4 hours**. What is its activity after **12 hours**?' },
  { from: 'P5.1.7 • nuclear equations', q: `Americium-241 (${N(241, 95, 'Am')}) emits an alpha particle and becomes neptunium (Np). Give the A and Z of the Np nucleus.` },
  { from: 'P5.1 bridge • penetration', q: 'Which emission is stopped by **paper**? Which is stopped by a few mm of **aluminium**?' },
  { from: 'P1.1 • ionising radiation', q: 'What does **ionising** mean? Name **one** ionising part of the EM spectrum.' },
], { subtitle: 'Recall from P5.1 and P1.1 • 6 minutes • no notes', notes: 'ANSWERS\n1. Alpha: 2 protons + 2 neutrons (a helium nucleus). Beta: a high-speed electron emitted from the nucleus.\n2. The time for the number of undecayed nuclei (or the activity) to halve. Activity in becquerels (Bq).\n3. 12 ÷ 4 = 3 half-lives; 1200 → 600 → 300 → 150 Bq.\n4. A = 241 − 4 = 237; Z = 95 − 2 = 93 (²³⁷₉₃Np).\n5. Alpha is stopped by paper; beta by a few mm of aluminium.\n6. Able to remove electrons from atoms, making ions. UV, X-rays or gamma rays.' }), 'Retrieval starter');

// ======================= 5 IONISATION =======================
reg(D.contentSlide({
  title: 'Ionising power of alpha, beta and gamma',
  subtitle: `Specification ${sp('P5.2.1')} • why some emissions ionise much more than others`,
  tag: 'P5.2.1', caption: 'NOT to scale: tracks in air with the ions they make',
  draw: (s, p) => {
    // atom being ionised (inset)
    label(s, 0.7, 1.45, 5.6, 'Ionisation: radiation knocks an electron off an atom', { size: 11, bold: true, color: C.ink, h: 0.26 });
    const ax = 1.55, ay = 2.25;
    s.addShape(SH.OVAL, { x: ax - 0.42, y: ay - 0.42, w: 0.84, h: 0.84, fill: { color: 'E4EBF8' }, line: { color: C.blue, width: 1, dashType: 'dash' } });
    ball(s, ax, ay, 0.08, C.red, '8E2A33');
    [[0.36, 40], [0.36, 200]].forEach(([r, a]) => ball(s, ax + r * Math.cos(a * Math.PI / 180), ay - r * Math.sin(a * Math.PI / 180), 0.06, C.blue, '1F3F9E'));
    arrow(s, 0.65, ay + 0.28, ax - 0.3, ay + 0.05, ALPHA, 2);
    arrow(s, ax + 0.45, ay - 0.15, ax + 1.0, ay - 0.45, C.blue, 1.5); ball(s, ax + 1.07, ay - 0.49, 0.06, C.blue, '1F3F9E');
    label(s, ax + 1.2, ay - 0.62, 1.6, 'electron removed', { size: 10.5, color: C.blue, align: 'left', bold: true });
    label(s, ax + 0.5, ay + 0.1, 2.6, 'atom left as a **positive ion**', { size: 10.5, color: C.red, align: 'left' });
    // tracks
    const y0 = { a: 3.45, b: 4.35, g: 5.25 }, xs = 1.15;
    box(s, 0.65, 3.1, 0.38, 2.45, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    label(s, 0.45, 5.58, 0.8, 'source', { size: 10.5, bold: true });
    // alpha: short, dense
    line(s, xs, y0.a, xs + 1.3, y0.a, ALPHA, 3);
    for (let i = 0; i < 12; i++) ionPair(s, xs + 0.1 + i * 0.105, y0.a - 0.2, 0.035);
    label(s, xs + 1.45, y0.a - 0.3, 3.6, '**α**: many ions per cm, stops after a few cm', { size: 10.5, color: ALPHA, align: 'left', h: 0.5 });
    // beta: longer, sparse
    line(s, xs, y0.b, xs + 4.0, y0.b, BETA, 2);
    for (let i = 0; i < 6; i++) ionPair(s, xs + 0.3 + i * 0.65, y0.b - 0.2, 0.035);
    label(s, xs + 1.6, y0.b + 0.05, 3.8, '**β**: fewer ions per cm, goes further', { size: 10.5, color: BETA, align: 'left' });
    // gamma: very sparse
    wave(s, xs, 6.25, y0.g, 0.06, 10, GAMMA, 1.75);
    ionPair(s, xs + 2.2, y0.g - 0.22, 0.035);
    label(s, xs + 0.1, y0.g + 0.08, 4.9, '**γ**: very few ions, travels a long way', { size: 10.5, color: GAMMA, align: 'left' });
  },
  head: 'Ionising power',
  lines: [
    '**Ionisation**: radiation knocks electrons out of atoms, leaving charged **ions**.',
    '**Alpha** is the **most** strongly ionising: large mass, charge +2 and slow, so it hits many atoms close together.',
    '**Beta** is **moderately** ionising: small mass, charge −1, fast.',
    '**Gamma** is the **least** ionising: no mass and no charge; it rarely interacts.',
    'Each ionisation takes energy. Strong ionisers lose their energy quickly, so they **travel less far**.',
  ],
  worked: { head: 'Link: ionising power ↔ range', q: '',
    steps: [['Alpha', 'many ions per cm → energy used up in a few cm'], ['Beta', 'fewer ions per cm → travels about a metre in air'], ['Gamma', 'very few ions → travels a very long way'], ['Answer', 'the **more** ionising, the **less** penetrating']] },
  qc: 'Explain why an alpha particle travels only a few centimetres in air.',
  notes: 'QUICK CHECK ANSWER: Alpha is very strongly ionising (1); it loses a little energy at each ionisation, so it loses all its energy after a short distance / few cm (1).\nThe numbers of ion pairs drawn are illustrative only. Typical figures: alpha makes tens of thousands of ion pairs per cm of air; beta about a hundred; gamma very few.\nThis re-teaches the P5.1 bridge slide (25) in full.',
}), 'P5.2.1 Ionising power');

// ======================= 6 PENETRATION AND RANGE =======================
reg(D.contentSlide({
  title: 'Penetration and range in air',
  subtitle: `Specification ${sp('P5.2.1')} • what stops alpha, beta and gamma`,
  tag: 'P5.2.1', caption: 'absorbers: paper, about 5 mm aluminium, several cm of lead',
  draw: (s, p) => {
    box(s, 0.7, 1.75, 0.5, 2.6, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    label(s, 0.55, 4.38, 0.8, 'source', { size: 10.5, bold: true });
    const ya = 2.1, yb = 3.05, yg = 4.0, xp = 2.3, xa = 3.45, xl = 4.6, lw = 0.55;
    box(s, xp, 1.6, 0.06, 2.75, 'FFFDF5', '9C8F6A', { lw: 0.75 });
    box(s, xa, 1.6, 0.2, 2.75, 'C9CED8', '7C8598', { lw: 0.75 });
    box(s, xl, 1.6, lw, 2.75, '5A6275', '3B4252', { lw: 0.75 });
    label(s, xp - 0.5, 1.33, 1.06, 'paper', { size: 10.5, bold: true });
    label(s, xa - 0.5, 1.33, 1.2, 'aluminium', { size: 10.5, bold: true });
    label(s, xl - 0.3, 1.33, 1.15, 'lead', { size: 10.5, bold: true });
    // alpha stops at front face of paper
    arrow(s, 1.25, ya, xp - 0.01, ya, ALPHA, 3); label(s, 1.3, ya - 0.33, 0.6, 'α', { size: 14, bold: true, color: ALPHA, align: 'left' });
    // beta passes through paper, stops inside aluminium
    line(s, 1.25, yb, xa + 0.08, yb, BETA, 3); ball(s, xa + 0.08, yb, 0.05, BETA);
    label(s, 1.3, yb - 0.33, 0.6, 'β', { size: 14, bold: true, color: BETA, align: 'left' });
    // gamma passes paper and Al, reduced by lead
    wave(s, 1.25, xl, yg, 0.08, 9, GAMMA, 2.5);
    wave(s, xl + lw, 6.1, yg, 0.035, 3, GAMMA, 1.0); arrow(s, 6.05, yg, 6.3, yg, GAMMA, 1);
    label(s, 1.3, yg - 0.4, 0.6, 'γ', { size: 14, bold: true, color: GAMMA, align: 'left' });
    label(s, xl + lw + 0.02, yg + 0.1, 1.15, 'reduced', { size: 10.5, bold: true, color: GAMMA });
    table(s, [['', 'Stopped by', 'Range in air', 'Ionising'],
      ['alpha α', 'paper / skin', 'a few cm', 'strongly'],
      ['beta β', 'few mm aluminium', 'about 1 m', 'moderately'],
      ['gamma γ', 'reduced by thick lead or concrete', 'very far', 'weakly']],
    { colColors: [ALPHA, BETA, GAMMA], t: { x: 0.7, y: 4.72, w: 5.6, colW: [0.9, 2.3, 1.2, 1.2], rowH: 0.27 } });
  },
  head: 'Penetration',
  lines: [
    '**Alpha**: stopped by a sheet of **paper**, the outer layer of **skin**, or a few cm of **air**.',
    '**Beta**: passes through paper; stopped by **a few mm of aluminium**. Range in air about a metre.',
    '**Gamma**: passes through paper and aluminium. **Thick lead** or **concrete** reduces it a lot, but never stops all of it.',
    'Penetration is the **reverse** of ionising power: alpha is least penetrating, gamma most.',
  ],
  worked: { head: 'Worked example: be careful with range', q: 'A GM tube is 30 cm from a source. Putting paper in the way makes no difference. Does the source emit alpha?',
    steps: [['Range', 'alpha only travels a few cm in air'], ['So', 'alpha would not reach a tube 30 cm away anyway'], ['Fix', 'repeat with the tube about 2 cm from the source'], ['Answer', 'you **cannot tell** yet: the test is not valid at 30 cm']], size: 10.5 },
  workedH: 2.3,
  qc: 'Which emission(s) could pass through a 3 mm sheet of aluminium? Which is the most penetrating?',
  notes: 'QUICK CHECK ANSWER: Only gamma passes through 3 mm of aluminium (beta is stopped by a few mm). Gamma is the most penetrating.\nRanges are typical values: alpha about 3–7 cm in air; beta tens of cm to a few m depending on energy (about 1 m is the usual GCSE figure); gamma intensity falls with distance but it is not stopped by air.\nAbsorbers drawn correctly: alpha ends at the paper face, beta passes paper and ends inside the aluminium, gamma passes both and leaves the lead weaker.',
}), 'P5.2.1 Penetration and range');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('P5.2.1')} • ionising power and penetration`, [
  { q: 'Put **alpha**, **beta** and **gamma** in order of ionising power, starting with the most ionising.', marks: 1, ms: 'alpha, beta, gamma (1).' },
  { q: 'What is meant by **ionisation**?', marks: 2, ms: 'Electrons are removed from (or added to) atoms (1); forming charged particles / ions (1).' },
  { q: 'Explain why **alpha** radiation is the least penetrating, even though it is the most ionising.', marks: 2, ms: 'It causes many ionisations per cm / interacts strongly with atoms (1); so it loses its energy quickly and is stopped after a short distance / by paper (1).' },
  { q: 'Name a material that would stop **beta** but **not gamma**. Give its approximate thickness.', marks: 2, ms: 'Aluminium (1); a few mm, e.g. 3–5 mm (1). Accept other metals of similar thickness.' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 SUGGESTED PRACTICAL: METHOD =======================
reg(D.contentSlide({
  title: 'Suggested practical: identifying radiation',
  subtitle: `Specification ${sp('P5.2.1')} • teacher demonstration with absorbers and a GM tube`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'source, absorber and GM tube fixed in a line; counter records counts',
  draw: (s, p) => {
    // bench
    box(s, 0.65, 4.3, 5.7, 0.12, 'C99A5B', '8A6A3A');
    // source holder
    box(s, 1.0, 3.2, 0.1, 1.1, '8C96A8', '6B7385'); box(s, 0.7, 4.18, 0.7, 0.12, '5A6275', '4A5262');
    box(s, 1.1, 3.25, 0.35, 0.3, '4A5262', '2E3442'); label(s, 0.55, 2.85, 1.3, 'sealed source', { size: 10.5, bold: true });
    // absorber in holder
    box(s, 2.45, 3.05, 0.12, 0.7, 'C9CED8', '7C8598'); box(s, 2.38, 3.75, 0.26, 0.55, '8C96A8', '6B7385');
    label(s, 1.9, 2.75, 1.25, 'absorber', { size: 10.5, bold: true });
    // GM tube
    box(s, 3.55, 3.2, 1.25, 0.4, 'D5DCEB', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 });
    box(s, 3.5, 3.24, 0.08, 0.32, 'F5A742', 'B8730A');
    box(s, 4.1, 3.6, 0.1, 0.7, '8C96A8', '6B7385');
    label(s, 3.3, 2.85, 1.8, 'GM tube (thin window)', { size: 10.5, bold: true });
    // cable and counter
    line(s, 4.8, 3.4, 5.25, 3.4, C.ink, 1.5); line(s, 5.25, 3.4, 5.25, 2.6, C.ink, 1.5);
    box(s, 4.9, 1.75, 1.35, 0.85, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    box(s, 5.0, 1.88, 1.15, 0.38, 'C8F0C8', '2E8B57');
    label(s, 5.0, 1.88, 1.15, '0524', { h: 0.38, size: 16, bold: true, color: '1A4A1A' });
    label(s, 4.9, 2.3, 1.35, 'counter', { size: 10.5, bold: true, color: C.white, h: 0.26 });
    // distance arrow
    arrow(s, 1.45, 4.62, 3.5, 4.62, C.grey, 1.25, { tail: true }); label(s, 1.45, 4.68, 2.05, 'fixed distance, ≈ 2 cm', { size: 10.5, color: C.grey });
    // tongs and lead box
    box(s, 0.75, 5.05, 1.0, 0.65, '5A6275', '3B4252', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 }); label(s, 0.75, 5.05, 1.0, 'lead-lined box', { h: 0.65, size: 10, bold: true, color: C.white });
    line(s, 2.0, 5.55, 3.35, 5.2, '4A5262', 2.5); line(s, 2.0, 5.6, 3.35, 5.4, '4A5262', 2.5);
    label(s, 3.4, 5.15, 2.9, 'long tongs: never touch the source', { size: 10.5, bold: true, color: C.ink, align: 'left', h: 0.4 });
  },
  head: 'Method (teacher demonstration)',
  lines: [
    'With **no source** in the room, count for 5 minutes. Divide to get the **background count rate** (counts per minute).',
    'Fix the source and GM tube about **2 cm apart** (closer than the range of alpha). Count for 1 minute, three times.',
    'Repeat with **paper**, then **5 mm aluminium**, then **25 mm lead** between them.',
    'Find the **mean** count rate for each, then **subtract background** to get the **corrected count rate**.',
    'A big drop with paper → **alpha**. A big drop with aluminium → **beta**. Counts still left after aluminium → **gamma**.',
  ],
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'type of absorber'], ['Dependent', 'count rate (counts per minute)'], ['Control', 'same source, same distance, same counting time'], ['Safety', 'teacher only; tongs; source pointed away; short time; back in lead box']], size: 10.5 },
  workedH: 2.3,
  qc: 'Why must the GM tube be placed only about 2 cm from the source? Why is the background count measured first?',
  notes: 'QUICK CHECK ANSWER: Alpha only travels a few cm in air; if the tube is further away, alpha would never reach it, so the paper test would be meaningless (1). Background radiation is always present; it adds to every reading, so it must be subtracted to find the count rate from the source alone (1).\nThis is a teacher demonstration: under UK school rules (CLEAPSS L93), students under 16 should not handle sealed sources; they may observe. No PAG is named for P5.2 (UNVERIFIED): it is used here as a suggested practical. Equipment: sealed sources (e.g. Am-241, Sr-90, Co-60 or a mixed unknown), GM tube and counter (or ratemeter), absorber set, holders, tongs, lead-lined storage box, metre rule.',
}), 'Suggested practical: absorbers method');

// ======================= 9 SUGGESTED PRACTICAL: RESULTS =======================
const GB = { x: 1.5, y: 1.6, w: 4.75, h: 3.45, xmin: 0, xmax: 4, ymin: 0, ymax: 500, xstep: 4, ystep: 100, minor: 2, ylabel: 'corrected count rate / counts per min', fmt: v => '', yfmt: v => String(Math.round(v)) };
{
  const s = D.contentHeader('Suggested practical: results and conclusion', `Specification ${sp('P5.2.1')} • an unknown source tested with three absorbers`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'corrected count rates drawn to scale');
  axes(s, GB);
  const cols = ['8C96A8', 'E9DCC2', 'C9CED8', '5A6275'];
  PR.forEach(([n, c, m, corr], i) => {
    const xc = i + 0.5, bw = 0.6;
    box(s, px(GB, xc - bw / 2), py(GB, corr), px(GB, xc + bw / 2) - px(GB, xc - bw / 2), py(GB, 0) - py(GB, corr), cols[i], '3B4252', { lw: 0.75 });
    label(s, px(GB, xc) - 0.4, py(GB, corr) - 0.25, 0.8, String(corr), { size: 10.5, bold: true });
    label(s, px(GB, xc) - 0.6, py(GB, 0) + 0.06, 1.2, ['none', 'paper', '5 mm Al', '25 mm lead'][i], { size: 10.5, bold: true, h: 0.24 });
  });
  label(s, GB.x, py(GB, 0) + 0.32, GB.w, 'absorber', { size: 10.5, bold: true });
  // annotations
  label(s, px(GB, 1.75), py(GB, 470), 2.6, 'no real drop → **no alpha**', { size: 10.5, color: ALPHA, align: 'left' });
  label(s, px(GB, 2.05), py(GB, 330), 2.4, 'big drop → **beta**', { size: 10.5, color: BETA, align: 'left' });
  label(s, px(GB, 2.85) - 0.2, py(GB, 230), 1.6, 'left after Al → **gamma**', { size: 10.5, color: GAMMA, align: 'left', h: 0.42, valign: 'top' });
  const hd = ['Absorber', 'Count 1', 'Count 2', 'Count 3', 'Mean', 'Corrected'];
  const rows = [['Background', ...bgCounts, BG, '—'], ...PR.map(([n, c, m, corr]) => [n, ...c, m, corr])];
  table(s, [hd, ...rows], { boldCols: [5], t: { x: 6.8, y: 1.3, w: 6.08, colW: [1.58, 0.85, 0.85, 0.85, 0.85, 1.1], rowH: 0.27, fontSize: 10.5 } });
  D.card(s, 6.8, 3.12, 6.08, 1.5, 'Conclusion', [
    'Corrected count rate = mean − background (24 counts/min).',
    'Paper: 500 → 496, within random variation, so **no alpha**. Aluminium: 496 → 162, so **beta** is present.',
    '162 counts/min pass the aluminium, so **gamma** is present. Lead reduces it to 34 counts/min.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.72, 6.08, 1.53, 'Sources of error and improvements', '', [
    ['Random decay', 'counts vary → repeat and take a mean; count for longer'],
    ['Background varies', 'measure it before and after'],
    ['Answer', 'keep distance and counting time the same for every reading']], { size: 10.5 });
  D.quickCheck(s, 'The count rate with paper is 4 counts/min lower than with no absorber. Why is this not evidence of alpha?');
  D.notes(s, `QUICK CHECK ANSWER: Radioactive decay is random, so repeated counts vary by more than this (the three no-absorber counts range from 517 to 531) (1). A drop of 4 is within that variation, so it is not significant (1).\nAll means and corrected values are checked in node: background mean ${BG}; corrected 500, 496, 162, 34 counts/min. Beta contribution ≈ 496 − 162 = 334 counts/min.\nNote: the aluminium also absorbs a very little gamma; this is ignored at GCSE.`);
  reg(s, 'Suggested practical: results');
}

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('P5.2.1')} • the absorber practical and correcting for background`, [
  { q: 'With no source present a GM tube records **120 counts in 5 minutes**. Calculate the background count rate in counts per minute.', marks: 1, ms: '120 ÷ 5 = 24 counts/min (1).' },
  { q: 'With a source present the count rate is **750 counts/min**. Use your answer to calculate the corrected count rate.', marks: 1, ms: '750 − 24 = 726 counts/min (1). ECF.' },
  { q: 'With 2.4 mm of aluminium between the source and the tube the count rate is **30 counts/min**. Paper made no difference. What does the source emit? Explain your answer.', marks: 3, ms: 'Corrected count with Al = 30 − 24 = 6 ≈ 0 / about background (1); so beta is present (stopped by Al) (1); no alpha as paper makes no difference, and no gamma as nothing above background passes the Al (1).' },
  { q: 'Give **two** safety precautions the teacher takes in this demonstration.', marks: 2, ms: 'Any two: handle with tongs; keep at arm\'s length / point away from people; return to lead-lined box straight away / minimise time; students stand well back; wash hands (1 each).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 BACKGROUND RADIATION =======================
reg(D.contentSlide({
  title: 'Background radiation',
  subtitle: `Specification ${sp('P5.2.1')} context • the radiation that is around us all the time`,
  tag: 'P5.2', caption: 'pie chart drawn to scale: share of the average UK dose',
  draw: (s, p) => {
    const cx = 2.05, cy = 3.5, r = 1.5;
    let cum = 0;
    PIE.forEach(([name, pc, col]) => {
      const a1 = (270 + cum * 3.6) % 360, a2 = (270 + (cum + pc) * 3.6) % 360;
      s.addShape(SH.PIE, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, angleRange: [a1, a2], fill: { color: col }, line: { color: C.white, width: 1 } });
      cum += pc;
    });
    // percentage labels on the big slices
    let c2 = 0;
    PIE.forEach(([name, pc]) => {
      const mid = (c2 + pc / 2) * 3.6 * Math.PI / 180; c2 += pc;
      if (pc < 5) return;
      const lx = cx + 0.68 * r * Math.sin(mid), ly = cy - 0.68 * r * Math.cos(mid);
      label(s, lx - 0.35, ly - 0.14, 0.7, `${pc}%`, { size: 11, bold: true, color: C.white });
    });
    PIE.forEach(([name, pc, col, nat], i) => {
      const y = 1.75 + i * 0.6;
      box(s, 3.8, y + 0.04, 0.26, 0.26, col, null);
      label(s, 4.15, y - 0.04, 2.25, `**${pc}%** ${name}`, { size: 10.5, align: 'left', valign: 'top', h: 0.5 });
    });
    label(s, 3.8, 5.4, 2.6, `natural ${natural}% • man-made ${manMade}%`, { size: 10.5, bold: true, color: C.ink, align: 'left' });
  },
  head: 'Where background radiation comes from',
  lines: [
    '**Background radiation** is ionising radiation that is always present, from natural and man-made sources.',
    '**Natural**: **radon** gas from rocks and soil (the biggest part), rocks and building materials, **cosmic rays** from space, **food and drink**.',
    '**Man-made**: mainly **medical** X-rays and scans; tiny amounts from fallout and the nuclear industry.',
    'It **varies**: more radon in granite areas (e.g. Cornwall); more cosmic rays at high altitude and when flying.',
    'Always measure it and **subtract** it from count rates.',
  ],
  worked: { head: 'Worked example: reading the pie chart', q: 'What percentage of the average dose is from man-made sources?',
    steps: [['Man-made', 'medical 15% + other 0.5%'], ['Add', '15 + 0.5 = 15.5%'], ['Check', `natural = 100 − 15.5 = ${natural}%`], ['Answer', `about ${manMade}% man-made`]] },
  qc: 'Suggest why an airline pilot receives more background radiation each year than an office worker.',
  notes: `QUICK CHECK ANSWER: At high altitude there is less atmosphere above to absorb cosmic rays, and pilots spend many hours a year there (1–2).\nPie values: UK average from the HPA/PHE 2010 review (HPA-CRCE-026 summary, rounded): radon 50%, medical 15%, gamma from ground and buildings 13%, cosmic 12%, food and drink (internal) 9.5%, other <1% (shown as 0.5% so the chart sums to 100%, checked in node). The later RIFE 2023 summary gives 48% radon, 16% medical, 13% terrestrial gamma, 12% cosmic, 11% intakes. Textbook charts differ slightly.\nDOSE (notes only – no J260 statement found): the UK average is about ${UKDOSE} mSv per year; radon alone is about ${calc('radon mSv', UKDOSE * 0.5, 1.35)} mSv. The sievert (Sv) measures the effect of radiation on the body.`,
}), 'Background radiation');

// ======================= 12 DAMAGE TO CELLS =======================
reg(D.contentSlide({
  title: 'How ionising radiation damages cells',
  subtitle: `Specification ${sp('P5.2.1')} context • ionisation inside the body`,
  tag: 'P5.2', caption: 'radiation ionises atoms in a cell and can break DNA',
  draw: (s, p) => {
    // cell
    s.addShape(SH.OVAL, { x: 0.75, y: 1.75, w: 3.0, h: 2.6, fill: { color: 'FBEFE3' }, line: { color: 'C99A5B', width: 1.5 } });
    s.addShape(SH.OVAL, { x: 1.35, y: 2.3, w: 1.8, h: 1.5, fill: { color: 'EAD7F0' }, line: { color: '8A5BA0', width: 1.25 } });
    label(s, 0.8, 1.45, 1.4, 'cell', { size: 10.5, bold: true, color: '8A6A3A', align: 'left' });
    label(s, 2.9, 3.85, 1.4, 'nucleus', { size: 10.5, bold: true, color: '8A5BA0', align: 'left' });
    // DNA ladder
    const x0 = 1.55, x1 = 2.95, yt = 2.85, yb = 3.25, n = 24;
    let la = [x0, yt], lb = [x0, yb];
    for (let i = 1; i <= n; i++) {
      const x = x0 + (x1 - x0) * i / n, ph = i / n * 2 * Math.PI * 1.5;
      const ya = (yt + yb) / 2 - 0.17 * Math.cos(ph), yb2 = (yt + yb) / 2 + 0.17 * Math.cos(ph);
      if (!(i >= 13 && i <= 14)) { line(s, la[0], la[1], x, ya, '2E5BD8', 2); line(s, lb[0], lb[1], x, yb2, C.red, 2); }
      if (i % 2 === 0 && !(i >= 12 && i <= 15)) line(s, x, ya, x, yb2, '9AA3B5', 0.75);
      la = [x, ya]; lb = [x, yb2];
    }
    // radiation track hitting DNA
    arrow(s, 0.55, 1.6, 2.2, 2.95, ALPHA, 2.5);
    s.addShape(SH.STAR_5_POINT || 'star5', { x: 2.12, y: 2.85, w: 0.3, h: 0.3, fill: { color: 'F5A742' }, line: { color: C.orange, width: 0.75 } });
    label(s, 0.45, 1.25, 0.9, 'radiation', { size: 10.5, bold: true, color: ALPHA });
    label(s, 2.2, 2.3, 1.3, 'DNA broken', { size: 10.5, bold: true, color: C.orange });
    // outcomes
    const outs = [['Repaired', 'cell works normally', C.green], ['Cell dies', 'high doses kill many cells', C.grey], ['Mutation', 'cell may divide out of control → **cancer**', C.red]];
    arrow(s, 3.75, 3.05, 4.05, 3.05, C.ink, 1.5);
    outs.forEach(([h, t, col], i) => {
      const y = 1.75 + i * 0.95;
      box(s, 4.1, y, 2.25, 0.8, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 });
      label(s, 4.18, y + 0.04, 2.1, h, { size: 11, bold: true, color: col, align: 'left', h: 0.26 });
      label(s, 4.18, y + 0.3, 2.1, t, { size: 10.5, align: 'left', valign: 'top', h: 0.46 });
    });
    box(s, 0.75, 4.75, 5.6, 0.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.9, 4.8, 5.3, 'The **bigger the dose** of radiation, the **greater the risk** of harm. Cells that divide quickly (skin, gut, bone marrow, a fetus) are the most easily damaged.', { size: 10.5, align: 'left', valign: 'top', h: 0.75 });
  },
  head: 'Why ionising radiation is dangerous',
  lines: [
    'When radiation passes through the body it **ionises** atoms in cells.',
    'The ions can change molecules and **break DNA**, the genetic code in the nucleus.',
    'The cell may **repair** the damage, **die**, or survive with a **mutation**.',
    'A mutated cell may **divide uncontrollably**: this is **cancer**.',
    'Very large doses kill many cells at once: **radiation burns** and **radiation sickness**.',
  ],
  worked: { head: 'Chain of events', q: '',
    steps: [['Ionisation', 'radiation removes electrons from atoms in a cell'], ['Damage', 'DNA molecules are broken or changed'], ['Mutation', 'faulty DNA is copied when the cell divides'], ['Answer', 'cells can grow out of control → **cancer**']] },
  qc: 'Explain how exposure to ionising radiation can lead to cancer. Use the word "mutation".',
  notes: 'QUICK CHECK ANSWER: Radiation ionises atoms/molecules in cells (1); this damages DNA, causing a mutation (1); the mutated cell can divide uncontrollably, forming a tumour/cancer (1).\nDOSE (notes only, no J260 statement found): the effect of radiation on the body is measured as dose in sieverts (Sv); the risk of cancer increases with dose. Links: B1 (DNA, cell division).',
}), 'Damage to cells');

// ======================= 13 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Background radiation and damage to cells', [
  { q: 'Give **two** natural sources and **one** man-made source of background radiation.', marks: 3, ms: 'Natural: any two of radon gas; rocks/soil/building materials; cosmic rays; food and drink (1 each). Man-made: medical X-rays/scans; nuclear fallout; nuclear power/industry (1).' },
  { q: 'Radon contributes **50%** of the average background dose and medical sources **15%**. How many times larger is the radon contribution?', marks: 1, ms: '50 ÷ 15 = 3.3 times (1). Accept 3 to 3.5.' },
  { q: 'Explain why ionising radiation can kill cells or cause cancer.', marks: 3, ms: 'It ionises atoms/molecules in cells (1); damages DNA (1); cell dies or mutates and divides uncontrollably → cancer (1).' },
  { q: 'Suggest why background radiation is higher in some parts of the UK than others.', marks: 1, ms: 'Different rocks (e.g. granite) release more radon / emit more gamma (1).' },
]);
calc('R3 50/15', sf(50 / 15, 2), 3.3);
reg(R3.s, 'Recap 3');

// ======================= 14 IRRADIATION VS CONTAMINATION =======================
reg(D.contentSlide({
  title: 'Irradiation and contamination',
  subtitle: `Specification ${sp('P5.2.3')} • two different ways radioactive material can harm you`,
  tag: 'P5.2.3', caption: 'left: radiation from outside; right: radioactive atoms on and inside the body',
  draw: (s, p) => {
    line(s, 3.5, 1.5, 3.5, 5.75, C.line, 1.5, { dash: 'dash' });
    label(s, 0.6, 1.45, 2.8, 'IRRADIATION', { size: 13, bold: true, color: C.blue });
    label(s, 3.6, 1.45, 2.8, 'CONTAMINATION', { size: 13, bold: true, color: C.red });
    // irradiation: source on left, person right
    box(s, 0.7, 3.0, 0.5, 0.5, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    label(s, 0.55, 3.55, 0.8, 'source', { size: 10.5, bold: true });
    [2.85, 3.25, 3.65].forEach((y, i) => waveP(s, 1.25, 3.25, 2.05, y, 0.04, 3, GAMMA, 1.5));
    person(s, 2.55, 2.2, 1.0, '9FB2DA');
    label(s, 0.6, 4.65, 2.8, 'Radiation from a source **outside** the body. It stops when you move away or the source is shielded.', { size: 10.5, align: 'left', valign: 'top', h: 0.95 });
    // contamination: person with radioactive atoms on and in
    person(s, 4.95, 2.2, 1.0, 'F2B8BD');
    s.addShape(SH.OVAL, { x: 4.72, y: 2.75, w: 0.22, h: 0.4, fill: { color: 'F7D6D9' }, line: { color: '8E2A33', width: 0.75 } });
    s.addShape(SH.OVAL, { x: 4.96, y: 2.75, w: 0.22, h: 0.4, fill: { color: 'F7D6D9' }, line: { color: '8E2A33', width: 0.75 } });
    [[4.83, 2.88], [5.07, 3.0], [4.85, 3.05], [5.42, 3.5], [4.5, 3.35], [5.15, 2.36]].forEach(([x, y]) => { ball(s, x, y, 0.045, C.red, '8E2A33'); });
    [[5.42, 3.5, 5.85, 3.3], [4.5, 3.35, 4.05, 3.15], [5.15, 2.36, 5.6, 2.1]].forEach(([a, b, c, d]) => arrow(s, a, b, c, d, C.red, 1.25));
    label(s, 5.5, 2.75, 1.0, 'in lungs', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 3.6, 4.65, 2.8, 'Radioactive **atoms** get **on** the skin or **inside** the body. They keep emitting until removed or decayed.', { size: 10.5, align: 'left', valign: 'top', h: 0.95 });
  },
  head: 'Compare the hazards',
  lines: [
    '**Irradiation**: exposure to radiation from a source **outside** the body. The object does **not become radioactive**.',
    '**Contamination**: unwanted radioactive **atoms** on or in an object or person. The person is now carrying a source.',
    'Irradiation **ends** when you move away or shield the source.',
    'Contamination is **harder to escape**: the material goes where you go and may stay inside for a long time, so it is usually the **greater hazard**.',
  ],
  worked: { head: 'Irradiation or contamination?', q: '',
    steps: [['Food treated with gamma rays', '**irradiation** – food is not radioactive'], ['Breathing in radon gas', '**contamination**'], ['Having an X-ray or CT scan', '**irradiation**'], ['Answer', 'tracer injected into a patient → **contamination** (on purpose)']], size: 10.5 },
  qc: 'A worker wears a lead apron and a sealed suit with a breathing mask. Which hazard does each one protect against?',
  notes: 'QUICK CHECK ANSWER: Lead apron: shielding against irradiation (1). Sealed suit and mask: stop radioactive particles getting on the skin or being breathed in, i.e. contamination (1).\nSpec P5.2.3 (UNVERIFIED number): "recall the differences between contamination and irradiation effects and compare the hazards associated with each of these".',
}), 'P5.2.3 Irradiation and contamination');

// ======================= 15 INSIDE VS OUTSIDE =======================
reg(D.contentSlide({
  title: 'Alpha: most dangerous inside, least outside',
  subtitle: `Specification ${sp('P5.2.3')}, ${sp('P5.2.2')} • the hazard depends on where the source is and what it emits`,
  tag: 'P5.2.3', caption: 'body drawn as a block of tissue; arrows show how far each emission gets',
  draw: (s, p) => {
    const tissue = (x, y, w, h) => { box(s, x, y, w, h, 'F7DCCB', 'C99A5B', { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.25 }); box(s, x, y, 0.08, h, 'E8C3A8', null); };
    label(s, 0.65, 1.42, 5.7, 'Source OUTSIDE the body', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    tissue(2.5, 1.75, 3.7, 1.6);
    label(s, 2.45, 3.37, 1.0, 'skin', { size: 10.5, color: '8A6A3A', align: 'left' });
    box(s, 0.7, 2.15, 0.4, 0.8, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    arrow(s, 1.15, 2.0, 2.49, 2.0, ALPHA, 2.5); label(s, 1.2, 1.7, 1.2, 'α stops at skin', { size: 10.5, bold: true, color: ALPHA, align: 'left' });
    line(s, 1.15, 2.55, 2.95, 2.55, BETA, 2.5); ball(s, 2.95, 2.55, 0.045, BETA); label(s, 3.05, 2.42, 2.0, 'β: a few mm in', { size: 10.5, bold: true, color: BETA, align: 'left' });
    waveP(s, 1.15, 3.05, 6.35, 3.05, 0.05, 12, GAMMA, 1.75); label(s, 3.9, 2.73, 2.3, 'γ passes through', { size: 10.5, bold: true, color: GAMMA, align: 'left' });
    label(s, 0.65, 3.62, 5.7, 'Source INSIDE the body (swallowed or breathed in)', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    tissue(0.7, 3.95, 5.5, 1.75);
    const sx = 2.4, sy = 4.8;
    s.addShape(SH.OVAL, { x: sx - 0.45, y: sy - 0.45, w: 0.9, h: 0.9, fill: { color: 'F2A7AE', transparency: 30 }, line: { color: C.red, width: 1, dashType: 'dash' } });
    ball(s, sx, sy, 0.08, '4A5262');
    [0, 60, 120, 180, 240, 300].forEach(a => { const r = a * Math.PI / 180; arrow(s, sx + 0.08 * Math.cos(r), sy + 0.08 * Math.sin(r), sx + 0.36 * Math.cos(r), sy + 0.36 * Math.sin(r), ALPHA, 1.5); });
    label(s, 0.8, 5.28, 2.6, 'α: all its energy into nearby cells', { size: 10.5, bold: true, color: ALPHA, align: 'left' });
    waveP(s, sx + 0.1, sy - 0.05, 6.35, sy - 0.55, 0.05, 10, GAMMA, 1.5);
    label(s, 3.9, 4.75, 2.3, 'γ mostly escapes', { size: 10.5, bold: true, color: GAMMA, align: 'left' });
  },
  head: 'Where is the source?',
  lines: [
    '**Outside** the body: alpha is the **least** dangerous. It is stopped by air or the dead outer layer of skin. **Gamma** and **beta** are more dangerous, as they reach living cells.',
    '**Inside** the body: alpha is the **most** dangerous. All its ionisation happens in a tiny volume of living cells next to it.',
    'Gamma is the **least** dangerous inside: most of it passes out of the body without ionising.',
    'This is why **radon** (an alpha emitter breathed into the lungs) is a serious hazard.',
  ],
  worked: { head: 'Rank the hazard', q: '',
    steps: [['Outside, most to least', 'gamma, beta, alpha'], ['Inside, most to least', 'alpha, beta, gamma'], ['Reason', 'ionising power matters inside; penetration matters outside'], ['Answer', 'alpha sources must **never** be eaten or breathed in']], size: 10.5 },
  qc: 'Explain why a sealed alpha source in a smoke detector is safe, but radon gas in a house is a hazard.',
  notes: 'QUICK CHECK ANSWER: Outside the body alpha is stopped by air/the dead layer of skin (and the detector case), so it cannot reach living cells (1). Radon is breathed in (contamination), so alpha is emitted right next to living lung cells and is very strongly ionising there (1).\nThis slide covers both P5.2.3 (contamination vs irradiation) and P5.2.2 (hazard depends on the radiation emitted).',
}), 'P5.2.3 Inside vs outside the body');

// ======================= 16 HALF-LIFE AND HAZARD =======================
const GH = { x: 1.5, y: 1.55, w: 4.75, h: 3.55, xmin: 0, xmax: 16, ymin: 0, ymax: 800, xstep: 2, ystep: 100, minor: 2, xlabel: 'time / days', ylabel: 'activity / Bq', fmt: v => String(Math.round(v)) };
reg(D.contentSlide({
  title: 'Half-life and hazard',
  subtitle: `Specification ${sp('P5.2.2')} • why hazards differ according to the half-life`,
  tag: 'P5.2.2', caption: 'to scale: two samples with the same number of nuclei',
  draw: (s, p) => {
    axes(s, GH);
    fnLine(s, GH, AX, 0, 16, 64, C.red, 2.5);
    fnLine(s, GH, AY, 0, 16, 64, C.blue, 2.5);
    label(s, px(GH, 1.1), py(GH, 760), 2.6, 'X: half-life 2 days', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, px(GH, 9.5), py(GH, 175), 2.0, 'Y: half-life 8 days', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    line(s, px(GH, tCross), py(GH, AY(tCross)), px(GH, tCross), py(GH, 0), C.grey, 1, { dash: 'dash' });
    label(s, px(GH, tCross) + 0.05, py(GH, 330), 1.8, 'after ≈ 5.3 days Y is more active', { size: 10.5, italic: true, color: C.grey, align: 'left', h: 0.42, valign: 'top' });
  },
  head: 'Short or long half-life?',
  lines: [
    '**Short half-life**: nuclei decay quickly, so the **activity is high**. A big hazard, but only for a **short time**.',
    '**Long half-life**: lower activity, but it stays radioactive for a **long time**. Contamination lasts for years.',
    'Waste with a long half-life must be **stored safely for a very long time**.',
    'The hazard also depends on the **type of radiation** (previous slide) and the **amount** of material.',
  ],
  worked: { head: 'Worked example: use the graph', q: 'Find the activity of each sample after 8 days.',
    steps: [['X', `8 ÷ 2 = 4 half-lives: 800 → 400 → 200 → 100 → **${AX(8)} Bq**`], ['Y', `8 ÷ 8 = 1 half-life: 200 → **${AY(8)} Bq**`], ['Compare', 'X started 4× more active but is now less active'], ['Answer', 'X was the bigger hazard at first; Y is now']], size: 10.5 },
  qc: 'Spent nuclear fuel contains isotopes with half-lives of thousands of years. Why must it be stored safely for so long?',
  notes: `QUICK CHECK ANSWER: Its activity falls only very slowly, so it stays hazardous for thousands of years (it takes many half-lives for the activity to fall to a safe level) (1–2).\nGraph drawn to scale from A = 800 × 0.5^(t/2) and A = 200 × 0.5^(t/8): for the same number of nuclei, activity is inversely proportional to half-life (8/2 = 4×). Curves cross at t = 16/3 ≈ 5.3 days (checked in node).\nGRADE 7–9 note: "same number of nuclei, so a shorter half-life means more decays per second" is the key link.`,
}), 'P5.2.2 Half-life and hazard');

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('P5.2.2')}, ${sp('P5.2.3')} • contamination, irradiation and hazard`, [
  { q: 'Describe the difference between **irradiation** and **contamination**.', marks: 2, ms: 'Irradiation: exposure to radiation from a source outside the object/body (1); contamination: radioactive atoms/material get on or into the object/body (1).' },
  { q: 'Explain why an alpha source is the **most** dangerous type **inside** the body but the **least** dangerous **outside** it.', marks: 3, ms: 'Outside: alpha is stopped by skin/air so does not reach living cells (1); inside: alpha is absorbed by nearby living cells (1); it is the most strongly ionising, so causes most damage (1).' },
  { q: 'Isotope P has a half-life of **10 minutes**; isotope Q has a half-life of **10 years**. Which is a longer-lasting contamination hazard? Explain.', marks: 2, ms: 'Q (1); its activity falls more slowly so it remains radioactive / hazardous for much longer (1).' },
  { q: 'An isotope in nuclear waste has a half-life of **24 000 years**. What fraction of it is left after **120 000 years**?', marks: 1, ht: true, ms: '120 000 ÷ 24 000 = 5 half-lives; (½)⁵ = 1/32 (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 18 MEDICAL TRACERS =======================
reg(D.contentSlide({
  title: 'Exploring internal organs: tracers',
  subtitle: `Specification ${sp('P5.2.4')} • using a gamma emitter to see inside the body`,
  tag: 'P5.2.4', caption: 'a gamma camera detects gamma rays from a tracer that collects in the kidneys',
  draw: (s, p) => {
    // bed and patient
    box(s, 0.7, 4.7, 4.4, 0.18, '8C96A8', '6B7385');
    box(s, 1.0, 4.88, 0.12, 0.7, '8C96A8', '6B7385'); box(s, 4.7, 4.88, 0.12, 0.7, '8C96A8', '6B7385');
    box(s, 1.3, 4.15, 3.5, 0.55, 'F2D7C2', '9A7B66', { shape: SH.ROUNDED_RECTANGLE, r: 0.2 });
    s.addShape(SH.OVAL, { x: 0.75, y: 4.1, w: 0.6, h: 0.6, fill: { color: 'F2D7C2' }, line: { color: '9A7B66', width: 0.75 } });
    // kidneys glowing
    [2.75, 3.25].forEach(x => s.addShape(SH.OVAL, { x: x - 0.17, y: 4.25, w: 0.34, h: 0.28, fill: { color: C.red, transparency: 10 }, line: { color: '8E2A33', width: 0.75 } }));
    label(s, 3.4, 4.43, 1.35, 'kidneys', { size: 10.5, bold: true, color: C.red, align: 'left' });
    // gamma camera above
    box(s, 1.9, 2.35, 2.2, 0.45, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 1.9, 2.35, 2.2, 'gamma camera', { h: 0.45, size: 10.5, bold: true, color: C.white });
    [2.5, 2.75, 3.25, 3.5].forEach((x, i) => waveP(s, x, 4.25, x + (i < 2 ? -0.15 : 0.15) * 0, 2.85, 0.04, 4, GAMMA, 1.5));
    label(s, 0.6, 3.3, 1.9, 'γ rays leave the body', { size: 10.5, bold: true, color: GAMMA, align: 'left' });
    // syringe
    box(s, 4.85, 3.6, 0.8, 0.14, 'E6EBF4', '6B7385'); line(s, 4.85, 3.67, 4.65, 3.95, '6B7385', 1.5);
    label(s, 4.6, 3.25, 1.9, 'tracer injected', { size: 10.5, bold: true, align: 'left' });
    // monitor with image
    line(s, 4.1, 2.55, 4.6, 2.55, C.ink, 1.25); line(s, 4.6, 2.55, 4.6, 2.2, C.ink, 1.25);
    box(s, 4.4, 1.5, 1.85, 1.2, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    box(s, 4.5, 1.6, 1.65, 0.85, '0E1426', null);
    [[4.95, 1.75], [5.45, 1.75]].forEach(([x, y]) => s.addShape(SH.OVAL, { x, y, w: 0.32, h: 0.55, fill: { color: 'F5A742' }, line: { color: 'F5C518', width: 0.75 } }));
    label(s, 4.4, 2.45, 1.85, 'image of the kidneys', { size: 10, color: C.white, h: 0.22 });
  },
  head: 'How a tracer works',
  lines: [
    'A small amount of a radioactive isotope is **injected** or **swallowed**. It collects in the organ being studied.',
    'A **gamma camera** outside the body detects the radiation and makes an image. It shows how well the organ works.',
    '**Gamma**: it passes out of the body to the camera and is **weakly ionising**, so it does little damage.',
    '**Short half-life** (hours): long enough to do the scan, then the activity soon falls. Technetium-99m: half-life 6 hours.',
  ],
  worked: { head: 'Worked example: why a 6-hour half-life?', q: 'What fraction of the Tc-99m is left after 24 hours?',
    steps: [['Half-lives', '24 ÷ 6 = 4'], ['Fraction', '(½)^^4^^ = 1/16'], ['Percent', `${calc('Tc %', 100 / 16, 6.25)}% remains after one day`], ['Answer', 'enough for a scan of a few hours, then very little is left']], size: 10.5 },
  qc: 'Explain why an alpha emitter would be no use as a medical tracer.',
  notes: 'QUICK CHECK ANSWER: Alpha cannot pass out of the body, so the camera would detect nothing (1); and it is very strongly ionising inside the body, so it would damage cells (1).\nP5.2.4 (UNVERIFIED number): "describe the different uses of nuclear radiations for exploration of internal organs, and for control or destruction of unwanted tissue". Tc-99m half-life 6.0 h; it also has a low-energy gamma (140 keV), good for cameras. The tracer is a deliberate contamination; the benefit outweighs the small risk.',
}), 'P5.2.4 Medical tracers');

// ======================= 19 RADIOTHERAPY AND STERILISING =======================
reg(D.contentSlide({
  title: 'Radiotherapy and sterilising',
  subtitle: `Specification ${sp('P5.2.4')} • killing unwanted cells and bacteria with gamma rays`,
  tag: 'P5.2.4', caption: 'top: beams from several directions meet at the tumour; bottom: sealed packs pass a gamma source',
  draw: (s, p) => {
    // radiotherapy
    const cx = 2.4, cy = 2.95;
    s.addShape(SH.OVAL, { x: cx - 1.35, y: cy - 1.05, w: 2.7, h: 2.1, fill: { color: 'F7DCCB' }, line: { color: 'C99A5B', width: 1.25 } });
    [0, 60, 120].forEach(a => {
      const L = 3.2, w = 0.3;
      s.addShape(SH.RECTANGLE, { x: cx - L / 2, y: cy - w / 2, w: L, h: w, rotate: a, fill: { color: GAMMA, transparency: 70 }, line: { type: 'none' } });
      const r = a * Math.PI / 180, hx = cx - (L / 2 + 0.15) * Math.cos(r), hy = cy - (L / 2 + 0.15) * Math.sin(r);
      s.addShape(SH.RECTANGLE, { x: hx - 0.22, y: hy - 0.16, w: 0.44, h: 0.32, rotate: a, fill: { color: '4A5262' }, line: { color: '2E3442', width: 0.75 } });
    });
    s.addShape(SH.OVAL, { x: cx - 0.2, y: cy - 0.17, w: 0.4, h: 0.34, fill: { color: C.red }, line: { color: '8E2A33', width: 1 } });
    label(s, 3.85, 2.2, 2.5, 'tumour gets the dose from **every** beam', { size: 10.5, color: C.red, align: 'left', h: 0.45, valign: 'top' });
    label(s, 3.85, 2.8, 2.5, 'healthy tissue gets only **one** beam', { size: 10.5, color: '8A6A3A', align: 'left', h: 0.45, valign: 'top' });
    label(s, 3.85, 3.4, 2.5, 'gamma source rotates around the patient', { size: 10.5, color: C.ink, align: 'left', h: 0.45, valign: 'top' });
    // sterilising
    line(s, 0.7, 4.55, 6.35, 4.55, C.line, 1, { dash: 'dash' });
    box(s, 0.75, 5.35, 5.5, 0.1, '5A6275', null);
    [1.0, 2.0, 4.0, 5.0].forEach(x => { box(s, x, 4.95, 0.7, 0.4, 'E6EBF4', '6B7385', { lw: 1 }); label(s, x, 4.95, 0.7, 'sealed', { h: 0.4, size: 10, color: C.grey }); });
    arrow(s, 0.8, 5.6, 1.8, 5.6, C.ink, 1.5); label(s, 1.85, 5.48, 1.5, 'conveyor', { size: 10.5, align: 'left', h: 0.24 });
    box(s, 2.9, 4.65, 0.8, 0.35, '4A5262', '2E3442'); label(s, 2.9, 4.65, 0.8, 'Co-60', { h: 0.35, size: 10, bold: true, color: C.white });
    [3.1, 3.3, 3.5].forEach(x => waveP(s, x, 5.0, x, 5.32, 0.03, 2, GAMMA, 1.25));
  },
  head: 'Destroying unwanted tissue and microbes',
  lines: [
    '**Radiotherapy**: high doses of radiation kill **cancer cells**. Beams of **gamma rays** (or X-rays) come from **outside** the body.',
    'The source **rotates** so the tumour is always in the beam; healthy tissue gets a much smaller dose.',
    'Some cancers are treated from **inside**: e.g. iodine-131 collects in the thyroid.',
    '**Sterilising**: gamma rays kill **bacteria** on medical equipment **through sealed packaging**. The equipment does **not** become radioactive (irradiation).',
  ],
  worked: { head: 'Why rotate the source?', q: '',
    steps: [['Beams', 'every beam passes through the tumour'], ['Healthy tissue', 'each part is in only one beam, for a short time'], ['Effect', 'large dose to cancer cells, small dose elsewhere'], ['Answer', 'kills the tumour and reduces damage to healthy cells']], size: 10.5 },
  qc: 'Explain why gamma rays, not beta particles, are used to sterilise syringes in sealed plastic packs.',
  notes: 'QUICK CHECK ANSWER: Gamma is very penetrating, so it passes through the packaging and reaches every part of the equipment (1); beta might be stopped by the packaging/equipment and not reach all the bacteria (1). Packs stay sealed, so the equipment stays sterile.\nCo-60 half-life 5.27 years, gamma emitter (also used for food irradiation). Modern radiotherapy mostly uses X-ray beams from linear accelerators; "gamma or external beams" is the GCSE answer.',
}), 'P5.2.4 Radiotherapy and sterilising');

// ======================= 20 CHOOSING AN ISOTOPE =======================
reg(D.contentSlide({
  title: 'Choosing the right isotope',
  subtitle: `Specification ${sp('P5.2.4')}, ${sp('P5.2.2')} • match the radiation type and the half-life to the job`,
  tag: 'P5.2.4', caption: 'half-lives are real values; choose by type first, then half-life',
  draw: (s, p) => {
    table(s, [['Isotope', 'Emits', 'Half-life', 'Used for'],
      ['technetium-99m', 'γ', '6 hours', 'medical tracer'],
      ['iodine-131', 'β and γ', '8 days', 'treating thyroid cancer'],
      ['cobalt-60', 'γ', '5.3 years', 'radiotherapy, sterilising'],
      ['strontium-90', 'β', '29 years', 'thickness gauge'],
      ['americium-241', 'α', '432 years', 'smoke detector'],
      ['polonium-210', 'α', '138 days', '(very dangerous inside)']],
    { t: { x: 0.7, y: 1.55, w: 5.6, colW: [1.55, 0.85, 1.0, 2.2], rowH: 0.32, fontSize: 10.5 } });
    // decision steps
    const st = [['1  Type', 'Must it get out of the body or through thick material? → γ. Absorbed by thin material? → β. Ionise air nearby? → α.'],
      ['2  Half-life', 'Short (hours) for use inside the body. Long (years) for a device that must work for years.']];
    st.forEach(([h, t], i) => {
      const y = 4.0 + i * 0.85;
      box(s, 0.7, y, 5.6, 0.75, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      label(s, 0.8, y + 0.04, 1.2, h, { size: 11, bold: true, color: C.blue, align: 'left', h: 0.67 });
      label(s, 1.95, y + 0.04, 4.25, t, { size: 10.5, align: 'left', h: 0.67 });
    });
  },
  head: 'Two questions to ask',
  lines: [
    '**Which radiation?** It must reach where it is needed, and do as little harm as possible.',
    '**What half-life?** Long enough to do the job, but no longer than needed, especially inside a person.',
    'Inside the body: avoid **alpha**; use **gamma** for imaging.',
    'In a device: a **long** half-life means the source does not need replacing.',
  ],
  worked: { head: 'Worked example', q: 'A doctor needs a tracer for a lung scan. Choose from the table and explain.',
    steps: [['Type', 'must leave the body → gamma → Tc-99m or Co-60'], ['Half-life', 'Co-60 (5.3 years) would stay active in the body far too long'], ['Hazard', 'Tc-99m: 6 hours, enough for the scan; activity soon falls'], ['Answer', 'technetium-99m']], size: 10.5 },
  qc: 'Use the table. Which isotope is used in a smoke detector? Explain why its type and half-life suit this use.',
  notes: 'QUICK CHECK ANSWER: Americium-241 (1). Alpha: strongly ionises the air inside the detector, but cannot get out of the case / is stopped by a few cm of air (1). Half-life 432 years: the activity stays almost constant over the life of the detector, so it does not need replacing (1).\nHalf-life values: Tc-99m 6.0 h; I-131 8.0 d; Co-60 5.27 y; Sr-90 28.8 y; Am-241 432 y; Po-210 138 d.',
}), 'Choosing an isotope');

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('P5.2.4')} • medical uses and choosing isotopes`, [
  { q: 'Give **two** reasons why a gamma emitter is used as a medical tracer.', marks: 2, ms: 'Gamma passes out of the body / can be detected outside (1); weakly ionising so less damage to cells (1).' },
  { q: 'Explain why a tracer should have a half-life of a few hours, not a few seconds or many years.', marks: 2, ms: 'Seconds: activity would fall too low before the scan is finished / before it reaches the organ (1); years: the patient would stay radioactive / receive a dose for a long time (1).' },
  { q: 'Iodine-131 has a half-life of **8 days**. A thyroid treatment uses a sample with activity **400 MBq**. Calculate its activity after **24 days**.', marks: 2, ms: '24 ÷ 8 = 3 half-lives (1); 400 → 200 → 100 → 50 MBq (1).' },
  { q: 'Medical equipment is sterilised with gamma rays. Explain why the equipment is safe to use afterwards.', marks: 2, ms: 'It has been irradiated, not contaminated (1); so it does not become radioactive / emits no radiation (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 22 OTHER USES =======================
reg(D.contentSlide({
  title: 'Other uses: smoke detectors and thickness gauges',
  subtitle: `Specification ${sp('P5.2.4')} context • choosing the radiation for the job`,
  tag: 'Uses', caption: 'left: smoke detector chamber; right: beta thickness gauge with feedback',
  draw: (s, p) => {
    // smoke detector
    label(s, 0.65, 1.42, 2.8, 'Smoke detector (α)', { size: 11.5, bold: true, color: ALPHA, align: 'left' });
    box(s, 0.75, 1.95, 0.12, 1.6, '8C96A8', '4A5262'); box(s, 2.6, 1.95, 0.12, 1.6, '8C96A8', '4A5262');
    box(s, 1.5, 1.8, 0.45, 0.2, '4A5262', '2E3442'); label(s, 1.15, 1.55, 1.2, 'Am-241', { size: 10, bold: true, h: 0.22 });
    [[1.6, 2.6], [1.72, 2.75], [1.85, 2.6]].forEach(([x2, y2]) => arrow(s, 1.72, 2.02, x2, y2, ALPHA, 1.5));
    [[1.15, 2.95], [1.6, 3.15], [2.1, 2.95], [2.3, 3.3], [1.3, 3.35]].forEach(([x, y]) => ionPair(s, x, y, 0.035));
    // circuit around
    line(s, 0.81, 3.55, 0.81, 4.15, C.ink, 1.5); line(s, 2.66, 3.55, 2.66, 4.15, C.ink, 1.5);
    D.comp(s, 'battery', 0.81, 4.15, 1.6, 4.15, { size: 0.8 }); D.comp(s, 'ammeter', 1.6, 4.15, 2.66, 4.15, { size: 0.8 });
    label(s, 0.6, 4.45, 2.4, 'ions carry a current; smoke absorbs α → current falls → **alarm**', { size: 10.5, align: 'left', valign: 'top', h: 0.85 });
    // thickness gauge
    const gx = 3.55;
    label(s, gx, 1.42, 2.9, 'Thickness gauge (β)', { size: 11.5, bold: true, color: BETA, align: 'left' });
    box(s, gx, 2.85, 2.8, 0.08, 'FFFDF5', '9C8F6A', { lw: 0.75 });
    [[gx + 0.35, 2.55], [gx + 0.35, 3.23]].forEach(([x, y]) => s.addShape(SH.OVAL, { x: x - 0.25, y: y - 0.25, w: 0.5, h: 0.5, fill: { color: 'C9CED8' }, line: { color: '6B7385', width: 1 } }));
    label(s, gx - 0.05, 3.5, 0.8, 'rollers', { size: 10.5, bold: true });
    arrow(s, gx + 1.0, 2.75, gx + 1.6, 2.75, C.ink, 1.25); label(s, gx + 1.6, 2.6, 1.0, 'paper', { size: 10.5, align: 'left', h: 0.24 });
    box(s, gx + 1.75, 3.4, 0.5, 0.35, '4A5262', '2E3442'); label(s, gx + 2.3, 3.45, 0.75, 'β source', { size: 10.5, bold: true, align: 'left', h: 0.24 });
    [gx + 1.9, gx + 2.1].forEach(x => arrow(s, x, 3.38, x, 2.25, BETA, 1.5));
    box(s, gx + 1.7, 1.85, 0.6, 0.38, 'D5DCEB', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 }); label(s, gx + 1.7, 1.85, 0.6, 'GM', { h: 0.38, size: 10.5, bold: true });
    box(s, gx + 0.0, 1.8, 1.1, 0.45, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, gx, 1.8, 1.1, 'control', { h: 0.45, size: 10.5, bold: true, color: C.white });
    arrow(s, gx + 1.7, 2.03, gx + 1.12, 2.03, C.ink, 1.25);
    arrow(s, gx + 0.35, 2.25, gx + 0.35, 2.32, C.ink, 1.25);
    label(s, gx - 0.05, 3.85, 2.9, 'count rate rises → paper too thin → rollers move apart', { size: 10.5, align: 'left', valign: 'top', h: 0.6 });
    // food irradiation
    box(s, 0.75, 5.05, 5.6, 0.7, C.white, GAMMA, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.25 });
    label(s, 0.9, 5.08, 5.35, '**Food irradiation (γ)**: gamma kills bacteria so food keeps longer. The food is irradiated, **not** made radioactive.', { size: 10.5, align: 'left', h: 0.64 });
  },
  head: 'Why each radiation is chosen',
  lines: [
    '**Smoke detector**: **alpha** strongly ionises the air, so a current flows. Smoke absorbs the alpha, the current drops and the alarm sounds. Alpha cannot get out of the case.',
    '**Thickness gauge**: **beta** is partly absorbed by paper or thin foil. A thicker sheet absorbs more, so the count rate falls.',
    'Alpha would be stopped by any paper; gamma would pass straight through. Only **beta** changes with small changes in thickness.',
    'Both use sources with **long half-lives**, so the count rate stays steady for years.',
  ],
  worked: { head: 'Worked example', q: 'The count rate at the detector falls. What has happened, and what does the control do?',
    steps: [['Count falls', 'more beta absorbed'], ['So', 'the paper has become too thick'], ['Control', 'moves the rollers closer together'], ['Answer', 'the paper is squeezed thinner until the count rate is back to normal']], size: 10.5 },
  qc: 'A factory makes steel sheets 1 cm thick. Which radiation should its thickness gauge use? Explain why.',
  notes: 'QUICK CHECK ANSWER: Gamma (1): beta would be completely stopped by 1 cm of steel, so the count would not change with thickness; gamma is partly absorbed, so its count rate changes with thickness (1).\nSmoke detector source: Am-241 (alpha, half-life 432 years), sealed inside the detector. These "other uses" are taught as context for choosing isotopes; they are not confirmed as a separate J260 statement (see SPEC_P5_2.md).',
}), 'Other uses');

// ======================= 23 SAFETY PRECAUTIONS =======================
reg(D.contentSlide({
  title: 'Handling radioactive sources safely',
  subtitle: `Specification ${sp('P5.2.3')} context • time, distance, shielding and monitoring`,
  tag: 'Safety', caption: 'left: handling a source; right: a film badge shows the dose a worker has received',
  draw: (s, p) => {
    // bench
    box(s, 0.65, 4.4, 3.5, 0.12, 'C99A5B', '8A6A3A');
    // lead box
    box(s, 0.8, 3.65, 1.0, 0.75, '5A6275', '3B4252', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    label(s, 0.8, 3.65, 1.0, 'lead-lined box', { h: 0.75, size: 10, bold: true, color: C.white });
    // tongs held at arm's length
    person(s, 3.6, 1.75, 1.05, '9FB2DA');
    line(s, 3.1, 3.05, 2.1, 3.25, '4A5262', 2.5); line(s, 3.1, 3.1, 2.1, 3.38, '4A5262', 2.5);
    box(s, 1.95, 3.18, 0.18, 0.18, '4A5262', '2E3442');
    [[1.95, 3.25, 1.2, 2.85], [1.95, 3.3, 1.2, 3.3]].forEach(([a, b, c, d]) => arrow(s, a, b, c, d, C.red, 1.25));
    label(s, 0.6, 2.3, 1.6, 'pointed away from people', { size: 10.5, bold: true, color: C.red, align: 'left', h: 0.45, valign: 'top' });
    label(s, 1.5, 3.5, 1.8, 'long tongs', { size: 10.5, bold: true, align: 'left', h: 0.24 });
    // film badge
    const bx = 4.55, by = 1.75;
    box(s, bx, by, 1.75, 2.4, 'E6EBF4', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    label(s, bx, by + 0.05, 1.75, 'film badge', { size: 10.5, bold: true, h: 0.24 });
    const wins = [['open', 'FFFFFF'], ['Al', 'C9CED8'], ['lead', '5A6275']];
    wins.forEach(([t, col], i) => {
      const y = by + 0.4 + i * 0.6;
      box(s, bx + 0.15, y, 0.6, 0.48, col, '4A5262', { lw: 0.75 });
      label(s, bx + 0.15, y, 0.6, t, { h: 0.48, size: 10, bold: true, color: i === 2 ? C.white : C.ink });
      // film behind: darkening
      box(s, bx + 0.95, y, 0.65, 0.48, ['2B2B2B', '7A7A7A', 'D6D6D6'][i], '4A5262', { lw: 0.5 });
    });
    label(s, bx + 0.9, by + 2.2, 0.8, 'film', { size: 10, italic: true, h: 0.2 });
    label(s, bx - 0.1, by + 2.45, 1.95, 'dark under open and Al, light under lead → **β** and some **γ**', { size: 10.5, align: 'left', valign: 'top', h: 0.85 });
    // TDS strip
    box(s, 0.75, 4.75, 5.6, 0.95, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    [['TIME', 'as short as possible'], ['DISTANCE', 'as far away as possible'], ['SHIELDING', 'lead, concrete, lead apron']].forEach(([h, t], i) => {
      label(s, 0.85 + i * 1.85, 4.82, 1.75, h, { size: 11.5, bold: true, color: C.blue });
      label(s, 0.85 + i * 1.85, 5.12, 1.75, t, { size: 10.5, h: 0.5, valign: 'top' });
    });
  },
  head: 'Precautions and why they work',
  lines: [
    '**Tongs** and **gloves**: keep the source away from your hands and stop contamination of skin.',
    '**Distance**: point the source away; the further away, the less radiation reaches you.',
    '**Time**: take the source out only when needed; a shorter time means a smaller dose.',
    '**Shielding**: store sources in **lead-lined boxes**; hospital staff stand behind lead screens.',
    '**Monitoring**: workers wear a **film badge** (dosimeter) so their dose can be checked.',
  ],
  worked: { head: 'Reading a film badge', q: 'After a month the film is dark under the open window only. Under Al and lead it is not fogged.',
    steps: [['Open only', 'radiation stopped by aluminium'], ['Not γ', 'gamma would also darken under the Al'], ['Not α', 'alpha cannot get through the badge case'], ['Answer', 'the worker was exposed to **beta**']], size: 10.5 },
  qc: 'A student says, "Wearing gloves protects you from gamma rays." Explain why this is wrong, and what gloves do protect against.',
  notes: 'QUICK CHECK ANSWER: Gamma passes through gloves (and the body) almost unaffected, so gloves give no shielding from gamma (1); gloves stop radioactive material getting on the skin, i.e. they protect against contamination (1).\nFilm badge: the windows let you tell which radiation caused the exposure; the darkness shows the dose. Modern badges are often electronic or TLD dosimeters, but the principle is the same.',
}), 'Safety precautions');

// ======================= 24 RISK AND BENEFIT =======================
reg(D.contentSlide({
  title: 'Risk, benefit and perceived risk',
  subtitle: 'Ideas about Science • making decisions about using radioactive materials',
  tag: 'IaS', caption: 'a decision weighs benefits against risks',
  draw: (s, p) => {
    const cx = 3.5, cy = 2.45, L = 2.2, ang = -8 * Math.PI / 180;
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.3, y: cy + 0.05, w: 0.6, h: 0.9, fill: { color: '5A6275' }, line: { color: '3B4252', width: 1 } });
    box(s, cx - 0.9, cy + 0.95, 1.8, 0.12, '5A6275', '3B4252');
    // beam rotated: left end down (benefits heavier)
    s.addShape(SH.RECTANGLE, { x: cx - L, y: cy - 0.05, w: 2 * L, h: 0.1, rotate: -ang * 180 / Math.PI, fill: { color: '4A5262' }, line: { color: '2E3442', width: 0.75 } });
    const ends = [[cx - L * Math.cos(ang), cy - L * Math.sin(ang) * -1], [cx + L * Math.cos(ang), cy + L * Math.sin(ang) * -1]];
    const pans = [['BENEFITS', ['finds and treats disease', 'sterile equipment', 'safer, longer-lasting food'], C.green], ['RISKS', ['small extra chance of cancer', 'contamination if mishandled', 'waste to store'], C.red]];
    ends.forEach(([ex, ey], i) => {
      const [h, items, col] = pans[i];
      line(s, ex, ey, ex - 0.6, ey + 0.55, C.grey, 1); line(s, ex, ey, ex + 0.6, ey + 0.55, C.grey, 1);
      box(s, ex - 1.05, ey + 0.55, 2.1, 1.35, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 });
      label(s, ex - 1.0, ey + 0.58, 2.0, h, { size: 11, bold: true, color: col, h: 0.26 });
      items.forEach((t, j) => label(s, ex - 1.0, ey + 0.86 + j * 0.33, 2.0, t, { size: 10.5, h: 0.3 }));
    });
    table(s, [['Risks feel BIGGER when they are…', 'Risks feel SMALLER when they are…'],
      ['unfamiliar, invisible', 'familiar (e.g. driving)'],
      ['imposed on you', 'chosen by you'],
      ['possibly catastrophic', 'under your control']],
    { t: { x: 0.7, y: 4.55, w: 5.6, colW: [2.8, 2.8], rowH: 0.29, fontSize: 10.5 } });
  },
  head: 'Weighing it up',
  lines: [
    'Every use of radiation has a **risk** (chance of harm × how serious it is) and a **benefit**.',
    'It is used when the **benefit outweighs the risk**, e.g. a scan that finds a cancer early.',
    'Keep doses **as low as reasonably possible**; consider who gets the benefit and who takes the risk.',
    '**Perceived risk** is how big people *think* a risk is. Radiation is often feared more than familiar risks that are actually larger.',
  ],
  worked: { head: 'Worked example: should the patient have the scan?', q: '',
    steps: [['Benefit', 'the scan can show whether the kidney is damaged'], ['Risk', 'a small dose from a short half-life gamma tracer'], ['Reduce risk', 'lowest activity that gives a clear image'], ['Answer', 'yes: the benefit is much greater than the small risk']], size: 10.5 },
  qc: 'Suggest why some people are more worried about living near a nuclear power station than about travelling by car.',
  notes: 'QUICK CHECK ANSWER: Radiation is invisible and unfamiliar; the risk is imposed, not chosen; an accident could be catastrophic. Driving is familiar, voluntary and feels under their control, so its (actually larger) risk is perceived as smaller (2 marks for two reasons).\nIdeas about Science (risk): J260 IaS statements cover identifying risks and benefits, the difference between actual and perceived risk, and decisions based on balancing them (wording UNVERIFIED). DOSE (notes only): a typical Tc-99m scan gives a dose of a few mSv, similar to one or two years of background.',
}), 'IaS Risk and benefit');

// ======================= 25 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Other uses, safety and risk', [
  { q: 'Explain why **beta** radiation is used to monitor the thickness of paper.', marks: 2, ms: 'Beta is partly absorbed by paper (1); so the count rate changes when the thickness changes (alpha would be completely stopped; gamma would pass straight through) (1).' },
  { q: 'Give **three** precautions a hospital technician takes when preparing a radioactive tracer.', marks: 3, ms: 'Any three: tongs/remote handling; gloves; lead shielding/screen/lead-lined syringe; minimise time; maximise distance; wear a film badge/dosimeter (1 each).' },
  { q: 'Explain what is meant by **perceived risk**, and why it may differ from the actual risk.', marks: 2, ms: 'How big people think the risk is (1); may be larger if unfamiliar/invisible/imposed/catastrophic, or smaller if familiar/voluntary (1).' },
  { q: 'Why are smoke detectors allowed in homes even though they contain a radioactive source?', marks: 1, ms: 'Benefit (early warning of fire, saving lives) far outweighs the very small risk (alpha cannot escape the case) (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Ionisation', 'Removing electrons from atoms, making ions.'],
  ['Ionising power', 'How strongly radiation ionises: α > β > γ.'],
  ['Penetration', 'How far radiation gets into materials: γ > β > α.'],
  ['Range in air', 'α a few cm; β about 1 m; γ very far.'],
  ['Absorber', 'Material that stops radiation: paper (α), few mm Al (β), thick lead (reduces γ).'],
  ['Background radiation', 'Radiation always around us, from radon, rocks, cosmic rays, food and medical uses.'],
  ['Corrected count rate', 'Measured count rate minus the background count rate.'],
  ['Irradiation', 'Exposure to radiation from an outside source; the object does not become radioactive.'],
  ['Contamination', 'Unwanted radioactive atoms on or inside an object or person.'],
  ['Mutation', 'A change in DNA; can lead to cells dividing out of control (cancer).'],
  ['Tracer', 'Short half-life gamma emitter put in the body and detected outside.'],
  ['Radiotherapy', 'Using high doses of radiation (e.g. gamma beams) to kill cancer cells.'],
  ['Sterilisation', 'Killing bacteria on equipment or food with gamma rays.'],
  ['Film badge', 'Dosimeter worn by workers to record the radiation they receive.'],
  ['Risk', 'The chance of harm and how serious the harm would be.'],
  ['Perceived risk', 'How big people think a risk is; can differ from the actual risk.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A home smoke detector contains a small sealed source of americium-241, which emits **alpha** radiation and has a half-life of **432 years**.', [
  { l: 'a', q: 'Explain why an **alpha** source is used in the smoke detector.', marks: 2, ms: 'Alpha is strongly ionising (1); so it ionises the air in the detector to make a current / smoke absorbs it, changing the current (1).' },
  { l: 'b', q: 'Explain why the alpha radiation from the detector is **not** a hazard to people in the room.', marks: 2, ms: 'Alpha has a short range in air / is stopped by the case or a few cm of air (1); it cannot penetrate the skin / reach living cells from outside the body (1).' },
  { l: 'c', q: 'A student tests a **different** source. Background = **30 counts/min**. With no absorber: **270**; with paper: **268**; with 3 mm aluminium: **32** counts/min. Calculate the corrected count rate with no absorber and identify the radiation emitted.', marks: 3, ms: '270 − 30 = 240 counts/min (1); paper makes no significant difference → no alpha (1); aluminium reduces it to about background (32 − 30 = 2) → beta only, no gamma (1).', h: 1.45 },
  { l: 'd', q: 'Explain why a half-life of **432 years** is suitable for a smoke detector.', marks: 2, ms: 'Activity stays (almost) constant for the life of the detector (1); so it does not need replacing / the current stays steady (1).', h: 0.95 },
  { l: 'e', q: 'Explain why americium-241 would be **far more** dangerous if it were swallowed.', marks: 2, ms: 'Contamination: the source is inside the body, next to living cells (1); alpha is highly ionising and all of its energy is absorbed by nearby cells, damaging DNA (1).', h: 1.05 },
  { l: 'f', q: 'Calculate the ratio of the activity of the source after **1296 years** to its activity now.', marks: 2, ht: true, ms: '1296 ÷ 432 = 3 half-lives (1); (½)³ → ratio 1 : 8 (1).', h: 0.9 },
], 13, { subtitle: `Specification ${sp('P5.2.1')}–${sp('P5.2.4')} (part f uses P5.1.9) • answer every part • 13 marks`, ht: true }), 'Full question');

// ======================= HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the source that contributes the **largest** share of background radiation in the UK.', marks: 1, ms: 'Radon (gas) (1).' },
  { n: '2', q: 'Describe the difference between **irradiation** and **contamination**.', marks: 2, ms: 'Irradiation: exposed to radiation from an outside source; does not become radioactive (1). Contamination: radioactive atoms/material get on or in the object/person (1).' },
  { n: '3', q: 'Give **two** precautions used when handling radioactive sources in school, and say how each reduces the risk.', marks: 2, ms: 'e.g. tongs – increases distance / prevents contamination of hands (1); store in lead-lined box – shielding (1); minimise time – smaller dose. One mark per precaution with reason.' },
  { n: '4', q: 'A GM tube records **1218 counts in 2 minutes** near a source. The background count rate is **18 counts/min**. Calculate the corrected count rate.', marks: 2, ms: '1218 ÷ 2 = 609 counts/min (1); 609 − 18 = 591 counts/min (1).' },
  { n: '5', q: 'A tracer has a half-life of **6 hours**. Calculate the ratio of its activity after **24 hours** to its starting activity.', marks: 2, ht: true, ms: '24 ÷ 6 = 4 half-lives (1); (½)⁴ → 1 : 16 (1).' },
  { n: '6', q: 'Explain why **gamma** rays are used to sterilise surgical instruments in sealed packs.', marks: 2, ms: 'Gamma is very penetrating – passes through the packaging (1); kills bacteria without making the instruments radioactive / packs stay sealed so remain sterile (1).' },
  { n: '7', q: 'Technetium-99m is a **gamma** emitter with a half-life of **6 hours**. It is injected as a tracer to check how well a patient\'s kidneys work. **Evaluate** the use of technetium-99m for this scan. Include its benefits and its risks.', marks: 6, levels: true, h: 2.3, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Benefit: the scan shows how well the kidneys are working / finds problems early, so treatment can start; avoids surgery.',
    'Gamma passes out of the body, so it can be detected by a gamma camera outside the patient.',
    'Gamma is weakly ionising, so it causes little damage to cells as it passes through.',
    'Half-life of 6 hours is long enough to collect in the kidneys and complete the scan.',
    'Half-life is short, so the activity falls quickly: after 24 hours only 1/16 (about 6%) remains; the patient is not radioactive for long.',
    'Risk: it is contamination (inside the body), so the patient receives a dose; ionising radiation can damage DNA and slightly increase the chance of cancer.',
    'Risk reduced by using the smallest activity that gives a clear image; staff use shielding/tongs/distance and wear film badges.',
    'An alpha or long half-life isotope would be much more dangerous; beta would not escape the body as well.',
    'Judgement: the benefit of diagnosis is much greater than the small risk, so its use is justified.',
  ], {
    l3: 'Explains why the type of radiation AND the half-life make Tc-99m suitable, describes at least one benefit and one risk, AND makes a justified judgement.',
    l2: 'Explains why the type of radiation OR the half-life makes it suitable, AND gives a benefit or a risk.',
    l1: 'Gives simple statements about the radiation type, half-life, a benefit or a risk.',
  });
}
D.homework('Foundation: answer Q1–Q4, Q6 and Q7 (15 marks). Higher: answer all questions.', HW, 17, { ht: true });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5, R6].forEach((r, i) => assert(r.total >= 7 && r.total <= 8, `recap ${i + 1} total ${r.total}`));
assert.strictEqual(HW.filter(q => !q.ht).reduce((a, q) => a + q.marks, 0), 15, 'Foundation homework total');
assert.strictEqual(D.slideNo, 29, 'slide count');
const out = path.join(__dirname, 'OCR21C_P5.2_UsingRadioactiveMaterialsSafely_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); console.log('recap totals: ' + [R1, R2, R3, R4, R5, R6].map(r => r.total).join(', ')); });
