// build_A11to14.js — AQA GCSE Mathematics 8300, A11–A14 Graphs of functions and real-life graphs
// One two-hour lesson, both tiers (Higher parts tagged HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A11to14.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { graph } = require('./graphs');
const { calc, C } = T;

const DECK = { code: 'A11–A14', title: 'Graphs of functions' };
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);

// ======================= numbers (all checked) =======================
calc('DN1', (-3) ** 2, 9); calc('DN2', 2 * (-2) ** 2, 8); calc('DN3', (-2) ** 3, -8); calc('DN4', 1 / 0.5, 2);
const q = x => x * x - 2 * x - 3;
const QX = [-2, -1, 0, 1, 2, 3, 4], QY = [5, 0, -3, -4, -3, 0, 5];
QX.forEach((x, i) => calc(`q(${x})`, q(x), QY[i]));
calc('roots', q(-1) + q(3), 0); calc('tp', q(1), -4);
calc('solve q=5', q(-2) - 5 + q(4) - 5, 0);
[0, 2, -3].forEach(x => close(`complete square ${x}`, (x - 1) ** 2 - 4, q(x)));
const mt = x => x * x - 4; [-3, -2, -1, 0, 1, 2, 3].forEach((x, i) => calc(`mt ${x}`, mt(x), [5, 0, -3, -4, -3, 0, 5][i]));
const yt = x => x * x + 2 * x - 8; [-5, -4, -3, -2, -1, 0, 1, 2, 3].forEach((x, i) => calc(`yt ${x}`, yt(x), [7, 0, -5, -8, -9, -8, -5, 0, 7][i]));
[-2, -1, 0, 1, 2].forEach((x, i) => calc(`cube ${x}`, x ** 3, [-8, -1, 0, 1, 8][i]));
calc('DT speed out', 30 / 1, 30); calc('DT speed back', 30 / 1.5, 20);
calc('YT speed 1', 3 / 0.5, 6); calc('YT speed 2', 2 / 0.5, 4); calc('YT speed home', 5 / 1, 5);
calc('conv 30', 30 * 1.2, 36); calc('conv 48', 48 / 1.2, 40);
calc('P1', (-2) ** 2 + 1, 5); calc('P2 sym', (-3 + 1) / 2, -1); calc('P4', (-3) ** 3, -27); calc('P5', 120 / 2, 60); calc('P7', 45 * 1.2, 54);
const ex = x => x * x - 4 * x + 1; [0, 1, 2, 3, 4].forEach((x, i) => calc(`exam ${x}`, ex(x), [1, -2, -3, -2, 1][i]));
close('exam roots', ex(2 - Math.sqrt(3)), 0); close('exam roots2', ex(2 + Math.sqrt(3)), 0);
calc('exam d', 90 / 1.5, 60);
[0, 5, -1].forEach(x => close(`exam e ${x}`, (x - 2) ** 2 - 3, ex(x)));

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Quadratic, cubic and reciprocal graphs, and graphs in real life',
  bullets: ['Part 1: quadratic graphs, roots and turning points (A11)', 'Part 2: recognising other graphs (A12, A13)', 'Part 3: real-life graphs (A14)'],
  notes: 'AQA 8300 A11: roots, intercepts and turning points of quadratics graphically; turning points by completing the square (Higher). A12: recognise, sketch and interpret linear, quadratic, cubic and reciprocal graphs; exponential and trig graphs (Higher). A13: transformations (Higher). A14: plot and interpret graphs in real contexts. A15 (gradients and areas under curves, Higher) is left for the kinematics lesson. About two hours; natural breaks at Part 2 and Part 3.',
});

