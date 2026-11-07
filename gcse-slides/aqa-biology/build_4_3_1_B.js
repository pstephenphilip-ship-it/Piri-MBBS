// build_4_3_1_B.js — AQA GCSE Biology (8461) 4.3.1 Communicable diseases, lesson 2 of 3
// 4.3.1.6 Human defence systems, 4.3.1.7 Vaccination. One two-hour lesson for a Higher student.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_3_1_B.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { graph } = require('../aqa-maths/graphs');
const { C } = T;

const DECK = {
  code: '4.3.1', title: 'Defences and vaccination',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, MX, W } = D;
const WBC = '6A4C93', PATH = 'B5655B';

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function seg(s, x1, y1, x2, y2, color, width = 2) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipV: (x2 - x1) * (y2 - y1) < 0, line: { color, width } });
}
function headCard(s, x, y, w, h, head, colour, fill) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
}
// pathogen: circle with small triangle-ish antigens (small squares)
function pathogen(s, cx, cy, d, colour = PATH) {
  circle(s, cx, cy, d, 'F3D4CF', colour, 2);
  for (let k = 0; k < 6; k++) { const a = k * Math.PI / 3; rect(s, cx + (d / 2 + 0.06) * Math.cos(a) - 0.06, cy + (d / 2 + 0.06) * Math.sin(a) - 0.06, 0.12, 0.12, colour); }
}
// Y-shaped antibody, arms up, at (x, y) = bottom of stem
function antibody(s, x, y, size, colour = C.blue) {
  seg(s, x, y, x, y - size * 0.55, colour, 3);
  seg(s, x, y - size * 0.55, x - size * 0.35, y - size, colour, 3);
  seg(s, x, y - size * 0.55, x + size * 0.35, y - size, colour, 3);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'How the body stops pathogens getting in, how white blood cells destroy them, and how vaccination prevents illness',
  bullets: ['Part 1: non-specific defences (4.3.1.6)', 'Part 2: the immune system and white blood cells (4.3.1.6)', 'Part 3: vaccination and herd immunity (4.3.1.7)'],
  notes: 'AQA 8461 GCSE Biology 4.3.1.6 Human defence systems and 4.3.1.7 Vaccination. Lesson 2 of 3 on 4.3.1. Lesson 3: antibiotics, painkillers and drug development. Then 4.3.2 Monoclonal antibodies and 4.3.3 Plant disease. Students do not need vaccination schedules or side effects of specific vaccines. About two hours.',
});

