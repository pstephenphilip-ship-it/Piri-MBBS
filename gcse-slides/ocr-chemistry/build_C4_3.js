// build_C4_3.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C4 Material choices, C4.3 Why are nanoparticles so useful?
// (one deck, Higher & Foundation; Part 3 of 4 in J260 Chapter C4)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C4_3.js
// Structure copied from ../ocr-biology/build_B6_3.js. ocr_chem_template.js is NOT edited: atom-ball, polygon, hexagon
// lattice, nanotube, fullerene, cube, particle-grid, gas-syringe, flask, sock and person helpers are in the DECK-SPECIFIC block.
// Scope (see SPEC_C4_3.md): J260 C4.3 = J258 C4.4 renumbered (J258 C4.2 polymers is separate-only).
// Statements: C4.3.1 compare nano dimensions with atoms and molecules; C4.3.2 surface area to volume and its effect on
// properties; C4.3.3 properties of nanoparticulate materials related to their uses (size, surface area, atoms in tubes or
// rings); C4.3.4 nanoparticles in materials (wording UNVERIFIED); C4.3.5 possible risks of nanoparticulate materials;
// maths: standard form, ratios, surface area and volume of cubes. No HT statement found. Bonding in graphene / giant
// covalent structures (C4.2) and LCA (C4.4) are recap / link only.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C4', chapterTitle: 'Material choices', code: 'C4.3', title: 'Why are nanoparticles so useful?',
  part: 3, parts: 4, specRange: 'C4.3.1–C4.3.5',
  subtitle: 'Why are nanoparticles so useful?',
  keywords: ['Nanoparticle', 'Nanometre', 'Surface area to volume', 'Catalyst', 'Nanotube', 'Risk'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));
const near = (a, b, t = 1e-9) => Math.abs(a - b) <= t * Math.max(1, Math.abs(b));

