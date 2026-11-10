// build_4_6_A.js — AQA GCSE Biology (8461) 4.6 Inheritance, variation and evolution, lesson 1 of 4:
// 4.6.1.1 Sexual and asexual reproduction, 4.6.1.2 Meiosis, 4.6.1.3 Advantages and disadvantages,
// 4.6.1.4 DNA and the genome, 4.6.1.5 DNA structure (HT: protein synthesis, mutations).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_6_A.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.6.1', title: 'Reproduction, meiosis and DNA',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, vline, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const BASE = { A: 'D9534F', T: '5B87B5', C: '4CAE4C', G: 'E8A33D' };
const PAIR = { A: 'T', T: 'A', C: 'G', G: 'C' };
const comp = s => s.split('').map(b => PAIR[b]).join('');
const eq = (l, a, b) => calc(l, a === b ? 1 : 0, 1);

// ======================= numbers (all checked) =======================
calc('gamete', 46 / 2, 23);
eq('MT strand', comp('ATTGCA'), 'TAACGT'); eq('YT strand', comp('GCATTC'), 'CGTAAG');
calc('MT G', (100 - 2 * 30) / 2, 20); calc('YT A', (100 - 2 * 15) / 2, 35);
calc('MT aa', 900 / 3, 300); calc('YT aa', 1200 / 3, 400);
calc('P7', (100 - 2 * 22) / 2, 28); calc('P8', 1500 / 3, 500);
calc('exam c', (100 - 2 * 18) / 2, 32); calc('HW', 2400 / 3, 800);

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
  const n = items.length, gap = 0.42, bw = (W - 2 * MX - (n - 1) * gap) / n;
  items.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap), col = (cols && cols[i]) || C.maroon, hh = 0.68;
    rect(s, x, y, bw, h, C.white, col, { lw: 2 });
    rect(s, x, y, bw, hh, col);
    txt(s, a, x + 0.06, y, bw - 0.12, hh, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
    if (b) txt(s, b, x + 0.12, y + hh + 0.1, bw - 0.24, h - hh - 0.15, { size, align: 'center' });
    if (i < n - 1) arrow(s, x + bw + 0.04, y + h / 2, x + bw + gap - 0.04, y + h / 2, C.ink, 2.5);
  });
}
// cell with chromosomes: each [dx, length, colour, copied]
function cell(s, cx, cy, d, chs) {
  circle(s, cx, cy, d, 'F7F1E3', 'B5A27A', 1.5);
  chs.forEach(([dx, len, col, copied]) => {
    rect(s, cx + dx - 0.05, cy - len / 2, 0.1, len, col, col);
    if (copied) rect(s, cx + dx + 0.07, cy - len / 2, 0.1, len, col, col);
  });
}
const RL = 'C0392B', BL = '2F5DA8';

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Sexual and asexual reproduction, meiosis, the structure of DNA, the genome, and how genes code for proteins',
  bullets: ['Part 1: sexual and asexual reproduction (4.6.1.1, 4.6.1.3)', 'Part 2: meiosis and fertilisation (4.6.1.2)', 'Part 3: DNA and the genome (4.6.1.4, 4.6.1.5)', 'Part 4: HT: protein synthesis and mutations (4.6.1.5)'],
  notes: 'AQA 8461 GCSE Biology 4.6, lesson 1 of 4. Lesson 2: genetic inheritance, disorders and sex determination. Lesson 3: variation, evolution, selective breeding and genetic engineering. Lesson 4: evidence for evolution, fossils, extinction and classification. Separate Biology only: 4.6.1.3 (advantages and disadvantages) and 4.6.1.5 (DNA structure). HT only: protein synthesis and the effects of mutations. About two hours.',
});

