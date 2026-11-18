// build_4_8_B.js — AQA GCSE Chemistry (8462) 4.8 Chemical analysis, lesson 2 of 2 (chemistry only):
// 4.8.3.1 Flame tests, 4.8.3.2 Metal hydroxides, 4.8.3.3 Carbonates, 4.8.3.4 Halides, 4.8.3.5 Sulfates,
// 4.8.3.6 Instrumental methods, 4.8.3.7 Flame emission spectroscopy. (RP7: identifying ions.)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_8_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.8.3', 'Identifying ions'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= checks =======================
const charge = (label, L, R) => calc('charge ' + label, L.reduce((a, b) => a + b, 0), R.reduce((a, b) => a + b, 0));
// ionic equations: atoms and charges
balanced('Cu(OH)2', [[1, 'Cu'], [2, 'OH']], [[1, 'Cu(OH)2']]); charge('Cu', [2, -2], [0]);
balanced('Fe(OH)2', [[1, 'Fe'], [2, 'OH']], [[1, 'Fe(OH)2']]); charge('Fe2', [2, -2], [0]);
balanced('Fe(OH)3', [[1, 'Fe'], [3, 'OH']], [[1, 'Fe(OH)3']]); charge('Fe3', [3, -3], [0]);
balanced('Al(OH)3', [[1, 'Al'], [3, 'OH']], [[1, 'Al(OH)3']]); charge('Al', [3, -3], [0]);
balanced('Mg(OH)2', [[1, 'Mg'], [2, 'OH']], [[1, 'Mg(OH)2']]); charge('Mg', [2, -2], [0]);
balanced('Ca(OH)2', [[1, 'Ca'], [2, 'OH']], [[1, 'Ca(OH)2']]); charge('Ca', [2, -2], [0]);
balanced('AgCl', [[1, 'Ag'], [1, 'Cl']], [[1, 'AgCl']]); charge('AgCl', [1, -1], [0]);
balanced('AgBr', [[1, 'Ag'], [1, 'Br']], [[1, 'AgBr']]); balanced('AgI', [[1, 'Ag'], [1, 'I']], [[1, 'AgI']]);
balanced('BaSO4', [[1, 'Ba'], [1, 'SO4']], [[1, 'BaSO4']]); charge('BaSO4', [2, -2], [0]);
balanced('carbonate', [[1, 'CO3'], [2, 'H']], [[1, 'CO2'], [1, 'H2O']]); charge('CO3', [-2, 2], [0]);
balanced('Na2CO3+HCl', [[1, 'Na2CO3'], [2, 'HCl']], [[2, 'NaCl'], [1, 'H2O'], [1, 'CO2']]);
balanced('CuSO4+NaOH', [[1, 'CuSO4'], [2, 'NaOH']], [[1, 'Cu(OH)2'], [1, 'Na2SO4']]);
balanced('FeCl3+NaOH', [[1, 'FeCl3'], [3, 'NaOH']], [[1, 'Fe(OH)3'], [3, 'NaCl']]);
// identification logic: [flame, hydroxide] -> ion
const ID = { 'lilac': 'K+', 'yellow': 'Na+', 'crimson': 'Li+', 'orange-red': 'Ca2+', 'green': 'Cu2+' };
const PPT = { 'blue': 'Cu2+', 'green': 'Fe2+', 'brown': 'Fe3+' };
calc('flame crimson', ID.crimson === 'Li+' ? 1 : 0, 1); calc('ppt brown', PPT.brown === 'Fe3+' ? 1 : 0, 1);
calc('exam X: green flame, blue ppt, white AgCl', ID.green === 'Cu2+' && PPT.blue === 'Cu2+' ? 1 : 0, 1);

