// build_A20to25.js — AQA GCSE Mathematics 8300, A20–A25 Inequalities, sequences and iteration
// One two-hour lesson, both tiers (Higher parts tagged HT). A21 (forming equations) is used throughout.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A20to25.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A20–A25', title: 'Inequalities and sequences' };
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const ints = (lo, loIn, hi, hiIn) => { const r = []; for (let n = Math.ceil(lo); n <= Math.floor(hi); n++) if ((n > lo || loIn) && (n < hi || hiIn)) r.push(n); return r.join(','); };
const nth = (a, b) => n => a * n + b;
const seq = (f, k = 5) => Array.from({ length: k }, (_, i) => f(i + 1)).join(',');

// ======================= numbers (all checked) =======================
calc('DN1', 3 * 5 - 4, 11); calc('DN2', 7 + 4, 11); calc('DN3', 4 * 10 - 1, 39); calc('DN4', -12 / -3, 4);
calc('solve 3x-4<11 boundary', (11 + 4) / 3, 5);
calc('integers -2<x<=3', ints(-2, false, 3, true) === '-1,0,1,2,3' ? 1 : 0, 1);
calc('2x+1>=9', (9 - 1) / 2, 4);
calc('-3x>12 boundary', 12 / -3, -4); calc('-3x>12 test -5', -3 * -5 > 12 ? 1 : 0, 1);
calc('double', (5 - 1) / 2, 2); calc('double2', (11 - 1) / 2, 5); calc('double ints', ints(2, false, 5, true) === '3,4,5' ? 1 : 0, 1);
calc('HT quad', Math.sqrt(9), 3); [-2, 3].forEach(x => calc(`HT quad2 ${x}`, x * x - x - 6, 0));
calc('HT quad2 test 4', 16 - 4 - 6 > 0 ? 1 : 0, 1); calc('HT quad2 test 0', 0 - 0 - 6 > 0 ? 1 : 0, 0);
calc('hinge', (13 + 3) / 4, 4);
calc('MT1a', (17 - 2) / 5, 3); calc('MT1b', 8 / 2 + 1, 5); calc('MT1c', ints(-1, true, 3, false) === '-1,0,1,2' ? 1 : 0, 1);
calc('YT1a', (8 + 7) / 3, 5); calc('YT1b', 20 / 4 - 2, 3); calc('YT1c', ints(0, false, 4, true) === '1,2,3,4' ? 1 : 0, 1);
calc('seq 4n-1', seq(nth(4, -1), 4) === '3,7,11,15' ? 1 : 0, 1); calc('10th', nth(4, -1)(10), 39); calc('100?', (100 + 1) / 4, 25.25);
calc('seq 23-3n', seq(nth(-3, 23), 4) === '20,17,14,11' ? 1 : 0, 1);
calc('hinge2', seq(nth(3, 2), 4) === '5,8,11,14' ? 1 : 0, 1);
calc('square', seq(n => n * n, 4) === '1,4,9,16' ? 1 : 0, 1); calc('cube', seq(n => n ** 3, 4) === '1,8,27,64' ? 1 : 0, 1);
calc('tri', seq(n => n * (n + 1) / 2, 4) === '1,3,6,10' ? 1 : 0, 1); calc('geo', seq(n => 2 * 3 ** (n - 1), 4) === '2,6,18,54' ? 1 : 0, 1);
calc('fib', [1, 1, 2, 3, 5, 8].every((v, i, a) => i < 2 || v === a[i - 1] + a[i - 2]) ? 1 : 0, 1);
calc('HT quad seq', seq(n => n * n + 3) === '4,7,12,19,28' ? 1 : 0, 1);
calc('MT2', seq(nth(5, 1), 4) === '6,11,16,21' ? 1 : 0, 1); calc('MT2 50th', nth(5, 1)(50), 251); calc('MT2 98', (98 - 1) / 5, 19.4);
calc('YT2', seq(nth(4, 5), 4) === '9,13,17,21' ? 1 : 0, 1); calc('YT2 50th', nth(4, 5)(50), 205); calc('YT2 101', (101 - 5) / 4, 24);
let it = [1]; for (let i = 1; i <= 6; i++) it.push(Math.cbrt(5 - 2 * it[i - 1]));
close('it1', Math.round(it[1] * 1000) / 1000, 1.442); close('it2', Math.round(it[2] * 1000) / 1000, 1.284); close('it3', Math.round(it[3] * 1000) / 1000, 1.345);
const f3 = x => x ** 3 + 2 * x - 5; calc('sign f(1)', f3(1), -2); calc('sign f(2)', f3(2), 7);
close('root check', f3(it[6]), 0, 0.02);
calc('P1', (13 - 5) / 2, 4); calc('P2', ints(-3, false, 1, true) === '-2,-1,0,1' ? 1 : 0, 1);
calc('P3', seq(nth(3, 4), 4) === '7,10,13,16' ? 1 : 0, 1); calc('P4', 5 + 3, 8); calc('P4b', 8 + 5, 13);
calc('P5', ints(2, true, 5, false) === '2,3,4' ? 1 : 0, 1); calc('P6', (75 + 3) / 4, 19.5);
calc('P8', seq(n => n * n + 2) === '3,6,11,18,27' ? 1 : 0, 1);
calc('exam a', (18 + 2) / 5, 4); calc('exam c', seq(nth(5, 3), 4) === '8,13,18,23' ? 1 : 0, 1); calc('exam d', (99 - 3) / 5, 19.2);
calc('exit3', seq(nth(3, -1), 4) === '2,5,8,11' ? 1 : 0, 1);
calc('HW1a', 16 / 4, 4); calc('HW1b', 18 / 3 - 2, 4); calc('HW1c', 20 / -5, -4);
calc('HW2', ints(-1, true, 3, false) === '-1,0,1,2' ? 1 : 0, 1);
calc('HW3', seq(nth(-3, 15), 4) === '12,9,6,3' ? 1 : 0, 1); calc('HW3 20th', nth(-3, 15)(20), -45);
calc('HW4', (200 + 3) / 7, 29); calc('HW5', seq(n => 3 * 2 ** (n - 1)) === '3,6,12,24,48' ? 1 : 0, 1);

