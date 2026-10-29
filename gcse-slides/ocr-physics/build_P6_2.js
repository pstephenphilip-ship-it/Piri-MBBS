// build_P6_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter P6 Matter – models and explanations, P6.2 How does the particle model explain the effects of heating?
// (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_P6_2.js
// Structure copied from build_P6_1.js. ocr_template.js is NOT edited: deck-only helpers are in the DECK-SPECIFIC block.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'P6', chapterTitle: 'Matter – models and explanations', code: 'P6.2', title: 'How does the particle model explain the effects of heating?',
  part: 2, parts: 3, specRange: 'P6.2.1–P6.2.6',
  subtitle: 'How does the particle model explain the effects of heating?',
  keywords: ['Gas pressure', 'Temperature', 'Absolute zero', 'Kelvin', 'pV = constant (HT)', 'Work on a gas (HT)'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= EQUATIONS (J260 equation list) =======================
// pV = constant is printed on the OCR Physics B / Combined Science B equation sheet ("for a given mass of gas at a
// constant temperature: pressure × volume = constant") -> GIVEN. Kelvin conversion and density are RECALL.
T.addEq('PV', { eq: 'p × V = constant', words: 'for a fixed mass of gas at constant temperature: pressure (Pa) × volume (m³) = constant  (so p₁V₁ = p₂V₂)  [HT]', status: 'given' });
T.addEq('KEL', { eq: 'T = θ + 273', words: 'temperature in kelvin (K) = temperature in degrees Celsius (°C) + 273', status: 'recall' });
T.addEq('RHO', { eq: 'ρ = m ÷ V', words: 'density (kg/m³) = mass (kg) ÷ volume (m³)  (recap from P6.1)', status: 'recall' });
const ST = k => T.EQS[k].status === 'recall' ? '!!RECALL!!' : '**GIVEN** on the equation sheet';

// ======================= CALCULATIONS (asserted) =======================
const close = (a, b, rel = 0.01) => Math.abs(a - b) <= rel * Math.abs(b);
const K = c => c + 273, Cc = k => k - 273;
// starter
calc('starter density of air 2.0 / 1.6', 2.0 / 1.6, 1.25, 1e-12);
calc('starter pressure 600 / 0.20', 600 / 0.20, 3000, 1e-9);
// slide 9: constant-volume heating (sealed can 20 °C -> 80 °C, 100 kPa)
const canP2 = calc('can p at 80 °C = 100 × 353/293', 100 * K(80) / K(20), 120.4778156996587, 1e-9);
calc('can p 2 s.f.', sf(canP2, 2), 120, 1e-9);
// slide 10: kelvin
calc('20 °C in K', K(20), 293); calc('100 °C in K', K(100), 373); calc('0 °C in K', K(0), 273);
calc('-273 °C in K', K(-273), 0); calc('77 K in °C', Cc(77), -196); calc('300 K in °C', Cc(300), 27);
calc('QC -40 °C in K', K(-40), 233);
// practical (slides 12–13): flask at fixed volume, 100.0 kPa at 20 °C
const prTh = [20, 35, 50, 65, 80];
const prT = prTh.map(K);
const prP = [100.0, 105.3, 110.0, 115.6, 120.3];
prT.forEach((t, i) => assert(close(prP[i], 100 * t / 293, 0.005), 'practical point within 0.5% of ideal: ' + prTh[i]));
const kPT = prT.reduce((a, t, i) => a + t * prP[i], 0) / prT.reduce((a, t) => a + t * t, 0); // least squares through origin
assert(close(kPT, 0.3413, 0.002), 'gradient p/T ≈ 0.341: ' + kPT);
calc('gradient 2 s.f. (kPa/K)', sf(kPT, 2), 0.34, 1e-12);
const ratios = prT.map((t, i) => prP[i] / t);
ratios.forEach(r => assert(Math.abs(r - 0.341) < 0.002, 'p/T constant'));
calc('p/T at 293 K, 3 s.f.', sf(prP[0] / prT[0], 3), 0.341, 1e-12);
calc('p/T at 353 K, 3 s.f.', sf(prP[4] / prT[4], 3), 0.341, 1e-12);
const pred100 = calc('stretch: p at 100 °C = 100 × 373/293', 100 * 373 / 293, 127.30375426621161, 1e-9);
calc('stretch 3 s.f.', sf(pred100, 3), 127, 1e-9);
// extrapolation on slide 10: line through measured points meets p = 0 at -273 °C
const xInt = prTh[0] - prP[0] / ((prP[4] - prP[0]) / (prTh[4] - prTh[0]));
assert(Math.abs(xInt - (-273)) < 6, 'extrapolated intercept near -273 °C: ' + xInt);
// slide 15: pV = constant (HT)
calc('syringe pV at 60 cm³', 100 * 60, 6000); calc('syringe p at 30 cm³ = 6000/30', 6000 / 30, 200);
const pumpP2 = calc('pump p2 = 100 × 150 / 60', 100 * 150 / 60, 250, 1e-9);
calc('QC p2 = 1.0e5 × 2.0 / 5.0', 1.0e5 * 2.0 / 5.0, 4.0e4, 1e-6);
// slide 16: Boyle's law results
const bV = [60, 50, 40, 30, 20], bP = [100, 121, 149, 201, 298];
bV.forEach((v, i) => assert(close(bP[i], 6000 / v, 0.02), 'Boyle point within 2%'));
const bPV = bV.map((v, i) => v * bP[i]);
assert.deepStrictEqual(bPV, [6000, 6050, 5960, 6030, 5960]);
const bMean = calc('mean pV', bPV.reduce((a, b) => a + b) / bPV.length, 6000);
const bInv = bV.map(v => 1 / v);
calc('1/60 4 d.p.', +bInv[0].toFixed(4), 0.0167, 1e-12); calc('1/20', bInv[4], 0.05, 1e-12);
const kInv = bInv.reduce((a, x, i) => a + x * bP[i], 0) / bInv.reduce((a, x) => a + x * x, 0);
assert(close(kInv, 6000, 0.01), 'p vs 1/V gradient ≈ 6000: ' + kInv);
calc('gradient 2 s.f.', sf(kInv, 2), 6000, 1e-9);
calc('QC predict p at 25 cm³ = 6000/25', 6000 / 25, 240);
// slide 19: scale of gas particles (air at 0 °C, 101 kPa)
const nAir = 101325 / (1.38e-23 * 273);
const spacing = Math.cbrt(1 / nAir);
assert(close(spacing, 3.34e-9, 0.01), 'spacing ≈ 3.3 nm: ' + spacing);
const spRatio = spacing / 3.0e-10;
assert(spRatio > 10 && spRatio < 12, 'spacing ≈ 10–11 diameters: ' + spRatio);
// recaps
calc('R2 37 °C in K', K(37), 310); calc('R2 250 K in °C', Cc(250), -23);
calc('R4 p2 = 100 × 300 / 75', 100 * 300 / 75, 400);
// full question
calc('FQ 27 °C in K', K(27), 300);
calc('FQ p2 = 100 × 80 / 32', 100 * 80 / 32, 250, 1e-9);
// homework
calc('HW -23 °C in K', K(-23), 250); calc('HW 400 K in °C', Cc(400), 127);
calc('HW p2 = 2.0e5 × 0.030 / 0.12', 2.0e5 * 0.030 / 0.12, 5.0e4, 1e-6);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_template.js) =======================
function ball(s, cx, cy, r, fill, edge) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: 0.75 } }); }
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
const PCOL = { solid: ['5B7FD6', '2E4A9A'], liquid: ['3FA3C9', '1F6E8C'], gas: ['E0884A', '9A5320'], cold: ['5B9BD5', '2E5B8A'], hot: ['E0604A', '9A2E20'] };
// solid / liquid particle boxes (copied from build_P6_1.js)
function particleBox(s, x, y, w, h, state, o = {}) {
  const r = o.r || 0.085, [fc, ec] = o.col || PCOL[state];
  box(s, x, y, w, h, C.white, C.ink, { lw: 1.25 });
  const R = rng(o.seed || 7);
  if (state === 'solid') {
    const nx = Math.floor((w - 0.06) / (2 * r)), ny = Math.floor((h - 0.06) / (2 * r));
    const ox = x + (w - nx * 2 * r) / 2 + r, oy = y + h - 0.03 - r;
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) ball(s, ox + i * 2 * r, oy - j * 2 * r, r * 0.96, fc, ec);
  } else {
    const sp2 = 2.12 * r, nx = Math.floor((w - 0.08) / sp2), top = y + h * (o.fill != null ? 1 - o.fill : 0.22);
    const ny = Math.floor((y + h - 0.03 - top) / sp2);
    const placed = [];
    const ok = (a, b) => a > x + r + 0.01 && a < x + w - r - 0.01 && b < y + h - r - 0.01 && b > y + r && placed.every(([p, q]) => Math.hypot(p - a, q - b) >= 1.98 * r);
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      if (R() < 0.13) continue;
      const bx = x + (w - nx * sp2) / 2 + sp2 / 2 + i * sp2 + (j % 2 ? sp2 * 0.25 : -sp2 * 0.25), by = y + h - 0.03 - r - j * sp2 * 0.95;
      let done = false;
      for (let k = 0; k < 12 && !done; k++) { const a = bx + (R() - 0.5) * r * 0.9, b = by + (R() - 0.5) * r * 0.6; if (ok(a, b)) { placed.push([a, b]); done = true; } }
      if (!done && ok(bx, by)) placed.push([bx, by]);
    }
    placed.forEach(([a, b]) => ball(s, a, b, r * 0.96, fc, ec));
  }
}
// gas in a region: n particles with velocity arrows (mean length o.speed in), seeded; arrows kept inside the region
function gasBox(s, x, y, w, h, o = {}) {
  if (o.box !== false) box(s, x, y, w, h, o.fill || C.white, C.ink, { lw: o.lw || 1.5 });
  const R = rng(o.seed || 7), r = o.r || 0.08, n = o.n || 8, [fc, ec] = o.col || PCOL.gas, L0 = o.speed || 0.25;
  const m = o.margin || 0.14, placed = [];
  let guard = 0;
  while (placed.length < n && guard++ < 6000) {
    const a = x + m + R() * (w - 2 * m), b = y + m + R() * (h - 2 * m);
    if (placed.every(([p, q]) => Math.hypot(p - a, q - b) > (o.gap || 0.4))) placed.push([a, b]);
  }
  assert.strictEqual(placed.length, n, 'gas particles placed: ' + n);
  placed.forEach(([a, b]) => {
    ball(s, a, b, r, fc, ec);
    if (o.arrows === false) return;
    let L = L0 * (0.65 + 0.7 * R()), t, ex, ey, k = 0;
    do { t = R() * Math.PI * 2; ex = a + Math.cos(t) * (r * 1.15 + L); ey = b + Math.sin(t) * (r * 1.15 + L); k++; }
    while ((ex < x + 0.04 || ex > x + w - 0.04 || ey < y + 0.04 || ey > y + h - 0.04) && k < 40);
    arrow(s, a + Math.cos(t) * r * 1.15, b + Math.sin(t) * r * 1.15, ex, ey, '6B7385', 1);
  });
  return placed;
}
// pressure gauge: dial with 0..full ticks over 270°, needle at frac
function gauge(s, cx, cy, r, frac, reading, o = {}) {
  s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: C.white }, line: { color: C.ink, width: 1.75 } });
  for (let i = 0; i <= 10; i++) {
    const a = (225 - i * 27) * Math.PI / 180, r1 = r * (i % 5 ? 0.8 : 0.7), r2 = r * 0.92;
    line(s, cx + r1 * Math.cos(a), cy - r1 * Math.sin(a), cx + r2 * Math.cos(a), cy - r2 * Math.sin(a), C.ink, 0.75);
  }
  const a = (225 - frac * 270) * Math.PI / 180;
  line(s, cx, cy, cx + 0.72 * r * Math.cos(a), cy - 0.72 * r * Math.sin(a), C.red, 2);
  ball(s, cx, cy, 0.035, C.ink);
  if (reading) label(s, cx - 0.8, cy + r + 0.03, 1.6, reading, { size: 10.5, bold: true, color: o.color || C.ink, h: 0.24 });
}
function thermometer(s, x, y, len, f = 0.45) {
  box(s, x - 0.045, y, 0.09, len, C.white, '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.04, lw: 0.75 });
  ball(s, x, y + len, 0.075, C.red, '8E2A33');
  box(s, x - 0.015, y + len - len * f, 0.03, len * f, C.red, null);
  for (let i = 1; i < 8; i++) line(s, x + 0.01, y + 0.1 + i * (len - 0.2) / 8, x + 0.045, y + 0.1 + i * (len - 0.2) / 8, '6B7385', 0.5);
}
// horizontal syringe: nozzle at left (x0), gas column length Lg, gauge on the nozzle
function syringe(s, x0, yc, Lg, o = {}) {
  const hh = 0.33, bl = 3.0;
  box(s, x0, yc - hh, Lg, 2 * hh, 'FFF4E8', null);
  gasBox(s, x0, yc - hh, Lg, 2 * hh, { box: false, n: o.n || 8, seed: o.seed || 3, gap: o.gap || 0.26, r: 0.06, speed: 0.13, margin: 0.09 });
  line(s, x0, yc - hh, x0 + bl, yc - hh, C.ink, 1.75); line(s, x0, yc + hh, x0 + bl, yc + hh, C.ink, 1.75);
  line(s, x0, yc - hh, x0, yc - 0.06, C.ink, 1.75); line(s, x0, yc + 0.06, x0, yc + hh, C.ink, 1.75);
  for (let i = 1; i <= 6; i++) line(s, x0 + i * 0.45, yc - hh, x0 + i * 0.45, yc - hh + (i % 2 ? 0.08 : 0.14), C.ink, 0.75);
  box(s, x0 + Lg, yc - hh + 0.02, 0.12, 2 * hh - 0.04, '8C96A8', '4A5262', { lw: 1 });
  box(s, x0 + Lg + 0.12, yc - 0.05, 1.45, 0.1, 'B7BECC', '6B7385', { lw: 0.75 });
  box(s, x0 + Lg + 1.57, yc - 0.3, 0.1, 0.6, '8C96A8', '4A5262', { lw: 0.75 });
  // nozzle + tube to gauge
  box(s, x0 - 0.22, yc - 0.06, 0.22, 0.12, 'D5DCEB', C.ink, { lw: 1 });
  gauge(s, x0 - 0.6, yc, 0.36, o.frac, null);
}
// equation badge: equation + RECALL / GIVEN pill
function eqBadge(s, x, y, w, key, o = {}) {
  const e = T.EQS[key], rec = e.status === 'recall';
  box(s, x, y, w, 0.5, C.white, rec ? C.red : C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
  label(s, x + 0.1, y, w - 1.4, o.text || e.eq, { h: 0.5, size: 16, bold: true, color: C.ink, align: 'left' });
  D.pill(s, x + w - 1.25, y + 0.1, rec ? 'RECALL' : 'GIVEN', rec ? C.red : C.green, 1.1);
}
// flow chain of boxes with arrows (left to right)
function chain(s, x, y, w, h, items, col = C.blue) {
  const gap = 0.3, bw = (w - gap * (items.length - 1)) / items.length;
  items.forEach((t, i) => {
    const bx = x + i * (bw + gap);
    box(s, bx, y, bw, h, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.25 });
    label(s, bx + 0.04, y, bw - 0.08, t, { h, size: 10.5, bold: true, color: C.ink });
    if (i < items.length - 1) arrow(s, bx + bw + 0.03, y + h / 2, bx + bw + gap - 0.03, y + h / 2, col, 2);
  });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const rowsFill = rows => rows.map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Heating gases',
  footer: 'OCR J260 Combined Science B • P6.2 How does the particle model explain the effects of heating? • teacher deck • mark schemes in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • suggested practical: pressure and temperature of a gas` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT pill on pV = constant and work done on a gas' },
    { icon: 'p', text: 'Gas pressure • temperature • absolute zero and kelvin • pV = constant • limits of the model' },
  ],
  notes: 'P6.2 How does the particle model explain the effects of heating? is Part 2 of 3 in J260 Chapter P6 (P6.1, P6.2, P6.3).\nThe OCR delivery guide for P6.2 lists the density of the states, conservation of mass in changes of state and "how heating a system will change the energy stored … temperature or changes of state" under P6.2. These were already taught in the P6.1 deck, so this deck RECAPS them on one slide (slide 5) and then teaches the gas content.\nSpec wording and numbering were reconstructed from search extracts and memory (ocr.org.uk could not be fetched): see SPEC_P6_2.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'P6.2.1', text: 'Explain the **density** of solids, liquids and gases using the arrangement of particles (recap of P6.1).' },
  { code: 'P6.2.2', text: 'Describe how **mass is conserved** in changes of state, which are reversible **physical changes** (recap).' },
  { code: 'P6.2.3', text: 'Describe how heating changes the **internal energy**: temperature rise or change of state (recap).' },
  { code: 'P6.2.4', text: 'Explain how the motion of gas particles is related to the **temperature** and the **pressure** of the gas.' },
  { code: 'P6.2.4', text: 'Explain why heating a gas at **constant volume** raises its pressure; use **absolute zero** and the **kelvin** scale.' },
  { code: 'P6.2.5', text: 'Use **p × V = constant** for a fixed mass of gas at constant temperature; interpret p–V graphs.', ht: true },
  { code: 'P6.2.6', text: 'Explain how **doing work on a gas** (e.g. a bicycle pump) can increase its temperature.', ht: true },
  { code: 'IaS', text: 'Describe the **limitations of the particle model** of a gas.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'P6.2.1–P6.2.3 were taught in P6.1 (as P6.1.1–P6.1.5): this deck recaps them briefly. The new content is P6.2.4 onwards.\nHT (Higher tier only, bold in OCR): pV = constant and doing work on a gas. Both are marked HT here following the national subject content; their exact J260 status is UNVERIFIED (they might be separate-science J259 only). Absolute zero and kelvin are taught with P6.2.4 as the basis of the pressure–temperature graph: UNVERIFIED as a separate statement.\nNumbering P6.2.1–P6.2.6 is reconstructed (see SPEC_P6_2.md).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter P6 Matter – models and explanations • P6.2 is Part 2 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['P6.2.1–P6.2.3', 'States, density, mass conserved, internal energy', 'P6.1 RECAP', C.grey],
    ['P6.2.4', 'Gas particles: motion, temperature and pressure', 'BOTH TIERS', C.blue],
    ['P6.2.4', 'Heating at constant volume; absolute zero and kelvin', 'BOTH TIERS', C.blue],
    ['Practical', 'Pressure against temperature: a flask in a water bath', 'PRACTICAL', C.orange],
    ['P6.2.5–P6.2.6', 'p × V = constant; doing work on a gas', 'HIGHER (HT)', C.red],
    ['IaS', 'Limitations of the particle model', 'BOTH TIERS', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'P6.2\nParticles and heating', { h: 0.75, size: 11.5, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who, col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: P6.1 particle model and internal energy • KS3 pressure = force ÷ area • P2 energy transfers (work)', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.05, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter P6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**P6.1 How does energy transform matter?** States, density, internal energy, c and L.',
      '**P6.2 How does the particle model explain the effects of heating?** (this deck)',
      '**P6.3 How does the particle model relate to material under stress?** Forces on springs, F = kx.',
      'P6.4 (pressure in fluids) and P6.5 (the Big Bang) are **Physics B J259 only**.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.85, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.55, 5.53, 2.3, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Foundation: gas pressure and temperature, explained with particles.',
      'Slides with the red **HT** pill (p × V = constant, work done on a gas) are **Higher tier only**.',
      '**T = θ + 273** must be recalled; **p × V = constant** is given on the equation sheet.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.65, w: 5.15, h: 2.1, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter P6 has three sub-topics in Combined Science: P6.1, P6.2 and P6.3. P6.4 and P6.5 are J259 only.\nThe OCR delivery guide for P6.2 lists density of the states, conservation of mass in changes of state and the effect of heating on stored energy: the P6.1 deck already taught these, so slide 5 is a recap only.\nNo PAG is linked to P6.2 in the extracts found. The pressure–temperature investigation is included as a SUGGESTED practical.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'P6.1 • internal energy', q: 'What is the **internal energy** of a substance?' },
  { from: 'P6.1 • density of the states', q: 'Use the particle model to explain why a **gas** is much less dense than a **liquid**.' },
  { from: 'P6.1 • conservation of mass', q: '**50 g** of ice melts in a sealed bag. What is the mass of the water? Why?' },
  { from: 'KS3 • particles', q: 'Describe how the particles in a **gas** are arranged and how they **move**.' },
  { from: 'P6.1 • density', q: '**2.0 kg** of air fills a volume of **1.6 m³**. Calculate the density of the air.' },
  { from: 'KS3 • pressure', q: 'A force of **600 N** acts on an area of **0.20 m²**. Calculate the pressure. Give the unit.' },
], { subtitle: 'Recall from P6.1 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. The total kinetic and potential energy of all its particles.\n2. Gas particles are far apart; liquid particles are touching. The same mass of gas takes up a much bigger volume, so ρ = m ÷ V is much smaller.\n3. 50 g: the same particles are rearranged; none are created or destroyed (and none escape from the sealed bag).\n4. Far apart, random arrangement; move quickly in random directions, in straight lines between collisions.\n5. ρ = m ÷ V = 2.0 ÷ 1.6 = 1.25 kg/m³ (accept 1.3).\n6. p = F ÷ A = 600 ÷ 0.20 = 3000 Pa (N/m²).' }), 'Retrieval starter');