D.objectives({
  tag: '4.3.1.6, 4.3.1.7',
  items: [
    'Describe how the **skin, nose, trachea, bronchi** and **stomach** stop pathogens.',
    'Explain how white blood cells defend us: **phagocytosis, antibodies, antitoxins**.',
    'Explain how a **vaccine** prevents illness, using a graph of antibody levels.',
    'Explain how vaccinating most people reduces **spread** (herd immunity).',
  ],
  keywords: ['non-specific', 'cilia', 'phagocytosis', 'antibody', 'antitoxin', 'vaccine'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['How do bacteria make us feel ill?', 'Name a viral disease spread by droplets in the air.', 'What is the vector for malaria?', 'What type of pathogen causes rose black spot?'],
  answers: ['They make toxins that damage tissues', 'Measles', 'Mosquito', 'Fungus'],
  notes: 'Retrieval from lesson 1 (4.3.1.1–4.3.1.5). Toxins come back today: antitoxins neutralise them.',
});

D.vocab({
  title: 'Key words', tag: '4.3.1.6',
  items: [
    { term: 'Phagocytosis', def: 'A white blood cell **engulfs** a pathogen and **digests** it.' },
    { term: 'Antibody', def: 'A protein made by white blood cells that **fits one pathogen**, helping to destroy it.' },
    { term: 'Antitoxin', def: 'A protein made by white blood cells that **neutralises the toxins** made by bacteria.' },
    { term: 'Vaccine', def: 'A small amount of a **dead or inactive** pathogen, which makes white blood cells produce antibodies.' },
  ],
  notes: 'Antigens are the proteins on a pathogen\'s surface; each antibody fits one antigen shape. Antibodies are specific; phagocytosis is not.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: stopping pathogens getting in', { tag: '4.3.1.6 non-specific' });
  // simple body outline
  const bx = MX + 2.4, hy = 2.0;
  circle(s, bx, hy, 1.0, 'F6E7DD', '9C7A68', 2);
  rect(s, bx - 1.0, hy + 0.65, 2.0, 3.6, 'F6E7DD', '9C7A68');
  rect(s, bx - 0.06, hy + 0.2, 0.12, 0.9, 'F6E7DD', '9C7A68');
  vline(s, bx, hy + 0.6, hy + 1.75, '2A6F8E', 5);
  seg(s, bx, hy + 1.75, bx - 0.45, hy + 2.2, '2A6F8E', 4); seg(s, bx, hy + 1.75, bx + 0.45, hy + 2.2, '2A6F8E', 4);
  s.addShape(D.SH.ellipse, { x: bx - 0.2, y: hy + 2.75, w: 0.9, h: 0.6, fill: { color: 'F3D9B5' }, line: { color: C.orange, width: 2 } });
  const labels = [
    [bx + 0.15, hy, 'Nose', 'Hairs and mucus **trap** particles and pathogens.', 1.45],
    [bx + 0.05, hy + 1.2, 'Trachea and bronchi', 'Mucus traps pathogens; **cilia** waft it up to the throat to be swallowed.', 2.82],
    [bx + 0.6, hy + 3.05, 'Stomach', '**Hydrochloric acid** kills pathogens in food and swallowed mucus.', 4.19],
    [bx + 1.0, hy + 4.0, 'Skin', 'A **barrier**. Scabs seal cuts; it also makes antimicrobial secretions.', 5.56],
  ];
  const tx = MX + 5.6, tw = W - MX - tx, ch = 1.27;
  labels.forEach(([px, py, h1, t, ty], i) => {
    seg(s, px, py, tx - 0.05, ty + ch / 2, C.grey, 1.25);
    circle(s, px, py, 0.12, C.grey);
    rect(s, tx, ty, tw, ch, i % 2 ? C.white : C.soft, C.line);
    txt(s, h1, tx + 0.2, ty + 0.06, tw - 0.4, 0.4, { size: 19, bold: true, color: C.maroon });
    txt(s, t, tx + 0.2, ty + 0.46, tw - 0.4, 0.75, { size: 18 });
  });
  notes(s, 'These are NON-SPECIFIC defences: they work against all pathogens. Spec list: skin, nose, trachea and bronchi, stomach. The label lines point to the nose, airways, stomach and skin.');
}

{
  const s = frame('Mucus and cilia in the airways', { tag: '4.3.1.6' });
  const x0 = MX + 0.3, y0 = 3.6, cw = 0.85, n = 7;
  rect(s, x0, y0 - 1.15, n * cw, 0.5, 'E8F0D8', '8DA65A');
  txt(s, 'mucus', x0 + n * cw + 0.15, y0 - 1.15, 1.2, 0.5, { size: 16, bold: true, color: '6B8A2E', valign: 'middle' });
  for (let i = 0; i < n; i++) {
    const x = x0 + i * cw;
    rect(s, x, y0, cw, 1.7, 'FBE9E7', 'B5655B');
    circle(s, x + cw / 2, y0 + 1.0, 0.32, 'C98C84');
    for (let k = 0; k < 4; k++) seg(s, x + 0.15 + k * 0.18, y0, x + 0.25 + k * 0.18, y0 - 0.6, '2A6F8E', 1.5);
  }
  txt(s, 'cilia', x0 + n * cw + 0.15, y0 - 0.55, 1.2, 0.45, { size: 16, bold: true, color: '2A6F8E' });
  txt(s, 'cells lining the trachea', x0, y0 + 1.8, 4, 0.4, { size: 15, color: C.grey });
  [[x0 + 1.3, y0 - 0.9], [x0 + 3.4, y0 - 0.95], [x0 + 5.0, y0 - 0.88]].forEach(([x, y]) => pathogen(s, x, y, 0.22));
  arrow(s, x0 + 1.0, y0 - 1.5, x0 + 5.4, y0 - 1.5, C.ink, 3);
  txt(s, 'cilia beat: mucus moves up to the throat', x0 + 0.8, y0 - 2.05, 5, 0.45, { size: 16, bold: true });
  const bx = MX + 7.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'What happens', C.maroon, C.soft);
  const st = ['Goblet cells make sticky **mucus**.', 'Pathogens and dust **stick** to the mucus.', '**Cilia** (tiny hairs) beat and **waft** the mucus up to the throat.', 'It is **swallowed**, and **stomach acid** kills the pathogens.'];
  st.forEach((t, i) => {
    const y = 2.15 + i * 1.12;
    circle(s, bx + 0.42, y + 0.22, 0.42, C.accent);
    txt(s, String(i + 1), bx + 0.21, y + 0.01, 0.42, 0.42, { size: 16, bold: true, color: C.white, align: 'center', valign: 'middle' });
    txt(s, t, bx + 0.8, y, bw - 1.0, 1.0, { size: 18 });
  });
  notes(s, 'Smoking stops cilia working, so mucus builds up (smoker\'s cough) and pathogens reach the lungs more easily: a good "suggest" question. Goblet cells are useful detail but not required by the spec.');
}

