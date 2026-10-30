// build_B4_3.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B4 Using food and controlling growth, B4.3 How do organisms grow and develop? (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B4_3.js
// Structure copied from build_B4_1.js. ocr_bio_template.js is NOT edited by this deck: chromosome, cell-cycle wheel,
// mitosis-stage, microscope, stem-cell and meristem helpers are in the DECK-SPECIFIC block below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B4', chapterTitle: 'Using food and controlling growth', code: 'B4.3', title: 'How do organisms grow and develop?',
  part: 3, parts: 3, specRange: 'B4.3.1–B4.3.5',
  subtitle: 'The cell cycle, mitosis, differentiation and stem cells',
  keywords: ['Cell cycle', 'Mitosis', 'Cancer', 'Differentiation', 'Stem cells', 'Meristems'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
// starter
const magStarter = calc('starter magnification 20 mm / 0.05 mm', 20 / 0.05, 400, 1e-9);
// slide 5: growth by doubling
const doub = [0, 1, 2, 3].map(n => 2 ** n);
assert.deepStrictEqual(doub, [1, 2, 4, 8]);
calc('cells after 10 divisions 2^10', 2 ** 10, 1024);
calc('QC cells after 6 divisions 2^6', 2 ** 6, 64);
// slide 6: chromosomes
calc('human diploid 23 × 2', 23 * 2, 46);
calc('chromatids after replication 46 × 2', 46 * 2, 92);
calc('QC dog pairs 78 / 2', 78 / 2, 39);
// slide 8: cell cycle wheel (human cell in culture, about 24 h; illustrative split)
const CYC = [['grow', 10], ['dna', 8], ['grow2', 5], ['mit', 1]];
const cycTotal = calc('cell cycle total 10 + 8 + 5 + 1 h', CYC.reduce((a, [, h]) => a + h, 0), 24);
const interH = calc('interphase hours 10 + 8 + 5', 10 + 8 + 5, 23);
const pctMit = calc('% of cycle in mitosis 1/24 × 100', 1 / 24 * 100, 4.166666666666667, 1e-9);
calc('% mitosis 2 s.f.', sf(pctMit, 2), 4.2, 1e-12);
calc('% interphase 2 s.f.', sf(interH / cycTotal * 100, 2), 96, 1e-12);
// slide 10: mitosis twice
calc('cells after mitosis twice', 2 ** 2, 4);
// PAG B1 root tip (slides 12–13): illustrative counts from one field of view... and two more fields
const RT = [
  ['Interphase', 'not dividing', 168],
  ['Chromosomes condense', 'A', 16],
  ['Chromosomes line up', 'B', 7],
  ['Chromatids separate', 'C', 4],
  ['Two nuclei form', 'D', 5],
];
const rtTotal = calc('root tip total cells', RT.reduce((a, r) => a + r[2], 0), 200);
const rtPct = RT.map(r => r[2] / rtTotal * 100);
[84, 8, 3.5, 2, 2.5].forEach((v, i) => calc(`root tip % ${RT[i][0]}`, rtPct[i], v, 1e-9));
const rtDividing = calc('root tip cells dividing 16 + 7 + 4 + 5', 16 + 7 + 4 + 5, 32);
calc('root tip % dividing', rtDividing / rtTotal * 100, 16, 1e-9);
const rtCycleMin = calc('onion root tip cycle 20 h in min', 20 * 60, 1200);
const rtMin = rtPct.map(p => p / 100 * rtCycleMin);
[1008, 96, 42, 24, 30].forEach((v, i) => calc(`root tip time ${RT[i][0]} / min`, rtMin[i], v, 1e-9));
calc('root tip times sum to cycle', rtMin.reduce((a, b) => a + b, 0), rtCycleMin, 1e-9);
calc('interphase hours 1008 / 60', rtMin[0] / 60, 16.8, 1e-9);
// slide 15: tumour doubling
calc('tumour 30 days / 3 days', 30 / 3, 10);
calc('tumour cells 2^10', 2 ** 10, 1024);
// slide 16: chromosome numbers
calc('fertilisation 23 + 23', 23 + 23, 46);
// recaps
calc('R1 2^5', 2 ** 5, 32);
calc('R3 12 / 150 × 100', 12 / 150 * 100, 8, 1e-9);
calc('R3 stretch 8 % of 22 h', 0.08 * 22, 1.76, 1e-9);
calc('R3 stretch in minutes', 0.08 * 22 * 60, 105.6, 1e-9);
// full question
calc('FQ 9 / 120 × 100', 9 / 120 * 100, 7.5, 1e-9);
// homework
calc('HW 18 / 240 × 100', 18 / 240 * 100, 7.5, 1e-9);
calc('HW stretch 6 / 300 × 24 h', 6 / 300 * 24, 0.48, 1e-9);
calc('HW stretch in minutes', 6 / 300 * 24 * 60, 28.8, 1e-9);

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
const R_ = (t, o = {}) => T.rich(t, Object.assign({ color: C.text }, o));
const brk = arr => { arr[arr.length - 1].options.breakLine = true; return arr; };
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const fmt = v => String(+v.toFixed(6));
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });

// --- chromosomes ---
// colours: long pair R (from mother) and B (from father); short pair r and b
const CH = { R: ['D9534F', '8E2A33'], B: ['3B7DD8', '1F4E8C'], r: ['F2A0A6', 'B5545C'], b: ['9CC3F0', '4F7FB8'] };
// one rod (a chromatid) centred on (cx, cy), long axis vertical then turned rot° clockwise
function rod(s, cx, cy, len, th, rot, col) {
  s.addShape(SH.ROUNDED_RECTANGLE, { x: cx - th / 2, y: cy - len / 2, w: th, h: len, rotate: rot || 0, rectRadius: th / 2, fill: { color: CH[col][0] }, line: { color: CH[col][1], width: 0.75 } });
}
// chromosome(s, cx, cy, len, col, o): o.single = one chromatid (unreplicated / separated); otherwise two identical
// sister chromatids side by side, joined at the centromere. o.rot turns the whole chromosome; o.th = rod thickness.
function chromosome(s, cx, cy, len, col, o = {}) {
  const th = o.th || 0.07, r = (o.rot || 0) * Math.PI / 180;
  if (o.single) { rod(s, cx, cy, len, th, o.rot, col); return; }
  const d = th * 0.55, px = Math.cos(r) * d, py = Math.sin(r) * d;
  rod(s, cx - px, cy - py, len, th, o.rot, col);
  rod(s, cx + px, cy + py, len, th, o.rot, col);
  oval(s, cx, cy, th * 2.3, th * 0.8, CH[col][1], null, { rot: o.rot || 0 });
}
const fibre = (s, x1, y1, x2, y2) => line(s, x1, y1, x2, y2, '8C96A8', 0.75);
function cellOval(s, cx, cy, w, h, o = {}) { oval(s, cx, cy, w, h, o.fill || C.cyto, C.membrane, { lw: o.lw || 1.5 }); }
function nucleusD(s, cx, cy, r, o = {}) { oval(s, cx, cy, 2 * r, (o.squash || 1) * 2 * r, o.fill || 'E7DDF3', C.nucleusEdge, { lw: 1.25, dash: o.dash }); }
// long thin DNA threads (interphase): zigzags
function threads(s, cx, cy, w, cols) {
  cols.forEach((c, i) => {
    const y0 = cy - 0.2 + i * 0.13, n = 7;
    for (let j = 0; j < n; j++) {
      const xa = cx - w / 2 + j * w / n, xb = cx - w / 2 + (j + 1) * w / n;
      line(s, xa, y0 + (j % 2 ? 0.05 : -0.03), xb, y0 + (j % 2 ? -0.03 : 0.05), CH[c][1], 1.25);
    }
  });
}
// mitosis stage k (0 interphase, 1 condense, 2 line up, 3 separate, 4 two nuclei + cytokinesis), centred on (cx, cy)
// 2n = 4: long pair R/B, short pair r/b. Lengths: long L, short S.
function mitosisStage(s, k, cx, cy, sc = 1) {
  const L = 0.3 * sc, S = 0.19 * sc, th = 0.06 * sc;
  const set = [['R', L], ['B', L], ['r', S], ['b', S]];
  if (k === 0) {
    cellOval(s, cx, cy, 1.9 * sc, 1.45 * sc);
    nucleusD(s, cx, cy, 0.46 * sc);
    threads(s, cx, cy, 0.62 * sc, ['R', 'B', 'r', 'b']);
  } else if (k === 1) {
    cellOval(s, cx, cy, 1.9 * sc, 1.45 * sc);
    nucleusD(s, cx, cy, 0.52 * sc, { dash: 'dash' });
    [[-0.2, -0.17, 30], [0.2, -0.14, -25], [-0.15, 0.22, 70], [0.22, 0.2, 10]].forEach(([dx, dy, rt], i) => chromosome(s, cx + dx * sc, cy + dy * sc, set[i][1], set[i][0], { rot: rt, th }));
  } else if (k === 2) {
    cellOval(s, cx, cy, 1.9 * sc, 1.5 * sc);
    const pl = cx - 0.82 * sc, pr = cx + 0.82 * sc;
    line(s, cx, cy - 0.62 * sc, cx, cy + 0.62 * sc, C.grey, 0.75, { dash: 'dash' });
    const ys = [-0.44, -0.16, 0.1, 0.33];
    ys.forEach((dy, i) => { fibre(s, pl, cy, cx - th * 0.55, cy + dy * sc); fibre(s, pr, cy, cx + th * 0.55, cy + dy * sc); });
    ys.forEach((dy, i) => chromosome(s, cx, cy + dy * sc, set[i][1] * 0.8, set[i][0], { th }));
    ball(s, pl, cy, 0.04 * sc, C.ink); ball(s, pr, cy, 0.04 * sc, C.ink);
  } else if (k === 3) {
    cellOval(s, cx, cy, 2.1 * sc, 1.38 * sc);
    const pl = cx - 0.92 * sc, pr = cx + 0.92 * sc;
    const ys = [-0.36, -0.12, 0.1, 0.3];
    ys.forEach((dy, i) => {
      [-1, 1].forEach(side => {
        const ccx = cx + side * 0.58 * sc, ccy = cy + dy * sc, arm = set[i][1] * 0.42;
        fibre(s, side < 0 ? pl : pr, cy, ccx, ccy);
        // two arms pointing back towards the equator (a V), angles from vertical
        (side < 0 ? [60, 120] : [-60, -120]).forEach(phi => {
          const a = phi * Math.PI / 180;
          rod(s, ccx + Math.sin(a) * arm / 2, ccy - Math.cos(a) * arm / 2, arm, th, phi, set[i][0]);
        });
        ball(s, ccx, ccy, th * 0.45, CH[set[i][0]][1]);
      });
    });
    ball(s, pl, cy, 0.04 * sc, C.ink); ball(s, pr, cy, 0.04 * sc, C.ink);
    arrow(s, cx - 0.12 * sc, cy - 0.5 * sc, cx - 0.45 * sc, cy - 0.5 * sc, C.red, 1.25);
    arrow(s, cx + 0.12 * sc, cy - 0.5 * sc, cx + 0.45 * sc, cy - 0.5 * sc, C.red, 1.25);
  } else {
    // two overlapping ovals: the left edge of the right oval shows the membrane pinching in (cytokinesis)
    cellOval(s, cx - 0.5 * sc, cy, 1.15 * sc, 1.3 * sc);
    cellOval(s, cx + 0.5 * sc, cy, 1.15 * sc, 1.3 * sc);
    [-0.5, 0.5].forEach(dx => {
      const nx = cx + dx * sc;
      nucleusD(s, nx, cy, 0.32 * sc);
      [[-0.12, -0.08, 20], [0.1, -0.1, -15], [-0.08, 0.13, 60], [0.12, 0.12, 0]].forEach(([ex, ey, rt], i) => rod(s, nx + ex * sc, cy + ey * sc, set[i][1] * 0.75, th, rt, set[i][0]));
    });
  }
}
// cell-cycle wheel: segs [[name, hours, colour]], compass angles clockwise from 12 o'clock
function cycleWheel(s, cx, cy, R, segs, total) {
  let a = 0; const mids = [];
  segs.forEach(([, h, col]) => {
    const b = a + 360 * h / total;
    s.addShape(SH.BLOCK_ARC, { x: cx - R, y: cy - R, w: 2 * R, h: 2 * R, angleRange: [(a + 270) % 360, (b + 270) % 360], arcThicknessRatio: 0.42, fill: { color: col }, line: { color: C.white, width: 2 } });
    mids.push((a + b) / 2); a = b;
  });
  assert(Math.abs(a - 360) < 1e-9, 'wheel closes');
  return mids.map(m => (rr) => [cx + rr * Math.sin(m * Math.PI / 180), cy - rr * Math.cos(m * Math.PI / 180)]);
}
// microscope, base centred on (cx, yb), scale k
function microscope(s, cx, yb, k = 1) {
  box(s, cx - 0.5 * k, yb - 0.12 * k, 1.0 * k, 0.12 * k, '5A6275', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.03 });
  box(s, cx + 0.22 * k, yb - 1.45 * k, 0.16 * k, 1.35 * k, '8C96A8', '5A6275', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  box(s, cx - 0.45 * k, yb - 0.72 * k, 0.75 * k, 0.07 * k, '5A6275', '4A5262');
  ball(s, cx - 0.12 * k, yb - 0.4 * k, 0.08 * k, 'F6E7B8', 'B79B4A');
  box(s, cx - 0.22 * k, yb - 1.65 * k, 0.2 * k, 0.75 * k, 'B8C0CD', '5A6275');
  box(s, cx - 0.18 * k, yb - 0.92 * k, 0.12 * k, 0.12 * k, '6B7385', '4A5262');
  box(s, cx - 0.2 * k, yb - 1.82 * k, 0.16 * k, 0.18 * k, '6B7385', '4A5262');
  ball(s, cx + 0.3 * k, yb - 1.0 * k, 0.09 * k, '4A5262', '4A5262');
  box(s, cx - 0.36 * k, yb - 0.78 * k, 0.44 * k, 0.05 * k, 'DDEFF7', '7FA9C4', { lw: 0.5 });
}
// specialised cells (small icons)
function rbc(s, cx, cy, r) { ball(s, cx, cy, r, 'D9534F', '8E2A33', 1); ball(s, cx, cy, r * 0.45, 'EE8A8F', 'EE8A8F'); }
function nerveCell(s, cx, cy, k = 1) {
  [[-0.32, -0.22], [-0.38, 0.05], [-0.28, 0.25], [-0.12, -0.3], [-0.1, 0.3]].forEach(([dx, dy]) => line(s, cx - 0.2 * k, cy, cx + dx * k - 0.2 * k, cy + dy * k, '6A4C93', 1.5));
  ball(s, cx - 0.2 * k, cy, 0.14 * k, 'D8C8EC', '6A4C93', 1.25);
  ball(s, cx - 0.2 * k, cy, 0.05 * k, C.nucleusEdge);
  line(s, cx - 0.06 * k, cy, cx + 0.75 * k, cy, '6A4C93', 2.5);
  [[0.82, -0.12], [0.85, 0], [0.82, 0.12]].forEach(([dx, dy]) => line(s, cx + 0.75 * k, cy, cx + dx * k, cy + dy * k, '6A4C93', 1.5));
}
function muscleCell(s, cx, cy, k = 1) {
  oval(s, cx, cy, 1.3 * k, 0.32 * k, 'F4B6B9', 'A33E48', { lw: 1.25 });
  for (let i = -4; i <= 4; i++) line(s, cx + i * 0.11 * k, cy - 0.11 * k, cx + i * 0.11 * k, cy + 0.11 * k, 'C76A72', 0.75);
  oval(s, cx - 0.25 * k, cy, 0.16 * k, 0.09 * k, C.nucleus, C.nucleusEdge);
  oval(s, cx + 0.3 * k, cy, 0.16 * k, 0.09 * k, C.nucleus, C.nucleusEdge);
}
function stemCell(s, cx, cy, r) { ball(s, cx, cy, r, 'FFF4D6', 'B8730A', 1.5); ball(s, cx, cy, r * 0.45, C.nucleus, C.nucleusEdge, 1); }
// gene strip: 6 genes; on = indices switched on
function geneStrip(s, x, y, on, w = 1.5) {
  const gw = w / 6;
  for (let i = 0; i < 6; i++) box(s, x + i * gw, y, gw - 0.03, 0.2, on.includes(i) ? C.green : 'D5D9E0', on.includes(i) ? '1E6B40' : 'A0A7B4', { lw: 0.5 });
}
// leaf shape at (cx, cy)
const leaf = (s, cx, cy, w, h, rot) => oval(s, cx, cy, w, h, C.chloro, C.chloroEdge, { rot, lw: 1 });

