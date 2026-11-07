// build_A4c.js — AQA GCSE Mathematics 8300, A4 part 3: Factorising (common factors) (one lesson, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A4c.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A4', title: 'Factorising' };
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;

const pts = [[2, 3], [-1, 5], [0.5, -2]];
const same = (label, f, g) => pts.forEach(([a, b]) => calc(`${label} @${a},${b}`, f(a, b), g(a, b), 1e-9));
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));

// ======================= numbers (all checked) =======================
calc('DN1 HCF 12,18', gcd(12, 18), 6);
calc('DN2 HCF 15,25', gcd(15, 25), 5);
same('DN3 expand 4(x+3)', x => 4 * (x + 3), x => 4 * x + 12);
same('DN4 expand x(x-5)', x => x * (x - 5), x => x * x - 5 * x);
same('intro 3x+12', x => 3 * x + 12, x => 3 * (x + 4));
same('method 6x+15', x => 6 * x + 15, x => 3 * (2 * x + 5));
calc('HCF 6,15', gcd(6, 15), 3);
same('fully 8x+12 partial', x => 8 * x + 12, x => 2 * (4 * x + 6));
same('fully 8x+12 full', x => 8 * x + 12, x => 4 * (2 * x + 3));
calc('HCF 8,12', gcd(8, 12), 4);
same('letters x2+7x', x => x * x + 7 * x, x => x * (x + 7));
same('letters 6a2-9a', a => 6 * a * a - 9 * a, a => 3 * a * (2 * a - 3));
same('letters 4xy+10x', (x, y) => 4 * x * y + 10 * x, (x, y) => 2 * x * (2 * y + 5));
same('hinge 10x-25', x => 10 * x - 25, x => 5 * (2 * x - 5));
same('hinge2 12y2+8y', y => 12 * y * y + 8 * y, y => 4 * y * (3 * y + 2));
same('MT1 5x+20', x => 5 * x + 20, x => 5 * (x + 4));
same('MT1 14y-21', y => 14 * y - 21, y => 7 * (2 * y - 3));
same('YT1 6a+18', a => 6 * a + 18, a => 6 * (a + 3));
same('YT1 20k-12', k => 20 * k - 12, k => 4 * (5 * k - 3));
same('MT2 m2-3m', m => m * m - 3 * m, m => m * (m - 3));
same('MT2 8p2+12p', p => 8 * p * p + 12 * p, p => 4 * p * (2 * p + 3));
same('YT2 y2+9y', y => y * y + 9 * y, y => y * (y + 9));
same('YT2 15t2-10t', t => 15 * t * t - 10 * t, t => 5 * t * (3 * t - 2));
same('three terms 6x+9y-3', (x, y) => 6 * x + 9 * y - 3, (x, y) => 3 * (2 * x + 3 * y - 1));
same('P1 7x+14', x => 7 * x + 14, x => 7 * (x + 2));
same('P2 9a-12', a => 9 * a - 12, a => 3 * (3 * a - 4));
same('P3 x2+4x', x => x * x + 4 * x, x => x * (x + 4));
same('P4 10y2-15y', y => 10 * y * y - 15 * y, y => 5 * y * (2 * y - 3));
same('P5 rectangle 5x+35', x => 5 * x + 35, x => 5 * (x + 7));
same('P7 2ab+6a', (a, b) => 2 * a * b + 6 * a, (a, b) => 2 * a * (b + 3));
same('P8 4n+6 even', n => 4 * n + 6, n => 2 * (2 * n + 3));
same('exam a 4x+28', x => 4 * x + 28, x => 4 * (x + 7));
same('exam b y2-6y', y => y * y - 6 * y, y => y * (y - 6));
same('exam c 9p2+6pq', (p, q) => 9 * p * p + 6 * p * q, (p, q) => 3 * p * (3 * p + 2 * q));
same('exam d 12x+18', x => 12 * x + 18, x => 6 * (2 * x + 3));

