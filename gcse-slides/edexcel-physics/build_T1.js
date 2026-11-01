// build_T1.js — Edexcel GCSE Physics 1PH0 Topic 1 Key concepts of physics (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T1.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 1,
  title: 'Key concepts of physics',
  shortTitle: 'T1',
  subtitle: 'SI units, prefixes, converting units, standard form and significant figures',
  specRange: '1.1–1.4',
  pOnly: [], // no physics-only statements: Topic 1 is identical in Combined Science 1SC0
  paper: 'Papers 1 and 2',
  keywords: ['SI units', 'Prefixes', 'Converting units', 'Standard form', 'Significant figures', 'Measurement'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH, W } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmtN = v => v.toLocaleString('en-GB').replace(/,/g, ' ');
const near = (a, b) => Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(b));

// ======================= DECK-SPECIFIC: equations from later topics used in the worked examples =======================
Object.assign(T.EQS, {
  sdt: { eq: 's = d ÷ t', words: 'average speed (m/s) = distance (m) ÷ time (s)   (Topic 2)', status: 'recall' },
  rho: { eq: 'ρ = m ÷ V', words: 'density (kg/m³) = mass (kg) ÷ volume (m³)   (Topic 14)', status: 'recall' },
  pFA: { eq: 'p = F ÷ A', words: 'pressure (Pa) = force normal to surface (N) ÷ area of surface (m²)   (Topic 15, physics only)', status: 'recall' },
});

// ======================= DECK-SPECIFIC drawing helpers =======================
const SKILL = (s, text, w) => D.pill(s, W - 0.45 - w, 0.32, text, C.green, w); // green pill for skills-appendix slides
// boxed node for flow diagrams
function node(s, x, y, w, h, t, fill = C.white, border = C.blue, o = {}) {
  box(s, x, y, w, h, fill, border, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, x, y, w, t, { h, size: o.size || 12, bold: true, color: o.color || C.ink });
}
// row of single-character cells (digits) starting at x; returns array of cell x-centres
function digits(s, x, y, chars, cw = 0.34, colors = []) {
  const cx = [];
  chars.split('').forEach((ch, i) => {
    const xx = x + i * cw;
    if (ch !== ' ') box(s, xx, y, cw - 0.03, 0.42, colors[i] === 'grey' ? 'EEF0F4' : colors[i] === 'blue' ? 'DCE6FB' : C.white, colors[i] === 'grey' ? 'C3C8D3' : C.line, { lw: 0.75 });
    label(s, xx, y, cw - 0.03, ch, { h: 0.42, size: 16, bold: true, color: colors[i] === 'grey' ? '9AA1B0' : colors[i] === 'blue' ? C.blue : C.ink });
    cx.push(xx + (cw - 0.03) / 2);
  });
  return cx;
}
// small "hop" arrow from x1 to x2 above (dy < 0) or below a row at height y
function hop(s, x1, x2, y, dy = -0.16, color = C.red) {
  const xm = (x1 + x2) / 2;
  line(s, x1, y, xm, y + dy, color, 1.25);
  arrow(s, xm, y + dy, x2, y, color, 1.25);
}
// arc made of short line segments (centre cx,cy, radius r, angles in degrees, 0 = right, anticlockwise positive)
function arc(s, cx, cy, r, a1, a2, color = C.ink, width = 1.5, n = 30) {
  for (let i = 0; i < n; i++) {
    const t1 = (a1 + (a2 - a1) * i / n) * Math.PI / 180, t2 = (a1 + (a2 - a1) * (i + 1) / n) * Math.PI / 180;
    line(s, cx + r * Math.cos(t1), cy - r * Math.sin(t1), cx + r * Math.cos(t2), cy - r * Math.sin(t2), color, width);
  }
}
// shooting target with hits [[dx,dy],...] in units of the outer radius
function target(s, cx, cy, r, hits, title, color) {
  [[1, 'FFFFFF'], [0.66, 'DCE6FB'], [0.33, 'F6C9CD']].forEach(([k, f]) => s.addShape(SH.OVAL, { x: cx - r * k, y: cy - r * k, w: 2 * r * k, h: 2 * r * k, fill: { color: f }, line: { color: '8C96A8', width: 1 } }));
  s.addShape(SH.OVAL, { x: cx - 0.04, y: cy - 0.04, w: 0.08, h: 0.08, fill: { color: C.red }, line: { color: C.red } });
  hits.forEach(([dx, dy]) => s.addShape(SH.OVAL, { x: cx + dx * r - 0.06, y: cy + dy * r - 0.06, w: 0.12, h: 0.12, fill: { color: C.ink }, line: { color: C.white, width: 0.75 } }));
  label(s, cx - 1.4, cy + r + 0.04, 2.8, title, { h: 0.3, size: 11, bold: true, color });
}

