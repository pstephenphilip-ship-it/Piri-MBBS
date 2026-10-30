// build_B5_3.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B5 The human body – staying alive, B5.3 How do hormones control responses in the human body? (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B5_3.js
// Structure copied from build_B4_3.js. ocr_bio_template.js is NOT edited by this deck: the body outline, endocrine glands,
// receptor, feedback-loop and organ-icon helpers are in the DECK-SPECIFIC block below.
// Scope: J260 B5.3.1 (endocrine principles) and B5.3.2 (adrenaline, thyroxine, negative feedback). Blood glucose control
// (insulin, glucagon) and diabetes are J260 B5.6; sex hormones are B5.5: named on the gland map only, not taught here.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B5', chapterTitle: 'The human body – staying alive', code: 'B5.3', title: 'How do hormones control responses in the human body?',
  part: 3, parts: 6, specRange: 'B5.3.1–B5.3.2',
  subtitle: 'How do hormones control responses in the human body?',
  keywords: ['Hormone', 'Endocrine gland', 'Target organ', 'Adrenaline', 'Thyroxine', 'Negative feedback'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
// slide 9: nerve vs hormone speed
const nerveDist = 1.5, nerveSpeed = 100;
const nerveT = calc('nerve impulse time 1.5 m / 100 m/s', nerveDist / nerveSpeed, 0.015);
calc('nerve time in ms', nerveT * 1000, 15);
const bloodT = 60;
calc('hormone : nerve time ratio 60 / 0.015', bloodT / nerveT, 4000);
calc('QC nerve 1.2 m / 60 m/s', 1.2 / 60, 0.02);
// slide 12: heart rate data (illustrative)
const HR = [[0, 70], [1, 70], [2, 71], [3, 112], [4, 124], [5, 118], [6, 104], [7, 92], [8, 83], [9, 76], [10, 72]];
const hrRest = HR[0][1], hrPeak = Math.max(...HR.map(p => p[1]));
calc('HR peak', hrPeak, 124);
calc('HR rise 124 - 70', hrPeak - hrRest, 54);
const hrPct = calc('HR % increase 54 / 70 × 100', (hrPeak - hrRest) / hrRest * 100, 77.14285714285714, 1e-9);
calc('HR % increase 3 s.f.', sf(hrPct, 3), 77.1, 1e-12);
calc('QC HR 72 → 90 % increase', (90 - 72) / 72 * 100, 25, 1e-9);
// recaps, full question, homework
calc('R3 60 → 105 % increase', (105 - 60) / 60 * 100, 75, 1e-9);
calc('FQ 80 → 132 % increase', (132 - 80) / 80 * 100, 65, 1e-9);
calc('HW 64 → 112 % increase', (112 - 64) / 64 * 100, 75, 1e-9);
calc('starter breathing 15 breaths in 30 s → per min', 15 * 2, 30);

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
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });

