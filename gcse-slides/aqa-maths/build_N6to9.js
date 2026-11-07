// build_N6to9.js — AQA GCSE Mathematics 8300, N6–N9 Powers, roots, standard form and surds
// One two-hour lesson, both tiers (fractional indices and surds tagged HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_N6to9.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'N6–N9', title: 'Powers, roots and standard form' };
const D = T.init(DECK);
const { frame, notes, txt, rect, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const F = (n, d) => ({ n, d });

// ======================= numbers (all checked) =======================
calc('DN1', 5 ** 2, 25); calc('DN2', 2 ** 3, 8); calc('DN3', Math.sqrt(49), 7); calc('DN4', 10 ** 3, 1000);
calc('sqrt50 between', Math.floor(Math.sqrt(50)), 7); close('sqrt50', Math.round(Math.sqrt(50) * 10) / 10, 7.1);
calc('law1', 3 ** 4 * 3 ** 2, 3 ** 6); calc('law2', 5 ** 7 / 5 ** 3, 5 ** 4); calc('law3', (2 ** 3) ** 2, 2 ** 6); calc('law0', 7 ** 0, 1); close('lawneg', 2 ** -3, 1 / 8);
close('frac1', 16 ** 0.5, 4); close('frac2', 27 ** (1 / 3), 3); close('frac3', 8 ** (2 / 3), 4); close('frac4', 25 ** -0.5, 1 / 5);
calc('MT1', 4 ** 3 * 4 ** 5, 4 ** 8); calc('MT2', 6 ** 9 / 6 ** 4, 6 ** 5); calc('MT3', (5 ** 2) ** 4, 5 ** 8); close('MT4', 3 ** -2, 1 / 9);
calc('YT1', 2 ** 6 * 2 ** 3, 2 ** 9); calc('YT2', 9 ** 7 / 9, 9 ** 6); calc('YT3', (2 ** 3) ** 4, 2 ** 12); close('YT4', 10 ** -3, 1 / 1000);
calc('sf1', 4.5e4, 45000); close('sf2', 3.6e-3, 0.0036); calc('sf3', 3e4 * 2e5, 6e9); calc('sf4', 8e6 / 4e2, 2e4); calc('sf5', 5e3 * 4e2, 2e6);
close('hinge sf', 5.2e-4, 0.00052);
calc('pi', 5 ** 2, 25);
close('surd1', Math.sqrt(12), 2 * Math.sqrt(3)); close('surd2', Math.sqrt(50), 5 * Math.sqrt(2)); close('surd3', Math.sqrt(2) * Math.sqrt(8), 4);
close('surd4', 3 * Math.sqrt(2) + 5 * Math.sqrt(2), 8 * Math.sqrt(2)); close('surd5', 6 / Math.sqrt(3), 2 * Math.sqrt(3));
calc('MTs1', 7.2e4, 72000); close('MTs2', 9e-4, 0.0009); close('MTs3', 6e5 * 3e2, 1.8e8); close('MTs4', Math.sqrt(18), 3 * Math.sqrt(2));
calc('YTs1', 3.8e5, 380000); close('YTs2', 4.5e-2, 0.045); close('YTs3', 9e7 / 3e3, 3e4); close('YTs4', Math.sqrt(75), 5 * Math.sqrt(3));
calc('P1', 4 ** 3, 64); calc('P2', 7 ** 5 * 7 ** 3, 7 ** 8); close('P3', 2 ** -4, 1 / 16); calc('P4', 6.3e6, 6300000);
calc('P5', Math.floor(Math.sqrt(70)), 8); calc('P6', 4e3 * 5e4, 2e8); calc('P7', 3 ** 2, 9); close('P8', Math.sqrt(48), 4 * Math.sqrt(3));
calc('exam a', 2 ** 5, 32); calc('exam b', (2 ** 4) ** 3 / 2 ** 5, 2 ** 7); close('exam c', 6.7e-4, 0.00067); close('exam d', 3e5 * 6e-2, 1.8e4);
close('exam e', Math.sqrt(45) + Math.sqrt(20), 5 * Math.sqrt(5)); close('exam f', 10 / Math.sqrt(5), 2 * Math.sqrt(5));
calc('exit1', 3 ** 4, 81); calc('exit2', 2 ** 6 / 2 ** 2, 2 ** 4); calc('exit3', 5e4, 50000); calc('exit4', 5 ** 0, 1);
close('HW1', Math.round(Math.sqrt(40) * 10) / 10, 6.3); close('HW3', 4 ** -2, 1 / 16); close('HW4', 8.2e-5, 0.000082); calc('HW4b', 9.1e6, 9100000);
close('HW5', 2.4e6 / 8e2, 3e3); close('HW6a', Math.sqrt(72), 6 * Math.sqrt(2)); close('HW6b', 4 / Math.sqrt(2), 2 * Math.sqrt(2));

// ======================= helpers =======================
// base with a superscript index, e.g. pw(s, x, y, [['16', '1/2'], ' = √16 = 4'])
function pw(s, x, y, parts, o = {}) {
  const runs = [];
  parts.forEach(p => {
    if (typeof p === 'string') runs.push({ text: p, options: {} });
    else { runs.push({ text: p[0], options: {} }); runs.push({ text: p[1], options: { superscript: true } }); }
  });
  s.addText(runs.map(r => ({ text: r.text, options: Object.assign({ color: o.color || C.ink, bold: !!o.bold }, r.options) })), { x, y, w: o.w || 6, h: o.h || 0.7, fontFace: 'Arial', fontSize: o.size || 26, valign: 'middle', margin: 0 });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Powers and roots, index laws, standard form, exact answers and surds',
  bullets: ['Part 1: powers and roots (N6)', 'Part 2: the laws of indices (N7)', 'Part 3: standard form (N9)', 'Part 4: exact answers and surds (N8)'],
  notes: 'AQA 8300 N6: use positive integer powers and associated real roots; recognise powers of 2, 3, 4, 5; estimate powers and roots. N7: calculate with roots and integer indices; fractional indices are Higher. N8: calculate exactly with fractions and multiples of π; surds are Higher. N9: standard form A × 10ⁿ. About two hours.',
});

