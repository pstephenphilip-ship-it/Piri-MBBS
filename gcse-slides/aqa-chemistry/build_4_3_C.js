// build_4_3_C.js — AQA GCSE Chemistry (8462) 4.3 Quantitative chemistry, lesson 3 of 3:
// 4.3.2.5 Concentration of solutions, 4.3.3.1 Percentage yield, 4.3.3.2 Atom economy (chemistry only),
// 4.3.4 Using concentrations of solutions in mol/dm³ (HT, chemistry only), 4.3.5 Use of amount of substance
// in relation to volumes of gases (HT, chemistry only).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_3_C.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, Mr, helpers } = require('./chem_common');

const D = T.init(deck('4.3.2–4.3.5', 'Concentration, yield and gases'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));
const r1 = x => Math.round(x * 10) / 10;
const mol = (m, f) => m / Mr(f);

// ======================= checks =======================
// concentration g/dm³
near('conc ex', 25 / 0.5, 50);
near('MT conc', 10 / 0.25, 40); near('MT mass', 30 * 0.2, 6); near('MT conc2', 4 / 2, 2);
near('YT conc', 15 / 0.75, 20); near('YT mass', 80 * 0.05, 4); near('YT conc2', 6 / 0.3, 20);
// percentage yield
balanced('CaCO3', [[1, 'CaCO3']], [[1, 'CaO'], [1, 'CO2']]);
near('yield theo', 10 / 100 * 56, 5.6); near('yield %', 4.2 / 5.6 * 100, 75);
near('MT yield', 8.5 / 10 * 100, 85); near('YT yield', 9.36 / 11.7 * 100, 80); near('YT theo NaCl', mol(4.6, 'Na') * Mr('NaCl'), 11.7);
// atom economy
const ae = (want, prods) => want / prods.reduce((t, [k, f]) => t + k * Mr(f), 0) * 100;
near('AE CaO', ae(Mr('CaO'), [[1, 'CaO'], [1, 'CO2']]), 56);
balanced('steam reform', [[1, 'CH4'], [1, 'H2O']], [[1, 'CO'], [3, 'H2']]);
near('AE H2', r1(ae(3 * Mr('H2'), [[1, 'CO'], [3, 'H2']])), 17.6);
balanced('Haber', [[1, 'N2'], [3, 'H2']], [[2, 'NH3']]); near('AE NH3', ae(2 * Mr('NH3'), [[2, 'NH3']]), 100);
balanced('ferment', [[1, 'C6H12O6']], [[2, 'C2H5OH'], [2, 'CO2']]); near('AE ethanol ferm', r1(ae(2 * Mr('C2H5OH'), [[2, 'C2H5OH'], [2, 'CO2']])), 51.1);
balanced('hydration', [[1, 'C2H4'], [1, 'H2O']], [[1, 'C2H5OH']]); near('AE hydration', ae(Mr('C2H5OH'), [[1, 'C2H5OH']]), 100);
balanced('Fe2O3+C', [[2, 'Fe2O3'], [3, 'C']], [[4, 'Fe'], [3, 'CO2']]); near('YT AE Fe', r1(ae(4 * Mr('Fe'), [[4, 'Fe'], [3, 'CO2']])), 62.9);
balanced('Zn+HCl', [[1, 'Zn'], [2, 'HCl']], [[1, 'ZnCl2'], [1, 'H2']]); near('MT AE H2 from Zn', r1(ae(Mr('H2'), [[1, 'ZnCl2'], [1, 'H2']])), 1.4);
// titration (HT)
balanced('NaOH+HCl', [[1, 'NaOH'], [1, 'HCl']], [[1, 'NaCl'], [1, 'H2O']]);
near('tit mol HCl', 0.100 * 0.0200, 0.002); near('tit conc NaOH', 0.002 / 0.025, 0.08); near('tit g/dm3', 0.08 * Mr('NaOH'), 3.2);
near('MT tit', 0.200 * 0.0225 / 0.025, 0.18);
balanced('H2SO4+NaOH', [[1, 'H2SO4'], [2, 'NaOH']], [[1, 'Na2SO4'], [2, 'H2O']]);
near('YT tit NaOH', 0.100 * 0.030, 0.003); near('YT tit H2SO4', 0.003 / 2 / 0.025, 0.06);
near('mol/dm3 to g', 0.5 * Mr('NaCl'), 29.25);
// gas volumes (HT)
near('gas 0.5 mol', 0.5 * 24, 12); near('gas CO2 4.4 g', mol(4.4, 'CO2') * 24, 2.4);
near('MT gas O2 8 g', mol(8, 'O2') * 24, 6); near('MT gas 48 cm3', 48 / 24000, 0.002);
near('YT gas CO2 1.1', mol(1.1, 'CO2') * 24, 0.6); near('YT gas 3.6 dm3', 3.6 / 24, 0.15);
balanced('2H2+O2', [[2, 'H2'], [1, 'O2']], [[2, 'H2O']]); near('vol ratio', 50 / 2, 25);
// exam
balanced('Mg+HCl', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
near('exam Mg', mol(0.48, 'Mg'), 0.02); near('exam H2 vol', 0.02 * 24000, 480); near('exam yield', 360 / 480 * 100, 75);
near('exam AE MgCl2', r1(ae(Mr('MgCl2'), [[1, 'MgCl2'], [1, 'H2']])), 97.9);
near('exam acid conc', 0.04 / 0.05, 0.8);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Concentration in g/dm³, percentage yield, atom economy, titration calculations in mol/dm³ and volumes of gases',
  bullets: ['Part 1: concentration of solutions (4.3.2.5)', 'Part 2: percentage yield and atom economy (4.3.3)', 'Part 3: concentrations in mol/dm³ and titrations (4.3.4, HT)', 'Part 4: volumes of gases (4.3.5, HT)'],
  notes: 'AQA 8462 GCSE Chemistry 4.3, lesson 3 of 3. Atom economy, titration calculations and gas volumes are separate science only; Parts 3 and 4 are Higher tier. The titration practical itself (RP2) is taught with acids in 4.4. About two hours.',
});