// gland colours (used on the map, the table and later slides)
const G = {
  pit: ['C8414C', '8E2A33'], thy: ['8E44AD', '5E2D73'], adr: ['E08A1E', '9A5A0A'], pan: ['D4A017', '8A6A0A'],
  ov: ['D45F9E', '8E3466'], tes: ['3B7DD8', '1F4E8C'],
};
const SKIN = 'F6DDC8', SKIN_EDGE = 'B98E6E';
// body(s, cx, top, k, o): front-view human outline (native shapes). Two passes: outlines first, then fills, so the joins
// disappear and only the silhouette edge shows. Returns organ positions for labels. o.organs=false for a plain outline.
function body(s, cx, top, k = 1, o = {}) {
  const parts = [
    ['rr', cx - 1.12 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, 7],   // left arm (viewer's left)
    ['rr', cx + 0.84 * k, top + 1.0 * k, 0.28 * k, 1.85 * k, -7],  // right arm
    ['rr', cx - 0.64 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0],   // legs
    ['rr', cx + 0.10 * k, top + 2.6 * k, 0.54 * k, 1.95 * k, 0],
    ['rr', cx - 0.8 * k, top + 0.92 * k, 1.6 * k, 2.0 * k, 0],     // torso
    ['r', cx - 0.13 * k, top + 0.7 * k, 0.26 * k, 0.3 * k, 0],     // neck
    ['o', cx - 0.33 * k, top, 0.66 * k, 0.8 * k, 0],               // head
  ];
  [true, false].forEach(edgePass => parts.forEach(([t, x, y, w, h, rot]) => {
    const shape = t === 'o' ? SH.OVAL : t === 'r' ? SH.RECTANGLE : SH.ROUNDED_RECTANGLE;
    s.addShape(shape, { x, y, w, h, rotate: rot, rectRadius: t === 'rr' ? Math.min(w, h) * 0.45 : undefined, fill: { color: SKIN },
      line: edgePass ? { color: SKIN_EDGE, width: 2.5 } : { type: 'none' } });
  }));
  // gap between the legs
  line(s, cx, top + 2.95 * k, cx, top + 4.5 * k, SKIN_EDGE, 1.25);
  const P = {};
  if (o.organs === false) return P;
  // brain + pituitary
  oval(s, cx, top + 0.3 * k, 0.52 * k, 0.36 * k, 'F4C7D0', 'C98393', { lw: 0.75 });
  P.pit = [cx, top + 0.53 * k]; ball(s, P.pit[0], P.pit[1], 0.055 * k, G.pit[0], G.pit[1], 1);
  // thyroid: two lobes and an isthmus
  P.thy = [cx, top + 0.86 * k];
  oval(s, cx - 0.07 * k, P.thy[1], 0.11 * k, 0.17 * k, G.thy[0], G.thy[1]); oval(s, cx + 0.07 * k, P.thy[1], 0.11 * k, 0.17 * k, G.thy[0], G.thy[1]);
  box(s, cx - 0.05 * k, P.thy[1] - 0.02 * k, 0.1 * k, 0.05 * k, G.thy[0], null);
  // kidneys (not glands) with adrenal glands on top
  [-1, 1].forEach(sd => {
    oval(s, cx + sd * 0.33 * k, top + 2.12 * k, 0.2 * k, 0.32 * k, 'E3C3BE', 'B08A84', { lw: 0.75 });
    poly(s, [[cx + sd * 0.33 * k - 0.1 * k, top + 1.97 * k], [cx + sd * 0.33 * k + 0.1 * k, top + 1.97 * k], [cx + sd * 0.33 * k, top + 1.82 * k]], G.adr[0], G.adr[1]);
  });
  P.adrL = [cx - 0.33 * k, top + 1.91 * k]; P.adrR = [cx + 0.33 * k, top + 1.91 * k]; P.kid = [cx + 0.33 * k, top + 2.12 * k];
  // pancreas: long, behind the stomach, tail towards the body's left (viewer's right)
  P.pan = [cx + 0.15 * k, top + 1.66 * k];
  oval(s, P.pan[0], P.pan[1], 0.72 * k, 0.15 * k, G.pan[0], G.pan[1], { rot: -10 });
  // ovaries either side of the uterus
  P.ovL = [cx - 0.33 * k, top + 2.6 * k]; P.ovR = [cx + 0.33 * k, top + 2.6 * k];
  poly(s, [[cx - 0.13 * k, top + 2.5 * k], [cx + 0.13 * k, top + 2.5 * k], [cx, top + 2.78 * k]], 'F2B8C6', 'B5546E', { lw: 0.75 });
  [-1, 1].forEach(sd => { line(s, cx + sd * 0.12 * k, top + 2.52 * k, cx + sd * 0.29 * k, top + 2.56 * k, 'B5546E', 1); oval(s, cx + sd * 0.33 * k, top + 2.6 * k, 0.15 * k, 0.1 * k, G.ov[0], G.ov[1]); });
  return P;
}
// leader-line label: text box at (lx, ly) of width lw; line from the box's near edge to point (px, py)
function callout(s, lx, ly, lw, text, px, py, col, o = {}) {
  const right = lx > px;
  label(s, lx, ly - 0.15, lw, text, { size: o.size || 11, bold: true, color: col, align: right ? 'left' : 'right', h: o.h || 0.3, valign: 'middle' });
  line(s, right ? lx - 0.04 : lx + lw + 0.04, ly, px, py, col, 1);
  ball(s, px, py, 0.03, col);
}
// hormone molecule (orange triangle) and receptor (green block with a triangular notch), facing up
function hormone(s, cx, cy, r = 0.08, col = 'E08A1E') { s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r * 0.9, fill: { color: col }, line: { color: '9A5A0A', width: 0.75 } }); }
function receptor(s, cx, ytop, w = 0.24, col = C.green, bound) {
  box(s, cx - w / 2, ytop, w, 0.16, col, '1E6B40', { lw: 0.75 });
  poly(s, [[cx - 0.08, ytop - 0.001], [cx + 0.08, ytop - 0.001], [cx, ytop + 0.13]], C.white, '1E6B40', { lw: 0.5 });
  if (bound) s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.08, y: ytop - 0.01, w: 0.16, h: 0.14, rotate: 180, fill: { color: 'E08A1E' }, line: { color: '9A5A0A', width: 0.75 } });
}
// rounded process box
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
// organ icons
function heartIcon(s, cx, cy, k = 1) {
  ball(s, cx - 0.12 * k, cy - 0.06 * k, 0.14 * k, 'D9534F', '8E2A33', 1); ball(s, cx + 0.12 * k, cy - 0.06 * k, 0.14 * k, 'D9534F', '8E2A33', 1);
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.255 * k, y: cy - 0.04 * k, w: 0.51 * k, h: 0.34 * k, rotate: 180, fill: { color: 'D9534F' }, line: { color: 'D9534F', width: 0.5 } });
}
function lungsIcon(s, cx, cy, k = 1) {
  line(s, cx, cy - 0.32 * k, cx, cy - 0.08 * k, '8C96A8', 3);
  oval(s, cx - 0.17 * k, cy + 0.06 * k, 0.26 * k, 0.48 * k, 'F2A6B0', 'B5546E'); oval(s, cx + 0.17 * k, cy + 0.06 * k, 0.26 * k, 0.48 * k, 'F2A6B0', 'B5546E');
}
function liverIcon(s, cx, cy, k = 1) { poly(s, [[cx - 0.35 * k, cy - 0.15 * k], [cx + 0.35 * k, cy - 0.2 * k], [cx + 0.1 * k, cy + 0.2 * k], [cx - 0.3 * k, cy + 0.12 * k]], 'A0522D', '6B3318'); }
function eyeIcon(s, cx, cy, k = 1, dil = false) {
  oval(s, cx, cy, 0.56 * k, 0.3 * k, C.white, C.ink, { lw: 1 });
  ball(s, cx, cy, 0.12 * k, '5B9BD5', '2F5F8F'); ball(s, cx, cy, (dil ? 0.085 : 0.04) * k, '111111', '111111');
}
function muscleIcon(s, cx, cy, k = 1) {
  oval(s, cx, cy, 0.7 * k, 0.28 * k, 'F4B6B9', 'A33E48', { lw: 1.25 });
  for (let i = -2; i <= 2; i++) line(s, cx + i * 0.1 * k, cy - 0.09 * k, cx + i * 0.1 * k, cy + 0.09 * k, 'C76A72', 0.75);
}
function gutIcon(s, cx, cy, k = 1) {
  const pts = []; for (let i = 0; i <= 16; i++) pts.push([cx - 0.3 * k + i * 0.6 * k / 16, cy + 0.1 * k * Math.sin(i * 1.2)]);
  for (let i = 0; i < 16; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], 'C9A06A', 4);
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Hormones',
  footer: 'OCR J260 Combined Science B • B5.3 How do hormones control responses in the human body? • teacher deck • mark schemes and answers in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • the endocrine system; adrenaline, thyroxine and negative feedback` },
    { icon: 'H', text: 'Higher & Foundation in one deck • B5.3.2 (adrenaline, thyroxine) marked HT' },
    { icon: '⇄', text: 'Glands • hormones • target organs • nerves vs hormones • feedback loops' },
  ],
  notes: 'B5.3 How do hormones control responses in the human body? is Part 3 of 6 in J260 Chapter B5 The human body – staying alive.\nScope check (see SPEC_B5_3.md): J260 B5.3 has two statements, B5.3.1 principles of hormonal coordination by the endocrine system, and B5.3.2 the roles of thyroxine and adrenaline, with thyroxine as an example of negative feedback. Blood glucose control by insulin and glucagon, and type 1 and type 2 diabetes, are in J260 B5.6 ("What can happen when organs and control systems stop working?"), and the sex hormones are in B5.5. They appear on the gland map only and are taught in those decks.\nThe statement wording comes from search extracts (ocr.org.uk could not be fetched). The HT status of B5.3.2 is UNVERIFIED.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B5.3.1', text: 'Describe a **hormone** as a chemical messenger made by an **endocrine gland** and carried in the **blood**.' },
  { code: 'B5.3.1', text: 'Explain why a hormone only affects its **target organs**: their cells have matching **receptors**.' },
  { code: 'B5.3.1', text: 'Locate the main **endocrine glands** on a body outline and name the hormones they make.' },
  { code: 'B5.3.1', text: 'Describe the **pituitary** as the "master gland" that controls other glands.' },
  { code: 'B5.3.1', text: '**Compare** hormonal and nervous control: speed, duration, how signals travel and where they act.' },
  { code: 'B5.3.2', text: 'Explain the role of **adrenaline** in preparing the body for "fight or flight".', ht: true },
  { code: 'B5.3.2', text: 'Explain what **negative feedback** is and why it keeps conditions steady.', ht: true },
  { code: 'B5.3.2', text: 'Explain how **thyroxine** controls metabolic rate and how its level is kept steady by negative feedback with **TSH**.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statement wording found in search extracts (J257 mirror; the same B5.3 wording is quoted for J260 from a plutoniumscience copy of the J260 specification):\nB5.3.1 "describe the principles of hormonal coordination and control by the human endocrine system".\nB5.3.2 "explain the roles of thyroxine and adrenaline in the body, including thyroxine as an example of a negative feedback system".\nHT: the HT pill on B5.3.2 is UNVERIFIED. The evidence is indirect: the thyroxine and adrenaline questions found are on Higher papers (J260/05, J257 Paper 4), Oak National Academy lists "adrenaline, thyroxine and negative feedback" only in its OCR Higher programme, and the equivalent statement is HT in OCR Gateway and AQA. If your copy of the J260 specification shows B5.3.2 in normal type, teach slides 11–17 to all students.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B5 The human body – staying alive • B5.3 is Part 3 of 6 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B5.3.1', 'Hormones, endocrine glands and target organs', 'Both tiers', C.blue],
    ['B5.3.1', 'Map of the endocrine system on the body', 'Both tiers', C.blue],
    ['B5.3.1', 'The pituitary gland; nerves and hormones compared', 'Both tiers', C.blue],
    ['B5.3.2', 'Adrenaline: fight or flight; heart rate data', 'HT', C.red],
    ['B5.3.2', 'Negative feedback', 'HT', C.red],
    ['B5.3.2', 'Thyroxine, TSH and metabolic rate', 'HT', C.red],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B5.3\nHow do hormones control responses?', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B5.1 blood and circulation • B5.2 nervous system, receptors and effectors • B4.1 respiration', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.25, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'B5.1 How do substances get into, out of and around our bodies?',
      'B5.2 How does the nervous system help us respond to changes?',
      '**B5.3 How do hormones control responses in the human body?** (this deck)',
      'B5.4 Why do we need to maintain a constant internal environment?',
      'B5.5 What role do hormones play in human reproduction?',
      'B5.6 What can happen when organs and control systems stop working? (insulin, glucagon, diabetes)',
    ], { size: 11, color: 'E3F2F0', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 3.05, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.75, 5.53, 2.1, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides 5–10 are for everyone. Slides marked **HT** (adrenaline, thyroxine, feedback) are Higher tier.',
      'Insulin and the sex hormones appear on the gland map only: you learn them in **B5.6** and **B5.5**.',
      'Maths: **percentage change** and reading a **graph** of heart rate.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.85, w: 5.15, h: 1.9, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B5 sub-topics as found in search extracts (PMT topic index, docbrown combined pages, a J260 specification copy): B5.1–B5.6, all with Foundation and Higher material in Combined Science; one source suggests that some B5.4 statements are separate science (J257) only (UNVERIFIED). See SPEC_B5_3.md.\nOverlap control: blood glucose control (insulin, glucagon HT) and diabetes are B5.6; menstrual cycle hormones (FSH, LH, oestrogen, progesterone) are B5.5; homeostasis in general, for example temperature control, is B5.4. This deck names those hormones on the gland map and leaves the detail to those decks. Negative feedback is taught here through thyroxine, as the B5.3.2 statement asks.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B5.1 • blood', q: 'Name the **liquid part of the blood** that carries dissolved substances around the body.' },
  { from: 'B5.2 • nervous system', q: 'Name the **two** kinds of **effector** in the body. What does an effector do?' },
  { from: 'B5.2 • nervous system', q: 'What is a **receptor**? Give **one** example of a receptor in the body.' },
  { from: 'B4.1 • respiration', q: 'Write the **word equation** for aerobic respiration.' },
  { from: 'B5.1 • circulation', q: 'Which blood vessels carry blood **away** from the heart? Which carry it **back**?' },
  { from: 'B5.1 • breathing', q: 'A student takes **15 breaths in 30 s**. What is the breathing rate in breaths per **minute**?' },
], { subtitle: 'Recall from B5.1, B5.2 and B4.1 • 6 minutes • no notes', notes: 'ANSWERS\n1. Plasma.\n2. Muscles and glands. An effector carries out the response (muscles contract; glands release / secrete substances, e.g. hormones).\n3. A cell (or group of cells) that detects a stimulus / change in the environment. Examples: light receptors in the eye (retina); temperature receptors in the skin; pressure receptors in the skin; chemical receptors in the tongue / nose.\n4. glucose + oxygen → carbon dioxide + water (energy released / transferred).\n5. Arteries carry blood away; veins carry blood back to the heart.\n6. 15 × 2 = 30 breaths per minute.\nQ2 sets up this lesson: glands are effectors, and many glands release hormones.' }), 'Retrieval starter');

