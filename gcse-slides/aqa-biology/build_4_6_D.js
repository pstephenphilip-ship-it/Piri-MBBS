// build_4_6_D.js — AQA GCSE Biology (8461) 4.6 Inheritance, variation and evolution, lesson 4 of 4:
// 4.6.3.1 Theory of evolution (Darwin, Lamarck), 4.6.3.2 Speciation (Wallace), 4.6.3.4 Evidence for evolution,
// 4.6.3.5 Fossils, 4.6.3.6 Extinction, 4.6.3.7 Resistant bacteria, 4.6.4 Classification.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_6_D.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.6.3–4.6.4', title: 'Evolution and classification',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, MX, W } = D;
const pct = (a, b) => Math.round((b - a) / a * 1000) / 10;

// ======================= numbers (all checked) =======================
calc('P8', pct(400, 300), -25); calc('exam', pct(2000, 500), -75); calc('HW', pct(250, 400), 60);

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
function twoCards(s, top, h, a, b, ca, cb, fa, fb, size = 18) {
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, top, cw, h, a[0], ca, fa); bullets(s, MX + 0.25, top + 0.8, cw - 0.5, a[1], size, 0.18);
  headCard(s, MX + cw + gap, top, cw, h, b[0], cb, fb); bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, b[1], size, 0.18);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Darwin, Lamarck and Wallace, speciation, fossils, extinction, antibiotic-resistant bacteria and how living things are classified',
  bullets: ['Part 1: theories of evolution and speciation (4.6.3.1, 4.6.3.2)', 'Part 2: evidence: fossils and resistant bacteria (4.6.3.4–4.6.3.7)', 'Part 3: classification (4.6.4)'],
  notes: 'AQA 8461 GCSE Biology 4.6, lesson 4 of 4: this completes topic 4.6. Lamarck and Wallace/speciation (4.6.3.2) are separate Biology only. About two hours.',
});

