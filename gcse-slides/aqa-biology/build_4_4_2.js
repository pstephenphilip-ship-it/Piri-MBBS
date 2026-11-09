// build_4_4_2.js — AQA GCSE Biology (8461) 4.4.2 Respiration and metabolism, lesson 2 of 2 on 4.4 Bioenergetics.
// One two-hour lesson for a Higher student.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_4_2.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.4.2', title: 'Respiration and metabolism',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const pct = (a, b) => (b - a) / a * 100;

// ======================= numbers (all checked) =======================
calc('hr ex', pct(70, 147), 110); calc('P5', pct(72, 144), 100); calc('exam b', pct(65, 156), 140); calc('HW4', pct(60, 135), 125);

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function headCard(s, x, y, w, h, head, colour, fill) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
}
function bullets(s, x, y, w, items, size = 18, gap = 0.16) {
  items.forEach(t => { const th = D.textH(t, size, w - 0.3); txt(s, '•', x, y, 0.3, 0.4, { size, bold: true, color: C.accent }); txt(s, t, x + 0.3, y, w - 0.3, th + 0.05, { size }); y += th + gap; });
  return y;
}
// word equation laid out around a centred arrow
function equation(s, l, r, y, size, col, mid = W / 2) {
  txt(s, l, MX, y, mid - MX - 0.55, 0.6, { size, bold: true, color: col, align: 'right' });
  txt(s, '→', mid - 0.5, y, 1.0, 0.6, { size, bold: true, color: col, align: 'center' });
  txt(s, r, mid + 0.55, y, W - MX - mid - 0.55, 0.6, { size, bold: true, color: col });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Aerobic and anaerobic respiration, fermentation, the response to exercise, oxygen debt and metabolism',
  bullets: ['Part 1: aerobic and anaerobic respiration (4.4.2.1)', 'Part 2: the response to exercise (4.4.2.2)', 'Part 3: metabolism (4.4.2.3)'],
  notes: 'AQA 8461 GCSE Biology 4.4.2 Respiration. Lesson 2 of 2 on 4.4 Bioenergetics. There is no required practical in 4.4.2; the exercise data slides practise the maths and data skills AQA tests. Higher only: lactic acid taken to the liver, and the definition of oxygen debt. About two hours.',
});

D.objectives({
  tag: '4.4.2',
  items: [
    'Write the equations for **aerobic** and **anaerobic** respiration, and compare them.',
    'Describe **fermentation** and its uses.',
    'Explain how the body **responds to exercise**. **HT:** explain **oxygen debt**.',
    'Describe the reactions of **metabolism**.',
  ],
  keywords: ['exothermic', 'aerobic', 'anaerobic', 'fermentation', 'oxygen debt', 'metabolism'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Write the word equation for photosynthesis.', 'Is photosynthesis endothermic or exothermic?', 'How do plants store glucose?', 'Which organelle carries out aerobic respiration?'],
  answers: ['Carbon dioxide + water → glucose + oxygen', 'Endothermic', 'As starch (insoluble)', 'Mitochondria'],
  notes: 'Retrieval from 4.4.1 and 4.1. Respiration is NOT the reverse of photosynthesis in the cell, but the overall word equations are mirror images: a useful memory aid.',
});

D.vocab({
  title: 'Key words', tag: '4.4.2',
  items: [
    { term: 'Exothermic', def: 'A reaction that **gives out energy**. Respiration is exothermic.' },
    { term: 'Aerobic', def: 'Respiration **with oxygen**. It transfers **much more** energy.' },
    { term: 'Anaerobic', def: 'Respiration **without oxygen**. Glucose is only **partly** broken down.' },
    { term: 'Metabolism', def: 'The **sum of all the reactions** in a cell or the body.' },
  ],
  notes: 'Fermentation = anaerobic respiration in yeast. Oxygen debt (HT) comes later in the lesson.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: aerobic respiration', { tag: '4.4.2.1' });
  rect(s, MX, 1.4, W - 2 * MX, 2.0, C.soft, C.line);
  equation(s, 'glucose  +  oxygen', 'carbon dioxide  +  water', 1.6, 30, C.ink);
  equation(s, 'C₆H₁₂O₆  +  6O₂', '6CO₂  +  6H₂O', 2.35, 28, C.accent);
  txt(s, 'Happens in the **mitochondria** of every living cell. **Exothermic**: energy is transferred **out**.', MX, 3.55, W - 2 * MX, 0.45, { size: 19 });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 4.35, h = 2.5;
  [['Building molecules', 'Chemical reactions that make **larger molecules**, e.g. proteins.'], ['Movement', '**Muscle contraction** in animals.'], ['Keeping warm', 'Mammals and birds keep a **constant body temperature**.']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.green, C.greenSoft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 19 });
  });
  txt(s, 'What organisms need the energy for:', MX, top - 0.42, 6, 0.4, { size: 16, bold: true, color: C.grey });
  notes(s, 'Spec 4.4.2.1: cellular respiration is an exothermic reaction which is continuously occurring in living cells. The energy transferred supplies all the energy needed for living processes. Students should recognise the chemical symbols. Note the text: "energy is released" in respiration, not "energy is made".');
}