D.objectives({
  tag: '4.3.2–4.3.5',
  items: [
    'Calculate **concentration** in **g/dm³** and convert **cm³ to dm³**.',
    'Calculate **percentage yield** and **atom economy**, and explain why they matter.',
    'Use **titration** results to find a concentration in **mol/dm³** (HT).',
    'Use **24 dm³ per mole** to find **volumes of gases** (HT).',
  ],
  keywords: ['concentration', 'dm³', 'percentage yield', 'atom economy', 'titration', 'molar volume'],
  notes: 'Share the objectives. 1 dm³ = 1000 cm³ is the most important conversion today.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Moles in 4.0 g of NaOH?', 'Mass of 0.2 mol of CO₂?', 'Write 250 cm³ in dm³.', 'What is 4.2 as a percentage of 5.6?'],
  answers: ['0.1 mol', '8.8 g', '0.25 dm³', '75%'],
  notes: 'Moles from lesson 2, plus the volume conversion and percentage skill used today.',
});
near('donow NaOH', mol(4, 'NaOH'), 0.1); near('donow CO2', 0.2 * 44, 8.8);

D.vocab({
  title: 'Key words', tag: '4.3.2–4.3.5',
  items: [
    { term: 'Concentration', def: 'The amount of solute in a given volume of solution: **g/dm³** or **mol/dm³**.' },
    { term: 'Percentage yield', def: 'Actual mass of product ÷ **maximum theoretical** mass × 100.' },
    { term: 'Atom economy', def: 'Mᵣ of the **desired product** ÷ total Mᵣ of **all products** × 100. How much of the reactants ends up as useful product.' },
    { term: 'Molar volume', def: 'One mole of **any gas** takes up **24 dm³** at room temperature and pressure (HT).' },
  ],
  notes: 'Spec 4.3.2.5, 4.3.3.1, 4.3.3.2 and 4.3.5 definitions.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: concentration in g/dm³', { tag: '4.3.2.5' });
  rect(s, MX, 1.4, 6.2, 1.25, C.soft, C.line);
  D.math(s, MX + 0.3, 2.02, ['concentration (g/dm³) = ', { n: 'mass of solute (g)', d: 'volume (dm³)' }], { size: 20, bold: true });
  rect(s, MX, 2.85, 6.2, 1.2, C.greyLight, C.line);
  txt(s, '1 dm³ = 1000 cm³\ncm³ → dm³: **divide by 1000**', MX + 0.3, 2.85, 5.8, 1.2, { size: 19, valign: 'middle' });
  const bx = MX + 6.6, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 2.65, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', bx + 0.25, 1.5, bw - 0.5, 0.4, { size: 18, bold: true, color: C.orange });
  txt(s, '25 g of salt is dissolved to make 500 cm³ of solution.', bx + 0.25, 1.95, bw - 0.5, 0.7, { size: 17 });
  txt(s, '500 cm³ = 0.5 dm³', bx + 0.25, 2.7, bw - 0.5, 0.4, { size: 17 });
  txt(s, 'concentration = 25 ÷ 0.5 = **50 g/dm³**', bx + 0.25, 3.15, bw - 0.5, 0.5, { size: 18 });
  headCard(s, MX, 4.3, W - 2 * MX, 2.55, 'Explaining concentration', C.maroon, C.soft);
  bullets(s, MX + 0.2, 5.0, W - 2 * MX - 0.4, ['**More solute** in the same volume: **higher** concentration.', '**Same solute** in a **bigger volume**: **lower** concentration.', 'Rearrange: **mass = concentration × volume**.'], 18, 0.12);
  notes(s, 'Spec 4.3.2.5: "Many chemical reactions take place in solutions. The concentration of a solution can be measured in mass per given volume of solution, eg grams per dm³ (g/dm³). Students should be able to calculate the mass of solute in a given volume of solution of known concentration in terms of mass per given volume of solution; (HT only) explain how the mass of a solute and the volume of a solution is related to the concentration of the solution." Checked: 25 ÷ 0.5 = 50.');
}

