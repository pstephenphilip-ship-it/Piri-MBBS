// build_4_4_C.js — AQA GCSE Chemistry (8462) 4.4 Chemical changes, lesson 3 of 3:
// 4.4.3.1 The process of electrolysis, 4.4.3.2 Electrolysis of molten ionic compounds,
// 4.4.3.3 Using electrolysis to extract metals, 4.4.3.4 Electrolysis of aqueous solutions (RP3),
// 4.4.3.5 Representation of reactions at electrodes as half equations (HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_4_C.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.4.3', 'Electrolysis'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= checks =======================
// products of electrolysis of aqueous solutions (GCSE rules)
const SERIES = ['K', 'Na', 'Li', 'Ca', 'Mg', 'Al', 'Zn', 'Fe', 'H', 'Cu', 'Ag', 'Au'];
const cathode = metal => (SERIES.indexOf(metal) > SERIES.indexOf('H') ? metal : 'H2');
const anode = anion => ({ Cl: 'Cl2', Br: 'Br2', I: 'I2' }[anion] || 'O2');
const prod = (label, metal, anion, c, a) => { calc('cathode ' + label, cathode(metal) === c ? 1 : 0, 1); calc('anode ' + label, anode(anion) === a ? 1 : 0, 1); };
prod('CuSO4', 'Cu', 'SO4', 'Cu', 'O2'); prod('NaCl', 'Na', 'Cl', 'H2', 'Cl2'); prod('CuCl2', 'Cu', 'Cl', 'Cu', 'Cl2'); prod('Na2SO4', 'Na', 'SO4', 'H2', 'O2');
prod('KBr', 'K', 'Br', 'H2', 'Br2'); prod('AgNO3', 'Ag', 'NO3', 'Ag', 'O2'); prod('KI', 'K', 'I', 'H2', 'I2'); prod('H2SO4', 'H', 'SO4', 'H2', 'O2');
prod('MgCl2', 'Mg', 'Cl', 'H2', 'Cl2'); prod('CuBr2', 'Cu', 'Br', 'Cu', 'Br2');
// half equations: atoms (ignoring electrons) and charges balance
const half = (label, L, R, qL, qR) => { balanced('half ' + label, L, R); calc('charge ' + label, qL, qR); };
half('Pb2+', [[1, 'Pb']], [[1, 'Pb']], 2 - 2, 0); half('Br-', [[2, 'Br']], [[1, 'Br2']], -2, 0 - 2);
half('Al3+', [[1, 'Al']], [[1, 'Al']], 3 - 3, 0); half('O2-', [[2, 'O']], [[1, 'O2']], -4, 0 - 4);
half('Cu2+', [[1, 'Cu']], [[1, 'Cu']], 2 - 2, 0); half('Cl-', [[2, 'Cl']], [[1, 'Cl2']], -2, -2);
half('H+', [[2, 'H']], [[1, 'H2']], 2 - 2, 0); half('OH-', [[4, 'OH']], [[1, 'O2'], [2, 'H2O']], -4, -4);
half('Na+', [[1, 'Na']], [[1, 'Na']], 1 - 1, 0); half('Ag+', [[1, 'Ag']], [[1, 'Ag']], 1 - 1, 0); half('I-', [[2, 'I']], [[1, 'I2']], -2, -2);
balanced('PbBr2', [[1, 'PbBr2']], [[1, 'Pb'], [1, 'Br2']]); balanced('Al2O3', [[2, 'Al2O3']], [[4, 'Al'], [3, 'O2']]); balanced('anode C', [[1, 'C'], [1, 'O2']], [[1, 'CO2']]);
// electrons: 4 Al³⁺ need 12 e⁻; 6 O²⁻ give 12 e⁻
calc('electron balance Al2O3', 4 * 3, 6 * 2);

