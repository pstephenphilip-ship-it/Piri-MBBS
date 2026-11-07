// build_A7to10.js — AQA GCSE Mathematics 8300, A7–A10 Functions, coordinates and straight-line graphs
// One two-hour lesson, both tiers (Higher parts tagged HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A7to10.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A7–A10', title: 'Straight-line graphs' };
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b) => calc(l, a, b, 1e-9);

// ======================= numbers (all checked) =======================
calc('DN1', 2 * 3 + 1, 7); calc('DN2', 2 * -3 + 1, -5); calc('DN3', -3 - 5, -8); calc('DN4', 6 / 2, 3);
const f = x => 3 * x + 2;
[[0, 2], [1, 5], [4, 14], [-2, -4]].forEach(([i, o]) => calc(`f(${i})`, f(i), o));
const finv = y => (y - 2) / 3; [5, 14, -4].forEach(y => close(`finv ${y}`, f(finv(y)), y));
const g = x => x * x; calc('fg(2) = f(4)', f(g(2)), 14); calc('gf(2) = g(8)', g(f(2)), 64);
calc('hinge f(3)=2*3-5', 2 * 3 - 5, 1);
calc('midpoint x', (-2 + 4) / 2, 1); calc('midpoint y', (3 + -5) / 2, -1);
const line = x => 2 * x + 1; [[-2, -3], [-1, -1], [0, 1], [1, 3], [2, 5]].forEach(([x, y]) => calc(`y=2x+1 ${x}`, line(x), y));
calc('gradient triangle', (5 - 1) / (2 - 0), 2);
calc('neg gradient', (-1 - 3) / (2 - 0), -2);
calc('rearrange 2y=4x+6 at 1', (4 * 1 + 6) / 2, 2 * 1 + 3);
calc('2pt m', (9 - 3) / (4 - 1), 2); calc('2pt c', 3 - 2 * 1, 1); calc('2pt check', 2 * 4 + 1, 9);
calc('perp', 2 * -0.5, -1);
calc('MT m (2,5),(5,11)', (11 - 5) / (5 - 2), 2); calc('MT c', 5 - 2 * 2, 1);
calc('YT m (1,7),(3,1)', (1 - 7) / (3 - 1), -3); calc('YT c', 7 - -3 * 1, 10); calc('YT check', -3 * 3 + 10, 1);
calc('P1 f(x)=4x-3 f(5)', 4 * 5 - 3, 17); calc('P2 inverse 4x-3=25', (25 + 3) / 4, 7);
calc('P3 midpoint', (1 + 7) / 2, 4); calc('P3 midpoint y', (-2 + 6) / 2, 2);
calc('P5 grad (0,4),(2,10)', (10 - 4) / 2, 3);
calc('P6 3y=6x-9 m', 6 / 3, 2); calc('P6 c', -9 / 3, -3);
calc('P7 (2,3),(6,11) m', (11 - 3) / (6 - 2), 2); calc('P7 c', 3 - 4, -1);
calc('P8 HT perp to y=4x', 4 * -0.25, -1);
calc('exam a', 3 * -2 + 1, -5); calc('exam d m', (13 - 1) / (5 - 1), 3); calc('exam d c', 1 - 3, -2);
calc('exit f(x)=5x+1 f(2)', 11, 5 * 2 + 1);
calc('HW3 midpoint', (-3 + 5) / 2, 1); calc('HW3 midpoint y', (4 + 0) / 2, 2);
calc('HW5 (1,1),(3,9) m', (9 - 1) / 2, 4); calc('HW5 c', 1 - 4, -3);

