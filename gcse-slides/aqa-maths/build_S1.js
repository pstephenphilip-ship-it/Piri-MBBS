// build_S1.js — AQA GCSE Mathematics 8300, S1 Populations and sampling (one lesson, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_S1.js
'use strict';
const path = require('path');
const T = require('./maths_lesson');
const { calc, C } = T;

const DECK = { code: 'S1', title: 'Populations and sampling' };
const D = T.init(DECK);
const { frame, notes, txt, rect, hline, vline, circle, math, MX, W } = D;

// ======================= numbers (all checked) =======================
// Do Now
calc('3/5 of 40', 3 / 5 * 40, 24);
calc('12/40 = 3/10', 12 / 40, 3 / 10);
calc('15% of 300', 0.15 * 300, 45);
calc('18/60 = 3/10', 18 / 60, 3 / 10);
// My turn: 12 of 40 walk, school 600
calc('12/40 x 600', 12 / 40 * 600, 180);
calc('600/40', 600 / 40, 15);
// Your turn: 9 of 50 under 16, concert 1200
calc('9/50 x 1200', 9 / 50 * 1200, 216);
calc('1200/50', 1200 / 50, 24);
// percentages: 15% of 2400 trees; 25% of 900 households
calc('15% of 2400', 0.15 * 2400, 360);
calc('15% of 80 sample', 0.15 * 80, 12);
calc('25% of 900', 0.25 * 900, 225);
// think deeper: Amy 6/20, Ben 25/100, population 2000
calc('Amy estimate', 6 / 20 * 2000, 600);
calc('Ben estimate', 25 / 100 * 2000, 500);
calc('combined 31/120 x 2000', Math.round(31 / 120 * 2000), 517);
// practice
calc('P2 7/25 x 500', 7 / 25 * 500, 140);
calc('P3 30% of 1600', 0.30 * 1600, 480);
calc('P4 120/200 x 45000', 120 / 200 * 45000, 27000);
calc('P7 6/150 x 12000', 6 / 150 * 12000, 480);
calc('P8a 45 / (3/8)', 45 / (3 / 8), 120);
calc('P8b 3/8 x 960', 3 / 8 * 960, 360);
// exam question: 14 of 50 bus, 1250 students; next year 1400
calc('exam total sample', 18 + 14 + 13 + 5, 50);
calc('exam b', 14 / 50 * 1250, 350);
calc('exam d', 14 / 50 * 1400, 392);
// exit ticket and homework
calc('exit 4/30 x 900', 4 / 30 * 900, 120);
calc('hw2 11/40 x 1000', 11 / 40 * 1000, 275);
calc('hw3 35% of 640', 0.35 * 640, 224);
calc('hw5 sample', 36 / (3 / 10), 120);
calc('hw5 est', 3 / 10 * 2500, 750);

// sample-size simulation: population proportion 30 %, 20 samples of size 10 and 20 samples of size 100
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
const R = rng(20251102);
const sim = size => Array.from({ length: 20 }, () => { let k = 0; for (let i = 0; i < size; i++) if (R() < 0.3) k++; return Math.round(k / size * 100); });
const small = sim(10), big = sim(100);
const rangeOf = a => Math.max(...a) - Math.min(...a);
console.log("ranges", rangeOf(small), rangeOf(big), small.join(","), big.join(","));
if (!(rangeOf(big) < rangeOf(small) * 0.6)) throw new Error('simulation does not show the effect clearly');

// ======================= slides =======================
// 1 Title
D.titleSlide({
  subtitle: 'Who do you ask, how do you choose them, and what can a sample tell you?',
  bullets: ['Population, sample and census', 'Random samples and bias', 'Using a sample to estimate for a whole population'],
  notes: 'AQA 8300 S1: infer properties of populations or distributions from a sample, whilst knowing the limitations of sampling. Both tiers. One lesson (about 60 minutes). Answers are on reveal slides and in these notes.',
});

// 2 Objectives
D.objectives({
  tag: 'S1',
  items: [
    'Explain the difference between a **population**, a **sample** and a **census**.',
    'Describe how to take a **random sample**, and spot when a sample is **biased**.',
    'Use a sample to **estimate** for the whole population, and know the **limitations**.',
  ],
  keywords: ['population', 'sample', 'census', 'random sample', 'biased', 'representative', 'sample size'],
  notes: 'Share the three objectives. Return to them at the exit ticket.',
});

