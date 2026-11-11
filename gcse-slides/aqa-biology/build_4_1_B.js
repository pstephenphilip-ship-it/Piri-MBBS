// build_4_1_B.js — AQA GCSE Biology (8461) 4.1 Cell biology, lesson 2 of 3:
// 4.1.2.1 Chromosomes, 4.1.2.2 Mitosis and the cell cycle, 4.1.2.3 Stem cells,
// 4.1.1.6 Culturing microorganisms (+ Required practical 2).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_1_B.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.1.2', title: 'Cell division and bacteria',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const grow = (n0, minutes, every) => n0 * 2 ** (minutes / every);
const area = d => Math.round(Math.PI * (d / 2) ** 2);

// ======================= numbers (all checked) =======================
calc('ex', grow(1, 240, 20), 4096); calc('ex div', 240 / 20, 12);
calc('MT', grow(500, 180, 30), 32000); calc('YT', grow(200, 120, 20), 12800);
calc('MT2', grow(1, 100, 20), 32); calc('YT2', grow(10, 60, 15), 160);
calc('zone', area(20), 314); calc('P7', grow(1, 120, 20), 64); calc('P8', grow(1000, 90, 30), 8000);
calc('exam', grow(100, 150, 25), 6400); calc('exam area', area(12), 113); calc('HW', grow(50, 200, 20), 51200);

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
// a cell with chromosomes; mode: 'one' single copies, 'two' copied, 'split' pulled apart
function cell(s, cx, cy, d, mode) {
  circle(s, cx, cy, d, 'F7F1E3', 'B5A27A', 1.5);
  const chs = [[-0.22, 0.55, 'C0392B'], [0.0, 0.55, '2F5DA8'], [0.2, 0.32, 'C0392B'], [0.38, 0.32, '2F5DA8']];
  if (mode === 'split') {
    chs.forEach(([dx, len, col], i) => { const x = cx - 0.3 + i * 0.2; rect(s, x - 0.04, cy - d / 2 + 0.18, 0.08, len * 0.7, col, col); rect(s, x - 0.04, cy + d / 2 - 0.18 - len * 0.7, 0.08, len * 0.7, col, col); });
    return;
  }
  chs.forEach(([dx, len, col]) => { rect(s, cx + dx - 0.04, cy - len / 2, 0.08, len, col, col); if (mode === 'two') rect(s, cx + dx + 0.06, cy - len / 2, 0.08, len, col, col); });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Chromosomes, the cell cycle and mitosis, stem cells and their uses, and growing bacteria safely',
  bullets: ['Part 1: chromosomes and the cell cycle (4.1.2.1, 4.1.2.2)', 'Part 2: stem cells (4.1.2.3)', 'Part 3: culturing microorganisms (4.1.1.6)', 'Part 4: Required practical 2: antibiotics and antiseptics'],
  notes: 'AQA 8461 GCSE Biology 4.1, lesson 2 of 3. 4.1.1.6 and RP2 are separate Biology only. RP2 also appears in the 4.3.1 antibiotics lesson; this is the fuller treatment. About two hours.',
});

