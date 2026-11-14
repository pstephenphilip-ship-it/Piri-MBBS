// build_4_6_A.js — AQA GCSE Chemistry (8462) 4.6 Rate and extent of chemical change, lesson 1 of 3:
// 4.6.1.1 Calculating rates of reactions (mean rate, graphs, HT tangents, mol/s),
// 4.6.1.2 Factors which affect the rates of chemical reactions (overview), Required practical 5.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_6_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, Mr, helpers } = require('./chem_common');
const { graph } = require('../aqa-maths/graphs');

const D = T.init(deck('4.6.1', 'Measuring rates of reaction'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b, tol) => calc(l, a, b, tol || 1e-6 * Math.max(1, Math.abs(b)));

// ======================= data and checks =======================
const gas = t => 56 * (1 - Math.exp(-t / 16));            // volume of CO2 (cm³) against time (s)
const DATA = [0, 10, 20, 30, 40, 50, 60].map(t => [t, Math.round(gas(t))]);
near('data 10', DATA[1][1], 26); near('data 20', DATA[2][1], 40); near('data 30', DATA[3][1], 47); near('data 60', DATA[6][1], 55);
near('mean 0-20', 40 / 20, 2.0); near('mean 0-60', 55 / 60, 0.9166667); near('mean 20-40', (51 - 40) / 20, 0.55);
const slope20 = 56 / 16 * Math.exp(-20 / 16);
near('tangent 20', Math.round(slope20 * 10) / 10, 1.0); near('tangent line', (60 - 20) / (40 - 0), 1.0);
const slope40 = 56 / 16 * Math.exp(-40 / 16);
near('tangent 40', Math.round(slope40 * 10) / 10, 0.3);
// rates in different units
near('MT1', 30 / 15, 2); near('MT2', 1.2 / 60, 0.02); near('YT1', 48 / 40, 1.2); near('YT2', 0.9 / 30, 0.03);
balanced('CaCO3+HCl', [[1, 'CaCO3'], [2, 'HCl']], [[1, 'CaCl2'], [1, 'H2O'], [1, 'CO2']]);
near('mol CO2', 0.88 / Mr('CO2'), 0.02); near('mol/s', 0.02 / 40, 0.0005);
near('HT YT mol', 0.44 / Mr('CO2'), 0.01); near('HT YT mol/s', 0.01 / 20, 0.0005);
// RP5: thiosulfate, time for cross to disappear
const RP5 = [[0.2, 125], [0.4, 62], [0.6, 42], [0.8, 31], [1.0, 25]];
RP5.forEach(([c, t]) => near('1/t ' + c, Math.round(1000 / t) / 1000, Math.round(c * 0.04 * 1000) / 1000, 0.0011));
balanced('thio', [[1, 'Na2S2O3'], [2, 'HCl']], [[2, 'NaCl'], [1, 'SO2'], [1, 'S'], [1, 'H2O']]);
calc('times fall', RP5.every((r, i) => i === 0 || r[1] < RP5[i - 1][1]) ? 1 : 0, 1);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Measuring the rate of a reaction, mean rate, reading rate graphs, tangents (HT), factors that change rate, and required practical 5',
  bullets: ['Part 1: what rate means; measuring it (4.6.1.1)', 'Part 2: mean rate and rate graphs (4.6.1.1)', 'Part 3: tangents and rate in mol/s (HT)', 'Part 4: factors and required practical 5 (4.6.1.2)'],
  notes: 'AQA 8462 GCSE Chemistry 4.6 Rate and extent of chemical change, lesson 1 of 3. Lesson 2: collision theory, activation energy and catalysts. Lesson 3: reversible reactions and equilibrium (Le Chatelier, HT). Data are illustrative and checked in the build script. About two hours.',
});

