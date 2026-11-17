// build_4_7_B.js — AQA GCSE Chemistry (8462) 4.7 Organic chemistry, lesson 2 of 3 (chemistry only):
// 4.7.2.1 Structure and formulae of alkenes, 4.7.2.2 Reactions of alkenes, 4.7.2.3 Alcohols,
// 4.7.2.4 Carboxylic acids (HT: weak acids), esters.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_7_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, parse, helpers } = require('./chem_common');

const D = T.init(deck('4.7.2', 'Alkenes, alcohols and carboxylic acids'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= checks =======================
const isAlkene = f => { const p = parse(f); return p.H === 2 * p.C && !p.O ? 1 : 0; };
['C2H4', 'C3H6', 'C4H8', 'C5H10'].forEach(f => calc('alkene ' + f, isAlkene(f), 1));
balanced('hydrogenation', [[1, 'C2H4'], [1, 'H2']], [[1, 'C2H6']]);
balanced('hydration', [[1, 'C2H4'], [1, 'H2O']], [[1, 'C2H5OH']]);
balanced('bromination', [[1, 'C2H4'], [1, 'Br2']], [[1, 'C2H4Br2']]);
balanced('propene+Br2', [[1, 'C3H6'], [1, 'Br2']], [[1, 'C3H6Br2']]);
balanced('propene+H2', [[1, 'C3H6'], [1, 'H2']], [[1, 'C3H8']]);
balanced('butene+H2O', [[1, 'C4H8'], [1, 'H2O']], [[1, 'C4H9OH']]);
balanced('ethene comb', [[1, 'C2H4'], [3, 'O2']], [[2, 'CO2'], [2, 'H2O']]);
balanced('methanol comb', [[2, 'CH3OH'], [3, 'O2']], [[2, 'CO2'], [4, 'H2O']]);
balanced('ethanol comb', [[1, 'C2H5OH'], [3, 'O2']], [[2, 'CO2'], [3, 'H2O']]);
balanced('ethanol+Na', [[2, 'C2H5OH'], [2, 'Na']], [[2, 'C2H5ONa'], [1, 'H2']]);
balanced('fermentation', [[1, 'C6H12O6']], [[2, 'C2H5OH'], [2, 'CO2']]);
balanced('ester', [[1, 'CH3COOH'], [1, 'C2H5OH']], [[1, 'CH3COOC2H5'], [1, 'H2O']]);
balanced('acid+carbonate', [[2, 'CH3COOH'], [1, 'Na2CO3']], [[2, 'CH3COONa'], [1, 'H2O'], [1, 'CO2']]);
balanced('acid+CaCO3', [[2, 'CH3COOH'], [1, 'CaCO3']], [[1, 'Ca(CH3COO)2'], [1, 'H2O'], [1, 'CO2']]);
// homologous series formulae by number of carbons
const alc = n => ({ C: n, H: 2 * n + 2, O: 1 }), acid = n => ({ C: n, H: 2 * n, O: 2 });
const same = (f, o) => { const p = parse(f); return Object.keys(o).every(k => p[k] === o[k]) && Object.keys(p).every(k => p[k] === o[k]) ? 1 : 0; };
calc('methanol', same('CH3OH', alc(1)), 1); calc('ethanol', same('C2H5OH', alc(2)), 1); calc('propanol', same('C3H7OH', alc(3)), 1); calc('butanol', same('C4H9OH', alc(4)), 1);
calc('methanoic', same('HCOOH', acid(1)), 1); calc('ethanoic', same('CH3COOH', acid(2)), 1); calc('propanoic', same('C2H5COOH', acid(3)), 1); calc('butanoic', same('C3H7COOH', acid(4)), 1);

// ======================= displayed formulae =======================
// cs: [{up, down, upDbl}], left atom, right: list of atoms after the last C, dbl: index of C=C bond
function chain(s, x, y, cs, o = {}) {
  const dx = o.dx || 0.72, sz = o.size || 16, half = 0.15, vb = 0.32, vh = 0.48;
  const at = (t, cx, cy, col) => txt(s, t, cx - 0.2, cy - 0.2, 0.4, 0.4, { size: sz, bold: t !== 'H', align: 'center', valign: 'middle', color: col || (t === 'H' ? C.grey : t === 'C' ? C.ink : C.red) });
  let hCount = 0;
  const left = o.left || 'H';
  at(left, x, y); if (left === 'H') hCount++;
  seg(s, x + half, y, x + dx - half, y, C.ink, 1.5);
  cs.forEach((c, i) => {
    const cx = x + (i + 1) * dx;
    at('C', cx, y);
    if (c.up) { if (c.upDbl) { seg(s, cx - 0.05, y - half, cx - 0.05, y - vb, C.ink, 1.5); seg(s, cx + 0.05, y - half, cx + 0.05, y - vb, C.ink, 1.5); } else seg(s, cx, y - half, cx, y - vb, C.ink, 1.5); at(c.up, cx, y - vh); if (c.up === 'H') hCount++; }
    if (c.down) { seg(s, cx, y + half, cx, y + vb, C.ink, 1.5); at(c.down, cx, y + vh); if (c.down === 'H') hCount++; }
    if (i < cs.length - 1) {
      if (o.dbl === i) { seg(s, cx + half, y - 0.05, cx + dx - half, y - 0.05, C.ink, 1.5); seg(s, cx + half, y + 0.05, cx + dx - half, y + 0.05, C.ink, 1.5); }
      else seg(s, cx + half, y, cx + dx - half, y, C.ink, 1.5);
    }
  });
  let rx = x + cs.length * dx;
  (o.right || ['H']).forEach(a => { seg(s, rx + half, y, rx + dx - half, y, C.ink, 1.5); rx += dx; at(a, rx, y); if (a === 'H') hCount++; });
  return hCount;
}
const S = {
  ethene: [[{ up: 'H' }, { up: 'H' }], { dbl: 0 }],
  propene: [[{ up: 'H' }, { up: 'H' }, { up: 'H', down: 'H' }], { dbl: 0 }],
  ethanol: [[{ up: 'H', down: 'H' }, { up: 'H', down: 'H' }], { right: ['O', 'H'] }],
  ethanoic: [[{ up: 'H', down: 'H' }, { up: 'O', upDbl: true }], { right: ['O', 'H'] }],
};
// check H counts of each drawing against the formula (draw on a throwaway slide)
{
  const tmp = D.pres.addSlide();
  calc('H ethene', chain(tmp, 0, 0, ...S.ethene), 4); calc('H propene', chain(tmp, 0, 0, ...S.propene), 6);
  calc('H ethanol', chain(tmp, 0, 0, ...S.ethanol), 6); calc('H ethanoic', chain(tmp, 0, 0, ...S.ethanoic), 4);
  D.pres._slides.pop();
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Alkenes and their addition reactions, alcohols and fermentation, carboxylic acids and esters',
  bullets: ['Part 1: alkenes and their reactions (4.7.2.1, 4.7.2.2)', 'Part 2: alcohols (4.7.2.3)', 'Part 3: carboxylic acids (4.7.2.4)', 'Part 4: esters; naming practice'],
  notes: 'AQA 8462 GCSE Chemistry 4.7, lesson 2 of 3 (separate science only). Lesson 1: crude oil, alkanes and cracking. Lesson 3: polymers. Only the first four members of each series are required. About two hours.',
});

D.objectives({
  tag: '4.7.2',
  items: [
    'Recognise **alkenes** (CₙH₂ₙ) and write equations for their **addition** reactions.',
    'Describe the reactions, uses and **fermentation** of **alcohols**.',
    'Describe the reactions of **carboxylic acids**; explain why they are **weak** (HT).',
    'Name and make **esters**, and recognise each **functional group**.',
  ],
  keywords: ['alkene', 'functional group', 'addition', 'alcohol', 'fermentation', 'carboxylic acid', 'ester'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['General formula of alkanes?', 'Test for an alkene?', 'What is made in cracking besides alkanes?', 'What is a weak acid? (HT)'],
  answers: ['CₙH₂ₙ₊₂', 'bromine water: orange → colourless', 'alkenes', 'only partially ionised'],
  notes: 'Retrieval from lesson 1 and 4.4.',
});

D.vocab({
  title: 'Key words', tag: '4.7.2',
  items: [
    { term: 'Functional group', def: 'The group of atoms that decides how a compound **reacts**: C=C, –OH, –COOH.' },
    { term: 'Unsaturated', def: 'Contains a **C=C double bond**: can take part in **addition** reactions.' },
    { term: 'Fermentation', def: 'Yeast turns **sugar** into **ethanol** and carbon dioxide (no oxygen, warm).' },
    { term: 'Ester', def: 'Made from a **carboxylic acid** + an **alcohol**; has a **fruity smell**.' },
  ],
  notes: 'Spec 4.7.2.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: alkenes', { tag: '4.7.2.1' });
  txt(s, 'Ethene, C₂H₄', MX + 0.2, 1.4, 3.5, 0.4, { size: 18, bold: true, color: C.maroon });
  chain(s, MX + 0.4, 2.55, ...S.ethene);
  txt(s, 'Propene, C₃H₆', MX + 4.2, 1.4, 3.5, 0.4, { size: 18, bold: true, color: C.maroon });
  chain(s, MX + 4.4, 2.55, ...S.propene);
  const tw = 7.2;
  table(s, MX, 3.6, [tw * 0.4, tw * 0.3, tw * 0.3], ['Alkene', 'Formula', 'Carbons'], [['ethene', 'C₂H₄', '2'], ['propene', 'C₃H₆', '3'], ['butene', 'C₄H₈', '4'], ['pentene', 'C₅H₁₀', '5']], { rh: 0.55, hh: 0.55, size: 16, align: ['left', 'center', 'center'] });
  const bx = MX + 7.8, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Alkenes', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['General formula **CₙH₂ₙ**.', '**Unsaturated**: two fewer H than the alkane.', 'Functional group: **C=C**.', 'Burn with a **smoky flame**: **incomplete combustion**.', 'Note: there is **no** "methene" (it needs 2 carbons for C=C).'], 16, 0.13);
  notes(s, 'Spec 4.7.2.1: "Alkenes are hydrocarbons with a double carbon-carbon bond. The general formula for the homologous series of alkenes is CnH2n. Alkene molecules are unsaturated because they contain two fewer hydrogen atoms than the alkane with the same number of carbon atoms. The first four members of the homologous series of alkenes are ethene, propene, butene and pentene. Alkene molecules can be represented in the following forms: C3H6 or [displayed]." Students do not need to know the names of individual isomers. The H counts in each drawing are checked in the build script.');
}

{
  const s = frame('Addition reactions of alkenes', { tag: '4.7.2.2' });
  note(s, MX, 1.4, W - 2 * MX, 0.8, 'The C=C bond **opens up** and atoms **add** across it. The product has **only single bonds** (saturated).', { fill: C.soft, line: C.line, size: 17 });
  const tw = W - 2 * MX;
  table(s, MX, 2.4, [tw * 0.19, tw * 0.37, tw * 0.22, tw * 0.22], ['Add', 'Equation (ethene)', 'Product', 'Conditions'], [
    ['hydrogen', 'C₂H₄ + H₂ → C₂H₆', 'ethane (alkane)', '**nickel** catalyst, ~150 °C'],
    ['water (steam)', 'C₂H₄ + H₂O → C₂H₅OH', 'ethanol (alcohol)', 'high temp. and pressure, **acid catalyst**'],
    ['bromine', 'C₂H₄ + Br₂ → C₂H₄Br₂', 'dibromoethane', 'room temperature'],
    ['chlorine', 'C₂H₄ + Cl₂ → C₂H₄Cl₂', 'dichloroethane', 'room temperature'],
  ], { rh: 0.72, size: 16 });
  note(s, MX, 5.95, tw, 0.9, 'Reaction with bromine is why **bromine water decolourises**: the orange Br₂ is used up.', { size: 17 });
  notes(s, 'Spec 4.7.2.2: "Alkenes react with oxygen in combustion reactions in the same way as other hydrocarbons, but they tend to burn in air with smoky flames because of incomplete combustion. Alkenes react with hydrogen, water and the halogens, by the addition of atoms across the carbon-carbon double bond so that the double bond becomes a single carbon-carbon bond. Students should be able to: describe the reactions and conditions for the addition of hydrogen, water and halogens to alkenes; draw fully displayed structural formulae of the first four members of the alkenes and the products of their addition reactions with hydrogen, water, chlorine, bromine and iodine." All equations checked by atom counting.');
}

D.myTurnYourTurn({
  title: 'Addition reactions', tag: 'Skill practice', stepSize: 18, labelW: 2.0, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Complete the equation:',
    steps: [
      { label: 'propene + bromine', text: 'C₃H₆ + Br₂ → **C₃H₆Br₂**' },
      { label: 'propene + hydrogen', text: 'C₃H₆ + H₂ → **C₃H₈**' },
    ],
  },
  yours: {
    q: 'Complete the equation:',
    steps: [
      { label: 'butene + steam', text: 'C₄H₈ + H₂O → **C₄H₉OH**' },
      { label: 'ethene + oxygen', text: 'C₂H₄ + **3**O₂ → **2CO₂ + 2H₂O**' },
    ],
  },
  notes: 'Addition: the product contains all the atoms of both reactants. All checked by atom counting.',
});

D.hinge({
  title: 'Quick check',
  q: 'What is made when ethene reacts with steam?',
  options: ['Ethanol', 'Ethane', 'Ethanoic acid', 'Ethyl ethanoate'],
  correct: 0,
  notes: 'Answer A: C₂H₄ + H₂O → C₂H₅OH (with a catalyst). B is made with hydrogen. C is made by oxidising ethanol. D is an ester.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: alcohols', { tag: '4.7.2.3' });
  txt(s, 'Ethanol, C₂H₅OH', MX + 0.2, 1.4, 4, 0.4, { size: 18, bold: true, color: C.maroon });
  chain(s, MX + 0.4, 2.55, ...S.ethanol);
  const tw = 6.8;
  table(s, MX, 3.6, [tw * 0.45, tw * 0.55], ['Alcohol', 'Formula'], [['methanol', 'CH₃OH'], ['ethanol', 'C₂H₅OH'], ['propanol', 'C₃H₇OH'], ['butanol', 'C₄H₉OH']], { rh: 0.55, hh: 0.55, size: 16, align: ['left', 'center'] });
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Reactions and uses', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Functional group **–OH**.', '**Sodium**: fizzes, gives **hydrogen**.', '**Burn** in air: CO₂ + water (used as **fuels**).', '**Dissolve** in water: **neutral** solution.', '**Oxidised** (e.g. by acidified potassium dichromate) to a **carboxylic acid**.', 'Uses: fuels, **solvents**, ethanol in **drinks**.'], 15, 0.08);
  notes(s, 'Spec 4.7.2.3: "Alcohols contain the functional group –OH. Methanol, ethanol, propanol and butanol are the first four members of a homologous series of alcohols. Alcohols can be represented in the following forms: CH3CH2OH or C2H5OH or [displayed]. Students should be able to: describe what happens when any of the first four alcohols react with sodium, burn in air, are added to water, react with an oxidising agent; recall the main uses of these alcohols." 2C₂H₅OH + 2Na → 2C₂H₅ONa + H₂ and C₂H₅OH + 3O₂ → 2CO₂ + 3H₂O are checked in the build script.');
}