// ======================= 5 WHAT IS A HORMONE =======================
reg(D.contentSlide({
  title: 'Hormones: chemical messengers',
  subtitle: `Specification ${sp('B5.3.1')} • made by endocrine glands, carried in the blood, act on target organs`,
  tag: 'B5.3.1', caption: 'one hormone travels in the plasma; only cells with matching receptors respond',
  draw: (s, p) => {
    // gland
    oval(s, 1.35, 2.35, 1.3, 1.05, 'F3D3A6', G.adr[1], { lw: 1.5 });
    [[1.05, 2.15], [1.4, 2.05], [1.7, 2.3], [1.15, 2.55], [1.5, 2.6]].forEach(([x, y]) => hormone(s, x, y, 0.07));
    label(s, 0.7, 1.45, 1.4, '1  Endocrine **gland**', { size: 11, color: G.adr[1], align: 'left' });
    label(s, 0.65, 2.95, 1.6, 'makes the hormone and **secretes** it into the blood', { size: 10, h: 0.45, valign: 'top' });
    // blood vessel
    const vy = 3.65;
    box(s, 0.65, vy, 5.7, 0.62, 'F8D2D4', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.3, lw: 1.5 });
    arrow(s, 1.55, 2.9, 1.55, vy + 0.1, G.adr[1], 2);
    [[1.9, 0.18], [2.6, 0.42], [3.3, 0.22], [4.1, 0.45], [4.9, 0.2], [5.7, 0.4]].forEach(([x, dy]) => hormone(s, x, vy + dy, 0.07));
    [[2.25, 0.4], [3.75, 0.2], [5.3, 0.46]].forEach(([x, dy]) => ball(s, x, vy + dy, 0.09, 'D9534F', '8E2A33'));
    arrow(s, 2.4, vy + 0.82, 4.4, vy + 0.82, C.red, 1.75);
    label(s, 0.7, vy + 0.7, 1.7, '2  carried in **plasma**', { size: 10.5, color: C.red, align: 'left' });
    label(s, 4.45, vy + 0.7, 1.95, 'to **all** parts of the body', { size: 10.5, color: C.red, align: 'left' });
    // target cell (has receptors) and non-target cell
    const cy = 2.35;
    box(s, 2.75, 1.8, 1.65, 1.15, C.cyto, C.membrane, { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.5 });
    oval(s, 3.57, 2.25, 0.4, 0.34, C.nucleus, C.nucleusEdge);
    receptor(s, 3.1, 2.79, 0.24, C.green, true); receptor(s, 3.9, 2.79, 0.24, C.green, false);
    label(s, 2.7, 1.45, 1.75, '3  **Target** cell', { size: 11, color: C.green });
    arrow(s, 3.9, 3.55, 3.9, 3.1, 'E08A1E', 1.5);
    box(s, 4.65, 1.8, 1.65, 1.15, C.cyto, C.membrane, { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.5 });
    oval(s, 5.47, 2.25, 0.4, 0.34, C.nucleus, C.nucleusEdge);
    box(s, 4.85, 2.79, 0.3, 0.16, 'B8C0CD', '6B7385', { lw: 0.75 }); box(s, 5.75, 2.79, 0.3, 0.16, 'B8C0CD', '6B7385', { lw: 0.75 });
    label(s, 4.6, 1.45, 1.75, 'Other cell', { size: 11, color: C.grey });
    label(s, 2.7, 3.0, 1.75, 'matching receptors: **responds**', { size: 10, color: C.green, h: 0.3 });
    label(s, 4.6, 3.0, 1.75, 'no matching receptor: no effect', { size: 10, color: C.grey, h: 0.3 });
    label(s, 0.7, 4.95, 5.6, '4  The hormone **binds** to its receptor and the target organ **responds**. The response lasts as long as the hormone is in the blood.', { size: 10.5, align: 'left', h: 0.5, valign: 'top' });
  },
  head: 'What is a hormone?',
  lines: [
    'A **hormone** is a **chemical messenger**.',
    'It is made by an **endocrine gland** and **secreted** (released) straight into the **blood**.',
    'The blood carries it to every part of the body.',
    'It only affects **target organs**: their cells have **receptors** that the hormone fits.',
    'The **endocrine system** is all the glands that make hormones. It works with the **nervous system** to coordinate the body.',
  ],
  size: 11,
  worked: { head: 'Worked example: explain', q: 'Adrenaline reaches every organ, but it does not affect the bones. Explain why.',
    steps: [['Travel', 'adrenaline is carried to all organs in the blood'], ['Receptors', 'only target cells have adrenaline receptors'], ['Bone', 'bone cells have no receptors that adrenaline fits'], ['Answer', 'so adrenaline cannot bind and bone does not respond']], size: 10.5 },
  qc: 'A hormone is made in a gland in your **neck** and acts on cells in your **feet**. Describe how it gets there.',
  notes: 'QUICK CHECK ANSWER: The gland secretes the hormone into the blood (1); it dissolves in the plasma and is carried around the body in the blood / circulation (1) until it reaches the target cells, which have receptors for it (1).\nB5.3.1 "describe the principles of hormonal coordination and control by the human endocrine system". The receptor-shape model is a simplified model (stretch link to enzymes and the lock-and-key model). Hormones are removed / broken down (e.g. by the liver), so the effect stops when the gland stops secreting: this is why hormone effects can last a long time but are not permanent.',
}), 'B5.3.1 What is a hormone?');

