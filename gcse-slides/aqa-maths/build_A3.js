// build_A3.js — AQA GCSE Mathematics 8300, A3 Algebraic vocabulary (one lesson, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_A3.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'A3', title: 'Algebraic vocabulary' };
const D = T.init(DECK);
const { frame, notes, txt, rect, hline, vline, circle, MX, W } = D;

// ======================= numbers (all checked) =======================
calc('DN2 2x+5 at 4', 2 * 4 + 5, 13);
// identity 2(x+3) = 2x+6 for several x; equation 2x + 3 = 9 only at x = 3
for (const v of [1, 5, -2, 0.5]) calc(`identity at ${v}`, 2 * (v + 3), 2 * v + 6);
calc('equation true at 3', 2 * 3 + 3, 9);
calc('equation false at 1', 2 * 1 + 3 === 9 ? 1 : 0, 0);
calc('equation 3x+2=14 at 4', 3 * 4 + 2, 14);
calc('inequality x+2>5 boundary', 3 + 2, 5);
calc('exam (c) 2x+5=11 at 3', 2 * 3 + 5, 11);
calc('exam (c) false at 0', 2 * 0 + 5 === 11 ? 1 : 0, 0);
calc('P7 4(x-1) = 4x-4 at 7', 4 * (7 - 1), 4 * 7 - 4);
calc('P8 5n+1 not identity with 5(n+1) at 1', 5 * 1 + 1 === 5 * (1 + 1) ? 1 : 0, 0);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Expressions, equations, formulae, identities, inequalities, terms and factors',
  bullets: ['Naming the parts of algebra correctly', 'Telling an equation from a formula and an identity', 'Using the ≡ and inequality symbols'],
  notes: 'AQA 8300 A3: understand and use the concepts and vocabulary of expressions, equations, formulae, identities, inequalities, terms and factors. Both tiers. One lesson (about 60 minutes). These words appear in exam questions, e.g. "Here are four statements. Write expression, equation, formula or identity for each."',
});

D.objectives({
  tag: 'A3',
  items: [
    'Identify the **terms**, **coefficients** and **factors** in an expression.',
    'Tell the difference between an **expression**, **equation**, **formula** and **identity**.',
    'Read and write **inequalities** using <, >, ≤ and ≥.',
  ],
  keywords: ['term', 'factor', 'expression', 'equation', 'formula', 'identity', 'inequality'],
  notes: 'Share the objectives. Return to them at the exit ticket.',
});

D.doNow({
  qs: ['Write  3 × a × b  in algebra.', 'Work out  2x + 5  when x = 4.', 'List all the factors of 12.', 'Write down a whole number that is bigger than 3 and smaller than 8.'],
  answers: ['3ab', '8 + 5 = 13', '1, 2, 3, 4, 6, 12', 'Any of 4, 5, 6, 7'],
  notes: 'Q1 recaps A1, Q2 recaps A2. Q3 revisits factors (needed for factors of terms). Q4 is an inequality in words: 3 < n < 8.',
});

D.vocab({
  title: 'Key words (1)', tag: 'A3',
  items: [
    { term: 'Term', def: 'A single number, letter, or numbers and letters multiplied together, e.g. **5**, **x**, **−3ab**.' },
    { term: 'Coefficient', def: 'The number in front of the letters in a term. In **−3ab** the coefficient is **−3**.' },
    { term: 'Factor', def: 'Something that divides exactly into a term. **2**, **a** and **2a** are factors of **6ab**.' },
    { term: 'Expression', def: 'One or more terms joined by + or −. **No equals sign**, e.g. **3x + 2**.' },
  ],
  notes: 'A term keeps the sign in front of it: in 4x − 7 the terms are 4x and −7.',
});

