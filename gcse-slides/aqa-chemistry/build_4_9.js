// build_4_9.js — AQA GCSE Chemistry (8462) 4.9 Chemistry of the atmosphere (one lesson):
// 4.9.1 Composition and evolution of the atmosphere, 4.9.2 Carbon dioxide and methane as greenhouse gases,
// 4.9.3 Common atmospheric pollutants and their sources.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_9.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.9', 'Chemistry of the atmosphere'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
const AIR = [['nitrogen', 78], ['oxygen', 21], ['argon', 0.93], ['carbon dioxide', 0.04], ['other', 0.03]];
near('air total', AIR.reduce((t, [, v]) => t + v, 0), 100);
near('N2 4/5', 78 / 100, 0.78); near('O2 1/5', 21 / 100, 0.21);
balanced('photosynthesis', [[6, 'CO2'], [6, 'H2O']], [[1, 'C6H12O6'], [6, 'O2']]);
balanced('CaCO3 form', [[1, 'CaO'], [1, 'CO2']], [[1, 'CaCO3']]);
balanced('CO comb', [[2, 'CH4'], [3, 'O2']], [[2, 'CO'], [4, 'H2O']]);
balanced('C soot', [[1, 'CH4'], [1, 'O2']], [[1, 'C'], [2, 'H2O']]);
balanced('S burn', [[1, 'S'], [1, 'O2']], [[1, 'SO2']]);
balanced('NO', [[1, 'N2'], [1, 'O2']], [[2, 'NO']]);
balanced('NO2', [[2, 'NO'], [1, 'O2']], [[2, 'NO2']]);
balanced('C3H8 incomplete', [[2, 'C3H8'], [7, 'O2']], [[6, 'CO'], [8, 'H2O']]);
balanced('exam C8H18 CO', [[2, 'C8H18'], [17, 'O2']], [[16, 'CO'], [18, 'H2O']]);
// percentages and graph reading
near('MT % CO2 280->420', Math.round((420 - 280) / 280 * 100), 50);
near('YT % CO2 315->420', Math.round((420 - 315) / 315 * 1000) / 10, 33.3);
near('MT N2 in 500', 500 * 0.78, 390); near('YT O2 in 250', 250 * 0.21, 52.5);
near('footprint', 2 * 120 + 50, 290);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'How the atmosphere formed and changed, greenhouse gases and climate change, carbon footprints, and pollutants from burning fuels',
  bullets: ['Part 1: today’s atmosphere and how it evolved (4.9.1)', 'Part 2: greenhouse gases and climate change (4.9.2)', 'Part 3: carbon footprint (4.9.2.4)', 'Part 4: atmospheric pollutants (4.9.3)'],
  notes: 'AQA 8462 GCSE Chemistry 4.9 Chemistry of the atmosphere (one lesson). Evaluation and interpreting evidence are important: AQA asks students to evaluate different theories of the early atmosphere and to recognise the uncertainty in climate models. About two hours.',
});