D.objectives({
  tag: '4.1.2, 4.1.1.6',
  items: [
    'Describe **chromosomes** and the three stages of the **cell cycle**.',
    'Describe **stem cells**, their uses, and the **ethics** of using them.',
    'Explain **binary fission** and calculate bacterial numbers in **standard form**.',
    'Use **aseptic technique** in **RP2** and calculate clear-zone areas.',
  ],
  keywords: ['chromosome', 'mitosis', 'stem cell', 'meristem', 'binary fission', 'aseptic'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Which organelle contains the genetic material?', 'What is a plasmid?', 'What is differentiation?', 'Work out 2⁵.'],
  answers: ['The nucleus', 'A small ring of DNA in bacteria', 'A cell becoming specialised', '32'],
  notes: 'Retrieval from lesson 1, plus powers of 2 for bacterial growth.',
});

D.vocab({
  title: 'Key words', tag: '4.1.2',
  items: [
    { term: 'Chromosome', def: 'A long molecule of **DNA** carrying many **genes**. Body cells have them in **pairs**.' },
    { term: 'Mitosis', def: 'Cell division that makes **two identical** cells.' },
    { term: 'Stem cell', def: 'An **undifferentiated** cell that can make more cells like itself and **differentiate** into other types.' },
    { term: 'Binary fission', def: 'How bacteria **reproduce**: one cell splits into two.' },
  ],
  notes: 'Meristem: plant tissue with stem cells, found at root and shoot tips.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the cell cycle', { tag: '4.1.2.2' });
  const xs = [MX + 1.2, MX + 4.6, MX + 8.0], cy = 2.6;
  cell(s, xs[0], cy, 1.7, 'one'); cell(s, xs[1], cy, 1.9, 'two'); cell(s, xs[2], cy, 1.9, 'split');
  circle(s, xs[2] + 2.6, cy - 0.55, 1.15, 'F7F1E3', 'B5A27A', 1.5); circle(s, xs[2] + 2.6, cy + 0.65, 1.15, 'F7F1E3', 'B5A27A', 1.5);
  arrow(s, xs[0] + 0.95, cy, xs[1] - 1.05, cy); arrow(s, xs[1] + 1.05, cy, xs[2] - 1.05, cy); arrow(s, xs[2] + 1.05, cy, xs[2] + 1.95, cy);
  const st = [['Stage 1: growth', '**DNA is copied** (chromosomes doubled). The cell grows and makes more **mitochondria** and **ribosomes**.'], ['Stage 2: mitosis', 'One set of chromosomes is **pulled to each end** of the cell.'], ['Stage 3: division', 'The **cytoplasm** and **cell membrane** divide: **two identical cells**.']];
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 3.85, h = 3.0;
  st.forEach(([a, b], i) => { const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, [C.green, C.maroon, C.accent][i], C.white); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 }); });
  notes(s, 'Spec 4.1.2.2: "Before a cell can divide it needs to grow and increase the number of sub-cellular structures such as ribosomes and mitochondria. The DNA replicates to form two copies of each chromosome. In mitosis one set of chromosomes is pulled to each end of the dividing cell and the nucleus divides. Finally the cytoplasm and cell membranes divide to form two identical cells." Mitosis is needed for growth, repair and asexual reproduction. Diagram: 2 pairs of chromosomes (red/blue = from each parent).');
}

