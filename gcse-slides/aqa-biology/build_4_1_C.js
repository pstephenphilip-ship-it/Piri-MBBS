// build_4_1_C.js — AQA GCSE Biology (8461) 4.1 Cell biology, lesson 3 of 3:
// 4.1.3.1 Diffusion (surface area to volume ratio, exchange surfaces), 4.1.3.2 Osmosis (+ Required practical 3),
// 4.1.3.3 Active transport.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_1_C.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.1.3', title: 'Transport in cells',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const F = (n, d) => ({ n, d });
const pct = (a, b) => Math.round((b - a) / a * 1000) / 10;
const sav = n => (6 * n * n) / (n ** 3);
const RP3 = [[0, 2.00, 2.24], [0.2, 2.00, 2.10], [0.4, 2.00, 1.96], [0.6, 2.00, 1.84], [0.8, 2.00, 1.74], [1.0, 2.00, 1.68]];

// ======================= numbers (all checked) =======================
calc('sav1', sav(1), 6); calc('sav2', sav(2), 3); calc('sav3', sav(3), 2); calc('sav4', sav(4), 1.5); calc('sav5', sav(5), 1.2);
const PCT = [12, 5, -2, -8, -13, -16];
RP3.forEach(([c, a, b], i) => calc('rp3 ' + c, pct(a, b), PCT[i]));
calc('zero', Math.round((0.2 + 0.2 * 5 / 7) * 100) / 100, 0.34);
calc('MT1', pct(2.50, 2.80), 12); calc('MT2', pct(3.20, 2.88), -10); calc('YT1', pct(1.60, 1.84), 15); calc('YT2', pct(2.40, 2.04), -15);
calc('P8', pct(2.00, 1.70), -15); calc('exam', pct(3.00, 2.55), -15); calc('HW', pct(4.00, 4.60), 15);

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
function twoCards(s, top, h, a, b, ca, cb, fa, fb, size = 18) {
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, top, cw, h, a[0], ca, fa); bullets(s, MX + 0.25, top + 0.8, cw - 0.5, a[1], size, 0.18);
  headCard(s, MX + cw + gap, top, cw, h, b[0], cb, fb); bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, b[1], size, 0.18);
}
// box of particles split by a membrane; left count, right count
function membraneBox(s, x, y, w, h, nl, nr, col, wall = 'dash') {
  rect(s, x, y, w, h, C.white, C.grey, { lw: 1.5 });
  s.addShape(D.SH.line, { x: x + w / 2, y, w: 0.001, h, line: { color: C.ink, width: 2.5, dashType: wall } });
  const dots = (x0, n) => { for (let i = 0; i < n; i++) circle(s, x0 + 0.35 + (i % 4) * ((w / 2 - 0.75) / 3), y + 0.3 + Math.floor(i / 4) * ((h - 0.6) / Math.max(1, Math.ceil(n / 4) - 1 || 1)), 0.2, col); };
  dots(x, nl); dots(x + w / 2, nr);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Diffusion and surface area to volume ratio, exchange surfaces, osmosis and the potato practical, and active transport',
  bullets: ['Part 1: diffusion (4.1.3.1)', 'Part 2: surface area to volume ratio and exchange surfaces', 'Part 3: osmosis and Required practical 3 (4.1.3.2)', 'Part 4: active transport (4.1.3.3)'],
  notes: 'AQA 8461 GCSE Biology 4.1, lesson 3 of 3: this completes topic 4.1. About two hours.',
});

