// build_4_3_1_A.js — AQA GCSE Biology (8461) 4.3.1 Communicable diseases, lesson 1 of 3
// 4.3.1.1 Communicable diseases, 4.3.1.2 Viral, 4.3.1.3 Bacterial, 4.3.1.4 Fungal, 4.3.1.5 Protist diseases.
// One two-hour lesson for a Higher student. Uses the phone-safe lesson template (Arial, plain shapes).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_3_1_A.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C } = T;

const DECK = {
  code: '4.3.1', title: 'Communicable diseases',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;

// ---------- deck helpers ----------
function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
// a header-bar card with lines of text; lines are [text, size, bold, colour]
function card(s, x, y, w, h, head, lines, colour = C.maroon, fill = C.soft) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
  let yy = y + 0.75;
  lines.forEach(([t, sz = 17, b = false, c = C.ink]) => {
    const th = D.textH(t, sz, w - 0.4, b);
    txt(s, t, x + 0.2, yy, w - 0.4, th + 0.05, { size: sz, bold: b, color: c });
    yy += th + 0.14;
  });
  return yy;
}
// disease card: name, pathogen type pill, then labelled rows
function diseaseCard(s, x, y, w, h, name, type, rows, colour) {
  rect(s, x, y, w, h, C.white, colour);
  rect(s, x, y, w, 0.62, colour);
  txt(s, name, x + 0.2, y, w - 1.6, 0.62, { size: D.textW(name, 21, true) > w - 1.8 ? 18 : 21, bold: true, color: C.white, valign: 'middle' });
  rect(s, x + w - 1.35, y + 0.13, 1.2, 0.36, C.white);
  txt(s, type, x + w - 1.35, y + 0.13, 1.2, 0.36, { size: 12, bold: true, color: colour, align: 'center', valign: 'middle' });
  let yy = y + 0.8;
  rows.forEach(([lab, t]) => {
    txt(s, lab, x + 0.2, yy, w - 0.4, 0.34, { size: 15, bold: true, color: colour });
    const th = D.textH(t, 19, w - 0.4);
    txt(s, t, x + 0.2, yy + 0.36, w - 0.4, th + 0.05, { size: 19 });
    yy += th + 0.55;
  });
  if (yy > y + h + 0.05) throw new Error(`diseaseCard overflow: ${name} needs ${(yy - y).toFixed(2)} in, has ${h}`);
}
const COL = { virus: '8E3B8C', bacteria: '2A6F8E', fungus: 'B0631A', protist: '2E7D4F' };

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Pathogens, how they make us ill and spread, and the viral, bacterial, fungal and protist diseases on the spec',
  bullets: ['Part 1: pathogens and how diseases spread (4.3.1.1)', 'Part 2: viral diseases: measles, HIV, TMV (4.3.1.2)', 'Part 3: bacterial and fungal diseases (4.3.1.3, 4.3.1.4)', 'Part 4: protist diseases: malaria (4.3.1.5)'],
  notes: 'AQA 8461 GCSE Biology 4.3 Infection and response, 4.3.1 Communicable diseases. Lesson 1 of 3. Lesson 2: human defences and vaccination (4.3.1.6, 4.3.1.7). Lesson 3: antibiotics, painkillers and developing new drugs (4.3.1.8, 4.3.1.9). Then 4.3.2 Monoclonal antibodies (HT) and 4.3.3 Plant disease. About two hours.',
});