// ======================= drawings =======================
function cell(s, x, y, w, h, o = {}) {
  // beaker with electrolyte
  rect(s, x + 0.04, y + 0.75, w - 0.08, h - 0.79, o.fill || 'D6E8F7', o.fill || 'D6E8F7');
  seg(s, x, y + 0.3, x, y + h, C.ink, 2); seg(s, x + w, y + 0.3, x + w, y + h, C.ink, 2); seg(s, x, y + h, x + w, y + h, C.ink, 2);
  const ax = x + w * 0.28, cx = x + w * 0.72;
  rect(s, ax - 0.12, y - 0.15, 0.24, h - 0.5, '555555', '333333');
  rect(s, cx - 0.12, y - 0.15, 0.24, h - 0.5, '555555', '333333');
  // wires and power supply
  seg(s, ax, y - 0.15, ax, y - 0.7, C.ink, 2); seg(s, cx, y - 0.15, cx, y - 0.7, C.ink, 2);
  seg(s, ax, y - 0.7, x + w / 2 - 0.25, y - 0.7, C.ink, 2); seg(s, x + w / 2 + 0.25, y - 0.7, cx, y - 0.7, C.ink, 2);
  seg(s, x + w / 2 - 0.25, y - 0.95, x + w / 2 - 0.25, y - 0.45, C.ink, 2.5); seg(s, x + w / 2 + 0.25, y - 0.85, x + w / 2 + 0.25, y - 0.55, C.ink, 4);
  txt(s, '+', x + w / 2 - 0.6, y - 1.15, 0.35, 0.35, { size: 16, bold: true, color: C.red, align: 'center' });
  txt(s, '−', x + w / 2 + 0.25, y - 1.15, 0.35, 0.35, { size: 16, bold: true, color: C.blue, align: 'center' });
  txt(s, 'anode (+)', ax - 1.0, y + h + 0.08, 2.0, 0.35, { size: 14, bold: true, color: C.red, align: 'center' });
  txt(s, 'cathode (−)', cx - 1.0, y + h + 0.08, 2.0, 0.35, { size: 14, bold: true, color: C.blue, align: 'center' });
  if (o.ions) {
    circle(s, x + w * 0.5, y + h * 0.55, 0.36, 'B9D3EE', C.blue, 1); txt(s, '+', x + w * 0.5 - 0.18, y + h * 0.55 - 0.18, 0.36, 0.36, { size: 13, bold: true, align: 'center', valign: 'middle' });
    arrow(s, x + w * 0.5 + 0.2, y + h * 0.55, cx - 0.2, y + h * 0.55, C.blue, 2);
    circle(s, x + w * 0.5, y + h * 0.8, 0.36, 'C9E7B5', C.green, 1); txt(s, '−', x + w * 0.5 - 0.18, y + h * 0.8 - 0.18, 0.36, 0.36, { size: 13, bold: true, align: 'center', valign: 'middle' });
    arrow(s, x + w * 0.5 - 0.2, y + h * 0.8, ax + 0.2, y + h * 0.8, C.green, 2);
  }
}
function label(s, t, x, y, w = 2.4, o = {}) { txt(s, t, x, y, w, 0.34, Object.assign({ size: 14, bold: true }, o)); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'How electrolysis works, molten compounds, extracting aluminium, aqueous solutions, required practical 3 and half equations at the electrodes',
  bullets: ['Part 1: the process of electrolysis (4.4.3.1, 4.4.3.2)', 'Part 2: extracting aluminium (4.4.3.3)', 'Part 3: aqueous solutions and RP3 (4.4.3.4)', 'Part 4: half equations at the electrodes (4.4.3.5, HT)'],
  notes: 'AQA 8462 GCSE Chemistry 4.4, lesson 3 of 3. Builds on ionic bonding (4.2), reactivity (lesson 1) and OIL RIG. Diagrams are simplified. About two hours.',
});

