// build_B5_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B5 The human body – staying alive, B5.2 How does the nervous system help us respond to changes?
// (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B5_2.js
// Structure copied from build_B4_3.js. ocr_bio_template.js is NOT edited by this deck: body/nervous system,
// neurone, synapse, spinal cord, reflex arc and ruler-drop helpers are in the DECK-SPECIFIC block below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B5', chapterTitle: 'The human body – staying alive', code: 'B5.2', title: 'How does the nervous system help us respond to changes?',
  part: 2, parts: 6, specRange: 'B5.2.1–B5.2.3',
  subtitle: 'How does the nervous system help us respond to changes?',
  keywords: ['Receptors', 'Neurones', 'Synapses', 'Reflex arc', 'Effectors', 'Reaction time'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
const G = 9.8; // m/s², gravitational field strength used for the ruler conversion (stretch)
const rt = dcm => Math.sqrt(2 * (dcm / 100) / G); // reaction time / s from distance fallen / cm
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
// slide 9 / 13: impulse timing, time = distance ÷ speed
calc('myelinated motor neurone 1.0 m / 100 m/s', 1.0 / 100, 0.01, 1e-12);
calc('same in ms', 1.0 / 100 * 1000, 10, 1e-9);
calc('unmyelinated 1.0 m / 1 m/s', 1.0 / 1, 1);
calc('QC 0.8 m / 80 m/s in ms', 0.8 / 80 * 1000, 10, 1e-9);
calc('reflex path 1.5 m / 75 m/s', 1.5 / 75, 0.02, 1e-12);
calc('reflex path in ms', 1.5 / 75 * 1000, 20, 1e-9);
calc('QC voluntary path 2.4 m / 60 m/s in ms', 2.4 / 60 * 1000, 40, 1e-9);
// practical: ruler drop, no distraction (A) vs counting backwards (B); 35.2 is an anomaly
const PA = [16.2, 14.8, 15.5, 17.1, 15.4];
const PB = [22.6, 24.1, 21.5, 35.2, 23.8];
const ANOM = 35.2;
const sumA = calc('A sum', PA.reduce((a, b) => a + b, 0), 79.0, 1e-9);
const mA = calc('A mean 79.0 / 5', mean(PA), 15.8, 1e-9);
const PBok = PB.filter(v => v !== ANOM);
const sumB = calc('B sum without anomaly', PBok.reduce((a, b) => a + b, 0), 92.0, 1e-9);
const mB = calc('B mean 92.0 / 4', mean(PBok), 23.0, 1e-9);
calc('B mean if anomaly kept (wrong)', mean(PB), 25.44, 1e-9);
const tA = calc('t(15.8 cm)', rt(mA), 0.1795686441425219, 1e-12);
const tB = calc('t(23.0 cm)', rt(mB), 0.21665358411575858, 1e-12);
calc('tA 2 s.f.', sf(tA, 2), 0.18, 1e-12);
calc('tB 2 s.f.', sf(tB, 2), 0.22, 1e-12);
calc('tA ms 3 s.f.', sf(tA * 1000, 3), 180, 1e-9);
calc('tB ms 3 s.f.', sf(tB * 1000, 3), 217, 1e-9);
calc('% increase 2 s.f. (stretch)', sf((tB - tA) / tA * 100, 2), 21, 1e-9);
calc('range A 17.1 - 14.8', 17.1 - 14.8, 2.3, 1e-9);
// conversion table
const CONV = [5, 10, 15, 20, 25, 30].map(d => [d, rt(d)]);
[0.101, 0.143, 0.175, 0.202, 0.226, 0.247].forEach((v, i) => calc(`conversion ${CONV[i][0]} cm 3 d.p.`, Math.round(CONV[i][1] * 1000) / 1000, v, 1e-12));
// recap 4
const R4D = [12.0, 13.4, 12.8, 14.2, 13.1];
calc('R4 mean', mean(R4D), 13.1, 1e-9);
calc('R4 time 2 s.f.', sf(rt(13.1), 2), 0.16, 1e-12);
calc('R4 range 14.2 - 12.0', 14.2 - 12.0, 2.2, 1e-9);
// full question
const FQD = [19.0, 20.4, 19.8, 19.2];
calc('FQ mean', mean(FQD), 19.6, 1e-9);
calc('FQ time', rt(19.6), 0.2, 1e-9);
// homework
calc('HW mean 20,22,21,23,19', mean([20, 22, 21, 23, 19]), 21, 1e-9);
calc('HW time 2 s.f.', sf(rt(21), 2), 0.21, 1e-12);
// starter
calc('starter 23 pairs', 23 * 2, 46);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_bio_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: o.rot, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' },
    line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const fmt = v => String(+v.toFixed(6));
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
// polyline
function pline(s, pts, col, w = 2) { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, w); }
// small arrowhead in the middle of segment a→b to show impulse direction
function midArrow(s, a, b, col) {
  const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, L = Math.hypot(b[0] - a[0], b[1] - a[1]), ux = (b[0] - a[0]) / L, uy = (b[1] - a[1]) / L;
  arrow(s, mx - ux * 0.12, my - uy * 0.12, mx + ux * 0.12, my + uy * 0.12, col, 2.25);
}
// grey leader line
const lead = (s, x1, y1, x2, y2) => line(s, x1, y1, x2, y2, '5A6275', 0.75);
// neurone colours
const NC = { sens: '2F6DB5', relay: '2E8B57', motor: 'C8414C', body: '6A4C93', myelin: 'FBE3A6', myelinEdge: 'C9A04A' };
// myelinated axon from x1 to x2 at height y (horizontal)
function axonH(s, x1, x2, y, col, o = {}) {
  line(s, x1, y, x2, y, col, o.w || 2.5);
  if (o.myelin === false) return;
  const seg = o.seg || 0.42, gap = 0.08, h = o.h || 0.2;
  for (let x = x1 + (o.start || 0.15); x + seg <= x2 - 0.1; x += seg + gap) box(s, x, y - h / 2, seg, h, NC.myelin, NC.myelinEdge, { shape: SH.ROUNDED_RECTANGLE, r: h / 2, lw: 0.75 });
}
// cell body with dendrites at (cx, cy); dir = -1 dendrites to the left
function cellBody(s, cx, cy, r, col, o = {}) {
  const n = o.n || 6, spread = o.spread || 200, base = o.base != null ? o.base : 180;
  for (let i = 0; i < n; i++) {
    const a = (base - spread / 2 + spread * i / (n - 1)) * Math.PI / 180;
    const x2 = cx + Math.cos(a) * r * 2.6, y2 = cy - Math.sin(a) * r * 2.6;
    line(s, cx, cy, x2, y2, col, 1.5);
    const a2 = a + 0.45, a3 = a - 0.45;
    line(s, x2, y2, x2 + Math.cos(a2) * r * 0.9, y2 - Math.sin(a2) * r * 0.9, col, 1);
    line(s, x2, y2, x2 + Math.cos(a3) * r * 0.9, y2 - Math.sin(a3) * r * 0.9, col, 1);
  }
  ball(s, cx, cy, r, 'E3D7F0', col, 1.5);
  ball(s, cx, cy, r * 0.42, C.nucleus, C.nucleusEdge, 1);
}
// axon terminals at (x, y) fanning right
function terminals(s, x, y, col, k = 1) {
  [[-0.3, 0.45], [-0.1, 0.5], [0.1, 0.5], [0.3, 0.45]].forEach(([dy, dx]) => {
    line(s, x, y, x + dx * k, y + dy * k, col, 1.5);
    ball(s, x + dx * k, y + dy * k, 0.045 * k, col);
  });
}
// muscle block (effector)
function muscleBlock(s, x, y, w, h) {
  box(s, x, y, w, h, 'F4B6B9', 'A33E48', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 });
  for (let i = 1; i < 6; i++) line(s, x + 0.05, y + i * h / 6, x + w - 0.05, y + i * h / 6, 'C76A72', 0.75);
}
// receptor icons
function eyeIcon(s, cx, cy, k = 1) { oval(s, cx, cy, 0.5 * k, 0.28 * k, C.white, '5A6275', { lw: 1.25 }); ball(s, cx, cy, 0.1 * k, '3B7DD8', '1F4E8C'); ball(s, cx, cy, 0.045 * k, '1A1A1A'); }
function earIcon(s, cx, cy, k = 1) {
  s.addShape(SH.BLOCK_ARC, { x: cx - 0.18 * k, y: cy - 0.22 * k, w: 0.36 * k, h: 0.44 * k, angleRange: [200, 140], arcThicknessRatio: 0.35, fill: { color: 'F2C9A5' }, line: { color: 'B07A50', width: 1 } });
}
function noseIcon(s, cx, cy, k = 1) { poly(s, [[cx, cy - 0.2 * k], [cx + 0.15 * k, cy + 0.16 * k], [cx - 0.12 * k, cy + 0.16 * k]], 'F2C9A5', 'B07A50', { lw: 1 }); }
function tongueIcon(s, cx, cy, k = 1) { box(s, cx - 0.14 * k, cy - 0.2 * k, 0.28 * k, 0.4 * k, 'F29BA5', 'B5545C', { shape: SH.ROUNDED_RECTANGLE, r: 0.13 * k }); line(s, cx, cy - 0.15 * k, cx, cy + 0.08 * k, 'B5545C', 1); }
function skinIcon(s, cx, cy, k = 1) {
  box(s, cx - 0.25 * k, cy - 0.18 * k, 0.5 * k, 0.12 * k, 'F2C9A5', 'B07A50', { lw: 0.75 });
  box(s, cx - 0.25 * k, cy - 0.06 * k, 0.5 * k, 0.24 * k, 'F8E1CF', 'B07A50', { lw: 0.75 });
  [-0.15, 0, 0.15].forEach(dx => ball(s, cx + dx * k, cy + 0.06 * k, 0.035 * k, NC.sens));
}
function glandIcon(s, cx, cy, k = 1) {
  oval(s, cx, cy, 0.5 * k, 0.42 * k, 'D9E8C8', '5E8A3A', { lw: 1.25 });
  [[-0.1, -0.05], [0.08, -0.08], [0.0, 0.08], [0.12, 0.07]].forEach(([dx, dy]) => ball(s, cx + dx * k, cy + dy * k, 0.035 * k, '5E8A3A'));
  line(s, cx + 0.2 * k, cy + 0.1 * k, cx + 0.42 * k, cy + 0.26 * k, '5E8A3A', 1.75);
  [[0.48, 0.34], [0.56, 0.46]].forEach(([dx, dy]) => ball(s, cx + dx * k, cy + dy * k, 0.04 * k, '7FA9C4', '4F7FB8'));
}
// spinal cord cross-section, centre (cx, cy); dorsal (back) is at the top. Returns key points.
function spinalCord(s, cx, cy, k = 1) {
  oval(s, cx, cy, 1.9 * k, 1.6 * k, 'F7F3FB', '8A7AA8', { lw: 1.5 });
  const g = 'D8C8EC', ge = '8A7AA8';
  oval(s, cx - 0.36 * k, cy - 0.3 * k, 0.32 * k, 0.62 * k, g, ge, { rot: -25 });
  oval(s, cx + 0.36 * k, cy - 0.3 * k, 0.32 * k, 0.62 * k, g, ge, { rot: 25 });
  oval(s, cx - 0.36 * k, cy + 0.28 * k, 0.48 * k, 0.6 * k, g, ge, { rot: 20 });
  oval(s, cx + 0.36 * k, cy + 0.28 * k, 0.48 * k, 0.6 * k, g, ge, { rot: -20 });
  box(s, cx - 0.4 * k, cy - 0.1 * k, 0.8 * k, 0.24 * k, g, null);
  ball(s, cx, cy + 0.02 * k, 0.05 * k, C.white, ge);
  return { dorsal: [cx - 0.48 * k, cy - 0.5 * k], ventral: [cx - 0.42 * k, cy + 0.38 * k] };
}
// flow chart box
function fbox(s, x, y, w, h, t, fill, col, size = 10.5) {
  box(s, x, y, w, h, fill, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, x + 0.04, y, w - 0.08, t, { h, size, color: C.text });
}
// hand drawn from the side (simple)
function flame(s, cx, yb) {
  box(s, cx - 0.09, yb - 0.55, 0.18, 0.55, 'F6F0E0', 'B9A47A', { lw: 1 });
  oval(s, cx, yb - 0.78, 0.2, 0.42, 'F5A742', 'D9822B', { lw: 1 });
  oval(s, cx, yb - 0.72, 0.09, 0.2, 'FCE38A', null);
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'The nervous system',
  footer: `OCR J260 Combined Science B • ${DECK.code} ${DECK.title} • teacher deck • mark schemes and answers in the speaker notes`,
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • suggested practical: reaction time (ruler drop test)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found • stretch marked' },
    { icon: '⚡', text: 'Receptors • neurones • synapses • reflex arc • effectors • reaction time' },
  ],
  notes: 'B5.2 How does the nervous system help us respond to changes? is Part 2 of 6 in J260 Chapter B5 The human body – staying alive (B5.1–B5.6; OCR J260 "specification at a glance" lists all six questions).\nScope: J260 Combined Science B covers B5.2.1 (components of the nervous system), B5.2.2 (neurones and synapses) and B5.2.3 (reflex arc). The brain (cerebral cortex, cerebellum, brain stem) and the difficulties of investigating brain function appear to be Biology B (J257) only, so they are not taught here. The eye is not in J260 B5.2 either. Statement wording comes from search extracts (ocr.org.uk could not be fetched): see SPEC_B5_2.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B5.2.1', text: 'Describe the **nervous system**: the **CNS** (brain and spinal cord) and the nerves of the peripheral nervous system.' },
  { code: 'B5.2.1', text: 'Explain how **receptors**, **sensory neurones**, the **CNS**, **motor neurones** and **effectors** work together.' },
  { code: 'B5.2.2', text: 'Describe the structure of a **neurone** and explain how the axon, dendrites and **myelin sheath** suit its job.' },
  { code: 'B5.2.2', text: 'Compare **sensory**, **relay** and **motor** neurones.' },
  { code: 'B5.2.2', text: 'Explain how a **synapse** passes an impulse on, using a **neurotransmitter**.' },
  { code: 'B5.2.3', text: 'Explain how the structure of a **reflex arc**, including the **relay neurone**, gives a fast, automatic response.' },
  { code: 'B5.2.3', text: 'Compare **reflex** actions with **voluntary** (conscious) responses.' },
  { code: 'Practical', text: 'Measure **reaction time** with a ruler drop test; calculate **means** and convert distance to time.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'No B5.2 statement was found to be Higher tier only (bold) in J260 (UNVERIFIED). Oak National Academy runs the same four OCR combined science lessons (the human nervous system; neurones and synapses; the structure and function of a reflex arc; human reaction time practical) in its Foundation and Higher programmes, which suggests no HT-only content. The distance-to-time equation for the ruler drop is labelled stretch.\nWording: B5.2.1 "explain how the components of the nervous system work together to enable it to function, including sensory receptors, sensory neurons, the CNS, motor neurons and effectors" (J257 mirror extract); B5.2.2 nerve cells and synapses; B5.2.3 reflex arc including the relay neurone (paraphrased in extracts). Learners are not expected to explain impulses in terms of membrane potentials. Check SPEC_B5_2.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B5 The human body – staying alive • B5.2 is Part 2 of 6 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B5.2.1', 'The nervous system: CNS, receptors and effectors', 'Both tiers', C.blue],
    ['B5.2.2', 'Neurones: structure, types and the myelin sheath', 'Both tiers', C.blue],
    ['B5.2.2', 'Synapses and neurotransmitters', 'Both tiers', C.blue],
    ['B5.2.3', 'The reflex arc; reflex vs voluntary responses', 'Both tiers', C.blue],
    ['Practical', 'Reaction time: the ruler drop test', 'Practical', C.orange],
    ['Maths', 'Means, anomalies, reading a graph; time = distance ÷ speed', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B5.2\nThe nervous system', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B4.3 specialised cells • B4.1 respiration (ATP) • B5.1 diffusion • KS3 muscles', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.25, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'B5.1 How do substances get into, out of and around our bodies?',
      '**B5.2 How does the nervous system help us respond to changes?** (this deck)',
      'B5.3 How do hormones control responses in the human body?',
      'B5.4 Why do we need to maintain a constant internal environment?',
      'B5.5 What role do hormones play in human reproduction?',
      'B5.6 What can happen when organs and control systems stop working?',
    ], { size: 11, color: 'E3F2F0' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 3.05, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.75, 5.53, 2.1, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Every slide is for both tiers: no B5.2 statement was found to be Higher only.',
      'The **brain** regions and the **eye** are Biology B (J257) only: not in this deck.',
      'Practical: **reaction time** (ruler drop). The equation for converting distance to time is a stretch.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.85, w: 5.15, h: 1.9, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B5 has six sub-topics (OCR specification at a glance; Doc Brown combined-science page). This deck is B5.2.\nOverlap control: hormones and the endocrine system are B5.3 (glands appear here only as effectors); homeostasis is B5.4; damage to the nervous system and eye defects belong to B5.6 / J257 only. Diffusion (B5.1) is used only to explain how neurotransmitter crosses the synaptic gap.\nThe brain (cerebral cortex, cerebellum, brain stem) and the difficulties of investigating brain function appear to be J257 only: Oak National Academy\'s OCR combined science unit has four lessons (nervous system, neurones and synapses, reflex arc, reaction time practical), while its full OCR biology unit adds the eye, eye defects, the brain and brain damage (UNVERIFIED against the J260 PDF).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B4.3 • differentiation', q: 'A nerve cell is a **specialised** cell. Name the process by which a cell becomes specialised.' },
  { from: 'B4.1 • respiration', q: 'Nerve cells contain many **mitochondria**. Explain why.' },
  { from: 'B5.1 • diffusion', q: 'Define **diffusion**.' },
  { from: 'B4.2 • cell structures', q: 'What is the function of the **cell membrane**?' },
  { from: 'KS3 • muscles', q: 'What does a muscle do when it receives a signal? How does this move a bone?' },
  { from: 'KS3 • senses', q: 'Name **three** sense organs and the **stimulus** each one detects.' },
], { subtitle: 'Recall from B4.1, B4.2, B4.3, B5.1 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Differentiation.\n2. To carry out (aerobic) respiration, releasing energy / making ATP for the cell (e.g. to send impulses, make neurotransmitter).\n3. The net movement of particles from a region of higher concentration to a region of lower concentration (down a concentration gradient).\n4. Controls what enters and leaves the cell.\n5. It contracts (gets shorter), pulling on the bone (via a tendon) so the bone moves at a joint.\n6. Any three: eye – light; ear – sound (and balance / position); nose – chemicals (smell); tongue – chemicals (taste); skin – touch / pressure / temperature / pain.' }), 'Retrieval starter');

