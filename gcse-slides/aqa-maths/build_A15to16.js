// build_A15to16.js — AQA GCSE Mathematics 8300, A15–A16 Gradients, areas under graphs, circles and tangents
// One two-hour lesson. All of A15–A16 is Higher tier.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A15to16.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { graph } = require('./graphs');
const { calc, C } = T;

const DECK = { code: 'A15–A16', title: 'Gradients, areas and circles' };
const D = T.init(DECK);
const { frame, notes, txt, rect, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const F = (n, d) => ({ n, d });
const grad = (x1, y1, x2, y2) => (y2 - y1) / (x2 - x1);
// trapezium rule: strip width h, heights ys
const trap = (h, ys) => h * (ys[0] / 2 + ys.slice(1, -1).reduce((a, b) => a + b, 0) + ys[ys.length - 1] / 2);
// tangent to x² + y² = r² at (a, b) is ax + by = r²; check it is perpendicular to the radius and passes through P
const tangentOK = (l, a, b, A, B, R, R2) => { close(l + ' through P', A * a + B * b, R); close(l + ' perp', (b / a) * (-A / B), -1); close(l + ' on circle', a * a + b * b, R2); };

// ======================= numbers (all checked) =======================
calc('DN1', grad(1, 2, 3, 8), 3); calc('DN2', (4 + 6) / 2 * 5, 25); close('DN3', -1 / 2 * 2, -1); calc('DN4', Math.sqrt(6 ** 2 + 8 ** 2), 10);
// y = x², tangent at (2, 4): y = 4x − 4, through (1, 0) and (3, 8)
close('tan x2', 2 * 2, 4); calc('tan pts', 4 * 1 - 4, 0); calc('tan pts2', 4 * 3 - 4, 8); calc('tan grad', grad(1, 0, 3, 8), 4); calc('tan touches', 4 * 2 - 4, 2 ** 2);
calc('MT1', grad(1, 3, 4, 9), 2); calc('MT2', grad(1, 1, 3, 9), 4); calc('MT3', grad(2, 10, 6, 30), 5); calc('MT4', 15 / 5, 3);
calc('YT1', grad(0, -2, 3, 10), 4); calc('YT2', grad(1, 1, 4, 16), 5); calc('YT3', grad(1, 4, 5, 28), 6); close('YT4', 20 / 8, 2.5);
calc('vt area', 0.5 * 4 * 10 + 6 * 10 + 0.5 * 5 * 10, 105);
calc('trap x2', trap(1, [0, 1, 4, 9, 16]), 22); close('exact x2', 64 / 3, 21.333333333333332);
calc('MTa1', 0.5 * 4 * 8, 16); calc('MTa2', 8 * 10, 80); calc('MTa3', (4 + 10) / 2 * 6, 42); calc('MTa4', trap(1, [1, 2, 5]), 5);
calc('YTa1', 0.5 * 3 * 6, 9); calc('YTa2', 12 * 5, 60); calc('YTa3', (2 + 8) / 2 * 4, 20); calc('YTa4', trap(1, [0, 1, 4]), 3);
calc('circ1', 3 ** 2 + 4 ** 2, 25); calc('circ2', 2 ** 2 + 5 ** 2, 29); calc('circ r7', Math.sqrt(49), 7); close('circ 20', Math.sqrt(20), 2 * Math.sqrt(5));
tangentOK('tan 25', 3, 4, 3, 4, 25, 25); close('tan 25 y', -0.75 * 3 + 6.25, 4);
tangentOK('MTt', 1, 3, 1, 3, 10, 10); tangentOK('YTt', 2, 4, 1, 2, 10, 20);
close('YTt chk', 2 * 2 + 4 * 4, 20);
calc('P1', Math.sqrt(81), 9); calc('P2', 6 ** 2, 36); calc('P3', 5 ** 2 + (-2) ** 2, 29); calc('P4', grad(0, -3, 2, 5), 4);
calc('P5', 12 / 3, 4); calc('P6', 0.5 * 3 * 12, 18); tangentOK('P7', 2, 3, 2, 3, 13, 13); calc('P8', trap(1, [1, 2, 5]), 5); close('P8 exact', 8 / 3 + 2, 4.666666666666667);
calc('exam a', 3 ** 2 + 6 ** 2, 45); calc('exam b grad', grad(0, 0, 3, 6), 2); tangentOK('exam b', 3, 6, 1, 2, 15, 45); close('exam b2', 3 + 2 * 6, 15);
calc('exam c Q', 15 / 1, 15); calc('exam c', 0.5 * 15 * 6, 45); calc('exam d v', 2 * 5, 10); calc('exam d', 0.5 * 5 * 10 + 10 * 10, 125);
calc('exit1', Math.sqrt(64), 8); calc('exit2', grad(1, 2, 3, 10), 4); close('exit4', -1 / (3 / 4), -4 / 3);
calc('HW1', 10 ** 2, 100); calc('HW2', 36 + 64, 100); tangentOK('HW3', 6, 8, 3, 4, 50, 100); calc('HW4', 2 * 3 - 2, 4); calc('HW5', 0.5 * 25 * 20, 250);
close('HW6', trap(1, [10, 5, 10 / 3, 2.5]), 14.583333333333334); close('HW6 exact', 10 * Math.log(4), 13.862943611198906);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Gradients of curves, areas under graphs, the equation of a circle and tangents to a circle',
  bullets: ['Part 1: the gradient of a curve (A15)', 'Part 2: the area under a graph (A15)', 'Part 3: the equation of a circle (A16)', 'Part 4: tangents to a circle (A16)'],
  notes: 'AQA 8300 A15: calculate or estimate gradients of graphs and areas under graphs (including quadratic and other non-linear graphs), and interpret results in cases such as distance–time graphs, velocity–time graphs and graphs in financial contexts. A16: recognise and use the equation of a circle with centre at the origin; find the equation of a tangent to a circle at a given point. Both are Higher tier only. About two hours.',
});