D.objectives({
  tag: '4.1.3',
  items: [
    'Explain **diffusion** and the factors that affect its **rate**.',
    'Calculate **surface area to volume ratios** and explain **exchange surfaces**.',
    'Explain **osmosis**; carry out **RP3** and calculate **percentage change in mass**.',
    'Explain **active transport** and compare the three processes.',
  ],
  keywords: ['diffusion', 'concentration gradient', 'osmosis', 'partially permeable', 'active transport', 'SA : V'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What does the cell membrane do?', 'Where does aerobic respiration happen?', 'Find the surface area of a 2 cm cube.', 'A mass goes from 4 g to 5 g. Percentage increase?'],
  answers: ['Controls what enters and leaves', 'Mitochondria', '24 cm²', '25%'],
  notes: 'Retrieval from lesson 1, plus the maths for today.',
});

D.vocab({
  title: 'Key words', tag: '4.1.3',
  items: [
    { term: 'Diffusion', def: 'The **net movement** of particles from a **higher** to a **lower** concentration. No energy needed.' },
    { term: 'Osmosis', def: 'The diffusion of **water** from a **dilute** to a more **concentrated** solution through a **partially permeable membrane**.' },
    { term: 'Active transport', def: 'Moves substances from a **lower** to a **higher** concentration (**against** the gradient), using **energy** from respiration.' },
    { term: 'Concentration gradient', def: 'The **difference** in concentration between two areas.' },
  ],
  notes: 'Net movement: particles move both ways, but more move from high to low.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: diffusion', { tag: '4.1.3.1' });
  membraneBox(s, MX + 0.3, 1.5, 5.4, 2.4, 12, 3, C.accent);
  arrow(s, MX + 2.3, 4.15, MX + 3.7, 4.15, C.accent, 3);
  txt(s, 'high concentration → low concentration', MX + 0.3, 4.35, 5.4, 0.4, { size: 15, bold: true, color: C.accent, align: 'center' });
  const bx = MX + 6.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.4, 'Examples in living things', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Oxygen** and **carbon dioxide** in gas exchange (lungs, leaves).', '**Urea** from cells into the blood plasma, to go to the kidney.'], 17, 0.2);
  headCard(s, MX, 5.0, W - 2 * MX, 1.85, 'Factors that increase the rate', C.green, C.greenSoft);
  txt(s, 'A **bigger concentration gradient**   •   a **higher temperature**   •   a **larger surface area** of membrane', MX + 0.3, 5.7, W - 2 * MX - 0.6, 1.0, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.1.3.1: "Diffusion is the spreading out of the particles of any substance in solution, or particles of a gas, resulting in a net movement from an area of higher concentration to an area of lower concentration." Higher temperature: particles have more kinetic energy.');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: surface area to volume ratio', { tag: '4.1.3.1' });
  const head = ['Cube side', 'Surface area', 'Volume', 'SA : V'];
  const rows = [1, 2, 3].map(n => [n + ' cm', 6 * n * n + ' cm²', n ** 3 + ' cm³', sav(n) + ' : 1']);
  const cw = 2.0;
  head.forEach((t, j) => { rect(s, MX + j * cw, 1.45, cw, 0.6, C.maroon); txt(s, t, MX + j * cw, 1.45, cw, 0.6, { size: 16, bold: true, color: C.white, align: 'center', valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const y = 2.05 + i * 0.7; rect(s, MX + j * cw, y, cw, 0.7, i % 2 ? C.white : C.soft, C.line); txt(s, t, MX + j * cw, y, cw, 0.7, { size: 18, bold: j === 3, color: j === 3 ? C.green : C.ink, align: 'center', valign: 'middle' }); }));
  [[1, 0.45], [2, 0.8], [3, 1.15]].forEach(([n, sz], i) => { const x = MX + 8.6 + i * 1.45 - sz / 2, y = 3.1 - sz; rect(s, x, y, sz, sz, 'DDEBF7', C.accent, { lw: 2 }); txt(s, n + ' cm', x - 0.2, 3.15, sz + 0.4, 0.35, { size: 13, align: 'center' }); });
  rect(s, MX, 4.35, W - 2 * MX, 2.5, C.orangeSoft, 'F3D9B5');
  bullets(s, MX + 0.3, 4.5, W - 2 * MX - 0.6, ['As an organism gets **bigger**, its SA : V ratio gets **smaller**.', '**Single-celled** organisms have a **large** SA : V: diffusion across the membrane is enough.', 'Large multicellular organisms need **exchange surfaces** and **transport systems**.'], 18, 0.12);
  notes(s, 'Spec 4.1.3.1: "A single-celled organism has a relatively large surface area to volume ratio. This allows sufficient transport of molecules into and out of the cell to meet the needs of the organism." Students should be able to calculate and compare SA : V ratios. Simplify to x : 1.');
}

{
  const s = frame('Adaptations of exchange surfaces', { tag: '4.1.3.1' });
  const gap = 0.3, cw = (W - 2 * MX - 3 * gap) / 4, top = 1.4, h = 2.55;
  [['Large surface area', 'e.g. millions of alveoli; villi'], ['Thin membrane', 'short diffusion path'], ['Good blood supply', 'keeps the gradient steep (animals)'], ['Ventilation', 'keeps the gradient steep for gases']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 });
  });
  const ex = [['Small intestine', 'villi absorb digested food into the blood'], ['Lungs', 'alveoli: oxygen into the blood, CO₂ out'], ['Fish gills', 'many thin filaments: gas exchange with water'], ['Plant roots and leaves', 'root hairs absorb water; leaves exchange gases']];
  ex.forEach(([a, b], i) => {
    const y = 4.2 + i * 0.66;
    rect(s, MX, y, W - 2 * MX, 0.58, i % 2 ? C.white : C.greenSoft, C.line);
    txt(s, a, MX + 0.25, y, 3.6, 0.58, { size: 17, bold: true, color: C.green, valign: 'middle' });
    txt(s, b, MX + 3.9, y, W - 2 * MX - 4.1, 0.58, { size: 17, valign: 'middle' });
  });
  notes(s, 'Spec 4.1.3.1: "Exchanging substances is made more effective by: having a large surface area; a membrane that is thin, to provide a short diffusion path; (in animals) having an efficient blood supply; (in animals, for gaseous exchange) being ventilated." Students should explain how the small intestine and lungs in mammals, gills in fish, and roots and leaves in plants are adapted.');
}