// ======================= slides =======================
D.titleSlide({
  subtitle: 'A4 lesson 3 of 4: taking out common factors',
  bullets: ['Factorising is expanding in reverse', 'Finding the highest common factor', 'Factorising fully, including letters and powers'],
  notes: 'AQA 8300 A4: simplify and manipulate algebraic expressions by taking out common factors. Lesson 3 of 4 for A4. Both tiers. About 60 minutes.',
});

D.objectives({
  tag: 'A4 • lesson 3',
  items: [
    'Find the **highest common factor** of two terms.',
    '**Factorise** an expression by taking out a number.',
    '**Factorise fully**, including letters and powers.',
  ],
  keywords: ['factorise', 'factor', 'highest common factor', 'factorise fully', 'expand'],
  notes: 'Share the objectives. Return to them at the exit ticket.',
});

D.doNow({
  qs: ['What is the highest common factor of 12 and 18?', 'What is the highest common factor of 15 and 25?', 'Expand  4(x + 3)', 'Expand  x(x − 5)'],
  answers: ['6', '5', '4x + 12', 'x² − 5x'],
  notes: 'HCF of numbers and expanding (lesson 2) are the two ingredients of factorising.',
});

D.vocab({
  title: 'Key words', tag: 'A4',
  items: [
    { term: 'Factorise', def: 'Put an expression **into brackets** by taking out a common factor. It is the **reverse of expanding**.' },
    { term: 'Common factor', def: 'A number or letter that divides into **every** term.' },
    { term: 'Highest common factor', def: 'The **biggest** common factor (HCF). For 6x and 15 it is **3**.' },
    { term: 'Factorise fully', def: 'Take out the **HCF**, so nothing else can come out of the bracket.' },
  ],
  notes: 'Exam questions usually say "factorise fully": they mean take out the highest common factor.',
});