// ======================= graph helper =======================
function graph(s, gx, gy, gw, gh, xr, yr, o = {}) {
  const [x0, x1] = xr, [y0, y1] = yr;
  const px = x => gx + (x - x0) / (x1 - x0) * gw, py = y => gy + (y1 - y) / (y1 - y0) * gh;
  rect(s, gx, gy, gw, gh, C.white, 'D8CDD2', { lw: 1 });
  for (let x = x0; x <= x1; x++) D.vline(s, px(x), gy, gy + gh, x === 0 ? '4A3F45' : 'E6DDE1', x === 0 ? 1.75 : 0.75);
  for (let y = y0; y <= y1; y++) D.hline(s, gx, py(y), gx + gw, y === 0 ? '4A3F45' : 'E6DDE1', y === 0 ? 1.75 : 0.75);
  const step = o.step || 1, lab = o.labSize || 12;
  for (let x = x0; x <= x1; x += step) if (x !== 0) txt(s, String(x).replace('-', '−'), px(x) - 0.25, py(0) + 0.03, 0.5, 0.28, { size: lab, color: C.grey, align: 'center' });
  for (let y = y0; y <= y1; y += step) if (y !== 0) txt(s, String(y).replace('-', '−'), px(0) - 0.45, py(y) - 0.14, 0.4, 0.28, { size: lab, color: C.grey, align: 'right' });
  txt(s, 'x', gx + gw - 0.3, py(0) - 0.4, 0.3, 0.3, { size: 16, bold: true, italic: true });
  txt(s, 'y', px(0) + 0.08, gy + 0.02, 0.3, 0.3, { size: 16, bold: true, italic: true });
  const G = { px, py };
  G.seg = (xa, ya, xb, yb, color, width = 3, dash) => {
    const X1 = px(xa), Y1 = py(ya), X2 = px(xb), Y2 = py(yb);
    s.addShape(D.SH.line, { x: Math.min(X1, X2), y: Math.min(Y1, Y2), w: Math.max(Math.abs(X2 - X1), 0.001), h: Math.max(Math.abs(Y2 - Y1), 0.001), flipV: (X2 - X1) * (Y2 - Y1) < 0, line: { color, width, dashType: dash } });
  };
  G.line = (m, c, color, width = 3) => {
    // clip y = mx + c to the window
    let pts = [];
    for (const x of [x0, x1]) { const y = m * x + c; if (y >= y0 - 1e-9 && y <= y1 + 1e-9) pts.push([x, y]); }
    if (m !== 0) for (const y of [y0, y1]) { const x = (y - c) / m; if (x > x0 && x < x1) pts.push([x, y]); }
    pts = pts.sort((a, b) => a[0] - b[0]);
    G.seg(pts[0][0], pts[0][1], pts[pts.length - 1][0], pts[pts.length - 1][1], color, width);
  };
  G.pt = (x, y, color = C.maroon, label) => {
    circle(s, px(x), py(y), 0.16, color);
    if (label) txt(s, label, px(x) + 0.12, py(y) - 0.42, 1.6, 0.35, { size: 15, bold: true, color });
  };
  return G;
}
function machine(s, x, y, boxes, o = {}) {
  const bw = o.bw || 1.4, bh = o.bh || 0.8, gap = o.gap || 0.55, col = o.color || C.maroon;
  boxes.forEach((b, i) => {
    const bx = x + i * (bw + gap), end = b.kind === 'end';
    rect(s, bx, y, bw, bh, end ? C.white : (o.soft || C.soft), col, { lw: end ? 2.5 : 1.5 });
    txt(s, b.t, bx, y, bw, bh, { size: o.size || 24, bold: true, color: end ? C.ink : col, align: 'center', valign: 'middle' });
    if (i < boxes.length - 1) s.addShape(D.SH.line, { x: bx + bw + 0.05, y: y + bh / 2, w: gap - 0.1, h: 0, line: { color: col, width: 2.5, endArrowType: 'triangle' } });
  });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Function machines, coordinates, gradient and y = mx + c',
  bullets: ['Part 1: functions (A7)', 'Part 2: coordinates (A8)', 'Part 3: plotting straight lines (A9)', 'Part 4: gradient, intercept and y = mx + c (A9–A10)'],
  notes: 'AQA 8300 A7: interpret simple expressions as functions; inverse and composite functions (Higher). A8: coordinates in all four quadrants. A9: plot straight-line graphs; use y = mx + c to identify parallel lines (perpendicular: Higher); find the equation of a line through two points. A10: identify and interpret gradients and intercepts graphically and algebraically. About two hours; natural breaks at Part 3.',
});

