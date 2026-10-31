// build_C4_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C4 Material choices, C4.1 How is data used to choose a material for a particular use?
// (one deck, Higher & Foundation; Part 1 of 4 in J260 Chapter C4)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C4_1.js
// Structure copied from ../ocr-biology/build_B6_3.js. ocr_chem_template.js is NOT edited: particle / structure helpers,
// equation balancer and table helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_C4_1.md): C4.1.1 compare quantitatively the physical properties of glass and clay ceramics, polymers,
// composites and metals; C4.1.2 relate properties to uses and select materials; C4.1.3 composition of important alloys
// (incl. steel) in relation to properties and uses. Bonding / structure explanations are C4.2 (recap / preview only);
// nanoparticles are C4.3; life-cycle assessment is C4.4 (mentioned only). Polymer types (J258 C4.2) are not in J260.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C4', chapterTitle: 'Material choices', code: 'C4.1', title: 'How is data used to choose a material for a particular use?',
  part: 1, parts: 4, specRange: 'C4.1.1–C4.1.3',
  subtitle: 'How is data used to choose a material for a particular use?',
  keywords: ['Metals', 'Ceramics', 'Polymers', 'Composites', 'Alloys', 'Density'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));

// ======================= EQUATIONS: atom balance asserted =======================
function atoms(f) {
  // parse a formula such as Fe(OH)3 or Na2SiO3 into {El: n}
  const stack = [{}];
  const toks = f.match(/[A-Z][a-z]?\d*|\(|\)\d*/g);
  assert.strictEqual(toks.join(''), f, 'formula parse ' + f);
  toks.forEach(t => {
    if (t === '(') stack.push({});
    else if (t[0] === ')') { const n = +t.slice(1) || 1; const top = stack.pop(); Object.entries(top).forEach(([e, k]) => { stack[stack.length - 1][e] = (stack[stack.length - 1][e] || 0) + k * n; }); }
    else { const [, e, n] = t.match(/([A-Z][a-z]?)(\d*)/); stack[stack.length - 1][e] = (stack[stack.length - 1][e] || 0) + (+n || 1); }
  });
  return stack[0];
}
function side(terms) { const tot = {}; terms.forEach(([k, f]) => Object.entries(atoms(f)).forEach(([e, n]) => { tot[e] = (tot[e] || 0) + k * n; })); return tot; }
const SUB = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
const fsub = f => f.replace(/\d/g, d => SUB[d]);
const term = ([k, f, st]) => `${k > 1 ? k : ''}${fsub(f)}(${st})`;
const EQ = {};
function equation(key, lhs, rhs) {
  const L = side(lhs), R = side(rhs);
  assert.deepStrictEqual(Object.keys(L).sort(), Object.keys(R).sort(), 'elements ' + key);
  Object.keys(L).forEach(e => assert.strictEqual(L[e], R[e], `atom balance ${key}: ${e}`));
  EQ[key] = `${lhs.map(term).join(' + ')} → ${rhs.map(term).join(' + ')}`;
  return EQ[key];
}
equation('ironCO', [[1, 'Fe2O3', 's'], [3, 'CO', 'g']], [[2, 'Fe', 'l'], [3, 'CO2', 'g']]);
equation('steelC', [[1, 'C', 's'], [1, 'O2', 'g']], [[1, 'CO2', 'g']]);
equation('glass', [[1, 'Na2CO3', 's'], [1, 'SiO2', 's']], [[1, 'Na2SiO3', 'l'], [1, 'CO2', 'g']]);
equation('rust', [[4, 'Fe', 's'], [3, 'O2', 'g'], [6, 'H2O', 'l']], [[4, 'Fe(OH)3', 's']]);
equation('lime', [[1, 'CaCO3', 's']], [[1, 'CaO', 's'], [1, 'CO2', 'g']]);
assert.strictEqual(EQ.ironCO, 'Fe₂O₃(s) + 3CO(g) → 2Fe(l) + 3CO₂(g)');

// ======================= DATA (typical values, rounded; illustrative) =======================
// [name, family, density g/cm³, melting or softening °C, tensile strength MPa, conducts electricity]
const MAT = [
  ['Steel (mild)', 'metal', 7.8, 1450, 400, 'good'],
  ['Aluminium alloy', 'metal', 2.7, 640, 300, 'good'],
  ['Copper', 'metal', 8.9, 1085, 220, 'very good'],
  ['Soda-lime glass', 'ceramic', 2.5, 720, 50, 'no'],
  ['Clay brick', 'ceramic', 1.9, 1600, 5, 'no'],
  ['Poly(ethene) HDPE', 'polymer', 0.95, 130, 30, 'no'],
  ['Glass-fibre (GRP)', 'composite', 1.9, 200, 250, 'no'],
  ['Carbon-fibre (CFRP)', 'composite', 1.6, 200, 1000, 'slight'],
];
const M = Object.fromEntries(MAT.map(r => [r[0], r]));
const dens = n => M[n][2], ts = n => M[n][4];

