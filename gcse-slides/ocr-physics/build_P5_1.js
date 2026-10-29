// build_P5_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter P5 Radioactive materials, P5.1 What is radioactivity? (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_P5_1.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'P5', chapterTitle: 'Radioactive materials', code: 'P5.1', title: 'What is radioactivity?',
  part: 1, parts: 2, specRange: 'P5.1.1–P5.1.9',
  subtitle: 'The nuclear atom, isotopes, radioactive decay, nuclear equations and half-life',
  keywords: ['Nucleus', 'Isotope', 'Alpha', 'Beta', 'Gamma', 'Neutron', 'Half-life', 'Activity'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, nuclide, nucleus, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
// nuclear notation inside text runs: ^^A^^~~Z~~X
const N = (A, Z, X) => `^^${A}^^~~${Z < 0 ? '−' + (-Z) : Z}~~${X}`;

// ======================= CALCULATIONS (asserted) =======================
// nuclear equations: assert that mass number A and atomic number Z balance
const EQN = [];
function nucEq(label_, lhs, rhs) {
  const sum = (arr, i) => arr.reduce((a, q) => a + q[i], 0);
  calc(`${label_}: A balance`, sum(rhs, 0), sum(lhs, 0));
  calc(`${label_}: Z balance`, sum(rhs, 1), sum(lhs, 1));
  EQN.push(label_);
  return { lhs, rhs };
}
const He = [4, 2, 'He'], e = [0, -1, 'e'], n1 = [1, 0, 'n'], g0 = [0, 0, 'γ'];
const eqAlphaU = nucEq('U-238 alpha', [[238, 92, 'U']], [[234, 90, 'Th'], He]);
const eqBetaC = nucEq('C-14 beta', [[14, 6, 'C']], [[14, 7, 'N'], e]);
const eqBetaCo = nucEq('Co-60 beta', [[60, 27, 'Co']], [[60, 28, 'Ni'], e]);
const eqGamNi = nucEq('Ni-60 gamma', [[60, 28, 'Ni']], [[60, 28, 'Ni'], g0]);
const eqNeuBe = nucEq('Be-13 neutron', [[13, 4, 'Be']], [[12, 4, 'Be'], n1]);
nucEq('Rn-222 alpha (worked)', [[222, 86, 'Rn']], [[218, 84, 'Po'], He]);
nucEq('Ra-226 alpha (QC)', [[226, 88, 'Ra']], [[222, 86, 'Rn'], He]);
nucEq('Sr-90 beta (worked)', [[90, 38, 'Sr']], [[90, 39, 'Y'], e]);
nucEq('I-131 beta (QC)', [[131, 53, 'I']], [[131, 54, 'Xe'], e]);
nucEq('Th-234 beta (slide 13)', [[234, 90, 'Th']], [[234, 91, 'Pa'], e]);
nucEq('R4 Pu-239 alpha', [[239, 94, 'Pu']], [[235, 92, 'U'], He]);
nucEq('R4 K-40 beta', [[40, 19, 'K']], [[40, 20, 'Ca'], e]);
nucEq('R4 He-5 neutron', [[5, 2, 'He']], [[4, 2, 'He'], n1]);
nucEq('FQ Rn-222 alpha', [[222, 86, 'Rn']], [[218, 84, 'Po'], He]);
nucEq('HW Po-210 alpha', [[210, 84, 'Po']], [[206, 82, 'Pb'], He]);
nucEq('HW H-3 beta', [[3, 1, 'H']], [[3, 2, 'He'], e]);
// Z–A chart moves from U-238 (slide 13)
const zaStart = [92, 238];
const zaAlpha = [zaStart[0] - 2, zaStart[1] - 4], zaBeta = [zaStart[0] + 1, zaStart[1]], zaNeu = [zaStart[0], zaStart[1] - 1];
calc('alpha Z-2', zaAlpha[0], 90); calc('alpha A-4', zaAlpha[1], 234); calc('beta Z+1', zaBeta[0], 93); calc('neutron A-1', zaNeu[1], 237);
// sizes
const rAtom = 1e-10, rNuc = 1e-14;
const ratioAN = calc('atom/nucleus = 1e-10/1e-14', rAtom / rNuc, 1e4, 1e-6);
const stadium = calc('stadium 100 m / 1e4 (m)', 100 / ratioAN, 0.01, 1e-12);
const atomDrawR = 1.75; // inches, radius of drawn atom on slide 5
const nucDrawMm = calc('drawn nucleus width mm', 2 * atomDrawR * 25.4 / ratioAN, 2 * 1.75 * 25.4 / 1e4, 1e-12);
assert(nucDrawMm < 0.01);
// particle counts
calc('C-14 neutrons', 14 - 6, 8); calc('U-238 neutrons', 238 - 92, 146); calc('Cl-37 neutrons', 37 - 17, 20);
calc('Fe-56 neutrons (R2)', 56 - 26, 30);
// half-life graph (slide 18): A0 = 800 Bq, T = 3 h
const A0 = 800, Th = 3;
const act = t => A0 * Math.pow(0.5, t / Th);
calc('A(3 h)', act(3), 400, 1e-9); calc('A(6 h)', act(6), 200, 1e-9); calc('A(9 h)', act(9), 100, 1e-9); calc('A(12 h)', act(12), 50, 1e-9);
// dice model (slides 19–20): 120 dice, remove sixes, p = 1/6 per throw
const dice0 = 120, pDecay = 1 / 6;
const diceExp = k => dice0 * Math.pow(1 - pDecay, k);
const diceHL = calc('dice half-life = ln2/ln(6/5) throws', Math.log(2) / Math.log(6 / 5), 3.8017840169239308, 1e-9);
const diceData = [120, 99, 85, 68, 58, 47, 41, 33, 29, 22, 19];
diceData.forEach((v, k) => assert(Math.abs(v - diceExp(k)) <= 3.5, `dice sample ${k} too far from model`));
calc('dice half-life 2 s.f.', sf(diceHL, 2), 3.8, 1e-12);
calc('dice 60 left after ~3.8 throws (model)', diceExp(diceHL), 60, 1e-9);
calc('dice 30 left after ~7.6 throws (model)', diceExp(2 * diceHL), 30, 1e-9);
// half-life calculations (slide 22)
const n22 = calc('12 days / 3 days', 12 / 3, 4);
const a22 = calc('6400 / 2^4', 6400 / 2 ** n22, 400);
const qc22 = calc('QC 2000 Bq after 24 days, T = 8 days', 2000 / 2 ** (24 / 8), 250);
// HT ratio (slide 23)
const n23 = calc('30 min / 6 min', 30 / 6, 5);
const r23 = calc('2^5', 2 ** n23, 32);
calc('decayed fraction 31/32', 1 - 1 / r23, 31 / 32);
calc('QC 2^6', 2 ** 6, 64);
// recaps
calc('R5 600 -> 300 in 40 s (T)', 40, 40); calc('R5 after further 80 s', 300 / 2 ** (80 / 40), 75);
calc('R6 1/2^3', 2 ** 3, 8); calc('R6 8.0e6 / 2^(10/2)', 8.0e6 / 2 ** (10 / 2), 2.5e5, 1e-6);
calc('R6 4800/300 = 16 = 2^4', Math.log2(4800 / 300), 4, 1e-12); calc('R6 T = 20/4', 20 / 4, 5);
// full question
calc('FQ 1600 -> 200 halvings', Math.log2(1600 / 200), 3, 1e-12);
const fqT = calc('FQ T = 11.4/3', 11.4 / 3, 3.8, 1e-12);
const fqN = calc('FQ 19 days / 3.8', 19 / fqT, 5, 1e-12);
calc('FQ ratio 2^5', 2 ** fqN, 32, 1e-9);
// homework
calc('HW 960 Bq, T = 5 min, after 20 min', 960 / 2 ** (20 / 5), 60);
calc('HW decayed after 3 HL', 1 - 1 / 2 ** 3, 7 / 8);
calc('HW decayed:remaining = 7:1', (7 / 8) / (1 / 8), 7, 1e-12);
// starter
calc('starter 1/2 of 1/2 of 1/2', 0.5 ** 3, 0.125);

// ======================= extra drawing helpers =======================
function wave(s, x1, x2, y, amp = 0.09, cycles = 4, color = C.green, w = 2.25) {
  const n = cycles * 16; let lx = x1, ly = y;
  for (let i = 1; i <= n; i++) { const x = x1 + (x2 - x1) * i / n, yy = y - amp * Math.sin(2 * Math.PI * cycles * i / n); line(s, lx, ly, x, yy, color, w); lx = x; ly = yy; }
}
function ball(s, cx, cy, r, fill, edge) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: 0.75 } }); }
// draw a nuclear equation row: items are [A,Z,sym] or strings ('→', '+'); returns end x
function eqRow(s, x, y, items, o = {}) {
  let cx = x; const size = o.size || 26, k = size / 28;
  items.forEach(it => {
    if (typeof it === 'string') { s.addText(it, { x: cx, y: y + 0.02 * k, w: 0.5 * k, h: 0.5 * k, fontFace: 'Calibri', fontSize: size * 0.9, bold: true, color: C.ink, align: 'center', valign: 'middle', margin: 0 }); cx += 0.5 * k; }
    else cx += nuclide(s, cx, y, it[0], it[1] < 0 ? '−' + (-it[1]) : it[1], it[2], { size, color: o.color, aColor: o.aColor || C.blue, zColor: o.zColor || C.red }) + 0.04;
  });
  return cx;
}
function die(s, x, y, sz, v, hi) {
  box(s, x, y, sz, sz, C.white, hi ? C.red : '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.04, lw: hi ? 2 : 1 });
  const P = { 1: [[1, 1]], 2: [[0, 0], [2, 2]], 3: [[0, 0], [1, 1], [2, 2]], 4: [[0, 0], [2, 0], [0, 2], [2, 2]], 5: [[0, 0], [2, 0], [1, 1], [0, 2], [2, 2]], 6: [[0, 0], [0, 1], [0, 2], [2, 0], [2, 1], [2, 2]] }[v];
  const r = sz * 0.085;
  P.forEach(([i, j]) => ball(s, x + sz * (0.25 + 0.25 * i), y + sz * (0.25 + 0.25 * j), r, hi ? C.red : C.ink));
}
// seeded RNG (mulberry32) for the random-decay grid
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

// slide plan constant: the P5.2 bridge slide (asserted at the end)
const BRIDGE = 25;

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'What is radioactivity?',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • suggested practical: modelling random decay with dice` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT pill = Higher tier only (bold in the OCR specification)' },
    { icon: '½', text: 'Atoms and nuclei • isotopes • alpha, beta, gamma and neutron emission • half-life' },
  ],
  notes: 'P5.1 What is radioactivity? is Part 1 of 2 in J260 Chapter P5 (P5.1 and P5.2). P5.3 (energy from radioactive materials: fission and fusion) is in the separate-science Physics B (J259) only.\nSpec wording and numbering in this deck were reconstructed from search extracts and memory because ocr.org.uk could not be fetched: see SPEC_P5_1.md before publishing.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'P5.1.1', text: 'Describe the **nuclear model**: a tiny positive nucleus, containing almost all the mass, surrounded by electrons.' },
  { code: 'P5.1.2', text: 'Recall the typical size of **atoms** (about 1 × 10^^−10^^ m) and compare it with the size of the **nucleus**.' },
  { code: 'P5.1.3', text: 'Recall that nuclei contain **protons and neutrons**, and that **isotopes** have different numbers of neutrons.' },
  { code: 'P5.1.4', text: 'Use **nuclear notation** (mass number and atomic number) to show the differences between isotopes.' },
  { code: 'P5.1.5–P5.1.6', text: 'Recall that unstable nuclei emit **alpha, beta, gamma or neutrons**, and how each changes the nucleus.' },
  { code: 'P5.1.7', text: 'Write **balanced nuclear equations** for alpha, beta, gamma and neutron emission.' },
  { code: 'P5.1.8', text: 'Explain **half-life** and how it relates to the **random** nature of decay; use activity in becquerels.' },
  { code: 'P5.1.9', text: 'Calculate the **net decline**, as a ratio, after a whole number of half-lives.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Objective 8 (P5.1.9) is Higher tier only (bold in the OCR specification). All other objectives are for both tiers.\nNumbering P5.1.1–P5.1.9 is reconstructed (see SPEC_P5_1.md): check against the OCR J260 specification before using codes with students.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter P5 Radioactive materials • P5.1 is Part 1 of 2 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['P5.1.1–P5.1.2', 'The nuclear model of the atom; sizes of atoms and nuclei', 'Both tiers', C.blue],
    ['P5.1.3–P5.1.4', 'Protons, neutrons, isotopes and nuclear notation', 'Both tiers', C.blue],
    ['P5.1.5–P5.1.6', 'Unstable nuclei: alpha, beta, gamma and neutron emission', 'Both tiers', C.blue],
    ['P5.1.7', 'Balanced nuclear equations', 'Both tiers', C.blue],
    ['P5.1.8', 'Random decay, activity (Bq) and half-life', 'Both tiers', C.blue],
    ['P5.1.9', 'Net decline as a ratio after n half-lives', 'Higher only', C.red],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'P5.1\nWhat is radioactivity?', { h: 0.75, size: 12.5, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: P1.1 ionising radiation • C2.1 models of the atom • maths: standard form, ratios', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter P5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**P5.1 What is radioactivity?** (this deck)',
      '**P5.2 How can radioactive materials be used safely?** Penetration, irradiation and contamination, hazards and half-life, uses in medicine.',
      'P5.3 (fission and fusion) is in **Physics B J259 only**, not Combined Science.',
      'No P5.1 equations are on the J260 equation sheet: half-life questions test **halving and ratios**.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Teach every slide to both tiers; the **HT** pill marks Higher-only content (P5.1.9, slides 23–24).',
      `Slide ${BRIDGE} is a **bridge to P5.2**: penetration of alpha, beta and gamma (P5.2.1). It is taught in full and examined in the next deck.`,
      'Foundation homework: Q1–Q4, Q6 and Q7 (15 marks).',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter P5 has two sub-topics in Combined Science: P5.1 and P5.2. P5.3 is separate science (J259) only.\nWhere things go: penetration (P5.2.1), contamination vs irradiation, hazards and half-life, medical uses (tracers, radiotherapy) and any dose work are P5.2. This deck only previews penetration on the bridge slide.\nAssessment: J260 physics content is examined in the physics paper and the combined paper of each tier (check the current OCR assessment overview for paper numbers).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'P1.1 • ionising radiation', q: 'Name the **three** parts of the electromagnetic spectrum that are **ionising**.' },
  { from: 'P1.1 • ionising radiation', q: 'What does **ionising** mean? Why is ionising radiation harmful to living cells?' },
  { from: 'C2.1 • atomic models', q: 'Give the **relative charge** and **relative mass** of a proton, a neutron and an electron.' },
  { from: 'C2.1 • atomic models', q: 'Describe the **plum pudding** model of the atom. Which model replaced it?' },
  { from: 'C2.1 • atoms and elements', q: 'What does the **atomic number** of an element tell you about its atoms?' },
  { from: 'Maths • fractions and standard form', q: 'Write **0.0000000001 m** in standard form. What is **½ of ½ of ½**?' },
], { subtitle: 'Recall from P1.1, C2.1 and maths • 6 minutes • no notes', notes: 'ANSWERS\n1. Ultraviolet (UV), X-rays and gamma rays.\n2. Ionising: able to remove electrons from atoms, making ions. It can damage cells/DNA, causing mutations, cancer or cell death.\n3. Proton +1, mass 1; neutron 0, mass 1; electron −1, mass very small (about 1/1840, accept ≈ 0).\n4. A ball of positive charge with negative electrons dotted through it; replaced by the nuclear (Rutherford) model (then Bohr energy levels).\n5. The number of protons in the nucleus of each atom (= number of electrons in a neutral atom).\n6. 1 × 10⁻¹⁰ m; 1/8 (0.125).' }), 'Retrieval starter');

// ======================= 5 NUCLEAR MODEL + SIZES =======================
reg(D.contentSlide({
  title: 'The nuclear model of the atom',
  subtitle: `Specification ${sp('P5.1.1')}, ${sp('P5.1.2')} • a tiny, dense, positive nucleus surrounded by electrons`,
  tag: 'P5.1.1', caption: 'NOT to scale: the nucleus is drawn enlarged in the inset',
  draw: (s, p) => {
    const cx = 2.5, cy = 3.55, R = atomDrawR;
    s.addShape(SH.OVAL, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, fill: { color: 'E4EBF8' }, line: { color: C.blue, width: 1, dashType: 'dash' } });
    [0.75, 1.35].forEach(r => s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { type: 'none' }, line: { color: '9FB2DA', width: 0.75 } }));
    [[0.75, 30], [0.75, 210], [1.35, 100], [1.35, 230], [1.35, 340], [1.35, 165]].forEach(([r, a]) => {
      const x = cx + r * Math.cos(a * Math.PI / 180), y = cy - r * Math.sin(a * Math.PI / 180);
      ball(s, x, y, 0.09, C.blue, '1F3F9E'); label(s, x - 0.09, y - 0.1, 0.18, '−', { h: 0.18, size: 10, bold: true, color: C.white });
    });
    ball(s, cx, cy, 0.05, C.red);
    // inset zoom
    const ix = 5.35, iy = 2.35, ir = 0.82;
    line(s, cx + 0.05, cy - 0.03, ix - ir * 0.7, iy + ir * 0.7, C.grey, 0.75, { dash: 'dash' });
    s.addShape(SH.OVAL, { x: ix - ir, y: iy - ir, w: 2 * ir, h: 2 * ir, fill: { color: C.white }, line: { color: C.grey, width: 1 } });
    nucleus(s, ix, iy, 6, 6, { d: 0.17 });
    label(s, ix - 1.0, iy + ir + 0.03, 2.0, 'nucleus (zoomed in)', { size: 10.5, bold: true, color: C.red });
    label(s, ix - 1.0, iy + ir + 0.28, 2.0, 'radius ≈ 1 × 10^^−14^^ m', { size: 10.5, bold: true, color: C.red });
    // atom size arrow
    arrow(s, cx - R, cy + R + 0.2, cx + R, cy + R + 0.2, C.blue, 1.5, { tail: true });
    label(s, cx - R, cy + R + 0.25, 2 * R, 'atom: radius ≈ 1 × 10^^−10^^ m', { size: 10.5, bold: true, color: C.blue });
    label(s, 4.45, 3.95, 1.9, 'electrons (−) at different distances from the nucleus', { h: 0.62, size: 10.5, bold: true, color: C.blue, align: 'left', valign: 'top' });
    line(s, 4.45, 4.05, cx + 1.35 * Math.cos(-20 * Math.PI / 180) + 0.1, cy + 0.45, C.grey, 0.75);
    label(s, 4.45, 4.75, 1.9, 'mostly empty space', { size: 10.5, italic: true, color: C.grey, align: 'left' });
  },
  head: 'What the nuclear model says',
  lines: [
    'A tiny, **positively charged nucleus** at the centre contains **almost all the mass** of the atom.',
    '**Negatively charged electrons** are arranged at different distances from the nucleus. Most of the atom is **empty space**.',
    'The nucleus radius is about 1 × 10^^−14^^ m: roughly **10 000 times smaller** than the atom.',
    'Atoms and small molecules are about 1 × 10^^−10^^ m across (order of magnitude).',
    'A neutral atom has equal numbers of protons (+) and electrons (−).',
  ],
  worked: { head: 'Worked example: comparing sizes', q: 'How many times larger is the radius of an atom than the radius of its nucleus?',
    steps: [['Atom', 'radius ≈ 1 × 10^^−10^^ m'], ['Nucleus', 'radius ≈ 1 × 10^^−14^^ m'], ['Divide', '1 × 10^^−10^^ ÷ 1 × 10^^−14^^ = 10^^4^^'], ['Answer', `about ${ratioAN.toLocaleString('en-GB').replace(',', ' ')} times larger`]] },
  qc: 'An atom is enlarged to the size of a football stadium 100 m across. How wide would its nucleus be?',
  notes: `QUICK CHECK ANSWER: 100 m ÷ 10 000 = ${stadium} m = 1 cm (about the size of a marble).\nIf the drawn atom (radius ${atomDrawR} in) were to scale, its nucleus would be only ${nucDrawMm.toFixed(4)} mm across – which is why the nucleus is shown in a zoomed inset.\nP5.1.2 (size of atoms and small molecules) – wording medium confidence; the nucleus size is given here for comparison.`,
}), 'P5.1.1–2 The nuclear model');

// ======================= 6 EVIDENCE: ALPHA SCATTERING =======================
reg(D.contentSlide({
  title: 'Evidence for the nucleus: alpha scattering',
  subtitle: `Specification ${sp('P5.1.1')} • builds on C2.1 • why the plum pudding model was replaced`,
  tag: 'P5.1.1', caption: 'paths of alpha particles past gold nuclei in a very thin foil',
  draw: (s, p) => {
    const nuc = [[3.9, 2.25], [3.9, 3.45], [3.9, 4.65]];
    // foil band
    box(s, 3.55, 1.6, 0.7, 4.0, 'FBF1D2', 'E1C76A', { lw: 0.75 });
    label(s, 3.3, 1.38, 1.2, 'gold foil', { size: 10.5, bold: true, color: C.orange, h: 0.22 });
    const A = (pts, col = C.red) => { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, 1.75, { head: i === pts.length - 2 }); };
    // straight-through paths
    [1.85, 2.85, 4.05, 5.5].forEach(y => A([[0.75, y], [6.3, y]]));
    // small deflection (passes 0.3 in above a nucleus, pushed upwards)
    A([[0.75, 3.15], [3.5, 3.15], [3.9, 3.05], [6.3, 2.45]]);
    // large deflection
    A([[0.75, 4.47], [3.62, 4.47], [3.9, 4.25], [5.6, 3.3]]);
    // bounced back (nearly head-on)
    A([[0.75, 4.6], [3.72, 4.6]]); A([[3.72, 4.6], [3.72, 4.6], [0.75, 4.82]], '8E2A33');
    nuc.forEach(([x, y]) => { ball(s, x, y, 0.1, C.orange, '8A5A08'); label(s, x - 0.1, y - 0.11, 0.2, '+', { h: 0.2, size: 10, bold: true, color: C.white }); });
    label(s, 0.7, 1.45, 2.4, 'beam of alpha particles (+) →', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 4.4, 5.12, 1.9, 'most go straight through', { size: 10.5, bold: true, color: C.ink, align: 'left' });
    label(s, 0.7, 4.93, 2.6, 'a very few bounce back', { size: 10.5, bold: true, color: '8E2A33', align: 'left' });
    label(s, 4.6, 2.05, 1.8, 'some are deflected', { size: 10.5, bold: true, color: C.ink, align: 'left' });
  },
  head: 'From observations to the nuclear model',
  lines: [
    '**Plum pudding model** (C2.1): a ball of positive charge with electrons spread through it.',
    'Positive alpha particles were fired at very thin **gold foil** (Geiger and Marsden, explained by Rutherford).',
    'The results could not be explained by the plum pudding model, so a **new model** was needed: the nuclear model.',
    'New evidence → the model changes. This is how scientific models develop.',
  ],
  worked: { head: 'Observation → conclusion', q: '',
    steps: [['Most pass straight through', 'most of the atom is **empty space**'], ['Some are deflected', 'the positive charge is **concentrated** in one small place'], ['A very few bounce back', 'the nucleus is **tiny, dense and positive**'], ['Answer', 'almost all the mass and all the positive charge are in the nucleus']], size: 10.5 },
  workedH: 2.35,
  qc: 'Why were alpha particles that passed close to a gold nucleus pushed away from it?',
  notes: 'QUICK CHECK ANSWER: Both the alpha particle and the nucleus are positively charged, so they repel.\nSpec note: the history of atomic models is taught in C2.1; P5.1.1 asks students to describe the nuclear model, so this slide gives the evidence as context. (Medium confidence that alpha scattering is examined in J260 physics: see SPEC_P5_1.md.)',
}), 'P5.1.1 Alpha scattering evidence');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('P5.1.1')}–${sp('P5.1.2')} • the nuclear model and the size of atoms`, [
  { q: 'Describe the **nuclear model** of the atom. Include where the mass and the charges are found.', marks: 3, ms: 'Small/tiny nucleus at the centre (1); nucleus is positive / contains (almost) all the mass (1); negative electrons outside the nucleus / at different distances; mostly empty space (1).' },
  { q: 'Which of these is the typical radius of an atom?     1 × 10^^−4^^ m     1 × 10^^−10^^ m     1 × 10^^−14^^ m     1 × 10^^−20^^ m', marks: 1, ms: '1 × 10⁻¹⁰ m (1).' },
  { q: 'In the alpha scattering experiment most alpha particles passed straight through the gold foil, but a very few bounced back. Explain what each observation shows about atoms.', marks: 3, ms: 'Most pass straight through → atom is mostly empty space (1); a few bounce back → nucleus is (very) small and contains most of the mass/is dense (1); and is positively charged, repelling the positive alpha particles (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 PROTONS, NEUTRONS, ISOTOPES =======================
reg(D.contentSlide({
  title: 'Protons, neutrons and isotopes',
  subtitle: `Specification ${sp('P5.1.3')} • what nuclei are made of, and why atoms of one element can differ in mass`,
  tag: 'P5.1.3', caption: 'carbon-12 and carbon-14: same protons, different neutrons',
  draw: (s, p) => {
    const hd = ['Particle', 'Where', 'Relative charge', 'Relative mass'].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
    const rows = [hd,
      ['proton', 'nucleus', '+1', '1'], ['neutron', 'nucleus', '0', '1'], ['electron', 'outside nucleus', '−1', 'very small (≈ 1/1840)']]
      .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, color: j === 0 ? [C.red, '5A6275', C.blue][i - 1] : C.text, fill: { color: i % 2 ? C.white : C.cardBlue } } })));
    s.addTable(rows, { x: 0.7, y: 1.5, w: 5.6, colW: [1.1, 1.35, 1.35, 1.8], rowH: 0.32, fontFace: 'Calibri', fontSize: 11, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    nucleus(s, 1.95, 4.05, 6, 6, { d: 0.22 });
    nucleus(s, 4.75, 4.05, 6, 8, { d: 0.22 });
    label(s, 0.95, 4.95, 2.0, 'carbon-12', { size: 12, bold: true });
    label(s, 0.95, 5.2, 2.0, '6 protons, 6 neutrons', { size: 10.5 });
    label(s, 3.75, 4.95, 2.0, 'carbon-14', { size: 12, bold: true });
    label(s, 3.75, 5.2, 2.0, '6 protons, 8 neutrons', { size: 10.5 });
    ball(s, 2.95, 3.25, 0.08, C.red, '8E2A33'); label(s, 3.07, 3.13, 0.8, 'proton', { size: 10.5, align: 'left', h: 0.24 });
    ball(s, 2.95, 3.55, 0.08, '8C96A8', '5A6275'); label(s, 3.07, 3.43, 0.8, 'neutron', { size: 10.5, align: 'left', h: 0.24 });
  },
  head: 'Inside the nucleus',
  lines: [
    'Nuclei are made of **protons** and **neutrons**.',
    'Every nucleus of an element has the **same number of protons**, so each element has its own **characteristic positive charge** on the nucleus.',
    '**Isotopes** are atoms of the same element with **different numbers of neutrons**, so their nuclei have different **masses**.',
    'Isotopes of an element have the same chemical reactions (same number of electrons).',
  ],
  worked: { head: 'Worked example', q: 'Compare the nuclei of carbon-12 and carbon-14.',
    steps: [['Same', 'both have **6 protons** → both carbon, charge +6'], ['Different', 'carbon-14 has **2 more neutrons** (8 not 6)'], ['Effect', 'carbon-14 nucleus has a greater mass'], ['Answer', 'they are isotopes of carbon']] },
  qc: 'Hydrogen-1, hydrogen-2 and hydrogen-3 are isotopes. What is the same and what is different about their nuclei?',
  notes: 'QUICK CHECK ANSWER: Same: one proton each (same charge, same element). Different: number of neutrons (0, 1 and 2), so different masses.\nThe particle table is retrieval from C2.1.',
}), 'P5.1.3 Protons, neutrons, isotopes');

