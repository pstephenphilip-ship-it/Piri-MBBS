// build_4_5_C.js — AQA GCSE Biology (8461) 4.5 Homeostasis and response, lesson 3 of 5:
// 4.5.2.4 Control of body temperature, 4.5.3.1 The human endocrine system, 4.5.3.2 Control of blood glucose (HT: glucagon).
// One two-hour lesson for a Higher student.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_5_C.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C, calc } = T;

const DECK = {
  code: '4.5.2.4–4.5.3.2', title: 'Temperature and blood glucose',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const pct = (a, b) => (b - a) / a * 100;

// ======================= numbers (all checked) =======================
calc('graph', pct(80, 120), 50); calc('P8', pct(90, 135), 50); calc('exam c', pct(80, 200), 150); calc('HW5', pct(75, 105), 40);

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
function badge(s, x, y, n) { circle(s, x, y, 0.38, C.maroon); txt(s, String(n), x - 0.19, y - 0.19, 0.38, 0.38, { size: 14, bold: true, color: C.white, align: 'center', valign: 'middle' }); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Controlling body temperature, the endocrine glands, insulin and glucagon, and type 1 and type 2 diabetes',
  bullets: ['Part 1: control of body temperature (4.5.2.4)', 'Part 2: the endocrine system (4.5.3.1)', 'Part 3: blood glucose: insulin and glucagon (4.5.3.2)', 'Part 4: type 1 and type 2 diabetes'],
  notes: 'AQA 8461 GCSE Biology 4.5, lesson 3 of 5. Body temperature (4.5.2.4) is separate Biology only. HT only: glucagon and the negative feedback cycle between insulin and glucagon. Lesson 4: water balance, the kidney, and hormones in reproduction. About two hours.',
});

