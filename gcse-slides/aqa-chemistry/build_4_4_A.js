// build_4_4_A.js — AQA GCSE Chemistry (8462) 4.4 Chemical changes, lesson 1 of 3:
// 4.4.1.1 Metal oxides, 4.4.1.2 The reactivity series, 4.4.1.3 Extraction of metals and reduction,
// 4.4.1.4 Oxidation and reduction in terms of electrons (HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_4_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, Mr, helpers } = require('./chem_common');

const D = T.init(deck('4.4.1', 'Reactivity and extracting metals'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
// reactivity order used on the slides (most reactive first)
const SERIES = ['K', 'Na', 'Li', 'Ca', 'Mg', 'C', 'Zn', 'Fe', 'H', 'Cu', 'Ag', 'Au'];
const above = (a, b) => SERIES.indexOf(a) < SERIES.indexOf(b);
const disp = (label, metal, ionOf, want) => calc('displace ' + label, above(metal, ionOf) ? 1 : 0, want);
disp('Mg/Cu', 'Mg', 'Cu', 1); disp('Zn/Cu', 'Zn', 'Cu', 1); disp('Fe/Cu', 'Fe', 'Cu', 1); disp('Cu/Mg', 'Cu', 'Mg', 0);
disp('Cu/Ag', 'Cu', 'Ag', 1); disp('Fe/Zn', 'Fe', 'Zn', 0); disp('Mg/Fe', 'Mg', 'Fe', 1); disp('Zn/Fe', 'Zn', 'Fe', 1); disp('Ag/Cu', 'Ag', 'Cu', 0);
calc('C reduces Fe', above('C', 'Fe') ? 1 : 0, 1); calc('C reduces Zn', above('C', 'Zn') ? 1 : 0, 1); calc('C cannot reduce Mg', above('C', 'Mg') ? 1 : 0, 0);
// equations
balanced('Mg+O2', [[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]);
balanced('Fe2O3+C', [[2, 'Fe2O3'], [3, 'C']], [[4, 'Fe'], [3, 'CO2']]);
balanced('CuO+C', [[2, 'CuO'], [1, 'C']], [[2, 'Cu'], [1, 'CO2']]);
balanced('ZnO+C', [[1, 'ZnO'], [1, 'C']], [[1, 'Zn'], [1, 'CO']]);
balanced('Mg+CuSO4', [[1, 'Mg'], [1, 'CuSO4']], [[1, 'MgSO4'], [1, 'Cu']]);
balanced('Zn+CuSO4', [[1, 'Zn'], [1, 'CuSO4']], [[1, 'ZnSO4'], [1, 'Cu']]);
balanced('Mg+FeSO4', [[1, 'Mg'], [1, 'FeSO4']], [[1, 'MgSO4'], [1, 'Fe']]);
balanced('Cu+AgNO3', [[1, 'Cu'], [2, 'AgNO3']], [[1, 'Cu(NO3)2'], [2, 'Ag']]);
balanced('Mg+HCl', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
balanced('Na+H2O', [[2, 'Na'], [2, 'H2O']], [[2, 'NaOH'], [1, 'H2']]);
balanced('Ca+H2O', [[1, 'Ca'], [2, 'H2O']], [[1, 'Ca(OH)2'], [1, 'H2']]);
// charge balance in ionic and half equations: [charges left], [charges right]
const q = (label, L, R) => calc('charge ' + label, L.reduce((a, b) => a + b, 0), R.reduce((a, b) => a + b, 0));
q('Mg+Cu2+', [0, 2], [2, 0]); q('Zn+Cu2+', [0, 2], [2, 0]); q('Mg+Fe2+', [0, 2], [2, 0]); q('Cu+2Ag+', [0, 1, 1], [2, 0, 0]);
q('half Mg', [0], [2, -2]); q('half Cu', [2, -2], [0]); q('half Zn', [0], [2, -2]); q('half Fe', [2, -2], [0]); q('half Ag', [1, -1], [0]);
// reacting mass for extraction (link to 4.3)
near('Fe2O3 320 g', 320 / Mr('Fe2O3'), 2); near('Fe 224 g', 4 * Mr('Fe'), 224);
near('exam Fe from 80 g', 80 / Mr('Fe2O3') * 2 * Mr('Fe'), 56);

// ======================= drawings =======================
const LADDER = [['Potassium', 'K', 'E74C3C'], ['Sodium', 'Na', 'E8664A'], ['Lithium', 'Li', 'EA7F57'], ['Calcium', 'Ca', 'EC9963'], ['Magnesium', 'Mg', 'EFB070'], ['(Carbon)', 'C', '9E9E9E'], ['Zinc', 'Zn', 'C9D27C'], ['Iron', 'Fe', 'A9C98A'], ['(Hydrogen)', 'H', 'B0BEC5'], ['Copper', 'Cu', '8FBFAE'], ['Silver', 'Ag', 'A7C6D9'], ['Gold', 'Au', 'C5D3E8']];
function ladder(s, x, y, w, rh) {
  LADDER.forEach(([n, sym, c], i) => {
    rect(s, x, y + i * rh, w, rh - 0.04, c, c);
    txt(s, `${n}  ${sym}`, x + 0.15, y + i * rh, w - 0.3, rh - 0.04, { size: 14, bold: true, valign: 'middle', italic: sym === 'C' || sym === 'H' });
  });
  arrow(s, x + w + 0.25, y + LADDER.length * rh, x + w + 0.25, y, C.red, 2.5);
  txt(s, 'more reactive', x + w + 0.35, y + 0.1, 1.4, 0.6, { size: 13, bold: true, color: C.red });
}
function label(s, t, x, y, w = 2.4, o = {}) { txt(s, t, x, y, w, 0.34, Object.assign({ size: 13, bold: true }, o)); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Metal oxides, the reactivity series, displacement, extracting metals with carbon, and oxidation and reduction',
  bullets: ['Part 1: metal oxides; oxidation and reduction (4.4.1.1)', 'Part 2: the reactivity series and displacement (4.4.1.2)', 'Part 3: extracting metals (4.4.1.3)', 'Part 4: electrons, ionic and half equations (4.4.1.4, HT)'],
  notes: 'AQA 8462 GCSE Chemistry 4.4 Chemical changes, lesson 1 of 3. Lesson 2: acids, salts, pH, neutralisation and titration (RP1 salts, RP2 titration). Lesson 3: electrolysis (RP3). About two hours.',
});

D.objectives({
  tag: '4.4.1',
  items: [
    'Define **oxidation** and **reduction** in terms of **oxygen**.',
    'Use the **reactivity series** to predict reactions and **displacement**.',
    'Explain how metals are **extracted** using **carbon**.',
    'Write **ionic** and **half equations** and use **OIL RIG** (HT).',
  ],
  keywords: ['oxidation', 'reduction', 'reactivity series', 'displacement', 'ore', 'half equation'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What ion does magnesium form?', 'Balance: Fe₂O₃ + C → Fe + CO₂', 'Which is more reactive: sodium or lithium?', 'What is made when a metal reacts with water?'],
  answers: ['Mg²⁺', '2Fe₂O₃ + 3C → 4Fe + 3CO₂', 'sodium', 'metal hydroxide + hydrogen'],
  notes: 'Retrieval from 4.1 (group 1, ions) and 4.3 (balancing).',
});

D.vocab({
  title: 'Key words', tag: '4.4.1',
  items: [
    { term: 'Oxidation', def: '**Gain of oxygen** (HT: **loss of electrons**).' },
    { term: 'Reduction', def: '**Loss of oxygen** (HT: **gain of electrons**).' },
    { term: 'Ore', def: 'A rock containing enough of a metal compound to make **extracting** the metal **worthwhile**.' },
    { term: 'Displacement', def: 'A **more reactive** metal takes the place of a **less reactive** metal in a compound.' },
  ],
  notes: 'Spec 4.4.1.1 and 4.4.1.3.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: metal oxides', { tag: '4.4.1.1' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'Metals react with **oxygen** to make **metal oxides**. This is **oxidation**: the metal **gains oxygen**.', { fill: C.soft, line: C.line, size: 18 });
  txt(s, '2Mg(s) + O₂(g) → 2MgO(s)', MX, 2.45, W - 2 * MX, 0.5, { size: 22, bold: true, align: 'center' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 3.2, cw, 2.2, 'Oxidation', C.red, 'FBEAEA');
  txt(s, 'A substance **gains oxygen**.\ne.g. magnesium is oxidised to magnesium oxide.', MX + 0.2, 3.9, cw - 0.4, 1.4, { size: 18 });
  headCard(s, MX + cw + gap, 3.2, cw, 2.2, 'Reduction', C.blue, C.blueSoft);
  txt(s, 'A substance **loses oxygen**.\ne.g. copper oxide is reduced to copper.', MX + cw + gap + 0.2, 3.9, cw - 0.4, 1.4, { size: 18 });
  note(s, MX, 5.65, W - 2 * MX, 1.2, 'In **2CuO + C → 2Cu + CO₂**, copper oxide is **reduced** (loses oxygen) and carbon is **oxidised** (gains oxygen). Oxidation and reduction happen **together**.', { size: 17 });
  notes(s, 'Spec 4.4.1.1: "Metals react with oxygen to produce metal oxides. The reactions are oxidation reactions because the metals gain oxygen. Students should be able to explain reduction and oxidation in terms of loss or gain of oxygen." Both equations checked by atom counting.');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the reactivity series', { tag: '4.4.1.2' });
  ladder(s, MX, 1.4, 3.0, 0.45);
  const bx = MX + 5.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.55, 'Why metals differ', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['When metals react they form **positive ions**.', 'The **more easily** a metal loses electrons to form a positive ion, the **more reactive** it is.', 'Carbon and hydrogen are non-metals, shown for comparison.'], 16, 0.1);
  table(s, bx, 4.15, [bw * 0.3, bw * 0.35, bw * 0.35], ['Metal', 'With water', 'With dilute acid'], [
    ['K, Na, Li, Ca', 'fizz; H₂ + hydroxide', 'dangerously violent'], ['Mg, Zn, Fe', 'very slow / steam only', 'fizz; H₂ + salt'], ['Cu, Ag, Au', 'no reaction', 'no reaction'],
  ], { rh: 0.62, size: 15 });
  notes(s, 'Spec 4.4.1.2: "When metals react with other substances the metal atoms form positive ions. The reactivity of a metal is related to its tendency to form positive ions. Metals can be arranged in order of their reactivity in a reactivity series. The metals potassium, sodium, lithium, calcium and magnesium can be compared by their reactions with water and dilute acids." Equations: 2Na + 2H₂O → 2NaOH + H₂; Ca + 2H₂O → Ca(OH)₂ + H₂; Mg + 2HCl → MgCl₂ + H₂ (all checked). Students should be able to recall and describe the reactions, if any, of potassium, sodium, lithium, calcium, magnesium, zinc, iron and copper with water or dilute acids.');
}

{
  const s = frame('Displacement reactions', { tag: '4.4.1.2' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'A **more reactive** metal **displaces** a **less reactive** metal from a solution of its salt.', { fill: C.soft, line: C.line, size: 18 });
  const tw = 7.4, cws = [2.0, (tw - 2.0) / 3, (tw - 2.0) / 3, (tw - 2.0) / 3];
  table(s, MX, 2.5, cws, ['Metal added', 'MgSO₄', 'FeSO₄', 'CuSO₄'], [
    ['Magnesium', '—', '✓ iron forms', '✓ copper forms'], ['Iron', '✗', '—', '✓ copper forms'], ['Copper', '✗', '✗', '—'],
  ], { rh: 0.72, size: 16, align: ['left', 'center', 'center', 'center'] });
  txt(s, '✓ = reaction (displacement)   ✗ = no reaction', MX, 5.25, tw, 0.4, { size: 14, italic: true, color: C.grey });
  const bx = MX + 7.8, bw = W - MX - bx;
  rect(s, bx, 2.5, bw, 4.35, C.orangeSoft, 'F3D9B5');
  txt(s, 'Magnesium + copper sulfate', bx + 0.25, 2.6, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, 'Mg + CuSO₄ → MgSO₄ + Cu', bx + 0.25, 3.05, bw - 0.5, 0.45, { size: 18, bold: true });
  bullets(s, bx + 0.25, 3.7, bw - 0.5, ['Blue solution **fades**.', '**Brown/pink** copper forms on the magnesium.', 'Temperature **rises** (exothermic).', 'The **bigger the gap** in reactivity, the more vigorous the reaction.'], 16, 0.1);
  notes(s, 'Spec 4.4.1.2: "Students should be able to deduce an order of reactivity of metals based on experimental results." Predict before revealing: copper does not displace iron or magnesium. Equations checked by atom counting.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which pair will react?',
  options: ['Zinc + iron sulfate solution', 'Copper + zinc sulfate solution', 'Iron + magnesium sulfate solution', 'Silver + copper sulfate solution'],
  correct: 0,
  notes: 'Answer A: zinc is above iron, so it displaces it. B, C and D all have the less reactive metal added to a salt of a more reactive metal, so no reaction.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: extracting metals', { tag: '4.4.1.3' });
  ladder(s, MX, 1.4, 3.0, 0.45);
  // brackets showing methods
  const bx0 = MX + 4.75;
  seg(s, bx0, 1.45, bx0, 1.4 + 5 * 0.45 - 0.05, C.ink, 2); txt(s, 'electrolysis', bx0 + 0.1, 1.4 + 1.6, 1.6, 0.4, { size: 14, bold: true, color: C.maroon });
  seg(s, bx0, 1.4 + 6 * 0.45, bx0, 1.4 + 10 * 0.45 - 0.05, C.ink, 2); txt(s, 'reduction with carbon', bx0 + 0.1, 1.4 + 7.4 * 0.45, 1.5, 0.6, { size: 14, bold: true, color: C.maroon });
  seg(s, bx0, 1.4 + 10 * 0.45, bx0, 1.4 + 12 * 0.45 - 0.05, C.ink, 2); txt(s, 'found as the metal', bx0 + 0.1, 1.4 + 10.3 * 0.45, 1.5, 0.6, { size: 14, bold: true, color: C.maroon });
  const bx = MX + 6.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.1, 'Choosing a method', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Gold** is so unreactive it is found **as the metal**.', 'Metals **below carbon** are extracted by **reduction with carbon**: carbon removes the oxygen.', 'Metals **above carbon** must be extracted by **electrolysis** (lesson 3).'], 16, 0.12);
  rect(s, bx, 4.7, bw, 2.15, C.orangeSoft, 'F3D9B5');
  txt(s, 'Iron in the blast furnace', bx + 0.25, 4.8, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, '2Fe₂O₃ + 3C → 4Fe + 3CO₂', bx + 0.25, 5.25, bw - 0.5, 0.45, { size: 18, bold: true });
  txt(s, 'Iron oxide is **reduced**; carbon is **oxidised**. 320 g of Fe₂O₃ gives 224 g of iron.', bx + 0.25, 5.75, bw - 0.5, 1.0, { size: 15 });
  notes(s, 'Spec 4.4.1.3: "Unreactive metals such as gold are found in the Earth as the metal itself but most metals are found as compounds that require chemical reactions to extract the metal. Metals less reactive than carbon can be extracted from their oxides by reduction with carbon. Reduction involves the loss of oxygen. Knowledge and understanding are limited to the reduction of oxides using carbon. Knowledge of the details of processes used in the extraction of metals is not required." Students should be able to interpret or evaluate specific metal extraction processes when given appropriate information. 320 g = 2 mol Fe₂O₃ gives 4 mol Fe = 224 g (checked). Zinc: ZnO + C → Zn + CO.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why can magnesium not be extracted by heating its oxide with carbon?',
  options: ['Magnesium is more reactive than carbon', 'Magnesium oxide does not contain oxygen', 'Carbon is a metal', 'Magnesium is found as the metal'],
  correct: 0,
  notes: 'Answer A: carbon can only remove oxygen from metals less reactive than itself. B: it does. C: carbon is a non-metal. D: that is gold.',
});

// ---------------- Part 4 (HT) ----------------
{
  const s = frame('Part 4: oxidation and reduction with electrons', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.1, C.redSoft || 'FBEAEA', C.red, { lw: 2 });
  txt(s, '**O**xidation **I**s **L**oss of electrons      **R**eduction **I**s **G**ain of electrons      (**OIL RIG**)', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.1, { size: 22, valign: 'middle', align: 'center' });
  txt(s, 'Mg + CuSO₄ → MgSO₄ + Cu', MX, 2.75, 6.2, 0.45, { size: 19, bold: true });
  txt(s, 'Ionic equation (SO₄²⁻ is a spectator ion):', MX, 3.3, 6.2, 0.4, { size: 16, color: C.grey });
  txt(s, 'Mg(s) + Cu²⁺(aq) → Mg²⁺(aq) + Cu(s)', MX, 3.75, 6.2, 0.5, { size: 20, bold: true });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 4.55, cw, 2.3, 'Oxidised: magnesium', C.red, 'FBEAEA');
  txt(s, 'Mg → Mg²⁺ + 2e⁻', MX + 0.2, 5.25, cw - 0.4, 0.5, { size: 22, bold: true });
  txt(s, 'Mg **loses** 2 electrons.', MX + 0.2, 5.85, cw - 0.4, 0.5, { size: 17 });
  headCard(s, MX + cw + gap, 4.55, cw, 2.3, 'Reduced: copper ions', C.blue, C.blueSoft);
  txt(s, 'Cu²⁺ + 2e⁻ → Cu', MX + cw + gap + 0.2, 5.25, cw - 0.4, 0.5, { size: 22, bold: true });
  txt(s, 'Cu²⁺ **gains** 2 electrons.', MX + cw + gap + 0.2, 5.85, cw - 0.4, 0.5, { size: 17 });
  note(s, MX + 6.6, 2.75, W - MX - (MX + 6.6), 1.55, 'A reaction where oxidation and reduction both happen is a **redox** reaction. **Charges balance** on each side.', { size: 16 });
  notes(s, 'Spec 4.4.1.4 (HT): "Oxidation is the loss of electrons and reduction is the gain of electrons. Student should be able to: write ionic equations for displacement reactions; identify in a given reaction, symbol equation or half equation which species are oxidised and which are reduced." Charges: left 0 + 2 = +2; right +2 + 0 = +2. Half equations: Mg (0) → Mg²⁺ (+2) + 2e⁻ (−2), total 0.');
}

D.myTurnYourTurn({
  title: 'Ionic and half equations', tag: 'HT • Skill practice', stepSize: 17, labelW: 1.4, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Zn + CuSO₄ → ZnSO₄ + Cu',
    steps: [
      { label: 'Ionic', text: 'Zn + Cu²⁺ → Zn²⁺ + Cu' },
      { label: 'Oxidised', text: 'Zn → Zn²⁺ + 2e⁻' },
      { label: 'Reduced', text: 'Cu²⁺ + 2e⁻ → Cu' },
    ],
  },
  yours: {
    q: 'Mg + FeSO₄ → MgSO₄ + Fe',
    steps: [
      { label: 'Ionic', text: 'Mg + Fe²⁺ → Mg²⁺ + Fe' },
      { label: 'Oxidised', text: 'Mg → Mg²⁺ + 2e⁻' },
      { label: 'Reduced', text: 'Fe²⁺ + 2e⁻ → Fe' },
    ],
  },
  notes: 'Extension: Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag. Ionic: Cu + 2Ag⁺ → Cu²⁺ + 2Ag. Half equations: Cu → Cu²⁺ + 2e⁻ and Ag⁺ + e⁻ → Ag (×2). All atoms and charges checked in the build script.',
});

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'In Fe + Cu²⁺ → Fe²⁺ + Cu, which species is reduced?',
  options: ['Cu²⁺', 'Fe', 'Fe²⁺', 'Cu'],
  correct: 0,
  notes: 'Answer A: Cu²⁺ gains 2 electrons (RIG). B: Fe loses electrons, so it is oxidised. C and D are products.',
});
q('hinge Fe+Cu2+', [0, 2], [2, 0]);

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Define oxidation in terms of oxygen.', 'Gain of oxygen'], ['Name a metal found as the element.', 'Gold'], ['Which is more reactive: zinc or iron?', 'Zinc'], ['How are metals above carbon extracted?', 'Electrolysis'],
    ['Iron is added to copper sulfate. What do you see?', 'Blue fades; brown copper forms'], ['Why does copper not react with dilute acid?', 'It is below hydrogen (less reactive)'],
    ['ZnO + C → Zn + CO. What is reduced?', 'Zinc oxide'], ['Write the half equation for Ag⁺ becoming Ag. (HT)', 'Ag⁺ + e⁻ → Ag'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) gain of oxygen  2) gold (also some silver, platinum)  3) zinc  4) electrolysis  5) blue solution fades, brown/pink copper coats the iron, gets warm  6) it is less reactive than hydrogen  7) zinc oxide (loses oxygen); carbon is oxidised  8) Ag⁺ + e⁻ → Ag (reduction).');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'A student adds metals X, Y and Z to solutions of each other’s salts. X displaces Y and Z. Z displaces Y. Give the order of reactivity, most reactive first.', m: 1, lines: 0 },
    { l: 'b', q: 'Iron is extracted from iron oxide using carbon: 2Fe₂O₃ + 3C → 4Fe + 3CO₂. Explain why this is a reduction, and why carbon can be used.', m: 3, lines: 1 },
    { l: 'c', q: 'Calculate the maximum mass of iron from 80 g of Fe₂O₃. (HT)', m: 2, lines: 1 },
    { l: 'd', q: 'Zinc reacts with copper sulfate. Write the ionic equation and both half equations. Identify what is oxidised. (HT)', m: 4, lines: 2 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'X, Z, Y', '1', ''],
    ['(b)', 'iron oxide loses oxygen; carbon is more reactive than iron; so carbon removes the oxygen (carbon is oxidised)', '3', ''],
    ['(c)', '80 ÷ 160 = 0.5 mol; × 2 = 1 mol Fe = 56 g', '2', ''],
    ['(d)', 'Zn + Cu²⁺ → Zn²⁺ + Cu; Zn → Zn²⁺ + 2e⁻; Cu²⁺ + 2e⁻ → Cu; zinc is oxidised (loses electrons)', '4', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Define reduction in terms of oxygen.', 'Will copper displace silver from silver nitrate?', 'Why is aluminium extracted by electrolysis?', 'What does OIL RIG stand for? (HT)'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) loss of oxygen  2) yes, copper is more reactive than silver  3) it is more reactive than carbon  4) oxidation is loss (of electrons), reduction is gain. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Learn the reactivity series: K Na Li Ca Mg (C) Zn Fe (H) Cu Ag Au.',
    'Describe how K, Na and Li react with water. Write one equation.',
    'Predict and explain: zinc + copper sulfate; copper + zinc sulfate.',
    'Explain why gold is found as the metal but iron is not.',
    'In 2CuO + C → 2Cu + CO₂, name what is oxidised and what is reduced.',
    'HT: write the ionic and half equations for Cu + 2AgNO₃ → Cu(NO₃)₂ + 2Ag.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) learn  2) all float and fizz; K lilac flame, most vigorous; 2Na + 2H₂O → 2NaOH + H₂  3) Zn displaces Cu (Zn more reactive); no reaction for Cu + ZnSO₄  4) gold is very unreactive so does not form compounds; iron reacts with oxygen and is found as oxides  5) carbon is oxidised; copper oxide is reduced  6) Cu + 2Ag⁺ → Cu²⁺ + 2Ag; Cu → Cu²⁺ + 2e⁻; Ag⁺ + e⁻ → Ag.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.4_A_ReactivityExtraction.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
