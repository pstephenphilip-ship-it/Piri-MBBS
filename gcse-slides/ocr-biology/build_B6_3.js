// build_B6_3.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B6 Life on Earth – past, present and future, B6.3 How is biodiversity threatened and how can we protect it?
// (one deck, Higher & Foundation; Part 3 of 3, the last B6 deck and the last J260 biology deck)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B6_3.js
// Structure copied from build_B5_6.js. ocr_bio_template.js is NOT edited: tree, fish, squirrel, flower, quadrat, lake,
// chimney, lichen, seed-jar and DNA helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_B6_3.md): J260 B6.3 = J257 B6.4 renumbered. Statements taught: B6.3.1 human interactions and their impact
// on biodiversity; B6.3.2 benefits and challenges of maintaining local and global biodiversity; B6.3.3 (HT) evaluate evidence
// for the impact of environmental change on distribution (water, atmospheric gases); B6.3.4 food security; B6.3.5
// biotechnological and agricultural solutions incl. GM. Quadrats/transects (B3) are recapped only; GM technique (B1) recap only;
// natural selection / extinction (B6.1) and species / classification (B6.2) recap only.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B6', chapterTitle: 'Life on Earth – past, present and future', code: 'B6.3', title: 'How is biodiversity threatened and how can we protect it?',
  part: 3, parts: 3, specRange: 'B6.3.1–B6.3.5',
  subtitle: 'How is biodiversity threatened and how can we protect it?',
  keywords: ['Biodiversity', 'Ecosystem services', 'Habitat loss', 'Conservation', 'Food security', 'GM crops'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const pct = (a, b) => (b - a) / a * 100;

// ======================= CALCULATIONS (asserted) =======================
// slide 5: species richness in a pond survey
calc('pond: 5 species lost of 25, % remaining', (25 - 5) / 25 * 100, 80, 1e-9);
calc('QC: 12 of 40 species lost %', 12 / 40 * 100, 30, 1e-9);
calc('orchard 30 ÷ 3', 30 / 3, 10, 1e-9);
calc('orchard lost 30 − 10', 30 - 10, 20, 1e-9);
// slide 8: forest grid (10 × 10 squares, each 1 km²)
const FOREST = [
  '1111111111', '1111111111', '1111111111', '1111111111', '1111111111',
  '1111111111', '1111111111', '1111111111', '0000000000', '0000000000'];
const FOREST2 = [
  '1111000111', '1111000111', '1100000011', '1111001111', '1110001110',
  '1110001110', '0000000000', '1100110011', '0000000000', '0000000000'];
const cnt = g => g.join('').split('').filter(c => c === '1').length;
const f1 = calc('forest squares before', cnt(FOREST), 80);
const f2 = calc('forest squares after', cnt(FOREST2), 44);
calc('forest lost', f1 - f2, 36);
calc('% forest lost', (f1 - f2) / f1 * 100, 45, 1e-9);
calc('QC forest 60 → 45 % lost', (60 - 45) / 60 * 100, 25, 1e-9);
// slide 9: red squirrels after grey squirrels arrive (illustrative)
calc('red squirrels 120 → 30 % decrease', -pct(120, 30), 75, 1e-9);
// slide 10 (HT): lichens and SO2 along a transect from a city centre; stonefly nymphs and dissolved oxygen downstream of an outflow
const DIST = [0, 2, 4, 6, 8, 10];
const SO2 = [60, 45, 30, 20, 12, 8];       // µg per m³ (illustrative)
const LICH = [1, 3, 6, 9, 12, 13];         // number of lichen species
const DO = [3, 5, 7, 9, 10, 10];          // dissolved oxygen mg/L downstream at 0..10 km (illustrative)
const STONE = [0, 2, 8, 15, 22, 24];       // stonefly nymphs per sample
calc('SO2 fall 60 → 8', SO2[0] - SO2[5], 52);
calc('lichen rise 1 → 13', LICH[5] - LICH[0], 12);
for (let i = 1; i < 6; i++) assert(SO2[i] < SO2[i - 1] && LICH[i] > LICH[i - 1], 'lichen rises as SO2 falls');
for (let i = 1; i < 6; i++) assert(DO[i] >= DO[i - 1] && STONE[i] > STONE[i - 1], 'stoneflies rise with oxygen');
calc('mean stonefly first 3 km sites', mean(STONE.slice(0, 3)), 10 / 3, 1e-9);
// slide 12: captive breeding, 20 animals, 10% increase per year for 3 years
const cb = calc('captive 20 × 1.1³', 20 * 1.1 ** 3, 26.62, 1e-9);
calc('captive 2 s.f.', sf(cb, 2), 27, 1e-12);
calc('QC captive 50 × 1.2²', 50 * 1.2 ** 2, 72, 1e-9);
// slide 13: farm margin
calc('farm 200 ha × 15%', 200 * 0.15, 30, 1e-9);
calc('wheat lost 30 ha × 8 t/ha', 30 * 8, 240, 1e-9);
// slide 14: North Sea cod spawning stock (illustrative, pattern based on ICES reports; UNVERIFIED values)
const COD_Y = [1970, 1980, 1990, 2000, 2006, 2010, 2015, 2020];
const COD = [250, 150, 80, 45, 40, 70, 150, 90];  // thousand tonnes
calc('cod fall 1970 → 2000 %', -pct(COD[0], COD[3]), 82, 1e-9);
calc('cod rise 2006 → 2015 %', pct(COD[4], COD[6]), 275, 1e-9);
calc('QC cod 2015 → 2020 % fall', -pct(COD[6], COD[7]), 40, 1e-9);
// slides 16–17: two sites, five 0.25 m² quadrats each
const QA = [8, 7, 9, 6, 10], QB = [3, 2, 4, 3, 3];
const DAIS = [4, 6, 5, 3, 7];
const mA = calc('mean species per quadrat A', mean(QA), 8, 1e-9);
const mB = calc('mean species per quadrat B', mean(QB), 3, 1e-9);
calc('range A', Math.max(...QA) - Math.min(...QA), 4);
calc('range B', Math.max(...QB) - Math.min(...QB), 2);
const dQ = calc('mean daisies per quadrat', mean(DAIS), 5, 1e-9);
const dM = calc('daisies per m² (quadrat 0.25 m²)', dQ / 0.25, 20, 1e-9);
calc('daisies on 50 m² lawn', dM * 50, 1000, 1e-9);
calc('quadrat area 0.5 × 0.5', 0.5 * 0.5, 0.25, 1e-12);
calc('A/B ratio', mA / mB, 8 / 3, 1e-9);
calc('site 10 × 10', 10 * 10, 100);
calc('sampled 5 × 0.25', 5 * 0.25, 1.25, 1e-12);
calc('% sampled', 1.25 / 100 * 100, 1.25, 1e-12);
// slide 19: world population (UN approximate; 2050 projected; UNVERIFIED to 2 s.f.)
const POP_Y = [1950, 1975, 2000, 2025, 2050];
const POP = [2.5, 4.1, 6.1, 8.2, 9.7];
calc('population rise 2000 → 2050', sf(POP[4] - POP[1 + 1], 2), 3.6, 1e-12);
calc('population % rise 2000 → 2050', sf(pct(POP[2], POP[4]), 2), 59, 1e-12);
calc('QC population 1950 → 2025 factor', sf(POP[3] / POP[0], 2), 3.3, 1e-12);
// slide 20: GM crop yield
calc('GM yield 6.0 → 7.2 % rise', pct(6.0, 7.2), 20, 1e-9);
calc('QC yield 4.0 → 5.0 % rise', pct(4.0, 5.0), 25, 1e-9);
// starter, recaps, FQ, HW
calc('R1 % species lost 8 of 32', 8 / 32 * 100, 25, 1e-9);
calc('R3 cod 200 → 50 % fall', -pct(200, 50), 75, 1e-9);
calc('R4 mean (4 + 6 + 5 + 9) / 4', (4 + 6 + 5 + 9) / 4, 6, 1e-9);
calc('R4 per m² 6 / 0.25', 6 / 0.25, 24, 1e-9);
calc('FQ hedgerow 1950 → 2000 % lost 800 → 440', -pct(800, 440), 45, 1e-9);
calc('FQ mean birds (12 + 15 + 9) / 3', (12 + 15 + 9) / 3, 12, 1e-9);
calc('HW tigers 3200 → 3900 % rise', sf(pct(3200, 3900), 2), 22, 1e-12);
calc('HW quadrat 7 per 0.25 m² × 400 m²', 7 / 0.25 * 400, 11200, 1e-9);

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
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
const LEAF = ['4E9A3E', '2F6B24'], BARK = ['8A5A2B', '5E3B1A'], SOIL = 'C9A46B', WAT = ['BFD9F2', '5B9BD5'], HI = 'C8414C', PURP = '6A4C93';
// tree: trunk + canopy (k = height in inches)
function tree(s, cx, base, k = 1, col = LEAF) {
  box(s, cx - 0.06 * k, base - 0.45 * k, 0.12 * k, 0.45 * k, BARK[0], BARK[1], { lw: 0.75 });
  oval(s, cx, base - 0.68 * k, 0.6 * k, 0.6 * k, col[0], col[1], { lw: 0.75 });
}
function stump(s, cx, base, k = 1) { box(s, cx - 0.07 * k, base - 0.14 * k, 0.14 * k, 0.14 * k, BARK[0], BARK[1], { lw: 0.75 }); }
// fish facing right
function fish(s, cx, cy, w, col = '6E8FB5', edge = '3E5C80') {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - w * 0.62, y: cy - w * 0.17, w: w * 0.34, h: w * 0.3, rotate: 90, fill: { color: col }, line: { color: edge, width: 0.75 } });
  oval(s, cx, cy, w, w * 0.42, col, edge, { lw: 0.75 });
  ball(s, cx + w * 0.3, cy - w * 0.04, w * 0.04, C.ink);
}
// squirrel (side view facing left): body, head, ear, bushy tail
function squirrel(s, cx, cy, k = 1, col = 'C0602A', edge = '7A3A16') {
  oval(s, cx + 0.32 * k, cy - 0.2 * k, 0.32 * k, 0.6 * k, col, edge, { rot: 20, lw: 0.75 });
  oval(s, cx, cy, 0.42 * k, 0.3 * k, col, edge, { lw: 0.75 });
  ball(s, cx - 0.22 * k, cy - 0.15 * k, 0.11 * k, col, edge);
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.24 * k, y: cy - 0.33 * k, w: 0.08 * k, h: 0.1 * k, fill: { color: col }, line: { color: edge, width: 0.5 } });
  ball(s, cx - 0.26 * k, cy - 0.17 * k, 0.018 * k + 0.008, C.ink);
}
function flower(s, cx, base, h, col = 'E8C43A') {
  line(s, cx, base, cx, base - h, '3E7F2E', 1.25);
  [[0, -1], [1, 0], [0, 1], [-1, 0]].forEach(([dx, dy]) => ball(s, cx + dx * 0.045, base - h + dy * 0.045, 0.04, col, col));
  ball(s, cx, base - h, 0.03, 'A0522D');
}
function grass(s, x, base, w, n = 8) { for (let i = 0; i < n; i++) { const gx = x + (i + 0.5) * w / n; line(s, gx, base, gx + (i % 2 ? 0.04 : -0.04), base - 0.14, '5E9E4A', 1); } }
// quadrat seen from above: square frame with string grid
function quadrat(s, x, y, size, o = {}) {
  box(s, x, y, size, size, o.fill || 'DDEFD2', '7A6A4A', { lw: 2.5 });
  for (let i = 1; i < 5; i++) {
    line(s, x + i * size / 5, y, x + i * size / 5, y + size, 'A08F6A', 0.75);
    line(s, x, y + i * size / 5, x + size, y + i * size / 5, 'A08F6A', 0.75);
  }
}
function chimney(s, x, base, h) {
  box(s, x, base - h, 0.25, h, '8C96A8', '4A5568', { lw: 1 });
  box(s, x - 0.45, base - h * 0.45, 0.45, h * 0.45, 'B7BFCC', '4A5568', { lw: 1 });
  [[0.12, -0.15, 0.3], [0.3, -0.35, 0.38], [0.55, -0.55, 0.45]].forEach(([dx, dy, r]) => oval(s, x + dx + 0.05, base - h + dy, r, r * 0.7, 'D0D4DC', '9AA3B0', { lw: 0.5, tr: 15 }));
}
function lichen(s, cx, cy, r, col = 'B9C96A') {
  [[0, 0], [0.6, 0.3], [-0.5, 0.4], [0.2, -0.6]].forEach(([dx, dy]) => ball(s, cx + dx * r, cy + dy * r, r * 0.55, col, '7D8A3A', 0.5));
}
// small bird (blue tit style) facing left
function bird(s, cx, cy, k = 1) {
  oval(s, cx + 0.12 * k, cy, 0.42 * k, 0.26 * k, '5B9BD5', '2F5F8F', { lw: 0.75 });
  oval(s, cx + 0.12 * k, cy + 0.03 * k, 0.26 * k, 0.14 * k, 'F2D16B', 'C9A63A', { lw: 0.5 });
  ball(s, cx - 0.12 * k, cy - 0.08 * k, 0.1 * k, '5B9BD5', '2F5F8F');
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.3 * k, y: cy - 0.11 * k, w: 0.08 * k, h: 0.07 * k, rotate: 270, fill: { color: '3A3A3A' }, line: { color: '3A3A3A', width: 0.5 } });
  ball(s, cx - 0.14 * k, cy - 0.1 * k, 0.015 * k + 0.008, C.ink);
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx + 0.3 * k, y: cy - 0.08 * k, w: 0.16 * k, h: 0.12 * k, rotate: 90, fill: { color: '2F5F8F' }, line: { color: '2F5F8F', width: 0.5 } });
  line(s, cx + 0.05 * k, cy + 0.12 * k, cx + 0.05 * k, cy + 0.22 * k, '6B7385', 1);
}
function seedJar(s, x, y, w, h, col = 'B5833A') {
  box(s, x, y + 0.12, w, h - 0.12, 'EAF2F8', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.25 });
  box(s, x + 0.05, y, w - 0.1, 0.14, '6B7385', '4A5568');
  for (let i = 0; i < 9; i++) ball(s, x + 0.12 + (i % 3) * (w - 0.24) / 2, y + h - 0.15 - Math.floor(i / 3) * 0.12, 0.04, col, '7A5520');
}
// simple DNA ladder (horizontal) with a highlighted gene
function dnaStrip(s, x, y, w, geneFrom, geneTo, col = C.blue) {
  line(s, x, y, x + w, y, C.ink, 1.5); line(s, x, y + 0.3, x + w, y + 0.3, C.ink, 1.5);
  const n = Math.round(w / 0.12);
  for (let i = 0; i <= n; i++) {
    const xx = x + i * w / n; const g = xx >= geneFrom && xx <= geneTo;
    line(s, xx, y, xx, y + 0.3, g ? HI : '9AA3B0', g ? 2 : 1);
  }
}
// bar chart helper on template axes: bars centred on category positions
function bars(s, g, items, col) {
  items.forEach(([xv, yv, c]) => {
    const bw = 0.42 * (D.px(g, 1) - D.px(g, 0));
    box(s, D.px(g, xv) - bw / 2, D.py(g, yv), bw, D.py(g, g.ymin) - D.py(g, yv), c || col, C.ink, { lw: 0.75 });
  });
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Biodiversity',
  footer: 'OCR J260 Combined Science B • B6.3 How is biodiversity threatened and how can we protect it? • teacher deck • mark schemes in the notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • human impact, conservation, environmental change (HT), food security, GM` },
    { icon: 'H', text: 'Higher & Foundation in one deck • B6.3.3 evidence for environmental change marked HT' },
    { icon: '▲', text: 'Data: forest loss, indicator species, cod stocks, quadrat survey, world population' },
  ],
  notes: 'B6.3 How is biodiversity threatened and how can we protect it? is Part 3 of 3 in J260 Chapter B6 Life on Earth – past, present and future. It is the LAST B6 deck and the last J260 biology deck (chemistry C1 follows).\nNumbering: in J257 (Biology B) this sub-topic is B6.4, because J257 has an extra sub-topic B6.2 on sexual and asexual reproduction. In J260 the sub-topics are B6.1 evolution, B6.2 classification, B6.3 biodiversity (OCR J260 Advance Information June 2022; docbrown combined page; Coral Oceans scheme of work "6.3.2"). See SPEC_B6_3.md.\nThe statement wording is taken from J257 B6.4 search extracts and renumbered; confidence medium. B6.3.4 (food security) and B6.3.5 (GM / agricultural solutions) are the least certain for J260; if your copy of the specification omits them, skip slides 19–21.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B6.3.1', text: 'Define **biodiversity** at three levels and explain why it matters (**ecosystem services**).' },
  { code: 'B6.3.1', text: 'Describe **negative** human interactions: **habitat loss**, **pollution**, **overexploitation**, **invasive species**.' },
  { code: 'B6.3.3', text: '**Evaluate evidence** that environmental change (water, atmospheric gases) affects **distribution**.', ht: true },
  { code: 'B6.3.1', text: 'Describe **positive** interactions: protected areas, **breeding programmes**, **seed banks**, sustainable use.' },
  { code: 'B6.3.2', text: 'Explain the **benefits and challenges** of maintaining **local** and **global** biodiversity.' },
  { code: 'B6.3.2', text: 'Use **data** to judge whether a conservation method works; compare two sites with **quadrats**.' },
  { code: 'B6.3.4', text: 'Describe biological factors that affect **food security**.' },
  { code: 'B6.3.5', text: 'Explain **agricultural** and **biotechnological** solutions, including **GM** crops, with benefits and risks.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J257 B6.4 wording from search extracts, renumbered for J260 B6.3):\nB6.3.1 describe both positive and negative human interactions within ecosystems and explain their impact on biodiversity\nB6.3.2 explain some of the benefits and challenges of maintaining local and global biodiversity (J260 code 6.3.2 confirmed by the Coral Oceans scheme of work)\nB6.3.3 (HT) evaluate evidence for the impact of environmental changes on the distribution of organisms, with reference to water and atmospheric gases\nB6.3.4 describe some of the biological factors affecting levels of food security, including increasing human population, changing diets in wealthier populations, new pests and pathogens, environmental change, sustainability and cost of agricultural inputs\nB6.3.5 describe and explain some possible biotechnological and agricultural solutions, including genetic modification, to the demands of the growing human population\nData handling (charts, graphs, tables) runs through every slide. Ideas about Science: benefits, risks and decisions; correlation and cause.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B6 Life on Earth – past, present and future • B6.3 is Part 3 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B6.3.1', 'What biodiversity is and why it matters', 'Both tiers', C.blue],
    ['B6.3.1', 'Threats: habitat loss, pollution, overfishing, invaders', 'Both tiers', C.blue],
    ['B6.3.3', 'Evidence: indicator species, water and air', 'HT', C.red],
    ['B6.3.1–2', 'Protecting biodiversity; benefits and challenges', 'Both tiers', C.blue],
    ['Activity', 'Comparing two sites with quadrats', 'Practical', C.orange],
    ['B6.3.4–5', 'Food security; agricultural and GM solutions', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B6.3\nBiodiversity', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B3 food webs, quadrats, transects • B1 genes, GM • B6.1 natural selection • B6.2 species', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'B6.1 How was the theory of evolution developed?',
      'B6.2 How does our understanding of biology help us classify the diversity of organisms on Earth?',
      '**B6.3 How is biodiversity threatened and how can we protect it?** (this deck)',
      'B6 is the **last** biology chapter in J260.',
    ], { size: 11, color: 'E3F2F0', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides with the red **HT** pill (evaluating evidence about environmental change) are for Higher tier only.',
      'Ideas about Science: **benefits**, **risks** and **decisions**; **correlation** is not always **cause**.',
      'Maths: **percentage change**, **means**, **ranges**, reading and plotting **graphs**, scaling quadrat counts.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B6 has three sub-topics (OCR J260 Advance Information June 2022 lists B6.1, B6.2, B6.3; docbrown combined page lists B6.3 as the biodiversity sub-topic). J257 Biology B has four (B6.2 sexual and asexual reproduction is J257 only), which is why biodiversity is B6.4 in J257.\nOverlap control: quadrats, transects and abiotic / biotic factors were taught in Chapter B3 (Living together) and are recapped only (slides 16–17). The GM technique is in B1 and is recapped only (slide 20). Natural selection belongs to B6.1 and species / classification to B6.2; both are only mentioned. Extinction is NOT taught in B6.1 (SPEC_B6_1.md) and is taught here (slides 8–9).\nJ260 biology ends with this deck: the specification has six biology chapters B1–B6, then C1–C6 and P1–P6, plus BCP7 Ideas about Science and BCP8 Practical skills.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B3 • food webs', q: 'What is **interdependence**? Give an example from a food web of what happens if one species is removed.' },
  { from: 'B3 • sampling', q: 'Describe how to use a **quadrat** to estimate the number of daisies on a field. What is a **transect** for?' },
  { from: 'B3 • ecosystems', q: 'Name **two abiotic** and **two biotic** factors that affect where organisms live.' },
  { from: 'B6.2 • classification', q: 'What is a **species**? Why do scientists need to name and classify species?' },
  { from: 'KS3 • extinction', q: 'What is **extinction**? Give **one** cause of a species becoming extinct.' },
  { from: 'B1 • genes', q: 'What is **genetic modification**? (A field of **12** quadrats has a mean of **4** daisies: total counted?)' },
], { subtitle: 'Recall from B1, B3, B6.1 and B6.2 • 6 minutes • no notes', notes: 'ANSWERS\n1. Species depend on each other for food, shelter, pollination etc. E.g. remove rabbits: foxes have less food (fall), grass increases.\n2. Place quadrats at random (random coordinates), count daisies in each, find the mean per quadrat, scale up to the area of the field. A transect (line with quadrats at intervals) shows how distribution changes across a habitat, e.g. with light or distance from water.\n3. Abiotic: light, temperature, water, pH, oxygen, carbon dioxide, soil nutrients. Biotic: food, predators, competitors, pathogens, pollinators.\n4. A group of organisms that can breed together to produce fertile offspring. To identify organisms, to count and monitor biodiversity and to see relationships (B6.2; recap only).\n5. When no individuals of a species are left. Causes: habitat loss, new predator or disease, new competitor, climate change, hunting (KS3; extinction is taught in this deck, not in B6.1).\n6. Changing an organism\'s genome by adding a gene from another organism (B1). 12 × 4 = 48 daisies counted.' }), 'Retrieval starter');