D.vocab({
  title: 'Key words (2)', tag: 'A3',
  items: [
    { term: 'Equation', def: 'Two expressions that are equal for **particular values**, e.g. **3x + 2 = 14** (only when x = 4).' },
    { term: 'Formula', def: 'A rule linking **different quantities**, e.g. **A = lw**. You substitute into it.' },
    { term: 'Identity', def: 'True for **every** value of the letters, e.g. **2(x + 3) ≡ 2x + 6**. Uses the symbol **≡**.' },
    { term: 'Inequality', def: 'Shows one side is **bigger or smaller**, e.g. **x + 2 > 5**. Uses <, >, ≤ or ≥.' },
  ],
  notes: 'The ≡ symbol means "is identically equal to": both sides are equal whatever the value of x.',
});

// Terms anatomy
{
  const s = frame('Terms and coefficients', { tag: 'A3' });
  txt(s, 'This expression has **three terms**:', MX, 1.4, W - 2 * MX, 0.5, { size: 24 });
  const parts = [['4x²', 'x² term', 'coefficient 4'], ['+ 3xy', 'xy term', 'coefficient 3'], ['− 5', 'constant term', 'no letters']];
  const bw = 3.4, gap = 0.5, x0 = MX + (W - 2 * MX - (3 * bw + 2 * gap)) / 2, y0 = 2.3;
  parts.forEach(([t, a, b], i) => {
    const x = x0 + i * (bw + gap);
    rect(s, x, y0, bw, 1.4, [C.soft, C.orangeSoft, C.greenSoft][i], [C.maroon, C.orange, C.green][i], { lw: 2.5 });
    txt(s, t, x, y0, bw, 1.4, { size: 44, bold: true, color: [C.maroon, C.orange, C.green][i], align: 'center', valign: 'middle' });
    txt(s, a, x, y0 + 1.55, bw, 0.45, { size: 22, bold: true, align: 'center' });
    txt(s, b, x, y0 + 2.05, bw, 0.45, { size: 20, color: C.grey, align: 'center' });
  });
  rect(s, MX, 5.4, W - 2 * MX, 1.4, C.greyLight);
  txt(s, 'The sign **belongs to the term after it**: the third term is **−5**, not 5.', MX + 0.3, 5.5, W - 2 * MX - 0.6, 0.55, { size: 22 });
  txt(s, 'A term with no letters is called the **constant term**.', MX + 0.3, 6.1, W - 2 * MX - 0.6, 0.55, { size: 22 });
  notes(s, '4x² + 3xy − 5 has three terms: 4x², 3xy and −5. Coefficient of x² is 4, of xy is 3. −5 is the constant term.');
}

