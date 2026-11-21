// build_4_10_A.js — AQA GCSE Chemistry (8462) 4.10 Using resources, lesson 1 of 2:
// 4.10.1.1 Using the Earth's resources and sustainable development, 4.10.1.2 Potable water (RP8),
// 4.10.1.3 Waste water treatment, 4.10.1.4 Alternative methods of extracting metals (HT),
// 4.10.2.1 Life cycle assessment, 4.10.2.2 Ways of reducing the use of resources.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_10_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.10.1–4.10.2', 'Water, metals and life cycles'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
// RP8: dissolved solids by evaporation
near('RP8 ex', 50.82 - 50.70, 0.12); near('RP8 conc', 0.12 / 0.050, 2.4);
near('MT mass', 32.48 - 32.40, 0.08); near('MT conc', 0.08 / 0.025, 3.2);
near('YT mass', 41.16 - 41.10, 0.06); near('YT conc', 0.06 / 0.020, 3.0);
// displacement with scrap iron
balanced('Fe+CuSO4', [[1, 'Fe'], [1, 'CuSO4']], [[1, 'FeSO4'], [1, 'Cu']]);
balanced('ionic Fe Cu', [[1, 'Fe'], [1, 'Cu']], [[1, 'Fe'], [1, 'Cu']]); calc('charge Fe Cu', 0 + 2, 2 + 0);
balanced('cathode Cu', [[1, 'Cu']], [[1, 'Cu']]); calc('charge Cu half', 2 - 2, 0);
// LCA comparison (illustrative)
const bagP = { energy: 3.6, co2: 1.6 }, bagPl = { energy: 1.5, co2: 0.8 };
calc('LCA plastic lower energy', bagPl.energy < bagP.energy ? 1 : 0, 1);
near('LCA ratio', Math.round(bagP.co2 / bagPl.co2 * 10) / 10, 2.0);
// recycling saving (illustrative): aluminium recycling saves about 95% of energy
near('Al saving', 100 - 5, 95); near('MT recycle', 200 * 0.95, 190);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Sustainable development, making water safe to drink, treating waste water, new ways to extract metals, and life cycle assessment',
  bullets: ['Part 1: sustainability and potable water (4.10.1.1–2)', 'Part 2: RP8 and waste water treatment (4.10.1.2–3)', 'Part 3: alternative methods of extracting metals (4.10.1.4, HT)', 'Part 4: life cycle assessment and recycling (4.10.2)'],
  notes: 'AQA 8462 GCSE Chemistry 4.10 Using resources, lesson 1 of 2. Lesson 2: corrosion, alloys, ceramics, polymers, composites, the Haber process and NPK fertilisers. About two hours.',
});