// ======================= CALCULATIONS (asserted) =======================
// slide 5: identify a material from its density
calc('density 39 g / 5.0 cm³', 39 / 5.0, 7.8, 1e-9);
calc('QC density 13.5 / 5.0', 13.5 / 5.0, 2.7, 1e-9);
// slide 6: concrete compression vs tension
calc('concrete 30 / 3', 30 / 3, 10, 1e-9);
calc('QC glass 1000 / 50', 1000 / 50, 20, 1e-9);
// slide 8: density data
calc('steel / aluminium density ratio', sf(dens('Steel (mild)') / dens('Aluminium alloy'), 2), 2.9, 1e-12);
const brAl = calc('2.0 kg steel bracket → same volume aluminium / kg', 2.0 * dens('Aluminium alloy') / dens('Steel (mild)'), 0.6923076923, 1e-9);
calc('bracket 2 s.f.', sf(brAl, 2), 0.69, 1e-12);
calc('bracket volume cm³ 2000 / 7.8', sf(2000 / 7.8, 3), 256, 1e-12);
calc('QC copper / HDPE ratio', sf(dens('Copper') / dens('Poly(ethene) HDPE'), 2), 9.4, 1e-12);
// slide 9: brick
const brickV = calc('brick volume 21.5 × 10.25 × 6.5', 21.5 * 10.25 * 6.5, 1432.4375, 1e-9);
const brickD = calc('brick density 2700 / 1432', 2700 / brickV, 1.88490, 1e-4);
calc('brick density 2 s.f.', sf(brickD, 2), 1.9, 1e-12);
calc('QC tile 20 / 8.0', 20 / 8.0, 2.5, 1e-9);
// slide 10: strength per unit density (specific strength)
const SS = n => ts(n) / dens(n);
calc('steel 400 / 7.8', sf(SS('Steel (mild)'), 2), 51, 1e-12);
calc('aluminium 300 / 2.7', sf(SS('Aluminium alloy'), 3), 111, 1e-12);
calc('CFRP 1000 / 1.6', SS('Carbon-fibre (CFRP)'), 625, 1e-9);
calc('CFRP / steel', sf(SS('Carbon-fibre (CFRP)') / SS('Steel (mild)'), 2), 12, 1e-12);
calc('QC GRP 250 / 1.9', sf(SS('Glass-fibre (GRP)'), 3), 132, 1e-12);
// slide 12: bike frame from 400 cm³ of material
const FR = 400;
const fSteel = calc('frame steel 400 × 7.8 g', FR * dens('Steel (mild)'), 3120, 1e-9);
const fAl = calc('frame Al 400 × 2.7 g', FR * dens('Aluminium alloy'), 1080, 1e-9);
const fC = calc('frame CFRP 400 × 1.6 g', FR * dens('Carbon-fibre (CFRP)'), 640, 1e-9);
calc('frame saving steel → CFRP kg', (fSteel - fC) / 1000, 2.48, 1e-9);
calc('QC frame saving steel → Al %', sf((fSteel - fAl) / fSteel * 100, 2), 65, 1e-12);
// slide 13: alloys
calc('stainless Cr in 2.0 kg (18%)', 2.0 * 0.18, 0.36, 1e-12);
calc('stainless Fe % = 100 − 18 − 8', 100 - 18 - 8, 74);
calc('mild steel C 0.25% of 500 kg', 500 * 0.0025, 1.25, 1e-12);
calc('18 carat gold 18/24', 18 / 24 * 100, 75, 1e-9);
calc('QC 9 carat 9/24', 9 / 24 * 100, 37.5, 1e-9);
calc('brass Cu 70% of 200 g', 200 * 0.70, 140, 1e-9);
// slides 15–16: density by displacement (illustrative results)
const PV = [2.0, 4.0, 6.0, 8.0];
const PAL = [5.5, 10.7, 16.3, 21.5], PST = [15.7, 31.0, 47.0, 62.5], PNY = [2.3, 4.6, 6.8, 9.3];
const grad = ms => ms.reduce((a, m, i) => a + m * PV[i], 0) / PV.reduce((a, v) => a + v * v, 0); // best line through origin
const gAl = grad(PAL), gSt = grad(PST), gNy = grad(PNY);
calc('Al gradient 2 s.f.', sf(gAl, 2), 2.7, 1e-12);
calc('steel gradient 2 s.f.', sf(gSt, 2), 7.8, 1e-12);
calc('nylon gradient 2 s.f.', sf(gNy, 2), 1.2, 1e-12);
calc('nylon gradient 3 s.f.', sf(gNy, 3), 1.15, 1e-12);
calc('worked: displacement 54.0 − 50.0', 54.0 - 50.0, 4.0, 1e-9);
calc('worked: Al 10.7 / 4.0', 10.7 / 4.0, 2.675, 1e-9);
calc('worked: 2 s.f.', sf(10.7 / 4.0, 2), 2.7, 1e-12);
calc('uncertainty ±0.5 of 4.0 cm³ %', 0.5 / 4.0 * 100, 12.5, 1e-9);
calc('uncertainty ±0.5 of 8.0 cm³ %', 0.5 / 8.0 * 100, 6.25, 1e-9);
calc('QC steel 47.0 / 6.0', sf(47.0 / 6.0, 2), 7.8, 1e-12);
// slide 18: car panel
const PANEL = [['Steel', 12.0, 1.0], ['Aluminium', 6.0, 3.0], ['CFRP', 4.8, 20.0]]; // mass kg, cost £/kg (illustrative)
const pCost = PANEL.map(([, m, c]) => m * c);
calc('steel panel cost', pCost[0], 12, 1e-9);
calc('Al panel cost', pCost[1], 18, 1e-9);
calc('CFRP panel cost', pCost[2], 96, 1e-9);
calc('Al mass saving %', (12.0 - 6.0) / 12.0 * 100, 50, 1e-9);
calc('CFRP mass saving %', (12.0 - 4.8) / 12.0 * 100, 60, 1e-9);
calc('QC extra cost per kg saved Al', (18 - 12) / (12.0 - 6.0), 1, 1e-9);
calc('QC extra cost per kg saved CFRP', (96 - 12) / (12.0 - 4.8), 11.6667, 1e-3);
// starter, recaps, FQ, HW
calc('starter 54 / 20', 54 / 20, 2.7, 1e-9);
calc('R1 density 31.2 / 4.0', 31.2 / 4.0, 7.8, 1e-9);
calc('R2 ratio 8.9 / 2.7', sf(8.9 / 2.7, 2), 3.3, 1e-12);
calc('R3 Cr 18% of 250 g', 250 * 0.18, 45, 1e-9);
calc('R4 density 23.0 / (58.5 − 50.0)', sf(23.0 / (58.5 - 50.0), 2), 2.7, 1e-12);
calc('R5 % saving 20 → 14', (20 - 14) / 20 * 100, 30, 1e-9);
calc('FQ mass 250 cm³ × 2.7', 250 * 2.7, 675, 1e-9);
calc('FQ mass 250 cm³ × 7.8', 250 * 7.8, 1950, 1e-9);
calc('FQ difference g', 1950 - 675, 1275, 1e-9);
calc('FQ % lighter', sf((1950 - 675) / 1950 * 100, 2), 65, 1e-12);
calc('HW density 88.0 / 11.0', 88.0 / 11.0, 8.0, 1e-9);
calc('HW 22 carat %', sf(22 / 24 * 100, 3), 91.7, 1e-12);
calc('HW bronze Sn 12% of 5.0 kg', 5.0 * 0.12, 0.6, 1e-12);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_chem_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle', align: o.align });
}
const MET = ['B8C2D0', '5A6478'], SI = ['8C6BB8', '4E3577'], OX = ['E57373', 'A23B3B'], CAR = ['3A3A3A', '111111'], FAM = { metal: '7A8BA6', ceramic: 'C98B5A', polymer: '5FA463', composite: '6A3FA0' };
// metal lattice: rows of touching positive ions in regular layers (optionally with a few larger atoms = alloy)
function lattice(s, x, y, nx, ny, r, o = {}) {
  const big = o.big || [], small = o.small || [];
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const k = `${i},${j}`;
    const cx = x + r + i * 2 * r, cy = y + r + j * 2 * r;
    if (big.includes(k)) ball(s, cx, cy, r * 1.3, 'E0B040', '8A6A14');
    else ball(s, cx, cy, r, MET[0], MET[1]);
    if (o.plus && !big.includes(k)) label(s, cx - r, cy - r, 2 * r, '+', { size: 10, bold: true, color: MET[1], h: 2 * r });
  }
  small.forEach(([i, j]) => ball(s, x + 2 * r * (i + 1), y + 2 * r * (j + 1), r * 0.42, CAR[0], CAR[1]));
}
// glass: irregular network of Si (violet) and O (red); fixed pseudo-random positions so the drawing is repeatable
function glassNet(s, x, y, w, h) {
  let seed = 7; const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  const pts = [];
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) pts.push([x + 0.2 + (i + 0.15 * (rnd() - 0.5) * 4) * (w - 0.4) / 4.4, y + 0.2 + (j + (rnd() - 0.5) * 0.5) * (h - 0.4) / 3.3]);
  pts.forEach(([a, b], k) => {
    const nb = pts.map((p, q) => [q, Math.hypot(p[0] - a, p[1] - b)]).filter(([q]) => q > k).sort((u, v) => u[1] - v[1]).slice(0, 2);
    nb.forEach(([q]) => { const [c, d] = pts[q]; line(s, a, b, c, d, '9C8AB8', 1); ball(s, (a + c) / 2, (b + d) / 2, 0.045, OX[0], OX[1], 0.5); });
  });
  pts.forEach(([a, b]) => ball(s, a, b, 0.07, SI[0], SI[1]));
}
// clay: stacked plate-shaped crystals with a glassy "glue" between them
function clayPlates(s, x, y, w, h) {
  box(s, x, y, w, h, 'F3D9C4', null);
  const rows = 6;
  for (let j = 0; j < rows; j++) {
    const off = (j % 2) * 0.22;
    for (let k = 0; k < 4; k++) {
      const px0 = x + 0.06 + off + k * (w - 0.3) / 4;
      if (px0 + (w - 0.3) / 4 - 0.06 > x + w) continue;
      box(s, px0, y + 0.06 + j * (h - 0.1) / rows, (w - 0.3) / 4 - 0.06, (h - 0.1) / rows - 0.06, 'C98B5A', '8A5530', { lw: 0.5 });
    }
  }
}
// polymer chains: zig-zag lines (long molecules), tangled
function chains(s, x, y, w, h, col = '2F7A3A') {
  const ys = [0.15, 0.32, 0.5, 0.68, 0.85];
  ys.forEach((fy, n) => {
    const n0 = 10; let px0 = x + 0.1, py0 = y + fy * h;
    for (let i = 1; i <= n0; i++) {
      const px1 = x + 0.1 + i * (w - 0.2) / n0, py1 = y + fy * h + ((i + n) % 2 ? -1 : 1) * 0.07 + Math.sin(i * 0.9 + n) * 0.06;
      line(s, px0, py0, px1, py1, col, 1.75); px0 = px1; py0 = py1;
    }
  });
}
// composite: matrix with embedded fibres
function composite(s, x, y, w, h, o = {}) {
  box(s, x, y, w, h, o.matrix || 'EADFF5', o.edge || '6A3FA0', { lw: 1 });
  const n = o.n || 5;
  for (let i = 0; i < n; i++) box(s, x + 0.08, y + (i + 0.5) * h / n - 0.035, w - 0.16, 0.07, o.fibre || '2A2A2A', null);
}
// bar chart: items [[xpos, value, colour, label]]
function bars(s, g, items, bw = 0.45) {
  items.forEach(([xv, yv, c]) => box(s, D.px(g, xv) - bw / 2, D.py(g, yv), bw, D.py(g, g.ymin) - D.py(g, yv), c, C.ink, { lw: 0.75 }));
}
// simple chemistry kit
function cylinder(s, x, base, w, h, level, o = {}) {
  // measuring cylinder (glass) with graduations; level = fraction full
  box(s, x - 0.1, base - 0.06, w + 0.2, 0.08, '9AA3B0', '5A6478', { lw: 0.75 });
  box(s, x, base - h - 0.06, w, h, 'F4F8FC', '6B7385', { lw: 1.25 });
  box(s, x + 0.02, base - 0.06 - h * level, w - 0.04, h * level, C.water, null, { tr: 20 });
  line(s, x + 0.02, base - 0.06 - h * level, x + w - 0.02, base - 0.06 - h * level, C.waterDark, 1.5);
  for (let i = 1; i < 10; i++) line(s, x, base - 0.06 - i * h / 10, x + (i % 5 ? 0.1 : 0.18), base - 0.06 - i * h / 10, '6B7385', 0.75);
}
function balance(s, x, y, w, reading) {
  box(s, x, y, w, 0.5, 'D9DEE6', '5A6478', { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1 });
  box(s, x + 0.15, y - 0.08, w - 0.3, 0.08, '9AA3B0', '5A6478', { lw: 0.75 });
  box(s, x + w / 2 - 0.5, y + 0.12, 1.0, 0.28, '1E2A1E', null);
  label(s, x + w / 2 - 0.5, y + 0.12, 1.0, reading, { size: 11, bold: true, color: '7CFC7C', h: 0.28 });
}
// bicycle (side view) for the choosing slide
function bike(s, x, y, k = 1, col = C.blue) {
  const r = 0.42 * k;
  [[x + r, y], [x + 2.0 * k, y]].forEach(([cx, cy]) => { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { type: 'none' }, line: { color: C.ink, width: 2 } }); ball(s, cx, cy, 0.04, C.ink); });
  const rear = [x + r, y], bb = [x + 1.05 * k, y], seat = [x + 0.85 * k, y - 0.62 * k], head = [x + 1.75 * k, y - 0.6 * k], front = [x + 2.0 * k, y];
  [[rear, bb], [bb, seat], [seat, rear], [seat, head], [bb, head], [head, front]].forEach(([a, b]) => line(s, a[0], a[1], b[0], b[1], col, 3.5));
  line(s, seat[0] - 0.12, seat[1] - 0.12, seat[0] + 0.12, seat[1] - 0.12, C.ink, 3);
  line(s, head[0], head[1], head[0] + 0.1, head[1] - 0.15, C.ink, 2.5);
}

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Choosing materials',
    footer: 'OCR J260 Combined Science B • C4.1 How is data used to choose a material for a particular use? • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • metals, ceramics, polymers, composites, alloys` },
      { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statement found • stretch marked' },
      { icon: '▲', text: 'Data: density, strength, melting point • density practical • alloy composition' },
    ],
    notes: 'C4.1 How is data used to choose a material for a particular use? is Part 1 of 4 in J260 Chapter C4 Material choices.\nJ260 C4 sub-topics (see SPEC_C4_1.md): C4.1 choosing materials with data; C4.2 How do bonding and structure affect properties of materials?; C4.3 Why are nanoparticles so useful?; C4.4 What happens to products at the end of their useful life? (life-cycle assessment). J258 (Chemistry B) has an extra C4.2 "What are the different types of polymers?" which is separate science only, so J258 C4.3–C4.5 become J260 C4.2–C4.4.\nStatements C4.1.1–C4.1.3 are from search extracts of the J258 wording (C4.1 is common to both specifications). C4.1.3 (alloys) has medium confidence for J260. No HT marker was found for C4.1.',
  });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C4.1.1', text: 'Name the four families: **metals**, **ceramics** (glass and clay), **polymers** and **composites**.' },
  { code: 'C4.1.1', text: 'Describe properties: **strength** (tension, compression), **stiffness**, **flexibility**, **brittleness**, **hardness**.' },
  { code: 'C4.1.1', text: 'Compare materials **quantitatively** using data: **density**, **melting / softening point**, strength, conductivity.' },
  { code: 'C4.1.1', text: 'Describe **glass** and **clay** ceramics, **polymers** and **composites** and their typical properties.' },
  { code: 'C4.1.2', text: 'Explain how properties relate to **uses** and **select** a material from a **specification** and data.' },
  { code: 'C4.1.3', text: 'Describe the **composition** of important **alloys**, including **steel**, linked to properties and uses.' },
  { code: 'C4.1.1', text: 'Measure **density** by **displacement**; plot mass against volume and use the **gradient**.' },
  { code: 'C4.1.2', text: '**Evaluate** a material choice by weighing **benefits** against **cost** and other drawbacks.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J258 C4.1 wording from search extracts; C4.1 is in both J258 and J260):\nC4.1.1 compare quantitatively the physical properties of glass and clay ceramics, polymers, composites and metals (to include melting point, softening temperature for polymers, electrical conductivity, strength in tension or compression, stiffness, flexibility, brittleness, hardness, density, ease of reshaping)\nC4.1.2 explain how the properties of materials are related to their uses and select appropriate materials given details of the usage required\nC4.1.3 describe the composition of some important alloys in relation to their properties and uses (including steel)\nNo Higher-only (bold) statement was found for C4.1. Strength per unit density is marked GRADE 7–9 STRETCH. Maths: density, ratios, percentages, means, reading and plotting graphs, gradient. The density practical is a suggested practical (no PAG link found).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C4 Material choices • C4.1 is Part 1 of 4 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C4.1.1', 'Four families of materials; describing properties', 'Both tiers', C.blue],
    ['C4.1.1', 'Comparing materials with data: ceramics, polymers, composites', 'Both tiers', C.blue],
    ['C4.1.2', 'Choosing a material from a specification', 'Both tiers', C.blue],
    ['C4.1.3', 'Alloys: steel, stainless steel, brass, gold', 'Both tiers', C.blue],
    ['Practical', 'Measuring density by displacement', 'Practical', C.orange],
    ['C4.1.2', 'Evaluating a choice: car body panels', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C4.1\nChoosing materials', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C1 particle model • C2 metals and non-metals, ionic compounds • C3 metals and extraction', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C4 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**C4.1 How is data used to choose a material for a particular use?** (this deck)',
      'C4.2 How do bonding and structure affect properties of materials?',
      'C4.3 Why are nanoparticles so useful?',
      'C4.4 What happens to products at the end of their useful life?',
    ], { size: 11, color: 'EDE6F8', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'No Higher-only statement was found for C4.1. Strength per unit density is marked **GRADE 7–9 STRETCH**.',
      'This deck asks **what** the properties are; **C4.2** explains **why**, using bonding and structure.',
      'Maths: **density = mass ÷ volume**, **ratios**, **percentages**, plotting a graph and finding a **gradient**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C4 Material choices has four sub-topics (SPEC_C4_1.md): C4.1 data and choosing materials; C4.2 bonding and structure (J258 C4.3); C4.3 nanoparticles (J258 C4.4); C4.4 life cycle of materials / LCA (J258 C4.5). J258 C4.2 on polymer types (addition, condensation, natural polymers) is separate science only.\nOverlap control: this deck describes properties and uses with data. WHY metals conduct, why polymers soften and why alloys are harder are explained with bonding and structure in C4.2; here they are previewed with simple particle pictures only. Nanoparticles are C4.3. Recycling, landfill and life-cycle assessment are C4.4 and are mentioned only (slide 18).\nRecall links (UNVERIFIED sub-codes): C1 particle model and states; C2 periodic table, metals vs non-metals, ionic compounds; C3 metallic bonding and extraction of metals.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C3 • metals', q: 'Describe the structure of a **metal**. Why can metals conduct **electricity**?' },
  { from: 'C3 • extraction', q: 'Balance: **Fe₂O₃(s) + __CO(g) → __Fe(l) + __CO₂(g)**. What is **reduced**?' },
  { from: 'C2 • periodic table', q: 'Give **three** physical properties of metals that most **non-metals** do not have.' },
  { from: 'C1 • particle model', q: 'What happens to the **particles** when a solid **melts**? Why do substances melt at different temperatures?' },
  { from: 'C2 • ionic compounds', q: 'Why does **sodium chloride** have a high melting point? Why does the solid **not** conduct?' },
  { from: 'KS3 • maths', q: 'A block has mass **54 g** and volume **20 cm³**. Calculate its **density** and give the unit.' },
], { subtitle: 'Recall from C1, C2, C3 and KS3 • 6 minutes • no notes', notes: `ANSWERS\n1. A giant regular lattice of positive metal ions in a "sea" of delocalised electrons. The delocalised electrons are free to move through the structure, carrying charge.\n2. ${EQ.ironCO}. Iron(III) oxide is reduced (loses oxygen); carbon monoxide is oxidised.\n3. Any three: shiny; conduct electricity; conduct heat; malleable / ductile; high density; high melting point (most); sonorous.\n4. Particles gain energy, vibrate more, overcome some of the forces of attraction and can move past each other. Different substances have different strengths of forces / bonds between particles.\n5. Giant ionic lattice with strong electrostatic attraction between oppositely charged ions in all directions: lots of energy is needed to overcome them. In the solid the ions are fixed in place and cannot move.\n6. 54 ÷ 20 = 2.7 g/cm³ (aluminium).\nChapter codes for recall are UNVERIFIED (J260 C1 Air and water, C2 Chemical patterns, C3 Chemicals of the natural environment).` }), 'Retrieval starter');

