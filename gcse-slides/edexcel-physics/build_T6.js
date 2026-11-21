// build_T6.js — Edexcel GCSE Physics 1PH0 Topic 6 Radioactivity (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T6.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const P_CODES = []; for (let k = 29; k <= 45; k++) P_CODES.push('6.' + k);
const DECK = {
  topic: 6,
  title: 'Radioactivity',
  shortTitle: 'T6',
  subtitle: 'Atoms and isotopes, nuclear radiation, half-life, uses, fission and fusion',
  specRange: '6.1–6.45',
  pOnly: P_CODES,
  paper: 'Paper 1',
  keywords: ['Atomic structure', 'Isotopes', 'Alpha, beta, gamma', 'Half-life', 'Uses and dangers', 'Fission and fusion'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// nuclide text like ²³⁸₉₂U
const SUP = '⁰¹²³⁴⁵⁶⁷⁸⁹', SUB = '₀₁₂₃₄₅₆₇₈₉';
const sup = n => String(n).split('').map(d => (d === '-' ? '⁻' : SUP[+d])).join('');
const sub = n => String(n).split('').map(d => (d === '-' ? '₋' : SUB[+d])).join('');
const nuc = (A, Z, X) => `${sup(A)}${sub(Z)}${X}`;
function balance(lhs, rhs, name) { const s = a => a.reduce((t, [A, Z]) => [t[0] + A, t[1] + Z], [0, 0]); const L = s(lhs), R = s(rhs); calc(name + ' (A)', R[0], L[0]); calc(name + ' (Z)', R[1], L[1]); }

// ======================= CALCULATIONS (asserted) =======================
calc('atom / nucleus size ratio', 1e-10 / 1e-15, 1e5, 1e-6);
calc('C-14 neutrons', 14 - 6, 8); calc('U-235 neutrons', 235 - 92, 143); calc('Cl-37 neutrons', 37 - 17, 20);
balance([[238, 92]], [[234, 90], [4, 2]], 'U-238 alpha');
balance([[226, 88]], [[222, 86], [4, 2]], 'Ra-226 alpha');
balance([[14, 6]], [[14, 7], [0, -1]], 'C-14 beta-');
balance([[18, 9]], [[18, 8], [0, 1]], 'F-18 beta+');
balance([[210, 84]], [[206, 82], [4, 2]], 'Po-210 alpha (YT)');
balance([[90, 38]], [[90, 39], [0, -1]], 'Sr-90 beta- (YT)');
balance([[22, 11]], [[22, 10], [0, 1]], 'Na-22 beta+ (YT)');
balance([[60, 27]], [[60, 27]], 'Co-60 gamma');
balance([[235, 92], [1, 0]], [[141, 56], [92, 36], [3, 0]], 'U-235 fission');
balance([[2, 1], [3, 1]], [[4, 2], [1, 0]], 'D-T fusion');
const halfAfter = (A0, T, t) => A0 * Math.pow(0.5, t / T);
calc('800 Bq after 24 h (T½ 6 h)', halfAfter(800, 6, 24), 50, 1e-9);
calc('ratio after 3 half-lives', Math.pow(0.5, 3), 0.125, 1e-12);
calc('net decline after 3 half-lives', 1 - Math.pow(0.5, 3), 0.875, 1e-12);
calc('YT 1200 after 8 h (T½ 2 h)', halfAfter(1200, 2, 8), 75, 1e-9);
calc('YT 640 → 40 half-lives', Math.log2(640 / 40), 4, 1e-12);
calc('YT 640 → 40 days (T½ 5 d)', Math.log2(640 / 40) * 5, 20, 1e-12);
calc('YT fraction after 5 half-lives', Math.pow(0.5, 5), 1 / 32, 1e-12);
calc('YT net decline 2 half-lives', 1 - 0.25, 0.75, 1e-12);
calc('background correction 150 − 20', 150 - 20, 130);
const BG = [['radon gas', 50, '7B4FB8'], ['medical', 14, C.red], ['ground and buildings', 14, 'B8730A'], ['food and drink', 11, '2E8B57'], ['cosmic rays', 10, C.blue], ['other', 1, C.grey]];
calc('background shares sum', BG.reduce((a, b) => a + b[1], 0), 100);
calc('graph read: 800 → 400 at 6 h', halfAfter(800, 6, 6), 400, 1e-9);
calc('chain: 3 neutrons, generation 4', 3 ** 4, 81);
calc('R4 3200 after 3 half-lives', 3200 / 8, 400, 1e-9);
calc('FQ 480 after 12 days (T½ 4 d)', halfAfter(480, 4, 12), 60, 1e-9);
calc('HW 1000 → 125 half-lives', Math.log2(1000 / 125), 3, 1e-12);

// ======================= DECK-SPECIFIC drawing helpers =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: fill ? { color: fill } : { type: 'none' }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: o.rot, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
function polyline(s, pts, col, w = 1.5, o = {}) { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, w, o); }
function sine(s, x0, x1, yc, A, lam, col = C.blue, w = 2.5, ph = 0) {
  const pts = []; const n = Math.max(40, Math.round((x1 - x0) / lam * 24));
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; pts.push([x, yc - A * Math.sin(2 * Math.PI * (x - x0) / lam + ph)]); }
  polyline(s, pts, col, w);
}
function dim(s, x1, y1, x2, y2, txt, col = C.red, o = {}) {
  line(s, x1, y1, x2, y2, col, 1.5, { head: true, tail: true });
  label(s, (x1 + x2) / 2 - (o.w || 1.4) / 2 + (o.dx || 0), (y1 + y2) / 2 + (o.dy != null ? o.dy : -0.32), o.w || 1.4, txt, { size: o.size || 10.5, bold: true, color: col });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
const table = (s, rows, o) => s.addTable(rows, Object.assign({ fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } }, o));
function slinky(s, x0, x1, yc, h, n, comp, col = C.blue) {
  // comp: function(u in 0..1) -> local density factor; spacing varies to show compressions
  const xs = []; let acc = 0; const dens = []; for (let i = 0; i < 400; i++) dens.push(comp(i / 399)); const tot = dens.reduce((a, b) => a + b);
  let cum = 0, k = 0; for (let i = 0; i < 400 && k < n; i++) { cum += dens[i]; if (cum / tot >= k / (n - 1)) { xs.push(x0 + (x1 - x0) * i / 399); k++; } }
  xs.forEach(x => line(s, x, yc - h / 2, x, yc + h / 2, col, 1.5));
  return xs;
}
function person(s, x, yFeet, col = C.ink) {
  ball(s, x, yFeet - 1.0, 0.13, C.white, col, 1.5);
  line(s, x, yFeet - 0.87, x, yFeet - 0.4, col, 2); line(s, x, yFeet - 0.4, x - 0.15, yFeet, col, 2); line(s, x, yFeet - 0.4, x + 0.15, yFeet, col, 2);
  line(s, x - 0.2, yFeet - 0.7, x + 0.2, yFeet - 0.7, col, 2);
}
function stopwatch(s, cx, cy, r = 0.22) { ball(s, cx, cy, r, C.white, C.ink, 1.5); box(s, cx - 0.04, cy - r - 0.08, 0.08, 0.08, C.ink, null); line(s, cx, cy, cx + r * 0.5, cy - r * 0.5, C.red, 1.5); }
function pPill(s) { /* header already shows PHYSICS ONLY via opts.p */ }


