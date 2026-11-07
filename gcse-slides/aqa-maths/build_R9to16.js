// build_R9to16.js — AQA GCSE Mathematics 8300, R9, R11, R16 Percentages, growth and decay, compound measures
// One two-hour lesson aimed at a Higher student.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_R9to16.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'R9, R11, R16', title: 'Percentages, growth and rates' };
const D = T.init(DECK);
const { frame, notes, txt, rect, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const pen = x => Math.round(x * 100) / 100;
const F = (n, d) => ({ n, d });
const firstN = (start, m, test) => { let n = 0, v = start; while (!test(v)) { v *= m; n++; } return n; };

// ======================= numbers (all checked) =======================
close('DN1', 0.1 * 350, 35); close('DN2', 60 * 1.1, 66); close('DN3', 0.85 * 100, 85); close('DN4', 3 + 15 / 60, 3.25);
close('m1', 1 + 0.15, 1.15); close('m2', 1 - 0.08, 0.92); close('pc', (52 - 40) / 40 * 100, 30); close('pc2', (45 - 60) / 60 * 100, -25);
close('rev1', 84 / 1.2, 70); close('rev2', 68 / 0.85, 80); close('rev wrong', 84 * 0.8, 67.2);
close('hinge1', 63 / 0.9, 70);
close('MT1', 240 * 1.15, 276); close('MT2', (92 - 80) / 80 * 100, 15); close('MT3', 96 / 1.2, 80); close('MT4', 45 / 0.75, 60);
close('YT1', 180 * 0.65, 117); close('YT2', (50 - 41) / 50 * 100, 18); close('YT3', 78 / 1.3, 60); close('YT4', 66 / 0.88, 75);
close('simple', 2000 * 0.03 * 4, 240); close('comp', pen(2000 * 1.03 ** 4), 2251.02); close('dep', pen(15000 * 0.88 ** 3), 10222.08);
close('dep n3', pen(15000 * 0.88 ** 3), 10222.08); close('dep n4', pen(15000 * 0.88 ** 4), 8995.43); calc('dep first', firstN(15000, 0.88, v => v < 9000), 4);
close('iter', pen(400 * 1.05 ** 3), 463.05); close('iter1', 400 * 1.05, 420); close('iter2', pen(420 * 1.05), 441);
close('MTg1', pen(5000 * 1.02 ** 3), 5306.04); close('MTg2', 5000 + 5000 * 0.02 * 3, 5300); close('MTg3', pen(20000 * 0.85 ** 2), 14450); calc('MTg4', firstN(1, 1.1, v => v >= 2), 8);
close('YTg1', pen(3000 * 1.04 ** 2), 3244.80); close('YTg2', 3000 + 3000 * 0.04 * 2, 3240); close('YTg3', pen(8000 * 0.8 ** 3), 4096); calc('YTg4', firstN(1, 0.8, v => v <= 0.5), 4);
close('sp', 150 / 2.5, 60); close('dens', 540 / 200, 2.7); close('pres', 600 / 1.5, 400);
close('mix', (300 * 1.2 + 200 * 0.8) / 500, 1.04); close('avg', (30 + 50) / (20 / 60 + 40 / 60), 80);
close('hinge3', 45 / 0.5, 90);
close('MTc1', 210 / 3.5, 60); close('MTc2', 90 / 40, 2.25); close('MTc3', 50 * 8, 400); close('MTc4', 120 / 0.4, 300);
close('YTc1', 2.75 * 48, 132); close('YTc2', 75 / 50, 1.5); close('YTc3', 360 / 1.8, 200); close('YTc4', 900 / 2.25, 400);
close('P1', 360 * 1.125, 405); close('P2', (25 - 21) / 25 * 100, 16); close('P3', 92 / 1.15, 80); close('P4', pen(4000 * 1.03 ** 5), 4637.10);
calc('P5', firstN(18000, 0.9, v => v < 12000), 4); close('P5b', pen(18000 * 0.9 ** 3), 13122); close('P6', 7.8 * 25, 195); close('P7', 24 / (80 / 60), 18); close('P8', pen(500 * 1.2 ** 3), 864);
close('exam a', 540 / 0.9, 600); close('exam b', pen(6000 * 1.025 ** 4), 6622.88); close('exam c', 1.2 * 0.8, 0.96);
close('exam d mA', 400 * 1.5, 600); close('exam d vB', 600 / 1.2, 500); close('exam d', Math.round(1200 / 900 * 100) / 100, 1.33);
close('exit1', 80 * 0.85, 68); close('exit2', 150 / 1.25, 120); close('exit3', pen(1000 * 1.05 ** 2), 1102.50); close('exit4', 120 / 1.5, 80);
close('HW1', (72 - 64) / 64 * 100, 12.5); close('HW2', 39 / 0.6, 65); close('HW3', pen(2500 * 1.035 ** 3), 2771.79); close('HW4', pen(250000 * 1.04 ** 2 * 0.95), 256880);
close('HW5', 750 / 0.3, 2500); close('HW6', 156 / 48, 3.25);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Percentage change, reverse percentages, compound interest, growth and decay, speed, density and pressure',
  bullets: ['Part 1: percentage change and reverse percentages (R9)', 'Part 2: interest, growth and decay (R9, R16)', 'Part 3: compound measures: speed, density, pressure (R11)'],
  notes: 'AQA 8300 R9 (percentages, percentage change, original value, simple interest, financial maths), R16 (growth and decay including compound interest; iterative processes are Higher), R11 (compound units: speed, rates of pay, unit pricing, density, pressure). Lesson 2 of 3 on Ratio. Pitched for a Higher student. About two hours.',
});

