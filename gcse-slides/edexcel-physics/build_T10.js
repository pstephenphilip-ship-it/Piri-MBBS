// build_T10.js — Edexcel GCSE Physics 1PH0 Topic 10 Electricity and circuits (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T10.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 10,
  title: 'Electricity and circuits',
  shortTitle: 'T10',
  subtitle: 'Current, potential difference, resistance, power and mains electricity',
  specRange: '10.1–10.43',
  pOnly: [], // no physics-only statements found: the whole topic is also in Combined Science 1SC0
  paper: 'Paper 2',
  keywords: ['Current', 'Potential difference', 'Resistance', 'I–V graphs', 'Power', 'Mains'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, axesO, points, plotLine, fnLine, px, py, comp, wire, dot, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmtN = v => v.toLocaleString('en-GB').replace(/,/g, ' ');

// ======================= CALCULATIONS (asserted) =======================
// Q = I t
const Q7 = calc('Q7 = 0.25*120', 0.25 * 120, 30);
const qc7 = calc('qc7 = 3.0*50', 3.0 * 50, 150);
// E = Q V
const E10 = calc('E10 = 40*12', 40 * 12, 480);
const qc10 = calc('qc10 Q = 90/1.5', 90 / 1.5, 60);
calc('slide10 2 lamps share 12 V', 12 / 2, 6);
// V = I R
const V11 = calc('V11 = 0.20*30', 0.20 * 30, 6.0, 1e-12);
const qc11 = calc('qc11 R = 12/0.50', 12 / 0.50, 24);
const tab11 = [10, 20, 30].map(R => calc(`I = 6.0/${R}`, 6.0 / R, [0.6, 0.3, 0.2][[10, 20, 30].indexOf(R)], 1e-12));
// series 6.0 V, 10 + 20 ohm
const Rs = calc('Rs = 10+20', 10 + 20, 30);
const Is = calc('Is = 6.0/30', 6.0 / Rs, 0.20, 1e-12);
const V1s = calc('V1 = 0.20*10', Is * 10, 2.0, 1e-12);
const V2s = calc('V2 = 0.20*20', Is * 20, 4.0, 1e-12);
calc('V1+V2 = 6', V1s + V2s, 6.0, 1e-12);
calc('qc13 I = 9.0/(15+30)', 9.0 / 45, 0.20, 1e-12);
calc('qc13 V30 = 0.20*30', 0.20 * 30, 6.0, 1e-12);
// parallel 6.0 V, 10 and 20 ohm branches
const I1p = calc('I1p = 6/10', 6.0 / 10, 0.60, 1e-12);
const I2p = calc('I2p = 6/20', 6.0 / 20, 0.30, 1e-12);
const Ip = calc('Ip = 0.6+0.3', I1p + I2p, 0.90, 1e-12);
const Rp = calc('Rp = 6.0/0.90', 6.0 / Ip, 6.666666666666667, 1e-9);
calc('Rp check 1/(1/10+1/20)', 1 / (1 / 10 + 1 / 20), Rp, 1e-9);
calc('qc14 total = 0.40+0.25', 0.40 + 0.25, 0.65, 1e-12);
// CP data: resistor 20 ohm, lamp R = 5 + 2.5 V (model)
const cpV = [0, 1, 2, 3, 4, 5, 6];
const lampI = V => V / (5 + 2.5 * Math.abs(V));
const cpIr = cpV.map(v => +(v / 20).toFixed(2));
const cpIl = cpV.map(v => +lampI(v).toFixed(2));
assert.deepStrictEqual(cpIr, [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3]);
assert.deepStrictEqual(cpIl, [0, 0.13, 0.2, 0.24, 0.27, 0.29, 0.3]);
const cpRl = cpV.map((v, i) => i === 0 ? null : sf(v / cpIl[i], 2));
assert.deepStrictEqual(cpRl, [null, 7.7, 10, 13, 15, 17, 20]);
calc('resistor R = 6/0.30', 6 / 0.30, 20, 1e-9);
calc('CP qc lamp R at 6 V', 6 / 0.30, 20, 1e-9);
calc('CP qc lamp R at 2 V', 2 / 0.20, 10, 1e-9);
// diode model: I(mA) = A (exp(V/0.045) - 1), I(0.75 V) = 30 mA
const nVt = 0.045, Ad = 30 / (Math.exp(0.75 / nVt) - 1);
const diodeI = V => Ad * (Math.exp(V / nVt) - 1);
assert(diodeI(0.5) < 0.2 && diodeI(0.6) > 0.8 && diodeI(0.6) < 1.5 && diodeI(0.7) > 8, 'diode shape');
assert(Math.abs(diodeI(-1)) < 1e-5, 'diode reverse ~ 0');
// LDR and thermistor models
const ldrR = L => 100 * Math.pow(L, -0.7);
const thR = Tc => 10 * Math.exp(-(Tc - 25) / 25);
calc('thermistor R(25) = 10 kOhm', thR(25), 10, 1e-12);
assert(ldrR(10) < 25 && ldrR(1000) < 1);
// heating, energy and power
const E29 = calc('E29 = 9.0*230*120', 9.0 * 230 * 120, 248400, 1e-6);
const qc29 = calc('qc29 P = 1800/60', 1800 / 60, 30, 1e-12);
calc('slide29 P kettle = 9.0*230', 9.0 * 230, 2070, 1e-9);
const P30a = calc('P30 hairdryer 5.0*230', 5.0 * 230, 1150, 1e-9);
const P30b = calc('P30 = 3.0^2*4.0', 3.0 ** 2 * 4.0, 36, 1e-12);
calc('P30 check IV: V = 3*4 = 12; P = 3*12', 3.0 * (3.0 * 4.0), 36, 1e-12);
const qc30 = calc('qc30 P = 0.50^2*12', 0.5 ** 2 * 12, 3.0, 1e-12);
calc('cable stretch P = 10^2*0.20', 10 ** 2 * 0.20, 20, 1e-12);
// mains
calc('period = 1/50', 1 / 50, 0.020, 1e-15);
const Ikettle = calc('kettle I = 2300/230', 2300 / 230, 10, 1e-12);
calc('lamp fuse I = 60/230', sf(60 / 230, 2), 0.26, 1e-12);
const E35 = calc('heater E = 2000*1800', 2000 * 30 * 60, 3.6e6, 1e-6);
const eff35 = calc('kettle efficiency 1800/2000', 1800 / 2000, 0.9, 1e-12);
calc('qc35 E = 10*3600', 10 * 3600, 36000, 1e-9);
// starter
calc('starter eff 400/500', 400 / 500, 0.8, 1e-12);
calc('starter P = 600/20', 600 / 20, 30, 1e-12);
calc('starter F = 50*0.04', 50 * 0.04, 2.0, 1e-12);
// recaps
calc('R1 Q = 0.40*180', 0.40 * 180, 72, 1e-9);
calc('R2 Q = 540/9.0', 540 / 9.0, 60, 1e-9);
calc('R2 R = 6.0/0.25', 6.0 / 0.25, 24, 1e-9);
calc('R3 I = 12/60', 12 / (40 + 20), 0.20, 1e-12);
calc('R3 V40 = 0.20*40', 0.20 * 40, 8.0, 1e-12);
calc('R3 parallel total 0.35+0.15', 0.35 + 0.15, 0.50, 1e-12);
calc('R4 R = 4.0/0.25', 4.0 / 0.25, 16, 1e-9);
calc('R6 P = 230*4.0', 230 * 4.0, 920, 1e-9);
calc('R6 P = 2.0^2*15', 2.0 ** 2 * 15, 60, 1e-12);
calc('R6 E = 60*300', 60 * 300, 18000, 1e-9);
// full question
calc('FQ R = 3.0/0.20', 3.0 / 0.20, 15, 1e-9);
calc('FQ Q = 0.20*120', 0.20 * 120, 24, 1e-9);
calc('FQ E = 24*3.0', 24 * 3.0, 72, 1e-9);
calc('FQ R6 = 6.0/0.30', 6.0 / 0.30, 20, 1e-9);
calc('FQ P = 0.30^2*20', 0.30 ** 2 * 20, 1.8, 1e-12);
calc('FQ P = 0.30*6.0', 0.30 * 6.0, 1.8, 1e-12);
// homework
calc('HW I = 150/60', 150 / 60, 2.5, 1e-12);
calc('HW P = 230*8.0', 230 * 8.0, 1840, 1e-9);
calc('HW E = 3.0*12*600', 3.0 * 12 * 600, 21600, 1e-9);

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Electricity and Circuits',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • Core Practical 10.17 (electrical circuits)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • Grade 7–9 stretch slides are marked' },
    { icon: '10', text: `Topic 10 of 15 • ${DECK.paper}` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 10 Electricity and circuits (Paper 2). Every statement 10.1–10.43 is also in Combined Science 1SC0, and no statement in this topic is marked H (Higher only) in our spec check – see SPEC_T10.md for confidence notes. Static electricity is Topic 11 (physics only) and is not in this deck.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '10.1–10.3, 10.10', text: 'Describe the **atom**, draw **circuit diagrams** with the correct symbols, and compare **series** and **parallel** circuits.' },
  { code: '10.4–10.9', text: 'Explain **current** and **potential difference**; use **Q = I × t** and **E = Q × V**; connect ammeters and voltmeters.' },
  { code: '10.11–10.16', text: 'Use **V = I × R**; explain the current, p.d. and resistance rules for **series and parallel** circuits.' },
  { code: '10.17', text: '**Core Practical:** construct circuits to investigate V, I and R for a resistor and a filament lamp; test series and parallel circuits.' },
  { code: '10.18–10.21', text: 'Explain **I–V graphs** for a resistor, filament lamp and diode; describe **LDRs** and **thermistors**.' },
  { code: '10.22–10.26', text: 'Explain the **heating effect** of a current, ways to reduce it, and its advantages and disadvantages.' },
  { code: '10.27–10.32', text: 'Calculate **energy** and **power**: E = I × V × t, P = E ÷ t, P = I × V and P = I² × R.' },
  { code: '10.33–10.43', text: 'Explain **a.c. and d.c.**, UK mains (230 V, 50 Hz), live, neutral and earth wires, **fuses** and power ratings.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'All eight objectives are in both 1PH0 and Combined Science 1SC0. No Topic 10 statement is Higher-only in our spec check (medium confidence – see SPEC_T10.md), so there are no HT pills in this deck. Grade 7–9 stretch content is marked with a red STRETCH pill.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 10 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['10.1–10.3, 10.10', 'Atoms, circuit symbols, series and parallel'],
    ['10.4–10.9', 'Charge, current, p.d.; Q = It, E = QV; meters'],
    ['10.11–10.16', 'Resistance, V = IR, series and parallel rules'],
    ['10.17', 'Core Practical: electrical circuits'],
    ['10.18–10.21', 'I–V graphs, diodes, LDRs and thermistors'],
    ['10.22–10.32', 'Heating effect, energy and power'],
    ['10.33–10.43', 'a.c. and d.c., mains wiring and safety'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 10\nElectricity and circuits', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.12, i === 3 ? 'CORE PRACTICAL' : 'BOTH COURSES', i === 3 ? C.orange : C.blue, 1.2);
  });
  label(s, 0.45, 6.6, 6.6, 'Earlier links: Topic 1 units • Topic 3 energy stores and efficiency • Topic 6 the atom • Topic 8 power', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 8–15.',
      'Combined Science 1SC0 **Paper 6** (Physics 2) tests the same Topic 10 statements.',
      'Equations: **recall** Q = It, E = QV, V = IR, P = E/t, P = IV, P = I²R; **given** E = IVt.',
      'Core Practical 10.17 can be examined in any style: circuits, method, results and errors.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Combined (1SC0) classes skip nothing:** there are no physics-only (P) statements in Topic 10.',
      '**No HT pills:** our spec check found no Higher-only (H) statements in this topic. Higher students still meet harder calculations.',
      '**GRADE 7–9 STRETCH** pills mark extension, e.g. total resistance in parallel.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Physics-only statements: none (all of Topic 10 is shared with 1SC0). Higher-only statements: none found (medium confidence – check the bold H markers in the Pearson spec PDF before publishing; see SPEC_T10.md).\nStatic electricity is Topic 11 (physics only) and magnetism is Topic 12.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • units', q: 'Convert **2.5 kW** into watts and **3 minutes** into seconds.' },
  { from: 'Topic 6 • the atom', q: 'Name the **three particles** in an atom and give the relative charge of each.' },
  { from: 'Topic 3 • energy stores', q: 'An electric kettle heats water. Which **energy store** increases?' },
  { from: 'Topic 3 • efficiency', q: 'A motor is supplied with 500 J and transfers 400 J usefully. Calculate its **efficiency**.' },
  { from: 'Topic 8 • power', q: 'A motor does 600 J of work in 20 s. Calculate its **power** and give the unit.' },
  { from: 'Topic 15 • springs', q: 'A spring has k = 50 N/m. Calculate the force needed to stretch it by **0.04 m**.' },
], { subtitle: 'Recall from Topics 1, 3, 6, 8 and 15 • 6 minutes • no notes', notes: 'ANSWERS\n1. 2500 W; 180 s.\n2. Proton +1, neutron 0, electron −1.\n3. The thermal energy store of the water.\n4. 400/500 = 0.8 (80%).\n5. P = E/t = 600/20 = 30 W.\n6. F = k × x = 50 × 0.04 = 2.0 N.' }), 'Retrieval starter');

