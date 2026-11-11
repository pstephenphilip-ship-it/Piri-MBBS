// build_4_7_C.js — AQA GCSE Biology (8461) 4.7 Ecology, lesson 3 of 3:
// 4.7.3 Biodiversity and the effect of human interaction on ecosystems,
// 4.7.5 Food production (food security, farming and fishing, biotechnology).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_7_C.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.7.3–4.7.5', title: 'Biodiversity and food security',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;
const pct = (a, b) => Math.round((b - a) / a * 1000) / 10;
const eff = (a, b) => Math.round(b / a * 1000) / 10;

// ======================= numbers (all checked) =======================
calc('forest', pct(80, 60), -25); calc('chicken', eff(500, 90), 18); calc('cow', eff(800, 40), 5);
calc('MT', eff(400, 60), 15); calc('YT', pct(250, 175), -30);
calc('P8', pct(120, 90), -25); calc('exam', eff(600, 30), 5); calc('HW', pct(40, 50), 25);

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
function cards3(s, top, h, list, size = 17, col = C.maroon, fill = C.soft) {
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3;
  list.forEach(([a, b], i) => { const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, col, fill); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size }); });
}
function twoCards(s, top, h, a, b, ca, cb, fa, fb, size = 18) {
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, top, cw, h, a[0], ca, fa); bullets(s, MX + 0.25, top + 0.8, cw - 0.5, a[1], size, 0.18);
  headCard(s, MX + cw + gap, top, cw, h, b[0], cb, fb); bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, b[1], size, 0.18);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Biodiversity, pollution, deforestation, global warming, conservation and food production',
  bullets: ['Part 1: biodiversity and waste (4.7.3.1, 4.7.3.2)', 'Part 2: land use, deforestation and global warming (4.7.3.3–4.7.3.5)', 'Part 3: maintaining biodiversity (4.7.3.6)', 'Part 4: food security and food production (4.7.5)'],
  notes: 'AQA 8461 GCSE Biology 4.7, lesson 3 of 3: the final lesson of the course. 4.7.5 Food production is separate Biology only. About two hours.',
});

