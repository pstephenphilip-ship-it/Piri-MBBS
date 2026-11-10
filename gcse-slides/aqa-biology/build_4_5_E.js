// build_4_5_E.js — AQA GCSE Biology (8461) 4.5 Homeostasis and response, lesson 5 of 5:
// 4.5.4.1 Control and coordination in plants (auxin; HT: gibberellins, ethene), Required practical 8,
// 4.5.4.2 HT: Use of plant hormones.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_5_E.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.5.4', title: 'Plant hormones',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const STEM = '4F8A3A', AUX = 'C0392B';
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const LIGHT = [22, 25, 23, 26, 24], DARK = [41, 38, 40, 42, 39];

// ======================= numbers (all checked) =======================
calc('light mean', mean(LIGHT), 24); calc('dark mean', mean(DARK), 40);
calc('pct', Math.round((40 - 24) / 24 * 1000) / 10, 66.7);
calc('exam c', mean([18, 21, 19, 22]), 20); calc('HW', mean([15, 12, 14, 11]), 13);

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function seg(s, x1, y1, x2, y2, color, width = 2) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipV: (x2 - x1) * (y2 - y1) < 0, line: { color, width } });
}
function curve(s, f, color, width, n = 30) { for (let i = 0; i < n; i++) { const [a, b] = f(i / n), [c, d] = f((i + 1) / n); seg(s, a, b, c, d, color, width); } }
function leaf(s, x, y, w = 0.6) { s.addShape(D.SH.ellipse, { x: x - w / 2, y: y - 0.13, w, h: 0.26, fill: { color: '6DBE5A' }, line: { color: '35582A', width: 1 } }); }
function headCard(s, x, y, w, h, head, colour, fill) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
}
function bullets(s, x, y, w, items, size = 18, gap = 0.16) {
  items.forEach(t => { const th = D.textH(t, size, w - 0.3); txt(s, '•', x, y, 0.3, 0.4, { size, bold: true, color: C.accent }); txt(s, t, x + 0.3, y, w - 0.3, th + 0.05, { size }); y += th + gap; });
  return y;
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Auxin, phototropism and gravitropism, Required practical 8, and how gibberellins, ethene and auxins are used',
  bullets: ['Part 1: auxin and tropisms (4.5.4.1)', 'Part 2: Required practical 8: light or gravity and seedlings', 'Part 3: HT: gibberellins, ethene and uses of plant hormones (4.5.4.2)'],
  notes: 'AQA 8461 GCSE Biology 4.5, lesson 5 of 5: this completes topic 4.5. RP8 is separate Biology only. HT only: the roles of gibberellins and ethene, and all of 4.5.4.2 (uses of plant hormones). About two hours.',
});