D.objectives({
  tag: '4.6.1',
  items: [
    'Describe ways to **measure** the rate of a reaction.',
    'Calculate the **mean rate** with the correct **units**.',
    'Draw a **tangent** to find the rate at a given time (HT).',
    'Investigate how **concentration** affects rate (**RP5**).',
  ],
  keywords: ['rate', 'mean rate', 'gradient', 'tangent', 'gas syringe', 'turbidity'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Products of acid + metal carbonate?', 'Moles in 4.4 g of CO₂?', 'Gradient of a line from (0, 0) to (20, 40)?', 'Test for carbon dioxide?'],
  answers: ['salt + water + carbon dioxide', '0.1 mol', '2', 'limewater turns milky'],
  notes: 'Retrieval from 4.4, 4.3 and maths (gradient).',
});

D.vocab({
  title: 'Key words', tag: '4.6.1',
  items: [
    { term: 'Rate of reaction', def: 'How **quickly** a reactant is **used up** or a product is **formed**.' },
    { term: 'Mean rate', def: '**Quantity** of reactant used or product formed ÷ **time taken**.' },
    { term: 'Tangent', def: 'A straight line that **just touches** a curve at one point. Its **gradient** is the rate at that time (HT).' },
    { term: 'Turbidity', def: 'How **cloudy** a solution is, e.g. when a precipitate forms.' },
  ],
  notes: 'Spec 4.6.1.1.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: measuring the rate of a reaction', { tag: '4.6.1.1' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, h = 3.6;
  const cards = [
    ['Volume of gas', 'Collect the gas in a **gas syringe** (or upturned measuring cylinder). Units: **cm³**.', C.blue, C.blueSoft],
    ['Loss of mass', 'Stand the flask on a **balance**; gas escapes so mass falls. Units: **g**.', C.green, C.greenSoft],
    ['Colour or cloudiness', 'Time how long until a **cross disappears** under a cloudy precipitate.', C.orange, C.orangeSoft],
  ];
  cards.forEach(([a, b, c, f], i) => { const x = MX + i * (cw + gap); headCard(s, x, 1.4, cw, h, a, c, f); txt(s, b, x + 0.2, 2.1, cw - 0.4, h - 0.9, { size: 18 }); });
  rect(s, MX, 5.25, W - 2 * MX, 1.6, C.soft, C.line);
  D.math(s, MX + 0.4, 6.05, ['mean rate = ', { n: 'quantity of reactant used (or product formed)', d: 'time taken' }], { size: 21, bold: true });
  notes(s, 'Spec 4.6.1.1: "The rate of a chemical reaction can be found by measuring the quantity of a reactant used or the quantity of product formed over time... The quantity of reactant or product can be measured by the mass in grams or by a volume in cm³. The units of rate of reaction may be given as g/s or cm³/s." Students should be able to calculate the mean rate of a reaction from given information about the quantity of a reactant used or the amount of a product formed and the time taken.');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: reading a rate graph', { tag: '4.6.1.1' });
  const G = graph(D, s, MX + 0.9, 1.75, 6.4, 4.4, [0, 60], [0, 60], { gridX: 10, gridY: 10, axesAtEdge: true, xTitle: 'Time (s)', yTitle: 'Volume of CO₂ (cm³)' });
  G.curve(gas, 0, 60, C.maroon, 3);
  DATA.forEach(([t, v]) => G.pt(t, v, C.maroon));
  const bx = MX + 7.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.95, 'What the shape shows', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Steepest** at the start: **fastest** rate.', 'Gets **less steep**: reactants are used up.', '**Flat**: the reaction has **stopped**.'], 16, 0.12);
  rect(s, bx, 4.55, bw, 2.3, C.orangeSoft, 'F3D9B5');
  txt(s, 'Mean rate, first 20 s', bx + 0.25, 4.65, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, '40 cm³ ÷ 20 s = **2.0 cm³/s**', bx + 0.25, 5.1, bw - 0.5, 0.45, { size: 18 });
  txt(s, 'Whole reaction: 55 ÷ 60 = **0.92 cm³/s**', bx + 0.25, 5.6, bw - 0.5, 0.45, { size: 16 });
  notes(s, 'Spec 4.6.1.1: "Students should be able to draw, and interpret, graphs showing the quantity of product formed or quantity of reactant used up against time." CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Mean rate over the first 20 s is faster than over the whole reaction because the rate falls as reactants are used up. Checked in the build script.');
}

D.myTurnYourTurn({
  title: 'Mean rate of reaction', tag: 'Maths skill', stepSize: 19, labelW: 2.6, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Calculate the mean rate:',
    steps: [
      { label: '30 cm³ in 15 s', text: '30 ÷ 15 = **2 cm³/s**' },
      { label: '1.2 g lost in 60 s', text: '1.2 ÷ 60 = **0.02 g/s**' },
    ],
  },
  yours: {
    q: 'Calculate the mean rate:',
    steps: [
      { label: '48 cm³ in 40 s', text: '48 ÷ 40 = **1.2 cm³/s**' },
      { label: '0.9 g lost in 30 s', text: '0.9 ÷ 30 = **0.03 g/s**' },
    ],
  },
  notes: 'Always give units: cm³/s or g/s. Checked in the build script.',
});

D.hinge({
  title: 'Quick check',
  q: 'Why does the line on a gas volume graph become flat?',
  options: ['A reactant has been used up', 'The gas syringe is full of air', 'The rate has become very fast', 'The catalyst has run out'],
  correct: 0,
  notes: 'Answer A: no more product forms. B: a full syringe would be a problem with the method, not the reaction. C is the opposite. D: catalysts are not used up.',
});

// ---------------- Part 3 (HT) ----------------
{
  const s = frame('Part 3: rate at a particular time', HT);
  const G = graph(D, s, MX + 0.9, 1.75, 6.4, 4.4, [0, 60], [0, 60], { gridX: 10, gridY: 10, axesAtEdge: true, xTitle: 'Time (s)', yTitle: 'Volume of CO₂ (cm³)' });
  G.curve(gas, 0, 60, C.maroon, 3);
  G.seg(0, 20, 40, 60, C.blue, 2.5);
  G.pt(20, 40, C.blue, 'tangent at 20 s', 0.2, 0.05);
  G.seg(0, 20, 40, 20, C.grey, 1.25, 'dash'); G.seg(40, 20, 40, 60, C.grey, 1.25, 'dash');
  txt(s, '40 s', G.px(20) - 0.4, G.py(20) + 0.02, 0.8, 0.3, { size: 13, bold: true, color: C.grey, align: 'center' });
  txt(s, '40 cm³', G.px(40) + 0.05, G.py(40) - 0.15, 0.9, 0.3, { size: 13, bold: true, color: C.grey });
  const bx = MX + 7.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.9, 'Method', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Draw a **tangent** that just touches the curve at the time you want.', 'Make a large triangle under it.', 'Gradient = **change in y ÷ change in x**.'], 15, 0.1);
  rect(s, bx, 4.5, bw, 2.35, C.orangeSoft, 'F3D9B5');
  txt(s, 'At 20 s:', bx + 0.25, 4.6, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, '(60 − 20) ÷ (40 − 0)', bx + 0.25, 5.05, bw - 0.5, 0.4, { size: 17 });
  txt(s, '= **1.0 cm³/s**', bx + 0.25, 5.5, bw - 0.5, 0.4, { size: 17 });
  txt(s, 'Slower than the mean rate at the start (2.0 cm³/s).', bx + 0.25, 6.0, bw - 0.5, 0.8, { size: 14 });
  notes(s, 'Spec 4.6.1.1 (HT): "Students should be able to draw tangents to the curves on these graphs and use the slope of the tangent as a measure of the rate of reaction; calculate the gradient of a tangent to the curve on these graphs as a measure of rate of reaction at a specific time." The exact gradient of this curve at 20 s is 1.00 cm³/s (checked). Students\' hand-drawn tangents will vary slightly; accept a sensible range.');
}

{
  const s = frame('Rate in mol/s', HT);
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'Rate can also be given in **mol/s**: convert the mass to **moles** first (moles = mass ÷ Mᵣ).', { fill: C.soft, line: C.line, size: 18 });
  rect(s, MX, 2.5, W - 2 * MX, 2.55, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', MX + 0.3, 2.6, 5, 0.4, { size: 18, bold: true, color: C.orange });
  txt(s, '0.88 g of CO₂ is given off in 40 s. Find the mean rate in mol/s.', MX + 0.3, 3.05, W - 2 * MX - 0.6, 0.45, { size: 18 });
  txt(s, 'moles CO₂ = 0.88 ÷ 44 = **0.020 mol**', MX + 0.3, 3.6, W - 2 * MX - 0.6, 0.45, { size: 18 });
  txt(s, 'rate = 0.020 ÷ 40 = **0.0005 mol/s**  (5 × 10⁻⁴ mol/s)', MX + 0.3, 4.15, W - 2 * MX - 0.6, 0.45, { size: 18 });
  headCard(s, MX, 5.3, W - 2 * MX, 1.55, 'Your turn', C.green, C.greenSoft);
  txt(s, '0.44 g of CO₂ in 20 s.  Answer: 0.44 ÷ 44 = 0.010 mol; 0.010 ÷ 20 = **0.0005 mol/s**', MX + 0.2, 5.95, W - 2 * MX - 0.4, 0.8, { size: 17 });
  notes(s, 'Spec 4.6.1.1 (HT): "The units of rate of reaction may be given as g/s or cm³/s. For the Higher Tier, students are also required to use quantity of reactants in terms of moles and units for rate of reaction in mol/s." Reveal the "your turn" answer after students try it. Checked in the build script.');
}

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'A tangent at 40 s goes through (20, 45) and (60, 57). What is the rate at 40 s?',
  options: ['0.3 cm³/s', '1.3 cm³/s', '2.3 cm³/s', '12 cm³/s'],
  correct: 0,
  notes: 'Answer A: (57 − 45) ÷ (60 − 20) = 12 ÷ 40 = 0.3. B divides 51 by 40 (reading a value, not a gradient). C uses y ÷ x of one point. D forgets to divide by time.',
});
near('hinge tangent', (57 - 45) / (60 - 20), 0.3);

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: factors that affect rate', { tag: '4.6.1.2' });
  const gap = 0.3, cw = (W - 2 * MX - gap) / 2, h = 1.6;
  const f = [['Concentration (solutions)', 'higher concentration → faster'], ['Pressure (gases)', 'higher pressure → faster'], ['Surface area (solids)', 'smaller pieces / powder → faster'], ['Temperature', 'higher temperature → faster'], ['Catalyst', 'adding a catalyst → faster']];
  f.forEach(([a, b], i) => { const x = MX + (i % 2) * (cw + gap), y = 1.4 + Math.floor(i / 2) * (h + 0.2); rect(s, x, y, cw, h, i % 2 ? C.white : C.soft, C.line); rect(s, x, y, 0.12, h, C.accent); txt(s, a, x + 0.35, y + 0.15, cw - 0.5, 0.45, { size: 20, bold: true, color: C.maroon }); txt(s, b, x + 0.35, y + 0.7, cw - 0.5, 0.7, { size: 18 }); });
  note(s, MX + cw + gap, 1.4 + 2 * (h + 0.2), cw, h, '**Why?** Explained by **collision theory** in lesson 2.', { size: 18 });
  notes(s, 'Spec 4.6.1.2: "Factors which affect the rates of chemical reactions include: the concentrations of reactants in solution, the pressure of reacting gases, the surface area of solid reactants, the temperature and the presence of catalysts. Students should be able to recall how changing these factors affects the rate of chemical reactions."');
}

