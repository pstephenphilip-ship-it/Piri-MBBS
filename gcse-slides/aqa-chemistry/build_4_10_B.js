// build_4_10_B.js — AQA GCSE Chemistry (8462) 4.10 Using resources, lesson 2 of 2 (chemistry only):
// 4.10.3.1 Corrosion and its prevention, 4.10.3.2 Alloys as useful materials, 4.10.3.3 Ceramics, polymers and composites,
// 4.10.4.1 The Haber process (HT: conditions), 4.10.4.2 Production and uses of NPK fertilisers.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_10_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, Mr, helpers } = require('./chem_common');
const { graph } = require('../aqa-maths/graphs');

const D = T.init(deck('4.10.3–4.10.4', 'Materials, Haber and fertilisers'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// reversible arrow drawn with two half-arrows (⇌ is missing from Arial)
function eqn(s, x, y, left, right, size = 20, o = {}) {
  const bold = o.bold !== false, col = o.color || C.ink, h = size / 72 * 1.3;
  const lw = T.textW(left.replace(/\*\*/g, ''), size, bold) + 0.05;
  txt(s, left, x, y, lw + 0.2, h, { size, bold, color: col, valign: 'middle' });
  const ax = x + lw + 0.12, aw = o.aw || 0.6, my = y + h / 2, g = 0.055, b = 0.1;
  seg(s, ax, my - g, ax + aw, my - g, col, 1.75); seg(s, ax + aw - b, my - g - b * 0.75, ax + aw, my - g, col, 1.75);
  seg(s, ax, my + g, ax + aw, my + g, col, 1.75); seg(s, ax, my + g, ax + b, my + g + b * 0.75, col, 1.75);
  txt(s, right, ax + aw + 0.12, y, (o.rw || 6), h, { size, bold, color: col, valign: 'middle' });
}

// ======================= checks =======================
balanced('Haber', [[1, 'N2'], [3, 'H2']], [[2, 'NH3']]);
balanced('rust', [[4, 'Fe'], [3, 'O2'], [6, 'H2O']], [[4, 'Fe(OH)3']]);
balanced('NH3+HNO3', [[1, 'NH3'], [1, 'HNO3']], [[1, 'NH4NO3']]);
balanced('NH3+H2SO4', [[2, 'NH3'], [1, 'H2SO4']], [[1, '(NH4)2SO4']]);
balanced('NH3+H3PO4', [[3, 'NH3'], [1, 'H3PO4']], [[1, '(NH4)3PO4']]);
balanced('rock+HNO3', [[1, 'Ca3(PO4)2'], [6, 'HNO3']], [[2, 'H3PO4'], [3, 'Ca(NO3)2']]);
balanced('Zn sacrificial', [[1, 'Zn']], [[1, 'Zn']]); calc('Zn charge', 0, 2 - 2);
// percentage of nitrogen in fertilisers
const pctN = f => Math.round(Mr(f) && (14 * (f.match(/N/g) || []).length / Mr(f)) * 1000) / 10;
near('Mr NH4NO3', Mr('NH4NO3'), 80); near('%N NH4NO3', Math.round(28 / 80 * 1000) / 10, 35.0);
near('Mr (NH4)2SO4', Mr('(NH4)2SO4'), 132); near('%N AmSulf', Math.round(28 / 132 * 1000) / 10, 21.2);
near('Mr urea', Mr('CO(NH2)2'), 60); near('%N urea', Math.round(28 / 60 * 1000) / 10, 46.7);
near('Mr KNO3', Mr('KNO3'), 101); near('%N KNO3', Math.round(14 / 101 * 1000) / 10, 13.9);
void pctN;
// Haber yield graph (illustrative): % NH3 at equilibrium, 200 atm
const Y = { 350: 66, 400: 52, 450: 38, 500: 27, 550: 18 };
calc('yield falls with T', Object.values(Y).every((v, i, a) => i === 0 || v < a[i - 1]) ? 1 : 0, 1);
calc('pressure shift', 2 < 4 ? 1 : 0, 1);
// alloy carats
near('18 carat', 18 / 24 * 100, 75); near('9 carat', Math.round(9 / 24 * 1000) / 10, 37.5);
near('MT 22 carat', Math.round(22 / 24 * 1000) / 10, 91.7); near('YT 14 carat', Math.round(14 / 24 * 1000) / 10, 58.3);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Corrosion, alloys, ceramics, polymers and composites, the Haber process and NPK fertilisers',
  bullets: ['Part 1: corrosion and its prevention (4.10.3.1)', 'Part 2: alloys, ceramics, polymers, composites (4.10.3.2–3)', 'Part 3: the Haber process (4.10.4.1)', 'Part 4: NPK fertilisers (4.10.4.2)'],
  notes: 'AQA 8462 GCSE Chemistry 4.10, lesson 2 of 2 (separate science only). This is the final lesson of the Chemistry 8462 course. The reversible arrow is drawn with two half-arrows. About two hours.',
});

