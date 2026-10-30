// build_B6_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B6 Life on Earth – past, present and future, B6.2 How does our understanding of biology help us classify the
// diversity of organisms on Earth? (one deck, Higher & Foundation; Part 2 of 3 B6 decks in J260)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B6_2.js
// Structure copied from build_B5_6.js. ocr_bio_template.js is NOT edited by this deck: the tree, DNA-row, organism-token,
// shark/dolphin and kingdom-icon helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_B6_2.md): J260 B6.2 (= J257 B6.3): describe the impact of developments in biology on classification
// systems, including the use of DNA analysis to classify organisms. No HT statement was found. Natural selection and
// the development of evolutionary theory are B6.1 (recap only). Electron microscopy (B4.2) and prokaryotic / eukaryotic
// cells (B1.1) are recapped only.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B6', chapterTitle: 'Life on Earth – past, present and future', code: 'B6.2',
  title: 'How does our understanding of biology help us classify the diversity of organisms on Earth?',
  part: 2, parts: 3, specRange: 'B6.2.1',
  subtitle: 'How does our understanding of biology help us classify the diversity of organisms on Earth?',
  keywords: ['Classification', 'Species', 'Binomial name', 'Three domains', 'DNA sequences', 'Evolutionary trees'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));
const pct = (a, b) => a / b * 100;