// ======================= 5 CIRCUIT SYMBOLS =======================
{
  const s = D.contentHeader('Circuit symbols', `Specification ${sp('10.2')} • draw and use circuit diagrams`, { tag: '10.2' });
  D.panel(s, 0.45, 1.3, 8.25, 4.95, 'standard UK circuit symbols, as used by Edexcel');
  const items = [
    ['cell', 'cell'], ['battery', 'battery (2 cells)'], ['switchOpen', 'switch (open)'], ['switchClosed', 'switch (closed)'],
    ['lamp', 'filament lamp'], ['resistor', 'fixed resistor'], ['varResistor', 'variable resistor'], ['fuse', 'fuse'],
    ['ammeter', 'ammeter'], ['voltmeter', 'voltmeter'], ['motor', 'motor'], ['diode', 'diode'],
    ['led', 'LED'], ['ldr', 'LDR'], ['thermistor', 'thermistor'], ['junction', 'junction (dot)'],
  ];
  items.forEach(([t, name], i) => {
    const col = i % 4, row = Math.floor(i / 4);
    const cx = 1.5 + col * 2.05, cy = 1.85 + row * 1.08 + (row === 3 ? 0.12 : 0);
    if (t === 'junction') { wire(s, [[cx - 0.7, cy], [cx + 0.7, cy]]); wire(s, [[cx, cy], [cx, cy + 0.32]]); dot(s, cx, cy); }
    else comp(s, t, cx - 0.7, cy, cx + 0.7, cy, { size: t === 'ldr' ? 0.8 : 1 });
    label(s, cx - 0.9, cy + 0.36, 1.8, name, { size: 11, bold: true, color: C.blue });
  });
  D.card(s, 8.95, 1.3, 3.93, 4.95, 'Drawing conventions', [
    'Draw wires as **straight lines** with square corners; use a ruler.',
    'The **long thin line** of a cell is the **positive (+)** terminal.',
    'A **dot** shows a junction where wires join.',
    'Ammeter: in **series**. Voltmeter: in **parallel** across a component.',
    'The diode triangle points in the direction of the **conventional current** it lets through.',
    'LDR arrows point **in** (light falls on it); LED arrows point **out** (it gives out light).',
  ], { size: 11.5 });
  D.quickCheck(s, 'Draw the symbols for a variable resistor, a thermistor and an LED. How is the LED symbol different from a diode?');
  D.notes(s, 'QUICK CHECK ANSWER: see the panel. An LED is a diode with two arrows pointing OUT (it emits light).\nSpec 10.2 lists cells, batteries, switches, voltmeters, ammeters, resistors, variable resistors, lamps, motors, diodes, thermistors, LDRs and LEDs. The fuse symbol is added for 10.41.');
  reg(s, '10.2 Circuit symbols');
}

// ======================= 6 SERIES AND PARALLEL =======================
reg(D.contentSlide({
  title: 'Series and parallel circuits',
  subtitle: `Specification ${sp('10.3')}, ${sp('10.10')} • one loop or several branches`,
  tag: '10.3', caption: 'the same battery and two identical lamps, connected two ways',
  draw: (s, p) => {
    label(s, 0.65, 1.42, 2.5, 'Series: one loop', { bold: true, size: 12, align: 'left', color: C.ink });
    const x1 = 1.3, x2 = 5.7, ya = 1.95, yb = 3.1;
    comp(s, 'battery', x1, ya, 3.5, ya); comp(s, 'switchClosed', 3.5, ya, x2, ya);
    comp(s, 'lamp', x2, yb, 3.5, yb, { label: 'lamp 1', side: 1 }); comp(s, 'lamp', 3.5, yb, x1, yb, { label: 'lamp 2', side: 1 });
    wire(s, [[x1, ya], [x1, yb]]); wire(s, [[x2, ya], [x2, yb]]);
    label(s, 0.65, 3.45, 2.5, 'Parallel: two branches', { bold: true, size: 12, align: 'left', color: C.ink });
    const yc = 3.95, yd = 4.75, ye = 5.55;
    comp(s, 'battery', x1, yc, 3.5, yc); comp(s, 'switchClosed', 3.5, yc, x2, yc);
    wire(s, [[x1, yc], [x1, ye]]); wire(s, [[x2, yc], [x2, ye]]);
    comp(s, 'lamp', x1, yd, x2, yd, { label: 'lamp 1', side: -1 }); comp(s, 'lamp', x1, ye, x2, ye, { label: 'lamp 2', side: -1 });
    dot(s, x1, yd); dot(s, x2, yd);
  },
  head: 'Two ways to connect components',
  lines: [
    'A **closed circuit** with a source of p.d. (a cell or battery) has a **current** in it. Open the switch → no current.',
    '**Series:** components in **one loop**. The same current passes through each one. One lamp breaks → all go off.',
    '**Parallel:** components on **separate branches**, each connected across the supply. Each branch can be switched on its own.',
    'Homes are wired in **parallel**: each appliance gets the full mains p.d.',
  ],
  worked: { head: 'Compare the circuits', q: 'One lamp “blows” (its filament breaks). What happens to the other lamp?',
    steps: [['Series', 'the only loop is broken → **no current** → other lamp goes **off**'], ['Parallel', 'the other branch is still a complete loop → it stays **on**'], ['Why', 'a parallel circuit has more than one path for charge'], ['Answer', 'use parallel when devices must work independently']] },
  qc: 'Fairy lights all go out when one bulb is removed. Are the bulbs in series or parallel? Explain.',
  notes: 'QUICK CHECK ANSWER: Series – removing one bulb breaks the single loop, so there is no current anywhere.\n10.10: a closed circuit that includes a source of p.d. has a current in it.',
}), '10.3 Series and parallel');