D.objectives({
  tag: 'A7–A10',
  items: [
    'Use **function machines** and **f(x)** notation.',
    'Plot **coordinates** in all four quadrants and find **midpoints**.',
    'Plot **straight-line graphs** from a table of values.',
    'Find the **gradient** and **y-intercept**, and the **equation** of a line.',
  ],
  keywords: ['function', 'coordinate', 'gradient', 'y-intercept', 'parallel'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Work out  2x + 1  when x = 3', 'Work out  2x + 1  when x = −3', 'Work out  −3 − 5', 'Work out  6 ÷ 2  and  −6 ÷ 2'],
  answers: ['7', '−5', '−8', '3  and  −3'],
  notes: 'Substitution with negatives (A2) is exactly what a table of values needs. Division with negatives is needed for gradients.',
});

D.vocab({
  title: 'Key words', tag: 'A7–A10',
  items: [
    { term: 'Function', def: 'A rule that turns an **input** into an **output**, e.g. **f(x) = 3x + 2**.' },
    { term: 'Coordinate', def: 'A position **(x, y)**: x across first, then y up or down.' },
    { term: 'Gradient', def: 'How steep a line is: **change in y ÷ change in x**.' },
    { term: 'y-intercept', def: 'Where a line **crosses the y-axis**: the point (0, c).' },
  ],
  notes: 'Parallel lines have the same gradient: introduced in Part 4.',
});

// ---------------- Part 1: functions ----------------
{
  const s = frame('Part 1: function machines', { tag: 'A7 functions' });
  machine(s, MX + 0.2, 1.55, [{ t: 'input x', kind: 'end' }, { t: '× 3' }, { t: '+ 2' }, { t: 'output', kind: 'end' }], { bw: 1.9, gap: 0.6, size: 24 });
  const rows = [['Input', '0', '1', '4', '−2'], ['Output', '2', '5', '14', '−4']];
  const cw = 1.4;
  rows.forEach((r, i) => r.forEach((c, j) => {
    const x = MX + 0.2 + (j === 0 ? 0 : 1.6 + (j - 1) * cw), w = j === 0 ? 1.6 : cw;
    rect(s, x, 2.85 + i * 0.75, w, 0.75, j === 0 ? C.maroon : (i ? C.greenSoft : C.white), C.line);
    txt(s, c, x, 2.85 + i * 0.75, w, 0.75, { size: 22, bold: j === 0 || i === 1, color: j === 0 ? C.white : i ? C.green : C.ink, align: 'center', valign: 'middle' });
  }));
  const bx = 8.5, bw = W - MX - bx;
  rect(s, bx, 2.85, bw, 1.5, C.greyLight);
  txt(s, 'Function notation', bx + 0.25, 2.95, bw - 0.5, 0.45, { size: 19, bold: true, color: C.maroon });
  txt(s, 'f(x) = 3x + 2', bx + 0.25, 3.45, bw - 0.5, 0.6, { size: 28, bold: true });
  rect(s, MX, 4.75, W - 2 * MX, 2.05, C.soft, C.line);
  txt(s, '**f(4)** means "put 4 into the function":  f(4) = 3 × 4 + 2 = **14**', MX + 0.3, 4.9, W - 2 * MX - 0.6, 0.6, { size: 22 });
  txt(s, '**Working backwards:** if the output is 5, undo it:  5 − 2 = 3,  3 ÷ 3 = **1**', MX + 0.3, 5.6, W - 2 * MX - 0.6, 0.6, { size: 22 });
  txt(s, 'Undo the operations in **reverse order**, using inverses.', MX + 0.3, 6.2, W - 2 * MX - 0.6, 0.5, { size: 19, color: C.grey });
  notes(s, 'Function machines connect to A5 (changing the subject). f(x) notation appears on both tiers in AQA questions; inverse and composite functions are Higher.');
}

{
  const s = frame('Inverse and composite functions', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, 5.4, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
    lines.forEach(([l, b], i) => txt(s, l, x + 0.3, top + 0.95 + i * 0.85, cw - 0.6, 0.75, { size: 21, bold: !!b, color: b ? colour : C.ink }));
  };
  col(MX, 'Inverse:  f⁻¹(x) undoes f(x)', [['f(x) = 3x + 2', 0], ['Write y = 3x + 2', 0], ['Rearrange: x = (y − 2) ÷ 3', 0], ['f⁻¹(x) = (x − 2) ÷ 3', 1], ['Check: f(4) = 14 and f⁻¹(14) = 4', 0]], C.maroon, C.soft);
  col(MX + cw + gap, 'Composite:  fg(x) means f(g(x))', [['f(x) = 3x + 2,   g(x) = x²', 0], ['fg(2): do g first: g(2) = 4', 0], ['then f(4) = 14', 1], ['gf(2): f(2) = 8, then g(8) = 64', 0], ['Order matters: fg(2) ≠ gf(2)', 1]], C.orange, C.orangeSoft);
  notes(s, 'Higher only. For fg(x), the function nearest x is done first. The inverse uses the A5 rearranging method.');
}

D.hinge({
  title: 'Quick check',
  q: 'f(x) = 2x − 5.  What is f(3)?',
  options: ['1', '−1', '11', '6'],
  correct: 0,
  notes: 'Answer A: 2 × 3 − 5 = 1. B: subtracted the wrong way. C: added 5. D: forgot the −5.',
});

// ---------------- Part 2: coordinates ----------------
{
  const s = frame('Part 2: coordinates in four quadrants', { tag: 'A8 coordinates' });
  const G = graph(s, MX + 0.2, 1.4, 5.6, 5.4, [-5, 5], [-5, 5]);
  G.pt(3, 2, C.maroon, 'A(3, 2)');
  G.pt(-4, 3, C.orange, 'B(−4, 3)');
  G.pt(-2, -4, C.green, 'C(−2, −4)');
  G.pt(4, -3, C.blue, 'D(4, −3)');
  const bx = 6.8, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 2.2, C.greyLight);
  txt(s, '(x, y)', bx + 0.3, 1.5, bw - 0.6, 0.6, { size: 28, bold: true, color: C.maroon });
  txt(s, '**x first**: across (left is negative).  **Then y**: up or down (down is negative).', bx + 0.3, 2.15, bw - 0.6, 1.3, { size: 20 });
  rect(s, bx, 3.85, bw, 2.95, C.soft, C.line);
  txt(s, 'Midpoint', bx + 0.3, 3.95, bw - 0.6, 0.5, { size: 22, bold: true, color: C.maroon });
  txt(s, 'Add the x\'s and halve; add the y\'s and halve.', bx + 0.3, 4.5, bw - 0.6, 0.6, { size: 19 });
  txt(s, 'Midpoint of (−2, 3) and (4, −5):', bx + 0.3, 5.15, bw - 0.6, 0.5, { size: 19 });
  txt(s, '((−2 + 4) ÷ 2, (3 + −5) ÷ 2) = **(1, −1)**', bx + 0.3, 5.7, bw - 0.6, 0.6, { size: 21 });
  notes(s, 'Ask students to read the coordinates of A to D aloud. Common mistake: reading y first. The midpoint is the mean of the coordinates.');
}