{
  const s = frame('Making ethanol: fermentation', { tag: '4.7.2.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 24, bold: true, valign: 'middle', align: 'center' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.65, cw, 2.7, 'Conditions', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 3.35, cw - 0.4, ['Sugar solution + **yeast** (enzymes).', 'Warm: **25–35 °C** (enzymes work best).', '**No oxygen** (anaerobic), so ethanol is not oxidised.'], 16, 0.12);
  headCard(s, MX + cw + gap, 2.65, cw, 2.7, 'Compare with hydration of ethene', C.maroon, C.soft);
  bullets(s, MX + cw + gap + 0.2, 3.35, cw - 0.4, ['Fermentation: **renewable** sugar, low temperature, but **slow** and **impure** (about 15%).', 'Hydration: **fast**, **pure**, but uses **crude oil** and lots of energy.'], 16, 0.12);
  note(s, MX, 5.6, W - 2 * MX, 1.25, 'Atom economy (4.3): hydration **100%**; fermentation **51%**. A good exam answer weighs both sides.', { size: 17 });
  notes(s, 'Spec 4.7.2.3: "Aqueous solutions of ethanol are produced when sugar solutions are fermented using yeast. Students should know the conditions used for fermentation of sugar using yeast." Above about 35–40 °C the yeast enzymes denature; too cold, they work slowly.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is fermentation done without oxygen?',
  options: ['So the ethanol is not oxidised to ethanoic acid', 'To make the yeast work faster', 'Because oxygen would explode', 'To make carbon monoxide'],
  correct: 0,
  notes: 'Answer A: with air, ethanol oxidises to ethanoic acid (vinegar). B: anaerobic is slower for yeast growth. C and D are wrong.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: carboxylic acids', { tag: '4.7.2.4' });
  txt(s, 'Ethanoic acid, CH₃COOH', MX + 0.2, 1.4, 4.5, 0.4, { size: 18, bold: true, color: C.maroon });
  chain(s, MX + 0.4, 2.7, ...S.ethanoic);
  const tw = 6.8;
  table(s, MX, 3.75, [tw * 0.5, tw * 0.5], ['Acid', 'Formula'], [['methanoic acid', 'HCOOH'], ['ethanoic acid', 'CH₃COOH'], ['propanoic acid', 'C₂H₅COOH'], ['butanoic acid', 'C₃H₇COOH']], { rh: 0.55, hh: 0.55, size: 16, align: ['left', 'center'] });
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Reactions', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Functional group **–COOH**.', 'Dissolve in water: **acidic** solution (pH below 7).', 'React with **carbonates**: salt + water + **CO₂** (fizzing).', 'React with **alcohols** (acid catalyst) to make **esters**.', 'Ethanoic acid is in **vinegar**.'], 15, 0.1);
  notes(s, 'Spec 4.7.2.4: "Carboxylic acids have the functional group –COOH. The first four members of a homologous series of carboxylic acids are methanoic acid, ethanoic acid, propanoic acid and butanoic acid. The structures of carboxylic acids can be represented in the following forms: CH3COOH or [displayed]. Students should be able to: describe what happens when any of the first four carboxylic acids react with carbonates, dissolve in water, react with alcohols." 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂ (sodium ethanoate) is checked in the build script.');
}