// ======================= 7 CHARGE AND CURRENT =======================
reg(D.contentSlide({
  title: 'Charge and current: Q = I × t',
  subtitle: `Specification ${sp('10.1')}, ${sp('10.8')}, ${sp('10.9')} • current is the rate of flow of charge`,
  tag: '10.8', caption: 'not to scale: in a metal wire the free electrons drift through the wire',
  draw: (s, p) => {
    // atom
    const ax = 1.75, ay = 2.55;
    s.addShape(SH.OVAL, { x: ax - 0.95, y: ay - 0.95, w: 1.9, h: 1.9, fill: { type: 'none' }, line: { color: C.grey, width: 1, dashType: 'dash' } });
    [[-0.12, -0.08, C.red], [0.1, -0.1, C.grey], [0, 0.1, C.red], [-0.14, 0.12, C.grey], [0.13, 0.11, C.red]].forEach(([dx, dy, c]) => s.addShape(SH.OVAL, { x: ax + dx - 0.13, y: ay + dy - 0.13, w: 0.26, h: 0.26, fill: { color: c }, line: { color: C.white, width: 0.75 } }));
    [[0.95, 0], [-0.67, -0.67], [-0.4, 0.86]].forEach(([dx, dy]) => s.addShape(SH.OVAL, { x: ax + dx - 0.09, y: ay + dy - 0.09, w: 0.18, h: 0.18, fill: { color: C.blue }, line: { color: C.blue } }));
    const rows = [['proton', '+1', '1', C.red], ['neutron', '0', '1', C.grey], ['electron', '−1', 'very small', C.blue]];
    label(s, 3.15, 1.6, 3.2, 'particle   charge   mass', { size: 10.5, bold: true, align: 'left', color: C.ink });
    rows.forEach(([n, q, m], i) => { s.addShape(SH.OVAL, { x: 3.15, y: 2.03 + i * 0.4, w: 0.18, h: 0.18, fill: { color: rows[i][3] }, line: { type: 'none' } }); label(s, 3.4, 1.96 + i * 0.4, 1.0, n, { size: 10.5, align: 'left' }); label(s, 4.3, 1.96 + i * 0.4, 0.6, q, { size: 10.5, bold: true }); label(s, 4.95, 1.96 + i * 0.4, 1.4, m, { size: 10.5, align: 'left' }); });
    label(s, 3.15, 3.2, 3.3, 'nucleus: protons + neutrons; electrons outside', { size: 10, italic: true, align: 'left', color: C.grey });
    // wire with electrons
    box(s, 0.8, 4.15, 5.5, 0.75, 'D9DEE8', '8C96A8', { lw: 1 });
    for (let i = 0; i < 9; i++) { const x = 1.05 + i * 0.6, y = 4.3 + (i % 3) * 0.17; s.addShape(SH.OVAL, { x, y, w: 0.16, h: 0.16, fill: { color: C.blue }, line: { color: C.blue } }); }
    arrow(s, 4.6, 3.9, 2.4, 3.9, C.blue, 2.5); label(s, 0.8, 3.75, 1.6, 'electron flow', { size: 10.5, bold: true, color: C.blue, align: 'right' });
    arrow(s, 2.4, 5.2, 4.6, 5.2, C.red, 2.5); label(s, 4.65, 5.06, 1.8, 'conventional current (+ to −)', { size: 10, bold: true, color: C.red, align: 'left', h: 0.3 });
    label(s, 0.8, 5.05, 1.55, 'metal wire', { size: 10.5, italic: true, align: 'left' });
  },
  head: 'What is an electric current?',
  lines: [
    'Atoms have a **nucleus** (protons and neutrons) with **electrons** around it. Metals have **free electrons** that can move.',
    '**Current** is the **rate of flow of charge**. In metals the charge is carried by **electrons**.',
    { t: '__Q = I × t__   charge (C) = current (A) × time (s)', nob: true },
    { t: 'RECALL: you must learn this equation.', nob: true, color: C.red, b: true, size: 10.5 },
    '1 ampere (A) = 1 coulomb of charge passing a point each second.',
  ],
  worked: { head: 'Worked example', q: 'A current of 0.25 A flows through a lamp for 2.0 minutes. Calculate the charge that flows.',
    steps: [['Equation', 'Q = I × t'], ['Convert', 't = 2.0 × 60 = 120 s'], ['Substitute', 'Q = 0.25 A × 120 s'], ['Answer', `Q = ${Q7} C`]] },
  qc: 'A current of 3.0 A flows for 50 s. Calculate the charge that flows. Then: what current moves 60 C in 30 s?',
  notes: `QUICK CHECK ANSWER: Q = 3.0 × 50 = ${qc7} C. I = Q/t = 60/30 = 2.0 A.\n10.1 atom structure (position, mass and charge of protons, neutrons and electrons) is included here because it explains why metals conduct.`,
}), '10.1, 10.8–10.9 Charge and current');
calc('qc7 part 2 I = 60/30', 60 / 30, 2.0, 1e-12);

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('10.1')}–${sp('10.3')}, ${sp('10.8')}–${sp('10.10')} • circuits, charge and current`, [
  { q: 'Describe **two** differences between a series circuit and a parallel circuit.', marks: 2, ms: 'Series: one loop / parallel: more than one branch or path (1); series: same current everywhere / one break stops all components; parallel: each branch works independently / same p.d. across each branch (1).' },
  { q: 'Explain what is meant by an electric current, and state what carries the current in a metal wire.', marks: 2, ms: 'Current is the rate of flow of charge (1); carried by (free/delocalised) electrons (1).' },
  { q: 'A current of **0.40 A** flows through a motor for **3.0 minutes**. Calculate the charge that flows. Give the unit.', marks: 3, ms: 't = 180 s (1); Q = I × t = 0.40 × 180 (1); = 72 C (1, unit needed).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 AMMETERS AND VOLTMETERS =======================
reg(D.contentSlide({
  title: 'Measuring current and potential difference',
  subtitle: `Specification ${sp('10.4')}, ${sp('10.7')}, ${sp('10.16')} • ammeters in series, voltmeters in parallel`,
  tag: '10.4', caption: 'the voltmeter connects across the lamp at the two junction dots',
  draw: (s, p) => {
    const x1 = 1.3, x2 = 5.7, ya = 2.0, yb = 4.0, yv = 5.1;
    comp(s, 'battery', x1, ya, 3.5, ya, { label: 'battery', side: -1 }); comp(s, 'switchClosed', 3.5, ya, x2, ya, { label: 'switch', side: -1 });
    comp(s, 'ammeter', x1, ya, x1, yb, { label: 'ammeter in series', side: -1, lw: 1.0, lh: 0.5 });
    wire(s, [[x2, ya], [x2, yb]]);
    comp(s, 'lamp', x2, yb, x1, yb, { label: 'lamp', side: 1, off: -0.38 });
    dot(s, 2.5, yb); dot(s, 4.5, yb);
    wire(s, [[2.5, yb], [2.5, yv]]); wire(s, [[4.5, yb], [4.5, yv]]);
    comp(s, 'voltmeter', 2.5, yv, 4.5, yv, { label: 'voltmeter in parallel (across the lamp)', side: -1, lw: 3.2, off: -0.4 });
    arrow(s, 6.15, 3.3, 6.15, 2.3, C.red, 2); label(s, 6.22, 2.62, 0.3, 'I', { size: 13, bold: true, color: C.red, align: 'left' });
  },
  head: 'Connecting the meters',
  lines: [
    '**Ammeter** measures **current** in **amps (A)**. Connect it **in series** – the current must flow **through** it.',
    '**Voltmeter** measures **potential difference (p.d.)** in **volts (V)**. Connect it **in parallel**, **across** the component.',
    'An ammeter has very low resistance; a voltmeter has very high resistance, so neither changes the circuit much.',
    'In a series circuit used for testing, the current is the same everywhere, so the ammeter can go anywhere in the loop.',
  ],
  worked: { head: 'Common mistakes', q: 'Spot what is wrong.',
    steps: [['Voltmeter in series', 'almost no current flows → the lamp does not light'], ['Ammeter in parallel', 'it short-circuits the component → very large current'], ['Check', 'trace the loop: does all the current pass through the ammeter?'], ['Answer', 'A in the loop, V across the component']] },
  qc: 'A student wants to measure the p.d. across a resistor and the current through it. Describe where each meter goes.',
  notes: 'QUICK CHECK ANSWER: ammeter in series with the resistor (in the same loop); voltmeter in parallel, connected across the two ends of the resistor.\n10.16: series circuits for testing and measuring – a single loop so the ammeter reading is the current in the component under test.',
}), '10.4, 10.7 Ammeters and voltmeters');

// ======================= 10 P.D. E = QV =======================
reg(D.contentSlide({
  title: 'Potential difference: E = Q × V',
  subtitle: `Specification ${sp('10.5')}, ${sp('10.6')} • the volt is a joule per coulomb`,
  tag: '10.5', caption: 'energy per coulomb: gained in the battery, transferred in the lamps',
  draw: (s, p) => {
    const x1 = 1.4, x2 = 5.6, ya = 2.1, yb = 4.3;
    comp(s, 'battery', x1, ya, x2, ya, { label: '12 V battery', side: -1 });
    wire(s, [[x1, ya], [x1, yb]]); wire(s, [[x2, ya], [x2, yb]]);
    comp(s, 'lamp', x2, yb, 3.5, yb, { label: '6 V', side: -1 }); comp(s, 'lamp', 3.5, yb, x1, yb, { label: '6 V', side: -1 });
    box(s, 2.25, 2.55, 2.5, 0.62, 'E6F4EC', C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 2.25, 2.55, 2.5, 'each coulomb GAINS 12 J\nin the battery', { h: 0.62, size: 10.5, bold: true, color: C.green });
    box(s, 1.25, 4.75, 4.5, 0.62, 'FBE9EA', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 1.25, 4.75, 4.5, 'each coulomb TRANSFERS 6 J in each lamp\n6 J + 6 J = 12 J', { h: 0.62, size: 10.5, bold: true, color: C.red });
  },
  head: 'Energy per unit charge',
  lines: [
    '**Potential difference** = the **energy transferred per unit charge** passed. So **1 volt = 1 joule per coulomb**.',
    { t: '__E = Q × V__   energy transferred (J) = charge moved (C) × potential difference (V)', nob: true },
    { t: 'RECALL: you must learn this equation.', nob: true, color: C.red, b: true, size: 10.5 },
    'A 12 V battery gives **12 J** to every coulomb; the components transfer it all.',
  ],
  worked: { head: 'Worked example', q: 'A 12 V battery moves 40 C of charge round a circuit. Calculate the energy transferred.',
    steps: ['E = Q × V', ['Substitute', 'E = 40 C × 12 V'], ['Units', 'C × V = C × J/C = J'], `E = ${E10} J`] },
  qc: 'A 1.5 V cell transfers 90 J of energy. Calculate the charge that flowed.',
  notes: `QUICK CHECK ANSWER: Q = E ÷ V = 90 ÷ 1.5 = ${qc10} C.\nThe diagram previews the series rule: the supply p.d. is shared (6 V + 6 V = 12 V for identical lamps).`,
}), '10.5–10.6 Potential difference');

// ======================= 11 RESISTANCE V = IR =======================
reg(D.contentSlide({
  title: 'Resistance: V = I × R',
  subtitle: `Specification ${sp('10.12')}, ${sp('10.13')} • changing the resistance changes the current`,
  tag: '10.13', caption: 'a variable resistor controls the current through the lamp',
  draw: (s, p) => {
    const x1 = 1.3, x2 = 5.7, ya = 1.9, yb = 3.5;
    comp(s, 'cell', x1, ya, 3.5, ya, { label: 'cell', side: -1 }); comp(s, 'varResistor', 3.5, ya, x2, ya, { label: 'variable resistor', side: -1, lw: 1.8 });
    wire(s, [[x2, ya], [x2, yb]]);
    comp(s, 'ammeter', x1, yb, x1, ya);
    comp(s, 'lamp', x2, yb, x1, yb, { label: 'lamp', side: -1, off: -0.36 });
    const rows = [['R / Ω (total)', 'I / A at 6.0 V'], ['10', tab11[0].toFixed(2)], ['20', tab11[1].toFixed(2)], ['30', tab11[2].toFixed(2)]];
    s.addTable(rows.map((r, i) => r.map(t => ({ text: t, options: i === 0 ? { bold: true, color: C.white, fill: { color: C.ink } } : { fill: { color: i % 2 ? C.white : C.cardBlue } } }))), { x: 1.6, y: 4.2, w: 3.8, colW: [1.9, 1.9], rowH: 0.34, fontFace: 'Calibri', fontSize: 11, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Resistance opposes the current',
  lines: [
    '**Resistance** (ohms, Ω) is how much a component opposes the current.',
    '**Greater resistance → smaller current** for the same p.d. A **variable resistor** lets you change the resistance, so you can control the current (e.g. dimming a lamp).',
    { t: '__V = I × R__   potential difference (V) = current (A) × resistance (Ω)', nob: true },
    { t: 'RECALL: you must learn this equation. Rearrange: I = V ÷ R, R = V ÷ I.', nob: true, color: C.red, b: true, size: 10.5 },
  ],
  worked: { head: 'Worked example', q: 'A current of 0.20 A flows through a 30 Ω resistor. Calculate the p.d. across it.',
    steps: ['V = I × R', ['Substitute', 'V = 0.20 A × 30 Ω'], ['Check', 'bigger R or bigger I → bigger V'], `V = ${V11.toFixed(1)} V`] },
  qc: 'A lamp has a p.d. of 12 V across it and a current of 0.50 A through it. Calculate its resistance.',
  notes: `QUICK CHECK ANSWER: R = V ÷ I = 12 ÷ 0.50 = ${qc11} Ω.\nTable checked in node: 6.0/10 = 0.60 A, 6.0/20 = 0.30 A, 6.0/30 = 0.20 A.`,
}), '10.12–10.13 Resistance V = IR');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('10.4')}–${sp('10.7')}, ${sp('10.12')}–${sp('10.13')} • meters, p.d. and resistance`, [
  { q: 'State how an **ammeter** and a **voltmeter** must be connected to measure the current through, and the p.d. across, a lamp.', marks: 2, ms: 'Ammeter in series with the lamp (1); voltmeter in parallel / across the lamp (1).' },
  { q: 'A **9.0 V** battery transfers **540 J** of energy. Calculate the charge that flows. Use E = Q × V.', marks: 3, ms: 'Q = E/V (1); = 540/9.0 (1); = 60 C (1).' },
  { q: 'The p.d. across a lamp is **6.0 V** and the current is **0.25 A**. Calculate the resistance of the lamp. Give the unit.', marks: 3, ms: 'R = V/I (1); = 6.0/0.25 (1); = 24 Ω (1, unit needed).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 SERIES RULES =======================
reg(D.contentSlide({
  title: 'Series circuits: current, p.d. and resistance',
  subtitle: `Specification ${sp('10.15')} • calculate currents, potential differences and resistances`,
  tag: '10.15', caption: 'readings for a 6.0 V battery with 10 Ω and 20 Ω resistors in series',
  draw: (s, p) => {
    const x1 = 1.2, x2 = 5.8, ya = 1.95, yb = 3.5, yv = 4.55;
    comp(s, 'battery', x1, ya, x2, ya, { label: '6.0 V', side: -1 });
    comp(s, 'ammeter', x1, ya, x1, yb, { label: '0.20 A', side: -1, off: 0.3, lw: 0.9, lcolor: C.red });
    wire(s, [[x2, ya], [x2, yb]]);
    comp(s, 'resistor', x1, yb, 3.5, yb, { label: '10 Ω', side: -1 }); comp(s, 'resistor', 3.5, yb, x2, yb, { label: '20 Ω', side: -1 });
    [[1.75, 2.95, '2.0 V'], [4.05, 5.25, '4.0 V']].forEach(([a, b, t]) => {
      dot(s, a, yb); dot(s, b, yb); wire(s, [[a, yb], [a, yv]]); wire(s, [[b, yb], [b, yv]]);
      comp(s, 'voltmeter', a, yv, b, yv, { label: t, side: 1, lcolor: C.red, lw: 0.9 });
    });
    label(s, 0.7, 5.2, 5.6, 'Total R = 10 Ω + 20 Ω = 30 Ω     2.0 V + 4.0 V = 6.0 V', { size: 11, bold: true, color: C.blue, h: 0.32 });
  },
  head: 'Rules for series circuits',
  lines: [
    'The **current is the same** at every point (charge is not used up).',
    'The supply p.d. is **shared** between the components: V = V₁ + V₂.',
    'Total resistance **adds up**: R = R₁ + R₂.',
    'The **bigger** resistor gets the **bigger share** of the p.d. (V = I × R with the same I).',
  ],
  worked: { head: 'Worked example', q: 'Find the current and the p.d. across each resistor in the circuit shown.',
    steps: [['Total R', `R = 10 + 20 = ${Rs} Ω`], ['Current', `I = V ÷ R = 6.0 ÷ 30 = ${Is.toFixed(2)} A`], ['p.d.s', `V₁ = 0.20 × 10 = ${V1s.toFixed(1)} V;  V₂ = 0.20 × 20 = ${V2s.toFixed(1)} V`], ['Answer', '0.20 A everywhere; 2.0 V + 4.0 V = 6.0 V ✓']], size: 10.5 },
  qc: 'A 9.0 V battery is in series with a 15 Ω and a 30 Ω resistor. Calculate the current and the p.d. across the 30 Ω resistor.',
  notes: 'QUICK CHECK ANSWER: R = 45 Ω; I = 9.0/45 = 0.20 A; V = 0.20 × 30 = 6.0 V.',
}), '10.15 Series circuits');

// ======================= 14 PARALLEL RULES =======================
reg(D.contentSlide({
  title: 'Parallel circuits: currents add at junctions',
  subtitle: `Specification ${sp('10.11')}, ${sp('10.3')} • current is conserved at a junction`,
  tag: '10.11', caption: 'a 6.0 V battery with 10 Ω and 20 Ω resistors on separate branches',
  draw: (s, p) => {
    const x1 = 1.3, x2 = 5.7, ya = 1.85, yj = 3.35, yb = 4.85;
    comp(s, 'battery', x1, ya, x2, ya, { label: '6.0 V', side: -1 });
    comp(s, 'ammeter', x1, ya, x1, yj, { label: '0.90 A', side: -1, lw: 0.9, lcolor: C.red });
    wire(s, [[x1, yj], [x1, yb]]); wire(s, [[x2, ya], [x2, yb]]);
    comp(s, 'ammeter', x1, yj, 3.0, yj, { label: '0.60 A', side: -1, lcolor: C.red, lw: 0.9 }); comp(s, 'resistor', 3.0, yj, x2, yj, { label: '10 Ω', side: -1 });
    comp(s, 'ammeter', x1, yb, 3.0, yb, { label: '0.30 A', side: -1, lcolor: C.red, lw: 0.9 }); comp(s, 'resistor', 3.0, yb, x2, yb, { label: '20 Ω', side: -1 });
    dot(s, x1, yj); dot(s, x2, yj);
    label(s, 0.7, 5.25, 5.6, 'junction: 0.90 A in = 0.60 A + 0.30 A out', { size: 11, bold: true, color: C.blue, h: 0.32 });
  },
  head: 'Rules for parallel circuits',
  lines: [
    '**Current is conserved at a junction**: total current in = total current out. The branch currents **add up** to the supply current.',
    'Each branch has the **same p.d.** as the supply (6.0 V across each resistor here).',
    'The branch with the **smaller resistance** takes the **bigger current** (I = V ÷ R).',
  ],
  worked: { head: 'Worked example', q: 'Calculate each branch current and the supply current.',
    steps: [['Branch 1', `I₁ = 6.0 ÷ 10 = ${I1p.toFixed(2)} A`], ['Branch 2', `I₂ = 6.0 ÷ 20 = ${I2p.toFixed(2)} A`], ['Junction', 'I = I₁ + I₂'], ['Answer', `I = ${Ip.toFixed(2)} A from the battery`]] },
  qc: 'Two branches carry 0.40 A and 0.25 A. What does an ammeter next to the battery read? What is the p.d. across each branch if the supply is 3.0 V?',
  notes: 'QUICK CHECK ANSWER: 0.40 + 0.25 = 0.65 A; 3.0 V across each branch.\n10.11: recall that current is conserved at a junction.',
}), '10.11 Parallel circuits');

// ======================= 15 WHY R ADDS / FALLS =======================
reg(D.contentSlide({
  title: 'Why series adds resistance and parallel reduces it',
  subtitle: `Specification ${sp('10.14')} • net resistance of two resistors`,
  tag: '10.14', stretch: true, caption: 'the same two resistors give a very different total resistance',
  draw: (s, p) => {
    label(s, 0.65, 1.42, 3.0, 'Series: R = 30 Ω', { bold: true, size: 12, align: 'left', color: C.red });
    const x1 = 1.3, x2 = 5.7, ya = 2.05, yb = 3.0;
    comp(s, 'battery', x1, ya, x2, ya, { label: '6.0 V', side: -1, off: 0.32 });
    wire(s, [[x1, ya], [x1, yb]]); wire(s, [[x2, ya], [x2, yb]]);
    comp(s, 'resistor', x1, yb, 3.5, yb, { label: '10 Ω', side: 1 }); comp(s, 'resistor', 3.5, yb, x2, yb, { label: '20 Ω', side: 1 });
    label(s, 3.55, 1.42, 2.9, 'I = 6.0 ÷ 30 = 0.20 A', { size: 11, bold: true, color: C.red, align: 'right' });
    label(s, 0.65, 3.55, 3.0, 'Parallel: R ≈ 6.7 Ω', { bold: true, size: 12, align: 'left', color: C.green });
    const yc = 4.15, yd = 4.85, ye = 5.55;
    comp(s, 'battery', x1, yc, x2, yc, { label: '6.0 V', side: -1, off: 0.32 });
    wire(s, [[x1, yc], [x1, ye]]); wire(s, [[x2, yc], [x2, ye]]);
    comp(s, 'resistor', x1, yd, x2, yd, { label: '10 Ω', side: -1, off: 0.2, lw: 0.6 }); comp(s, 'resistor', x1, ye, x2, ye, { label: '20 Ω', side: -1, off: 0.2, lw: 0.6 });
    dot(s, x1, yd); dot(s, x2, yd);
    label(s, 3.55, 3.55, 2.9, 'I = 0.60 + 0.30 = 0.90 A', { size: 11, bold: true, color: C.green, align: 'right' });
  },
  head: 'Explaining the rules',
  lines: [
    '**Series:** the charge must pass through **both** resistors, one after the other. More to get through → **less current** for the same p.d. → total resistance **increases**.',
    '**Parallel:** adding a branch gives the charge an **extra path**. More charge can flow each second → **more current** from the supply for the same p.d. → total resistance **decreases**.',
    'The total resistance in parallel is **less than the smallest** branch resistance.',
  ],
  worked: { head: 'Stretch: total resistance in parallel', q: 'Use the supply current to find the total resistance of the parallel circuit.',
    steps: [['Equation', 'R = V ÷ I'], ['Substitute', 'R = 6.0 V ÷ 0.90 A'], ['Check', 'less than 10 Ω, the smaller resistor ✓'], ['Answer', `R = ${sf(Rp, 2)} Ω`]] },
  qc: 'A third resistor is added in parallel. Explain what happens to the total resistance and to the current from the supply.',
  notes: `QUICK CHECK ANSWER: Total resistance decreases (another path for charge) so the current from the supply increases (each branch still has the full p.d.).\nStretch value checked: 6.0/0.90 = ${Rp.toFixed(3)} Ω = 1/(1/10 + 1/20). Edexcel 10.14 asks for an explanation only; 1/R = 1/R₁ + 1/R₂ is not required at GCSE.`,
}), '10.14 Why R adds or falls');

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('10.11')}, ${sp('10.14')}, ${sp('10.15')} • series and parallel rules`, [
  { q: 'A **12 V** battery is connected in series with a **40 Ω** and a **20 Ω** resistor. Calculate the current in the circuit and the p.d. across the 40 Ω resistor.', marks: 4, ms: 'R = 60 Ω (1); I = 12/60 = 0.20 A (1); V = I × R = 0.20 × 40 (1); = 8.0 V (1).' },
  { q: 'In a parallel circuit, the branch currents are **0.35 A** and **0.15 A**. State the current from the supply.', marks: 1, ms: '0.50 A (1).' },
  { q: 'Explain why adding a resistor **in parallel** with another resistor **decreases** the total resistance of a circuit.', marks: 3, ms: 'Provides an extra path / branch for the charge (1); so more charge flows per second / total current increases (1); for the same p.d., so R = V/I is smaller (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 CP CIRCUIT AND METHOD =======================
reg(D.contentSlide({
  title: 'Core Practical: circuit and method',
  subtitle: `Specification ${sp('10.17')} • investigate V, I and R for a resistor and a filament lamp`,
  tag: 'CP 10.17', cp: true, caption: 'test component (resistor, then filament lamp) with ammeter and voltmeter',
  draw: (s, p) => {
    const x1 = 1.2, x2 = 5.8, ya = 1.95, yb = 3.75, yv = 4.85;
    comp(s, 'battery', x1, ya, 3.5, ya, { label: 'battery', side: -1 }); comp(s, 'switchOpen', 3.5, ya, x2, ya, { label: 'switch', side: -1 });
    comp(s, 'varResistor', x2, ya, x2, yb, { label: 'variable\nresistor', side: 1, lw: 0.9, lh: 0.5, off: 0.42 });
    comp(s, 'resistor', x2, yb, 3.0, yb, { label: 'test component', side: 1, lw: 1.6, off: -0.32 });
    comp(s, 'ammeter', 3.0, yb, x1, yb, { label: 'ammeter', side: 1, off: -0.4 });
    wire(s, [[x1, ya], [x1, yb]]);
    dot(s, 3.75, yb); dot(s, 5.05, yb);
    wire(s, [[3.75, yb], [3.75, yv]]); wire(s, [[5.05, yb], [5.05, yv]]);
    comp(s, 'voltmeter', 3.75, yv, 5.05, yv, { label: 'voltmeter', side: -1, lw: 1.0 });
    box(s, 0.75, 4.55, 2.4, 0.9, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    comp(s, 'lamp', 1.05, 5.1, 2.0, 5.1, { size: 0.85 });
    label(s, 0.8, 4.58, 2.3, 'then swap in a lamp:', { size: 10, bold: true, color: C.blue });
    label(s, 2.1, 4.9, 1.0, 'filament\nlamp', { size: 10, h: 0.4, align: 'left' });
  },
  head: 'Method (part a)',
  lines: [
    'Set up the circuit. Close the switch only while taking readings.',
    'Adjust the **variable resistor** to change the current. Record the **p.d.** (voltmeter) and **current** (ammeter).',
    'Take readings for about 6–8 different settings, from 0 V upwards.',
    'Reverse the battery connections and repeat to get negative values.',
    'Calculate **R = V ÷ I** for each pair. Repeat with a **filament lamp**.',
    'Plot **current (y-axis)** against **p.d. (x-axis)**.',
  ],
  worked: { head: 'Tips for accurate results', q: '',
    steps: [['Switch off', 'between readings so the resistor does not warm up'], ['Zero', 'check meters read 0 with the switch open'], ['Range', 'use a wide range of p.d. values, evenly spaced'], ['Answer', 'repeat each reading and calculate a mean']] },
  qc: 'What is the variable resistor for in this circuit? Why is the voltmeter not in the main loop?',
  notes: 'QUICK CHECK ANSWER: The variable resistor changes the current (and so the p.d. across the test component) so a range of readings can be taken. The voltmeter must be in parallel across the component to measure the p.d. across it; in series it would stop the current (very high resistance).\nApparatus: battery or low-voltage d.c. supply, switch, variable resistor (rheostat), ammeter, voltmeter, resistor, 6 V filament lamp, connecting leads.',
}), 'CP: circuit and method');

// ======================= 18 CP VARIABLES, PART B, SAFETY =======================
reg(D.contentSlide({
  title: 'Core Practical: variables and testing circuits',
  subtitle: `Specification ${sp('10.17')} • part (b): test series and parallel circuits using resistors and filament lamps`,
  tag: 'CP 10.17', cp: true, caption: 'what you change, measure and keep the same in part (a)',
  draw: (s, p) => {
    const bx = (y, col, head, body) => {
      box(s, 0.75, y, 5.5, 1.15, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
      box(s, 0.75, y, 0.12, 1.15, col, null);
      s.addText([{ text: head, options: { bold: true, color: col, fontSize: 12.5, breakLine: true } }, ...T.rich(body, { fontSize: 11.5, color: C.text })], { x: 1.0, y: y + 0.06, w: 5.1, h: 1.03, fontFace: 'Calibri', valign: 'middle', margin: 0 });
    };
    bx(1.5, C.blue, 'Independent variable (you change)', '**potential difference** across the component (V), using the variable resistor');
    arrow(s, 3.5, 2.67, 3.5, 2.93, C.grey, 2);
    bx(2.95, C.red, 'Dependent variable (you measure)', '**current** through the component (A)');
    arrow(s, 3.5, 4.12, 3.5, 4.38, C.grey, 2);
    bx(4.4, C.green, 'Control variables (keep the same)', 'the **same component** • its **temperature** (switch off between readings) • the same meters');
  },
  head: 'Part (b): testing series and parallel',
  lines: [
    'Build two lamps (or resistors) **in series**. Measure the current at different points and the p.d. across each one and across the supply.',
    'Rebuild them **in parallel**. Measure the current in each branch and from the supply, and the p.d. across each branch.',
    'Compare with the rules: series – same current, p.d.s add; parallel – currents add, same p.d.',
  ],
  worked: { head: 'Safety', q: 'Hazard → risk → control',
    steps: [['Hot lamp', 'filament lamps and resistors get hot → burns; do not touch, switch off between readings'], ['Short circuit', 'wires get very hot → check the circuit before switching on'], ['Supply', 'use a low-voltage supply only (never mains)'], ['Answer', 'switch off before changing any connection']], size: 10.5 },
  workedH: 2.5,
  qc: 'Name the independent and dependent variables in part (a). Why is the temperature of the resistor a control variable?',
  notes: 'QUICK CHECK ANSWER: IV = p.d. across the component; DV = current through it. Temperature is controlled because the resistance of a metal increases as it gets hotter, which would change the results for a fixed resistor.',
}), 'CP: variables and part (b)');

// ======================= 19 CP RESULTS AND GRAPH =======================
const GCP = { x: 1.4, y: 1.55, w: 4.85, h: 3.6, xmin: 0, xmax: 6, ymin: 0, ymax: 0.35, xstep: 1, ystep: 0.05, minor: 2, xlabel: 'potential difference / V', ylabel: 'current / A', fmt: v => String(v), yfmt: v => v.toFixed(2) };
{
  const s = D.contentHeader('Core Practical: results and graph', `Specification ${sp('10.17')} • sample results for a resistor and a filament lamp`, { cp: true, tag: 'CP 10.17' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale; current on the y-axis');
  axes(s, GCP);
  plotLine(s, GCP, [[0, 0], [6, 0.30]], C.blue, 2);
  fnLine(s, GCP, lampI, 0, 6, 40, C.red, 2);
  points(s, GCP, cpV.map((v, i) => [v, cpIr[i]]), C.blue);
  points(s, GCP, cpV.map((v, i) => [v, cpIl[i]]), C.red);
  label(s, px(GCP, 3.3), py(GCP, 0.135), 1.4, 'resistor', { size: 11, bold: true, color: C.blue, align: 'left' });
  label(s, px(GCP, 1.0), py(GCP, 0.25), 1.5, 'filament lamp', { size: 11, bold: true, color: C.red, align: 'left' });
  const head = ['p.d. / V', 'I resistor / A', 'I lamp / A', 'R lamp / Ω'].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
  const rows = [head, ...cpV.map((v, i) => [v.toFixed(1), cpIr[i].toFixed(2), cpIl[i].toFixed(2), i === 0 ? '–' : String(cpRl[i])].map((t, j) => ({ text: t, options: { fill: { color: i % 2 ? C.white : C.cardBlue }, bold: j === 0, color: j === 3 ? C.red : C.text } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.35, 1.6, 1.5, 1.63], rowH: 0.36, fontFace: 'Calibri', fontSize: 11.5, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.35, 6.08, 1.9, 'What the results show', [
    '**Resistor:** straight line through the origin, so I ∝ V and R is constant: 6.0 ÷ 0.30 = **20 Ω**.',
    '**Lamp:** the curve gets less steep; R rises from about **7.7 Ω to 20 Ω** as the filament heats up.',
    'R lamp = V ÷ I, rounded to 2 significant figures.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the table to calculate the resistance of the lamp at 2.0 V and at 6.0 V. What happens to its resistance?');
  D.notes(s, `QUICK CHECK ANSWER: 2.0/0.20 = 10 Ω; 6.0/0.30 = 20 Ω. The resistance increases as the p.d. (and so the temperature of the filament) increases.\nSample data from models checked in node: resistor I = V/20; lamp I = V/(5 + 2.5V), rounded to 2 d.p.`);
  reg(s, 'CP: results and graph');
}

// ======================= 20 CP ERRORS =======================
reg(D.contentSlide({
  title: 'Core Practical: errors and improvements',
  subtitle: `Specification ${sp('10.17')} • evaluating the method`,
  tag: 'CP 10.17', cp: true, caption: 'two common sources of error in the circuits practical',
  draw: (s, p) => {
    // digital ammeter with zero error
    box(s, 0.95, 1.65, 2.3, 1.6, '3B4252', '1F2430', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
    box(s, 1.15, 1.85, 1.9, 0.75, 'C9E3B5', '6B7385');
    s.addText('0.02', { x: 1.15, y: 1.85, w: 1.9, h: 0.75, fontFace: 'Consolas', fontSize: 30, bold: true, color: '1F2430', align: 'center', valign: 'middle', margin: 0 });
    label(s, 0.95, 2.75, 2.3, 'A   (switch open)', { size: 11, bold: true, color: C.white });
    label(s, 3.45, 1.75, 2.9, 'Zero error: the meter reads 0.02 A with no current. Subtract 0.02 A from every reading, or reset the zero.', { h: 1.2, size: 11, align: 'left', valign: 'top' });
    // heating resistor
    comp(s, 'resistor', 1.0, 4.45, 3.2, 4.45, { size: 1.3 });
    for (let k = 0; k < 3; k++) { const x0 = 1.75 + k * 0.35; const pts = []; for (let j = 0; j <= 8; j++) pts.push([x0 + 0.06 * Math.sin(j * Math.PI / 2), 4.15 - j * 0.09]); wire(s, pts, C.red, 1.5); }
    label(s, 3.45, 3.7, 2.9, 'Heating: current warms the resistor, so its resistance rises during the experiment. Switch off between readings; use small currents.', { h: 1.4, size: 11, align: 'left', valign: 'top' });
    label(s, 0.95, 5.0, 5.4, 'Digital meters: no parallax error, but the last digit may flicker → record the mean value.', { size: 10.5, italic: true, color: C.grey, h: 0.5 });
  },
  head: 'Sources of error',
  lines: [
    '**Zero error** on a meter → a systematic error in every reading; check with the switch open.',
    '**Temperature rise** of the resistor or wires → resistance changes; switch off between readings.',
    '**Resolution** of the meters: an ammeter reading to 0.01 A gives poor precision for small currents.',
    '**Poor connections** add extra resistance → check that all leads are tight.',
  ],
  worked: { head: 'Improving the investigation', q: '',
    steps: [['Repeat', 'take each reading 3 times and calculate a mean'], ['More points', 'take more readings where the lamp graph curves most'], ['Precision', 'use meters with a higher resolution (e.g. mA range)'], ['Answer', 'more reliable values of R and a better curve of best fit']], size: 10.5 },
  qc: 'A student leaves the current switched on for the whole experiment with the fixed resistor. How might the graph change?',
  notes: 'QUICK CHECK ANSWER: The resistor warms up so its resistance increases; at higher p.d.s the current would be lower than expected, so the line would curve slightly towards the p.d. axis instead of being straight.',
}), 'CP: errors and improvements');

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('10.17')} • Core Practical: electrical circuits`, [
  { q: 'A student investigates how the current through a filament lamp depends on the p.d. across it. Describe where the ammeter and voltmeter are connected, and state the purpose of the **variable resistor**.', marks: 3, ms: 'Ammeter in series with the lamp (1); voltmeter in parallel across the lamp (1); variable resistor changes the current / p.d. so a range of readings can be taken (1).' },
  { q: 'At **4.0 V** the current through the lamp is **0.25 A**. Calculate the resistance of the lamp.', marks: 2, ms: 'R = V/I = 4.0/0.25 (1); = 16 Ω (1).' },
  { q: 'Explain why the student should switch off the circuit between readings when investigating a fixed resistor.', marks: 2, ms: 'Current heats the resistor / it gets hot (1); its resistance would change / increase, so it would not be a fair test (temperature is a control variable) (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 I–V: RESISTOR AND LAMP =======================
const GIV = { x: 1.0, y: 1.5, w: 5.3, h: 4.0, xmin: -6, xmax: 6, ymin: -0.35, ymax: 0.35, xstep: 2, ystep: 0.1, minor: 2, xlabel: 'p.d. / V', ylabel: 'current / A', fmt: v => String(v), yfmt: v => v.toFixed(1), xlw: 1.0 };
reg(D.contentSlide({
  title: 'I–V graphs: fixed resistor and filament lamp',
  subtitle: `Specification ${sp('10.18')} • how current varies with p.d., and what this means for resistance`,
  tag: '10.18', caption: 'drawn to scale: 20 Ω resistor and a 6 V, 0.3 A filament lamp',
  draw: (s, p) => {
    axesO(s, GIV);
    plotLine(s, GIV, [[-6, -0.30], [6, 0.30]], C.blue, 2.5);
    fnLine(s, GIV, lampI, -6, 6, 60, C.red, 2.5);
    label(s, px(GIV, 2.6), py(GIV, 0.075), 1.6, 'fixed resistor', { size: 11, bold: true, color: C.blue, align: 'left' });
    label(s, px(GIV, 0.6), py(GIV, 0.3), 1.6, 'filament lamp', { size: 11, bold: true, color: C.red, align: 'left' });
    label(s, px(GIV, 1.2), py(GIV, -0.14), 2.6, 'reversed p.d. → same shape, upside down', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.4 });
  },
  head: 'Reading the I–V graphs',
  lines: [
    '**Fixed resistor** (constant temperature): a **straight line through the origin**. Current ∝ p.d., so **R is constant**.',
    '**Filament lamp:** an **S-shaped curve** through the origin. It gets **less steep** as the p.d. increases.',
    'Why: a bigger current makes the filament **hotter**. The metal ions **vibrate more**, electrons collide with them more often, so **resistance increases**.',
    'Find R at any point using **R = V ÷ I** (not the gradient).',
  ],
  worked: { head: 'Worked example', q: 'Use the graph: the lamp has I = 0.20 A at 2.0 V and I = 0.30 A at 6.0 V.',
    steps: [['At 2.0 V', 'R = 2.0 ÷ 0.20 = 10 Ω'], ['At 6.0 V', 'R = 6.0 ÷ 0.30 = 20 Ω'], ['Compare', 'resistor: 6.0 ÷ 0.30 = 20 Ω at every point'], ['Answer', 'lamp resistance doubles as it heats up']] },
  qc: 'Sketch the I–V graph of a filament lamp. Explain why it is not a straight line.',
  notes: 'QUICK CHECK ANSWER: S-shaped curve through the origin, flattening at high positive and negative p.d. As the current increases the filament gets hotter; ions vibrate more, electrons collide more, so resistance increases and the current rises less for each extra volt.\nModels plotted: resistor I = V/20; lamp I = V/(5 + 2.5|V|).',
}), '10.18 I–V resistor and lamp');

// ======================= 23 I–V: DIODE =======================
const GD = { x: 1.0, y: 1.5, w: 5.3, h: 4.0, xmin: -1.0, xmax: 1.0, ymin: -10, ymax: 40, xstep: 0.2, ystep: 10, minor: 2, xlabel: 'p.d. / V', ylabel: 'current / mA', fmt: v => v.toFixed(1), yfmt: v => String(v), xlw: 1.0 };
reg(D.contentSlide({
  title: 'I–V graph: the diode',
  subtitle: `Specification ${sp('10.18')} • current flows in one direction only`,
  tag: '10.18', caption: 'drawn to scale for a silicon diode: it conducts above about 0.6 V forward',
  draw: (s, p) => {
    axesO(s, GD);
    plotLine(s, GD, [[-1.0, 0], [0, 0]], C.red, 3);
    fnLine(s, GD, diodeI, 0, 0.76, 60, C.red, 2.5);
    line(s, px(GD, 0.6), py(GD, 0), px(GD, 0.6), py(GD, 26), C.grey, 1, { dash: 'dash' });
    label(s, px(GD, 0.6) - 1.3, py(GD, 28.5), 1.3, '≈ 0.6 V', { size: 10.5, bold: true, color: C.grey, align: 'right' });
    label(s, px(GD, -0.95), py(GD, 8), 2.3, 'reverse: almost no current\n(very high resistance)', { size: 10.5, bold: true, color: C.red, align: 'left', h: 0.45 });
    label(s, px(GD, 0.05), py(GD, 18), 1.6, 'forward: low\nresistance', { size: 10.5, bold: true, color: C.red, align: 'left', h: 0.45 });
    comp(s, 'diode', px(GD, -0.9), py(GD, 25), px(GD, -0.3), py(GD, 25), { label: 'forward →', side: -1, lw: 1.2 });
  },
  head: 'A one-way valve for current',
  lines: [
    'In the **reverse** direction the diode has a **very high resistance**: almost **no current** flows.',
    'In the **forward** direction there is very little current until about **0.6 V**; then the current **rises steeply** – the resistance becomes **low**.',
    'Uses: protecting circuits from a battery connected the wrong way; changing a.c. into d.c.',
    'An **LED** is a diode that gives out light when a forward current flows.',
  ],
  worked: { head: 'Compare the three graphs', q: 'Which component…',
    steps: [['Constant R', 'fixed resistor: straight line through origin'], ['R rises with I', 'filament lamp: S-curve that flattens'], ['One direction', 'diode: zero in reverse, steep after ≈ 0.6 V'], ['Answer', 'R = V ÷ I at each point tells you the resistance']] },
  qc: 'Describe what happens to the current through a diode when the p.d. across it is reversed. What does this tell you about its resistance?',
  notes: `QUICK CHECK ANSWER: Almost no current flows in the reverse direction, so the diode has a very high resistance in reverse (and a low resistance forward, above about 0.6 V).\nModel: I = A(e^(V/0.045) − 1) mA, scaled so I(0.75 V) = 30 mA; I(0.6 V) = ${diodeI(0.6).toFixed(2)} mA, I(0.7 V) = ${diodeI(0.7).toFixed(1)} mA.`,
}), '10.18 I–V diode');

// ======================= 24 LDR AND THERMISTOR =======================
const GL = { x: 1.3, y: 1.6, w: 1.95, h: 2.6, xmin: 0, xmax: 1000, ymin: 0, ymax: 25, xstep: 250, ystep: 5, minor: 1, xlabel: 'light intensity / lux', ylabel: 'resistance / kΩ', fmt: v => String(v), yfmt: v => String(v) };
const GT = Object.assign({}, GL, { x: 4.35, xmax: 100, xstep: 25, ymax: 30, ystep: 10, xlabel: 'temperature / °C' });
reg(D.contentSlide({
  title: 'Sensors: LDRs and thermistors',
  subtitle: `Specification ${sp('10.19')}, ${sp('10.20')} • resistance that depends on light or temperature`,
  tag: '10.19', caption: 'typical curves, drawn to scale for one LDR and one NTC thermistor',
  draw: (s, p) => {
    axes(s, GL); fnLine(s, GL, ldrR, 10, 1000, 60, C.blue, 2.5);
    axes(s, GT); fnLine(s, GT, thR, 0, 100, 50, C.red, 2.5);
    label(s, GL.x, 1.37, GL.w, 'LDR', { size: 12, bold: true, color: C.blue });
    label(s, GT.x, 1.37, GT.w, 'Thermistor (NTC)', { size: 12, bold: true, color: C.red });
    comp(s, 'ldr', 1.4, 5.3, 3.1, 5.3, { size: 0.85 });
    comp(s, 'thermistor', 4.4, 5.3, 6.1, 5.3);
  },
  head: 'Two sensing components',
  lines: [
    '**LDR (light-dependent resistor):** resistance **decreases** as **light intensity increases**. High resistance in the dark.',
    'Uses: street lights and security lights that switch on when it gets dark.',
    '**Thermistor (NTC):** resistance **decreases** as **temperature increases**.',
    'Uses: thermostats, fire alarms, car engine and oven temperature sensors.',
  ],
  worked: { head: 'Read the graphs', q: 'What happens to the current through each sensor connected to a fixed p.d.?',
    steps: [['LDR in bright light', 'R falls → current **increases**'], ['Thermistor heated', 'R falls → current **increases**'], ['Dark / cold', 'R high → current small'], ['Answer', 'the current can be used to switch a lamp, heater or alarm']] },
  qc: 'A thermistor is moved from a fridge (5 °C) into a warm room (25 °C). Describe what happens to its resistance and to the current through it.',
  notes: `QUICK CHECK ANSWER: Its resistance decreases (NTC) so the current through it increases (for the same p.d.). From the graph: about ${sf(thR(5), 2)} kΩ at 5 °C to ${thR(25)} kΩ at 25 °C.\nModels: LDR R = 100 L^-0.7 kΩ; thermistor R = 10 e^(-(T-25)/25) kΩ.`,
}), '10.19–10.20 LDRs and thermistors');

// ======================= 25 EXPLORING RESISTANCE (10.21) =======================
reg(D.contentSlide({
  title: 'Using circuits to explore resistance',
  subtitle: `Specification ${sp('10.21')} • filament lamps, diodes, thermistors and LDRs`,
  tag: '10.21', caption: 'thermistor in a water bath: measure V and I at each temperature',
  draw: (s, p) => {
    const xL = 1.0, xR = 4.7, ya = 1.75, yj = 3.25, xa = 2.0, xb = 3.6, yt = 4.7, yv = 2.55;
    D.liquidColumn(s, 1.6, 3.6, 2.4, 1.95, 0.82);
    comp(s, 'battery', xL, ya, 2.85, ya, { label: 'battery', side: -1 }); comp(s, 'ammeter', 2.85, ya, xR, ya, { label: 'ammeter', side: -1 });
    wire(s, [[xL, ya], [xL, yj], [xa, yj], [xa, yt]]);
    wire(s, [[xR, ya], [xR, yj], [xb, yj], [xb, yt]]);
    dot(s, xa, yj); dot(s, xb, yj);
    wire(s, [[xa, yj], [xa, yv]]); wire(s, [[xb, yj], [xb, yv]]);
    comp(s, 'voltmeter', xa, yv, xb, yv, { label: 'voltmeter', side: 1, off: -0.36 });
    comp(s, 'thermistor', xa, yt, xb, yt, { label: 'thermistor', side: 1, off: 0.38 });
    // thermometer
    box(s, 2.73, 3.15, 0.12, 1.15, C.white, C.grey, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addShape(SH.OVAL, { x: 2.69, y: 4.22, w: 0.2, h: 0.2, fill: { color: C.red }, line: { color: C.grey, width: 0.75 } });
    box(s, 2.76, 3.6, 0.06, 0.65, C.red, null);
    label(s, 4.15, 4.25, 2.2, 'thermometer\nwater: heat with a kettle or add ice', { size: 10, h: 0.5, align: 'left', color: C.ink });
    line(s, 2.88, 3.35, 4.1, 4.32, C.grey, 0.75);
  },
  head: 'Designing the circuit',
  lines: [
    'Use a **series circuit** with an **ammeter**, and a **voltmeter across** the device. Calculate **R = V ÷ I** for each condition.',
    '**Thermistor:** put it in water at different temperatures (measured with a thermometer).',
    '**LDR:** change the light intensity, e.g. move a lamp to different distances, in a darkened room.',
    '**Filament lamp and diode:** use a variable resistor to change the p.d.; reverse the supply to test the other direction.',
  ],
  worked: { head: 'Worked example', q: 'At 20 °C the voltmeter reads 6.0 V and the ammeter reads 0.50 mA.',
    steps: [['Convert', 'I = 0.50 mA = 0.00050 A'], ['Equation', 'R = V ÷ I'], ['Substitute', 'R = 6.0 ÷ 0.00050'], ['Answer', 'R = 12 000 Ω (12 kΩ)']] },
  qc: 'Describe how you would change the light intensity on an LDR fairly. Name one control variable.',
  notes: 'QUICK CHECK ANSWER: Move a lamp to measured distances from the LDR (or use a light meter) in a darkened room. Control: the same lamp / same p.d. of supply / same LDR / no other light sources.\nWorked check: 6.0/0.00050 = 12000 Ω.',
}), '10.21 Exploring resistance');
calc('slide25 R = 6.0/0.00050', 6.0 / 0.00050, 12000, 1e-6);

// ======================= 26 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('10.18')}–${sp('10.21')} • I–V graphs and sensors`, [
  { q: 'Describe the shape of the I–V graph for a **filament lamp** and explain why it has this shape.', marks: 3, ms: 'Curve through the origin that gets less steep / S-shape (1); as current increases the filament gets hotter (1); so its resistance increases (ions vibrate more, more collisions) (1).' },
  { q: 'Describe how the current through a **diode** depends on the direction of the p.d. across it.', marks: 2, ms: 'Current flows in one (forward) direction only / once p.d. above about 0.6 V (1); (almost) no current in the reverse direction – very high resistance (1).' },
  { q: 'Describe how the resistance of a **thermistor** changes with temperature, and give **one** use of a thermistor.', marks: 2, ms: 'Resistance decreases as temperature increases (1); any one: thermostat / fire alarm / temperature sensor (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 27 HEATING EFFECT =======================
reg(D.contentSlide({
  title: 'The heating effect of an electric current',
  subtitle: `Specification ${sp('10.22')}, ${sp('10.23')}, ${sp('10.24')} • collisions between electrons and ions`,
  tag: '10.22', caption: 'model of a metal: positive ions in a lattice, free electrons moving through',
  draw: (s, p) => {
    for (let r = 0; r < 4; r++) for (let c = 0; c < 6; c++) {
      const x = 1.2 + c * 0.88, y = 1.85 + r * 0.88;
      s.addShape(SH.OVAL, { x: x - 0.22, y: y - 0.22, w: 0.44, h: 0.44, fill: { color: 'F5C27A' }, line: { color: C.orange, width: 1 } });
      label(s, x - 0.22, y - 0.22, 0.44, '+', { h: 0.44, size: 14, bold: true, color: C.orange });
    }
    // vibrating ion
    const vx = 3.84, vy = 3.61;
    [[-0.34, 0], [0.34, 0], [0, -0.34], [0, 0.34]].forEach(([dx, dy]) => line(s, vx + dx * 0.8, vy + dy * 0.8, vx + dx * 1.15, vy + dy * 1.15, C.red, 2));
    // electron path
    const path = [[0.85, 2.3], [1.65, 2.3], [2.05, 2.75], [2.95, 2.95], [3.45, 3.3], [4.25, 4.1], [5.35, 4.0], [6.15, 4.4]];
    for (let i = 0; i < path.length - 1; i++) arrow(s, path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], C.blue, 1.75);
    [[1.64, 3.17], [4.72, 2.29], [2.52, 4.05], [5.6, 3.17], [1.64, 4.05], [3.4, 2.29]].forEach(([x, y]) => s.addShape(SH.OVAL, { x: x - 0.07, y: y - 0.07, w: 0.14, h: 0.14, fill: { color: C.blue }, line: { color: C.blue } }));
    label(s, 0.75, 5.2, 2.5, 'free electron (−)', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, 3.0, 5.2, 3.4, 'ion vibrates more → metal heats up', { size: 10.5, bold: true, color: C.red, align: 'right' });
  },
  head: 'Why a current heats a wire',
  lines: [
    'When there is a current in a resistor, energy is transferred that **heats the resistor**.',
    'The current does **work against the resistance**. Energy is **dissipated** as **thermal energy** to the surroundings.',
    'Model: moving **electrons collide** with the **ions in the lattice**. They transfer energy to the ions, which **vibrate more** → the temperature rises.',
    'Hotter ions vibrate more, so collisions happen more often → resistance increases (filament lamp).',
  ],
  worked: { head: 'Explain it in steps', q: 'Explain why a resistor gets hot when there is a current in it.',
    steps: [['Electrons', 'the current is a flow of electrons through the metal'], ['Collisions', 'electrons collide with the lattice ions'], ['Energy', 'energy is transferred to the ions, which vibrate more'], ['Answer', 'the thermal energy store of the resistor increases → it heats up']] },
  qc: 'Use the lattice model to explain why the resistance of a metal wire increases when it gets hot.',
  notes: 'QUICK CHECK ANSWER: When the wire is hotter the ions vibrate more (with greater amplitude) (1), so the electrons collide with them more often / their flow is impeded more (1), so the resistance increases.\n10.22 recall; 10.23 energy dissipated as thermal energy in the surroundings; 10.24 collisions between electrons and ions in the lattice.',
}), '10.22–10.24 Heating effect');

// ======================= 28 REDUCING / USING HEATING =======================
reg(D.contentSlide({
  title: 'The heating effect: useful or a problem?',
  subtitle: `Specification ${sp('10.25')}, ${sp('10.26')} • reducing unwanted energy transfer`,
  tag: '10.26', caption: 'low-resistance wires waste less energy as heat',
  draw: (s, p) => {
    label(s, 0.7, 1.45, 2.6, 'thin, long, high R', { size: 11, bold: true, color: C.red });
    box(s, 0.9, 1.8, 2.2, 0.12, 'B87333', '8A5A2B');
    label(s, 3.5, 1.45, 2.8, 'thick, short copper, low R', { size: 11, bold: true, color: C.green });
    box(s, 3.8, 1.72, 2.2, 0.32, 'D4884A', '8A5A2B');
    label(s, 0.7, 2.05, 2.6, 'more heating, more energy wasted', { size: 10, italic: true, color: C.red });
    label(s, 3.5, 2.05, 2.8, 'less heating, less energy wasted', { size: 10, italic: true, color: C.green });
    const col = (x, head, colr, fill, items) => {
      box(s, x, 2.55, 2.75, 2.95, fill, colr, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.25 });
      s.addText([{ text: head, options: { bold: true, color: colr, fontSize: 12, breakLine: true } }, ...D.para(items, { size: 10.5 })], { x: x + 0.12, y: 2.62, w: 2.55, h: 2.8, fontFace: 'Calibri', valign: 'top', margin: 0 });
    };
    col(0.75, 'Advantages (useful)', C.green, 'E6F4EC', ['kettles, toasters and electric heaters', 'hair dryers and irons', 'the filament of a lamp glows', 'a fuse melts to break a circuit']);
    col(3.6, 'Disadvantages', C.red, 'FBE9EA', ['energy wasted in wires and devices', 'lower efficiency', 'components can overheat and fail', 'risk of fire; cooling fans or vents may be needed']);
  },
  head: 'Reducing unwanted heating',
  lines: [
    'Unwanted heating in connecting wires wastes energy. Use **low-resistance wires**: **thick**, **short**, made of a good conductor such as **copper**.',
    'Lower resistance → less energy dissipated per second for the same current (P = I² × R).',
    'Other ways: lubricate moving parts in motors; use LEDs instead of filament lamps.',
  ],
  worked: { head: 'Think it through', q: 'Why do the cables for an electric cooker have thicker copper wires than a lamp cable?',
    steps: [['Current', 'a cooker draws a much larger current'], ['Heating', 'a large current in a wire causes a lot of heating'], ['Fix', 'a thicker wire has a lower resistance'], ['Answer', 'less heating → cable does not overheat; less energy wasted']] },
  qc: 'Give one advantage and one disadvantage of the heating effect of an electric current.',
  notes: 'QUICK CHECK ANSWER: Advantage – e.g. used in kettles/heaters/toasters, fuses. Disadvantage – e.g. energy wasted in wires/devices (reduces efficiency), overheating/fire risk.\n10.25: ways of reducing unwanted energy transfer through low-resistance wires.',
}), '10.25–10.26 Heating: pros and cons');

// ======================= 29 E = IVt, P = E/t =======================
reg(D.contentSlide({
  title: 'Energy and power: E = I × V × t and P = E ÷ t',
  subtitle: `Specification ${sp('10.27')}, ${sp('10.28')}, ${sp('10.29')} • power is energy transferred per second`,
  tag: '10.27', caption: 'energy transferred by an electric kettle each second',
  draw: (s, p) => {
    const bx = (x, y, w, h, t, fill, col) => { box(s, x, y, w, h, fill, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 }); label(s, x, y, w, t, { h, size: 11, bold: true, color: col }); };
    bx(0.8, 1.6, 2.1, 0.9, 'mains supply\n230 V', C.white, C.blue);
    bx(3.9, 1.6, 2.3, 0.9, 'kettle element\nI = 9.0 A', C.white, C.ink);
    arrow(s, 2.95, 2.05, 3.85, 2.05, C.blue, 3);
    label(s, 2.8, 2.15, 1.2, 'electrical\nwork', { size: 10, h: 0.42, color: C.blue });
    bx(3.6, 3.15, 2.9, 0.9, 'thermal energy store\nof the water (useful)', 'E6F4EC', C.green);
    bx(0.8, 3.15, 2.4, 0.9, 'thermal store of the\nsurroundings (wasted)', 'FBE9EA', C.red);
    arrow(s, 5.05, 2.55, 5.05, 3.1, C.green, 3); arrow(s, 4.2, 2.55, 2.9, 3.1, C.red, 2);
    box(s, 0.8, 4.4, 5.7, 1.1, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: 'Each second: ', options: { bold: true, color: C.ink } }, { text: 'E = 9.0 A × 230 V × 1 s = 2070 J', options: { color: C.text } }, { text: '\nso the power is ', options: { color: C.text } }, { text: 'P = 2070 W (about 2.1 kW)', options: { bold: true, color: C.blue } }], { x: 0.95, y: 4.45, w: 5.4, h: 1.0, fontFace: 'Calibri', fontSize: 12, valign: 'middle', margin: 0 });
  },
  head: 'Energy and power equations',
  lines: [
    { t: '__E = I × V × t__   energy transferred (J) = current (A) × p.d. (V) × time (s)', nob: true },
    { t: 'GIVEN on the Physics Equations List – select and use it.', nob: true, color: C.green, b: true, size: 10.5 },
    '**Power** is the **energy transferred per second**, measured in **watts (W)**. 1 W = 1 J/s.',
    { t: '__P = E ÷ t__   power (W) = energy transferred (J) ÷ time taken (s)', nob: true },
    { t: 'RECALL: you must learn this equation.', nob: true, color: C.red, b: true, size: 10.5 },
  ],
  worked: { head: 'Worked example', q: 'The kettle (9.0 A, 230 V) is switched on for 2.0 minutes. Calculate the energy transferred.',
    steps: [['Equation', 'E = I × V × t'], ['Convert', 't = 2.0 × 60 = 120 s'], ['Substitute', 'E = 9.0 × 230 × 120'], ['Answer', `E = ${fmtN(E29)} J ≈ 2.5 × 10⁵ J`]] },
  qc: 'A lamp transfers 1800 J of energy in 60 s. Calculate its power. Give the unit.',
  notes: `QUICK CHECK ANSWER: P = E ÷ t = 1800 ÷ 60 = ${qc29} W.\nWorked: 9.0 × 230 × 120 = ${E29} J. Each second: 9.0 × 230 = 2070 J → 2070 W.`,
}), '10.27–10.29 E = IVt and P = E/t');