// ---------------- Part 3: plotting ----------------
{
  const s = frame('Part 3: plotting a straight line', { tag: 'A9 graphs' });
  txt(s, 'Draw  **y = 2x + 1**  for x from −2 to 2.', MX, 1.35, 6.5, 0.55, { size: 24 });
  const xs = [-2, -1, 0, 1, 2], cw = 1.0;
  ['x', 'y'].forEach((h, i) => {
    rect(s, MX, 2.1 + i * 0.75, 0.9, 0.75, C.maroon, C.line);
    txt(s, h, MX, 2.1 + i * 0.75, 0.9, 0.75, { size: 22, bold: true, color: C.white, align: 'center', valign: 'middle' });
    xs.forEach((x, j) => {
      const v = i ? line(x) : x;
      rect(s, MX + 0.9 + j * cw, 2.1 + i * 0.75, cw, 0.75, i ? C.greenSoft : C.white, C.line);
      txt(s, String(v).replace('-', '−'), MX + 0.9 + j * cw, 2.1 + i * 0.75, cw, 0.75, { size: 22, bold: i === 1, color: i ? C.green : C.ink, align: 'center', valign: 'middle' });
    });
  });
  txt(s, '1.  Substitute each x:  2 × (−2) + 1 = −3', MX, 3.85, 6.3, 0.5, { size: 19 });
  txt(s, '2.  Plot the points (−2, −3), (−1, −1)…', MX, 4.45, 6.3, 0.5, { size: 19 });
  txt(s, '3.  Join with a **ruler**, right to the edges.', MX, 5.05, 6.3, 0.5, { size: 19 });
  rect(s, MX, 5.75, 6.2, 1.05, C.orangeSoft, 'F3D9B5');
  txt(s, 'If one point is not in line with the others, check that substitution again.', MX + 0.3, 5.75, 5.6, 1.05, { size: 18, valign: 'middle' });
  const G = graph(s, 7.0, 1.4, W - MX - 7.0, 5.4, [-3, 3], [-5, 7]);
  G.line(2, 1, C.maroon, 3);
  xs.forEach(x => G.pt(x, line(x), C.maroon));
  txt(s, 'y = 2x + 1', G.px(1.6) - 1.7, G.py(5.5) - 0.2, 1.6, 0.4, { size: 17, bold: true, color: C.maroon, align: 'right' });
  notes(s, 'Values: −3, −1, 1, 3, 5. Plot with small crosses and join with a ruler.');
}

