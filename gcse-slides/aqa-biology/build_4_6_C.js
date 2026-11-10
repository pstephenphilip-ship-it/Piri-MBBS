// build_4_6_C.js — AQA GCSE Biology (8461) 4.6 Inheritance, variation and evolution, lesson 3 of 4:
// 4.6.2.1 Variation, 4.6.2.2 Evolution (natural selection), 4.6.2.3 Selective breeding,
// 4.6.2.4 Genetic engineering (HT: the process), 4.6.2.5 Cloning.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_6_C.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.6.2', title: 'Variation, breeding and cloning',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const pct = (a, b) => Math.round((b - a) / a * 1000) / 10;

// ======================= numbers (all checked) =======================
calc('milk', pct(4000, 9000), 125); calc('P8', pct(2.5, 4), 60); calc('exam', pct(1200, 1500), 25); calc('HW', pct(20, 26), 30);

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
function twoCards(s, top, h, a, b, ca = C.green, cb = C.red, fa = C.greenSoft, fb = 'FBEDEB', size = 18) {
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, top, cw, h, a[0], ca, fa); bullets(s, MX + 0.25, top + 0.8, cw - 0.5, a[1], size, 0.18);
  headCard(s, MX + cw + gap, top, cw, h, b[0], cb, fb); bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, b[1], size, 0.18);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Causes of variation, natural selection, selective breeding, genetic engineering and cloning',
  bullets: ['Part 1: variation and natural selection (4.6.2.1, 4.6.2.2)', 'Part 2: selective breeding (4.6.2.3)', 'Part 3: genetic engineering (4.6.2.4; HT: the process)', 'Part 4: cloning (4.6.2.5)'],
  notes: 'AQA 8461 GCSE Biology 4.6, lesson 3 of 4. Lesson 4: Darwin, Lamarck, Wallace and speciation, evidence for evolution, fossils, extinction, resistant bacteria and classification. Cloning (4.6.2.5) is separate Biology only. HT only: the steps of genetic engineering. About two hours.',
});