D.objectives({
  tag: '4.6.1',
  items: [
    'Compare **sexual** and **asexual** reproduction, with their **advantages**.',
    'Describe **meiosis** and explain why gametes have **half** the chromosomes.',
    'Describe the structure of **DNA** and use **complementary base pairing**.',
    '**HT:** explain **protein synthesis** and how **mutations** affect proteins.',
  ],
  keywords: ['gamete', 'meiosis', 'genome', 'nucleotide', 'base', 'mutation'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Where is DNA found in an animal cell?', 'How many chromosomes are in a human body cell?', 'What does mitosis produce?', 'What is an enzyme made of?'],
  answers: ['In the nucleus (on chromosomes)', '46 (23 pairs)', 'Two identical cells', 'Protein'],
  notes: 'Retrieval from 4.1 (cells, mitosis) and 4.2 (enzymes are proteins: Part 4 explains how a gene codes for one).',
});

D.vocab({
  title: 'Key words', tag: '4.6.1',
  items: [
    { term: 'Gamete', def: 'A sex cell: **sperm** and **egg** in animals, **pollen** and **egg** in plants. It has **one set** of chromosomes.' },
    { term: 'Meiosis', def: 'Cell division that makes **four genetically different gametes**.' },
    { term: 'Gene', def: 'A small section of **DNA** that codes for a particular sequence of **amino acids**, to make a **protein**.' },
    { term: 'Genome', def: 'The **entire genetic material** of an organism.' },
  ],
  notes: 'Chromosome: a long molecule of DNA. Nucleotide: the repeating unit of DNA.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: sexual and asexual reproduction', { tag: '4.6.1.1' });
  const head = ['', 'Sexual', 'Asexual'];
  const rows = [['Parents', 'Two', 'One'], ['Gametes', 'Yes: they fuse (fertilisation)', 'No'], ['Cell division', 'Meiosis makes the gametes', 'Mitosis only'], ['Offspring', 'Genetically different: variation', 'Identical clones'], ['Examples', 'Humans, flowering plants', 'Bacteria, strawberry runners']];
  const cws = [2.8, (W - 2 * MX - 2.8) / 2, (W - 2 * MX - 2.8) / 2], ty = 1.5, rh = 0.88;
  head.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, ty, cws[j], 0.65, j === 1 ? C.maroon : j === 2 ? C.green : C.grey); txt(s, t, x + 0.2, ty, cws[j] - 0.4, 0.65, { size: 20, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0), y = ty + 0.65 + i * rh; rect(s, x, y, cws[j], rh, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.2, y, cws[j] - 0.4, rh, { size: 19, bold: j === 0, valign: 'middle' }); }));
  notes(s, 'Spec 4.6.1.1: "Sexual reproduction involves the joining (fusion) of male and female gametes... This mixing of genetic information leads to variety in the offspring. The formation of gametes involves meiosis. Asexual reproduction involves only one parent and no fusion of gametes. There is no mixing of genetic information. This leads to genetically identical offspring (clones). Only mitosis is involved."');
}

