// build_4_3_B.js — AQA GCSE Chemistry (8462) 4.3 Quantitative chemistry, lesson 2 of 3 (all Higher tier):
// 4.3.2.1 Moles, 4.3.2.2 Amounts of substances in equations, 4.3.2.3 Using moles to balance equations,
// 4.3.2.4 Limiting reactants.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_3_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, Mr, helpers } = require('./chem_common');

const D = T.init(deck('4.3.2', 'Moles and reacting masses'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));
const NA = 6.02e23;
const mol = (m, f) => m / Mr(f);

// ======================= checks =======================
near('CO2 22 g', mol(22, 'CO2'), 0.5); near('CO2 particles', 0.5 * NA, 3.01e23);
near('MT H2O 9 g', mol(9, 'H2O'), 0.5); near('MT 2 mol NaOH', 2 * Mr('NaOH'), 80); near('MT 0.25 mol CO2 molecules', 0.25 * NA, 1.505e23);
near('YT O2 32 g', mol(32, 'O2'), 1); near('YT 0.1 mol CaCO3', 0.1 * Mr('CaCO3'), 10); near('YT Ca 4 g', mol(4, 'Ca'), 0.1); near('YT Ca atoms', 0.1 * NA, 6.02e22);
// reacting masses
balanced('Mg+O2', [[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]);
near('Mg 6 g mol', mol(6, 'Mg'), 0.25); near('MgO mass', 0.25 * Mr('MgO'), 10);
balanced('CaCO3', [[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']]);
near('MT CaCO3 25 g', mol(25, 'CaCO3'), 0.25); near('MT CaO', 0.25 * Mr('CaO'), 14);
balanced('Na+Cl2', [[2, 'Na'], [1, 'Cl2']], [[2, 'NaCl']]);
near('YT Na 4.6', mol(4.6, 'Na'), 0.2); near('YT NaCl', 0.2 * Mr('NaCl'), 11.7);
balanced('2H2O2', [[2, 'H2O2']], [[2, 'H2O'], [1, 'O2']]);
near('YT2 H2O2 6.8', mol(6.8, 'H2O2'), 0.2); near('YT2 O2', 0.1 * Mr('O2'), 3.2);
near('MT2 Mg 1.2 -> MgO', mol(1.2, 'Mg') * Mr('MgO'), 2.0);
// balancing from masses
near('bal Mg', mol(4.8, 'Mg'), 0.2); near('bal O2', mol(3.2, 'O2'), 0.1); near('bal MgO', mol(8.0, 'MgO'), 0.2);
near('bal CH4', mol(0.8, 'CH4'), 0.05); near('bal O2b', mol(3.2, 'O2'), 0.1); near('bal CO2', mol(2.2, 'CO2'), 0.05); near('bal H2O', mol(1.8, 'H2O'), 0.1);
balanced('CH4', [[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']]);
near('try Fe', mol(5.6, 'Fe'), 0.1); near('try Cl2', mol(10.65, 'Cl2'), 0.15); near('try FeCl3', mol(16.25, 'FeCl3'), 0.1);
balanced('Fe+Cl2', [[2, 'Fe'], [3, 'Cl2']], [[2, 'FeCl3']]);
// limiting reactants
balanced('Mg+HCl', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
near('lim Mg', mol(2.4, 'Mg'), 0.1); near('lim HCl', mol(5.475, 'HCl'), 0.15); near('lim H2 mol', 0.15 / 2, 0.075); near('lim H2 mass', 0.075 * Mr('H2'), 0.15);
balanced('H2+O2', [[2, 'H2'], [1, 'O2']], [[2, 'H2O']]);
near('lim2 H2', mol(4, 'H2'), 2); near('lim2 O2', mol(16, 'O2'), 0.5); near('lim2 H2O', 1 * Mr('H2O'), 18);
// exam
balanced('Fe2O3+CO', [[1, 'Fe2O3'], [3, 'CO']], [[2, 'Fe'], [3, 'CO2']]);
near('exam Fe2O3', mol(80, 'Fe2O3'), 0.5); near('exam Fe', 1 * Mr('Fe'), 56); near('exam CO needed', 0.5 * 3 * Mr('CO'), 42);
near('exam lim CO mol', mol(28, 'CO'), 1); near('exam lim Fe', 1 * 2 / 3 * 56, 37.333333);
// practice/HW
near('practice 0.5 mol Cl2', 0.5 * Mr('Cl2'), 35.5); near('practice 1.2e24', 1.204e24 / NA, 2); near('practice C 2.4 kg', mol(2400, 'C'), 200);
near('HW Al', mol(5.4, 'Al'), 0.2); near('HW Al2O3', 0.1 * Mr('Al2O3'), 10.2);
balanced('HW Al+O2', [[4, 'Al'], [3, 'O2']], [[2, 'Al2O3']]);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'The mole and Avogadro’s constant, reacting masses, balancing equations from masses, and limiting reactants (Higher tier)',
  bullets: ['Part 1: moles and Avogadro’s constant (4.3.2.1)', 'Part 2: reacting masses (4.3.2.2)', 'Part 3: balancing equations from masses (4.3.2.3)', 'Part 4: limiting reactants (4.3.2.4)'],
  notes: 'AQA 8462 GCSE Chemistry 4.3, lesson 2 of 3. All of 4.3.2 is Higher tier only. Students need Mᵣ (lesson 1) and standard form. Every number on these slides is checked in the build script. About two hours.',
});

D.objectives({
  tag: 'HT • 4.3.2',
  items: [
    'Use **moles = mass ÷ Mᵣ** and **Avogadro’s constant**.',
    'Calculate **reacting masses** from a balanced equation.',
    '**Balance an equation** from the masses of reactants and products.',
    'Identify the **limiting reactant** and calculate the mass of product.',
  ],
  keywords: ['mole', 'Avogadro constant', 'molar ratio', 'excess', 'limiting reactant'],
  notes: 'Share the objectives. The four-step reacting-mass method is the backbone of the lesson.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Find Mᵣ of CO₂.', 'Find Mᵣ of MgO.', 'Write 602 000 in standard form.', 'Balance: H₂ + O₂ → H₂O'],
  answers: ['44', '40', '6.02 × 10⁵', '2H₂ + O₂ → 2H₂O'],
  notes: 'Mᵣ from lesson 1, plus standard form for Avogadro’s constant.',
});

D.vocab({
  title: 'Key words', tag: 'HT • 4.3.2',
  items: [
    { term: 'Mole (mol)', def: 'The unit for **amount of substance**. One mole has a mass in grams equal to its **Aᵣ or Mᵣ**.' },
    { term: 'Avogadro constant', def: '**6.02 × 10²³** particles (atoms, molecules or ions) in one mole of any substance.' },
    { term: 'Excess', def: 'More than enough of a reactant: some is **left over** at the end.' },
    { term: 'Limiting reactant', def: 'The reactant that is **used up first**. It limits how much product can form.' },
  ],
  notes: 'Spec 4.3.2.1: "Chemical amounts are measured in moles. The symbol for the unit mole is mol."',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the mole', HT);
  // formula triangle
  const tx = MX + 1.2, ty = 1.7, tw = 3.6, th = 3.1;
  s.addShape(D.SH.triangle, { x: tx, y: ty, w: tw, h: th, fill: { color: C.soft }, line: { color: C.maroon, width: 2.5 } });
  seg(s, tx + tw * 0.2, ty + th * 0.58, tx + tw * 0.8, ty + th * 0.58, C.maroon, 2.5);
  seg(s, tx + tw / 2, ty + th * 0.58, tx + tw / 2, ty + th, C.maroon, 2.5);
  txt(s, 'mass (g)', tx + tw / 2 - 1.0, ty + th * 0.3, 2.0, 0.45, { size: 20, bold: true, align: 'center' });
  txt(s, 'moles', tx + tw * 0.13, ty + th * 0.68, 1.6, 0.45, { size: 20, bold: true, align: 'center' });
  txt(s, 'Mᵣ', tx + tw * 0.5, ty + th * 0.68, 1.4, 0.45, { size: 20, bold: true, align: 'center' });
  txt(s, 'moles = mass ÷ Mᵣ      mass = moles × Mᵣ', MX, 5.0, 6.4, 0.45, { size: 18, bold: true, color: C.maroon, align: 'center' });
  const bx = MX + 6.8, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.35, 'What is a mole?', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['1 mole of a substance has a mass in grams equal to its **Mᵣ**: 1 mol CO₂ = 44 g.', 'It always contains **6.02 × 10²³** particles.'], 17, 0.12);
  rect(s, bx, 3.95, bw, 2.9, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', bx + 0.25, 4.05, bw - 0.5, 0.4, { size: 18, bold: true, color: C.orange });
  txt(s, 'How many moles in 22 g of CO₂?', bx + 0.25, 4.5, bw - 0.5, 0.4, { size: 17 });
  txt(s, 'Mᵣ = 44.  moles = 22 ÷ 44 = **0.5 mol**', bx + 0.25, 4.95, bw - 0.5, 0.45, { size: 17 });
  txt(s, 'molecules = 0.5 × 6.02 × 10²³ = **3.01 × 10²³**', bx + 0.25, 5.45, bw - 0.5, 0.45, { size: 17 });
  note(s, MX, 5.75, 6.4, 1.1, 'Cover the one you want: the other two show how to work it out.', { size: 16, fill: C.greyLight, line: C.line });
  notes(s, 'Spec 4.3.2.1 (HT): "One mole of a substance contains the same number of the stated particles, atoms, molecules or ions as one mole of any other substance. The number of atoms, molecules or ions in a mole of a given substance is the Avogadro constant. The value of the Avogadro constant is 6.02 x 10²³ per mole. The mass of one mole of a substance in grams is numerically equal to its relative formula mass." Students should be able to use the relative formula mass of a substance to calculate the number of moles in a given mass of that substance and vice versa.');
}

D.myTurnYourTurn({
  title: 'Moles, mass and particles', tag: 'HT • Maths skill', stepSize: 19, labelW: 2.9, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Calculate:',
    steps: [
      { label: 'moles in 9 g of H₂O', text: '9 ÷ 18 = **0.5 mol**' },
      { label: 'mass of 2 mol NaOH', text: '2 × 40 = **80 g**' },
      { label: 'molecules in 0.25 mol CO₂', text: '**1.505 × 10²³**' },
    ],
  },
  yours: {
    q: 'Calculate:',
    steps: [
      { label: 'moles in 32 g of O₂', text: '32 ÷ 32 = **1 mol**' },
      { label: 'mass of 0.1 mol CaCO₃', text: '0.1 × 100 = **10 g**' },
      { label: 'atoms in 4.0 g of Ca', text: '**6.02 × 10²²**' },
    ],
  },
  notes: 'Remember O₂ has Mᵣ 32, not 16. Ca: 4.0 ÷ 40 = 0.1 mol; 0.1 × 6.02 × 10²³ = 6.02 × 10²². All checked in the build script.',
});

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'Which contains the most molecules?',
  options: ['1 mol of H₂O', '0.5 mol of CO₂', '18 g of O₂', '0.25 mol of N₂'],
  correct: 0,
  notes: 'Answer A: 1 mol = 6.02 × 10²³ molecules, the most moles. B is 0.5 mol. C: 18 ÷ 32 = 0.5625 mol (a common error is to think 18 g is 1 mol because water is 18). D is 0.25 mol.',
});
near('hinge 18 g O2', mol(18, 'O2'), 0.5625);

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: reacting masses', HT);
  headCard(s, MX, 1.4, 5.1, 5.45, 'Four steps', C.maroon, C.soft);
  const st = [['1', 'Moles of the substance you know: mass ÷ Mᵣ'], ['2', 'Use the **ratio** from the balanced equation'], ['3', 'Moles of the substance you want'], ['4', 'Mass = moles × Mᵣ']];
  st.forEach(([n, t], i) => { const y = 2.2 + i * 1.12; circle(s, MX + 0.55, y + 0.25, 0.55, C.accent); txt(s, n, MX + 0.28, y - 0.02, 0.55, 0.55, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' }); txt(s, t, MX + 1.0, y, 3.9, 0.9, { size: 18 }); });
  const ex = MX + 5.5, ew = W - MX - ex;
  rect(s, ex, 1.4, ew, 5.45, C.orangeSoft, 'F3D9B5');
  txt(s, 'What mass of MgO forms from 6 g of Mg?', ex + 0.3, 1.5, ew - 0.6, 0.45, { size: 19, bold: true, color: C.orange });
  txt(s, '2Mg + O₂ → 2MgO', ex + 0.3, 2.05, ew - 0.6, 0.45, { size: 20, bold: true });
  const L = [['1', 'moles of Mg = 6 ÷ 24 = **0.25 mol**'], ['2', 'ratio Mg : MgO = 2 : 2 = 1 : 1'], ['3', 'moles of MgO = **0.25 mol**'], ['4', 'mass = 0.25 × 40 = **10 g**']];
  L.forEach(([n, t], i) => { const y = 2.75 + i * 0.85; txt(s, 'Step ' + n, ex + 0.3, y, 1.2, 0.5, { size: 17, bold: true, color: C.maroon }); txt(s, t, ex + 1.5, y, ew - 1.8, 0.6, { size: 18 }); });
  txt(s, 'Check: 6 g Mg + 4 g O₂ = 10 g MgO (mass is conserved).', ex + 0.3, 6.25, ew - 0.6, 0.5, { size: 16, italic: true, color: C.grey });
  notes(s, 'Spec 4.3.2.2 (HT): "The masses of reactants and products can be calculated from balanced symbol equations. Chemical equations can be interpreted in terms of moles. For example: Mg + 2HCl → MgCl2 + H2 shows that one mole of magnesium reacts with two moles of hydrochloric acid to produce one mole of magnesium chloride and one mole of hydrogen gas. Students should be able to calculate the masses of substances shown in a balanced symbol equation; calculate the masses of reactants and products from the balanced symbol equation and the mass of a given reactant or product." O₂ reacting = 0.125 mol × 32 = 4 g.');
}
near('check O2', 0.125 * 32, 4);

D.myTurnYourTurn({
  title: 'Reacting masses', tag: 'HT • Maths skill', stepSize: 17, labelW: 0.9, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'CaCO₃ → CaO + CO₂.  Mass of CaO from 25 g of CaCO₃?',
    steps: [
      { label: '1', text: '25 ÷ 100 = 0.25 mol' },
      { label: '2–3', text: '1 : 1, so 0.25 mol CaO' },
      { label: '4', text: '0.25 × 56 = **14 g**' },
    ],
  },
  yours: {
    q: '2Na + Cl₂ → 2NaCl.  Mass of NaCl from 4.6 g of Na?',
    steps: [
      { label: '1', text: '4.6 ÷ 23 = 0.2 mol' },
      { label: '2–3', text: '2 : 2, so 0.2 mol NaCl' },
      { label: '4', text: '0.2 × 58.5 = **11.7 g**' },
    ],
  },
  notes: 'Extension: 2H₂O₂ → 2H₂O + O₂. Mass of O₂ from 6.8 g of H₂O₂? 6.8 ÷ 34 = 0.2 mol; ratio 2 : 1 gives 0.1 mol O₂; 0.1 × 32 = 3.2 g. All checked in the build script.',
});

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: '2Mg + O₂ → 2MgO. What mass of MgO forms from 1.2 g of Mg?',
  options: ['2.0 g', '1.2 g', '4.0 g', '1.0 g'],
  correct: 0,
  notes: 'Answer A: 1.2 ÷ 24 = 0.05 mol; 1 : 1; 0.05 × 40 = 2.0 g. B forgets that oxygen is added. C doubles because of the 2 in front. D uses 0.05 × 20.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: balancing equations from masses', HT);
  headCard(s, MX, 1.4, 4.6, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 4.2, ['Find the **moles** of each substance: mass ÷ Mᵣ.', 'Divide every value by the **smallest**.', 'These whole numbers are the **coefficients**.'], 18, 0.2);
  const ex = MX + 5.0, ew = W - MX - ex;
  rect(s, ex, 1.4, ew, 5.45, C.orangeSoft, 'F3D9B5');
  txt(s, '0.8 g CH₄ reacts with 3.2 g O₂ to make 2.2 g CO₂ and 1.8 g H₂O.', ex + 0.3, 1.5, ew - 0.6, 0.8, { size: 18, bold: true, color: C.orange });
  const tw = ew - 0.6;
  table(s, ex + 0.3, 2.4, [tw * 0.2, tw * 0.52, tw * 0.28], ['', 'moles', '÷ 0.05'], [
    ['CH₄', '0.8 ÷ 16 = 0.05', '1', ''], ['O₂', '3.2 ÷ 32 = 0.1', '2', ''], ['CO₂', '2.2 ÷ 44 = 0.05', '1', ''], ['H₂O', '1.8 ÷ 18 = 0.1', '2', ''],
  ].map(r => r.slice(0, 3)), { rh: 0.55, size: 16, align: ['left', 'left', 'center'] });
  txt(s, 'CH₄ + 2O₂ → CO₂ + 2H₂O', ex + 0.3, 5.45, ew - 0.6, 0.5, { size: 22, bold: true, color: C.green });
  txt(s, 'Try: 5.6 g Fe + 10.65 g Cl₂ → 16.25 g FeCl₃', ex + 0.3, 6.1, ew - 0.6, 0.5, { size: 16, italic: true });
  notes(s, 'Spec 4.3.2.3 (HT): "The balancing numbers in a symbol equation can be calculated from the masses of reactants and products by converting the masses in grams to amounts in moles and converting the numbers of moles to simple whole number ratios. Students should be able to balance an equation given the masses of reactants and products." Try it: Fe 0.1 mol, Cl₂ 0.15 mol, FeCl₃ 0.1 mol; ÷ 0.05 gives 2 : 3 : 2, so 2Fe + 3Cl₂ → 2FeCl₃. All checked in the build script.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: limiting reactants', HT);
  // sandwich analogy: 5 slices of bread, 4 cheese
  txt(s, 'Analogy: a cheese sandwich needs 2 bread + 1 cheese', MX, 1.35, 6.3, 0.4, { size: 17, bold: true, color: C.maroon });
  for (let i = 0; i < 7; i++) rect(s, MX + 0.2 + i * 0.75, 1.95, 0.6, 0.6, 'F2D7A0', 'B58B3E', { lw: 1.25 });
  for (let i = 0; i < 5; i++) rect(s, MX + 0.2 + i * 0.75, 2.75, 0.6, 0.3, 'F7DC6F', 'C9A227', { lw: 1.25 });
  txt(s, '7 bread, 5 cheese → only **3 sandwiches**. Bread runs out first: it is **limiting**. 2 cheese are in **excess**.', MX, 3.25, 6.2, 0.95, { size: 16 });
  const bx = MX + 6.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.8, 'In reactions', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Often one reactant is added in **excess** so the other is completely used.', 'The reactant used up is the **limiting reactant**.', 'The **amount of product** depends on the limiting reactant.'], 16, 0.12);
  rect(s, MX, 4.45, W - 2 * MX, 2.4, C.orangeSoft, 'F3D9B5');
  txt(s, 'Mg + 2HCl → MgCl₂ + H₂.   2.4 g Mg and 0.15 mol HCl. Which is limiting? Mass of H₂?', MX + 0.3, 4.55, W - 2 * MX - 0.6, 0.45, { size: 18, bold: true, color: C.orange });
  const L = ['Mg: 2.4 ÷ 24 = **0.1 mol**. It needs 2 × 0.1 = **0.2 mol HCl**, but only 0.15 mol is there.', 'So **HCl is limiting** (Mg is in excess).', 'H₂ = 0.15 ÷ 2 = 0.075 mol;  mass = 0.075 × 2 = **0.15 g**'];
  L.forEach((t, i) => txt(s, t, MX + 0.3, 5.1 + i * 0.55, W - 2 * MX - 0.6, 0.5, { size: 17 }));
  notes(s, 'Spec 4.3.2.4 (HT): "In a chemical reaction involving two reactants, it is common to use an excess of one of the reactants to ensure that all of the other reactant is used. The reactant that is completely used up is called the limiting reactant because it limits the amount of products. Students should be able to explain the effect of a limiting quantity of a reactant on the amount of products it is possible to obtain in terms of amounts in moles or masses in grams." All values checked in the build script.');
}

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: '2H₂ + O₂ → 2H₂O.  4 g of H₂ and 16 g of O₂ react. Which is limiting, and what mass of water forms?',
  options: ['O₂; 18 g', 'H₂; 36 g', 'O₂; 9 g', 'H₂; 18 g'],
  correct: 0,
  notes: 'Answer A: H₂ = 4 ÷ 2 = 2 mol, needs 1 mol O₂; O₂ = 16 ÷ 32 = 0.5 mol, so O₂ is limiting. 0.5 mol O₂ → 1 mol H₂O = 18 g. B uses H₂ as limiting (2 mol H₂O = 36 g). C halves again. D mixes the two.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['State the value of the Avogadro constant.', '6.02 × 10²³ per mole'], ['What is the mass of 0.5 mol of Cl₂?', '35.5 g'], ['How many moles in 1.204 × 10²⁴ molecules?', '2 mol'], ['How many moles of C in 2.4 kg of carbon?', '200 mol'],
    ['4Al + 3O₂ → 2Al₂O₃. Mass of Al₂O₃ from 5.4 g Al?', '10.2 g'], ['What is a limiting reactant?', 'The reactant used up first; limits the product'],
    ['2.4 g Mg reacts with 1.6 g O₂ to make 4.0 g MgO. Find the ratio.', '0.1 : 0.05 : 0.1 = 2 : 1 : 2'], ['Why is one reactant often added in excess?', 'So all the other reactant is used up'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'HT • Questions 1–4'], ['Practice: apply', 4, 'HT • Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 6.02 × 10²³ per mole  2) 0.5 × 71 = 35.5 g  3) 1.204 × 10²⁴ ÷ 6.02 × 10²³ = 2  4) 2400 g ÷ 12 = 200 mol (convert kg to g first)  5) 5.4 ÷ 27 = 0.2 mol Al; ratio 4 : 2 gives 0.1 mol Al₂O₃; 0.1 × 102 = 10.2 g  6) the reactant that is completely used up; it limits the amount of product  7) Mg 0.1, O₂ 0.05, MgO 0.1; ÷ 0.05 gives 2 : 1 : 2  8) to make sure all of the other (often more expensive) reactant reacts.');
  }
}
near('practice Mg ratio', mol(2.4, 'Mg') / mol(1.6, 'O2'), 2); near('practice MgO 4.0', mol(4.0, 'MgO'), 0.1);

