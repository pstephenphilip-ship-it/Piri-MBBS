// build_N4to5.js — AQA GCSE Mathematics 8300, N4–N5 Factors, multiples, primes and counting
// One two-hour lesson, both tiers (product rule tagged HT).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_N4to5.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'N4–N5', title: 'Primes, factors and multiples' };
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

const gcd = (a, b) => (b ? gcd(b, a % b) : a), lcm = (a, b) => a / gcd(a, b) * b;
const isPrime = n => n > 1 && [...Array(Math.floor(Math.sqrt(n)) + 1).keys()].slice(2).every(d => n % d);
const factors = n => [...Array(n + 1).keys()].filter(d => d && n % d === 0);
const pf = n => { const out = []; for (let d = 2; n > 1; d++) while (n % d === 0) { out.push(d); n /= d; } return out; };
const idx = n => Object.entries(pf(n).reduce((m, p) => (m[p] = (m[p] || 0) + 1, m), {})).map(([p, k]) => k > 1 ? `${p}${'⁰¹²³⁴⁵⁶⁷⁸⁹'[k]}` : p).join(' × ');

// ======================= numbers (all checked) =======================
calc('DN1', factors(18).join() === '1,2,3,6,9,18' ? 1 : 0, 1); calc('DN3', isPrime(51) ? 1 : 0, 0); calc('DN4', 2 * 2 * 3 * 5, 60);
calc('pairs 36', factors(36).length, 9);
calc('hinge1', [51, 57, 59, 91].filter(isPrime).join(), 59);
calc('60', idx(60) === '2² × 3 × 5' ? 1 : 0, 1); calc('72', idx(72) === '2³ × 3²' ? 1 : 0, 1);
calc('HCF 60 72', gcd(60, 72), 12); calc('LCM 60 72', lcm(60, 72), 360); calc('product', 60 * 72, 12 * 360);
calc('hinge2', lcm(6, 8), 24);
calc('buses', lcm(12, 18), 36); calc('packs', gcd(24, 40), 8);
calc('MT 84', idx(84) === '2² × 3 × 7' ? 1 : 0, 1); calc('MT 90', idx(90) === '2 × 3² × 5' ? 1 : 0, 1);
calc('MT HCF', gcd(84, 90), 6); calc('MT LCM', lcm(84, 90), 1260);
calc('YT 150', idx(150) === '2 × 3 × 5²' ? 1 : 0, 1); calc('YT 105', idx(105) === '3 × 5 × 7' ? 1 : 0, 1);
calc('YT HCF', gcd(150, 105), 15); calc('YT LCM', lcm(150, 105), 1050);
calc('menu', 3 * 2, 6); calc('two-digit', [12, 13, 21, 23, 31, 32].length, 3 * 2);
calc('PIN', 10 ** 4, 10000); calc('PIN no repeat', 10 * 9 * 8 * 7, 5040); calc('outfits', 3 * 4 * 2, 24);
calc('P1', factors(48).join() === '1,2,3,4,6,8,12,16,24,48' ? 1 : 0, 1); calc('P2', idx(120) === '2³ × 3 × 5' ? 1 : 0, 1);
calc('P3', gcd(24, 36), 12); calc('P4', lcm(8, 12), 24); calc('P5', lcm(15, 20), 60); calc('P6', 4 * 3, 12); calc('P8', 9 * 8 * 7, 504);
calc('exam a', idx(90) === '2 × 3² × 5' ? 1 : 0, 1); calc('exam b', gcd(90, 84), 6); calc('exam c', lcm(90, 84), 1260); calc('exam d', lcm(6, 15), 30); calc('exam e', 26 * 26 * 1000, 676000);
calc('exit', gcd(12, 18), 6); calc('exit2', 2 ** 3 * 5, 40); calc('exit3', isPrime(21) ? 1 : 0, 0);
calc('HW2', idx(252) === '2² × 3² × 7' ? 1 : 0, 1); calc('HW3 HCF', gcd(252, 360), 36); calc('HW3 LCM', lcm(252, 360), 2520);
calc('HW4', gcd(48, 60), 12); calc('HW5', 5 * 3, 15); calc('HW6', 6 * 6 * 3, 108);

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Factors, multiples, primes, HCF and LCM, and counting',
  bullets: ['Part 1: factors, multiples and primes (N4)', 'Part 2: prime factors, HCF and LCM (N4)', 'Part 3: listing and counting (N5)'],
  notes: 'AQA 8300 N4: use the concepts and vocabulary of prime numbers, factors (divisors), multiples, common factors, common multiples, highest common factor, lowest common multiple, prime factorisation including product notation and the unique factorisation theorem. N5: apply systematic listing strategies, including use of the product rule for counting (Higher). About two hours.',
});

