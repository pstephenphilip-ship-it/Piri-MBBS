// build_4_6_C.js — AQA GCSE Chemistry (8462) 4.6 Rate and extent of chemical change, lesson 3 of 3:
// 4.6.2.1 Reversible reactions, 4.6.2.2 Energy changes and reversible reactions, 4.6.2.3 Equilibrium,
// 4.6.2.4–4.6.2.7 The effect of changing conditions on equilibrium (HT, Le Chatelier).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_6_C.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');
const { graph } = require('../aqa-maths/graphs');

const D = T.init(deck('4.6.2', 'Reversible reactions and equilibrium'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= checks =======================
balanced('NH4Cl', [[1, 'NH4Cl']], [[1, 'NH3'], [1, 'HCl']]);
balanced('CuSO4.5H2O', [[1, 'CuSO4'], [5, 'H2O']], [[1, 'CuSO4'], [5, 'H2O']]);
balanced('Haber', [[1, 'N2'], [3, 'H2']], [[2, 'NH3']]);
balanced('2SO2', [[2, 'SO2'], [1, 'O2']], [[2, 'SO3']]);
balanced('N2O4', [[1, 'N2O4']], [[2, 'NO2']]);
balanced('H2+I2', [[1, 'H2'], [1, 'I2']], [[2, 'HI']]);
balanced('CO+2H2', [[1, 'CO'], [2, 'H2']], [[1, 'CH3OH']]);
balanced('CH4+H2O', [[1, 'CH4'], [1, 'H2O']], [[1, 'CO'], [3, 'H2']]);
// pressure: side with fewer gas moles is favoured by higher pressure. returns 'right' | 'left' | 'none'
const pShift = (l, r) => (r < l ? 'right' : r > l ? 'left' : 'none');
const ps = (label, l, r, want) => calc('pressure ' + label, pShift(l, r) === want ? 1 : 0, 1);
ps('Haber', 4, 2, 'right'); ps('SO3', 3, 2, 'right'); ps('N2O4', 1, 2, 'left'); ps('HI', 2, 2, 'none'); ps('methanol', 3, 1, 'right'); ps('steam reform', 2, 4, 'left');
// temperature: raising T favours the endothermic direction. dH of forward reaction
const tShift = dH => (dH < 0 ? 'left' : 'right');
const ts = (label, dH, want) => calc('temp ' + label, tShift(dH) === want ? 1 : 0, 1);
ts('Haber', -92, 'left'); ts('SO3', -196, 'left'); ts('N2O4', +58, 'right'); ts('steam reform', +206, 'right'); ts('methanol', -91, 'left');
calc('copper sulfate energy equal and opposite', +78 + -78, 0);

// ======================= equilibrium arrow =======================
// draws "left ⇌ right" with two harpoons (the ⇌ glyph is missing from Arial)
function eqn(s, x, y, left, right, size = 20, o = {}) {
  const bold = o.bold !== false, col = o.color || C.ink, h = size / 72 * 1.3;
  const lw = T.textW(left.replace(/\*\*/g, ''), size, bold) + 0.05;
  txt(s, left, x, y, lw + 0.2, h, { size, bold, color: col, valign: 'middle' });
  const ax = x + lw + 0.12, aw = o.aw || 0.6, my = y + h / 2, g = 0.055, b = 0.1;
  seg(s, ax, my - g, ax + aw, my - g, col, 1.75); seg(s, ax + aw - b, my - g - b * 0.75, ax + aw, my - g, col, 1.75);
  seg(s, ax, my + g, ax + aw, my + g, col, 1.75); seg(s, ax, my + g, ax + b, my + g + b * 0.75, col, 1.75);
  txt(s, right, ax + aw + 0.12, y, (o.rw || 6), h, { size, bold, color: col, valign: 'middle' });
  if (o.label) { if (o.label[0]) txt(s, o.label[0], ax - 0.6, my - 0.62, aw + 1.2, 0.3, { size: 12, bold: true, color: C.red, align: 'center' }); if (o.label[1]) txt(s, o.label[1], ax - 0.6, my + 0.3, aw + 1.2, 0.3, { size: 12, bold: true, color: C.blue, align: 'center' }); }
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Reversible reactions, energy changes both ways, dynamic equilibrium and Le Chatelier’s principle',
  bullets: ['Part 1: reversible reactions (4.6.2.1)', 'Part 2: energy changes both ways (4.6.2.2)', 'Part 3: dynamic equilibrium (4.6.2.3)', 'Part 4: Le Chatelier’s principle (4.6.2.4–7, HT)'],
  notes: 'AQA 8462 GCSE Chemistry 4.6, lesson 3 of 3. The reversible-reaction arrow is drawn as two half-arrows (harpoons) because the ⇌ symbol does not display in Arial. Links forward to the Haber process (4.10.4). About two hours.',
});

D.objectives({
  tag: '4.6.2',
  items: [
    'Write and explain **reversible reactions**.',
    'Explain why energy changes are **equal and opposite** in each direction.',
    'Describe **dynamic equilibrium** in a **closed system**.',
    'Predict how changing **concentration**, **temperature** and **pressure** affects equilibrium (HT).',
  ],
  keywords: ['reversible', 'closed system', 'dynamic equilibrium', 'position of equilibrium', 'Le Chatelier'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Define an endothermic reaction.', 'What colour is anhydrous copper sulfate?', 'How many moles of gas on each side: N₂ + 3H₂ → 2NH₃?', 'What does a catalyst do to activation energy?'],
  answers: ['takes in energy from the surroundings', 'white', '4 on the left, 2 on the right', 'lowers it'],
  notes: 'Retrieval from 4.5, 4.8 (water test) and lesson 2.',
});

D.vocab({
  title: 'Key words', tag: '4.6.2',
  items: [
    { term: 'Reversible reaction', def: 'The products can react to make the **original reactants** again.' },
    { term: 'Closed system', def: '**Nothing** can get in or out (e.g. a sealed container).' },
    { term: 'Dynamic equilibrium', def: 'Forward and reverse reactions happen at **the same rate**, so the amounts **stay the same**.' },
    { term: 'Le Chatelier’s principle', def: 'If conditions change, the equilibrium **shifts to oppose the change** (HT).' },
  ],
  notes: 'Spec 4.6.2.1, 4.6.2.3, 4.6.2.4.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: reversible reactions', { tag: '4.6.2.1' });
  eqn(s, MX + 1.5, 1.6, 'A + B', 'C + D', 30, { aw: 0.9, label: ['forward', 'reverse'] });
  note(s, MX + 6.0, 1.4, W - MX - (MX + 6.0), 1.2, 'The products can react to make the **reactants** again. The **double arrow** shows this.', { fill: C.soft, line: C.line, size: 17 });
  headCard(s, MX, 3.0, W - 2 * MX, 3.85, 'Example: ammonium chloride', C.maroon, C.soft);
  eqn(s, MX + 0.4, 4.05, 'ammonium chloride', 'ammonia + hydrogen chloride', 22, { aw: 0.8, label: ['heat', 'cool'] });
  eqn(s, MX + 0.4, 5.1, 'NH₄Cl(s)', 'NH₃(g) + HCl(g)', 22, { aw: 0.8 });
  txt(s, 'Heating the white solid makes two gases. At the cool top of the tube they react to form **white solid again**. The direction depends on the **conditions**.', MX + 0.4, 5.85, W - 2 * MX - 0.8, 0.9, { size: 17 });
  notes(s, 'Spec 4.6.2.1: "In some chemical reactions, the products of the reaction can react to produce the original reactants. Such reactions are called reversible reactions and are represented: A + B ⇌ C + D. The direction of reversible reactions can be changed by changing the conditions." Example given in the spec: ammonium chloride. Checked by atom counting.');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: energy changes in reversible reactions', { tag: '4.6.2.2' });
  eqn(s, MX + 0.6, 1.55, 'hydrated copper sulfate (blue)', 'anhydrous copper sulfate (white) + water', 18, { aw: 0.8, rw: 5.5, label: ['endothermic', 'exothermic'] });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.85, cw, 2.6, 'Forward: heat it', C.blue, C.blueSoft);
  bullets(s, MX + 0.2, 3.55, cw - 0.4, ['Blue crystals turn **white**.', '**Endothermic**: energy is **taken in**.'], 18, 0.14);
  headCard(s, MX + cw + gap, 2.85, cw, 2.6, 'Reverse: add water', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 3.55, cw - 0.4, ['White powder turns **blue**.', '**Exothermic**: it gets **hot**.'], 18, 0.14);
  note(s, MX, 5.7, W - 2 * MX, 1.15, 'If a reaction is exothermic in one direction, it is endothermic in the other. The **same amount of energy** is transferred each way.', { size: 18 });
  notes(s, 'Spec 4.6.2.2: "If a chemical reaction is exothermic in one direction, it is endothermic in the opposite direction. The same amount of energy is transferred in each case. For example: hydrated copper sulfate (blue) ⇌ anhydrous copper sulfate (white) + water, endothermic forward, exothermic reverse." Adding water to anhydrous copper sulfate is also the test for water (4.8).');
}

D.hinge({
  title: 'Quick check',
  q: 'A reversible reaction releases 50 kJ in the forward direction. What happens in the reverse direction?',
  options: ['50 kJ is taken in', '50 kJ is released', '100 kJ is taken in', 'No energy is transferred'],
  correct: 0,
  notes: 'Answer A: equal and opposite. B ignores the change of direction. C doubles it. D is wrong.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: dynamic equilibrium', { tag: '4.6.2.3' });
  const G = graph(D, s, MX + 0.9, 1.75, 6.2, 4.3, [0, 10], [0, 10], { gridX: 1, gridY: 2, labX: 2, labY: 2, axesAtEdge: true, xTitle: 'Time', yTitle: 'Rate of reaction' });
  const fwd = t => 4 + 5 * Math.exp(-t / 2), rev = t => 4 * (1 - Math.exp(-t / 2));
  G.curve(fwd, 0, 10, C.red, 3); G.curve(rev, 0, 10, C.blue, 3);
  txt(s, 'forward', G.px(1.1), G.py(fwd(0.6)) - 0.15, 1.2, 0.3, { size: 14, bold: true, color: C.red });
  txt(s, 'reverse', G.px(1.1), G.py(rev(0.6)) - 0.05, 1.2, 0.3, { size: 14, bold: true, color: C.blue });
  txt(s, 'equilibrium: rates equal', G.px(5.5), G.py(4) - 0.55, 2.8, 0.3, { size: 14, bold: true });
  const bx = MX + 7.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.3, 'In a closed system', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Forward rate **falls** as reactants are used up.', 'Reverse rate **rises** as products build up.', 'Eventually the rates are **equal**.'], 16, 0.12);
  note(s, bx, 4.9, bw, 1.95, '**Dynamic**: both reactions **keep going**. The amounts of reactants and products **stay constant** (but are not necessarily equal).', { size: 16 });
  notes(s, 'Spec 4.6.2.3: "When a reversible reaction occurs in apparatus which prevents the escape of reactants and products, equilibrium is reached when the forward and reverse reactions occur exactly at the same rate." Common misconception: at equilibrium the concentrations of reactants and products are equal. They are constant, not equal. Curves are schematic.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which statement about a reaction at dynamic equilibrium is true?',
  options: ['Forward and reverse rates are equal', 'The reactions have stopped', 'There are equal amounts of reactants and products', 'It can happen in an open beaker'],
  correct: 0,
  notes: 'Answer A. B: they continue (dynamic). C: amounts are constant, not equal. D: it needs a closed system.',
});

// ---------------- Part 4 (HT) ----------------
{
  const s = frame('Part 4: Le Chatelier’s principle', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.05, 'FBEAEA', C.red, { lw: 2 });
  txt(s, 'If the **conditions** of a system at equilibrium are **changed**, the position of equilibrium **shifts to counteract the change**.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.05, { size: 19, valign: 'middle', align: 'center' });
  const tw = W - 2 * MX;
  table(s, MX, 2.7, [tw * 0.3, tw * 0.7], ['Change', 'Position of equilibrium moves…'], [
    ['Add more reactant', 'to the **right**: more product forms (uses up the extra reactant)'],
    ['Remove product', 'to the **right**: more product forms to replace it'],
    ['Increase temperature', 'in the **endothermic** direction (takes in the extra energy)'],
    ['Decrease temperature', 'in the **exothermic** direction'],
    ['Increase pressure (gases)', 'to the side with **fewer molecules** of gas'],
  ], { rh: 0.68, size: 17 });
  notes(s, 'Spec 4.6.2.4 (HT): "The relative amounts of all the reactants and products at equilibrium depend on the conditions of the reaction. If a system is at equilibrium and a change is made to any of the conditions, then the system responds to counteract the change. The effects of changing conditions on a system at equilibrium can be predicted using Le Chatelier\'s Principle. Students should be able to make qualitative predictions about the effect of changes on systems at equilibrium when given appropriate information." A catalyst does NOT change the position of equilibrium; it only makes equilibrium reach faster.');
}

{
  const s = frame('Worked example: the Haber process', HT);
  eqn(s, MX + 0.4, 1.5, 'N₂(g) + 3H₂(g)', '2NH₃(g)', 26, { aw: 0.9 });
  txt(s, 'Forward reaction is **exothermic**. 4 molecules of gas → 2 molecules of gas.', MX + 0.4, 2.3, W - 2 * MX - 0.8, 0.45, { size: 18 });
  const tw = W - 2 * MX;
  table(s, MX, 3.0, [tw * 0.3, tw * 0.25, tw * 0.45], ['Change', 'Shift', 'Effect on yield of ammonia'], [
    ['Increase pressure', '→ right', '**increases** (fewer gas molecules on the right)'],
    ['Increase temperature', '← left', '**decreases** (reverse is endothermic)'],
    ['Remove ammonia', '→ right', '**increases**'],
    ['Add a catalyst (iron)', 'no shift', 'no change; equilibrium reached **faster**'],
  ], { rh: 0.62, size: 17, align: ['left', 'center', 'left'] });
  note(s, MX, 6.2, tw, 0.65, 'The real conditions are a **compromise**: see 4.10.4 (the Haber process).', { size: 16 });
  notes(s, 'Spec 4.6.2.5–4.6.2.7 (HT). Concentration: "If the concentration of one of the reactants is increased, more products will be formed until equilibrium is reached again." Temperature: "If the temperature of a system at equilibrium is increased: the relative amount of products at equilibrium increases for an endothermic reaction; the relative amount of products at equilibrium decreases for an exothermic reaction." Pressure: "For gaseous reactions at equilibrium: an increase in pressure causes the equilibrium position to shift towards the side with the smaller number of molecules as shown by the symbol equation for that reaction." Checked in the build script.');
}

D.myTurnYourTurn({
  title: 'Predict the shift', tag: 'HT • Skill practice', stepSize: 16, labelW: 2.6, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Reversible: 2SO₂(g) + O₂(g) → 2SO₃(g)\nForward reaction is exothermic.',
    steps: [
      { label: 'Increase pressure', text: '**right** (3 → 2 molecules)' },
      { label: 'Increase temperature', text: '**left** (endothermic way)' },
      { label: 'Add more O₂', text: '**right**: more SO₃' },
    ],
  },
  yours: {
    q: 'Reversible: N₂O₄(g) → 2NO₂(g)\nForward reaction is endothermic.',
    steps: [
      { label: 'Increase pressure', text: '**left** (1 molecule on the left)' },
      { label: 'Increase temperature', text: '**right** (endothermic way)' },
      { label: 'Remove NO₂', text: '**right**: more NO₂ forms' },
    ],
  },
  notes: 'Both are reversible (⇌) reactions. N₂O₄ is colourless and NO₂ is brown, so the colour shows the shift: heating makes it darker brown. All predictions checked in the build script.',
});

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'Reversible: H₂(g) + I₂(g) → 2HI(g). What happens to the position of equilibrium if the pressure is increased?',
  options: ['No change', 'Moves right', 'Moves left', 'The reaction stops'],
  correct: 0,
  notes: 'Answer A: 2 molecules of gas on each side, so pressure has no effect on the position (both rates increase equally).',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is a reversible reaction?', 'Products can react to form the reactants again'], ['What is a closed system?', 'Nothing can get in or out'], ['What is equal at dynamic equilibrium?', 'The rates of forward and reverse reactions'], ['What does a catalyst do to the position of equilibrium?', 'Nothing (equilibrium reached faster)'],
    ['Heating blue copper sulfate: what colour and what type of reaction?', 'White; endothermic'], ['Why does adding water to white copper sulfate get hot?', 'Reverse reaction is exothermic'],
    ['Reversible: CO + 2H₂ → CH₃OH (all gases). Effect of higher pressure? (HT)', 'Moves right: more methanol'], ['Forward reaction is endothermic. Effect of cooling? (HT)', 'Moves left: less product'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) the products can react to produce the original reactants  2) no reactants or products can escape (or enter)  3) the rates of the forward and reverse reactions  4) no effect on position; both rates increase equally so equilibrium is reached sooner  5) white; endothermic  6) the reverse reaction is exothermic (same energy as taken in)  7) 3 gas molecules → 1, so moves right, more methanol  8) cooling favours the exothermic (reverse) direction: moves left.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'Hydrogen is made by this reversible reaction. The forward reaction is endothermic.',
  table: (s, y) => { eqn(s, MX + 0.6, y, 'CH₄(g) + H₂O(g)', 'CO(g) + 3H₂(g)', 18, { aw: 0.7 }); return y + 0.45; },
  parts: [
    { l: 'a', q: 'What does the double arrow in the equation show?', m: 1, lines: 0 },
    { l: 'b', q: 'Describe what is meant by dynamic equilibrium.', m: 2, lines: 1 },
    { l: 'c', q: 'Predict and explain the effect of increasing the temperature on the yield of hydrogen. (HT)', m: 3, lines: 1 },
    { l: 'd', q: 'Predict and explain the effect of increasing the pressure on the yield of hydrogen. (HT)', m: 3, lines: 1 },
    { l: 'e', q: 'Explain why adding a catalyst does not change the yield.', m: 1, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'the reaction is reversible', '1', ''],
    ['(b)', 'forward and reverse reactions happen at the same rate; amounts of reactants and products stay constant (closed system)', '2', ''],
    ['(c)', 'yield increases; equilibrium shifts right / in the endothermic direction; to take in the added energy (oppose the change)', '3', ''],
    ['(d)', 'yield decreases; equilibrium shifts left; fewer gas molecules on the left (2 vs 4)', '3', ''],
    ['(e)', 'it speeds up forward and reverse reactions equally', '1', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What does "dynamic" mean in dynamic equilibrium?', 'Forward is exothermic, 30 kJ. Reverse?', 'State Le Chatelier’s principle. (HT)', 'More pressure: which side is favoured? (HT)'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) both reactions are still happening  2) endothermic, 30 kJ taken in  3) if conditions change, the equilibrium shifts to counteract the change  4) the side with fewer molecules of gas. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Describe the ammonium chloride experiment and explain what you see.',
    'Explain how anhydrous copper sulfate is used to test for water.',
    'Sketch forward and reverse rate against time, reaching equilibrium.',
    'HT: reversible N₂ + 3H₂ → 2NH₃ (exothermic). Predict four changes to yield.',
    'HT: why is a catalyst still useful if it does not change the yield?',
    'HT: reversible N₂O₄ (colourless) → 2NO₂ (brown), endothermic. Predict the colour when heated and when pressure rises.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) white solid disappears on heating; reforms at the cool top  2) white turns blue with water (exothermic)  3) forward falls, reverse rises, meet and level off  4) higher pressure up; higher temperature down; remove NH₃ up; catalyst no change  5) equilibrium reached faster, so more product per hour; lower temperature can be used  6) heated: darker brown (shift right); higher pressure: paler (shift left, fewer molecules).');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.6_C_ReversibleEquilibrium.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
