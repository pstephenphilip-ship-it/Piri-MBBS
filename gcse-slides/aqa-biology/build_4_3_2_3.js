// build_4_3_2_3.js — AQA GCSE Biology (8461) 4.3.2 Monoclonal antibodies (HT) and 4.3.3 Plant disease
// One two-hour lesson for a Higher student. Separate Biology only (not in Trilogy).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_3_2_3.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C } = T;

const DECK = {
  code: '4.3.2–4.3.3', title: 'Monoclonals and plant disease',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, vline, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const LEAF = '3E8E4F', LEAFPALE = 'D8C55A';

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
// simple plant: stem + leaves; h = stem height, col = leaf colour
function plant(s, x, yBase, h, col) {
  rect(s, x - 0.6, yBase, 1.2, 0.35, 'A0704A');
  vline(s, x, yBase - h, yBase, '4F7A3A', 4);
  const n = Math.max(2, Math.round(h / 0.6));
  for (let i = 0; i < n; i++) {
    const y = yBase - 0.35 - i * (h - 0.4) / n, left = i % 2 === 0;
    s.addShape(D.SH.ellipse, { x: left ? x - 0.75 : x + 0.05, y: y - 0.16, w: 0.7, h: 0.32, fill: { color: col }, line: { color: '35582A', width: 1 } });
  }
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'How monoclonal antibodies are made and used, and how plant disease is detected, identified and defended against',
  bullets: ['Part 1: making monoclonal antibodies (4.3.2.1, HT)', 'Part 2: uses of monoclonal antibodies (4.3.2.2, HT)', 'Part 3: detecting and identifying plant disease (4.3.3.1)', 'Part 4: plant defences (4.3.3.2)'],
  notes: 'AQA 8461 GCSE Biology. 4.3.2 Monoclonal antibodies is Higher tier only. 4.3.3 Plant disease is for both tiers. Both are separate Biology only. This finishes topic 4.3 Infection and response. About two hours.',
});