// 3–4 Do Now
D.doNow({
  qs: [
    { q: 'Work out', math: [{ n: 3, d: 5 }, ' of 40'] },
    { q: 'Write in its simplest form:', math: [{ n: 12, d: 40 }] },
    'Work out 15% of 300.',
    '18 out of 60 students chose football. Write this as a fraction in its simplest form.',
  ],
  answers: ['24', '3/10', '45', '18/60 = 3/10'],
  notes: 'Do Now answers: 1) 40 ÷ 5 = 8, × 3 = 24. 2) ÷4: 3/10. 3) 10% = 30, 5% = 15, so 45. 4) 18/60 = 3/10 (÷6). These are the skills used to scale a sample up to a population later in the lesson.',
});

// 5 Key words
D.vocab({
  title: 'Key words', tag: 'S1',
  items: [
    { term: 'Population', def: 'The **whole group** you want to find out about, e.g. all 600 students in a school.' },
    { term: 'Sample', def: 'A **smaller group** chosen from the population, e.g. 40 of those students.' },
    { term: 'Census', def: 'Collecting data from **every** member of the population.' },
    { term: 'Random sample', def: 'Every member of the population has an **equal chance** of being chosen.' },
    { term: 'Biased sample', def: 'Some members are **more likely** to be chosen than others, so it does not represent the population fairly.' },
  ],
  notes: 'Students copy these five definitions. Stress that the population depends on the question being asked: "all students in the school" is a different population from "all Year 9 students".',
});

// 6 Population and sample picture
{
  const s = frame('Population and sample', { tag: 'S1' });
  const cols = 20, rows = 10, gx = 0.37, gy = 0.4, x0 = MX + 0.45, y0 = 1.75;
  const R2 = rng(42); const chosen = new Set();
  while (chosen.size < 20) chosen.add(Math.floor(R2() * cols * rows));
  rect(s, MX, 1.35, cols * gx + 0.55, rows * gy + 0.55, 'FAF7F8', C.line, { round: true });
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const k = r * cols + c, on = chosen.has(k);
    circle(s, x0 + c * gx, y0 + r * gy, on ? 0.27 : 0.2, on ? C.accent : 'D9CDD2');
  }
  calc('dots', cols * rows, 200); calc('chosen', chosen.size, 20);
  const ry = 1.35 + rows * gy + 0.75;
  circle(s, MX + 0.2, ry + 0.2, 0.2, 'D9CDD2'); txt(s, 'Population: all **200** students in Year 9', MX + 0.45, ry, 5.5, 0.42, { size: 20 });
  circle(s, MX + 6.3, ry + 0.2, 0.27, C.accent); txt(s, 'Sample: **20** students chosen at random', MX + 6.6, ry, 5.5, 0.42, { size: 20 });
  const bx = MX + cols * gx + 0.85, bw = W - MX - bx;
  rect(s, bx, 1.35, bw, 4.55, C.soft, C.line, { round: true });
  txt(s, 'Sample size', bx + 0.25, 1.55, bw - 0.5, 0.45, { size: 20, bold: true, color: C.maroon });
  txt(s, 'The number of people or items in the sample.', bx + 0.25, 2.05, bw - 0.5, 0.9, { size: 18 });
  txt(s, 'Here the sample size is **20**.', bx + 0.25, 3.0, bw - 0.5, 0.5, { size: 18 });
  txt(s, 'The sample is', bx + 0.25, 3.7, bw - 0.5, 0.45, { size: 18 });
  math(s, bx + 0.25, 4.65, [{ n: 20, d: 200 }, ' = ', { n: 1, d: 10 }], { size: 22 });
  txt(s, 'of the population.', bx + 0.25, 5.3, bw - 0.5, 0.45, { size: 18 });
  notes(s, 'Ask: what is the population? (all 200 Year 9 students). What is the sample? (the 20 red dots). Why not ask all 200? (time, cost) — leads into the next slide. The 20 dots were chosen by a random number generator.');
}

