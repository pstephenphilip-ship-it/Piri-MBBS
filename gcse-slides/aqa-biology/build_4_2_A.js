// build_4_2_A.js — AQA GCSE Biology (8461) 4.2 Organisation, lesson 1 of 3:
// 4.2.1 Principles of organisation, 4.2.2.1 The human digestive system (enzymes, bile),
// Required practical 4 (food tests) and Required practical 5 (effect of pH on amylase).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_2_A.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.2.1–4.2.2.1', title: 'Digestion and enzymes',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const r4 = v => Math.round(v * 10000) / 10000;
const RP5 = [[5, 120], [6, 60], [7, 30], [8, 90]];

// ======================= numbers (all checked) =======================
const RATES = [0.0083, 0.0167, 0.0333, 0.0111];
RP5.forEach(([p, t], i) => calc('rp5 ' + p, r4(1 / t), RATES[i]));
calc('MT', r4(1 / 40), 0.025); calc('YT', r4(1 / 50), 0.02); calc('MT g', 2 / 40, 0.05); calc('YT g', 3 / 60, 0.05);
calc('P8', r4(1 / 200), 0.005); calc('exam', r4(1 / 25), 0.04); calc('HW', r4(1 / 80), 0.0125);

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
function flow(s, items, y, h, size = 16, cols) {
  const n = items.length, gap = 0.4, bw = (W - 2 * MX - (n - 1) * gap) / n;
  items.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap), col = (cols && cols[i]) || C.maroon, hh = 0.68;
    rect(s, x, y, bw, h, C.white, col, { lw: 2 });
    rect(s, x, y, bw, hh, col);
    txt(s, a, x + 0.06, y, bw - 0.12, hh, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
    if (b) txt(s, b, x + 0.12, y + hh + 0.1, bw - 0.24, h - hh - 0.15, { size, align: 'center' });
    if (i < n - 1) arrow(s, x + bw + 0.04, y + h / 2, x + bw + gap - 0.04, y + h / 2, C.ink, 2.5);
  });
}
function sketch(s, x, y, w, h, fn, xr, xTitle, labs, colour) {
  const G = graph(D, s, x, y, w, h, xr, [0, 10], { gridX: (xr[1] - xr[0]) / 10, gridY: 2, labX: (xr[1] - xr[0]) / 5, labY: 100, labSize: 12, axesAtEdge: true, xTitle, yTitle: 'Enzyme activity' });
  G.curve(fn, xr[0], xr[1], colour || C.maroon, 3.5, 160);
  (labs || []).forEach(([lx, ly, t, col]) => txt(s, t, G.px(lx), G.py(ly), 2.2, 0.32, { size: 13, bold: true, color: col || C.maroon }));
  return G;
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Cells, tissues, organs and organ systems, the digestive system, enzymes and bile, food tests and the amylase practical',
  bullets: ['Part 1: levels of organisation (4.2.1)', 'Part 2: enzymes (4.2.2.1)', 'Part 3: digestive enzymes and bile', 'Part 4: Required practicals 4 and 5'],
  notes: 'AQA 8461 GCSE Biology 4.2 Organisation, lesson 1 of 3. Lesson 2: the heart, blood vessels, blood and coronary heart disease. Lesson 3: health, cancer and plant tissues. About two hours.',
});

