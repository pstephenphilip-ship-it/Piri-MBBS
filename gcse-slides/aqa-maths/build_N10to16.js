// build_N10to16.js — AQA GCSE Mathematics 8300, N10–N16 Fractions, decimals, percentages, rounding and bounds
// One two-hour lesson, both tiers (recurring decimals and bounds in calculations tagged HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_N10to16.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'N10–N16', title: 'Fractions, rounding and bounds' };
const D = T.init(DECK);
const { frame, notes, txt, rect, math, circle, hline, vline, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const F = (n, d) => ({ n, d });
// round to n decimal places / significant figures without floating-point surprises
const dp = (x, n) => Number(Math.round(Number(x + 'e' + n)) + 'e-' + n);
const sf = (x, n) => { const k = n - 1 - Math.floor(Math.log10(Math.abs(x))); return k >= 0 ? dp(x, k) : Math.round(x / 10 ** -k) * 10 ** -k; };

// ======================= numbers (all checked) =======================
calc('DN1', 20 / 4, 5); calc('DN2', 0.3 * 100, 30); close('DN3', dp(4.68, 1), 4.7); calc('DN4', 3 * 100, 300);
close('fd1', 3 / 8, 0.375); close('fd2', 35 / 100, 7 / 20); close('fd3', 4 / 100, 0.04); close('fd4', 1 / 3, 0.3333333333333333);
calc('op1', 40 / 5 * 3, 24); close('op2', 0.15 * 60, 9); close('op3', 80 * 1.2, 96); close('op4', 50 * 0.7, 35); close('op5', 12 / 48, 0.25);
close('rec1', 27 / 99, 3 / 11); close('rec1b', 3 / 11, 0.272727272727, 1e-11); close('rec2', 4 / 9, 0.4444444444, 1e-9);
close('hinge1', 0.35, 7 / 20);
calc('u1', 3.5 * 1000, 3500); close('u2', 2400 / 1000, 2.4); calc('u3', 0.25 * 60, 15); close('u4', 45 / 60, 0.75); close('u5', 650 / 100, 6.5);
close('r1', dp(3.14159, 2), 3.14); close('r2', dp(7.3962, 2), 7.40); calc('r3', sf(45362, 2), 45000); close('r4', sf(0.004076, 2), 0.0041); calc('r5', sf(3.987, 1), 4);
close('est', 20 * 5 / 0.5, 200); close('est actual', 21.3 * 4.87 / 0.52, 199.48, 0.01);
close('hinge2', sf(0.04076, 2), 0.041);
close('MT1', dp(6.8471, 1), 6.8); close('MT2', sf(6.8471, 3), 6.85); close('MT3', sf(0.03092, 1), 0.03); calc('MT4', 40 * 6, 240);
close('YT1', dp(12.968, 2), 12.97); calc('YT2', sf(5283, 2), 5300); close('YT3', sf(0.000716, 1), 0.0007); calc('YT4', 600 / 20, 30);
close('ei1a', 7.4 - 0.05, 7.35); close('ei1b', 7.4 + 0.05, 7.45); calc('ei2a', 80 - 5, 75); calc('ei2b', 80 + 5, 85);
close('bd add', 6.25 + 3.55, 9.8); close('bd sub', 6.25 - 3.45, 2.8); close('bd speed', sf(100.5 / 12.35, 3), 8.14); close('bd speed lo', sf(99.5 / 12.45, 3), 7.99);
close('hinge3a', 6.4 - 0.05, 6.35); close('hinge3b', 6.4 + 0.05, 6.45);
close('MTe1', 8.6 - 0.05, 8.55); close('MTe1b', 8.6 + 0.05, 8.65); calc('MTe2', 250 - 5, 245); calc('MTe2b', 250 + 5, 255); close('MTe4', 3.45 + 2.15, 5.6);
close('YTe1', 12.3 - 0.05, 12.25); close('YTe1b', 12.3 + 0.05, 12.35); calc('YTe2', 600 - 50, 550); calc('YTe2b', 600 + 50, 650); close('YTe4', 5.05 - 1.75, 3.3);
close('P1', 3 / 8, 0.375); close('P2', 0.15 * 240, 36); close('P3', sf(0.006253, 2), 0.0063); calc('P4', 2.4 * 1000, 2400);
close('P5', 50 * 3 / 0.5, 300); close('P6', 9.2 - 0.05, 9.15); close('P6b', 9.2 + 0.05, 9.25); close('P7', 60 * 1.15, 69); close('P8', 36 / 99, 4 / 11); close('P8b', 4 / 11, 0.363636363636, 1e-11);
close('exam a', 7 / 20 * 100, 35); close('exam b', sf(0.07285, 2), 0.073); close('exam c', 60 * 10 / 0.5, 1200);
close('exam d', 3.6 - 0.05, 3.55); close('exam d2', 3.6 + 0.05, 3.65); close('exam e', 54 / 99, 6 / 11); close('exam e2', 6 / 11, 0.545454545454, 1e-11);
close('exit1', 0.6, 3 / 5); close('exit2', 0.2 * 45, 9); close('exit3', sf(5.0372, 3), 5.04); calc('exit4', 40 - 5, 35);
close('HW1', 5 / 8, 0.625); close('HW2', 85 * 0.6, 51); close('HW3', 0.75 * 60, 45); close('HW3b', 450 / 100, 4.5);
close('HW4a', sf(0.0038961, 2), 0.0039); close('HW4b', dp(0.0038961, 3), 0.004); close('HW5', 10 * 5 / 2, 25); close('HW6', sf(8.35 / 2.55, 3), 3.27);

// ======================= helpers =======================
// recurring decimal with dots above the given digit positions, e.g. recur(s, x, y, '0.27', [2, 3])
function recur(s, x, y, str, idx, o = {}) {
  const pt = o.size || 26, bold = !!o.bold;
  txt(s, str + (o.after || ''), x, y, o.w || 6, pt / 72 * 1.3, { size: pt, bold, color: o.color || C.ink });
  idx.forEach(i => {
    const cx = x + D.textW(str.slice(0, i), pt, bold) + D.textW(str[i], pt, bold) / 2;
    circle(s, cx, y + pt / 72 * 0.1, pt / 72 * 0.14, o.color || C.ink);
  });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Fractions, decimals and percentages, units, rounding, estimation, error intervals and bounds',
  bullets: ['Part 1: fractions, decimals and percentages (N10, N12)', 'Part 2: units and conversions (N13)', 'Part 3: rounding and estimation (N14, N15)', 'Part 4: error intervals and bounds (N15, N16)'],
  notes: 'AQA 8300 N10: terminating decimals and fractions; recurring decimals to fractions is Higher. N12: fractions and percentages as operators. N13: standard units and metric conversions. N14: estimate answers. N15: round to decimal places and significant figures; error intervals. N16: limits of accuracy; bounds in calculations are Higher. N11 (fractions in ratio problems) is taught with the ratio lessons. About two hours.',
});