D.objectives({
  tag: '4.5.2.4, 4.5.3',
  items: [
    'Explain how the body **cools down** and **warms up**.',
    'Name the **endocrine glands** and compare hormones with nerves.',
    'Explain how **insulin** (and **HT: glucagon**) control blood glucose.',
    'Compare **type 1** and **type 2 diabetes** and how they are treated.',
  ],
  keywords: ['thermoregulatory', 'vasodilation', 'hormone', 'insulin', 'glucagon', 'glycogen'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is homeostasis?', 'What are the two types of effector?', 'Which part of the brain controls breathing?', 'How do plants store glucose? How do animals?'],
  answers: ['Keeping internal conditions at the optimum', 'Muscles and glands', 'Medulla', 'Starch; glycogen'],
  notes: 'Retrieval from lessons 1 and 2, and 4.4.2 metabolism (glycogen). Glands are today\'s effectors.',
});

D.vocab({
  title: 'Key words', tag: '4.5.2.4, 4.5.3',
  items: [
    { term: 'Thermoregulatory centre', def: 'Part of the **brain** that monitors and controls **body temperature**.' },
    { term: 'Hormone', def: 'A **chemical** made by a **gland**, carried in the **blood** to a target organ.' },
    { term: 'Insulin', def: 'A hormone from the **pancreas** that makes cells take in glucose: **lowers** blood glucose.' },
    { term: 'Glycogen', def: 'An insoluble **storage** molecule made from glucose, in the **liver** and **muscles**.' },
  ],
  notes: 'Glucagon (HT) raises blood glucose. Do not confuse glucagon (hormone) and glycogen (storage).',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: controlling body temperature', { tag: '4.5.2.4' });
  rect(s, MX, 1.4, W - 2 * MX, 1.0, C.soft, C.line);
  txt(s, 'The **thermoregulatory centre** in the brain has receptors sensitive to the **temperature of the blood**. Receptors in the **skin** send it impulses about skin temperature.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.0, { size: 18, valign: 'middle' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.6, h = 4.25;
  headCard(s, MX, top, cw, h, 'Too hot', C.red, 'FBEDEB');
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['**Sweating**: sweat evaporates from the skin, transferring energy away.', '**Vasodilation**: blood vessels supplying the skin capillaries **widen**. More blood flows near the surface, so more energy is lost.'], 18, 0.25);
  headCard(s, MX + cw + gap, top, cw, h, 'Too cold', C.blue, C.blueSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['**Vasoconstriction**: blood vessels supplying the skin capillaries **narrow**. Less blood near the surface, so less energy is lost.', '**Shivering**: muscles contract rapidly; **respiration** releases energy.', 'Sweating stops.'], 18, 0.25);
  notes(s, 'Spec 4.5.2.4 (separate Biology only). Effectors: sweat glands, muscles in the walls of the arterioles, skeletal muscles. Common errors: "the blood vessels move closer to the skin" (they do not move) and "capillaries dilate" (capillaries have no muscle; it is the arterioles supplying them that dilate or constrict).');
}

{
  const s = frame('Vasodilation and vasoconstriction', { tag: '4.5.2.4' });
  const skin = (x, wide, lab, col) => {
    const w = 5.6;
    rect(s, x, 1.55, w, 0.35, 'E8C9B5', 'B08A72');
    txt(s, 'skin surface', x + w - 1.6, 1.55, 1.5, 0.35, { size: 13, color: C.grey, valign: 'middle' });
    rect(s, x, 1.9, w, 2.6, 'F6E7DD', 'B08A72');
    rect(s, x + 0.6, 2.35, w - 1.2, wide ? 0.42 : 0.12, 'D9534F', 'B03A2E');
    rect(s, x + 0.6, 3.55, w - 1.2, 0.3, 'D9534F', 'B03A2E');
    txt(s, 'capillary near the surface', x + 0.6, wide ? 2.8 : 2.5, 4, 0.35, { size: 13, color: C.grey });
    txt(s, 'deeper blood vessel', x + 0.6, 3.88, 4, 0.35, { size: 13, color: C.grey });
    if (wide) [0.9, 2.0, 3.1].forEach(dx => arrow(s, x + dx, 2.25, x + dx, 1.45, C.red, 2));
    txt(s, lab, x, 4.6, w, 0.45, { size: 20, bold: true, color: col, align: 'center' });
  };
  skin(MX, true, 'Hot: vasodilation, more energy lost', C.red);
  skin(MX + 6.5, false, 'Cold: vasoconstriction, less energy lost', C.blue);
  rect(s, MX, 5.3, W - 2 * MX, 1.55, C.orangeSoft, 'F3D9B5');
  txt(s, '**Exam language:** say the blood vessels supplying the skin capillaries **dilate** or **constrict**. Never say they "move" towards or away from the skin.', MX + 0.3, 5.3, W - 2 * MX - 0.6, 1.55, { size: 19, valign: 'middle' });
  notes(s, 'Red arrows = energy transferred to the surroundings by radiation. Simplified cross-section.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does shivering warm the body?',
  options: ['Muscles contract, and respiration releases energy', 'It moves blood vessels away from the skin', 'It makes the skin sweat less', 'It makes the hair fall out'],
  correct: 0,
  notes: 'Answer A. B: vessels do not move. C: true that sweating stops, but that is not what shivering does. D is nonsense.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the endocrine system', { tag: '4.5.3.1' });
  // simple body outline with gland badges
  const bx = MX + 2.5, hy = 2.0;
  circle(s, bx, hy, 1.0, 'F6E7DD', '9C7A68', 2);
  rect(s, bx - 1.0, hy + 0.65, 2.0, 3.9, 'F6E7DD', '9C7A68');
  const gl = [[bx, hy - 0.05, 1], [bx, hy + 0.85, 2], [bx + 0.45, hy + 1.85, 3], [bx - 0.5, hy + 1.85, 4], [bx - 0.4, hy + 3.3, 5], [bx + 0.4, hy + 3.3, 6], [bx + 0.35, hy + 4.2, 7]];
  gl.forEach(([x, y, n]) => badge(s, x, y, n));
  const items = [['Pituitary', 'The **master gland**: its hormones make other glands release hormones.'], ['Thyroid', '**Thyroxine**: controls metabolic rate.'], ['Pancreas', '**Insulin** (and glucagon): control blood glucose.'], ['Adrenal glands', '**Adrenaline**: "fight or flight".'], ['Ovaries', '**Oestrogen**: female puberty and menstrual cycle.'], ['Ovaries (cont.)', 'and progesterone (lesson 4).'], ['Testes', '**Testosterone**: male puberty and sperm production.']];
  const kx = MX + 5.0, kw = W - MX - kx;
  [0, 1, 2, 3, 4, 6].forEach((k, i) => {
    const [a, b] = items[k], y = 1.4 + i * 0.9;
    rect(s, kx, y, kw, 0.82, i % 2 ? C.white : C.soft, C.line);
    badge(s, kx + 0.32, y + 0.41, k === 6 ? 7 : k + 1);
    txt(s, a, kx + 0.65, y, 2.1, 0.82, { size: 17, bold: true, valign: 'middle' });
    txt(s, b, kx + 2.75, y, kw - 2.85, 0.82, { size: 16, valign: 'middle' });
  });
  notes(s, 'Spec 4.5.3.1: students should be able to identify the position of the pituitary gland, pancreas, thyroid, adrenal gland, ovary and testes on a diagram. Badges 5 and 6 are both ovaries (a pair); 7 = testes, shown for a male. Simplified outline.');
}

{
  const s = frame('Hormones compared with nerves', { tag: '4.5.3.1' });
  const head = ['', 'Nervous system', 'Endocrine system'];
  const rows = [['Message', 'Electrical impulses', 'Chemicals (hormones)'], ['Carried by', 'Neurones', 'The blood'], ['Speed', 'Very fast', 'Slower'], ['How long it lasts', 'Short', 'Longer'], ['Where it acts', 'Precise area', 'Target organs, often widespread']];
  const cws = [3.4, (W - 2 * MX - 3.4) / 2, (W - 2 * MX - 3.4) / 2], ty = 1.5, rh = 0.8;
  head.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, ty, cws[j], 0.65, j === 1 ? '7A4E9C' : j === 2 ? C.green : C.maroon); txt(s, t, x + 0.2, ty, cws[j] - 0.4, 0.65, { size: 19, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0), y = ty + 0.65 + i * rh; rect(s, x, y, cws[j], rh, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.2, y, cws[j] - 0.4, rh, { size: 19, bold: j === 0, valign: 'middle' }); }));
  notes(s, 'Spec 4.5.3.1: "The endocrine system is composed of glands which secrete chemicals called hormones directly into the bloodstream. The blood carries the hormone to a target organ where it produces an effect. Compared to the nervous system the effects are slower but act for longer."');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: controlling blood glucose', { tag: '4.5.3.2' });
  const y = 1.5, h = 1.15, n = 4, gap = 0.42, bw = (W - 2 * MX - (n - 1) * gap) / n;
  const steps = [['Blood glucose too high', 'e.g. after a meal'], ['Pancreas', 'detects it and releases insulin'], ['Insulin', 'makes cells take in glucose from the blood'], ['Liver and muscles', 'convert glucose into glycogen']];
  steps.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap);
    rect(s, x, y, bw, 2.0, C.white, C.maroon, { lw: 2 }); rect(s, x, y, bw, 0.62, C.maroon);
    txt(s, a, x + 0.1, y, bw - 0.2, 0.62, { size: 16, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, b, x + 0.15, y + 0.72, bw - 0.3, 1.2, { size: 17, align: 'center' });
    if (i < n - 1) arrow(s, x + bw + 0.04, y + 1.0, x + bw + gap - 0.04, y + 1.0, C.ink, 2.5);
  });
  // graph
  const G = graph(D, s, MX + 1.0, 4.25, 6.4, 2.2, [0, 4], [60, 140], { gridX: 0.5, gridY: 20, labX: 1, labY: 20, axesAtEdge: true, xTitle: 'Time after a meal (hours)', yTitle: 'Blood glucose (mg per 100 cm³)' });
  G.curve(t => 80 + 40 * Math.max(0, Math.sin(Math.min(t, 2.6) / 2.6 * Math.PI)) * (t < 2.6 ? 1 : 0), 0, 4, C.red, 3.5, 160);
  const bx = MX + 8.0, bw2 = W - MX - bx;
  rect(s, bx, 4.0, bw2, 2.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Glucose rises from 80 to 120 after the meal: an increase of **40 ÷ 80 × 100 = 50%**. Insulin brings it back down within about 2–3 hours.', bx + 0.2, 4.05, bw2 - 0.4, 2.75, { size: 17, valign: 'middle' });
  notes(s, 'Spec 4.5.3.2: "Blood glucose concentration is monitored and controlled by the pancreas. If the blood glucose concentration is too high, the pancreas produces the hormone insulin that causes glucose to move from the blood into the cells. In liver and muscle cells excess glucose is converted to glycogen for storage." Sketch data for a person without diabetes.');
}