D.objectives({
  tag: '4.2.1, 4.2.2.1',
  items: [
    'Describe the levels of **organisation**: cell, tissue, organ, organ system.',
    'Explain how **enzymes** work (**lock and key**) and how **temperature** and **pH** affect them.',
    'Describe the digestive **enzymes** and the role of **bile**.',
    'Carry out the **food tests** (RP4) and the **amylase practical** (RP5), and calculate **rates**.',
  ],
  keywords: ['tissue', 'organ', 'enzyme', 'active site', 'denatured', 'bile'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is differentiation?', 'Which molecules are made on ribosomes?', 'Name the small units that make up a protein.', 'Rate = 1 ÷ time. Find the rate for 50 s.'],
  answers: ['A cell becoming specialised', 'Proteins', 'Amino acids', '0.02 s⁻¹'],
  notes: 'Retrieval from 4.1 and 4.4.2, plus the rate calculation for RP5.',
});

D.vocab({
  title: 'Key words', tag: '4.2',
  items: [
    { term: 'Tissue', def: 'A group of **similar cells** with a similar structure and function.' },
    { term: 'Enzyme', def: 'A **biological catalyst**: a protein that **speeds up** reactions without being used up.' },
    { term: 'Active site', def: 'The part of an enzyme where the **substrate fits**. Its shape is specific.' },
    { term: 'Denatured', def: 'The active site has **changed shape**, so the substrate no longer fits.' },
  ],
  notes: 'Metabolism (lesson 4.4.2) is the sum of all the enzyme-controlled reactions.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: levels of organisation', { tag: '4.2.1' });
  flow(s, [['Cell', 'the basic building block, e.g. a muscle cell'], ['Tissue', 'similar cells working together, e.g. muscle tissue'], ['Organ', 'tissues working together, e.g. the stomach'], ['Organ system', 'organs working together, e.g. the digestive system'], ['Organism', 'all the organ systems together']], 1.45, 2.2, 16, [C.grey, C.accent, C.maroon, C.green, C.orange]);
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 4.4, h = 2.45;
  [['Muscular tissue', 'contracts to **churn** food and juices in the stomach'], ['Glandular tissue', 'makes **digestive juices** (enzymes and acid)'], ['Epithelial tissue', '**covers** the outside and inside of the stomach']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 });
  });
  txt(s, 'The stomach is an organ made of three tissues:', MX, top - 0.42, 7, 0.4, { size: 16, bold: true, color: C.grey });
  notes(s, 'Spec 4.2.1: "Cells are the basic building blocks of all living organisms. A tissue is a group of cells with a similar structure and function. Organs are aggregations of tissues performing specific functions. Organs are organised into organ systems, which work together to form organisms."');
}

{
  const s = frame('The digestive system', { tag: '4.2.2.1' });
  const parts = [['Salivary glands', 'make **amylase**'], ['Stomach', '**protease** and **hydrochloric acid**'], ['Liver', 'makes **bile**'], ['Gall bladder', '**stores** bile'], ['Pancreas', 'makes **amylase, protease, lipase**'], ['Small intestine', 'enzymes; **absorbs** soluble food (villi)'], ['Large intestine', 'absorbs **water**']];
  parts.forEach(([a, b], i) => {
    const y = 1.4 + i * 0.77;
    rect(s, MX, y, W - 2 * MX, 0.68, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, MX + 0.25, y, 3.4, 0.68, { size: 19, bold: true, color: C.maroon, valign: 'middle' });
    txt(s, b, MX + 3.8, y, W - 2 * MX - 4.0, 0.68, { size: 18, valign: 'middle' });
  });
  notes(s, 'Spec 4.2.2.1: "This section assumes knowledge of the digestive system studied at key stage 3." Students should be able to relate knowledge of enzymes to metabolism. Digestion breaks large insoluble molecules into small soluble ones that can be absorbed into the bloodstream.');
}