D.objectives({
  tag: '4.6.3, 4.6.4',
  items: [
    'Describe **Darwin\'s** theory, why it was slow to be accepted, and how **Lamarck\'s** idea differs.',
    'Explain **speciation** and describe **Wallace\'s** role.',
    'Describe the evidence from **fossils** and **resistant bacteria**, and causes of **extinction**.',
    'Classify organisms using **Linnaeus** and the **three-domain** system; read **evolutionary trees**.',
  ],
  keywords: ['natural selection', 'speciation', 'fossil', 'extinction', 'MRSA', 'domain'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is natural selection?', 'What is a species?', 'What is a mutation?', 'What does an antibiotic do?'],
  answers: ['Best-suited individuals survive and breed', 'Organisms that can breed to give fertile offspring', 'A change in the DNA', 'Kills bacteria inside the body'],
  notes: 'Retrieval from lesson 3 and 4.3.1.',
});

D.vocab({
  title: 'Key words', tag: '4.6.3, 4.6.4',
  items: [
    { term: 'Speciation', def: 'The formation of a **new species** when populations become so different they cannot interbreed.' },
    { term: 'Fossil', def: 'The **remains** of organisms from millions of years ago, found in **rocks**.' },
    { term: 'Extinction', def: 'When there are **no individuals** of a species left anywhere.' },
    { term: 'Binomial name', def: 'The two-part scientific name: **genus** then **species**, e.g. Homo sapiens.' },
  ],
  notes: 'Also: isolation, MRSA, domain, evolutionary tree.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: Darwin\'s theory', { tag: '4.6.3.1' });
  rect(s, MX, 1.4, W - 2 * MX, 1.15, C.soft, C.line);
  txt(s, '**Charles Darwin** sailed round the world on HMS Beagle, studied fossils and bred animals. In **1859** he published On the Origin of Species.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.15, { size: 19, valign: 'middle' });
  flow(s, [['Variation', 'individuals in a species show a wide range of variation'], ['Survival', 'those best suited to the environment are more likely to survive'], ['Breeding', 'they breed and pass on their characteristics']], 2.8, 1.9, 17);
  headCard(s, MX, 4.95, W - 2 * MX, 1.9, 'Why it was only gradually accepted', C.orange, C.orangeSoft);
  bullets(s, MX + 0.3, 5.6, W - 2 * MX - 0.6, ['It challenged the idea that **God made** all living things. Not enough **evidence** at the time.', 'The **mechanism** of inheritance and variation was not known (genes were discovered 50 years later).'], 16, 0.06);
  notes(s, 'Spec 4.6.3.1: "Charles Darwin, as a result of observations on a round the world expedition, backed by years of experimentation and discussion and linked to developing knowledge of geology and fossils, proposed the theory of evolution by natural selection." The three reasons for slow acceptance are on the spec.');
}

{
  const s = frame('Lamarck: a different idea', { tag: '4.6.3.1' });
  twoCards(s, 1.4, 4.0, ['Lamarck (early 1800s)', ['Changes that happen **during an organism\'s lifetime** are passed on.', 'Example: a giraffe stretches its neck to reach leaves; its offspring are born with **longer necks**.']], ['Why it is rejected', ['Acquired changes do **not** change the **DNA** in gametes.', 'A bodybuilder\'s children are not born with big muscles.', 'Darwin\'s idea is supported by genetics.']], C.orange, C.green, C.orangeSoft, C.greenSoft, 18);
  rect(s, MX, 5.65, W - 2 * MX, 1.2, C.soft, C.line);
  txt(s, '**Darwin\'s giraffes:** necks varied; longer-necked giraffes reached more food, survived, bred and passed on the **alleles** for long necks.', MX + 0.3, 5.65, W - 2 * MX - 0.6, 1.2, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.6.3.1 (separate Biology): "Other theories, including that of Jean-Baptiste Lamarck, are based mainly on the idea that changes that occur in an organism during its lifetime can be inherited. We now know that in the vast majority of cases this type of inheritance cannot occur."');
}

{
  const s = frame('Wallace and speciation', { tag: '4.6.3.2' });
  rect(s, MX, 1.4, W - 2 * MX, 1.15, C.soft, C.line);
  txt(s, '**Alfred Russel Wallace** came up with the theory of natural selection **at the same time** as Darwin; they published joint papers in **1858**. He also worked on **warning colouration** and on **speciation**.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.15, { size: 18, valign: 'middle' });
  flow(s, [['Isolation', 'a population is split, e.g. by a river, mountain or sea'], ['Different conditions', 'each group faces a different environment'], ['Natural selection', 'different alleles are selected in each group'], ['New species', 'they become so different they cannot interbreed to give fertile offspring']], 2.8, 2.4, 16, [C.maroon, C.accent, C.orange, C.green]);
  rect(s, MX, 5.45, W - 2 * MX, 1.4, C.orangeSoft, 'F3D9B5');
  txt(s, 'Example: finches on the Galápagos islands. Each island\'s birds evolved **different beaks** to suit the food there.', MX + 0.3, 5.45, W - 2 * MX - 0.6, 1.4, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.6.3.2 (separate Biology only): "Alfred Russel Wallace independently proposed the theory of evolution by natural selection. He published joint writings with Darwin in 1858 which prompted Darwin to publish On the Origin of Species (1859) the following year. Wallace worked worldwide gathering evidence for evolutionary theory. He is best known for his work on warning colouration in animals and his theory of speciation." Students should describe the steps in speciation.');
}

D.hinge({
  title: 'Quick check',
  q: 'What must happen first for a new species to form?',
  options: ['Populations become isolated from each other', 'Animals change during their lifetime', 'Every individual mutates', 'The species becomes extinct'],
  correct: 0,
  notes: 'Answer A. B is Lamarck. C: mutations are random, in some individuals. D is the opposite.',
});

D.myTurnYourTurn({
  title: 'Explaining evolution', tag: 'Exam skill', stepSize: 19, labelW: 1.85, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'A river splits a population of mice. Explain how two species could form.  [4 marks]',
    steps: [
      { label: 'Isolation', text: '**River stops interbreeding**' },
      { label: 'Conditions', text: '**Different on each side**' },
      { label: 'Selection', text: '**Different alleles selected**' },
      { label: 'Species', text: '**Can no longer interbreed**' },
    ],
  },
  yours: {
    q: 'Explain why Lamarck\'s theory is wrong, using a bodybuilder as an example.  [2 marks]',
    steps: [
      { label: 'Change', text: '**Muscles grow in lifetime**' },
      { label: 'Not passed', text: '**DNA in gametes unchanged**' },
    ],
  },
  notes: 'Mine: "fertile offspring" is the key phrase for the last mark.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: fossils', { tag: '4.6.3.5' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 2.75;
  [['No decay', 'Parts did not decay because conditions lacked **oxygen**, **moisture** or the right temperature (e.g. ice, amber).'], ['Mineral replacement', 'Parts were **replaced by minerals** as they decayed (bones, shells).'], ['Traces', '**Footprints**, burrows and root marks preserved in rock.']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 17 });
  });
  twoCards(s, 4.35, 2.5, ['What fossils show', ['How much (or how little) organisms have **changed** over time.']], ['Why the record is incomplete', ['Early life was **soft-bodied**, leaving few traces.', 'Many fossils **destroyed** by geological activity.']], C.green, C.red, C.greenSoft, 'FBEDEB', 17);
  notes(s, 'Spec 4.6.3.5: "Fossils are the \'remains\' of organisms from millions of years ago, which are found in rocks. Fossils may be formed: from parts of organisms that have not decayed because one or more of the conditions needed for decay are absent; when parts of the organism are replaced by minerals as they decay; as preserved traces of organisms." Scientists cannot be certain how life began because of the incomplete record.');
}

{
  const s = frame('Extinction', { tag: '4.6.3.6' });
  rect(s, MX, 1.4, W - 2 * MX, 0.95, C.soft, C.line);
  txt(s, 'A species is **extinct** when there are **no individuals** left. Fossils show that most species that ever lived are now extinct.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.95, { size: 19, valign: 'middle' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 2.6, h = 4.25;
  [['New predators', 'e.g. humans hunting the dodo'], ['New diseases', 'e.g. a fungus killing frogs'], ['Competition', 'a more successful species takes the food or habitat']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, 2.0, a, C.red, 'FBEDEB'); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, 1.2, { size: 17 });
  });
  headCard(s, MX, 4.8, W - 2 * MX, 2.05, 'Changes to the environment over geological time', C.orange, C.orangeSoft);
  txt(s, 'Climate change, or a **single catastrophic event** such as a massive volcanic eruption or an **asteroid collision** (e.g. the dinosaurs).', MX + 0.3, 5.45, W - 2 * MX - 0.6, 1.3, { size: 18 });
  notes(s, 'Spec 4.6.3.6: "Extinctions may be caused by: changes to the environment over geological time; new predators; new diseases; new, more successful, competitors; a single catastrophic event, eg massive volcanic eruptions or collisions with asteroids; through the cyclical nature of speciation." Link to 4.7 biodiversity.');
}

{
  const s = frame('Resistant bacteria: evolution we can watch', { tag: '4.6.3.7' });
  flow(s, [['Mutation', 'a bacterium becomes resistant to an antibiotic'], ['Antibiotic used', 'non-resistant bacteria die'], ['Survival', 'resistant bacteria survive and reproduce fast'], ['Spread', 'a resistant strain, e.g. MRSA, spreads']], 1.45, 2.2, 16, [C.maroon, C.accent, C.orange, C.red]);
  headCard(s, MX, 3.95, (W - 2 * MX) / 2 - 0.2, 2.9, 'Reducing resistance', C.green, C.greenSoft);
  bullets(s, MX + 0.25, 4.65, (W - 2 * MX) / 2 - 0.7, ['Doctors: no antibiotics for **viral** or mild infections.', 'Patients: **finish the course**.', 'Restrict antibiotics in **farming**.'], 16, 0.1);
  const bx = MX + (W - 2 * MX) / 2 + 0.2, bw = (W - 2 * MX) / 2 - 0.2;
  rect(s, bx, 3.95, bw, 2.9, C.orangeSoft, 'F3D9B5');
  txt(s, '**Data:** MRSA deaths in England and Wales fell from about 1600 (2006) to 300 (2013) after better hygiene and fewer prescriptions. New antibiotics are **slow and costly** to develop.', bx + 0.25, 4.0, bw - 0.5, 2.8, { size: 16, valign: 'middle' });
  notes(s, 'Spec 4.6.3.7: "Bacteria can evolve rapidly because they reproduce at a fast rate." Rough historical figures for illustration only. Percentage practice uses separate made-up numbers.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why do bacteria evolve resistance so quickly?',
  options: ['They reproduce very quickly', 'Antibiotics cause the mutations', 'They are not living cells', 'They reproduce sexually'],
  correct: 0,
  notes: 'Answer A. B: mutations are random; antibiotics only select. C: they are living. D: they reproduce asexually.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: the Linnaean system', { tag: '4.6.4' });
  const lv = ['Kingdom', 'Phylum', 'Class', 'Order', 'Family', 'Genus', 'Species'], ex = ['Animalia', 'Chordata', 'Mammalia', 'Carnivora', 'Felidae', 'Panthera', 'leo'];
  lv.forEach((t, i) => {
    const w = 6.6 - i * 0.7, x = MX + (6.6 - w) / 2, y = 1.45 + i * 0.73;
    rect(s, x, y, w, 0.63, i % 2 ? C.accent : C.maroon);
    txt(s, t, x, y, w, 0.63, { size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, ex[i], MX + 6.8, y, 2.0, 0.63, { size: 16, italic: i >= 5, color: C.grey, valign: 'middle' });
  });
  const bx = MX + 8.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Key facts', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['Carl **Linnaeus** grouped organisms by **structure** and **characteristics**.', '**Binomial name**: genus + species, e.g. Panthera leo (lion).', 'Memory aid: **K**ing **P**hilip **C**ame **O**ver **F**or **G**ood **S**oup.'], 16, 0.25);
  notes(s, 'Spec 4.6.4: "Traditionally living things have been classified into groups depending on their structure and characteristics in a system described by Carl Linnaeus. Linnaeus classified living things into kingdom, phylum, class, order, family, genus and species. Organisms are named by the binomial system of genus and species."');
}

{
  const s = frame('Domains and evolutionary trees', { tag: '4.6.4' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 2.0;
  [['Archaea', 'primitive bacteria, often in **extreme** places (hot springs, salt lakes)'], ['Bacteria', '**true bacteria**'], ['Eukaryota', 'protists, fungi, plants and animals']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, [C.orange, C.accent, C.green][i], C.white); txt(s, b, x + 0.2, top + 0.72, cw - 0.4, h - 0.85, { size: 17 });
  });
  // tree: A splits first, then B, then C and D
  const tx = MX + 0.6, u = 1.3, X = k => tx + 0.6 + k * u, top0 = 4.0;
  const n3 = [(X(2) + X(3)) / 2, 4.6], n2 = [(X(1) + n3[0]) / 2, 5.2], n1 = [(X(0) + n2[0]) / 2, 5.8];
  const join = (xa, ya, xb, yb, ny) => { vline(s, xa, ya, ny, C.ink, 2.5); vline(s, xb, yb, ny, C.ink, 2.5); hline(s, xa, ny, xb, C.ink, 2.5); };
  join(X(2), top0, X(3), top0, n3[1]); join(X(1), top0, n3[0], n3[1], n2[1]); join(X(0), top0, n2[0], n2[1], n1[1]);
  vline(s, n1[0], n1[1], 6.3, C.ink, 2.5);
  const sp = ['A', 'B', 'C', 'D'].map((n, k) => [n, X(k)]);
  sp.forEach(([n, x]) => { circle(s, x, 3.75, 0.44, C.accent); txt(s, n, x - 0.22, 3.53, 0.44, 0.44, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' }); });
  txt(s, 'common ancestor', tx + 0.9, 6.3, 3, 0.35, { size: 14, color: C.grey });
  const bx = MX + 6.4, bw = W - MX - bx;
  rect(s, bx, 3.95, bw, 2.9, C.soft, C.line);
  bullets(s, bx + 0.2, 4.1, bw - 0.4, ['Domains: Carl **Woese** (1990), from **chemical analysis**.', 'An **evolutionary tree** shows how organisms are related, using current data and **fossils**.', 'C and D share the **most recent** common ancestor, so they are the most closely related.', 'A is the most distantly related.'], 16, 0.12);
  notes(s, 'Spec 4.6.4: "As evidence of internal structures became more developed due to improvements in microscopes, and the understanding of biochemical processes progressed, new models of classification were proposed. Due to evidence available from chemical analysis there is now a \'three-domain system\' developed by Carl Woese." Read trees by finding where branches join: the later the join, the closer the relationship.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which domain do mushrooms belong to?',
  options: ['Eukaryota', 'Archaea', 'Bacteria', 'Fungi'],
  correct: 0,
  notes: 'Answer A: fungi have a nucleus. D is a kingdom, not a domain.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['When did Darwin publish On the Origin of Species?', '1859'], ['Give one way fossils are formed.', 'Minerals replace parts as they decay'], ['Name the three domains.', 'Archaea, Bacteria, Eukaryota'], ['What is MRSA?', 'A bacterium resistant to antibiotics'],
    ['Give two reasons Darwin\'s theory was slow to be accepted.', 'Challenged God as creator; no mechanism known'], ['Why are there few fossils of early life?', 'Soft-bodied; destroyed by geological activity'],
    ['Give two causes of extinction.', 'New predators, disease, competition, catastrophe'], ['A disease infected 400 frogs one year and 300 the next. % change?', '−25%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 1859  2) no decay (lack of oxygen/moisture), mineral replacement, or traces  3) archaea, bacteria, eukaryota  4) methicillin-resistant Staphylococcus aureus  5) challenged the idea that God made all life; not enough evidence; mechanism of inheritance unknown  6) soft-bodied organisms; destroyed by geological activity  7) environmental change, new predators, new diseases, competitors, catastrophic events  8) −100 ÷ 400 × 100 = −25%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Name the scientist who proposed natural selection at the same time as Darwin.', m: 1, lines: 0 },
    { l: 'b', q: 'Explain how a new species of finch could form on an island.', m: 4, lines: 2 },
    { l: 'c', q: 'Cases of a resistant infection in a hospital fell from 2000 to 500 a year. Calculate the percentage decrease.', m: 2, lines: 1 },
    { l: 'd', q: 'Give three ways the spread of antibiotic-resistant bacteria can be reduced.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'Wallace', '1', ''],
    ['(b)', 'population isolated on the island; different conditions/food; natural selection of different alleles; can no longer interbreed to give fertile offspring', '4', ''],
    ['(c)', '1500 ÷ 2000 × 100 = 75%', '2', '1 for 1500 ÷ 2000'],
    ['(d)', 'not prescribing for viral/mild infections; finishing the course; restricting use in farming; hygiene', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What was Lamarck\'s idea?', 'What do fossils show?', 'Give the binomial name for humans.', 'Who developed the three-domain system?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) changes during a lifetime are inherited  2) how organisms have changed over time  3) Homo sapiens  4) Carl Woese. Revisit the objectives: topic 4.6 is complete.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Compare Darwin\'s and Lamarck\'s ideas using giraffes.',
    'Describe the steps in speciation.',
    'Explain why the fossil record is incomplete.',
    'Explain how MRSA evolved.',
    'A species rose from 250 to 400 individuals. Calculate the % increase.',
    'Write out the seven Linnaean levels for a lion.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) Lamarck: stretching passed on; Darwin: variation, survival, breeding  2) isolation, different conditions, natural selection, can no longer interbreed  3) soft-bodied; destroyed by geological activity  4) mutation, antibiotic kills others, resistant survive and reproduce  5) 150 ÷ 250 × 100 = 60%  6) Animalia, Chordata, Mammalia, Carnivora, Felidae, Panthera, leo.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.6_D_EvolutionClassification.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