// ======================= CALCULATIONS (asserted) =======================
// slide 5: sizes (typical values; atom ~0.1 nm is the GCSE convention)
const NM = 1e-9;
calc('1 nm in m', NM, 1e-9, 1e-24);
calc('atom 0.1 nm in m', 0.1 * NM, 1e-10, 1e-24);
calc('100 nm in m', 100 * NM, 1e-7, 1e-22);
calc('atoms across a 2 nm particle (0.1 nm atoms)', 2 / 0.1, 20, 1e-9);
calc('QC 50 nm in m', 50 * NM, 5e-8, 1e-22);
calc('QC hair 8e-5 m ÷ 80 nm', 8e-5 / (80 * NM), 1000, 1e-9);
// slide 6: standard form ordering and ratios
const SIZES = [['atom', 1e-10], ['simple molecule', 5e-10], ['nanoparticle', 3.5e-8], ['fine particle PM2.5', 2.5e-6], ['red blood cell', 7e-6], ['human hair', 8e-5]];
for (let i = 1; i < SIZES.length; i++) assert(SIZES[i][1] > SIZES[i - 1][1], 'sizes in increasing order');
calc('35 nm in m', 35 * NM, 3.5e-8, 1e-22);
calc('nanoparticle ÷ atom', 3.5e-8 / 1e-10, 350, 1e-9);
calc('hair ÷ atom', 8e-5 / 1e-10, 8e5, 1e-9);
calc('log10(hair ÷ atom) to 1 d.p.', Math.round(Math.log10(8e5) * 10) / 10, 5.9, 1e-12);
calc('QC PM2.5 2.5 µm ÷ 25 nm', 2.5e-6 / 25e-9, 100, 1e-9);
// slide 8: surface area to volume of cubes
const sa = L => 6 * L * L, vol = L => L ** 3, ratio = L => sa(L) / vol(L);
calc('1 cm cube SA', sa(1), 6); calc('1 cm cube V', vol(1), 1); calc('1 cm cube SA:V', ratio(1), 6);
calc('8 cubes of 0.5 cm: total SA', 8 * sa(0.5), 12, 1e-12); calc('8 × 0.5 cm cubes total V', 8 * vol(0.5), 1, 1e-12);
calc('64 cubes of 0.25 cm: total SA', 64 * sa(0.25), 24, 1e-12); calc('64 × 0.25 cm cubes total V', 64 * vol(0.25), 1, 1e-12);
calc('SA:V = 6/L check L = 0.25', ratio(0.25), 24, 1e-12);
calc('QC 2 cm cube SA', sa(2), 24); calc('QC 2 cm cube V', vol(2), 8); calc('QC 2 cm SA:V', ratio(2), 3);
// stretch: 1 cm cube cut into 10 nm cubes
const perSide = calc('10 nm cubes along 1 cm', 1e-2 / 1e-8, 1e6, 1e-6);
calc('number of 10 nm cubes in 1 cm³ (exponent)', Math.log10(perSide ** 3), 18, 1e-9);
const saNano = calc('total SA of 10 nm cubes in cm²', 6 * 1 * 1 * perSide, 6e6, 1e-6);
calc('total SA via SA:V × V', ratio(1e-6) * 1, 6e6, 1e-6);
calc('total SA in m² (10 000 cm² per m²)', saNano / 1e4, 600, 1e-9);
calc('SA:V factor 1 cm → 10 nm', ratio(1e-6) / ratio(1), 1e6, 1e-6); // 10 nm = 1e-6 cm
calc('10 nm = 1e-6 cm', 10e-9 / 1e-2, 1e-6, 1e-15);
// slide 9: fraction of atoms on the surface (2D slice: n × n square of atoms)
const surf2D = n => (n * n - (n - 2) ** 2) / (n * n);
calc('4 × 4 surface atoms', 16 - 4, 12); calc('4 × 4 surface %', surf2D(4) * 100, 75, 1e-9);
calc('10 × 10 surface atoms', 100 - 64, 36); calc('10 × 10 surface %', surf2D(10) * 100, 36, 1e-9);
const surf3D = n => 1 - ((n - 2) / n) ** 3;
calc('3D cube 10 atoms a side surface %', surf3D(10) * 100, 48.8, 1e-9);
calc('3D cube 100 atoms a side surface % (2 s.f.)', sf(surf3D(100) * 100, 2), 5.9, 1e-12);
calc('QC 6 × 6 surface atoms', 36 - 16, 20); calc('QC 6 × 6 surface % (2 s.f.)', sf(surf2D(6) * 100, 2), 56, 1e-12);
// slides 11–12: MnO2 powder vs granules catalysing hydrogen peroxide decomposition
// 2H2O2(aq) -> 2H2O(l) + O2(g): atom balance
const atoms = sp_ => { const m = {}; sp_.forEach(([n, f]) => Object.entries(f).forEach(([el, k]) => { m[el] = (m[el] || 0) + n * k; })); return m; };
assert.deepStrictEqual(atoms([[2, { H: 2, O: 2 }]]), atoms([[2, { H: 2, O: 1 }], [1, { O: 2 }]]), 'H2O2 decomposition balanced');
const TIME = [0, 10, 20, 30, 40, 50, 60];
const POW = [0, 18, 32, 42, 47, 49, 50];
const GRAN = [0, 5, 10, 15, 19, 23, 27];
calc('10-volume: 5 cm³ gives max O2', 5 * 10, 50);
for (let i = 1; i < TIME.length; i++) assert(POW[i] >= POW[i - 1] && GRAN[i] > GRAN[i - 1] && POW[i] > GRAN[i], 'volumes rise, powder faster');
assert(Math.max(...POW) <= 50 && Math.max(...GRAN) <= 50, 'no more than 50 cm³ O2');
const rP = calc('powder mean rate 0–30 s', POW[3] / 30, 1.4, 1e-9);
const rG = calc('granules mean rate 0–30 s', GRAN[3] / 30, 0.5, 1e-9);
calc('rate ratio powder ÷ granules', rP / rG, 2.8, 1e-9);
calc('QC granules mean rate 0–60 s', GRAN[6] / 60, 0.45, 1e-9);
// slide 13: catalyst particle sizes
calc('SA:V 1 µm vs 10 nm particle factor', (6 / 10) / (6 / 1000), 100, 1e-9);
calc('QC SA:V 50 nm vs 5 nm factor', (6 / 5) / (6 / 50), 10, 1e-9);
// slide 15: nanotubes and fullerenes
calc('nanotube 1 µm long ÷ 1 nm wide', 1000 / 1, 1000);
calc('C60 molecules across 1 mm (1 nm each)', 1e-3 / 1e-9, 1e6, 1e-6);
calc('C60 atoms: 12 pentagons, 20 hexagons → 60', (12 * 5 + 20 * 6) / 3, 60, 1e-12);
calc('QC nanotube 1.5 nm × 3000 → 4.5 µm', 1.5 * 3000 / 1000, 4.5, 1e-9);
// slides 16 and 19: silver in socks (illustrative values following published wash studies; UNVERIFIED)
const WASH = [0, 1, 2, 3, 4];
const AG = [40, 28, 20, 14, 10]; // µg of silver per g of fabric
calc('sock 20 g × 40 µg/g', 20 * 40, 800); calc('800 µg in mg', 800 / 1000, 0.8, 1e-12);
calc('QC sock 25 g × 40 µg/g in mg', 25 * 40 / 1000, 1, 1e-12);
for (let i = 1; i < AG.length; i++) assert(AG[i] < AG[i - 1], 'silver falls each wash');
calc('% lost after 1 wash', (AG[0] - AG[1]) / AG[0] * 100, 30, 1e-9);
calc('% lost after 4 washes', (AG[0] - AG[4]) / AG[0] * 100, 75, 1e-9);
calc('silver washed out of 20 g sock in 4 washes (µg)', (AG[0] - AG[4]) * 20, 600);
calc('QC % lost wash 2 → 3', (AG[2] - AG[3]) / AG[2] * 100, 30, 1e-9);
// recaps, full question, homework
calc('R1 25 nm in m', 25 * NM, 2.5e-8, 1e-22);
calc('R1 nanoparticle 25 nm ÷ atom 0.1 nm', 25 / 0.1, 250, 1e-9);
calc('R2 3 cm cube SA', sa(3), 54); calc('R2 3 cm cube V', vol(3), 27); calc('R2 3 cm SA:V', ratio(3), 2);
calc('R3 mean rate 36 cm³ in 40 s', 36 / 40, 0.9, 1e-9);
calc('R4 tube 2 nm × 500 → 1 µm', 2 * 500, 1000);
calc('FQ 4 nm in m', 4 * NM, 4e-9, 1e-24);
calc('FQ 4 nm ÷ 0.1 nm', 4 / 0.1, 40, 1e-9);
calc('FQ cube 4 nm: SA', sa(4), 96); calc('FQ cube 4 nm: V', vol(4), 64); calc('FQ cube 4 nm: SA:V', ratio(4), 1.5, 1e-12);
calc('FQ cube 40 nm SA:V', ratio(40), 0.15, 1e-12);
calc('FQ factor', ratio(4) / ratio(40), 10, 1e-9);
calc('HW 0.000 000 08 m in standard form', 0.00000008, 8e-8, 1e-22);
calc('HW 0.5 cm cube SA:V', ratio(0.5), 12, 1e-12);
calc('HW dressing 60 → 15 % lost', (60 - 15) / 60 * 100, 75, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_chem_template.js) =======================
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
const CARB = ['4A4F5C', '23262E'], AGc = ['C9CED6', '7D8592'], GOLD = ['E8C43A', 'A8861A'], TIO = ['F2F2F2', '9AA3B0'], HI = 'C8414C', VIO = C.blue;
// regular hexagon vertices (pointy-top when rot = 30)
const hexPts = (cx, cy, r, rot = 30) => [0, 1, 2, 3, 4, 5].map(k => { const a = (60 * k + rot) * Math.PI / 180; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
// graphene-type sheet: hexagon outlines with carbon atoms at the vertices, clipped to a rectangle
function hexSheet(s, x, y, w, h, r, o = {}) {
  const dx = Math.sqrt(3) * r, dy = 1.5 * r;
  const seen = new Set();
  for (let row = 0; row * dy <= h - r; row++) {
    for (let col = 0; ; col++) {
      const cx = x + dx / 2 + col * dx + (row % 2 ? dx / 2 : 0), cy = y + r + row * dy;
      if (cx + dx / 2 > x + w + 1e-6) break;
      const p = hexPts(cx, cy, r, 30);
      poly(s, p, o.fill || null, o.bond || '6B7385', { lw: o.lw || 1 });
      if (o.atoms !== false) p.forEach(([ax, ay]) => { const k = `${ax.toFixed(3)},${ay.toFixed(3)}`; if (!seen.has(k)) { seen.add(k); ball(s, ax, ay, o.ar || 0.045, CARB[0], CARB[1], 0.5); } });
    }
  }
}
// cube in oblique projection
function cube(s, x, y, a, fill = 'C9B6E4', edge = '5A3590', o = {}) {
  const d = a * 0.4;
  poly(s, [[x, y + d], [x + a, y + d], [x + a, y + d + a], [x, y + d + a]], fill, edge, { lw: o.lw || 1 });
  poly(s, [[x, y + d], [x + d, y], [x + a + d, y], [x + a, y + d]], o.top || 'DCCDF3', edge, { lw: o.lw || 1 });
  poly(s, [[x + a, y + d], [x + a + d, y], [x + a + d, y + a], [x + a, y + d + a]], o.side || 'B49AD8', edge, { lw: o.lw || 1 });
}
// a cube of side a split into n × n × n small cubes (only the visible faces drawn)
function cubeGrid(s, x, y, a, n, o = {}) {
  cube(s, x, y, a, o.fill, o.edge, o);
  const d = a * 0.4, st = a / n;
  for (let i = 1; i < n; i++) {
    line(s, x + i * st, y + d, x + i * st, y + d + a, '5A3590', 0.75); line(s, x, y + d + i * st, x + a, y + d + i * st, '5A3590', 0.75);
    line(s, x + i * st, y + d, x + i * st + d, y, '5A3590', 0.75); line(s, x + i * d / n, y + d - i * d / n, x + a + i * d / n, y + d - i * d / n, '5A3590', 0.75);
    line(s, x + a + i * d / n, y + d - i * d / n, x + a + i * d / n, y + d - i * d / n + a, '5A3590', 0.75); line(s, x + a, y + d + i * st, x + a + d, y + i * st, '5A3590', 0.75);
  }
}
// square grid of atoms (2D slice) with surface atoms highlighted
function atomGrid(s, x, y, n, r, o = {}) {
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    const edge = i === 0 || j === 0 || i === n - 1 || j === n - 1;
    ball(s, x + r + i * 2 * r, y + r + j * 2 * r, r * 0.95, edge ? (o.surf || 'F5A742') : (o.bulk || 'C9B6E4'), edge ? 'B8730A' : '5A3590', 0.5);
  }
}
// conical flask
function flask(s, x, y, w, h, liq = 0.35, col = 'DCEBF7') {
  const nw = w * 0.28, nh = h * 0.3;
  const body = [[x + (w - nw) / 2, y + nh], [x, y + h], [x + w, y + h], [x + (w + nw) / 2, y + nh]];
  const ly = y + h - h * liq, t = (ly - (y + nh)) / (h - nh);
  const lx1 = x + (w - nw) / 2 - t * (w - nw) / 2, lx2 = x + (w + nw) / 2 + t * (w - nw) / 2;
  poly(s, [[lx1, ly], [x, y + h], [x + w, y + h], [lx2, ly]], col, null);
  poly(s, body, null, C.ink, { lw: 1.75 });
  line(s, x + (w - nw) / 2, y, x + (w - nw) / 2, y + nh, C.ink, 1.75); line(s, x + (w + nw) / 2, y, x + (w + nw) / 2, y + nh, C.ink, 1.75);
}
// horizontal gas syringe (barrel + plunger), reading v of 100 cm³
function gasSyringe(s, x, y, w, v) {
  box(s, x, y, w, 0.34, 'F4F8FC', C.ink, { lw: 1.5 });
  for (let i = 0; i <= 10; i++) { const tx = x + 0.1 + i * (w - 0.2) / 10; line(s, tx, y, tx, y + (i % 5 ? 0.08 : 0.14), C.ink, 0.75); }
  const px = x + 0.1 + v / 100 * (w - 0.2);
  box(s, x + 0.05, y + 0.06, px - x - 0.05, 0.22, 'E6F0F8', null);
  box(s, px - 0.05, y + 0.03, 0.1, 0.28, '6B7385', C.ink, { lw: 0.75 });
  line(s, px, y + 0.17, x + w + 0.45, y + 0.17, C.ink, 2.5); box(s, x + w + 0.45, y + 0.02, 0.08, 0.3, '6B7385', C.ink, { lw: 0.75 });
}
// sock outline (custom polygon)
function sock(s, x, y, k = 1, col = 'EDEFF3') {
  poly(s, [[x, y], [x + 0.55 * k, y], [x + 0.55 * k, y + 0.95 * k], [x + 1.05 * k, y + 1.15 * k], [x + 1.05 * k, y + 1.5 * k], [x + 0.1 * k, y + 1.5 * k], [x, y + 1.3 * k]], col, '6B7385', { lw: 1.25 });
  box(s, x, y, 0.55 * k, 0.16 * k, 'C9CED6', '6B7385', { lw: 0.75 });
}
// simple person (front view) with lungs
function person(s, cx, top, k = 1) {
  ball(s, cx, top + 0.3 * k, 0.3 * k, 'F2D6B8', 'A8865E', 1);
  box(s, cx - 0.55 * k, top + 0.65 * k, 1.1 * k, 1.75 * k, 'DDE7F2', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.15, lw: 1 });
  oval(s, cx - 0.25 * k, top + 1.25 * k, 0.4 * k, 0.8 * k, 'F2B8B8', 'B85A5A', { lw: 1 });
  oval(s, cx + 0.25 * k, top + 1.25 * k, 0.4 * k, 0.8 * k, 'F2B8B8', 'B85A5A', { lw: 1 });
  line(s, cx, top + 0.6 * k, cx, top + 0.95 * k, 'B85A5A', 2);
}
function dots(s, pts, r, col = AGc[0], edge = AGc[1]) { pts.forEach(([x, y]) => ball(s, x, y, r, col, edge, 0.5)); }

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Nanoparticles',
  footer: 'OCR J260 Combined Science B • C4.3 Why are nanoparticles so useful? • teacher deck • mark schemes in the notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • nano sizes, surface area to volume, uses, nanotubes, risks` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statement found • stretch marked' },
    { icon: '▲', text: 'Maths: standard form, ratios, surface area and volume of cubes, rates from a gas syringe' },
  ],
  notes: 'C4.3 Why are nanoparticles so useful? is Part 3 of 4 in J260 Chapter C4 Material choices: C4.1 How is data used to choose a material for a particular use?; C4.2 How do bonding and structure affect properties of materials?; C4.3 Why are nanoparticles so useful?; C4.4 the life cycle of materials (LCA).\nNumbering: in J258 (Chemistry B, separate science) this sub-topic is C4.4, because J258 has an extra C4.2 on types of polymers that is separate-science only. The J260 C4.3 title is confirmed by the J260 specification listing (plutoniumscience mirror, search extract) and RSC Education resources that cite "OCR Combined Science B C4.3 Why are nanoparticles so useful?" with statements C4.3.1, C4.3.3 and C4.3.5. See SPEC_C4_3.md for wording and confidence.\nNo Higher-only (bold) statement was found for C4.3; the 10 nm cube calculation and the 3D surface-atom figures are marked GRADE 7–9 STRETCH.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C4.3.1', text: 'Define a **nanoparticle** (1–100 nm) and compare **nano** sizes with **atoms** and **molecules**.' },
  { code: 'C4.3.1', text: 'Write sizes in **standard form**, put them in order and compare them with **ratios**.' },
  { code: 'C4.3.2', text: 'Calculate the **surface area**, **volume** and **SA : V ratio** of cubes of different sizes.' },
  { code: 'C4.3.2', text: 'Explain how a high **SA : V ratio** changes the **properties** of nanoparticles.' },
  { code: 'C4.3.3', text: 'Relate the **properties** of nanoparticles (size, surface, atoms in **tubes** or **rings**) to their **uses**.' },
  { code: 'C4.3.4', text: 'Describe how nanoparticles are added to **materials**, e.g. silver in fabrics, nanotubes in plastics.' },
  { code: 'C4.3.5', text: 'Explain the possible **risks** of some nanoparticulate materials, and weigh **benefits** against **risks**.' },
  { code: 'C4.3.2', text: 'Practical: compare a **powdered** and a **granular** catalyst using a **gas syringe**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (wording from search extracts of the J260 and J258 specifications and RSC spec links; see SPEC_C4_3.md):\nC4.3.1 compare "nano" dimensions to typical dimensions of atoms and molecules (RSC: high confidence)\nC4.3.2 describe the surface area to volume relationship for different-sized particles and describe how this affects properties (medium)\nC4.3.3 describe how the properties of nanoparticulate materials are related to their uses, including size, surface area and the arrangement of atoms in tubes or rings (RSC extract: medium–high)\nC4.3.4 nanoparticles incorporated in / embedded in materials (wording UNVERIFIED; medium–low)\nC4.3.5 explain the possible risks associated with some nanoparticulate materials (RSC "Toxic socks": high)\nMaths: M1b standard form, M1c ratios, M5c surface area and volume of cubes. Ideas about Science: risk, benefits and risks, decisions.\nNo statement in C4.3 is bold (Higher only) in any source found.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C4 Material choices • C4.3 is Part 3 of 4 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C4.3.1', 'How small is nano? Sizes and standard form', 'Both tiers', C.blue],
    ['C4.3.2', 'Surface area to volume and surface atoms', 'Both tiers', C.blue],
    ['Practical', 'Powder vs granules: catalyst surface area', 'Practical', C.orange],
    ['C4.3.3', 'Uses: catalysts, sunscreen, silver, nanotubes', 'Both tiers', C.blue],
    ['C4.3.4', 'Nanoparticles in materials (nanocomposites)', 'Both tiers', C.blue],
    ['C4.3.5', 'Risks, and benefits against risks', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C4.3\nNanoparticles', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C1 particulates, catalytic converters • C2 atoms, covalent bonds • C4.2 graphite', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C4 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'C4.1 How is data used to choose a material for a particular use?',
      'C4.2 How do bonding and structure affect properties of materials?',
      '**C4.3 Why are nanoparticles so useful?** (this deck)',
      'C4.4 Life cycle of materials (life cycle assessment)',
    ], { size: 11, color: 'E4DAF5', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'No C4.3 statement is Higher only. Harder maths is marked **GRADE 7–9 STRETCH**.',
      'Ideas about Science: **risk**, **benefits and risks**, **uncertainty** and who **decides**.',
      'Maths: **standard form**, **ratios**, **surface area and volume** of cubes, **rates** from a graph.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C4 has four sub-topics. J258 (Chemistry B) has five: its C4.2 "What are the different types of polymers?" is separate-science only, so J258 C4.3 bonding and structure becomes J260 C4.2, J258 C4.4 nanoparticles becomes J260 C4.3 (this deck) and J258 C4.5 life cycle becomes J260 C4.4 (docbrown combined page: "Topic C4.4 considers the life cycle of materials"; SPEC_C4_1.md agrees).\nOverlap control: giant covalent structures, diamond and graphite are taught in C4.2 and only recapped here; SPEC_C4_2.md leaves graphene, fullerenes and nanotubes to C4.3, so slide 15 teaches them. Choosing materials from property data is C4.1. Life cycle assessment and disposal are C4.4: only mentioned on slide 19 (silver washed into waste water). Rates of reaction are taught in Chapter C6; the practical here is used only to show the effect of surface area.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C2 • atoms', q: 'Roughly how wide is an **atom**, in metres? Which particles are in its **nucleus**?' },
  { from: 'C1 • air pollution', q: 'Diesel engines release **particulates**. What are they, and why are they harmful to health?' },
  { from: 'C1 • cleaning up exhaust', q: 'A **catalytic converter** contains platinum. What does a **catalyst** do?' },
  { from: 'C2 • bonding', q: 'What is a **covalent bond**? Which type of elements form covalent bonds?' },
  { from: 'C4.2 • carbon structures', q: 'Describe the structure of **graphite**. Why can graphite **conduct** electricity?' },
  { from: 'Maths • standard form', q: 'Write **0.000 001 m** and **0.000 000 001 m** in standard form. Which one is a **nanometre**?' },
], { subtitle: 'Recall from C1, C2 and C4.2 • 6 minutes • no notes', notes: 'ANSWERS\n1. About 1 × 10⁻¹⁰ m (0.1 nm). Protons and neutrons.\n2. Tiny solid particles (mostly carbon, soot) in the air, e.g. PM10 and PM2.5. They are breathed deep into the lungs and can cause or worsen breathing problems, heart disease and cancer (C1).\n3. Speeds up a reaction without being used up (C1: converts CO and NO into CO₂ and N₂). Platinum is spread very thinly to give a large surface.\n4. A shared pair of electrons between two atoms. Non-metals (C2).\n5. Layers of carbon atoms in hexagons; each C covalently bonded to three others; weak forces between layers. One electron per atom is delocalised, so it conducts (C4.2; recap only). A single layer of graphite is graphene (introduced on slide 15).\n6. 1 × 10⁻⁶ m (a micrometre, µm) and 1 × 10⁻⁹ m = 1 nanometre (nm).' }), 'Retrieval starter');

