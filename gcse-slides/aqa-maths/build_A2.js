// build_A2.js — AQA GCSE Mathematics 8300, A2 Substitution (one lesson, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A2.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A2', title: 'Substitution' };
const D = T.init(DECK);
const { frame, notes, txt, rect, math, MX, W } = D;

// ======================= numbers (all checked) =======================
calc('DN1 3+4x2', 3 + 4 * 2, 11);
calc('DN2 (3+4)x2', (3 + 4) * 2, 14);
calc('DN3 2x3^2', 2 * 3 ** 2, 18);
calc('DN4 -3x4', -3 * 4, -12);
calc('ex 3a+2b a=4 b=5', 3 * 4 + 2 * 5, 22);
calc('2x^2 at 3', 2 * 3 ** 2, 18);
calc('(2x)^2 at 3', (2 * 3) ** 2, 36);
const n = -3;
calc('x^2 at -3', n ** 2, 9);
calc('5-x at -3', 5 - n, 8);
calc('2x at -3', 2 * n, -6);
calc('x^3 at -3', n ** 3, -27);
calc('hinge2 a^2+3a at -2', (-2) ** 2 + 3 * -2, -2);
calc('mean (a+b)/2 7,11', (7 + 11) / 2, 9);
calc('v=u+at', 3 + 2 * 5, 13);
calc('speed 120/1.5', 120 / 1.5, 80);
calc('KE 1/2 m v^2', 0.5 * 4 * 3 ** 2, 18);
calc('F = 9C/5 + 32', 9 * 20 / 5 + 32, 68);
// My turn / your turn 1
calc('MT1 5p - 2q p=6 q=4', 5 * 6 - 2 * 4, 22);
calc('YT1 4m + 3n m=7 n=2', 4 * 7 + 3 * 2, 34);
calc('MT1b 3x^2 x=4', 3 * 4 ** 2, 48);
calc('YT1b 5y^2 y=2', 5 * 2 ** 2, 20);
// My turn / your turn 2 (negatives)
calc('MT2 x^2 - 4x at -2', (-2) ** 2 - 4 * -2, 12);
calc('YT2 y^2 + 5y at -3', (-3) ** 2 + 5 * -3, -6);
calc('MT2b 10 - 3t at -4', 10 - 3 * -4, 22);
calc('YT2b 7 - 2k at -5', 7 - 2 * -5, 17);
// formulae My/Your turn
calc('MT3 P = 2(l + w) l=8 w=5', 2 * (8 + 5), 26);
calc('YT3 A = (a+b)h/2 a=6 b=10 h=4', (6 + 10) * 4 / 2, 32);
// practice
calc('P1 4a + b a=3 b=7', 4 * 3 + 7, 19);
calc('P2 ab - c a=5 b=6 c=8', 5 * 6 - 8, 22);
calc('P3 2x^2 x=5', 2 * 25, 50);
calc('P4 (p+q)/4 p=9 q=11', (9 + 11) / 4, 5);
calc('P5 x^2 + 2x at -4', 16 - 8, 8);
calc('P6 s = ut + 1/2 a t^2 u=2 t=4 a=3', 2 * 4 + 0.5 * 3 * 16, 32);
calc('P7 2x^2 vs (2x)^2 at 1', 2 * 1, 2);
calc('P8 C = 30 + 12h h=5', 30 + 12 * 5, 90);
calc('P8 reverse 30+12h=126', (126 - 30) / 12, 8);
// exam
calc('exam a T = 40w + 20 w=3', 40 * 3 + 20, 140);
calc('exam b P = 2(l + w) l=7.5 w=4', 2 * (7.5 + 4), 23);
calc('exam c a^2 - 2a at -4', 16 + 8, 24);
// exit, homework
calc('exit 6x - y x=3 y=5', 18 - 5, 13);
calc('exit 3n^2 n=2', 12, 12);
calc('exit 8 - x at -2', 8 + 2, 10);
calc('hw2 4ab a=2 b=-3', 4 * 2 * -3, -24);
calc('hw3 v = u + at u=10 a=-2 t=3', 10 + -2 * 3, 4);
calc('hw4 m^2 - 3m at -1', 1 + 3, 4);
calc('hw5 F = 9C/5 + 32 C=35', 9 * 35 / 5 + 32, 95);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Putting numbers into expressions and formulae',
  bullets: ['Replace each letter with its value', 'Order of operations, powers and negatives', 'Using formulae from maths and science'],
  notes: 'AQA 8300 A2: substitute numerical values into formulae and expressions, including scientific formulae. Both tiers. One lesson (about 60 minutes). Builds directly on A1 notation.',
});