D.hinge({
  title: 'Quick check',
  q: 'What is the job of the cilia in the trachea?',
  options: ['Move mucus up to the throat', 'Make sticky mucus', 'Kill bacteria with acid', 'Engulf and digest pathogens'],
  correct: 0,
  notes: 'Answer A. B is done by other cells (goblet cells). C is the stomach. D is phagocytosis by white blood cells.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: white blood cells', { tag: '4.3.1.6 immune system' });
  rect(s, MX, 1.4, W - 2 * MX, 0.75, C.soft, C.line);
  txt(s, 'If a pathogen gets into the body, the **immune system** tries to destroy it. White blood cells do this in **three** ways.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.75, { size: 19, valign: 'middle' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 2.35, h = 4.5;
  const cards = [
    ['1  Phagocytosis', 'The white blood cell **engulfs** the pathogen and **digests** it.'],
    ['2  Antibodies', 'Antibodies **fit** the pathogen and stick to it, so it is destroyed.'],
    ['3  Antitoxins', 'Antitoxins **neutralise** the toxins made by bacteria.'],
  ];
  cards.forEach(([h1, t], i) => {
    const x = MX + i * (cw + gap);
    headCard(s, x, top, cw, h, h1, WBC, 'F4F0F9');
    const cx = x + cw / 2, cy = top + 1.65;
    if (i === 0) {
      s.addShape(D.SH.ellipse, { x: cx - 1.1, y: cy - 0.7, w: 2.2, h: 1.4, fill: { color: 'E4DAF0' }, line: { color: WBC, width: 2 } });
      circle(s, cx - 0.5, cy, 0.5, 'B9A3D6', WBC, 1.5);
      circle(s, cx + 0.95, cy, 0.62, 'F4F0F9', WBC, 1.5);
      pathogen(s, cx + 0.95, cy, 0.34);
    }
    if (i === 1) {
      pathogen(s, cx, cy, 0.6);
      antibody(s, cx - 0.95, cy + 0.55, 0.6); antibody(s, cx + 0.95, cy + 0.55, 0.6);
      antibody(s, cx, cy + 1.05, 0.6);
    }
    if (i === 2) {
      [[-0.7, -0.3], [0.1, 0.25], [0.8, -0.25]].forEach(([dx, dy]) => circle(s, cx + dx, cy + dy, 0.2, C.red));
      [[-0.7, -0.3], [0.1, 0.25], [0.8, -0.25]].forEach(([dx, dy]) => rect(s, cx + dx + 0.08, cy + dy - 0.12, 0.26, 0.24, C.blue));
      txt(s, 'toxin + antitoxin', cx - 1.2, cy + 0.6, 2.4, 0.35, { size: 14, bold: true, color: C.grey, align: 'center' });
    }
    txt(s, t, x + 0.25, top + 2.85, cw - 0.5, 1.5, { size: 19 });
  });
  notes(s, 'Spec: "White blood cells help to defend against pathogens by phagocytosis, antibody production and antitoxin production." Exam tip: white blood cells do NOT "eat" pathogens: say engulf and digest. Antibodies do not kill pathogens directly; they stick to them so they can be destroyed.');
}

{
  const s = frame('Antibodies are specific', { tag: '4.3.1.6' });
  // two pathogens with different antigen shapes
  const y = 3.0;
  const pathA = (cx) => { circle(s, cx, y, 1.0, 'F3D4CF', PATH, 2); [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2 + Math.PI / 4; rect(s, cx + 0.56 * Math.cos(a) - 0.09, y + 0.56 * Math.sin(a) - 0.09, 0.18, 0.18, PATH); }); };
  const pathB = (cx) => { circle(s, cx, y, 1.0, 'DCEFE2', C.green, 2); [0, 1, 2, 3].forEach(k => { const a = k * Math.PI / 2 + Math.PI / 4; circle(s, cx + 0.58 * Math.cos(a), y + 0.58 * Math.sin(a), 0.2, C.green); }); };
  pathA(MX + 1.3); antibody(s, MX + 2.75, y + 0.45, 0.8, PATH); rect(s, MX + 2.42, y - 0.47, 0.18, 0.18, PATH);
  txt(s, 'Measles virus', MX + 0.2, y + 0.75, 2.4, 0.4, { size: 16, bold: true, color: PATH, align: 'center' });
  txt(s, 'its antibody', MX + 2.1, y + 0.75, 1.5, 0.4, { size: 16, bold: true, color: PATH, align: 'center' });
  pathB(MX + 4.5); antibody(s, MX + 5.95, y + 0.45, 0.8, C.green);
  txt(s, 'Flu virus', MX + 3.4, y + 0.75, 2.2, 0.4, { size: 16, bold: true, color: C.green, align: 'center' });
  txt(s, 'its antibody', MX + 5.3, y + 0.75, 1.5, 0.4, { size: 16, bold: true, color: C.green, align: 'center' });
  rect(s, MX, 4.6, 6.9, 2.25, C.greyLight);
  txt(s, 'Each pathogen has its own shape of **antigens** (proteins on its surface). A white blood cell makes antibodies with a shape that **fits only those antigens**.', MX + 0.25, 4.7, 6.4, 2.05, { size: 18 });
  const bx = MX + 7.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'So…', C.maroon, C.soft);
  ['Measles antibodies **do not** protect you against flu.', 'The first time you meet a pathogen, it takes **days** to make the right antibodies, so you get ill.', 'Some white blood cells **remember** the pathogen. Next time, the right antibodies are made **quickly**.'].forEach((t, i) => {
    txt(s, t, bx + 0.25, 2.2 + i * 1.5, bw - 0.5, 1.4, { size: 18 });
  });
  notes(s, 'Memory cells are not named in the spec, but the idea that "white blood cells respond quickly" on re-infection is (4.3.1.7). This slide sets up vaccination.');
}

