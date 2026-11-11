// build_4_7_B.js — AQA GCSE Biology (8461) 4.7 Ecology, lesson 2 of 3:
// 4.7.2.2 How materials are cycled, 4.7.2.3 Decomposition (+ Required practical 10), 4.7.2.4 HT: Impact of environmental change,
// 4.7.4 Trophic levels, pyramids of biomass and transfer of biomass.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_7_B.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.7.2–4.7.4', title: 'Cycles, decay and biomass',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const r4 = v => Math.round(v * 10000) / 10000;
const eff = (a, b) => Math.round(b / a * 1000) / 10;
const DECAY = [[10, 600], [20, 300], [30, 150], [40, 120]];

// ======================= numbers (all checked) =======================
calc('rate10', r4(1 / 600), 0.0017); calc('rate20', r4(1 / 300), 0.0033); calc('rate30', r4(1 / 150), 0.0067); calc('rate40', r4(1 / 120), 0.0083);
calc('eff ex', eff(1000, 100), 10); calc('MT eff', eff(2500, 200), 8); calc('YT eff', eff(480, 60), 12.5);
calc('MT rate', r4(1 / 250), 0.004); calc('YT rate', r4(1 / 80), 0.0125);
calc('P7', eff(4000, 360), 9); calc('P8', r4(1 / 400), 0.0025); calc('exam', eff(600, 45), 7.5); calc('HW', eff(900, 108), 12);

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
function box(s, x, y, w, h, t, col, fill, size = 16) { rect(s, x, y, w, h, fill, col, { lw: 2 }); txt(s, t, x + 0.08, y, w - 0.16, h, { size, bold: true, align: 'center', valign: 'middle' }); }
function lab(s, x, y, w, t, col = C.ink) { txt(s, t, x, y, w, 0.35, { size: 13, bold: true, color: col, align: 'center' }); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'The carbon and water cycles, decomposition and the decay practical, environmental change, and trophic levels and biomass',
  bullets: ['Part 1: the carbon and water cycles (4.7.2.2)', 'Part 2: decomposition and Required practical 10 (4.7.2.3)', 'Part 3: HT: the impact of environmental change (4.7.2.4)', 'Part 4: trophic levels and pyramids of biomass (4.7.4)'],
  notes: 'AQA 8461 GCSE Biology 4.7, lesson 2 of 3. Separate Biology only: 4.7.2.3 decomposition, RP10, 4.7.2.4 (HT only) and 4.7.4. Lesson 3: biodiversity, human impact and food security. About two hours.',
});

