// build_4_4_1.js — AQA GCSE Biology (8461) 4.4.1 Photosynthesis (with RP6), lesson 1 of 2 on 4.4 Bioenergetics.
// One two-hour lesson for a Higher student.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_4_1.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.4.1', title: 'Photosynthesis',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const LEAF = '3E8E4F';
const F = (n, d) => ({ n, d });
const inv = (I0, d0, d) => I0 * (d0 / d) ** 2;

// ======================= numbers (all checked) =======================
calc('isl 20', inv(400, 10, 20), 100); calc('isl 40', inv(400, 10, 40), 25); calc('isl 5', inv(400, 10, 5), 1600);
calc('YT 30', inv(900, 10, 30), 100); calc('YT 20', inv(900, 10, 20), 225); calc('YT 15', inv(900, 10, 15), 400);
calc('table 10', 10000 / 10 ** 2, 100); calc('table 20', 10000 / 20 ** 2, 25); calc('table 40', 10000 / 40 ** 2, 6.25);
calc('rate ex', 12 / 5, 2.4); calc('P5', 32 / 4, 8); calc('P7', (10 / 30) ** 2, 1 / 9); calc('exam c', (15 / 30) ** 2, 0.25); calc('exit4', (10 / 5) ** 2, 4);
calc('HW5', 45 / 3, 15); calc('HW6', (20 / 50) ** 2, 0.16);

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function seg(s, x1, y1, x2, y2, color, width = 2) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipV: (x2 - x1) * (y2 - y1) < 0, line: { color, width } });
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
// small sketch graph: no numbers; fn on [0,10]
function sketch(s, x, y, w, h, fn, xTitle, colour = LEAF, extra) {
  const G = graph(D, s, x, y, w, h, [0, 10], [0, 10], { gridX: 2, gridY: 2, labX: 100, labY: 100, labSize: 1, axesAtEdge: true, xTitle, yTitle: 'Rate' });
  G.curve(fn, 0, 10, colour, 3.5, 120);
  if (extra) extra(G);
  return G;
}
const sat = (k, top) => x => top * (1 - Math.exp(-k * x));

// ======================= slides =======================
D.titleSlide({
  subtitle: 'The photosynthesis reaction, uses of glucose, limiting factors, the light-intensity required practical and the inverse square law',
  bullets: ['Part 1: the reaction and the uses of glucose (4.4.1.1, 4.4.1.3)', 'Part 2: the rate and limiting factors (4.4.1.2)', 'Part 3: Required practical 6: light intensity', 'Part 4: HT: the inverse square law and greenhouses'],
  notes: 'AQA 8461 GCSE Biology 4.4.1 Photosynthesis. Lesson 1 of 2 on 4.4 Bioenergetics; lesson 2 is respiration and metabolism (4.4.2). Required practical 6: investigate the effect of light intensity on the rate of photosynthesis using an aquatic organism such as pondweed. Higher only: interaction of limiting factors, the inverse square law, and the economics of greenhouses. About two hours.',
});