{
  const s = frame('Special straight lines', { tag: 'A9 graphs' });
  const G = graph(s, MX + 0.2, 1.4, 5.6, 5.4, [-5, 5], [-5, 5]);
  G.seg(-5, 3, 5, 3, C.maroon, 3);
  G.seg(-2, -5, -2, 5, C.orange, 3);
  G.line(1, 0, C.green, 3);
  G.line(-1, 0, C.blue, 3);
  const items = [['y = 3', 'horizontal: every point has y = 3', C.maroon], ['x = −2', 'vertical: every point has x = −2', C.orange], ['y = x', 'goes up 1 for every 1 across', C.green], ['y = −x', 'goes down 1 for every 1 across', C.blue]];
  const bx = 6.8, bw = W - MX - bx;
  items.forEach(([a, b, col], i) => {
    const y = 1.4 + i * 1.35;
    rect(s, bx, y, bw, 1.2, C.white, col, { lw: 2 });
    txt(s, a, bx + 0.3, y + 0.05, bw - 0.6, 0.55, { size: 26, bold: true, color: col });
    txt(s, b, bx + 0.3, y + 0.62, bw - 0.6, 0.5, { size: 18 });
  });
  notes(s, 'Common mistake: thinking y = 3 is vertical. Ask: what do the points (−1, 3), (0, 3), (4, 3) have in common?');
}

D.hinge({
  title: 'Quick check',
  q: 'Which line is horizontal?',
  options: ['x = 4', 'y = 4', 'y = 4x', 'y = x + 4'],
  correct: 1,
  notes: 'Answer B. A is vertical. C and D slope.',
});

// ---------------- Part 4: gradient and y = mx + c ----------------
{
  const s = frame('Part 4: gradient', { tag: 'A10 gradient' });
  const G = graph(s, MX + 0.2, 1.4, 5.8, 5.4, [-1, 4], [-2, 7]);
  G.line(2, 1, C.maroon, 3);
  G.seg(0, 1, 2, 1, C.orange, 2.5); G.seg(2, 1, 2, 5, C.orange, 2.5);
  txt(s, 'across 2', G.px(0.5), G.py(1) + 0.05, 1.4, 0.35, { size: 15, bold: true, color: C.orange });
  txt(s, 'up 4', G.px(2) + 0.1, G.py(3) - 0.15, 1.0, 0.35, { size: 15, bold: true, color: C.orange });
  G.pt(0, 1); G.pt(2, 5);
  const bx = 7.0, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 1.6, C.soft, C.line);
  math(s, bx + 0.3, 2.2, ['gradient = ', { n: 'change in y', d: 'change in x' }], { size: 24, bold: true, color: C.maroon });
  txt(s, 'Here:  4 ÷ 2 = **2**', bx + 0.3, 3.25, bw - 0.6, 0.6, { size: 24 });
  rect(s, bx, 4.1, bw, 2.7, C.greyLight);
  txt(s, '**Positive** gradient: line goes **up** left to right.', bx + 0.3, 4.25, bw - 0.6, 0.8, { size: 19 });
  txt(s, '**Negative** gradient: line goes **down**.', bx + 0.3, 5.05, bw - 0.6, 0.8, { size: 19 });
  txt(s, 'Bigger number = **steeper** line.', bx + 0.3, 5.85, bw - 0.6, 0.8, { size: 19 });
  notes(s, 'Draw a right-angled triangle under the line between two points on the line. Read the change in y and change in x from the axes, not by counting squares if the scales differ.');
}