const GLOW = 'F5A742';

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Growth and development',
  footer: 'OCR J260 Combined Science B • B4.3 How do organisms grow and develop? • teacher deck • mark schemes and answers in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • PAG B1: observing mitosis in a root tip squash with a light microscope` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found • stretch marked' },
    { icon: '2n', text: 'Cell cycle • mitosis • cancer • differentiation • stem cells • meristems • ethics' },
  ],
  notes: 'B4.3 How do organisms grow and develop? is Part 3 of 3 in J260 Chapter B4 (B4.1, B4.2, B4.3) and is the last B4 deck in Combined Science. B4.4 How is plant growth controlled? (plant hormones) is in Biology B (J257) only, so this deck does not teach it.\nThe B4.3 statement wordings come from search extracts of a J257 mirror and revision sites (ocr.org.uk could not be fetched): see SPEC_B4_3.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B4.3.1', text: 'Describe how multicellular organisms **grow**: more cells (mitosis), bigger cells, and specialised cells.' },
  { code: 'B4.3.1', text: 'Describe the **cell cycle**: **interphase** (growth, DNA replication) then **mitosis** and cytokinesis.' },
  { code: 'B4.3.1', text: 'Describe the main **stages of mitosis**; explain why the two cells are **genetically identical** and diploid.' },
  { code: 'B4.3.1', text: 'Describe how to use a **light microscope** to observe stages of mitosis (**PAG B1**) and analyse counts.' },
  { code: 'B4.3.2', text: 'Explain how **cancer** results from changes in cells that lead to **uncontrolled** growth and division.' },
  { code: 'B4.3.3', text: '**Compare** mitosis with **meiosis** (recap of the halving of chromosome number to make gametes).' },
  { code: 'B4.3.5', text: 'Explain the importance of **cell differentiation**: genes switched on and off to make specialised cells.' },
  { code: 'B4.3.4', text: 'Describe the function of **stem cells** in embryos and adults, and **meristems** in plants.' },
  { code: 'IaS', text: 'Discuss the **uses** of stem cells and the **ethical** issues (ethics and decision making).' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'No B4.3 statement was found to be Higher tier only (bold) in J260 (UNVERIFIED). Oak National Academy runs the same OCR combined science cell-division and stem-cell lessons in its Foundation and Higher programmes ("basics" vs "beyond the basics"), which suggests no HT-only content. The time-in-each-stage calculation is marked as stretch.\nNumbering B4.3.1–B4.3.5 is from a search extract of a J257 mirror; J260 is expected to match (UNVERIFIED). B4.3.3 meiosis is taught only as a comparison here: the series covers meiosis with inheritance in B1.2. Check SPEC_B4_3.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B4 Using food and controlling growth • B4.3 is Part 3 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B4.3.1', 'Growth, chromosomes and the cell cycle', 'Both tiers', C.blue],
    ['B4.3.1', 'Stages of mitosis; genetically identical cells', 'Both tiers', C.blue],
    ['PAG B1', 'Practical: observing mitosis in a root tip squash', 'Practical', C.orange],
    ['B4.3.2, B4.3.3', 'Cancer; mitosis compared with meiosis', 'Both tiers', C.blue],
    ['B4.3.4, B4.3.5', 'Differentiation, stem cells and meristems', 'Both tiers', C.blue],
    ['IaS', 'Using stem cells: benefits, risks and ethics', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B4.3\nHow do organisms grow and develop?', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B1.1 genes and chromosomes • B1.2 meiosis and gametes • B4.1 ATP • B4.2 microscopes', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.05, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B4 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**B4.1 What happens during cellular respiration?**',
      '**B4.2 How do we know about mitochondria and other cell structures?** Microscopes and organelles.',
      '**B4.3 How do organisms grow and develop?** (this deck: the last B4 deck in Combined Science)',
      'B4.4 How is plant growth controlled? (plant hormones) is **Biology B J257 only**.',
      'Next: **Chapter B5 The human body – staying alive**.',
    ], { size: 11.5, color: 'E3F2F0' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.85, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.55, 5.53, 2.3, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Every slide is for both tiers: no B4.3 statement was found to be Higher only.',
      'You describe what happens in each stage of mitosis; the stage **names** are a stretch.',
      'One practical: **PAG B1**, a root tip squash. Maths: **percentages** from cell counts.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.65, w: 5.15, h: 2.1, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B4 has three sub-topics in Combined Science: B4.1, B4.2 and B4.3. B4.4 (plant hormones: auxins, gibberellins, ethene) is separate science only and is not taught here.\nOverlap control: cell structures and microscope use belong to B4.2 and are only recapped (starter, PAG B1). Meiosis is taught with inheritance in B1.2 of this series; here it appears only as a comparison with mitosis (B4.3.3).\nThe J257 mirror extract notes that learners are not expected to recall the names of the intermediate phases of mitosis, so the deck describes each stage and gives the names (prophase, metaphase, anaphase, telophase) as stretch.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B1.1 • genes and the genome', q: 'What is a **gene**? Where in an animal cell are the chromosomes found?' },
  { from: 'B1.2 • inheritance', q: 'A human body cell has **46** chromosomes. How many are in a human **sperm** cell? Name the type of cell division that makes it.' },
  { from: 'B4.1 • respiration', q: 'Name the molecule that supplies energy for processes such as **cell division**. Which organelle makes most of it?' },
  { from: 'B4.2 • microscopy', q: 'Name **two** parts of a light microscope you use to bring a specimen into focus.' },
  { from: 'B4.2 • microscopy', q: 'An image is **20 mm** across. The real cell is **0.05 mm** across. Calculate the magnification.' },
  { from: 'KS3 • cells', q: 'Name **two** structures found in a plant cell but **not** in an animal cell.' },
], { subtitle: 'Recall from B1.1, B1.2, B4.1, B4.2 and KS3 • 6 minutes • no notes', notes: `ANSWERS\n1. A section of DNA that codes for a protein / a characteristic. In the nucleus.\n2. 23 (half of 46: haploid). Meiosis.\n3. ATP. Mitochondria (aerobic respiration).\n4. Coarse focusing wheel and fine focusing wheel (also accept: stage, objective lens, eyepiece lens for "parts" if focus is not mentioned; the focusing wheels are the best answer).\n5. magnification = image size ÷ real size = 20 ÷ 0.05 = ${magStarter} (×${magStarter}).\n6. Any two: cell wall, chloroplasts, permanent (large) vacuole.` }), 'Retrieval starter');

