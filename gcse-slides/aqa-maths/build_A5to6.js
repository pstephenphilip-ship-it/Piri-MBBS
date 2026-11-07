// build_A5to6.js — AQA GCSE Mathematics 8300, A5–A6 Formulae, rearranging, identities and proof
// One two-hour lesson, both tiers (Higher parts tagged HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A5to6.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A5–A6', title: 'Formulae and proof' };
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// check a rearrangement: subject formula g must reproduce the input when fed the output of f
const close = (l, a, b) => calc(l, a, b, 1e-9);
// ======================= numbers (all checked) =======================
calc('DN1 3x+5=20', (20 - 5) / 3, 5);
calc('DN2 2(x+4) at 1', 2 * 5, 10);
calc('DN3 A=lw', 6 * 4, 24);
calc('DN4 sqrt 49', Math.sqrt(49), 7);
calc('taxi 8 miles', 3 + 2 * 8, 19);
for (const [u, a, t] of [[3, 2, 5], [10, -2, 3], [0, 9.8, 2]]) close(`t=(v-u)/a ${u},${a},${t}`, ((u + a * t) - u) / a, t);
for (const s of [3, 7.5]) close(`s=P/4 ${s}`, (4 * s) / 4, s);
for (const [m, c, x] of [[2, 1, 4], [-3, 5, 2]]) close(`x=(y-c)/m ${m},${c},${x}`, ((m * x + c) - c) / m, x);
for (const x of [2, -1, 4]) close(`hinge x=(y+5)/3 ${x}`, ((3 * x - 5) + 5) / 3, x);
for (const r of [2, 5]) close(`r=sqrt(A/pi) ${r}`, Math.sqrt((Math.PI * r * r) / Math.PI), r);
for (const [u, a, s] of [[3, 2, 4], [0, 9.8, 10]]) close(`s=(v2-u2)/2a ${u},${a},${s}`, ((u * u + 2 * a * s) - u * u) / (2 * a), s);
for (const [a, b, h] of [[6, 10, 4], [3, 5, 2]]) close(`h=2A/(a+b) ${a},${b},${h}`, 2 * (0.5 * (a + b) * h) / (a + b), h);
// MT/YT
for (const [k, w] of [[3, 2]]) close('MT P=2l+2w -> l', ((2 * k + 2 * w) - 2 * w) / 2, k);
close('MT y=5x-7 -> x', ((5 * 3 - 7) + 7) / 5, 3);
close('MT A=r^2 /... E=mc^2 -> c', Math.sqrt((4 * 9) / 4), 3);
close('YT y=4x+9 -> x', ((4 * 2 + 9) - 9) / 4, 2);
close('YT V=IR -> R', (12 * 3) / 12, 3);
close('YT A=x^2/2 -> x', Math.sqrt(2 * (6 * 6 / 2)), 6);
close('YT T=(a+b)/2 -> a', 2 * ((5 + 9) / 2) - 9, 5);
// HT subject twice: 3x + y = ax + 5 -> x = (5 - y)/(3 - a)
for (const [a, y] of [[1, 2], [5, -3]]) { const x = (5 - y) / (3 - a); close(`HT1 ${a},${y}`, 3 * x + y, a * x + 5); }
// HT y = (x+2)/(x-1) -> x = (y+2)/(y-1)
for (const x of [3, -2, 5]) { const y = (x + 2) / (x - 1); close(`HT2 ${x}`, (y + 2) / (y - 1), x); }
// identities
for (const x of [1, 4, -3]) close(`(x+3)^2-(x-3)^2 ${x}`, (x + 3) ** 2 - (x - 3) ** 2, 12 * x);
for (const x of [1, 4, -3]) close(`show 3(x+4)-2(x+1) ${x}`, 3 * (x + 4) - 2 * (x + 1), x + 10);
for (const n of [1, 6, 13]) calc(`consec sum odd ${n}`, (n + (n + 1)) % 2, 1);
for (const n of [1, 6, 13]) calc(`three consec mult 3 ${n}`, (n + n + 1 + n + 2) % 3, 0);
for (const n of [1, 6, 13]) calc(`(n+1)^2-n^2 odd ${n}`, ((n + 1) ** 2 - n ** 2) % 2, 1);
for (const n of [1, 2, 7]) calc(`odd x odd ${n}`, ((2 * n + 1) * (2 * n + 3)) % 2, 1);
// practice
close('P1 P=4s s', 36 / 4, 9);
close('P2 y=2x+6 x', ((2 * 5 + 6) - 6) / 2, 5);
close('P3 V=lwh h', 60 / (5 * 3), 4);
close('P4 E=mc^2', Math.sqrt(36 / 4), 3);
for (const x of [2, -1]) close(`P6 4(x+2)-2(x-3) ${x}`, 4 * (x + 2) - 2 * (x - 3), 2 * (x + 7));
for (const n of [1, 5]) calc(`P8 even+even ${n}`, (2 * n + 2 * (n + 3)) % 2, 0);
// exam
calc('exam a', 5 + 3 * 4, 17);
close('exam b', ((7 * 2 - 3) + 3) / 7, 2);
close('exam c', Math.sqrt(3 * 50 / 6), 5);
for (const n of [1, 4, 10]) calc(`exam e ${n}`, (2 * n + 1 + 2 * n + 3) % 4, 0);
// exit & hw
close('exit 2', ((3 * 4 + 1) - 1) / 3, 4);
for (const x of [2, 7]) close(`HW4 ${x}`, 5 * (x + 2) - 3 * (x + 4), 2 * x - 2);
for (const n of [1, 8]) calc(`HW6 ${n}`, ((n + 2) ** 2 - n ** 2) % 4, 0);

