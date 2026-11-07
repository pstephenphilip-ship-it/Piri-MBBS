// build_A1to3.js — AQA GCSE Mathematics 8300, A1–A3 Algebra basics (one combined deck, about 2 hours, both tiers)
// A1 algebraic notation, A2 substitution, A3 algebraic vocabulary.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A1to3.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A1–A3', title: 'Algebra basics' };
const D = T.init(DECK);
const { frame, notes, txt, rect, hline, vline, circle, math, MX, W } = D;

// ======================= numbers (all checked) =======================
calc('DN1', 4 + 4 + 4, 3 * 4); calc('DN2', 2 ** 3, 8); calc('DN3', 3 + 4 * 2, 11); calc('DN4', -3 * 4, -12);
calc('3y at 2', 3 * 2, 6); calc('y^3 at 2', 2 ** 3, 8);
calc('3(x+2) at 4', 3 * 6, 18); calc('3x+2 at 4', 14, 3 * 4 + 2);
calc('sub 3a+2b', 3 * 4 + 2 * 5, 22);
calc('2x^2 at 3', 2 * 9, 18); calc('(2x)^2 at 3', 36, (2 * 3) ** 2);
calc('x^2 at -3', (-3) ** 2, 9); calc('5-x at -3', 5 - -3, 8); calc('2x at -3', 2 * -3, -6); calc('x^3 at -3', (-3) ** 3, -27);
calc('hinge a^2+3a at -2', (-2) ** 2 + 3 * -2, -2);
calc('speed', 120 / 1.5, 80); calc('v=u+at', 3 + 2 * 5, 13); calc('KE', 0.5 * 4 * 9, 18); calc('F', 9 * 20 / 5 + 32, 68);
calc('MT2 5p-2q', 5 * 6 - 2 * 4, 22); calc('MT2 3x^2 x=4', 3 * 16, 48); calc('MT2 x^2-4x x=-2', 4 + 8, 12); calc('MT2 P', 2 * (8 + 5), 26);
calc('YT2 4m+3n', 28 + 6, 34); calc('YT2 5y^2 y=2', 20, 5 * 4); calc('YT2 y^2+5y y=-3', 9 - 15, -6); calc('YT2 A', 0.5 * (6 + 10) * 4, 32);
for (const v of [1, 5, -2, 10]) calc(`identity ${v}`, 2 * (v + 3), 2 * v + 6);
calc('equation x=3', 2 * 3 + 3, 9);
calc('P2', 5 * 6 - 2 * 4, 22); calc('P3', 16 - 8, 8); calc('P6', 2 * 4 + 0.5 * 3 * 16, 32);
calc('P7 2x^2=(2x)^2 only 0', 2 * 0, (2 * 0) ** 2); calc('P8 n=1', 5 * 1 + 1, 6); calc('P8 n=1 b', 5 * 2, 10);
calc('exam b', 16 + 8, 24); calc('exam c', 40 * 3 + 20, 140);
calc('exit 3n^2', 3 * 4, 12); calc('exit 8-x', 8 + 2, 10);
calc('HW2 3y', 12, 3 * 4); calc('HW2 y^3', 64, 4 ** 3); calc('HW3 4ab', 4 * 2 * -3, -24); calc('HW4 v', 10 + -2 * 3, 4); calc('HW5b k', (9 - 1) / 2, 4);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Notation, substitution and the language of algebra',
  bullets: ['Part 1: writing algebra (A1)', 'Part 2: substitution (A2)', 'Part 3: expressions, equations, formulae and identities (A3)'],
  notes: 'AQA 8300 A1: use and interpret algebraic notation. A2: substitute numerical values into formulae and expressions, including scientific formulae. A3: understand and use the vocabulary of expressions, equations, formulae, identities, inequalities, terms and factors. About two hours: a natural break comes at the start of Part 2 or Part 3. Both tiers.',
});

D.objectives({
  tag: 'A1–A3',
  items: [
    'Write expressions without **×** and **÷** signs, and tell **3y** from **y³**.',
    '**Substitute** numbers, including **negatives**, into expressions and formulae.',
    'Tell an **expression**, **equation**, **formula**, **identity** and **inequality** apart.',
  ],
  keywords: ['term', 'coefficient', 'expression', 'substitute', 'formula', 'identity'],
  notes: 'Share the objectives. Each part ends with a My turn / Your turn so you can check before moving on.',
});