D.myTurnYourTurn({
  title: 'Concentration in g/dm³', tag: 'Maths skill', stepSize: 17, labelW: 2.7, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Calculate:',
    steps: [
      { label: '10 g in 250 cm³', text: '10 ÷ 0.25 = **40 g/dm³**' },
      { label: 'mass in 200 cm³ of 30 g/dm³', text: '30 × 0.2 = **6 g**' },
      { label: '4 g in 2 dm³', text: '4 ÷ 2 = **2 g/dm³**' },
    ],
  },
  yours: {
    q: 'Calculate:',
    steps: [
      { label: '15 g in 750 cm³', text: '15 ÷ 0.75 = **20 g/dm³**' },
      { label: 'mass in 50 cm³ of 80 g/dm³', text: '80 × 0.05 = **4 g**' },
      { label: '6 g in 300 cm³', text: '6 ÷ 0.3 = **20 g/dm³**' },
    ],
  },
  notes: 'Always convert cm³ to dm³ first. All checked in the build script.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: percentage yield', { tag: '4.3.3.1' });
  rect(s, MX, 1.4, W - 2 * MX, 1.2, C.soft, C.line);
  D.math(s, MX + 0.3, 2.0, ['% yield = ', { n: 'mass of product actually made', d: 'maximum theoretical mass of product' }, ' × 100'], { size: 20, bold: true });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.85, cw, 4.0, 'Why yield is less than 100%', C.maroon, C.soft);
  bullets(s, MX + 0.2, 3.55, cw - 0.4, ['The reaction may be **reversible** and not go to completion.', 'Some product is **lost** when it is separated (filtering, transferring).', 'Some reactants may react in **unexpected ways** (side reactions).'], 17, 0.14);
  const x2 = MX + cw + gap;
  rect(s, x2, 2.85, cw, 4.0, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', x2 + 0.25, 2.95, cw - 0.5, 0.4, { size: 18, bold: true, color: C.orange });
  txt(s, '10 g of CaCO₃ is heated. Only 4.2 g of CaO is collected.', x2 + 0.25, 3.4, cw - 0.5, 0.75, { size: 17 });
  txt(s, 'CaCO₃ → CaO + CO₂', x2 + 0.25, 4.15, cw - 0.5, 0.4, { size: 17, bold: true });
  txt(s, 'Maximum (HT: from moles): 10 ÷ 100 = 0.1 mol, so 0.1 × 56 = **5.6 g**', x2 + 0.25, 4.6, cw - 0.5, 0.75, { size: 17 });
  txt(s, '% yield = 4.2 ÷ 5.6 × 100 = **75%**', x2 + 0.25, 5.45, cw - 0.5, 0.5, { size: 19 });
  notes(s, 'Spec 4.3.3.1: "Even though no atoms are gained or lost in a chemical reaction, it is not always possible to obtain the calculated amount of a product because: the reaction may not go to completion because it is reversible; some of the product may be lost when it is separated from the reaction mixture; some of the reactants may react in ways different to the expected reaction... Students should be able to calculate the percentage yield of a product from the actual yield of a reaction; (HT only) calculate the theoretical mass of a product from a given mass of reactant and the balanced equation for the reaction."');
}

