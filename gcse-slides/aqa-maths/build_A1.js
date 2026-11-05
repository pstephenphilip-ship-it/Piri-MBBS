// build_A1.js — AQA GCSE Mathematics 8300, A1 Algebraic notation (one lesson, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A1.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A1', title: 'Algebraic notation' };
const D = T.init(DECK);
const { frame, notes, txt, rect, hline, vline, math, MX, W } = D;

// ======================= numbers (all checked) =======================
calc('Do Now 1: 4+4+4', 4 + 4 + 4, 3 * 4);
calc('Do Now 2: 5^2', 5 ** 2, 25);
calc('Do Now 3: 2^3', 2 ** 3, 8);
calc('Do Now 4: 12/4', 12 / 4, 3);
const y = 2;
calc('3y at y=2', 3 * y, 6);
calc('y^3 at y=2', y ** 3, 8);
const x = 4;
calc('3(x+2) at x=4', 3 * (x + 2), 18);
calc('3x+2 at x=4', 3 * x + 2, 14);
calc('area model 3x + 6 at x=4', 3 * x + 6, 3 * (x + 2));
calc('2a vs a^2 at a=2', 2 * 2, 2 ** 2);
calc('2a vs a^2 at a=0', 2 * 0, 0 ** 2);
calc('2a vs a^2 at a=3 differ', 2 * 3 === 3 ** 2 ? 1 : 0, 0);
calc('a^2 < a at a=0.5', 0.5 ** 2 < 0.5 ? 1 : 0, 1);
calc('perimeter x by 3 at x=5', 5 + 3 + 5 + 3, 2 * 5 + 6);
calc('P6 2x at 5', 2 * 5, 10);
calc('P6 x^2 at 5', 5 ** 2, 25);
calc('P7 0.25t = t/4', 0.25 * 8, 8 / 4);
calc('P8 perimeter 2x by x at x=3', 2 * (2 * 3) + 2 * 3, 6 * 3);
calc('P8 area at x=3', 2 * 3 * 3, 2 * 3 ** 2);
calc('exam (c) 3 pencils 2 rulers', 20 * 3 + 45 * 2, 150);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Writing and reading algebra the way mathematicians do',
  bullets: ['Multiplying and dividing without the × and ÷ signs', 'Powers: a², a³ and a²b', 'Fractions and brackets in algebra'],
  notes: 'AQA 8300 A1: use and interpret algebraic notation, including ab in place of a × b; 3y in place of y + y + y and 3 × y; a² in place of a × a, a³ in place of a × a × a, a²b in place of a × a × b; a/b in place of a ÷ b; coefficients written as fractions rather than as decimals; brackets. Both tiers. One lesson (about 60 minutes).',
});

D.objectives({
  tag: 'A1',
  items: [
    'Write expressions without the **×** and **÷** signs.',
    'Tell the difference between **3y** and **y³**.',
    'Use **fractions** and **brackets** correctly in algebra.',
  ],
  keywords: ['variable', 'term', 'coefficient', 'expression', 'power'],
  notes: 'Share the objectives. Return to them at the exit ticket.',
});

D.doNow({
  qs: [
    'Write 4 + 4 + 4 as a multiplication.',
    'Work out 5².',
    'Work out 2³.',
    { q: 'Work out', math: [{ n: 12, d: 4 }] },
  ],
  answers: ['3 × 4', '5 × 5 = 25', '2 × 2 × 2 = 8', '12 ÷ 4 = 3'],
  notes: 'These are the number facts behind today\'s notation: repeated adding is multiplying (3y), repeated multiplying is a power (y³), and a fraction line means divide (a/b). Watch for 2³ = 6: that is the main misconception of the lesson.',
});

D.vocab({
  title: 'Key words', tag: 'A1',
  items: [
    { term: 'Variable', def: 'A letter that stands for a number that can change, e.g. **x** or **n**.' },
    { term: 'Term', def: 'A number, a letter, or numbers and letters multiplied together, e.g. **5**, **y**, **3ab**.' },
    { term: 'Coefficient', def: 'The number in front of the letters in a term. In **7x** the coefficient is **7**.' },
    { term: 'Expression', def: 'Terms joined by + or −, with no equals sign, e.g. **4x + 3y − 2**.' },
    { term: 'Power', def: 'How many times a number is multiplied by itself. In **a³** the power is **3**.' },
  ],
  notes: 'Students copy these. Ask for an example of each from the board.',
});