function nucleus(s, cx, cy, np, nn, r = 0.07) {
  const tot = np + nn; let k = 0;
  for (let i = 0; i < tot; i++) { const a = i * 2.4, d = r * 1.05 * Math.sqrt(i); const isP = (i % 2 === 0 && k < np) || (tot - i <= np - k); if (isP) k++; ball(s, cx + d * Math.cos(a), cy + d * Math.sin(a), r, isP ? C.red : '9AA5B1', isP ? '8E2A33' : '555555', 0.75); }
}
function atomDraw(s, cx, cy, shells, np, nn) {
  shells.forEach((n, i) => { const R = 0.55 + i * 0.5; ball(s, cx, cy, R, null, '9AA5B1', 1); for (let k = 0; k < n; k++) { const a = k * 2 * Math.PI / n + i; ball(s, cx + R * Math.cos(a), cy + R * Math.sin(a), 0.07, C.blue, C.blue); } });
  nucleus(s, cx, cy, np, nn);
}
function pie(s, cx, cy, r, parts) {
  let a0 = 270; parts.forEach(([nm, v, col]) => { const a1 = a0 + v * 3.6; s.addShape(SH.PIE, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, angleRange: [a0 % 360, a1 % 360 === 0 ? 359.99 : a1 % 360], fill: { color: col }, line: { color: C.white, width: 1 } }); a0 = a1; });
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
const radC = { a: C.red, b: C.blue, g: '2E8B57' };

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Radioactivity',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • atoms, nuclear radiation, half-life, uses, fission and fusion` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and PHYSICS ONLY slides are marked' },
    { icon: '6', text: 'Topic 6 of 15 • assessed on Paper 1 • no Core Practical' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 6 Radioactivity. Paper 1. Physics only (P): 6.29P–6.45P (uses, medical physics, nuclear power, fission, fusion): range confirmed by search for 6.33P, 6.35P and 6.36P–6.45P. Higher only: ratio of net decline in half-life calculations. No Core Practical. Many statement numbers are reconstructed: see SPEC_T6.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '6.1–6.9', text: 'Describe the **atom**, its **size**, **isotopes**, electron **orbits** and **ions**; how the **model** changed.' },
  { code: '6.10–6.16', text: 'Describe **α, β⁻, β⁺, γ** and neutron radiation; **penetration** and **ionisation**; **background** radiation; **detectors**.' },
  { code: '6.17–6.21', text: 'Describe **β⁻ and β⁺ decay**; balance **nuclear equations**.' },
  { code: '6.22–6.26', text: 'Explain **activity** (Bq) and **half-life**; calculate with half-lives.', ht: true },
  { code: '6.27–6.28', text: 'Describe the **dangers** of radiation; **contamination** vs **irradiation**.' },
  { code: `${sp('6.29')}–${sp('6.35')}`, text: 'Describe **uses** of radioactivity, including **medical** diagnosis and treatment.' },
  { code: `${sp('6.36')}–${sp('6.42')}`, text: 'Evaluate **nuclear power**; explain **fission**, **chain reactions** and **reactors**.' },
  { code: `${sp('6.43')}–${sp('6.45')}`, text: 'Explain **nuclear fusion** and why it needs extreme conditions.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'P = physics only: 6.29P–6.45P. HT = ratio of net decline in half-life (6.26).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 6 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['6.1–6.9', 'Atoms, isotopes, orbits, ions, atomic model', 'BOTH COURSES', C.grey],
    ['6.10–6.16', 'Types of radiation; background; detectors', 'BOTH COURSES', C.grey],
    ['6.17–6.21', 'β⁻ and β⁺ decay; nuclear equations', 'BOTH COURSES', C.grey],
    ['6.22–6.28', 'Activity, half-life (HT ratio), dangers', 'BOTH COURSES', C.grey],
    [`${sp('6.29')}–${sp('6.35')}`, 'Uses; medical diagnosis and treatment', 'PHYSICS ONLY', C.blue],
    [`${sp('6.36')}–${sp('6.42')}`, 'Nuclear power, fission, reactors', 'PHYSICS ONLY', C.blue],
    [`${sp('6.43')}–${sp('6.45')}`, 'Nuclear fusion', 'PHYSICS ONLY', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 6\nRadioactivity', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 10.5, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.35);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 5 EM spectrum (gamma, ionising) • Topic 3 energy resources (nuclear) • Topic 7 stars (fusion)', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–7.',
      'Combined Science 1SC0 tests the statements **without** a P.',
      'Maths: **half-life** from graphs and numbers; **balancing** nuclear equations.',
      '**No Core Practical** and no equations to recall in Topic 6.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Partly physics-only:** uses, medical physics, nuclear power, fission and fusion (6.29P–6.45P). Combined classes skip those.',
      '**HT** pill: net decline as a ratio in half-life questions.',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Physics-only (P): 6.29P–6.45P. Combined Science route: skip slides 22–29 and full question (f). Higher only: net decline as a ratio (slide 19, Q4). Many statement numbers reconstructed from memory: see SPEC_T6.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'KS3 • atoms', q: 'Name the **three** particles that make up an atom.' },
  { from: 'Topic 5 • EM', q: 'Which part of the EM spectrum has the **highest frequency**?' },
  { from: 'Topic 5 • EM', q: 'What does **ionising** radiation do to cells?' },
  { from: 'Topic 1 • standard form', q: 'Write **0.000 000 000 1 m** in standard form.' },
  { from: 'Topic 1 • maths', q: 'Halve **800** four times. What number do you get?' },
  { from: 'Topic 3 • energy', q: 'Give **one** advantage and **one** disadvantage of nuclear power stations.' },
], { subtitle: 'Recall from Topics 1, 3 and 5 and Key Stage 3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Protons, neutrons, electrons.\n2. Gamma rays.\n3. Damages cells / DNA; can cause mutations or cancer.\n4. 1 × 10⁻¹⁰ m.\n5. 50.\n6. No CO₂ emissions / reliable; radioactive waste / risk of accidents / expensive to decommission.' }), 'Retrieval starter');

// ======================= 5 ATOM =======================
reg(D.contentSlide({
  title: 'The structure of the atom',
  subtitle: `Specification ${sp('6.1')}–${sp('6.2')} • a tiny nucleus and orbiting electrons`,
  tag: '6.1–6.2', caption: 'a lithium atom (not to scale: the nucleus is drawn far too big)',
  draw: (s, p) => {
    atomDraw(s, 3.4, 3.4, [2, 1], 3, 4);
    label(s, 4.55, 1.95, 1.8, '**electron** (−)', { size: 10.5, color: C.blue, h: 0.3, align: 'left' });
    label(s, 0.8, 1.9, 1.8, '**nucleus** (+)', { size: 10.5, color: C.red, h: 0.3 }); line(s, 1.9, 2.2, 3.3, 3.3, C.grey, 1);
    ball(s, 1.0, 5.15, 0.07, C.red, '8E2A33'); label(s, 1.1, 5.0, 1.0, 'proton', { size: 10, h: 0.3, align: 'left' });
    ball(s, 2.2, 5.15, 0.07, '9AA5B1', '555555'); label(s, 2.3, 5.0, 1.0, 'neutron', { size: 10, h: 0.3, align: 'left' });
    label(s, 3.5, 5.0, 2.8, 'atom ≈ 10⁻¹⁰ m; nucleus ≈ 10⁻¹⁵ m', { size: 10, bold: true, h: 0.3 });
  },
  head: 'Key facts',
  lines: [
    'An atom has a **positively charged nucleus** of **protons** and **neutrons**, surrounded by **negatively charged electrons**.',
    'The **nucleus** is **tiny** (about 100 000 times smaller than the atom) but contains **almost all the mass**.',
    'Atoms and small molecules are about **1 × 10⁻¹⁰ m** across.',
    'Most of an atom is **empty space**.',
  ],
  worked: { head: 'Scale', q: 'How many times bigger is an atom (10⁻¹⁰ m) than its nucleus (10⁻¹⁵ m)?',
    steps: [['Divide', '10⁻¹⁰ ÷ 10⁻¹⁵'], ['Index', '10⁻¹⁰⁻⁽⁻¹⁵⁾ = 10⁵'], ['Answer', '100 000 times']], size: 11 },
  workedH: 1.75,
  qc: 'Where is almost all the **mass** of an atom? Where is most of its **volume**?',
  notes: 'QUICK CHECK ANSWER: in the nucleus (1); empty space around the nucleus / where the electrons are (1).\nSpec 6.1–6.2.',
}), '6.1–6.2 The atom');

// ======================= 6 MODEL HISTORY =======================
reg(D.contentSlide({
  title: 'How the model of the atom changed',
  subtitle: `Specification ${sp('6.1')} • from plum pudding to Rutherford and Bohr`,
  tag: '6.1', caption: 'alpha particles fired at thin gold foil (Geiger and Marsden, 1909)',
  draw: (s, p) => {
    box(s, 3.35, 1.7, 0.12, 3.6, 'F5C342', 'B8730A'); label(s, 2.85, 5.32, 1.2, 'gold foil', { size: 10, bold: true, h: 0.25 });
    [2.2, 2.7, 3.2, 3.8, 4.3, 4.8].forEach(y => { arrow(s, 0.8, y, 3.3, y, C.red, 1.5); });
    arrow(s, 3.45, 2.2, 6.1, 2.2, C.red, 1.5); arrow(s, 3.45, 2.7, 6.0, 2.4, C.red, 1.5); arrow(s, 3.45, 3.8, 6.1, 3.8, C.red, 1.5); arrow(s, 3.45, 4.3, 5.9, 5.0, C.red, 1.5); arrow(s, 3.45, 4.8, 6.1, 4.8, C.red, 1.5);
    arrow(s, 3.3, 3.2, 1.3, 1.8, '7B4FB8', 2.2);
    label(s, 4.3, 1.6, 1.9, 'most pass straight through', { size: 9.5, h: 0.4 });
    label(s, 4.6, 5.05, 1.6, 'a few deflected', { size: 9.5, h: 0.3 });
    label(s, 0.6, 1.4, 2.0, 'very few bounce back', { size: 9.5, color: '7B4FB8', bold: true, h: 0.3 });
  },
  head: 'The story',
  lines: [
    '**Plum pudding model** (Thomson): a ball of **positive charge** with **electrons** embedded in it.',
    '**Alpha scattering:** most α particles passed **straight through** (atom is mostly **empty space**); a few were **deflected**; a very few **bounced back** (a tiny, dense, **positive nucleus**).',
    '**Rutherford model:** a small positive **nucleus** with electrons around it.',
    '**Bohr:** electrons orbit at **set distances** (energy levels). Later, **neutrons** were discovered (Chadwick).',
    'Models change when **new evidence** cannot be explained by the old model.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why some α particles bounced back.',
    steps: [['Charge', 'α particles and the nucleus are both positive'], ['Repel', 'close approach gives a large repulsive force'], ['Mass', 'nucleus is dense and massive'], ['Answer', 'α particle is turned back']] },
  qc: 'Which observation showed that most of the atom is **empty space**?',
  notes: 'QUICK CHECK ANSWER: most alpha particles passed straight through the foil without being deflected (1).\nSpec 6.1 (history of the atomic model).',
}), '6.1 The atomic model');

