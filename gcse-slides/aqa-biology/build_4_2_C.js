// build_4_2_C.js — AQA GCSE Biology (8461) 4.2 Organisation, lesson 3 of 3:
// 4.2.2.5 Health issues, 4.2.2.6 The effect of lifestyle on non-communicable diseases, 4.2.2.7 Cancer,
// 4.2.3.1 Plant tissues, 4.2.3.2 Plant organ system (transpiration, translocation, stomata).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_2_C.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.2.2.5–4.2.3', title: 'Health, cancer and plant tissues',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const LEAF = '3E8E4F';

// ======================= numbers (all checked) =======================
calc('pot', 30 / 5, 6); calc('stom', Math.round(24 / 0.1), 240);
calc('MT pot', 45 / 5, 9); calc('YT pot', 42 / 6, 7); calc('MT st', Math.round(18 / 0.08), 225); calc('YT st', Math.round(30 / 0.12), 250);
calc('P8', 60 / 10, 6); calc('exam', 48 / 8, 6); calc('HW', Math.round(35 / 0.14), 250);

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
function rowsTable(s, y, rows, c1 = 3.6, size = 17, rh = 0.72) {
  rows.forEach(([a, b], i) => {
    const yy = y + i * (rh + 0.06);
    rect(s, MX, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, MX + 0.25, yy, c1, rh, { size, bold: true, color: C.maroon, valign: 'middle' });
    txt(s, b, MX + c1 + 0.4, yy, W - 2 * MX - c1 - 0.6, rh, { size, valign: 'middle' });
  });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Health and disease, risk factors, cancer, plant tissues, transpiration, translocation and stomata',
  bullets: ['Part 1: health and risk factors (4.2.2.5, 4.2.2.6)', 'Part 2: cancer (4.2.2.7)', 'Part 3: plant tissues and organs (4.2.3.1)', 'Part 4: transpiration and translocation (4.2.3.2)'],
  notes: 'AQA 8461 GCSE Biology 4.2, lesson 3 of 3: this completes topic 4.2 and the separate Biology course. About two hours.',
});