// ======================= 30 P = IV, P = I²R =======================
reg(D.contentSlide({
  title: 'Electrical power: P = I × V and P = I² × R',
  subtitle: `Specification ${sp('10.30')}, ${sp('10.31')}, ${sp('10.32')} • power depends on current and p.d.`,
  tag: '10.31', caption: 'measuring the power of a heater: P = ammeter reading × voltmeter reading',
  draw: (s, p) => {
    const x1 = 1.3, x2 = 5.7, ya = 1.85, yb = 3.25, yv = 4.15;
    comp(s, 'battery', x1, ya, 3.5, ya, { label: '12 V supply', side: -1 }); comp(s, 'ammeter', 3.5, ya, x2, ya, { label: '3.0 A', side: -1, lcolor: C.red });
    wire(s, [[x1, ya], [x1, yb]]); wire(s, [[x2, ya], [x2, yb]]);
    comp(s, 'resistor', x2, yb, x1, yb, { label: 'heater 4.0 Ω', side: 1, off: -0.3, lw: 1.6 });
    dot(s, 2.6, yb); dot(s, 4.4, yb); wire(s, [[2.6, yb], [2.6, yv]]); wire(s, [[4.4, yb], [4.4, yv]]);
    comp(s, 'voltmeter', 2.6, yv, 4.4, yv, { label: '12 V', side: 1, lcolor: C.red });
    box(s, 0.8, 4.75, 5.7, 0.95, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: 'Where P = I²R comes from:  ', options: { bold: true, color: C.ink } }, { text: 'P = I × V and V = I × R, so P = I × (I × R) = I² × R', options: { color: C.text } }], { x: 0.95, y: 4.78, w: 5.4, h: 0.9, fontFace: 'Calibri', fontSize: 11.5, valign: 'middle', margin: 0 });
  },
  head: 'Power in a circuit device',
  lines: [
    'The power of a device = the rate at which **energy is transferred from the supply** to it. It depends on the **current** and the **p.d.** across it.',
    { t: '__P = I × V__   electrical power (W) = current (A) × potential difference (V)', nob: true },
    { t: '__P = I² × R__   electrical power (W) = current² (A²) × resistance (Ω)', nob: true },
    { t: 'RECALL: learn both equations.', nob: true, color: C.red, b: true, size: 10.5 },
    'A hairdryer on 230 V taking 5.0 A: P = 5.0 × 230 = **1150 W**.',
  ],
  worked: { head: 'Worked example', q: 'A current of 3.0 A flows through a 4.0 Ω heater. Calculate its power.',
    steps: [['Equation', 'P = I² × R'], ['Substitute', 'P = 3.0² × 4.0 = 9.0 × 4.0'], ['Check', 'V = 3.0 × 4.0 = 12 V; P = 3.0 × 12 = 36 W ✓'], ['Answer', `P = ${P30b} W`]] },
  qc: 'A current of 0.50 A flows through a 12 Ω resistor. Calculate the power. Square the current first!',
  notes: `QUICK CHECK ANSWER: P = 0.50² × 12 = 0.25 × 12 = ${qc30.toFixed(1)} W.\nCommon error: 0.50 × 12 = 6 W (forgot to square). Hairdryer: ${P30a} W.\nStretch idea: a 10 A current in a cable of resistance 0.20 Ω wastes 10² × 0.20 = 20 W.`,
}), '10.30–10.32 P = IV and P = I²R');

