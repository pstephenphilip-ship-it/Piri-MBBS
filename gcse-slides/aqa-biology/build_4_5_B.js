// build_4_5_B.js — AQA GCSE Biology (8461) 4.5 Homeostasis and response, lesson 2 of 5:
// 4.5.2.2 The brain (HT: investigating and treating the brain), 4.5.2.3 The eye.
// One two-hour lesson for a Higher student. Separate Biology only.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_5_B.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C } = T;

const DECK = {
  code: '4.5.2.2–4.5.2.3', title: 'The brain and the eye',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, MX, W } = D;
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const RET = 'C0504D', RAY = 'E0A100', LENSF = 'DDEBF7';

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function seg(s, x1, y1, x2, y2, color, width = 2, dash) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipV: (x2 - x1) * (y2 - y1) < 0, line: { color, width, dashType: dash } });
}
function arc(s, cx, cy, r, a0, a1, color, width, n = 40) {
  for (let i = 0; i < n; i++) {
    const t0 = (a0 + (a1 - a0) * i / n) * Math.PI / 180, t1 = (a0 + (a1 - a0) * (i + 1) / n) * Math.PI / 180;
    seg(s, cx + r * Math.cos(t0), cy - r * Math.sin(t0), cx + r * Math.cos(t1), cy - r * Math.sin(t1), color, width);
  }
}
function ell(s, x, y, w, h, fill, line, lw = 1.5) { s.addShape(D.SH.ellipse, { x, y, w, h, fill: { color: fill }, line: { color: line, width: lw } }); }
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
// eye facing left; returns key x positions
function eye(s, cx, cy, R, o = {}) {
  ell(s, cx - R - 0.3, cy - 0.85, 0.75, 1.7, LENSF, '7FA7C9');
  circle(s, cx, cy, 2 * R, C.white, '8C8C8C', 3);
  arc(s, cx, cy, R - 0.1, -125, 125, RET, 5);
  rect(s, cx + R - 0.15, cy - 0.17, 1.0, 0.34, 'F6E7A8', 'C9A227');
  const lx = cx - R + 0.75, lw = o.lensW || 0.5;
  vline(s, cx - R + 0.3, cy - 0.95, cy - 0.33, '6B4226', 6); vline(s, cx - R + 0.3, cy + 0.33, cy + 0.95, '6B4226', 6);
  rect(s, lx - 0.15, cy - 1.45, 0.3, 0.28, 'D98C8C', '9C4F4F'); rect(s, lx - 0.15, cy + 1.17, 0.3, 0.28, 'D98C8C', '9C4F4F');
  seg(s, lx, cy - 1.17, lx, cy - 0.62, '555555', 1.5, o.slack ? 'dash' : undefined); seg(s, lx, cy + 0.62, lx, cy + 1.17, '555555', 1.5, o.slack ? 'dash' : undefined);
  ell(s, lx - lw / 2, cy - 0.65, lw, 1.3, 'EAF3FB', '5B87B5', 2);
  return { lx, rx: cx + R - 0.12 };
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'The regions of the brain, how scientists study it, the structure of the eye, focusing, and correcting short and long sight',
  bullets: ['Part 1: the brain (4.5.2.2; HT: investigating it)', 'Part 2: the structure of the eye (4.5.2.3)', 'Part 3: accommodation and the iris reflex', 'Part 4: short and long sight, and how they are treated'],
  notes: 'AQA 8461 GCSE Biology 4.5, lesson 2 of 5. The brain and the eye are separate Biology only. HT only: the difficulties of investigating brain function and treating brain damage and disease. Ray diagrams here are biology-level sketches; lens physics is not required. About two hours.',
});