// ======================= CALCULATIONS (asserted) =======================
// starter
calc('starter 3.4*1000', 3.4 * 1000, 3400, 1e-9);
calc('starter speed 150/30', 150 / 30, 5);
calc('starter 100^2', 100 ** 2, 10000);
// 1.1 base units: 500 ms in s
const ms500 = calc('500 ms -> s', 500 * 1e-3, 0.5, 1e-12);
// 1.2 prefixes
const PREF = [['giga', 'G', 9], ['mega', 'M', 6], ['kilo', 'k', 3], ['', '', 0], ['centi', 'c', -2], ['milli', 'm', -3], ['micro', 'μ', -6], ['nano', 'n', -9]];
calc('4.7 kOhm', 4.7 * 1e3, 4700, 1e-9); calc('350 mA', 350 * 1e-3, 0.35, 1e-12);
calc('qc 2.4 GHz', 2.4e9, 2400000000, 1e-3); calc('qc 520 nm', 520 * 1e-9, 5.2e-7, 1e-20);
// prefixes in a calculation
const Ek = calc('kettle E = 2200*180', 2200 * (3.0 * 60), 396000, 1e-6);
assert.strictEqual(sf(Ek, 2), 400000);
const Vw = calc('V = 0.250*48', 0.250 * 48, 12, 1e-12);
const Vqc = calc('qc V = 0.40e-3*15e3', 0.40e-3 * 15e3, 6.0, 1e-12);
// 1.3 time and speed
const v72 = calc('72 km/h -> m/s', 72 * 1000 / 3600, 20, 1e-12);
calc('72/3.6', 72 / 3.6, 20, 1e-12);
const v54 = calc('qc 54/3.6', 54 / 3.6, 15, 1e-12), d54 = calc('qc d = 15*900', v54 * 15 * 60, 13500, 1e-9);
calc('1 h = 3600 s', 60 * 60, 3600);
// area and volume
calc('1 m2 in cm2', 100 * 100, 1e4); calc('1 m3 in cm3', 100 ** 3, 1e6); calc('1 m2 in mm2', 1000 * 1000, 1e6);
const A25 = calc('25 cm2 -> m2', 25 / 1e4, 0.0025, 1e-15);
const p25 = calc('p = 600/0.0025', 600 / A25, 240000, 1e-6);
const rhoQC = calc('qc rho = 0.540/2.0e-4', 0.540 / (200 / 1e6), 2700, 1e-6);
// kWh
const kWh = calc('1 kWh = 1000*3600', 1000 * 3600, 3.6e6, 1e-6);
const Eh = calc('heater 2.0 kW * 3.0 h', 2.0 * 3.0, 6.0, 1e-12);
const EhJ = calc('6.0 kWh in J', Eh * kWh, 2.16e7, 1e-3);
assert.strictEqual(sf(EhJ, 2), 2.2e7);
calc('qc charger 5.0*7200', 5.0 * 2.0 * 3600, 36000, 1e-9); calc('qc charger kWh', 5.0e-3 * 2.0, 0.010, 1e-15);
// 1.4 standard form
const tSun = calc('t = 1.5e11/3.0e8', 1.5e11 / 3.0e8, 500, 1e-9);
calc('qc 0.00000052', 0.00000052, 5.2e-7, 1e-20); calc('qc 6400000', 6400000, 6.4e6, 1e-6);
// significant figures
const R12 = calc('R = 12/0.35', 12 / 0.35, 34.285714285714285, 1e-9);
assert.strictEqual(sf(R12, 2), 34); assert.strictEqual(sf(R12, 3), 34.3);
const vBolt = calc('qc 100/9.58', 100 / 9.58, 10.438413361169102, 1e-9);
assert.strictEqual(sf(vBolt, 3), 10.4); assert.strictEqual(sf(vBolt, 2), 10);
// orders of magnitude
const OM = [ // [name, size in m, side, level]
  ['nucleus', 1.6e-15, -1, 1], ['atom', 1e-10, 1, 1], ['virus', 1e-7, -1, 1], ['red blood cell', 8e-6, 1, 2],
  ['person', 1.7, -1, 1], ['Mount Everest', 8.8e3, 1, 1], ['Earth (diameter)', 1.3e7, -1, 1], ['Earth to Sun', 1.5e11, 1, 1], ['Milky Way', 1e21, -1, 1],
];
const oom = v => Math.round(Math.log10(v));
assert.deepStrictEqual(OM.map(o => oom(o[1])), [-15, -10, -7, -5, 0, 4, 7, 11, 21]);
const hairAtoms = calc('hair/atom 1e-4/1e-10', 1e-4 / 1e-10, 1e6, 1e-3);
const earthPerson = calc('qc Earth/person', 1.3e7 / 1.7, 7647058.823529412, 1e-3);
assert.strictEqual(oom(earthPerson), 7);
// measurement
const RUL = [1.0, 4.3]; calc('ruler length', +(RUL[1] - RUL[0]).toFixed(1), 3.3, 1e-12);
const AMM = 0.65; calc('ammeter resolution 1.0/20', 1.0 / 20, 0.05, 1e-12);
const TR = [2.31, 2.35, 2.92, 2.33];
const meanT = calc('mean (2.31+2.35+2.33)/3', (2.31 + 2.35 + 2.33) / 3, 2.33, 1e-9);
const uncT = calc('half range (2.35-2.31)/2', (2.35 - 2.31) / 2, 0.02, 1e-9);
calc('zero error 25.6-0.4', 25.6 - 0.4, 25.2, 1e-9);
// recaps
calc('R2 2.5 h', 2.5 * 3600, 9000); calc('R2 E = 800*270', 800 * 4.5 * 60, 216000, 1e-6);
calc('R2 108/3.6', 108 / 3.6, 30, 1e-12); calc('R2 0.065 A in mA', 0.065 * 1000, 65, 1e-9);
calc('R3 15 cm2', 15 / 1e4, 1.5e-3, 1e-15); calc('R3 p = 60/2.0e-3', 60 / (20 / 1e4), 30000, 1e-6);
calc('R3 TV 0.150*4.0', 0.150 * 4.0, 0.60, 1e-12); calc('R3 TV J', 0.60 * 3.6e6, 2.16e6, 1e-3);
const R4r = calc('R4 9.0/0.26', 9.0 / 0.26, 34.61538461538461, 1e-9); assert.strictEqual(sf(R4r, 2), 35);
calc('R5 mean 4.2,4.4,4.3', (4.2 + 4.4 + 4.3) / 3, 4.3, 1e-9);
// full question
calc('FQ 2.0 kW', 2.0e3, 2000); const tFQ = calc('FQ t = 2*60+30', 2 * 60 + 30, 150);
const EFQ = calc('FQ E = 2000*150', 2000 * tFQ, 300000, 1e-6);
const kFQ = calc('FQ kWh', EFQ / 3.6e6, 0.08333333333333333, 1e-12); assert.strictEqual(sf(kFQ, 2), 0.083);
calc('FQ kWh alt 2.0*150/3600', 2.0 * 150 / 3600, kFQ, 1e-12);
const mFQ = calc('FQ mean', (152 + 149 + 151) / 3, 150.66666666666666, 1e-9); assert.strictEqual(sf(mFQ, 3), 151);
// homework
calc('HW 36/3.6', 36 / 3.6, 10, 1e-12); calc('HW 0.25 h', 0.25 * 3600, 900);
calc('HW Q = 0.120*300', 0.120 * 5.0 * 60, 36, 1e-9);
calc('HW V = 4*5*10', 4.0 * 5.0 * 10, 200, 1e-9); calc('HW rho = 1.6/2.0e-4', 1.6 / (200 / 1e6), 8000, 1e-6);
calc('HW paper 100 sheets 9.0 mm', 9.0 / 100, 0.09, 1e-12);

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Key Concepts of Physics',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • no Core Practical: measurement skills instead` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements in Topic 1' },
    { icon: '1', text: `Topic 1 of 15 • assessed on ${DECK.paper}` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 1 Key concepts of physics is a maths-skills toolkit: SI units (1.1), prefixes (1.2), converting units (1.3), significant figures and standard form (1.4). It is examined on BOTH papers and is identical in Combined Science 1SC0. There are no H statements, no equations of its own and no Core Practical. The measurement slides (19–21) cover the Working Scientifically / practical skills in the specification, which are assessed throughout both papers. See SPEC_T1.md for confidence notes.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '1.1', text: 'Recall and use the **seven SI base units** and the main **derived units** (N, J, W, Pa, C, V, Ω, Hz).' },
  { code: '1.2', text: 'Recall and use the **prefixes** giga, mega, kilo, centi, milli, micro and nano as **powers of ten**.' },
  { code: '1.3', text: 'Convert **time** (hours, minutes, seconds) and **speed** (km/h to m/s).' },
  { code: '1.3', text: 'Convert **areas and volumes** (cm², cm³ to m², m³) and **energy** (kWh to J).' },
  { code: '1.4', text: 'Write and calculate with numbers in **standard form**.' },
  { code: '1.4', text: 'Give answers to a sensible number of **significant figures**.' },
  { code: 'WS 4c', text: 'Use powers of ten to make **estimates** and compare **orders of magnitude**.' },
  { code: 'WS 2f, 3g', text: 'Read **scales**; use **resolution**, **means** and **anomalies**; explain **accuracy, precision** and **random and systematic error**.' },
], { subtitle: `Specification ${DECK.specRange} plus Working Scientifically skills • by the end of this topic you can…`, notes: 'No HT pills: Topic 1 has no Higher-only statements. WS = Working Scientifically section of the specification (codes as in the DfE subject content; see SPEC_T1.md). These are skills assessed across both papers, not Topic 1 statements.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 1 is assessed on Paper 1 and Paper 2`, { tag: 'Context' });
  const nodes = [
    ['1.1', 'SI base units and derived units', 'BOTH TIERS', C.blue],
    ['1.2', 'Prefixes from giga to nano', 'BOTH TIERS', C.blue],
    ['1.3', 'Converting units (time, speed, area, volume, energy)', 'BOTH TIERS', C.blue],
    ['1.4', 'Significant figures and standard form', 'BOTH TIERS', C.blue],
    ['WS 4c', 'Powers of ten and orders of magnitude', 'WS SKILL', C.green],
    ['WS 2f', 'Reading scales, resolution, means, anomalies', 'WS SKILL', C.green],
    ['WS 3g', 'Accuracy, precision, random and systematic error', 'WS SKILL', C.green],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 1\nKey concepts', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: col === C.green ? C.green : C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.3);
  });
  label(s, 0.45, 6.6, 6.6, 'Used everywhere: Topic 2 speed • Topic 4 waves • Topic 10 circuits • Topic 14 density • Topic 15 pressure', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 1 is tested on **both** 1PH0 papers (1F/1H and 2F/2H), usually inside questions on other topics.',
      'There are **no new equations** to recall in Topic 1 and **no Core Practical**.',
      'Marks are often lost for a **missing unit**, an **unconverted prefix** or too many **significant figures**.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**No physics-only statements:** Topic 1 is the same in Combined Science 1SC0, so Combined classes skip nothing.',
      '**No HT statements:** every slide is for both tiers.',
      '**Green pills** mark Working Scientifically skills from the specification’s skills section. They are examinable, but they are not Topic 1 statements.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Physics-only statements: none (Topic 1 1.1–1.4 is shared with 1SC0). Higher-only (H): none. Core Practical: none.\nThe measurement slides (reading scales, resolution, means and anomalies, accuracy and precision, errors) come from the Working Scientifically section of the spec and the maths skills appendix, not from Topic 1 itself. Orders of magnitude is Working Scientifically 4c (“use prefixes and powers of ten for orders of magnitude”) and maths skill 2h. See SPEC_T1.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'KS3 • forces', q: 'What is the **unit of force**? What is the unit of **energy**?' },
  { from: 'KS3 • speed', q: 'A cyclist travels **150 m** in **30 s**. Calculate the speed and give the unit.' },
  { from: 'KS3 maths • multiplying', q: 'Work out **3.4 × 1000** and **3.4 ÷ 1000**.' },
  { from: 'KS3 maths • rounding', q: 'Round **3.476** to **1 decimal place** and to **2 significant figures**.' },
  { from: 'KS3 maths • powers', q: 'Work out **10²**, **10³** and **100²**.' },
  { from: 'KS3 • time', q: 'How many **seconds** are there in **1 hour**?' },
], { subtitle: 'Recall from Key Stage 3 science and maths • 6 minutes • no notes', notes: 'ANSWERS\n1. Newton (N); joule (J).\n2. 150 ÷ 30 = 5 m/s.\n3. 3400; 0.0034.\n4. 3.5 (1 d.p.); 3.5 (2 s.f.). Point out that they happen to agree here but usually do not, e.g. 0.03476 → 0.0 (1 d.p.) but 0.035 (2 s.f.).\n5. 100; 1000; 10 000.\n6. 60 × 60 = 3600 s.' }), 'Retrieval starter');

// ======================= 5 SI BASE UNITS =======================
reg(D.contentSlide({
  title: 'SI base units',
  subtitle: `Specification ${sp('1.1')} • recall and use the SI unit for physical quantities`,
  tag: '1.1', caption: 'the seven SI base units; every other unit is built from these',
  draw: (s, p) => {
    const BU = [['length', 'metre', 'm'], ['mass', 'kilogram', 'kg'], ['time', 'second', 's'], ['electric current', 'ampere', 'A'], ['temperature', 'kelvin', 'K'], ['amount of substance', 'mole', 'mol'], ['luminous intensity', 'candela', 'cd']];
    const x0 = 0.7, cw = [2.45, 1.75, 1.3], y0 = 1.5, rh = 0.52;
    ['Quantity', 'SI base unit', 'Symbol'].forEach((t, j) => {
      const x = x0 + cw.slice(0, j).reduce((a, b) => a + b, 0);
      box(s, x, y0, cw[j] - 0.05, 0.4, C.ink, null);
      label(s, x, y0, cw[j] - 0.05, t, { h: 0.4, size: 11.5, bold: true, color: C.white });
    });
    BU.forEach((r, i) => {
      const y = y0 + 0.46 + i * rh, dim = i >= 5;
      r.forEach((t, j) => {
        const x = x0 + cw.slice(0, j).reduce((a, b) => a + b, 0);
        box(s, x, y, cw[j] - 0.05, rh - 0.06, dim ? 'F2F3F6' : (j === 2 ? 'DCE6FB' : C.white), C.line, { lw: 0.75 });
        label(s, x, y, cw[j] - 0.05, t, { h: rh - 0.06, size: j === 2 ? 15 : 12, bold: j > 0, color: dim ? '9AA1B0' : (j === 2 ? C.blue : C.ink) });
      });
    });
    label(s, x0, y0 + 0.46 + 7 * rh + 0.02, 5.45, 'grey rows: SI base units you will not need in GCSE physics calculations', { size: 10, italic: true, color: C.grey });
  },
  head: 'Base units: the building blocks',
  lines: [
    'Scientists everywhere use the **SI system** (Système International), so results can be shared and compared.',
    'There are **seven base units**. In GCSE physics you use **m, kg, s, A and K**.',
    'The **kilogram** is the only base unit with a prefix built in: 1 kg = 1000 g.',
    'Always put data into SI units **before** substituting into an equation.',
    'Write the unit symbol after every answer: **no unit, no mark**.',
  ],
  worked: { head: 'Worked example', q: 'A light gate measures a time of 500 ms. Write this in the SI base unit.',
    steps: [['Identify', 'ms = millisecond; milli means × 10⁻³'], ['Convert', 't = 500 × 10⁻³ s'], ['Answer', `t = ${ms500} s`]] },
  qc: 'Give the SI unit and symbol for: (a) the mass of a car (b) the current in a lamp (c) the temperature of a gas.',
  notes: 'QUICK CHECK ANSWER: (a) kilogram, kg (b) ampere, A (c) kelvin, K.\nCommon errors: writing “amps” as the symbol (it is A), and thinking the gram is the SI unit of mass. Degrees Celsius are allowed for temperatures in practical work, but the SI unit is the kelvin (Topic 14 links °C and K).\nSpec 1.1 refers to the list of SI units in the specification appendix (“SI units in physics”).',
}), '1.1 SI base units');