{
  const s = frame('Anaerobic respiration', { tag: '4.4.2.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 2.35;
  headCard(s, MX, top, cw, h, 'In muscles', C.red, 'FBEDEB');
  txt(s, 'glucose  →  lactic acid', MX + 0.25, top + 0.8, cw - 0.5, 0.6, { size: 26, bold: true, align: 'center' });
  txt(s, 'Happens when muscles cannot get **enough oxygen**.', MX + 0.25, top + 1.5, cw - 0.5, 0.7, { size: 17, align: 'center' });
  headCard(s, MX + cw + gap, top, cw, h, 'In plants and yeast', C.orange, C.orangeSoft);
  txt(s, 'glucose  →  ethanol  +  carbon dioxide', MX + cw + gap + 0.15, top + 0.85, cw - 0.3, 0.6, { size: 20, bold: true, align: 'center' });
  txt(s, 'In yeast this is called **fermentation**.', MX + cw + gap + 0.25, top + 1.5, cw - 0.5, 0.7, { size: 17, align: 'center' });
  // comparison table
  const head = ['', 'Aerobic', 'Anaerobic'];
  const rows = [['Oxygen needed?', 'Yes', 'No'], ['Glucose broken down', 'Completely', 'Only partly'], ['Energy transferred', 'A lot', 'Much less'], ['Products', 'CO₂ + water', 'Lactic acid, or ethanol + CO₂']];
  const cws = [3.6, 3.4, W - 2 * MX - 7.0], ty = 4.0, rh = 0.57;
  head.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, ty, cws[j], rh, C.maroon); txt(s, t, x + 0.2, ty, cws[j] - 0.4, rh, { size: 17, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => {
    const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0), y = ty + rh + i * rh;
    rect(s, x, y, cws[j], rh, i % 2 ? C.white : C.soft, C.line);
    txt(s, t, x + 0.2, y, cws[j] - 0.4, rh, { size: 17, bold: j === 0, valign: 'middle' });
  }));
  notes(s, 'Spec: "Anaerobic respiration in muscles is represented by glucose → lactic acid. Anaerobic respiration in plant and yeast cells is represented by glucose → ethanol + carbon dioxide. As the oxidation of glucose is incomplete in anaerobic respiration much less energy is transferred than in aerobic respiration."');
}

{
  const s = frame('Fermentation and its uses', { tag: '4.4.2.1' });
  const gap = 0.3, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 2.9;
  headCard(s, MX, top, cw, h, 'Bread', C.orange, C.orangeSoft);
  txt(s, 'Yeast respires the sugar in the dough. The **carbon dioxide** bubbles make the dough **rise**. The ethanol evaporates when the bread is baked.', MX + 0.25, top + 0.75, cw - 0.5, h - 0.9, { size: 19 });
  headCard(s, MX + cw + gap, top, cw, h, 'Beer and wine', C.maroon, C.soft);
  txt(s, 'Yeast respires the sugar in grain or grapes. The **ethanol** (alcohol) stays in the drink.', MX + cw + gap + 0.25, top + 0.75, cw - 0.5, h - 0.9, { size: 19 });
  rect(s, MX, 4.55, W - 2 * MX, 2.3, C.greyLight, C.line);
  txt(s, 'Class demo: yeast + sugar + warm water in a flask, with a balloon on top', MX + 0.3, 4.65, W - 2 * MX - 0.6, 0.45, { size: 19, bold: true, color: C.maroon });
  bullets(s, MX + 0.3, 5.2, W - 2 * MX - 0.6, ['The balloon **inflates**: carbon dioxide is being made.', 'Bubble the gas through **limewater**: it turns **cloudy**, which proves it is CO₂.', 'Warm (not hot) water: yeast enzymes work best at about 25–35 °C.'], 17, 0.08);
  notes(s, 'Spec: "Anaerobic respiration in yeast cells is called fermentation and has economic importance in the manufacture of bread and alcoholic drinks." The limewater test links to chemistry.');
}