// ======================= 31 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('10.22')}–${sp('10.32')} • heating, energy and power`, [
  { q: 'Explain why a wire gets hot when there is a current in it.', marks: 2, ms: 'Electrons collide with ions in the (metal) lattice (1); energy transferred to the ions / they vibrate more, so the thermal energy store / temperature increases (1).' },
  { q: 'A hairdryer takes a current of **4.0 A** from the **230 V** mains. Calculate its power.', marks: 2, ms: 'P = I × V = 4.0 × 230 (1); = 920 W (1).' },
  { q: 'A current of **2.0 A** passes through a **15 Ω** resistor for **5.0 minutes**. Calculate the power and the energy transferred.', marks: 3, ms: 'P = I²R = 2.0² × 15 = 60 W (1); t = 300 s (1); E = P × t = 60 × 300 = 18 000 J (1). Allow E = I × V × t with V = 30 V.' },
]);
reg(R6.s, 'Recap 6');
calc('R6 alt E = 2*30*300', 2.0 * 30 * 300, 18000, 1e-9);

// ======================= 32 a.c. AND d.c. =======================
const GDC = { x: 1.5, y: 1.5, w: 4.7, h: 1.25, xmin: 0, xmax: 40, ymin: 0, ymax: 15, xstep: 10, ystep: 5, minor: 1, xlabel: 'time / ms', ylabel: 'p.d. / V', fmt: v => String(v), yfmt: v => String(v) };
const GAC = { x: 1.5, y: 3.7, w: 4.4, h: 1.9, xmin: 0, xmax: 40, ymin: -400, ymax: 400, xstep: 10, ystep: 200, minor: 2, xlabel: '', ylabel: '', fmt: v => String(v), yfmt: v => String(v) };
reg(D.contentSlide({
  title: 'Direct and alternating current',
  subtitle: `Specification ${sp('10.34')}–${sp('10.37')} • d.c. from cells, a.c. from the mains`,
  tag: '10.34', caption: 'to scale: a 12 V battery (top) and the UK mains, 50 Hz (bottom)',
  draw: (s, p) => {
    axes(s, GDC); plotLine(s, GDC, [[0, 12], [40, 12]], C.blue, 2.5);
    label(s, px(GDC, 22), py(GDC, 12) - 0.3, 1.8, 'd.c.: 12 V, constant', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    axesO(s, GAC); fnLine(s, GAC, t => 325 * Math.sin(2 * Math.PI * t / 20), 0, 40, 80, C.red, 2.5);
    line(s, px(GAC, 0), py(GAC, -360), px(GAC, 20), py(GAC, -360), C.ink, 1, { head: true, tail: true });
    label(s, px(GAC, 2.5), py(GAC, -360) - 0.3, 1.6, 'one cycle = 20 ms', { size: 10, bold: true, color: C.ink, align: 'left' });
    label(s, px(GAC, 0) + 0.08, GAC.y - 0.3, 1.2, 'p.d. / V', { size: 10.5, bold: true, align: 'left' });
    label(s, GAC.x + GAC.w + 0.04, py(GAC, 0) - 0.5, 0.6, 'time\n/ ms', { size: 10, bold: true, align: 'left', h: 0.42 });
    label(s, 3.4, GAC.y - 0.3, 2.8, 'a.c.: direction keeps changing', { size: 10.5, bold: true, color: C.red, align: 'right' });
  },
  head: 'Two kinds of supply',
  lines: [
    '**Direct current (d.c.):** charge moves in **one direction only**. **Cells and batteries** supply d.c.',
    '**Alternating current (a.c.):** the movement of charge **changes direction** many times a second, because the **p.d. alternates** between positive and negative.',
    'UK mains: **a.c.**, frequency **50 Hz**, p.d. **about 230 V**.',
    'Mains a.c. is used to transfer energy to motors and heaters in the home; batteries supply portable devices.',
  ],
  worked: { head: 'Worked example', q: 'The UK mains has a frequency of 50 Hz. How long does one cycle take?',
    steps: [['Meaning', '50 Hz = 50 cycles every second'], ['Equation', 'time for one cycle T = 1 ÷ f'], ['Substitute', 'T = 1 ÷ 50 Hz'], ['Answer', 'T = 0.020 s (20 ms)']] },
  qc: 'State two differences between the supply from a battery and the UK mains supply.',
  notes: 'QUICK CHECK ANSWER: battery d.c. (one direction) vs mains a.c. (changes direction); battery small p.d. (e.g. 1.5–12 V) vs mains about 230 V; mains 50 Hz.\nThe a.c. trace peaks at about 325 V: 230 V is the effective (r.m.s.) value – not needed at GCSE.\n10.33 (energy from batteries and a.c. mains to motors and heating devices) is covered here and on the power-ratings slide.',
}), '10.34–10.37 a.c. and d.c.');

// ======================= 33 MAINS WIRING =======================
reg(D.contentSlide({
  title: 'Mains wiring: live, neutral and earth',
  subtitle: `Specification ${sp('10.38')}, ${sp('10.39')}, ${sp('10.43')} • the three wires in a UK plug`,
  tag: '10.38', caption: 'inside a UK three-pin plug (back removed)',
  draw: (s, p) => {
    const q = 0.3; // shift the plug right to leave room for the neutral label
    box(s, 1.1 + q, 1.55, 2.95, 3.95, 'E4E7EE', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.5 });
    const brass = 'D9B64A';
    box(s, 2.45 + q, 1.8, 0.3, 0.85, brass, '9A7B22');          // earth pin (top)
    box(s, 1.4 + q, 3.6, 0.8, 0.3, brass, '9A7B22');            // neutral (bottom left)
    box(s, 3.0 + q, 3.6, 0.8, 0.3, brass, '9A7B22');            // live (bottom right)
    box(s, 3.22 + q, 2.35, 0.36, 1.0, C.white, C.grey, { lw: 1 }); box(s, 3.22 + q, 2.35, 0.36, 0.14, '9AA3B5', null); box(s, 3.22 + q, 3.21, 0.36, 0.14, '9AA3B5', null); // fuse
    box(s, 2.25 + q, 4.75, 0.7, 1.05, '5A6275', null);          // cable
    box(s, 2.0 + q, 4.82, 1.2, 0.16, '2B3240', null);           // cable grip
    wire(s, [[2.45 + q, 4.75], [2.45 + q, 4.3], [1.8 + q, 4.3], [1.8 + q, 3.9]], '2E5BD8', 4);
    wire(s, [[2.75 + q, 4.75], [2.75 + q, 4.3], [3.4 + q, 4.3], [3.4 + q, 3.9]], '8B5A2B', 4);
    wire(s, [[2.6 + q, 4.75], [2.6 + q, 2.65]], '2E8B57', 4.5); wire(s, [[2.6 + q, 4.75], [2.6 + q, 2.65]], 'F2D43D', 4.5, { dash: 'dash' });
    const L = (x, y, x2, y2, t, c) => { line(s, x, y, x2, y2, C.grey, 0.75); label(s, x2 + 0.05, y2 - 0.2, 1.95, t, { size: 10.5, bold: true, color: c, align: 'left', h: 0.4 }); };
    L(2.75 + q, 2.1, 4.5, 1.75, 'earth (green/yellow)\n0 V', C.green);
    L(3.58 + q, 2.8, 4.5, 2.6, 'fuse (in the live wire)', C.ink);
    L(3.8 + q, 3.75, 4.5, 3.45, 'live (brown)\nabout 230 V', '8B5A2B');
    line(s, 1.4 + q, 3.75, 1.2, 3.75, C.grey, 0.75);
    label(s, 0.55, 3.95, 1.2, 'neutral (blue)\nclose to 0 V', { size: 10.5, bold: true, color: C.blue, align: 'left', h: 0.45 });
    L(3.2 + q, 4.9, 4.5, 4.75, 'cable grip', C.ink);
  },
  head: 'The three wires',
  lines: [
    '**Live (brown):** carries the alternating p.d. from the supply. The p.d. between **live and earth** is about **230 V**.',
    '**Neutral (blue):** completes the circuit; it is at (or close to) **0 V**. So there is a large p.d. between live and neutral.',
    '**Earth (green/yellow):** a safety wire at 0 V, connected to metal cases. It carries a current only if there is a fault.',
    'A live wire can be dangerous **even when the switch is off** (e.g. a switch wrongly fitted in the neutral). Touching it connects the live wire to **earth through your body** → a large current → electric shock.',
  ],
  size: 11,
  worked: { head: 'Explain it in steps', q: 'Why can touching a live wire kill you, even if the appliance is switched off?',
    steps: [['p.d.', 'the live wire is at about 230 V; you and the ground are at 0 V'], ['Path', 'your body connects the live wire to earth'], ['Current', 'a large current flows through you to earth'], ['Answer', 'electric shock – possibly fatal']], size: 10.5 },
  workedH: 2.05,
  qc: 'State the colour of the live, neutral and earth wires and the p.d. of each relative to earth.',
  notes: 'QUICK CHECK ANSWER: live – brown – about 230 V; neutral – blue – about 0 V; earth – green and yellow stripes – 0 V.\n10.38 difference in potential between live and neutral; 10.39 danger of any connection between live and earth; 10.43 p.d. between live and earth about 230 V.',
}), '10.38–10.39, 10.43 Live, neutral and earth');