D.objectives({
  tag: '4.5.4',
  items: [
    'Explain how **auxin** causes **phototropism** and **gravitropism**.',
    'Plan **RP8** and process the results.',
    '**HT:** describe the roles of **gibberellins** and **ethene**.',
    '**HT:** describe how plant hormones are **used** in farming and gardening.',
  ],
  keywords: ['auxin', 'phototropism', 'gravitropism', 'elongation', 'gibberellin', 'ethene'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is a hormone?', 'Why do plants need light?', 'What is a stimulus?', 'Which organelle absorbs light in a leaf cell?'],
  answers: ['A chemical carried to a target organ', 'For photosynthesis', 'A change in the environment', 'Chloroplast'],
  notes: 'Retrieval from lessons 1 and 3 and 4.4.1. Plant hormones move through the plant, not in blood.',
});

D.vocab({
  title: 'Key words', tag: '4.5.4',
  items: [
    { term: 'Auxin', def: 'A plant hormone made in the **tips** of shoots and roots. It controls **growth**.' },
    { term: 'Phototropism', def: 'A growth response to **light**. Shoots grow **towards** light.' },
    { term: 'Gravitropism', def: 'A growth response to **gravity**. Roots grow **down**, shoots grow **up**. (Also called geotropism.)' },
    { term: 'Elongation', def: 'Cells getting **longer**. Unequal elongation makes a shoot **bend**.' },
  ],
  notes: 'Plants produce hormones to coordinate and control growth and responses to light (phototropism) and gravity (gravitropism or geotropism).',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: auxin and phototropism', { tag: '4.5.4.1' });
  const x0 = MX + 2.0, y0 = 5.6;
  rect(s, x0 - 0.7, y0, 1.4, 0.9, 'A0704A', '6B4A2E');
  const P = t => [x0 + 1.4 * t * t, y0 - 3.6 * t];
  curve(s, P, STEM, 10);
  [0.35, 0.6].forEach((t, i) => { const [x, y] = P(t); leaf(s, x + (i ? 0.35 : -0.35), y); });
  [0.7, 0.8, 0.9].forEach(t => { const [x, y] = P(t); circle(s, x - 0.22, y, 0.14, AUX); });
  circle(s, MX + 5.6, 1.9, 0.8, 'F6D365', 'C9A227', 2);
  [[-0.2], [0.3], [0.8]].forEach(([dy]) => arrow(s, MX + 5.1, 2.1 + dy, MX + 4.2, 2.3 + dy, 'C9A227', 2));
  txt(s, 'light from one side', MX + 4.4, 3.35, 2.4, 0.4, { size: 14, bold: true, color: 'B08A18' });
  txt(s, 'auxin', MX + 1.4, 2.25, 1.0, 0.35, { size: 14, bold: true, color: AUX });
  const bx = MX + 7.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Why the shoot bends', C.maroon, C.soft);
  const st = ['Auxin is made in the **shoot tip**.', 'Light from one side makes auxin move to the **shaded side**.', 'Auxin makes shoot cells **elongate** (grow longer).', 'Shaded side grows **faster** than the lit side.', 'The shoot **bends towards the light**: more light for photosynthesis.'];
  st.forEach((t, i) => {
    const y = 2.15 + i * 0.92;
    circle(s, bx + 0.42, y + 0.22, 0.42, C.accent);
    txt(s, String(i + 1), bx + 0.21, y + 0.01, 0.42, 0.42, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, t, bx + 0.8, y, bw - 1.0, 0.85, { size: 17 });
  });
  notes(s, 'Spec 4.5.4.1: "Unequal distributions of auxin cause unequal growth rates in plant roots and shoots." Red dots = auxin collecting on the shaded side. Common error: "light kills auxin" or "the lit side grows towards light"; it is the shaded side growing faster.');
}

{
  const s = frame('Gravitropism: shoots and roots', { tag: '4.5.4.1' });
  const sx = MX + 3.5, sy = 3.9;
  rect(s, MX, sy + 1.95, 7.0, 0.3, 'C9B79C');
  txt(s, 'seedling laid on its side', MX, sy + 2.3, 7, 0.35, { size: 14, color: C.grey, align: 'center' });
  const Sh = t => [sx - 0.4 - 2.3 * t, sy - 2.3 * t * t * t];
  const Ro = t => [sx + 0.4 + 2.3 * t, sy + 1.6 * t * t * t];
  curve(s, Sh, STEM, 9); curve(s, Ro, 'C9A27A', 7);
  s.addShape(D.SH.ellipse, { x: sx - 0.5, y: sy - 0.3, w: 1.0, h: 0.6, fill: { color: 'B08050' }, line: { color: '6B4A2E', width: 1.5 } });
  [0.2, 0.35, 0.5].forEach(t => { const [x, y] = Sh(t); circle(s, x, y + 0.2, 0.13, AUX); });
  [0.2, 0.35, 0.5].forEach(t => { const [x, y] = Ro(t); circle(s, x, y + 0.18, 0.13, AUX); });
  txt(s, 'shoot grows up', MX + 1.3, 1.5, 2.5, 0.4, { size: 16, bold: true, color: STEM });
  txt(s, 'root grows down', MX + 2.9, 5.2, 2.4, 0.4, { size: 16, bold: true, color: 'A0704A' });
  txt(s, 'auxin on the lower side', MX + 2.7, 2.95, 3.0, 0.35, { size: 14, bold: true, color: AUX });
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.6, 'In the shoot', C.green, C.greenSoft);
  txt(s, 'Auxin collects on the **lower side** and **stimulates** elongation. Lower side grows faster: shoot bends **up**.', bx + 0.2, 2.1, bw - 0.4, 1.8, { size: 17 });
  headCard(s, bx, 4.25, bw, 2.6, 'In the root', 'A0704A', 'F6EDE3');
  txt(s, 'Auxin collects on the **lower side** but **inhibits** elongation in roots. Upper side grows faster: root bends **down**.', bx + 0.2, 4.95, bw - 0.4, 1.8, { size: 17 });
  notes(s, 'The key exam point: auxin has OPPOSITE effects in shoots (stimulates growth) and roots (inhibits growth). Roots growing down reach water and minerals and anchor the plant.');
}

D.hinge({
  title: 'Quick check',
  q: 'A shoot is lit from the left. Where does auxin collect, and which way does it bend?',
  options: ['Right side; bends left', 'Left side; bends left', 'Right side; bends right', 'Tip only; grows straight up'],
  correct: 0,
  notes: 'Answer A: auxin moves to the shaded (right) side, which elongates more, so the shoot bends left, towards the light.',
});

D.myTurnYourTurn({
  title: 'Explaining tropisms', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain why a shoot grows towards light.  [4 marks]',
    steps: [
      { label: 'Made', text: '**Auxin made in the tip**' },
      { label: 'Moves', text: '**To the shaded side**' },
      { label: 'Effect', text: '**Cells there elongate more**' },
      { label: 'Result', text: '**Shoot bends to the light**' },
    ],
  },
  yours: {
    q: 'Explain why a root grows downwards.  [3 marks]',
    steps: [
      { label: 'Gravity', text: '**Auxin on the lower side**' },
      { label: 'Effect', text: '**Inhibits elongation there**' },
      { label: 'Result', text: '**Upper side grows faster**' },
    ],
  },
  notes: 'Yours: the root bends down because the upper side grows faster. Mention that auxin INHIBITS growth in roots.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: Required practical 8', { tag: 'RP8' });
  // box with a slit, lamp outside, seedlings bending to the slit
  const bx0 = MX + 0.3, by0 = 2.0, bw0 = 4.4, bh0 = 3.0;
  rect(s, bx0, by0, bw0, bh0, 'E9DCC6', '8A6E4A', { lw: 3 });
  rect(s, bx0 + bw0 - 0.1, by0 + 1.0, 0.2, 0.6, C.white, C.white);
  rect(s, bx0 + 0.6, by0 + bh0 - 0.5, 2.8, 0.3, 'D9EAF5', C.accent);
  for (let i = 0; i < 6; i++) { const x = bx0 + 0.85 + i * 0.45, y = by0 + bh0 - 0.5; curve(s, t => [x + 0.35 * t * t, y - 1.3 * t], STEM, 3, 10); }
  circle(s, bx0 + bw0 + 1.0, by0 + 1.3, 0.7, 'F6D365', 'C9A227', 2);
  arrow(s, bx0 + bw0 + 0.6, by0 + 1.3, bx0 + bw0 - 0.3, by0 + 1.3, 'C9A227', 2.5);
  txt(s, 'box with a slit: light from one side', bx0, by0 + bh0 + 0.1, 5.5, 0.4, { size: 14, bold: true });
  txt(s, 'cress seedlings on damp cotton wool', bx0, by0 + bh0 + 0.5, 5.5, 0.4, { size: 14, color: C.grey });
  const cx = MX + 6.4, cw = W - MX - cx;
  headCard(s, cx, 1.4, cw, 2.9, 'Method', C.maroon, C.soft);
  bullets(s, cx + 0.2, 2.1, cw - 0.4, ['Germinate seeds; put **equal numbers** in dishes.', 'Light from one side (box with a slit), all round, or none. **For gravity:** lay a dish on its side in the dark.', 'After a few days, measure **length** (ruler) or **angle** of bending (protractor).'], 16, 0.08);
  headCard(s, cx, 4.45, cw, 2.4, 'Control variables', C.green, C.greenSoft);
  bullets(s, cx + 0.2, 5.15, cw - 0.4, ['Same type and number of seeds.', 'Same **water**, **temperature** and time.', 'Same light intensity (same lamp, same distance).'], 16, 0.06);
  notes(s, 'RP8 (separate Biology only): "investigate the effect of light or gravity on the growth of newly germinated seedlings." Record results in a table, calculate means, and draw conclusions. Seedlings are measured with a ruler (mm) and bending angle with a protractor.');
}

