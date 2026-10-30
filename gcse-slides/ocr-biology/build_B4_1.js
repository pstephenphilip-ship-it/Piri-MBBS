// build_B4_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B4 Using food and controlling growth, B4.1 What happens during cellular respiration? (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B4_1.js
// Structure copied from ../ocr-physics/build_P6_1.js. ocr_bio_template.js is NOT edited by this deck: deck-only helpers
// are in the DECK-SPECIFIC block.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B4', chapterTitle: 'Using food and controlling growth', code: 'B4.1', title: 'What happens during cellular respiration?',
  part: 1, parts: 3, specRange: 'B4.1.1–B4.1.5',
  subtitle: 'Energy from glucose: aerobic, anaerobic and fermentation',
  keywords: ['Respiration', 'ATP', 'Exothermic', 'Mitochondria', 'Aerobic', 'Anaerobic', 'Fermentation'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, px, py, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CHEMICAL EQUATIONS: atom balance asserted =======================
function atoms(side) {
  const n = {};
  side.forEach(([f, k]) => { for (const m of f.matchAll(/([A-Z][a-z]?)(\d*)/g)) n[m[1]] = (n[m[1]] || 0) + k * (m[2] ? +m[2] : 1); });
  return n;
}
function balanced(name, lhs, rhs) {
  const a = atoms(lhs), b = atoms(rhs);
  assert.deepStrictEqual(a, b, `${name} is not balanced: ${JSON.stringify(a)} vs ${JSON.stringify(b)}`);
  Object.keys(a).forEach(el => calc(`${name}: ${el} atoms each side`, a[el], b[el]));
  return a;
}
const AER = balanced('aerobic', [['C6H12O6', 1], ['O2', 6]], [['CO2', 6], ['H2O', 6]]);
calc('aerobic C', AER.C, 6); calc('aerobic H', AER.H, 12); calc('aerobic O', AER.O, 18);
balanced('lactic', [['C6H12O6', 1]], [['C3H6O3', 2]]);
balanced('ethanol', [['C6H12O6', 1]], [['C2H5OH', 2], ['CO2', 2]]);
const aerL = atoms([['C6H12O6', 1], ['O2', 6]]), aerR = atoms([['CO2', 6], ['H2O', 6]]);

// ======================= CALCULATIONS (asserted) =======================
// starter
calc('starter rate 18 / 6', 18 / 6, 3);
// slide 5: pea flasks
const peaDays = [0, 1, 2, 3], peaA = [20.0, 21.5, 23.0, 24.5], peaB = [20.0, 20.0, 20.1, 20.0];
const peaRise = calc('pea A rise 24.5 − 20.0', peaA[3] - peaA[0], 4.5, 1e-9);
calc('pea B rise', peaB[3] - peaB[0], 0, 1e-9);
calc('pea A mean rise per day', peaRise / 3, 1.5, 1e-9);
// slide 8 quick check: 2 glucose
calc('QC 2 glucose → O2', 2 * 6, 12); calc('QC 2 glucose → CO2', 2 * 6, 12);
// slide 11: oxygen debt (linear recovery from 2.5 to 0.3 dm³/min over 8–14 min)
const o2Rest = 0.3, o2Ex = 2.5, tStart = 2, tRamp = 4, tStop = 8, tRec = 14;
const o2Pts = [[0, o2Rest], [tStart, o2Rest], [tRamp, o2Ex], [tStop, o2Ex], [tRec, o2Rest], [16, o2Rest]];
const o2Debt = calc('oxygen debt = ½ × 6 × 2.2', 0.5 * (tRec - tStop) * (o2Ex - o2Rest), 6.6, 1e-9);
calc('QC recovery time', tRec - tStop, 6);
// slide 13: dough
const doughRate = calc('dough rate (600 − 250) / 60', (600 - 250) / 60, 5.833333333333333, 1e-9);
calc('dough rate 2 s.f.', sf(doughRate, 2), 5.8, 1e-12);
calc('QC dough 3 s.f. volume increase %', Math.round((600 - 250) / 250 * 100), 140);
// slide 15: ATP
const atpAer = 32, atpAn = 2;
calc('ATP ratio 32 / 2', atpAer / atpAn, 16);
calc('glucose for 64 ATP anaerobic', 64 / atpAn, 32); calc('glucose for 64 ATP aerobic', 64 / atpAer, 2);
// PAG B4 (slides 16–17)
const tt = [0, 2, 4, 6, 8, 10];
const run1 = {
  glucose: [0, 2.4, 4.8, 7.3, 9.7, 12.0], sucrose: [0, 1.9, 3.9, 5.9, 7.9, 9.9],
  starch: [0, 0.1, 0.3, 0.4, 0.6, 0.7], water: [0, 0.0, 0.1, 0.1, 0.2, 0.2],
};
const reps = { glucose: [12.0, 11.6, 12.4], sucrose: [9.9, 10.3, 6.1], starch: [0.7, 0.5, 0.6], water: [0.2, 0.1, 0.0] };
const anomaly = { sucrose: 2 };
Object.keys(reps).forEach(k => assert.strictEqual(reps[k][0], run1[k][5], 'run 1 end matches graph: ' + k));
const mean = k => { const v = reps[k].filter((_, i) => anomaly[k] !== i); return v.reduce((a, b) => a + b, 0) / v.length; };
const M = {};
M.glucose = calc('mean glucose', mean('glucose'), 12.0, 1e-9);
M.sucrose = calc('mean sucrose (6.1 excluded)', mean('sucrose'), 10.1, 1e-9);
M.starch = calc('mean starch', mean('starch'), 0.6, 1e-9);
M.water = calc('mean water', mean('water'), 0.1, 1e-9);
const R = {};
Object.keys(M).forEach(k => { R[k] = M[k] / 10; });
calc('rate glucose', R.glucose, 1.2, 1e-9); calc('rate sucrose', R.sucrose, 1.01, 1e-9);
calc('rate starch', R.starch, 0.06, 1e-9); calc('rate water', R.water, 0.01, 1e-9);
calc('glucose rate per hour', R.glucose * 60, 72, 1e-9);
calc('QC sucrose mean with anomaly', sf((9.9 + 10.3 + 6.1) / 3, 3), 8.77, 1e-9);
// linearity of the glucose run
run1.glucose.forEach((v, i) => assert(Math.abs(v - 1.2 * tt[i]) <= 0.1 + 1e-9, 'glucose near 1.2 cm³/min'));
// recaps
calc('R2 3 glucose → CO2', 3 * 6, 18);
calc('R4 15.0 / 6', 15.0 / 6, 2.5, 1e-9);
// full question
calc('FQ 18 / 5', 18 / 5, 3.6, 1e-9);
calc('FQ 32 / 2', 32 / 2, 16);
// homework
calc('HW 24 / 8', 24 / 8, 3);
calc('HW O atoms left 6 + 6 × 2', 6 + 6 * 2, 18); calc('HW O atoms right 6 × 2 + 6', 6 * 2 + 6, 18);
calc('HW stretch 3 × 32 / 2', 3 * atpAer / atpAn, 48);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_bio_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
// filled polygon from absolute points [[x,y],...]
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
// thermometer: top at (x,y), length len; liquid to fraction f
function thermometer(s, x, y, len, f = 0.45) {
  box(s, x - 0.045, y, 0.09, len, C.white, '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.04, lw: 0.75 });
  ball(s, x, y + len, 0.075, C.red, '8E2A33');
  box(s, x - 0.015, y + len - len * f, 0.03, len * f, C.red, null);
  for (let i = 1; i < 8; i++) line(s, x + 0.01, y + 0.1 + i * (len - 0.2) / 8, x + 0.045, y + 0.1 + i * (len - 0.2) / 8, '6B7385', 0.5);
}
// vacuum flask of peas: (x,y) top-left of the cotton-wool plug; returns inner box
function peaFlask(s, x, y, w, h, alive) {
  box(s, x, y + 0.25, w, h - 0.25, 'C9D1DA', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1.25 });
  const ix = x + 0.1, iy = y + 0.3, iw = w - 0.2, ih = h - 0.42;
  box(s, ix, iy, iw, ih, C.white, '9AA3B0', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 0.75 });
  const r = 0.07, nx = Math.floor((iw - 0.04) / (2 * r)), rows = 6;
  for (let j = 0; j < rows; j++) for (let i = 0; i < nx - (j % 2); i++) {
    ball(s, ix + 0.02 + r + i * 2 * r + (j % 2) * r, iy + ih - 0.03 - r - j * 1.75 * r, r * 0.95, alive ? '8DBF5A' : 'D2CC8C', alive ? '557A2E' : '9A9460');
  }
  box(s, x + 0.22, y, w - 0.44, 0.42, 'F7F6EF', 'B9B5A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 0.75 });
  return { ix, iy, iw, ih };
}
// yeast cell with a bud
function yeastCell(s, cx, cy, w, h, o = {}) {
  const bw = w * 0.34, bh = h * 0.34;
  s.addShape(SH.OVAL, { x: cx + w * 0.3, y: cy - h * 0.62, w: bw, h: bh, fill: { color: 'F6E7BF' }, line: { color: 'A07A2A', width: 1.25 } });
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, fill: { color: 'F6E7BF' }, line: { color: 'A07A2A', width: 1.75 } });
  s.addShape(SH.OVAL, { x: cx + w * 0.02, y: cy - h * 0.2, w: w * 0.32, h: h * 0.42, fill: { color: C.vacuole }, line: { color: '7FA9C4', width: 0.75 } });
  s.addShape(SH.OVAL, { x: cx - w * 0.3, y: cy - h * 0.25, w: w * 0.24, h: w * 0.24, fill: { color: C.nucleus }, line: { color: C.nucleusEdge, width: 1 } });
  if (o.mito !== false) {
    D.mitochondrion(s, cx - w * 0.12, cy + h * 0.3, w * 0.16, w * 0.08, { rot: 15 });
    D.mitochondrion(s, cx + w * 0.3, cy + h * 0.15, w * 0.16, w * 0.08, { rot: -60 });
  }
}
// gas bubble
const bubble = (s, x, y, r = 0.04) => ball(s, x, y, r, C.white, '7F8C99', 0.75);
// horizontal bar to scale
function hbar(s, x, y, maxW, v, vmax, col, txt, val, lw = 1.38) {
  const w = maxW * v / vmax;
  box(s, x, y, w, 0.34, col, null);
  label(s, x - lw - 0.07, y, lw, txt, { h: 0.34, size: 10.5, bold: true, align: 'right' });
  label(s, x + w + 0.06, y, 1.6, val, { h: 0.34, size: 10.5, align: 'left', color: C.ink, bold: true });
}
// equation strip: white rounded box with rich text
function eqStrip(s, x, y, w, h, runs, o = {}) {
  box(s, x, y, w, h, C.white, o.border || C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1 });
  s.addText(runs, { x: x + 0.12, y, w: w - 0.24, h, fontFace: 'Calibri', fontSize: o.size || 12, color: C.text, valign: 'middle', align: o.align || 'center', margin: 0 });
}
const R_ = (t, o = {}) => T.rich(t, Object.assign({ color: C.text }, o));
const brk = arr => { arr[arr.length - 1].options.breakLine = true; return arr; };
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const GLU = 'C₆H₁₂O₆';

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Cellular respiration',
  footer: 'OCR J260 Combined Science B • B4.1 What happens during cellular respiration? • teacher deck • mark schemes and answers in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • PAG B4: effect of different substrates on respiration in yeast` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found • stretch marked' },
    { icon: 'O₂', text: 'Exothermic • ATP • mitochondria • aerobic and anaerobic • lactic acid • fermentation' },
  ],
  notes: 'B4.1 What happens during cellular respiration? is Part 1 of 3 in J260 Chapter B4 (B4.1, B4.2, B4.3). B4.4 How is plant growth controlled? is in the separate-science Biology B (J257) only.\nThe B4.1.1–B4.1.5 statements come from search extracts of the OCR Biology B respiration transition guide and the J260 specification (ocr.org.uk could not be fetched directly): see SPEC_B4_1.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B4.1.4', text: 'Describe cellular respiration as an **exothermic** process.' },
  { code: 'B4.1.2', text: 'Explain why cellular respiration occurs **continuously** in all living cells (a constant supply of **ATP**).' },
  { code: 'B4.1.1', text: 'Describe **aerobic** respiration: its inputs and outputs, word and symbol equations.' },
  { code: 'B4.1.3', text: 'Explain how **mitochondria** in plant and animal cells are related to cellular respiration.' },
  { code: 'B4.1.1', text: 'Describe **anaerobic** respiration in animals, and in plants, yeast and bacteria, and when it occurs.' },
  { code: 'B4.1.1', text: '**Compare** aerobic and anaerobic respiration: conditions, inputs, outputs and **yields of ATP**.' },
  { code: 'B4.1.5', text: 'Describe practical investigations into the effect of different **substrates** on the rate of respiration in **yeast** (PAG B4).' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'No B4.1 statement was found to be Higher tier only (bold) in J260 (UNVERIFIED: Oak National Academy teaches the same B4.1 lessons in its Foundation and Higher OCR combined science programmes). All objectives are for both tiers. Exact ATP numbers and symbol equations for anaerobic respiration are marked as stretch.\nNumbering B4.1.1–B4.1.5 is from a search extract of the OCR Biology B (J257) respiration transition guide; J260 uses the same B4.1 statements (UNVERIFIED for numbering). Check SPEC_B4_1.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B4 Using food and controlling growth • B4.1 is Part 1 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B4.1.4', 'Respiration is exothermic: energy is transferred to the surroundings', 'Both tiers', C.blue],
    ['B4.1.2', 'Respiration is continuous: cells need a constant supply of ATP', 'Both tiers', C.blue],
    ['B4.1.1, B4.1.3', 'Aerobic respiration and the mitochondria', 'Both tiers', C.blue],
    ['B4.1.1', 'Anaerobic respiration: lactic acid; ethanol and CO₂; fermentation', 'Both tiers', C.blue],
    ['B4.1.1', 'Comparing aerobic and anaerobic respiration; ATP yields', 'Both tiers', C.blue],
    ['PAG B4', 'Practical: different substrates and the rate of respiration in yeast', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B4.1\nWhat happens during cellular respiration?', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B3.1 photosynthesis and enzymes • KS3 cells, breathing • chemistry: balancing equations', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.05, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B4 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**B4.1 What happens during cellular respiration?** (this deck)',
      '**B4.2 How do we know about mitochondria and other cell structures?** Microscopes and the evidence for organelles.',
      '**B4.3 How do organisms grow and develop?** The cell cycle, mitosis, stem cells and differentiation.',
      'B4.4 How is plant growth controlled? (plant hormones) is **Biology B J257 only**.',
    ], { size: 11.5, color: 'E3F2F0' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.85, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.55, 5.53, 2.3, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Every slide is for both tiers: no B4.1 statement was found to be Higher only.',
      'Learn the **word equations**; the aerobic **symbol equation** is useful for both tiers.',
      'One practical: **PAG B4**, yeast respiring different sugars.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.65, w: 5.15, h: 2.1, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B4 has three sub-topics in Combined Science: B4.1, B4.2 and B4.3. B4.4 (plant hormones) is labelled "separate science only" in the J257 extract.\nWhere things go: how electron microscopes revealed mitochondria is B4.2; the cell cycle, mitosis and stem cells are B4.3. This deck does not teach them.\nPAG link: the J260 extract says "describe practical investigations into the effect of different substrates on the rate of respiration in yeast (PAG B4)".');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B3.1 • photosynthesis', q: 'Write the **word equation** for photosynthesis.' },
  { from: 'B3.1 • photosynthesis', q: 'In which **organelle** does photosynthesis happen? Does photosynthesis take in or give out energy?' },
  { from: 'B3.1 • enzymes', q: 'What is the **active site** of an enzyme? Why does each enzyme only work on one substrate?' },
  { from: 'B3.1 • enzymes', q: 'What happens to an enzyme when the temperature goes well **above its optimum**?' },
  { from: 'KS3 • breathing and cells', q: 'Name **two** substances that the blood carries to a working muscle cell.' },
  { from: 'Maths • rates', q: 'A plant gives off **18 cm³** of gas in **6 minutes**. Calculate the mean rate in cm³ per minute.' },
], { subtitle: 'Recall from B3.1, KS3 and maths • 6 minutes • no notes', notes: 'ANSWERS\n1. carbon dioxide + water → glucose + oxygen (light energy, chlorophyll).\n2. Chloroplast. It takes in energy (endothermic): contrast with respiration, which gives out energy (exothermic).\n3. The part of the enzyme where the substrate binds / fits. Only a substrate with a complementary shape fits the active site (lock and key).\n4. It denatures: the shape of the active site changes, the substrate no longer fits, the rate falls (to zero).\n5. Glucose and oxygen (also accept: amino acids, water).\n6. 18 ÷ 6 = 3 cm³ per minute.' }), 'Retrieval starter');

