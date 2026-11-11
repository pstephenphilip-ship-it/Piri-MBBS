// build_4_2_B.js — AQA GCSE Biology (8461) 4.2 Organisation, lesson 2 of 3:
// 4.2.2.2 The heart and blood vessels (and the lungs), 4.2.2.3 Blood, 4.2.2.4 Coronary heart disease.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_2_B.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.2.2.2–4.2.2.4', title: 'The heart, lungs and blood',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const F = (n, d) => ({ n, d });
const RED = 'C0392B', BLU = '2F5DA8';

// ======================= numbers (all checked) =======================
calc('ex', 3000 / 4, 750); calc('MT', 1800 / 3, 600); calc('YT', 2500 / 5, 500); calc('breath', 45 / 3, 15);
calc('P8', 4800 / 6, 800); calc('exam', 2400 / 2, 1200); calc('HW', 900 / 1.5, 600);

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
function twoCards(s, top, h, a, b, ca, cb, fa, fb, size = 18) {
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, top, cw, h, a[0], ca, fa); bullets(s, MX + 0.25, top + 0.8, cw - 0.5, a[1], size, 0.18);
  headCard(s, MX + cw + gap, top, cw, h, b[0], cb, fb); bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, b[1], size, 0.18);
}
function box(s, x, y, w, h, t, col, fill, size = 15) { rect(s, x, y, w, h, fill, col, { lw: 2 }); txt(s, t, x + 0.05, y, w - 0.1, h, { size, bold: true, align: 'center', valign: 'middle', color: col }); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'The heart and double circulation, the lungs, arteries, veins and capillaries, the blood, and coronary heart disease',
  bullets: ['Part 1: the heart and circulation (4.2.2.2)', 'Part 2: the lungs and blood vessels (4.2.2.2)', 'Part 3: the blood (4.2.2.3)', 'Part 4: coronary heart disease and treatments (4.2.2.4)'],
  notes: 'AQA 8461 GCSE Biology 4.2, lesson 2 of 3. Lesson 3: health, cancer and plant tissues. Diagrams are simplified. About two hours.',
});

