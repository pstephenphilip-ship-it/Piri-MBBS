// build_4_8_A.js — AQA GCSE Chemistry (8462) 4.8 Chemical analysis, lesson 1 of 2:
// 4.8.1.1 Pure substances, 4.8.1.2 Formulations, 4.8.1.3 Chromatography (RP6),
// 4.8.2 Identification of common gases.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_8_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, helpers } = require('./chem_common');

const D = T.init(deck('4.8.1–2', 'Chromatography and gas tests'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));
const r2 = x => Math.round(x * 100) / 100;

// ======================= checks =======================
near('Rf ex', r2(3.0 / 7.5), 0.40); near('Rf ex2', r2(6.0 / 7.5), 0.80);
near('MT1', r2(2.4 / 8.0), 0.30); near('MT2', r2(5.6 / 8.0), 0.70); near('MT3 dist', 0.45 * 8.0, 3.6);
near('YT1', r2(4.5 / 9.0), 0.50); near('YT2', r2(1.8 / 6.0), 0.30); near('YT3 dist', 0.65 * 10.0, 6.5);
near('exam A', r2(2.1 / 7.0), 0.30); near('exam B', r2(4.9 / 7.0), 0.70); near('practice', r2(3.3 / 5.5), 0.60);
calc('Rf < 1', [0.4, 0.8, 0.3, 0.7, 0.5].every(v => v > 0 && v < 1) ? 1 : 0, 1);

// ======================= drawings =======================
const DYE = { red: 'D9534F', blue: '3C7DC4', yellow: 'E8C21E', green: '5E9C3E' };
// chromatogram: front and start in cm from bottom; lanes: [label, [[cm, colour], ...]]
function chromatogram(s, x, y, w, h, front, lanes, o = {}) {
  const scale = h / (front + 1.4), base = y + h - 0.5;
  const Y = cm => base - cm * scale;
  rect(s, x, y, w, h, C.white, C.grey, { lw: 1.25 });
  seg(s, x, base, x + w, base, C.ink, 1.5, { dash: 'dash' });
  seg(s, x, Y(front), x + w, Y(front), C.blue, 1.5, { dash: 'dash' });
  const lw = w / lanes.length;
  lanes.forEach(([lab, spots], i) => {
    const cx = x + (i + 0.5) * lw;
    circle(s, cx, base, 0.1, C.ink);
    spots.forEach(([cm, col]) => circle(s, cx, Y(cm), 0.3, DYE[col]));
    txt(s, lab, cx - lw / 2, y + h + 0.05, lw, 0.3, { size: 13, bold: true, align: 'center' });
  });
  if (o.labels !== false) {
    txt(s, 'solvent front', x + w + 0.1, Y(front) - 0.17, 1.8, 0.34, { size: 12, bold: true, color: C.blue });
    txt(s, 'start line (pencil)', x + w + 0.1, base - 0.17, 2.0, 0.34, { size: 12, bold: true });
  }
  return { Y, base };
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Pure substances, formulations, paper chromatography and Rf values (required practical 6), and tests for four gases',
  bullets: ['Part 1: pure substances (4.8.1.1)', 'Part 2: formulations (4.8.1.2)', 'Part 3: chromatography and RP6 (4.8.1.3)', 'Part 4: tests for gases (4.8.2)'],
  notes: 'AQA 8462 GCSE Chemistry 4.8 Chemical analysis, lesson 1 of 2. Lesson 2: identifying ions (flame tests, hydroxide precipitates, carbonates, halides, sulfates) and instrumental methods (chemistry only). About two hours.',
});