D.objectives({
  tag: 'A15–A16  Higher',
  items: [
    'Estimate the **gradient of a curve** by drawing a **tangent**, and say what it means.',
    'Find and estimate the **area under a graph**, including a velocity–time graph.',
    'Use the **equation of a circle**  x² + y² = r².',
    'Find the **equation of a tangent** to a circle at a given point.',
  ],
  keywords: ['tangent', 'chord', 'gradient', 'area under a graph', 'radius'],
  notes: 'Share the objectives. Everything today is Higher tier.',
});

D.doNow({
  qs: ['Find the gradient of the line through (1, 2) and (3, 8).', 'A trapezium has parallel sides 4 cm and 6 cm, and height 5 cm. Find its area.', 'A line has gradient 2. What is the gradient of a line perpendicular to it?', 'Work out  √(6² + 8²)'],
  answers: ['3', '25 cm²', '−½', '10'],
  notes: 'These are the four skills today needs: gradient from two points, trapezium area, perpendicular gradients (product −1) and Pythagoras.',
});

D.vocab({
  title: 'Key words', tag: 'A15–A16',
  items: [
    { term: 'Tangent', def: 'A straight line that **touches** a curve at one point. Its gradient is the gradient of the curve there.' },
    { term: 'Chord', def: 'A straight line **joining two points** on a curve. Its gradient is an **average** rate of change.' },
    { term: 'Area under a graph', def: 'On a velocity–time graph, the area under the graph is the **distance travelled**.' },
    { term: 'Circle  x² + y² = r²', def: 'A circle with **centre the origin** and **radius r**.' },
  ],
  notes: 'A tangent to a circle is always perpendicular to the radius at the point where it touches.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the gradient of a curve', HT);
  const G = graph(D, s, MX + 0.5, 1.45, 5.2, 5.2, [0, 4], [-4, 16], { gridX: 1, gridY: 2, labY: 4 });
  G.curve(x => x * x, 0, 4, C.maroon, 3);
  G.line(4, -4, C.orange, 2.5);
  G.pt(2, 4, C.maroon, '(2, 4)', -1.05, -0.2);
  G.pt(1, 0, C.orange, '(1, 0)', -1.0, -0.45); G.pt(3, 8, C.orange, '(3, 8)', 0.18, -0.02);
  txt(s, 'y = x²', G.px(3.45) - 0.2, G.py(15.5), 1.2, 0.4, { size: 17, bold: true, color: C.maroon });
  const bx = MX + 6.4, bw = W - MX - bx;
  txt(s, 'Estimate the gradient of  y = x²  at  x = 2', bx, 1.45, bw, 0.5, { size: 21, bold: true, color: C.maroon });
  const st = [
    ['1', 'Draw a **tangent** at (2, 4) with a ruler. It should touch the curve, not cross it.'],
    ['2', 'Pick two points on the tangent that are **far apart**:  (1, 0) and (3, 8).'],
    ['3', 'Gradient = change in y ÷ change in x = 8 ÷ 2 = **4**'],
  ];
  st.forEach(([n, t], i) => {
    const y = 2.15 + i * 1.2;
    D.circle(s, bx + 0.25, y + 0.25, 0.45, C.accent);
    txt(s, n, bx, y, 0.5, 0.5, { size: 18, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, t, bx + 0.7, y, bw - 0.7, 1.1, { size: 19 });
  });
  rect(s, bx, 5.8, bw, 0.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'A hand-drawn tangent gives an **estimate**: answers close to 4 get the marks.', bx + 0.25, 5.8, bw - 0.5, 0.85, { size: 18, valign: 'middle' });
  notes(s, 'The exact gradient is 4 (from calculus, which is A-level), so this tangent is perfect. In the exam, a tangent drawn by eye gives answers in a range, e.g. 3.5 to 4.5. Bigger triangles give more accurate gradients.');
}

{
  const s = frame('What does the gradient mean?', HT);
  const rows = [['Distance–time', 'speed', 'm per s  →  m/s'], ['Velocity–time', 'acceleration', 'm/s per s  →  m/s²'], ['Cost–time', 'rate of spending', '£ per month'], ['Volume–time', 'rate of flow', 'litres per minute']];
  const cw = [3.1, 3.3, W - 2 * MX - 6.4], top = 1.4;
  ['Graph', 'Gradient means', 'Units: y unit per x unit'].forEach((h, j) => {
    const x = MX + cw.slice(0, j).reduce((a, b) => a + b, 0);
    rect(s, x, top, cw[j], 0.6, C.maroon);
    txt(s, h, x + 0.2, top, cw[j] - 0.4, 0.6, { size: 18, bold: true, color: C.white, valign: 'middle' });
  });
  rows.forEach((r, i) => r.forEach((c, j) => {
    const x = MX + cw.slice(0, j).reduce((a, b) => a + b, 0), y = top + 0.6 + i * 0.7;
    rect(s, x, y, cw[j], 0.7, i % 2 ? C.white : C.soft, C.line);
    txt(s, c, x + 0.2, y, cw[j] - 0.4, 0.7, { size: 20, bold: j === 1, color: j === 1 ? C.green : C.ink, valign: 'middle' });
  }));
  const gap = 0.4, bw = (W - 2 * MX - gap) / 2, by = 5.0;
  rect(s, MX, by, bw, 1.85, C.greyLight);
  txt(s, '**Tangent:** the rate of change **at an instant**, e.g. the speed at exactly t = 3 s.', MX + 0.25, by + 0.15, bw - 0.5, 1.6, { size: 19 });
  rect(s, MX + bw + gap, by, bw, 1.85, C.greyLight);
  txt(s, '**Chord:** the **average** rate of change between two points, e.g. the average speed from t = 0 to t = 4.', MX + bw + gap + 0.25, by + 0.15, bw - 0.5, 1.6, { size: 19 });
  notes(s, 'Always state units when interpreting a gradient. A negative gradient on a velocity–time graph is a deceleration.');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'What does the gradient of a velocity–time graph represent?',
  options: ['acceleration', 'distance', 'speed', 'time taken'],
  correct: 0,
  notes: 'Answer A. B is the AREA under a velocity–time graph. C is the gradient of a DISTANCE–time graph.',
});

