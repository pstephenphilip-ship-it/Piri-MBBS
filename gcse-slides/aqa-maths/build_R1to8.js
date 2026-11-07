// build_R1to8.js — AQA GCSE Mathematics 8300, R1–R8 Ratio, proportion, units and scales
// One two-hour lesson aimed at a Higher student (includes N11 fractions in ratio problems).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_R1to8.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'R1–R8', title: 'Ratio and proportion' };
const D = T.init(DECK);
const { frame, notes, txt, rect, math, MX, W } = D;
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const F = (n, d) => ({ n, d });
const gcd = (a, b) => b ? gcd(b, a % b) : a;
const simp = (...xs) => { const g = xs.reduce(gcd); return xs.map(x => x / g).join(':'); };
const share = (total, ...r) => { const p = total / r.reduce((a, b) => a + b, 0); return r.map(x => x * p); };
const eq = (l, a, b) => calc(l, JSON.stringify(a) === JSON.stringify(b) ? 1 : 0, 1);

// ======================= numbers (all checked) =======================
eq('DN1', simp(12, 18), '2:3'); calc('DN2', 40 / 5 * 3, 24); calc('DN3', 2 * 100, 200); calc('DN4', 100 / 4, 25);
eq('s1', simp(40, 200), '1:5'); eq('s2', simp(15, 25), '3:5'); eq('s3', simp(3, 2), '3:2'); close('s3b', (1 / 2) * 6, 3); close('s3c', (1 / 3) * 6, 2); close('s4', 10 / 4, 2.5);
close('frac', 3 / 8, 0.375); close('mult', 5 / 3, 1.6666666666666667);
eq('hinge1', simp(45, 120), '3:8');
eq('sh1', share(84, 3, 4), [36, 48]); calc('sh2', 18 / 2 * 7, 63); calc('sh3', 15 / 3 * 7, 35); eq('sh4', share(200, 2, 3, 5), [40, 60, 100]);
eq('comb', simp(2 * 4, 3 * 4, 5 * 3), '8:12:15'); calc('chg', 5 * 3, 15); calc('chg chk', (3 * 3 + 6) / (5 * 3), 1); calc('alg', 12 / 2, 6); close('alg chk', 6 / (6 + 4), 3 / 5);
eq('MT1', simp(40, 200), '1:5'); eq('MT2', share(84, 3, 4), [36, 48]); eq('MT3', simp(8, 12, 15), '8:12:15'); calc('MT4', 15, 5 * 3);
eq('YT1', simp(1200, 800), '3:2'); eq('YT2', share(150, 2, 3, 5), [30, 45, 75]); eq('YT3', simp(3 * 6, 4 * 6, 7 * 4), '9:12:14'); close('YT4', 4 / (4 + 6), 2 / 5);
close('pens', 3.40 / 5 * 8, 5.44); close('bb1', 1.80 / 5, 0.36); close('bb2', 2.55 / 7.5, 0.34); calc('recipe', 300 / 4 * 10, 750); close('fx', 230 / 1.15, 200);
calc('u1', 100 * 100, 10000); calc('u2', 10 ** 3, 1000); calc('u3', 100 ** 3, 1e6); calc('map', 4 * 25000, 100000); close('speed', 72 * 1000 / 3600, 20);
calc('hinge2', 3 * 10000, 30000);
calc('MTu1', 5 * 10000, 50000); close('MTu2', 4 * 50000 / 100000, 2); close('MTu3', 54 / 3.6, 15); close('MTu4', 3.40 / 5 * 8, 5.44);
calc('YTu1', 2.5 * 1e6, 2500000); close('YTu2', 7 * 20000 / 100000, 1.4); close('YTu3', 90 / 3.6, 25); close('YTu4', 1.68 / 6 * 10, 2.80);
eq('P1', simp(24, 36, 60), '2:3:5'); close('P2', 8 / 5, 1.6); eq('P3', share(360, 7, 5), [210, 150]); calc('P4', 0.6 * 10000, 6000);
calc('P5', 12 * 9, 108); close('P6a', 1.38 / 6, 0.23); close('P6b', 2.20 / 10, 0.22); eq('P7', simp(15, 8), '15:8'); eq('P7b', simp(5 * 3, 2 * 3, 4 * 2), '15:6:8');
calc('P8', 5 * 5, 25); close('P8 chk', (2 * 5 + 10) / (3 * 5), 4 / 3);
eq('exam a', simp(3 * 2, 4 * 2, 5 * 4), '3:4:10'); calc('exam b', 84 / 7 * 4, 48); close('exam c', 6.5 * 40000 / 100000, 2.6);
close('exam dA', 2.60 / 400, 0.0065); close('exam dB', 4.16 / 650, 0.0064);
eq('exit1', simp(18, 45), '2:5'); eq('exit2', share(56, 3, 5), [21, 35]); calc('exit3', 4 * 10000, 40000); calc('exit4', 10 / 2 * 7, 35);
eq('HW1', simp(2500, 750), '10:3'); eq('HW2', share(240, 1, 3, 4), [30, 90, 120]); calc('HW3', 14 / 2 * 3, 21); eq('HW4', simp(4 * 2, 3 * 2, 5 * 3), '8:6:15');
close('HW5', 72 / 3.6, 20); calc('HW6', 30 / 2, 15); close('HW6 chk', 15 / 25, 3 / 5);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Ratio notation, sharing in a ratio, harder ratio problems, proportion, units and scales',
  bullets: ['Part 1: ratio and fractions (R3, R4, R6, R8, N11)', 'Part 2: sharing and harder ratio problems (R5)', 'Part 3: proportion and best buys (R7)', 'Part 4: units, maps and scales (R1, R2)'],
  notes: 'AQA 8300 R1–R8 with N11. Lesson 1 of 3 on Ratio. Lesson 2: percentages, growth and compound measures (R9, R11, R16). Lesson 3: direct and inverse proportion and rates of change (R10, R12–R15). Pitched for a Higher student: the harder ratio problems (combining ratios, ratios that change, ratio with algebra) get the most time. About two hours.',
});