D.objectives({
  tag: '4.7.2, 4.7.4',
  items: [
    'Explain the **carbon** and **water cycles** and the role of **microorganisms**.',
    'Explain how **temperature, water** and **oxygen** affect decay; make **compost** and **biogas**.',
    'Carry out **RP10** and calculate a **rate** as 1 ÷ time. **HT:** environmental change.',
    'Draw **pyramids of biomass** and calculate the **efficiency** of biomass transfer.',
  ],
  keywords: ['decomposer', 'combustion', 'biogas', 'lipase', 'trophic level', 'biomass'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Write the word equation for aerobic respiration.', 'What is a producer?', 'What do lipase enzymes break down?', 'What does a low pH mean?'],
  answers: ['Glucose + oxygen → CO₂ + water', 'An organism that makes its own food (photosynthesis)', 'Lipids into fatty acids and glycerol', 'Acidic'],
  notes: 'Retrieval from 4.4.2, lesson 1, 4.2 (digestion) and chemistry. Lipase and pH are needed for RP10.',
});

D.vocab({
  title: 'Key words', tag: '4.7.2, 4.7.4',
  items: [
    { term: 'Decomposer', def: 'A **microorganism** (bacterium or fungus) that **breaks down** dead material and waste.' },
    { term: 'Biogas', def: 'Mainly **methane**, made by **anaerobic** decay; burned as a fuel.' },
    { term: 'Trophic level', def: 'A **feeding level** in a food chain: 1 = producers, 2 = primary consumers, and so on.' },
    { term: 'Biomass', def: 'The **mass of living material**. It is passed along a food chain, but most is lost.' },
  ],
  notes: 'Apex predators are carnivores with no predators.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the carbon cycle', { tag: '4.7.2.2' });
  const air = [MX + 2.6, 1.45, 3.0, 0.8];
  box(s, ...air, 'CO₂ in the air', C.accent, C.soft, 18);
  box(s, MX + 0.2, 3.6, 2.0, 0.8, 'Plants', C.green, C.greenSoft);
  box(s, MX + 3.2, 3.6, 2.0, 0.8, 'Animals', C.orange, C.orangeSoft);
  box(s, MX + 1.6, 5.6, 4.4, 0.8, 'Dead material and waste', C.grey, C.greyLight);
  box(s, MX + 5.8, 3.6, 2.0, 0.8, 'Fossil fuels', '6B4A2E', 'EFE3D6');
  arrow(s, MX + 2.75, 2.27, MX + 1.9, 3.58, C.green, 3); txt(s, 'photosynthesis', MX + 2.3, 3.15, 1.7, 0.35, { size: 13, bold: true, color: C.green });
  arrow(s, MX + 0.7, 3.58, MX + 2.6, 1.9, C.red, 2); txt(s, 'respiration', MX - 0.2, 2.45, 1.4, 0.35, { size: 13, bold: true, color: C.red });
  arrow(s, MX + 2.2, 4.0, MX + 3.18, 4.0, C.ink, 2.5); lab(s, MX + 2.0, 4.05, 1.4, 'eaten');
  arrow(s, MX + 4.2, 3.58, MX + 4.7, 2.27, C.red, 2.5); txt(s, 'respiration', MX + 3.0, 2.55, 1.4, 0.35, { size: 13, bold: true, color: C.red, align: 'right' });
  arrow(s, MX + 1.3, 4.42, MX + 2.2, 5.58, C.grey, 2); arrow(s, MX + 4.1, 4.42, MX + 3.6, 5.58, C.grey, 2);
  arrow(s, MX + 5.5, 5.58, MX + 5.5, 2.27, '8A5A2B', 2.5); txt(s, 'decomposers respire', MX + 5.6, 4.75, 2.6, 0.35, { size: 13, bold: true, color: '8A5A2B' });
  arrow(s, MX + 6.8, 3.58, MX + 5.62, 2.0, C.red, 2.5); lab(s, MX + 6.1, 2.6, 1.8, 'combustion', C.red);
  const bx = MX + 8.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Key points', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['**Photosynthesis** removes CO₂ from the air.', '**Respiration** and **combustion** return it.', '**Decomposers** break down dead material, releasing CO₂ and **mineral ions** to the soil.'], 16, 0.25);
  notes(s, 'Spec 4.7.2.2: "All materials in the living world are recycled to provide the building blocks for future organisms. The carbon cycle returns carbon from organisms to the atmosphere as carbon dioxide to be used by plants in photosynthesis. Decay of dead plants and animals by microorganisms returns carbon to the atmosphere as carbon dioxide and mineral ions to the soil." Simplified diagram.');
}

{
  const s = frame('The water cycle', { tag: '4.7.2.2' });
  const st = [['Evaporation', 'from seas, lakes; and **transpiration** from plants'], ['Condensation', 'water vapour cools and forms **clouds**'], ['Precipitation', 'rain, snow or hail'], ['Back to the sea', 'runoff and rivers; water is taken up by plants and animals']];
  const n = 4, gap = 0.4, bw = (W - 2 * MX - (n - 1) * gap) / n;
  st.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap);
    headCard(s, x, 1.45, bw, 2.4, a, [C.orange, C.accent, C.blue, C.green][i], C.white);
    txt(s, b, x + 0.15, 2.15, bw - 0.3, 1.6, { size: 16, align: 'center' });
    if (i < n - 1) arrow(s, x + bw + 0.04, 2.65, x + bw + gap - 0.04, 2.65, C.ink, 2.5);
  });
  rect(s, MX, 4.15, W - 2 * MX, 2.7, C.soft, C.line);
  bullets(s, MX + 0.3, 4.3, W - 2 * MX - 0.6, ['The water cycle provides **fresh water** for plants and animals on land, before it drains back into the sea.', 'Plants: water taken up by roots, lost by **transpiration**.', 'Animals: water gained by drinking and eating; lost in **sweat, urine and breath**.'], 17, 0.15);
  notes(s, 'Spec 4.7.2.2: students should be able to explain the importance of the carbon and water cycles to living organisms.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which process removes carbon dioxide from the air?',
  options: ['Photosynthesis', 'Respiration', 'Combustion', 'Decay'],
  correct: 0,
  notes: 'Answer A. B, C and D all release CO₂.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: decomposition', { tag: '4.7.2.3' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 2.65;
  [['Temperature', 'Warm speeds up the **enzymes** of decomposers. Too hot **denatures** them.'], ['Water', 'Decomposers need **moisture**: dry material decays slowly.'], ['Oxygen', 'Most decomposers respire **aerobically**, so they need oxygen.']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 });
  });
  const gw = (W - 2 * MX - 0.4) / 2;
  headCard(s, MX, 4.3, gw, 2.55, 'Compost', C.green, C.greenSoft);
  txt(s, 'Gardeners keep heaps **warm, moist and aerated** (turned) so garden waste decays quickly into **natural fertiliser**.', MX + 0.25, 5.0, gw - 0.5, 1.75, { size: 16 });
  headCard(s, MX + gw + 0.4, 4.3, gw, 2.55, 'Biogas', C.orange, C.orangeSoft);
  txt(s, '**Anaerobic** decay in a sealed **biogas generator** makes **methane**, burned as a fuel. Works best at 30–40 °C.', MX + gw + 0.65, 5.0, gw - 0.5, 1.75, { size: 16 });
  notes(s, 'Spec 4.7.2.3 (separate Biology): "Temperature, water and availability of oxygen affect the rate of decay of biological material. Gardeners and farmers try to provide optimum conditions for rapid decay of waste biological material. The compost produced is used as a natural fertiliser for growing garden plants or crops. Anaerobic decay produces methane gas. Biogas generators can be used to produce methane gas as a fuel."');
}