D.hinge({
  title: 'Quick check',
  q: 'What is an organ?',
  options: ['A group of tissues working together', 'A group of similar cells', 'A group of organ systems', 'A single specialised cell'],
  correct: 0,
  notes: 'Answer A. B is a tissue. C is an organism. D is a cell.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: how enzymes work', { tag: '4.2.2.1' });
  const ex = MX + 1.2, ey = 2.6;
  // enzyme: rect with a notch (active site) and substrate triangle-ish
  rect(s, ex, ey, 2.4, 1.4, 'C9B6E4', '7A4E9C', { lw: 2 });
  rect(s, ex + 0.85, ey, 0.7, 0.5, C.white, C.white);
  rect(s, ex + 0.9, ey - 0.75, 0.6, 0.7, 'F6C27A', C.orange, { lw: 2 });
  txt(s, 'substrate', ex + 1.6, ey - 0.75, 1.6, 0.35, { size: 14, bold: true, color: C.orange });
  txt(s, 'enzyme', ex + 0.6, ey + 0.65, 1.3, 0.4, { size: 15, bold: true, color: '5A3A80' });
  txt(s, 'active site', ex - 1.0, ey + 0.05, 1.5, 0.35, { size: 13, bold: true });
  arrow(s, ex + 2.6, ey + 0.7, ex + 3.4, ey + 0.7);
  rect(s, ex + 3.6, ey, 2.4, 1.4, 'C9B6E4', '7A4E9C', { lw: 2 });
  rect(s, ex + 4.45, ey, 0.7, 0.5, C.white, C.white);
  rect(s, ex + 3.8, ey - 0.75, 0.32, 0.6, 'F6C27A', C.orange, { lw: 2 }); rect(s, ex + 5.55, ey - 0.75, 0.32, 0.6, 'F6C27A', C.orange, { lw: 2 });
  txt(s, 'products released; enzyme unchanged', ex + 3.4, ey + 1.5, 3.2, 0.4, { size: 14, bold: true });
  const bx = MX + 7.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.25, 'Lock and key model', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Each enzyme has an **active site** with a specific shape.', 'Only one **substrate fits**, like a key in a lock.', 'The enzyme is not used up: it can be **reused**.'], 16, 0.12);
  rect(s, MX, 4.95, W - 2 * MX, 1.9, C.orangeSoft, 'F3D9B5');
  txt(s, 'Enzymes are **proteins** and **catalyse** specific reactions in living things. They can **build up** large molecules (e.g. starch, proteins) or **break down** large molecules into small soluble ones (digestion).', MX + 0.3, 4.95, W - 2 * MX - 0.6, 1.9, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.2.2.1: "Students should be able to understand the role of enzymes in metabolism, describe the lock and key theory as a model of enzyme action and explain how enzymes catalyse reactions." The lock and key theory is a simplified model.');
}

{
  const s = frame('Temperature and pH', { tag: '4.2.2.1' });
  const gw = 5.0, gh = 3.6, y = 1.75;
  const bell = (m, sd) => x => 9 * Math.exp(-(((x - m) / sd) ** 2));
  sketch(s, MX + 0.8, y, gw, gh, x => x < 37 ? 9 * Math.exp(-(((x - 37) / 18) ** 2)) : Math.max(0, 9 - 0.6 * (x - 37) ** 1.3), [0, 60], 'Temperature (°C)', [[33, 9.9, 'optimum 37 °C']]);
  const G = sketch(s, MX + 6.9, y, gw, gh, bell(2, 1.2), [0, 14], 'pH', [[0.6, 9.9, 'pepsin', C.red], [6, 9.9, 'amylase', C.green]], C.red);
  G.curve(bell(7, 1.3), 0, 14, C.green, 3.5, 160);
  rect(s, MX, 6.0, W - 2 * MX, 0.85, C.soft, C.line);
  txt(s, 'Above the optimum, the **active site changes shape**: the enzyme is **denatured** and the substrate no longer fits.', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.85, { size: 17, valign: 'middle' });
  notes(s, 'Each enzyme has an optimum temperature and pH. Pepsin (a stomach protease) works best around pH 2; salivary amylase around pH 7. Below the optimum temperature, particles have less kinetic energy: fewer successful collisions. Sketch graphs; the pH graph axis labels are on the temperature graph only.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does an enzyme stop working at 60 °C?',
  options: ['Its active site changes shape (denatured)', 'It is killed', 'It runs out of energy', 'It is used up in the reaction'],
  correct: 0,
  notes: 'Answer A. B: enzymes are molecules, not living things, so they cannot be "killed". D: enzymes are not used up.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: digestive enzymes', { tag: '4.2.2.1' });
  const head = ['Enzyme', 'Breaks down', 'Into', 'Made in'];
  const rows = [['Carbohydrase (e.g. amylase)', 'carbohydrates (starch)', 'simple sugars', 'salivary glands, pancreas, small intestine'], ['Protease', 'proteins', 'amino acids', 'stomach, pancreas, small intestine'], ['Lipase', 'lipids (fats)', 'fatty acids + glycerol', 'pancreas, small intestine']];
  const cws = [3.5, 2.8, 2.6, W - 2 * MX - 8.9];
  head.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 1.45, cws[j], 0.6, C.maroon); txt(s, t, x + 0.15, 1.45, cws[j] - 0.3, 0.6, { size: 17, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0), y = 2.05 + i * 1.05; rect(s, x, y, cws[j], 1.05, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.15, y, cws[j] - 0.3, 1.05, { size: 17, bold: j === 0, valign: 'middle' }); }));
  rect(s, MX, 5.4, W - 2 * MX, 1.45, C.greenSoft, C.green);
  txt(s, 'The products of digestion are used to build **new carbohydrates, lipids and proteins**. Some glucose is used in **respiration**.', MX + 0.3, 5.4, W - 2 * MX - 0.6, 1.45, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.2.2.1: "Carbohydrases break down carbohydrates to simple sugars. Amylase is a carbohydrase which breaks down starch. Proteases break down proteins to amino acids. Lipases break down lipids (fats) to glycerol and fatty acids. The products of digestion are used to build new carbohydrates, lipids and proteins. Some glucose is used in respiration."');
}