{
  const s = frame('Atom economy', { tag: '4.3.3.2' });
  rect(s, MX, 1.4, W - 2 * MX, 1.2, C.soft, C.line);
  D.math(s, MX + 0.3, 2.0, ['atom economy = ', { n: 'Mᵣ of desired product (× its number)', d: 'sum of Mᵣ of all products' }, ' × 100'], { size: 20, bold: true });
  const tw = W - 2 * MX;
  table(s, MX, 2.85, [tw * 0.42, tw * 0.38, tw * 0.2], ['Reaction (desired product in bold)', 'Working', 'Atom economy'], [
    ['CaCO₃ → **CaO** + CO₂', '56 ÷ (56 + 44) × 100', '56%'],
    ['C₆H₁₂O₆ → **2C₂H₅OH** + 2CO₂', '92 ÷ (92 + 88) × 100', '51.1%'],
    ['C₂H₄ + H₂O → **C₂H₅OH**', '46 ÷ 46 × 100', '100%'],
    ['CH₄ + H₂O → CO + **3H₂**', '6 ÷ (28 + 6) × 100', '17.6%'],
  ], { rh: 0.55, size: 17, boldFirst: false, align: ['left', 'left', 'center'] });
  note(s, MX, 5.8, tw, 1.05, 'A **high** atom economy means **less waste**: important for **sustainable** development and for profit. Choose a reaction pathway by its atom economy, **yield**, **rate**, **equilibrium** position and the **usefulness of by-products**.', { size: 16 });
  notes(s, 'Spec 4.3.3.2 (chemistry only): "The atom economy (atom utilisation) is a measure of the amount of starting materials that end up as useful products. It is important for sustainable development and for economic reasons to use reactions with high atom economy... (HT only) explain why a particular reaction pathway is chosen to produce a specified product given appropriate data such as atom economy (if not calculated), yield, rate, equilibrium position and usefulness of by-products." Making ethanol: hydration of ethene has 100% atom economy but uses crude oil; fermentation is 51.1% but uses a renewable resource. All values checked.');
}

D.myTurnYourTurn({
  title: 'Yield and atom economy', tag: 'Maths skill', stepSize: 17, labelW: 0.5, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: '(a) % yield: maximum 10 g, made 8.5 g\n(b) atom economy for H₂:\n      Zn + 2HCl → ZnCl₂ + H₂',
    steps: [
      { label: 'a', text: '8.5 ÷ 10 × 100 = **85%**' },
      { label: 'b', text: '2 ÷ (136 + 2) × 100 = **1.4%**' },
    ],
  },
  yours: {
    q: '(a) % yield: maximum 11.7 g, made 9.36 g\n(b) atom economy for Fe:\n      2Fe₂O₃ + 3C → 4Fe + 3CO₂',
    steps: [
      { label: 'a', text: '9.36 ÷ 11.7 × 100 = **80%**' },
      { label: 'b', text: '224 ÷ (224 + 132) × 100 = **62.9%**' },
    ],
  },
  notes: 'ZnCl₂: 65 + 71 = 136. Atom economy of hydrogen = 2 ÷ 138 × 100 = 1.45%, so 1.4% (1 d.p.). Iron: 4 × 56 = 224; 3 × 44 = 132; 224 ÷ 356 × 100 = 62.9%.',
});
near('ZnCl2', Mr('ZnCl2'), 136); near('MT AE exact', 2 / 138 * 100, 1.4492753);