{
  const s = frame('y = mx + c', { tag: 'A10 gradient' });
  rect(s, MX, 1.4, W - 2 * MX, 1.25, C.soft, C.line);
  s.addText([{ text: 'y = ', options: { color: C.ink } }, { text: 'm', options: { color: C.maroon } }, { text: 'x + ', options: { color: C.ink } }, { text: 'c', options: { color: C.orange } }], { x: MX + 0.3, y: 1.4, w: 4, h: 1.25, fontFace: 'Arial', fontSize: 40, bold: true, valign: 'middle', margin: 0 });
  txt(s, '**m** = gradient      **c** = y-intercept, at (0, c)', MX + 4.3, 1.4, W - 2 * MX - 4.5, 1.25, { size: 21, valign: 'middle' });
  const rows = [['y = 3x + 4', '3', '4'], ['y = 5 − 3x', '−3', '5'], ['y = x − 2', '1', '−2'], ['2y = 4x + 6  →  y = 2x + 3', '2', '3']];
  const cw = [6.2, 2.6, W - 2 * MX - 8.8];
  ['Equation', 'Gradient m', 'y-intercept c'].forEach((h, j) => {
    rect(s, MX + cw.slice(0, j).reduce((a, b) => a + b, 0), 2.95, cw[j], 0.6, C.maroon);
    txt(s, h, MX + cw.slice(0, j).reduce((a, b) => a + b, 0) + 0.25, 2.95, cw[j] - 0.3, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  });
  rows.forEach((r, i) => {
    const y = 3.55 + i * 0.8;
    let x = MX;
    r.forEach((c, j) => { rect(s, x, y, cw[j], 0.8, i % 2 ? C.white : C.soft, C.line); txt(s, c, x + 0.25, y, cw[j] - 0.3, 0.8, { size: 23, bold: j > 0, color: j === 1 ? C.maroon : j === 2 ? C.orange : C.ink, valign: 'middle' }); x += cw[j]; });
  });
  notes(s, 'y = 5 − 3x: the gradient is the number with x, including its sign. For 2y = 4x + 6, divide everything by 2 first: y must be on its own.');
}

D.hinge({
  title: 'Quick check',
  q: 'What is the gradient of  y = 7 − 2x ?',
  options: ['7', '2', '−2', '5'],
  correct: 2,
  notes: 'Answer C. A is the y-intercept. B ignores the sign. D added 7 and −2.',
});

{
  const s = frame('Parallel lines and finding an equation', { tag: 'A9 equations' });
  const G = graph(s, MX + 0.2, 1.4, 4.6, 5.4, [-3, 3], [-4, 8]);
  G.line(2, 1, C.maroon, 3); G.line(2, -2, C.orange, 3); G.line(2, 4, C.green, 3);
  const bx = 5.6, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 1.4, C.soft, C.line);
  txt(s, '**Parallel** lines have the **same gradient**.', bx + 0.3, 1.5, bw - 0.6, 0.55, { size: 21 });
  txt(s, '**HT**  Perpendicular: gradients multiply to −1, e.g. 2 and −½.', bx + 0.3, 2.1, bw - 0.6, 0.6, { size: 19, color: C.red });
  rect(s, bx, 3.05, bw, 3.75, C.greyLight);
  txt(s, 'Line through (1, 3) and (4, 9)', bx + 0.3, 3.15, bw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  txt(s, '1.  m = (9 − 3) ÷ (4 − 1) = 6 ÷ 3 = 2', bx + 0.3, 3.75, bw - 0.6, 0.5, { size: 20 });
  txt(s, '2.  Put in a point:  3 = 2 × 1 + c,  so c = 1', bx + 0.3, 4.35, bw - 0.6, 0.5, { size: 20 });
  txt(s, '3.  y = 2x + 1', bx + 0.3, 4.95, bw - 0.6, 0.6, { size: 26, bold: true, color: C.green });
  txt(s, 'Check with the other point: 2 × 4 + 1 = 9 ✓', bx + 0.3, 5.75, bw - 0.6, 0.5, { size: 18, color: C.grey });
  notes(s, 'Perpendicular gradients are Higher only. The two-point method: gradient first, then substitute one point to find c, then check with the other.');
}

D.myTurnYourTurn({
  title: 'Gradient, intercept and equations', tag: 'Part 4', stepSize: 22, labelW: 3.0, labelSize: 19, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Find:',
    steps: [
      { label: 'm and c for  y = 4x − 3', text: '**m = 4, c = −3**' },
      { label: 'parallel to y = 4x − 3, through (0, 5)', text: '**y = 4x + 5**' },
      { label: 'the line through (2, 5) and (5, 11)', text: '**y = 2x + 1**' },
    ],
  },
  yours: {
    q: 'Find:',
    steps: [
      { label: 'm and c for  y = 6 − x', text: '**m = −1, c = 6**' },
      { label: 'parallel to y = 3x + 1, through (0, −2)', text: '**y = 3x − 2**' },
      { label: 'the line through (1, 7) and (3, 1)', text: '**y = −3x + 10**' },
    ],
  },
  notes: 'Working, mine: (2, 5) to (5, 11): m = 6 ÷ 3 = 2; 5 = 2 × 2 + c, c = 1. Yours: (1, 7) to (3, 1): m = −6 ÷ 2 = −3; 7 = −3 + c, c = 10. Check the line goes down for a negative gradient.',
});