// ======================= helpers =======================
function machine(s, x, y, boxes, o = {}) {
  // boxes: [{t:'t', kind:'end'}, {t:'× a'}, ...]; draws left-to-right with arrows
  const bw = o.bw || 1.45, bh = o.bh || 0.8, gap = o.gap || 0.55, col = o.color || C.maroon;
  boxes.forEach((b, i) => {
    const bx = x + i * (bw + gap);
    const end = b.kind === 'end';
    rect(s, bx, y, bw, bh, end ? C.white : (o.soft || C.soft), col, { lw: end ? 2.5 : 1.5 });
    txt(s, b.t, bx, y, bw, bh, { size: o.size || 24, bold: true, color: end ? C.ink : col, align: 'center', valign: 'middle' });
    if (i < boxes.length - 1) s.addShape(D.SH.line, { x: bx + bw + 0.05, y: y + bh / 2, w: gap - 0.1, h: 0, line: { color: col, width: 2.5, endArrowType: 'triangle' } });
  });
  return boxes.length * bw + (boxes.length - 1) * gap;
}
function steps4(s, title, lines, answer, o = {}) {
  txt(s, title, MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  lines.forEach(([d, m], i) => {
    const y = 2.15 + i * 0.98;
    circle(s, MX + 0.35, y + 0.4, 0.6, C.accent);
    txt(s, String(i + 1), MX + 0.05, y + 0.1, 0.6, 0.6, { size: 22, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, d, MX + 0.9, y, 5.4, 0.8, { size: 20, valign: 'middle' });
    rect(s, 6.6, y, W - MX - 6.6, 0.8, C.soft, C.line);
    if (Array.isArray(m)) math(s, 6.9, y + 0.4, m, { size: 24, bold: true, color: C.maroon });
    else txt(s, m, 6.9, y, W - MX - 7.2, 0.8, { size: 25, bold: true, color: C.maroon, valign: 'middle' });
  });
  if (answer) {
    const y = 2.15 + lines.length * 0.98 + 0.1;
    rect(s, MX, y, W - 2 * MX, 0.85, C.greenSoft, C.green, { lw: 2 });
    if (Array.isArray(answer)) math(s, MX, y + 0.43, answer, { size: 28, bold: true, color: C.green, align: 'center', w: W - 2 * MX });
    else txt(s, answer, MX, y, W - 2 * MX, 0.85, { size: 28, bold: true, color: C.green, align: 'center', valign: 'middle' });
  }
  if (o.warn) {
    rect(s, MX, 6.2, W - 2 * MX, 0.65, C.orangeSoft, 'F3D9B5');
    txt(s, o.warn, MX + 0.3, 6.2, W - 2 * MX - 0.6, 0.65, { size: 19, valign: 'middle' });
  }
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Using formulae, changing the subject, identities and proof',
  bullets: ['Part 1: using and writing formulae (A5)', 'Part 2: changing the subject (A5)', 'Part 3: identities and proof (A6)'],
  notes: 'AQA 8300 A5: understand and use standard mathematical formulae; rearrange formulae to change the subject (subject appearing twice is Higher). A6: know the difference between an equation and an identity; argue mathematically to show algebraic expressions are equivalent, and use algebra to support and construct arguments and proofs (Higher). About two hours; natural breaks at Part 2 and Part 3. Builds on A1–A3 and A4.',
});

D.objectives({
  tag: 'A5–A6',
  items: [
    '**Use** and **write** formulae, including ones from science.',
    '**Change the subject** of a formula using inverse operations.',
    '**Show that** two expressions are identical, and write simple **proofs**.',
  ],
  keywords: ['formula', 'subject', 'rearrange', 'inverse', 'identity', 'proof'],
  notes: 'Share the objectives. Each part ends with a check before moving on.',
});

D.doNow({
  qs: ['Solve  3x + 5 = 20', 'Expand  2(x + 4)', 'A = lw. Find A when l = 6 and w = 4.', 'What is the inverse of "square"?'],
  answers: ['x = 5', '2x + 8', 'A = 24', 'Square root'],
  notes: 'Solving an equation uses the same inverse operations as changing the subject. Q2 and Q3 recap A4 and A2.',
});

D.vocab({
  title: 'Key words', tag: 'A5–A6',
  items: [
    { term: 'Formula', def: 'A rule linking quantities, e.g. **A = lw**. Its **subject** is the letter on its own: **A**.' },
    { term: 'Change the subject', def: 'Rearrange so a **different letter** is on its own, e.g. **l = A ÷ w**.' },
    { term: 'Inverse operation', def: 'The operation that undoes another: **+ and −**, **× and ÷**, **square and √**.' },
    { term: 'Identity / proof', def: '**≡** means true for all values. A **proof** shows something is always true, using algebra.' },
  ],
  notes: 'Subject = the letter on its own on one side of the formula.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: formulae you need to know', { tag: 'A5 formulae' });
  const rows = [
    ['Area of a rectangle', 'A = lw'], ['Area of a triangle', 'A = ½bh'], ['Area of a circle', 'A = πr²'],
    ['Circumference', 'C = πd'], ['Pythagoras', 'a² + b² = c²'], ['Speed', 's = d ÷ t'],
  ];
  rows.forEach(([a, b], i) => {
    const c = i % 2, r = Math.floor(i / 2), cw = (W - 2 * MX - 0.3) / 2, x = MX + c * (cw + 0.3), y = 1.45 + r * 1.2;
    rect(s, x, y, cw, 1.0, r % 2 ? C.white : C.soft, C.line);
    txt(s, a, x + 0.3, y, 2.9, 1.0, { size: 19, color: C.grey, valign: 'middle' });
    txt(s, b, x + 3.2, y, cw - 3.4, 1.0, { size: 26, bold: true, color: C.maroon, valign: 'middle' });
  });
  rect(s, MX, 5.2, W - 2 * MX, 1.6, C.orangeSoft, 'F3D9B5');
  txt(s, 'AQA does **not** give these on a formula sheet: students must learn them. Other formulae, e.g. **v = u + at**, are given in the question.', MX + 0.3, 5.2, W - 2 * MX - 0.6, 1.6, { size: 22, valign: 'middle' });
  notes(s, 'AQA 8300 lists the formulae students must recall (areas, circle, Pythagoras, trigonometry for Higher, compound measures). Kinematics formulae are given when needed.');
}

{
  const s = frame('Writing a formula from words', { tag: 'A5 formulae' });
  txt(s, 'A taxi charges **£3** plus **£2 per mile**. Write a formula for the cost **C** pounds of a journey of **m** miles.', MX, 1.35, W - 2 * MX, 0.95, { size: 23 });
  const tb = [['Miles (m)', '1', '2', '5', 'm'], ['Cost (£C)', '3 + 2 × 1 = 5', '3 + 2 × 2 = 7', '3 + 2 × 5 = 13', '3 + 2 × m']];
  const cw = [2.3, 2.3, 2.3, 2.6, W - 2 * MX - 9.5];
  tb.forEach((row, i) => {
    let x = MX;
    row.forEach((c, j) => {
      rect(s, x, 2.5 + i * 0.85, cw[j], 0.85, i === 0 ? C.maroon : (j === 4 ? C.greenSoft : C.white), C.line);
      txt(s, c, x, 2.5 + i * 0.85, cw[j], 0.85, { size: j === 0 ? 19 : 21, bold: i === 0 || j === 4, color: i === 0 ? C.white : j === 4 ? C.green : C.ink, align: 'center', valign: 'middle' });
      x += cw[j];
    });
  });
  rect(s, MX, 4.6, W - 2 * MX, 0.95, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'C = 3 + 2m', MX, 4.6, W - 2 * MX, 0.95, { size: 36, bold: true, color: C.green, align: 'center', valign: 'middle' });
  txt(s, 'Use it: an 8-mile journey costs  C = 3 + 2 × 8 = **£19**.', MX, 5.85, W - 2 * MX, 0.55, { size: 22 });
  notes(s, 'Spotting the pattern with numbers first helps students write the formula. Common mistake: C = 2 + 3m (swapping the fixed charge and the rate).');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: changing the subject', { tag: 'A5 rearranging' });
  txt(s, 'Make **t** the subject of  **v = u + at**', MX, 1.35, W - 2 * MX, 0.55, { size: 26 });
  txt(s, 'What happens to t:', MX, 2.15, 4, 0.45, { size: 19, bold: true, color: C.grey });
  machine(s, MX + 0.3, 2.65, [{ t: 't', kind: 'end' }, { t: '× a' }, { t: '+ u' }, { t: 'v', kind: 'end' }], { bw: 1.4, gap: 0.55 });
  txt(s, 'Undo it, in reverse:', MX, 3.8, 4, 0.45, { size: 19, bold: true, color: C.grey });
  machine(s, MX + 0.3, 4.3, [{ t: 'v', kind: 'end' }, { t: '− u' }, { t: '÷ a' }, { t: 't', kind: 'end' }], { bw: 1.4, gap: 0.55, color: C.orange, soft: C.orangeSoft });
  const bx = 9.0, bw = W - MX - bx;
  rect(s, bx, 2.15, bw, 3.0, C.greyLight);
  txt(s, 'v = u + at', bx + 0.3, 2.3, bw - 0.6, 0.6, { size: 24 });
  txt(s, 'v − u = at', bx + 0.3, 3.0, bw - 0.6, 0.6, { size: 24 });
  math(s, bx + 0.3, 4.25, [{ n: 'v − u', d: 'a' }, ' = t'], { size: 24 });
  rect(s, MX, 5.35, W - 2 * MX, 1.3, C.greenSoft, C.green, { lw: 2 });
  math(s, MX, 6.0, ['t = ', { n: 'v − u', d: 'a' }], { size: 30, bold: true, color: C.green, align: 'center', w: W - 2 * MX });
  notes(s, 'Changing the subject is solving an equation with letters. The function machine shows the order: undo the last operation first. Check: u = 3, a = 2, t = 5 gives v = 13, and (13 − 3) ÷ 2 = 5.');
}

{
  const s = frame('Rearranging is like solving', { tag: 'A5 rearranging' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, 4.6, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 23, bold: true, color: C.white, valign: 'middle' });
    lines.forEach(([l, why], i) => {
      txt(s, l, x + 0.35, top + 0.95 + i * 1.1, cw - 2.3, 0.6, { size: 26, bold: i === lines.length - 1, color: i === lines.length - 1 ? colour : C.ink });
      if (why) txt(s, why, x + cw - 2.0, top + 1.0 + i * 1.1, 1.8, 0.5, { size: 17, color: C.grey });
    });
  };
  col(MX, 'Solve  3x + 5 = 20', [['3x + 5 = 20', ''], ['3x = 15', '− 5'], ['x = 5', '÷ 3']], C.maroon, C.soft);
  col(MX + cw + gap, 'Make x the subject of  y = mx + c', [['y = mx + c', ''], ['y − c = mx', '− c'], ['x = (y − c) ÷ m', '÷ m']], C.orange, C.orangeSoft);
  rect(s, MX, 6.15, W - 2 * MX, 0.7, C.greyLight);
  txt(s, 'Same steps, same order. With letters you **cannot** work out a number, so you leave the operation written in.', MX + 0.3, 6.15, W - 2 * MX - 0.6, 0.7, { size: 19, valign: 'middle' });
  notes(s, 'Side by side shows the method is identical. x = (y − c)/m can also be written as a fraction.');
}