D.myTurnYourTurn({
  title: 'SA : V and diffusion', tag: 'Maths skill', stepSize: 20, labelW: 2.6, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'A cube has sides of 4 cm. Find its SA : V ratio.',
    steps: [
      { label: 'Surface area', text: '**6 × 4² = 96 cm²**' },
      { label: 'Volume', text: '**4³ = 64 cm³**' },
      { label: 'Ratio', text: '**96 : 64 = 1.5 : 1**' },
    ],
  },
  yours: {
    q: 'A cube has sides of 5 cm. Find its SA : V ratio.',
    steps: [
      { label: 'Surface area', text: '**6 × 5² = 150 cm²**' },
      { label: 'Volume', text: '**5³ = 125 cm³**' },
      { label: 'Ratio', text: '**150 : 125 = 1.2 : 1**' },
    ],
  },
  notes: 'Divide both sides by the volume to get x : 1. The ratio falls as the cube gets bigger.',
});

D.hinge({
  title: 'Quick check',
  q: 'Why do large organisms need exchange surfaces?',
  options: ['Their SA : V ratio is small', 'Their SA : V ratio is large', 'Diffusion does not happen in them', 'They have no cell membranes'],
  correct: 0,
  notes: 'Answer A: the outer surface is too small for their volume, so diffusion alone is too slow.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: osmosis', { tag: '4.1.3.2' });
  const x = MX + 0.3, y = 1.5, w = 5.4, h = 2.4;
  rect(s, x, y, w, h, 'EAF3FB', C.grey, { lw: 1.5 });
  s.addShape(D.SH.line, { x: x + w / 2, y, w: 0.001, h, line: { color: C.ink, width: 2.5, dashType: 'dash' } });
  for (let i = 0; i < 4; i++) circle(s, x + w / 2 + 0.4 + (i % 2) * 1.2, y + 0.6 + Math.floor(i / 2) * 1.2, 0.42, C.orange);
  for (let i = 0; i < 10; i++) circle(s, x + 0.3 + (i % 4) * 0.6, y + 0.3 + Math.floor(i / 4) * 0.75, 0.16, C.accent);
  for (let i = 0; i < 3; i++) circle(s, x + w / 2 + 1.0 + (i % 2) * 0.6, y + 1.2 + Math.floor(i / 2) * 0.75, 0.16, C.accent);
  arrow(s, x + 1.8, y + h + 0.25, x + 3.6, y + h + 0.25, C.accent, 3);
  txt(s, 'water: dilute → concentrated', x, y + h + 0.45, w, 0.4, { size: 15, bold: true, color: C.accent, align: 'center' });
  txt(s, 'blue = water   orange = sugar (too big to cross)', x, y + h + 0.85, w, 0.35, { size: 13, color: C.grey, align: 'center' });
  const bx = MX + 6.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'In cells', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['Solution **more dilute** than the cell: water moves **in**. Animal cells may **burst**; plant cells become **turgid** (firm).', 'Solution **more concentrated**: water moves **out**. Cells **shrink**; plant cells become **flaccid**.', '**Same** concentration: no **net** movement.'], 17, 0.25);
  notes(s, 'Spec 4.1.3.2: "Water may move across cell membranes via osmosis. Osmosis is the diffusion of water from a dilute solution to a concentrated solution through a partially permeable membrane." The cell wall stops plant cells bursting. Plasmolysis (membrane pulls away from the wall) is useful extension.');
}