D.hinge({
  title: 'Quick check',
  q: 'What do antitoxins do?',
  options: ['Neutralise toxins made by bacteria', 'Engulf and digest pathogens', 'Stick to the antigens on a virus', 'Kill bacteria with acid'],
  correct: 0,
  notes: 'Answer A. B is phagocytosis. C is antibodies. D is the stomach.',
});

D.myTurnYourTurn({
  title: 'Describing the defences', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Bacteria are breathed in. Describe how the body stops them reaching the lungs.  [4 marks]',
    steps: [
      { label: 'Nose', text: '**Hairs and mucus trap them**' },
      { label: 'Trachea', text: '**Mucus traps bacteria**' },
      { label: 'Cilia', text: '**Waft mucus to the throat**' },
      { label: 'Stomach', text: '**Swallowed; acid kills them**' },
    ],
  },
  yours: {
    q: 'Some bacteria get into the blood through a cut. Describe how white blood cells destroy them.  [3 marks]',
    steps: [
      { label: 'Engulf', text: '**Engulf and digest them**' },
      { label: 'Antibodies', text: '**Fit the bacteria\'s antigens**' },
      { label: 'Antitoxins', text: '**Neutralise their toxins**' },
    ],
  },
  notes: 'One mark per correct defence in order. In "yours", the skin has already failed (the cut), so the answer is about white blood cells.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: how vaccination works', { tag: '4.3.1.7 vaccination' });
  const st = [
    ['Vaccine', 'A small amount of **dead or inactive** pathogen is injected.'],
    ['First response', 'White blood cells make **antibodies** against it. You do not get ill.'],
    ['Later', 'The **real** pathogen gets into the body.'],
    ['Fast response', 'White blood cells **quickly** make the right antibodies. The pathogen is destroyed **before you get ill**.'],
  ];
  const bw = 2.75, gap = (W - 2 * MX - 4 * bw) / 3, y = 1.5, h = 3.05;
  st.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap), col = i === 3 ? C.green : C.maroon;
    headCard(s, x, y, bw, h, a, col, i === 3 ? C.greenSoft : C.soft);
    txt(s, b, x + 0.18, y + 0.75, bw - 0.36, h - 0.9, { size: 18 });
    if (i < 3) arrow(s, x + bw + 0.04, y + h / 2, x + bw + gap - 0.04, y + h / 2, C.ink, 2.5);
  });
  rect(s, MX, 4.85, W - 2 * MX, 2.0, C.orangeSoft, 'F3D9B5');
  txt(s, '**Why it works:** the pathogen in the vaccine has the same antigens as the real one, so the antibodies fit. The person is now **immune**.', MX + 0.3, 4.95, W - 2 * MX - 0.6, 0.9, { size: 19 });
  txt(s, '**Common error:** a vaccine does not contain antibodies or antibiotics. It makes **your own** white blood cells make antibodies.', MX + 0.3, 5.85, W - 2 * MX - 0.6, 0.9, { size: 19 });
  notes(s, 'Spec: "Vaccination involves introducing small quantities of dead or inactive forms of a pathogen into the body to stimulate the white blood cells to produce antibodies. If the same pathogen re-enters the body the white blood cells respond quickly to produce the correct antibodies, preventing infection."');
}