D.objectives({
  tag: 'N4–N5',
  items: [
    'Find **factors**, **multiples** and **primes**.',
    'Write a number as a **product of primes**, and find the **HCF** and **LCM**.',
    '**List** outcomes systematically.  **HT:** use the **product rule** for counting.',
  ],
  keywords: ['factor', 'multiple', 'prime', 'HCF', 'LCM', 'index form'],
  notes: 'Share the objectives.',
});

D.doNow({
  qs: ['List all the factors of 18.', 'Write the first five multiples of 7.', 'Is 51 a prime number?', 'Work out  2 × 2 × 3 × 5'],
  answers: ['1, 2, 3, 6, 9, 18', '7, 14, 21, 28, 35', 'No: 51 = 3 × 17', '60'],
  notes: 'Q3 is a common trap: 51 looks prime but is 3 × 17 (digit sum 6, so divisible by 3).',
});

D.vocab({
  title: 'Key words', tag: 'N4–N5',
  items: [
    { term: 'Factor / multiple', def: 'A **factor** divides exactly into a number. A **multiple** is in its times table.' },
    { term: 'Prime number', def: 'Has **exactly two** factors: 1 and itself. **1 is not prime.**' },
    { term: 'HCF', def: '**Highest common factor**: the biggest number that divides into both.' },
    { term: 'LCM', def: '**Lowest common multiple**: the smallest number in both times tables.' },
  ],
  notes: 'Index form: 2 × 2 × 2 × 3 = 2³ × 3.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: factors and multiples', { tag: 'N4 factors' });
  txt(s, 'Factors of **36** in pairs:', MX, 1.35, 6, 0.5, { size: 22 });
  const pairs = [[1, 36], [2, 18], [3, 12], [4, 9], [6, 6]];
  pairs.forEach(([a, b], i) => {
    const y = 2.0 + i * 0.78;
    rect(s, MX, y, 5.6, 0.66, i % 2 ? C.white : C.soft, C.line);
    txt(s, `${a}  ×  ${b}`, MX + 0.3, y, 5.0, 0.66, { size: 26, bold: true, valign: 'middle' });
  });
  txt(s, 'Stop when the pair repeats. 6 × 6 gives one factor, so 36 has **9** factors.', MX, 6.0, 6.0, 0.8, { size: 18, color: C.grey });
  const bx = 7.0, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 2.4, C.greyLight);
  txt(s, 'Factors of 36', bx + 0.3, 1.5, bw - 0.6, 0.45, { size: 20, bold: true, color: C.maroon });
  txt(s, '1, 2, 3, 4, 6, 9, 12, 18, 36', bx + 0.3, 2.05, bw - 0.6, 0.6, { size: 24, bold: true });
  txt(s, 'Working in pairs means you never miss one.', bx + 0.3, 2.85, bw - 0.6, 0.8, { size: 18 });
  rect(s, bx, 4.05, bw, 2.75, C.soft, C.line);
  txt(s, 'Multiples of 6', bx + 0.3, 4.15, bw - 0.6, 0.45, { size: 20, bold: true, color: C.maroon });
  txt(s, '6, 12, 18, 24, 30, 36, …', bx + 0.3, 4.7, bw - 0.6, 0.6, { size: 24, bold: true });
  txt(s, 'A number has a **limited** number of factors but **infinitely many** multiples.', bx + 0.3, 5.45, bw - 0.6, 1.2, { size: 18 });
  notes(s, 'Factor pairs: 1 × 36, 2 × 18, 3 × 12, 4 × 9, 6 × 6. Square numbers have an odd number of factors.');
}

