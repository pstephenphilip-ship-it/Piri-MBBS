// build_4_1_A.js — AQA GCSE Chemistry (8462) 4.1 Atomic structure and the periodic table, lesson 1 of 3:
// 4.1.1.1 Atoms, elements and compounds (symbols, formulae, equations), 4.1.1.2 Mixtures,
// separation: filtration, crystallisation, simple and fractional distillation, paper chromatography.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_1_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, atoms, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.1.1', 'Atoms, equations and mixtures'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, ell, ball, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= checks =======================
calc('atoms H2O', atoms('H2O'), 3); calc('atoms CO2', atoms('CO2'), 3); calc('atoms CaCO3', atoms('CaCO3'), 5);
calc('atoms Ca(OH)2', atoms('Ca(OH)2'), 5); calc('atoms H2SO4', atoms('H2SO4'), 7); calc('atoms Mg(NO3)2', atoms('Mg(NO3)2'), 9);
calc('atoms (NH4)2SO4', atoms('(NH4)2SO4'), 15); calc('atoms Al2(SO4)3', atoms('Al2(SO4)3'), 17); calc('atoms C6H12O6', atoms('C6H12O6'), 24);
balanced('Mg+O2', [[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]);
balanced('CH4', [[1, 'CH4'], [2, 'O2']], [[1, 'CO2'], [2, 'H2O']]);
balanced('MT1 Na+Cl2', [[2, 'Na'], [1, 'Cl2']], [[2, 'NaCl']]);
balanced('MT2 H2+O2', [[2, 'H2'], [1, 'O2']], [[2, 'H2O']]);
balanced('MT3 Fe2O3', [[1, 'Fe2O3'], [3, 'CO']], [[2, 'Fe'], [3, 'CO2']]);
balanced('YT1 K+Br2', [[2, 'K'], [1, 'Br2']], [[2, 'KBr']]);
balanced('YT2 N2+H2', [[1, 'N2'], [3, 'H2']], [[2, 'NH3']]);
balanced('YT3 C3H8', [[1, 'C3H8'], [5, 'O2']], [[3, 'CO2'], [4, 'H2O']]);
balanced('Ca+HCl', [[1, 'Ca'], [2, 'HCl']], [[1, 'CaCl2'], [1, 'H2']]);
balanced('Al+O2', [[4, 'Al'], [3, 'O2']], [[2, 'Al2O3']]);
balanced('exam Li+H2O', [[2, 'Li'], [2, 'H2O']], [[2, 'LiOH'], [1, 'H2']]);
balanced('HW Mg+HCl', [[1, 'Mg'], [2, 'HCl']], [[1, 'MgCl2'], [1, 'H2']]);
balanced('HW C2H6', [[2, 'C2H6'], [7, 'O2']], [[4, 'CO2'], [6, 'H2O']]);
balanced('ionic AgCl', [[1, 'Ag'], [1, 'Cl']], [[1, 'AgCl']]);
balanced('NaOH+HCl', [[1, 'NaOH'], [1, 'HCl']], [[1, 'NaCl'], [1, 'H2O']]);

// ======================= local drawings =======================
const RED = 'D9534F', BLUE = '3C7DC4', GREY = '7F8C8D', GOLD = 'E0A83A';
// particle box: kind = 'atoms' | 'molecules' | 'compound' | 'mixture'
function particleBox(s, x, y, w, h, kind) {
  rect(s, x, y, w, h, C.white, C.grey, { lw: 1.5 });
  const d = 0.34;
  const spots = [[0.2, 0.22], [0.55, 0.2], [0.82, 0.3], [0.3, 0.55], [0.68, 0.6], [0.2, 0.85], [0.52, 0.85], [0.84, 0.82]];
  spots.forEach(([fx, fy], i) => {
    const cx = x + fx * w, cy = y + fy * h;
    if (kind === 'atoms') ball(s, cx, cy, d, BLUE);
    else if (kind === 'molecules') { ball(s, cx - d * 0.38, cy, d, RED); ball(s, cx + d * 0.38, cy, d, RED); }
    else if (kind === 'compound') { ball(s, cx - d * 0.38, cy, d, GREY); ball(s, cx + d * 0.38, cy, d, RED); }
    else if (kind === 'mixture') {
      if (i % 3 === 0) ball(s, cx, cy, d, BLUE);
      else if (i % 3 === 1) { ball(s, cx - d * 0.38, cy, d, RED); ball(s, cx + d * 0.38, cy, d, RED); }
      else { ball(s, cx - d * 0.38, cy, d, GREY); ball(s, cx + d * 0.38, cy, d, RED); }
    }
  });
}
function beaker(s, x, y, w, h, liquid) {
  if (liquid) rect(s, x + 0.04, y + h * 0.45, w - 0.08, h * 0.55 - 0.04, liquid);
  seg(s, x, y, x, y + h, C.ink, 2); seg(s, x + w, y, x + w, y + h, C.ink, 2); seg(s, x, y + h, x + w, y + h, C.ink, 2);
}
function funnel(s, cx, top, w) {
  seg(s, cx - w / 2, top, cx - 0.06, top + w * 0.6, C.ink, 2); seg(s, cx + w / 2, top, cx + 0.06, top + w * 0.6, C.ink, 2);
  seg(s, cx - 0.06, top + w * 0.6, cx - 0.06, top + w * 0.6 + 0.35, C.ink, 2); seg(s, cx + 0.06, top + w * 0.6, cx + 0.06, top + w * 0.6 + 0.35, C.ink, 2);
  seg(s, cx - w / 2 + 0.12, top + 0.05, cx, top + w * 0.55, GREY, 1.25, { dash: 'dash' }); seg(s, cx + w / 2 - 0.12, top + 0.05, cx, top + w * 0.55, GREY, 1.25, { dash: 'dash' });
}
function flame(s, cx, y) { s.addShape(D.SH.triangle, { x: cx - 0.15, y, w: 0.3, h: 0.45, fill: { color: 'F39C12' }, line: { color: 'D35400', width: 1 } }); }
function label(s, t, x, y, w = 2.4, o = {}) { txt(s, t, x, y, w, 0.34, Object.assign({ size: 13, bold: true }, o)); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Atoms, elements and compounds, formulae, balanced equations, mixtures and how to separate them',
  bullets: ['Part 1: atoms, elements, compounds and formulae (4.1.1.1)', 'Part 2: word and balanced symbol equations (4.1.1.1)', 'Part 3: mixtures and separation techniques (4.1.1.2)', 'Part 4: choosing a method'],
  notes: 'AQA 8462 GCSE Chemistry (separate science) 4.1 Atomic structure and the periodic table, lesson 1 of 3. Lesson 2: the model of the atom, subatomic particles, isotopes, relative atomic mass and electron arrangement. Lesson 3: the periodic table, groups 0, 1 and 7 and the transition metals. Diagrams are simplified plain-shape sketches. About two hours.',
});