// ======================= 5 HOW SMALL IS NANO =======================
reg(D.contentSlide({
  title: 'How small is a nanoparticle?',
  subtitle: `Specification ${sp('C4.3.1')} • comparing nano dimensions with atoms and molecules`,
  tag: 'C4.3.1', caption: 'size ladder; each step is NOT to scale (sizes span 6 powers of ten)',
  draw: (s) => {
    const rows = [
      ['Atom', '0.1 nm', '1 × 10⁻¹⁰ m', () => ball(s, 1.25, 1.85, 0.07, CARB[0], CARB[1])],
      ['Simple molecule', '~0.5 nm', '5 × 10⁻¹⁰ m', () => { ball(s, 1.12, 2.55, 0.08, 'E05A5A', 'A03030'); ball(s, 1.28, 2.55, 0.09, CARB[0], CARB[1]); ball(s, 1.44, 2.55, 0.08, 'E05A5A', 'A03030'); }],
      ['Nanoparticle', '1–100 nm', '10⁻⁹ to 10⁻⁷ m', () => { for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) ball(s, 1.04 + i * 0.13, 3.05 + j * 0.13, 0.065, GOLD[0], GOLD[1], 0.5); }],
      ['Fine particle (PM2.5)', '100–2500 nm', 'up to 2.5 × 10⁻⁶ m', () => ball(s, 1.25, 4.05, 0.26, '9AA3B0', '4A5568')],
      ['Human hair (width)', '~80 000 nm', '8 × 10⁻⁵ m', () => box(s, 0.75, 4.62, 1.0, 0.36, 'C99A5B', '8A6D3B', { shape: SH.ROUNDED_RECTANGLE, r: 0.1 })],
    ];
    rows.forEach(([n, nm, m, draw], i) => {
      const y = 1.6 + i * 0.7 + (i >= 2 ? 0.08 : 0) + (i >= 3 ? 0.12 : 0);
      if (i === 2) box(s, 0.65, y - 0.06, 5.7, 0.7, 'FFF4E0', 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      draw();
      label(s, 1.95, y, 1.9, `**${n}**`, { size: 11, align: 'left', h: 0.5 });
      label(s, 3.85, y, 1.1, nm, { size: 11, color: VIO, bold: true, h: 0.5 });
      label(s, 4.95, y, 1.4, m, { size: 10.5, h: 0.5 });
    });
    label(s, 1.95, 1.3, 1.9, 'Object', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.25 });
    label(s, 3.85, 1.3, 1.1, 'Size', { size: 10, italic: true, color: C.grey, h: 0.25 });
    label(s, 4.95, 1.3, 1.4, 'In metres', { size: 10, italic: true, color: C.grey, h: 0.25 });
    arrow(s, 0.62, 1.65, 0.62, 5.0, VIO, 2);
    label(s, 0.65, 5.15, 5.7, '**1 nm = 1 × 10⁻⁹ m** • a nanoparticle is about 10 to 1000 atoms across', { size: 10.5, h: 0.4 });
  },
  head: 'Nanoparticles',
  lines: [
    'A **nanometre** (nm) is one billionth of a metre: **1 nm = 1 × 10⁻⁹ m**.',
    '**Nanoparticles** are particles **1–100 nm** across.',
    'They are **bigger** than atoms (about **0.1 nm**) and simple molecules (under 1 nm), but much **smaller** than fine dust or cells.',
    'Nanoparticles can be made of metals (silver, gold), metal oxides (titanium dioxide, zinc oxide) or carbon (nanotubes).',
  ],
  size: 11.5,
  worked: { head: 'Worked example: atoms across a nanoparticle', q: 'How many atoms (0.1 nm wide) fit across a 2 nm nanoparticle?',
    steps: [['Same units', 'both sizes in nm: 2 nm and 0.1 nm'], ['Divide', '2 ÷ 0.1'], ['Answer', 'about **20 atoms** across']], size: 10.5 },
  workedH: 1.55,
  qc: 'Write **50 nm** in metres in standard form. How many times wider is a hair (**8 × 10⁻⁵ m**) than an **80 nm** particle?',
  notes: 'QUICK CHECK ANSWER: 50 nm = 50 × 10⁻⁹ m = 5 × 10⁻⁸ m. 80 nm = 8 × 10⁻⁸ m; 8 × 10⁻⁵ ÷ 8 × 10⁻⁸ = 1000 times.\nC4.3.1 wording (RSC spec link): "compare nano dimensions to typical dimensions of atoms and molecules". Sizes are typical values: atom radius ~0.1 nm in GCSE questions (atoms are 0.1–0.5 nm across); PM2.5 means particles below 2.5 µm (C1 recap); human hair width varies (about 20–180 µm), 80 µm used as a round value. Ladder not to scale, which is why standard form is needed.',
}), 'C4.3.1 How small is nano?');