// ======================= 6 ENDOCRINE MAP =======================
{
  const s = D.contentHeader('The endocrine system', `Specification ${sp('B5.3.1')} • where the main glands are, and the hormones they make`, { tag: 'B5.3.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'front view; the glands are drawn larger than life');
  const P = body(s, 3.15, 1.45, 0.95);
  callout(s, 4.5, 1.75, 1.9, 'Pituitary gland', P.pit[0] + 0.06, P.pit[1], G.pit[1]);
  callout(s, 0.6, 2.28, 1.75, 'Thyroid gland', P.thy[0] - 0.13, P.thy[1], G.thy[1]);
  callout(s, 0.6, 3.05, 1.75, 'Adrenal glands', P.adrL[0] - 0.05, P.adrL[1], G.adr[1]);
  line(s, 2.39, 3.05, P.adrR[0], P.adrR[1] + 0.02, G.adr[1], 0.75, { dash: 'dash' });
  callout(s, 4.5, 2.9, 1.9, 'Pancreas', P.pan[0] + 0.3, P.pan[1] - 0.05, G.pan[1]);
  callout(s, 0.6, 3.92, 1.75, 'Ovaries (female)', P.ovL[0] - 0.08, P.ovL[1], G.ov[1]);
  line(s, 2.39, 3.92, P.ovR[0], P.ovR[1] + 0.02, G.ov[1], 0.75, { dash: 'dash' });
  label(s, 4.5, 3.3, 1.9, 'kidneys (not glands) under the adrenals', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.42, valign: 'top' });
  line(s, 4.48, 3.4, P.kid[0] + 0.1, P.kid[1], C.grey, 0.75);
  // testes inset
  box(s, 4.55, 4.2, 1.85, 1.6, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, 4.6, 4.24, 1.75, 'Male: **testes**', { size: 11, color: G.tes[1] });
  box(s, 4.85, 4.55, 1.25, 0.45, SKIN, SKIN_EDGE, { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1.5 });
  oval(s, 5.47, 5.25, 0.62, 0.42, SKIN, SKIN_EDGE, { lw: 1.5 });
  oval(s, 5.32, 5.25, 0.2, 0.26, G.tes[0], G.tes[1]); oval(s, 5.62, 5.25, 0.2, 0.26, G.tes[0], G.tes[1]);
  label(s, 4.6, 5.48, 1.75, 'in the scrotum', { size: 10, italic: true, color: C.grey });
  // table
  const rows = [[HDR('Gland'), HDR('Hormone(s)'), HDR('Main job')],
    ...[
      ['Pituitary (base of brain)', 'TSH, FSH, LH, growth hormone and others', '"master gland": controls other glands', G.pit],
      ['Thyroid (neck)', 'thyroxine', 'controls metabolic rate', G.thy],
      ['Adrenal (on the kidneys)', 'adrenaline', '"fight or flight"', G.adr],
      ['Pancreas', 'insulin (and glucagon)', 'controls blood glucose (B5.6)', G.pan],
      ['Ovaries', 'oestrogen, progesterone', 'menstrual cycle; female characteristics (B5.5)', G.ov],
      ['Testes', 'testosterone', 'sperm production; male characteristics (B5.5)', G.tes],
    ].map(([g, h, j, col], i) => [tcell(g, i, { bold: true, color: col[1] }), tcell(h, i), tcell(j, i)])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.85, 1.95, 2.28], rowH: 0.5, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.95, 6.08, 1.3, 'Learn the positions', [
    'Head → **pituitary**; neck → **thyroid**; on top of each kidney → **adrenal**; behind the stomach → **pancreas**; pelvis → **ovaries**; scrotum → **testes**.',
  ], { size: 11 });
  D.quickCheck(s, 'Name the gland that sits on top of each **kidney** and the hormone it makes. Which **two** glands differ between males and females?');
  D.notes(s, 'QUICK CHECK ANSWER: Adrenal gland; adrenaline. Ovaries (female) and testes (male).\nThe pancreas is drawn behind the stomach with its tail towards the body\'s left (viewer\'s right); kidneys are drawn faintly because the adrenal glands sit on them. The thyroid is drawn as two lobes joined by an isthmus, in front of the windpipe.\nOverlap control: insulin and glucagon (glucagon is HT) are taught in B5.6, sex hormones in B5.5; ADH (pituitary, water balance) belongs with the kidney in B5.4 and is not named here. TSH, FSH and LH are named because the pituitary slide uses them.');
  reg(s, 'B5.3.1 The endocrine system (body map)');
}

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B5.3.1')} • hormones and endocrine glands`, [
  { q: 'What is a **hormone**?', marks: 2, ms: 'A chemical (messenger) (1); made / secreted by an (endocrine) gland and carried in the blood (to a target organ) (1).' },
  { q: 'Name the **gland in the neck** and the hormone it makes.', marks: 2, ms: 'Thyroid (gland) (1); thyroxine (1).' },
  { q: 'Explain why a hormone affects only its **target organs**, even though it travels all round the body.', marks: 2, ms: 'Only the cells of target organs have receptors (1); that the hormone fits / binds to (1).' },
  { q: 'Name the gland that produces (a) **adrenaline** (b) **testosterone**.', marks: 2, ms: '(a) adrenal gland (1); (b) testes (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 PITUITARY =======================
reg(D.contentSlide({
  title: 'The pituitary: the "master gland"',
  subtitle: `Specification ${sp('B5.3.1')} • pituitary hormones control other endocrine glands`,
  tag: 'B5.3.1', caption: 'pituitary hormones (arrows) travel in the blood to other glands and organs',
  draw: (s, p) => {
    // brain + pituitary
    oval(s, 3.5, 1.95, 1.6, 0.85, 'F4C7D0', 'C98393', { lw: 1.25 });
    label(s, 2.7, 1.62, 1.6, 'brain', { size: 10.5, italic: true, color: '8E4A5A' });
    line(s, 3.5, 2.3, 3.5, 2.5, 'C98393', 3);
    ball(s, 3.5, 2.68, 0.2, G.pit[0], G.pit[1], 1.5);
    label(s, 3.8, 2.55, 2.4, '**Pituitary gland**', { size: 12, color: G.pit[1], align: 'left' });
    const tg = [
      [1.35, 'TSH', 'Thyroid', 'makes thyroxine', G.thy],
      [3.5, 'FSH, LH', 'Ovaries / testes', 'make sex hormones; eggs, sperm (B5.5)', G.ov],
      [5.55, 'Growth hormone', 'Bones, muscles', 'grow', ['6B7385', '4A5262']],
    ];
    tg.forEach(([x, h, org, eff, col]) => {
      arrow(s, 3.5 + (x - 3.5) * 0.12, 2.9, x, 3.95, G.pit[0], 2);
      label(s, x - 0.8 + (x - 3.5) * 0.32, 3.22, 1.6, `**${h}**`, { size: 10.5, color: G.pit[1] });
      pbox(s, x - 0.82, 4.0, 1.64, 0.62, org, C.white, col[1], { bold: true, color: col[1] });
      label(s, x - 0.85, 4.66, 1.7, eff, { size: 10, h: 0.48, valign: 'top' });
    });
    box(s, 0.7, 5.2, 5.6, 0.62, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 5.2, 5.4, 'A chain of control: **brain → pituitary → other gland → target organ**', { size: 11, h: 0.62 });
  },
  head: 'One gland that controls others',
  lines: [
    'The **pituitary gland** is a pea-sized gland at the base of the **brain**.',
    'It is called the **master gland** because many of its hormones **control other glands**.',
    '**TSH** (thyroid-stimulating hormone) makes the **thyroid** release **thyroxine**.',
    '**FSH** and **LH** act on the **ovaries** and **testes** (you meet them again in B5.5).',
    'Its hormones travel in the **blood**, like all hormones.',
  ],
  size: 11,
  worked: { head: 'Worked example: follow the chain', q: 'The pituitary stops making TSH. Predict what happens to the amount of thyroxine. Explain.',
    steps: [['Signal', 'TSH is the signal that makes the thyroid work'], ['No TSH', 'the thyroid is no longer stimulated'], ['Effect', 'it releases less thyroxine'], ['Answer', 'thyroxine level falls, because TSH controls the thyroid']], size: 10.5 },
  qc: 'Explain why the pituitary is called the **master gland**. Name the hormone it uses to control the **thyroid**.',
  notes: 'QUICK CHECK ANSWER: Its hormones control (stimulate) other endocrine glands, e.g. the thyroid, ovaries and testes (1). TSH (thyroid-stimulating hormone) (1).\nThe hypothalamus (TRH) and ACTH (adrenal cortex) are not required at GCSE and are left out. Growth hormone acts on many tissues, not one gland: it is included to show that the pituitary also acts directly on organs. FSH and LH are only named: their roles in the menstrual cycle are B5.5.',
}), 'B5.3.1 The pituitary gland');

// ======================= 9 NERVES VS HORMONES =======================
{
  const s = D.contentHeader('Nerves and hormones compared', `Specification ${sp('B5.3.1')} • two ways to coordinate the body`, { tag: 'B5.3.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'a nerve impulse (top) and a hormone in the blood (bottom); not to scale');
  // nerve route
  label(s, 0.65, 1.42, 5.7, '**Nervous system**: electrical impulses along neurones', { size: 11, color: C.blue, align: 'left' });
  const ny = 2.2;
  ball(s, 0.95, ny, 0.16, 'D8C8EC', '6A4C93', 1.25);
  line(s, 1.11, ny, 5.6, ny, '6A4C93', 3);
  [[5.7, ny - 0.12], [5.75, ny], [5.7, ny + 0.12]].forEach(([x, y]) => line(s, 5.6, ny, x, y, '6A4C93', 1.5));
  muscleIcon(s, 6.05, ny + 0.35, 0.6);
  for (let i = 0; i < 4; i++) { const x = 1.6 + i * 1.0; box(s, x, ny - 0.07, 0.35, 0.14, 'F5D76E', 'B8930A', { lw: 0.75 }); }
  arrow(s, 2.0, ny - 0.3, 4.8, ny - 0.3, '6A4C93', 1.5);
  label(s, 0.65, 2.6, 5.7, 'fast • to **one** place (a muscle or gland) • short-lived', { size: 10.5, align: 'left' });
  // hormone route
  label(s, 0.65, 3.25, 5.7, '**Endocrine system**: hormones carried in the blood', { size: 11, color: G.adr[1], align: 'left' });
  const by = 4.0;
  oval(s, 0.95, by, 0.45, 0.4, 'F3D3A6', G.adr[1], { lw: 1.25 });
  box(s, 1.2, by - 0.22, 4.4, 0.44, 'F8D2D4', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1.25 });
  [1.6, 2.4, 3.3, 4.2, 5.1].forEach((x, i) => hormone(s, x, by + (i % 2 ? 0.05 : -0.04), 0.065));
  [[3.0, 4.65], [4.6, 4.65], [5.9, by]].forEach(([x, y], i) => {
    if (i < 2) line(s, x, by + 0.22, x, y - 0.2, C.red, 1.5);
    box(s, x - 0.32, y - 0.2, 0.64, 0.4, C.cyto, C.membrane, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1 });
    receptor(s, x, y - 0.2, 0.2, C.green, true);
  });
  label(s, 0.65, 4.95, 5.7, 'slower • to **many** target organs • lasts longer', { size: 10.5, align: 'left' });
  // speed bar
  label(s, 0.65, 5.3, 5.7, `Nerve impulse to the foot: about **${nerveT * 1000} ms**. Blood round the body: about **${bloodT} s**.`, { size: 10.5, align: 'left', color: C.text });
  // comparison table
  const rows = [[HDR(''), HDR('Nervous'), HDR('Hormonal')],
    ['Signal', 'electrical impulse', 'chemical (hormone)'],
    ['Travels', 'along neurones', 'in the blood (plasma)'],
    ['Speed', 'very fast (milliseconds)', 'slower (seconds to hours)'],
    ['How long', 'short-lived', 'often long-lasting'],
    ['Where', 'one precise place', 'all target organs, widespread'],
    ['Example', 'reflex: hand off a hot plate', 'growth; thyroxine; puberty']]
    .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.25, 2.4, 2.43], rowH: 0.36, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 4.05, 6.08, 2.2, 'Worked example: how much faster?', `An impulse travels ${nerveDist} m from the spinal cord to the foot at ${nerveSpeed} m/s. Blood takes about ${bloodT} s to go round the body.`, [
    ['Equation', 'time = distance ÷ speed'], ['Substitute', `time = ${nerveDist} ÷ ${nerveSpeed} = ${nerveT} s (${nerveT * 1000} ms)`],
    ['Compare', `${bloodT} ÷ ${nerveT} = ${bloodT / nerveT}`], ['Answer', `the nerve signal is about ${bloodT / nerveT} times faster`]], { size: 10.5 });
  D.quickCheck(s, 'Which system controls (a) blinking when dust hits your eye, (b) growing taller? Give **one** reason for each.');
  D.notes(s, `QUICK CHECK ANSWER: (a) Nervous system: the response must be very fast / it is a reflex to one place (the eyelid muscle). (b) Hormones (growth hormone): growth is slow and long-lasting and affects many tissues all over the body.\nNode: ${nerveDist} ÷ ${nerveSpeed} = ${nerveT} s; ${bloodT} ÷ ${nerveT} = ${bloodT / nerveT}. Impulse speeds vary (about 1–120 m/s); 100 m/s is a typical fast motor neurone. A circulation time of about 1 minute at rest is a textbook value. Neurone structure and synapses belong to B5.2: recap only.`);
  reg(s, 'B5.3.1 Nerves and hormones compared');
}

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B5.3.1')} • the pituitary; nerves and hormones`, [
  { q: 'Explain why the **pituitary gland** is called the "master gland".', marks: 2, ms: 'Its hormones control / stimulate other (endocrine) glands (1); e.g. TSH makes the thyroid release thyroxine / FSH, LH act on the ovaries or testes (1).' },
  { q: 'Give **two** differences between the way the **nervous system** and the **endocrine system** send signals.', marks: 2, ms: 'Any two (1 each): electrical impulses vs chemicals / hormones; along neurones vs in the blood; fast vs slower; short-lived vs longer-lasting; one precise place vs widespread / many target organs.' },
  { q: 'An impulse travels **1.2 m** at **60 m/s**. Calculate the time taken.', marks: 2, ms: 'time = distance ÷ speed = 1.2 ÷ 60 (1); = 0.02 s (20 ms) (1).' },
  { q: 'Suggest why **growth** is controlled by hormones rather than by nerves.', marks: 2, ms: 'Growth happens over a long time / years, and hormones have long-lasting effects (1); it affects many tissues all over the body, and hormones reach all target cells in the blood (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 ADRENALINE =======================
reg(D.contentSlide({
  title: 'Adrenaline: ready for "fight or flight"',
  subtitle: `Specification ${sp('B5.3.2')} • released by the adrenal glands when you are frightened, excited or stressed`,
  tag: 'B5.3.2', ht: true, caption: 'adrenaline from the adrenal glands acts on many target organs at once',
  draw: (s, p) => {
    // centre: kidney + adrenal
    const cx = 3.5, cy = 3.55;
    oval(s, cx, cy + 0.25, 0.55, 0.85, 'E3C3BE', 'B08A84', { lw: 1.25 });
    poly(s, [[cx - 0.32, cy - 0.12], [cx + 0.32, cy - 0.12], [cx, cy - 0.55]], G.adr[0], G.adr[1], { lw: 1.25 });
    label(s, cx - 0.9, cy + 0.72, 1.8, 'adrenal gland on a kidney', { size: 10, italic: true, color: C.grey });
    label(s, cx - 0.9, 1.42, 1.8, 'a fright!', { size: 11, bold: true, color: C.red });
    arrow(s, cx, 1.72, cx, cy - 0.6, C.red, 1.75);
    label(s, cx + 0.05, 2.1, 1.5, 'nerve impulse', { size: 10, color: C.red, align: 'left' });
    const T6 = [
      [1.15, 2.05, 'heart', '**faster, stronger** beat', heartIcon],
      [5.85, 2.05, 'lungs', 'breathing **faster**, airways widen', lungsIcon],
      [1.15, 3.55, 'liver', '**glycogen → glucose** into the blood', liverIcon],
      [5.85, 3.55, 'muscles', 'more blood: more **oxygen** and **glucose**', muscleIcon],
      [1.15, 5.05, 'eyes', 'pupils **dilate**', (s2, x, y, k) => eyeIcon(s2, x, y, k, true)],
      [5.85, 5.05, 'gut, skin', 'blood **diverted away**; digestion slows', gutIcon],
    ];
    T6.forEach(([x, y, nm, eff, icon]) => {
      icon(s, x, y - 0.12, 1);
      label(s, x - 0.6, y + 0.18, 1.2, nm, { size: 10.5, bold: true, color: C.ink, h: 0.24 });
      label(s, x - 0.72, y + 0.4, 1.44, eff, { size: 10, h: 0.45, valign: 'top' });
      const dx = x < cx ? 1 : -1;
      arrow(s, cx + (x < cx ? -0.3 : 0.3), cy - 0.25 + (y - cy) * 0.2, x + dx * 0.75, y - 0.12, G.adr[0], 1.5);
    });
  },
  head: 'What adrenaline does',
  lines: [
    'In danger or stress, nerve impulses make the **adrenal glands** release **adrenaline** into the blood.',
    'Within seconds it reaches many **target organs**.',
    'Heart rate and breathing rate rise, and the liver releases **glucose**.',
    'More **oxygen** and **glucose** reach the muscles, for more **respiration**: more energy for **fighting or running away**.',
    'The effect is fast for a hormone and wears off in minutes.',
  ],
  size: 11,
  worked: { head: 'Worked example: link the effects', q: 'Explain how a faster heart rate helps a sprinter escape danger.',
    steps: [['Blood', 'more blood is pumped to the muscles each minute'], ['Delivery', 'more oxygen and glucose reach the muscle cells'], ['Respiration', 'faster aerobic respiration releases more energy'], ['Answer', 'muscles can contract harder and for longer']], size: 10.5 },
  qc: 'Adrenaline makes the liver turn **glycogen into glucose**. Explain why this helps in a "fight or flight" situation.',
  notes: 'QUICK CHECK ANSWER: Blood glucose concentration rises (1), so more glucose is delivered to the muscles for respiration (1), releasing more energy for muscle contraction (1).\nB5.3.2 "explain the roles of thyroxine and adrenaline in the body". HT status UNVERIFIED (see slide 2 notes). The release of adrenaline is triggered by nerve impulses: a good example of the two systems working together. The glycogen-to-glucose effect is part of adrenaline\'s role; the control of blood glucose by insulin and glucagon is B5.6 and is not taught here.',
}), 'B5.3.2 Adrenaline (HT)');

// ======================= 12 HEART RATE DATA =======================
{
  const s = D.contentHeader('Data: heart rate after a fright', `Specification ${sp('B5.3.2')} • suggested activity: interpret a graph • percentage change`, { tag: 'B5.3.2', ht: true, pag: true });
  D.panel(s, 0.45, 1.3, 6.4, 4.95, 'sample data for one student; the loud noise is at 2 min');
  const g = { x: 1.45, y: 1.55, w: 5.05, h: 3.65, xmin: 0, xmax: 10, ymin: 60, ymax: 130, xstep: 1, ystep: 10, minor: 2, xlabel: 'time / min', ylabel: 'heart rate / beats per min' };
  D.axes(s, g);
  D.plotLine(s, g, HR, C.red, 2.25);
  D.points(s, g, HR, C.ink);
  // event marker
  line(s, D.px(g, 2), g.y, D.px(g, 2), g.y + g.h, C.orange, 1.25, { dash: 'dash' });
  label(s, D.px(g, 2) + 0.05, g.y + 0.05, 1.4, 'loud noise', { size: 10, bold: true, color: C.orange, align: 'left' });
  // resting line
  line(s, g.x, D.py(g, hrRest), g.x + g.w, D.py(g, hrRest), C.blue, 1, { dash: 'dash' });
  label(s, D.px(g, 7.3), D.py(g, hrRest) - 0.3, 1.5, `resting ${hrRest}`, { size: 10, color: C.blue, align: 'left' });
  label(s, D.px(g, 4) + 0.1, D.py(g, hrPeak) - 0.12, 1.2, `peak ${hrPeak}`, { size: 10, bold: true, color: C.red, align: 'left' });
  // table
  const rows = [[HDR('Time / min'), ...HR.map(p => HDR(String(p[0])))], [{ text: 'Rate / bpm', options: { bold: true } }, ...HR.map(p => ({ text: String(p[1]) }))]];
  s.addTable(rows, { x: 7.1, y: 1.3, w: 5.78, colW: [1.17, ...Array(11).fill(4.61 / 11)], rowH: 0.3, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 7.1, 2.05, 5.78, 2.05, 'Worked example: percentage increase', 'Calculate the percentage increase from resting heart rate to the peak.', [
    ['Equation', '% increase = (new − original) ÷ original × 100'], ['Change', `${hrPeak} − ${hrRest} = ${hrPeak - hrRest} beats per min`],
    ['Substitute', `${hrPeak - hrRest} ÷ ${hrRest} × 100 = ${hrPct.toFixed(2)}`], ['Answer', `${sf(hrPct, 3)}% (3 s.f.)`]], { size: 10.5 });
  D.card(s, 7.1, 4.22, 5.78, 2.03, 'Describe and explain', [
    'Heart rate rises **within 1 min** of the noise: adrenaline is carried quickly in the blood.',
    'It peaks at **4 min**, then falls back to near resting by about **10 min**: adrenaline is broken down and no more is released.',
    'Fair comparisons: same person, sitting still, same noise.',
  ], { size: 10.5 });
  D.quickCheck(s, 'A different student\'s heart rate rose from **72** to **90** beats per min. Calculate the percentage increase.');
  D.notes(s, `QUICK CHECK ANSWER: (90 − 72) ÷ 72 × 100 = 18 ÷ 72 × 100 = 25%.\nNode: peak ${hrPeak}, rise ${hrPeak - hrRest}, % increase ${hrPct} (${sf(hrPct, 3)}% to 3 s.f.). Graph drawn to scale from the table (y axis starts at 60 bpm: point this out; it exaggerates the change visually).\nIllustrative data, typical of class pulse-rate investigations. No PAG is linked to B5.3 in the extracts found; this is a suggested data activity (heart rate can be measured with a pulse in the wrist or a pulse oximeter). Ethics: do not deliberately frighten students; a mild surprise or a video clip is enough, and students with heart conditions should not take part.`);
  reg(s, 'B5.3.2 Heart rate data (HT)');
}

// ======================= 13 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B5.3.2')} • adrenaline`, [
  { q: 'Name the gland that releases **adrenaline** and state where it is found.', marks: 2, ms: 'Adrenal gland (1); on top of the kidneys (1).' },
  { q: 'Describe **three** effects of adrenaline on the body.', marks: 3, ms: 'Any three (1 each): heart rate increases / heart beats more strongly; breathing rate increases; liver converts glycogen to glucose / blood glucose rises; more blood to muscles; blood diverted from gut / skin; pupils dilate.' },
  { q: 'A student\'s heart rate rose from **60** to **105** beats per min. Calculate the percentage increase.', marks: 2, ms: '(105 − 60) ÷ 60 × 100 (1); = 75% (1).' },
  { q: 'Explain why blood is diverted away from the **gut** during "fight or flight".', marks: 1, ms: 'So more blood (oxygen, glucose) goes to the muscles / digestion is not needed in an emergency (1).' },
], { ht: true });
reg(R3.s, 'Recap 3 (HT)');