D.objectives({
  tag: 'R9, R11, R16',
  items: [
    'Use **multipliers** for percentage change, and find the **original value**.',
    'Work out **simple** and **compound interest**, **growth** and **depreciation**.',
    'Find how many **years** until a value passes a target. **HT:** iteration.',
    'Solve problems with **speed**, **density** and **pressure**.',
  ],
  keywords: ['multiplier', 'original value', 'compound interest', 'depreciation', 'density', 'pressure'],
  notes: 'Share the objectives. Calculators allowed for most of this lesson.',
});

D.doNow({
  qs: ['Work out  10%  of  350.', 'Increase  60  by  10%.', 'Write  0.85  as a percentage.', 'Write  3 hours 15 minutes  in hours.'],
  answers: ['35', '66', '85%', '3.25 hours'],
  notes: 'Q4 is the time trap from the units lesson: 15 minutes = 0.25 hours.',
});

D.vocab({
  title: 'Key words', tag: 'R9, R11, R16',
  items: [
    { term: 'Multiplier', def: 'The number you multiply by: a **15% increase** is **× 1.15**; an **8% decrease** is **× 0.92**.' },
    { term: 'Compound interest', def: 'Interest is added each year, then **earns interest itself**:  amount = P × multiplierⁿ.' },
    { term: 'Depreciation', def: 'A **loss in value** each year, e.g. a car loses 12% a year: × 0.88 each year.' },
    { term: 'Density', def: '**Mass per unit volume**:  density = mass ÷ volume, e.g. g/cm³.' },
  ],
  notes: 'Pressure = force ÷ area, measured in N/m² (pascals).',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: multipliers and percentage change', { tag: 'R9 percentages' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 5.45, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.6, C.maroon);
  txt(s, 'Multipliers', MX + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  const ms = [['Increase by 15%', '× 1.15'], ['Increase by 3.5%', '× 1.035'], ['Decrease by 8%', '× 0.92'], ['Decrease by 40%', '× 0.6'], ['Find 120%', '× 1.2']];
  ms.forEach(([a, b], i) => {
    const y = top + 0.8 + i * 0.85;
    txt(s, a, MX + 0.25, y, 3.3, 0.7, { size: 20, valign: 'middle' });
    txt(s, b, MX + 3.6, y, cw - 3.8, 0.7, { size: 24, bold: true, color: C.maroon, valign: 'middle' });
  });
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.45, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.6, C.orange);
  txt(s, 'Percentage change', x2 + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  math(s, x2 + 0.25, top + 1.35, ['% change = ', F('change', 'original'), ' × 100'], { size: 22, bold: true });
  txt(s, '40 → 52:  12 ÷ 40 × 100 = **30% increase**', x2 + 0.25, top + 2.25, cw - 0.5, 0.6, { size: 20 });
  txt(s, '60 → 45:  15 ÷ 60 × 100 = **25% decrease**', x2 + 0.25, top + 2.95, cw - 0.5, 0.6, { size: 20 });
  txt(s, 'Always divide by the **original**, not the new value. Profit, loss, error and growth all work the same way.', x2 + 0.25, top + 3.85, cw - 0.5, 1.3, { size: 18, color: C.grey });
  notes(s, 'Multipliers are the key Higher skill: one calculation for any percentage change, and they chain for repeated changes. 120% of a number = × 1.2.');
}

{
  const s = frame('Reverse percentages: finding the original', { tag: 'R9 original value' });
  rect(s, MX, 1.4, W - 2 * MX, 0.95, C.soft, C.line);
  txt(s, 'The new value = original × multiplier.   So:  **original = new value ÷ multiplier**', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.95, { size: 22, valign: 'middle' });
  const ex = [
    ['After a 20% increase, a price is £84. Find the original price.', '84 ÷ 1.2', '£70'],
    ['After a 15% discount, a jacket costs £68. Find the original price.', '68 ÷ 0.85', '£80'],
  ];
  ex.forEach(([q, w, a], i) => {
    const y = 2.6 + i * 1.3;
    rect(s, MX, y, W - 2 * MX, 1.15, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, q, MX + 0.3, y, 7.6, 1.15, { size: 20, bold: true, valign: 'middle' });
    txt(s, w, MX + 8.2, y, 2.1, 1.15, { size: 21, color: C.orange, valign: 'middle' });
    txt(s, a, MX + 10.4, y, W - 2 * MX - 10.6, 1.15, { size: 28, bold: true, color: C.green, valign: 'middle' });
  });
  rect(s, MX, 5.4, W - 2 * MX, 1.45, C.orangeSoft, 'F3D9B5');
  txt(s, '**Common error:** taking 20% off £84 gives £67.20. That is wrong because the 20% was of the **original**, not of £84.  Check: £70 × 1.2 = £84 ✓', MX + 0.3, 5.4, W - 2 * MX - 0.6, 1.45, { size: 19, valign: 'middle' });
  notes(s, 'Reverse percentage questions are worth 2–3 marks and often catch students out. A bar model also works: 120% = £84, so 1% = 0.70 and 100% = £70.');
}

D.hinge({
  title: 'Quick check',
  q: 'A coat costs £63 after a 10% reduction. What was the original price?',
  options: ['£70', '£69.30', '£56.70', '£73'],
  correct: 0,
  notes: 'Answer A: 63 ÷ 0.9. B added 10% of £63. C took another 10% off. D added £10.',
});

D.myTurnYourTurn({
  title: 'Percentages', tag: 'Part 1', stepSize: 22, labelW: 3.2, labelSize: 19, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: 'Increase £240 by 15%', text: '**£276**' },
      { label: '% change from 80 to 92', text: '**15% rise**' },
      { label: 'After a 20% rise: £96', text: '**£80**' },
      { label: 'After 25% off: £45', text: '**£60**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: 'Decrease £180 by 35%', text: '**£117**' },
      { label: '% change from 50 to 41', text: '**18% fall**' },
      { label: 'After a 30% rise: £78', text: '**£60**' },
      { label: 'After 12% off: £66', text: '**£75**' },
    ],
  },
  notes: 'Yours: 180 × 0.65 = 117. 9 ÷ 50 × 100 = 18%. 78 ÷ 1.3 = 60. 66 ÷ 0.88 = 75. The last two rows are the original prices.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: interest, growth and depreciation', { tag: 'R9, R16 growth and decay' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const box = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, 3.4, soft, colour);
    rect(s, x, top, cw, 0.6, colour);
    txt(s, head, x + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
    lines.forEach(([t, sz, b, c], i) => txt(s, t, x + 0.25, top + 0.8 + i * 0.62, cw - 0.5, 0.58, { size: sz, bold: b, color: c || C.ink }));
  };
  box(MX, 'Simple interest: the same each year', [['£2000 at 3% for 4 years', 20, true], ['Interest each year = 2000 × 0.03 = £60', 18], ['4 years: 60 × 4 = £240', 18], ['Total = £2240', 22, true, C.green]], C.maroon, C.soft);
  box(MX + cw + gap, 'Compound interest: interest on interest', [['£2000 at 3% for 4 years', 20, true], ['Multiplier 1.03, used 4 times', 18], ['2000 × 1.03⁴ = 2251.0162…', 18], ['Total = £2251.02', 22, true, C.green]], C.orange, C.orangeSoft);
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.greyLight);
  math(s, MX + 0.3, 5.45, ['amount  =  original × multiplierⁿ          n = number of years'], { size: 22, bold: true });
  txt(s, '**Depreciation:** a £15 000 car loses 12% a year.  After 3 years:  15 000 × 0.88³ = **£10 222.08**', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.75, { size: 19 });
  notes(s, 'Compound interest is the norm in real life (savings, loans, inflation). Give money to the nearest penny. Same formula for growth (multiplier > 1) and decay (multiplier < 1).');
}