// ======================= 6 STANDARD FORM =======================
{
  const s = D.contentHeader('Comparing sizes with standard form', `Specification ${sp('C4.3.1')} • ordering sizes and working out how many times bigger`, { tag: 'C4.3.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'powers-of-ten scale: each major tick is 10 times the one before');
  // log scale from 1e-10 to 1e-4
  const x0 = 0.85, x1 = 6.15, yA = 3.2;
  const X = v => x0 + (Math.log10(v) + 10) / 6 * (x1 - x0);
  line(s, x0, yA, x1, yA, C.ink, 2);
  for (let e = -10; e <= -4; e++) { line(s, X(10 ** e), yA - 0.1, X(10 ** e), yA + 0.1, C.ink, 1.5); label(s, X(10 ** e) - 0.4, yA + 0.12, 0.8, `10^^${String(e).replace('-', '−')}^^`, { size: 10, h: 0.25 }); }
  box(s, X(1e-9), yA - 0.16, X(1e-7) - X(1e-9), 0.32, 'F5A742', null, { tr: 55 });
  label(s, X(1e-9), yA - 0.5, X(1e-7) - X(1e-9), '**nano range**', { size: 10.5, color: C.orange, h: 0.28 });
  const marks = [['atom', 1e-10, 1, '1 × 10⁻¹⁰ m'], ['molecule', 5e-10, -1, '5 × 10⁻¹⁰ m'], ['nanoparticle', 3.5e-8, 1, '3.5 × 10⁻⁸ m'],
    ['PM2.5', 2.5e-6, -1, '2.5 × 10⁻⁶ m'], ['blood cell', 7e-6, 1, '7 × 10⁻⁶ m'], ['hair', 8e-5, -1, '8 × 10⁻⁵ m']];
  marks.forEach(([n, v, up, txt]) => {
    const xx = X(v);
    assert(SIZES.find(z => Math.abs(z[1] - v) < 1e-15), 'size listed');
    ball(s, xx, yA, 0.06, VIO, VIO);
    line(s, xx, up > 0 ? yA - 0.62 : yA + 0.42, xx, up > 0 ? yA - 0.08 : yA + 0.08, C.blue, 1, { dash: 'dash' });
    label(s, xx - 0.62, up > 0 ? yA - 1.2 : yA + 0.45, 1.24, `**${n}**\n${txt}`, { size: 10, h: 0.55, valign: up > 0 ? 'bottom' : 'top' });
  });
  label(s, 0.75, 4.75, 5.6, 'Bigger negative power = **smaller** size. Order by the power of ten first, then by the number in front.', { size: 10.5, h: 0.6, align: 'left' });
  D.card(s, 6.8, 1.3, 6.08, 2.75, 'Using standard form', [
    'Sizes this small are written as **A × 10ⁿ**, with A between 1 and 10.',
    '**nm → m**: multiply by 10⁻⁹. 35 nm = 35 × 10⁻⁹ m = **3.5 × 10⁻⁸ m**.',
    '**How many times bigger?** Divide the bigger size by the smaller (same units). This is a **ratio**.',
    'An **order of magnitude** is a factor of 10. A hair is about 10⁶ times wider than an atom.',
  ], { size: 12.5 });
  D.workedSteps(s, 6.8, 4.2, 6.08, 2.05, 'Worked example: nanoparticle compared with an atom', 'A nanoparticle is 3.5 × 10⁻⁸ m wide; an atom is 1 × 10⁻¹⁰ m.', [
    ['Ratio', '3.5 × 10⁻⁸ ÷ 1 × 10⁻¹⁰'], ['Powers', '3.5 × 10⁻⁸⁻⁽⁻¹⁰⁾ = 3.5 × 10²'], ['Answer', 'the nanoparticle is **350 times** wider than the atom']], { size: 10.5 });
  D.quickCheck(s, 'Put in order, smallest first: **2.5 × 10⁻⁶ m**, **5 × 10⁻¹⁰ m**, **3.5 × 10⁻⁸ m**. How many **25 nm** particles fit across a **2.5 µm** dust particle?');
  D.notes(s, 'QUICK CHECK ANSWER: 5 × 10⁻¹⁰ m (molecule) < 3.5 × 10⁻⁸ m (nanoparticle) < 2.5 × 10⁻⁶ m (fine particle). 2.5 µm = 2500 nm; 2500 ÷ 25 = 100 particles.\nMaths skills M1b (standard form) and M1c (ratios). Hair ÷ atom = 8 × 10⁵: log₁₀ = 5.9, so about 6 orders of magnitude (asserted in node). Red blood cell ~7 µm. All sizes typical values.');
  reg(s, 'C4.3.1 Standard form and ratios');
}

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C4.3.1')} • nano sizes`, [
  { q: 'State the size range of **nanoparticles** in nanometres.', marks: 2, ms: '1 nm (1); to 100 nm (1). Allow 1–100 nm for 2 marks; allow 10⁻⁹ to 10⁻⁷ m.' },
  { q: 'A nanoparticle is **25 nm** across. Write this size in **metres** in standard form.', marks: 2, ms: '25 × 10⁻⁹ m (1); = 2.5 × 10⁻⁸ m (1).' },
  { q: 'An atom is **0.1 nm** across. How many times wider is the 25 nm nanoparticle than the atom?', marks: 2, ms: '25 ÷ 0.1 (1); = 250 (times) (1).' },
  { q: 'Put these in order of size, **smallest first**: fine dust particle, atom, nanoparticle, simple molecule.', marks: 2, ms: 'atom, simple molecule, nanoparticle, fine dust (2). One pair swapped = 1.' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 SURFACE AREA TO VOLUME =======================
{
  const s = D.contentHeader('Surface area to volume ratio', `Specification ${sp('C4.3.2')} • cutting a cube into smaller cubes`, { tag: 'C4.3.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'the same 1 cm³ cut into smaller and smaller cubes');
  cube(s, 0.75, 1.9, 1.3);
  cubeGrid(s, 2.65, 1.9, 1.3, 2);
  cubeGrid(s, 4.55, 1.9, 1.3, 4);
  [[0.75, '1 cube, side 1 cm'], [2.65, '8 cubes, side 0.5 cm'], [4.55, '64 cubes, side 0.25 cm']].forEach(([x, t]) => label(s, x - 0.1, 3.75, 1.9, t, { size: 10, bold: true, h: 0.28 }));
  arrow(s, 2.2, 2.7, 2.55, 2.7, C.ink, 2); arrow(s, 4.1, 2.7, 4.45, 2.7, C.ink, 2);
  const rows = [[HDR('Side / cm'), HDR('Total SA / cm²'), HDR('Total V / cm³'), HDR('SA : V')],
    ...[[1, 1], [0.5, 8], [0.25, 64]].map(([L, n], i) => [tcell(String(L), i), tcell(fmt(n * sa(L)), i), tcell(fmt(n * vol(L)), i), tcell(`${fmt(ratio(L))} : 1`, i, { bold: true, color: C.red })])];
  s.addTable(rows, { x: 0.75, y: 4.15, w: 5.5, colW: [1.2, 1.6, 1.5, 1.2], rowH: 0.3, fontFace: 'Calibri', fontSize: 11, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 1.3, 6.08, 2.55, 'Smaller particles, bigger SA : V', [
    'For a cube of side L: **surface area = 6 × L²** and **volume = L³**.',
    'Cutting the cube up adds new faces, so the **total surface area** goes up but the **volume** stays the same.',
    'Halve the side → **double** the SA : V ratio. For a cube, **SA : V = 6 ÷ L**.',
    'Nanoparticles are so small that their SA : V ratio is **enormous**.',
  ], { size: 12.5 });
  D.workedSteps(s, 6.8, 4.0, 6.08, 2.25, 'Worked example: 1 cm³ as 10 nm cubes', 'GRADE 7–9 STRETCH • 10 nm = 10⁻⁸ m = 10⁻⁶ cm. Total volume stays 1 cm³.', [
    ['SA : V', '6 ÷ L = 6 ÷ 10⁻⁶ cm = 6 × 10⁶ cm⁻¹ (10⁶ times the 1 cm cube)'],
    ['Total SA', 'SA : V × volume = 6 × 10⁶ × 1 cm³ = 6 × 10⁶ cm²'],
    ['Answer', '6 × 10⁶ cm² ÷ 10⁴ = **600 m²** from just 1 cm³']], { size: 10.5 });
  D.pill(s, 11.0, 4.07, 'STRETCH', C.red, 0.85);
  D.quickCheck(s, 'A cube has sides of **2 cm**. Calculate its **surface area**, **volume** and **SA : V ratio**. How does SA : V change for a 1 cm cube?');
  D.notes(s, 'QUICK CHECK ANSWER: SA = 6 × 2² = 24 cm²; V = 2³ = 8 cm³; SA : V = 24 : 8 = 3 : 1. A 1 cm cube has 6 : 1, so halving the side doubles the ratio.\nC4.3.2 (describe the SA : V relationship for different-sized particles). Maths M5c: surface areas and volumes of cubes. Stretch derivation: 1 cm³ cut into 10 nm cubes gives (10⁶)³ = 10¹⁸ cubes, each with SA 6 × (10⁻⁶ cm)² = 6 × 10⁻¹² cm²; total = 6 × 10⁶ cm² = 600 m² (about two tennis courts). SA : V = 6/L: 6 cm⁻¹ for L = 1 cm and 6 × 10⁶ cm⁻¹ for L = 10⁻⁶ cm (factor 10⁶). All values asserted in node.');
  reg(s, 'C4.3.2 Surface area to volume');
}

// ======================= 9 SURFACE ATOMS AND PROPERTIES =======================
reg(D.contentSlide({
  title: 'Why a big surface changes properties',
  subtitle: `Specification ${sp('C4.3.2')} • a larger fraction of the atoms is at the surface`,
  tag: 'C4.3.2', caption: '2D slices through two particles; orange = surface atoms',
  draw: (s) => {
    atomGrid(s, 1.0, 2.1, 4, 0.2);
    label(s, 0.7, 1.55, 2.2, '**Tiny particle**: 4 × 4', { size: 11, h: 0.3 });
    label(s, 0.7, 3.85, 2.2, '12 of 16 at the surface\n= **75%**', { size: 11, h: 0.55 });
    atomGrid(s, 3.35, 1.85, 10, 0.1);
    label(s, 3.25, 1.55, 2.2, '**Larger particle**: 10 × 10', { size: 11, h: 0.3 });
    label(s, 3.25, 3.85, 2.2, '36 of 100 at the surface\n= **36%**', { size: 11, h: 0.55 });
    ball(s, 0.95, 4.75, 0.1, 'F5A742', 'B8730A'); label(s, 1.12, 4.62, 2.1, 'surface atom: can react', { size: 10, align: 'left', h: 0.26 });
    ball(s, 3.45, 4.75, 0.1, 'C9B6E4', '5A3590'); label(s, 3.62, 4.62, 2.6, 'inside atom: cannot touch reactants', { size: 10, align: 'left', h: 0.26 });
    label(s, 0.7, 5.05, 5.6, 'In 3D the effect is bigger: a cube 10 atoms wide has about **49%** of its atoms on the surface; 100 atoms wide, about **6%**.', { size: 10.5, h: 0.5, align: 'left' });
  },
  head: 'More surface, new properties',
  lines: [
    'In a nanoparticle a **large fraction of the atoms is on the surface**, where they can meet other particles.',
    'So nanoparticles can be **much more reactive** and make **better catalysts** than the same mass of a lump.',
    'Nanoparticles can have **different properties** from the **bulk** material: gold nanoparticles look **red**, not gold; zinc oxide nanoparticles are **transparent** to visible light.',
    'Properties depend on **size** as well as on the **substance**.',
  ],
  size: 12,
  worked: { head: 'Worked example: percentage of surface atoms', q: 'A 2D slice is 10 × 10 atoms. The inner square is 8 × 8.',
    steps: [['Surface', '100 − 64 = 36 atoms'], ['Percentage', '36 ÷ 100 × 100'], ['Answer', '**36%** of the atoms are at the surface']], size: 10.5 },
  workedH: 1.55,
  qc: 'For a **6 × 6** slice of atoms, how many atoms are at the surface, and what **percentage** is this (2 s.f.)?',
  notes: 'QUICK CHECK ANSWER: Inner square 4 × 4 = 16, so surface = 36 − 16 = 20 atoms; 20 ÷ 36 × 100 = 56% (2 s.f.).\nC4.3.2 "...and describe how this affects properties". 3D figures (GRADE 7–9 stretch, asserted in node): fraction on surface = 1 − ((n − 2)/n)³: n = 10 → 48.8%; n = 100 → 5.9%. Colour of gold nanoparticles (red / purple in stained glass) and transparency of nano ZnO / TiO₂ are standard examples of size-dependent properties; no explanation of the optics is needed at GCSE.',
}), 'C4.3.2 Surface atoms and properties');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C4.3.2')} • surface area to volume`, [
  { q: 'A cube has sides of **3 cm**. Calculate its surface area and its volume.', marks: 2, ms: 'SA = 6 × 3² = 54 cm² (1); V = 3³ = 27 cm³ (1). Units needed.' },
  { q: 'Use your answers to calculate the **SA : V ratio** of the cube.', marks: 2, ms: '54 ÷ 27 / 54 : 27 (1); = 2 : 1 (1). Allow error carried forward.' },
  { q: 'Describe what happens to the SA : V ratio as particles get **smaller**.', marks: 2, ms: 'SA : V increases (1); e.g. halving the side doubles the ratio / a larger fraction of atoms is at the surface (1).' },
  { q: 'Explain why nanoparticles of a metal can be **more reactive** than a lump of the same mass.', marks: 2, ms: 'Much larger surface area / SA : V (1); more atoms exposed at the surface so more collisions / contact with reactants (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 PRACTICAL METHOD =======================
reg(D.contentSlide({
  title: 'Practical: catalyst powder or granules?',
  subtitle: `Specification ${sp('C4.3.2')} • modelling why small particles make better catalysts`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'apparatus: conical flask, bung and delivery tube, 100 cm³ gas syringe, stop-clock',
  draw: (s) => {
    flask(s, 0.95, 2.3, 1.5, 2.1, 0.32);
    box(s, 1.47, 2.1, 0.46, 0.25, '3A3A3A', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    // powder at bottom
    for (let i = 0; i < 14; i++) ball(s, 1.12 + i * 0.085, 4.32, 0.03, '3A3A3A', '3A3A3A');
    label(s, 0.6, 4.5, 2.4, 'MnO₂ catalyst + H₂O₂(aq)', { size: 10, h: 0.25 });
    // bubbles
    [[1.5, 3.95], [1.75, 4.05], [1.9, 3.85], [1.35, 4.1]].forEach(([x, y]) => oval(s, x, y, 0.08, 0.08, 'FFFFFF', '5B9BD5', { lw: 0.75 }));
    line(s, 1.7, 2.1, 1.7, 1.75, C.ink, 2); line(s, 1.7, 1.75, 3.1, 1.75, C.ink, 2); line(s, 3.1, 1.75, 3.1, 2.12, C.ink, 2);
    gasSyringe(s, 3.1, 2.0, 2.35, 42);
    label(s, 3.0, 2.4, 2.6, 'gas syringe: volume of O₂ / cm³', { size: 10, h: 0.25 });
    // stopclock
    ball(s, 4.4, 3.45, 0.38, C.white, C.ink, 1.5); line(s, 4.4, 3.45, 4.4, 3.17, C.ink, 1.5); line(s, 4.4, 3.45, 4.6, 3.55, C.ink, 1.5); box(s, 4.32, 2.97, 0.16, 0.1, C.ink, null);
    label(s, 3.8, 3.9, 1.2, 'stop-clock', { size: 10, h: 0.22 });
    // two forms
    box(s, 3.2, 4.25, 1.2, 0.75, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    for (let i = 0; i < 24; i++) ball(s, 3.35 + (i % 8) * 0.13, 4.5 + Math.floor(i / 8) * 0.13, 0.035, '3A3A3A', '3A3A3A');
    box(s, 4.6, 4.25, 1.2, 0.75, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    [[4.85, 4.62], [5.2, 4.55], [5.5, 4.7]].forEach(([x, y]) => ball(s, x, y, 0.14, '3A3A3A', '1A1A1A'));
    label(s, 3.2, 5.02, 1.2, '0.5 g powder', { size: 10, bold: true, h: 0.24 });
    label(s, 4.6, 5.02, 1.2, '0.5 g granules', { size: 10, bold: true, h: 0.24 });
    label(s, 0.7, 5.35, 5.6, '**2H₂O₂(aq) → 2H₂O(l) + O₂(g)**', { size: 11.5, color: C.ink, h: 0.32 });
  },
  head: 'Method',
  lines: [
    'Put **5 cm³** of 10-volume hydrogen peroxide in the flask. Connect the gas syringe and check it reads zero.',
    'Add **0.5 g of MnO₂ powder**, replace the bung and start the clock. Read the volume of O₂ every **10 s** for 60 s.',
    'Repeat with **0.5 g of MnO₂ granules**. Do each twice and take a mean.',
    '**IV**: particle size of catalyst. **DV**: volume of O₂. **Control**: mass of catalyst, volume and concentration of H₂O₂, temperature.',
    '**Safety**: eye protection. 10-volume H₂O₂ is low hazard but irritates eyes. MnO₂ is **HARMFUL** if swallowed or inhaled: avoid raising dust.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: maximum volume of oxygen', q: '"10-volume" means 1 cm³ of the solution gives 10 cm³ of O₂.',
    steps: [['Volume', '5 cm³ of solution used'], ['Answer', '5 × 10 = **50 cm³** of O₂ at most, whichever catalyst']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why must the **mass** of MnO₂ be the same in both runs? Why does the catalyst not change the **total** volume of O₂?',
  notes: 'QUICK CHECK ANSWER: So that only the particle size (surface area) changes; more catalyst would also speed up the reaction (fair test). A catalyst is not used up and does not change the amount of product; it only speeds up the reaction, so the total O₂ depends on the hydrogen peroxide.\nSUGGESTED PRACTICAL (no PAG is linked to C4.3 in any source found; this models C4.3.2/C4.3.3: catalyst surface area). Rates of reaction are taught in Chapter C6; here we only use it to show the effect of particle size. Equation atom balance checked in node: H 4 = 4, O 4 = 2 + 2.\nHazards (CLEAPSS style): hydrogen peroxide solution, 10-volume (about 3%): LOW HAZARD at this concentration, but may irritate the eyes; wear eye protection. Manganese(IV) oxide: HARMFUL if swallowed or inhaled; avoid raising dust; weigh the powder carefully. Oxygen produced: keep away from flames. Teacher: check your own CLEAPSS Hazcards and risk assessment.',
}), 'Practical: method');

// ======================= 12 PRACTICAL RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('C4.3.2')} • volume of oxygen against time, plotted to scale`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'illustrative class results (means of two runs), plotted to scale');
  const g = { x: 1.45, y: 1.55, w: 5.3, h: 3.55, xmin: 0, xmax: 60, ymin: 0, ymax: 60, xstep: 10, ystep: 10, minor: 2, xlabel: 'Time / s', ylabel: 'Volume of O₂ / cm³' };
  D.axes(s, g);
  const pP = TIME.map((t, i) => [t, POW[i]]), pG = TIME.map((t, i) => [t, GRAN[i]]);
  D.plotLine(s, g, pP, C.blue, 2.25); D.points(s, g, pP, C.ink);
  D.plotLine(s, g, pG, C.orange, 2.25); D.points(s, g, pG, C.ink);
  line(s, D.px(g, 0), D.py(g, 0), D.px(g, 30), D.py(g, 42), C.red, 1.25, { dash: 'dash' });
  label(s, D.px(g, 36), D.py(g, 52) - 0.32, 1.4, '**powder**', { size: 10.5, color: C.blue, h: 0.24 });
  label(s, D.px(g, 42), D.py(g, 18) + 0.05, 1.4, '**granules**', { size: 10.5, color: C.orange, h: 0.24 });
  label(s, D.px(g, 5), D.py(g, 55), 2.2, 'max 50 cm³ (10-volume, 5 cm³)', { size: 10, italic: true, color: C.grey, h: 0.22, align: 'left' });
  line(s, D.px(g, 0), D.py(g, 50), D.px(g, 60), D.py(g, 50), C.grey, 0.75, { dash: 'dash' });
  const rows = [[HDR('Time / s'), ...TIME.map(t => HDR(String(t)))],
    [tcell('Powder / cm³', 0, { bold: true }), ...POW.map(v => tcell(String(v), 0))],
    [tcell('Granules / cm³', 1, { bold: true }), ...GRAN.map(v => tcell(String(v), 1))]];
  s.addTable(rows, { x: 7.3, y: 1.3, w: 5.58, colW: [1.38, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6, 0.6], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 7.3, 2.35, 5.58, 2.05, 'Worked example: mean rate in the first 30 s', 'Mean rate = volume of gas ÷ time', [
    ['Powder', `${POW[3]} cm³ ÷ 30 s = ${fmt(rP)} cm³/s`],
    ['Granules', `${GRAN[3]} cm³ ÷ 30 s = ${fmt(rG)} cm³/s`],
    ['Answer', `the powder is **${fmt(rP / rG)} times** faster`]], { size: 10.5 });
  D.card(s, 7.3, 4.55, 5.58, 1.7, 'Conclusion and errors', [
    'Smaller particles → **larger surface area** → more reacting particles meet the catalyst → **faster** reaction.',
    'Errors: gas lost before the bung is in; syringe sticks; timing. Improve: use a side-arm tube to tip in the catalyst; repeat.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Use the table to calculate the **mean rate** for the granules over the **whole 60 s**. Why does the powder curve **level off**?');
  D.notes(s, `QUICK CHECK ANSWER: 27 cm³ ÷ 60 s = 0.45 cm³/s. The hydrogen peroxide is used up (all 50 cm³ O₂ released); the catalyst is not used up.\nAll data illustrative, asserted in node: powder 0, 18, 32, 42, 47, 49, 50; granules 0, 5, 10, 15, 19, 23, 27 cm³. Mean rates 1.4 and 0.5 cm³/s (ratio 2.8). Link: nanoparticle catalysts take this further, with a far larger surface per gram. Rate is taught fully in Chapter C6.`);
  reg(s, 'Practical: results');
}

// ======================= 13 USES =======================
reg(D.contentSlide({
  title: 'Properties and uses of nanoparticles',
  subtitle: `Specification ${sp('C4.3.3')} • size and surface area explain the uses`,
  tag: 'C4.3.3', caption: 'sunscreen on skin; particle sizes exaggerated',
  draw: (s) => {
    const half = (x, title, nano) => {
      label(s, x, 1.5, 2.75, `**${title}**`, { size: 11, h: 0.3 });
      box(s, x, 3.75, 2.75, 1.0, 'F2D6B8', 'A8865E', { lw: 1 });
      label(s, x, 4.45, 2.75, 'skin', { size: 10, color: '8A6D3B', h: 0.25 });
      box(s, x, 3.35, 2.75, 0.4, nano ? 'F7FBFF' : 'F2F2F2', '9AA3B0', { lw: 0.75 });
      if (nano) for (let i = 0; i < 40; i++) ball(s, x + 0.08 + (i % 20) * 0.137, 3.45 + Math.floor(i / 20) * 0.18, 0.03, TIO[0], TIO[1]);
      else for (let i = 0; i < 7; i++) ball(s, x + 0.22 + i * 0.38, 3.55, 0.15, TIO[0], TIO[1]);
      // UV arrows (violet) stopped; visible (yellow)
      arrow(s, x + 0.5, 1.95, x + 0.5, 3.3, VIO, 2.25); label(s, x + 0.05, 2.3, 0.4, 'UV', { size: 10.5, bold: true, color: VIO, h: 0.22, align: 'right' });
      if (nano) { arrow(s, x + 1.7, 1.95, x + 1.7, 3.7, 'E0B030', 2.25); label(s, x + 0.65, 1.75, 1.0, 'visible light passes', { size: 10, color: 'B8860B', h: 0.45, align: 'right' }); label(s, x + 1.8, 2.75, 0.95, 'looks **clear**', { size: 10, h: 0.25, align: 'left' }); }
      else { arrow(s, x + 1.7, 1.95, x + 1.7, 3.3, 'E0B030', 2.25); arrow(s, x + 1.75, 3.3, x + 2.3, 2.35, 'E0B030', 2.25); label(s, x + 0.65, 1.75, 1.0, 'visible light scattered', { size: 10, color: 'B8860B', h: 0.45, align: 'right' }); label(s, x + 1.95, 2.9, 0.8, 'looks **white**', { size: 10, h: 0.25, align: 'left' }); }
    };
    half(0.65, 'Ordinary ZnO particles', false);
    half(3.6, 'Nano ZnO / TiO₂ particles', true);
    label(s, 0.65, 4.95, 5.7, 'Both block **UV**; the nanoparticles are too small to scatter visible light, so the cream is **transparent**.', { size: 10.5, h: 0.5, align: 'left' });
  },
  head: 'Property → use',
  lines: [
    '**Catalysts**: huge surface area → more reactions per gram. Cerium oxide nanoparticles in diesel fuel; platinum in catalytic converters.',
    '**Sunscreens and cosmetics**: nano TiO₂ / ZnO absorb **UV** but are **transparent**.',
    '**Silver** nanoparticles: **antibacterial** → wound dressings, socks, sports clothing, fridge linings.',
    '**Self-cleaning glass**: a thin TiO₂ nano-coating breaks down dirt in sunlight.',
    '**Medicine and electronics**: tiny enough to carry drugs to cells, or to build very small circuits.',
  ],
  size: 12,
  worked: { head: 'Worked example: catalyst particle size', q: 'Compare the SA : V of a cube-shaped particle 10 nm across with one 1 µm (1000 nm) across.',
    steps: [['SA : V', '6 ÷ 10 = 0.6 nm⁻¹ and 6 ÷ 1000 = 0.006 nm⁻¹'], ['Answer', '0.6 ÷ 0.006 = **100 times** more surface per volume']], size: 10.5 },
  workedH: 1.35,
  qc: 'Why does silver work better as an antibacterial when it is in **nanoparticle** form? How many times bigger is SA : V for **5 nm** than for **50 nm** cubes?',
  notes: 'QUICK CHECK ANSWER: Nanoparticles have a much bigger surface area, so more silver is in contact with / releases more silver ions to the bacteria for the same mass of silver. 6/5 ÷ 6/50 = 10 times.\nC4.3.3 (RSC spec link): "describe how the properties of nanoparticulate materials are related to their uses" including size, surface area and the arrangement of atoms in tubes or rings (next slide). Examples are those in OCR / RSC teaching materials (cerium oxide fuel additive, silver dressings and socks, TiO₂ / ZnO sunscreens, self-cleaning glass). Ideas about light absorption and scattering are not required in detail.',
}), 'C4.3.3 Properties and uses');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C4.3.2')}, ${sp('C4.3.3')} • catalysts, practical and uses`, [
  { q: 'Give **two** variables that must be controlled when comparing MnO₂ **powder** and **granules** as catalysts.', marks: 2, ms: 'Any two (1 each): mass of catalyst; volume of hydrogen peroxide; concentration of hydrogen peroxide; temperature; same apparatus.' },
  { q: 'A catalyst produced **36 cm³** of oxygen in **40 s**. Calculate the mean rate in cm³/s.', marks: 2, ms: '36 ÷ 40 (1); = 0.9 cm³/s (1).' },
  { q: 'Explain why nano-sized **titanium dioxide** is used in sunscreens instead of ordinary-sized particles.', marks: 2, ms: 'Still absorbs / blocks UV (1); transparent / does not leave a white layer because particles are too small to scatter visible light (1).' },
  { q: 'Suggest why only a **small mass** of platinum nanoparticles is needed in a catalytic converter.', marks: 2, ms: 'Very large surface area per gram / high SA : V (1); so most atoms are at the surface and can catalyse; platinum is expensive / rare (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 TUBES AND RINGS =======================
{
  const s = D.contentHeader('Atoms in tubes and rings', `Specification ${sp('C4.3.3')} • carbon nanotubes and fullerenes`, { tag: 'C4.3.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'graphene sheet rolled into a nanotube; fullerene cage (C₆₀) shown flattened');
  label(s, 0.55, 1.42, 2.6, '**Graphene**: one layer of graphite', { size: 11, h: 0.28 });
  hexSheet(s, 0.75, 1.8, 2.2, 1.45, 0.18, { ar: 0.04 });
  arrow(s, 3.05, 2.5, 3.5, 2.5, C.ink, 2); label(s, 2.95, 2.1, 0.7, 'roll up', { size: 10, italic: true, h: 0.22 });
  // nanotube: cylinder with a hexagon pattern
  label(s, 3.6, 1.42, 2.8, '**Carbon nanotube**', { size: 11, h: 0.28 });
  hexSheet(s, 3.75, 2.05, 2.45, 0.92, 0.17, { ar: 0.035, lw: 0.75 });
  line(s, 3.75, 2.05, 6.2, 2.05, C.ink, 1.5); line(s, 3.75, 2.97, 6.2, 2.97, C.ink, 1.5);
  oval(s, 3.75, 2.51, 0.28, 0.92, 'EDE6F8', C.ink, { lw: 1.5, tr: 30 }); oval(s, 6.2, 2.51, 0.28, 0.92, null, C.ink, { lw: 1.5, dash: 'dash' });
  label(s, 3.6, 3.05, 2.8, 'about **1 nm** wide, up to µm–mm long', { size: 10, h: 0.25 });
  // fullerene: pentagon centre with hexagons around (flattened view)
  label(s, 0.65, 3.4, 2.6, '**Fullerene C₆₀**', { size: 11, h: 0.28 });
  const cx = 1.95, cy = 4.62, pr = 0.24, hs = 2 * pr * Math.sin(36 * Math.PI / 180);
  oval(s, cx, cy, 1.78, 1.78, 'F8F5FC', C.blue, { lw: 1.25, dash: 'dash' });
  const pent = [0, 1, 2, 3, 4].map(k => { const a = (72 * k - 90) * Math.PI / 180; return [cx + pr * Math.cos(a), cy + pr * Math.sin(a)]; });
  poly(s, pent, 'F5D9A8', C.ink, { lw: 1 });
  const vtx = [...pent];
  for (let k = 0; k < 5; k++) {
    const a = (72 * k - 54) * Math.PI / 180, dc = pr * Math.cos(36 * Math.PI / 180) + hs * Math.sqrt(3) / 2;
    const hx = cx + dc * Math.cos(a), hy = cy + dc * Math.sin(a);
    const hp = [0, 1, 2, 3, 4, 5].map(j => { const b = a + (60 * j + 30) * Math.PI / 180; return [hx + hs * Math.cos(b), hy + hs * Math.sin(b)]; });
    poly(s, hp, null, C.ink, { lw: 1 }); vtx.push(...hp);
  }
  // shared edge check: each hexagon's inner edge ends on two pentagon vertices
  assert(vtx.slice(5).filter(([x, y]) => pent.some(([u, v]) => Math.hypot(x - u, y - v) < 1e-6)).length === 10, 'hexagons share edges with the pentagon');
  vtx.forEach(([x, y]) => ball(s, x, y, 0.035, CARB[0], CARB[1], 0.5));
  label(s, 0.55, 5.53, 2.8, '12 pentagons + 20 hexagons: a hollow ball of **60 C atoms**, ~1 nm', { size: 10, h: 0.42 });
  // uses icons
  box(s, 3.6, 3.55, 2.75, 2.25, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, 3.7, 3.6, 2.6, '**Structure → use**', { size: 10.5, h: 0.26 });
  label(s, 3.7, 3.88, 2.6, '• strong covalent bonds → very **strong**, **light**: reinforce bike frames, rackets\n• delocalised electrons → **conduct**: tiny circuits\n• hollow cage / tube → **carry drugs**; balls → **lubricants**', { size: 10, h: 1.85, align: 'left', valign: 'top' });
  D.card(s, 6.8, 1.3, 6.08, 2.75, 'Tubes and rings of carbon atoms', [
    '**Graphene** is one layer of graphite. A **nanotube** is graphene rolled into a cylinder: each C atom is **covalently bonded** to three others in hexagons.',
    'A **fullerene** is a hollow cage of carbon atoms in **rings** of 5 and 6. The first found was **C₆₀** (buckminsterfullerene).',
    'Nanotubes are only about **1 nm** wide but can be **thousands** of times longer.',
    'Their **arrangement of atoms** gives them their properties, and so their uses.',
  ], { size: 12.5 });
  D.workedSteps(s, 6.8, 4.2, 6.08, 2.05, 'Worked example: how long compared with how wide?', 'A nanotube is 1 nm wide and 1 µm long (1 µm = 1000 nm).', [
    ['Same units', '1 µm = 1000 nm'], ['Ratio', 'length ÷ width = 1000 ÷ 1'], ['Answer', 'the tube is **1000 times** longer than it is wide']], { size: 10.5 });
  D.quickCheck(s, 'Explain why carbon nanotubes are **strong**. A nanotube **1.5 nm** wide is **3000** times longer than its width: how long is it in **µm**?');
  D.notes(s, 'QUICK CHECK ANSWER: Every carbon atom is joined to three others by strong covalent bonds in a continuous network, so a lot of energy / force is needed to break the tube. 1.5 × 3000 = 4500 nm = 4.5 µm.\nC4.3.3 includes "the arrangement of atoms in tubes or rings" (RSC spec-link extract). Graphite (and diamond) bonding is taught in C4.2 and is recapped only; SPEC_C4_2.md leaves graphene, fullerenes and nanotubes to this deck, so they are taught here. Fullerene sketch: a central pentagon surrounded by five hexagons, as in the real C₆₀ (12 pentagons and 20 hexagons: (12 × 5 + 20 × 6) ÷ 3 = 60 atoms, because every atom is shared by three rings; asserted in node). C₆₀ diameter about 0.7 nm (nucleus to nucleus), about 1 nm including the electron clouds.');
  reg(s, 'C4.3.3 Nanotubes and fullerenes');
}

// ======================= 16 NANOPARTICLES IN MATERIALS =======================
reg(D.contentSlide({
  title: 'Nanoparticles in materials',
  subtitle: `Specification ${sp('C4.3.4')} • adding nanoparticles to a material changes its properties`,
  tag: 'C4.3.4', caption: 'nanoparticles embedded in a matrix; sizes exaggerated',
  draw: (s) => {
    // fibre cross-section with silver nanoparticles
    label(s, 0.65, 1.45, 2.8, '**Silver in sock fibres**', { size: 11, h: 0.28 });
    sock(s, 0.85, 1.85, 1.1);
    oval(s, 2.95, 2.85, 1.0, 1.0, 'EDEFF3', '6B7385', { lw: 1.5 });
    dots(s, [[2.7, 2.6], [3.1, 2.55], [2.85, 3.0], [3.2, 3.05], [2.6, 3.0], [3.0, 2.8], [3.25, 2.75]], 0.04);
    line(s, 1.75, 2.6, 2.45, 2.75, C.grey, 1, { dash: 'dash' });
    label(s, 2.45, 3.4, 1.0, 'fibre (cut)', { size: 10, h: 0.22 });
    label(s, 0.65, 3.65, 2.95, 'silver kills the bacteria that cause **odour**', { size: 10, h: 0.25 });
    // nanocomposite plastic with nanotubes
    label(s, 3.75, 1.45, 2.6, '**Nanotubes in a plastic**', { size: 11, h: 0.28 });
    box(s, 3.85, 1.85, 2.4, 1.55, 'DDE7F2', '5B9BD5', { lw: 1.25 });
    [[3.95, 2.0, 0.5, 0.15], [4.6, 2.3, 0.6, -0.1], [4.1, 2.75, 0.55, 0.2], [5.0, 2.85, 0.65, -0.15], [5.3, 2.1, 0.6, 0.18], [4.3, 3.2, 0.7, -0.08]].forEach(([x, y, l, dy]) => line(s, x, y, x + l, y + dy, CARB[1], 2.5));
    label(s, 3.75, 3.45, 2.6, 'plastic matrix + nanotubes:\n**stronger** and **lighter**', { size: 10, h: 0.45 });
    // layer of nanoclay in a bottle wall
    label(s, 0.65, 4.0, 5.7, '**Nanoclay layers in a plastic bottle wall**: gas molecules must take a long path', { size: 10.5, h: 0.28, align: 'left' });
    box(s, 0.85, 4.35, 5.3, 1.05, 'F4F0FA', '9A86C2', { lw: 1 });
    [[1.0, 4.5], [2.4, 4.5], [3.8, 4.5], [1.6, 4.8], [3.0, 4.8], [4.4, 4.8], [1.0, 5.1], [2.4, 5.1], [3.8, 5.1]].forEach(([x, y]) => box(s, x, y, 1.1, 0.07, '8A6D3B', null));
    [[0.95, 4.42, 2.25, 4.42], [2.25, 4.42, 2.25, 4.72], [2.25, 4.72, 1.5, 4.72], [1.5, 4.72, 1.5, 5.02], [1.5, 5.02, 2.32, 5.02], [2.32, 5.02, 2.32, 5.32]].forEach(([a, b, c, d]) => line(s, a, b, c, d, HI, 1.25, { dash: 'dash' }));
    label(s, 4.6, 5.45, 1.6, 'CO₂ / O₂ path', { size: 10, color: HI, h: 0.22 });
  },
  head: 'Nanocomposites',
  lines: [
    'Nanoparticles can be **mixed into** or **embedded in** another material (the **matrix**) to make a **nanocomposite**.',
    '**Silver** in fabrics and dressings: antibacterial, so less odour and infection.',
    '**Carbon nanotubes** in plastics or resins: **strong**, **stiff** and **light** sports goods and car parts.',
    '**Nanoclay** in plastic bottles: gases pass through more slowly, so fizzy drinks stay fizzy.',
    'Only a **tiny mass** of nanoparticles is needed because of their huge surface area.',
  ],
  size: 12,
  worked: { head: 'Worked example: silver in a sock', q: 'A 20 g sock contains 40 µg of silver per gram of fabric.',
    steps: [['Mass', '20 g × 40 µg/g = 800 µg'], ['Units', '1 mg = 1000 µg'], ['Answer', '800 ÷ 1000 = **0.8 mg** of silver']], size: 10.5 },
  workedH: 1.55,
  qc: 'Give **one** property that nanotubes add to a plastic, and a use. How much silver (in **mg**) is in a **25 g** sock with **40 µg/g**?',
  notes: 'QUICK CHECK ANSWER: Strength / stiffness / low density / electrical conductivity; e.g. tennis rackets, bike frames, car panels, anti-static packaging. 25 × 40 = 1000 µg = 1 mg.\nC4.3.4 wording is UNVERIFIED: search extracts (Cherry Hill Tuition J260 page) mention composites with nanoparticles "incorporated in a material or embedded in a matrix". If your copy of the specification puts composites in C4.1 instead, use this slide as an application of C4.3.3. Composites on a bulk scale (e.g. reinforced concrete, glass fibre) belong to C4.1 and are not taught here. Silver values illustrative.',
}), 'C4.3.4 Nanoparticles in materials');

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('C4.3.3')}, ${sp('C4.3.4')} • tubes, rings and nanocomposites`, [
  { q: 'Describe the structure of a **carbon nanotube**.', marks: 2, ms: 'Carbon atoms in hexagons / rolled-up graphene sheet (1); each C covalently bonded to three others, forming a cylinder / tube (1).' },
  { q: 'A nanotube is **2 nm** wide and **500** times as long as it is wide. Calculate its length in nm.', marks: 2, ms: '2 × 500 (1); = 1000 nm (= 1 µm) (1).' },
  { q: 'Give **two** uses of fullerenes or nanotubes and the property that makes each one suitable.', marks: 2, ms: 'Any two use + property (1 each): drug delivery – hollow cage; lubricant – small spheres roll; reinforcing sports equipment – strong and light; electronics – conducts electricity.' },
  { q: 'Explain why silver **nanoparticles** are added to wound dressings.', marks: 2, ms: 'Silver is antibacterial / kills bacteria (1); nano size gives a large surface area so a small mass is very effective / reduces infection (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 18 RISKS =======================
reg(D.contentSlide({
  title: 'Possible risks of nanoparticles',
  subtitle: `Specification ${sp('C4.3.5')} • the same small size that makes them useful can make them harmful`,
  tag: 'C4.3.5', caption: 'routes by which nanoparticles might reach people and the environment',
  draw: (s) => {
    person(s, 1.6, 1.55, 1.05);
    const np = (pts) => dots(s, pts, 0.035, GOLD[0], GOLD[1]);
    np([[2.65, 1.75], [2.8, 1.9], [2.6, 2.0]]); arrow(s, 2.5, 1.9, 1.95, 1.9, HI, 1.75);
    label(s, 2.95, 1.6, 1.9, '**breathed in** → deep in lungs; may pass into blood', { size: 10, h: 0.5, align: 'left' });
    np([[2.75, 3.1], [2.9, 3.25]]); arrow(s, 2.6, 3.2, 2.2, 3.2, HI, 1.75);
    label(s, 3.05, 3.0, 1.9, '**through skin**? (creams, sprays)', { size: 10, h: 0.45, align: 'left' });
    // environment: washing machine -> water -> sewage works bacteria
    box(s, 0.75, 4.35, 0.9, 0.9, 'EDEFF3', '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 }); ball(s, 1.2, 4.82, 0.3, 'BFD9F2', '5B9BD5', 1.25);
    label(s, 0.6, 5.28, 1.2, 'washing', { size: 10, h: 0.22 });
    arrow(s, 1.75, 4.8, 2.55, 4.8, '5B9BD5', 2.25);
    np([[2.0, 4.65], [2.25, 4.68]]);
    box(s, 2.65, 4.4, 1.6, 0.8, 'DCEBF7', '5B9BD5', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 1.25 });
    label(s, 2.65, 4.4, 1.6, 'sewage works:\nuseful bacteria', { size: 10, h: 0.8 });
    arrow(s, 4.35, 4.8, 5.05, 4.8, '5B9BD5', 2.25);
    fishShape(s, 5.6, 4.8);
    label(s, 4.95, 5.28, 1.4, 'rivers, soil', { size: 10, h: 0.22 });
    label(s, 0.65, 5.55, 5.7, 'Silver washed out of socks can kill **useful** bacteria too.', { size: 10.5, h: 0.3, align: 'left' });
  },
  head: 'Why might nanoparticles be risky?',
  lines: [
    'They are so small they may get **into the body** (lungs, blood, cells) where larger particles cannot.',
    'Their **large surface area** makes them **reactive**: they could damage cells or carry other substances.',
    'Long, thin **nanotubes** may behave like asbestos fibres in the lungs.',
    'Nanoparticles washed into **water** and **soil** may harm living things.',
    'Many products are **new**, so **long-term effects are not yet known**: we are **uncertain** about the risk.',
  ],
  size: 12,
  worked: { head: 'Reducing the risk', q: 'Scientists and regulators can…',
    steps: [['Test', 'study effects on cells, animals and water life before use'], ['Label', 'list "nano" ingredients so people can choose'], ['Control', 'limit release, e.g. bind silver firmly into fibres']], size: 10.5 },
  workedH: 1.55,
  qc: 'Give **two** reasons why the risks of nanoparticles are **uncertain**. Suggest **one** way to reduce the risk from silver in socks.',
  notes: 'QUICK CHECK ANSWER: Nanoparticles are new / not used for long, so long-term effects are unknown; hard to detect and measure tiny particles in the body or environment; effects depend on the size, shape and substance; few studies so far. Reduce risk: bind silver into the fibre so it is not washed out; wash less; treat waste water; use only where needed.\nC4.3.5 (RSC "Toxic socks" spec link): "explain the possible risks associated with some nanoparticulate materials". Ideas about Science: risk = likelihood × consequence; perceived vs actual risk; the precautionary principle; regulation decisions. Disposal and the full life cycle of products are in C4.4 (LCA): link only.',
}), 'C4.3.5 Possible risks');

// ======================= 19 BENEFITS AND RISKS: DATA =======================
{
  const s = D.contentHeader('Benefits and risks: using data', `Specification ${sp('C4.3.5')} • how much silver washes out of a sock?`, { tag: 'C4.3.5' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'illustrative values; bar chart plotted to scale');
  const g = { x: 1.45, y: 1.6, w: 4.75, h: 3.4, xmin: -0.5, xmax: 4.5, ymin: 0, ymax: 50, xstep: 1, ystep: 10, minor: 2, xlabel: 'Number of washes', ylabel: 'Silver / µg per g of sock', fmt: v => String(Math.round(v + 0.5) - 0.5 === v ? '' : v) };
  g.fmt = () => ''; g.yfmt = v => String(v);
  D.axes(s, g);
  WASH.forEach((w, i) => {
    const bw = 0.5;
    box(s, D.px(g, w) - bw / 2, D.py(g, AG[i]), bw, D.py(g, 0) - D.py(g, AG[i]), i === 0 ? '9AA3B0' : 'C9CED6', C.ink, { lw: 0.75 });
    label(s, D.px(g, w) - 0.3, D.py(g, AG[i]) - 0.27, 0.6, String(AG[i]), { size: 10, bold: true, h: 0.24 });
    label(s, D.px(g, w) - 0.3, g.y + g.h + 0.06, 0.6, String(w), { size: 10, h: 0.2 });
  });
  label(s, 0.75, 5.5, 5.6, 'After 4 washes, **75%** of the silver has gone: into waste water.', { size: 10.5, h: 0.3, align: 'left' });
  const rows = [[HDR('Benefits'), HDR('Risks and costs')],
    [tcell('Kills odour bacteria; socks washed less often (saves water and energy)', 0), tcell('Silver washed into waste water may harm useful bacteria and water life', 0)],
    [tcell('Silver dressings reduce infection in burns and wounds', 1), tcell('Effects on people and wildlife over many years unknown', 1)],
    [tcell('Very little silver needed (high surface area)', 0), tcell('Silver is a finite resource; antibacterial effect fades with washing', 0)]];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [3.04, 3.04], rowH: 0.48, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 3.45, 6.08, 1.55, 'Worked example: percentage of silver lost', 'Use the chart: 40 µg/g before washing, 10 µg/g after 4 washes.', [
    ['Lost', '40 − 10 = 30 µg/g'], ['Answer', '30 ÷ 40 × 100 = **75%** lost']], { size: 10.5 });
  D.card(s, 6.8, 5.12, 6.08, 1.13, 'Making a decision', [
    'Weigh **benefits** against **risks**. A large benefit (fewer wound infections) may justify a small risk; odour-free socks may not.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Calculate the percentage of silver lost between wash **2** and wash **3**. Is silver more justified in **socks** or in **wound dressings**? Explain.');
  D.notes(s, 'QUICK CHECK ANSWER: (20 − 14) ÷ 20 × 100 = 30%. Wound dressings: the benefit (preventing serious infection, saving lives) is much greater, used for a short time and disposed of as clinical waste; socks are a minor benefit and release silver into water every wash. Accept a reasoned case either way.\nValues illustrative (asserted in node): 40, 28, 20, 14, 10 µg/g, each wash removes 30% of what is left. The pattern follows published sock-washing studies (e.g. Benn and Westerhoff 2008) but numbers are UNVERIFIED. Ideas about Science: benefits, risks, who decides (regulators); some people accept risks they choose (voluntary) more than imposed risks.');
  reg(s, 'C4.3.5 Benefits and risks: data');
}

// ======================= 20 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('C4.3.5')} • risks and decisions`, [
  { q: 'Suggest **one** way nanoparticles in a spray could harm a person.', marks: 2, ms: 'Breathed in / inhaled (1); pass deep into the lungs / into the blood / cells and cause damage / inflammation (1).' },
  { q: 'Explain why scientists are **uncertain** about the long-term risks of nanoparticles.', marks: 2, ms: 'Nanoparticles are new / used only recently (1); so long-term studies have not been done / effects take years to appear / hard to measure (1).' },
  { q: 'Silver in a sock fell from **40** to **10 µg/g** after washing. Calculate the percentage lost.', marks: 2, ms: '(40 − 10) ÷ 40 × 100 (1); = 75% (1).' },
  { q: 'Give **one** benefit and **one** risk of adding silver nanoparticles to clothing.', marks: 2, ms: 'Benefit: kills bacteria / less odour / washed less often (1). Risk: silver washed into water harms useful bacteria / aquatic life / unknown health effects (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Nanometre (nm)', 'One billionth of a metre: 1 nm = 1 × 10⁻⁹ m.'],
  ['Nanoparticle', 'A particle 1–100 nm across, about 10 to 1000 atoms wide.'],
  ['Nanotechnology', 'Making and using structures on the scale of nanometres.'],
  ['Bulk material', 'The same substance in normal-sized pieces, e.g. a lump of gold.'],
  ['Standard form', 'A number written as A × 10ⁿ, with A between 1 and 10.'],
  ['Order of magnitude', 'A factor of 10 difference in size.'],
  ['Surface area : volume', 'Surface area ÷ volume. For a cube, 6 ÷ side length.'],
  ['Catalyst', 'Speeds up a reaction without being used up; works at its surface.'],
  ['Fine particles (PM2.5)', 'Particles less than 2.5 µm across in the air; bigger than nanoparticles.'],
  ['Carbon nanotube', 'Graphene (one layer of graphite) rolled into a tube ~1 nm wide.'],
  ['Fullerene', 'A hollow cage of carbon atoms in 5- and 6-membered rings, e.g. C₆₀.'],
  ['Nanocomposite', 'A material with nanoparticles embedded in a matrix.'],
  ['Antibacterial', 'Kills or stops the growth of bacteria, e.g. silver nanoparticles.'],
  ['Risk', 'The chance of harm and how serious the harm would be.'],
  ['Uncertainty', 'Not knowing the effects for sure, e.g. long-term effects of new materials.'],
  ['Benefit', 'An advantage of using something, weighed against its risks.'],
], { notes: 'Use as a cover-and-recall activity. Graphite and covalent bonding are C2 / C4.2 recap terms. Catalyst links back to C1 (catalytic converters) and forward to C6 (rates).' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('Cerium oxide nanoparticles are added to diesel fuel. They act as a **catalyst** so the fuel burns more completely. A typical particle is a cube with sides of **4 nm**.', [
  { l: 'a', q: 'Write **4 nm** in metres, in standard form.', marks: 1, ms: '4 × 10⁻⁹ m (1).' },
  { l: 'b', q: 'An atom is about **0.1 nm** across. How many atoms fit along one edge of the particle?', marks: 1, ms: '4 ÷ 0.1 = 40 (1).' },
  { l: 'c', q: 'Calculate the **surface area**, **volume** and **SA : V ratio** of one 4 nm particle. Give units.', marks: 3, ms: 'SA = 6 × 4² = 96 nm² (1); V = 4³ = 64 nm³ (1); SA : V = 96 ÷ 64 = 1.5 (nm⁻¹) / 1.5 : 1 (1).', h: 1.25 },
  { l: 'd', q: 'A **40 nm** particle has an SA : V ratio of **0.15 nm⁻¹**. How many times bigger is the ratio for the 4 nm particle?', marks: 2, ms: '1.5 ÷ 0.15 (1); = 10 (times) (1). Allow error carried forward from (c).', h: 1.1 },
  { l: 'e', q: 'Explain why the **nanoparticles** are better catalysts than the same mass of larger particles.', marks: 2, ms: 'Larger surface area / SA : V (1); more atoms / active sites at the surface in contact with the reacting fuel and oxygen, so faster reaction (1).', h: 1.0 },
  { l: 'f', q: 'Some cerium oxide nanoparticles leave the exhaust. Explain **two** possible risks, and why these risks are **uncertain**.', marks: 4, ms: 'Breathed in, reach deep into the lungs / blood (1); reactive surface could damage cells / cause inflammation (1); settle in soil / water and harm organisms (1); uncertain because new technology / long-term effects not yet studied / hard to measure such tiny particles (1).', h: 1.45 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Size: silver nanoparticles are 1–100 nm, so they have a very large surface area to volume ratio.',
    'Benefit: large surface → silver is very effective as an antibacterial for a tiny mass; kills bacteria in wounds (fewer infections, faster healing) and in socks (less odour).',
    'Benefit: socks can be washed less often, saving water and energy; dressings may save lives / reduce use of antibiotics.',
    'Risk: nanoparticles can pass into the body (skin, lungs, blood) where larger particles cannot; reactive surface may damage cells.',
    'Risk: silver washed out of socks enters waste water and may kill useful bacteria in sewage works, and harm aquatic life.',
    'Uncertainty: long-term effects not yet known; few studies; hard to measure tiny particles.',
    'Decision: the benefit of dressings is large and short-term; the benefit of socks is small and silver is released at every wash, so silver may be more justified in dressings. Regulation / labelling / testing.',
  ], {
    l3: 'Explains how the size / surface area of silver nanoparticles makes them useful AND explains at least one risk to people AND one to the environment, AND makes a reasoned judgement comparing the two uses.',
    l2: 'Describes benefits AND risks, with some explanation linked to size or surface area; a simple judgement may be given.',
    l1: 'Simple statements of a benefit or a risk, e.g. "silver kills germs" or "it might be harmful".',
  });
}
const HW = [
  { n: '1', q: 'Write **0.000 000 08 m** in standard form. Is this a nanoparticle? Explain.', marks: 2, ms: '8 × 10⁻⁸ m (1); yes: it is 80 nm, which is between 1 and 100 nm (1).' },
  { n: '2', q: 'Calculate the **SA : V ratio** of a cube with sides of **0.5 cm**.', marks: 2, ms: 'SA = 6 × 0.25 = 1.5 cm² and V = 0.125 cm³ (1); 1.5 ÷ 0.125 = 12 (: 1) (1). Allow 6 ÷ 0.5 = 12.' },
  { n: '3', q: 'Explain why nano **zinc oxide** sunscreen looks **clear** on the skin but still protects it.', marks: 2, ms: 'Particles too small to scatter visible light so transparent (1); still absorb / block UV (1).' },
  { n: '4', q: 'A silver dressing had **60 µg** of silver per cm². After a week it had **15 µg**. Calculate the percentage lost.', marks: 2, ms: '(60 − 15) ÷ 60 × 100 (1); = 75% (1).' },
  { n: '5', q: 'Describe how the arrangement of atoms in a **fullerene** differs from that in a **carbon nanotube**.', marks: 3, ms: 'Fullerene: hollow ball / cage (1); rings of 5 and 6 carbon atoms (1). Nanotube: hexagons rolled into a long cylinder / tube (1).', h: 1.15 },
  { n: '6', q: 'Evaluate the use of **silver nanoparticles** in **socks** and in **wound dressings**. Use ideas about size, benefits and risks.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q6 is a 6-mark extended answer. There are no Higher-only questions in this homework.', HW, 17, { dividerSub: 'C4.3 Nanoparticles • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// fish helper used on the risks slide (defined as a function declaration so it is hoisted)
function fishShape(s, cx, cy, w = 0.6, col = '6E8FB5', edge = '3E5C80') {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - w * 0.62, y: cy - w * 0.17, w: w * 0.34, h: w * 0.3, rotate: 90, fill: { color: col }, line: { color: edge, width: 0.75 } });
  oval(s, cx, cy, w, w * 0.42, col, edge, { lw: 0.75 });
  ball(s, cx + w * 0.3, cy - w * 0.04, w * 0.04, C.ink);
}

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
assert(near(rP / rG, 2.8));
const out = path.join(__dirname, 'OCR21C_C4.3_Nanoparticles_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