D.objectives({
  tag: '4.3.1.1 – 4.3.1.5',
  items: [
    'Name the four types of **pathogen** and explain how **bacteria** and **viruses** make us ill.',
    'Describe how diseases **spread** and how the spread can be **reduced**.',
    'Recall the symptoms, spread and control of **measles, HIV, TMV, Salmonella, gonorrhoea, rose black spot** and **malaria**.',
    '**Explain** how a plant disease reduces growth.',
  ],
  keywords: ['pathogen', 'communicable', 'toxin', 'vector', 'host', 'antiretroviral'],
  notes: 'Share the objectives. AQA asks for these eight diseases by name: learn each one\'s pathogen type, symptoms, how it spreads and how it is controlled.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Name the part of a cell where most chemical reactions take place.', 'Name one structure an animal cell has that a bacterial cell does not.', 'Which organ system carries blood around the body?', 'What is the job of white blood cells?'],
  answers: ['Cytoplasm', 'Nucleus (or mitochondria)', 'Circulatory system', 'Defend the body against pathogens'],
  notes: 'Retrieval from 4.1 Cell biology and 4.2 Organisation. Bacteria are prokaryotes: genetic material in the cytoplasm, no nucleus.',
});

D.vocab({
  title: 'Key words', tag: '4.3.1',
  items: [
    { term: 'Pathogen', def: 'A **microorganism that causes disease**: a virus, bacterium, protist or fungus.' },
    { term: 'Communicable', def: 'A disease that can be **passed from one person (or plant) to another**.' },
    { term: 'Toxin', def: 'A **poison** made by bacteria that **damages tissues** and makes us feel ill.' },
    { term: 'Vector', def: 'An organism that **carries a pathogen** to a new host without getting the disease, e.g. a **mosquito**.' },
  ],
  notes: 'Non-communicable diseases (e.g. heart disease) cannot be caught. Host = the organism the pathogen lives in.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the four types of pathogen', { tag: '4.3.1.1' });
  const gap = 0.3, cw = (W - 2 * MX - 3 * gap) / 4, top = 1.4, h = 5.45;
  const cards = [
    ['Viruses', COL.virus, 'Smallest pathogen. Not cells.', 'Live and reproduce **inside** cells, damaging them.', 'Measles, HIV, TMV'],
    ['Bacteria', COL.bacteria, 'Single cells, no nucleus.', 'Reproduce rapidly. Some make **toxins**.', 'Salmonella, gonorrhoea'],
    ['Fungi', COL.fungus, 'Some single-celled, some made of threads (hyphae).', 'Make **spores** that spread in wind and water.', 'Rose black spot'],
    ['Protists', COL.protist, 'Single-celled, with a nucleus.', 'Often carried by a **vector**.', 'Malaria'],
  ];
  cards.forEach(([h1, col, a, b, ex], i) => {
    const x = MX + i * (cw + gap);
    rect(s, x, top, cw, h, C.white, col);
    rect(s, x, top, cw, 0.62, col);
    txt(s, h1, x + 0.2, top, cw - 0.4, 0.62, { size: 21, bold: true, color: C.white, valign: 'middle' });
    // simple picture
    const cx = x + cw / 2, cy = top + 1.35;
    if (i === 0) { circle(s, cx, cy, 0.42, col); [0, 1, 2, 3, 4, 5, 6, 7].forEach(k => { const a2 = k * Math.PI / 4; circle(s, cx + 0.3 * Math.cos(a2), cy + 0.3 * Math.sin(a2), 0.1, col); }); }
    if (i === 1) { s.addShape(D.SH.ellipse, { x: cx - 0.8, y: cy - 0.3, w: 1.6, h: 0.6, fill: { color: 'D6E6EE' }, line: { color: col, width: 2 } }); }
    if (i === 2) { [-0.5, 0, 0.5].forEach(dx => { D.vline(s, cx + dx, cy - 0.15, cy + 0.45, col, 3); circle(s, cx + dx, cy - 0.25, 0.26, col); }); D.hline(s, cx - 0.7, cy + 0.45, cx + 0.7, col, 3); }
    if (i === 3) { s.addShape(D.SH.ellipse, { x: cx - 0.7, y: cy - 0.4, w: 1.4, h: 0.8, fill: { color: 'DCEFE2' }, line: { color: col, width: 2 } }); circle(s, cx + 0.15, cy, 0.3, col); }
    let y = top + 2.05;
    [[a, 17], [b, 17]].forEach(([t, sz]) => { const th = D.textH(t, sz, cw - 0.4); txt(s, t, x + 0.2, y, cw - 0.4, th + 0.05, { size: sz }); y += th + 0.2; });
    txt(s, 'Examples', x + 0.2, top + h - 1.15, cw - 0.4, 0.35, { size: 14, bold: true, color: col });
    txt(s, ex, x + 0.2, top + h - 0.8, cw - 0.4, 0.65, { size: 17, bold: true });
  });
  notes(s, 'Pathogens infect plants and animals. Size order: virus < bacterium < protist / fungal cell. Viruses are not living cells; they can only reproduce inside a host cell.');
}