D.objectives({
  tag: 'A11–A14',
  items: [
    'Plot a **quadratic** graph and find its **roots** and **turning point**.',
    '**Recognise** linear, quadratic, cubic and reciprocal graphs.',
    '**Interpret** distance–time and conversion graphs.',
  ],
  keywords: ['quadratic', 'parabola', 'root', 'turning point', 'cubic', 'reciprocal'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Work out  (−3)²', 'Work out  2 × (−2)²', 'Work out  (−2)³', 'Work out  1 ÷ 0.5'],
  answers: ['9', '2 × 4 = 8', '−8', '2'],
  notes: 'Squaring negatives (positive), cubing negatives (negative) and dividing by a decimal are exactly what the tables of values need today.',
});

D.vocab({
  title: 'Key words', tag: 'A11–A14',
  items: [
    { term: 'Quadratic', def: 'Has an **x²** term as its highest power, e.g. **y = x² − 2x − 3**. Its graph is a **parabola**.' },
    { term: 'Root', def: 'Where the graph **crosses the x-axis** (y = 0).' },
    { term: 'Turning point', def: 'The **lowest** (or highest) point of the curve.' },
    { term: 'Cubic / reciprocal', def: 'Highest power **x³** / an equation like **y = 1/x**.' },
  ],
  notes: 'The line of symmetry of a parabola passes through its turning point.',
});

// ---------------- Part 1: quadratics ----------------
{
  const s = frame('Part 1: plotting a quadratic', { tag: 'A11 quadratics' });
  txt(s, 'Draw  **y = x² − 2x − 3**  for x from −2 to 4.', MX, 1.35, 6.6, 0.55, { size: 23 });
  const cw = 0.78;
  ['x', 'y'].forEach((h, i) => {
    rect(s, MX, 2.1 + i * 0.7, 0.7, 0.7, C.maroon, C.line);
    txt(s, h, MX, 2.1 + i * 0.7, 0.7, 0.7, { size: 21, bold: true, color: C.white, align: 'center', valign: 'middle' });
    QX.forEach((x, j) => {
      const v = i ? QY[j] : x;
      rect(s, MX + 0.7 + j * cw, 2.1 + i * 0.7, cw, 0.7, i ? C.greenSoft : C.white, C.line);
      txt(s, String(v).replace('-', '−'), MX + 0.7 + j * cw, 2.1 + i * 0.7, cw, 0.7, { size: 21, bold: i === 1, color: i ? C.green : C.ink, align: 'center', valign: 'middle' });
    });
  });
  txt(s, 'Example:  x = −2:  (−2)² − 2 × (−2) − 3 = 4 + 4 − 3 = **5**', MX, 3.75, 6.6, 0.5, { size: 18 });
  txt(s, 'Join the points with a **smooth curve**, not straight lines.', MX, 4.35, 6.6, 0.5, { size: 19 });
  rect(s, MX, 5.1, 6.4, 1.7, C.orangeSoft, 'F3D9B5');
  txt(s, 'Common mistakes: (−2)² = −4 (it is +4); a pointed bottom instead of a smooth curve; the curve not passing through the lowest point.', MX + 0.3, 5.1, 5.8, 1.7, { size: 18, valign: 'middle' });
  const G = graph(D, s, 7.4, 1.4, W - MX - 7.4, 5.4, [-3, 5], [-5, 7]);
  G.curve(q, -2.2, 4.2, C.maroon, 3);
  QX.forEach((x, i) => G.pt(x, QY[i]));
  notes(s, 'Values: 5, 0, −3, −4, −3, 0, 5. The symmetry of the y-row (5, 0, −3, −4, −3, 0, 5) is a check.');
}

{
  const s = frame('Roots, intercept and turning point', { tag: 'A11 quadratics' });
  const G = graph(D, s, MX + 0.2, 1.4, 6.2, 5.4, [-3, 5], [-5, 7]);
  G.seg(1, -5, 1, 7, C.grey, 1.5, 'dash');
  G.curve(q, -2.2, 4.2, C.maroon, 3);
  G.pt(-1, 0, C.green, '(−1, 0)', -1.1, -0.45); G.pt(3, 0, C.green, '(3, 0)', 0.15, -0.45);
  G.pt(0, -3, C.orange, '(0, −3)', -1.2, -0.1); G.pt(1, -4, C.blue, '(1, −4)', 0.15, 0.0);
  const bx = 7.0, bw = W - MX - bx;
  const items = [['Roots', 'x = −1  and  x = 3', 'where it crosses the x-axis', C.green], ['y-intercept', '(0, −3)', 'where it crosses the y-axis', C.orange], ['Turning point', '(1, −4)', 'the minimum point', C.blue], ['Line of symmetry', 'x = 1', 'halfway between the roots', C.grey]];
  items.forEach(([a, b, c, col], i) => {
    const y = 1.4 + i * 1.35;
    rect(s, bx, y, bw, 1.2, C.white, col, { lw: 2 });
    txt(s, a, bx + 0.3, y + 0.05, 2.6, 0.5, { size: 19, bold: true, color: col });
    txt(s, b, bx + 2.8, y + 0.05, bw - 3.0, 0.5, { size: 23, bold: true });
    txt(s, c, bx + 0.3, y + 0.62, bw - 0.6, 0.45, { size: 16, color: C.grey });
  });
  notes(s, 'The line of symmetry is halfway between the roots: (−1 + 3) ÷ 2 = 1. Substitute x = 1 to get the turning point y = −4.');
}

D.hinge({
  title: 'Quick check',
  q: 'A quadratic graph crosses the x-axis at x = −5 and x = 1. What is the equation of its line of symmetry?',
  options: ['x = −2', 'x = −3', 'x = 2', 'y = −2'],
  correct: 0,
  notes: 'Answer A: (−5 + 1) ÷ 2 = −2. B: (−5 − 1) ÷ 2. C: sign error. D: wrong letter: lines of symmetry of these parabolas are vertical, x = …',
});

{
  const s = frame('Solving equations and turning points', { tag: 'A11 quadratics' });
  const G = graph(D, s, MX + 0.2, 1.4, 5.6, 5.4, [-3, 5], [-5, 7]);
  G.curve(q, -2.2, 4.2, C.maroon, 3);
  G.seg(-3, 5, 5, 5, C.orange, 2.5);
  G.pt(-2, 5, C.orange); G.pt(4, 5, C.orange);
  txt(s, 'y = 5', G.px(-2.9), G.py(5) - 0.42, 1, 0.35, { size: 15, bold: true, color: C.orange });
  const bx = 6.6, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 2.55, C.greyLight);
  txt(s, 'Solve  x² − 2x − 3 = 5  with the graph', bx + 0.3, 1.5, bw - 0.6, 0.5, { size: 20, bold: true, color: C.maroon });
  txt(s, 'Draw the line **y = 5**. Read the x-values where it meets the curve.', bx + 0.3, 2.1, bw - 0.6, 0.9, { size: 19 });
  txt(s, 'x = −2  and  x = 4', bx + 0.3, 3.1, bw - 0.6, 0.6, { size: 26, bold: true, color: C.green });
  rect(s, bx, 4.2, bw, 2.6, C.soft, C.red, { lw: 2 });
  txt(s, '**HT**  Completing the square', bx + 0.3, 4.3, bw - 0.6, 0.5, { size: 19, color: C.red });
  txt(s, 'x² − 2x − 3 = (x − 1)² − 4', bx + 0.3, 4.9, bw - 0.6, 0.55, { size: 23, bold: true });
  txt(s, '(x − a)² + b  has turning point  **(a, b)**,  so here  **(1, −4)**.', bx + 0.3, 5.55, bw - 0.6, 1.0, { size: 19 });
  notes(s, 'Graphical solutions are usually estimates: give them to 1 decimal place. Completing the square is Higher (A11/A18); the algebra is taught fully with A18.');
}