{
  const s = frame('Antibody levels after a vaccine', { tag: '4.3.1.7 data' });
  const G = graph(D, s, MX + 0.9, 1.95, 7.0, 4.4, [0, 60], [0, 10], { gridX: 5, gridY: 2, labX: 10, labY: 2, axesAtEdge: true, xTitle: 'Time (days)', yTitle: 'Antibody concentration' });
  const bump = (t, s0, p, h, decay) => t < s0 ? 0 : t < p ? h * (3 * ((t - s0) / (p - s0)) ** 2 - 2 * ((t - s0) / (p - s0)) ** 3) : h * Math.exp(-(t - p) / decay);
  const ab = t => bump(t, 3, 14, 2.4, 9) + bump(t, 36, 41, 9.2, 14);
  G.seg(0, 4, 60, 4, C.red, 2, 'dash');
  txt(s, 'level that stops you getting ill', G.px(4), G.py(4) - 0.38, 3.0, 0.35, { size: 13, bold: true, color: C.red });
  G.curve(ab, 0, 60, WBC, 3.5, 240);
  arrow(s, G.px(1), G.py(8.6), G.px(1), G.py(0.3), C.maroon, 2);
  txt(s, 'vaccine', G.px(0) + 0.15, G.py(9.6), 1.2, 0.35, { size: 14, bold: true, color: C.maroon });
  arrow(s, G.px(35), G.py(8.6), G.px(35), G.py(0.3), C.maroon, 2);
  txt(s, 'real pathogen enters', G.px(35) - 2.45, G.py(9.6), 2.3, 0.35, { size: 14, bold: true, color: C.maroon });
  const bx = MX + 8.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Read the graph', C.maroon, C.soft);
  ['After the vaccine: antibodies rise **slowly** and **not very high**.', 'After the real pathogen: antibodies rise **faster**, go **much higher** and last **longer**.', 'They pass the dashed line quickly, so the person **does not get ill**.'].forEach((t, i) => txt(s, t, bx + 0.25, 2.15 + i * 1.5, bw - 0.5, 1.4, { size: 18 }));
  notes(s, 'Sketch graph (no real data). Higher questions ask students to compare the two responses: speed, size, and how long the antibodies last. Mark scheme language: "secondary response is faster and produces more antibodies".');
}

