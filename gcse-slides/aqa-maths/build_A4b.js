// build_A4b.js — AQA GCSE Mathematics 8300, A4 part 2: Expanding single brackets (one lesson, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A4b.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A4', title: 'Expanding single brackets' };
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;

const pts = [[2, 3], [-1, 5], [0.5, -2]];
const same = (label, f, g) => pts.forEach(([a, b]) => calc(`${label} @${a},${b}`, f(a, b), g(a, b), 1e-9));

// ======================= numbers (all checked) =======================
same('DN1 2 x 3x', x => 2 * (3 * x), x => 6 * x);
same('DN2 x * x', x => x * x, x => x ** 2);
calc('DN3', -4 * 5, -20); calc('DN4', -3 * -2, 6);
same('2a x 5b', (a, b) => (2 * a) * (5 * b), (a, b) => 10 * a * b);
same('3x x 2x', x => (3 * x) * (2 * x), x => 6 * x * x);
same('area 3(x+4)', x => 3 * (x + 4), x => 3 * x + 12);
same('5(2y-3)', y => 5 * (2 * y - 3), y => 10 * y - 15);
same('hinge 4(x+5)', x => 4 * (x + 5), x => 4 * x + 20);
same('-2(x-3)', x => -2 * (x - 3), x => -2 * x + 6);
same('x(x+7)', x => x * (x + 7), x => x * x + 7 * x);
same('2a(3a-b)', (a, b) => 2 * a * (3 * a - b), (a, b) => 6 * a * a - 2 * a * b);
same('hinge -3(2y-4)', y => -3 * (2 * y - 4), y => -6 * y + 12);
same('E&S 3(x+2)+2(x-1)', x => 3 * (x + 2) + 2 * (x - 1), x => 5 * x + 4);
same('E&S 4(2a+1)-3(a-2)', a => 4 * (2 * a + 1) - 3 * (a - 2), a => 5 * a + 10);
same('MT1 6(2x-1)', x => 6 * (2 * x - 1), x => 12 * x - 6);
same('MT1 3(4+5k)', k => 3 * (4 + 5 * k), k => 12 + 15 * k);
same('YT1 7(3y-2)', y => 7 * (3 * y - 2), y => 21 * y - 14);
same('YT1 2(5+4m)', m => 2 * (5 + 4 * m), m => 10 + 8 * m);
same('MT2 -4(x-2)', x => -4 * (x - 2), x => -4 * x + 8);
same('MT2 x(x-9)', x => x * (x - 9), x => x * x - 9 * x);
same('YT2 -5(y+3)', y => -5 * (y + 3), y => -5 * y - 15);
same('YT2 p(2p+7)', p => p * (2 * p + 7), p => 2 * p * p + 7 * p);
same('MT3 2(3x+4)-3(x-1)', x => 2 * (3 * x + 4) - 3 * (x - 1), x => 3 * x + 11);
same('YT3 5(y+2)-2(2y-3)', y => 5 * (y + 2) - 2 * (2 * y - 3), y => y + 16);
same('area two rectangles', x => 3 * (x + 2) + 4 * (x + 1), x => 7 * x + 10);
same('P1 8(x+3)', x => 8 * (x + 3), x => 8 * x + 24);
same('P2 4(3a-5)', a => 4 * (3 * a - 5), a => 12 * a - 20);
same('P3 -2(4-y)', y => -2 * (4 - y), y => -8 + 2 * y);
same('P4 m(m+6)', m => m * (m + 6), m => m * m + 6 * m);
same('P5 4(x+3)+2(x-5)', x => 4 * (x + 3) + 2 * (x - 5), x => 6 * x + 2);
same('P6 3(2p-1)-(p-4)', p => 3 * (2 * p - 1) - (p - 4), p => 5 * p + 1);
same('P7 2(x+5) vs 2x+5 differ at 0', x => 2 * (x + 5) - (2 * x + 5), x => 5);
same('P8 3(2x+?) = 6x+12 -> 4', x => 3 * (2 * x + 4), x => 6 * x + 12);
same('exam a 5(x-4)', x => 5 * (x - 4), x => 5 * x - 20);
same('exam b y(y+3)', y => y * (y + 3), y => y * y + 3 * y);
same('exam c 2(3a+1)+4(a-2)', a => 2 * (3 * a + 1) + 4 * (a - 2), a => 10 * a - 6);
same('exam d 3(2x+1) vs 6x+1 differ', x => 3 * (2 * x + 1) - (6 * x + 1), x => 2);