{
  const s = frame('Bile', { tag: '4.2.2.1' });
  flow(s, [['Made', 'in the liver'], ['Stored', 'in the gall bladder'], ['Released', 'into the small intestine']], 1.5, 1.7, 17, [C.maroon, C.green, C.accent]);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 3.5, h = 3.35;
  headCard(s, MX, top, cw, h, 'Neutralises acid', C.green, C.greenSoft);
  txt(s, 'Bile is **alkaline**. It neutralises the hydrochloric acid from the stomach, giving the right **pH** for enzymes in the small intestine.', MX + 0.25, top + 0.8, cw - 0.5, h - 1.0, { size: 18 });
  headCard(s, MX + cw + gap, top, cw, h, 'Emulsifies fat', C.orange, C.orangeSoft);
  txt(s, 'Bile breaks fat into **small droplets**. This gives a **larger surface area** for lipase, so fat is digested **faster**.', MX + cw + gap + 0.25, top + 0.8, cw - 0.5, h - 1.0, { size: 18 });
  notes(s, 'Spec 4.2.2.1: "Bile is made in the liver and stored in the gall bladder. It is alkaline to neutralise hydrochloric acid from the stomach. It also emulsifies fat to form small droplets which increases the surface area. The alkaline conditions and large surface area increase the rate of fat breakdown by lipase." Bile is NOT an enzyme.');
}

D.hinge({
  title: 'Quick check',
  q: 'How does bile help digest fat?',
  options: ['It emulsifies fat, giving a larger surface area for lipase', 'It is an enzyme that breaks down fat', 'It makes the small intestine acidic', 'It absorbs fat into the blood'],
  correct: 0,
  notes: 'Answer A. B: bile is not an enzyme. C: bile is alkaline.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: Required practical 4: food tests', { tag: 'RP4' });
  const head = ['Test for', 'Reagent', 'Method', 'Positive result'];
  const rows = [['Sugars (reducing)', 'Benedict\'s', 'heat in a water bath (about 75 °C)', 'blue → green, yellow or brick red'], ['Starch', 'iodine', 'add a few drops', 'orange-brown → blue-black'], ['Protein', 'biuret', 'add a few drops', 'blue → purple'], ['Lipids', 'Sudan III', 'add a few drops; shake', 'red layer on top']];
  const cws = [2.7, 2.1, 3.6, W - 2 * MX - 8.4];
  head.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 1.45, cws[j], 0.6, C.maroon); txt(s, t, x + 0.15, 1.45, cws[j] - 0.3, 0.6, { size: 17, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0), y = 2.05 + i * 0.95; rect(s, x, y, cws[j], 0.95, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.15, y, cws[j] - 0.3, 0.95, { size: 17, bold: j === 0, valign: 'middle' }); }));
  rect(s, MX, 6.0, W - 2 * MX, 0.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Prepare food by grinding with distilled water and filtering. **Safety:** wear eye protection; take care with the hot water bath.', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.85, { size: 16, valign: 'middle' });
  notes(s, 'RP4: "use qualitative reagents to test for a range of carbohydrates, lipids and proteins. To include: Benedict\'s test for sugars; iodine test for starch; and Biuret reagent for protein." The emulsion test (ethanol, cloudy white) is an alternative lipid test. Benedict\'s colour depends on how much sugar: green (little) → brick red (lots).');
}