D.objectives({
  tag: '4.9',
  items: [
    'Give the **composition** of the air and explain how the atmosphere **evolved**.',
    'Explain the **greenhouse effect** and evaluate evidence for **climate change**.',
    'Describe the **carbon footprint** and ways to reduce it.',
    'Describe the sources and effects of **CO, soot, SO₂ and NOₓ**.',
  ],
  keywords: ['atmosphere', 'photosynthesis', 'greenhouse gas', 'climate change', 'carbon footprint', 'pollutant'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Products of complete combustion of a hydrocarbon?', 'Word equation for photosynthesis?', 'What is a finite resource?', 'Test for carbon dioxide?'],
  answers: ['carbon dioxide and water', 'CO₂ + water → glucose + oxygen', 'one that will run out', 'limewater turns milky'],
  notes: 'Retrieval from 4.7, Biology and 4.8.',
});

D.vocab({
  title: 'Key words', tag: '4.9',
  items: [
    { term: 'Greenhouse gas', def: 'A gas that **absorbs** long-wavelength (infrared) radiation, keeping the Earth **warm**: CO₂, CH₄, water vapour.' },
    { term: 'Climate change', def: 'Long-term changes to **global** temperature and weather patterns.' },
    { term: 'Carbon footprint', def: 'The total **CO₂ and other greenhouse gases** emitted over the **full life cycle** of a product, service or event.' },
    { term: 'Particulate', def: 'Tiny solid particles (e.g. **soot**) in the air.' },
  ],
  notes: 'Spec 4.9.2 and 4.9.3.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the air today', { tag: '4.9.1.1' });
  // horizontal bar
  const x = MX, y = 1.6, w = W - 2 * MX, h = 0.9;
  rect(s, x, y, w * 0.78, h, '3C7DC4', '3C7DC4'); txt(s, 'nitrogen 78%', x, y, w * 0.78, h, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
  rect(s, x + w * 0.78, y, w * 0.21, h, '5E9C3E', '5E9C3E'); txt(s, 'oxygen 21%', x + w * 0.78, y, w * 0.21, h, { size: 18, bold: true, color: C.white, align: 'center', valign: 'middle' });
  rect(s, x + w * 0.99, y, w * 0.01, h, 'E8C21E', 'E8C21E');
  txt(s, 'other gases about 1%: argon 0.93%, carbon dioxide 0.04%, water vapour, other noble gases', x, y + h + 0.1, w, 0.4, { size: 15, italic: true, color: C.grey, align: 'right' });
  const tw = W - 2 * MX;
  table(s, MX, 3.25, [tw * 0.4, tw * 0.3, tw * 0.3], ['Gas', 'Percentage', 'Fraction'], [['nitrogen', 'about 78%', 'about four-fifths'], ['oxygen', 'about 21%', 'about one-fifth'], ['argon, CO₂, other', 'about 1%', 'small amounts']], { rh: 0.62, hh: 0.6, size: 18, align: ['left', 'center', 'center'] });
  note(s, MX, 5.75, tw, 1.1, 'These proportions have stayed about the same for the last **200 million years**.', { size: 18 });
  notes(s, 'Spec 4.9.1.1: "For 200 million years, the proportions of different gases in the atmosphere have been much the same as they are today: about four-fifths (approximately 80%) nitrogen; about one-fifth (approximately 20%) oxygen; small proportions of various other gases, including carbon dioxide, water vapour and noble gases." Students should be able to use percentages and fractions; percentages here sum to 100 (checked).');
}

{
  const s = frame('How the atmosphere evolved', { tag: '4.9.1.2–4' });
  const steps = [
    ['1. Early Earth (first billion years)', 'Intense **volcanic activity** released gases: mainly **carbon dioxide**, with water vapour, nitrogen and small amounts of methane and ammonia. Little or no oxygen, like Mars and Venus today.', 'B85C38'],
    ['2. Oceans form', 'Water vapour **condensed** to form the oceans. CO₂ **dissolved** in the water; **carbonates** precipitated to form **sediments**.', '3C7DC4'],
    ['3. Oxygen arrives (about 2.7 billion years ago)', '**Algae** and later plants made oxygen by **photosynthesis**. Over the next billion years oxygen built up, allowing animals to evolve.', '5E9C3E'],
    ['4. CO₂ decreases', 'Used by photosynthesis; **locked up** in **sedimentary rocks** (limestone) and **fossil fuels** (coal, oil, gas).', '7A4E9C'],
  ];
  steps.forEach(([a, b, c], i) => {
    const y = 1.4 + i * 1.38;
    rect(s, MX, y, 0.15, 1.25, c, c);
    txt(s, a, MX + 0.35, y, W - 2 * MX - 0.4, 0.42, { size: 17, bold: true, color: c });
    txt(s, b, MX + 0.35, y + 0.42, W - 2 * MX - 0.4, 0.85, { size: 15 });
  });
  notes(s, 'Spec 4.9.1.2: "Theories about what was in the Earth\'s early atmosphere and how the atmosphere was formed have changed and developed over time. Evidence for the early atmosphere is limited because of the time scale of 4.6 billion years." 4.9.1.3: "Algae first produced oxygen about 2.7 billion years ago and soon after this oxygen appeared in the atmosphere." 4.9.1.4: "Algae and plants decreased the percentage of carbon dioxide in the atmosphere by photosynthesis. Carbon dioxide was also decreased by the formation of sedimentary rocks and fossil fuels that contain carbon." Students should be able to interpret evidence and evaluate different theories about the Earth\'s early atmosphere.');
}

{
  const s = frame('Equations for the changes', { tag: '4.9.1.3–4' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.3, tw * 0.7], ['Process', 'Equation'], [
    ['Photosynthesis', '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'],
    ['Forming carbonate rock', 'CaO + CO₂ → CaCO₃ (CO₂ dissolved in oceans → limestone)'],
  ], { rh: 0.85, size: 18 });
  note(s, MX, 3.6, tw, 1.45, '**Evidence is limited**: the Earth is **4.6 billion years** old, and no one was there to measure it. Scientists use **rocks**, **ice cores** and **other planets** to test their theories.', { size: 17 });
  headCard(s, MX, 5.3, tw, 1.55, 'Evaluate a theory', C.green, C.greenSoft);
  txt(s, 'Ask: what **evidence** supports it? Is it **direct** or **indirect**? What evidence would **disprove** it?', MX + 0.2, 5.95, tw - 0.4, 0.8, { size: 17 });
  notes(s, 'Equations checked by atom counting. The CaO + CO₂ equation is a simplified illustration of carbonate formation (the spec does not require a specific equation).');
}

D.hinge({
  title: 'Quick check',
  q: 'What caused the amount of oxygen in the atmosphere to increase?',
  options: ['Photosynthesis by algae and plants', 'Volcanic eruptions', 'Formation of sedimentary rocks', 'Burning fossil fuels'],
  correct: 0,
  notes: 'Answer A. B released CO₂ and water vapour. C removed CO₂. D uses oxygen.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the greenhouse effect', { tag: '4.9.2.1' });
  // diagram: sun, earth, atmosphere band, arrows
  circle(s, MX + 0.8, 2.0, 1.0, 'F5C518', 'E0A800', 1);
  rect(s, MX + 1.9, 1.5, 0.3, 4.6, 'D6E8F7', 'D6E8F7');
  txt(s, 'atmosphere', MX + 1.4, 6.15, 1.3, 0.35, { size: 13, bold: true, align: 'center', color: C.blue });
  rect(s, MX + 5.3, 1.6, 0.5, 4.4, '7FB069', '5E8A4A');
  txt(s, 'Earth', MX + 4.95, 6.1, 1.2, 0.35, { size: 13, bold: true, align: 'center' });
  arrow(s, MX + 1.35, 2.15, MX + 5.25, 2.35, 'E0A800', 3);
  txt(s, 'short-wavelength radiation from the Sun passes through', MX + 2.35, 1.45, 2.85, 0.6, { size: 12, bold: true, color: 'B38600' });
  txt(s, 'Earth gives off long-wavelength (infrared) radiation', MX + 2.35, 2.75, 2.85, 0.6, { size: 12, bold: true, color: C.red });
  arrow(s, MX + 5.25, 3.95, MX + 2.25, 3.65, C.red, 3);
  arrow(s, MX + 2.25, 4.45, MX + 5.25, 4.75, C.red, 3);
  txt(s, 'greenhouse gases absorb and re-emit it: Earth stays warm', MX + 2.35, 4.95, 2.85, 0.6, { size: 12, bold: true, color: C.red });
  const bx = MX + 6.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.0, 'Greenhouse gases', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Water vapour**, **carbon dioxide** and **methane**.', 'They let short-wavelength radiation **in**, but **absorb** outgoing long-wavelength radiation.', 'Without them, Earth would be too cold for life.'], 15, 0.1);
  headCard(s, bx, 4.6, bw, 2.25, 'Human activities increase them', C.red, 'FBEAEA');
  bullets(s, bx + 0.2, 5.3, bw - 0.4, ['**CO₂**: burning fossil fuels; **deforestation**.', '**Methane**: **cattle** farming, **rice** fields, **landfill**.'], 15, 0.1);
  notes(s, 'Spec 4.9.2.1: "Greenhouse gases in the atmosphere maintain temperatures on Earth high enough to support life. Water vapour, carbon dioxide and methane are greenhouse gases. Students should be able to describe the greenhouse effect in terms of the interaction of short and long wavelength radiation with matter." 4.9.2.2: "Some human activities increase the amounts of greenhouse gases in the atmosphere. These include: carbon dioxide; methane." The diagram is simplified.');
}

{
  const s = frame('Climate change: evidence and effects', { tag: '4.9.2.2–3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.0, 'The evidence', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['**Peer-reviewed** evidence: human activity is making **temperatures rise**.', 'Climate **models** are **simplified**: some **uncertainty**.', 'The **media** may give **opinions** or only part of the evidence.'], 15, 0.1);
  headCard(s, MX + cw + gap, 1.4, cw, 3.0, 'Possible effects', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['**Sea levels rise**: flooding, coastal erosion.', 'More frequent and severe **storms**.', 'Changes to **rainfall** and **water** supply.', 'Changes to **food** production; species **distribution** changes.'], 15, 0.08);
  headCard(s, MX, 4.6, W - 2 * MX, 2.25, 'Reducing emissions (and the problems)', C.green, C.greenSoft);
  txt(s, 'Use **renewable** energy and **nuclear**; **energy saving**; **carbon capture and storage**; **carbon taxes**; plant trees.  Problems: **cost**, people unwilling to change **lifestyle**, lack of **international agreement**, some developing countries need fossil fuels.', MX + 0.2, 5.3, W - 2 * MX - 0.4, 1.45, { size: 16 });
  notes(s, 'Spec 4.9.2.2: "Based on peer-reviewed evidence, many scientists believe that human activities will cause the temperature of the Earth\'s atmosphere to increase at the surface and that this will result in global climate change. However, it is difficult to model such complex systems as global climate change. This can lead to simplified models, speculation and opinions presented in the media that may be based on only parts of the evidence and which may be biased." 4.9.2.3 lists potential effects. 4.9.2.4: actions to reduce emissions and problems in reducing the carbon footprint.');
}

D.myTurnYourTurn({
  title: 'Atmosphere maths', tag: 'Maths skill', stepSize: 17, labelW: 2.6, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Calculate (% rise for CO₂):',
    steps: [
      { label: 'N₂ in 500 cm³ of air', text: '500 × 0.78 = **390 cm³**' },
      { label: 'CO₂ 280 → 420 ppm', text: '140 ÷ 280 × 100 = **50%**' },
    ],
  },
  yours: {
    q: 'Calculate (% rise for CO₂):',
    steps: [
      { label: 'O₂ in 250 cm³ of air', text: '250 × 0.21 = **52.5 cm³**' },
      { label: 'CO₂ 315 → 420 ppm', text: '105 ÷ 315 × 100 = **33.3%**' },
    ],
  },
  notes: 'ppm = parts per million. 280 ppm is roughly pre-industrial; 315 ppm was about 1958; 420 ppm is recent. Checked in the build script.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: carbon footprint', { tag: '4.9.2.4' });
  note(s, MX, 1.4, W - 2 * MX, 0.9, 'The **carbon footprint** is the total amount of CO₂ and other greenhouse gases emitted over the **full life cycle** of a product, service or event.', { fill: C.soft, line: C.line, size: 17 });
  // life cycle boxes
  const st = ['raw materials', 'manufacture', 'transport', 'use', 'disposal'];
  const bw = (W - 2 * MX - 4 * 0.35) / 5;
  st.forEach((t, i) => { const x = MX + i * (bw + 0.35); rect(s, x, 2.6, bw, 0.85, C.orangeSoft, 'F3D9B5', { round: true }); txt(s, t, x, 2.6, bw, 0.85, { size: 17, bold: true, align: 'center', valign: 'middle' }); if (i < 4) arrow(s, x + bw + 0.03, 3.02, x + bw + 0.32, 3.02, C.ink, 2); });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 3.75, cw, 3.1, 'Ways to reduce it', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 4.45, cw - 0.4, ['Renewable energy; energy efficiency.', '**Carbon capture and storage**.', 'Carbon taxes and licences.', 'Carbon **off-setting**, e.g. planting trees.', 'Using **plants as biofuels**.'], 15, 0.06);
  headCard(s, MX + cw + gap, 3.75, cw, 3.1, 'Problems', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 4.45, cw - 0.4, ['Scientific disagreement; **economic** cost.', 'Lack of public **education**; **lifestyle** changes.', 'Hard to get **international** agreement.'], 15, 0.08);
  notes(s, 'Spec 4.9.2.4: "The carbon footprint is the total amount of carbon dioxide and other greenhouse gases emitted over the full life cycle of a product, service or event. The carbon footprint can be reduced by reducing emissions of carbon dioxide and methane. Students should be able to: describe actions to reduce emissions of carbon dioxide and methane; give reasons why actions may be limited."');
}

D.hinge({
  title: 'Quick check',
  q: 'Which human activity increases methane in the atmosphere?',
  options: ['Cattle farming', 'Planting forests', 'Using solar panels', 'Recycling metals'],
  correct: 0,
  notes: 'Answer A (also rice fields and landfill). B removes CO₂. C and D reduce emissions.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: pollutants from burning fuels', { tag: '4.9.3' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.2, tw * 0.4, tw * 0.4], ['Pollutant', 'How it forms', 'Effect'], [
    ['Carbon monoxide (CO)', '**incomplete combustion** of fuels', '**toxic**: colourless, odourless; stops blood carrying **oxygen**'],
    ['Soot (carbon particulates)', 'incomplete combustion', '**global dimming**; **lung** damage'],
    ['Sulfur dioxide (SO₂)', 'sulfur **impurities** in fuels burn', '**acid rain**; breathing problems'],
    ['Oxides of nitrogen (NOₓ)', 'N₂ and O₂ from air react at the **high temperature** of an engine', '**acid rain**; breathing problems'],
  ], { rh: 0.82, size: 15 });
  note(s, MX, 5.55, tw, 1.3, 'Not enough oxygen:  **2CH₄ + 3O₂ → 2CO + 4H₂O**   or   **CH₄ + O₂ → C + 2H₂O**', { size: 17 });
  notes(s, 'Spec 4.9.3.1: "The combustion of fuels is a major source of atmospheric pollutants. Most fuels, including coal, contain carbon and/or hydrogen and may also contain some sulfur. The gases released into the atmosphere when a fuel is burned may include carbon dioxide, water vapour, carbon monoxide, sulfur dioxide and oxides of nitrogen. Solid particles and unburned hydrocarbons may also be released that form particulates in the atmosphere." 4.9.3.2: "Carbon monoxide is a toxic gas. It is colourless and odourless and so is not easily detected. Sulfur dioxide and oxides of nitrogen cause respiratory problems in humans and cause acid rain. Particulates cause global dimming and health problems for humans." All equations checked by atom counting.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is carbon monoxide especially dangerous?',
  options: ['It is toxic and cannot be seen or smelled', 'It causes acid rain', 'It is a greenhouse gas only', 'It forms soot'],
  correct: 0,
  notes: 'Answer A. B is SO₂ and NOₓ. C: CO is not mainly discussed as a greenhouse gas at GCSE. D: soot is carbon particles.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Percentage of nitrogen in the air?', 'About 78% (four-fifths)'], ['Main gas in the early atmosphere?', 'Carbon dioxide'], ['Name three greenhouse gases.', 'CO₂, methane, water vapour'], ['What is a carbon footprint?', 'Total greenhouse gases over a full life cycle'],
    ['How did CO₂ in the early atmosphere decrease? (two ways)', 'Photosynthesis; dissolving to form carbonate rocks/fossil fuels'], ['Why does incomplete combustion happen?', 'Not enough oxygen'],
    ['Explain how NOₓ forms in a car engine.', 'N₂ and O₂ react at high temperature'], ['Give one reason why reducing emissions is difficult.', 'Cost / lifestyle / no international agreement'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) about 78% (four-fifths)  2) carbon dioxide  3) carbon dioxide, methane, water vapour  4) total CO₂ and other greenhouse gases emitted over the full life cycle of a product, service or event  5) photosynthesis; dissolving in oceans and forming sedimentary rocks; fossil fuels  6) not enough oxygen  7) nitrogen and oxygen from the air react at the high temperature in the engine  8) cost, unwilling to change lifestyle, lack of international agreement, scientific disagreement.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Describe how the amount of carbon dioxide in the Earth’s atmosphere decreased over billions of years.', m: 3, lines: 1 },
    { l: 'b', q: 'Explain how greenhouse gases keep the Earth warm. Refer to radiation.', m: 3, lines: 1 },
    { l: 'c', q: 'Octane, C₈H₁₈, burns in limited oxygen to form carbon monoxide and water. Write a balanced equation.', m: 2, lines: 0 },
    { l: 'd', q: 'Explain why sulfur dioxide is released from some power stations and give one effect.', m: 2, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'photosynthesis by algae/plants; CO₂ dissolved in oceans and formed carbonate / sedimentary rocks; locked in fossil fuels', '3', ''],
    ['(b)', 'short-wavelength radiation from the Sun passes through; Earth emits long-wavelength (infrared) radiation; greenhouse gases absorb (and re-emit) it', '3', ''],
    ['(c)', '2C₈H₁₈ + 17O₂ → 16CO + 18H₂O (formulae 1, balancing 1)', '2', ''],
    ['(d)', 'fossil fuels (coal) contain sulfur impurities that burn; acid rain / breathing problems', '2', ''],
  ],
  notes: 'Mark scheme on the next slide. Equation checked by atom counting.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['When did algae start producing oxygen?', 'Name two sources of methane.', 'Give two effects of climate change.', 'Which pollutants cause acid rain?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) about 2.7 billion years ago  2) cattle, rice fields, landfill  3) rising sea levels, storms, rainfall changes, food production, species distribution  4) sulfur dioxide and oxides of nitrogen. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw a timeline of the Earth’s atmosphere from 4.6 billion years ago to today.',
    'Explain why evidence about the early atmosphere is limited.',
    'Draw and label a diagram of the greenhouse effect.',
    'Write equations for complete and incomplete combustion of propane (C₃H₈).',
    'Describe the carbon footprint of a car journey and two ways to reduce it.',
    'Evaluate the claim: "Climate models are simplified, so we should ignore them."',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) volcanoes → oceans → algae oxygen (2.7 bya) → CO₂ locked in rocks/fossil fuels → stable 200 million years  2) 4.6 billion years ago; no direct measurements  3) see Part 2  4) C₃H₈ + 5O₂ → 3CO₂ + 4H₂O; 2C₃H₈ + 7O₂ → 6CO + 8H₂O  5) fuel extraction, refining, burning; car share, electric vehicles, public transport  6) models are simplified but based on peer-reviewed evidence; uncertainty is not the same as being wrong; balanced conclusion.');
}
balanced('HW C3H8 complete', [[1, 'C3H8'], [5, 'O2']], [[3, 'CO2'], [4, 'H2O']]);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.9_Atmosphere.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
