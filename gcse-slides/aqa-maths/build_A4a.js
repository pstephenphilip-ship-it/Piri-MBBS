// build_A4a.js — AQA GCSE Mathematics 8300, A4 part 1: Collecting like terms (one lesson, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A4a.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A4', title: 'Collecting like terms' };
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;

// simplify checks: evaluate both sides at several points
const pts = [[2, 3], [-1, 5], [0.5, -2]];
const same = (label, f, g) => pts.forEach(([a, b]) => calc(`${label} @${a},${b}`, f(a, b), g(a, b), 1e-9));

// ======================= numbers (all checked) =======================
calc('DN1', -3 + 7, 4); calc('DN2', 5 - 9, -4); calc('DN3', -2 - 6, -8);
same('tiles 2x+3+3x+1', x => 2 * x + 3 + 3 * x + 1, x => 5 * x + 4);
same('method 5a+3b-2a+b', (a, b) => 5 * a + 3 * b - 2 * a + b, (a, b) => 3 * a + 4 * b);
same('neg 4x-7-6x+2', x => 4 * x - 7 - 6 * x + 2, x => -2 * x - 5);
same('powers 3x2+2x-x2+5x', x => 3 * x * x + 2 * x - x * x + 5 * x, x => 2 * x * x + 7 * x);
same('hinge 6p-2q-p+5q', (p, q) => 6 * p - 2 * q - p + 5 * q, (p, q) => 5 * p + 3 * q);
same('MT1 7m+2n-3m+4n', (m, n) => 7 * m + 2 * n - 3 * m + 4 * n, (m, n) => 4 * m + 6 * n);
same('YT1 9c-4d+c-d', (c, d) => 9 * c - 4 * d + c - d, (c, d) => 10 * c - 5 * d);
same('MT2 x2+4x+3x2-6x', x => x * x + 4 * x + 3 * x * x - 6 * x, x => 4 * x * x - 2 * x);
same('YT2 5y2-2y-y2+8', y => 5 * y * y - 2 * y - y * y + 8, y => 4 * y * y - 2 * y + 8);
same('MT3 3ab+2a-ab+5', (a, b) => 3 * a * b + 2 * a - a * b + 5, (a, b) => 2 * a * b + 2 * a + 5);
same('YT3 4pq-3p+2qp+7p', (p, q) => 4 * p * q - 3 * p + 2 * q * p + 7 * p, (p, q) => 6 * p * q + 4 * p);
same('triangle perimeter', x => (2 * x + 1) + (x + 4) + (3 * x - 2), x => 6 * x + 3);
calc('triangle at x=5', 6 * 5 + 3, 33);
same('P1', a => 4 * a + 3 * a - a, a => 6 * a);
same('P2', (x, y) => 5 * x + 2 * y + x - 4 * y, (x, y) => 6 * x - 2 * y);
same('P3', m => 3 * m * m + 2 * m + m * m - 5 * m, m => 4 * m * m - 3 * m);
same('P4', (t) => 8 - 3 * t - 10 + t, t => -2 - 2 * t);
same('P5 rectangle', x => 2 * (4 * x + 1) + 2 * (x + 3), x => 10 * x + 8);
same('P8', (a, b) => 2 * a + 3 * b + 4 * a - b, (a, b) => 6 * a + 2 * b);
same('exam a', (y) => 9 * y - 4 * y + 2 * y, y => 7 * y);
same('exam b', (e, f) => 3 * e + 5 * f - e - 8 * f, (e, f) => 2 * e - 3 * f);
same('exam c', x => (x + 5) + (2 * x - 1) + (x + 5) + (2 * x - 1), x => 6 * x + 8);
same('exit 2', (a, b) => 6 * a - b + 2 * a + 4 * b, (a, b) => 8 * a + 3 * b);
same('exit 3', x => 2 * x * x + x - x * x + 4 * x, x => x * x + 5 * x);