// ======================= grid helper =======================
// grid(s, x, y, outside, insideTerms, products, opts)
function grid(s, x, y, outside, inside, prods, o = {}) {
  const cw = o.cw || 1.7, ch = o.ch || 0.9, hw = o.hw || 1.3, pt = o.size || 28;
  rect(s, x, y, hw, ch, C.maroon, C.maroon);
  txt(s, '×', x, y, hw, ch, { size: pt, bold: true, color: C.white, align: 'center', valign: 'middle' });
  inside.forEach((t, i) => {
    rect(s, x + hw + i * cw, y, cw, ch, C.soft, C.line, { lw: 1.5 });
    txt(s, t, x + hw + i * cw, y, cw, ch, { size: pt, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  });
  rect(s, x, y + ch, hw, ch, C.orangeSoft, 'F3D9B5', { lw: 1.5 });
  txt(s, outside, x, y + ch, hw, ch, { size: pt, bold: true, color: C.orange, align: 'center', valign: 'middle' });
  prods.forEach((t, i) => {
    rect(s, x + hw + i * cw, y + ch, cw, ch, C.white, C.line, { lw: 1.5 });
    txt(s, t, x + hw + i * cw, y + ch, cw, ch, { size: pt, bold: true, align: 'center', valign: 'middle' });
  });
  return { w: hw + inside.length * cw, h: 2 * ch };
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'A4 lesson 2 of 4: multiplying a single term over a bracket',
  bullets: ['Multiplying terms together', 'Expanding with the grid method', 'Negatives, letters outside, and expand-and-simplify'],
  notes: 'AQA 8300 A4: simplify and manipulate algebraic expressions by multiplying a single term over a bracket. Lesson 2 of 4 for A4 (1: collecting like terms; 3: factorising; 4: double brackets). Both tiers. About 60 minutes.',
});

D.objectives({
  tag: 'A4 • lesson 2',
  items: [
    '**Multiply** terms such as 3 × 2x and x × x.',
    '**Expand** a single bracket, including **negative** numbers and **letters** outside.',
    '**Expand and simplify** expressions with two brackets.',
  ],
  keywords: ['expand', 'bracket', 'multiply out', 'simplify', 'term'],
  notes: 'Share the objectives. Return to them at the exit ticket.',
});

D.doNow({
  qs: ['Simplify  2 × 3x', 'Simplify  x × x', 'Work out  −4 × 5', 'Work out  −3 × −2'],
  answers: ['6x', 'x²', '−20', '6'],
  notes: 'These are the building blocks of expanding: number × term, letter × letter, and the sign rules for multiplying.',
});

D.vocab({
  title: 'Key words', tag: 'A4',
  items: [
    { term: 'Expand', def: 'Multiply out the brackets, e.g. **3(x + 4) = 3x + 12**.' },
    { term: 'Bracket', def: 'Groups terms together. The number or term outside **multiplies everything inside**.' },
    { term: 'Simplify', def: 'Collect like terms after expanding, as in lesson 1.' },
    { term: 'Expand and simplify', def: 'Expand every bracket first, **then** collect like terms.' },
  ],
  notes: '"Multiply out" and "expand" mean the same thing in exam questions.',
});

// Multiplying terms
{
  const s = frame('Multiplying terms', { tag: 'A4' });
  txt(s, 'Multiply the **numbers**, then multiply the **letters**.', MX, 1.35, W - 2 * MX, 0.55, { size: 24 });
  const rows = [['4 × 3y', '12y'], ['a × a', 'a²'], ['2a × 5b', '10ab'], ['3x × 2x', '6x²'], ['−2 × 4x', '−8x']];
  rows.forEach(([q, a], i) => {
    const yy = 2.15 + i * 0.9;
    rect(s, MX, yy, 7.2, 0.78, i % 2 ? C.white : C.soft, C.line);
    txt(s, q, MX + 0.3, yy, 3.6, 0.78, { size: 30, valign: 'middle' });
    txt(s, '=', MX + 3.9, yy, 0.6, 0.78, { size: 30, align: 'center', valign: 'middle' });
    txt(s, a, MX + 4.6, yy, 2.4, 0.78, { size: 30, bold: true, color: C.maroon, valign: 'middle' });
  });
  const bx = 8.3, bw = W - MX - bx;
  rect(s, bx, 2.15, bw, 4.4, C.orangeSoft, 'F3D9B5');
  txt(s, 'Common mistake', bx + 0.3, 2.3, bw - 0.6, 0.5, { size: 20, bold: true, color: C.orange });
  txt(s, '3x × 2x  is  **6x²**, not 6x.', bx + 0.3, 2.95, bw - 0.6, 0.9, { size: 21 });
  txt(s, 'x × x = x², so the answer has a **power**.', bx + 0.3, 3.95, bw - 0.6, 1.0, { size: 20 });
  txt(s, 'Adding is different:  3x + 2x = 5x.', bx + 0.3, 5.15, bw - 0.6, 1.0, { size: 20, color: C.grey });
  notes(s, '4 × 3y = 12y; a × a = a²; 2a × 5b = 10ab; 3x × 2x = 6x²; −2 × 4x = −8x. Contrast with adding (lesson 1): 3x + 2x = 5x but 3x × 2x = 6x².');
}

// Grid method
{
  const s = frame('Expanding with a grid', { tag: 'A4' });
  txt(s, 'Expand  **3(x + 4)**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  // area picture
  const ox = MX + 0.8, oy = 2.55, hgt = 1.8, wx = 3.2, w4 = 1.6;
  rect(s, ox, oy, wx, hgt, C.soft, C.maroon, { lw: 2 });
  rect(s, ox + wx, oy, w4, hgt, C.orangeSoft, C.orange, { lw: 2 });
  txt(s, 'x', ox, oy - 0.5, wx, 0.45, { size: 24, bold: true, align: 'center' });
  txt(s, '4', ox + wx, oy - 0.5, w4, 0.45, { size: 24, bold: true, align: 'center' });
  txt(s, '3', ox - 0.55, oy, 0.45, hgt, { size: 24, bold: true, align: 'center', valign: 'middle' });
  txt(s, '3x', ox, oy, wx, hgt, { size: 32, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  txt(s, '12', ox + wx, oy, w4, hgt, { size: 32, bold: true, color: C.orange, align: 'center', valign: 'middle' });
  txt(s, 'Area model', ox, oy + hgt + 0.15, wx + w4, 0.4, { size: 16, italic: true, color: C.grey, align: 'center' });
  // grid
  const gx = 7.6;
  grid(s, gx, 2.4, '3', ['x', '+4'], ['3x', '+12']);
  txt(s, 'Grid method', gx, 4.3, 4.7, 0.4, { size: 16, italic: true, color: C.grey, align: 'center' });
  rect(s, MX, 5.3, W - 2 * MX, 1.45, C.greenSoft, C.green, { lw: 2 });
  txt(s, '3(x + 4)  =  3x + 12', MX, 5.3, W - 2 * MX, 0.85, { size: 36, bold: true, color: C.green, align: 'center', valign: 'middle' });
  txt(s, 'The 3 multiplies **every** term inside the bracket.', MX, 6.1, W - 2 * MX, 0.55, { size: 20, align: 'center' });
  notes(s, 'The area model shows why: a rectangle 3 by (x + 4) is made of a 3 by x part and a 3 by 4 part. The grid is the same idea without the picture. Check with x = 2: 3 × 6 = 18 and 6 + 12 = 18.');
}

// Arrow method
{
  const s = frame('The method: multiply every term', { tag: 'A4' });
  txt(s, 'Expand  **5(2y − 3)**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  const lines = [
    ['Outside × first term', '5 × 2y = 10y'],
    ['Outside × second term (keep the sign)', '5 × (−3) = −15'],
    ['Write both terms', '5(2y − 3) = 10y − 15'],
  ];
  lines.forEach(([d, m], i) => {
    const y = 2.3 + i * 1.15;
    D.circle(s, MX + 0.35, y + 0.42, 0.62, C.accent);
    txt(s, String(i + 1), MX + 0.04, y + 0.11, 0.62, 0.62, { size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, d, MX + 0.95, y, 5.4, 0.85, { size: 21, valign: 'middle' });
    rect(s, 6.6, y, W - MX - 6.6, 0.85, i === 2 ? C.greenSoft : C.soft, i === 2 ? C.green : C.line);
    txt(s, m, 6.9, y, W - MX - 7.2, 0.85, { size: 30, bold: true, color: i === 2 ? C.green : C.maroon, valign: 'middle' });
  });
  rect(s, MX, 5.95, W - 2 * MX, 0.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Common mistake:  5(2y − 3) = 10y − 3.   The 5 must multiply the 3 as well.', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.85, { size: 21, valign: 'middle' });
  notes(s, 'Draw arrows ("rainbow" or "claw") from the 5 to each term. The most common error is only multiplying the first term.');
}

D.hinge({
  title: 'Quick check',
  q: 'Expand  4(x + 5)',
  options: ['4x + 5', '4x + 20', 'x + 20', '4x + 9'],
  correct: 1,
  notes: 'Answer B. A: only multiplied the first term. C: only multiplied the second term. D: added 4 + 5 instead of multiplying.',
});

// Negatives outside
{
  const s = frame('A negative outside the bracket', { tag: 'A4' });
  txt(s, 'Expand  **−2(x − 3)**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  grid(s, MX + 0.3, 2.25, '−2', ['x', '−3'], ['−2x', '+6'], { cw: 2.0 });
  const bx = 7.0, bw = W - MX - bx;
  rect(s, bx, 2.25, bw, 2.2, C.greyLight);
  txt(s, '−2 × x = **−2x**', bx + 0.3, 2.4, bw - 0.6, 0.6, { size: 24 });
  txt(s, '−2 × −3 = **+6**', bx + 0.3, 3.1, bw - 0.6, 0.6, { size: 24 });
  txt(s, 'negative × negative = positive', bx + 0.3, 3.75, bw - 0.6, 0.5, { size: 18, color: C.grey });
  rect(s, MX, 4.75, W - 2 * MX, 0.95, C.greenSoft, C.green, { lw: 2 });
  txt(s, '−2(x − 3)  =  −2x + 6', MX, 4.75, W - 2 * MX, 0.95, { size: 34, bold: true, color: C.green, align: 'center', valign: 'middle' });
  rect(s, MX, 5.95, W - 2 * MX, 0.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Common mistake:  −2x − 6.   Multiply the sign too.   Also:  −(x − 4) means −1(x − 4) = −x + 4.', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.85, { size: 20, valign: 'middle' });
  notes(s, 'Check with x = 5: −2(5 − 3) = −4 and −10 + 6 = −4. A minus sign in front of a bracket with no number means −1.');
}

// Letters outside
{
  const s = frame('A letter outside the bracket', { tag: 'A4' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  const block = (x, title, g, ans) => {
    txt(s, title, x, 1.4, cw, 0.6, { size: 26, bold: true });
    grid(s, x, 2.25, g[0], g[1], g[2], { cw: (cw - 1.3) / 2, size: 26 });
    rect(s, x, 4.35, cw, 0.95, C.greenSoft, C.green, { lw: 2 });
    txt(s, ans, x, 4.35, cw, 0.95, { size: 30, bold: true, color: C.green, align: 'center', valign: 'middle' });
  };
  block(MX, 'Expand  x(x + 7)', ['x', ['x', '+7'], ['x²', '+7x']], 'x² + 7x');
  block(MX + cw + gap, 'Expand  2a(3a − b)', ['2a', ['3a', '−b'], ['6a²', '−2ab']], '6a² − 2ab');
  rect(s, MX, 5.6, W - 2 * MX, 1.2, C.greyLight);
  txt(s, 'x × x = **x²**     2a × 3a = **6a²**     2a × b = **2ab**', MX + 0.3, 5.6, W - 2 * MX - 0.6, 1.2, { size: 24, align: 'center', valign: 'middle' });
  notes(s, 'Use the multiplying-terms rules from earlier. x(x + 7) = x² + 7x. 2a(3a − b) = 6a² − 2ab. Check the second with a = 2, b = 3: 4 × 3 = 12 and 24 − 12 = 12.');
}

D.hinge({
  title: 'Quick check',
  q: 'Expand  −3(2y − 4)',
  options: ['−6y − 12', '−6y + 12', '6y − 12', '−6y − 4'],
  correct: 1,
  notes: 'Answer B: −3 × 2y = −6y and −3 × −4 = +12. A: sign error on the second term. C: sign error on the first term. D: did not multiply the 4.',
});

// Expand and simplify
{
  const s = frame('Expand and simplify', { tag: 'A4' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, q, lines, colour, soft) => {
    rect(s, x, top, cw, 5.4, soft, colour);
    rect(s, x, top, cw, 0.75, colour);
    txt(s, q, x + 0.3, top, cw - 0.6, 0.75, { size: 24, bold: true, color: C.white, valign: 'middle' });
    lines.forEach(([lab, m], i) => {
      txt(s, lab, x + 0.3, top + 1.0 + i * 1.1, cw - 0.6, 0.4, { size: 16, bold: true, color: colour });
      txt(s, m, x + 0.3, top + 1.4 + i * 1.1, cw - 0.6, 0.6, { size: i === lines.length - 1 ? 30 : 24, bold: i === lines.length - 1 });
    });
  };
  col(MX, '3(x + 2) + 2(x − 1)', [['Expand each bracket', '3x + 6 + 2x − 2'], ['Collect x terms', '3x + 2x = 5x'], ['Collect numbers', '6 − 2 = 4'], ['Answer', '5x + 4']], C.maroon, C.soft);
  col(MX + cw + gap, '4(2a + 1) − 3(a − 2)', [['Expand (−3 multiplies both)', '8a + 4 − 3a + 6'], ['Collect a terms', '8a − 3a = 5a'], ['Collect numbers', '4 + 6 = 10'], ['Answer', '5a + 10']], C.orange, C.orangeSoft);
  notes(s, 'Right-hand example: the −3 multiplies both terms, so −3 × −2 = +6. The most common error is writing 8a + 4 − 3a − 6.');
}

D.myTurnYourTurn({
  title: 'Expanding brackets', tag: 'A4', stepSize: 26, labelW: 2.6, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Expand:',
    steps: [
      { label: '6(2x − 1)', text: '**12x − 6**' },
      { label: '3(4 + 5k)', text: '**12 + 15k**' },
      { label: '−4(x − 2)', text: '**−4x + 8**' },
      { label: 'x(x − 9)', text: '**x² − 9x**' },
    ],
  },
  yours: {
    q: 'Expand:',
    steps: [
      { label: '7(3y − 2)', text: '**21y − 14**' },
      { label: '2(5 + 4m)', text: '**10 + 8m**' },
      { label: '−5(y + 3)', text: '**−5y − 15**' },
      { label: 'p(2p + 7)', text: '**2p² + 7p**' },
    ],
  },
  notes: 'Work through the four my-turn examples saying the method aloud each time. Your turn answers: 21y − 14; 10 + 8m; −5y − 15; 2p² + 7p.',
});

D.myTurnYourTurn({
  title: 'Expand and simplify', tag: 'A4', stepSize: 24, labelW: 2.2, labelSize: 18,
  mine: {
    q: 'Expand and simplify  **2(3x + 4) − 3(x − 1)**',
    steps: [
      { label: 'Expand', text: '6x + 8 − 3x + 3' },
      { label: 'x terms', text: '6x − 3x = 3x' },
      { label: 'Numbers', text: '8 + 3 = 11' },
      { label: 'Answer', text: '**3x + 11**' },
    ],
  },
  yours: {
    q: 'Expand and simplify  **5(y + 2) − 2(2y − 3)**',
    steps: [
      { label: 'Expand', text: '5y + 10 − 4y + 6' },
      { label: 'y terms', text: '5y − 4y = y' },
      { label: 'Numbers', text: '10 + 6 = 16' },
      { label: 'Answer', text: '**y + 16**' },
    ],
  },
  notes: 'Mine: −3 × −1 = +3. Yours: −2 × −3 = +6, and 5y − 4y = y (not 1y).',
});

// Area context
{
  const s = frame('Expanding in an area problem', { tag: 'A4' });
  const ox = MX + 0.6, oy = 1.9;
  rect(s, ox, oy, 3.2, 1.5, C.soft, C.maroon, { lw: 2 });
  txt(s, 'A', ox, oy, 3.2, 1.5, { size: 30, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  txt(s, 'x + 2', ox, oy - 0.5, 3.2, 0.45, { size: 22, bold: true, align: 'center' });
  txt(s, '3', ox - 0.5, oy, 0.4, 1.5, { size: 22, bold: true, align: 'center', valign: 'middle' });
  const oy2 = 4.2;
  rect(s, ox, oy2, 2.6, 2.0, C.orangeSoft, C.orange, { lw: 2 });
  txt(s, 'B', ox, oy2, 2.6, 2.0, { size: 30, bold: true, color: C.orange, align: 'center', valign: 'middle' });
  txt(s, 'x + 1', ox, oy2 - 0.5, 2.6, 0.45, { size: 22, bold: true, align: 'center' });
  txt(s, '4', ox - 0.5, oy2, 0.4, 2.0, { size: 22, bold: true, align: 'center', valign: 'middle' });
  const bx = 6.2, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.4, C.greyLight);
  txt(s, 'Find an expression for the total area of A and B. Simplify it.', bx + 0.3, 1.55, bw - 0.6, 0.9, { size: 20, bold: true, color: C.maroon });
  txt(s, 'Area A = 3(x + 2) = 3x + 6', bx + 0.3, 2.65, bw - 0.6, 0.5, { size: 22 });
  txt(s, 'Area B = 4(x + 1) = 4x + 4', bx + 0.3, 3.3, bw - 0.6, 0.5, { size: 22 });
  txt(s, 'Total = 3x + 6 + 4x + 4', bx + 0.3, 4.05, bw - 0.6, 0.5, { size: 22 });
  txt(s, 'Total area = 7x + 10', bx + 0.3, 4.85, bw - 0.6, 0.6, { size: 30, bold: true, color: C.green });
  txt(s, 'Check: x = 3 gives 15 + 16 = 31, and 7 × 3 + 10 = 31', bx + 0.3, 5.75, bw - 0.6, 0.9, { size: 17, color: C.grey });
  notes(s, '3(x + 2) + 4(x + 1) = 7x + 10. Diagrams are not to scale.');
}
calc('area check x=3', 3 * 5 + 4 * 4, 7 * 3 + 10);

// Practice
{
  const qs = [
    'Expand  8(x + 3)',
    'Expand  4(3a − 5)',
    'Expand  −2(4 − y)',
    'Expand  m(m + 6)',
    'Expand and simplify  4(x + 3) + 2(x − 5)',
    'Expand and simplify  3(2p − 1) − (p − 4)',
    'Jo says 2(x + 5) = 2x + 5. Use x = 1 to show she is wrong.',
    'Fill the gap:  3(2x + …) = 6x + 12',
  ];
  const ans = ['8x + 24', '12a − 20', '−8 + 2y', 'm² + 6m', '6x + 2', '5p + 1', 'x = 1: 12 but 7', '4'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 28, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 25, start: k });
    notes(s, 'Answers: 1) 8x + 24  2) 12a − 20  3) −8 + 2y (or 2y − 8)  4) m² + 6m  5) 4x + 12 + 2x − 10 = 6x + 2  6) 6p − 3 − p + 4 = 5p + 1  7) x = 1: 2(6) = 12 but 2 + 5 = 7  8) 4, because 3 × 4 = 12.');
  }
}
calc('P7 x=1', 2 * (1 + 5), 12); calc('P7 x=1 wrong', 2 * 1 + 5, 7);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 7 marks', size: 21, lineGap: 0.42,
  parts: [
    { l: 'a', q: 'Expand  5(x − 4)', m: 1, lines: 1 },
    { l: 'b', q: 'Expand  y(y + 3)', m: 1, lines: 1 },
    { l: 'c', q: 'Expand and simplify  2(3a + 1) + 4(a − 2)', m: 2, lines: 1 },
    { l: 'd', q: 'Ali says, "3(2x + 1) = 6x + 1." Explain his mistake and write the correct answer.', m: 2, lines: 1 },
    { l: 'e', q: 'Write 4(2x − 3) − 2x in the form ax + b.', m: 1, lines: 1 },
  ],
  total: 7,
  scheme: [
    ['(a)', '5x − 20', 'B1', ''],
    ['(b)', 'y² + 3y', 'B1', ''],
    ['(c)', '6a + 2 + 4a − 8 = 10a − 6', 'M1 A1', 'M1 for both brackets expanded with at most one error'],
    ['(d)', 'He did not multiply the 1 by 3;  6x + 3', 'B1 B1', ''],
    ['(e)', '6x − 12', 'B1', 'a = 6, b = −12'],
  ],
  notes: 'Mark scheme on the next slide. (e): 8x − 12 − 2x = 6x − 12.',
});
same('exam e', x => 4 * (2 * x - 3) - 2 * x, x => 6 * x - 12);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Expand  6(y − 2)', 'Expand  −3(x + 4)', 'Expand  a(a − 5)', 'Expand and simplify  2(x + 1) + 3(x + 2)'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) 6y − 12  2) −3x − 12  3) a² − 5a  4) 5x + 8. Revisit the objectives.');
}
same('exit 4', x => 2 * (x + 1) + 3 * (x + 2), x => 5 * x + 8);

{
  const s = frame('Homework', { tag: 'About 20 minutes' });
  D.qCards(s, [
    'Expand: (a) 9(k + 2)  (b) 5(3 − 2w)  (c) −4(t − 6)',
    'Expand: (a) x(x + 1)  (b) 3y(y − 4)',
    'Expand and simplify  5(m + 3) + 2(m − 4)',
    'Expand and simplify  6(n + 1) − 4(n − 2)',
    'A rectangle is 4 cm by (2x + 3) cm. Write an expression for its area.',
    'Find the missing terms:  …(x + 5) = 3x + …',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 9k + 18; 15 − 10w; −4t + 24  2) x² + x; 3y² − 12y  3) 7m + 7  4) 2n + 14  5) 8x + 12 cm²  6) 3(x + 5) = 3x + 15.');
}
same('HW3', m => 5 * (m + 3) + 2 * (m - 4), m => 7 * m + 7);
same('HW4', n => 6 * (n + 1) - 4 * (n - 2), n => 2 * n + 14);
same('HW1c', t => -4 * (t - 6), t => -4 * t + 24);
same('HW2b', y => 3 * y * (y - 4), y => 3 * y * y - 12 * y);

D.save(path.join(__dirname, 'AQA_8300_A4b_ExpandingSingleBrackets.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