// ======================= 7 ISOTOPES =======================
{
  const s = D.contentHeader('Isotopes and nuclear notation', `Specification ${sp('6.3')}–${sp('6.6')} • mass number, atomic number, particles`, { tag: '6.3–6.6' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'isotopes of carbon: same protons, different neutrons');
  label(s, 0.7, 1.45, 5.6, `**${nuc(12, 6, 'C')}**   and   **${nuc(14, 6, 'C')}**`, { size: 28, h: 0.7, color: C.ink });
  label(s, 0.7, 2.2, 2.8, 'top: **mass (nucleon) number A**\n= protons + neutrons', { size: 10.5, h: 0.55, color: C.red });
  label(s, 3.5, 2.2, 2.8, 'bottom: **atomic (proton) number Z**\n= protons', { size: 10.5, h: 0.55, color: C.blue });
  nucleus(s, 2.0, 3.85, 6, 6, 0.09); nucleus(s, 4.8, 3.85, 6, 8, 0.09);
  label(s, 1.0, 4.6, 2.0, 'carbon-12: 6 p, 6 n', { size: 10.5, bold: true, h: 0.3 }); label(s, 3.8, 4.6, 2.0, 'carbon-14: 6 p, 8 n', { size: 10.5, bold: true, h: 0.3 });
  const rows = [[{ text: 'Particle', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Relative mass', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Relative charge', options: { bold: true, color: C.white, fill: { color: C.ink } } }],
    ...[['proton', '1', '+1'], ['neutron', '1', '0'], ['electron', 'about 1/2000 (≈ 0)', '−1'], ['positron', 'about 1/2000 (≈ 0)', '+1']].map(([a, b, c], i) => [a, b, c].map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.white : C.cardBlue } } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.8, 2.4, 1.88], fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 }, rowH: 0.42 });
  D.card(s, 6.8, 3.55, 6.08, 2.7, 'Key ideas', [
    'Each element has a characteristic **number of protons** (positive charge of the nucleus).',
    '**Isotopes** are atoms of the same element with **different numbers of neutrons** (different mass numbers).',
    'Atoms are **neutral**: number of protons = number of electrons.',
    'neutrons = **A − Z**.',
  ], { size: 12 });
  D.quickCheck(s, `How many protons, neutrons and electrons are in an atom of **${nuc(235, 92, 'U')}**?`);
  D.notes(s, 'QUICK CHECK ANSWER: 92 protons, 143 neutrons, 92 electrons (1 each).\nSpec 6.3–6.6. The positron is the antiparticle of the electron (needed for β⁺ decay).');
  reg(s, '6.3–6.6 Isotopes');
}

// ======================= 8 ORBITS & IONS =======================
reg(D.contentSlide({
  title: 'Electron orbits and ions',
  subtitle: `Specification ${sp('6.7')}–${sp('6.9')} • absorbing and emitting EM radiation`,
  tag: '6.7–6.9', caption: 'an electron moving between orbits (energy levels)',
  draw: (s, p) => {
    const cx = 2.6, cy = 3.4; [0.6, 1.1, 1.6].forEach(R => ball(s, cx, cy, R, null, '9AA5B1', 1.25)); nucleus(s, cx, cy, 3, 3, 0.07);
    ball(s, cx + 0.6, cy, 0.08, C.blue, C.blue); ball(s, cx + 1.6, cy, 0.08, C.blue, C.blue, 1);
    arrow(s, cx + 0.7, cy - 0.1, cx + 1.5, cy - 0.1, '2E8B57', 2); label(s, cx + 0.5, cy - 0.55, 1.3, 'absorbs', { size: 10, bold: true, color: '2E8B57', h: 0.25 });
    arrow(s, cx + 1.5, cy + 0.12, cx + 0.7, cy + 0.12, C.red, 2); label(s, cx + 0.5, cy + 0.2, 1.3, 'emits', { size: 10, bold: true, color: C.red, h: 0.25 });
    const wv = []; for (let i = 0; i <= 40; i++) { const x = 4.4 + 1.4 * i / 40; wv.push([x, 2.4 - 0.12 * Math.sin(i / 40 * 6 * Math.PI)]); } for (let i = 0; i < wv.length - 1; i++) line(s, wv[i][0], wv[i][1], wv[i + 1][0], wv[i + 1][1], '2E8B57', 1.5);
    label(s, 4.3, 1.9, 1.9, 'EM radiation in', { size: 9.5, color: '2E8B57', h: 0.25 });
    const wv2 = []; for (let i = 0; i <= 40; i++) { const x = 4.4 + 1.4 * i / 40; wv2.push([x, 4.4 - 0.12 * Math.sin(i / 40 * 6 * Math.PI)]); } for (let i = 0; i < wv2.length - 1; i++) line(s, wv2[i][0], wv2[i][1], wv2[i + 1][0], wv2[i + 1][1], C.red, 1.5);
    label(s, 4.3, 4.55, 1.9, 'EM radiation out', { size: 9.5, color: C.red, h: 0.25 });
  },
  head: 'Key ideas',
  lines: [
    'Electrons orbit the nucleus at **set distances** (energy levels or shells).',
    'An electron moves to a **higher** orbit (further out) when it **absorbs** EM radiation.',
    'It falls back to a **lower** orbit by **emitting** EM radiation (e.g. light).',
    'If an outer electron absorbs enough energy, it **leaves the atom**: the atom becomes a **positive ion** (more protons than electrons). This is **ionisation**.',
  ],
  worked: { head: 'Explain', q: 'Why does an atom become positive when it loses an electron?',
    steps: [['Before', 'protons = electrons: neutral'], ['Lose', 'one negative electron removed'], ['After', 'one more proton than electrons'], ['Answer', 'overall charge +1: a positive ion']] },
  qc: 'What happens to an electron when the atom **absorbs** EM radiation?',
  notes: 'QUICK CHECK ANSWER: it moves to a higher orbit / energy level further from the nucleus (1) (or leaves the atom if it gains enough energy: ionisation).\nSpec 6.7–6.9.',
}), '6.7–6.9 Orbits and ions');