D.objectives({
  tag: 'A2',
  items: [
    '**Substitute** numbers into expressions and work out the value.',
    'Use the **order of operations** with powers and brackets.',
    'Substitute **negative numbers** and use **formulae** from maths and science.',
  ],
  keywords: ['substitute', 'evaluate', 'expression', 'formula', 'order of operations'],
  notes: 'Share the objectives. Return to them at the exit ticket.',
});

D.doNow({
  qs: ['Work out  3 + 4 × 2', 'Work out  (3 + 4) × 2', 'Work out  2 × 3²', 'Work out  −3 × 4'],
  answers: ['11', '14', '2 × 9 = 18', '−12'],
  notes: 'Order of operations: multiply before adding (11, not 14), brackets first (14), powers before multiplying (18, not 36), and a negative times a positive is negative. These are exactly the skills needed to substitute correctly.',
});

D.vocab({
  title: 'Key words', tag: 'A2',
  items: [
    { term: 'Substitute', def: 'Replace a letter with a **number**.' },
    { term: 'Evaluate', def: 'Work out the **value** of an expression.' },
    { term: 'Expression', def: 'Terms joined by + or −, with no equals sign, e.g. **3a + 2b**.' },
    { term: 'Formula', def: 'A rule linking two or more letters, with an equals sign, e.g. **P = 2(l + w)**.' },
    { term: 'Order of operations', def: '**B**rackets, **I**ndices (powers), **D**ivide and **M**ultiply, **A**dd and **S**ubtract.' },
  ],
  notes: 'Students copy these. A formula has an equals sign and a subject; an expression does not.',
});

