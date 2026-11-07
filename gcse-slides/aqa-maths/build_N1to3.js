// build_N1to3.js — AQA GCSE Mathematics 8300, N1–N3 (with N2/N8 fractions): Number skills
// Ordering and negatives, order of operations and reciprocals, calculating with fractions.
// One two-hour lesson, both tiers.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_N1to3.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'N1–N3', title: 'Number skills' };
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, math, MX, W } = D;
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const F = (n, d) => ({ n, d });

// ======================= numbers (all checked) =======================
calc('DN1', 7 - 10, -3); calc('DN2', 12 / 4 * 3, 9); close('DN3', 3 / 4, 0.75); calc('DN4', 2 * 3 + 4, 10);
const ord = [0.7, 1 / 4, 0.45, 3 / 5, -0.4].sort((a, b) => a - b);
close('order', ord.join() === [-0.4, 0.25, 0.45, 0.6, 0.7].join() ? 1 : 0, 1);
calc('neg1', -3 + 7, 4); calc('neg2', 2 - 9, -7); calc('neg3', -4 - (-6), 2); calc('neg4', -6 * 3, -18); calc('neg5', -20 / -4, 5);
calc('hinge1', -5 - (-8), 3);
calc('bidmas1', 3 + 4 * 5, 23); calc('bidmas2', (3 + 4) * 5, 35); calc('bidmas3', 20 - 6 / 2, 17); calc('bidmas4', 2 * 3 ** 2, 18);
close('recip', 1 / 0.25, 4); close('recip2', (2 / 3) * (3 / 2), 1);
calc('hinge2', 10 - 2 * 3, 4);
calc('MT1', -7 + 3, -4); calc('MT2', 6 - (-2), 8); calc('MT3', -4 * -5, 20); calc('MT4', 8 + 2 * 3 ** 2, 26);
calc('YT1', -2 - 9, -11); calc('YT2', -3 - (-10), 7); calc('YT3', -24 / 6, -4); calc('YT4', (8 + 2) * 3 - 4 ** 2, 14);
close('add', 2 / 3 + 1 / 4, 11 / 12); close('sub', 5 / 6 - 1 / 4, 7 / 12);
close('mul', 2 / 3 * 3 / 5, 2 / 5); close('div', (3 / 4) / (2 / 5), 15 / 8);
close('mixed add', 7 / 3 + 7 / 4, 49 / 12); close('mixed add2', 49 / 12, 4 + 1 / 12);
close('mixed mul', 1.5 * (8 / 3), 4);
calc('of1', 40 / 5 * 3, 24); calc('of2', 63 / 7 * 2, 18); close('as frac', 15 / 60, 1 / 4);
close('hinge3', 1 / 2 + 1 / 3, 5 / 6);
close('MTf1', 3 / 4 + 1 / 6, 11 / 12); close('MTf2', 4 / 5 * 5 / 8, 1 / 2); close('MTf3', (2 / 3) / (4 / 9), 1.5); close('MTf4', 1.25 + 8 / 3, 3 + 11 / 12);
close('YTf1', 2 / 5 + 1 / 3, 11 / 15); close('YTf2', 3 / 7 * 14 / 9, 2 / 3); close('YTf3', (5 / 6) / (5 / 12), 2); close('YTf4', 2.5 - 1.75, 3 / 4);
close('P1', [-2, 0.5, -0.75, 0.25].sort((a, b) => a - b).join() === '-2,-0.75,0.25,0.5' ? 1 : 0, 1);
calc('P2', -8 + 3 * 4, 4); close('P4', 3 / 8 + 1 / 4, 5 / 8); close('P5', (12 / 5) * (5 / 4), 3); calc('P6', 600 / 4 * 3, 450);
calc('P7', -6 + 9 - 5, -2); close('P8', 1 / 3 + 1 / 4, 7 / 12);
calc('exam a', -4 * -6, 24); calc('exam b', 3 + 2 * 5 ** 2, 53); close('exam c', 2 / 3 + 3 / 5, 19 / 15); close('exam d', (7 / 4) / (7 / 8), 2); calc('exam e', 840 / 7 * 3, 360);
calc('exit1', -3 - 5, -8); calc('exit2', 4 + 6 / 2, 7); close('exit3', 1 / 2 + 2 / 5, 9 / 10); close('exit4', 1 / 0.5, 2);
close('HW2', (5 / 9) * (3 / 10), 1 / 6); close('HW3', (4 / 5) / (2 / 15), 6); close('HW4', 3.5 - 1 - 5 / 6, 1 + 2 / 3);
calc('HW5', -12 + 7 * 2, 2); calc('HW6', 480 / 8 * 5, 300);