// ======================= drawings =======================
function flame(s, cx, y, col, lab) {
  s.addShape(D.SH.ellipse, { x: cx - 0.35, y, w: 0.7, h: 1.4, fill: { color: col }, line: { color: col, width: 1 } });
  s.addShape(D.SH.ellipse, { x: cx - 0.17, y: y + 0.6, w: 0.34, h: 0.75, fill: { color: 'FFFFFF', transparency: 40 }, line: { color: 'FFFFFF', width: 0 } });
  rect(s, cx - 0.2, y + 1.4, 0.4, 0.5, '9E9E9E', '666666');
  txt(s, lab, cx - 1.2, y + 1.95, 2.4, 0.35, { size: 15, bold: true, align: 'center' });
}
function tube(s, x, y, col, lab, res) {
  rect(s, x, y, 0.6, 1.5, C.white, C.ink, { lw: 1.5 });
  rect(s, x + 0.04, y + 0.8, 0.52, 0.66, 'EAF2FA', 'EAF2FA');
  if (col) rect(s, x + 0.04, y + 1.12, 0.52, 0.34, col, col);
  txt(s, lab, x - 0.6, y + 1.55, 1.8, 0.35, { size: 14, bold: true, align: 'center' });
  txt(s, res, x - 0.7, y + 1.9, 2.0, 0.6, { size: 13, align: 'center' });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Flame tests, hydroxide precipitates, tests for negative ions, and instrumental methods',
  bullets: ['Part 1: flame tests (4.8.3.1)', 'Part 2: metal hydroxide precipitates (4.8.3.2)', 'Part 3: carbonates, halides and sulfates (4.8.3.3–5)', 'Part 4: instrumental methods (4.8.3.6–7)'],
  notes: 'AQA 8462 GCSE Chemistry 4.8, lesson 2 of 2 (separate science only). Required practical 7: use chemical tests to identify the ions in unknown single ionic compounds. Colours shown are approximate. About two hours.',
});

D.objectives({
  tag: '4.8.3',
  items: [
    'Identify **metal ions** using **flame tests**.',
    'Identify metal ions from **hydroxide precipitates**; write ionic equations (HT).',
    'Test for **carbonate**, **halide** and **sulfate** ions.',
    'Compare **instrumental methods** with chemical tests; use **flame emission spectroscopy**.',
  ],
  keywords: ['flame test', 'precipitate', 'halide', 'sulfate', 'instrumental', 'spectroscopy'],
  notes: 'Share the objectives. An ionic compound has a positive ion (usually a metal) and a negative ion: find both.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Test for carbon dioxide?', 'What is a precipitate?', 'Write the formula of copper(II) hydroxide.', 'What is an ionic equation? (HT)'],
  answers: ['limewater turns milky', 'an insoluble solid formed in a solution', 'Cu(OH)₂', 'shows only the ions that react'],
  notes: 'Retrieval from lesson 1, 4.1 and 4.2.',
});

D.vocab({
  title: 'Key words', tag: '4.8.3',
  items: [
    { term: 'Flame test', def: 'Some metal ions give a **characteristic colour** in a flame.' },
    { term: 'Precipitate', def: 'An **insoluble solid** formed when two solutions are mixed.' },
    { term: 'Halide ion', def: 'A negative ion from group 7: **Cl⁻, Br⁻, I⁻**.' },
    { term: 'Instrumental method', def: 'Analysis by a **machine**: **accurate, sensitive, rapid**.' },
  ],
  notes: 'Spec 4.8.3.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: flame tests', { tag: '4.8.3.1' });
  [['C0392B', 'lithium: crimson'], ['F0B400', 'sodium: yellow'], ['A57FD6', 'potassium: lilac'], ['E8642C', 'calcium: orange-red'], ['2EA35A', 'copper: green']].forEach(([c, l], i) => flame(s, MX + 1.1 + i * 2.5, 1.55, c, l));
  headCard(s, MX, 4.4, W - 2 * MX, 2.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 5.1, W - 2 * MX - 0.4, ['Clean a **nichrome wire** loop in acid, then in the flame until there is no colour.', 'Dip it in the solid (or solution); hold it in the **blue (roaring) flame**; note the colour.', '**Limitation:** if a sample has **a mixture of ions**, some colours may be **masked** (e.g. yellow hides lilac).'], 16, 0.1);
  notes(s, 'Spec 4.8.3.1: "Flame tests can be used to identify some metal ions (cations). Lithium, sodium, potassium, calcium and copper compounds produce distinctive colours in flame tests: lithium compounds result in a crimson flame; sodium compounds result in a yellow flame; potassium compounds result in a lilac flame; calcium compounds result in an orange-red flame; copper compounds result in a green flame. If a sample containing a mixture of ions is used some flame colours can be masked." Colours on screen are approximate.');
}

