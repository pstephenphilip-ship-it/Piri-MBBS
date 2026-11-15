// build_4_7_A.js — AQA GCSE Chemistry (8462) 4.7 Organic chemistry, lesson 1 of 3:
// 4.7.1.1 Crude oil, hydrocarbons and alkanes, 4.7.1.2 Fractional distillation and petrochemicals,
// 4.7.1.3 Properties of hydrocarbons (incl. combustion), 4.7.1.4 Cracking and alkenes.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_7_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, parse, Mr, helpers } = require('./chem_common');

const D = T.init(deck('4.7.1', 'Crude oil, alkanes and cracking'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
const alkane = n => `C${n}H${2 * n + 2}`;
const isAlkane = f => { const p = parse(f); return p.H === 2 * p.C + 2 ? 1 : 0; };
const isAlkene = f => { const p = parse(f); return p.H === 2 * p.C ? 1 : 0; };
['CH4', 'C2H6', 'C3H8', 'C4H10', 'C8H18', 'C10H22', 'C12H26', 'C20H42'].forEach(f => calc('alkane ' + f, isAlkane(f), 1));
calc('alkane fn', alkane(5) === 'C5H12' ? 1 : 0, 1); calc('alkane 20', alkane(20) === 'C20H42' ? 1 : 0, 1);
['C2H4', 'C3H6', 'C6H12'].forEach(f => calc('alkene ' + f, isAlkene(f), 1));
balanced('CH4 comb', [[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']]);
balanced('C3H8 comb', [[1, 'C3H8'], [5, 'O2']], [[3, 'CO2'], [4, 'H2O']]);
balanced('C2H6 comb', [[2, 'C2H6'], [7, 'O2']], [[4, 'CO2'], [6, 'H2O']]);
balanced('C4H10 comb', [[2, 'C4H10'], [13, 'O2']], [[8, 'CO2'], [10, 'H2O']]);
balanced('C5H12 comb', [[1, 'C5H12'], [8, 'O2']], [[5, 'CO2'], [6, 'H2O']]);
balanced('crack 1', [[1, 'C10H22']], [[1, 'C8H18'], [1, 'C2H4']]);
balanced('MT crack', [[1, 'C12H26']], [[1, 'C10H22'], [1, 'C2H4']]);
balanced('MT crack2', [[1, 'C16H34']], [[1, 'C10H22'], [1, 'C6H12']]);
balanced('YT crack', [[1, 'C8H18']], [[1, 'C6H14'], [1, 'C2H4']]);
balanced('YT crack2', [[1, 'C14H30']], [[1, 'C10H22'], [2, 'C2H4']]);
balanced('exam crack', [[1, 'C11H24']], [[1, 'C8H18'], [1, 'C3H6']]);
balanced('practice crack', [[1, 'C9H20']], [[1, 'C7H16'], [1, 'C2H4']]);
near('Mr C8H18', Mr('C8H18'), 114); near('Mr C3H8', Mr('C3H8'), 44);

// ======================= drawings =======================
// displayed formula of a straight-chain alkane or alkene (double bond between C1 and C2 if alkene)
function displayed(s, x, y, n, o = {}) {
  const dx = o.dx || 0.62, sz = o.size || 16, half = 0.15, vb = o.vb || 0.38, vh = o.vh || 0.55;
  const at = (t, cx, cy) => txt(s, t, cx - 0.2, cy - 0.2, 0.4, 0.4, { size: sz, bold: t === 'C', align: 'center', valign: 'middle', color: t === 'C' ? C.ink : C.grey });
  for (let i = 0; i < n; i++) {
    const cx = x + (i + 1) * dx, cy = y;
    at('C', cx, cy);
    const dbl = o.alkene && i < 1;
    const hUp = !(o.alkene && (i === 0 || i === 1)) || (o.alkene && i === 0) || (o.alkene && i === 1);
    // H above and below (alkene: C1 and C2 have one fewer H, shown by removing the lower H)
    seg(s, cx, cy - half, cx, cy - vb, C.ink, 1.5); at('H', cx, cy - vh);
    if (!(o.alkene && (i === 0 || i === 1))) { seg(s, cx, cy + half, cx, cy + vb, C.ink, 1.5); at('H', cx, cy + vh); }
    if (i < n - 1) {
      if (dbl) { seg(s, cx + half, cy - 0.05, cx + dx - half, cy - 0.05, C.ink, 1.5); seg(s, cx + half, cy + 0.05, cx + dx - half, cy + 0.05, C.ink, 1.5); }
      else seg(s, cx + half, cy, cx + dx - half, cy, C.ink, 1.5);
    }
    void hUp;
  }
  seg(s, x + dx - half, y, x + dx - 0.38, y, C.ink, 1.5); at('H', x + dx - 0.55, y);
  seg(s, x + n * dx + half, y, x + n * dx + 0.38, y, C.ink, 1.5); at('H', x + n * dx + 0.55, y);
}
function column(s, x, y, w, h) {
  rect(s, x, y, w, h, 'F4F2F3', C.ink, { lw: 2 });
  const fr = [['LPG (gases)', 'B8D8F0'], ['petrol', 'CDE6F5'], ['kerosene', 'E3EFC8'], ['diesel oil', 'F2E3B3'], ['heavy fuel oil', 'F0C99B'], ['bitumen', 'C49A6C']];
  const fh = h / fr.length;
  fr.forEach(([n, c], i) => {
    const yy = y + i * fh;
    if (i > 0) seg(s, x, yy, x + w, yy, C.grey, 1.25, { dash: 'dash' });
    arrow(s, x + w, yy + fh / 2, x + w + 0.6, yy + fh / 2, C.ink, 1.75);
    rect(s, x + w + 0.65, yy + fh / 2 - 0.22, 2.3, 0.44, c, c);
    txt(s, n, x + w + 0.75, yy + fh / 2 - 0.22, 2.2, 0.44, { size: 14, bold: true, valign: 'middle' });
  });
  arrow(s, x - 1.1, y + h - 0.35, x, y + h - 0.35, C.red, 2.5);
  txt(s, 'crude oil vapour', x - 1.9, y + h - 0.05, 2.0, 0.35, { size: 13, bold: true, color: C.red });
  txt(s, 'cool\n(about 20 °C)', x - 1.6, y, 1.5, 0.6, { size: 12, bold: true, color: C.blue, align: 'right' });
  txt(s, 'hot\n(about 350 °C)', x - 1.6, y + h - 1.2, 1.5, 0.6, { size: 12, bold: true, color: C.red, align: 'right' });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Crude oil and alkanes, fractional distillation, how properties change with chain length, combustion, and cracking',
  bullets: ['Part 1: crude oil and alkanes (4.7.1.1)', 'Part 2: fractional distillation (4.7.1.2)', 'Part 3: properties and combustion (4.7.1.3)', 'Part 4: cracking and alkenes (4.7.1.4)'],
  notes: 'AQA 8462 GCSE Chemistry 4.7 Organic chemistry, lesson 1 of 3. Lesson 2: alkenes, alcohols, carboxylic acids (chemistry only). Lesson 3: addition and condensation polymers, amino acids, DNA and natural polymers. About two hours.',
});

D.objectives({
  tag: '4.7.1',
  items: [
    'Describe crude oil and write formulae for **alkanes** (CₙH₂ₙ₊₂).',
    'Explain how **fractional distillation** separates crude oil.',
    'Describe trends in **boiling point**, **viscosity** and **flammability**; balance **combustion** equations.',
    'Describe **cracking**, balance cracking equations and test for **alkenes**.',
  ],
  keywords: ['hydrocarbon', 'alkane', 'fraction', 'viscosity', 'cracking', 'alkene'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is a hydrocarbon?', 'How does fractional distillation separate liquids?', 'Balance: CH₄ + O₂ → CO₂ + H₂O', 'Why do bigger molecules have higher boiling points?'],
  answers: ['compound of hydrogen and carbon only', 'different boiling points', 'CH₄ + 2O₂ → CO₂ + 2H₂O', 'stronger intermolecular forces'],
  notes: 'Retrieval from 4.1 (separation), 4.2 (intermolecular forces) and 4.1 (balancing).',
});

D.vocab({
  title: 'Key words', tag: '4.7.1',
  items: [
    { term: 'Crude oil', def: 'A **finite** resource formed from the remains of ancient **plankton**: a **mixture** of mostly **hydrocarbons**.' },
    { term: 'Hydrocarbon', def: 'A compound of **hydrogen and carbon only**.' },
    { term: 'Alkane', def: 'A saturated hydrocarbon: **single C–C bonds** only. General formula **CₙH₂ₙ₊₂**.' },
    { term: 'Homologous series', def: 'A family with the **same general formula** and **similar reactions**.' },
  ],
  notes: 'Spec 4.7.1.1: "Crude oil is a finite resource found in rocks. Crude oil is the remains of an ancient biomass consisting mainly of plankton that was buried in mud." "Homologous series" is in 4.7.1.2.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the alkanes', { tag: '4.7.1.1' });
  const rows = [['methane', 'CH₄', 1], ['ethane', 'C₂H₆', 2], ['propane', 'C₃H₈', 3], ['butane', 'C₄H₁₀', 4]];
  rows.forEach(([name, f, n], i) => {
    const y = 1.55 + i * 1.32;
    rect(s, MX, y - 0.1, 7.6, 1.22, i % 2 ? C.white : C.soft, C.line);
    txt(s, name, MX + 0.2, y + 0.2, 1.6, 0.45, { size: 18, bold: true, color: C.maroon });
    txt(s, f, MX + 1.8, y + 0.2, 1.3, 0.45, { size: 18, bold: true });
    displayed(s, MX + 3.0, y + 0.51, n, { dx: 0.58, size: 12, vb: 0.28, vh: 0.4 });
  });
  const bx = MX + 8.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.0, 'Alkanes', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['General formula **CₙH₂ₙ₊₂**.', '**Saturated**: only single C–C bonds.', 'Names: **meth-, eth-, prop-, but-** = 1, 2, 3, 4 carbons.'], 16, 0.12);
  note(s, bx, 4.6, bw, 2.25, 'Mnemonic: **M**onkeys **E**at **P**eanut **B**utter.\nFind the formula of an alkane with 8 carbons: C₈H₁₈ (2 × 8 + 2 = 18).', { size: 16 });
  notes(s, 'Spec 4.7.1.1: "Crude oil is a mixture of a very large number of compounds. Most of the compounds in crude oil are hydrocarbons, which are molecules made up of hydrogen and carbon atoms only. Most of the hydrocarbons in crude oil are hydrocarbons called alkanes. The general formula for the homologous series of alkanes is CnH2n+2. The first four members of the alkanes are methane, ethane, propane and butane. Alkane molecules can be represented in the following forms: C2H6 or [displayed]. Students should be able to recognise substances as alkanes given their formulae in these forms." All formulae checked in the build script.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which formula is an alkane?',
  options: ['C₆H₁₄', 'C₆H₁₂', 'C₆H₆', 'C₆H₁₂O₆'],
  correct: 0,
  notes: 'Answer A: 2 × 6 + 2 = 14. B fits CₙH₂ₙ (an alkene). C is benzene (not on the spec). D contains oxygen (glucose), so it is not a hydrocarbon.',
});
calc('hinge C6H14', isAlkane('C6H14'), 1); calc('hinge C6H12 not', isAlkane('C6H12'), 0);

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: fractional distillation', { tag: '4.7.1.2' });
  column(s, MX + 2.2, 1.5, 1.6, 5.0);
  const bx = MX + 8.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.8, 'How it works', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Crude oil is **heated** until it **evaporates**.', 'Vapour rises up the column: **hot at the bottom**, **cool at the top**.', 'Each fraction **condenses** at its **boiling point** and is collected.', 'Small molecules (low boiling points) leave at the **top**.'], 15, 0.1);
  note(s, bx, 5.4, bw, 1.45, 'A **fraction** is a mixture of hydrocarbons with a **similar number of carbon atoms**.', { size: 15 });
  notes(s, 'Spec 4.7.1.2: "The many hydrocarbons in crude oil may be separated into fractions, each of which contains molecules with a similar number of carbon atoms, by fractional distillation. The fractions can be processed to produce fuels and feedstock for the petrochemical industry. Many of the fuels on which we depend for our modern lifestyle, such as petrol, diesel oil, kerosene, heavy fuel oil and liquefied petroleum gases, are produced from crude oil. Many useful materials on which modern life depends are produced by the petrochemical industry, such as solvents, lubricants, polymers, detergents." Students should be able to explain how fractional distillation works in terms of evaporation and condensation. Knowledge of the names of other specific fractions or fuels is not required. Temperatures are approximate.');
}

D.hinge({
  title: 'Quick check',
  q: 'Where are the fractions with the smallest molecules collected?',
  options: ['At the top of the column', 'At the bottom', 'In the middle', 'They stay in the crude oil'],
  correct: 0,
  notes: 'Answer A: smallest molecules have the lowest boiling points, so they rise furthest before condensing.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: properties change with chain length', { tag: '4.7.1.3' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.3, tw * 0.35, tw * 0.35], ['Property (bigger molecules)', 'Change', 'Why'], [
    ['Boiling point', '**increases**', 'stronger intermolecular forces'],
    ['Viscosity (thickness)', '**increases**: flows less easily', 'long molecules tangle; stronger forces'],
    ['Flammability', '**decreases**: harder to ignite', 'less volatile'],
  ], { rh: 0.85, size: 17 });
  const y = 4.5;
  rect(s, MX, y, tw, 0.6, C.blueSoft, C.blue);
  txt(s, 'small: e.g. petrol (C₈) — runny, very flammable, low boiling point', MX + 0.3, y, tw / 2, 0.6, { size: 15, valign: 'middle' });
  txt(s, 'large: e.g. bitumen (C₄₀₊) — thick, hard to ignite', MX + tw / 2, y, tw / 2 - 0.3, 0.6, { size: 15, valign: 'middle', align: 'right' });
  note(s, MX, 5.35, tw, 1.5, 'These properties decide the **use** of each fraction: small molecules make good **fuels** (ignite easily); large ones are used for **roads** (bitumen) and **lubricants**.', { size: 17 });
  notes(s, 'Spec 4.7.1.3: "Some properties of hydrocarbons depend on the size of their molecules, including boiling point, viscosity and flammability. These properties influence how hydrocarbons are used as fuels. Students should be able to recall how boiling point, viscosity and flammability change with increasing molecular size."');
}

{
  const s = frame('Combustion of hydrocarbons', { tag: '4.7.1.3' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, '**Complete combustion**: hydrocarbon + oxygen → **carbon dioxide + water**. The carbon and hydrogen are **oxidised**; energy is **released**.', { fill: C.soft, line: C.line, size: 17 });
  headCard(s, MX, 2.5, 6.0, 4.35, 'Balancing method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 3.2, 5.6, ['Balance **C** (CO₂).', 'Balance **H** (H₂O).', 'Balance **O** last; if you need a half, **double everything**.'], 17, 0.15);
  const bx = MX + 6.4, bw = W - MX - bx;
  rect(s, bx, 2.5, bw, 4.35, C.orangeSoft, 'F3D9B5');
  txt(s, 'Propane', bx + 0.25, 2.6, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O', bx + 0.25, 3.05, bw - 0.5, 0.45, { size: 19, bold: true });
  txt(s, '3 C → 3CO₂;  8 H → 4H₂O;  O: 6 + 4 = 10 → 5O₂', bx + 0.25, 3.6, bw - 0.5, 0.5, { size: 15 });
  txt(s, 'Ethane (needs doubling)', bx + 0.25, 4.3, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, 'C₂H₆ + 3½O₂ → 2CO₂ + 3H₂O', bx + 0.25, 4.75, bw - 0.5, 0.45, { size: 17 });
  txt(s, '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O', bx + 0.25, 5.3, bw - 0.5, 0.45, { size: 19, bold: true });
  notes(s, 'Spec 4.7.1.3: "The combustion of hydrocarbon fuels releases energy. During combustion, the carbon and hydrogen in the fuels are oxidised. The complete combustion of a hydrocarbon produces carbon dioxide and water. Students should be able to write balanced equations for the complete combustion of hydrocarbons with a given formula." Incomplete combustion (CO, soot) is in 4.9.3. All equations checked by atom counting.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: cracking', { tag: '4.7.1.4' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.6, 'What and why', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['Breaks **long** hydrocarbons into **shorter, more useful** ones.', 'There is **more demand** for small molecules (petrol) than there is supply.'], 16, 0.12);
  headCard(s, MX + cw + gap, 1.4, cw, 2.6, 'Two methods', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['**Catalytic**: vaporise, pass over a **hot catalyst**.', '**Steam**: mix vapour with **steam** at a very **high temperature**.'], 16, 0.12);
  rect(s, MX, 4.2, W - 2 * MX, 1.45, C.orangeSoft, 'F3D9B5');
  txt(s, 'C₁₀H₂₂  →  C₈H₁₈  +  C₂H₄', MX + 0.3, 4.3, W - 2 * MX - 0.6, 0.6, { size: 26, bold: true, align: 'center' });
  txt(s, 'decane (alkane) → octane (alkane, for petrol) + ethene (alkene, for polymers)', MX + 0.3, 4.95, W - 2 * MX - 0.6, 0.5, { size: 16, align: 'center' });
  note(s, MX, 5.85, W - 2 * MX, 1.0, 'Cracking makes **alkanes** and **alkenes**. Check by counting: C 10 = 8 + 2; H 22 = 18 + 4.', { size: 17 });
  notes(s, 'Spec 4.7.1.4: "Hydrocarbons can be broken down (cracked) to produce smaller, more useful molecules. Cracking can be done by various methods including catalytic cracking and steam cracking. Students should be able to describe in general terms the conditions used for catalytic cracking and steam cracking. The products of cracking include alkanes and another type of hydrocarbon called alkenes... Students should be able to balance chemical equations as examples of cracking given the formulae of the reactants and products; give examples to illustrate the usefulness of cracking; explain how modern life depends on the uses of hydrocarbons."');
}

D.myTurnYourTurn({
  title: 'Balancing cracking equations', tag: 'Skill practice', stepSize: 19, labelW: 0.6, labelSize: 17, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Find the missing product:',
    steps: [
      { label: 'a', text: 'C₁₂H₂₆ → C₁₀H₂₂ + **C₂H₄**' },
      { label: 'b', text: 'C₁₆H₃₄ → C₁₀H₂₂ + **C₆H₁₂**' },
    ],
  },
  yours: {
    q: 'Find the missing product:',
    steps: [
      { label: 'a', text: 'C₈H₁₈ → C₆H₁₄ + **C₂H₄**' },
      { label: 'b', text: 'C₁₄H₃₀ → C₁₀H₂₂ + **2C₂H₄**' },
    ],
  },
  notes: 'Subtract the carbons and hydrogens. In yours (b) the leftover is C₄H₈, which can be written as 2C₂H₄. All checked in the build script.',
});

{
  const s = frame('Alkenes and the bromine water test', { tag: '4.7.1.4' });
  txt(s, 'Ethene, C₂H₄', MX, 1.4, 4, 0.45, { size: 19, bold: true, color: C.maroon });
  displayed(s, MX + 0.2, 2.7, 2, { alkene: true, dx: 0.8, size: 18 });
  txt(s, 'C=C double bond', MX, 3.6, 4, 0.4, { size: 15, bold: true });
  headCard(s, MX + 4.4, 1.4, W - MX - (MX + 4.4), 2.4, 'Alkenes', C.maroon, C.soft);
  bullets(s, MX + 4.6, 2.1, W - MX - (MX + 4.8), ['**More reactive** than alkanes: they have a **C=C double bond**.', 'Used to make **polymers** and as **starting materials** for other chemicals.'], 16, 0.12);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  const tube = (x, col, lab, res) => { rect(s, x + 1.1, 4.7, 0.6, 1.35, col, C.ink, { lw: 1.5 }); txt(s, lab, x, 4.25, cw, 0.35, { size: 16, bold: true }); txt(s, res, x + 2.0, 4.8, cw - 2.0, 1.0, { size: 16 }); };
  tube(MX, 'F5A623', 'Alkane + bromine water', 'stays **orange**');
  tube(MX + cw + gap, 'FFFFFF', 'Alkene + bromine water', 'turns **colourless**');
  note(s, MX, 6.25, W - 2 * MX, 0.6, 'Test: **orange → colourless** shows a C=C double bond (an alkene).', { size: 17 });
  notes(s, 'Spec 4.7.1.4: "Alkenes are more reactive than alkanes and react with bromine water, which is used as a test for alkenes. Students should recall the colour change when bromine water reacts with an alkene." Say "colourless", not "clear". Alkene reactions are in lesson 2.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is cracking needed?',
  options: ['More demand for short-chain molecules than supply', 'Crude oil contains no short molecules', 'Long molecules are not hydrocarbons', 'To make crude oil'],
  correct: 0,
  notes: 'Answer A. B: crude oil does contain short molecules, just not enough. C and D are wrong.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is crude oil?', 'A finite mixture of hydrocarbons from ancient plankton'], ['Formula of the alkane with 5 carbons?', 'C₅H₁₂'], ['How does viscosity change as chains get longer?', 'Increases'], ['What is the test for an alkene?', 'Bromine water: orange → colourless'],
    ['Balance: C₅H₁₂ + O₂ → CO₂ + H₂O', 'C₅H₁₂ + 8O₂ → 5CO₂ + 6H₂O'], ['Missing product: C₉H₂₀ → C₇H₁₆ + ?', 'C₂H₄'],
    ['Why is petrol collected near the top of the column?', 'Low boiling point (small molecules)'], ['Give two conditions for catalytic cracking.', 'High temperature; catalyst'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) a finite resource, a mixture of hydrocarbons formed from ancient plankton buried in mud  2) C₅H₁₂  3) increases (more viscous)  4) bromine water turns from orange to colourless  5) C₅H₁₂ + 8O₂ → 5CO₂ + 6H₂O  6) C₂H₄  7) small molecules, low boiling point, rise to the cool top before condensing  8) vaporise the hydrocarbon and pass it over a hot catalyst.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Describe how crude oil is separated into fractions.', m: 4, lines: 2 },
    { l: 'b', q: 'Write a balanced equation for the complete combustion of butane, C₄H₁₀.', m: 2, lines: 1 },
    { l: 'c', q: 'C₁₁H₂₄ is cracked to make octane, C₈H₁₈, and one other product. Give the formula of the other product and name its type.', m: 2, lines: 1 },
    { l: 'd', q: 'Describe a test to show the other product is unsaturated.', m: 2, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'crude oil heated / evaporated; vapour rises up the column; column hotter at the bottom, cooler at the top; fractions condense at their boiling points', '4', ''],
    ['(b)', '2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O (formulae 1, balancing 1)', '2', 'C₄H₁₀ + 6½O₂ allowed'],
    ['(c)', 'C₃H₆; alkene', '2', ''],
    ['(d)', 'add bromine water; orange to colourless', '2', ''],
  ],
  notes: 'Mark scheme on the next slide. Checked by atom counting.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['General formula for alkanes?', 'Name the alkane C₃H₈.', 'Products of complete combustion?', 'Name the two types of product from cracking.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) CₙH₂ₙ₊₂  2) propane  3) carbon dioxide and water  4) alkanes and alkenes. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw displayed formulae for methane, ethane, propane and butane.',
    'Label a fractional distillation column with five fractions and their uses.',
    'Explain why petrol is more flammable than heavy fuel oil.',
    'Balance the complete combustion of C₂H₆ and C₄H₁₀.',
    'Write two cracking equations that make ethene.',
    'Explain how modern life depends on crude oil (fuels and materials).',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) see Part 1  2) LPG (bottled gas), petrol (cars), kerosene (aircraft), diesel (lorries), heavy fuel oil (ships), bitumen (roads)  3) smaller molecules, lower boiling point, more volatile  4) 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O; 2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O  5) e.g. C₁₀H₂₂ → C₈H₁₈ + C₂H₄; C₈H₁₈ → C₆H₁₄ + C₂H₄  6) fuels, plastics, solvents, lubricants, detergents.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.7_A_CrudeOilCracking.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