// ======================= number line helper =======================
function numberLine(s, x0, y, w, lo, hi, marks, o = {}) {
  const u = w / (hi - lo), px = v => x0 + (v - lo) * u;
  hline(s, x0, y, x0 + w, '4A3F45', 1.75);
  for (let v = lo; v <= hi; v++) { vline(s, px(v), y - 0.1, y + 0.1, '4A3F45', 1.25); txt(s, String(v).replace('-', '−'), px(v) - 0.3, y + 0.15, 0.6, 0.35, { size: o.lab || 16, color: C.grey, align: 'center' }); }
  const col = o.color || C.accent, yy = y - 0.36;
  const { from, to, fromIn, toIn } = marks; // from/to may be null for open-ended arrows
  const a = from == null ? lo : from, b = to == null ? hi : to;
  s.addShape(D.SH.line, { x: px(a), y: yy, w: px(b) - px(a), h: 0, line: { color: col, width: 4, beginArrowType: from == null ? 'triangle' : undefined, endArrowType: to == null ? 'triangle' : undefined } });
  if (from != null) circle(s, px(from), yy, 0.3, fromIn ? col : C.white, col, 2.5);
  if (to != null) circle(s, px(to), yy, 0.3, toIn ? col : C.white, col, 2.5);
}
function stepRows(s, lines, top, o = {}) {
  const x0 = o.x || MX, w = o.w || (W - 2 * MX), rh = o.rh || 0.82, split = o.split || 0.52;
  lines.forEach(([why, m], i) => {
    const y = top + i * (rh + 0.12), last = i === lines.length - 1 && o.lastGreen;
    rect(s, x0, y, w, rh, last ? C.greenSoft : (i % 2 ? C.white : C.soft), last ? C.green : C.line);
    txt(s, m, x0 + 0.3, y, w * split - 0.3, rh, { size: o.size || 26, bold: true, color: last ? C.green : C.ink, valign: 'middle' });
    txt(s, why, x0 + w * split, y, w * (1 - split) - 0.25, rh, { size: o.whySize || 18, color: C.orange, valign: 'middle' });
  });
  return top + lines.length * (rh + 0.12);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Solving inequalities, sequences and the nth term, and iteration',
  bullets: ['Part 1: inequalities (A22)', 'Part 2: sequences and the nth term (A23–A25)', 'Part 3: iteration (A20, Higher)'],
  notes: 'AQA 8300 A22: solve linear inequalities and represent them on a number line (quadratic inequalities and regions: Higher). A23: generate terms of a sequence. A24: recognise square, cube, triangular, Fibonacci-type and geometric sequences (quadratic sequences: Higher). A25: nth term of linear sequences (quadratic: Higher). A20: find approximate solutions using iteration (Higher). A21 (forming and solving equations from a situation) runs through the problem-solving questions. About two hours.',
});

