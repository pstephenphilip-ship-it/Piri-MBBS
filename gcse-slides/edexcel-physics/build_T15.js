// build_T15.js — Edexcel GCSE Physics 1PH0 Topic 15 Forces and matter (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T15.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 15,
  title: 'Forces and matter',
  shortTitle: 'T15',
  subtitle: 'Distortion, springs, pressure in fluids, upthrust and floating',
  specRange: '15.1–15.17',
  pOnly: ['15.7', '15.8', '15.9', '15.10', '15.11', '15.12', '15.13', '15.14', '15.15', '15.16', '15.17'],
  paper: 'Paper 2',
  keywords: ['Elastic', 'Inelastic', 'Spring constant', 'Limit of proportionality', 'Pressure', 'Upthrust'],
};
const D = T.init(DECK);
const { line, arrow, forceArrow, label, box, spring, hspring, massHanger, clampStand, ruler, axes, points, plotLine, fnLine, areaTriangle, liquidColumn, floatingObject, px, py, SH } = D;
const sp = D.spec;
const g = 10; // N/kg, Edexcel exam value
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
// slide 7: F = kx
const k7 = calc('k7 = 4.0/0.16', 4.0 / 0.16, 25);
const qc7 = calc('qc7 F = 25*0.12', 25 * 0.12, 3.0, 1e-12);
// slide 9: graph spring k = 40 N/m, LoP at x = 0.15 m, F = 6 N
const kG = 40, xL = 0.15, FL = calc('FL = 40*0.15', kG * xL, 6, 1e-12);
const tau = 0.06, Aq = kG * tau; // curve beyond LoP with matching slope
const fG = x => x <= xL ? kG * x : FL + Aq * (1 - Math.exp(-(x - xL) / tau));
calc('k from graph 4.0/0.10', 4.0 / 0.10, 40, 1e-12);
calc('qc9 F at 0.05', fG(0.05), 2.0, 1e-12);
// slide 10: energy
const E10 = calc('E10 = 0.5*40*0.15^2', 0.5 * 40 * 0.15 ** 2, 0.45, 1e-12);
calc('area10 = 0.5*6*0.15', 0.5 * 6 * 0.15, 0.45, 1e-12);
const qc10 = calc('qc10 = 0.5*200*0.05^2', 0.5 * 200 * 0.05 ** 2, 0.25, 1e-12);
// slide 11: rearrange + counting squares
const x11 = calc('x11 = sqrt(2*0.20/40)', Math.sqrt(2 * 0.20 / 40), 0.10, 1e-12);
const qc11 = calc('qc11 = sqrt(2*1.0/50)', Math.sqrt(2 * 1.0 / 50), 0.20, 1e-12);
let areaCurve = 0; { const n = 3000, a = 0, b = 0.30; for (let i = 0; i < n; i++) { const x0 = a + (b - a) * i / n, x1 = a + (b - a) * (i + 1) / n; areaCurve += (fG(x0) + fG(x1)) / 2 * (x1 - x0); } }
const sqJ = calc('one square = 0.05 m x 1 N', 0.05 * 1, 0.05, 1e-12);
const nSq = areaCurve / sqJ;
assert(nSq > 31 && nSq < 32.5, 'squares ' + nSq);
calc('area under curve ~ 1.6 J (2 s.f.)', sf(areaCurve, 2), 1.6, 1e-12);
// Core practical data
const L0 = 6.0; // cm
const cpF = [0, 1, 2, 3, 4, 5, 6, 7];
const cpL = [6.0, 10.1, 13.9, 18.0, 22.1, 25.9, 30.0, 36.5];
const cpX = cpL.map(l => +(l - L0).toFixed(1));
assert.deepStrictEqual(cpX, [0, 4.1, 7.9, 12.0, 16.1, 19.9, 24.0, 30.5]);
const kCP = calc('k = 6.0/0.24', 6.0 / 0.24, 25);
const Wcp = calc('W = 0.5*6.0*0.24', 0.5 * 6.0 * 0.24, 0.72, 1e-12);
calc('E = 0.5*25*0.24^2', 0.5 * 25 * 0.24 ** 2, 0.72, 1e-12);
calc('mass 100 g weight', 0.100 * g, 1.0, 1e-12);
cpX.slice(1, 7).forEach((x, i) => assert(Math.abs(x / 100 * 25 - cpF[i + 1]) < 0.06, 'cp scatter'));
// pressure
const p19a = calc('p snowshoes 600/0.30', 600 / 0.30, 2000, 1e-9);
const p19b = calc('p boots 600/0.040', 600 / 0.040, 15000, 1e-6);
const qc19 = calc('pin 20/1.0e-7', 20 / 1.0e-7, 2.0e8, 1);
const F20 = calc('F = 1.0e5*0.50', 1.0e5 * 0.50, 5.0e4, 1e-6);
const qc20 = calc('qc20 F = 1.0e5 * 0.0040', 1.0e5 * 0.0040, 400, 1e-9);
// liquids
const p24 = calc('p = 12*1030*10', 12 * 1030 * g, 123600, 1e-6);
calc('p24 3sf', sf(p24, 3), 124000, 1e-6);
const p24tot = calc('total = 1.236e5 + 1.0e5', p24 + 1.0e5, 223600, 1e-6);
const dp24 = calc('dp = 3.0*1000*10', (5.0 - 2.0) * 1000 * g, 30000, 1e-6);
const qc24 = calc('oil 0.40*800*10', 0.40 * 800 * g, 3200, 1e-9);
// upthrust (block 0.10 x 0.10 x 0.20 m)
const Vb = calc('V block', 0.10 * 0.10 * 0.20, 0.0020, 1e-12);
const mdis = calc('m displaced', 1000 * Vb, 2.0, 1e-9);
const U26 = calc('upthrust', mdis * g, 20, 1e-9);
const Ftop = calc('F top = 0.30*1000*10*0.010', 0.30 * 1000 * g * 0.010, 30, 1e-9);
const Fbot = calc('F bot = 0.50*1000*10*0.010', 0.50 * 1000 * g * 0.010, 50, 1e-9);
calc('net = Fbot - Ftop', Fbot - Ftop, U26, 1e-9);
const qc26 = calc('qc26 U = 1000*0.00030*10', 1000 * 0.00030 * g, 3.0, 1e-9);
// floating
const Wboat = calc('boat W = 1200*10', 1200 * g, 12000, 1e-9);
const Vdis = calc('V displaced = 1200/1000', 1200 / 1000, 1.2, 1e-12);
calc('fraction submerged 600/1000', 600 / 1000, 0.6, 1e-12);
// recaps
calc('R1 k = 6.0/0.15', 6.0 / 0.15, 40, 1e-9);
calc('R2 E = 0.5*30*0.20^2', 0.5 * 30 * 0.2 ** 2, 0.60, 1e-12);
calc('R2 x = sqrt(2*0.36/50)', Math.sqrt(2 * 0.36 / 50), 0.12, 1e-12);
calc('R3 k = 5.0/0.20', 5.0 / 0.20, 25, 1e-9);
calc('R3 W = 0.5*5.0*0.20', 0.5 * 5.0 * 0.20, 0.50, 1e-12);
calc('R4 p = 750/0.025', 750 / 0.025, 30000, 1e-6);
calc('R5 p = 8.0*1000*10', 8.0 * 1000 * g, 80000, 1e-6);
calc('R5 dp = 4.0*1030*10', (7.0 - 3.0) * 1030 * g, 41200, 1e-6);
calc('R6 U = 1000*0.0050*10', 1000 * 0.0050 * g, 50, 1e-9);
// full question
calc('FQ x = 0.200-0.080', 0.200 - 0.080, 0.12, 1e-12);
calc('FQ k = 3.0/0.12', 3.0 / 0.12, 25, 1e-9);
calc('FQ E = 0.5*25*0.12^2', 0.5 * 25 * 0.12 ** 2, 0.18, 1e-12);
const UFQ = calc('FQ U = 1000*4.0e-5*10', 1000 * 4.0e-5 * g, 0.40, 1e-12);
calc('FQ new x = (3.0-0.40)/25', (3.0 - UFQ) / 25, 0.104, 1e-12);
// homework
calc('HW F = 80*0.050', 80 * 0.050, 4.0, 1e-12);
calc('HW E = 0.5*80*0.050^2', 0.5 * 80 * 0.05 ** 2, 0.10, 1e-12);
calc('HW p = 1200/0.60', 1200 / 0.60, 2000, 1e-9);
calc('HW p = 2.5*1000*10', 2.5 * 1000 * g, 25000, 1e-9);
// starter
calc('starter density 0.60/0.00050', 0.60 / 0.00050, 1200, 1e-9);