{
  const s = frame('Prime numbers', { tag: 'N4 primes' });
  const cs = 0.62, x0 = MX, y0 = 1.45;
  for (let n = 1; n <= 50; n++) {
    const c = (n - 1) % 10, r = Math.floor((n - 1) / 10), p = isPrime(n);
    rect(s, x0 + c * cs, y0 + r * cs, cs - 0.04, cs - 0.04, p ? C.accent : (n === 1 ? C.orangeSoft : C.white), p ? C.accent : C.line);
    txt(s, String(n), x0 + c * cs, y0 + r * cs, cs - 0.04, cs - 0.04, { size: 17, bold: p, color: p ? C.white : C.ink, align: 'center', valign: 'middle' });
  }
  txt(s, 'The 15 primes up to 50 are shaded.', x0, y0 + 5 * cs + 0.15, 6.3, 0.4, { size: 16, color: C.grey });
  const bx = 7.2, bw = W - MX - bx;
  rect(s, bx, 1.45, bw, 5.35, C.greyLight);
  txt(s, 'Facts to remember', bx + 0.3, 1.55, bw - 0.6, 0.5, { size: 21, bold: true, color: C.maroon });
  txt(s, '• **1 is not prime**: it has only one factor.', bx + 0.3, 2.2, bw - 0.6, 0.8, { size: 19 });
  txt(s, '• **2** is the only even prime.', bx + 0.3, 3.0, bw - 0.6, 0.6, { size: 19 });
  txt(s, '• To test a number, try dividing by primes up to its square root.', bx + 0.3, 3.65, bw - 0.6, 1.0, { size: 19 });
  txt(s, '• 51 = 3 × 17,  91 = 7 × 13:  **not** prime.', bx + 0.3, 4.75, bw - 0.6, 0.9, { size: 19 });
  notes(s, 'Primes to 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.');
}
calc('primes to 50', [...Array(51).keys()].filter(isPrime).length, 15);