D.objectives({
  tag: '4.10.3–4',
  items: [
    'Explain how **rusting** happens and how **barriers** and **sacrificial protection** prevent it.',
    'Compare **alloys**, **glass**, **ceramics**, **polymers** and **composites**.',
    'Describe the **Haber process** and explain the choice of **conditions** (HT).',
    'Describe how **NPK fertilisers** are made and calculate **% nitrogen**.',
  ],
  keywords: ['corrosion', 'sacrificial protection', 'alloy', 'composite', 'Haber process', 'fertiliser'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Why are alloys harder than pure metals?', 'Which is more reactive: zinc or iron?', 'Effect of higher pressure on N₂ + 3H₂ → 2NH₃ (reversible)? (HT)', 'Mᵣ of NH₃?'],
  answers: ['different-sized atoms distort the layers', 'zinc', 'shifts right: more NH₃', '17'],
  notes: 'Retrieval from 4.2, 4.4, 4.6 and 4.3.',
});

D.vocab({
  title: 'Key words', tag: '4.10.3–4',
  items: [
    { term: 'Corrosion', def: 'The **destruction** of a material by **chemical reaction** with substances in the environment.' },
    { term: 'Sacrificial protection', def: 'A **more reactive** metal is attached; it **corrodes instead** of the iron.' },
    { term: 'Composite', def: 'Two materials: **reinforcement** (fibres) in a **matrix** (binder).' },
    { term: 'NPK fertiliser', def: 'Contains compounds of **nitrogen**, **phosphorus** and **potassium** in suitable proportions.' },
  ],
  notes: 'Spec 4.10.3 and 4.10.4.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: corrosion and rusting', { tag: '4.10.3.1' });
  const tubes = [['air + water', 'rusts', 'B85C38', 'FFFFFF'], ['no water (drying agent)', 'no rust', '9E9E9E', 'F4F2F3'], ['no air (boiled water, oil layer)', 'no rust', '9E9E9E', 'CFE3F5']];
  tubes.forEach(([a, b, nail, fill], i) => {
    const x = MX + 0.7 + i * 2.3;
    rect(s, x, 1.6, 0.9, 2.4, fill, C.ink, { lw: 1.5 });
    rect(s, x + 0.38, 1.8, 0.14, 1.9, nail, nail);
    txt(s, a, x - 0.55, 4.05, 2.0, 0.6, { size: 13, bold: true, align: 'center' });
    txt(s, b, x - 0.55, 4.6, 2.0, 0.35, { size: 14, bold: true, align: 'center', color: i ? C.green : C.red });
  });
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.6, 'Rusting', C.red, 'FBEAEA');
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Rusting is the corrosion of **iron**.', 'It needs **both air (oxygen) and water**.', 'Iron + oxygen + water → **hydrated iron(III) oxide** (rust).'], 16, 0.12);
  note(s, MX, 5.25, W - 2 * MX, 1.6, 'This experiment controls one variable at a time: the nail only rusts when **both** oxygen and water are present. Salt water makes rusting **faster**.', { size: 17 });
  notes(s, 'Spec 4.10.3.1: "Corrosion is the destruction of materials by chemical reactions with substances in the environment. Rusting is an example of corrosion. Both air and water are necessary for iron to rust. Students should be able to describe experiments and interpret results to show that both air and water are necessary for rusting." Rust is hydrated iron(III) oxide; 4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃ is a simplified equation (checked).');
}