D.myTurnYourTurn({
  title: 'Gradients', tag: 'Part 1', stepSize: 24, labelW: 3.75, labelSize: 20, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Find the gradient (with units):',
    steps: [
      { label: 'Tangent: (1, 3), (4, 9)', text: '**2**' },
      { label: 'y = x², chord x = 1 to x = 3', text: '**4**' },
      { label: 'd–t tangent: (2, 10), (6, 30)', text: '**5 m/s**' },
      { label: 'v–t: 0 to 15 m/s in 5 s', text: '**3 m/s²**' },
    ],
  },
  yours: {
    q: 'Find the gradient (with units):',
    steps: [
      { label: 'Tangent: (0, −2), (3, 10)', text: '**4**' },
      { label: 'y = x², chord x = 1 to x = 4', text: '**5**' },
      { label: 'd–t tangent: (1, 4), (5, 28)', text: '**6 m/s**' },
      { label: 'v–t: 0 to 20 m/s in 8 s', text: '**2.5 m/s²**' },
    ],
  },
  notes: 'Chords: find both y-values first. Mine: (1, 1) and (3, 9), so 8 ÷ 2 = 4. Yours: (1, 1) and (4, 16), so 15 ÷ 3 = 5. d–t = distance in metres against time in seconds.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the area under a velocity–time graph', HT);
  const G = graph(D, s, MX + 0.7, 1.75, 6.4, 4.4, [0, 16], [0, 12], { gridX: 1, gridY: 2, labX: 2, labY: 2, axesAtEdge: true, xTitle: 'Time (s)', yTitle: 'Velocity (m/s)' });
  G.seg(0, 0, 4, 10, C.maroon, 3); G.seg(4, 10, 10, 10, C.maroon, 3); G.seg(10, 10, 15, 0, C.maroon, 3);
  G.seg(4, 0, 4, 10, C.grey, 1.5, 'dash'); G.seg(10, 0, 10, 10, C.grey, 1.5, 'dash');
  [[2.7, 'A'], [7, 'B'], [11.6, 'C']].forEach(([x, l]) => txt(s, l, G.px(x) - 0.25, G.py(4) - 0.25, 0.5, 0.5, { size: 22, bold: true, color: C.orange, align: 'center' }));
  const bx = MX + 7.6, bw = W - MX - bx;
  txt(s, 'Area = **distance travelled**', bx, 1.45, bw, 0.5, { size: 21, color: C.maroon });
  const parts = [['A  triangle', '½ × 4 × 10 = 20'], ['B  rectangle', '6 × 10 = 60'], ['C  triangle', '½ × 5 × 10 = 25']];
  parts.forEach(([a, b], i) => {
    const y = 2.15 + i * 0.85;
    rect(s, bx, y, bw, 0.75, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, bx + 0.2, y, 1.9, 0.75, { size: 18, bold: true, color: C.orange, valign: 'middle' });
    txt(s, b, bx + 2.1, y, bw - 2.2, 0.75, { size: 20, valign: 'middle' });
  });
  txt(s, 'Total = **105 m**', bx, 4.8, bw, 0.6, { size: 28, bold: true, color: C.green });
  txt(s, 'Gradient of A = 10 ÷ 4 = 2.5 m/s²  (acceleration)', bx, 5.6, bw, 0.9, { size: 17, color: C.grey });
  notes(s, 'Split the area into triangles, rectangles and trapeziums. You can also do it as one trapezium: ½ × (6 + 15) × 10 = 105 m. The deceleration in C is 10 ÷ 5 = 2 m/s².');
}