// Reverse of expanding
{
  const s = frame('Factorising is expanding in reverse', { tag: 'A4' });
  const y = 2.4;
  rect(s, MX + 0.5, y, 4.0, 1.3, C.soft, C.maroon, { lw: 2.5 });
  txt(s, '3(x + 4)', MX + 0.5, y, 4.0, 1.3, { size: 40, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  rect(s, W - MX - 4.5, y, 4.0, 1.3, C.orangeSoft, C.orange, { lw: 2.5 });
  txt(s, '3x + 12', W - MX - 4.5, y, 4.0, 1.3, { size: 40, bold: true, color: C.orange, align: 'center', valign: 'middle' });
  // arrows
  const ax0 = MX + 4.7, ax1 = W - MX - 4.7;
  s.addShape(D.SH.line, { x: ax0, y: y + 0.35, w: ax1 - ax0, h: 0, line: { color: C.maroon, width: 4, endArrowType: 'triangle' } });
  txt(s, 'expand', ax0, y - 0.25, ax1 - ax0, 0.5, { size: 22, bold: true, color: C.maroon, align: 'center' });
  s.addShape(D.SH.line, { x: ax0, y: y + 0.95, w: ax1 - ax0, h: 0, line: { color: C.orange, width: 4, beginArrowType: 'triangle' } });
  txt(s, 'factorise', ax0, y + 1.05, ax1 - ax0, 0.5, { size: 22, bold: true, color: C.orange, align: 'center' });
  rect(s, MX, 4.6, W - 2 * MX, 2.2, C.greyLight);
  txt(s, 'To factorise  3x + 12:', MX + 0.3, 4.75, W - 2 * MX - 0.6, 0.5, { size: 22, bold: true });
  txt(s, '3 goes into both 3x and 12, so take the 3 outside the bracket.', MX + 0.3, 5.35, W - 2 * MX - 0.6, 0.5, { size: 22 });
  txt(s, '3x ÷ 3 = x     12 ÷ 3 = 4     so   3x + 12 = 3(x + 4)', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.6, { size: 24, bold: true, color: C.green });
  notes(s, 'Ask: "What number was multiplied by the bracket to give 3x + 12?" Students can always check a factorisation by expanding it.');
}

// Method with grid
{
  const s = frame('The method', { tag: 'A4' });
  txt(s, 'Factorise  **6x + 15**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  const steps = [
    ['Find the HCF of the terms', 'HCF of 6x and 15 is 3'],
    ['Write it outside the bracket', '3(        )'],
    ['Divide each term by it', '6x ÷ 3 = 2x,   15 ÷ 3 = 5'],
    ['Check by expanding', '3(2x + 5) = 6x + 15  ✓'],
  ];
  steps.forEach(([d, m], i) => {
    const y = 2.1 + i * 1.02;
    D.circle(s, MX + 0.35, y + 0.4, 0.62, C.accent);
    txt(s, String(i + 1), MX + 0.04, y + 0.09, 0.62, 0.62, { size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, d, MX + 0.95, y, 5.3, 0.8, { size: 21, valign: 'middle' });
    rect(s, 6.6, y, W - MX - 6.6, 0.8, C.soft, C.line);
    txt(s, m, 6.9, y, W - MX - 7.2, 0.8, { size: 26, bold: true, color: C.maroon, valign: 'middle' });
  });
  rect(s, MX, 6.4, W - 2 * MX, 0.5, C.greenSoft, C.green, { lw: 2 });
  txt(s, '6x + 15 = 3(2x + 5)', MX, 6.4, W - 2 * MX, 0.5, { size: 24, bold: true, color: C.green, align: 'center', valign: 'middle' });
  notes(s, 'Always finish by expanding to check. 3 × 2x = 6x and 3 × 5 = 15.');
}

// Factorise fully
{
  const s = frame('Factorise fully: use the HCF', { tag: 'Common mistake' });
  txt(s, 'Factorise  **8x + 12**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.15, h = 2.9;
  const panel = (x, head, line1, line2, colour, soft) => {
    rect(s, x, top, cw, h, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
    txt(s, line1, x + 0.3, top + 0.95, cw - 0.6, 0.8, { size: 34, bold: true, color: colour });
    txt(s, line2, x + 0.3, top + 1.85, cw - 0.6, 0.9, { size: 20 });
  };
  panel(MX, 'Partly factorised', '2(4x + 6)', '4x and 6 still have a common factor of 2. Not finished.', C.red, 'FBEDEB');
  panel(MX + cw + gap, 'Fully factorised', '4(2x + 3)', '4 is the HCF of 8 and 12. Nothing more comes out.', C.green, C.greenSoft);
  rect(s, MX, 5.35, W - 2 * MX, 1.45, C.greyLight);
  txt(s, 'Check the bracket: if the terms inside **still share a factor**, you have not factorised fully.', MX + 0.3, 5.35, W - 2 * MX - 0.6, 1.45, { size: 22, valign: 'middle' });
  notes(s, '2(4x + 6) is correct but not fully factorised: AQA would give 1 mark out of 2. The HCF of 8 and 12 is 4.');
}

D.hinge({
  title: 'Quick check',
  q: 'Factorise fully  10x − 25',
  options: ['5(2x − 5)', '10(x − 25)', '5(2x − 25)', '2(5x − 12.5)'],
  correct: 0,
  notes: 'Answer A. B: did not divide the 25. C: did not divide the second term. D: 2 is not a factor of 25 (and decimals are a sign of the wrong factor).',
});

// Letters and powers
{
  const s = frame('Taking out letters', { tag: 'A4' });
  const rows = [
    ['x² + 7x', 'x', 'x(x + 7)', 'x² ÷ x = x,  7x ÷ x = 7'],
    ['6a² − 9a', '3a', '3a(2a − 3)', '6a² ÷ 3a = 2a,  9a ÷ 3a = 3'],
    ['4xy + 10x', '2x', '2x(2y + 5)', '4xy ÷ 2x = 2y,  10x ÷ 2x = 5'],
  ];
  const hd = ['Expression', 'HCF', 'Factorised', 'Why'];
  const cw = [2.8, 1.5, 3.2, W - 2 * MX - 7.5], top = 1.4;
  rect(s, MX, top, W - 2 * MX, 0.6, C.maroon);
  let xx = MX; hd.forEach((h, j) => { txt(s, h, xx + 0.2, top, cw[j] - 0.3, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' }); xx += cw[j]; });
  rows.forEach((r, i) => {
    const yy = top + 0.6 + i * 1.05;
    rect(s, MX, yy, W - 2 * MX, 1.05, i % 2 ? C.white : C.soft, C.line);
    let x = MX;
    r.forEach((c, j) => { txt(s, c, x + 0.2, yy, cw[j] - 0.3, 1.05, { size: j === 3 ? 18 : 26, bold: j > 0 && j < 3, color: j === 2 ? C.green : j === 1 ? C.orange : j === 3 ? C.grey : C.ink, valign: 'middle' }); x += cw[j]; });
  });
  rect(s, MX, 5.4, W - 2 * MX, 1.4, C.orangeSoft, 'F3D9B5');
  txt(s, 'Look for the **number** HCF and the **letter** HCF separately, then put them together: 3 and a make **3a**.', MX + 0.3, 5.4, W - 2 * MX - 0.6, 1.4, { size: 22, valign: 'middle' });
  notes(s, 'In x² + 7x the common factor is x (x² = x × x). In 6a² − 9a: number HCF 3, letter HCF a, so 3a. In 4xy + 10x: 2 and x, so 2x.');
}

D.hinge({
  title: 'Quick check',
  q: 'Factorise fully  12y² + 8y',
  options: ['4(3y² + 2y)', 'y(12y + 8)', '4y(3y + 2)', '2y(6y + 4)'],
  correct: 2,
  notes: 'Answer C: HCF of 12y² and 8y is 4y. A, B and D are correct factorisations but not FULL: the bracket still has a common factor.',
});

D.myTurnYourTurn({
  title: 'Factorising', tag: 'A4', stepSize: 26, labelW: 2.6, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Factorise fully:',
    steps: [
      { label: '5x + 20', text: '**5(x + 4)**' },
      { label: '14y − 21', text: '**7(2y − 3)**' },
      { label: 'm² − 3m', text: '**m(m − 3)**' },
      { label: '8p² + 12p', text: '**4p(2p + 3)**' },
    ],
  },
  yours: {
    q: 'Factorise fully:',
    steps: [
      { label: '6a + 18', text: '**6(a + 3)**' },
      { label: '20k − 12', text: '**4(5k − 3)**' },
      { label: 'y² + 9y', text: '**y(y + 9)**' },
      { label: '15t² − 10t', text: '**5t(3t − 2)**' },
    ],
  },
  notes: 'Say the HCF aloud each time. Note 6a + 18 = 6(a + 3), not 3(2a + 6) or 2(3a + 9).',
});

// Three terms + area context
{
  const s = frame('Three terms, and working backwards', { tag: 'A4' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 5.4, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.7, C.maroon);
  txt(s, 'Three terms', MX + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
  txt(s, 'Factorise  6x + 9y − 3', MX + 0.3, top + 0.95, cw - 0.6, 0.6, { size: 24 });
  txt(s, 'HCF of 6, 9 and 3 is 3', MX + 0.3, top + 1.75, cw - 0.6, 0.6, { size: 21 });
  txt(s, '3 ÷ 3 = 1, so the last term is −1', MX + 0.3, top + 2.45, cw - 0.6, 0.9, { size: 21 });
  txt(s, '= 3(2x + 3y − 1)', MX + 0.3, top + 3.6, cw - 0.6, 0.7, { size: 30, bold: true, color: C.maroon });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.4, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.7, C.orange);
  txt(s, 'Working backwards', x2 + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
  txt(s, 'A rectangle has area 6x + 24. Its width is 6. Find its length.', x2 + 0.3, top + 0.95, cw - 0.6, 1.0, { size: 22 });
  txt(s, '6x + 24 = 6(x + 4)', x2 + 0.3, top + 2.25, cw - 0.6, 0.6, { size: 24 });
  txt(s, 'Length = x + 4', x2 + 0.3, top + 3.6, cw - 0.6, 0.7, { size: 30, bold: true, color: C.orange });
  notes(s, 'Left: a common mistake is to leave the last term as 0 or forget it: 3 ÷ 3 = 1. Right: area = width × length, so factorising by the width gives the length.');
}

// Practice
{
  const qs = [
    'Factorise  7x + 14',
    'Factorise fully  9a − 12',
    'Factorise  x² + 4x',
    'Factorise fully  10y² − 15y',
    'A rectangle has area 5x + 35 and length x + 7. Find its width.',
    'Ali factorises 12x + 18 as 3(4x + 6). Explain why he has not factorised fully.',
    'Factorise fully  2ab + 6a',
    'Show that 4n + 6 is always even, for any whole number n.',
  ];
  const ans = ['7(x + 2)', '3(3a − 4)', 'x(x + 4)', '5y(2y − 3)', '5', 'Bracket still has a factor 2.  6(2x + 3)', '2a(b + 3)', '4n + 6 = 2(2n + 3): a multiple of 2'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 26, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 7(x + 2)  2) 3(3a − 4)  3) x(x + 4)  4) 5y(2y − 3)  5) 5x + 35 = 5(x + 7), so width 5  6) 4 and 6 still share 2; fully: 6(2x + 3)  7) 2a(b + 3)  8) 4n + 6 = 2(2n + 3), which is 2 × a whole number, so even.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 6 marks', size: 21, lineGap: 0.45,
  parts: [
    { l: 'a', q: 'Factorise  4x + 28', m: 1, lines: 1 },
    { l: 'b', q: 'Factorise  y² − 6y', m: 1, lines: 1 },
    { l: 'c', q: 'Factorise fully  9p² + 6pq', m: 2, lines: 1 },
    { l: 'd', q: 'Sam says 12x + 18 = 2(6x + 9) is fully factorised. Is he right? Explain.', m: 2, lines: 1 },
  ],
  total: 6,
  scheme: [
    ['(a)', '4(x + 7)', 'B1', ''],
    ['(b)', 'y(y − 6)', 'B1', ''],
    ['(c)', '3p(3p + 2q)', 'B2', 'B1 for 3(3p² + 2pq) or p(9p + 6q)'],
    ['(d)', 'No: 6x + 9 still has factor 3;  6(2x + 3)', 'B1 B1', 'B1 reason, B1 correct full factorisation'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Factorise  8x + 40', 'Factorise  a² − 2a', 'Factorise fully  6m² + 9m', 'Expand your answer to Q3 to check it.'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) 8(x + 5)  2) a(a − 2)  3) 3m(2m + 3)  4) 3m × 2m = 6m², 3m × 3 = 9m. Revisit the objectives.');
}
same('exit 1', x => 8 * x + 40, x => 8 * (x + 5));
same('exit 3', m => 6 * m * m + 9 * m, m => 3 * m * (2 * m + 3));

{
  const s = frame('Homework', { tag: 'About 20 minutes' });
  D.qCards(s, [
    'Factorise: (a) 3x + 21  (b) 10y − 5  (c) 16 + 24k',
    'Factorise: (a) x² + 11x  (b) p² − p',
    'Factorise fully: (a) 18a − 12  (b) 4x² + 20x',
    'Factorise fully  12ab − 8b',
    'Factorise fully  5x + 10y − 15',
    'Show that 6n + 9 is always a multiple of 3.',
  ], { cols: 2, size: 22 });
  notes(s, 'Answers: 1) 3(x + 7); 5(2y − 1); 8(2 + 3k)  2) x(x + 11); p(p − 1)  3) 6(3a − 2); 4x(x + 5)  4) 4b(3a − 2)  5) 5(x + 2y − 3)  6) 6n + 9 = 3(2n + 3).');
}
same('HW1b', y => 10 * y - 5, y => 5 * (2 * y - 1));
same('HW1c', k => 16 + 24 * k, k => 8 * (2 + 3 * k));
same('HW2b', p => p * p - p, p => p * (p - 1));
same('HW3a', a => 18 * a - 12, a => 6 * (3 * a - 2));
same('HW3b', x => 4 * x * x + 20 * x, x => 4 * x * (x + 5));
same('HW4', (a, b) => 12 * a * b - 8 * b, (a, b) => 4 * b * (3 * a - 2));
same('HW5', (x, y) => 5 * x + 10 * y - 15, (x, y) => 5 * (x + 2 * y - 3));

D.save(path.join(__dirname, 'AQA_8300_A4c_Factorising.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