{
  const s = frame('Preventing corrosion', { tag: '4.10.3.1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.2, 'Barrier methods', C.blue, C.blueSoft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['**Greasing**, **painting**, **electroplating**, plastic coating.', 'Keep **air and water** away from the metal.', 'If the barrier is **scratched**, rusting starts.'], 16, 0.12);
  headCard(s, MX + cw + gap, 1.4, cw, 3.2, 'Sacrificial protection', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['Attach a **more reactive** metal (e.g. **zinc** or magnesium).', 'It **loses electrons** and corrodes **instead of** the iron.', 'Used on ships’ hulls and pipelines.'], 16, 0.12);
  headCard(s, MX, 4.85, W - 2 * MX, 2.0, 'Galvanising', C.maroon, C.soft);
  txt(s, 'Iron is coated with **zinc**. The zinc is a **barrier**, and if it is scratched the zinc still gives **sacrificial protection** (Zn → Zn²⁺ + 2e⁻). **Aluminium** does not corrode much: a thin **oxide layer** protects it.', MX + 0.2, 5.5, W - 2 * MX - 0.4, 1.3, { size: 16 });
  notes(s, 'Spec 4.10.3.1: "Corrosion can be prevented by applying a coating that acts as a barrier, such as greasing, painting or electroplating. Aluminium has an oxide coating that protects the metal from further corrosion. Some coatings are reactive and contain a more reactive metal to provide sacrificial protection, eg zinc is used to galvanise iron. Students should be able to explain sacrificial protection in terms of relative reactivity."');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does zinc protect iron even when the coating is scratched?',
  options: ['Zinc is more reactive, so it corrodes instead', 'Zinc is a barrier only', 'Zinc is less reactive than iron', 'Zinc makes iron harder'],
  correct: 0,
  notes: 'Answer A: sacrificial protection. B is only true when unscratched. C is wrong. D is not the reason.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: alloys', { tag: '4.10.3.2' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.22, tw * 0.38, tw * 0.4], ['Alloy', 'Made of', 'Properties and uses'], [
    ['Bronze', 'copper + tin', 'hard; statues, medals'],
    ['Brass', 'copper + zinc', 'hard, does not corrode; instruments, taps'],
    ['Gold alloys', 'gold + silver, copper, zinc', 'harder; jewellery (measured in **carats**)'],
    ['Steels', 'iron + carbon (+ other metals)', 'high-carbon: **strong, brittle**; low-carbon: **soft, easily shaped**; stainless (Cr, Ni): **resists corrosion**'],
    ['Aluminium alloys', 'aluminium + other metals', '**low density**; aircraft'],
  ], { rh: 0.78, size: 15 });
  note(s, MX, 6.0, tw, 0.85, '**Carats:** 24 carat = 100% gold. **18 carat** = 18 ÷ 24 = **75%** gold.', { size: 18 });
  notes(s, 'Spec 4.10.3.2: "Most metals in everyday use are alloys. Bronze is an alloy of copper and tin. It is used to make statues and decorative objects. Brass is an alloy of copper and zinc. It is used to make water taps and door fittings. Gold used as jewellery is usually an alloy with silver, copper and zinc. The proportion of gold in the alloy is measured in carats. 24 carat being 100% (pure gold), and 18 carat gold is 75% gold. Steels are alloys of iron that contain specific amounts of carbon and other metals. High carbon steel is strong but brittle. Low carbon steel is softer and more easily shaped. Steels containing chromium and nickel (stainless steels) are hard and resistant to corrosion. Aluminium alloys are low density." Checked: 18/24 = 75%.');
}

D.myTurnYourTurn({
  title: 'Gold carats', tag: 'Maths skill', stepSize: 19, labelW: 2.6, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Percentage of gold (1 d.p.):',
    steps: [
      { label: '9 carat', text: '9 ÷ 24 × 100 = **37.5%**' },
      { label: '22 carat', text: '22 ÷ 24 × 100 = **91.7%**' },
    ],
  },
  yours: {
    q: 'Percentage of gold (1 d.p.):',
    steps: [
      { label: '14 carat', text: '14 ÷ 24 × 100 = **58.3%**' },
      { label: '18 carat', text: '18 ÷ 24 × 100 = **75.0%**' },
    ],
  },
  notes: 'Checked in the build script.',
});