D.examQuestion({
  title: 'Exam question', tag: 'HT • AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'Iron is extracted in a blast furnace:   Fe₂O₃ + 3CO → 2Fe + 3CO₂',
  parts: [
    { l: 'a', q: 'Calculate the number of moles in 80 g of iron(III) oxide, Fe₂O₃.', m: 2, lines: 0 },
    { l: 'b', q: 'Calculate the maximum mass of iron that 80 g of Fe₂O₃ can make.', m: 2, lines: 1 },
    { l: 'c', q: 'Calculate the mass of carbon monoxide needed to react with 80 g of Fe₂O₃.', m: 2, lines: 1 },
    { l: 'd', q: '80 g of Fe₂O₃ is mixed with only 28 g of CO. Which reactant is limiting? Calculate the mass of iron formed.', m: 4, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'Mᵣ = 160; 80 ÷ 160 = 0.5 mol', '2', ''],
    ['(b)', '0.5 × 2 = 1 mol Fe; 1 × 56 = 56 g', '2', ''],
    ['(c)', '0.5 × 3 = 1.5 mol CO; 1.5 × 28 = 42 g', '2', ''],
    ['(d)', 'CO = 28 ÷ 28 = 1 mol; 1.5 mol needed so CO limiting; Fe = 1 × 2/3 = 0.667 mol; × 56 = 37.3 g', '4', 'ecf allowed'],
  ],
  notes: 'Mark scheme on the next slide. All values checked in the build script.',
});