// ======================= 9 RECAP 1 =======================
const R1 = D.recapSlide(1, '6.1–6.9 • atoms and isotopes', [
  { q: 'Describe the plum pudding model of the atom.', marks: 2, ms: 'Sphere / ball of positive charge (1); with electrons embedded / spread through it (1).' },
  { q: `State the number of neutrons in ${nuc(37, 17, 'Cl')}.`, marks: 1, ms: '20 (1).' },
  { q: 'Explain what is meant by isotopes.', marks: 2, ms: 'Atoms of the same element / same number of protons (1); different numbers of neutrons (1).' },
  { q: 'Give the relative mass and relative charge of a positron.', marks: 2, ms: 'Mass about 1/2000 / almost zero (1); charge +1 (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 10 TYPES OF RADIATION =======================
{
  const s = D.contentHeader('Nuclear radiation', `Specification ${sp('6.10')}, ${sp('6.11')}, ${sp('6.15')} • what unstable nuclei emit`, { tag: '6.10–6.15' });
  const rows = [[{ text: 'Radiation', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'What it is', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Symbol', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Charge', options: { bold: true, color: C.white, fill: { color: C.ink } } }],
    ...[['alpha (α)', 'helium nucleus: 2 protons + 2 neutrons', nuc(4, 2, 'α'), '+2'], ['beta minus (β⁻)', 'electron emitted from the nucleus', nuc(0, '-1', 'β'), '−1'], ['beta plus (β⁺)', 'positron emitted from the nucleus', nuc(0, 1, 'β'), '+1'], ['gamma (γ)', 'high-frequency EM radiation', nuc(0, 0, 'γ'), '0'], ['neutron (n)', 'a neutron', nuc(1, 0, 'n'), '0']]
      .map(([a, b, c, d], i) => [a, b, c, d].map((t, j) => ({ text: t, options: { bold: j === 0, fontSize: j === 2 ? 15 : 12.5, fill: { color: i % 2 ? C.white : C.cardBlue } } })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 8.0, colW: [2.0, 3.8, 1.2, 1.0], fontFace: 'Calibri', fontSize: 12.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 }, rowH: 0.62 });
  D.card(s, 8.7, 1.3, 4.18, 3.75, 'Key ideas', [
    'Unstable nuclei emit radiation to become more stable: **radioactive decay**.',
    'Decay is **random**: you cannot predict **when** a particular nucleus will decay.',
    'α, β⁻, β⁺ and γ are **ionising**: they knock electrons out of atoms.',
  ], { size: 12 });
  D.workedSteps(s, 0.45, 5.15, 12.43, 1.1, 'Remember', '', [['Gamma', 'no mass and no charge: the nucleus loses energy but keeps the same A and Z']], { size: 12 });
  D.quickCheck(s, 'What is an alpha particle made of? What is a beta-minus particle?');
  D.notes(s, 'QUICK CHECK ANSWER: alpha: 2 protons and 2 neutrons / a helium nucleus (1); beta minus: a (fast) electron emitted from the nucleus (1).\nSpec 6.10, 6.11, 6.15.');
  reg(s, '6.10–6.15 Types of radiation');
}

// ======================= 11 PENETRATION & IONISATION =======================
reg(D.contentSlide({
  title: 'Penetration and ionisation',
  subtitle: `Specification ${sp('6.16')} • comparing alpha, beta and gamma`,
  tag: '6.16', caption: 'what stops each type of radiation',
  draw: (s, p) => {
    box(s, 2.6, 1.7, 0.08, 3.4, 'F5F1E8', '999999'); box(s, 3.9, 1.7, 0.22, 3.4, 'C9D0DA', '777777'); box(s, 5.2, 1.7, 0.6, 3.4, '777777', '444444');
    label(s, 2.1, 5.15, 1.1, 'paper', { size: 10, bold: true, h: 0.25 }); label(s, 3.45, 5.15, 1.2, 'aluminium (few mm)', { size: 9.5, bold: true, h: 0.45 }); label(s, 4.95, 5.15, 1.2, 'lead (several cm)', { size: 9.5, bold: true, h: 0.45 });
    ball(s, 1.0, 3.4, 0.25, 'F5C342', 'B8730A'); label(s, 0.6, 3.75, 0.8, 'source', { size: 9.5, h: 0.25 });
    arrow(s, 1.3, 2.4, 2.58, 2.4, radC.a, 3); label(s, 1.3, 2.0, 1.2, '**α**', { size: 14, color: radC.a, h: 0.35 });
    arrow(s, 1.3, 3.4, 3.88, 3.4, radC.b, 3); label(s, 1.5, 3.0, 1.2, '**β**', { size: 14, color: radC.b, h: 0.35 });
    arrow(s, 1.3, 4.4, 5.18, 4.4, radC.g, 3); line(s, 5.8, 4.4, 6.2, 4.4, radC.g, 1.5, { dash: 'dash' }); label(s, 1.5, 4.0, 1.2, '**γ**', { size: 14, color: radC.g, h: 0.35 });
  },
  head: 'Comparison',
  lines: [
    '**Alpha:** **most ionising**; least penetrating: stopped by **paper**, skin or a few cm of **air**.',
    '**Beta:** moderately ionising; stopped by a few mm of **aluminium**; range about 1 m in air.',
    '**Gamma:** **least ionising**; most penetrating: reduced by thick **lead** or concrete; travels far in air.',
    'The **more ionising** the radiation, the **less penetrating**: it loses energy quickly by ionising atoms.',
  ],
  worked: { head: 'Identify', q: 'A source gives a high count through paper but almost none through 5 mm aluminium. What does it emit?',
    steps: [['Paper', 'not stopped: no α detected (or not only α)'], ['Aluminium', 'stopped by aluminium'], ['So', 'beta radiation'], ['Answer', 'β (maybe some α too)']] },
  qc: 'Which radiation is **most ionising**? Which is **most penetrating**?',
  notes: 'QUICK CHECK ANSWER: alpha (1); gamma (1).\nSpec 6.16.',
}), '6.16 Penetration and ionisation');

// ======================= 12 BACKGROUND =======================
reg(D.contentSlide({
  title: 'Background radiation',
  subtitle: `Specification ${sp('6.12')}–${sp('6.13')} • radiation around us all the time`,
  tag: '6.12–6.13', caption: 'sources of background radiation in the UK (approximate)',
  draw: (s, p) => {
    pie(s, 2.3, 3.45, 1.55, BG);
    BG.forEach(([nm, v, col], i) => { const y = 1.8 + i * 0.5; box(s, 4.3, y, 0.3, 0.3, col, null); label(s, 4.7, y, 1.6, `${nm} ${v}%`, { size: 10, h: 0.3, align: 'left' }); });
  },
  head: 'Key ideas',
  lines: [
    '**Background radiation** is the low level of ionising radiation that is **always present** around us.',
    '**Natural sources:** **radon gas** from rocks, **ground and buildings**, **food and drink**, **cosmic rays** from space.',
    '**Man-made sources:** **medical** X-rays and treatments, nuclear weapons testing, nuclear accidents.',
    'In experiments, measure the background count first and **subtract** it from readings.',
  ],
  worked: { head: 'Correcting for background', q: 'A GM tube reads 150 counts/min near a source and 20 counts/min with no source.',
    steps: [['Background', '20 counts/min'], ['Subtract', '150 − 20'], ['Answer', '130 counts/min from the source']], size: 11 },
  workedH: 1.75,
  qc: 'Name the **largest** natural source of background radiation in the UK.',
  notes: 'QUICK CHECK ANSWER: radon gas (1).\nSpec 6.12–6.13. Pie values approximate UK shares (illustrative; check current data).',
}), '6.12–6.13 Background radiation');

// ======================= 13 DETECTING =======================
reg(D.contentSlide({
  title: 'Detecting radiation',
  subtitle: `Specification ${sp('6.14')} • photographic film and the Geiger–Müller tube`,
  tag: '6.14', caption: 'a Geiger–Müller tube connected to a counter',
  draw: (s, p) => {
    box(s, 0.9, 2.5, 2.6, 0.7, 'C9D0DA', '555555', { shape: SH.ROUNDED_RECTANGLE, r: 0.3, lw: 1.5 }); box(s, 0.85, 2.6, 0.12, 0.5, '333333', null);
    label(s, 0.9, 2.5, 2.6, 'GM tube', { size: 11, bold: true, h: 0.7 });
    line(s, 3.5, 2.85, 4.2, 2.85, C.ink, 2);
    box(s, 4.2, 2.3, 1.9, 1.1, '333333', '111111', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 }); box(s, 4.35, 2.45, 1.6, 0.5, 'B9F6CA', null); label(s, 4.35, 2.45, 1.6, '0 4 5 2', { size: 16, bold: true, h: 0.5 }); label(s, 4.2, 3.0, 1.9, 'counter', { size: 9.5, color: C.white, h: 0.3 });
    arrow(s, 0.3, 2.85, 0.83, 2.85, C.red, 2); label(s, 0.1, 2.4, 0.9, 'radiation', { size: 9, color: C.red, h: 0.25 });
    box(s, 1.0, 4.0, 2.0, 1.2, 'F5F1E8', '777777', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 }); box(s, 1.2, 4.25, 0.5, 0.7, '555555', null); box(s, 1.8, 4.25, 0.5, 0.7, 'B7C0CA', null); box(s, 2.4, 4.25, 0.4, 0.7, 'E8D5B0', null);
    label(s, 0.8, 5.25, 2.4, 'film badge with filters', { size: 10, bold: true, h: 0.3 });
    label(s, 3.4, 4.1, 2.8, 'film darkens more where more radiation reaches it', { size: 10, h: 0.6 });
  },
  head: 'Two methods',
  lines: [
    '**Geiger–Müller tube:** each time radiation enters and ionises the gas inside, a pulse is counted. Gives the **count rate** (counts per second or minute).',
    '**Photographic film:** **darkens** when exposed to radiation. Workers wear **film badges**; the darkening behind different filters shows the **type** and **dose** of radiation received.',
  ],
  worked: { head: 'Explain', q: 'Why does a film badge have windows of different materials?',
    steps: [['Open', 'all radiation reaches the film'], ['Aluminium', 'stops α and β'], ['Lead', 'only γ gets through, reduced'], ['Answer', 'shows which types the worker received']] },
  qc: 'What does a Geiger–Müller tube measure?',
  notes: 'QUICK CHECK ANSWER: the count rate / number of ionising events (radiation) detected per unit time (1).\nSpec 6.14.',
}), '6.14 Detecting radiation');

// ======================= 14 RECAP 2 =======================
const R2 = D.recapSlide(2, '6.10–6.16 • radiation types and background', [
  { q: 'Explain why alpha radiation is the most ionising.', marks: 2, ms: 'Large charge (+2) / large mass, slow (1); interacts strongly with atoms, removing electrons (1).' },
  { q: 'Give **two** natural sources of background radiation.', marks: 2, ms: 'Any two: radon gas; rocks / ground / buildings; cosmic rays; food and drink (1 each).' },
  { q: 'Describe how photographic film detects radiation.', marks: 1, ms: 'Film darkens when exposed to radiation (1).' },
  { q: 'Name the material needed to stop most gamma radiation.', marks: 1, ms: 'Thick lead / concrete (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 15 BETA DECAYS =======================
{
  const s = D.contentHeader('Beta minus, beta plus and gamma emission', `Specification ${sp('6.17')}–${sp('6.19')} • changes inside the nucleus`, { tag: '6.17–6.19' });
  const card = (x, title, col, eqn, txt) => { box(s, x, 1.3, 4.0, 3.75, C.cardBlue, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 2 }); label(s, x + 0.15, 1.4, 3.7, `**${title}**`, { size: 14, color: col, h: 0.4 }); label(s, x + 0.1, 1.9, 3.8, eqn, { size: 16, h: 0.6, bold: true }); s.addText(D.para(txt, { size: 11.5 }), { x: x + 0.2, y: 2.6, w: 3.6, h: 2.35, valign: 'top', margin: 0, fontFace: 'Calibri' }); };
  card(0.45, 'β⁻ decay', C.blue, 'neutron → proton + electron', ['A **neutron** turns into a **proton** and an **electron**; the electron is emitted.', 'Mass number **stays the same**; atomic number goes **up by 1**.', `e.g. ${nuc(14, 6, 'C')} → ${nuc(14, 7, 'N')} + ${nuc(0, '-1', 'e')}`]);
  card(4.67, 'β⁺ decay', C.red, 'proton → neutron + positron', ['A **proton** turns into a **neutron** and a **positron**; the positron is emitted.', 'Mass number **stays the same**; atomic number goes **down by 1**.', `e.g. ${nuc(18, 9, 'F')} → ${nuc(18, 8, 'O')} + ${nuc(0, 1, 'e')}`]);
  card(8.88, 'γ emission', '2E8B57', 'nucleus loses energy', ['After α or β decay, the nucleus often **rearranges** and loses energy as **gamma radiation**.', 'Mass number and atomic number **do not change**.', `e.g. ${nuc(60, 27, 'Co')}* → ${nuc(60, 27, 'Co')} + γ`]);
  D.workedSteps(s, 0.45, 5.2, 12.43, 1.05, 'Remember', '', [['β⁻', 'Z + 1 (new element up one); β⁺: Z − 1 (new element down one); A unchanged in both']], { size: 12 });
  D.quickCheck(s, 'In β⁻ decay, which particle in the nucleus changes, and what does it become?');
  D.notes(s, 'QUICK CHECK ANSWER: a neutron (1) becomes a proton (and an electron is emitted) (1).\nSpec 6.17–6.19. All equations balanced in the build script.');
  reg(s, '6.17–6.19 Beta and gamma decay');
}

// ======================= 16 NUCLEAR EQUATIONS =======================
{
  const s = D.contentHeader('Balancing nuclear equations', `Specification ${sp('6.20')}–${sp('6.21')} • mass number and atomic number must balance`, { tag: '6.20–6.21' });
  const rows = [[{ text: 'Decay', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Mass number A', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Atomic number Z', options: { bold: true, color: C.white, fill: { color: C.ink } } }],
    ...[['α', '− 4', '− 2'], ['β⁻', 'no change', '+ 1'], ['β⁺', 'no change', '− 1'], ['γ', 'no change', 'no change'], ['neutron', '− 1', 'no change']].map(([a, b, c], i) => [a, b, c].map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.white : C.cardBlue } } })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 6.1, colW: [1.6, 2.25, 2.25], fontFace: 'Calibri', fontSize: 13, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 }, rowH: 0.45 });
  D.workedSteps(s, 0.45, 4.15, 6.1, 2.1, 'My turn', `${nuc(238, 92, 'U')} decays by alpha emission.`, [['A', '238 − 4 = 234'], ['Z', '92 − 2 = 90 (thorium, Th)'], ['Answer', `${nuc(238, 92, 'U')} → ${nuc(234, 90, 'Th')} + ${nuc(4, 2, 'He')}`]], { size: 12.5 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    `**1** Complete: ${nuc(210, 84, 'Po')} → ? + ${nuc(4, 2, 'He')}  (Pb is element 82)`,
    `**2** Complete: ${nuc(90, 38, 'Sr')} → ? + ${nuc(0, '-1', 'e')}  (Y is element 39)`,
    `**3** Complete: ${nuc(22, 11, 'Na')} → ? + ${nuc(0, 1, 'e')}  (Ne is element 10)`,
    `**4** ${nuc(226, 88, 'Ra')} becomes ${nuc(222, 86, 'Rn')}. Which radiation was emitted?`,
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'What happens to the mass number and atomic number when a nucleus emits **gamma**?');
  D.notes(s, `YOUR TURN ANSWERS: 1) ${nuc(206, 82, 'Pb')}. 2) ${nuc(90, 39, 'Y')}. 3) ${nuc(22, 10, 'Ne')}. 4) alpha (A − 4, Z − 2).\nQUICK CHECK: neither changes.\nAll equations checked for mass and charge in the build script.`);
  reg(s, '6.20–6.21 Nuclear equations');
}