D.objectives({
  tag: '4.4.3',
  items: [
    'Explain why ionic compounds must be **molten or dissolved** to be electrolysed.',
    'Predict the products of electrolysing **molten** compounds and **aqueous solutions**.',
    'Explain how **aluminium** is extracted and why it is **expensive**.',
    'Write **half equations** at each electrode (HT).',
  ],
  keywords: ['electrolysis', 'electrolyte', 'electrode', 'anode', 'cathode', 'cryolite'],
  notes: 'Share the objectives. Memory aid: PANIC (positive anode, negative is cathode).',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Why does molten NaCl conduct but solid NaCl does not?', 'Define reduction in terms of electrons.', 'Which is more reactive: copper or hydrogen?', 'Write the formula of the bromide ion.'],
  answers: ['ions free to move', 'gain of electrons', 'hydrogen', 'Br⁻'],
  notes: 'Retrieval from 4.2 (ionic properties) and lesson 1 (OIL RIG, reactivity).',
});

D.vocab({
  title: 'Key words', tag: '4.4.3',
  items: [
    { term: 'Electrolysis', def: 'Using **electricity** to **break down** an ionic compound that is **molten or dissolved**.' },
    { term: 'Electrolyte', def: 'The **liquid or solution** that conducts. It contains ions that are **free to move**.' },
    { term: 'Cathode', def: 'The **negative** electrode. **Positive ions** move to it and **gain** electrons.' },
    { term: 'Anode', def: 'The **positive** electrode. **Negative ions** move to it and **lose** electrons.' },
  ],
  notes: 'Spec 4.4.3.1.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: how electrolysis works', { tag: '4.4.3.1' });
  cell(s, MX + 0.6, 2.6, 4.2, 3.0, { ions: true });
  txt(s, '+ ions → cathode     − ions → anode', MX + 0.2, 6.15, 5.0, 0.4, { size: 15, bold: true, align: 'center' });
  const bx = MX + 5.7, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.5, 'What happens', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['When an ionic compound is **melted or dissolved**, the **ions are free to move**.', 'Passing a current makes **positive ions** move to the **cathode (−)** and **negative ions** to the **anode (+)**.', 'At the electrodes the ions are **discharged** as **elements**.'], 17, 0.14);
  note(s, bx, 5.1, bw, 1.75, 'Electrodes are usually **inert** (unreactive), e.g. graphite or platinum, so they do not react with the products.', { size: 17 });
  notes(s, 'Spec 4.4.3.1: "When an ionic compound is melted or dissolved in water, the ions are free to move about within the liquid or solution. These liquids and solutions are able to conduct electricity and are called electrolytes. Passing an electric current through electrolytes causes the ions to move to the electrodes. Positively charged ions move to the negative electrode (the cathode), and negatively charged ions move to the positive electrode (the anode). Ions are discharged at the electrodes producing elements. This process is called electrolysis."');
}

