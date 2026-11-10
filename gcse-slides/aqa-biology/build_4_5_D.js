// build_4_5_D.js — AQA GCSE Biology (8461) 4.5 Homeostasis and response, lesson 4 of 5:
// 4.5.3.3 Water and nitrogen balance (kidney, dialysis, transplant; HT: ADH, deamination),
// 4.5.3.4 Hormones in reproduction, 4.5.3.5 Contraception, 4.5.3.6 HT: infertility (IVF),
// 4.5.3.7 HT: adrenaline and thyroxine (negative feedback).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_5_D.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.5.3.3–4.5.3.7', title: 'Kidneys and reproduction',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const sq = v => v * v;

// ======================= numbers (all checked) =======================
calc('urea x', Math.round(2.0 / 0.03), 67);
calc('reabs', Math.round((180 - 1.5) / 180 * 1000) / 10, 99.2);
calc('P8', Math.round((150 - 1.2) / 150 * 1000) / 10, 99.2);
calc('HW', Math.round(1.8 / 0.03), 60);

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function headCard(s, x, y, w, h, head, colour, fill) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
}
function bullets(s, x, y, w, items, size = 18, gap = 0.16) {
  items.forEach(t => { const th = D.textH(t, size, w - 0.3); txt(s, '•', x, y, 0.3, 0.4, { size, bold: true, color: C.accent }); txt(s, t, x + 0.3, y, w - 0.3, th + 0.05, { size }); y += th + gap; });
  return y;
}
function flow(s, items, y, h, size = 17, cols) {
  const n = items.length, gap = 0.42, bw = (W - 2 * MX - (n - 1) * gap) / n;
  items.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap), col = (cols && cols[i]) || C.maroon, hh = 0.68;
    rect(s, x, y, bw, h, C.white, col, { lw: 2 });
    rect(s, x, y, bw, hh, col);
    txt(s, a, x + 0.06, y, bw - 0.12, hh, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
    if (b) txt(s, b, x + 0.12, y + hh + 0.1, bw - 0.24, h - hh - 0.15, { size, align: 'center' });
    if (i < n - 1) arrow(s, x + bw + 0.04, y + h / 2, x + bw + gap - 0.04, y + h / 2, C.ink, 2.5);
  });
}
function table(s, x, y, cws, head, rows, rh = 0.62, size = 18) {
  head.forEach((t, j) => { const xx = x + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, xx, y, cws[j], 0.6, C.maroon); txt(s, t, xx + 0.15, y, cws[j] - 0.3, 0.6, { size: size - 1, bold: true, color: C.white, valign: 'middle', align: j ? 'center' : 'left' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const xx = x + cws.slice(0, j).reduce((a, b) => a + b, 0), yy = y + 0.6 + i * rh; rect(s, xx, yy, cws[j], rh, i % 2 ? C.white : C.soft, C.line); txt(s, t, xx + 0.15, yy, cws[j] - 0.3, rh, { size, bold: j === 0, valign: 'middle', align: j ? 'center' : 'left' }); }));
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Water and nitrogen balance, the kidney and kidney failure, hormones in reproduction, contraception, IVF, adrenaline and thyroxine',
  bullets: ['Part 1: water balance and the kidney (4.5.3.3)', 'Part 2: hormones in human reproduction (4.5.3.4)', 'Part 3: contraception and HT: treating infertility (4.5.3.5–6)', 'Part 4: HT: adrenaline and thyroxine (4.5.3.7)'],
  notes: 'AQA 8461 GCSE Biology 4.5, lesson 4 of 5. The kidney, dialysis and transplants are separate Biology only. HT only: ADH, deamination, the interactions of the menstrual-cycle hormones, IVF and fertility drugs, adrenaline and thyroxine. This is a full lesson: if time is short, set Part 4 as homework reading. Lesson 5: plant hormones (RP8).',
});