D.hinge({
  title: 'Quick check',
  q: 'Which reaction has the highest atom economy?',
  options: ['One with only one product', 'One with a high percentage yield', 'One that is fast', 'One with a catalyst'],
  correct: 0,
  notes: 'Answer A: if there is only one product, all the atoms end up in it (100%). B: yield and atom economy are different things. C and D affect rate, not atom economy.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: concentration in mol/dm³', HT);
  rect(s, MX, 1.4, 6.2, 1.25, C.soft, C.line);
  D.math(s, MX + 0.3, 2.02, ['concentration (mol/dm³) = ', { n: 'moles', d: 'volume (dm³)' }], { size: 20, bold: true });
  rect(s, MX, 2.85, 6.2, 1.3, C.greyLight, C.line);
  txt(s, 'mol/dm³ → g/dm³: **multiply by Mᵣ**\ne.g. 0.5 mol/dm³ NaCl = 0.5 × 58.5 = **29.25 g/dm³**', MX + 0.3, 2.85, 5.8, 1.3, { size: 17, valign: 'middle' });
  const bx = MX + 6.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.75, 'Titration', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Find the **exact volume** of one solution that reacts with a known volume of another.', 'Use **concordant** titres (within 0.10 cm³) for the mean.', 'The method is RP2 in topic 4.4.'], 16, 0.1);
  rect(s, MX, 4.4, W - 2 * MX, 2.45, C.orangeSoft, 'F3D9B5');
  txt(s, '25.0 cm³ of NaOH is neutralised by 20.0 cm³ of 0.100 mol/dm³ HCl.  NaOH + HCl → NaCl + H₂O.  Find the concentration of NaOH.', MX + 0.3, 4.5, W - 2 * MX - 0.6, 0.8, { size: 17, bold: true, color: C.orange });
  const L = ['moles HCl = 0.100 × (20.0 ÷ 1000) = **0.00200 mol**', 'ratio 1 : 1, so moles NaOH = **0.00200 mol**', 'concentration NaOH = 0.00200 ÷ (25.0 ÷ 1000) = **0.0800 mol/dm³**   (= 0.08 × 40 = 3.2 g/dm³)'];
  L.forEach((t, i) => txt(s, t, MX + 0.3, 5.3 + i * 0.48, W - 2 * MX - 0.6, 0.45, { size: 17 }));
  notes(s, 'Spec 4.3.4 (HT, chemistry only): "The volumes of acid and alkali solutions that react with each other can be measured by titration using a suitable indicator. If the concentration of one of the reactants is known, the results of a titration can be used to find the concentration of the other reactant. Students should be able to: explain how the concentration of a solution in mol/dm³ is related to the mass of the solute and the volume of the solution; calculate the amount in moles of solute or the mass in grams of solute in a given volume of solution; calculate the concentration of a solution when it reacts completely with a known volume and concentration of a second solution."');
}