D.objectives({
  tag: '4.1.1',
  items: [
    'Tell apart **atoms**, **elements**, **compounds** and **mixtures**.',
    'Use **chemical symbols** and **formulae**, and count atoms in a formula.',
    'Write **word equations** and **balanced symbol equations** with **state symbols**.',
    'Describe **filtration**, **crystallisation**, **distillation** and **chromatography**, and choose the right one.',
  ],
  keywords: ['atom', 'element', 'compound', 'mixture', 'formula', 'balanced', 'distillation'],
  notes: 'Share the objectives. Every later chemistry topic relies on reading formulae and balancing equations.',
});

D.doNow({
  tag: '5 minutes • retrieval from KS3',
  qs: ['What are the three states of matter?', 'What is the chemical symbol for sodium?', 'Name the gas made when a metal reacts with an acid.', 'How could you get salt back from salt water?'],
  answers: ['solid, liquid, gas', 'Na', 'hydrogen', 'evaporate the water (crystallisation)'],
  notes: 'Quick KS3 recall. Sodium (Na, from natrium) is a common slip.',
});

D.vocab({
  title: 'Key words', tag: '4.1.1',
  items: [
    { term: 'Atom', def: 'The **smallest part of an element** that can exist. All substances are made of atoms.' },
    { term: 'Element', def: 'A substance made of **only one type of atom**. About 100 are shown in the periodic table.' },
    { term: 'Compound', def: 'Two or more elements **chemically combined** in fixed proportions. Only separated by **chemical reactions**.' },
    { term: 'Mixture', def: 'Two or more elements or compounds **not chemically combined**. Separated by **physical processes**.' },
  ],
  notes: 'Spec 4.1.1.1 and 4.1.1.2 definitions, close to the specification wording.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: elements, compounds and mixtures', { tag: '4.1.1.1' });
  const gap = 0.3, bw = (W - 2 * MX - 3 * gap) / 4, bh = 2.6, by = 1.95;
  const kinds = [['atoms', 'Element (atoms)', 'one type of atom, e.g. helium'], ['molecules', 'Element (molecules)', 'one type of atom, joined in pairs, e.g. oxygen O₂'], ['compound', 'Compound', 'different atoms chemically bonded, e.g. carbon monoxide CO'], ['mixture', 'Mixture', 'different substances, not chemically joined']];
  kinds.forEach(([k, head, desc], i) => {
    const x = MX + i * (bw + gap);
    txt(s, head, x, 1.4, bw, 0.45, { size: 18, bold: true, color: C.maroon, align: 'center' });
    particleBox(s, x, by, bw, bh, k);
    txt(s, desc, x, by + bh + 0.15, bw, 1.0, { size: 16, align: 'center' });
  });
  note(s, MX, 5.95, W - 2 * MX, 0.9, 'A **compound** has different properties from the elements in it: sodium (a reactive metal) + chlorine (a toxic gas) → sodium chloride (table salt).', { size: 17 });
  notes(s, 'Spec 4.1.1.1: "Compounds contain two or more elements chemically combined in fixed proportions and can be represented by formulae using the symbols of the atoms from which they were formed. Compounds can only be separated into elements by chemical reactions." Colours: blue = one element, red = another (e.g. oxygen), grey = another (e.g. carbon).');
}