// 7 Census or sample?
{
  const s = frame('Census or sample?', { tag: 'S1' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const col = (x, head, fill, pros, cons) => {
    rect(s, x, top, cw, 5.45, C.white, C.line, { round: true });
    rect(s, x, top, cw, 0.65, fill, fill, { round: true }); rect(s, x, top + 0.35, cw, 0.3, fill);
    txt(s, head, x + 0.3, top, cw - 0.6, 0.65, { size: 24, bold: true, color: C.white, valign: 'middle' });
    txt(s, '✓  Advantages', x + 0.3, top + 0.9, cw - 0.6, 0.45, { size: 20, bold: true, color: C.green });
    let y = top + 1.4;
    pros.forEach(p => { txt(s, '•  ' + p, x + 0.4, y, cw - 0.7, 0.9, { size: 19 }); y += D.textH(p, 19, cw - 0.9) + 0.12; });
    y += 0.2;
    txt(s, '✗  Disadvantages', x + 0.3, y, cw - 0.6, 0.45, { size: 20, bold: true, color: C.red });
    y += 0.5;
    cons.forEach(p => { txt(s, '•  ' + p, x + 0.4, y, cw - 0.7, 0.9, { size: 19 }); y += D.textH(p, 19, cw - 0.9) + 0.12; });
  };
  col(MX, 'Census: ask everyone', C.maroon,
    ['Uses the whole population, so it gives the exact answer.'],
    ['Takes a long time and costs a lot.', 'Impossible if testing destroys the item (e.g. testing how long every battery lasts).']);
  col(MX + cw + gap, 'Sample: ask some', C.orange,
    ['Quicker and cheaper.', 'The only option when testing destroys the item.'],
    ['Gives an estimate, not the exact answer.', 'Different samples can give different results.', 'May not represent the population.']);
  notes(s, 'Discuss: why would a battery company never take a census of battery life? (They would have no batteries left to sell.) The UK census happens every 10 years because it is so expensive.');
}

// 8–9 Hinge
D.hinge({
  title: 'Quick check',
  q: 'Which one of these is a census?',
  options: [
    'Asking 50 shoppers in a town centre what they think of the new car park.',
    'A teacher asks every student in her class of 30 how they get to school, to find out about her class.',
    'A factory tests 10 light bulbs from each batch of 500.',
    'A newspaper asks 1000 adults in the UK how they will vote.',
  ],
  correct: 1,
  notes: 'Answer B: the population is the class, and every member is asked. A, C and D only ask some of the population. Watch for students who choose D because 1000 is a large number: size does not make it a census.',
});

// 10 Taking a random sample
{
  const s = frame('How to take a random sample', { tag: 'S1' });
  const stepsList = [
    ['List the population', 'Give every member a number, e.g. students 001 to 600.'],
    ['Generate random numbers', 'Use a calculator (Ran# or RanInt), a computer, or names out of a hat.'],
    ['Skip repeats and misses', 'Ignore a number you already have, or one that matches nobody (e.g. 733).'],
    ['Stop at the sample size', 'Keep going until you have, e.g., 40 different students.'],
  ];
  let y = 1.45;
  stepsList.forEach(([h, d], i) => {
    circle(s, MX + 0.35, y + 0.45, 0.6, C.accent);
    txt(s, String(i + 1), MX + 0.05, y + 0.15, 0.6, 0.6, { size: 24, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, h, MX + 0.9, y + 0.02, 6.6, 0.45, { size: 22, bold: true, color: C.maroon });
    txt(s, d, MX + 0.9, y + 0.5, 6.6, 0.8, { size: 19 });
    if (i < 3) vline(s, MX + 0.35, y + 0.8, y + 1.3, C.line, 3);
    y += 1.33;
  });
  const bx = 8.6, bw = W - MX - bx;
  rect(s, bx, 1.45, bw, 5.2, C.greyLight, C.greyLight, { round: true });
  txt(s, 'Random numbers', bx, 1.6, bw, 0.45, { size: 20, bold: true, color: C.maroon, align: 'center' });
  const nums = [['417', ''], ['052', ''], ['733', 'no student 733'], ['268', ''], ['052', 'repeat'], ['590', '']];
  nums.forEach(([v, why], i) => {
    const yy = 2.2 + i * 0.68, bad = !!why;
    txt(s, v, bx + 0.5, yy, 1.1, 0.5, { size: 26, bold: true, color: bad ? 'B9A9B0' : C.ink, extra: bad ? { strike: 'sngStrike' } : {} });
    txt(s, bad ? '✗ ' + why : '✓ keep', bx + 1.75, yy + 0.06, bw - 1.9, 0.45, { size: 17, color: bad ? C.red : C.green });
  });
  notes(s, 'Demonstrate RanInt#(1, 600) on the class calculators if you have them (Casio: SHIFT, decimal point gives Ran#; ALPHA, decimal point gives RanInt#). Stress the key idea: random = every member has an equal chance, not "whoever is nearby".');
}

// 11 Bias
{
  const s = frame('Biased samples', { tag: 'S1' });
  rect(s, MX, 1.4, W - 2 * MX, 1.05, C.soft, C.line, { round: true });
  txt(s, 'A sample is **biased** if some members of the population are **more likely** to be chosen than others. The results will not be **representative**.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.05, { size: 21, valign: 'middle' });
  const cards = [
    ['Who you ask', 'Only asking one type of person.', 'Asking your friends what music the school likes.'],
    ['Where you ask', 'The place attracts certain people.', 'Asking people at a gym how often adults exercise.'],
    ['When you ask', 'The time misses certain people.', 'Asking people at home at 11 am on a weekday about jobs.'],
  ];
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 2.75;
  cards.forEach(([h, d, e], i) => {
    const x = MX + i * (cw + gap);
    rect(s, x, top, cw, 4.0, C.white, C.line, { round: true });
    rect(s, x, top, cw, 0.12, C.accent);
    txt(s, h, x + 0.3, top + 0.3, cw - 0.6, 0.5, { size: 24, bold: true, color: C.maroon });
    txt(s, d, x + 0.3, top + 0.95, cw - 0.6, 1.0, { size: 20 });
    txt(s, 'Example', x + 0.3, top + 2.05, cw - 0.6, 0.4, { size: 16, bold: true, color: C.orange });
    txt(s, e, x + 0.3, top + 2.45, cw - 0.6, 1.4, { size: 19, italic: true });
  });
  notes(s, 'For each example ask: who is missed out? (people who are not your friends; adults who do not go to the gym; people at work). Exam answers must say WHY in context, e.g. "people at a gym exercise more than most adults, so the estimate will be too high".');
}

// 12–13 Spot the bias
{
  const items = [
    ['To find how often adults in a town exercise, Ali asks 40 people leaving the leisure centre.', 'Biased: people at a leisure centre exercise more than most adults.'],
    ['To find the favourite lunch of students, Ben puts all 900 student numbers into a computer and picks 60 at random.', 'Not biased: every student has an equal chance.'],
    ['To find how people in a city get to work, Cara asks 50 people at the bus station at 8 am.', 'Biased: people at a bus station are more likely to travel by bus.'],
    ['To estimate the mean height of Year 11 students, Dan measures the school basketball team.', 'Biased: basketball players are usually taller than average.'],
  ];
  for (const reveal of [false, true]) {
    const s = frame(reveal ? 'Spot the bias: answers' : 'Spot the bias', { tag: 'Biased or not? Why?' });
    D.qCards(s, items.map(i => i[0]), { answers: reveal ? items.map(i => i[1]) : null, size: 20 });
    notes(s, 'Answers: A biased (leisure centre users exercise more). B not biased (simple random sample). C biased (bus users over-represented). D biased (basketball players are tall). Push for the reason in context every time.');
  }
}

// 14–15 My turn / your turn: bias
D.myTurnYourTurn({
  title: 'Explaining bias', tag: 'Exam skill',
  mine: {
    q: 'Jo wants to know how long students at her school spend on homework. She asks 20 students in the library after school. Give **two** reasons why her sample may be biased.',
    steps: [
      { label: 'Who is missed?', text: 'Students who go home straight after school.' },
      { label: 'Reason 1', text: 'Students in the library after school probably do **more** homework than most students.' },
      { label: 'Reason 2', text: 'She only samples **one place** at **one time**, so it is not random.' },
    ],
  },
  yours: {
    q: 'Sam wants to find out how often adults in his town go to the cinema. He asks 30 people coming out of the cinema on a Saturday night. Give **two** reasons why his sample may be biased.',
    steps: [
      { label: 'Reason 1', text: 'People leaving a cinema go to the cinema **more often** than most adults.' },
      { label: 'Reason 2', text: 'Only one place and one time: people who do not go out on Saturdays are missed.' },
    ],
  },
  notes: 'Model the "who is missed?" question first. In AQA mark schemes each reason must be in context (B1 each). "The sample is too small" is a limitation, not bias, and usually earns no mark on a "biased" question.',
});

// 16 Sample size simulation
{
  const s = frame('Does sample size matter?', { tag: 'S1' });
  txt(s, 'In a town, **30%** of people walk to work. Twenty people each took a random sample and worked out the percentage who walk.', MX, 1.3, W - 2 * MX, 0.85, { size: 20 });
  const gx = MX + 2.4, gw = 6.1, x = v => gx + v / 70 * gw;
  const strip = (vals, y, label, color, d = 0.15) => {
    txt(s, label, MX, y - 0.62, 2.3, 0.9, { size: 18, bold: true, color: C.maroon });
    hline(s, gx, y, gx + gw, '8A7F85', 1.25);
    for (let v = 0; v <= 70; v += 10) { vline(s, x(v), y, y + 0.1, '8A7F85', 1); txt(s, v + '%', x(v) - 0.35, y + 0.12, 0.7, 0.3, { size: 13, color: C.grey, align: 'center' }); }
    const counts = {};
    vals.forEach(v => { counts[v] = (counts[v] || 0) + 1; circle(s, x(v), y - d * 0.8 - (counts[v] - 1) * (d + 0.02), d, color, 'FFFFFF', 0.5); });
  };
  strip(small, 4.05, 'Samples of 10 people', C.orange);
  strip(big, 6.3, 'Samples of 100 people', C.accent, 0.085);
  const bx = 9.55, bw = W - MX - bx;
  vline(s, x(30), 2.35, 6.4, C.green, 1.5);
  txt(s, 'true 30%', x(30) - 0.6, 2.2, 1.2, 0.3, { size: 13, bold: true, color: C.green, align: 'center' });
  rect(s, bx, 2.3, bw, 4.4, C.soft, C.line, { round: true });
  txt(s, 'What do you notice?', bx + 0.25, 2.45, bw - 0.5, 0.45, { size: 19, bold: true, color: C.maroon });
  txt(s, `Small samples: from ${Math.min(...small)}% to ${Math.max(...small)}%`, bx + 0.25, 3.0, bw - 0.5, 0.75, { size: 17 });
  txt(s, `Large samples: from ${Math.min(...big)}% to ${Math.max(...big)}%`, bx + 0.25, 3.8, bw - 0.5, 0.75, { size: 17 });
  txt(s, 'A **larger** sample gives a **more reliable** estimate, but takes more time and money.', bx + 0.25, 4.7, bw - 0.5, 1.8, { size: 17 });
  notes(s, `Each dot is one person's sample result (simulated with a random number generator, true proportion 30%). Samples of 10: ${small.join(', ')}. Samples of 100: ${big.join(', ')}. Ask: if you could only take one sample, which size would you trust? Bigger samples vary much less, but they cost more.`);
}

// 17 Limitations
{
  const s = frame('Limitations of sampling', { tag: 'S1' });
  const lim = [
    ['It is only an estimate', 'A sample never gives the exact answer for the population.'],
    ['Samples vary', 'Two different random samples usually give different results.'],
    ['Small samples are unreliable', 'One unusual person changes the result a lot.'],
    ['Bias', 'If the sample is not random, the estimate can be too high or too low.'],
  ];
  const gap = 0.3, cw = (W - 2 * MX - gap) / 2, ch = 2.55;
  lim.forEach(([h, d], i) => {
    const x = MX + (i % 2) * (cw + gap), y = 1.4 + Math.floor(i / 2) * (ch + gap);
    rect(s, x, y, cw, ch, i % 3 ? C.white : C.soft, C.line, { round: true });
    txt(s, h, x + 0.35, y + 0.35, cw - 0.7, 0.55, { size: 24, bold: true, color: C.maroon });
    txt(s, d, x + 0.35, y + 1.05, cw - 0.7, 1.3, { size: 21 });
  });
  notes(s, 'These are the "limitations of sampling" in the AQA S1 statement. A common exam question: "Give one reason why the estimate may not be accurate" (B1 for any of these in context).');
}

// 18 Method for estimating
{
  const s = frame('Using a sample to estimate', { tag: 'S1' });
  rect(s, MX, 1.4, W - 2 * MX, 1.6, C.soft, C.line, { round: true });
  txt(s, 'Assume the population has the **same proportion** as the sample.', MX + 0.35, 1.5, W - 2 * MX - 0.7, 0.5, { size: 22 });
  math(s, MX + 0.35, 2.45, ['estimate  =  ', { n: 'number in sample with the feature', d: 'sample size' }, '  ×  population size'], { size: 22, bold: true, color: C.maroon });
  txt(s, 'Example: 12 out of a random sample of 40 students walk to school. There are 600 students.', MX, 3.3, W - 2 * MX, 0.5, { size: 21 });
  math(s, MX + 0.2, 4.55, ['estimate  =  ', { n: 12, d: 40 }, '  ×  600  =  180 students'], { size: 26 });
  txt(s, 'or:  600 ÷ 40 = 15, so every student in the sample "stands for" 15 students.   12 × 15 = 180', MX, 5.45, W - 2 * MX, 0.5, { size: 20, color: C.grey });
  rect(s, MX, 6.15, W - 2 * MX, 0.7, C.orangeSoft, 'F3D9B5', { round: true });
  txt(s, 'Always say it is an **estimate**, and state the assumption: the sample is **random / representative**.', MX + 0.3, 6.15, W - 2 * MX - 0.6, 0.7, { size: 19, valign: 'middle' });
  notes(s, '12/40 × 600 = 7200 ÷ 40 = 180. The scale-factor method (600 ÷ 40 = 15) is often easier without a calculator. AQA questions often add "State an assumption you have made" (B1: the sample is representative of the population / was chosen at random).');
}

// 19–20 My turn / your turn: fractions
D.myTurnYourTurn({
  title: 'Estimating from a sample', tag: 'No calculator',
  mine: {
    q: 'A random sample of 40 of the 600 students at a school is taken. 12 of the sample walk to school. Estimate the number of students at the school who walk.',
    steps: [
      { label: 'Fraction', math: [{ n: 12, d: 40 }, '  walk'] },
      { label: 'Scale up', math: [{ n: 12, d: 40 }, ' × 600 = ', { n: 7200, d: 40 }] },
      { label: 'Answer', text: '**180** students (an estimate)' },
    ],
  },
  yours: {
    q: 'A random sample of 50 of the 1200 people at a concert is taken. 9 of the sample are under 16. Estimate how many people at the concert are under 16.',
    steps: [
      { label: 'Fraction', math: [{ n: 9, d: 50 }, '  are under 16'] },
      { label: 'Scale up', math: [{ n: 9, d: 50 }, ' × 1200 = 9 × 24'] },
      { label: 'Answer', text: '**216** people (an estimate)' },
    ],
  },
  notes: 'My turn: 12/40 × 600 = 7200/40 = 180, or 600 ÷ 40 = 15 and 12 × 15 = 180. Your turn: 1200 ÷ 50 = 24, 9 × 24 = 216. AQA marks: M1 for 9/50 × 1200 oe, A1 216.',
});

// 21–22 My turn / your turn: percentages
D.myTurnYourTurn({
  title: 'Estimating with percentages', tag: 'No calculator',
  mine: {
    q: 'In a random sample of trees in a forest, 15% have a disease. There are 2400 trees in the forest. Estimate how many trees have the disease. State one assumption.',
    steps: [
      { label: '10%', text: '2400 ÷ 10 = 240' },
      { label: '5%', text: '240 ÷ 2 = 120' },
      { label: '15%', text: '240 + 120 = **360** trees' },
      { label: 'Assumption', text: 'The sample is representative of the whole forest.' },
    ],
  },
  yours: {
    q: 'In a random sample of households in a village, 25% have a dog. There are 900 households in the village. Estimate how many have a dog. State one assumption.',
    steps: [
      { label: '25%', text: '900 ÷ 4 = **225** households' },
      { label: 'Assumption', text: 'The sample was random, so it represents the whole village.' },
    ],
  },
  notes: '15% of 2400 = 360; 25% of 900 = 225. When the sample gives a percentage, the sample size is not needed for the estimate. Assumption mark (B1): the sample is representative / random.',
});

// 23–24 Think deeper
{
  for (const reveal of [false, true]) {
    const s = frame(reveal ? 'Think deeper: answer' : 'Think deeper', { tag: 'Reasoning • grade 5+' });
    txt(s, 'A town has **2000** adults. Two students each take a random sample and ask, "Do you own a bike?"', MX, 1.35, W - 2 * MX, 0.9, { size: 21 });
    const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
    [['Amy', 'asks 20 adults', '6 say yes', 6, 20, 600], ['Ben', 'asks 100 adults', '25 say yes', 25, 100, 500]].forEach(([nm, a, b, k, nn, est], i) => {
      const x = MX + i * (cw + gap);
      rect(s, x, 2.3, cw, 1.75, C.greyLight, C.greyLight, { round: true });
      txt(s, nm, x + 0.3, 2.4, cw - 0.6, 0.5, { size: 24, bold: true, color: C.maroon });
      txt(s, `${a}:  ${b}`, x + 0.3, 2.95, cw - 0.6, 0.5, { size: 21 });
      if (reveal) math(s, x + 0.3, 3.65, ['estimate = ', { n: k, d: nn }, ` × 2000 = ${est}`], { size: 18, color: C.green, bold: true });
    });
    txt(s, '(a)  Whose estimate of the number of bike owners is more reliable? Why?', MX, 4.3, W - 2 * MX, 0.5, { size: 21 });
    txt(s, '(b)  Use **both** samples together to make the best estimate.', MX, 4.9, W - 2 * MX, 0.5, { size: 21 });
    if (reveal) {
      txt(s, '(a)  Ben\'s: his sample is much larger (100 people, not 20).', MX + 0.5, 5.45, W - 2 * MX, 0.45, { size: 20, bold: true, color: C.green });
      math(s, MX + 0.5, 6.35, ['(b)  ', { n: '6 + 25', d: '20 + 100' }, ' × 2000 = ', { n: 31, d: 120 }, ' × 2000 = 516.7, so about 517 adults'], { size: 20, bold: true, color: C.green });
    }
    notes(s, 'Amy: 6/20 × 2000 = 600. Ben: 25/100 × 2000 = 500. (a) Ben, because the larger sample is more reliable. (b) Combine the samples: 31 out of 120, 31/120 × 2000 = 516.66… ≈ 517. Calculator needed for (b). This mirrors AQA questions that ask which of two estimates is better.');
  }
}

// 25–26 Practice
{
  const qs = [
    'Explain the difference between a **population** and a **sample**.',
    'A random sample of 25 of the 500 cars in a car park: 7 are red. Estimate the number of red cars.',
    'In a random sample of 40 of the 1600 students in a school, 30% have a cat. Estimate how many students have a cat.',
    'A random sample of 200 voters: 120 will vote "yes". There are 45 000 voters. Estimate the number of "yes" votes.',
    'Mia asks the first 15 Year 7 students in the dinner queue what they think of school dinners. Give **two** criticisms of her sample.',
    'Why would a census be a bad idea for testing how long a factory\'s batteries last?',
    'A factory makes 12 000 phone cases a week. In a random sample of 150, 6 are faulty. The manager says "more than 500 a week are faulty". Is he right?',
    'In a random sample of students, 3/8 walk to school; 45 of the sample walk. The school has 960 students. (a) How big was the sample? (b) Estimate how many walk.',
  ];
  const ans = [
    'Population: the whole group. Sample: a smaller group from it.',
    '7/25 × 500 = 140',
    '30% of 1600 = 480',
    '120/200 × 45 000 = 27 000',
    'Not random (first in queue); far too small.',
    'Testing destroys the batteries: none left to sell. Too costly.',
    '6/150 × 12 000 = 480. No: about 480, fewer than 500.',
    '(a) 45 ÷ 3/8 = 120  (b) 3/8 × 960 = 360',
  ];
  const sets = [['Practice: fluency', 0, '1–4 • no calculator'], ['Practice: reasoning and problem solving', 4, '5–8 • calculator allowed']];
  for (const [ttl, k, tag] of sets) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, ans.slice(k, k + 4), { cols: 2, size: 22, color: C.green, bold: true, start: k });
    else D.qCards(s, qs.slice(k, k + 4), { cols: 2, size: 21, start: k });
    notes(s, 'Answers: 1) see slide. 2) 500 ÷ 25 = 20, 7 × 20 = 140. 3) 10% = 160, × 3 = 480. 4) 120/200 = 3/5, 3/5 × 45 000 = 27 000. 5) any two in context: not random; misses students who bring packed lunches; very small sample; only one day. 6) the test uses the batteries up / destroys them. 7) 12 000 ÷ 150 = 80, 6 × 80 = 480 < 500, so no. 8) (a) 45 is 3/8 of the sample: 45 ÷ 3 × 8 = 120. (b) 960 ÷ 8 × 3 = 360.');
  }
}

// 27–28 Exam question
D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 7 marks', size: 18, lineGap: 0.36,
  stem: 'A head teacher wants to find out how the 1250 students at her school travel to school.',
  parts: [
    { l: 'a', q: 'First she asks the 30 students in one Year 7 form. Give **two** reasons why this sample may not represent the school.', m: 2, lines: 2 },
    { l: 'b', q: 'She then takes a random sample of 50 students: Walk 18, Bus 14, Car 13, Cycle 5. Estimate the number of students at the school who travel by bus.', m: 2, lines: 1 },
    { l: 'c', q: 'State **one** assumption you made in part (b).', m: 1, lines: 1 },
    { l: 'd', q: 'Next year there will be 1400 students. She says, "More than 400 students will travel by bus." Use the sample to decide if she is right.', m: 2, lines: 1 },
  ],
  total: 7,
  scheme: [
    ['(a)', 'Only Year 7: older students may travel differently.  Only one form: not random / students in a form may live in similar areas.', 'B1 B1', 'Any two different reasons in context'],
    ['(b)', '14/50 × 1250 = 350', 'M1 A1', 'M1 for 14/50 × 1250 oe (1250 ÷ 50 = 25, × 14)'],
    ['(c)', 'The sample is representative / random', 'B1', 'Or: the proportion in the sample is the same as in the school'],
    ['(d)', '14/50 × 1400 = 392, so she is wrong', 'M1 A1', 'A1 needs 392 and a conclusion; ft their method from (b)'],
  ],
  notes: 'Mark scheme on the next slide. (b) 1250 ÷ 50 = 25, 25 × 14 = 350. (d) 1400 ÷ 50 = 28, 28 × 14 = 392 < 400. Accept "No, about 392".',
});