// ======================= algebra tile helpers =======================
const TU = 0.42;  // unit tile size
const XL = 1.35;  // length of an x tile
function tile(s, kind, x, y, colour) {
  if (kind === 'x2') { rect(s, x, y, XL, XL, colour.fill, colour.line, { lw: 1.5 }); txt(s, 'x²', x, y, XL, XL, { size: 20, bold: true, color: colour.line, align: 'center', valign: 'middle' }); return XL; }
  if (kind === 'x') { rect(s, x, y, TU, XL, colour.fill, colour.line, { lw: 1.5 }); txt(s, 'x', x, y, TU, XL, { size: 18, bold: true, color: colour.line, align: 'center', valign: 'middle' }); return TU; }
  rect(s, x, y + XL - TU, TU, TU, colour.fill, colour.line, { lw: 1.5 }); txt(s, '1', x, y + XL - TU, TU, TU, { size: 14, bold: true, color: colour.line, align: 'center', valign: 'middle' }); return TU;
}
const XC = { fill: 'E9D3DB', line: C.maroon }, UC = { fill: 'FFE7C7', line: C.orange }, X2C = { fill: 'DCEFE3', line: C.green };
function tiles(s, list, x, y, gap = 0.12) {
  let cx = x;
  for (const k of list) cx += tile(s, k, cx, y, k === 'x' ? XC : k === 'x2' ? X2C : UC) + gap;
  return cx - x;
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'A4 lesson 1 of 4: simplifying expressions by collecting like terms',
  bullets: ['What makes terms "like" terms', 'Collecting terms with negatives and powers', 'Using simplifying in perimeter problems'],
  notes: 'AQA 8300 A4: simplify and manipulate algebraic expressions by collecting like terms (and later: multiplying a single term over a bracket, taking out common factors, expanding binomials). This is lesson 1 of 4 for A4. Both tiers. About 60 minutes.',
});

D.objectives({
  tag: 'A4 • lesson 1',
  items: [
    'Decide whether terms are **like terms**.',
    '**Simplify** expressions by collecting like terms, including **negatives**.',
    'Collect like terms that include **powers** such as x².',
  ],
  keywords: ['like terms', 'unlike terms', 'simplify', 'coefficient', 'term'],
  notes: 'Share the objectives. Return to them at the exit ticket.',
});

D.doNow({
  qs: ['Work out  −3 + 7', 'Work out  5 − 9', 'Work out  −2 − 6', 'Write  a + a + a  more simply.'],
  answers: ['4', '−4', '−8', '3a'],
  notes: 'Directed number is the hardest part of collecting like terms. If many students miss Q2 or Q3, spend two minutes on a number line before moving on.',
});

D.vocab({
  title: 'Key words', tag: 'A4',
  items: [
    { term: 'Like terms', def: 'Terms with **exactly the same letters and powers**, e.g. **3x** and **−5x**, or **2a²** and **a²**.' },
    { term: 'Unlike terms', def: 'Terms with different letters or powers, e.g. **3x** and **3y**, or **x²** and **x**. They cannot be combined.' },
    { term: 'Simplify', def: 'Write an expression with **fewer terms** by collecting like terms.' },
    { term: 'Coefficient', def: 'The number in front of the letters. When collecting, you **add the coefficients**.' },
  ],
  notes: 'Key idea: you can only add or subtract terms that are the same "kind" of thing, just as 3 apples + 2 apples = 5 apples, but 3 apples + 2 pears stays as it is.',
});