// ======================= 14 NEGATIVE FEEDBACK =======================
reg(D.contentSlide({
  title: 'Negative feedback',
  subtitle: `Specification ${sp('B5.3.2')} • a change triggers a response that reverses the change`,
  tag: 'B5.3.2', ht: true, caption: 'the general pattern: the level is kept close to a set point',
  draw: (s, p) => {
    const cx = 3.5;
    pbox(s, cx - 1.05, 3.3, 2.1, 0.65, 'Normal level (set point)', 'E6F4EA', C.green, { bold: true, color: '1E6B40' });
    // top loop: level rises
    pbox(s, 0.75, 1.55, 2.1, 0.75, '**Level rises** above normal', 'FBECEC', C.red, { size: 10.5 });
    pbox(s, 4.15, 1.55, 2.1, 0.75, 'Detected → response **lowers** the level', C.white, C.blue, { size: 10.5 });
    // bottom loop: level falls
    pbox(s, 0.75, 4.95, 2.1, 0.75, '**Level falls** below normal', 'E8F1FB', '3B7DD8', { size: 10.5 });
    pbox(s, 4.15, 4.95, 2.1, 0.75, 'Detected → response **raises** the level', C.white, C.blue, { size: 10.5 });
    arrow(s, cx - 0.7, 3.3, 1.8, 2.32, C.red, 2);
    arrow(s, 2.87, 1.92, 4.13, 1.92, C.ink, 2);
    arrow(s, 5.2, 2.32, cx + 0.7, 3.28, C.green, 2);
    arrow(s, cx - 0.7, 3.95, 1.8, 4.93, '3B7DD8', 2);
    arrow(s, 2.87, 5.32, 4.13, 5.32, C.ink, 2);
    arrow(s, 5.2, 4.93, cx + 0.7, 3.97, C.green, 2);
    label(s, 0.7, 2.6, 1.75, 'a change…', { size: 10.5, italic: true, color: C.red, align: 'left' });
    label(s, 4.95, 2.6, 1.5, '…is reversed', { size: 10.5, italic: true, color: C.green, align: 'right' });
    label(s, 0.7, 4.38, 1.75, 'a change…', { size: 10.5, italic: true, color: '3B7DD8', align: 'left' });
    label(s, 4.95, 4.38, 1.5, '…is reversed', { size: 10.5, italic: true, color: C.green, align: 'right' });
  },
  head: 'Keeping things steady',
  lines: [
    'Your cells work best when conditions stay **steady**.',
    '**Negative feedback**: when a level **changes**, the body detects it and makes a response that **reverses** the change.',
    'It works both ways: a **rise** is brought **down**; a **fall** is brought **up**.',
    'So the level stays close to a normal value (the **set point**), going a little above and below.',
    'It is called **negative** because the response is the **opposite** of the change.',
  ],
  size: 11,
  worked: { head: 'Worked example: a thermostat', q: 'A room heater has a thermostat set to 20 °C. Explain how it uses negative feedback.',
    steps: [['Rise', 'room goes above 20 °C: the sensor detects it'], ['Response', 'the heater switches off, so the room cools'], ['Fall', 'below 20 °C: the heater switches on, so it warms'], ['Answer', 'each change is reversed: temperature stays near 20 °C']], size: 10.5 },
  qc: 'Explain why this process is called **negative** feedback.',
  notes: 'QUICK CHECK ANSWER: The response is opposite to (reverses / cancels out) the change: an increase causes a response that decreases the level, and a decrease causes a response that increases it.\nB5.3.2 asks for thyroxine "as an example of a negative feedback system": the next slide applies this pattern. Misconception to tackle: negative feedback is not only about bringing high levels down; it also brings low levels up. Homeostasis in general (temperature control etc.) is B5.4: the thermostat is an analogy only.',
}), 'B5.3.2 Negative feedback (HT)');

