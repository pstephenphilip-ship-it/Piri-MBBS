// build_4_5_A.js — AQA GCSE Chemistry (8462) 4.5 Energy changes, lesson 1 of 2:
// 4.5.1.1 Energy transfer during exothermic and endothermic reactions (RP4),
// 4.5.1.2 Reaction profiles, 4.5.1.3 The energy change of reactions (HT bond energies).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_5_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');
const { graph } = require('../aqa-maths/graphs');

const D = T.init(deck('4.5.1', 'Exothermic and endothermic reactions'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
const BE = { 'H-H': 436, 'Cl-Cl': 243, 'H-Cl': 432, 'C-H': 413, 'O=O': 498, 'C=O': 805, 'O-H': 464, 'Br-Br': 193, 'H-Br': 366, 'N#N': 945, 'N-H': 391, 'H-I': 298, 'I-I': 151, 'C=C': 612, 'C-C': 348 };
const sum = list => list.reduce((t, [k, b]) => t + k * BE[b], 0);
const dH = (broken, made) => sum(broken) - sum(made);
balanced('H2+Cl2', [[1, 'H2'], [1, 'Cl2']], [[2, 'HCl']]);
near('HCl broken', sum([[1, 'H-H'], [1, 'Cl-Cl']]), 679); near('HCl made', sum([[2, 'H-Cl']]), 864); near('HCl dH', dH([[1, 'H-H'], [1, 'Cl-Cl']], [[2, 'H-Cl']]), -185);
balanced('CH4', [[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']]);
near('CH4 broken', sum([[4, 'C-H'], [2, 'O=O']]), 2648); near('CH4 made', sum([[2, 'C=O'], [4, 'O-H']]), 3466); near('CH4 dH', dH([[4, 'C-H'], [2, 'O=O']], [[2, 'C=O'], [4, 'O-H']]), -818);
balanced('HBr', [[1, 'H2'], [1, 'Br2']], [[2, 'HBr']]); near('MT HBr', dH([[1, 'H-H'], [1, 'Br-Br']], [[2, 'H-Br']]), -103);
balanced('HI', [[2, 'HI']], [[1, 'H2'], [1, 'I2']]); near('MT HI', dH([[2, 'H-I']], [[1, 'H-H'], [1, 'I-I']]), 9);
balanced('NH3', [[1, 'N2'], [3, 'H2']], [[2, 'NH3']]); near('YT NH3 broken', sum([[1, 'N#N'], [3, 'H-H']]), 2253); near('YT NH3 made', sum([[6, 'N-H']]), 2346); near('YT NH3', dH([[1, 'N#N'], [3, 'H-H']], [[6, 'N-H']]), -93);
balanced('H2O', [[2, 'H2'], [1, 'O2']], [[2, 'H2O']]); near('YT H2O', dH([[2, 'H-H'], [1, 'O=O']], [[4, 'O-H']]), -486);
balanced('C2H4+H2', [[1, 'C2H4'], [1, 'H2']], [[1, 'C2H6']]);
near('exam C2H4', dH([[4, 'C-H'], [1, 'C=C'], [1, 'H-H']], [[6, 'C-H'], [1, 'C-C']]), -126);
near('exam partial', dH([[1, 'C=C'], [1, 'H-H']], [[2, 'C-H'], [1, 'C-C']]), -126);
// temperature changes
near('MT exo', 29.5 - 21.0, 8.5); near('MT endo', 14.0 - 19.5, -5.5); near('YT exo', 27.0 - 20.5, 6.5); near('YT endo', 18.5 - 22.0, -3.5);
// RP4 data: NaOH added to 25 cm³ HCl
const RP = [[0, 20.0], [5, 22.6], [10, 25.0], [15, 27.6], [20, 30.0], [25, 32.4], [30, 31.6], [35, 30.9], [40, 30.2]];
const peak = RP.reduce((a, b) => (b[1] > a[1] ? b : a));
near('RP4 peak vol', peak[0], 25); near('RP4 max rise', peak[1] - RP[0][1], 12.4);

// ======================= drawings =======================
// reaction profile in slide coordinates. start/end are levels 0..1 of h; ea is hump height above start (fraction of h)
function profile(s, x, y, w, h, start, end, ea, o = {}) {
  arrow(s, x, y + h, x, y, C.ink, 2); arrow(s, x, y + h, x + w, y + h, C.ink, 2);
  txt(s, 'Energy', x - 0.35, y - 0.4, 1.2, 0.35, { size: 14, bold: true });
  txt(s, 'Progress of reaction', x + w - 2.6, y + h + 0.05, 2.6, 0.35, { size: 14, bold: true, align: 'right' });
  const Y = v => y + h - v * h;
  const f = t => { const s0 = t < 0.2 ? start : t > 0.8 ? end : start + (end - start) * ((t - 0.2) / 0.6) ** 2 * (3 - 2 * (t - 0.2) / 0.6); const bump = Math.exp(-((t - 0.5) ** 2) / 0.012) * (start + ea - (start + end) / 2); return s0 + bump; };
  let prev = null;
  for (let i = 0; i <= 80; i++) { const t = i / 80, px = x + 0.3 + t * (w - 0.6), py = Y(f(t)); if (prev) seg(s, prev[0], prev[1], px, py, o.color || C.maroon, 3); prev = [px, py]; }
  txt(s, o.rLabel || 'reactants', x + 0.3, Y(start) + 0.05, 2.0, 0.35, { size: 14, bold: true });
  txt(s, o.pLabel || 'products', x + w - 2.3, end < start ? Y(end) + 0.05 : Y(end) - 0.4, 2.0, 0.35, { size: 14, bold: true, align: 'right' });
  const peakY = Y(f(0.5));
  // activation energy arrow
  seg(s, x + 0.3, Y(start), x + w * 0.55, Y(start), C.grey, 1.25, { dash: 'dash' });
  arrow(s, x + w * 0.42, Y(start), x + w * 0.42, peakY + 0.04, C.orange, 2); arrow(s, x + w * 0.42, peakY + 0.04, x + w * 0.42, Y(start), C.orange, 2);
  txt(s, 'activation\nenergy', x + w * 0.42 - 1.15, (Y(start) + peakY) / 2 - 0.3, 1.1, 0.6, { size: 12, bold: true, color: C.orange, align: 'right' });
  // overall change arrow
  seg(s, x + w * 0.6, Y(end), x + w - 0.3, Y(end), C.grey, 1.25, { dash: 'dash' });
  arrow(s, x + w * 0.8, Y(start), x + w * 0.8, Y(end), C.blue, 2);
  seg(s, x + w * 0.55, Y(start), x + w * 0.85, Y(start), C.grey, 1.25, { dash: 'dash' });
  txt(s, o.dLabel || 'energy\nchange', x + w * 0.8 + 0.08, (Y(start) + Y(end)) / 2 - 0.3, 1.3, 0.6, { size: 12, bold: true, color: C.blue });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Exothermic and endothermic reactions, measuring temperature changes (RP4), reaction profiles and bond energy calculations',
  bullets: ['Part 1: exothermic and endothermic reactions (4.5.1.1)', 'Part 2: required practical 4: temperature changes', 'Part 3: reaction profiles and activation energy (4.5.1.2)', 'Part 4: bond energies (4.5.1.3, HT)'],
  notes: 'AQA 8462 GCSE Chemistry 4.5 Energy changes, lesson 1 of 2. Lesson 2: chemical cells, batteries and fuel cells (chemistry only). About two hours.',
});

D.objectives({
  tag: '4.5.1',
  items: [
    'Classify reactions as **exothermic** or **endothermic** and give **uses**.',
    'Plan and analyse **RP4**: how a variable affects the **temperature change**.',
    'Draw and label **reaction profiles**, including **activation energy**.',
    'Calculate energy changes from **bond energies** (HT).',
  ],
  keywords: ['exothermic', 'endothermic', 'activation energy', 'reaction profile', 'bond energy'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['State the law of conservation of mass.', 'What happens to the temperature in a neutralisation?', 'Balance: CH₄ + O₂ → CO₂ + H₂O', 'How many bonds does carbon form?'],
  answers: ['no atoms lost or made', 'it rises', 'CH₄ + 2O₂ → CO₂ + 2H₂O', '4'],
  notes: 'Retrieval from 4.3, 4.4 and 4.2.',
});

D.vocab({
  title: 'Key words', tag: '4.5.1',
  items: [
    { term: 'Exothermic', def: 'Transfers energy **to the surroundings**: the temperature of the surroundings **increases**.' },
    { term: 'Endothermic', def: 'Takes in energy **from the surroundings**: the temperature of the surroundings **decreases**.' },
    { term: 'Activation energy', def: 'The **minimum energy** that particles must have to **react** when they collide.' },
    { term: 'Bond energy', def: 'The energy needed to **break** one mole of a bond (the same is released when it is **made**). HT.' },
  ],
  notes: 'Spec 4.5.1.1 and 4.5.1.2. Energy is conserved: it moves between the reaction and the surroundings.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: exothermic and endothermic', { tag: '4.5.1.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 4.2, 'Exothermic: temperature rises', C.red, 'FBEAEA');
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['**Combustion** (burning fuels).', 'Many **oxidation** reactions.', '**Neutralisation**.', '**Uses:** hand warmers, self-heating cans.'], 18, 0.15);
  headCard(s, MX + cw + gap, 1.4, cw, 4.2, 'Endothermic: temperature falls', C.blue, C.blueSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['**Thermal decomposition** (e.g. CaCO₃ → CaO + CO₂).', 'Citric acid + sodium hydrogencarbonate.', '**Photosynthesis**.', '**Uses:** sports injury cold packs.'], 18, 0.15);
  note(s, MX, 5.85, W - 2 * MX, 1.0, 'Energy is **conserved**: it is transferred between the **reacting chemicals** and the **surroundings** (the solution, the air, your hand).', { size: 17 });
  notes(s, 'Spec 4.5.1.1: "Energy is conserved in chemical reactions. The amount of energy in the universe at the end of a chemical reaction is the same as before the reaction takes place. If a reaction transfers energy to the surroundings the product molecules must have less energy than the reactants, by the amount transferred. An exothermic reaction is one that transfers energy to the surroundings so the temperature of the surroundings increases. Exothermic reactions include combustion, many oxidation reactions and neutralisation. Everyday uses of exothermic reactions include self-heating cans and hand warmers. An endothermic reaction is one that takes in energy from the surroundings so the temperature of the surroundings decreases. Endothermic reactions include thermal decompositions and the reaction of citric acid and sodium hydrogencarbonate. Some sports injury packs are based on endothermic reactions." Students should be able to evaluate uses and applications of exothermic and endothermic reactions given appropriate information (limited to measurement of temperature change).');
}

D.myTurnYourTurn({
  title: 'Exothermic or endothermic?', tag: 'Skill practice', stepSize: 19, labelW: 2.3, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Find the change and classify:',
    steps: [
      { label: '21.0 °C → 29.5 °C', text: '+8.5 °C: **exothermic**' },
      { label: '19.5 °C → 14.0 °C', text: '−5.5 °C: **endothermic**' },
    ],
  },
  yours: {
    q: 'Find the change and classify:',
    steps: [
      { label: '20.5 °C → 27.0 °C', text: '+6.5 °C: **exothermic**' },
      { label: '22.0 °C → 18.5 °C', text: '−3.5 °C: **endothermic**' },
    ],
  },
  notes: 'Change = final − initial. Positive: exothermic; negative: endothermic. Checked in the build script.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: required practical 4', { tag: 'Required practical 4' });
  headCard(s, MX, 1.4, 5.3, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 4.9, ['Put 25 cm³ of HCl in a **polystyrene cup** in a beaker (insulation).', 'Record the **starting temperature**.', 'Add 5 cm³ of NaOH, **stir**, record the **highest** temperature.', 'Repeat in 5 cm³ steps up to 40 cm³.', 'Plot temperature against volume; draw **two lines of best fit**.'], 16, 0.13);
  const G = graph(D, s, MX + 6.4, 1.8, W - MX - (MX + 6.4) - 0.2, 3.9, [0, 40], [18, 34], { gridX: 5, gridY: 2, labX: 10, labY: 4, axesAtEdge: true, xTitle: 'Volume of NaOH added (cm³)', yTitle: 'Temperature (°C)' });
  G.seg(0, 20.0, 25, 32.4, C.blue, 2.5, 'dash'); G.seg(25, 32.4, 40, 30.2, C.blue, 2.5, 'dash');
  RP.forEach(([v, t]) => G.pt(v, t, C.maroon));
  txt(s, 'Peak at 25 cm³ (all acid used). Rise = **12.4 °C**', MX + 6.0, 6.45, W - MX - (MX + 6.4), 0.4, { size: 14, bold: true });
  notes(s, 'RP4: "investigate the variables that affect temperature changes in reacting solutions such as, eg acid plus metals, acid plus carbonates, neutralisations, displacement of metals." Independent variable: volume of NaOH (or mass/type of metal); dependent: temperature change; control: volume and concentration of acid, the cup. After the peak the temperature falls because no more reaction happens and the cool NaOH absorbs heat. Data are illustrative and checked in the build script (peak at 25 cm³, rise 12.4 °C).');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is a polystyrene cup used in RP4?',
  options: ['It reduces energy transfer to the surroundings', 'It reacts with the acid', 'It makes the reaction faster', 'It is easy to weigh'],
  correct: 0,
  notes: 'Answer A: polystyrene is a good insulator, so less heat is lost and the temperature change is more accurate. A lid would help further.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: reaction profiles', { tag: '4.5.1.2' });
  const gap = 0.5, cw = (W - 2 * MX - gap) / 2;
  txt(s, 'Exothermic', MX, 1.35, cw, 0.4, { size: 19, bold: true, color: C.red, align: 'center' });
  profile(s, MX + 0.4, 2.2, cw - 1.2, 3.3, 0.55, 0.15, 0.35, { color: C.red, dLabel: 'energy\nreleased' });
  txt(s, 'Products have **less** energy than reactants.', MX, 6.0, cw, 0.6, { size: 16, align: 'center' });
  txt(s, 'Endothermic', MX + cw + gap, 1.35, cw, 0.4, { size: 19, bold: true, color: C.blue, align: 'center' });
  profile(s, MX + cw + gap + 0.4, 2.2, cw - 1.2, 3.3, 0.15, 0.55, 0.62, { color: C.blue, dLabel: 'energy\ntaken in' });
  txt(s, 'Products have **more** energy than reactants.', MX + cw + gap, 6.0, cw, 0.6, { size: 16, align: 'center' });
  notes(s, 'Spec 4.5.1.2: "Chemical reactions can occur only when reacting particles collide with each other and with sufficient energy. The minimum amount of energy that particles must have to react is called the activation energy. Reaction profiles can be used to show the relative energies of reactants and products, the activation energy and the overall energy change of a reaction. Students should be able to: draw simple reaction profiles (energy level diagrams) for exothermic and endothermic reactions showing the relative energies of reactants and products, the activation energy and the overall energy change, with a curved line to show the energy as the reaction proceeds; use reaction profiles to identify reactions as exothermic or endothermic; explain that the activation energy is the energy needed for a reaction to occur." Activation energy is measured from the reactants to the peak.');
}

D.hinge({
  title: 'Quick check',
  q: 'On a reaction profile, where is the activation energy measured?',
  options: ['From the reactants up to the peak', 'From the products up to the peak', 'From the reactants to the products', 'From zero to the peak'],
  correct: 0,
  notes: 'Answer A. B is the activation energy of the reverse reaction. C is the overall energy change. D is a common misreading of the axes.',
});

// ---------------- Part 4 (HT) ----------------
{
  const s = frame('Part 4: bond energies', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.4, 'Breaking and making', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['**Breaking** bonds **takes in** energy (endothermic).', '**Making** bonds **releases** energy (exothermic).'], 18, 0.15);
  rect(s, MX + cw + gap, 1.4, cw, 2.4, C.soft, C.line);
  txt(s, 'energy change =\nbonds broken − bonds made', MX + cw + gap + 0.3, 1.4, cw - 0.6, 1.6, { size: 22, bold: true, valign: 'middle', align: 'center' });
  txt(s, 'negative = exothermic;  positive = endothermic', MX + cw + gap + 0.3, 3.05, cw - 0.6, 0.5, { size: 15, align: 'center', color: C.grey });
  rect(s, MX, 4.05, W - 2 * MX, 2.8, C.orangeSoft, 'F3D9B5');
  txt(s, 'H₂ + Cl₂ → 2HCl     (H–H 436, Cl–Cl 243, H–Cl 432 kJ/mol)', MX + 0.3, 4.15, W - 2 * MX - 0.6, 0.45, { size: 18, bold: true, color: C.orange });
  const L = [['Broken', '436 + 243 = **679 kJ/mol**'], ['Made', '2 × 432 = **864 kJ/mol**'], ['Change', '679 − 864 = **−185 kJ/mol**: more energy released than taken in, so **exothermic**']];
  L.forEach(([a, b], i) => { txt(s, a, MX + 0.3, 4.75 + i * 0.6, 1.6, 0.5, { size: 18, bold: true, color: C.maroon }); txt(s, b, MX + 1.9, 4.75 + i * 0.6, W - 2 * MX - 2.2, 0.55, { size: 18 }); });
  notes(s, 'Spec 4.5.1.3 (HT): "During a chemical reaction: energy must be supplied to break bonds in the reactants; energy is released when bonds in the products are formed. The energy needed to break bonds and the energy released when bonds are formed can be calculated from bond energies. The difference between the sum of the energy needed to break bonds in the reactants and the sum of the energy released when bonds in the products are formed is the overall energy change of the reaction. In an exothermic reaction, the energy released from forming new bonds is greater than the energy needed to break existing bonds. In an endothermic reaction, the energy needed to break existing bonds is greater than the energy released from forming new bonds. Students should be able to calculate the energy transferred in chemical reactions using bond energies supplied." Values are typical data-sheet values; checked in the build script.');
}

{
  const s = frame('Bond energies: methane burning', HT);
  txt(s, 'CH₄ + 2O₂ → CO₂ + 2H₂O', MX, 1.4, 6, 0.5, { size: 22, bold: true });
  const tw = 4.6;
  table(s, W - MX - tw, 1.4, [tw * 0.5, tw * 0.5], ['Bond', 'kJ/mol'], [['C–H', '413'], ['O=O', '498'], ['C=O', '805'], ['O–H', '464']], { rh: 0.48, hh: 0.48, size: 16, align: ['left', 'center'] });
  txt(s, 'Draw the displayed formulae first to count bonds.', MX, 2.0, 7.5, 0.4, { size: 15, italic: true, color: C.grey });
  rect(s, MX, 2.55, 7.6, 3.0, C.orangeSoft, 'F3D9B5');
  const L = [['Broken', '4 C–H + 2 O=O = (4 × 413) + (2 × 498) = **2648**'], ['Made', '2 C=O + 4 O–H = (2 × 805) + (4 × 464) = **3466**'], ['Change', '2648 − 3466 = **−818 kJ/mol** (exothermic)']];
  L.forEach(([a, b], i) => { txt(s, a, MX + 0.3, 2.75 + i * 0.9, 1.4, 0.8, { size: 17, bold: true, color: C.maroon }); txt(s, b, MX + 1.7, 2.75 + i * 0.9, 5.7, 0.8, { size: 17 }); });
  note(s, MX, 5.8, W - 2 * MX, 1.05, 'Remember the **big numbers**: 2O₂ means **two** O=O bonds; 2H₂O means **four** O–H bonds. CO₂ has **two** C=O double bonds.', { size: 17 });
  notes(s, 'Most common errors: forgetting coefficients, and doing made − broken (sign flipped). All values checked in the build script.');
}

D.myTurnYourTurn({
  title: 'Bond energy calculations', tag: 'HT • Maths skill', stepSize: 16, labelW: 1.1, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'H₂ + Br₂ → 2HBr  (H–H 436, Br–Br 193, H–Br 366)',
    steps: [
      { label: 'Broken', text: '436 + 193 = 629' },
      { label: 'Made', text: '2 × 366 = 732' },
      { label: 'Change', text: '629 − 732 = **−103 kJ/mol**, exothermic' },
    ],
  },
  yours: {
    q: 'N₂ + 3H₂ → 2NH₃  (N≡N 945, H–H 436, N–H 391)',
    steps: [
      { label: 'Broken', text: '945 + 3 × 436 = 2253' },
      { label: 'Made', text: '6 × 391 = 2346' },
      { label: 'Change', text: '2253 − 2346 = **−93 kJ/mol**, exothermic' },
    ],
  },
  notes: 'Extension (endothermic): 2HI → H₂ + I₂ with H–I 298, I–I 151: broken 596, made 587, change +9 kJ/mol. Another: 2H₂ + O₂ → 2H₂O: 1370 − 1856 = −486 kJ/mol. All checked in the build script.',
});

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'Bonds broken: 1200 kJ/mol. Bonds made: 1500 kJ/mol. What is the energy change?',
  options: ['−300 kJ/mol, exothermic', '+300 kJ/mol, endothermic', '−300 kJ/mol, endothermic', '+2700 kJ/mol'],
  correct: 0,
  notes: 'Answer A: 1200 − 1500 = −300; more energy released making bonds, so exothermic. B did made − broken. C has the right number but the wrong name. D added them.',
});
near('hinge', 1200 - 1500, -300);

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Define an exothermic reaction.', 'Transfers energy to the surroundings; temperature rises'], ['Give one use of an endothermic reaction.', 'Sports injury cold pack'], ['What is activation energy?', 'Minimum energy needed for particles to react'], ['Is bond breaking exothermic or endothermic? (HT)', 'Endothermic'],
    ['A reaction’s temperature drops from 22 °C to 15 °C. Classify it.', 'Endothermic (−7 °C)'], ['On an exothermic profile, are the products higher or lower?', 'Lower'],
    ['Why stir the mixture in RP4?', 'So the temperature is the same throughout'], ['Broken 2000, made 1700 kJ/mol. Change? (HT)', '+300 kJ/mol, endothermic'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) transfers energy to the surroundings so the temperature of the surroundings increases  2) sports injury pack  3) the minimum energy that particles must have to react when they collide  4) endothermic  5) 15 − 22 = −7 °C, endothermic  6) lower  7) so the mixture reacts fully and the thermometer reads the whole solution  8) 2000 − 1700 = +300 kJ/mol, endothermic.');
  }
}
near('practice endo', 15 - 22, -7); near('practice HT', 2000 - 1700, 300);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'A student mixes two solutions. The temperature falls from 21.5 °C to 16.0 °C. Calculate the change and classify the reaction.', m: 2, lines: 0 },
    { l: 'b', q: 'Draw a labelled reaction profile for an exothermic reaction. Show the activation energy and the energy change.', m: 4, lines: 2 },
    { l: 'c', q: 'C₂H₄ + H₂ → C₂H₆. Bonds: C=C 612, H–H 436, C–C 348, C–H 413 kJ/mol. Calculate the energy change. (HT)', m: 4, lines: 2 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', '−5.5 °C; endothermic', '2', ''],
    ['(b)', 'axes labelled; products below reactants; curve rising to a peak; activation energy from reactants to peak; energy change from reactants to products (any four)', '4', ''],
    ['(c)', 'broken: C=C + H–H = 1048 (or all bonds 2700); made: C–C + 2 C–H = 1174 (or all bonds 2826); 1048 − 1174; = −126 kJ/mol', '4', 'either method'],
  ],
  notes: 'Mark scheme on the next slide. Part (c) works whether students count all bonds (4 C–H unchanged) or only the bonds that change. Checked in the build script.',
});
near('exam a', 16.0 - 21.5, -5.5); near('exam all broken', sum([[4, 'C-H'], [1, 'C=C'], [1, 'H-H']]), 2700); near('exam all made', sum([[6, 'C-H'], [1, 'C-C']]), 2826);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Give two examples of exothermic reactions.', 'In an endothermic reaction, what happens to the temperature?', 'Sketch an endothermic profile.', 'Formula for energy change from bond energies? (HT)'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) combustion, neutralisation, oxidation  2) it decreases  3) products above reactants, hump, Ea and ΔH labelled  4) bonds broken − bonds made. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Evaluate hand warmers based on exothermic reactions (one advantage, one disadvantage).',
    'Write an RP4 plan to compare the temperature change of four metals with acid.',
    'Draw and label reaction profiles for an exothermic and an endothermic reaction.',
    'Explain why the temperature falls after the peak in RP4.',
    'HT: 2H₂ + O₂ → 2H₂O. H–H 436, O=O 498, O–H 464. Find the energy change.',
    'HT: 2HI → H₂ + I₂. H–I 298, H–H 436, I–I 151. Exothermic or endothermic?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) e.g. no electricity needed / single use; reusable ones crystallise and can be reset  2) same acid volume and concentration, same mass of powder, insulated cup, measure max temperature  3) see Part 3  4) reaction complete, extra cold NaOH absorbs energy, heat lost to surroundings  5) (2 × 436 + 498) − (4 × 464) = 1370 − 1856 = −486 kJ/mol  6) 596 − 587 = +9 kJ/mol, endothermic.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.5_A_EnergyChanges.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