// ======================= CALCULATIONS (asserted) =======================
// slide 5: how many species are named? (Mora et al. 2011, eukaryotes: ~1.2 million catalogued, ~8.7 million estimated)
const NAMED = 1.2, EST = 8.7;
const pNamed = calc('% of species named 1.2 ÷ 8.7 × 100', pct(NAMED, EST), 13.793103448275861, 1e-9);
calc('% named 2 s.f.', sf(pNamed, 2), 14, 1e-12);
calc('QC not yet named 8.7 − 1.2', EST - NAMED, 7.5, 1e-9);
// slide 6: Panthera leo vs Panthera tigris share 7 of 8 levels (domain → genus)
calc('lion/tiger shared levels 8 − 1', 8 - 1, 7);
// slide 9: magnification recap: bacterium 2 µm at ×1000 → image 2 mm
calc('image size 2 µm × 1000 in µm', 2 * 1000, 2000);
calc('2000 µm in mm', 2000 / 1000, 2);
calc('QC magnification 5 mm ÷ 2.5 µm', 5000 / 2.5, 2000);
// slides 11–12: illustrative 20-base DNA section (great apes). Ancestral sequence, then mutations along the tree
// ((Human, Chimp), Gorilla), Orangutan.
const ANC = 'ATGGCTACCGTAAGCTTCGA';
assert.strictEqual(ANC.length, 20);
const mut = (seq, list) => { const a = seq.split(''); list.forEach(([i, b]) => { assert.notStrictEqual(a[i], b, 'mutation must change the base'); a[i] = b; }); return a.join(''); };
const M_HC = [[5, 'C']], M_HCG = [[12, 'G']], M_C = [[16, 'C']], M_G = [[2, 'A']], M_O = [[8, 'T'], [14, 'A'], [18, 'A']];
const SEQ = {
  Human: mut(ANC, [...M_HCG, ...M_HC]),
  Chimpanzee: mut(ANC, [...M_HCG, ...M_HC, ...M_C]),
  Gorilla: mut(ANC, [...M_HCG, ...M_G]),
  Orangutan: mut(ANC, M_O),
};
const NAMES = Object.keys(SEQ);
const diff = (a, b) => a.split('').filter((c, i) => c !== b[i]).length;
const DM = {}; NAMES.forEach(a => { DM[a] = {}; NAMES.forEach(b => { DM[a][b] = diff(SEQ[a], SEQ[b]); }); });
calc('H–C differences', DM.Human.Chimpanzee, 1);
calc('H–G differences', DM.Human.Gorilla, 2);
calc('C–G differences', DM.Chimpanzee.Gorilla, 3);
calc('H–O differences', DM.Human.Orangutan, 5);
calc('C–O differences', DM.Chimpanzee.Orangutan, 6);
calc('G–O differences', DM.Gorilla.Orangutan, 5);
const sim = (a, b) => pct(20 - DM[a][b], 20);
calc('H–C % same', sim('Human', 'Chimpanzee'), 95, 1e-9);
calc('H–G % same (worked)', sim('Human', 'Gorilla'), 90, 1e-9);
calc('C–G % same', sim('Chimpanzee', 'Gorilla'), 85, 1e-9);
calc('H–O % same', sim('Human', 'Orangutan'), 75, 1e-9);
calc('C–O % same (worked slide 12)', sim('Chimpanzee', 'Orangutan'), 70, 1e-9);
calc('G–O % same', sim('Gorilla', 'Orangutan'), 75, 1e-9);
// the pair with the fewest differences is Human–Chimpanzee
const pairs = []; NAMES.forEach((a, i) => NAMES.slice(i + 1).forEach(b => pairs.push([a, b, DM[a][b]])));
const minPair = pairs.reduce((m, p) => p[2] < m[2] ? p : m);
assert.deepStrictEqual(minPair.slice(0, 2), ['Human', 'Chimpanzee']);
// approximate split dates used on the tree (million years ago; textbook values, approximate)
const SPLIT = { HC: 6.5, G: 9, O: 15 };
calc('years between gorilla and chimp splits 9 − 6.5', SPLIT.G - SPLIT.HC, 2.5, 1e-9);
// slide 18: timeline to scale
const TL = [[1735, 'Linnaeus: Systema Naturae'], [1859, 'Darwin: On the Origin of Species'], [1866, 'Haeckel: 3 kingdoms (adds Protista)'], [1931, 'first electron microscope'], [1953, 'DNA structure'], [1969, 'Whittaker: 5 kingdoms'], [1977, 'Woese: Archaea found'], [1990, 'Woese: 3 domains'], [2003, 'human genome sequenced']];
calc('1990 − 1735', 1990 - 1735, 255);
calc('1990 − 1969', 1990 - 1969, 21);
calc('QC 1977 − 1931', 1977 - 1931, 46);
// starter, recaps, FQ, HW
calc('starter 18 ÷ 20 × 100', pct(18, 20), 90, 1e-9);
calc('R2 magnification 6 mm ÷ 3 µm', 6000 / 3, 2000);
calc('R3 50 bases, 4 differences', pct(50 - 4, 50), 92, 1e-9);
calc('R5 % not named (8.7 − 1.2) ÷ 8.7', sf(pct(EST - NAMED, EST), 3), 86.2, 1e-12);
calc('FQ lion–tiger 40 bases, 4 differences', pct(40 - 4, 40), 90, 1e-9);
calc('FQ lion–leopard 40 bases, 2 differences', pct(40 - 2, 40), 95, 1e-9);
calc('FQ lion–cat 40 bases, 10 differences', pct(40 - 10, 40), 75, 1e-9);
calc('HW 60 bases, 3 differences', pct(60 - 3, 60), 95, 1e-9);

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
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
const GRP = { mammal: ['F3D9C4', 'A0603A'], bird: ['DCE8F8', '3F6FB5'], fish: ['D6EFEA', '2E7F74'], insect: ['F6EAB8', '9A7C10'] };
// organism token: rounded box coloured by its natural group
function token(s, x, y, name, grp, w = 1.15) { pbox(s, x, y, w, 0.42, name, GRP[grp][0], GRP[grp][1], { size: 10.5, bold: true }); }
// evolutionary tree, time running left (past) to right (present). t = {name} tip or {age, children, label}.
// o = {x, y, w, h, maxAge, color, lw, tipW, tipSize, dots}
function drawTree(s, t, o) {
  const tips = [];
  (function collect(n) { if (n.children) n.children.forEach(collect); else tips.push(n); })(t);
  const dy = o.h / Math.max(1, tips.length - 1);
  tips.forEach((tp, i) => { tp._y = o.y + i * dy; });
  const X = age => o.x + (o.maxAge - age) / o.maxAge * o.w;
  const col = o.color || C.ink, lw = o.lw || 2.25;
  (function pos(n) {
    if (!n.children) { n._x = X(0); return n._y; }
    const ys = n.children.map(pos);
    n._y = (Math.min(...ys) + Math.max(...ys)) / 2; n._x = X(n.age);
    line(s, n._x, Math.min(...ys), n._x, Math.max(...ys), col, lw);
    n.children.forEach(c => line(s, n._x, c._y, c._x, c._y, c.color || col, lw));
    return n._y;
  })(t);
  if (o.stem !== false) line(s, t._x - (o.stem || 0.25), t._y, t._x, t._y, col, lw);
  tips.forEach(tp => label(s, tp._x + 0.08, tp._y - 0.15, o.tipW || 1.4, tp.name, { size: o.tipSize || 11, bold: true, color: tp.color || C.ink, align: 'left', h: 0.3 }));
  (function nodes(n) {
    if (!n.children) return;
    if (o.dots !== false) ball(s, n._x, n._y, 0.07, n.dot || C.orangeTab, C.orange, 0.75);
    if (n.label) label(s, n._x - 0.5, n._y + 0.05, 0.42, n.label, { size: 10.5, bold: true, color: C.orange, h: 0.24, align: 'right' });
    n.children.forEach(nodes);
  })(t);
  return { X };
}
// one row of DNA bases; bases different from ref are highlighted
function dnaRow(s, x, y, seq, ref, bw = 0.255) {
  seq.split('').forEach((b, i) => {
    const d = ref && b !== ref[i];
    box(s, x + i * bw, y, bw - 0.03, 0.34, d ? 'FBD5D8' : C.white, d ? C.red : 'A9C3C0', { lw: d ? 1.25 : 0.75 });
    label(s, x + i * bw, y, bw - 0.03, b, { size: 11, bold: true, color: d ? C.red : C.ink, h: 0.34 });
  });
}
// shark (side view, facing left) at body centre (cx, cy), length L
function shark(s, cx, cy, L) {
  const col = '8C9AAB', edge = '4F5D6E';
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx + L * 0.36, y: cy - L * 0.24, w: L * 0.16, h: L * 0.25, rotate: 25, fill: { color: col }, line: { color: edge, width: 1 } });
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx + L * 0.36, y: cy - 0.01, w: L * 0.12, h: L * 0.16, rotate: 155, fill: { color: col }, line: { color: edge, width: 1 } });
  oval(s, cx, cy, L * 0.86, L * 0.2, col, edge, { lw: 1.25 });
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - L * 0.05, y: cy - L * 0.2, w: L * 0.14, h: L * 0.13, rotate: 10, fill: { color: col }, line: { color: edge, width: 1 } });
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - L * 0.12, y: cy + L * 0.06, w: L * 0.14, h: L * 0.1, rotate: 200, fill: { color: col }, line: { color: edge, width: 1 } });
  [0, 1, 2, 3].forEach(i => line(s, cx - L * 0.24 + i * 0.05, cy - L * 0.05, cx - L * 0.25 + i * 0.05, cy + L * 0.04, edge, 1));
  ball(s, cx - L * 0.33, cy - L * 0.03, 0.03, '263040');
}
// dolphin (side view, facing left)
function dolphin(s, cx, cy, L) {
  const col = '6F8FB0', edge = '3B5878';
  oval(s, cx + L * 0.47, cy, L * 0.2, L * 0.05, col, edge, { lw: 1 });
  oval(s, cx, cy, L * 0.86, L * 0.2, col, edge, { lw: 1.25 });
  oval(s, cx - L * 0.45, cy + L * 0.025, L * 0.12, L * 0.06, col, edge, { lw: 1 });
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - L * 0.02, y: cy - L * 0.2, w: L * 0.13, h: L * 0.12, rotate: 12, fill: { color: col }, line: { color: edge, width: 1 } });
  oval(s, cx - L * 0.15, cy + L * 0.1, L * 0.12, L * 0.05, col, edge, { lw: 1, rot: 30 });
  ball(s, cx - L * 0.32, cy - L * 0.025, 0.03, '263040');
  ball(s, cx - L * 0.2, cy - L * 0.095, 0.025, '263040');
}
// kingdom icons (about 1 in wide, centred at cx, cy)
function prokaryote(s, cx, cy, k = 1) {
  box(s, cx - 0.45 * k, cy - 0.22 * k, 0.9 * k, 0.44 * k, 'F4E9C9', '8A6D3B', { shape: SH.ROUNDED_RECTANGLE, r: 0.2 * k, lw: 2 });
  oval(s, cx - 0.05 * k, cy, 0.42 * k, 0.22 * k, null, '6A4C93', { lw: 1.5 });
  oval(s, cx + 0.28 * k, cy - 0.07 * k, 0.1 * k, 0.08 * k, null, '6A4C93', { lw: 1 });
  line(s, cx + 0.45 * k, cy, cx + 0.62 * k, cy + 0.06 * k, '8A6D3B', 1.25);
}
function protist(s, cx, cy, k = 1) {
  poly(s, [[cx - 0.42 * k, cy], [cx - 0.2 * k, cy - 0.28 * k], [cx + 0.1 * k, cy - 0.22 * k], [cx + 0.42 * k, cy - 0.3 * k], [cx + 0.3 * k, cy + 0.05 * k], [cx + 0.38 * k, cy + 0.27 * k], [cx - 0.05 * k, cy + 0.22 * k], [cx - 0.3 * k, cy + 0.28 * k]], 'E8F0D8', '6E8B3D', { lw: 1.5 });
  ball(s, cx - 0.02 * k, cy, 0.1 * k, C.nucleus, C.nucleusEdge, 1);
  ball(s, cx + 0.22 * k, cy - 0.1 * k, 0.05 * k, 'DDEFF7', '7FA9C4', 0.75);
}
function mushroom(s, cx, cy, k = 1) {
  box(s, cx - 0.08 * k, cy - 0.05 * k, 0.16 * k, 0.32 * k, 'F2E6D0', '9A7B55', { lw: 1.25 });
  s.addShape(SH.CHORD, { x: cx - 0.38 * k, y: cy - 0.32 * k, w: 0.76 * k, h: 0.6 * k, angleRange: [180, 0], fill: { color: 'C98A54' }, line: { color: '8A5A30', width: 1.25 } });
  line(s, cx - 0.45 * k, cy + 0.28 * k, cx - 0.15 * k, cy + 0.36 * k, '9A7B55', 1); line(s, cx + 0.45 * k, cy + 0.28 * k, cx + 0.15 * k, cy + 0.36 * k, '9A7B55', 1);
}
function leafPlant(s, cx, cy, k = 1) {
  line(s, cx, cy + 0.35 * k, cx, cy - 0.3 * k, '3E7F2E', 2);
  oval(s, cx - 0.2 * k, cy - 0.05 * k, 0.4 * k, 0.18 * k, C.chloro, C.chloroEdge, { lw: 1.25, rot: -25 });
  oval(s, cx + 0.2 * k, cy - 0.2 * k, 0.4 * k, 0.18 * k, C.chloro, C.chloroEdge, { lw: 1.25, rot: 25 });
  oval(s, cx, cy - 0.36 * k, 0.16 * k, 0.26 * k, C.chloro, C.chloroEdge, { lw: 1.25 });
}
function animalIcon(s, cx, cy, k = 1) { D.animalCell(s, cx - 0.4 * k, cy - 0.28 * k, 0.8 * k, 0.56 * k, { mw: 0.14 * k }); }
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
const DOM = { bac: ['2E7F74', 'D6EFEA'], arc: ['B8730A', 'FBEBD0'], euk: ['6A4C93', 'EDE5F7'] };

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Classification',
    footer: 'OCR J260 Combined Science B • B6.2 classifying the diversity of organisms on Earth • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • how developments in biology, especially DNA analysis, changed classification` },
      { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statement found • stretch marked' },
      { icon: '▲', text: 'Linnaean hierarchy • binomial names • three domains • evolutionary trees • DNA data' },
    ],
    notes: 'B6.2 How does our understanding of biology help us classify the diversity of organisms on Earth? is Part 2 of 3 in J260 Chapter B6 Life on Earth – past, present and future (B6.1 evolution, B6.2 classification, B6.3 biodiversity). In J257 Biology B the same sub-topic is numbered B6.3, because J257 has an extra B6.2 on sexual and asexual reproduction.\nStatement (search extracts): describe the impact of developments in biology on classification systems, including the use of DNA analysis to classify organisms. See SPEC_B6_2.md for sources and confidence.\nNatural selection and Darwin are B6.1 (recap only). Electron microscopy (B4.2) and prokaryotic / eukaryotic cells (B1.1) are recapped, not re-taught.',
  });
  // deck-specific fix: the full title is long, so the cover subtitle is set to 16 pt on two lines (the template is not edited)
  const sub = s._slideObjects.find(o => o._type === 'text' && JSON.stringify(o.text).includes('diversity of organisms on Earth?') && o.options && o.options.fontSize === 18);
  assert(sub, 'cover subtitle object found');
  Object.assign(sub.options, { fontSize: 15, y: 2.55, h: 0.66, w: 7.3, valign: 'top' });
  sub.options._bodyProp && Object.assign(sub.options._bodyProp, { anchor: 't' });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B6.2.1', text: 'Explain why we **classify** organisms, and the difference between **artificial** and **natural** classification.' },
  { code: 'B6.2.1', text: 'Describe the **Linnaean** hierarchy (kingdom → species) and write **binomial** names correctly.' },
  { code: 'B6.2.1', text: 'Explain why grouping by **appearance** alone can mislead (**convergent** evolution).' },
  { code: 'B6.2.1', text: 'Describe how **microscopes** led to the **five kingdoms**.' },
  { code: 'B6.2.1', text: 'Compare **DNA base sequences** and calculate **percentage similarity**.' },
  { code: 'B6.2.1', text: 'Draw and **interpret evolutionary trees** correctly.' },
  { code: 'B6.2.1', text: 'Describe Woese\'s **three-domain** system and the evidence for it.' },
  { code: 'IaS', text: 'Explain why classification **changes** as new evidence appears.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'J260 B6.2 has one assessable learning outcome in the extracts found: B6.2.1 describe the impact of developments in biology on classification systems, including the use of DNA analysis to classify organisms (J257 numbering B6.3.1). The J260 code B6.2.1 is inferred from the J260 sub-topic number (J260 Advance Information 2022 lists "Section B6.2 How does our understanding of biology help us classify the diversity of …").\nHT: no Higher-only statement was found, and Oak National Academy runs its "Classification in modern biology" unit in BOTH its OCR combined Foundation and Higher programmes. Everything here is for both tiers; slide 12 (building a tree from a difference matrix) is marked GRADE 7–9 STRETCH.\nThe Linnaean hierarchy and binomial names are underlying knowledge (KS3 and the docbrown B6 summary). The Ideas about Science objective (how scientific explanations change) is BCP7; its exact IaS code was not confirmed.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B6 Life on Earth – past, present and future • B6.2 is Part 2 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B6.2.1', 'Why classify? Artificial and natural systems', 'Both tiers', C.blue],
    ['B6.2.1', 'Linnaean hierarchy and binomial names', 'Both tiers', C.blue],
    ['B6.2.1', 'Looks can mislead; microscopes and 5 kingdoms', 'Both tiers', C.blue],
    ['B6.2.1', 'DNA sequences and evolutionary trees', 'Both tiers', C.blue],
    ['B6.2.1', 'Woese and the three domains', 'Both tiers', C.blue],
    ['IaS', 'Why classification keeps changing', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B6.2\nClassification', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B1 DNA • B1.1 prokaryotic and eukaryotic cells • B4.2 microscopes • B6.1 evolution', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.0, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'B6.1 How was the theory of evolution developed?',
      '**B6.2 How does our understanding of biology help us classify the diversity of organisms on Earth?** (this deck)',
      'B6.3 How is biodiversity threatened and how can we protect it?',
      'In J257 (Biology B) this deck is B6.3: J257 has an extra B6.2 on sexual and asexual reproduction.',
    ], { size: 11, color: 'E3F2F0', space: 4 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.8, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.5, 5.53, 2.35, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'No Higher-only statement was found for B6.2: everything is for **both tiers**.',
      'The red **GRADE 7–9 STRETCH** pill marks extension work.',
      'Maths: **percentages**, counting differences, reading **timelines** and **trees**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.6, w: 5.15, h: 2.15, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B6 has three sub-topics: B6.1 evolution, B6.2 classification (this deck), B6.3 biodiversity. Evidence: J260 Advance Information (June 2022) lists Section B6.2 as the classification sub-topic and Section B6.3 "How is biodiversity threatened and how can we protect it?"; the docbrown combined B6 page links B6.2 to classification. J257 numbers classification B6.3 because it has an extra B6.2 (sexual and asexual reproduction), which is separate-science only.\nOverlap control: Darwin, Wallace and natural selection are B6.1, so they are recalled only (starter Q5 and the "natural classification" idea of common ancestry). Electron microscopes (B4.2) and prokaryotic / eukaryotic cells (B1.1) are recapped as the developments that changed classification. DNA and the genome (B1) are recapped before sequence comparison.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B1 • genes', q: 'What is a **genome**? Name the four **bases** in DNA.' },
  { from: 'B1.1 • cells', q: 'Give **two** differences between a **prokaryotic** cell and a **eukaryotic** cell.' },
  { from: 'B4.2 • microscopes', q: 'Why can an **electron microscope** show more detail than a light microscope?' },
  { from: 'KS3 • variation', q: 'What is a **species**? Give one example of variation **within** a species.' },
  { from: 'B6.1 • evolution', q: 'In one sentence, what is **natural selection**?' },
  { from: 'Maths • percentages', q: 'Two DNA sections each 20 bases long are the same at **18** positions. What **percentage** is the same?' },
], { subtitle: 'Recall from B1, B1.1, B4.2, B6.1 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. All the genetic material (DNA) of an organism. A, T, C, G (adenine, thymine, cytosine, guanine).\n2. Prokaryotic: no nucleus (DNA free in cytoplasm, a single loop), plasmids, smaller, no mitochondria / chloroplasts. Eukaryotic: DNA in a nucleus, membrane-bound organelles, larger.\n3. It has a much higher resolution (uses electrons with a much shorter wavelength than light), so it can show much smaller structures such as ribosomes and the inside of mitochondria.\n4. A group of organisms that can breed together to produce fertile offspring. E.g. human height, eye colour, blood group.\n5. Individuals with variations that suit the environment are more likely to survive and reproduce, passing on their alleles. (If B6.1 has not yet been taught, treat this as a pre-teach.)\n6. 18 ÷ 20 × 100 = 90%.' }), 'Retrieval starter');

