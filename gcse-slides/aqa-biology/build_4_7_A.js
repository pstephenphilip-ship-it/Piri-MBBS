// build_4_7_A.js — AQA GCSE Biology (8461) 4.7 Ecology, lesson 1 of 3:
// 4.7.1.1 Communities, 4.7.1.2 Abiotic factors, 4.7.1.3 Biotic factors, 4.7.1.4 Adaptations,
// 4.7.2.1 Levels of organisation (food chains, predator–prey) and Required practical 9 (quadrats and transects).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_7_A.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.7.1–4.7.2.1', title: 'Ecosystems and sampling',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const median = a => { const b = [...a].sort((x, y) => x - y), n = b.length; return n % 2 ? b[(n - 1) / 2] : (b[n / 2 - 1] + b[n / 2]) / 2; };
const mode = a => { const c = {}; a.forEach(v => c[v] = (c[v] || 0) + 1); return Number(Object.keys(c).sort((x, y) => c[y] - c[x])[0]); };
const Q = [4, 7, 3, 7, 9, 6, 5, 7, 8, 4];
const YT = [2, 5, 3, 5, 6, 5, 4, 2];

// ======================= numbers (all checked) =======================
calc('mean Q', mean(Q), 6); calc('median Q', median(Q), 6.5); calc('mode Q', mode(Q), 7); calc('range', Math.max(...Q) - Math.min(...Q), 6);
calc('pop', mean(Q) / 0.25 * 1000, 24000);
calc('YT mean', mean(YT), 4); calc('YT median', median(YT), 4.5); calc('YT mode', mode(YT), 5); calc('YT pop', mean(YT) / 0.25 * 600, 9600);
calc('P8', 3 / 0.25 * 200, 2400); calc('exam', 5 / 0.25 * 1500, 30000); calc('HW', 2 / 1 * 400, 800);

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

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Communities, abiotic and biotic factors, adaptations, food chains, predator–prey cycles and sampling',
  bullets: ['Part 1: communities and the factors that affect them (4.7.1.1–4.7.1.3)', 'Part 2: adaptations (4.7.1.4)', 'Part 3: food chains and predator–prey cycles (4.7.2.1)', 'Part 4: Required practical 9: quadrats and transects'],
  notes: 'AQA 8461 GCSE Biology 4.7 Ecology, lesson 1 of 3. Lesson 2: cycles, decomposition (RP10), environmental change and trophic levels. Lesson 3: biodiversity, human impact and food security. About two hours.',
});

