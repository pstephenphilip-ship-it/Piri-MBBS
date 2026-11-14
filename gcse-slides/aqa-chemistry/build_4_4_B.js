// build_4_4_B.js — AQA GCSE Chemistry (8462) 4.4 Chemical changes, lesson 2 of 3:
// 4.4.2.1 Reactions of acids with metals, 4.4.2.2 Neutralisation of acids and salt production,
// 4.4.2.3 Soluble salts (RP1), 4.4.2.4 The pH scale and neutralisation, 4.4.2.5 Titrations (RP2, chemistry only),
// 4.4.2.6 Strong and weak acids (HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_4_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.4.2', 'Acids, alkalis and salts'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
balanced('Mg+HCl', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
balanced('Zn+HCl', [[1, 'Zn'], [2, 'HCl']], [[1, 'ZnCl2'], [1, 'H2']]);
balanced('Mg+H2SO4', [[1, 'Mg'], [1, 'H2SO4']], [[1, 'MgSO4'], [1, 'H2']]);
balanced('NaOH+HCl', [[1, 'NaOH'], [1, 'HCl']], [[1, 'NaCl'], [1, 'H2O']]);
balanced('CuO+H2SO4', [[1, 'CuO'], [1, 'H2SO4']], [[1, 'CuSO4'], [1, 'H2O']]);
balanced('MgO+H2SO4', [[1, 'MgO'], [1, 'H2SO4']], [[1, 'MgSO4'], [1, 'H2O']]);
balanced('CuO+HCl', [[1, 'CuO'], [2, 'HCl']], [[1, 'CuCl2'], [1, 'H2O']]);
balanced('CaCO3+HCl', [[1, 'CaCO3'], [2, 'HCl']], [[1, 'CaCl2'], [1, 'H2O'], [1, 'CO2']]);
balanced('CaCO3+HNO3', [[1, 'CaCO3'], [2, 'HNO3']], [[1, 'Ca(NO3)2'], [1, 'H2O'], [1, 'CO2']]);
balanced('Na2CO3+HCl', [[1, 'Na2CO3'], [2, 'HCl']], [[2, 'NaCl'], [1, 'H2O'], [1, 'CO2']]);
balanced('KOH+HNO3', [[1, 'KOH'], [1, 'HNO3']], [[1, 'KNO3'], [1, 'H2O']]);
balanced('Ca(OH)2+HCl', [[1, 'Ca(OH)2'], [2, 'HCl']], [[1, 'CaCl2'], [2, 'H2O']]);
balanced('H2SO4+NaOH', [[1, 'H2SO4'], [2, 'NaOH']], [[1, 'Na2SO4'], [2, 'H2O']]);
balanced('ZnO+HNO3', [[1, 'ZnO'], [2, 'HNO3']], [[1, 'Zn(NO3)2'], [1, 'H2O']]);
balanced('ionic neutral', [[1, 'H'], [1, 'OH']], [[1, 'H2O']]);
balanced('half H+', [[2, 'H']], [[1, 'H2']]);
// pH and H+ concentration (HT): each pH unit is a factor of 10
const factor = (pa, pb) => 10 ** Math.abs(pa - pb);
near('pH 2 vs 4', factor(2, 4), 100); near('MT 1 vs 3', factor(1, 3), 100); near('MT 2 vs 5', factor(2, 5), 1000);
near('YT 3 vs 6', factor(3, 6), 1000); near('YT 100 times', Math.log10(100), 2); near('dilute 10', Math.log10(10), 1);
// titration results
const titres = [24.80, 24.70, 24.75];
calc('concordant', Math.max(...titres) - Math.min(...titres) <= 0.10 + 1e-9 ? 1 : 0, 1);
calc('rough not concordant', 25.40 - 24.70 <= 0.10 ? 1 : 0, 0);
near('mean titre', titres.reduce((a, b) => a + b, 0) / 3, 24.75);
near('exam mean', (22.35 + 22.40 + 22.30) / 3, 22.35);

// ======================= drawings =======================
const PH = ['D7263D', 'E5533A', 'EF7A2E', 'F5A623', 'F9C930', 'F2E33A', 'C6DB3C', '7CC243', '3FA34D', '2E9A86', '2B7BBF', '2A5DAE', '3E3D9F', '5B2C8F', '6A1F7A'];
function phBar(s, x, y, w, h) {
  const cw = w / 15;
  PH.forEach((c, i) => { rect(s, x + i * cw, y, cw, h, c, c); txt(s, String(i), x + i * cw, y, cw, h, { size: 15, bold: true, color: i >= 3 && i <= 8 ? C.ink : C.white, align: 'center', valign: 'middle' }); });
  txt(s, 'acid', x, y + h + 0.05, cw * 7, 0.35, { size: 15, bold: true, color: 'D7263D' });
  txt(s, 'neutral', x + 6 * cw, y + h + 0.05, cw * 3, 0.35, { size: 15, bold: true, color: '3FA34D', align: 'center' });
  txt(s, 'alkali', x + 8 * cw, y + h + 0.05, cw * 7, 0.35, { size: 15, bold: true, color: '5B2C8F', align: 'right' });
}
function burette(s, x, y) {
  rect(s, x - 0.12, y, 0.24, 2.6, 'EAF2FA', C.ink, { lw: 1.5 });
  rect(s, x - 0.1, y + 0.6, 0.2, 1.98, 'F6D7D3', 'F6D7D3');
  for (let i = 0; i < 8; i++) seg(s, x - 0.12, y + 0.3 + i * 0.3, x - 0.02, y + 0.3 + i * 0.3, C.ink, 0.75);
  seg(s, x - 0.12, y + 2.6, x - 0.04, y + 2.85, C.ink, 1.5); seg(s, x + 0.12, y + 2.6, x + 0.04, y + 2.85, C.ink, 1.5);
  rect(s, x - 0.22, y + 2.65, 0.44, 0.1, C.ink, C.ink);
  // flask
  s.addShape(D.SH.triangle, { x: x - 0.75, y: y + 3.05, w: 1.5, h: 1.25, fill: { color: 'E8D4F2' }, line: { color: C.ink, width: 1.5 } });
  rect(s, x - 0.15, y + 2.95, 0.3, 0.25, C.white, C.ink, { lw: 1.5 });
}
function label(s, t, x, y, w = 2.4, o = {}) { txt(s, t, x, y, w, 0.34, Object.assign({ size: 14, bold: true }, o)); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Reactions of acids, naming salts, making a soluble salt, the pH scale, titration, and strong and weak acids',
  bullets: ['Part 1: reactions of acids and naming salts (4.4.2.1, 4.4.2.2)', 'Part 2: making a soluble salt, required practical 1 (4.4.2.3)', 'Part 3: pH, neutralisation and titration, required practical 2 (4.4.2.4, 4.4.2.5)', 'Part 4: strong and weak acids (4.4.2.6, HT)'],
  notes: 'AQA 8462 GCSE Chemistry 4.4, lesson 2 of 3. Titration calculations were taught in 4.3 lesson 3; this lesson covers the practical method. About two hours.',
});