// Notation rules table
{
  const s = frame('The rules of algebra notation', { tag: 'A1' });
  const rows = [
    ['a × b', 'ab', 'leave out the × sign'],
    ['3 × y', '3y', 'number first'],
    ['y + y + y', '3y', 'three lots of y'],
    ['b × 4 × a', '4ab', 'number first, then letters in alphabetical order'],
    ['a × a', 'a²', 'a squared'],
    ['a × a × a', 'a³', 'a cubed'],
    ['a × a × b', 'a²b', 'two a\'s and one b'],
  ];
  const x0 = MX, cw = [3.0, 2.0, W - 2 * MX - 5.0], rh = 0.62, top = 1.4;
  rect(s, x0, top, W - 2 * MX, rh, C.maroon);
  ['Written out', 'In algebra', 'Why'].forEach((h, j) => txt(s, h, x0 + cw.slice(0, j).reduce((a, b) => a + b, 0) + 0.25, top, cw[j] - 0.3, rh, { size: 20, bold: true, color: C.white, valign: 'middle' }));
  rows.forEach((r, i) => {
    const yy = top + rh * (i + 1);
    rect(s, x0, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    txt(s, r[0], x0 + 0.25, yy, cw[0] - 0.3, rh, { size: 24, valign: 'middle' });
    txt(s, r[1], x0 + cw[0] + 0.25, yy, cw[1] - 0.3, rh, { size: 26, bold: true, color: C.maroon, valign: 'middle' });
    txt(s, r[2], x0 + cw[0] + cw[1] + 0.25, yy, cw[2] - 0.3, rh, { size: 19, color: C.grey, valign: 'middle' });
  });
  notes(s, 'Go through each row. Key habits: numbers before letters (3y, not y3), letters in alphabetical order (4ab, not 4ba), and powers for repeated multiplying.');
}

// 3y or y³?
{
  const s = frame('3y or y³?', { tag: 'Common mistake' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 4.4;
  const panel = (x, head, sign, result, colour, soft) => {
    rect(s, x, top, cw, h, soft, colour);
    rect(s, x, top, cw, 0.65, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.65, { size: 26, bold: true, color: C.white, valign: 'middle' });
    // three y boxes joined by the sign
    const bw = 1.1, bx0 = x + (cw - (3 * bw + 2 * 0.7)) / 2, by = top + 1.0;
    for (let i = 0; i < 3; i++) {
      const bx = bx0 + i * (bw + 0.7);
      rect(s, bx, by, bw, 0.9, C.white, colour, { lw: 2 });
      txt(s, 'y', bx, by, bw, 0.9, { size: 32, bold: true, color: colour, align: 'center', valign: 'middle' });
      if (i < 2) txt(s, sign, bx + bw, by, 0.7, 0.9, { size: 30, bold: true, align: 'center', valign: 'middle' });
    }
    txt(s, `If y = 2:`, x + 0.4, top + 2.25, cw - 0.8, 0.5, { size: 22 });
    txt(s, result, x + 0.4, top + 2.85, cw - 0.8, 0.6, { size: 26, bold: true, color: colour });
  };
  panel(MX, '3y  means  y + y + y', '+', '3y = 2 + 2 + 2 = 6', C.maroon, C.soft);
  panel(MX + cw + gap, 'y³  means  y × y × y', '×', 'y³ = 2 × 2 × 2 = 8', C.orange, C.orangeSoft);
  rect(s, MX, 6.0, W - 2 * MX, 0.8, C.greyLight);
  txt(s, 'They are **different**. 3y is three lots of y. y³ is y multiplied by itself three times.', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.8, { size: 21, valign: 'middle' });
  notes(s, 'With y = 2: 3y = 6 but y³ = 8. Ask: is there a value of y where 3y and y³ are equal? (y = 0, or y = √3, which is about 1.73: a stretch question.)');
}

D.hinge({
  title: 'Quick check',
  q: 'Which one of these means m × m × m?',
  options: ['3m', 'm³', 'm + 3', '3m³'],
  correct: 1,
  notes: 'Answer B, m³. Students choosing A are confusing a power with a multiple; go back to the 3y or y³ slide. Students choosing D have mixed the two.',
});

// Fractions
{
  const s = frame('Dividing: use a fraction', { tag: 'A1' });
  const lines = [
    [['a ÷ b  is written  ', { n: 'a', d: 'b' }], 'The fraction line means divide.'],
    [['x ÷ 2  is written  ', { n: 'x', d: 2 }, '   or   ', { n: 1, d: 2 }, 'x'], 'Half of x. Both ways are correct.'],
    [['(x + 1) ÷ 3  is written  ', { n: 'x + 1', d: 3 }], 'The whole of the top is divided by 3.'],
  ];
  let yy = 2.05;
  lines.forEach(([m, why]) => {
    math(s, MX + 0.3, yy, m, { size: 28 });
    txt(s, why, 8.4, yy - 0.25, W - MX - 8.4, 0.6, { size: 19, color: C.grey });
    yy += 1.45;
  });
  rect(s, MX, 5.85, W - 2 * MX, 0.95, C.orangeSoft, 'F3D9B5');
  math(s, MX + 0.3, 6.32, ['Write  ', { n: 1, d: 2 }, 'x  or  ', { n: 'x', d: 2 }, ',  not  0.5x.   Coefficients are written as fractions, not decimals.'], { size: 21 });
  notes(s, 'The AQA statement says coefficients are written as fractions rather than decimals, so 0.5x should be written ½x or x/2. Stress that in (x + 1)/3 the whole of x + 1 is divided by 3: it is NOT x + 1/3.');
}

// Brackets with area model
{
  const s = frame('Brackets', { tag: 'A1' });
  txt(s, '**3(x + 2)** means **3 × (x + 2)**: three lots of x + 2.', MX, 1.35, W - 2 * MX, 0.55, { size: 24 });
  // area model: height 3, widths x and 2
  const ox = MX + 0.9, oy = 2.35, hgt = 2.4, wx = 3.6, w2 = 1.6;
  rect(s, ox, oy, wx, hgt, C.soft, C.maroon, { lw: 2 });
  rect(s, ox + wx, oy, w2, hgt, C.orangeSoft, C.orange, { lw: 2 });
  txt(s, 'x', ox, oy - 0.55, wx, 0.5, { size: 26, bold: true, align: 'center' });
  txt(s, '2', ox + wx, oy - 0.55, w2, 0.5, { size: 26, bold: true, align: 'center' });
  txt(s, '3', ox - 0.6, oy, 0.5, hgt, { size: 26, bold: true, align: 'center', valign: 'middle' });
  txt(s, '3x', ox, oy, wx, hgt, { size: 32, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  txt(s, '6', ox + wx, oy, w2, hgt, { size: 32, bold: true, color: C.orange, align: 'center', valign: 'middle' });
  txt(s, 'Area = 3(x + 2) = 3x + 6', ox, oy + hgt + 0.2, wx + w2, 0.5, { size: 22, bold: true, align: 'center' });
  const bx = 7.6, bw = W - MX - bx;
  rect(s, bx, 2.0, bw, 4.8, C.greyLight);
  txt(s, 'Brackets change the meaning', bx + 0.3, 2.15, bw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  txt(s, 'If x = 4:', bx + 0.3, 2.8, bw - 0.6, 0.5, { size: 21 });
  txt(s, '3(x + 2) = 3 × 6 = **18**', bx + 0.3, 3.4, bw - 0.6, 0.5, { size: 22 });
  txt(s, '3x + 2 = 12 + 2 = **14**', bx + 0.3, 4.0, bw - 0.6, 0.5, { size: 22 });
  txt(s, 'Brackets are worked out first.', bx + 0.3, 4.8, bw - 0.6, 0.5, { size: 20 });
  txt(s, '(a + b)² means (a + b) × (a + b)', bx + 0.3, 5.4, bw - 0.6, 0.5, { size: 20, bold: true });
  notes(s, 'The area model previews expanding brackets (A4). At x = 4: 3(x + 2) = 18 but 3x + 2 = 14, so the brackets matter. (a + b)² is not a² + b²; full expansion comes later.');
}

// My turn / your turn: write in algebra
D.myTurnYourTurn({
  title: 'Writing in algebra', tag: 'A1', stepSize: 24, labelW: 3.0, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Write these in algebra.',
    steps: [
      { label: '5 × p × q', text: '**5pq**' },
      { label: 'n × n × 4', text: '**4n²**' },
      { label: 'y × 3 × x', text: '**3xy**' },
      { label: 'a ÷ 4', math: [{ n: 'a', d: 4 }], bold: true },
    ],
  },
  yours: {
    q: 'Write these in algebra.',
    steps: [
      { label: '7 × a × b', text: '**7ab**' },
      { label: 't × t × t × 2', text: '**2t³**' },
      { label: 'c × 5 × b', text: '**5bc**' },
      { label: '(x + 3) ÷ 2', math: [{ n: 'x + 3', d: 2 }], bold: true },
    ],
  },
  notes: 'Model the habit: number first, then letters in alphabetical order, then powers for repeated letters. In the last one the bracket shows that the whole of x + 3 is divided by 2.',
});

// My turn / your turn: words to algebra
D.myTurnYourTurn({
  title: 'From words to algebra', tag: 'A1', stepSize: 24, labelW: 3.0, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Write an expression for each.',
    steps: [
      { label: '5 more than n', text: '**n + 5**' },
      { label: 'n less than 5', text: '**5 − n**' },
      { label: 'double n, then add 3', text: '**2n + 3**' },
      { label: 'add 3, then double', text: '**2(n + 3)**' },
    ],
  },
  yours: {
    q: 'Write an expression for each.',
    steps: [
      { label: '4 less than k', text: '**k − 4**' },
      { label: 'k squared', text: '**k²**' },
      { label: 'treble k, then subtract 1', text: '**3k − 1**' },
      { label: 'half of k', math: [{ n: 'k', d: 2 }, '  or  ', { n: 1, d: 2 }, 'k'], bold: true },
    ],
  },
  notes: 'Watch the order in "n less than 5": it is 5 − n, not n − 5. "Add 3, then double" needs a bracket because the adding happens first.',
});

// Always, sometimes, never
{
  const qs = ['2a is the same as a².', 'a + a is the same as 2a.', 'ab is the same as ba.', 'a² is bigger than a.'];
  const ans = ['Sometimes: true when a = 0 or a = 2, false when a = 3.', 'Always: two lots of a.', 'Always: 3 × 5 = 5 × 3.', 'Sometimes: false when a = 1, and when a = 0.5 (0.5² = 0.25).'];
  for (const reveal of [false, true]) {
    const s = frame(reveal ? 'Always, sometimes or never: answers' : 'Always, sometimes or never?', { tag: 'Reasoning' });
    if (reveal) D.qCards(s, ans, { cols: 2, size: 22, color: C.green, bold: true });
    else D.qCards(s, qs, { cols: 2, size: 26 });
    notes(s, 'Students must justify with examples. 2a = a² only for a = 0 or a = 2. a² > a fails for 0 ≤ a ≤ 1.');
  }
}

// Expressions from a context
{
  const s = frame('Expressions from a picture', { tag: 'A1' });
  const ox = MX + 0.6, oy = 1.9, rw = 4.2, rh2 = 2.0;
  rect(s, ox, oy, rw, rh2, C.soft, C.maroon, { lw: 2.5 });
  txt(s, 'x', ox, oy - 0.55, rw, 0.5, { size: 26, bold: true, align: 'center' });
  txt(s, '3', ox + rw + 0.1, oy, 0.5, rh2, { size: 26, bold: true, valign: 'middle' });
  txt(s, 'A rectangle is x cm long and 3 cm wide.', MX, 4.3, 6.2, 0.5, { size: 20 });
  txt(s, 'Perimeter = x + 3 + x + 3 = **2x + 6** cm', MX, 4.95, 6.6, 0.5, { size: 21 });
  txt(s, 'Area = x × 3 = **3x** cm²', MX, 5.6, 6.2, 0.5, { size: 21 });
  const bx = 7.7, bw = W - MX - bx;
  rect(s, bx, 1.5, bw, 5.3, C.greyLight);
  txt(s, 'More examples', bx + 0.3, 1.65, bw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  const ex = [['n pens at 45p each', '45n pence'], ['a square with side k', 'area k²'], ['£20 shared equally by m people', '20/m pounds each'], ['5 years older than Ali, who is a', 'a + 5']];
  ex.forEach(([q, a], i) => {
    txt(s, q, bx + 0.3, 2.35 + i * 1.1, bw - 0.6, 0.5, { size: 19 });
    txt(s, a, bx + 0.3, 2.8 + i * 1.1, bw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  });
  notes(s, 'Perimeter: 2x + 6, which can also be written 2(x + 3). Check with x = 5: 5 + 3 + 5 + 3 = 16 = 2 × 5 + 6.');
}

// Practice
{
  const qs = [
    'Write in algebra:  4 × a × b',
    'Write in algebra:  m × m × 6',
    'Write in algebra:  y × 2 × x × x',
    'Write in algebra:  p ÷ 5',
    'Write an expression for: subtract 4 from n, then multiply by 3.',
    'When x = 5, which is bigger, 2x or x²? Show how you know.',
    'Ali writes 0.25t. Write this the way AQA expects.',
    'A rectangle is 2x long and x wide. Write expressions for its perimeter and its area.',
  ];
  const ans = ['4ab', '6m²', '2x²y', 'p/5', '3(n − 4)', '2x = 10, x² = 25, so x² is bigger', 't/4', 'Perimeter 6x, area 2x²'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 26, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 4ab 2) 6m² 3) 2x²y (number first, letters in order) 4) p/5 5) 3(n − 4) 6) 2x = 10, x² = 25, so x² 7) t/4 (also accept ¼t) 8) perimeter 2x + x + 2x + x = 6x; area 2x × x = 2x².');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 5 marks', size: 21, lineGap: 0.45,
  parts: [
    { l: 'a', q: 'Simplify  m × m × m', m: 1, lines: 1 },
    { l: 'b', q: 'Simplify  5 × a × b × a', m: 1, lines: 1 },
    { l: 'c', q: 'Pencils cost 20p each and rulers cost 45p each. Write an expression for the cost, in pence, of x pencils and y rulers.', m: 2, lines: 1 },
    { l: 'd', q: 'Jo says, "4n means n + 4." Explain why Jo is wrong.', m: 1, lines: 1 },
  ],
  total: 5,
  scheme: [
    ['(a)', 'm³', 'B1', ''],
    ['(b)', '5a²b', 'B1', 'Accept 5ba² etc.'],
    ['(c)', '20x + 45y', 'B2', 'B1 for 20x or 45y seen'],
    ['(d)', '4n means 4 × n (or n + n + n + n)', 'B1', 'Or a counter-example, e.g. n = 1: 4 ≠ 5'],
  ],
  notes: 'Mark scheme on the next slide. Check of (c): 3 pencils and 2 rulers cost 20 × 3 + 45 × 2 = 150p.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Write  c × c  in algebra.', 'Write  3 × q × p  in algebra.', 'What does 2(x + 1) mean?', 'Write "half of y" in two different ways.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) c² 2) 3pq 3) 2 × (x + 1): two lots of x + 1 4) y/2 and ½y. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 20 minutes' });
  D.qCards(s, [
    'Write in algebra: (a) 8 × k  (b) a × a × a × a  (c) b × 2 × a × b',
    'Write as a fraction: (a) w ÷ 3  (b) (y − 2) ÷ 5',
    'Find the value of 3y and y³ when y = 4.',
    'Write an expression for: (a) 6 more than t  (b) t less than 6  (c) add 1 to t, then multiply by 4',
    'A square has side s cm. Write expressions for its perimeter and its area.',
    'Is 3n + 2 the same as 3(n + 2)? Use n = 1 to explain.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) 8k, a⁴, 2ab² 2) w/3, (y − 2)/5 3) 3y = 12, y³ = 64 4) t + 6, 6 − t, 4(t + 1) 5) perimeter 4s, area s² 6) No: 3n + 2 = 5 but 3(n + 2) = 9 when n = 1.');
}
calc('HW3 3y at 4', 3 * 4, 12); calc('HW3 y^3 at 4', 4 ** 3, 64);
calc('HW6 3n+2 at 1', 3 + 2, 5); calc('HW6 3(n+2) at 1', 3 * 3, 9);

D.save(path.join(__dirname, 'AQA_8300_A1_AlgebraicNotation.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