D.objectives({
  tag: '4.10.1–2',
  items: [
    'Explain **sustainable development** and the difference between **potable** and **pure** water.',
    'Describe how water is made **potable**, and do **RP8**.',
    'Describe **phytomining** and **bioleaching** (HT).',
    'Carry out a simple **life cycle assessment** and explain **recycling**.',
  ],
  keywords: ['sustainable', 'potable', 'desalination', 'sewage', 'phytomining', 'life cycle assessment'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['How does simple distillation work?', 'Name a metal extracted by electrolysis.', 'What is a finite resource?', 'Test for chloride ions?'],
  answers: ['evaporate then condense the solvent', 'aluminium', 'one that will run out', 'HNO₃ + AgNO₃: white ppt'],
  notes: 'Retrieval from 4.1, 4.4, 4.7 and 4.8.',
});

D.vocab({
  title: 'Key words', tag: '4.10.1',
  items: [
    { term: 'Sustainable development', def: 'Meets the needs of people **today** without harming the ability of **future generations** to meet theirs.' },
    { term: 'Potable water', def: 'Water that is **safe to drink**: low levels of dissolved salts and microbes. **Not** pure.' },
    { term: 'Desalination', def: 'Removing **salt** from sea water: **distillation** or **reverse osmosis**.' },
    { term: 'Life cycle assessment', def: 'Assessing the **environmental impact** of a product at **every stage** of its life.' },
  ],
  notes: 'Spec 4.10.1 and 4.10.2.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: using the Earth’s resources', { tag: '4.10.1.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.0, 'What we use', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['Resources from the **Earth, oceans and atmosphere** for warmth, shelter, food and transport.', '**Natural** resources (e.g. cotton, wood) are supplemented or replaced by **synthetic** ones.', '**Finite** resources: crude oil, metal ores. **Renewable**: wood, crops.'], 15, 0.1);
  headCard(s, MX + cw + gap, 1.4, cw, 3.0, 'Chemistry’s role', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['Improve **agricultural** and **industrial** processes.', 'Make new products and processes that are **sustainable**.', 'Use **less energy** and produce **less waste**.'], 15, 0.1);
  note(s, MX, 4.65, W - 2 * MX, 2.2, '**Sustainable development** meets the needs of present development without compromising the ability of **future generations** to meet their own needs.\nExample: using **catalysts** (lower temperature, less energy) and reactions with **high atom economy**.', { size: 17 });
  notes(s, 'Spec 4.10.1.1: "Humans use the Earth\'s resources to provide warmth, shelter, food and transport. Natural resources, supplemented by agriculture, provide food, timber, clothing and fuels. Finite resources from the Earth, oceans and atmosphere are processed to provide energy and materials. Chemistry plays an important role in improving agricultural and industrial processes to provide new products and in sustainable development, which is development that meets the needs of current generations without compromising the ability of future generations to meet their own needs." Students should be able to interpret and evaluate information about the use of natural and synthetic resources.');
}

{
  const s = frame('Potable water', { tag: '4.10.1.2' });
  note(s, MX, 1.4, W - 2 * MX, 0.9, '**Potable** = safe to drink. It is **not pure** in the chemistry sense: it still contains **dissolved substances**.', { fill: C.soft, line: C.line, size: 18 });
  // UK steps flow
  const st = [['Choose a source', 'rain → lakes, rivers, ground water (aquifers)'], ['Filter', 'wire mesh, then **sand and gravel beds** remove solids'], ['Sterilise', '**chlorine**, **ozone** or **UV light** kill microbes']];
  const bw = (W - 2 * MX - 2 * 0.5) / 3;
  st.forEach(([a, b], i) => { const x = MX + i * (bw + 0.5); headCard(s, x, 2.55, bw, 1.9, a, C.blue, C.blueSoft); txt(s, b, x + 0.2, 3.2, bw - 0.4, 1.15, { size: 16 }); if (i < 2) arrow(s, x + bw + 0.05, 3.5, x + bw + 0.45, 3.5, C.ink, 2.5); });
  headCard(s, MX, 4.7, W - 2 * MX, 2.15, 'Where fresh water is scarce: desalination of sea water', C.orange, C.orangeSoft);
  txt(s, '**Distillation** or **reverse osmosis** (pressure forces water through a membrane). Both need **large amounts of energy**, so they are **expensive**.', MX + 0.2, 5.35, W - 2 * MX - 0.4, 1.4, { size: 17 });
  notes(s, 'Spec 4.10.1.2: "Water of appropriate quality is essential for life. For humans, drinking water should have sufficiently low levels of dissolved salts and microbes. Water that is safe to drink is called potable water. Potable water is not pure water in the chemical sense because it contains dissolved substances. The methods used to produce potable water depend on available supplies of water and local conditions. In the United Kingdom (UK), rain provides water with low levels of dissolved substances (fresh water) that collects in the ground and in lakes and rivers, and most potable water is produced by: choosing an appropriate source of fresh water; passing the water through filter beds; sterilising. Sterilising agents used for potable water include chlorine, ozone or ultraviolet light. If supplies of fresh water are limited, desalination of salty water or sea water may be required."');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is potable water not "pure" water?',
  options: ['It contains dissolved substances', 'It contains microbes', 'It has been sterilised', 'It comes from rain'],
  correct: 0,
  notes: 'Answer A. B: potable water has very low levels of microbes. C and D do not make it impure.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('RP8: analysing and purifying water', { tag: 'Required practical 8' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3;
  headCard(s, MX, 1.4, cw, 3.5, '1. pH', C.maroon, C.soft);
  txt(s, 'Universal indicator or a **pH probe**. Drinking water should be about **pH 7**.', MX + 0.2, 2.1, cw - 0.4, 2.6, { size: 16 });
  headCard(s, MX + cw + gap, 1.4, cw, 3.5, '2. Dissolved solids', C.maroon, C.soft);
  txt(s, 'Weigh an **evaporating basin**. Add a known volume of water; **evaporate** it; weigh again. The increase is the mass of **dissolved solids**.', MX + cw + gap + 0.2, 2.1, cw - 0.4, 2.6, { size: 16 });
  headCard(s, MX + 2 * (cw + gap), 1.4, cw, 3.5, '3. Purify by distillation', C.green, C.greenSoft);
  txt(s, 'Distil the sample. Check the distillate: **boils at 100 °C**; anhydrous copper sulfate turns **blue**; no residue left.', MX + 2 * (cw + gap) + 0.2, 2.1, cw - 0.4, 2.6, { size: 16 });
  rect(s, MX, 5.1, W - 2 * MX, 1.75, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example: 50 cm³ of water leaves solid. Basin 50.70 g → 50.82 g.', MX + 0.3, 5.2, W - 2 * MX - 0.6, 0.45, { size: 17, bold: true, color: C.orange });
  txt(s, 'Mass of solids = 0.12 g;   concentration = 0.12 g ÷ 0.050 dm³ = **2.4 g/dm³**', MX + 0.3, 5.75, W - 2 * MX - 0.6, 0.5, { size: 18 });
  notes(s, 'RP8: "analysis and purification of water samples from different sources, including pH, dissolved solids and distillation." Use samples such as tap water, sea water (or salt solution) and pond water. Links to concentration in g/dm³ (4.3). Checked in the build script.');
}

D.myTurnYourTurn({
  title: 'Dissolved solids', tag: 'Maths skill', stepSize: 17, labelW: 2.3, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: '25 cm³ evaporated. Basin 32.40 g → 32.48 g.',
    steps: [
      { label: 'Mass of solids', text: '32.48 − 32.40 = **0.08 g**' },
      { label: 'Concentration', text: '0.08 ÷ 0.025 = **3.2 g/dm³**' },
    ],
  },
  yours: {
    q: '20 cm³ evaporated. Basin 41.10 g → 41.16 g.',
    steps: [
      { label: 'Mass of solids', text: '**0.06 g**' },
      { label: 'Concentration', text: '0.06 ÷ 0.020 = **3.0 g/dm³**' },
    ],
  },
  notes: 'Remember cm³ → dm³: divide by 1000. Checked in the build script.',
});

{
  const s = frame('Waste water treatment', { tag: '4.10.1.3' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'Sewage and agricultural waste water must have **organic matter** and **harmful microbes** removed. Industrial waste water may also need **harmful chemicals** removed.', { fill: C.soft, line: C.line, size: 16 });
  const st = [['Screening', 'remove large solids and **grit**'], ['Sedimentation', 'heavy **sludge** settles; **effluent** (liquid) on top'], ['Effluent', '**aerobic** biological treatment (bacteria break down organic matter)'], ['Sludge', '**anaerobic digestion**: makes **methane** (fuel) and fertiliser']];
  const bw = (W - 2 * MX - 3 * 0.35) / 4;
  st.forEach(([a, b], i) => { const x = MX + i * (bw + 0.35); headCard(s, x, 2.5, bw, 2.6, a, i < 2 ? C.blue : C.green, i < 2 ? C.blueSoft : C.greenSoft); txt(s, b, x + 0.15, 3.2, bw - 0.3, 1.8, { size: 15 }); if (i < 3) arrow(s, x + bw + 0.03, 3.8, x + bw + 0.32, 3.8, C.ink, 2); });
  headCard(s, MX, 5.35, W - 2 * MX, 1.5, 'Comparing sources of potable water', C.orange, C.orangeSoft);
  txt(s, 'Ground water: **easy** to treat. Waste water: **more** steps, but saves supplies. Sea water: needs **desalination**: lots of **energy**.', MX + 0.2, 6.0, W - 2 * MX - 0.4, 0.8, { size: 16 });
  notes(s, 'Spec 4.10.1.3: "Urban lifestyles and industrial processes produce large amounts of waste water that require treatment before being released into the environment. Sewage and agricultural waste water require removal of organic matter and harmful microbes. Industrial waste water may require removal of organic matter and harmful chemicals. Sewage treatment includes: screening and grit removal; sedimentation to produce sewage sludge and effluent; anaerobic digestion of sewage sludge; aerobic biological treatment of effluent. Students should be able to comment on the relative ease of obtaining potable water from waste, ground and salt water."');
}

D.hinge({
  title: 'Quick check',
  q: 'Which step in sewage treatment produces methane?',
  options: ['Anaerobic digestion of sludge', 'Screening', 'Sedimentation', 'Chlorination'],
  correct: 0,
  notes: 'Answer A. B removes large objects. C separates sludge and effluent. D is for drinking water.',
});

// ---------------- Part 3 (HT) ----------------
{
  const s = frame('Part 3: new ways to extract metals', HT);
  note(s, MX, 1.4, W - 2 * MX, 0.9, 'High-grade copper ores are running out. New methods extract copper from **low-grade ores** and waste, which avoids **digging, moving and disposing** of large amounts of rock.', { fill: C.soft, line: C.line, size: 16 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 2.5, cw, 2.6, 'Phytomining', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 3.2, cw - 0.4, ['**Plants** absorb metal compounds from the soil.', 'Plants are **harvested** and **burned**; the **ash** contains metal compounds.'], 16, 0.12);
  headCard(s, MX + cw + gap, 2.5, cw, 2.6, 'Bioleaching', C.blue, C.blueSoft);
  bullets(s, MX + cw + gap + 0.2, 3.2, cw - 0.4, ['**Bacteria** produce **leachate** solutions that contain metal compounds.'], 16, 0.12);
  rect(s, MX, 5.35, W - 2 * MX, 1.5, C.orangeSoft, 'F3D9B5');
  txt(s, 'Getting the copper out of the solution:', MX + 0.3, 5.42, W - 2 * MX - 0.6, 0.4, { size: 16, bold: true, color: C.orange });
  txt(s, '**Displacement** with scrap iron: Fe + CuSO₄ → FeSO₄ + Cu.  Or **electrolysis**: Cu²⁺ + 2e⁻ → Cu at the cathode.', MX + 0.3, 5.85, W - 2 * MX - 0.6, 0.9, { size: 16 });
  notes(s, 'Spec 4.10.1.4 (HT): "The Earth\'s resources of metal ores are limited. Copper ores are becoming scarce and new ways of extracting copper from low-grade ores include phytomining, and bioleaching. These methods avoid traditional mining methods of digging, moving and disposing of large amounts of rock. Phytomining uses plants to absorb metal compounds. The plants are harvested and then burned to produce ash that contains metal compounds. Bioleaching uses bacteria to produce leachate solutions that contain metal compounds. The metal compounds can be processed to obtain the metal. For example, copper can be obtained from solutions of copper compounds by displacement using scrap iron or by electrolysis. Students should be able to evaluate alternative biological methods of metal extraction, given appropriate information." Equations checked.');
}

{
  const s = frame('Evaluating phytomining and bioleaching', HT);
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.3, tw * 0.35, tw * 0.35], ['', 'Advantages', 'Disadvantages'], [
    ['Phytomining', 'uses low-grade ore; little damage to land; plants absorb CO₂', '**slow** (plants take time to grow); needs land'],
    ['Bioleaching', 'no high temperatures; uses low-grade ore and waste', '**slow**; leachate can be **toxic** and pollute water'],
    ['Traditional mining + smelting', '**fast**; large amounts', 'large scars, waste rock; **lots of energy**; SO₂ from sulfide ores'],
  ], { rh: 1.05, size: 16 });
  note(s, MX, 5.2, tw, 1.65, 'A good evaluation gives **both sides** and a **justified conclusion**, e.g. "Bioleaching is better for low-grade ores because it uses less energy, even though it is slower."', { size: 17 });
  notes(s, 'Use this for a 6-mark evaluate question. Students should use the information given in the question.');
}

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'What is the main disadvantage of phytomining?',
  options: ['It is slow', 'It needs high temperatures', 'It produces lots of waste rock', 'It only works for high-grade ore'],
  correct: 0,
  notes: 'Answer A: plants take a long time to grow. B, C and D describe traditional extraction (or are wrong).',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: life cycle assessment (LCA)', { tag: '4.10.2.1' });
  const st = ['Extracting and processing raw materials', 'Manufacturing and packaging', 'Use and operation', 'Disposal at end of life'];
  const bw = (W - 2 * MX - 3 * 0.35) / 4;
  st.forEach((t, i) => { const x = MX + i * (bw + 0.35); rect(s, x, 1.45, bw, 1.15, C.orangeSoft, 'F3D9B5', { round: true }); txt(s, t, x + 0.1, 1.45, bw - 0.2, 1.15, { size: 15, bold: true, align: 'center', valign: 'middle' }); if (i < 3) arrow(s, x + bw + 0.03, 2.02, x + bw + 0.32, 2.02, C.ink, 2); });
  txt(s, 'At each stage consider: use of **water**, **energy** and **resources**; **waste** and **pollution** produced.', MX, 2.85, W - 2 * MX, 0.45, { size: 17 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 3.5, cw, 3.35, 'Easy to measure', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 4.2, cw - 0.4, ['Use of **energy**, **water** and **resources**.', 'Amount of **waste** produced.'], 16, 0.12);
  headCard(s, MX + cw + gap, 3.5, cw, 3.35, 'Hard to measure', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 4.2, cw - 0.4, ['Values for **pollutant** effects need **judgement**.', 'So LCA is **not purely objective**.', '**Selective** or **abbreviated** LCAs can be **biased** (e.g. used in advertising).'], 15, 0.1);
  notes(s, 'Spec 4.10.2.1: "Life cycle assessments (LCAs) are carried out to assess the environmental impact of products in each of these stages: extracting and processing raw materials; manufacturing and packaging; use and operation during its lifetime; disposal at the end of its useful life, including transport and distribution at each stage. Use of water, resources, energy sources and production of some wastes can be fairly easily quantified. Allocating numerical values to pollutant effects is less straightforward and requires value judgements, so LCA is not a purely objective process. Selective or abbreviated LCAs can be devised to evaluate a product but these can be misused to reach pre-determined conclusions, eg in support of claims for advertising purposes. Students should be able to carry out simple comparative LCAs for shopping bags made from plastic and paper."');
}

{
  const s = frame('Comparing shopping bags', { tag: '4.10.2.1' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.26, tw * 0.37, tw * 0.37], ['Stage', 'Paper bag', 'Plastic (polythene) bag'], [
    ['Raw materials', 'trees: **renewable**', 'crude oil: **finite**'],
    ['Manufacture', 'more energy and water; many steps', 'less energy; fewer steps'],
    ['Use', 'usually used **once**; tears when wet', 'can be **reused** many times'],
    ['Disposal', '**biodegradable**; easily recycled', '**not** biodegradable; litter harms animals; can be recycled'],
    ['Energy to make (MJ)*', '3.6', '1.5'],
  ], { rh: 0.64, size: 16 });
  note(s, MX, 5.55, tw, 1.3, 'Neither is "best" in every way. The paper bag uses about **2.4 times** as much energy to make here, but comes from a **renewable** resource and **biodegrades**. The answer depends on **how many times** each bag is reused. *illustrative values', { size: 16 });
  notes(s, 'Values are illustrative to support a comparative LCA; real figures vary between studies. The key skill is weighing several factors and reaching a reasoned conclusion. 3.6 ÷ 1.5 = 2.4.');
}
near('bag energy ratio', 3.6 / 1.5, 2.4);

{
  const s = frame('Reducing the use of resources', { tag: '4.10.2.2' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3;
  [['Reduce', 'use less: e.g. less packaging'], ['Reuse', 'e.g. **glass bottles** washed and refilled'], ['Recycle', 'e.g. metals melted and re-formed; glass crushed and melted']].forEach(([a, b], i) => { const x = MX + i * (cw + gap); headCard(s, x, 1.4, cw, 2.0, a, C.green, C.greenSoft); txt(s, b, x + 0.2, 2.1, cw - 0.4, 1.2, { size: 17 }); });
  headCard(s, MX, 3.65, W - 2 * MX, 3.2, 'Why recycle?', C.maroon, C.soft);
  bullets(s, MX + 0.2, 4.35, W - 2 * MX - 0.4, ['Uses **less energy** than extracting new metal: recycling aluminium saves about **95%** of the energy.', 'Conserves **finite** resources (ores, crude oil, sand for glass).', 'Less **mining**, less **waste** to landfill.', 'But: collecting and **sorting** costs energy and money; some metals are mixed and need separating.'], 16, 0.1);
  notes(s, 'Spec 4.10.2.2: "The reduction in use, reuse and recycling of materials by end users reduces the use of limited resources, use of energy sources, waste and environmental impacts. Metals, glass, building materials, clay ceramics and most plastics are produced from limited raw materials. Much of the energy for the processes comes from limited resources. Obtaining raw materials from the Earth by quarrying and mining causes environmental impacts. Some products, such as glass bottles, can be reused. Glass bottles can be crushed and melted to make different glass products. Other products cannot be reused and so are recycled for a different use. Metals can be recycled by melting and recasting or reforming into different products. The amount of separation required for recycling depends on the material and the properties required of the final product." 95% for aluminium is a commonly quoted figure.');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is potable water?', 'Water that is safe to drink'], ['Name three ways to sterilise water.', 'Chlorine, ozone, UV light'], ['What does LCA stand for?', 'Life cycle assessment'], ['What is phytomining? (HT)', 'Plants absorb metal compounds; burned to ash'],
    ['100 cm³ leaves 0.25 g of solid. Concentration?', '2.5 g/dm³'], ['Why is desalination expensive?', 'Needs lots of energy'],
    ['Why is LCA not completely objective?', 'Pollutant effects need value judgements'], ['Write the equation for scrap iron + copper sulfate. (HT)', 'Fe + CuSO₄ → FeSO₄ + Cu'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) water that is safe to drink (low levels of salts and microbes)  2) chlorine, ozone, ultraviolet light  3) life cycle assessment  4) plants absorb metal compounds from soil; harvested and burned; ash contains metal compounds  5) 0.25 ÷ 0.100 = 2.5 g/dm³  6) it uses large amounts of energy (distillation or reverse osmosis)  7) giving values to pollutant effects needs value judgements  8) Fe + CuSO₄ → FeSO₄ + Cu.');
  }
}
near('practice conc', 0.25 / 0.1, 2.5);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Describe how potable water is produced from fresh water in the UK.', m: 3, lines: 1 },
    { l: 'b', q: 'A student evaporates 50 cm³ of sea water and gets 1.75 g of solid. Calculate the concentration in g/dm³.', m: 2, lines: 0 },
    { l: 'c', q: 'Describe how copper can be obtained from low-grade ores by bioleaching. (HT)', m: 2, lines: 1 },
    { l: 'd', q: 'Compare paper and plastic shopping bags using a life cycle assessment.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'choose a suitable source of fresh water; filter (sand/gravel beds); sterilise with chlorine / ozone / UV', '3', ''],
    ['(b)', '50 cm³ = 0.050 dm³; 1.75 ÷ 0.050 = 35 g/dm³', '2', ''],
    ['(c)', 'bacteria produce leachate containing copper compounds; copper obtained by displacement with scrap iron or electrolysis', '2', ''],
    ['(d)', 'paper: renewable raw material, biodegradable, but more energy to make and used once; plastic: from crude oil, not biodegradable, but less energy and reusable; conclusion', '3', 'max 2 without a conclusion'],
  ],
  notes: 'Mark scheme on the next slide. 1.75 ÷ 0.05 = 35 (checked).',
});
near('exam conc', 1.75 / 0.050, 35);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Define sustainable development.', 'Name two methods of desalination.', 'What happens to sewage sludge?', 'Give two stages of an LCA.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) meeting present needs without compromising future generations  2) distillation, reverse osmosis  3) anaerobic digestion (makes methane and fertiliser)  4) any two of: raw materials, manufacture, use, disposal. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw a flow chart for making potable water in the UK.',
    'Write an RP8 method to compare tap water and sea water.',
    'Describe the four stages of sewage treatment.',
    'HT: compare phytomining with traditional copper mining.',
    'Carry out an LCA comparing glass and plastic drinks bottles.',
    'Explain why recycling aluminium is better than extracting new aluminium.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) source → filter beds → sterilise  2) pH, mass of dissolved solids by evaporation, distillation and test the distillate  3) screening and grit removal; sedimentation; aerobic treatment of effluent; anaerobic digestion of sludge  4) see the evaluation table  5) glass: sand (abundant), heavy (more transport energy), reusable and recyclable; plastic: crude oil, light, may be recycled but often not  6) about 95% less energy, conserves ore, less mining and landfill.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.10_A_WaterMetalsLCA.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