// slide plan constants for the "where this fits" slide (asserted at the end)
const P_FIRST = 19, P_LAST = 28;

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Forces and Matter',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • Core Practical 15.6 (springs)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT pill = Higher tier only • P = physics only' },
    { icon: '15', text: `Topic 15 of 15 • ${DECK.paper}` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 15 Forces and matter (Paper 2). Statements 15.1–15.6 are shared with Combined Science 1SC0; 15.7P–15.17P are physics only. g = 10 N/kg is used throughout, as in Edexcel papers.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '15.1', text: 'Explain why stretching, bending or compressing an object needs **more than one force**.' },
  { code: '15.2', text: 'Describe the difference between **elastic** and **inelastic** distortion.' },
  { code: '15.3, 15.5', text: 'Recall and use **F = k × x**; describe linear and non-linear force–extension graphs and the **limit of proportionality**.' },
  { code: '15.4', text: 'Calculate the **work done** in stretching a spring: E = ½ × k × x² and the area under the graph.' },
  { code: '15.6', text: '**Core Practical:** investigate the extension and work done when applying forces to a spring.' },
  { code: '15.7P–15.11P', text: 'Explain **pressure** (p = F/A), pressure in fluids and why **atmospheric pressure** falls with height.' },
  { code: '15.12P–15.14P', text: 'Describe and explain how liquid pressure depends on **depth and density**; use P = h × ρ × g.', ht: true },
  { code: '15.15P–15.17P', text: 'Explain **upthrust**, relate it to the weight of fluid displaced, and explain floating and sinking.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'Objectives 6–8 are physics only (1PH0). The HT pills mark objectives that contain Higher-only statements (15.13P–15.17P, medium confidence – see SPEC_T15.md). 15.12P (describe) is for both tiers.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Specification 15.1–15.17 • Topic 15 is the last topic on Paper 2', { tag: 'Context' });
  const nodes = [
    ['15.1–15.2', 'Forces that change shape; elastic and inelastic distortion', 'Both courses', C.blue],
    ['15.3–15.5', 'F = k × x, limit of proportionality, energy stored E = ½kx²', 'Both courses', C.blue],
    ['15.6', 'Core Practical: extension and work done for a spring', 'Both courses', C.orange],
    ['15.7P–15.11P', 'Pressure p = F/A, fluids, atmospheric pressure', 'Physics only', C.red],
    ['15.12P–15.14P', 'Pressure in liquids, P = h × ρ × g (HT)', 'Physics only', C.red],
    ['15.15P–15.17P', 'Upthrust, floating and sinking (HT)', 'Physics only', C.red],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'Topic 15\nForces and matter', { h: 0.75, size: 13, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 1.35 + 0.82 * 5 + 0.98, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.75;
    line(s, 1.0, y + 0.3, 1.45, y + 0.3, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.82 - 0.3, 6.6, 'Earlier links: Topic 1 units • Topic 2 weight W = mg • Topic 8 work done • Topic 9 forces • Topic 14 density', { size: 10.5, italic: true, color: C.grey });
  // right boxes
  box(s, 7.35, 1.35, 5.53, 2.65, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 8–15.',
      'Combined Science 1SC0 **Paper 6** (Physics 2) also tests 15.1–15.6.',
      'Equations: **recall** F = k × x and p = F/A; **given** E = ½kx² and P = hρg.',
      'Core Practical 15.6 can be examined in any style, including method and analysis.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.15, 5.53, 2.7, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Teach every slide to Foundation; **HT** pills mark Higher-only content.',
      `**Combined (1SC0) classes skip slides ${P_FIRST}–${P_LAST}** (all 15.7P–15.17P pressure and upthrust content), full question part (f) and homework Q4–Q6.`,
      'The whole topic is **not** physics-only: 15.1–15.6 are in both courses.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.25, w: 5.15, h: 2.5, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, `Physics-only statements: ${DECK.pOnly.map(c => c + 'P').join(', ')}. Combined Science classes stop after slide 18 (recap 3) and go straight to the equations, key words, full question (a)–(e) and homework Q1–Q3 and Q7.`);
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • units', q: 'Convert **35 cm** into metres and **2.5 kN** into newtons.' },
  { from: 'Topic 1 • standard form', q: 'Write **0.00040 m²** in standard form.' },
  { from: 'Topic 9 • resultant force', q: 'A box has 12 N acting to the right and 5 N acting to the left. Give the size and direction of the **resultant force**.' },
  { from: 'Topic 9 • contact forces', q: 'Gravity is a non-contact force. Name **two contact forces**.' },
  { from: 'Topic 14 • density', q: 'A block has mass 0.60 kg and volume 0.00050 m³. Calculate its **density**.' },
  { from: 'Topic 14 • gas pressure', q: 'Explain how the particles of a gas exert a **pressure** on the walls of its container.' },
], { subtitle: 'Recall from Topics 1, 9 and 14 • 6 minutes • no notes', notes: 'ANSWERS\n1. 0.35 m; 2500 N.\n2. 4.0 × 10⁻⁴ m².\n3. 7 N to the right.\n4. Any two: friction, air resistance/drag, normal contact (reaction) force, tension, upthrust.\n5. ρ = m/V = 0.60/0.00050 = 1200 kg/m³.\n6. Particles move randomly and collide with the walls; each collision exerts a force on the wall; pressure = total force per unit area.' }), 'Retrieval starter');

// ======================= 5 15.1 MORE THAN ONE FORCE =======================
reg(D.contentSlide({
  title: 'Changing shape needs more than one force',
  subtitle: `Specification ${sp('15.1')} • stretching, compressing and bending`,
  tag: '15.1', caption: 'force arrows show the forces acting on each object',
  draw: (s, p) => {
    // stretching
    label(s, 0.65, 1.5, 1.6, 'Stretching', { bold: true, size: 12, align: 'left', color: C.ink });
    hspring(s, 2.3, 2.15, 2.3, { coils: 9 });
    forceArrow(s, 2.3, 2.15, 'left', 0.75, 'pull', C.red, { lw: 0.6 });
    forceArrow(s, 4.6, 2.15, 'right', 0.75, 'pull', C.red, { lw: 0.6 });
    // compressing
    label(s, 0.65, 2.75, 1.6, 'Compressing', { bold: true, size: 12, align: 'left', color: C.ink });
    hspring(s, 2.85, 3.4, 1.3, { coils: 9, width: 0.34 });
    arrow(s, 2.05, 3.4, 2.83, 3.4, C.red, 3); label(s, 1.5, 3.26, 0.5, 'push', { bold: true, color: C.red, size: 11, align: 'right' });
    arrow(s, 4.95, 3.4, 4.17, 3.4, C.red, 3); label(s, 5.0, 3.26, 0.6, 'push', { bold: true, color: C.red, size: 11, align: 'left' });
    // bending
    label(s, 0.65, 4.0, 1.6, 'Bending', { bold: true, size: 12, align: 'left', color: C.ink });
    const pts = []; for (let i = 0; i <= 20; i++) { const t = i / 20; pts.push([1.9 + 3.4 * t, 4.75 + 0.28 * Math.sin(Math.PI * t)]); }
    for (let i = 0; i < 20; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.wood, 6);
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: 1.75, y: 4.8, w: 0.36, h: 0.32, fill: { color: '5A6275' }, line: { color: '5A6275' } });
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: 5.1, y: 4.8, w: 0.36, h: 0.32, fill: { color: '5A6275' }, line: { color: '5A6275' } });
    arrow(s, 3.6, 4.15, 3.6, 4.95, C.red, 3); label(s, 3.7, 4.12, 0.7, 'push', { bold: true, color: C.red, size: 11, align: 'left' });
    arrow(s, 1.93, 5.75, 1.93, 5.15, C.blue, 3); arrow(s, 5.28, 5.75, 5.28, 5.15, C.blue, 3);
    label(s, 2.05, 5.5, 3.1, 'support forces from both ends', { color: C.blue, size: 10.5, bold: true });
  },
  head: 'Why one force is not enough',
  lines: [
    'To **stretch**, **compress** or **bend** an object you need **at least two forces** acting on it in different places.',
    'With only **one** force, the object would just **accelerate** in the direction of that force (resultant force) instead of changing shape.',
    'A spring held at one end: your hand pulls one way, the support pulls back the other way.',
    'Bending a ruler needs **three** forces: a push in the middle and support forces at each end.',
    'Distortion = a change in **shape** (stretched, squashed, bent or twisted).',
  ],
  worked: { head: 'Think it through', q: 'A spring hangs from a clamp. A 2 N weight hangs from its lower end and the spring is still.',
    steps: [['Forces', 'weight of the load pulls the bottom end **down** (2 N)'], ['Second force', 'the clamp pulls the top end **up** (2 N)'], ['Result', 'equal and opposite forces → no acceleration, but the spring is **stretched**'], ['Answer', 'two forces at different points → the spring changes shape']] },
  qc: 'Explain why you cannot squash a ball of modelling clay with just one force.',
  notes: 'QUICK CHECK ANSWER: One force on its own would make the clay accelerate/move in that direction (resultant force); to squash it you need two forces acting in opposite directions on different parts (e.g. hands pushing from both sides, or hand and table).\nTeaching: demonstrate with a spring on a smooth bench pulled from one end – it slides rather than stretches.',
}), '15.1 More than one force');

// ======================= 6 15.2 ELASTIC / INELASTIC =======================
reg(D.contentSlide({
  title: 'Elastic and inelastic distortion',
  subtitle: `Specification ${sp('15.2')} • does the object go back to its original shape?`,
  tag: '15.2', caption: 'the same spring before, during and after loading',
  draw: (s, p) => {
    box(s, 0.7, 1.5, 5.6, 0.12, '5A6275', null);
    const xs = [1.75, 2.95, 4.15, 5.5], top = 1.62, Lr = 1.3;
    spring(s, xs[0], top, Lr, { coils: 10 });
    spring(s, xs[1], top, 2.0, { coils: 10 }); massHanger(s, xs[1], top + 2.0, 3, { w: 0.5 });
    spring(s, xs[2], top, Lr, { coils: 10 });
    spring(s, xs[3], top, 1.85, { coils: 10, width: 0.24 });
    line(s, 0.7, top + Lr, 6.3, top + Lr, C.blue, 1, { dash: 'dash' });
    label(s, 0.6, top + Lr - 0.55, 0.85, 'original\nlength', { h: 0.5, size: 10, italic: true, color: C.blue, align: 'left' });
    const cap = [['1 No load', C.ink], ['2 Load added:\nstretches', C.ink], ['3 Load removed:\nsame length', C.green], ['4 Overstretched,\nload removed:\nstays longer', C.red]];
    cap.forEach(([t, col], i) => label(s, xs[i] - 0.68, 4.3, 1.36, t, { h: 0.7, size: 10.5, bold: true, color: col, valign: 'top' }));
    box(s, 1.05, 5.05, 3.75, 0.55, 'E6F4EC', C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 1.05, 5.05, 3.75, 'ELASTIC', { h: 0.55, bold: true, color: C.green, size: 12 });
    box(s, 4.9, 5.05, 1.3, 0.55, 'FBE9EA', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.9, 5.05, 1.3, 'INELASTIC', { h: 0.55, bold: true, color: C.red, size: 12 });
  },
  head: 'Two kinds of distortion',
  lines: [
    '**Elastic distortion:** the object returns to its **original shape and size** when the forces are removed (e.g. a spring or elastic band used gently).',
    '**Inelastic (plastic) distortion:** the object does **not** return to its original shape when the forces are removed – it is permanently changed (e.g. modelling clay, an overstretched spring).',
    'A spring loaded too far goes past its **elastic limit**; it then distorts inelastically.',
    'Test: remove the load and measure the length again. Same as before → elastic.',
  ],
  worked: { head: 'Sort the examples', q: 'Decide whether each distortion is elastic or inelastic.',
    steps: [['Trampoline', 'springs return to shape → **elastic**'], ['Crushed can', 'stays crushed → **inelastic**'], ['Bow string', 'returns when released → **elastic**'], ['Answer', 'elastic = returns to original shape; inelastic = permanent change']] },
  qc: 'A car bumper dents in a crash and stays dented. Is this elastic or inelastic distortion? Give a reason.',
  notes: 'QUICK CHECK ANSWER: Inelastic – the bumper does not return to its original shape when the force is removed.\nNote: Edexcel 15.2 uses “elastic and inelastic distortion”; students may also see “plastic”.',
}), '15.2 Elastic and inelastic');