{
  const s = frame('Vaccinating a large proportion of people', { tag: '4.3.1.7 herd immunity' });
  const grid = (x0, y0, vacc, title, sub) => {
    txt(s, title, x0, 1.4, 5.6, 0.45, { size: 20, bold: true, color: C.maroon });
    for (let r = 0; r < 5; r++) for (let c = 0; c < 8; c++) {
      const idx = r * 8 + c, v = vacc(idx);
      circle(s, x0 + 0.35 + c * 0.66, y0 + 0.35 + r * 0.66, 0.46, v === 'v' ? C.accent : v === 'i' ? C.red : C.white, v === 'u' ? C.grey : v === 'i' ? C.red : C.accent, 1.5);
    }
    txt(s, sub, x0, y0 + 3.45, 5.6, 1.1, { size: 17 });
  };
  const few = new Set([0, 1, 4, 9, 10, 11, 12, 17, 18, 19, 20, 25, 26, 27, 28, 33]);
  grid(MX, 2.0, i => few.has(i) ? 'i' : (i % 5 === 0 ? 'v' : 'u'), 'Few people vaccinated', 'The pathogen passes from person to person. **Many** people get ill.');
  const vac = new Set([10, 29]);
  grid(MX + 6.4, 2.0, i => i === 3 ? 'i' : vac.has(i) ? 'u' : 'v', 'Most people vaccinated', 'The pathogen **cannot spread**, so even the unvaccinated (white) are **protected**.');
  [[C.accent, C.accent, 'vaccinated'], [C.red, C.red, 'ill'], [C.white, C.grey, 'not vaccinated']].forEach(([f, l, t], i) => {
    circle(s, MX + 0.25 + i * 2.6, 6.65, 0.3, f, l, 1.5);
    txt(s, t, MX + 0.5 + i * 2.6, 6.47, 2.0, 0.36, { size: 15 });
  });
  notes(s, 'Spec: "explain how the spread of the pathogen can be reduced by immunising a large proportion of the population." This protects people who cannot be vaccinated: babies, people with weak immune systems. Herd immunity is the usual name, though not a spec term.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does a vaccinated person not get ill when the real pathogen enters?',
  options: ['White blood cells make the right antibodies quickly', 'The vaccine contains antibiotics', 'The vaccine contains antibodies', 'The vaccine kills all pathogens in the body'],
  correct: 0,
  notes: 'Answer A. B: antibiotics are drugs (lesson 3), not in vaccines. C: the vaccine makes the body produce its own antibodies. D: vaccines are specific to one pathogen.',
});