// ======================= 5 FOUR FAMILIES =======================
reg(D.contentSlide({
  title: 'Four families of materials',
  subtitle: `Specification ${sp('C4.1.1')} • metals, ceramics, polymers and composites`,
  tag: 'C4.1.1', caption: 'particle and structure pictures, simplified; not to scale',
  draw: (s) => {
    const cells = [[0.65, 1.45, 'Metals', FAM.metal], [3.55, 1.45, 'Ceramics', FAM.ceramic], [0.65, 3.55, 'Polymers', FAM.polymer], [3.55, 3.55, 'Composites', FAM.composite]];
    cells.forEach(([x, y, t, c]) => { box(s, x, y, 2.75, 1.95, C.white, c, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 }); label(s, x + 0.05, y + 0.04, 2.65, `**${t}**`, { size: 11.5, color: c, h: 0.28 }); });
    lattice(s, 0.95, 1.8, 7, 4, 0.13, { plus: true });
    for (let j = 0; j < 3; j++) for (let i = 0; i < 6; i++) if ((i + j) % 2 === 0) ball(s, 0.95 + 0.26 * (i + 1), 1.8 + 0.26 * (j + 1), 0.035, '1E5AA8');
    label(s, 0.7, 2.9, 2.65, 'ions in layers + free electrons', { size: 10, italic: true, color: C.grey, h: 0.22 });
    glassNet(s, 3.65, 1.75, 1.35, 1.1);
    clayPlates(s, 5.1, 1.8, 1.05, 1.0);
    label(s, 3.6, 2.9, 1.4, 'glass', { size: 10, italic: true, color: C.grey, h: 0.22 });
    label(s, 5.0, 2.9, 1.25, 'fired clay', { size: 10, italic: true, color: C.grey, h: 0.22 });
    chains(s, 0.85, 3.9, 2.35, 1.1);
    label(s, 0.7, 5.0, 2.65, 'long chain molecules', { size: 10, italic: true, color: C.grey, h: 0.22 });
    composite(s, 3.85, 3.95, 2.15, 0.95);
    label(s, 3.6, 5.0, 2.65, 'fibres set in a matrix', { size: 10, italic: true, color: C.grey, h: 0.22 });
    label(s, 0.65, 5.55, 5.65, 'Examples: **steel**, copper • **glass**, brick, pottery • **poly(ethene)**, PVC • **carbon fibre**, concrete', { size: 10.5, h: 0.4 });
  },
  head: 'The four families',
  lines: [
    '**Metals** (and **alloys**): strong, tough, shiny, good conductors of heat and electricity, can be bent or hammered into shape.',
    '**Ceramics**: **glass** and **clay** ceramics (brick, pottery). Hard, stiff, high melting point, but **brittle**; electrical insulators.',
    '**Polymers** (plastics, rubber): low density, flexible, insulators, **soften** at low temperatures, easy to mould.',
    '**Composites**: two or more materials combined, e.g. fibres in a resin, to get properties neither has alone.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: identify a metal', q: 'A sample has mass 39 g and volume 5.0 cm³.',
    steps: [['Equation', 'density = mass ÷ volume'], ['Substitute', '39 ÷ 5.0 = 7.8 g/cm³'], ['Answer', 'matches **steel** (7.8 g/cm³) in the data table']], size: 10.5 },
  workedH: 1.55,
  qc: 'Name the family for: **brick**, **carbon-fibre bike**, **PVC pipe**, **copper wire**. A 13.5 g sample has a volume of 5.0 cm³: density?',
  notes: 'QUICK CHECK ANSWER: brick = ceramic (clay); carbon-fibre bike = composite; PVC pipe = polymer; copper wire = metal. 13.5 ÷ 5.0 = 2.7 g/cm³ (aluminium).\nC4.1.1 names glass and clay ceramics, polymers, composites and metals. The particle pictures are a preview only: C4.2 explains properties with bonding and structure (metallic lattice, giant covalent networks, polymer chains). Density alone does not prove identity: other materials can share a density (IaS: use more than one property).',
}), 'C4.1.1 Four families');