// ======================= 34 FUSES, CIRCUIT BREAKERS, EARTH =======================
reg(D.contentSlide({
  title: 'Fuses, circuit breakers and the earth wire',
  subtitle: `Specification ${sp('10.41')}, ${sp('10.42')} • how a fault is made safe`,
  tag: '10.41', caption: 'a fault: the live wire touches the metal case of a heater',
  draw: (s, p) => {
    box(s, 0.75, 1.75, 0.85, 3.2, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.75, 1.5, 0.85, 'mains', { size: 10.5, bold: true, color: C.ink, h: 0.24 });
    [['L', 2.2], ['N', 3.4], ['E', 4.5]].forEach(([t, y]) => label(s, 0.75, y - 0.14, 0.85, t, { size: 12, bold: true, color: C.white }));
    box(s, 4.15, 1.75, 2.15, 3.35, 'DDE2EA', '5A6275', { lw: 3 });
    label(s, 4.15, 1.78, 2.15, 'metal case', { size: 10.5, bold: true, color: C.ink, h: 0.25 });
    comp(s, 'fuse', 1.6, 2.2, 2.75, 2.2, { label: 'fuse', side: -1, lcolor: C.ink });
    comp(s, 'switchClosed', 2.75, 2.2, 3.85, 2.2, { label: 'switch', side: -1 });
    wire(s, [[3.85, 2.2], [5.5, 2.2]], '8B5A2B', 2);
    comp(s, 'resistor', 5.5, 2.2, 5.5, 3.4, { label: 'heating\nelement', side: 1, lw: 0.9, lh: 0.45 });
    wire(s, [[1.6, 3.4], [5.5, 3.4]], '2E5BD8', 2);
    wire(s, [[1.6, 4.5], [4.15, 4.5]], '2E8B57', 2.5); dot(s, 4.15, 4.5);
    label(s, 1.7, 3.45, 1.4, 'neutral', { size: 10, bold: true, color: C.blue, align: 'left' });
    label(s, 1.7, 4.55, 1.4, 'earth', { size: 10, bold: true, color: C.green, align: 'left' });
    // fault
    wire(s, [[4.6, 2.2], [4.5, 1.95], [4.7, 1.9], [4.6, 1.75]], C.red, 2.5);
    label(s, 3.75, 1.3, 2.6, 'FAULT: live touches case', { size: 10.5, bold: true, color: C.red, align: 'right' });
    arrow(s, 3.9, 4.75, 2.0, 4.75, C.red, 3);
    label(s, 0.75, 5.2, 5.6, 'large current flows to earth → fuse melts → live disconnected', { size: 10.5, bold: true, color: C.red, h: 0.45 });
  },
  head: 'Making a fault safe',
  lines: [
    '**Earth wire:** connects the metal case to earth. If the live wire touches the case, a **large current** flows to earth through this low-resistance path.',
    '**Fuse:** a thin wire that **melts** when the current is too large, breaking the circuit. **Circuit breaker:** a switch that **trips** automatically – it acts faster and can be reset.',
    'Switches and fuses go in the **live wire**, so that when they open, the appliance is **disconnected from the high p.d.**',
  ],
  worked: { head: 'Worked example: choosing a fuse', q: 'A 2.3 kW kettle runs on 230 V. Fuses: 3 A, 5 A, 13 A. Which fuse?',
    steps: [['Equation', 'P = I × V, so I = P ÷ V'], ['Substitute', 'I = 2300 W ÷ 230 V'], ['Current', `I = ${Ikettle} A`], ['Answer', 'choose the **13 A** fuse (just above 10 A)']] },
  qc: 'Explain why a fuse must be in the live wire and not the neutral wire.',
  notes: `QUICK CHECK ANSWER: If the fuse melted in the neutral wire, the appliance would still be connected to the live wire at 230 V, so touching it could still give a shock. In the live wire, a melted fuse disconnects the appliance from the high p.d.\nFuse calc: 2300/230 = ${Ikettle} A → 13 A. (A 60 W lamp: 60/230 ≈ 0.26 A → 3 A fuse.)\nEdexcel 10.41 says "fuses or circuit breakers"; no tier marker found.`,
}), '10.41–10.42 Fuses and earth');

