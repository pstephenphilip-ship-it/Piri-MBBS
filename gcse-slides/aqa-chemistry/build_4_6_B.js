// build_4_6_B.js — AQA GCSE Chemistry (8462) 4.6 Rate and extent of chemical change, lesson 2 of 3:
// 4.6.1.2 Factors which affect rates (explanations), 4.6.1.3 Collision theory and activation energy,
// 4.6.1.4 Catalysts.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_6_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');
const { graph } = require('../aqa-maths/graphs');

const D = T.init(deck('4.6.1', 'Collision theory and catalysts'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
// surface area of a cube split into smaller cubes
const sa = (a, n) => n * 6 * a * a; // n cubes of side a
near('1 cube 2 cm', sa(2, 1), 24); near('8 cubes 1 cm', sa(1, 8), 48); near('factor', sa(1, 8) / sa(2, 1), 2);
near('MT 3cm', sa(3, 1), 54); near('MT 27 x 1', sa(1, 27), 162); near('MT factor', 162 / 54, 3);
near('YT 4cm', sa(4, 1), 96); near('YT 8 x 2', sa(2, 8), 192); near('YT factor', 192 / 96, 2);
// gas curves: rate ∝ concentration; final volume ∝ moles of limiting reactant
const curve = (k, vmax) => t => vmax * (1 - Math.exp(-k * t));
const A = curve(0.06, 40), B = curve(0.12, 40), Cc = curve(0.06, 20);
calc('B faster start', B(5) > A(5) ? 1 : 0, 1); near('same end', Math.round(A(200)), Math.round(B(200)));
calc('half conc half volume (acid limiting)', Math.round(Cc(200)) * 2, Math.round(A(200)));
// temperature data: time for cross to disappear
const TEMP = [[20, 80], [30, 40], [40, 20], [50, 10]];
calc('halves each 10', TEMP.every((r, i) => i === 0 || r[1] * 2 === TEMP[i - 1][1]) ? 1 : 0, 1);
near('rate 20', 1 / 80, 0.0125); near('rate 50', 1 / 10, 0.1); near('rate ratio', (1 / 10) / (1 / 80), 8);
balanced('H2O2', [[2, 'H2O2']], [[2, 'H2O'], [1, 'O2']]);
// catalyst mass unchanged
near('MnO2 mass', 0.50, 0.50);

// ======================= drawings =======================
function particles(s, x, y, w, h, nA, nB, seed = 1) {
  rect(s, x, y, w, h, C.white, C.grey, { lw: 1.5 });
  let r = seed;
  const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
  for (let i = 0; i < nA + nB; i++) circle(s, x + 0.25 + rnd() * (w - 0.5), y + 0.25 + rnd() * (h - 0.5), 0.26, i < nA ? 'E07B39' : '3C7DC4', '333333', 0.75);
}
function profile2(s, x, y, w, h) {
  arrow(s, x, y + h, x, y, C.ink, 2); arrow(s, x, y + h, x + w, y + h, C.ink, 2);
  txt(s, 'Energy', x - 0.35, y - 0.4, 1.2, 0.35, { size: 14, bold: true });
  txt(s, 'Progress of reaction', x + w - 2.6, y + h + 0.05, 2.6, 0.35, { size: 14, bold: true, align: 'right' });
  const start = 0.5, end = 0.15, Y = v => y + h - v * h;
  const f = (t, ea) => { const s0 = t < 0.2 ? start : t > 0.8 ? end : start + (end - start) * ((t - 0.2) / 0.6) ** 2 * (3 - 2 * (t - 0.2) / 0.6); return s0 + Math.exp(-((t - 0.5) ** 2) / 0.012) * (start + ea - (start + end) / 2); };
  [[0.42, C.maroon, 3, undefined], [0.18, C.green, 3, 'dash']].forEach(([ea, col, wd, dash]) => {
    let prev = null;
    for (let i = 0; i <= 80; i++) { const t = i / 80, px = x + 0.3 + t * (w - 0.6), py = Y(f(t, ea)); if (prev) seg(s, prev[0], prev[1], px, py, col, wd, { dash }); prev = [px, py]; }
  });
  txt(s, 'reactants', x + 0.3, Y(start) + 0.05, 2.0, 0.35, { size: 14, bold: true });
  txt(s, 'products', x + w - 2.3, Y(end) + 0.05, 2.0, 0.35, { size: 14, bold: true, align: 'right' });
  seg(s, x + 0.3, Y(start), x + w * 0.62, Y(start), C.grey, 1.25, { dash: 'dash' });
  const p1 = Y(f(0.5, 0.42)), p2 = Y(f(0.5, 0.18));
  arrow(s, x + w * 0.58, Y(start), x + w * 0.58, p1 + 0.04, C.maroon, 2);
  txt(s, 'without\ncatalyst', x + w * 0.6, p1 - 0.05, 1.3, 0.6, { size: 12, bold: true, color: C.maroon });
  arrow(s, x + w * 0.42, Y(start), x + w * 0.42, p2 + 0.04, C.green, 2);
  txt(s, 'with\ncatalyst', x + w * 0.42 - 1.75, (Y(start) + p2) / 2 - 0.45, 1.3, 0.6, { size: 12, bold: true, color: C.green, align: 'right' });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Collision theory, how concentration, pressure, surface area and temperature change the rate, activation energy and catalysts',
  bullets: ['Part 1: collision theory and activation energy (4.6.1.3)', 'Part 2: concentration, pressure and surface area (4.6.1.2–3)', 'Part 3: temperature (4.6.1.3)', 'Part 4: catalysts (4.6.1.4)'],
  notes: 'AQA 8462 GCSE Chemistry 4.6, lesson 2 of 3. Lesson 1 covered measuring rates and RP5. Lesson 3: reversible reactions and equilibrium. About two hours.',
});

D.objectives({
  tag: '4.6.1',
  items: [
    'Use **collision theory** to explain when particles react.',
    'Explain the effect of **concentration**, **pressure** and **surface area**.',
    'Explain why **temperature** has a large effect: **frequency** and **energy**.',
    'Explain how **catalysts** work, using a **reaction profile**.',
  ],
  keywords: ['collision theory', 'frequency', 'activation energy', 'surface area', 'catalyst', 'enzyme'],
  notes: 'Share the objectives. Key phrase: "more frequent successful collisions".',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Name five factors that affect rate.', 'What is activation energy?', 'Surface area of a 2 cm cube?', 'What does a steep rate graph show?'],
  answers: ['concentration, pressure, surface area, temperature, catalyst', 'minimum energy for particles to react', '24 cm²', 'a fast rate'],
  notes: 'Retrieval from lesson 1, 4.5 (activation energy) and maths.',
});

D.vocab({
  title: 'Key words', tag: '4.6.1',
  items: [
    { term: 'Collision theory', def: 'Reactions happen only when particles **collide** with at least the **activation energy**.' },
    { term: 'Frequency', def: 'How **often** collisions happen: the number of collisions **per second**.' },
    { term: 'Successful collision', def: 'A collision with **enough energy** to react.' },
    { term: 'Catalyst', def: 'Speeds up a reaction but is **not used up**. Provides a pathway with **lower activation energy**.' },
  ],
  notes: 'Spec 4.6.1.3 and 4.6.1.4.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: collision theory', { tag: '4.6.1.3' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3;
  const cards = [['1. Collide', 'Particles must **collide** with each other.'], ['2. Enough energy', 'The collision must have at least the **activation energy**.'], ['3. React', 'Only these **successful** collisions make products.']];
  cards.forEach(([a, b], i) => { const x = MX + i * (cw + gap); headCard(s, x, 1.4, cw, 2.2, a, C.maroon, C.soft); txt(s, b, x + 0.2, 2.1, cw - 0.4, 1.4, { size: 18 }); if (i < 2) arrow(s, x + cw + 0.02, 2.5, x + cw + gap - 0.02, 2.5, C.ink, 2); });
  rect(s, MX, 3.9, W - 2 * MX, 1.4, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'Rate depends on the **frequency of successful collisions**: how many successful collisions happen **each second**.', MX + 0.3, 3.9, W - 2 * MX - 0.6, 1.4, { size: 20, valign: 'middle', align: 'center' });
  note(s, MX, 5.55, W - 2 * MX, 1.3, 'Exam tip: say "**more frequent** collisions" or "**more collisions per second**", not just "more collisions".', { size: 17 });
  notes(s, 'Spec 4.6.1.3: "Collision theory explains how various factors affect rates of reactions. According to this theory, chemical reactions can occur only when reacting particles collide with each other and with sufficient energy. The minimum amount of energy that particles must have to react is called the activation energy." "More collisions" without time loses marks in AQA mark schemes.');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: concentration and pressure', { tag: '4.6.1.3' });
  txt(s, 'Low concentration', MX + 0.2, 1.4, 3.0, 0.4, { size: 17, bold: true, color: C.maroon, align: 'center' });
  particles(s, MX + 0.2, 1.9, 3.0, 2.6, 4, 4, 7);
  txt(s, 'High concentration', MX + 3.6, 1.4, 3.0, 0.4, { size: 17, bold: true, color: C.maroon, align: 'center' });
  particles(s, MX + 3.6, 1.9, 3.0, 2.6, 9, 9, 3);
  txt(s, 'Same volume, more particles', MX + 0.2, 4.6, 6.4, 0.4, { size: 15, italic: true, color: C.grey, align: 'center' });
  const bx = MX + 7.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.6, 'Explanation', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Higher concentration** (solutions) or **higher pressure** (gases): **more particles in the same volume**.', 'So particles **collide more frequently**.', 'So **more successful collisions per second**: faster rate.'], 16, 0.13);
  note(s, MX, 5.3, W - 2 * MX, 1.55, 'Concentration does **not** change the **energy** of the particles, only **how often** they collide.', { size: 18 });
  notes(s, 'Spec 4.6.1.3: "Students should be able to predict and explain using collision theory the effects of changing conditions of concentration, pressure and temperature on the rate of a reaction; predict and explain the effects of changes in the size of pieces of a reacting solid in terms of surface area to volume ratio; use simple ideas about proportionality when using collision theory to explain the effect of a factor on the rate of a reaction." Orange and blue = two different reactants.');
}

{
  const s = frame('Interpreting rate graphs', { tag: '4.6.1.2' });
  const G = graph(D, s, MX + 0.9, 1.75, 6.4, 4.4, [0, 60], [0, 50], { gridX: 10, gridY: 10, axesAtEdge: true, xTitle: 'Time (s)', yTitle: 'Volume of gas (cm³)' });
  G.curve(A, 0, 60, C.maroon, 3); G.curve(B, 0, 60, C.green, 3); G.curve(Cc, 0, 60, C.blue, 3);
  txt(s, 'B', G.px(14), G.py(B(14)) - 0.4, 0.4, 0.35, { size: 16, bold: true, color: C.green });
  txt(s, 'A', G.px(28), G.py(A(28)) + 0.05, 0.4, 0.35, { size: 16, bold: true, color: C.maroon });
  txt(s, 'C', G.px(40), G.py(Cc(40)) + 0.05, 0.4, 0.35, { size: 16, bold: true, color: C.blue });
  const bx = MX + 7.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Excess Mg, different acid', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**A**: original acid.', '**B**: **double the concentration**, same amount of acid: **steeper**, but the **same final volume**.', '**C**: **half the amount of acid**: same start, **half the final volume**.', 'Final volume depends on the **limiting reactant**.'], 15, 0.12);
  notes(s, 'Spec 4.6.1.2: "Students should be able to interpret the results of experiments in which these factors are varied" and draw graphs. The curves are illustrative and checked: B starts faster than A and ends at the same volume; C ends at half the volume. Links to limiting reactants (4.3.2.4).');
}

{
  const s = frame('Surface area', { tag: '4.6.1.3' });
  // one big cube vs 8 small cubes
  const cube = (x, y, a, col) => { const d = a * 0.35; rect(s, x, y + d, a, a, col, C.blue, { lw: 1.5 }); seg(s, x, y + d, x + d, y, C.blue, 1.5); seg(s, x + a, y + d, x + a + d, y, C.blue, 1.5); seg(s, x + d, y, x + a + d, y, C.blue, 1.5); seg(s, x + a + d, y, x + a + d, y + a, C.blue, 1.5); seg(s, x + a, y + a + d, x + a + d, y + a, C.blue, 1.5); };
  cube(MX + 0.4, 1.7, 1.6, 'CFE0F5'); txt(s, '1 cube, side 2 cm\nSA = 24 cm²', MX + 0.1, 3.85, 2.6, 0.7, { size: 15, bold: true, align: 'center' });
  for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) cube(MX + 3.3 + i * 0.95, 1.8 + j * 1.0, 0.65, 'CFE0F5');
  txt(s, '8 cubes, side 1 cm\nSA = 48 cm²', MX + 3.3, 3.85, 3.7, 0.7, { size: 15, bold: true, align: 'center' });
  const bx = MX + 7.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.2, 'Explanation', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Smaller pieces (powder) have a **larger surface area to volume ratio**.', 'More particles are **exposed** on the surface.', 'So **more frequent collisions**: faster rate.'], 16, 0.12);
  rect(s, MX, 4.85, W - 2 * MX, 2.0, C.orangeSoft, 'F3D9B5');
  txt(s, 'Same total volume (8 cm³), but cutting the cube into 8 pieces **doubles** the surface area: 48 ÷ 24 = 2.', MX + 0.3, 4.95, W - 2 * MX - 0.6, 0.8, { size: 17 });
  txt(s, 'Marble **powder** reacts with acid much faster than marble **chips**.', MX + 0.3, 5.8, W - 2 * MX - 0.6, 0.8, { size: 17 });
  notes(s, 'Spec 4.6.1.3: "predict and explain the effects of changes in the size of pieces of a reacting solid in terms of surface area to volume ratio." Links to 4.2.4 (surface area to volume). Checked: 6 × 2² = 24; 8 × 6 × 1² = 48.');
}

