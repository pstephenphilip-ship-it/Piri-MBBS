// build_R10to15.js — AQA GCSE Mathematics 8300, R10, R12–R15 Proportion, scale factors and rates of change
// One two-hour lesson aimed at a Higher student. Lesson 3 of 3 on Ratio.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_R10to15.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { graph } = require('./graphs');
const { calc, C } = T;

const DECK = { code: 'R10, R12–R15', title: 'Proportion and rates of change' };
const D = T.init(DECK);
const { frame, notes, txt, rect, math, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const close = (l, a, b, tol = 1e-9) => calc(l, a, b, tol);
const F = (n, d) => ({ n, d });

// ======================= numbers (all checked) =======================
close('DN1', 2.40 / 3 * 5, 4); close('DN3', (7 - 1) / 2, 3); close('DN4a', 4 ** 2, 16); close('DN4b', 4 ** 3, 64);
close('dir unit', 6.80 / 4, 1.70); close('dir 7', 1.70 * 7, 11.90);
close('inv', 6 * 10 / 4, 15); close('hinge1', 5 * 12 / 3, 20); close('hinge1 wrong', 12 * 3 / 5, 7.2);
close('MT1', 10.40 / 8 * 3, 3.90); close('MT2', 4 * 9 / 6, 6); close('MT3', 21 / 3 * 10, 70); close('MT4', 12 * 5 / 4, 15);
close('YT1', 37.50 / 5 * 8, 60); close('YT2', 3 * 8 / 4, 6); close('YT3', 18 / 4 * 7, 31.5); close('YT4', 10 * 6 / 4, 15);
close('k sq', 48 / 16, 3); close('y5', 3 * 25, 75); close('x from y', Math.sqrt(27 / 3), 3);
close('k inv sq', 20 * 9, 180); close('F6', 180 / 36, 5);
close('MTp k', 54 / 27, 2); close('MTp y', 2 * 64, 128); close('YTp k', 10 * Math.sqrt(16), 40); close('YTp P', 40 / Math.sqrt(25), 8);
close('cube area', 6 * 4, 24); close('cube vol', 2 ** 3, 8);
close('bottle k', 18 / 12, 1.5); close('bottle area', 200 * 1.5 ** 2, 450); close('bottle vol', 1350 / 1.5 ** 3, 400);
close('hinge3', 40 * 2 ** 3, 320);
close('MTs1', 12 * (5 / 2) ** 2, 75); close('MTs3', 270 / 1.5 ** 3, 80); close('MTs4', 3 * 50000 / 100000, 1.5);
close('YTs1', 27 * (4 / 3) ** 2, 48); close('YTs3', 400 * 1.5 ** 3, 1350); close('YTs4', 3 * Math.sqrt(25), 15);
close('taxi grad', (18 - 3) / 10, 1.5);
close('chord', (4 ** 2 - 1 ** 2) / (4 - 1), 5); close('tangent', (15 - 3) / (4 - 2), 6); close('tangent check', 6 * 3 - 9, 3 ** 2);
close('hinge4', 6 / 4, 1.5);
close('P1', 1.62 / 6 * 10, 2.70); close('P2', 8 * 15 / 12, 10); close('P3', 50 / 25 * 9, 18); close('P4', 18 * (5 / 3) ** 2, 50);
close('P5', 9 * 4 / 9, 4); close('P6', 160 * (Math.sqrt(81 / 36)) ** 3, 540); close('P7', 150 / 2.5, 60); close('P8', (25 - 4) / 3, 7);
close('ex a', 4 * 15 / 6, 10); close('ex b k', 12 * 4, 48); close('ex b y', 48 / 16, 3); close('ex c', 2 * 1.5 ** 3, 6.75); close('ex d', 600 * 1.5 ** 2, 1350);
close('exit1', 31.50 / 7 * 4, 18); close('exit2', 3 * 8 / 4, 6); close('exit3', 3 * 25, 75); close('exit4', 5 * 27, 135);
close('HW1', 54 / 12 * 5, 22.50); close('HW2', 9 * 4 / 3, 12); close('HW3', 10 / 2 * 5, 25); close('HW4', 6 * 40 / 60, 4);
close('HW5', 80 * (6 / 4) ** 2, 180); close('HW6', (2 * 9 - 0) / 3, 6);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Direct and inverse proportion, proportion equations, scale factors for length, area and volume, and rates of change',
  bullets: ['Part 1: direct and inverse proportion (R10)', 'Part 2: proportion equations and graphs (R13, R14)', 'Part 3: length, area and volume scale factors (R12)', 'Part 4: rates of change, chords and tangents (R14, R15)'],
  notes: 'AQA 8300 R10 (direct and inverse proportion problems, including graphs and algebra), R12 (compare lengths, areas and volumes using ratio; scale factors; similarity), R13 (X inversely proportional to Y means X proportional to 1/Y; construct and interpret proportion equations), R14 (gradient of a straight line as a rate of change; graphs of direct and inverse proportion), R15 (Higher: gradient at a point on a curve as instantaneous rate of change; chords and tangents). Lesson 3 of 3 on Ratio. Pitched for a Higher student. About two hours. Statement codes checked by web search; R13/R14 wording is medium confidence (see SPEC_R10to15.md).',
});