{
  const s = frame('Required practical 10: decay', { tag: 'RP10' });
  headCard(s, MX, 1.4, 6.0, 3.15, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 5.6, ['Mix **milk**, **sodium carbonate** (alkaline) and **phenolphthalein** (pink in alkali).', 'Warm to the temperature in a water bath; add **lipase**.', 'Time how long until the pink **disappears**: lipase makes **fatty acids**, so pH falls.', 'Repeat at 10, 20, 30, 40 °C.'], 15, 0.06);
  const tx = MX + 6.4, tw = W - MX - tx, cws = [1.7, 1.9, tw - 3.6];
  ['Temp (°C)', 'Time (s)', 'Rate = 1 ÷ t (s⁻¹)'].forEach((t, j) => { const x = tx + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 1.4, cws[j], 0.6, C.maroon); txt(s, t, x + 0.1, 1.4, cws[j] - 0.2, 0.6, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' }); });
  DECAY.forEach(([T, t], i) => [String(T), String(t), r4(1 / t).toFixed(4)].forEach((v, j) => { const x = tx + cws.slice(0, j).reduce((a, b) => a + b, 0), y = 2.0 + i * 0.6; rect(s, x, y, cws[j], 0.6, i % 2 ? C.white : C.soft, C.line); txt(s, v, x, y, cws[j], 0.6, { size: 17, bold: j === 2, color: j === 2 ? C.green : C.ink, align: 'center', valign: 'middle' }); }));
  rect(s, MX, 4.75, W - 2 * MX, 2.1, C.orangeSoft, 'F3D9B5');
  bullets(s, MX + 0.3, 4.9, W - 2 * MX - 0.6, ['**Rate = 1 ÷ time**: a shorter time means a faster rate.', 'As temperature rises, the rate increases (enzymes work faster) up to an **optimum**.', 'Control: same volumes of milk, lipase and sodium carbonate; same judgement of colour change.'], 16, 0.08);
  notes(s, 'RP10 (separate Biology): "investigate the effect of temperature on the rate of decay of fresh milk by measuring pH change." Sample data, not real results. Answers rounded to 4 decimal places. The end point (pink to colourless) is subjective, so a pH probe is more accurate.');
}

D.myTurnYourTurn({
  title: 'Rates and decay', tag: 'Maths skill', stepSize: 20, labelW: 2.4, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: 'Rate: t = 250 s', text: '**0.004 s⁻¹**' },
      { label: 'Why lower pH?', text: '**Fatty acids made**' },
      { label: 'Biogas gas', text: '**Methane**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: 'Rate: t = 80 s', text: '**0.0125 s⁻¹**' },
      { label: 'Why turn compost?', text: '**Adds oxygen**' },
      { label: 'Biogas: decay type', text: '**Anaerobic**' },
    ],
  },
  notes: 'Rate = 1 ÷ time. 1 ÷ 250 = 0.004; 1 ÷ 80 = 0.0125.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: the impact of environmental change', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'Environmental changes affect the **distribution** of species in an ecosystem: where they live and how many there are.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 19, valign: 'middle' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 2.65, h = 2.5;
  [['Temperature', 'Warmer climate: species move **north** or to **higher** ground.'], ['Water availability', 'Drought or flooding changes which species can survive.'], ['Composition of gases', 'e.g. sulfur dioxide pollution: fewer **lichens**.']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 });
  });
  rect(s, MX, 5.4, W - 2 * MX, 1.45, C.orangeSoft, 'F3D9B5');
  txt(s, 'Changes may be **seasonal**, **geographic** or caused by **human interaction**.', MX + 0.3, 5.4, W - 2 * MX - 0.6, 1.45, { size: 19, valign: 'middle' });
  notes(s, 'HT 4.7.2.4: "Environmental changes affect the distribution of species in an ecosystem. These changes include: temperature; availability of water; composition of atmospheric gases. The changes may be seasonal, geographic or caused by human interaction." Students should be able to evaluate data on these changes.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: pyramids of biomass', { tag: '4.7.4' });
  const levels = [['Level 4: tertiary consumer', 1.2, C.red], ['Level 3: secondary consumer', 2.4, C.orange], ['Level 2: primary consumer', 4.0, C.accent], ['Level 1: producer', 6.4, C.green]];
  levels.forEach(([t, w, col], i) => { const y = 1.6 + i * 1.15, x = MX + 3.5 - w / 2; rect(s, x, y, w, 0.95, col); txt(s, t, MX + 7.3, y, 3.6, 0.95, { size: 16, bold: true, color: col, valign: 'middle' }); });
  rect(s, MX, 6.3, W - 2 * MX, 0.55, C.soft, C.line);
  txt(s, 'Each bar is drawn to **scale**: its width shows the **biomass** at that trophic level. The pyramid gets narrower at every level.', MX + 0.2, 6.3, W - 2 * MX - 0.4, 0.55, { size: 15, valign: 'middle' });
  notes(s, 'Spec 4.7.4.1–4.7.4.2: trophic levels, and "pyramids of biomass can be constructed to represent the relative amount of biomass in each level of a food chain. Trophic level 1 is at the bottom of the pyramid." Students should be able to construct accurate pyramids from data.');
}