{
  const s = frame('Estimating the area under a curve', HT);
  const G = graph(D, s, MX + 0.5, 1.45, 5.2, 5.2, [0, 4], [0, 16], { gridX: 1, gridY: 2, labY: 4 });
  for (let x = 1; x <= 4; x++) G.seg(x, 0, x, x * x, C.grey, 1.5, 'dash');
  for (let x = 0; x < 4; x++) G.seg(x, x * x, x + 1, (x + 1) ** 2, C.orange, 2.5);
  G.curve(x => x * x, 0, 4, C.maroon, 3);
  txt(s, 'y = x²', G.px(2.7) - 0.9, G.py(12), 1.2, 0.4, { size: 17, bold: true, color: C.maroon });
  const bx = MX + 6.4, bw = W - MX - bx;
  txt(s, 'Estimate the area under  y = x²  from  x = 0  to  x = 4  using 4 strips.', bx, 1.45, bw, 0.9, { size: 20, bold: true, color: C.maroon });
  txt(s, 'Heights at x = 0, 1, 2, 3, 4:   0,  1,  4,  9,  16', bx, 2.45, bw, 0.5, { size: 19 });
  txt(s, 'Each strip is a **trapezium** with width 1:', bx, 3.05, bw, 0.5, { size: 19 });
  math(s, bx, 3.95, ['½(0 + 1) + ½(1 + 4) + ½(4 + 9) + ½(9 + 16)'], { size: 19 });
  txt(s, '= 0.5 + 2.5 + 6.5 + 12.5 = **22**', bx, 4.45, bw, 0.5, { size: 22, color: C.green });
  rect(s, bx, 5.3, bw, 1.35, C.orangeSoft, 'F3D9B5');
  txt(s, '**Overestimate:** the straight tops of the trapeziums lie **above** the curve.', bx + 0.25, 5.3, bw - 0.5, 1.35, { size: 19, valign: 'middle' });
  notes(s, 'The exact area is 21⅓ (A-level integration), so 22 is a slight overestimate. More strips give a better estimate. If the curve bends the other way (concave down), trapeziums give an underestimate.');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'A car goes from 0 to 12 m/s in 4 s at a steady rate. How far does it travel in that time?',
  options: ['24 m', '48 m', '3 m', '16 m'],
  correct: 0,
  notes: 'Answer A: triangle ½ × 4 × 12 = 24 m. B forgot the ½. C is the acceleration (12 ÷ 4 = 3 m/s²). D added 12 + 4.',
});