// ======================= 5 RECAP OF P6.1 =======================
reg(D.contentSlide({
  title: 'Recap from P6.1: the particle model',
  subtitle: `Specification ${sp('P6.2.1')}–${sp('P6.2.3')} • taught in P6.1: a quick reminder before the new gas content`,
  tag: 'P6.2.1–3', caption: 'the same substance as a solid, a liquid and a gas (gas spacing NOT to scale)',
  draw: (s, p) => {
    const bw = 1.7, bh = 1.45, y = 1.8;
    [['solid', 'solid', 0.75, 'high density'], ['liquid', 'liquid', 2.65, 'high density'], ['gas', 'gas', 4.55, 'very low density']].forEach(([t, st, x, d], i) => {
      label(s, x, y - 0.32, bw, t.toUpperCase(), { size: 11, bold: true, color: PCOL[st][1] });
      if (st === 'gas') gasBox(s, x, y, bw, bh, { n: 4, seed: 5, gap: 0.6, speed: 0.22, lw: 1.25 });
      else particleBox(s, x, y, bw, bh, st, { seed: 3 + i, fill: 0.92 });
      label(s, x, y + bh + 0.04, bw, d, { size: 10.5, bold: true });
    });
    arrow(s, 2.5, 2.5, 2.6, 2.5, C.red, 2); arrow(s, 4.4, 2.5, 4.5, 2.5, C.red, 2);
    box(s, 0.75, 3.85, 5.5, 1.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.9, 3.92, 5.2, 'Heating increases the **internal energy** (kinetic + potential energy of the particles)', { size: 11, bold: true, align: 'left', h: 0.3 });
    chain(s, 0.95, 4.35, 5.1, 0.55, ['heating', 'particles gain energy'], C.red);
    box(s, 0.95, 5.05, 2.4, 0.5, 'FBE9E9', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.95, 5.05, 2.4, 'EITHER temperature rises\n(more kinetic energy)', { h: 0.5, size: 10, bold: true });
    box(s, 3.65, 5.05, 2.4, 0.5, 'E6EEFB', C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 3.65, 5.05, 2.4, 'OR state changes\n(more potential energy)', { h: 0.5, size: 10, bold: true });
  },
  head: 'What you already know (P6.1)',
  lines: [
    '**Density:** solid and liquid particles touch; gas particles are far apart, so a gas has a much lower density.',
    '**Mass is conserved** when a substance melts, freezes, evaporates, condenses or sublimates: the same particles are rearranged.',
    'These are **physical changes**: reverse them and the material recovers its original properties.',
    '**Internal energy** = total kinetic + potential energy of the particles.',
  ],
  size: 11,
  worked: { head: 'Today: what is new', q: 'Now we zoom in on the gas state.',
    steps: [['Gas particles', 'how their motion causes pressure'], ['Temperature', 'linked to particle speed and kinetic energy'], ['Heating a gas', 'why its pressure rises; absolute zero'], ['HT', 'p × V = constant and work done on a gas']], size: 10.5 },
  qc: 'Heating a beaker of water at 100 °C does not raise its temperature. What happens to the internal energy, and where does it go?',
  notes: 'This slide RECAPS P6.1 (P6.1.1–P6.1.5 in that deck), which the OCR delivery guide places under P6.2. Do not re-teach: use it as a 3-minute reminder.\nQUICK CHECK ANSWER: The internal energy still increases; the energy increases the potential energy of the particles as they separate (the water boils / changes state), not their kinetic energy, so the temperature stays at 100 °C.',
}), 'P6.2.1–P6.2.3 Recap of P6.1');