// Algebra tiles
{
  const s = frame('Seeing like terms with tiles', { tag: 'A4' });
  txt(s, 'Simplify  **2x + 3 + 3x + 1**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  // row 1: as written
  txt(s, 'As written:', MX, 2.15, 2.3, 0.5, { size: 20, bold: true, color: C.grey });
  let cx = MX + 2.4;
  cx += tiles(s, ['x', 'x'], cx, 2.15) + 0.3;
  cx += tiles(s, ['1', '1', '1'], cx, 2.15) + 0.3;
  cx += tiles(s, ['x', 'x', 'x'], cx, 2.15) + 0.3;
  tiles(s, ['1'], cx, 2.15);
  // row 2: grouped
  txt(s, 'Grouped:', MX, 4.05, 2.3, 0.5, { size: 20, bold: true, color: C.grey });
  cx = MX + 2.4;
  cx += tiles(s, ['x', 'x', 'x', 'x', 'x'], cx, 4.05) + 0.5;
  tiles(s, ['1', '1', '1', '1'], cx, 4.05);
  rect(s, 8.7, 4.05, W - MX - 8.7, XL, C.greenSoft, C.green, { lw: 2 });
  txt(s, '= 5x + 4', 8.7, 4.05, W - MX - 8.7, XL, { size: 40, bold: true, color: C.green, align: 'center', valign: 'middle' });
  // key
  const ky = 5.8;
  rect(s, MX, ky, W - 2 * MX, 1.0, C.greyLight);
  rect(s, MX + 0.3, ky + 0.15, 0.22, 0.7, XC.fill, XC.line, { lw: 1.5 });
  txt(s, '= x', MX + 0.65, ky, 1.2, 1.0, { size: 20, valign: 'middle' });
  rect(s, MX + 1.9, ky + 0.39, 0.22, 0.22, UC.fill, UC.line, { lw: 1.5 });
  txt(s, '= 1', MX + 2.25, ky, 1.2, 1.0, { size: 20, valign: 'middle' });
  txt(s, 'x tiles and 1 tiles are **different shapes**, so they cannot be joined together.', MX + 3.6, ky, W - 2 * MX - 3.8, 1.0, { size: 20, valign: 'middle' });
  notes(s, '2x + 3x = 5x and 3 + 1 = 4, so 2x + 3 + 3x + 1 = 5x + 4. The tiles show why 5x + 4 cannot be written as 9x: they are different shapes. Physical algebra tiles work well here if you have them. Check: x = 2 gives 4 + 3 + 6 + 1 = 14 and 10 + 4 = 14.');
}

// Like or unlike table
{
  const s = frame('Like or unlike?', { tag: 'A4' });
  const rows = [
    ['3x  and  5x', 'Like', 'same letter, same power'],
    ['3x  and  3y', 'Unlike', 'different letters'],
    ['x²  and  x', 'Unlike', 'different powers'],
    ['ab  and  ba', 'Like', 'ab = ba (same letters multiplied)'],
    ['2x²  and  −x²', 'Like', 'the sign does not matter'],
    ['4  and  −7', 'Like', 'both are numbers (constant terms)'],
  ];
  const cw = [3.6, 1.9, W - 2 * MX - 5.5], rh = 0.78, top = 1.4;
  rows.forEach((r, i) => {
    const yy = top + i * (rh + 0.1), like = r[1] === 'Like';
    rect(s, MX, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    txt(s, r[0], MX + 0.3, yy, cw[0] - 0.3, rh, { size: 28, bold: true, valign: 'middle' });
    txt(s, r[1], MX + cw[0], yy, cw[1], rh, { size: 26, bold: true, color: like ? C.green : C.red, valign: 'middle' });
    txt(s, r[2], MX + cw[0] + cw[1], yy, cw[2] - 0.2, rh, { size: 20, color: C.grey, valign: 'middle' });
  });
  notes(s, 'Reveal the Like/Unlike column one row at a time if you prefer (cover it on the board). The most common errors: thinking x² and x are like terms, and thinking ab and ba are different.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which pair are like terms?',
  options: ['4x  and  4y', 'x²  and  2x', '3ab  and  −ba', '5  and  5x'],
  correct: 2,
  notes: 'Answer C: ab and ba are the same (multiplication can be done in any order) and the sign does not stop terms being like. A: different letters. B: different powers. D: a number and an x term.',
});

// Method with colour coding
{
  const s = frame('How to collect like terms', { tag: 'A4' });
  txt(s, 'Simplify  **5a + 3b − 2a + b**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  const steps = [
    ['1', 'Each term takes the sign in front of it.', [['+5a', C.maroon], ['  +3b', C.orange], ['  −2a', C.maroon], ['  +b', C.orange]]],
    ['2', 'Group the like terms.', [['5a − 2a', C.maroon], ['     +3b + b', C.orange]]],
    ['3', 'Add the coefficients.', [['3a', C.maroon], ['  +  4b', C.orange]]],
  ];
  let y = 2.25;
  steps.forEach(([k, d, segs]) => {
    D.circle(s, MX + 0.35, y + 0.4, 0.62, C.accent);
    txt(s, k, MX + 0.04, y + 0.09, 0.62, 0.62, { size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, d, MX + 0.95, y, 5.2, 0.8, { size: 21, valign: 'middle' });
    rect(s, 6.6, y, W - MX - 6.6, 0.8, C.white, C.line);
    s.addText(segs.map(([t, col]) => ({ text: t, options: { color: col, bold: true } })), { x: 6.85, y, w: W - MX - 7.1, h: 0.8, fontFace: 'Arial', fontSize: 30, valign: 'middle', margin: 0 });
    y += 1.1;
  });
  rect(s, MX, 5.75, W - 2 * MX, 1.05, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'Answer:  **3a + 4b**      (b means 1b)', MX + 0.3, 5.75, W - 2 * MX - 0.6, 1.05, { size: 28, color: C.green, valign: 'middle' });
  notes(s, 'Colour or circle each like term WITH its sign. 5a − 2a = 3a; 3b + b = 4b (b has coefficient 1). Check with a = 2, b = 3: 10 + 9 − 4 + 3 = 18 and 6 + 12 = 18.');
}

// Negatives and powers
{
  const s = frame('Negatives and powers', { tag: 'A4' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 4.3;
  const panel = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, h, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 24, bold: true, color: C.white, valign: 'middle' });
    lines.forEach((l, i) => txt(s, l, x + 0.35, top + 0.95 + i * 0.8, cw - 0.7, 0.7, { size: i === lines.length - 1 ? 30 : 24, bold: i === lines.length - 1, color: i === lines.length - 1 ? colour : C.ink }));
  };
  panel(MX, 'With negatives', ['4x − 7 − 6x + 2', 'x terms: 4x − 6x = −2x', 'numbers: −7 + 2 = −5', '= −2x − 5'], C.maroon, C.soft);
  panel(MX + cw + gap, 'With powers', ['3x² + 2x − x² + 5x', 'x² terms: 3x² − x² = 2x²', 'x terms: 2x + 5x = 7x', '= 2x² + 7x'], C.orange, C.orangeSoft);
  rect(s, MX, 5.95, W - 2 * MX, 0.85, C.greyLight);
  txt(s, '**2x² + 7x** cannot be simplified further. It is **not** 9x³ or 9x².', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.85, { size: 22, valign: 'middle' });
  notes(s, 'Left: 4x − 6x = −2x and −7 + 2 = −5. Right: 3x² − x² = 2x² and 2x + 5x = 7x. The mistake 2x² + 7x = 9x³ comes from adding the coefficients AND the powers: x² and x are unlike terms.');
}

D.hinge({
  title: 'Quick check',
  q: 'Simplify  6p − 2q − p + 5q',
  options: ['5p + 3q', '7p + 3q', '5p − 7q', '8pq'],
  correct: 0,
  notes: 'Answer A: 6p − p = 5p, −2q + 5q = 3q. B: added p instead of subtracting. C: −2q − 5q (took the sign wrongly). D: combined unlike terms.',
});

D.myTurnYourTurn({
  title: 'Collecting like terms', tag: 'A4', stepSize: 24, labelW: 2.1, labelSize: 18,
  mine: {
    q: 'Simplify  **7m + 2n − 3m + 4n**',
    steps: [
      { label: 'm terms', text: '7m − 3m = 4m' },
      { label: 'n terms', text: '2n + 4n = 6n' },
      { label: 'Answer', text: '**4m + 6n**' },
    ],
  },
  yours: {
    q: 'Simplify  **9c − 4d + c − d**',
    steps: [
      { label: 'c terms', text: '9c + c = 10c' },
      { label: 'd terms', text: '−4d − d = −5d' },
      { label: 'Answer', text: '**10c − 5d**' },
    ],
  },
  notes: '4m + 6n. Your turn: 10c − 5d. Watch for 9c + c written as 9c (forgetting c = 1c) and −4d − d written as −3d.',
});

D.myTurnYourTurn({
  title: 'Powers and two-letter terms', tag: 'A4', stepSize: 24, labelW: 2.1, labelSize: 18,
  mine: {
    q: 'Simplify  **x² + 4x + 3x² − 6x**   and   **3ab + 2a − ab + 5**',
    steps: [
      { label: 'x² terms', text: 'x² + 3x² = 4x²' },
      { label: 'x terms', text: '4x − 6x = −2x' },
      { label: 'Answer', text: '**4x² − 2x**' },
      { label: 'Answer', text: '**2ab + 2a + 5**' },
    ],
  },
  yours: {
    q: 'Simplify  **5y² − 2y − y² + 8**   and   **4pq − 3p + 2qp + 7p**',
    steps: [
      { label: 'y² terms', text: '5y² − y² = 4y²' },
      { label: 'Answer', text: '**4y² − 2y + 8**' },
      { label: 'pq terms', text: '4pq + 2qp = 6pq' },
      { label: 'Answer', text: '**6pq + 4p**' },
    ],
  },
  notes: 'Second part of my turn: 3ab − ab = 2ab; 2a and 5 stay. Your turn: 4y² − 2y + 8; and qp = pq so 4pq + 2qp = 6pq, −3p + 7p = 4p.',
});

// Perimeter context
{
  const s = frame('Simplifying a perimeter', { tag: 'A4' });
  // triangle drawn with lines
  const A = [MX + 0.8, 5.9], B = [MX + 6.2, 5.9], Cc = [MX + 2.6, 2.0];
  const seg = (p, q) => s.addShape(D.SH.line, { x: Math.min(p[0], q[0]), y: Math.min(p[1], q[1]), w: Math.abs(q[0] - p[0]), h: Math.abs(q[1] - p[1]), flipH: (q[0] - p[0]) * (q[1] - p[1]) < 0, line: { color: C.maroon, width: 3 } });
  seg(A, B); seg(B, Cc); seg(Cc, A);
  txt(s, '3x − 2', A[0], 5.95, B[0] - A[0], 0.5, { size: 24, bold: true, align: 'center' });
  txt(s, '2x + 1', MX - 0.6, 3.6, 1.9, 0.5, { size: 24, bold: true, align: 'right' });
  txt(s, 'x + 4', MX + 5.0, 3.6, 2.0, 0.5, { size: 24, bold: true });
  const bx = 7.6, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.4, C.greyLight);
  txt(s, 'Write an expression for the perimeter. Simplify it.', bx + 0.3, 1.55, bw - 0.6, 0.9, { size: 20, bold: true, color: C.maroon });
  txt(s, 'Add the three sides:', bx + 0.3, 2.55, bw - 0.6, 0.5, { size: 20 });
  txt(s, '(2x + 1) + (x + 4) + (3x − 2)', bx + 0.3, 3.1, bw - 0.6, 0.5, { size: 21 });
  txt(s, 'x terms: 2x + x + 3x = 6x', bx + 0.3, 3.8, bw - 0.6, 0.5, { size: 20 });
  txt(s, 'numbers: 1 + 4 − 2 = 3', bx + 0.3, 4.35, bw - 0.6, 0.5, { size: 20 });
  txt(s, 'Perimeter = 6x + 3', bx + 0.3, 5.05, bw - 0.6, 0.6, { size: 28, bold: true, color: C.green });
  txt(s, 'Check: x = 5 gives 11 + 9 + 13 = 33, and 6 × 5 + 3 = 33', bx + 0.3, 5.8, bw - 0.6, 0.9, { size: 16, color: C.grey });
  notes(s, 'Perimeter = 6x + 3. Checking by substituting a value is a great habit: with x = 5 the sides are 11, 9 and 13, total 33 = 6 × 5 + 3.');
}

// Spot the mistake
{
  const wrong = ['4a + 3b = 7ab', '5x − x = 5', '2y² + 3y = 5y³', '8p − 3 − 2p = 6p − 3   … wait: 8p − 2p = 6p, so is it right?'];
  const qs = ['Ali:  4a + 3b = 7ab', 'Bea:  5x − x = 5', 'Cal:  2y² + 3y = 5y³', 'Dee:  8p − 3 − 2p = 6p − 3'];
  const ans = ['Wrong: unlike terms. 4a + 3b stays as it is.', 'Wrong: x = 1x, so 5x − x = 4x.', 'Wrong: unlike terms. 2y² + 3y stays as it is.', 'Correct! 8p − 2p = 6p and −3 stays.'];
  void wrong;
  for (const reveal of [false, true]) {
    const s = frame(reveal ? 'Spot the mistake: answers' : 'Spot the mistake', { tag: 'Who is right? Explain.' });
    if (reveal) D.qCards(s, ans, { cols: 2, size: 24, color: C.green, bold: true });
    else D.qCards(s, qs, { cols: 2, size: 28 });
    notes(s, 'Ali and Cal have combined unlike terms. Bea forgot that x means 1x. Dee is right: a useful reminder that some answers in "spot the mistake" tasks are correct.');
  }
}

// Practice
{
  const qs = [
    'Simplify  4a + 3a − a',
    'Simplify  5x + 2y + x − 4y',
    'Simplify  3m² + 2m + m² − 5m',
    'Simplify  8 − 3t − 10 + t',
    'A rectangle has length 4x + 1 and width x + 3. Find and simplify its perimeter.',
    'Write three different expressions that simplify to  3x + 2y.',
    'Is  5n − 2 + 3n − 6  the same as  8(n − 1)?  Explain.',
    'The total of two terms is 6a + 2b. One of them is 4a − b. Find the other.',
  ];
  const ans = ['6a', '6x − 2y', '4m² − 3m', '−2 − 2t', '10x + 8', 'e.g. x + 2y + 2x', 'Yes: both equal 8n − 8', '2a + 3b'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 26, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 6a  2) 6x − 2y  3) 4m² − 3m  4) −2 − 2t (or −2t − 2)  5) 2(4x + 1) + 2(x + 3) or 4x + 1 + x + 3 + 4x + 1 + x + 3 = 10x + 8  6) any, e.g. x + 2y + 2x, 5x + 2y − 2x  7) yes: 5n + 3n = 8n, −2 − 6 = −8, and 8(n − 1) = 8n − 8 (preview of next lesson)  8) (6a + 2b) − (4a − b) = 2a + 3b.');
  }
}
calc('P7 5n-2+3n-6 vs 8(n-1) at n=4', 5 * 4 - 2 + 3 * 4 - 6, 8 * (4 - 1));
same('P8 other term', (a, b) => (6 * a + 2 * b) - (4 * a - b), (a, b) => 2 * a + 3 * b);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 5 marks', size: 21, lineGap: 0.45,
  parts: [
    { l: 'a', q: 'Simplify  9y − 4y + 2y', m: 1, lines: 1 },
    { l: 'b', q: 'Simplify  3e + 5f − e − 8f', m: 2, lines: 1 },
    { l: 'c', q: 'A rectangle has sides of length  x + 5  and  2x − 1. Show that its perimeter is  6x + 8.', m: 2, lines: 2 },
  ],
  total: 5,
  scheme: [
    ['(a)', '7y', 'B1', ''],
    ['(b)', '2e − 3f', 'B2', 'B1 for 2e or −3f'],
    ['(c)', 'x + 5 + 2x − 1 + x + 5 + 2x − 1 (or 2(x + 5) + 2(2x − 1))', 'M1', 'Adding all four sides'],
    ['', '= 6x + 8', 'A1', 'Must show the collecting'],
  ],
  notes: 'Mark scheme on the next slide. In "show that" questions, every step must be written: writing only 6x + 8 earns no marks.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Are  5xy  and  2yx  like terms?', 'Simplify  6a − b + 2a + 4b', 'Simplify  2x² + x − x² + 4x', 'Explain why  3x + 4  cannot be simplified.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) yes (xy = yx)  2) 8a + 3b  3) x² + 5x  4) 3x and 4 are unlike terms. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 20 minutes' });
  D.qCards(s, [
    'Simplify: (a) 7k + 2k − 5k  (b) 3p + 4q − p + q  (c) 2 − 5w + 9 + 2w',
    'Simplify: (a) 4x² − x + 2x² + 3x  (b) 5ab + 3a − 2ba',
    'A triangle has sides 3y, 2y + 5 and y − 1. Find and simplify the perimeter.',
    'Fill the gap:  5m + … − 2m = 3m + 4',
    'Sam says  6x − 6 = x. Explain his mistake.',
    'The perimeter of a square is 12x + 8. Find an expression for one side.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 4k; 2p + 5q; 11 − 3w  2) 6x² + 2x; 3ab + 3a  3) 6y + 4  4) 4  5) 6x and 6 are unlike terms, so 6x − 6 cannot be simplified  6) 3x + 2.');
}
same('HW1c', w => 2 - 5 * w + 9 + 2 * w, w => 11 - 3 * w);
same('HW2b', (a, b) => 5 * a * b + 3 * a - 2 * b * a, (a, b) => 3 * a * b + 3 * a);
same('HW3', y => 3 * y + 2 * y + 5 + y - 1, y => 6 * y + 4);
same('HW6', x => 4 * (3 * x + 2), x => 12 * x + 8);

D.save(path.join(__dirname, 'AQA_8300_A4a_CollectingLikeTerms.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