{
  const s = frame('RP8: processing the results', { tag: 'RP8 data' });
  const cw0 = 3.3, cw = (W - 2 * MX - cw0) / 6;
  [['Seedling height (mm)', '1', '2', '3', '4', '5', 'Mean'], ['Light all round', ...LIGHT.map(String), '24'], ['Kept in the dark', ...DARK.map(String), '40']].forEach((r, i) => r.forEach((c, j) => {
    const x = j === 0 ? MX : MX + cw0 + (j - 1) * cw, w = j === 0 ? cw0 : cw, y = 1.5 + i * 0.72;
    rect(s, x, y, w, 0.72, i === 0 ? C.maroon : j === 6 ? C.greenSoft : C.white, i === 0 ? C.maroon : C.line);
    txt(s, c, x + 0.15, y, w - 0.3, 0.72, { size: 19, bold: i === 0 || j === 0 || j === 6, color: i === 0 ? C.white : j === 6 ? C.green : C.ink, align: j === 0 ? 'left' : 'center', valign: 'middle' });
  }));
  rect(s, MX, 3.95, W - 2 * MX, 2.9, C.soft, C.line);
  txt(s, 'Conclusions', MX + 0.3, 4.05, 6, 0.45, { size: 20, bold: true, color: C.maroon });
  bullets(s, MX + 0.3, 4.6, W - 2 * MX - 0.6, ['Seedlings in the dark grew **taller**, but were thin and **yellow** (no chlorophyll): they grow fast to look for light.', 'Mean in the dark is 16 mm more: (40 − 24) ÷ 24 × 100 = **66.7%** taller.', 'Seedlings lit from one side **bend towards the light** (phototropism).'], 18, 0.12);
  notes(s, 'Sample results, not real data. Growing tall and pale in the dark is called etiolation (not on the spec). Exam skills: calculate means, percentage change, spot anomalies, suggest control variables.');
}