D.objectives({
  tag: '4.8.1',
  items: [
    'Use **melting and boiling points** to tell **pure** from **impure** substances.',
    'Identify **formulations** and explain why they are useful.',
    'Carry out **paper chromatography** and calculate **Rf values** (**RP6**).',
    'Describe the tests for **hydrogen, oxygen, carbon dioxide** and **chlorine**.',
  ],
  keywords: ['pure', 'formulation', 'chromatography', 'stationary phase', 'mobile phase', 'Rf'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is a mixture?', 'Why is the start line drawn in pencil?', 'What gas is made by acid + carbonate?', 'Products at the anode in NaCl(aq) electrolysis?'],
  answers: ['substances not chemically combined', 'pencil does not dissolve', 'carbon dioxide', 'chlorine'],
  notes: 'Retrieval from 4.1 (mixtures, chromatography introduction) and 4.4.',
});

D.vocab({
  title: 'Key words', tag: '4.8.1',
  items: [
    { term: 'Pure (chemistry)', def: 'A **single element or compound**, not mixed with anything else.' },
    { term: 'Formulation', def: 'A **mixture** designed as a useful product, with each part in a **measured quantity**.' },
    { term: 'Stationary phase', def: 'The part that **does not move**: the **paper**.' },
    { term: 'Mobile phase', def: 'The **solvent** that moves through the paper, carrying the substances.' },
  ],
  notes: 'Spec 4.8.1.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: pure substances', { tag: '4.8.1.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.7, 'Everyday "pure"', C.grey, C.greyLight);
  txt(s, 'Means **natural** or with **nothing added**, e.g. "pure orange juice". It is still a **mixture** of many substances.', MX + 0.2, 2.1, cw - 0.4, 1.9, { size: 18 });
  headCard(s, MX + cw + gap, 1.4, cw, 2.7, 'Chemistry "pure"', C.maroon, C.soft);
  txt(s, 'A **single element or compound**, not mixed with any other substance.', MX + cw + gap + 0.2, 2.1, cw - 0.4, 1.9, { size: 18 });
  const tw = W - 2 * MX;
  table(s, MX, 4.35, [tw * 0.3, tw * 0.35, tw * 0.35], ['', 'Pure substance', 'Impure (mixture)'], [
    ['Melting point', '**sharp**, at one exact temperature', 'over a **range**, and **lower**'],
    ['Boiling point', 'exact (water: 100 °C)', 'higher, over a range (salt water)'],
  ], { rh: 0.72, size: 17 });
  notes(s, 'Spec 4.8.1.1: "In chemistry, a pure substance is a single element or compound, not mixed with any other substance. Pure elements and compounds melt and boil at specific temperatures. Melting point and boiling point data can be used to distinguish pure substances from mixtures. In everyday language, a pure substance can mean a substance that has had nothing added to it, so it is unadulterated and in its natural state, eg pure milk. Students should be able to use melting point and boiling point data to distinguish pure from impure substances."');
}

D.hinge({
  title: 'Quick check',
  q: 'A white solid melts between 118 °C and 124 °C. Pure aspirin melts at 136 °C. What does this show?',
  options: ['The sample is impure', 'The sample is pure aspirin', 'The thermometer is broken', 'It is a different pure substance'],
  correct: 0,
  notes: 'Answer A: impure substances melt over a range and at a lower temperature. D is possible in principle, but a melting RANGE shows a mixture.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: formulations', { tag: '4.8.1.2' });
  note(s, MX, 1.4, W - 2 * MX, 0.9, 'A **formulation** is a mixture made by following a **formula**: each component is added in a **measured quantity** and has a **purpose**.', { fill: C.soft, line: C.line, size: 18 });
  const gap = 0.25, cw = (W - 2 * MX - 3 * gap) / 4, h = 2.0;
  ['Fuels', 'Medicines', 'Paints', 'Cleaning agents', 'Alloys', 'Fertilisers', 'Foods', 'Cosmetics'].forEach((t, i) => {
    const x = MX + (i % 4) * (cw + gap), y = 2.55 + Math.floor(i / 4) * (h * 0.55 + 0.2);
    rect(s, x, y, cw, h * 0.55, i % 2 ? C.white : C.orangeSoft, 'F3D9B5', { round: true });
    txt(s, t, x, y, cw, h * 0.55, { size: 18, bold: true, align: 'center', valign: 'middle' });
  });
  headCard(s, MX, 5.15, W - 2 * MX, 1.7, 'Example: a paint', C.green, C.greenSoft);
  txt(s, '**pigment** (colour) + **binder** (sticks it to the surface) + **solvent** (makes it spread) + **additives** (e.g. to dry faster)', MX + 0.2, 5.8, W - 2 * MX - 0.4, 0.9, { size: 17 });
  notes(s, 'Spec 4.8.1.2: "A formulation is a mixture that has been designed as a useful product. Many products are complex mixtures in which each chemical has a particular purpose. Formulations are made by mixing the components in carefully measured quantities to ensure that the product has the required properties. Formulations include fuels, cleaning agents, paints, medicines, alloys, fertilisers and foods. Students should be able to identify formulations given appropriate information. Students do not need to know the names of components in proprietary products."');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: paper chromatography', { tag: '4.8.1.3' });
  const ch = chromatogram(s, MX + 0.5, 1.5, 3.6, 4.6, 7.5, [['ink', [[3.0, 'red'], [6.0, 'blue']]], ['red dye', [[3.0, 'red']]]]);
  void ch;
  const bx = MX + 7.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.0, 'How it separates', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Each substance is attracted differently to the **paper** (stationary) and the **solvent** (mobile).', 'More attracted to the solvent → travels **further**.'], 16, 0.12);
  headCard(s, bx, 4.6, bw, 2.25, 'Reading it', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 5.3, bw - 0.4, ['A **pure** substance gives **one spot** in every solvent.', 'Same Rf (same height) as a known substance → **likely the same**.'], 16, 0.1);
  notes(s, 'Spec 4.8.1.3: "Chromatography can be used to separate mixtures and can give information to help identify substances. Chromatography involves a stationary phase and a mobile phase. Separation depends on the distribution of substances between the phases... Compounds in a mixture may separate into different spots depending on the solvent but a pure compound will produce a single spot in all solvents." The ink contains the red dye and one other (blue).');
}

{
  const s = frame('Rf values', { tag: '4.8.1.3' });
  const x = MX + 0.5, y = 1.5, w = 2.6, h = 4.9;
  const { Y, base } = chromatogram(s, x, y, w, h, 7.5, [['sample', [[3.0, 'red']]]], { labels: false });
  const ax = x + w + 1.1, ax2 = x + w + 1.6;
  arrow(s, ax, base, ax, Y(3.0) + 0.04, C.red, 2); txt(s, '3.0 cm', ax - 0.95, (base + Y(3.0)) / 2 - 0.17, 0.8, 0.34, { size: 13, bold: true, color: C.red, align: 'right' });
  arrow(s, ax2, base, ax2, Y(7.5) + 0.04, C.blue, 2); txt(s, '7.5 cm', ax2 + 0.08, (base + Y(7.5)) / 2 - 0.17, 0.9, 0.34, { size: 13, bold: true, color: C.blue });
  const bx = MX + 5.6, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 1.5, C.soft, C.line);
  D.math(s, bx + 0.3, 2.15, ['Rf = ', { n: 'distance moved by substance', d: 'distance moved by solvent' }], { size: 20, bold: true });
  rect(s, bx, 3.1, bw, 2.0, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', bx + 0.25, 3.2, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, 'Rf = 3.0 ÷ 7.5 = **0.40**', bx + 0.25, 3.7, bw - 0.5, 0.5, { size: 20 });
  txt(s, 'Measure both from the **start line**.', bx + 0.25, 4.3, bw - 0.5, 0.5, { size: 16 });
  note(s, bx, 5.3, bw, 1.55, 'Rf has **no units** and is always **less than 1**. The same substance has the same Rf in the same solvent.', { size: 16 });
  notes(s, 'Spec 4.8.1.3: "The ratio of the distance moved by a compound (centre of spot from origin) to the distance moved by the solvent can be expressed as its Rf value: Rf = distance moved by substance / distance moved by solvent. Different compounds have different Rf values in different solvents, which can be used to help identify the compounds." Measure to the centre of the spot. Checked in the build script.');
}

D.myTurnYourTurn({
  title: 'Calculate Rf', tag: 'Maths skill', stepSize: 18, labelW: 2.6, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Solvent front at 8.0 cm.',
    steps: [
      { label: 'Spot at 2.4 cm', text: '2.4 ÷ 8.0 = **0.30**' },
      { label: 'Spot at 5.6 cm', text: '5.6 ÷ 8.0 = **0.70**' },
      { label: 'Rf 0.45: how far?', text: '0.45 × 8.0 = **3.6 cm**' },
    ],
  },
  yours: {
    q: 'Use the data given (cm).',
    steps: [
      { label: 'Spot 4.5, front 9.0', text: '**0.50**' },
      { label: 'Spot 1.8, front 6.0', text: '**0.30**' },
      { label: 'Rf 0.65, front 10.0', text: '**6.5 cm**' },
    ],
  },
  notes: 'Rearranging: distance = Rf × solvent distance. All values checked in the build script.',
});

{
  const s = frame('Required practical 6: chromatography', { tag: 'Required practical 6' });
  headCard(s, MX, 1.4, 6.6, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 6.2, ['Draw a **pencil** start line about 1.5 cm from the bottom of the paper.', 'Put small spots of each ink/dye on the line.', 'Stand the paper in a beaker of solvent: **solvent below the start line**; put a lid on.', 'Remove when the solvent is near the top; **mark the solvent front**.', 'Dry; measure the distances; calculate **Rf values**.'], 16, 0.12);
  const bx = MX + 7.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Why?', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Pencil**: insoluble, so it does not run.', 'Solvent **below** the line: otherwise the dyes **dissolve into the solvent**.', '**Lid**: stops the solvent evaporating.', '**Small** spots: give clear, separate spots.'], 15, 0.12);
  notes(s, 'RP6: "investigate how paper chromatography can be used to separate and tell the difference between coloured substances. Students should calculate Rf values." Water is a common solvent for food colourings; ethanol for some inks. A substance that does not move is insoluble in that solvent.');
}

