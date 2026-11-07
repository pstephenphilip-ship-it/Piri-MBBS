// build_A17to19.js — AQA GCSE Mathematics 8300, A17–A19 Solving equations
// Linear equations, quadratic equations (factorising; HT formula), simultaneous equations.
// One two-hour lesson, both tiers (Higher parts tagged HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A17to19.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { graph } = require('./graphs');
const { calc, C } = T;

const DECK = { code: 'A17–A19', title: 'Solving equations' };
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const sameQ = (l, f, g) => [-3, 0, 2, 5].forEach(x => close(`${l} @${x}`, f(x), g(x)));

// ======================= numbers (all checked) =======================
calc('DN1', 4 * 7 - 3, 25); calc('DN2', 3 * 4, 12); calc('DN3', 2 + 6, 8); calc('DN4', -3 * -4, 12);
calc('balance', 3 * 5 + 5, 20);
calc('both sides', 5 * 4 - 3, 2 * 4 + 9); calc('brackets', 4 * (7 - 2), 2 * 7 + 6);
calc('hinge', 2 * (4 + 3), 14);
[[4 * 5 - 7, 13], [3 * (5 + 2), 21], [7 * 4 + 4, 3 * 4 + 20], [12 / 3 + 2, 6]].forEach(([a, b], i) => calc(`MT1 ${i}`, a, b));
[[5 * 5 + 3, 28], [2 * (9 - 4), 10], [6 * 4 - 5, 2 * 4 + 11], [16 / 4 - 1, 3]].forEach(([a, b], i) => calc(`YT1 ${i}`, a, b));
sameQ('x2+7x+12', x => x * x + 7 * x + 12, x => (x + 3) * (x + 4));
sameQ('x2-x-12', x => x * x - x - 12, x => (x - 4) * (x + 3));
sameQ('x2-9', x => x * x - 9, x => (x + 3) * (x - 3));
sameQ('hinge2', x => x * x + 2 * x - 15, x => (x + 5) * (x - 3));
[-3, -4].forEach(x => calc(`solve1 ${x}`, x * x + 7 * x + 12, 0));
[6, -1].forEach(x => calc(`solve2 ${x}`, x * x - 5 * x, 6));
sameQ('2x2+7x+3', x => 2 * x * x + 7 * x + 3, x => (2 * x + 1) * (x + 3));
[2 + Math.sqrt(3), 2 - Math.sqrt(3)].forEach(x => close(`formula ${x}`, x * x - 4 * x + 1, 0));
calc('formula 2dp a', Math.round((2 + Math.sqrt(3)) * 100) / 100, 3.73); calc('formula 2dp b', Math.round((2 - Math.sqrt(3)) * 100) / 100, 0.27);
sameQ('MT2a', x => x * x + 5 * x + 6, x => (x + 2) * (x + 3));
sameQ('MT2b', x => x * x - 3 * x - 10, x => (x - 5) * (x + 2));
[2, 5].forEach(x => calc(`MT2c ${x}`, x * x - 7 * x + 10, 0));
sameQ('YT2a', x => x * x + 8 * x + 15, x => (x + 3) * (x + 5));
sameQ('YT2b', x => x * x + x - 12, x => (x + 4) * (x - 3));
[3, -2].forEach(x => calc(`YT2c ${x}`, x * x - x - 6, 0));
calc('sim1 a', 3 * 4 + 2 * 2, 16); calc('sim1 b', 4 + 2 * 2, 8);
calc('sim2 a', 2 * 2 + 3 * 3, 13); calc('sim2 b', 4 * 2 - 3, 5);
calc('hinge3 a', 7 + 3, 10); calc('hinge3 b', 7 - 3, 4);
[[2, 4], [-1, 1]].forEach(([x, y]) => { calc(`HT sim curve ${x}`, x * x, y); calc(`HT sim line ${x}`, x + 2, y); });
calc('MT3a', 2 * 4 + 3, 11); calc('MT3a2', 4 - 3, 1); calc('MT3b', 2 + 3 * 3, 11); calc('MT3b2', 2 * 2 + 3, 7);
calc('YT3a', 3 * 4 + 2, 14); calc('YT3a2', 4 + 2, 6); calc('YT3b', 2 * 3 + 3 * 2, 12); calc('YT3b2', 3 + 2 * 2, 7);
calc('P1', 6 * 4 - 4, 20); calc('P2', 3 * (2 * 4 + 1), 27);
sameQ('P3', x => x * x + 9 * x + 20, x => (x + 4) * (x + 5));
[5, -3].forEach(x => calc(`P4 ${x}`, x * x - 2 * x - 15, 0));
calc('P5', 8 * 5 - 3, 5 * 5 + 12); calc('P6', 4 * 3 + 2, 14); calc('P6b', 2 * 3 + 2, 8);
calc('P7a', 2 * 11 + 4, 26); calc('P7b', 11 + 3 * 4, 23);
[-2 + Math.sqrt(7), -2 - Math.sqrt(7)].forEach(x => close(`P8 ${x}`, x * x + 4 * x - 3, 0));
calc('P8 2dp a', Math.round((-2 + Math.sqrt(7)) * 100) / 100, 0.65); calc('P8 2dp b', Math.round((-2 - Math.sqrt(7)) * 100) / 100, -4.65);
calc('exam a', 5 * (7 - 3), 2 * 7 + 6);
sameQ('exam b', x => x * x - 4 * x - 21, x => (x - 7) * (x + 3));
calc('exam d1', 3 * 4 + 2 * 3, 18); calc('exam d2', 4 - 2 * 3, -2);
sameQ('exam e', x => 2 * x * x + 5 * x - 3, x => (2 * x - 1) * (x + 3));
calc('exit1', 2 * 6 + 9, 21); sameQ('exit2', x => x * x + 6 * x + 8, x => (x + 2) * (x + 4)); calc('exit4', 6 + 3, 9);
calc('HW1a', 7 * 4 + 2, 30); calc('HW1b', 4 * (8 - 3), 2 * 8 + 4); calc('HW1c', (13 + 5) / 2, 9);
sameQ('HW2a', x => x * x + 10 * x + 21, x => (x + 3) * (x + 7)); sameQ('HW2b', x => x * x - 8 * x + 15, x => (x - 3) * (x - 5)); sameQ('HW2c', x => x * x - 49, x => (x + 7) * (x - 7));
[4, -5].forEach(x => calc(`HW3 ${x}`, x * x + x - 20, 0));
calc('HW4a', 5 * 3 + 2 * 2, 19); calc('HW4b', 3 * 3 + 2 * 2, 13);
calc('HW5', 5 * (5 + 3), 40);
[[3, 6], [-1, -2]].forEach(([x, y]) => { calc(`HW6 c ${x}`, x * x - 3, y); calc(`HW6 l ${x}`, 2 * x, y); });