D.objectives({
  tag: '4.4.1',
  items: [
    'Write the **equation** for photosynthesis and explain why it is **endothermic**.',
    'Describe the **five uses** of the glucose a plant makes.',
    'Explain how **light, CO₂, temperature** and **chlorophyll** affect the rate, using **limiting factors**.',
    'Plan **RP6** and use the **inverse square law** (HT).',
  ],
  keywords: ['endothermic', 'chlorophyll', 'limiting factor', 'rate', 'inverse square law', 'starch'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['In which organelle does photosynthesis happen?', 'Which ion does a plant need to make chlorophyll?', 'Which gas enters a leaf through the stomata for photosynthesis?', 'An endothermic reaction takes in or gives out energy?'],
  answers: ['Chloroplast', 'Magnesium', 'Carbon dioxide', 'Takes in energy'],
  notes: 'Retrieval from 4.1 (cells), 4.2 (leaves) and 4.3.3 (magnesium and chlorosis), plus chemistry (endothermic).',
});

D.vocab({
  title: 'Key words', tag: '4.4.1',
  items: [
    { term: 'Endothermic', def: 'A reaction that **takes in energy** from the surroundings. Photosynthesis takes in **light** energy.' },
    { term: 'Chlorophyll', def: 'The green pigment in chloroplasts that **absorbs light**.' },
    { term: 'Limiting factor', def: 'The factor in **shortest supply**, which stops the rate going any higher.' },
    { term: 'Inverse square law', def: '**HT:** light intensity ∝ 1 ÷ distance². Double the distance → **¼** of the intensity.' },
  ],
  notes: 'Rate = how fast: measured as volume of oxygen per minute, or bubbles per minute.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the photosynthesis reaction', { tag: '4.4.1.1' });
  rect(s, MX, 1.4, W - 2 * MX, 2.15, C.soft, C.line);
  const mid = W / 2 - 0.3;
  const eq = (l, r, y, sz, col) => {
    txt(s, l, MX, y, mid - MX - 0.55, 0.6, { size: sz, bold: true, color: col, align: 'right' });
    txt(s, '→', mid - 0.5, y, 1.0, 0.6, { size: sz, bold: true, color: col, align: 'center' });
    txt(s, r, mid + 0.55, y, W - MX - mid - 0.55, 0.6, { size: sz, bold: true, color: col });
  };
  txt(s, 'light', mid - 0.6, 1.42, 1.2, 0.3, { size: 15, bold: true, color: C.orange, align: 'center' });
  eq('carbon dioxide  +  water', 'glucose  +  oxygen', 1.65, 30, C.ink);
  eq('6CO₂  +  6H₂O', 'C₆H₁₂O₆  +  6O₂', 2.35, 28, C.accent);
  txt(s, 'balanced symbol equation', MX, 2.95, W - 2 * MX, 0.4, { size: 15, color: C.grey, align: 'center' });
  const gap = 0.3, cw = (W - 2 * MX - 3 * gap) / 4, top = 3.8, h = 3.05;
  const cards = [
    ['Carbon dioxide', 'From the **air**. Diffuses into the leaf through the **stomata**.'],
    ['Water', 'From the **soil**. Taken up by **roots**, carried in the **xylem**.'],
    ['Light', 'Absorbed by **chlorophyll** in the chloroplasts. Energy is transferred **in**: **endothermic**.'],
    ['Products', '**Glucose** is used by the plant. **Oxygen** is used in respiration or released.'],
  ];
  cards.forEach(([a, b], i) => { const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, i === 2 ? C.orange : i === 3 ? C.green : C.maroon, i === 2 ? C.orangeSoft : i === 3 ? C.greenSoft : C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 }); });
  notes(s, 'Spec 4.4.1.1: photosynthesis is an endothermic reaction in which energy is transferred from the environment to the chloroplasts by light. Students should know the word equation and recognise the chemical symbols CO₂, H₂O, O₂ and C₆H₁₂O₆. The balanced equation is good practice for Higher.');
}