{
  const s = frame('Required practical 3: osmosis in potato', { tag: 'RP3' });
  headCard(s, MX, 1.4, 5.0, 5.45, 'Method', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 4.6, ['Cut equal potato cylinders; blot and **weigh** each.', 'Put each in a different **sugar concentration** (0 to 1.0 mol/dm³).', 'Leave for **24 hours**.', 'Blot dry and **reweigh**.', 'Calculate **% change in mass**.'], 15, 0.1);
  const tx = MX + 5.4, tw = W - MX - tx, cws = [2.3, 1.6, 1.6, tw - 5.5];
  ['Sugar (mol/dm³)', 'Start (g)', 'End (g)', '% change'].forEach((t, j) => { const x = tx + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 1.4, cws[j], 0.6, C.maroon); txt(s, t, x, 1.4, cws[j], 0.6, { size: 14, bold: true, color: C.white, align: 'center', valign: 'middle' }); });
  RP3.forEach(([c, a, b], i) => [c.toFixed(1), a.toFixed(2), b.toFixed(2), (PCT[i] > 0 ? '+' : '') + PCT[i]].forEach((v, j) => { const x = tx + cws.slice(0, j).reduce((p, q) => p + q, 0), y = 2.0 + i * 0.55; rect(s, x, y, cws[j], 0.55, i % 2 ? C.white : C.soft, C.line); txt(s, v.replace('-', '−'), x, y, cws[j], 0.55, { size: 16, bold: j === 3, color: j === 3 ? (PCT[i] > 0 ? C.green : C.red) : C.ink, align: 'center', valign: 'middle' }); }));
  rect(s, tx, 5.5, tw, 1.35, C.orangeSoft, 'F3D9B5');
  D.math(s, tx + 0.2, 6.18, ['% change = ', F('end − start', 'start'), ' × 100'], { size: 20, bold: true });
  notes(s, 'RP3: "investigate the effect of a range of concentrations of salt or sugar solutions on the mass of plant tissue." Sample data, not real results. Use % change (not mass change) because the cylinders may not start at exactly the same mass. Blotting removes surface water, so it is not weighed.');
}

