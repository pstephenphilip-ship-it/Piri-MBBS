// build_A4.js — AQA GCSE Mathematics 8300, A4 Simplifying expressions (one combined deck, both tiers)
// Collecting like terms, expanding single brackets, factorising, expanding double brackets.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A4.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A4', title: 'Simplifying expressions' };
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;

const pts = [[2, 3], [-1, 5], [0.5, -2], [7, -3]];
const same = (label, f, g) => pts.forEach(([a, b]) => calc(`${label} @${a},${b}`, f(a, b), g(a, b), 1e-9));
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= numbers (all checked) =======================
calc('DN1', -3 + 7, 4); calc('DN2', -2 - 6, -8); calc('DN3', -3 * -2, 6);
calc('DN4 HCF 12,18', 6, 6);
same('tiles', x => 2 * x + 3 + 3 * x + 1, x => 5 * x + 4);
same('collect', (a, b) => 5 * a + 3 * b - 2 * a + b, (a, b) => 3 * a + 4 * b);
same('powers', x => 3 * x * x + 2 * x - x * x + 5 * x, x => 2 * x * x + 7 * x);
same('hinge1', (p, q) => 6 * p - 2 * q - p + 5 * q, (p, q) => 5 * p + 3 * q);
same('MT1a', (m, n) => 7 * m + 2 * n - 3 * m + 4 * n, (m, n) => 4 * m + 6 * n);
same('MT1b', x => x * x + 4 * x + 3 * x * x - 6 * x, x => 4 * x * x - 2 * x);
same('YT1a', (c, d) => 9 * c - 4 * d + c - d, (c, d) => 10 * c - 5 * d);
same('YT1b', y => 5 * y * y - 2 * y - y * y + 8, y => 4 * y * y - 2 * y + 8);
same('grid1', x => 3 * (x + 4), x => 3 * x + 12);
same('neg', x => -2 * (x - 3), x => -2 * x + 6);
same('letter', x => x * (x + 7), x => x * x + 7 * x);
same('letter2', (a, b) => 2 * a * (3 * a - b), (a, b) => 6 * a * a - 2 * a * b);
same('hinge2', y => -3 * (2 * y - 4), y => -6 * y + 12);
same('E&S', a => 4 * (2 * a + 1) - 3 * (a - 2), a => 5 * a + 10);
same('MT2a', x => 6 * (2 * x - 1), x => 12 * x - 6);
same('MT2b', x => -4 * (x - 2), x => -4 * x + 8);
same('MT2c', x => 2 * (3 * x + 4) - 3 * (x - 1), x => 3 * x + 11);
same('YT2a', y => 7 * (3 * y - 2), y => 21 * y - 14);
same('YT2b', p => p * (2 * p + 7), p => 2 * p * p + 7 * p);
same('YT2c', y => 5 * (y + 2) - 2 * (2 * y - 3), y => y + 16);
same('fact1', x => 6 * x + 15, x => 3 * (2 * x + 5));
same('fact fully', x => 8 * x + 12, x => 4 * (2 * x + 3));
same('fact letters1', x => x * x + 7 * x, x => x * (x + 7));
same('fact letters2', a => 6 * a * a - 9 * a, a => 3 * a * (2 * a - 3));
same('hinge3', y => 12 * y * y + 8 * y, y => 4 * y * (3 * y + 2));
same('MT3a', x => 5 * x + 20, x => 5 * (x + 4));
same('MT3b', y => 14 * y - 21, y => 7 * (2 * y - 3));
same('MT3c', p => 8 * p * p + 12 * p, p => 4 * p * (2 * p + 3));
same('YT3a', a => 6 * a + 18, a => 6 * (a + 3));
same('YT3b', k => 20 * k - 12, k => 4 * (5 * k - 3));
same('YT3c', t => 15 * t * t - 10 * t, t => 5 * t * (3 * t - 2));
same('dbl1', x => (x + 3) * (x + 5), x => x * x + 8 * x + 15);
same('dbl neg', x => (x + 4) * (x - 2), x => x * x + 2 * x - 8);
same('square', x => (x - 3) ** 2, x => x * x - 6 * x + 9);
same('coef', x => (2 * x + 1) * (3 * x - 4), x => 6 * x * x - 5 * x - 4);
same('three', x => (x + 1) * (x + 2) * (x + 3), x => x ** 3 + 6 * x * x + 11 * x + 6);
same('three step', x => (x + 1) * (x + 2), x => x * x + 3 * x + 2);
same('MT4a', x => (x + 2) * (x + 6), x => x * x + 8 * x + 12);
same('MT4b', x => (x - 5) * (x + 1), x => x * x - 4 * x - 5);
same('MT4c', x => (x + 4) ** 2, x => x * x + 8 * x + 16);
same('YT4a', x => (x + 3) * (x + 7), x => x * x + 10 * x + 21);
same('YT4b', y => (y - 6) * (y + 2), y => y * y - 4 * y - 12);
same('YT4c', a => (a - 5) ** 2, a => a * a - 10 * a + 25);
// practice
same('P1', (x, y) => 5 * x + 2 * y + x - 4 * y, (x, y) => 6 * x - 2 * y);
same('P2', x => 4 * (x + 3) + 2 * (x - 5), x => 6 * x + 2);
same('P3', y => 10 * y * y - 15 * y, y => 5 * y * (2 * y - 3));
same('P4', x => (x + 5) * (x - 3), x => x * x + 2 * x - 15);
same('P5 rect', x => 2 * (4 * x + 1) + 2 * (x + 3), x => 10 * x + 8);
same('P6 wrong', x => (x + 3) ** 2 - (x * x + 9), x => 6 * x);
same('P7', n => 4 * n + 6, n => 2 * (2 * n + 3));
same('P8 HT', x => (x + 2) * (x - 1) * (x + 4), x => x ** 3 + 5 * x * x + 2 * x - 8);
// exam
same('exam a', (e, f) => 3 * e + 5 * f - e - 8 * f, (e, f) => 2 * e - 3 * f);
same('exam b', a => 2 * (3 * a + 1) + 4 * (a - 2), a => 10 * a - 6);
same('exam c', (p, q) => 9 * p * p + 6 * p * q, (p, q) => 3 * p * (3 * p + 2 * q));
same('exam d', x => (x + 6) * (x - 4), x => x * x + 2 * x - 24);
same('exam e', x => (2 * x - 3) ** 2, x => 4 * x * x - 12 * x + 9);
// exit, homework
same('exit2', x => -3 * (x + 4), x => -3 * x - 12);
same('exit3', m => 6 * m * m + 9 * m, m => 3 * m * (2 * m + 3));
same('exit4', x => (x + 1) * (x - 7), x => x * x - 6 * x - 7);
same('HW2', m => 5 * (m + 3) + 2 * (m - 4), m => 7 * m + 7);
same('HW3', x => 4 * x * x + 20 * x, x => 4 * x * (x + 5));
same('HW4', x => (x - 2) * (x - 9), x => x * x - 11 * x + 18);
same('HW5', y => (y + 6) ** 2, y => y * y + 12 * y + 36);
same('HW6', x => (3 * x + 2) * (x - 5), x => 3 * x * x - 13 * x - 10);