// ======================= helpers =======================
// cards with optional stacked fractions in the question and the answer
function mathCards(s, items, reveal, o = {}) {
  const cols = 2, gap = 0.3, top = o.top || 1.45, bottom = 6.85, rows = Math.ceil(items.length / cols);
  const cw = (W - 2 * MX - gap) / 2, ch = (bottom - top - gap * (rows - 1)) / rows, pt = o.size || 24;
  items.forEach((it, i) => {
    const x = MX + (i % 2) * (cw + gap), y = top + Math.floor(i / 2) * (ch + gap);
    rect(s, x, y, cw, ch, C.greyLight);
    circle(s, x + 0.42, y + 0.42, 0.48, C.accent);
    txt(s, String(i + 1 + (o.start || 0)), x + 0.18, y + 0.18, 0.48, 0.48, { size: 18, bold: true, color: C.white, align: 'center', valign: 'middle' });
    let qy = y + 0.2;
    if (it.q) { const h = D.textH(it.q, pt, cw - 1.1); txt(s, it.q, x + 0.85, qy, cw - 1.1, h + 0.05, { size: pt }); qy += h + 0.1; }
    if (it.m) math(s, x + 0.85, qy + 0.55, it.m, { size: pt + 2 });
    if (reveal && it.a) {
      const ay = y + ch - 0.7;
      if (Array.isArray(it.a)) {
        if (it.m) math(s, x + cw * 0.55, qy + 0.55, ['=  ', ...it.a], { size: pt + 2, bold: true, color: C.green });
        else math(s, x + 0.85, ay - 0.1, it.a, { size: pt + 2, bold: true, color: C.green });
      }
      else txt(s, it.a, x + 0.85, ay - 0.3, cw - 1.1, 0.6, { size: pt + 2, bold: true, color: C.green, valign: 'middle' });
    }
  });
}
function mathPair(s, title, tag, mine, yours, reveal, noteText) {
  // custom My turn / Your turn for fraction work: each row is [question parts, answer parts]
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.35, bottom = 6.9;
  [[MX, 'My turn', C.maroon, C.white, mine, true], [MX + cw + gap, reveal ? 'Your turn: answer' : 'Your turn', C.orange, C.orangeSoft, yours, reveal]].forEach(([x, head, col, fill, rows, show]) => {
    rect(s, x, top, cw, bottom - top, fill, col === C.maroon ? C.line : 'F3D9B5');
    rect(s, x, top, cw, 0.55, col);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.55, { size: 20, bold: true, color: C.white, valign: 'middle' });
    rows.forEach(([q, a], i) => {
      const yc = top + 1.0 + i * 1.25;
      math(s, x + 0.3, yc, q, { size: 24 });
      if (show) math(s, x + cw * 0.6, yc, a, { size: 24, bold: true, color: col === C.orange ? C.green : C.ink });
    });
  });
  if (noteText) notes(s, noteText);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Ordering, negative numbers, order of operations and fractions',
  bullets: ['Part 1: ordering and negative numbers (N1, N2)', 'Part 2: order of operations and reciprocals (N3)', 'Part 3: calculating with fractions (N2, N8)'],
  notes: 'AQA 8300 N1: order positive and negative integers, decimals and fractions; use =, ≠, <, >, ≤, ≥. N2: apply the four operations to integers, decimals, simple fractions and mixed numbers, positive and negative. N3: recognise and use relationships between operations, including inverse operations; use conventional notation for priority of operations; reciprocals. N8: exact calculations with fractions. About two hours.',
});