D.objectives({
  tag: '4.5.3.3–4.5.3.7',
  items: [
    'Explain how the **kidneys** control water and remove **urea**, and compare **dialysis** with a **transplant**.',
    'Describe the roles of **FSH, LH, oestrogen** and **progesterone** in the menstrual cycle.',
    'Evaluate **hormonal** and **non-hormonal** contraception. **HT:** describe **IVF**.',
    '**HT:** explain **ADH**, **adrenaline** and **thyroxine**, and negative feedback.',
  ],
  keywords: ['filtration', 'reabsorption', 'ADH', 'dialysis', 'FSH', 'ovulation'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is osmosis?', 'Which gland is called the "master gland"?', 'What is negative feedback?', 'Which organ makes urea?'],
  answers: ['Movement of water across a partially permeable membrane', 'The pituitary gland', 'A change triggers a response that reverses it', 'The liver'],
  notes: 'Retrieval from 4.1 (osmosis), lesson 3 (pituitary, negative feedback) and 4.4.2 (urea from excess protein).',
});

D.vocab({
  title: 'Key words', tag: '4.5.3',
  items: [
    { term: 'Selective reabsorption', def: 'The kidney takes back **useful** substances (all glucose, some ions and water) into the blood.' },
    { term: 'ADH', def: '**HT:** a hormone from the **pituitary** that makes the kidney tubules reabsorb **more water**.' },
    { term: 'Ovulation', def: 'The **release of an egg** from an ovary, about every **28 days**.' },
    { term: 'IVF', def: '**HT:** in vitro fertilisation: eggs are fertilised by sperm **in a lab**.' },
  ],
  notes: 'Also: filtration (small molecules pass out of the blood in the kidney), urea, FSH, LH, contraception.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: water balance', { tag: '4.5.3.3' });
  rect(s, MX, 1.4, W - 2 * MX, 1.2, C.soft, C.line);
  txt(s, 'If body fluids get too **concentrated** or too **dilute**, cells lose or gain water by **osmosis**. They shrink or swell and **do not work** properly.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.2, { size: 19, valign: 'middle' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 2.9, h = 3.95;
  [['Lungs', C.grey, 'Water leaves in the air we **breathe out**.', 'No control'], ['Skin', C.grey, '**Sweat** contains water, ions and urea.', 'No control of water loss'], ['Kidneys', C.green, '**Urine** contains water, ions and urea.', 'Controlled: the body adjusts it']].forEach(([a, col, b, c], i) => {
    const x = MX + i * (cw + gap);
    headCard(s, x, top, cw, h, a, col, i === 2 ? C.greenSoft : C.white);
    txt(s, b, x + 0.2, top + 0.8, cw - 0.4, 1.6, { size: 19 });
    txt(s, c, x + 0.2, top + h - 0.85, cw - 0.4, 0.6, { size: 18, bold: true, color: col });
  });
  notes(s, 'Spec 4.5.3.3: "Water leaves the body via the lungs during exhalation. Water, ions and urea are lost from the skin in sweat. There is no control over water, ion or urea loss by the lungs and skin. Excess water, ions and urea are removed via the kidneys in the urine."');
}

{
  const s = frame('How the kidney makes urine', { tag: '4.5.3.3' });
  flow(s, [['Filtration', 'small molecules pass from the blood into the tubule'], ['Selective reabsorption', 'ALL glucose, the ions and water the body needs go back'], ['Urine', 'urea, excess water and excess ions go to the bladder']], 1.45, 1.75, 17, [C.maroon, C.green, C.orange]);
  table(s, MX, 3.5, [2.6, 2.0, 2.0, 2.0], ['g per 100 cm³', 'Blood plasma', 'Filtrate', 'Urine'], [['Protein', '8.0', '0', '0'], ['Glucose', '0.10', '0.10', '0'], ['Urea', '0.03', '0.03', '2.0'], ['Ions', '0.72', '0.72', '1.5']], 0.62, 18);
  const bx = MX + 8.9, bw = W - MX - bx;
  rect(s, bx, 3.5, bw, 3.08, C.orangeSoft, 'F3D9B5');
  txt(s, '**Read the table:** protein is too big to be filtered. Glucose is **all reabsorbed**. Urea is about **67 times** more concentrated in urine (2.0 ÷ 0.03).', bx + 0.2, 3.55, bw - 0.4, 2.98, { size: 18, valign: 'middle' });
  notes(s, 'Spec: "The kidneys produce urine by filtration of the blood and selective reabsorption of useful substances such as glucose, some ions and water. Students should be able to translate tables and bar charts of glucose, ions and urea before and after filtration." Typical values. Urea is concentrated because most of the water is reabsorbed.');
}

{
  const s = frame('ADH and deamination', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'ADH: negative feedback', C.maroon, C.soft);
  const steps = ['Blood too **concentrated** (e.g. dehydrated)', 'Detected by receptors in the brain', '**Pituitary** releases more **ADH** into the blood', 'Kidney tubules reabsorb **more water**', 'Small volume of **concentrated** urine; blood back to normal'];
  steps.forEach((t, i) => {
    const y = top + 0.8 + i * 0.92;
    rect(s, MX + 0.3, y, cw - 0.6, 0.72, C.white, C.line);
    txt(s, t, MX + 0.45, y, cw - 0.9, 0.72, { size: 16, valign: 'middle' });
    if (i < steps.length - 1) arrow(s, MX + cw / 2, y + 0.73, MX + cw / 2, y + 0.91, C.ink, 2);
  });
  headCard(s, MX + cw + gap, top, cw, h, 'Deamination: where urea comes from', C.orange, C.orangeSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Digesting protein gives **excess amino acids**.', 'In the **liver** they are **deaminated** (the amino group is removed), forming **ammonia**.', 'Ammonia is **toxic**, so it is converted straight away to **urea**.', 'Urea travels in the blood to the kidneys and is **excreted** in urine.'], 18, 0.25);
  notes(s, 'HT 4.5.3.3. If blood is too dilute, less ADH is released, less water is reabsorbed, and a large volume of dilute urine is made. Both are examples of negative feedback.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which substance is filtered by a healthy kidney but then completely reabsorbed?',
  options: ['Glucose', 'Urea', 'Protein', 'Water'],
  correct: 0,
  notes: 'Answer A. B is excreted. C is not filtered (too big). D is only partly reabsorbed, depending on the body\'s needs.',
});

{
  const s = frame('Treating kidney failure', { tag: '4.5.3.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Dialysis', C.maroon, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Blood flows past a **partially permeable membrane**, with **dialysis fluid** on the other side.', 'The fluid has the **same concentration** of glucose and useful ions as normal blood, and **no urea**.', 'Urea and excess ions **diffuse** out; glucose stays in.', '**But:** 3–4 sessions a week, several hours each; diet is restricted; costly over time.'], 17, 0.2);
  headCard(s, MX + cw + gap, top, cw, h, 'Kidney transplant', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['A healthy kidney from a **donor** (alive or recently dead).', 'Patient can live a **normal life**; cheaper long term.', '**But:** risk of **rejection**: the antigens are different, so the immune system attacks it.', 'Needs **immunosuppressant drugs** for life (more infections); **too few donors**; surgical risk.'], 17, 0.2);
  notes(s, 'Spec 4.5.3.3: "People who suffer from kidney failure may be treated by organ transplant or by using kidney dialysis. Students should know the basic principles of dialysis." Evaluation questions: give advantages and disadvantages of both, then a conclusion. A tissue match (donor relative) reduces rejection.');
}

D.myTurnYourTurn({
  title: 'Explaining the kidney', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain how dialysis removes urea from the blood.  [3 marks]',
    steps: [
      { label: 'Membrane', text: '**Partially permeable**' },
      { label: 'Fluid', text: '**Contains no urea**' },
      { label: 'Diffusion', text: '**Urea diffuses out of blood**' },
    ],
  },
  yours: {
    q: 'HT  Explain how ADH reduces water loss when you are dehydrated.  [3 marks]',
    steps: [
      { label: 'Detect', text: '**Blood too concentrated**' },
      { label: 'Release', text: '**Pituitary releases ADH**' },
      { label: 'Kidney', text: '**More water reabsorbed**' },
    ],
  },
  notes: 'Mine: the concentration gradient is the key idea: high urea in blood, none in fluid. Yours: say "reabsorbed back into the blood from the kidney tubules".',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: hormones in reproduction', { tag: '4.5.3.4' });
  table(s, MX, 1.45, [2.7, 2.3, W - 2 * MX - 5.0], ['Hormone', 'Made in', 'Job'], [
    ['Oestrogen', 'ovaries', 'Main female hormone at puberty; repairs the uterus lining'],
    ['Testosterone', 'testes', 'Main male hormone; stimulates sperm production'],
    ['FSH', 'pituitary', 'Causes an egg to mature in an ovary'],
    ['LH', 'pituitary', 'Stimulates the release of the egg (ovulation)'],
    ['Progesterone', 'ovaries', 'Maintains the uterus lining'],
  ], 0.78, 18);
  rect(s, MX, 6.0, W - 2 * MX, 0.85, C.soft, C.line);
  txt(s, 'At puberty, the ovaries start to release an **egg about every 28 days**: this is **ovulation**.', MX + 0.3, 6.0, W - 2 * MX - 0.6, 0.85, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.5.3.4: "During puberty reproductive hormones cause secondary sex characteristics to develop. Oestrogen is the main female reproductive hormone produced in the ovary. At puberty eggs begin to mature and one is released approximately every 28 days. This is called ovulation. Testosterone is the main male reproductive hormone produced by the testes and it stimulates sperm production." Students should know the four hormones of the menstrual cycle.');
}

{
  const s = frame('The menstrual cycle', { tag: '4.5.3.4' });
  const G = graph(D, s, MX + 0.8, 1.75, 7.6, 4.3, [0, 28], [0, 10], { gridX: 2, gridY: 2, labX: 7, labY: 100, axesAtEdge: true, xTitle: 'Day of the cycle', yTitle: 'Hormone level' });
  const g = (d, m, w) => Math.exp(-sq((d - m) / w));
  G.curve(d => 2.5 + 2.5 * g(d, 3, 3) + 2.5 * g(d, 13.5, 1.2), 0, 28, C.blue, 3, 200);
  G.curve(d => 1.2 + 7 * g(d, 14, 1.0), 0, 28, C.orange, 3, 200);
  G.curve(d => 1.5 + 5 * g(d, 12, 2.5) + 2 * g(d, 21, 3), 0, 28, C.red, 3, 200);
  G.curve(d => 0.8 + 6 * g(d, 21, 3.5), 0, 28, C.green, 3, 200);
  G.seg(14, 0, 14, 10, C.grey, 1.5, 'dash');
  txt(s, 'ovulation', G.px(14) + 0.08, G.py(9.7), 1.4, 0.32, { size: 13, bold: true, color: C.grey });
  rect(s, G.px(0), G.py(0) - 0.32, G.px(5) - G.px(0), 0.28, 'E7B5B0');
  txt(s, 'period', G.px(0) + 0.05, G.py(0) - 0.32, 1.0, 0.28, { size: 12, bold: true, color: C.red });
  const bx = MX + 9.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Key', C.maroon, C.soft);
  [['FSH', C.blue, 'peaks early: egg matures'], ['LH', C.orange, 'surge on day 14: ovulation'], ['Oestrogen', C.red, 'rises: lining rebuilt'], ['Progesterone', C.green, 'after ovulation: lining kept']].forEach(([a, col, b], i) => {
    const y = 2.2 + i * 1.12;
    rect(s, bx + 0.25, y + 0.12, 0.5, 0.12, col);
    txt(s, a, bx + 0.9, y - 0.05, bw - 1.1, 0.42, { size: 18, bold: true, color: col });
    txt(s, b, bx + 0.9, y + 0.38, bw - 1.1, 0.5, { size: 15 });
  });
  notes(s, 'Sketch of relative levels, not real data. Days 1–5: the uterus lining breaks down (period). If no fertilisation, progesterone falls, and the lining breaks down again. Exam tasks: identify the hormones from a graph, and say which day ovulation happens.');
}

{
  const s = frame('How the hormones interact', HT);
  const lx = MX, rx = W - MX - 2.6, bw = 2.6, top = 1.6, bh = 4.9;
  rect(s, lx, top, bw, bh, C.soft, C.maroon, { lw: 2 }); txt(s, 'Pituitary gland', lx, top, bw, 0.7, { size: 20, bold: true, color: C.maroon, align: 'center', valign: 'middle' });
  rect(s, rx, top, bw, bh, C.orangeSoft, C.orange, { lw: 2 }); txt(s, 'Ovaries', rx, top, bw, 0.7, { size: 20, bold: true, color: C.orange, align: 'center', valign: 'middle' });
  const rows = [
    ['FSH', 'matures an egg; makes the ovaries release oestrogen', 1, C.blue],
    ['Oestrogen', 'inhibits FSH; stimulates LH release', -1, C.red],
    ['LH', 'stimulates ovulation (egg released)', 1, C.orange],
    ['Progesterone', 'inhibits FSH and LH; maintains lining', -1, C.green],
  ];
  rows.forEach(([h, t, dir, col], i) => {
    const y = top + 1.25 + i * 1.0;
    if (dir > 0) arrow(s, lx + bw + 0.1, y + 0.45, rx - 0.1, y + 0.45, col, 3); else arrow(s, rx - 0.1, y + 0.45, lx + bw + 0.1, y + 0.45, col, 3);
    txt(s, '**' + h + '**: ' + t, lx + bw + 0.3, y - 0.05, rx - lx - bw - 0.6, 0.45, { size: 16, color: col, align: 'center' });
  });
  notes(s, 'HT 4.5.3.4: "Students should be able to explain the interactions of FSH, oestrogen, LH and progesterone, in the control of the menstrual cycle." Arrows show which gland releases each hormone and where it acts. This is negative feedback: oestrogen and progesterone switch off FSH.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which hormone triggers ovulation?',
  options: ['LH', 'FSH', 'Oestrogen', 'Progesterone'],
  correct: 0,
  notes: 'Answer A. B matures the egg. C rebuilds the lining (and HT: triggers LH). D maintains the lining.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: contraception', { tag: '4.5.3.5' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 4.2;
  headCard(s, MX, top, cw, h, 'Hormonal', C.maroon, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['**Oral pill**: oestrogen and progesterone **inhibit FSH**, so no eggs mature.', '**Injection, implant or skin patch**: slow release of **progesterone**; stops eggs maturing and being released, for months or years.'], 17, 0.25);
  headCard(s, MX + cw + gap, top, cw, h, 'Non-hormonal', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['**Barriers** (condoms, diaphragm): stop sperm reaching an egg.', '**IUD**: stops an embryo implanting (some release hormones).', '**Spermicides**: kill or disable sperm.', 'Avoiding sex around ovulation; **sterilisation** (surgery).'], 17, 0.12);
  rect(s, MX, 5.8, W - 2 * MX, 1.05, C.orangeSoft, 'F3D9B5');
  txt(s, '**Evaluating:** hormonal methods are very effective but can have **side effects**. Only **condoms** also protect against **STIs**.', MX + 0.3, 5.8, W - 2 * MX - 0.6, 1.05, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.5.3.5: "Fertility can be controlled by a variety of hormonal and non-hormonal methods of contraception." Students should be able to evaluate the different methods. Pills must be taken every day; implants last up to 3 years.');
}

{
  const s = frame('Treating infertility', HT);
  rect(s, MX, 1.4, W - 2 * MX, 0.85, C.soft, C.line);
  txt(s, 'A woman with low FSH can take a **fertility drug** containing **FSH and LH** to stimulate ovulation. If that fails, she may try **IVF**:', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.85, { size: 18, valign: 'middle' });
  flow(s, [['1  Hormones', 'FSH and LH given to make several eggs mature'], ['2  Collect', 'eggs collected from the ovaries'], ['3  Fertilise', 'with the father\'s sperm in the lab'], ['4  Embryos', 'eggs develop into tiny balls of cells'], ['5  Insert', '1 or 2 embryos put into the uterus']], 2.5, 2.1, 16);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 4.85, cw, 2.0, 'Advantages', C.green, C.greenSoft);
  txt(s, 'Lets infertile couples have a child of their own.', MX + 0.25, 5.5, cw - 0.5, 1.2, { size: 17 });
  headCard(s, MX + cw + gap, 4.85, cw, 2.0, 'Disadvantages', C.red, 'FBEDEB');
  txt(s, 'Emotionally and physically **stressful**; low **success rate**; risk of **multiple births**.', MX + cw + gap + 0.25, 5.5, cw - 0.5, 1.2, { size: 17 });
  notes(s, 'HT 4.5.3.6. Spec also mentions ethical issues: what happens to unused embryos. Multiple births are risky for the mother and babies. Students should understand the social and ethical issues.');
}

D.myTurnYourTurn({
  title: 'Reproductive hormones', tag: 'Parts 2–3', stepSize: 20, labelW: 2.65, labelSize: 18, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Name the hormone that…',
    steps: [
      { label: 'matures an egg', text: '**FSH**' },
      { label: 'triggers ovulation', text: '**LH**' },
      { label: 'repairs the lining', text: '**Oestrogen**' },
      { label: 'maintains the lining', text: '**Progesterone**' },
    ],
  },
  yours: {
    q: 'Hormonal or non-hormonal?',
    steps: [
      { label: 'Oral pill', text: '**Hormonal**' },
      { label: 'Condom', text: '**Non-hormonal**' },
      { label: 'Implant', text: '**Hormonal**' },
      { label: 'Diaphragm', text: '**Non-hormonal**' },
    ],
  },
  notes: 'Mine: FSH and LH come from the pituitary; oestrogen and progesterone from the ovaries.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: adrenaline and thyroxine', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Adrenaline: "fight or flight"', C.red, 'FBEDEB');
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Made by the **adrenal glands** in times of **fear or stress**.', 'Increases the **heart rate**.', 'Boosts the delivery of **oxygen and glucose** to the **brain and muscles**.', 'Prepares the body for **fight or flight**.'], 18, 0.25);
  headCard(s, MX + cw + gap, top, cw, h, 'Thyroxine: negative feedback', C.maroon, C.soft);
  txt(s, 'Made by the **thyroid**. Increases the **basal metabolic rate**; important for growth and development.', MX + cw + gap + 0.25, top + 0.75, cw - 0.5, 1.2, { size: 17 });
  const steps = ['Thyroxine level **low**', '**Pituitary** releases **TSH**', 'Thyroid releases **more thyroxine**', 'Level back to normal: **TSH is inhibited**'];
  steps.forEach((t, i) => {
    const y = top + 2.05 + i * 0.83, x = MX + cw + gap + 0.3;
    rect(s, x, y, cw - 0.6, 0.65, C.white, C.line);
    txt(s, t, x + 0.15, y, cw - 0.9, 0.65, { size: 16, valign: 'middle' });
    if (i < steps.length - 1) arrow(s, x + (cw - 0.6) / 2, y + 0.66, x + (cw - 0.6) / 2, y + 0.82, C.ink, 2);
  });
  notes(s, 'HT 4.5.3.7: "Adrenaline is produced by the adrenal glands in times of fear or stress. It increases the heart rate and boosts the delivery of oxygen and glucose to the brain and muscles, preparing the body for \'flight or fight\'. Thyroxine from the thyroid gland stimulates the basal metabolic rate. It plays an important role in growth and development. Thyroxine levels are controlled by negative feedback." TSH = thyroid-stimulating hormone.');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'What does adrenaline do?',
  options: ['Raises heart rate, sending more oxygen and glucose to muscles', 'Raises the basal metabolic rate', 'Lowers blood glucose', 'Triggers ovulation'],
  correct: 0,
  notes: 'Answer A. B is thyroxine. C is insulin. D is LH.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Name two ways water leaves the body that are not controlled.', 'Breathing out; sweating'], ['Why is there no protein in urine?', 'Protein molecules are too big to be filtered'], ['Which gland makes FSH and LH?', 'The pituitary gland'], ['How does the oral pill stop pregnancy?', 'It inhibits FSH, so no eggs mature'],
    ['Give one disadvantage of a kidney transplant.', 'Rejection: needs immunosuppressants'], ['HT  What happens to excess amino acids?', 'Deaminated in the liver; urea made'],
    ['HT  Give two disadvantages of IVF.', 'Stressful; low success; multiple births'], ['Kidneys filter 150 dm³ a day; 1.2 dm³ of urine is made. What % is reabsorbed?', '99.2%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 22, start: k });
    notes(s, 'Answers: 1) lungs (breathing out) and skin (sweat)  2) proteins are too large to be filtered  3) pituitary  4) oestrogen and progesterone inhibit FSH, so no eggs mature  5) rejection; lifelong immunosuppressants; shortage of donors; surgery risk  6) deaminated in the liver to ammonia, converted to urea, excreted by the kidneys  7) emotionally and physically stressful; low success rate; multiple births  8) (150 − 1.2) ÷ 150 × 100 = 99.2%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'HT  Name the gland that releases ADH.', m: 1, lines: 0 },
    { l: 'b', q: 'Glucose is found in the filtrate in the kidney, but not in the urine. Explain why.', m: 2, lines: 1 },
    { l: 'c', q: 'Give one advantage and two disadvantages of treating kidney failure with a transplant rather than dialysis.', m: 3, lines: 1 },
    { l: 'd', q: 'HT  Describe how FSH, oestrogen and LH interact to cause ovulation.', m: 4, lines: 2 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'pituitary', '1', ''],
    ['(b)', 'glucose is small enough to be filtered; all of it is (selectively) reabsorbed into the blood', '2', ''],
    ['(c)', 'adv: normal life / no regular sessions / cheaper long term; disadv: rejection, immunosuppressants, donor shortage, surgery risk', '3', '1 adv + 2 disadv'],
    ['(d)', 'FSH matures an egg; FSH stimulates oestrogen; oestrogen inhibits FSH and stimulates LH; LH triggers ovulation', '4', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Which organ controls how much water is lost in urine?', 'What does progesterone do?', 'Name one non-hormonal method of contraception.', 'HT  What does thyroxine control?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) the kidneys  2) maintains the uterus lining (HT: inhibits FSH and LH)  3) condom, diaphragm, IUD, spermicide, abstinence or sterilisation  4) basal metabolic rate. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Describe how the kidney makes urine.',
    'Evaluate dialysis and kidney transplants.',
    'Sketch the four hormone levels across a 28-day cycle.',
    'HT  Explain how the oral pill prevents pregnancy.',
    'Urea: 0.03 g in plasma and 1.8 g in urine (per 100 cm³). How many times more concentrated in urine?',
    'HT  Explain how thyroxine levels are kept steady.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) filtration of small molecules; selective reabsorption of glucose, some ions and water; urea, excess water and ions in urine  2) both sides plus a conclusion  3) FSH early peak, LH surge day 14, oestrogen peaks before ovulation, progesterone peaks after  4) oestrogen and progesterone inhibit FSH, so no eggs mature  5) 1.8 ÷ 0.03 = 60 times  6) low thyroxine → pituitary releases TSH → thyroid releases thyroxine → normal level inhibits TSH (negative feedback).');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.5_D_KidneysAndReproduction.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