{
  const s = frame('How many years? Iteration', HT);
  txt(s, 'The £15 000 car loses 12% a year. After how many years is it first worth **less than £9000**?', MX, 1.4, W - 2 * MX, 0.9, { size: 21 });
  const rows = [['1', '15 000 × 0.88 = 13 200'], ['2', '× 0.88 = 11 616'], ['3', '× 0.88 = 10 222.08'], ['4', '× 0.88 = 8995.43  ✓']];
  const tw = 5.4;
  rect(s, MX, 2.4, 1.2, 0.55, C.maroon); txt(s, 'Year', MX, 2.4, 1.2, 0.55, { size: 17, bold: true, color: C.white, align: 'center', valign: 'middle' });
  rect(s, MX + 1.2, 2.4, tw - 1.2, 0.55, C.maroon); txt(s, 'Value (£)', MX + 1.4, 2.4, tw - 1.6, 0.55, { size: 17, bold: true, color: C.white, valign: 'middle' });
  rows.forEach(([n, v], i) => {
    const y = 2.95 + i * 0.68;
    rect(s, MX, y, 1.2, 0.68, i % 2 ? C.white : C.soft, C.line); txt(s, n, MX, y, 1.2, 0.68, { size: 19, align: 'center', valign: 'middle' });
    rect(s, MX + 1.2, y, tw - 1.2, 0.68, i % 2 ? C.white : C.soft, C.line); txt(s, v, MX + 1.4, y, tw - 1.6, 0.68, { size: 19, bold: i === 3, color: i === 3 ? C.green : C.ink, valign: 'middle' });
  });
  txt(s, 'Answer: **4 years**', MX, 5.8, tw, 0.6, { size: 24, color: C.green });
  const bx = MX + tw + 0.5, bw = W - MX - bx;
  rect(s, bx, 2.4, bw, 4.45, C.greyLight);
  txt(s, 'Iteration notation', bx + 0.3, 2.55, bw - 0.6, 0.5, { size: 20, bold: true, color: C.maroon });
  txt(s, '400 bacteria grow by 5% each hour:', bx + 0.3, 3.1, bw - 0.6, 0.5, { size: 19 });
  txt(s, 'Pₙ₊₁ = 1.05 × Pₙ ,   P₀ = 400', bx + 0.3, 3.65, bw - 0.6, 0.6, { size: 24, bold: true });
  txt(s, 'P₁ = 420,   P₂ = 441,   P₃ = 463.05', bx + 0.3, 4.4, bw - 0.6, 0.55, { size: 20 });
  txt(s, 'After 3 hours: about **463** bacteria.  Each term uses the one before it.', bx + 0.3, 5.1, bw - 0.6, 1.2, { size: 19 });
  notes(s, 'Calculator method: type 15000, =, then × 0.88 = repeatedly; count the presses. Pₙ₊₁ = 1.05Pₙ is the same as Pₙ = 400 × 1.05ⁿ. Iteration with formulae like this is Higher (R16).');
}