// ======================= 6 DERIVED UNITS =======================
reg(D.contentSlide({
  title: 'Derived units',
  subtitle: `Specification ${sp('1.1')} • units made by combining base units, many with special names`,
  tag: '1.1', caption: 'each derived unit comes from the equation that defines the quantity',
  draw: (s, p) => {
    const DU = [
      ['N', 'newton • force', '= kg m/s²', 'from F = m × a'],
      ['J', 'joule • energy', '= N m', 'from E = F × d'],
      ['W', 'watt • power', '= J/s', 'from P = E ÷ t'],
      ['Pa', 'pascal • pressure', '= N/m²', 'from p = F ÷ A'],
      ['C', 'coulomb • charge', '= A s', 'from Q = I × t'],
      ['V', 'volt • potential difference', '= J/C', 'from E = Q × V'],
      ['Ω', 'ohm • resistance', '= V/A', 'from V = I × R'],
      ['Hz', 'hertz • frequency', '= 1/s', 'waves per second'],
    ];
    DU.forEach(([sym, nm, eq, from], i) => {
      const col = i % 2, row = Math.floor(i / 2);
      const x = 0.62 + col * 2.95, y = 1.48 + row * 1.08, w = 2.82, h = 0.98;
      box(s, x, y, w, h, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      s.addShape(SH.OVAL, { x: x + 0.1, y: y + 0.17, w: 0.64, h: 0.64, fill: { color: C.blue }, line: { color: C.blue } });
      label(s, x + 0.1, y + 0.17, 0.64, sym, { h: 0.64, size: sym.length > 1 ? 14 : 17, bold: true, color: C.white });
      label(s, x + 0.82, y + 0.06, w - 0.88, nm, { size: 10.5, bold: true, color: C.ink, align: 'left', h: 0.28 });
      label(s, x + 0.82, y + 0.34, w - 0.88, eq, { size: 13, bold: true, color: C.blue, align: 'left', h: 0.3 });
      label(s, x + 0.82, y + 0.64, w - 0.88, from, { size: 10, italic: true, color: C.grey, align: 'left', h: 0.26 });
    });
  },
  head: 'Building units from equations',
  lines: [
    'A **derived unit** is a combination of base units, e.g. speed in **m/s**, density in **kg/m³**.',
    'Some derived units have a **special name**, often after a scientist: newton, joule, watt, pascal, coulomb, volt, ohm, hertz.',
    'To find the unit of a quantity, **put the units into its equation** and simplify.',
    'Units with names of people use a **capital letter symbol** (N, J, W, Pa) but a **small letter** when written as a word (newton).',
  ],
  worked: { head: 'Worked example', q: 'Find the SI unit of density from ρ = m ÷ V.',
    steps: [['Equation', 'density = mass ÷ volume'], ['Units in', 'unit = kg ÷ m³'], ['Answer', 'unit of density = kg/m³']] },
  qc: 'Use P = E ÷ t to write the watt in terms of joules and seconds. Use F = m × a to write the newton in SI base units.',
  notes: 'QUICK CHECK ANSWER: 1 W = 1 J/s (one joule per second). 1 N = 1 kg × 1 m/s² = 1 kg m/s².\nThe equations on the tiles come from later topics (Topics 2, 8, 10, 15); students only need to recall the unit names and symbols here. Stretch: show 1 J = 1 kg m²/s² (from E = F × d).',
}), '1.1 Derived units');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('1.1')} • SI base units and derived units`, [
  { q: 'Give the SI unit of: (i) **mass** (ii) **temperature** (iii) **power**.', marks: 3, ms: '(i) kilogram / kg (1); (ii) kelvin / K (1); (iii) watt / W (1). Do not accept gram or °C.' },
  { q: 'Pressure is calculated using **p = F ÷ A**. Use this equation to give the unit of pressure in terms of **N** and **m**, and give the **special name** of this unit.', marks: 2, ms: 'N/m² (1); pascal / Pa (1).' },
  { q: 'A car’s speedometer shows speed in **km/h**. Explain why km/h is **not** the SI unit of speed, and give the SI unit.', marks: 2, ms: 'The hour is not the SI unit of time / kilometre has a prefix (SI uses metres and seconds) (1); m/s (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 PREFIX LADDER =======================
reg(D.contentSlide({
  title: 'Prefixes: the powers-of-ten ladder',
  subtitle: `Specification ${sp('1.2')} • giga (G), mega (M), kilo (k), centi (c), milli (m), micro (μ), nano (n)`,
  tag: '1.2', caption: 'rungs drawn to scale: each step up the ladder is × 10',
  draw: (s, p) => {
    const ax = 1.55, yT = 1.85, yB = 5.5, k = (yB - yT) / 18; // 0.203 in per power of ten
    const Y = e => yT + (9 - e) * k;
    label(s, 0.55, 1.4, 0.95, 'power', { size: 10.5, bold: true, color: C.grey });
    label(s, 1.85, 1.4, 1.35, 'prefix', { size: 10.5, bold: true, color: C.grey });
    label(s, 3.25, 1.4, 1.75, 'multiply by', { size: 10.5, bold: true, color: C.grey });
    label(s, 5.0, 1.4, 1.45, 'example', { size: 10.5, bold: true, color: C.grey });
    line(s, ax, yT - 0.1, ax, yB + 0.1, C.ink, 2.5);
    for (let e = -9; e <= 9; e++) line(s, ax - 0.06, Y(e), ax + 0.06, Y(e), '8C96A8', 0.75);
    const mult = { 9: '1 000 000 000', 6: '1 000 000', 3: '1000', 0: '1', '-2': '0.01', '-3': '0.001', '-6': '0.000 001', '-9': '0.000 000 001' };
    const ex = { 9: '2.4 GHz Wi-Fi', 6: '2 MW wind turbine', 3: '4.7 kΩ resistor', 0: '1 m, 1 s, 1 A', '-2': '15 cm pencil', '-3': '350 mA current', '-6': '7 μm red cell', '-9': '520 nm green light' };
    PREF.forEach(([nm, sym, e]) => {
      const y = Y(e), base = e === 0;
      s.addShape(SH.OVAL, { x: ax - 0.07, y: y - 0.07, w: 0.14, h: 0.14, fill: { color: base ? C.ink : C.blue }, line: { color: C.white, width: 0.75 } });
      label(s, 0.55, y - 0.11, 0.9, base ? '10⁰' : '10' + String(e).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]), { h: 0.22, size: 12, bold: true, color: C.ink, align: 'right' });
      line(s, ax + 0.07, y, 1.85, y, C.blue, 1);
      box(s, 1.85, y - 0.1, 1.35, 0.2, base ? 'E9ECF2' : 'DCE6FB', null);
      label(s, 1.85, y - 0.11, 1.35, base ? 'base unit' : `${nm}   ${sym}`, { h: 0.22, size: 11, bold: true, color: base ? C.grey : C.blue });
      label(s, 3.25, y - 0.11, 1.75, '× ' + mult[e], { h: 0.22, size: 10.5, color: C.text, align: 'left' });
      label(s, 5.0, y - 0.11, 1.5, ex[e], { h: 0.22, size: 10, italic: true, color: C.grey, align: 'left' });
    });
  },
  head: 'A prefix is a multiplier',
  lines: [
    'A prefix in front of a unit **multiplies** it by a power of ten: 1 **k**m = 1 × 10³ m = 1000 m.',
    'To remove a prefix, **replace it with its power of ten**: 350 **m**A = 350 × 10⁻³ A = 0.35 A.',
    'Careful: **m** means milli as a prefix (mA) but **metre** as a unit (m). **M** (mega) and **m** (milli) differ by 10⁹.',
    'Learn all seven prefixes: they are **not given** in the exam.',
  ],
  worked: { head: 'Worked examples', q: 'Write 4.7 kΩ in ohms and 350 mA in amperes.',
    steps: [['kilo', 'k = × 10³ so 4.7 kΩ = 4.7 × 10³ Ω = 4700 Ω'], ['milli', 'm = × 10⁻³ so 350 mA = 350 × 10⁻³ A'], ['Answer', '4700 Ω and 0.35 A']] },
  qc: 'Write in SI units, in standard form: (a) the frequency 2.4 GHz (b) the wavelength 520 nm (c) the power 2 MW.',
  notes: 'QUICK CHECK ANSWER: (a) 2.4 × 10⁹ Hz (b) 5.2 × 10⁻⁷ m (c) 2 × 10⁶ W.\nLadder drawn to scale: 0.2 in per power of ten, so centi and milli rungs sit close together (one power apart). Edexcel 1.2 lists exactly these seven prefixes; others (tera, pico) are not required.',
}), '1.2 Prefix ladder');

// ======================= 9 PREFIXES IN CALCULATIONS =======================
reg(D.contentSlide({
  title: 'Prefixes in calculations',
  subtitle: `Specification ${sp('1.2')}, ${sp('1.3')} • convert to SI units first, then substitute`,
  tag: '1.2', caption: 'a kettle (2.2 kW) switched on for 3.0 minutes',
  draw: (s, p) => {
    const steps = [
      ['1  Write down the data', 'P = 2.2 kW      t = 3.0 min', C.white],
      ['2  Convert to SI units', 'P = 2.2 × 10³ W = 2200 W      t = 3.0 × 60 = 180 s', 'DCE6FB'],
      ['3  Equation, then substitute', 'E = P × t = 2200 W × 180 s', C.white],
      ['4  Answer with unit and s.f.', `E = ${fmtN(Ek)} J = 4.0 × 10⁵ J (2 s.f.)`, 'FDE7D0'],
      ['5  Optional: add a prefix', 'E = 400 kJ', C.white],
    ];
    steps.forEach(([h, t, f], i) => {
      const y = 1.5 + i * 0.86;
      box(s, 0.75, y, 5.5, 0.68, f, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
      label(s, 0.9, y + 0.04, 5.2, h, { h: 0.26, size: 10.5, bold: true, color: C.blue, align: 'left' });
      label(s, 0.9, y + 0.31, 5.2, t, { h: 0.32, size: 12.5, bold: true, color: i === 3 ? C.red : C.ink, align: 'left' });
      if (i < steps.length - 1) arrow(s, 3.5, y + 0.68, 3.5, y + 0.86, C.blue, 1.75);
    });
  },
  head: 'Why convert first?',
  lines: [
    'Physics equations only give the right answer when **every quantity is in SI units**.',
    'Using 2.2 (kW) × 3.0 (min) gives 6.6 – not an energy in joules.',
    'E = P × t links energy, power and time (P = E ÷ t, Topic 10 – **RECALL**).',
  ],
  worked: { head: 'Worked example', q: 'A current of 250 mA passes through a 48 Ω resistor. Calculate the potential difference across it.',
    steps: [['Convert', 'I = 250 mA = 0.250 A'], ['Equation', 'V = I × R (Topic 10, RECALL)'], ['Substitute', 'V = 0.250 A × 48 Ω'], ['Answer', `V = ${Vw} V`]], size: 11 },
  workedH: 2.45,
  qc: 'A current of 0.40 mA passes through a 15 kΩ resistor. Calculate the potential difference across the resistor.',
  notes: `QUICK CHECK ANSWER: I = 0.40 × 10⁻³ A, R = 15 × 10³ Ω; V = I × R = 0.40 × 10⁻³ × 15 × 10³ = ${Vqc.toFixed(1)} V. (The milli and kilo cancel.)\nKettle: 2200 × 180 = 396 000 J (asserted in node); data given to 2 s.f., so 4.0 × 10⁵ J.`,
}), '1.2 Prefixes in calculations');

// ======================= 10 CONVERTING TIME AND SPEED =======================
reg(D.contentSlide({
  title: 'Converting units: time and speed',
  subtitle: `Specification ${sp('1.3')} • be able to convert between different units, including hours to seconds`,
  tag: '1.3', caption: 'multiply going to a smaller unit; divide going to a bigger unit',
  draw: (s, p) => {
    // time chain
    label(s, 0.7, 1.42, 5.6, 'Time', { size: 12, bold: true, color: C.ink, align: 'left' });
    const tx = [0.8, 2.85, 4.9], tw = 1.4;
    ['hours', 'minutes', 'seconds'].forEach((t, i) => node(s, tx[i], 1.95, tw, 0.55, t));
    [0, 1].forEach(i => {
      arrow(s, tx[i] + tw + 0.05, 2.08, tx[i + 1] - 0.05, 2.08, C.green, 2); label(s, tx[i] + tw, 1.74, 0.65, '× 60', { size: 11, bold: true, color: C.green });
      arrow(s, tx[i + 1] - 0.05, 2.38, tx[i] + tw + 0.05, 2.38, C.red, 2); label(s, tx[i] + tw, 2.5, 0.65, '÷ 60', { size: 11, bold: true, color: C.red });
    });
    label(s, 0.7, 2.85, 5.6, '1 h = 60 min = 3600 s', { size: 12, bold: true, color: C.blue });
    line(s, 0.7, 3.25, 6.3, 3.25, C.line, 1);
    // speed chain
    label(s, 0.7, 3.35, 5.6, 'Speed', { size: 12, bold: true, color: C.ink, align: 'left' });
    ['km/h', 'm/h', 'm/s'].forEach((t, i) => node(s, tx[i], 3.9, tw, 0.55, t));
    [['× 1000', '÷ 1000'], ['÷ 3600', '× 3600']].forEach(([f, b], i) => {
      const cf = f[0] === '×' ? C.green : C.red, cb = b[0] === '×' ? C.green : C.red;
      arrow(s, tx[i] + tw + 0.05, 4.03, tx[i + 1] - 0.05, 4.03, cf, 2); label(s, tx[i] + tw - 0.05, 3.69, 0.75, f, { size: 11, bold: true, color: cf });
      arrow(s, tx[i + 1] - 0.05, 4.33, tx[i] + tw + 0.05, 4.33, cb, 2); label(s, tx[i] + tw - 0.05, 4.45, 0.75, b, { size: 11, bold: true, color: cb });
    });
    // shortcut
    line(s, tx[0] + tw / 2, 4.45, tx[0] + tw / 2, 5.05, C.blue, 1.5); line(s, tx[0] + tw / 2, 5.05, tx[2] + tw / 2, 5.05, C.blue, 1.5);
    arrow(s, tx[2] + tw / 2, 5.05, tx[2] + tw / 2, 4.47, C.blue, 1.5);
    box(s, 2.55, 4.93, 2.0, 0.26, 'EEF1F8', null);
    label(s, 2.55, 4.92, 2.0, 'shortcut: ÷ 3.6', { size: 11.5, bold: true, color: C.blue });
    label(s, 0.7, 5.3, 5.6, 'green arrows: multiply   •   red arrows: divide', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'Multiply or divide?',
  lines: [
    'Going to a **smaller unit** (h → s): you need **more** of them, so **multiply**.',
    'Going to a **bigger unit** (s → h): you need **fewer**, so **divide**.',
    '**km/h → m/s:** × 1000 (km → m), then ÷ 3600 (per hour → per second). Overall **÷ 3.6**.',
    'Sense check: m/s values are **smaller** than km/h values.',
  ],
  worked: { head: 'Worked example', q: 'A car travels at 72 km/h. Convert this speed to m/s.',
    steps: [['Distance', '72 km = 72 × 1000 = 72 000 m'], ['Time', '1 h = 3600 s'], ['Divide', 'speed = 72 000 m ÷ 3600 s'], ['Answer', `speed = ${v72} m/s`]] },
  qc: 'A car travels at 54 km/h for 15 minutes. Convert the speed to m/s and the time to s, then calculate the distance in metres.',
  notes: `QUICK CHECK ANSWER: 54 ÷ 3.6 = ${v54} m/s; 15 × 60 = 900 s; d = s × t (Topic 2, RECALL) = 15 × 900 = ${fmtN(d54)} m (1.35 × 10⁴ m).\nCommon error: multiplying by 3.6 instead of dividing. Check: 1 m/s = 3.6 km/h, so the number in m/s is smaller.`,
}), '1.3 Converting time and speed');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('1.2')}, ${sp('1.3')} • prefixes and converting units`, [
  { q: 'Convert **2.5 hours** into seconds. Then write a current of **0.065 A** in milliamperes.', marks: 2, ms: '2.5 × 3600 = 9000 s (1); 0.065 A = 65 mA (1).' },
  { q: 'A microwave oven of power **800 W** is used for **4.5 minutes**. Calculate the energy transferred. Use **E = P × t**.', marks: 3, ms: 't = 4.5 × 60 = 270 s (1); E = 800 × 270 (1); = 216 000 J / 2.2 × 10⁵ J (1). Answer 3600 (no time conversion) scores 1 for substitution only if the method is shown.' },
  { q: 'A cheetah can run at **108 km/h**. Calculate this speed in m/s. Show your working.', marks: 2, ms: '108 × 1000 ÷ 3600 or 108 ÷ 3.6 (1); = 30 m/s (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 AREA AND VOLUME =======================
reg(D.contentSlide({
  title: 'Converting areas and volumes',
  subtitle: `Specification ${sp('1.3')} • squared and cubed units: convert the length, then square or cube it`,
  tag: '1.3', caption: 'not to scale: 1 m = 100 cm along every edge',
  draw: (s, p) => {
    // square 1 m x 1 m with 10 x 10 grid (each small square 10 cm x 10 cm)
    const x0 = 0.95, y0 = 1.75, L = 2.2;
    box(s, x0, y0, L, L, 'DCE6FB', C.blue, { lw: 2 });
    for (let i = 1; i < 10; i++) { line(s, x0 + i * L / 10, y0, x0 + i * L / 10, y0 + L, '9FB8F0', 0.5); line(s, x0, y0 + i * L / 10, x0 + L, y0 + i * L / 10, '9FB8F0', 0.5); }
    label(s, x0, y0 - 0.32, L, '1 m = 100 cm', { size: 11, bold: true, color: C.blue });
    label(s, x0 - 0.95, y0 + L / 2 - 0.14, 0.9, '100 cm', { size: 11, bold: true, color: C.blue, align: 'right' });
    label(s, x0 - 0.2, y0 + L + 0.08, L + 0.4, '1 m² = 100 × 100 cm²\n= 10 000 cm² = 10⁴ cm²', { h: 0.5, size: 11.5, bold: true, color: C.ink });
    // cube
    const cx = 4.25, cy = 2.3, c = 1.5, o = 0.55;
    const F = [[cx, cy], [cx + c, cy], [cx + c, cy + c], [cx, cy + c]], B = F.map(([a, b]) => [a + o, b - o]);
    box(s, cx, cy, c, c, 'DCE6FB', null);
    [[0, 1], [1, 2], [2, 3], [3, 0]].forEach(([i, j]) => line(s, F[i][0], F[i][1], F[j][0], F[j][1], C.blue, 2));
    [[0, 1], [1, 2]].forEach(([i, j]) => line(s, B[i][0], B[i][1], B[j][0], B[j][1], C.blue, 2));
    [0, 1, 2].forEach(i => line(s, F[i][0], F[i][1], B[i][0], B[i][1], C.blue, 2));
    line(s, B[2][0], B[2][1], B[3][0] + 0, B[3][1], '9FB8F0', 1, { dash: 'dash' }); line(s, B[3][0], B[3][1], B[0][0], B[0][1], '9FB8F0', 1, { dash: 'dash' }); line(s, B[3][0], B[3][1], F[3][0], F[3][1], '9FB8F0', 1, { dash: 'dash' });
    label(s, cx, cy + c + 0.04, c, '100 cm', { size: 11, bold: true, color: C.blue });
    label(s, cx - 0.95, cy + c / 2 - 0.14, 0.9, '100 cm', { size: 11, bold: true, color: C.blue, align: 'right' });
    label(s, cx - 0.35, cy + c + 0.32, c + 1.2, '1 m³ = 100 × 100 × 100 cm³\n= 10⁶ cm³', { h: 0.5, size: 11.5, bold: true, color: C.ink });
    // rules strip
    const rules = [['cm² → m²', '÷ 10⁴'], ['mm² → m²', '÷ 10⁶'], ['cm³ → m³', '÷ 10⁶']];
    rules.forEach(([a, b], i) => {
      const x = 0.75 + i * 1.86;
      box(s, x, 5.0, 1.74, 0.6, C.white, C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
      label(s, x, 5.02, 1.74, a, { h: 0.28, size: 11.5, bold: true, color: C.ink });
      label(s, x, 5.29, 1.74, b, { h: 0.28, size: 12.5, bold: true, color: C.red });
    });
  },
  head: 'Square the conversion factor for areas, cube it for volumes',
  lines: [
    '1 m = 100 cm, but **1 m² = 10 000 cm²** (not 100 cm²) and **1 m³ = 1 000 000 cm³**.',
    'Safest method: **convert each length to metres first**, then multiply.',
    '1 cm³ = 1 ml; 1 litre = 1000 cm³ = 10⁻³ m³.',
  ],
  worked: { head: 'Worked example', q: 'A force of 600 N acts on an area of 25 cm². Calculate the pressure. (p = F ÷ A, Topic 15, RECALL)',
    steps: [['Convert', 'A = 25 ÷ 10⁴ = 2.5 × 10⁻³ m²'], ['Equation', 'p = F ÷ A'], ['Substitute', 'p = 600 N ÷ 2.5 × 10⁻³ m²'], ['Answer', `p = ${fmtN(p25)} Pa = 2.4 × 10⁵ Pa`]], size: 11 },
  workedH: 2.5,
  qc: 'A metal block has a volume of 200 cm³ and a mass of 540 g. Calculate its density in kg/m³. (ρ = m ÷ V)',
  notes: `QUICK CHECK ANSWER: V = 200 ÷ 10⁶ = 2.0 × 10⁻⁴ m³; m = 0.540 kg; ρ = 0.540 ÷ 2.0 × 10⁻⁴ = ${fmtN(rhoQC)} kg/m³ (aluminium).\nCommon error: dividing cm² by 100 or cm³ by 100. The cube is drawn in perspective and not to scale; the square grid shows 100 squares of 10 cm × 10 cm = 100 cm² each.\np = F ÷ A is physics-only (15.11P); Combined classes can use the density example instead.`,
}), '1.3 Converting areas and volumes');

// ======================= 13 kWh TO J =======================
reg(D.contentSlide({
  title: 'Converting energy: kilowatt-hours to joules',
  subtitle: `Specification ${sp('1.3')} • the kWh is the energy unit on electricity bills`,
  tag: '1.3', caption: 'a home electricity meter counts kilowatt-hours',
  draw: (s, p) => {
    // meter
    box(s, 1.15, 1.5, 4.7, 1.45, '2F3747', '1F2430', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
    label(s, 1.15, 1.56, 4.7, 'ELECTRICITY METER', { size: 10.5, bold: true, color: 'C9D5F2', h: 0.24 });
    '04527'.split('').forEach((d, i) => { box(s, 1.6 + i * 0.6, 1.88, 0.5, 0.7, i === 4 ? C.red : C.white, '1F2430'); label(s, 1.6 + i * 0.6, 1.88, 0.5, d, { h: 0.7, size: 24, bold: true, color: i === 4 ? C.white : C.ink }); });
    label(s, 4.65, 2.1, 1.1, 'kWh', { size: 16, bold: true, color: C.white });
    // flow
    const fy = 3.35;
    node(s, 0.7, fy, 1.25, 0.6, '1 kWh', 'FDE7D0', C.orange);
    arrow(s, 2.0, fy + 0.3, 2.35, fy + 0.3, C.blue, 2);
    node(s, 2.4, fy, 1.75, 0.6, '1 kW for 1 h', C.white, C.blue, { size: 11.5 });
    arrow(s, 4.2, fy + 0.3, 4.55, fy + 0.3, C.blue, 2);
    node(s, 4.6, fy, 1.7, 0.6, '1000 W × 3600 s', C.white, C.blue, { size: 11.5 });
    arrow(s, 5.45, fy + 0.62, 5.45, fy + 0.95, C.blue, 2);
    node(s, 2.4, fy + 1.0, 3.9, 0.6, `= ${fmtN(kWh)} J = 3.6 × 10⁶ J`, 'DCE6FB', C.blue, { size: 13 });
    // two-way
    arrow(s, 0.85, 5.35, 3.35, 5.35, C.green, 2.5); label(s, 0.85, 5.03, 2.5, 'kWh → J:  × 3.6 × 10⁶', { size: 11, bold: true, color: C.green });
    arrow(s, 6.15, 5.35, 3.65, 5.35, C.red, 2.5); label(s, 3.65, 5.03, 2.5, 'J → kWh:  ÷ 3.6 × 10⁶', { size: 11, bold: true, color: C.red });
  },
  head: 'One kilowatt for one hour',
  lines: [
    'The **kilowatt-hour (kWh)** is the energy transferred by a **1 kW** appliance in **1 hour**.',
    'It is **not an SI unit**. The SI unit of energy is the **joule**.',
    '**1 kWh = 1000 W × 3600 s = 3.6 × 10⁶ J**. Work this out each time rather than learning it.',
    'Energy in kWh = power in **kW** × time in **hours**.',
  ],
  worked: { head: 'Worked example', q: 'A 2.0 kW heater is on for 3.0 hours. Calculate the energy transferred in kWh and in J.',
    steps: [['kWh', 'E = 2.0 kW × 3.0 h = 6.0 kWh'], ['Convert', `E = 6.0 × 3.6 × 10⁶ J = ${fmtN(EhJ)} J`], ['Check', 'or 2000 W × 10 800 s = the same'], ['Answer', 'E = 2.2 × 10⁷ J (2 s.f.)']], size: 11 },
  workedH: 2.35,
  qc: 'A phone charger has a power of 5.0 W and is used for 2.0 hours. Calculate the energy transferred in joules and in kWh.',
  notes: `QUICK CHECK ANSWER: E = 5.0 × 7200 = 36 000 J (3.6 × 10⁴ J); in kWh: 0.0050 kW × 2.0 h = 0.010 kWh.\nNote for teachers: “kWh” is not named in the 1PH0 Topic 1 statements; it is included as a unit-conversion example under 1.3 (convert between different units) and as a link to power ratings in Topic 10. Treat it as useful practice rather than a named requirement.`,
}), '1.3 Converting kWh to J');

// ======================= 14 STANDARD FORM =======================
reg(D.contentSlide({
  title: 'Standard form',
  subtitle: `Specification ${sp('1.4')} • use significant figures and standard form where appropriate`,
  tag: '1.4', caption: 'count the places the decimal point moves',
  draw: (s, p) => {
    // big number
    label(s, 0.7, 1.42, 5.6, 'A big number: the speed of light', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    const big = '300000000';
    const cx1 = digits(s, 0.75, 2.05, big, 0.4, big.split('').map((c, i) => i === 0 ? 'blue' : ''));
    s.addShape(SH.OVAL, { x: 0.75 + 9 * 0.4 - 0.06, y: 2.36, w: 0.08, h: 0.08, fill: { color: C.ink }, line: { color: C.ink } });
    for (let i = 8; i >= 1; i--) hop(s, 0.75 + (i + 1) * 0.4 - 0.015, 0.75 + i * 0.4 - 0.015, 2.02, -0.2);
    label(s, 0.75, 2.52, 4.2, 'point moves 8 places left →  power +8', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 4.6, 2.08, 1.8, '= 3.0 × 10⁸ m/s', { h: 0.36, size: 14, bold: true, color: C.blue, align: 'left' });
    // small number
    label(s, 0.7, 2.85, 5.6, 'A small number: the wavelength of green light', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    const sm = '0.00000052';
    digits(s, 0.75, 3.15, sm, 0.4, sm.split('').map((c, i) => i >= 8 ? 'blue' : 'grey'));
    { let xs = 0.75 + 0.4 + 0.185; for (let j = 2; j <= 8; j++) { const xe = 0.75 + (j + 1) * 0.4 - 0.015; hop(s, xs, xe, 3.6, 0.2); xs = xe; } }
    label(s, 0.75, 3.84, 4.2, 'point moves 7 places right →  power −7', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 4.85, 3.18, 1.6, '= 5.2 × 10⁻⁷ m', { h: 0.36, size: 14, bold: true, color: C.blue, align: 'left' });
    // calculator key
    box(s, 0.75, 4.75, 5.5, 0.95, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    label(s, 0.9, 4.8, 5.2, 'On a calculator, type 3.0 × 10⁸ as:', { size: 10.5, bold: true, color: C.grey, align: 'left' });
    [['3', 0.95], ['.', 1.5], ['0', 2.05], ['×10ˣ', 2.6], ['8', 3.5]].forEach(([k, x]) => { const w = k.length > 1 ? 0.8 : 0.45; box(s, x, 5.1, w, 0.45, k.length > 1 ? C.ink : 'E9ECF2', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 }); label(s, x, 5.1, w, k, { h: 0.45, size: 13, bold: true, color: k.length > 1 ? C.white : C.ink }); });
    label(s, 4.1, 5.1, 2.1, '(EXP on some calculators)', { h: 0.45, size: 10, italic: true, color: C.grey, align: 'left' });
  },
  head: 'A × 10ⁿ, where 1 ≤ A < 10',
  lines: [
    'Standard form writes a number as **A × 10ⁿ**: A is **at least 1 and less than 10**; n is a **whole number**.',
    'Numbers **≥ 10** have a **positive** power; numbers **less than 1** have a **negative** power.',
    'Use it for very large or very small values, and to show **significant figures** clearly.',
  ],
  worked: { head: 'Worked example', q: 'Light travels 1.5 × 10¹¹ m from the Sun to Earth at 3.0 × 10⁸ m/s. Calculate the time taken.',
    steps: [['Equation', 'speed = distance ÷ time (Topic 2, RECALL)'], ['Rearrange', 'time = distance ÷ speed'], ['Substitute', 't = 1.5 × 10¹¹ m ÷ 3.0 × 10⁸ m/s'], ['Answer', `t = ${tSun} s = 5.0 × 10² s`]], size: 11 },
  workedH: 2.5,
  qc: 'Write in standard form: (a) the radius of the Earth, 6 400 000 m (b) 0.000 045 s (c) Write 2.1 × 10⁻³ A as an ordinary number.',
  notes: 'QUICK CHECK ANSWER: (a) 6.4 × 10⁶ m (b) 4.5 × 10⁻⁵ s (c) 0.0021 A.\nCommon errors: writing 64 × 10⁵ (A must be less than 10); typing “× 10 ^ 8” on a calculator without brackets; reading a calculator display 5.2E-07 as 5.2.',
}), '1.4 Standard form');

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('1.3')}, ${sp('1.4')} • areas, kWh and standard form`, [
  { q: 'Write **3 600 000 J** in standard form. Convert an area of **15 cm²** into m², in standard form.', marks: 2, ms: '3.6 × 10⁶ J (1); 1.5 × 10⁻³ m² (1).' },
  { q: 'A force of **60 N** acts on an area of **20 cm²**. Calculate the pressure in pascals. Use **p = F ÷ A**.', marks: 3, ms: 'A = 20 ÷ 10⁴ = 2.0 × 10⁻³ m² (1); p = 60 ÷ 2.0 × 10⁻³ (1); = 30 000 Pa / 3.0 × 10⁴ Pa (1).' },
  { q: 'A television of power **150 W** is switched on for **4.0 hours**. Calculate the energy transferred in **kWh** and in **J**.', marks: 2, ms: '0.150 kW × 4.0 h = 0.60 kWh (1); 0.60 × 3.6 × 10⁶ = 2.16 × 10⁶ J / 2.2 × 10⁶ J (1). Allow 150 × 14 400 = 2 160 000 J.' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 SIGNIFICANT FIGURES =======================
reg(D.contentSlide({
  title: 'Significant figures',
  subtitle: `Specification ${sp('1.4')} • round answers to match the data you were given`,
  tag: '1.4', caption: 'blue = significant figures; grey = place-holder zeros',
  draw: (s, p) => {
    const ex = [
      ['0.004050', [0, 0, 0, 0, 1, 1, 1, 1], '4 s.f.', 'leading zeros never count; the final 0 after the 5 does count'],
      ['2.30', [1, 1, 1, 1], '3 s.f.', 'a trailing zero after the decimal point counts'],
      ['12600', [1, 1, 1, 0, 0], '3 s.f.?', 'unclear: write 1.26 × 10⁴ to show 3 s.f.'],
    ];
    ex.forEach(([n, sig, t, why], i) => {
      const y = 1.5 + i * 0.95;
      digits(s, 0.75, y, n, 0.38, n.split('').map((c, j) => c === '.' ? '' : sig[j] ? 'blue' : 'grey'));
      label(s, 4.05, y + 0.02, 1.0, t, { h: 0.38, size: 15, bold: true, color: C.red, align: 'left' });
      label(s, 0.75, y + 0.45, 5.5, why, { size: 10.5, italic: true, color: C.grey, align: 'left', h: 0.26 });
    });
    // rounding
    box(s, 0.75, 4.35, 5.5, 1.35, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    label(s, 0.9, 4.4, 5.2, 'Rounding 34.2857… : look at the NEXT digit', { size: 11, bold: true, color: C.ink, align: 'left' });
    const cx = digits(s, 0.95, 4.78, '34.2857', 0.38, ['blue', 'blue', '', '', '', '', '']);
    arrow(s, cx[3], 5.3, cx[3], 5.21, C.red, 1.5);
    label(s, cx[3] - 0.8, 5.32, 1.6, 'next digit 2 < 5: round down', { size: 10, bold: true, color: C.red, h: 0.24 });
    label(s, 3.75, 4.78, 2.4, '→ 34 Ω (2 s.f.)\n→ 34.3 Ω (3 s.f.)', { h: 0.62, size: 12.5, bold: true, color: C.blue, align: 'left' });
  },
  head: 'How many figures should the answer have?',
  lines: [
    'Significant figures are the digits that carry meaning, counted from the **first non-zero digit**.',
    'Give the answer to the **same number of s.f. as the least precise data** in the question (usually 2 or 3).',
    'Do **not** round in the middle of a calculation: keep the full value until the end.',
    'Significant figures are **not** decimal places: 0.0045 has 2 s.f. but 4 decimal places.',
  ],
  worked: { head: 'Worked example', q: 'A lamp has 12 V across it and a current of 0.35 A. Calculate its resistance.',
    steps: [['Equation', 'V = I × R (Topic 10, RECALL)'], ['Rearrange', 'R = V ÷ I'], ['Substitute', 'R = 12 V ÷ 0.35 A = 34.2857… Ω'], ['Answer', 'R = 34 Ω (2 s.f., like the data)']], size: 11 },
  workedH: 2.5,
  qc: 'A sprinter runs 100 m in 9.58 s. Calculate the average speed to 3 significant figures and to 2 significant figures.',
  notes: `QUICK CHECK ANSWER: 100 ÷ 9.58 = 10.438… m/s → ${sf(vBolt, 3)} m/s (3 s.f.) → 10 m/s (2 s.f.).\nExaminer reports for 1PH0 note candidates confusing significant figures with decimal places. Edexcel usually accepts 2 or 3 s.f. unless the question states a number.`,
}), '1.4 Significant figures');

// ======================= 17 ORDERS OF MAGNITUDE =======================
{
  const s = D.contentSlide({
    title: 'Estimates and orders of magnitude',
    subtitle: 'Working Scientifically 4c • use prefixes and powers of ten for orders of magnitude (maths skill 2h)',
    tag: 'WS 4c', caption: 'drawn on a log scale: each major tick is 1000 times the one before',
    draw: (s, p) => {
      const x0 = 0.85, x1 = 6.15, emin = -15, emax = 21, ay = 3.55;
      const X = e => x0 + (e - emin) / (emax - emin) * (x1 - x0);
      label(s, 0.7, 1.4, 5.7, 'Sizes in metres, from atomic nuclei to galaxies', { size: 11.5, bold: true, color: C.ink, align: 'left' });
      box(s, x0, ay - 0.05, x1 - x0, 0.1, 'C9D3E6', null);
      arrow(s, x0, ay, x1 + 0.25, ay, C.ink, 2);
      for (let e = emin; e <= emax; e++) line(s, X(e), ay - (e % 3 === 0 ? 0.12 : 0.05), X(e), ay + (e % 3 === 0 ? 0.12 : 0.05), C.ink, e % 3 === 0 ? 1.25 : 0.5);
      const supr = n => String(n).replace('-', '⁻').replace(/\d/g, d => '⁰¹²³⁴⁵⁶⁷⁸⁹'[d]);
      for (let e = emin; e <= emax; e += 6) label(s, X(e) - 0.3, ay + 0.14, 0.6, '10' + supr(e), { size: 10, bold: true, h: 0.22 });
      label(s, x1 - 0.6, ay + 0.36, 1.0, 'size / m', { size: 10, italic: true, color: C.grey, h: 0.2 });
      OM.forEach(([nm, v, side, lev]) => {
        const e = Math.log10(v), x = X(e);
        const stem = side < 0 ? (lev === 1 ? 0.7 : 1.15) : (lev === 1 ? 0.75 : 1.45);
        const yEnd = ay + side * stem;
        line(s, x, ay, x, yEnd, C.blue, 1);
        s.addShape(SH.OVAL, { x: x - 0.06, y: ay - 0.06, w: 0.12, h: 0.12, fill: { color: C.red }, line: { color: C.white, width: 0.5 } });
        const w = 1.05, al = x - w / 2 < 0.65 ? 'left' : x + w / 2 > 6.45 ? 'right' : 'center';
        const lx = al === 'left' ? x - 0.08 : al === 'right' ? x - w + 0.08 : x - w / 2;
        const mant = v / 10 ** Math.floor(e), pw = Math.floor(e);
        const txt = pw === 0 ? `${nm}\n${+mant.toFixed(1)} m` : `${nm}\n${+mant.toFixed(1) === 1 ? '' : (+mant.toFixed(1)) + ' × '}10${supr(pw)} m`;
        label(s, lx, side < 0 ? yEnd - 0.46 : yEnd + 0.02, w, txt, { h: 0.44, size: 10, bold: true, color: C.ink, align: al });
      });
    },
    head: 'Thinking in powers of ten',
    lines: [
      'The **order of magnitude** of a value is its **nearest power of ten**: 1.7 m → 10⁰ m; 8.8 × 10³ m → 10⁴ m.',
      'Two values that differ by **one order of magnitude** differ by a factor of about **10**.',
      'An **estimate** uses sensible rounded values to get an answer of the right order of magnitude.',
      'Use estimates to **check** a calculator answer is sensible.',
    ],
    worked: { head: 'Worked example', q: 'Estimate how many atoms fit across a human hair (width about 0.1 mm).',
      steps: [['Round', 'hair ≈ 1 × 10⁻⁴ m; atom ≈ 1 × 10⁻¹⁰ m'], ['Divide', 'number = 10⁻⁴ ÷ 10⁻¹⁰: subtract the powers, −4 − (−10) = 6'], ['Answer', `about 10⁶ (a million) atoms`]] },
    qc: 'The Earth’s diameter is 1.3 × 10⁷ m and a person is 1.7 m tall. How many orders of magnitude bigger is the Earth?',
    notes: `QUICK CHECK ANSWER: 1.3 × 10⁷ ÷ 1.7 = 7.6 × 10⁶ ≈ 10⁷, so about 7 orders of magnitude.\nWorked example checked in node: 10⁻⁴ ÷ 10⁻¹⁰ = ${hairAtoms.toExponential(0)}.\nPositions on the log scale use log₁₀ of each size: nucleus 1.6 × 10⁻¹⁵ m, atom 10⁻¹⁰ m, virus 10⁻⁷ m, red blood cell 8 × 10⁻⁶ m, person 1.7 m, Everest 8.8 × 10³ m, Earth 1.3 × 10⁷ m, Earth–Sun 1.5 × 10¹¹ m, Milky Way about 10²¹ m. Orders of magnitude are in the Working Scientifically section (4c) and maths skills (2h), not a numbered Topic 1 statement.`,
  });
  SKILL(s, 'WORKING SCIENTIFICALLY', 2.25);
  reg(s, 'WS Estimates and orders of magnitude');
}

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('1.4')}, WS 4c • significant figures and orders of magnitude`, [
  { q: 'State the number of significant figures in **0.0250**.', marks: 1, ms: '3 (1).' },
  { q: 'A potential difference of **9.0 V** gives a current of **0.26 A** in a resistor. Calculate the resistance. Give your answer to **2 significant figures**. Use **R = V ÷ I**.', marks: 3, ms: 'R = 9.0 ÷ 0.26 (1); = 34.6… Ω (1); = 35 Ω to 2 s.f. (1).' },
  { q: 'A human hair is about **0.1 mm** wide. An atom is about **0.1 nm** across. Estimate the number of atoms that would fit across the hair.', marks: 3, ms: '0.1 mm = 1 × 10⁻⁴ m and 0.1 nm = 1 × 10⁻¹⁰ m (1); 10⁻⁴ ÷ 10⁻¹⁰ (1); = 10⁶ / one million (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 19 READING SCALES =======================
{
  const s = D.contentSlide({
    title: 'Reading scales and instruments',
    subtitle: 'Working Scientifically 2f • make and record measurements using a range of apparatus',
    tag: 'WS 2f', caption: 'four instruments; read each one to its smallest division',
    draw: (s, p) => {
      // --- ruler (top left)
      label(s, 0.6, 1.4, 2.9, 'Ruler (cm)', { size: 11, bold: true, color: C.ink });
      const rx = 0.75, ry = 2.2, pc = 0.42; // inch per cm, 0–6 cm
      box(s, rx - 0.1, ry, 6 * pc + 0.2, 0.42, 'F6E7B8', 'B79B4A', { lw: 0.75 });
      for (let mm = 0; mm <= 60; mm++) { const x = rx + mm * pc / 10; line(s, x, ry, x, ry + (mm % 10 === 0 ? 0.2 : mm % 5 === 0 ? 0.14 : 0.08), '6B5A2A', 0.5); }
      for (let c = 0; c <= 6; c++) label(s, rx + c * pc - 0.12, ry + 0.2, 0.24, String(c), { size: 10, h: 0.2 });
      box(s, rx + RUL[0] * pc, ry - 0.3, (RUL[1] - RUL[0]) * pc, 0.26, C.blue, '2B3F7A');
      line(s, rx + RUL[0] * pc, ry - 0.36, rx + RUL[0] * pc, ry + 0.06, C.red, 1, { dash: 'dash' });
      line(s, rx + RUL[1] * pc, ry - 0.36, rx + RUL[1] * pc, ry + 0.06, C.red, 1, { dash: 'dash' });
      label(s, rx + RUL[0] * pc, ry - 0.3, (RUL[1] - RUL[0]) * pc, 'object', { h: 0.26, size: 10, bold: true, color: C.white });
      label(s, 0.6, 2.75, 2.9, 'A', { size: 12, bold: true, color: C.red });
      // --- measuring cylinder (top right)
      label(s, 3.55, 1.4, 2.9, 'Measuring cylinder (cm³)', { size: 11, bold: true, color: C.ink });
      const cxl = 4.5, cw = 0.6, cyTop = 1.75, per = 0.14, v0 = 30, v1 = 40; // y(v)
      const Yv = v => cyTop + 0.15 + (v1 - v) * per;
      const lvl = Yv(36);
      box(s, cxl, lvl, cw, Yv(v0) + 0.1 - lvl, C.water, null);
      s.addShape(SH.RIGHT_TRIANGLE, { x: cxl, y: lvl - 0.1, w: 0.14, h: 0.1, fill: { color: C.water }, line: { type: 'none' }, flipH: true, flipV: false });
      s.addShape(SH.RIGHT_TRIANGLE, { x: cxl + cw - 0.14, y: lvl - 0.1, w: 0.14, h: 0.1, fill: { color: C.water }, line: { type: 'none' } });
      line(s, cxl + 0.14, lvl, cxl + cw - 0.14, lvl, C.waterDark, 1.5);
      line(s, cxl, lvl - 0.1, cxl + 0.14, lvl, C.waterDark, 1.5); line(s, cxl + cw - 0.14, lvl, cxl + cw, lvl - 0.1, C.waterDark, 1.5);
      line(s, cxl, cyTop, cxl, Yv(v0) + 0.1, C.ink, 1.5); line(s, cxl + cw, cyTop, cxl + cw, Yv(v0) + 0.1, C.ink, 1.5);
      for (let v = v0; v <= v1; v++) { line(s, cxl + cw - (v % 5 === 0 ? 0.25 : 0.14), Yv(v), cxl + cw, Yv(v), C.ink, 0.75); if (v % 5 === 0) label(s, cxl + cw + 0.05, Yv(v) - 0.1, 0.35, String(v), { size: 10, h: 0.2, align: 'left' }); }
      // eye
      s.addShape(SH.OVAL, { x: 3.62, y: lvl - 0.09, w: 0.3, h: 0.18, fill: { color: C.white }, line: { color: C.ink, width: 1 } });
      s.addShape(SH.OVAL, { x: 3.72, y: lvl - 0.05, w: 0.1, h: 0.1, fill: { color: C.ink }, line: { color: C.ink } });
      line(s, 3.95, lvl, cxl + cw / 2, lvl, C.red, 1, { dash: 'dash' });
      label(s, 5.5, lvl + 0.05, 1.0, 'read the\nbottom of the\nmeniscus', { h: 0.62, size: 10, bold: true, color: C.blue, align: 'left' });
      label(s, 3.55, 2.75 + 0.0, 0.5, 'B', { size: 12, bold: true, color: C.red });
      // --- thermometer (bottom left)
      label(s, 0.6, 3.6, 2.9, 'Thermometer (°C)', { size: 11, bold: true, color: C.ink });
      const tx0 = 0.95, tpc = 0.068, ty = 4.4; // 10..40 °C
      const Xt = t => tx0 + 0.25 + (t - 10) * tpc;
      box(s, tx0 + 0.15, ty - 0.08, Xt(40) - tx0 - 0.05, 0.16, C.white, C.ink, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1 });
      s.addShape(SH.OVAL, { x: tx0 - 0.08, y: ty - 0.16, w: 0.32, h: 0.32, fill: { color: C.red }, line: { color: C.ink, width: 1 } });
      box(s, tx0 + 0.15, ty - 0.035, Xt(23) - tx0 - 0.15, 0.07, C.red, null);
      for (let t = 10; t <= 40; t++) line(s, Xt(t), ty - 0.08, Xt(t), ty - 0.08 - (t % 10 === 0 ? 0.18 : t % 5 === 0 ? 0.12 : 0.07), C.ink, 0.5);
      [10, 20, 30, 40].forEach(t => label(s, Xt(t) - 0.2, ty - 0.48, 0.4, String(t), { size: 10, h: 0.2 }));
      label(s, 0.6, 4.75, 0.5, 'C', { size: 12, bold: true, color: C.red });
      // --- ammeter dial (bottom right)
      label(s, 3.55, 3.6, 2.9, 'Ammeter (A)', { size: 11, bold: true, color: C.ink });
      const dc = [5.0, 5.42], r = 1.05, A1 = 150, A2 = 30; // 0 A at 150°, 1.0 A at 30°
      const ang = I => A1 - (A1 - A2) * I;
      box(s, dc[0] - 1.42, dc[1] - 1.47, 2.84, 1.62, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
      arc(s, dc[0], dc[1], r, A2, A1, C.ink, 1.25, 40);
      for (let k = 0; k <= 20; k++) {
        const a = ang(k / 20) * Math.PI / 180, ln = k % 4 === 0 ? 0.16 : 0.08;
        line(s, dc[0] + r * Math.cos(a), dc[1] - r * Math.sin(a), dc[0] + (r - ln) * Math.cos(a), dc[1] - (r - ln) * Math.sin(a), C.ink, 0.75);
        if (k % 4 === 0) label(s, dc[0] + (r + 0.18) * Math.cos(a) - 0.2, dc[1] - (r + 0.18) * Math.sin(a) - 0.1, 0.4, (k / 20).toFixed(1), { size: 10, h: 0.2 });
      }
      const na = ang(AMM) * Math.PI / 180;
      line(s, dc[0], dc[1], dc[0] + (r - 0.04) * Math.cos(na), dc[1] - (r - 0.04) * Math.sin(na), C.red, 2);
      s.addShape(SH.OVAL, { x: dc[0] - 0.07, y: dc[1] - 0.07, w: 0.14, h: 0.14, fill: { color: C.ink }, line: { color: C.ink } });
      label(s, dc[0] - 0.75, dc[1] - 0.42, 0.4, 'A', { size: 13, bold: true, color: C.ink });
      label(s, 3.62, 5.25, 0.4, 'D', { size: 12, bold: true, color: C.red });
    },
    head: 'Good technique',
    lines: [
      'The **resolution** of an instrument is the **smallest change it can show** (its smallest division).',
      '**Ruler:** read both ends; subtract the start reading if the object does not start at 0.',
      '**Liquids:** read the **bottom of the meniscus** with your **eye level** with the surface.',
      '**Dials:** look straight at the pointer to avoid **parallax**; check it reads **zero** before you start.',
      'Record readings to the resolution, e.g. 23 °C, not 23.0 °C, on a 1 °C scale.',
    ],
    worked: { head: 'Worked example', q: 'Find the resolution of ammeter D and its reading.',
      steps: [['Divisions', '0.2 A between numbers, split into 4 divisions'], ['Resolution', `0.2 ÷ 4 = ${(0.2 / 4).toFixed(2)} A`], ['Answer', `reading = ${AMM.toFixed(2)} A`]], size: 11 },
    qc: 'Read the length of the object on ruler A, the volume in cylinder B and the temperature on thermometer C. State the resolution of each.',
    notes: 'QUICK CHECK ANSWER: A: 4.3 − 1.0 = 3.3 cm (resolution 1 mm = 0.1 cm). B: 36 cm³ (resolution 1 cm³). C: 23 °C (resolution 1 °C). D: 0.65 A (resolution 0.05 A).\nPractical skills: this is the Working Scientifically section (2f, apparatus and techniques) and is examined throughout both papers. It is not a numbered Topic 1 statement. Drawn readings checked in node.',
  });
  SKILL(s, 'PRACTICAL SKILLS', 1.75);
  reg(s, 'WS Reading scales and instruments');
}

// ======================= 20 RESOLUTION, MEANS AND ANOMALIES =======================
{
  const s = D.contentSlide({
    title: 'Means, anomalies and uncertainty',
    subtitle: 'Working Scientifically 2f, 3c • maths skill 2b: find arithmetic means',
    tag: 'WS 3c', caption: 'four timings of a trolley rolling down a ramp (stopwatch resolution 0.01 s)',
    draw: (s, p) => {
      const head = ['', 'Trial 1', 'Trial 2', 'Trial 3', 'Trial 4', 'Mean'].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
      const row = [{ text: 'time / s', options: { bold: true, fill: { color: C.cardBlue } } }, ...TR.map(t => ({ text: t.toFixed(2), options: { bold: t === 2.92, color: t === 2.92 ? C.red : C.text, fill: { color: t === 2.92 ? 'FBE3E5' : C.white } } })), { text: meanT.toFixed(2), options: { bold: true, color: C.blue, fill: { color: 'DCE6FB' } } }];
      s.addTable([head, row], { x: 0.7, y: 1.5, w: 5.6, colW: [1.05, 0.9, 0.9, 0.9, 0.9, 0.95], rowH: 0.4, fontFace: 'Calibri', fontSize: 12, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
      // dot plot
      const x0 = 0.95, x1 = 6.0, t0 = 2.20, t1 = 3.00, ay = 4.3;
      const X = t => x0 + (t - t0) / (t1 - t0) * (x1 - x0);
      label(s, 0.7, 2.55, 5.6, 'The same results on a number line', { size: 11.5, bold: true, color: C.ink, align: 'left' });
      arrow(s, x0 - 0.1, ay, x1 + 0.2, ay, C.ink, 1.5);
      for (let k = 0; k <= 16; k++) { const t = t0 + k * 0.05; line(s, X(t), ay, X(t), ay + (k % 2 === 0 ? 0.12 : 0.06), C.ink, 0.75); if (k % 4 === 0) label(s, X(t) - 0.3, ay + 0.14, 0.6, t.toFixed(1), { size: 10, h: 0.2 }); }
      label(s, x1 - 0.3, ay + 0.36, 0.9, 'time / s', { size: 10, italic: true, color: C.grey, h: 0.2 });
            TR.forEach(t => { const an = t === 2.92; s.addShape(SH.OVAL, { x: X(t) - 0.05, y: ay - 0.25, w: 0.1, h: 0.1, fill: { color: an ? C.red : C.blue }, line: { color: C.white, width: 0.5 } }); });
      s.addShape(SH.OVAL, { x: X(2.92) - 0.24, y: ay - 0.46, w: 0.48, h: 0.48, fill: { type: 'none' }, line: { color: C.red, width: 1.75 } });
      label(s, X(2.92) - 1.0, ay - 1.0, 1.3, 'anomaly: ignore', { size: 10.5, bold: true, color: C.red, h: 0.24 });
      // range bracket
      line(s, X(2.31), ay - 0.5, X(2.31), ay - 0.38, C.green, 1.25); line(s, X(2.35), ay - 0.5, X(2.35), ay - 0.38, C.green, 1.25);
      line(s, X(2.31), ay - 0.5, X(2.35), ay - 0.5, C.green, 1.25);
      label(s, X(2.33) - 0.9, ay - 0.95, 1.8, 'range 2.31–2.35 s', { size: 10.5, bold: true, color: C.green, h: 0.24 });
      line(s, X(meanT), ay - 0.06, X(meanT), ay + 0.06, C.blue, 2.5);
      label(s, 0.7, 4.95, 5.6, `mean = (2.31 + 2.35 + 2.33) ÷ 3 = ${meanT.toFixed(2)} s     uncertainty ≈ ± half the range = ± ${uncT.toFixed(2)} s`, { size: 10.5, bold: true, color: C.ink, h: 0.4 });
      label(s, 0.7, 5.35, 5.6, `result: ${meanT.toFixed(2)} ± ${uncT.toFixed(2)} s`, { size: 12.5, bold: true, color: C.blue, h: 0.3 });
    },
    head: 'Why repeat?',
    lines: [
      'Repeating readings lets you spot **anomalies** and reduces the effect of **random errors**.',
      'An **anomaly** is a result that does **not fit the pattern** of the others. Check it, then **leave it out** of the mean.',
      '**Mean** = sum of the valid readings ÷ number of valid readings. Give it to the **same resolution** as the readings.',
      'The **range** shows the spread; **half the range** is a simple estimate of the **uncertainty**.',
    ],
    worked: { head: 'Worked example', q: 'Find the mean of the valid times and its uncertainty.',
      steps: [['Anomaly', '2.92 s is far from the others: leave it out'], ['Mean', `(2.31 + 2.35 + 2.33) ÷ 3 = ${meanT.toFixed(2)} s`], ['Uncertainty', `(2.35 − 2.31) ÷ 2 = ${uncT.toFixed(2)} s`], ['Answer', `t = ${meanT.toFixed(2)} ± ${uncT.toFixed(2)} s`]], size: 11 },
    workedH: 2.35,
    qc: 'Why is a stopwatch reading of 2.31 s less certain than its 0.01 s resolution suggests? How could the timing be improved?',
    notes: 'QUICK CHECK ANSWER: Human reaction time (about 0.2 s) when starting and stopping the watch is much larger than the 0.01 s resolution, so the real uncertainty is bigger. Improve with light gates and a data logger, or time a longer event / several repeats.\nThese are Working Scientifically skills (2f measurements, 3c analysis) and maths skill 2b (arithmetic means), assessed across both papers; they are not Topic 1 statements. Mean and half-range checked in node.',
  });
  SKILL(s, 'PRACTICAL SKILLS', 1.75);
  reg(s, 'WS Means, anomalies and uncertainty');
}

// ======================= 21 ACCURACY, PRECISION AND ERRORS =======================
{
  const s = D.contentSlide({
    title: 'Accuracy, precision and errors',
    subtitle: 'Working Scientifically 3g • accuracy, precision, and random and systematic error',
    tag: 'WS 3g', caption: 'the centre of each target is the true value; dots are repeat readings',
    draw: (s, p) => {
      const r = 0.78;
      target(s, 2.0, 2.3, r, [[0.05, -0.08], [-0.1, 0.05], [0.08, 0.1], [-0.04, -0.12], [0.12, 0.0]], 'accurate and precise', C.green);
      target(s, 5.0, 2.3, r, [[0.48, -0.42], [0.58, -0.5], [0.52, -0.33], [0.62, -0.4], [0.45, -0.52]], 'precise, not accurate', C.orange);
      target(s, 2.0, 4.6, r, [[0.55, 0.2], [-0.5, -0.4], [0.1, 0.62], [-0.35, 0.45], [0.25, -0.6]], 'accurate, not precise', C.orange);
      target(s, 5.0, 4.6, r, [[-0.6, -0.1], [-0.15, -0.7], [0.3, 0.55], [-0.55, 0.45], [0.7, -0.2]], 'neither', C.red);
      label(s, 3.15, 1.62, 0.7, 'systematic error →', { size: 10, italic: true, color: C.grey, h: 0.4 });
      label(s, 2.85, 4.35, 1.3, '← random error', { size: 10, italic: true, color: C.grey, h: 0.24 });
    },
    head: 'Four words that are easy to mix up',
    lines: [
      '**Accurate:** close to the **true value**. **Precise:** repeat readings are **close to each other** (small spread).',
      '**Random error:** readings scatter unpredictably either side of the true value. Reduce it by **repeating and taking a mean**.',
      '**Systematic error:** every reading is shifted by the **same amount** in the same direction. Repeating does **not** help; **recalibrate** or correct it.',
      'A **zero error** (e.g. a balance that reads 0.4 g with nothing on it) causes a systematic error.',
    ],
    worked: { head: 'Worked example', q: 'A balance reads 0.4 g when empty. With a stone on it, it reads 25.6 g. Find the true mass.',
      steps: [['Identify', 'zero error of +0.4 g on every reading (systematic)'], ['Correct', 'true mass = 25.6 g − 0.4 g'], ['Answer', 'mass = 25.2 g']], size: 11 },
    workedH: 2.0,
    qc: 'A thermometer always reads 2 °C too high. Is this a random or a systematic error? Are the readings still precise?',
    notes: 'QUICK CHECK ANSWER: Systematic (the same shift every time). The readings can still be precise (close together) but they are not accurate.\nTop-right target: tight group shifted from the centre = precise but not accurate (systematic error). Bottom-left: spread around the centre so the mean is near the true value = accurate on average but not precise (random error). These are Working Scientifically 3g skills, not Topic 1 statements.',
  });
  SKILL(s, 'PRACTICAL SKILLS', 1.75);
  reg(s, 'WS Accuracy, precision and errors');
}

// ======================= 22 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Working Scientifically • measurement, means, anomalies and errors', [
  { q: 'Describe how to read the volume of water in a measuring cylinder accurately.', marks: 2, ms: 'Read the bottom of the meniscus (1); with eye level with the surface / cylinder on a flat surface, to avoid parallax (1).' },
  { q: 'A student measures a spring’s extension four times: **4.2 cm, 4.4 cm, 5.9 cm, 4.3 cm**. Identify the anomaly and calculate the mean of the valid results.', marks: 2, ms: '5.9 cm is the anomaly (1); mean = (4.2 + 4.4 + 4.3) ÷ 3 = 4.3 cm (1).' },
  { q: 'Explain the difference between a **random** error and a **systematic** error. Give **one** example of each.', marks: 3, ms: 'Random: unpredictable scatter / readings vary either side of the true value; reduced by repeating and taking a mean (1). Systematic: all readings shifted by the same amount in the same direction (1). Examples, one each (1): random, e.g. reaction time with a stopwatch / reading a scale by eye; systematic, e.g. zero error / wrongly calibrated meter.' },
]);
reg(R5.s, 'Recap 5');

// ======================= 23 EQUATIONS USED =======================
reg(D.equationsSlide([['sdt', '2.6'], ['PEt', '10.29'], ['VIR', '10.13'], ['QIt', '10.9'], ['rho', 'Topic 14'], ['pFA', sp('15.11') + 'P']], {
  title: 'Equations used in this deck',
  subtitle: 'Topic 1 has no equations of its own • these later-topic equations appear in the worked examples',
  qc: 'Cover the middle column. For each equation, name every quantity and give its SI unit.',
  notes: 'QUICK CHECK: self-check against the table. Every equation used here is on the RECALL list (none is on the Physics Equations List). E = P × t is the rearranged form of P = E ÷ t. p = F ÷ A is physics only (15.11P). Topic 1 itself introduces no equations; see SPEC_T1.md.',
}), 'Equations used in this deck');

// ======================= 24 KEY WORDS =======================
reg(D.keyWords([
  ['SI unit', 'International standard unit, e.g. m, kg, s, A, K.'],
  ['Base unit', 'One of the seven SI units all others are built from.'],
  ['Derived unit', 'A combination of base units, e.g. N = kg m/s², Pa = N/m².'],
  ['Prefix', 'A multiplier in front of a unit, e.g. k = 10³, μ = 10⁻⁶.'],
  ['Standard form', 'A × 10ⁿ, where 1 ≤ A < 10 and n is a whole number.'],
  ['Significant figures', 'Meaningful digits, counted from the first non-zero digit.'],
  ['Order of magnitude', 'A value rounded to the nearest power of ten.'],
  ['Estimate', 'An approximate answer using sensible rounded values.'],
  ['Resolution', 'The smallest change an instrument can show.'],
  ['Meniscus', 'Curved liquid surface; read the bottom of it at eye level.'],
  ['Mean', 'Sum of the valid readings ÷ number of valid readings.'],
  ['Anomaly', 'A result that does not fit the pattern; leave it out of the mean.'],
  ['Accurate', 'Close to the true value.'],
  ['Precise', 'Repeat readings are close together (small spread).'],
  ['Random error', 'Unpredictable scatter; reduce by repeating and averaging.'],
  ['Systematic error', 'Same shift every time, e.g. a zero error; recalibrate.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. No terms are Higher only.' }), 'Summary: key words');

// ======================= 25 FULL QUESTION =======================
reg(D.fullQuestion('A student investigates how much energy a **2.0 kW** electric kettle transfers when it boils some water. She times the kettle from switching on until it switches off.', [
  { l: 'a', q: 'Give the SI base unit of **time** and the SI unit of **power**.', marks: 2, ms: 'second / s (1); watt / W (1).' },
  { l: 'b', q: 'Write the power of the kettle in watts, in standard form.', marks: 1, ms: '2.0 × 10³ W (1).' },
  { l: 'c', q: 'The kettle is on for **2 minutes 30 seconds**. Calculate the energy transferred in joules. Use **E = P × t**.', marks: 3, ms: 't = 150 s (1); E = 2000 × 150 (1); = 300 000 J / 3.0 × 10⁵ J (1). ECF from (b).', h: 1.15 },
  { l: 'd', q: 'Convert your answer to (c) into kilowatt-hours. (1 kWh = 3.6 × 10⁶ J)', marks: 2, ms: '300 000 ÷ 3.6 × 10⁶ (1); = 0.083 kWh (1). Allow 0.0833. Alternative: 2.0 kW × (150 ÷ 3600) h. ECF from (c).' },
  { l: 'e', q: 'She repeats the timing: **152 s, 149 s, 175 s, 151 s**. Identify the anomaly and calculate the mean time to an appropriate number of significant figures.', marks: 3, ms: '175 s identified as anomaly (1); (152 + 149 + 151) ÷ 3 = 150.67 (1); = 151 s (3 s.f., to match the data) (1).', h: 1.25 },
  { l: 'f', q: 'Her thermometer reads **1.5 °C too high** every time. Name this type of error and explain its effect on her results.', marks: 2, ms: 'Systematic error / zero error (1); every reading is too high by the same amount, so the results are not accurate (but can still be precise); repeating does not remove it (1).' },
], 13, { subtitle: 'Specification 1.1–1.4 and Working Scientifically • answer every part • 13 marks' }), 'Full question');

// ======================= 26–27 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Write in standard form: (i) **0.000 52 m** (ii) **4 800 000 W**.', marks: 2, ms: '(i) 5.2 × 10⁻⁴ m (1); (ii) 4.8 × 10⁶ W (1).' },
  { n: '2', q: 'Convert: (i) **36 km/h** into m/s (ii) **0.25 hours** into seconds.', marks: 2, ms: '(i) 36 ÷ 3.6 = 10 m/s (1); (ii) 0.25 × 3600 = 900 s (1).' },
  { n: '3', q: 'A current of **120 mA** flows for **5.0 minutes**. Calculate the charge that flows. Use **Q = I × t**.', marks: 3, ms: 'I = 0.120 A and t = 300 s (1); Q = 0.120 × 300 (1); = 36 C (1).' },
  { n: '4', q: 'A metal block measures **4.0 cm × 5.0 cm × 10 cm** and has a mass of **1.6 kg**. Calculate its density in kg/m³. Use **ρ = m ÷ V**.', marks: 4, ms: 'V = 4.0 × 5.0 × 10 = 200 cm³ (1); = 2.0 × 10⁻⁴ m³ (1); ρ = 1.6 ÷ 2.0 × 10⁻⁴ (1); = 8000 kg/m³ (1). Alternative: convert each length to m first (0.040 × 0.050 × 0.10).', h: 1.2 },
  { n: '5', q: 'A student has a 30 cm ruler with a resolution of 1 mm. She wants to find the **thickness of one sheet of paper** from a new pack. Describe how she could do this, and explain how her method makes the result as **accurate** and **precise** as possible.', marks: 6, levels: true, h: 2.4, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'One sheet (about 0.1 mm) is thinner than the ruler’s resolution of 1 mm, so it cannot be measured directly.',
    'Measure the thickness of a large stack, e.g. 100 sheets, squeezed flat; count the sheets.',
    'Thickness of one sheet = stack thickness ÷ number of sheets (e.g. 9.0 mm ÷ 100 = 0.090 mm).',
    'A thicker stack makes the 1 mm resolution a smaller fraction of the reading → lower percentage uncertainty / more accurate.',
    'Read the ruler at eye level / perpendicular to avoid parallax; place the zero mark (not the worn end) at the bottom of the stack to avoid a zero error.',
    'Repeat with different stacks or at different places; identify any anomalies and calculate a mean → reduces random error.',
    'Repeat readings that are close together show the result is precise.',
    'Possible use of a micrometer or vernier callipers (higher resolution) as an improvement.',
  ], 'Level 3 responses link the stack method to resolution AND address both accuracy (zero error, parallax) and precision (repeats, mean).');
}
D.homework('Answer every question. Show your working and give units for all calculations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach((r, i) => assert.strictEqual(r.total, 7, `recap ${i + 1} total`));
assert(D.slideNo >= 22 && D.slideNo <= 28, 'slide count ' + D.slideNo);
assert(near(kWh, 3.6e6));
const out = path.join(__dirname, 'EDX_1PH0_T1_KeyConcepts.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