// ======================= 15 THYROXINE LOOP =======================
reg(D.contentSlide({
  title: 'Thyroxine: a negative feedback loop',
  subtitle: `Specification ${sp('B5.3.2')} • thyroxine controls metabolic rate; TSH from the pituitary controls thyroxine`,
  tag: 'B5.3.2', ht: true, caption: 'the thyroxine level is kept steady by negative feedback on the pituitary',
  draw: (s, p) => {
    // pituitary top, thyroid bottom, body cells right
    ball(s, 1.55, 2.0, 0.28, G.pit[0], G.pit[1], 1.5);
    label(s, 0.65, 2.35, 1.8, '**Pituitary gland**', { size: 11, color: G.pit[1] });
    // thyroid butterfly
    oval(s, 1.35, 4.65, 0.36, 0.6, G.thy[0], G.thy[1], { lw: 1.25 }); oval(s, 1.75, 4.65, 0.36, 0.6, G.thy[0], G.thy[1], { lw: 1.25 });
    box(s, 1.45, 4.6, 0.2, 0.14, G.thy[0], null);
    label(s, 0.65, 5.0, 1.8, '**Thyroid gland**', { size: 11, color: G.thy[1] });
    // TSH arrow down
    arrow(s, 1.55, 2.62, 1.55, 4.3, G.pit[0], 2.5);
    label(s, 1.65, 3.2, 1.2, '**TSH**\nin blood', { size: 10.5, color: G.pit[1], align: 'left', h: 0.5 });
    // thyroxine to cells
    arrow(s, 2.0, 4.65, 4.45, 4.65, G.thy[0], 2.5);
    label(s, 2.4, 4.33, 1.9, '**thyroxine** in blood', { size: 10.5, color: G.thy[1] });
    box(s, 4.5, 4.15, 1.85, 1.0, C.cyto, C.membrane, { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.25 });
    label(s, 4.55, 4.15, 1.75, 'body cells: **metabolic rate ↑**', { size: 10.5, h: 1.0 });
    // feedback arrow back to pituitary (inhibits)
    line(s, 3.2, 4.45, 3.2, 2.0, C.red, 2.5, { dash: 'dash' });
    arrow(s, 3.2, 2.0, 1.88, 2.0, C.red, 2.5, { dash: 'dash' });
    s.addShape(SH.OVAL, { x: 3.32, y: 2.78, w: 0.4, h: 0.4, fill: { color: C.red }, line: { color: C.red } });
    label(s, 3.32, 2.78, 0.4, '−', { size: 18, bold: true, color: C.white, h: 0.4 });
    label(s, 3.8, 2.55, 2.5, 'high thyroxine **inhibits** TSH release', { size: 10.5, color: C.red, align: 'left', h: 0.5, valign: 'top' });
    label(s, 3.8, 3.15, 2.5, 'low thyroxine: **more** TSH is released', { size: 10.5, color: '3B7DD8', align: 'left', h: 0.5, valign: 'top' });
  },
  head: 'Controlling thyroxine',
  lines: [
    '**Thyroxine** is made by the **thyroid gland** in the neck.',
    'It raises the **metabolic rate**: the rate of chemical reactions in cells, e.g. respiration. It is also needed for normal **growth** and development.',
    'The pituitary releases **TSH**, which makes the thyroid release thyroxine.',
    'If thyroxine is **too high**, TSH release is **inhibited**, so less thyroxine is made.',
    'If thyroxine is **too low**, **more** TSH is released, so more thyroxine is made.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: too much thyroxine', q: 'Thyroxine in the blood rises above normal. Describe how it is returned to normal.',
    steps: [['Detect', 'the high thyroxine level is detected (pituitary)'], ['TSH', 'less TSH is released into the blood'], ['Thyroid', 'the thyroid is stimulated less, so releases less thyroxine'], ['Answer', 'thyroxine falls back to normal: negative feedback']], size: 10.5 },
  workedH: 2.05,
  qc: 'Thyroxine falls **below** normal. Describe the changes in **TSH** and **thyroxine** that follow.',
  notes: 'QUICK CHECK ANSWER: The pituitary releases more TSH (1); this stimulates the thyroid to release more thyroxine (1); thyroxine rises back to normal, then TSH release is reduced again (1).\nB5.3.2 "including thyroxine as an example of a negative feedback system" (HT status UNVERIFIED). A June 2018 J260/05 (Higher) mark scheme credits "thyroxine increases rate of chemical reactions / controls metabolic rate" and the TSH feedback loop. The hypothalamus (TRH) is not required at GCSE (stretch). Iodine deficiency and goitre are context only.',
}), 'B5.3.2 Thyroxine and TSH (HT)');