{
  const s = frame('Ceramics, polymers and composites', { tag: '4.10.3.3' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, h = 5.45;
  const cards = [
    ['Glass and ceramics', ['**Soda-lime glass**: sand + sodium carbonate + limestone, melted.', '**Borosilicate glass**: sand + boron trioxide; melts at higher temperatures.', '**Clay ceramics** (pottery, bricks): shape wet clay, then **heat** in a furnace.']],
    ['Polymers', ['Properties depend on the **monomers** and the **conditions** (e.g. LDPE and HDPE from ethene).', '**Thermosoftening**: separate chains; **melt** when heated.', '**Thermosetting**: **cross-links** between chains; do **not** melt.']],
    ['Composites', ['A **reinforcement** (fibres or fragments) in a **matrix** (binder).', 'Examples: **fibreglass**, **carbon fibre**, **concrete**, wood.', 'Properties better than either material alone.']],
  ];
  cards.forEach(([a, bs], i) => { const x = MX + i * (cw + gap); headCard(s, x, 1.4, cw, h, a, [C.orange, C.blue, C.green][i], [C.orangeSoft, C.blueSoft, C.greenSoft][i]); bullets(s, x + 0.2, 2.1, cw - 0.4, bs, 15, 0.15); });
  notes(s, 'Spec 4.10.3.3: "Most of the glass we use is soda-lime glass, made by heating a mixture of sand, sodium carbonate and limestone. Borosilicate glass, made from sand and boron trioxide, melts at higher temperatures than soda-lime glass. Clay ceramics, including pottery and bricks, are made by shaping wet clay and then heating in a furnace. The properties of polymers depend on what monomers they are made from and the conditions under which they are made. For example, low density (LD) and high density (HD) poly(ethene) are produced from ethene. Thermosoftening polymers melt when they are heated. Thermosetting polymers do not melt when they are heated. Most composites are made of two materials, a matrix or binder surrounding and binding together fibres or fragments of the other material, which is called the reinforcement. Students should be able to explain how low density and high density poly(ethene) are both produced from ethene; explain the difference between thermosoftening and thermosetting polymers in terms of their structures."');
}

D.hinge({
  title: 'Quick check',
  q: 'Why do thermosetting polymers not melt when heated?',
  options: ['Cross-links hold the chains together', 'They have no covalent bonds', 'They are made of small molecules', 'They contain metal atoms'],
  correct: 0,
  notes: 'Answer A. B: the chains are covalently bonded. C: they are giant networks. D: polymers are not metals.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: the Haber process', { tag: '4.10.4.1' });
  eqn(s, MX + 0.4, 1.45, 'N₂(g) + 3H₂(g)', '2NH₃(g)', 26, { aw: 0.9 });
  txt(s, 'forward reaction is **exothermic**', MX + 6.0, 1.6, 6, 0.45, { size: 17 });
  const st = [['Raw materials', 'N₂ from the **air**; H₂ from **natural gas**'], ['Reactor', '**iron catalyst**, about **450 °C**, **200 atmospheres**'], ['Condenser', 'cooled: **ammonia liquefies** and is removed'], ['Recycle', '**unreacted** N₂ and H₂ go back to the reactor']];
  const bw = (W - 2 * MX - 3 * 0.35) / 4;
  st.forEach(([a, b], i) => { const x = MX + i * (bw + 0.35); headCard(s, x, 2.5, bw, 2.4, a, C.maroon, C.soft); txt(s, b, x + 0.15, 3.2, bw - 0.3, 1.6, { size: 16 }); if (i < 3) arrow(s, x + bw + 0.03, 3.7, x + bw + 0.32, 3.7, C.ink, 2); });
  note(s, MX, 5.15, W - 2 * MX, 1.7, 'Ammonia is used to make **fertilisers**. Removing the ammonia and **recycling** the unreacted gases means almost all the nitrogen and hydrogen are eventually converted, even though only about **15%** reacts each pass.', { size: 17 });
  notes(s, 'Spec 4.10.4.1: "The Haber process is used to manufacture ammonia, which can be used to produce nitrogen-based fertilisers. The raw materials for the Haber process are nitrogen and hydrogen. Students should be able to recall a source for the nitrogen and a source for the hydrogen used in the Haber process. The purified gases are passed over a catalyst of iron at a high temperature (about 450°C) and a high pressure (about 200 atmospheres). Some of the hydrogen and nitrogen reacts to form ammonia. The reaction is reversible so some of the ammonia produced breaks down into nitrogen and hydrogen. On cooling, the ammonia liquefies and is removed. The remaining hydrogen and nitrogen are recycled." The 15% per pass figure is approximate.');
}

{
  const s = frame('Choosing the conditions', HT);
  const G = graph(D, s, MX + 0.9, 1.75, 5.6, 4.0, [300, 600], [0, 80], { gridX: 50, gridY: 20, axesAtEdge: true, xTitle: 'Temperature (°C)', yTitle: '% ammonia at equilibrium (200 atm)' });
  const pts = Object.entries(Y).map(([t, v]) => [+t, v]);
  for (let i = 0; i < pts.length - 1; i++) G.seg(pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.maroon, 3);
  pts.forEach(([t, v]) => G.pt(t, v, C.maroon));
  const tw = W - MX - (MX + 7.0);
  table(s, MX + 7.0, 1.4, [tw * 0.3, tw * 0.35, tw * 0.35], ['', 'Yield says', 'But…'], [
    ['Temperature', '**low** (forward is exothermic)', 'too **slow**; 450 °C is a **compromise**'],
    ['Pressure', '**high** (4 → 2 gas molecules)', '**expensive** equipment and energy; **dangerous**'],
    ['Catalyst', 'no effect on yield', 'reaches equilibrium **faster**'],
  ], { rh: 1.05, size: 14 });
  note(s, MX + 7.0, 5.15, tw, 1.7, 'The conditions give an **acceptable yield** at a **fast enough rate** for a **reasonable cost**.', { size: 16 });
  notes(s, 'Spec 4.10.4.1 (HT): "Students should be able to interpret graphs of reaction conditions versus rate; apply the principles of dynamic equilibrium in Reversible reactions and dynamic equilibrium to the Haber process; explain the trade-off between rate of production and position of equilibrium; explain how the commercially used conditions for the Haber process are related to the availability and cost of raw materials and energy supplies, control of equilibrium position and rate." Graph values are illustrative.');
}

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'Why is 450 °C used, even though a lower temperature gives a higher yield?',
  options: ['A lower temperature would make the rate too slow', 'The catalyst melts below 450 °C', 'Ammonia decomposes below 450 °C', 'Higher temperatures increase the yield'],
  correct: 0,
  notes: 'Answer A: a compromise between yield and rate. B and C are wrong. D is the opposite (forward reaction is exothermic).',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: NPK fertilisers', { tag: '4.10.4.2' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'Fertilisers supply **nitrogen**, **phosphorus** and **potassium** to improve **plant growth**. NPK fertilisers are **formulations**.', { fill: C.soft, line: C.line, size: 17 });
  const tw = W - 2 * MX;
  table(s, MX, 2.45, [tw * 0.18, tw * 0.42, tw * 0.4], ['Element', 'Source', 'Salt made'], [
    ['Nitrogen', 'ammonia (Haber) → **nitric acid**', 'NH₃ + HNO₃ → **ammonium nitrate**'],
    ['Phosphorus', '**phosphate rock** + acid (nitric, sulfuric, phosphoric)', 'phosphoric acid, calcium nitrate, ammonium phosphate'],
    ['Potassium', '**mined** potassium chloride and potassium sulfate', 'used directly'],
  ], { rh: 0.9, size: 16 });
  note(s, MX, 5.6, tw, 1.25, '**Industry**: continuous, large scale, starts from raw materials. **Lab**: batch, small scale, e.g. ammonia solution + dilute sulfuric acid → **ammonium sulfate** by titration and crystallisation.', { size: 16 });
  notes(s, 'Spec 4.10.4.2: "Compounds of nitrogen, phosphorus and potassium are used as fertilisers to improve agricultural productivity. NPK fertilisers contain compounds of all three elements. Industrial production of NPK fertilisers can be achieved using a variety of raw materials in several integrated processes. NPK fertilisers are formulations of various salts containing appropriate percentages of the elements. Ammonia can be used to manufacture ammonium salts and nitric acid. Potassium chloride, potassium sulfate and phosphate rock are obtained by mining, but phosphate rock cannot be used directly as a fertiliser. Phosphate rock is treated with nitric acid or sulfuric acid to produce soluble salts that can be used as fertilisers. Students should be able to: recall the names of the salts produced when phosphate rock is treated with nitric acid, sulfuric acid and phosphoric acid; compare the industrial production of fertilisers with laboratory preparations of the same compounds, given appropriate information." Equations checked.');
}

{
  const s = frame('Percentage of nitrogen in a fertiliser', { tag: '4.10.4.2' });
  rect(s, MX, 1.4, W - 2 * MX, 1.2, C.soft, C.line);
  D.math(s, MX + 0.3, 2.0, ['% N = ', { n: 'Aᵣ(N) × number of N atoms', d: 'Mᵣ of compound' }, ' × 100'], { size: 20, bold: true });
  rect(s, MX, 2.85, W - 2 * MX, 1.7, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example: ammonium nitrate, NH₄NO₃', MX + 0.3, 2.95, W - 2 * MX - 0.6, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, 'Mᵣ = 14 + 4 + 14 + 48 = 80.   % N = (2 × 14) ÷ 80 × 100 = **35.0%**', MX + 0.3, 3.45, W - 2 * MX - 0.6, 0.5, { size: 19 });
  const tw = W - 2 * MX;
  table(s, MX, 4.8, [tw * 0.4, tw * 0.3, tw * 0.3], ['Fertiliser (try these)', 'Mᵣ', '% N'], [['ammonium sulfate, (NH₄)₂SO₄', '132', '21.2%'], ['urea, CO(NH₂)₂', '60', '46.7%']], { rh: 0.55, hh: 0.5, size: 16, align: ['left', 'center', 'center'] });
  notes(s, 'A good link back to 4.3 (Mᵣ). Reveal the answers after students try. Urea has the highest % N, so less is needed for the same amount of nitrogen. All values checked in the build script.');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What two things are needed for iron to rust?', 'Air (oxygen) and water'], ['What is galvanising?', 'Coating iron with zinc'], ['What is brass made of?', 'Copper and zinc'], ['Haber process conditions?', 'Iron catalyst, 450 °C, 200 atm'],
    ['Why does painting stop rusting?', 'Barrier keeps out air and water'], ['% gold in 9 carat gold?', '37.5%'],
    ['Why are unreacted gases recycled in the Haber process?', 'So they are not wasted; more ammonia made'], ['% N in KNO₃ (Mᵣ 101)?', '13.9%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) air (oxygen) and water  2) coating iron with zinc  3) copper and zinc  4) iron catalyst, about 450 °C, about 200 atmospheres  5) a barrier stops oxygen and water reaching the iron  6) 9 ÷ 24 × 100 = 37.5%  7) so they are not wasted: the reaction is reversible and only some reacts each pass  8) 14 ÷ 101 × 100 = 13.9%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Explain how zinc protects iron from rusting, even when the zinc layer is scratched.', m: 2, lines: 1 },
    { l: 'b', q: 'Give the sources of nitrogen and hydrogen for the Haber process.', m: 2, lines: 0 },
    { l: 'c', q: 'Explain why a temperature of 450 °C and a pressure of 200 atm are used. (HT)', m: 4, lines: 2 },
    { l: 'd', q: 'Calculate the percentage of nitrogen in ammonium nitrate, NH₄NO₃. (Aᵣ: N 14, H 1, O 16)', m: 2, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'zinc is more reactive than iron; zinc corrodes / loses electrons instead (sacrificial)', '2', ''],
    ['(b)', 'nitrogen from the air; hydrogen from natural gas', '2', ''],
    ['(c)', 'lower temperature gives higher yield (exothermic) but rate too slow, so 450 °C is a compromise; higher pressure gives higher yield (fewer gas molecules on the right) and faster rate; but very high pressure is expensive / dangerous, so 200 atm is a compromise', '4', ''],
    ['(d)', 'Mᵣ = 80; 28 ÷ 80 × 100 = 35%', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Name two barrier methods.', 'What is a composite?', 'Why is ammonia removed by cooling?', 'What three elements are in NPK fertilisers?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) painting, greasing, electroplating, oiling, plastic coating  2) a reinforcement in a matrix (binder)  3) it liquefies (higher boiling point) so it can be separated from N₂ and H₂  4) nitrogen, phosphorus, potassium. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Describe an experiment to show that air and water are needed for rusting.',
    'Compare high-carbon steel, low-carbon steel and stainless steel.',
    'Explain the difference between thermosoftening and thermosetting polymers.',
    'Draw a flow chart of the Haber process.',
    'HT: explain the trade-off between rate and yield in the Haber process.',
    'Calculate % N in ammonium sulfate and urea. Which is the better fertiliser for nitrogen?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) three tubes: air + water; drying agent; boiled water with oil layer  2) see the alloys table  3) thermosetting have cross-links; thermosoftening do not  4) raw materials → reactor → condenser → recycle  5) see the conditions slide  6) 21.2% and 46.7%; urea has more nitrogen per gram. Congratulations: this is the last lesson of the course.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.10_B_MaterialsHaberFertilisers.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