{
  const s = frame('RP3: reading the graph', { tag: 'RP3 data' });
  const G = graph(D, s, MX + 1.0, 1.55, 7.0, 4.9, [0, 1], [-20, 15], { gridX: 0.1, gridY: 5, labX: 0.2, labY: 5, xTitle: 'Sugar concentration (mol/dm³)', yTitle: '% change in mass' });
  for (let i = 0; i < RP3.length - 1; i++) G.seg(RP3[i][0], PCT[i], RP3[i + 1][0], PCT[i + 1], C.maroon, 2.5);
  RP3.forEach(([c], i) => G.pt(c, PCT[i], C.maroon));
  G.pt(0.34, 0, C.green);
  txt(s, '0.34', G.px(0.34) - 0.7, G.py(0) + 0.08, 0.6, 0.3, { size: 13, bold: true, color: C.green, align: 'center' });
  const bx = MX + 8.5, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Conclusions', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['**Above** the axis: mass gained; water moved **in**.', '**Below**: mass lost; water moved **out**.', 'Where the line **crosses 0**: the potato cells have the **same** concentration, about **0.34 mol/dm³**.'], 16, 0.25);
  notes(s, 'Sample data. The crossing point is found by drawing a line of best fit (here joined points) and reading where % change = 0. Exam tasks: plot, read off, and explain using osmosis.');
}

D.myTurnYourTurn({
  title: 'Percentage change in mass', tag: 'Maths skill', stepSize: 20, labelW: 2.6, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: true,
  mine: {
    q: 'Find the % change in mass:',
    steps: [
      { label: '2.50 g → 2.80 g', text: '**+12%**' },
      { label: '3.20 g → 2.88 g', text: '**−10%**' },
    ],
  },
  yours: {
    q: 'Find the % change in mass:',
    steps: [
      { label: '1.60 g → 1.84 g', text: '**+15%**' },
      { label: '2.40 g → 2.04 g', text: '**−15%**' },
    ],
  },
  notes: 'Mine: 0.30 ÷ 2.50 × 100 = 12; −0.32 ÷ 3.20 × 100 = −10. Yours: 0.24 ÷ 1.60 = 0.15; −0.36 ÷ 2.40 = −0.15. Always divide by the START mass.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: active transport', { tag: '4.1.3.3' });
  membraneBox(s, MX + 0.3, 1.5, 5.4, 2.4, 3, 12, C.green, 'solid');
  arrow(s, MX + 2.3, 4.15, MX + 3.7, 4.15, C.red, 3);
  txt(s, 'soil (low) → root hair cell (high): needs energy', MX + 0.1, 4.35, 5.8, 0.4, { size: 15, bold: true, color: C.red, align: 'center' });
  const bx = MX + 6.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.4, 'Examples', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Root hairs** absorb **mineral ions** from very dilute soil water.', '**Sugar** (glucose) is absorbed from the gut into the **blood**, even when the blood concentration is higher.'], 17, 0.2);
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Active transport moves substances **against** the concentration gradient, so it needs **energy from respiration**. Root hair cells have many **mitochondria**.', MX + 0.3, 5.0, W - 2 * MX - 0.6, 1.85, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.1.3.3: "Active transport moves substances from a more dilute solution to a more concentrated solution (against a concentration gradient). This requires energy from respiration. Active transport allows mineral ions to be absorbed into plant root hairs from very dilute solutions in the soil. Plants require ions for healthy growth. It also allows sugar molecules to be absorbed from lower concentrations in the gut into the blood which has a higher sugar concentration."');
}