D.objectives({
  tag: '4.5.2.2, 4.5.2.3',
  items: [
    'Identify the **cerebral cortex, cerebellum** and **medulla** and give their functions.',
    '**HT:** explain how the brain is studied and why it is hard to **treat**.',
    'Relate the parts of the **eye** to their functions, including the **iris reflex**.',
    'Explain **accommodation**, and how **short and long sight** are corrected.',
  ],
  keywords: ['cerebral cortex', 'cerebellum', 'medulla', 'retina', 'accommodation', 'myopia'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Name the three neurones in a reflex arc.', 'What are the two types of effector?', 'Which two organs make up the CNS?', 'How does an impulse cross a synapse?'],
  answers: ['Sensory, relay, motor', 'Muscles and glands', 'Brain and spinal cord', 'A chemical diffuses across the gap'],
  notes: 'Retrieval from lesson 1. The pupil reflex from lesson 1 returns in Part 3.',
});

D.vocab({
  title: 'Key words', tag: '4.5.2',
  items: [
    { term: 'Cerebral cortex', def: 'The outer layer of the brain: **consciousness**, intelligence, memory and **language**.' },
    { term: 'Cerebellum', def: 'Coordinates **muscle activity** and **balance**.' },
    { term: 'Medulla', def: 'Controls **unconscious** activities: **heart rate** and **breathing**.' },
    { term: 'Accommodation', def: 'Changing the **shape of the lens** to focus on near or distant objects.' },
  ],
  notes: 'Myopia = short sight; hyperopia = long sight.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the brain', { tag: '4.5.2.2' });
  const bx = MX + 0.5, by = 1.7;
  ell(s, bx, by, 5.2, 3.3, 'F4C7C3', 'B5655B', 2);
  ell(s, bx + 3.2, by + 2.55, 1.9, 1.15, 'C9B6E4', '7A4E9C', 2);
  rect(s, bx + 2.55, by + 2.95, 0.6, 1.75, 'F6E7A8', 'C9A227');
  txt(s, 'front', bx - 0.1, by + 3.5, 1.0, 0.35, { size: 14, color: C.grey });
  const lab = [[bx + 1.3, by + 1.0, 1, 'Cerebral cortex'], [bx + 4.3, by + 3.12, 2, 'Cerebellum'], [bx + 2.85, by + 4.1, 3, 'Medulla']];
  lab.forEach(([x, y, n]) => badge(s, x, y, n));
  const kx = MX + 6.4, kw = W - MX - kx;
  [['1  Cerebral cortex', 'B5655B', 'Outer, folded layer. **Consciousness**, intelligence, **memory** and **language**.'], ['2  Cerebellum', '7A4E9C', 'At the back. Coordinates **muscle activity** and **balance**.'], ['3  Medulla', 'B08A18', 'Joins the spinal cord. **Unconscious** activities: **heartbeat** and **breathing**.']].forEach(([a, col, b], i) => {
    const y = 1.45 + i * 1.8;
    headCard(s, kx, y, kw, 1.65, a, col, C.white); txt(s, b, kx + 0.2, y + 0.68, kw - 0.4, 0.95, { size: 18 });
  });
  txt(s, 'The brain is made of **billions of interconnected neurones**, with different regions doing different jobs.', MX, 6.45, 6.0, 0.6, { size: 15, color: C.grey });
  notes(s, 'Spec 4.5.2.2: "The brain controls complex behaviour. It is made of billions of interconnected neurones and has different regions that carry out different functions. Students should be able to identify the cerebral cortex, cerebellum and medulla on a diagram of the brain, and describe their functions." Simplified side view, front on the left.');
}

{
  const s = frame('Studying and treating the brain', HT);
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 2.75;
  [['Brain damage', 'Study patients with damage to one area. What can they no longer do?'], ['Electrical stimulation', 'Stimulate a small area with a weak current and see what the person feels or does.'], ['MRI scans', 'See which areas are **active** during tasks, e.g. talking or listening to music.']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 18 });
  });
  rect(s, MX, 4.4, W - 2 * MX, 2.45, 'FBEDEB', C.red);
  txt(s, 'Why treating the brain is so difficult', MX + 0.3, 4.5, 8, 0.45, { size: 20, bold: true, color: C.red });
  bullets(s, MX + 0.3, 5.05, W - 2 * MX - 0.6, ['The brain is **complex** and **delicate**: surgery can damage other areas.', 'It is **hard to reach** inside the skull, and hard to know exactly which area causes a problem.', 'Many drugs cannot get from the blood into the brain.'], 18, 0.1);
  notes(s, 'Spec 4.5.2.2 (HT only): "Neuroscientists have been able to map the regions of the brain to particular functions by studying patients with brain damage, electrically stimulating different parts of the brain and using MRI scanning techniques. The complexity and delicacy of the brain makes investigating and treating brain disorders very difficult." The third bullet (the blood–brain barrier) is useful extra detail.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which part of the brain controls heart rate and breathing?',
  options: ['Medulla', 'Cerebellum', 'Cerebral cortex', 'Spinal cord'],
  correct: 0,
  notes: 'Answer A. B: balance and muscle coordination. C: conscious thought, memory, language. D is not part of the brain.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the structure of the eye', { tag: '4.5.2.3' });
  const cx = MX + 3.4, cy = 4.15, R = 2.2;
  const { lx, rx } = eye(s, cx, cy, R);
  badge(s, cx - R - 0.55, cy + 0.0, 1); badge(s, cx - R + 0.3, cy - 1.25, 2); badge(s, lx + 0.05, cy + 0.0, 3);
  badge(s, lx + 0.45, cy - 1.75, 4); badge(s, lx + 0.4, cy + 0.85, 5); badge(s, rx - 0.45, cy - 1.2, 6); badge(s, rx + 0.85, cy - 0.5, 7); badge(s, cx - 0.2, cy - R - 0.3, 8);
  const parts = [['Cornea', 'transparent; **refracts** (bends) light into the eye'], ['Iris', 'muscles control the **size of the pupil**'], ['Lens', '**focuses** light onto the retina'], ['Ciliary muscles', 'change the **shape of the lens**'], ['Suspensory ligaments', 'connect the lens to the ciliary muscles'], ['Retina', '**receptors** sensitive to light intensity and colour'], ['Optic nerve', 'carries **impulses** to the brain'], ['Sclera', 'tough white **outer layer**; protects the eye']];
  const kx = MX + 6.95, kw = W - MX - kx;
  parts.forEach(([a, b], i) => {
    const y = 1.4 + i * 0.68;
    rect(s, kx, y, kw, 0.62, i % 2 ? C.white : C.soft, C.line);
    badge(s, kx + 0.3, y + 0.31, i + 1);
    txt(s, a, kx + 0.6, y, 2.1, 0.62, { size: 15, bold: true, valign: 'middle' });
    txt(s, b, kx + 2.65, y, kw - 2.75, 0.62, { size: 14, valign: 'middle' });
  });
  notes(s, 'Spec 4.5.2.3: "The eye is a sense organ containing receptors sensitive to light intensity and colour. Students should be able to relate the structures of the eye to their functions": retina, optic nerve, sclera, cornea, iris, ciliary muscles, suspensory ligaments. Simplified side view, light enters from the left.');
}