// Factors of a term
{
  const s = frame('Factors of a term', { tag: 'A3' });
  txt(s, 'Write the term as a multiplication to see its factors.', MX, 1.4, W - 2 * MX, 0.5, { size: 24 });
  rect(s, MX, 2.15, W - 2 * MX, 1.2, C.soft, C.line);
  txt(s, '6ab  =  2 × 3 × a × b', MX, 2.15, W - 2 * MX, 1.2, { size: 40, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  txt(s, 'Factors of 6ab include:', MX, 3.65, W - 2 * MX, 0.5, { size: 22, bold: true });
  const fs = ['1', '2', '3', '6', 'a', 'b', '2a', '3b', 'ab', '6ab'];
  const fw = 1.12, fx0 = MX;
  fs.forEach((f, i) => {
    const x = fx0 + i * (fw + 0.11);
    rect(s, x, 4.25, fw, 0.85, C.white, C.accent, { lw: 2 });
    txt(s, f, x, 4.25, fw, 0.85, { size: 26, bold: true, align: 'center', valign: 'middle' });
  });
  rect(s, MX, 5.55, W - 2 * MX, 1.25, C.orangeSoft, 'F3D9B5');
  txt(s, 'A **common factor** divides into two terms. The highest common factor of **6ab** and **9a** is **3a**.', MX + 0.3, 5.55, W - 2 * MX - 0.6, 1.25, { size: 22, valign: 'middle' });
  notes(s, '6ab = 2 × 3 × a × b. Other factors: 2b, 3a, 6a, 6b, 2ab, 3ab. The HCF of 6ab and 9a is 3a: this is what students will use when factorising (A4).');
}

// Comparison table
{
  const s = frame('Expression, equation, formula or identity?', { tag: 'A3' });
  const head = ['', 'Example', 'Has = sign?', 'What it means'];
  const rows = [
    ['Expression', '3x + 2', 'No', 'Just terms. You can simplify it or substitute into it.'],
    ['Equation', '3x + 2 = 14', 'Yes', 'True only for a particular value: x = 4. You can solve it.'],
    ['Formula', 'A = lw', 'Yes', 'Links different quantities. You substitute into it.'],
    ['Identity', '2(x + 3) ≡ 2x + 6', 'Yes (≡)', 'True for every value of x.'],
  ];
  const cw = [2.5, 3.5, 1.9, W - 2 * MX - 7.9], rh = 1.08, top = 1.4;
  let xx = MX;
  rect(s, MX, top, W - 2 * MX, 0.6, C.maroon);
  head.forEach((h, j) => { txt(s, h, xx + 0.2, top, cw[j] - 0.3, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' }); xx += cw[j]; });
  rows.forEach((r, i) => {
    const yy = top + 0.6 + i * rh;
    rect(s, MX, yy, W - 2 * MX, rh, i % 2 ? C.white : C.soft, C.line);
    let x = MX;
    r.forEach((c, j) => {
      txt(s, c, x + 0.2, yy, cw[j] - 0.3, rh, { size: j === 0 ? 22 : j === 1 ? 24 : j === 2 ? 20 : 19, bold: j < 2, color: j === 0 ? C.maroon : C.ink, valign: 'middle' });
      x += cw[j];
    });
  });
  rect(s, MX, 6.3, W - 2 * MX, 0.6, C.greyLight);
  txt(s, 'An **inequality** uses <, >, ≤ or ≥ instead of =, e.g. x + 2 > 5.', MX + 0.3, 6.3, W - 2 * MX - 0.6, 0.6, { size: 20, valign: 'middle' });
  notes(s, 'Quick test: no equals sign → expression. Equals sign and you can find the value of the letter → equation. Equals sign linking different quantities → formula. True whatever the letter is → identity (≡).');
}

// Identity test
{
  const s = frame('Equation or identity? Test some values', { tag: 'A3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const table = (x, title, f1, f2, vals, colour, soft, verdict) => {
    rect(s, x, top, cw, 0.7, colour);
    txt(s, title, x + 0.3, top, cw - 0.6, 0.7, { size: 26, bold: true, color: C.white, valign: 'middle' });
    const hdr = ['x', f1, f2];
    const cws = [1.0, (cw - 1.0) / 2, (cw - 1.0) / 2];
    let yy = top + 0.85;
    rect(s, x, yy, cw, 0.6, C.greyLight);
    let xx = x; hdr.forEach((h, j) => { txt(s, h, xx, yy, cws[j], 0.6, { size: 21, bold: true, align: 'center', valign: 'middle' }); xx += cws[j]; });
    vals.forEach(([v, a, b], i) => {
      yy += 0.6;
      const same = a === b;
      rect(s, x, yy, cw, 0.6, same ? C.white : C.soft, C.line);
      xx = x; [v, a, b].forEach((c, j) => { txt(s, String(c), xx, yy, cws[j], 0.6, { size: 22, bold: j > 0, color: j > 0 ? (same ? C.green : C.red) : C.ink, align: 'center', valign: 'middle' }); xx += cws[j]; });
    });
    rect(s, x, yy + 0.8, cw, 1.0, soft, colour);
    txt(s, verdict, x + 0.3, yy + 0.8, cw - 0.6, 1.0, { size: 20, valign: 'middle' });
  };
  const idv = [1, 5, -2, 10].map(v => [v, 2 * (v + 3), 2 * v + 6]);
  const eqv = [1, 3, -2, 10].map(v => [v, 2 * v + 3, 9]);
  table(MX, '2(x + 3)  and  2x + 6', '2(x + 3)', '2x + 6', idv, C.green, C.greenSoft, 'Equal for **every** value: an **identity**.');
  table(MX + cw + gap, '2x + 3  and  9', '2x + 3', '9', eqv, C.maroon, C.soft, 'Equal **only** when x = 3: an **equation**.');
  notes(s, 'Left: 8, 16, 2, 26 on both sides each time, so it is an identity. Right: only x = 3 gives 9. Testing values can show something is NOT an identity (one counter-example is enough), but to prove an identity you need algebra (expanding, in A4).');
}

D.hinge({
  title: 'Quick check',
  q: 'Which one of these is an identity?',
  options: ['3x + 1 = 10', '5(a + 2) ≡ 5a + 10', 'v = u + at', '4y − 2'],
  correct: 1,
  notes: 'Answer B. A is an equation (x = 3 only). C is a formula. D is an expression. The ≡ sign is a strong clue, but students should be able to explain: it is true for every value of a.',
});

// Inequalities with number lines
{
  const s = frame('Inequality symbols', { tag: 'A3' });
  const sym = [['<', 'is less than'], ['>', 'is greater than'], ['≤', 'is less than or equal to'], ['≥', 'is greater than or equal to']];
  sym.forEach(([a, b], i) => {
    const y = 1.45 + i * 0.75;
    rect(s, MX, y, 0.9, 0.62, C.soft, C.accent, { lw: 2 });
    txt(s, a, MX, y, 0.9, 0.62, { size: 32, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
    txt(s, b, MX + 1.15, y, 4.6, 0.62, { size: 22, valign: 'middle' });
  });
  // number lines
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
  notes(s, 'x > 3: open circle at 3, arrow right (3 itself is not included). x ≤ 2: filled circle at 2, arrow left. Solving inequalities comes later (A22); here students only need to read and write them.');
}

// Sort
{
  const items = ['7x − 2', '7x − 2 = 12', 'P = 4s', '3(y + 1) ≡ 3y + 3', 'n ≥ 5', 'a² + 2a', 'F = ma', '2x + x ≡ 3x'];
  const ans = ['Expression', 'Equation', 'Formula', 'Identity', 'Inequality', 'Expression', 'Formula', 'Identity'];
  for (const reveal of [false, true]) {
    const s = frame(reveal ? 'Sort it: answers' : 'Sort it', { tag: reveal ? 'Check' : 'Expression, equation, formula, identity or inequality?' });
    D.qCards(s, reveal ? items.map((t, i) => `${t}   →   **${ans[i]}**`) : items, { cols: 2, size: 26, color: reveal ? C.green : undefined });
    notes(s, 'Answers: 1 expression; 2 equation (7x = 14, x = 2); 3 formula; 4 identity; 5 inequality; 6 expression; 7 formula; 8 identity. Ask pairs to justify 4 and 8: they are true for all values.');
  }
}

D.myTurnYourTurn({
  title: 'Terms and coefficients', tag: 'A3', stepSize: 24, labelW: 3.4, labelSize: 21, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'For the expression  **5a² − 3ab + 7**:',
    steps: [
      { label: 'How many terms?', text: '**3**' },
      { label: 'Coefficient of a²', text: '**5**' },
      { label: 'Coefficient of ab', text: '**−3**' },
      { label: 'Constant term', text: '**7**' },
    ],
  },
  yours: {
    q: 'For the expression  **2x³ + x − 9y + 4**:',
    steps: [
      { label: 'How many terms?', text: '**4**' },
      { label: 'Coefficient of x', text: '**1**' },
      { label: 'Coefficient of y', text: '**−9**' },
      { label: 'Constant term', text: '**4**' },
    ],
  },
  notes: 'The coefficient of ab is −3 because the minus sign belongs to the term. The coefficient of x in "x" is 1 (x means 1x). Common error: saying the coefficient of y is 9.',
});

// Practice
{
  const qs = [
    'How many terms are in  4p − 3q + 2r − 1 ?',
    'Write down the coefficient of y in  6x − 8y + 5.',
    'Write down two factors of 10ab that are not numbers.',
    'Write in symbols: x is greater than or equal to 7.',
    'Is  a + b ≡ b + a  an identity? Explain.',
    'Write  "n is less than 4"  as an inequality and list the positive whole numbers it allows.',
    'Complete the identity:  4(x − 1) ≡ 4x − …',
    'Show that  5n + 1  and  5(n + 1)  are not identical.',
  ];
  const ans = ['4 terms', '−8', 'e.g. a, b, ab, 2a, 5b', 'x ≥ 7', 'Yes: true for every a and b', 'n < 4: 1, 2, 3', '4(x − 1) ≡ 4x − 4', 'n = 1: 6 and 10 differ'];
  const sets = [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: reasoning', 4, 'Questions 5–8']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 26, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 4  2) −8 (the sign belongs to the term)  3) any two of a, b, ab, 2a, 5a, 2b, 5b, 10a, 10b, 2ab, 5ab, 10ab  4) x ≥ 7  5) yes: adding in either order gives the same answer for every value  6) n < 4, so 1, 2, 3  7) 4  8) one counter-example is enough: n = 1 gives 6 and 10.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 5 marks', size: 20, lineGap: 0.36,
  stem: 'Write **expression**, **equation**, **formula** or **identity** for each of (a), (b) and (c).',
  parts: [
    { l: 'a', q: '4x − 7 = 13', m: 1, lines: 1 },
    { l: 'b', q: 'A = πr²', m: 1, lines: 1 },
    { l: 'c', q: '6(x + 1) ≡ 6x + 6', m: 1, lines: 1 },
    { l: 'd', q: 'Write down a factor of 10ab that is not a number.', m: 1, lines: 1 },
    { l: 'e', q: 'Explain why  2x + 5 = 11  is an equation and not an identity.', m: 1, lines: 1 },
  ],
  total: 5,
  scheme: [
    ['(a)', 'equation', 'B1', ''],
    ['(b)', 'formula', 'B1', ''],
    ['(c)', 'identity', 'B1', ''],
    ['(d)', 'a, b, ab, 2a, 5b, … (any with a letter)', 'B1', ''],
    ['(e)', 'It is only true when x = 3', 'B1', 'Or: e.g. x = 0 gives 5 ≠ 11'],
  ],
  notes: 'Mark scheme on the next slide. In (e), a single counter-example earns the mark.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, [
    'Is  y = mx + c  an expression, equation, formula or identity?',
    'Write down the constant term in  3x² − x − 8.',
    'What does the symbol ≡ mean?',
    'Write in symbols: t is less than 10.',
  ], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) formula  2) −8  3) identically equal to: true for every value  4) t < 10. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 20 minutes' });
  D.qCards(s, [
    'Write expression, equation, formula or identity: (a) 9 − 2k (b) 9 − 2k = 1 (c) C = 2πr (d) 3(k + 2) ≡ 3k + 6',
    'For  6m² − m + 4n − 2  write down: (a) the number of terms (b) the coefficient of m (c) the constant term.',
    'Write down three factors of 12xy.',
    'Draw number lines to show (a) x > −1 (b) x ≤ 4.',
    'Write an identity that includes the expression 2(a + 5).',
    'Ben says  x² = 2x  is an identity because it works when x = 2. Is he right?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) expression, equation (k = 4), formula, identity  2) 4 terms, −1, −2  3) e.g. 2, 3, 4, 6, x, y, xy, 12x…  4) open circle at −1 arrow right; filled circle at 4 arrow left  5) 2(a + 5) ≡ 2a + 10  6) No: x = 3 gives 9 and 6. It is an equation (true only for x = 0 and x = 2).');
}
calc('HW1(b) 9 - 2k = 1 -> k=4', 9 - 2 * 4, 1);
calc('HW6 x=3 differ', 3 ** 2 === 2 * 3 ? 1 : 0, 0);

D.save(path.join(__dirname, 'AQA_8300_A3_AlgebraicVocabulary.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