// ======================= 9 NUCLEAR NOTATION =======================
reg(D.contentSlide({
  title: 'Nuclear notation for isotopes',
  subtitle: `Specification ${sp('P5.1.4')} • the conventional way to show identity, charge and mass of a nucleus`,
  tag: 'P5.1.4', caption: 'mass number on top, atomic number below, to the left of the symbol',
  draw: (s, p) => {
    nuclide(s, 2.25, 1.75, 14, 6, 'C', { size: 72, aColor: C.blue, zColor: C.red });
    arrow(s, 1.8, 1.9, 2.85, 2.05, C.blue, 1.75); label(s, 0.6, 1.62, 1.1, 'mass number A', { h: 0.55, size: 11, bold: true, color: C.blue, align: 'right' });
    arrow(s, 1.8, 2.97, 2.85, 2.85, C.red, 1.75); label(s, 0.6, 2.7, 1.1, 'atomic number Z', { h: 0.55, size: 11, bold: true, color: C.red, align: 'right' });
    label(s, 4.3, 1.75, 2.1, '**A** = protons + neutrons', { size: 11, color: C.blue, align: 'left' });
    label(s, 4.3, 2.1, 2.1, '**Z** = protons', { size: 11, color: C.red, align: 'left' });
    label(s, 4.3, 2.45, 2.1, 'neutrons = **A − Z**', { size: 11, color: C.ink, align: 'left' });
    label(s, 4.3, 2.8, 2.1, 'charge of nucleus = **+Z**', { size: 11, color: C.ink, align: 'left' });
    // isotopes row
    box(s, 0.75, 3.75, 5.5, 1.95, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.75, 3.8, 5.5, 'Three isotopes of carbon', { size: 11, bold: true });
    [[12, 6], [13, 7], [14, 8]].forEach(([A, nn], i) => {
      const x = 1.15 + i * 1.8;
      nuclide(s, x, 4.15, A, 6, 'C', { size: 34, aColor: C.blue, zColor: C.red });
      label(s, x - 0.3, 4.9, 1.6, `6 p, ${nn} n`, { size: 11, bold: true });
      label(s, x - 0.3, 5.18, 1.6, `carbon-${A}`, { size: 10.5, italic: true, color: C.grey });
      calc(`C-${A} neutrons`, A - 6, nn);
    });
  },
  head: 'Reading the notation',
  lines: [
    '**Mass number (A)**: the total number of protons and neutrons (nucleons). It sets the **mass**.',
    '**Atomic number (Z)**: the number of protons. It sets the **identity** of the element and the **charge** (+Z).',
    'Isotopes of one element have the **same Z** but a **different A**.',
    'Name an isotope by element and mass number: carbon-14, uranium-238.',
  ],
  worked: { head: 'Worked example', q: `Uranium-238 is written ${N(238, 92, 'U')}. Give the numbers of protons and neutrons and the charge of the nucleus.`,
    steps: [['Protons', 'Z = **92**'], ['Neutrons', 'A − Z = 238 − 92 = **146**'], ['Charge', '+92 (in units of the proton charge)'], ['Answer', '92 protons, 146 neutrons, charge +92']] },
  qc: `How many protons, neutrons and electrons are in an atom of ${N(37, 17, 'Cl')}?`,
  notes: 'QUICK CHECK ANSWER: 17 protons, 37 − 17 = 20 neutrons, 17 electrons (neutral atom).\nCommon error: giving A as the number of neutrons.',
}), 'P5.1.4 Nuclear notation');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('P5.1.3')}–${sp('P5.1.4')} • nuclei, isotopes and notation`, [
  { q: 'What are **isotopes**?', marks: 2, ms: 'Atoms of the same element / same number of protons (1); with different numbers of neutrons (1).' },
  { q: `An iron atom is written ${N(56, 26, 'Fe')}. State the number of **protons**, **neutrons** and **electrons** in the atom.`, marks: 3, ms: 'protons 26 (1); neutrons 56 − 26 = 30 (1); electrons 26 (1).' },
  { q: `${N(35, 17, 'Cl')} and ${N(37, 17, 'Cl')} are both chlorine. Explain why they are the same element but have different masses.`, marks: 2, ms: 'Both have 17 protons / same atomic number, so same element (1); different numbers of neutrons (18 and 20), so different mass numbers/masses (1).' },
]);
reg(R2.s, 'Recap 2');
calc('Cl-35 neutrons', 35 - 17, 18);

// ======================= 11 UNSTABLE NUCLEI, RANDOM DECAY =======================
{
  const R = rng(51), idx = [...Array(100).keys()];
  for (let i = 99; i > 0; i--) { const j = Math.floor(R() * (i + 1)); [idx[i], idx[j]] = [idx[j], idx[i]]; }
  const decayed = new Set(idx.slice(0, 50));
  assert.strictEqual(decayed.size, 50);
  reg(D.contentSlide({
    title: 'Unstable nuclei and random decay',
    subtitle: `Specification ${sp('P5.1.5')}, ${sp('P5.1.8')} • radioactive decay is random`,
    tag: 'P5.1.5', caption: '100 unstable nuclei: which 50 decay in one half-life cannot be predicted',
    draw: (s, p) => {
      const cell = 0.235;
      [[0.85, false, 'start: 100 undecayed nuclei'], [3.65, true, 'later: about half have decayed']].forEach(([gx, after, cap]) => {
        label(s, gx - 0.1, 1.55, 2.6, cap, { size: 11, bold: true });
        for (let i = 0; i < 100; i++) {
          const x = gx + (i % 10) * cell + cell / 2, y = 2.0 + Math.floor(i / 10) * cell + cell / 2;
          if (after && decayed.has(i)) s.addShape(SH.OVAL, { x: x - 0.07, y: y - 0.07, w: 0.14, h: 0.14, fill: { color: C.white }, line: { color: '9AA3B5', width: 0.75 } });
          else ball(s, x, y, 0.085, C.red, '8E2A33');
        }
      });
      arrow(s, 3.25, 3.2, 3.55, 3.2, C.ink, 2);
      ball(s, 1.0, 4.75, 0.085, C.red, '8E2A33'); label(s, 1.15, 4.63, 2.0, 'undecayed (unstable) nucleus', { size: 10.5, align: 'left', h: 0.24 });
      s.addShape(SH.OVAL, { x: 0.93, y: 5.03, w: 0.14, h: 0.14, fill: { color: C.white }, line: { color: '9AA3B5', width: 0.75 } }); label(s, 1.15, 4.98, 2.4, 'decayed: has emitted radiation', { size: 10.5, align: 'left', h: 0.24 });
      label(s, 3.8, 4.68, 2.5, 'Each nucleus has the same chance of decaying each second. You cannot say **which** one or **when**.', { h: 0.8, size: 10.5, align: 'left', valign: 'top', color: C.ink });
    },
    head: 'Radioactive decay',
    lines: [
      'Some nuclei are **unstable**. They give out radiation to become more stable: this is **radioactive decay**.',
      'Decay is **random**: you cannot predict **which** nucleus will decay next or **when** it will decay.',
      'Decay is not changed by temperature, pressure or chemical reactions.',
      'With very large numbers of nuclei the **overall pattern is predictable**, e.g. how long until half have decayed.',
    ],
    worked: { head: 'Model it: rolling dice', q: 'Each die is a nucleus. A six means it decays.',
      steps: [['One die', 'you cannot predict when it will roll a six'], ['Each throw', 'every die has the same 1 in 6 chance'], ['Many dice', 'about 1/6 of them roll a six each throw'], ['Answer', 'random for one, predictable for many']] },
    qc: 'A sample has 1 000 000 unstable nuclei. Can you predict when one particular nucleus will decay? What can you predict?',
    notes: 'QUICK CHECK ANSWER: No – decay is random. You can predict the overall behaviour, e.g. about how many will decay in a given time / how long until half have decayed (the half-life).\nThe grid uses a fixed random seed with exactly 50 of 100 decayed; in reality about half decay in one half-life (the number varies).',
  }), 'P5.1.5 Random decay');
}

// ======================= 12 FOUR EMISSIONS =======================
reg(D.contentSlide({
  title: 'Alpha, beta, gamma and neutron emission',
  subtitle: `Specification ${sp('P5.1.5')} • what an unstable nucleus can give out`,
  tag: 'P5.1.5', caption: 'emissions drawn leaving the nucleus; sizes not to scale',
  draw: (s, p) => {
    const rows = [
      ['alpha particle  α', '2 protons + 2 neutrons (a helium nucleus)', [4, 2, 'He'], C.red],
      ['beta particle  β', 'a fast electron made in the nucleus', [0, '−1', 'e'], C.blue],
      ['gamma ray  γ', 'high-frequency EM radiation', [0, 0, 'γ'], C.green],
      ['neutron  n', 'a neutron thrown out of the nucleus', [1, 0, 'n'], '5A6275'],
    ];
    rows.forEach(([name, what, nt, col], i) => {
      const y = 1.95 + i * 1.0;
      nucleus(s, 1.05, y, 9, 11, { d: 0.12 });
      if (i === 0) { arrow(s, 1.45, y, 2.15, y, col, 2); nucleus(s, 2.45, y, 2, 2, { d: 0.14 }); }
      if (i === 1) { arrow(s, 1.45, y, 2.2, y, col, 2); ball(s, 2.4, y, 0.09, C.blue, '1F3F9E'); label(s, 2.31, y - 0.1, 0.18, '−', { h: 0.18, size: 10, bold: true, color: C.white }); }
      if (i === 2) { wave(s, 1.45, 2.55, y, 0.09, 4, col); arrow(s, 2.5, y, 2.7, y, col, 2); }
      if (i === 3) { arrow(s, 1.45, y, 2.2, y, col, 2); ball(s, 2.4, y, 0.075, '8C96A8', '5A6275'); }
      nuclide(s, 2.95, y - 0.25, nt[0], nt[1], nt[2], { size: 26, aColor: C.blue, zColor: C.red });
      label(s, 4.0, y - 0.32, 2.45, name, { size: 12, bold: true, color: col, align: 'left' });
      label(s, 4.0, y - 0.05, 2.45, what, { h: 0.42, size: 10.5, align: 'left', valign: 'top' });
    });
  },
  head: 'Four kinds of emission',
  lines: [
    '**Alpha (α)**: 2 protons and 2 neutrons, the same as a **helium nucleus**. Charge +2.',
    '**Beta (β)**: a **high-speed electron** from the nucleus. A neutron changes into a proton and an electron. Charge −1.',
    '**Gamma (γ)**: **electromagnetic radiation** of very high frequency. No mass, no charge. Often given out after α or β.',
    '**Neutron (n)**: no charge, relative mass 1.',
    'All of these are **ionising radiation** (P1.1).',
  ],
  worked: { head: 'Which emission?', q: '',
    steps: [['Has a charge of +2', '**alpha**'], ['Is an electron', '**beta**'], ['Has no mass and no charge', '**gamma**'], ['Answer', 'no charge but has mass → **neutron**']] },
  qc: 'A nucleus emits a particle with a relative mass of 4. Name the particle and say what it is made of.',
  notes: 'QUICK CHECK ANSWER: Alpha particle: 2 protons and 2 neutrons (a helium nucleus).\nNotation used in OCR papers: alpha ⁴₂He (or ⁴₂α), beta ⁰₋₁e (or ⁰₋₁β), gamma ⁰₀γ, neutron ¹₀n.',
}), 'P5.1.5 Four emissions');

// ======================= 13 CHANGES TO THE NUCLEUS =======================
const GZA = { x: 1.55, y: 1.55, w: 4.5, h: 3.65, xmin: 88, xmax: 95, ymin: 232, ymax: 240, xstep: 1, ystep: 1, xlabel: 'atomic number Z (protons)', ylabel: 'mass number A', fmt: v => String(Math.round(v)) };
reg(D.contentSlide({
  title: 'How each emission changes the nucleus',
  subtitle: `Specification ${sp('P5.1.6')} • changes in mass, charge or both`,
  tag: 'P5.1.6', caption: 'starting from uranium-238 (Z = 92, A = 238), drawn on a Z–A grid',
  draw: (s, p) => {
    axes(s, GZA);
    const P = ([z, a]) => [px(GZA, z), py(GZA, a)];
    const [sx, sy] = P(zaStart);
    arrow(s, sx, sy, ...P(zaAlpha), C.red, 2.5); arrow(s, sx, sy, ...P(zaBeta), C.blue, 2.5); arrow(s, sx, sy, ...P(zaNeu), '5A6275', 2.5);
    [[zaAlpha, C.red], [zaBeta, C.blue], [zaNeu, '5A6275']].forEach(([q, col]) => { const [x, y] = P(q); ball(s, x, y, 0.07, col); });
    ball(s, sx, sy, 0.09, C.ink);
    s.addShape(SH.OVAL, { x: sx - 0.2, y: sy - 0.2, w: 0.4, h: 0.4, fill: { type: 'none' }, line: { color: C.green, width: 2 } });
    label(s, sx - 1.6, sy - 0.33, 1.4, 'U-238', { size: 11, bold: true, align: 'right' });
    label(s, sx + 0.12, sy - 0.48, 1.4, 'γ: stays put', { size: 10.5, bold: true, color: C.green, align: 'left' });
    const [ax, ay] = P(zaAlpha); label(s, ax - 0.2, ay + 0.08, 1.8, 'α: Z − 2, A − 4', { size: 10.5, bold: true, color: C.red, align: 'left' });
    const [bx, by] = P(zaBeta); label(s, bx - 1.1, by + 0.1, 1.3, 'β: Z + 1', { size: 10.5, bold: true, color: C.blue, align: 'right' });
    const [nx, ny] = P(zaNeu); label(s, nx + 0.1, ny + 0.0, 1.2, 'n: A − 1', { size: 10.5, bold: true, color: '5A6275', align: 'left' });
  },
  head: 'Mass number A and atomic number Z',
  lines: [
    '**Alpha**: A falls by **4**, Z falls by **2** → a **new element**.',
    '**Beta**: A **unchanged**, Z rises by **1** (a neutron becomes a proton) → a **new element**.',
    '**Gamma**: A and Z **unchanged**; the nucleus just loses energy.',
    '**Neutron**: A falls by **1**, Z unchanged → a lighter **isotope of the same element**.',
    'A change in A is a change in **mass**; a change in Z is a change in **charge** (+Z).',
  ],
  worked: { head: 'Worked example', q: 'Thorium-234 (Z = 90) emits a beta particle. What is the new nucleus?',
    steps: [['Mass number', 'unchanged: A = 234'], ['Atomic number', 'Z = 90 + 1 = 91'], ['Element', 'Z = 91 is protactinium (Pa)'], ['Answer', `${N(234, 91, 'Pa')}`]] },
  qc: 'A nucleus emits a neutron. Is it still the same element? Explain your answer.',
  notes: 'QUICK CHECK ANSWER: Yes – the number of protons (Z) does not change, so it is the same element; only the mass number falls by 1, so it becomes a different isotope.\nZ–A grid drawn to scale: U-238 (92, 238) → α (90, 234), β (93, 238), n (92, 237). Students do not need to learn element names: they are given in questions.',
}), 'P5.1.6 Changes to the nucleus');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('P5.1.5')}, ${sp('P5.1.6')}, ${sp('P5.1.8')} • decay and emissions`, [
  { q: 'Name the emission described: **(i)** electromagnetic radiation from the nucleus; **(ii)** a helium nucleus; **(iii)** an electron from the nucleus.', marks: 3, ms: '(i) gamma (1); (ii) alpha (1); (iii) beta (1).' },
  { q: 'Radioactive decay is described as **random**. Explain what this means.', marks: 2, ms: 'Cannot predict which nucleus will decay (1); or when a nucleus will decay (1).' },
  { q: 'Explain why emitting a **beta particle** changes the element, but emitting a **gamma ray** does not.', marks: 3, ms: 'Beta: a neutron changes into a proton (1); so the atomic number/number of protons increases by 1 → new element (1); gamma: no change to the number of protons (or neutrons) – only energy is lost (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 EQUATIONS: ALPHA AND BETA =======================
reg(D.contentSlide({
  title: 'Balanced nuclear equations: alpha and beta',
  subtitle: `Specification ${sp('P5.1.7')} • mass numbers and atomic numbers must balance`,
  tag: 'P5.1.7', caption: 'top numbers (A) balance and bottom numbers (Z) balance',
  draw: (s, p) => {
    const blk = (y, title, eq, col, chkA, chkZ) => {
      label(s, 0.75, y, 5.5, title, { size: 12, bold: true, color: col, align: 'left' });
      eqRow(s, 0.9, y + 0.38, [eq.lhs[0], '→', eq.rhs[0], '+', eq.rhs[1]], { size: 32 });
      box(s, 0.75, y + 1.15, 5.6, 0.62, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      s.addText([{ text: 'A:  ', options: { bold: true, color: C.blue } }, { text: chkA + '  ✓', options: { color: C.text, breakLine: true } }, { text: 'Z:  ', options: { bold: true, color: C.red } }, { text: chkZ + '  ✓', options: { color: C.text } }],
        { x: 0.95, y: y + 1.17, w: 5.3, h: 0.58, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    };
    blk(1.45, 'Alpha decay of uranium-238', eqAlphaU, C.red, '238 = 234 + 4', '92 = 90 + 2');
    blk(3.6, 'Beta decay of carbon-14', eqBetaC, C.blue, '14 = 14 + 0', '6 = 7 + (−1)');
  },
  head: 'Writing a nuclear equation',
  lines: [
    'Write the parent nucleus → daughter nucleus + emission, all in nuclear notation.',
    'The **mass numbers (top)** must add up to the same total on both sides.',
    'The **atomic numbers (bottom)** must add up to the same total on both sides.',
    `Alpha is ${N(4, 2, 'He')}; beta is ${N(0, -1, 'e')} (a beta particle counts as Z = −1).`,
    'The new Z tells you the new element (use the Periodic Table given).',
  ],
  worked: { head: 'Worked example: find the missing numbers', q: `Radon-222 (${N(222, 86, 'Rn')}) emits an alpha particle and becomes polonium (Po).`,
    steps: [['A', '222 − 4 = **218**'], ['Z', '86 − 2 = **84**'], ['Check', '218 + 4 = 222 ✓   84 + 2 = 86 ✓'], ['Answer', `${N(222, 86, 'Rn')} → ${N(218, 84, 'Po')} + ${N(4, 2, 'He')}`]] },
  qc: `Radium-226 (${N(226, 88, 'Ra')}) emits an alpha particle and becomes radon (Rn). Write the balanced equation.`,
  notes: `QUICK CHECK ANSWER: ²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He (1 mark for 222, 1 mark for 86).\nAll ${EQN.length} nuclear equations in this deck are checked in node: A and Z balance on both sides.`,
}), 'P5.1.7 Equations: alpha and beta');

// ======================= 16 EQUATIONS: GAMMA AND NEUTRON =======================
reg(D.contentSlide({
  title: 'Balanced nuclear equations: gamma and neutron',
  subtitle: `Specification ${sp('P5.1.7')} • gamma changes nothing; a neutron lowers the mass number by 1`,
  tag: 'P5.1.7', caption: 'cobalt-60 emits beta, then the excited nickel-60 nucleus emits gamma',
  draw: (s, p) => {
    label(s, 0.75, 1.45, 5.6, '1  Beta decay of cobalt-60', { size: 12, bold: true, color: C.blue, align: 'left' });
    eqRow(s, 0.9, 1.8, [eqBetaCo.lhs[0], '→', eqBetaCo.rhs[0], '+', eqBetaCo.rhs[1]], { size: 30 });
    label(s, 0.75, 2.55, 5.6, '2  The nickel-60 nucleus then gives out a gamma ray', { size: 12, bold: true, color: C.green, align: 'left' });
    eqRow(s, 0.9, 2.9, [eqGamNi.lhs[0], '→', eqGamNi.rhs[0], '+', eqGamNi.rhs[1]], { size: 30 });
    label(s, 0.75, 3.55, 5.6, 'same A, same Z: the nucleus only loses energy', { size: 10.5, italic: true, color: C.green, align: 'left' });
    label(s, 0.75, 4.05, 5.6, '3  Neutron emission from beryllium-13', { size: 12, bold: true, color: '5A6275', align: 'left' });
    eqRow(s, 0.9, 4.4, [eqNeuBe.lhs[0], '→', eqNeuBe.rhs[0], '+', eqNeuBe.rhs[1]], { size: 30 });
    label(s, 0.75, 5.05, 5.6, 'A: 13 = 12 + 1 ✓   Z: 4 = 4 + 0 ✓   → an isotope of beryllium', { size: 10.5, italic: true, color: '5A6275', align: 'left' });
  },
  head: 'Gamma and neutron equations',
  lines: [
    `Gamma: ${N(0, 0, 'γ')}. A and Z of the nucleus **do not change**; it goes from an excited (high-energy) state to a lower-energy state.`,
    `Neutron: ${N(1, 0, 'n')}. A **falls by 1**, Z is unchanged: same element, different isotope.`,
    'Gamma is often emitted **straight after** an alpha or beta decay.',
    'Always check: top numbers balance, bottom numbers balance.',
  ],
  worked: { head: 'Worked example', q: `Strontium-90 (${N(90, 38, 'Sr')}) emits a beta particle and becomes yttrium (Y). Write the equation.`,
    steps: [['A', 'unchanged: **90**'], ['Z', '38 + 1 = **39**'], ['Check', 'A: 90 = 90 + 0 ✓   Z: 38 = 39 + (−1) ✓'], ['Answer', `${N(90, 38, 'Sr')} → ${N(90, 39, 'Y')} + ${N(0, -1, 'e')}`]] },
  qc: `Iodine-131 (${N(131, 53, 'I')}) emits a beta particle and becomes xenon (Xe). Write the balanced equation.`,
  notes: 'QUICK CHECK ANSWER: ¹³¹₅₃I → ¹³¹₅₄Xe + ⁰₋₁e.\nBe-13 is very neutron-rich and decays by neutron emission (used as a clear textbook example). Mark schemes accept β or e for the beta particle, provided 0 and −1 are shown.',
}), 'P5.1.7 Equations: gamma and neutron');

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('P5.1.6')}–${sp('P5.1.7')} • nuclear equations`, [
  { q: `Plutonium-239 decays: ${N(239, 94, 'Pu')} → ${N(235, 92, 'U')} + **X**. Identify **X** and give its mass number and atomic number.`, marks: 2, ms: 'X is an alpha particle / helium nucleus (1); A = 4, Z = 2 (1).' },
  { q: `Potassium-40 (${N(40, 19, 'K')}) decays by beta emission to calcium (Ca). Write a balanced equation for this decay.`, marks: 3, ms: '⁴⁰₁₉K → ⁴⁰₂₀Ca + ⁰₋₁e: correct calcium A = 40 (1); Z = 20 (1); beta particle written as ⁰₋₁e or ⁰₋₁β (1).' },
  { q: `Complete the equation: ${N(5, 2, 'He')} → ${N(4, 2, 'He')} + ____ . Name the particle emitted.`, marks: 2, ms: '¹₀n (1); neutron (1).' },
  { q: 'Explain why emitting a gamma ray does **not** change the mass number or the atomic number of a nucleus.', marks: 1, ms: 'Gamma ray has no mass and no charge / is electromagnetic radiation, so no protons or neutrons are lost (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 18 HALF-LIFE AND ACTIVITY =======================
const GHL = { x: 1.5, y: 1.55, w: 4.75, h: 3.6, xmin: 0, xmax: 15, ymin: 0, ymax: 800, xstep: 3, ystep: 100, minor: 3, xlabel: 'time / hours', ylabel: 'activity / Bq', fmt: v => String(Math.round(v)) };
reg(D.contentSlide({
  title: 'Half-life and activity',
  subtitle: `Specification ${sp('P5.1.8')} • the time for the activity (or number of undecayed nuclei) to halve`,
  tag: 'P5.1.8', caption: 'drawn to scale: activity 800 Bq at the start, half-life 3 hours',
  draw: (s, p) => {
    axes(s, GHL);
    fnLine(s, GHL, act, 0, 15, 60, C.blue, 2.5);
    [[3, 400], [6, 200], [9, 100]].forEach(([t, a], i) => {
      line(s, px(GHL, 0), py(GHL, a), px(GHL, t), py(GHL, a), C.red, 1.25, { dash: 'dash' });
      line(s, px(GHL, t), py(GHL, a), px(GHL, t), py(GHL, 0), C.red, 1.25, { dash: 'dash' });
    });
    label(s, px(GHL, 3) + 0.05, py(GHL, 560), 1.9, '800 → 400 Bq in 3 h', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, px(GHL, 6) + 0.05, py(GHL, 330), 1.9, '400 → 200 Bq in 3 h', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, px(GHL, 9) + 0.05, py(GHL, 190), 1.9, '200 → 100 Bq in 3 h', { size: 10.5, bold: true, color: C.red, align: 'left' });
  },
  head: 'Activity and half-life',
  lines: [
    '**Activity**: the number of nuclei that decay each second. Unit: **becquerel (Bq)**; 1 Bq = 1 decay per second.',
    'As nuclei decay there are fewer left to decay, so the activity falls.',
    '**Half-life**: the time for the number of undecayed nuclei, or the activity, to **halve**. It is the same for every halving.',
    'Decay is random, so half-life is an **average** for a very large number of nuclei: it lets us predict the pattern.',
  ],
  worked: { head: 'Worked example: half-life from a graph', q: 'Use the graph to find the half-life.',
    steps: [['Start', 'activity = 800 Bq at t = 0'], ['Half', 'read across at 400 Bq → t = 3 h'], ['Check', '400 → 200 Bq also takes 3 h'], ['Answer', `half-life = ${Th} hours`]] },
  qc: 'Use the graph. What is the activity after 9 hours? How long does it take for the activity to fall to 50 Bq?',
  notes: `QUICK CHECK ANSWER: ${act(9)} Bq after 9 h (3 half-lives); 50 Bq after ${4 * Th} h (4 half-lives: 800 → 400 → 200 → 100 → 50).\nGraph: A = 800 × 0.5^(t/3), plotted from the equation in node (to scale). Becquerel usage is UNVERIFIED as a J260 statement but is standard and used in OCR papers.`,
}), 'P5.1.8 Half-life and activity');

// ======================= 19 SUGGESTED PRACTICAL: DICE METHOD =======================
reg(D.contentSlide({
  title: 'Suggested practical: modelling decay with dice',
  subtitle: `Specification ${sp('P5.1.8')} • a model of random decay and half-life`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'tray of dice: sixes (red) are removed as "decayed nuclei"',
  draw: (s, p) => {
    box(s, 0.75, 1.6, 3.6, 2.25, 'E9DCC2', '8A6A3A', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 2 });
    label(s, 0.75, 1.62, 3.6, 'tray: 120 dice (only some shown)', { size: 10.5, bold: true, color: '6B4E1E', h: 0.24 });
    const vals = [3, 1, 6, 4, 2, 5, 2, 4, 1, 3, 5, 6, 3, 2, 4];
    vals.forEach((v, i) => die(s, 0.95 + (i % 5) * 0.68, 1.95 + Math.floor(i / 5) * 0.6, 0.45, v, v === 6));
    arrow(s, 4.45, 2.75, 5.05, 2.75, C.red, 2.5);
    label(s, 4.4, 2.35, 0.7, 'remove', { size: 10.5, bold: true, color: C.red });
    box(s, 5.1, 2.0, 1.25, 1.4, 'FBE9EA', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    [[5.2, 2.15], [5.75, 2.15], [5.47, 2.7]].forEach(([x, y]) => die(s, x, y, 0.45, 6, true));
    label(s, 5.05, 3.45, 1.35, '"decayed"', { size: 10.5, bold: true, color: C.red });
    const tbl = [['Dice', 'unstable nuclei'], ['Rolling a six', 'a nucleus decaying'], ['One throw', 'one unit of time'], ['1 in 6 chance', 'same chance every throw']];
    s.addTable([[{ text: 'Model', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Real decay', options: { bold: true, color: C.white, fill: { color: C.ink } } }],
      ...tbl.map((r, i) => r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.white : C.cardBlue } } })))],
      { x: 0.75, y: 4.0, w: 5.6, colW: [2.2, 3.4], rowH: 0.27, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'left', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Method',
  lines: [
    'Count out **120 dice** (or cubes with one face marked). Throw them all into a tray.',
    'Remove every die showing a **six**: these nuclei have "decayed". Count the dice left.',
    'Throw the remaining dice again. Repeat for **10 throws**, recording the number left each time.',
    'Plot **number of dice left (y)** against **throw number (x)** and draw a smooth curve.',
    'Use the curve to find the **half-life** in throws.',
  ],
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'number of throws (time)'], ['Dependent', 'number of dice left (undecayed nuclei)'], ['Control', 'same dice, same rule (remove sixes), shake fairly'], ['Safety', 'low hazard: no radioactive source; pick up dropped dice']], size: 10.5 },
  workedH: 2.25,
  qc: 'In this model, what does rolling a six represent? Why is a large number of dice used?',
  notes: 'QUICK CHECK ANSWER: A six = one nucleus decaying. Many dice make the random pattern smoother/more predictable, as in a real sample with huge numbers of nuclei.\nLimitations (for discussion): real samples have far more nuclei; decay happens continuously, not in throws; each isotope has its own probability. Equipment: 120 dice or cubes, tray, results table. "Suggested practical": OCR does not list a PAG for P5.1 (UNVERIFIED).',
}), 'Suggested practical: dice method');

// ======================= 20 SUGGESTED PRACTICAL: RESULTS =======================
const GD = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 10, ymin: 0, ymax: 120, xstep: 1, ystep: 20, minor: 2, xlabel: 'throw number', ylabel: 'number of dice left', fmt: v => String(Math.round(v)) };
{
  const s = D.contentHeader('Suggested practical: results and half-life', `Specification ${sp('P5.1.8')} • sample class results for 120 dice`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample results plotted to scale with a smooth best-fit curve');
  axes(s, GD);
  fnLine(s, GD, diceExp, 0, 10, 50, C.blue, 2);
  points(s, GD, diceData.map((v, k) => [k, v]));
  [[diceHL, 60], [2 * diceHL, 30]].forEach(([t, v]) => {
    line(s, px(GD, 0), py(GD, v), px(GD, t), py(GD, v), C.red, 1.25, { dash: 'dash' });
    line(s, px(GD, t), py(GD, v), px(GD, t), py(GD, 0), C.red, 1.25, { dash: 'dash' });
  });
  label(s, px(GD, diceHL) + 0.05, py(GD, 72), 2.0, '120 → 60: about 3.8 throws', { size: 10.5, bold: true, color: C.red, align: 'left' });
  label(s, px(GD, 3.95), py(GD, 27), 1.62, '60 → 30: about 3.8 more', { size: 10.5, bold: true, color: C.red, align: 'right' });
  const hd = [{ text: 'Throw', options: { bold: true, color: C.white, fill: { color: C.ink } } }, ...diceData.map((_, k) => ({ text: String(k), options: { bold: true, color: C.white, fill: { color: C.ink } } }))];
  const r2 = [{ text: 'Dice left', options: { bold: true, fill: { color: C.cardBlue } } }, ...diceData.map(v => ({ text: String(v), options: { fill: { color: C.cardBlue } } }))];
  s.addTable([hd, r2], { x: 6.8, y: 1.3, w: 6.08, colW: [1.13, ...Array(11).fill(0.45)], rowH: 0.36, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 2.2, 6.08, 2.0, 'What the results show', [
    'The number left falls quickly at first, then more slowly: the same **shape** as a radioactive decay curve.',
    'Each throw removes about **1/6** of the dice that are left, so the halving time stays the same.',
    'Half-life of the model ≈ **3.8 throws**, whatever the starting number.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.35, 6.08, 1.9, 'Sources of error and improvements', '', [
    ['Random scatter', 'points do not sit exactly on the curve → repeat and average / use more dice'],
    ['Miscounting', 'count dice left carefully, or count removed dice as a check'],
    ['Answer', 'pool class results to make the curve smoother']], { size: 10.5 });
  D.quickCheck(s, 'Use the graph: about how many dice are left after 5 throws? About how many throws until only 15 dice are left?');
  D.notes(s, `QUICK CHECK ANSWER: about 47–48 dice after 5 throws (data 47; model ${diceExp(5).toFixed(1)}); 15 dice is 3 half-lives (120 → 60 → 30 → 15), about 11–12 throws (3 × 3.8 = 11.4) – beyond this data, so extrapolate or keep throwing.\nModel curve N = 120 × (5/6)^throws; half-life = ln 2 / ln 1.2 = ${diceHL.toFixed(2)} throws, checked in node. Sample data within ±3.5 of the model.`);
  reg(s, 'Suggested practical: results');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('P5.1.8')} • activity, half-life and the dice model`, [
  { q: 'Define the **half-life** of a radioactive isotope.', marks: 1, ms: 'The time taken for the number of undecayed nuclei / the activity (count rate) to halve (1).' },
  { q: 'A source has an activity of **500 Bq**. What does this mean?', marks: 2, ms: '500 nuclei decay (1); every second (1).' },
  { q: 'The activity of a source falls from **600 Bq** to **300 Bq** in **40 s**. State its half-life and calculate the activity after a further **80 s**.', marks: 3, ms: 'half-life = 40 s (1); 80 s = 2 more half-lives (1); 300 → 150 → 75 Bq (1).' },
  { q: 'Give **one** way the dice model is like real radioactive decay and **one** way it is different.', marks: 2, ms: 'Like: random – cannot predict which die/nucleus; fixed chance each throw/same probability per unit time; numbers halve in a fixed time (1). Unlike: far fewer dice than nuclei; decay is continuous not in steps; real probability set by isotope (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 22 HALF-LIFE CALCULATIONS =======================
reg(D.contentSlide({
  title: 'Calculations with half-life',
  subtitle: `Specification ${sp('P5.1.8')} • count the half-lives, then halve`,
  tag: 'P5.1.8', caption: 'a sample with half-life 3 days, halving every 3 days',
  draw: (s, p) => {
    const vals = [6400, 3200, 1600, 800, 400];
    vals.forEach((v, i) => {
      const y = 1.5 + i * 0.86, w = 1.0 + 2.6 * Math.sqrt(v / 6400);
      box(s, 1.0, y, w, 0.55, i === 4 ? 'FBE9EA' : C.cardBlue, i === 4 ? C.red : C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.25 });
      label(s, 1.0, y, w, `${v} Bq`, { h: 0.55, size: 13, bold: true, color: i === 4 ? C.red : C.ink });
      label(s, 4.75, y, 1.6, `day ${i * 3}`, { h: 0.55, size: 11.5, bold: true, color: C.grey, align: 'left' });
      if (i < 4) { arrow(s, 1.5, y + 0.57, 1.5, y + 0.84, C.red, 1.75); label(s, 1.6, y + 0.56, 2.2, `÷ 2  (${i + 1} half-li${i ? 'ves' : 'fe'})`, { h: 0.28, size: 10.5, bold: true, color: C.red, align: 'left' }); }
    });
  },
  head: 'Method',
  lines: [
    '**Step 1:** number of half-lives = time ÷ half-life.',
    '**Step 2:** halve the starting value that many times.',
    '**Finding a half-life:** count how many halvings take the value from start to end, then half-life = time ÷ number of halvings.',
    'Use the same units of time for both. The value never reaches zero in a whole number of half-lives.',
  ],
  worked: { head: 'Worked example', q: 'A source has an activity of 6400 Bq and a half-life of 3 days. Calculate its activity after 12 days.',
    steps: [['Half-lives', `12 ÷ 3 = ${n22}`], ['Halve', '6400 → 3200 → 1600 → 800 → 400'], ['Check', `6400 ÷ 2^^4^^ = 6400 ÷ 16`], ['Answer', `activity = ${a22} Bq`]] },
  qc: 'Iodine-131 has a half-life of 8 days. A sample has an activity of 2000 Bq. Calculate its activity after 24 days.',
  notes: `QUICK CHECK ANSWER: 24 ÷ 8 = 3 half-lives; 2000 → 1000 → 500 → ${qc22} Bq.\nFoundation students should use repeated halving; Higher students can also divide by 2ⁿ (next slide).`,
}), 'P5.1.8 Half-life calculations');

// ======================= 23 HT NET DECLINE RATIO =======================
reg(D.contentSlide({
  title: 'Net decline as a ratio',
  subtitle: `Specification ${sp('P5.1.9')} • after n half-lives, 1 part in 2ⁿ remains`,
  tag: 'P5.1.9', ht: true, caption: 'shaded area = fraction of undecayed nuclei remaining (to scale)',
  draw: (s, p) => {
    for (let n = 0; n <= 4; n++) {
      const y = 1.5 + n * 0.8, w = 3.2, frac = 1 / 2 ** n;
      box(s, 1.0, y, w, 0.55, C.white, C.ink, { lw: 1 });
      box(s, 1.0, y, w * frac, 0.55, C.red, null, { tr: 15 });
      label(s, 0.45, y, 0.5, `n = ${n}`, { h: 0.55, size: 10.5, bold: true, color: C.ink, align: 'right' });
      label(s, 4.35, y, 2.1, n === 0 ? 'all: 1 : 1' : `1/${2 ** n} left  →  1 : ${2 ** n}`, { h: 0.55, size: 11.5, bold: true, color: n ? C.red : C.ink, align: 'left' });
    }
    label(s, 0.95, 5.45, 5.3, 'n = number of half-lives • ratio = remaining : original', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'The net decline',
  lines: [
    'After **n** half-lives, the fraction remaining is **(½)ⁿ = 1/2ⁿ**.',
    'As a ratio, **remaining : original = 1 : 2ⁿ**. The **net decline** = the fraction that has decayed = 1 − 1/2ⁿ.',
    'This works for the number of undecayed nuclei, the activity or the count rate.',
    'n must be a **whole number** of half-lives.',
  ],
  worked: { head: 'Worked example', q: 'An isotope has a half-life of 6 minutes. What is the ratio of its activity after 30 minutes to its starting activity?',
    steps: [['Half-lives', `30 ÷ 6 = ${n23}`], ['Fraction', `(½)^^5^^ = 1/${r23}`], ['Decayed', `1 − 1/${r23} = 31/32 of the nuclei`], ['Answer', `ratio = 1 : ${r23}`]] },
  qc: 'What fraction of the original nuclei remains after 6 half-lives? What fraction has decayed?',
  notes: 'QUICK CHECK ANSWER: (½)⁶ = 1/64 remains (ratio 1 : 64); 63/64 has decayed.\nP5.1.9 is HIGHER TIER only (bold in the OCR spec). Wording reconstructed: "calculate the net decline, expressed as a ratio, during radioactive emission after a given (integral) number of half-lives".',
}), 'P5.1.9 HT Net decline ratio');

// ======================= 24 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('P5.1.8')}–${sp('P5.1.9')} • half-life calculations`, [
  { q: 'A sample decays for **3 half-lives**. Give the ratio of the number of undecayed nuclei remaining to the original number.', marks: 2, ht: true, ms: '(½)³ = 1/8 (1); ratio 1 : 8 (1).' },
  { q: 'A sample contains 8.0 × 10^^6^^ undecayed nuclei. Its half-life is **2 hours**. Calculate how many undecayed nuclei remain after **10 hours**.', marks: 3, ht: true, ms: '10 ÷ 2 = 5 half-lives (1); 8.0 × 10⁶ ÷ 2⁵ or ÷ 32 (1); = 2.5 × 10⁵ (1).' },
  { q: 'The activity of a source falls from **4800 Bq** to **300 Bq** in **20 minutes**. Calculate the half-life.', marks: 3, ms: '4800 → 2400 → 1200 → 600 → 300 (1); 4 half-lives (1); 20 ÷ 4 = 5 minutes (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 25 BRIDGE: PENETRATION (P5.2.1 preview) =======================

reg(D.contentSlide({
  title: 'Looking ahead: what stops each emission?',
  subtitle: 'Bridge to P5.2 (P5.2.1 penetration) • taught in full and examined in the next deck',
  tag: 'P5.2 bridge', caption: 'absorbers in order: paper, a few mm of aluminium, thick lead',
  draw: (s, p) => {
    box(s, 0.7, 2.0, 0.55, 2.9, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    label(s, 0.55, 4.95, 0.9, 'source', { size: 10.5, bold: true });
    const ys = { a: 2.4, b: 3.45, g: 4.5 };
    const xp = 2.35, xa = 3.55, xl = 4.75;
    // absorbers
    box(s, xp, 1.75, 0.07, 3.35, 'FFFDF5', '9C8F6A', { lw: 0.75 });
    box(s, xa, 1.75, 0.2, 3.35, 'C9CED8', '7C8598', { lw: 0.75 });
    box(s, xl, 1.75, 0.6, 3.35, '5A6275', '3B4252', { lw: 0.75 });
    label(s, xp - 0.55, 1.42, 1.15, 'paper', { size: 10.5, bold: true });
    label(s, xa - 0.6, 1.42, 1.4, 'few mm Al', { size: 10.5, bold: true });
    label(s, xl - 0.35, 1.42, 1.3, 'thick lead', { size: 10.5, bold: true });
    // alpha
    arrow(s, 1.3, ys.a, xp - 0.02, ys.a, C.red, 3); label(s, 1.3, ys.a - 0.33, 0.9, 'α', { size: 14, bold: true, color: C.red, align: 'left' });
    // beta
    arrow(s, 1.3, ys.b, xa - 0.02, ys.b, C.blue, 3); label(s, 1.3, ys.b - 0.33, 0.9, 'β', { size: 14, bold: true, color: C.blue, align: 'left' });
    // gamma: through paper and Al, reduced by lead
    wave(s, 1.3, xl, ys.g, 0.08, 9, C.green, 2.5);
    wave(s, xl + 0.6, 6.15, ys.g, 0.04, 3, C.green, 1.0); arrow(s, 6.1, ys.g, 6.35, ys.g, C.green, 1);
    label(s, 1.3, ys.g - 0.38, 0.9, 'γ', { size: 14, bold: true, color: C.green, align: 'left' });
    label(s, xl + 0.6, ys.g + 0.12, 1.25, 'weaker', { size: 10.5, bold: true, color: C.green });
    label(s, 0.7, 5.25, 5.6, '(range in air: α a few cm; β up to about a metre; γ very far)', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'Penetration and ionisation',
  lines: [
    '**Alpha**: stopped by a sheet of **paper** (or a few cm of air). **Most strongly ionising.**',
    '**Beta**: passes through paper; stopped by a **few millimetres of aluminium**. Moderately ionising.',
    '**Gamma**: passes through paper and aluminium; **reduced but not fully stopped** by thick **lead or concrete**. Weakly ionising.',
    'The more strongly an emission ionises, the faster it loses energy, so the less penetrating it is.',
  ],
  worked: { head: 'Identify the emission', q: 'Count rates from a source (background already subtracted):',
    steps: [['No absorber', '300 counts/min'], ['Paper', '298 counts/min → no alpha'], ['5 mm aluminium', '0 counts/min → stopped by Al'], ['Answer', 'the source emits **beta** only']], size: 10.5 },
  workedH: 2.25,
  qc: 'A count rate falls sharply when paper is added, then stays the same when 5 mm of aluminium is added. Which emissions are present?',
  notes: 'QUICK CHECK ANSWER: Alpha (stopped by the paper) and gamma (passes through the aluminium). No beta, because the aluminium causes no further drop.\nWHERE THIS GOES: penetration properties are P5.2.1 (P5.2 deck). This slide is a short bridge so students can link each emission to its properties; the P5.2 deck should recap it rather than re-teach it, then cover irradiation vs contamination, hazards and half-life, and medical uses. Not examined in this deck\'s recaps, full question or homework.',
}), 'Bridge to P5.2: penetration');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Nucleus', 'Tiny positive centre of an atom; contains protons and neutrons and almost all the mass.'],
  ['Proton', 'Particle in the nucleus with relative charge +1 and relative mass 1.'],
  ['Neutron', 'Particle in the nucleus with no charge and relative mass 1.'],
  ['Electron', 'Negative particle (−1) outside the nucleus; very small mass.'],
  ['Atomic number (Z)', 'Number of protons in the nucleus; fixes the element and the charge.'],
  ['Mass number (A)', 'Number of protons + neutrons in the nucleus.'],
  ['Isotopes', 'Atoms of the same element with different numbers of neutrons.'],
  ['Unstable nucleus', 'A nucleus that can decay by giving out radiation.'],
  ['Radioactive decay', 'Random change of an unstable nucleus, emitting α, β, γ or neutrons.'],
  ['Random', 'Cannot predict which nucleus will decay or when.'],
  ['Alpha particle', '2 protons + 2 neutrons (helium nucleus): A falls by 4, Z by 2.'],
  ['Beta particle', 'Fast electron from the nucleus: Z rises by 1, A unchanged.'],
  ['Gamma ray', 'High-frequency EM radiation from the nucleus: A and Z unchanged.'],
  ['Activity', 'Number of decays per second, in becquerels (Bq).'],
  ['Half-life', 'Time for the number of undecayed nuclei, or the activity, to halve.'],
  ['Net decline (HT)', 'Fall after n half-lives: ratio remaining : original = 1 : 2ⁿ.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. "Net decline" is Higher tier (P5.1.9).' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion(`Radon-222 is a radioactive gas found in some homes. Its nucleus is written ${N(222, 86, 'Rn')}. It decays by emitting an alpha particle to form polonium (Po).`, [
  { l: 'a', q: 'State the number of **protons** and the number of **neutrons** in a radon-222 nucleus.', marks: 2, ms: 'protons 86 (1); neutrons 222 − 86 = 136 (1).' },
  { l: 'b', q: `Radon-220 (${N(220, 86, 'Rn')}) is another isotope of radon. Explain why radon-220 and radon-222 are isotopes of the same element.`, marks: 2, ms: 'Same number of protons / same atomic number 86 (1); different numbers of neutrons (134 and 136) / different mass numbers (1).' },
  { l: 'c', q: `Complete the equation for the decay by giving the **mass number** and **atomic number** of the polonium nucleus:   ${N(222, 86, 'Rn')} → ${N('A', 'Z', 'Po')} + ${N(4, 2, 'He')}`, marks: 2, ms: 'A = 218 (1); Z = 84 (1).' },
  { l: 'd', q: 'The activity of a sample of radon-222 falls from **1600 Bq** to **200 Bq** in **11.4 days**. Calculate the half-life of radon-222.', marks: 3, ms: '1600 → 800 → 400 → 200 (1); = 3 half-lives (1); 11.4 ÷ 3 = 3.8 days (1).', h: 1.15 },
  { l: 'e', q: 'Scientists cannot predict when a particular radon nucleus will decay, but they can give a value for its half-life. Explain why.', marks: 2, ms: 'Decay is random (for each nucleus) (1); with very large numbers of nuclei the overall pattern/average rate is predictable, so half-life is constant (1).', h: 1.15 },
  { l: 'f', q: 'Calculate the ratio of the activity after **19 days** to the starting activity. Use your answer to (d).', marks: 2, ht: true, ms: '19 ÷ 3.8 = 5 half-lives (1); (½)⁵ → ratio 1 : 32 (1). ECF from (d).', h: 0.9 },
], 13, { subtitle: `Specification ${sp('P5.1.3')}–${sp('P5.1.9')} • answer every part • 13 marks`, ht: true }), 'Full question');
calc('FQ Rn-222 neutrons', 222 - 86, 136); calc('FQ Rn-220 neutrons', 220 - 86, 134);

// ======================= HOMEWORK =======================
const HW = [
  { n: '1', q: 'State the typical radius of an atom. Give your answer in standard form.', marks: 1, ms: '1 × 10⁻¹⁰ m (1). Accept 10⁻¹⁰ m.' },
  { n: '2', q: `Tritium (${N(3, 1, 'H')}) decays by beta emission to helium (He). Write a balanced equation for this decay.`, marks: 2, ms: '³₁H → ³₂He + ⁰₋₁e: helium 3 and 2 (1); beta particle ⁰₋₁e (1).' },
  { n: '3', q: 'Explain why a nucleus that emits a **neutron** is still the same element.', marks: 2, ms: 'Number of protons / atomic number does not change (1); only the mass number falls by 1 – it becomes a different isotope (1).' },
  { n: '4', q: 'A source has an activity of **960 Bq** and a half-life of **5 minutes**. Calculate its activity after **20 minutes**.', marks: 2, ms: '20 ÷ 5 = 4 half-lives (1); 960 → 480 → 240 → 120 → 60 Bq (1).' },
  { n: '5', q: 'A sample decays for **3 half-lives**. Calculate the ratio of decayed nuclei to undecayed nuclei.', marks: 2, ht: true, ms: '1/8 remains, 7/8 decayed (1); ratio decayed : undecayed = 7 : 1 (1).' },
  { n: '6', q: `Polonium-210 (${N(210, 84, 'Po')}) emits an alpha particle and becomes lead (Pb). Write the balanced equation.`, marks: 2, ms: '²¹⁰₈₄Po → ²⁰⁶₈₂Pb + ⁴₂He: lead 206 and 82 (1); alpha ⁴₂He (1).' },
  { n: '7', q: 'A teacher uses 100 dice to model radioactive decay. Describe how the model works and how it can be used to find a "half-life". Explain how the model is like real radioactive decay and how it is different.', marks: 6, levels: true, h: 2.3, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Each die represents an unstable nucleus; rolling a six (or chosen number) represents decay.',
    'Throw all dice; remove the sixes; count and record the number left; repeat for many throws.',
    'Each throw represents a fixed interval of time.',
    'Plot number of dice left against number of throws; draw a smooth curve.',
    'Half-life = number of throws for the number left to halve (e.g. 100 → 50); check with 50 → 25; about 3.8 throws.',
    'Like real decay: random – cannot predict which die/when; each die has the same fixed probability each throw; the number left halves in a constant "time".',
    'Like real decay: large numbers give a predictable pattern / decay curve of the same shape.',
    'Different: far fewer dice than nuclei, so more scatter; decay happens continuously, not in steps; probability for real nuclei depends on the isotope; no radiation is emitted.',
  ], {
    l3: 'Describes how the model works AND how to find the half-life from a graph AND explains at least one similarity and one difference.',
    l2: 'Describes how the model works AND EITHER how to find the half-life OR gives a similarity or difference.',
    l1: 'Gives a simple description of the model OR states a similarity or difference.',
  });
}
D.homework('Foundation: answer Q1–Q4, Q6 and Q7 (15 marks). Higher: answer all questions.', HW, 17, { ht: true });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 8);
assert.strictEqual(R4.total, 8); assert.strictEqual(R5.total, 8); assert.strictEqual(R6.total, 8);
assert.strictEqual(HW.filter(q => !q.ht).reduce((a, q) => a + q.marks, 0), 15, 'Foundation homework total');
assert(SLIDES.find(t => t.startsWith(BRIDGE + '. Bridge')), 'bridge slide must be slide ' + BRIDGE);
assert(SLIDES.find(t => /^23\. .*HT/.test(t)) && SLIDES.find(t => t.startsWith('24. Recap 6')), 'HT slides 23–24');
const out = path.join(__dirname, 'OCR21C_P5.1_Radioactivity_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); console.log('nuclear equations asserted: ' + EQN.length); });