{
  const s = frame('The iris reflex: adapting to light', { tag: '4.5.2.3' });
  const front = (cx, cy, pupil, lab) => {
    circle(s, cx, cy, 2.6, C.white, '8C8C8C', 2);
    circle(s, cx, cy, 1.7, '7A5230', '5A3A1E', 1.5);
    circle(s, cx, cy, pupil, '111111');
    txt(s, lab, cx - 1.8, cy + 1.45, 3.6, 0.4, { size: 18, bold: true, align: 'center' });
  };
  front(MX + 2.0, 3.0, 0.45, 'Bright light'); front(MX + 5.4, 3.0, 1.15, 'Dim light');
  const tx = MX + 7.6, tw = W - MX - tx;
  const head = ['', 'Bright', 'Dim'];
  const rows = [['Circular muscles', 'contract', 'relax'], ['Radial muscles', 'relax', 'contract'], ['Pupil', 'smaller', 'bigger'], ['Light in', 'less', 'more']];
  const cws = [2.0, (tw - 2.0) / 2, (tw - 2.0) / 2];
  head.forEach((t, j) => { const x = tx + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, 1.5, cws[j], 0.55, C.maroon); txt(s, t, x + 0.1, 1.5, cws[j] - 0.2, 0.55, { size: 16, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = tx + cws.slice(0, j).reduce((a, b) => a + b, 0), y = 2.05 + i * 0.6; rect(s, x, y, cws[j], 0.6, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.1, y, cws[j] - 0.2, 0.6, { size: 16, bold: j === 0, valign: 'middle' }); }));
  rect(s, MX, 5.15, W - 2 * MX, 1.7, C.orangeSoft, 'F3D9B5');
  txt(s, 'This is a **reflex**: automatic and rapid. In bright light it stops too much light **damaging the retina**. In dim light it lets more light in so we can see.', MX + 0.3, 5.15, W - 2 * MX - 0.6, 1.7, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.5.2.3 includes "adaptation to dim light". The circular and radial muscles of the iris work antagonistically. Link to the reflex arc in lesson 1: receptor = retina, effector = iris muscles.');
}

D.hinge({
  title: 'Quick check',
  q: 'What is the job of the cornea?',
  options: ['To refract light into the eye', 'To detect light', 'To control the size of the pupil', 'To carry impulses to the brain'],
  correct: 0,
  notes: 'Answer A. B: retina. C: iris. D: optic nerve.',
});

D.myTurnYourTurn({
  title: 'Parts of the eye', tag: 'Part 2', stepSize: 20, labelW: 2.35, labelSize: 18, labelPlain: true, labelColor: C.ink, showYourQs: true,
  mine: {
    q: 'Give the function of each part.',
    steps: [
      { label: 'Retina', text: '**Light receptors**' },
      { label: 'Optic nerve', text: '**Impulses to brain**' },
      { label: 'Iris', text: '**Controls pupil size**' },
      { label: 'Sclera', text: '**Protective layer**' },
    ],
  },
  yours: {
    q: 'Give the function of each part.',
    steps: [
      { label: 'Cornea', text: '**Refracts light**' },
      { label: 'Lens', text: '**Focuses the light**' },
      { label: 'Ciliary muscles', text: '**Change lens shape**' },
      { label: 'Suspensory ligaments', text: '**Hold the lens**' },
    ],
  },
  notes: 'Suspensory ligaments connect the lens to the ciliary muscles: when they are pulled tight, the lens is pulled thin (Part 3).',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: accommodation (focusing)', { tag: '4.5.2.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const panel = (x, head, colour, fill, near) => {
    headCard(s, x, top, cw, 5.45, head, colour, fill);
    const cx = x + 2.75, cy = 3.05, R = 1.2;
    circle(s, cx, cy, 2 * R, C.white, '8C8C8C', 2);
    arc(s, cx, cy, R - 0.06, -110, 110, RET, 4);
    const lx = cx - R + 0.45, lw = near ? 0.55 : 0.25;
    rect(s, lx - 0.12, cy - 1.0, 0.24, 0.2, 'D98C8C', '9C4F4F'); rect(s, lx - 0.12, cy + 0.8, 0.24, 0.2, 'D98C8C', '9C4F4F');
    seg(s, lx, cy - 0.8, lx, cy - 0.5, '555555', 1.5, near ? 'dash' : undefined); seg(s, lx, cy + 0.5, lx, cy + 0.8, '555555', 1.5, near ? 'dash' : undefined);
    ell(s, lx - lw / 2, cy - 0.5, lw, 1.0, 'EAF3FB', '5B87B5', 2);
    const fx = cx + R - 0.06;
    if (near) { [-1, 1].forEach(k => { seg(s, x + 0.4, cy, lx, cy + k * 0.38, RAY, 2); seg(s, lx, cy + k * 0.38, fx, cy, RAY, 2); }); }
    else { [-1, 1].forEach(k => { seg(s, x + 0.3, cy + k * 0.38, lx, cy + k * 0.38, RAY, 2); seg(s, lx, cy + k * 0.38, fx, cy, RAY, 2); }); }
    txt(s, near ? 'near object: light spreads out' : 'distant object: light rays parallel', x + 0.25, 4.35, cw - 0.5, 0.35, { size: 14, color: C.grey });
    bullets(s, x + 0.25, 4.8, cw - 0.5, near ? ['Ciliary muscles **contract**', 'Suspensory ligaments **loosen**', 'Lens becomes **thicker**', 'Light is refracted **strongly**'] : ['Ciliary muscles **relax**', 'Suspensory ligaments **pulled tight**', 'Lens pulled **thin**', 'Light refracted only **slightly**'], 17, 0.04);
  };
  panel(MX, 'Looking at a NEAR object', C.maroon, C.soft, true);
  panel(MX + cw + gap, 'Looking at a DISTANT object', C.green, C.greenSoft, false);
  notes(s, 'Spec 4.5.2.3: "To focus on a near object: the ciliary muscles contract; the suspensory ligaments loosen; the lens is then thicker and refracts light rays strongly. To focus on a distant object: the ciliary muscles relax; the suspensory ligaments are pulled tight; the lens is then pulled thin and only slightly refracts light rays." Dashed ligaments = slack. Memory aid: Near → coNtract.');
}

D.hinge({
  title: 'Quick check',
  q: 'You look at a distant mountain. What do your ciliary muscles do?',
  options: ['Relax, so the lens is pulled thin', 'Contract, so the lens gets thicker', 'Relax, so the lens gets thicker', 'Contract, so the lens is pulled thin'],
  correct: 0,
  notes: 'Answer A. B is for a near object. C and D mix up the two.',
});

D.myTurnYourTurn({
  title: 'Explaining accommodation', tag: 'Exam skill', stepSize: 19, labelW: 1.85, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Explain how the eye focuses on a book.  [4 marks]',
    steps: [
      { label: 'Ciliary', text: '**Ciliary muscles contract**' },
      { label: 'Ligaments', text: '**Suspensory ligaments loosen**' },
      { label: 'Lens', text: '**Becomes thicker, rounder**' },
      { label: 'Light', text: '**Refracted strongly**' },
    ],
  },
  yours: {
    q: 'Explain how the eye focuses on a distant tree.  [4 marks]',
    steps: [
      { label: 'Ciliary', text: '**Ciliary muscles relax**' },
      { label: 'Ligaments', text: '**Pulled tight**' },
      { label: 'Lens', text: '**Pulled thin**' },
      { label: 'Light', text: '**Refracted only slightly**' },
    ],
  },
  notes: 'Order matters: muscles → ligaments → lens shape → refraction. Each is one mark.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: short and long sight', { tag: '4.5.2.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  const diagram = (x, y, focusDx, spect) => {
    const cx = x + 3.6, cy = y, R = 0.95;
    circle(s, cx, cy, 2 * R, C.white, '8C8C8C', 2);
    arc(s, cx, cy, R - 0.05, -110, 110, RET, 4);
    const lx = cx - R + 0.3, fx = cx + R - 0.05 + focusDx;
    ell(s, lx - 0.12, cy - 0.45, 0.24, 0.9, 'EAF3FB', '5B87B5', 1.5);
    if (!spect) {
      [-1, 1].forEach(k => { seg(s, x + 0.4, cy + k * 0.32, lx, cy + k * 0.32, RAY, 2); seg(s, lx, cy + k * 0.32, fx, cy, RAY, 2); if (focusDx < 0) { const rr = cx + R - 0.1; seg(s, fx, cy, rr, cy - k * 0.32 * (rr - fx) / (fx - lx), RAY, 2); } });
    } else {
      const sx = x + 1.3, conc = spect === 'concave', out = conc ? 0.42 : 0.24, rfx = cx + R - 0.05;
      vline(s, sx, cy - 0.6, cy + 0.6, C.blue, 3);
      [-1, 1].forEach(k => { const yy = cy + k * 0.6; if (conc) { seg(s, sx, yy, sx - 0.15, yy + k * 0.15, C.blue, 3); seg(s, sx, yy, sx + 0.15, yy + k * 0.15, C.blue, 3); } else { seg(s, sx, yy, sx - 0.15, yy - k * 0.15, C.blue, 3); seg(s, sx, yy, sx + 0.15, yy - k * 0.15, C.blue, 3); } });
      [-1, 1].forEach(k => { seg(s, x + 0.4, cy + k * 0.32, sx, cy + k * 0.32, RAY, 2); seg(s, sx, cy + k * 0.32, lx, cy + k * out, RAY, 2); seg(s, lx, cy + k * out, rfx, cy, RAY, 2); });
    }
  };
  const col = (x, head, colour, fill, dx, cause, lens, spect) => {
    headCard(s, x, top, cw, 5.45, head, colour, fill);
    diagram(x, 3.02, dx, null);
    txt(s, cause, x + 0.25, 4.0, cw - 0.5, 0.6, { size: 16 });
    diagram(x, 5.32, 0, spect);
    txt(s, lens, x + 0.25, 6.32, cw - 0.5, 0.45, { size: 16, bold: true, color: C.blue });
  };
  col(MX, 'Short sight (myopia)', C.maroon, C.soft, -0.75, 'Distant objects blurred: focus is **in front of** the retina.', 'Corrected with a concave (diverging) lens', 'concave');
  col(MX + cw + gap, 'Long sight (hyperopia)', C.orange, C.orangeSoft, 0.6, 'Near objects blurred: focus would be **behind** the retina.', 'Corrected with a convex (converging) lens', 'convex');
  notes(s, 'Spec 4.5.2.3: "Two common defects of the eyes are myopia (short sightedness) and hyperopia (long sightedness) in which rays of light do not focus on the retina. Generally these defects are treated with spectacle lenses which refract the light rays so that they do focus on the retina." Causes: myopia: eyeball too long or lens too thick; hyperopia: eyeball too short or lens too thin. Top diagrams: uncorrected; bottom: corrected (blue = spectacle lens symbol).');
}

{
  const s = frame('New technologies for correcting sight', { tag: '4.5.2.3' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 3.4;
  [['Contact lenses', '**Hard** or **soft** lenses sit on the cornea. Hard to see, good for sport. Risk of infection if not kept clean.'], ['Laser surgery', 'A laser changes the **shape of the cornea**, so it refracts light by the right amount. Permanent, but carries surgical risks.'], ['Replacement lens', 'The lens is replaced with a **clear plastic** one. Used for cataracts; more risky (close to the retina).']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, top + 0.75, cw - 0.4, h - 0.9, { size: 18 });
  });
  rect(s, MX, 5.05, W - 2 * MX, 1.8, C.greenSoft, C.green);
  txt(s, '**Evaluating:** compare cost, risk, convenience and whether it is permanent. Spectacles are cheap and safe but can be lost or broken; surgery is permanent but has risks.', MX + 0.3, 5.05, W - 2 * MX - 0.6, 1.8, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.5.2.3: "New technologies now include hard and soft contact lenses, laser surgery to change the shape of the cornea and a replacement lens in the eye." A good 4–6 mark evaluation question.');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Which part of the brain coordinates balance?', 'Cerebellum'], ['Give two functions of the cerebral cortex.', 'Memory and language (or consciousness)'], ['Which part of the eye contains light receptors?', 'Retina'], ['What does the iris do in bright light?', 'Makes the pupil smaller'],
    ['HT  Give one way scientists map functions to brain regions.', 'MRI scans (or stimulation, brain damage)'], ['What happens to the lens when you look at something close?', 'It becomes thicker'],
    ['Where does light focus in a short-sighted eye?', 'In front of the retina'], ['What type of lens corrects long sight?', 'A convex (converging) lens'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) cerebellum  2) consciousness, intelligence, memory, language  3) retina  4) circular muscles contract; pupil gets smaller  5) studying patients with brain damage; electrical stimulation; MRI  6) ciliary muscles contract, ligaments loosen, lens thicker  7) in front of the retina  8) convex (converging).');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Name the part of the brain that coordinates muscle activity.', m: 1, lines: 0 },
    { l: 'b', q: 'HT  Suggest two reasons why it is difficult to treat damage to the brain.', m: 2, lines: 1 },
    { l: 'c', q: 'Explain how the eye changes to focus on a near object.', m: 4, lines: 2 },
    { l: 'd', q: 'A student is short-sighted. Explain why she cannot see distant objects clearly, and how this is corrected.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'cerebellum', '1', ''],
    ['(b)', 'any two: complex; delicate / easily damaged; hard to reach; hard to find the exact area; drugs may not reach it', '2', ''],
    ['(c)', 'ciliary muscles contract; suspensory ligaments loosen; lens becomes thicker; light refracted more strongly', '4', ''],
    ['(d)', 'light focuses in front of the retina; (eyeball too long / lens too thick); concave lens refracts light so it focuses on the retina', '3', 'allow: contact lenses / laser surgery for the third mark'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What does the medulla control?', 'What do the suspensory ligaments do?', 'What do the ciliary muscles do when you look at a distant object?', 'Name one new technology used to correct sight.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) unconscious activities: heart rate, breathing  2) connect the lens to the ciliary muscles  3) relax  4) contact lenses, laser surgery or a replacement lens. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw a side view of the brain and label the three regions with their functions.',
    'HT  Describe three ways scientists have studied the brain.',
    'Draw and label the eye with eight parts and their functions.',
    'Explain the iris reflex in bright light, as a reflex arc.',
    'Compare how the eye focuses on near and distant objects.',
    'Evaluate laser surgery compared with glasses for short sight.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) cerebral cortex (memory, language, consciousness); cerebellum (coordination, balance); medulla (heartbeat, breathing)  2) brain damage patients; electrical stimulation; MRI  3) see the eye structure slide  4) retina receptor → sensory neurone → brain (unconscious) → motor neurone → circular muscles contract → pupil smaller  5) near: muscles contract, ligaments slack, lens thick; far: relax, tight, thin  6) surgery: permanent, no glasses; but cost and surgical risk; glasses: cheap, safe, can be lost.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.5_B_BrainAndEye.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count));