{
  const s = frame('Required practical 5: concentration and rate', { tag: 'Required practical 5' });
  txt(s, 'Na₂S₂O₃ + 2HCl → 2NaCl + SO₂ + S + H₂O   (sulfur makes the solution cloudy)', MX, 1.35, W - 2 * MX, 0.45, { size: 17, bold: true, color: C.maroon });
  headCard(s, MX, 1.95, 4.6, 4.9, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.65, 4.2, ['Draw a **cross** on paper under a conical flask.', 'Add sodium thiosulfate solution, then hydrochloric acid; **start the timer**.', '**Stop** when the cross can no longer be seen.', 'Repeat with different **concentrations** of thiosulfate.'], 15, 0.12);
  const tw = 3.4, tx = MX + 4.9;
  table(s, tx, 1.95, [tw * 0.36, tw * 0.32, tw * 0.32], ['Conc. (mol/dm³)', 'Time (s)', '1/time'], RP5.map(([c, t]) => [c.toFixed(1), String(t), (1 / t).toFixed(3)]), { rh: 0.5, hh: 0.62, size: 14, boldFirst: false, align: ['center', 'center', 'center'] });
  const G = graph(D, s, MX + 8.9, 2.25, W - MX - (MX + 8.9) - 0.1, 3.4, [0, 1.0], [0, 0.04], { gridX: 0.2, gridY: 0.01, labX: 0.2, labY: 0.01, axesAtEdge: true, xTitle: 'Concentration', yTitle: '1/time (1/s)' });
  RP5.forEach(([c, t]) => G.pt(c, 1 / t, C.maroon));
  G.seg(0, 0, 1.0, 0.04, C.blue, 2, 'dash');
  note(s, tx, 5.15, W - MX - tx, 1.7, '**1/time** is proportional to the rate. Doubling the concentration **halves the time** (doubles the rate). Variables: control the **volume**, **temperature** and the **same cross**.', { size: 15 });
  notes(s, 'RP5: "investigate how changes in concentration affect the rates of reactions by a method involving measuring the volume of a gas produced and a method involving a change in colour or turbidity. This should be an investigation involving developing a hypothesis." The second method is the gas volume method (magnesium + HCl with a gas syringe). Safety: SO₂ is an irritant, ventilate; goggles. Data illustrative and checked (1/t ≈ 0.04 × concentration).');
}