D.myTurnYourTurn({
  title: 'Titration calculations', tag: 'HT • Maths skill', stepSize: 16, labelW: 0.5, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: '25.0 cm³ KOH needs 22.5 cm³ of 0.200 mol/dm³ HCl (1 : 1). Find [KOH].',
    steps: [
      { label: '1', text: 'HCl: 0.200 × 0.0225 = 0.0045 mol' },
      { label: '2', text: 'KOH: 0.0045 mol (1 : 1)' },
      { label: '3', text: '0.0045 ÷ 0.025 = **0.18 mol/dm³**' },
    ],
  },
  yours: {
    q: '25.0 cm³ H₂SO₄ needs 30.0 cm³ of 0.100 mol/dm³ NaOH. H₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O. Find [H₂SO₄].',
    steps: [
      { label: '1', text: 'NaOH: 0.100 × 0.030 = 0.003 mol' },
      { label: '2', text: 'H₂SO₄: 0.003 ÷ 2 = 0.0015 mol' },
      { label: '3', text: '0.0015 ÷ 0.025 = **0.06 mol/dm³**' },
    ],
  },
  notes: 'Watch the ratio in "yours": 1 mol H₂SO₄ reacts with 2 mol NaOH. All values checked in the build script.',
});

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'How many moles of HCl are in 25.0 cm³ of 0.20 mol/dm³ acid?',
  options: ['0.0050 mol', '5.0 mol', '0.008 mol', '0.050 mol'],
  correct: 0,
  notes: 'Answer A: 0.20 × 0.025 = 0.0050. B forgot to convert cm³ to dm³. C divided 0.20 by 25. D is out by a factor of 10.',
});
near('hinge tit', 0.2 * 0.025, 0.005);

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: volumes of gases', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'One mole of **any gas** occupies **24 dm³** (24 000 cm³) at room temperature and pressure (RTP: 20 °C, 1 atm).', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 18, valign: 'middle' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.65, cw, 2.1, 'Formulae', C.maroon, C.soft);
  txt(s, 'volume (dm³) = moles × 24\nmoles = volume (dm³) ÷ 24', MX + 0.2, 3.3, cw - 0.4, 1.3, { size: 19, bold: true });
  const x2 = MX + cw + gap;
  rect(s, x2, 2.65, cw, 2.1, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', x2 + 0.25, 2.75, cw - 0.5, 0.4, { size: 18, bold: true, color: C.orange });
  txt(s, 'Volume of 4.4 g of CO₂ at RTP?', x2 + 0.25, 3.2, cw - 0.5, 0.4, { size: 17 });
  txt(s, '4.4 ÷ 44 = 0.1 mol', x2 + 0.25, 3.65, cw - 0.5, 0.4, { size: 17 });
  txt(s, '0.1 × 24 = **2.4 dm³**', x2 + 0.25, 4.1, cw - 0.5, 0.4, { size: 17 });
  headCard(s, MX, 5.0, W - 2 * MX, 1.85, 'Reacting volumes of gases', C.green, C.greenSoft);
  txt(s, 'Equal volumes of gases contain equal numbers of moles, so volumes are in the **same ratio as the equation**. 2H₂ + O₂ → 2H₂O: **50 cm³** of H₂ reacts with **25 cm³** of O₂.', MX + 0.2, 5.65, W - 2 * MX - 0.4, 1.1, { size: 17 });
  notes(s, 'Spec 4.3.5 (HT, chemistry only): "Equal amounts in moles of gases occupy the same volume under the same conditions of temperature and pressure. The volume of one mole of any gas at room temperature and pressure (20°C and 1 atmosphere pressure) is 24 dm³. The volumes of gaseous reactants and products can be calculated from the balanced equation for the reaction. Students should be able to: calculate the volume of a gas at room temperature and pressure from its mass and relative formula mass; calculate volumes of gaseous reactants and products from a balanced equation and a given volume of a gaseous reactant or product; change the subject of a mathematical equation."');
}