{
  const s = frame('Chromosomes and why mitosis matters', { tag: '4.1.2.1' });
  twoCards(s, 1.4, 3.1, ['Chromosomes', ['Found in the **nucleus**; made of **DNA**.', 'Each carries a large number of **genes**.', 'Body cells: chromosomes in **pairs** (humans: 23 pairs).']], ['Mitosis is used for', ['**Growth** and **development** of multicellular organisms.', '**Repair** of damaged tissue.', '**Asexual reproduction**.']], C.maroon, C.green, C.soft, C.greenSoft, 18);
  rect(s, MX, 4.75, W - 2 * MX, 2.1, C.orangeSoft, 'F3D9B5');
  txt(s, '**Data skill:** a cell cycle takes 24 hours. Under a microscope, 1 cell in 12 is in mitosis. Mitosis lasts about 24 ÷ 12 = **2 hours**.', MX + 0.3, 4.75, W - 2 * MX - 0.6, 2.1, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.1.2.1 and 4.1.2.2. Students should be able to recognise and describe situations in given contexts where mitosis is occurring. The proportion of cells in a stage is proportional to the time spent in it.');
}

D.hinge({
  title: 'Quick check',
  q: 'What happens in stage 1 of the cell cycle?',
  options: ['The DNA is copied and the cell grows', 'The chromosomes are pulled apart', 'The cytoplasm divides', 'The cell dies'],
  correct: 0,
  notes: 'Answer A. B is stage 2 (mitosis). C is stage 3.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: stem cells', { tag: '4.1.2.3' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 3.4;
  [['Embryonic', 'From early **embryos**. Can become **most** types of human cell.', C.maroon, C.soft], ['Adult (bone marrow)', 'Can form **many** types of cell, including **blood cells**.', C.accent, 'EEF3FB'], ['Meristems (plants)', 'At **root and shoot tips**. Can become **any** type of plant cell, throughout life.', C.green, C.greenSoft]].forEach(([a, b, col, f], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, col, f); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 18 });
  });
  rect(s, MX, 5.05, W - 2 * MX, 1.8, C.orangeSoft, 'F3D9B5');
  txt(s, 'Uses: stem cells could treat **diabetes** and **paralysis**. Meristems are used to clone plants quickly and cheaply: rare species, crops with **disease resistance**.', MX + 0.3, 5.05, W - 2 * MX - 0.6, 1.8, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.1.2.3: "Stem cells from human embryos can be cloned and made to differentiate into most different types of human cells. Stem cells from adult bone marrow can form many types of cells including blood cells. Meristem tissue in plants can differentiate into any type of plant cell, throughout the life of the plant." Treatment with stem cells may be able to help conditions such as diabetes and paralysis.');
}

{
  const s = frame('Therapeutic cloning and the ethics', { tag: '4.1.2.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.35, C.soft, C.line);
  txt(s, '**Therapeutic cloning:** an embryo is made with the **same genes as the patient**, so the stem cells are **not rejected** by the patient\'s body.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.35, { size: 19, valign: 'middle' });
  twoCards(s, 3.0, 3.85, ['Benefits', ['Could **treat** or cure serious conditions.', 'No rejection (therapeutic cloning).', 'Embryos used are often **spare** from IVF.']], ['Concerns', ['**Ethical / religious** objections: an embryo is a potential life.', 'Risk of passing on **viral infection**.', 'Treatments are still **experimental**.']], C.green, C.red, C.greenSoft, 'FBEDEB', 18);
  notes(s, 'Spec 4.1.2.3: "In therapeutic cloning an embryo is produced with the same genes as the patient. Stem cells from the embryo are not rejected by the patient\'s body so they may be used for medical treatment. The use of stem cells has potential risks such as transfer of viral infection, and some people have ethical or religious objections." Students should evaluate practical risks and benefits, plus social and ethical issues.');
}

D.hinge({
  title: 'Quick check',
  q: 'Where are meristems found?',
  options: ['At the tips of roots and shoots', 'In bone marrow', 'In early embryos', 'In the leaves only'],
  correct: 0,
  notes: 'Answer A. B and C are animal stem cells.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: growing bacteria', { tag: '4.1.1.6' });
  twoCards(s, 1.4, 2.6, ['Binary fission', ['Bacteria divide by **binary fission**: one cell splits into two.', 'In good conditions this can happen as often as **every 20 minutes**.']], ['Growing them', ['In **nutrient broth** (liquid), or as **colonies** on **agar gel** plates.', 'They need nutrients, warmth and moisture.']], C.maroon, C.accent, C.soft, 'EEF3FB', 17);
  rect(s, MX, 4.25, W - 2 * MX, 2.6, C.orangeSoft, 'F3D9B5');
  txt(s, 'Number of bacteria = starting number × 2ⁿ  (n = number of divisions)', MX + 0.3, 4.35, W - 2 * MX - 0.6, 0.5, { size: 20, bold: true });
  txt(s, 'One bacterium divides every 20 minutes for 4 hours.', MX + 0.3, 4.95, W - 2 * MX - 0.6, 0.45, { size: 18 });
  txt(s, 'Divisions: 240 ÷ 20 = 12.   Number = 1 × 2¹² = 4096 = **4.096 × 10³**', MX + 0.3, 5.45, W - 2 * MX - 0.6, 0.5, { size: 19 });
  txt(s, 'Use your calculator\'s **xʸ** button. Give big answers in **standard form**.', MX + 0.3, 6.05, W - 2 * MX - 0.6, 0.6, { size: 16, color: C.grey });
  notes(s, 'Spec 4.1.1.6 (separate Biology): "Bacteria multiply by simple cell division (binary fission) as often as once every 20 minutes if they have enough nutrients and a suitable temperature." Students should be able to calculate the number of bacteria in a population after a certain time if given the mean division time, and express the answer in standard form.');
}

D.myTurnYourTurn({
  title: 'Bacterial growth', tag: 'Maths skill', stepSize: 20, labelW: 2.0, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: '500 bacteria; divide every 30 min; 3 hours.',
    steps: [
      { label: 'Divisions', text: '**180 ÷ 30 = 6**' },
      { label: 'Number', text: '**500 × 2⁶ = 32 000**' },
      { label: 'Standard form', text: '**3.2 × 10⁴**' },
    ],
  },
  yours: {
    q: '200 bacteria; divide every 20 min; 2 hours.',
    steps: [
      { label: 'Divisions', text: '**120 ÷ 20 = 6**' },
      { label: 'Number', text: '**200 × 2⁶ = 12 800**' },
      { label: 'Standard form', text: '**1.28 × 10⁴**' },
    ],
  },
  notes: 'Common error: multiplying by 2 × 6 instead of 2⁶.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Aseptic technique', { tag: '4.1.1.6' });
  const rows = [['Sterilise Petri dishes and agar', 'before use (autoclave), to kill unwanted microbes'], ['Pass the inoculating loop through a flame', 'to sterilise it'], ['Tape the lid on (not all the way round)', 'stops microbes getting in; oxygen can still get in, so no harmful anaerobic bacteria grow'], ['Store the dish upside down', 'stops condensation dripping onto the agar'], ['Incubate at 25 °C maximum in schools', 'to reduce the chance of growing human pathogens']];
  rows.forEach(([a, b], i) => {
    const y = 1.45 + i * 1.06;
    rect(s, MX, y, W - 2 * MX, 0.95, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, MX + 0.25, y, 5.3, 0.95, { size: 17, bold: true, color: C.maroon, valign: 'middle' });
    txt(s, b, MX + 5.7, y, W - 2 * MX - 5.9, 0.95, { size: 16, valign: 'middle' });
  });
  notes(s, 'Spec 4.1.1.6: "Uncontaminated cultures of microorganisms are required for investigating the action of disinfectants and antibiotics. Students should be able to describe how to prepare an uncontaminated culture using aseptic technique. They should be able to explain why: Petri dishes and culture media must be sterilised before use; inoculating loops used to transfer microorganisms to the media must be sterilised by passing them through a flame; the lid of the Petri dish should be secured with adhesive tape and stored upside down; in school laboratories, cultures should generally be incubated at 25 °C."');
}

{
  const s = frame('Required practical 2: antibiotics and antiseptics', { tag: 'RP2' });
  const cx = MX + 2.6, cy = 4.0, R = 2.3;
  circle(s, cx, cy, 2 * R + 0.2, 'E9EEF1', C.grey, 2); circle(s, cx, cy, 2 * R, 'E8E1BE', 'B9A96A', 1.5);
  [['A', -1.0, -0.9, 1.4], ['B', 1.0, -0.9, 0.9], ['C', -1.0, 0.95, 0], ['D', 1.0, 0.95, 0.6]].forEach(([l, dx, dy, z]) => {
    if (z) circle(s, cx + dx, cy + dy, z, C.white, 'B9A96A', 1);
    circle(s, cx + dx, cy + dy, 0.4, 'F7F7F7', C.grey, 1.5);
    txt(s, l, cx + dx - 0.2, cy + dy - 0.2, 0.4, 0.4, { size: 15, bold: true, align: 'center', valign: 'middle' });
  });
  txt(s, 'D = control disc (soaked in sterile water)', MX, 6.5, 5.4, 0.35, { size: 13, color: C.grey });
  const bx = MX + 5.7, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.85, 'Method', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Spread bacteria evenly on agar (aseptic technique).', 'Add paper discs soaked in different antibiotics or antiseptics, and a **control**.', 'Incubate at 25 °C for 48 hours; measure each **clear zone** (inhibition zone).'], 15, 0.06);
  headCard(s, bx, 4.4, bw, 2.45, 'Calculating the area', C.green, C.greenSoft);
  txt(s, 'area = πr²', bx + 0.2, 5.05, bw - 0.4, 0.45, { size: 19, bold: true });
  txt(s, 'Zone 20 mm across: r = 10 mm; π × 10² = **314 mm²**. A **bigger** zone = more **effective**.', bx + 0.2, 5.55, bw - 0.4, 1.2, { size: 16 });
  notes(s, 'RP2: "investigate the effect of antiseptics or antibiotics on bacterial growth using agar plates and measuring zones of inhibition." The control disc shows the effect is due to the antibiotic, not the paper. Disc D here has no clear zone. Zones drawn approximately.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is the lid of the Petri dish not sealed all the way round?',
  options: ['So oxygen can get in and harmful anaerobic bacteria don\'t grow', 'So the bacteria can escape', 'So condensation can drip out', 'So it is easier to open'],
  correct: 0,
  notes: 'Answer A.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Give three uses of mitosis.', 'Growth, repair, asexual reproduction'], ['Where are adult stem cells found?', 'Bone marrow'], ['How do bacteria reproduce?', 'Binary fission'], ['Why is the inoculating loop flamed?', 'To sterilise it'],
    ['Why might a patient not reject cells from therapeutic cloning?', 'Same genes as the patient'], ['Why use a control disc in RP2?', 'To show the effect is due to the antibiotic'],
    ['1 bacterium divides every 20 min for 2 hours. How many?', '64'], ['1000 bacteria; divide every 30 min; 90 min. How many?', '8000 (8 × 10³)'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) growth, repair, asexual reproduction  2) bone marrow  3) binary fission  4) to kill microorganisms on it  5) same genes, so not recognised as foreign  6) to show the result is due to the antibiotic, not the disc  7) 120 ÷ 20 = 6 divisions, 2⁶ = 64  8) 3 divisions, 1000 × 8 = 8000.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Describe what happens to a cell before it divides by mitosis.', m: 2, lines: 1 },
    { l: 'b', q: 'Give one advantage and one disadvantage of using embryonic stem cells to treat paralysis.', m: 2, lines: 1 },
    { l: 'c', q: '100 bacteria divide every 25 minutes. Calculate the number after 150 minutes. Give your answer in standard form.', m: 3, lines: 1 },
    { l: 'd', q: 'A clear zone around an antibiotic disc is 12 mm across. Calculate its area to the nearest mm².', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'cell grows; makes more mitochondria / ribosomes; DNA replicates', '2', 'any two'],
    ['(b)', 'adv: could treat or cure; disadv: ethical objection / viral infection risk / rejection', '2', ''],
    ['(c)', '150 ÷ 25 = 6; 100 × 2⁶ = 6400; 6.4 × 10³', '3', ''],
    ['(d)', 'r = 6 mm; π × 6²; 113 mm²', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What does stage 3 of the cell cycle produce?', 'Give one use of meristem cloning.', 'Why are cultures incubated at 25 °C in schools?', 'What shows that an antibiotic works well in RP2?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) two identical cells  2) clone rare plants or crops with disease resistance  3) reduces the chance of growing human pathogens  4) a large clear zone. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Describe the three stages of the cell cycle.',
    'Evaluate the use of embryonic stem cells in medicine.',
    'Compare embryonic stem cells and meristems.',
    '50 bacteria divide every 20 minutes. How many after 200 minutes? Standard form.',
    'Explain each step of aseptic technique.',
    'Plan RP2 to compare three antiseptics.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) growth and DNA copied; mitosis; cytoplasm and membrane divide  2) benefits and concerns, conclusion  3) embryonic: most human cell types; meristems: any plant cell type, throughout life  4) 10 divisions: 50 × 1024 = 51 200 = 5.12 × 10⁴  5) see the aseptic slide  6) discs of each antiseptic plus control; incubate 25 °C; measure zones; repeat.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.1_B_CellDivisionBacteria.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