D.myTurnYourTurn({
  title: 'Mean seedling height', tag: 'Maths skill', stepSize: 21, labelW: 1.75, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Light all round: 22, 25, 23, 26, 24 mm. Find the mean and range.',
    steps: [
      { label: 'Total', text: '**120 mm**' },
      { label: 'Mean', text: '**120 ÷ 5 = 24 mm**' },
      { label: 'Range', text: '**22 to 26 mm**' },
    ],
  },
  yours: {
    q: 'In the dark: 41, 38, 40, 42, 39 mm. Find the mean and range.',
    steps: [
      { label: 'Total', text: '**200 mm**' },
      { label: 'Mean', text: '**200 ÷ 5 = 40 mm**' },
      { label: 'Range', text: '**38 to 42 mm**' },
    ],
  },
  notes: 'A small range means the repeats agree closely (repeatable results).',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: gibberellins and ethene', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Gibberellins', C.maroon, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Important in starting **seed germination**.', 'Also promote **flowering** and the growth of **fruit**.'], 19, 0.3);
  headCard(s, MX + cw + gap, top, cw, h, 'Ethene', C.orange, C.orangeSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['A **gas** made by plants.', 'Controls **cell division**.', 'Controls the **ripening of fruit**.', 'One ripe fruit gives off ethene, which ripens the fruit around it.'], 19, 0.3);
  notes(s, 'HT 4.5.4.1: "Gibberellins are important in initiating seed germination. Ethene controls cell division and ripening of fruits."');
}