D.hinge({
  title: 'Quick check',
  q: 'Make x the subject of  y = 3x − 5',
  options: ['x = (y − 5) ÷ 3', 'x = (y + 5) ÷ 3', 'x = y ÷ 3 + 5', 'x = 3y + 5'],
  correct: 1,
  notes: 'Answer B: add 5, then divide by 3. A: wrong inverse of −5. C: divided before adding 5. D: multiplied instead of dividing.',
});

{
  const s = frame('Squares, roots and fractions', { tag: 'A5 rearranging' });
  const items = [
    ['Make r the subject of  A = πr²', [['÷ π', ['r² = ', { n: 'A', d: 'π' }]], ['√', ['r = √(A ÷ π)']]]],
    ['Make s the subject of  v² = u² + 2as', [['− u²', ['v² − u² = 2as']], ['÷ 2a', ['s = ', { n: 'v² − u²', d: '2a' }]]]],
    ['Make h the subject of  A = ½(a + b)h', [['× 2', ['2A = (a + b)h']], ['÷ (a + b)', ['h = ', { n: '2A', d: 'a + b' }]]]],
  ];
  items.forEach(([q, st], i) => {
    const y = 1.4 + i * 1.8;
    rect(s, MX, y, W - 2 * MX, 1.65, i % 2 ? C.white : C.soft, C.line);
    txt(s, q, MX + 0.3, y + 0.1, 5.4, 1.45, { size: 21, bold: true, valign: 'middle' });
    st.forEach(([op, m], j) => {
      const x = 6.2 + j * 3.4;
      txt(s, op, x, y + 0.12, 3.2, 0.4, { size: 16, bold: true, color: C.orange });
      math(s, x, y + 1.0, m, { size: 22, bold: j === 1, color: j === 1 ? C.green : C.ink });
    });
  });
  notes(s, 'Undo squaring with a square root as the LAST step. With fractions, multiply first to clear the denominator. All three rearrangements are checked numerically in the build.');
}