D.myTurnYourTurn({
  title: 'Areas under graphs', tag: 'Part 2', stepSize: 24, labelW: 3.75, labelSize: 20, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Find the distance (or the area):',
    steps: [
      { label: 'v: 0 to 8 m/s in 4 s', text: '**16 m**' },
      { label: 'v = 8 m/s for 10 s', text: '**80 m**' },
      { label: 'v: 4 to 10 m/s in 6 s', text: '**42 m**' },
      { label: 'y = x² + 1, x = 0 to 2, 2 strips', text: '**5**' },
    ],
  },
  yours: {
    q: 'Find the distance (or the area):',
    steps: [
      { label: 'v: 0 to 6 m/s in 3 s', text: '**9 m**' },
      { label: 'v = 12 m/s for 5 s', text: '**60 m**' },
      { label: 'v: 2 to 8 m/s in 4 s', text: '**20 m**' },
      { label: 'y = x², x = 0 to 2, 2 strips', text: '**3**' },
    ],
  },
  notes: 'Third rows are trapeziums: ½(4 + 10) × 6 = 42 and ½(2 + 8) × 4 = 20. Last rows: heights 1, 2, 5 give ½(1 + 2) + ½(2 + 5) = 5; heights 0, 1, 4 give 0.5 + 2.5 = 3.',
});