D.objectives({
  tag: '4.7.3, 4.7.5',
  items: [
    'Explain why **biodiversity** matters and how **pollution** reduces it.',
    'Explain the effects of **peat** use, **deforestation** and **global warming**.',
    'Describe ways to **maintain biodiversity**.',
    'Explain **food security**, efficient farming, sustainable **fishing** and **mycoprotein**.',
  ],
  keywords: ['biodiversity', 'pollution', 'deforestation', 'global warming', 'food security', 'mycoprotein'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What percentage of biomass passes to the next trophic level?', 'Name a process that removes CO₂ from the air.', 'What is interdependence?', 'What does a decomposer do?'],
  answers: ['About 10%', 'Photosynthesis', 'Species depending on each other', 'Breaks down dead material'],
  notes: 'Retrieval from lessons 1 and 2.',
});

D.vocab({
  title: 'Key words', tag: '4.7.3, 4.7.5',
  items: [
    { term: 'Biodiversity', def: 'The **variety of all the different species** of organisms on Earth, or within an ecosystem.' },
    { term: 'Deforestation', def: 'Clearing **large areas of forest**, e.g. for cattle, rice fields or biofuel crops.' },
    { term: 'Food security', def: 'Having **enough food** to feed a population.' },
    { term: 'Mycoprotein', def: 'A protein-rich food made from the fungus **Fusarium**, suitable for vegetarians.' },
  ],
  notes: 'Also: sustainable (meets present needs without harming future generations), quota.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: why biodiversity matters', { tag: '4.7.3.1' });
  rect(s, MX, 1.4, W - 2 * MX, 1.2, C.soft, C.line);
  txt(s, 'A great **biodiversity** makes an ecosystem **stable**: species depend on each other for food, shelter and keeping the physical environment steady.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.2, { size: 19, valign: 'middle' });
  cards3(s, 2.85, 2.2, [['Less dependence', 'If one species is lost, others have alternative food sources.'], ['Our future', 'The future of the human species depends on maintaining biodiversity.'], ['Resources', 'Possible new foods and medicines.']]);
  rect(s, MX, 5.3, W - 2 * MX, 1.55, C.orangeSoft, 'F3D9B5');
  txt(s, '**The problem:** more **people** and higher **standards of living** use more resources and make more **waste**, reducing biodiversity.', MX + 0.3, 5.3, W - 2 * MX - 0.6, 1.55, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.7.3.1: "Biodiversity is the variety of all the different species of organisms on earth, or within an ecosystem. A great biodiversity ensures the stability of ecosystems by reducing the dependence of one species on another for food, shelter and the maintenance of the physical environment. The future of the human species on Earth relies on us maintaining a good level of biodiversity. Many human activities are reducing biodiversity and only recently have measures been taken to try to stop this reduction."');
}

{
  const s = frame('Waste and pollution', { tag: '4.7.3.2' });
  cards3(s, 1.4, 4.2, [['Water', 'Sewage, fertilisers and toxic chemicals wash into rivers and lakes. Can kill fish and plants.'], ['Air', 'Smoke and acidic gases (e.g. sulfur dioxide) cause **acid rain**, which damages trees and lakes.'], ['Land', 'Landfill, toxic chemicals and pesticides; rubbish takes up habitats.']], 17, C.red, 'FBEDEB');
  rect(s, MX, 5.85, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'Pollution **kills plants and animals**, reducing biodiversity.', MX + 0.3, 5.85, W - 2 * MX - 0.6, 1.0, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.7.3.2: "Pollution can occur: in water, from sewage, fertiliser or toxic chemicals; in air, from smoke and acidic gases; on land, from landfill and from toxic chemicals. Pollution kills plants and animals which can reduce biodiversity." Eutrophication (fertiliser → algal bloom → decomposers use oxygen → fish die) is useful extension.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is a community with high biodiversity more stable?',
  options: ['Species are less dependent on any one other species', 'There is less competition', 'There are no predators', 'All the species are the same'],
  correct: 0,
  notes: 'Answer A: if one species is lost, others have alternatives.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: land use and peat bogs', { tag: '4.7.3.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'Humans use land for **building**, **quarrying**, **farming** and **dumping waste**, so there is less land for other animals and plants.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 19, valign: 'middle' });
  flow(s, [['Peat bog', 'stores carbon in partly decayed plants'], ['Drained', 'for farmland or to dig peat for compost'], ['Decay', 'peat decays or is burned'], ['CO₂ released', 'adds to global warming; habitats lost']], 2.65, 2.3, 16, [C.green, C.orange, '8A5A2B', C.red]);
  rect(s, MX, 5.2, W - 2 * MX, 1.65, C.greenSoft, C.green);
  txt(s, 'Gardeners can use **peat-free compost** to protect bogs and their biodiversity.', MX + 0.3, 5.2, W - 2 * MX - 0.6, 1.65, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.7.3.3: "The destruction of peat bogs, and other areas of peat to produce garden compost, reduces the area of this habitat and thus the variety of different plant, animal and microorganism species that live there (biodiversity). The decay or burning of the peat releases carbon dioxide into the atmosphere."');
}

{
  const s = frame('Deforestation', { tag: '4.7.3.4' });
  cards3(s, 1.4, 2.0, [['Cattle', 'forest cleared for grazing land'], ['Rice fields', 'cleared to grow rice'], ['Biofuels', 'cleared to grow fuel crops']], 17, C.orange, C.orangeSoft);
  headCard(s, MX, 3.65, W - 2 * MX, 2.0, 'Effects', C.red, 'FBEDEB');
  bullets(s, MX + 0.3, 4.3, W - 2 * MX - 0.6, ['**Less biodiversity**: habitats destroyed.', '**Less CO₂ removed** by photosynthesis; burning trees **releases CO₂**; decay of wood releases more.'], 17, 0.1);
  rect(s, MX, 5.85, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, '**Data:** a forest falls from 80 000 to 60 000 km²: a change of 20 000 ÷ 80 000 × 100 = **−25%**.', MX + 0.3, 5.85, W - 2 * MX - 0.6, 1.0, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.7.3.4: "Large-scale deforestation in tropical areas has occurred to: provide land for cattle and rice fields; grow crops for biofuels." Illustrative data.');
}

{
  const s = frame('Global warming', { tag: '4.7.3.5' });
  flow(s, [['More gases', 'CO₂ and methane levels rise'], ['Warming', 'Earth\'s average temperature increases'], ['Effects', 'see below']], 1.45, 1.6, 17, [C.maroon, C.orange, C.red]);
  headCard(s, MX, 3.3, W - 2 * MX, 3.55, 'Biological consequences', C.red, 'FBEDEB');
  bullets(s, MX + 0.3, 4.0, W - 2 * MX - 0.6, ['**Loss of habitat** as low-lying areas flood (sea levels rise).', 'Changes in the **distribution** of species: some move to new areas; others cannot survive.', 'Changes in **migration** patterns.', '**Reduced biodiversity** as species become extinct.'], 18, 0.14);
  notes(s, 'Spec 4.7.3.5: "Levels of carbon dioxide and methane in the atmosphere are increasing, and contribute to \'global warming\'. Students should be able to describe some of the biological consequences of global warming." Students should understand that scientists use evidence to reach a consensus.');
}

D.hinge({
  title: 'Quick check',
  q: 'How does deforestation increase CO₂ in the air?',
  options: ['Less photosynthesis, and burning or decaying trees release CO₂', 'Trees release CO₂ when they grow', 'Cattle remove CO₂', 'Rice fields absorb oxygen'],
  correct: 0,
  notes: 'Answer A. Two effects: fewer trees removing CO₂, and burning/decay releasing CO₂. (Cattle and rice fields also release methane.)',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: maintaining biodiversity', { tag: '4.7.3.6' });
  const items = [['Breeding programmes', 'for endangered species'], ['Protect rare habitats', 'e.g. nature reserves, coral reefs'], ['Field margins and hedgerows', 'reintroduced on farms where only one crop is grown'], ['Less deforestation', 'and lower carbon dioxide emissions'], ['Recycling', 'rather than dumping waste in landfill']];
  items.forEach(([a, b], i) => {
    const y = 1.45 + i * 0.95;
    rect(s, MX, y, W - 2 * MX, 0.82, i % 2 ? C.white : C.greenSoft, C.line);
    txt(s, a, MX + 0.3, y, 4.6, 0.82, { size: 19, bold: true, color: C.green, valign: 'middle' });
    txt(s, b, MX + 5.0, y, W - 2 * MX - 5.2, 0.82, { size: 18, valign: 'middle' });
  });
  rect(s, MX, 6.3, W - 2 * MX, 0.55, C.orangeSoft, 'F3D9B5');
  txt(s, 'Conflicts: these cost money, and can clash with farming, jobs and food production.', MX + 0.3, 6.3, W - 2 * MX - 0.6, 0.55, { size: 16, valign: 'middle' });
  notes(s, 'Spec 4.7.3.6 lists exactly these five. Students should be able to evaluate the conflicting pressures on maintaining biodiversity given appropriate information.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: food security', { tag: '4.7.5.1' });
  rect(s, MX, 1.4, W - 2 * MX, 0.9, C.soft, C.line);
  txt(s, '**Food security** means having enough food to feed a population. Threats include:', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.9, { size: 19, valign: 'middle' });
  const items = ['Rising **birth rate** in some places', 'Changing **diets** in developed countries (more meat)', 'New **pests and pathogens** that affect farming', '**Environmental changes**, e.g. drought, famine', 'The **cost** of agricultural inputs', '**Conflicts** in parts of the world'];
  items.forEach((t, i) => {
    const x = MX + (i % 2) * ((W - 2 * MX) / 2 + 0.1), y = 2.55 + Math.floor(i / 2) * 1.4, w = (W - 2 * MX) / 2 - 0.1;
    rect(s, x, y, w, 1.2, i % 4 === 0 || i % 4 === 3 ? C.orangeSoft : C.white, C.line);
    txt(s, t, x + 0.3, y, w - 0.6, 1.2, { size: 18, valign: 'middle' });
  });
  notes(s, 'Spec 4.7.5.1 (separate Biology) lists these six factors. Sustainable methods must be found to feed all people on Earth.');
}

{
  const s = frame('Making food production more efficient', { tag: '4.7.5.2' });
  twoCards(s, 1.4, 3.3, ['Factory farming', ['Limit animals\' **movement**: less energy used in respiration.', 'Keep them **warm**: less energy lost keeping warm.', 'High-protein feed: grow faster.']], ['Concerns', ['**Ethical**: animal welfare.', 'Disease spreads quickly; heavy antibiotic use.', 'Waste and pollution.']], C.maroon, C.red, C.soft, 'FBEDEB', 17);
  rect(s, MX, 4.95, W - 2 * MX, 1.9, C.orangeSoft, 'F3D9B5');
  txt(s, '**Data:** a chicken eats 500 g of feed and gains 90 g of biomass: 90 ÷ 500 × 100 = **18%** efficiency. A beef cow: 40 g from 800 g = **5%**. Eating plants directly feeds more people.', MX + 0.3, 4.95, W - 2 * MX - 0.6, 1.9, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.7.5.2: "The efficiency of food production can be improved by restricting energy transfer from food animals to the environment. This can be done by limiting their movement and by controlling the temperature of their surroundings. Some animals are fed high protein foods to increase growth." Illustrative figures.');
}

{
  const s = frame('Sustainable fisheries', { tag: '4.7.5.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'Fish stocks in the oceans are **declining**. If too many are caught, there are too few left to **breed**, and some species may disappear.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 19, valign: 'middle' });
  twoCards(s, 2.65, 3.0, ['Fishing quotas', ['Limits on the **number** of fish of each species that can be caught.']], ['Net size', ['Larger **mesh** lets **younger fish** escape, so they can reach breeding age.']], C.accent, C.green, C.soft, C.greenSoft, 18);
  rect(s, MX, 5.85, W - 2 * MX, 1.0, C.orangeSoft, 'F3D9B5');
  txt(s, '**Data:** a fish catch fell from 250 to 175 tonnes: a change of **−30%**.', MX + 0.3, 5.85, W - 2 * MX - 0.6, 1.0, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.7.5.3: "Fish stocks in the oceans are declining. It is important to maintain fish stocks at a level where breeding continues or certain species may disappear altogether in some areas. Control of net size and the introduction of fishing quotas play important roles in conservation of fish stocks at a sustainable level." Illustrative data.');
}

{
  const s = frame('Biotechnology and food', { tag: '4.7.5.4' });
  txt(s, 'Making mycoprotein', MX, 1.4, 6, 0.45, { size: 20, bold: true, color: C.maroon });
  flow(s, [['Fungus', 'Fusarium grown in a fermenter'], ['Feed', 'glucose syrup, in aerobic conditions'], ['Harvest', 'the biomass is collected'], ['Purify', 'made into a protein-rich food']], 1.95, 2.0, 16, [C.green, C.orange, C.accent, C.maroon]);
  twoCards(s, 4.2, 2.65, ['Mycoprotein', ['High in **protein**, low in fat.', 'Suitable for **vegetarians**.']], ['GM crops', ['e.g. **Golden rice**: has extra genes so it makes **vitamin A** precursor.', 'Could improve nutrition in poorer countries.']], C.green, C.maroon, C.greenSoft, C.soft, 17);
  notes(s, 'Spec 4.7.5.4: "Modern biotechnology techniques enable large quantities of microorganisms to be cultured for food. The fungus Fusarium is useful for producing mycoprotein, a protein-rich food suitable for vegetarians. The fungus is grown on glucose syrup, in aerobic conditions, and the biomass is harvested and purified. A genetically modified bacterium produces human insulin. GM crops could provide more food or food with an improved nutritional value such as golden rice."');
}

D.myTurnYourTurn({
  title: 'Food production', tag: 'Exam skill', stepSize: 19, labelW: 1.95, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Pigs eat 400 kg of feed and gain 60 kg. Find the efficiency, and explain how keeping them indoors helps.  [3 marks]',
    steps: [
      { label: 'Efficiency', text: '**60 ÷ 400 × 100 = 15%**' },
      { label: 'Less movement', text: '**Less respiration**' },
      { label: 'Warm', text: '**Less energy lost as heat**' },
    ],
  },
  yours: {
    q: 'A catch fell from 250 to 175 tonnes. Find the % change and explain how net size helps.  [3 marks]',
    steps: [
      { label: '% change', text: '**−30%**' },
      { label: 'Big mesh', text: '**Young fish escape**' },
      { label: 'So…', text: '**They grow and breed**' },
    ],
  },
  notes: 'Mine: in exam answers, say "less energy transferred to the surroundings", not "makes energy".',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is biodiversity?', 'The variety of species in an area'], ['Give two causes of water pollution.', 'Sewage, fertiliser (or toxic chemicals)'], ['Why do cattle farms lead to deforestation?', 'Land is cleared for grazing'], ['Name the fungus used to make mycoprotein.', 'Fusarium'],
    ['Why does burning peat add to global warming?', 'Releases CO₂ stored in the peat'], ['Give two ways to maintain biodiversity.', 'Breeding programmes; hedgerows'],
    ['Give one ethical objection to factory farming.', 'Poor animal welfare'], ['A fish population fell from 120 to 90 thousand. % change?', '−25%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) the variety of all the different species in an ecosystem or on Earth  2) sewage, fertiliser, toxic chemicals  3) forest is cleared to provide grazing land  4) Fusarium  5) peat is a carbon store; burning or decay releases CO₂  6) breeding programmes, protecting habitats, hedgerows and field margins, less deforestation, recycling  7) animals kept in cramped conditions; welfare  8) −30 ÷ 120 × 100 = −25%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Give two reasons why tropical forests are being cleared.', m: 2, lines: 0 },
    { l: 'b', q: 'Explain how deforestation contributes to global warming.', m: 3, lines: 1 },
    { l: 'c', q: 'A cow eats 600 kg of grass and gains 30 kg of biomass. Calculate the efficiency of the transfer.', m: 2, lines: 1 },
    { l: 'd', q: 'Describe how mycoprotein is produced.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'any two: cattle grazing; rice fields; biofuel crops', '2', ''],
    ['(b)', 'fewer trees, so less CO₂ removed by photosynthesis; trees burned or decay, releasing CO₂; CO₂ is a greenhouse gas', '3', ''],
    ['(c)', '30 ÷ 600 × 100 = 5%', '2', ''],
    ['(d)', 'Fusarium fungus grown on glucose syrup; aerobic conditions (fermenter); biomass harvested and purified', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Give one biological effect of global warming.', 'Why are hedgerows good for biodiversity?', 'What is a fishing quota?', 'Give one threat to food security.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) habitat loss, species distribution changes, migration changes, extinctions  2) they provide habitats and food for many species  3) a limit on how many fish of a species can be caught  4) birth rate, diet changes, pests/pathogens, drought, cost, conflict. Revisit the objectives: the AQA GCSE Biology course is complete.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain why biodiversity is important.',
    'Describe how air, water and land can be polluted.',
    'Evaluate the use of peat compost.',
    'Explain how factory farming improves efficiency.',
    'A field\'s species count rose from 40 to 50 after hedgerows were planted. % increase?',
    'Explain how quotas and net size help keep fish stocks sustainable.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) stability, less dependence, human future, resources  2) water: sewage, fertiliser, chemicals; air: smoke, acid gases; land: landfill, chemicals  3) good compost but destroys habitat and releases CO₂; peat-free alternatives  4) less movement and warm, so less energy lost; high-protein feed  5) 10 ÷ 40 × 100 = 25%  6) quotas limit numbers caught; larger mesh lets young fish escape and breed.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.7_C_BiodiversityFoodSecurity.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