D.objectives({
  tag: 'N10–N16',
  items: [
    'Convert between **fractions**, **decimals** and **percentages**, and use them to find amounts.',
    'Convert between metric **units** of length, mass, capacity and time.',
    'Round to **decimal places** and **significant figures**, and **estimate** answers.',
    'Write **error intervals**.  **HT:** recurring decimals and **bounds** in calculations.',
  ],
  keywords: ['terminating', 'recurring', 'significant figure', 'estimate', 'error interval', 'bound'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Work out  ¼  of  20', 'Write  0.3  as a percentage.', 'Round  4.68  to 1 decimal place.', 'How many centimetres are in  3 m?'],
  answers: ['5', '30%', '4.7', '300 cm'],
  notes: 'Common errors: 0.3 = 3% and rounding 4.68 down to 4.6.',
});

D.vocab({
  title: 'Key words', tag: 'N10–N16',
  items: [
    { term: 'Recurring decimal', def: 'A decimal whose digits repeat for ever, e.g. **⅓ = 0.333…**' },
    { term: 'Significant figure', def: 'The **first** significant figure is the first digit that is **not zero**.' },
    { term: 'Estimate', def: 'Round each number to **1 significant figure**, then work it out.' },
    { term: 'Error interval', def: 'The values before rounding, e.g. **7.35 ≤ l < 7.45**.' },
  ],
  notes: 'A terminating decimal stops, e.g. 3/8 = 0.375. Upper and lower bounds are the ends of the error interval.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: fractions, decimals and percentages', { tag: 'N10 FDP' });
  const head = ['Fraction', 'Decimal', 'Percentage'];
  const rows = [[F(1, 2), '0.5', '50%'], [F(1, 4), '0.25', '25%'], [F(3, 4), '0.75', '75%'], [F(1, 5), '0.2', '20%'], [F(1, 10), '0.1', '10%'], [F(1, 3), '0.333…', '33⅓%']];
  const tx = MX, cw = 1.75, rh = 0.8, top = 1.4;
  head.forEach((h, j) => { rect(s, tx + j * cw, top, cw, 0.55, C.maroon); txt(s, h, tx + j * cw, top, cw, 0.55, { size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' }); });
  rows.forEach((r, i) => {
    const y = top + 0.55 + i * rh;
    r.forEach((c, j) => {
      rect(s, tx + j * cw, y, cw, rh, i % 2 ? C.white : C.soft, C.line);
      if (j === 0) math(s, tx, y + rh / 2, [c], { size: 18, align: 'center', w: cw });
      else txt(s, c, tx + j * cw, y, cw, rh, { size: 20, align: 'center', valign: 'middle' });
    });
  });
  const bx = tx + 3 * cw + 0.4, bw = W - MX - bx;
  const meth = [
    ['Fraction → decimal: divide the top by the bottom', ['3 ÷ 8 = 0.375']],
    ['Decimal → fraction: use place value, then simplify', ['0.35 = ', F(35, 100), ' = ', F(7, 20)]],
    ['Percentage → decimal: divide by 100', ['4% = 0.04      17.5% = 0.175']],
  ];
  meth.forEach(([h, m], i) => {
    const y = 1.4 + i * 1.83;
    rect(s, bx, y, bw, 1.68, C.greyLight);
    txt(s, h, bx + 0.25, y + 0.12, bw - 0.5, 0.45, { size: 18, bold: true, color: C.maroon });
    math(s, bx + 0.25, y + 1.08, m, { size: 24 });
  });
  notes(s, 'Learn the table by heart. A fraction in its simplest form gives a terminating decimal only when the denominator has no prime factors other than 2 and 5.');
}

{
  const s = frame('Fractions and percentages as operators', { tag: 'N12 operators' });
  const ex = [
    [['Find  ', F(3, 5), '  of  40'], '40 ÷ 5 × 3', '= 24'],
    [['Find  15%  of  60'], '10% = 6,  5% = 3', '= 9'],
    [['Increase  80  by  20%'], 'multiplier  1 + 0.2 = 1.2;   80 × 1.2', '= 96'],
    [['Decrease  50  by  30%'], 'multiplier  1 − 0.3 = 0.7;   50 × 0.7', '= 35'],
    [['12  out of  48  as a percentage'], '12/48 = ¼', '= 25%'],
  ];
  ex.forEach(([q, w, a], i) => {
    const y = 1.4 + i * 1.08;
    rect(s, MX, y, W - 2 * MX, 0.96, i % 2 ? C.white : C.soft, C.line);
    math(s, MX + 0.3, y + 0.48, q, { size: 22, bold: true });
    txt(s, w, MX + 5.4, y, 4.9, 0.96, { size: 19, color: C.orange, valign: 'middle' });
    txt(s, a, MX + 10.4, y, W - 2 * MX - 10.6, 0.96, { size: 26, bold: true, color: C.green, valign: 'middle' });
  });
  notes(s, '"Of" means multiply. Multipliers are the quickest way on a calculator: a 20% increase is × 1.2, a 30% decrease is × 0.7. Percentage change and reverse percentages are in the ratio lessons (R9).');
}

{
  const s = frame('Recurring decimals to fractions', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'Dots go over the **first** and **last** digits that repeat:', MX + 0.3, 1.4, 5.3, 1.0, { size: 20, valign: 'middle' });
  recur(s, MX + 5.9, 1.68, '0.4', [2], { size: 24, after: '  = 0.444…', w: 2.6 });
  recur(s, MX + 8.8, 1.68, '0.27', [2, 3], { size: 24, after: '  = 0.2727…', w: 3.2 });
  const lines = [
    ['Let', 'x = 0.272727…'],
    ['× 100 (two digits repeat)', '100x = 27.272727…'],
    ['Subtract', '99x = 27'],
    ['Divide and simplify', null],
  ];
  lines.forEach(([why, m], i) => {
    const y = 2.65 + i * 0.98;
    rect(s, MX, y, W - 2 * MX, 0.86, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, why, MX + 0.3, y, 4.2, 0.86, { size: 18, color: C.orange, valign: 'middle' });
    if (m) txt(s, m, MX + 4.6, y, 7, 0.86, { size: 26, bold: true, valign: 'middle' });
    else math(s, MX + 4.6, y + 0.43, ['x = ', F(27, 99), ' = ', F(3, 11)], { size: 24, bold: true });
  });
  notes(s, 'Higher only. Multiply by 10 if one digit repeats, by 100 if two repeat, by 1000 if three repeat. The subtraction removes the endless tail. Check on a calculator: 3 ÷ 11 = 0.2727…');
}

D.hinge({
  title: 'Quick check',
  q: 'Write  0.35  as a fraction in its simplest form.',
  options: [[F(7, 20)], [F(35, 10)], [F(3, 5)], [F(1, 35)]],
  correct: 0,
  notes: 'Answer A: 35/100 = 7/20. B used tenths. C read the digits as 3/5. D wrote 1 over the digits.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: units and conversions', { tag: 'N13 units' });
  const facts = ['1 km = 1000 m', '1 m = 100 cm', '1 cm = 10 mm', '1 kg = 1000 g', '1 tonne = 1000 kg', '1 litre = 1000 ml', '1 hour = 60 minutes', '1 minute = 60 seconds'];
  txt(s, 'Facts to learn', MX, 1.35, 5, 0.45, { size: 20, bold: true, color: C.maroon });
  facts.forEach((f, i) => {
    const y = 1.9 + i * 0.6;
    rect(s, MX, y, 4.6, 0.52, i % 2 ? C.white : C.soft, C.line);
    txt(s, f, MX + 0.2, y, 4.3, 0.52, { size: 19, valign: 'middle' });
  });
  const bx = MX + 5.0, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 0.85, C.greyLight);
  txt(s, 'Big unit → small unit: **multiply**.    Small unit → big unit: **divide**.', bx + 0.25, 1.4, bw - 0.5, 0.85, { size: 19, valign: 'middle' });
  const ex = [['3.5 km  to  m', '× 1000', '3500 m'], ['2400 g  to  kg', '÷ 1000', '2.4 kg'], ['650 cm  to  m', '÷ 100', '6.5 m'], ['2.25 hours', '0.25 × 60 = 15', '2 h 15 min'], ['45 minutes  to  hours', '45 ÷ 60', '0.75 hours']];
  ex.forEach(([q, w, a], i) => {
    const y = 2.45 + i * 0.88;
    rect(s, bx, y, bw, 0.78, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, q, bx + 0.25, y, 2.9, 0.78, { size: 19, bold: true, valign: 'middle' });
    txt(s, w, bx + 3.15, y, 2.1, 0.78, { size: 17, color: C.orange, valign: 'middle' });
    txt(s, a, bx + 5.3, y, bw - 5.5, 0.78, { size: 21, bold: true, color: C.green, valign: 'middle' });
  });
  notes(s, 'Time is the classic trap: 2.25 hours is NOT 2 hours 25 minutes. Compound units (speed, density, pressure) are covered in the ratio lessons.');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: rounding', { tag: 'N15 rounding' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, rule, lines, colour, soft) => {
    rect(s, x, top, cw, 5.4, soft, colour);
    rect(s, x, top, cw, 0.65, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.65, { size: 21, bold: true, color: C.white, valign: 'middle' });
    txt(s, rule, x + 0.3, top + 0.8, cw - 0.6, 1.0, { size: 18 });
    lines.forEach(([q, a], i) => {
      const y = top + 2.0 + i * 1.05;
      txt(s, q, x + 0.3, y, cw - 0.6, 0.45, { size: 19, color: C.grey });
      txt(s, a, x + 0.3, y + 0.42, cw - 0.6, 0.55, { size: 25, bold: true, color: colour });
    });
  };
  col(MX, 'Decimal places (dp)', 'Count digits **after the decimal point**. Look at the next digit: 5 or more, round up.',
    [['3.14159  to 2 dp', '3.14'], ['7.3962  to 2 dp', '7.40   (keep the zero)'], ['4.68  to 1 dp', '4.7']], C.maroon, C.soft);
  col(MX + cw + gap, 'Significant figures (sf)', 'Start counting at the **first non-zero digit**. Keep the place value with zeros.',
    [['45 362  to 2 sf', '45 000'], ['0.004076  to 2 sf', '0.0041'], ['3.987  to 1 sf', '4']], C.orange, C.orangeSoft);
  notes(s, '45 362 to 2 sf is 45 000, not 45: the zeros hold the place value. Zeros at the start of a decimal are not significant; the zero in 0.0041 after the 4 would be (e.g. 0.0040 to 2 sf).');
}

{
  const s = frame('Estimating answers', { tag: 'N14 estimation' });
  rect(s, MX, 1.4, W - 2 * MX, 0.85, C.soft, C.line);
  txt(s, 'Round every number to **1 significant figure**, then work it out. Show the rounded numbers.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.85, { size: 21, valign: 'middle' });
  txt(s, 'Estimate', MX, 2.75, 1.6, 0.9, { size: 24, bold: true, valign: 'middle' });
  math(s, MX + 1.7, 3.2, [F('21.3 × 4.87', '0.52'), '   ≈   ', F('20 × 5', '0.5'), '   =   ', F(100, '0.5'), '   =   200'], { size: 28, bold: true });
  rect(s, MX, 4.35, W - 2 * MX, 1.15, C.greyLight);
  txt(s, 'Dividing by 0.5 is the same as multiplying by 2.  The calculator answer is 199.48…, so the estimate is a good check.', MX + 0.3, 4.35, W - 2 * MX - 0.6, 1.15, { size: 20, valign: 'middle' });
  rect(s, MX, 5.7, W - 2 * MX, 1.15, C.orangeSoft, 'F3D9B5');
  txt(s, '**Common error:** rounding 0.52 to 1 instead of 0.5.  It changes the answer from 200 to 100.', MX + 0.3, 5.7, W - 2 * MX - 0.6, 1.15, { size: 20, valign: 'middle' });
  notes(s, 'For a square root, round to a nearby square number: √50 ≈ √49 = 7. Ask: is the estimate an overestimate or an underestimate? Here it is hard to say because the roundings go in different directions.');
}

D.hinge({
  title: 'Quick check',
  q: 'Round  0.04076  to 2 significant figures.',
  options: ['0.041', '0.04', '0.0408', '0.040'],
  correct: 0,
  notes: 'Answer A. B is 1 sf. C is 3 sf. D counted the first zero after the point as significant (that is 2 dp).',
});

D.myTurnYourTurn({
  title: 'Rounding and estimating', tag: 'Part 3', stepSize: 24, labelW: 2.95, labelSize: 22, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Round, or estimate:',
    steps: [
      { label: '6.8471  (1 dp)', text: '**6.8**' },
      { label: '6.8471  (3 sf)', text: '**6.85**' },
      { label: '0.03092  (1 sf)', text: '**0.03**' },
      { label: 'Estimate  39.2 × 6.1', text: '**40 × 6 = 240**' },
    ],
  },
  yours: {
    q: 'Round, or estimate:',
    steps: [
      { label: '12.968  (2 dp)', text: '**12.97**' },
      { label: '5283  (2 sf)', text: '**5300**' },
      { label: '0.000716  (1 sf)', text: '**0.0007**' },
      { label: 'Estimate  618 ÷ 19.7', text: '**600 ÷ 20 = 30**' },
    ],
  },
  notes: '12.968: the 8 rounds the 6 up to 7. 5283 to 2 sf: the 8 rounds 52 up to 53, then zeros hold the place.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: error intervals', { tag: 'N15 error intervals' });
  rect(s, MX, 1.4, W - 2 * MX, 0.9, C.soft, C.line);
  txt(s, 'A length  l  is  **7.4 cm**  to 1 decimal place.  It could be anything from 7.35 up to (not including) 7.45.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.9, { size: 20, valign: 'middle' });
  // number line 7.3 to 7.5
  const x0 = MX + 0.8, x1 = W - MX - 0.8, ly = 3.35, px = v => x0 + (v - 7.3) / 0.2 * (x1 - x0);
  hline(s, x0 - 0.3, ly, x1 + 0.3, C.ink, 2);
  [7.3, 7.35, 7.4, 7.45, 7.5].forEach(v => { vline(s, px(v), ly - 0.12, ly + 0.12, C.ink, 2); txt(s, String(v), px(v) - 0.6, ly + 0.2, 1.2, 0.45, { size: 18, align: 'center' }); });
  hline(s, px(7.35), ly - 0.55, px(7.45), C.green, 5);
  circle(s, px(7.35), ly - 0.55, 0.3, C.green, C.green, 2.5);
  circle(s, px(7.45), ly - 0.55, 0.3, C.white, C.green, 2.5);
  txt(s, 'filled: included', px(7.35) - 1.0, ly - 1.2, 2.0, 0.4, { size: 15, color: C.green, align: 'center' });
  txt(s, 'open: not included', px(7.45) - 1.1, ly - 1.2, 2.2, 0.4, { size: 15, color: C.green, align: 'center' });
  math(s, MX, 4.45, ['Error interval:   7.35 ≤ l < 7.45'], { size: 26, bold: true, color: C.green, align: 'center', w: W - 2 * MX });
  const ex = [
    ['Rounded: go **half a unit** each way', 'n = 80  (nearest 10)', '75 ≤ n < 85'],
    ['Truncated: cut off, so only go **up**', 'x = 3.7  (truncated to 1 dp)', '3.7 ≤ x < 3.8'],
  ];
  ex.forEach(([a, b, c], i) => {
    const y = 5.0 + i * 0.95;
    rect(s, MX, y, W - 2 * MX, 0.85, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, a, MX + 0.3, y, 4.9, 0.85, { size: 17, color: C.orange, valign: 'middle' });
    txt(s, b, MX + 5.3, y, 3.9, 0.85, { size: 20, valign: 'middle' });
    txt(s, c, MX + 9.3, y, W - 2 * MX - 9.5, 0.85, { size: 22, bold: true, color: C.green, valign: 'middle' });
  });
  notes(s, 'The lower bound uses ≤ and the upper bound uses <, because 7.45 would round up to 7.5. Truncating 3.79 to 1 dp gives 3.7, so 3.7 ≤ x < 3.8.');
}

{
  const s = frame('Bounds in calculations', HT);
  const rules = [['a + b', 'UB + UB', 'LB + LB'], ['a − b', 'UB − LB', 'LB − UB'], ['a × b', 'UB × UB', 'LB × LB'], ['a ÷ b', 'UB ÷ LB', 'LB ÷ UB']];
  const tw = 5.6, cw = [1.6, 2.0, 2.0], top = 1.4;
  ['', 'Upper bound', 'Lower bound'].forEach((h, j) => {
    const x = MX + cw.slice(0, j).reduce((a, b) => a + b, 0);
    rect(s, x, top, cw[j], 0.6, C.maroon);
    txt(s, h, x, top, cw[j], 0.6, { size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' });
  });
  rules.forEach((r, i) => r.forEach((c, j) => {
    const x = MX + cw.slice(0, j).reduce((a, b) => a + b, 0), y = top + 0.6 + i * 0.75;
    rect(s, x, y, cw[j], 0.75, i % 2 ? C.white : C.soft, C.line);
    txt(s, c, x, y, cw[j], 0.75, { size: 20, bold: j === 0, align: 'center', valign: 'middle' });
  }));
  txt(s, 'To make a **difference** or a **quotient** as big as possible, take away (or divide by) the **smallest** value.', MX, 5.25, tw, 1.3, { size: 18, color: C.grey });
  const bx = MX + tw + 0.4, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.45, C.greyLight);
  txt(s, 'A runner covers **100 m** (nearest metre) in **12.4 s** (1 dp). Find the upper bound of the speed.', bx + 0.3, 1.55, bw - 0.6, 1.2, { size: 19 });
  txt(s, 'd:  99.5 ≤ d < 100.5', bx + 0.3, 2.9, bw - 0.6, 0.5, { size: 20 });
  txt(s, 't:  12.35 ≤ t < 12.45', bx + 0.3, 3.45, bw - 0.6, 0.5, { size: 20 });
  math(s, bx + 0.3, 4.55, ['speed  = ', F('UB of d', 'LB of t'), ' = ', F('100.5', '12.35')], { size: 22 });
  txt(s, '= 8.14 m/s  (3 sf)', bx + 0.3, 5.45, bw - 0.6, 0.6, { size: 26, bold: true, color: C.green });
  notes(s, 'Higher only. Lower bound of the speed = 99.5 ÷ 12.45 = 7.99 m/s (3 sf). If asked for an answer to a suitable degree of accuracy, give the value both bounds round to.');
}

D.hinge({
  title: 'Quick check',
  q: 'x = 6.4,  rounded to 1 decimal place.  Which is the error interval?',
  options: ['6.35 ≤ x < 6.45', '6.3 ≤ x < 6.5', '6.35 ≤ x ≤ 6.45', '6.4 ≤ x < 6.5'],
  correct: 0,
  notes: 'Answer A. B went a whole 0.1 each way. C included 6.45, which rounds to 6.5. D is the interval for truncation, not rounding.',
});

D.myTurnYourTurn({
  title: 'Error intervals and bounds', tag: 'Part 4', stepSize: 22, labelW: 2.45, labelSize: 20, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Write the error interval for x:',
    steps: [
      { label: '8.6  (1 dp)', text: '**8.55 ≤ x < 8.65**' },
      { label: '250 (nearest 10)', text: '**245 ≤ x < 255**' },
      { label: '4.2  (truncated)', text: '**4.2 ≤ x < 4.3**' },
      { label: 'HT  UB of a + b', text: '**3.45 + 2.15 = 5.6**' },
    ],
  },
  yours: {
    q: 'Write the error interval for x:',
    steps: [
      { label: '12.3  (1 dp)', text: '**12.25 ≤ x < 12.35**' },
      { label: '600 (nearest 100)', text: '**550 ≤ x < 650**' },
      { label: '7.9  (truncated)', text: '**7.9 ≤ x < 8**' },
      { label: 'HT  UB of a − b', text: '**5.05 − 1.75 = 3.3**' },
    ],
  },
  notes: 'HT parts: mine a = 3.4, b = 2.1; yours a = 5.0, b = 1.8, all to 1 dp. Say these aloud. For a − b, the upper bound takes away the LOWER bound of b.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Write  3/8  as a decimal.', '0.375'], ['Work out  15%  of  240.', '36'], ['Round  0.006253  to 2 significant figures.', '0.0063'], ['Convert  2.4 kg  into grams.', '2400 g'],
    ['Estimate  (48.7 × 3.1) ÷ 0.49', '50 × 3 ÷ 0.5 = 300'], ['A length is 9.2 cm to 1 dp. Write down its error interval.', '9.15 ≤ l < 9.25'],
    ['Increase  £60  by  15%.', '£69'], ['HT  Write  0.363636…  as a fraction in its simplest form.', '4/11'],
  ];
  for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 30, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 3 ÷ 8 = 0.375  2) 0.15 × 240 = 36  3) 0.0063  4) 2.4 × 1000 = 2400 g  5) 150 ÷ 0.5 = 300  6) 9.15 ≤ l < 9.25  7) 60 × 1.15 = £69  8) 100x − x = 36, x = 36/99 = 4/11.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.3,
  parts: [
    { l: 'a', q: 'Write  7/20  as a percentage.', m: 1, lines: 0 },
    { l: 'b', q: 'Round  0.07285  to 2 significant figures.', m: 1, lines: 0 },
    { l: 'c', q: 'Work out an estimate for', math: [F('61.4 × 9.87', '0.48')], m: 3, lines: 1 },
    { l: 'd', q: 'A bag weighs 3.6 kg, correct to 1 decimal place. Write down the error interval for the weight, w kg.', m: 2, lines: 1 },
    { l: 'e', q: 'HT  Write  0.545454…  as a fraction in its simplest form. Show your working.', m: 3, lines: 1 },
  ],
  total: 10,
  scheme: [
    ['(a)', '35%', 'B1', ''],
    ['(b)', '0.073', 'B1', ''],
    ['(c)', '60 × 10 ÷ 0.5 = 1200', 'M1 M1 A1', 'M1 two numbers to 1 sf; M1 all three'],
    ['(d)', '3.55 ≤ w < 3.65', 'B2', 'B1 for one bound correct'],
    ['(e)', '100x − x = 54,  54/99 = 6/11', 'M1 M1 A1', 'M1 100x = 54.5454…; M1 99x = 54'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Write  0.6  as a fraction in its simplest form.', 'Work out  20%  of  45.', 'Round  5.0372  to 3 significant figures.', 'n = 40, to the nearest 10. Write the error interval for n.'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) 6/10 = 3/5  2) 9  3) 5.04  4) 35 ≤ n < 45. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Write  5/8  as a decimal and as a percentage.',
    'Decrease  £85  by  40%.',
    'Convert: (a) 3.75 hours into hours and minutes  (b) 450 cm into metres.',
    'Round  0.0038961  to (a) 2 sf  (b) 3 dp.',
    'Estimate  √99.6 × 5.2 ÷ 1.9',
    'HT  a = 8.3 and b = 2.6, both to 1 dp. Find the upper bound of  a ÷ b.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 0.625, 62.5%  2) 85 × 0.6 = £51  3) 3 h 45 min; 4.5 m  4) 0.0039; 0.004  5) 10 × 5 ÷ 2 = 25  6) 8.35 ÷ 2.55 = 3.27 (3 sf).');
}

D.save(path.join(__dirname, 'AQA_8300_N10-N16_FDPRoundingAndBounds.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