{
  const s = frame('What the plant does with glucose', { tag: '4.4.1.3' });
  const cx = W / 2, cy = 4.15;
  rect(s, cx - 1.3, cy - 0.5, 2.6, 1.0, C.green);
  txt(s, 'Glucose', cx - 1.3, cy - 0.5, 2.6, 1.0, { size: 26, bold: true, color: C.white, align: 'center', valign: 'middle' });
  const uses = [
    ['Respiration', 'releases energy for the plant', MX, 1.45],
    ['Starch', 'insoluble, so it is used for **storage**', W - MX - 3.9, 1.45],
    ['Fats and oils', 'for **storage** (e.g. in seeds)', MX, 5.5],
    ['Cellulose', 'strengthens the **cell walls**', W - MX - 3.9, 5.5],
    ['Amino acids', 'joined into **proteins**; needs **nitrate ions** from the soil', cx - 1.95, 5.75],
  ];
  uses.forEach(([a, b, x, y], i) => {
    const w = 3.9, h = 1.3;
    rect(s, x, y, w, h, C.soft, C.maroon);
    txt(s, a, x + 0.2, y + 0.08, w - 0.4, 0.45, { size: 20, bold: true, color: C.maroon });
    txt(s, b, x + 0.2, y + 0.52, w - 0.4, 0.75, { size: 16 });
    const tx = x + w / 2, ty = y < cy ? y + h : y;
    arrow(s, cx + (tx > cx + 0.5 ? 1.0 : tx < cx - 0.5 ? -1.0 : 0), tx === cx ? cy + 0.5 : (ty < cy ? cy - 0.5 : cy + 0.5), tx + (tx > cx + 0.5 ? -0.6 : tx < cx - 0.5 ? 0.6 : 0), ty + (ty < cy ? 0.05 : -0.05), C.ink, 2.5);
  });
  notes(s, 'Spec 4.4.1.3: glucose is used for respiration; converted into insoluble starch for storage; used to produce fat or oil for storage; used to produce cellulose, which strengthens the cell wall; used to produce amino acids for protein synthesis (plants also use nitrate ions absorbed from the soil). Starch is insoluble, so it does not affect water movement by osmosis.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why do plants store glucose as starch?',
  options: ['Starch is insoluble, so it does not affect osmosis', 'Starch releases more energy', 'Starch is needed to make chlorophyll', 'Starch makes the cell walls stronger'],
  correct: 0,
  notes: 'Answer A. D is cellulose. C is magnesium. B is not true.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: what affects the rate?', { tag: '4.4.1.2' });
  const gw = 3.6, gh = 2.55, y = 1.75, gap = (W - 2 * MX - 3 * gw - 0.6) / 2;
  const xs = [0, 1, 2].map(i => MX + 0.6 + i * (gw + gap));
  sketch(s, xs[0], y, gw, gh, sat(0.45, 8.5), 'Light intensity');
  sketch(s, xs[1], y, gw, gh, sat(0.45, 8.5), 'CO₂ concentration');
  sketch(s, xs[2], y, gw, gh, x => x < 6.5 ? 8.5 * Math.exp(-(((x - 6.5) / 3.2) ** 2)) : 8.5 - 3.4 * (x - 6.5) ** 1.15, 'Temperature', C.red);
  const ex = [
    'Rate rises, then **levels off**: something else becomes the limiting factor.',
    'Rate rises, then **levels off**: something else becomes the limiting factor.',
    'Rises to an **optimum**, then falls fast: **enzymes are denatured**.',
  ];
  ex.forEach((t, i) => txt(s, t, xs[i] - 0.4, y + gh + 0.7, gw + 0.4, 1.0, { size: 16 }));
  rect(s, MX, 5.8, W - 2 * MX, 1.05, C.soft, C.line);
  txt(s, 'The fourth factor is the **amount of chlorophyll**: less chlorophyll (e.g. chlorosis, disease) means less light absorbed.', MX + 0.3, 5.8, W - 2 * MX - 0.6, 1.05, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.4.1.2: factors affecting the rate are temperature, light intensity, carbon dioxide concentration and the amount of chlorophyll. Students should be able to measure and calculate rates, and to explain graphs of rate against each factor. Temperature: photosynthesis is enzyme-controlled.');
}

{
  const s = frame('Limiting factors: how they interact', HT);
  const G = graph(D, s, MX + 0.9, 1.75, 6.6, 4.4, [0, 10], [0, 10], { gridX: 2, gridY: 2, labX: 100, labY: 100, labSize: 1, axesAtEdge: true, xTitle: 'Light intensity', yTitle: 'Rate of photosynthesis' });
  G.curve(sat(0.5, 8.6), 0, 10, LEAF, 3.5, 120);
  G.curve(sat(0.5, 5.0), 0, 10, C.orange, 3.5, 120);
  txt(s, 'high CO₂', G.px(7.6), G.py(9.6), 1.6, 0.35, { size: 15, bold: true, color: LEAF });
  txt(s, 'low CO₂', G.px(7.6), G.py(6.0), 1.6, 0.35, { size: 15, bold: true, color: C.orange });
  txt(s, 'A', G.px(1.5) - 0.35, G.py(4.2) - 0.2, 0.4, 0.4, { size: 18, bold: true });
  txt(s, 'B', G.px(8.5), G.py(5.0) + 0.05, 0.4, 0.4, { size: 18, bold: true });
  const bx = MX + 8.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Reading the graph', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['At **A** the rate rises with light, so **light** is the limiting factor.', 'At **B** the line is flat: more light does nothing. **CO₂** (or temperature) is limiting.', 'Raising CO₂ gives a **higher** plateau.'], 17, 0.3);
  notes(s, 'HT: students should understand and use graphs that show the effect of two or more factors on the rate of photosynthesis, and explain which factor is limiting at each point. On the flat part of a light graph, the limiting factor is NOT light.');
}

D.hinge({
  title: 'Quick check',
  q: 'On a graph of rate against light intensity, the line has levelled off. What is the limiting factor now?',
  options: ['CO₂ concentration or temperature', 'Light intensity', 'The amount of oxygen', 'The amount of glucose'],
  correct: 0,
  notes: 'Answer A. B: if light were limiting, more light would increase the rate. C and D are products, not limiting factors.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: Required practical 6', { tag: 'RP6 light intensity' });
  // apparatus: lamp, ruler, beaker with pondweed and an upturned test tube
  const by = 4.6;
  rect(s, MX + 0.3, by - 0.6, 0.5, 1.6, '5A5A5A'); circle(s, MX + 1.1, by - 0.2, 0.7, 'F6D365', 'C9A227', 2);
  txt(s, 'lamp', MX + 0.2, by + 1.05, 1.0, 0.35, { size: 15, bold: true, align: 'center' });
  hline(s, MX + 1.6, by + 0.75, MX + 4.4, C.grey, 2);
  for (let i = 0; i <= 10; i++) vline(s, MX + 1.6 + i * 0.28, by + 0.65, by + 0.85, C.grey, 1);
  txt(s, 'distance d', MX + 2.2, by + 0.9, 1.6, 0.35, { size: 15, bold: true, color: C.grey });
  rect(s, MX + 4.5, by - 1.3, 2.4, 2.3, 'DCEBF5', C.accent);
  rect(s, MX + 5.35, by - 2.4, 0.7, 2.6, 'F4F9FD', C.grey);
  vline(s, MX + 5.7, by - 0.4, by + 0.8, LEAF, 4);
  [[-0.25, 0.4], [0.25, 0.2], [-0.2, -0.05], [0.2, -0.25]].forEach(([dx, dy]) => s.addShape(D.SH.ellipse, { x: MX + 5.7 + dx - 0.2, y: by + dy - 0.08, w: 0.4, h: 0.16, fill: { color: LEAF }, line: { color: '35582A', width: 1 } }));
  [[0, -0.9], [0.08, -1.3], [-0.05, -1.7]].forEach(([dx, dy]) => circle(s, MX + 5.7 + dx, by + dy, 0.12, C.white, C.accent, 1));
  txt(s, 'pondweed; count bubbles or collect the oxygen', MX + 3.9, by + 1.1, 3.5, 0.65, { size: 15, bold: true, align: 'center' });
  const bx = MX + 7.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.75, 'Method', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Place the lamp at a set distance; wait 5 minutes.', 'Count bubbles (or measure O₂ volume) in **1 minute**.', 'Repeat at 10, 20, 30, 40, 50 cm.'], 16, 0.08);
  headCard(s, bx, 4.3, bw, 2.55, 'Control variables', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 5.0, bw - 0.4, ['**Temperature**: water bath or a heat shield.', '**CO₂**: add sodium hydrogencarbonate.', '**Same piece** of pondweed.'], 16, 0.08);
  notes(s, 'Independent variable: light intensity (distance). Dependent: rate (bubbles or volume of oxygen per minute). Measuring gas volume with a gas syringe is more accurate than counting bubbles, which vary in size. The lamp heats the water, which is why temperature must be controlled. Rate = volume ÷ time, e.g. 12 cm³ in 5 min = 2.4 cm³/min.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: the inverse square law', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.1, C.soft, C.line);
  math(s, MX + 0.3, 1.95, ['light intensity  ∝  ', F(1, 'distance²')], { size: 26, bold: true });
  txt(s, 'Double d → intensity ÷ 4.   Treble d → ÷ 9.', MX + 6.2, 1.4, W - 2 * MX - 6.4, 1.1, { size: 20, valign: 'middle' });
  const head = ['Distance (cm)', '10', '20', '30', '40'];
  const row = ['Relative light intensity', '100', '25', '11.1', '6.25'];
  const cw0 = 3.6, cw = (W - 2 * MX - cw0) / 4;
  [head, row].forEach((r, i) => r.forEach((c, j) => {
    const x = j === 0 ? MX : MX + cw0 + (j - 1) * cw, w = j === 0 ? cw0 : cw, y = 2.8 + i * 0.75;
    rect(s, x, y, w, 0.75, i === 0 ? C.maroon : C.white, i === 0 ? C.maroon : C.line);
    txt(s, c, x + 0.15, y, w - 0.3, 0.75, { size: 19, bold: i === 0 || j === 0, color: i === 0 ? C.white : C.ink, align: j === 0 ? 'left' : 'center', valign: 'middle' });
  }));
  txt(s, 'Relative intensity = 10 000 ÷ d²', MX, 4.4, 6, 0.4, { size: 15, color: C.grey });
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.orangeSoft, 'F3D9B5');
  txt(s, '**Worked example:** a lamp gives 400 units of light at 10 cm. It is moved to 20 cm. The distance has **doubled**, so the intensity is **400 ÷ 4 = 100 units**.', MX + 0.3, 5.0, W - 2 * MX - 0.6, 1.85, { size: 20, valign: 'middle' });
  notes(s, 'HT 4.4.1.2: "Students should understand and use inverse proportion – the inverse square law and light intensity in the context of factors affecting photosynthesis." Method: find the scale factor of the distance, square it, divide.');
}