// ======================= 5 WHY CLASSIFY =======================
reg(D.contentSlide({
  title: 'Why classify? Artificial and natural systems',
  subtitle: `Specification ${sp('B6.2.1')} • sorting the diversity of life into groups`,
  tag: 'B6.2.1', caption: 'the same six animals sorted two ways; colours show the natural group',
  draw: (s) => {
    label(s, 0.65, 1.42, 5.7, '**Artificial**: sorted by **one** feature you can see', { size: 11.5, color: C.ink, align: 'left', h: 0.3 });
    box(s, 0.7, 1.8, 2.7, 1.3, C.white, '9AA3B0', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    box(s, 3.6, 1.8, 2.7, 1.3, C.white, '9AA3B0', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    label(s, 0.7, 1.82, 2.7, 'Flies', { size: 11, bold: true, color: C.grey, h: 0.26 });
    label(s, 3.6, 1.82, 2.7, 'Swims', { size: 11, bold: true, color: C.grey, h: 0.26 });
    token(s, 0.8, 2.15, 'bat', 'mammal'); token(s, 2.1, 2.15, 'pigeon', 'bird'); token(s, 1.45, 2.62, 'butterfly', 'insect');
    token(s, 3.7, 2.15, 'whale', 'mammal'); token(s, 5.0, 2.15, 'shark', 'fish'); token(s, 4.35, 2.62, 'salmon', 'fish');
    arrow(s, 3.5, 3.2, 3.5, 3.55, C.ink, 2);
    label(s, 0.65, 3.55, 5.7, '**Natural**: sorted by **evolutionary relationships** (many features, cells, DNA)', { size: 11.5, color: C.ink, align: 'left', h: 0.3 });
    const G = [['Mammals', 'mammal', ['bat', 'whale']], ['Birds', 'bird', ['pigeon']], ['Fish', 'fish', ['shark', 'salmon']], ['Insects', 'insect', ['butterfly']]];
    G.forEach(([n, g, list], i) => {
      const x = 0.7 + i * 1.42;
      box(s, x, 3.95, 1.32, 1.55, GRP[g][0], GRP[g][1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5, tr: 40 });
      label(s, x, 3.98, 1.32, n, { size: 11, bold: true, color: GRP[g][1], h: 0.26 });
      list.forEach((o, j) => token(s, x + 0.085, 4.32 + j * 0.52, o, g));
    });
  },
  head: 'Two ways to classify',
  lines: [
    '**Classification** puts organisms into groups using their **similarities and differences**. It helps us name, identify and study millions of species.',
    '**Artificial** classification uses one or two **observable** features (e.g. "can fly"). Easy, but groups mix unrelated organisms.',
    '**Natural** classification groups organisms that share a **common ancestor**, using many features. Groups show **evolutionary relationships** (B6.1).',
    'Modern classification is natural, and now uses **DNA** as well as appearance.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: how many species are named?', q: `About ${NAMED} million eukaryote species are named, out of an estimated ${EST} million.`,
    steps: [['Divide', `${NAMED} ÷ ${EST} × 100 = ${sf(pNamed, 4)}…`], ['Answer', `only about **${sf(pNamed, 2)}%** have been named and classified`]], size: 10.5 },
  workedH: 1.35,
  qc: 'Why is "animals that fly" an **artificial** group? How many million species are **not yet named** (from the worked example)?',
  notes: `QUICK CHECK ANSWER: It uses one observable feature only; bats (mammals), pigeons (birds) and butterflies (insects) are not closely related and do not share a recent common ancestor. 8.7 − 1.2 = 7.5 million.\nStatement B6.2.1: "describe the impact of developments in biology on classification systems, including the use of DNA analysis" (search extract wording). Artificial vs natural systems: the docbrown / revision summaries describe early systems that used observable features and modern systems based on evolutionary relationships.\nSpecies numbers: Mora et al. (2011) PLoS Biology, about 1.2 million eukaryote species catalogued and about 8.7 million estimated (±1.3 million). Node: 1.2/8.7 × 100 = ${pNamed.toFixed(3)}%.`,
}), 'B6.2.1 Why classify? Artificial and natural');

// ======================= 6 LINNAEAN HIERARCHY =======================
{
  const LEV = [['Domain', 'Eukarya'], ['Kingdom', 'Animalia'], ['Phylum', 'Chordata'], ['Class', 'Mammalia'], ['Order', 'Primates'], ['Family', 'Hominidae'], ['Genus', '__Homo__'], ['Species', '__sapiens__']];
  const ORG = [['Human', 8], ['Chimp', 6], ['Lion', 4], ['Frog', 3]]; // number of levels shared with humans (from the top)
  reg(D.contentSlide({
    title: 'The Linnaean hierarchy and binomial names',
    subtitle: `Specification ${sp('B6.2.1')} • groups inside groups, from domain down to species`,
    tag: 'B6.2.1', caption: 'groups inside groups; a filled dot = shares the human group',
    draw: (s) => {
      const y0 = 1.75, rh = 0.47;
      LEV.forEach(([lv, hum], i) => {
        const w = 3.0 - i * 0.22, x = 2.05 - w / 2, y = y0 + i * rh;
        box(s, x + 0.0, y, w, rh - 0.07, i === 0 ? 'EDE5F7' : i >= 6 ? 'FFF4E0' : C.cardBlue, i === 0 ? '6A4C93' : C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1 });
        label(s, x + 0.05, y, w - 0.1, `**${lv}**: ${hum}`, { size: 10.5, h: rh - 0.07, color: C.text });
      });
      label(s, 0.55, 1.42, 3.0, 'Level: the human group', { size: 10.5, bold: true, color: C.grey, h: 0.26 });
      ORG.forEach(([n, k], j) => {
        const cx = 3.95 + j * 0.65;
        label(s, cx - 0.33, 1.42, 0.66, n, { size: 10.5, bold: true, h: 0.26 });
        LEV.forEach((_, i) => {
          const cy = y0 + i * rh + (rh - 0.07) / 2;
          if (i < k) ball(s, cx, cy, 0.11, C.blue, C.blueMid); else ball(s, cx, cy, 0.11, C.white, 'B8C4C2', 1);
        });
      });
      label(s, 3.55, y0 + 8 * rh - 0.02, 2.75, 'fewer organisms, **more** in common ↓', { size: 10, italic: true, color: C.grey, h: 0.26 });
      label(s, 0.55, y0 + 8 * rh - 0.02, 3.0, 'domain added by Woese (1990)', { size: 10, italic: true, color: '6A4C93', h: 0.26 });
    },
    head: 'Linnaeus (1735 onwards)',
    lines: [
      '**Kingdom, phylum, class, order, family, genus, species**: each group sits **inside** the one above.',
      'The lower the level two organisms share, the **more closely related** they are.',
      '**Binomial name** = **Genus** + **species**, e.g. __Homo sapiens__, __Panthera leo__.',
      'Rules: genus has a **capital** letter, species a **small** letter; printed in italics (underlined if handwritten).',
      'One name used by scientists **everywhere**, whatever the local name.',
    ],
    size: 11.5,
    worked: { head: 'Worked example', q: '__Panthera leo__ (lion) and __Panthera tigris__ (tiger): how many of the 8 levels do they share?',
      steps: [['Same genus', 'genus is the 2nd-lowest level, so they share every level above it too'], ['Answer', 'domain → genus = **7 of 8** levels (not species)']], size: 10.5 },
    workedH: 1.5,
    qc: 'Put in order, **largest** group first: genus, kingdom, class, species, family, phylum, order. Which of these is written correctly: homo Sapiens, Homo sapiens, Homo Sapiens?',
    notes: 'QUICK CHECK ANSWER: Kingdom, phylum, class, order, family, genus, species (mnemonic: "King Philip Came Over For Good Soup"). Homo sapiens (capital genus, lower-case species, italics).\nDiagram: human classification. Chimpanzee (Pan troglodytes) shares down to family Hominidae (6 levels including domain); lion (Panthera leo) shares down to class Mammalia (4); common frog (Rana temporaria) shares down to phylum Chordata (3). Linnaeus published Systema Naturae in 1735 and used binomial names consistently from 1753 (plants) and 1758 (animals). Phylum and family were added later; domain was added above kingdom by Woese in 1990.\nThe hierarchy and binomial naming are KS3 / underlying knowledge in the extracts found; B6.2.1 is about how developments changed it.',
  }), 'B6.2.1 Linnaean hierarchy and binomial names');
}

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('B6.2.1')} • why classify; hierarchy and binomial names`, [
  { q: 'Explain the difference between an **artificial** and a **natural** classification system.', marks: 2, ms: 'Artificial: uses one / a few observable features (e.g. has wings) (1); natural: groups organisms by evolutionary relationships / common ancestors / many features including DNA (1).' },
  { q: 'Put these groups in order, **largest first**: species, class, kingdom, genus, order, phylum, family.', marks: 2, ms: 'Kingdom, phylum, class, order, family, genus, species: all correct (2); one pair swapped (1).' },
  { q: 'A student writes the lion\'s name as "panthera Leo". Give **two** corrections.', marks: 2, ms: 'Genus needs a capital P (1); species needs a lower-case l (1). Accept: should be in italics / underlined.' },
  { q: 'Two organisms are in the **same family** but **different genera**. Explain what this tells you about how closely related they are.', marks: 2, ms: 'Fairly closely related / share a recent common ancestor (1); but less closely related than organisms in the same genus (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 CONVERGENT EVOLUTION =======================
reg(D.contentSlide({
  title: 'Looks can mislead: shark and dolphin',
  subtitle: `Specification ${sp('B6.2.1')} • why classifying by appearance alone can go wrong`,
  tag: 'B6.2.1', caption: 'side views, not to scale; similar shape, very different internal features',
  draw: (s) => {
    shark(s, 2.6, 2.1, 3.2);
    label(s, 4.45, 1.75, 1.9, '**Shark** (a fish)', { size: 12, color: '4F5D6E', align: 'left', h: 0.3 });
    dolphin(s, 2.6, 3.6, 3.2);
    label(s, 4.45, 3.25, 1.9, '**Dolphin** (a mammal)', { size: 12, color: '3B5878', align: 'left', h: 0.3 });
    const rows = [['', 'Shark', 'Dolphin'], ['Breathes with', 'gills', 'lungs (blowhole)'], ['Tail', 'vertical', 'horizontal flukes'], ['Skeleton', 'cartilage', 'bone'], ['Young', 'eggs / live', 'live, fed milk']];
    rows.forEach((r, i) => r.forEach((t, j) => {
      const x = 0.7 + [0, 1.6, 3.35][j], w = [1.55, 1.7, 2.2][j], y = 4.35 + i * 0.28;
      label(s, x, y, w, t && (i === 0 || j === 0) ? `**${t}**` : t, { size: 10.5, align: 'left', h: 0.28, color: i === 0 ? C.blue : C.text });
    }));
    line(s, 0.7, 4.63, 6.25, 4.63, C.line, 1);
  },
  head: 'Convergent evolution',
  lines: [
    'Sharks and dolphins have the same **streamlined** shape and fins, because both are adapted to fast swimming.',
    'This is **convergent evolution**: unrelated organisms evolve **similar features** because they live in **similar environments**.',
    'An artificial system based on shape would put them together. But dolphins share far more with **mammals** (lungs, hair at birth, milk).',
    'So classifiers need **many features**, internal structure, cells and, best of all, **DNA**, not just appearance.',
    'The opposite also happens: very different-looking organisms (e.g. dog breeds) can be the **same species**.',
  ],
  size: 12,
  qc: 'Bats and birds both have wings. Explain why bats are classified as **mammals** and not birds.',
  notes: 'QUICK CHECK ANSWER: Wings evolved separately (convergent evolution) for flying. Bats have hair / fur, give birth to live young and feed them milk, have mammal skeletons and their DNA is much more similar to other mammals than to birds; so they share a more recent common ancestor with mammals.\nThis slide shows WHY developments in biology (microscopes, biochemistry, DNA) were needed: appearance alone can mislead. Convergent evolution is used as a context; it may also be mentioned in B6.1 (evolution). Shark reproduction varies by species (some lay eggs, many give birth to live young without milk).',
}), 'B6.2.1 Looks can mislead (convergent evolution)');

// ======================= 9 MICROSCOPES AND FIVE KINGDOMS =======================
reg(D.contentSlide({
  title: 'Microscopes and the five kingdoms',
  subtitle: `Specification ${sp('B6.2.1')} • seeing inside cells changed how life was grouped`,
  tag: 'B6.2.1', caption: 'icons of the five kingdoms (Whittaker, 1969); cells not to scale',
  draw: (s) => {
    const K = [['Prokaryotes', prokaryote, 'no', 'some', 'many ways'], ['Protists', protist, 'yes', 'some', 'many ways'], ['Fungi', mushroom, 'yes', 'yes (chitin)', 'absorb food'], ['Plants', leafPlant, 'yes', 'yes (cellulose)', 'photosynthesis'], ['Animals', animalIcon, 'yes', 'no', 'eat food']];
    const cw = 1.13, x0 = 0.62;
    label(s, x0, 1.42, 5.7, '**Prokaryotes**: no nucleus  |  **Eukaryotes**: nucleus (the other four)', { size: 10.5, h: 0.26, color: C.ink });
    box(s, x0, 1.75, cw - 0.06, 3.85, 'FBF3DF', '8A6D3B', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.25, tr: 30 });
    box(s, x0 + cw, 1.75, 4 * cw - 0.06, 3.85, 'EDE5F7', '6A4C93', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.25, tr: 30 });
    K.forEach(([n, fn, nuc, wall, food], i) => {
      const cx = x0 + i * cw + (cw - 0.06) / 2;
      fn(s, cx, 2.35, 1.0);
      label(s, cx - 0.55, 2.9, 1.1, `**${n}**`, { size: 11, h: 0.28 });
      [['nucleus', nuc], ['cell wall', wall], ['nutrition', food]].forEach(([h, v], j) => {
        label(s, cx - 0.55, 3.25 + j * 0.75, 1.1, h, { size: 10, italic: true, color: C.grey, h: 0.24 });
        label(s, cx - 0.55, 3.47 + j * 0.75, 1.1, v, { size: 10.5, bold: true, h: 0.42, valign: 'top' });
      });
    });
  },
  head: 'From two kingdoms to five',
  lines: [
    '**Linnaeus** (1735) had just two kingdoms: **plants** and **animals**.',
    '**Light microscopes** revealed single-celled organisms, so Haeckel (1866) added **Protista**.',
    '**Electron microscopes** (1930s on, B4.2) showed that bacteria have **no nucleus** and no membrane-bound organelles: **prokaryotes** (B1.1).',
    'Fungi were shown to be very different from plants (no chloroplasts, chitin walls).',
    'So Whittaker (**1969**) used **five kingdoms**: prokaryotes, protists, fungi, plants, animals.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: magnification (recap of B4.2)', q: 'A bacterium is 2 µm long. How long is its image at ×1000?',
    steps: [['Multiply', 'image = real size × magnification = 2 µm × 1000'], ['Answer', '= 2000 µm = **2 mm**: too small to see detail, so EM was needed']], size: 10.5 },
  workedH: 1.45,
  qc: 'Which feature, seen with microscopes, puts an organism in the **prokaryote** kingdom? Why were fungi moved out of the **plant** kingdom?',
  notes: 'QUICK CHECK ANSWER: No nucleus (DNA free in the cytoplasm; no membrane-bound organelles). Fungi have no chloroplasts and do not photosynthesise; they absorb food; their cell walls are made of chitin, not cellulose.\nDevelopments in biology (B6.2.1): microscopes → cells → five kingdoms. Electron microscopy itself is B4.2 and prokaryotic / eukaryotic cells B1.1: recap only. QC magnification extra: 5 mm image of a 2.5 µm cell → 5000 ÷ 2.5 = ×2000 (node).\nDates: Systema Naturae 1735; Haeckel 1866; Ruska\'s first electron microscope 1931; Whittaker 1969. Protist cell walls vary; prokaryote walls are not cellulose.',
}), 'B6.2.1 Microscopes and five kingdoms');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('B6.2.1')} • appearance can mislead; microscopes and kingdoms`, [
  { q: 'Sharks and dolphins look similar but are in different classes. Explain why they look similar.', marks: 2, ms: 'Both adapted to the same environment / fast swimming in water (1); similar features evolved separately / convergent evolution (not a recent common ancestor) (1).' },
  { q: 'A single-celled organism has **no nucleus**. Name its kingdom and the type of cell it has.', marks: 2, ms: 'Prokaryotes / bacteria / Monera (1); prokaryotic (1).' },
  { q: 'Explain how the **electron microscope** changed the way organisms were classified.', marks: 2, ms: 'Showed details of cell structure / organelles / that bacteria have no nucleus (1); so organisms could be grouped by cell structure / prokaryotes separated into their own kingdom (1).' },
  { q: 'The image of a bacterium is **6 mm** long. The bacterium is **3 µm** long. Calculate the magnification.', marks: 2, ms: '6 mm = 6000 µm; 6000 ÷ 3 (1); = ×2000 (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 DNA SEQUENCES =======================
{
  const ref = SEQ.Human;
  reg(D.contentSlide({
    title: 'DNA analysis: comparing base sequences',
    subtitle: `Specification ${sp('B6.2.1')} • the use of DNA analysis to classify organisms`,
    tag: 'B6.2.1', caption: 'an illustrative 20-base section of the same gene; red = different from the human base',
    draw: (s) => {
      const x = 1.55, bw = 0.245;
      for (let i = 0; i < 20; i += 5) label(s, x + i * bw, 1.42, bw, String(i + 1), { size: 10, color: C.grey, h: 0.24 });
      label(s, x + 19 * bw, 1.42, bw, '20', { size: 10, color: C.grey, h: 0.24 });
      NAMES.forEach((n, j) => {
        const y = 1.75 + j * 0.62;
        label(s, 0.55, y, 0.98, n, { size: 10.5, bold: true, align: 'right', h: 0.34 });
        dnaRow(s, x, y, SEQ[n], j ? ref : null, bw);
      });
      label(s, 0.6, 4.27, 5.7, 'Differences from human, out of 20 bases:', { size: 11, bold: true, align: 'left', h: 0.28 });
      NAMES.slice(1).forEach((n, j) => {
        const d = DM.Human[n], x0 = 0.75 + j * 1.95;
        box(s, x0, 4.62, 1.8, 0.9, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
        label(s, x0, 4.64, 1.8, n, { size: 10.5, bold: true, h: 0.26 });
        label(s, x0, 4.9, 1.8, `${d} different`, { size: 11, color: C.red, bold: true, h: 0.26 });
        label(s, x0, 5.16, 1.8, `${fmt(sim('Human', n))}% the same`, { size: 10.5, h: 0.26 });
      });
    },
    head: 'Why DNA works',
    lines: [
      'DNA is a sequence of **bases** (A, T, C, G). Over time, **mutations** change the sequence.',
      'Two species that split from a **common ancestor** recently have had **little time** to build up differences.',
      'So: **more similar** DNA = **more closely related**; fewer differences = more recent common ancestor.',
      'Scientists **sequence** the same gene (or whole **genomes**) from many species and **compare** them.',
      'DNA is not fooled by convergent evolution, and works for organisms that look alike, e.g. **bacteria**.',
    ],
    size: 11.5,
    worked: { head: 'Worked example: % similarity', q: 'Human and gorilla: 2 bases differ out of 20.',
      steps: [['Same', '20 − 2 = 18 bases the same'], ['Percent', '18 ÷ 20 × 100'], ['Answer', '**90%** the same']], size: 10.5 },
    workedH: 1.5,
    qc: 'Which ape is **most closely related** to humans in this data? Calculate the % similarity of **chimpanzee and gorilla** (3 differences).',
    notes: `QUICK CHECK ANSWER: Chimpanzee (only 1 difference, 95% the same). Chimp–gorilla: (20 − 3) ÷ 20 × 100 = 85%.\nThe 20-base sequences are ILLUSTRATIVE (built in node from an ancestral sequence by placing mutations on the tree ((human, chimp), gorilla), orangutan), so the difference counts fit that tree. Differences (node): H–C ${DM.Human.Chimpanzee}, H–G ${DM.Human.Gorilla}, C–G ${DM.Chimpanzee.Gorilla}, H–O ${DM.Human.Orangutan}, C–O ${DM.Chimpanzee.Orangutan}, G–O ${DM.Gorilla.Orangutan}.\nReal whole-genome figures are much closer: humans and chimpanzees are about 98.8% the same in directly comparable DNA (commonly quoted value, approximate). Statement wording "including the use of DNA analysis to classify organisms" is from the search extracts (medium–high confidence).`,
  }), 'B6.2.1 DNA analysis: comparing sequences');
}

// ======================= 12 FROM DNA TO A TREE (STRETCH) =======================
{
  const s = D.contentHeader('From DNA data to an evolutionary tree', `Specification ${sp('B6.2.1')} • use DNA differences to work out who is most closely related`, { stretch: true, tag: 'B6.2.1' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'difference matrix from slide 11; tree branch points at approximate dates');
  // matrix drawn natively
  const mx = 0.75, my = 1.45, cw = 1.12, rh = 0.32, AB = { Human: 'Human', Chimpanzee: 'Chimp', Gorilla: 'Gorilla', Orangutan: 'Orangutan' };
  NAMES.forEach((n, j) => {
    box(s, mx + (j + 1) * cw, my, cw - 0.04, rh - 0.04, C.ink, null);
    label(s, mx + (j + 1) * cw, my, cw - 0.04, AB[n], { size: 10.5, bold: true, color: C.white, h: rh - 0.04 });
    box(s, mx, my + (j + 1) * rh, cw - 0.04, rh - 0.04, C.ink, null);
    label(s, mx, my + (j + 1) * rh, cw - 0.04, AB[n], { size: 10.5, bold: true, color: C.white, h: rh - 0.04 });
    NAMES.forEach((m, k) => {
      const hl = (n === 'Human' && m === 'Chimpanzee') || (m === 'Human' && n === 'Chimpanzee');
      box(s, mx + (k + 1) * cw, my + (j + 1) * rh, cw - 0.04, rh - 0.04, j === k ? 'E6EBF2' : hl ? 'FFE2B8' : C.white, C.line, { lw: 0.75 });
      label(s, mx + (k + 1) * cw, my + (j + 1) * rh, cw - 0.04, j === k ? '–' : String(DM[n][m]), { size: 11, bold: hl, color: hl ? C.orange : C.text, h: rh - 0.04 });
    });
  });
  // tree
  const tree = { age: SPLIT.O, label: 'Z', children: [
    { age: SPLIT.G, label: 'Y', children: [{ age: SPLIT.HC, label: 'X', children: [{ name: 'Human' }, { name: 'Chimpanzee' }] }, { name: 'Gorilla' }] },
    { name: 'Orangutan' }] };
  const tg = { x: 1.2, y: 3.35, w: 3.6, h: 1.65, maxAge: 16 };
  const { X } = drawTree(s, tree, Object.assign({ tipW: 1.4, tipSize: 10.5 }, tg));
  const ay = 5.55;
  line(s, X(16), ay, X(0), ay, C.ink, 1.25);
  [16, 12, 8, 4, 0].forEach(v => { line(s, X(v), ay, X(v), ay + 0.06, C.ink, 1); label(s, X(v) - 0.3, ay + 0.06, 0.6, String(v), { size: 10, h: 0.2 }); });
  label(s, X(16), ay + 0.26, X(0) - X(16), 'million years ago (approx.)', { size: 10, bold: true, h: 0.22 });
  D.card(s, 7.3, 1.3, 5.58, 2.75, 'How to build the tree', [
    'Find the pair with the **fewest** differences: human and chimp (**1**). Join them first at branch point **X**.',
    'Next closest to that pair: **gorilla** (2 and 3 differences). Join at **Y**.',
    '**Orangutan** is most different (5–6): it joins last, at **Z**.',
    'Each branch point is a **common ancestor**; dates come from fossils and mutation rates.',
  ], { size: 11.5 });
  D.workedSteps(s, 7.3, 4.2, 5.58, 2.05, 'Worked example: % similarity', 'Chimpanzee and orangutan: 6 of the 20 bases differ.', [
    ['Same', '20 − 6 = 14'], ['Percent', '14 ÷ 20 × 100'], ['Answer', '**70%** the same: the least similar pair, so the most distant relatives']], { size: 10.5 });
  D.quickCheck(s, 'Which branch point is the **most recent common ancestor** of gorilla and chimp? About how many million years ago did it live?');
  D.notes(s, `QUICK CHECK ANSWER: Y, about ${SPLIT.G} million years ago (accept 8–10).\nGRADE 7–9 STRETCH: building a tree from a difference matrix is an extension of "use of DNA analysis to classify organisms"; reading the finished tree (slide 14) is for everyone.\nMatrix values computed in node from the slide 11 sequences. Approximate split dates (widely quoted, vary between studies): human–chimp about 6–7 million years ago (6.5 used), gorilla about 8–10 (9), orangutan about 13–16 (15); UNVERIFIED to the year and illustrative. Node: 9 − 6.5 = 2.5 million years between the two splits; C–O 14/20 = 70%.`);
  reg(s, 'B6.2.1 From DNA data to a tree (stretch)');
}

// ======================= 13 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B6.2.1')} • DNA analysis`, [
  { q: 'Two species are compared over **50** bases of the same gene. **4** bases are different. Calculate the percentage similarity.', marks: 2, ms: '(50 − 4) ÷ 50 × 100 / 46 ÷ 50 × 100 (1); = 92% (1).' },
  { q: 'Explain why species with **more similar** DNA are thought to be **more closely related**.', marks: 2, ms: 'They shared a common ancestor more recently (1); so there has been less time for mutations / differences to build up (1).' },
  { q: 'Give **two** reasons why DNA evidence is more reliable than appearance for classification.', marks: 2, ms: 'Any two (1 each): not affected by convergent evolution / similar environments; can compare organisms that look alike (e.g. bacteria) or look very different; gives numbers / objective, can be measured and repeated; compares many characters (bases).' },
  { q: 'Species P and Q differ at **3** bases, P and R at **9**, Q and R at **8**. Which two are most closely related? Explain.', marks: 2, ms: 'P and Q (1); fewest differences / most similar DNA, so most recent common ancestor (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 14 READING TREES =======================
{
  const s = D.contentHeader('Reading evolutionary trees correctly', `Specification ${sp('B6.2.1')} • a tree shows common ancestors, not a ladder`, { tag: 'B6.2.1' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'the same tree drawn two ways: branches rotated at the branch points');
  const A = { age: 4, label: 'n1', children: [
    { age: 2.6, label: 'n2', children: [{ age: 1.2, label: 'n3', children: [{ name: 'A' }, { name: 'B' }] }, { name: 'C' }] },
    { age: 1.8, label: 'n4', children: [{ name: 'D' }, { name: 'E' }] }] };
  const B = { age: 4, label: 'n1', children: [
    { age: 1.8, label: 'n4', children: [{ name: 'E' }, { name: 'D' }] },
    { age: 2.6, label: 'n2', children: [{ name: 'C' }, { age: 1.2, label: 'n3', children: [{ name: 'B' }, { name: 'A' }] }] }] };
  label(s, 0.65, 1.42, 3.0, 'Tree 1', { size: 11.5, bold: true, color: C.blue, align: 'left', h: 0.26 });
  label(s, 3.85, 1.42, 3.0, 'Tree 2 (same relationships)', { size: 11.5, bold: true, color: C.blue, align: 'left', h: 0.26 });
  drawTree(s, A, { x: 0.95, y: 1.95, w: 2.2, h: 2.6, maxAge: 4, tipW: 0.4, tipSize: 12 });
  drawTree(s, B, { x: 4.05, y: 1.95, w: 2.2, h: 2.6, maxAge: 4, tipW: 0.4, tipSize: 12 });
  arrow(s, 0.8, 4.95, 3.3, 4.95, C.grey, 1.5);
  label(s, 0.8, 5.0, 2.5, 'past → present (tips)', { size: 10, italic: true, color: C.grey, h: 0.24 });
  arrow(s, 3.9, 4.95, 6.4, 4.95, C.grey, 1.5);
  label(s, 3.9, 5.0, 2.5, 'past → present (tips)', { size: 10, italic: true, color: C.grey, h: 0.24 });
  label(s, 0.65, 5.35, 6.2, 'In both: A and B share n3, the **most recent** common ancestor. C is equally related to A and B.', { size: 10.5, h: 0.5, color: C.text });
  D.card(s, 7.3, 1.3, 5.58, 3.0, 'Rules for reading a tree', [
    '**Tips** are living (or extinct) species; **branch points** (nodes) are **common ancestors**, where one species split into two.',
    'Relatedness = how **recent** the shared branch point is. Trace back from the tips, **not** along the tips.',
    'Turning branches round a node changes **nothing**: tree 1 = tree 2.',
    'No living species is the ancestor of another: humans did **not** evolve **from** chimpanzees; we share an ancestor.',
  ], { size: 12.5 });
  D.card(s, 7.3, 4.45, 5.58, 1.8, 'Drawing a tree correctly', [
    'Join the **most similar** pair first; then add the next most similar to their stem.',
    'Put **time** on the axis, with the tips level at the present. Label branch points if asked.',
    'Draw tips **level** (all living today) and use straight, square branches.',
  ], { size: 12.5, fill: C.cream });
  D.quickCheck(s, 'In tree 1, is **C** more closely related to **B** or to **D**? Name the most recent common ancestor of C and D.');
  D.notes(s, 'QUICK CHECK ANSWER: C is more closely related to B (they share n2; C and D only share n1, further back). The most recent common ancestor of C and D is n1.\nCommon misconceptions: reading relatedness from tips that happen to sit next to each other (in tree 2, C sits next to E, but C and E only share n1); thinking the tip on the far side is "more evolved"; thinking a living species is an ancestor of another. Evolutionary trees are classification tools here (common ancestry); how evolution happens (natural selection) is B6.1.');
  reg(s, 'B6.2.1 Reading evolutionary trees');
}

// ======================= 15 THREE DOMAINS =======================
{
  const tree = { age: 4, children: [
    { name: 'Bacteria', color: DOM.bac[0] },
    { age: 3, children: [
      { name: 'Archaea', color: DOM.arc[0] },
      { age: 2, children: [{ name: 'Protists', color: DOM.euk[0] }, { name: 'Plants', color: DOM.euk[0] }, { age: 1, children: [{ name: 'Fungi', color: DOM.euk[0] }, { name: 'Animals', color: DOM.euk[0] }] }] }] }] };
  reg(D.contentSlide({
    title: 'Woese and the three domains',
    subtitle: `Specification ${sp('B6.2.1')} • DNA and biochemistry split the prokaryotes in two`,
    tag: 'B6.2.1', caption: 'the three-domain tree of life; branch lengths not to scale',
    draw: (s) => {
      label(s, 0.65, 1.42, 4.0, 'Common ancestor of all life', { size: 10.5, italic: true, color: C.grey, align: 'left', h: 0.24 });
      drawTree(s, tree, { x: 0.95, y: 1.95, w: 2.6, h: 3.35, maxAge: 4, tipW: 1.1, tipSize: 11.5, stem: 0.3 });
      const br = (y1, y2, nm, col, fill, extra) => {
        box(s, 4.85, y1 - 0.26, 1.5, y2 - y1 + 0.52, fill, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
        label(s, 4.88, y1 - 0.26, 1.44, `**${nm}**\n${extra}`, { size: 10.5, h: y2 - y1 + 0.52, color: col });
      };
      const dy = 3.35 / 5;
      br(1.95, 1.95, 'Bacteria', DOM.bac[0], DOM.bac[1], 'prokaryotes');
      br(1.95 + dy, 1.95 + dy, 'Archaea', DOM.arc[0], DOM.arc[1], 'prokaryotes');
      br(1.95 + 2 * dy, 1.95 + 5 * dy - 0.0, 'Eukarya', DOM.euk[0], DOM.euk[1], 'cells with a nucleus: 4 kingdoms');
      label(s, 0.65, 5.58, 5.7, 'Archaea are prokaryotes, but their genes are **closer to ours** than to bacteria.', { size: 10.5, h: 0.28, color: C.text });
    },
    head: 'Carl Woese (1977 and 1990)',
    lines: [
      'Woese compared the **base sequence** of the same molecule (ribosomal **RNA**) in many prokaryotes.',
      'Some "bacteria" were so different that they formed a **separate group**: the **Archaea** (often in extreme places, e.g. hot springs).',
      'In 1990 he proposed a new level **above kingdom**: three **domains**: **Bacteria**, **Archaea** and **Eukarya**.',
      'Microscopes could not show this: archaea and bacteria **look alike**. Only **molecular** evidence did.',
      'Biochemistry agreed: archaea have different **membrane lipids** and cell walls from bacteria.',
    ],
    size: 11.5,
    qc: 'Name the **three domains**. Why could the electron microscope **not** separate archaea from bacteria?',
    notes: 'QUICK CHECK ANSWER: Bacteria, Archaea, Eukarya (eukaryotes). Both are prokaryotes that look similar under the microscope (no nucleus, similar size and shape); the differences are in their molecules (rRNA / DNA base sequences, membrane lipids), so they need biochemical / DNA analysis.\nWoese and Fox (1977) identified the archaea from 16S ribosomal RNA sequences; Woese, Kandler and Wheelis (1990) proposed the three domains. This is the clearest example of "the impact of developments in biology on classification systems, including DNA analysis" (B6.2.1). The three-domain system was named in the recalled brief; it fits the statement but is not quoted in the J260 extracts found (UNVERIFIED as an explicit spec item). Ideas about Science: slide 18.\nTree: archaea share a more recent common ancestor with eukaryotes than with bacteria; fungi are more closely related to animals than to plants (slide 17).',
  }), 'B6.2.1 Woese and the three domains');
}

// ======================= 16 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('B6.2.1')} • reading trees; three domains`, [
  { q: 'On an evolutionary tree, what does a **branch point** (node) represent?', marks: 2, ms: 'A common ancestor (1); where one species split / evolved into two (speciation) (1).' },
  { q: 'Name the **three domains** in Woese\'s system.', marks: 2, ms: 'Bacteria, Archaea, Eukarya / eukaryotes: all three (2); two (1).' },
  { q: 'Describe the evidence that Woese used to propose the domain **Archaea**.', marks: 2, ms: 'Compared base sequences of (ribosomal) RNA / genes (1); archaea were very different from bacteria / as different as from eukaryotes (1).' },
  { q: 'A student says "humans evolved from chimpanzees". Use the idea of an evolutionary tree to correct this.', marks: 2, ms: 'Humans and chimpanzees share a common ancestor (1); both evolved from it / chimpanzees are a separate living branch, not our ancestor (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 17 RECLASSIFICATION =======================
{
  const s = D.contentHeader('DNA reclassifies organisms', `Specification ${sp('B6.2.1')} • when DNA disagrees with appearance, the classification changes`, { tag: 'B6.2.1' });
  D.panel(s, 0.45, 1.3, 7.0, 4.95, 'whales and hippos: an older tree from anatomy and the tree from DNA (simplified)');
  label(s, 0.65, 1.42, 3.2, 'Before: grouped by anatomy', { size: 11.5, bold: true, color: C.grey, align: 'left', h: 0.28 });
  label(s, 4.05, 1.42, 3.2, 'After: grouped by DNA', { size: 11.5, bold: true, color: C.blue, align: 'left', h: 0.28 });
  const before = { age: 3, children: [{ name: 'Whales', color: C.red }, { age: 2, children: [{ name: 'Cows' }, { age: 1, children: [{ name: 'Pigs' }, { name: 'Hippos', color: C.red }] }] }] };
  const after = { age: 3, children: [{ name: 'Pigs' }, { age: 2, children: [{ name: 'Cows' }, { age: 1, label: 'W', children: [{ name: 'Hippos', color: C.red }, { name: 'Whales', color: C.red }] }] }] };
  drawTree(s, before, { x: 0.85, y: 2.0, w: 1.8, h: 2.4, maxAge: 3, tipW: 1.0, tipSize: 12, color: '7A8494', dots: false });
  drawTree(s, after, { x: 4.25, y: 2.0, w: 1.8, h: 2.4, maxAge: 3, tipW: 1.0, tipSize: 12 });
  arrow(s, 3.55, 3.2, 3.95, 3.2, C.orange, 2.5);
  box(s, 0.7, 4.75, 6.5, 1.0, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.8, 4.77, 6.3, 'Hippos were thought to be closest to **pigs**. DNA (from the 1990s) showed that **whales** are the closest living relatives of **hippos**: they share common ancestor **W**. Fossil whales with hoofed-mammal ankle bones later agreed.', { size: 10.5, h: 0.96, color: C.text, align: 'left' });
  D.card(s, 7.7, 1.3, 5.18, 4.95, 'More DNA surprises', [
    '**Fungi** were once grouped with plants. DNA shows fungi are **more closely related to animals** than to plants.',
    '**African elephants**: DNA showed forest and savanna elephants are **two separate species** (accepted by the IUCN in 2021).',
    'Many "species" of bacteria, and some look-alike frogs and birds, turned out to be **several species** that look the same.',
    'Some groups that looked different, e.g. some dog-like and cat-like animals, were **merged or moved**.',
    'Each change needs **evidence** that other scientists can check (slide 18).',
  ], { size: 11.5 });
  D.quickCheck(s, 'From the "after" tree: is a hippo more closely related to a **whale** or to a **pig**? Explain using **common ancestors**.');
  D.notes(s, 'QUICK CHECK ANSWER: A whale. Hippos and whales share common ancestor W, which is more recent than the common ancestor hippos share with pigs (the root).\nWhale–hippo: molecular studies (e.g. SINE insertions, Nikaido et al. 1999, and DNA sequence studies from the mid-1990s) placed whales as the sister group of hippos (Whippomorpha); fossil whales such as Pakicetus with a double-pulley astragalus (2001) supported cetaceans within the even-toed hoofed mammals. Trees simplified (camels and other groups omitted).\nFungi + animals: both are opisthokonts. African elephants: the IUCN Red List assessed the African forest elephant (Loxodonta cyclotis) and savanna elephant (L. africana) separately from 2021. Treat these as contexts; no named examples are required by B6.2.1.');
  reg(s, 'B6.2.1 DNA reclassifies organisms');
}

// ======================= 18 IDEAS ABOUT SCIENCE =======================
{
  const s = D.contentHeader('Ideas about Science: why classification changes', `Specification ${sp('B6.2.1')} with BCP7 Ideas about Science • new technology → new evidence → new explanations`, { tag: 'IaS' });
  D.panel(s, 0.45, 1.3, 12.43, 2.35, 'timeline drawn to scale, 1700–2020');
  const x0 = 1.0, x1 = 12.3, Y = 2.45, X = yr => x0 + (yr - 1700) / 320 * (x1 - x0);
  line(s, x0, Y, x1, Y, C.ink, 2);
  for (let yr = 1700; yr <= 2020; yr += 20) { line(s, X(yr), Y, X(yr), Y + (yr % 100 ? 0.06 : 0.12), C.ink, 1); if (yr % 100 === 0 || yr === 2020) label(s, X(yr) - 0.3, Y + 0.13, 0.6, String(yr), { size: 10, h: 0.2 }); }
  // explicit label boxes [up?, left x, width] so the crowded 1931–2003 labels do not collide
  const POS = { 1735: [1, 1.6, 1.3], 1859: [0, 5.75, 1.45], 1866: [1, 6.3, 1.45], 1931: [0, 7.85, 1.3], 1953: [1, 8.35, 1.2], 1969: [0, 9.3, 1.25], 1977: [1, 9.7, 1.35], 1990: [0, 10.7, 1.15], 2003: [1, 11.2, 1.55] };
  TL.forEach(([yr, t]) => {
    const [up, bx, w] = POS[yr], lx = X(yr), dna = yr >= 1953;
    const ly = up ? Y - 0.95 : Y + 0.3, lh = 0.55;
    line(s, lx, Y, Math.max(bx + 0.1, Math.min(bx + w - 0.1, lx)), up ? ly + lh : ly, '9AA3B0', 0.75);
    ball(s, lx, Y, 0.07, dna ? C.blue : C.orangeTab, dna ? C.blueMid : C.orange);
    label(s, bx, ly, w, `**${yr}** ${t}`, { size: 10, h: lh, color: C.text, valign: up ? 'bottom' : 'top' });
  });
  D.card(s, 0.45, 3.8, 4.05, 2.45, 'How explanations change', [
    'A **new technology** (microscope, DNA sequencing) gives **new data**.',
    'Scientists suggest a **new explanation** (e.g. a new kingdom or domain).',
    'Others **test** and **repeat** the work before it is accepted.',
  ], { size: 11.5 });
  D.card(s, 4.64, 3.8, 4.05, 2.45, 'Woese: a slow start', [
    'In 1977 many scientists **doubted** the archaea: one molecule seemed too little evidence.',
    'His work was **peer reviewed** and published, so others could check it.',
    'As **more genes** were sequenced and agreed, the idea was **accepted**.',
  ], { size: 11.5 });
  D.workedSteps(s, 8.83, 3.8, 4.05, 2.45, 'Worked example: from the timeline', 'How long from Systema Naturae to the three domains?', [
    ['Subtract', '1990 − 1735'], ['Answer', '**255 years**; and only **21** years from 5 kingdoms (1969) to 3 domains']], { size: 11 });
  D.quickCheck(s, 'How many years passed between the first electron microscope and Woese finding the archaea? Why should classifications be seen as **tentative**?');
  D.notes(s, 'QUICK CHECK ANSWER: 1977 − 1931 = 46 years. Because they are the best explanation of the evidence so far; new evidence (new technology, more species, more DNA) may change them.\nIdeas about Science (BCP7): scientific explanations change when new evidence is collected; the scientific community checks claims by peer review and repetition before accepting them. The exact IaS code for this link in J260 was not confirmed (UNVERIFIED).\nDates (node-asserted differences): 1735 Systema Naturae; 1859 Origin of Species (B6.1); 1866 Haeckel; 1931 Ruska and Knoll electron microscope; 1953 DNA structure (Watson, Crick, Franklin, Wilkins); 1969 Whittaker; 1977 Woese and Fox; 1990 three domains; 2003 Human Genome Project completed.');
  reg(s, 'IaS Why classification changes (timeline)');
}

// ======================= 19 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${DECK.specRange} • reclassification and Ideas about Science`, [
  { q: 'Hippos used to be grouped with pigs. Suggest what **DNA evidence** showed and how it changed their classification.', marks: 2, ms: 'Hippo DNA is more similar to whale DNA than to pig DNA (1); so hippos were reclassified as the closest relatives of whales / share a more recent common ancestor with whales (1).' },
  { q: 'Explain why classification systems **change** over time.', marks: 2, ms: 'New technology / techniques (microscopes, DNA sequencing) give new evidence (1); scientists change the explanation / grouping to fit the evidence (1).' },
  { q: 'Woese **published** his results in a scientific journal. Explain why this helped his idea to be accepted.', marks: 2, ms: 'Peer review / other scientists checked the work (1); others could repeat the sequencing / test it and got similar results (1).' },
  { q: 'About **8.7 million** eukaryote species exist; about **1.2 million** are named. Calculate the percentage **not yet named** (3 s.f.).', marks: 2, ms: '(8.7 − 1.2) ÷ 8.7 × 100 (1); = 86.2% (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Classification', 'Sorting organisms into groups by their similarities and differences.'],
  ['Artificial classification', 'Grouping by one or a few observable features, e.g. can fly.'],
  ['Natural classification', 'Grouping by evolutionary relationships (common ancestors).'],
  ['Species', 'Organisms that can breed to produce fertile offspring.'],
  ['Binomial name', 'Two-part Latin name: Genus species, e.g. Homo sapiens.'],
  ['Genus', 'Group of closely related species; first part of the binomial name.'],
  ['Linnaean hierarchy', 'Kingdom, phylum, class, order, family, genus, species.'],
  ['Domain', 'Highest level: Bacteria, Archaea or Eukarya (Woese, 1990).'],
  ['Kingdom', 'Large group, e.g. plants, animals, fungi, protists, prokaryotes.'],
  ['Prokaryote', 'Single-celled organism with no nucleus (bacteria, archaea).'],
  ['Eukaryote', 'Organism whose cells have a nucleus.'],
  ['Archaea', 'Prokaryotes whose RNA and DNA differ greatly from bacteria.'],
  ['DNA sequencing', 'Finding the order of bases (A, T, C, G) in DNA.'],
  ['Evolutionary tree', 'Diagram of how species are related through common ancestors.'],
  ['Common ancestor', 'An ancestral species from which two or more species evolved.'],
  ['Convergent evolution', 'Unrelated organisms evolve similar features in similar environments.'],
], { notes: 'Use as a cover-and-recall activity. Spelling: Archaea, Eukarya, binomial. Binomial names: capital genus, lower-case species, italics (underline when handwritten). "Common ancestor" and "evolutionary tree" link to B6.1.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('Scientists compared a **40-base** section of the same gene in four cats. Differences from the **lion** (__Panthera leo__): tiger **4**, leopard **2**, domestic cat **10**.', [
  { l: 'a', q: 'What is the **genus** of the lion? How can you tell from its name?', marks: 2, ms: 'Panthera (1); the genus is the first part of the binomial name / has a capital letter (1).' },
  { l: 'b', q: 'Calculate the percentage similarity between the lion and the **tiger**.', marks: 2, ms: '(40 − 4) ÷ 40 × 100 / 36 ÷ 40 × 100 (1); = 90% (1).' },
  { l: 'c', q: 'Which cat is **most closely related** to the lion? Explain using the data.', marks: 2, ms: 'Leopard (1); fewest differences (2) / 95% similar, so the most recent common ancestor with the lion (1).' },
  { l: 'd', q: 'Sketch an evolutionary tree for lion, leopard, tiger and domestic cat. Label the most recent common ancestor of lion and leopard with **X**.', marks: 2, ms: 'Lion and leopard joined at a branch point labelled X, tiger joining their stem further back (1); domestic cat joining last / at the base (1).', h: 1.15 },
  { l: 'e', q: 'Explain why DNA evidence gives a more reliable classification than comparing **appearance**.', marks: 3, ms: 'Similar appearance may be due to convergent evolution / similar environment, not relationship (1); DNA differences build up over time by mutation, so they measure time since a common ancestor (1); DNA can be measured / compared objectively / many bases, and repeated by other scientists (1).', h: 1.2 },
  { l: 'f', q: 'Describe how Woese\'s work changed the classification of **prokaryotes**.', marks: 2, ms: 'Compared ribosomal RNA / gene sequences and found two very different groups of prokaryotes (1); split them into two domains, Bacteria and Archaea (with Eukarya as the third domain) (1).' },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Linnaeus: artificial / observable features; two kingdoms (plants, animals); hierarchy kingdom → species; binomial names.',
    'Light microscopes: single-celled organisms seen; protists added (three kingdoms).',
    'Electron microscopes: internal cell structure; prokaryotes have no nucleus; five kingdoms (prokaryotes, protists, fungi, plants, animals).',
    'Appearance can mislead: convergent evolution (shark / dolphin, bat / bird); a natural system groups by common ancestors.',
    'DNA / RNA sequencing: compare base sequences; more similar = more closely related / more recent common ancestor; evolutionary trees built from the data.',
    'Woese: rRNA sequences showed archaea differ from bacteria; three domains (Bacteria, Archaea, Eukarya) above kingdom.',
    'Reclassification examples: whales and hippos; fungi closer to animals; new species found (e.g. African elephants).',
    'Ideas about Science: new technology gives new evidence; peer review and repetition before acceptance; classification is tentative.',
  ], {
    l3: 'Describes at least TWO developments (e.g. microscopes AND DNA sequencing) AND explains how EACH changed classification, with a named example or system (e.g. five kingdoms, three domains).',
    l2: 'Describes at least one development and how it changed classification, OR lists several developments with limited explanation.',
    l1: 'Simple statements, e.g. "they use DNA now" or "there are more kingdoms now".',
  });
}
const HW = [
  { n: '1', q: 'Which level of classification comes **directly below** kingdom?', marks: 1, ms: 'Phylum (1).' },
  { n: '2', q: 'The scientific name of the grey wolf is __Canis lupus__. Name its **genus** and state **one** rule for writing binomial names.', marks: 2, ms: 'Canis (1); genus capital / species lower case / italics or underlined (1).' },
  { n: '3', q: 'Two bird species differ at **3** bases in a **60-base** section of DNA. Calculate the percentage similarity.', marks: 2, ms: '(60 − 3) ÷ 60 × 100 (1); = 95% (1).' },
  { n: '4', q: 'Species W and X share a common ancestor **5 million** years ago; X and Y share one **12 million** years ago. Which pair is more closely related? Explain.', marks: 2, ms: 'W and X (1); more recent common ancestor / less time for differences to build up (1).' },
  { n: '5', q: 'Bats and birds both have wings. Explain why "animals with wings" is an **artificial** group.', marks: 2, ms: 'Grouped by one observable feature (1); bats (mammals) and birds are not closely related / wings evolved separately / convergent evolution (1).', h: 1.1 },
  { n: '6', q: 'At first, many scientists did not accept Woese\'s domain **Archaea**. Suggest **two** reasons why it was later accepted.', marks: 2, ms: 'Any two (1 each): other scientists repeated / checked the work (peer review); more genes / whole genomes were sequenced and agreed; other evidence (membrane lipids / biochemistry) supported it.', h: 1.1 },
  { n: '7', q: 'Describe how **developments in biology** have changed the way organisms are classified, from Linnaeus to the present day.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. All questions are for both tiers.', HW, 17, { dividerSub: 'B6.2 Classification • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
// deck-specific: the B6.2 title is long, so widen every footer text box to keep it on one line
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | B6.2') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
const out = path.join(__dirname, 'OCR21C_B6.2_Classification_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