D.objectives({
  tag: 'N1–N3',
  items: [
    '**Order** numbers, including negatives, decimals and fractions.',
    'Calculate with **negative numbers** and the **order of operations**.',
    '**Add, subtract, multiply and divide** fractions and mixed numbers.',
  ],
  keywords: ['integer', 'reciprocal', 'numerator', 'denominator', 'mixed number'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Work out  7 − 10', 'Work out  12 ÷ 4 × 3', 'Write  ¾  as a decimal.', 'Work out  2 × 3 + 4'],
  answers: ['−3', '9', '0.75', '10'],
  notes: 'Q2: division and multiplication have equal priority, so work left to right: 3 × 3 = 9 (not 12 ÷ 12 = 1).',
});

D.vocab({
  title: 'Key words', tag: 'N1–N3',
  items: [
    { term: 'Integer', def: 'A **whole number**: positive, negative or zero.' },
    { term: 'Reciprocal', def: '**1 divided by** the number. A number × its reciprocal = **1**.' },
    { term: 'Numerator / denominator', def: 'The **top** / **bottom** number of a fraction.' },
    { term: 'Mixed number', def: 'A whole number and a fraction, e.g. **2⅓**. As an improper fraction: **7/3**.' },
  ],
  notes: 'Improper (top-heavy) fractions are easier to calculate with; convert back to a mixed number for the final answer if the question asks.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: ordering numbers', { tag: 'N1 ordering' });
  txt(s, 'Put in order, smallest first:', MX, 1.35, 5, 0.5, { size: 22 });
  math(s, MX + 4.0, 1.6, ['0.7,   ', F(1, 4), ',   0.45,   ', F(3, 5), ',   −0.4'], { size: 24 });
  txt(s, '**Change them all to decimals**, then compare:', MX, 2.35, W - 2 * MX, 0.5, { size: 21 });
  const cols = [['0.7', '0.70'], ['1/4', '0.25'], ['0.45', '0.45'], ['3/5', '0.60'], ['−0.4', '−0.40']];
  const cw = (W - 2 * MX) / 5;
  cols.forEach(([a, b], i) => {
    rect(s, MX + i * cw, 2.95, cw - 0.1, 0.55, C.maroon);
    txt(s, a, MX + i * cw, 2.95, cw - 0.1, 0.55, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
    rect(s, MX + i * cw, 3.5, cw - 0.1, 0.6, C.soft, C.line);
    txt(s, b, MX + i * cw, 3.5, cw - 0.1, 0.6, { size: 22, align: 'center', valign: 'middle' });
  });
  // number line -0.5 .. 0.5
  const x0 = MX + 0.6, w = W - 2 * MX - 1.2, lo = -0.5, hi = 1, px = v => x0 + (v - lo) / (hi - lo) * w, yl = 5.0;
  hline(s, x0, yl, x0 + w, '4A3F45', 1.75);
  for (let k = 0; k <= 15; k++) { const v = lo + k * 0.1; vline(s, px(v), yl - 0.1, yl + 0.1, '4A3F45', 1.25); txt(s, (Math.round(v * 10) / 10).toString().replace('-', '−'), px(v) - 0.35, yl + 0.15, 0.7, 0.3, { size: 14, color: C.grey, align: 'center' }); }
  [[-0.4, '−0.4', 0], [0.25, '¼', 0], [0.45, '0.45', 0], [0.6, '⅗', 0], [0.7, '0.7', 0]].forEach(([v, l, up]) => {
    circle(s, px(v), yl, 0.17, C.accent);
    txt(s, l, px(v) - 0.4, up ? yl - 0.75 : yl - 0.55, 0.8, 0.35, { size: 17, bold: true, color: C.maroon, align: 'center' });
  });
  rect(s, MX, 5.75, W - 2 * MX, 1.1, C.greenSoft, C.green, { lw: 2 });
  math(s, MX, 6.3, ['−0.4,   ', F(1, 4), ',   0.45,   ', F(3, 5), ',   0.7'], { size: 22, bold: true, color: C.green, align: 'center', w: W - 2 * MX });
  notes(s, 'Writing decimals to the same number of places helps: 0.70 vs 0.45 (students often think 0.45 > 0.7 because 45 > 7). Negative numbers are smaller than every positive number.');
}

{
  const s = frame('Negative numbers', { tag: 'N2 negatives' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 4.2, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.65, C.maroon);
  txt(s, 'Adding and subtracting', MX + 0.3, top, cw - 0.6, 0.65, { size: 21, bold: true, color: C.white, valign: 'middle' });
  [['−3 + 7 = **4**', 'start at −3, go up 7'], ['2 − 9 = **−7**', 'start at 2, go down 9'], ['−4 − (−6) = **2**', 'subtracting a negative = adding']].forEach(([a, b], i) => {
    txt(s, a, MX + 0.3, top + 0.85 + i * 1.1, cw - 0.6, 0.55, { size: 26 });
    txt(s, b, MX + 0.3, top + 1.35 + i * 1.1, cw - 0.6, 0.4, { size: 16, color: C.grey });
  });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 4.2, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.65, C.orange);
  txt(s, 'Multiplying and dividing', x2 + 0.3, top, cw - 0.6, 0.65, { size: 21, bold: true, color: C.white, valign: 'middle' });
  [['Same signs', '**positive**'], ['Different signs', '**negative**']].forEach(([a, b], i) => {
    txt(s, a + ':  ' + b, x2 + 0.3, top + 0.85 + i * 0.6, cw - 0.6, 0.5, { size: 22 });
  });
  txt(s, '−6 × 3 = **−18**', x2 + 0.3, top + 2.2, cw - 0.6, 0.6, { size: 26 });
  txt(s, '−20 ÷ −4 = **5**', x2 + 0.3, top + 2.95, cw - 0.6, 0.6, { size: 26 });
  rect(s, MX, 5.85, W - 2 * MX, 0.95, C.greyLight);
  txt(s, 'Use a **number line** (or a thermometer) for adding and subtracting. Two signs next to each other: **− − is +**, **+ − is −**.', MX + 0.3, 5.85, W - 2 * MX - 0.6, 0.95, { size: 19, valign: 'middle' });
  notes(s, 'Common mistake: applying the multiplication sign rule to addition, e.g. −3 + −4 = +7. It is −7.');
}

D.hinge({
  title: 'Quick check',
  q: 'Work out  −5 − (−8)',
  options: ['3', '−13', '−3', '13'],
  correct: 0,
  notes: 'Answer A: −5 + 8 = 3. B: ignored the double negative. C: −8 + 5. D: 5 + 8.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: order of operations', { tag: 'N3 BIDMAS' });
  const letters = [['B', 'Brackets'], ['I', 'Indices (powers, roots)'], ['D M', 'Divide and Multiply: left to right'], ['A S', 'Add and Subtract: left to right']];
  letters.forEach(([a, b], i) => {
    const y = 1.45 + i * 0.95;
    rect(s, MX, y, 1.2, 0.8, C.maroon);
    txt(s, a, MX, y, 1.2, 0.8, { size: 26, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, b, MX + 1.4, y, 4.6, 0.8, { size: 20, valign: 'middle' });
  });
  const ex = [['3 + 4 × 5', '3 + 20 = **23**'], ['(3 + 4) × 5', '7 × 5 = **35**'], ['20 − 6 ÷ 2', '20 − 3 = **17**'], ['2 × 3²', '2 × 9 = **18**']];
  const bx = 6.8, bw = W - MX - bx;
  ex.forEach(([a, b], i) => {
    const y = 1.45 + i * 1.0;
    rect(s, bx, y, bw, 0.85, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, bx + 0.3, y, 2.6, 0.85, { size: 24, valign: 'middle' });
    txt(s, b, bx + 2.9, y, bw - 3.1, 0.85, { size: 24, valign: 'middle' });
  });
  rect(s, MX, 5.55, W - 2 * MX, 1.25, C.orangeSoft, 'F3D9B5');
  txt(s, 'D and M have **equal** priority, so do them **left to right**:  12 ÷ 4 × 3 = 3 × 3 = **9**, not 12 ÷ 12.  The same goes for A and S.', MX + 0.3, 5.55, W - 2 * MX - 0.6, 1.25, { size: 20, valign: 'middle' });
  notes(s, 'BIDMAS (or BODMAS). Scientific calculators follow these rules; students should be able to predict the result.');
}

{
  const s = frame('Inverse operations and reciprocals', { tag: 'N3 reciprocals' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 5.4, C.greyLight);
  txt(s, 'Inverse operations', MX + 0.3, top + 0.1, cw - 0.6, 0.5, { size: 22, bold: true, color: C.maroon });
  txt(s, '+ and − undo each other.  × and ÷ undo each other.  Squaring and square-rooting undo each other.', MX + 0.3, top + 0.7, cw - 0.6, 1.4, { size: 19 });
  txt(s, 'Use them to **check**:', MX + 0.3, top + 2.3, cw - 0.6, 0.5, { size: 19 });
  txt(s, '48 ÷ 6 = 8   because   8 × 6 = 48', MX + 0.3, top + 2.9, cw - 0.6, 0.6, { size: 22, bold: true });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.4, C.soft, C.line);
  txt(s, 'Reciprocals', x2 + 0.3, top + 0.1, cw - 0.6, 0.5, { size: 22, bold: true, color: C.maroon });
  math(s, x2 + 0.3, top + 1.2, ['5  →  ', F(1, 5)], { size: 26 });
  math(s, x2 + 0.3, top + 2.35, [F(2, 3), '  →  ', F(3, 2)], { size: 26 });
  txt(s, '0.25 = ¼  →  4', x2 + 0.3, top + 3.15, cw - 0.6, 0.6, { size: 26 });
  txt(s, 'Flip the fraction. A number × its reciprocal = 1.  **0** has no reciprocal.', x2 + 0.3, top + 3.95, cw - 0.6, 1.2, { size: 18 });
  notes(s, 'The reciprocal is used when dividing fractions (Part 3). Calculator: the x⁻¹ key.');
}

D.hinge({
  title: 'Quick check',
  q: 'Work out  10 − 2 × 3',
  options: ['4', '24', '16', '−4'],
  correct: 0,
  notes: 'Answer A: multiply first, 10 − 6 = 4. B: worked left to right. C: added. D: 2 × 3 − 10.',
});

D.myTurnYourTurn({
  title: 'Negatives and order of operations', tag: 'Parts 1–2', stepSize: 26, labelW: 4.0, labelSize: 24, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Work out:',
    steps: [
      { label: '−7 + 3', text: '**−4**' },
      { label: '6 − (−2)', text: '**8**' },
      { label: '−4 × −5', text: '**20**' },
      { label: '8 + 2 × 3²', text: '**26**' },
    ],
  },
  yours: {
    q: 'Work out:',
    steps: [
      { label: '−2 − 9', text: '**−11**' },
      { label: '−3 − (−10)', text: '**7**' },
      { label: '−24 ÷ 6', text: '**−4**' },
      { label: '(8 + 2) × 3 − 4²', text: '**14**' },
    ],
  },
  notes: 'Mine, last: 3² = 9, 2 × 9 = 18, 8 + 18 = 26. Yours, last: 10 × 3 − 16 = 14.',
});

// ---------------- Part 3: fractions ----------------
{
  const s = frame('Part 3: adding and subtracting fractions', { tag: 'N2 fractions' });
  txt(s, 'Make the **denominators the same**, then add or subtract the numerators.', MX, 1.35, W - 2 * MX, 0.55, { size: 22 });
  rect(s, MX, 2.1, W - 2 * MX, 1.55, C.soft, C.line);
  math(s, MX + 0.4, 2.88, [F(2, 3), ' + ', F(1, 4), '  =  ', F(8, 12), ' + ', F(3, 12), '  =  ', F(11, 12)], { size: 30 });
  txt(s, '× 4 top and bottom;  × 3 top and bottom', 8.6, 2.1, W - MX - 8.8, 1.55, { size: 17, color: C.orange, valign: 'middle' });
  rect(s, MX, 3.9, W - 2 * MX, 1.55, C.white, C.line);
  math(s, MX + 0.4, 4.68, [F(5, 6), ' − ', F(1, 4), '  =  ', F(10, 12), ' − ', F(3, 12), '  =  ', F(7, 12)], { size: 30 });
  txt(s, '12 is the lowest common multiple of 6 and 4', 8.6, 3.9, W - MX - 8.8, 1.55, { size: 17, color: C.orange, valign: 'middle' });
  rect(s, MX, 5.75, W - 2 * MX, 1.05, C.orangeSoft, 'F3D9B5');
  math(s, MX + 0.3, 6.27, ['Common mistake:  ', F(2, 3), ' + ', F(1, 4), ' = ', F(3, 7), '.   Never add the denominators.'], { size: 22 });
  notes(s, 'Use the lowest common multiple of the denominators, or multiply them. Always simplify the answer.');
}

{
  const s = frame('Multiplying and dividing fractions', { tag: 'N2 fractions' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 4.0, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.65, C.maroon);
  txt(s, 'Multiply: tops × tops, bottoms × bottoms', MX + 0.3, top, cw - 0.6, 0.65, { size: 19, bold: true, color: C.white, valign: 'middle' });
  math(s, MX + 0.3, top + 1.55, [F(2, 3), ' × ', F(3, 5), '  =  ', F(6, 15), '  =  ', F(2, 5)], { size: 28 });
  txt(s, 'Simplify: ÷ 3 top and bottom.', MX + 0.3, top + 2.6, cw - 0.6, 0.5, { size: 18, color: C.grey });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 4.0, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.65, C.orange);
  txt(s, 'Divide: multiply by the reciprocal', x2 + 0.3, top, cw - 0.6, 0.65, { size: 19, bold: true, color: C.white, valign: 'middle' });
  math(s, x2 + 0.3, top + 1.55, [F(3, 4), ' ÷ ', F(2, 5), '  =  ', F(3, 4), ' × ', F(5, 2)], { size: 28 });
  math(s, x2 + 0.3, top + 2.85, ['=  ', F(15, 8), '  =  1', F(7, 8)], { size: 28 });
  rect(s, MX, 5.7, W - 2 * MX, 1.1, C.greyLight);
  txt(s, '**Keep** the first fraction, **change** ÷ to ×, **flip** the second fraction.', MX + 0.3, 5.7, W - 2 * MX - 0.6, 1.1, { size: 21, valign: 'middle' });
  notes(s, 'No common denominator is needed for × and ÷. Cancelling before multiplying keeps numbers small.');
}

{
  const s = frame('Mixed numbers and fractions of amounts', { tag: 'N2 fractions' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 5.4, C.soft, C.line);
  txt(s, 'Mixed numbers: make them improper first', MX + 0.3, top + 0.1, cw - 0.6, 0.5, { size: 19, bold: true, color: C.maroon });
  math(s, MX + 0.3, top + 1.2, ['2', F(1, 3), ' + 1', F(3, 4), ' = ', F(7, 3), ' + ', F(7, 4)], { size: 24 });
  math(s, MX + 0.3, top + 2.45, ['= ', F(28, 12), ' + ', F(21, 12), ' = ', F(49, 12), ' = 4', F(1, 12)], { size: 24 });
  math(s, MX + 0.3, top + 3.75, ['1', F(1, 2), ' × 2', F(2, 3), ' = ', F(3, 2), ' × ', F(8, 3), ' = ', F(24, 6), ' = 4'], { size: 24 });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.4, C.greyLight);
  txt(s, 'Fraction of an amount', x2 + 0.3, top + 0.1, cw - 0.6, 0.5, { size: 19, bold: true, color: C.maroon });
  math(s, x2 + 0.3, top + 1.2, [F(3, 5), ' of 40:   40 ÷ 5 × 3 = 24'], { size: 24 });
  math(s, x2 + 0.3, top + 2.45, [F(2, 7), ' of 63:   63 ÷ 7 × 2 = 18'], { size: 24 });
  txt(s, 'One amount as a fraction of another:', x2 + 0.3, top + 3.3, cw - 0.6, 0.5, { size: 18 });
  math(s, x2 + 0.3, top + 4.4, ['15 out of 60  =  ', F(15, 60), '  =  ', F(1, 4)], { size: 24 });
  notes(s, 'Divide by the denominator, multiply by the numerator. For mixed-number subtraction, improper fractions avoid "borrowing" errors.');
}

D.hinge({
  title: 'Quick check',
  q: 'Work out', qMath: [F(1, 2), ' + ', F(1, 3)],
  options: [[F(5, 6)], [F(2, 5)], [F(2, 6)], [F(1, 6)]],
  correct: 0,
  notes: 'Answer A: 3/6 + 2/6. B: added tops and bottoms. C: added tops only. D: multiplied.',
});

for (const reveal of [false, true]) {
  const s = frame('Fractions', { tag: 'Part 3' });
  mathPair(s, 'Fractions', 'Part 3',
    [[[F(3, 4), ' + ', F(1, 6)], ['= ', F(11, 12)]], [[F(4, 5), ' × ', F(5, 8)], ['= ', F(1, 2)]], [[F(2, 3), ' ÷ ', F(4, 9)], ['= 1', F(1, 2)]], [['1', F(1, 4), ' + 2', F(2, 3)], ['= 3', F(11, 12)]]],
    [[[F(2, 5), ' + ', F(1, 3)], ['= ', F(11, 15)]], [[F(3, 7), ' × ', F(14, 9)], ['= ', F(2, 3)]], [[F(5, 6), ' ÷ ', F(5, 12)], ['= 2']], [['2', F(1, 2), ' − 1', F(3, 4)], ['= ', F(3, 4)]]],
    reveal,
    'Mine: 9/12 + 2/12; 20/40; 2/3 × 9/4 = 18/12; 15/12 + 32/12 = 47/12. Yours: 6/15 + 5/15; 42/63 = 2/3; 5/6 × 12/5 = 2; 10/4 − 7/4 = 3/4.');
}

// ---------------- Practice & assessment ----------------
const prac = [
  { q: 'Order, smallest first:  −2,  0.5,  −0.75,  ¼', a: '−2, −0.75, ¼, 0.5' },
  { q: 'Work out  −8 + 3 × 4', a: '4' },
  { q: 'Write down the reciprocal of', m: [F(3, 7)], a: [F(7, 3)] },
  { q: 'Work out', m: [F(3, 8), ' + ', F(1, 4)], a: [F(5, 8)] },
  { q: 'Work out', m: ['2', F(2, 5), ' × 1', F(1, 4)], a: ['3'] },
  { q: 'A recipe uses ¾ of a 600 g bag of flour. How many grams is that?', a: '450 g' },
  { q: 'It is −6 °C. The temperature rises 9 degrees then falls 5. What is it now?', a: '−2 °C' },
  { q: 'Jo says  ⅓ + ¼ = 2/7.  Explain her mistake and correct it.', a: [F(4, 12), ' + ', F(3, 12), ' = ', F(7, 12)] },
];
for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
  const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
  mathCards(s, prac.slice(k, k + 4), reveal, { start: k, size: 23 });
  notes(s, 'Answers: 1) −2, −0.75, 0.25, 0.5  2) −8 + 12 = 4  3) 7/3  4) 3/8 + 2/8 = 5/8  5) 12/5 × 5/4 = 3  6) 600 ÷ 4 × 3 = 450 g  7) −6 + 9 − 5 = −2 °C  8) she added the denominators: 4/12 + 3/12 = 7/12.');
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 9 marks', size: 19, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Work out  −4 × −6', m: 1, lines: 0 },
    { l: 'b', q: 'Work out  3 + 2 × 5²', m: 2, lines: 0 },
    { l: 'c', q: 'Work out', math: [F(2, 3), ' + ', F(3, 5), '   Give your answer as a mixed number.'], m: 2, lines: 1 },
    { l: 'd', q: 'Work out', math: ['1', F(3, 4), ' ÷ ', F(7, 8)], m: 2, lines: 1 },
    { l: 'e', q: 'A school has 840 students. 3/7 of them walk to school. How many walk?', m: 2, lines: 1 },
  ],
  total: 9,
  scheme: [
    ['(a)', '24', 'B1', ''],
    ['(b)', '3 + 2 × 25 = 53', 'M1 A1', 'M1 for 5² = 25 first'],
    ['(c)', '10/15 + 9/15 = 19/15 = 1 4/15', 'M1 A1', 'M1 common denominator'],
    ['(d)', '7/4 × 8/7 = 2', 'M1 A1', 'M1 improper and reciprocal'],
    ['(e)', '840 ÷ 7 × 3 = 360', 'M1 A1', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  mathCards(s, [{ q: 'Work out  −3 − 5' }, { q: 'Work out  4 + 6 ÷ 2' }, { q: 'Work out', m: [F(1, 2), ' + ', F(2, 5)] }, { q: 'Write down the reciprocal of 0.5.' }], false, { size: 25 });
  notes(s, 'Answers: 1) −8  2) 7  3) 5/10 + 4/10 = 9/10  4) 2. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  mathCards(s, [
    { q: 'Order, smallest first:  0.6,  ⅝,  −1.2,  0.58,  −1' },
    { q: 'Work out', m: [F(5, 9), ' × ', F(3, 10)] },
    { q: 'Work out', m: [F(4, 5), ' ÷ ', F(2, 15)] },
    { q: 'Work out', m: ['3', F(1, 2), ' − 1', F(5, 6)] },
    { q: 'Work out  −12 + 7 × 2, and then  (−12 + 7) × 2.' },
    { q: 'A plane has 480 seats. ⅝ are filled. How many seats are filled?' },
  ], false, { size: 20 });
  notes(s, 'Answers: 1) −1.2, −1, 0.58, 0.6, 0.625  2) 15/90 = 1/6  3) 4/5 × 15/2 = 6  4) 21/6 − 11/6 = 10/6 = 1 2/3  5) 2 and −10  6) 300.');
}
calc('HW5b', (-12 + 7) * 2, -10);

D.save(path.join(__dirname, 'AQA_8300_N1-N3_NumberSkills.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