// ======================= helpers =======================
function stepRows(s, lines, top, o = {}) {
  const x0 = o.x || MX, w = o.w || (W - 2 * MX), rh = o.rh || 0.82, split = o.split || 0.52;
  lines.forEach(([why, m], i) => {
    const y = top + i * (rh + 0.12);
    rect(s, x0, y, w, rh, i === lines.length - 1 && o.lastGreen ? C.greenSoft : (i % 2 ? C.white : C.soft), i === lines.length - 1 && o.lastGreen ? C.green : C.line);
    txt(s, m, x0 + 0.3, y, w * split - 0.3, rh, { size: o.size || 26, bold: true, color: i === lines.length - 1 && o.lastGreen ? C.green : C.ink, valign: 'middle' });
    txt(s, why, x0 + w * split, y, w * (1 - split) - 0.25, rh, { size: o.whySize || 18, color: C.orange, valign: 'middle' });
  });
  return top + lines.length * (rh + 0.12);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Linear equations, quadratic equations and simultaneous equations',
  bullets: ['Part 1: linear equations (A17)', 'Part 2: quadratic equations (A18)', 'Part 3: simultaneous equations (A19)'],
  notes: 'AQA 8300 A17: solve linear equations in one unknown, including unknowns on both sides. A18: solve quadratic equations by factorising; completing the square and the quadratic formula are Higher. A19: solve two simultaneous linear equations algebraically and graphically; linear and quadratic pairs are Higher. Factorising quadratics (A4) is taught here because it is needed to solve them. About two hours.',
});