D.objectives({
  tag: 'A20–A25',
  items: [
    '**Solve** inequalities and show them on a **number line**.',
    'Find and use the **nth term** of a linear sequence.',
    '**Recognise** special sequences.  **HT:** quadratic sequences and iteration.',
  ],
  keywords: ['inequality', 'integer', 'sequence', 'term', 'nth term', 'iteration'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Work out  3 × 5 − 4', 'Next term:  3, 7, 11, …', 'Work out  4n − 1  when n = 10', 'Work out  −12 ÷ −3'],
  answers: ['11', '15', '39', '4'],
  notes: 'Q2–Q3 lead into the nth term. Q4: dividing by a negative is the trap in solving inequalities.',
});

D.vocab({
  title: 'Key words', tag: 'A20–A25',
  items: [
    { term: 'Inequality', def: 'Uses **<, >, ≤ or ≥**, e.g. **x + 2 > 5**. It has a **range** of solutions.' },
    { term: 'Integer', def: 'A **whole number**: positive, negative or zero.' },
    { term: 'nth term', def: 'A rule that gives **any term** from its **position** n, e.g. **4n − 1**.' },
    { term: 'Iteration', def: 'Repeating a formula, putting each answer back in, to get **closer to a solution**.' },
  ],
  notes: 'Term-to-term rule (add 4) versus position-to-term rule (4n − 1).',
});

// ---------------- Part 1: inequalities ----------------
{
  const s = frame('Part 1: solving an inequality', { tag: 'A22 inequalities' });
  txt(s, 'Solve  **3x − 4 < 11**.  Solve it like an equation, but **keep the sign**.', MX, 1.35, W - 2 * MX, 0.55, { size: 23 });
  stepRows(s, [['+ 4 both sides', '3x < 15'], ['÷ 3 both sides', 'x < 5']], 2.15, { lastGreen: true, size: 30, rh: 0.9, w: 6.6 });
  numberLine(s, 7.6, 3.2, W - MX - 7.6 - 0.2, 0, 8, { from: null, to: 5, toIn: false });
  txt(s, 'Open circle: 5 is **not** included.', 7.6, 3.75, W - MX - 7.6, 0.45, { size: 17, color: C.grey });
  rect(s, MX, 4.4, W - 2 * MX, 2.4, C.greyLight);
  txt(s, '**Integers** that satisfy  −2 < x ≤ 3:', MX + 0.3, 4.5, 6.2, 0.5, { size: 21 });
  txt(s, '−1, 0, 1, 2, 3', MX + 0.3, 5.1, 6.2, 0.6, { size: 28, bold: true, color: C.green });
  txt(s, '−2 is **not** included (<);  3 **is** included (≤).', MX + 0.3, 5.85, 6.2, 0.6, { size: 19 });
  numberLine(s, 7.6, 5.9, W - MX - 7.6 - 0.2, -3, 4, { from: -2, fromIn: false, to: 3, toIn: true });
  notes(s, 'Open circle for < and >, filled circle for ≤ and ≥. Listing integers is a common AQA Foundation question.');
}

{
  const s = frame('Negatives and double inequalities', { tag: 'A22 inequalities' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  txt(s, 'Solve  **−3x > 12**', MX, 1.35, cw, 0.55, { size: 23 });
  stepRows(s, [['÷ −3 and FLIP the sign', 'x < −4']], 2.1, { x: MX, w: cw, lastGreen: true, size: 28, split: 0.45, whySize: 17 });
  txt(s, 'Check x = −5:  −3 × −5 = 15 > 12 ✓', MX, 3.15, cw, 0.5, { size: 19 });
  rect(s, MX, 3.8, cw, 1.25, C.orangeSoft, 'F3D9B5');
  txt(s, 'Multiplying or dividing by a **negative** reverses the inequality.  (Or add 3x to both sides to avoid it.)', MX + 0.25, 3.8, cw - 0.5, 1.25, { size: 18, valign: 'middle' });
  const x2 = MX + cw + gap;
  txt(s, 'Solve  **5 < 2x + 1 ≤ 11**', x2, 1.35, cw, 0.55, { size: 23 });
  stepRows(s, [['− 1 from all three parts', '4 < 2x ≤ 10'], ['÷ 2 all three parts', '2 < x ≤ 5']], 2.1, { x: x2, w: cw, lastGreen: true, size: 26, split: 0.5, whySize: 16 });
  txt(s, 'Integers: **3, 4, 5**', x2, 4.15, cw, 0.5, { size: 22 });
  numberLine(s, x2 + 0.2, 6.0, cw - 0.4, 0, 7, { from: 2, fromIn: false, to: 5, toIn: true });
  notes(s, 'Show why the sign flips: 2 < 3 but −2 > −3. In a double inequality, do the same to all three parts.');
}

D.hinge({
  title: 'Quick check',
  q: 'Solve  4x − 3 > 13',
  options: ['x > 4', 'x > 2.5', 'x < 4', 'x > 16'],
  correct: 0,
  notes: 'Answer A. B: subtracted 3 instead of adding. C: flipped the sign for no reason. D: forgot to divide by 4.',
});

{
  const s = frame('Quadratic inequalities', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, 3.4, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
    lines.forEach(([l, b], i) => txt(s, l, x + 0.3, top + 0.9 + i * 0.75, cw - 0.6, 0.65, { size: 21, bold: !!b, color: b ? colour : C.ink }));
  };
  col(MX, 'x² < 9', [['x² = 9 gives x = −3 or 3', 0], ['Between the roots', 0], ['−3 < x < 3', 1]], C.maroon, C.soft);
  col(MX + cw + gap, 'x² − x − 6 > 0', [['(x − 3)(x + 2) = 0: x = 3, −2', 0], ['Outside the roots', 0], ['x < −2  or  x > 3', 1]], C.orange, C.orangeSoft);
  numberLine(s, MX + 0.3, 6.1, cw - 0.6, -5, 5, { from: -3, fromIn: false, to: 3, toIn: false });
  numberLine(s, MX + cw + gap + 0.3, 6.1, cw - 0.6, -5, 5, { from: null, to: -2, toIn: false }, { color: C.orange });
  numberLine(s, MX + cw + gap + 0.3, 6.1, cw - 0.6, -5, 5, { from: 3, fromIn: false, to: null }, { color: C.orange });
  notes(s, 'Higher only. Sketch y = x² − x − 6: it is below the x-axis between the roots and above it outside. Test a value (x = 0 gives −6, not > 0) to check. Regions on graphs are also Higher (A22).');
}

D.myTurnYourTurn({
  title: 'Inequalities', tag: 'Part 1', stepSize: 25, labelW: 3.3, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Solve, or list the integers:',
    steps: [
      { label: '5x + 2 < 17', text: '**x < 3**' },
      { label: '2(x − 1) ≥ 8', text: '**x ≥ 5**' },
      { label: 'integers  −1 ≤ x < 3', text: '**−1, 0, 1, 2**' },
    ],
  },
  yours: {
    q: 'Solve, or list the integers:',
    steps: [
      { label: '3x − 7 > 8', text: '**x > 5**' },
      { label: '4(x + 2) ≤ 20', text: '**x ≤ 3**' },
      { label: 'integers  0 < x ≤ 4', text: '**1, 2, 3, 4**' },
    ],
  },
  notes: 'Mine: 5x < 15; 2x − 2 ≥ 8, 2x ≥ 10. Yours: 3x > 15; 4x + 8 ≤ 20, 4x ≤ 12.',
});

// ---------------- Part 2: sequences ----------------
{
  const s = frame('Part 2: the nth term', { tag: 'A25 nth term' });
  txt(s, 'Find the nth term of  **3, 7, 11, 15, …**', MX, 1.35, W - 2 * MX, 0.55, { size: 24 });
  const terms = [3, 7, 11, 15], tw = 1.25, x0 = MX + 0.3, y0 = 2.2;
  terms.forEach((t, i) => {
    rect(s, x0 + i * (tw + 0.35), y0, tw, 0.9, C.soft, C.maroon, { lw: 2 });
    txt(s, String(t), x0 + i * (tw + 0.35), y0, tw, 0.9, { size: 30, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
    txt(s, `n = ${i + 1}`, x0 + i * (tw + 0.35), y0 - 0.42, tw, 0.4, { size: 15, color: C.grey, align: 'center' });
    if (i < 3) txt(s, '+4', x0 + i * (tw + 0.35) + tw - 0.1, y0 + 0.95, 0.6, 0.4, { size: 18, bold: true, color: C.orange, align: 'center' });
  });
  stepRows(s, [['difference is 4, so start with', '4n'], ['4n gives 4, 8, 12, 16: subtract 1', '4n − 1']], 3.75, { w: 7.4, size: 28, split: 0.35, whySize: 17, lastGreen: true });
  const bx = 8.4, bw = W - MX - bx;
  rect(s, bx, 3.75, bw, 3.05, C.greyLight);
  txt(s, '**10th term:**  4 × 10 − 1 = 39', bx + 0.3, 3.9, bw - 0.6, 0.6, { size: 20 });
  txt(s, '**Is 100 a term?**', bx + 0.3, 4.6, bw - 0.6, 0.5, { size: 20 });
  txt(s, '4n − 1 = 100,  n = 25.25', bx + 0.3, 5.15, bw - 0.6, 0.5, { size: 20 });
  txt(s, 'Not a whole number, so **no**.', bx + 0.3, 5.75, bw - 0.6, 0.6, { size: 20, color: C.green });
  notes(s, 'Decreasing sequences have a negative difference: 20, 17, 14, 11 has nth term 23 − 3n. "Is x a term?" questions use A21: form an equation and solve it.');
}

D.hinge({
  title: 'Quick check',
  q: 'What is the nth term of  5, 8, 11, 14, … ?',
  options: ['3n + 2', 'n + 3', '5n + 3', '3n + 5'],
  correct: 0,
  notes: 'Answer A. B: used the difference as the constant. C: used the first term as the coefficient. D: used the first term as the constant (gives 8, 11, …).',
});

{
  const s = frame('Special sequences', { tag: 'A24 sequences' });
  const items = [
    ['Square numbers', '1, 4, 9, 16, 25', 'n²'], ['Cube numbers', '1, 8, 27, 64, 125', 'n³'],
    ['Triangular numbers', '1, 3, 6, 10, 15', 'add 2, 3, 4, …'], ['Fibonacci', '1, 1, 2, 3, 5, 8', 'add the previous two'],
    ['Geometric', '2, 6, 18, 54', 'multiply by 3 each time'], ['Arithmetic (linear)', '3, 7, 11, 15', 'add 4 each time'],
  ];
  const cw = (W - 2 * MX - 0.3) / 2;
  items.forEach(([a, b, c], i) => {
    const x = MX + (i % 2) * (cw + 0.3), y = 1.4 + Math.floor(i / 2) * 1.55;
    rect(s, x, y, cw, 1.4, Math.floor(i / 2) % 2 ? C.white : C.soft, C.line);
    txt(s, a, x + 0.3, y + 0.08, cw - 0.6, 0.45, { size: 19, bold: true, color: C.maroon });
    txt(s, b, x + 0.3, y + 0.5, cw - 0.6, 0.5, { size: 25, bold: true });
    txt(s, c, x + 0.3, y + 0.95, cw - 0.6, 0.4, { size: 16, color: C.grey });
  });
  notes(s, 'Students must recognise all of these. Geometric sequences multiply by a common ratio; arithmetic sequences add a common difference.');
}

{
  const s = frame('Quadratic sequences', HT);
  txt(s, 'Find the nth term of  **4, 7, 12, 19, 28, …**', MX, 1.35, W - 2 * MX, 0.55, { size: 24 });
  const rows = [['Sequence', ['4', '7', '12', '19', '28']], ['1st difference', ['3', '5', '7', '9']], ['2nd difference', ['2', '2', '2']]];
  rows.forEach(([lab, vals], r) => {
    txt(s, lab, MX, 2.2 + r * 0.9, 2.6, 0.7, { size: 18, bold: true, color: [C.maroon, C.orange, C.green][r], valign: 'middle' });
    vals.forEach((v, i) => {
      const x = MX + 2.4 + i * 1.2 + r * 0.6;
      rect(s, x, 2.2 + r * 0.9, 0.95, 0.7, C.white, [C.maroon, C.orange, C.green][r], { lw: 1.5 });
      txt(s, v, x, 2.2 + r * 0.9, 0.95, 0.7, { size: 24, bold: true, align: 'center', valign: 'middle' });
    });
  });
  const bx = 9.6, bw = W - MX - bx;
  rect(s, bx, 2.2, bw, 2.5, C.greyLight);
  txt(s, '2nd difference 2, so **n²** (half of 2 = 1).', bx + 0.25, 2.3, bw - 0.5, 0.9, { size: 18 });
  txt(s, 'n² gives 1, 4, 9, 16, 25: the sequence is **3 more**.', bx + 0.25, 3.25, bw - 0.5, 1.2, { size: 18 });
  rect(s, MX, 5.1, W - 2 * MX, 0.95, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'nth term  =  n² + 3', MX, 5.1, W - 2 * MX, 0.95, { size: 32, bold: true, color: C.green, align: 'center', valign: 'middle' });
  txt(s, 'The coefficient of n² is **half the second difference**.', MX, 6.2, W - 2 * MX, 0.5, { size: 19, align: 'center' });
  notes(s, 'Higher only. Harder ones need a linear part too: subtract the an² sequence and find the nth term of what is left.');
}

D.myTurnYourTurn({
  title: 'Using the nth term', tag: 'Part 2', stepSize: 25, labelW: 2.7, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Sequence  6, 11, 16, 21, …',
    steps: [
      { label: 'nth term', text: '**5n + 1**' },
      { label: '50th term', text: '**251**' },
      { label: 'Is 98 a term?', text: '**No (n = 19.4)**' },
    ],
  },
  yours: {
    q: 'Sequence  9, 13, 17, 21, …',
    steps: [
      { label: 'nth term', text: '**4n + 5**' },
      { label: '50th term', text: '**205**' },
      { label: 'Is 101 a term?', text: '**Yes (n = 24)**' },
    ],
  },
  notes: 'Yours: 4n + 5 = 101 gives 4n = 96, n = 24: a whole number, so 101 is the 24th term.',
});

// ---------------- Part 3: iteration ----------------
{
  const s = frame('Part 3: iteration', HT);
  txt(s, 'x³ + 2x − 5 = 0  has a solution between 1 and 2:  f(1) = **−2**,  f(2) = **7**  (sign change).', MX, 1.35, W - 2 * MX, 0.6, { size: 21 });
  rect(s, MX, 2.1, 6.0, 1.0, C.soft, C.maroon, { lw: 2 });
  txt(s, 'xₙ₊₁ = ∛(5 − 2xₙ)      x₀ = 1', MX + 0.3, 2.1, 5.4, 1.0, { size: 24, bold: true, color: C.maroon, valign: 'middle' });
  const vals = it.slice(0, 5).map((v, i) => [`x${'₀₁₂₃₄'[i]}`, i === 0 ? '1' : v.toFixed(4)]);
  vals.forEach(([a, b], i) => {
    const y = 3.35 + i * 0.66;
    rect(s, MX, y, 6.0, 0.6, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, a, MX + 0.3, y, 1.2, 0.6, { size: 22, bold: true, valign: 'middle' });
    txt(s, b, MX + 1.6, y, 4.0, 0.6, { size: 22, valign: 'middle' });
  });
  const bx = 7.0, bw = W - MX - bx;
  rect(s, bx, 2.1, bw, 4.7, C.greyLight);
  txt(s, 'How to iterate', bx + 0.3, 2.2, bw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  txt(s, '1.  Put x₀ into the formula to get x₁.', bx + 0.3, 2.85, bw - 0.6, 0.6, { size: 19 });
  txt(s, '2.  Put x₁ in to get x₂, and so on.', bx + 0.3, 3.5, bw - 0.6, 0.6, { size: 19 });
  txt(s, '3.  The values get closer to the solution, **x ≈ 1.33**.', bx + 0.3, 4.15, bw - 0.6, 0.9, { size: 19 });
  txt(s, 'Calculator: type 1 =, then ∛(5 − 2 Ans) and press = repeatedly.', bx + 0.3, 5.25, bw - 0.6, 1.2, { size: 17, color: C.grey });
  notes(s, `Higher only (A20). Values: x1 = ${it[1].toFixed(4)}, x2 = ${it[2].toFixed(4)}, x3 = ${it[3].toFixed(4)}, x4 = ${it[4].toFixed(4)}; the root is about 1.328. A sign change between f(1) and f(2) shows a root lies between them.`);
}

// ---------------- Practice & assessment ----------------
{
  const qs = [
    'Solve  2x + 5 > 13',
    'List the integers n with  −3 < n ≤ 1',
    'Find the nth term of  7, 10, 13, 16, …',
    'Write the next two terms:  1, 1, 2, 3, 5, …',
    'Solve  3 ≤ 2x − 1 < 9  and list the integer solutions.',
    'Is 75 a term of the sequence with nth term 4n − 3? Explain.',
    'Ali says −2x > 6 means x > −3. Is he right?',
    'HT  Find the nth term of  3, 6, 11, 18, 27, …',
  ];
  const ans = ['x > 4', '−2, −1, 0, 1', '3n + 4', '8, 13', '2 ≤ x < 5:  2, 3, 4', 'No: n = 19.5', 'No: x < −3', 'n² + 2'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 27, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 2x > 8  2) −2, −1, 0, 1  3) 3n + 4  4) 8, 13  5) 4 ≤ 2x < 10  6) 4n = 78, n = 19.5: not whole  7) dividing by −2 flips the sign: x < −3  8) second difference 2, so n²; n² gives 1, 4, 9, 16, 25: add 2.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 20, lineGap: 0.38,
  parts: [
    { l: 'a', q: 'Solve  5x − 2 ≤ 18', m: 2, lines: 1 },
    { l: 'b', q: 'Show  −1 < x ≤ 3  on a number line.', m: 2, lines: 1 },
    { l: 'c', q: 'Find the nth term of  8, 13, 18, 23, …', m: 2, lines: 1 },
    { l: 'd', q: 'Is 99 a term of this sequence? Give a reason.', m: 2, lines: 1 },
    { l: 'e', q: 'HT  Solve  x² − 16 < 0', m: 2, lines: 1 },
  ],
  total: 10,
  scheme: [
    ['(a)', '5x ≤ 20;  x ≤ 4', 'M1 A1', ''],
    ['(b)', 'open circle at −1, filled at 3, joined', 'B2', 'B1 for one end correct'],
    ['(c)', '5n + 3', 'B2', 'B1 for 5n'],
    ['(d)', '5n + 3 = 99, n = 19.2: not a whole number, so no', 'M1 A1', ''],
    ['(e)', '−4 < x < 4', 'B2', 'B1 for ±4 as critical values'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Solve  x + 7 > 12', 'List the integers with  1 < x ≤ 4', 'Find the nth term of  2, 5, 8, 11, …', 'Write the next term:  1, 4, 9, 16, …'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) x > 5  2) 2, 3, 4  3) 3n − 1  4) 25. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Solve: (a) 4x − 1 < 15  (b) 3(x + 2) ≥ 18  (c) −5x ≤ 20',
    'List the integers that satisfy  −2 ≤ 2x < 6.',
    'Find the nth term of  12, 9, 6, 3, …  and its 20th term.',
    'Is 200 a term of the sequence 7n − 3? Explain.',
    'Write the first five terms of a geometric sequence starting 3 with ratio 2.',
    'HT  Use  xₙ₊₁ = ∛(5 − 2xₙ)  with x₀ = 1 to find x₃ to 3 d.p.',
  ], { cols: 2, size: 21 });
  notes(s, `Answers: 1) x < 4; x ≥ 4; x ≥ −4  2) −1 ≤ x < 3: −1, 0, 1, 2  3) 15 − 3n; −45  4) 7n = 203, n = 29: yes  5) 3, 6, 12, 24, 48  6) x₃ = ${it[3].toFixed(3)}.`);
}

D.save(path.join(__dirname, 'AQA_8300_A20-A25_InequalitiesAndSequences.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