D.hinge({
  title: 'Quick check',
  q: 'A compound gives a lilac flame. Which ion is present?',
  options: ['K⁺', 'Na⁺', 'Li⁺', 'Cu²⁺'],
  correct: 0,
  notes: 'Answer A: potassium. B is yellow, C crimson, D green.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: metal hydroxide precipitates', { tag: '4.8.3.2' });
  txt(s, 'Add a few drops of **sodium hydroxide** solution:', MX, 1.35, W - 2 * MX, 0.4, { size: 18 });
  [['FFFFFF', 'Al³⁺', 'white; dissolves in excess'], ['FFFFFF', 'Ca²⁺', 'white'], ['FFFFFF', 'Mg²⁺', 'white'], ['3C7DC4', 'Cu²⁺', 'blue'], ['6E9E4A', 'Fe²⁺', 'green'], ['A0522D', 'Fe³⁺', 'brown']].forEach(([c, l, r], i) => tube(s, MX + 0.9 + i * 2.05, 1.95, c === 'FFFFFF' ? 'F2F2F2' : c, l, r));
  note(s, MX, 5.0, W - 2 * MX, 1.85, '**Telling the white ones apart:** add **excess** NaOH: **aluminium** hydroxide **dissolves**; calcium and magnesium do not. Then a **flame test**: calcium is **orange-red**; magnesium gives **no colour**.', { size: 17 });
  notes(s, 'Spec 4.8.3.2: "Sodium hydroxide solution can be used to identify some metal ions (cations). Solutions of aluminium, calcium and magnesium ions form white precipitates when sodium hydroxide solution is added but only the aluminium hydroxide precipitate dissolves in excess sodium hydroxide solution. Solutions of copper(II), iron(II) and iron(III) ions form coloured precipitates when sodium hydroxide solution is added. Copper(II) forms a blue precipitate, iron(II) a green precipitate and iron(III) a brown precipitate." White precipitates are drawn pale grey so they show on the slide.');
}

{
  const s = frame('Ionic equations for precipitates', HT);
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.2, tw * 0.5, tw * 0.3], ['Ion', 'Ionic equation', 'Precipitate'], [
    ['Cu²⁺', 'Cu²⁺(aq) + 2OH⁻(aq) → Cu(OH)₂(s)', 'blue'],
    ['Fe²⁺', 'Fe²⁺(aq) + 2OH⁻(aq) → Fe(OH)₂(s)', 'green'],
    ['Fe³⁺', 'Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s)', 'brown'],
    ['Al³⁺', 'Al³⁺(aq) + 3OH⁻(aq) → Al(OH)₃(s)', 'white'],
    ['Mg²⁺', 'Mg²⁺(aq) + 2OH⁻(aq) → Mg(OH)₂(s)', 'white'],
  ], { rh: 0.68, size: 17 });
  note(s, MX, 5.6, tw, 1.25, 'The **number of OH⁻** equals the **charge on the metal ion**. Na⁺ and the original negative ion are **spectator ions**.', { size: 17 });
  notes(s, 'Spec 4.8.3.2 (HT): "Students should be able to write balanced equations for the reactions to produce the insoluble hydroxides. Students should be able to write ionic equations for the reactions..." Full equation example: CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄. Every ionic equation is checked for atoms and charge in the build script.');
}

D.myTurnYourTurn({
  title: 'Identify the metal ion', tag: 'Skill practice', stepSize: 17, labelW: 4.4, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Results:',
    steps: [
      { label: 'Green flame; blue precipitate', text: '**Cu²⁺**' },
      { label: 'White ppt that dissolves in excess', text: '**Al³⁺**' },
      { label: 'Brown precipitate', text: '**Fe³⁺**' },
    ],
  },
  yours: {
    q: 'Results (white ppts do not dissolve in excess):',
    steps: [
      { label: 'Green precipitate', text: '**Fe²⁺**' },
      { label: 'White ppt; orange-red flame', text: '**Ca²⁺**' },
      { label: 'White ppt; no flame colour', text: '**Mg²⁺**' },
    ],
  },
  notes: 'Students should practise using two tests together. Watch: green FLAME = copper; green PRECIPITATE = iron(II).',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: tests for negative ions', { tag: '4.8.3.3–5' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.16, tw * 0.44, tw * 0.4], ['Ion', 'Test', 'Positive result'], [
    ['Carbonate CO₃²⁻', 'add **dilute acid**; bubble the gas through **limewater**', '**fizzes**; limewater turns **milky** (CO₂)'],
    ['Chloride Cl⁻', 'add **dilute nitric acid**, then **silver nitrate** solution', '**white** precipitate (AgCl)'],
    ['Bromide Br⁻', 'dilute nitric acid, then silver nitrate', '**cream** precipitate (AgBr)'],
    ['Iodide I⁻', 'dilute nitric acid, then silver nitrate', '**yellow** precipitate (AgI)'],
    ['Sulfate SO₄²⁻', 'add **dilute hydrochloric acid**, then **barium chloride** solution', '**white** precipitate (BaSO₄)'],
  ], { rh: 0.68, size: 15 });
  note(s, MX, 5.85, tw, 1.0, 'The acid is added first to **remove carbonate ions**, which would also give a precipitate. Use **nitric** acid for halides (HCl would add Cl⁻); use **HCl** for sulfates (not sulfuric acid).', { size: 16 });
  notes(s, 'Spec 4.8.3.3–4.8.3.5. Carbonates: "Carbonates react with dilute acids to form carbon dioxide gas. Carbon dioxide can be identified with limewater." Halides: "Halide ions in solution produce precipitates with silver nitrate solution in the presence of dilute nitric acid. Silver chloride is white, silver bromide is cream and silver iodide is yellow." Sulfates: "Sulfate ions in solution produce a white precipitate with barium chloride solution in the presence of dilute hydrochloric acid." Ionic equations: Ag⁺ + Cl⁻ → AgCl; Ba²⁺ + SO₄²⁻ → BaSO₄ (checked).');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is dilute nitric acid, not hydrochloric acid, added before silver nitrate?',
  options: ['HCl would add chloride ions', 'Nitric acid makes a colour', 'HCl reacts with silver to make gas', 'Nitric acid is stronger'],
  correct: 0,
  notes: 'Answer A: HCl contains Cl⁻, which would give a white precipitate even if no chloride were in the sample.',
});