// 29 Exit ticket
{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, [
    'What is a **census**?',
    'A random sample of 30 of the 900 people in a village: 4 are left-handed. Estimate the number of left-handed people in the village.',
    'Give **one** reason why a larger sample is better.',
    'Kai asks people at a football match how much sport adults watch on TV. Why is his sample biased?',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) collecting data from every member of the population. 2) 4/30 × 900 = 120. 3) more reliable / closer to the true value / one unusual result matters less. 4) football fans watch more sport than most adults. Revisit the objectives.');
}

// 30 Homework
{
  const s = frame('Homework', { tag: 'About 20 minutes' });
  D.qCards(s, [
    'Write down the meaning of **random sample** and **biased sample**.',
    'A random sample of 40 of the 1000 workers in a factory: 11 cycle to work. Estimate how many workers cycle.',
    'In a random sample of shoppers, 35% paid by card. 640 shoppers visited. Estimate how many paid by card.',
    'A council asks 100 people in a park how often they use the town\'s parks. Give two reasons the results may be biased.',
    'In a random sample, 3/10 of the people liked a new advert; 36 of the sample liked it. The town has 2500 people. Estimate how many liked it, and find the sample size.',
  ], { cols: 2, size: 18 });
  notes(s, 'Answers: 1) random: every member has an equal chance; biased: some members more likely to be chosen, so not representative. 2) 11/40 × 1000 = 275. 3) 35% of 640 = 224. 4) people in a park use parks more than most; one place/time; not random. 5) 3/10 × 2500 = 750; sample size 36 ÷ 3/10 = 120.');
}

D.save(path.join(__dirname, 'AQA_8300_S1_Sampling.pptx')).then(f => console.log('saved', f, 'slides', D.count, 'checks', T.CALCS.length));