// ======================= 5 GROWTH =======================
reg(D.contentSlide({
  title: 'How multicellular organisms grow',
  subtitle: `Specification ${sp('B4.3.1')} • growth needs more cells, bigger cells and specialised cells`,
  tag: 'B4.3.1', caption: 'a fertilised egg (zygote) divides by mitosis; cells drawn not to scale',
  draw: (s, p) => {
    label(s, 0.7, 1.42, 5.6, 'One cell becomes many: each cell divides into two', { size: 11, bold: true, color: C.blue, align: 'left' });
    const xs = [1.05, 2.35, 3.75, 5.3], cy = 2.55;
    // 1, 2, 4, 8 cells
    stemCell(s, xs[0], cy, 0.36);
    [[-0.2, 0], [0.2, 0]].forEach(([dx, dy]) => stemCell(s, xs[1] + dx, cy + dy, 0.2));
    [[-0.17, -0.17], [0.17, -0.17], [-0.17, 0.17], [0.17, 0.17]].forEach(([dx, dy]) => stemCell(s, xs[2] + dx, cy + dy, 0.165));
    [[-0.3, -0.15], [-0.1, -0.15], [0.1, -0.15], [0.3, -0.15], [-0.3, 0.15], [-0.1, 0.15], [0.1, 0.15], [0.3, 0.15]].forEach(([dx, dy]) => stemCell(s, xs[3] + dx, cy + dy, 0.105));
    for (let i = 0; i < 3; i++) arrow(s, xs[i] + 0.45, cy, xs[i + 1] - 0.45, cy, C.ink, 1.75);
    doub.forEach((n, i) => label(s, xs[i] - 0.6, 3.05, 1.2, `**${n}** cell${n > 1 ? 's' : ''}`, { size: 11 }));
    label(s, 0.7, 3.32, 5.6, 'mitosis → mitosis → mitosis …  after n divisions: 2ⁿ cells', { size: 10.5, italic: true, color: C.grey });
    // three processes
    const boxes = [
      ['1  Cell division', 'mitosis makes **more cells**', C.blue],
      ['2  Cell enlargement', 'each new cell **grows bigger** (in plants, mostly by taking in water)', C.green],
      ['3  Differentiation', 'cells become **specialised** for a job', C.orange],
    ];
    boxes.forEach(([h, t, col], i) => {
      const x = 0.75 + i * 1.88;
      box(s, x, 3.75, 1.75, 2.0, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
      label(s, x + 0.08, 3.8, 1.6, h, { size: 11, bold: true, color: col, h: 0.3 });
      label(s, x + 0.1, 4.88, 1.55, t, { size: 10.5, h: 0.82, valign: 'top' });
    });
    // icons
    stemCell(s, 1.4, 4.45, 0.13); stemCell(s, 1.7, 4.45, 0.13);
    stemCell(s, 3.1, 4.45, 0.11); arrow(s, 3.27, 4.45, 3.5, 4.45, C.green, 1.25); stemCell(s, 3.75, 4.45, 0.22);
    nerveCell(s, 5.2, 4.18, 0.42); rbc(s, 4.95, 4.6, 0.12); muscleCell(s, 5.6, 4.6, 0.3);
  },
  head: 'Growth in multicellular organisms',
  lines: [
    '**Growth** is a permanent increase in size or mass.',
    'Every multicellular organism starts as **one cell**, the **zygote** (fertilised egg).',
    'It grows by **cell division** (mitosis), **cell enlargement**, and **differentiation** into specialised cells.',
    'The **cell cycle** is the series of steps a cell goes through to divide into two.',
    'Mitosis also **replaces** worn-out cells and **repairs** damaged tissue.',
  ],
  size: 11,
  worked: { head: 'Worked example: doubling', q: 'A zygote divides by mitosis. Every new cell divides again. How many cells are there after 10 rounds of division?',
    steps: [['Pattern', '1 → 2 → 4 → 8: the number doubles each round'], ['Rule', 'cells = 2ⁿ, where n = number of rounds'], ['Substitute', 'cells = 2¹⁰'], ['Answer', '1024 cells']], size: 10.5 },
  qc: 'How many cells are there after **6** rounds of division? Name the **three** processes that make an organism grow.',
  notes: 'QUICK CHECK ANSWER: 2⁶ = 64 cells. Cell division (mitosis), cell enlargement (cells get bigger), differentiation (cells become specialised).\nB4.3.1 wording (J257 mirror extract): "describe the role of the cell cycle in growth, including interphase and mitosis". The doubling sequence is asserted in node. In real embryos cells do not all divide at the same rate: the 2ⁿ rule is a model.',
}), 'B4.3.1 Growth');

// ======================= 6 CHROMOSOMES =======================
reg(D.contentSlide({
  title: 'Chromosomes and DNA replication',
  subtitle: `Specification ${sp('B4.3.1')} • before a cell divides it copies every chromosome`,
  tag: 'B4.3.1', caption: 'a model cell with 2 pairs of chromosomes (human cells have 23 pairs)',
  draw: (s, p) => {
    // cell with 2 pairs
    label(s, 0.65, 1.42, 2.8, 'Body cell: chromosomes in **pairs**', { size: 11, color: C.blue, align: 'left' });
    cellOval(s, 2.0, 2.75, 2.5, 1.85);
    nucleusD(s, 2.0, 2.75, 0.68);
    [['R', 1.7, 2.45, 0.42, 20], ['B', 2.25, 2.5, 0.42, -15], ['r', 1.75, 3.05, 0.26, 70], ['b', 2.25, 3.05, 0.26, 40]].forEach(([c, x, y, l, rt]) => chromosome(s, x, y, l, c, { single: true, rot: rt, th: 0.08 }));
    label(s, 0.6, 3.75, 2.9, 'one of each pair from each parent: **diploid**', { size: 10.5, h: 0.45, valign: 'top' });
    // replication
    label(s, 3.75, 1.42, 2.6, 'DNA replication (interphase)', { size: 11, bold: true, color: C.blue, align: 'left' });
    chromosome(s, 4.25, 2.6, 0.95, 'R', { single: true, th: 0.13 });
    arrow(s, 4.6, 2.6, 5.15, 2.6, C.ink, 2);
    label(s, 4.45, 2.2, 0.9, 'copied', { size: 10.5, italic: true });
    chromosome(s, 5.7, 2.6, 0.95, 'R', { th: 0.13 });
    label(s, 3.75, 3.2, 1.05, 'one DNA molecule', { size: 10, h: 0.4, valign: 'top' });
    label(s, 5.15, 3.2, 1.35, 'two identical **chromatids**', { size: 10, h: 0.4, valign: 'top' });
    line(s, 5.85, 2.6, 6.2, 2.15, C.ink, 0.75);
    label(s, 5.6, 1.85, 0.95, 'centromere', { size: 10, align: 'right' });
    // DNA ladder
    const dy = 4.45, dx0 = 0.9;
    label(s, 0.65, 4.2, 5.6, 'A chromosome is one very long DNA molecule, coiled up. Genes are sections of it.', { size: 10.5, align: 'left' });
    for (let i = 0; i < 26; i++) {
      const x = dx0 + i * 0.19, a = Math.sin(i * 0.55), b = Math.sin(i * 0.55 + Math.PI);
      line(s, x, dy + 0.55 + 0.32 * a, x, dy + 0.55 + 0.32 * b, i % 2 ? C.blue : C.orangeTab, 1.25);
      if (i < 25) {
        line(s, x, dy + 0.55 + 0.32 * a, x + 0.19, dy + 0.55 + 0.32 * Math.sin((i + 1) * 0.55), C.ink, 1.75);
        line(s, x, dy + 0.55 + 0.32 * b, x + 0.19, dy + 0.55 + 0.32 * Math.sin((i + 1) * 0.55 + Math.PI), C.ink, 1.75);
      }
    }
    box(s, dx0 + 7 * 0.19 - 0.05, dy + 0.15, 6 * 0.19 + 0.1, 0.8, null, C.red, { lw: 1.5 });
    label(s, dx0 + 7 * 0.19 - 0.05, dy + 0.95, 1.3, 'a gene', { size: 10.5, bold: true, color: C.red });
  },
  head: 'Copying the chromosomes',
  lines: [
    '**Chromosomes** are made of **DNA** and carry the **genes**. They are in the nucleus.',
    'Body cells have chromosomes in **pairs**: they are **diploid** (humans: 23 pairs = **46**).',
    'In **interphase**, each chromosome is copied: **DNA replication**.',
    'A copied chromosome has two identical **chromatids**, joined at the centromere.',
    'In mitosis the chromatids are separated, so each new cell gets a full, identical set.',
  ],
  size: 11,
  worked: { head: 'Worked example: counting', q: 'A human body cell has 23 pairs of chromosomes. How many chromosomes, and how many chromatids after DNA replication?',
    steps: [['Chromosomes', '23 pairs × 2 = 46 chromosomes'], ['Replication', 'each chromosome now has 2 chromatids'], ['Chromatids', '46 × 2 = 92 chromatids'], ['Answer', '46 chromosomes; 92 chromatids (still 46 chromosomes)']], size: 10.5 },
  qc: 'A dog body cell has **78** chromosomes. How many **pairs** is that? How many chromosomes will each new cell have after mitosis?',
  notes: 'QUICK CHECK ANSWER: 78 ÷ 2 = 39 pairs. 78 chromosomes in each new cell (mitosis keeps the number the same).\nThe word chromatid is useful but may not be required at GCSE (J260 wording names "interphase and mitosis"). DNA replication itself (base pairing) is B1.1 territory: keep to "copied". Node: 23 × 2 = 46; 46 × 2 = 92; 78 ÷ 2 = 39.',
}), 'B4.3.1 Chromosomes, DNA replication');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B4.3.1')} • growth and chromosomes`, [
  { q: 'Name the **three** processes that make a multicellular organism grow.', marks: 3, ms: 'Cell division / mitosis (1); cell enlargement / cells grow bigger (1); differentiation / cells become specialised (1).' },
  { q: 'Human body cells are **diploid**. State what diploid means and give the number of chromosomes in a human body cell.', marks: 2, ms: 'Chromosomes are in pairs / two sets of chromosomes (1); 46 (1).' },
  { q: 'A cell divides by mitosis, then each new cell divides again, **5** times in all. How many cells are made?', marks: 1, ms: '2⁵ = 32 (1).' },
  { q: 'Describe what happens to each chromosome during **DNA replication**, and why it is needed.', marks: 2, ms: 'It is copied to make two identical chromatids / an identical copy (1); so each new cell gets a full set of chromosomes / the same genetic information (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 CELL CYCLE =======================
{
  const COL = { grow: '7FC8A9', dna: '5B9BD5', grow2: 'B5E0CF', mit: C.red };
  reg(D.contentSlide({
    title: 'The cell cycle',
    subtitle: `Specification ${sp('B4.3.1')} • interphase (growth and DNA replication), then mitosis and cytokinesis`,
    tag: 'B4.3.1', caption: 'wheel drawn to scale for a 24-hour human cell cycle (times vary between cells)',
    draw: (s, p) => {
      const cx = 2.3, cy = 3.7, Rw = 1.55;
      const pos = cycleWheel(s, cx, cy, Rw, CYC.map(([k, h]) => [k, h, COL[k]]), cycTotal);
      label(s, cx - 0.9, cy - 0.42, 1.8, 'one cycle', { size: 11, bold: true, color: C.ink });
      stemCell(s, cx - 0.22, cy + 0.08, 0.17); arrow(s, cx + 0.0, cy + 0.08, cx + 0.2, cy + 0.08, C.ink, 1.25);
      stemCell(s, cx + 0.38, cy - 0.04, 0.12); stemCell(s, cx + 0.38, cy + 0.22, 0.12);
      label(s, cx - 0.9, cy + 0.35, 1.8, `${cycTotal} hours`, { size: 11, bold: true, color: C.grey });
      // labels (positions from mid-angles)
      const [g1x, g1y] = pos[0](Rw * 0.79), [sx, sy] = pos[1](Rw * 0.79), [g2x, g2y] = pos[2](Rw * 0.79), [mx, my] = pos[3](Rw);
      label(s, g1x - 0.4, g1y - 0.14, 0.8, '10 h', { size: 10.5, bold: true, color: C.ink });
      label(s, sx - 0.4, sy - 0.14, 0.8, '8 h', { size: 10.5, bold: true, color: C.white });
      label(s, g2x - 0.4, g2y - 0.14, 0.8, '5 h', { size: 10.5, bold: true, color: C.ink });
      line(s, mx, my, mx + 0.5, 1.75, C.red, 1);
      label(s, mx + 0.5, 1.45, 2.6, '**mitosis + cytokinesis** (1 h): divide', { size: 10.5, color: C.red, align: 'left', h: 0.42 });
      // key on right
      const key = [
        [COL.grow, 'Interphase: cell **grows**, makes new organelles (e.g. mitochondria, ribosomes) and proteins'],
        [COL.dna, 'Interphase: **DNA replication**: every chromosome is copied'],
        [COL.grow2, 'Interphase: grows more; DNA checked for errors'],
        [COL.mit, '**Mitosis**: nucleus divides. **Cytokinesis**: cytoplasm and membrane divide'],
      ];
      key.forEach(([col, t], i) => {
        const y = 2.25 + i * 0.85;
        box(s, 4.12, y + 0.06, 0.24, 0.24, col, C.ink, { lw: 0.5 });
        label(s, 4.45, y, 2.0, t, { size: 10, align: 'left', valign: 'top', h: 0.8 });
      });
      // interphase bracket
      label(s, 0.6, 5.42, 3.6, `Interphase = ${interH} of ${cycTotal} hours (about ${sf(interH / cycTotal * 100, 2)}%)`, { size: 10.5, bold: true, color: C.blue });
    },
    head: 'Interphase and mitosis',
    lines: [
      'The **cell cycle** is how one cell becomes two. It repeats again and again in growing tissue.',
      '**Interphase** is the longest stage. The cell **grows**, copies its **organelles** and makes proteins, and copies its **DNA**.',
      '**Mitosis**: the copied chromosomes are separated and the nucleus divides into two.',
      '**Cytokinesis**: the cytoplasm and cell membrane divide, making **two new cells**.',
      'Cell division needs a lot of **ATP** from respiration (B4.1).',
    ],
    size: 11,
    worked: { head: 'Worked example: percentage of the cycle', q: `A cell cycle lasts ${cycTotal} hours. Mitosis and cytokinesis take 1 hour. What percentage of the cycle is this?`,
      steps: [['Fraction', `1 ÷ ${cycTotal}`], ['Percentage', `(1 ÷ ${cycTotal}) × 100`], ['Substitute', `= ${pctMit.toFixed(3)} %`], ['Answer', `about ${sf(pctMit, 2)}% of the cycle (2 s.f.)`]], size: 10.5 },
    qc: 'Explain why a cell must **copy its DNA** and **grow** before it divides.',
    notes: `QUICK CHECK ANSWER: DNA: so each of the two new cells gets a full, identical set of chromosomes / genes. Growth: so each new cell is big enough and has enough organelles (e.g. mitochondria, ribosomes) to work; otherwise the cells would get smaller each division.\nWheel to scale: 10 + 8 + 5 + 1 = ${cycTotal} h (node). The G1 / S / G2 names are A-level: GCSE needs "interphase: growth and DNA replication". J257 mirror extract: "describe the role of the cell cycle in growth, including interphase and mitosis".`,
  }), 'B4.3.1 The cell cycle');
}

// ======================= 9 STAGES OF MITOSIS =======================
{
  const s = D.contentHeader('The stages of mitosis', `Specification ${sp('B4.3.1')} • a cell with 2 pairs of chromosomes (2n = 4); each colour is one chromosome`, { tag: 'B4.3.1' });
  const st = [
    ['Before: interphase', 'DNA has been copied. Chromosomes are long, thin threads, not visible.', '(interphase)'],
    ['1  Chromosomes condense', 'They coil up: short and thick. Each is two chromatids. The nuclear membrane breaks down.', '(prophase)'],
    ['2  Chromosomes line up', 'They line up across the **middle** of the cell. Spindle fibres attach to each one.', '(metaphase)'],
    ['3  Chromatids separate', 'Fibres **pull** the two chromatids of each chromosome to opposite ends of the cell.', '(anaphase)'],
    ['4  Two nuclei form', 'A membrane forms round each set. Then the **cytoplasm divides** (cytokinesis).', '(telophase, cytokinesis)'],
  ];
  const pw = (12.43 - 4 * 0.12) / 5;
  st.forEach(([h, t, nm], i) => {
    const x = 0.45 + i * (pw + 0.12);
    box(s, x, 1.3, pw, 3.25, i === 0 ? 'F4F6F8' : C.panel, 'D2E3E1', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 });
    label(s, x + 0.08, 1.36, pw - 0.16, h, { size: 11.5, bold: true, color: i === 0 ? C.grey : C.ink, h: 0.3 });
    mitosisStage(s, i, x + pw / 2, 2.55, i === 3 ? 0.98 : 1);
    label(s, x + 0.1, 3.38, pw - 0.2, t, { size: 10.5, h: 0.85, valign: 'top' });
    label(s, x + 0.1, 4.22, pw - 0.2, nm, { size: 10, italic: true, color: C.grey, h: 0.24 });
    if (i < 4) arrow(s, x + pw - 0.02, 2.55, x + pw + 0.14, 2.55, C.ink, 1.5);
  });
  label(s, 0.45, 4.58, 12.43, 'Illustrative diagram — chromosome colours: red and blue long pair, light red and light blue short pair. Stage names in brackets are a stretch: you must describe what happens.', { size: 10, italic: true, color: C.grey, h: 0.24 });
  D.card(s, 0.45, 4.9, 6.1, 1.38, 'Key points', [
    'Mitosis makes **two nuclei** with the **same number** of chromosomes as the parent.',
    'Each new nucleus gets **one chromatid** from **every** chromosome, so both get identical copies.',
  ], { size: 11 });
  D.workedSteps(s, 6.7, 4.9, 6.18, 1.38, 'Worked example: order the stages', 'Put in order: separate • line up • condense • two nuclei.', [
    ['Order', 'condense → line up → separate → two nuclei'], ['Answer', 'then cytokinesis makes two cells']], { size: 10.5 });
  D.quickCheck(s, 'In which stage do the chromosomes line up in the **middle** of the cell? What pulls the chromatids apart in the next stage?');
  D.notes(s, 'QUICK CHECK ANSWER: Stage 2 (line up across the middle / equator; metaphase). Spindle fibres pull the chromatids apart to opposite ends (poles) of the cell (anaphase).\nDiagrams drawn to keep the colours of each chromosome, so students can see that each new nucleus gets one red long, one blue long, one light red short and one light blue short: the same set as the parent.\nThe J257 mirror extract says learners are not expected to recall the names of intermediate phases: the names are given in brackets as stretch. Plant cells form a new cell wall (cell plate) across the middle instead of pinching in.');
  reg(s, 'B4.3.1 Stages of mitosis');
}

// ======================= 10 MITOSIS OUTCOME AND USES =======================
reg(D.contentSlide({
  title: 'Mitosis makes genetically identical cells',
  subtitle: `Specification ${sp('B4.3.1')} • two diploid daughter cells, used for growth, repair and asexual reproduction`,
  tag: 'B4.3.1', caption: 'parent cell and daughter cells with 2n = 4; strawberry runner (right)',
  draw: (s, p) => {
    // parent -> two daughters
    const chs = (cx, cy, sc) => [['R', -0.17, -0.1, 0.38, 15], ['B', 0.15, -0.12, 0.38, -20], ['r', -0.12, 0.2, 0.24, 60], ['b', 0.17, 0.18, 0.24, 20]].forEach(([c, dx, dy, l, rt]) => rod(s, cx + dx * sc, cy + dy * sc, l * sc, 0.075 * sc, rt, c));
    cellOval(s, 1.3, 2.4, 1.3, 1.05); nucleusD(s, 1.3, 2.4, 0.38); chs(1.3, 2.4, 1);
    label(s, 0.6, 3.0, 1.4, 'parent cell\n4 chromosomes', { size: 10.5, h: 0.45, valign: 'top' });
    arrow(s, 2.05, 2.4, 2.75, 2.02, C.ink, 2); arrow(s, 2.05, 2.4, 2.75, 2.85, C.ink, 2);
    label(s, 2.3, 2.28, 0.7, 'mitosis', { size: 10.5, bold: true, color: C.red, align: 'left', h: 0.24 });
    [1.86, 3.08].forEach(y => { cellOval(s, 3.4, y, 1.05, 0.85); nucleusD(s, 3.4, y, 0.31); chs(3.4, y, 0.8); });
    label(s, 2.85, 3.58, 1.2, '2 cells, each with 4: **identical**', { size: 10.5, h: 0.45, valign: 'top' });
    // strawberry runner
    label(s, 4.3, 1.42, 2.1, 'Asexual reproduction', { size: 10.5, bold: true, color: C.blue });
    const plant = (x, y, k) => { [[-0.22, -30], [0, 0], [0.22, 30]].forEach(([dx, r]) => leaf(s, x + dx * k, y - 0.25 * k, 0.34 * k, 0.22 * k, r)); line(s, x, y - 0.15 * k, x, y, '3E7F2E', 1.5); };
    line(s, 4.3, 3.0, 6.35, 3.0, '9C7A52', 3);
    plant(4.65, 2.95, 1.2); plant(5.95, 2.95, 0.9);
    line(s, 4.65, 2.6, 5.95, 2.75, C.red, 1.5, { dash: 'dash' });
    [[4.6, 3.0, 4.5, 3.25], [4.7, 3.0, 4.8, 3.25], [5.95, 3.0, 5.9, 3.2]].forEach(([a, b, c, d]) => line(s, a, b, c, d, '6E5232', 1));
    label(s, 4.3, 3.3, 2.1, 'runner → new plant: a **clone**', { size: 10, h: 0.42, valign: 'top' });
    // uses row
    const uses = [['Growth', 'more cells: a child grows taller; a seedling grows'], ['Repair', 'new skin cells close a cut; a broken bone mends'], ['Replacement', 'worn-out cells replaced, e.g. skin, gut lining'], ['Asexual reproduction', 'runners, potato tubers; offspring are clones']];
    uses.forEach(([h, t], i) => {
      const x = 0.7 + (i % 2) * 2.85, y = 4.1 + Math.floor(i / 2) * 0.88;
      box(s, x, y, 2.7, 0.78, C.white, C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      label(s, x + 0.1, y + 0.04, 2.5, h, { size: 10.5, bold: true, color: C.green, align: 'left', h: 0.26 });
      label(s, x + 0.1, y + 0.3, 2.5, t, { size: 10, align: 'left', valign: 'top', h: 0.45 });
    });
  },
  head: 'Two identical diploid cells',
  lines: [
    'Mitosis makes **two** new cells from one.',
    'They are **genetically identical** to each other and to the parent cell: the chromosomes were copied exactly, and each cell gets one copy of each.',
    'Both cells are **diploid**: they have the **same number** of chromosomes as the parent (46 in humans).',
    'Mitosis is used for **growth**, **repair**, replacement and **asexual reproduction**.',
  ],
  size: 11,
  worked: { head: 'Worked example: mitosis twice', q: 'A human cell divides by mitosis, then both new cells divide by mitosis. How many cells, and how many chromosomes in each?',
    steps: [['Cells', '1 → 2 → 4 cells'], ['Chromosomes', 'mitosis keeps the number the same'], ['Genes', 'all four have identical genes'], ['Answer', '4 cells, each with 46 chromosomes']], size: 10.5 },
  qc: 'The new skin cells that heal a cut have exactly the same genes as your other body cells. Explain why.',
  notes: 'QUICK CHECK ANSWER: They are made by mitosis (1); the DNA / chromosomes are copied exactly before division and each new cell gets a full identical set, so the new cells are genetically identical to the parent cells (1).\nBacteria reproduce by binary fission, not mitosis (no nucleus): avoid using bacteria as an example of mitosis. Offspring of asexual reproduction are clones.',
}), 'B4.3.1 Identical cells; uses of mitosis');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B4.3.1')} • the cell cycle and mitosis`, [
  { q: 'Name the **longest** stage of the cell cycle. Describe **two** things that happen in it.', marks: 3, ms: 'Interphase (1); any two (1 each): cell grows; DNA / chromosomes copied (replicated); new organelles made, e.g. mitochondria / ribosomes; proteins made.' },
  { q: 'Put these stages of mitosis in order: **chromatids separate**; **two nuclei form**; **chromosomes condense**; **chromosomes line up**.', marks: 2, ms: 'Chromosomes condense → chromosomes line up → chromatids separate → two nuclei form. 2 marks all correct; 1 mark for one pair swapped.' },
  { q: 'Explain why the two cells made by mitosis are **genetically identical**.', marks: 2, ms: 'DNA / each chromosome is copied (exactly) before division (1); each new cell receives one copy (chromatid) of every chromosome (1).' },
  { q: 'Give **one** use of mitosis in a plant.', marks: 1, ms: 'Growth (e.g. at root or shoot tips) / repair of damaged tissue / asexual reproduction, e.g. runners, tubers, bulbs (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 PAG B1 METHOD =======================
reg(D.contentSlide({
  title: 'PAG B1: observing mitosis in a root tip',
  subtitle: `Specification ${sp('B4.3.1')} • make a root tip squash and look at it with a light microscope`,
  tag: 'PAG B1', pag: 'PAG B1', caption: 'apparatus for a root tip squash (garlic or onion)',
  draw: (s, p) => {
    const tiles = [[0.6, 1.42, '1  Grow roots; cut 5 mm tips'], [3.6, 1.42, '2  Warm tips in acid'], [0.6, 3.68, '3  Stain, then squash'], [3.6, 3.68, '4  Observe: ×100, then ×400']];
    tiles.forEach(([x, y, t]) => { box(s, x, y, 2.85, 2.12, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, x + 0.1, y + 0.04, 2.65, t, { size: 10.5, bold: true, color: C.blue, align: 'left', h: 0.28 }); });
    // tile 1: garlic on beaker; scalpel and tile
    D.liquidColumn(s, 0.85, 2.2, 1.0, 1.0, 0.72);
    oval(s, 1.35, 2.05, 0.55, 0.42, 'F4EBD9', 'B9A47A', { lw: 1.25 });
    [[1.2, 1.15], [1.3, 1.25], [1.4, 1.35], [1.5, 1.45]].forEach(([a, b]) => line(s, a, 2.25, b, 3.0, 'E8E2C8', 2.5));
    [[1.2, 1.15], [1.3, 1.25], [1.4, 1.35], [1.5, 1.45]].forEach(([a, b]) => line(s, b, 2.88, b, 3.0, C.red, 2.5));
    label(s, 0.7, 3.24, 1.3, 'tips divide fastest', { size: 10, color: C.red, h: 0.24 });
    box(s, 2.2, 2.9, 1.1, 0.3, C.white, '9AA3B0', { lw: 1 });
    line(s, 2.35, 2.7, 3.05, 2.45, '6B7385', 3);
    line(s, 2.35, 2.7, 2.5, 2.9, '9AA3B0', 1.5);
    line(s, 2.55, 3.02, 2.7, 3.02, C.red, 3);
    label(s, 2.1, 3.25, 1.3, 'scalpel, tile', { size: 10, h: 0.24 });
    // tile 2: water bath, boiling tube with HCl
    D.liquidColumn(s, 3.85, 2.4, 1.75, 1.0, 0.8);
    box(s, 4.35, 1.85, 0.32, 1.42, 'F7FAFC', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.15, lw: 1.25 });
    box(s, 4.38, 2.58, 0.26, 0.66, 'F3E9A8', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.12 });
    line(s, 4.5, 2.98, 4.5, 3.13, C.red, 2.5);
    box(s, 5.2, 1.8, 0.08, 1.45, C.white, '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.04, lw: 0.75 });
    ball(s, 5.24, 3.25, 0.06, C.red, '8E2A33'); box(s, 5.225, 2.55, 0.03, 0.7, C.red, null);
    label(s, 5.36, 1.95, 1.02, 'hydrochloric acid, 60 °C, 5 min', { size: 10, align: 'left', valign: 'top', h: 0.85 });
    // tile 3: slide, stain, coverslip, thumb
    box(s, 0.85, 4.95, 2.35, 0.22, 'E6F0F5', '7FA9C4', { lw: 1 });
    oval(s, 1.35, 4.92, 0.42, 0.12, '5470C4', '334F9E');
    line(s, 1.25, 4.9, 1.45, 4.9, C.red, 2.5);
    box(s, 2.0, 4.86, 0.75, 0.08, 'F7FBFD', '7FA9C4', { lw: 0.75 });
    box(s, 1.9, 4.71, 0.95, 0.15, C.white, 'B9B5A8', { lw: 0.75 });
    box(s, 2.1, 4.25, 0.55, 0.48, 'F2C9A5', 'B07A50', { shape: SH.ROUNDED_RECTANGLE, r: 0.2, lw: 1 });
    arrow(s, 2.9, 4.22, 2.9, 4.62, C.red, 1.75);
    label(s, 0.7, 5.25, 2.65, 'stain (e.g. toluidine blue) • coverslip • press through paper', { size: 10, h: 0.45, valign: 'top' });
    label(s, 0.65, 4.38, 1.2, 'root tip in stain', { size: 10, h: 0.42, valign: 'top', align: 'left' });
    // tile 4: microscope
    microscope(s, 4.55, 5.7, 0.85);
    label(s, 5.2, 4.1, 1.2, 'focus with low power first; then high power', { size: 10, align: 'left', valign: 'top', h: 0.85 });
  },
  head: 'Method',
  lines: [
    'Cut **5 mm** off the root tips (the **meristem**, where cells are dividing).',
    'Warm the tips in **hydrochloric acid** at 60 °C for about 5 min, then rinse in water. This softens them so the cells separate.',
    'Put one tip on a slide, add a drop of **stain** (it colours the chromosomes). Leave 2 min.',
    'Add a coverslip and **squash** gently, to spread the cells in **one layer**.',
    'View with the **low power** objective, then **high power**. Count the cells in each stage.',
  ],
  size: 10.5,
  worked: { head: 'Variables and safety', q: '',
    steps: [['Why the tip?', 'only the root tip meristem has many dividing cells'], ['Fair count', 'count every cell in a field of view; several fields'], ['Hazards', 'acid and stain irritant: eye protection, gloves'], ['Safety', 'scalpel: cut on a tile, away from fingers']], size: 10.5 },
  workedH: 2.0,
  qc: 'Why is the root tip squashed under the coverslip? Why would cells from 2 cm **above** the tip show very few cells in mitosis?',
  notes: 'QUICK CHECK ANSWER: Squashing spreads the cells out into a thin layer one cell thick, so light can pass through and single cells (and chromosomes) can be seen. Cells 2 cm above the tip have stopped dividing: they are enlarging and differentiating, so almost all are in interphase / not dividing.\nPAG link: the J257 mirror extract gives B4.3.1 b) "describe how to use a light microscope to observe stages of mitosis" with a PAG 1 reference; OCR biology PAG B1 is microscopy (UNVERIFIED for J260 numbering).\nTypical method (SAPS / Nuffield style): 1 M hydrochloric acid at 55–60 °C for 5 min; toluidine blue or acetic orcein stain; garlic gives longer roots than onion. The microscope skills themselves (focusing, magnification) are B4.2: recap only. Data on the next slide are illustrative.',
}), 'PAG B1 Root tip: method');

// ======================= 13 PAG B1 RESULTS =======================
{
  const s = D.contentHeader('PAG B1: results and analysis', `Specification ${sp('B4.3.1')} • counts from root tip squashes (sample class data)`, { pag: 'PAG B1', tag: 'PAG B1' });
  D.panel(s, 0.45, 1.3, 5.6, 4.95, 'field of view at ×400; stained chromosomes dark');
  // field of view: brick-like cells clipped to a circle
  const fx = 3.25, fy = 3.5, fr = 2.0;
  ball(s, fx, fy, fr + 0.06, '2C3440', '2C3440');
  ball(s, fx, fy, fr, 'F2F6FB', 'F2F6FB');
  const cw = 0.4, chh = 0.29, special = { '4,2': 'A', '6,5': 'B', '2,7': 'C', '7,9': 'D', '5,1': 'A', '3,4': 'A', '8,6': 'D' };
  const dark = '3B2F6B', marks = {};
  for (let r = 0; r < 14; r++) for (let c = 0; c < 10; c++) {
    const x = fx - fr + c * cw + (r % 2 ? cw / 2 : 0) - 0.1, y = fy - fr + r * chh;
    const corners = [[x, y], [x + cw, y], [x, y + chh], [x + cw, y + chh]];
    if (!corners.every(([a, b]) => Math.hypot(a - fx, b - fy) <= fr - 0.02)) continue;
    box(s, x, y, cw, chh, 'DCE8F6', '7F98C4', { lw: 0.75 });
    const k = special[`${r},${c}`], mx = x + cw / 2, my = y + chh / 2;
    if (!k) { oval(s, mx, my, 0.13, 0.11, '8C7BC0', '5A4A99'); continue; }
    if (k === 'A') { oval(s, mx, my, 0.18, 0.16, 'C9BEE6', '5A4A99', { dash: 'dash' }); [[-0.04, -0.03, 30], [0.04, -0.02, -40], [-0.02, 0.04, 80], [0.04, 0.04, 10]].forEach(([dx, dy, rt]) => s.addShape(SH.RECTANGLE, { x: mx + dx - 0.01, y: my + dy - 0.035, w: 0.02, h: 0.07, rotate: rt, fill: { color: dark }, line: { color: dark, width: 0.5 } })); }
    if (k === 'B') box(s, mx - 0.02, y + 0.05, 0.04, chh - 0.1, dark, dark);
    if (k === 'C') { box(s, x + 0.06, y + 0.05, 0.035, chh - 0.1, dark, dark); box(s, x + cw - 0.095, y + 0.05, 0.035, chh - 0.1, dark, dark); }
    if (k === 'D') { oval(s, x + 0.1, my, 0.1, 0.12, '8C7BC0', '5A4A99'); oval(s, x + cw - 0.1, my, 0.1, 0.12, '8C7BC0', '5A4A99'); line(s, mx, y + 0.03, mx, y + chh - 0.03, '5A4A99', 1, { dash: 'dash' }); }
    if (!marks[k]) marks[k] = [x + cw - 0.06, y - 0.12];
  }
  assert.deepStrictEqual(Object.keys(marks).sort(), ['A', 'B', 'C', 'D'], 'one labelled cell of each stage');
  Object.entries(marks).forEach(([k, [x, y]]) => {
    box(s, x, y, 0.22, 0.22, C.white, C.red, { shape: SH.OVAL, lw: 1 });
    label(s, x, y, 0.22, k, { size: 10, bold: true, color: C.red, h: 0.22 });
  });
  label(s, 0.6, 1.42, 1.25, 'Identify cells A–D', { size: 10.5, bold: true, color: C.red, align: 'left', h: 0.45, valign: 'top' });
  // table
  const rows = [[HDR('Stage'), HDR('Cells'), HDR('% of cells'), HDR('Time / min')],
    ...RT.map((r, i) => [tcell(r[0], i, { bold: true, align: 'left' }), tcell(String(r[2]), i), tcell(fmt(rtPct[i]), i), tcell(fmt(rtMin[i]), i, { color: C.red })]),
    [tcell('Total', 5, { bold: true, align: 'left' }), tcell(String(rtTotal), 5, { bold: true }), tcell('100', 5, { bold: true }), tcell(String(rtCycleMin), 5, { bold: true, color: C.red })]];
  s.addTable(rows, { x: 6.3, y: 1.3, w: 6.58, colW: [2.38, 1.2, 1.5, 1.5], rowH: 0.27, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 6.3, 3.24, 6.58, `three fields of view, 200 cells • !!red!! column is stretch: cycle = 20 h = ${rtCycleMin} min`, { size: 10, italic: true, color: C.grey, align: 'left', h: 0.22 });
  D.workedSteps(s, 6.3, 3.52, 6.58, 1.45, 'Worked example: percentage of cells', '', [
    ['Formula', '% = cells in stage ÷ total cells × 100'], ['Line up', `7 ÷ ${rtTotal} × 100 = ${fmt(rtPct[2])}%`],
    ['Answer', `stretch: time = ${fmt(rtPct[2])}% × ${rtCycleMin} min = ${fmt(rtMin[2])} min`]], { size: 10.5 });
  D.card(s, 6.3, 5.05, 6.58, 1.2, 'Sources of error and improvements', [
    'Cells counted twice or missed → tally as you go; count **several fields** and add up.',
    'Cells overlap or stage unclear → squash more gently; agree rules for each stage.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Identify the stage of each of cells **A–D**. Most cells are in **interphase** (84%). What does this tell you about the cell cycle?');
  D.notes(s, `QUICK CHECK ANSWER: A chromosomes condensing (nucleus breaking down; prophase); B chromosomes lined up across the middle (metaphase); C chromatids separated to opposite ends (anaphase); D two nuclei formed / new cell wall forming (telophase, cytokinesis). Most cells are in interphase because interphase is by far the longest part of the cell cycle: the percentage of cells in a stage is proportional to the time spent in it.\nNode: total ${rtTotal}; % = ${rtPct.map(fmt).join(', ')}; % dividing = ${rtDividing / rtTotal * 100}%; times (stretch, 20 h cycle) = ${rtMin.join(', ')} min, summing to ${rtCycleMin}. Interphase = ${rtMin[0] / 60} h.\nThe field of view is a drawing for identifying stages; the table counts are illustrative class data from three fields. An onion root tip cycle of about 20 h is a typical textbook value (UNVERIFIED for any one variety).`);
  reg(s, 'PAG B1 Root tip: results');
}

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B4.3.1')} • PAG B1 root tip squash`, [
  { q: 'Explain why a **stain** is added to the root tip before it is viewed.', marks: 1, ms: 'To make the chromosomes / nuclei visible / show up (they are colourless) (1).' },
  { q: 'A student counted **150** cells. **12** were in mitosis. Calculate the percentage of cells in mitosis.', marks: 2, ms: '12 ÷ 150 × 100 (1); = 8% (1).' },
  { q: '**Stretch:** the cell cycle takes **22 hours**. Use your answer to estimate how long mitosis takes.', marks: 2, ms: '8% of 22 h = 0.08 × 22 (1); = 1.76 h (≈ 106 min) (1). Allow error carried forward from the previous answer.', },
  { q: 'Give **one** source of error when counting cells, and **one** way to reduce it.', marks: 2, ms: 'e.g. cells counted twice / missed; stage hard to decide; only one field counted (1); tally as you count / count several fields of view and add / use clear rules for each stage / squash to one layer (1). Improvement must match the error.' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 CANCER =======================
reg(D.contentSlide({
  title: 'Cancer: when cell division goes wrong',
  subtitle: `Specification ${sp('B4.3.2')} • changes in cells lead to uncontrolled growth and division`,
  tag: 'B4.3.2', caption: 'a layer of cells (e.g. skin lining) with a growing tumour; not to scale',
  draw: (s, p) => {
    const y0 = 3.3, cwid = 0.32;
    // normal layer
    for (let i = 0; i < 17; i++) {
      const x = 0.7 + i * cwid, mut = i >= 9 && i <= 13;
      box(s, x, y0, cwid, 0.5, mut ? 'E3B8C9' : 'F7E8C8', mut ? '8E2A55' : 'B8934A', { lw: 0.75 });
      oval(s, x + cwid / 2, y0 + 0.25, 0.13, 0.13, mut ? '8E2A55' : C.nucleus, mut ? '5E1A38' : C.nucleusEdge);
    }
    box(s, 0.7, y0 + 0.5, 17 * cwid, 0.08, 'C9B98F', null);
    // tumour mound
    const mound = [];
    for (let r = 0; r < 4; r++) for (let c = 0; c < 5 - r; c++) mound.push([3.68 + (c + r * 0.5) * 0.3, y0 - 0.27 - r * 0.25]);
    mound.forEach(([x, y]) => { oval(s, x + 0.15, y + 0.12, 0.3, 0.25, 'E3B8C9', '8E2A55', { lw: 0.75 }); oval(s, x + 0.15, y + 0.12, 0.1, 0.1, '8E2A55', null); });
    label(s, 3.6, 1.7, 1.8, '**tumour**: a lump of cells dividing out of control', { size: 10.5, color: '8E2A55', h: 0.5, valign: 'top' });
    // mutation star
    label(s, 0.7, 2.25, 2.7, '1  A **change (mutation)** in the genes that control the cell cycle', { size: 10.5, align: 'left', h: 0.5, valign: 'top' });
    arrow(s, 2.95, 2.75, 3.5, 3.25, C.red, 1.5);
    label(s, 0.7, 2.75, 2.2, '2  The cell keeps dividing by **mitosis**', { size: 10.5, align: 'left', h: 0.45, valign: 'top' });
    // blood vessel below
    box(s, 0.7, 4.3, 5.45, 0.55, 'F6C9CC', 'C8414C', { shape: SH.ROUNDED_RECTANGLE, r: 0.25, lw: 1.25 });
    label(s, 0.8, 4.3, 1.6, 'blood vessel', { size: 10, color: C.red, align: 'left', h: 0.55 });
    oval(s, 4.4, 4.0, 0.22, 0.18, 'E3B8C9', '8E2A55'); arrow(s, 4.4, 3.9, 4.4, 4.25, '8E2A55', 1.25);
    oval(s, 5.4, 4.57, 0.22, 0.18, 'E3B8C9', '8E2A55'); arrow(s, 4.6, 4.57, 5.25, 4.57, '8E2A55', 1.25);
    label(s, 0.7, 4.95, 5.45, '3  **Malignant**: cells invade nearby tissue and spread in the blood → secondary tumours. **Benign**: stays in one place.', { size: 10.5, h: 0.6, valign: 'top', align: 'left' });
  },
  head: 'Uncontrolled cell division',
  lines: [
    'Normally, **genes** control when a cell divides and when it stops.',
    'If these genes are **changed (mutated)**, a cell can divide **uncontrollably** by mitosis.',
    'The extra cells form a lump called a **tumour**. **Cancer** is a malignant tumour that can spread.',
    'Changes are more likely with **UV light**, **tobacco smoke** and other **carcinogens**, and ionising radiation.',
  ],
  size: 11,
  worked: { head: 'Worked example: tumour growth', q: 'A tumour cell divides every 3 days, and so do all its daughter cells. How many cells are there after 30 days?',
    steps: [['Divisions', '30 ÷ 3 = 10 rounds of division'], ['Rule', 'cells = 2ⁿ'], ['Substitute', 'cells = 2¹⁰'], ['Answer', '1024 cells from one cell']], size: 10.5 },
  qc: 'Some cancer drugs stop cells dividing by mitosis. Suggest why patients taking them often lose their **hair**.',
  notes: 'QUICK CHECK ANSWER: Hair follicle cells divide rapidly by mitosis to make hair; the drug stops these normal dividing cells too, not just the cancer cells, so hair stops growing / falls out. (Also gut lining and bone marrow are affected.)\nB4.3.2 wording (J257 mirror extract): "explain how cancer is the result of changes in cells that lead to uncontrolled growth and division". Benign vs malignant is context. Node: 30 ÷ 3 = 10; 2¹⁰ = 1024. Lifestyle factors in detail belong to Chapter B2 (non-communicable disease): mention only.',
}), 'B4.3.2 Cancer');

// ======================= 16 MITOSIS VS MEIOSIS =======================
{
  const s = D.contentHeader('Mitosis compared with meiosis', `Specification ${sp('B4.3.3')} • recap of meiosis (B1.2): halving the chromosome number to make gametes`, { tag: 'B4.3.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'body cell 2n = 4: mitosis (top) and meiosis (bottom)');
  const sm = (cx, cy, list, k = 1) => { cellOval(s, cx, cy, 0.95 * k, 0.75 * k); nucleusD(s, cx, cy, 0.27 * k); list.forEach(([c, dx, dy, rt], i) => rod(s, cx + dx * k, cy + dy * k, (c === 'R' || c === 'B' ? 0.28 : 0.17) * k, 0.06 * k, rt, c)); };
  const full = [['R', -0.1, -0.07, 15], ['B', 0.1, -0.08, -20], ['r', -0.08, 0.12, 60], ['b', 0.11, 0.11, 20]];
  label(s, 0.65, 1.4, 2.0, '**Mitosis**', { size: 12, color: C.blue, align: 'left' });
  sm(1.25, 2.4, full);
  arrow(s, 1.8, 2.4, 2.5, 1.95, C.ink, 1.75); arrow(s, 1.8, 2.4, 2.5, 2.85, C.ink, 1.75);
  sm(3.05, 1.9, full, 0.9); sm(3.05, 2.9, full, 0.9);
  label(s, 3.7, 2.05, 2.75, '2 cells • 4 chromosomes each • **identical** to parent', { size: 10.5, align: 'left', h: 0.7, valign: 'top' });
  line(s, 0.7, 3.5, 6.3, 3.5, C.line, 1, { dash: 'dash' });
  label(s, 0.65, 3.6, 2.0, '**Meiosis**', { size: 12, color: C.red, align: 'left' });
  sm(1.25, 4.6, full);
  const g = [[['R', 0, -0.06, 15], ['r', 0, 0.1, 60]], [['B', 0, -0.06, -20], ['b', 0, 0.1, 20]], [['R', 0, -0.06, 15], ['b', 0, 0.1, 20]], [['B', 0, -0.06, -20], ['r', 0, 0.1, 60]]];
  arrow(s, 1.8, 4.6, 2.45, 4.6, C.ink, 1.75);
  g.forEach((lst, i) => { const gx = 2.95 + (i % 2) * 0.85, gy = 4.22 + Math.floor(i / 2) * 0.75; cellOval(s, gx, gy, 0.75, 0.62); nucleusD(s, gx, gy, 0.2); lst.forEach(([c, dx, dy, rt]) => rod(s, gx + dx, gy + dy, c === 'R' || c === 'B' ? 0.22 : 0.14, 0.05, rt, c)); });
  label(s, 4.35, 4.2, 2.0, '4 gametes • 2 chromosomes each (**haploid**) • genetically **different**', { size: 10.5, h: 0.95, valign: 'top', align: 'left' });
  const rows = [[HDR(''), HDR('Mitosis'), HDR('Meiosis')],
    ['Cells made', '2', '4 (gametes)'], ['Chromosome number', 'same as parent: diploid', 'halved: haploid'], ['Genetically', 'identical', 'different from each other'],
    ['Where', 'body cells all over', 'testes and ovaries; anthers and ovules'], ['Used for', 'growth, repair, asexual reproduction', 'making gametes for sexual reproduction']]
    .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.6, 2.24, 2.24], rowH: 0.42, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 4.15, 6.08, 2.1, 'Worked example: why halve the number?', 'Explain why gametes must be haploid.', [
    ['Gametes', 'human sperm 23 + egg 23 chromosomes'], ['Fertilisation', '23 + 23 = 46: diploid zygote'], ['If not halved', 'the number would double every generation'], ['Answer', 'meiosis halves it; mitosis keeps it the same']], { size: 10.5 });
  D.quickCheck(s, 'Give **two** differences between the cells made by mitosis and the cells made by meiosis.');
  D.notes(s, 'QUICK CHECK ANSWER: Any two: mitosis makes 2 cells, meiosis 4; mitosis cells are diploid / same number of chromosomes as the parent, meiosis cells haploid / half the number; mitosis cells genetically identical, meiosis cells genetically different; mitosis cells are body cells, meiosis cells are gametes.\nScope: the J257 mirror extract lists B4.3.3 "describe the process of meiotic division, including interphase and the two meiotic divisions, halving the chromosome number to produce gametes" (separate-science vs combined status UNVERIFIED). This series teaches meiosis with inheritance in B1.2, so this slide is a comparison / recap only; teachers whose B1.2 did not cover it should add the two divisions here. A May 2025 J260/05 paper asked students to classify statements as mitosis or meiosis.\nThe four gametes show the four possible combinations of one long and one short chromosome (independent assortment); crossing over is not shown.');
  reg(s, 'B4.3.3 Mitosis vs meiosis');
}

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B4.3.2')}, ${sp('B4.3.3')} • cancer; mitosis and meiosis`, [
  { q: 'What is a **tumour**?', marks: 1, ms: 'A mass / lump of cells formed by uncontrolled cell division (1).' },
  { q: 'Explain how a change in a cell can lead to **cancer**.', marks: 2, ms: 'A change / mutation in the genes / DNA that control cell division (1); the cell divides uncontrollably by mitosis, forming a tumour (1).' },
  { q: 'Describe **one** difference between a **benign** and a **malignant** tumour.', marks: 2, ms: 'Benign stays in one place / does not spread / does not invade other tissues (1); malignant invades tissues / spreads in the blood (or lymph) to form secondary tumours (1).' },
  { q: 'A human body cell has 46 chromosomes. How many chromosomes are in each cell made by (a) **mitosis** (b) **meiosis**?', marks: 2, ms: '(a) 46 (1); (b) 23 (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 18 DIFFERENTIATION =======================
reg(D.contentSlide({
  title: 'Differentiation: making specialised cells',
  subtitle: `Specification ${sp('B4.3.5')} • genes are switched on and off, so cells become specialised`,
  tag: 'B4.3.5', caption: 'six genes shown as boxes: green = switched on, grey = switched off',
  draw: (s, p) => {
    stemCell(s, 1.45, 3.4, 0.5);
    label(s, 0.6, 2.4, 1.7, 'unspecialised cell', { size: 10.5, bold: true, color: C.orange });
    geneStrip(s, 0.7, 4.05, [0, 1, 2, 3, 4, 5], 1.5);
    label(s, 0.6, 4.3, 1.7, 'all genes **can** be used', { size: 10, h: 0.42, valign: 'top' });
    const outs = [
      [2.35, 'Red blood cell', [0, 3], 'haemoglobin genes ON: carries oxygen; loses its nucleus'],
      [3.7, 'Nerve cell', [1, 4], 'long axon: carries electrical impulses'],
      [5.05, 'Muscle cell', [2, 5], 'contracting proteins ON: can contract'],
    ];
    outs.forEach(([y, nm, on, t], i) => {
      arrow(s, 2.05, 3.4 + (i - 1) * 0.25, 3.05, y - 0.05, C.ink, 1.5);
      if (i === 0) { rbc(s, 3.55, y - 0.05, 0.27); rbc(s, 3.95, y + 0.05, 0.2); }
      if (i === 1) nerveCell(s, 3.55, y - 0.05, 0.65);
      if (i === 2) muscleCell(s, 3.75, y - 0.05, 0.75);
      label(s, 4.4, y - 0.62, 1.95, nm, { size: 11, bold: true, align: 'left', h: 0.26 });
      geneStrip(s, 4.4, y - 0.33, on, 1.5);
      label(s, 4.4, y - 0.08, 1.95, t, { size: 10, align: 'left', valign: 'top', h: 0.6 });
    });
    label(s, 2.15, 2.9, 0.9, '**differentiation**', { size: 10.5, color: C.red, rotate: 0 });
  },
  head: 'Why cells differentiate',
  lines: [
    '**Differentiation** is the process where a cell becomes **specialised** for a particular job.',
    'Every body cell has the **same genes**. Different cells switch different genes **on** and **off**.',
    'The genes that are on decide which **proteins** the cell makes, and so its shape and job.',
    'Specialised cells work together in **tissues** (e.g. muscle tissue), which form organs.',
    'Most animal cells differentiate **early** in development and lose the ability to become other cell types.',
  ],
  size: 11,
  worked: { head: 'Worked example: explain', q: 'A nerve cell and a muscle cell from the same person have the same genes but look different. Explain why.',
    steps: [['Same genes', 'both came from the zygote by mitosis'], ['Switching', 'different genes are switched on in each cell'], ['Proteins', 'so each cell makes different proteins'], ['Answer', 'different proteins give a different structure and job']], size: 10.5 },
  qc: 'Why is differentiation important for a **multicellular** organism? Use the word **tissue** in your answer.',
  notes: 'QUICK CHECK ANSWER: It produces specialised cells, each adapted to do one job well (division of labour); similar specialised cells form tissues, which make up organs and organ systems, so a large multicellular organism can carry out all its life processes efficiently.\nB4.3.5 wording (search extract of a revision-site copy of the spec): "explain the importance of cell differentiation, in which cells become specialised by switching genes off and on to form tissues with particular functions" (code UNVERIFIED). Gene control is described in words only: no detail of transcription factors.',
}), 'B4.3.5 Differentiation');

// ======================= 19 STEM CELLS IN ANIMALS =======================
reg(D.contentSlide({
  title: 'Stem cells in embryos and adults',
  subtitle: `Specification ${sp('B4.3.4')} • stem cells are unspecialised cells that can divide and differentiate`,
  tag: 'B4.3.4', caption: 'early embryo (top); bone marrow in a long bone (bottom)',
  draw: (s, p) => {
    label(s, 0.65, 1.42, 5.7, 'Embryonic stem cells', { size: 11, bold: true, color: C.blue, align: 'left' });
    stemCell(s, 1.05, 2.25, 0.3);
    arrow(s, 1.42, 2.25, 1.85, 2.25, C.ink, 1.5);
    [[-0.13, -0.13], [0.13, -0.13], [-0.13, 0.13], [0.13, 0.13]].forEach(([dx, dy]) => stemCell(s, 2.2 + dx, 2.25 + dy, 0.13));
    arrow(s, 2.55, 2.25, 3.0, 2.25, C.ink, 1.5);
    ball(s, 3.55, 2.25, 0.45, 'FFF8E7', 'B8730A', 1.25);
    for (let i = 0; i < 14; i++) { const a = i / 14 * 2 * Math.PI; ball(s, 3.55 + 0.38 * Math.cos(a), 2.25 + 0.38 * Math.sin(a), 0.07, 'FFF4D6', 'B8730A', 0.75); }
    [[3.38, 2.0], [3.52, 1.98], [3.45, 2.12], [3.6, 2.1], [3.32, 2.15]].forEach(([x, y]) => stemCell(s, x, y + 0.03, 0.075));
    line(s, 3.45, 2.12, 4.15, 1.72, C.red, 1);
    label(s, 4.15, 1.6, 2.2, 'inner cells: **embryonic stem cells**', { size: 10, color: C.red, align: 'left', h: 0.42, valign: 'top' });
    label(s, 0.65, 2.75, 3.5, 'zygote → ball of cells (about 5 days)', { size: 10, italic: true, color: C.grey, align: 'left' });
    box(s, 0.7, 3.05, 5.6, 0.48, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 3.05, 5.4, 'can become **any** type of body cell • make all the tissues of the growing embryo', { size: 10.5, h: 0.48 });
    // bone and marrow
    label(s, 0.65, 3.7, 5.7, 'Adult stem cells, e.g. in bone marrow', { size: 11, bold: true, color: C.blue, align: 'left' });
    box(s, 0.8, 4.2, 2.5, 0.55, 'F2EBDD', 'A08F6A', { shape: SH.ROUNDED_RECTANGLE, r: 0.25, lw: 1.5 });
    oval(s, 0.85, 4.47, 0.5, 0.75, 'F2EBDD', 'A08F6A', { lw: 1.5 }); oval(s, 3.25, 4.47, 0.5, 0.75, 'F2EBDD', 'A08F6A', { lw: 1.5 });
    box(s, 1.05, 4.33, 2.0, 0.28, 'E8A3A3', 'C8414C', { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 0.75 });
    label(s, 1.05, 4.33, 2.0, 'marrow', { size: 10, bold: true, color: '7A1F28', h: 0.28 });
    stemCell(s, 3.95, 4.47, 0.2);
    arrow(s, 4.18, 4.4, 4.6, 4.15, C.ink, 1.25); arrow(s, 4.18, 4.47, 4.6, 4.47, C.ink, 1.25); arrow(s, 4.18, 4.55, 4.6, 4.8, C.ink, 1.25);
    rbc(s, 4.75, 4.12, 0.11); label(s, 4.92, 4.0, 1.4, 'red blood cells', { size: 10, align: 'left', h: 0.24 });
    ball(s, 4.75, 4.47, 0.11, 'E7E3F5', '6A4C93', 1); ball(s, 4.75, 4.47, 0.06, '8C7BC0'); label(s, 4.92, 4.35, 1.4, 'white blood cells', { size: 10, align: 'left', h: 0.24 });
    ball(s, 4.75, 4.82, 0.05, 'C9A0D0', '8A5A99'); label(s, 4.92, 4.7, 1.4, 'platelets', { size: 10, align: 'left', h: 0.24 });
    box(s, 0.7, 5.1, 5.6, 0.48, C.white, C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 5.1, 5.4, 'only a **few** cell types • replace and repair cells all through life', { size: 10.5, h: 0.48 });
  },
  head: 'Two kinds of animal stem cell',
  lines: [
    'A **stem cell** is an **unspecialised** cell that can divide by mitosis to make more stem cells, and can **differentiate** into specialised cells.',
    '**Embryonic** stem cells can become **any** type of cell. Their function is to build the whole body.',
    '**Adult** stem cells (e.g. in bone marrow, skin) can only become a **few** types of cell. Their function is to **replace** and **repair** cells.',
  ],
  size: 11,
  worked: { head: 'Worked example: compare', q: 'Give two differences between embryonic and adult stem cells.',
    steps: [['Where', 'early embryo vs adult tissues, e.g. bone marrow'], ['Range', 'any cell type vs only a few types'], ['Function', 'build the body vs replace and repair cells'], ['Answer', 'any two of these, each comparing both kinds']], size: 10.5 },
  qc: 'A bone marrow stem cell can become a red blood cell but **not** a nerve cell. What does this tell you about adult stem cells?',
  notes: 'QUICK CHECK ANSWER: Adult stem cells can only differentiate into a limited range of cell types (usually those of the tissue they are in): they are less versatile than embryonic stem cells.\nB4.3.4 wording (J257 mirror extract): "describe the function of stem cells in embryonic and adult animals and meristems in plants". The terms pluripotent / multipotent are not required at GCSE (stretch only). The early-embryo ball is the blastocyst (about 5 days); the term is not required.',
}), 'B4.3.4 Stem cells in animals');

// ======================= 20 MERISTEMS; PLANT VS ANIMAL GROWTH =======================
{
  const s = D.contentHeader('Meristems: plant stem cells', `Specification ${sp('B4.3.4')} • plants grow all their lives at meristems; animals mostly stop growing`, { tag: 'B4.3.4' });
  D.panel(s, 0.45, 1.3, 4.7, 4.95, 'a young plant: meristems shown in orange');
  // plant
  const sx = 2.55;
  box(s, 0.6, 4.05, 4.4, 1.75, 'C9AE88', null);
  line(s, 0.6, 4.05, 5.0, 4.05, '8B6B3E', 1.5);
  line(s, sx, 1.75, sx, 4.05, '3E7F2E', 4);
  [[3.2, -25, 0], [1.9, 25, 1], [2.9, -25, 0], [2.5, 20, 1]].forEach(([y, r, side], i) => leaf(s, side ? sx - 0.42 : sx + 0.42, y, 0.75, 0.32, r));
  // shoot tip meristem
  oval(s, sx, 1.72, 0.32, 0.36, GLOW, 'B8730A', { lw: 1.5 });
  oval(s, sx - 0.15, 3.45, 0.16, 0.16, GLOW, 'B8730A', { lw: 1 });
  // roots
  const roots = [[sx, 4.05, sx, 5.55], [sx, 4.3, 1.5, 5.25], [sx, 4.3, 3.6, 5.3], [sx, 4.7, 1.95, 5.6]];
  roots.forEach(([a, b, c, d]) => line(s, a, b, c, d, 'F2E6C8', 2.5));
  roots.forEach(([, , c, d]) => oval(s, c, d, 0.2, 0.2, GLOW, 'B8730A', { lw: 1 }));
  label(s, sx + 0.25, 1.45, 2.2, '**shoot tip** meristem', { size: 10.5, align: 'left' });
  label(s, sx - 1.5, 3.31, 1.25, 'side bud', { size: 10, align: 'right' });
  label(s, 3.15, 5.35, 1.9, '**root tip** meristems', { size: 10.5, align: 'left' });
  // table on right
  const rows = [[HDR(''), HDR('Plants'), HDR('Animals')],
    ['Where cells divide', 'only at **meristems** (shoot and root tips)', 'all over the body'],
    ['When they grow', 'all through life', 'mostly while young; growth then stops'],
    ['Stem cells', 'meristem cells can become **any** plant cell, all through life', 'adult stem cells: only a few types'],
    ['How cells get bigger', 'mostly by taking in water (vacuole)', 'by making more cytoplasm'],
    ['Regrowing parts', 'can regrow lost parts; cuttings make whole plants', 'only small repairs (e.g. skin)']]
    .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: T.rich(t, {}).map(x => x.text).join(''), options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
  s.addTable(rows, { x: 5.4, y: 1.3, w: 7.48, colW: [1.7, 2.89, 2.89], rowH: 0.48, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 5.4, 4.55, 7.48, 1.7, 'Worked example: explain', 'Explain why a gardener can grow a whole new plant from a cutting.', [
    ['Meristem', 'the cutting contains meristem cells'], ['Stem cells', 'they are unspecialised and can become any plant cell'], ['Answer', 'they divide and differentiate to make new roots, stem and leaves']], { size: 10.5 });
  D.quickCheck(s, 'Where are the meristems in a plant? Why does a tree get **taller** only at the tips of its branches?');
  D.notes(s, 'QUICK CHECK ANSWER: At the tips of shoots and roots (also side buds). Cell division (mitosis) only happens in the meristems, which are at the tips, so new cells are added at the tips; the cells further back only enlarge and differentiate.\nB4.3.4 wording (J257 mirror extract) includes "meristems in plants". The comparison of plant and animal growth is context for B4.3.4/B4.3.5. Lateral (side) meristems that make stems thicker are not required. Hormonal control of plant growth (auxins etc.) is B4.4, separate science only: not taught here.');
  reg(s, 'B4.3.4 Meristems; plants vs animals');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('B4.3.4')}, ${sp('B4.3.5')} • differentiation, stem cells, meristems`, [
  { q: 'What is meant by **differentiation**? Explain how it happens.', marks: 2, ms: 'A cell becomes specialised (for a particular function) (1); some genes are switched on and others off (so the cell makes different proteins) (1).' },
  { q: 'Give **two** differences between **embryonic** and **adult** stem cells.', marks: 2, ms: 'Any two (1 each): embryonic from early embryo, adult from adult tissues e.g. bone marrow; embryonic can become any cell type, adult only a few / limited types; embryonic build the body, adult replace / repair cells.' },
  { q: 'Name the tissue in plants that contains stem cells and give **one** place where it is found.', marks: 2, ms: 'Meristem (1); shoot tip / root tip / buds (1).' },
  { q: 'A plant can regrow a whole new plant from a small cutting, but a human cannot regrow a lost arm. Explain why.', marks: 2, ms: 'Plant meristem cells can differentiate into any type of plant cell throughout life (1); most human cells have differentiated / adult stem cells can only make a few cell types (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 22 USES OF STEM CELLS =======================
reg(D.contentSlide({
  title: 'Using stem cells in medicine and plants',
  subtitle: 'Ideas about Science: benefits and risks • links to B4.3.4',
  tag: 'IaS', caption: 'uses now (green) and uses being researched (blue)',
  draw: (s, p) => {
    const tiles = [
      [0.65, 1.45, 'NOW', C.green, 'Bone marrow transplants', 'donor stem cells make healthy blood cells, e.g. to treat **leukaemia**'],
      [3.55, 1.45, 'NOW', C.green, 'Cloning plants', 'meristem tissue grown on a sterile medium: many identical plants, e.g. **rare species**, crops'],
      [0.65, 3.75, 'RESEARCH', C.blue, 'Type 1 diabetes', 'grow new **insulin-making** cells to replace those destroyed'],
      [3.55, 3.75, 'RESEARCH', C.blue, 'Nerve damage', 'make new **nerve cells** for spinal injury or Parkinson\'s disease'],
    ];
    tiles.forEach(([x, y, tag, col, h, t]) => {
      box(s, x, y, 2.75, 2.15, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 });
      D.pill(s, x + 0.1, y + 0.1, tag, col, tag === 'NOW' ? 0.6 : 1.0);
      label(s, x + 0.1, y + 0.45, 2.55, h, { size: 11, bold: true, align: 'left', h: 0.28 });
      label(s, x + 0.1, y + 1.45, 2.55, t, { size: 10, align: 'left', valign: 'top', h: 0.68 });
    });
    // icons in tiles
    stemCell(s, 1.0, 2.5, 0.17); arrow(s, 1.2, 2.5, 1.55, 2.5, C.ink, 1.25); rbc(s, 1.75, 2.42, 0.12); rbc(s, 2.05, 2.58, 0.12); ball(s, 2.35, 2.45, 0.11, 'E7E3F5', '6A4C93', 1);
    // petri dish with plantlets
    oval(s, 4.9, 2.6, 1.7, 0.5, 'F3EDC8', '9AA3B0', { lw: 1.25 });
    [4.45, 4.9, 5.35].forEach(x => { line(s, x, 2.6, x, 2.3, '3E7F2E', 1.5); leaf(s, x - 0.08, 2.3, 0.18, 0.09, -30); leaf(s, x + 0.08, 2.28, 0.18, 0.09, 30); });
    // pancreas-like cells
    [[1.1, 4.75], [1.4, 4.75], [1.25, 5.0], [1.55, 5.0]].forEach(([x, y]) => ball(s, x, y, 0.13, 'CFE8D5', '2E8B57', 1));
    label(s, 1.8, 4.72, 1.4, 'insulin', { size: 10, color: C.green, align: 'left', h: 0.24 });
    nerveCell(s, 4.4, 4.85, 0.85);
  },
  head: 'Benefits and risks',
  lines: [
    '**Benefits**: replace damaged or diseased cells; could treat conditions with no cure now; clone useful or rare plants quickly and cheaply.',
    '**Risks**: cells grown in the lab could carry **viruses** (infection); donor cells may be **rejected** by the immune system.',
    'Stem cells divide a lot: they could divide **uncontrollably** and form **tumours** (link to cancer).',
    'Using a patient\'s **own** stem cells avoids rejection.',
  ],
  size: 11,
  worked: { head: 'Worked example: explain', q: 'Explain how a bone marrow transplant can treat leukaemia (a cancer of white blood cells).',
    steps: [['Remove', 'the patient\'s faulty bone marrow is destroyed'], ['Transplant', 'healthy donor marrow contains adult stem cells'], ['Differentiate', 'they divide and become healthy blood cells'], ['Answer', 'the patient can make normal blood cells again']], size: 10.5 },
  qc: 'Patients given donated stem cells often take drugs that suppress the **immune system**. Suggest why.',
  notes: 'QUICK CHECK ANSWER: The donor cells are recognised as foreign (different antigens) and may be attacked / rejected by the patient\'s immune system; the drugs reduce rejection (but increase the risk of infection).\nUses of stem cells are taught as Ideas about Science context (benefits and risks, ethics) for B4.3.4; no separate J260 statement code was found for them (UNVERIFIED). Plant tissue culture is described without plant hormones (B4.4 is J257 only). Therapeutic cloning is not required.',
}), 'IaS Uses of stem cells');

// ======================= 23 ETHICS =======================
{
  const s = D.contentHeader('Embryonic stem cells: ethics and decisions', 'Ideas about Science: ethics and decision making • who should decide, and how?', { tag: 'IaS' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'weighing the arguments: the beam is level because people disagree');
  // balance
  const cx = 3.5;
  poly(s, [[cx - 0.35, 2.7], [cx + 0.35, 2.7], [cx, 2.05]], C.ink, C.ink);
  line(s, 1.25, 2.05, 5.75, 2.05, C.ink, 3);
  [[1.9, C.green, 'FOR'], [5.1, C.red, 'AGAINST']].forEach(([x, col, t]) => {
    line(s, x - 0.55, 2.42, x, 2.05, '6B7385', 1); line(s, x + 0.55, 2.42, x, 2.05, '6B7385', 1);
    poly(s, [[x - 0.7, 2.42], [x + 0.7, 2.42], [x + 0.5, 2.6], [x - 0.5, 2.6]], col, col);
    label(s, x - 0.7, 1.68, 1.4, t, { size: 12, bold: true, color: col });
  });
  D.card(s, 0.6, 2.8, 2.85, 3.05, null, [
    'could treat diseases with no cure, e.g. diabetes, paralysis',
    'embryonic cells can become **any** cell type',
    'embryos used are spare ones from IVF that would be destroyed anyway',
    'better outcomes for the most people',
  ], { size: 10.5, fill: 'EAF6EF', border: C.green });
  D.card(s, 3.55, 2.8, 2.85, 3.05, null, [
    'the embryo is **destroyed**: some believe it is a potential human life with rights',
    'some say it is wrong whatever the benefits',
    'risks: tumours, infection, rejection',
    'adult or own stem cells may be enough',
  ], { size: 10.5, fill: 'FBECEC', border: C.red });
  D.card(s, 6.8, 1.3, 6.08, 2.7, 'Ideas about Science', [
    'Science can answer "**can** stem cells treat diabetes?" It **cannot** answer "**should** embryos be used?": that is an ethical question.',
    'Ethical issue: is it right to destroy an embryo to help others?',
    'Two views: **the right decision gives the best outcome for the most people**, OR **some actions are wrong whatever the outcome**.',
    'In the UK, the law (**HFEA**) licenses embryo research; embryos must not be kept beyond **14 days**.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.12, 6.08, 2.13, 'How to answer "evaluate"', '', [
    ['Issue', 'say what the ethical issue is'], ['Benefits', 'give the arguments for, with reasons'], ['Objections', 'give the arguments against, with reasons'], ['Answer', 'give a judgement, and say why']], { size: 10.5 });
  D.quickCheck(s, 'Which question can science answer? (a) **Should** embryos be used for research? (b) **Can** stem cells make insulin-producing cells? Explain.');
  D.notes(s, 'QUICK CHECK ANSWER: (b): it can be tested by experiments and data. (a) is an ethical question about values / what is right: science can give evidence but cannot decide it; people with different beliefs reach different answers.\nIdeas about Science: the J260 IaS section on ethical issues asks students to distinguish questions science can answer from those it cannot, to state an ethical issue clearly and summarise different views, and to recognise the "best outcome for the majority" argument and the "some actions are wrong regardless" argument (wording from memory: UNVERIFIED).\nUK facts: Human Fertilisation and Embryology Act; HFEA licences; research embryos must not be kept beyond 14 days (or after the primitive streak appears). Induced pluripotent stem cells (adult cells reprogrammed) are a stretch alternative that avoids destroying embryos.');
  reg(s, 'IaS Ethics of stem cells');
}

// ======================= 24 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Ideas about Science • uses, risks and ethics of stem cells', [
  { q: 'Give **one** use of stem cells in medicine **now** and **one** use being researched.', marks: 2, ms: 'Now: bone marrow transplant / treating leukaemia (1); research: e.g. type 1 diabetes, spinal / nerve injury, Parkinson\'s, heart damage, growing tissues or organs (1).' },
  { q: 'Describe **one** risk of a stem cell treatment and explain why it happens.', marks: 2, ms: 'e.g. tumour / cancer (1) because stem cells divide rapidly / may divide uncontrollably (1); OR infection (1) from viruses in cells grown in the lab (1); OR rejection (1) because donor cells are seen as foreign by the immune system (1).' },
  { q: 'Give **one** ethical objection to using **embryonic** stem cells.', marks: 2, ms: 'The embryo is destroyed (1); some people believe an embryo is a potential human life / has a right to life (1).' },
  { q: '"Should scientists be allowed to use human embryos?" Explain why science alone **cannot** answer this question.', marks: 2, ms: 'It is an ethical question / about values or beliefs, not something that can be tested (1); people with different beliefs or views reach different answers / science can only provide evidence (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Cell cycle', 'The series of stages a cell goes through to divide into two new cells.'],
  ['Interphase', 'Longest stage: the cell grows, makes organelles and copies its DNA.'],
  ['DNA replication', 'Copying the DNA so each chromosome becomes two identical chromatids.'],
  ['Chromosome', 'A long, coiled DNA molecule carrying many genes. Found in pairs in body cells.'],
  ['Mitosis', 'Nuclear division that makes two genetically identical diploid nuclei.'],
  ['Cytokinesis', 'Division of the cytoplasm and membrane after mitosis: two cells form.'],
  ['Diploid', 'Chromosomes in pairs: two sets (46 in humans). Gametes are haploid (23).'],
  ['Genetically identical', 'Having exactly the same genes, e.g. cells made by mitosis; clones.'],
  ['Cancer', 'Disease caused by changes in cells that lead to uncontrolled division.'],
  ['Tumour', 'A mass of cells. Benign: stays put. Malignant: invades and spreads.'],
  ['Differentiation', 'A cell becomes specialised by switching genes on and off.'],
  ['Specialised cell', 'A cell adapted for one job, e.g. nerve, muscle, red blood cell.'],
  ['Stem cell', 'Unspecialised cell that can divide and differentiate into other cell types.'],
  ['Embryonic stem cell', 'From an early embryo; can become any type of body cell.'],
  ['Adult stem cell', 'E.g. in bone marrow; becomes only a few cell types; repairs and replaces.'],
  ['Meristem', 'Plant tissue at shoot and root tips where cells divide; plant stem cells.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student looks at a squash of a garlic **root tip** under a light microscope. The root tip contains a **meristem**.', [
  { l: 'a', q: 'Put these stages of mitosis in order:\nA chromatids separate  B chromosomes line up  C two nuclei form  D chromosomes condense', marks: 2, ms: 'D → B → A → C. 2 marks all correct; 1 mark if one pair is swapped.', h: 1.15 },
  { l: 'b', q: 'Explain why each cell must copy its **DNA** during **interphase**, before mitosis.', marks: 2, ms: 'So that each chromosome becomes two identical copies / chromatids (1); so each new cell gets a full / identical set of chromosomes / genes (1).' },
  { l: 'c', q: 'The student counted **120** cells. **9** were in mitosis. Calculate the percentage of cells in mitosis.', marks: 2, ms: '9 ÷ 120 × 100 (1); = 7.5% (1).' },
  { l: 'd', q: 'Explain how changes in a cell can lead to a **tumour**.', marks: 2, ms: 'A change / mutation in the genes that control cell division (1); the cell divides uncontrollably (by mitosis), forming a mass of cells (1).' },
  { l: 'e', q: 'Meristem cells are **stem cells**. Give **one** similarity and **one** difference between plant meristem cells and **adult** stem cells in animals.', marks: 2, ms: 'Similarity: both unspecialised / both divide by mitosis / both can differentiate (1). Difference: meristem cells can become any type of plant cell (throughout life) but adult stem cells only a few types (1).', h: 1.15 },
  { l: 'f', q: 'Explain why growth in a plant happens mainly at the root and shoot **tips**, but growth in a young animal happens all over its body.', marks: 3, ms: 'In plants, cell division only happens in meristems (1); meristems are at the root and shoot tips (1); in animals, cells divide throughout the body / in all tissues while growing (1).', h: 1.2 },
], 13, { subtitle: `Specification ${sp('B4.3.1')}–${sp('B4.3.5')} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Embryonic stem cells are unspecialised and can differentiate into any type of body cell; adult stem cells only a few types.',
    'Benefits: could replace damaged or diseased cells; possible treatments for type 1 diabetes, spinal injury / paralysis, Parkinson\'s, heart damage; could help many people; research improves understanding of development.',
    'Embryos often come from spare IVF embryos that would otherwise be destroyed.',
    'Risks: cells could divide uncontrollably / form tumours; infection from viruses in cultured cells; rejection by the immune system (needs immunosuppressant drugs).',
    'Ethical objections: the embryo is destroyed; some people believe it is a potential human life with a right to life; some religious views; "some actions are wrong whatever the outcome".',
    'Utilitarian view: the right decision gives the best outcome for the greatest number of people.',
    'Alternatives: adult stem cells (e.g. bone marrow; no embryo destroyed, less rejection if the patient\'s own cells) but fewer cell types; regulation (HFEA licence, 14-day limit).',
    'A judgement that is supported by the arguments given.',
  ], {
    l3: 'Evaluates: gives benefits AND risks AND an ethical objection, explained, AND makes a supported judgement (or weighs the views).',
    l2: 'Describes at least one benefit AND one risk or ethical objection, with some explanation; judgement may be missing or unsupported.',
    l1: 'Gives a simple benefit OR a simple risk / objection, e.g. "it could cure diseases" or "the embryo dies".',
  });
}
const HW = [
  { n: '1', q: 'Name the stage of the cell cycle in which the DNA is copied.', marks: 1, ms: 'Interphase (1).' },
  { n: '2', q: 'Mitosis produces two **genetically identical**, **diploid** cells. Explain what each of the two words in bold means.', marks: 2, ms: 'Genetically identical: same genes / same DNA as each other (and the parent) (1); diploid: chromosomes in pairs / two sets / the full number of chromosomes (46 in humans) (1).' },
  { n: '3', q: 'In a root tip squash, **18** of **240** cells were dividing. Calculate the percentage of cells dividing.', marks: 2, ms: '18 ÷ 240 × 100 (1); = 7.5% (1).' },
  { n: '4', q: 'What is a **meristem**, and what is its function?', marks: 2, ms: 'A region / tissue of unspecialised dividing cells (plant stem cells) at the root and shoot tips (1); makes new cells for growth, which can differentiate into any type of plant cell (1).' },
  { n: '5', q: 'Explain why **cancer** can be described as a problem with the cell cycle.', marks: 2, ms: 'Changes / mutations in genes that control the cell cycle / cell division (1); cells divide uncontrollably / do not stop dividing, forming a tumour (1).' },
  { n: '6', q: '**Stretch:** in a root tip, **6** of **300** cells were in the stage where chromatids separate. The cell cycle lasts **24 hours**. Estimate how long this stage lasts, in minutes.', marks: 2, ms: '6 ÷ 300 × 24 h (= 0.48 h) (1); × 60 = 28.8 minutes (≈ 29 min) (1).', h: 1.15 },
  { n: '7', q: 'Some scientists want to use **embryonic stem cells** to treat diseases. **Evaluate** the use of embryonic stem cells in medicine. Include the benefits, the risks and the ethical issues, and give your own conclusion.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q6 is a stretch calculation. Q7 is a 6-mark extended answer.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 8); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 8); assert.strictEqual(R6.total, 8);
const out = path.join(__dirname, 'OCR21C_B4.3_GrowthDevelopment_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