// ======================= 17 RECAP 3 =======================
const R3 = D.recapSlide(3, '6.17–6.21 • decay and nuclear equations', [
  { q: 'Describe what happens in the nucleus during β⁺ decay.', marks: 2, ms: 'A proton changes into a neutron (1); a positron is emitted (1).' },
  { q: `Complete the equation: ${nuc(14, 6, 'C')} → ${nuc(14, 7, 'N')} + ?`, marks: 1, ms: `${nuc(0, '-1', 'e')} / beta-minus particle / electron (1).` },
  { q: 'Explain why gamma emission does not change the element.', marks: 2, ms: 'Gamma has no charge / no mass (1); so the number of protons (atomic number) does not change (1).' },
  { q: 'A nucleus emits an alpha particle. State the change in its mass number and atomic number.', marks: 2, ms: 'Mass number decreases by 4 (1); atomic number decreases by 2 (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 18 HALF-LIFE =======================
reg(D.contentSlide({
  title: 'Activity and half-life',
  subtitle: `Specification ${sp('6.22')}–${sp('6.25')} • random decay, predictable half-life`,
  tag: '6.22–6.25', caption: 'activity of a sample with a half-life of 6 hours',
  draw: (s, p) => {
    const g = { x: 1.35, y: 1.6, w: 4.6, h: 3.3, xmin: 0, xmax: 24, xstep: 6, ymin: 0, ymax: 800, ystep: 200, xlabel: 'Time (hours)', ylabel: 'Activity (Bq)', grid: true };
    axes(s, g); fnLine(s, g, t => halfAfter(800, 6, t), 0, 24, 80, C.red, 2.5);
    [[6, 400], [12, 200]].forEach(([t, a]) => { line(s, px(g, 0), py(g, a), px(g, t), py(g, a), C.blue, 1.25, { dash: 'dash' }); line(s, px(g, t), py(g, a), px(g, t), py(g, 0), C.blue, 1.25, { dash: 'dash' }); });
    label(s, px(g, 6) + 0.05, py(g, 400) - 0.3, 1.5, 'half-life = 6 h', { size: 10, bold: true, color: C.blue, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    '**Activity** is the number of nuclei that decay **per second**, measured in **becquerels (Bq)**. 1 Bq = 1 decay per second.',
    'The activity of a source **decreases** over time as fewer unstable nuclei remain.',
    '**Half-life:** the time taken for **half** the undecayed nuclei to decay, or for the **activity** to **halve**.',
    'Decay is **random**: we cannot predict when **one** nucleus will decay, but with **very large numbers** the half-life lets us **predict** the activity.',
  ],
  worked: { head: 'Read the graph', q: 'Find the half-life from the graph.',
    steps: [['Start', 'activity 800 Bq'], ['Half', 'find 400 Bq on the curve'], ['Read', 'time = 6 hours'], ['Answer', 'half-life = 6 h (400 → 200 also takes 6 h)']] },
  qc: 'What is the unit of **activity**? What does 1 unit mean?',
  notes: 'QUICK CHECK ANSWER: becquerel, Bq (1); one decay per second (1).\nSpec 6.22–6.25. Curve: A = 800 × 0.5^(t/6) (asserted).',
}), '6.22–6.25 Activity and half-life');

// ======================= 19 HALF-LIFE CALCS (HT part) =======================
{
  const s = D.contentHeader('Half-life calculations', `Specification ${sp('6.26')} • including the net decline as a ratio (HT)`, { tag: '6.26', ht: true });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A sample has an activity of **800 Bq** and a half-life of **6 hours**. Find the activity after **24 hours** and the net decline (HT).',
    [['Half-lives', '24 ÷ 6 = 4'], ['Halve', '800 → 400 → 200 → 100 → 50'], ['Activity', '**50 Bq**'], ['HT ratio', 'remaining = (½)⁴ = 1/16; net decline = 15/16'], ['Answer', '50 Bq; decline 750 Bq (15/16)']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A source has a count rate of **1200 counts/min** and a half-life of **2 hours**. What is it after **8 hours**?',
    '**2** Activity falls from **640 Bq** to **40 Bq**. The half-life is **5 days**. How long did it take?',
    '**3** What fraction of the original nuclei remain after **5** half-lives?',
    '**4 (HT)** Express the net decline after **2** half-lives as a ratio of the original activity.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'A sample of **3200** nuclei has a half-life of **10 minutes**. How many are left after **30 minutes**?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 4 half-lives: 1200 → 75 counts/min. 2) 640 → 40 is 4 half-lives = 20 days. 3) 1/32. 4) 3/4 (0.75) of the original has decayed (net decline ratio 3 : 4).\nQUICK CHECK: 3 half-lives → 3200 ÷ 8 = 400.\nSpec 6.26 (net decline ratio is Higher only).');
  reg(s, '6.26 Half-life calculations (HT part)');
}

// ======================= 20 DANGERS =======================
reg(D.contentSlide({
  title: 'Dangers: contamination and irradiation',
  subtitle: `Specification ${sp('6.27')}–${sp('6.28')} • tissue damage, mutations and precautions`,
  tag: '6.27–6.28', caption: 'irradiation (left) and contamination (right)',
  draw: (s, p) => {
    ball(s, 1.0, 2.6, 0.25, 'F5C342', 'B8730A'); for (let k = -1; k <= 1; k++) arrow(s, 1.3, 2.6 + k * 0.2, 2.2, 2.6 + k * 0.45, C.red, 1.5);
    person(s, 2.6, 4.2); label(s, 0.6, 4.4, 2.6, '**irradiation**: exposed to radiation from an **outside** source', { size: 10, h: 0.75, valign: 'top' });
    person(s, 5.0, 4.2); [[4.85, 3.4], [5.1, 3.6], [5.0, 3.15], [4.8, 3.85]].forEach(([x, y]) => ball(s, x, y, 0.06, 'F5C342', 'B8730A'));
    label(s, 3.6, 4.4, 2.7, '**contamination**: radioactive atoms get **on or inside** the body', { size: 10, h: 0.75, valign: 'top' });
  },
  head: 'Key ideas',
  lines: [
    'Ionising radiation can **damage tissue** and cause **mutations** in DNA, which may lead to **cancer**.',
    '**Irradiation:** stops when you move away from or **shield** the source; you do not become radioactive.',
    '**Contamination:** the source stays **on or in** you, so exposure **continues**. Inside the body, **alpha** is most dangerous (highly ionising, all absorbed by nearby cells).',
    'Outside the body, **beta and gamma** are more dangerous (they penetrate the skin).',
    '**Precautions:** keep exposure time short; keep a **distance** (tongs); use **shielding** (lead); wear gloves; store sources in lead-lined boxes.',
  ],
  worked: { head: 'Explain', q: 'Why is an alpha source safe in a box but very dangerous if swallowed?',
    steps: [['Outside', 'alpha stopped by air, box or skin'], ['Inside', 'no barrier between it and cells'], ['Ionising', 'alpha is strongly ionising'], ['Answer', 'severe damage to nearby tissue']] },
  qc: 'Give **two** precautions a teacher takes when using a radioactive source.',
  notes: 'QUICK CHECK ANSWER: any two: handle with tongs / keep at arm’s length; point away from people; minimise time; store in a lead-lined box; wash hands (1 each).\nSpec 6.27–6.28 (search listing shows contamination vs irradiation under a P heading; treated here as both courses: check).',
}), '6.27–6.28 Dangers');

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, '6.22–6.28 • half-life and dangers', [
  { q: 'Define **half-life**.', marks: 1, ms: 'Time for half the (undecayed) nuclei to decay / activity to halve (1).' },
  { q: 'A source has an activity of 3200 Bq. Its half-life is 2 days. Calculate the activity after 6 days.', marks: 2, ms: '3 half-lives (1); 3200 ÷ 8 = 400 Bq (1).' },
  { q: 'Explain the difference between contamination and irradiation.', marks: 2, ms: 'Contamination: radioactive material gets on / into the body (1); irradiation: exposed to radiation from an external source (1).' },
  { q: 'Explain why radioactive decay is described as random.', marks: 2, ms: 'Cannot predict when a particular nucleus will decay (1); not affected by temperature etc. / each nucleus has the same chance (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 USES (P) =======================
{
  const s = D.contentHeader('Uses of radioactivity', `Specification ${sp('6.29')} • choosing the right isotope`, { tag: sp('6.29'), p: true });
  const rows = [[{ text: 'Use', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Radiation', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Why it works', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Half-life', options: { bold: true, color: C.white, fill: { color: C.ink } } }],
    ...[['Smoke alarm', 'alpha', 'ionises air so a current flows; smoke absorbs α and the current drops', 'long (years)'],
      ['Irradiating food', 'gamma', 'kills bacteria; food does not become radioactive', 'long'],
      ['Sterilising equipment', 'gamma', 'penetrates packaging; kills microbes', 'long'],
      ['Thickness gauging', 'beta (paper) / gamma (steel)', 'count rate changes if thickness changes', 'long'],
      ['Tracers', 'gamma (or beta)', 'detected outside the body or pipe to show leaks / blockages', 'short (hours)'],
      ['Cancer diagnosis and treatment', 'gamma (or beta)', 'images tumours; kills cancer cells', 'short (hours–days)']]
      .map(([a, b, c, d], i) => [a, b, c, d].map((t, j) => ({ text: t, options: { bold: j === 0, color: j === 1 ? C.blue : C.text, fill: { color: i % 2 ? C.white : C.cardBlue } } })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.6, 2.3, 5.6, 1.93], fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 }, rowH: 0.56 });
  D.workedSteps(s, 0.45, 5.35, 12.43, 0.9, 'Choosing a source', '', [['Rule', 'match penetration to the job; long half-life if it must last; short half-life if it goes into the body']], { size: 12 });
  D.quickCheck(s, 'Explain why **alpha** is used in a smoke alarm rather than gamma.');
  D.notes(s, 'QUICK CHECK ANSWER: alpha is highly ionising so ionises the air to allow a current (1); it is easily absorbed by smoke, so smoke changes the current (and alpha cannot escape the alarm) (1).\nSpec 6.29P (physics only; number medium-low confidence).');
  reg(s, '6.29P Uses (PHYSICS ONLY)');
}

// ======================= 23 MEDICAL (P) =======================
reg(D.contentSlide({
  title: 'Radiation in medicine',
  subtitle: `Specification ${sp('6.30')}–${sp('6.35')} • diagnosis, treatment and safety`,
  tag: `${sp('6.30')}–${sp('6.35')}`, p: true, caption: 'external radiotherapy: gamma beams from several directions meet at the tumour',
  draw: (s, p) => {
    oval(s, 3.4, 3.5, 3.4, 2.4, 'F2D0B8', 'B5655B', { lw: 2 }); ball(s, 3.6, 3.4, 0.25, '8E44AD', '5E2D73', 1.5); label(s, 3.9, 3.35, 1.2, 'tumour', { size: 10, bold: true, color: '5E2D73', h: 0.25, align: 'left' });
    [[0.8, 1.8], [6.0, 1.8], [3.6, 1.5]].forEach(([x, y]) => { box(s, x - 0.25, y - 0.2, 0.5, 0.4, '555555', '333333'); arrow(s, x, y + 0.2, 3.6 + (x - 3.6) * 0.1, 3.4 - 0.2, radC.g, 2.5); });
    label(s, 0.7, 5.0, 5.6, 'healthy tissue gets a small dose; the tumour gets a large one', { size: 10.5, h: 0.4 });
  },
  head: 'Key ideas',
  lines: [
    '**Exploring internal organs (diagnosis):** a **tracer** (gamma emitter, short half-life) is injected or swallowed; a gamma camera outside detects where it goes. **PET scans** use positron emitters.',
    '**PET isotopes** have very **short half-lives**, so they must be **made close to** the hospital and used quickly.',
    '**External treatment:** gamma beams from **several directions** focus on the tumour.',
    '**Internal treatment:** a source (e.g. beta emitter) is placed **inside** or next to the tumour, so less healthy tissue is exposed.',
    '**Dangers depend on half-life:** short half-life → high activity but soon gone; long → stays radioactive for a long time. **Precautions:** limit patient dose; staff use shielding, distance and short times; film badges.',
  ],
  worked: { head: 'Compare', q: 'Why is a short half-life chosen for a medical tracer?',
    steps: [['Enough', 'active long enough to take images'], ['Safe', 'activity falls quickly afterwards'], ['Dose', 'patient receives a low total dose'], ['Answer', 'diagnosis with minimal harm']] },
  qc: 'Why must isotopes for **PET scans** be produced close to the hospital?',
  notes: 'QUICK CHECK ANSWER: they have very short half-lives (1); so they would decay before reaching the patient if transported far (1).\nSpec 6.30P–6.35P (physics only; 6.33P and 6.35P confirmed by search listing).',
}), '6.30P–6.35P Medical uses (PHYSICS ONLY)');

// ======================= 24 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('6.29')}–${sp('6.35')} • uses and medical physics`, [
  { q: 'Explain why gamma is used to sterilise medical equipment.', marks: 2, ms: 'Penetrates packaging (1); kills bacteria / microbes (1).' },
  { q: 'Explain why a tracer for a medical scan should emit gamma rather than alpha.', marks: 2, ms: 'Gamma can pass out of the body to be detected (1); alpha would be absorbed / is highly ionising and harmful inside (1).' },
  { q: 'Compare internal and external radiotherapy.', marks: 3, ms: 'External: beams from outside / from several directions (1); internal: source placed in or near tumour (1); internal exposes less healthy tissue but patient is radioactive for a time (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 25 NUCLEAR POWER (P) =======================
{
  const s = D.contentHeader('Nuclear power: advantages and disadvantages', `Specification ${sp('6.36')} • evaluate its use for generating electricity`, { tag: sp('6.36'), p: true });
  D.card(s, 0.45, 1.3, 4.0, 4.95, '+ Advantages', [
    '**No CO₂** (or SO₂) emissions when generating: no contribution to climate change.',
    'Huge energy from a **small mass** of fuel.',
    '**Reliable**: runs all the time, not dependent on weather.',
    'Fuel reserves last a long time.',
  ], { size: 12.5, fill: 'E8F5EC', border: 'A7D7B5' });
  D.card(s, 4.65, 1.3, 4.0, 4.95, '− Disadvantages', [
    '**Radioactive waste**: some stays dangerous for thousands of years; needs safe long-term storage.',
    'Risk of **accidents** (Chernobyl, Fukushima) releasing radioactive material.',
    'Very **expensive** to build and to **decommission**.',
    '**Public perception**: many people fear nuclear power; security risks.',
  ], { size: 12.5, fill: 'FBE5E6', border: 'E9A9AE' });
  D.workedSteps(s, 8.85, 1.3, 4.03, 4.95, 'Exam technique: evaluate', 'Evaluate nuclear power. (6 marks)', [['For', 'low carbon; reliable; little fuel'], ['Against', 'waste; accidents; cost'], ['Safety', 'modern designs; strict regulation'], ['Answer', 'balanced points + a justified judgement']], { size: 12 });
  D.quickCheck(s, 'Give **one** environmental advantage and **one** environmental disadvantage of nuclear power.');
  D.notes(s, 'QUICK CHECK ANSWER: advantage: no CO₂ / greenhouse gas emissions (1); disadvantage: long-lived radioactive waste / risk of contamination from accidents (1).\nSpec 6.36P (physics only; within the 6.36P–6.45P range confirmed by search).');
  reg(s, '6.36P Nuclear power (PHYSICS ONLY)');
}

// ======================= 26 FISSION & CHAIN REACTION (P) =======================
reg(D.contentSlide({
  title: 'Nuclear fission and chain reactions',
  subtitle: `Specification ${sp('6.37')}–${sp('6.38')} • splitting uranium-235`,
  tag: `${sp('6.37')}–${sp('6.38')}`, p: true, caption: 'a neutron is absorbed; the nucleus splits and releases more neutrons',
  draw: (s, p) => {
    const nn = (x, y) => ball(s, x, y, 0.08, '9AA5B1', '555555');
    nn(0.8, 3.4); arrow(s, 0.9, 3.4, 1.55, 3.4, C.ink, 1.5);
    nucleus(s, 1.95, 3.4, 18, 22, 0.06); label(s, 1.45, 3.95, 1.0, 'U-235', { size: 10, bold: true, h: 0.25 });
    arrow(s, 2.4, 3.4, 2.9, 3.4, C.red, 2);
    ball(s, 3.4, 2.75, 0.3, 'F5B7B1', C.red, 1); label(s, 2.9, 2.25, 1.0, 'Ba-141', { size: 9.5, h: 0.25 });
    ball(s, 3.4, 4.05, 0.26, 'F5D7A8', 'B8730A', 1); label(s, 2.9, 4.4, 1.0, 'Kr-92', { size: 9.5, h: 0.25 });
    [[4.0, 3.0], [4.1, 3.4], [4.0, 3.8]].forEach(([x, y]) => { nn(x, y); });
    [[4.1, 3.0, 5.0, 2.1], [4.2, 3.4, 5.0, 3.4], [4.1, 3.8, 5.0, 4.7]].forEach(([a, b, c, d]) => { arrow(s, a, b, c, d, C.ink, 1.5); nucleus(s, c + 0.3, d, 5, 6, 0.045); });
    label(s, 4.2, 5.05, 2.0, 'each new neutron can split another nucleus', { size: 9.5, h: 0.5 });
    label(s, 2.4, 3.0, 0.8, 'energy', { size: 9.5, bold: true, color: C.red, h: 0.25 });
  },
  head: 'Key ideas',
  lines: [
    '**Fission:** a large unstable nucleus (e.g. **uranium-235**) **absorbs a neutron**, becomes unstable and **splits** into two smaller **daughter nuclei**, releasing **2 or 3 neutrons**, gamma rays and a lot of **energy**.',
    `Example: ${nuc(235, 92, 'U')} + ${nuc(1, 0, 'n')} → ${nuc(141, 56, 'Ba')} + ${nuc(92, 36, 'Kr')} + 3 ${nuc(1, 0, 'n')}`,
    '**Chain reaction:** the released neutrons go on to split more nuclei, so the number of fissions **grows rapidly**.',
    'In a **bomb** the chain reaction is **uncontrolled**; in a **reactor** it is **controlled**.',
  ],
  worked: { head: 'Check the equation', q: 'Show that the fission equation balances.',
    steps: [['A', '235 + 1 = 141 + 92 + 3 = 236'], ['Z', '92 + 0 = 56 + 36 + 0 = 92'], ['Answer', 'both mass and charge balance']], size: 11 },
  workedH: 1.75,
  qc: 'What must a uranium-235 nucleus absorb before it undergoes fission?',
  notes: 'QUICK CHECK ANSWER: a (slow-moving / thermal) neutron (1).\nSpec 6.37P–6.38P (physics only). Equation balanced in the build script. With 3 neutrons per fission, generation 4 has 81 fissions (unchecked growth).',
}), '6.37P–6.38P Fission (PHYSICS ONLY)');

// ======================= 27 REACTOR (P) =======================
reg(D.contentSlide({
  title: 'Inside a nuclear reactor',
  subtitle: `Specification ${sp('6.39')}–${sp('6.42')} • controlling the chain reaction`,
  tag: `${sp('6.39')}–${sp('6.42')}`, p: true, caption: 'a nuclear power station (simplified)',
  draw: (s, p) => {
    box(s, 0.75, 2.0, 2.2, 3.0, 'C9D0DA', '555555', { shape: SH.ROUNDED_RECTANGLE, r: 0.15, lw: 2.5 }); label(s, 0.75, 4.6, 2.2, 'concrete shield', { size: 9, italic: true, h: 0.25 });
    box(s, 0.95, 2.2, 1.8, 2.3, 'BFD9F2', C.blueMid); label(s, 0.95, 2.22, 1.8, 'moderator (water / graphite)', { size: 8.5, h: 0.3 });
    [1.15, 1.75, 2.35].forEach(x => box(s, x, 2.7, 0.15, 1.6, 'F5B041', 'B8730A'));
    [1.45, 2.05].forEach(x => box(s, x, 1.7, 0.12, 2.3, '555555', '222222'));
    label(s, 0.55, 1.4, 1.6, 'control rods (boron)', { size: 9, bold: true, h: 0.3 }); label(s, 1.0, 4.35, 1.7, 'fuel rods', { size: 9, bold: true, color: 'B8730A', h: 0.25 });
    polyline(s, [[2.95, 2.6], [3.6, 2.6], [3.6, 3.8], [2.95, 3.8]], C.red, 3);
    box(s, 3.6, 2.3, 0.9, 1.8, 'FBE5E6', C.red); label(s, 3.6, 2.35, 0.9, 'heat exchanger', { size: 8.5, h: 0.5 });
    arrow(s, 4.5, 2.6, 5.0, 2.6, C.grey, 2); label(s, 4.45, 2.2, 0.7, 'steam', { size: 9, h: 0.25 });
    ball(s, 5.3, 2.6, 0.3, 'D6EAF8', '555555', 1.5); label(s, 4.95, 3.0, 0.8, 'turbine', { size: 9, h: 0.25 });
    line(s, 5.6, 2.6, 5.8, 2.6, C.ink, 3); box(s, 5.8, 2.35, 0.45, 0.5, '9AA5B1', '555555'); label(s, 5.55, 3.0, 0.9, 'generator', { size: 9, h: 0.25 });
  },
  head: 'How it works',
  lines: [
    '**Fuel rods** contain uranium-235.',
    'The **moderator** (water or graphite) **slows down** neutrons so they are more likely to be absorbed and cause fission.',
    '**Control rods** (e.g. boron) **absorb neutrons**. Lowering them in **slows** the chain reaction; raising them speeds it up. Ideally **one** neutron from each fission causes another fission.',
    'Energy released **heats** water (via a heat exchanger) to make **steam**, which turns a **turbine** and **generator**.',
    'The **concrete shield** absorbs radiation. Spent fuel is **radioactive waste**.',
  ],
  worked: { head: 'Explain', q: 'What happens if the control rods are lowered fully?',
    steps: [['Absorb', 'rods absorb most neutrons'], ['Fewer', 'fewer neutrons cause fission'], ['Chain', 'chain reaction stops'], ['Answer', 'reactor shuts down']] },
  qc: 'Describe the job of the **moderator** and of the **control rods**.',
  notes: 'QUICK CHECK ANSWER: moderator slows neutrons down (so they can be absorbed by U-235) (1); control rods absorb neutrons to control the rate of fission (1).\nSpec 6.39P–6.42P (physics only).',
}), '6.39P–6.42P Nuclear reactor (PHYSICS ONLY)');

// ======================= 28 FUSION (P) =======================
reg(D.contentSlide({
  title: 'Nuclear fusion',
  subtitle: `Specification ${sp('6.43')}–${sp('6.45')} • joining light nuclei`,
  tag: `${sp('6.43')}–${sp('6.45')}`, p: true, caption: 'deuterium + tritium → helium + neutron + energy',
  draw: (s, p) => {
    nucleus(s, 1.2, 2.8, 1, 1, 0.1); label(s, 0.8, 3.2, 0.8, 'H-2', { size: 10, bold: true, h: 0.25 });
    nucleus(s, 1.2, 4.0, 1, 2, 0.1); label(s, 0.8, 4.45, 0.8, 'H-3', { size: 10, bold: true, h: 0.25 });
    arrow(s, 1.5, 2.9, 2.6, 3.3, C.ink, 1.5); arrow(s, 1.5, 3.9, 2.6, 3.5, C.ink, 1.5);
    ball(s, 3.0, 3.4, 0.35, 'FDEBD0', C.red, 1.5); label(s, 2.5, 3.85, 1.0, 'fuse', { size: 10, bold: true, color: C.red, h: 0.25 });
    arrow(s, 3.4, 3.2, 4.4, 2.7, C.ink, 1.5); arrow(s, 3.4, 3.6, 4.4, 4.1, C.ink, 1.5);
    nucleus(s, 4.8, 2.6, 2, 2, 0.1); label(s, 4.4, 3.0, 0.8, 'He-4', { size: 10, bold: true, h: 0.25 });
    ball(s, 4.7, 4.15, 0.1, '9AA5B1', '555555'); label(s, 4.85, 4.0, 1.2, 'neutron', { size: 10, h: 0.3, align: 'left' });
    label(s, 4.6, 3.25, 1.6, '+ energy', { size: 11, bold: true, color: C.red, h: 0.3, align: 'left' });
    label(s, 0.7, 5.0, 5.6, `${nuc(2, 1, 'H')} + ${nuc(3, 1, 'H')} → ${nuc(4, 2, 'He')} + ${nuc(1, 0, 'n')}`, { size: 14, h: 0.4 });
  },
  head: 'Key ideas',
  lines: [
    '**Fusion:** two **light nuclei** join to form a **heavier** nucleus, releasing **energy** (some mass is converted to energy).',
    'Fusion is the **energy source of stars**, e.g. hydrogen nuclei fusing to helium in the Sun.',
    'Fusion needs **very high temperatures and pressures**: nuclei are **positively charged** and **repel** (electrostatic repulsion), so they must move very fast and be close together to fuse.',
    'Fusion power stations are hard to build: it is difficult to reach and **contain** such high temperatures, and they use more energy than they produce so far.',
  ],
  worked: { head: 'Compare', q: 'Give two differences between fission and fusion.',
    steps: [['Fission', 'heavy nucleus splits'], ['Fusion', 'light nuclei join'], ['Conditions', 'fusion needs extreme temperature and pressure'], ['Answer', 'both release energy']] },
  qc: 'Why does fusion not happen at low temperatures and pressures?',
  notes: 'QUICK CHECK ANSWER: nuclei are positively charged and repel each other (1); at low temperature they do not have enough kinetic energy / are not close enough to overcome the repulsion (1).\nSpec 6.43P–6.45P (physics only; content confirmed by search listing). Equation balanced in the build script.',
}), '6.43P–6.45P Fusion (PHYSICS ONLY)');

// ======================= 29 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('6.36')}–${sp('6.45')} • fission and fusion`, [
  { q: 'Describe what happens during the fission of uranium-235.', marks: 3, ms: 'Absorbs a neutron (1); splits into two smaller (daughter) nuclei (1); releases 2–3 neutrons and energy (1).' },
  { q: 'Explain how control rods control the rate of fission.', marks: 2, ms: 'Absorb neutrons (1); fewer neutrons available to cause further fissions (1).' },
  { q: 'State where fusion happens naturally.', marks: 1, ms: 'In stars / the Sun (1).' },
  { q: 'Give **one** reason why nuclear power is not more widely used.', marks: 1, ms: 'Radioactive waste / accidents / cost / public perception (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 30 KEY WORDS =======================
reg(D.keyWords([
  ['Nucleus', 'Tiny positive centre: protons and neutrons.'],
  ['Isotopes', 'Same protons, different neutrons.'],
  ['Mass number', 'Protons + neutrons (A).'],
  ['Atomic number', 'Number of protons (Z).'],
  ['Ion', 'Atom that has lost or gained electrons.'],
  ['Alpha', 'Helium nucleus; most ionising; stopped by paper.'],
  ['Beta minus', 'Electron from the nucleus (n → p + e⁻).'],
  ['Beta plus', 'Positron from the nucleus (p → n + e⁺).'],
  ['Gamma', 'EM wave from the nucleus; most penetrating.'],
  ['Background', 'Radiation always present around us.'],
  ['Becquerel', 'Unit of activity: 1 decay per second.'],
  ['Half-life', 'Time for activity (or undecayed nuclei) to halve.'],
  ['Contamination', 'Radioactive material on or in the body.'],
  ['Irradiation', 'Exposure to radiation from an outside source.'],
  ['Fission', 'Heavy nucleus splits after absorbing a neutron.'],
  ['Fusion', 'Light nuclei join, releasing energy.'],
], { notes: 'Cover-and-recall. Physics-only terms: fission, fusion (and the uses/medical slides).' }), 'Summary: key words');

// ======================= 31 FULL QUESTION =======================
reg(D.fullQuestion(`Iodine-131 (${nuc(131, 53, 'I')}) is used to treat thyroid cancer. It decays by β⁻ emission with a half-life of 8 days.`, [
  { l: 'a', q: 'State the number of neutrons in an iodine-131 nucleus.', marks: 1, ms: '78 (1).' },
  { l: 'b', q: 'Describe what happens in the nucleus during β⁻ decay.', marks: 2, ms: 'A neutron changes into a proton (1); an electron is emitted (1).' },
  { l: 'c', q: 'Iodine-131 decays to xenon (Xe). Write the mass number and atomic number of the xenon nucleus.', marks: 2, ms: 'Mass number 131 (1); atomic number 54 (1).' },
  { l: 'd', q: 'A sample has an activity of 480 MBq. Calculate its activity after 24 days.', marks: 2, ms: '3 half-lives (1); 480 ÷ 8 = 60 MBq (1).' },
  { l: 'e', q: 'Explain why the patient should avoid close contact with others for a few days.', marks: 2, ms: 'Patient is radioactive / emitting radiation (1); others would be irradiated; risk of damage to cells (1).' },
  { l: 'f', q: 'Explain why a half-life of 8 days is suitable for this treatment.', marks: 4, ms: 'Long enough to give a dose that kills cancer cells (1); short enough that activity falls quickly afterwards (1); limits damage to healthy cells (1); patient is not radioactive for long / easier disposal (1).', h: 1.3 },
], 13, { subtitle: 'Specification 6.3, 6.17, 6.20, 6.26, 6.27, 6.30P • answer every part • 13 marks' }), 'Full question');
calc('FQ I-131 neutrons', 131 - 53, 78);
balance([[131, 53]], [[131, 54], [0, -1]], 'I-131 beta-');

// ======================= 32–33 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the particle that is identical to a helium nucleus.', marks: 1, ms: 'Alpha particle (1).' },
  { n: '2', q: 'A source’s activity falls from **1000 Bq** to **125 Bq** in **12 hours**. Calculate the half-life.', marks: 3, ms: '1000 → 500 → 250 → 125 = 3 half-lives (1); 12 ÷ 3 (1); = 4 hours (1).' },
  { n: '3', q: `Complete: ${nuc(234, 90, 'Th')} → ${nuc(234, 91, 'Pa')} + ?  Name the radiation emitted.`, marks: 2, ms: `${nuc(0, '-1', 'e')} (1); beta minus (1).` },
  { n: '4', q: 'Explain why alpha radiation is very dangerous inside the body but less dangerous outside it.', marks: 2, ms: 'Inside: highly ionising, absorbed by nearby cells causing damage (1); outside: stopped by skin / air (1).' },
  { n: '5', q: 'Describe how the model of the atom has changed over time and explain why.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
balance([[234, 90]], [[234, 91], [0, -1]], 'Th-234 beta- (HW)');
calc('HW half-life 12/3', 12 / 3, 4, 1e-12);
function levelsHW() {
  return D.levels6([
    'Plum pudding model: positive sphere with electrons embedded (Thomson).',
    'Alpha scattering experiment: alpha particles fired at thin gold foil.',
    'Most passed straight through: atom mostly empty space.',
    'Some deflected / a few bounced back: small, dense, positive nucleus.',
    'Rutherford model: nucleus with electrons around it.',
    'Bohr: electrons in fixed orbits / energy levels; later neutrons discovered (Chadwick).',
    'Models changed because new experimental evidence could not be explained by the old model.',
  ], 'Level 3 answers describe at least two models in order and link each change to evidence.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 14);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7);
assert(D.slideNo >= 30 && D.slideNo <= 38, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T6_Radioactivity.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