D.hinge({
  title: 'Quick check',
  q: 'Which works out the value of £500 after 3 years at 4% compound interest?',
  options: ['500 × 1.04³', '500 × 1.12', '500 × 0.04 × 3', '500 × 1.4³'],
  correct: 0,
  notes: 'Answer A. B is simple interest (12% in total). C is the simple interest only. D used 40%, not 4%.',
});

D.myTurnYourTurn({
  title: 'Growth and decay', tag: 'Part 2', stepSize: 21, labelW: 3.95, labelSize: 18, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: '£5000, 2% compound, 3 years', text: '**£5306.04**' },
      { label: '£5000, 2% simple, 3 years', text: '**£5300**' },
      { label: '£20 000, −15% a year, 2 years', text: '**£14 450**' },
      { label: 'Years to double at 10% a year', text: '**8 years**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: '£3000, 4% compound, 2 years', text: '**£3244.80**' },
      { label: '£3000, 4% simple, 2 years', text: '**£3240**' },
      { label: '£8000, −20% a year, 3 years', text: '**£4096**' },
      { label: 'Years to halve at −20% a year', text: '**4 years**' },
    ],
  },
  notes: 'Mine, last: 1.1⁷ = 1.95, 1.1⁸ = 2.14, so 8 years. Yours, last: 0.8³ = 0.512 (not yet half), 0.8⁴ = 0.4096, so 4 years.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: compound measures', { tag: 'R11 compound units' });
  const items = [
    ['Speed', 'speed = distance ÷ time', 'km/h, m/s', '150 km in 2 h 30 min:  150 ÷ 2.5 = **60 km/h**'],
    ['Density', 'density = mass ÷ volume', 'g/cm³, kg/m³', '540 g, 200 cm³:  540 ÷ 200 = **2.7 g/cm³**'],
    ['Pressure', 'pressure = force ÷ area', 'N/m²', '600 N on 1.5 m²:  600 ÷ 1.5 = **400 N/m²**'],
  ];
  items.forEach(([h, f, u, ex], i) => {
    const y = 1.4 + i * 1.82;
    rect(s, MX, y, W - 2 * MX, 1.65, i % 2 ? C.white : C.soft, C.line);
    rect(s, MX, y, 0.12, 1.65, [C.maroon, C.orange, C.blue][i]);
    txt(s, h, MX + 0.35, y + 0.12, 2.2, 0.55, { size: 22, bold: true, color: [C.maroon, C.orange, C.blue][i] });
    txt(s, f, MX + 2.7, y + 0.12, 5.2, 0.55, { size: 21, bold: true });
    txt(s, u, MX + 8.4, y + 0.12, W - 2 * MX - 8.6, 0.55, { size: 18, color: C.grey });
    txt(s, ex, MX + 0.35, y + 0.85, W - 2 * MX - 0.6, 0.6, { size: 20 });
  });
  notes(s, 'Rearrange as needed: distance = speed × time, mass = density × volume, force = pressure × area. Check the units match before dividing: 2 h 30 min = 2.5 h.');
}