D.myTurnYourTurn({
  title: 'Features of a quadratic', tag: 'Part 1', stepSize: 24, labelW: 3.0, labelSize: 20, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'y = x² − 4.  Table: x −3 to 3 gives  5, 0, −3, −4, −3, 0, 5',
    steps: [
      { label: 'Roots', text: '**x = −2,  x = 2**' },
      { label: 'y-intercept', text: '**(0, −4)**' },
      { label: 'Turning point', text: '**(0, −4)**' },
    ],
  },
  yours: {
    q: 'y = x² + 2x − 8.  Table: x −5 to 3 gives  7, 0, −5, −8, −9, −8, −5, 0, 7',
    steps: [
      { label: 'Roots', text: '**x = −4,  x = 2**' },
      { label: 'y-intercept', text: '**(0, −8)**' },
      { label: 'Turning point', text: '**(−1, −9)**' },
    ],
  },
  notes: 'Roots: where y = 0 in the table. Turning point: the lowest y-value, and it is halfway between the roots: (−4 + 2) ÷ 2 = −1.',
});

// ---------------- Part 2: recognising graphs ----------------
{
  const s = frame('Part 2: recognising graphs', { tag: 'A12 graphs' });
  const cards = [
    ['Linear', 'y = 2x + 1', x => 2 * x + 1, false],
    ['Quadratic', 'y = x²  (U shape)', x => x * x, false],
    ['Quadratic', 'y = −x²  (∩ shape)', x => -x * x, false],
    ['Cubic', 'y = x³', x => x ** 3, false],
    ['Reciprocal', 'y = 1/x', x => 1 / x, false],
    ['Exponential', 'y = 2ˣ   (HT)', x => 2 ** x, true],
  ];
  const cw = 3.85, ch = 2.62, gap = 0.2;
  cards.forEach(([name, eq, fn, ht], i) => {
    const c = i % 3, r = Math.floor(i / 3), x = MX + c * (cw + gap), y = 1.35 + r * (ch + gap);
    rect(s, x, y, cw, ch, C.white, ht ? C.red : C.line, { lw: ht ? 2 : 1 });
    txt(s, name, x + 0.15, y + 0.08, 1.9, 0.4, { size: 18, bold: true, color: ht ? C.red : C.maroon });
    txt(s, eq, x + 0.15, y + 0.46, 1.9, 0.4, { size: 15 });
    const G = graph(D, s, x + 2.0, y + 0.15, 1.7, 2.3, [-3, 3], [-4, 4], { labSize: 1 });
    if (name === 'Reciprocal') { G.curve(fn, -3, -0.2, C.maroon, 2.5); G.curve(fn, 0.2, 3, C.maroon, 2.5); }
    else G.curve(fn, -3, 3, C.maroon, 2.5);
  });
  notes(s, 'Linear: straight line. Quadratic: U or ∩. Cubic: S shape. Reciprocal: two separate curves that never touch the axes. Exponential (Higher): grows faster and faster, always above the x-axis.');
}