{
  const s = frame('How bacteria and viruses make us ill', { tag: '4.3.1.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  // bacteria
  rect(s, MX, top, cw, 5.45, C.soft, COL.bacteria);
  rect(s, MX, top, cw, 0.6, COL.bacteria);
  txt(s, 'Bacteria', MX + 0.25, top, cw - 0.5, 0.6, { size: 20, bold: true, color: C.white, valign: 'middle' });
  const by = top + 1.35;
  const bact = (x, y) => s.addShape(D.SH.ellipse, { x, y, w: 0.9, h: 0.38, fill: { color: 'D6E6EE' }, line: { color: COL.bacteria, width: 2 } });
  bact(MX + 0.4, by - 0.19); arrow(s, MX + 1.45, by, MX + 2.15, by, COL.bacteria);
  bact(MX + 2.3, by - 0.45); bact(MX + 2.3, by + 0.07); arrow(s, MX + 3.35, by, MX + 4.05, by, COL.bacteria);
  [[-0.7, 0], [-0.2, 0], [0.3, 0], [-0.45, 1], [0.05, 1]].forEach(([dy, c]) => bact(MX + 4.2 + c * 0.6, by + dy));
  const tox = [[MX + 4.15, by + 0.95], [MX + 4.6, by + 1.05], [MX + 5.05, by + 0.9]];
  tox.forEach(([x, y]) => circle(s, x, y, 0.13, C.red));
  txt(s, 'toxins', MX + 4.25, by + 1.1, 1.2, 0.35, { size: 13, bold: true, color: C.red });
  txt(s, '1  Bacteria **reproduce rapidly** inside the body (one splits into two).', MX + 0.25, top + 3.0, cw - 0.5, 0.75, { size: 18 });
  txt(s, '2  They may produce **toxins** (poisons) that **damage tissues** and make us feel ill.', MX + 0.25, top + 3.85, cw - 0.5, 0.75, { size: 18 });
  // viruses
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.45, 'F7EFF7', COL.virus);
  rect(s, x2, top, cw, 0.6, COL.virus);
  txt(s, 'Viruses', x2 + 0.25, top, cw - 0.5, 0.6, { size: 20, bold: true, color: C.white, valign: 'middle' });
  const cell = (x, y, burst) => {
    s.addShape(D.SH.ellipse, { x, y, w: 1.5, h: 1.15, fill: { color: 'FBE9E7' }, line: { color: 'B5655B', width: 2, dashType: burst ? 'dash' : 'solid' } });
    circle(s, x + 0.45, y + 0.57, 0.36, 'C98C84');
  };
  cell(x2 + 0.3, by - 0.57, false); circle(s, x2 + 0.25, by - 0.65, 0.2, COL.virus);
  arrow(s, x2 + 1.9, by, x2 + 2.4, by, COL.virus);
  cell(x2 + 2.5, by - 0.57, false); [[0.95, -0.2], [1.15, 0.1], [0.9, 0.3], [1.2, -0.3]].forEach(([dx, dy]) => circle(s, x2 + 2.5 + dx, by + dy, 0.16, COL.virus));
  arrow(s, x2 + 4.1, by, x2 + 4.6, by, COL.virus);
  [[0, -0.6], [0.4, -0.25], [0.15, 0.2], [0.55, 0.45], [-0.05, 0.55]].forEach(([dx, dy]) => circle(s, x2 + 4.95 + dx, by + dy, 0.16, COL.virus));
  txt(s, 'cell bursts', x2 + 4.55, by + 0.75, 1.3, 0.35, { size: 13, bold: true, color: COL.virus });
  txt(s, '1  A virus gets **inside a cell** and uses it to make **many copies** of itself.', x2 + 0.25, top + 3.0, cw - 0.5, 0.75, { size: 18 });
  txt(s, '2  The cell **bursts**, releasing the viruses. This **cell damage** makes us ill.', x2 + 0.25, top + 3.85, cw - 0.5, 0.75, { size: 18 });
  notes(s, 'Spec wording: "Bacteria and viruses may reproduce rapidly inside the body. Bacteria may produce poisons (toxins) that damage tissues and make us feel ill. Viruses live and reproduce inside cells, causing cell damage." Exam tip: say toxins for bacteria and cell damage for viruses.');
}

{
  const s = frame('How diseases spread, and how to stop them', { tag: '4.3.1.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 0.6, C.maroon);
  txt(s, 'Ways pathogens spread', MX + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  const spread = [['Air', 'droplets from coughs and sneezes', 'measles'], ['Direct contact', 'touching, sexual contact, body fluids', 'HIV, gonorrhoea, TMV'], ['Water and food', 'eating or drinking pathogens', 'Salmonella'], ['Vectors', 'an animal carries the pathogen', 'malaria (mosquito)']];
  spread.forEach(([a, b, c], i) => {
    const y = top + 0.6 + i * 1.2;
    rect(s, MX, y, cw, 1.2, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, MX + 0.25, y + 0.1, cw - 0.5, 0.4, { size: 19, bold: true, color: C.maroon });
    txt(s, b, MX + 0.25, y + 0.5, cw - 0.5, 0.35, { size: 16 });
    txt(s, 'e.g. ' + c, MX + 0.25, y + 0.82, cw - 0.5, 0.33, { size: 15, italic: true, color: C.grey });
  });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 0.6, C.green);
  txt(s, 'Reducing or preventing spread', x2 + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  const stop = [['Hygiene', 'hand washing, disinfecting, cooking food fully'], ['Isolating', 'keep infected people or plants away from others'], ['Controlling vectors', 'kill or stop vectors breeding (e.g. insecticide)'], ['Vaccination', 'makes people immune, so they cannot pass it on']];
  stop.forEach(([a, b], i) => {
    const y = top + 0.6 + i * 1.2;
    rect(s, x2, y, cw, 1.2, i % 2 ? C.white : C.greenSoft, C.line);
    txt(s, a, x2 + 0.25, y + 0.12, cw - 0.5, 0.4, { size: 19, bold: true, color: C.green });
    txt(s, b, x2 + 0.25, y + 0.55, cw - 0.5, 0.55, { size: 16 });
  });
  notes(s, 'Spec: "Pathogens may infect plants or animals and can be spread by direct contact, by water or by air." Students should be able to explain how the spread of diseases can be reduced or prevented: the four methods on the right.');
}

D.hinge({
  title: 'Quick check',
  q: 'How do viruses make us feel ill?',
  options: ['They reproduce inside cells and damage them', 'They release toxins into the blood', 'They digest our tissues from outside', 'They block the blood vessels'],
  correct: 0,
  notes: 'Answer A. B is how BACTERIA make us ill: the most common mix-up. C and D are not on the spec.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: viral diseases', { tag: '4.3.1.2' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 5.45;
  const ds = [
    ['Measles', 'VIRUS', [['Symptoms', 'Fever and a red skin rash. Can be fatal.'], ['Spread', 'Inhaling droplets from sneezes and coughs.'], ['Control', 'Young children are vaccinated.']]],
    ['HIV', 'VIRUS', [['Symptoms', 'Flu-like illness at first.'], ['Spread', 'Sexual contact, or body fluids such as blood (shared needles).'], ['Control', 'Antiretroviral drugs; condoms; not sharing needles.']]],
    ['TMV', 'VIRUS', [['Affects', 'Tobacco mosaic virus infects tomatoes and many other plants.'], ['Symptoms', 'A mosaic pattern of discoloured patches on the leaves.'], ['Effect', 'Less photosynthesis, so the plant grows less.']]],
  ];
  ds.forEach(([n1, t, rows], i) => diseaseCard(s, MX + i * (cw + gap), top, cw, h, n1, t, rows, COL.virus));
  notes(s, 'Measles is serious and can be fatal, which is why children are vaccinated (MMR). TMV is a plant virus: the discoloured parts have less chlorophyll, so less photosynthesis. TMV spreads by contact (and on hands and tools).');
}

{
  const s = frame('From HIV to AIDS', { tag: '4.3.1.2' });
  const steps = [['Infection', 'HIV enters the body through body fluids.'], ['Early stage', 'A flu-like illness, then often no symptoms for years.'], ['Untreated', 'The virus attacks the body\'s immune cells.'], ['AIDS', 'Late stage: the immune system is so damaged it cannot fight other infections or cancers.']];
  const bw = 2.75, gap = (W - 2 * MX - 4 * bw) / 3, y = 1.55, h = 2.65;
  steps.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap), col = i === 3 ? C.red : COL.virus;
    rect(s, x, y, bw, h, i === 3 ? 'FBEDEB' : 'F7EFF7', col);
    rect(s, x, y, bw, 0.58, col);
    txt(s, a, x + 0.15, y, bw - 0.3, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
    txt(s, b, x + 0.15, y + 0.72, bw - 0.3, h - 0.85, { size: 17 });
    if (i < 3) arrow(s, x + bw + 0.05, y + h / 2, x + bw + gap - 0.05, y + h / 2, C.ink, 2.5);
  });
  const gw = (W - 2 * MX - 0.4) / 2;
  rect(s, MX, 4.5, gw, 2.35, C.greenSoft, C.green);
  txt(s, 'Treatment', MX + 0.25, 4.6, gw - 0.5, 0.45, { size: 20, bold: true, color: C.green });
  txt(s, '**Antiretroviral drugs** stop the virus from damaging the immune system. They do not cure HIV, but people can live a normal lifespan.', MX + 0.25, 5.1, gw - 0.5, 1.6, { size: 18 });
  rect(s, MX + gw + 0.4, 4.5, gw, 2.35, C.soft, C.maroon);
  txt(s, 'Preventing spread', MX + gw + 0.65, 4.6, gw - 0.5, 0.45, { size: 20, bold: true, color: C.maroon });
  txt(s, 'Use **condoms**. Drug users should **not share needles**. Screen donated blood.', MX + gw + 0.65, 5.1, gw - 0.5, 1.6, { size: 18 });
  notes(s, 'Spec: "HIV initially causes a flu-like illness. Unless successfully controlled with antiretroviral drugs the virus attacks the body\'s immune cells. Late stage HIV infection, or AIDS, occurs when the body\'s immune system becomes so badly damaged it can no longer deal with other infections or cancers." People with AIDS die of other infections, not of HIV directly.');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: bacterial and fungal diseases', { tag: '4.3.1.3, 4.3.1.4' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 5.45;
  diseaseCard(s, MX, top, cw, h, 'Salmonella', 'BACTERIUM', [['Symptoms', 'Fever, stomach cramps, vomiting, diarrhoea (bacteria and their toxins).'], ['Spread', 'Eating infected food, or food prepared in unhygienic conditions.'], ['Control', 'UK poultry are vaccinated. Cook food fully; good hygiene.']], COL.bacteria);
  diseaseCard(s, MX + cw + gap, top, cw, h, 'Gonorrhoea', 'BACTERIUM', [['Symptoms', 'Thick yellow or green discharge; pain when urinating.'], ['Spread', 'Sexual contact (an STD).'], ['Control', 'Treat with antibiotics (many strains now resist penicillin); use condoms.']], COL.bacteria);
  diseaseCard(s, MX + 2 * (cw + gap), top, cw, h, 'Rose black spot', 'FUNGUS', [['Symptoms', 'Purple or black spots on leaves. Leaves turn yellow and drop early.'], ['Effect', 'Less photosynthesis, so less growth.'], ['Spread and control', 'Spores spread in wind and water. Spray fungicide; remove and destroy affected leaves.']], COL.fungus);
  notes(s, 'Salmonella symptoms are caused by the bacteria AND the toxins they secrete. Gonorrhoea was treated with penicillin until many resistant strains appeared: a link to antibiotic resistance in lesson 3 and 4.6.')
}

D.hinge({
  title: 'Quick check',
  q: 'Which disease is caused by a fungus?',
  options: ['Rose black spot', 'Tobacco mosaic virus', 'Gonorrhoea', 'Malaria'],
  correct: 0,
  notes: 'Answer A. B is a virus (in the name). C is a bacterium. D is a protist.',
});

D.myTurnYourTurn({
  title: 'Explaining plant disease', tag: 'Exam skill', stepSize: 19, labelW: 1.55, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain why TMV reduces the growth of a tomato plant.  [3 marks]',
    steps: [
      { label: 'Symptom', text: '**Mosaic patches on leaves**' },
      { label: 'Cause', text: '**Less chlorophyll there**' },
      { label: 'Process', text: '**Less photosynthesis**' },
      { label: 'Effect', text: '**Less glucose, so less growth**' },
    ],
  },
  yours: {
    q: 'Explain why rose black spot reduces the growth of a rose.  [3 marks]',
    steps: [
      { label: 'Symptom', text: '**Black spots; leaves fall**' },
      { label: 'Cause', text: '**Less leaf area for light**' },
      { label: 'Process', text: '**Less photosynthesis**' },
      { label: 'Effect', text: '**Less glucose, so less growth**' },
    ],
  },
  notes: 'The chain: symptom → less light absorbed / less chlorophyll → less photosynthesis → less glucose for respiration and making new cells → less growth. Each link is usually a mark.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: malaria, a protist disease', { tag: '4.3.1.5' });
  // life cycle: two boxes and arrows
  const mx = MX + 0.3, hx = MX + 4.6, by = 2.0, bw = 2.6, bh = 1.3;
  rect(s, mx, by, bw, bh, 'DCEFE2', COL.protist); txt(s, 'Mosquito\n(the vector)', mx, by, bw, bh, { size: 20, bold: true, color: COL.protist, align: 'center', valign: 'middle' });
  rect(s, hx, by, bw, bh, 'FBE9E7', 'B5655B'); txt(s, 'Human\n(the host)', hx, by, bw, bh, { size: 20, bold: true, color: 'B5655B', align: 'center', valign: 'middle' });
  arrow(s, mx + bw + 0.1, by + 0.35, hx - 0.1, by + 0.35, C.ink, 3);
  txt(s, 'bites: protists enter the blood', mx + bw - 0.2, by - 0.45, 2.3, 0.4, { size: 14, color: C.ink, align: 'center' });
  arrow(s, hx - 0.1, by + bh - 0.35, mx + bw + 0.1, by + bh - 0.35, C.ink, 3);
  txt(s, 'bites an infected person: takes in protists', mx + bw - 0.4, by + bh + 0.05, 2.7, 0.65, { size: 14, color: C.ink, align: 'center' });
  rect(s, MX, 4.35, 6.9, 2.5, C.soft, C.line);
  txt(s, 'Symptoms', MX + 0.25, 4.45, 6.4, 0.45, { size: 19, bold: true, color: C.maroon });
  txt(s, '**Recurrent episodes of fever**: the fever keeps coming back. Malaria can be **fatal**.', MX + 0.25, 4.95, 6.4, 0.9, { size: 18 });
  txt(s, 'The protists have a **life cycle** that includes the mosquito.', MX + 0.25, 5.9, 6.4, 0.8, { size: 18 });
  const bx = MX + 7.3, bw2 = W - MX - bx;
  rect(s, bx, 1.4, bw2, 5.45, C.greenSoft, C.green);
  rect(s, bx, 1.4, bw2, 0.6, C.green);
  txt(s, 'Reducing the spread', bx + 0.25, 1.4, bw2 - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  const ctrl = [['Stop vectors breeding', 'Drain or spray standing water, where mosquitoes lay eggs.'], ['Kill mosquitoes', 'Insecticide sprays.'], ['Mosquito nets', 'Sleep under nets (treated with insecticide) to stop bites.'], ['Medicines', 'Antimalarial drugs for travellers and patients.']];
  ctrl.forEach(([a, b], i) => {
    const y = 2.2 + i * 1.15;
    txt(s, a, bx + 0.25, y, bw2 - 0.5, 0.4, { size: 18, bold: true, color: C.green });
    txt(s, b, bx + 0.25, y + 0.4, bw2 - 0.5, 0.7, { size: 16 });
  });
  notes(s, 'Spec: "The pathogens that cause malaria are protists. The malarial protist has a life cycle that includes the mosquito. Malaria causes recurrent episodes of fever and can be fatal. The spread of malaria is controlled by preventing the vectors, mosquitos, from breeding and by using mosquito nets to avoid being bitten." The mosquito is not harmed: it is the vector.');
}

// summary tables
{
  const head = ['Disease', 'Pathogen', 'Spread', 'Control'];
  const cw = [2.6, 1.7, 4.0, W - 2 * MX - 8.3];
  const table = (s, rows) => {
    const top = 1.4, rh = (6.85 - top - 0.6) / rows.length;
    head.forEach((h1, j) => { const x = MX + cw.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, top, cw[j], 0.6, C.maroon); txt(s, h1, x + 0.15, top, cw[j] - 0.3, 0.6, { size: 17, bold: true, color: C.white, valign: 'middle' }); });
    rows.forEach((r, i) => r.forEach((c, j) => {
      const x = MX + cw.slice(0, j).reduce((a, b) => a + b, 0), y = top + 0.6 + i * rh;
      rect(s, x, y, cw[j], rh, i % 2 ? C.white : C.soft, C.line);
      if (D.textH(c, 19, cw[j] - 0.3, j === 0) > rh - 0.1) throw new Error('summary cell too long: ' + c);
      txt(s, c, x + 0.15, y, cw[j] - 0.3, rh, { size: 19, bold: j === 0, color: j === 1 ? COL[{ Virus: 'virus', Bacterium: 'bacteria', Fungus: 'fungus', Protist: 'protist' }[c]] : C.ink, valign: 'middle' });
    }));
  };
  const s1 = frame('Summary: the seven diseases (1)', { tag: 'Revision' });
  table(s1, [['Measles', 'Virus', 'Droplets in the air', 'Vaccinate young children; isolate'], ['HIV', 'Virus', 'Sexual contact; body fluids', 'Antiretroviral drugs; condoms'], ['TMV', 'Virus', 'Contact between plants', 'Remove infected plants; hygiene'], ['Salmonella', 'Bacterium', 'Infected or badly prepared food', 'Vaccinate poultry; cook food fully']]);
  notes(s1, 'Use these two slides for revision: cover a column and test each other.');
  const s2 = frame('Summary: the seven diseases (2)', { tag: 'Revision' });
  table(s2, [['Gonorrhoea', 'Bacterium', 'Sexual contact', 'Antibiotics; condoms'], ['Rose black spot', 'Fungus', 'Spores in wind and water', 'Fungicide; remove and destroy leaves'], ['Malaria', 'Protist', 'Mosquito bites (vector)', 'Stop mosquitoes breeding; nets']]);
  notes(s2, 'Seven named diseases in 4.3.1.2–4.3.1.5.');
}

D.myTurnYourTurn({
  title: 'Reducing the spread', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Describe how the spread of measles can be reduced.  [3 marks]',
    steps: [
      { label: 'Vaccinate', text: '**Vaccinate young children**' },
      { label: 'Isolate', text: '**Ill people stay at home**' },
      { label: 'Hygiene', text: '**Catch coughs and sneezes**' },
    ],
  },
  yours: {
    q: 'Describe how the spread of malaria can be reduced.  [3 marks]',
    steps: [
      { label: 'Breeding', text: '**Drain standing water**' },
      { label: 'Insecticide', text: '**Kill adult mosquitoes**' },
      { label: 'Nets', text: '**Sleep under mosquito nets**' },
    ],
  },
  notes: 'Match the method to how the disease spreads: measles by droplets in the air, so vaccinate and isolate; malaria by a vector, so control the mosquito and stop it biting.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Name the four types of pathogen.', 'Bacteria, viruses, fungi, protists'], ['How do bacteria make us feel ill?', 'They make toxins that damage tissues'], ['Give two symptoms of measles.', 'Fever and a red skin rash'], ['Name the vector that spreads malaria.', 'Mosquito'],
    ['Why is gonorrhoea harder to treat than it used to be?', 'Many strains are resistant to penicillin'], ['Suggest why poultry in the UK are vaccinated against Salmonella.', 'So chickens and eggs do not pass it to people'],
    ['Explain why a person with AIDS may die from an infection a healthy person would survive.', 'HIV has damaged the immune cells, so the body cannot fight it'], ['A gardener sees black spots on rose leaves. Give two things they should do.', 'Spray fungicide; remove and destroy the leaves'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: explain', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) bacteria, viruses, protists, fungi  2) produce toxins that damage tissues  3) fever, red skin rash  4) mosquito  5) many strains are resistant to antibiotics such as penicillin  6) stops infected chickens or eggs passing Salmonella to people, so fewer cases of food poisoning  7) HIV attacks immune cells; the immune system is badly damaged so it cannot deal with other infections  8) spray with fungicide; remove and destroy affected leaves (so spores do not spread).');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.3,
  stem: 'Measles, HIV and malaria are communicable diseases.',
  parts: [
    { l: 'a', q: 'Name the type of pathogen that causes measles.', m: 1, lines: 0 },
    { l: 'b', q: 'A child with measles is kept at home for several days. Explain why.', m: 2, lines: 1 },
    { l: 'c', q: 'Explain how infection with HIV can lead to AIDS.', m: 3, lines: 1 },
    { l: 'd', q: 'Malaria kills hundreds of thousands of people every year. Describe how the spread of malaria can be reduced.', m: 4, lines: 2 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'virus', '1', ''],
    ['(b)', 'measles spreads by droplets (coughs, sneezes); so isolating stops it spreading to others', '2', '1 for how it spreads; 1 for the link'],
    ['(c)', 'HIV attacks immune cells; immune system badly damaged; cannot fight other infections or cancers', '3', 'allow: if not treated with antiretrovirals'],
    ['(d)', 'mosquito is the vector; stop breeding (drain/spray water); insecticide; nets stop bites', '4', 'max 3 if the vector is not named'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What is a pathogen?', 'Name a disease caused by a protist.', 'How is rose black spot spread?', 'Give one way to reduce the spread of Salmonella.'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) a microorganism that causes disease  2) malaria  3) spores carried by wind or water  4) vaccinate poultry / cook food thoroughly / hygiene when preparing food. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain the difference between how bacteria and viruses make us ill.',
    'Describe the symptoms of TMV and explain how it affects the plant.',
    'Gonorrhoea: give the symptoms, how it spreads and two ways to prevent it.',
    'Explain why sleeping under a mosquito net reduces the risk of malaria.',
    'Suggest why diseases spread quickly in crowded places with poor sanitation.',
    'HIV can be passed between drug users. Explain how, and how this can be prevented.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) bacteria reproduce rapidly and make toxins that damage tissues; viruses reproduce inside cells and damage them  2) mosaic discoloured patches; less chlorophyll, less photosynthesis, less growth  3) yellow/green discharge, pain urinating; sexual contact; antibiotics, condoms  4) mosquitoes are vectors; nets stop bites, so protists are not passed into the blood  5) close contact/droplets; contaminated water; more people to infect  6) shared needles transfer infected blood; do not share needles / needle exchange.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.3.1_A_CommunicableDiseases.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count));