D.myTurnYourTurn({
  title: 'Surface area of pieces', tag: 'Maths skill', stepSize: 18, labelW: 2.9, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'A 3 cm cube is cut into 1 cm cubes.',
    steps: [
      { label: 'SA of the 3 cm cube', text: '6 × 3² = **54 cm²**' },
      { label: 'SA of 27 small cubes', text: '27 × 6 = **162 cm²**' },
      { label: 'How many times bigger?', text: '162 ÷ 54 = **3 times**' },
    ],
  },
  yours: {
    q: 'A 4 cm cube is cut into 2 cm cubes.',
    steps: [
      { label: 'SA of the 4 cm cube', text: '6 × 4² = **96 cm²**' },
      { label: 'SA of 8 small cubes', text: '8 × 24 = **192 cm²**' },
      { label: 'How many times bigger?', text: '192 ÷ 96 = **2 times**' },
    ],
  },
  notes: 'Number of small cubes = (big side ÷ small side)³. All values checked in the build script.',
});

D.hinge({
  title: 'Quick check',
  q: 'Why does powdered magnesium react faster than a magnesium ribbon of the same mass?',
  options: ['Larger surface area, so more frequent collisions', 'The particles have more energy', 'It has a lower activation energy', 'There is more magnesium'],
  correct: 0,
  notes: 'Answer A. B is temperature. C is a catalyst. D: same mass, so the same amount.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: temperature', { tag: '4.6.1.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.1, 'Two effects of heating', C.red, 'FBEAEA');
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['Particles **move faster**, so they collide **more frequently**.', 'Particles have **more energy**, so **more collisions** have at least the **activation energy** (more are **successful**).'], 17, 0.15);
  const tw = cw;
  table(s, MX + cw + gap, 1.4, [tw * 0.33, tw * 0.33, tw * 0.34], ['Temp (°C)', 'Time (s)', 'Rate (1/s)'], TEMP.map(([t, x]) => [String(t), String(x), String(1 / x)]), { rh: 0.55, hh: 0.55, size: 16, boldFirst: false, align: ['center', 'center', 'center'] });
  txt(s, 'Disappearing cross at different temperatures (illustrative)', MX + cw + gap, 4.2, cw, 0.35, { size: 13, italic: true, color: C.grey });
  note(s, MX, 4.75, W - 2 * MX, 2.1, 'Here the time **halves** for every **10 °C** rise, so the rate **doubles**. From 20 °C to 50 °C the rate is 0.1 ÷ 0.0125 = **8 times** faster. The **energy** effect is the bigger one: temperature changes rate much more than the extra collisions alone.', { size: 16 });
  notes(s, 'Spec 4.6.1.3: "Increasing the temperature increases the frequency of collisions and makes the collisions more energetic, and so increases the rate of reaction." The "doubles every 10 °C" pattern is a rule of thumb for these data, not a law. Checked in the build script.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which factor increases the energy of the colliding particles?',
  options: ['Temperature', 'Concentration', 'Surface area', 'Pressure'],
  correct: 0,
  notes: 'Answer A. B, C and D only increase the frequency of collisions.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: catalysts', { tag: '4.6.1.4' });
  profile2(s, MX + 0.4, 1.8, 6.6, 4.3);
  const bx = MX + 7.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.5, 'How catalysts work', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Provide a **different pathway** with a **lower activation energy**.', 'So **more collisions are successful**.', 'They are **not used up**: same mass at the end.', 'Not in the equation.'], 16, 0.12);
  note(s, bx, 5.1, bw, 1.75, '**Enzymes** are biological catalysts, e.g. amylase. Industrial example: iron in the **Haber process**.', { size: 16 });
  notes(s, 'Spec 4.6.1.4: "Catalysts change the rate of chemical reactions but are not used up during the reaction. Different reactions need different catalysts. Enzymes act as catalysts in biological systems. Catalysts increase the rate of reaction by providing a different pathway for the reaction that has a lower activation energy. A reaction profile for a catalysed reaction can be drawn in the following form [with lower hump]... Students should be able to identify catalysts in reactions from their effect on the rate of reaction and because they are not included in the chemical equation for the reaction; explain catalytic action in terms of activation energy. Students do not need to know the names of catalysts other than those specified in the subject content." The overall energy change is the same with or without the catalyst.');
}

{
  const s = frame('Is it a catalyst?', { tag: '4.6.1.4' });
  txt(s, 'Hydrogen peroxide decomposes slowly:  2H₂O₂ → 2H₂O + O₂', MX, 1.4, W - 2 * MX, 0.45, { size: 19, bold: true, color: C.maroon });
  const tw = W - 2 * MX;
  table(s, MX, 2.05, [tw * 0.4, tw * 0.3, tw * 0.3], ['Test', 'Result', 'Shows'], [
    ['Add 0.50 g manganese(IV) oxide', 'fast fizzing', 'faster rate'],
    ['Filter, dry and weigh the solid', '0.50 g', 'not used up'],
    ['Add the same solid to fresh H₂O₂', 'fast fizzing again', 'still works'],
  ], { rh: 0.75, size: 17 });
  note(s, MX, 5.0, tw, 1.85, '**Conclusion:** MnO₂ is a **catalyst**: it speeds up the reaction, is **not used up**, and does **not appear** in the equation. Test the gas: oxygen **relights a glowing splint**.', { size: 17 });
  notes(s, 'A classic exam context. Different reactions need different catalysts. Safety: hydrogen peroxide is an irritant; goggles.');
}

D.hinge({
  title: 'Quick check',
  q: 'How does a catalyst increase the rate of reaction?',
  options: ['It lowers the activation energy', 'It gives the particles more energy', 'It increases the concentration', 'It increases the energy change'],
  correct: 0,
  notes: 'Answer A (by providing another pathway). B is temperature. C is wrong. D: the overall energy change is the same.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What two things must happen for particles to react?', 'Collide with at least the activation energy'], ['What is a successful collision?', 'One with enough energy to react'], ['What is an enzyme?', 'A biological catalyst'], ['Is a catalyst used up?', 'No'],
    ['Explain why raising the pressure of a gas increases the rate.', 'More particles per volume, more frequent collisions'], ['A 6 cm cube is cut into 3 cm cubes. How many times more SA?', '2 times'],
    ['Why is temperature’s effect so large?', 'More frequent AND more energetic collisions'], ['How can you show a substance is a catalyst?', 'Faster rate; same mass after; not in the equation'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) collide, with at least the activation energy  2) a collision with enough energy to react  3) a biological catalyst  4) no  5) more particles in the same volume, so more frequent collisions, more successful collisions per second  6) 216 cm² → 8 × 54 = 432 cm², so 2 times  7) more frequent collisions and a greater proportion with at least the activation energy  8) rate increases; mass the same at the end; not in the equation.');
  }
}
near('practice 6', sa(3, 8) / sa(6, 1), 2);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Explain, using collision theory, why increasing the concentration of acid increases the rate of reaction with marble chips.', m: 3, lines: 1 },
    { l: 'b', q: 'Explain why increasing the temperature increases the rate of reaction.', m: 3, lines: 1 },
    { l: 'c', q: 'Copper oxide speeds up a reaction. Describe how a student could show that copper oxide is a catalyst.', m: 2, lines: 1 },
    { l: 'd', q: 'Sketch the reaction profile for an exothermic reaction with and without a catalyst.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'more acid particles in the same volume; more frequent collisions; more successful collisions per second', '3', ''],
    ['(b)', 'particles move faster, more frequent collisions; particles have more energy; more collisions have at least the activation energy', '3', ''],
    ['(c)', 'rate increases (e.g. more gas per second); mass of copper oxide unchanged at the end (filter, dry, weigh)', '2', ''],
    ['(d)', 'products below reactants; catalysed curve with a lower peak (same start and end)', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What does "frequency of collisions" mean?', 'Why does powder react faster than lumps?', 'Give the two effects of raising temperature.', 'Draw a profile with and without a catalyst.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) number of collisions per second  2) larger surface area to volume ratio, more frequent collisions  3) more frequent collisions; more energetic collisions (more reach Ea)  4) lower hump with catalyst. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Write collision theory explanations for all five factors.',
    'Draw graph lines for excess Mg with: original acid, warmer acid, half the acid.',
    'A 10 cm cube is cut into 1 cm cubes. How many times more surface area?',
    'Explain why the rate decreases as a reaction goes on.',
    'Describe how enzymes are used in everyday life or industry.',
    'Explain why catalysts are important for industry (cost and sustainability).',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) see Parts 2–4  2) warmer: steeper, same end; half acid: half the final volume  3) 600 cm² → 6000 cm², 10 times  4) fewer reactant particles, less frequent collisions  5) e.g. biological washing powders, food industry  6) faster reactions at lower temperatures: less energy, lower cost, fewer emissions; catalysts are reused.');
}
near('HW 10cm', sa(1, 1000) / sa(10, 1), 10);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.6_B_CollisionTheoryCatalysts.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