{
  const s = frame('Cubic and reciprocal graphs', { tag: 'A12 graphs' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  txt(s, 'y = x³', MX, 1.35, cw, 0.5, { size: 24, bold: true, color: C.maroon });
  const G1 = graph(D, s, MX + 0.2, 1.95, cw - 0.4, 3.6, [-3, 3], [-9, 9], { gridY: 1, labY: 3 });
  G1.curve(x => x ** 3, -2.1, 2.1, C.maroon, 3);
  [-2, -1, 0, 1, 2].forEach(x => G1.pt(x, x ** 3));
  txt(s, 'Table: x = −2 to 2 gives  −8, −1, 0, 1, 8.  S-shaped; a negative cubed is negative.', MX, 5.75, cw, 1.0, { size: 17 });
  const x2 = MX + cw + gap;
  txt(s, 'y = 1/x', x2, 1.35, cw, 0.5, { size: 24, bold: true, color: C.orange });
  const G2 = graph(D, s, x2 + 0.2, 1.95, cw - 0.4, 3.6, [-4, 4], [-4, 4]);
  G2.curve(x => 1 / x, -4, -0.25, C.orange, 3); G2.curve(x => 1 / x, 0.25, 4, C.orange, 3);
  txt(s, 'x ≠ 0: you cannot divide by 0. The curve gets close to both axes but **never touches** them.', x2, 5.75, cw, 1.0, { size: 17 });
  notes(s, 'Reciprocal graphs have two separate branches in opposite quadrants. Do not join them across the axis.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which equation has an S-shaped graph?',
  options: ['y = x² − 1', 'y = x³ + 2', 'y = 3x − 1', 'y = 5/x'],
  correct: 1,
  notes: 'Answer B (cubic). A: U shape. C: straight line. D: reciprocal, two separate curves.',
});

{
  const s = frame('Transforming graphs', HT);
  const G = graph(D, s, MX + 0.2, 1.4, 6.2, 5.4, [-4, 5], [-5, 8]);
  G.curve(x => x * x, -3, 3, C.ink, 3);
  G.curve(x => x * x + 3, -3, 3, C.maroon, 3);
  G.curve(x => (x - 2) ** 2, -1, 5, C.orange, 3);
  G.curve(x => -x * x, -3, 3, C.blue, 3);
  const bx = 7.0, bw = W - MX - bx;
  const rows = [['y = f(x)', 'y = x²', C.ink], ['y = f(x) + 3', 'up 3', C.maroon], ['y = f(x − 2)', 'right 2 (not left!)', C.orange], ['y = −f(x)', 'reflect in the x-axis', C.blue], ['y = f(−x)', 'reflect in the y-axis', C.grey]];
  rows.forEach(([a, b, col], i) => {
    const y = 1.4 + i * 1.05;
    rect(s, bx, y, bw, 0.92, C.white, col, { lw: 2 });
    txt(s, a, bx + 0.25, y, 2.5, 0.92, { size: 21, bold: true, color: col, valign: 'middle' });
    txt(s, b, bx + 2.8, y, bw - 3.0, 0.92, { size: 18, valign: 'middle' });
  });
  notes(s, 'Higher only (A13). Translation inside the bracket goes the "wrong" way: f(x − 2) moves right 2. Turning points move with the graph: y = (x − 2)² has turning point (2, 0).');
}

// ---------------- Part 3: real-life graphs ----------------
{
  const s = frame('Part 3: distance–time graphs', { tag: 'A14 real-life graphs' });
  const G = graph(D, s, MX + 0.6, 1.75, 6.0, 4.6, [0, 3], [0, 40], { gridX: 0.5, gridY: 5, labY: 10, axesAtEdge: true, xTitle: 'Time (hours)', yTitle: 'Distance from home (km)' });
  G.seg(0, 0, 1, 30, C.maroon, 3); G.seg(1, 30, 1.5, 30, C.maroon, 3); G.seg(1.5, 30, 3, 0, C.maroon, 3);
  txt(s, 'A', G.px(0.45) - 0.5, G.py(15) - 0.3, 0.4, 0.35, { size: 18, bold: true, color: C.orange });
  txt(s, 'B', G.px(1.25) - 0.15, G.py(30) - 0.45, 0.4, 0.35, { size: 18, bold: true, color: C.orange });
  txt(s, 'C', G.px(2.3) + 0.15, G.py(14) - 0.1, 0.4, 0.35, { size: 18, bold: true, color: C.orange });
  const bx = 7.6, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.4, C.greyLight);
  txt(s, 'Gradient = **speed**', bx + 0.3, 1.5, bw - 0.6, 0.5, { size: 22, color: C.maroon });
  txt(s, '**A**  30 km in 1 hour:  **30 km/h**', bx + 0.3, 2.25, bw - 0.6, 0.8, { size: 19 });
  txt(s, '**B**  flat line: **not moving** for 30 minutes', bx + 0.3, 3.15, bw - 0.6, 0.8, { size: 19 });
  txt(s, '**C**  back home: 30 km in 1.5 hours:  **20 km/h**', bx + 0.3, 4.05, bw - 0.6, 0.8, { size: 19 });
  txt(s, 'Steeper = faster.  Going down = returning.', bx + 0.3, 5.15, bw - 0.6, 0.9, { size: 18, color: C.grey });
  notes(s, 'Speed = distance ÷ time = gradient. A14 also covers velocity–time graphs, where the gradient is acceleration; the area under them (A15) is Higher and is taught with kinematics.');
}

{
  const s = frame('Conversion and cost graphs', { tag: 'A14 real-life graphs' });
  const G = graph(D, s, MX + 0.6, 1.75, 5.6, 4.6, [0, 50], [0, 60], { gridX: 5, gridY: 6, labX: 10, labY: 12, axesAtEdge: true, xTitle: 'Pounds (£)', yTitle: 'Euros (€)' });
  G.seg(0, 0, 50, 60, C.maroon, 3);
  G.seg(30, 0, 30, 36, C.orange, 2, 'dash'); G.seg(0, 36, 30, 36, C.orange, 2, 'dash');
  G.seg(40, 0, 40, 48, C.green, 2, 'dash'); G.seg(0, 48, 40, 48, C.green, 2, 'dash');
  const bx = 7.2, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.4, C.greyLight);
  txt(s, '£1 = €1.20', bx + 0.3, 1.5, bw - 0.6, 0.5, { size: 22, bold: true, color: C.maroon });
  txt(s, '**£30 → €36**: up from 30, across to the € axis.', bx + 0.3, 2.2, bw - 0.6, 0.9, { size: 19, color: C.orange });
  txt(s, '**€48 → £40**: across from 48, down to the £ axis.', bx + 0.3, 3.15, bw - 0.6, 0.9, { size: 19, color: C.green });
  txt(s, 'A straight line through (0, 0) means the quantities are in **direct proportion**.', bx + 0.3, 4.2, bw - 0.6, 1.0, { size: 18 });
  txt(s, 'A cost graph that starts higher up the y-axis has a **fixed charge** (the y-intercept).', bx + 0.3, 5.3, bw - 0.6, 1.0, { size: 18 });
  notes(s, 'Draw reading lines with a ruler and show them on the graph: AQA often awards a method mark for them.');
}