// ======================= 6 DESCRIBING PROPERTIES =======================
{
  const s = D.contentHeader('Describing properties', `Specification ${sp('C4.1.1')} • the words scientists and engineers use`, { tag: 'C4.1.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'how each property is tested; forces shown as arrows; not to scale');
  const cells = [[0.65, 1.45, 'Strength in tension'], [3.55, 1.45, 'Strength in compression'], [0.65, 3.45, 'Stiff or flexible?'], [3.55, 3.45, 'Hard or brittle?']];
  cells.forEach(([x, y, t]) => { box(s, x, y, 2.75, 1.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, x + 0.05, y + 0.04, 2.65, `**${t}**`, { size: 11, color: C.ink, h: 0.28 }); });
  // tension: bar pulled
  box(s, 1.35, 2.15, 1.35, 0.32, 'B8C2D0', '5A6478');
  arrow(s, 1.35, 2.31, 0.8, 2.31, C.red, 2.5); arrow(s, 2.7, 2.31, 3.25, 2.31, C.red, 2.5);
  label(s, 0.7, 2.6, 2.65, 'pulled: does it **snap**?', { size: 10, h: 0.25 });
  label(s, 0.7, 2.85, 2.65, 'e.g. rope, cable, bridge wire', { size: 10, italic: true, color: C.grey, h: 0.22 });
  // compression: block squashed
  box(s, 4.55, 1.95, 0.75, 0.62, 'D9B48A', '8A5530');
  arrow(s, 4.92, 1.75, 4.92, 1.93, C.red, 2.5); arrow(s, 4.92, 2.79, 4.92, 2.59, C.red, 2.5);
  label(s, 3.6, 2.82, 2.65, 'squashed: does it **crush**? e.g. pillar, brick', { size: 10, h: 0.4 });
  // stiffness: beam with load bending
  box(s, 0.85, 3.85, 0.18, 0.75, '9AA3B0', '5A6478');
  box(s, 1.03, 3.88, 2.1, 0.1, '7A8BA6', '3E4A5E');
  line(s, 1.03, 4.25, 1.8, 4.32, '5FA463', 3); line(s, 1.8, 4.32, 2.5, 4.48, '5FA463', 3); line(s, 2.5, 4.48, 3.05, 4.7, '5FA463', 3);
  label(s, 2.15, 3.66, 1.0, 'stiff', { size: 10, bold: true, color: '3E4A5E', h: 0.2 });
  label(s, 1.2, 4.42, 1.0, 'flexible', { size: 10, bold: true, color: '2F7A3A', h: 0.2 });
  label(s, 0.7, 4.85, 2.65, 'same load: how far does it **bend**?', { size: 10, h: 0.3 });
  // hardness / brittleness: scratch and snapped glass
  line(s, 3.85, 4.1, 4.65, 4.1, '6B7385', 4); line(s, 4.6, 3.9, 4.25, 4.1, C.ink, 2);
  label(s, 3.65, 4.2, 1.2, 'scratch test', { size: 10, h: 0.22 });
  box(s, 5.0, 3.95, 0.55, 0.25, 'CFE7F5', '5B9BD5'); box(s, 5.62, 4.02, 0.5, 0.25, 'CFE7F5', '5B9BD5', { rotate: 18 });
  label(s, 4.95, 4.3, 1.3, 'snaps with no bending: **brittle**', { size: 10, h: 0.4 });
  label(s, 3.6, 4.85, 2.65, 'opposite of brittle: **tough**', { size: 10, h: 0.3 });
  D.card(s, 6.8, 1.3, 6.08, 3.25, 'Property words', [
    '**Strength**: the force needed to break it. **Tension** = pulling; **compression** = squashing.',
    '**Stiffness**: how hard it is to bend or stretch. Opposite: **flexible**.',
    '**Hardness**: how hard it is to scratch or dent. **Brittle**: breaks suddenly without bending.',
    '**Density**: mass per unit volume (g/cm³). **Melting point**; polymers have a **softening temperature**.',
    '**Electrical conductivity**; **ease of reshaping** (can it be bent, rolled or moulded?).',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.7, 6.08, 1.55, 'Worked example: tension or compression?', 'Concrete: strength in compression 30 MPa; in tension 3 MPa.', [
    ['Ratio', '30 ÷ 3 = 10'], ['Answer', '**10 times** stronger when squashed than when pulled']], { size: 10.5 });
  D.quickCheck(s, 'What is the difference between **hard** and **tough**? Glass: compression 1000 MPa, tension 50 MPa. How many times stronger in compression?');
  D.notes(s, 'QUICK CHECK ANSWER: Hard = resists scratching / denting; tough = absorbs energy and does not break easily (bends before breaking; opposite of brittle). A material can be hard but brittle (glass). 1000 ÷ 50 = 20 times.\n1 MPa = 1 N/mm² (megapascal). Values for glass and concrete are typical, rounded (illustrative). These are the C4.1.1 property words: melting point, softening temperature for polymers, electrical conductivity, strength in tension or compression, stiffness, flexibility, brittleness, hardness, density, ease of reshaping.');
  reg(s, 'C4.1.1 Describing properties');
}

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C4.1.1')} • families and properties`, [
  { q: 'Name the **four** families of materials and give **one** example of each.', marks: 2, ms: 'All four families named (1): metals, ceramics, polymers, composites; one correct example for each (1), e.g. steel, glass / brick, poly(ethene), carbon fibre / concrete.' },
  { q: 'Explain what is meant by a **brittle** material. Give **one** example.', marks: 2, ms: 'Breaks / shatters suddenly without bending / changing shape first (1); glass / pottery / brick / ceramic (1).' },
  { q: 'A sample has mass **31.2 g** and volume **4.0 cm³**. Calculate its density.', marks: 2, ms: '31.2 ÷ 4.0 (1); = 7.8 g/cm³ (1). Unit needed for the second mark.' },
  { q: 'Explain why concrete beams are **reinforced** with steel bars along the bottom, where they are stretched.', marks: 2, ms: 'Concrete is weak in tension / strong only in compression (1); steel is strong in tension, so the bars stop the beam cracking where it is pulled (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 COMPARING WITH DATA =======================
{
  const s = D.contentHeader('Comparing materials with data', `Specification ${sp('C4.1.1')} • quantitative comparison of the four families`, { tag: 'C4.1.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'bar chart drawn to scale from the table (typical values, rounded)');
  const g = { x: 1.35, y: 1.55, w: 5.0, h: 2.85, xmin: 0, xmax: 8, ymin: 0, ymax: 10, xstep: 1, ystep: 2, minor: 2, ylabel: 'Density / g/cm³', fmt: () => '' };
  D.axes(s, g);
  bars(s, g, MAT.map((r, i) => [i + 0.5, r[2], FAM[r[1]]]), 0.42);
  const short = ['Steel', 'Al alloy', 'Copper', 'Glass', 'Brick', 'HDPE', 'GRP', 'CFRP'];
  short.forEach((t, i) => label(s, D.px(g, i + 0.5) - 0.32, g.y + g.h + 0.06, 0.64, t, { size: 10, h: 0.22 }));
  MAT.forEach((r, i) => label(s, D.px(g, i + 0.5) - 0.3, D.py(g, r[2]) - 0.22, 0.6, String(r[2]), { size: 10, bold: true, color: C.ink, h: 0.2 }));
  Object.entries(FAM).forEach(([k, c], i) => { box(s, 0.8 + i * 1.45, 4.85, 0.22, 0.22, c, C.ink, { lw: 0.5 }); label(s, 1.07 + i * 1.45, 4.83, 1.1, k, { size: 10, align: 'left', h: 0.26 }); });
  label(s, 0.7, 5.25, 5.6, 'Metals are the **densest**; polymers and composites are **light**. Ceramics are in between.', { size: 10.5, h: 0.5, valign: 'top' });
  const rows = [[HDR('Material'), HDR('Density g/cm³'), HDR('Melts / softens °C'), HDR('Tensile strength MPa'), HDR('Conducts?')],
    ...MAT.map((r, i) => [tcell(r[0], i, { bold: true, align: 'left' }), tcell(String(r[2]), i), tcell(String(r[3]), i), tcell(String(r[4]), i), tcell(r[5], i)])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.78, 1.0, 1.1, 1.2, 1.0], rowH: 0.27, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 6.8, 4.25, 6.08, 2.0, 'Worked example: replacing steel with aluminium', 'A steel bracket has mass 2.0 kg. A bracket of the same size is made from aluminium alloy.', [
    ['Ratio', `${dens('Steel (mild)')} ÷ ${dens('Aluminium alloy')} = 2.9 (steel is 2.9 × denser)`],
    ['Mass', `2.0 × ${dens('Aluminium alloy')} ÷ ${dens('Steel (mild)')} = ${fmt(sf(brAl, 3))} kg`],
    ['Answer', 'about **0.69 kg**, but alloy is weaker, so it may need to be thicker']], { size: 10.5 });
  D.quickCheck(s, 'Which material in the table has the **lowest** softening temperature? How many times denser is **copper** than **HDPE**?');
  D.notes(s, `QUICK CHECK ANSWER: HDPE poly(ethene), about 130 °C. 8.9 ÷ 0.95 = 9.4 times (2 s.f.).\nAll values are typical, rounded textbook values (UNVERIFIED to the exact figure; real values depend on grade). Glass softens over a range (soda-lime about 700–730 °C) rather than melting sharply; polymers soften. Clay brick: fired clay does not melt below about 1500 °C. CFRP conducts slightly because carbon fibres conduct.\nNode: 2.0 × 2.7 ÷ 7.8 = ${fmt(sf(brAl, 4))} kg; bracket volume 2000 g ÷ 7.8 = 256 cm³.`);
  reg(s, 'C4.1.1 Comparing with data');
}

// ======================= 9 CERAMICS =======================
reg(D.contentSlide({
  title: 'Ceramics: glass and clay',
  subtitle: `Specification ${sp('C4.1.1')} • properties and uses of glass and clay ceramics`,
  tag: 'C4.1.1', caption: 'glass: disordered network; fired clay: crystals bonded together',
  draw: (s) => {
    label(s, 0.65, 1.45, 2.8, '**Glass**', { size: 11.5, color: C.ink, h: 0.28 });
    box(s, 0.75, 1.8, 2.6, 1.9, 'F2EEF9', '8C6BB8', { lw: 1 });
    glassNet(s, 0.8, 1.85, 2.5, 1.8);
    ball(s, 0.95, 3.88, 0.07, SI[0], SI[1]); label(s, 1.08, 3.77, 0.8, 'silicon', { size: 10, align: 'left', h: 0.22 });
    ball(s, 2.1, 3.88, 0.045, OX[0], OX[1]); label(s, 2.2, 3.77, 0.8, 'oxygen', { size: 10, align: 'left', h: 0.22 });
    label(s, 3.55, 1.45, 2.8, '**Fired clay** (brick, pottery)', { size: 11.5, color: C.ink, h: 0.28 });
    clayPlates(s, 3.65, 1.8, 2.6, 1.9);
    label(s, 3.55, 3.77, 2.8, 'heated in a **kiln** to about 1000 °C', { size: 10, h: 0.22 });
    box(s, 0.65, 4.2, 5.7, 1.1, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.75, 4.25, 5.5, '**Making glass**: heat sand (SiO₂) with sodium carbonate and limestone to about 1500 °C', { size: 10.5, h: 0.3, align: 'left' });
    label(s, 0.75, 4.6, 5.5, `**${EQ.glass}**`, { size: 11.5, color: C.blue, h: 0.3 });
    label(s, 0.75, 4.92, 5.5, 'Clay is soft and easy to shape when wet; firing makes it hard and rigid', { size: 10.5, h: 0.3, align: 'left' });
    label(s, 0.65, 5.45, 5.7, 'Borosilicate glass (oven dishes, test tubes) softens at a higher temperature than soda-lime glass', { size: 10, italic: true, color: C.grey, h: 0.4 });
  },
  head: 'Properties → uses',
  lines: [
    '**Both**: hard, stiff, **brittle**, high melting point, strong in **compression** but weak in **tension**, electrical and heat **insulators**, do not corrode.',
    '**Glass**: **transparent** → windows, bottles, lenses, optical fibres; can be melted and reshaped when hot.',
    '**Clay ceramics**: cheap, hard, resist heat and water → bricks, tiles, plates, sinks, toilets, insulators on pylons.',
    'Their main weakness: they **shatter** when hit or bent.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: density of a brick', q: 'A brick is 21.5 cm × 10.25 cm × 6.5 cm and has a mass of 2.7 kg.',
    steps: [['Volume', '21.5 × 10.25 × 6.5 = 1432 cm³'], ['Density', '2700 g ÷ 1432 cm³ = 1.885'], ['Answer', '**1.9 g/cm³** (2 s.f.)']], size: 10.5 },
  workedH: 1.55,
  qc: 'Give **two** properties of glass that make it suitable for **windows**. A tile has mass **20 g** and volume **8.0 cm³**: density?',
  notes: `QUICK CHECK ANSWER: Transparent; hard (scratch-resistant); does not corrode / is waterproof; electrical insulator not relevant. 20 ÷ 8.0 = 2.5 g/cm³.\nGlass equation (atom balance asserted in node): ${EQ.glass}. Limestone first decomposes: ${EQ.lime}; CaO makes the glass insoluble. These equations are context, not a recall requirement (UNVERIFIED that J260 requires them). Glass is amorphous (no regular lattice): C4.2 deals with structure. Node: brick volume ${fmt(brickV)} cm³, density ${fmt(sf(brickD, 4))} g/cm³.`,
}), 'C4.1.1 Ceramics');

// ======================= 10 POLYMERS AND COMPOSITES =======================
reg(D.contentSlide({
  title: 'Polymers and composites',
  subtitle: `Specification ${sp('C4.1.1')} • light, mouldable polymers and materials combined for strength`,
  tag: 'C4.1.1', stretch: true, caption: 'polymer chains; fibres in a resin matrix; reinforced concrete',
  draw: (s) => {
    label(s, 0.65, 1.45, 2.8, '**Polymer**: long chains', { size: 11, color: C.ink, h: 0.28 });
    box(s, 0.75, 1.8, 2.6, 1.55, 'EAF5E4', '5FA463', { lw: 1 });
    chains(s, 0.8, 1.85, 2.5, 1.45);
    label(s, 0.65, 3.4, 2.8, 'heat → chains slide → **softens**', { size: 10, h: 0.25 });
    label(s, 3.55, 1.45, 2.8, '**Composite**: fibres + matrix', { size: 11, color: C.ink, h: 0.28 });
    composite(s, 3.75, 1.85, 2.4, 1.4, { n: 6 });
    label(s, 3.55, 3.4, 2.8, 'fibres: strong in tension • resin: binds', { size: 10, h: 0.25 });
    label(s, 0.65, 3.85, 5.7, '**Reinforced concrete**: steel bars set in concrete (a composite)', { size: 11, color: C.ink, h: 0.28, align: 'left' });
    box(s, 0.85, 4.25, 5.3, 0.85, 'C9C3B8', '7A7266', { lw: 1 });
    for (let i = 0; i < 26; i++) ball(s, 0.95 + (i * 0.205) % 5.1, 4.38 + ((i * 7) % 5) * 0.11, 0.035, '8F877A', '6B6458', 0.25);
    [4.85, 4.98].forEach(y => box(s, 0.95, y, 5.1, 0.06, '6B4F2A', null));
    arrow(s, 5.6, 3.95, 5.6, 4.22, C.red, 2.5); label(s, 5.7, 3.92, 0.6, 'load', { size: 10, bold: true, color: C.red, align: 'left', h: 0.22 });
    label(s, 0.85, 5.15, 5.3, 'concrete takes the **compression** (top) • steel takes the **tension** (bottom)', { size: 10, h: 0.25 });
    label(s, 0.65, 5.5, 5.7, 'Other composites: GRP (boats), CFRP (bikes, racing cars), plywood, MDF', { size: 10, italic: true, color: C.grey, h: 0.3 });
  },
  head: 'Properties → uses',
  lines: [
    '**Polymers**: low density, flexible or tough, insulators, waterproof, **low softening temperature**, easy to mould → bags, bottles, pipes, cable insulation.',
    '**Composites** combine materials: **CFRP** and **GRP** are strong, stiff and very **light** → bike frames, boats, aircraft parts; but **expensive** and hard to recycle.',
    '**Reinforced concrete**: strong in compression **and** tension → beams, bridges.',
  ],
  size: 11,
  worked: { head: 'Stretch: strength per unit density', q: 'Tensile strength ÷ density (MPa per g/cm³), from the data table.',
    steps: [['Steel', `${ts('Steel (mild)')} ÷ ${dens('Steel (mild)')} = 51`], ['CFRP', `${ts('Carbon-fibre (CFRP)')} ÷ ${dens('Carbon-fibre (CFRP)')} = 625`], ['Answer', 'CFRP is about **12 times** stronger for its mass']], size: 10.5 },
  workedH: 1.6,
  qc: 'Why are electrical cables coated in a **polymer**? Calculate strength ÷ density for **GRP** (250 MPa, 1.9 g/cm³).',
  notes: `QUICK CHECK ANSWER: Polymers are electrical insulators (and flexible, waterproof), so the cable is safe to touch and can bend. 250 ÷ 1.9 = 132 (3 s.f.).\nGRADE 7–9 STRETCH: "strength per unit density" (specific strength) is not a named J260 term; it is a useful way to compare data for lightweight uses. Node: steel ${fmt(sf(SS('Steel (mild)'), 3))}, aluminium ${fmt(sf(SS('Aluminium alloy'), 3))}, CFRP ${SS('Carbon-fibre (CFRP)')}, ratio CFRP/steel ${fmt(sf(SS('Carbon-fibre (CFRP)') / SS('Steel (mild)'), 3))}.\nPolymer types (addition / condensation, natural polymers) are J258 C4.2, separate science only: not taught here. Why polymers soften (weak forces between chains) is C4.2.`,
}), 'C4.1.1 Polymers and composites');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C4.1.1')} • using data on materials`, [
  { q: 'Use the data table: give **two** properties of poly(ethene) that make it better than glass for a **drinks bottle**.', marks: 2, ms: 'Any two (1 each): lower density / lighter; not brittle / does not shatter / tough / flexible; easy to mould.' },
  { q: 'Copper has density **8.9 g/cm³** and aluminium **2.7 g/cm³**. How many times denser is copper? (2 s.f.)', marks: 2, ms: '8.9 ÷ 2.7 (1); = 3.3 (1).' },
  { q: 'Explain why glass is used for windows but **not** for car bumpers.', marks: 2, ms: 'Glass is transparent / hard / does not corrode, so suits windows (1); glass is brittle / shatters on impact, so unsuitable for bumpers (1).' },
  { q: 'Explain what a **composite** material is, using **GRP** as an example.', marks: 2, ms: 'Made of two or more materials combined / fibres in a matrix (1); GRP = glass fibres in a polymer resin, giving strong light material (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 CHOOSING A MATERIAL =======================
{
  const s = D.contentHeader('Choosing a material for a use', `Specification ${sp('C4.1.2')} • from a specification to a decision`, { tag: 'C4.1.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'design steps and a bike frame; frame masses calculated for 400 cm³ of material');
  const steps = ['1 Write the **specification**: what must it do?', '2 List the **properties** needed', '3 **Shortlist** materials using data', '4 Weigh up **cost**, safety, appearance', '5 **Decide** and justify'];
  steps.forEach((t, i) => {
    pbox(s, 0.7, 1.5 + i * 0.5, 2.75, 0.4, t, i % 2 ? C.white : C.cardBlue, C.blue, { size: 10, lw: 0.75, align: 'left' });
    if (i < steps.length - 1) arrow(s, 2.05, 1.9 + i * 0.5, 2.05, 2.0 + i * 0.5, C.blue, 1.5);
  });
  bike(s, 3.65, 2.95, 1.1);
  label(s, 3.55, 3.55, 2.9, 'Bike frame: **strong**, **stiff**, **light**, does not rust', { size: 10, h: 0.42 });
  const rows = [[HDR('Frame'), HDR('Density'), HDR('Mass'), HDR('Cost')],
    [tcell('Steel', 0, { bold: true }), tcell('7.8', 0), tcell(`${fmt(fSteel / 1000)} kg`, 0), tcell('low', 0)],
    [tcell('Aluminium alloy', 1, { bold: true }), tcell('2.7', 1), tcell(`${fmt(fAl / 1000)} kg`, 1), tcell('medium', 1)],
    [tcell('CFRP', 0, { bold: true }), tcell('1.6', 0), tcell(`${fmt(fC / 1000)} kg`, 0), tcell('high', 0)]];
  s.addTable(rows, { x: 0.7, y: 4.15, w: 5.6, colW: [1.7, 1.1, 1.4, 1.4], rowH: 0.28, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  label(s, 0.7, 5.35, 5.6, 'Racing bike → CFRP (light). Cheap, tough commuter bike → steel.', { size: 10.5, bold: true, color: C.ink, h: 0.45 });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Properties decide the use', [
    '**Saucepan**: metal body (conducts heat, high melting point); polymer handle (heat **insulator**).',
    '**Electric cable**: copper core (best conductor, ductile); PVC coat (insulator, flexible).',
    '**Aircraft**: aluminium alloys and CFRP (strong but **low density**).',
    '**Bridge**: steel and reinforced concrete (strong in tension and compression, cheap in bulk).',
    'There is rarely a perfect material: choose the **best compromise**.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: frame mass from density', '400 cm³ of material is used to make the frame.', [
    ['Equation', 'mass = density × volume'], ['Steel', `${dens('Steel (mild)')} × 400 = ${fSteel} g; CFRP: ${dens('Carbon-fibre (CFRP)')} × 400 = ${fC} g`],
    ['Answer', `CFRP saves ${fSteel} − ${fC} = 2480 g = **2.48 kg**`]], { size: 10.5 });
  D.quickCheck(s, 'Explain why a saucepan **handle** is made of a polymer. Calculate the % mass saved by using aluminium instead of steel (2 s.f.).');
  D.notes(s, 'QUICK CHECK ANSWER: Polymer is a poor conductor of heat (insulator) so the handle stays cool; also light and mouldable (a thermosetting polymer does not soften when hot). (3120 − 1080) ÷ 3120 × 100 = 65% (2 s.f.).\nC4.1.2: explain how the properties of materials are related to their uses and select appropriate materials given details of the usage required. Using the same volume for each frame is a simplification (illustrative): real frames use different tube thicknesses because the materials have different strengths and stiffness. Costs are qualitative.');
  reg(s, 'C4.1.2 Choosing a material');
}

// ======================= 13 ALLOYS =======================
{
  const s = D.contentHeader('Alloys: steel and others', `Specification ${sp('C4.1.3')} • composition linked to properties and uses`, { tag: 'C4.1.3' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'atoms as circles in layers; bar drawn to scale (by mass)');
  label(s, 0.65, 1.42, 2.8, '**Pure iron**: regular layers', { size: 10.5, h: 0.26 });
  lattice(s, 0.85, 1.75, 8, 4, 0.15);
  arrow(s, 1.0, 3.05, 2.8, 3.05, C.red, 2); label(s, 0.65, 3.1, 2.8, 'layers **slide** easily: soft', { size: 10, h: 0.25 });
  label(s, 3.55, 1.42, 2.8, '**Alloy**: other atoms added', { size: 10.5, h: 0.26 });
  lattice(s, 3.75, 1.75, 8, 4, 0.15, { big: ['2,1', '5,2', '1,3'], small: [[3, 0], [6, 1], [1, 1], [4, 2]] });
  label(s, 3.55, 3.1, 2.8, 'layers **distorted**: harder, stronger', { size: 10, h: 0.25 });
  ball(s, 3.8, 3.5, 0.04, CAR[0], CAR[1]); label(s, 3.9, 3.38, 1.3, 'carbon atom', { size: 10, align: 'left', h: 0.24 });
  ball(s, 5.1, 3.5, 0.08, 'E0B040', '8A6A14'); label(s, 5.22, 3.38, 1.1, 'larger atom', { size: 10, align: 'left', h: 0.24 });
  // stacked bar to scale: 74 / 18 / 8
  const bx = 0.85, bw = 5.3, by = 4.1;
  label(s, 0.65, 3.75, 5.7, '**Stainless steel** composition by mass', { size: 10.5, h: 0.26 });
  [[74, 'Iron 74%', 'B8C2D0'], [18, 'Chromium 18%', '8FB3D9'], [8, 'Nickel 8%', 'D9C08F']].reduce((x0, [p, t, c]) => {
    const w = bw * p / 100; box(s, x0, by, w, 0.42, c, C.ink, { lw: 0.75 }); label(s, x0, by, w, t, { size: 10, bold: true, h: 0.42 }); return x0 + w;
  }, bx);
  label(s, 0.65, 4.62, 5.7, `**Making steel**: blow oxygen through molten iron to burn off extra carbon`, { size: 10.5, h: 0.28 });
  label(s, 0.65, 4.92, 5.7, `**${EQ.steelC}**`, { size: 11.5, color: C.blue, h: 0.3 });
  label(s, 0.65, 5.3, 5.7, 'then add exact amounts of carbon and other metals', { size: 10, italic: true, color: C.grey, h: 0.28 });
  const rows = [[HDR('Alloy'), HDR('Composition (typical)'), HDR('Property → use')],
    [tcell('Mild steel', 0, { bold: true }), tcell('iron + about 0.25% carbon', 0), tcell('strong, easily shaped → car bodies, girders', 0)],
    [tcell('High-carbon steel', 1, { bold: true }), tcell('iron + about 1% carbon', 1), tcell('very hard, more brittle → tools, blades', 1)],
    [tcell('Stainless steel', 0, { bold: true }), tcell('iron + 18% chromium + 8% nickel', 0), tcell('does not rust → cutlery, sinks', 0)],
    [tcell('Brass', 1, { bold: true }), tcell('70% copper + 30% zinc', 1), tcell('harder than copper, gold colour → taps, plug pins', 1)],
    [tcell('Bronze', 0, { bold: true }), tcell('about 88% copper + 12% tin', 0), tcell('hard, resists corrosion → statues, bells', 0)],
    [tcell('18-carat gold', 1, { bold: true }), tcell('75% gold + silver / copper', 1), tcell('harder than pure gold → jewellery', 1)]];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.38, 2.0, 2.7], rowH: 0.36, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'left', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 6.8, 4.55, 6.08, 1.7, 'Worked example: mass of a metal in an alloy', 'A stainless steel sink has a mass of 2.0 kg. It is 18% chromium.', [
    ['Fraction', '18% = 0.18'], ['Answer', '2.0 × 0.18 = **0.36 kg** of chromium']], { size: 10.5 });
  D.quickCheck(s, 'Why is **stainless** steel used for cutlery rather than mild steel? What percentage of **9-carat** gold is gold? (carat = parts in 24)');
  D.notes(s, `QUICK CHECK ANSWER: Stainless steel does not rust / corrode (chromium forms a protective oxide layer); mild steel rusts: ${EQ.rust}. 9 ÷ 24 × 100 = 37.5%.\nC4.1.3 (J258 wording, search extract): describe the composition of some important alloys in relation to their properties and uses, including steel. Confidence that it is in J260: medium. Compositions are typical (UNVERIFIED exact percentages; stainless 18/8 is the common grade 304). Why alloys are harder (distorted layers) is previewed here and explained with metallic bonding in C4.2. Node: 18/24 = 75%; 0.25% of 500 kg = 1.25 kg carbon; 70% of 200 g brass = 140 g copper.`);
  reg(s, 'C4.1.3 Alloys');
}

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C4.1.2')}, ${sp('C4.1.3')} • choosing materials and alloys`, [
  { q: 'Explain why copper is used for the **core** of an electrical cable and PVC for the **outside**.', marks: 2, ms: 'Copper is a very good electrical conductor / ductile (1); PVC is an electrical insulator / flexible, so the cable is safe to touch (1).' },
  { q: 'What is an **alloy**? Give **one** reason why alloys are often more useful than pure metals.', marks: 2, ms: 'A mixture of a metal with other elements / metals (1); harder / stronger / resists corrosion / properties can be designed (1).' },
  { q: 'A stainless steel spoon of mass **250 g** contains **18%** chromium. Calculate the mass of chromium.', marks: 2, ms: '250 × 0.18 (1); = 45 g (1).' },
  { q: 'Explain why **high-carbon** steel is used for drill bits but **mild** steel for car bodies.', marks: 2, ms: 'High-carbon steel is very hard (keeps a cutting edge) (1); mild steel is easier to shape / less brittle / can be pressed into panels (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 PRACTICAL METHOD =======================
reg(D.contentSlide({
  title: 'Practical: density by displacement',
  subtitle: `Specification ${sp('C4.1.1')} • measuring density to compare materials quantitatively`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'balance, 100 cm³ measuring cylinder, thread, samples',
  draw: (s) => {
    // balance with sample
    balance(s, 0.75, 4.6, 2.2, '10.7 g');
    box(s, 1.6, 4.32, 0.5, 0.2, 'B8C2D0', '5A6478', { lw: 0.75 });
    label(s, 0.7, 5.15, 2.3, '**1** find the mass on a balance', { size: 10, h: 0.25 });
    // two cylinders: before and after
    cylinder(s, 3.45, 5.05, 0.7, 3.2, 0.5);
    label(s, 3.15, 5.15, 1.3, '**2** read V₁ = 50.0 cm³', { size: 10, h: 0.25 });
    cylinder(s, 5.2, 5.05, 0.7, 3.2, 0.54);
    line(s, 5.55, 1.7, 5.55, 4.6, '6B7385', 0.75);
    box(s, 5.42, 4.6, 0.26, 0.2, 'B8C2D0', '5A6478', { lw: 0.75 });
    label(s, 4.75, 5.15, 1.6, '**3** lower sample; read V₂ = 54.0 cm³', { size: 10, h: 0.42, valign: 'top' });
    label(s, 4.1, 1.45, 1.15, 'thread', { size: 10, italic: true, color: C.grey, h: 0.22 });
    arrow(s, 4.8, 1.6, 5.5, 1.85, C.grey, 1);
    // meniscus close-up
    box(s, 0.75, 1.5, 2.2, 2.0, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 1.52, 2.1, '**Read the bottom of the meniscus at eye level**', { size: 10, h: 0.45 });
    box(s, 1.3, 2.05, 1.1, 1.3, 'F4F8FC', '6B7385', { lw: 1 });
    box(s, 1.32, 2.75, 1.06, 0.58, C.water, null);
    s.addShape(SH.ARC, { x: 1.32, y: 2.6, w: 1.06, h: 0.3, angleRange: [0, 180], line: { color: C.waterDark, width: 1.5 }, fill: { type: 'none' } });
    line(s, 1.0, 2.9, 2.65, 2.9, C.red, 1, { dash: 'dash' });
    ball(s, 0.95, 2.9, 0.07, C.white, C.ink);
  },
  head: 'Method',
  lines: [
    'Measure the **mass** of the dry sample on a balance (g).',
    'Half-fill a measuring cylinder with water; read the volume **V₁** at eye level.',
    'Tie thread to the sample and **lower it gently** until fully under water; read **V₂**.',
    'Volume of sample = **V₂ − V₁** (cm³). Density = mass ÷ volume. Repeat with **different sized** pieces of each material.',
    '**IV**: material. **DV**: density. **Control**: same cylinder, water at room temperature, no air bubbles.',
    '**Safety**: low hazard. Glass cylinders can break: keep away from the bench edge; lower samples gently. Wipe up spills (slip risk). Cut metal samples may have sharp edges.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: one aluminium piece', q: 'Mass 10.7 g; V₁ = 50.0 cm³; V₂ = 54.0 cm³.',
    steps: [['Volume', '54.0 − 50.0 = 4.0 cm³'], ['Density', '10.7 ÷ 4.0 = 2.675 g/cm³'], ['Answer', '**2.7 g/cm³** (2 s.f.)']], size: 10.5 },
  workedH: 1.5,
  qc: 'Why must the sample be **fully** under water? How would you measure the density of a poly(ethene) sample, which **floats**?',
  notes: 'QUICK CHECK ANSWER: Otherwise only part of its volume displaces water, so V₂ − V₁ is too small and the density is too high. For a floating sample: attach a sinker (e.g. a steel bolt); measure the volume of the sinker alone, then sinker + sample, and subtract; or push it under with a thin wire.\nSuggested practical: no OCR PAG code is linked to C4.1 in any source found (PAG numbering for J260 chemistry is UNVERIFIED). Regular solids can also be measured with a ruler (V = l × w × h, as for the brick on slide 9). A displacement (eureka) can is an alternative for larger samples. CLEAPSS-style risk: no hazardous chemicals; main risks are broken glass and slips.',
}), 'Practical: density (method)');

// ======================= 16 PRACTICAL RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('C4.1.1')} • mass against volume; density from the gradient`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'plotted to scale from the table; best-fit lines through the origin (illustrative data)');
  const g = { x: 1.4, y: 1.55, w: 5.3, h: 3.6, xmin: 0, xmax: 10, ymin: 0, ymax: 80, xstep: 2, ystep: 10, minor: 2, xlabel: 'Volume / cm³', ylabel: 'Mass / g' };
  D.axes(s, g);
  const sets = [[PST, gSt, '5A6478', 'steel'], [PAL, gAl, '8FB3D9', 'aluminium'], [PNY, gNy, '5FA463', 'nylon (polymer)']];
  sets.forEach(([ms, gr, col, nm]) => {
    const xEnd = Math.min(10, 78 / gr);
    D.plotLine(s, g, [[0, 0], [xEnd, gr * xEnd]], col, 2);
    D.points(s, g, PV.map((v, i) => [v, ms[i]]), C.ink);
  });
  label(s, D.px(g, 7.4), D.py(g, 74), 1.0, '**steel**', { size: 10, color: '3E4A5E', align: 'left', h: 0.22 });
  label(s, D.px(g, 8.4), D.py(g, 19), 1.2, '**aluminium**', { size: 10, color: '3C6C9C', align: 'left', h: 0.22 });
  label(s, D.px(g, 7.3), D.py(g, 15), 1.4, '**nylon**', { size: 10, color: '2F7A3A', align: 'left', h: 0.22 });
  // gradient triangle on steel line
  const x1 = 2, x2 = 8;
  line(s, D.px(g, x1), D.py(g, gSt * x1), D.px(g, x2), D.py(g, gSt * x1), C.red, 1.25, { dash: 'dash' });
  line(s, D.px(g, x2), D.py(g, gSt * x1), D.px(g, x2), D.py(g, gSt * x2), C.red, 1.25, { dash: 'dash' });
  label(s, D.px(g, 2.9), D.py(g, gSt * x1) - 0.25, 1.2, 'Δx = 6.0 cm³', { size: 10, bold: true, color: C.red, h: 0.22 });
  label(s, D.px(g, 8) + 0.05, D.py(g, 42), 1.0, 'Δy = 46.9 g', { size: 10, bold: true, color: C.red, h: 0.22, align: 'left' });
  const rows = [[HDR('Volume / cm³'), ...PV.map(v => HDR(v.toFixed(1)))],
    [tcell('Steel mass / g', 0, { bold: true }), ...PST.map(v => tcell(v.toFixed(1), 0))],
    [tcell('Al mass / g', 1, { bold: true }), ...PAL.map(v => tcell(v.toFixed(1), 1))],
    [tcell('Nylon mass / g', 0, { bold: true }), ...PNY.map(v => tcell(v.toFixed(1), 0))]];
  s.addTable(rows, { x: 7.3, y: 1.3, w: 5.58, colW: [1.58, 1.0, 1.0, 1.0, 1.0], rowH: 0.27, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 2.55, 5.58, 1.75, 'Worked example: density from the gradient', 'Steel line, using the triangle.', [
    ['Gradient', 'Δy ÷ Δx = 46.9 ÷ 6.0'], ['Answer', `= **7.8 g/cm³**; aluminium ${fmt(sf(gAl, 2))}, nylon ${fmt(sf(gNy, 3))} g/cm³`]], { size: 10.5 });
  D.card(s, 7.3, 4.45, 5.58, 1.8, 'Errors and improvements', [
    'Cylinder read to ±0.5 cm³: for 4.0 cm³ that is **±12.5%**; for 8.0 cm³ only ±6.25%. Use **bigger samples** or a narrower cylinder.',
    'Air bubbles or water lost by splashing; wet samples weighed. Repeat and find a **mean**; use the **gradient** of many points.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Use the table to calculate the density of the **6.0 cm³** steel sample. Why is a line of best fit better than one reading?');
  D.notes(s, `QUICK CHECK ANSWER: 47.0 ÷ 6.0 = 7.83 → 7.8 g/cm³ (2 s.f.). A best-fit line uses all the results, so random errors in single readings average out; it also shows any anomalous result.\nIllustrative results. Node: least-squares gradients through the origin: steel ${fmt(sf(gSt, 4))}, aluminium ${fmt(sf(gAl, 4))}, nylon ${fmt(sf(gNy, 4))} g/cm³. Gradient triangle on the best-fit steel line from 2.0 to 8.0 cm³: Δy = ${fmt(sf(gSt * 6, 3))} g, /6.0 = 7.8. Uncertainty: ±0.5 cm³ ÷ 4.0 cm³ = 12.5%; ÷ 8.0 cm³ = 6.25%. Mass and volume have proportional relationship (line through origin) because density is constant for one material.`);
  assert.strictEqual(fmt(sf(gSt * 6, 3)), '46.9', 'gradient triangle Δy');
  reg(s, 'Practical: density (results)');
}

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('C4.1.1')} • density practical`, [
  { q: 'A sample has mass **23.0 g**. The water level rises from **50.0** to **58.5 cm³**. Calculate the density (2 s.f.).', marks: 2, ms: 'Volume = 58.5 − 50.0 = 8.5 cm³ (1); 23.0 ÷ 8.5 = 2.7 g/cm³ (1).' },
  { q: 'Describe how to read the volume of water in a measuring cylinder accurately.', marks: 2, ms: 'Eye level with the surface (1); read the bottom of the meniscus (1).' },
  { q: 'Explain why using a **larger** sample makes the density measurement more accurate.', marks: 2, ms: 'The reading error / uncertainty of the cylinder (±0.5 cm³) stays the same (1); so it is a smaller percentage of a larger volume (1).' },
  { q: 'Mass is plotted against volume for one material. Describe the graph and say what the **gradient** shows.', marks: 2, ms: 'A straight line through the origin (mass proportional to volume) (1); gradient = density (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 18 EVALUATING A CHOICE =======================
{
  const s = D.contentHeader('Evaluating a choice: car panels', `Specification ${sp('C4.1.2')} • weighing benefits against costs using data`, { tag: 'C4.1.2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'bar charts drawn to scale from the table (illustrative values)');
  const g1 = { x: 1.3, y: 1.6, w: 2.0, h: 3.1, xmin: 0, xmax: 3, ymin: 0, ymax: 14, xstep: 1, ystep: 2, minor: 2, ylabel: 'Mass / kg', fmt: () => '' };
  const g2 = { x: 4.3, y: 1.6, w: 2.0, h: 3.1, xmin: 0, xmax: 3, ymin: 0, ymax: 100, xstep: 1, ystep: 20, minor: 2, ylabel: 'Cost / £', fmt: () => '' };
  D.axes(s, g1); D.axes(s, g2);
  const cols = ['8C96A8', '8FB3D9', '6A3FA0'];
  bars(s, g1, PANEL.map(([, m], i) => [i + 0.5, m, cols[i]]), 0.42);
  bars(s, g2, pCost.map((c, i) => [i + 0.5, c, cols[i]]), 0.42);
  ['Steel', 'Al', 'CFRP'].forEach((t, i) => { label(s, D.px(g1, i + 0.5) - 0.32, g1.y + g1.h + 0.06, 0.64, t, { size: 10, h: 0.22 }); label(s, D.px(g2, i + 0.5) - 0.32, g2.y + g2.h + 0.06, 0.64, t, { size: 10, h: 0.22 }); });
  PANEL.forEach(([, m], i) => label(s, D.px(g1, i + 0.5) - 0.3, D.py(g1, m) - 0.22, 0.6, fmt(m), { size: 10, bold: true, h: 0.2 }));
  pCost.forEach((c, i) => label(s, D.px(g2, i + 0.5) - 0.3, D.py(g2, c) - 0.22, 0.6, '£' + fmt(c), { size: 10, bold: true, h: 0.2 }));
  label(s, 0.7, 1.32, 2.9, '**Panel mass**', { size: 10.5, h: 0.24 });
  label(s, 3.7, 1.32, 2.9, '**Material cost**', { size: 10.5, h: 0.24 });
  label(s, 0.7, 5.1, 5.6, 'Each panel has the same stiffness. Lighter panels → less fuel or longer battery range.', { size: 10.5, h: 0.5, valign: 'top' });
  const rows = [[HDR('Panel'), HDR('Mass / kg'), HDR('£ per kg'), HDR('Other points')],
    [tcell('Steel', 0, { bold: true }), tcell('12.0', 0), tcell('1', 0), tcell('cheap, easy to press and repair; can rust', 0)],
    [tcell('Aluminium', 1, { bold: true }), tcell('6.0', 1), tcell('3', 1), tcell('does not rust; harder to weld', 1)],
    [tcell('CFRP', 0, { bold: true }), tcell('4.8', 0), tcell('20', 0), tcell('lightest; slow to make; hard to repair', 0)]];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.2, 0.95, 0.85, 3.08], rowH: 0.34, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 6.8, 2.85, 6.08, 1.7, 'Worked example: percentage mass saved', 'Replace the 12.0 kg steel panel with a 4.8 kg CFRP panel.', [
    ['Saved', '12.0 − 4.8 = 7.2 kg'], ['Answer', '7.2 ÷ 12.0 × 100 = **60%** lighter, but costs £96 not £12']], { size: 10.5 });
  D.card(s, 6.8, 4.7, 6.08, 1.55, 'Making a judgement', [
    'Family car: **steel** or **aluminium** (cost matters). Sports car: **CFRP** (mass matters most).',
    'A full judgement also looks at energy and waste over the product\'s whole life: **life-cycle assessment** (C4.4).',
  ], { size: 10.5 });
  D.quickCheck(s, 'Calculate the extra cost per kg of mass saved for **aluminium** compared with steel. Which panel would you choose for a **taxi**? Why?');
  D.notes(s, 'QUICK CHECK ANSWER: Extra cost £18 − £12 = £6 for 12.0 − 6.0 = 6.0 kg saved → £1 per kg saved (CFRP: £84 ÷ 7.2 kg = £11.67 per kg). Taxi: steel or aluminium: cheap to buy and repair, still reasonably light; aluminium does not rust and saves fuel over many miles. Accept a justified answer.\nAll masses and prices are illustrative (asserted in node). C4.1.2 select appropriate materials given details of the usage required. Life-cycle assessment belongs to C4.4 and is mentioned only. IaS: decisions weigh benefits, costs and risks for different people.');
  reg(s, 'C4.1.2 Evaluating a choice');
}

// ======================= 19 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('C4.1.2')} • evaluating material choices`, [
  { q: 'A **20 kg** steel bonnet is replaced with a **14 kg** aluminium one. Calculate the percentage mass saved.', marks: 2, ms: '(20 − 14) ÷ 20 × 100 (1); = 30% (1).' },
  { q: 'Give **one** advantage and **one** disadvantage of CFRP compared with steel for car panels.', marks: 2, ms: 'Advantage: lower density / lighter / does not rust / strong for its mass (1). Disadvantage: expensive / hard to repair / slow to make / hard to recycle (1).' },
  { q: 'Suggest why **aluminium alloy**, not pure aluminium, is used for aircraft bodies.', marks: 2, ms: 'Pure aluminium is soft / weak (1); the alloy is stronger / harder while still low density (1).' },
  { q: 'Explain why there is rarely a **perfect** material for a product.', marks: 2, ms: 'Each material has advantages and disadvantages / no material has every property needed (1); so designers choose the best compromise, e.g. trade mass against cost (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Ceramic', 'Hard, brittle, heat-resistant material such as glass, brick or pottery.'],
  ['Polymer', 'Material made of very long chain molecules, e.g. poly(ethene).'],
  ['Composite', 'Two or more materials combined, e.g. carbon fibres in resin.'],
  ['Alloy', 'A mixture of a metal with other elements, e.g. steel.'],
  ['Steel', 'Alloy of iron with a small amount of carbon (and sometimes other metals).'],
  ['Stainless steel', 'Iron with chromium and nickel: does not rust.'],
  ['Density', 'Mass per unit volume: density = mass ÷ volume (g/cm³).'],
  ['Tensile strength', 'Force per unit area needed to break a material by pulling it.'],
  ['Compression', 'A squashing force; concrete and brick are strong in compression.'],
  ['Stiffness', 'How hard it is to bend or stretch a material. Opposite: flexible.'],
  ['Hardness', 'How hard it is to scratch or dent the surface.'],
  ['Brittle', 'Breaks suddenly without bending first, e.g. glass.'],
  ['Softening temperature', 'Temperature at which a polymer becomes soft and can be reshaped.'],
  ['Conductor', 'Lets electricity (or heat) pass through easily, e.g. copper.'],
  ['Specification', 'A list of what a product (and its material) must do.'],
  ['Displacement', 'Finding volume from the rise in water level when an object is submerged.'],
], { notes: 'Use as a cover-and-recall activity. "Softening temperature" and the property words come from C4.1.1. Bonding words (delocalised electrons, intermolecular forces, giant covalent) belong to C4.2.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A company is choosing a material for a **ladder**. Each ladder uses **250 cm³** of material. Data: aluminium alloy density **2.7 g/cm³**; steel density **7.8 g/cm³**; GRP is an electrical **insulator**.', [
  { l: 'a', q: 'Calculate the mass of the aluminium alloy ladder.', marks: 2, ms: '250 × 2.7 (1); = 675 g (1).' },
  { l: 'b', q: 'The steel ladder has a mass of **1950 g**. Calculate how much lighter (as a percentage) the aluminium ladder is. (2 s.f.)', marks: 2, ms: '(1950 − 675) ÷ 1950 × 100 (1); = 65% (1). Allow ecf from (a).', h: 1.15 },
  { l: 'c', q: 'Describe how you could measure the **density** of a small piece of the alloy in the lab.', marks: 3, ms: 'Measure mass on a balance (1); find volume by displacement: lower into a measuring cylinder of water and find the rise in level (1); density = mass ÷ volume (1).', h: 1.3 },
  { l: 'd', q: 'Steel is an **alloy** of iron. State what is added to iron to make steel, and why.', marks: 2, ms: 'Carbon (small amount) (1); makes it harder / stronger than pure iron (1).' },
  { l: 'e', q: 'Suggest why electricians use **GRP** ladders rather than aluminium ladders.', marks: 2, ms: 'GRP is an electrical insulator (1); aluminium conducts, so there is a risk of electric shock near live wires (1).' },
  { l: 'f', q: 'Glass is not used for ladders even though it is hard and strong in compression. Explain why.', marks: 2, ms: 'Glass is brittle / weak in tension / shatters (1); a ladder bends and is knocked, so it would break suddenly / dangerous (1).' },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Steel: strong, stiff, cheap, easy to shape and weld; high density (7.8 g/cm³) so heavy; rusts unless painted or stainless.',
    'Aluminium alloy: low density (2.7 g/cm³), does not rust, reasonably strong; more expensive than steel.',
    'CFRP: lowest density (1.6 g/cm³) and highest strength for its mass; very expensive, hard to repair or recycle.',
    'Use data: e.g. same volume (400 cm³) gives 3.12 kg, 1.08 kg and 0.64 kg frames; strength ÷ density 51, 111, 625.',
    'Link properties to the use: a racing bike needs low mass; a commuter bike needs low cost, toughness, easy repair.',
    'Judgement: e.g. CFRP for racing, steel or aluminium for everyday use; justified with data and trade-offs.',
  ], {
    l3: 'Compares at least TWO materials using properties AND data from the table, AND makes a justified choice for a stated use, considering at least one drawback.',
    l2: 'Compares properties of two materials with some use of data OR makes a choice with a simple reason.',
    l1: 'Simple statements, e.g. "carbon fibre is light" or "steel is strong".',
  });
}
const HW = [
  { n: '1', q: 'Name the **family** of materials that glass and brick belong to.', marks: 1, ms: 'Ceramics (1).' },
  { n: '2', q: 'A metal sample has mass **88.0 g** and volume **11.0 cm³**. Calculate its density.', marks: 2, ms: '88.0 ÷ 11.0 (1); = 8.0 g/cm³ (1).' },
  { n: '3', q: '**22-carat** gold contains 22 parts gold in 24. Calculate the percentage of gold (3 s.f.).', marks: 2, ms: '22 ÷ 24 × 100 (1); = 91.7% (1).' },
  { n: '4', q: 'A bronze bell of mass **5.0 kg** is **12%** tin. Calculate the mass of tin.', marks: 2, ms: '5.0 × 0.12 (1); = 0.6 kg / 0.60 kg / 600 g (1).' },
  { n: '5', q: 'Explain why **polymers** are used to make plastic bottles but not **saucepan** bodies.', marks: 2, ms: 'Polymers are light / tough / easy to mould / waterproof, good for bottles (1); low softening temperature / poor heat conductor, so would melt on a hob (1).', h: 1.15 },
  { n: '6', q: 'Explain why **reinforced concrete** is a composite and why it is better than concrete alone for a beam.', marks: 2, ms: 'Steel bars combined with concrete: two materials combined (1); steel is strong in tension, concrete only in compression, so the beam does not crack when it bends (1).', h: 1.15 },
  { n: '7', q: 'Use the data on steel, aluminium alloy and CFRP to **evaluate** which material is best for a **bicycle frame**.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer: use the data table from slide 8.', HW, 17, { dividerSub: 'C4.1 Choosing materials • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
// deck-specific: the C4.1 title is long, so widen every footer text box to keep it on one line
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C4.1') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
const out = path.join(__dirname, 'OCR21C_C4.1_ChoosingMaterials_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