D.doNow({
  qs: ['Write  4 + 4 + 4  as a multiplication.', 'Work out  2³', 'Work out  3 + 4 × 2', 'Work out  −3 × 4'],
  answers: ['3 × 4', '2 × 2 × 2 = 8', '11', '−12'],
  notes: 'Repeated adding is multiplying (3y), repeated multiplying is a power (y³), order of operations and negatives are needed for substitution. Watch for 2³ = 6 and 3 + 4 × 2 = 14.',
});

D.vocab({
  title: 'Key words', tag: 'A1–A3',
  items: [
    { term: 'Term', def: 'A number, a letter, or numbers and letters multiplied, e.g. **5**, **y**, **−3ab**.' },
    { term: 'Coefficient', def: 'The number in front of the letters. In **−3ab** it is **−3**.' },
    { term: 'Expression', def: 'Terms joined by + or −, with **no equals sign**, e.g. **3a + 2b**.' },
    { term: 'Substitute', def: 'Replace a letter with a **number** and work out the value.' },
  ],
  notes: 'Equation, formula, identity and inequality are introduced in Part 3.',
});

// ---------------- Part 1: notation ----------------
{
  const s = frame('Part 1: writing algebra', { tag: 'A1 notation' });
  const rows = [
    ['a × b', 'ab', 'leave out the × sign'],
    ['3 × y', '3y', 'number first'],
    ['y + y + y', '3y', 'three lots of y'],
    ['b × 4 × a', '4ab', 'number first, then letters in alphabetical order'],
    ['a × a', 'a²', 'a squared'],
    ['a × a × b', 'a²b', 'two a\'s and one b'],
    ['a ÷ b', 'a/b', 'divide: write as a fraction'],
  ];
  const cw = [3.0, 2.0, W - 2 * MX - 5.0], rh = 0.62, top = 1.4;
  rect(s, MX, top, W - 2 * MX, rh, C.maroon);
  ['Written out', 'In algebra', 'Why'].forEach((h, j) => txt(s, h, MX + cw.slice(0, j).reduce((a, b) => a + b, 0) + 0.25, top, cw[j] - 0.3, rh, { size: 20, bold: true, color: C.white, valign: 'middle' }));
  rows.forEach((r, i) => {
    const yy = top + rh * (i + 1);
    rect(s, MX, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    txt(s, r[0], MX + 0.25, yy, cw[0] - 0.3, rh, { size: 24, valign: 'middle' });
    txt(s, r[1], MX + cw[0] + 0.25, yy, cw[1] - 0.3, rh, { size: 26, bold: true, color: C.maroon, valign: 'middle' });
    txt(s, r[2], MX + cw[0] + cw[1] + 0.25, yy, cw[2] - 0.3, rh, { size: 19, color: C.grey, valign: 'middle' });
  });
  notes(s, 'Key habits: numbers before letters (3y, not y3), letters in alphabetical order (4ab), powers for repeated multiplying, fractions for dividing.');
}

{
  const s = frame('3y or y³?', { tag: 'Common mistake' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 4.4;
  const panel = (x, head, sign, result, colour, soft) => {
    rect(s, x, top, cw, h, soft, colour);
    rect(s, x, top, cw, 0.65, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.65, { size: 26, bold: true, color: C.white, valign: 'middle' });
    const bw = 1.1, bx0 = x + (cw - (3 * bw + 2 * 0.7)) / 2, by = top + 1.0;
    for (let i = 0; i < 3; i++) {
      const bx = bx0 + i * (bw + 0.7);
      rect(s, bx, by, bw, 0.9, C.white, colour, { lw: 2 });
      txt(s, 'y', bx, by, bw, 0.9, { size: 32, bold: true, color: colour, align: 'center', valign: 'middle' });
      if (i < 2) txt(s, sign, bx + bw, by, 0.7, 0.9, { size: 30, bold: true, align: 'center', valign: 'middle' });
    }
    txt(s, 'If y = 2:', x + 0.4, top + 2.25, cw - 0.8, 0.5, { size: 22 });
    txt(s, result, x + 0.4, top + 2.85, cw - 0.8, 0.6, { size: 26, bold: true, color: colour });
  };
  panel(MX, '3y  means  y + y + y', '+', '3y = 2 + 2 + 2 = 6', C.maroon, C.soft);
  panel(MX + cw + gap, 'y³  means  y × y × y', '×', 'y³ = 2 × 2 × 2 = 8', C.orange, C.orangeSoft);
  rect(s, MX, 6.0, W - 2 * MX, 0.8, C.greyLight);
  txt(s, 'They are **different**: 3y is three lots of y; y³ is y multiplied by itself three times.', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.8, { size: 21, valign: 'middle' });
  notes(s, 'With y = 2: 3y = 6, y³ = 8. Stretch: when are they equal? (y = 0, or y = √3.)');
}

D.hinge({
  title: 'Quick check',
  q: 'Which one of these means m × m × m?',
  options: ['3m', 'm³', 'm + 3', '3m³'],
  correct: 1,
  notes: 'Answer B. A confuses a power with a multiple. D mixes the two.',
});

{
  const s = frame('Fractions and brackets', { tag: 'A1 notation' });
  const lines = [
    [['a ÷ b  =  ', { n: 'a', d: 'b' }], 'The fraction line means divide.'],
    [['x ÷ 2  =  ', { n: 'x', d: 2 }, '  or  ', { n: 1, d: 2 }, 'x'], 'Write ½x, not 0.5x.'],
    [['(x + 1) ÷ 3  =  ', { n: 'x + 1', d: 3 }], 'The whole top is divided by 3.'],
  ];
  let yy = 2.0;
  lines.forEach(([m, why]) => {
    math(s, MX + 0.2, yy, m, { size: 26 });
    txt(s, why, MX + 0.2, yy + 0.55, 6.3, 0.45, { size: 17, color: C.grey });
    yy += 1.6;
  });
  const bx = 7.3, bw = W - MX - bx;
  rect(s, bx, 1.45, bw, 5.35, C.greyLight);
  txt(s, 'Brackets', bx + 0.3, 1.6, bw - 0.6, 0.5, { size: 22, bold: true, color: C.maroon });
  txt(s, '3(x + 2) means 3 × (x + 2): three lots of x + 2.', bx + 0.3, 2.2, bw - 0.6, 0.9, { size: 20 });
  txt(s, 'If x = 4:', bx + 0.3, 3.25, bw - 0.6, 0.5, { size: 20 });
  txt(s, '3(x + 2) = 3 × 6 = **18**', bx + 0.3, 3.8, bw - 0.6, 0.5, { size: 22 });
  txt(s, '3x + 2 = 12 + 2 = **14**', bx + 0.3, 4.4, bw - 0.6, 0.5, { size: 22 });
  txt(s, 'Brackets change the meaning: work them out **first**.', bx + 0.3, 5.15, bw - 0.6, 1.0, { size: 20 });
  notes(s, 'AQA wants coefficients written as fractions, not decimals: ½x not 0.5x. In (x + 1)/3 the whole of x + 1 is divided by 3.');
}

D.myTurnYourTurn({
  title: 'Writing in algebra', tag: 'Part 1', stepSize: 24, labelW: 3.4, labelSize: 21, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Write in algebra:',
    steps: [
      { label: '5 × p × q', text: '**5pq**' },
      { label: 'n × n × 4', text: '**4n²**' },
      { label: 'a ÷ 4', math: [{ n: 'a', d: 4 }], bold: true },
      { label: 'n less than 5', text: '**5 − n**' },
      { label: 'add 3, then double', text: '**2(n + 3)**' },
    ],
  },
  yours: {
    q: 'Write in algebra:',
    steps: [
      { label: '7 × a × b', text: '**7ab**' },
      { label: 't × t × t × 2', text: '**2t³**' },
      { label: '(x + 3) ÷ 2', math: [{ n: 'x + 3', d: 2 }], bold: true },
      { label: '4 less than k', text: '**k − 4**' },
      { label: 'treble k, then subtract 1', text: '**3k − 1**' },
    ],
  },
  notes: 'Watch "n less than 5" = 5 − n, not n − 5. "Add 3, then double" needs a bracket because adding happens first.',
});

// ---------------- Part 2: substitution ----------------
{
  const s = frame('Part 2: substitution', { tag: 'A2 substitution' });
  txt(s, 'Work out  **3a + 2b**  when  **a = 4**  and  **b = 5**.', MX, 1.4, W - 2 * MX, 0.6, { size: 26 });
  const st = [
    ['Put the × signs back in.', '3 × a + 2 × b'],
    ['Put each number in, in brackets.', '3 × (4) + 2 × (5)'],
    ['Use the order of operations.', '12 + 10'],
    ['Answer.', '22'],
  ];
  st.forEach(([d, m], i) => {
    const y = 2.3 + i * 1.05;
    circle(s, MX + 0.35, y + 0.35, 0.6, C.accent);
    txt(s, String(i + 1), MX + 0.05, y + 0.05, 0.6, 0.6, { size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, d, MX + 0.95, y, 6.3, 0.75, { size: 21, valign: 'middle' });
    rect(s, 7.6, y, W - MX - 7.6, 0.75, i === 3 ? C.greenSoft : C.soft, i === 3 ? C.green : C.line);
    txt(s, m, 7.9, y, W - MX - 8.2, 0.75, { size: 28, bold: true, color: i === 3 ? C.green : C.maroon, valign: 'middle' });
  });
  notes(s, '3 × 4 + 2 × 5 = 22. Brackets around the numbers prevent mistakes with negatives. A common error is 34 + 25 (writing digits side by side).');
}

{
  const s = frame('Powers and negatives', { tag: 'Common mistakes' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 4.45, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.7, C.maroon);
  txt(s, '2x²  or  (2x)²  when x = 3', MX + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
  txt(s, '2x² = 2 × 3² = 2 × 9 = **18**', MX + 0.3, top + 1.0, cw - 0.6, 0.6, { size: 23 });
  txt(s, '(2x)² = (2 × 3)² = 6² = **36**', MX + 0.3, top + 1.8, cw - 0.6, 0.6, { size: 23 });
  txt(s, 'Powers come before multiplying: square first, then multiply.', MX + 0.3, top + 2.75, cw - 0.6, 1.2, { size: 19, color: C.grey });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 4.45, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.7, C.orange);
  txt(s, 'When x = −3, use brackets', x2 + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
  [['x² = (−3)² = ', '9'], ['5 − x = 5 − (−3) = ', '8'], ['2x = 2 × (−3) = ', '−6'], ['x³ = (−3)³ = ', '−27']].forEach(([a, b], i) => {
    txt(s, a + '**' + b + '**', x2 + 0.3, top + 0.95 + i * 0.8, cw - 0.6, 0.6, { size: 23 });
  });
  rect(s, MX, 6.05, W - 2 * MX, 0.8, C.greyLight);
  txt(s, 'Calculators read  −3²  as  −9. Type  **(−3)²**  to get 9.', MX + 0.3, 6.05, W - 2 * MX - 0.6, 0.8, { size: 21, valign: 'middle' });
  notes(s, '2x² = 18, (2x)² = 36. With x = −3: 9, 8, −6, −27. Negative × negative is positive; subtracting a negative is adding.');
}

D.hinge({
  title: 'Quick check',
  q: 'When a = −2, what is the value of a² + 3a?',
  options: ['−2', '10', '−10', '2'],
  correct: 0,
  notes: 'Answer A: 4 − 6 = −2. B: used 3a = +6. C: used a² = −4. D: both errors.',
});

{
  const s = frame('Formulae from maths and science', { tag: 'A2 substitution' });
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
  notes(s, 'AQA expects substitution into given formulae, including from science. In E = ½mv² square v first.');
}

D.myTurnYourTurn({
  title: 'Substitution', tag: 'Part 2', stepSize: 26, labelW: 4.4, labelSize: 21, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Work out:',
    steps: [
      { label: '5p − 2q,  p = 6, q = 4', text: '**22**' },
      { label: '3x²,  x = 4', text: '**48**' },
      { label: 'x² − 4x,  x = −2', text: '**12**' },
      { label: 'P = 2(l + w),  l = 8, w = 5', text: '**26**' },
    ],
  },
  yours: {
    q: 'Work out:',
    steps: [
      { label: '4m + 3n,  m = 7, n = 2', text: '**34**' },
      { label: '5y²,  y = 2', text: '**20**' },
      { label: 'y² + 5y,  y = −3', text: '**−6**' },
      { label: 'A = ½(a + b)h,  a = 6, b = 10,  h = 4', text: '**32**' },
    ],
  },
  notes: 'Working: 30 − 8 = 22; 3 × 16 = 48; 4 + 8 = 12; 2 × 13 = 26. Your turn: 28 + 6 = 34; 5 × 4 = 20 (not 100); 9 + (−15) = −6; ½ × 16 × 4 = 32.',
});

// ---------------- Part 3: vocabulary ----------------
{
  const s = frame('Part 3: terms and coefficients', { tag: 'A3 vocabulary' });
  txt(s, 'This expression has **three terms**:', MX, 1.4, W - 2 * MX, 0.5, { size: 24 });
  const parts = [['4x²', 'x² term', 'coefficient 4'], ['+ 3xy', 'xy term', 'coefficient 3'], ['− 5', 'constant term', 'no letters']];
  const bw = 3.4, gap = 0.5, x0 = MX + (W - 2 * MX - (3 * bw + 2 * gap)) / 2, y0 = 2.3;
  parts.forEach(([t, a, b], i) => {
    const x = x0 + i * (bw + gap), col = [C.maroon, C.orange, C.green][i];
    rect(s, x, y0, bw, 1.4, [C.soft, C.orangeSoft, C.greenSoft][i], col, { lw: 2.5 });
    txt(s, t, x, y0, bw, 1.4, { size: 44, bold: true, color: col, align: 'center', valign: 'middle' });
    txt(s, a, x, y0 + 1.55, bw, 0.45, { size: 22, bold: true, align: 'center' });
    txt(s, b, x, y0 + 2.05, bw, 0.45, { size: 20, color: C.grey, align: 'center' });
  });
  rect(s, MX, 5.4, W - 2 * MX, 1.4, C.greyLight);
  txt(s, 'The sign **belongs to the term after it**: the last term is **−5**.', MX + 0.3, 5.5, W - 2 * MX - 0.6, 0.55, { size: 22 });
  txt(s, 'A **factor** divides into a term:  6ab = 2 × 3 × a × b, so 2, 3a and ab are factors.', MX + 0.3, 6.1, W - 2 * MX - 0.6, 0.55, { size: 21 });
  notes(s, 'Coefficient of x² is 4, of xy is 3; −5 is the constant term. Factors of terms lead into factorising (A4).');
}

{
  const s = frame('Expression, equation, formula or identity?', { tag: 'A3 vocabulary' });
  const head = ['', 'Example', '= sign?', 'What it means'];
  const rows = [
    ['Expression', '3x + 2', 'No', 'Just terms. Simplify it or substitute into it.'],
    ['Equation', '3x + 2 = 14', 'Yes', 'True only for a particular value (x = 4). Solve it.'],
    ['Formula', 'A = lw', 'Yes', 'Links different quantities. Substitute into it.'],
    ['Identity', '2(x + 3) ≡ 2x + 6', 'Yes (≡)', 'True for every value of x.'],
    ['Inequality', 'x + 2 > 5', '<, >, ≤, ≥', 'One side is bigger or smaller.'],
  ];
  const cw = [2.5, 3.5, 1.9, W - 2 * MX - 7.9], rh = 0.92, top = 1.4;
  let xx = MX;
  rect(s, MX, top, W - 2 * MX, 0.6, C.maroon);
  head.forEach((h, j) => { txt(s, h, xx + 0.2, top, cw[j] - 0.3, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' }); xx += cw[j]; });
  rows.forEach((r, i) => {
    const yy = top + 0.6 + i * rh;
    rect(s, MX, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    let x = MX;
    r.forEach((c, j) => { txt(s, c, x + 0.2, yy, cw[j] - 0.3, rh, { size: j === 0 ? 22 : j === 1 ? 23 : j === 2 ? 19 : 19, bold: j < 2, color: j === 0 ? C.maroon : C.ink, valign: 'middle' }); x += cw[j]; });
  });
  notes(s, 'No equals sign → expression. Equals sign and you can find the letter → equation. Links different quantities → formula. True whatever the letter → identity (≡).');
}

{
  const s = frame('Equation or identity? Test some values', { tag: 'A3 vocabulary' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const table = (x, title, f1, f2, vals, colour, soft, verdict) => {
    rect(s, x, top, cw, 0.7, colour);
    txt(s, title, x + 0.3, top, cw - 0.6, 0.7, { size: 26, bold: true, color: C.white, valign: 'middle' });
    const cws = [1.0, (cw - 1.0) / 2, (cw - 1.0) / 2];
    let yy = top + 0.85;
    rect(s, x, yy, cw, 0.6, C.greyLight);
    let xx = x; ['x', f1, f2].forEach((h, j) => { txt(s, h, xx, yy, cws[j], 0.6, { size: 21, bold: true, align: 'center', valign: 'middle' }); xx += cws[j]; });
    vals.forEach(([v, a, b]) => {
      yy += 0.6;
      const eq = a === b;
      rect(s, x, yy, cw, 0.6, eq ? C.white : C.soft, C.line);
      xx = x; [v, a, b].forEach((c, j) => { txt(s, String(c), xx, yy, cws[j], 0.6, { size: 22, bold: j > 0, color: j > 0 ? (eq ? C.green : C.red) : C.ink, align: 'center', valign: 'middle' }); xx += cws[j]; });
    });
    rect(s, x, yy + 0.8, cw, 0.9, soft, colour);
    txt(s, verdict, x + 0.3, yy + 0.8, cw - 0.6, 0.9, { size: 20, valign: 'middle' });
  };
  table(MX, '2(x + 3)  and  2x + 6', '2(x + 3)', '2x + 6', [1, 5, -2, 10].map(v => [v, 2 * (v + 3), 2 * v + 6]), C.green, C.greenSoft, 'Equal for **every** value: an **identity**.');
  table(MX + cw + gap, '2x + 3  and  9', '2x + 3', '9', [1, 3, -2, 10].map(v => [v, 2 * v + 3, 9]), C.maroon, C.soft, 'Equal **only** when x = 3: an **equation**.');
  notes(s, 'One counter-example is enough to show something is NOT an identity.');
}

{
  const s = frame('Inequality symbols', { tag: 'A3 vocabulary' });
  [['<', 'is less than'], ['>', 'is greater than'], ['≤', 'is less than or equal to'], ['≥', 'is greater than or equal to']].forEach(([a, b], i) => {
    const y = 1.45 + i * 0.75;
    rect(s, MX, y, 0.9, 0.62, C.soft, C.accent, { lw: 2 });
    txt(s, a, MX, y, 0.9, 0.62, { size: 32, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
    txt(s, b, MX + 1.15, y, 4.6, 0.62, { size: 22, valign: 'middle' });
  });
  const nl = (y, label, from, dir, closed) => {
    const x0 = 6.6, x1 = W - MX - 0.2, u = (x1 - x0) / 10, px = v => x0 + (v + 2) * u;
    txt(s, label, x0, y - 0.95, 4, 0.5, { size: 26, bold: true, color: C.maroon });
    hline(s, x0, y, x1, '6E6670', 1.5);
    for (let v = -2; v <= 8; v++) { vline(s, px(v), y - 0.1, y + 0.1, '6E6670', 1.25); txt(s, String(v), px(v) - 0.3, y + 0.15, 0.6, 0.35, { size: 15, color: C.grey, align: 'center' }); }
    const end = dir > 0 ? px(8) : px(-2);
    s.addShape(D.SH.line, { x: Math.min(px(from), end), y: y - 0.32, w: Math.abs(end - px(from)), h: 0, line: { color: C.accent, width: 4, endArrowType: dir > 0 ? 'triangle' : undefined, beginArrowType: dir < 0 ? 'triangle' : undefined } });
    circle(s, px(from), y - 0.32, 0.28, closed ? C.accent : C.white, C.accent, 2.5);
  };
  nl(2.6, 'x > 3', 3, 1, false);
  nl(4.6, 'x ≤ 2', 2, -1, true);
  rect(s, MX, 4.6, 5.6, 2.2, C.greyLight);
  txt(s, '**Open circle**: the number is **not** included (< or >).', MX + 0.3, 4.75, 5.0, 0.9, { size: 19 });
  txt(s, '**Filled circle**: the number **is** included (≤ or ≥).', MX + 0.3, 5.75, 5.0, 0.9, { size: 19 });
  notes(s, 'Solving inequalities comes later (A22). Here students only read and write them.');
}

{
  const items = ['7x − 2', '7x − 2 = 12', 'P = 4s', '3(y + 1) ≡ 3y + 3', 'n ≥ 5', 'a² + 2a', 'F = ma', '2x + x ≡ 3x'];
  const ans = ['Expression', 'Equation', 'Formula', 'Identity', 'Inequality', 'Expression', 'Formula', 'Identity'];
  for (const reveal of [false, true]) {
    const s = frame(reveal ? 'Sort it: answers' : 'Sort it', { tag: reveal ? 'Check' : 'Expression, equation, formula, identity or inequality?' });
    D.qCards(s, reveal ? items.map((t, i) => `${t}   →   **${ans[i]}**`) : items, { cols: 2, size: reveal ? 23 : 26, color: reveal ? C.green : undefined });
    notes(s, 'This is the Part 3 My turn / Your turn: pairs sort, then justify 4 and 8 (true for all values). 7x − 2 = 12 gives x = 2.');
  }
}

// ---------------- Practice and assessment ----------------
{
  const qs = [
    'Write in algebra:  y × 2 × x × x',
    'Work out  5p − 2q  when p = 6 and q = 4.',
    'Work out  x² + 2x  when x = −4.',
    'Write down the coefficient of y in  6x − 8y + 5.',
    'Write an expression for: subtract 4 from n, then multiply by 3.',
    'Use  s = ut + ½at²  to find s when u = 2, t = 4 and a = 3.',
    'Sam says 2x² and (2x)² always give different answers. Is he right?',
    'Show that  5n + 1  and  5(n + 1)  are not identical.',
  ];
  const ans = ['2x²y', '22', '16 − 8 = 8', '−8', '3(n − 4)', '8 + 24 = 32', 'No: both are 0 when x = 0', 'n = 1: 6 and 10 differ'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 26, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 2x²y  2) 30 − 8 = 22  3) 16 + (−8) = 8  4) −8  5) 3(n − 4)  6) 8 + ½ × 3 × 16 = 32  7) No: x = 0 gives 0 for both  8) n = 1: 5n + 1 = 6, 5(n + 1) = 10.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 8 marks', size: 19, lineGap: 0.34,
  parts: [
    { l: 'a', q: 'Simplify  m × m × m', m: 1, lines: 1 },
    { l: 'b', q: 'Work out the value of  a² − 2a  when a = −4.', m: 2, lines: 1 },
    { l: 'c', q: 'T = 40w + 20 gives the minutes to cook a chicken of mass w kg. Work out T when w = 3.', m: 2, lines: 1 },
    { l: 'd', q: 'Write expression, equation, formula or identity for:  (i) 6(x + 1) ≡ 6x + 6   (ii) 4x − 7 = 13', m: 2, lines: 1 },
    { l: 'e', q: 'Jo says, "4n means n + 4." Explain why Jo is wrong.', m: 1, lines: 1 },
  ],
  total: 8,
  scheme: [
    ['(a)', 'm³', 'B1', ''],
    ['(b)', '16 + 8 = 24', 'M1 A1', 'M1 for (−4)² − 2 × (−4) or 16 seen'],
    ['(c)', '40 × 3 + 20 = 140', 'M1 A1', ''],
    ['(d)', '(i) identity  (ii) equation', 'B1 B1', ''],
    ['(e)', '4n means 4 × n', 'B1', 'Or a counter-example, e.g. n = 1'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Write  c × c  in algebra.', 'Work out  3n²  when n = 2.', 'Work out  8 − x  when x = −2.', 'Is  y = mx + c  an expression, equation, formula or identity?'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) c²  2) 12  3) 10  4) formula. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Write in algebra: (a) a × a × a × a  (b) b × 2 × a × b  (c) (y − 2) ÷ 5',
    'Find the value of 3y and of y³ when y = 4.',
    'Work out  4ab  when a = 2 and b = −3.',
    'Use  v = u + at  to find v when u = 10, a = −2 and t = 3.',
    'Write expression, equation, formula or identity: (a) 9 − 2k (b) 9 − 2k = 1 (c) C = 2πr (d) 3(k + 2) ≡ 3k + 6',
    'Draw number lines to show (a) x > −1  (b) x ≤ 4.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) a⁴; 2ab²; (y − 2)/5  2) 12 and 64  3) −24  4) 4  5) expression, equation (k = 4), formula, identity  6) open circle at −1 arrow right; filled circle at 4 arrow left.');
}

D.save(path.join(__dirname, 'AQA_8300_A1-A3_AlgebraBasics.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