D.myTurnYourTurn({
  title: 'Changing the subject', tag: 'Part 2', stepSize: 24, labelW: 3.8, labelSize: 21, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Make the letter in brackets the subject:',
    steps: [
      { label: 'y = 5x − 7   (x)', math: ['x = ', { n: 'y + 7', d: 5 }], bold: true },
      { label: 'P = 2l + 2w   (l)', math: ['l = ', { n: 'P − 2w', d: 2 }], bold: true },
      { label: 'E = mc²   (c)', math: ['c = √(E ÷ m)'], bold: true },
    ],
  },
  yours: {
    q: 'Make the letter in brackets the subject:',
    steps: [
      { label: 'y = 4x + 9   (x)', math: ['x = ', { n: 'y − 9', d: 4 }], bold: true },
      { label: 'V = IR   (R)', math: ['R = ', { n: 'V', d: 'I' }], bold: true },
      { label: 'T = ½(a + b)   (a)', math: ['a = 2T − b'], bold: true },
    ],
  },
  notes: 'Mine: +7 then ÷5; −2w then ÷2; ÷m then √. Yours: −9 then ÷4; ÷I; ×2 then −b.',
});

{
  const s = frame('When the subject appears twice', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, lines, ans, colour, soft) => {
    rect(s, x, top, cw, 5.4, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 21, bold: true, color: C.white, valign: 'middle' });
    lines.forEach(([why, l], i) => {
      txt(s, why, x + 0.3, top + 0.9 + i * 0.95, cw - 0.6, 0.35, { size: 15, bold: true, color: colour });
      txt(s, l, x + 0.3, top + 1.22 + i * 0.95, cw - 0.6, 0.55, { size: 22 });
    });
    math(s, x + 0.3, top + 4.75, ans, { size: 26, bold: true, color: colour });
  };
  col(MX, 'x the subject of  3x + y = ax + 5', [['x terms to one side', '3x − ax = 5 − y'], ['factorise out x', 'x(3 − a) = 5 − y'], ['divide by the bracket', '']], ['x = ', { n: '5 − y', d: '3 − a' }], C.maroon, C.soft);
  col(MX + cw + gap, 'x the subject of  y = (x + 2) ÷ (x − 1)', [['multiply by (x − 1)', 'y(x − 1) = x + 2'], ['expand, x terms together', 'xy − x = y + 2'], ['factorise out x', 'x(y − 1) = y + 2']], ['x = ', { n: 'y + 2', d: 'y − 1' }], C.orange, C.orangeSoft);
  notes(s, 'Higher only: collect every term containing x on one side, factorise x out, then divide. Both results are checked numerically in the build (e.g. x = 3 gives y = 2.5, and (2.5 + 2)/(2.5 − 1) = 3).');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: show that two expressions are identical', { tag: 'A6 identities' });
  steps4(s, 'Show that  **3(x + 4) − 2(x + 1) ≡ x + 10**', [
    ['Start with the left-hand side', '3(x + 4) − 2(x + 1)'],
    ['Expand each bracket', '3x + 12 − 2x − 2'],
    ['Collect like terms', '3x − 2x + 12 − 2'],
  ], '= x + 10  ≡  right-hand side  ✓', { warn: '**Never** start by writing LHS = RHS. Work on **one side** until it matches the other.' });
  notes(s, 'A "show that" answer must show every line. Substituting numbers does NOT prove an identity: it only checks it.');
}