{
  const s = frame('Required practical 5: pH and amylase', { tag: 'RP5' });
  headCard(s, MX, 1.4, 6.0, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 5.6, ['Put a drop of **iodine** in each well of a **spotting tile**.', 'Mix **starch**, **amylase** and a **pH buffer** in a tube in a 35 °C water bath; start the timer.', 'Every **10 s**, put a drop of the mixture onto the iodine.', 'When the iodine stays **orange**, all the starch is digested: record the time.', 'Repeat at different pH values.'], 15, 0.08);
  const tx = MX + 6.4, tw = W - MX - tx, cws = [1.4, 1.9, tw - 3.3];
  ['pH', 'Time (s)', 'Rate = 1 ÷ t (s⁻¹)'].forEach((t, j) => { const x = tx + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 1.4, cws[j], 0.6, C.maroon); txt(s, t, x, 1.4, cws[j], 0.6, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' }); });
  RP5.forEach(([p, t], i) => [String(p), String(t), RATES[i].toFixed(4)].forEach((v, j) => { const x = tx + cws.slice(0, j).reduce((a, b) => a + b, 0), y = 2.0 + i * 0.6; rect(s, x, y, cws[j], 0.6, i % 2 ? C.white : C.soft, C.line); txt(s, v, x, y, cws[j], 0.6, { size: 17, bold: j === 2, color: j === 2 ? C.green : C.ink, align: 'center', valign: 'middle' }); }));
  rect(s, tx, 4.6, tw, 2.25, C.orangeSoft, 'F3D9B5');
  txt(s, 'The **fastest** rate is at **pH 7**: the optimum for this amylase. Control: temperature, volumes and concentrations of starch and amylase.', tx + 0.2, 4.65, tw - 0.4, 2.15, { size: 16, valign: 'middle' });
  notes(s, 'RP5: "investigate the effect of pH on the rate of reaction of amylase enzyme." Sample data. Sampling every 10 s limits the precision of the time. Rate can also be given as amount ÷ time, e.g. 2 g of starch digested in 40 s = 0.05 g/s.');
}

D.myTurnYourTurn({
  title: 'Calculating rates', tag: 'Maths skill', stepSize: 20, labelW: 3.4, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: true,
  mine: {
    q: 'Calculate each rate:',
    steps: [
      { label: 'Starch gone in 40 s (1 ÷ t)', text: '**0.025 s⁻¹**' },
      { label: '2 g digested in 40 s', text: '**0.05 g/s**' },
    ],
  },
  yours: {
    q: 'Calculate each rate:',
    steps: [
      { label: 'Starch gone in 50 s (1 ÷ t)', text: '**0.02 s⁻¹**' },
      { label: '3 g digested in 60 s', text: '**0.05 g/s**' },
    ],
  },
  notes: 'Two ways to give a rate: 1 ÷ time (when only a time is measured), or amount ÷ time.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Name the three tissues in the stomach.', 'Muscular, glandular, epithelial'], ['What does lipase break down fats into?', 'Fatty acids and glycerol'], ['Where is bile made and stored?', 'Made in liver; stored in gall bladder'], ['What is the test for protein?', 'Biuret: blue → purple'],
    ['Explain the lock and key model.', 'Only the substrate fits the active site'], ['Why does pepsin not work in the small intestine?', 'pH too high (alkaline): it denatures'],
    ['Benedict\'s test turns brick red. What does this show?', 'Lots of reducing sugar'], ['RP5: the starch was gone in 200 s. Rate?', '0.005 s⁻¹'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) muscular, glandular, epithelial  2) fatty acids and glycerol  3) made in the liver, stored in the gall bladder  4) biuret, blue to purple  5) the substrate is complementary to the active site; only it fits  6) the small intestine is alkaline; pepsin\'s optimum is about pH 2, so it denatures  7) a high concentration of reducing sugar  8) 1 ÷ 200 = 0.005 s⁻¹.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Name the enzyme that digests starch, and the product.', m: 2, lines: 0 },
    { l: 'b', q: 'Explain why enzymes stop working at high temperatures.', m: 2, lines: 1 },
    { l: 'c', q: 'Describe how to test a food for starch and for protein.', m: 3, lines: 1 },
    { l: 'd', q: 'In RP5, the starch was digested in 25 s at pH 7. Calculate the rate, and give two variables that should be controlled.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'amylase (carbohydrase); sugars (maltose)', '2', ''],
    ['(b)', 'active site changes shape (denatured); substrate no longer fits', '2', ''],
    ['(c)', 'starch: iodine, orange-brown to blue-black; protein: biuret, blue to purple', '3', 'max 3'],
    ['(d)', '1 ÷ 25 = 0.04 s⁻¹; any two: temperature, volume/concentration of starch or amylase', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What is a tissue?', 'What does protease break down proteins into?', 'Give two jobs of bile.', 'Which reagent tests for sugars?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) a group of similar cells with a similar function  2) amino acids  3) neutralises stomach acid; emulsifies fat  4) Benedict\'s. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Describe the levels of organisation, with examples.',
    'Draw and explain the lock and key model.',
    'Sketch enzyme activity against temperature and explain the shape.',
    'Make a table of the three digestive enzymes.',
    'RP5: starch gone in 80 s. Calculate the rate.',
    'Plan a test to find which of three foods contains protein.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) cell → tissue → organ → organ system → organism  2) substrate fits active site; products released; enzyme unchanged  3) rises to optimum then falls sharply as it denatures  4) see the enzyme table  5) 0.0125 s⁻¹  6) grind, filter, biuret, look for purple; control volumes.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.2_A_DigestionEnzymes.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