D.hinge({
  title: 'Quick check',
  q: 'What are the products of anaerobic respiration in yeast?',
  options: ['Ethanol and carbon dioxide', 'Lactic acid', 'Carbon dioxide and water', 'Glucose and oxygen'],
  correct: 0,
  notes: 'Answer A. B is in muscles. C is aerobic respiration. D are the products of photosynthesis.',
});

D.myTurnYourTurn({
  title: 'Which type of respiration?', tag: 'Part 1', stepSize: 20, labelW: 2.35, labelSize: 18, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Aerobic, or anaerobic (muscles or yeast)?',
    steps: [
      { label: 'Uses oxygen', text: '**Aerobic**' },
      { label: 'Makes lactic acid', text: '**Anaerobic (muscles)**' },
      { label: 'Makes ethanol', text: '**Anaerobic (yeast)**' },
      { label: 'Most energy', text: '**Aerobic**' },
    ],
  },
  yours: {
    q: 'Aerobic, or anaerobic (muscles or yeast)?',
    steps: [
      { label: 'Makes water', text: '**Aerobic**' },
      { label: 'Makes bread rise', text: '**Anaerobic (yeast)**' },
      { label: 'Oxygen debt', text: '**Anaerobic (muscles)**' },
      { label: 'Makes CO₂', text: '**Aerobic and yeast**' },
    ],
  },
  notes: 'Yours, last row: a trick. Carbon dioxide is made by aerobic respiration AND by fermentation, but not by anaerobic respiration in muscles.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the response to exercise', { tag: '4.4.2.2' });
  const hr = t => t < 4 ? 70 : t < 12 ? 70 + 77 * (1 - Math.exp(-(t - 4) / 1.2)) : 70 + (147 - 70) * Math.exp(-(t - 12) / 2.2) + 0;
  const G = graph(D, s, MX + 1.0, 1.75, 6.8, 4.3, [0, 20], [0, 180], { gridX: 2, gridY: 20, labX: 4, labY: 40, axesAtEdge: true, xTitle: 'Time (minutes)', yTitle: 'Heart rate (beats per minute)' });
  G.seg(4, 0, 4, 180, C.grey, 1.5, 'dash'); G.seg(12, 0, 12, 180, C.grey, 1.5, 'dash');
  txt(s, 'rest', G.px(0.4), G.py(172), 1.0, 0.3, { size: 14, bold: true, color: C.grey });
  txt(s, 'exercise', G.px(6.4), G.py(172), 1.3, 0.3, { size: 14, bold: true, color: C.grey });
  txt(s, 'recovery', G.px(14.4), G.py(172), 1.3, 0.3, { size: 14, bold: true, color: C.grey });
  G.curve(hr, 0, 20, C.red, 3.5, 200);
  const bx = MX + 8.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.25, 'During exercise these rise', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Heart rate**', '**Breathing rate**', '**Breath volume**'], 19, 0.1);
  txt(s, 'so muscles get more **oxygenated blood** and glucose, and more CO₂ is removed.', bx + 0.2, 3.45, bw - 0.4, 1.1, { size: 16 });
  rect(s, bx, 4.85, bw, 2.0, C.orangeSoft, 'F3D9B5');
  txt(s, '**Data skill:** 70 → 147 bpm. Percentage increase = 77 ÷ 70 × 100 = **110%**', bx + 0.2, 4.9, bw - 0.4, 1.9, { size: 17, valign: 'middle' });
  notes(s, 'Spec 4.4.2.2: "During exercise the human body reacts to the increased demand for energy. The heart rate, breathing rate and breath volume increase during exercise to supply the muscles with more oxygenated blood." Sketch data, not a real trace. Note that heart rate takes several minutes to return to the resting rate: oxygen debt.');
}