D.objectives({
  tag: '4.2.2.2–4.2.2.4',
  items: [
    'Describe the **heart**, **double circulation** and the **pacemaker**.',
    'Explain how the **alveoli** and the **blood vessels** are adapted; calculate **rate of blood flow**.',
    'Describe the four parts of the **blood** and their functions.',
    'Explain **coronary heart disease** and **evaluate** its treatments.',
  ],
  keywords: ['atrium', 'ventricle', 'artery', 'capillary', 'plasma', 'stent'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is diffusion?', 'Give two adaptations of exchange surfaces.', 'Which organelle carries out aerobic respiration?', 'Divide 3000 by 4.'],
  answers: ['Net movement from high to low concentration', 'Large surface area; thin membrane', 'Mitochondria', '750'],
  notes: 'Retrieval from 4.1.3 and 4.1.1, plus the blood-flow calculation.',
});

D.vocab({
  title: 'Key words', tag: '4.2.2',
  items: [
    { term: 'Atrium / ventricle', def: '**Atria** are the top chambers that receive blood; **ventricles** pump blood out.' },
    { term: 'Double circulation', def: 'Blood passes through the heart **twice** per circuit: once to the **lungs**, once to the **body**.' },
    { term: 'Pacemaker', def: 'Cells in the **right atrium** that control the **resting heart rate**.' },
    { term: 'Coronary arteries', def: 'Supply the **heart muscle** itself with oxygenated blood.' },
  ],
  notes: 'Oxygenated: rich in oxygen (red on diagrams). Deoxygenated: low in oxygen (blue).',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the heart', { tag: '4.2.2.2' });
  const hx = MX + 1.6, hy = 2.0, cw = 2.0, ch = 1.6;
  box(s, hx, hy, cw, ch, 'right atrium', BLU, 'E3ECF8'); box(s, hx + cw + 0.15, hy, cw, ch, 'left atrium', RED, 'F8E3E1');
  box(s, hx, hy + ch + 0.15, cw, ch * 1.3, 'right ventricle', BLU, 'E3ECF8');
  rect(s, hx + cw + 0.15, hy + ch + 0.15, cw, ch * 1.3, 'F8E3E1', RED, { lw: 6 });
  txt(s, 'left ventricle (thicker wall)', hx + cw + 0.2, hy + ch + 0.15, cw - 0.1, ch * 1.3, { size: 15, bold: true, align: 'center', valign: 'middle', color: RED });
  txt(s, 'vena cava →', hx - 1.55, hy + 0.55, 1.5, 0.4, { size: 13, bold: true, color: BLU, align: 'right' });
  txt(s, '← pulmonary vein', hx + 2 * cw + 0.2, hy + 0.4, 1.25, 0.7, { size: 13, bold: true, color: RED });
  txt(s, '↑ pulmonary artery', hx, hy - 0.42, 2.2, 0.4, { size: 13, bold: true, color: BLU });
  txt(s, '↑ aorta', hx + cw + 0.6, hy - 0.42, 1.6, 0.4, { size: 13, bold: true, color: RED });
  circle(s, hx + 0.35, hy + 0.35, 0.3, C.orange); txt(s, 'pacemaker', hx + 0.55, hy + 1.15, 1.4, 0.35, { size: 12, bold: true, color: C.orange });
  txt(s, 'Viewed from the front: the heart\'s right side is on your left.', MX, 6.45, 6.5, 0.4, { size: 13, color: C.grey });
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Key facts', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['An **organ** that pumps blood around the body; walls are mostly **muscle**.', '**Right** side: deoxygenated blood to the **lungs**.', '**Left** side: oxygenated blood to the **body**; thicker muscle for higher pressure.', '**Valves** stop blood flowing backwards.', '**Pacemaker** cells set the rate; an artificial pacemaker can correct irregular beats.'], 15, 0.12);
  notes(s, 'Spec 4.2.2.2: "The heart is an organ that pumps blood around the body in a double circulatory system. The right ventricle pumps blood to the lungs where gas exchange takes place. The left ventricle pumps blood around the rest of the body." Students should know the structure and functioning of the heart: four chambers, the vena cava, pulmonary artery, pulmonary vein and aorta, and the coronary arteries. Simplified block diagram.');
}

{
  const s = frame('Double circulation', { tag: '4.2.2.2' });
  const lx = MX + 0.3, by = 1.6;
  box(s, lx + 2.4, by, 3.2, 0.9, 'LUNGS', C.accent, C.soft, 18);
  box(s, lx + 2.4, by + 2.1, 3.2, 1.1, 'HEART', C.maroon, 'F8E3E1', 20);
  box(s, lx + 2.4, by + 4.4, 3.2, 0.9, 'BODY', C.green, C.greenSoft, 18);
  arrow(s, lx + 2.6, by + 2.05, lx + 2.6, by + 0.95, BLU, 3); txt(s, 'deoxygenated', lx + 0.8, by + 1.25, 1.75, 0.35, { size: 13, bold: true, color: BLU, align: 'right' });
  arrow(s, lx + 5.4, by + 0.95, lx + 5.4, by + 2.05, RED, 3); txt(s, 'oxygenated', lx + 5.5, by + 1.25, 1.8, 0.35, { size: 13, bold: true, color: RED });
  arrow(s, lx + 5.4, by + 3.25, lx + 5.4, by + 4.35, RED, 3); txt(s, 'oxygenated', lx + 5.5, by + 3.6, 1.8, 0.35, { size: 13, bold: true, color: RED });
  arrow(s, lx + 2.6, by + 4.35, lx + 2.6, by + 3.25, BLU, 3); txt(s, 'deoxygenated', lx + 0.8, by + 3.6, 1.75, 0.35, { size: 13, bold: true, color: BLU, align: 'right' });
  const bx = MX + 7.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Why two circuits?', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['Blood goes through the heart **twice** per circuit.', 'After the lungs, blood returns to the heart to be pumped at **high pressure** to the body.', 'This delivers **oxygen** and **glucose** to cells quickly.'], 16, 0.25);
  notes(s, 'Fish have a single circulation. Mammals need double circulation to supply the high oxygen demand of respiration and keeping warm.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which chamber pumps blood to the body?',
  options: ['Left ventricle', 'Right ventricle', 'Left atrium', 'Right atrium'],
  correct: 0,
  notes: 'Answer A, through the aorta. B pumps to the lungs. Atria receive blood.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the lungs', { tag: '4.2.2.2' });
  const flowItems = [['Trachea', 'windpipe'], ['Bronchi', 'one to each lung'], ['Bronchioles', 'smaller tubes'], ['Alveoli', 'air sacs: gas exchange']];
  const gap = 0.4, bw = (W - 2 * MX - 3 * gap) / 4;
  flowItems.forEach(([a, b], i) => { const x = MX + i * (bw + gap); headCard(s, x, 1.45, bw, 1.6, a, C.accent, C.white); txt(s, b, x + 0.15, 2.1, bw - 0.3, 0.9, { size: 16, align: 'center' }); if (i < 3) arrow(s, x + bw + 0.04, 2.25, x + bw + gap - 0.04, 2.25); });
  // alveolus + capillary
  const ax = MX + 1.0, ay = 3.4;
  circle(s, ax + 1.3, ay + 1.6, 2.6, C.white, C.accent, 2.5); txt(s, 'alveolus (air)', ax + 0.4, ay + 1.4, 1.8, 0.4, { size: 14, bold: true, color: C.accent, align: 'center' });
  rect(s, ax + 2.75, ay + 0.3, 0.6, 2.6, 'F8E3E1', RED, { lw: 2 }); txt(s, 'capillary', ax + 3.45, ay + 1.4, 1.4, 0.35, { size: 13, bold: true, color: RED });
  arrow(s, ax + 1.9, ay + 1.1, ax + 2.95, ay + 1.1, RED, 2.5); txt(s, 'O₂', ax + 1.35, ay + 0.92, 0.5, 0.35, { size: 14, bold: true, color: RED });
  arrow(s, ax + 2.95, ay + 2.1, ax + 1.9, ay + 2.1, BLU, 2.5); txt(s, 'CO₂', ax + 1.2, ay + 1.92, 0.65, 0.35, { size: 14, bold: true, color: BLU });
  const bx = MX + 6.3, bw2 = W - MX - bx;
  headCard(s, bx, 3.35, bw2, 3.5, 'Alveoli are adapted by…', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 4.05, bw2 - 0.4, ['Millions of them: a **huge surface area**.', 'Walls **one cell thick**: short diffusion path.', 'Good **blood supply** and **ventilation** keep the gradient steep.'], 16, 0.12);
  notes(s, 'Spec 4.2.2.2: "Students should know the structure and functioning of the human heart and lungs, including how lungs are adapted for gaseous exchange." Oxygen diffuses from the air in the alveoli into the blood; carbon dioxide diffuses the other way.');
}

{
  const s = frame('Arteries, veins and capillaries', { tag: '4.2.2.2' });
  const draw = (cx, cy, outer, inner, wall) => { circle(s, cx, cy, outer, 'F2C9C4', 'A33B30', 1.5); circle(s, cx, cy, inner, C.white, 'A33B30', 1); };
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 5.45;
  const v = [['Artery', RED, 'Carries blood **away** from the heart at **high pressure**.', ['**Thick** muscular, elastic walls', '**Narrow** lumen'], [1.7, 0.55]], ['Vein', BLU, 'Carries blood **to** the heart at **low pressure**.', ['**Thin** walls', '**Wide** lumen', '**Valves** stop backflow'], [1.6, 1.15]], ['Capillary', C.green, '**Exchange** of substances with cells.', ['Walls **one cell thick**', 'Narrow: cells in single file', 'Short diffusion path'], [0.55, 0.35]]];
  v.forEach(([a, col, b, list, [o, i]], k) => {
    const x = MX + k * (cw + gap);
    headCard(s, x, top, cw, h, a, col, C.white);
    draw(x + cw / 2, top + 1.6, o, i);
    txt(s, b, x + 0.2, top + 2.65, cw - 0.4, 0.9, { size: 16 });
    bullets(s, x + 0.2, top + 3.6, cw - 0.4, list, 16, 0.05);
  });
  notes(s, 'Spec 4.2.2.2: "Students should be able to explain how the structure of these vessels relates to their functions." Cross-sections not to scale: the white circle is the lumen.');
}

{
  const s = frame('Rate of blood flow', { tag: '4.2.2.2' });
  rect(s, MX, 1.4, W - 2 * MX, 1.3, C.soft, C.line);
  D.math(s, MX + 0.3, 2.05, ['rate of blood flow = ', F('volume of blood', 'number of minutes')], { size: 24, bold: true });
  rect(s, MX, 3.0, W - 2 * MX, 1.8, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', MX + 0.3, 3.1, 5, 0.45, { size: 19, bold: true, color: C.orange });
  txt(s, '3000 ml of blood passes through an artery in 4 minutes.   Rate = 3000 ÷ 4 = **750 ml/min**', MX + 0.3, 3.65, W - 2 * MX - 0.6, 0.9, { size: 19 });
  rect(s, MX, 5.05, W - 2 * MX, 1.8, C.greyLight, C.line);
  txt(s, 'The same idea gives a **breathing rate**: 45 breaths in 3 minutes = 45 ÷ 3 = **15 breaths per minute**.', MX + 0.3, 5.05, W - 2 * MX - 0.6, 1.8, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.2.2.2: "Students should be able to use simple compound measures such as rate and carry out rate calculations for blood flow."');
}

D.myTurnYourTurn({
  title: 'Rate of blood flow', tag: 'Maths skill', stepSize: 21, labelW: 2.0, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: '1800 ml of blood flows through a vein in 3 minutes. Find the rate.',
    steps: [
      { label: 'Formula', text: '**1800 ÷ 3**' },
      { label: 'Rate', text: '**600 ml/min**' },
    ],
  },
  yours: {
    q: '2500 ml of blood flows through an artery in 5 minutes. Find the rate.',
    steps: [
      { label: 'Formula', text: '**2500 ÷ 5**' },
      { label: 'Rate', text: '**500 ml/min**' },
    ],
  },
  notes: 'Units matter: ml/min.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: the blood', { tag: '4.2.2.3' });
  rect(s, MX, 1.4, W - 2 * MX, 0.8, C.soft, C.line);
  txt(s, 'Blood is a **tissue**: **plasma** with red blood cells, white blood cells and platelets suspended in it.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.8, { size: 18, valign: 'middle' });
  const gap = 0.3, cw = (W - 2 * MX - 3 * gap) / 4, top = 2.45, h = 4.4;
  [['Red blood cells', RED, 'F8E3E1', ['Carry **oxygen** (haemoglobin)', '**No nucleus**: more room', '**Biconcave**: large surface area']], ['White blood cells', '7A4E9C', 'F4F0F9', ['Defend against **pathogens**', 'Phagocytosis, antibodies, antitoxins', 'Have a **nucleus**']], ['Platelets', C.orange, C.orangeSoft, ['Fragments of cells', 'Help blood **clot** at wounds']], ['Plasma', 'B08A18', 'FBF5DE', ['Pale yellow liquid', 'Carries **glucose, CO₂, urea, hormones**, proteins']]].forEach(([a, col, f, list], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, col, f); bullets(s, x + 0.15, top + 0.8, cw - 0.3, list, 16, 0.15);
  });
  notes(s, 'Spec 4.2.2.3: "Blood is a tissue consisting of plasma, in which the red blood cells, white blood cells and platelets are suspended. Students should know the functions of each of these blood components and be able to recognise different types of blood cells in a photograph or diagram, and explain how they are adapted to their functions." White blood cells link to 4.3.1.6.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why do red blood cells have no nucleus?',
  options: ['More room for haemoglobin to carry oxygen', 'So they can divide quickly', 'To make antibodies', 'To help blood clot'],
  correct: 0,
  notes: 'Answer A. C is white blood cells. D is platelets.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: coronary heart disease', { tag: '4.2.2.4' });
  // artery cross-sections: healthy and blocked
  circle(s, MX + 1.6, 3.0, 2.2, 'F2C9C4', 'A33B30', 2); circle(s, MX + 1.6, 3.0, 1.4, C.white, 'A33B30', 1);
  txt(s, 'healthy', MX + 0.6, 4.25, 2.0, 0.4, { size: 15, bold: true, align: 'center' });
  circle(s, MX + 4.6, 3.0, 2.2, 'F2C9C4', 'A33B30', 2); circle(s, MX + 4.6, 3.0, 1.4, 'F6D365', 'C9A227', 1); circle(s, MX + 4.85, 2.9, 0.55, C.white, 'A33B30', 1);
  txt(s, 'fatty material builds up', MX + 3.3, 4.25, 2.6, 0.4, { size: 15, bold: true, align: 'center', color: 'B08A18' });
  const bx = MX + 6.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.3, 'What happens', C.red, 'FBEDEB');
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Fatty material** builds up inside the **coronary arteries**.', 'The arteries **narrow**: less blood flows to the heart muscle.', 'Less **oxygen** reaches the heart muscle, which can cause a **heart attack**.'], 16, 0.12);
  rect(s, MX, 5.0, W - 2 * MX, 1.85, C.soft, C.line);
  txt(s, '**Faulty valves** may not open fully or may leak. **Heart failure** can be treated with a transplant, or an **artificial heart** while waiting for a donor.', MX + 0.3, 5.0, W - 2 * MX - 0.6, 1.85, { size: 18, valign: 'middle' });
  notes(s, 'Spec 4.2.2.4: "In coronary heart disease layers of fatty material build up inside the coronary arteries, narrowing them. This reduces the flow of blood through the coronary arteries, resulting in a lack of oxygen for the heart muscle."');
}

{
  const s = frame('Treatments: evaluate them', { tag: '4.2.2.4' });
  const head = ['Treatment', 'How it works', 'Advantages', 'Disadvantages'];
  const rows = [['Stents', 'mesh tube keeps the artery open', 'quick; no major surgery', 'artery may narrow again; clots'], ['Statins', 'drugs that lower blood cholesterol', 'no surgery; slow fatty build-up', 'taken for life; side effects'], ['Replacement valves', 'biological (animal) or mechanical', 'restores blood flow', 'surgery; mechanical: lifelong drugs'], ['Transplant / artificial heart', 'donor heart, or a machine while waiting', 'can save a life', 'rejection; few donors; surgery risk']];
  const cws = [2.9, 3.4, 2.9, W - 2 * MX - 9.2];
  head.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 1.45, cws[j], 0.6, j === 2 ? C.green : j === 3 ? C.red : C.maroon); txt(s, t, x + 0.15, 1.45, cws[j] - 0.3, 0.6, { size: 17, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0), y = 2.05 + i * 1.1; rect(s, x, y, cws[j], 1.1, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.15, y, cws[j] - 0.3, 1.1, { size: 16, bold: j === 0, valign: 'middle' }); }));
  notes(s, 'Spec 4.2.2.4: "Students should be able to evaluate the advantages and disadvantages of treating cardiovascular diseases by drugs, mechanical devices or transplant." Statins reduce blood cholesterol, slowing the rate of fatty material deposit.');
}