// ---------------- Part 3 ----------------
function circleGraph(s, gx, gy, size) {
  const G = graph(D, s, gx, gy, size, size, [-6, 6], [-6, 6], { gridX: 1, gridY: 1, labX: 2, labY: 2 });
  G.curve(x => Math.sqrt(Math.max(0, 25 - x * x)), -5, 5, C.maroon, 3, 240);
  G.curve(x => -Math.sqrt(Math.max(0, 25 - x * x)), -5, 5, C.maroon, 3, 240);
  return G;
}
{
  const s = frame('Part 3: the equation of a circle', HT);
  const G = circleGraph(s, MX + 0.3, 1.4, 5.4);
  G.seg(0, 0, 3, 4, C.orange, 2.5);
  G.pt(3, 4, C.green, '(3, 4)', 0.15, -0.45);
  txt(s, 'r = 5', G.px(1.9), G.py(1.7), 0.8, 0.4, { size: 16, bold: true, color: C.orange });
  const bx = MX + 6.2, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 1.0, C.soft, C.line);
  txt(s, '**x² + y² = r²**   centre (0, 0), radius r', bx + 0.25, 1.4, bw - 0.5, 1.0, { size: 23, valign: 'middle' });
  txt(s, 'It is Pythagoras: every point (x, y) on the circle is r from the origin.', bx, 2.55, bw, 0.8, { size: 18, color: C.grey });
  const ex = [['x² + y² = 49', 'radius 7'], ['Radius 6', 'x² + y² = 36'], ['x² + y² = 20', 'r = √20 = 2√5'], ['Is (3, 4) on x² + y² = 25?', '9 + 16 = 25  ✓'], ['Is (2, 5) on x² + y² = 25?', '4 + 25 = 29  ✗']];
  ex.forEach(([a, b], i) => {
    const y = 3.45 + i * 0.68;
    rect(s, bx, y, bw, 0.6, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, a, bx + 0.2, y, 3.5, 0.6, { size: 18, valign: 'middle' });
    txt(s, b, bx + 3.7, y, bw - 3.8, 0.6, { size: 19, bold: true, color: C.green, valign: 'middle' });
  });
  notes(s, 'Common error: x² + y² = 49 has radius 7, not 49. A point with x² + y² bigger than r² is outside the circle: (2, 5) gives 29 > 25.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: the tangent to a circle', HT);
  const G = circleGraph(s, MX + 0.3, 1.4, 5.4);
  G.seg(0, 0, 3, 4, C.orange, 2.5);
  G.line(-0.75, 6.25, C.blue, 2.5);
  G.pt(3, 4, C.green, 'P(3, 4)', 0.15, -0.5);
  const bx = MX + 6.2, bw = W - MX - bx;
  txt(s, 'Find the tangent to  x² + y² = 25  at  P(3, 4).', bx, 1.45, bw, 0.5, { size: 20, bold: true, color: C.maroon });
  const st = [
    ['Gradient of the radius OP', ['4 ÷ 3 = ', F(4, 3)]],
    ['Tangent ⊥ radius: negative reciprocal', ['−', F(3, 4)]],
    ['y − y₁ = m(x − x₁) at P', ['y − 4 = −', F(3, 4), '(x − 3)']],
    ['× 4:  4y − 16 = −3x + 9.  Rearrange', ['3x + 4y = 25']],
  ];
  st.forEach(([why, m], i) => {
    const y = 2.1 + i * 1.12;
    rect(s, bx, y, bw, 1.0, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, why, bx + 0.2, y, 2.6, 1.0, { size: 15, color: C.orange, valign: 'middle' });
    math(s, bx + 2.95, y + 0.5, m, { size: 21, bold: true });
  });
  txt(s, 'Check: P(3, 4) gives 9 + 16 = 25  ✓', bx, 6.6, bw, 0.4, { size: 16, color: C.grey });
  notes(s, 'The tangent meets the radius at 90°, so their gradients multiply to −1: 4/3 × −3/4 = −1. y = −¾x + 25/4 is also correct. Shortcut to check (not needed): the tangent at (a, b) is ax + by = r².');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'The tangent to a circle (centre O) at P is drawn. The gradient of OP is 2. What is the gradient of the tangent?',
  options: [['−', F(1, 2)], ['2'], ['−2'], [F(1, 2)]],
  correct: 0,
  notes: 'Answer A: perpendicular, so the negative reciprocal. B is the radius. C changed the sign only. D took the reciprocal only.',
});