// ======================= 35 POWER RATINGS =======================
reg(D.contentSlide({
  title: 'Power ratings of domestic appliances',
  subtitle: `Specification ${sp('10.33')}, ${sp('10.40')} • energy transferred from the mains or batteries to useful stores`,
  tag: '10.40', caption: 'bar lengths drawn to scale (typical power ratings)',
  draw: (s, p) => {
    const items = [['kettle', 2300, 'thermal store of water'], ['hairdryer', 1200, 'thermal + kinetic (motor)'], ['microwave', 800, 'thermal store of food'], ['vacuum cleaner', 600, 'kinetic store of the motor'], ['television', 100, 'light and sound (radiation)'], ['LED lamp', 10, 'light (radiation)'], ['phone charger', 5, 'chemical store of battery']];
    const x0 = 2.25, wmax = 1.6, scale = wmax / 2300;
    label(s, 0.65, 1.45, 1.55, 'appliance', { size: 10.5, bold: true, color: C.ink, align: 'right' });
    label(s, x0 + 0.15, 1.45, 1.6, 'power / W', { size: 10.5, bold: true, color: C.ink, align: 'left' });
    label(s, 4.45, 1.45, 2.05, 'energy goes mainly to…', { size: 10.5, bold: true, color: C.ink, align: 'left' });
    items.forEach(([n, P, st], i) => {
      const y = 1.85 + i * 0.55;
      label(s, 0.65, y, 1.55, n, { size: 10.5, bold: true, align: 'right' });
      box(s, x0, y + 0.03, Math.max(P * scale, 0.02), 0.24, i === 0 ? C.red : C.blue, null);
      label(s, x0 + P * scale + 0.06, y, 0.6, String(P), { size: 10, align: 'left', bold: true });
      label(s, 4.45, y, 2.05, st, { size: 10, align: 'left', color: C.green });
    });
  },
  head: 'What a power rating tells you',
  lines: [
    'The **power rating** is the energy transferred per second when the appliance is used: a 2300 W kettle transfers **2300 J every second**.',
    'Higher power → more energy transferred from the supply to the appliance’s **useful stores** (and wasted to the surroundings) in the same time.',
    'Energy transferred = power × time (E = P × t). Mains devices use a.c.; portable devices are powered by batteries (d.c.).',
    '**Efficiency** = useful energy transferred ÷ total energy supplied.',
  ],
  worked: { head: 'Worked example', q: 'A 2000 W heater is used for 30 minutes. A 2000 W kettle transfers 1800 J usefully each second.',
    steps: [['Energy', 'E = P × t = 2000 × (30 × 60)'], ['Result', `E = ${(E35 / 1e6).toFixed(1)} × 10⁶ J`], ['Efficiency', 'kettle = 1800 ÷ 2000'], ['Answer', `efficiency = ${eff35} (${eff35 * 100}%)`]] },
  qc: 'Calculate the energy transferred by a 10 W LED lamp left on for 1 hour.',
  notes: `QUICK CHECK ANSWER: E = P × t = 10 × 3600 = 36 000 J.\n10.33: in different domestic devices energy is transferred from batteries and the a.c. mains to the energy of motors and heating devices. 10.40: power ratings and the changes in stored energy. Efficiency links back to Topic 3.`,
}), '10.33, 10.40 Power ratings');