D.objectives({
  tag: 'R10, R12–R15',
  items: [
    'Solve **direct** and **inverse proportion** problems.',
    '**HT:** form and use equations such as **y = kx²** and **y = k ÷ x**.',
    'Use scale factors **k**, **k²** and **k³** for length, area and volume.',
    'Read a **gradient** as a **rate of change**. **HT:** chords and tangents.',
  ],
  keywords: ['direct proportion', 'inverse proportion', 'constant k', 'scale factor', 'rate of change', 'tangent'],
  notes: 'Share the objectives. Calculators allowed for most of this lesson.',
});

D.doNow({
  qs: ['3 pens cost £2.40. Work out the cost of 5 pens.', 'Simplify the ratio  12 : 18.', 'Find the gradient of the line through (0, 1) and (2, 7).', 'Work out  4²  and  4³.'],
  answers: ['£4.00', '2 : 3', '3', '16 and 64'],
  notes: 'Q1 is the unitary method (80p each). Q3 links to Part 4. Q4 links to area and volume scale factors.',
});

D.vocab({
  title: 'Key words', tag: 'R10, R12–R15',
  items: [
    { term: 'Direct proportion', def: 'Both quantities change by the **same multiplier**: double one, double the other.  y = kx' },
    { term: 'Inverse proportion', def: 'One **doubles**, the other **halves**: their **product** stays the same.  y = k ÷ x' },
    { term: 'Scale factor', def: 'Lengths × **k**, areas × **k²**, volumes × **k³** in **similar** shapes.' },
    { term: 'Rate of change', def: 'How fast one quantity changes compared with another: the **gradient** of the graph.' },
  ],
  notes: 'The symbol ∝ means "is proportional to". y ∝ x means y = kx for some constant k.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: direct and inverse proportion', { tag: 'R10 proportion' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, lines, colour, soft, gfn) => {
    rect(s, x, top, cw, 5.45, soft, colour);
    rect(s, x, top, cw, 0.6, colour);
    txt(s, head, x + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
    let y = top + 0.75;
    lines.forEach(([t, sz, b, c]) => { const th = D.textH(t, sz, cw - 0.5, b); txt(s, t, x + 0.25, y, cw - 0.5, th + 0.05, { size: sz, bold: b, color: c || C.ink }); y += th + 0.12; });
    gfn(x + 0.9, y + 0.15);
  };
  col(MX, 'Direct: find one first', [
    ['4 kg of flour costs £6.80. Find the cost of 7 kg.', 19, true],
    ['1 kg: 6.80 ÷ 4 = £1.70', 18], ['7 kg: 1.70 × 7 = **£11.90**', 20, false, C.green],
  ], C.maroon, C.soft, (gx, gy) => {
    const G = graph(D, s, gx, gy, 2.6, 1.85, [0, 4], [0, 4], { gridX: 1, gridY: 1, labSize: 10 });
    G.line(1, 0, C.maroon, 3);
    txt(s, 'y = kx: a straight line\nthrough the origin', gx + 2.8, gy + 0.4, 2.4, 0.9, { size: 15, color: C.maroon });
  });
  col(MX + cw + gap, 'Inverse: find the total first', [
    ['6 workers build a wall in 10 days. How long would 4 workers take?', 19, true],
    ['Total work: 6 × 10 = 60 worker-days', 18], ['4 workers: 60 ÷ 4 = **15 days**', 20, false, C.green],
  ], C.orange, C.orangeSoft, (gx, gy) => {
    const G = graph(D, s, gx, gy, 2.6, 1.85, [0, 4], [0, 4], { gridX: 1, gridY: 1, labSize: 10 });
    G.curve(x => 1 / x, 0.25, 4, C.orange, 3);
    txt(s, 'y = k ÷ x: a curve that\nnever meets the axes', gx + 2.8, gy + 0.4, 2.4, 0.9, { size: 15, color: C.orange });
  });
  notes(s, 'Direct: the ratio y ÷ x stays the same. Inverse: the product x × y stays the same. Fewer workers means MORE days: a quick sense check for inverse proportion. Graphs: direct is a straight line through (0, 0); inverse is a reciprocal curve.');
}

D.hinge({
  title: 'Quick check',
  q: '5 machines fill an order in 12 hours. How long would 3 machines take?',
  options: ['20 hours', '7.2 hours', '10 hours', '36 hours'],
  correct: 0,
  notes: 'Answer A: 5 × 12 = 60 machine-hours, 60 ÷ 3 = 20. B treated it as direct proportion (12 × 3 ÷ 5). C took 2 off. D multiplied 12 by 3.',
});

D.myTurnYourTurn({
  title: 'Direct and inverse proportion', tag: 'Part 1', stepSize: 21, labelW: 4.2, labelSize: 16, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Answer each one:',
    steps: [
      { label: '8 litres cost £10.40. Cost of 3 litres?', text: '**£3.90**' },
      { label: '4 taps fill a tank in 9 min. 6 taps?', text: '**6 min**' },
      { label: 'y ∝ x, y = 21 when x = 3. y when x = 10?', text: '**70**' },
      { label: '5 people take 12 days. People for 4 days?', text: '**15**' },
    ],
  },
  yours: {
    q: 'Answer each one:',
    steps: [
      { label: '5 tickets cost £37.50. Cost of 8 tickets?', text: '**£60**' },
      { label: '3 pumps empty a pond in 8 h. 4 pumps?', text: '**6 h**' },
      { label: 'y ∝ x, y = 18 when x = 4. y when x = 7?', text: '**31.5**' },
      { label: '6 people take 10 days. People for 4 days?', text: '**15**' },
    ],
  },
  notes: 'Mine: 10.40 ÷ 8 = 1.30, × 3 = 3.90. 36 tap-minutes ÷ 6 = 6. k = 7, so y = 70. 60 person-days ÷ 4 = 15. Yours: 7.50 × 8 = 60. 24 ÷ 4 = 6. k = 4.5, so 31.5. 60 ÷ 4 = 15.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: proportion equations', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, stepsList, colour, soft, q) => {
    rect(s, x, top, cw, 5.45, soft, colour);
    rect(s, x, top, cw, 0.6, colour);
    txt(s, head, x + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
    const qh = D.textH(q, 19, cw - 0.5, true);
    txt(s, q, x + 0.25, top + 0.75, cw - 0.5, qh + 0.05, { size: 19, bold: true });
    D.steps(s, stepsList, x + 0.25, top + 0.95 + qh, cw - 0.5, { size: 20, labelW: 1.7, labelSize: 16 });
  };
  col(MX, 'y is directly proportional to x²', [
    { label: 'Write', text: 'y = kx²' },
    { label: 'Substitute', text: '48 = k × 4²  so  48 = 16k' },
    { label: 'Find k', text: 'k = 3,  so  **y = 3x²**' },
    { label: 'Use', text: 'x = 5:  y = 3 × 25 = **75**' },
  ], C.maroon, C.soft, 'y = 48 when x = 4. Find y when x = 5.');
  col(MX + cw + gap, 'F is inversely proportional to d²', [
    { label: 'Write', math: ['F = ', F('k', 'd²')] },
    { label: 'Substitute', math: ['20 = ', F('k', '9')] },
    { label: 'Find k', text: 'k = 180' },
    { label: 'Use', math: ['F = ', F('180', '36'), ' = 5'], bold: true, color: C.green },
  ], C.orange, C.orangeSoft, 'F = 20 when d = 3. Find F when d = 6.');
  notes(s, 'Four steps every time: write the equation with k, substitute the pair you are given, find k, then use the full formula. "Inversely proportional to Y" means "proportional to 1 ÷ Y". Doubling d makes F four times smaller (2² = 4), which checks: 20 ÷ 4 = 5. Finding x from y = 27 in the first example: 27 = 3x², x = 3.');
}

{
  const s = frame('Recognising proportion graphs', { tag: 'R13, R14 graphs' });
  const cards = [
    ['y = kx', x => x, 'straight line through (0, 0)', C.maroon],
    ['y = kx²', x => x * x / 4, 'curve through (0, 0), getting steeper', C.blue],
    ['y = k ÷ x', x => 1 / x, 'curve; x × y stays the same', C.orange],
    ['y = k ÷ x²', x => 1 / (x * x), 'falls faster than k ÷ x', C.green],
  ];
  const gap = 0.3, cw = (W - 2 * MX - 3 * gap) / 4;
  cards.forEach(([eq, fn, desc, col], i) => {
    const x = MX + i * (cw + gap);
    rect(s, x, 1.4, cw, 5.45, C.white, C.line);
    rect(s, x, 1.4, cw, 0.7, col);
    txt(s, eq, x, 1.4, cw, 0.7, { size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
    const G = graph(D, s, x + 0.45, 2.45, cw - 0.75, 2.6, [0, 4], [0, 4], { gridX: 1, gridY: 1, labSize: 10 });
    G.curve(fn, 0.05, 4, col, 3, 120);
    txt(s, desc, x + 0.2, 5.55, cw - 0.4, 1.1, { size: 17, align: 'center' });
  });
  notes(s, 'Students should be able to match each type of proportion to its graph shape. Direct proportion always passes through the origin. The inverse graphs never touch either axis. k is positive in all of these.');
}

D.hinge({
  title: 'Quick check',
  q: 'y is directly proportional to x². When x doubles, what happens to y?',
  options: ['× 4', '× 2', '× 8', '÷ 2'],
  correct: 0,
  notes: 'Answer A: (2x)² = 4x². B is direct proportion to x. C is x³. D is inverse proportion.',
});

D.myTurnYourTurn({
  title: 'Proportion equations', tag: 'HT  Part 2', stepSize: 20, labelW: 1.8, labelSize: 16,
  mine: {
    q: 'y ∝ x³.  y = 54 when x = 3.  Find y when x = 4.',
    steps: [
      { label: 'Write', text: 'y = kx³' },
      { label: 'Substitute', text: '54 = k × 27' },
      { label: 'Find k', text: 'k = 2,  y = 2x³' },
      { label: 'Use', text: 'y = 2 × 64 = **128**' },
    ],
  },
  yours: {
    q: 'P is inversely proportional to √Q.  P = 10 when Q = 16.  Find P when Q = 25.',
    steps: [
      { label: 'Write', math: ['P = ', F('k', '√Q')] },
      { label: 'Substitute', math: ['10 = ', F('k', '4')] },
      { label: 'Find k', text: 'k = 40' },
      { label: 'Use', math: ['P = ', F('40', '5'), ' = 8'], bold: true },
    ],
  },
  notes: 'Yours: √16 = 4, so k = 40. √25 = 5, so P = 8. Common error: using 16 instead of √16.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: length, area and volume scale factors', { tag: 'R12 scale factors' });
  // two cubes
  const cube = (x, y, a, col) => {
    rect(s, x, y, a, a, col, C.ink, { lw: 1.5 });
    const d = a * 0.35;
    s.addShape(D.SH.line, { x, y: y - d, w: d, h: d, flipV: true, line: { color: C.ink, width: 1.5 } });
    s.addShape(D.SH.line, { x: x + a, y: y - d, w: d, h: d, flipV: true, line: { color: C.ink, width: 1.5 } });
    D.hline(s, x + d, y - d, x + a + d, C.ink, 1.5);
    D.vline(s, x + a + d, y - d, y + a - d, C.ink, 1.5);
    s.addShape(D.SH.line, { x: x + a, y: y + a - d, w: d, h: d, flipV: true, line: { color: C.ink, width: 1.5 } });
  };
  cube(MX + 0.5, 3.2, 1.0, C.soft); txt(s, '1 cm', MX + 0.5, 4.25, 1.0, 0.35, { size: 16, align: 'center' });
  cube(MX + 2.6, 2.2, 2.0, C.orangeSoft); txt(s, '2 cm', MX + 2.6, 4.25, 2.0, 0.35, { size: 16, align: 'center' });
  const tx = MX + 5.6, tw = W - MX - tx;
  const rows = [['', 'Small', 'Large', 'Factor'], ['Length', '1 cm', '2 cm', '× 2  (k)'], ['Surface area', '6 cm²', '24 cm²', '× 4  (k²)'], ['Volume', '1 cm³', '8 cm³', '× 8  (k³)']];
  const cwid = [2.3, 1.5, 1.5, tw - 5.3];
  rows.forEach((r, i) => {
    let x = tx;
    r.forEach((c, j) => {
      rect(s, x, 1.5 + i * 0.75, cwid[j], 0.75, i === 0 ? C.maroon : (i % 2 ? C.soft : C.white), C.line);
      txt(s, c, x + 0.15, 1.5 + i * 0.75, cwid[j] - 0.3, 0.75, { size: 19, bold: i === 0 || j === 3, color: i === 0 ? C.white : (j === 3 ? C.maroon : C.ink), valign: 'middle' });
      x += cwid[j];
    });
  });
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.greyLight);
  txt(s, 'If lengths are in the ratio  **a : b**,  areas are in the ratio  **a² : b²**  and volumes are in the ratio  **a³ : b³**.', MX + 0.3, 5.1, W - 2 * MX - 0.6, 0.8, { size: 21 });
  txt(s, 'Working backwards: square root an area ratio, cube root a volume ratio, to get the length ratio.', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.75, { size: 19, color: C.grey });
  notes(s, 'This only works for SIMILAR shapes: every length scaled by the same factor. Map scales (1 : 50 000) are the length version of the same idea. Area and volume of similar shapes are Higher-tier in AQA G19; the ratio comparison sits in R12.');
}

{
  const s = frame('Similar solids problem', HT);
  txt(s, 'Two **similar** bottles have heights **12 cm** and **18 cm**.', MX, 1.4, W - 2 * MX, 0.55, { size: 22 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.15;
  const col = (x, head, stepsList, colour, soft) => {
    rect(s, x, top, cw, 4.7, soft, colour);
    rect(s, x, top, cw, 0.6, colour);
    txt(s, head, x + 0.25, top, cw - 0.5, 0.6, { size: 19, bold: true, color: C.white, valign: 'middle' });
    D.steps(s, stepsList, x + 0.25, top + 0.85, cw - 0.5, { size: 20, labelW: 1.9, labelSize: 16 });
  };
  col(MX, 'Surface area: small to large', [
    { label: 'Given', text: 'Small surface area 200 cm²' },
    { label: 'Length', text: 'k = 18 ÷ 12 = 1.5' },
    { label: 'Area', text: 'k² = 1.5² = 2.25' },
    { label: 'Answer', text: '200 × 2.25 = **450 cm²**', color: C.green },
  ], C.maroon, C.soft);
  col(MX + cw + gap, 'Volume: large to small', [
    { label: 'Given', text: 'Large volume 1350 cm³' },
    { label: 'Length', text: 'k = 1.5' },
    { label: 'Volume', text: 'k³ = 1.5³ = 3.375' },
    { label: 'Answer', text: '1350 ÷ 3.375 = **400 cm³**', color: C.green },
  ], C.orange, C.orangeSoft);
  notes(s, 'Going from large to small: divide by the factor (or use k = 12 ÷ 18 = 2/3). Check: 400 × 3.375 = 1350. Common error: multiplying the volume by 1.5 only.');
}

D.hinge({
  title: 'Quick check',
  q: 'Two similar cylinders have heights 3 cm and 6 cm. The small one has volume 40 cm³. What is the volume of the large one?',
  options: ['320 cm³', '80 cm³', '160 cm³', '120 cm³'],
  correct: 0,
  notes: 'Answer A: k = 2, k³ = 8, 40 × 8 = 320. B used k. C used k². D added 80 (3 × 40).',
});

D.myTurnYourTurn({
  title: 'Scale factors', tag: 'Part 3', stepSize: 21, labelW: 4.2, labelSize: 16, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Similar shapes or solids:',
    steps: [
      { label: 'Lengths 2 : 5, small area 12 cm². Large area?', text: '**75 cm²**' },
      { label: 'Volumes 8 : 125. Ratio of lengths?', text: '**2 : 5**' },
      { label: 'Cone heights 4 and 6, large volume 270. Small?', text: '**80**' },
      { label: 'Map 1 : 50 000. 3 cm on map is?', text: '**1.5 km**' },
    ],
  },
  yours: {
    q: 'Similar shapes or solids:',
    steps: [
      { label: 'Lengths 3 : 4, small area 27 cm². Large area?', text: '**48 cm²**' },
      { label: 'Areas 9 : 16. Ratio of lengths?', text: '**3 : 4**' },
      { label: 'Jug heights 10 and 15, small volume 400. Large?', text: '**1350**' },
      { label: 'Areas 1 : 25, small length 3 cm. Large length?', text: '**15 cm**' },
    ],
  },
  notes: 'Mine: 12 × (5/2)² = 75. ∛8 : ∛125 = 2 : 5. 270 ÷ 1.5³ = 80. 150 000 cm = 1.5 km. Yours: 27 × 16/9 = 48. √9 : √16 = 3 : 4. 400 × 3.375 = 1350. √25 = 5, 3 × 5 = 15.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: gradient as a rate of change', { tag: 'R14 rates of change' });
  const G = graph(D, s, MX + 0.8, 1.75, 5.8, 4.4, [0, 10], [0, 20], { gridX: 1, gridY: 2, labX: 2, labY: 4, axesAtEdge: true, xTitle: 'Distance (km)', yTitle: 'Taxi fare (£)' });
  G.seg(0, 3, 10, 18, C.maroon, 3);
  G.pt(0, 3, C.maroon, '£3 fixed charge', 0.15, 0.05);
  G.seg(2, 6, 6, 6, C.orange, 2, 'dash'); G.seg(6, 6, 6, 12, C.orange, 2, 'dash');
  txt(s, '4 km', G.px(4) - 0.4, G.py(6) + 0.05, 0.8, 0.3, { size: 14, bold: true, color: C.orange, align: 'center' });
  txt(s, '£6', G.px(6) + 0.08, G.py(9) - 0.15, 0.6, 0.3, { size: 14, bold: true, color: C.orange });
  const bx = MX + 7.3, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.45, C.soft, C.line);
  D.steps(s, [
    { text: '**Gradient = change in y ÷ change in x**' },
    { text: '6 ÷ 4 = 1.5' },
    { text: 'Units: £ per km, so the fare rises by **£1.50 per km**.', color: C.green },
    { text: 'The y-intercept (£3) is the fixed charge.' },
    { text: 'On a distance–time graph the gradient is the **speed**; on a velocity–time graph it is the **acceleration**.', color: C.grey },
  ], bx + 0.3, 1.65, bw - 0.6, { size: 20 });
  notes(s, 'Always give the units of a rate: y-units per x-unit. The graph is not direct proportion because it does not pass through the origin. Link to A15 (real-life graphs).');
}

{
  const s = frame('Average and instantaneous rates of change', HT);
  const G = graph(D, s, MX + 0.8, 1.75, 5.6, 4.4, [0, 5], [0, 25], { gridX: 1, gridY: 5, labX: 1, labY: 5, axesAtEdge: true, xTitle: 'Time (s)', yTitle: 'Distance (m),  d = t²' });
  G.curve(t => t * t, 0, 5, C.maroon, 3);
  G.seg(1, 1, 4, 16, C.blue, 2.5);
  G.seg(1.5, 0, 4.5, 18, C.orange, 2.5);
  G.pt(1, 1, C.blue); G.pt(4, 16, C.blue, 'chord', -0.9, -0.45);
  G.pt(3, 9, C.orange, 'tangent at t = 3', 0.15, 0.05);
  const bx = MX + 7.1, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 2.55, C.blueSoft, C.blue);
  txt(s, '**Average rate** = gradient of a **chord**', bx + 0.25, 1.5, bw - 0.5, 0.5, { size: 18, color: C.blue });
  txt(s, 'From t = 1 to t = 4:\n(16 − 1) ÷ (4 − 1) = **5 m/s** average speed', bx + 0.25, 2.1, bw - 0.5, 1.7, { size: 19 });
  rect(s, bx, 4.15, bw, 2.7, C.orangeSoft, C.orange);
  txt(s, '**Instantaneous rate** = gradient of a **tangent**', bx + 0.25, 4.25, bw - 0.5, 0.75, { size: 18, color: C.orange });
  txt(s, 'Draw the tangent at t = 3, pick two points on it:\n(2, 3) and (4, 15):  12 ÷ 2 = **6 m/s**', bx + 0.25, 5.1, bw - 0.5, 1.7, { size: 18 });
  notes(s, 'A tangent touches the curve at one point and has the same steepness there. In exams the tangent is drawn by eye, so a range of answers is accepted (e.g. 5 to 7). Use a long tangent and two far-apart points for accuracy. R15 is Higher only.');
}

D.hinge({
  title: 'Quick check',
  q: 'A straight-line graph of cost (£) against mass (kg) goes through (0, 0) and (4, 6). What is the rate?',
  options: ['£1.50 per kg', '£0.67 per kg', '£6 per kg', '£24 per kg'],
  correct: 0,
  notes: 'Answer A: 6 ÷ 4. B is 4 ÷ 6 (upside down). C read the y-value only. D multiplied.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['6 pencils cost £1.62. Find the cost of 10 pencils.', '£2.70'], ['8 workers build a wall in 15 hours. How long would 12 workers take?', '10 hours'],
    ['HT  y ∝ x².  y = 50 when x = 5.  Find y when x = 3.', '18'], ['Two similar triangles have lengths in the ratio 3 : 5. The small area is 18 cm². Find the large area.', '50 cm²'],
    ['HT  p is inversely proportional to q².  p = 9 when q = 2.  Find p when q = 3.', '4'], ['Two similar solids have surface areas 36 cm² and 81 cm². The small volume is 160 cm³. Find the large volume.', '540 cm³'],
    ['A distance–time graph is a straight line from (0, 0) to (2.5 hours, 150 km). Find the speed.', '60 km/h'], ['HT  d = t².  Find the average rate of change of d between t = 2 and t = 5.', '7'],
  ];
  for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 30, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 22, start: k });
    notes(s, 'Answers: 1) 27p each, × 10 = £2.70  2) 120 ÷ 12 = 10  3) k = 2, y = 2 × 9 = 18  4) 18 × (5/3)² = 50  5) k = 36, p = 36 ÷ 9 = 4  6) lengths √36 : √81 = 6 : 9 = 2 : 3, volume × 3.375, 160 × 3.375 = 540  7) 150 ÷ 2.5 = 60  8) (25 − 4) ÷ 3 = 7.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: '4 machines take 15 hours to complete a job. How long would 6 machines take?', m: 2, lines: 1 },
    { l: 'b', q: 'y is inversely proportional to x².  y = 12 when x = 2.  Find a formula for y in terms of x. Use it to work out y when x = 4.', m: 4, lines: 1 },
    { l: 'c', q: 'Two similar containers have heights 20 cm and 30 cm. The small container holds 2 litres. How much does the large container hold?', m: 2, lines: 1 },
    { l: 'd', q: 'The surface area of the small container is 600 cm². Work out the surface area of the large container.', m: 2, lines: 1 },
  ],
  total: 10,
  scheme: [
    ['(a)', '4 × 15 = 60;  60 ÷ 6 = 10 hours', 'M1 A1', 'M1 for 60 seen'],
    ['(b)', 'y = 48 ÷ x²;  x = 4:  y = 3', 'M1 M1 A1 B1ft', 'M1 y = k ÷ x²; M1 k = 48; B1ft y from their k'],
    ['(c)', 'k = 1.5;  2 × 1.5³ = 6.75 litres', 'M1 A1', 'M1 for 1.5³ or 3.375'],
    ['(d)', '600 × 1.5² = 1350 cm²', 'M1 A1', 'M1 for 1.5² or 2.25'],
  ],
  notes: 'Mark scheme on the next slide. (b) is Higher only.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['7 tickets cost £31.50. Find the cost of 4 tickets.', '3 people paint a fence in 8 hours. How long would 4 people take?', 'y ∝ x².  y = 12 when x = 2.  Find y when x = 5.', 'Similar solids have lengths in the ratio 1 : 3. The small volume is 5 cm³. Find the large volume.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) £4.50 each, £18  2) 24 ÷ 4 = 6 hours  3) k = 3, y = 75  4) 5 × 27 = 135 cm³. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    '12 litres of paint cost £54. Find the cost of 5 litres.',
    '9 pumps empty a tank in 4 hours. How many pumps are needed to empty it in 3 hours?',
    'y ∝ √x.  y = 10 when x = 4.  Find y when x = 25.',
    'HT  t is inversely proportional to v.  t = 6 when v = 40.  Find t when v = 60.',
    'Two similar cuboids have volumes 64 cm³ and 216 cm³. The small surface area is 80 cm². Find the large surface area.',
    'HT  d = 2t².  Find the average rate of change of d between t = 0 and t = 3.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) £4.50 a litre, £22.50  2) 36 pump-hours ÷ 3 = 12  3) k = 5, y = 5 × 5 = 25  4) k = 240, t = 4  5) lengths ∛64 : ∛216 = 4 : 6 = 2 : 3, areas × 9/4, 80 × 2.25 = 180 cm²  6) (18 − 0) ÷ 3 = 6.');
}

D.save(path.join(__dirname, 'AQA_8300_R10-R12-R15_ProportionAndRatesOfChange.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