// ======================= 5 EXOTHERMIC =======================
reg(D.contentSlide({
  title: 'Respiration is an exothermic process',
  subtitle: `Specification ${sp('B4.1.4')} • respiration transfers energy from glucose, and some is released to the surroundings`,
  tag: 'B4.1.4', caption: 'germinating (living) peas and boiled (dead) peas in vacuum flasks, after 3 days',
  draw: (s, p) => {
    eqStrip(s, 0.75, 1.45, 5.5, 0.68, [
      ...brk(R_('**glucose + oxygen → carbon dioxide + water**', { fontSize: 12.5 })),
      ...R_('!!energy is transferred OUT: the surroundings warm up!!', { fontSize: 11 }),
    ]);
    [[1.0, true, 'A', 'germinating peas (alive)', peaA[3]], [3.95, false, 'B', 'boiled peas + disinfectant (dead)', peaB[3]]].forEach(([x, alive, L, cap, T1]) => {
      const fw = 1.55, fy = 2.45;
      peaFlask(s, x, fy, fw, 2.0, alive);
      thermometer(s, x + fw / 2 + 0.3, 2.3, 1.95, alive ? 0.62 : 0.4);
      label(s, x + fw / 2 + 0.42, 2.25, 1.05, `${T1.toFixed(1)} °C`, { size: 12, bold: true, color: alive ? C.red : C.ink, align: 'left' });
      label(s, x - 0.25, 4.47, fw + 0.5, `**${L}**  ${cap}`, { h: 0.4, size: 10.5, valign: 'top' });
    });
    label(s, 2.5, 2.43, 0.95, 'cotton wool', { size: 10, italic: true, align: 'center', color: C.grey });
    const rows = [[HDR('Day'), ...peaDays.map(d => HDR(String(d)))],
      ['A  temperature / °C', ...peaA.map(v => v.toFixed(1))],
      ['B  temperature / °C', ...peaB.map(v => v.toFixed(1))]]
      .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 0.75, y: 4.95, w: 5.5, colW: [1.9, 0.9, 0.9, 0.9, 0.9], rowH: 0.27, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Exothermic means energy out',
  lines: [
    '**Cellular respiration** is a chemical process in **every living cell**. It transfers energy from **glucose** to make **ATP**.',
    'It is **exothermic**: some energy is transferred to the **surroundings** by heating.',
    'Photosynthesis (B3.1) is the opposite: it is **endothermic** and takes in energy from light.',
    'Mammals and birds use this energy to keep their bodies warm.',
  ],
  worked: { head: 'Worked example: reading the results', q: 'Flask A rose from 20.0 °C to 24.5 °C in 3 days. Flask B stayed at 20.0 °C.',
    steps: [['Rise in A', `24.5 − 20.0 = ${peaRise} °C`], ['Rise in B', '0 °C: dead peas do not respire'], ['Control', 'B shows the rise is caused by living cells'], ['Answer', 'respiring peas release energy: it is exothermic']] },
  qc: 'Why were the boiled peas washed in disinfectant? What would happen to flask B if microorganisms grew on the peas?',
  notes: `QUICK CHECK ANSWER: To kill microorganisms (bacteria, fungi) on the peas. If microorganisms grew they would respire too, releasing energy, so flask B would warm up and it would no longer be a fair control.\nVacuum flasks reduce energy transfer to the surroundings so the small temperature rise can be measured. Data are illustrative; mean rise in A = ${peaRise / 3} °C per day (node).\nB4.1.4 wording: "describe cellular respiration as an exothermic process".`,
}), 'B4.1.4 Exothermic');

// ======================= 6 CONTINUOUS / ATP =======================
reg(D.contentSlide({
  title: 'Why respiration never stops',
  subtitle: `Specification ${sp('B4.1.2')} • every living cell needs a constant supply of ATP`,
  tag: 'B4.1.2', caption: 'ATP carries energy from respiration to the processes that need it',
  draw: (s, p) => {
    // ATP cycle
    const cx = 1.95;
    ball(s, cx, 2.1, 0.48, C.blue, C.ink, 1);
    label(s, cx - 0.48, 1.86, 0.96, 'ATP', { h: 0.48, size: 18, bold: true, color: C.white });
    box(s, cx - 0.85, 4.25, 1.7, 0.6, C.white, C.ink, { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.25 });
    label(s, cx - 0.85, 4.25, 1.7, 'ADP + phosphate', { h: 0.6, size: 12, bold: true, color: C.ink });
    arrow(s, cx - 0.6, 4.2, cx - 0.6, 2.62, C.red, 3);
    label(s, 0.55, 2.85, 0.95, '**respiration**\nenergy from glucose', { h: 1.1, size: 10.5, color: C.red, align: 'left', valign: 'top' });
    arrow(s, cx + 0.6, 2.62, cx + 0.6, 4.2, C.green, 3);
    label(s, cx + 0.68, 2.85, 1.0, '**energy released** for life processes', { h: 1.1, size: 10.5, color: C.green, align: 'left', valign: 'top' });
    // uses
    const uses = ['muscle contraction (movement)', 'building large molecules, e.g. proteins', 'active transport into cells', 'cell division and growth', 'nerve impulses (animals)', 'keeping warm (mammals, birds)'];
    label(s, 3.75, 1.45, 2.55, 'ATP is used for…', { size: 11.5, bold: true, color: C.green, align: 'left' });
    uses.forEach((u, i) => {
      const y = 1.82 + i * 0.5;
      box(s, 3.75, y, 2.55, 0.42, C.white, C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1 });
      label(s, 3.85, y, 2.4, u, { h: 0.42, size: 10.5, align: 'left' });
    });
    line(s, cx + 0.62, 3.45, 3.5, 3.45, C.green, 1.5, { dash: 'dash' });
    arrow(s, 3.5, 3.45, 3.7, 3.45, C.green, 1.5);
    box(s, 0.75, 5.1, 5.55, 0.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    label(s, 0.85, 5.1, 5.35, 'Cells store only a **tiny amount of ATP**, so they must keep making it: respiration never stops, day or night.', { h: 0.65, size: 11 });
  },
  head: 'ATP: the energy carrier',
  lines: [
    'Respiration transfers energy from glucose into **ATP** molecules.',
    'ATP is broken down to **ADP + phosphate**, releasing energy where it is needed. Respiration remakes the ATP.',
    'Cells need ATP **all the time** and hold very little of it, so respiration happens **continuously in all living cells**, including plant cells in the dark.',
    'If respiration stops (e.g. the poison cyanide), cells soon die.',
  ],
  size: 11,
  worked: { head: 'Worked example: explain', q: 'Explain why a plant leaf cell respires during the day and at night.',
    steps: [['Need', 'the cell needs energy all the time (active transport, growth, making proteins)'], ['ATP', 'ATP cannot be stored in large amounts'], ['So', 'ATP must be made continuously by respiration'], ['Answer', 'respiration goes on day and night; photosynthesis only in light']], size: 10.5 },
  qc: 'A student says "plants photosynthesise, so they do not need to respire". Explain why the student is wrong.',
  notes: 'QUICK CHECK ANSWER: All living cells, including plant cells, need a continuous supply of ATP for life processes (active transport, growth, making proteins). Photosynthesis makes glucose but does not supply ATP to the rest of the cell; respiration transfers energy from glucose to ATP, all the time, day and night (and in roots, which cannot photosynthesise).\nB4.1.2 wording: "explain why cellular respiration occurs continuously in all living cells". The ATP ⇄ ADP + phosphate cycle is included to explain it; the J260 B4.1 summary (search extract) refers to "cellular energy stores, in particular molecules of ATP".',
}), 'B4.1.2 Continuous respiration, ATP');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B4.1.4')}, ${sp('B4.1.2')} • exothermic and continuous`, [
  { q: 'Explain why cellular respiration is described as an **exothermic** process.', marks: 1, ms: 'It transfers / releases energy to the surroundings (by heating) (1).' },
  { q: 'In the peas experiment, flask B contained **boiled** peas washed in **disinfectant**. Give the reason for each.', marks: 2, ms: 'Boiled: to kill the peas so they cannot respire / to act as a control (1); disinfectant: to kill microorganisms, which would also respire and release energy (1).' },
  { q: 'Explain why respiration must happen **continuously** in all living cells.', marks: 2, ms: 'Cells need a constant supply of energy / ATP for life processes (1); ATP cannot be stored in large amounts, so it must be made all the time (1).' },
  { q: 'Give **two** uses of the energy transferred by respiration in a human.', marks: 2, ms: 'Any two (1 each): muscle contraction / movement; keeping warm / maintaining body temperature; building large molecules e.g. proteins; active transport; nerve impulses; cell division / growth.' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 AEROBIC RESPIRATION =======================
reg(D.contentSlide({
  title: 'Aerobic respiration',
  subtitle: `Specification ${sp('B4.1.1')} • respiration using oxygen: glucose is broken down completely`,
  tag: 'B4.1.1', caption: 'word and symbol equations; atoms counted on each side',
  draw: (s, p) => {
    label(s, 0.75, 1.42, 5.5, 'Word equation', { size: 11, bold: true, color: C.blue, align: 'left' });
    eqStrip(s, 0.75, 1.72, 5.5, 0.55, R_('**glucose + oxygen → carbon dioxide + water**', { fontSize: 14 }));
    label(s, 0.75, 2.38, 5.5, 'Symbol equation (balanced)', { size: 11, bold: true, color: C.blue, align: 'left' });
    eqStrip(s, 0.75, 2.68, 5.5, 0.6, R_(`${GLU}  +  6O₂  →  6CO₂  +  6H₂O`, { fontSize: 18, bold: true }), { border: C.blue, lw: 1.5 });
    const rows = [[HDR('Atom'), HDR('Left (reactants)'), HDR('Right (products)'), HDR('Balanced?')],
      ['C carbon', `${aerL.C}`, `6 × 1 = ${aerR.C}`, '✓'],
      ['H hydrogen', `${aerL.H}`, `6 × 2 = ${aerR.H}`, '✓'],
      ['O oxygen', `6 + 6 × 2 = ${aerL.O}`, `6 × 2 + 6 = ${aerR.O}`, '✓']]
      .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0 || j === 3, color: j === 3 ? C.green : C.text, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 0.75, y: 3.42, w: 5.5, colW: [1.3, 1.6, 1.6, 1.0], rowH: 0.3, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    box(s, 0.75, 4.75, 2.65, 1.05, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    s.addText([...brk(R_('**Inputs**', { color: C.blue })), ...brk(R_('glucose: from digested food, or photosynthesis', { fontSize: 10.5 })), ...R_('oxygen: from the air, by diffusion', { fontSize: 10.5 })], { x: 0.85, y: 4.8, w: 2.45, h: 0.95, fontFace: 'Calibri', fontSize: 11, valign: 'top', margin: 0 });
    box(s, 3.6, 4.75, 2.65, 1.05, C.white, C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    s.addText([...brk(R_('**Outputs**', { color: C.red })), ...brk(R_('carbon dioxide (waste) and water', { fontSize: 10.5 })), ...R_('energy transferred to **ATP** (a lot)', { fontSize: 10.5 })], { x: 3.7, y: 4.8, w: 2.45, h: 0.95, fontFace: 'Calibri', fontSize: 11, valign: 'top', margin: 0 });
  },
  head: 'Respiring with oxygen',
  lines: [
    '**Aerobic respiration** needs **oxygen**. It happens when cells have a good supply of oxygen.',
    'Glucose is broken down **completely** and combined with oxygen to make **carbon dioxide** and **water**.',
    'It transfers **a lot of energy** to ATP from each glucose molecule.',
    'It happens in plants, animals, fungi and many microorganisms. In plant and animal cells most of it happens in the **mitochondria**.',
  ],
  size: 11,
  worked: { head: 'Worked example: check the balance', q: `Show that ${GLU} + 6O₂ → 6CO₂ + 6H₂O is balanced.`,
    steps: [['Carbon', `6 on the left; 6 × 1 = 6 on the right`], ['Hydrogen', `12 on the left; 6 × 2 = 12 on the right`], ['Oxygen', `6 + 12 = 18 on the left; 12 + 6 = 18 on the right`], ['Answer', 'the same number of each atom on both sides: balanced']], size: 10.5 },
  qc: 'How many molecules of oxygen are needed to respire **2** molecules of glucose aerobically? How many molecules of CO₂ are made?',
  notes: 'QUICK CHECK ANSWER: 2 × 6 = 12 molecules of oxygen; 12 molecules of carbon dioxide (and 12 of water).\nAtom balance is asserted in node (C 6 = 6, H 12 = 12, O 18 = 18). The J260 statement (B4.1.1) asks for inputs and outputs; the symbol equation is taught for both tiers (UNVERIFIED whether J260 requires the symbol equation: it is widely examined in other boards).\nEnergy is NOT a product: write "energy transferred" separately from the equation, never "+ energy" as a substance.',
}), 'B4.1.1 Aerobic respiration');

// ======================= 9 MITOCHONDRIA =======================
reg(D.contentSlide({
  title: 'Mitochondria: where aerobic respiration happens',
  subtitle: `Specification ${sp('B4.1.3')} • mitochondria are found in eukaryotic cells: plants, animals and fungi`,
  tag: 'B4.1.3', caption: 'cells not to scale; a mitochondrion is about 1–2 µm long',
  draw: (s, p) => {
    label(s, 0.75, 1.42, 2.5, 'animal cell (e.g. muscle)', { size: 10.5, bold: true });
    const A = D.animalCell(s, 0.8, 1.75, 2.45, 1.6, { mito: [[0.7, 0.28, 30], [0.8, 0.6, -20], [0.52, 0.82, 10], [0.24, 0.24, -35], [0.2, 0.68, 40]] });
    label(s, 3.75, 1.42, 2.5, 'plant cell (e.g. leaf)', { size: 10.5, bold: true });
    const P = D.plantCell(s, 3.8, 1.72, 2.45, 1.68);
    // labels
    label(s, 2.85, 3.48, 1.3, 'mitochondria', { size: 10.5, bold: true, color: C.mitoEdge });
    line(s, 3.0, 3.52, A.mito[2][0] + 0.12, A.mito[2][1] + 0.03, C.mitoEdge, 1);
    line(s, 4.05, 3.52, P.mito[0][0] + 0.03, P.mito[0][1] + 0.1, C.mitoEdge, 1);
    // zoom lines + big mitochondrion
    const mx = 3.5, my = 4.68, mw = 3.7, mh = 1.3;
    line(s, A.mito[1][0], A.mito[1][1], mx - mw / 2 + 0.3, my - 0.4, '9AA3B0', 1, { dash: 'dash' });
    line(s, A.mito[1][0], A.mito[1][1], mx + mw / 2 - 0.3, my - 0.4, '9AA3B0', 1, { dash: 'dash' });
    D.mitochondrion(s, mx, my, mw, mh, { detail: true, folds: 7, lw: 2 });
    label(s, 0.55, 4.0, 1.4, 'outer membrane', { size: 10.5, bold: true, align: 'right' });
    line(s, 1.97, 4.14, 2.15, 4.27, C.ink, 1);
    label(s, 5.0, 3.88, 1.5, 'folded inner membrane', { h: 0.4, size: 10.5, bold: true, align: 'left' });
    line(s, 4.98, 4.08, 4.83, 4.45, C.ink, 1);
    label(s, 1.6, 5.42, 3.8, 'matrix: contains the **enzymes** for aerobic respiration', { size: 10.5, bold: true });
    line(s, 3.25, 5.42, 3.3, 5.05, C.ink, 1);
  },
  head: 'Mitochondria and respiration',
  lines: [
    'Most of the reactions of **aerobic** respiration happen inside **mitochondria**. They contain the **enzymes** needed.',
    'The first stage, and all of **anaerobic** respiration, happens in the **cytoplasm**.',
    'Both **plant and animal** cells have mitochondria (plant cells have chloroplasts as well).',
    'Cells that need **a lot of ATP** have **many** mitochondria.',
    'Bacteria have no mitochondria: they respire in the cytoplasm.',
  ],
  size: 11,
  worked: { head: 'Worked example: explain', q: 'A muscle cell has many more mitochondria than a skin cell. Explain why.',
    steps: [['Job', 'muscle cells contract, which needs a lot of energy'], ['Link', 'more mitochondria → more aerobic respiration'], ['So', 'more ATP is made each second'], ['Answer', 'many mitochondria supply the ATP for contraction']], size: 10.5 },
  qc: 'Sperm cells and root hair cells both contain many mitochondria. Suggest what each cell uses the extra ATP for.',
  notes: 'QUICK CHECK ANSWER: Sperm cell: swimming (moving the tail) to reach the egg. Root hair cell: active transport of mineral ions from the soil into the root (against a concentration gradient).\nB4.1.3 wording: "explain how mitochondria in eukaryotic cells (plants and animals) are related to cellular respiration". The folded inner membrane gives a large surface area: mention for stretch. How we know about mitochondria (electron microscopy) is B4.2.',
}), 'B4.1.3 Mitochondria');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B4.1.1')}, ${sp('B4.1.3')} • aerobic respiration and mitochondria`, [
  { q: 'Write the **word equation** for aerobic respiration.', marks: 2, ms: 'glucose + oxygen (1) → carbon dioxide + water (1).' },
  { q: 'How many molecules of carbon dioxide are made when **3** molecules of glucose are respired aerobically?', marks: 1, ms: '3 × 6 = 18 (1).' },
  { q: 'Name the organelle where most aerobic respiration happens. Give **one** type of cell that has many of them.', marks: 2, ms: 'Mitochondria / mitochondrion (1); muscle cell / sperm cell / root hair cell / liver cell / any very active cell (1).' },
  { q: 'Explain why a **sperm cell** contains many mitochondria.', marks: 2, ms: 'It needs a lot of energy / ATP to swim / move its tail (1); mitochondria carry out aerobic respiration which makes the ATP (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 ANAEROBIC IN ANIMALS =======================
const GO = { x: 1.45, y: 1.5, w: 4.75, h: 3.3, xmin: 0, xmax: 16, ymin: 0, ymax: 3, xstep: 2, ystep: 0.5, minor: 2, xlabel: 'time / min', ylabel: 'oxygen uptake / dm³ per min', fmt: v => String(Math.round(v)), yfmt: v => v.toFixed(1) };
reg(D.contentSlide({
  title: 'Anaerobic respiration in animals',
  subtitle: `Specification ${sp('B4.1.1')} • without enough oxygen, muscle cells make lactic acid`,
  tag: 'B4.1.1', caption: 'oxygen taken in by a runner before, during and after 6 minutes of hard exercise',
  draw: (s, p) => {
    axes(s, GO);
    box(s, px(GO, tStart), GO.y, px(GO, tStop) - px(GO, tStart), GO.h, 'FBE3C2', null, { tr: 35 });
    poly(s, [[px(GO, tStop), py(GO, o2Rest)], [px(GO, tStop), py(GO, o2Ex)], [px(GO, tRec), py(GO, o2Rest)]], C.red, null, { tr: 55 });
    plotLine(s, GO, o2Pts, C.blue, 2.5);
    line(s, px(GO, 0), py(GO, 2.8), px(GO, tStop), py(GO, 2.8), C.red, 1.25, { dash: 'dash' });
    label(s, px(GO, 0) + 0.05, py(GO, 2.8) - 0.27, 3.0, 'oxygen the muscles really need', { size: 10, bold: true, color: C.red, align: 'left' });
    label(s, px(GO, tStart), py(GO, 1.15), px(GO, tStop) - px(GO, tStart), 'EXERCISE', { size: 11, bold: true, color: C.orange });
    label(s, px(GO, 8.1), py(GO, 1.25), 0.95, 'oxygen debt', { size: 10.5, bold: true, color: C.white, align: 'left' });
    label(s, px(GO, 8.1), py(GO, 1.25) + 0.25, 0.95, `≈ ${o2Debt.toFixed(1)} dm³`, { size: 10.5, bold: true, color: C.white, align: 'left' });
    label(s, px(GO, 0) + 0.02, py(GO, o2Rest) - 0.3, 0.8, 'rest', { size: 10, italic: true, color: C.grey, align: 'left' });
    eqStrip(s, 0.75, 5.42, 5.5, 0.42, R_('**glucose → lactic acid**   (a little energy transferred to ATP)', { fontSize: 12 }), { border: C.red });
  },
  head: 'When oxygen runs short',
  lines: [
    'During **vigorous exercise** the blood cannot supply oxygen to muscles fast enough.',
    'Muscle cells also respire **anaerobically** (without oxygen): **glucose → lactic acid**.',
    'This transfers **much less** energy to ATP, because glucose is only **partly** broken down. No carbon dioxide is made.',
    'Lactic acid builds up and causes **muscle fatigue**. After exercise, extra oxygen (the **oxygen debt**) is needed to break it down.',
  ],
  size: 11,
  worked: { head: 'Stretch: oxygen debt from the graph', q: 'After exercise the uptake falls in a straight line from 2.5 to 0.3 dm³/min over 6 minutes.',
    steps: [['Shape', 'shaded area is a triangle'], ['Area', 'debt = ½ × base × height'], ['Substitute', '½ × 6 min × (2.5 − 0.3) dm³/min'], ['Answer', `oxygen debt = ${o2Debt.toFixed(1)} dm³`]], size: 10.5 },
  qc: 'Use the graph: for how many minutes after the exercise did the runner keep breathing in extra oxygen? Why?',
  notes: `QUICK CHECK ANSWER: ${tRec - tStop} minutes (8 to 14 min). The extra oxygen is used to break down (oxidise) the lactic acid that built up during anaerobic respiration: repaying the oxygen debt. Breathing rate and heart rate stay high.\nGraph data are illustrative and to scale; the area is calculated in node. The J260 B4.1 underlying knowledge (search extract) gives "human cells during vigorous exercise" as an example of anaerobic conditions. "Oxygen debt" is taught here as context (no separate J260 statement found).\nStretch symbol equation: C₆H₁₂O₆ → 2C₃H₆O₃ (balanced, asserted in node).`,
}), 'B4.1.1 Anaerobic: animals');

// ======================= 12 ANAEROBIC IN PLANTS, YEAST, BACTERIA =======================
reg(D.contentSlide({
  title: 'Anaerobic respiration in plants, yeast and bacteria',
  subtitle: `Specification ${sp('B4.1.1')} • plant cells and yeast make ethanol and carbon dioxide`,
  tag: 'B4.1.1', caption: 'roots in waterlogged soil (left) and a budding yeast cell (right)',
  draw: (s, p) => {
    // plant in waterlogged soil
    label(s, 0.7, 1.42, 2.7, 'Roots in waterlogged soil', { size: 11, bold: true, color: C.blue });
    line(s, 2.05, 1.95, 2.05, 3.25, '3E7F2E', 3);
    [[1.45, 2.15, -30], [2.2, 2.0, 30], [1.5, 2.65, -25], [2.15, 2.5, 25]].forEach(([x, y, r]) => s.addShape(SH.OVAL, { x, y, w: 0.6, h: 0.26, rotate: r, fill: { color: C.chloro }, line: { color: C.chloroEdge, width: 1 } }));
    box(s, 0.75, 3.25, 2.6, 1.75, '9C7A52', '6E5232');
    box(s, 0.75, 3.1, 2.6, 0.15, C.water, C.waterDark, { lw: 0.75 });
    // water-filled spaces in the soil
    [[0.95, 3.5], [1.4, 3.85], [2.9, 3.6], [2.6, 4.3], [1.05, 4.5], [3.1, 4.7], [1.7, 4.6]].forEach(([x, y]) => s.addShape(SH.OVAL, { x, y, w: 0.24, h: 0.15, fill: { color: C.water }, line: { color: C.waterDark, width: 0.5 } }));
    [[2.05, 3.25, 1.55, 4.1], [2.05, 3.25, 2.55, 4.0], [2.05, 3.25, 2.05, 4.75], [1.55, 4.1, 1.3, 4.6], [2.55, 4.0, 2.8, 4.55], [2.05, 4.1, 2.35, 4.6]].forEach(([a, b, c, d]) => line(s, a, b, c, d, 'F2E6C8', 2));
    label(s, 0.7, 5.05, 2.7, 'air spaces filled with water → **little oxygen** for root cells', { h: 0.5, size: 10.5, valign: 'top' });
    // yeast
    label(s, 3.75, 1.42, 2.6, 'Yeast (a single-celled fungus)', { size: 11, bold: true, color: C.blue });
    yeastCell(s, 4.95, 2.85, 1.8, 1.3);
    arrow(s, 3.55, 2.85, 4.0, 2.85, C.ink, 2);
    label(s, 3.45, 2.5, 0.9, 'glucose', { size: 10.5, bold: true, align: 'left' });
    arrow(s, 5.3, 3.5, 5.6, 4.0, C.red, 2); arrow(s, 4.65, 3.5, 4.35, 4.0, C.red, 2);
    label(s, 3.65, 4.0, 1.3, 'ethanol', { size: 10.5, bold: true, color: C.red });
    label(s, 5.0, 4.0, 1.45, 'carbon dioxide', { size: 10.5, bold: true, color: C.red });
    [[5.75, 4.42], [5.9, 4.6], [5.65, 4.7]].forEach(([x, y]) => bubble(s, x, y, 0.05));
    eqStrip(s, 3.6, 4.95, 2.75, 0.75, [...brk(R_('**glucose →**', { fontSize: 12 })), ...R_('**ethanol + carbon dioxide**', { fontSize: 12 })], { border: C.red });
  },
  head: 'Ethanol and carbon dioxide',
  lines: [
    'Plant cells and **yeast** respire anaerobically when oxygen is short: **glucose → ethanol + carbon dioxide**.',
    'Plant **root cells** in **waterlogged soil** get little oxygen. Ethanol is toxic, and less ATP means less active transport of mineral ions.',
    'Yeast can respire aerobically **or** anaerobically. Anaerobic respiration in yeast is called **fermentation**.',
    'Some **bacteria** respire anaerobically, e.g. in deep **puncture wounds** where there is little oxygen.',
  ],
  size: 11,
  worked: { head: 'Worked example: explain', q: 'A farmer\'s field floods for a week. The crop plants grow poorly. Explain why.',
    steps: [['Oxygen', 'water fills the air spaces in the soil'], ['Roots', 'root cells respire anaerobically and make ethanol'], ['ATP', 'much less ATP for active transport of mineral ions'], ['Answer', 'fewer mineral ions absorbed and toxic ethanol: poor growth']], size: 10.5 },
  qc: 'Give **one** product that is made by anaerobic respiration in yeast but **not** in human muscle cells.',
  notes: 'QUICK CHECK ANSWER: Ethanol, or carbon dioxide (human muscle makes only lactic acid).\nThe J260 B4.1 underlying knowledge (search extract) lists "human cells during vigorous exercise, plant root cells in waterlogged soil and bacteria in puncture wounds" as low-oxygen conditions. Bacterial products vary by species and are not required.\nStretch symbol equation for yeast: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂ (balanced, asserted in node).',
}), 'B4.1.1 Anaerobic: plants, yeast, bacteria');

// ======================= 13 USES: BREAD AND ALCOHOL =======================
reg(D.contentSlide({
  title: 'Using fermentation: bread and alcohol',
  subtitle: `Specification ${sp('B4.1.1')} • the products of anaerobic respiration in yeast are useful`,
  tag: 'B4.1.1', caption: 'bread dough rising (top) and a brewing vessel with an airlock (bottom)',
  draw: (s, p) => {
    // bread bowls
    label(s, 0.7, 1.42, 5.6, 'Bread: carbon dioxide makes the dough rise', { size: 11, bold: true, color: C.blue, align: 'left' });
    [[0.95, 0.45, 'start: 250 cm³'], [3.85, 0.95, 'after 60 min at 30 °C: 600 cm³']].forEach(([x, dh, cap], i) => {
      const bw = 2.1, by = 2.85;
      s.addShape(SH.OVAL, { x: x + 0.15, y: by - dh, w: bw - 0.3, h: dh + 0.45, fill: { color: 'F1DDB0' }, line: { color: 'B8934A', width: 1 } });
      if (i) [[0.55, -0.5], [0.95, -0.75], [1.4, -0.45], [0.8, -0.2], [1.25, -0.18], [1.6, -0.25]].forEach(([dx, dy]) => bubble(s, x + dx, by + dy, 0.06));
      else [[0.8, -0.2], [1.3, -0.25]].forEach(([dx, dy]) => bubble(s, x + dx, by + dy, 0.04));
      poly(s, [[x, by], [x + bw, by], [x + bw - 0.3, by + 0.55], [x + 0.3, by + 0.55]], 'C9D1DA', '6B7385', { lw: 1.25 });
      label(s, x - 0.2, by + 0.58, bw + 0.4, cap, { size: 10.5, bold: true });
    });
    arrow(s, 3.2, 2.65, 3.7, 2.65, C.red, 2.5);
    // fermenter
    label(s, 0.7, 3.78, 5.6, 'Brewing and wine: ethanol (alcohol)', { size: 11, bold: true, color: C.blue, align: 'left' });
    const fx = 1.0, fy = 4.95, fw = 1.7, fh = 0.85;
    box(s, fx + 0.6, fy - 0.38, 0.5, 0.42, 'E6EEF2', '6B7385', { lw: 1.25 });
    box(s, fx, fy, fw, fh, 'E6EEF2', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.25, lw: 1.5 });
    box(s, fx + 0.06, fy + 0.3, fw - 0.12, fh - 0.36, 'E7C77A', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.2 });
    [[0.4, 0.45], [0.8, 0.4], [1.2, 0.5], [0.6, 0.65], [1.05, 0.68]].forEach(([dx, dy]) => bubble(s, fx + dx, fy + dy, 0.04));
    // airlock (U tube)
    const ax = fx + 0.85;
    line(s, ax, fy - 0.38, ax, fy - 0.62, C.ink, 2);
    box(s, ax - 0.22, fy - 0.92, 0.44, 0.34, C.water, C.ink, { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.5 });
    bubble(s, ax - 0.06, fy - 0.78, 0.04); bubble(s, ax + 0.08, fy - 0.84, 0.035);
    label(s, ax + 0.32, fy - 0.97, 3.3, '**airlock**: lets CO₂ out; keeps air (oxygen) and microorganisms out', { h: 0.48, size: 10.5, align: 'left', valign: 'top' });
    label(s, fx + fw + 0.15, fy + 0.15, 3.5, 'yeast + sugar (grape juice or malted barley)', { h: 0.3, size: 10.5, align: 'left' });
    label(s, fx + fw + 0.15, fy + 0.48, 3.5, 'no oxygen → fermentation → **ethanol** + CO₂', { h: 0.3, size: 10.5, align: 'left' });
  },
  head: 'Fermentation is useful',
  lines: [
    '**Bread:** yeast is mixed with flour, sugar and water. The **carbon dioxide** bubbles make the dough **rise**. The small amount of ethanol evaporates when the bread is baked.',
    '**Beer and wine:** yeast ferments sugars with no oxygen to make **ethanol** (alcohol). The CO₂ can make drinks fizzy.',
    'Warmth (about 25–35 °C) speeds up fermentation: the yeast\'s **enzymes** work faster (B3.1).',
  ],
  size: 11,
  worked: { head: 'Worked example: rate of rising', q: 'The dough rose from 250 cm³ to 600 cm³ in 60 minutes. Calculate the mean rate of rising.',
    steps: [['Change', '600 − 250 = 350 cm³'], ['Equation', 'rate = change in volume ÷ time'], ['Substitute', 'rate = 350 ÷ 60'], ['Answer', `rate = ${sf(doughRate, 2)} cm³ per minute (2 s.f.)`]], size: 10.5 },
  qc: 'Why does a brewer use an airlock instead of leaving the vessel open? What would happen to the yeast if air got in?',
  notes: `QUICK CHECK ANSWER: The airlock lets carbon dioxide escape but stops oxygen (and microorganisms) getting in. With oxygen, yeast would respire aerobically, making carbon dioxide and water instead of ethanol (and other microbes could spoil the drink, e.g. turn ethanol to vinegar).\nRate calculation: 350 ÷ 60 = ${doughRate.toFixed(3)} → 5.8 cm³/min (node). Uses of fermentation are taught as context for B4.1.1 (no separate J260 statement found).`,
}), 'B4.1.1 Uses of fermentation');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B4.1.1')} • anaerobic respiration and fermentation`, [
  { q: 'Name the product of anaerobic respiration in human muscle cells.', marks: 1, ms: 'Lactic acid (1).' },
  { q: 'Explain what is meant by an **oxygen debt**.', marks: 2, ms: 'The extra oxygen needed after exercise (1); to break down the lactic acid made during anaerobic respiration (1).' },
  { q: 'Write the **word equation** for anaerobic respiration in yeast.', marks: 2, ms: 'glucose → (1) ethanol + carbon dioxide (1). Both products needed for the second mark.' },
  { q: 'Explain why bread dough rises when it is left in a warm place.', marks: 2, ms: 'Yeast respires (anaerobically) / ferments the sugar producing carbon dioxide gas (1); warmth increases the rate because enzymes work faster / the gas bubbles expand and make the dough rise (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 COMPARING =======================
reg(D.contentSlide({
  title: 'Comparing aerobic and anaerobic respiration',
  subtitle: `Specification ${sp('B4.1.1')} • conditions, inputs, outputs and yields of ATP`,
  tag: 'B4.1.1', caption: 'ATP from one glucose molecule drawn to scale (aerobic figure is approximate)',
  draw: (s, p) => {
    const rows = [[HDR(''), HDR('Aerobic'), HDR('Anaerobic')],
      ['When?', 'plenty of oxygen', 'little or no oxygen'],
      ['Inputs', 'glucose + oxygen', 'glucose only'],
      ['Outputs: animals', 'carbon dioxide + water', 'lactic acid'],
      ['Outputs: plants, yeast', 'carbon dioxide + water', 'ethanol + carbon dioxide'],
      ['Glucose broken down', 'completely', 'partly'],
      ['Where in the cell?', 'mostly mitochondria', 'cytoplasm'],
      ['ATP per glucose', 'a lot (about 32)', 'a little (2)']]
      .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 0.7, y: 1.45, w: 5.6, colW: [1.7, 1.95, 1.95], rowH: 0.33, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    label(s, 0.7, 4.3, 5.6, 'ATP made from one glucose molecule', { size: 11, bold: true });
    hbar(s, 1.95, 4.68, 3.6, atpAer, atpAer, C.blue, 'aerobic', `about ${atpAer}`, 1.1);
    hbar(s, 1.95, 5.15, 3.6, atpAn, atpAer, C.red, 'anaerobic', `${atpAn}`, 1.1);
    line(s, 1.95, 4.6, 1.95, 5.58, C.ink, 1.25);
  },
  head: 'Same start, different finish',
  lines: [
    'Both start with **glucose** and both transfer energy to **ATP**.',
    'Aerobic respiration releases **far more energy** per glucose because glucose is broken down completely.',
    'Anaerobic respiration is **less efficient** but needs no oxygen. In muscles it supplies extra ATP quickly in a sprint.',
    'Only aerobic respiration (and anaerobic in plants and yeast) makes **carbon dioxide**.',
  ],
  size: 11,
  worked: { head: 'Stretch: comparing yields', q: 'A cell needs 64 ATP molecules. How many glucose molecules must it respire (a) aerobically (b) anaerobically?',
    steps: [['Aerobic', '64 ÷ 32 = 2 glucose'], ['Anaerobic', '64 ÷ 2 = 32 glucose'], ['Ratio', '32 ÷ 2 = 16 times as much glucose'], ['Answer', '2 aerobically; 32 anaerobically']], size: 10.5 },
  qc: 'Give **two** differences between aerobic respiration and anaerobic respiration in a human muscle cell.',
  notes: `QUICK CHECK ANSWER: Any two: aerobic needs oxygen, anaerobic does not; aerobic makes carbon dioxide and water, anaerobic makes lactic acid; aerobic makes much more ATP per glucose (about ${atpAer} vs ${atpAn}); aerobic mostly in mitochondria, anaerobic in the cytoplasm; glucose completely vs partly broken down.\nATP figures: 2 per glucose for anaerobic is standard. Aerobic is given as "about 32" (modern value 30–32; older textbooks say 36 or 38). Accept "much more" in exams. Bars drawn to scale (32 : 2). Spec B4.1.1 says "comparative yields of ATP".`,
}), 'B4.1.1 Comparing aerobic and anaerobic');

// ======================= 16 PAG B4 METHOD =======================
reg(D.contentSlide({
  title: 'PAG B4: sugars and respiration in yeast',
  subtitle: `Specification ${sp('B4.1.5')} • collect the carbon dioxide made by yeast respiring different sugars`,
  tag: 'PAG B4', pag: 'PAG B4', caption: 'yeast in a water bath; gas collected over water',
  draw: (s, p) => {
    // water bath
    const bath = D.liquidColumn(s, 0.75, 3.05, 2.5, 2.55, 0.76);
    label(s, 0.75, 5.62, 2.5, 'water bath at 30 °C', { size: 10.5, bold: true, h: 0.24 });
    thermometer(s, 2.95, 2.5, 2.6, 0.55);
    // conical flask
    const fl = [[1.55, 2.6], [1.85, 2.6], [1.85, 3.3], [2.45, 5.45], [0.95, 5.45], [1.55, 3.3]];
    poly(s, [[1.27, 4.3], [2.13, 4.3], [2.45, 5.45], [0.95, 5.45]], 'EFE3C0', null);
    poly(s, fl, null, C.ink, { lw: 1.75 });
    box(s, 1.5, 2.45, 0.4, 0.22, '8C6A3A', '5A4020');
    [[1.4, 4.9], [1.75, 5.1], [2.0, 4.7], [1.6, 4.55]].forEach(([x, y]) => ball(s, x, y, 0.05, 'D9C38A', 'A07A2A'));
    label(s, 0.55, 2.55, 0.9, 'yeast + sugar solution', { h: 0.5, size: 10, bold: true, align: 'left', valign: 'top' });
    line(s, 1.0, 3.05, 1.45, 4.75, C.ink, 1);
    // trough, then delivery tube on top of the water
    D.liquidColumn(s, 3.95, 4.2, 2.35, 1.45, 0.8);
    D.wire(s, [[1.7, 2.45], [1.7, 1.95], [4.55, 1.95], [4.55, 5.42], [4.98, 5.42], [4.98, 5.05]], '6B7385', 3);
    label(s, 2.2, 1.68, 2.0, 'delivery tube', { size: 10.5, bold: true, h: 0.24 });
    // inverted measuring cylinder
    const cx = 4.8, cw = 0.4, ctop = 2.35, cbot = 5.15, gas = 0.62;
    box(s, cx, ctop, cw, cbot - ctop, C.water, null);
    box(s, cx, ctop, cw, gas, C.white, null);
    line(s, cx, ctop, cx, cbot, C.ink, 1.5); line(s, cx + cw, ctop, cx + cw, cbot, C.ink, 1.5); line(s, cx, ctop, cx + cw, ctop, C.ink, 1.5);
    line(s, cx, ctop + gas, cx + cw, ctop + gas, C.waterDark, 1.25);
    for (let i = 1; i < 12; i++) line(s, cx + cw - (i % 5 ? 0.07 : 0.14), ctop + i * 0.22, cx + cw, ctop + i * 0.22, C.ink, 0.75);
    [[4.98, 4.85], [4.95, 4.5], [5.0, 4.1], [4.97, 3.7]].forEach(([x, y]) => bubble(s, x, y, 0.045));
    label(s, cx + cw + 0.08, ctop + 0.12, 1.2, 'CO₂ collects here', { h: 0.42, size: 10.5, bold: true, align: 'left', valign: 'top', color: C.red });
    label(s, cx + cw + 0.08, ctop + 0.8, 1.2, 'upside-down measuring cylinder', { h: 0.62, size: 10, align: 'left', valign: 'top' });
    label(s, 3.95, 5.66, 2.35, 'trough of water', { size: 10.5, bold: true, h: 0.24 });
  },
  head: 'Method',
  lines: [
    'Put the same volume of **yeast suspension** and **sugar solution** (e.g. glucose) in a conical flask. Stand it in a **water bath** for 10 min to reach 30 °C.',
    'Fit the bung and delivery tube. Fill a measuring cylinder with water and turn it upside down in the trough over the tube.',
    'Start the stopwatch. Record the **volume of gas** every 2 minutes for 10 minutes.',
    'Repeat with sucrose, starch and **water only** (control). Do each **three times**.',
    'Rate of respiration = volume of gas ÷ time.',
  ],
  size: 10.5,
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'the substrate (glucose, sucrose, starch, none)'], ['Dependent', 'volume of CO₂ collected per minute'], ['Control', 'temperature; mass of yeast; concentration and volume of sugar'], ['Safety', 'eye protection; wipe up spills; hot water bath: take care']], size: 10.5 },
  workedH: 2.0,
  qc: 'Why is a flask with yeast and **water only** included? Why is the flask left in the water bath for 10 minutes before timing starts?',
  notes: 'QUICK CHECK ANSWER: Water only is the control: it shows that the gas comes from the yeast respiring the sugar, not from anything else (any gas here is from stored food in the yeast or from warming air). The 10 minutes lets the mixture reach the bath temperature so temperature is controlled and the air in the flask does not expand during the timing.\nPAG B4 link from the J260 specification extract: "describe practical investigations into the effect of different substrates on the rate of respiration in yeast (PAG B4)". The PAG group number is from that extract (UNVERIFIED against the current OCR practical list).\nAlternatives: a gas syringe, or counting bubbles (less accurate); immobilised yeast in alginate beads (Oak National Academy method). Sugar concentration e.g. 5%; yeast e.g. 5 g dried yeast in 100 cm³ water.',
}), 'PAG B4 Yeast: method');

// ======================= 17 PAG B4 RESULTS =======================
const GY = { x: 1.45, y: 1.5, w: 4.8, h: 3.55, xmin: 0, xmax: 10, ymin: 0, ymax: 14, xstep: 2, ystep: 2, minor: 2, xlabel: 'time / min', ylabel: 'volume of gas / cm³', fmt: v => String(Math.round(v)) };
{
  const s = D.contentHeader('PAG B4: results and evaluation', `Specification ${sp('B4.1.5')} • sample class results at 30 °C`, { pag: 'PAG B4', tag: 'PAG B4' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'run 1 for each substrate, plotted to scale');
  axes(s, GY);
  const series = [['glucose', C.red, null], ['sucrose', C.blue, null], ['starch', C.orange, null], ['water (control)', C.grey, 'dash']];
  [['glucose', 0], ['sucrose', 1], ['starch', 2], ['water', 3]].forEach(([k, i]) => {
    const [, col, dash] = series[i];
    plotLine(s, GY, tt.map((t, j) => [t, run1[k][j]]), col, 2, dash ? { dash } : {});
    points(s, GY, tt.map((t, j) => [t, run1[k][j]]), col);
  });
  // legend
  box(s, px(GY, 0.3), py(GY, 13.6), 1.9, 1.15, C.white, C.line);
  series.forEach(([n, col, dash], i) => {
    const y = py(GY, 13.6) + 0.15 + i * 0.25;
    line(s, px(GY, 0.3) + 0.1, y + 0.1, px(GY, 0.3) + 0.45, y + 0.1, col, 2, dash ? { dash } : {});
    label(s, px(GY, 0.3) + 0.52, y, 1.3, n, { h: 0.2, size: 10, align: 'left' });
  });
  const cell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
  const rows = [[HDR('Substrate'), HDR('Run 1'), HDR('Run 2'), HDR('Run 3'), HDR('Mean'), HDR('Rate')],
    ...['glucose', 'sucrose', 'starch', 'water'].map((k, i) => [cell(k, i, { bold: true }), ...reps[k].map((v, j) => cell(v.toFixed(1), i, anomaly[k] === j ? { color: C.red, bold: true } : {})), cell(M[k].toFixed(1), i, { bold: true }), cell(R[k].toFixed(2), i, { bold: true })])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.28, 0.8, 0.8, 0.8, 0.9, 1.5], rowH: 0.27, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 6.8, 2.68, 6.08, 'volume of gas in 10 min / cm³ • rate / cm³ per min • !!red!! = anomaly, left out of the mean', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.22 });
  D.card(s, 6.8, 2.97, 6.08, 1.4, 'What the results show', [
    '**Glucose** gives the fastest rate: yeast respires it directly.',
    '**Sucrose** is a little slower: yeast enzymes must first break it into glucose and fructose.',
    '**Starch** gives almost no gas: yeast cannot easily break starch down (it makes little amylase).',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.48, 6.08, 1.77, 'Sources of error and improvements', '', [
    ['CO₂ dissolves', 'some gas dissolves in the water → use a gas syringe'],
    ['Leaks', 'gas escapes round the bung (sucrose run 3) → check seals, repeat'],
    ['Temperature', 'bath temperature drifts → use a thermostatic water bath'],
    ['Answer', 'repeat, ignore anomalies, calculate a mean']], { size: 10.5 });
  D.quickCheck(s, 'Calculate the mean rate for glucose in cm³ per minute. Which result is anomalous, and what would the sucrose mean be if it were included?');
  D.notes(s, `QUICK CHECK ANSWER: Glucose mean = (12.0 + 11.6 + 12.4) ÷ 3 = ${M.glucose.toFixed(1)} cm³; rate = ${M.glucose.toFixed(1)} ÷ 10 = ${R.glucose.toFixed(1)} cm³/min. Anomaly: sucrose run 3 (6.1 cm³). Including it the mean would be ${sf((9.9 + 10.3 + 6.1) / 3, 3)} cm³, which is misleading; without it, ${M.sucrose.toFixed(1)} cm³.\nAll means and rates calculated in node. Glucose run 1 lies within 0.1 cm³ of a straight line of gradient 1.2 cm³/min. Data are illustrative but match typical school results (glucose ≥ sucrose >> starch ≈ water).`);
  reg(s, 'PAG B4 Yeast: results');
}

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B4.1.1')}, ${sp('B4.1.5')} • comparing respiration and PAG B4`, [
  { q: 'Give **two** differences between aerobic and anaerobic respiration in humans.', marks: 2, ms: 'Any two (1 each): aerobic needs oxygen / anaerobic does not; aerobic makes carbon dioxide and water / anaerobic makes lactic acid; aerobic releases more energy / makes more ATP per glucose; aerobic mostly in mitochondria / anaerobic in cytoplasm.' },
  { q: 'Yeast in glucose solution produced **15.0 cm³** of gas in **6 minutes**. Calculate the rate of respiration.', marks: 2, ms: 'rate = 15.0 ÷ 6 (1); = 2.5 cm³ per minute (1). Unit needed.' },
  { q: 'Yeast given **starch** produced almost no gas. Suggest why.', marks: 2, ms: 'Yeast cannot break down starch (quickly) / has no or little amylase (1); so there is little glucose / sugar available to respire (1).' },
  { q: 'Give **one** source of error in the yeast practical and **one** improvement.', marks: 2, ms: 'e.g. carbon dioxide dissolves in the water / gas leaks around the bung / temperature not constant / volume hard to read (1); use a gas syringe / check the seals / thermostatic water bath / read at eye level (1). The improvement must match the error.' },
]);
reg(R4.s, 'Recap 4');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Cellular respiration', 'Chemical process in all living cells that transfers energy from glucose to ATP.'],
  ['ATP', 'Molecule that carries energy from respiration to the processes that need it.'],
  ['Exothermic', 'A process that transfers energy to the surroundings.'],
  ['Continuous', 'Respiration never stops: cells need ATP all the time and cannot store much.'],
  ['Aerobic respiration', 'Uses oxygen: glucose + oxygen → carbon dioxide + water. A lot of ATP.'],
  ['Anaerobic respiration', 'Without oxygen. Glucose is only partly broken down; little ATP.'],
  ['Mitochondria', 'Organelles in plant and animal cells where most aerobic respiration happens.'],
  ['Cytoplasm', 'Where anaerobic respiration, and the first stage of aerobic, happen.'],
  ['Lactic acid', 'Made by anaerobic respiration in animal muscle cells.'],
  ['Muscle fatigue', 'Muscles stop contracting well as lactic acid builds up.'],
  ['Oxygen debt', 'Extra oxygen needed after exercise to break down lactic acid.'],
  ['Ethanol', 'Alcohol made with carbon dioxide by anaerobic respiration in plants and yeast.'],
  ['Fermentation', 'Anaerobic respiration in yeast; used to make bread, beer and wine.'],
  ['Yeast', 'Single-celled fungus that can respire aerobically or anaerobically.'],
  ['Substrate', 'The substance an enzyme acts on, e.g. the sugar the yeast respires.'],
  ['Rate of respiration', 'Volume of CO₂ (or O₂) per unit time, e.g. cm³ per minute.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A sprinter runs a 400 m race. Her muscle cells respire **aerobically** and **anaerobically**. Scientists also study respiration in **yeast**.', [
  { l: 'a', q: 'Complete the word equation for aerobic respiration.\nglucose + ……… → ……… + water', marks: 2, ms: 'oxygen (1); carbon dioxide (1).' },
  { l: 'b', q: 'Muscle cells contain many **mitochondria**. Explain why.', marks: 2, ms: 'Mitochondria are where (most) aerobic respiration happens (1); muscles need a lot of energy / ATP to contract (1).' },
  { l: 'c', q: 'Near the end of the race her muscles respire **anaerobically**. Explain why, and why she keeps breathing quickly **after** the race.', marks: 3, ms: 'Not enough oxygen reaches the muscles / oxygen demand greater than supply (1); lactic acid builds up (1); extra oxygen / oxygen debt is needed to break down the lactic acid (1).', h: 1.3 },
  { l: 'd', q: 'Aerobic respiration makes about **32 ATP** per glucose and anaerobic respiration makes **2**. How many times more ATP does aerobic respiration make per glucose?', marks: 2, ms: '32 ÷ 2 (1); = 16 times (1).', h: 1.15 },
  { l: 'e', q: 'Yeast respiring glucose produced **18 cm³** of carbon dioxide in **5 minutes**. Calculate the rate of respiration. Give the unit.', marks: 2, ms: '18 ÷ 5 (1); = 3.6 cm³ per minute (1). Unit needed for the second mark.' },
  { l: 'f', q: 'Explain why cellular respiration is described as **exothermic**, and why it must happen **continuously**.', marks: 2, ms: 'Energy is transferred / released to the surroundings (1); cells need a constant supply of ATP, which cannot be stored in large amounts (1).' },
], 13, { subtitle: `Specification ${sp('B4.1.1')}–${sp('B4.1.5')} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the molecule that carries energy from respiration to the processes in a cell that need it.', marks: 1, ms: 'ATP (1).' },
  { n: '2', q: 'Write the **word equation** for anaerobic respiration in **yeast**.', marks: 2, ms: 'glucose → (1) ethanol + carbon dioxide (1).' },
  { n: '3', q: 'A plant is left in **waterlogged** soil for two weeks and wilts. Explain why.', marks: 3, ms: 'Water fills the air spaces so there is little oxygen in the soil (1); root cells respire anaerobically, making toxic ethanol / much less ATP (1); less energy for active transport of mineral ions / roots damaged, so less water and fewer ions taken up (1).' },
  { n: '4', q: 'Yeast in a sucrose solution produced **24 cm³** of gas in **8 minutes**. Calculate the rate of respiration.', marks: 2, ms: '24 ÷ 8 (1); = 3 cm³ per minute (1).' },
  { n: '5', q: 'Explain how yeast makes bread dough rise.', marks: 2, ms: 'Yeast respires / ferments the sugar (anaerobically) (1); producing carbon dioxide gas, whose bubbles make the dough rise (1).' },
  { n: '6', q: '**Stretch:** aerobic respiration makes about 32 ATP per glucose; anaerobic makes 2. How many glucose molecules must be respired anaerobically to make the same ATP as **3** glucose aerobically?', marks: 1, ms: '3 × 32 ÷ 2 = 48 (1).' },
  { n: '7', q: 'Compare **aerobic respiration in a human muscle cell** with **anaerobic respiration in a yeast cell**. Include when each happens, where in the cell, the inputs and outputs, and the energy released.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Aerobic in muscle: happens when there is plenty of oxygen (e.g. at rest or gentle exercise). Anaerobic in yeast: little or no oxygen (e.g. in a sealed fermenter, bread dough).',
    'Aerobic: mostly in the mitochondria. Anaerobic: in the cytoplasm.',
    'Aerobic inputs: glucose and oxygen. Anaerobic inputs: glucose only.',
    'Aerobic outputs: carbon dioxide and water. Anaerobic in yeast: ethanol and carbon dioxide.',
    'Both produce carbon dioxide; only aerobic produces water; only yeast anaerobic produces ethanol.',
    'Aerobic: glucose broken down completely, a lot of energy / ATP (about 32 per glucose). Anaerobic: glucose partly broken down, little ATP (2 per glucose).',
    'Both are exothermic and both transfer energy from glucose to ATP; both are controlled by enzymes.',
  ], {
    l3: 'Makes a detailed comparison covering conditions AND location AND inputs/outputs AND energy/ATP, with clear similarities or differences stated.',
    l2: 'Compares inputs and outputs correctly AND gives one other comparison (conditions, location or energy).',
    l1: 'Gives some correct inputs or outputs of either process OR a simple statement about oxygen or energy.',
  });
}
D.homework('Answer all questions. Q6 is a stretch calculation.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 8);
const out = path.join(__dirname, 'OCR21C_B4.1_CellularRespiration_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