{
  const s = frame('Writing numbers in algebra', { tag: 'A6 proof' });
  const rows = [
    ['Any whole number', 'n'], ['Consecutive numbers', 'n,  n + 1,  n + 2'], ['An even number', '2n'],
    ['An odd number', '2n + 1'], ['Consecutive even numbers', '2n,  2n + 2'], ['A multiple of 3', '3n'],
  ];
  rows.forEach(([a, b], i) => {
    const y = 1.4 + i * 0.85;
    rect(s, MX, y, 8.0, 0.75, i % 2 ? C.white : C.soft, C.line);
    txt(s, a, MX + 0.3, y, 4.2, 0.75, { size: 21, valign: 'middle' });
    txt(s, b, MX + 4.5, y, 3.4, 0.75, { size: 25, bold: true, color: C.maroon, valign: 'middle' });
  });
  const bx = 9.0, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.0, C.orangeSoft, 'F3D9B5');
  txt(s, 'To show a result is…', bx + 0.3, 1.55, bw - 0.6, 0.5, { size: 20, bold: true, color: C.orange });
  txt(s, '**even**: write it as 2 × (something)', bx + 0.3, 2.2, bw - 0.6, 0.9, { size: 19 });
  txt(s, '**odd**: write it as 2 × (something) + 1', bx + 0.3, 3.15, bw - 0.6, 0.9, { size: 19 });
  txt(s, '**a multiple of 3**: write it as 3 × (something)', bx + 0.3, 4.1, bw - 0.6, 0.9, { size: 19 });
  txt(s, 'where "something" is a whole number.', bx + 0.3, 5.3, bw - 0.6, 0.9, { size: 17, color: C.grey });
  notes(s, 'These are the building blocks of algebraic proof. Why 2n + 1 is always odd: 2n is even, one more is odd.');
}