{
  const qs = ['How far from home are they after 0.5 hours?', 'How long do they stop for?', 'What is their speed for the first 0.5 hours?', 'What is their speed on the way home?'];
  const ans = ['3 km', '30 minutes', '3 ÷ 0.5 = 6 km/h', '5 ÷ 1 = 5 km/h'];
  for (const reveal of [false, true]) {
    const s = frame(reveal ? 'Your turn: a walk: answers' : 'Your turn: a walk', { tag: 'Part 3' });
    const G = graph(D, s, MX + 0.6, 1.75, 5.6, 4.6, [0, 2.5], [0, 6], { gridX: 0.5, gridY: 1, axesAtEdge: true, xTitle: 'Time (hours)', yTitle: 'Distance from home (km)' });
    G.seg(0, 0, 0.5, 3, C.maroon, 3); G.seg(0.5, 3, 1, 3, C.maroon, 3); G.seg(1, 3, 1.5, 5, C.maroon, 3); G.seg(1.5, 5, 2.5, 0, C.maroon, 3);
    const bx = 7.2, bw = W - MX - bx;
    qs.forEach((qq, i) => {
      const y = 1.4 + i * 1.35;
      rect(s, bx, y, bw, 1.2, C.greyLight);
      txt(s, `${i + 1}.  ${qq}`, bx + 0.25, y + 0.05, bw - 0.5, 0.7, { size: 18 });
      if (reveal) txt(s, ans[i], bx + 0.25, y + 0.72, bw - 0.5, 0.45, { size: 20, bold: true, color: C.green });
    });
    notes(s, 'Answers: 3 km; 30 minutes (0.5 h to 1 h); 6 km/h; from 5 km back to 0 in 1 hour: 5 km/h. Extra: speed from 1 h to 1.5 h is 2 ÷ 0.5 = 4 km/h.');
  }
}