D.objectives({
  tag: '4.2.2.5–4.2.3',
  items: [
    'Describe what affects **health** and how diseases **interact**.',
    'Explain **risk factors**, and tell **correlation** from **cause**; describe **cancer**.',
    'Relate **plant tissues** (including xylem, phloem, stomata) to their functions.',
    'Explain **transpiration** and **translocation**, and calculate **rates** and **stomatal density**.',
  ],
  keywords: ['risk factor', 'correlation', 'benign', 'malignant', 'transpiration', 'translocation'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is a communicable disease?', 'Name a plant cell adapted to absorb water.', 'What does phloem carry?', 'Work out 24 ÷ 0.1.'],
  answers: ['One that can spread between people', 'Root hair cell', 'Dissolved sugars', '240'],
  notes: 'Retrieval from 4.3.1, 4.1.1.3, plus the maths for stomatal density.',
});

D.vocab({
  title: 'Key words', tag: '4.2.2, 4.2.3',
  items: [
    { term: 'Health', def: 'A state of **physical and mental well-being**, not just the absence of disease.' },
    { term: 'Risk factor', def: 'Something linked to an **increased rate** of a disease, e.g. smoking, obesity.' },
    { term: 'Transpiration', def: 'Loss of **water vapour** from the leaves, which pulls water up the **xylem**.' },
    { term: 'Translocation', def: 'Movement of dissolved **sugars** through the **phloem**.' },
  ],
  notes: 'Non-communicable diseases cannot be passed on, e.g. coronary heart disease, type 2 diabetes, most cancers.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: health and disease', { tag: '4.2.2.5' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'Diseases, **diet**, **stress** and **life situations** all affect physical and mental health.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 19, valign: 'middle' });
  txt(s, 'Diseases can interact:', MX, 2.6, 6, 0.45, { size: 19, bold: true, color: C.maroon });
  rowsTable(s, 3.1, [['Immune system defects', 'more likely to catch **communicable** diseases'], ['Viruses in cells', 'can trigger some **cancers** (e.g. HPV and cervical cancer)'], ['Immune reactions', 'to a pathogen can trigger **allergies** (rashes, asthma)'], ['Severe physical illness', 'can lead to **depression** and other mental illness']], 4.2, 17, 0.75);
  notes(s, 'Spec 4.2.2.5: "Health is the state of physical and mental well-being. Diseases, both communicable and non-communicable, are major causes of ill health. Other factors including diet, stress and life situations may have a profound effect on both physical and mental health." Students should be able to describe the relationship between health and disease and the interactions between different types of disease. Students should also be able to translate disease incidence information between graphical and numerical forms.');
}

{
  const s = frame('Risk factors', { tag: '4.2.2.6' });
  const gap = 0.3, cw = (W - 2 * MX - 3 * gap) / 4, top = 1.4, h = 2.6;
  [['Smoking', 'lung disease, lung cancer; heart disease'], ['Diet, exercise, obesity', 'type 2 diabetes; heart disease'], ['Alcohol', 'liver disease; brain function; unborn babies'], ['Carcinogens', 'e.g. ionising radiation: cancer']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.red, 'FBEDEB'); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 });
  });
  twoCards(s, 4.2, 2.65, ['Correlation is not cause', ['A link (correlation) does not prove one thing **causes** the other.', 'A **mechanism** must be found, e.g. how tar damages lung cells.']], ['Costs of disease', ['**Human**: suffering, shorter life.', '**Economic**: NHS treatment costs; people unable to work.']], C.maroon, C.orange, C.soft, C.orangeSoft, 16);
  notes(s, 'Spec 4.2.2.6: "Risk factors are linked to an increased rate of a disease. They can be: aspects of a person\'s lifestyle; substances in the person\'s body or environment. A causal mechanism has been proven for some risk factors, but not in others." Many diseases are caused by the interaction of a number of factors. Effects can be at local, national and global levels.');
}

{
  const s = frame('Reading risk data', { tag: '4.2.2.6 data' });
  const G = graph(D, s, MX + 1.0, 1.75, 6.8, 4.5, [0, 40], [0, 10], { gridX: 5, gridY: 2, labX: 10, labY: 2, axesAtEdge: true, xTitle: 'Cigarettes smoked per day', yTitle: 'Relative risk of lung cancer' });
  G.curve(x => 1 + 0.22 * x, 0, 40, C.red, 3.5, 60);
  [[0, 1], [10, 3.2], [20, 5.4], [30, 7.6], [40, 9.8]].forEach(([x, y]) => G.pt(x, y, C.red));
  const bx = MX + 8.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'What it shows', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['A **positive correlation**: more cigarettes, higher risk.', 'With a known mechanism (tar is a **carcinogen**), we can say smoking **causes** lung cancer.', 'Large samples make data more **valid**.'], 16, 0.22);
  notes(s, 'Illustrative data, not real figures. Relative risk = how many times more likely compared with a non-smoker. Students should be able to discuss the human and financial cost of non-communicable diseases and interpret data in graphs and tables.');
}