{
  const s = frame('Glucagon and negative feedback', HT);
  // cycle diagram
  const cx = MX + 3.4, cy = 4.15;
  const box = (x, y, w, h, t, col, fill) => { rect(s, x, y, w, h, fill, col, { lw: 2 }); txt(s, t, x + 0.1, y, w - 0.2, h, { size: 16, bold: true, align: 'center', valign: 'middle' }); };
  box(cx - 1.4, cy - 0.45, 2.8, 0.9, 'Normal blood glucose', C.green, C.greenSoft);
  box(cx - 1.5, 1.5, 3.0, 0.85, 'Too HIGH: pancreas releases insulin', C.red, 'FBEDEB');
  box(cx - 1.5, 6.0, 3.0, 0.85, 'Too LOW: pancreas releases glucagon', C.blue, C.blueSoft);
  arrow(s, cx - 1.4, cy - 0.45, cx - 1.1, 2.4, C.ink, 2);
  arrow(s, cx + 1.1, 2.4, cx + 1.4, cy - 0.45, C.red, 2.5);
  txt(s, 'glucose → glycogen', cx + 1.25, 2.85, 2.4, 0.4, { size: 14, bold: true, color: C.red });
  arrow(s, cx - 1.4, cy + 0.45, cx - 1.1, 5.95, C.ink, 2);
  arrow(s, cx + 1.1, 5.95, cx + 1.4, cy + 0.45, C.blue, 2.5);
  txt(s, 'glycogen → glucose', cx + 1.25, 5.1, 2.4, 0.4, { size: 14, bold: true, color: C.blue });
  txt(s, 'rises', cx - 2.4, 2.85, 1.0, 0.4, { size: 14, bold: true, color: C.grey });
  txt(s, 'falls', cx - 2.4, 5.1, 1.0, 0.4, { size: 14, bold: true, color: C.grey });
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Negative feedback', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['If glucose is **too low**, the pancreas releases **glucagon**.', 'Glucagon makes the **liver** convert **glycogen back into glucose**, which is released into the blood.', '**Negative feedback**: any change away from normal triggers a response that **reverses** it.', 'Insulin and glucagon work **against** each other to keep glucose steady.'], 17, 0.18);
  notes(s, 'Spec 4.5.3.2 (HT only): "If the blood glucose concentration is too low, the pancreas produces the hormone glucagon that causes glycogen to be converted into glucose and released into the blood. Students should be able to explain how glucagon interacts with insulin in a negative feedback cycle to control blood glucose (sugar) levels in the body." Spelling trap: glucaGON (hormone) vs glycoGEN (stored).');
}