// ---------------- Practice and assessment ----------------
{
  const qs = [
    'Complete the table for  y = x² + 1  at  x = −2, 0, 2.',
    'A quadratic has roots x = −3 and x = 1. Find its line of symmetry.',
    'Name the type of graph:  (a) y = 4/x   (b) y = x³ − 2',
    'Work out y when x = −3 for  y = x³.',
    'A car travels 120 km in 2 hours at a steady speed. What is the gradient of its distance–time graph?',
    'What does a horizontal section on a distance–time graph mean?',
    'Use £1 = €1.20 to convert £45 to euros.',
    'HT  Write down the turning point of  y = (x − 3)² + 2.',
  ];
  const ans = ['5,  1,  5', 'x = −1', '(a) reciprocal  (b) cubic', '−27', '60 (km/h)', 'Stopped / not moving', '€54', '(3, 2)'];
  const sets = [['Practice: graphs of functions', 0, 'Questions 1–4'], ['Practice: real-life graphs', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl.split(':')[0] + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 28, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 23, start: k });
    notes(s, 'Answers: 1) 5, 1, 5  2) halfway: x = −1  3) reciprocal; cubic  4) −27  5) 120 ÷ 2 = 60  6) stationary  7) 45 × 1.2 = €54  8) (3, 2).');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 9 marks', size: 20, lineGap: 0.36,
  parts: [
    { l: 'a', q: 'Complete a table of values for  y = x² − 4x + 1  for x = 0, 1, 2, 3, 4.', m: 2, lines: 1 },
    { l: 'b', q: 'Write down the coordinates of the turning point of the graph.', m: 1, lines: 1 },
    { l: 'c', q: 'Use your graph to estimate the roots of  x² − 4x + 1 = 0.', m: 2, lines: 1 },
    { l: 'd', q: 'A train travels 90 km in 1.5 hours. Work out its speed.', m: 2, lines: 1 },
    { l: 'e', q: 'HT  Write  x² − 4x + 1  in the form  (x − a)² + b.', m: 2, lines: 1 },
  ],
  total: 9,
  scheme: [
    ['(a)', '1,  −2,  −3,  −2,  1', 'B2', 'B1 for 3 or 4 correct'],
    ['(b)', '(2, −3)', 'B1', 'ft their table'],
    ['(c)', 'x ≈ 0.3  and  x ≈ 3.7', 'B1 B1', 'accept 0.2 to 0.4 and 3.6 to 3.8'],
    ['(d)', '90 ÷ 1.5 = 60 km/h', 'M1 A1', ''],
    ['(e)', '(x − 2)² − 3', 'B1 B1', 'B1 for (x − 2)², B1 for − 3'],
  ],
  notes: 'Mark scheme on the next slide. Exact roots are 2 ± √3 = 0.27 and 3.73.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Write down the roots of  y = x² − 9.', 'Write down the turning point of  y = x² − 9.', 'Describe the shape of the graph of  y = 1/x.', 'A distance–time graph goes down. What is happening?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) x = −3 and 3  2) (0, −9)  3) two separate curves in opposite quadrants that never touch the axes  4) returning towards the start. Revisit the objectives.');
}
calc('exit roots', 3 * 3 - 9, 0);

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Draw  y = x² − 2x − 8  for x from −3 to 5. Write down its roots and turning point.',
    'Use your graph from Q1 to solve  x² − 2x − 8 = −5.',
    'Draw  y = x³ − 4x  for x from −3 to 3.',
    'Sketch  y = 1/x  and explain why x cannot be 0.',
    'Sam walks 4 km in 1 hour, rests 30 minutes, then walks home in 1.5 hours. Draw the distance–time graph and find each speed.',
    'HT  Find the turning point of  y = x² + 6x + 5  by completing the square.',
  ], { cols: 2, size: 19 });
  notes(s, 'Answers: 1) roots −2 and 4, turning point (1, −9)  2) x = −1 and 3  3) S shape through (−2, 0), (0, 0), (2, 0)  4) 1 ÷ 0 is undefined  5) 4 km/h, 0, 4 ÷ 1.5 ≈ 2.7 km/h  6) (x + 3)² − 4, so (−3, −4).');
}
calc('HW1 roots', (-2) ** 2 - 2 * -2 - 8 + 4 ** 2 - 8 - 8, 0); calc('HW1 tp', 1 - 2 - 8, -9);
calc('HW2', (-1) ** 2 + 2 - 8 + 9 - 6 - 8, -10);
[0, 2, -4].forEach(x => close(`HW6 ${x}`, (x + 3) ** 2 - 4, x * x + 6 * x + 5));

D.save(path.join(__dirname, 'AQA_8300_A11-A14_GraphsOfFunctions.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