D.myTurnYourTurn({
  title: 'Explaining vaccination', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain how the measles vaccine stops a child getting measles.  [4 marks]',
    steps: [
      { label: 'Vaccine', text: '**Dead or inactive virus**' },
      { label: 'Response', text: '**WBCs make antibodies**' },
      { label: 'Later', text: '**Real measles virus enters**' },
      { label: 'Result', text: '**Antibodies made quickly**' },
    ],
  },
  yours: {
    q: 'Explain why vaccinating most children also protects a baby too young to be vaccinated.  [3 marks]',
    steps: [
      { label: 'Immune', text: '**Most children are immune**' },
      { label: 'Spread', text: '**Virus cannot pass on**' },
      { label: 'Baby', text: '**Unlikely to meet the virus**' },
    ],
  },
  notes: 'Mine, last mark: the correct antibodies are made quickly, so the virus is destroyed before the child is ill. Yours: link each step: immune people cannot pass the virus on, so it cannot reach the baby.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Name two non-specific defences of the body.', 'Skin and stomach acid (or nose, trachea)'], ['How does the stomach defend the body?', 'Hydrochloric acid kills pathogens'], ['What is phagocytosis?', 'A white blood cell engulfs and digests a pathogen'], ['What do antitoxins do?', 'Neutralise toxins made by bacteria'],
    ['Explain why measles antibodies do not protect you against flu.', 'Antibodies are specific: they fit only measles antigens'], ['Smoking stops cilia working. Suggest why smokers get more chest infections.', 'Mucus and pathogens are not moved out of the airways'],
    ['What does a vaccine contain?', 'A small amount of dead or inactive pathogen'], ['Why are you less ill the second time a pathogen enters?', 'White blood cells make the right antibodies quickly'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: explain', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) any two of skin, nose, trachea and bronchi, stomach  2) hydrochloric acid kills pathogens  3) engulfing and digesting a pathogen  4) neutralise bacterial toxins  5) antibodies are specific to one pathogen\'s antigens  6) cilia cannot move mucus, so pathogens stay in the airways and reach the lungs  7) small quantities of dead or inactive pathogen  8) white blood cells respond quickly with the correct antibodies, destroying the pathogen before illness.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.3,
  stem: 'The body has several ways to defend itself against pathogens.',
  parts: [
    { l: 'a', q: 'Describe how the skin helps to defend the body against pathogens.', m: 2, lines: 1 },
    { l: 'b', q: 'Name the process in which white blood cells engulf pathogens.', m: 1, lines: 0 },
    { l: 'c', q: 'Describe how vaccination prevents a person from becoming ill with measles.', m: 4, lines: 2 },
    { l: 'd', q: 'Explain why it is important to vaccinate a large proportion of the population.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'barrier to pathogens; scabs seal cuts / antimicrobial secretions', '2', ''],
    ['(b)', 'phagocytosis', '1', ''],
    ['(c)', 'dead/inactive virus injected; WBCs make antibodies; if the virus enters later WBCs respond quickly; correct antibodies destroy it before illness', '4', 'do not accept "vaccine contains antibodies"'],
    ['(d)', 'fewer people can catch or pass on the pathogen; spread is reduced; protects people who are not vaccinated', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['How does the nose help to stop pathogens?', 'Name the three ways white blood cells defend us.', 'What is in a vaccine?', 'Why do you get less ill the second time a pathogen enters?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) hairs and mucus trap pathogens  2) phagocytosis, antibodies, antitoxins  3) small amounts of dead or inactive pathogen  4) white blood cells quickly make the right antibodies. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Describe how the trachea and bronchi protect the lungs.',
    'Explain the difference between antibodies and antitoxins.',
    'Sketch and label a graph of antibody levels after a vaccine and a later infection.',
    'A new flu vaccine is needed most years. Suggest why.',
    'Explain why babies benefit when most people are vaccinated.',
    'Smoking damages cilia. Explain why smokers often cough up mucus.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) mucus traps pathogens; cilia waft mucus to the throat; swallowed  2) antibodies fit pathogens\' antigens so they can be destroyed; antitoxins neutralise toxins  3) small slow first peak; second peak faster, higher, lasts longer  4) the flu virus changes its antigens, so old antibodies no longer fit  5) the pathogen cannot spread, so babies are unlikely to be infected  6) cilia cannot move mucus, so it builds up and is coughed out.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.3.1_B_DefencesAndVaccination.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count));