{
  const s = frame('Harder compound measure problems', { tag: 'R11 problem solving' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, 5.45, soft, colour);
    rect(s, x, top, cw, 0.6, colour);
    txt(s, head, x + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
    let y = top + 0.8;
    lines.forEach(([t, sz, b, c]) => { const th = D.textH(t, sz, cw - 0.5, b); txt(s, t, x + 0.25, y, cw - 0.5, th + 0.05, { size: sz, bold: b, color: c || C.ink }); y += th + 0.2; });
  };
  col(MX, 'Average speed for a whole journey', [
    ['A car drives 30 km in 20 minutes, then 50 km in 40 minutes. Find its average speed.', 19, true],
    ['Total distance = 30 + 50 = 80 km', 18], ['Total time = 20 + 40 = 60 min = 1 hour', 18], ['Average speed = 80 ÷ 1 = 80 km/h', 22, true, C.green],
    ['Do not average the two speeds (90 and 75).', 17, false, C.grey]], C.maroon, C.soft);
  col(MX + cw + gap, 'Mixing two liquids', [
    ['300 cm³ of A (density 1.2 g/cm³) is mixed with 200 cm³ of B (density 0.8 g/cm³). Find the density of the mixture.', 19, true],
    ['Masses: 300 × 1.2 = 360 g,  200 × 0.8 = 160 g', 18], ['Total: 520 g in 500 cm³', 18], ['Density = 520 ÷ 500 = 1.04 g/cm³', 22, true, C.green],
    ['Work with total mass and total volume.', 17, false, C.grey]], C.orange, C.orangeSoft);
  notes(s, 'Both problems use the same idea: totals first, then divide. Averaging the speeds (82.5 km/h) or densities (1.0) is the classic wrong answer.');
}

D.hinge({
  title: 'Quick check',
  q: 'A car travels 45 km in 30 minutes. What is its average speed?',
  options: ['90 km/h', '1.5 km/h', '15 km/h', '22.5 km/h'],
  correct: 0,
  notes: 'Answer A: 45 ÷ 0.5. B is 45 ÷ 30 (km per minute, 1.5) with the wrong units. C divided 45 by 3. D halved 45.',
});

D.myTurnYourTurn({
  title: 'Compound measures', tag: 'Part 3', stepSize: 21, labelW: 3.3, labelSize: 18, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: 'Speed: 210 km, 3.5 h', text: '**60 km/h**' },
      { label: 'Time: 90 km at 40 km/h', text: '**2 h 15 min**' },
      { label: 'Mass: 50 cm³ at 8 g/cm³', text: '**400 g**' },
      { label: 'Pressure: 120 N, 0.4 m²', text: '**300 N/m²**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: 'Distance: 48 km/h, 2¾ h', text: '**132 km**' },
      { label: 'Time: 75 km at 50 km/h', text: '**1 h 30 min**' },
      { label: 'Volume: 360 g at 1.8 g/cm³', text: '**200 cm³**' },
      { label: 'Pressure: 900 N, 2.25 m²', text: '**400 N/m²**' },
    ],
  },
  notes: 'Mine: 90 ÷ 40 = 2.25 h = 2 h 15 min. Yours: 2 h 45 min = 2.75 h, so 48 × 2.75 = 132 km. 75 ÷ 50 = 1.5 h. 360 ÷ 1.8 = 200.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Increase  £360  by  12.5%.', '£405'], ['A price falls from £25 to £21. Find the percentage decrease.', '16%'], ['After a 15% rise, a bill is £92. Find the original bill.', '£80'], ['£4000 is invested at 3% compound interest. Find its value after 5 years.', '£4637.10'],
    ['A car worth £18 000 loses 10% a year. After how many years is it first worth less than £12 000?', '4 years'], ['A metal has density 7.8 g/cm³. Find the mass of 25 cm³.', '195 g'],
    ['A cyclist rides 24 km in 1 hour 20 minutes. Find the average speed in km/h.', '18 km/h'], ['HT  Pₙ₊₁ = 1.2 × Pₙ  and  P₀ = 500.  Find P₃.', '864'],
  ];
  for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 30, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 22, start: k });
    notes(s, 'Answers: 1) 360 × 1.125 = 405  2) 4 ÷ 25 = 16%  3) 92 ÷ 1.15 = 80  4) 4000 × 1.03⁵ = 4637.10  5) after 3 years £13 122, after 4 years £11 809.80, so 4  6) 7.8 × 25 = 195 g  7) 1 h 20 min = 4/3 h, 24 ÷ 4/3 = 18  8) 500 × 1.2³ = 864.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'A TV costs £540 after a 10% reduction. Work out the original price.', m: 2, lines: 0 },
    { l: 'b', q: '£6000 is invested at 2.5% compound interest per year. Work out its value after 4 years. Give your answer to the nearest penny.', m: 3, lines: 1 },
    { l: 'c', q: 'Shaun says, "A 20% increase followed by a 20% decrease gets you back to the original price." Is he correct? Show how you decide.', m: 2, lines: 1 },
    { l: 'd', q: '400 cm³ of liquid A (density 1.5 g/cm³) is mixed with 600 g of liquid B (density 1.2 g/cm³). Work out the density of the mixture.', m: 3, lines: 1 },
  ],
  total: 10,
  scheme: [
    ['(a)', '540 ÷ 0.9 = £600', 'M1 A1', 'M1 for 540 ÷ 0.9 oe'],
    ['(b)', '6000 × 1.025⁴ = £6622.88', 'M1 M1 A1', 'M1 for 1.025; M1 for power 4'],
    ['(c)', 'No: 1.2 × 0.8 = 0.96, a 4% decrease', 'B2', 'B1 for 0.96 or a worked example'],
    ['(d)', '600 g + 600 g = 1200 g; 400 + 500 = 900 cm³; 1.33 g/cm³', 'M1 M1 A1', 'M1 mass of A; M1 volume of B'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Decrease  80  by  15%.', 'After a 25% increase, a price is £150. Find the original price.', '£1000 is invested at 5% compound interest for 2 years. Find its value.', 'A train goes 120 km in 1 h 30 min. Find its average speed.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) 68  2) 150 ÷ 1.25 = £120  3) 1000 × 1.05² = £1102.50  4) 120 ÷ 1.5 = 80 km/h. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'A price rises from £64 to £72. Find the percentage increase.',
    'After 40% off, a game costs £39. Find the original price.',
    '£2500 is invested at 3.5% compound interest for 3 years. Find its value.',
    'A house worth £250 000 rises 4% a year for 2 years, then falls 5%. Find its value.',
    'A force of 750 N acts on 0.3 m². Find the pressure.',
    'How long does it take to drive 156 km at 48 km/h? Give hours and minutes.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) 8 ÷ 64 = 12.5%  2) 39 ÷ 0.6 = £65  3) 2500 × 1.035³ = £2771.79  4) 250 000 × 1.04² × 0.95 = £256 880  5) 2500 N/m²  6) 3.25 h = 3 h 15 min.');
}

D.save(path.join(__dirname, 'AQA_8300_R9-R11-R16_PercentagesGrowthAndRates.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