D.objectives({
  tag: '4.3.2, 4.3.3',
  items: [
    '**HT:** Describe how **monoclonal antibodies** are made using **hybridoma** cells.',
    '**HT:** Explain their uses, including **pregnancy tests** and **cancer treatment**, and evaluate them.',
    'Describe how plant disease is **detected** and **identified**, including **ion deficiencies**.',
    'Describe the **physical, chemical** and **mechanical** defences of plants.',
  ],
  keywords: ['monoclonal', 'lymphocyte', 'hybridoma', 'chlorosis', 'aphid', 'cuticle'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What are antibodies made by?', 'Why does an antibody only work against one pathogen?', 'Name a plant disease caused by a virus.', 'Name a plant disease caused by a fungus.'],
  answers: ['White blood cells (lymphocytes)', 'It fits only that pathogen\'s antigens', 'Tobacco mosaic virus (TMV)', 'Rose black spot'],
  notes: 'Retrieval from 4.3.1. Q2 (specificity) is the key idea behind monoclonal antibodies.',
});

D.vocab({
  title: 'Key words', tag: '4.3.2, 4.3.3',
  items: [
    { term: 'Monoclonal antibodies', def: 'Identical antibodies made by **one clone of cells**. They bind to **one specific** antigen.' },
    { term: 'Hybridoma', def: 'A cell made by **fusing a lymphocyte with a tumour cell**. It divides **and** makes the antibody.' },
    { term: 'Chlorosis', def: '**Yellowing** of leaves caused by a lack of **magnesium** ions.' },
    { term: 'Aphid', def: 'A small **insect pest** that feeds on plant sap and can spread disease.' },
  ],
  notes: 'Lymphocytes are the white blood cells that make antibodies. Mono = one, clonal = from a clone.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: making monoclonal antibodies', HT);
  const st = [
    ['1  Mouse', 'A mouse is injected with the **antigen**. Its lymphocytes make the antibody.'],
    ['2  Lymphocyte', 'Makes the **right antibody**, but **cannot divide**.'],
    ['3  Tumour cell', '**Divides quickly**, but makes **no antibody**.'],
    ['4  Hybridoma', 'Lymphocyte + tumour cell **fused**. It **divides and** makes the antibody.'],
    ['5  Clone', 'One hybridoma is **cloned**. All the cells make the **same** antibody, which is **collected and purified**.'],
  ];
  const pos = [[MX, 1.45], [MX, 4.25], [MX + 4.25, 1.45], [MX + 4.25, 4.25], [MX + 8.5, 2.85]];
  const bw = 3.65, h = 2.55;
  st.forEach(([a, b], i) => {
    const [x, y] = pos[i], col = i === 3 ? C.green : i === 4 ? C.blue : C.maroon;
    headCard(s, x, y, bw, h, a, col, i === 3 ? C.greenSoft : C.soft);
    txt(s, b, x + 0.2, y + 0.72, bw - 0.4, h - 0.85, { size: 18 });
  });
  arrow(s, MX + bw / 2, 1.45 + h + 0.03, MX + bw / 2, 4.22, C.ink, 2.5);
  arrow(s, MX + bw + 0.05, 4.25 + h / 2, MX + 4.2, 4.25 + h / 2, C.ink, 2.5);
  arrow(s, MX + 4.25 + bw / 2, 1.45 + h + 0.03, MX + 4.25 + bw / 2, 4.22, C.ink, 2.5);
  arrow(s, MX + 4.25 + bw + 0.05, 4.25 + h / 2, MX + 8.45, 2.85 + h - 0.3, C.ink, 2.5);
  notes(s, 'Spec 4.3.2.1 (HT): "Monoclonal antibodies are produced from a single clone of cells. The antibodies are specific to one binding site on one protein antigen... produced by stimulating mouse lymphocytes to make a particular antibody. The lymphocytes are combined with a particular kind of tumour cell to make a cell called a hybridoma cell. The hybridoma cell can both divide and make the antibody. Single hybridoma cells are cloned to produce many identical cells that all produce the same antibody. A large amount of the antibody can be collected and purified." The trick: each parent cell supplies one property.');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'Why are hybridoma cells used to make monoclonal antibodies?',
  options: ['They divide and make the antibody', 'Lymphocytes divide very quickly', 'Tumour cells make the antibody', 'They kill the pathogen'],
  correct: 0,
  notes: 'Answer A. B: lymphocytes do NOT divide (in culture). C: tumour cells make no antibody. D: monoclonal antibodies bind to targets; they are not the pathogen killers here.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: how a pregnancy test works', HT);
  // test strip
  const sx = MX + 0.3, sy = 2.35, sw = 7.4, sh = 1.1;
  rect(s, sx, sy, sw, sh, C.white, C.grey, { lw: 2 });
  rect(s, sx, sy, 1.6, sh, 'E9E2CF', C.grey);
  txt(s, 'urine', sx, sy + sh + 0.08, 1.6, 0.35, { size: 15, bold: true, align: 'center', color: C.grey });
  rect(s, sx + 2.0, sy + 0.12, 1.4, sh - 0.24, 'EEF2FA', C.blue);
  [0.35, 0.65, 0.95, 1.15].forEach(dx => circle(s, sx + 2.0 + dx, sy + 0.55, 0.14, C.blue));
  txt(s, 'mobile antibodies + blue beads', sx + 1.7, sy - 0.48, 2.1, 0.4, { size: 14, bold: true, align: 'center', color: C.blue });
  rect(s, sx + 4.4, sy + 0.12, 0.22, sh - 0.24, C.blue);
  txt(s, 'test line', sx + 3.95, sy + sh + 0.08, 1.15, 0.35, { size: 15, bold: true, align: 'center' });
  rect(s, sx + 5.9, sy + 0.12, 0.22, sh - 0.24, C.blue);
  txt(s, 'control line', sx + 5.4, sy + sh + 0.08, 1.25, 0.35, { size: 15, bold: true, align: 'center' });
  arrow(s, sx + 1.7, sy - 0.75, sx + 6.9, sy - 0.75, C.grey, 2);
  txt(s, 'urine moves along the strip', sx + 2.8, sy - 1.15, 3.5, 0.38, { size: 14, color: C.grey });
  const steps = [
    'A pregnant woman\'s urine contains the hormone **hCG**.',
    'hCG binds to **monoclonal antibodies** attached to blue beads.',
    'At the **test line**, fixed antibodies trap hCG with its beads: a **blue line** = pregnant.',
    'At the **control line**, fixed antibodies trap the **spare** beads. This line always appears, so the test **worked**.',
  ];
  let y = 4.0;
  steps.forEach((t, i) => {
    circle(s, MX + 0.55, y + 0.22, 0.42, C.accent);
    txt(s, String(i + 1), MX + 0.34, y + 0.01, 0.42, 0.42, { size: 16, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, t, MX + 0.95, y, 6.8, 0.75, { size: 17 });
    y += 0.72;
  });
  const bx = MX + 8.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Results', C.maroon, C.soft);
  const res = (yy, lines, lab) => {
    rect(s, bx + 0.3, yy, 1.3, 0.75, C.white, C.grey);
    lines.forEach(dx => rect(s, bx + 0.3 + dx, yy + 0.08, 0.14, 0.59, C.blue));
    txt(s, lab, bx + 1.8, yy - 0.1, bw - 1.95, 0.95, { size: 17, bold: true, valign: 'middle' });
  };
  res(2.2, [0.35, 0.85], 'Two lines: pregnant');
  res(3.35, [0.85], 'Control line only: not pregnant');
  res(4.5, [], 'No control line: test failed');
  txt(s, 'Test line on the left, control line on the right.', bx + 0.3, 5.5, bw - 0.6, 0.9, { size: 15, color: C.grey });
  notes(s, 'Spec 4.3.2.2 (HT) lists pregnancy tests first. Students are not required to recall every detail of the strip, but explaining why two lines mean pregnant, and what the control line is for, is a common question.');
}

{
  const s = frame('Other uses, and evaluating them', HT);
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 3.0;
  const uses = [
    ['In laboratories', 'Measure the levels of **hormones** and other chemicals in blood, or **detect pathogens**.'],
    ['In research', 'Bind to specific molecules with a **fluorescent dye**, to **locate** them in cells or tissues.'],
    ['Treating cancer', 'Carry a **radioactive substance**, a **toxic drug** or a chemical that stops cell division, **only to cancer cells**.'],
  ];
  uses.forEach(([a, b], i) => { const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 18 }); });
  const gw = (W - 2 * MX - 0.4) / 2;
  headCard(s, MX, 4.6, gw, 2.25, 'Advantages', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 5.3, gw - 0.4, ['Bind only to the target, so **healthy cells are not harmed** as much.', 'Can be made for many different targets.'], 17, 0.1);
  headCard(s, MX + gw + 0.4, 4.6, gw, 2.25, 'Disadvantages', C.red, 'FBEDEB');
  bullets(s, MX + gw + 0.6, 5.3, gw - 0.4, ['Cause **more side effects** than expected (e.g. fever, vomiting).', 'Not as widely used as hoped; **expensive** to develop.'], 17, 0.1);
  notes(s, 'Spec 4.3.2.2 (HT): "Monoclonal antibodies create more side effects than expected. They are not yet as widely used as everybody hoped when they were first developed." Students should be able to evaluate the advantages and disadvantages: give both sides and a conclusion.');
}