D.hinge({
  title: 'Quick check',
  q: 'A food colouring gives three spots. What does this show?',
  options: ['It is a mixture of at least three substances', 'It is pure', 'The solvent was too deep', 'It contains three elements'],
  correct: 0,
  notes: 'Answer A. B: a pure substance gives one spot. C would wash the spots off the paper. D: spots are compounds (dyes), not elements.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: tests for gases', { tag: '4.8.2' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.2, tw * 0.42, tw * 0.38], ['Gas', 'Test', 'Positive result'], [
    ['Hydrogen', 'hold a **burning (lit) splint** at the mouth of the tube', '**squeaky pop**'],
    ['Oxygen', 'insert a **glowing splint**', 'splint **relights**'],
    ['Carbon dioxide', 'bubble through (or shake with) **limewater**', 'limewater turns **milky (cloudy)**'],
    ['Chlorine', 'hold **damp litmus paper** in the gas', 'litmus is **bleached** (turns white)'],
  ], { rh: 0.95, size: 18 });
  note(s, MX, 5.75, tw, 1.1, 'Limewater is **calcium hydroxide solution**. Chlorine is **toxic**: test in a fume cupboard. Damp blue litmus may turn red first, then bleach.', { size: 16 });
  notes(s, 'Spec 4.8.2.1–4.8.2.4: hydrogen "burns rapidly with a pop sound"; oxygen "relights a glowing splint"; carbon dioxide "limewater turns milky (cloudy)"; chlorine "bleaches damp litmus paper, turning it white". Common slip: "lit splint relights" (that mixes the two tests).');
}