D.objectives({
  tag: '4.6.2',
  items: [
    'Explain the causes of **variation** and how **natural selection** leads to evolution.',
    'Describe **selective breeding** and its risks.',
    'Describe **genetic engineering**, its benefits and concerns. **HT:** describe the steps.',
    'Describe how plants and animals are **cloned**, and evaluate cloning.',
  ],
  keywords: ['variation', 'mutation', 'natural selection', 'selective breeding', 'vector', 'clone'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is an allele?', 'Name the type of cell division that makes clones.', 'What is a mutation?', 'Why does sexual reproduction give variation?'],
  answers: ['A version of a gene', 'Mitosis', 'A change in the DNA', 'Genetic information from two parents is mixed'],
  notes: 'Retrieval from lessons 1 and 2.',
});

D.vocab({
  title: 'Key words', tag: '4.6.2',
  items: [
    { term: 'Variation', def: 'Differences between individuals of the same species: **genetic**, **environmental**, or both.' },
    { term: 'Natural selection', def: 'Individuals **best suited** to their environment survive and **breed**, passing on their alleles.' },
    { term: 'Selective breeding', def: '**Humans choose** parents with useful characteristics to breed together.' },
    { term: 'Genetic engineering', def: 'Changing an organism\'s genome by adding a **gene from another organism**.' },
  ],
  notes: 'Also: clone (genetically identical organism), vector (plasmid or virus that carries a gene into a cell).',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: variation', { tag: '4.6.2.1' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 3.35;
  [['Genetic', C.maroon, C.soft, 'Caused by the **alleles** inherited.', 'Blood group, eye colour'], ['Environmental', C.green, C.greenSoft, 'Caused by **conditions** in which it developed.', 'Scars, language, tattoos'], ['Both', C.orange, C.orangeSoft, 'Genes set a range; environment decides where in it.', 'Height, body mass']].forEach(([a, col, f, b, e], i) => {
    const x = MX + i * (cw + gap);
    headCard(s, x, top, cw, h, a, col, f);
    txt(s, b, x + 0.2, top + 0.8, cw - 0.4, 1.4, { size: 18 });
    txt(s, 'e.g. ' + e, x + 0.2, top + h - 0.9, cw - 0.4, 0.7, { size: 17, bold: true, color: col });
  });
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.soft, C.line);
  bullets(s, MX + 0.3, 5.15, W - 2 * MX - 0.6, ['There is usually **a lot of genetic variation** in a population.', '**Mutations** happen all the time. Very rarely one gives a **new phenotype**.', 'If the new phenotype suits the environment, it can spread **quickly**.'], 17, 0.08);
  notes(s, 'Spec 4.6.2.1: "Differences in the characteristics of individuals in a population is called variation and may be due to differences in: the genes they have inherited (genetic causes); the conditions in which they have developed (environmental causes); or a combination of genes and the environment." Most mutations have no effect on the phenotype.');
}

{
  const s = frame('Natural selection', { tag: '4.6.2.2' });
  flow(s, [['Variation', 'individuals differ, because of mutations and sexual reproduction'], ['Competition', 'for food, mates, territory; predators and disease'], ['Survival', 'the best suited survive'], ['Breeding', 'they reproduce and pass on their alleles'], ['Evolution', 'over many generations the useful allele becomes common']], 1.45, 2.55, 15, [C.maroon, C.accent, C.blue, C.orange, C.green]);
  rect(s, MX, 4.3, W - 2 * MX, 1.25, C.soft, C.line);
  txt(s, '**Evolution** is a change in the inherited characteristics of a population over time through natural selection. It may produce a **new species**.', MX + 0.3, 4.3, W - 2 * MX - 0.6, 1.25, { size: 19, valign: 'middle' });
  rect(s, MX, 5.75, W - 2 * MX, 1.1, C.orangeSoft, 'F3D9B5');
  txt(s, '**New species:** two populations have changed so much they can **no longer interbreed** to produce **fertile** offspring.', MX + 0.3, 5.75, W - 2 * MX - 0.6, 1.1, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.6.2.2: "The theory of evolution by natural selection states that all species of living things have evolved from simple life forms that first developed more than three billion years ago." Common error: "the animal adapted to survive" or "it mutated because it needed to". Individuals do not change: the population changes because some survive and breed.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which statement about natural selection is correct?',
  options: ['Individuals with useful alleles are more likely to survive and breed', 'Animals change their genes to suit their environment', 'Mutations happen because the animal needs them', 'All individuals in a population have the same chance of surviving'],
  correct: 0,
  notes: 'Answer A. B and C are Lamarckian thinking (lesson 4): mutations are random. D: variation means some are better suited.',
});

D.myTurnYourTurn({
  title: 'Explaining natural selection', tag: 'Exam skill', stepSize: 19, labelW: 1.85, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Arctic hares have white fur. Explain how this evolved.  [4 marks]',
    steps: [
      { label: 'Variation', text: '**Fur colour varied**' },
      { label: 'Survival', text: '**White hares hidden**' },
      { label: 'Breeding', text: '**Pass on the white-fur allele**' },
      { label: 'Over time', text: '**Most of population white**' },
    ],
  },
  yours: {
    q: 'Cacti have spines. Explain how this evolved.  [4 marks]',
    steps: [
      { label: 'Variation', text: '**Some had spines**' },
      { label: 'Survival', text: '**Less eaten by animals**' },
      { label: 'Breeding', text: '**Pass on the spine allele**' },
      { label: 'Over time', text: '**Spines become common**' },
    ],
  },
  notes: 'Always use the word allele and "over many generations". Never say the hare "turned white to survive".',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: selective breeding', { tag: '4.6.2.3' });
  flow(s, [['Choose', 'parents with the desired characteristic'], ['Breed', 'them together'], ['Select', 'the best offspring'], ['Repeat', 'over many generations, until all offspring show it']], 1.45, 2.0, 16);
  const gap = 0.3, cw = (W - 2 * MX - 3 * gap) / 4, top = 3.75, h = 1.7;
  [['Food crops', 'disease resistance'], ['Dairy cattle', 'more milk'], ['Dogs', 'gentle nature'], ['Flowers', 'large or unusual blooms']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.green, C.greenSoft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, 0.85, { size: 18 });
  });
  rect(s, MX, 5.65, W - 2 * MX, 1.2, C.orangeSoft, 'F3D9B5');
  txt(s, '**Data:** milk yield per cow rose from 4000 to 9000 litres a year: an increase of 5000 ÷ 4000 × 100 = **125%**.', MX + 0.3, 5.65, W - 2 * MX - 0.6, 1.2, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.6.2.3: "Selective breeding (artificial selection) is the process by which humans breed plants and animals for particular genetic characteristics. Humans have been doing this for thousands of years since they first bred food crops from wild plants and domesticated animals." Illustrative milk data.');
}