// ======================= 36 RECAP 7 =======================
const R7 = D.recapSlide(7, `Specification ${sp('10.33')}–${sp('10.43')} • a.c., d.c. and mains safety`, [
  { q: 'Describe the difference between **direct current** and **alternating current**.', marks: 2, ms: 'd.c.: charge flows in one direction only (1); a.c.: the direction of flow of charge changes / keeps reversing (1).' },
  { q: 'State the **frequency** and the **potential difference** of the UK domestic mains supply.', marks: 2, ms: '50 Hz (1); about 230 V (1).' },
  { q: 'The live wire inside a metal toaster comes loose and touches the metal case. Explain how the **earth wire** and the **fuse** protect the user.', marks: 4, ms: 'Earth wire connects the case to earth / provides a low-resistance path (1); a large current flows through the live and earth wires (1); the fuse melts / blows (1); this breaks the circuit / disconnects the live wire so the case is no longer live (1).' },
]);
reg(R7.s, 'Recap 7');

// ======================= 37 EQUATIONS =======================
reg(D.equationsSlide([['QIt', sp('10.9')], ['EQV', sp('10.6')], ['VIR', sp('10.13')], ['EIVt', sp('10.27')], ['PEt', sp('10.29')], ['PIV', sp('10.31')], ['PI2R', sp('10.32')]], {
  subtitle: 'Topic 10 equations • RECALL = learn it; GIVEN = on the Physics Equations List',
  qc: 'Cover the middle column. For each equation, say every quantity and its unit aloud.',
  notes: 'QUICK CHECK: self-check against the table. Recall list: Q = It, E = QV, V = IR, P = E/t, P = IV, P = I²R. Given on the Physics Equations List: E = I × V × t (spec 10.27 says “use”, not “recall and use”). See SPEC_T10.md for sources.',
}), 'Summary: equations');

// ======================= 38 KEY WORDS =======================
reg(D.keyWords([
  ['Electric current', 'Rate of flow of charge, in amps (A); carried by electrons in metals.'],
  ['Charge', 'Measured in coulombs (C): Q = I × t.'],
  ['Potential difference', 'Energy transferred per unit charge; 1 V = 1 J/C.'],
  ['Resistance', 'Opposition to current, in ohms (Ω): R = V ÷ I.'],
  ['Series circuit', 'One loop: same current everywhere; p.d. is shared; resistances add.'],
  ['Parallel circuit', 'Separate branches: same p.d. on each; branch currents add.'],
  ['Ammeter / voltmeter', 'Ammeter in series (current); voltmeter in parallel (p.d.).'],
  ['Filament lamp', 'Resistance increases as it gets hotter: curved I–V graph.'],
  ['Diode', 'Lets current flow in one direction only; very high resistance in reverse.'],
  ['LDR', 'Light-dependent resistor: resistance falls as light intensity rises.'],
  ['Thermistor', 'NTC: resistance falls as temperature rises.'],
  ['Power', 'Energy transferred per second, in watts (W): P = I × V.'],
  ['Direct current', 'd.c.: charge flows in one direction only (cells, batteries).'],
  ['Alternating current', 'a.c.: direction keeps changing; UK mains 230 V, 50 Hz.'],
  ['Fuse', 'Thin wire in the live wire that melts if the current is too large.'],
  ['Earth wire', 'Green/yellow safety wire connecting metal cases to earth (0 V).'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= 39 FULL QUESTION =======================
reg(D.fullQuestion('A student investigates a **filament lamp** using a battery, a variable resistor, an ammeter and a voltmeter. At **3.0 V** the current is **0.20 A**.', [
  { l: 'a', q: 'Name the component the student adjusts to change the current in the circuit.', marks: 1, ms: 'variable resistor / rheostat (1).' },
  { l: 'b', q: 'Calculate the resistance of the lamp when the p.d. is 3.0 V.', marks: 2, ms: 'R = V/I = 3.0/0.20 (1); = 15 Ω (1).' },
  { l: 'c', q: 'Calculate the charge that flows through the lamp in **2.0 minutes** at 0.20 A.', marks: 2, ms: 'Q = I × t = 0.20 × 120 (1); = 24 C (1).' },
  { l: 'd', q: 'Calculate the energy transferred to the lamp by this charge. Use your answer to (c).', marks: 2, ms: 'E = Q × V = 24 × 3.0 (1); = 72 J (1). ECF from (c).' },
  { l: 'e', q: 'At 6.0 V the current is 0.30 A, so the resistance is now 20 Ω. Explain why the resistance of the lamp has increased.', marks: 3, ms: 'Larger current makes the filament hotter (1); metal ions vibrate more (1); electrons collide with ions more often, so resistance increases (1).', h: 1.25 },
  { l: 'f', q: 'Calculate the power of the lamp at 6.0 V using P = I² × R. Show that P = I × V gives the same answer.', marks: 3, ms: 'P = 0.30² × 20 (1); = 1.8 W (1); P = I × V = 0.30 × 6.0 = 1.8 W (1).', h: 1.25 },
], 13, { subtitle: 'Specification 10.6–10.18, 10.31–10.32 • answer every part • 13 marks' }), 'Full question');

// ======================= 40–41 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Write down the equation that links potential difference, current and resistance.', marks: 1, ms: 'potential difference = current × resistance / V = I × R (1).' },
  { n: '2', q: 'A charge of **150 C** passes through a heater in **60 s**. Calculate the current.', marks: 2, ms: 'I = Q/t = 150/60 (1); = 2.5 A (1).' },
  { n: '3', q: 'Explain why switches and fuses are connected in the **live** wire of an appliance.', marks: 2, ms: 'So that when the switch is off / the fuse melts, the appliance is disconnected from the live wire / high p.d. (1); so there is no danger of a shock from touching it (1).' },
  { n: '4', q: 'A kettle takes **8.0 A** from the **230 V** mains. Calculate its power, and choose a fuse: 3 A, 5 A or 13 A.', marks: 3, ms: 'P = I × V = 8.0 × 230 (1); = 1840 W (1); 13 A fuse – just above the normal current of 8.0 A (1).' },
  { n: '5', q: 'A 12 V car heater takes a current of **3.0 A** for **10 minutes**. Calculate the energy transferred. Use E = I × V × t.', marks: 3, ms: 't = 600 s (1); E = 3.0 × 12 × 600 (1); = 21 600 J / 2.16 × 10⁴ J (1).' },
  { n: '6', q: 'Describe how you would investigate how the current through a filament lamp varies with the potential difference across it. Explain how you would use your results to show how the resistance of the lamp changes.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Circuit: battery / power supply, switch, variable resistor, ammeter in series with the lamp, voltmeter in parallel across the lamp.',
    'Adjust the variable resistor to change the p.d. across the lamp.',
    'Record pairs of readings of p.d. and current (e.g. 6–8 values from 0 V to 6 V).',
    'Reverse the supply connections to get negative values.',
    'Repeat readings and calculate means; switch off between readings.',
    'Plot a graph of current (y) against p.d. (x); draw a smooth curve of best fit.',
    'Calculate R = V ÷ I at several points.',
    'Graph is a curve that gets less steep / R increases as the p.d. increases.',
    'Because the filament gets hotter, ions vibrate more, more collisions with electrons.',
    'Safety: lamp gets hot – do not touch; low-voltage supply.',
  ]);
}
D.homework('Answer every question. Show your working for calculations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 8); assert.strictEqual(R3.total, 8); assert.strictEqual(R4.total, 7);
assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7); assert.strictEqual(R7.total, 8);
assert(D.slideNo >= 38 && D.slideNo <= 44, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T10_ElectricityCircuits.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