{
  const s = frame('Symbols and formulae', { tag: '4.1.1.1' });
  headCard(s, MX, 1.4, 5.7, 2.6, 'Reading a formula', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 5.3, ['A **small number** after a symbol counts the atom **before** it: H₂O = 2 H, 1 O.', 'A number after a **bracket** multiplies **everything inside**: Ca(OH)₂ = 1 Ca, 2 O, 2 H.'], 17, 0.15);
  headCard(s, MX, 4.2, 5.7, 2.65, 'Naming compounds', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 4.9, 5.3, ['Metal first, non-metal second.', '**-ide**: two elements only, e.g. sodium chlor**ide** NaCl.', '**-ate**: contains oxygen too, e.g. copper sulf**ate** CuSO₄.'], 17, 0.1);
  const tx = MX + 6.1, tw = W - MX - tx;
  table(s, tx, 1.4, [tw * 0.5, tw * 0.25, tw * 0.25], ['Compound', 'Formula', 'Atoms'], [
    ['water', 'H₂O', '3'], ['carbon dioxide', 'CO₂', '3'], ['calcium carbonate', 'CaCO₃', '5'], ['sulfuric acid', 'H₂SO₄', '7'], ['calcium hydroxide', 'Ca(OH)₂', '5'], ['magnesium nitrate', 'Mg(NO₃)₂', '9'], ['glucose', 'C₆H₁₂O₆', '24'],
  ], { rh: 0.66, size: 17, align: ['left', 'center', 'center'] });
  notes(s, 'Spec 4.1.1.1: "Students should be able to use the names and symbols of the first 20 elements in the periodic table, the elements in Groups 1 and 7, and other elements in this specification." Mg(NO₃)₂: 1 Mg + 2 N + 6 O = 9 atoms. All atom counts are checked in the build script.');
}