D.objectives({
  tag: 'R1–R8',
  items: [
    'Simplify ratios, write them as **1 : n**, and link ratios to **fractions**.',
    '**Share** in a ratio, and solve **harder ratio problems** with algebra.',
    'Use **proportion**: the unitary method and **best buys**.',
    'Convert **area and volume units**, and use **maps and scales**.',
  ],
  keywords: ['ratio', 'simplest form', 'part', 'proportion', 'unitary method', 'scale'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['Simplify  12 : 18', 'Work out  ⅗  of  40', 'How many centimetres are in  2 m?', 'Write  ¼  as a percentage.'],
  answers: ['2 : 3', '24', '200 cm', '25%'],
  notes: 'All four skills come back today: simplifying, fractions of amounts, unit conversion and percentages.',
});

D.vocab({
  title: 'Key words', tag: 'R1–R8',
  items: [
    { term: 'Ratio', def: 'Compares parts of a whole, e.g. **3 : 5**. The order matters.' },
    { term: 'Simplest form', def: 'Divide every part by the **highest common factor**. Only whole numbers, same units.' },
    { term: 'Proportion', def: 'Two quantities that go up or down at the **same rate**, e.g. cost of 5 pens and cost of 8 pens.' },
    { term: 'Unitary method', def: 'Find the value of **one** first, then multiply.' },
  ],
  notes: 'A ratio compares part to part. A fraction compares part to whole.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: simplifying ratios', { tag: 'R4 ratio' });
  const ex = [
    ['Different units', '40 cm : 2 m', '40 : 200', '= 1 : 5'],
    ['Decimals: × 10', '1.5 : 2.5', '15 : 25', '= 3 : 5'],
    ['Fractions: × the common denominator', '½ : ⅓', '× 6  →  3 : 2', '= 3 : 2'],
    ['The form 1 : n: divide by the first part', '4 : 10', '÷ 4', '= 1 : 2.5'],
  ];
  ex.forEach(([why, q, w, a], i) => {
    const y = 1.4 + i * 1.3;
    rect(s, MX, y, W - 2 * MX, 1.15, i % 2 ? C.white : C.soft, C.line);
    txt(s, why, MX + 0.3, y + 0.08, 5.2, 0.4, { size: 16, color: C.orange });
    txt(s, q, MX + 0.3, y + 0.48, 3.6, 0.6, { size: 26, bold: true });
    txt(s, w, MX + 5.4, y, 3.4, 1.15, { size: 22, valign: 'middle' });
    txt(s, a, MX + 9.0, y, W - 2 * MX - 9.2, 1.15, { size: 28, bold: true, color: C.green, valign: 'middle' });
  });
  notes(s, 'Units first: change both to the smaller unit. In the form 1 : n, n can be a decimal; this is used to compare ratios, e.g. map scales or mixtures.');
}

{
  const s = frame('Ratios and fractions', { tag: 'R6, R8, N11' });
  const bx = MX, bw = 5.8;
  txt(s, 'Boys : girls = 3 : 5', bx, 1.4, bw, 0.6, { size: 26, bold: true, color: C.maroon });
  const cell = 0.66;
  for (let i = 0; i < 8; i++) {
    const x = bx + i * (cell + 0.06), boy = i < 3;
    rect(s, x, 2.2, cell, cell, boy ? C.maroon : C.orange);
    txt(s, boy ? 'B' : 'G', x, 2.2, cell, cell, { size: 18, bold: true, color: C.white, align: 'center', valign: 'middle' });
  }
  txt(s, '8 parts altogether', bx, 3.0, bw, 0.45, { size: 18, color: C.grey });
  const rows = [
    [['Fraction that are boys:  ', F(3, 8)]],
    [['Fraction that are girls:  ', F(5, 8)]],
    [['Number of girls  =  ', F(5, 3), '  × number of boys']],
  ];
  rows.forEach(([m], i) => {
    const y = 3.65 + i * 1.08;
    rect(s, bx, y, bw, 0.95, i % 2 ? C.white : C.greyLight, C.line);
    math(s, bx + 0.25, y + 0.475, m, { size: 21 });
  });
  const cx = MX + 6.3, cw = W - MX - cx;
  rect(s, cx, 1.4, cw, 5.45, C.soft, C.line);
  txt(s, 'Ratio from a fraction', cx + 0.3, 1.55, cw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  txt(s, '⅖ of a class walk to school. The rest come by bus.', cx + 0.3, 2.15, cw - 0.6, 0.9, { size: 20 });
  txt(s, 'walk : bus  =  2 : 3', cx + 0.3, 3.05, cw - 0.6, 0.6, { size: 24, bold: true, color: C.green });
  txt(s, 'Do not write 2 : 5. The 5 is the whole class, not the bus group.', cx + 0.3, 3.8, cw - 0.6, 0.9, { size: 18, color: C.grey });
  txt(s, 'y = kx is a ratio:  y : x  is always  k : 1.  Ratios in a straight-line graph through the origin stay the same.', cx + 0.3, 4.85, cw - 0.6, 1.4, { size: 18 });
  notes(s, 'N11: fractions in ratio problems. "Girls = 5/3 × boys" is the multiplicative relationship (R6). R8 links ratio to y = kx: the gradient k is the constant ratio y : x.');
}

D.hinge({
  title: 'Quick check',
  q: 'Simplify  45 minutes : 2 hours',
  options: ['3 : 8', '45 : 2', '8 : 3', '9 : 24'],
  correct: 0,
  notes: 'Answer A: 45 : 120 = 3 : 8. B ignored the units. C reversed the order. D is not fully simplified.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: sharing in a ratio', { tag: 'R5 sharing' });
  const ex = [
    ['Given the total', 'Share £84 in the ratio 3 : 4', '7 parts = £84,  1 part = £12', '£36 and £48'],
    ['Given one share', 'Ratio 2 : 7. The smaller share is 18.', '2 parts = 18,  1 part = 9', 'larger = 63'],
    ['Given the difference', 'Ratio 5 : 2. The difference is 15.', '3 parts = 15,  1 part = 5', 'total = 35'],
    ['Three parts', 'Share 200 in the ratio 2 : 3 : 5', '10 parts = 200,  1 part = 20', '40, 60, 100'],
  ];
  ex.forEach(([why, q, w, a], i) => {
    const y = 1.4 + i * 1.33;
    rect(s, MX, y, W - 2 * MX, 1.2, i % 2 ? C.white : C.soft, C.line);
    txt(s, why, MX + 0.3, y + 0.08, 4, 0.4, { size: 16, color: C.orange });
    txt(s, q, MX + 0.3, y + 0.5, 5.6, 0.6, { size: 20, bold: true });
    txt(s, w, MX + 6.1, y, 3.6, 1.2, { size: 18, valign: 'middle' });
    txt(s, a, MX + 9.8, y, W - 2 * MX - 10.0, 1.2, { size: 22, bold: true, color: C.green, valign: 'middle' });
  });
  notes(s, 'Always ask: what do I know, a total, one share or a difference? Then find the value of ONE part. A bar model helps: draw the parts as boxes.');
}

{
  const s = frame('Harder ratio problems', { tag: 'R5 problem solving' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 5.45;
  const col = (i, head, lines, ans) => {
    const x = MX + i * (cw + gap);
    rect(s, x, top, cw, h, i === 1 ? C.orangeSoft : C.soft, i === 1 ? C.orange : C.maroon);
    rect(s, x, top, cw, 0.6, i === 1 ? C.orange : C.maroon);
    txt(s, head, x + 0.2, top, cw - 0.4, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
    let y = top + 0.8;
    lines.forEach(([t, sz, b]) => { const th = D.textH(t, sz, cw - 0.4, b); txt(s, t, x + 0.2, y, cw - 0.4, th + 0.05, { size: sz, bold: b }); y += th + 0.18; });
    txt(s, ans, x + 0.2, top + h - 0.85, cw - 0.4, 0.65, { size: 22, bold: true, color: C.green });
  };
  col(0, 'Combine two ratios', [['a : b = 2 : 3 and b : c = 4 : 5. Find a : b : c.', 19, true], ['Make b the same: the LCM of 3 and 4 is 12.', 17], ['a : b = 8 : 12', 18], ['b : c = 12 : 15', 18]], 'a : b : c = 8 : 12 : 15');
  col(1, 'A ratio that changes', [['Red : blue = 3 : 5. 6 red are added. Now red : blue = 1 : 1. How many blue?', 19, true], ['Red = 3x, blue = 5x', 18], ['3x + 6 = 5x', 18], ['x = 3', 18]], 'blue = 5x = 15');
  col(2, 'Ratio and algebra', [['x : (x + 4) = 3 : 5. Find x.', 19, true], ['Cross-multiply:', 17], ['5x = 3(x + 4)', 18], ['5x = 3x + 12', 18]], 'x = 6');
  notes(s, 'These are the ratio questions that appear late on Higher papers. Combining: scale both ratios so the shared letter matches. Changing ratio: use 3x and 5x, then form an equation. Check: 6 : 10 = 3 : 5.');
}

D.myTurnYourTurn({
  title: 'Ratio problems', tag: 'Part 2', stepSize: 22, labelW: 3.15, labelSize: 19, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: 'Simplify  40 cm : 2 m', text: '**1 : 5**' },
      { label: 'Share £84 in 3 : 4', text: '**£36, £48**' },
      { label: 'a:b = 2:3, b:c = 4:5', text: '**8 : 12 : 15**' },
      { label: 'r:b = 3:5, +6 red → 1:1', text: '**15 blue**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: 'Simplify  1.2 kg : 800 g', text: '**3 : 2**' },
      { label: 'Share £150 in 2 : 3 : 5', text: '**£30, £45, £75**' },
      { label: 'a:b = 3:4, b:c = 6:7', text: '**9 : 12 : 14**' },
      { label: 'x : (x + 6) = 2 : 5', text: '**x = 4**' },
    ],
  },
  notes: 'Yours: 1200 : 800 = 3 : 2. 10 parts = £150, 1 part = £15. LCM of 4 and 6 is 12: a : b = 9 : 12, b : c = 12 : 14. 5x = 2x + 12, so x = 4 (check 4 : 10 = 2 : 5).',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: proportion', { tag: 'R7 proportion' });
  const ex = [
    ['Unitary method', '5 pens cost £3.40. Find the cost of 8 pens.', '1 pen = £0.68,  8 × 0.68', '£5.44'],
    ['Recipes', 'A recipe for 4 needs 300 g flour. How much for 10?', '1 person = 75 g,  × 10', '750 g'],
    ['Exchange rates', '£1 = €1.15. Change €230 into pounds.', '230 ÷ 1.15', '£200'],
  ];
  ex.forEach(([why, q, w, a], i) => {
    const y = 1.4 + i * 1.3;
    rect(s, MX, y, W - 2 * MX, 1.15, i % 2 ? C.white : C.soft, C.line);
    txt(s, why, MX + 0.3, y + 0.08, 4, 0.4, { size: 16, color: C.orange });
    txt(s, q, MX + 0.3, y + 0.48, 7.0, 0.6, { size: 20, bold: true });
    txt(s, w, MX + 7.5, y, 2.8, 1.15, { size: 18, valign: 'middle' });
    txt(s, a, MX + 10.4, y, W - 2 * MX - 10.6, 1.15, { size: 24, bold: true, color: C.green, valign: 'middle' });
  });
  const y = 5.4;
  rect(s, MX, y, W - 2 * MX, 1.45, C.greyLight);
  txt(s, 'Best buy', MX + 0.3, y + 0.1, 3, 0.45, { size: 19, bold: true, color: C.maroon });
  txt(s, '500 g for £1.80  →  36p per 100 g          750 g for £2.55  →  34p per 100 g', MX + 0.3, y + 0.55, W - 2 * MX - 0.6, 0.45, { size: 19 });
  txt(s, 'The **750 g** pack is better value: it costs less per 100 g.', MX + 0.3, y + 0.95, W - 2 * MX - 0.6, 0.45, { size: 19, color: C.green });
  notes(s, 'Best buy: compare the same amount (price per 100 g) or the amount per £1. Always write a conclusion with the evidence.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: area and volume units, maps and speed', { tag: 'R1, R2 units' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  rect(s, MX, top, cw, 5.45, C.soft, C.maroon);
  rect(s, MX, top, cw, 0.6, C.maroon);
  txt(s, 'Area and volume units', MX + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  [['1 m = 100 cm', 0], ['1 m² = 100 × 100 = 10 000 cm²', 1], ['1 cm³ = 10 × 10 × 10 = 1000 mm³', 1], ['1 m³ = 1 000 000 cm³', 1], ['Square the factor for area. Cube it for volume.', 0]].forEach(([t, b], i) =>
    txt(s, t, MX + 0.25, top + 0.85 + i * 0.85, cw - 0.5, 0.75, { size: b ? 20 : 18, bold: !!b, color: i === 4 ? C.orange : C.ink }));
  const x2 = MX + cw + gap;
  rect(s, x2, top, cw, 5.45, C.orangeSoft, C.orange);
  rect(s, x2, top, cw, 0.6, C.orange);
  txt(s, 'Maps and speed', x2 + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
  [['Map scale 1 : 25 000', 1], ['4 cm on the map = 4 × 25 000 = 100 000 cm', 0], ['= 1000 m = **1 km**', 0], ['72 km/h to m/s', 1], ['72 × 1000 ÷ 3600 = **20 m/s**', 0]].forEach(([t, b], i) =>
    txt(s, t, x2 + 0.25, top + 0.85 + i * 0.85, cw - 0.5, 0.75, { size: b ? 20 : 19, bold: !!b }));
  notes(s, 'The most common error is 1 m² = 100 cm². Draw a 1 m by 1 m square: it is 100 cm by 100 cm. For km/h to m/s, divide by 3.6. Density, pressure and speed problems are in the next lesson (R11).');
}

D.hinge({
  title: 'Quick check',
  q: 'Convert  3 m²  into cm².',
  options: ['30 000 cm²', '300 cm²', '3000 cm²', '9 cm²'],
  correct: 0,
  notes: 'Answer A: 3 × 10 000. B used × 100. C used × 1000. D squared the 3.',
});

D.myTurnYourTurn({
  title: 'Units and proportion', tag: 'Parts 3–4', stepSize: 21, labelW: 3.15, labelSize: 19, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: '5 m²  in cm²', text: '**50 000 cm²**' },
      { label: '4 cm, map 1 : 50 000', text: '**2 km**' },
      { label: '54 km/h  in m/s', text: '**15 m/s**' },
      { label: '5 pens £3.40; 8 pens?', text: '**£5.44**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: '2.5 m³  in cm³', text: '**2 500 000 cm³**' },
      { label: '7 cm, map 1 : 20 000', text: '**1.4 km**' },
      { label: '90 km/h  in m/s', text: '**25 m/s**' },
      { label: '6 apples £1.68; 10?', text: '**£2.80**' },
    ],
  },
  notes: 'Yours: 2.5 × 1 000 000. 7 × 20 000 = 140 000 cm = 1400 m. 90 ÷ 3.6 = 25. 1 apple = 28p, × 10.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Simplify  24 : 36 : 60', '2 : 3 : 5'], ['Write  5 : 8  in the form  1 : n', '1 : 1.6'], ['Share 360 in the ratio 7 : 5.', '210 and 150'], ['Convert  0.6 m²  into cm².', '6000 cm²'],
    ['Boys : girls = 4 : 5. There are 12 more girls than boys. How many students are there?', '108'], ['Which is better value: 6 eggs for £1.38 or 10 eggs for £2.20?', '10 eggs (22p each)'],
    ['a : b = 5 : 2 and b : c = 3 : 4. Find  a : c', '15 : 8'], ['Red : blue = 2 : 3. 10 red counters are added and it becomes 4 : 3. How many counters were there at first?', '25'],
  ];
  for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 30, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 22, start: k });
    notes(s, 'Answers: 1) ÷ 12  2) 8 ÷ 5 = 1.6  3) 12 parts = 360, 1 part = 30  4) 0.6 × 10 000  5) 1 part = 12, 9 parts = 108  6) 23p vs 22p each  7) a : b : c = 15 : 6 : 8  8) 2x + 10 : 3x = 4 : 3, so 6x + 30 = 12x, x = 5, total 5x = 25.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  stem: 'Amir, Beth and Cara share some money.  Amir : Beth = 3 : 4  and  Beth : Cara = 2 : 5.',
  parts: [
    { l: 'a', q: 'Find  Amir : Beth : Cara  in its simplest form.', m: 2, lines: 0 },
    { l: 'b', q: 'Cara gets £84 more than Amir. Work out how much Beth gets.', m: 3, lines: 1 },
    { l: 'c', q: 'A map has a scale of 1 : 40 000. A road is 6.5 cm long on the map. Work out the real length of the road in km.', m: 2, lines: 1 },
    { l: 'd', q: 'Shop A sells 400 g of tea for £2.60. Shop B sells 650 g for £4.16. Which shop is better value? Show your working.', m: 3, lines: 1 },
  ],
  total: 10,
  scheme: [
    ['(a)', '3 : 4 : 10', 'M1 A1', 'M1 for Beth : Cara = 4 : 10'],
    ['(b)', '7 parts = £84, 1 part = £12; Beth = £48', 'M1 M1 A1', 'M1 10 − 3 = 7 parts'],
    ['(c)', '6.5 × 40 000 = 260 000 cm = 2.6 km', 'M1 A1', ''],
    ['(d)', 'A 0.65p per g, B 0.64p per g: Shop B', 'M1 M1 A1', 'A1 needs both values and a conclusion'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Simplify  18 : 45', 'Share £56 in the ratio 3 : 5.', 'Convert  4 m²  into cm².', 'x : y = 2 : 7.  x = 10.  Find y.'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) 2 : 5  2) £21 and £35  3) 40 000 cm²  4) 1 part = 5, y = 35. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Simplify  2.5 kg : 750 g',
    'Share £240 in the ratio 1 : 3 : 4.',
    'Cats : dogs = 5 : 3. There are 14 more cats than dogs. How many dogs are there?',
    'a : b = 4 : 3 and b : c = 2 : 5. Find  a : b : c',
    'Convert  72 km/h  into m/s.',
    'x : (x + 10) = 3 : 5. Find x.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) 2500 : 750 = 10 : 3  2) £30, £90, £120  3) 2 parts = 14, dogs = 21  4) 8 : 6 : 15  5) 20 m/s  6) 5x = 3x + 30, x = 15.');
}

D.save(path.join(__dirname, 'AQA_8300_R1-R8_RatioAndProportion.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