// ======================= 6 GAS PRESSURE =======================
reg(D.contentSlide({
  title: 'How gas particles cause pressure',
  subtitle: `Specification ${sp('P6.2.4')} • particles hitting the walls of their container push on them`,
  tag: 'P6.2.4', caption: 'gas in a closed box; zoom on one collision with the right-hand wall',
  draw: (s, p) => {
    gasBox(s, 0.8, 1.7, 2.7, 2.7, { n: 10, seed: 21, gap: 0.55, speed: 0.3 });
    label(s, 0.8, 1.42, 2.7, 'gas in a closed container', { size: 10.5, bold: true });
    line(s, 3.5, 2.6, 4.25, 1.95, C.grey, 1, { dash: 'dash' }); line(s, 3.5, 3.2, 4.25, 4.1, C.grey, 1, { dash: 'dash' });
    // zoom: wall
    box(s, 4.25, 1.75, 2.05, 2.6, 'FAFBFE', C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    box(s, 5.6, 1.85, 0.18, 2.4, '8C96A8', '4A5262');
    label(s, 5.25, 4.4, 1.0, 'wall', { size: 10.5, bold: true });
    // particle path
    arrow(s, 4.45, 2.05, 5.38, 2.95, '6B7385', 1.5);
    ball(s, 5.48, 3.05, 0.1, PCOL.gas[0], PCOL.gas[1]);
    arrow(s, 5.38, 3.15, 4.45, 4.05, '6B7385', 1.5);
    label(s, 4.3, 1.8, 1.0, 'in', { size: 10, italic: true, align: 'left' });
    label(s, 4.3, 3.95, 1.0, 'out', { size: 10, italic: true, align: 'left' });
    // forces
    arrow(s, 5.78, 3.05, 6.25, 3.05, C.red, 3);
    label(s, 5.8, 2.55, 0.5, 'force on wall', { h: 0.44, size: 10, bold: true, color: C.red, valign: 'bottom', align: 'left' });
    arrow(s, 5.38, 3.05, 4.85, 3.05, C.blue, 3);
    label(s, 4.3, 2.75, 0.9, 'wall pushes particle', { h: 0.4, size: 10, bold: true, color: C.blue, align: 'left', valign: 'bottom' });
    box(s, 0.8, 4.7, 5.5, 1.05, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([
      ...T.rich('**Pressure** = the force on each square metre of surface, acting **at right angles** to it.', { color: C.text }).map((r, i, a) => { if (i === a.length - 1) r.options.breakLine = true; return r; }),
      ...T.rich('Unit: **pascal (Pa)**. 1 Pa = 1 N/m². Air pressure at sea level ≈ 100 kPa = 1.0 × 10^^5^^ Pa.', { color: C.text }),
    ], { x: 0.95, y: 4.75, w: 5.2, h: 0.95, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
  },
  head: 'The particle model of a gas',
  lines: [
    'Gas particles move **quickly** in **random directions**, in straight lines between collisions.',
    'When a particle hits a wall it **changes direction** (its momentum changes). The wall pushes on the particle, so the particle pushes on the wall.',
    'Billions of collisions every second add up to a **steady force** on every part of the wall.',
    'This force on each m² is the **gas pressure**. It acts **at right angles** to the walls.',
  ],
  worked: { head: 'Explain it in steps', q: 'Explain how a gas exerts a pressure on its container.',
    steps: [['Motion', 'particles move randomly and collide with the walls'], ['Collision', 'each collision exerts a force on the wall'], ['Many', 'lots of collisions give a total force over the area'], ['Answer', 'pressure = force ÷ area, at right angles to the wall']], size: 10.5 },
  qc: 'A balloon is blown up. Use the particle model to explain why it stays inflated and is round in every direction.',
  notes: 'QUICK CHECK ANSWER: Air particles inside collide with the inside of the rubber all the time, exerting a force (pressure) outwards, at right angles to the surface, in every direction. This balances the pull of the stretched rubber and the air pressure outside.\nThe idea that "the pressure produces a net force at right angles to any surface" follows the national content wording (UNVERIFIED as a separate J260 statement). p = F ÷ A is recalled from KS3; it is not needed as a calculation here.',
}), 'P6.2.4 Gas pressure');

// ======================= 7 TEMPERATURE AND PARTICLE MOTION =======================
reg(D.contentSlide({
  title: 'Temperature and particle motion',
  subtitle: `Specification ${sp('P6.2.4')} • the hotter the gas, the faster its particles move on average`,
  tag: 'P6.2.4', caption: 'the same gas at two temperatures: arrow length shows speed',
  draw: (s, p) => {
    const bw = 2.45, bh = 2.25, y = 1.85;
    label(s, 0.8, y - 0.38, bw, 'cold gas: 20 °C', { size: 11.5, bold: true, color: PCOL.cold[1] });
    gasBox(s, 0.8, y, bw, bh, { n: 8, seed: 31, gap: 0.62, speed: 0.15, col: PCOL.cold });
    label(s, 3.75, y - 0.38, bw, 'hot gas: 80 °C', { size: 11.5, bold: true, color: PCOL.hot[1] });
    gasBox(s, 3.75, y, bw, bh, { n: 8, seed: 31, gap: 0.62, speed: 0.38, col: PCOL.hot });
    arrow(s, 3.3, y + bh / 2, 3.7, y + bh / 2, C.red, 2.5);
    label(s, 3.18, y + bh / 2 - 0.36, 0.65, 'heat', { size: 10.5, bold: true, color: C.red });
    const rows = rowsFill([[HDR(''), HDR('Cold gas'), HDR('Hot gas')],
      ['Average speed', 'lower', 'higher'], ['Average kinetic energy', 'lower', 'higher'], ['Collisions with walls', 'fewer, gentler', 'more often, harder']]);
    s.addTable(rows, { x: 0.8, y: 4.4, w: 5.4, colW: [1.9, 1.75, 1.75], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'What temperature tells us',
  lines: [
    'The particles in a gas move at a **range of speeds**; some fast, some slow.',
    'The **temperature** of a gas is related to the **average kinetic energy** of its particles.',
    'Heating a gas makes its particles move **faster on average**: their average kinetic energy increases, so the temperature rises.',
    'Cooling a gas slows the particles down on average.',
  ],
  worked: { head: 'Worked example', q: 'Oxygen at 20 °C and oxygen at 80 °C. Compare the particles.',
    steps: [['Same gas', 'same particles, same mass of each particle'], ['Hotter', '80 °C gas has the higher average kinetic energy'], ['So', 'its particles move faster on average'], ['Answer', 'higher temperature → faster particles']], size: 10.5 },
  qc: 'A gas cools from 50 °C to 10 °C. What happens to the average speed of its particles? Does every particle slow down by the same amount?',
  notes: 'QUICK CHECK ANSWER: The average speed (and average kinetic energy) decreases. No: the particles have a range of speeds; it is the average that falls. Some particles may still be moving fast.\nStretch: the average kinetic energy is proportional to the temperature in kelvin (see the absolute zero slide).',
}), 'P6.2.4 Temperature and particle motion');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('P6.2.1')}–${sp('P6.2.4')} • the particle model and gas pressure`, [
  { q: 'Use the particle model to explain why steam has a much **lower density** than liquid water.', marks: 2, ms: 'Steam particles are far apart / water particles are touching (1); so the same mass of steam takes up a much larger volume, so mass ÷ volume is smaller (1).' },
  { q: 'Describe the **motion** of the particles in a gas.', marks: 2, ms: 'Random / in all directions (1); fast / in straight lines between collisions (1).' },
  { q: 'Explain how the particles of a gas exert a **pressure** on the walls of their container.', marks: 2, ms: 'Particles collide with / hit the walls (1); each collision exerts a force on the wall; force per unit area is pressure (1).' },
  { q: 'The temperature of a gas increases. What happens to the **average kinetic energy** of its particles?', marks: 1, ms: 'It increases (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 HEATING AT CONSTANT VOLUME =======================
reg(D.contentSlide({
  title: 'Heating a gas at constant volume',
  subtitle: `Specification ${sp('P6.2.4')} • in a sealed, rigid container, a hotter gas has a higher pressure`,
  tag: 'P6.2.4', caption: 'a sealed steel can: same particles, same volume; gauge range 0–300 kPa',
  draw: (s, p) => {
    const can = (x, col, speed, frac, read, temp) => {
      line(s, x + 0.9, 2.6, x + 0.9, 2.25, C.ink, 2.5);
      gauge(s, x + 0.9, 1.88, 0.36, frac, null);
      label(s, x + 1.3, 1.65, 1.0, read, { size: 10.5, bold: true, align: 'left', color: C.red });
      box(s, x, 2.6, 1.8, 2.1, 'F1F3F7', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 2.5 });
      gasBox(s, x + 0.08, 2.68, 1.64, 1.94, { box: false, n: 8, seed: 17, gap: 0.45, speed, col });
      label(s, x, 4.75, 1.8, temp, { size: 11.5, bold: true, color: col[1] });
    };
    can(0.85, PCOL.cold, 0.13, 100 / 300, '100 kPa', '20 °C');
    can(3.95, PCOL.hot, 0.3, 120 / 300, '120 kPa', '80 °C');
    arrow(s, 2.85, 3.65, 3.8, 3.65, C.red, 3);
    label(s, 2.7, 3.15, 1.25, 'heat', { size: 11, bold: true, color: C.red });
    box(s, 3.95, 5.08, 1.8, 0.22, C.red, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 3.95, 5.3, 1.8, 'hot plate', { size: 10, italic: true, color: C.grey, h: 0.22 });
    label(s, 0.7, 5.33, 3.0, 'volume fixed: the can cannot expand', { size: 10.5, italic: true, color: C.grey, align: 'left', h: 0.24 });
  },
  head: 'Why the pressure rises',
  lines: [
    'Heat the gas: its particles gain kinetic energy and move **faster** on average.',
    'They hit the walls **more often** (more collisions each second) …',
    '… and **harder** (a bigger force in each collision).',
    'So the total force on the walls increases: the **pressure increases**. The volume stays the same.',
    'Cooling the gas does the opposite: the pressure falls.',
  ],
  size: 11,
  worked: { head: 'Exam-style chain (3 marks)', q: 'Explain why the pressure in a sealed can rises when it is heated.',
    steps: [['Particles', 'gain kinetic energy / move faster'], ['Collisions', 'with the walls more often and with more force'], ['Force', 'greater force on the walls (per area)'], ['Answer', 'so the pressure increases']], size: 10.5 },
  qc: 'An aerosol can says "Do not heat or store above 50 °C." Use the particle model to explain the danger.',
  notes: `QUICK CHECK ANSWER: If the can is heated, the gas particles inside move faster, hitting the walls more often and harder, so the pressure rises. The volume cannot increase, so the pressure could become high enough to burst / explode the can.\nThe J260 statement is qualitative only (as on this slide). Gauge readings are drawn to scale for a fixed volume: 100 × 353 ÷ 293 = ${sf(canP2, 4)} kPa ≈ 120 kPa (node).`,
}), 'P6.2.4 Constant-volume heating');

// ======================= 10 ABSOLUTE ZERO AND KELVIN =======================
const GZ = { x: 1.35, y: 1.6, w: 4.9, h: 3.25, xmin: -300, xmax: 100, ymin: 0, ymax: 140, xstep: 50, ystep: 20, minor: 2, xlabel: 'temperature / °C', ylabel: 'pressure / kPa', fmt: v => String(Math.round(v)).replace('-', '−') };
reg(D.contentSlide({
  title: 'Absolute zero and the kelvin scale',
  subtitle: `Specification ${sp('P6.2.4')} • the coldest possible temperature is −273 °C, which is 0 K`,
  tag: 'P6.2.4', caption: 'to scale: flask data from the practical, extrapolated (dashed) to p = 0',
  draw: (s, p) => {
    axes(s, GZ);
    const k = kPT; // kPa per K, through absolute zero
    plotLine(s, GZ, [[-273, 0], [prTh[0], k * K(prTh[0])]], C.blue, 1.75, { dash: 'dash' });
    plotLine(s, GZ, [[prTh[0], k * K(prTh[0])], [100, k * K(100)]], C.blue, 2.25);
    points(s, GZ, prTh.map((t, i) => [t, prP[i]]));
    D.dot(s, px(GZ, -273), py(GZ, 0), C.red, 0.06);
    arrow(s, px(GZ, -215), py(GZ, 38), px(GZ, -268), py(GZ, 4), C.red, 1.5);
    label(s, px(GZ, -225), py(GZ, 58), 1.8, '−273 °C: p = 0\n**absolute zero**', { h: 0.45, size: 10.5, color: C.red, align: 'left', valign: 'top' });
    label(s, px(GZ, -150), py(GZ, 125), 2.6, 'measured points: 20–80 °C', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    // scale strip
    const sy = 5.48;
    label(s, 0.6, sy, 0.7, '°C', { size: 10.5, bold: true, color: C.blue, align: 'left', h: 0.2 });
    label(s, 0.6, sy + 0.22, 0.7, 'K', { size: 10.5, bold: true, color: C.red, align: 'left', h: 0.2 });
    [[-273, '−273', '0'], [0, '0', '273'], [20, '20', '293'], [100, '100', '373']].forEach(([v, a, b], i) => {
      const xx = px(GZ, v) + (i === 2 ? 0.12 : i === 1 ? -0.12 : 0);
      label(s, xx - 0.3, sy, 0.6, a, { size: 10.5, bold: true, color: C.blue, h: 0.2 });
      label(s, xx - 0.3, sy + 0.22, 0.6, b, { size: 10.5, bold: true, color: C.red, h: 0.2 });
    });
  },
  head: 'Absolute zero',
  lines: [
    'Cool a gas and its pressure falls. Extend the line: it reaches **p = 0 at −273 °C**.',
    'At **absolute zero** the particles have the **least possible kinetic energy** (they almost stop), so nothing can be colder.',
    `**Kelvin scale:** starts at absolute zero. **T (K) = θ (°C) + 273**  (${ST('KEL')}). A change of 1 K = a change of 1 °C.`,
    'In kelvin, gas **pressure ∝ temperature** at constant volume (a straight line through 0 K).',
  ],
  size: 11,
  worked: { head: 'Worked examples', q: '',
    steps: [['20 °C → K', `T = 20 + 273 = ${K(20)} K`], ['100 °C → K', `T = 100 + 273 = ${K(100)} K`], ['77 K → °C', `θ = 77 − 273 = −${-Cc(77)} °C (liquid nitrogen)`], ['Answer', 'add 273 to get kelvin; subtract 273 to get °C']], size: 10.5 },
  qc: 'Convert −40 °C into kelvin. Convert 300 K into °C. Can a temperature of −300 °C exist? Explain.',
  notes: `QUICK CHECK ANSWER: −40 + 273 = ${K(-40)} K; 300 − 273 = ${Cc(300)} °C. No: −300 °C is below absolute zero (−273 °C); the particles cannot have less than the minimum kinetic energy.\nGraph: the points are the flask data from the practical slide, plotted to scale; the solid line is the best fit through absolute zero (gradient ${kPT.toFixed(4)} kPa/K from a least-squares fit in node), dashed where extrapolated. Using only the first and last points the x-intercept is ${xInt.toFixed(0)} °C.\nGCSE uses 273 (not 273.15). Real gases condense before reaching absolute zero, so the line is extrapolated, not measured. Kelvin/absolute zero as a separate J260 statement is UNVERIFIED.`,
}), 'P6.2.4 Absolute zero and kelvin');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('P6.2.4')} • constant-volume heating, absolute zero and kelvin`, [
  { q: 'A sealed metal can of gas is heated. Explain, using the particle model, why the pressure of the gas increases.', marks: 3, ms: 'Particles gain (kinetic) energy / move faster (1); collide with the walls more often / more frequently and harder / with more force (1); so a greater force on the walls, so greater pressure (1).' },
  { q: 'Convert **37 °C** into kelvin. Convert **250 K** into °C.', marks: 2, ms: '37 + 273 = 310 K (1); 250 − 273 = −23 °C (1).' },
  { q: 'What is meant by **absolute zero**? Give its value in °C.', marks: 2, ms: 'The lowest possible temperature / where particles have minimum (zero) kinetic energy / the pressure of a gas would be zero (1); −273 °C (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 PRACTICAL METHOD =======================
reg(D.contentSlide({
  title: 'Practical: pressure and temperature of a gas',
  subtitle: `Specification ${sp('P6.2.4')} • a fixed volume of air in a flask, warmed in a water bath`,
  tag: 'Practical', pag: true, caption: 'flask of air in a water bath, joined by a short tube to a pressure gauge',
  draw: (s, p) => {
    const lc = D.liquidColumn(s, 0.85, 2.55, 2.75, 2.65, 0.84);
    // flask: bulb + neck
    s.addShape(SH.OVAL, { x: 1.55, y: 3.75, w: 1.2, h: 1.2, fill: { color: 'FBFCFE' }, line: { color: C.ink, width: 1.5 } });
    box(s, 2.03, 2.25, 0.24, 1.55, 'FBFCFE', null);
    line(s, 2.03, 2.25, 2.03, 3.82, C.ink, 1.5); line(s, 2.27, 2.25, 2.27, 3.82, C.ink, 1.5);
    gasBox(s, 1.75, 3.95, 0.8, 0.8, { box: false, n: 5, seed: 8, gap: 0.3, r: 0.05, speed: 0.1, margin: 0.06 });
    box(s, 1.98, 2.08, 0.34, 0.2, '8C6A3A', '5A4020');
    // tube to gauge
    line(s, 2.15, 2.08, 2.15, 1.72, '4A5262', 3); line(s, 2.15, 1.72, 4.7, 1.72, '4A5262', 3); line(s, 4.7, 1.72, 4.7, 1.95, '4A5262', 3);
    gauge(s, 4.7, 2.42, 0.45, 110 / 300, 'pressure gauge');
    // thermometer and stirrer
    thermometer(s, 3.15, 1.95, 3.0, 0.4);
    line(s, 1.15, 2.2, 1.15, 4.95, '6B7385', 2); line(s, 1.0, 4.95, 1.3, 4.95, '6B7385', 2);
    // heater
    box(s, 0.7, lc.bottom + 0.02, 3.05, 0.25, C.red, '8E2A33', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.7, lc.bottom + 0.02, 3.05, 'electric heater / hot plate', { h: 0.25, size: 10, bold: true, color: C.white });
    label(s, 3.75, 3.2, 1.3, 'thermometer', { size: 10.5, bold: true, align: 'left' }); arrow(s, 3.73, 3.34, 3.24, 3.5, C.grey, 1);
    label(s, 0.55, 1.95, 0.6, 'stirrer', { size: 10, bold: true, align: 'left' });
    label(s, 3.75, 3.85, 2.6, 'flask of air: **fixed volume** (fixed mass of gas)', { h: 0.5, size: 10.5, align: 'left', valign: 'top' });
    arrow(s, 3.75, 4.05, 2.8, 4.25, C.grey, 1);
    label(s, 3.75, 4.6, 2.6, 'water bath: keep the flask under water', { h: 0.45, size: 10.5, align: 'left', valign: 'top' });
    label(s, 2.4, 1.42, 2.0, 'short tube', { size: 10, italic: true, align: 'left', h: 0.24 });
  },
  head: 'Method',
  lines: [
    'Put a flask of air in a beaker of cold water, completely under the water. Connect it to a **pressure gauge** with a **short** tube.',
    'Record the water temperature (thermometer) and the pressure.',
    'Heat the water. Turn the heater off, **stir**, and **wait** a few minutes so the air reaches the water\'s temperature.',
    'Record θ and p every 15 °C up to about 80 °C. Convert θ to kelvin. Plot **p against T**.',
  ],
  size: 11,
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'temperature of the gas (°C, then K)'], ['Dependent', 'pressure of the gas (kPa)'], ['Control', 'volume and mass of gas: sealed flask, no leaks'], ['Safety', 'hot water: stand up, mop spills, eye protection; clamp the flask']], size: 10.5 },
  workedH: 2.05,
  qc: 'Why should the tube to the pressure gauge be as short as possible?',
  notes: 'QUICK CHECK ANSWER: The air in the tube is outside the water bath, so it is not at the measured temperature. A short tube keeps that volume of air small compared with the flask, so almost all the gas is at the water temperature.\nSUGGESTED practical, not a named OCR PAG for P6.2 (no PAG link found in the search extracts). It supports the qualitative P6.2.4 statement and the idea of absolute zero. Alternative: a sealed syringe in a water bath (volume vs temperature at constant pressure), which is not required.',
}), 'Practical: method');

// ======================= 13 PRACTICAL RESULTS =======================
const GT = { x: 1.35, y: 1.6, w: 4.9, h: 3.55, xmin: 0, xmax: 400, ymin: 0, ymax: 140, xstep: 50, ystep: 20, minor: 2, xlabel: 'temperature / K', ylabel: 'pressure / kPa', fmt: v => String(Math.round(v)) };
{
  const s = D.contentHeader('Practical: results and evaluation', `Specification ${sp('P6.2.4')} • sample results for a fixed volume of air`, { pag: true, tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'results plotted to scale on a kelvin axis: a straight line through 0 K');
  axes(s, GT);
  plotLine(s, GT, [[0, 0], [380, kPT * 380]], C.blue, 2);
  points(s, GT, prT.map((t, i) => [t, prP[i]]));
  D.dot(s, px(GT, 0), py(GT, 0), C.red, 0.06);
  label(s, px(GT, 75), py(GT, 0) - 0.3, 1.8, '0 K: p = 0', { size: 10.5, bold: true, color: C.red, align: 'left' });
  label(s, px(GT, 25), py(GT, 128), 2.6, `gradient = ${sf(kPT, 2)} kPa/K: p ∝ T`, { size: 10.5, bold: true, color: C.blue, align: 'left' });
  const hd = [HDR('θ / °C'), ...prTh.map(t => HDR(String(t)))];
  const r2 = [{ text: 'T / K', options: { bold: true, fill: { color: C.cardBlue } } }, ...prT.map(v => ({ text: String(v), options: { fill: { color: C.cardBlue } } }))];
  const r3 = [{ text: 'p / kPa', options: { bold: true, fill: { color: C.white } } }, ...prP.map(v => ({ text: v.toFixed(1), options: { fill: { color: C.white } } }))];
  s.addTable([hd, r2, r3], { x: 6.8, y: 1.3, w: 6.08, colW: [1.08, 1.0, 1.0, 1.0, 1.0, 1.0], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 2.36, 6.08, 1.72, 'What the results show', [
    'As the temperature rises, the pressure rises (the qualitative result you must explain).',
    'On a **kelvin** axis the best-fit line is straight and passes through **0 K**: pressure is proportional to the kelvin temperature.',
    `Check: p ÷ T = 100.0 ÷ 293 = ${sf(prP[0] / prT[0], 3)} and 120.3 ÷ 353 = ${sf(prP[4] / prT[4], 3)} kPa/K: the same.`,
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.2, 6.08, 2.05, 'Sources of error and improvements', '', [
    ['Tube', 'air in the tube is cooler than the bath → use a short, narrow tube'],
    ['Waiting', 'flask air lags behind the water → stir, wait, then read'],
    ['Leaks', 'pressure falls as gas escapes → check seals; repeat readings'],
    ['Answer', 'repeat the run while cooling and average the two sets']], { size: 10.5 });
  D.quickCheck(s, 'Stretch: use p ∝ T (kelvin) to predict the pressure of this air at 100 °C.');
  D.notes(s, `QUICK CHECK ANSWER (stretch): T = 373 K; p = 100 × 373 ÷ 293 = ${sf(pred100, 3)} kPa.\nThe J260 statement is qualitative; the proportional calculation is stretch only.\nCalculations (node): T = θ + 273; least-squares gradient through the origin ${kPT.toFixed(4)} kPa/K; each point within 0.5% of 100 × T ÷ 293.`);
  reg(s, 'Practical: results');
}

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('P6.2.4')} • the pressure–temperature practical`, [
  { q: 'In the flask-and-water-bath experiment, name the **independent** variable, the **dependent** variable and **one control** variable.', marks: 3, ms: 'Independent: temperature (1); dependent: pressure (1); control: volume of gas / mass (amount) of gas (1).' },
  { q: 'Why must the student stir the water and wait before taking each pressure reading?', marks: 1, ms: 'So the air in the flask reaches the same temperature as the water (thermometer) (1).' },
  { q: 'Pressure is plotted against temperature **in kelvin**. Describe the shape of the graph and what it shows.', marks: 2, ms: 'Straight line through the origin (0 K) (1); pressure is (directly) proportional to (kelvin) temperature (1).' },
  { q: 'Give **one** safety precaution for this experiment.', marks: 1, ms: 'Any one (1): stand up / mop spills of hot water / eye protection / clamp the flask / do not touch the hot plate.' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 pV = CONSTANT (HT) =======================
reg(D.contentSlide({
  title: 'Pressure and volume: p × V = constant',
  subtitle: `Specification ${sp('P6.2.5')} • squash a fixed mass of gas at constant temperature and its pressure rises`,
  tag: 'P6.2.5', ht: true, caption: 'sealed syringe and gauge (0–300 kPa); same 8 particles, half the volume',
  draw: (s, p) => {
    eqBadge(s, 0.8, 1.45, 5.4, 'PV');
    syringe(s, 1.65, 2.75, 2.7, { frac: 100 / 300, seed: 41 });
    label(s, 0.6, 3.15, 5.7, 'V = 60 cm³   p = 100 kPa   p × V = 6000 kPa cm³', { size: 10.5, bold: true, h: 0.26 });
    syringe(s, 1.65, 4.35, 1.35, { frac: 200 / 300, seed: 43, gap: 0.2 });
    label(s, 0.6, 4.75, 5.7, 'V = 30 cm³   p = 200 kPa   p × V = 6000 kPa cm³', { size: 10.5, bold: true, h: 0.26 });
    arrow(s, 5.55, 3.55, 4.8, 3.55, C.red, 2.5);
    label(s, 4.6, 3.6, 1.6, 'push in slowly', { size: 10.5, bold: true, color: C.red, h: 0.24 });
    label(s, 0.6, 5.15, 5.7, 'halve the volume → the pressure doubles', { size: 11, bold: true, color: C.blue, h: 0.26 });
  },
  head: 'Boyle\'s law',
  lines: [
    'For a **fixed mass** of gas at **constant temperature**: **p × V = constant** (' + ST('PV') + ').',
    'So **p₁ × V₁ = p₂ × V₂**: if the volume halves, the pressure doubles.',
    '**Particles:** in a smaller volume the same particles hit the walls **more often** (same speed), so the pressure is bigger.',
    'Any units work if both sides match (Pa and m³, or kPa and cm³).',
  ],
  size: 11,
  worked: { head: 'Worked example', q: 'A pump holds 150 cm³ of air at 100 kPa. It is squashed slowly to 60 cm³. Calculate the new pressure.',
    steps: [['Equation', 'p₁ × V₁ = p₂ × V₂'], ['Rearrange', 'p₂ = p₁ × V₁ ÷ V₂'], ['Substitute', 'p₂ = 100 × 150 ÷ 60'], ['Answer', `p₂ = ${pumpP2} kPa`]], size: 10.5 },
  qc: 'HT: 2.0 m³ of gas at 1.0 × 10^^5^^ Pa expands to 5.0 m³ at constant temperature. Calculate the new pressure.',
  notes: 'QUICK CHECK ANSWER: p₂ = p₁V₁ ÷ V₂ = 1.0 × 10⁵ × 2.0 ÷ 5.0 = 4.0 × 10⁴ Pa (40 kPa).\nHT (Higher tier only): p × V = constant is on the OCR Physics B / Combined Science B equation sheet ("for a given mass of gas at a constant temperature: pressure × volume = constant"). Its HT status in J260 follows the national content (UNVERIFIED).\nWhy "slowly"? Fast compression does work on the gas and warms it (next slides), so the temperature would not be constant.',
}), 'P6.2.5 (HT) p × V = constant');

// ======================= 16 pV GRAPHS (HT) =======================
const G1 = { x: 1.25, y: 1.85, w: 2.05, h: 3.2, xmin: 0, xmax: 60, ymin: 0, ymax: 350, xstep: 20, ystep: 50, minor: 2, xlabel: 'V / cm³', ylabel: 'p / kPa', fmt: v => String(Math.round(v)) };
const G2 = { x: 4.2, y: 1.85, w: 2.05, h: 3.2, xmin: 0, xmax: 0.06, ymin: 0, ymax: 350, xstep: 0.02, ystep: 50, minor: 2, xlabel: '1/V / cm⁻³', ylabel: 'p / kPa', fmt: v => v.toFixed(2), yfmt: v => String(Math.round(v)) };
{
  const s = D.contentHeader('p–V graphs: a curve and a straight line', `Specification ${sp('P6.2.5')} • sample syringe results, fixed mass of air at room temperature`, { ht: true, tag: 'P6.2.5' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'both graphs drawn to scale from the table; best-fit p = 6000 ÷ V');
  label(s, 0.6, 1.4, 2.9, 'p against V: a curve', { size: 11, bold: true, color: C.blue });
  label(s, 3.55, 1.4, 2.9, 'p against 1/V: straight line', { size: 11, bold: true, color: C.blue });
  axes(s, G1); axes(s, G2);
  fnLine(s, G1, v => bMean / v, bMean / 350, 60, 60, C.blue, 2);
  points(s, G1, bV.map((v, i) => [v, bP[i]]));
  plotLine(s, G2, [[0, 0], [0.058, kInv * 0.058]], C.blue, 2);
  points(s, G2, bInv.map((x, i) => [x, bP[i]]));
  label(s, 0.6, 5.48, 2.9, 'p halves when V doubles', { size: 10.5, italic: true, color: C.grey });
  label(s, 3.55, 5.48, 2.9, 'through the origin: p ∝ 1/V', { size: 10.5, italic: true, color: C.grey });
  const hd = [HDR('V / cm³'), ...bV.map(v => HDR(String(v)))];
  const mk = (t, arr, f, fill) => [{ text: t, options: { bold: true, fill: { color: fill } } }, ...arr.map(v => ({ text: f(v), options: { fill: { color: fill } } }))];
  s.addTable([hd, mk('p / kPa', bP, String, C.cardBlue), mk('p × V', bPV, String, C.white), mk('1/V / cm⁻³', bInv, v => v.toFixed(4), C.cardBlue)],
    { x: 6.8, y: 1.3, w: 6.08, colW: [1.28, 0.96, 0.96, 0.96, 0.96, 0.96], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 2.66, 6.08, 1.55, 'What the results show', [
    'p × V is about **6000** every time (within 1%): p × V = constant.',
    'p against V is a **curve** (inverse proportion), not a straight line.',
    'p against 1/V is a **straight line through the origin**: p ∝ 1/V. Gradient = p × V ≈ 6000 kPa cm³.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.33, 6.08, 1.92, 'Worked example: predict from the data', 'What pressure would the gas have at 25 cm³?', [
    ['Equation', 'p × V = constant = 6000 kPa cm³'],
    ['Rearrange', 'p = 6000 ÷ V'],
    ['Substitute', 'p = 6000 ÷ 25'],
    ['Answer', 'p = 240 kPa']], { size: 10.5 });
  D.quickCheck(s, 'HT: why do scientists plot p against 1/V rather than p against V to test Boyle\'s law?');
  D.notes(s, `QUICK CHECK ANSWER: A straight line through the origin is easy to recognise and test (it shows direct proportion); a curve could be several different relationships.\nData (node): pV = ${bPV.join(', ')}; mean ${bMean}. Least-squares gradient of p vs 1/V through the origin = ${kInv.toFixed(0)} kPa cm³. Points within 2% of 6000 ÷ V.\nMethod (if done as a demonstration): sealed syringe connected to a pressure gauge; push the plunger in slowly in steps, wait for the temperature to settle, record V (syringe scale) and p (gauge).`);
  reg(s, 'P6.2.5 (HT) p–V graphs');
}

// ======================= 17 RECAP 4 (HT) =======================
const R4 = D.recapSlide(4, `Specification ${sp('P6.2.5')} • p × V = constant (Higher tier)`, [
  { q: 'State **two** conditions needed for p × V = constant to apply to a gas.', marks: 2, ms: 'Fixed mass / amount of gas (1); constant temperature (1).', ht: true },
  { q: '**300 cm³** of gas at **100 kPa** is compressed slowly to **75 cm³** at constant temperature. Calculate the new pressure.', marks: 3, ms: 'p₁V₁ = p₂V₂ (1); p₂ = 100 × 300 ÷ 75 (1); = 400 kPa (1).', ht: true },
  { q: 'Use the particle model to explain why reducing the volume of a gas at constant temperature increases its pressure.', marks: 2, ms: 'Particles are closer together / more particles per unit volume / less distance to travel (1); so they hit the walls more often (more collisions per second), so greater force per area (1). (Speed unchanged because temperature constant.)', ht: true },
  { q: 'Describe the shapes of the graphs of **p against V** and **p against 1/V** for a gas at constant temperature.', marks: 2, ms: 'p against V: a curve, p decreasing as V increases (inverse proportion) (1); p against 1/V: a straight line through the origin (1).', ht: true },
], { ht: true });
reg(R4.s, 'Recap 4 (HT)');

// ======================= 18 WORK DONE ON A GAS (HT) =======================
reg(D.contentSlide({
  title: 'Doing work on a gas raises its temperature',
  subtitle: `Specification ${sp('P6.2.6')} • a bicycle pump gets warm when you pump quickly`,
  tag: 'P6.2.6', ht: true, caption: 'bicycle pump: the piston pushes the air into a smaller volume',
  draw: (s, p) => {
    const y1 = 2.15, y2 = 3.15;
    box(s, 2.6, y1, 2.7, y2 - y1, 'FFE8DF', null);
    line(s, 1.1, y1, 5.3, y1, C.ink, 2); line(s, 1.1, y2, 5.3, y2, C.ink, 2);
    line(s, 5.3, y1, 5.3, 2.58, C.ink, 2); line(s, 5.3, 2.72, 5.3, y2, C.ink, 2);
    box(s, 5.3, 2.58, 0.75, 0.14, 'D5DCEB', C.ink, { lw: 1 });
    label(s, 5.2, 2.25, 1.2, 'to tyre', { size: 10, italic: true, h: 0.22 });
    gasBox(s, 2.62, y1, 2.66, y2 - y1, { box: false, n: 7, seed: 53, gap: 0.42, r: 0.07, speed: 0.2, col: PCOL.hot, margin: 0.1 });
    box(s, 2.45, y1 + 0.03, 0.15, y2 - y1 - 0.06, '8C96A8', '4A5262', { lw: 1 });
    box(s, 0.95, 2.6, 1.5, 0.1, 'B7BECC', '6B7385', { lw: 0.75 });
    box(s, 0.75, 2.2, 0.2, 0.9, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
    arrow(s, 1.05, 1.92, 2.3, 1.92, C.red, 3);
    label(s, 0.75, 1.42, 4.0, 'push the piston in: force × distance = work done on the gas', { size: 10.5, bold: true, color: C.red, align: 'left' });
    // zoom on bounce off moving piston
    box(s, 0.75, 3.45, 5.5, 1.1, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    box(s, 1.6, 3.55, 0.15, 0.9, '8C96A8', '4A5262', { lw: 1 });
    arrow(s, 1.82, 4.0, 2.25, 4.0, C.red, 2);
    label(s, 0.85, 3.6, 0.75, 'piston moving →', { h: 0.8, size: 10, bold: true, color: C.red, valign: 'middle' });
    arrow(s, 3.2, 3.75, 2.0, 3.95, '6B7385', 1.5);
    ball(s, 1.92, 4.0, 0.08, PCOL.hot[0], PCOL.hot[1]);
    arrow(s, 2.0, 4.08, 4.0, 4.38, PCOL.hot[1], 2.5);
    label(s, 3.3, 3.55, 2.9, 'slow in …', { size: 10, italic: true, align: 'left', h: 0.22 });
    label(s, 4.05, 4.16, 2.15, '… faster out: more kinetic energy', { h: 0.36, size: 10, bold: true, color: PCOL.hot[1], align: 'left' });
    chain(s, 0.75, 4.8, 5.5, 0.7, ['work done on the gas', 'internal energy of gas ↑', 'temperature ↑'], C.red);
  },
  head: 'Why the air gets hotter',
  lines: [
    'Pushing the piston in transfers energy to the gas: **work is done on the gas**.',
    'Particles bounce off the **moving** piston **faster** than they hit it, so their kinetic energy increases.',
    'The **internal energy** of the gas increases, so its **temperature rises**.',
    'If you pump **slowly**, the energy has time to leave through the walls, so the temperature stays about the same (then p × V = constant applies).',
  ],
  size: 11,
  worked: { head: 'Explain it in steps', q: 'Why does the end of a bicycle pump get hot after fast pumping?',
    steps: [['Work', 'a force moves the piston: work is done on the air'], ['Energy', 'energy is transferred to the air particles'], ['Particles', 'they move faster: internal energy increases'], ['Answer', 'the air temperature rises and warms the pump']], size: 10.5 },
  qc: 'HT: when air is released quickly from a tyre valve, the air coming out feels cold. Suggest why, using the idea of work.',
  notes: 'QUICK CHECK ANSWER: The escaping air expands and does work pushing back the surrounding air, so energy is transferred out of it: its internal energy falls and so does its temperature. (Accept: the opposite of doing work on a gas.)\nHT (Higher tier only) following the national content statement "explain how, in a given situation, doing work on a gas can increase its temperature". Its J260 status (combined vs J259 only) is UNVERIFIED.',
}), 'P6.2.6 (HT) Work done on a gas');

// ======================= 19 LIMITATIONS OF THE MODEL =======================
reg(D.contentSlide({
  title: 'Limitations of the particle model',
  subtitle: `Ideas about science: models • a useful model, but not a perfect picture of a gas`,
  tag: 'IaS', caption: 'left: the usual drawing; right: size and spacing closer to scale for air',
  draw: (s, p) => {
    const bw = 2.5, bh = 2.3, y = 1.85;
    label(s, 0.75, y - 0.38, bw, 'the model we draw', { size: 11.5, bold: true, color: C.blue });
    gasBox(s, 0.75, y, bw, bh, { n: 9, seed: 61, gap: 0.6, speed: 0.25, r: 0.1 });
    label(s, 3.75, y - 0.38, bw, 'closer to scale', { size: 11.5, bold: true, color: C.blue });
    box(s, 3.75, y, bw, bh, C.white, C.ink, { lw: 1.5 });
    const R = rng(77);
    for (let i = 0; i < 6; i++) for (let j = 0; j < 5; j++) ball(s, 3.75 + 0.22 + i * 0.41 + (R() - 0.5) * 0.12, y + 0.25 + j * 0.45 + (R() - 0.5) * 0.12, 0.02, PCOL.gas[0], PCOL.gas[1]);
    label(s, 3.75, y + bh + 0.04, bw, 'spacing ≈ 10 × particle diameter', { size: 10.5, bold: true });
    label(s, 0.75, y + bh + 0.04, bw, 'particles drawn far too big', { size: 10.5, bold: true });
    const rows = rowsFill([[HDR('The model shows…'), HDR('In reality…')],
      ['hard, solid spheres', 'atoms and molecules have shapes; not solid balls'],
      ['no forces between particles', 'weak attractions: gases can condense'],
      ['particles big and close', 'tiny particles, mostly empty space'],
      ['a frozen moment', 'constant motion and collisions']]);
    s.addTable(rows, { x: 0.75, y: 4.55, w: 5.5, colW: [2.0, 3.5], rowH: 0.24, fontFace: 'Calibri', fontSize: 10, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'What the model leaves out',
  lines: [
    'Particle diagrams are **not to scale**: in air the gaps between particles are about **10 particle diameters**.',
    'The model treats particles as **tiny hard spheres** with **no forces** between them except in collisions.',
    'It predicts p = 0 at absolute zero, but real gases **condense** into liquids before that.',
    'Still useful: it **explains and predicts** pressure, temperature and volume changes.',
  ],
  size: 11,
  worked: { head: 'Evaluate the model', q: 'A student says "the particle model is wrong, so it is useless."',
    steps: [['Strength', 'explains why heating raises gas pressure'], ['Strength', 'predicts p ∝ 1/V and absolute zero'], ['Limitation', 'not to scale; ignores forces and shapes'], ['Answer', 'all models are simplified, but this one is useful']], size: 10.5 },
  qc: 'Give one way the particle model of a gas is useful and one way it does not match real gases.',
  notes: `QUICK CHECK ANSWER: Useful: e.g. explains gas pressure / why pressure rises with temperature / predicts absolute zero. Limitation: e.g. particles are not hard spheres; forces between particles are ignored; diagrams not to scale; real gases condense at low temperature.\nScale (node): for air at 0 °C and 101 kPa, n = p ÷ kT = ${nAir.toExponential(2)} per m³, mean spacing = n^(−1/3) = ${spacing.toExponential(2)} m, about ${spRatio.toFixed(0)} × a 3 × 10⁻¹⁰ m molecule. The right-hand box uses about 10 diameters.\n"Limitations of the particle model" is drawn from the J260 ideas about science (models); the exact statement is UNVERIFIED.`,
}), 'IaS Limitations of the model');

// ======================= 20 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('P6.2.6')} and models • work done on a gas; limitations of the particle model`, [
  { q: 'A bicycle pump is pushed in quickly and the air inside gets hotter. Explain why.', marks: 3, ms: 'Work is done on the gas / energy is transferred to the gas by the force on the piston (1); the internal energy / kinetic energy of the particles increases (particles bounce off the moving piston faster) (1); so the temperature increases (1).', ht: true },
  { q: 'Why does the temperature of the air hardly change if the pump is pushed in **very slowly**?', marks: 2, ms: 'Energy is transferred to the surroundings / through the walls (1); at the same rate as work is done, so the internal energy (temperature) stays about constant (1).', ht: true },
  { q: 'Give **two** limitations of the particle model of a gas.', marks: 2, ms: 'Any two (1 each): particles shown as hard spheres; forces between particles ignored; diagrams not to scale / particles much smaller and further apart; real gases condense before absolute zero.' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Particle model', 'Matter is tiny particles; their arrangement and motion explain the states.'],
  ['Internal energy', 'Total kinetic and potential energy of the particles (recap P6.1).'],
  ['Random motion', 'Gas particles move in all directions at a range of speeds.'],
  ['Collision', 'A particle hitting a wall changes direction and exerts a force.'],
  ['Gas pressure', 'Force of particle collisions per unit area, at right angles to the surface.'],
  ['Pascal (Pa)', 'Unit of pressure: 1 Pa = 1 N/m². Air ≈ 100 kPa.'],
  ['Temperature', 'Related to the average kinetic energy of the particles.'],
  ['Constant volume', 'Sealed, rigid container: heating raises the pressure.'],
  ['Absolute zero', '−273 °C (0 K): particles have the least possible kinetic energy.'],
  ['Kelvin (K)', 'Temperature scale from absolute zero: T = θ + 273.'],
  ['Extrapolate', 'Extend a graph line beyond the measured data.'],
  ['Fixed mass', 'The amount of gas stays the same: none added or lost.'],
  ['p × V = constant', 'HT: fixed mass at constant temperature (Boyle\'s law).'],
  ['Inverse proportion', 'HT: double V, halve p; p–V is a curve, p–1/V a line.'],
  ['Work done on a gas', 'HT: energy transferred by a force; raises internal energy.'],
  ['Model limitation', 'Particles not hard spheres; not to scale; forces ignored.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. The three HT terms are Higher tier only.' }), 'Summary: key words');

// ======================= EQUATIONS SUMMARY =======================
const EQS_SLIDE = (D.equationsSlide([['KEL', 'P6.2.4'], ['PV', 'P6.2.5 (HT)'], ['RHO', 'P6.2.1']], {
  subtitle: 'Recall or given? Check against the J260 equation sheet',
  qc: 'HT: a gas at 120 kPa is squashed to one third of its volume at constant temperature. What is its new pressure? Which equation did you use, and is it given?',
  notes: 'QUICK CHECK ANSWER: 360 kPa (p × V = constant: V ÷ 3 so p × 3). p × V = constant is GIVEN on the equation sheet (Higher tier).\nT = θ + 273 is a conversion students must recall (not on the sheet). ρ = m ÷ V is a recall equation from P6.1. ΔE = mcΔθ and E = mL (P6.1, given) are not needed here.\nStatus follows the OCR Physics B equation sheet extract ("for a given mass of gas at a constant temperature: pressure × volume = constant") and a third-party list labelled "OCR Combined Science B Equation Sheet". UNVERIFIED against the current J260 sheet: check before printing.',
}));
{
  // graph-shape summary cards (sketches, not to scale) under the equations table
  const s = EQS_SLIDE;
  const cards = [
    ['p against T (kelvin), constant V', 'straight line through 0 K', 'line', false],
    ['p against V, constant T', 'curve: p halves when V doubles', 'curve', true],
    ['p against 1/V, constant T', 'straight line through the origin', 'line', true],
  ];
  const cw = (12.43 - 0.3) / 3;
  cards.forEach(([t, d, kind, ht], i) => {
    const x = 0.45 + i * (cw + 0.15), y = 4.05, h = 2.15;
    box(s, x, y, cw, h, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, x + 0.15, y + 0.08, cw - 0.8, t, { size: 12, bold: true, color: C.ink, align: 'left', h: 0.3 });
    if (ht) D.pill(s, x + cw - 0.6, y + 0.08, 'HT', C.red, 0.45);
    const ax = x + 0.45, ay = y + 0.5, aw = 1.6, ah = 1.35;
    line(s, ax, ay + ah, ax + aw, ay + ah, C.ink, 1.5); line(s, ax, ay + ah, ax, ay, C.ink, 1.5);
    label(s, ax - 0.35, ay - 0.02, 0.3, 'p', { size: 11, bold: true, h: 0.22 });
    label(s, ax + aw - 0.4, ay + ah + 0.03, 0.8, ['T / K', 'V', '1/V'][i], { size: 11, bold: true, h: 0.22 });
    if (kind === 'line') line(s, ax, ay + ah, ax + aw * 0.95, ay + 0.1, C.blue, 2.25);
    else { const pts = []; for (let k = 0; k <= 30; k++) { const v = 0.25 + k * 0.75 / 30; pts.push([ax + v * aw, ay + ah - (0.25 / v) * ah * 0.95]); } for (let k = 0; k < 30; k++) line(s, pts[k][0], pts[k][1], pts[k + 1][0], pts[k + 1][1], C.blue, 2.25); }
    label(s, ax + aw + 0.2, ay + 0.3, cw - aw - 0.85, d, { h: 0.8, size: 11.5, bold: true, color: C.blue, align: 'left', valign: 'middle' });
  });
  label(s, 0.45, 6.2, 6, 'sketches: shapes only (the scaled versions are on slides 10, 13 and 16)', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.18 });
  reg(s, 'Summary: equations');
}
calc('EQ QC 120 × 3', 120 * 3, 360);

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A car tyre contains air. Before a journey the air in the tyre is at **27 °C**. During the journey the air warms up. Assume the volume of the tyre does not change.', [
  { l: 'a', q: 'Describe the motion of the air particles in the tyre and explain how they exert a pressure on the inside of the tyre.', marks: 3, ms: 'Particles move randomly / in all directions / fast (1); they collide with the walls (inside of the tyre) (1); each collision exerts a force; force per unit area = pressure (1).', h: 1.3 },
  { l: 'b', q: 'Convert **27 °C** into kelvin.', marks: 1, ms: '27 + 273 = 300 K (1).', h: 0.7 },
  { l: 'c', q: 'Explain why the pressure of the air in the tyre increases during the journey.', marks: 3, ms: 'Temperature rises so particles gain kinetic energy / move faster (1); collide with the walls more often / more frequently and with more force (1); so greater force on the walls, so greater pressure (volume constant) (1).', h: 1.3 },
  { l: 'd', q: 'A pump cylinder holds **80 cm³** of air at **100 kPa**. The air is pushed slowly into a volume of **32 cm³** at constant temperature. Calculate its new pressure.', marks: 3, ms: 'p₁V₁ = p₂V₂ / p × V = constant (1); p₂ = 100 × 80 ÷ 32 (1); = 250 kPa (1).', ht: true, h: 1.2 },
  { l: 'e', q: 'When the pump is pushed in **quickly**, the air in it gets hotter. Explain why.', marks: 2, ms: 'Work is done on the air / energy is transferred to the air (1); so its internal energy (kinetic energy of particles) increases, so temperature rises (1).', ht: true, h: 0.95 },
  { l: 'f', q: 'Give **one** limitation of the particle model used in this question.', marks: 1, ms: 'Any one (1): particles are not hard spheres; forces between particles ignored; not to scale; real gases condense at low temperatures.', h: 0.75 },
], 13, { subtitle: `Specification ${sp('P6.2.4')}–${sp('P6.2.6')} • (d) and (e) are Higher tier • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
const HW = [
  { n: '1', q: 'What causes the pressure of a gas on the walls of its container?', marks: 1, ms: 'Particles colliding with / hitting the walls (1).' },
  { n: '2', q: 'Convert **−23 °C** into kelvin. Convert **400 K** into °C.', marks: 2, ms: '−23 + 273 = 250 K (1); 400 − 273 = 127 °C (1).' },
  { n: '3', q: 'A sealed bottle of air is put in a fridge. Explain why the air pressure inside falls.', marks: 2, ms: 'Particles lose kinetic energy / move slower (1); hit the walls less often and with less force, so the pressure falls (1).' },
  { n: '4', q: 'What is **absolute zero**? Explain why there cannot be a lower temperature.', marks: 2, ms: '−273 °C / 0 K (1); particles have the least possible (zero) kinetic energy, so cannot slow down more / pressure would be zero (1).' },
  { n: '5', q: 'A gas at **2.0 × 10**^^5^^ **Pa** occupies **0.030 m³**. It expands at constant temperature to **0.12 m³**. Calculate the new pressure.', marks: 2, ht: true, ms: 'p₂ = 2.0 × 10⁵ × 0.030 ÷ 0.12 (1); = 5.0 × 10⁴ Pa (1).' },
  { n: '6', q: 'Sketch the graph of **p against 1/V** for a fixed mass of gas at constant temperature and say what it shows.', marks: 2, ht: true, ms: 'Straight line through the origin (1); p is (directly) proportional to 1/V / p is inversely proportional to V / p × V = constant (1).' },
  { n: '7', q: 'Describe how a student could investigate how the **pressure** of a fixed volume of air depends on its **temperature**. Explain the results using the particle model.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Apparatus: flask (sealed) of air connected by a short tube to a pressure gauge; water bath / beaker of water; heater; thermometer; stirrer.',
    'Flask fully under the water; volume (and mass) of gas fixed.',
    'Record temperature and pressure; heat the water; stir and wait for the air to reach the water temperature; record readings at intervals (e.g. every 10–15 °C).',
    'Convert temperatures to kelvin; plot pressure against temperature.',
    'Results: pressure increases as temperature increases; straight line; through 0 K / extrapolates to −273 °C.',
    'Particles gain kinetic energy / move faster as temperature rises.',
    'Hit the walls more often and harder, so a greater force per area, so a greater pressure.',
    'Safety: hot water / eye protection / clamp the flask; reliability: repeat while cooling, short tube, check for leaks.',
  ], {
    l3: 'Describes a clear method with the measurements AND the expected result AND a full particle explanation (faster particles, more frequent/harder collisions, greater force).',
    l2: 'Describes a method with most measurements AND EITHER the expected result OR a partial particle explanation.',
    l1: 'Gives a simple description of heating the air and measuring pressure OR a simple statement that pressure increases because particles move faster.',
  });
}
D.homework('All students answer all questions. Q5 and Q6 are Higher tier (HT).', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 9); assert.strictEqual(R5.total, 7);
const out = path.join(__dirname, 'OCR21C_P6.2_ParticleModelHeating_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