D.hinge({
  title: 'Quick check',
  q: 'A gas relights a glowing splint. Which gas is it?',
  options: ['Oxygen', 'Hydrogen', 'Carbon dioxide', 'Chlorine'],
  correct: 0,
  notes: 'Answer A. B gives a squeaky pop with a lit splint. C turns limewater milky (and would put a splint out). D bleaches damp litmus.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is a pure substance in chemistry?', 'A single element or compound'], ['What is a formulation?', 'A mixture designed as a useful product, in measured amounts'], ['Name the stationary phase in paper chromatography.', 'The paper'], ['Test for carbon dioxide?', 'Limewater turns milky'],
    ['Spot 3.3 cm, solvent 5.5 cm. Rf?', '0.60'], ['Why might a substance stay on the start line?', 'Insoluble in that solvent'],
    ['Sample boils at 102 °C. Is it pure water?', 'No: pure water boils at 100 °C'], ['A gas bleaches damp litmus. Name it.', 'Chlorine'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) a single element or compound not mixed with any other substance  2) a mixture designed as a useful product, with components in measured quantities  3) the paper  4) bubble through limewater, which turns milky  5) 3.3 ÷ 5.5 = 0.60  6) it is insoluble in the solvent (strongly attracted to the paper)  7) no: impurities raise the boiling point  8) chlorine.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'A student tests a food colouring X and two known dyes, A and B. The solvent moved 7.0 cm. X gave spots at 2.1 cm and 4.9 cm. A gave a spot at 2.1 cm. B gave a spot at 3.5 cm.',
  parts: [
    { l: 'a', q: 'Calculate the Rf values of the two spots in X.', m: 2, lines: 0 },
    { l: 'b', q: 'Which known dye is in X? Explain your answer.', m: 2, lines: 1 },
    { l: 'c', q: 'Explain why the start line is drawn in pencil and placed above the solvent.', m: 2, lines: 1 },
    { l: 'd', q: 'Describe how the student could test the gas given off when a carbonate is added to acid, and give the result.', m: 2, lines: 0 },
    { l: 'e', q: 'Explain how melting point could show whether a sample of the dye is pure.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', '2.1 ÷ 7.0 = 0.30; 4.9 ÷ 7.0 = 0.70', '2', ''],
    ['(b)', 'A; same Rf / spot at the same height (0.30)', '2', ''],
    ['(c)', 'pencil is insoluble / does not run; above the solvent so the dyes do not dissolve into the solvent', '2', ''],
    ['(d)', 'bubble the gas through limewater; turns milky (cloudy)', '2', ''],
    ['(e)', 'pure substance melts at a sharp / exact temperature; impure melts over a range (lower)', '2', ''],
  ],
  notes: 'Mark scheme on the next slide. Checked: 2.1/7 = 0.30, 4.9/7 = 0.70.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['How does a pure substance melt?', 'Write the formula for Rf.', 'Name the mobile phase.', 'Test and result for hydrogen.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) at one exact (sharp) temperature  2) distance moved by substance ÷ distance moved by solvent  3) the solvent  4) lit splint, squeaky pop. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain the difference between "pure" in everyday life and in chemistry.',
    'Give three examples of formulations and the purpose of one component in each.',
    'Write a full method for RP6, with a reason for each step.',
    'Spots at 1.5 cm and 4.5 cm; solvent 6.0 cm. Calculate both Rf values.',
    'Explain why a pure compound gives one spot in every solvent.',
    'Make a revision card for the four gas tests.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) everyday: nothing added; chemistry: single element or compound  2) e.g. paint (pigment for colour), medicine (active ingredient), fuel (additive)  3) see the RP6 slide  4) 0.25 and 0.75  5) only one substance, so it has one Rf value in each solvent  6) see the gas tests table.');
}
near('HW 1', 1.5 / 6.0, 0.25); near('HW 2', 4.5 / 6.0, 0.75);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.8_A_PurityChromatographyGases.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