D.hinge({
  title: 'Quick check',
  q: 'In RP5, why is the same paper cross used each time?',
  options: ['To keep the test fair: same end point', 'To make the reaction faster', 'To measure the volume of gas', 'To keep the temperature the same'],
  correct: 0,
  notes: 'Answer A: the "cross disappears" end point depends on the cross and the observer, so keep them the same. Different people may judge it differently: a limitation (a light sensor is better).',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Give two ways to measure the rate of a reaction.', 'Volume of gas; loss of mass (or time for a cross to disappear)'], ['Write the formula for mean rate.', 'Quantity ÷ time'], ['What are the units of rate for gas volume?', 'cm³/s'], ['Name five factors that affect rate.', 'Concentration, pressure, surface area, temperature, catalyst'],
    ['Mean rate: 2.4 g lost in 80 s?', '0.03 g/s'], ['From the graph: mean rate from 20 s to 40 s?', '(51 − 40) ÷ 20 = 0.55 cm³/s'],
    ['Why is the start of the graph steepest?', 'Most reactant particles present'], ['0.22 g CO₂ in 10 s. Rate in mol/s? (HT)', '0.0005 mol/s'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) volume of gas (gas syringe), loss of mass (balance), time for a cross to disappear  2) quantity of reactant used or product formed ÷ time  3) cm³/s  4) concentration, pressure, surface area, temperature, catalyst  5) 2.4 ÷ 80 = 0.03 g/s  6) 11 ÷ 20 = 0.55 cm³/s  7) highest concentration of reactants at the start  8) 0.22 ÷ 44 = 0.005 mol; ÷ 10 = 0.0005 mol/s.');
  }
}
near('practice 5', 2.4 / 80, 0.03); near('practice 8', 0.22 / 44 / 10, 0.0005);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'Magnesium ribbon reacts with hydrochloric acid. Volume of hydrogen: 0 s 0 cm³; 10 s 18 cm³; 20 s 30 cm³; 30 s 37 cm³; 40 s 40 cm³; 50 s 40 cm³.',
  parts: [
    { l: 'a', q: 'Name the apparatus used to collect and measure the gas.', m: 1, lines: 0 },
    { l: 'b', q: 'Calculate the mean rate over the first 20 s. Give the unit.', m: 2, lines: 0 },
    { l: 'c', q: 'At what time did the reaction stop? Explain how you know.', m: 2, lines: 1 },
    { l: 'd', q: 'Describe how to use this method to investigate the effect of acid concentration on rate.', m: 3, lines: 1 },
    { l: 'e', q: 'A tangent at 20 s passes through (0, 14) and (40, 46). Calculate the rate at 20 s. (HT)', m: 2, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'gas syringe', '1', ''],
    ['(b)', '30 ÷ 20 = 1.5; cm³/s', '2', ''],
    ['(c)', 'about 40 s; volume stays at 40 cm³ (no more gas made)', '2', ''],
    ['(d)', 'change acid concentration; same length/mass of Mg, volume of acid and temperature; measure volume of gas at regular times / time to collect a set volume', '3', ''],
    ['(e)', '(46 − 14) ÷ 40; = 0.8 cm³/s', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});