{
  const s = frame('Why carboxylic acids are weak', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.9, 'Ethanoic acid (weak)', C.orange, C.orangeSoft);
  txt(s, 'Only **partially ionises** in water: most molecules stay as CH₃COOH; only a few release H⁺.', MX + 0.2, 2.1, cw - 0.4, 2.0, { size: 18 });
  headCard(s, MX + cw + gap, 1.4, cw, 2.9, 'Hydrochloric acid (strong)', C.red, 'FBEAEA');
  txt(s, '**Completely ionises**: every HCl molecule releases H⁺.', MX + cw + gap + 0.2, 2.1, cw - 0.4, 2.0, { size: 18 });
  note(s, MX, 4.55, W - 2 * MX, 2.3, 'So, at the **same concentration**, ethanoic acid has a **higher pH** (fewer H⁺ ions) and reacts **more slowly** with carbonates and metals. Link: 4.4.2.6 (strong and weak acids).', { size: 18 });
  notes(s, 'Spec 4.7.2.4 (HT): "Students should be able to explain why carboxylic acids are weak acids in terms of ionisation and pH (see Strong and weak acids)."');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: esters', { tag: '4.7.2.4' });
  rect(s, MX, 1.4, W - 2 * MX, 1.1, C.soft, C.line);
  txt(s, 'carboxylic acid + alcohol → **ester** + water     (acid catalyst, e.g. conc. sulfuric acid)', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.1, { size: 19, valign: 'middle', align: 'center' });
  txt(s, 'ethanoic acid + ethanol → ethyl ethanoate + water', MX, 2.75, W - 2 * MX, 0.45, { size: 20, bold: true, color: C.maroon, align: 'center' });
  txt(s, 'CH₃COOH + C₂H₅OH → CH₃COOC₂H₅ + H₂O', MX, 3.3, W - 2 * MX, 0.5, { size: 22, bold: true, align: 'center' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 4.1, cw, 2.75, 'Naming esters', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 4.8, cw - 0.4, ['First part from the **alcohol**: ethanol → **ethyl**.', 'Second part from the **acid**: ethanoic → **ethanoate**.'], 16, 0.12);
  headCard(s, MX + cw + gap, 4.1, cw, 2.75, 'Properties and uses', C.maroon, C.soft);
  bullets(s, MX + cw + gap + 0.2, 4.8, cw - 0.4, ['**Volatile**, **fruity** smells.', 'Used in **perfumes**, **flavourings** and as **solvents** (e.g. nail varnish remover).'], 16, 0.12);
  notes(s, 'Spec 4.7.2.4: "Ethyl ethanoate is the only ester students need to name and draw. Students should be able to recognise esters from their names and from the structure –COO–." The equation is checked by atom counting.');
}

D.myTurnYourTurn({
  title: 'Name and formula', tag: 'Skill practice', stepSize: 17, labelW: 2.2, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Give the name or formula:',
    steps: [
      { label: 'alcohol, 3 C', text: '**propanol**, C₃H₇OH' },
      { label: 'CH₃COOH', text: '**ethanoic acid**' },
      { label: 'Family of C₄H₈?', text: '**alkene** (butene)' },
    ],
  },
  yours: {
    q: 'Give the name or formula:',
    steps: [
      { label: 'acid, 3 C', text: '**propanoic acid**, C₂H₅COOH' },
      { label: 'C₄H₉OH', text: '**butanol**' },
      { label: 'ethanol + ethanoic acid ester', text: '**ethyl ethanoate**' },
    ],
  },
  notes: 'Watch the carboxylic acid formulae: propanoic acid has 3 carbons in total, but is written C₂H₅COOH. All formulae checked in the build script.',
});