D.hinge({
  title: 'Quick check',
  q: 'Which of these is a prime number?',
  options: ['51', '57', '59', '91'],
  correct: 2,
  notes: 'Answer C. 51 = 3 × 17, 57 = 3 × 19, 91 = 7 × 13.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: prime factor trees', { tag: 'N4 prime factors' });
  const node = (x, y, t, prime) => {
    if (prime) circle(s, x, y, 0.7, C.greenSoft, C.green, 2.5);
    txt(s, t, x - 0.4, y - 0.3, 0.8, 0.6, { size: 26, bold: true, color: prime ? C.green : C.ink, align: 'center', valign: 'middle' });
  };
  const edge = (x1, y1, x2, y2) => s.addShape(D.SH.line, { x: Math.min(x1, x2), y: y1 + 0.3, w: Math.abs(x2 - x1), h: y2 - y1 - 0.6, flipH: x2 < x1, line: { color: '6E6670', width: 2 } });
  const cx = MX + 2.8;
  node(cx, 1.9, '60');
  edge(cx, 1.9, cx - 1.2, 3.2); edge(cx, 1.9, cx + 1.2, 3.2);
  node(cx - 1.2, 3.2, '6'); node(cx + 1.2, 3.2, '10');
  edge(cx - 1.2, 3.2, cx - 1.9, 4.5); edge(cx - 1.2, 3.2, cx - 0.5, 4.5); edge(cx + 1.2, 3.2, cx + 0.5, 4.5); edge(cx + 1.2, 3.2, cx + 1.9, 4.5);
  node(cx - 1.9, 4.5, '2', true); node(cx - 0.5, 4.5, '3', true); node(cx + 0.5, 4.5, '2', true); node(cx + 1.9, 4.5, '5', true);
  rect(s, MX, 5.35, 5.8, 1.45, C.greenSoft, C.green, { lw: 2 });
  txt(s, '60 = 2 × 2 × 3 × 5', MX, 5.4, 5.8, 0.65, { size: 24, bold: true, color: C.green, align: 'center', valign: 'middle' });
  txt(s, '= 2² × 3 × 5   (index form)', MX, 6.05, 5.8, 0.65, { size: 22, color: C.green, align: 'center', valign: 'middle' });
  const bx = 7.0, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 5.4, C.greyLight);
  txt(s, 'Or divide by primes: 72', bx + 0.3, 1.5, bw - 0.6, 0.5, { size: 20, bold: true, color: C.maroon });
  [['2', '72'], ['2', '36'], ['2', '18'], ['3', '9'], ['3', '3'], ['', '1']].forEach(([d, v], i) => {
    const y = 2.1 + i * 0.6;
    txt(s, d, bx + 0.6, y, 0.6, 0.55, { size: 22, bold: true, color: C.orange, align: 'right', valign: 'middle' });
    if (d) D.vline(s, bx + 1.35, y + 0.05, y + 0.55, '6E6670', 1.5);
    txt(s, v, bx + 1.5, y, 1.2, 0.55, { size: 22, valign: 'middle' });
  });
  txt(s, '72 = 2³ × 3²', bx + 3.0, 3.4, bw - 3.2, 0.7, { size: 26, bold: true, color: C.green });
  txt(s, 'Every number has exactly **one** prime factorisation.', bx + 0.3, 5.85, bw - 0.6, 0.8, { size: 17 });
  notes(s, 'Ring the primes at the ends of the branches. Any starting split works (60 = 4 × 15 gives the same primes): the unique factorisation theorem. Write the answer as a product, in index form.');
}

{
  const s = frame('HCF and LCM with a Venn diagram', { tag: 'N4 HCF and LCM' });
  txt(s, '**60 = 2 × 2 × 3 × 5**        **72 = 2 × 2 × 2 × 3 × 3**', MX, 1.35, W - 2 * MX, 0.5, { size: 22 });
  const vy = 2.05, vh = 3.3, vw = 4.4, lx = MX + 0.4, rx = MX + 3.1;
  s.addShape(D.SH.ellipse, { x: lx, y: vy, w: vw, h: vh, line: { color: C.maroon, width: 3 } });
  s.addShape(D.SH.ellipse, { x: rx, y: vy, w: vw, h: vh, line: { color: C.orange, width: 3 } });
  txt(s, '60', lx + 0.4, vy - 0.05, 1, 0.45, { size: 20, bold: true, color: C.maroon });
  txt(s, '72', rx + vw - 1.2, vy - 0.05, 1, 0.45, { size: 20, bold: true, color: C.orange });
  txt(s, '5', lx + 0.6, vy + 1.3, 1.6, 0.7, { size: 30, bold: true, align: 'center', valign: 'middle' });
  txt(s, '2  2\n3', rx + 0.1, vy + 0.95, 1.6, 1.4, { size: 30, bold: true, color: C.green, align: 'center', valign: 'middle' });
  txt(s, '2\n3', rx + vw - 1.9, vy + 0.95, 1.4, 1.4, { size: 30, bold: true, align: 'center', valign: 'middle' });
  const bx = 8.4, bw = W - MX - bx;
  rect(s, bx, 1.95, bw, 1.9, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'HCF = the middle', bx + 0.3, 2.05, bw - 0.6, 0.45, { size: 19, bold: true, color: C.green });
  txt(s, '2 × 2 × 3 = **12**', bx + 0.3, 2.6, bw - 0.6, 0.6, { size: 26 });
  rect(s, bx, 4.05, bw, 1.9, C.soft, C.maroon, { lw: 2 });
  txt(s, 'LCM = everything', bx + 0.3, 4.15, bw - 0.6, 0.45, { size: 19, bold: true, color: C.maroon });
  txt(s, '5 × 2 × 2 × 3 × 2 × 3 = **360**', bx + 0.3, 4.7, bw - 0.6, 0.6, { size: 22 });
  rect(s, MX, 5.95, W - 2 * MX, 0.85, C.greyLight);
  txt(s, 'Put **shared** primes in the middle. Check: HCF × LCM = 12 × 360 = 4320 = 60 × 72 ✓', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.85, { size: 20, valign: 'middle' });
  notes(s, 'For small numbers, listing works: multiples of 6 and 8 meet first at 24. For larger numbers, prime factors and a Venn diagram are quicker and safer.');
}