{
  const s = frame('Electrolysis of molten compounds', { tag: '4.4.3.2' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'A molten **binary** ionic compound breaks down into its elements: the **metal** at the **cathode**, the **non-metal** at the **anode**.', { fill: C.soft, line: C.line, size: 18 });
  const tw = W - 2 * MX;
  table(s, MX, 2.5, [tw * 0.3, tw * 0.35, tw * 0.35], ['Molten compound', 'Cathode (−)', 'Anode (+)'], [
    ['lead bromide, PbBr₂', 'lead (silver beads)', 'bromine (brown gas)'],
    ['sodium chloride, NaCl', 'sodium', 'chlorine'],
    ['aluminium oxide, Al₂O₃', 'aluminium', 'oxygen'],
  ], { rh: 0.75, size: 18 });
  note(s, MX, 5.35, tw, 1.5, 'PbBr₂ → Pb + Br₂. Lead bromide is used in demonstrations because it melts at a fairly low temperature (373 °C). Bromine is toxic: fume cupboard.', { size: 17 });
  notes(s, 'Spec 4.4.3.2: "When a simple ionic compound (eg lead bromide) is electrolysed in the molten state using inert electrodes, the metal (lead) is produced at the cathode and the non-metal (bromine) is produced at the anode. Students should be able to predict the products of the electrolysis of binary ionic compounds in the molten state." PbBr₂ melting point 373 °C.');
}

D.hinge({
  title: 'Quick check',
  q: 'Molten potassium iodide is electrolysed. What forms at the cathode?',
  options: ['Potassium', 'Iodine', 'Hydrogen', 'Oxygen'],
  correct: 0,
  notes: 'Answer A: K⁺ ions go to the cathode. B forms at the anode. C and D only appear when water is present (aqueous solutions).',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: extracting aluminium', { tag: '4.4.3.3' });
  // simplified cell: steel case lined with carbon (cathode), carbon anodes dipping in
  const x = MX + 0.3, y = 2.4, w = 5.6, h = 3.1;
  rect(s, x, y, w, h, '555555', '333333');
  rect(s, x + 0.25, y, w - 0.5, h - 0.25, '2B2B2B', '2B2B2B');
  rect(s, x + 0.45, y + 0.6, w - 0.9, h - 1.25, 'F2C26B', 'F2C26B');
  rect(s, x + 0.45, y + h - 1.0, w - 0.9, 0.35, 'C9C9C9', 'C9C9C9');
  [0, 1, 2].forEach(i => { rect(s, x + 0.95 + i * 1.45, y - 0.8, 0.8, 2.1, '444444', '222222'); });
  seg(s, x + 0.6, y - 1.05, x + w - 0.6, y - 1.05, C.ink, 2); [0, 1, 2].forEach(i => seg(s, x + 1.35 + i * 1.45, y - 1.05, x + 1.35 + i * 1.45, y - 0.8, C.ink, 2));
  label(s, 'carbon anodes (+)', x + w + 0.1, y - 0.95, 2.4, { color: C.red });
  label(s, 'Al₂O₃ dissolved in molten cryolite', x + w + 0.1, y + 1.0, 2.6);
  label(s, 'molten aluminium', x + w + 0.1, y + h - 1.0, 2.4);
  label(s, 'carbon lining: cathode (−)', x + w + 0.1, y + h - 0.35, 2.6, { color: C.blue });
  seg(s, x + w - 0.5, y + 1.4, x + w + 0.1, y + 1.2, C.grey, 1); seg(s, x + w - 0.5, y + h - 0.85, x + w + 0.1, y + h - 0.85, C.grey, 1);
  const bx = MX + 8.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Key points', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Aluminium is **more reactive than carbon**, so electrolysis is used.', 'Al₂O₃ is mixed with **cryolite** to **lower the melting point**: saves energy.', 'Al at the **cathode**; O₂ at the **anode**.', 'The O₂ reacts with the carbon anodes to make **CO₂**, so the anodes must be **replaced**.', '**Expensive**: lots of energy to melt and a large current.'], 15, 0.1);
  notes(s, 'Spec 4.4.3.3: "Metals can be extracted from molten compounds using electrolysis. Electrolysis is used if the metal is too reactive to be extracted by reduction with carbon or if the metal reacts with carbon. Large amounts of energy are used in the extraction process to melt the compounds and to produce the electrical current. Aluminium is manufactured by the electrolysis of a molten mixture of aluminium oxide and cryolite using carbon as the positive electrode (anode). Students should be able to: explain why a mixture is used as the electrolyte; explain why the positive electrode must be continually replaced." Overall: 2Al₂O₃ → 4Al + 3O₂; anode: C + O₂ → CO₂ (checked). The cell drawing is simplified.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why must the anodes be replaced regularly in aluminium extraction?',
  options: ['Oxygen reacts with the carbon to form CO₂', 'Aluminium dissolves them', 'Cryolite melts them', 'They become negatively charged'],
  correct: 0,
  notes: 'Answer A: C + O₂ → CO₂, so the anodes burn away. B and C are not the reason. D: the anode is positive.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: electrolysis of aqueous solutions', { tag: '4.4.3.4' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'Water also forms a few ions: **H⁺** and **OH⁻**. So in a solution, two kinds of ion compete at each electrode.', { fill: C.soft, line: C.line, size: 18 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.5, cw, 2.6, 'Cathode (−)', C.blue, C.blueSoft);
  bullets(s, MX + 0.2, 3.2, cw - 0.4, ['**Hydrogen** forms if the metal is **more reactive than hydrogen**.', 'Otherwise the **metal** forms (e.g. copper, silver).'], 17, 0.14);
  headCard(s, MX + cw + gap, 2.5, cw, 2.6, 'Anode (+)', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 3.2, cw - 0.4, ['**Halide** ions (Cl⁻, Br⁻, I⁻): the **halogen** forms.', 'Otherwise (sulfate, nitrate): **oxygen** forms.'], 17, 0.14);
  const tw = W - 2 * MX;
  table(s, MX, 5.3, [tw * 0.34, tw * 0.33, tw * 0.33], ['Solution', 'Cathode', 'Anode'], [
    ['sodium chloride', 'hydrogen', 'chlorine'], ['copper sulfate', 'copper', 'oxygen'],
  ], { rh: 0.5, hh: 0.5, size: 16, align: ['left', 'center', 'center'] });
  notes(s, 'Spec 4.4.3.4: "The ions discharged when an aqueous solution is electrolysed using inert electrodes depend on the relative reactivity of the elements involved. At the negative electrode (cathode), hydrogen is produced if the metal is more reactive than hydrogen. At the positive electrode (anode), oxygen is produced unless the solution contains halide ions when the halogen is produced. This happens because in the aqueous solution water molecules break down producing hydrogen ions and hydroxide ions that are discharged." Students should be able to predict the products of the electrolysis of aqueous solutions containing a single ionic compound. The NaCl(aq) solution left behind is sodium hydroxide.');
}

D.myTurnYourTurn({
  title: 'Predict the products', tag: 'Skill practice', stepSize: 18, labelW: 2.7, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Cathode and anode products (aqueous):',
    steps: [
      { label: 'copper chloride', text: '**copper**, **chlorine**' },
      { label: 'sodium sulfate', text: '**hydrogen**, **oxygen**' },
      { label: 'potassium bromide', text: '**hydrogen**, **bromine**' },
    ],
  },
  yours: {
    q: 'Cathode and anode products (aqueous):',
    steps: [
      { label: 'silver nitrate', text: '**silver**, **oxygen**' },
      { label: 'potassium iodide', text: '**hydrogen**, **iodine**' },
      { label: 'magnesium chloride', text: '**hydrogen**, **chlorine**' },
    ],
  },
  notes: 'Each prediction is checked by the build script using the reactivity series and the halide rule.',
});

{
  const s = frame('Required practical 3: electrolysis', { tag: 'Required practical 3' });
  cell(s, MX + 0.6, 2.6, 3.8, 2.8, { fill: 'BFD9F2' });
  // test tubes over electrodes
  [MX + 0.6 + 3.8 * 0.28, MX + 0.6 + 3.8 * 0.72].forEach(cx => { rect(s, cx - 0.25, 3.0, 0.5, 1.7, C.white, C.grey, { lw: 1.25 }); });
  label(s, 'test tubes collect gases', MX + 0.3, 5.95, 4.4, { align: 'center' });
  headCard(s, MX + 5.0, 1.4, 4.0, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 5.2, 2.1, 3.6, ['Pour the solution into a beaker; add two **inert** (graphite) electrodes.', 'Connect to a **low-voltage** DC supply (about 4 V).', 'Collect any gases in test tubes; watch for **coatings** on the cathode.', '**Test** each gas.'], 15, 0.12);
  const tx = MX + 9.3, tw = W - MX - tx;
  headCard(s, tx, 1.4, tw, 5.45, 'Tests', C.green, C.greenSoft);
  bullets(s, tx + 0.2, 2.1, tw - 0.4, ['**Hydrogen**: squeaky pop with a lit splint.', '**Oxygen**: relights a glowing splint.', '**Chlorine**: bleaches damp litmus paper.', 'Copper: pink-brown coating.'], 15, 0.12);
  notes(s, 'RP3: "investigate what happens when aqueous solutions are electrolysed using inert electrodes. This should be an investigation involving developing a hypothesis." Typical solutions: copper chloride, copper sulfate, sodium chloride, sodium sulfate. Safety: chlorine is toxic, use small volumes in a ventilated room; turn off the supply once a small volume of gas is collected. Gas tests are also in 4.8.2.');
}

D.hinge({
  title: 'Quick check',
  q: 'Copper sulfate solution is electrolysed. What forms at the anode?',
  options: ['Oxygen', 'Copper', 'Sulfur', 'Hydrogen'],
  correct: 0,
  notes: 'Answer A: no halide present, so oxygen. B forms at the cathode. C: sulfate ions are not discharged. D would only form at the cathode if the metal were more reactive than hydrogen.',
});

// ---------------- Part 4 (HT) ----------------
{
  const s = frame('Part 4: half equations at the electrodes', HT);
  rect(s, MX, 1.4, W - 2 * MX, 0.9, 'FBEAEA', C.red, { lw: 2 });
  txt(s, 'Cathode: **reduction** (gain of electrons).   Anode: **oxidation** (loss of electrons).', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.9, { size: 20, valign: 'middle', align: 'center' });
  const tw = W - 2 * MX;
  table(s, MX, 2.55, [tw * 0.26, tw * 0.37, tw * 0.37], ['Electrolyte', 'Cathode (−)', 'Anode (+)'], [
    ['molten PbBr₂', 'Pb²⁺ + 2e⁻ → Pb', '2Br⁻ → Br₂ + 2e⁻'],
    ['molten Al₂O₃', 'Al³⁺ + 3e⁻ → Al', '2O²⁻ → O₂ + 4e⁻'],
    ['CuCl₂(aq)', 'Cu²⁺ + 2e⁻ → Cu', '2Cl⁻ → Cl₂ + 2e⁻'],
    ['NaCl(aq)', '2H⁺ + 2e⁻ → H₂', '2Cl⁻ → Cl₂ + 2e⁻'],
    ['Na₂SO₄(aq)', '2H⁺ + 2e⁻ → H₂', '4OH⁻ → O₂ + 2H₂O + 4e⁻'],
  ], { rh: 0.6, size: 18, align: ['left', 'left', 'left'] });
  note(s, MX, 6.15, tw, 0.7, 'Anode equations can also be written with electrons taken away, e.g. 2Br⁻ − 2e⁻ → Br₂.', { size: 16 });
  notes(s, 'Spec 4.4.3.5 (HT): "During electrolysis, at the cathode (negative electrode), positively charged ions gain electrons and so the reactions are reductions. At the anode (positive electrode), negatively charged ions lose electrons and so the reactions are oxidations. Reactions at electrodes can be represented by half equations, for example: 2H+ + 2e– → H2 and 4OH– → O2 + 2H2O + 4e– or 4OH– – 4e– → O2 + 2H2O." Every half equation is checked for atoms and charge in the build script.');
}

D.myTurnYourTurn({
  title: 'Writing half equations', tag: 'HT • Skill practice', stepSize: 19, labelW: 2.2, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Molten sodium chloride:',
    steps: [
      { label: 'Cathode', text: 'Na⁺ + e⁻ → Na' },
      { label: 'Anode', text: '2Cl⁻ → Cl₂ + 2e⁻' },
      { label: 'Oxidised?', text: '**chloride ions**' },
    ],
  },
  yours: {
    q: 'Silver nitrate solution / KI solution:',
    steps: [
      { label: 'AgNO₃ cathode', text: 'Ag⁺ + e⁻ → Ag' },
      { label: 'KI anode', text: '2I⁻ → I₂ + 2e⁻' },
      { label: 'KI cathode', text: '2H⁺ + 2e⁻ → H₂' },
    ],
  },
  notes: 'Check atoms AND charge: 2I⁻ is −2 on the left; I₂ + 2e⁻ is −2 on the right. All checked in the build script.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Why must an ionic compound be molten or dissolved?', 'So the ions are free to move'], ['Which electrode is negative?', 'Cathode'], ['Why is cryolite used?', 'Lowers the melting point; saves energy'], ['What forms at the anode if halide ions are present?', 'The halogen'],
    ['Products of electrolysing molten zinc chloride?', 'Zinc and chlorine'], ['Products of electrolysing aqueous potassium sulfate?', 'Hydrogen and oxygen'],
    ['Why is hydrogen made, not sodium, from NaCl(aq)?', 'Sodium is more reactive than hydrogen'], ['Half equation at the cathode for Al³⁺. (HT)', 'Al³⁺ + 3e⁻ → Al'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) ions must be free to move to carry charge  2) the cathode  3) lowers the melting point of the electrolyte, so less energy is needed  4) the halogen (chlorine, bromine or iodine)  5) zinc at the cathode, chlorine at the anode  6) hydrogen (K more reactive than H), oxygen (no halide)  7) sodium is more reactive than hydrogen, so H⁺ is discharged instead  8) Al³⁺ + 3e⁻ → Al.');
  }
}
prod('practice K2SO4', 'K', 'SO4', 'H2', 'O2');

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Explain why aluminium is extracted by electrolysis and not by heating with carbon.', m: 1, lines: 0 },
    { l: 'b', q: 'Explain why aluminium oxide is dissolved in cryolite, and why the anodes must be replaced.', m: 3, lines: 1 },
    { l: 'c', q: 'Sodium chloride solution is electrolysed. Name the product at each electrode and explain your answers.', m: 4, lines: 2 },
    { l: 'd', q: 'Write the half equation for the reaction at the anode in (c). (HT)', m: 2, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'aluminium is more reactive than carbon', '1', ''],
    ['(b)', 'lowers the melting point (less energy / cheaper); oxygen forms at the anode; reacts with carbon to make CO₂ so the anode wears away', '3', ''],
    ['(c)', 'cathode: hydrogen; sodium is more reactive than hydrogen; anode: chlorine; chloride (halide) ions present', '4', ''],
    ['(d)', '2Cl⁻ → Cl₂ + 2e⁻ (species 1, balanced with electrons 1)', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Which ions move to the cathode?', 'Products of molten lead bromide?', 'Products of copper sulfate solution?', 'Is the cathode reaction oxidation or reduction? (HT)'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) positive ions (cations)  2) lead and bromine  3) copper and oxygen  4) reduction (gain of electrons). Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw and label an electrolysis cell, showing the ions moving.',
    'Predict the products: molten CaCl₂; aqueous CuBr₂; aqueous H₂SO₄.',
    'Explain why aluminium is expensive to extract.',
    'Write an RP3 plan to test the hypothesis: "a metal forms at the cathode if it is less reactive than hydrogen".',
    'HT: write the electrode half equations for aqueous CuBr₂.',
    'HT: write the half equation for oxygen forming from OH⁻ ions.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) see Part 1  2) Ca and Cl₂; Cu and Br₂; H₂ and O₂  3) lots of energy to melt Al₂O₃/cryolite and for the large current; anodes replaced  4) electrolyse CuSO₄, CuCl₂, NaCl, Na₂SO₄ with graphite electrodes; observe the cathode, test gases  5) Cu²⁺ + 2e⁻ → Cu; 2Br⁻ → Br₂ + 2e⁻  6) 4OH⁻ → O₂ + 2H₂O + 4e⁻.');
}
prod('HW CuBr2', 'Cu', 'Br', 'Cu', 'Br2'); prod('HW H2SO4', 'H', 'SO4', 'H2', 'O2');

D.save(path.join(__dirname, 'AQA_8462_Chem_4.4_C_Electrolysis.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