{
  const s = frame('Why biomass is lost', { tag: '4.7.4.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.05, C.soft, C.line);
  txt(s, 'Producers transfer about **1%** of the light energy they receive into biomass. Only about **10%** of biomass passes to the next level.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.05, { size: 19, valign: 'middle' });
  const gw = (W - 2 * MX - 0.4) / 2;
  headCard(s, MX, 2.7, gw, 4.15, 'Where the rest goes', C.red, 'FBEDEB');
  bullets(s, MX + 0.25, 3.4, gw - 0.5, ['Not all biomass is **eaten** (roots, bones).', 'Some is **egested** as faeces (cannot be digested).', 'Lost as waste: **CO₂** and **water** (respiration), **urea** in urine.', 'Used in **respiration** for movement and keeping warm.'], 16, 0.12);
  headCard(s, MX + gw + 0.4, 2.7, gw, 4.15, 'Efficiency', C.green, C.greenSoft);
  txt(s, 'efficiency = biomass at next level ÷ biomass at previous level × 100', MX + gw + 0.65, 3.4, gw - 0.5, 0.8, { size: 17, bold: true });
  txt(s, 'Grass 1000 g → rabbits 100 g', MX + gw + 0.65, 4.4, gw - 0.5, 0.45, { size: 17 });
  txt(s, '100 ÷ 1000 × 100 = **10%**', MX + gw + 0.65, 4.95, gw - 0.5, 0.55, { size: 22, color: C.green });
  txt(s, 'This is why food chains rarely have more than **five** levels.', MX + gw + 0.65, 5.75, gw - 0.5, 0.9, { size: 15, color: C.grey });
  notes(s, 'Spec 4.7.4.3: losses listed exactly. "Students should be able to calculate the efficiency of biomass transfers between trophic levels by percentages or fractions of mass, and explain how this affects the number of organisms at each trophic level."');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is less biomass found at each higher trophic level?',
  options: ['Biomass is lost in waste and used in respiration', 'Predators are smaller than prey', 'Producers make biomass at every level', 'Biomass is destroyed by sunlight'],
  correct: 0,
  notes: 'Answer A. B: predators are often larger. C and D are false.',
});

D.myTurnYourTurn({
  title: 'Efficiency of biomass transfer', tag: 'Maths skill', stepSize: 21, labelW: 1.9, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Plants 2500 g/m², caterpillars 200 g/m². Find the efficiency.',
    steps: [
      { label: 'Formula', text: '**200 ÷ 2500 × 100**' },
      { label: 'Answer', text: '**8%**' },
    ],
  },
  yours: {
    q: 'Caterpillars 480 g/m², birds 60 g/m². Find the efficiency.',
    steps: [
      { label: 'Formula', text: '**60 ÷ 480 × 100**' },
      { label: 'Answer', text: '**12.5%**' },
    ],
  },
  notes: 'Always divide the higher level by the lower level.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Name two processes that release CO₂ into the air.', 'Respiration, combustion'], ['Which gas does a biogas generator make?', 'Methane'], ['Name the three factors that affect decay.', 'Temperature, water, oxygen'], ['What percentage of biomass passes to the next level?', 'About 10%'],
    ['Why does the pink colour disappear in RP10?', 'Fatty acids lower the pH'], ['HT  Give one cause of a change in species distribution.', 'Temperature, water, gases'],
    ['Wheat 4000 kg; cattle 360 kg. Find the efficiency.', '9%'], ['RP10: the time was 400 s. Calculate the rate.', '0.0025 s⁻¹'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) respiration, combustion, decay  2) methane  3) temperature, water, oxygen  4) about 10%  5) lipase breaks down lipids into fatty acids, lowering the pH below the indicator\'s change point  6) temperature, water availability, atmospheric gases  7) 360 ÷ 4000 × 100 = 9%  8) 1 ÷ 400 = 0.0025 s⁻¹.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Describe how carbon in a dead leaf is returned to the air.', m: 2, lines: 1 },
    { l: 'b', q: 'Explain why a compost heap decays faster in summer than in winter.', m: 2, lines: 1 },
    { l: 'c', q: 'In RP10, describe how the student could measure the rate of decay of milk at 30 °C.', m: 3, lines: 1 },
    { l: 'd', q: 'Mice have 600 g of biomass; owls have 45 g. Calculate the efficiency of the transfer, and give one reason it is so low.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'decomposers (microorganisms) break down the leaf; they respire, releasing CO₂', '2', ''],
    ['(b)', 'warmer temperature; decomposers\' enzymes work faster', '2', ''],
    ['(c)', 'milk + sodium carbonate + indicator in a 30 °C water bath; add lipase, start timer; time until colour change; rate = 1 ÷ time', '3', 'allow: pH probe'],
    ['(d)', '45 ÷ 600 × 100 = 7.5%; any one: respiration, egestion, excretion, not all eaten', '3', '2 for calculation'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What do decomposers release into the soil?', 'Why is compost turned regularly?', 'What does trophic level 1 contain?', 'Give one way biomass is lost between levels.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) mineral ions (and CO₂ to the air)  2) to add oxygen for aerobic decomposers  3) producers  4) egestion, excretion, respiration, parts not eaten. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw and label the carbon cycle.',
    'Explain why biogas generators are kept at 30–40 °C.',
    'Plot rate against temperature from the RP10 table and describe the trend.',
    'HT  Suggest why some species of bird are now found further north in the UK.',
    'Grass 900 g; rabbits 108 g. Calculate the efficiency.',
    'Draw a pyramid of biomass for: oak tree → caterpillars → blue tits → hawk.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) photosynthesis, respiration, eating, decomposition, combustion  2) optimum for anaerobic bacteria\'s enzymes  3) rate rises with temperature  4) climate warming, so suitable habitat moves north  5) 12%  6) a pyramid (biomass falls at each level, even though there is one tree).');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.7_B_CyclesDecayBiomass.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