// Method slide
{
  const s = frame('How to substitute', { tag: 'A2' });
  txt(s, 'Work out  **3a + 2b**  when  **a = 4**  and  **b = 5**.', MX, 1.4, W - 2 * MX, 0.6, { size: 26 });
  const stepsL = [
    ['1', 'Write the expression with the × signs back in.', '3 × a + 2 × b'],
    ['2', 'Put each number in, in brackets.', '3 × (4) + 2 × (5)'],
    ['3', 'Use the order of operations.', '12 + 10'],
    ['4', 'Answer.', '22'],
  ];
  let y = 2.3;
  stepsL.forEach(([k, d, m], i) => {
    D.circle(s, MX + 0.35, y + 0.35, 0.6, C.accent);
    txt(s, k, MX + 0.05, y + 0.05, 0.6, 0.6, { size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, d, MX + 0.95, y, 6.3, 0.75, { size: 21, valign: 'middle' });
    rect(s, 7.6, y, W - MX - 7.6, 0.75, i === 3 ? C.greenSoft : C.soft, i === 3 ? C.green : C.line);
    txt(s, m, 7.9, y, W - MX - 8.2, 0.75, { size: 28, bold: true, color: i === 3 ? C.green : C.maroon, valign: 'middle' });
    y += 1.05;
  });
  notes(s, '3 × 4 + 2 × 5 = 12 + 10 = 22. Writing the number in brackets is the habit that prevents mistakes with negatives later. A common error is 34 + 25 (writing the digits next to each other): remind students that 3a means 3 × a.');
}

// 2x² vs (2x)²
{
  const s = frame('Powers: 2x² or (2x)²?', { tag: 'Common mistake' });
  txt(s, 'When  **x = 3**:', MX, 1.4, W - 2 * MX, 0.5, { size: 24 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.1, h = 3.6;
  const panel = (x, head, l1, l2, l3, colour, soft) => {
    rect(s, x, top, cw, h, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 28, bold: true, color: C.white, valign: 'middle' });
    txt(s, l1, x + 0.4, top + 1.0, cw - 0.8, 0.6, { size: 22 });
    txt(s, l2, x + 0.4, top + 1.75, cw - 0.8, 0.6, { size: 26 });
    txt(s, l3, x + 0.4, top + 2.55, cw - 0.8, 0.7, { size: 32, bold: true, color: colour });
  };
  panel(MX, '2x²', 'Only the x is squared.', '2 × 3²  =  2 × 9', '= 18', C.maroon, C.soft);
  panel(MX + cw + gap, '(2x)²', 'Everything in the bracket is squared.', '(2 × 3)²  =  6²', '= 36', C.orange, C.orangeSoft);
  rect(s, MX, 6.0, W - 2 * MX, 0.8, C.greyLight);
  txt(s, 'Powers come **before** multiplying: square first, then multiply by 2.', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.8, { size: 22, valign: 'middle' });
  notes(s, '2x² = 2 × 9 = 18. (2x)² = 6² = 36. Most students who get 36 for 2x² have multiplied first. Link back to the Do Now question 2 × 3².');
}

D.hinge({
  title: 'Quick check',
  q: 'When x = 3, what is the value of 2x²?',
  options: ['36', '18', '12', '81'],
  correct: 1,
  notes: 'Answer B, 18. A (36) squared 2x. C (12) did 2 × 3 × 2. D (81) did 3⁴ or (3²)². Re-teach from the previous slide if many choose A.',
});

// Negatives
{
  const s = frame('Substituting negative numbers', { tag: 'A2' });
  txt(s, 'When  **x = −3**, put the −3 in **brackets**:', MX, 1.4, W - 2 * MX, 0.55, { size: 24 });
  const rows = [
    ['x²', '(−3)²  =  (−3) × (−3)', '9', 'negative × negative = positive'],
    ['5 − x', '5 − (−3)  =  5 + 3', '8', 'subtracting a negative = adding'],
    ['2x', '2 × (−3)', '−6', ''],
    ['x³', '(−3) × (−3) × (−3)', '−27', 'odd power of a negative is negative'],
  ];
  const cw = [1.6, 5.0, 1.3, W - 2 * MX - 7.9], rh = 0.85, top = 2.1;
  rows.forEach((r, i) => {
    const yy = top + i * (rh + 0.12);
    rect(s, MX, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    let xx = MX;
    r.forEach((c, j) => {
      txt(s, c, xx + 0.25, yy, cw[j] - 0.3, rh, { size: j === 3 ? 18 : 26, bold: j === 0 || j === 2, color: j === 2 ? C.green : j === 3 ? C.grey : C.ink, valign: 'middle' });
      xx += cw[j];
    });
  });
  rect(s, MX, 6.35, W - 2 * MX, 0.55, C.orangeSoft, 'F3D9B5');
  txt(s, 'Careful: on many calculators  −3²  gives −9. Type  (−3)²  to get 9.', MX + 0.3, 6.35, W - 2 * MX - 0.6, 0.55, { size: 19, valign: 'middle' });
  notes(s, 'x² = 9, 5 − x = 8, 2x = −6, x³ = −27. The calculator point matters: −3² is read as −(3²) = −9, so brackets are needed.');
}

D.hinge({
  title: 'Quick check',
  q: 'When a = −2, what is the value of a² + 3a?',
  options: ['−2', '10', '−10', '2'],
  correct: 0,
  notes: 'Answer A: (−2)² + 3 × (−2) = 4 − 6 = −2. B (10) used a² = 4 and 3a = +6. C (−10) used a² = −4. D (2) used a² = −4 and 3a = +6.',
});

// My turn / your turn 1
D.myTurnYourTurn({
  title: 'Substitution practice', tag: 'A2', stepSize: 24, labelW: 2.0, labelSize: 18,
  mine: {
    q: 'Work out  5p − 2q  when p = 6 and q = 4.  Then work out  3x²  when x = 4.',
    steps: [
      { label: 'Substitute', text: '5 × (6) − 2 × (4)' },
      { label: 'Work out', text: '30 − 8 = **22**' },
      { label: 'Power first', text: '3 × 4² = 3 × 16' },
      { label: 'Answer', text: '**48**' },
    ],
  },
  yours: {
    q: 'Work out  4m + 3n  when m = 7 and n = 2.  Then work out  5y²  when y = 2.',
    steps: [
      { label: 'Substitute', text: '4 × (7) + 3 × (2)' },
      { label: 'Work out', text: '28 + 6 = **34**' },
      { label: 'Power first', text: '5 × 2² = 5 × 4' },
      { label: 'Answer', text: '**20**' },
    ],
  },
  notes: '5p − 2q = 30 − 8 = 22; 3x² = 3 × 16 = 48. Your turn: 4m + 3n = 28 + 6 = 34; 5y² = 5 × 4 = 20 (not 100).',
});

// My turn / your turn 2 negatives
D.myTurnYourTurn({
  title: 'Substituting negatives', tag: 'A2', stepSize: 24, labelW: 2.0, labelSize: 18,
  mine: {
    q: 'Work out  x² − 4x  when x = −2.  Then work out  10 − 3t  when t = −4.',
    steps: [
      { label: 'Substitute', text: '(−2)² − 4 × (−2)' },
      { label: 'Work out', text: '4 + 8 = **12**' },
      { label: 'Substitute', text: '10 − 3 × (−4)' },
      { label: 'Work out', text: '10 + 12 = **22**' },
    ],
  },
  yours: {
    q: 'Work out  y² + 5y  when y = −3.  Then work out  7 − 2k  when k = −5.',
    steps: [
      { label: 'Substitute', text: '(−3)² + 5 × (−3)' },
      { label: 'Work out', text: '9 − 15 = **−6**' },
      { label: 'Substitute', text: '7 − 2 × (−5)' },
      { label: 'Work out', text: '7 + 10 = **17**' },
    ],
  },
  notes: 'x² − 4x at −2: 4 − (−8) = 12. 10 − 3t at −4: 10 − (−12) = 22. Your turn: 9 + (−15) = −6, and 7 − (−10) = 17.',
});

// Formulae from maths and science
{
  const s = frame('Formulae from maths and science', { tag: 'A2' });
  const items = [
    ['Speed', ['s = ', { n: 'd', d: 't' }], 'd = 120 km, t = 1.5 h', ['s = ', { n: 120, d: 1.5 }, ' = 80 km/h']],
    ['Velocity', ['v = u + at'], 'u = 3, a = 2, t = 5', ['v = 3 + 2 × 5 = 13 m/s']],
    ['Kinetic energy', ['E = ', { n: 1, d: 2 }, 'mv²'], 'm = 4, v = 3', ['E = ', { n: 1, d: 2 }, ' × 4 × 3² = 18 J']],
    ['Temperature', ['F = ', { n: '9C', d: 5 }, ' + 32'], 'C = 20', ['F = ', { n: '9 × 20', d: 5 }, ' + 32 = 68']],
  ];
  const rh = 1.25, top = 1.4;
  items.forEach(([nm, f, given, work], i) => {
    const yy = top + i * (rh + 0.1);
    rect(s, MX, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    txt(s, nm, MX + 0.25, yy, 2.2, rh, { size: 20, bold: true, color: C.maroon, valign: 'middle' });
    math(s, MX + 2.5, yy + rh / 2, f, { size: 24 });
    txt(s, given, MX + 5.2, yy, 2.9, rh, { size: 18, color: C.grey, valign: 'middle' });
    math(s, MX + 8.2, yy + rh / 2, work, { size: 22, bold: true });
  });
  notes(s, 'Speed 120 ÷ 1.5 = 80 km/h. v = 3 + 10 = 13 m/s. E = 0.5 × 4 × 9 = 18 J (square v first). F = 180 ÷ 5 + 32 = 36 + 32 = 68 °F. AQA expects students to substitute into formulae they are given, including ones from science.');
}

// My turn / your turn 3 formulae
D.myTurnYourTurn({
  title: 'Using a formula', tag: 'A2', stepSize: 24, labelW: 2.0, labelSize: 18,
  mine: {
    q: 'The perimeter of a rectangle is  P = 2(l + w).  Find P when l = 8 and w = 5.',
    steps: [
      { label: 'Substitute', text: 'P = 2 × (8 + 5)' },
      { label: 'Bracket first', text: 'P = 2 × 13' },
      { label: 'Answer', text: '**P = 26**' },
    ],
  },
  yours: {
    q: 'The area of a trapezium is  A = ½(a + b)h.  Find A when a = 6, b = 10 and h = 4.',
    steps: [
      { label: 'Substitute', text: 'A = ½ × (6 + 10) × 4' },
      { label: 'Bracket first', text: 'A = ½ × 16 × 4' },
      { label: 'Answer', text: '**A = 32**' },
    ],
  },
  notes: 'P = 2 × 13 = 26. A = ½ × 16 × 4 = 32. Remind students to give units when the question has them.',
});

// Practice
{
  const qs = [
    'Work out  4a + b  when a = 3 and b = 7.',
    'Work out  ab − c  when a = 5, b = 6 and c = 8.',
    'Work out  2x²  when x = 5.',
    'Work out  (p + q) ÷ 4  when p = 9 and q = 11.',
    'Work out  x² + 2x  when x = −4.',
    'Use  s = ut + ½at²  to find s when u = 2, t = 4 and a = 3.',
    'Sam says 2x² and (2x)² always give different answers. Is he right?',
    'A plumber charges C = 30 + 12h pounds for h hours. (a) Find C when h = 5. (b) A bill is £126. How many hours?',
  ];
  const ans = ['19', '30 − 8 = 22', '2 × 25 = 50', '20 ÷ 4 = 5', '16 − 8 = 8', '8 + 24 = 32', 'No: when x = 0 both are 0', '(a) £90  (b) 8 hours'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: negatives, formulae and reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl.split(':')[0] + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 26, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 23, start: k });
    notes(s, 'Answers: 1) 12 + 7 = 19  2) 30 − 8 = 22  3) 2 × 25 = 50  4) 20 ÷ 4 = 5  5) 16 + (−8) = 8  6) 2 × 4 + ½ × 3 × 16 = 8 + 24 = 32  7) No: at x = 0 both are 0 (they differ for every other x)  8) (a) 30 + 60 = £90  (b) 126 − 30 = 96, 96 ÷ 12 = 8 hours.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 7 marks', size: 21, lineGap: 0.45,
  parts: [
    { l: 'a', q: 'The time, T minutes, to cook a chicken is  T = 40w + 20, where w is its mass in kg. Work out T when w = 3.', m: 2, lines: 1 },
    { l: 'b', q: 'Work out the value of  2(l + w)  when l = 7.5 and w = 4.', m: 2, lines: 1 },
    { l: 'c', q: 'Work out the value of  a² − 2a  when a = −4.', m: 2, lines: 1 },
    { l: 'd', q: 'Kim says, "When x = −5, x² = −25." Explain why Kim is wrong.', m: 1, lines: 1 },
  ],
  total: 7,
  scheme: [
    ['(a)', '40 × 3 + 20 = 140', 'M1 A1', 'M1 for 40 × 3 + 20'],
    ['(b)', '2 × 11.5 = 23', 'M1 A1', 'M1 for 7.5 + 4 or 15 + 8'],
    ['(c)', '16 + 8 = 24', 'M1 A1', 'M1 for (−4)² − 2 × (−4) or 16 seen'],
    ['(d)', '(−5) × (−5) = +25', 'B1', 'Negative × negative is positive'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Work out  6x − y  when x = 3 and y = 5.', 'Work out  3n²  when n = 2.', 'Work out  8 − x  when x = −2.', 'Which is bigger when x = 4: 3x or x²?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) 18 − 5 = 13  2) 3 × 4 = 12  3) 8 − (−2) = 10  4) 3x = 12, x² = 16, so x² is bigger. Revisit the objectives.');
}
calc('exit4 3x at 4', 12, 12); calc('exit4 x^2 at 4', 16, 16);

{
  const s = frame('Homework', { tag: 'About 20 minutes' });
  D.qCards(s, [
    'Work out the value of  7p − 3q  when p = 4 and q = 5.',
    'Work out  4ab  when a = 2 and b = −3.',
    'Use  v = u + at  to find v when u = 10, a = −2 and t = 3.',
    'Work out  m² − 3m  when m = −1.',
    'Use  F = 9C/5 + 32  to change 35 °C to °F.',
    'Find a value of x for which x² is smaller than x.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 28 − 15 = 13  2) 4 × 2 × (−3) = −24  3) 10 + (−6) = 4  4) 1 + 3 = 4  5) 63 + 32 = 95 °F  6) any x between 0 and 1, e.g. x = 0.5 gives 0.25.');
}
calc('hw1 7p - 3q', 28 - 15, 13);

D.save(path.join(__dirname, 'AQA_8300_A2_Substitution.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