D.hinge({
  title: 'Quick check',
  q: 'How many atoms are in one unit of ammonium sulfate, (NH₄)₂SO₄?',
  options: ['15', '10', '11', '8'],
  correct: 0,
  notes: 'Answer A: 2 N + 8 H + 1 S + 4 O = 15. B ignores the bracket number (1 N + 4 H + 1 S + 4 O = 10). C doubles only the N (2 + 4 + 1 + 4 = 11). D is a guess that skips the subscripts.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: equations and conservation of mass', { tag: '4.1.1.1' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'In a reaction **no atoms are lost or made**. They are only rearranged. So there must be the **same number of each atom on both sides**.', { fill: C.soft, line: C.line, size: 18 });
  txt(s, 'Word equation', MX, 2.45, 4, 0.4, { size: 18, bold: true, color: C.maroon });
  txt(s, 'magnesium + oxygen → magnesium oxide', MX, 2.85, W - 2 * MX, 0.45, { size: 20 });
  txt(s, 'Balanced symbol equation', MX, 3.45, 6, 0.4, { size: 18, bold: true, color: C.maroon });
  txt(s, '2Mg(s) + O₂(g) → 2MgO(s)', MX, 3.85, W - 2 * MX, 0.5, { size: 24, bold: true });
  // particle picture
  const y = 5.25;
  ball(s, MX + 0.4, y, 0.45, GOLD, 'Mg', C.ink); ball(s, MX + 1.0, y, 0.45, GOLD, 'Mg', C.ink);
  txt(s, '+', MX + 1.35, y - 0.25, 0.4, 0.5, { size: 24, bold: true, align: 'center' });
  ball(s, MX + 1.95, y, 0.45, RED, 'O'); ball(s, MX + 2.35, y, 0.45, RED, 'O');
  arrow(s, MX + 2.8, y, MX + 3.6, y);
  ball(s, MX + 4.05, y, 0.45, GOLD, 'Mg', C.ink); ball(s, MX + 4.45, y, 0.45, RED, 'O');
  ball(s, MX + 5.15, y, 0.45, GOLD, 'Mg', C.ink); ball(s, MX + 5.55, y, 0.45, RED, 'O');
  txt(s, 'Left: 2 Mg, 2 O.   Right: 2 Mg, 2 O.   Balanced.', MX, 5.75, 6.5, 0.45, { size: 17, bold: true, color: C.green });
  const sx = MX + 7.2, sw = W - MX - sx;
  headCard(s, sx, 2.45, sw, 4.4, 'State symbols', C.green, C.greenSoft);
  bullets(s, sx + 0.2, 3.15, sw - 0.4, ['**(s)** solid', '**(l)** liquid', '**(g)** gas', '**(aq)** aqueous: dissolved in water'], 19, 0.2);
  notes(s, 'Spec 4.1.1.1: "Chemical reactions can be represented by word equations or equations using symbols and formulae. Students should be able to use word equations and balanced symbol equations, including state symbols." The big number in front (coefficient) multiplies the whole formula.');
}

{
  const s = frame('How to balance an equation', { tag: '4.1.1.1' });
  headCard(s, MX, 1.4, 5.3, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 4.9, ['Write the **correct formulae**. Never change a formula to balance.', 'Count each type of atom on **both sides**.', 'Put **big numbers in front** of formulae to make the counts equal.', 'Leave **elements on their own** (like O₂) until last.', 'Check again.'], 18, 0.18);
  const ex = MX + 5.7, ew = W - MX - ex;
  rect(s, ex, 1.4, ew, 5.45, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example: burning methane', ex + 0.3, 1.5, ew - 0.6, 0.45, { size: 19, bold: true, color: C.orange });
  const lines = [
    ['Formulae', 'CH₄ + O₂ → CO₂ + H₂O'],
    ['Count', 'left: 1 C, 4 H, 2 O;  right: 1 C, 2 H, 3 O'],
    ['Fix H', 'CH₄ + O₂ → CO₂ + **2**H₂O  (now 4 H, 4 O on right)'],
    ['Fix O', 'CH₄ + **2**O₂ → CO₂ + 2H₂O  (4 O on each side)'],
    ['Check', 'left: 1 C, 4 H, 4 O; right: 1 C, 4 H, 4 O'],
  ];
  lines.forEach(([a, b], i) => {
    const y = 2.15 + i * 0.9;
    txt(s, a, ex + 0.3, y, 1.4, 0.8, { size: 17, bold: true, color: C.maroon });
    txt(s, b, ex + 1.7, y, ew - 2.0, 0.8, { size: 18 });
  });
  notes(s, 'Common error: changing H₂O to H₂O₂ to balance oxygen. That makes a different substance (hydrogen peroxide). Every equation here is checked by an atom counter in the build script.');
}

D.myTurnYourTurn({
  title: 'Balance these equations', tag: 'Skill practice', stepSize: 20, labelW: 0.6, labelSize: 18, labelColor: C.maroon, labelPlain: false,
  mine: {
    q: 'Balance:\n(a)  Na + Cl₂ → NaCl\n(b)  H₂ + O₂ → H₂O\n(c)  Fe₂O₃ + CO → Fe + CO₂',
    steps: [
      { label: 'a', text: '**2**Na + Cl₂ → **2**NaCl' },
      { label: 'b', text: '**2**H₂ + O₂ → **2**H₂O' },
      { label: 'c', text: 'Fe₂O₃ + **3**CO → **2**Fe + **3**CO₂' },
    ],
  },
  yours: {
    q: 'Balance:\n(a)  K + Br₂ → KBr\n(b)  N₂ + H₂ → NH₃\n(c)  C₃H₈ + O₂ → CO₂ + H₂O',
    steps: [
      { label: 'a', text: '**2**K + Br₂ → **2**KBr' },
      { label: 'b', text: 'N₂ + **3**H₂ → **2**NH₃' },
      { label: 'c', text: 'C₃H₈ + **5**O₂ → **3**CO₂ + **4**H₂O' },
    ],
  },
  notes: 'Mine (c): 2 Fe needs Fe₂O₃ → 2Fe; 3 O from Fe₂O₃ go to 3 CO₂, so 3CO. Yours (c): 3 C → 3CO₂; 8 H → 4H₂O; O on right = 6 + 4 = 10, so 5O₂. All checked by atom counting.',
});

{
  const s = frame('Ionic equations', HT);
  note(s, MX, 1.4, W - 2 * MX, 0.95, 'An **ionic equation** shows only the ions that **change**. Ions that stay the same on both sides are **spectator ions** and are left out.', { fill: C.soft, line: C.line, size: 18 });
  txt(s, 'Silver nitrate + sodium chloride → silver chloride (white precipitate) + sodium nitrate', MX, 2.55, W - 2 * MX, 0.45, { size: 17, bold: true, color: C.maroon });
  txt(s, 'AgNO₃(aq) + NaCl(aq) → AgCl(s) + NaNO₃(aq)', MX, 3.05, W - 2 * MX, 0.5, { size: 21 });
  txt(s, 'Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl + Na⁺ + NO₃⁻', MX, 3.7, W - 2 * MX, 0.5, { size: 21 });
  txt(s, 'Cross out Na⁺ and NO₃⁻ (on both sides):', MX, 4.35, W - 2 * MX, 0.45, { size: 18, italic: true, color: C.grey });
  rect(s, MX, 4.9, 6.8, 0.85, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)', MX + 0.3, 4.9, 6.4, 0.85, { size: 24, bold: true, valign: 'middle' });
  note(s, MX + 7.2, 4.9, W - 2 * MX - 7.2, 1.95, 'Neutralisation is always:\n**H⁺(aq) + OH⁻(aq) → H₂O(l)**', { size: 18 });
  txt(s, 'Charges must balance too: left +1 − 1 = 0, right 0.', MX, 6.0, 6.8, 0.45, { size: 17, bold: true, color: C.green });
  notes(s, 'Spec 4.1.1.1 (HT only): "write balanced half equations and ionic equations where appropriate." Half equations come up with electrolysis and redox in 4.4. This is a first look; the precipitate test reappears in 4.8.3.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which equation is correctly balanced?',
  options: ['Ca + 2HCl → CaCl₂ + H₂', 'Ca + HCl → CaCl₂ + H₂', 'Ca + H₂Cl₂ → CaCl₂ + H₂', '2Ca + 2HCl → 2CaCl₂ + H₂'],
  correct: 0,
  notes: 'Answer A. B: 1 H and 1 Cl on the left, 2 of each on the right. C changes the formula of hydrochloric acid (not allowed). D: 2 Ca → 2 Ca fine but 2 Cl on the left, 4 on the right.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: mixtures', { tag: '4.1.1.2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.2, 'Mixture', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['Substances **not chemically combined**.', 'Each keeps its **own properties**.', 'Any proportions.', 'Separated by **physical** processes.'], 18, 0.12);
  headCard(s, MX + cw + gap, 1.4, cw, 3.2, 'Compound', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['Elements **chemically combined**.', '**New properties**.', '**Fixed** proportions (a formula).', 'Only separated by **chemical reactions**.'], 18, 0.12);
  txt(s, 'Physical separation methods', MX, 4.85, 6, 0.45, { size: 19, bold: true, color: C.maroon });
  const m = ['filtration', 'crystallisation', 'simple distillation', 'fractional distillation', 'chromatography'];
  const mw = (W - 2 * MX - 4 * 0.2) / 5;
  m.forEach((t, i) => { const x = MX + i * (mw + 0.2); rect(s, x, 5.4, mw, 1.0, C.orangeSoft, 'F3D9B5', { round: true }); txt(s, t, x + 0.1, 5.4, mw - 0.2, 1.0, { size: 17, bold: true, align: 'center', valign: 'middle' }); });
  notes(s, 'Spec 4.1.1.2: "A mixture consists of two or more elements or compounds not chemically combined together. The chemical properties of each substance in the mixture are unchanged. Mixtures can be separated by physical processes such as filtration, crystallisation, simple distillation, fractional distillation and chromatography. These physical processes do not involve chemical reactions and no new substances are made." Example: air, sea water, crude oil.');
}

{
  const s = frame('Filtration and crystallisation', { tag: '4.1.1.2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  // filtration
  txt(s, 'Filtration', MX, 1.35, cw, 0.45, { size: 21, bold: true, color: C.maroon });
  const fx = MX + 1.9;
  funnel(s, fx, 2.0, 1.5);
  beaker(s, fx - 0.75, 3.35, 1.5, 1.4, 'CFE3F5');
  label(s, 'filter paper', fx + 0.85, 2.15); label(s, 'residue (solid)', fx + 0.85, 2.55);
  label(s, 'filtrate (liquid)', fx + 0.85, 4.15);
  txt(s, 'Separates an **insoluble solid** from a **liquid**. e.g. sand from water.', MX, 5.05, cw, 0.9, { size: 18 });
  // crystallisation
  const x2 = MX + cw + gap;
  txt(s, 'Crystallisation', x2, 1.35, cw, 0.45, { size: 21, bold: true, color: C.maroon });
  const bx = x2 + 1.9;
  s.addShape(D.SH.chord, { x: bx - 0.85, y: 1.85, w: 1.7, h: 1.1, angleRange: [0, 180], fill: { color: 'CFE3F5' }, line: { color: C.ink, width: 2 } });
  seg(s, bx - 1.1, 2.4, bx + 1.1, 2.4, C.grey, 3);
  seg(s, bx - 0.9, 2.4, bx - 1.1, 3.9, C.grey, 3); seg(s, bx + 0.9, 2.4, bx + 1.1, 3.9, C.grey, 3);
  flame(s, bx, 3.35);
  label(s, 'evaporating basin', bx + 1.05, 1.95); label(s, 'gentle heat', bx + 1.35, 3.4);
  txt(s, 'Gets a **soluble solid** from a **solution**. e.g. salt crystals from salt water.', x2, 4.15, cw, 0.9, { size: 18 });
  bullets(s, x2, 4.95, cw, ['Heat to evaporate **some** water until crystals start to form.', 'Leave to cool; **filter** off the crystals and **dry** them.'], 16, 0.08);
  notes(s, 'Crystallisation (rather than heating to dryness) gives bigger, purer crystals and avoids decomposing salts that lose water of crystallisation, such as copper sulfate. Full method returns in the salts required practical (4.4.2.3). The basin is drawn as a simple half-circle.');
}

{
  const s = frame('Simple and fractional distillation', { tag: '4.1.1.2' });
  // simple distillation diagram
  const fx = MX + 1.3, fy = 2.6;
  circle(s, fx, fy + 0.6, 1.3, 'CFE3F5', C.ink, 2);
  rect(s, fx - 0.16, 1.6, 0.32, 1.02, C.white, C.ink, { lw: 2 });
  seg(s, fx, 1.3, fx, 2.25, C.red, 2.5);
  seg(s, fx + 0.16, 1.75, fx + 0.6, 1.75, C.ink, 2);
  flame(s, fx, 3.95);
  // condenser: outer tube from the flask arm down to the beaker
  const A = [fx + 0.6, 1.75], B = [fx + 3.4, 2.55], dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy);
  const nx = -dy / L * 0.2, ny = dx / L * 0.2;
  seg(s, A[0] + 0.5 * dx / L * 0 + nx * -1, A[1] - ny, B[0] - nx, B[1] - ny, C.ink, 2);
  seg(s, A[0] + nx, A[1] + ny, B[0] + nx, B[1] + ny, C.ink, 2);
  seg(s, A[0], A[1], B[0] + 0.25 * dx / L, B[1] + 0.25 * dy / L, C.blue, 1.5);
  const P = t => [A[0] + t * dx, A[1] + t * dy];
  const wi = P(0.85), wo = P(0.15);
  seg(s, wi[0] + nx, wi[1] + ny, wi[0] + nx, wi[1] + ny + 0.3, C.ink, 2);
  seg(s, wo[0] - nx, wo[1] - ny, wo[0] - nx, wo[1] - ny - 0.3, C.ink, 2);
  beaker(s, fx + 3.05, 2.85, 1.0, 0.95, 'CFE3F5');
  label(s, 'water out', wo[0] - nx + 0.1, wo[1] - ny - 0.42, 1.4);
  label(s, 'water in', wi[0] + nx - 1.45, wi[1] + ny + 0.12, 1.4, { align: 'right' });
  label(s, 'condenser', P(0.55)[0] - 0.3, P(0.55)[1] - 0.62, 1.6);
  label(s, 'thermometer', fx - 1.75, 1.3, 1.6, { align: 'right' });
  label(s, 'distillate', fx + 3.05, 3.85, 1.5);
  txt(s, 'Simple distillation', MX, 4.45, 6.0, 0.45, { size: 20, bold: true, color: C.maroon });
  bullets(s, MX, 4.95, 6.0, ['Separates a **solvent** from a **solution**, e.g. pure water from salt water.', 'Liquid **evaporates**, then **condenses** in the cold condenser.'], 17, 0.1);
  const x2 = MX + 6.6, w2 = W - MX - x2;
  headCard(s, x2, 1.4, w2, 5.45, 'Fractional distillation', C.green, C.greenSoft);
  bullets(s, x2 + 0.2, 2.1, w2 - 0.4, ['Separates a mixture of **liquids** with **different boiling points**, e.g. ethanol and water, or crude oil.', 'A **fractionating column** sits above the flask. It is **hotter at the bottom** and cooler at the top.', 'The liquid with the **lowest boiling point** reaches the top and is collected **first**.', 'Watch the thermometer: when the temperature rises to the next boiling point, change the beaker.'], 17, 0.14);
  notes(s, 'Spec 4.1.1.2. Fractional distillation of crude oil is 4.7.1.2. The diagram is simplified (the condenser is a plain rectangle). Ethanol boils at 78 °C, water at 100 °C.');
}

{
  const s = frame('Paper chromatography', { tag: '4.1.1.2' });
  const px = MX + 0.6, py = 1.5, pw = 2.4, ph = 4.6;
  beaker(s, px - 0.3, py + 0.2, pw + 0.6, ph + 0.2, null);
  rect(s, px - 0.26, py + ph - 0.3, pw + 0.52, 0.66, 'CFE3F5');
  rect(s, px, py, pw, ph, C.white, C.grey, { lw: 1.25 });
  seg(s, px, py + ph - 0.6, px + pw, py + ph - 0.6, C.ink, 1.5, { dash: 'dash' });
  seg(s, px, py + 0.45, px + pw, py + 0.45, C.blue, 1.5, { dash: 'dash' });
  circle(s, px + 0.6, py + ph - 0.6, 0.18, C.ink);
  circle(s, px + 1.7, py + ph - 0.6, 0.18, C.ink);
  [[0.6, 1.4, RED], [0.6, 2.9, BLUE], [1.7, 2.9, BLUE]].forEach(([dx, dy, col]) => circle(s, px + dx, py + dy, 0.28, col));
  label(s, 'solvent front', px + pw + 0.35, py + 0.28, 2.0);
  label(s, 'pencil start line', px + pw + 0.35, py + ph - 0.78, 2.2);
  label(s, 'solvent', px + pw + 0.35, py + ph - 0.05, 2.0);
  label(s, 'ink', px + 0.35, py + ph - 0.4, 0.6);
  label(s, 'dye X', px + 1.45, py + ph - 0.4, 0.9);
  const bx = MX + 5.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.3, 'How it works', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Separates **soluble** substances, e.g. **dyes in an ink**.', 'The solvent moves up the paper and carries the dyes.', 'Dyes that are **more soluble** travel **further**.', 'Draw the start line in **pencil** (ink would run).'], 17, 0.12);
  note(s, bx, 4.95, bw, 1.9, 'This ink has **two dyes**. Dye X matches the **blue** dye: same distance up the paper. The full method and **Rf values** come in topic 4.8.', { size: 17 });
  notes(s, 'Spec 4.1.1.2 lists paper chromatography as a separation method. Required practical 12 and Rf calculations are in 4.8.1.3. Keep the start line above the solvent level so the dyes do not wash into the solvent.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which method gets pure water from sea water?',
  options: ['Simple distillation', 'Filtration', 'Crystallisation', 'Chromatography'],
  correct: 0,
  notes: 'Answer A: evaporate the water and condense it. B removes insoluble solids only (salt is dissolved). C keeps the salt and loses the water. D separates dyes.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: choosing a method', { tag: '4.1.1.2' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.42, tw * 0.28, tw * 0.30], ['To separate…', 'Use', 'Because'], [
    ['an insoluble solid from a liquid (sand + water)', 'filtration', 'the solid cannot pass through the paper'],
    ['a soluble solid from a solution (copper sulfate)', 'crystallisation', 'the water evaporates; the solid stays'],
    ['a solvent from a solution (water from ink)', 'simple distillation', 'the solvent boils off and condenses'],
    ['liquids with different boiling points (ethanol + water)', 'fractional distillation', 'each liquid boils at its own temperature'],
    ['dissolved dyes (food colourings)', 'chromatography', 'dyes travel different distances'],
  ], { rh: 0.8, size: 17, boldFirst: false });
  note(s, MX, 6.15, tw, 0.7, 'Rock salt (salt + sand): add water, stir, **filter** off the sand, then **crystallise** the salt.', { size: 17 });
  notes(s, 'Spec 4.1.1.2: "Students should be able to describe, explain and give examples of the specified processes of separation; suggest suitable separation and purification techniques for mixtures when given appropriate information." Multi-step separations (like rock salt) are popular 4-6 mark questions.');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is a compound?', 'Two or more elements chemically combined in fixed proportions'], ['How many atoms in Al₂(SO₄)₃?', '17 (2 Al, 3 S, 12 O)'], ['What does (aq) mean?', 'Dissolved in water'], ['Why must you not change a formula to balance?', 'It would be a different substance'],
    ['Balance: Al + O₂ → Al₂O₃', '4Al + 3O₂ → 2Al₂O₃'], ['Balance: NaOH + HCl → NaCl + H₂O', 'Already balanced (1:1:1:1)'],
    ['How do you separate ethanol from water?', 'Fractional distillation (different boiling points)'], ['Why is the start line drawn in pencil?', 'Pencil does not dissolve and run'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) elements chemically combined in fixed proportions  2) 2 Al + 3 S + 12 O = 17  3) aqueous, dissolved in water  4) changing a formula changes the substance  5) 4Al + 3O₂ → 2Al₂O₃ (4 Al, 6 O each side)  6) already balanced  7) fractional distillation  8) pencil (graphite) is insoluble, ink would separate too.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Lithium reacts with water to make lithium hydroxide (LiOH) and hydrogen. Write a balanced symbol equation, with state symbols.', m: 3, lines: 1 },
    { l: 'b', q: 'Explain the difference between a compound and a mixture.', m: 2, lines: 1 },
    { l: 'c', q: 'A student has a mixture of sand, salt and water. Describe how to get pure, dry salt crystals.', m: 4, lines: 2 },
    { l: 'd', q: 'Write the ionic equation for neutralisation.', m: 1, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'formulae correct: Li + H₂O → LiOH + H₂; balanced: 2Li + 2H₂O → 2LiOH + H₂; state symbols (s), (l), (aq), (g)', '3', ''],
    ['(b)', 'compound: elements chemically combined (fixed proportions); mixture: not chemically combined (separated physically)', '2', ''],
    ['(c)', 'filter to remove sand; heat the filtrate to evaporate some water; leave to cool / crystallise; filter off and dry crystals', '4', ''],
    ['(d)', 'H⁺(aq) + OH⁻(aq) → H₂O(l)', '1', 'HT'],
  ],
  notes: 'Mark scheme on the next slide. All equations checked by atom counting.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What is an element?', 'How many atoms are in Mg(NO₃)₂?', 'Balance: H₂ + Cl₂ → HCl', 'Which method separates dyes in an ink?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) a substance made of only one type of atom  2) 9  3) H₂ + Cl₂ → 2HCl  4) paper chromatography. Revisit the objectives.');
}
balanced('exit HCl', [[1, 'H2'], [1, 'Cl2']], [[2, 'HCl']]);

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw particle diagrams for an element, a compound and a mixture.',
    'Count the atoms in: C₂H₅OH, (NH₄)₃PO₄, Fe₂(SO₄)₃.',
    'Balance: Mg + HCl → MgCl₂ + H₂',
    'Balance: C₂H₆ + O₂ → CO₂ + H₂O',
    'Explain how fractional distillation separates ethanol and water.',
    'Plan how to get dry copper sulfate crystals from copper sulfate solution.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) see Part 1  2) C₂H₅OH 9; (NH₄)₃PO₄ 20; Fe₂(SO₄)₃ 17  3) Mg + 2HCl → MgCl₂ + H₂  4) 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O  5) heat; ethanol has the lower boiling point, rises up the column and condenses first  6) heat to evaporate some water, cool to crystallise, filter, dry.');
}
calc('atoms C2H5OH', atoms('C2H5OH'), 9); calc('atoms (NH4)3PO4', atoms('(NH4)3PO4'), 20); calc('atoms Fe2(SO4)3', atoms('Fe2(SO4)3'), 17);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.1_A_AtomsEquationsMixtures.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