D.myTurnYourTurn({
  title: 'Inverse square law', tag: 'HT  Maths skill', stepSize: 21, labelW: 1.75, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'A lamp gives 400 units at 10 cm. Find the intensity at each distance.',
    steps: [
      { label: '20 cm', text: '**× 2 → 400 ÷ 4 = 100**' },
      { label: '40 cm', text: '**× 4 → 400 ÷ 16 = 25**' },
      { label: '5 cm', text: '**÷ 2 → 400 × 4 = 1600**' },
    ],
  },
  yours: {
    q: 'A lamp gives 900 units at 10 cm. Find the intensity at each distance.',
    steps: [
      { label: '30 cm', text: '**× 3 → 900 ÷ 9 = 100**' },
      { label: '20 cm', text: '**× 2 → 900 ÷ 4 = 225**' },
      { label: '15 cm', text: '**× 1.5 → 900 ÷ 2.25 = 400**' },
    ],
  },
  notes: 'Distance scale factor, square it, then divide (further away) or multiply (closer). 1.5² = 2.25.',
});

{
  const s = frame('Greenhouses: is it worth it?', HT);
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 3.0;
  [['Heaters', 'Raise the **temperature** towards the optimum. Paraffin heaters also make **CO₂**.'], ['Lamps', 'Increase **light intensity** and light the plants at **night**.'], ['CO₂ burners', 'Raise the **CO₂ concentration** inside the greenhouse.']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 19 });
  });
  rect(s, MX, 4.65, W - 2 * MX, 2.2, C.greenSoft, C.green);
  txt(s, 'The farmer\'s decision', MX + 0.3, 4.75, 6, 0.45, { size: 20, bold: true, color: C.green });
  bullets(s, MX + 0.3, 5.3, W - 2 * MX - 0.6, ['Only increasing the **limiting factor** raises the rate. Paying for anything else is wasted money.', 'The **extra crop** must be worth more than the **cost** of the heating, lighting or CO₂.'], 18, 0.12);
  notes(s, 'HT 4.4.1.2: "use data to relate limiting factors to the cost effectiveness of adding heat, light or carbon dioxide to greenhouses." Typical question: data on yield and cost; students compare the extra income with the extra cost and conclude.');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Write the word equation for photosynthesis.', 'CO₂ + water → glucose + oxygen'], ['Where in a cell does photosynthesis happen?', 'In the chloroplasts'], ['Give three uses of glucose in a plant.', 'Respiration, starch, cellulose (or fats, proteins)'], ['Why is photosynthesis endothermic?', 'It takes in energy (light)'],
    ['Pondweed gives 32 bubbles in 4 minutes. Calculate the rate.', '8 bubbles per minute'], ['Why does the rate fall at high temperatures?', 'Enzymes are denatured'],
    ['HT  A lamp moves from 10 cm to 30 cm. How does the light intensity change?', 'It falls to 1/9 of the value'], ['HT  Adding CO₂ to a greenhouse does not raise the rate. Suggest why.', 'Light or temperature is the limiting factor'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) carbon dioxide + water → glucose + oxygen (light above the arrow)  2) chloroplasts  3) any three: respiration, starch for storage, fats/oils for storage, cellulose for cell walls, amino acids for proteins  4) energy is transferred from the surroundings by light  5) 32 ÷ 4 = 8 per minute  6) enzymes denature  7) distance × 3, so intensity ÷ 9  8) another factor is limiting, e.g. light intensity or temperature.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.3,
  stem: 'A student investigated the effect of light intensity on the rate of photosynthesis in pondweed.',
  parts: [
    { l: 'a', q: 'Complete the word equation:  carbon dioxide + ______ → glucose + ______', m: 2, lines: 0 },
    { l: 'b', q: 'Describe how the student could carry out the investigation. Include how they would control other variables.', m: 4, lines: 2 },
    { l: 'c', q: 'HT  The student moved the lamp from 15 cm to 30 cm. How does the light intensity change? Explain your answer.', m: 2, lines: 1 },
    { l: 'd', q: 'At high light intensities the rate stopped increasing. Explain why.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'water; oxygen', '2', ''],
    ['(b)', 'lamp at different distances; count bubbles / measure O₂ volume in a set time; control temperature (water bath / shield); control CO₂ (sodium hydrogencarbonate)', '4', 'allow: same pondweed; repeat'],
    ['(c)', 'distance doubled; intensity falls to a quarter', '2', ''],
    ['(d)', 'another factor is limiting; e.g. CO₂ concentration or temperature', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Name the four factors that affect the rate of photosynthesis.', 'Why is glucose stored as starch?', 'In RP6, what is sodium hydrogencarbonate for?', 'HT  The lamp distance is halved. What happens to the light intensity?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) light intensity, CO₂ concentration, temperature, amount of chlorophyll  2) starch is insoluble, so it does not affect osmosis  3) it supplies CO₂, so CO₂ is not limiting  4) it is multiplied by 4. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Write the balanced symbol equation for photosynthesis.',
    'Explain why a plant needs nitrate ions as well as glucose.',
    'Sketch a graph of rate against temperature and explain its shape.',
    'Explain why counting bubbles is less accurate than using a gas syringe.',
    'Pondweed makes 45 cm³ of oxygen in 3 minutes. Calculate the rate.',
    'HT  A lamp moves from 20 cm to 50 cm. By what factor does the intensity change?',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂  2) to make amino acids, then proteins  3) rises to an optimum, then falls quickly as enzymes denature  4) bubbles are different sizes; some are missed  5) 45 ÷ 3 = 15 cm³/min  6) (20 ÷ 50)² = 0.16: about one sixth.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.4.1_Photosynthesis.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