D.objectives({
  tag: 'A17–A19',
  items: [
    'Solve **linear** equations, including brackets and unknowns on both sides.',
    '**Factorise** quadratics and solve quadratic equations.',
    'Solve **simultaneous** equations by elimination and with graphs.',
  ],
  keywords: ['solve', 'inverse', 'factorise', 'root', 'simultaneous', 'eliminate'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Work out  4 × 7 − 3', 'Find two numbers that multiply to 12 and add to 7.', 'Work out  2 − (−6)', 'Work out  −3 × −4'],
  answers: ['25', '3 and 4', '8', '12'],
  notes: 'Q2 is the key skill for factorising quadratics later in the lesson. Q3 and Q4 are the sign rules used in elimination.',
});

D.vocab({
  title: 'Key words', tag: 'A17–A19',
  items: [
    { term: 'Solve', def: 'Find the value(s) of the letter that make the equation **true**.' },
    { term: 'Inverse operation', def: 'Undo: **+ ↔ −** and **× ↔ ÷**. Do the same to **both sides**.' },
    { term: 'Quadratic equation', def: 'Has an **x²** term, e.g. **x² + 7x + 12 = 0**. Usually **two** solutions.' },
    { term: 'Simultaneous', def: 'Two equations that are **both true at the same time** for the same x and y.' },
  ],
  notes: 'Remind students: the solutions of a quadratic equation are the roots of its graph (A11).',
});

// ---------------- Part 1: linear ----------------
{
  const s = frame('Part 1: solving linear equations', { tag: 'A17 linear' });
  txt(s, 'Solve  **3x + 5 = 20**.   Whatever you do to one side, do to the **other**.', MX, 1.35, W - 2 * MX, 0.55, { size: 23 });
  const y = stepRows(s, [['start', '3x + 5 = 20'], ['− 5 from both sides', '3x = 15'], ['÷ 3 on both sides', 'x = 5']], 2.15, { lastGreen: true, size: 30, rh: 0.95 });
  rect(s, MX, y + 0.25, W - 2 * MX, 1.0, C.greyLight);
  txt(s, '**Check:**  3 × 5 + 5 = 20 ✓      Undo in **reverse order**: the + 5 last done, so it is undone first.', MX + 0.3, y + 0.25, W - 2 * MX - 0.6, 1.0, { size: 20, valign: 'middle' });
  notes(s, 'Use the balance model: the equation is a balanced scale. Always check by substituting back.');
}

{
  const s = frame('Brackets and unknowns on both sides', { tag: 'A17 linear' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  txt(s, 'Solve  **5x − 3 = 2x + 9**', MX, 1.35, cw, 0.55, { size: 23 });
  stepRows(s, [['− 2x both sides', '3x − 3 = 9'], ['+ 3 both sides', '3x = 12'], ['÷ 3', 'x = 4']], 2.1, { x: MX, w: cw, lastGreen: true, size: 26, split: 0.55, whySize: 17 });
  txt(s, 'Solve  **4(x − 2) = 2x + 6**', MX + cw + gap, 1.35, cw, 0.55, { size: 23 });
  stepRows(s, [['expand', '4x − 8 = 2x + 6'], ['− 2x, + 8', '2x = 14'], ['÷ 2', 'x = 7']], 2.1, { x: MX + cw + gap, w: cw, lastGreen: true, size: 26, split: 0.62, whySize: 17 });
  rect(s, MX, 5.2, W - 2 * MX, 1.55, C.orangeSoft, 'F3D9B5');
  txt(s, 'Move the **smaller** x term so the x term stays positive.   Expand brackets **first**.   Check: 5 × 4 − 3 = 17 = 2 × 4 + 9 ✓', MX + 0.3, 5.2, W - 2 * MX - 0.6, 1.55, { size: 20, valign: 'middle' });
  notes(s, 'Common mistakes: 4(x − 2) = 4x − 2; moving a term without changing its sign. Check: 4(7 − 2) = 20 = 14 + 6.');
}

D.hinge({
  title: 'Quick check',
  q: 'Solve  2(x + 3) = 14',
  options: ['x = 4', 'x = 5.5', 'x = 8', 'x = 10'],
  correct: 0,
  notes: 'Answer A: 2x + 6 = 14, 2x = 8, x = 4. B: expanded as 2x + 3. C: forgot to divide by 2. D: 14 − 3 = 11, odd steps.',
});

D.myTurnYourTurn({
  title: 'Linear equations', tag: 'Part 1', stepSize: 26, labelW: 3.6, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Solve:',
    steps: [
      { label: '4x − 7 = 13', text: '**x = 5**' },
      { label: '3(x + 2) = 21', text: '**x = 5**' },
      { label: '7x + 4 = 3x + 20', text: '**x = 4**' },
      { label: 'x ÷ 3 + 2 = 6', text: '**x = 12**' },
    ],
  },
  yours: {
    q: 'Solve:',
    steps: [
      { label: '5x + 3 = 28', text: '**x = 5**' },
      { label: '2(x − 4) = 10', text: '**x = 9**' },
      { label: '6x − 5 = 2x + 11', text: '**x = 4**' },
      { label: 'x ÷ 4 − 1 = 3', text: '**x = 16**' },
    ],
  },
  notes: 'Model the working for each of mine on the board. Yours: 5x = 25; 2x − 8 = 10, 2x = 18; 4x = 16; x ÷ 4 = 4.',
});

// ---------------- Part 2: quadratics ----------------
{
  const s = frame('Part 2: factorising a quadratic', { tag: 'A18 quadratics' });
  txt(s, 'Factorise  **x² + 7x + 12**:  find two numbers that **multiply to 12** and **add to 7**.', MX, 1.35, W - 2 * MX, 0.55, { size: 22 });
  const pairs = [['1 × 12', '13', false], ['2 × 6', '8', false], ['3 × 4', '7', true]];
  rect(s, MX, 2.15, 5.6, 0.6, C.maroon);
  txt(s, 'Multiply to 12', MX + 0.3, 2.15, 2.6, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  txt(s, 'Add', MX + 3.2, 2.15, 2.2, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  pairs.forEach(([a, b, ok], i) => {
    const y = 2.75 + i * 0.75;
    rect(s, MX, y, 5.6, 0.75, ok ? C.greenSoft : C.white, ok ? C.green : C.line, { lw: ok ? 2 : 1 });
    txt(s, a, MX + 0.3, y, 2.6, 0.75, { size: 24, bold: ok, color: ok ? C.green : C.ink, valign: 'middle' });
    txt(s, b + (ok ? '  ✓' : ''), MX + 3.2, y, 2.2, 0.75, { size: 24, bold: ok, color: ok ? C.green : C.ink, valign: 'middle' });
  });
  const bx = 6.6, bw = W - MX - bx;
  rect(s, bx, 2.15, bw, 2.85, C.greyLight);
  txt(s, 'So', bx + 0.3, 2.3, bw - 0.6, 0.5, { size: 20 });
  txt(s, 'x² + 7x + 12 = (x + 3)(x + 4)', bx + 0.3, 2.85, bw - 0.6, 0.7, { size: 27, bold: true, color: C.green });
  txt(s, 'Check by expanding:  x² + 4x + 3x + 12 ✓', bx + 0.3, 3.75, bw - 0.6, 0.9, { size: 19, color: C.grey });
  rect(s, MX, 5.3, W - 2 * MX, 1.5, C.soft, C.line);
  txt(s, '**Signs:**  x² − x − 12 = **(x − 4)(x + 3)**   (−4 × 3 = −12,  −4 + 3 = −1)', MX + 0.3, 5.35, W - 2 * MX - 0.6, 0.65, { size: 21 });
  txt(s, '**Difference of two squares:**  x² − 9 = **(x + 3)(x − 3)**', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.65, { size: 21 });
  notes(s, 'Factorising quadratics is part of A4 but is taught here because students need it to solve. Negative constant: one number is negative. Difference of two squares has no x term: the middle terms cancel.');
}

D.hinge({
  title: 'Quick check',
  q: 'Factorise  x² + 2x − 15',
  options: ['(x + 5)(x − 3)', '(x − 5)(x + 3)', '(x + 5)(x + 3)', '(x + 15)(x − 1)'],
  correct: 0,
  notes: 'Answer A: 5 × −3 = −15, 5 + (−3) = 2. B gives −2x. C gives +15. D gives +14x.',
});

{
  const s = frame('Solving by factorising', { tag: 'A18 quadratics' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  txt(s, 'Solve  **x² + 7x + 12 = 0**', MX, 1.35, cw, 0.55, { size: 23 });
  stepRows(s, [['factorise', '(x + 3)(x + 4) = 0'], ['one bracket is 0', 'x + 3 = 0 or x + 4 = 0'], ['solutions', 'x = −3 or x = −4']], 2.1, { x: MX, w: cw, lastGreen: true, size: 22, split: 0.68, whySize: 15 });
  txt(s, 'Solve  **x² − 5x = 6**', MX + cw + gap, 1.35, cw, 0.55, { size: 23 });
  stepRows(s, [['make it = 0', 'x² − 5x − 6 = 0'], ['factorise', '(x − 6)(x + 1) = 0'], ['solutions', 'x = 6 or x = −1']], 2.1, { x: MX + cw + gap, w: cw, lastGreen: true, size: 22, split: 0.68, whySize: 15 });
  rect(s, MX, 5.2, W - 2 * MX, 1.55, C.orangeSoft, 'F3D9B5');
  txt(s, 'If two things multiply to make **0**, one of them **must be 0**.  So the equation must equal 0 **first**.   Watch the signs: (x + 3) = 0 gives x = **−3**.', MX + 0.3, 5.2, W - 2 * MX - 0.6, 1.55, { size: 19, valign: 'middle' });
  notes(s, 'Common mistakes: giving x = 3 and 4 (sign error); trying to factorise x² − 5x = 6 without rearranging. These solutions are the roots of y = x² + 7x + 12.');
}

{
  const s = frame('Harder quadratics', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 5.4, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.7, C.maroon);
  txt(s, 'When a ≠ 1', MX + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
  txt(s, '2x² + 7x + 3 = 0', MX + 0.3, top + 0.95, cw - 0.6, 0.6, { size: 24, bold: true });
  txt(s, 'Brackets start (2x  )(x  ). Try pairs for 3 until the middle term is 7x.', MX + 0.3, top + 1.65, cw - 0.6, 1.0, { size: 18 });
  txt(s, '(2x + 1)(x + 3) = 0', MX + 0.3, top + 2.8, cw - 0.6, 0.6, { size: 24 });
  txt(s, 'x = −½  or  x = −3', MX + 0.3, top + 3.6, cw - 0.6, 0.6, { size: 26, bold: true, color: C.maroon });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.4, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.7, C.orange);
  txt(s, 'The quadratic formula', x2 + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
  math(s, x2 + 0.3, top + 1.45, ['x = ', { n: '−b ± √(b² − 4ac)', d: '2a' }], { size: 24, bold: true });
  txt(s, 'x² − 4x + 1 = 0:   a = 1, b = −4, c = 1', x2 + 0.3, top + 2.3, cw - 0.6, 0.5, { size: 18 });
  math(s, x2 + 0.3, top + 3.35, ['x = ', { n: '4 ± √12', d: 2 }, ' = 2 ± √3'], { size: 22 });
  txt(s, 'x = 3.73  or  x = 0.27  (2 d.p.)', x2 + 0.3, top + 4.25, cw - 0.6, 0.6, { size: 23, bold: true, color: C.orange });
  notes(s, 'Higher only. The formula is not on a formula sheet: students must learn it. Use it when the quadratic does not factorise, or when the question asks for decimal places. Completing the square was introduced with A11.');
}

D.myTurnYourTurn({
  title: 'Quadratic equations', tag: 'Part 2', stepSize: 24, labelW: 2.9, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Factorise, then solve:',
    steps: [
      { label: 'x² + 5x + 6', text: '**(x + 2)(x + 3)**' },
      { label: 'x² − 3x − 10', text: '**(x − 5)(x + 2)**' },
      { label: 'x² − 7x + 10 = 0', text: '**x = 2 or x = 5**' },
    ],
  },
  yours: {
    q: 'Factorise, then solve:',
    steps: [
      { label: 'x² + 8x + 15', text: '**(x + 3)(x + 5)**' },
      { label: 'x² + x − 12', text: '**(x + 4)(x − 3)**' },
      { label: 'x² − x − 6 = 0', text: '**x = 3 or x = −2**' },
    ],
  },
  notes: 'Last one: (x − 3)(x + 2) = 0. Check by substituting: 9 − 3 − 6 = 0 and 4 + 2 − 6 = 0.',
});

// ---------------- Part 3: simultaneous ----------------
{
  const s = frame('Part 3: simultaneous equations', { tag: 'A19 simultaneous' });
  txt(s, 'Solve   **3x + 2y = 16**   and   **x + 2y = 8**', MX, 1.35, 7.0, 0.55, { size: 22 });
  const lines = [
    ['Same 2y in both: subtract', '2x = 8'],
    ['Divide by 2', 'x = 4'],
    ['Substitute into x + 2y = 8', '4 + 2y = 8,  y = 2'],
    ['Check in the other', '12 + 4 = 16 ✓'],
  ];
  lines.forEach(([a, b], i) => {
    const y = 2.1 + i * 1.0;
    circle(s, MX + 0.32, y + 0.4, 0.56, C.accent);
    txt(s, String(i + 1), MX + 0.04, y + 0.12, 0.56, 0.56, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, a, MX + 0.8, y, 6.0, 0.4, { size: 17, color: C.grey });
    txt(s, b, MX + 0.8, y + 0.38, 6.0, 0.5, { size: 24, bold: true, color: i === 3 ? C.green : C.ink });
  });
  rect(s, MX, 6.15, 6.6, 0.65, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'x = 4,  y = 2', MX, 6.15, 6.6, 0.65, { size: 26, bold: true, color: C.green, align: 'center', valign: 'middle' });
  const G = graph(D, s, 7.6, 1.5, W - MX - 7.6, 4.75, [0, 6], [0, 8], { labSize: 11 });
  G.line(-1.5, 8, C.maroon, 3); G.line(-0.5, 4, C.orange, 3);
  G.pt(4, 2, C.green, '(4, 2)', 0.15, -0.45);
  txt(s, 'The solution is where the two lines **cross**.', 7.6, 6.68, W - MX - 7.6, 0.35, { size: 15, color: C.grey });
  notes(s, 'Elimination: the y terms are the same, so subtracting removes y. "Same Signs Subtract" is a common memory aid. Graphically, the solution is the point of intersection.');
}

{
  const s = frame('When the numbers do not match', { tag: 'A19 simultaneous' });
  txt(s, 'Solve   **2x + 3y = 13**   and   **4x − y = 5**', MX, 1.35, W - 2 * MX, 0.55, { size: 23 });
  stepRows(s, [
    ['× 3 the second equation, so the y terms match', '12x − 3y = 15'],
    ['Different signs: add to 2x + 3y = 13', '14x = 28,  x = 2'],
    ['Substitute into 4x − y = 5', '8 − y = 5,  y = 3'],
    ['Check in 2x + 3y = 13', '4 + 9 = 13 ✓'],
  ], 2.15, { size: 25, split: 0.45, whySize: 18 });
  rect(s, MX, 6.05, W - 2 * MX, 0.75, C.orangeSoft, 'F3D9B5');
  txt(s, '**Same signs: subtract.  Different signs: add.**   Multiply **every** term when you scale an equation.', MX + 0.3, 6.05, W - 2 * MX - 0.6, 0.75, { size: 20, valign: 'middle' });
  notes(s, 'Common mistake: multiplying only the y term by 3. Encourage labelling equations (1) and (2).');
}

D.hinge({
  title: 'Quick check',
  q: 'Solve  x + y = 10  and  x − y = 4',
  options: ['x = 7, y = 3', 'x = 3, y = 7', 'x = 6, y = 4', 'x = 14, y = −4'],
  correct: 0,
  notes: 'Answer A: add to get 2x = 14. B: swapped. C: only satisfies the first. D: forgot to halve.',
});

{
  const s = frame('A line and a curve', HT);
  const G = graph(D, s, MX + 0.2, 1.4, 5.6, 5.4, [-3, 3], [-1, 9]);
  G.curve(x => x * x, -3, 3, C.maroon, 3); G.line(1, 2, C.orange, 3);
  G.pt(2, 4, C.green, '(2, 4)', 0.15, -0.1); G.pt(-1, 1, C.green, '(−1, 1)', -1.25, -0.1);
  const bx = 6.6, bw = W - MX - bx;
  txt(s, 'Solve  **y = x²**  and  **y = x + 2**', bx, 1.4, bw, 0.55, { size: 22 });
  stepRows(s, [['set them equal', 'x² = x + 2'], ['make = 0', 'x² − x − 2 = 0'], ['factorise', '(x − 2)(x + 1) = 0'], ['find y = x + 2', '(2, 4) and (−1, 1)']], 2.1, { x: bx, w: bw, lastGreen: true, size: 22, split: 0.62, whySize: 15 });
  txt(s, 'Two crossing points, so two pairs of answers.', bx, 6.0, bw, 0.6, { size: 18, color: C.grey });
  notes(s, 'Higher only. Substitute the linear equation into the quadratic. Always find both x and y, and pair them correctly.');
}

D.myTurnYourTurn({
  title: 'Simultaneous equations', tag: 'Part 3', stepSize: 22, labelW: 3.1, labelSize: 19, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Solve:',
    steps: [
      { label: '2x + y = 11,  x − y = 1', text: '**x = 4, y = 3**' },
      { label: 'x + 3y = 11,  2x + y = 7', text: '**x = 2, y = 3**' },
    ],
  },
  yours: {
    q: 'Solve:',
    steps: [
      { label: '3x + y = 14,  x + y = 6', text: '**x = 4, y = 2**' },
      { label: '2x + 3y = 12,  x + 2y = 7', text: '**x = 3, y = 2**' },
    ],
  },
  notes: 'Mine 1: add, 3x = 12. Mine 2: × 2 the first: 2x + 6y = 22, subtract: 5y = 15. Yours 1: subtract, 2x = 8. Yours 2: × 2 the second: 2x + 4y = 14, subtract: y = 2.',
});

// ---------------- Practice & assessment ----------------
{
  const qs = [
    'Solve  6x − 4 = 20',
    'Solve  3(2x + 1) = 27',
    'Factorise  x² + 9x + 20',
    'Solve  x² − 2x − 15 = 0',
    'Solve  8x − 3 = 5x + 12',
    'Solve  4x + y = 14  and  2x + y = 8',
    '2 adult tickets and 1 child ticket cost £26. 1 adult and 3 child tickets cost £23. Find the cost of each.',
    'HT  Solve  x² + 4x − 3 = 0, giving answers to 2 d.p.',
  ];
  const ans = ['x = 4', 'x = 4', '(x + 4)(x + 5)', 'x = 5 or x = −3', 'x = 5', 'x = 3, y = 2', 'Adult £11, child £4', 'x = 0.65 or −4.65'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 27, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 23, start: k });
    notes(s, 'Answers: 1) 6x = 24  2) 6x + 3 = 27, 6x = 24  3) (x + 4)(x + 5)  4) (x − 5)(x + 3) = 0  5) 3x = 15  6) subtract: 2x = 6  7) 2a + c = 26, a + 3c = 23; × 2 the second: 2a + 6c = 46, subtract: 5c = 20, c = 4, a = 11  8) x = (−4 ± √28) ÷ 2 = −2 ± √7.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 11 marks', size: 20, lineGap: 0.36,
  parts: [
    { l: 'a', q: 'Solve  5(x − 3) = 2x + 6', m: 3, lines: 1 },
    { l: 'b', q: 'Factorise  x² − 4x − 21', m: 2, lines: 1 },
    { l: 'c', q: 'Hence solve  x² − 4x − 21 = 0', m: 1, lines: 1 },
    { l: 'd', q: 'Solve  3x + 2y = 18  and  x − 2y = −2', m: 3, lines: 1 },
    { l: 'e', q: 'HT  Solve  2x² + 5x − 3 = 0', m: 2, lines: 1 },
  ],
  total: 11,
  scheme: [
    ['(a)', '5x − 15 = 2x + 6;  3x = 21;  x = 7', 'M1 M1 A1', 'M1 expand, M1 collect'],
    ['(b)', '(x − 7)(x + 3)', 'B2', 'B1 for (x ± 7)(x ± 3)'],
    ['(c)', 'x = 7 or x = −3', 'B1ft', 'ft their (b)'],
    ['(d)', '4x = 16;  x = 4;  y = 3', 'M1 A1 A1', 'M1 correct elimination'],
    ['(e)', '(2x − 1)(x + 3) = 0;  x = ½ or −3', 'M1 A1', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Solve  2x + 9 = 21', 'Factorise  x² + 6x + 8', 'Solve  x² − 16 = 0', 'Solve  x + y = 9  and  x − y = 3'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) x = 6  2) (x + 2)(x + 4)  3) x = 4 or −4  4) x = 6, y = 3. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Solve: (a) 7x + 2 = 30  (b) 4(x − 3) = 2x + 4  (c) (x + 5) ÷ 2 = 9',
    'Factorise: (a) x² + 10x + 21  (b) x² − 8x + 15  (c) x² − 49',
    'Solve  x² + x − 20 = 0',
    'Solve  5x + 2y = 19  and  3x + 2y = 13',
    'A rectangle is x cm wide and (x + 3) cm long. Its area is 40 cm². Show that x² + 3x − 40 = 0, then find x.',
    'HT  Solve  y = x² − 3  and  y = 2x',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) 4; 8; 13  2) (x + 3)(x + 7); (x − 3)(x − 5); (x + 7)(x − 7)  3) 4 or −5  4) x = 3, y = 2  5) x(x + 3) = 40, (x + 8)(x − 5) = 0, x = 5 (a length cannot be negative)  6) x² − 2x − 3 = 0: (3, 6) and (−1, −2).');
}

D.save(path.join(__dirname, 'AQA_8300_A17-A19_SolvingEquations.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