D.hinge({
  title: 'Quick check',
  q: 'n is a whole number. Which expression is always odd?',
  options: ['n + 1', '2n', '2n + 1', '3n'],
  correct: 2,
  notes: 'Answer C. A: odd only when n is even. B: always even. D: odd or even depending on n.',
});

{
  const s = frame('Algebraic proof', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, lines, colour, soft) => {
    rect(s, x, top, cw, 5.4, soft, colour);
    rect(s, x, top, cw, 0.85, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.85, { size: 20, bold: true, color: C.white, valign: 'middle' });
    lines.forEach((l, i) => txt(s, l, x + 0.3, top + 1.05 + i * 0.8, cw - 0.6, 0.75, { size: 21, bold: i === lines.length - 1, color: i === lines.length - 1 ? colour : C.ink }));
  };
  col(MX, 'Prove: the sum of three consecutive whole numbers is a multiple of 3.', ['Let them be n, n + 1, n + 2', 'Sum = n + n + 1 + n + 2', '= 3n + 3', '= 3(n + 1)', '3 × a whole number, so a multiple of 3 ✓'], C.maroon, C.soft);
  col(MX + cw + gap, 'Prove: (n + 1)² − n² is always odd.', ['Expand: n² + 2n + 1 − n²', '= 2n + 1', '2n is even', 'even + 1 is odd', 'So it is always odd ✓'], C.orange, C.orangeSoft);
  notes(s, 'Algebraic proof is Higher (A6). The final line must state the conclusion in words. Checking with numbers is not a proof.');
}