{
  const s = frame('Required practical 7: identifying ions', { tag: 'Required practical 7' });
  headCard(s, MX, 1.4, 6.2, 5.45, 'Plan for an unknown solid', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 5.8, ['**Flame test** on the solid: Li, Na, K, Ca, Cu?', 'Dissolve in water. Add **NaOH**: which hydroxide precipitate?', 'Add dilute acid: **fizzing**? → carbonate.', 'Add **HNO₃ + AgNO₃**: halide?', 'Add **HCl + BaCl₂**: sulfate?', 'Combine: e.g. lilac + cream ppt = **potassium bromide**.'], 15, 0.1);
  const bx = MX + 6.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.0, 'Safety and accuracy', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Goggles; NaOH is **corrosive**.', 'Use **small** amounts; clean equipment between tests.', 'Observe against a white or dark background.'], 15, 0.1);
  note(s, bx, 4.6, bw, 2.25, 'Example: a white solid fizzes with acid and gives a **crimson** flame. It is **lithium carbonate**.', { size: 16 });
  notes(s, 'RP7: "use of chemical tests to identify the ions in unknown single ionic compounds covering the ions from sections Flame tests through to Sulfates." Students should practise writing up observations and conclusions.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: instrumental methods', { tag: '4.8.3.6' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.2, 'Advantages', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['**Accurate**', '**Sensitive**: detect very small amounts.', '**Rapid**: results in seconds.'], 18, 0.15);
  headCard(s, MX + cw + gap, 1.4, cw, 3.2, 'Disadvantages', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['**Expensive** to buy and run.', 'Need **trained** people.', 'Often need data to **compare** against.'], 18, 0.15);
  note(s, MX, 4.85, W - 2 * MX, 2.0, 'Examples: flame emission spectroscopy, mass spectrometry, gas chromatography. Used in **hospitals**, **forensics**, **environmental monitoring** and food testing, where chemical tests are not sensitive enough.', { size: 17 });
  notes(s, 'Spec 4.8.3.6: "Elements and compounds can be detected and identified using instrumental methods. Instrumental methods are accurate, sensitive and rapid. Students should be able to state advantages of instrumental methods compared with the chemical tests in this specification."');
}

{
  const s = frame('Flame emission spectroscopy', { tag: '4.8.3.7' });
  // spectra: lines at positions on a dark bar
  const sx = MX + 0.3, sw = 7.8, sh = 0.55;
  const spec = [['Reference: Li', [0.82]], ['Reference: Na', [0.45]], ['Reference: Ca', [0.7, 0.38]], ['Unknown sample', [0.82, 0.45]]];
  const COL = { 0.82: 'C0392B', 0.45: 'F0B400', 0.7: 'E8642C', 0.38: '2EA35A' };
  spec.forEach(([lab, ls], i) => {
    const y = 1.55 + i * 0.95;
    txt(s, lab, sx, y - 0.02, 2.4, sh, { size: 15, bold: true, valign: 'middle' });
    rect(s, sx + 2.4, y, sw - 2.4, sh, '1B1B2F', '1B1B2F');
    ls.forEach(p => rect(s, sx + 2.4 + p * (sw - 2.4) - 0.04, y, 0.08, sh, COL[p], COL[p]));
  });
  const bx = MX + 8.5, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.4, 'How it works', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Sample in a flame; light passed through a **spectroscope**.', 'Each metal ion gives a **unique line spectrum**.', '**Brightness** (intensity) shows the **concentration**.'], 15, 0.1);
  note(s, MX, 5.55, W - 2 * MX, 1.3, 'The unknown has the lines of **lithium** and **sodium**, so it contains **both**. A flame test would show only one colour (yellow masks crimson).', { size: 17 });
  notes(s, 'Spec 4.8.3.7: "Flame emission spectroscopy is an example of an instrumental method used to analyse metal ions in solutions. The sample is put into a flame and the light given out is passed through a spectroscope. The output is a line spectrum that can be analysed to identify the metal ions in the solution and measure their concentrations. Students should be able to interpret an instrumental result given appropriate data in chart or tabular form, when accompanied by a reference set in the same form." Line positions and colours are schematic, not real wavelengths.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is flame emission spectroscopy better than a flame test for a mixture of ions?',
  options: ['Each ion gives its own lines, so none are masked', 'It is cheaper', 'It uses no flame', 'It changes the ions'],
  correct: 0,
  notes: 'Answer A. B: it is more expensive. C: it does use a flame. D is wrong.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Flame colour of sodium?', 'Yellow'], ['Colour of iron(III) hydroxide?', 'Brown'], ['Test for sulfate ions?', 'HCl then BaCl₂: white precipitate'], ['Colour of silver iodide?', 'Yellow'],
    ['How do you tell Al³⁺ from Mg²⁺?', 'Excess NaOH: Al(OH)₃ dissolves'], ['Orange-red flame; fizzes with acid. Name it.', 'Calcium carbonate'],
    ['Give two advantages of instrumental methods.', 'Accurate, sensitive, rapid'], ['Ionic equation for Fe³⁺ with OH⁻? (HT)', 'Fe³⁺ + 3OH⁻ → Fe(OH)₃'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) yellow  2) brown  3) add dilute HCl then barium chloride solution: white precipitate  4) yellow  5) add excess NaOH: aluminium hydroxide dissolves, magnesium hydroxide does not  6) calcium carbonate  7) accurate, sensitive, rapid  8) Fe³⁺(aq) + 3OH⁻(aq) → Fe(OH)₃(s).');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'Compound X gives a green flame. Its solution gives a blue precipitate with sodium hydroxide, and a white precipitate with nitric acid and silver nitrate.',
  parts: [
    { l: 'a', q: 'Identify compound X. Explain how each result helps.', m: 3, lines: 1 },
    { l: 'b', q: 'Write the ionic equation for the blue precipitate forming. (HT)', m: 2, lines: 0 },
    { l: 'c', q: 'Describe a test to show that a solution contains sulfate ions, and the result.', m: 2, lines: 0 },
    { l: 'd', q: 'A sample contains sodium and lithium ions. Explain why flame emission spectroscopy is better than a flame test for this sample.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'copper chloride; green flame / blue precipitate shows Cu²⁺; white precipitate with silver nitrate shows Cl⁻', '3', ''],
    ['(b)', 'Cu²⁺ + 2OH⁻ → Cu(OH)₂ (species 1, balanced 1)', '2', 'state symbols not needed'],
    ['(c)', 'add dilute HCl then barium chloride solution; white precipitate', '2', ''],
    ['(d)', 'flame test colours mask each other (yellow hides crimson); spectroscopy gives separate lines for each ion; can also measure concentration / more sensitive', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Flame colour of copper compounds?', 'Which hydroxide precipitate is green?', 'Colour of silver bromide?', 'Why add acid before testing for halides?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) green  2) iron(II) hydroxide  3) cream  4) to remove carbonate ions, which would also give a precipitate. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Make a revision table: flame colours and hydroxide colours.',
    'Describe the tests for carbonate, halide and sulfate ions, with results.',
    'Plan how to identify an unknown white solid (RP7).',
    'Identify: lilac flame; white ppt with HCl + BaCl₂.',
    'HT: write ionic equations for Fe²⁺, Al³⁺ and Ca²⁺ with hydroxide ions.',
    'Give two advantages and one disadvantage of instrumental methods.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) see the slides  2) see Part 3  3) see RP7  4) potassium sulfate  5) Fe²⁺ + 2OH⁻ → Fe(OH)₂; Al³⁺ + 3OH⁻ → Al(OH)₃; Ca²⁺ + 2OH⁻ → Ca(OH)₂  6) accurate, sensitive, rapid; expensive / need training.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.8_B_IdentifyingIons.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