D.myTurnYourTurn({
  title: 'Monoclonal antibodies', tag: 'HT  Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Describe how monoclonal antibodies are produced.  [4 marks]',
    steps: [
      { label: 'Mouse', text: '**Inject with the antigen**' },
      { label: 'Lymphocytes', text: '**Make the antibody**' },
      { label: 'Fuse', text: '**With a tumour cell**' },
      { label: 'Hybridoma', text: '**Cloned many times**' },
      { label: 'Collect', text: '**Purify the antibody**' },
    ],
  },
  yours: {
    q: 'Explain how monoclonal antibodies can treat cancer with less harm to healthy cells.  [3 marks]',
    steps: [
      { label: 'Specific', text: '**Bind only to cancer cells**' },
      { label: 'Carry', text: '**A toxic drug or radioactivity**' },
      { label: 'So…', text: '**Healthy cells not targeted**' },
    ],
  },
  notes: 'Mine: the hybridoma is the key word. Yours: specific binding → delivers the substance to cancer cells → healthy cells are not affected (as much).',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: detecting and identifying plant disease', { tag: '4.3.3.1' });
  txt(s, 'Signs of disease', MX, 1.4, 7, 0.45, { size: 21, bold: true, color: C.maroon });
  const signs = ['Stunted growth', 'Spots on leaves', 'Areas of decay (rot)', 'Growths', 'Malformed stems or leaves', 'Discolouration', 'Pests, e.g. aphids'];
  const tw = 3.4, th = 0.82;
  signs.forEach((t, i) => {
    const x = MX + (i % 2) * (tw + 0.2), y = 1.95 + Math.floor(i / 2) * (th + 0.15);
    rect(s, x, y, tw, th, i % 4 === 0 || i % 4 === 3 ? C.soft : C.white, C.line);
    txt(s, t, x + 0.2, y, tw - 0.4, th, { size: 18, bold: true, valign: 'middle' });
  });
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Identifying the disease', C.green, C.greenSoft);
  [['Gardening manual or website', 'Compare the signs with pictures and descriptions.'], ['Send to a laboratory', 'Scientists identify the pathogen.'], ['Testing kit', 'Contains **monoclonal antibodies** that bind to one pathogen.']].forEach(([a, b], i) => {
    const y = 2.2 + i * 1.5;
    txt(s, a, bx + 0.25, y, bw - 0.5, 0.45, { size: 19, bold: true, color: C.green });
    txt(s, b, bx + 0.25, y + 0.48, bw - 0.5, 0.9, { size: 17 });
  });
  notes(s, 'Spec 4.3.3.1 lists all seven signs and the three ways of identifying a disease. Plant pathogens include viruses (TMV), bacteria, fungi (rose black spot) and insects. Aphids feed on phloem sap, weaken the plant and can carry viruses between plants (acting as vectors).');
}