D.objectives({
  tag: '4.7.1, 4.7.2.1',
  items: [
    'Explain **interdependence** and what makes a community **stable**.',
    'Describe **abiotic** and **biotic** factors, and how organisms are **adapted**.',
    'Interpret **food chains** and **predator–prey** graphs.',
    'Use **quadrats** and **transects**, and calculate **mean, median, mode** and population size.',
  ],
  keywords: ['ecosystem', 'interdependence', 'abiotic', 'biotic', 'extremophile', 'quadrat'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What do plants make in photosynthesis?', 'What is natural selection?', 'Name a factor that limits the rate of photosynthesis.', 'Find the mean of 3, 5, 7.'],
  answers: ['Glucose (and oxygen)', 'Best-suited individuals survive and breed', 'Light, CO₂ or temperature', '5'],
  notes: 'Retrieval from 4.4.1 and 4.6, plus the maths needed for RP9.',
});

D.vocab({
  title: 'Key words', tag: '4.7.1',
  items: [
    { term: 'Ecosystem', def: 'The **interaction** of a community of living organisms (biotic) with the non-living (abiotic) parts of their environment.' },
    { term: 'Interdependence', def: 'Species **depend on each other** for food, shelter, pollination, seed dispersal and so on.' },
    { term: 'Abiotic / biotic', def: '**Non-living** factors (e.g. light, temperature) / **living** factors (e.g. predators, competition).' },
    { term: 'Extremophile', def: 'An organism that lives in **extreme** conditions: high temperature, pressure or salt.' },
  ],
  notes: 'Also: population (all of one species in a habitat), community (all the populations), habitat (where an organism lives).',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: communities', { tag: '4.7.1.1' });
  const lv = [['Individual', 'one organism'], ['Population', 'all of one species in a habitat'], ['Community', 'all the populations in a habitat'], ['Ecosystem', 'the community + the non-living environment']];
  lv.forEach(([a, b], i) => { const y = 1.45 + i * 0.85; rect(s, MX, y, 2.6, 0.72, [C.grey, C.accent, C.maroon, C.green][i]); txt(s, a, MX, y, 2.6, 0.72, { size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' }); txt(s, b, MX + 2.8, y, 3.6, 0.72, { size: 16, valign: 'middle' }); });
  const bx = MX + 6.7, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.2, 'Competition', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Plants** compete for **light**, **space**, **water** and **mineral ions**.', '**Animals** compete for **food**, **mates** and **territory**.'], 17, 0.2);
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.greenSoft, C.green);
  txt(s, '**A stable community** is one where all the species and environmental factors are in **balance**, so population sizes stay roughly constant. Removing one species can affect the whole community (interdependence).', MX + 0.3, 5.0, W - 2 * MX - 0.6, 1.85, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.7.1.1: "Within a community each species depends on other species for food, shelter, pollination, seed dispersal etc. If one species is removed it can affect the whole community. This is called interdependence. A stable community is one where all the species and environmental factors are in balance so that population sizes remain fairly constant."');
}

{
  const s = frame('Abiotic and biotic factors', { tag: '4.7.1.2, 4.7.1.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Abiotic (non-living)', C.orange, C.orangeSoft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Light intensity', 'Temperature', 'Moisture levels', 'Soil pH and mineral content', 'Wind intensity and direction', 'CO₂ (plants); O₂ (aquatic animals)'], 18, 0.12);
  headCard(s, MX + cw + gap, top, cw, h, 'Biotic (living)', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Availability of **food**', '**New predators** arriving', '**New pathogens**', 'One species **outcompeting** another so numbers are no longer high enough to breed'], 18, 0.2);
  notes(s, 'Spec 4.7.1.2 and 4.7.1.3 list exactly these factors. Students should be able to explain how a change in one factor might affect a community, e.g. a new pathogen reduces a prey population, so predators starve.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which of these is a biotic factor?',
  options: ['A new pathogen', 'Soil pH', 'Wind direction', 'Light intensity'],
  correct: 0,
  notes: 'Answer A: it is a living organism. B, C, D are abiotic.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: adaptations', { tag: '4.7.1.4' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 3.6;
  [['Structural', 'Features of **body shape** or structure.', 'Polar bear: thick fur, small ears; cactus: spines instead of leaves'], ['Behavioural', 'How an organism **behaves**.', 'Birds migrating; animals hibernating'], ['Functional', 'Processes inside the body, e.g. **reproduction** and **metabolism**.', 'Camel: very little urine; desert animals breed only after rain']].forEach(([a, b, e], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft);
    txt(s, b, x + 0.2, top + 0.75, cw - 0.4, 1.0, { size: 18 });
    txt(s, 'e.g. ' + e, x + 0.2, top + 1.9, cw - 0.4, 1.6, { size: 16, bold: true, color: C.green });
  });
  rect(s, MX, 5.25, W - 2 * MX, 1.6, C.orangeSoft, 'F3D9B5');
  txt(s, '**Extremophiles** live in extreme environments: high **temperature**, high **pressure** or high **salt** concentration. E.g. bacteria in deep-sea volcanic vents.', MX + 0.3, 5.25, W - 2 * MX - 0.6, 1.6, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.7.1.4: "Organisms have features (adaptations) that enable them to survive in the conditions in which they normally live. These adaptations may be structural, behavioural or functional." Students should be able to explain how organisms are adapted to their environment, given information.');
}

D.myTurnYourTurn({
  title: 'Explaining adaptations', tag: 'Exam skill', stepSize: 19, labelW: 1.95, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain how a polar bear is adapted to the Arctic.  [3 marks]',
    steps: [
      { label: 'Thick fur', text: '**Insulates: less energy lost**' },
      { label: 'Small ears', text: '**Small SA : volume ratio**' },
      { label: 'White fur', text: '**Camouflage when hunting**' },
    ],
  },
  yours: {
    q: 'Explain how a cactus is adapted to the desert.  [3 marks]',
    steps: [
      { label: 'Spines', text: '**Less surface: less water lost**' },
      { label: 'Thick stem', text: '**Stores water**' },
      { label: 'Long roots', text: '**Reach water deep down**' },
    ],
  },
  notes: 'Exam pattern: feature + how it helps. "It has spines" alone is not an explanation.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: food chains', { tag: '4.7.2.1' });
  flow(s, [['Producer', 'grass: makes glucose by photosynthesis'], ['Primary consumer', 'rabbit (herbivore)'], ['Secondary consumer', 'stoat'], ['Tertiary consumer', 'fox: apex predator']], 1.45, 2.0, 16, [C.green, C.accent, C.orange, C.red]);
  rect(s, MX, 3.75, W - 2 * MX, 1.2, C.soft, C.line);
  txt(s, 'Arrows show the **direction of energy (biomass) transfer**. Producers are almost always plants or algae: they make **biomass** using light energy.', MX + 0.3, 3.75, W - 2 * MX - 0.6, 1.2, { size: 18, valign: 'middle' });
  rect(s, MX, 5.15, W - 2 * MX, 1.7, C.orangeSoft, 'F3D9B5');
  txt(s, '**Predators** kill and eat other animals; the animals eaten are **prey**. In a stable community, the numbers of predators and prey **rise and fall in cycles**.', MX + 0.3, 5.15, W - 2 * MX - 0.6, 1.7, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.7.2.1: "Feeding relationships within a community can be represented by food chains. All food chains begin with a producer which synthesises molecules. This is usually a green plant or alga which makes glucose by photosynthesis."');
}

{
  const s = frame('Predator–prey cycles', { tag: '4.7.2.1' });
  const G = graph(D, s, MX + 0.9, 1.75, 7.0, 4.4, [0, 20], [0, 100], { gridX: 2, gridY: 20, labX: 4, labY: 20, axesAtEdge: true, xTitle: 'Time (years)', yTitle: 'Population size (thousands)' });
  G.curve(t => 55 + 35 * Math.sin(t / 10 * 2 * Math.PI), 0, 20, C.green, 3.5, 200);
  G.curve(t => 25 + 12 * Math.sin((t - 2.5) / 10 * 2 * Math.PI), 0, 20, C.red, 3.5, 200);
  txt(s, 'prey (hares)', G.px(2.6), G.py(97), 2.0, 0.35, { size: 15, bold: true, color: C.green });
  txt(s, 'predators (lynx)', G.px(9.5), G.py(12), 2.4, 0.35, { size: 15, bold: true, color: C.red });
  const bx = MX + 8.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Explaining the cycle', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['More prey: more food, so **predators increase**.', 'More predators eat more prey: **prey fall**.', 'Less food: **predators fall**.', 'Fewer predators: **prey recover**.', 'Predator peaks come **after** prey peaks.'], 16, 0.12);
  notes(s, 'Sketch graph, not real data (based on the lynx and snowshoe hare pattern). The predator line lags behind the prey line. Predators are usually fewer than prey.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does the predator population peak after the prey population?',
  options: ['It takes time for predators to breed when food is plentiful', 'Predators eat all the prey at once', 'Prey eat the predators', 'Predators need less food than prey'],
  correct: 0,
  notes: 'Answer A. More food means more young survive, but breeding takes time, so the predator peak lags.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: Required practical 9: quadrats', { tag: 'RP9' });
  // field with grid of random quadrats
  const fx = MX + 0.3, fy = 1.5, fw = 5.4, fh = 4.0;
  rect(s, fx, fy, fw, fh, 'DCEFD5', '6B9E5A', { lw: 2 });
  [[0.6, 0.5], [3.4, 0.7], [1.8, 1.9], [4.3, 2.3], [0.9, 3.1], [2.8, 3.2]].forEach(([dx, dy]) => rect(s, fx + dx, fy + dy, 0.55, 0.55, C.white, C.ink, { lw: 1.5 }));
  txt(s, 'quadrats placed at random coordinates', fx, fy + fh + 0.1, fw, 0.35, { size: 14, bold: true });
  txt(s, 'field: 50 m × 20 m = 1000 m²', fx, fy + fh + 0.45, fw, 0.35, { size: 14, color: C.grey });
  const bx = MX + 6.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.6, 'Method: random sampling', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Lay two tape measures at right angles.', 'Use a random number generator for coordinates.', 'Count the organisms in each quadrat (e.g. 0.25 m²); do at least 10.'], 15, 0.06);
  headCard(s, bx, 4.15, bw, 2.7, 'Estimating population size', C.green, C.greenSoft);
  txt(s, 'Mean per quadrat = 6 daisies (in 0.25 m²)', bx + 0.2, 4.85, bw - 0.4, 0.45, { size: 16 });
  txt(s, 'Per m²: 6 ÷ 0.25 = 24', bx + 0.2, 5.35, bw - 0.4, 0.45, { size: 16 });
  txt(s, 'Field: 24 × 1000 = **24 000 daisies**', bx + 0.2, 5.85, bw - 0.4, 0.55, { size: 18, color: C.green });
  notes(s, 'RP9: "measure the population size of a common species in a habitat. Use sampling techniques to investigate the effect of a factor on the distribution of this species." Random placement avoids bias. Population = mean per m² × total area.');
}

{
  const s = frame('RP9: transects and averages', { tag: 'RP9' });
  headCard(s, MX, 1.4, 5.6, 2.9, 'Transects', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 5.2, ['A tape measure is laid out **across a change** in habitat, e.g. from a tree into open field.', 'Place a quadrat at **regular intervals** (e.g. every 2 m).', 'Shows how **distribution** changes with a factor (e.g. light).'], 15, 0.06);
  const tx = MX + 6.0, tw = W - MX - tx;
  txt(s, 'Daisies in 10 quadrats:', tx, 1.4, tw, 0.45, { size: 18, bold: true, color: C.maroon });
  const cw = tw / 10;
  Q.forEach((v, i) => { rect(s, tx + i * cw, 1.95, cw, 0.7, i % 2 ? C.white : C.soft, C.line); txt(s, String(v), tx + i * cw, 1.95, cw, 0.7, { size: 20, bold: true, align: 'center', valign: 'middle' }); });
  const rows = [['Mean', 'total ÷ number = 60 ÷ 10', '6'], ['Median', 'middle of 3 4 4 5 6 | 7 7 7 8 9', '6.5'], ['Mode', 'most common value', '7'], ['Range', '9 − 3', '6']];
  rows.forEach(([a, b, c], i) => {
    const y = 2.95 + i * 0.68;
    rect(s, tx, y, tw, 0.6, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, a, tx + 0.15, y, 1.2, 0.6, { size: 16, bold: true, valign: 'middle' });
    txt(s, b, tx + 1.35, y, tw - 2.3, 0.6, { size: 14, valign: 'middle' });
    txt(s, c, tx + tw - 0.85, y, 0.7, 0.6, { size: 19, bold: true, color: C.green, align: 'center', valign: 'middle' });
  });
  rect(s, MX, 5.75, W - 2 * MX, 1.1, C.orangeSoft, 'F3D9B5');
  txt(s, 'Median with an **even** number of values: the mean of the **two middle** values: (6 + 7) ÷ 2 = 6.5.', MX + 0.3, 5.75, W - 2 * MX - 0.6, 1.1, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.7.2.1 maths: "calculate arithmetic means... understand the terms mean, mode and median". Control variables in a transect comparison: same quadrat size, same time of day, same person identifying.');
}

D.myTurnYourTurn({
  title: 'Sampling calculations', tag: 'Maths skill', stepSize: 20, labelW: 2.35, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: true,
  mine: {
    q: 'Counts: 4, 7, 3, 7, 9, 6, 5, 7, 8, 4. Quadrat 0.25 m²; field 1000 m².',
    steps: [
      { label: 'Mean', text: '**6**' },
      { label: 'Median', text: '**6.5**' },
      { label: 'Mode', text: '**7**' },
      { label: 'Population', text: '**24 000**' },
    ],
  },
  yours: {
    q: 'Counts: 2, 5, 3, 5, 6, 5, 4, 2. Quadrat 0.25 m²; field 600 m².',
    steps: [
      { label: 'Mean', text: '**4**' },
      { label: 'Median', text: '**4.5**' },
      { label: 'Mode', text: '**5**' },
      { label: 'Population', text: '**9600**' },
    ],
  },
  notes: 'Yours: total 32 ÷ 8 = 4. Ordered: 2 2 3 4 5 5 5 6, median (4 + 5) ÷ 2 = 4.5. Population: 4 ÷ 0.25 = 16 per m², × 600 = 9600.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is a community?', 'All the populations in a habitat'], ['Give two abiotic factors.', 'Light, temperature (any two)'], ['What do plants compete for?', 'Light, space, water, mineral ions'], ['What is an extremophile?', 'Organism living in extreme conditions'],
    ['Why must quadrats be placed at random?', 'To avoid bias / a fair sample'], ['Give one behavioural adaptation.', 'Migration or hibernation'],
    ['Why do predator numbers fall after prey numbers fall?', 'Less food, so fewer predators survive'], ['Mean 3 plants per 0.25 m² quadrat; area 200 m². Population?', '2400'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) all the populations of different species in a habitat  2) any of light, temperature, moisture, soil pH/minerals, wind, CO₂, O₂  3) light, space, water, mineral ions  4) an organism that lives in extreme temperature, pressure or salt  5) to avoid bias, so the sample is representative  6) migration, hibernation  7) less food, so fewer survive and breed  8) 3 ÷ 0.25 = 12 per m², × 200 = 2400.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Name one abiotic and one biotic factor that could affect the number of buttercups in a field.', m: 2, lines: 0 },
    { l: 'b', q: 'Describe how a student could estimate the number of buttercups in the field.', m: 4, lines: 2 },
    { l: 'c', q: 'The mean was 5 buttercups per 0.25 m² quadrat. The field is 1500 m². Estimate the population.', m: 2, lines: 1 },
    { l: 'd', q: 'Explain why the estimate might not be accurate.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'abiotic: light / water / soil pH / minerals / temperature; biotic: grazing animals / competition / pathogens', '2', ''],
    ['(b)', 'random coordinates (tapes and random numbers); place quadrat; count buttercups; many quadrats (≥10), find the mean, scale up to the field', '4', ''],
    ['(c)', '5 ÷ 0.25 = 20 per m²; × 1500 = 30 000', '2', ''],
    ['(d)', 'too few quadrats / distribution uneven; counting errors (hard to identify)', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What is interdependence?', 'Give one functional adaptation.', 'In a food chain, what do the arrows show?', 'Find the median of 2, 8, 4, 6.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) species depending on each other for food, shelter, pollination etc.  2) e.g. camels producing little urine; breeding after rain  3) the transfer of energy/biomass  4) ordered 2 4 6 8: (4 + 6) ÷ 2 = 5. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain what could happen to a community if bees died out.',
    'Explain three adaptations of a camel to the desert.',
    'Sketch a predator–prey graph and explain its shape.',
    'Plan a transect from a hedge into a field to test the effect of light on dandelions.',
    'Mean 2 dandelions per 1 m² quadrat; field 400 m². Estimate the population.',
    'Give two reasons a population estimate may be inaccurate.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) plants not pollinated, fewer fruits/seeds, animals that eat them decline (interdependence)  2) e.g. fat in hump, long eyelashes, little urine, wide feet  3) prey peak, then predator peak after; cycles  4) tape from hedge, quadrat every 2 m, count, measure light with a meter; repeat  5) 800  6) too few quadrats; uneven distribution; identification errors.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.7_A_EcosystemsSampling.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