// ======================= 5 THE NERVOUS SYSTEM =======================
reg(D.contentSlide({
  title: 'The nervous system: stimulus to response',
  subtitle: `Specification ${sp('B5.2.1')} • the nervous system lets us respond quickly to changes inside and outside the body`,
  tag: 'B5.2.1', caption: 'CNS in red; peripheral nerves in yellow; not to scale',
  draw: (s, p) => {
    const cx = 1.9, skin = 'F8E4D4', edge = 'C9A88A';
    // body
    poly(s, [[1.38, 2.62], [1.2, 2.66], [0.72, 4.25], [0.93, 4.32]], skin, edge);
    poly(s, [[3.8 - 1.38, 2.62], [3.8 - 1.2, 2.66], [3.8 - 0.72, 4.25], [3.8 - 0.93, 4.32]], skin, edge);
    poly(s, [[1.42, 4.2], [1.87, 4.2], [1.78, 5.75], [1.47, 5.75]], skin, edge);
    poly(s, [[3.8 - 1.42, 4.2], [3.8 - 1.87, 4.2], [3.8 - 1.78, 5.75], [3.8 - 1.47, 5.75]], skin, edge);
    box(s, 1.3, 2.55, 1.2, 1.85, skin, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.18, lw: 1 });
    box(s, 1.78, 2.38, 0.24, 0.22, skin, null);
    oval(s, cx, 1.95, 0.78, 0.9, skin, edge);
    // CNS
    oval(s, cx, 1.83, 0.6, 0.48, 'F2A0A6', '8E2A33', { lw: 1.25 });
    [-0.12, 0, 0.12].forEach(d => line(s, cx - 0.2, 1.83 + d, cx + 0.2, 1.83 + d * 0.6, 'C76A72', 0.75));
    line(s, cx, 2.06, cx, 4.2, 'D9534F', 6);
    // peripheral nerves
    const Y = 'E0A800';
    [[2.75, -1], [2.75, 1]].forEach(([y0, sg]) => pline(s, [[cx, y0], [cx + sg * 0.55, y0 + 0.05], [cx + sg * 0.98, 4.18]], Y, 2));
    [-1, 1].forEach(sg => pline(s, [[cx, 4.1], [cx + sg * 0.25, 4.35], [cx + sg * 0.27, 5.65]], Y, 2));
    [3.15, 3.5, 3.85].forEach(y => { line(s, cx, y, cx - 0.42, y + 0.12, Y, 1.5); line(s, cx, y, cx + 0.42, y + 0.12, Y, 1.5); });
    // labels
    label(s, 2.95, 1.62, 1.25, '**brain**', { size: 11, align: 'left' }); lead(s, 2.15, 1.8, 2.92, 1.76);
    label(s, 2.95, 2.75, 1.25, '**spinal cord**', { size: 11, align: 'left' }); lead(s, 1.95, 2.95, 2.92, 2.89);
    s.addShape(SH.RIGHT_BRACE, { x: 3.95, y: 1.6, w: 0.14, h: 1.45, line: { color: 'D9534F', width: 1.5 } });
    label(s, 2.95, 3.12, 1.3, '= **CNS** (central nervous system)', { size: 10, color: '8E2A33', align: 'left', h: 0.45, valign: 'top' });
    label(s, 2.95, 4.65, 1.25, '**nerves**: peripheral nervous system', { size: 10, align: 'left', h: 0.45, valign: 'top' });
    lead(s, 2.18, 4.9, 2.92, 4.85);
    // flow chart
    const steps = [['Stimulus', 'change, e.g. heat', 'FFF4E0', C.orangeBorder], ['Receptor', 'detects it', C.white, NC.sens], ['Sensory neurone', 'impulse to CNS', C.white, NC.sens],
      ['CNS (coordinator)', 'brain or spinal cord', 'FBE3E5', 'D9534F'], ['Motor neurone', 'impulse to effector', C.white, NC.motor], ['Effector', 'muscle or gland', C.white, NC.motor], ['Response', 'action', 'FFF4E0', C.orangeBorder]];
    steps.forEach(([h, t, f, c], i) => {
      const y = 1.45 + i * 0.64;
      box(s, 4.3, y, 2.1, 0.5, f, c, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
      s.addText([{ text: h, options: { bold: true, breakLine: true } }, { text: t, options: { fontSize: 10, color: C.grey } }], { x: 4.35, y, w: 2.0, h: 0.5, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', margin: 0 });
      if (i < steps.length - 1) arrow(s, 5.35, y + 0.5, 5.35, y + 0.64, C.ink, 1.5);
    });
  },
  head: 'Structure of the nervous system',
  lines: [
    'A **stimulus** is a change in the environment, inside or outside the body.',
    'The **central nervous system (CNS)** is the **brain** and **spinal cord**. It is the **coordinator**: it processes information and sends instructions.',
    'Nerves connect the CNS to the rest of the body (the **peripheral** nervous system).',
    'Information travels along **neurones** (nerve cells) as **electrical impulses**. A nerve is a bundle of many neurones.',
  ],
  size: 11,
  worked: { head: 'Worked example: trace the pathway', q: 'You see a ball coming and catch it. Identify each part of the pathway.',
    steps: [['Stimulus', 'light from the moving ball'], ['Receptor', 'light receptor cells in the eye'], ['Coordinator', 'CNS (brain) → motor neurones'], ['Effector', 'arm and hand muscles contract: catch']], size: 10.5 },
  qc: 'Name the **two** parts of the CNS. What is the job of the **coordinator** in the pathway from stimulus to response?',
  notes: 'QUICK CHECK ANSWER: Brain and spinal cord. The coordinator (CNS) receives impulses from the sensory neurones, processes the information and sends impulses along motor neurones to the right effectors.\nB5.2.1 wording (J257 mirror extract): "explain how the components of the nervous system work together to enable it to function, including sensory receptors, sensory neurons, the CNS, motor neurons and effectors". The term peripheral nervous system is useful context; it may not be required wording.',
}), 'B5.2.1 The nervous system');

// ======================= 6 RECEPTORS AND EFFECTORS =======================
reg(D.contentSlide({
  title: 'Receptors and effectors',
  subtitle: `Specification ${sp('B5.2.1')} • receptors detect stimuli; effectors bring about responses`,
  tag: 'B5.2.1', caption: 'receptor cells are found in sense organs; icons not to scale',
  draw: (s, p) => {
    label(s, 0.65, 1.42, 3.2, 'Receptors detect a stimulus', { size: 11.5, bold: true, color: NC.sens, align: 'left' });
    const rows = [[eyeIcon, 'Eye', 'light'], [earIcon, 'Ear', 'sound; position (balance)'], [noseIcon, 'Nose', 'chemicals (smell)'], [tongueIcon, 'Tongue', 'chemicals (taste)'], [skinIcon, 'Skin', 'touch, pressure, temperature, pain']];
    rows.forEach(([fn, org, st], i) => {
      const y = 1.8 + i * 0.66;
      box(s, 0.62, y, 3.35, 0.56, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      fn(s, 1.0, y + 0.28, 1);
      label(s, 1.4, y + 0.02, 0.75, `**${org}**`, { size: 11, align: 'left', h: 0.52 });
      label(s, 2.1, y + 0.02, 1.82, st, { size: 10.5, align: 'left', h: 0.52 });
    });
    label(s, 4.2, 1.42, 2.2, 'Effectors respond', { size: 11.5, bold: true, color: NC.motor, align: 'left' });
    box(s, 4.2, 1.8, 2.2, 1.55, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    muscleBlock(s, 4.4, 1.98, 1.8, 0.5);
    label(s, 4.25, 2.55, 2.1, '**Muscles** contract (shorten) to cause movement', { size: 10.5, h: 0.72, valign: 'top' });
    box(s, 4.2, 3.45, 2.2, 1.65, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    glandIcon(s, 4.95, 3.8, 1);
    label(s, 4.25, 4.3, 2.1, '**Glands** secrete (release) chemicals, e.g. sweat, saliva, hormones', { size: 10.5, h: 0.75, valign: 'top' });
    // example strip
    box(s, 0.62, 5.2, 5.78, 0.6, 'FFF4E0', 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.72, 5.2, 5.6, 'Smell of food (stimulus) → receptors in **nose** → CNS → salivary **gland** secretes saliva (response)', { size: 10.5, h: 0.6 });
  },
  head: 'Receptors and effectors',
  lines: [
    '**Receptors** are cells that detect a **stimulus**. Many are grouped in **sense organs**.',
    'A receptor changes the stimulus into an electrical **impulse** in a **sensory neurone**.',
    'Different receptors detect different stimuli: light, sound, chemicals, touch, temperature.',
    '**Effectors** are **muscles** or **glands**. They receive impulses along **motor neurones**.',
    'The response is coordinated, so the right effector responds at the right time.',
  ],
  size: 11,
  worked: { head: 'Worked example: identify', q: 'A cyclist hears a car horn and brakes. Identify the receptor, the coordinator and the effector.',
    steps: [['Stimulus', 'sound of the horn'], ['Receptor', 'sound receptors in the ear'], ['Coordinator', 'CNS (brain and spinal cord)'], ['Effector', 'hand muscles contract: squeeze the brake']], size: 10.5 },
  qc: 'Your hand touches a sharp pin. Name the **receptor**, the **effector** and the **response**.',
  notes: 'QUICK CHECK ANSWER: Receptor: pain / pressure receptors in the skin (of the finger). Effector: muscle (in the arm, e.g. biceps). Response: the muscle contracts and the hand is pulled away.\nGlands as effectors: link forward to B5.3 (hormones) only. Do not teach the endocrine system here. "Effectors are muscles or glands" is the key statement.',
}), 'B5.2.1 Receptors and effectors');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B5.2.1')} • the nervous system, receptors and effectors`, [
  { q: 'Name the **two** parts of the central nervous system (CNS).', marks: 2, ms: 'Brain (1); spinal cord (1).' },
  { q: 'Put these in the order an impulse passes through them: **motor neurone, receptor, CNS, effector, sensory neurone**.', marks: 2, ms: 'Receptor → sensory neurone → CNS → motor neurone → effector. 2 marks all correct; 1 mark for one adjacent pair swapped.' },
  { q: 'Name the **two** types of effector and state how each one responds.', marks: 2, ms: 'Muscles contract (1); glands secrete / release chemicals / hormones (1).' },
  { q: 'A bright light shines into a person\'s eyes and they **blink**. Identify the **stimulus** and the **receptor**.', marks: 2, ms: 'Stimulus: (bright) light (1); receptor: light receptors / cells in the eye / retina (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 NEURONE STRUCTURE =======================
{
  const s = D.contentHeader('The structure of a neurone', `Specification ${sp('B5.2.2')} • a motor neurone: structure linked to function`, { tag: 'B5.2.2' });
  D.panel(s, 0.45, 1.3, 7.3, 4.95, 'motor neurone (much shorter than real); arrows show the direction of the impulse');
  const y = 2.75;
  cellBody(s, 1.35, y, 0.34, NC.body, { n: 7, spread: 200, base: 180 });
  axonH(s, 1.69, 6.25, y, NC.body, { w: 3, start: 0.3, h: 0.24, seg: 0.5 });
  terminals(s, 6.25, y, NC.body, 0.95);
  muscleBlock(s, 6.75, 2.15, 0.62, 1.2);
  [[3.2, 3.35], [4.75, 4.9]].forEach(([a, b]) => arrow(s, a, y + 0.5, b, y + 0.5, C.red, 2));
  label(s, 3.0, y + 0.58, 2.2, 'direction of impulse', { size: 10.5, color: C.red, bold: true });
  // labels
  label(s, 0.55, 1.42, 1.3, '**dendrites**', { size: 11, align: 'left' }); lead(s, 0.95, 1.7, 0.8, 2.2);
  label(s, 1.6, 1.42, 1.6, '**cell body**', { size: 11, align: 'left' }); lead(s, 1.85, 1.7, 1.5, 2.48);
  label(s, 0.55, 3.75, 1.4, '**nucleus**', { size: 11, align: 'left' }); lead(s, 1.0, 3.75, 1.33, 2.82);
  label(s, 3.3, 1.42, 2.4, '**axon**: long, carries the impulse', { size: 11, align: 'left' }); lead(s, 3.5, 1.7, 3.6, 2.73);
  label(s, 4.05, 1.85, 2.6, '**myelin sheath**: fatty insulating layer', { size: 11, align: 'left' }); lead(s, 4.4, 2.12, 4.5, 2.65);
  label(s, 5.55, 3.45, 1.4, '**axon terminals**', { size: 11, align: 'left' }); lead(s, 6.3, 3.45, 6.55, 3.05);
  label(s, 6.55, 1.75, 1.15, '**effector** (muscle)', { size: 10.5, h: 0.4 });
  // nerve bundle inset
  box(s, 0.65, 4.25, 6.9, 1.55, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  ball(s, 1.45, 5.02, 0.6, 'F6F0E0', '8A6D3B', 1.5);
  [[0, 0], [0.3, -0.18], [-0.3, -0.16], [0.28, 0.2], [-0.28, 0.22], [0.02, 0.36], [0.02, -0.36], [0.4, 0.02], [-0.4, 0.03]].forEach(([dx, dy]) => { ball(s, 1.45 + dx, 5.02 + dy, 0.12, NC.myelin, NC.myelinEdge); ball(s, 1.45 + dx, 5.02 + dy, 0.04, NC.body); });
  label(s, 2.2, 4.35, 5.2, '**A nerve** is a bundle of many neurones (cross-section, left). Each axon has its own myelin sheath, so impulses stay separate.', { size: 10.5, align: 'left', h: 0.62, valign: 'top' });
  label(s, 2.2, 5.0, 5.2, 'Neurones can be **over 1 m long**, e.g. from the spinal cord to a toe, so one cell carries the impulse all the way.', { size: 10.5, align: 'left', h: 0.62, valign: 'top' });
  D.card(s, 8.0, 1.3, 4.88, 2.85, 'Structure and function', [
    '**Dendrites**: many branches receive impulses from other neurones.',
    '**Cell body**: contains the **nucleus** and most organelles.',
    '**Axon**: long, thin extension that carries impulses **away** from the cell body.',
    '**Myelin sheath**: insulates the axon so the impulse travels **faster**.',
    '**Axon terminals**: pass the impulse on, at a **synapse**.',
  ], { size: 10.5 });
  D.workedSteps(s, 8.0, 4.27, 4.88, 1.98, 'Worked example: why myelin matters', 'An impulse travels 1.0 m along a motor neurone at 100 m/s. How long does it take?', [
    ['Equation', 'time = distance ÷ speed'], ['Substitute', 'time = 1.0 m ÷ 100 m/s'], ['Answer', '0.01 s = 10 ms (without myelin ~1 m/s: about 1 s)']], { size: 10.5 });
  D.quickCheck(s, 'State the function of the **myelin sheath**. An impulse travels **0.8 m** at **80 m/s**: how many **ms** does it take?');
  D.notes(s, 'QUICK CHECK ANSWER: It insulates the axon / speeds up the impulse. 0.8 ÷ 80 = 0.01 s = 10 ms.\nNode: 1.0 ÷ 100 = 0.01 s = 10 ms; 1.0 ÷ 1 = 1 s; 0.8 ÷ 80 × 1000 = 10 ms. Speeds are typical textbook values: myelinated up to about 100 m/s, unmyelinated about 0.5–2 m/s (illustrative).\nB5.2.2 (J257 mirror extract, paraphrase): explain how the structures of nerve cells (and synapses) relate to their functions. Learners are not expected to explain impulses in terms of membrane potentials: keep to "electrical impulse".');
  reg(s, 'B5.2.2 Neurone structure');
}

// ======================= 9 THREE TYPES OF NEURONE =======================
{
  const s = D.contentHeader('Sensory, relay and motor neurones', `Specification ${sp('B5.2.2')} • three types of neurone, each shaped for its job`, { tag: 'B5.2.2' });
  D.panel(s, 0.45, 1.3, 6.4, 4.95, 'simplified neurones; arrows show the direction of the impulse');
  // sensory: receptor -> long dendron -> cell body on a side branch -> axon -> terminals
  let y = 2.0;
  label(s, 0.6, 1.4, 4.2, '**Sensory neurone**: receptor → CNS', { size: 11, color: NC.sens, align: 'left' });
  skinIcon(s, 0.95, y, 0.9);
  axonH(s, 1.2, 5.6, y, NC.sens, { start: 0.2 });
  line(s, 3.4, y, 3.4, y - 0.32, NC.sens, 2); ball(s, 3.4, y - 0.42, 0.13, 'D6E4F5', NC.sens, 1.25); ball(s, 3.4, y - 0.42, 0.055, C.nucleus, C.nucleusEdge);
  terminals(s, 5.6, y, NC.sens, 0.7);
  arrow(s, 1.9, y + 0.3, 2.6, y + 0.3, NC.sens, 2); arrow(s, 4.2, y + 0.3, 4.9, y + 0.3, NC.sens, 2);
  label(s, 3.55, y - 0.58, 1.3, 'cell body', { size: 10, align: 'left' });
  label(s, 0.6, y + 0.22, 0.9, 'receptor', { size: 10 });
  // relay
  y = 3.55;
  box(s, 0.6, 2.8, 6.1, 1.25, 'F7F3FB', '8A7AA8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 0.75 });
  label(s, 0.7, 2.83, 4.5, '**Relay neurone**: inside the CNS; links sensory to motor', { size: 11, color: NC.relay, align: 'left' });
  label(s, 5.4, 2.83, 1.25, 'CNS', { size: 10.5, bold: true, color: '8A7AA8', align: 'right' });
  cellBody(s, 2.7, y, 0.2, NC.relay, { n: 7, spread: 300, base: 180 });
  axonH(s, 2.9, 4.4, y, NC.relay, { myelin: false });
  terminals(s, 4.4, y, NC.relay, 0.55);
  arrow(s, 3.3, y + 0.25, 3.9, y + 0.25, NC.relay, 2);
  label(s, 0.75, y - 0.15, 1.4, 'many short dendrites', { size: 10, h: 0.45, valign: 'top' });
  // motor
  y = 5.0;
  label(s, 0.6, 4.25, 4.5, '**Motor neurone**: CNS → effector', { size: 11, color: NC.motor, align: 'left' });
  cellBody(s, 1.2, y, 0.22, NC.motor, { n: 6 });
  axonH(s, 1.42, 5.5, y, NC.motor, { start: 0.2 });
  terminals(s, 5.5, y, NC.motor, 0.6);
  muscleBlock(s, 5.95, 4.6, 0.5, 0.8);
  arrow(s, 2.2, y + 0.3, 2.9, y + 0.3, NC.motor, 2); arrow(s, 3.9, y + 0.3, 4.6, y + 0.3, NC.motor, 2);
  label(s, 5.75, 5.42, 0.9, 'muscle', { size: 10 });
  // table
  const rows = [[HDR('Neurone'), HDR('Carries impulse'), HDR('Features')],
    [tcell('Sensory', 0, { bold: true, color: NC.sens }), tcell('receptor → CNS', 0), tcell('long; cell body to one side', 0)],
    [tcell('Relay', 1, { bold: true, color: NC.relay }), tcell('sensory → motor (in CNS)', 1), tcell('short; many connections', 1)],
    [tcell('Motor', 2, { bold: true, color: NC.motor }), tcell('CNS → effector', 2), tcell('long axon; cell body in CNS', 2)]];
  s.addTable(rows, { x: 7.1, y: 1.3, w: 5.78, colW: [1.05, 2.13, 2.6], rowH: 0.36, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 7.1, 2.88, 5.78, 1.6, 'Shared features', [
    'All have a long **axon**, many with a **myelin sheath**, to carry impulses fast over long distances.',
    'All connect to other cells at **synapses**, so impulses can go to many cells.',
  ], { size: 10.5 });
  D.workedSteps(s, 7.1, 4.6, 5.78, 1.65, 'Worked example: explain', 'Explain why a relay neurone has many dendrites.', [
    ['Link', 'dendrites receive impulses from other neurones'], ['Answer', 'many dendrites = connections with many sensory (and other) neurones']], { size: 10.5 });
  D.quickCheck(s, 'Which type of neurone carries impulses **to** an effector? Where are **relay** neurones found?');
  D.notes(s, 'QUICK CHECK ANSWER: Motor neurone. In the CNS (brain and spinal cord).\nThe sensory neurone is drawn with its cell body on a side branch (as in the dorsal root ganglion); students do not need the terms dendron or ganglion. Relay neurones are also called interneurones or connector neurones. Relay neurones in the CNS are usually unmyelinated and short.');
  reg(s, 'B5.2.2 Types of neurone');
}

// ======================= 10 SYNAPSES =======================
reg(D.contentSlide({
  title: 'Synapses',
  subtitle: `Specification ${sp('B5.2.2')} • the junction between two neurones: a chemical passes the impulse across a tiny gap`,
  tag: 'B5.2.2', caption: 'a synapse (greatly magnified); the gap is about 20 nm wide',
  draw: (s, p) => {
    const NT = 'E0A800', NTe = '9C7400';
    // upper neurone
    box(s, 3.15, 1.4, 0.7, 0.85, 'E3D7F0', NC.body, { lw: 1.5 });
    oval(s, 3.5, 2.85, 2.7, 1.45, 'E3D7F0', NC.body, { lw: 1.5 });
    box(s, 3.16, 2.05, 0.68, 0.3, 'E3D7F0', null);
    arrow(s, 3.5, 1.45, 3.5, 2.05, C.red, 2.5);
    // vesicles
    [[2.75, 2.55], [3.25, 2.4], [3.8, 2.5], [4.25, 2.75], [2.95, 3.0], [3.55, 2.95], [4.0, 3.15]].forEach(([x, yv]) => {
      ball(s, x, yv, 0.15, 'FFF6D6', NTe, 1);
      [[-0.05, -0.04], [0.05, -0.03], [0, 0.05]].forEach(([dx, dy]) => ball(s, x + dx, yv + dy, 0.03, NT, NTe, 0.5));
    });
    // fusing vesicle at membrane
    s.addShape(SH.BLOCK_ARC, { x: 3.0, y: 3.36, w: 0.3, h: 0.3, angleRange: [180, 0], arcThicknessRatio: 0.12, fill: { color: NTe }, line: { color: NTe, width: 0.5 } });
    // gap & diffusing neurotransmitter
    [[2.9, 3.72], [3.1, 3.8], [3.3, 3.7], [3.55, 3.83], [3.75, 3.74], [3.95, 3.85], [3.2, 3.95]].forEach(([x, yv]) => ball(s, x, yv, 0.035, NT, NTe, 0.5));
    // lower neurone
    box(s, 1.5, 4.08, 4.0, 1.0, 'E9F2E3', NC.relay, { lw: 1.5 });
    [2.0, 2.45, 2.9, 3.35, 3.8, 4.25, 4.7, 5.1].forEach((x, i) => {
      box(s, x - 0.09, 4.0, 0.18, 0.13, '7DBE6A', '3E7F2E', { lw: 0.75 });
      box(s, x - 0.035, 4.0, 0.07, 0.06, 'E9F2E3', null);
      if (i === 3 || i === 4) ball(s, x, 4.03, 0.032, NT, NTe, 0.5);
    });
    arrow(s, 3.0, 4.75, 4.8, 4.75, C.red, 2.5);
    label(s, 2.9, 4.38, 2.2, 'new impulse', { size: 10.5, bold: true, color: C.red });
    // labels and steps
    const step = (n, x, yv) => { ball(s, x, yv, 0.14, C.red, C.red); label(s, x - 0.14, yv - 0.14, 0.28, String(n), { size: 10.5, bold: true, color: C.white, h: 0.28 }); };
    step(1, 2.95, 1.6); label(s, 0.6, 1.45, 2.2, 'impulse arrives at the axon terminal', { size: 10.5, align: 'right', h: 0.45, valign: 'top' });
    step(2, 1.95, 3.0); label(s, 0.55, 2.3, 1.45, '**vesicles** release **neurotransmitter**', { size: 10.5, align: 'left', h: 0.6, valign: 'top' }); lead(s, 2.08, 2.92, 2.62, 2.6);
    step(3, 5.15, 3.75); label(s, 5.0, 3.0, 1.45, 'it **diffuses** across the **gap**', { size: 10.5, align: 'left', h: 0.6, valign: 'top' }); lead(s, 5.0, 3.75, 4.05, 3.8);
    step(4, 1.25, 4.1); label(s, 0.55, 4.3, 0.95, 'binds to **receptors**', { size: 10.5, h: 0.6, valign: 'top' });
    step(5, 5.65, 4.75); label(s, 5.2, 5.12, 1.3, 'impulse starts in the next neurone', { size: 10.5, h: 0.6, valign: 'top' });
    label(s, 4.75, 1.45, 1.7, 'neurone 1', { size: 10.5, bold: true, color: NC.body, align: 'left' });
    label(s, 1.55, 5.12, 1.6, 'neurone 2', { size: 10.5, bold: true, color: NC.relay, align: 'left' });
  },
  head: 'How a synapse works',
  lines: [
    'A **synapse** is a junction between two neurones. There is a tiny **gap** between them.',
    'The impulse cannot jump the gap. A chemical, a **neurotransmitter**, carries the signal across.',
    'The neurotransmitter **diffuses** across the gap and **binds** to **receptor** molecules on the next neurone.',
    'This starts a new **electrical impulse** in the next neurone.',
    'Synapses make impulses go **one way only**, and let one neurone connect to many others.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: one-way only', q: 'Explain why impulses can cross a synapse in only one direction.',
    steps: [['Release', 'neurotransmitter is only released from neurone 1'], ['Receptors', 'receptors are only on neurone 2'], ['Answer', 'so the signal can only pass from neurone 1 to neurone 2']], size: 10.5 },
  workedH: 1.9,
  qc: 'Put in order: **neurotransmitter binds to receptors** • **impulse arrives** • **neurotransmitter diffuses across gap** • **neurotransmitter released**.',
  notes: 'QUICK CHECK ANSWER: Impulse arrives → neurotransmitter released → neurotransmitter diffuses across the gap → neurotransmitter binds to receptors (→ new impulse).\nLink to B5.1: diffusion. Crossing a synapse is slower than travelling along an axon because diffusion takes time (useful for reflex vs voluntary: fewer synapses = faster). Named neurotransmitters, membrane potentials and drug actions at synapses are not required (UNVERIFIED for J260; the J257 extract says learners are not expected to explain impulses in terms of membrane potentials).',
}), 'B5.2.2 Synapses');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B5.2.2')} • neurones and synapses`, [
  { q: 'Describe how the **myelin sheath** helps a motor neurone do its job.', marks: 2, ms: 'It insulates the axon (1); so the impulse travels faster (1).' },
  { q: 'State **one** difference between a **sensory** neurone and a **motor** neurone.', marks: 1, ms: 'Sensory carries impulses from receptor to CNS, motor from CNS to effector / sensory cell body to the side, motor cell body at the end (in CNS) (1).' },
  { q: 'Describe how an impulse is passed from one neurone to the next across a **synapse**.', marks: 3, ms: 'Neurotransmitter released (from the end of the first neurone) (1); diffuses across the gap (1); binds to receptors on the next neurone, starting a new impulse (1).' },
  { q: 'An impulse travels **1.2 m** along a neurone at **60 m/s**. Calculate the time taken in **ms**.', marks: 2, ms: '1.2 ÷ 60 = 0.02 s (1); = 20 ms (1).' },
]);
calc('R2 1.2 / 60 in ms', 1.2 / 60 * 1000, 20, 1e-9);
reg(R2.s, 'Recap 2');

// ======================= 12 REFLEX ARC =======================
reg(D.contentSlide({
  title: 'The reflex arc',
  subtitle: `Specification ${sp('B5.2.3')} • a fast, automatic response: hand pulled away from a flame`,
  tag: 'B5.2.3', caption: 'reflex arc through the spinal cord (cross-section); not to scale', panelW: 7.3,
  draw: (s, p) => {
    // arm (horizontal): hand at left, shoulder at x 4.3
    const skin = 'F8E4D4', edge = 'C9A88A';
    poly(s, [[0.95, 3.1], [4.35, 3.0], [4.35, 3.8], [0.95, 3.66]], skin, edge);
    oval(s, 0.85, 3.38, 0.6, 0.5, skin, edge);
    line(s, 2.45, 3.06, 2.45, 3.72, edge, 0.75, { dash: 'dash' });
    label(s, 2.15, 3.82, 0.6, 'elbow', { size: 10, color: C.grey });
    flame(s, 0.75, 4.75);
    label(s, 0.95, 4.2, 1.2, '**stimulus**: heat', { size: 10.5, color: C.orange, align: 'left' });
    // muscle (biceps) on the upper arm
    oval(s, 3.4, 3.58, 1.25, 0.34, 'F29BA5', 'A33E48', { lw: 1.25 });
    // spinal cord
    const sc = spinalCord(s, 6.25, 3.3, 1);
    // receptor in fingertip
    ball(s, 0.62, 3.3, 0.07, NC.sens, NC.sens);
    // sensory neurone
    const sens = [[0.66, 3.26], [1.0, 3.2], [4.3, 3.15], [4.85, 2.72], [5.2, 2.72], [5.82, 2.95]];
    pline(s, sens, NC.sens, 2.25);
    ball(s, 4.98, 2.72, 0.13, 'D6E4F5', NC.sens, 1.25); ball(s, 4.98, 2.72, 0.05, C.nucleus, C.nucleusEdge);
    midArrow(s, sens[1], sens[2], NC.sens);
    // relay neurone (in grey matter)
    const rel = [[5.9, 3.0], [5.95, 3.3], [5.86, 3.52]];
    pline(s, rel, NC.relay, 2.25); ball(s, 5.96, 3.22, 0.07, 'D7EBDD', NC.relay, 1.25);
    // synapses
    oval(s, 5.86, 2.98, 0.2, 0.2, null, C.ink, { lw: 1, dash: 'dash' });
    oval(s, 5.84, 3.55, 0.2, 0.2, null, C.ink, { lw: 1, dash: 'dash' });
    // motor neurone: cell body in ventral horn -> ventral root -> biceps
    ball(s, 5.78, 3.62, 0.1, 'F6D3D6', NC.motor, 1.25); ball(s, 5.78, 3.62, 0.04, C.nucleus, C.nucleusEdge);
    const mot = [[5.7, 3.68], [5.2, 3.95], [4.3, 3.88], [3.95, 3.66]];
    pline(s, mot, NC.motor, 2.25);
    terminals(s, 3.95, 3.66, NC.motor, -0.45);
    midArrow(s, mot[1], mot[2], NC.motor);
    // labels
    label(s, 0.55, 2.62, 1.3, '**receptor** in skin', { size: 10.5, align: 'left' }); lead(s, 0.7, 2.88, 0.62, 3.22);
    label(s, 1.9, 2.62, 1.8, '**sensory neurone**', { size: 10.5, color: NC.sens, align: 'left' }); lead(s, 2.5, 2.88, 2.6, 3.17);
    label(s, 3.85, 2.05, 1.7, 'cell body of sensory neurone', { size: 10, align: 'left', h: 0.42, valign: 'top' }); lead(s, 4.6, 2.45, 4.92, 2.62);
    label(s, 6.65, 1.85, 1.05, '**synapse**', { size: 10.5, align: 'left' }); lead(s, 6.7, 2.0, 5.95, 2.92);
    label(s, 6.65, 2.35, 1.05, '**relay neurone**', { size: 10.5, color: NC.relay, align: 'left', h: 0.42, valign: 'top' }); lead(s, 6.68, 2.6, 6.0, 3.25);
    label(s, 6.2, 4.18, 1.5, '**spinal cord** (CNS)', { size: 10.5, align: 'left' });
    label(s, 6.2, 4.42, 1.5, 'grey matter: cell bodies', { size: 10, color: C.grey, align: 'left' });
    label(s, 4.15, 4.02, 1.6, '**motor neurone**', { size: 10.5, color: NC.motor, align: 'left' });
    label(s, 2.6, 3.9, 1.6, '**effector**: biceps muscle', { size: 10.5, color: '8E2A33', align: 'left', h: 0.45, valign: 'top' }); lead(s, 3.0, 3.95, 3.15, 3.72);
    // summary strip
    const st = ['stimulus', 'receptor', 'sensory neurone', 'relay neurone', 'motor neurone', 'effector', 'response'];
    const cols = [C.orangeBorder, NC.sens, NC.sens, NC.relay, NC.motor, NC.motor, C.orangeBorder];
    st.forEach((t, i) => {
      const x = 0.6 + i * 1.0;
      fbox(s, x, 5.05, 0.88, 0.62, t, C.white, cols[i], 10);
      if (i < st.length - 1) arrow(s, x + 0.88, 5.36, x + 1.0, 5.36, C.ink, 1.25);
    });
    label(s, 0.6, 4.72, 3.5, 'response: muscle contracts, hand pulled away', { size: 10.5, bold: true, color: C.orange, align: 'left' });
  },
  head: 'How the reflex arc works',
  lines: [
    'A **reflex** is a fast, automatic response that does not need the conscious brain.',
    '**Receptor** detects the stimulus → impulse along the **sensory neurone** to the spinal cord.',
    'At a **synapse** it passes to a **relay neurone** in the CNS, then to a **motor neurone**.',
    'The **effector** (muscle) contracts and pulls the hand away.',
    'Only **three neurones** and **two synapses**, and the impulse does not go via the brain, so it is very fast.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: why so fast?', q: 'The reflex pathway is 1.5 m long. Impulses travel at 75 m/s. Find the time.',
    steps: [['Equation', 'time = distance ÷ speed'], ['Substitute', '1.5 m ÷ 75 m/s = 0.02 s'], ['Answer', '20 ms: much faster than a reaction (about 200 ms)']], size: 10.5 },
  workedH: 1.85,
  qc: 'Why is the relay neurone important in a reflex arc? Why does a reflex **protect** the body?',
  notes: 'QUICK CHECK ANSWER: The relay neurone links the sensory neurone to the motor neurone in the CNS (spinal cord), so the impulse goes straight back out to the effector without passing through the conscious brain. Reflexes are very fast and automatic, so they reduce damage (e.g. burns) before we have time to think.\nDiagram conventions: sensory neurone enters the spinal cord at the back (dorsal, top of the cross-section) with its cell body just outside the cord; the relay neurone is entirely in the grey matter; the motor neurone cell body is in the front (ventral) grey matter and its axon leaves at the front. Dashed circles = synapses. A separate neurone also sends an impulse up to the brain so we feel pain afterwards (not drawn).\nB5.2.3 (search extract, paraphrase): explain how the structure of a reflex arc, including the relay neurone, is related to its function. Node: 1.5 ÷ 75 = 0.02 s = 20 ms; path length and speed are illustrative.',
}), 'B5.2.3 The reflex arc');

// ======================= 13 REFLEX VS VOLUNTARY =======================
{
  const s = D.contentHeader('Reflex and voluntary responses', `Specification ${sp('B5.2.3')} • reflexes skip the conscious brain; voluntary actions do not`, { tag: 'B5.2.3' });
  D.panel(s, 0.45, 1.3, 6.4, 4.95, 'two routes for an impulse; boxes are parts of the pathway');
  // reflex route
  label(s, 0.6, 1.42, 6.0, '**Reflex**: hand touches a hot pan', { size: 11, color: NC.relay, align: 'left' });
  const r = [['receptor (skin)', NC.sens], ['spinal cord (relay)', NC.relay], ['muscle', NC.motor]];
  r.forEach(([t, c], i) => { fbox(s, 0.7 + i * 2.05, 1.8, 1.7, 0.55, t, C.white, c); if (i < 2) arrow(s, 2.4 + i * 2.05, 2.08, 2.75 + i * 2.05, 2.08, C.ink, 1.5); });
  label(s, 0.7, 2.42, 5.8, '3 neurones • 2 synapses • no decision • about **0.02–0.05 s**', { size: 10.5, color: C.grey, align: 'left' });
  // voluntary route
  label(s, 0.6, 2.95, 6.0, '**Voluntary**: you decide to catch a falling ruler', { size: 11, color: C.blue, align: 'left' });
  const v = [['receptor (eye)', NC.sens], ['brain: decide', '8A7AA8'], ['spinal cord', NC.relay], ['muscle', NC.motor]];
  v.forEach(([t, c], i) => { fbox(s, 0.7 + i * 1.53, 3.33, 1.25, 0.55, t, C.white, c, 10); if (i < 3) arrow(s, 1.95 + i * 1.53, 3.6, 2.23 + i * 1.53, 3.6, C.ink, 1.5); });
  label(s, 0.7, 3.95, 5.8, 'longer path • many synapses • conscious decision • about **0.2 s**', { size: 10.5, color: C.grey, align: 'left' });
  // examples
  box(s, 0.65, 4.4, 6.0, 1.45, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, 0.8, 4.45, 5.8, '**Examples of reflexes**', { size: 11, align: 'left' });
  const ex = [['Knee jerk', 'tap below knee → leg kicks'], ['Blinking', 'object near eye → eyelid closes'], ['Pupil', 'bright light → pupil gets smaller'], ['Withdrawal', 'pain → limb pulled away']];
  ex.forEach(([h, t], i) => label(s, 0.8 + (i % 2) * 2.95, 4.8 + Math.floor(i / 2) * 0.48, 2.9, `**${h}**: ${t}`, { size: 10.5, align: 'left', h: 0.45 }));
  // table
  const rows = [[HDR(''), HDR('Reflex'), HDR('Voluntary')],
    [tcell('Conscious?', 0, { bold: true }), tcell('no: automatic', 0), tcell('yes: you decide', 0)],
    [tcell('Coordinator', 1, { bold: true }), tcell('spinal cord (or lower brain)', 1), tcell('brain (conscious part)', 1)],
    [tcell('Speed', 2, { bold: true }), tcell('very fast', 2), tcell('slower', 2)],
    [tcell('Response', 3, { bold: true }), tcell('always the same', 3), tcell('can vary', 3)],
    [tcell('Purpose', 4, { bold: true }), tcell('protection, survival', 4), tcell('complex behaviour', 4)]];
  s.addTable(rows, { x: 7.1, y: 1.3, w: 5.78, colW: [1.3, 2.24, 2.24], rowH: 0.34, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 7.1, 3.55, 5.78, 2.7, 'Worked example: compare the times', 'Voluntary path 2.4 m at 60 m/s; reflex path 1.5 m at 75 m/s. Why is a real reaction (≈ 0.2 s) much longer than either travel time?', [
    ['Voluntary', '2.4 ÷ 60 = 0.04 s = 40 ms of travel'], ['Reflex', '1.5 ÷ 75 = 0.02 s = 20 ms of travel'], ['Explain', 'most of a reaction time is at **synapses** and in the **brain** deciding'],
    ['Answer', 'more synapses + brain processing = slower']], { size: 10.5 });
  D.quickCheck(s, 'Is catching a ball a **reflex** or **voluntary** action? Give **two** features of a reflex.');
  D.notes(s, 'QUICK CHECK ANSWER: Voluntary (you see the ball and decide to catch it; the brain is involved). Any two: automatic / no conscious thought; fast; same response every time; protects the body; coordinated by the spinal cord (or unconscious part of the brain).\nNode: 2.4 ÷ 60 × 1000 = 40 ms; 1.5 ÷ 75 × 1000 = 20 ms. Times are illustrative. The pupil and blink reflexes are coordinated by the brain stem (an unconscious part of the brain), not the spinal cord: hence "spinal cord (or lower brain)". Brain regions themselves are J257 only.');
  reg(s, 'B5.2.3 Reflex vs voluntary');
}

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B5.2.3')} • the reflex arc`, [
  { q: 'What is a **reflex** action? Give **one** example.', marks: 2, ms: 'A fast, automatic response (that does not involve the conscious brain) (1); any example e.g. knee jerk, blinking, pupil reflex, withdrawing hand from heat (1).' },
  { q: 'Name the neurone in a reflex arc that is found **only** in the CNS, and give its job.', marks: 2, ms: 'Relay neurone (1); passes the impulse from the sensory neurone to the motor neurone (1).' },
  { q: 'Explain why a reflex action is **faster** than a voluntary action.', marks: 2, ms: 'Fewer neurones / synapses / shorter pathway (1); does not go through the conscious part of the brain / no decision needed (1).' },
  { q: 'Explain why having reflexes helps humans to **survive**.', marks: 1, ms: 'They protect the body from harm / reduce damage, e.g. from burns, because they are fast and automatic (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 PRACTICAL METHOD =======================
reg(D.contentSlide({
  title: 'Practical: measuring reaction time',
  subtitle: `Specification ${sp('B5.2.3')} • the ruler drop test: does a distraction slow down reaction time?`,
  tag: 'Practical', pag: true, caption: 'apparatus for the ruler drop test',
  draw: (s, p) => {
    // ruler: 30 cm, 0 at the bottom
    const rx = 2.55, y0 = 4.95, per = 0.105;
    box(s, rx, y0 - 30 * per - 0.08, 0.38, 30 * per + 0.16, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let c = 0; c <= 30; c++) {
      const yy = y0 - c * per, maj = c % 5 === 0;
      line(s, rx, yy, rx + (maj ? 0.17 : 0.09), yy, '6B5A2A', 0.75);
      if (maj) label(s, rx + 0.15, yy - 0.09, 0.22, String(c), { size: 10, h: 0.18, align: 'right' });
    }
    // dropper's hand at the top
    oval(s, rx + 0.19, y0 - 30 * per - 0.12, 0.65, 0.32, 'F2C9A5', 'B07A50', { lw: 1 });
    box(s, rx + 0.45, y0 - 30 * per - 0.2, 1.1, 0.18, 'F2C9A5', 'B07A50', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1 });
    label(s, 3.55, 1.5, 2.9, '**Person A** holds the top of the ruler, then drops it **without warning**', { size: 10.5, align: 'left', h: 0.6, valign: 'top' });
    // catcher's hand: thumb and finger either side of zero, forearm on the bench
    oval(s, rx - 0.2, y0 + 0.02, 0.38, 0.16, 'F2C9A5', 'B07A50', { lw: 1 });
    oval(s, rx + 0.58, y0 + 0.02, 0.38, 0.16, 'F2C9A5', 'B07A50', { lw: 1 });
    box(s, rx + 0.65, y0 + 0.02, 0.9, 0.42, 'F2C9A5', 'B07A50', { shape: SH.ROUNDED_RECTANGLE, r: 0.15, lw: 1 });
    box(s, rx + 1.3, y0 + 0.22, 2.3, 0.3, 'F2C9A5', 'B07A50', { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1 });
    box(s, rx + 1.0, y0 + 0.52, 3.0, 0.14, C.wood, '8A6A3A', { lw: 1 });
    box(s, rx + 3.6, y0 + 0.66, 0.12, 0.3, C.wood, '8A6A3A', { lw: 1 });
    label(s, 3.55, 4.1, 2.9, '**Person B**: forearm on the bench; thumb and finger level with **0 cm**, not touching', { size: 10.5, align: 'left', h: 0.6, valign: 'top' });
    // fall arrow and distance
    arrow(s, 1.85, 2.0, 1.85, 3.2, C.red, 2.5);
    label(s, 0.6, 2.25, 1.15, 'ruler falls', { size: 10.5, color: C.red, bold: true, align: 'right' });
    line(s, rx - 0.02, y0 - 16 * per, rx - 0.55, y0 - 16 * per, C.blue, 1.25, { dash: 'dash' });
    line(s, rx - 0.45, y0 - 16 * per, rx - 0.45, y0, C.blue, 1.25, { head: true, tail: true });
    label(s, 0.6, 3.65, 1.35, 'read **d** at the top of the thumb', { size: 10.5, color: C.blue, align: 'right', h: 0.45, valign: 'top' });
  },
  head: 'Method',
  lines: [
    'Person B rests their forearm on the bench, hand over the edge, and holds thumb and finger either side of the **0 cm** mark.',
    'Person A drops the ruler **without warning**. B catches it as fast as possible.',
    'Read the distance **d** (cm) at the top of B\'s thumb. Repeat **5 times**.',
    'Repeat while B counts backwards in 3s (the **distraction**). Calculate the **mean** d for each.',
    'Convert each mean distance to a **reaction time** using a table or graph.',
  ],
  size: 10.5,
  worked: { head: 'Variables and safety', q: '', steps: [['Independent', 'distraction (none / counting backwards)'], ['Dependent', 'distance fallen → reaction time'], ['Control', 'same person, ruler, hand, start height, catching position'], ['Safety', 'low risk: no caffeine or energy drinks for this test']], size: 10.5 },
  workedH: 2.0,
  qc: 'Why must person A drop the ruler **without warning**? Why does B use the **same hand** every time?',
  notes: 'QUICK CHECK ANSWER: So that B is reacting to the ruler moving (seeing it fall), not predicting it from a signal / timing pattern. Using the same hand keeps a control variable constant (the dominant hand may be faster), so only the distraction changes.\nPractical status: Oak National Academy\'s OCR combined science unit includes "Human reaction time: practical"; a search extract of the J257 B5.2 summary mentions practical investigation of reflexes / reaction times. The exact J260 PAG reference was not found (possibly PAG B6 physiology and responses, UNVERIFIED), so the slide is labelled "suggested practical".\nThe data on the next slides are illustrative class data. Other factors students can test: practice, dominant vs non-dominant hand, time of day, sound vs visual cue. Do not use caffeine drinks with students without a risk assessment (some schools allow decaffeinated vs caffeinated cola with parental consent).',
}), 'Practical: method');

// ======================= 16 PRACTICAL RESULTS =======================
{
  const s = D.contentHeader('Practical: results and means', `Specification ${sp('B5.2.3')} • ruler drop distances for one student (sample data)`, { pag: true, tag: 'Practical' });
  const hd = [HDR('Condition'), HDR('1'), HDR('2'), HDR('3'), HDR('4'), HDR('5'), HDR('Mean d / cm'), HDR('Reaction time / s')];
  const rowA = [tcell('No distraction', 0, { bold: true, align: 'left' }), ...PA.map(v => tcell(v.toFixed(1), 0)), tcell(mA.toFixed(1), 0, { bold: true }), tcell(sf(tA, 2).toFixed(2), 0, { bold: true, color: C.red })];
  const rowB = [tcell('Counting backwards', 1, { bold: true, align: 'left' }), ...PB.map(v => tcell(v.toFixed(1), 1, v === ANOM ? { color: C.red, bold: true } : {})), tcell(mB.toFixed(1), 1, { bold: true }), tcell(sf(tB, 2).toFixed(2), 1, { bold: true, color: C.red })];
  label(s, 0.45, 1.25, 8, 'Distance fallen d / cm, trials 1–5', { size: 10.5, bold: true, color: C.blue, align: 'left' });
  s.addTable([hd, rowA, rowB], { x: 0.45, y: 1.55, w: 12.43, colW: [2.3, 1.0, 1.0, 1.0, 1.0, 1.0, 2.2, 2.93], rowH: 0.36, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  // anomaly ring (column 5 = trial 4 of row B)
  const ax = 0.45 + 2.3 + 3 * 1.0, ay = 1.55 + 2 * 0.36;
  box(s, ax + 0.18, ay + 0.02, 0.64, 0.32, null, C.red, { shape: SH.OVAL, lw: 1.5 });
  label(s, 0.45, 2.68, 12.4, `!!${ANOM.toFixed(1)}!! is an **anomaly** (far from the other four results): it is left out of the mean. Reaction times come from the conversion graph on the next slide.`, { size: 10.5, align: 'left', h: 0.3 });
  D.workedSteps(s, 0.45, 3.1, 6.1, 3.15, 'Worked example: calculating the means', '', [
    ['No distraction', `(16.2 + 14.8 + 15.5 + 17.1 + 15.4) ÷ 5 = ${fmt(sumA)} ÷ 5 = **${mA.toFixed(1)} cm**`],
    ['Counting backwards', `leave out ${ANOM}: (22.6 + 24.1 + 21.5 + 23.8) ÷ 4 = ${fmt(sumB)} ÷ 4 = **${mB.toFixed(1)} cm**`],
    ['Check', `keeping the anomaly would give ${fmt(mean(PB))} cm: too high`],
    ['Answer', `mean d = ${mA.toFixed(1)} cm and ${mB.toFixed(1)} cm → about ${sf(tA, 2)} s and ${sf(tB, 2)} s`]], { size: 10.5 });
  // bar chart to scale
  D.panel(s, 6.8, 3.1, 6.08, 3.15);
  const g = { x: 8.1, y: 3.3, w: 4.4, h: 2.2, xmin: 0, xmax: 2, ymin: 0, ymax: 250, xstep: 2, ystep: 50, ylabel: 'mean reaction time / ms', grid: true };
  D.axes(s, Object.assign({}, g, { xstep: 1, fmt: () => '' }));
  [[tA, 'no distraction', C.blue], [tB, 'counting backwards', C.orange]].forEach(([t, nm, col], i) => {
    const ms = t * 1000, bx = D.px(g, 0.5 + i) - 0.45, by = D.py(g, ms);
    box(s, bx, by, 0.9, D.py(g, 0) - by, col, col);
    label(s, bx - 0.3, by - 0.26, 1.5, `**${Math.round(ms)} ms**`, { size: 10.5 });
    label(s, bx - 0.4, g.y + g.h + 0.08, 1.7, nm, { size: 10, h: 0.25 });
  });
  label(s, 6.95, 5.92, 5.8, 'bar chart: the independent variable is categoric', { size: 10, italic: true, color: C.grey });
  D.quickCheck(s, 'Why is the anomaly left out? Calculate the **range** of the no-distraction results.');
  D.notes(s, `QUICK CHECK ANSWER: It is not typical of the other results (e.g. B was not ready / looked away), so including it would make the mean unrepresentative (too high). Range = 17.1 − 14.8 = 2.3 cm (14.8 cm to 17.1 cm).\nNode: sums ${fmt(sumA)} and ${fmt(sumB)}; means ${mA} and ${mB} cm; with anomaly ${fmt(mean(PB))} cm. Reaction times from t = √(2d ÷ g), g = 9.8 m/s²: ${tA.toFixed(4)} s and ${tB.toFixed(4)} s (${Math.round(tA * 1000)} ms and ${Math.round(tB * 1000)} ms). Stretch: increase = ${sf((tB - tA) / tA * 100, 2)}%.\nBar chart drawn to scale (0–250 ms). Data are illustrative.`);
  reg(s, 'Practical: results and means');
}

// ======================= 17 CONVERSION GRAPH AND EVALUATION =======================
{
  const s = D.contentHeader('Practical: distance to reaction time', `Specification ${sp('B5.2.3')} • use a conversion graph; evaluate the method`, { pag: true, tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.4, 4.95, 'conversion graph drawn to scale from t = √(2d ÷ g)');
  const g = { x: 1.45, y: 1.55, w: 5.1, h: 3.7, xmin: 0, xmax: 30, ymin: 0, ymax: 0.25, xstep: 5, ystep: 0.05, minor: 5, xlabel: 'distance fallen d / cm', ylabel: 'reaction time / s', yfmt: v => v.toFixed(2) };
  D.axes(s, g);
  D.fnLine(s, g, rt, 0, 30, 60, C.blue, 2.25);
  [[mA, tA, C.blue], [mB, tB, C.orange]].forEach(([d, t, col]) => {
    line(s, D.px(g, d), D.py(g, 0), D.px(g, d), D.py(g, t), col, 1.5, { dash: 'dash' });
    line(s, D.px(g, d), D.py(g, t), D.px(g, 0), D.py(g, t), col, 1.5, { dash: 'dash' });
    ball(s, D.px(g, d), D.py(g, t), 0.05, col);
  });
  label(s, D.px(g, mA) + 0.05, D.py(g, tA) + 0.06, 1.3, `${mA} cm → ${sf(tA, 2)} s`, { size: 10, color: C.blue, bold: true, align: 'left' });
  label(s, D.px(g, mB) + 0.05, D.py(g, tB) + 0.06, 1.3, `${mB.toFixed(1)} cm → ${sf(tB, 2)} s`, { size: 10, color: C.orange, bold: true, align: 'left' });
  D.workedSteps(s, 7.1, 1.3, 5.78, 2.35, 'Stretch: using the equation', 'Convert 15.8 cm. g = 9.8 m/s². Use t = √(2d ÷ g), with d in metres.', [
    ['Units', 'd = 15.8 cm = 0.158 m'], ['Substitute', 't = √(2 × 0.158 ÷ 9.8) = √0.03224…'], ['Calculate', `t = ${tA.toFixed(4)} s`], ['Answer', `t = ${sf(tA, 2)} s (${Math.round(tA * 1000)} ms)`]], { size: 10.5 });
  D.card(s, 7.1, 3.77, 5.78, 2.48, 'Errors and improvements', [
    '**Random**: B guesses when A will drop → vary the delay; repeat and take a **mean**.',
    '**Anomalies**: B not ready → identify, leave out, repeat that trial.',
    '**Reading**: thumb position unclear → read at the top of the thumb each time.',
    '**Learning effect**: B gets faster with practice → have practice drops first.',
    'Better: a computer reaction timer records in **ms**, more precisely.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Use the graph: what reaction time matches a drop of **10 cm**? Conclude: does counting backwards affect reaction time?');
  D.notes(s, `QUICK CHECK ANSWER: About 0.14 s (node: ${CONV[1][1].toFixed(3)} s). Yes: with the distraction the mean reaction time increased from about ${sf(tA, 2)} s to ${sf(tB, 2)} s (by about ${sf((tB - tA) / tA * 100, 2)}%), because the brain is busy processing the counting task. Only one student was tested, so test more people before generalising.\nConversion values (node, 3 d.p.): ${CONV.map(([d, t]) => `${d} cm → ${t.toFixed(3)} s`).join('; ')}.\nThe equation comes from d = ½gt² (physics). It is not in the biology spec: students are normally given a conversion table or graph. Stretch only.`);
  reg(s, 'Practical: conversion graph and errors');
}

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Suggested practical • reaction time', [
  { q: 'A student\'s ruler drop distances were **12.0, 13.4, 12.8, 14.2 and 13.1 cm**. Calculate the mean distance.', marks: 2, ms: '(12.0 + 13.4 + 12.8 + 14.2 + 13.1) ÷ 5 = 65.5 ÷ 5 (1); = 13.1 cm (1).' },
  { q: 'Use the conversion graph to find the reaction time for this mean. Give your answer in seconds to 2 significant figures.', marks: 1, ms: '0.16 s (1). Allow 0.15–0.17 s from the graph.' },
  { q: 'Identify the **independent** and the **dependent** variable in an investigation of whether practice improves reaction time.', marks: 2, ms: 'Independent: amount of practice / number of practice attempts (1); dependent: reaction time / distance the ruler falls (1).' },
  { q: 'Suggest **one** control variable, and **one** reason why a computer timer gives better data than a ruler.', marks: 2, ms: 'Control: same hand / same person / same ruler / same starting position / same person dropping (1); computer records in ms / more precise / no reading error / no guessing of drop (1).' },
  { q: 'Explain why the student repeats each measurement and calculates a mean.', marks: 1, ms: 'To reduce the effect of random errors / spot anomalies, so the result is more accurate / representative (1).' },
]);
calc('R4 sum', R4D.reduce((a, b) => a + b, 0), 65.5, 1e-9);
reg(R4.s, 'Recap 4');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Stimulus', 'A change in the environment (inside or outside the body) that is detected.'],
  ['Receptor', 'A cell that detects a stimulus and starts an impulse, e.g. in eye, ear, skin.'],
  ['Effector', 'A muscle or gland that responds: muscles contract, glands secrete.'],
  ['CNS', 'Central nervous system: brain and spinal cord. The coordinator.'],
  ['Neurone', 'A nerve cell. Carries electrical impulses. A nerve is a bundle of neurones.'],
  ['Sensory neurone', 'Carries impulses from a receptor to the CNS.'],
  ['Relay neurone', 'In the CNS; carries impulses from a sensory to a motor neurone.'],
  ['Motor neurone', 'Carries impulses from the CNS to an effector.'],
  ['Axon', 'Long extension of a neurone that carries the impulse away from the cell body.'],
  ['Myelin sheath', 'Fatty layer that insulates the axon and speeds up the impulse.'],
  ['Synapse', 'Junction between two neurones, with a tiny gap.'],
  ['Neurotransmitter', 'Chemical that diffuses across a synapse and binds to receptors.'],
  ['Reflex', 'A fast, automatic response that does not involve the conscious brain.'],
  ['Reflex arc', 'Pathway of a reflex: receptor → sensory → relay → motor → effector.'],
  ['Reaction time', 'Time between a stimulus and the response to it.'],
  ['Voluntary response', 'A response under conscious control: the brain decides.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student touches a hot plate and pulls her hand away. Later she does a **ruler drop test** to measure her reaction time.', [
  { l: 'a', q: 'In the reflex, name the type of neurone that carries the impulse:\n(i) from the receptor  (ii) through the spinal cord  (iii) to the muscle.', marks: 3, ms: '(i) sensory (1); (ii) relay (1); (iii) motor (1).', h: 1.1 },
  { l: 'b', q: 'Describe how the impulse passes from one neurone to the next at a **synapse**.', marks: 3, ms: 'Neurotransmitter released by the first neurone (1); diffuses across the gap (1); binds to receptors on the next neurone and starts a new impulse (1).', h: 1.1 },
  { l: 'c', q: 'Her ruler drop distances were **19.0, 20.4, 19.8 and 19.2 cm**. Calculate the mean.', marks: 2, ms: '(19.0 + 20.4 + 19.8 + 19.2) ÷ 4 = 78.4 ÷ 4 (1); = 19.6 cm (1).', h: 0.95 },
  { l: 'd', q: 'Use t = √(2d ÷ g), where g = 9.8 m/s² and d is in **metres**, to calculate her reaction time.', marks: 2, ms: 'd = 0.196 m; t = √(2 × 0.196 ÷ 9.8) = √0.04 (1); = 0.2 s (1). Allow ecf from (c).', h: 0.95 },
  { l: 'e', q: 'Pulling her hand from the hot plate took much less time than catching the ruler. Explain why.', marks: 3, ms: 'The withdrawal is a reflex / automatic (1); impulse goes through the spinal cord / relay neurone, not the conscious brain / no decision made (1); fewer neurones / synapses / shorter pathway (so faster) (1).', h: 1.2 },
], 13, { subtitle: `Specification ${sp('B5.2.1')}–${sp('B5.2.3')} and the reaction time practical • answer every part • 13 marks` }), 'Full question');
calc('FQ sum', FQD.reduce((a, b) => a + b, 0), 78.4, 1e-9);
calc('FQ inside root 2 × 0.196 / 9.8', 2 * 0.196 / 9.8, 0.04, 1e-12);

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Independent variable: hand used (dominant / non-dominant); dependent: distance fallen, converted to reaction time.',
    'Method: B sits with forearm on the bench, hand over the edge; thumb and finger level with 0 cm; A drops a 30 cm ruler without warning; B catches it; read the distance at the top of the thumb.',
    'Repeat at least 5 times for each hand (and/or test several people); calculate the mean for each hand.',
    'Control variables: same person catching and dropping, same ruler, same starting position / height, same posture, same environment / no distractions, no caffeine; vary the time before dropping so B cannot predict.',
    'Practice drops first (learning effect); alternate hands or randomise the order.',
    'Identify and leave out anomalies; repeat those trials.',
    'Convert mean distance to reaction time with a conversion table / graph / t = √(2d ÷ g).',
    'Compare the means: a smaller mean distance means a faster reaction; draw a bar chart; consider the range / overlap of results.',
  ], {
    l3: 'Describes a clear, workable method AND controls several variables AND explains how the data are processed (repeats, means, conversion) to reach a conclusion.',
    l2: 'Describes a workable method with at least one control variable OR describes repeats/means; some processing of results described.',
    l1: 'Gives some simple steps, e.g. "drop a ruler and see where it is caught" for each hand.',
  });
}
const HW = [
  { n: '1', q: 'What is an **effector**? Give **two** examples.', marks: 2, ms: 'A muscle or gland that responds to an impulse / brings about a response (1); two examples, e.g. arm muscle, salivary gland, sweat gland (1).' },
  { n: '2', q: 'State the function of the **myelin sheath**.', marks: 1, ms: 'Insulates the axon / speeds up the impulse (1).' },
  { n: '3', q: 'Write these in the correct order for a reflex arc: **effector, relay neurone, receptor, motor neurone, sensory neurone**.', marks: 2, ms: 'Receptor → sensory neurone → relay neurone → motor neurone → effector. 2 marks all correct; 1 mark one pair swapped.' },
  { n: '4', q: 'Explain why an impulse can only cross a **synapse** in one direction.', marks: 2, ms: 'Neurotransmitter is only released by the first neurone (1); the receptors are only on the second neurone (1).' },
  { n: '5', q: 'Ruler drops: **20, 22, 21, 23** and **19 cm**. Calculate the mean, then use the graph from the lesson to find the reaction time.', marks: 2, ms: '(20 + 22 + 21 + 23 + 19) ÷ 5 = 21 cm (1); about 0.21 s (allow 0.20–0.22 s) (1).' },
  { n: '6', q: 'Explain why a scientist would test **many people**, not just one, before concluding that a distraction slows reaction time.', marks: 2, ms: 'People\'s reaction times vary / one person may not be typical (1); a larger sample makes the conclusion more reliable / representative / repeatable (1).' },
  { n: '7', q: 'A student wants to find out whether people react faster with their **dominant** hand. **Describe** how she could use the ruler drop test to investigate this. Include how she makes it a fair test and how she processes her results.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 8); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 8);
const out = path.join(__dirname, 'OCR21C_B5.2_NervousSystem_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