// ======================= helpers =======================
const TU = 0.42, XL = 1.35;
const XC = { fill: 'E9D3DB', line: C.maroon }, UC = { fill: 'FFE7C7', line: C.orange };
function tiles(s, n1, nx, x, y) {
  let cx = x;
  for (let i = 0; i < nx; i++) { rect(s, cx, y, TU, XL, XC.fill, XC.line, { lw: 1.5 }); txt(s, 'x', cx, y, TU, XL, { size: 18, bold: true, color: XC.line, align: 'center', valign: 'middle' }); cx += TU + 0.12; }
  cx += 0.35;
  for (let i = 0; i < n1; i++) { rect(s, cx, y + XL - TU, TU, TU, UC.fill, UC.line, { lw: 1.5 }); txt(s, '1', cx, y + XL - TU, TU, TU, { size: 14, bold: true, color: UC.line, align: 'center', valign: 'middle' }); cx += TU + 0.12; }
  return cx - x;
}
function grid(s, x, y, rows, cols, cells, o = {}) {
  const cw = o.cw || 1.6, ch = o.ch || 0.85, hw = o.hw || 1.3, pt = o.size || 26;
  rect(s, x, y, hw, ch, C.maroon);
  txt(s, '×', x, y, hw, ch, { size: pt, bold: true, color: C.white, align: 'center', valign: 'middle' });
  cols.forEach((t, j) => { rect(s, x + hw + j * cw, y, cw, ch, C.soft, C.line, { lw: 1.5 }); txt(s, t, x + hw + j * cw, y, cw, ch, { size: pt, bold: true, color: C.maroon, align: 'center', valign: 'middle' }); });
  rows.forEach((t, i) => {
    rect(s, x, y + (i + 1) * ch, hw, ch, C.orangeSoft, 'F3D9B5', { lw: 1.5 });
    txt(s, t, x, y + (i + 1) * ch, hw, ch, { size: pt, bold: true, color: C.orange, align: 'center', valign: 'middle' });
    cols.forEach((_, j) => { rect(s, x + hw + j * cw, y + (i + 1) * ch, cw, ch, C.white, C.line, { lw: 1.5 }); txt(s, cells[i][j], x + hw + j * cw, y + (i + 1) * ch, cw, ch, { size: pt, bold: true, align: 'center', valign: 'middle' }); });
  });
  return { w: hw + cols.length * cw, h: (rows.length + 1) * ch };
}
function steps4(s, title, lines, answer, o = {}) {
  txt(s, title, MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  lines.forEach(([d, m], i) => {
    const y = 2.15 + i * 1.0;
    D.circle(s, MX + 0.35, y + 0.4, 0.6, C.accent);
    txt(s, String(i + 1), MX + 0.05, y + 0.1, 0.6, 0.6, { size: 22, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, d, MX + 0.9, y, 5.4, 0.8, { size: 20, valign: 'middle' });
    rect(s, 6.6, y, W - MX - 6.6, 0.8, C.soft, C.line);
    txt(s, m, 6.9, y, W - MX - 7.2, 0.8, { size: 26, bold: true, color: C.maroon, valign: 'middle' });
  });
  if (answer) {
    const y = 2.15 + lines.length * 1.0 + 0.1;
    rect(s, MX, y, W - 2 * MX, 0.75, C.greenSoft, C.green, { lw: 2 });
    txt(s, answer, MX, y, W - 2 * MX, 0.75, { size: 28, bold: true, color: C.green, align: 'center', valign: 'middle' });
  }
  if (o.warn) {
    rect(s, MX, 6.15, W - 2 * MX, 0.7, C.orangeSoft, 'F3D9B5');
    txt(s, o.warn, MX + 0.3, 6.15, W - 2 * MX - 0.6, 0.7, { size: 19, valign: 'middle' });
  }
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Collecting like terms, expanding brackets and factorising',
  bullets: ['Part 1: collecting like terms', 'Part 2: expanding single brackets', 'Part 3: factorising', 'Part 4: expanding double brackets'],
  notes: 'AQA 8300 A4: simplify and manipulate algebraic expressions by collecting like terms, multiplying a single term over a bracket, taking out common factors, and expanding products of two or more binomials (three or more is Higher). Factorising quadratics, algebraic fractions, surds and index laws are also in A4 but are taught in later lessons alongside A18 and N7/N8. This deck can run over two or three lessons: natural break points are the start of each part.',
});

D.objectives({
  tag: 'A4',
  items: [
    '**Collect like terms**, including negatives and powers.',
    '**Expand** single brackets and **expand and simplify**.',
    '**Factorise fully** by taking out the highest common factor.',
    '**Expand double brackets** such as (x + 3)(x − 5).',
  ],
  keywords: ['like terms', 'simplify', 'expand', 'factorise', 'HCF'],
  notes: 'Share the objectives. Each part ends with a My turn / Your turn so you can check before moving on.',
});

D.doNow({
  qs: ['Work out  −3 + 7', 'Work out  −2 − 6', 'Work out  −3 × −2', 'What is the highest common factor of 12 and 18?'],
  answers: ['4', '−8', '6', '6'],
  notes: 'Negative numbers and HCF are the two prerequisites that cause most errors in this topic.',
});

D.vocab({
  title: 'Key words', tag: 'A4',
  items: [
    { term: 'Like terms', def: 'Same letters **and** same powers, e.g. **3x** and **−5x**. Only like terms can be added.' },
    { term: 'Expand', def: 'Multiply out the brackets: **3(x + 4) = 3x + 12**.' },
    { term: 'Factorise', def: 'The **reverse** of expanding: **3x + 12 = 3(x + 4)**.' },
    { term: 'Factorise fully', def: 'Take out the **highest common factor**, so nothing more comes out.' },
  ],
  notes: 'Exam questions often say "simplify", "expand", "expand and simplify" or "factorise fully": students need to know what each asks for.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: like terms', { tag: 'Collecting like terms' });
  txt(s, 'Simplify  **2x + 3 + 3x + 1**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  txt(s, 'As written:', MX, 2.15, 2.3, 0.5, { size: 20, bold: true, color: C.grey });
  let cx = MX + 2.4;
  cx += tiles(s, 3, 2, cx, 2.15) + 0.3;
  tiles(s, 1, 3, cx, 2.15);
  txt(s, 'Grouped:', MX, 4.0, 2.3, 0.5, { size: 20, bold: true, color: C.grey });
  tiles(s, 4, 5, MX + 2.4, 4.0);
  rect(s, 8.7, 4.0, W - MX - 8.7, XL, C.greenSoft, C.green, { lw: 2 });
  txt(s, '= 5x + 4', 8.7, 4.0, W - MX - 8.7, XL, { size: 40, bold: true, color: C.green, align: 'center', valign: 'middle' });
  rect(s, MX, 5.75, W - 2 * MX, 1.05, C.greyLight);
  txt(s, 'x tiles and 1 tiles are **different shapes**, so they cannot be joined: 5x + 4 is **not** 9x.   Also **x² and x are unlike terms**.', MX + 0.3, 5.75, W - 2 * MX - 0.6, 1.05, { size: 20, valign: 'middle' });
  notes(s, '2x + 3x = 5x, 3 + 1 = 4. Like terms have the same letters and powers: 3x and −5x are like; x² and x are not; ab and ba are (multiplication order does not matter).');
}

{
  const s = frame('Collecting like terms', { tag: 'Part 1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 4.4;
  const panel = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, h, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 24, bold: true, color: C.white, valign: 'middle' });
    lines.forEach((l, i) => txt(s, l, x + 0.35, top + 0.95 + i * 0.8, cw - 0.7, 0.7, { size: i === lines.length - 1 ? 30 : 23, bold: i === lines.length - 1, color: i === lines.length - 1 ? colour : C.ink }));
  };
  panel(MX, '5a + 3b − 2a + b', ['Each term keeps the sign in front', 'a terms: 5a − 2a = 3a', 'b terms: 3b + b = 4b', '= 3a + 4b'], C.maroon, C.soft);
  panel(MX + cw + gap, '3x² + 2x − x² + 5x', ['x² and x are unlike terms', 'x² terms: 3x² − x² = 2x²', 'x terms: 2x + 5x = 7x', '= 2x² + 7x'], C.orange, C.orangeSoft);
  rect(s, MX, 6.05, W - 2 * MX, 0.8, C.greyLight);
  txt(s, '**b** means **1b**.   **2x² + 7x** cannot be simplified further.', MX + 0.3, 6.05, W - 2 * MX - 0.6, 0.8, { size: 21, valign: 'middle' });
  notes(s, 'Circle or colour each term WITH its sign. Check left with a = 2, b = 3: 10 + 9 − 4 + 3 = 18 = 6 + 12.');
}

D.hinge({
  title: 'Quick check',
  q: 'Simplify  6p − 2q − p + 5q',
  options: ['5p + 3q', '7p + 3q', '5p − 7q', '8pq'],
  correct: 0,
  notes: 'Answer A. B: added p. C: sign error on q. D: combined unlike terms.',
});

D.myTurnYourTurn({
  title: 'Collecting like terms', tag: 'Part 1', stepSize: 26, labelW: 3.2, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Simplify:',
    steps: [
      { label: '7m + 2n − 3m + 4n', text: '**4m + 6n**' },
      { label: 'x² + 4x + 3x² − 6x', text: '**4x² − 2x**' },
    ],
  },
  yours: {
    q: 'Simplify:',
    steps: [
      { label: '9c − 4d + c − d', text: '**10c − 5d**' },
      { label: '5y² − 2y − y² + 8', text: '**4y² − 2y + 8**' },
    ],
  },
  notes: 'Your turn: 9c + c = 10c, −4d − d = −5d; 5y² − y² = 4y², −2y and 8 stay.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: expanding a bracket', { tag: 'Expanding' });
  txt(s, 'Expand  **3(x + 4)**: the 3 multiplies **every** term inside.', MX, 1.35, W - 2 * MX, 0.55, { size: 24 });
  const ox = MX + 0.8, oy = 2.6, hgt = 1.8, wx = 3.2, w4 = 1.6;
  rect(s, ox, oy, wx, hgt, C.soft, C.maroon, { lw: 2 });
  rect(s, ox + wx, oy, w4, hgt, C.orangeSoft, C.orange, { lw: 2 });
  txt(s, 'x', ox, oy - 0.5, wx, 0.45, { size: 24, bold: true, align: 'center' });
  txt(s, '4', ox + wx, oy - 0.5, w4, 0.45, { size: 24, bold: true, align: 'center' });
  txt(s, '3', ox - 0.55, oy, 0.45, hgt, { size: 24, bold: true, align: 'center', valign: 'middle' });
  txt(s, '3x', ox, oy, wx, hgt, { size: 32, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  txt(s, '12', ox + wx, oy, w4, hgt, { size: 32, bold: true, color: C.orange, align: 'center', valign: 'middle' });
  grid(s, 7.6, 2.45, ['3'], ['x', '+4'], [['3x', '+12']]);
  rect(s, MX, 4.85, W - 2 * MX, 0.85, C.greenSoft, C.green, { lw: 2 });
  txt(s, '3(x + 4)  =  3x + 12', MX, 4.85, W - 2 * MX, 0.85, { size: 34, bold: true, color: C.green, align: 'center', valign: 'middle' });
  rect(s, MX, 5.95, W - 2 * MX, 0.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Remember:  3x × 2x = **6x²**  (multiplying),   but   3x + 2x = **5x**  (adding).', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.85, { size: 21, valign: 'middle' });
  notes(s, 'Area model and grid side by side. Multiplying terms: numbers then letters; x × x = x². Check with x = 2: 3 × 6 = 18 = 6 + 12.');
}

{
  const s = frame('Negatives and letters outside', { tag: 'Part 2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  const block = (x, title, g, ans, note) => {
    txt(s, title, x, 1.4, cw, 0.6, { size: 26, bold: true });
    grid(s, x, 2.2, [g[0]], g[1], [g[2]], { cw: (cw - 1.3) / 2, size: 26 });
    rect(s, x, 4.1, cw, 0.9, C.greenSoft, C.green, { lw: 2 });
    txt(s, ans, x, 4.1, cw, 0.9, { size: 30, bold: true, color: C.green, align: 'center', valign: 'middle' });
    txt(s, note, x, 5.15, cw, 0.8, { size: 19, color: C.grey });
  };
  block(MX, 'Expand  −2(x − 3)', ['−2', ['x', '−3'], ['−2x', '+6']], '−2x + 6', '−2 × −3 = +6');
  block(MX + cw + gap, 'Expand  2a(3a − b)', ['2a', ['3a', '−b'], ['6a²', '−2ab']], '6a² − 2ab', '2a × 3a = 6a²');
  rect(s, MX, 6.05, W - 2 * MX, 0.8, C.orangeSoft, 'F3D9B5');
  txt(s, 'Common mistake:  −2(x − 3) = −2x − 6.   Multiply the **sign** as well.', MX + 0.3, 6.05, W - 2 * MX - 0.6, 0.8, { size: 21, valign: 'middle' });
  notes(s, 'Check left with x = 5: −2 × 2 = −4 and −10 + 6 = −4. A minus sign alone in front of a bracket means −1.');
}

{
  const s = frame('Expand and simplify', { tag: 'Part 2' });
  steps4(s, 'Expand and simplify  **4(2a + 1) − 3(a − 2)**', [
    ['Expand the first bracket', '8a + 4'],
    ['Expand the second: −3 multiplies both', '− 3a + 6'],
    ['Collect like terms', '8a − 3a + 4 + 6'],
  ], '= 5a + 10', { warn: 'Common mistake:  − 3a − 6.   −3 × −2 = **+6**.' });
  notes(s, 'Expand every bracket first, then collect. Check with a = 1: 4 × 3 − 3 × (−1) = 15 = 5 + 10.');
}

D.hinge({
  title: 'Quick check',
  q: 'Expand  −3(2y − 4)',
  options: ['−6y − 12', '−6y + 12', '6y − 12', '−6y − 4'],
  correct: 1,
  notes: 'Answer B. A: sign error on the second term. C: sign error on the first. D: did not multiply the 4.',
});

D.myTurnYourTurn({
  title: 'Expanding brackets', tag: 'Part 2', stepSize: 26, labelW: 3.6, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Expand (and simplify):',
    steps: [
      { label: '6(2x − 1)', text: '**12x − 6**' },
      { label: '−4(x − 2)', text: '**−4x + 8**' },
      { label: '2(3x + 4) − 3(x − 1)', text: '**3x + 11**' },
    ],
  },
  yours: {
    q: 'Expand (and simplify):',
    steps: [
      { label: '7(3y − 2)', text: '**21y − 14**' },
      { label: 'p(2p + 7)', text: '**2p² + 7p**' },
      { label: '5(y + 2) − 2(2y − 3)', text: '**y + 16**' },
    ],
  },
  notes: 'Mine, third: 6x + 8 − 3x + 3 = 3x + 11. Yours, third: 5y + 10 − 4y + 6 = y + 16.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: factorising', { tag: 'Factorising' });
  steps4(s, 'Factorise  **6x + 15**   (factorising is expanding in reverse)', [
    ['Find the HCF of the terms', 'HCF of 6x and 15 is 3'],
    ['Write it outside a bracket', '3(        )'],
    ['Divide each term by it', '6x ÷ 3 = 2x,   15 ÷ 3 = 5'],
    ['Check by expanding', '3(2x + 5) = 6x + 15  ✓'],
  ], '6x + 15 = 3(2x + 5)');
  notes(s, 'Always check by expanding. Ask: "what was multiplied by the bracket to give 6x + 15?"');
}

{
  const s = frame('Factorise fully', { tag: 'Part 3' });
  const rows = [
    ['8x + 12', '4', '4(2x + 3)', '2(4x + 6) is not full: 4x + 6 still shares 2'],
    ['x² + 7x', 'x', 'x(x + 7)', 'x² = x × x'],
    ['6a² − 9a', '3a', '3a(2a − 3)', 'number HCF 3, letter HCF a'],
  ];
  const hd = ['Expression', 'HCF', 'Fully factorised', 'Why'];
  const cw = [2.7, 1.3, 3.4, W - 2 * MX - 7.4], top = 1.4;
  rect(s, MX, top, W - 2 * MX, 0.6, C.maroon);
  let xx = MX; hd.forEach((h, j) => { txt(s, h, xx + 0.2, top, cw[j] - 0.3, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' }); xx += cw[j]; });
  rows.forEach((r, i) => {
    const yy = top + 0.6 + i * 1.1;
    rect(s, MX, yy, W - 2 * MX, 1.1, i % 2 ? C.white : C.soft, C.line);
    let x = MX;
    r.forEach((c, j) => { txt(s, c, x + 0.2, yy, cw[j] - 0.3, 1.1, { size: j === 3 ? 18 : 26, bold: j === 1 || j === 2, color: j === 2 ? C.green : j === 1 ? C.orange : j === 3 ? C.grey : C.ink, valign: 'middle' }); x += cw[j]; });
  });
  rect(s, MX, 5.55, W - 2 * MX, 1.25, C.orangeSoft, 'F3D9B5');
  txt(s, 'Check the bracket: if the terms inside **still share a factor**, it is not fully factorised. AQA gives only partial marks.', MX + 0.3, 5.55, W - 2 * MX - 0.6, 1.25, { size: 21, valign: 'middle' });
  notes(s, 'Find the number HCF and the letter HCF separately, then combine them.');
}

D.hinge({
  title: 'Quick check',
  q: 'Factorise fully  12y² + 8y',
  options: ['4(3y² + 2y)', 'y(12y + 8)', '4y(3y + 2)', '2y(6y + 4)'],
  correct: 2,
  notes: 'Answer C: HCF is 4y. A, B and D are correct but not FULL factorisations.',
});

D.myTurnYourTurn({
  title: 'Factorising', tag: 'Part 3', stepSize: 26, labelW: 3.0, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Factorise fully:',
    steps: [
      { label: '5x + 20', text: '**5(x + 4)**' },
      { label: '14y − 21', text: '**7(2y − 3)**' },
      { label: '8p² + 12p', text: '**4p(2p + 3)**' },
    ],
  },
  yours: {
    q: 'Factorise fully:',
    steps: [
      { label: '6a + 18', text: '**6(a + 3)**' },
      { label: '20k − 12', text: '**4(5k − 3)**' },
      { label: '15t² − 10t', text: '**5t(3t − 2)**' },
    ],
  },
  notes: 'Say the HCF aloud each time. 6a + 18 = 6(a + 3), not 3(2a + 6).',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: double brackets', { tag: 'Expanding double brackets' });
  txt(s, 'Expand  **(x + 3)(x + 5)**: every term in one bracket multiplies every term in the other.', MX, 1.35, W - 2 * MX, 0.55, { size: 22 });
  grid(s, MX + 0.3, 2.2, ['x', '+3'], ['x', '+5'], [['x²', '+5x'], ['+3x', '+15']], { cw: 1.8, ch: 0.95, size: 28 });
  const bx = 7.3, bw = W - MX - bx;
  rect(s, bx, 2.2, bw, 2.85, C.greyLight);
  txt(s, 'Add the four boxes:', bx + 0.3, 2.35, bw - 0.6, 0.5, { size: 21 });
  txt(s, 'x² + 5x + 3x + 15', bx + 0.3, 2.95, bw - 0.6, 0.6, { size: 26 });
  txt(s, 'Collect the x terms:', bx + 0.3, 3.65, bw - 0.6, 0.5, { size: 21 });
  txt(s, '5x + 3x = 8x', bx + 0.3, 4.2, bw - 0.6, 0.6, { size: 26 });
  rect(s, MX, 5.4, W - 2 * MX, 0.9, C.greenSoft, C.green, { lw: 2 });
  txt(s, '(x + 3)(x + 5)  =  x² + 8x + 15', MX, 5.4, W - 2 * MX, 0.9, { size: 34, bold: true, color: C.green, align: 'center', valign: 'middle' });
  txt(s, 'Shortcut check: the x terms add (3 + 5 = 8), the numbers multiply (3 × 5 = 15).', MX, 6.4, W - 2 * MX, 0.45, { size: 18, color: C.grey, align: 'center' });
  notes(s, 'Grid method for double brackets. Some students prefer FOIL (first, outside, inside, last); the grid is safer with negatives. Check x = 1: 4 × 6 = 24 = 1 + 8 + 15.');
}

{
  const s = frame('Negatives and squared brackets', { tag: 'Part 4' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  const block = (x, title, g, collect, ans) => {
    txt(s, title, x, 1.4, cw, 0.6, { size: 26, bold: true });
    grid(s, x, 2.15, g[0], g[1], g[2], { cw: (cw - 1.3) / 2, ch: 0.8, size: 26 });
    txt(s, collect, x, 4.65, cw, 0.5, { size: 20, color: C.grey });
    rect(s, x, 5.2, cw, 0.85, C.greenSoft, C.green, { lw: 2 });
    txt(s, ans, x, 5.2, cw, 0.85, { size: 28, bold: true, color: C.green, align: 'center', valign: 'middle' });
  };
  block(MX, '(x + 4)(x − 2)', [['x', '+4'], ['x', '−2'], [['x²', '−2x'], ['+4x', '−8']]], '−2x + 4x = 2x', 'x² + 2x − 8');
  block(MX + cw + gap, '(x − 3)²  =  (x − 3)(x − 3)', [['x', '−3'], ['x', '−3'], [['x²', '−3x'], ['−3x', '+9']]], '−3x − 3x = −6x', 'x² − 6x + 9');
  rect(s, MX, 6.2, W - 2 * MX, 0.65, C.orangeSoft, 'F3D9B5');
  txt(s, 'Common mistake:  (x − 3)² = x² + 9.   Write it as **two brackets** first.', MX + 0.3, 6.2, W - 2 * MX - 0.6, 0.65, { size: 20, valign: 'middle' });
  notes(s, '(x − 3)² = x² − 6x + 9. Check x = 5: 2² = 4 and 25 − 30 + 9 = 4. The mistake x² + 9 gives 34.');
}

D.hinge({
  title: 'Quick check',
  q: 'Expand  (x − 3)²',
  options: ['x² + 9', 'x² − 9', 'x² − 6x + 9', 'x² − 6x − 9'],
  correct: 2,
  notes: 'Answer C. A and B: squared each term separately. D: −3 × −3 is +9, not −9.',
});

{
  const s = frame('Harder double brackets', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 5.4, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.7, C.maroon);
  txt(s, '(2x + 1)(3x − 4)', MX + 0.3, top, cw - 0.6, 0.7, { size: 24, bold: true, color: C.white, valign: 'middle' });
  grid(s, MX + 0.3, top + 0.95, ['2x', '+1'], ['3x', '−4'], [['6x²', '−8x'], ['+3x', '−4']], { cw: (cw - 1.9) / 2, ch: 0.75, hw: 1.2, size: 24 });
  txt(s, '−8x + 3x = −5x', MX + 0.3, top + 3.35, cw - 0.6, 0.5, { size: 20, color: C.grey });
  txt(s, '= 6x² − 5x − 4', MX + 0.3, top + 4.1, cw - 0.6, 0.7, { size: 30, bold: true, color: C.maroon });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.4, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.7, C.red);
  txt(s, 'HT   (x + 1)(x + 2)(x + 3)', x2 + 0.3, top, cw - 0.6, 0.7, { size: 24, bold: true, color: C.white, valign: 'middle' });
  txt(s, '**Step 1:** expand two brackets', x2 + 0.3, top + 0.95, cw - 0.6, 0.5, { size: 20 });
  txt(s, '(x + 1)(x + 2) = x² + 3x + 2', x2 + 0.3, top + 1.45, cw - 0.6, 0.5, { size: 22 });
  txt(s, '**Step 2:** multiply by the third', x2 + 0.3, top + 2.2, cw - 0.6, 0.5, { size: 20 });
  txt(s, '(x² + 3x + 2)(x + 3)', x2 + 0.3, top + 2.7, cw - 0.6, 0.5, { size: 22 });
  txt(s, '= x³ + 3x² + 3x² + 9x + 2x + 6', x2 + 0.3, top + 3.3, cw - 0.6, 0.5, { size: 20 });
  txt(s, '= x³ + 6x² + 11x + 6', x2 + 0.3, top + 4.1, cw - 0.6, 0.7, { size: 30, bold: true, color: C.orange });
  notes(s, 'Left: a number in front of x in both brackets (both tiers can attempt; common on Higher papers). Right: three binomials is Higher only. For step 2 a 3 by 2 grid works well. Check x = 1: 2 × 3 × 4 = 24 = 1 + 6 + 11 + 6.');
}

D.myTurnYourTurn({
  title: 'Double brackets', tag: 'Part 4', stepSize: 26, labelW: 3.0, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Expand and simplify:',
    steps: [
      { label: '(x + 2)(x + 6)', text: '**x² + 8x + 12**' },
      { label: '(x − 5)(x + 1)', text: '**x² − 4x − 5**' },
      { label: '(x + 4)²', text: '**x² + 8x + 16**' },
    ],
  },
  yours: {
    q: 'Expand and simplify:',
    steps: [
      { label: '(x + 3)(x + 7)', text: '**x² + 10x + 21**' },
      { label: '(y − 6)(y + 2)', text: '**y² − 4y − 12**' },
      { label: '(a − 5)²', text: '**a² − 10a + 25**' },
    ],
  },
  notes: 'Encourage the grid for every one. (x − 5)(x + 1): x² + x − 5x − 5 = x² − 4x − 5.',
});

// ---------------- Practice & assessment ----------------
{
  const qs = [
    'Simplify  5x + 2y + x − 4y',
    'Expand and simplify  4(x + 3) + 2(x − 5)',
    'Factorise fully  10y² − 15y',
    'Expand and simplify  (x + 5)(x − 3)',
    'A rectangle is (4x + 1) by (x + 3). Find and simplify its perimeter.',
    'Jo says (x + 3)² = x² + 9. Use x = 1 to show she is wrong, then expand correctly.',
    'Show that 4n + 6 is always even.',
    'HT   Expand and simplify  (x + 2)(x − 1)(x + 4)',
  ];
  const ans = ['6x − 2y', '6x + 2', '5y(2y − 3)', 'x² + 2x − 15', '10x + 8', '16 ≠ 10;  x² + 6x + 9', '4n + 6 = 2(2n + 3)', 'x³ + 5x² + 2x − 8'];
  const sets = [['Practice: fluency', 0, 'One from each part'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 28, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 6x − 2y  2) 4x + 12 + 2x − 10 = 6x + 2  3) 5y(2y − 3)  4) x² − 3x + 5x − 15 = x² + 2x − 15  5) 2(4x + 1) + 2(x + 3) = 10x + 8  6) x = 1: (4)² = 16 but 1 + 9 = 10; correct x² + 6x + 9  7) 2(2n + 3) is a multiple of 2  8) (x² + x − 2)(x + 4) = x³ + 5x² + 2x − 8 (Higher).');
  }
}
calc('P6 check', (1 + 3) ** 2, 16);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 9 marks', size: 20, lineGap: 0.38,
  parts: [
    { l: 'a', q: 'Simplify  3e + 5f − e − 8f', m: 2, lines: 1 },
    { l: 'b', q: 'Expand and simplify  2(3a + 1) + 4(a − 2)', m: 2, lines: 1 },
    { l: 'c', q: 'Factorise fully  9p² + 6pq', m: 2, lines: 1 },
    { l: 'd', q: 'Expand and simplify  (x + 6)(x − 4)', m: 2, lines: 1 },
    { l: 'e', q: 'Expand and simplify  (2x − 3)²', m: 1, lines: 1 },
  ],
  total: 9,
  scheme: [
    ['(a)', '2e − 3f', 'B2', 'B1 for 2e or −3f'],
    ['(b)', '6a + 2 + 4a − 8 = 10a − 6', 'M1 A1', 'M1 both brackets expanded, at most one error'],
    ['(c)', '3p(3p + 2q)', 'B2', 'B1 for 3(3p² + 2pq) or p(9p + 6q)'],
    ['(d)', 'x² − 4x + 6x − 24 = x² + 2x − 24', 'M1 A1', 'M1 for 4 terms, 3 correct'],
    ['(e)', '4x² − 12x + 9', 'B1', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Simplify  6a − b + 2a + 4b', 'Expand  −3(x + 4)', 'Factorise fully  6m² + 9m', 'Expand and simplify  (x + 1)(x − 7)'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) 8a + 3b  2) −3x − 12  3) 3m(2m + 3)  4) x² − 6x − 7. Revisit the objectives.');
}
same('exit1', (a, b) => 6 * a - b + 2 * a + 4 * b, (a, b) => 8 * a + 3 * b);

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Simplify  3p + 4q − p + q  and  4x² − x + 2x² + 3x',
    'Expand and simplify  5(m + 3) + 2(m − 4)',
    'Factorise fully  4x² + 20x',
    'Expand and simplify  (x − 2)(x − 9)',
    'Expand and simplify  (y + 6)²',
    'Expand and simplify  (3x + 2)(x − 5)',
  ], { cols: 2, size: 22 });
  notes(s, 'Answers: 1) 2p + 5q; 6x² + 2x  2) 7m + 7  3) 4x(x + 5)  4) x² − 11x + 18  5) y² + 12y + 36  6) 3x² − 13x − 10.');
}
same('HW1a', (p, q) => 3 * p + 4 * q - p + q, (p, q) => 2 * p + 5 * q);
same('HW1b', x => 4 * x * x - x + 2 * x * x + 3 * x, x => 6 * x * x + 2 * x);

D.save(path.join(__dirname, 'AQA_8300_A4_SimplifyingExpressions.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