{
  const s = frame('The risks of selective breeding', { tag: '4.6.2.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.15, C.soft, C.line);
  txt(s, 'Breeding closely related animals is called **inbreeding**. It reduces the **variety of alleles** (the gene pool) in the population.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.15, { size: 19, valign: 'middle' });
  twoCards(s, 2.8, 4.05, ['Problems', ['Some breeds are prone to **disease** or **inherited defects** (e.g. breathing problems in flat-faced dogs).', 'With little variation, a **new disease** could wipe out the whole population: none would be resistant.']], ['Why it still happens', ['Higher **yields** and better **food**.', 'Pets with a **gentle nature**; attractive **flowers**.', 'Much **faster** than waiting for natural selection.']], C.red, C.green, 'FBEDEB', C.greenSoft, 18);
  notes(s, 'Spec 4.6.2.3: "Selective breeding can lead to \'inbreeding\' where some breeds are particularly prone to disease or inherited defects." Students should be able to explain the benefits and risks.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why can inbreeding be a problem?',
  options: ['It reduces variation, so harmful recessive alleles are more likely to pair up', 'It creates new mutations', 'It makes animals reproduce asexually', 'It increases the number of different alleles'],
  correct: 0,
  notes: 'Answer A. Related parents often carry the same recessive alleles. B, C, D are false.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: genetic engineering', { tag: '4.6.2.4' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 2.7;
  [['Bacteria', 'Given the human gene for **insulin**, to treat diabetes.'], ['GM crops', 'Resistant to **insects** or **herbicides**; bigger, better fruit.'], ['Gene therapy', 'Possible future use: overcome some **inherited disorders**.']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 18 });
  });
  twoCards(s, 4.3, 2.55, ['Benefits', ['Bigger **yields**; less pesticide; insulin made cheaply.']], ['Concerns', ['Effect on **wild plants and insects**; long-term **health** effects not fully known.']], C.green, C.red, C.greenSoft, 'FBEDEB', 17);
  notes(s, 'Spec 4.6.2.4: "Genetic engineering is a process which involves modifying the genome of an organism by introducing a gene from another organism to give a desired characteristic. Plant crops have been genetically engineered to be resistant to diseases or to produce bigger better fruits. Bacterial cells have been genetically engineered to produce useful substances such as human insulin to treat diabetes." Students should explain the potential benefits and risks.');
}

{
  const s = frame('How genetic engineering is done', HT);
  flow(s, [['1  Cut', 'enzymes cut out the required gene'], ['2  Vector', 'gene put into a vector: a plasmid or a virus'], ['3  Insert', 'vector carries the gene into the cells'], ['4  Early stage', 'in plants and animals, genes go in at an early stage'], ['5  Result', 'organism has the desired characteristic']], 1.5, 2.5, 15, [C.maroon, C.accent, C.blue, C.orange, C.green]);
  // plasmid sketch
  const cx = MX + 2.5, cy = 5.3;
  D.circle(s, cx, cy, 2.0, C.white, C.accent, 4);
  rect(s, cx + 0.75, cy - 0.3, 0.45, 0.6, C.red);
  txt(s, 'plasmid (ring of DNA in bacteria)', MX + 0.1, 6.4, 5, 0.4, { size: 14, color: C.grey });
  txt(s, 'new gene', cx + 1.3, cy - 0.2, 1.5, 0.4, { size: 14, bold: true, color: C.red });
  const bx = MX + 6.0, bw = W - MX - bx;
  rect(s, bx, 4.2, bw, 2.65, C.soft, C.line);
  txt(s, 'Example: insulin', bx + 0.25, 4.3, bw - 0.5, 0.45, { size: 19, bold: true, color: C.maroon });
  txt(s, 'The human insulin gene is put into a plasmid, the plasmid into a bacterium. The bacteria multiply in a **fermenter** and make insulin, which is collected and purified.', bx + 0.25, 4.8, bw - 0.5, 2.0, { size: 17 });
  notes(s, 'HT 4.6.2.4: "Enzymes are used to isolate the required gene. This gene is inserted into a vector, usually a bacterial plasmid or a virus. The vector is used to insert the gene into the required cells. Genes are transferred to the cells of animals, plants or microorganisms at an early stage in their development so that they develop with desired characteristics."');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'What is a vector in genetic engineering?',
  options: ['A plasmid or virus that carries the gene into a cell', 'The enzyme that cuts out the gene', 'The organism that donates the gene', 'A fermenter'],
  correct: 0,
  notes: 'Answer A. B: restriction enzymes (name not required). C: the donor. D grows the bacteria.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: cloning plants', { tag: '4.6.2.5' });
  twoCards(s, 1.4, 3.6, ['Tissue culture', ['Small groups of cells from part of a plant grow into **new plants**, on a nutrient medium.', 'Used to preserve **rare** species and in **nurseries**.']], ['Cuttings', ['An older but simple method used by **gardeners**.', 'A piece of stem is cut off and planted; it grows **roots**.', 'Rooting powder (auxin) helps.']], C.green, C.maroon, C.greenSoft, C.soft, 18);
  rect(s, MX, 5.25, W - 2 * MX, 1.6, C.orangeSoft, 'F3D9B5');
  txt(s, 'The new plants are **clones**: genetically identical to the parent. Good for keeping useful features, but **no variation**, so all may be killed by one disease.', MX + 0.3, 5.25, W - 2 * MX - 0.6, 1.6, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.6.2.5 (separate Biology only). Tissue culture: "using small groups of cells from part of a plant to grow identical new plants. This is important for preserving rare plant species or commercially in nurseries." Cuttings: "an older, but simple, method used by gardeners to produce many identical new plants from a parent plant."');
}

{
  const s = frame('Cloning animals', { tag: '4.6.2.5' });
  rect(s, MX, 1.4, W - 2 * MX, 1.05, C.soft, C.line);
  txt(s, '**Embryo transplants:** cells are split apart from a developing animal embryo **before they specialise**. The identical embryos are put into **host mothers**.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.05, { size: 18, valign: 'middle' });
  txt(s, 'Adult cell cloning', MX, 2.6, 6, 0.45, { size: 20, bold: true, color: C.maroon });
  flow(s, [['1  Remove', 'the nucleus from an unfertilised egg'], ['2  Insert', 'the nucleus from an adult body cell'], ['3  Shock', 'an electric shock makes the egg divide'], ['4  Implant', 'the embryo goes into a host mother'], ['5  Clone', 'identical to the adult that gave the nucleus']], 3.15, 2.3, 15, [C.maroon, C.accent, C.orange, C.blue, C.green]);
  rect(s, MX, 5.7, W - 2 * MX, 1.15, C.orangeSoft, 'F3D9B5');
  txt(s, 'Dolly the sheep (1996) was the first mammal cloned from an adult cell.', MX + 0.3, 5.7, W - 2 * MX - 0.6, 1.15, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.6.2.5: "The nucleus is removed from an unfertilised egg cell. The nucleus from an adult body cell, such as a skin cell, is inserted into the egg cell. An electric shock stimulates the egg cell to divide to form an embryo. These embryo cells contain the same genetic information as the adult skin cell. When the embryo has developed into a ball of cells, it is inserted into the womb of an adult female to continue its development." The clone is identical to the nucleus donor, not the egg donor or the host mother.');
}

{
  const s = frame('Evaluating cloning', { tag: '4.6.2.5' });
  twoCards(s, 1.4, 4.2, ['Advantages', ['Copies animals or plants with **useful** characteristics.', 'Quick, many identical offspring.', 'Could save **endangered** species; medical research.']], ['Disadvantages', ['**No variation**: a disease could kill them all.', 'Clones may have **health problems** and shorter lives.', '**Ethical** concerns, especially about cloning humans.']], C.green, C.red, C.greenSoft, 'FBEDEB', 18);
  rect(s, MX, 5.8, W - 2 * MX, 1.05, C.soft, C.line);
  txt(s, 'A good evaluation gives **both sides** and a **justified conclusion**.', MX + 0.3, 5.8, W - 2 * MX - 0.6, 1.05, { size: 19, valign: 'middle' });
  notes(s, 'Students should be able to explain the potential benefits and risks of cloning in agriculture and medicine and that some people have ethical objections.');
}

D.myTurnYourTurn({
  title: 'Describing processes', tag: 'Exam skill', stepSize: 19, labelW: 1.85, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Describe how a sheep is cloned from an adult cell.  [4 marks]',
    steps: [
      { label: 'Egg', text: '**Remove nucleus from egg**' },
      { label: 'Nucleus', text: '**Insert adult cell nucleus**' },
      { label: 'Shock', text: '**Electric shock: it divides**' },
      { label: 'Implant', text: '**Embryo into host mother**' },
    ],
  },
  yours: {
    q: 'HT  Describe how bacteria are engineered to make human insulin.  [4 marks]',
    steps: [
      { label: 'Cut', text: '**Enzymes cut out the gene**' },
      { label: 'Vector', text: '**Gene put into a plasmid**' },
      { label: 'Insert', text: '**Plasmid into bacterium**' },
      { label: 'Grow', text: '**Bacteria make insulin**' },
    ],
  },
  notes: 'Both are 4-step processes: each step in order is a mark.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Give one example of environmental variation.', 'A scar (or language)'], ['What is a new species?', 'Can no longer interbreed to give fertile offspring'], ['Name one plant cloning method.', 'Tissue culture or cuttings'], ['Give one use of genetically engineered bacteria.', 'Making human insulin'],
    ['Give one risk of selective breeding.', 'Inbreeding: disease or defects'], ['Why are clones at risk from a new disease?', 'No variation: none may be resistant'],
    ['HT  Name two vectors used in genetic engineering.', 'Plasmids and viruses'], ['Wheat yield rose from 2.5 to 4 tonnes per hectare. % increase?', '60%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) scars, tattoos, language, accent  2) populations so different they cannot interbreed to produce fertile offspring  3) tissue culture, cuttings  4) making human insulin  5) inbreeding; prone to disease or inherited defects; reduced variation  6) genetically identical, so if one is not resistant, none are  7) bacterial plasmids and viruses  8) 1.5 ÷ 2.5 × 100 = 60%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Rabbits in a cold region have thicker fur than rabbits elsewhere. Explain how natural selection led to this.', m: 4, lines: 2 },
    { l: 'b', q: 'A farmer used selective breeding to raise the mean mass of his lambs from 1200 g to 1500 g. Calculate the percentage increase.', m: 2, lines: 1 },
    { l: 'c', q: 'HT  Describe how a gene for pest resistance could be put into a crop plant.', m: 3, lines: 1 },
    { l: 'd', q: 'Give one disadvantage of growing a field of cloned crop plants.', m: 1, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'variation in fur thickness (mutation); thicker-furred rabbits survive the cold; breed and pass on the allele; over many generations allele becomes common', '4', ''],
    ['(b)', '300 ÷ 1200 × 100 = 25%', '2', '1 for 300 ÷ 1200'],
    ['(c)', 'enzymes cut out the gene; inserted into a vector (plasmid / virus); put into plant cells at an early stage', '3', ''],
    ['(d)', 'no variation, so a disease could kill them all', '1', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Give an example of variation caused by both genes and the environment.', 'What is inbreeding?', 'In adult cell cloning, what makes the egg divide?', 'Who is a cloned sheep identical to?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) height or body mass  2) breeding closely related individuals  3) an electric shock  4) the adult that gave the body-cell nucleus. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain how antibiotic-resistant bacteria could evolve by natural selection.',
    'Describe how a farmer could breed cows that give more milk.',
    'Evaluate growing genetically modified crops.',
    'HT  Describe the steps in genetic engineering.',
    'Tomato mass rose from 20 g to 26 g after selective breeding. % increase?',
    'Compare embryo transplants with adult cell cloning.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) mutation gives resistance; antibiotic kills others; resistant survive and reproduce  2) choose high-yield cows and bulls from high-yield mothers; breed; select best; repeat over generations  3) benefits and concerns with a conclusion  4) enzymes cut gene; vector; insert at early stage  5) 6 ÷ 20 × 100 = 30%  6) embryo transplants copy an embryo whose features are unknown; adult cell cloning copies a known adult.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.6_C_VariationBreedingCloning.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