D.objectives({
  tag: 'N6–N9',
  items: [
    'Work with **powers** and **roots**, and estimate roots.',
    'Use the **laws of indices**, including zero and negative powers.',
    'Write and calculate with numbers in **standard form**.',
    'Give **exact** answers.  **HT:** fractional indices and **surds**.',
  ],
  keywords: ['power', 'index', 'root', 'standard form', 'surd'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Work out  5²', 'Work out  2³', 'Work out  √49', 'Work out  10³'],
  answers: ['25', '8', '7', '1000'],
  notes: 'Common errors: 2³ = 6 and 5² = 10. Powers mean repeated multiplying.',
});

D.vocab({
  title: 'Key words', tag: 'N6–N9',
  items: [
    { term: 'Power / index', def: 'How many times a number is multiplied by itself. In **2⁵**, the index is **5**.' },
    { term: 'Root', def: 'The inverse of a power: **√49 = 7** because 7² = 49;  **∛8 = 2**.' },
    { term: 'Standard form', def: '**A × 10ⁿ**, where **1 ≤ A < 10** and n is an integer.' },
    { term: 'Surd', def: 'A root that is not a whole number, e.g. **√2**. Leave it as a root for an **exact** answer.' },
  ],
  notes: 'Index (plural indices) = power = exponent.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: powers and roots', { tag: 'N6 powers' });
  const sq = Array.from({ length: 15 }, (_, i) => `${i + 1}² = ${(i + 1) ** 2}`);
  txt(s, 'Square numbers to learn', MX, 1.35, 6, 0.45, { size: 20, bold: true, color: C.maroon });
  sq.forEach((t, i) => {
    const c = i % 3, r = Math.floor(i / 3), x = MX + c * 2.05, y = 1.9 + r * 0.62;
    rect(s, x, y, 1.95, 0.54, r % 2 ? C.white : C.soft, C.line);
    txt(s, t, x + 0.15, y, 1.8, 0.54, { size: 18, valign: 'middle' });
  });
  txt(s, 'Cubes:  1,  8,  27,  64,  125, …,  1000 (= 10³)', MX, 5.1, 6.2, 0.5, { size: 19, bold: true });
  const bx = 6.9, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.4, C.greyLight);
  txt(s, 'Estimating a root', bx + 0.3, 1.5, bw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  txt(s, 'Estimate  √50', bx + 0.3, 2.1, bw - 0.6, 0.55, { size: 24 });
  txt(s, '49 < 50 < 64,  so  7 < √50 < 8', bx + 0.3, 2.8, bw - 0.6, 0.55, { size: 22 });
  txt(s, '50 is very close to 49, so  √50 ≈ **7.1**', bx + 0.3, 3.5, bw - 0.6, 0.8, { size: 22 });
  txt(s, 'Square roots of positive numbers have two values:  x² = 49  gives  x = 7 or −7.', bx + 0.3, 4.6, bw - 0.6, 1.2, { size: 18, color: C.grey });
  notes(s, 'AQA expects instant recall of squares to 15² and the cubes of 1, 2, 3, 4, 5 and 10. √50 = 7.07.');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the laws of indices', { tag: 'N7 indices' });
  const rows = [
    ['Multiply: add the powers', 'aᵐ × aⁿ = aᵐ⁺ⁿ', '3⁴ × 3² = 3⁶'],
    ['Divide: subtract the powers', 'aᵐ ÷ aⁿ = aᵐ⁻ⁿ', '5⁷ ÷ 5³ = 5⁴'],
    ['Power of a power: multiply', '(aᵐ)ⁿ = aᵐⁿ', '(2³)² = 2⁶'],
    ['Power zero', [['a', '0'], ' = 1'], [['7', '0'], ' = 1']],
  ];
  rows.forEach(([a, b, c], i) => {
    const y = 1.4 + i * 1.0;
    rect(s, MX, y, W - 2 * MX, 0.88, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, MX + 0.3, y, 4.6, 0.88, { size: 19, valign: 'middle' });
    if (typeof b === 'string') txt(s, b, MX + 5.0, y, 3.6, 0.88, { size: 26, bold: true, color: C.maroon, valign: 'middle' });
    else pw(s, MX + 5.0, y, b, { w: 3.6, h: 0.88, size: 26, bold: true, color: C.maroon });
    if (typeof c === 'string') txt(s, c, MX + 8.7, y, W - 2 * MX - 8.9, 0.88, { size: 26, valign: 'middle' });
    else pw(s, MX + 8.7, y, c, { w: W - 2 * MX - 8.9, h: 0.88, size: 26 });
  });
  const y = 1.4 + 4 * 1.0;
  rect(s, MX, y, W - 2 * MX, 1.25, C.orangeSoft, 'F3D9B5');
  txt(s, 'Negative power: a reciprocal', MX + 0.3, y, 4.6, 1.25, { size: 19, valign: 'middle' });
  math(s, MX + 5.0, y + 0.62, ['a⁻ⁿ = ', F(1, 'aⁿ')], { size: 26, bold: true, color: C.maroon });
  math(s, MX + 8.7, y + 0.62, ['2⁻³ = ', F(1, '2³'), ' = ', F(1, 8)], { size: 26 });
  txt(s, 'The laws only work when the **base is the same**.', MX, 6.65, W - 2 * MX, 0.35, { size: 17, color: C.grey });
  notes(s, 'Show why: 3⁴ × 3² = (3 × 3 × 3 × 3) × (3 × 3) = 3⁶. A negative power does NOT make the number negative: 2⁻³ = 1/8.');
}

D.hinge({
  title: 'Quick check',
  q: 'Simplify  x⁵ × x³',
  options: ['x⁸', 'x¹⁵', 'x²', '2x⁸'],
  correct: 0,
  notes: 'Answer A: add the powers. B multiplied the powers. C subtracted. D added the x terms as well.',
});

{
  const s = frame('Fractional indices', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.2, C.soft, C.line);
  txt(s, 'The **bottom** of the fraction is a **root**; the **top** is a **power**.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.2, { size: 22, valign: 'middle' });
  const ex = [
    [[['16', '1/2'], '  =  √16  =  4'], 'square root'],
    [[['27', '1/3'], '  =  ∛27  =  3'], 'cube root'],
    [[['8', '2/3'], '  =  (∛8)²  =  2²  =  4'], 'root first, then the power'],
    [[['25', '−1/2'], '  =  1 ÷ √25  =  1/5'], 'negative: reciprocal too'],
  ];
  ex.forEach(([p, why], i) => {
    const y = 2.85 + i * 0.98;
    rect(s, MX, y, W - 2 * MX, 0.85, i % 2 ? C.white : C.greyLight, C.line);
    pw(s, MX + 0.3, y + 0.07, p, { size: 28, w: 7.5 });
    txt(s, why, MX + 8.0, y, W - 2 * MX - 8.2, 0.85, { size: 18, color: C.orange, valign: 'middle' });
  });
  notes(s, 'Higher only. Always take the root first: it keeps the numbers small. 8 to the power 2/3: ∛8 = 2, then 2² = 4.');
}

D.myTurnYourTurn({
  title: 'Laws of indices', tag: 'Part 2', stepSize: 28, labelW: 3.4, labelSize: 26, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Simplify or work out:',
    steps: [
      { label: '4³ × 4⁵', text: '**4⁸**' },
      { label: '6⁹ ÷ 6⁴', text: '**6⁵**' },
      { label: '(5²)⁴', text: '**5⁸**' },
      { label: '3⁻²', math: [F(1, 9)], bold: true },
    ],
  },
  yours: {
    q: 'Simplify or work out:',
    steps: [
      { label: '2⁶ × 2³', text: '**2⁹**' },
      { label: '9⁷ ÷ 9', text: '**9⁶**' },
      { label: '(x³)⁴', text: '**x¹²**' },
      { label: '10⁻³', math: [F(1, 1000)], bold: true },
    ],
  },
  notes: '9 = 9¹, so 9⁷ ÷ 9 = 9⁶. 3⁻² = 1/3² = 1/9.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: standard form', { tag: 'N9 standard form' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, '**A × 10ⁿ**     A is between 1 and 10 (1 ≤ A < 10),  n is a whole number.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 23, valign: 'middle' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.65;
  const col = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, 4.15, soft, colour);
    rect(s, x, top, cw, 0.65, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.65, { size: 21, bold: true, color: C.white, valign: 'middle' });
    lines.forEach(([l, b], i) => txt(s, l, x + 0.3, top + 0.85 + i * 0.8, cw - 0.6, 0.7, { size: b ? 26 : 19, bold: !!b, color: b ? colour : C.ink }));
  };
  col(MX, 'Big numbers: positive power', [['45 000', 1], ['The decimal point moves 4 places', 0], ['= 4.5 × 10⁴', 1], ['8 × 10⁶ = 8 000 000', 0]], C.maroon, C.soft);
  col(MX + cw + gap, 'Small numbers: negative power', [['0.0036', 1], ['The decimal point moves 3 places', 0], ['= 3.6 × 10⁻³', 1], ['2 × 10⁻⁴ = 0.0002', 0]], C.orange, C.orangeSoft);
  notes(s, 'Common errors: 45 × 10³ (A not between 1 and 10) and 3.6 × 10³ for a small number. A quick check: is the original number big (positive power) or small (negative power)?');
}

{
  const s = frame('Calculating in standard form', { tag: 'N9 standard form' });
  const ex = [
    ['(3 × 10⁴) × (2 × 10⁵)', 'multiply the numbers, add the powers', '= 6 × 10⁹'],
    ['(8 × 10⁶) ÷ (4 × 10²)', 'divide the numbers, subtract the powers', '= 2 × 10⁴'],
    ['(5 × 10³) × (4 × 10²)', '= 20 × 10⁵, but 20 is not between 1 and 10', '= 2 × 10⁶'],
  ];
  ex.forEach(([a, b, c], i) => {
    const y = 1.45 + i * 1.6;
    rect(s, MX, y, W - 2 * MX, 1.4, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, MX + 0.3, y + 0.1, 6.0, 0.65, { size: 26, bold: true });
    txt(s, b, MX + 0.3, y + 0.75, 6.4, 0.55, { size: 18, color: C.orange });
    txt(s, c, MX + 7.6, y, W - 2 * MX - 7.8, 1.4, { size: 30, bold: true, color: C.green, valign: 'middle' });
  });
  rect(s, MX, 6.3, W - 2 * MX, 0.55, C.greyLight);
  txt(s, 'Calculator: use the ×10ˣ key. Always check the final answer is in standard form.', MX + 0.3, 6.3, W - 2 * MX - 0.6, 0.55, { size: 18, valign: 'middle' });
  notes(s, '20 × 10⁵ = 2 × 10¹ × 10⁵ = 2 × 10⁶. Adding and subtracting in standard form: convert to ordinary numbers first.');
}

D.hinge({
  title: 'Quick check',
  q: 'Write  0.00052  in standard form.',
  options: ['5.2 × 10⁴', '5.2 × 10⁻⁴', '52 × 10⁻⁵', '5.2 × 10⁻³'],
  correct: 1,
  notes: 'Answer B. A: positive power for a small number. C: 52 is not between 1 and 10. D: counted the places wrongly.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: exact answers and surds', { tag: 'N8 exact' });
  rect(s, MX, 1.4, W - 2 * MX, 1.55, C.soft, C.line);
  txt(s, '**Exact answers in terms of π:** a circle of radius 5 cm has area  π × 5² = **25π cm²**.  Do not round: leave the π in.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.55, { size: 21, valign: 'middle' });
  rect(s, MX, 3.15, W - 2 * MX, 0.6, C.red);
  txt(s, 'HT   Surds', MX + 0.3, 3.15, W - 2 * MX - 0.6, 0.6, { size: 20, bold: true, color: C.white, valign: 'middle' });
  const ex = [
    ['Simplify: find a square factor', '√12 = √4 × √3 = 2√3', '√50 = √25 × √2 = 5√2'],
    ['Multiply and add', '√2 × √8 = √16 = 4', '3√2 + 5√2 = 8√2'],
  ];
  ex.forEach(([a, b, c], i) => {
    const y = 3.9 + i * 0.95;
    rect(s, MX, y, W - 2 * MX, 0.85, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, a, MX + 0.3, y, 3.9, 0.85, { size: 17, color: C.orange, valign: 'middle' });
    txt(s, b, MX + 4.2, y, 3.9, 0.85, { size: 22, bold: true, valign: 'middle' });
    txt(s, c, MX + 8.2, y, W - 2 * MX - 8.4, 0.85, { size: 22, bold: true, valign: 'middle' });
  });
  rect(s, MX, 5.85, W - 2 * MX, 1.0, C.greyLight, C.line);
  txt(s, 'Rationalise the denominator', MX + 0.3, 5.85, 3.9, 1.0, { size: 17, color: C.orange, valign: 'middle' });
  math(s, MX + 4.2, 6.35, [F(6, '√3'), ' = ', F('6 × √3', '√3 × √3'), ' = ', F('6√3', 3), ' = 2√3'], { size: 22, bold: true });
  notes(s, 'Surds are Higher only. Rationalising means removing the root from the denominator by multiplying top and bottom by the root.');
}

D.myTurnYourTurn({
  title: 'Standard form and surds', tag: 'Parts 3–4', stepSize: 24, labelW: 3.3, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Write in standard form, or simplify:',
    steps: [
      { label: '72 000', text: '**7.2 × 10⁴**' },
      { label: '0.0009', text: '**9 × 10⁻⁴**' },
      { label: '(6 × 10⁵) × (3 × 10²)', text: '**1.8 × 10⁸**' },
      { label: 'HT  √18', text: '**3√2**' },
    ],
  },
  yours: {
    q: 'Write in standard form, or simplify:',
    steps: [
      { label: '380 000', text: '**3.8 × 10⁵**' },
      { label: '0.045', text: '**4.5 × 10⁻²**' },
      { label: '(9 × 10⁷) ÷ (3 × 10³)', text: '**3 × 10⁴**' },
      { label: 'HT  √75', text: '**5√3**' },
    ],
  },
  notes: 'Mine, third: 18 × 10⁷ = 1.8 × 10⁸. Yours, last: √75 = √25 × √3.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Work out  4³', '64'], ['Simplify  7⁵ × 7³', '7⁸'], ['Write  2⁻⁴  as a fraction.', '1/16'], ['Write  6 300 000  in standard form.', '6.3 × 10⁶'],
    ['Between which two whole numbers is √70?', '8 and 9'], ['Work out  (4 × 10³) × (5 × 10⁴). Give your answer in standard form.', '2 × 10⁸'],
    ['Find the area of a circle of radius 3 cm. Give your answer in terms of π.', '9π cm²'], ['HT  Simplify  √48', '4√3'],
  ];
  for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 30, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 64  2) 7⁸  3) 1/2⁴ = 1/16  4) 6.3 × 10⁶  5) 64 < 70 < 81, so 8 and 9  6) 20 × 10⁷ = 2 × 10⁸  7) π × 3² = 9π cm²  8) √16 × √3 = 4√3.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Work out  2⁵', m: 1, lines: 0 },
    { l: 'b', q: 'Simplify  (x⁴)³ ÷ x⁵', m: 2, lines: 1 },
    { l: 'c', q: 'Write  0.00067  in standard form.', m: 1, lines: 0 },
    { l: 'd', q: 'Work out  (3 × 10⁵) × (6 × 10⁻²). Give your answer in standard form.', m: 2, lines: 1 },
    { l: 'e', q: 'HT  Simplify  √45 + √20', m: 2, lines: 1 },
    { l: 'f', q: 'HT  Rationalise the denominator:', math: [F(10, '√5')], m: 2, lines: 0 },
  ],
  total: 10,
  scheme: [
    ['(a)', '32', 'B1', ''],
    ['(b)', 'x¹² ÷ x⁵ = x⁷', 'M1 A1', 'M1 for x¹²'],
    ['(c)', '6.7 × 10⁻⁴', 'B1', ''],
    ['(d)', '18 × 10³ = 1.8 × 10⁴', 'M1 A1', 'M1 for 18 × 10³ oe'],
    ['(e)', '3√5 + 2√5 = 5√5', 'M1 A1', 'M1 for 3√5 or 2√5'],
    ['(f)', '10√5 ÷ 5 = 2√5', 'M1 A1', 'M1 multiply by √5/√5'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Work out  3⁴', 'Simplify  a⁶ ÷ a²', 'Write  50 000  in standard form.', 'Write  0.001  as a power of 10.'], { cols: 2, size: 27 });
  notes(s, 'Answers: 1) 81  2) a⁴  3) 5 × 10⁴  4) 10⁻³. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Estimate  √40  to 1 decimal place. Explain your method.',
    'Simplify:  (a) 3⁴ × 3⁶   (b) y⁹ ÷ y³',
    'Write  4⁻²  as a fraction.',
    'Write in standard form: (a) 0.000082  (b) 9 100 000',
    'Work out  (2.4 × 10⁶) ÷ (8 × 10²). Give your answer in standard form.',
    'HT  Simplify  √72,  then rationalise  4/√2.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 36 < 40 < 49; 40 is nearer 36, √40 ≈ 6.3  2) 3¹⁰; y⁶  3) 1/16  4) 8.2 × 10⁻⁵; 9.1 × 10⁶  5) 0.3 × 10⁴ = 3 × 10³  6) 6√2; 4√2/2 = 2√2.');
}

D.save(path.join(__dirname, 'AQA_8300_N6-N9_PowersAndStandardForm.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