{
  const s = frame('Using plant hormones', HT);
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Auxins', C.green, C.greenSoft);
  bullets(s, MX + 0.2, top + 0.8, cw - 0.4, ['**Weed killers**: selective, kill broad-leaved weeds but not grasses or cereal crops.', '**Rooting powders**: cuttings grow roots quickly.', '**Tissue culture**: promote growth.'], 17, 0.25);
  headCard(s, MX + cw + gap, top, cw, h, 'Ethene', C.orange, C.orangeSoft);
  bullets(s, MX + cw + gap + 0.2, top + 0.8, cw - 0.4, ['Controls **ripening** of fruit during storage and transport.', 'Fruit is picked unripe (firm, less damage), then ripened with ethene **near the shop**.'], 17, 0.25);
  headCard(s, MX + 2 * (cw + gap), top, cw, h, 'Gibberellins', C.maroon, C.soft);
  bullets(s, MX + 2 * (cw + gap) + 0.2, top + 0.8, cw - 0.4, ['End **seed dormancy** (e.g. in brewing).', 'Promote **flowering**.', 'Increase **fruit size**, e.g. seedless grapes.'], 17, 0.25);
  notes(s, 'HT 4.5.4.2 lists exactly these uses. Evaluation point: selective weed killers increase crop yield, but can harm other plants and wildlife.');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'Bananas are picked green and ripened before sale. Which hormone ripens them?',
  options: ['Ethene', 'Auxin', 'Gibberellin', 'Insulin'],
  correct: 0,
  notes: 'Answer A. B is used in weed killers and rooting powders. C ends dormancy, promotes flowering and increases fruit size. D is an animal hormone.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Where is auxin made?', 'In the tips of shoots and roots'], ['What is phototropism?', 'Growth in response to light'], ['What does auxin do to shoot cells?', 'Makes them elongate'], ['What does auxin do in roots?', 'Inhibits elongation'],
    ['Why is it useful for a shoot to grow towards light?', 'More light for photosynthesis'], ['RP8: give two control variables.', 'Same seeds, water, temperature, time'],
    ['Mean height: 24 mm in light, 40 mm in the dark. How much taller in the dark, as a %?', '66.7%'], ['HT  Give two uses of auxins.', 'Weed killers; rooting powders'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 22, start: k });
    notes(s, 'Answers: 1) tips of shoots and roots  2) a growth response to light  3) stimulates elongation  4) inhibits elongation  5) more light absorbed, more photosynthesis, more glucose  6) type and number of seeds, water, temperature, time, light intensity  7) (40 − 24) ÷ 24 × 100 = 66.7%  8) selective weed killers, rooting powders, promoting growth in tissue culture.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Name the plant hormone that causes phototropism.', m: 1, lines: 0 },
    { l: 'b', q: 'A seedling is lit from one side. Explain why it bends towards the light.', m: 3, lines: 1 },
    { l: 'c', q: 'In RP8, four seedlings grew 18, 21, 19 and 22 mm. Calculate the mean, and give two variables the student should control.', m: 3, lines: 1 },
    { l: 'd', q: 'HT  Describe three ways plant hormones are used in agriculture or horticulture. Name the hormone each time.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'auxin', '1', ''],
    ['(b)', 'auxin moves to the shaded side; cells there elongate more; shaded side grows faster, so it bends to the light', '3', ''],
    ['(c)', 'mean = 20 mm; any two: seed type/number, water, temperature, time, light intensity', '3', '1 + 2'],
    ['(d)', 'any three: auxin – weed killer / rooting powder / tissue culture; ethene – ripening; gibberellin – end dormancy / flowering / fruit size', '3', 'use + hormone needed'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What is gravitropism?', 'Which side of a shoot lit from one side grows faster?', 'In RP8, how is bending measured?', 'HT  What does gibberellin do to seeds?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) growth in response to gravity  2) the shaded side  3) with a protractor (angle)  4) starts germination / ends dormancy. Revisit the objectives: topic 4.5 is complete.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw labelled diagrams to explain phototropism in a shoot.',
    'Explain why roots and shoots respond differently to gravity.',
    'Plan RP8 to test the effect of gravity on root growth.',
    'Results (mm): 15, 12, 14, 11. Calculate the mean.',
    'HT  Explain why fruit is picked unripe and ripened with ethene.',
    'HT  Evaluate the use of selective weed killers on a wheat farm.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) light, auxin to shaded side, elongation, bending  2) auxin collects on lower side; stimulates elongation in shoots but inhibits it in roots  3) seedlings on their side in the dark; measure angle of roots; controls  4) 52 ÷ 4 = 13 mm  5) firm unripe fruit is damaged less in transport and lasts longer; ripened when needed  6) more yield, less competition; but cost, harm to wildflowers and insects; conclusion.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.5_E_PlantHormones.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