D.myTurnYourTurn({
  title: 'Tangents to a circle', tag: 'Part 4', stepSize: 22, labelW: 2.55, labelSize: 19, labelPlain: true, labelColor: C.ink, showYourQs: false,
  mine: {
    q: 'Tangent to  x² + y² = 10  at  P(1, 3):',
    steps: [
      { label: 'Gradient of OP', text: '**3 ÷ 1 = 3**' },
      { label: 'Tangent gradient', math: ['−', F(1, 3)], bold: true },
      { label: 'Use P', text: '**y − 3 = −⅓(x − 1)**' },
      { label: 'Rearrange', text: '**x + 3y = 10**' },
    ],
  },
  yours: {
    q: 'Tangent to  x² + y² = 20  at  P(2, 4):',
    steps: [
      { label: 'Gradient of OP', text: '**4 ÷ 2 = 2**' },
      { label: 'Tangent gradient', math: ['−', F(1, 2)], bold: true },
      { label: 'Use P', text: '**y − 4 = −½(x − 2)**' },
      { label: 'Rearrange', text: '**x + 2y = 10**' },
    ],
  },
  notes: 'Mine: multiply by 3: 3y − 9 = −x + 1, so x + 3y = 10. Yours: multiply by 2: 2y − 8 = −x + 2, so x + 2y = 10. Check each by substituting P.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Write down the radius of the circle  x² + y² = 81.', '9'], ['Write the equation of the circle with centre O and radius 6.', 'x² + y² = 36'],
    ['Does the point (5, −2) lie on  x² + y² = 29?  Show how you know.', 'Yes: 25 + 4 = 29'], ['A tangent to a curve passes through (0, −3) and (2, 5). Find its gradient.', '4'],
    ['A car goes from 0 to 12 m/s in 3 s at a steady rate. Find its acceleration.', '4 m/s²'], ['For the car in Q5, find the distance it travels in the 3 s.', '18 m'],
    ['Find the equation of the tangent to  x² + y² = 13  at (2, 3).', '2x + 3y = 13'], ['Use 2 strips to estimate the area under  y = x² + 1  from x = 0 to 2. Over or under?', '5, an overestimate'],
  ];
  for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 30, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 22, start: k });
    notes(s, 'Answers: 1) √81 = 9  2) x² + y² = 36  3) 25 + 4 = 29, yes  4) 8 ÷ 2 = 4  5) 12 ÷ 3 = 4 m/s²  6) ½ × 3 × 12 = 18 m  7) OP gradient 3/2, tangent −2/3: y − 3 = −⅔(x − 2), so 2x + 3y = 13  8) heights 1, 2, 5: ½(1 + 2) + ½(2 + 5) = 5; the curve bends up, so it is an overestimate (exact 4⅔).');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  stem: 'The circle  x² + y² = 45  passes through the point P(3, 6). O is the origin.',
  parts: [
    { l: 'a', q: 'Show that P lies on the circle.', m: 1, lines: 0 },
    { l: 'b', q: 'Find the equation of the tangent to the circle at P. Give your answer in the form  ax + by = c.', m: 3, lines: 1 },
    { l: 'c', q: 'The tangent meets the x-axis at Q. Work out the area of triangle OPQ.', m: 3, lines: 1 },
    { l: 'd', q: 'A car starts from rest and accelerates at 2 m/s² for 5 s. It then travels at a constant speed for 10 s. Work out the total distance it travels.', m: 3, lines: 1 },
  ],
  total: 10,
  scheme: [
    ['(a)', '3² + 6² = 9 + 36 = 45', 'B1', ''],
    ['(b)', 'x + 2y = 15', 'M1 M1 A1', 'M1 gradient OP = 2; M1 tangent gradient −½'],
    ['(c)', 'Q = (15, 0); ½ × 15 × 6 = 45', 'M1 M1 A1', 'M1 for Q; M1 ½ × base × height'],
    ['(d)', '½ × 5 × 10 + 10 × 10 = 125 m', 'M1 M1 A1', 'M1 speed 10 m/s; M1 an area'],
  ],
  notes: 'Mark scheme on the next slide. Sketching the velocity–time graph for (d) is the best first step.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Write down the radius of  x² + y² = 64.', 'A tangent passes through (1, 2) and (3, 10). Find its gradient.', 'What does the gradient of a distance–time graph represent?', 'Find the gradient of the tangent to  x² + y² = 25  at (4, 3).'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) 8  2) 8 ÷ 2 = 4  3) speed  4) OP gradient ¾, so the tangent gradient is −4/3. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Write the equation of the circle with centre O and radius 10.',
    'Show that (−6, 8) lies on the circle in Q1.',
    'Find the equation of the tangent to  x² + y² = 100  at (6, 8).',
    'Draw  y = x² − 2x  for 0 ≤ x ≤ 4 and estimate the gradient at x = 3.',
    'A train speeds up from 0 to 20 m/s in 10 s, then slows to 0 in 15 s. Find the total distance.',
    'Use 3 strips to estimate the area under  y = 10/x  from x = 1 to 4. Over or under?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) x² + y² = 100  2) 36 + 64 = 100  3) OP gradient 4/3, tangent −¾: 3x + 4y = 50  4) about 4  5) ½ × 25 × 20 = 250 m  6) heights 10, 5, 3.33, 2.5: 7.5 + 4.17 + 2.92 = 14.6 (3 sf), an overestimate (exact 13.9).');
}

D.save(path.join(__dirname, 'AQA_8300_A15-A16_GradientsAreasAndCircles.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