D.hinge({
  title: 'Quick check', tag: 'HT  Higher only',
  q: 'Blood glucose falls during exercise. What does the pancreas release?',
  options: ['Glucagon, so glycogen is converted to glucose', 'Insulin, so glucose moves into cells', 'Glycogen, which is carried in the blood', 'Glucagon, so glucose is converted to glycogen'],
  correct: 0,
  notes: 'Answer A. B would lower glucose further. C: glycogen is a storage molecule, not a hormone. D has the conversion backwards.',
});

D.myTurnYourTurn({
  title: 'Explaining glucose control', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Describe how blood glucose returns to normal after a meal.  [4 marks]',
    steps: [
      { label: 'Detect', text: '**Pancreas detects it**' },
      { label: 'Hormone', text: '**Releases insulin**' },
      { label: 'Cells', text: '**Cells take in glucose**' },
      { label: 'Store', text: '**Stored as glycogen**' },
    ],
  },
  yours: {
    q: 'HT  Describe how blood glucose returns to normal after missing a meal.  [4 marks]',
    steps: [
      { label: 'Detect', text: '**Pancreas detects it**' },
      { label: 'Hormone', text: '**Releases glucagon**' },
      { label: 'Liver', text: '**Glycogen → glucose**' },
      { label: 'Blood', text: '**Glucose into the blood**' },
    ],
  },
  notes: 'Both are the same chain: detect → hormone → target organ → result. Name the organ (pancreas, liver) and the molecule (glycogen) precisely.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: diabetes', { tag: '4.5.3.2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 5.45;
  headCard(s, MX, top, cw, h, 'Type 1 diabetes', C.maroon, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['The pancreas **produces too little insulin** (or none).', 'Blood glucose is **uncontrollably high**.', 'Usually starts in **childhood**.', '**Treatment:** insulin **injections** (or a pump), plus a careful diet.'], 18, 0.22);
  headCard(s, MX + cw + gap, top, cw, h, 'Type 2 diabetes', C.orange, C.orangeSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Body cells **no longer respond** to insulin.', 'Blood glucose rises.', '**Obesity** is a major **risk factor**.', '**Treatment:** a **carbohydrate-controlled diet** and **exercise**; sometimes drugs.'], 18, 0.22);
  notes(s, 'Spec 4.5.3.2: "Type 1 diabetes is a disorder in which the pancreas fails to produce sufficient insulin. It is characterised by uncontrolled high blood glucose levels and is normally treated with insulin injections. In Type 2 diabetes the body cells no longer respond to insulin produced by the pancreas. A carbohydrate controlled diet and an exercise regime are common treatments. Obesity is a risk factor for Type 2 diabetes." Students should be able to compare them and interpret data.');
}

{
  const s = frame('Reading glucose data', { tag: '4.5.3.2 data' });
  const G = graph(D, s, MX + 1.0, 1.75, 7.0, 4.4, [0, 4], [60, 260], { gridX: 0.5, gridY: 20, labX: 1, labY: 40, axesAtEdge: true, xTitle: 'Time after drinking glucose (hours)', yTitle: 'Blood glucose (mg per 100 cm³)' });
  G.curve(t => 80 + 40 * (t < 2.6 ? Math.sin(t / 2.6 * Math.PI) : 0), 0, 4, C.green, 3.5, 160);
  G.curve(t => 110 + 120 * (1 - Math.exp(-t / 0.8)) - 25 * Math.max(0, t - 2), 0, 4, C.red, 3.5, 160);
  txt(s, 'without diabetes', G.px(2.5), G.py(118), 2.2, 0.35, { size: 14, bold: true, color: C.green });
  txt(s, 'type 1 diabetes', G.px(1.4), G.py(250), 2.2, 0.35, { size: 14, bold: true, color: C.red });
  const bx = MX + 8.5, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Compare the lines', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['Diabetic person starts **higher** and rises **much higher**.', 'Without diabetes, glucose returns to normal in about **2–3 hours**.', 'With type 1, it stays high: there is **no insulin** to move glucose into cells.'], 17, 0.22);
  notes(s, 'Sketch data from a glucose tolerance test. Typical exam tasks: read values, calculate a change or percentage change, and explain the difference using insulin.');
}

D.hinge({
  title: 'Quick check',
  q: 'What is the main treatment for type 1 diabetes?',
  options: ['Insulin injections', 'Glucagon injections', 'A high-sugar diet', 'Antibiotics'],
  correct: 0,
  notes: 'Answer A. B would raise glucose further. C is the opposite of what is needed. D treats bacterial infections.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Where is the thermoregulatory centre?', 'In the brain'], ['Name the hormone made by the thyroid gland.', 'Thyroxine'], ['Which gland is called the "master gland"?', 'The pituitary gland'], ['What does insulin do?', 'Makes glucose move from the blood into cells'],
    ['Explain how sweating cools the body.', 'Sweat evaporates, transferring energy from the skin'], ['Why is obesity linked to type 2 diabetes?', 'It is a risk factor: cells stop responding to insulin'],
    ['HT  Which hormone makes the liver convert glycogen to glucose?', 'Glucagon'], ['Glucose rises from 90 to 135. Calculate the percentage increase.', '50%'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) the brain  2) thyroxine  3) pituitary  4) causes glucose to move from the blood into cells (and to be stored as glycogen)  5) evaporation of sweat transfers energy away from the skin  6) obesity is a risk factor; body cells become resistant to insulin  7) glucagon  8) 45 ÷ 90 × 100 = 50%.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'A runner gets very hot. Describe two ways her body cools down.', m: 2, lines: 1 },
    { l: 'b', q: 'Name the gland that releases insulin.', m: 1, lines: 0 },
    { l: 'c', q: 'After a meal, a person with type 1 diabetes had blood glucose of 200 mg per 100 cm³. Before the meal it was 80. Calculate the percentage increase.', m: 2, lines: 1 },
    { l: 'd', q: 'Compare the causes and treatments of type 1 and type 2 diabetes.', m: 3, lines: 1 },
    { l: 'e', q: 'HT  Explain how glucagon raises blood glucose.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'sweating (evaporation transfers energy); vasodilation of vessels supplying skin capillaries', '2', 'not "vessels move"'],
    ['(b)', 'pancreas', '1', ''],
    ['(c)', '120 ÷ 80 × 100 = 150%', '2', '1 for 120 ÷ 80 or 1.5'],
    ['(d)', 'type 1: pancreas makes too little insulin, treated with injections; type 2: cells stop responding, treated with diet and exercise', '3', 'max 2 if no comparison'],
    ['(e)', 'liver converts glycogen into glucose; glucose released into the blood', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What happens to blood vessels near the skin when you are cold?', 'Name the hormone made by the adrenal glands.', 'Where is glycogen stored?', 'Give one risk factor for type 2 diabetes.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) vasoconstriction: the vessels supplying the skin capillaries narrow  2) adrenaline  3) liver and muscles  4) obesity. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain how the body responds when it gets too cold.',
    'Draw a body outline and mark the six endocrine glands.',
    'Give three differences between nervous and hormonal control.',
    'HT  Draw the negative feedback cycle for blood glucose.',
    'Glucose rises from 75 to 105. Calculate the percentage increase.',
    'Suggest why type 2 diabetes is becoming more common in the UK.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) vasoconstriction; shivering (respiration releases energy); sweating stops  2) pituitary, thyroid, pancreas, adrenals, ovaries, testes  3) impulses vs chemicals; neurones vs blood; fast vs slow; short vs long-lasting  4) high → insulin → glucose into cells/glycogen → normal; low → glucagon → glycogen to glucose → normal  5) 30 ÷ 75 × 100 = 40%  6) rising obesity; less exercise; high-sugar diets.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.5_C_TemperatureHormonesGlucose.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
