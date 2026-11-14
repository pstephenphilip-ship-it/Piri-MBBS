// build_4_3_A.js — AQA GCSE Chemistry (8462) 4.3 Quantitative chemistry, lesson 1 of 3:
// 4.3.1.1 Conservation of mass and balanced equations, 4.3.1.2 Relative formula mass,
// 4.3.1.3 Mass changes when a reactant or product is a gas, 4.3.1.4 Chemical measurements (uncertainty).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_3_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, Mr, helpers } = require('./chem_common');

const D = T.init(deck('4.3.1', 'Conservation of mass and Mr'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));
const r1 = x => Math.round(x * 10) / 10, r2 = x => Math.round(x * 100) / 100;

// ======================= checks =======================
near('Mr H2O', Mr('H2O'), 18); near('Mr CO2', Mr('CO2'), 44); near('Mr CaCO3', Mr('CaCO3'), 100); near('Mr Ca(OH)2', Mr('Ca(OH)2'), 74);
near('Mr H2SO4', Mr('H2SO4'), 98); near('Mr NaCl', Mr('NaCl'), 58.5); near('Mr MgO', Mr('MgO'), 40); near('Mr CaO', Mr('CaO'), 56);
near('MT NaOH', Mr('NaOH'), 40); near('MT MgCl2', Mr('MgCl2'), 95); near('MT (NH4)2SO4', Mr('(NH4)2SO4'), 132);
near('YT KNO3', Mr('KNO3'), 101); near('YT Al2O3', Mr('Al2O3'), 102); near('YT Ca(NO3)2', Mr('Ca(NO3)2'), 164);
near('practice CuSO4', Mr('CuSO4'), 159.5); near('practice C6H12O6', Mr('C6H12O6'), 180); near('exam Na2CO3', Mr('Na2CO3'), 106);
near('HW Fe2O3', Mr('Fe2O3'), 160); near('HW C2H5OH', Mr('C2H5OH'), 46); near('HW Mg(OH)2', Mr('Mg(OH)2'), 58);
// conservation of mass in equations (sum of coefficient × Mr)
const side = arr => arr.reduce((t, [k, f]) => t + k * Mr(f), 0);
const cons = (label, L, R, total) => { balanced(label, L, R); near('mass L ' + label, side(L), total); near('mass R ' + label, side(R), total); };
cons('Mg+O2', [[2, 'Mg'], [1, 'O2']], [[2, 'MgO']], 80);
cons('CaCO3', [[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']], 100);
cons('CH4', [[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']], 80);
cons('MT HCl+NaOH', [[1, 'HCl'], [1, 'NaOH']], [[1, 'NaCl'], [1, 'H2O']], 76.5);
cons('YT Zn+CuSO4', [[1, 'Zn'], [1, 'CuSO4']], [[1, 'ZnSO4'], [1, 'Cu']], 224.5);
cons('BaCl2 ppt', [[1, 'BaCl2'], [1, 'Na2SO4']], [[1, 'BaSO4'], [2, 'NaCl']], 350);
cons('exam Na2CO3', [[1, 'Na2CO3'], [2, 'HCl']], [[2, 'NaCl'], [1, 'H2O'], [1, 'CO2']], 179);
// mass change experiments
near('MgO mass', 2.4 + 1.6, 4.0); near('CO2 lost', 10.0 - 5.6, 4.4); near('ratio CaO', 56 / 100 * 10, 5.6);
near('exam CO2 lost', 52.40 - 51.96, 0.44);
// uncertainty
const mean = a => a.reduce((x, y) => x + y, 0) / a.length, unc = a => (Math.max(...a) - Math.min(...a)) / 2;
near('ex mean', mean([24.5, 25.1, 24.8, 25.0]), 24.85); near('ex unc', unc([24.5, 25.1, 24.8, 25.0]), 0.3);
near('MT mean', mean([12.2, 12.6, 12.4]), 12.4); near('MT unc', r2(unc([12.2, 12.6, 12.4])), 0.2);
near('YT mean', r2(mean([30.2, 29.6, 29.9])), 29.9); near('YT unc', r2(unc([30.2, 29.6, 29.9])), 0.3);
near('exam mean', r2(mean([31.5, 32.1, 31.8])), 31.8); near('exam unc', r2(unc([31.5, 32.1, 31.8])), 0.3);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Conservation of mass, relative formula mass, why some reactions seem to gain or lose mass, and uncertainty in measurements',
  bullets: ['Part 1: conservation of mass (4.3.1.1)', 'Part 2: relative formula mass, Mᵣ (4.3.1.2)', 'Part 3: mass changes with gases (4.3.1.3)', 'Part 4: uncertainty in measurements (4.3.1.4)'],
  notes: 'AQA 8462 GCSE Chemistry 4.3 Quantitative chemistry, lesson 1 of 3. Lesson 2: moles, reacting masses and limiting reactants (HT). Lesson 3: concentration, yield, atom economy, titration and gas volumes. Use the relative atomic masses from the periodic table (Cl = 35.5, Cu = 63.5). About two hours.',
});

D.objectives({
  tag: '4.3.1',
  items: [
    'Explain why **mass is conserved** in a reaction, using balanced equations.',
    'Calculate **relative formula mass** (Mᵣ) from Aᵣ values.',
    'Explain **apparent mass changes** when a gas is involved.',
    'Estimate **uncertainty** from the range of results.',
  ],
  keywords: ['conservation of mass', 'relative atomic mass', 'relative formula mass', 'thermal decomposition', 'mean', 'uncertainty'],
  notes: 'Share the objectives. Everything in topic 4.3 builds on Mᵣ, so make sure it is secure.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Balance: Mg + O₂ → MgO', 'What is the relative atomic mass of chlorine?', 'How many atoms of O are in Ca(NO₃)₂?', 'Find the mean of 4, 6 and 8.'],
  answers: ['2Mg + O₂ → 2MgO', '35.5', '6', '6'],
  notes: 'Retrieval from 4.1, plus the maths skill (mean) needed in Part 4.',
});

D.vocab({
  title: 'Key words', tag: '4.3.1',
  items: [
    { term: 'Conservation of mass', def: 'No atoms are lost or made in a reaction, so **total mass of products = total mass of reactants**.' },
    { term: 'Aᵣ', def: '**Relative atomic mass**: the mean mass of an element’s atoms, from the periodic table.' },
    { term: 'Mᵣ', def: '**Relative formula mass**: the **sum** of the Aᵣ values of all the atoms in the formula. No units.' },
    { term: 'Uncertainty', def: 'How far a result might be from the true value. Estimate it as **± half the range**.' },
  ],
  notes: 'Spec 4.3.1.1 and 4.3.1.2 definitions.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: conservation of mass', { tag: '4.3.1.1' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'In a chemical reaction atoms are only **rearranged**. No atoms are lost or made, so the **total mass stays the same**.', { fill: C.soft, line: C.line, size: 18 });
  // sealed flask precipitate demo: two balances
  const bal = (x, reading, label) => {
    rect(s, x, 4.3, 2.6, 0.5, C.greyLight, C.grey); txt(s, reading, x, 4.3, 2.6, 0.5, { size: 18, bold: true, align: 'center', valign: 'middle' });
    rect(s, x + 0.65, 3.1, 1.3, 1.2, 'DDEBF7', C.blue, { lw: 1.5 });
    txt(s, label, x - 0.2, 4.9, 3.0, 0.7, { size: 14, align: 'center' });
  };
  bal(MX + 0.4, '125.40 g', 'Before: barium chloride and sodium sulfate solutions');
  arrow(s, MX + 3.2, 3.7, MX + 4.2, 3.7, C.ink, 2.5);
  bal(MX + 4.4, '125.40 g', 'After: white precipitate of barium sulfate');
  for (let i = 0; i < 9; i++) circle(s, MX + 5.2 + (i % 5) * 0.2, 3.95 + Math.floor(i / 5) * 0.15, 0.1, C.white, C.grey, 0.5);
  const bx = MX + 7.6, bw = W - MX - bx;
  rect(s, bx, 2.5, bw, 3.1, C.orangeSoft, 'F3D9B5');
  txt(s, 'Check with Mᵣ', bx + 0.25, 2.6, bw - 0.5, 0.4, { size: 18, bold: true, color: C.orange });
  txt(s, 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl', bx + 0.25, 3.1, bw - 0.5, 0.45, { size: 17, bold: true });
  txt(s, 'Left: 208 + 142 = **350**', bx + 0.25, 3.65, bw - 0.5, 0.45, { size: 18 });
  txt(s, 'Right: 233 + 117 = **350**', bx + 0.25, 4.15, bw - 0.5, 0.45, { size: 18 });
  txt(s, 'Same total on each side.', bx + 0.25, 4.8, bw - 0.5, 0.5, { size: 16, bold: true, color: C.green });
  note(s, MX, 5.85, W - 2 * MX, 1.0, 'A **balanced symbol equation** shows this: the sum of the Mᵣ values on each side (times the big numbers) is equal.', { size: 17 });
  notes(s, 'Spec 4.3.1.1: "The law of conservation of mass states that no atoms are lost or made during a chemical reaction so the mass of the products equals the mass of the reactants. This means that chemical reactions can be represented by symbol equations which are balanced in terms of the numbers of atoms of each element involved on both sides of the equation." The flask is a closed system (no gas escapes). BaCl₂ 208, Na₂SO₄ 142, BaSO₄ 233, NaCl 58.5: all checked in the build script. Balance readings are illustrative.');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: relative formula mass, Mᵣ', { tag: '4.3.1.2' });
  rect(s, MX, 1.4, W - 2 * MX, 0.85, C.soft, C.line);
  txt(s, '**Mᵣ = the sum of the Aᵣ values of all the atoms in the formula.**  Aᵣ values: H 1, C 12, N 14, O 16, Na 23, Mg 24, S 32, Cl 35.5, K 39, Ca 40', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.85, { size: 16, valign: 'middle' });
  const tw = W - 2 * MX;
  table(s, MX, 2.5, [tw * 0.24, tw * 0.56, tw * 0.2], ['Formula', 'Working', 'Mᵣ'], [
    ['H₂O', '(2 × 1) + 16', '18'],
    ['CO₂', '12 + (2 × 16)', '44'],
    ['CaCO₃', '40 + 12 + (3 × 16)', '100'],
    ['Ca(OH)₂', '40 + 2 × (16 + 1)', '74'],
    ['H₂SO₄', '(2 × 1) + 32 + (4 × 16)', '98'],
  ], { rh: 0.58, size: 18, align: ['left', 'left', 'center'] });
  note(s, MX, 6.15, tw, 0.7, 'Brackets: multiply **everything inside** by the number outside. Mᵣ has **no units**.', { size: 17 });
  notes(s, 'Spec 4.3.1.2: "The relative formula mass (Mr) of a compound is the sum of the relative atomic masses of the atoms in the numbers shown in the formula. In a balanced chemical equation, the sum of the relative formula masses of the reactants in the quantities shown equals the sum of the relative formula masses of the products in the quantities shown." All values checked by the build script from the Aᵣ table.');
}

D.myTurnYourTurn({
  title: 'Calculate Mᵣ', tag: 'Maths skill', stepSize: 19, labelW: 1.7, labelSize: 18, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Find Mᵣ:',
    steps: [
      { label: 'NaOH', text: '23 + 16 + 1 = **40**' },
      { label: 'MgCl₂', text: '24 + (2 × 35.5) = **95**' },
      { label: '(NH₄)₂SO₄', text: '2 × (14 + 4) + 32 + 64 = **132**' },
    ],
  },
  yours: {
    q: 'Find Mᵣ:',
    steps: [
      { label: 'KNO₃', text: '39 + 14 + 48 = **101**' },
      { label: 'Al₂O₃', text: '(2 × 27) + (3 × 16) = **102**' },
      { label: 'Ca(NO₃)₂', text: '40 + 2 × (14 + 48) = **164**' },
    ],
  },
  notes: 'Aᵣ: Al = 27. All values checked in the build script.',
});

{
  const s = frame('Mᵣ in balanced equations', { tag: '4.3.1.2' });
  const tw = W - 2 * MX;
  const rows = [
    ['2Mg + O₂ → 2MgO', '(2 × 24) + 32 = 80', '2 × 40 = 80'],
    ['CaCO₃ → CaO + CO₂', '100', '56 + 44 = 100'],
    ['CH₄ + 2O₂ → CO₂ + 2H₂O', '16 + (2 × 32) = 80', '44 + (2 × 18) = 80'],
  ];
  table(s, MX, 1.4, [tw * 0.38, tw * 0.31, tw * 0.31], ['Equation', 'Reactants', 'Products'], rows, { rh: 0.8, size: 18, boldFirst: true });
  note(s, MX, 4.4, tw, 1.0, 'The **big number** in front multiplies the **whole** Mᵣ. Equal totals show the equation is balanced and mass is conserved.', { size: 18 });
  headCard(s, MX, 5.6, tw, 1.25, 'Try it', C.green, C.greenSoft);
  txt(s, 'Show that mass is conserved in  HCl + NaOH → NaCl + H₂O   (36.5 + 40 = 58.5 + 18 = 76.5)', MX + 0.2, 6.2, tw - 0.4, 0.55, { size: 17 });
  notes(s, 'All three equations and the "try it" are checked by the build script (atoms balanced, totals equal). Common error: forgetting to multiply by the coefficient (e.g. 2MgO as 40 instead of 80).');
}

D.hinge({
  title: 'Quick check',
  q: 'What is the Mᵣ of Mg(OH)₂? (Mg = 24, O = 16, H = 1)',
  options: ['58', '41', '57', '82'],
  correct: 0,
  notes: 'Answer A: 24 + 2 × (16 + 1) = 58. B ignored the bracket (24 + 16 + 1). C doubled only the O (24 + 32 + 1). D doubled Mg too.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: mass changes when a gas is involved', { tag: '4.3.1.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.55, 'Mass goes UP', C.green, C.greenSoft);
  txt(s, 'A **reactant is a gas** from the air (not weighed at the start).', MX + 0.2, 2.1, cw - 0.4, 0.8, { size: 17 });
  txt(s, '2Mg(s) + O₂(g) → 2MgO(s)', MX + 0.2, 2.85, cw - 0.4, 0.45, { size: 18, bold: true });
  txt(s, '2.4 g of magnesium makes **4.0 g** of magnesium oxide. The extra **1.6 g** is oxygen from the air.', MX + 0.2, 3.4, cw - 0.4, 1.4, { size: 17 });
  const x2 = MX + cw + gap;
  headCard(s, x2, 1.4, cw, 3.55, 'Mass goes DOWN', C.red, 'FBEAEA');
  txt(s, 'A **product is a gas** that escapes into the air.', x2 + 0.2, 2.1, cw - 0.4, 0.8, { size: 17 });
  txt(s, 'CaCO₃(s) → CaO(s) + CO₂(g)', x2 + 0.2, 2.85, cw - 0.4, 0.45, { size: 18, bold: true });
  txt(s, '10.0 g of calcium carbonate leaves **5.6 g** of calcium oxide. **4.4 g** of carbon dioxide escaped.', x2 + 0.2, 3.4, cw - 0.4, 1.4, { size: 17 });
  note(s, MX, 5.2, W - 2 * MX, 1.65, 'Mass is **still conserved**. It only **seems** to change because a gas was not measured. In a **closed** (sealed) system the mass would stay the same. Use **particle** ideas: oxygen atoms join the magnesium; carbon dioxide molecules leave.', { size: 17 });
  notes(s, 'Spec 4.3.1.3: "Some reactions may appear to involve a change in mass but this can usually be explained because a reactant or product is a gas and its mass has not been taken into account... Students should be able to explain any observed changes in mass in non-enclosed systems during a chemical reaction given the balanced symbol equation for the reaction and explain these changes in terms of the particle model." Numbers: 2.4 + 1.6 = 4.0; 10.0 − 5.6 = 4.4 (CaO is 56/100 of the mass). Checked in the build script.');
}

D.hinge({
  title: 'Quick check',
  q: 'Copper carbonate is heated in an open tube. The mass goes down. Why?',
  options: ['Carbon dioxide gas escapes', 'Atoms are destroyed by heating', 'Oxygen from the air is added', 'Copper evaporates'],
  correct: 0,
  notes: 'Answer A: CuCO₃ → CuO + CO₂. B breaks the law of conservation of mass. C would make the mass go UP. D: copper does not evaporate at Bunsen temperatures.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: uncertainty in measurements', { tag: '4.3.1.4' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.2, tw * 0.16, tw * 0.16, tw * 0.16, tw * 0.16, tw * 0.16], ['Trial', '1', '2', '3', '4', 'Mean'], [['Volume (cm³)', '24.5', '25.1', '24.8', '25.0', '24.85']], { rh: 0.6, size: 18, align: ['left', 'center', 'center', 'center', 'center', 'center'] });
  rect(s, MX, 2.95, tw, 2.5, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', MX + 0.3, 3.05, 5, 0.45, { size: 19, bold: true, color: C.orange });
  const L = [['Mean', '(24.5 + 25.1 + 24.8 + 25.0) ÷ 4 = **24.85 cm³**'], ['Range', '25.1 − 24.5 = **0.6 cm³**'], ['Uncertainty', '± range ÷ 2 = **± 0.3 cm³**'], ['Answer', '**24.9 ± 0.3 cm³** (the true value is probably between 24.6 and 25.2)']];
  L.forEach(([a, b], i) => { txt(s, a, MX + 0.3, 3.55 + i * 0.45, 2.0, 0.42, { size: 17, bold: true, color: C.maroon }); txt(s, b, MX + 2.3, 3.55 + i * 0.45, tw - 2.6, 0.42, { size: 17 }); });
  note(s, MX, 5.65, tw, 1.2, 'A **smaller** range means **more precise** results. **Anomalous** results (far from the others) are left out of the mean.', { fill: C.soft, line: C.line, size: 17 });
  notes(s, 'Spec 4.3.1.4: "Whenever a measurement is made there is always some uncertainty about the result obtained. Students should be able to represent the distribution of results and make estimations of uncertainty; use the range of a set of measurements about the mean as a measure of uncertainty." Checked: mean 24.85, half-range 0.3.');
}

D.myTurnYourTurn({
  title: 'Mean and uncertainty', tag: 'Maths skill', stepSize: 19, labelW: 1.9, labelSize: 17, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Results: 12.2, 12.6, 12.4 g',
    steps: [
      { label: 'Mean', text: '37.2 ÷ 3 = **12.4 g**' },
      { label: 'Range', text: '12.6 − 12.2 = **0.4 g**' },
      { label: 'Answer', text: '**12.4 ± 0.2 g**' },
    ],
  },
  yours: {
    q: 'Results: 30.2, 29.6, 29.9 s',
    steps: [
      { label: 'Mean', text: '89.7 ÷ 3 = **29.9 s**' },
      { label: 'Range', text: '30.2 − 29.6 = **0.6 s**' },
      { label: 'Answer', text: '**29.9 ± 0.3 s**' },
    ],
  },
  notes: 'Uncertainty = half the range. All values checked in the build script.',
});
near('MT sum', 12.2 + 12.6 + 12.4, 37.2); near('YT sum', 30.2 + 29.6 + 29.9, 89.7);

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['State the law of conservation of mass.', 'No atoms are lost or made, so mass of products = mass of reactants'], ['What is Mᵣ?', 'Sum of the Aᵣ of all atoms in the formula'], ['Find Mᵣ of CuSO₄ (Cu = 63.5).', '159.5'], ['Find Mᵣ of glucose, C₆H₁₂O₆.', '180'],
    ['Why does the mass go up when iron rusts in air?', 'Oxygen (and water) from the air are added'], ['A reaction in a sealed flask makes a gas. Does the mass change?', 'No: the gas cannot escape'],
    ['Results 8.1, 8.5, 8.3. Give the mean ± uncertainty.', '8.3 ± 0.2'], ['What does a small range show?', 'The results are precise'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) no atoms are lost or made, so the mass of products equals the mass of reactants  2) the sum of the relative atomic masses of the atoms in the formula  3) 63.5 + 32 + 64 = 159.5  4) 72 + 12 + 96 = 180  5) oxygen from the air combines with the iron (not weighed at the start)  6) no, closed system  7) mean 24.9 ÷ 3 = 8.3; range 0.4, so ± 0.2  8) precise (close together).');
  }
}
near('practice mean', mean([8.1, 8.5, 8.3]), 8.3); near('practice unc', r2(unc([8.1, 8.5, 8.3])), 0.2);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'In an open flask on a balance:   Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂',
  parts: [
    { l: 'a', q: 'Calculate the Mᵣ of sodium carbonate, Na₂CO₃.', m: 2, lines: 0 },
    { l: 'b', q: 'Show that the total Mᵣ of the reactants equals the total Mᵣ of the products.', m: 2, lines: 1 },
    { l: 'c', q: 'The mass on the balance fell from 52.40 g to 51.96 g. Explain why, and give the mass of gas made.', m: 3, lines: 1 },
    { l: 'd', q: 'She repeats it. Volumes of gas: 31.5, 32.1, 31.8 cm³. Give the mean and its uncertainty.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', '(2 × 23) + 12 + (3 × 16); = 106', '2', ''],
    ['(b)', 'reactants 106 + (2 × 36.5) = 179; products (2 × 58.5) + 18 + 44 = 179', '2', ''],
    ['(c)', 'carbon dioxide gas made; escapes from the open flask; 0.44 g', '3', ''],
    ['(d)', 'mean 31.8 cm³; range 0.6; ± 0.3 cm³', '3', ''],
  ],
  notes: 'Mark scheme on the next slide. All numbers checked in the build script.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Find Mᵣ of CaCO₃.', 'Why does magnesium gain mass when it burns?', 'Find Mᵣ of Ca(OH)₂.', 'How do you estimate uncertainty from repeat results?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) 100  2) oxygen from the air combines with it  3) 74  4) half the range, either side of the mean. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Find Mᵣ: Fe₂O₃, C₂H₅OH, Mg(OH)₂ (Fe = 56).',
    'Show that mass is conserved in 2Mg + O₂ → 2MgO.',
    'Explain why the mass falls when calcium carbonate is heated.',
    'Explain why the mass of a sealed flask stays the same when a gas forms.',
    'Results 15.2, 14.6, 15.0, 15.1. Find the mean and uncertainty.',
    'Plan an experiment to show that mass is conserved in a precipitation reaction.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 160; 46; 58  2) 48 + 32 = 80 = 2 × 40  3) CO₂ gas is made and escapes  4) closed system, gas cannot escape, no atoms lost  5) mean 59.9 ÷ 4 = 14.975 ≈ 15.0; range 0.6, so ± 0.3  6) weigh both solutions and the flask, mix, weigh again: same total.');
}
near('HW mean', mean([15.2, 14.6, 15.0, 15.1]), 14.975); near('HW unc', r2(unc([15.2, 14.6, 15.0, 15.1])), 0.3);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.3_A_MassAndMr.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