// ---------------- Practice and assessment ----------------
{
  const qs = [
    'f(x) = 4x − 3.  Find f(5).',
    'f(x) = 4x − 3.  Find x when f(x) = 25.',
    'Find the midpoint of (1, −2) and (7, 6).',
    'Write down the equation of the vertical line through (−3, 1).',
    'A line goes through (0, 4) and (2, 10). Find its gradient.',
    'Find the gradient and y-intercept of  3y = 6x − 9.',
    'Find the equation of the line through (2, 3) and (6, 11).',
    'HT  Find the gradient of a line perpendicular to  y = 4x + 1.',
  ];
  const ans = ['17', 'x = 7', '(4, 2)', 'x = −3', '3', 'm = 2, c = −3', 'y = 2x − 1', '−¼'];
  const sets = [['Practice: functions and coordinates', 0, 'Questions 1–4'], ['Practice: straight-line graphs', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl.split(':')[0] + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 28, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 20 − 3 = 17  2) 25 + 3 = 28, ÷ 4 = 7  3) (8 ÷ 2, 4 ÷ 2) = (4, 2)  4) x = −3  5) 6 ÷ 2 = 3  6) y = 2x − 3  7) m = 8 ÷ 4 = 2, 3 = 4 + c so c = −1  8) −1 ÷ 4 = −¼.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 8 marks', size: 20, lineGap: 0.38,
  parts: [
    { l: 'a', q: 'Complete the table of values for  y = 3x + 1  at x = −2, 0 and 2.', m: 2, lines: 1 },
    { l: 'b', q: 'Write down the gradient and the y-intercept of  y = 3x + 1.', m: 2, lines: 1 },
    { l: 'c', q: 'Write down the equation of a line parallel to  y = 3x + 1.', m: 1, lines: 1 },
    { l: 'd', q: 'Find the equation of the line through (1, 1) and (5, 13).', m: 3, lines: 2 },
  ],
  total: 8,
  scheme: [
    ['(a)', '−5,  1,  7', 'B2', 'B1 for two correct'],
    ['(b)', 'gradient 3,  y-intercept 1 (or (0, 1))', 'B1 B1', ''],
    ['(c)', 'y = 3x + k  for any k ≠ 1', 'B1', ''],
    ['(d)', 'm = 12 ÷ 4 = 3;  1 = 3 + c, c = −2;  y = 3x − 2', 'M1 M1 A1', 'M1 gradient, M1 substitution'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['f(x) = 5x + 1.  Find f(2).', 'Which quadrant is (−3, −4) in?', 'Is  y = 2  horizontal or vertical?', 'Gradient and y-intercept of  y = −2x + 7?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) 11  2) bottom left (third quadrant)  3) horizontal  4) m = −2, c = 7. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'f(x) = 2x + 7. Find (a) f(3) (b) f(−4) (c) x when f(x) = 1.',
    'Draw  y = 3 − x  for x from −2 to 4 using a table of values.',
    'Find the midpoint of (−3, 4) and (5, 0).',
    'Which of these lines are parallel?  y = 2x + 1,  y = 3x + 2,  y = 2x − 5,  2y = 4x + 3',
    'Find the equation of the line through (1, 1) and (3, 9).',
    'HT  f(x) = x + 3, g(x) = 2x. Find fg(5), gf(5) and f⁻¹(x).',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) 13, −1, −3  2) points (−2, 5), (0, 3), (4, −1)  3) (1, 2)  4) y = 2x + 1, y = 2x − 5 and 2y = 4x + 3 (all gradient 2)  5) m = 4, c = −3: y = 4x − 3  6) fg(5) = f(10) = 13; gf(5) = g(8) = 16; f⁻¹(x) = x − 3.');
}
calc('HW1', 2 * 3 + 7, 13); calc('HW1b', 2 * -4 + 7, -1); calc('HW1c', (1 - 7) / 2, -3);
calc('HW6 fg', 2 * 5 + 3, 13); calc('HW6 gf', 2 * (5 + 3), 16);

D.save(path.join(__dirname, 'AQA_8300_A7-A10_StraightLineGraphs.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