// ======================= 5 WHAT IS BIODIVERSITY =======================
reg(D.contentSlide({
  title: 'What biodiversity is',
  subtitle: `Specification ${sp('B6.3.1')} • the variety of life in an area`,
  tag: 'B6.3.1', caption: 'three levels of biodiversity; not to scale',
  draw: (s) => {
    const cols = [[0.65, 'Genetic diversity', 'variation within one species'], [2.6, 'Species diversity', 'number of different species'], [4.55, 'Ecosystem diversity', 'number of different habitats']];
    cols.forEach(([x, h, sub]) => {
      box(s, x, 1.5, 1.8, 3.65, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      label(s, x + 0.05, 1.55, 1.7, `**${h}**`, { size: 11, color: C.ink, h: 0.3 });
      label(s, x + 0.05, 1.85, 1.7, sub, { size: 10, italic: true, color: C.grey, h: 0.45, valign: 'top' });
    });
    // genetic: same flower, different colours
    ['E8C43A', 'C8414C', 'F2F2F2', '8E44AD', 'E07A1E', '5B9BD5'].forEach((c, i) => flower(s, 0.95 + (i % 3) * 0.6, 3.35 + Math.floor(i / 3) * 1.1, 0.7, c));
    grass(s, 0.75, 4.45, 1.6);
    // species: different organisms
    flower(s, 2.9, 3.3, 0.6, 'E8C43A'); tree(s, 3.65, 3.3, 0.9);
    squirrel(s, 3.0, 4.15, 0.75); fish(s, 3.85, 4.15, 0.55);
    bird(s, 3.05, 2.55, 0.8);
    label(s, 2.65, 4.55, 1.7, '5 species', { size: 10, bold: true, color: C.blue, h: 0.25 });
    // ecosystem: wood, pond, meadow
    tree(s, 4.95, 3.0, 0.7); tree(s, 5.4, 3.0, 0.8); tree(s, 5.95, 3.0, 0.7);
    label(s, 4.6, 3.02, 1.7, 'woodland', { size: 10, color: LEAF[1], h: 0.22 });
    oval(s, 5.45, 3.7, 1.4, 0.38, WAT[0], WAT[1], { lw: 1 });
    label(s, 4.6, 3.9, 1.7, 'pond', { size: 10, color: WAT[1], h: 0.22 });
    grass(s, 4.75, 4.6, 1.4, 9); flower(s, 5.0, 4.6, 0.25); flower(s, 5.6, 4.6, 0.3, 'C8414C');
    label(s, 4.6, 4.62, 1.7, 'meadow', { size: 10, color: '3E7F2E', h: 0.22 });
    label(s, 0.65, 5.3, 5.7, 'High biodiversity = **many** species, **many** varieties, **many** habitats', { size: 11, color: C.ink, h: 0.4 });
  },
  head: 'Biodiversity',
  lines: [
    '**Biodiversity** is the variety of living organisms in an area, from genes to whole ecosystems.',
    '**Genetic**: variation within a species (e.g. flower colour). More variation helps a species survive change (B6.1).',
    '**Species**: the number of different species, and how evenly they are spread.',
    '**Ecosystem**: the range of habitats in an area.',
    'Biodiversity is **lower** where one species dominates, e.g. a field of one crop (a **monoculture**).',
  ],
  size: 11.5,
  worked: { head: 'Worked example: species lost', q: 'A pond survey found 25 species. Five years later 5 had gone.',
    steps: [['Remaining', '25 − 5 = 20 species'], ['Percentage', '20 ÷ 25 × 100'], ['Answer', '**80%** of the species remain (20% lost)']], size: 10.5 },
  workedH: 1.55,
  qc: 'Name the **three** levels of biodiversity. A wood had **40** species and lost **12**. What **percentage** was lost?',
  notes: 'QUICK CHECK ANSWER: Genetic, species, ecosystem (habitat) diversity. 12 ÷ 40 × 100 = 30%.\nB6.3.1 context. "Species richness" (number of species) and "evenness" are useful words; GCSE questions usually count species. Monoculture example links to B6.3.4–5. Recap B6.2: a species is a group that can interbreed to produce fertile offspring.',
}), 'B6.3.1 What biodiversity is');

// ======================= 6 WHY IT MATTERS =======================
reg(D.contentSlide({
  title: 'Why biodiversity matters',
  subtitle: `Specification ${sp('B6.3.1')}, ${sp('B6.3.2')} • ecosystem services: what nature does for us`,
  tag: 'B6.3.2', caption: 'a woodland food web; arrows show the direction of energy flow',
  draw: (s) => {
    const N = {
      oak: [1.3, 4.7, 'Oak tree', LEAF[0]], flow: [3.4, 4.7, 'Wildflowers', 'E8C43A'], grass: [5.5, 4.7, 'Grass', '7DBE6A'],
      cat: [1.1, 3.45, 'Caterpillar', '9BC53D'], bee: [3.0, 3.45, 'Bee', 'F2B705'], rab: [5.2, 3.45, 'Rabbit', 'B9A68A'],
      bird: [2.0, 2.3, 'Blue tit', '5B9BD5'], fox: [5.5, 2.3, 'Fox', 'D2691E'], hawk: [3.7, 1.65, 'Hawk', '7A5C3A'],
    };
    const E = [['oak', 'cat'], ['cat', 'bird'], ['bee', 'bird'], ['flow', 'bee'], ['grass', 'rab'], ['rab', 'fox'], ['rab', 'hawk'], ['bird', 'hawk']];
    E.forEach(([a, b]) => arrow(s, N[a][0], N[a][1] - 0.2, N[b][0], N[b][1] + 0.2, C.ink, 1.25));
    Object.values(N).forEach(([x, y, t, c]) => { box(s, x - 0.6, y - 0.19, 1.2, 0.38, c, C.ink, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 }); label(s, x - 0.6, y - 0.19, 1.2, `**${t}**`, { size: 10, h: 0.38, color: C.ink }); });
    arrow(s, 3.35, 3.65, 3.75, 4.5, HI, 1.5, { dash: 'dash' });
    label(s, 3.75, 3.85, 1.0, 'pollinates', { size: 10, bold: true, color: HI, h: 0.22, align: 'left' });
    label(s, 0.65, 5.2, 5.75, 'Remove the bees: wildflowers are not pollinated, blue tits lose food → the whole web changes', { size: 10.5, italic: true, color: C.grey, h: 0.5 });
  },
  head: 'Ecosystem services',
  lines: [
    '**Food**: crops, fish and meat come from biodiversity; wild relatives of crops carry useful genes.',
    '**Medicines**: many drugs were first found in plants, fungi and microorganisms.',
    '**Pollination** by insects; **pest control** by predators; **decomposers** recycle nutrients.',
    '**Clean water and air**, flood control, soil formation and **carbon storage** (forests, peat bogs).',
    '**Stability**: in a diverse food web, losing one species matters less because organisms are **interdependent** and have other food sources.',
    'Also **enjoyment**, tourism and the moral idea that other species have a right to exist.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: value of pollinators', q: 'An apple orchard yields 30 tonnes. Without insect pollination the yield would be one third of this.',
    steps: [['Without', '30 ÷ 3 = 10 tonnes'], ['Lost', '30 − 10 = 20 tonnes'], ['Answer', 'insects provide **20 tonnes** (two thirds) of the crop']], size: 10.5 },
  workedH: 1.55,
  qc: 'Give **three** ecosystem services. Explain why a food web with **many** species is more **stable** than one with few.',
  notes: 'QUICK CHECK ANSWER: Any three from food, medicines, pollination, pest control, nutrient recycling, clean water / air, flood control, carbon storage, timber, tourism. With many species, each predator has several food sources, so if one prey species declines the predator can eat others; the web is less likely to collapse.\nB6.3.2 asks for benefits of maintaining biodiversity: this slide is the "benefits" half; slide 13 gives the challenges. Food web is simplified (illustrative). Orchard figures illustrative (asserted: 30 ÷ 3 = 10; 30 − 10 = 20).',
}), 'B6.3.1–2 Why biodiversity matters');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B6.3.1')}, ${sp('B6.3.2')} • biodiversity and why it matters`, [
  { q: 'Define **biodiversity**.', marks: 2, ms: 'The variety of living organisms / species (1); in an area / ecosystem / including genetic and habitat variety (1).' },
  { q: 'Give **two** ways in which humans benefit from high biodiversity.', marks: 2, ms: 'Any two (1 each): food; medicines; pollination of crops; pest control; clean water / air; nutrient recycling; carbon storage / climate regulation; tourism / enjoyment.' },
  { q: 'A field survey found **32** species. Two years later **8** had disappeared. Calculate the percentage of species lost.', marks: 2, ms: '8 ÷ 32 × 100 (1); = 25% (1).' },
  { q: 'Explain why a **monoculture** of wheat has low biodiversity and why this can be a problem.', marks: 2, ms: 'Only one species / one variety grown / other plants removed (1); a pest or disease can destroy the whole crop / few habitats or food for other species (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 HABITAT LOSS =======================
{
  const s = D.contentHeader('Threats 1: habitat loss', `Specification ${sp('B6.3.1')} • negative human interactions: land use and deforestation`, { tag: 'B6.3.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'map grids drawn to scale: each square = 1 km² (illustrative data)');
  const grid = (G, x0, y0, t) => {
    label(s, x0, y0 - 0.32, 2.5, `**${t}**`, { size: 11, h: 0.28 });
    G.forEach((row, r) => row.split('').forEach((c, k) => box(s, x0 + k * 0.25, y0 + r * 0.25, 0.25, 0.25, c === '1' ? LEAF[0] : 'E8D9B5', 'FFFFFF', { lw: 0.5 })));
  };
  grid(FOREST, 0.75, 1.85, `Before: ${f1} km² forest`);
  grid(FOREST2, 3.85, 1.85, `After: ${f2} km² forest`);
  arrow(s, 3.35, 3.1, 3.75, 3.1, C.ink, 2);
  // legend
  box(s, 0.8, 4.65, 0.25, 0.25, LEAF[0], null); label(s, 1.1, 4.63, 1.0, 'forest', { size: 10, align: 'left' });
  box(s, 2.0, 4.65, 0.25, 0.25, 'E8D9B5', null); label(s, 2.3, 4.63, 2.2, 'farmland, roads, housing', { size: 10, align: 'left' });
  label(s, 0.75, 5.0, 5.6, 'The forest left is in **small, separate fragments**: animals cannot move between them, and populations are small.', { size: 10.5, h: 0.55, align: 'left', valign: 'top' });
  D.card(s, 6.8, 1.3, 6.08, 2.95, 'How we destroy habitats', [
    '**Deforestation**: forests cleared for farming (cattle, soya, palm oil), timber and roads.',
    '**Building**: housing, industry, quarries and landfill take land.',
    '**Peat bogs** drained and dug for compost: habitats lost and stored **carbon** released as CO₂.',
    '**Hedgerows** removed to make bigger fields: fewer nesting sites and wildlife corridors.',
    'Fewer habitats → fewer species. A species that loses all its habitat dies out: **extinction** (none left anywhere).',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: percentage of forest lost', 'Use the two grids.', [
    ['Lost', `${f1} − ${f2} = ${f1 - f2} km²`], ['Divide', `${f1 - f2} ÷ ${f1} × 100`], ['Answer', '**45%** of the forest was lost']], { size: 10.5 });
  D.quickCheck(s, 'Give **two** reasons why forests are cleared. A forest shrinks from **60** to **45 km²**. What percentage is lost?');
  D.notes(s, 'QUICK CHECK ANSWER: Any two: land for farming / grazing / crops such as palm oil or soya; timber; building houses / roads / industry; mining. (60 − 45) ÷ 60 × 100 = 25%.\nGrid counts asserted in node (80 → 44 squares). Fragmentation is a useful extra idea: small isolated populations have less genetic variation and are more likely to die out. Peat use is named in OCR / Oak teaching material; burning or digging peat also adds CO₂ to the air (link to global warming on slide 9).');
  reg(s, 'B6.3.1 Habitat loss');
}

// ======================= 9 POLLUTION, OVERFISHING, INVADERS =======================
reg(D.contentSlide({
  title: 'Threats 2: pollution, overuse, invaders',
  subtitle: `Specification ${sp('B6.3.1')} • more negative human interactions and their impact`,
  tag: 'B6.3.1', caption: 'eutrophication of a lake (top); red and grey squirrels (bottom); not to scale',
  draw: (s) => {
    // eutrophication chain
    const steps = ['Fertiliser or sewage washes into the lake', 'Algae grow fast and cover the surface', 'Plants below get no light and die', 'Bacteria decompose them and use up oxygen', 'Fish and other animals die'];
    // lake
    box(s, 0.9, 1.55, 2.5, 1.9, WAT[0], WAT[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 });
    box(s, 0.9, 1.55, 2.5, 0.22, '7DBE6A', '3E7F2E', { lw: 0.75 });
    label(s, 0.9, 1.55, 2.5, 'algal bloom', { size: 10, bold: true, color: '1E4D14', h: 0.22 });
    arrow(s, 0.55, 2.0, 1.05, 2.0, '7A5520', 1.5);
    label(s, 1.1, 1.82, 1.7, 'run-off from fields', { size: 10, bold: true, color: '7A5520', align: 'left', h: 0.24 });
    fish(s, 1.4, 2.5, 0.5, '9AA3B0', '5A6275'); fish(s, 2.4, 2.9, 0.45, '9AA3B0', '5A6275');
    label(s, 0.75, 3.05, 2.6, 'dead fish: little **oxygen**', { size: 10, color: C.ink, h: 0.3 });

    steps.forEach((t, i) => {
      pbox(s, 3.6, 1.48 + i * 0.4, 2.8, 0.34, `${i + 1} ${t}`, i % 2 ? C.white : 'EAF5E4', '7DBE6A', { size: 10, lw: 0.75 });
    });
    line(s, 0.6, 3.6, 6.4, 3.6, C.line, 1, { dash: 'dash' });
    // squirrels
    squirrel(s, 1.35, 4.5, 1.0, 'C0602A', '7A3A16');
    squirrel(s, 3.0, 4.5, 1.25, '8C8C8C', '4A4A4A');
    label(s, 0.75, 4.95, 1.4, 'red (native)', { size: 10, bold: true, color: '7A3A16', h: 0.25 });
    label(s, 2.35, 4.95, 1.6, 'grey (from N America)', { size: 10, bold: true, color: '4A4A4A', h: 0.25 });
    label(s, 4.0, 3.75, 2.45, 'Greys **outcompete** reds for food and carry a **virus** that kills reds. Reds now mostly survive where greys are absent.', { size: 10, h: 1.25, align: 'left', valign: 'top' });
    fish(s, 4.6, 5.3, 0.45); fish(s, 5.2, 5.45, 0.35); fish(s, 5.75, 5.3, 0.3);
    label(s, 4.0, 5.55, 2.45, 'overfishing: few large fish left', { size: 10, italic: true, color: C.grey, h: 0.25 });
  },
  head: 'More threats',
  lines: [
    '**Pollution**: fertiliser and sewage in water cause **eutrophication**; pesticides kill non-target insects; toxic chemicals build up in food chains; acid gases harm lichens and trees.',
    '**Global warming**: burning fossil fuels and deforestation add CO₂; species must move or die.',
    '**Overexploitation**: overfishing, hunting and logging faster than populations can recover.',
    '**Invasive (non-native) species**: compete with, eat, or spread disease to native species.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: percentage decrease', q: 'A wood had 120 red squirrels. After greys arrived, 30 were left.',
    steps: [['Decrease', '120 − 30 = 90'], ['Divide', '90 ÷ 120 × 100'], ['Answer', '**75%** decrease']], size: 10.5 },
  workedH: 1.5,
  qc: 'Put the eutrophication steps in order from memory. Explain why the **fish** die even though fertiliser is not poisonous to them.',
  notes: 'QUICK CHECK ANSWER: Fertiliser / sewage enters water → algae grow rapidly → block light → plants die → bacteria decompose dead plants and algae, respiring and using up dissolved oxygen → fish suffocate / cannot respire aerobically.\nSquirrel data illustrative (asserted: 75%). Grey squirrels were introduced to Britain from North America in the 1800s; squirrelpox virus. Other invasive examples: Japanese knotweed, signal crayfish, Himalayan balsam. Global warming is covered as an environmental change on slide 10 (HT evidence) and in food security (slide 19).',
}), 'B6.3.1 Pollution, overexploitation, invasive species');

// ======================= 10 EVIDENCE (HT) =======================
{
  const s = D.contentHeader('Evidence: indicator species', `Specification ${sp('B6.3.3')} • evaluate evidence for the effect of environmental change on distribution`, { ht: true, tag: 'B6.3.3' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'plotted to scale from the survey tables (illustrative data)');
  const g1 = { x: 1.3, y: 1.55, w: 2.3, xmin: 0, xmax: 10, ymin: 0, ymax: 70, xstep: 2, ystep: 10, minor: 1, h: 2.55, xlabel: 'Distance from city / km', ylabel: '' };
  const g2 = { x: 4.45, y: 1.55, w: 2.3, h: 2.55, xmin: 0, xmax: 10, ymin: 0, ymax: 25, xstep: 2, ystep: 5, minor: 1, xlabel: 'Distance downstream / km', ylabel: '' };
  D.axes(s, g1); D.axes(s, g2);
  const p1 = DIST.map((d, i) => [d, SO2[i]]), p2 = DIST.map((d, i) => [d, LICH[i] * 5]);
  D.plotLine(s, g1, p1, '7A7A7A', 2); D.points(s, g1, p1, C.ink);
  D.plotLine(s, g1, p2, '7D8A3A', 2); D.points(s, g1, p2, C.ink);
  label(s, g1.x, g1.y - 0.25, 2.3, '**Air**: SO₂ and lichens', { size: 10.5, h: 0.22 });
  label(s, D.px(g1, 0.3), D.py(g1, 66), 1.2, 'SO₂ / µg/m³', { size: 10, bold: true, color: '5A5A5A', align: 'left', h: 0.2 });
  label(s, D.px(g1, 4.6), D.py(g1, 6), 1.3, 'lichen species ×5', { size: 10, bold: true, color: '5E6A1E', align: 'left', h: 0.2 });
  const q1 = DIST.map((d, i) => [d, DO[i] * 2]), q2 = DIST.map((d, i) => [d, STONE[i]]);
  D.plotLine(s, g2, q1, WAT[1], 2); D.points(s, g2, q1, C.ink);
  D.plotLine(s, g2, q2, '8A5A2B', 2); D.points(s, g2, q2, C.ink);
  label(s, g2.x, g2.y - 0.25, 2.3, '**Water**: oxygen and stoneflies', { size: 10.5, h: 0.22 });
  label(s, D.px(g2, 0.3), D.py(g2, 24), 1.4, 'oxygen mg/L ×2', { size: 10, bold: true, color: WAT[1], align: 'left', h: 0.2 });
  label(s, D.px(g2, 6.8), D.py(g2, 9), 1.0, 'stonefly nymphs', { size: 10, bold: true, color: '8A5A2B', align: 'left', h: 0.2 });
  const rows = [[HDR('km'), ...DIST.map(d => HDR(String(d)))],
    [tcell('SO₂', 0, { bold: true }), ...SO2.map(v => tcell(String(v), 0))], [tcell('Lichens', 1, { bold: true }), ...LICH.map(v => tcell(String(v), 1))],
    [tcell('O₂ mg/L', 0, { bold: true }), ...DO.map(v => tcell(String(v), 0))], [tcell('Stoneflies', 1, { bold: true }), ...STONE.map(v => tcell(String(v), 1))]];
  s.addTable(rows, { x: 0.7, y: 4.85, w: 6.1, colW: [1.18, ...Array(6).fill(4.92 / 6)], rowH: 0.2, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.card(s, 7.3, 1.3, 5.58, 2.65, 'Indicator species', [
    '**Lichens** are killed by **sulfur dioxide** (an atmospheric gas from burning fuels): more lichen species = cleaner air.',
    '**Stonefly** and mayfly nymphs need a lot of **dissolved oxygen**; sludgeworms and rat-tailed maggots survive in polluted, low-oxygen water.',
    'Rising **temperature** and CO₂: species shift their range towards the poles or uphill.',
  ], { size: 12 });
  D.card(s, 7.3, 4.1, 5.58, 2.15, 'Evaluating the evidence', [
    'Both data sets show a **correlation**. A **mechanism** (SO₂ damages lichens; nymphs need O₂) makes **cause** more likely.',
    'But other factors change with distance too (light, temperature, trees). Only **one** transect: **repeat** it at other cities and rivers.',
    'Is the sample big enough? Were species identified correctly?',
  ], { size: 11.5 });
  D.quickCheck(s, 'Describe the pattern in the lichen data. Give **one** reason why the data do not **prove** that SO₂ limits lichens.');
  D.notes(s, `QUICK CHECK ANSWER: As distance from the city increases, SO₂ falls (60 → 8 µg/m³) and the number of lichen species rises (1 → 13): a negative correlation between SO₂ and lichen diversity. Not proof: other variables (e.g. temperature, humidity, soot, tree species) also change with distance; only one transect / no repeats; correlation does not show cause (IaS).\nHT statement B6.3.3 "evaluate evidence for the impact of environmental changes on the distribution of organisms, with reference to water and atmospheric gases" (J257 wording; "(HT only)" in the revision map extract). If your J260 copy shows it in normal type, teach this slide to all.\nData illustrative; monotonic trends asserted in node. Lichens are plotted ×5 and oxygen ×2 so they share an axis: point this out (a common exam trap: read the key). Stonefly mean of first three sites = ${fmt(sf(10 / 3, 3))}.`);
  reg(s, 'B6.3.3 Evidence: indicator species (HT)');
}

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B6.3.1')}, ${sp('B6.3.3')} • threats and evidence`, [
  { q: 'Describe **two** ways in which human activity destroys habitats.', marks: 2, ms: 'Any two (1 each): deforestation / clearing forest for farming; building houses / roads / industry; quarrying / mining; draining / digging peat bogs; removing hedgerows; landfill.' },
  { q: 'Explain how fertiliser running into a lake can cause fish to die.', marks: 2, ms: 'Algae grow / bloom and block light so plants die (1); bacteria decompose them and use up oxygen, so fish cannot respire (1).' },
  { q: 'Lichen species increase from **1** to **13** as SO₂ falls. Explain why lichens are called **indicator species**.', marks: 2, ht: true, ms: 'Their presence / number of species shows the level of pollution / air quality (1); they are sensitive to / killed by SO₂, so few lichens = high SO₂ (1).' },
  { q: 'Evaluate whether the river data **prove** that low oxygen limits stoneflies.', marks: 2, ht: true, ms: 'Correlation: more stoneflies where oxygen is higher / plausible mechanism (1); but other factors may vary / only one river / need repeats, so not proof (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 PROTECTING BIODIVERSITY =======================
reg(D.contentSlide({
  title: 'Protecting biodiversity',
  subtitle: `Specification ${sp('B6.3.1')} • positive human interactions within ecosystems`,
  tag: 'B6.3.1', caption: 'four conservation methods; not to scale',
  draw: (s) => {
    const cells = [[0.65, 1.5, 'Protected areas'], [3.55, 1.5, 'Breeding programmes'], [0.65, 3.5, 'Seed banks'], [3.55, 3.5, 'Restore habitats']];
    cells.forEach(([x, y, t]) => { box(s, x, y, 2.75, 1.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, x + 0.05, y + 0.04, 2.65, `**${t}**`, { size: 11, color: C.ink, h: 0.28 }); });
    // protected area: fence around trees
    box(s, 0.95, 1.95, 2.15, 1.2, 'EAF5E4', '8A5A2B', { lw: 2, });
    [1.25, 1.75, 2.25, 2.75].forEach((x, i) => tree(s, x, 2.95, 0.6 + (i % 2) * 0.15));
    label(s, 0.95, 3.1, 2.15, 'national park, reserve', { size: 10, italic: true, color: C.grey, h: 0.22 });
    // breeding: two animals + young in enclosure
    box(s, 3.85, 1.95, 2.15, 1.2, 'FBF3DF', '8A6D3B', { lw: 1.5 });
    squirrel(s, 4.35, 2.6, 0.9); squirrel(s, 5.1, 2.6, 0.9); squirrel(s, 5.65, 2.85, 0.5);
    label(s, 3.85, 3.1, 2.15, 'zoo → release to the wild', { size: 10, italic: true, color: C.grey, h: 0.22 });
    // seed bank: jars in a freezer
    box(s, 0.95, 3.9, 2.15, 1.3, 'DDEFF7', '5B9BD5', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 });
    [1.1, 1.65, 2.2].forEach((x, i) => seedJar(s, x, 4.1, 0.45, 0.65, ['B5833A', '6B4F2A', 'D9B26A'][i]));
    label(s, 2.65, 4.3, 0.45, '−20 °C', { size: 10, bold: true, color: WAT[1], h: 0.3, rotate: 0 });
    label(s, 0.95, 4.85, 2.15, 'dry, cold seed store', { size: 10, italic: true, color: C.grey, h: 0.22 });
    // restore: hedgerow between fields
    box(s, 3.85, 3.9, 2.15, 1.3, 'F2E6C8', null);
    box(s, 3.85, 4.42, 2.15, 0.26, LEAF[0], LEAF[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.1 });
    flower(s, 4.2, 4.38, 0.15); flower(s, 4.9, 4.38, 0.18, 'C8414C'); flower(s, 5.6, 4.38, 0.15, '8E44AD');
    label(s, 3.85, 4.85, 2.15, 'hedgerows, field margins, ponds', { size: 10, italic: true, color: C.grey, h: 0.22 });
    label(s, 0.65, 5.4, 5.65, 'Also: laws and **quotas**, recycling, less pollution, controlling invasive species, education', { size: 10.5, h: 0.4 });
  },
  head: 'Conservation methods',
  lines: [
    '**Protected areas**: national parks, nature reserves and marine reserves limit building, hunting and fishing.',
    '**Captive breeding**: endangered animals are bred in zoos, then released to increase wild numbers.',
    '**Seed banks**: seeds are dried and frozen to keep the **genetic diversity** of plants; they can be grown later.',
    '**Habitat restoration**: replant hedgerows and forests, restore peat bogs, leave wildflower margins.',
    '**Sustainable use**: fishing **quotas**, larger mesh nets, replanting trees after logging.',
  ],
  size: 11,
  worked: { head: 'Worked example: breeding programme', q: '20 animals are released; numbers rise by 10% each year.',
    steps: [['Year 1', '20 × 1.1 = 22'], ['Year 3', '20 × 1.1³ = 26.62'], ['Answer', 'about **27** animals after 3 years']], size: 10.5 },
  workedH: 1.5,
  qc: 'Why do seed banks store seeds from **many** varieties, not just one? A population of **50** grows by **20%** a year for 2 years: how many?',
  notes: `QUICK CHECK ANSWER: To keep genetic diversity: different varieties carry different alleles (e.g. for disease or drought resistance) that may be needed in future; one variety could be wiped out by a single disease. 50 × 1.2² = 72.\nNode: 20 × 1.1³ = ${fmt(cb)}. Real example: Kew's Millennium Seed Bank (Wakehurst) stores seeds from tens of thousands of wild plant species (UNVERIFIED count, so no number on the slide). Captive breeding examples: Arabian oryx, Przewalski's horse, Scottish wildcat. Breeding programmes need many unrelated animals so that genetic variation is kept.`,
}), 'B6.3.1 Protecting biodiversity');

// ======================= 13 BENEFITS AND CHALLENGES =======================
{
  const s = D.contentHeader('Benefits and challenges', `Specification ${sp('B6.3.2')} • maintaining local and global biodiversity`, { tag: 'B6.3.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'weighing a conservation decision');
  // balance
  poly(s, [[3.5, 3.0], [3.2, 4.9], [3.8, 4.9]], '8C96A8', '4A5568', { lw: 1.25 });
  box(s, 2.6, 4.9, 1.8, 0.15, '4A5568', null);
  line(s, 1.0, 2.75, 6.0, 3.15, '4A5568', 3);
  line(s, 1.6, 2.8, 1.25, 3.45, '4A5568', 1); line(s, 1.6, 2.8, 2.6, 3.45, '4A5568', 1);
  line(s, 5.4, 3.1, 4.4, 3.75, '4A5568', 1); line(s, 5.4, 3.1, 5.75, 3.75, '4A5568', 1);
  pbox(s, 0.75, 3.45, 2.3, 1.05, '**Benefits**\nspecies saved, services, tourism, medicines', 'D8F0E2', C.green, { size: 10 });
  pbox(s, 3.95, 3.75, 2.3, 1.05, '**Challenges**\ncost, jobs, land for food and homes', 'FBE3E4', HI, { size: 10 });
  label(s, 0.75, 1.45, 5.6, '**Local**: a farm, a town, a wood  •  **Global**: rainforests, oceans, climate', { size: 10.5, h: 0.3 });
  label(s, 0.75, 1.8, 5.6, 'Who decides? Farmers, local people, governments, companies, conservation charities', { size: 10.5, italic: true, color: C.grey, h: 0.5 });
  label(s, 0.75, 5.15, 5.6, 'A good decision weighs **benefits** against **costs and risks** for everyone affected', { size: 10.5, h: 0.4, bold: true, color: C.ink });
  D.card(s, 6.8, 1.3, 2.97, 3.2, 'Local', [
    '**Benefits**: wildlife on farms (pollinators, pest predators), cleaner rivers, healthier, nicer places to live.',
    '**Challenges**: land for reserves cannot be farmed or built on; farmers may lose income; needs money and volunteers.',
  ], { size: 10.5 });
  D.card(s, 9.91, 1.3, 2.97, 3.2, 'Global', [
    '**Benefits**: protects climate (forests store carbon), fish stocks, crop genes for everyone.',
    '**Challenges**: countries must **agree** and **enforce** laws; poorer countries may need forests for income; illegal hunting and logging.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.65, 6.08, 1.6, 'Worked example: the cost of a field margin', 'A 200 ha farm leaves 15% as wildflower margins. Wheat yields 8 tonnes per ha.', [
    ['Area', '200 × 0.15 = 30 ha'], ['Answer', '30 × 8 = **240 tonnes** of wheat not grown']], { size: 10.5 });
  D.quickCheck(s, 'Give **one** benefit and **one** challenge of protecting a rainforest. Why is protecting ocean fish a **global** problem?');
  D.notes(s, 'QUICK CHECK ANSWER: Benefit: keeps species / medicines / stores carbon / tourism income. Challenge: local people need land / money from logging or farming; hard to police; costs money. Fish move across national borders and fishing fleets from many countries share the oceans, so countries must agree quotas together.\nIdeas about Science (BCP7, "decisions about science and technology"): identify who benefits and who bears the costs and risks; weigh up; consider sustainability and ethics. Farm figures illustrative (asserted).');
  reg(s, 'B6.3.2 Benefits and challenges');
}

// ======================= 14 DATA: DOES CONSERVATION WORK? =======================
{
  const s = D.contentHeader('Data: does conservation work?', `Specification ${sp('B6.3.2')} • using data to evaluate fishing quotas`, { tag: 'B6.3.2' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'plotted to scale from the table (illustrative values based on the North Sea cod pattern)');
  const g = { x: 1.45, y: 1.55, w: 5.3, h: 3.4, xmin: 1970, xmax: 2020, ymin: 0, ymax: 300, xstep: 10, ystep: 50, minor: 2, xlabel: 'Year', ylabel: 'Breeding cod / thousand tonnes' };
  D.axes(s, g);
  box(s, D.px(g, 2006), g.y, D.px(g, 2020) - D.px(g, 2006), g.h, 'D8F0E2', null, { tr: 45 });
  label(s, D.px(g, 2006) + 0.05, g.y + 0.05, 1.5, 'recovery plan and quotas', { size: 10, bold: true, color: C.green, align: 'left', h: 0.4, valign: 'top' });
  const pts = COD_Y.map((y, i) => [y, COD[i]]);
  D.plotLine(s, g, pts, C.blue, 2.25); D.points(s, g, pts, C.ink);
  const rows = [[HDR('Year'), ...COD_Y.map(y => HDR(String(y)))], [tcell('kt', 0, { bold: true }), ...COD.map(v => tcell(String(v), 0))]];
  s.addTable(rows, { x: 0.7, y: 5.45, w: 6.1, colW: [0.62, ...Array(8).fill(5.48 / 8)], rowH: 0.21, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.card(s, 7.3, 1.3, 5.58, 2.55, 'Reading the evidence', [
    '1970–2000: stock fell steeply as fishing removed fish faster than they could breed.',
    'After quotas, closed areas and bigger net mesh (2006), the stock **rose**: evidence the plan helped.',
    'But it **fell again** after 2015: other factors (warming seas, more fishing) also matter. Correlation is not proof.',
  ], { size: 11 });
  D.workedSteps(s, 7.3, 4.0, 5.58, 2.25, 'Worked example: percentage change', '', [
    ['Fall', `1970 → 2000: (${COD[0]} − ${COD[3]}) ÷ ${COD[0]} × 100 = **82%** fall`],
    ['Rise', `2006 → 2015: (${COD[6]} − ${COD[4]}) ÷ ${COD[4]} × 100`],
    ['Answer', '= **275%** increase during the recovery plan']], { size: 10.5 });
  D.quickCheck(s, `Calculate the percentage change from 2015 to 2020. Suggest **one** reason, other than fishing, why the stock might fall.`);
  D.notes(s, 'QUICK CHECK ANSWER: (90 − 150) ÷ 150 × 100 = −40% (a 40% decrease). Other reasons: warming water (cod prefer cold water and move north), less food (plankton changes), disease, natural variation, or quotas raised / illegal fishing.\nValues are illustrative but follow the real pattern of North Sea cod spawning stock biomass (collapse to about 2006, recovery plan, partial recovery, decline after about 2015; ICES advice). Not real ICES numbers: UNVERIFIED. IaS: a correlation between the plan and the rise; evaluate with other possible causes.');
  reg(s, 'B6.3.2 Data: fishing quotas');
}

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B6.3.1')}, ${sp('B6.3.2')} • protecting biodiversity`, [
  { q: 'Explain how a **seed bank** helps to protect biodiversity.', marks: 2, ms: 'Stores seeds of many species / varieties (1); keeps genetic diversity so plants can be regrown / reintroduced if lost in the wild (1).' },
  { q: 'Give **one** benefit and **one** challenge of turning farmland into a nature reserve.', marks: 2, ms: 'Benefit: more habitats / species / pollinators / tourism (1). Challenge: less food produced / farmer loses income / cost (1).' },
  { q: 'A fish stock fell from **200** to **50** thousand tonnes. Calculate the percentage decrease.', marks: 2, ms: '(200 − 50) ÷ 200 × 100 (1); = 75% (1).' },
  { q: 'Suggest why international agreements are needed to protect whales.', marks: 2, ms: 'Whales move across the oceans / between countries\' waters (1); one country alone cannot protect them / all countries must agree to stop hunting (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 ACTIVITY METHOD =======================
reg(D.contentSlide({
  title: 'Comparing two sites: method',
  subtitle: `Specification ${sp('B6.3.2')} • recap of B3 sampling: is a wildflower meadow more diverse than a mown lawn?`,
  tag: 'Activity', pag: 'SUGGESTED ACTIVITY', caption: 'apparatus: 0.5 m quadrat, two tape measures, random number table, identification key',
  draw: (s) => {
    // site plan with tape axes and random quadrats
    box(s, 0.75, 1.55, 3.1, 2.9, 'DDEFD2', '5E9E4A', { lw: 1.25 });
    line(s, 0.75, 4.45, 3.85, 4.45, 'E0B030', 4); line(s, 0.75, 4.45, 0.75, 1.55, 'E0B030', 4);
    label(s, 0.75, 4.55, 3.1, 'tape measures along two edges', { size: 10, italic: true, color: C.grey, h: 0.22 });
    [[1.3, 2.0], [2.6, 1.8], [1.9, 3.0], [3.1, 3.4], [1.1, 3.75]].forEach(([x, y], i) => {
      box(s, x, y, 0.35, 0.35, null, '7A6A4A', { lw: 1.5 });
      label(s, x, y, 0.35, String(i + 1), { size: 10, bold: true, h: 0.35 });
    });
    label(s, 0.75, 1.25, 3.1, '**Site A**: unmown meadow', { size: 10.5, h: 0.28 });
    // large quadrat
    quadrat(s, 4.2, 1.6, 2.0);
    flower(s, 4.55, 2.2, 0.22); flower(s, 5.3, 2.6, 0.22, 'C8414C'); flower(s, 5.85, 3.1, 0.22, 'F2F2F2'); flower(s, 4.8, 3.3, 0.22, '8E44AD');
    grass(s, 4.3, 3.5, 1.8, 10); ball(s, 5.6, 1.95, 0.08, '7DBE6A', '3E7F2E'); ball(s, 4.4, 2.8, 0.1, '9BC53D', '3E7F2E');
    label(s, 4.2, 3.65, 2.0, 'quadrat 0.5 m × 0.5 m = **0.25 m²**', { size: 10, h: 0.4 });
    // key
    box(s, 4.2, 4.15, 2.0, 1.05, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.25, 4.18, 1.9, '**Key**\n1 Petals? yes → 2; no → grass\n2 Yellow? yes → buttercup; no → daisy', { size: 10, h: 0.98, align: 'left', valign: 'top' });
    label(s, 0.75, 4.9, 3.2, 'random coordinates from a random number generator', { size: 10, h: 0.45, valign: 'top' });
  },
  head: 'Method',
  lines: [
    'Lay two tapes at right angles along the edges of site A. Use **random numbers** as coordinates.',
    'Place the quadrat at each coordinate. **Identify** and count the **number of different species** inside it (use a key).',
    'Repeat for **5** quadrats (more is better), then do the same on site B (mown lawn).',
    '**IV**: site (mown or unmown). **DV**: number of species per quadrat. **Control**: quadrat size, same day, same key and same person identifying.',
    '**Safety**: wash hands; watch for stinging plants, dog mess and allergies.',
  ],
  size: 11,
  worked: { head: 'Worked example: how much was sampled?', q: 'Site A is 10 m × 10 m. Five 0.25 m² quadrats were used.',
    steps: [['Site area', '10 × 10 = 100 m²'], ['Sampled', '5 × 0.25 = 1.25 m²'], ['Answer', '1.25 ÷ 100 × 100 = **1.25%** of the site sampled']], size: 10.5 },
  workedH: 1.55,
  qc: 'Why are quadrats placed **randomly**? Why should the **same** quadrat size be used at both sites?',
  notes: 'QUICK CHECK ANSWER: Random placement avoids bias (choosing interesting patches) so the sample is representative. Same size so that the number of species is compared fairly: a bigger quadrat would find more species.\nThis is a suggested activity to apply B6.3.2 (judging biodiversity with data). Random quadrat sampling and transects were taught in Chapter B3 (J260 B3 practical work; PAG B2 in the OCR practical scheme covers sampling, UNVERIFIED code) and are recapped only. No PAG is linked to B6.3 in any source found.',
}), 'Activity: comparing two sites (method)');

// ======================= 17 ACTIVITY RESULTS =======================
{
  const s = D.contentHeader('Comparing two sites: results', `Specification ${sp('B6.3.2')} • means, ranges and scaling up from quadrats`, { pag: 'SUGGESTED ACTIVITY', tag: 'Activity' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'bar chart of mean species per quadrat, to scale; bars show the range');
  const g = { x: 1.5, y: 1.55, w: 5.2, h: 3.6, xmin: 0, xmax: 3, ymin: 0, ymax: 12, xstep: 1, ystep: 2, minor: 2, ylabel: 'Species per quadrat', fmt: () => '', yfmt: v => String(v) };
  D.axes(s, g);
  bars(s, g, [[1, mA, '7DBE6A'], [2, mB, 'C9B21E']]);
  [[1, QA], [2, QB]].forEach(([xv, q]) => {
    line(s, D.px(g, xv), D.py(g, Math.max(...q)), D.px(g, xv), D.py(g, Math.min(...q)), C.ink, 1.5);
    line(s, D.px(g, xv) - 0.12, D.py(g, Math.max(...q)), D.px(g, xv) + 0.12, D.py(g, Math.max(...q)), C.ink, 1.5);
    line(s, D.px(g, xv) - 0.12, D.py(g, Math.min(...q)), D.px(g, xv) + 0.12, D.py(g, Math.min(...q)), C.ink, 1.5);
  });
  label(s, D.px(g, 1) - 0.8, g.y + g.h + 0.08, 1.6, '**A** meadow', { size: 10.5, h: 0.24 });
  label(s, D.px(g, 2) - 0.8, g.y + g.h + 0.08, 1.6, '**B** lawn', { size: 10.5, h: 0.24 });
  label(s, g.x, g.y + g.h + 0.35, g.w, 'Site', { size: 10.5, bold: true, h: 0.24 });
  const rows = [[HDR('Quadrat'), ...[1, 2, 3, 4, 5].map(n => HDR(String(n))), HDR('Mean')],
    [tcell('A species', 0, { bold: true }), ...QA.map(v => tcell(String(v), 0)), tcell(fmt(mA), 0, { bold: true })],
    [tcell('B species', 1, { bold: true }), ...QB.map(v => tcell(String(v), 1)), tcell(fmt(mB), 1, { bold: true })],
    [tcell('B daisies', 0, { bold: true }), ...DAIS.map(v => tcell(String(v), 0)), tcell(fmt(dQ), 0, { bold: true })]];
  s.addTable(rows, { x: 7.3, y: 1.3, w: 5.58, colW: [1.28, 0.7, 0.7, 0.7, 0.7, 0.7, 0.8], rowH: 0.29, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 7.3, 2.6, 5.58, 2.05, 'Worked example: daisies on the lawn (50 m²)', '', [
    ['Mean', `(${DAIS.join(' + ')}) ÷ 5 = ${fmt(dQ)} per quadrat`],
    ['Per m²', `${fmt(dQ)} ÷ 0.25 = ${fmt(dM)} per m²`],
    ['Answer', `${fmt(dM)} × 50 = **${fmt(dM * 50)} daisies**`]], { size: 10.5 });
  D.card(s, 7.3, 4.8, 5.58, 1.45, 'Conclusion and errors', [
    `A has a higher mean (${fmt(mA)} vs ${fmt(mB)}) and the ranges **do not overlap**: mowing lowers diversity.`,
    'Errors: species missed or misidentified; only 5 quadrats → use more; tiny seedlings hard to count.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Calculate the **range** for site A. Why does a range that does **not overlap** make the conclusion more convincing?');
  D.notes(s, `QUICK CHECK ANSWER: Range A = 10 − 6 = 4 species. If the ranges do not overlap, even the lowest value at A is higher than the highest at B, so the difference is unlikely to be due to chance / variation between quadrats; the difference is real (more confidence).\nAll values illustrative, asserted in node: means 8 and 3, ranges 4 and 2; daisies 5 per 0.25 m² → 20 per m² → 1000 on 50 m². A total species list (all quadrats) could also be compared: species richness of the site.`);
  reg(s, 'Activity: comparing two sites (results)');
}

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B6.3.2')} • sampling data`, [
  { q: 'Four quadrats contained **4, 6, 5** and **9** buttercups. Calculate the mean number per quadrat.', marks: 2, ms: '(4 + 6 + 5 + 9) ÷ 4 = 24 ÷ 4 (1); = 6 (1).' },
  { q: 'Each quadrat is **0.25 m²**. Use your answer to estimate the number of buttercups per m².', marks: 2, ms: '6 ÷ 0.25 (1); = 24 per m² (1). Allow error carried forward.' },
  { q: 'Explain why quadrats should be placed at **random** coordinates.', marks: 2, ms: 'To avoid bias / the person choosing sites (1); so the sample is representative of the whole area (1).' },
  { q: 'Suggest **two** ways to make the comparison of two sites more **repeatable**.', marks: 2, ms: 'Any two (1 each): more quadrats; same quadrat size; same identification key / person; same day / season; repeat on different days.' },
]);
reg(R4.s, 'Recap 4');

// ======================= 19 FOOD SECURITY =======================
{
  const g = { x: 1.45, y: 1.6, w: 4.85, h: 3.2, xmin: 1950, xmax: 2050, ymin: 0, ymax: 10, xstep: 25, ystep: 2, minor: 2, xlabel: 'Year', ylabel: 'World population / billions' };
  reg(D.contentSlide({
    title: 'Food security',
    subtitle: `Specification ${sp('B6.3.4')} • biological factors that affect whether everyone has enough safe, nutritious food`,
    tag: 'B6.3.4', caption: 'world population, plotted to scale (UN estimates; 2050 is a projection)',
    draw: (s) => {
      D.axes(s, g);
      box(s, D.px(g, 2025), g.y, D.px(g, 2050) - D.px(g, 2025), g.h, 'FFF4E0', null, { tr: 30 });
      label(s, D.px(g, 2025) + 0.05, D.py(g, 2.0), 1.1, 'projected', { size: 10, italic: true, color: C.orange, align: 'left', h: 0.22 });
      const pts = POP_Y.map((y, i) => [y, POP[i]]);
      D.plotLine(s, g, pts.slice(0, 4), C.blue, 2.25); D.plotLine(s, g, pts.slice(3), C.blue, 2.25, { dash: 'dash' });
      D.points(s, g, pts, C.ink);
      POP.forEach((v, i) => label(s, D.px(g, POP_Y[i]) - 0.55, D.py(g, v) - 0.3, 0.5, String(v), { size: 10, bold: true, color: C.blue, h: 0.22 }));
    },
    head: 'Threats to food security',
    lines: [
      '**Growing population**: more people need more food.',
      '**Changing diets**: richer people eat more **meat**; feeding animals uses far more crops and land.',
      '**New pests and pathogens**: e.g. fungal diseases of wheat and bananas; pests evolve resistance to pesticides.',
      '**Environmental change**: drought, floods and higher temperatures lower yields; soil is eroded.',
      '**Agricultural inputs**: fertiliser, pesticides, water and fuel cost money and may not be **sustainable**.',
      'Conflict and poverty also stop people getting food.',
    ],
    size: 11,
    worked: { head: 'Worked example: population growth', q: 'Population 2000: 6.1 billion; 2050 (projected): 9.7 billion.',
      steps: [['Increase', '9.7 − 6.1 = 3.6 billion'], ['Percentage', '3.6 ÷ 6.1 × 100 = 59%'], ['Answer', 'about **59%** more people to feed']], size: 10.5 },
    workedH: 1.55,
    qc: 'Explain why eating **less meat** could improve food security. How many times larger was the population in 2025 than in 1950?',
    notes: 'QUICK CHECK ANSWER: Energy is lost at each trophic level (B3), so feeding crops to animals and eating the animals feeds fewer people than eating the crops directly; land used for animal feed could grow food for people. 8.2 ÷ 2.5 = 3.3 times.\nPopulation values: UN World Population Prospects (approximate: 2.5, 4.1, 6.1, 8.2 billion; 2050 about 9.7 billion projected): UNVERIFIED to 2 s.f. B6.3.4 wording (J257 B6.4): "describe some of the biological factors affecting levels of food security including increasing human population, changing diets in wealthier populations, new pests and pathogens, environmental change, sustainability and cost of agricultural inputs". J260 inclusion: medium confidence (see SPEC_B6_3.md).',
  }), 'B6.3.4 Food security');
}

// ======================= 20 SOLUTIONS =======================
reg(D.contentSlide({
  title: 'Solutions: farming and biotechnology',
  subtitle: `Specification ${sp('B6.3.5')} • agricultural and biotechnological solutions, including genetic modification`,
  tag: 'B6.3.5', caption: 'making a GM crop (recap of B1); not to scale',
  draw: (s) => {
    label(s, 0.65, 1.45, 5.7, '**1** Cut out a useful gene (e.g. pest resistance) from another organism', { size: 10.5, align: 'left', h: 0.3 });
    dnaStrip(s, 0.85, 1.85, 5.2, 2.6, 3.6);
    label(s, 2.4, 2.18, 1.4, 'useful gene', { size: 10, bold: true, color: HI, h: 0.22 });
    label(s, 0.65, 2.5, 5.7, '**2** Insert it into the plant cell\'s DNA (using a bacterium or virus as a **vector**)', { size: 10.5, align: 'left', h: 0.3 });
    D.plantCell(s, 1.1, 2.9, 1.9, 1.3);
    arrow(s, 3.2, 3.55, 3.9, 3.55, C.ink, 2);
    label(s, 3.15, 3.25, 0.8, '**3** grow', { size: 10, h: 0.25 });
    label(s, 0.65, 4.65, 5.7, '**3** Grow the cell into a whole plant: every cell has the new gene', { size: 10.5, align: 'left', h: 0.3 });
    // plants: one eaten (holes), one GM healthy
    const plant = (cx, base, gm) => {
      line(s, cx, base, cx, base - 1.3, '3E7F2E', 2.5);
      [[-1, 0.35], [1, 0.6], [-1, 0.85], [1, 1.1]].forEach(([d, h]) => {
        oval(s, cx + d * 0.25, base - h, 0.45, 0.2, gm ? '4E9A3E' : '9BC53D', '2F6B24', { rot: d * -20, lw: 0.75 });
        if (!gm) ball(s, cx + d * 0.3, base - h, 0.04, 'FFFFFF', '9BC53D');
      });
    };
    plant(4.4, 4.2, false); plant(5.6, 4.2, true);
    label(s, 3.85, 4.25, 1.1, 'pest damage', { size: 10, color: HI, bold: true, h: 0.22 });
    label(s, 5.0, 4.25, 1.3, 'GM: resists pest', { size: 10, color: C.green, bold: true, h: 0.22 });
    label(s, 0.65, 5.05, 5.7, 'Other GM examples: drought-tolerant maize, Golden Rice (vitamin A), herbicide-tolerant soya', { size: 10, italic: true, color: C.grey, h: 0.45, align: 'left' });
  },
  head: 'Ways to produce more food',
  lines: [
    '**GM crops**: pest or disease resistance, drought tolerance, extra nutrients → higher, more reliable **yields**.',
    '**Selective breeding** of high-yield, disease-resistant varieties.',
    '**Biological pest control**, integrated pest management, crop rotation, hydroponics, fish farming.',
    '**Benefits**: more food from the same land, less pesticide spraying, so less pressure to clear forests.',
    '**Risks and concerns**: genes may spread to wild plants; pests may evolve resistance; effects on insects and food webs; cost of seed to poor farmers; some people object on ethical grounds.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: yield increase', q: 'A normal variety yields 6.0 t/ha; a GM pest-resistant variety yields 7.2 t/ha.',
    steps: [['Increase', '7.2 − 6.0 = 1.2 t/ha'], ['Answer', '1.2 ÷ 6.0 × 100 = **20%** higher yield']], size: 10.5 },
  workedH: 1.3,
  qc: 'Give **one** benefit and **one** risk of growing GM crops. A yield rises from **4.0** to **5.0 t/ha**: what is the % increase?',
  notes: 'QUICK CHECK ANSWER: Benefit: higher yield / less pesticide / grows in drought / more nutritious. Risk: gene transfer to wild relatives (superweeds); pests become resistant; harm to non-target insects; reduced genetic diversity / monoculture; cost; unknown long-term effects. (5.0 − 4.0) ÷ 4.0 × 100 = 25%.\nThe GM technique itself is J260 B1 (recap only: three steps, no enzymes named here). B6.3.5 wording (J257 B6.4): "describe and explain some possible biotechnological and agricultural solutions, including genetic modification, to the demands of the growing human population". IaS: benefits, risks, and who makes decisions (regulation of GM crops differs between countries). Medium confidence that this statement is in J260.',
}), 'B6.3.5 Farming and GM solutions');

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('B6.3.4')}, ${sp('B6.3.5')} • food security and solutions`, [
  { q: 'Give **two** biological factors that threaten food security.', marks: 2, ms: 'Any two (1 each): growing population; more meat in diets; new pests / pathogens / diseases; climate / environmental change, drought; cost / sustainability of fertiliser, pesticides, water.' },
  { q: 'Explain how a pest-resistant GM crop could **increase** food security.', marks: 2, ms: 'Less of the crop is eaten / damaged by pests (1); so the yield is higher / more food from the same land (1).' },
  { q: 'Give **one** concern people have about growing GM crops.', marks: 2, ms: 'Named concern (1) with reason (1), e.g. genes spread to wild plants (1) creating herbicide-resistant weeds (1); or harm to insects (1) that eat or pollinate the crop (1).' },
  { q: 'Suggest how producing more food on existing farmland could help protect **biodiversity**.', marks: 2, ms: 'Less need to clear forests / habitats for new farmland (1); so habitats and species are kept (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Biodiversity', 'The variety of living organisms in an area: genes, species and ecosystems.'],
  ['Ecosystem services', 'Benefits from nature: food, medicines, pollination, clean water, carbon storage.'],
  ['Extinction', 'When no individuals of a species are left anywhere; biodiversity is lost for ever.'],
  ['Monoculture', 'A large area growing one crop variety: low biodiversity.'],
  ['Deforestation', 'Cutting down forests for farmland, timber or building.'],
  ['Eutrophication', 'Nutrient pollution → algal bloom → plants die → oxygen used up → animals die.'],
  ['Overexploitation', 'Taking fish, animals or trees faster than populations can recover.'],
  ['Invasive species', 'A non-native species that harms native species, e.g. grey squirrel.'],
  ['Indicator species (HT)', 'Organism whose presence shows the level of pollution, e.g. lichens, stoneflies.'],
  ['Conservation', 'Protecting species and habitats, e.g. reserves, breeding programmes.'],
  ['Seed bank', 'A store of dried, frozen seeds that keeps plant genetic diversity.'],
  ['Captive breeding', 'Breeding endangered animals in zoos and releasing them into the wild.'],
  ['Quota', 'A legal limit on how much fish may be caught.'],
  ['Food security', 'Everyone has reliable access to enough safe, nutritious food.'],
  ['GM crop', 'A crop with a gene from another organism, e.g. for pest resistance.'],
  ['Sustainable', 'Meeting needs today without harming the ability to meet future needs.'],
], { notes: 'Use as a cover-and-recall activity. "Indicator species" is linked to the HT statement B6.3.3, though the term itself may also appear in Foundation questions. Interdependence is a B3 recap term.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A farmer removes hedgerows to make bigger fields. The length of hedgerow on the farm fell from **800 m** in 1950 to **440 m** in 2000. A conservation group counted nesting birds along the hedges in three years: **12**, **15** and **9** nests.', [
  { l: 'a', q: 'Calculate the percentage of hedgerow lost from 1950 to 2000.', marks: 2, ms: '(800 − 440) ÷ 800 × 100 (1); = 45% (1).' },
  { l: 'b', q: 'Calculate the mean number of nests.', marks: 1, ms: '(12 + 15 + 9) ÷ 3 = 12 (1).' },
  { l: 'c', q: 'Explain why removing hedgerows **reduces biodiversity** on the farm.', marks: 2, ms: 'Fewer habitats / nesting sites / food sources (1); so fewer species can live there / species cannot move between areas (1).', h: 1.1 },
  { l: 'd', q: 'The farmer is offered money to replant hedges. Give **one** benefit and **one** challenge for the farmer.', marks: 2, ms: 'Benefit: more pollinators / pest predators / payment / less soil erosion (1). Challenge: less land for crops / lower yield / cost of planting and care (1).', h: 1.1 },
  { l: 'e', q: 'Describe **three** other ways in which humans can protect biodiversity.', marks: 3, ms: 'Any three (1 each): protected areas / reserves / national parks; captive breeding programmes; seed banks; fishing quotas / hunting laws; replanting forests / restoring habitats; reducing pollution; controlling invasive species.', h: 1.2 },
  { l: 'f', q: 'Fewer mayfly nymphs are found in a stream next to the farm than upstream. **Evaluate** whether this shows that fertiliser run-off is polluting the stream.', marks: 3, ht: true, ms: 'Mayfly nymphs are indicator species needing high oxygen (1); fertiliser can cause eutrophication / low oxygen, so a plausible cause (1); but only a correlation / other factors (e.g. flow, temperature, shade) / need oxygen or nitrate measurements and repeats (1).', h: 1.3 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (f) is HT` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Habitat loss: deforestation for farming / timber; building; draining peat bogs; hedgerow removal → fewer habitats and niches, species die out.',
    'Pollution: fertiliser / sewage → eutrophication → oxygen falls → fish die; pesticides kill insects; acid gases kill lichens.',
    'Global warming from burning fossil fuels: species must move or die; coral bleaching.',
    'Overexploitation: overfishing, hunting, logging faster than populations recover.',
    'Invasive species: compete with / prey on / spread disease to native species (e.g. grey squirrel).',
    'Protection: protected areas, captive breeding, seed banks, quotas and laws, habitat restoration, sustainable farming, reducing pollution, controlling invasive species.',
    'Evaluation: benefits (species saved, ecosystem services) vs challenges (cost, land for food, local jobs, need for international agreement and enforcement).',
  ], {
    l3: 'Describes at least TWO human threats AND explains how each reduces biodiversity, AND describes at least TWO ways biodiversity can be protected, explaining how they work or their challenges.',
    l2: 'Describes some threats AND some methods of protection, with some explanation of how one works.',
    l1: 'Simple statements, e.g. "cutting down trees" or "zoos protect animals".',
  });
}
const HW = [
  { n: '1', q: 'Name the type of organism that is **sensitive to sulfur dioxide** and is used to monitor air pollution.', marks: 1, ms: 'Lichen (1).' },
  { n: '2', q: 'A tiger population rose from **3200** to **3900**. Calculate the percentage increase (2 s.f.).', marks: 2, ms: '(3900 − 3200) ÷ 3200 × 100 (1); = 22% (21.875) (1).' },
  { n: '3', q: 'A quadrat of **0.25 m²** contained a mean of **7** plantains. Estimate the number on a **400 m²** field.', marks: 2, ms: '7 ÷ 0.25 = 28 per m² (1); × 400 = 11 200 (1).' },
  { n: '4', q: 'Explain why a **seed bank** stores seeds from many varieties of the same crop.', marks: 2, ms: 'Keeps genetic diversity / different alleles (1); varieties may be needed in future, e.g. for disease or drought resistance (1).' },
  { n: '5', q: 'Evaluate the claim: "More stoneflies downstream proves the water there is cleaner."', marks: 2, ht: true, ms: 'Stoneflies are indicators of high oxygen / clean water so supports the claim (1); but correlation only / other factors / need measurements of oxygen or repeats, so not proof (1).', h: 1.15 },
  { n: '6', q: 'Explain how a **growing** world population can threaten **both** food security and biodiversity.', marks: 2, ms: 'More food needed so more land farmed / more fishing (1); forests / habitats cleared or fish overexploited, so biodiversity falls (1).', h: 1.15 },
  { n: '7', q: 'Describe how human activities **reduce biodiversity**, and explain how biodiversity can be **protected**.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q5 is Higher tier.', HW, 17, { dividerSub: 'B6.3 Biodiversity • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
const out = path.join(__dirname, 'OCR21C_B6.3_Biodiversity_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