{
  const s = frame('Exit ticket', { tag: 'HT • On your own • 5 minutes' });
  D.qCards(s, ['Moles in 10 g of CaCO₃?', 'Mass of 3 mol of H₂O?', 'Molecules in 2 mol of N₂?', 'What does "in excess" mean?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) 0.1 mol  2) 54 g  3) 1.204 × 10²⁴  4) more than enough; some is left over. Revisit the objectives.');
}
near('exit CaCO3', mol(10, 'CaCO3'), 0.1); near('exit H2O', 3 * Mr('H2O'), 54); near('exit N2', 2 * NA, 1.204e24);

{
  const s = frame('Homework', { tag: 'HT • About 30 minutes' });
  D.qCards(s, [
    'Find the moles in: 88 g CO₂; 5.85 g NaCl; 0.98 g H₂SO₄.',
    'How many atoms are in 0.2 mol of Fe? In 12 g of C?',
    '4Al + 3O₂ → 2Al₂O₃. What mass of O₂ reacts with 5.4 g of Al?',
    'Balance from masses: 0.46 g Na + 0.71 g Cl₂ → 1.17 g NaCl.',
    'N₂ + 3H₂ → 2NH₃. 28 g N₂ + 3 g H₂. Which is limiting? Mass of NH₃?',
    'Explain, using moles, why adding more magnesium to acid does not always make more hydrogen.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) 2 mol; 0.1 mol; 0.01 mol  2) 1.204 × 10²³; 6.02 × 10²³  3) 0.2 mol Al → 0.15 mol O₂ → 4.8 g  4) Na 0.02, Cl₂ 0.01, NaCl 0.02 → 2Na + Cl₂ → 2NaCl  5) N₂ 1 mol needs 3 mol H₂; H₂ 1.5 mol, so H₂ limiting; NH₃ = 1 mol × 17 = 17 g  6) once the acid is used up it is the limiting reactant; extra Mg is in excess.');
}
near('HW CO2', mol(88, 'CO2'), 2); near('HW NaCl', mol(5.85, 'NaCl'), 0.1); near('HW H2SO4', mol(0.98, 'H2SO4'), 0.01);
near('HW Fe atoms', 0.2 * NA, 1.204e23); near('HW O2', 0.2 * 3 / 4 * 32, 4.8);
near('HW Na', mol(0.46, 'Na'), 0.02); near('HW Cl2', mol(0.71, 'Cl2'), 0.01); near('HW NaCl', mol(1.17, 'NaCl'), 0.02);
balanced('HW NH3', [[1, 'N2'], [3, 'H2']], [[2, 'NH3']]); near('HW H2 mol', mol(3, 'H2'), 1.5); near('HW NH3 mass', 1.5 * 2 / 3 * Mr('NH3'), 17);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.3_B_MolesReactingMasses.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