D.myTurnYourTurn({
  title: 'Gas volumes at RTP', tag: 'HT • Maths skill', stepSize: 17, labelW: 2.5, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Calculate:',
    steps: [
      { label: 'volume of 8 g of O₂', text: '0.25 × 24 = **6 dm³**' },
      { label: 'moles in 48 cm³ of H₂', text: '48 ÷ 24 000 = **0.002 mol**' },
    ],
  },
  yours: {
    q: 'Calculate:',
    steps: [
      { label: 'volume of 1.1 g of CO₂', text: '0.025 × 24 = **0.6 dm³**' },
      { label: 'moles in 3.6 dm³ of N₂', text: '3.6 ÷ 24 = **0.15 mol**' },
    ],
  },
  notes: 'Use 24 000 when the volume is in cm³. All checked in the build script.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Convert 50 cm³ to dm³.', '0.05 dm³'], ['Give two reasons why yield is under 100%.', 'Reversible; product lost; side reactions'], ['Why is a high atom economy good?', 'Less waste; more sustainable; cheaper'], ['Volume of 1 mol of gas at RTP?', '24 dm³'],
    ['20 g of NaOH in 500 cm³. Concentration?', '40 g/dm³'], ['Max 20 g, actual 15 g. % yield?', '75%'],
    ['2.0 mol/dm³ HCl: moles in 10.0 cm³? (HT)', '0.020 mol'], ['Volume of 3.2 g of O₂ at RTP? (HT)', '2.4 dm³'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 0.05 dm³  2) any two: reversible reaction; product lost when separated; unexpected side reactions  3) less waste, better use of resources, more sustainable and cheaper  4) 24 dm³  5) 20 ÷ 0.5 = 40 g/dm³  6) 15 ÷ 20 × 100 = 75%  7) 2.0 × 0.010 = 0.020 mol  8) 3.2 ÷ 32 = 0.1 mol; × 24 = 2.4 dm³.');
  }
}
near('pr conc', 20 / 0.5, 40); near('pr yield', 15 / 20 * 100, 75); near('pr mol', 2 * 0.01, 0.02); near('pr gas', mol(3.2, 'O2') * 24, 2.4);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'Magnesium reacts with hydrochloric acid:   Mg + 2HCl → MgCl₂ + H₂',
  parts: [
    { l: 'a', q: 'Calculate the atom economy for making magnesium chloride. Give your answer to 1 decimal place.', m: 2, lines: 1 },
    { l: 'b', q: '0.48 g of magnesium reacts with excess acid. Calculate the maximum volume of hydrogen in cm³ at RTP. (HT)', m: 3, lines: 1 },
    { l: 'c', q: 'Only 360 cm³ of hydrogen is collected. Calculate the percentage yield.', m: 2, lines: 1 },
    { l: 'd', q: '0.04 mol of HCl is in 50 cm³ of the acid. Calculate its concentration in mol/dm³. (HT)', m: 2, lines: 1 },
    { l: 'e', q: 'Suggest one reason why the yield was less than 100%.', m: 1, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', '95 ÷ (95 + 2) × 100; = 97.9%', '2', ''],
    ['(b)', '0.48 ÷ 24 = 0.02 mol Mg; 1 : 1 so 0.02 mol H₂; × 24 000 = 480 cm³', '3', ''],
    ['(c)', '360 ÷ 480 × 100; = 75%', '2', 'ecf from (b)'],
    ['(d)', '50 cm³ = 0.05 dm³; 0.04 ÷ 0.05 = 0.8 mol/dm³', '2', ''],
    ['(e)', 'gas escaped before the bung was fitted / leaks / some Mg not reacted / impure Mg', '1', ''],
  ],
  notes: 'Mark scheme on the next slide. All numbers checked in the build script.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['5 g in 250 cm³: concentration in g/dm³?', 'Write the formula for atom economy.', 'Max 8 g, actual 6 g: % yield?', 'Volume of 0.5 mol of CO₂ at RTP? (HT)'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) 5 ÷ 0.25 = 20 g/dm³  2) Mᵣ of desired product ÷ sum of Mᵣ of all products × 100  3) 75%  4) 12 dm³. Revisit the objectives.');
}
near('exit conc', 5 / 0.25, 20); near('exit yield', 6 / 8 * 100, 75);

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'What mass of solute is in 400 cm³ of a 25 g/dm³ solution?',
    'Compare making ethanol by fermentation (51.1%) and hydration (100%).',
    'Explain why a factory wants a high yield and a high atom economy.',
    'HT: 25.0 cm³ NaOH needs 18.0 cm³ of 0.150 mol/dm³ HCl. Find [NaOH].',
    'HT: what volume of CO₂ forms when 10 g of CaCO₃ decomposes?',
    'HT: what volume of O₂ is needed to burn 100 cm³ of CH₄?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) 25 × 0.4 = 10 g  2) hydration: 100% AE, fast, but uses crude oil (non-renewable) and high temperature; fermentation: 51.1% AE, slow, but renewable sugar and low temperature  3) less waste, less raw material, more profit, more sustainable  4) 0.150 × 0.018 = 0.0027 mol; ÷ 0.025 = 0.108 mol/dm³  5) 0.1 mol CO₂ × 24 = 2.4 dm³  6) CH₄ + 2O₂: 200 cm³.');
}
near('HW mass', 25 * 0.4, 10); near('HW tit', 0.15 * 0.018 / 0.025, 0.108); near('HW CO2 vol', mol(10, 'CaCO3') * 24, 2.4);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.3_C_ConcentrationYieldGases.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