{
  const s = frame('Comparing the three processes', { tag: '4.1.3' });
  const head = ['', 'Diffusion', 'Osmosis', 'Active transport'];
  const rows = [['What moves?', 'any particles', 'water only', 'particles (e.g. ions)'], ['Direction', 'high → low', 'dilute → concentrated solution', 'low → high (against)'], ['Energy?', 'no', 'no', 'yes: respiration'], ['Membrane?', 'not needed', 'partially permeable', 'yes (carrier proteins)']];
  const c0 = 2.6, cw = (W - 2 * MX - c0) / 3;
  head.forEach((t, j) => { const x = j ? MX + c0 + (j - 1) * cw : MX, w = j ? cw : c0; rect(s, x, 1.5, w, 0.65, [C.grey, C.accent, C.blue, C.red][j]); txt(s, t, x + 0.15, 1.5, w - 0.3, 0.65, { size: 18, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = j ? MX + c0 + (j - 1) * cw : MX, w = j ? cw : c0, y = 2.15 + i * 1.05; rect(s, x, y, w, 1.05, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.15, y, w - 0.3, 1.05, { size: 18, bold: j === 0, valign: 'middle' }); }));
  rect(s, MX, 6.45, W - 2 * MX, 0.45, C.orangeSoft, 'F3D9B5');
  txt(s, 'Carrier proteins are not on the spec, but are useful detail.', MX + 0.3, 6.45, W - 2 * MX - 0.6, 0.45, { size: 14, color: C.grey, valign: 'middle' });
  notes(s, 'A classic 4–6 mark comparison question. Osmosis is a special case of diffusion (of water).');
}

D.hinge({
  title: 'Quick check',
  q: 'Which process needs energy from respiration?',
  options: ['Active transport', 'Diffusion', 'Osmosis', 'All three'],
  correct: 0,
  notes: 'Answer A. Diffusion and osmosis are passive.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Give three factors that affect the rate of diffusion.', 'Gradient, temperature, surface area'], ['Define osmosis.', 'Water diffuses dilute → concentrated, across a partially permeable membrane'], ['Why do root hair cells have many mitochondria?', 'Energy for active transport'], ['Give two adaptations of exchange surfaces.', 'Large surface area; thin membrane'],
    ['Why does a plant cell not burst in pure water?', 'The cell wall'], ['Why use % change in mass in RP3?', 'Cylinders start at different masses'],
    ['Find the SA : V ratio of a 2 cm cube.', '3 : 1'], ['A cylinder goes from 2.00 g to 1.70 g. % change?', '−15%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 22, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) concentration gradient, temperature, surface area of membrane  2) diffusion of water from a dilute to a concentrated solution through a partially permeable membrane  3) to release energy for active transport of mineral ions  4) large surface area, thin membrane, good blood supply, ventilation  5) the cell wall resists the pressure  6) to compare fairly when starting masses differ  7) 24 : 8 = 3 : 1  8) −0.30 ÷ 2.00 × 100 = −15%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Explain why a single-celled organism does not need a transport system.', m: 2, lines: 1 },
    { l: 'b', q: 'Explain how the alveoli are adapted for gas exchange.', m: 3, lines: 1 },
    { l: 'c', q: 'In RP3, a potato cylinder changed from 3.00 g to 2.55 g. Calculate the % change, and explain the change in mass.', m: 3, lines: 1 },
    { l: 'd', q: 'Explain why root hair cells use active transport to absorb mineral ions.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'large SA : V ratio; diffusion across the membrane meets its needs', '2', ''],
    ['(b)', 'large surface area (many alveoli); thin walls / short diffusion path; good blood supply / ventilation keeps gradient steep', '3', ''],
    ['(c)', '−0.45 ÷ 3.00 × 100 = −15%; water left by osmosis; solution more concentrated than the cells', '3', ''],
    ['(d)', 'ions are at a lower concentration in the soil than in the cell; so they must move against the gradient, using energy', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What happens to the SA : V ratio as an organism gets bigger?', 'What is a partially permeable membrane?', 'What does "turgid" mean?', 'Give one example of active transport in humans.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) it gets smaller  2) lets small molecules like water through but not larger ones like sugar  3) a plant cell swollen and firm with water  4) glucose absorbed from the gut into the blood. Revisit the objectives: topic 4.1 is complete.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain how the small intestine is adapted for absorption.',
    'Find the SA : V ratios of 1 cm, 3 cm and 6 cm cubes. What is the pattern?',
    'Describe what happens to an animal cell and a plant cell in pure water.',
    'Write a full method for RP3, with variables.',
    'A cylinder goes from 4.00 g to 4.60 g. Find the % change.',
    'Compare diffusion, osmosis and active transport.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) villi: large surface area; thin walls; good blood supply  2) 6 : 1, 2 : 1, 1 : 1; ratio falls as size increases  3) animal: swells and may burst; plant: turgid, wall stops bursting  4) see the RP3 slide; IV concentration, DV % change in mass; control size, time, temperature  5) +15%  6) see the comparison table.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.1_C_TransportInCells.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