D.objectives({
  tag: '4.4.2',
  items: [
    'Write equations for acids with **metals**, **bases**, **alkalis** and **carbonates**, and **name the salt**.',
    'Describe how to make **pure, dry crystals** of a soluble salt (**RP1**).',
    'Use the **pH scale** and describe a **titration** (**RP2**).',
    'Explain **strong** and **weak** acids and the **factor of 10** per pH unit (HT).',
  ],
  keywords: ['acid', 'base', 'alkali', 'salt', 'neutralisation', 'pH', 'titration', 'strong acid'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Which metals react with dilute acid: Mg, Cu, Zn?', 'What gas makes a squeaky pop?', 'Write the ionic equation for neutralisation.', 'How do you get crystals from a solution?'],
  answers: ['Mg and Zn', 'hydrogen', 'H⁺ + OH⁻ → H₂O', 'heat to evaporate some water, then cool'],
  notes: 'Retrieval from lesson 1 (reactivity) and 4.1 (crystallisation, ionic equations).',
});

D.vocab({
  title: 'Key words', tag: '4.4.2',
  items: [
    { term: 'Acid', def: 'Produces **hydrogen ions, H⁺**, in aqueous solution. pH less than 7.' },
    { term: 'Base', def: 'Neutralises an acid, e.g. a **metal oxide** or **metal hydroxide**. An **alkali** is a base that dissolves in water and makes **OH⁻** ions.' },
    { term: 'Salt', def: 'Made when the H in an acid is **replaced by a metal** (or ammonium).' },
    { term: 'Neutralisation', def: 'H⁺ + OH⁻ → H₂O. Acid + base → salt + water.' },
  ],
  notes: 'Spec 4.4.2.2 and 4.4.2.4.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: reactions of acids', { tag: '4.4.2.1–2' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.24, tw * 0.33, tw * 0.43], ['Acid +', 'Products', 'Example'], [
    ['metal', 'salt + hydrogen', 'Mg + 2HCl → MgCl₂ + H₂'],
    ['metal oxide (base)', 'salt + water', 'CuO + H₂SO₄ → CuSO₄ + H₂O'],
    ['metal hydroxide (alkali)', 'salt + water', 'NaOH + HCl → NaCl + H₂O'],
    ['metal carbonate', 'salt + water + carbon dioxide', 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂'],
  ], { rh: 0.75, size: 17 });
  const gap = 0.4, cw = (tw - gap) / 2;
  headCard(s, MX, 5.0, cw, 1.85, 'Naming the salt', C.maroon, C.soft);
  txt(s, 'hydrochloric → **chloride**;  sulfuric → **sulfate**;', MX + 0.2, 5.62, cw - 0.4, 0.4, { size: 16 });
  txt(s, 'nitric → **nitrate**', MX + 0.2, 6.05, cw - 0.4, 0.4, { size: 16 });
  headCard(s, MX + cw + gap, 5.0, cw, 1.85, 'Tests for the gases', C.green, C.greenSoft);
  txt(s, 'H₂: lit splint, **squeaky pop**.  CO₂: **limewater turns milky**.', MX + cw + gap + 0.2, 5.65, cw - 0.4, 1.1, { size: 17 });
  notes(s, 'Spec 4.4.2.1: "Acids react with some metals to produce salts and hydrogen." Spec 4.4.2.2: "Acids are neutralised by alkalis (eg soluble metal hydroxides) and bases (eg insoluble metal hydroxides and metal oxides) to produce salts and water, and by metal carbonates to produce salts, water and carbon dioxide. The particular salt produced in any reaction between an acid and a base or alkali depends on: the acid used (hydrochloric acid produces chlorides, nitric acid produces nitrates, sulfuric acid produces sulfates); the positive ions in the base, alkali or carbonate." Students should be able to predict products and use the formulae of common ions to deduce the formulae of salts. All equations checked by atom counting.');
}

D.myTurnYourTurn({
  title: 'Salts and equations', tag: 'Skill practice', stepSize: 16, labelW: 1.8, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Name the salt and balance:',
    steps: [
      { label: 'Zn + HCl', text: '**zinc chloride**\nZn + 2HCl → ZnCl₂ + H₂' },
      { label: 'MgO + H₂SO₄', text: '**magnesium sulfate**\nMgO + H₂SO₄ → MgSO₄ + H₂O' },
      { label: 'CaCO₃ + HNO₃', text: '**calcium nitrate**\nCaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂' },
    ],
  },
  yours: {
    q: 'Name the salt and balance:',
    steps: [
      { label: 'Mg + H₂SO₄', text: '**magnesium sulfate**\nMg + H₂SO₄ → MgSO₄ + H₂' },
      { label: 'CuO + HCl', text: '**copper chloride**\nCuO + 2HCl → CuCl₂ + H₂O' },
      { label: 'Na₂CO₃ + HCl', text: '**sodium chloride**\nNa₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂' },
    ],
  },
  notes: 'All equations checked by atom counting in the build script.',
});

{
  const s = frame('Metals and acids as redox', HT);
  txt(s, 'Zn(s) + 2HCl(aq) → ZnCl₂(aq) + H₂(g)', MX, 1.45, W - 2 * MX, 0.5, { size: 20, bold: true });
  txt(s, 'Ionic: Zn(s) + 2H⁺(aq) → Zn²⁺(aq) + H₂(g)     (Cl⁻ is a spectator ion)', MX, 2.05, W - 2 * MX, 0.5, { size: 18 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.85, cw, 2.2, 'Oxidised: zinc', C.red, 'FBEAEA');
  txt(s, 'Zn → Zn²⁺ + 2e⁻', MX + 0.2, 3.55, cw - 0.4, 0.5, { size: 22, bold: true });
  txt(s, 'loses electrons', MX + 0.2, 4.2, cw - 0.4, 0.5, { size: 17 });
  headCard(s, MX + cw + gap, 2.85, cw, 2.2, 'Reduced: hydrogen ions', C.blue, C.blueSoft);
  txt(s, '2H⁺ + 2e⁻ → H₂', MX + cw + gap + 0.2, 3.55, cw - 0.4, 0.5, { size: 22, bold: true });
  txt(s, 'gain electrons', MX + cw + gap + 0.2, 4.2, cw - 0.4, 0.5, { size: 17 });
  note(s, MX, 5.3, W - 2 * MX, 1.55, 'Students should be able to explain, in terms of gain or loss of electrons, that the reaction between a metal and an acid is a **redox** reaction: the metal is **oxidised**, the H⁺ ions are **reduced**.', { size: 17 });
  notes(s, 'Spec 4.4.2.1 (HT): "Students should be able to: explain in terms of gain or loss of electrons, that these are redox reactions; identify which species are oxidised and which are reduced in given chemical equations. Knowledge of reactions limited to those of magnesium, zinc and iron with hydrochloric and sulfuric acids." Charges: left 0 + 2 = +2, right +2 + 0 = +2.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which salt forms when copper oxide reacts with nitric acid?',
  options: ['Copper nitrate', 'Copper nitride', 'Copper sulfate', 'Copper chloride'],
  correct: 0,
  notes: 'Answer A: nitric acid makes nitrates. B: "nitride" is N³⁻, not from nitric acid. C needs sulfuric acid. D needs hydrochloric acid.',
});

// ---------------- Part 2: RP1 ----------------
{
  const s = frame('Part 2: making a soluble salt (RP1)', { tag: 'Required practical 1' });
  txt(s, 'Copper oxide (insoluble base) + sulfuric acid → copper sulfate + water', MX, 1.35, W - 2 * MX, 0.45, { size: 18, bold: true, color: C.maroon });
  const steps = [
    ['1', 'Warm the dilute **sulfuric acid** gently in a beaker.'],
    ['2', 'Add **copper oxide** a spatula at a time, stirring, until **no more dissolves** (it is in **excess**).'],
    ['3', '**Filter** to remove the excess copper oxide.'],
    ['4', 'Heat the blue filtrate in an evaporating basin to evaporate **some** of the water.'],
    ['5', 'Leave to **cool and crystallise**; filter off the crystals and **dry** them on filter paper.'],
  ];
  steps.forEach(([n, t], i) => { const y = 1.95 + i * 0.85; circle(s, MX + 0.35, y + 0.3, 0.55, C.accent); txt(s, n, MX + 0.08, y + 0.03, 0.55, 0.55, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' }); txt(s, t, MX + 0.85, y, 7.3, 0.8, { size: 17, valign: 'middle' }); });
  const bx = MX + 8.5, bw = W - MX - bx;
  headCard(s, bx, 1.95, bw, 4.9, 'Why?', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 2.65, bw - 0.4, ['**Excess** base makes sure **all the acid** reacts.', 'Filtering leaves a solution of **only the salt**.', 'Do **not** boil dry: crystals are **bigger and purer** when cooled slowly.', 'CuO + H₂SO₄ → CuSO₄ + H₂O'], 16, 0.14);
  notes(s, 'Spec 4.4.2.3: "Soluble salts can be made from acids by reacting them with solid insoluble substances, such as metals, metal oxides, hydroxides or carbonates. The solid is added to the acid until no more reacts and the excess solid is filtered off to produce a solution of the salt. Salt solutions can be crystallised to produce solid salts." RP1: "preparation of a pure, dry sample of a soluble salt from an insoluble oxide or carbonate, using a Bunsen burner to heat dilute acid and a water bath or electric heater to evaporate the solution." Safety: goggles; copper sulfate is harmful; heat gently.');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: the pH scale', { tag: '4.4.2.4' });
  phBar(s, MX, 1.5, W - 2 * MX, 0.7);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.95, cw, 2.35, 'Measuring pH', C.maroon, C.soft);
  bullets(s, MX + 0.2, 3.65, cw - 0.4, ['**Universal indicator**: compare the colour with a chart.', '**pH probe / meter**: more accurate, gives a number.'], 17, 0.12);
  headCard(s, MX + cw + gap, 2.95, cw, 2.35, 'Neutralisation', C.green, C.greenSoft);
  txt(s, 'H⁺(aq) + OH⁻(aq) → H₂O(l)', MX + cw + gap + 0.2, 3.65, cw - 0.4, 0.5, { size: 22, bold: true });
  txt(s, 'Acids make **H⁺** ions; alkalis make **OH⁻** ions. A neutral solution has pH **7**.', MX + cw + gap + 0.2, 4.25, cw - 0.4, 1.0, { size: 16 });
  note(s, MX, 5.55, W - 2 * MX, 1.3, 'The **lower** the pH, the **more acidic** (more H⁺). The **higher** the pH, the **more alkaline** (more OH⁻).', { size: 18 });
  notes(s, 'Spec 4.4.2.4: "Acids produce hydrogen ions (H+) in aqueous solutions. Aqueous solutions of alkalis contain hydroxide ions (OH–). The pH scale, from 0 to 14, is a measure of the acidity or alkalinity of a solution, and can be measured using universal indicator or a pH probe. A solution with pH 7 is neutral. Aqueous solutions of acids have pH values of less than 7 and aqueous solutions of alkalis have pH values greater than 7. In neutralisation reactions between an acid and an alkali, hydrogen ions react with hydroxide ions to produce water." Colours are approximate universal indicator colours.');
}

{
  const s = frame('Titration (RP2)', { tag: 'Required practical 2' });
  burette(s, MX + 1.2, 1.5);
  label(s, 'burette (acid)', MX + 1.45, 1.6, 2.0); txt(s, 'conical flask:\nalkali + indicator', MX + 2.05, 4.75, 2.2, 0.7, { size: 13, bold: true });
  label(s, 'white tile', MX + 0.6, 5.95, 1.6);
  rect(s, MX + 0.3, 5.82, 1.8, 0.12, C.greyLight, C.grey);
  headCard(s, MX + 4.4, 1.4, 4.7, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 4.6, 2.1, 4.3, ['Measure 25.0 cm³ of alkali with a **pipette**; add to the flask with a few drops of **indicator**.', 'Fill the burette with acid; record the start reading.', 'Add acid, **swirling**; add **drop by drop** near the end point.', 'Stop at the **colour change**; record the end reading.', 'Repeat until **concordant** titres (within **0.10 cm³**).'], 15, 0.12);
  const tx = MX + 9.4, tw = W - MX - tx;
  table(s, tx, 1.4, [tw * 0.5, tw * 0.5], ['Titre', 'cm³'], [['Rough', '25.40'], ['1', '24.80'], ['2', '24.70'], ['3', '24.75']], { rh: 0.5, hh: 0.5, size: 16, align: ['left', 'center'] });
  note(s, tx, 4.05, tw, 2.8, 'Mean of concordant titres: (24.80 + 24.70 + 24.75) ÷ 3 = **24.75 cm³**. Leave out the rough one.', { size: 15 });
  notes(s, 'Spec 4.4.2.5 (chemistry only): "The volumes of acid and alkali solutions that react with each other can be measured by titration using a suitable indicator." RP2: "determination of the reacting volumes of solutions of a strong acid and a strong alkali by titration. (HT only) determination of the concentration of one of the solutions in mol/dm³ and g/dm³ from the reacting volumes and the known concentration of the other solution." Indicators: phenolphthalein (pink in alkali → colourless) or methyl orange (yellow in alkali → red in acid). Universal indicator is not used: it changes gradually. Calculations: see 4.3 lesson 3.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is a white tile placed under the conical flask?',
  options: ['To see the colour change clearly', 'To protect the bench from acid', 'To keep the flask warm', 'To measure the volume'],
  correct: 0,
  notes: 'Answer A. B, C and D are not the reason. Common follow-up: why swirl? (to mix the solutions so the reaction is complete).',
});

// ---------------- Part 4 (HT) ----------------
{
  const s = frame('Part 4: strong and weak acids', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.7, 'Strong acid', C.red, 'FBEAEA');
  txt(s, '**Completely ionised** in water.\nHCl → H⁺ + Cl⁻\ne.g. hydrochloric, nitric, sulfuric', MX + 0.2, 2.1, cw - 0.4, 1.9, { size: 17 });
  headCard(s, MX + cw + gap, 1.4, cw, 2.7, 'Weak acid', C.orange, C.orangeSoft);
  txt(s, '**Only partially ionised** in water: only some molecules release H⁺ (a reversible reaction).\ne.g. ethanoic, citric, carbonic', MX + cw + gap + 0.2, 2.1, cw - 0.4, 1.9, { size: 17 });
  headCard(s, MX, 4.35, cw, 2.5, 'Strong ≠ concentrated', C.maroon, C.soft);
  txt(s, '**Strength**: how much the acid **ionises**.\n**Concentration**: how much acid is in a given **volume** (dilute or concentrated).', MX + 0.2, 5.0, cw - 0.4, 1.8, { size: 16 });
  headCard(s, MX + cw + gap, 4.35, cw, 2.5, 'pH and H⁺', C.blue, C.blueSoft);
  txt(s, 'For a given concentration, a **stronger** acid has a **lower pH**. Each **decrease of 1** in pH makes the H⁺ concentration **10 times bigger**.', MX + cw + gap + 0.2, 5.0, cw - 0.4, 1.8, { size: 16 });
  notes(s, 'Spec 4.4.2.6 (HT): "A strong acid is completely ionised in aqueous solution. Examples of strong acids are hydrochloric, nitric and sulfuric acids. A weak acid is only partially ionised in aqueous solution. Examples of weak acids are ethanoic, citric and carbonic acids. For a given concentration of aqueous solutions, the stronger an acid, the lower the pH. As the pH decreases by one unit, the hydrogen ion concentration of the solution increases by a factor of 10. Students should be able to: use and explain the terms dilute and concentrated (in terms of amount of substance), and weak and strong (in terms of the degree of ionisation) in relation to acids; describe neutrality and relative acidity in terms of the effect of hydrogen ion concentration on the numerical value of pH (whole numbers only)."');
}

D.myTurnYourTurn({
  title: 'pH and hydrogen ion concentration', tag: 'HT • Maths skill', stepSize: 17, labelW: 2.7, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'How many times more H⁺?',
    steps: [
      { label: 'pH 1 compared with pH 3', text: '10 × 10 = **100 times**' },
      { label: 'pH 2 compared with pH 5', text: '10³ = **1000 times**' },
      { label: 'Acid diluted 10 times: pH?', text: 'pH goes **up by 1**' },
    ],
  },
  yours: {
    q: 'How many times more H⁺?',
    steps: [
      { label: 'pH 3 compared with pH 6', text: '10³ = **1000 times**' },
      { label: 'pH 2 compared with pH 4', text: '10² = **100 times**' },
      { label: 'H⁺ made 100 times bigger: pH?', text: 'pH goes **down by 2**' },
    ],
  },
  notes: 'Factor = 10 to the power of the pH difference. Checked in the build script.',
});

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'Ethanoic acid and hydrochloric acid have the same concentration. Why does ethanoic acid have a higher pH?',
  options: ['It is only partially ionised', 'It is more dilute', 'It is a strong acid', 'It contains no hydrogen'],
  correct: 0,
  notes: 'Answer A: fewer H⁺ ions are released. B: the question says same concentration. C: ethanoic acid is weak. D: it contains hydrogen but releases little as H⁺.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What ions do acids produce in water?', 'H⁺'], ['Name the salt from nitric acid and zinc oxide.', 'Zinc nitrate'], ['Why add excess base when making a salt?', 'So all the acid reacts'], ['What does "concordant" mean?', 'Titres within 0.10 cm³'],
    ['Balance: Ca(OH)₂ + HCl → CaCl₂ + H₂O', 'Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O'], ['Why is universal indicator not used in titration?', 'Gradual colour change; no sharp end point'],
    ['pH 4 to pH 1: how many times more H⁺? (HT)', '1000 times'], ['What is a weak acid? (HT)', 'Only partially ionised in water'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) hydrogen ions, H⁺  2) zinc nitrate (ZnO + 2HNO₃ → Zn(NO₃)₂ + H₂O)  3) so that all the acid is used up; excess solid is filtered off  4) within 0.10 cm³ of each other  5) Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O  6) it changes colour gradually, so there is no sharp end point  7) 10³ = 1000 times  8) only partially ionised in aqueous solution.');
  }
}
near('practice 4 to 1', factor(4, 1), 1000);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Describe how to make pure, dry crystals of copper sulfate from copper oxide and sulfuric acid.', m: 4, lines: 2 },
    { l: 'b', q: 'Write a balanced equation for sodium carbonate reacting with hydrochloric acid.', m: 2, lines: 1 },
    { l: 'c', q: 'In a titration the titres are 22.35, 22.40 and 22.30 cm³. Calculate the mean titre.', m: 1, lines: 0 },
    { l: 'd', q: 'Explain the difference between a dilute strong acid and a concentrated weak acid. (HT)', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'warm acid, add copper oxide until in excess / no more dissolves; filter to remove excess; heat to evaporate some water; leave to crystallise, then dry', '4', ''],
    ['(b)', 'Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂ (formulae 1, balancing 1)', '2', ''],
    ['(c)', '22.35 cm³', '1', ''],
    ['(d)', 'strong: fully ionised; weak: partially ionised; dilute/concentrated refers to the amount of acid per volume', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What are the products of acid + metal carbonate?', 'Name the salt: magnesium + hydrochloric acid.', 'What is the pH of a neutral solution?', 'Give one strong and one weak acid. (HT)'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) salt + water + carbon dioxide  2) magnesium chloride  3) 7  4) strong: hydrochloric/nitric/sulfuric; weak: ethanoic/citric/carbonic. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Write balanced equations: Zn + H₂SO₄; KOH + HNO₃; ZnO + HNO₃.',
    'Write an RP1 method for making zinc chloride from zinc carbonate.',
    'Explain why the crystals should not be heated to dryness.',
    'Describe how to carry out a titration accurately (five points).',
    'HT: write the ionic equation and half equations for Mg + 2HCl.',
    'HT: pH 2 and pH 6 solutions. How many times more H⁺ in the first?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) Zn + H₂SO₄ → ZnSO₄ + H₂; KOH + HNO₃ → KNO₃ + H₂O; ZnO + 2HNO₃ → Zn(NO₃)₂ + H₂O  2) add ZnCO₃ to warm HCl until fizzing stops and solid remains; filter; evaporate some water; cool; filter and dry  3) smaller, less pure crystals; some salts decompose / lose water of crystallisation  4) pipette, indicator, white tile, swirl, dropwise near end, read at eye level from the meniscus, repeat for concordant  5) Mg + 2H⁺ → Mg²⁺ + H₂; Mg → Mg²⁺ + 2e⁻; 2H⁺ + 2e⁻ → H₂  6) 10⁴ = 10 000 times.');
}
balanced('HW Zn+H2SO4', [[1, 'Zn'], [1, 'H2SO4']], [[1, 'ZnSO4'], [1, 'H2']]); balanced('HW ZnCO3', [[1, 'ZnCO3'], [2, 'HCl']], [[1, 'ZnCl2'], [1, 'H2O'], [1, 'CO2']]);
near('HW pH 2 vs 6', factor(2, 6), 10000);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.4_B_AcidsSalts.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