D.hinge({
  title: 'Quick check',
  q: 'What is the lowest common multiple of 6 and 8?',
  options: ['24', '48', '2', '14'],
  correct: 0,
  notes: 'Answer A. B is a common multiple but not the lowest (6 × 8). C is the HCF. D added them.',
});

{
  const s = frame('HCF or LCM? Problems in context', { tag: 'N4 HCF and LCM' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, q, lines, ans, colour, soft) => {
    rect(s, x, top, cw, 5.4, soft, colour);
    rect(s, x, top, cw, 0.7, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.7, { size: 22, bold: true, color: C.white, valign: 'middle' });
    txt(s, q, x + 0.3, top + 0.85, cw - 0.6, 1.5, { size: 19 });
    lines.forEach((l, i) => txt(s, l, x + 0.3, top + 2.45 + i * 0.6, cw - 0.6, 0.55, { size: 20 }));
    txt(s, ans, x + 0.3, top + 4.35, cw - 0.6, 0.7, { size: 24, bold: true, color: colour });
  };
  col(MX, 'LCM: "when together again?"', 'Bus A leaves every 12 minutes, bus B every 18 minutes. Both leave at 9:00. When do they next leave together?', ['12: 12, 24, 36, 48…', '18: 18, 36, 54…', 'LCM = 36'], 'At 9:36', C.maroon, C.soft);
  col(MX + cw + gap, 'HCF: "share into equal groups"', 'There are 24 pens and 40 pencils. Make identical packs with nothing left over. What is the greatest number of packs?', ['24: 1, 2, 3, 4, 6, 8, 12, 24', '40: 1, 2, 4, 5, 8, 10, 20, 40', 'HCF = 8'], '8 packs (3 pens, 5 pencils each)', C.orange, C.orangeSoft);
  notes(s, 'Repeating events meeting again → LCM. Splitting into the largest equal groups → HCF.');
}

for (const reveal of [false, true]) {
  const s = frame(reveal ? 'Prime factors, HCF and LCM: answer' : 'Prime factors, HCF and LCM', { tag: 'Part 2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.35;
  const panel = (x, head, colour, fill, rows, show, ansColour) => {
    rect(s, x, top, cw, 5.55, fill, colour === C.maroon ? C.line : 'F3D9B5');
    rect(s, x, top, cw, 0.55, colour);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.55, { size: 20, bold: true, color: C.white, valign: 'middle' });
    rows.forEach(([l, a], i) => {
      txt(s, l, x + 0.3, top + 0.8 + i * 1.15, cw - 0.6, 0.5, { size: 21 });
      if (show) txt(s, a, x + 0.3, top + 1.3 + i * 1.15, cw - 0.6, 0.5, { size: 23, bold: true, color: ansColour });
    });
  };
  panel(MX, 'My turn', C.maroon, C.white, [['84 as a product of primes', '84 = 2² × 3 × 7'], ['90 as a product of primes', '90 = 2 × 3² × 5'], ['HCF of 84 and 90', '2 × 3 = 6'], ['LCM of 84 and 90', '2² × 3² × 5 × 7 = 1260']], true, C.ink);
  panel(MX + cw + gap, reveal ? 'Your turn: answer' : 'Your turn', C.orange, C.orangeSoft, [['150 as a product of primes', '150 = 2 × 3 × 5²'], ['105 as a product of primes', '105 = 3 × 5 × 7'], ['HCF of 150 and 105', '3 × 5 = 15'], ['LCM of 150 and 105', '2 × 3 × 5² × 7 = 1050']], reveal, C.green);
  notes(s, 'Draw the Venn diagram for each pair. Mine: middle 2, 3. Yours: middle 3, 5; outside 2, 5 and 7.');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: listing systematically', { tag: 'N5 counting' });
  txt(s, 'Choose **one starter** (soup, salad, melon) and **one main** (pasta, curry).', MX, 1.35, W - 2 * MX, 0.55, { size: 22 });
  const st = ['Soup', 'Salad', 'Melon'], mn = ['Pasta', 'Curry'];
  const cw = 2.2, ch = 0.7, x0 = MX, y0 = 2.15;
  rect(s, x0, y0, cw, ch, C.maroon);
  txt(s, '', x0, y0, cw, ch, {});
  mn.forEach((m, j) => { rect(s, x0 + cw + j * cw, y0, cw, ch, C.orange); txt(s, m, x0 + cw + j * cw, y0, cw, ch, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' }); });
  st.forEach((a, i) => {
    rect(s, x0, y0 + (i + 1) * ch, cw, ch, C.maroon);
    txt(s, a, x0, y0 + (i + 1) * ch, cw, ch, { size: 20, bold: true, color: C.white, align: 'center', valign: 'middle' });
    mn.forEach((m, j) => { rect(s, x0 + cw + j * cw, y0 + (i + 1) * ch, cw, ch, C.white, C.line); txt(s, `${a}, ${m}`, x0 + cw + j * cw, y0 + (i + 1) * ch, cw, ch, { size: 16, align: 'center', valign: 'middle' }); });
  });
  txt(s, '3 × 2 = **6** meals', x0, y0 + 4 * ch + 0.2, 6.6, 0.55, { size: 24, color: C.green });
  const bx = 7.6, bw = W - MX - bx;
  rect(s, bx, 1.95, bw, 4.85, C.greyLight);
  txt(s, 'Two-digit numbers from the cards 1, 2, 3 (no repeats)', bx + 0.3, 2.05, bw - 0.6, 1.0, { size: 19, bold: true, color: C.maroon });
  txt(s, '12, 13\n21, 23\n31, 32', bx + 0.3, 3.1, bw - 0.6, 1.8, { size: 26, bold: true });
  txt(s, 'Fix the first digit, then list every second digit. **6** numbers.', bx + 0.3, 5.0, bw - 0.6, 1.2, { size: 18 });
  notes(s, 'Systematic means in an order that guarantees nothing is missed or repeated. A table or a tree works well.');
}

{
  const s = frame('The product rule for counting', HT);
  rect(s, MX, 1.4, W - 2 * MX, 1.05, C.soft, C.line);
  txt(s, 'If there are **a** ways to do one thing and **b** ways to do another, there are **a × b** ways to do both.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.05, { size: 21, valign: 'middle' });
  const ex = [['3 tops, 4 trousers, 2 pairs of shoes', '3 × 4 × 2 = 24 outfits'], ['A 4-digit PIN using 0–9', '10 × 10 × 10 × 10 = 10 000'], ['A 4-digit PIN, no digit repeated', '10 × 9 × 8 × 7 = 5040']];
  ex.forEach(([a, b], i) => {
    const y = 2.75 + i * 1.3;
    rect(s, MX, y, W - 2 * MX, 1.1, i % 2 ? C.white : C.greyLight, C.line);
    txt(s, a, MX + 0.3, y, 5.8, 1.1, { size: 21, valign: 'middle' });
    txt(s, b, MX + 6.3, y, W - 2 * MX - 6.5, 1.1, { size: 24, bold: true, color: C.maroon, valign: 'middle' });
  });
  txt(s, 'With no repeats, there is one fewer choice each time.', MX, 6.6, W - 2 * MX, 0.4, { size: 18, color: C.grey });
  notes(s, 'Higher only (N5). Listing becomes impractical for large numbers, which is why the product rule is used.');
}

// ---------------- Practice & assessment ----------------
{
  const qs = [
    'List all the factors of 48.',
    'Write 120 as a product of prime factors in index form.',
    'Find the HCF of 24 and 36.',
    'Find the LCM of 8 and 12.',
    'Two lights flash every 15 s and every 20 s. They flash together now. How long until they flash together again?',
    'A café has 4 drinks and 3 snacks. How many different drink-and-snack choices are there?',
    'Ali says 1 is a prime number. Explain why he is wrong.',
    'HT  How many 3-digit codes can be made from the digits 1–9 if no digit is repeated?',
  ];
  const ans = ['1, 2, 3, 4, 6, 8, 12, 16, 24, 48', '2³ × 3 × 5', '12', '24', '60 seconds', '12', 'It has only one factor', '9 × 8 × 7 = 504'];
  for (const [ttl, k, tag] of [['Practice: fluency', 0, 'Questions 1–4'], ['Practice: problem solving', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 26, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 22, start: k });
    notes(s, 'Answers: 1) 1, 2, 3, 4, 6, 8, 12, 16, 24, 48  2) 2 × 2 × 2 × 3 × 5 = 2³ × 3 × 5  3) 12  4) 24  5) LCM of 15 and 20 = 60 s  6) 4 × 3 = 12  7) a prime has exactly two factors; 1 has one  8) 9 × 8 × 7 = 504.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.32,
  parts: [
    { l: 'a', q: 'Write 90 as a product of its prime factors.', m: 2, lines: 1 },
    { l: 'b', q: 'Find the highest common factor of 90 and 84.', m: 2, lines: 1 },
    { l: 'c', q: 'Find the lowest common multiple of 90 and 84.', m: 2, lines: 1 },
    { l: 'd', q: 'Two bells ring every 6 minutes and every 15 minutes. They ring together at noon. When do they next ring together?', m: 2, lines: 1 },
    { l: 'e', q: 'HT  A password is 2 letters (A–Z) followed by 3 digits (0–9). How many passwords are possible?', m: 2, lines: 1 },
  ],
  total: 10,
  scheme: [
    ['(a)', '2 × 3² × 5', 'M1 A1', 'M1 correct tree or division to 2, 3, 3, 5'],
    ['(b)', '6', 'M1 A1', 'M1 84 = 2² × 3 × 7 seen'],
    ['(c)', '1260', 'M1 A1', 'M1 2² × 3² × 5 × 7'],
    ['(d)', 'LCM = 30, so 12:30', 'M1 A1', ''],
    ['(e)', '26 × 26 × 10 × 10 × 10 = 676 000', 'M1 A1', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Is 21 a prime number? Explain.', 'List the factors of 20.', 'Work out  2³ × 5', 'Find the HCF of 12 and 18.'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) no: 21 = 3 × 7  2) 1, 2, 4, 5, 10, 20  3) 40  4) 6. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 25 minutes' });
  D.qCards(s, [
    'Write down all the factor pairs of 64.',
    'Write 252 as a product of prime factors in index form.',
    'Find the HCF and the LCM of 252 and 360.',
    '48 cakes and 60 biscuits are shared into identical bags with nothing left over. What is the greatest number of bags?',
    'Sam has 5 tops and 3 pairs of jeans. How many different outfits can she make?',
    'HT  How many even 3-digit numbers can be made from the digits 1–6 if digits can repeat?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) 1 × 64, 2 × 32, 4 × 16, 8 × 8  2) 2² × 3² × 7  3) 360 = 2³ × 3² × 5: HCF 36, LCM 2520  4) HCF 12  5) 15  6) 6 × 6 × 3 = 108 (last digit 2, 4 or 6).');
}

D.save(path.join(__dirname, 'AQA_8300_N4-N5_PrimesFactorsMultiples.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
