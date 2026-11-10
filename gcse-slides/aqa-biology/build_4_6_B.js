// build_4_6_B.js — AQA GCSE Biology (8461) 4.6 Inheritance, variation and evolution, lesson 2 of 4:
// 4.6.1.6 Genetic inheritance (HT: constructing Punnett squares), 4.6.1.7 Inherited disorders,
// 4.6.1.8 Sex determination, 4.6.3.3 The understanding of genetics (Mendel).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_6_B.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.6.1.6–4.6.1.8', title: 'Genetic inheritance',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// genotype of a child: dominant (capital) first
const kid = (a, b) => (a < b ? a + b : b + a).replace(/^([a-z])([A-Z])$/, '$2$1');
const cross = (p, q) => [p[0], p[1]].flatMap(a => [q[0], q[1]].map(b => kid(a, b)));
const pctWith = (p, q, f) => cross(p, q).filter(f).length / 4 * 100;
const hasCap = g => /[A-Z]/.test(g);

// ======================= numbers (all checked) =======================
calc('Bb x Bb black', pctWith('Bb', 'Bb', hasCap), 75); calc('Bb x Bb white', pctWith('Bb', 'Bb', g => !hasCap(g)), 25);
calc('MT Tt x tt', pctWith('Tt', 'tt', hasCap), 50); calc('YT TT x Tt', pctWith('TT', 'Tt', hasCap), 100);
calc('CF', pctWith('Ff', 'Ff', g => g === 'ff'), 25); calc('CF carrier', pctWith('Ff', 'Ff', g => g === 'Ff'), 50);
calc('poly', pctWith('Dd', 'dd', hasCap), 50);
calc('sex', cross('XX', 'XY').filter(g => g.includes('Y')).length / 4 * 100, 50);
calc('P7', 120 * 0.75, 90); calc('exam', 200 * 0.25, 50); calc('HW', 80 * 0.5, 40);

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
// Punnett square: parent 1 gametes across the top, parent 2 down the side; hl(genotype) => fill colour
function punnett(s, x, y, c, p1, p2, hl = () => C.white, size = 24) {
  rect(s, x, y, c, c, C.greyLight, C.line);
  [0, 1].forEach(i => {
    rect(s, x + c * (i + 1), y, c, c, C.soft, C.line); txt(s, p1[i], x + c * (i + 1), y, c, c, { size, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
    rect(s, x, y + c * (i + 1), c, c, C.soft, C.line); txt(s, p2[i], x, y + c * (i + 1), c, c, { size, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  });
  [0, 1].forEach(r => [0, 1].forEach(k => {
    const g = kid(p1[k], p2[r]);
    rect(s, x + c * (k + 1), y + c * (r + 1), c, c, hl(g), C.line);
    txt(s, g, x + c * (k + 1), y + c * (r + 1), c, c, { size, bold: true, align: 'center', valign: 'middle' });
  }));
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Alleles, genotypes and phenotypes, Punnett squares and probability, inherited disorders, embryo screening, sex determination and Mendel',
  bullets: ['Part 1: genetic terms and Punnett squares (4.6.1.6)', 'Part 2: inherited disorders and embryo screening (4.6.1.7)', 'Part 3: sex determination and Mendel (4.6.1.8, 4.6.3.3)'],
  notes: 'AQA 8461 GCSE Biology 4.6, lesson 2 of 4. HT only: constructing Punnett squares and using them to make predictions (Foundation students complete given ones). Mendel (4.6.3.3) is separate Biology only. About two hours.',
});

D.objectives({
  tag: '4.6.1.6–4.6.1.8',
  items: [
    'Use **allele, dominant, recessive, homozygous, heterozygous, genotype, phenotype**.',
    '**HT:** construct **Punnett squares** and give **ratios** and **probabilities**.',
    'Explain how **cystic fibrosis** and **polydactyly** are inherited; discuss **embryo screening**.',
    'Explain **sex determination**, and why **Mendel\'s** work was important.',
  ],
  keywords: ['allele', 'dominant', 'recessive', 'genotype', 'phenotype', 'carrier'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['How many chromosomes are in a human gamete?', 'What is a gene?', 'Simplify the ratio 75 : 25.', 'Write ¼ as a percentage.'],
  answers: ['23', 'A section of DNA that codes for a protein', '3 : 1', '25%'],
  notes: 'Retrieval from lesson 1, plus the maths for today: ratios and percentages.',
});

D.vocab({
  title: 'Key words', tag: '4.6.1.6',
  items: [
    { term: 'Allele', def: 'A **version of a gene**. We inherit **two** alleles for each gene, one from each parent.' },
    { term: 'Dominant / recessive', def: 'A **dominant** allele (capital letter) shows with **one** copy; a **recessive** one (small letter) only with **two**.' },
    { term: 'Homozygous / heterozygous', def: '**Same** two alleles (BB or bb) / **different** alleles (Bb).' },
    { term: 'Genotype / phenotype', def: 'The **alleles** present (e.g. Bb) / the **characteristic** you see (e.g. black fur).' },
  ],
  notes: 'Most characteristics are controlled by several genes interacting; a few, like those today, by a single gene.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: genotype and phenotype', { tag: '4.6.1.6' });
  txt(s, 'Mouse fur colour:  **B** = black (dominant),  **b** = white (recessive)', MX, 1.4, W - 2 * MX, 0.5, { size: 22 });
  const rows = [['BB', 'homozygous dominant', 'black', '333333'], ['Bb', 'heterozygous', 'black', '333333'], ['bb', 'homozygous recessive', 'white', 'F2F2F2']];
  const cws = [2.0, 4.6, 2.5, 2.6];
  ['Genotype', 'Name', 'Phenotype', ''].forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 2.15, cws[j], 0.6, C.maroon); txt(s, t, x + 0.2, 2.15, cws[j] - 0.4, 0.6, { size: 18, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => {
    const y = 2.75 + i * 0.95;
    r.slice(0, 3).forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, y, cws[j], 0.95, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.2, y, cws[j] - 0.4, 0.95, { size: j === 0 ? 26 : 20, bold: j !== 1, valign: 'middle' }); });
    const x = MX + cws[0] + cws[1] + cws[2]; rect(s, x, y, cws[3], 0.95, i % 2 ? C.white : C.soft, C.line);
    circle(s, x + 1.3, y + 0.47, 0.65, r[3], '777777', 1.5);
  });
  rect(s, MX, 5.75, W - 2 * MX, 1.1, C.orangeSoft, 'F3D9B5');
  txt(s, 'Bb is **black**: one dominant allele is enough. A white mouse **must be bb**.', MX + 0.3, 5.75, W - 2 * MX - 0.6, 1.1, { size: 20, valign: 'middle' });
  notes(s, 'Spec 4.6.1.6: students should understand and use these terms. "Some characteristics are controlled by a single gene, such as fur colour in mice and red-green colour blindness in humans... Most characteristics are a result of multiple genes interacting, rather than a single gene."');
}

{
  const s = frame('Punnett squares', { tag: '4.6.1.6  (HT: construct)' });
  txt(s, 'Cross two **heterozygous** black mice:  **Bb × Bb**', MX, 1.4, 8, 0.5, { size: 22, bold: true });
  punnett(s, MX + 0.6, 2.2, 1.25, 'Bb', 'Bb', g => hasCap(g) ? 'DDDDDD' : C.white, 28);
  txt(s, 'parent 1 gametes', MX + 1.85, 1.85, 2.5, 0.35, { size: 14, color: C.grey, align: 'center' });
  const bx = MX + 5.4, bw = W - MX - bx;
  headCard(s, bx, 2.0, bw, 4.85, 'Reading the square', C.maroon, C.soft);
  bullets(s, bx + 0.25, 2.75, bw - 0.5, ['1 BB : 2 Bb : 1 bb', 'Phenotype ratio **3 black : 1 white**', 'Probability of white = **1 in 4** = **25%** (0.25)', 'Each square is one **possible** offspring: real litters may not match exactly.'], 19, 0.25);
  notes(s, 'HT only: construct the square from the parents\' genotypes. Steps: write each parent\'s two alleles (the gametes) on the edges; fill each box with one allele from each; count. Probabilities can be written as fractions, decimals, percentages or ratios. Shaded = black phenotype.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which genotype is heterozygous?',
  options: ['Bb', 'BB', 'bb', 'B'],
  correct: 0,
  notes: 'Answer A: two different alleles. B and C are homozygous. D is a gamete (one allele).',
});

D.myTurnYourTurn({
  title: 'Genetic crosses', tag: 'HT  Maths skill', stepSize: 21, labelW: 1.9, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Pea plants: T = tall, t = short. Cross Tt × tt.',
    steps: [
      { label: 'Gametes', text: '**T, t  and  t, t**' },
      { label: 'Offspring', text: '**Tt, Tt, tt, tt**' },
      { label: 'Ratio', text: '**1 tall : 1 short**' },
      { label: 'P(tall)', text: '**50%**' },
    ],
  },
  yours: {
    q: 'Cross TT × Tt.',
    steps: [
      { label: 'Gametes', text: '**T, T  and  T, t**' },
      { label: 'Offspring', text: '**TT, Tt, TT, Tt**' },
      { label: 'Ratio', text: '**All tall**' },
      { label: 'P(tall)', text: '**100%**' },
    ],
  },
  notes: 'Draw the square for each. Yours: every offspring has at least one T, so all are tall, though half are carriers of t.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: inherited disorders', { tag: '4.6.1.7' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Polydactyly: DOMINANT', C.orange, C.orangeSoft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['**Extra fingers or toes**.', 'Caused by a **dominant** allele: **one** copy is enough.', 'Only **one parent** needs the allele to pass it on.'], 18, 0.2);
  punnett(s, MX + 0.9, top + 3.0, 0.75, 'Dd', 'dd', g => hasCap(g) ? 'F9D9B5' : C.white, 20);
  txt(s, '50% chance', MX + 3.35, top + 4.0, 2.2, 0.5, { size: 20, bold: true, color: C.orange });
  headCard(s, MX + cw + gap, top, cw, h, 'Cystic fibrosis: RECESSIVE', C.maroon, C.soft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['A disorder of **cell membranes**: thick, sticky **mucus** in lungs and gut.', 'Needs **two** recessive alleles (ff).', 'Parents can be **carriers** (Ff) with no symptoms.'], 18, 0.2);
  punnett(s, MX + cw + gap + 0.9, top + 3.0, 0.75, 'Ff', 'Ff', g => g === 'ff' ? 'F3C6C2' : C.white, 20);
  txt(s, '25% chance', MX + cw + gap + 3.35, top + 4.0, 2.2, 0.5, { size: 20, bold: true, color: C.red });
  notes(s, 'Spec 4.6.1.7: "Polydactyly (having extra fingers or toes) is caused by a dominant allele. Cystic fibrosis (a disorder of cell membranes) is caused by a recessive allele." Left: Dd × dd. Right: two carriers, Ff × Ff: 1 in 4 chance of CF, 1 in 2 chance of a carrier.');
}

{
  const s = frame('Family trees', { tag: '4.6.1.7' });
  const sq = (x, y, f) => rect(s, x - 0.35, y - 0.35, 0.7, 0.7, f ? C.maroon : C.white, C.maroon, { lw: 2 });
  const ci = (x, y, f) => circle(s, x, y, 0.7, f ? C.maroon : C.white, C.maroon, 2.5);
  const y1 = 2.2, y2 = 4.3, ax = MX + 1.5, bx = MX + 4.5;
  sq(ax, y1, 0); ci(bx, y1, 0); hline(s, ax + 0.35, y1, bx - 0.35, C.ink, 2);
  txt(s, 'Ann', bx - 0.6, y1 + 0.42, 1.2, 0.35, { size: 15, align: 'center' }); txt(s, 'Ben', ax - 0.6, y1 + 0.42, 1.2, 0.35, { size: 15, align: 'center' });
  const mid = (ax + bx) / 2; vline(s, mid, y1, y2 - 0.75, C.ink, 2);
  const kids = [[MX + 1.0, 'sq', 0, 'Carl'], [mid, 'ci', 1, 'Dee'], [MX + 5.0, 'ci', 0, 'Eve']];
  hline(s, kids[0][0], y2 - 0.75, kids[2][0], C.ink, 2);
  kids.forEach(([x, t, f, n]) => { vline(s, x, y2 - 0.75, y2 - 0.35, C.ink, 2); (t === 'sq' ? sq : ci)(x, y2, f); txt(s, n, x - 0.6, y2 + 0.42, 1.2, 0.35, { size: 15, align: 'center' }); });
  // key
  sq(MX + 0.75, 5.75, 0); txt(s, 'male', MX + 1.2, 5.6, 1.2, 0.35, { size: 15 });
  ci(MX + 2.75, 5.75, 0); txt(s, 'female', MX + 3.2, 5.6, 1.2, 0.35, { size: 15 });
  sq(MX + 4.85, 5.75, 1); txt(s, 'has CF', MX + 5.3, 5.6, 1.4, 0.35, { size: 15 });
  const rx = MX + 7.0, rw = W - MX - rx;
  headCard(s, rx, 1.4, rw, 5.45, 'Explain Dee', C.maroon, C.soft);
  bullets(s, rx + 0.2, 2.15, rw - 0.4, ['Ann and Ben do **not** have CF, but Dee does.', 'Dee must be **ff**: she got an f from **each** parent.', 'So Ann and Ben are both **carriers (Ff)**.', 'Their next child has a **1 in 4** chance of CF.'], 18, 0.25);
  notes(s, 'Spec 4.6.1.7 expects students to interpret family trees. Classic reasoning: two unaffected parents with an affected child means the disorder is recessive and both parents are heterozygous. Carl and Eve are each FF or Ff.');
}

{
  const s = frame('Embryo screening: should we?', { tag: '4.6.1.7' });
  rect(s, MX, 1.4, W - 2 * MX, 0.95, C.soft, C.line);
  txt(s, 'Embryos made by IVF can be **screened**: a cell is removed and tested for the alleles that cause disorders. Only healthy embryos are implanted.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.95, { size: 18, valign: 'middle' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.6, h = 4.25;
  headCard(s, MX, top, cw, h, 'For', C.green, C.greenSoft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Fewer people **suffer** from the disorder.', 'Saves money on **treatment** (economic).', 'Lets carrier parents have a **healthy child**.'], 18, 0.2);
  headCard(s, MX + cw + gap, top, cw, h, 'Against', C.red, 'FBEDEB');
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Embryos are **destroyed** (ethical).', 'Could lead to **"designer babies"**.', '**Expensive**; may suggest people with disorders are less valued (social).'], 18, 0.2);
  notes(s, 'Spec 4.6.1.7: students should make informed judgements about the economic, social and ethical issues concerning embryo screening, given appropriate information. In an evaluation, give both sides and a justified conclusion.');
}

D.hinge({
  title: 'Quick check',
  q: 'Two parents are both carriers of cystic fibrosis. What is the chance their child has CF?',
  options: ['25%', '50%', '75%', '0%'],
  correct: 0,
  notes: 'Answer A: Ff × Ff gives 1 ff in 4. B is the chance of being a carrier. C is the chance of not having CF. D would need at least one FF parent.',
});

D.myTurnYourTurn({
  title: 'Inherited disorders', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Two carriers of CF have a child. Use a Punnett square to find the chance it is a carrier.  [3 marks]',
    steps: [
      { label: 'Parents', text: '**Ff × Ff**' },
      { label: 'Square', text: '**FF, Ff, Ff, ff**' },
      { label: 'Answer', text: '**2 in 4 = 50%**' },
    ],
  },
  yours: {
    q: 'A man with polydactyly (Dd) and an unaffected woman (dd) have a child. Find the chance it has polydactyly.  [3 marks]',
    steps: [
      { label: 'Parents', text: '**Dd × dd**' },
      { label: 'Square', text: '**Dd, Dd, dd, dd**' },
      { label: 'Answer', text: '**2 in 4 = 50%**' },
    ],
  },
  notes: 'Marks: correct parental genotypes/gametes; correct offspring; correct probability.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: sex determination', { tag: '4.6.1.8' });
  rect(s, MX, 1.4, W - 2 * MX, 0.95, C.soft, C.line);
  txt(s, 'Human body cells have **23 pairs** of chromosomes. **One pair** is the sex chromosomes: females are **XX**, males are **XY**.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.95, { size: 19, valign: 'middle' });
  txt(s, 'mother: X, X', MX + 1.6, 2.6, 2.5, 0.35, { size: 15, color: C.grey, align: 'center' });
  txt(s, 'father', MX - 0.1, 3.95, 1.0, 0.35, { size: 15, color: C.grey });
  punnett(s, MX + 0.6, 3.0, 1.2, 'XX', 'XY', g => g.includes('Y') ? 'D6E4F5' : 'F7DDE6', 28);
  const bx = MX + 5.4, bw = W - MX - bx;
  headCard(s, bx, 2.6, bw, 4.25, 'Reading the square', C.maroon, C.soft);
  bullets(s, bx + 0.25, 3.35, bw - 0.5, ['2 XX (girl) : 2 XY (boy)', 'Ratio **1 : 1**', 'Chance of a boy = **50%**, every time', 'The **father\'s** sperm decides: it carries an X or a Y.'], 19, 0.25);
  notes(s, 'Spec 4.6.1.8: "Ordinary human body cells contain 23 pairs of chromosomes. 22 pairs control characteristics only, but one of the pairs carries the genes that determine sex." Each pregnancy is independent: having three girls does not make a boy more likely.');
}

{
  const s = frame('Mendel and the understanding of genetics', { tag: '4.6.3.3' });
  const steps = [['1860s', '**Gregor Mendel** bred pea plants and saw that characteristics were passed on in **"units"** that did not blend.'], ['Late 1800s', '**Chromosomes** were seen in cells during cell division.'], ['Early 1900s', 'Scientists saw that chromosomes and Mendel\'s "units" **behaved the same way**: the units, now called **genes**, are on chromosomes.'], ['1950s', 'The **structure of DNA** was worked out, and how genes work.']];
  steps.forEach(([a, b], i) => {
    const y = 1.45 + i * 1.12;
    rect(s, MX, y, 2.1, 0.95, C.maroon); txt(s, a, MX, y, 2.1, 0.95, { size: 18, bold: true, color: C.white, align: 'center', valign: 'middle' });
    rect(s, MX + 2.2, y, W - 2 * MX - 2.2, 0.95, i % 2 ? C.white : C.soft, C.line);
    txt(s, b, MX + 2.4, y, W - 2 * MX - 2.6, 0.95, { size: 17, valign: 'middle' });
  });
  rect(s, MX, 6.0, W - 2 * MX, 0.85, C.orangeSoft, 'F3D9B5');
  txt(s, '**Why ignored?** Mendel\'s work was not recognised until after his death: genes and chromosomes were unknown, and he published in a little-read journal.', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.85, { size: 16, valign: 'middle' });
  notes(s, 'Spec 4.6.3.3 (separate Biology only). Students should understand why Mendel\'s discoveries were not recognised until after his death. His key idea: inherited "units" are passed on unchanged, which explains why a characteristic can skip a generation (recessive alleles).');
}

D.hinge({
  title: 'Quick check',
  q: 'A couple already have three daughters. What is the chance their next child is a boy?',
  options: ['50%', '25%', '75%', '100%'],
  correct: 0,
  notes: 'Answer A. Each birth is independent: the square always gives 2 XY in 4.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is an allele?', 'A version of a gene'], ['What is a phenotype?', 'The characteristic that is seen'], ['Which disorder is caused by a dominant allele?', 'Polydactyly'], ['What are the sex chromosomes of a male?', 'XY'],
    ['Why can two unaffected parents have a child with CF?', 'Both are carriers (Ff)'], ['Give one ethical argument against embryo screening.', 'Embryos are destroyed'],
    ['Bb × Bb gives 120 mice. How many are expected to be black?', '90'], ['HT  Cross bb × Bb. What is the probability of a white mouse?', '50%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) a different form of a gene  2) the characteristic shown  3) polydactyly  4) XY  5) both are heterozygous carriers; the child inherited f from each  6) embryos are destroyed / designer babies  7) 3/4 × 120 = 90  8) Bb, Bb, bb, bb: 2 in 4 = 50%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  stem: 'In guinea pigs, the allele for rough coat (R) is dominant to the allele for smooth coat (r).',
  parts: [
    { l: 'a', q: 'Give the genotype of a smooth-coated guinea pig.', m: 1, lines: 0 },
    { l: 'b', q: 'HT  Two heterozygous guinea pigs are crossed. Draw a Punnett square and give the ratio of rough : smooth offspring.', m: 4, lines: 2 },
    { l: 'c', q: 'The cross produced 200 offspring. How many would you expect to be smooth?', m: 2, lines: 1 },
    { l: 'd', q: 'Suggest why the actual number of smooth offspring may be different from your answer.', m: 1, lines: 0 },
    { l: 'e', q: 'Explain what is meant by heterozygous and homozygous.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'rr', '1', ''],
    ['(b)', 'gametes R, r and R, r; offspring RR, Rr, Rr, rr; rough : smooth; 3 : 1', '4', ''],
    ['(c)', '¼ × 200 = 50', '2', '1 for ¼ or 25%'],
    ['(d)', 'fertilisation is random / probabilities are predictions only', '1', ''],
    ['(e)', 'heterozygous: two different alleles; homozygous: two identical alleles', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What does homozygous recessive mean?', 'What do cystic fibrosis carriers have?', 'Which parent decides the sex of a baby?', 'Why was Mendel\'s work ignored at first?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) two recessive alleles, e.g. bb  2) one CF allele and one normal allele (Ff), no symptoms  3) the father (X or Y sperm)  4) genes and chromosomes were unknown; little-read journal. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Define the seven key terms with an example of each.',
    'HT  Draw a Punnett square for Tt × Tt and give the ratio.',
    'A dog cross gives 80 puppies. Half are expected to be brown. How many?',
    'Draw a Punnett square to show why the chance of a boy is 50%.',
    'Evaluate embryo screening for cystic fibrosis.',
    'Describe how our understanding of genetics developed after Mendel.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) see key words  2) TT, Tt, Tt, tt: 3 tall : 1 short  3) 40  4) XX × XY: 2 XX, 2 XY  5) for and against with conclusion  6) chromosomes observed; linked to Mendel\'s units (genes); DNA structure in the 1950s.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.6_B_GeneticInheritance.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