D.hinge({
  title: 'Quick check',
  q: 'Which functional group is in all carboxylic acids?',
  options: ['–COOH', '–OH only', 'C=C', '–COO– between two chains'],
  correct: 0,
  notes: 'Answer A. B is alcohols. C is alkenes. D is esters.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['General formula of alkenes?', 'CₙH₂ₙ'], ['Catalyst for adding hydrogen to an alkene?', 'Nickel'], ['Functional group of alcohols?', '–OH'], ['What smell do esters have?', 'Fruity'],
    ['What do you see when sodium is added to ethanol?', 'Fizzing: hydrogen gas'], ['Ethanoic acid + sodium carbonate: products?', 'Sodium ethanoate, water, CO₂'],
    ['What is made when ethanol is oxidised?', 'Ethanoic acid'], ['Why do alkenes burn with a smoky flame?', 'Incomplete combustion'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) CₙH₂ₙ  2) nickel  3) –OH  4) fruity (volatile)  5) fizzing; hydrogen; sodium disappears  6) sodium ethanoate + water + carbon dioxide  7) ethanoic acid  8) incomplete combustion (higher proportion of carbon), so soot.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Ethene reacts with bromine. Write the equation and explain why this is called an addition reaction.', m: 3, lines: 1 },
    { l: 'b', q: 'Give the conditions for making ethanol by fermentation.', m: 2, lines: 0 },
    { l: 'c', q: 'Evaluate making ethanol by fermentation rather than by hydration of ethene.', m: 3, lines: 1 },
    { l: 'd', q: 'Explain why ethanoic acid reacts more slowly with magnesium than hydrochloric acid of the same concentration. (HT)', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'C₂H₄ + Br₂ → C₂H₄Br₂; bromine atoms add across the double bond; one product only / C=C becomes C–C', '3', ''],
    ['(b)', 'yeast; 25–35 °C and no oxygen (anaerobic)', '2', 'any two'],
    ['(c)', 'renewable sugar / low energy; but slow / impure / low atom economy (51%); hydration uses crude oil but fast and pure; conclusion', '3', ''],
    ['(d)', 'ethanoic acid is weak / only partially ionised; fewer H⁺ ions so fewer collisions per second', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Name the first four alkenes.', 'Write the equation for fermentation.', 'Name the ester from ethanol and ethanoic acid.', 'Ethanol + oxidising agent makes?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) ethene, propene, butene, pentene  2) C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂  3) ethyl ethanoate  4) ethanoic acid. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw displayed formulae for ethene, propene, ethanol and ethanoic acid.',
    'Write equations for ethene with hydrogen, steam and bromine; give conditions.',
    'Describe four reactions of ethanol.',
    'Write the equation for ethanoic acid with sodium carbonate.',
    'Explain how ethyl ethanoate is made and give two uses.',
    'Make a table: functional group, general formula and example for each family.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) see slides  2) see the addition table  3) with sodium (H₂), burning (CO₂ + H₂O), dissolving (neutral), oxidation (ethanoic acid)  4) 2CH₃COOH + Na₂CO₃ → 2CH₃COONa + H₂O + CO₂  5) ethanol + ethanoic acid with acid catalyst; perfumes, flavourings, solvents  6) alkanes C–C / CₙH₂ₙ₊₂; alkenes C=C / CₙH₂ₙ; alcohols –OH; carboxylic acids –COOH; esters –COO–.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.7_B_AlkenesAlcoholsAcids.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