D.hinge({
  title: 'Quick check',
  q: 'Data show that people who drink more coffee get more headaches. What can you conclude?',
  options: ['There is a correlation, but it may not be the cause', 'Coffee causes headaches', 'Headaches cause coffee drinking', 'There is no link'],
  correct: 0,
  notes: 'Answer A. Without a mechanism (and controlling other factors) a correlation does not prove cause.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: cancer', { tag: '4.2.2.7' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'Cancer is the result of changes in cells that lead to **uncontrolled growth and division** (mitosis), forming a **tumour**.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 19, valign: 'middle' });
  twoCards(s, 2.65, 2.9, ['Benign tumours', ['Growths of abnormal cells **contained in one area**, usually within a membrane.', 'Do **not invade** other parts of the body.']], ['Malignant tumours (cancer)', ['**Invade** neighbouring tissues.', 'Spread to other parts of the body in the **blood**, forming **secondary tumours**.']], C.green, C.red, C.greenSoft, 'FBEDEB', 17);
  rect(s, MX, 5.75, W - 2 * MX, 1.1, C.orangeSoft, 'F3D9B5');
  txt(s, 'Risk factors: **smoking**, **obesity**, **UV** exposure, viral infection; some **genetic** risk factors too.', MX + 0.3, 5.75, W - 2 * MX - 0.6, 1.1, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.2.2.7: "Benign tumours are growths of abnormal cells which are contained in one area, usually within a membrane. They do not invade other parts of the body. Malignant tumour cells are cancers. They invade neighbouring tissues and spread to different parts of the body in the blood where they form secondary tumours. Scientists have identified lifestyle risk factors for various types of cancer. There are also genetic risk factors for some cancers."');
}

D.hinge({
  title: 'Quick check',
  q: 'How do malignant tumours form secondary tumours?',
  options: ['Cells spread in the blood to other parts of the body', 'They stay in one place inside a membrane', 'They are caused by bacteria', 'They are passed between people'],
  correct: 0,
  notes: 'Answer A. B is benign. C and D are communicable disease ideas.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: plant tissues in a leaf', { tag: '4.2.3.1' });
  rowsTable(s, 1.45, [['Epidermal tissue', 'covers the leaf; upper epidermis is **transparent** with a **waxy cuticle**'], ['Palisade mesophyll', 'packed with **chloroplasts**: most photosynthesis'], ['Spongy mesophyll', '**air spaces** for gases to diffuse'], ['Xylem and phloem', 'transport **water** / **sugars**'], ['Guard cells and stomata', 'open and close to control **gas exchange** and **water loss**'], ['Meristem tissue', 'at shoot and root **tips**: new cells for growth']], 3.8, 17, 0.73);
  notes(s, 'Spec 4.2.3.1: "Plant tissues include: epidermal tissues; palisade mesophyll; spongy mesophyll; xylem and phloem; meristem tissue found at the growing tips of shoots and roots. The leaf is a plant organ." Students should be able to explain how the structure of plant tissues is related to their function. Leaf, stem and roots form the plant organ system for transport.');
}

{
  const s = frame('Xylem and phloem', { tag: '4.2.3.2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 3.6;
  headCard(s, MX, top, cw, h, 'Xylem: water', C.accent, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Hollow tubes of **dead cells**, strengthened by **lignin**.', 'Carry **water and mineral ions** from roots to leaves.', 'Flow is **one way**: up.'], 17, 0.18);
  headCard(s, MX + cw + gap, top, cw, h, 'Phloem: sugars', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['**Living** cells with pores in the end walls (**sieve plates**).', 'Carry **dissolved sugars** from leaves to the rest of the plant: **translocation**.', 'Flow is **both ways**.'], 17, 0.18);
  rect(s, MX, 5.25, W - 2 * MX, 1.6, C.orangeSoft, 'F3D9B5');
  txt(s, 'Sugars are moved for **immediate use** (respiration, growth) or **storage**, e.g. as starch in potatoes.', MX + 0.3, 5.25, W - 2 * MX - 0.6, 1.6, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.2.3.2: "Xylem tissue transports water and mineral ions from the roots to the stems and leaves. It is composed of hollow tubes strengthened by lignin adapted for the transport of water in the transpiration stream. Phloem tissue transports dissolved sugars from the leaves to the rest of the plant for immediate use or storage. The movement of food molecules through phloem tissue is called translocation. Phloem is composed of tubes of elongated cells. Cell sap can move from one phloem cell to the next through pores in the end walls."');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: transpiration', { tag: '4.2.3.2' });
  const st = [['Roots', 'water enters root hair cells by **osmosis**'], ['Xylem', 'water moves **up** the stem'], ['Leaf', 'water **evaporates** from cells into air spaces'], ['Stomata', 'water vapour **diffuses** out']];
  const gap = 0.4, bw = (W - 2 * MX - 3 * gap) / 4;
  st.forEach(([a, b], i) => { const x = MX + i * (bw + gap); headCard(s, x, 1.45, bw, 1.9, a, [C.orange, C.accent, LEAF, C.maroon][i], C.white); txt(s, b, x + 0.15, 2.1, bw - 0.3, 1.2, { size: 16, align: 'center' }); if (i < 3) arrow(s, x + bw + 0.04, 2.4, x + bw + gap - 0.04, 2.4); });
  headCard(s, MX, 3.6, W - 2 * MX, 3.25, 'Factors that increase the rate of transpiration', C.green, C.greenSoft);
  const f = [['Higher temperature', 'faster evaporation and diffusion'], ['Lower humidity', 'steeper gradient of water vapour'], ['More air movement', 'wind removes water vapour'], ['Higher light intensity', 'more stomata open']];
  f.forEach(([a, b], i) => { const x = MX + 0.3 + (i % 2) * ((W - 2 * MX) / 2), y = 4.35 + Math.floor(i / 2) * 1.15; txt(s, a, x, y, 5.5, 0.42, { size: 18, bold: true, color: C.green }); txt(s, b, x, y + 0.45, 5.5, 0.5, { size: 16 }); });
  notes(s, 'Spec 4.2.3.2: "The roots, stem and leaves form a plant organ system for transport of substances around the plant. Students should be able to explain the effect of changing temperature, humidity, air flow and light intensity on the rate of transpiration." The transpiration stream also carries mineral ions and keeps the plant cool.');
}

{
  const s = frame('Guard cells, stomata and the potometer', { tag: '4.2.3.2' });
  const gx = MX + 1.3, gy = 2.6;
  s.addShape(D.SH.ellipse, { x: gx - 0.8, y: gy - 0.8, w: 0.75, h: 1.6, fill: { color: '9ED38A' }, line: { color: '35582A', width: 2 } });
  s.addShape(D.SH.ellipse, { x: gx + 0.1, y: gy - 0.8, w: 0.75, h: 1.6, fill: { color: '9ED38A' }, line: { color: '35582A', width: 2 } });
  txt(s, 'open: guard cells turgid', gx - 1.0, gy + 0.95, 2.4, 0.35, { size: 13, bold: true, align: 'center' });
  s.addShape(D.SH.ellipse, { x: gx + 2.0, y: gy - 0.8, w: 0.6, h: 1.6, fill: { color: 'C8D9B8' }, line: { color: '35582A', width: 2 } });
  s.addShape(D.SH.ellipse, { x: gx + 2.58, y: gy - 0.8, w: 0.6, h: 1.6, fill: { color: 'C8D9B8' }, line: { color: '35582A', width: 2 } });
  txt(s, 'closed: guard cells flaccid', gx + 1.4, gy + 0.95, 2.4, 0.35, { size: 13, bold: true, align: 'center' });
  rect(s, MX, 4.1, 5.8, 2.75, C.soft, C.line);
  txt(s, 'Stomatal density', MX + 0.25, 4.2, 5.3, 0.45, { size: 18, bold: true, color: C.maroon });
  txt(s, 'Paint nail varnish on the leaf, peel it off and count the stomata under a microscope.', MX + 0.25, 4.7, 5.3, 0.9, { size: 15 });
  txt(s, '24 stomata in 0.1 mm²:  24 ÷ 0.1 = **240 per mm²**', MX + 0.25, 5.75, 5.3, 0.5, { size: 17 });
  const bx = MX + 6.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'The potometer', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['Measures **water uptake** (close to the transpiration rate).', 'An **air bubble** moves along a capillary tube as the shoot takes up water.', 'Rate = distance moved ÷ time.', 'Example: 30 mm in 5 minutes = **6 mm/min**.'], 16, 0.18);
  notes(s, 'Guard cells control the size of the stomata. Most stomata are on the lower surface of the leaf (cooler, less water loss). A potometer measures water uptake, not loss directly: some water is used in photosynthesis. Set up under water so no air enters the xylem.');
}

D.myTurnYourTurn({
  title: 'Plant calculations', tag: 'Maths skill', stepSize: 20, labelW: 3.4, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: true,
  mine: {
    q: 'Calculate each one:',
    steps: [
      { label: 'Bubble: 45 mm in 5 min', text: '**9 mm/min**' },
      { label: '18 stomata in 0.08 mm²', text: '**225 per mm²**' },
    ],
  },
  yours: {
    q: 'Calculate each one:',
    steps: [
      { label: 'Bubble: 42 mm in 6 min', text: '**7 mm/min**' },
      { label: '30 stomata in 0.12 mm²', text: '**250 per mm²**' },
    ],
  },
  notes: 'Rate = distance ÷ time. Density = number ÷ area.',
});

D.hinge({
  title: 'Quick check',
  q: 'Which change would DECREASE the rate of transpiration?',
  options: ['Higher humidity', 'Higher temperature', 'More wind', 'Brighter light'],
  correct: 0,
  notes: 'Answer A: humid air means a smaller concentration gradient of water vapour.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Give two risk factors for heart disease.', 'Smoking; poor diet / obesity'], ['What is a benign tumour?', 'Abnormal cells contained in one area'], ['Which leaf tissue does most photosynthesis?', 'Palisade mesophyll'], ['What strengthens xylem?', 'Lignin'],
    ['Why is a correlation not proof of cause?', 'Other factors; no mechanism shown'], ['Why does wind increase transpiration?', 'Removes water vapour: steeper gradient'],
    ['What is translocation?', 'Movement of sugars in the phloem'], ['Bubble moves 60 mm in 10 min. Rate?', '6 mm/min'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) smoking, poor diet, obesity, lack of exercise  2) growth of abnormal cells contained in one area, usually within a membrane  3) palisade mesophyll  4) lignin  5) other factors may be involved; a causal mechanism must be shown  6) moving air removes water vapour, keeping the gradient steep  7) movement of dissolved sugars through phloem  8) 60 ÷ 10 = 6 mm/min.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Describe the difference between benign and malignant tumours.', m: 2, lines: 1 },
    { l: 'b', q: 'Explain why scientists say smoking causes lung cancer, not just that it is correlated.', m: 2, lines: 1 },
    { l: 'c', q: 'In a potometer, the bubble moved 48 mm in 8 minutes. Calculate the rate of water uptake.', m: 2, lines: 0 },
    { l: 'd', q: 'Explain how the rate of transpiration changes on a hot, dry, windy day.', m: 4, lines: 2 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'benign: contained in one area, does not invade; malignant: invades tissues, spreads in blood to form secondary tumours', '2', ''],
    ['(b)', 'a mechanism has been found; e.g. carcinogens in tar damage DNA / cells', '2', ''],
    ['(c)', '48 ÷ 8; 6 mm/min', '2', ''],
    ['(d)', 'rate increases; heat: faster evaporation; dry: steeper water vapour gradient; wind removes water vapour', '4', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Give one way diseases can interact.', 'How do cancer cells spread?', 'What do guard cells do?', 'Name the tissue that carries water.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) e.g. immune defects make infection more likely; viruses can trigger cancer  2) in the blood to form secondary tumours  3) open and close stomata  4) xylem. Revisit the objectives: the AQA GCSE Biology (8461) course is complete.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Describe four lifestyle risk factors and the diseases they are linked to.',
    'Compare benign and malignant tumours.',
    'Explain how the palisade layer is adapted for photosynthesis.',
    'Compare xylem and phloem.',
    '35 stomata in 0.14 mm². Calculate the stomatal density.',
    'Plan a potometer experiment to test the effect of wind.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) smoking, diet, alcohol, carcinogens with diseases  2) see the cancer slide  3) many chloroplasts; near the upper surface for light  4) see the xylem and phloem slide  5) 250 per mm²  6) fan at different distances; measure bubble distance in a set time; control temperature, light, humidity, same shoot.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.2_C_HealthCancerPlants.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