D.myTurnYourTurn({
  title: 'Explaining heart disease', tag: 'Exam skill', stepSize: 19, labelW: 1.85, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain how coronary heart disease can cause a heart attack.  [3 marks]',
    steps: [
      { label: 'Build-up', text: '**Fat in coronary arteries**' },
      { label: 'Blood', text: '**Less flow to heart muscle**' },
      { label: 'Result', text: '**Less oxygen: muscle dies**' },
    ],
  },
  yours: {
    q: 'Give one advantage and one disadvantage of a stent compared with statins.  [2 marks]',
    steps: [
      { label: 'Advantage', text: '**Works at once; not daily**' },
      { label: 'Disadvantage', text: '**Needs surgery; clot risk**' },
    ],
  },
  notes: 'In "compare" questions, write the comparison explicitly: "a stent works straight away, whereas statins take time".',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Which blood vessel carries blood from the heart to the lungs?', 'Pulmonary artery'], ['Where is the pacemaker?', 'In the right atrium'], ['Why do veins have valves?', 'To stop blood flowing backwards'], ['What do platelets do?', 'Help the blood clot'],
    ['Why is the left ventricle wall thicker?', 'Pumps blood at high pressure to the body'], ['How are alveoli adapted for gas exchange?', 'Large SA; thin walls; good blood supply'],
    ['What do statins do?', 'Lower blood cholesterol'], ['4800 ml of blood flows in 6 minutes. Rate?', '800 ml/min'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) pulmonary artery  2) right atrium  3) prevent backflow (low pressure)  4) clotting  5) it pumps blood around the whole body at higher pressure  6) large surface area, one-cell-thick walls, good blood supply, ventilation  7) reduce blood cholesterol, slowing fatty build-up  8) 800 ml/min.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Describe the route of blood from the body, through the heart, to the lungs.', m: 3, lines: 1 },
    { l: 'b', q: 'Explain how the structure of a capillary is related to its function.', m: 2, lines: 1 },
    { l: 'c', q: '2400 ml of blood flows through an artery in 2 minutes. Calculate the rate of blood flow.', m: 2, lines: 0 },
    { l: 'd', q: 'Evaluate the use of stents to treat coronary heart disease.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'vena cava; right atrium then right ventricle; pulmonary artery to lungs', '3', ''],
    ['(b)', 'walls one cell thick; short diffusion path for exchange with cells', '2', ''],
    ['(c)', '2400 ÷ 2; 1200 ml/min', '2', ''],
    ['(d)', 'keeps artery open / improves blood flow; quick, no major surgery; but artery can narrow again / clot risk', '3', 'needs both sides'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Which side of the heart pumps blood to the lungs?', 'Give one adaptation of an artery.', 'What does plasma carry?', 'What causes coronary heart disease?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) the right side  2) thick muscular, elastic walls  3) glucose, CO₂, urea, hormones, proteins  4) fatty material building up in the coronary arteries. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw and label the heart, with the four main blood vessels.',
    'Explain why mammals have a double circulation.',
    'Compare arteries, veins and capillaries.',
    'Describe the four parts of the blood and their jobs.',
    '900 ml of blood flows in 1.5 minutes. Calculate the rate.',
    'Evaluate statins and heart transplants as treatments.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) see the heart slide  2) blood is re-pumped at high pressure after the lungs  3) see the vessels slide  4) see the blood slide  5) 600 ml/min  6) both sides and a conclusion.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.2_B_HeartLungsBlood.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