D.myTurnYourTurn({
  title: 'Show that / prove', tag: 'Part 3', stepSize: 21, labelW: 1.7, labelSize: 17,
  mine: {
    q: 'Show that  (x + 3)² − (x − 3)² ≡ 12x',
    steps: [
      { label: 'Expand', text: '(x² + 6x + 9) − (x² − 6x + 9)' },
      { label: 'Subtract', text: 'x² + 6x + 9 − x² + 6x − 9' },
      { label: 'Simplify', text: '**= 12x  ✓**' },
    ],
  },
  yours: {
    q: '**HT** Prove that the sum of two consecutive odd numbers is a multiple of 4.',
    steps: [
      { label: 'Let', text: '2n + 1  and  2n + 3' },
      { label: 'Sum', text: '4n + 4 = 4(n + 1)' },
      { label: 'Conclude', text: '**4 × a whole number, so a multiple of 4 ✓**' },
    ],
  },
  notes: 'The subtraction of the second bracket changes every sign: −(x² − 6x + 9) = −x² + 6x − 9.',
});

// ---------------- Practice & assessment ----------------
{
  const qs = [
    'Make s the subject of  P = 4s',
    'Make x the subject of  y = 2x + 6',
    'Make h the subject of  V = lwh',
    'Make c the subject of  E = mc²',
    'A plumber charges £40 plus £25 per hour. Write a formula for the cost C of h hours.',
    'Show that  4(x + 2) − 2(x − 3) ≡ 2(x + 7)',
    'Jo says x² ≡ 2x because both equal 4 when x = 2. Explain why she is wrong.',
    'Show that the sum of two even numbers is even.',
  ];
  const ans = ['s = P ÷ 4', 'x = (y − 6) ÷ 2', 'h = V ÷ (lw)', 'c = √(E ÷ m)', 'C = 40 + 25h', '4x + 8 − 2x + 6 = 2x + 14 = 2(x + 7)', 'x = 3: 9 ≠ 6. Not true for all x', '2n + 2m = 2(n + m): even'];
  const sets = [['Practice: rearranging', 0, 'Questions 1–4'], ['Practice: formulae and proof', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 25, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) s = P/4  2) x = (y − 6)/2  3) h = V/(lw)  4) c = √(E/m)  5) C = 40 + 25h  6) LHS = 4x + 8 − 2x + 6 = 2x + 14 = 2(x + 7)  7) one counter-example, x = 3, shows it is not an identity; x² = 2x is an equation  8) 2n + 2m = 2(n + m), a multiple of 2.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 9 marks', size: 19, lineGap: 0.34,
  parts: [
    { l: 'a', q: 'T = 5 + 3n. Work out T when n = 4.', m: 1, lines: 1 },
    { l: 'b', q: 'Make n the subject of  y = 7n − 3', m: 2, lines: 1 },
    { l: 'c', q: 'A = ½bh² . Find h when A = 50 and b = 4. (Rearrange first.)', m: 2, lines: 1 },
    { l: 'd', q: 'Show that  (x + 5)² − 10x ≡ x² + 25', m: 2, lines: 1 },
    { l: 'e', q: 'HT  Prove that the sum of two consecutive odd numbers is a multiple of 4.', m: 2, lines: 1 },
  ],
  total: 9,
  scheme: [
    ['(a)', '5 + 12 = 17', 'B1', ''],
    ['(b)', 'n = (y + 3) ÷ 7', 'M1 A1', 'M1 for y + 3 = 7n'],
    ['(c)', 'h² = 2A ÷ b = 25, h = 5', 'M1 A1', 'M1 for correct rearrangement or substitution'],
    ['(d)', 'x² + 10x + 25 − 10x = x² + 25', 'M1 A1', 'M1 correct expansion'],
    ['(e)', '(2n + 1) + (2n + 3) = 4n + 4 = 4(n + 1)', 'M1 A1', 'A1 needs a conclusion'],
  ],
  notes: 'Mark scheme on the next slide. (c): h² = 2 × 50 ÷ 4 = 25, h = 5 (positive length).',
});
calc('exam c check', 0.5 * 4 * 25, 50);
for (const x of [1, -2, 3]) close(`exam d ${x}`, (x + 5) ** 2 - 10 * x, x * x + 25);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Write a formula for the cost C of n pens at 45p each.', 'Make x the subject of  y = 3x + 1', 'What does ≡ mean?', 'Write an expression for any odd number.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) C = 45n (pence)  2) x = (y − 1) ÷ 3  3) identically equal: true for every value  4) 2n + 1. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'A gym charges £20 to join and £15 a month. Write a formula for the cost C after m months. Find C when m = 6.',
    'Make the letter in brackets the subject: (a) y = 6x − 1 (x)  (b) A = lw (w)  (c) v = u + at (a)',
    'Make r the subject of  V = 4r³ (HT: then of  A = 4πr²)',
    'Show that  5(x + 2) − 3(x + 4) ≡ 2x − 2',
    'Write expressions for three consecutive numbers. Show their sum is 3 times the middle one.',
    'HT  Prove that (n + 2)² − n² is always a multiple of 4.',
  ], { cols: 2, size: 19 });
  notes(s, 'Answers: 1) C = 20 + 15m; £110  2) x = (y + 1)/6; w = A/l; a = (v − u)/t  3) r = ∛(V/4); r = √(A/(4π))  4) 5x + 10 − 3x − 12 = 2x − 2  5) n − 1 + n + n + 1 = 3n  6) n² + 4n + 4 − n² = 4n + 4 = 4(n + 1).');
}
calc('HW1', 20 + 15 * 6, 110);

D.save(path.join(__dirname, 'AQA_8300_A5-A6_FormulaeAndProof.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