// ======================= 16 FEEDBACK GRAPH + COMPARISON =======================
{
  const s = D.contentHeader('Thyroxine and TSH over time', `Specification ${sp('B5.3.2')} • reading a feedback graph; adrenaline and thyroxine compared`, { tag: 'B5.3.2', ht: true });
  D.panel(s, 0.45, 1.3, 6.4, 4.95, 'model graph; arbitrary units; the TSH change follows the thyroxine change');
  const g = { x: 1.4, y: 1.6, w: 5.15, h: 3.55, xmin: 0, xmax: 24, ymin: 0, ymax: 10, xstep: 4, ystep: 2, xlabel: 'time / arbitrary units', ylabel: 'level / arbitrary units' };
  D.axes(s, g);
  // normal band
  s.addShape(SH.RECTANGLE, { x: g.x, y: D.py(g, 6), w: g.w, h: D.py(g, 4) - D.py(g, 6), fill: { color: C.green, transparency: 82 }, line: { type: 'none' } });
  label(s, D.px(g, 18.2), D.py(g, 6) - 0.27, 1.4, 'normal range', { size: 10, bold: true, color: '1E6B40', align: 'left' });
  const thy = t => 5 + 2.6 * Math.exp(-t / 9) * Math.sin(2 * Math.PI * t / 10);
  const tsh = t => 5 - 2.2 * Math.exp(-t / 9) * Math.sin(2 * Math.PI * (t - 1.5) / 10);
  D.fnLine(s, g, thy, 0, 24, 80, G.thy[0], 2.5);
  D.fnLine(s, g, tsh, 0, 24, 80, G.pit[0], 2.5);
  // key
  line(s, 1.6, 5.75, 1.95, 5.75, G.thy[0], 2.5); label(s, 2.0, 5.62, 1.2, 'thyroxine', { size: 10.5, bold: true, color: G.thy[1], align: 'left' });
  line(s, 3.3, 5.75, 3.65, 5.75, G.pit[0], 2.5); label(s, 3.7, 5.62, 1.2, 'TSH', { size: 10.5, bold: true, color: G.pit[1], align: 'left' });
  // annotations: peak and trough of thyroxine
  label(s, D.px(g, 2.5) - 0.6, D.py(g, thy(2.5)) - 0.32, 1.2, '**A**', { size: 11, color: C.red });
  label(s, D.px(g, 7.5) - 0.6, D.py(g, thy(7.5)) + 0.06, 1.2, '**B**', { size: 11, color: '3B7DD8' });
  const rows = [[HDR(''), HDR('Adrenaline'), HDR('Thyroxine')],
    ['Gland', 'adrenal glands', 'thyroid gland'],
    ['Released when', 'fear, stress, excitement', 'all the time; controlled by TSH'],
    ['Main effect', 'prepares for fight or flight', 'sets the metabolic rate'],
    ['Timescale', 'seconds to minutes', 'long term: days, weeks'],
    ['Control', 'nerve impulses', 'negative feedback']]
    .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
  s.addTable(rows, { x: 7.1, y: 1.3, w: 5.78, colW: [1.38, 2.2, 2.2], rowH: 0.38, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 7.1, 3.75, 5.78, 2.5, 'Worked example: explain the graph', 'At point A, thyroxine is above the normal range. Explain the shape of both lines after A.', [
    ['High', 'high thyroxine inhibits TSH release, so TSH falls'], ['Less TSH', 'the thyroid is stimulated less: thyroxine falls'],
    ['Low (B)', 'low thyroxine: more TSH is released; thyroxine rises'], ['Answer', 'each change is reversed; swings get smaller and settle near normal']], { size: 10.5 });
  D.quickCheck(s, 'On the graph, the **TSH** line is high when **thyroxine** is low. Explain why the two lines move in **opposite** directions.');
  D.notes(s, 'QUICK CHECK ANSWER: Thyroxine inhibits TSH release (negative feedback): when thyroxine is high, less TSH is released; when thyroxine is low, more TSH is released. TSH then changes thyroxine release, so the two levels move in opposite directions (with a short delay).\nThe graph is a model (a damped oscillation in arbitrary units), not real data: real levels fluctuate much less. The delay between the lines is shown to make the cause and effect visible.\nThe comparison table links B5.3.1 and B5.3.2: adrenaline is a short-term, fast hormonal response triggered by nerves; thyroxine is a long-term control kept steady by negative feedback.');
  reg(s, 'B5.3.2 Feedback graph; adrenaline vs thyroxine (HT)');
}

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B5.3.2')} • thyroxine and negative feedback`, [
  { q: 'What is meant by **negative feedback**?', marks: 1, ms: 'A change in a level triggers a response that reverses the change / brings it back to normal (1).' },
  { q: 'State what **thyroxine** controls in the body.', marks: 1, ms: 'Metabolic rate / rate of chemical reactions in cells (also accept growth and development) (1).' },
  { q: 'Name the hormone that stimulates the thyroid gland and the gland that releases it.', marks: 2, ms: 'TSH / thyroid-stimulating hormone (1); pituitary gland (1).' },
  { q: 'The level of thyroxine in the blood **rises above normal**. Explain how negative feedback returns it to normal.', marks: 3, ms: 'High thyroxine inhibits / reduces TSH release from the pituitary (1); less TSH reaches the thyroid (in the blood) (1); so the thyroid releases less thyroxine and the level falls (back to normal) (1).' },
  { q: 'Give **one** difference between the effects of adrenaline and thyroxine.', marks: 1, ms: 'e.g. adrenaline acts in seconds / short-term, thyroxine long-term; adrenaline for fight or flight, thyroxine controls metabolic rate (1).' },
], { ht: true });
reg(R4.s, 'Recap 4 (HT)');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Hormone', 'A chemical messenger made by a gland and carried in the blood.'],
  ['Endocrine gland', 'A gland that secretes hormones directly into the blood.'],
  ['Endocrine system', 'All the glands that make hormones; works with the nervous system.'],
  ['Target organ', 'An organ whose cells have receptors for a hormone, so it responds.'],
  ['Receptor (on a cell)', 'A molecule on a target cell that a particular hormone fits.'],
  ['Pituitary gland', '"Master gland" at the base of the brain; controls other glands.'],
  ['Thyroid gland', 'Gland in the neck that makes thyroxine.'],
  ['Adrenal glands', 'Glands on top of the kidneys that make adrenaline.'],
  ['Adrenaline', 'Hormone that prepares the body for "fight or flight".'],
  ['Thyroxine', 'Hormone from the thyroid that controls metabolic rate.'],
  ['TSH', 'Thyroid-stimulating hormone from the pituitary: makes the thyroid release thyroxine.'],
  ['Metabolic rate', 'The rate of all the chemical reactions in the body\'s cells.'],
  ['Negative feedback', 'A change triggers a response that reverses the change.'],
  ['Set point', 'The normal level that negative feedback keeps a factor close to.'],
  ['Pancreas', 'Gland that makes insulin (and glucagon) to control blood glucose (B5.6).'],
  ['Ovaries / testes', 'Glands that make sex hormones: oestrogen, progesterone / testosterone.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. Thyroxine, TSH, negative feedback, set point and adrenaline go with the HT statement B5.3.2 (HT status UNVERIFIED).' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('Hormones coordinate many responses in the body. A student is waiting to go on stage and feels nervous.', [
  { l: 'a', q: 'Name the gland that:\n(i) releases adrenaline  (ii) is called the "master gland"  (iii) releases thyroxine', marks: 3, ms: '(i) adrenal gland (1); (ii) pituitary gland (1); (iii) thyroid gland (1).', h: 1.15 },
  { l: 'b', q: 'Adrenaline is carried all round the body, but only some organs respond. Explain why.', marks: 2, ms: 'Adrenaline is carried in the blood to all organs (1); only target organs / cells have receptors that adrenaline fits / binds to (1).' },
  { l: 'c', q: 'Give **two** differences between hormonal control and nervous control.', marks: 2, ms: 'Any two (1 each): chemical vs electrical; in the blood vs along neurones; slower vs faster; longer-lasting vs short-lived; widespread vs precise / one place.' },
  { l: 'd', q: 'The student\'s heart rate rose from **80** to **132** beats per minute. Calculate the percentage increase.', marks: 2, ms: '(132 − 80) ÷ 80 × 100 (1); = 65% (1).' },
  { l: 'e', q: 'Explain how **two** effects of adrenaline help the muscles in "fight or flight".', marks: 2, ht: true, ms: 'Any two explained effects (1 each): heart beats faster so more blood / oxygen / glucose to muscles; liver converts glycogen to glucose so more glucose for respiration; breathing faster so more oxygen; blood diverted from gut to muscles. Effect must be linked to the muscles / respiration.', h: 1.1 },
  { l: 'f', q: 'Explain how the level of **thyroxine** is kept constant by **negative feedback**.', marks: 2, ht: true, ms: 'Pituitary releases TSH which stimulates the thyroid to release thyroxine (1); high thyroxine inhibits TSH release so less thyroxine is made / low thyroxine causes more TSH so more thyroxine (1).', h: 1.1 },
], 13, { subtitle: `Specification ${sp('B5.3.1')}–${sp('B5.3.2')} • answer every part • 13 marks • (e) and (f) are Higher tier` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Nervous: electrical impulses along neurones (sensory, relay, motor); hormonal: chemicals (hormones) secreted by endocrine glands into the blood.',
    'Nervous responses are very fast (milliseconds); hormonal responses are slower (seconds to hours).',
    'Nervous effects are short-lived; hormonal effects are usually longer-lasting.',
    'Nervous signals go to one precise place (a particular muscle or gland); hormones reach all cells but act only on target organs with receptors, so effects can be widespread.',
    'Examples: reflexes, e.g. hand withdrawn from a hot object (nervous); growth, metabolic rate (thyroxine), puberty (sex hormones) (hormonal).',
    'Both use receptors and effectors; glands are effectors of the nervous system; the systems work together, e.g. nerve impulses trigger adrenaline release; the pituitary is controlled by the brain.',
    'Judgement: fast, short, precise responses suit nerves; slow, long-term, widespread changes suit hormones.',
  ], {
    l3: 'Compares the two systems on at least THREE features (e.g. signal, route, speed, duration, spread) with a suitable example of each system, and explains why each suits its job.',
    l2: 'Compares the two systems on at least TWO features, OR describes features with an example, with some explanation.',
    l1: 'Gives simple features of one or both systems, e.g. "nerves are faster" or "hormones are in the blood".',
  });
}
const HW = [
  { n: '1', q: 'What is an **endocrine gland**?', marks: 1, ms: 'A gland that secretes hormones (directly) into the blood (1).' },
  { n: '2', q: 'Name the hormone made by the **thyroid** gland and state what it controls.', marks: 2, ms: 'Thyroxine (1); metabolic rate / rate of chemical reactions in cells (1).' },
  { n: '3', q: 'Explain how a hormone made in the **pituitary gland** reaches the **thyroid** and makes it respond.', marks: 2, ms: 'TSH is secreted into the blood and carried to the thyroid (1); thyroid cells have receptors for TSH, so the thyroid responds / releases thyroxine (1).' },
  { n: '4', q: 'A student\'s heart rate rose from **64** to **112** beats per minute after a fright. Calculate the percentage increase.', marks: 2, ms: '(112 − 64) ÷ 64 × 100 (1); = 75% (1).' },
  { n: '5', q: 'Describe **two** effects of **adrenaline** on the body.', marks: 2, ht: true, ms: 'Any two (1 each): heart rate increases; breathing rate increases; liver releases glucose (glycogen → glucose); more blood to muscles; blood diverted from gut / skin; pupils dilate.' },
  { n: '6', q: 'Thyroxine falls **below** normal. Explain how **negative feedback** brings it back to normal.', marks: 2, ht: true, ms: 'More TSH is released by the pituitary (1); so the thyroid is stimulated to release more thyroxine (until the level is back to normal) (1).', h: 1.1 },
  { n: '7', q: '**Compare** how the **nervous system** and the **endocrine system** coordinate responses in the body. Use an example of each in your answer.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q5 and Q6 are Higher tier. Q7 is a 6-mark extended answer.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 8); assert.strictEqual(R3.total, 8); assert.strictEqual(R4.total, 8);
const out = path.join(__dirname, 'OCR21C_B5.3_Hormones_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