near('exam b', 30 / 20, 1.5); near('exam e', (46 - 14) / 40, 0.8);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What does a steep line on a rate graph show?', '60 cm³ of gas in 30 s. Mean rate?', 'What is turbidity?', 'How do you find the rate at one time? (HT)'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) a fast rate  2) 2 cm³/s  3) cloudiness  4) draw a tangent and calculate its gradient. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Plot the exam data (volume against time) and draw a smooth curve.',
    'Calculate the mean rate from 0 to 10 s and from 30 to 40 s. Explain the difference.',
    'Write an RP5 plan using the disappearing cross. Name the variables.',
    'Give one limitation of the disappearing cross method and an improvement.',
    'HT: draw a tangent at 10 s on your graph and find the rate.',
    'HT: 1.32 g of CO₂ in 60 s. Find the mean rate in mol/s.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) curve levelling off at 40 cm³  2) 1.8 cm³/s and 0.3 cm³/s; reactants used up, fewer particles to react  3) IV concentration, DV time, CV volumes, temperature, same cross  4) judging when the cross disappears is subjective; use a light sensor/colorimeter  5) about 1.4 cm³/s (accept a range)  6) 1.32 ÷ 44 = 0.03 mol; ÷ 60 = 0.0005 mol/s.');
}
near('HW 0-10', 18 / 10, 1.8); near('HW 30-40', (40 - 37) / 10, 0.3); near('HW mol/s', 1.32 / 44 / 60, 0.0005);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.6_A_MeasuringRates.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