{
  const s = frame('Ion deficiencies', { tag: '4.3.3.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  headCard(s, MX, top, cw, 5.45, 'Nitrate deficiency: stunted growth', C.maroon, C.soft);
  plant(s, MX + 1.5, 4.55, 2.4, LEAF); plant(s, MX + 4.3, 4.55, 1.1, LEAF);
  txt(s, 'healthy', MX + 0.9, 4.95, 1.2, 0.35, { size: 15, bold: true, align: 'center', color: C.grey });
  txt(s, 'no nitrate', MX + 3.65, 4.95, 1.3, 0.35, { size: 15, bold: true, align: 'center', color: C.grey });
  txt(s, 'Nitrate ions are needed to make **proteins**, so without them the plant cannot **grow**.', MX + 0.25, 5.45, cw - 0.5, 1.3, { size: 18 });
  const x2 = MX + cw + gap;
  headCard(s, x2, top, cw, 5.45, 'Magnesium deficiency: chlorosis', C.orange, C.orangeSoft);
  plant(s, x2 + 1.5, 4.55, 2.2, LEAF); plant(s, x2 + 4.3, 4.55, 2.2, LEAFPALE);
  txt(s, 'healthy', x2 + 0.9, 4.95, 1.2, 0.35, { size: 15, bold: true, align: 'center', color: C.grey });
  txt(s, 'no magnesium', x2 + 3.5, 4.95, 1.6, 0.35, { size: 15, bold: true, align: 'center', color: C.grey });
  txt(s, 'Magnesium ions are needed to make **chlorophyll**. Leaves turn **yellow** (chlorosis), so less photosynthesis.', x2 + 0.25, 5.45, cw - 0.5, 1.3, { size: 18 });
  notes(s, 'Spec: "Plants can be damaged by a range of ion deficiency conditions: stunted growth caused by nitrate deficiency; chlorosis caused by magnesium deficiency." Link: nitrates are used with glucose to make amino acids and proteins (4.4.2.2 in Bioenergetics). Ions are absorbed from the soil by root hair cells by active transport.');
}

D.hinge({
  title: 'Quick check',
  q: 'A plant has yellow leaves. Which ion is it most likely to be lacking?',
  options: ['Magnesium', 'Nitrate', 'Sodium', 'Chloride'],
  correct: 0,
  notes: 'Answer A: magnesium is needed for chlorophyll. B causes stunted growth. C and D are not on the spec.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: how plants defend themselves', { tag: '4.3.3.2' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 5.45;
  const cols = [
    ['Physical', C.maroon, C.soft, 'Stop pathogens getting in:', ['**Cellulose cell walls**', 'A tough **waxy cuticle** on leaves', '**Layers of dead cells** on stems (e.g. bark) that fall off']],
    ['Chemical', C.green, C.greenSoft, 'Kill pathogens or put animals off:', ['**Antibacterial chemicals** (e.g. in mint, pine)', '**Poisons** to deter herbivores (e.g. foxglove, tobacco)']],
    ['Mechanical', C.orange, C.orangeSoft, 'Put animals off:', ['**Thorns and hairs**', 'Leaves that **droop or curl** when touched', '**Mimicry** to trick animals']],
  ];
  cols.forEach(([a, col, fill, lead, items], i) => {
    const x = MX + i * (cw + gap);
    headCard(s, x, top, cw, h, a, col, fill);
    txt(s, lead, x + 0.2, top + 0.75, cw - 0.4, 0.45, { size: 17, italic: true, color: C.grey });
    bullets(s, x + 0.2, top + 1.3, cw - 0.4, items, 19, 0.3);
  });
  notes(s, 'Spec 4.3.3.2. Mimicry examples: passion flowers have yellow spots that look like butterfly eggs, so butterflies do not lay there; some plants look like stones. Mimosa pudica leaves fold when touched, which can knock insects off.');
}

D.myTurnYourTurn({
  title: 'Plant disease and defence', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Classify each defence as physical, chemical or mechanical.',
    steps: [
      { label: 'Waxy cuticle', text: '**Physical**' },
      { label: 'Mint oils', text: '**Chemical**' },
      { label: 'Rose thorns', text: '**Mechanical**' },
      { label: 'Bark', text: '**Physical**' },
    ],
  },
  yours: {
    q: 'A plant is small with yellow leaves. Explain the likely causes.  [4 marks]',
    steps: [
      { label: 'Yellow', text: '**Lack of magnesium ions**' },
      { label: 'Why', text: '**Needed for chlorophyll**' },
      { label: 'Small', text: '**Lack of nitrate ions**' },
      { label: 'Why', text: '**Needed to make proteins**' },
    ],
  },
  notes: 'Yours: two deficiencies at once. Each symptom needs the ion AND the reason for a full answer.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['HT  What is a hybridoma cell?', 'A lymphocyte fused with a tumour cell'], ['Give two signs of disease in a plant.', 'Any two: stunted growth, spots, rot, growths, discolouring…'], ['Which ion deficiency causes stunted growth?', 'Nitrate'], ['Name a physical plant defence.', 'Waxy cuticle, cell walls or bark'],
    ['HT  Why does a pregnancy test only show a test line if hCG is present?', 'The fixed antibodies only bind to hCG'], ['Suggest how aphids spread viral disease between plants.', 'They feed on an infected plant, then a healthy one'],
    ['Explain why magnesium deficiency reduces growth.', 'Less chlorophyll, so less photosynthesis'], ['HT  Give one disadvantage of monoclonal antibodies.', 'More side effects than expected'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: explain', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) a lymphocyte fused with a tumour cell: it divides and makes one antibody  2) stunted growth, spots on leaves, rot, growths, malformed stems or leaves, discolouration, pests  3) nitrate  4) cellulose cell walls, waxy cuticle, bark  5) the antibodies on the test line are specific to hCG  6) aphids act as vectors: they carry the virus on their mouthparts from plant to plant  7) magnesium is needed for chlorophyll, so less light is absorbed, less photosynthesis, less glucose  8) more side effects than expected; expensive; not as widely used as hoped.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.3,
  parts: [
    { l: 'a', q: 'HT  Describe how monoclonal antibodies are produced.', m: 4, lines: 2 },
    { l: 'b', q: 'HT  Explain how monoclonal antibodies can be used to treat cancer.', m: 2, lines: 1 },
    { l: 'c', q: 'A tomato plant has yellow leaves and grows slowly. Explain why.', m: 2, lines: 1 },
    { l: 'd', q: 'Describe two physical defences that stop pathogens entering a plant.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'mouse injected with antigen; lymphocytes make antibody; fused with tumour cell to make hybridoma; cloned, antibody collected and purified', '4', ''],
    ['(b)', 'antibody binds only to cancer cells; carries a toxic drug / radioactive substance / chemical that stops division', '2', ''],
    ['(c)', 'lack of magnesium (chlorosis); less chlorophyll so less photosynthesis', '2', 'allow: less glucose for growth'],
    ['(d)', 'any two: cellulose cell walls; waxy cuticle; bark / dead cells on stems', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['HT  Which two cells are fused to make a hybridoma?', 'What causes chlorosis?', 'Give one chemical defence of plants.', 'How could a scientist identify a plant pathogen quickly?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) a lymphocyte and a tumour cell  2) a lack of magnesium ions  3) antibacterial chemicals or poisons  4) a testing kit with monoclonal antibodies. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'HT  Explain how a pregnancy test works, including the control line.',
    'HT  Evaluate the use of monoclonal antibodies in medicine.',
    'Describe three ways to identify a plant disease.',
    'Explain why a plant short of nitrate ions is stunted.',
    'Describe how a rose plant defends itself.',
    'Suggest why some plants have leaves that fold up when touched.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) hCG binds to mobile antibodies on beads; test-line antibodies trap hCG: line = pregnant; control line traps spare beads, shows the test worked  2) specific, fewer healthy cells harmed, many uses; but more side effects than expected, expensive, not widely used; conclusion  3) gardening manual or website; laboratory; monoclonal antibody testing kit  4) nitrate is needed for proteins, so less growth  5) thorns (mechanical), waxy cuticle and cellulose cell walls (physical)  6) mechanical defence: knocks off insects or makes the plant look less appealing to herbivores.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.3.2-4.3.3_MonoclonalAndPlantDisease.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count));