{
  const s = frame('Lactic acid and oxygen debt', { tag: '4.4.2.2' });
  rect(s, MX, 1.4, W - 2 * MX, 1.5, C.soft, C.line);
  txt(s, 'In hard exercise, the blood cannot bring oxygen fast enough. Muscles respire **anaerobically**: glucose is only partly oxidised, so **lactic acid** builds up. Over long periods, muscles become **fatigued** and stop contracting efficiently.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.5, { size: 18, valign: 'middle' });
  // HT box
  rect(s, MX, 3.1, W - 2 * MX, 3.75, 'FBEDEB', C.red);
  rect(s, MX, 3.1, 2.3, 0.5, C.red); txt(s, 'HT  Higher only', MX, 3.1, 2.3, 0.5, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
  const bw = 2.7, by = 4.0, bh = 1.2;
  const boxes = [['Muscle', 'lactic acid builds up', MX + 0.4], ['Blood', 'carries lactic acid away', MX + 4.15], ['Liver', 'converts it back to glucose', MX + 7.9]];
  boxes.forEach(([a, b, x]) => { rect(s, x, by, bw, bh, C.white, C.red); txt(s, a, x, by + 0.08, bw, 0.45, { size: 20, bold: true, color: C.red, align: 'center' }); txt(s, b, x + 0.1, by + 0.55, bw - 0.2, 0.55, { size: 15, align: 'center' }); });
  arrow(s, MX + 0.4 + bw + 0.05, by + bh / 2, MX + 4.1, by + bh / 2, C.ink, 2.5);
  arrow(s, MX + 4.15 + bw + 0.05, by + bh / 2, MX + 7.85, by + bh / 2, C.ink, 2.5);
  txt(s, '**Oxygen debt** = the amount of **extra oxygen** the body needs after exercise to react with the lactic acid and remove it from the cells. That is why you keep **breathing hard** after you stop.', MX + 0.3, 5.45, W - 2 * MX - 0.6, 1.3, { size: 18 });
  notes(s, 'Spec 4.4.2.2 (HT only): "Blood flowing through the muscles transports the lactic acid to the liver where it is converted back into glucose. Oxygen debt is the amount of extra oxygen the body needs after exercise to react with the accumulated lactic acid and remove it from the cells." The oxygen debt idea itself (building up) is for both tiers; the definition and the liver are HT.');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'What is oxygen debt?',
  options: ['Extra oxygen needed after exercise to react with lactic acid', 'The oxygen used during exercise', 'A lack of oxygen in the lungs', 'Oxygen made by the muscles'],
  correct: 0,
  notes: 'Answer A, the spec definition. B is just aerobic respiration. C and D are wrong.',
});

D.myTurnYourTurn({
  title: 'Explaining the exercise response', tag: 'Exam skill', stepSize: 19, labelW: 1.85, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain why heart rate increases during exercise.  [3 marks]',
    steps: [
      { label: 'Demand', text: '**Muscles respire faster**' },
      { label: 'Supply', text: '**More oxygen and glucose**' },
      { label: 'Removal', text: '**More CO₂ carried away**' },
    ],
  },
  yours: {
    q: 'HT  Explain why breathing stays fast after exercise has stopped.  [3 marks]',
    steps: [
      { label: 'Build-up', text: '**Lactic acid in muscles**' },
      { label: 'Debt', text: '**Extra oxygen needed**' },
      { label: 'Liver', text: '**Lactic acid → glucose**' },
    ],
  },
  notes: 'Mine: link the heart to delivering oxygenated blood. Yours: the oxygen debt must be repaid to break down lactic acid; blood takes it to the liver.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: metabolism', { tag: '4.4.2.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, '**Metabolism** is the sum of all the reactions in a cell or the body. Respiration supplies the energy for the **enzyme-controlled** reactions that make new molecules.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 18, valign: 'middle' });
  const rows = [
    ['Glucose', '→  starch, glycogen and cellulose', 'build up'],
    ['1 glycerol + 3 fatty acids', '→  lipids (fats and oils)', 'build up'],
    ['Glucose + nitrate ions', '→  amino acids  →  proteins', 'build up'],
    ['Glucose + oxygen', '→  respiration (releases energy)', 'break down'],
    ['Excess proteins', '→  urea, which is excreted', 'break down'],
  ];
  rows.forEach(([a, b, k], i) => {
    const y = 2.6 + i * 0.85, col = k === 'build up' ? C.green : C.orange;
    rect(s, MX, y, W - 2 * MX, 0.75, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, a, MX + 0.25, y, 4.5, 0.75, { size: 19, bold: true, valign: 'middle' });
    txt(s, b, MX + 4.8, y, 5.3, 0.75, { size: 19, valign: 'middle' });
    rect(s, W - MX - 1.85, y + 0.15, 1.65, 0.45, col);
    txt(s, k, W - MX - 1.85, y + 0.15, 1.65, 0.45, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
  });
  notes(s, 'Spec 4.4.2.3 lists exactly these five. Glycogen: animals (liver, muscles). Starch and cellulose: plants. Urea is made in the liver and excreted by the kidneys. Building up larger molecules needs energy from respiration.');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Write the word equation for aerobic respiration.', 'Glucose + oxygen → CO₂ + water'], ['Where in a cell does aerobic respiration happen?', 'In the mitochondria'], ['What is made by anaerobic respiration in muscles?', 'Lactic acid'], ['What is fermentation?', 'Anaerobic respiration in yeast'],
    ['Heart rate rises from 72 to 144 bpm. Calculate the percentage increase.', '100%'], ['Why does anaerobic respiration transfer less energy?', 'Glucose is only partly broken down'],
    ['HT  What happens to lactic acid after exercise?', 'Blood takes it to the liver: made into glucose'], ['Name the waste made when excess protein is broken down.', 'Urea'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) glucose + oxygen → carbon dioxide + water  2) mitochondria  3) lactic acid  4) anaerobic respiration in yeast, making ethanol and CO₂  5) (144 − 72) ÷ 72 × 100 = 100%  6) incomplete oxidation of glucose  7) carried by the blood to the liver and converted back into glucose  8) urea.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.3,
  stem: 'A student ran for 10 minutes. Her heart rate was measured before and during the run.',
  parts: [
    { l: 'a', q: 'Write the word equation for aerobic respiration.', m: 2, lines: 0 },
    { l: 'b', q: 'Her heart rate rose from 65 to 156 beats per minute. Calculate the percentage increase.', m: 2, lines: 1 },
    { l: 'c', q: 'Explain why her heart rate increased during the run.', m: 3, lines: 1 },
    { l: 'd', q: 'HT  Explain why she kept breathing quickly for several minutes after she stopped running.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'glucose + oxygen → carbon dioxide + water', '2', '1 for reactants, 1 for products'],
    ['(b)', '91 ÷ 65 × 100 = 140%', '2', '1 for 91 ÷ 65 or 2.4'],
    ['(c)', 'muscles respire faster / need more energy; more oxygen (and glucose) delivered; more CO₂ removed', '3', ''],
    ['(d)', 'anaerobic respiration made lactic acid; oxygen debt: extra oxygen needed to break it down; lactic acid taken to liver, made into glucose', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Is respiration endothermic or exothermic?', 'What does yeast make when it respires anaerobically?', 'HT  What is oxygen debt?', 'Give one metabolic reaction that makes a large molecule.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) exothermic  2) ethanol and carbon dioxide  3) the extra oxygen needed after exercise to react with lactic acid  4) glucose → starch / glycogen / cellulose; glycerol + fatty acids → lipid; amino acids → protein. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Write the balanced symbol equation for aerobic respiration.',
    'Compare aerobic respiration with anaerobic respiration in muscles.',
    'Explain how yeast makes bread rise.',
    'Heart rate rises from 60 to 135 bpm. Calculate the percentage increase.',
    'HT  Describe what happens to lactic acid after exercise.',
    'Describe how lipid molecules are made.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O  2) aerobic: needs oxygen, complete, much more energy, CO₂ + water; anaerobic: no oxygen, incomplete, less energy, lactic acid  3) yeast ferments sugar; CO₂ bubbles make the dough rise  4) 75 ÷ 60 × 100 = 125%  5) blood carries it to the liver, where it is converted back into glucose  6) one glycerol molecule joins with three fatty acid molecules.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.4.2_RespirationAndMetabolism.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