{
  const s = frame('Advantages of each', { tag: '4.6.1.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 3.35;
  headCard(s, MX, top, cw, h, 'Sexual reproduction', C.maroon, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Produces **variation**: if the environment changes, some may survive.', 'Lets humans **selectively breed** for useful features.'], 18, 0.25);
  headCard(s, MX + cw + gap, top, cw, h, 'Asexual reproduction', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Only **one parent** needed.', '**Faster**, and uses less energy (no need to find a mate).', 'Many identical offspring when conditions are **good**.'], 18, 0.2);
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Some organisms do **both**:', MX + 0.3, 5.1, 5, 0.42, { size: 19, bold: true, color: C.orange });
  bullets(s, MX + 0.3, 5.6, W - 2 * MX - 0.6, ['**Malaria parasites**: asexual in the human, sexual in the mosquito. **Fungi**: asexual spores, or sexual spores for variation.', '**Plants**: seeds (sexual), and also runners (strawberries) or bulbs (daffodils) (asexual).'], 16, 0.06);
  notes(s, 'Spec 4.6.1.3 (separate Biology only). The disadvantages are the opposite of the other method\'s advantages: sexual is slower and needs two parents; asexual gives no variation, so one disease or environmental change could kill them all.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does asexual reproduction produce identical offspring?',
  options: ['Only mitosis is involved and there is one parent', 'The gametes are identical', 'Meiosis makes identical cells', 'Two parents have the same genes'],
  correct: 0,
  notes: 'Answer A. B: asexual reproduction has no gametes. C: meiosis makes different cells. D: there is only one parent.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: meiosis', { tag: '4.6.1.2' });
  const ys = 3.9, cols = [MX + 1.0, MX + 3.4, MX + 6.0, MX + 8.6];
  ['Body cell', 'Chromosomes copied', 'First division', 'Second division: 4 gametes'].forEach((t, i) => txt(s, t, cols[i] - 1.2, 1.35, 2.4 + (i === 3 ? 1.2 : 0), 0.4, { size: 15, bold: true, align: i === 3 ? 'left' : 'center', color: C.maroon }));
  cell(s, cols[0], ys, 1.8, [[-0.45, 1.0, RL], [-0.15, 1.0, BL], [0.2, 0.55, RL], [0.45, 0.55, BL]]);
  arrow(s, cols[0] + 1.0, ys, cols[1] - 1.05, ys);
  cell(s, cols[1], ys, 1.9, [[-0.55, 1.0, RL, 1], [-0.2, 1.0, BL, 1], [0.15, 0.55, RL, 1], [0.45, 0.55, BL, 1]]);
  const d1 = [[2.75, [[-0.2, 0.9, RL, 1], [0.2, 0.5, BL, 1]]], [5.05, [[-0.2, 0.9, BL, 1], [0.2, 0.5, RL, 1]]]];
  d1.forEach(([y, ch]) => { arrow(s, cols[1] + 1.0, ys, cols[2] - 0.75, y); cell(s, cols[2], y, 1.4, ch); });
  const g = [[2.25, RL, BL, 2.75], [3.4, RL, BL, 2.75], [4.55, BL, RL, 5.05], [5.7, BL, RL, 5.05]];
  g.forEach(([y, l, sh, from]) => { arrow(s, cols[2] + 0.72, from, cols[3] - 0.5, y, C.ink, 2); cell(s, cols[3], y, 0.95, [[-0.12, 0.6, l], [0.15, 0.35, sh]]); });
  const bx = MX + 9.6, bw = W - MX - bx;
  rect(s, bx, 1.85, bw, 4.4, C.soft, C.line);
  bullets(s, bx + 0.15, 2.0, bw - 0.3, ['Copies of the chromosomes are made.', 'The cell divides **twice**.', '**Four gametes**, each with a **single set** of chromosomes.', 'All **genetically different**.'], 15, 0.15);
  rect(s, MX, 6.35, W - 2 * MX, 0.55, C.orangeSoft, 'F3D9B5');
  txt(s, 'Meiosis happens in the **reproductive organs** (ovaries and testes in animals). Diagram: 4 chromosomes (2 pairs); humans have 46.', MX + 0.2, 6.35, W - 2 * MX - 0.4, 0.55, { size: 15, valign: 'middle' });
  notes(s, 'Spec 4.6.1.2: "When a cell divides to form gametes: copies of the genetic information are made; the cell divides twice to form four gametes, each with a single set of chromosomes; all gametes are genetically different from each other." Red = from mother, blue = from father. Long and short = two different chromosome pairs. The diagram is simplified: gametes from the same first-division cell look identical here, but in real meiosis sections of chromosomes are swapped (crossing over, beyond GCSE), so all four gametes differ.');
}

{
  const s = frame('Fertilisation and development', { tag: '4.6.1.2' });
  flow(s, [['Sperm', '23 chromosomes'], ['Egg', '23 chromosomes'], ['Fertilisation', 'gametes join: 46 chromosomes'], ['Mitosis', 'the new cell divides many times'], ['Embryo', 'cells differentiate']], 1.5, 2.0, 17, [BL, RL, C.maroon, C.green, C.green]);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 3.85, h = 3.0;
  headCard(s, MX, top, cw, h, 'Mitosis', C.green, C.greenSoft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['**Two** cells, **identical**', '**Full set** of chromosomes', 'Growth, repair, asexual reproduction'], 18, 0.12);
  headCard(s, MX + cw + gap, top, cw, h, 'Meiosis', C.maroon, C.soft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['**Four** cells, **all different**', '**Half** the chromosomes (one set)', 'Making gametes'], 18, 0.12);
  notes(s, 'Spec: "Gametes join at fertilisation to restore the normal number of chromosomes. The new cell divides by mitosis. The number of cells increases. As the embryo develops cells differentiate." Why halve the chromosomes? So the zygote has the normal number (46), not 92.');
}

D.myTurnYourTurn({
  title: 'Mitosis or meiosis?', tag: 'Part 2', stepSize: 20, labelW: 3.0, labelSize: 18, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Mitosis or meiosis?',
    steps: [
      { label: 'Makes four cells', text: '**Meiosis**' },
      { label: 'Repairs a cut', text: '**Mitosis**' },
      { label: 'Cells are identical', text: '**Mitosis**' },
      { label: 'Happens in testes', text: '**Meiosis**' },
    ],
  },
  yours: {
    q: 'Mitosis or meiosis?',
    steps: [
      { label: 'Divides twice', text: '**Meiosis**' },
      { label: 'Embryo grows', text: '**Mitosis**' },
      { label: 'Half the chromosomes', text: '**Meiosis**' },
      { label: 'Strawberry runners', text: '**Mitosis**' },
    ],
  },
  notes: 'Strawberry runners are asexual reproduction, so only mitosis.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: DNA and the genome', { tag: '4.6.1.4' });
  flow(s, [['Nucleus', 'contains chromosomes'], ['Chromosome', 'one very long DNA molecule'], ['Gene', 'a small section of DNA'], ['Protein', 'each gene codes for one protein']], 1.45, 1.9, 17);
  rect(s, MX, 3.6, W - 2 * MX, 0.95, C.soft, C.line);
  txt(s, 'DNA is a **polymer** made of **two strands** forming a **double helix**. The **genome** is all of an organism\'s genetic material.', MX + 0.3, 3.6, W - 2 * MX - 0.6, 0.95, { size: 19, valign: 'middle' });
  headCard(s, MX, 4.75, W - 2 * MX, 2.1, 'Why studying the human genome matters', C.green, C.greenSoft);
  bullets(s, MX + 0.3, 5.42, W - 2 * MX - 0.6, ['Search for genes linked to **diseases**; understand and treat **inherited disorders**.', 'Trace **human migration** patterns from the past.'], 18, 0.1);
  notes(s, 'Spec 4.6.1.4: "The whole human genome has now been studied and this will have great importance for medicine in the future." Students should be able to discuss the importance of understanding the human genome: these three points.');
}

{
  const s = frame('The structure of DNA', { tag: '4.6.1.5' });
  const x1 = MX + 1.0, x2 = MX + 3.6, y0 = 1.6, seq = 'ATGCCA';
  vline(s, x1, y0, y0 + 4.9, '8C7A5B', 8); vline(s, x2, y0, y0 + 4.9, '8C7A5B', 8);
  seq.split('').forEach((b, i) => {
    const y = y0 + 0.35 + i * 0.78, p = PAIR[b], mid = (x1 + x2) / 2;
    rect(s, x1 + 0.06, y, mid - x1 - 0.08, 0.45, BASE[b]); txt(s, b, x1 + 0.06, y, mid - x1 - 0.08, 0.45, { size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' });
    rect(s, mid + 0.02, y, x2 - mid - 0.08, 0.45, BASE[p]); txt(s, p, mid + 0.02, y, x2 - mid - 0.08, 0.45, { size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' });
  });
  txt(s, 'sugar–phosphate backbone', x1 - 0.6, y0 + 5.0, 4.4, 0.35, { size: 13, color: C.grey, align: 'center' });
  // nucleotide inset
  const nx = MX + 4.9;
  txt(s, 'One nucleotide', nx, 1.5, 3, 0.4, { size: 17, bold: true, color: C.maroon });
  circle(s, nx + 0.45, 2.45, 0.6, 'F6E7A8', 'C9A227', 1.5); txt(s, 'P', nx + 0.15, 2.15, 0.6, 0.6, { size: 16, bold: true, align: 'center', valign: 'middle' });
  rect(s, nx + 0.85, 2.15, 0.75, 0.6, 'D9D2C3', '8C7A5B'); txt(s, 'sugar', nx + 0.85, 2.15, 0.75, 0.6, { size: 12, bold: true, align: 'center', valign: 'middle' });
  rect(s, nx + 1.7, 2.15, 0.85, 0.6, BASE.A); txt(s, 'base', nx + 1.7, 2.15, 0.85, 0.6, { size: 13, bold: true, color: C.white, align: 'center', valign: 'middle' });
  txt(s, 'phosphate + sugar + one of four bases', nx, 2.85, 3.4, 0.4, { size: 13, color: C.grey });
  const bx = MX + 8.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Key facts', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['DNA is made of repeating **nucleotides**.', 'Four bases: **A, T, C, G**.', 'Bases pair across the strands: **A with T**, **C with G** (complementary pairs).', 'The **order of bases** is the genetic code.'], 16, 0.2);
  rect(s, nx, 3.55, 3.5, 2.95, C.greyLight, C.line);
  txt(s, 'Base pairing rule', nx + 0.2, 3.65, 3.1, 0.4, { size: 17, bold: true, color: C.maroon });
  [['A', 'T'], ['C', 'G']].forEach(([a, b], i) => {
    const y = 4.25 + i * 0.95;
    rect(s, nx + 0.4, y, 0.75, 0.6, BASE[a]); txt(s, a, nx + 0.4, y, 0.75, 0.6, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, '↔', nx + 1.2, y, 0.8, 0.6, { size: 22, bold: true, align: 'center', valign: 'middle' });
    rect(s, nx + 2.05, y, 0.75, 0.6, BASE[b]); txt(s, b, nx + 2.05, y, 0.75, 0.6, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
  });
  notes(s, 'Spec 4.6.1.5 (separate Biology only): "DNA is a polymer made from four different nucleotides. Each nucleotide consists of a common sugar and phosphate group with one of four different bases attached to the sugar... The long strands of DNA consist of alternating sugar and phosphate sections. Attached to each sugar is one of the four bases. In the complementary strands a C is always linked to a G on the opposite strand and a T to an A." The ladder is drawn straight; real DNA twists into a double helix.');
}

D.myTurnYourTurn({
  title: 'Base pairing', tag: 'Maths skill', stepSize: 21, labelW: 2.6, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: 'Pair: ATTGCA', text: '**TAACGT**' },
      { label: '30% A: % of T?', text: '**30%**' },
      { label: '30% A: % of G?', text: '**20%**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: 'Pair: GCATTC', text: '**CGTAAG**' },
      { label: '15% C: % of G?', text: '**15%**' },
      { label: '15% C: % of A?', text: '**35%**' },
    ],
  },
  notes: 'A = T and C = G, so A + T + C + G = 100%. Mine: A + T = 60%, so C + G = 40%, G = 20%. Yours: C + G = 30%, A + T = 70%, A = 35%.',
});

D.hinge({
  title: 'Quick check',
  q: 'Which base always pairs with cytosine (C)?',
  options: ['Guanine (G)', 'Adenine (A)', 'Thymine (T)', 'Cytosine (C)'],
  correct: 0,
  notes: 'Answer A. A pairs with T.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: how a gene makes a protein', HT);
  flow(s, [['Code', 'the order of bases in a gene; 3 bases code for 1 amino acid'], ['Template', 'a copy of the gene leaves the nucleus'], ['Ribosome', 'reads the template'], ['Carriers', 'carrier molecules bring the right amino acids'], ['Protein', 'amino acids join in order, then fold into a shape']], 1.5, 2.55, 15, [C.maroon, C.accent, C.blue, C.orange, C.green]);
  rect(s, MX, 4.35, W - 2 * MX, 2.5, C.soft, C.line);
  txt(s, 'Why the shape matters', MX + 0.3, 4.45, 6, 0.45, { size: 20, bold: true, color: C.maroon });
  bullets(s, MX + 0.3, 5.0, W - 2 * MX - 0.6, ['The protein folds into a **specific shape**, which lets it do its job.', 'Examples: **enzymes** (active site), **hormones**, structural proteins such as **collagen**.', 'A gene of 900 bases codes for 900 ÷ 3 = **300 amino acids**.'], 18, 0.1);
  notes(s, 'HT 4.6.1.5: "A sequence of three bases is the code for a particular amino acid. The order of bases controls the order in which amino acids are assembled to produce a particular protein... proteins are synthesised on ribosomes, according to a template. Carrier molecules bring specific amino acids to add to the growing protein chain in the correct order. When the protein chain is complete it folds up to form a unique shape." The template is mRNA and the carriers are tRNA: not required names.');
}

{
  const s = frame('Mutations and non-coding DNA', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Mutations', C.red, 'FBEDEB');
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['A **change in the DNA**. They happen all the time.', 'Most have **no effect** on the protein.', 'Some change the **amino acid order**, so the protein folds into a **different shape**.', 'E.g. an enzyme\'s **active site** changes: the substrate no longer fits, so it **stops working**. A structural protein may lose its **strength**.'], 17, 0.2);
  headCard(s, MX + cw + gap, top, cw, h, 'Non-coding DNA', C.maroon, C.soft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Not all DNA codes for proteins.', 'Some non-coding parts **switch genes on and off**.', 'A mutation here can change **whether a gene is expressed**.'], 17, 0.2);
  notes(s, 'HT 4.6.1.5: "Mutations occur continuously. Most do not alter the protein, or only alter it slightly so that its appearance or function is not changed. A few mutations code for an altered protein with a different shape. An enzyme may no longer fit the substrate binding site or a structural protein may lose its strength. Not all parts of DNA code for proteins. Non-coding parts of DNA can switch genes on and off, so variations in these areas of DNA may affect how genes are expressed."');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'How many bases code for one amino acid?',
  options: ['3', '1', '2', '4'],
  correct: 0,
  notes: 'Answer A: a triplet of three bases. So a gene of 1200 bases codes for 400 amino acids.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Name the gametes in animals.', 'Sperm and egg'], ['How many chromosomes are in a human gamete?', '23'], ['Which base pairs with A?', 'T (thymine)'], ['What is a genome?', 'All of an organism\'s genetic material'],
    ['Why does sexual reproduction lead to variation?', 'Genetic information from two parents is mixed'], ['Give one advantage of asexual reproduction.', 'One parent; faster; many offspring quickly'],
    ['A DNA sample is 22% G. What % is A?', '28%'], ['HT  A gene has 1500 bases. How many amino acids does it code for?', '500'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) sperm and egg  2) 23  3) T  4) the entire genetic material of an organism  5) gametes from two parents fuse, mixing genetic information; meiosis makes different gametes  6) only one parent; faster; no energy finding a mate; many identical offspring in good conditions  7) G = C = 22%, so A + T = 56%, A = 28%  8) 1500 ÷ 3 = 500.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Name the type of cell division that makes gametes, and give the number of chromosomes in a human gamete.', m: 2, lines: 0 },
    { l: 'b', q: 'Describe what happens during this type of cell division.', m: 3, lines: 1 },
    { l: 'c', q: 'A sample of DNA is 18% cytosine. Calculate the percentage of adenine. Show your working.', m: 2, lines: 1 },
    { l: 'd', q: 'HT  A mutation changes one base in the gene for an enzyme. Explain how this could stop the enzyme working.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'meiosis; 23', '2', ''],
    ['(b)', 'chromosomes copied; cell divides twice; four gametes with a single set, all genetically different', '3', ''],
    ['(c)', 'G = 18%, so A + T = 64%; A = 32%', '2', ''],
    ['(d)', 'different amino acid (sequence); protein folds into a different shape; active site changes so the substrate no longer fits', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['How many gametes does meiosis make from one cell?', 'Give one organism that reproduces both sexually and asexually.', 'What are the parts of a nucleotide?', 'HT  What do carrier molecules do in protein synthesis?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) four  2) malaria parasite, fungi, strawberry plant or daffodil  3) phosphate, sugar and a base  4) bring specific amino acids to the ribosome in the right order. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Compare sexual and asexual reproduction in a table.',
    'Explain why gametes must have half the number of chromosomes.',
    'Draw and label a short section of DNA with six base pairs.',
    'Write the complementary strand for: A A G C T G C T',
    'HT  How many amino acids does a 2400-base gene code for?',
    'HT  Explain how non-coding DNA can affect an organism.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) parents, gametes, cell division, variation, examples  2) so fertilisation restores the normal number (46), not double it  3) two backbones, bases paired A–T and C–G  4) T T C G A C G A  5) 2400 ÷ 3 = 800  6) non-coding parts switch genes on and off; mutations there change whether genes are expressed.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.6_A_ReproductionMeiosisDNA.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