// ======================= 7 15.3 F = kx =======================
reg(D.contentSlide({
  title: 'Force and extension: F = k × x',
  subtitle: `Specification ${sp('15.3')} • recall and use the equation for linear elastic distortion`,
  tag: '15.3', caption: 'extension = new length − original length',
  draw: (s, p) => {
    box(s, 0.8, 1.55, 5.4, 0.12, '5A6275', null);
    const top = 1.67, L0d = 1.4, L1 = 2.5;
    spring(s, 1.9, top, L0d, { coils: 10 });
    spring(s, 4.3, top, L1, { coils: 10 }); const hb = massHanger(s, 4.3, top + L1, 3, { w: 0.5 });
    line(s, 1.0, top + L0d, 5.9, top + L0d, C.blue, 1, { dash: 'dash' });
    line(s, 3.6, top + L1, 5.9, top + L1, C.blue, 1, { dash: 'dash' });
    // original length dimension
    arrow(s, 1.3, top + 0.02, 1.3, top + L0d, C.blue, 1.5, { tail: true });
    label(s, 0.55, top + L0d / 2 - 0.3, 0.75, 'original\nlength', { h: 0.6, size: 10.5, color: C.blue, bold: true, align: 'right' });
    // extension
    arrow(s, 5.55, top + L0d, 5.55, top + L1, C.red, 1.75, { tail: true });
    label(s, 5.62, top + (L0d + L1) / 2 - 0.15, 0.6, 'x', { size: 14, bold: true, color: C.red, align: 'left' });
    label(s, 4.95, top + L1 + 0.05, 1.3, 'extension', { size: 10.5, bold: true, color: C.red, align: 'right' });
    forceArrow(s, 4.3, hb + 0.05, 'down', 0.65, 'F (weight of load)', C.red, { lw: 1.8 });
    label(s, 1.2, 4.5, 1.4, 'no load', { size: 11, bold: true });
  },
  head: 'The spring equation',
  lines: [
    { t: '__F = k × x__   force exerted on a spring (N) = spring constant (N/m) × extension (m)', nob: true },
    { t: 'RECALL: you must learn this equation (it is not on the equation sheet).', nob: true, color: C.red, b: true, size: 10.5 },
    '**Extension x** = new length − original length. Convert cm to m: ÷ 100.',
    '**Spring constant k** tells you how stiff the spring is: a bigger k needs a bigger force for each metre of extension.',
    'Only true while F and x are **directly proportional** (the linear region).',
  ],
  worked: { head: 'Worked example', q: 'A 4.0 N force stretches a spring by 16 cm. Calculate the spring constant.',
    steps: ['F = k × x', 'k = F ÷ x', 'k = 4.0 N ÷ 0.16 m', `k = ${k7} N/m`] },
  qc: 'A spring has k = 25 N/m. What force is needed to stretch it by 12 cm?',
  notes: `QUICK CHECK ANSWER: F = k × x = 25 × 0.12 = ${qc7.toFixed(1)} N (1 mark for converting 12 cm to 0.12 m).\nWorked example checked in node: 4.0/0.16 = ${k7} N/m.`,
}), '15.3 F = k × x');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('15.1')}–${sp('15.3')} • forces, distortion and F = k × x`, [
  { q: 'Explain why **two** forces are needed to stretch an elastic band.', marks: 2, ms: 'One force alone would make the band accelerate/move (1); two forces in opposite directions acting at different points stretch it / change its shape (1).' },
  { q: 'Describe the difference between **elastic** and **inelastic** distortion. Give **one** example of each.', marks: 3, ms: 'Elastic: returns to original shape/length when force removed (1); inelastic: does not return / permanent change of shape (1); one correct example of each, e.g. spring / modelling clay (1).' },
  { q: 'A force of **6.0 N** stretches a spring by **15 cm**. Calculate the spring constant of the spring. Give the unit.', marks: 3, ms: 'k = F/x (1); = 6.0/0.15 (1); = 40 N/m (1, unit needed).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 15.5 LINEAR / NON-LINEAR =======================
const graphLoP = (s, gg, o = {}) => {
  axes(s, gg);
  fnLine(s, gg, fG, 0, xL, 6, C.blue, 2.5);
  fnLine(s, gg, fG, xL, 0.30, 30, C.red, 2.5);
  if (o.lop !== false) {
    s.addShape(SH.OVAL, { x: px(gg, xL) - 0.09, y: py(gg, FL) - 0.09, w: 0.18, h: 0.18, fill: { color: C.white }, line: { color: C.ink, width: 2 } });
    arrow(s, px(gg, xL) - 0.75, py(gg, FL) - 0.62, px(gg, xL) - 0.12, py(gg, FL) - 0.1, C.ink, 1.25);
    label(s, px(gg, xL) - 2.2, py(gg, FL) - 0.92, 1.95, 'limit of proportionality', { size: 10.5, bold: true, color: C.ink, align: 'right' });
  }
};
const G9 = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 0.30, ymin: 0, ymax: 9, xstep: 0.05, ystep: 1, minor: 5, xlabel: 'extension / m', ylabel: 'force / N', fmt: v => v.toFixed(2), yfmt: v => String(v) };
reg(D.contentSlide({
  title: 'Linear and non-linear force–extension graphs',
  subtitle: `Specification ${sp('15.5')}, ${sp('15.3')} • the limit of proportionality`,
  tag: '15.5', caption: 'drawn to scale for a spring with k = 40 N/m',
  draw: (s, p) => {
    graphLoP(s, G9);
    label(s, px(G9, 0.05) - 0.2, py(G9, 3.6) - 0.1, 1.2, 'linear', { size: 11, bold: true, color: C.blue, align: 'left' });
    label(s, px(G9, 0.22), py(G9, 8.2) + 0.25, 1.0, 'non-linear', { size: 11, bold: true, color: C.red, align: 'left' });
  },
  head: 'Reading the graph',
  lines: [
    '**Linear** region: a straight line through the origin, so F ∝ x. Double the force → double the extension.',
    'The **gradient** of a force–extension graph (force on the y-axis) = **spring constant k**.',
    '**Limit of proportionality:** the point beyond which force and extension are no longer proportional – the line starts to curve.',
    '**Non-linear** region: the extension increases by more for each extra newton; F = k × x no longer applies.',
  ],
  worked: { head: 'Worked example: k from the graph', q: 'Use the straight part of the graph to find the spring constant.',
    steps: [['Read', 'at x = 0.10 m, F = 4.0 N'], ['Equation', 'k = F ÷ x (= gradient)'], ['Substitute', 'k = 4.0 N ÷ 0.10 m'], ['Answer', `k = ${kG} N/m`]] },
  qc: 'Use the graph: what force gives an extension of 0.05 m? What is the force at the limit of proportionality?',
  notes: `QUICK CHECK ANSWER: 2.0 N (from F = 40 × 0.05); limit of proportionality at ${FL} N (x = ${xL} m).\nGraph drawn to scale: linear F = 40x to (0.15 m, 6.0 N), then curving (non-linear).`,
}), '15.5 Linear and non-linear');

// ======================= 10 15.4 ENERGY STORED =======================
const G10 = Object.assign({}, G9, { xmax: 0.20, ymax: 8, xstep: 0.05 });
reg(D.contentSlide({
  title: 'Work done in stretching a spring',
  subtitle: `Specification ${sp('15.4')} • energy stored = area under the force–extension graph`,
  tag: '15.4', caption: 'shaded area = work done = energy stored (k = 40 N/m)',
  draw: (s, p) => {
    axes(s, G10);
    areaTriangle(s, G10, 0.15, 6.0);
    plotLine(s, G10, [[0, 0], [0.15, 6.0]], C.blue, 2.5);
    line(s, px(G10, 0.15), py(G10, 6), px(G10, 0.15), py(G10, 0), C.ink, 1, { dash: 'dash' });
    label(s, px(G10, 0.085), py(G10, 1.6), 1.2, 'area = ½ × F × x', { size: 11, bold: true, color: C.orange, align: 'left' });
    label(s, px(G10, 0.15) + 0.05, py(G10, 6.3), 1.4, '(0.15 m, 6.0 N)', { size: 10.5, bold: true, color: C.blue, align: 'left' });
  },
  head: 'Energy stored in a stretched spring',
  lines: [
    'Work is done on a spring to stretch it. If the distortion is **elastic**, the energy is stored as **elastic potential energy**.',
    { t: '__E = ½ × k × x²__   energy transferred in stretching (J) = 0.5 × spring constant (N/m) × (extension (m))²', nob: true },
    { t: 'GIVEN on the Physics Equations List – you must be able to select and use it.', nob: true, color: C.green, b: true, size: 10.5 },
    'Work done = **area under the force–extension graph** (a triangle in the linear region).',
  ],
  worked: { head: 'Worked example', q: 'The spring (k = 40 N/m) is stretched by 0.15 m. Calculate the energy stored.',
    steps: [['Equation', 'E = ½ × k × x²'], ['Substitute', 'E = 0.5 × 40 × 0.15²'], ['Check', 'area = ½ × 6.0 N × 0.15 m'], ['Answer', `E = ${E10.toFixed(2)} J`]] },
  qc: 'A spring with k = 200 N/m is stretched by 5.0 cm. Calculate the energy stored.',
  notes: `QUICK CHECK ANSWER: E = 0.5 × 200 × 0.050² = ${qc10} J.\nCommon error: forgetting to square x, or squaring (k × x).`,
}), '15.4 Energy stored');

// ======================= 11 STRETCH: rearranging & non-linear area =======================
const G11 = Object.assign({}, G9);
reg(D.contentSlide({
  title: 'Work done beyond the limit of proportionality',
  subtitle: `Specification ${sp('15.4')}, ${sp('15.5')} • rearranging E = ½kx² and counting squares`,
  tag: '15.4 stretch', stretch: true, caption: 'area under the whole curve, estimated by counting squares',
  draw: (s, p) => {
    axes(s, G11);
    const n = 30; for (let i = 0; i < n; i++) { const xa = 0.30 * i / n, xb = 0.30 * (i + 1) / n, f = fG((xa + xb) / 2); box(s, px(G11, xa), py(G11, f), px(G11, xb) - px(G11, xa), py(G11, 0) - py(G11, f), 'F5A742', null, { tr: 60 }); }
    fnLine(s, G11, fG, 0, xL, 6, C.blue, 2.5);
    fnLine(s, G11, fG, xL, 0.30, 30, C.red, 2.5);
    box(s, px(G11, 0.0), py(G11, 9), px(G11, 0.05) - px(G11, 0.0), py(G11, 8) - py(G11, 9), null, C.ink, { lw: 1.5 });
    label(s, px(G11, 0.05) + 0.05, py(G11, 9) - 0.03, 2.2, '1 square = 0.05 m × 1 N = 0.05 J', { size: 10.5, bold: true, align: 'left' });
  },
  head: 'Two Grade 7–9 skills',
  lines: [
    '**Rearranging E = ½kx²:** x² = 2E ÷ k, so x = √(2E ÷ k). Square-root as the last step.',
    'Beyond the limit of proportionality, E = ½kx² does **not** apply – use the **area under the curve**.',
    `Count squares: about **${Math.round(nSq)} squares** × 0.05 J ≈ **${sf(areaCurve, 2)} J** of work done up to 0.30 m.`,
    'Count part-squares as halves; state the value of one square first.',
  ],
  worked: { head: 'Worked example (rearranging)', q: 'A spring with k = 40 N/m stores 0.20 J. Calculate its extension.',
    steps: ['E = ½ × k × x²', 'x = √(2E ÷ k)', 'x = √(2 × 0.20 ÷ 40) = √0.010', `x = ${x11.toFixed(2)} m (10 cm)`] },
  qc: 'A spring with k = 50 N/m stores 1.0 J of energy. Calculate its extension.',
  notes: `QUICK CHECK ANSWER: x = √(2 × 1.0 ÷ 50) = √0.040 = ${qc11.toFixed(2)} m.\nArea under the curve computed numerically in node: ${areaCurve.toFixed(3)} J = ${nSq.toFixed(1)} squares of 0.05 J (accept 1.5–1.7 J).`,
}), 'Stretch: rearranging and area');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('15.3')}–${sp('15.5')} • graphs and energy stored`, [
  { q: 'Describe how a force–extension graph shows that a spring obeys F = k × x, and how you could find the **limit of proportionality** from it.', marks: 2, ms: 'Straight line through the origin / F directly proportional to x (1); limit of proportionality is where the line stops being straight / starts to curve (1).' },
  { q: 'A spring has a spring constant of **30 N/m**. It is stretched by **0.20 m**. Calculate the energy stored in the spring. Use E = ½ × k × x².', marks: 2, ms: 'E = 0.5 × 30 × 0.20² (1); = 0.60 J (1).' },
  { q: 'A spring with spring constant **50 N/m** stores **0.36 J**. Calculate the extension of the spring.', marks: 3, ms: 'x² = 2E/k (1); = 2 × 0.36/50 = 0.0144 (1); x = 0.12 m (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 CP METHOD =======================
reg(D.contentSlide({
  title: 'Core Practical: springs – apparatus and method',
  subtitle: `Specification ${sp('15.6')} • investigate the extension and work done when applying forces to a spring`,
  tag: 'CP 15.6', cp: true, caption: 'clamp stand, spring, metre rule and slotted masses',
  draw: (s, p) => {
    box(s, 0.65, 5.55, 5.7, 0.08, 'B0B7C6', null); // bench
    clampStand(s, 1.4, 5.55, 4.0, 3.55, 1.85);
    // second clamp holding ruler
    box(s, 1.31, 4.85, 0.18, 0.16, '4A5262', '4A5262'); box(s, 1.4, 4.9, 2.6, 0.06, '8C96A8', '6B7385');
    ruler(s, 4.0, 2.2, 30, 0.105);
    spring(s, 3.55, 1.88, 1.35, { coils: 10, width: 0.3 });
    // pointer
    line(s, 3.55, 3.23, 4.05, 3.23, C.red, 2);
    const hb = massHanger(s, 3.55, 3.23, 4, { w: 0.5 });
    // G clamp & labels
    box(s, 0.75, 5.35, 0.35, 0.2, '4A5262', null);
    const L = (x, y, x2, y2, t, w, al) => { line(s, x, y, x2, y2, C.grey, 0.75); label(s, al === 'right' ? x2 - w - 0.05 : x2 + 0.05, y2 - 0.14, w, t, { size: 10.5, bold: true, align: al || 'left', color: C.ink }); };
    L(3.7, 2.4, 5.0, 1.95, 'spring', 1.0);
    L(4.36, 3.5, 5.0, 3.0, 'metre rule', 1.2);
    L(4.05, 3.23, 5.0, 3.45, 'pointer', 1.0);
    L(3.85, 3.8, 5.0, 4.15, 'slotted masses', 1.3);
    L(1.4, 3.9, 2.3, 3.6, 'clamp stand', 1.3);
    L(0.92, 5.4, 1.6, 5.2, 'G-clamp', 1.0);
  },
  head: 'Method',
  lines: [
    'Clamp the spring and a vertical metre rule to the stand. Fix a **pointer** to the bottom of the spring.',
    'Record the pointer reading with no masses: the **original length**.',
    'Add a 100 g mass (weight 1.0 N). Read the new length with your **eye level** with the pointer.',
    'Repeat, adding 1.0 N each time, up to about 7 N. **Extension** = length − original length.',
    'Remove the masses one at a time to check the spring returns to its original length (elastic).',
    'Plot **force (y) against extension (x)**; draw a line of best fit.',
  ],
  worked: { head: 'Tips for accurate results', q: '',
    steps: [['Zero', 'measure the original length **before** loading'], ['Eye level', 'avoids parallax error when reading the rule'], ['Wait', 'let the spring stop bouncing before you read'], ['Answer', 'check the rule is vertical (use a set square)']] },
  qc: 'Why should you read the metre rule with your eye level with the pointer?',
  notes: 'QUICK CHECK ANSWER: To avoid parallax error, so the reading is accurate.\nEquipment: clamp stand, two bosses and clamps, G-clamp, spring, metre rule, pointer (e.g. splint taped to spring), 100 g mass hanger and slotted masses, safety goggles.',
}), 'CP: apparatus and method');

// ======================= 14 CP VARIABLES & SAFETY =======================
reg(D.contentSlide({
  title: 'Core Practical: variables and safety',
  subtitle: `Specification ${sp('15.6')} • planning a fair test`,
  tag: 'CP 15.6', cp: true, caption: 'what you change, measure and keep the same',
  draw: (s, p) => {
    const bx = (y, col, head, body) => {
      box(s, 0.75, y, 5.5, 1.15, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
      box(s, 0.75, y, 0.12, 1.15, col, null);
      s.addText([{ text: head, options: { bold: true, color: col, fontSize: 12.5, breakLine: true } }, ...T.rich(body, { fontSize: 11.5, color: C.text })], { x: 1.0, y: y + 0.06, w: 5.1, h: 1.03, fontFace: 'Calibri', valign: 'middle', margin: 0 });
    };
    bx(1.5, C.blue, 'Independent variable (you change)', '**force** on the spring (weight of the masses, N)');
    arrow(s, 3.5, 2.67, 3.5, 2.93, C.grey, 2);
    bx(2.95, C.red, 'Dependent variable (you measure)', '**extension** of the spring (m), from the length readings');
    arrow(s, 3.5, 4.12, 3.5, 4.38, C.grey, 2);
    bx(4.4, C.green, 'Control variables (keep the same)', 'the **same spring** • same starting position of the rule • same g / mass size steps');
  },
  head: 'Analysis plan',
  lines: [
    'Use your graph to find **k** from the gradient of the straight part.',
    'Find the **work done** from the area under the graph (or E = ½kx² in the linear region).',
    'Identify the **limit of proportionality** where the line starts to curve.',
  ],
  cardFill: C.cardBlue,
  worked: { head: 'Safety', q: 'Hazard → risk → control',
    steps: [['Masses', 'could fall on feet → keep feet clear; tray or cushion below'], ['Spring', 'could snap back into eyes → wear **safety goggles**'], ['Stand', 'could topple → clamp it to the bench with a G-clamp'], ['Answer', 'do not overload: stop when the spring stays stretched']], size: 10.5 },
  workedH: 2.55,
  qc: 'Name the independent variable and the dependent variable in this investigation.',
  notes: 'QUICK CHECK ANSWER: Independent = force (weight added); dependent = extension.\nControl: same spring, same temperature, rule kept vertical.',
}), 'CP: variables and safety');

// ======================= 15 CP RESULTS TABLE + GRAPH =======================
const GCP = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 0.32, ymin: 0, ymax: 8, xstep: 0.04, ystep: 1, minor: 4, xlabel: 'extension / m', ylabel: 'force / N', fmt: v => v.toFixed(2), yfmt: v => String(v) };
{
  const s = D.contentHeader('Core Practical: results and graph', `Specification ${sp('15.6')} • sample results for one spring (g = 10 N/kg)`, { cp: true, tag: 'CP 15.6' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale; best-fit line through the linear points');
  axes(s, GCP);
  points(s, GCP, cpX.map((x, i) => [x / 100, cpF[i]]));
  plotLine(s, GCP, [[0, 0], [0.24, 6]], C.blue, 2);
  // curve from (0.24,6) to (0.305,7)
  plotLine(s, GCP, [[0.24, 6], [0.26, 6.42], [0.28, 6.75], [0.305, 7.0]], C.red, 2);
  s.addShape(SH.OVAL, { x: px(GCP, 0.24) - 0.08, y: py(GCP, 6) - 0.08, w: 0.16, h: 0.16, fill: { type: 'none' }, line: { color: C.ink, width: 1.5 } });
  label(s, px(GCP, 0.25), py(GCP, 4.6), 1.3, 'limit of\nproportionality', { h: 0.45, size: 10.5, bold: true, align: 'left' });
  arrow(s, px(GCP, 0.26), py(GCP, 4.6), px(GCP, 0.24) + 0.06, py(GCP, 6) + 0.08, C.ink, 1);
  // table
  const head = ['Force / N', 'Length / cm', 'Extension / cm', 'Extension / m'].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
  const rows = [head, ...cpF.map((f, i) => [f.toFixed(1), cpL[i].toFixed(1), cpX[i].toFixed(1), (cpX[i] / 100).toFixed(3)].map((t, j) => ({ text: t, options: { fill: { color: i === 7 ? 'FBE9EA' : (i % 2 ? C.white : C.cardBlue) }, color: i === 7 ? C.red : C.text, bold: j === 0 } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.4, 1.5, 1.6, 1.58], rowH: 0.36, fontFace: 'Calibri', fontSize: 11.5, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.68, 6.08, 1.57, 'What the results show', [
    'Up to **6.0 N** the points lie on a straight line through the origin: F ∝ x.',
    'The **7.0 N** point (red) is off the line: the spring has passed its limit of proportionality.',
    'Original length = 6.0 cm. Each extension = length − 6.0 cm.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the table: what is the extension, in metres, when the force is 4.0 N? Is this point on the straight line?');
  D.notes(s, `QUICK CHECK ANSWER: 16.1 cm = 0.161 m; yes (k × x = 25 × 0.161 = 4.0 N).\nSample data: lengths ${cpL.join(', ')} cm for 0–7 N. Extensions ${cpX.join(', ')} cm. Plotted to scale (force on y-axis).`);
  reg(s, 'CP: results and graph');
}

// ======================= 16 CP k AND WORK DONE =======================
reg(D.contentSlide({
  title: 'Core Practical: spring constant and work done',
  subtitle: `Specification ${sp('15.6')}, ${sp('15.4')} • analysing the graph`,
  tag: 'CP 15.6', cp: true, caption: 'gradient triangle and shaded area on the best-fit line',
  draw: (s, p) => {
    axes(s, GCP);
    areaTriangle(s, GCP, 0.24, 6, 'F5A742', 60);
    plotLine(s, GCP, [[0, 0], [0.24, 6]], C.blue, 2.5);
    points(s, GCP, cpX.slice(0, 7).map((x, i) => [x / 100, cpF[i]]));
    // gradient triangle
    line(s, px(GCP, 0.04), py(GCP, 1), px(GCP, 0.24), py(GCP, 1), C.red, 1.5, { dash: 'dash' });
    line(s, px(GCP, 0.24), py(GCP, 1), px(GCP, 0.24), py(GCP, 6), C.red, 1.5, { dash: 'dash' });
    label(s, px(GCP, 0.10), py(GCP, 1) + 0.03, 1.6, 'Δx = 0.20 m', { size: 10.5, bold: true, color: C.red });
    label(s, px(GCP, 0.24) + 0.05, py(GCP, 3.6), 1.2, 'ΔF = 5.0 N', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, px(GCP, 0.12), py(GCP, 1.9), 1.4, 'area = work done', { size: 10.5, bold: true, color: C.orange, align: 'left' });
  },
  head: 'Finding k and the work done',
  lines: [
    '**k = gradient** = ΔF ÷ Δx. Use a large triangle on the line of best fit, not two data points.',
    `Gradient = 5.0 N ÷ 0.20 m = **${kCP} N/m**.`,
    '**Work done** stretching the spring to 6.0 N = area under the line = ½ × 6.0 N × 0.24 m.',
  ],
  worked: { head: 'Worked example: work done', q: 'Calculate the work done stretching the spring by 0.24 m (k = 25 N/m).',
    steps: [['Equation', 'E = ½ × k × x²'], ['Substitute', 'E = 0.5 × 25 × 0.24²'], ['Check', 'area = ½ × 6.0 × 0.24 = 0.72 J ✓'], ['Answer', `E = ${Wcp.toFixed(2)} J`]] },
  workedH: 2.25,
  qc: 'Calculate the work done when the same spring is stretched to 0.16 m.',
  notes: `QUICK CHECK ANSWER: E = 0.5 × 25 × 0.16² = ${0.5 * 25 * 0.16 ** 2} J (or area ½ × 4.0 × 0.16 = 0.32 J).`,
}), 'CP: k and work done');
calc('CP qc 0.5*25*0.16^2', 0.5 * 25 * 0.16 ** 2, 0.32, 1e-12);

// ======================= 17 CP ERRORS =======================
reg(D.contentSlide({
  title: 'Core Practical: errors and improvements',
  subtitle: `Specification ${sp('15.6')} • evaluating the method`,
  tag: 'CP 15.6', cp: true, caption: 'parallax: the reading depends on where your eye is',
  draw: (s, p) => {
    ruler(s, 3.2, 1.7, 30, 0.115, { major: 5 });
    line(s, 2.3, 3.4, 3.55, 3.4, C.red, 2.5); label(s, 1.3, 3.27, 1.0, 'pointer', { size: 10.5, bold: true, color: C.red, align: 'right' });
    const eye = (x, y, col, t) => { s.addShape(SH.OVAL, { x: x - 0.22, y: y - 0.13, w: 0.44, h: 0.26, fill: { color: C.white }, line: { color: col, width: 1.5 } }); s.addShape(SH.OVAL, { x: x - 0.07, y: y - 0.07, w: 0.14, h: 0.14, fill: { color: col }, line: { color: col } }); label(s, x - 0.6, y + 0.15, 1.2, t, { size: 10.5, bold: true, color: col }); };
    eye(5.3, 2.2, C.red, 'too high'); line(s, 5.08, 2.2, 3.2, 3.68, C.red, 1, { dash: 'dash' });
    eye(5.3, 3.4, C.green, 'eye level ✓'); line(s, 5.08, 3.4, 3.55, 3.4, C.green, 1, { dash: 'dash' });
    eye(5.3, 4.6, C.red, 'too low'); line(s, 5.08, 4.6, 3.2, 3.12, C.red, 1, { dash: 'dash' });
  },
  head: 'Sources of error',
  lines: [
    '**Parallax error:** reading the rule from above or below → read at eye level, or use a pointer close to the rule.',
    '**Rule not vertical** → check with a set square or plumb line.',
    '**Spring still oscillating** → wait until it is still before reading.',
    '**Zero error:** extension must be measured from the unloaded length, not from 0 on the rule.',
    '**Overloading** past the elastic limit permanently stretches the spring – later results are not repeatable.',
  ],
  worked: { head: 'Improving the investigation', q: '',
    steps: [['Repeat', 'take readings loading and unloading; calculate a mean'], ['Range', 'use more, smaller force steps near the limit of proportionality'], ['Precision', 'use a rule with mm marks or a travelling microscope'], ['Answer', 'more data points → more reliable gradient (k)']], size: 10.5 },
  qc: 'A student measured the length of the spring instead of the extension. How would the graph of force against length look?',
  notes: 'QUICK CHECK ANSWER: Still a straight line (in the linear region) with the same gradient, but it would NOT pass through the origin – it would cross the length axis at the original length.',
}), 'CP: errors and improvements');

// ======================= 18 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('15.6')} • Core Practical: springs`, [
  { q: 'In the spring investigation, name the **independent** variable, the **dependent** variable and **one control** variable.', marks: 3, ms: 'IV: force/weight/mass added (1); DV: extension (1); CV: same spring / same original length / same temperature (1).' },
  { q: 'A student did not check that the metre rule was vertical. Explain how this affects the readings and how to fix it.', marks: 2, ms: 'Readings of length/extension would be inaccurate (systematic error) (1); use a set square/plumb line to make the rule vertical (1).' },
  { q: 'From a student’s graph, a force of **5.0 N** gives an extension of **0.20 m** in the linear region. Calculate the spring constant and the work done in stretching the spring to this extension.', marks: 4, ms: 'k = 5.0/0.20 (1) = 25 N/m (1); work done = ½ × 5.0 × 0.20 or ½ × 25 × 0.20² (1) = 0.50 J (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 19 PRESSURE p = F/A =======================
reg(D.contentSlide({
  title: 'Pressure, force and area',
  subtitle: `Specification ${sp('15.10')}, ${sp('15.11')} • pressure = force normal to surface ÷ area`,
  tag: '15.10P', p: true, caption: 'same weight, different area: the snow is pressed less by a large area',
  draw: (s, p) => {
    // snow
    box(s, 0.7, 4.0, 5.6, 1.4, 'F4F7FB', 'B9C4D8');
    // snowshoe: small dent
    box(s, 1.0, 3.92, 2.2, 0.16, '7C8598', null);
    box(s, 1.75, 2.4, 0.7, 1.52, '5A6275', null);
    forceArrow(s, 2.1, 2.5, 'down', 0.9, null, C.red);
    label(s, 0.9, 2.05, 2.4, 'weight 600 N', { bold: true, color: C.red, size: 11 });
    label(s, 0.9, 4.2, 2.4, 'snowshoe 0.30 m²\np = 2000 Pa', { h: 0.55, bold: true, size: 11, color: C.ink });
    // boot: deep dent
    box(s, 4.25, 3.92, 0.5, 0.75, 'DCE3EF', null);
    box(s, 4.25, 2.95 + 0.6, 0.5, 1.12, '5A6275', null);
    box(s, 4.15, 4.5, 0.7, 0.16, '7C8598', null);
    forceArrow(s, 4.5, 2.4, 'down', 0.95, null, C.red);
    label(s, 3.4, 2.05, 2.4, 'weight 600 N', { bold: true, color: C.red, size: 11 });
    label(s, 3.4, 4.75, 2.4, 'boot 0.040 m²\np = 15 000 Pa', { h: 0.55, bold: true, size: 11, color: C.ink });
  },
  head: 'What pressure means',
  lines: [
    { t: '__p = F ÷ A__   pressure (Pa) = force normal to a surface (N) ÷ area of that surface (m²)', nob: true },
    { t: 'RECALL: you must learn this equation. 1 Pa = 1 N/m².', nob: true, color: C.red, b: true, size: 10.5 },
    '**Large area → low pressure:** snowshoes, tractor tyres, wide straps on a bag.',
    '**Small area → high pressure:** knife edges, drawing pins, nails, stiletto heels.',
    'The force must be **normal** (at 90°) to the surface.',
  ],
  worked: { head: 'Worked example', q: 'A walker of weight 600 N stands on boots of total area 0.040 m². Calculate the pressure.',
    steps: ['p = F ÷ A', 'p = 600 N ÷ 0.040 m²', ['Units', 'N ÷ m² = Pa'], `p = ${p19b.toLocaleString('en-GB').replace(',', ' ')} Pa (1.5 × 10⁴ Pa)`] },
  qc: 'A drawing pin is pushed with 20 N. Its point has area 1.0 × 10⁻⁷ m². Calculate the pressure under the point.',
  notes: `QUICK CHECK ANSWER: p = F/A = 20 ÷ 1.0 × 10⁻⁷ = ${qc19.toExponential(1).replace('e+', ' × 10^')} Pa (2.0 × 10⁸ Pa).\nCheck: snowshoes 600/0.30 = ${p19a} Pa; boots 600/0.040 = ${p19b} Pa.`,
}), '15.10P–15.11P Pressure p = F/A');

// ======================= 20 FLUID PRESSURE =======================
reg(D.contentSlide({
  title: 'Pressure in fluids acts in all directions',
  subtitle: `Specification ${sp('15.8')}, ${sp('15.9')} • fluid pressure gives a force normal to any surface`,
  tag: '15.9P', p: true, caption: 'arrows show forces from water pressure, always at 90° to each surface',
  draw: (s, p) => {
    const lc = liquidColumn(s, 1.0, 1.75, 4.9, 3.75, 0.82);
    // atmosphere arrows on surface
    [1.6, 2.8, 4.0, 5.2].forEach(x => arrow(s, x, lc.top - 0.42, x, lc.top - 0.04, C.blue, 2));
    label(s, 1.0, 1.42, 4.9, 'atmospheric pressure acts on the surface', { size: 10.5, bold: true, color: C.blue });
    // wall arrows (normal to walls), longer deeper
    [[2.9, 0.3], [3.6, 0.45], [4.3, 0.6], [5.0, 0.75]].forEach(([y, l]) => { arrow(s, 1.02, y, 1.02 + l * 0.6, y, C.red, 2); arrow(s, 5.88, y, 5.88 - l * 0.6, y, C.red, 2); });
    // base arrows
    [2.0, 3.45, 4.9].forEach(x => arrow(s, x, 5.48, x, 5.0, C.red, 2));
    // submerged ball with inward arrows
    const cx = 3.45, cy = 3.85, r = 0.38;
    s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: 'E8C27A' }, line: { color: '8A6A3A', width: 1 } });
    for (let a = 0; a < 8; a++) { const t = a * Math.PI / 4, L = 0.42 + 0.06 * Math.sin(t); arrow(s, cx + (r + L) * Math.cos(t), cy + (r + L) * Math.sin(t), cx + (r + 0.02) * Math.cos(t), cy + (r + 0.02) * Math.sin(t), C.red, 1.75); }
  },
  head: 'Fluids push on every surface',
  lines: [
    'A **fluid** is a liquid or a gas – its particles can flow.',
    'Particles collide with any surface in the fluid, so fluid pressure causes a force **normal (at 90°) to any surface**, in **all directions**.',
    'The pressure at a point in a liquid is due to the **weight of the liquid above** it **plus** the **atmospheric pressure** on the liquid surface.',
    'Deeper down the arrows are longer: pressure increases with depth.',
  ],
  worked: { head: 'Worked example (rearranging p = F/A)', q: 'Atmospheric pressure is 1.0 × 10⁵ Pa. Calculate the force it exerts on a table top of area 0.50 m².',
    steps: ['p = F ÷ A', 'F = p × A', 'F = 1.0 × 10⁵ Pa × 0.50 m²', `F = 5.0 × 10⁴ N`] },
  qc: 'Calculate the force of the atmosphere (1.0 × 10⁵ Pa) on a phone screen of area 0.0040 m². Why does the screen not break?',
  notes: `QUICK CHECK ANSWER: F = 1.0 × 10⁵ × 0.0040 = ${qc20} N. It does not break because air pushes equally on all sides (the air inside/behind exerts an equal pressure), so there is no resultant force.\nF20 check: ${F20} N.`,
}), '15.8P–15.9P Fluid pressure');

// ======================= 21 ATMOSPHERE =======================
reg(D.contentSlide({
  title: 'Atmospheric pressure and height',
  subtitle: `Specification ${sp('15.7')} • a simple model of the Earth’s atmosphere`,
  tag: '15.7P', p: true, caption: 'air gets less dense with height; the dots are not to scale',
  draw: (s, p) => {
    box(s, 0.7, 1.5, 5.6, 4.1, 'E3ECFA', null);
    // density gradient dots: rows with decreasing count
    let seed = 7; const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    for (let r = 0; r < 10; r++) { const y = 5.25 - r * 0.37, n = Math.round(22 * Math.exp(-r / 3.2)); for (let i = 0; i < n; i++) { const x = 0.8 + rnd() * 5.35; s.addShape(SH.OVAL, { x, y: y + rnd() * 0.25, w: 0.07, h: 0.07, fill: { color: C.blue }, line: { type: 'none' } }); } }
    // ground and mountain
    box(s, 0.7, 5.45, 5.6, 0.15, '6F8F5A', null);
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: 3.4, y: 3.2, w: 2.8, h: 2.27, fill: { color: '8A7F72' }, line: { color: '6B6258' } });
    // columns of air
    box(s, 1.3, 1.6, 0.7, 3.85, null, C.red, { lw: 1.75 });
    box(s, 4.45, 1.6, 0.7, 1.6, null, C.red, { lw: 1.75 });
    box(s, 2.04, 4.5, 1.2, 0.82, C.white, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, tr: 10 });
    box(s, 5.17, 1.6, 1.08, 0.82, C.white, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, tr: 10 });
    label(s, 2.08, 4.55, 1.4, 'sea level:\ntall column\nof air above', { h: 0.75, size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 5.2, 1.65, 1.1, 'mountain:\nshorter\ncolumn', { h: 0.75, size: 10.5, bold: true, color: C.red, align: 'left' });
  },
  head: 'Why pressure falls as you go up',
  lines: [
    'The atmosphere is a thin layer of air around the Earth, held by gravity. It gets **less dense** with height.',
    'Atmospheric pressure is caused by air particles colliding with surfaces – or think of it as the **weight of the column of air** above each square metre.',
    'Higher up there is **less air above** you, so less weight pushing down, and the air is less dense (fewer collisions) → **lower pressure**.',
    'At sea level atmospheric pressure ≈ **100 000 Pa** (1.0 × 10⁵ Pa); at the top of Everest it is about a third of this.',
  ],
  worked: { head: 'Explain it in steps', q: 'Why do your ears “pop” when a plane climbs?',
    steps: [['Height', 'the plane climbs, so less air above'], ['Pressure', 'atmospheric pressure outside the ear falls'], ['Imbalance', 'air in the middle ear is at higher pressure, pushing the eardrum out'], ['Answer', 'the pressures equalise → “pop”']] },
  qc: 'Explain, using the model of the atmosphere, why atmospheric pressure is lower at the top of a mountain than at sea level.',
  notes: 'QUICK CHECK ANSWER: At the top of a mountain there is less air above (shorter column), so the weight of air above each m² is less (1); the air is also less dense so there are fewer particle collisions per second per unit area (1) → lower pressure.',
}), '15.7P Atmospheric pressure');

// ======================= 22 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('15.7')}–${sp('15.11')} • pressure, fluids and the atmosphere`, [
  { q: 'Explain why a **sharp** knife cuts more easily than a blunt knife pushed with the same force.', marks: 2, ms: 'Sharp blade has a smaller area in contact (1); so pressure is greater for the same force (p = F/A) (1).' },
  { q: 'A crate exerts a force of **750 N** on the floor. The area in contact is **0.025 m²**. Calculate the pressure on the floor.', marks: 2, ms: 'p = 750/0.025 (1); = 30 000 Pa / 3.0 × 10⁴ Pa (1).' },
  { q: 'Explain why atmospheric pressure **decreases** as height above the Earth’s surface increases.', marks: 3, ms: 'Less air above / shorter column of air (1); so smaller weight of air acting on each unit area (1); air less dense so fewer collisions with surfaces per second (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 23 DEPTH AND DENSITY =======================
reg(D.contentSlide({
  title: 'Liquid pressure increases with depth and density',
  subtitle: `Specification ${sp('15.12')}, ${sp('15.13')} • describe and explain`,
  tag: '15.12P', p: true, ht: true, caption: 'water spurts further from the deeper holes',
  draw: (s, p) => {
    const x0 = 1.0, w0 = 1.6, top = 1.6, h0 = 3.8;
    const lc = liquidColumn(s, x0, top, w0, h0, 0.92);
    const holes = [[2.4, 'shallow'], [3.4, 'middle'], [4.4, 'deep']];
    holes.forEach(([y, t], i) => {
      const depth = y - lc.top, v = Math.sqrt(depth);
      const pts = []; for (let k = 0; k <= 14; k++) { const tt = k / 14 * 1.2; const xx = x0 + w0 + 1.7 * v * tt, yy = y + 0.55 * tt * tt * (1.1 / Math.max(v, 0.6)); if (yy < 5.4) pts.push([xx, yy]); }
      for (let k = 0; k < pts.length - 1; k++) line(s, pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], C.waterDark, 3);
      s.addShape(SH.OVAL, { x: x0 + w0 - 0.06, y: y - 0.06, w: 0.12, h: 0.12, fill: { color: C.ink }, line: { color: C.ink } });
      label(s, x0 - 0.05, y - 0.14, w0, t, { size: 10.5, bold: true, color: C.ink });
    });
    box(s, 0.7, 5.4, 5.6, 0.08, 'B0B7C6', null);
  },
  head: 'What affects liquid pressure?',
  lines: [
    '**Depth:** the deeper you go, the greater the pressure.',
    '**Density:** at the same depth, a denser liquid gives a greater pressure (sea water > fresh water).',
    '**Why (HT):** at greater depth there is a **taller column of liquid above**, so a greater **weight** of liquid pushes on each m² below it.',
    '**Why (HT):** a denser liquid has more **mass** in the same column, so a greater weight → greater pressure.',
    'Dams are built thicker at the bottom; divers must not rise too quickly.',
  ],
  worked: { head: 'Explain an observation', q: 'Why does water spurt furthest from the lowest hole?',
    steps: [['Depth', 'the lowest hole has the most water above it'], ['Weight', 'greater weight of water above each m²'], ['Pressure', 'greatest pressure at the lowest hole'], ['Answer', 'water is pushed out fastest, so travels furthest']] },
  qc: 'A diver is at the same depth in a freshwater lake and in the sea. Where is the pressure greater, and why?',
  notes: 'QUICK CHECK ANSWER: In the sea – sea water is denser, so a column of the same height has a greater mass/weight, giving greater pressure.\nTier note: describing (15.12P) is both tiers; explaining in terms of weight of liquid above (15.13P) is Higher (medium confidence).',
}), '15.12P–15.13P Depth and density');

// ======================= 24 p = h rho g =======================
reg(D.contentSlide({
  title: 'Calculating pressure in a liquid',
  subtitle: `Specification ${sp('15.14')} • P = h × ρ × g, and pressure differences between depths`,
  tag: '15.14P', p: true, ht: true, caption: 'a column of liquid of height h resting on area A',
  draw: (s, p) => {
    liquidColumn(s, 0.9, 1.6, 5.1, 3.85, 0.95);
    box(s, 2.3, 1.8, 1.4, 3.3, '8DB8E6', C.ink, { lw: 1.25 });
    s.addShape(SH.OVAL, { x: 2.3, y: 4.95, w: 1.4, h: 0.3, fill: { color: '5B9BD5' }, line: { color: C.ink, width: 1.25 } });
    label(s, 2.3, 4.97, 1.4, 'area A', { size: 10.5, bold: true, color: C.white, h: 0.26 });
    arrow(s, 1.9, 1.8, 1.9, 5.1, C.red, 1.75, { tail: true });
    label(s, 1.35, 3.3, 0.5, 'h', { size: 16, bold: true, color: C.red });
    forceArrow(s, 3.0, 3.0, 'down', 1.3, 'weight', C.red, { lw: 1.0 });
    label(s, 3.9, 2.0, 2.0, 'weight of column\n= m × g = (h × A × ρ) × g', { h: 0.55, size: 10.5, bold: true, color: C.ink, align: 'left' });
    label(s, 3.9, 3.6, 2.0, 'p = weight ÷ A\n= h × ρ × g', { h: 0.55, size: 11, bold: true, color: C.blue, align: 'left' });
  },
  head: 'The column equation',
  lines: [
    { t: '__P = h × ρ × g__   pressure due to a column of liquid (Pa) = height of column (m) × density of liquid (kg/m³) × gravitational field strength (N/kg)', nob: true },
    { t: 'GIVEN on the Physics Equations List.', nob: true, color: C.green, b: true, size: 10.5 },
    'This is the pressure due to the **liquid only**. Total pressure = this + atmospheric pressure.',
    '**Pressure difference** between two depths: Δp = Δh × ρ × g.',
  ],
  worked: { head: 'Worked example', q: 'A diver is 12 m deep in sea water (ρ = 1030 kg/m³, g = 10 N/kg). Calculate the pressure due to the water.',
    steps: [['Equation', 'P = h × ρ × g'], ['Substitute', 'P = 12 × 1030 × 10'], ['Total', `+ 1.0 × 10⁵ Pa (air) = 2.24 × 10⁵ Pa`], ['Answer', `P = ${p24.toLocaleString('en-GB').replace(',', ' ')} Pa ≈ 1.24 × 10⁵ Pa`]], size: 10.5 },
  workedH: 2.3,
  qc: 'Calculate the pressure at the bottom of 0.40 m of oil (density 800 kg/m³, g = 10 N/kg).',
  notes: `QUICK CHECK ANSWER: P = 0.40 × 800 × 10 = ${qc24} Pa.\nExtra: pressure difference between 2.0 m and 5.0 m in fresh water = 3.0 × 1000 × 10 = ${dp24} Pa.\nWorked: ${p24} Pa; total ${p24tot} Pa.`,
}), '15.14P P = hρg');

// ======================= 25 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('15.12')}–${sp('15.14')} • pressure in liquids`, [
  { q: 'Describe how the pressure in a liquid depends on the **depth** and the **density** of the liquid.', marks: 2, ms: 'Pressure increases with depth (1); pressure increases with density (1).' },
  { q: 'Calculate the pressure due to the water at a depth of **8.0 m** in a lake. Density of water = 1000 kg/m³, g = 10 N/kg.', marks: 2, ht: true, ms: 'P = 8.0 × 1000 × 10 (1); = 80 000 Pa / 8.0 × 10⁴ Pa (1).' },
  { q: 'Calculate the **difference** in pressure between depths of **3.0 m** and **7.0 m** in sea water of density **1030 kg/m³**. g = 10 N/kg.', marks: 3, ht: true, ms: 'Δh = 4.0 m (1); Δp = 4.0 × 1030 × 10 (1); = 41 200 Pa / 4.12 × 10⁴ Pa (1). Allow calculating both pressures and subtracting (30 900 and 72 100 Pa).' },
]);
reg(R5.s, 'Recap 5');
calc('R5 alt', 7.0 * 1030 * g - 3.0 * 1030 * g, 41200, 1e-6);

// ======================= 26 UPTHRUST =======================
reg(D.contentSlide({
  title: 'Upthrust: the upward force from a fluid',
  subtitle: `Specification ${sp('15.15')}, ${sp('15.16')} • upthrust = weight of fluid displaced`,
  tag: '15.15P', p: true, ht: true, caption: 'block 0.10 m × 0.10 m × 0.20 m held under water',
  draw: (s, p) => {
    const lc = liquidColumn(s, 0.9, 1.55, 5.1, 3.95, 0.9);
    const bx0 = 2.8, bw = 1.2, btop = 2.75, bh = 1.6;
    box(s, bx0, btop, bw, bh, C.wood, '8A6A3A', { lw: 1.25 });
    // top: short down arrows, bottom: long up arrows
    [bx0 + 0.3, bx0 + 0.9].forEach(x => { arrow(s, x, btop - 0.45, x, btop - 0.02, C.red, 2.25); arrow(s, x, btop + bh + 0.85, x, btop + bh + 0.02, C.red, 2.25); });
    // sides equal
    [btop + 0.5, btop + 1.1].forEach(y => { arrow(s, bx0 - 0.55, y, bx0 - 0.02, y, C.grey, 1.75); arrow(s, bx0 + bw + 0.55, y, bx0 + bw + 0.02, y, C.grey, 1.75); });
    label(s, bx0 + bw + 0.1, btop - 0.55, 1.9, 'top: 3000 Pa → 30 N down', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, bx0 + bw + 0.1, btop + bh + 0.3, 1.9, 'bottom: 5000 Pa → 50 N up', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 0.95, btop + 0.62, 1.3, 'sides cancel', { size: 10.5, bold: true, color: C.grey, align: 'left' });
    label(s, 0.95, lc.top + 0.05, 1.5, 'depth 0.30 m', { size: 10.5, color: C.ink, align: 'left' });
    line(s, 2.3, lc.top, 2.3, btop, C.ink, 1, { dash: 'dash', head: true, tail: true });
  },
  head: 'Where upthrust comes from',
  lines: [
    'Pressure increases with depth, so the pressure on the **bottom** of an object is **greater** than on its **top**.',
    'This gives a **resultant upward force**: the **upthrust**. Side forces cancel.',
    'It acts on objects **fully immersed** in a liquid or gas, and on objects **partly immersed** in a liquid (boats).',
    '**Upthrust = weight of fluid displaced** (the fluid pushed out of the way).',
  ],
  worked: { head: 'Worked example', q: 'The block (volume 0.0020 m³) is fully under water (ρ = 1000 kg/m³, g = 10 N/kg). Calculate the upthrust.',
    steps: [['Mass displaced', 'm = ρ × V = 1000 × 0.0020 = 2.0 kg'], ['Weight', 'W = m × g = 2.0 × 10'], ['Check', 'pressure forces: 50 N − 30 N = 20 N ✓'], ['Answer', `upthrust = ${U26.toFixed(0)} N`]], size: 10.5 },
  workedH: 2.25,
  qc: 'A stone of volume 0.00030 m³ is fully under water (ρ = 1000 kg/m³). Calculate the upthrust on it (g = 10 N/kg).',
  notes: `QUICK CHECK ANSWER: mass of water displaced = 1000 × 0.00030 = 0.30 kg; weight = 0.30 × 10 = ${qc26} N = upthrust.\nPressure check: top face at 0.30 m: 3000 Pa × 0.010 m² = ${Ftop} N; bottom at 0.50 m: 5000 Pa × 0.010 m² = ${Fbot} N; net ${Fbot - Ftop} N up.`,
}), '15.15P–15.16P Upthrust');

// ======================= 27 FLOATING AND SINKING =======================
reg(D.contentSlide({
  title: 'Floating and sinking',
  subtitle: `Specification ${sp('15.17')} • comparing upthrust, weight and density`,
  tag: '15.17P', p: true, ht: true, caption: 'force arrows drawn to show relative sizes',
  draw: (s, p) => {
    const lc = liquidColumn(s, 0.8, 1.75, 5.3, 3.7, 0.78);
    // floating block
    const fb = floatingObject(s, 1.9, lc.top, 1.1, 0.8, 0.6, { text: 'wood' });
    arrow(s, 1.55, fb.top + 0.4, 1.55, fb.top + 1.25, C.red, 3); label(s, 0.95, fb.top + 1.1, 0.5, 'W', { bold: true, color: C.red, size: 12, align: 'right' });
    arrow(s, 2.25, fb.bottom + 0.85, 2.25, fb.bottom, C.blue, 3); label(s, 2.35, fb.bottom + 0.6, 0.9, 'U', { bold: true, color: C.blue, size: 12, align: 'left' });
    label(s, 1.0, 5.0, 1.8, 'floats: U = W', { size: 11, bold: true, color: C.green });
    // sinking stone (on its way down)
    box(s, 4.0, 3.15, 0.9, 0.7, '7C8598', '4A5262');
    label(s, 4.0, 3.15, 0.9, 'stone', { h: 0.7, bold: true, color: C.white });
    arrow(s, 4.3, 3.86, 4.3, 4.85, C.red, 3); label(s, 3.65, 4.6, 0.5, 'W', { bold: true, color: C.red, size: 12, align: 'right' });
    arrow(s, 4.6, 4.3, 4.6, 3.86, C.blue, 3); label(s, 4.68, 4.0, 0.5, 'U', { bold: true, color: C.blue, size: 12, align: 'left' });
    label(s, 3.6, 5.0, 2.4, 'sinks: U < W', { size: 11, bold: true, color: C.red });
  },
  head: 'Will it float?',
  lines: [
    'An object **floats** if it can displace a weight of fluid **equal to its own weight** before it is fully submerged: upthrust = weight.',
    'It **sinks** if its weight is greater than the upthrust when fully submerged.',
    'Compare densities: object **less dense** than the fluid → floats; **denser** → sinks.',
    'A steel ship floats because its hollow shape displaces a large volume of water, so its average density is less than water’s.',
  ],
  worked: { head: 'Worked example', q: 'A boat of mass 1200 kg floats in fresh water (ρ = 1000 kg/m³, g = 10 N/kg). What volume of water does it displace?',
    steps: [['Weight', 'W = 1200 × 10 = 12 000 N = upthrust'], ['Mass of water', 'displaced mass = 1200 kg'], ['Volume', 'V = m ÷ ρ = 1200 ÷ 1000'], ['Answer', `V = ${Vdis} m³`]], size: 10.5 },
  workedH: 2.3,
  qc: 'A block has density 600 kg/m³. Will it float or sink in water (1000 kg/m³)? What fraction of it will be under water?',
  notes: `QUICK CHECK ANSWER: Floats – less dense than water. Fraction submerged = 600/1000 = 0.6 (60%) – stretch.\nBoat: W = ${Wboat} N, displaced volume ${Vdis} m³.`,
}), '15.17P Floating and sinking');

// ======================= 28 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('15.15')}–${sp('15.17')} • upthrust, floating and sinking`, [
  { q: 'Explain why an object submerged in water experiences an **upward** force.', marks: 3, ht: true, ms: 'Pressure increases with depth (1); so pressure on the bottom surface is greater than on the top (1); giving a greater upward force than downward force / resultant upward force = upthrust (1).' },
  { q: 'An object of volume **0.0050 m³** is fully submerged in water (density 1000 kg/m³). Calculate the upthrust on it. g = 10 N/kg.', marks: 3, ht: true, ms: 'mass of water displaced = 1000 × 0.0050 = 5.0 kg (1); weight = 5.0 × 10 (1); upthrust = 50 N (1).' },
  { q: 'A solid steel block sinks in water but a steel ship floats. Explain why.', marks: 3, ht: true, ms: 'Upthrust = weight of water displaced (1); the block displaces only a small volume so upthrust < weight (1); the ship’s hollow shape displaces a large volume of water so the upthrust can equal its weight / its average density is less than water (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 29 EQUATIONS =======================
reg(D.equationsSlide([['Fkx', sp('15.3')], ['E12', sp('15.4')], ['pFA', sp('15.11')], ['phrg', sp('15.14')], ['Wmg', 'Topic 2 / 15.16P'], ['rho', 'Topic 14 / 15.17P']], {
  subtitle: 'Topic 15 equations • RECALL = learn it; GIVEN = on the Physics Equations List',
  qc: 'Cover the middle column. For each equation, say every quantity and its unit aloud.',
  notes: 'QUICK CHECK: self-check against the table. Edexcel recall list includes F = k × x and p = F/A; the equations list gives E = ½kx² and P = hρg. (W = mg and ρ = m/V are recall equations from earlier topics, used here for upthrust and floating.)',
}), 'Summary: equations');

// ======================= 30 KEY WORDS =======================
reg(D.keyWords([
  ['Distortion', 'A change in the shape of an object: stretching, compressing or bending.'],
  ['Elastic distortion', 'The object returns to its original shape when the forces are removed.'],
  ['Inelastic distortion', 'The object does not return to its original shape; the change is permanent.'],
  ['Extension', 'Increase in length of a spring: new length − original length (m).'],
  ['Spring constant, k', 'Force needed per metre of extension (N/m); a measure of stiffness.'],
  ['Limit of proportionality', 'Point beyond which force and extension are no longer proportional.'],
  ['Linear relationship', 'Straight-line graph through the origin: F directly proportional to x.'],
  ['Elastic potential energy', 'Energy stored in a stretched or compressed elastic object: E = ½kx².'],
  ['Work done', 'Energy transferred by a force; for a spring, the area under the F–x graph.'],
  ['Pressure', 'Force normal to a surface per unit area: p = F/A, in pascals (Pa).'],
  ['Fluid', 'A liquid or a gas; its pressure acts in all directions, normal to surfaces.'],
  ['Atmospheric pressure', 'Pressure due to the air above; about 1.0 × 10⁵ Pa at sea level; falls with height.'],
  ['Density', 'Mass per unit volume: ρ = m/V (kg/m³).'],
  ['Upthrust', 'Resultant upward force on an object in a fluid, due to greater pressure below.'],
  ['Displaced fluid', 'Fluid pushed aside by an object; its weight equals the upthrust.'],
  ['Floating', 'Upthrust equals weight; the object is less dense than the fluid.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. Terms 10–16 are physics only (15.7P–15.17P).' }), 'Summary: key words');

// ======================= 31 FULL QUESTION =======================
reg(D.fullQuestion('A student investigates a spring. The spring’s length is **8.0 cm** with no load. When a weight of **3.0 N** hangs from it, its length is **20.0 cm**. The spring does not pass its limit of proportionality.', [
  { l: 'a', q: 'Name the type of distortion in which the spring returns to its original length when the weight is removed.', marks: 1, ms: 'elastic (distortion) (1).' },
  { l: 'b', q: 'Calculate the extension of the spring in metres.', marks: 1, ms: '20.0 − 8.0 = 12.0 cm = 0.12 m (1).' },
  { l: 'c', q: 'Calculate the spring constant of the spring.', marks: 2, ms: 'k = F/x = 3.0/0.12 (1); = 25 N/m (1).' },
  { l: 'd', q: 'Calculate the energy stored in the spring. Use the equation E = ½ × k × x².', marks: 2, ms: 'E = 0.5 × 25 × 0.12² (1); = 0.18 J (1). ECF from (c).' },
  { l: 'e', q: 'The student adds more weights and plots a force–extension graph. Describe how she could use the graph to find the spring constant and to tell whether the spring has gone past its limit of proportionality.', marks: 3, ms: 'k = gradient of the straight part of the graph (1); draw a large triangle, ΔF ÷ Δx (1); limit of proportionality where the line stops being straight / curves (1).', h: 1.25 },
  { l: 'f', q: '(Physics only) The 3.0 N weight has a volume of 4.0 × 10⁻⁵ m³. It is lowered until it is fully under water while still hanging from the spring. Water density = 1000 kg/m³, g = 10 N/kg. Calculate the new extension of the spring.', marks: 4, ht: true, ms: 'upthrust = weight of water displaced = 1000 × 4.0 × 10⁻⁵ × 10 (1) = 0.40 N (1); force on spring = 3.0 − 0.40 = 2.6 N (1); x = 2.6/25 = 0.104 m (≈ 0.10 m) (1). ECF from (c).', h: 1.35 },
], 13, { subtitle: 'Specification 15.2–15.6, 15.16P • answer every part • 13 marks', ht: true }), 'Full question');

// ======================= 32–33 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Write down the equation that links force, spring constant and extension.', marks: 1, ms: 'force = spring constant × extension / F = k × x (1).' },
  { n: '2', q: 'A spring has a spring constant of **80 N/m**. Calculate the force needed to stretch it by **5.0 cm**.', marks: 2, ms: 'F = 80 × 0.050 (1); = 4.0 N (1).' },
  { n: '3', q: 'Calculate the energy stored in the spring in Q2. Use E = ½ × k × x².', marks: 2, ms: 'E = 0.5 × 80 × 0.050² (1); = 0.10 J (1).' },
  { n: '4', q: '(Physics only) A box of weight **1200 N** rests on a base of area **0.60 m²**. Calculate the pressure on the floor.', marks: 2, ms: 'p = 1200/0.60 (1); = 2000 Pa (1).' },
  { n: '5', q: '(Physics only) Calculate the pressure due to the water at the bottom of a pool **2.5 m** deep. ρ = 1000 kg/m³, g = 10 N/kg.', marks: 2, ht: true, ms: 'P = 2.5 × 1000 × 10 (1); = 25 000 Pa (1).' },
  { n: '6', q: '(Physics only) A helium balloon rises when it is let go. Use the ideas of upthrust and weight to explain why.', marks: 2, ht: true, ms: 'upthrust (= weight of air displaced) is greater than the weight of the balloon (1); so there is a resultant upward force (1). Allow: balloon less dense than air.' },
  { n: '7', q: 'Describe how to carry out an investigation to find the spring constant of a spring and the work done in stretching it. Include how you would use your results.', marks: 6, levels: true, h: 2.3, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Clamp the spring to a clamp stand; set up a vertical metre rule next to it (clamp stand fixed with a G-clamp).',
    'Measure the original (unloaded) length using a pointer, eye level with the pointer.',
    'Add masses (e.g. 100 g = 1.0 N) one at a time and record the new length each time.',
    'Calculate extension = new length − original length; convert to metres.',
    'Repeat / remove masses to check the spring returns to original length; take several readings.',
    'Plot a graph of force (y) against extension (x); draw a line of best fit.',
    'Spring constant = gradient of the straight (linear) part of the graph.',
    'Work done = area under the force–extension graph (or E = ½kx² in the linear region).',
    'Safety: goggles; keep feet clear of falling masses; do not exceed the elastic limit.',
  ]);
}
D.homework('Combined Science (1SC0) students: answer Q1–Q3 and Q7 only (11 marks).', HW, 17, { ht: true });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total + R2.total + R3.total + R4.total + R5.total + R6.total, 8 + 7 + 9 + 7 + 7 + 9);
assert(SLIDES.find(t => t.startsWith(P_FIRST + '. 15.10P')), 'P section must start at slide ' + P_FIRST);
assert(SLIDES.find(t => t.startsWith(P_LAST + '. Recap 6')), 'P section must end at slide ' + P_LAST);
assert(HW.filter(q => q.n === '1' || q.n === '2' || q.n === '3' || q.n === '7').reduce((a, q) => a + q.marks, 0) === 11);
const out = path.join(__dirname, 'EDX_1PH0_T15_ForcesAndMatter.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
