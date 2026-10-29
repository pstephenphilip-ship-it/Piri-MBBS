// build_P6_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter P6 Matter – models and explanations, P6.1 How does energy transform matter? (one deck, Higher & Foundation)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_P6_1.js
// Structure copied from build_P5_1.js. ocr_template.js is NOT edited: deck-only helpers are in the DECK-SPECIFIC block.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'P6', chapterTitle: 'Matter – models and explanations', code: 'P6.1', title: 'How does energy transform matter?',
  part: 1, parts: 3, specRange: 'P6.1.1–P6.1.8',
  subtitle: 'Changes of state, density, internal energy, specific heat capacity and specific latent heat',
  keywords: ['Particle model', 'Density', 'Change of state', 'Internal energy', 'Specific heat capacity', 'Specific latent heat'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, px, py, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= EQUATIONS (J260 equation list) =======================
// density = mass / volume is a RECALL equation; ΔE = mcΔθ and E = mL are on the equation sheet (GIVEN);
// power = energy / time and power = p.d. × current are RECALL equations (used in PAG P5).
T.addEq('RHO', { eq: 'ρ = m ÷ V', words: 'density (kg/m³) = mass (kg) ÷ volume (m³)', status: 'recall' });
T.addEq('SHC', { eq: 'ΔE = m × c × Δθ', words: 'change in internal energy (J) = mass (kg) × specific heat capacity (J/kg °C) × change in temperature (°C)', status: 'given' });
T.addEq('SLH', { eq: 'E = m × L', words: 'energy to cause a change of state (J) = mass (kg) × specific latent heat (J/kg)', status: 'given' });
T.addEq('PET', { eq: 'P = E ÷ t', words: 'power (W) = energy transferred (J) ÷ time (s)', status: 'recall' });
T.addEq('PVI', { eq: 'P = V × I', words: 'power (W) = potential difference (V) × current (A)', status: 'recall' });
const ST = k => T.EQS[k].status === 'recall' ? '!!RECALL!!' : '**GIVEN** on the equation sheet';

// ======================= CALCULATIONS (asserted) =======================
const close = (a, b, rel = 0.01) => Math.abs(a - b) <= rel * Math.abs(b);
// starter
calc('starter 2000 W × 60 s', 2000 * 60, 120000);
calc('starter 500 cm³ in m³', 500 / 1e6, 5.0e-4, 1e-15);
calc('starter 250 g in kg', 250 / 1000, 0.25);
// slide 5–6: mass conservation
const iceBag = 250; calc('ice bag mass after melting (g)', iceBag, 250);
// slide 8: density worked example
const blkV = calc('block V = 5.0 × 4.0 × 2.0 cm³', 5.0 * 4.0 * 2.0, 40);
const blkRho = calc('block ρ = 108 / 40 g/cm³', 108 / blkV, 2.7, 1e-12);
calc('block ρ in kg/m³', blkRho * 1000, 2700, 1e-9);
calc('QC oil ρ = 460/500 g/cm³', 460 / 500, 0.92, 1e-12);
calc('QC oil in kg/m³', 460 / 500 * 1000, 920, 1e-9);
// slide 9: states and density, mass conserved
const rhoIce = 920, rhoWater = 1000, rhoSteam = 0.60;
const vIce = calc('V of 1.0 kg ice = 1/920', 1.0 / rhoIce, 1.0869565217391304e-3, 1e-15);
const vWater = calc('V of 1.0 kg water', 1.0 / rhoWater, 1.0e-3, 1e-15);
calc('ice volume 3 s.f.', sf(vIce, 3), 1.09e-3, 1e-15);
const vSteam = calc('V of 1.0 kg steam = 1/0.60', 1.0 / rhoSteam, 1.6666666666666667, 1e-12);
calc('steam 2 s.f.', sf(vSteam, 2), 1.7, 1e-12);
const steamRatio = calc('steam/water volume ratio', vSteam / vWater, 1666.6666666666667, 1e-6);
// PAG P1 results (slide 12)
const objs = [
  { name: 'aluminium block', how: 'ruler: 4.0 × 2.5 × 2.0 cm', m: 54.0, V: calc('Al block V', 4.0 * 2.5 * 2.0, 20.0) },
  { name: 'granite stone', how: 'displacement: 18.0 cm³', m: 46.8, V: 18.0 },
  { name: 'polythene cube', how: 'ruler: 3.0 cm sides', m: 25.1, V: calc('cube V = 3.0³', 3.0 ** 3, 27.0, 1e-12) },
];
objs.forEach(o => { o.rho = o.m / o.V; });
calc('Al block ρ', objs[0].rho, 2.7, 1e-12); calc('stone ρ', objs[1].rho, 2.6, 1e-12); calc('cube ρ 2 s.f.', sf(objs[2].rho, 2), 0.93, 1e-12);
const alV = [10, 20, 30, 40, 50], alM = [27.4, 53.6, 81.5, 107.6, 135.9];
const kAl = alV.reduce((a, v, i) => a + v * alM[i], 0) / alV.reduce((a, v) => a + v * v, 0);
assert(close(kAl, 2.70, 0.01), 'Al gradient ≈ 2.70: ' + kAl);
alV.forEach((v, i) => assert(close(alM[i], 2.7 * v, 0.02), 'Al sample within 2%'));
calc('Al gradient 2 s.f.', sf(kAl, 2), 2.7, 1e-12);
calc('gradient triangle 135/50', 135 / 50, 2.7, 1e-12);
// slide 15: SHC
const kettleE = calc('kettle 1.5 × 4200 × 80', 1.5 * 4200 * (100 - 20), 504000);
calc('QC Al pan 2.0 × 900 × 25', 2.0 * 900 * 25, 45000);
// PAG P5 (slides 17–18)
const pV = 12.0, pI = 4.0, pM = 1.0, cAl = 900;
const pP = calc('P = V × I', pV * pI, 48);
const pT = [0, 60, 120, 180, 240, 300, 360, 420, 480, 540, 600];
const pTheta = [20.0, 21.6, 24.4, 27.2, 29.9, 32.7, 35.4, 38.2, 40.9, 43.7, 46.5];
const pE = calc('E = P × t = 48 × 600', pP * 600, 28800);
const pDT = calc('Δθ = 46.5 − 20.0', pTheta[10] - pTheta[0], 26.5, 1e-9);
const pC = calc('c = 28800 / (1.0 × 26.5)', pE / (pM * pDT), 1086.7924528301887, 1e-6);
calc('c 2 s.f.', sf(pC, 2), 1100, 1e-9);
calc('ideal rise 48 × 600 / (1.0 × 900)', pP * 600 / (pM * cAl), 32, 1e-12);
// least-squares line through the linear part (60–600 s)
const lt = pT.slice(1), lth = pTheta.slice(1);
const mt = lt.reduce((a, b) => a + b) / lt.length, mth = lth.reduce((a, b) => a + b) / lth.length;
const slope = lt.reduce((a, t, i) => a + (t - mt) * (lth[i] - mth), 0) / lt.reduce((a, t) => a + (t - mt) ** 2, 0);
const icpt = mth - slope * mt;
lt.forEach((t, i) => assert(Math.abs(lth[i] - (icpt + slope * t)) < 0.15, 'P5 data near line'));
const cGrad = pP / (pM * slope);
assert(cGrad > 1000 && cGrad < 1060, 'gradient method c: ' + cGrad);
calc('gradient 2 s.f. (°C/s)', sf(slope, 2), 0.046, 1e-12);
calc('gradient-method c 2 s.f.', sf(cGrad, 2), 1000, 1e-9);
calc('percentage above 900 (energy method)', Math.round((pC - cAl) / cAl * 100), 21);
// slide 20: SLH
const Lf = 334000, Lv = 2260000;
calc('melt 0.25 kg ice', 0.25 * Lf, 83500);
calc('QC boil 0.40 kg water', 0.40 * Lv, 904000, 1e-6);
calc('Lv/Lf', sf(Lv / Lf, 2), 6.8, 1e-12);
// slide 21: heating curve, 0.20 kg ice from −30 °C, 1000 W, no losses
const hm = 0.20, hP = 1000, cIce = 2100, cW = 4200, cSteam = 2000;
const seg = [
  calc('t ice −30→0', hm * cIce * 30 / hP, 12.6, 1e-9),
  calc('t melt', hm * Lf / hP, 66.8, 1e-9),
  calc('t water 0→100', hm * cW * 100 / hP, 84, 1e-9),
  calc('t boil', hm * Lv / hP, 452, 1e-9),
  calc('t steam 100→120', hm * cSteam * 20 / hP, 8, 1e-9),
];
const cum = seg.reduce((a, v) => (a.push((a.length ? a[a.length - 1] : 0) + v), a), []);
calc('cum melt end', cum[1], 79.4, 1e-9); calc('cum water end', cum[2], 163.4, 1e-9); calc('cum boil end', cum[3], 615.4, 1e-9); calc('cum steam end', cum[4], 623.4, 1e-9);
calc('L from plateau (79.4 − 12.6) × 1000 / 0.20', (cum[1] - cum[0]) * hP / hm, Lf, 1e-6);
calc('boil plateau / melt plateau', sf(seg[3] / seg[1], 2), 6.8, 1e-12);
// recaps
calc('R2 81 / 30', 81 / 30, 2.7, 1e-12);
calc('R2 ice→water volume drop', vIce - vWater, 8.695652173913e-5, 1e-15);
calc('R2 drop 2 s.f.', sf(vIce - vWater, 2), 8.7e-5, 1e-18);
calc('R3 65.0 − 50.0', 65.0 - 50.0, 15.0); calc('R3 39.0 / 15.0', 39.0 / 15.0, 2.6, 1e-12);
calc('R4 2.0 × 4200 × 50', 2.0 * 4200 * 50, 420000);
calc('R4 c = 9000 / (0.50 × 20)', 9000 / (0.50 * 20), 900);
calc('R5 40 × 300', 40 * 300, 12000);
calc('R6 0.30 × 334000', 0.30 * Lf, 100200, 1e-9);
// full question
const fqE = calc('FQ 0.50 × 4200 × 80', 0.50 * 4200 * 80, 168000);
calc('FQ t = 168000 / 2000', fqE / 2000, 84);
calc('FQ 0.050 × 2.26e6', 0.050 * Lv, 113000, 1e-6);
// homework
calc('HW stone 54 / 20', 54 / 20, 2.7, 1e-12); calc('HW 2700', 54 / 20 * 1000, 2700, 1e-9);
calc('HW oil 0.80 × 2000 × 30', 0.80 * 2000 * 30, 48000);
calc('HW stretch melt 0.20 kg', 0.20 * Lf, 66800, 1e-9); calc('HW stretch warm 0.20 × 4200 × 20', 0.20 * 4200 * 20, 16800, 1e-9);
calc('HW stretch total', 0.20 * Lf + 0.20 * 4200 * 20, 83600, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_template.js) =======================
function ball(s, cx, cy, r, fill, edge) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: 0.75 } }); }
function rng(seed) { return () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
// filled polygon from absolute points [[x,y],...]
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
// particle box: state 'solid' | 'liquid' | 'gas'; returns nothing. Deterministic (seeded).
const PCOL = { solid: ['5B7FD6', '2E4A9A'], liquid: ['3FA3C9', '1F6E8C'], gas: ['E0884A', '9A5320'] };
function particleBox(s, x, y, w, h, state, o = {}) {
  const r = o.r || 0.085, [fc, ec] = o.col || PCOL[state];
  box(s, x, y, w, h, C.white, C.ink, { lw: 1.25 });
  const R = rng(o.seed || 7);
  if (state === 'solid') {
    const nx = Math.floor((w - 0.06) / (2 * r)), ny = Math.floor((h - 0.06) / (2 * r));
    const ox = x + (w - nx * 2 * r) / 2 + r, oy = y + h - 0.03 - r;
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) ball(s, ox + i * 2 * r, oy - j * 2 * r, r * 0.96, fc, ec);
  } else if (state === 'liquid') {
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
    if (o.arrows !== false) placed.filter((_, i) => i % 9 === 4).forEach(([a, b]) => { const t = R() * Math.PI * 2; arrow(s, a + Math.cos(t) * r * 1.05, b + Math.sin(t) * r * 1.05, a + Math.cos(t) * r * 2.0, b + Math.sin(t) * r * 2.0, '6B7385', 0.75); });
  } else {
    const n = o.n || 7, placed = [];
    let guard = 0;
    while (placed.length < n && guard++ < 4000) {
      const a = x + 0.18 + R() * (w - 0.36), b = y + 0.18 + R() * (h - 0.36);
      if (placed.every(([p, q]) => Math.hypot(p - a, q - b) > (o.gap || 0.42))) placed.push([a, b]);
    }
    assert.strictEqual(placed.length, n, 'gas particles placed');
    placed.forEach(([a, b]) => {
      ball(s, a, b, r * 0.96, fc, ec);
      const t = R() * Math.PI * 2; arrow(s, a + Math.cos(t) * r * 1.1, b + Math.sin(t) * r * 1.1, a + Math.cos(t) * r * 3.2, b + Math.sin(t) * r * 3.2, '6B7385', 1);
    });
  }
}
// electronic balance: top of the pan at y; returns pan-top y
function balance(s, x, y, w, reading) {
  box(s, x + w * 0.1, y, w * 0.8, 0.07, 'B7BECC', '6B7385', { lw: 0.75 });
  box(s, x + w * 0.45, y + 0.07, w * 0.1, 0.06, '6B7385', null);
  box(s, x, y + 0.13, w, 0.45, '4A5262', '2E3442', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  box(s, x + w * 0.2, y + 0.2, w * 0.6, 0.3, '1E2A1E', '0F150F');
  label(s, x + w * 0.2, y + 0.2, w * 0.6, reading, { h: 0.3, size: 11, bold: true, color: '7CFC8A' });
  return y;
}
// measuring cylinder: (x,y) top-left of tube, level = fraction full, ticks every h/n
function mCylinder(s, x, y, w, h, level, o = {}) {
  const lh = h * level;
  box(s, x, y + h - lh, w, lh, C.water, null);
  line(s, x, y, x, y + h, C.ink, 1.5); line(s, x + w, y, x + w, y + h, C.ink, 1.5);
  line(s, x - 0.04, y, x, y + 0.05, C.ink, 1.5);
  box(s, x - 0.15, y + h, w + 0.3, 0.07, '6B7385', '4A5262');
  const n = o.ticks || 10;
  for (let i = 1; i < n; i++) line(s, x + w - (i % 5 ? 0.07 : 0.14), y + h - i * h / n, x + w, y + h - i * h / n, C.ink, 0.75);
  // meniscus
  s.addShape(SH.ARC, { x: x + 0.01, y: y + h - lh - 0.05, w: w - 0.02, h: 0.1, angleRange: [0, 180], line: { color: C.waterDark, width: 1.25 } });
}
// displacement (eureka) can: body (x,y,w,h); water to spout level; spout to the right. Returns spout tip.
function eurekaCan(s, x, y, w, h) {
  const sy = y + 0.3;
  box(s, x, sy + 0.04, w, h - 0.34, C.water, null);
  line(s, x, y, x, y + h, C.ink, 2); line(s, x + w, y, x + w, sy, C.ink, 2); line(s, x + w, sy + 0.12, x + w, y + h, C.ink, 2); line(s, x, y + h, x + w, y + h, C.ink, 2);
  line(s, x + w, sy, x + w + 0.5, sy + 0.3, C.ink, 2); line(s, x + w, sy + 0.12, x + w + 0.46, sy + 0.38, C.ink, 2);
  line(s, x, sy + 0.04, x + w, sy + 0.04, C.waterDark, 1.25);
  return [x + w + 0.48, sy + 0.36];
}
// thermometer: top at (x,y), length len; liquid to fraction f
function thermometer(s, x, y, len, f = 0.45) {
  box(s, x - 0.045, y, 0.09, len, C.white, '6B7385', { shape: SH.ROUNDED_RECTANGLE, r: 0.04, lw: 0.75 });
  ball(s, x, y + len, 0.075, C.red, '8E2A33');
  box(s, x - 0.015, y + len - len * f, 0.03, len * f, C.red, null);
  for (let i = 1; i < 8; i++) line(s, x + 0.01, y + 0.1 + i * (len - 0.2) / 8, x + 0.045, y + 0.1 + i * (len - 0.2) / 8, '6B7385', 0.5);
}
// equation badge: equation + RECALL / GIVEN pill
function eqBadge(s, x, y, w, key) {
  const e = T.EQS[key], rec = e.status === 'recall';
  box(s, x, y, w, 0.5, C.white, rec ? C.red : C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
  label(s, x + 0.1, y, w - 1.4, e.eq, { h: 0.5, size: 16, bold: true, color: C.ink, align: 'left' });
  D.pill(s, x + w - 1.25, y + 0.1, rec ? 'RECALL' : 'GIVEN', rec ? C.red : C.green, 1.1);
}
// horizontal bar to scale
function hbar(s, x, y, maxW, v, vmax, col, txt, val) {
  const w = maxW * v / vmax;
  box(s, x, y, w, 0.3, col, null);
  label(s, x - 1.45, y, 1.38, txt, { h: 0.3, size: 10.5, bold: true, align: 'right' });
  label(s, x + w + 0.06, y, 1.4, val, { h: 0.3, size: 10.5, align: 'left', color: C.ink });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Energy and matter',
  footer: 'OCR J260 Combined Science B • P6.1 How does energy transform matter? • teacher deck • mark schemes and answers in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • PAG P1 density • PAG P5 specific heat capacity` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found in P6.1 • stretch items marked' },
    { icon: 'ρ', text: 'Changes of state • density • internal energy • ΔE = mcΔθ • E = mL • heating curves' },
  ],
  notes: 'P6.1 How does energy transform matter? is Part 1 of 3 in J260 Chapter P6 (P6.1, P6.2, P6.3). P6.4 (particle model and pressure in fluids) and P6.5 (scientific models and the Big Bang) are in the separate-science Physics B (J259) only.\nSpec wording and numbering in this deck were reconstructed from search extracts and memory because ocr.org.uk could not be fetched: see SPEC_P6_1.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'P6.1.1', text: 'Describe how **mass is conserved** when substances melt, freeze, evaporate, condense or sublimate.' },
  { code: 'P6.1.2', text: 'Describe how these **physical changes** differ from **chemical changes**: the material recovers its properties if reversed.' },
  { code: 'P6.1.3', text: 'Explain the differences in **density** between solids, liquids and gases using the **arrangement of particles**.' },
  { code: 'P6.1.4', text: 'Recall and apply **ρ = m ÷ V**, including to changes where mass is conserved (PAG P1).' },
  { code: 'P6.1.5', text: 'Describe how heating changes the **internal energy** of a system: it raises the temperature or changes the state.' },
  { code: 'P6.1.6', text: 'Define **specific heat capacity** and distinguish it from **specific latent heat**.' },
  { code: 'P6.1.7', text: 'Apply **ΔE = m × c × Δθ** to calculate energy changes (PAG P5).' },
  { code: 'P6.1.8', text: 'Apply **E = m × L** to changes of state, and interpret **heating curves**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'No P6.1 statement was found to be Higher tier only (bold) in the J260 specification (UNVERIFIED: check the spec). All objectives are for both tiers; multi-step heating-curve calculations are marked GRADE 7–9 STRETCH.\nNumbering P6.1.1–P6.1.8 is reconstructed (see SPEC_P6_1.md): check against the OCR J260 specification before using codes with students.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter P6 Matter – models and explanations • P6.1 is Part 1 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['P6.1.1–P6.1.2', 'Changes of state, conservation of mass, physical vs chemical change', 'Both tiers', C.blue],
    ['P6.1.3–P6.1.4', 'Density and the particle model; ρ = m ÷ V', 'Both tiers', C.blue],
    ['PAG P1', 'Practical: measuring the density of regular and irregular objects', 'Practical', C.orange],
    ['P6.1.5', 'Heating changes internal energy: temperature rise or change of state', 'Both tiers', C.blue],
    ['P6.1.6–P6.1.7', 'Specific heat capacity, ΔE = mcΔθ • PAG P5', 'Both tiers', C.blue],
    ['P6.1.6, P6.1.8', 'Specific latent heat, E = mL, heating curves', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'P6.1\nHow does energy transform matter?', { h: 0.75, size: 11.5, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: P2 energy stores and power • P5.1 atoms • chemistry: states of matter • maths: units, rearranging', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.05, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter P6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**P6.1 How does energy transform matter?** (this deck)',
      '**P6.2 How does the particle model explain the effects of heating?** Gas particles, temperature and pressure.',
      '**P6.3 How does the particle model relate to material under stress?** Forces on springs, F = kx, elastic energy.',
      'P6.4 (pressure in fluids) and P6.5 (the Big Bang) are **Physics B J259 only**.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.85, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.55, 5.53, 2.3, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Every slide is for both tiers: no P6.1 statement is Higher only.',
      '**ρ = m ÷ V** must be recalled; **ΔE = mcΔθ** and **E = mL** are given on the equation sheet.',
      'Two practicals: **PAG P1** (density) and **PAG P5** (specific heat capacity).',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.65, w: 5.15, h: 2.1, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter P6 has three sub-topics in Combined Science: P6.1, P6.2 and P6.3 (verified from search extracts of the docbrown J260 page and the OCR outline scheme of work). P6.4 and P6.5 are separate science (J259) only.\nWhere things go: gas pressure and temperature, kelvin and any pV work are P6.2; springs, F = kx and elastic energy are P6.3. This deck does not teach them.\nPAG links: the OCR outline scheme lists "PAG1: Determine the densities of a variety of objects" against 6.1. PAG P5 (specific heat capacity) placed here is UNVERIFIED but fits the content.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'KS3 / chemistry • states of matter', q: 'Name the **three states of matter**. Give one property of each.' },
  { from: 'KS3 • changes of state', q: 'At normal air pressure, at what temperature does ice **melt**? At what temperature does water **boil**?' },
  { from: 'P2 • energy stores', q: 'A pan of water is warmed on a hob. Which **energy store** of the water increases?' },
  { from: 'P2 • power', q: 'A **2000 W** kettle is switched on for **60 s**. How much energy does it transfer?' },
  { from: 'P5.1 • atoms', q: 'What is the typical radius of an **atom**? Give your answer in standard form.' },
  { from: 'Maths • units', q: 'Convert **250 g** into kg. Convert **500 cm³** into m³.' },
], { subtitle: 'Recall from KS3, P2, P5.1 and maths • 6 minutes • no notes', notes: 'ANSWERS\n1. Solid, liquid, gas. e.g. solid: fixed shape and volume; liquid: fixed volume, takes the shape of its container, flows; gas: no fixed shape or volume, fills its container, can be compressed.\n2. Melts at 0 °C; boils at 100 °C.\n3. Thermal energy store (internal energy).\n4. E = P × t = 2000 × 60 = 120 000 J (120 kJ).\n5. About 1 × 10⁻¹⁰ m.\n6. 0.25 kg; 500 ÷ 1 000 000 = 5.0 × 10⁻⁴ m³.' }), 'Retrieval starter');

// ======================= 5 CHANGES OF STATE, MASS CONSERVED =======================
reg(D.contentSlide({
  title: 'Changes of state and conservation of mass',
  subtitle: `Specification ${sp('P6.1.1')} • the particles are rearranged, not created or destroyed`,
  tag: 'P6.1.1', caption: 'the same particles in three arrangements; arrows show the changes of state',
  draw: (s, p) => {
    const bw = 1.55, bh = 1.15;
    const G = [2.72, 1.55], S = [0.75, 4.05], L = [4.7, 4.05];
    particleBox(s, G[0], G[1], bw, bh, 'gas', { n: 6, seed: 11 });
    particleBox(s, S[0], S[1], bw, bh, 'solid');
    particleBox(s, L[0], L[1], bw, bh, 'liquid', { seed: 5, fill: 0.85 });
    label(s, G[0], G[1] + bh + 0.02, bw, 'GAS', { size: 11, bold: true, color: PCOL.gas[1] });
    label(s, S[0], S[1] + bh + 0.02, bw, 'SOLID', { size: 11, bold: true, color: PCOL.solid[1] });
    label(s, L[0], L[1] + bh + 0.02, bw, 'LIQUID', { size: 11, bold: true, color: PCOL.liquid[1] });
    // solid <-> liquid
    arrow(s, S[0] + bw + 0.1, S[1] + 0.35, L[0] - 0.1, L[1] + 0.35, C.red, 2);
    arrow(s, L[0] - 0.1, L[1] + 0.8, S[0] + bw + 0.1, S[1] + 0.8, C.blue, 2);
    label(s, S[0] + bw, S[1] + 0.05, L[0] - S[0] - bw, 'melting', { size: 10.5, bold: true, color: C.red });
    label(s, S[0] + bw, S[1] + 0.84, L[0] - S[0] - bw, 'freezing', { size: 10.5, bold: true, color: C.blue });
    // liquid <-> gas
    arrow(s, L[0] + 1.05, L[1] - 0.1, G[0] + bw + 0.15, G[1] + 0.55, C.red, 2);
    arrow(s, G[0] + bw + 0.1, G[1] + 0.95, L[0] + 0.55, L[1] - 0.1, C.blue, 2);
    label(s, 5.0, 2.45, 1.5, 'evaporating / boiling', { h: 0.45, size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 3.45, 3.12, 1.05, 'condensing', { size: 10.5, bold: true, color: C.blue, align: 'right' });
    // solid -> gas
    arrow(s, S[0] + 0.75, S[1] - 0.1, G[0] - 0.1, G[1] + 0.75, C.red, 2);
    label(s, 0.6, 2.75, 1.25, 'sublimating', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 0.6, 5.62, 5.9, 'red: energy in (heating) • blue: energy out (cooling)', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'Changing state',
  lines: [
    'Heating or cooling can make a substance **melt, freeze, evaporate (boil), condense** or **sublimate** (solid straight to gas).',
    'In a change of state the **same particles** are rearranged: their spacing, arrangement and motion change.',
    'No particles are made or lost, so **mass is conserved**.',
    'In an open container, mass can seem to fall when a liquid evaporates, because gas particles escape into the air.',
  ],
  worked: { head: 'Worked example', q: 'A sealed bag holds 250 g of ice. The ice melts. What is the mass of the water?',
    steps: [['Particles', 'the same water particles, just rearranged'], ['Sealed bag', 'nothing gets in or out'], ['So', 'the mass does not change'], ['Answer', `mass of water = ${iceBag} g`]] },
  qc: 'Solid carbon dioxide ("dry ice") turns straight into a gas. Name this change of state. What happens to the mass if it is in a sealed balloon?',
  notes: 'QUICK CHECK ANSWER: Sublimation (sublimating). The mass of carbon dioxide stays the same because the particles are not created or destroyed, just spread out.\nTerminology: evaporation happens from the surface at any temperature; boiling happens throughout the liquid at the boiling point. Both are liquid → gas. Gas → solid directly (deposition) is not required.',
}), 'P6.1.1 Changes of state');

// ======================= 6 PHYSICAL VS CHEMICAL =======================
reg(D.contentSlide({
  title: 'Physical changes and chemical changes',
  subtitle: `Specification ${sp('P6.1.1')}, ${sp('P6.1.2')} • a change of state can be reversed to get the original material back`,
  tag: 'P6.1.2', caption: 'ice melting in a sealed flask on a balance: the reading does not change',
  draw: (s, p) => {
    [[1.0, 'before: ice', 'solid'], [3.75, 'after: water', 'liquid']].forEach(([x, cap, st]) => {
      label(s, x - 0.2, 1.45, 2.2, cap, { size: 11, bold: true });
      // sealed flask (conical shape)
      poly(s, [[x + 0.65, 1.8], [x + 1.15, 1.8], [x + 1.15, 2.2], [x + 1.75, 3.05], [x + 0.05, 3.05], [x + 0.65, 2.2]], 'F4F8FC', C.ink, { lw: 1.5 });
      box(s, x + 0.6, 1.72, 0.6, 0.12, '8C6A3A', '5A4020');
      if (st === 'solid') { [[0.42, 2.74], [0.76, 2.74], [1.1, 2.74], [0.59, 2.44], [0.93, 2.44]].forEach(([dx, dy]) => box(s, x + dx, dy, 0.28, 0.28, 'DDEFFB', '7FB2D9', { lw: 0.75 })); }
      else poly(s, [[x + 0.35, 2.62], [x + 1.45, 2.62], [x + 1.75, 3.05], [x + 0.05, 3.05]], C.water, C.waterDark, { lw: 0.75 });
      balance(s, x - 0.1, 3.05, 2.0, '152.4 g');
    });
    arrow(s, 3.0, 2.5, 3.6, 2.5, C.red, 2.5);
    label(s, 2.85, 2.1, 0.9, 'warm', { size: 10.5, bold: true, color: C.red });
    const rows = [
      [HDR(''), HDR('Physical change (e.g. melting)'), HDR('Chemical change (e.g. burning)')],
      ['New substance?', 'no: same particles', 'yes: atoms rearranged'],
      ['Reversible?', 'yes: cool it, the ice comes back', 'not easily'],
      ['Properties after reversing', 'the same as before', 'new properties'],
      ['Mass (closed system)', 'conserved', 'conserved'],
    ].map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 0.7, y: 3.95, w: 5.6, colW: [1.6, 2.0, 2.0], rowH: 0.3, fontFace: 'Calibri', fontSize: 10, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Physical or chemical?',
  lines: [
    'Changes of state are **physical changes**: no new substance is made.',
    'If the change is **reversed**, the material **recovers its original properties** (melt ice, refreeze it: it is ice again).',
    'In a **chemical change** (e.g. burning) atoms are rearranged into **new substances** with different properties.',
    'Mass is conserved in both, if nothing can escape.',
  ],
  worked: { head: 'Classify each change', q: '',
    steps: [['Chocolate melting', '**physical**: it sets again as chocolate'], ['Steam condensing', '**physical**: water forms again'], ['Wood burning', '**chemical**: ash and gases cannot become wood'], ['Answer', 'changes of state are always physical']] },
  qc: 'Wax is melted and then left to cool. Explain why this is a physical change and not a chemical change.',
  notes: 'QUICK CHECK ANSWER: The wax becomes solid wax again with the same properties (no new substance is made); the particles are only rearranged. A chemical change would make a new substance that does not turn back when cooled.\nThe balance reading (152.4 g) is illustrative: flask + ice. If the flask were open, condensation from the air could add a little mass.',
}), 'P6.1.2 Physical vs chemical change');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('P6.1.1')}–${sp('P6.1.2')} • changes of state and conservation of mass`, [
  { q: 'Name the change of state when: **(i)** a liquid becomes a gas; **(ii)** a gas becomes a liquid; **(iii)** a solid becomes a gas without melting.', marks: 3, ms: '(i) evaporating / boiling (1); (ii) condensing (1); (iii) sublimating / sublimation (1).' },
  { q: 'A student melts **50 g** of solid wax in a closed container. State the mass of the liquid wax and explain your answer.', marks: 2, ms: '50 g (1); the particles are the same / no particles are added or lost; they are only rearranged (1).' },
  { q: 'Describe **one** difference between melting ice and burning paper.', marks: 2, ms: 'Melting is a physical change / no new substance; burning is a chemical change / new substances made (1); melted ice can be frozen back to ice with the same properties, burnt paper cannot be turned back (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 DENSITY =======================
reg(D.contentSlide({
  title: 'Density',
  subtitle: `Specification ${sp('P6.1.4')} • how much mass is packed into each unit of volume`,
  tag: 'P6.1.4', caption: 'a regular block: measure its sides with a ruler and its mass with a balance',
  draw: (s, p) => {
    eqBadge(s, 0.8, 1.5, 5.4, 'RHO');
    // 3D block on a balance
    const bx = 1.2, by = 3.0, bw = 1.9, bh = 0.9, d = 0.45;
    poly(s, [[bx, by], [bx + d, by - d * 0.6], [bx + bw + d, by - d * 0.6], [bx + bw, by]], 'D3D8E0', '6B7385');
    poly(s, [[bx + bw, by], [bx + bw + d, by - d * 0.6], [bx + bw + d, by + bh - d * 0.6], [bx + bw, by + bh]], 'A9B1BF', '6B7385');
    box(s, bx, by, bw, bh, 'C2C8D2', '6B7385');
    label(s, bx, by, bw, 'aluminium', { h: bh, size: 11, bold: true, color: C.ink });
    balance(s, bx - 0.25, by + bh, bw + 0.95, '108 g');
    arrow(s, bx, by - 0.75, bx + bw, by - 0.75, C.blue, 1.25, { tail: true }); label(s, bx, by - 1.0, bw, '5.0 cm', { size: 10.5, bold: true, color: C.blue, h: 0.22 });
    arrow(s, bx - 0.15, by, bx - 0.15, by + bh, C.blue, 1.25, { tail: true }); label(s, bx - 0.95, by + bh / 2 - 0.12, 0.75, '2.0 cm', { size: 10.5, bold: true, color: C.blue, align: 'right' });
    arrow(s, bx + bw + 0.12, by + 0.05, bx + bw + d + 0.12, by - d * 0.6 + 0.05, C.blue, 1.25, { tail: true }); label(s, bx + bw + d + 0.15, by - 0.45, 0.8, '4.0 cm', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    box(s, 0.8, 4.75, 5.4, 1.0, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([
      { text: 'Units', options: { bold: true, color: C.ink, breakLine: true } },
      ...T.rich('kg/m³ (SI unit) or g/cm³.   **1 g/cm³ = 1000 kg/m³**', { color: C.text }).map((r, i, a) => { if (i === a.length - 1) r.options.breakLine = true; return r; }),
      ...T.rich('1 m³ = 1 000 000 cm³ (100 × 100 × 100)', { color: C.text }),
    ], { x: 0.95, y: 4.8, w: 5.1, h: 0.9, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
  },
  head: 'Density = mass ÷ volume',
  lines: [
    `**ρ = m ÷ V**  (${ST('RHO')}). ρ (rho) is density.`,
    'Density in kg/m³ needs mass in **kg** and volume in **m³**. Using g and cm³ gives g/cm³.',
    'Rearranged: **m = ρ × V** and **V = m ÷ ρ**.',
    'Objects less dense than water (1000 kg/m³) **float** in it.',
  ],
  worked: { head: 'Worked example', q: 'The aluminium block is 5.0 cm × 4.0 cm × 2.0 cm and has a mass of 108 g. Calculate its density.',
    steps: [['Volume', `V = 5.0 × 4.0 × 2.0 = ${blkV} cm³`], ['Equation', 'ρ = m ÷ V'], ['Substitute', `ρ = 108 ÷ ${blkV}`], ['Answer', `ρ = ${blkRho} g/cm³ = ${blkRho * 1000} kg/m³`]] },
  qc: '500 cm³ of cooking oil has a mass of 460 g. Calculate its density in g/cm³ and in kg/m³. Will the oil float on water?',
  notes: 'QUICK CHECK ANSWER: ρ = 460 ÷ 500 = 0.92 g/cm³ = 920 kg/m³. Yes: it is less dense than water (1000 kg/m³), so it floats.\nρ = m/V is a RECALL equation in J260 (not on the equation sheet).',
}), 'P6.1.4 Density');

// ======================= 9 DENSITY AND THE PARTICLE MODEL =======================
reg(D.contentSlide({
  title: 'Density and the particle model',
  subtitle: `Specification ${sp('P6.1.3')}, ${sp('P6.1.4')} • the closer the particles, the greater the density`,
  tag: 'P6.1.3', caption: 'equal volumes of ice, water and steam (gas spacing NOT to scale: far more spread out)',
  draw: (s, p) => {
    const bw = 1.7, bh = 1.6, y = 1.75;
    [['ice (solid)', 'solid', 0.75, `${rhoIce} kg/m³`], ['water (liquid)', 'liquid', 2.65, `${rhoWater} kg/m³`], ['steam (gas)', 'gas', 4.55, `${rhoSteam.toFixed(2)} kg/m³`]].forEach(([t, st, x, rho], i) => {
      label(s, x, y - 0.32, bw, t, { size: 11, bold: true, color: PCOL[st][1] });
      particleBox(s, x, y, bw, bh, st, { seed: 3 + i, n: 4, fill: 0.92, gap: 0.6 });
      label(s, x, y + bh + 0.05, bw, rho, { size: 12, bold: true });
    });
    const rows = [
      [HDR('State'), HDR('Arrangement'), HDR('Spacing'), HDR('Density')],
      ['solid', 'regular, fixed positions, vibrate', 'touching', 'high'],
      ['liquid', 'random, move past each other', 'touching', 'high'],
      ['gas', 'random, fast, all directions', 'far apart', 'very low'],
    ].map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 0.7, y: 4.0, w: 5.6, colW: [0.8, 2.6, 1.1, 1.1], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Why the states have different densities',
  lines: [
    'In **solids and liquids** the particles are **touching**, so their densities are high and similar.',
    'In a **gas** the particles are **far apart**: about 1000 times less dense than the liquid.',
    'Most solids are a little denser than their liquid. **Water is unusual**: ice is less dense, so ice floats.',
    'In a change of state the **mass stays the same** but the **volume changes**, so the density changes.',
  ],
  worked: { head: 'Worked example: mass is conserved', q: '1.0 kg of ice (920 kg/m³) melts to water (1000 kg/m³). Find the volume before and after.',
    steps: [['Equation', 'V = m ÷ ρ'], ['Ice', `V = 1.0 ÷ 920 = ${sf(vIce, 3).toFixed(5)} m³`], ['Water', `V = 1.0 ÷ 1000 = ${vWater.toFixed(5)} m³`], ['Answer', 'same 1.0 kg; the volume gets smaller']] },
  qc: '1.0 kg of water boils to make steam of density 0.60 kg/m³. Calculate the volume of the steam. Compare it with the water.',
  notes: `QUICK CHECK ANSWER: V = m ÷ ρ = 1.0 ÷ 0.60 = ${sf(vSteam, 2)} m³, about ${Math.round(steamRatio / 100) * 100} times the 0.001 m³ of water (the mass is still 1.0 kg).\nSteam density 0.60 kg/m³ is for steam at 100 °C and normal pressure (0.598). The gas box cannot be drawn to scale: at the same scale there would be about one gas particle for every 1700 particles in the water box.`,
}), 'P6.1.3 Density and particles');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('P6.1.3')}–${sp('P6.1.4')} • density`, [
  { q: 'Use the particle model to explain why a gas has a much lower density than a solid.', marks: 2, ms: 'Gas particles are far apart / spread out; solid particles are close together / touching (1); so the same mass of gas takes up a much bigger volume / less mass in each m³ (1).' },
  { q: 'A metal block has a volume of **30 cm³** and a mass of **81 g**. Calculate its density in g/cm³.', marks: 2, ms: 'ρ = m ÷ V = 81 ÷ 30 (1); = 2.7 g/cm³ (1).' },
  { q: 'A **1.0 kg** block of ice (density 920 kg/m³) melts. Water has a density of 1000 kg/m³. Calculate the **change in volume**.', marks: 3, ms: 'V(ice) = 1.0 ÷ 920 = 1.09 × 10⁻³ m³ (1); V(water) = 1.0 ÷ 1000 = 1.00 × 10⁻³ m³ (1); decrease of 8.7 × 10⁻⁵ m³ (accept 9 × 10⁻⁵ m³) (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 PAG P1 METHOD =======================
reg(D.contentSlide({
  title: 'PAG P1: measuring density',
  subtitle: `Specification ${sp('P6.1.4')} • regular objects with a ruler; irregular objects by displacement`,
  tag: 'PAG P1', pag: 'PAG P1', caption: 'A: ruler and balance • B: displacement can and measuring cylinder',
  draw: (s, p) => {
    label(s, 0.7, 1.42, 2.6, 'A  Regular block', { size: 11.5, bold: true, color: C.blue, align: 'left' });
    // block + ruler
    box(s, 0.95, 2.05, 1.6, 0.8, 'C2C8D2', '6B7385');
    box(s, 0.95, 1.8, 1.6, 0.18, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let i = 0; i <= 16; i++) line(s, 0.95 + i * 0.1, 1.98, 0.95 + i * 0.1, 1.98 - (i % 5 ? 0.06 : 0.11), '6B5A2A', 0.6);
    label(s, 0.95, 2.05, 1.6, 'measure l, w, h', { h: 0.8, size: 10.5, bold: true });
    balance(s, 3.6, 2.27, 2.0, '54.0 g');
    box(s, 4.15, 1.87, 0.9, 0.4, 'C2C8D2', '6B7385');
    label(s, 3.3, 1.42, 2.8, 'mass on a balance (zeroed)', { size: 10.5, bold: true, align: 'center' });
    // B: displacement
    label(s, 0.7, 3.12, 3.5, 'B  Irregular stone (displacement)', { size: 11.5, bold: true, color: C.blue, align: 'left' });
    const [tx, ty] = eurekaCan(s, 1.0, 3.55, 1.5, 2.05);
    // stone on thread
    line(s, 1.75, 3.35, 1.75, 4.55, C.ink, 1);
    s.addShape(SH.OVAL, { x: 1.45, y: 4.55, w: 0.6, h: 0.42, fill: { color: '8C8A85' }, line: { color: '5A5650', width: 1 }, rotate: -12 });
    label(s, 0.6, 3.34, 1.1, 'thread', { size: 10, italic: true, align: 'right', h: 0.22 });
    // drips + cylinder
    [0.15, 0.32].forEach(dy => ball(s, tx, ty + dy, 0.03, C.waterDark));
    mCylinder(s, tx - 0.22, 4.25, 0.44, 1.38, 0.3, { ticks: 10 });
    label(s, 0.95, 5.62, 1.6, 'displacement can', { size: 10, bold: true, h: 0.22 });
    label(s, tx + 0.3, 4.6, 2.0, 'measuring cylinder: volume of water pushed out = volume of stone', { h: 0.85, size: 10, bold: true, align: 'left', valign: 'top' });
  },
  head: 'Method',
  lines: [
    '**Mass:** zero the balance, then measure the mass of the object in g.',
    '**Regular block:** measure length, width and height with a ruler (mm scale). **V = l × w × h**.',
    '**Irregular object:** fill a displacement can until water drips from the spout. Wait for the dripping to stop.',
    'Lower the object in on a thread. Collect the water pushed out in a measuring cylinder: its volume = the object\'s volume.',
    'Read at **eye level**, from the **bottom of the meniscus**. Calculate **ρ = m ÷ V**; repeat and average.',
  ],
  size: 11,
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'the object / material tested'], ['Dependent', 'density (calculated from m and V)'], ['Control', 'zeroed balance; can filled to the spout each time'], ['Safety', 'wipe up spills (slip risk); lower objects gently so glass does not break']], size: 10.5 },
  workedH: 2.05,
  qc: 'Why must the displacement can be filled until water drips out of the spout before the stone is added?',
  notes: 'QUICK CHECK ANSWER: So that the water level starts exactly at the spout: then all the water pushed out by the stone (and only that water) flows into the measuring cylinder. If the can were not full, the first water displaced would just raise the level and not be collected, so the volume would be too small.\nAlternative for small objects: put water in a measuring cylinder, read the volume, add the object, read again; volume = difference.\nPAG P1 (OCR Materials group): "Determine the densities of a variety of objects" — listed against 6.1 in the OCR outline scheme of work (search extract).',
}), 'PAG P1 Density: method');

// ======================= 12 PAG P1 RESULTS =======================
const GA = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 60, ymin: 0, ymax: 160, xstep: 10, ystep: 20, minor: 2, xlabel: 'volume / cm³', ylabel: 'mass / g', fmt: v => String(Math.round(v)) };
{
  const s = D.contentHeader('PAG P1: results and evaluation', `Specification ${sp('P6.1.4')} • sample class results`, { pag: 'PAG P1', tag: 'PAG P1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'five aluminium samples plotted to scale; gradient = density');
  axes(s, GA);
  plotLine(s, GA, [[0, 0], [58, kAl * 58]], C.blue, 2);
  points(s, GA, alV.map((v, i) => [v, alM[i]]));
  // gradient triangle
  line(s, px(GA, 0), py(GA, 0), px(GA, 50), py(GA, 0), C.red, 1.25, { dash: 'dash' });
  line(s, px(GA, 50), py(GA, 0), px(GA, 50), py(GA, 135), C.red, 1.25, { dash: 'dash' });
  label(s, px(GA, 50) + 0.05, py(GA, 70), 1.0, 'Δm = 135 g', { size: 10.5, bold: true, color: C.red, align: 'left' });
  label(s, px(GA, 20), py(GA, 0) - 0.27, 1.5, 'ΔV = 50 cm³', { size: 10.5, bold: true, color: C.red });
  label(s, px(GA, 8), py(GA, 140), 2.3, 'gradient = 135 ÷ 50 = 2.7 g/cm³', { size: 10.5, bold: true, color: C.blue, align: 'left' });
  const rows = [[HDR('Object'), HDR('How V was found'), HDR('m / g'), HDR('V / cm³'), HDR('ρ / g/cm³')],
    ...objs.map((o, i) => [o.name, o.how, o.m.toFixed(1), o.V.toFixed(1), sf(o.rho, 2).toFixed(2)].map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.white : C.cardBlue } } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.45, 2.03, 0.8, 0.85, 0.95], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 2.62, 6.08, 1.55, 'What the results show', [
    'The block and the stone have similar densities (2.7 and 2.6 g/cm³): rock and metal.',
    'The polythene cube (0.93 g/cm³) is less dense than water, so it floats.',
    'Mass ∝ volume for one material: a straight line through the origin; **gradient = density**.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Sources of error and improvements', '', [
    ['Ruler', '±1 mm on a 20 mm side is a 5% error → use vernier callipers'],
    ['Displacement', 'drops stay in the spout; air bubbles on the stone → tap to remove, wait for drips'],
    ['Cylinder', 'parallax → read the meniscus at eye level; use a narrower cylinder'],
    ['Answer', 'repeat each measurement and calculate a mean']], { size: 10.5 });
  D.quickCheck(s, 'Use the table: calculate the density of the stone in kg/m³. Which object would float on water (1000 kg/m³)?');
  D.notes(s, `QUICK CHECK ANSWER: 2.6 g/cm³ = 2600 kg/m³. The polythene cube (930 kg/m³) floats.\nCalculations (node): block 54.0 ÷ 20.0 = 2.70; stone 46.8 ÷ 18.0 = 2.60; cube 25.1 ÷ 27.0 = 0.93 g/cm³. Graph best fit through origin (least squares) gradient = ${kAl.toFixed(3)} g/cm³; samples within 2% of 2.7 × V.`);
  reg(s, 'PAG P1 Density: results');
}

// ======================= 13 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('P6.1.4')} • PAG P1 density`, [
  { q: 'Describe how to measure the **volume** of an irregularly shaped stone using a displacement can.', marks: 3, ms: 'Fill the can until water comes out of the spout / to the spout (1); lower the stone in (on a thread) (1); collect the displaced water in a measuring cylinder; its volume = volume of stone (1).' },
  { q: 'A stone has a mass of **39.0 g**. When it is put into a measuring cylinder of water, the reading rises from **50.0 cm³** to **65.0 cm³**. Calculate the density of the stone.', marks: 2, ms: 'V = 65.0 − 50.0 = 15.0 cm³ (1); ρ = 39.0 ÷ 15.0 = 2.6 g/cm³ (1).' },
  { q: 'Give **one** source of error when measuring a small block with a ruler, and **one** improvement.', marks: 2, ms: 'e.g. resolution of ruler (1 mm) is large compared with the length / parallax / edges not square (1); use vernier callipers or a micrometer / read at eye level / measure several times and average (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 14 INTERNAL ENERGY =======================
reg(D.contentSlide({
  title: 'Heating changes internal energy',
  subtitle: `Specification ${sp('P6.1.5')} • heating raises the temperature OR changes the state`,
  tag: 'P6.1.5', caption: 'energy supplied by heating goes to the kinetic or potential energy of the particles',
  draw: (s, p) => {
    box(s, 2.1, 1.5, 2.8, 0.75, C.red, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
    label(s, 2.1, 1.5, 2.8, 'HEATING\nenergy transferred to the particles', { h: 0.75, size: 11, bold: true, color: C.white });
    arrow(s, 2.9, 2.3, 1.9, 2.95, C.red, 2.5); arrow(s, 4.1, 2.3, 5.1, 2.95, C.red, 2.5);
    // left: temperature rises
    box(s, 0.65, 3.0, 2.65, 2.75, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.65, 3.05, 2.65, 'Temperature rises', { size: 11.5, bold: true, color: C.red });
    particleBox(s, 1.25, 3.4, 1.45, 1.05, 'liquid', { seed: 9, fill: 0.85 });
    label(s, 0.7, 4.5, 2.55, 'particles move **faster**: more **kinetic** energy', { h: 0.55, size: 10.5, align: 'center', valign: 'top' });
    label(s, 0.7, 5.1, 2.55, 'state does not change', { size: 10.5, italic: true, color: C.grey });
    // right: change of state
    box(s, 3.7, 3.0, 2.65, 2.75, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 3.7, 3.05, 2.65, 'Change of state', { size: 11.5, bold: true, color: C.blue });
    particleBox(s, 4.3, 3.4, 1.45, 1.05, 'gas', { seed: 12, n: 4, gap: 0.5 });
    label(s, 3.75, 4.5, 2.55, 'bonds between particles broken: more **potential** energy', { h: 0.55, size: 10.5, align: 'center', valign: 'top' });
    label(s, 3.75, 5.1, 2.55, 'temperature stays the same', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'Internal energy',
  lines: [
    '**Internal energy** is the energy stored by the particles of a system: the total **kinetic** energy (movement) plus **potential** energy (from forces between particles).',
    'Heating a system **increases its internal energy**.',
    'This **either** raises the **temperature** (particles move faster) **or** causes a **change of state** (particles separate) — not both at once.',
    'Cooling decreases the internal energy: the temperature falls or the substance condenses or freezes.',
  ],
  worked: { head: 'Which energy changes?', q: '',
    steps: [['Water warms 20 → 60 °C', '**kinetic** energy of particles increases'], ['Ice melts at 0 °C', '**potential** energy increases; temperature constant'], ['Steam condenses at 100 °C', 'potential energy **decreases**; energy released'], ['Answer', 'temperature change ↔ kinetic; state change ↔ potential']], size: 10.5 },
  qc: 'Water boils in a kettle that is still switched on. The temperature stays at 100 °C. Where is the energy from the heater going?',
  notes: 'QUICK CHECK ANSWER: Into breaking the bonds / separating the water particles to form steam (increasing their potential energy, i.e. the internal energy), not into making them move faster, so the temperature does not rise.\nThe J260 wording is "describe how heating a system will change the energy stored within the system and raise its temperature or produce changes of state" (reconstructed, UNVERIFIED). The kinetic + potential definition of internal energy is taught here as the explanation.',
}), 'P6.1.5 Internal energy');

// ======================= 15 SPECIFIC HEAT CAPACITY =======================
reg(D.contentSlide({
  title: 'Specific heat capacity',
  subtitle: `Specification ${sp('P6.1.6')}, ${sp('P6.1.7')} • the energy needed to warm 1 kg of a material by 1 °C`,
  tag: 'P6.1.7', caption: 'specific heat capacities drawn to scale (J/kg °C)',
  draw: (s, p) => {
    eqBadge(s, 0.8, 1.5, 5.4, 'SHC');
    label(s, 0.8, 2.2, 5.4, 'Energy to warm 1 kg by 1 °C (J)', { size: 11, bold: true });
    const data = [['water', 4200, C.waterDark], ['ice', 2100, '7FB2D9'], ['aluminium', 900, '8C96A8'], ['iron', 450, '6B7385'], ['copper', 385, 'B8730A']];
    data.forEach(([n, v, col], i) => hbar(s, 2.15, 2.6 + i * 0.5, 3.3, v, 4200, col, n, String(v)));
    line(s, 2.15, 2.5, 2.15, 5.1, C.ink, 1.25);
    label(s, 0.8, 5.25, 5.4, 'water needs more energy per kg per °C than any of the others', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'What it means',
  lines: [
    '**Specific heat capacity (c)**: the energy needed to raise the temperature of **1 kg** of a substance by **1 °C**, without a change of state.',
    `**ΔE = m × c × Δθ**  (${ST('SHC')}). Units: J, kg, J/kg °C, °C.`,
    'Δθ = final temperature − starting temperature.',
    'A **high** c means a lot of energy is needed to warm it, and it releases a lot as it cools.',
  ],
  worked: { head: 'Worked example', q: 'A kettle heats 1.5 kg of water from 20 °C to 100 °C. c = 4200 J/kg °C. Calculate the energy needed.',
    steps: [['Equation', 'ΔE = m × c × Δθ'], ['Δθ', '100 − 20 = 80 °C'], ['Substitute', 'ΔE = 1.5 × 4200 × 80'], ['Answer', `ΔE = ${kettleE.toLocaleString('en-GB').replace(/,/g, ' ')} J (504 kJ)`]] },
  qc: 'An aluminium pan of mass 2.0 kg is heated by 25 °C. c(aluminium) = 900 J/kg °C. Calculate the energy transferred.',
  notes: 'QUICK CHECK ANSWER: ΔE = 2.0 × 900 × 25 = 45 000 J.\nΔE = mcΔθ is on the J260 equation sheet (GIVEN). Values: water 4200, ice 2100, aluminium 900, iron 450, copper 385 J/kg °C (typical data-book values used in GCSE papers). Bars drawn to scale (bar length ∝ c).',
}), 'P6.1.6–7 Specific heat capacity');

// ======================= 16 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('P6.1.5')}–${sp('P6.1.7')} • internal energy and specific heat capacity`, [
  { q: 'What is meant by the **internal energy** of a substance?', marks: 1, ms: 'The total kinetic and potential energy of all its particles (1).' },
  { q: 'Define **specific heat capacity**.', marks: 2, ms: 'Energy needed to raise the temperature of 1 kg of a substance (1); by 1 °C (1).' },
  { q: 'Calculate the energy needed to heat **2.0 kg** of water from **15 °C** to **65 °C**. (c = 4200 J/kg °C)', marks: 2, ms: 'ΔE = 2.0 × 4200 × 50 (1); = 420 000 J (1).' },
  { q: 'A **0.50 kg** metal block is given **9000 J** of energy. Its temperature rises by **20 °C**. Calculate its specific heat capacity.', marks: 3, ms: 'c = ΔE ÷ (m × Δθ) (1); = 9000 ÷ (0.50 × 20) (1); = 900 J/kg °C (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 17 PAG P5 METHOD =======================
reg(D.contentSlide({
  title: 'PAG P5: specific heat capacity of a metal',
  subtitle: `Specification ${sp('P6.1.7')} • heat a 1.0 kg aluminium block with an electric heater`,
  tag: 'PAG P5', pag: 'PAG P5', caption: 'block in insulation, with an immersion heater and a thermometer; circuit to measure power',
  draw: (s, p) => {
    // insulated block
    box(s, 0.75, 2.75, 2.3, 2.55, 'F3E3B3', 'C9A95A', { lw: 1 });
    for (let i = 0; i < 9; i++) line(s, 0.8 + i * 0.27, 2.78, 0.75 + i * 0.27 + 0.25, 3.0, 'C9A95A', 0.5);
    box(s, 0.98, 3.0, 1.84, 2.1, 'C2C8D2', '6B7385', { lw: 1.25 });
    label(s, 0.98, 4.6, 1.84, 'aluminium block 1.0 kg', { h: 0.45, size: 10, bold: true, color: C.ink });
    // heater
    box(s, 1.3, 2.25, 0.22, 2.1, '4A5262', '2E3442');
    line(s, 1.36, 2.25, 1.36, 1.85, C.ink, 1.25); line(s, 1.46, 2.25, 1.46, 1.85, C.ink, 1.25);
    label(s, 0.45, 1.6, 1.2, 'heater', { size: 10.5, bold: true, align: 'right' });
    // thermometer
    thermometer(s, 2.4, 1.55, 2.6, 0.5);
    label(s, 2.55, 1.6, 1.0, 'thermometer', { size: 10.5, bold: true, align: 'left' });
    label(s, 0.75, 5.35, 2.3, 'insulation (lagging)', { size: 10, italic: true, color: '8A6A20' });
    // circuit (schematic)
    const L = 3.9, R = 6.2, Ty = 1.85, By = 3.25, Vy = 3.95;
    D.comp(s, 'battery', L, Ty, R, Ty, { label: '12 V d.c. supply', lw: 1.8 });
    D.comp(s, 'ammeter', R, Ty, R, By);
    D.comp(s, 'resistor', R, By, L, By, { label: 'heater (in the block)', side: 1, off: 0.32, lw: 2.0 });
    D.comp(s, 'wire', L, By, L, Ty);
    D.wire(s, [[4.5, By], [4.5, Vy], [5.6, Vy], [5.6, By]]);
    D.comp(s, 'voltmeter', 4.5, Vy, 5.6, Vy);
    D.dot(s, 4.5, By); D.dot(s, 5.6, By);
    const rows = [[HDR('Measure'), HDR('With')], ['mass of block, m', 'balance'], ['p.d. V and current I', 'voltmeter, ammeter'], ['time t', 'stopwatch'], ['temperature θ', 'thermometer']]
      .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 3.35, y: 4.3, w: 3.0, colW: [1.6, 1.4], rowH: 0.27, fontFace: 'Calibri', fontSize: 10, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Method',
  lines: [
    'Measure the **mass** of the block. Wrap it in **insulation**. Put the heater and thermometer in the holes (a drop of water helps thermal contact).',
    'Record the starting temperature. Switch on and start the stopwatch. Record **V** and **I**.',
    'Record the temperature every **60 s** for 10 minutes.',
    `Energy supplied: **E = P × t** with **P = V × I** (both ${ST('PET')}), or read a joulemeter.`,
    '**c = E ÷ (m × Δθ)**.',
  ],
  size: 10.5,
  worked: { head: 'Variables and safety', q: '',
    steps: [['Independent', 'energy supplied (time heated)'], ['Dependent', 'temperature of the block'], ['Control', 'mass of block, power (V and I), insulation'], ['Safety', 'heater and block get hot: do not touch, let cool; low-voltage supply']], size: 10.5 },
  workedH: 2.0,
  qc: 'Why is the block wrapped in insulation? What would happen to the calculated value of c without it?',
  notes: 'QUICK CHECK ANSWER: To reduce energy transferred to the surroundings. Without it more energy is lost, the temperature rise is smaller, so the calculated c = E ÷ (mΔθ) is too big.\nPAG P5 (OCR Energy group) example: "Determining the specific heat capacity of a metal". Its link to P6.1 in J260 is UNVERIFIED (see SPEC_P6_1.md). Water can also be used (heater in a beaker of water, stir).\nCircuit: ammeter in series with the heater, voltmeter in parallel across it.',
}), 'PAG P5 SHC: method');

// ======================= 18 PAG P5 RESULTS =======================
const GC = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 600, ymin: 10, ymax: 50, xstep: 100, ystep: 5, minor: 2, xlabel: 'time / s', ylabel: 'temperature / °C', fmt: v => String(Math.round(v)) };
{
  const s = D.contentHeader('PAG P5: results and evaluation', `Specification ${sp('P6.1.7')} • 1.0 kg aluminium block, heater at 12.0 V and 4.0 A`, { pag: 'PAG P5', tag: 'PAG P5' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample results plotted to scale (y-axis starts at 10 °C); best-fit line from 60 s');
  axes(s, GC);
  plotLine(s, GC, [[45, icpt + slope * 45], [600, icpt + slope * 600]], C.blue, 2);
  points(s, GC, pT.map((t, i) => [t, pTheta[i]]));
  label(s, px(GC, 60) + 0.1, py(GC, 18.3), 2.6, 'slow start: the heater warms up first', { size: 10.5, bold: true, color: C.red, align: 'left' });
  label(s, px(GC, 220), py(GC, 45), 1.9, `gradient ≈ ${sf(slope, 2)} °C/s`, { size: 10.5, bold: true, color: C.blue, align: 'left' });
  const hd = [HDR('t / s'), ...pT.map(t => HDR(String(t)))];
  const r2 = [{ text: 'θ / °C', options: { bold: true, fill: { color: C.cardBlue } } }, ...pTheta.map(v => ({ text: v.toFixed(1), options: { fill: { color: C.cardBlue } } }))];
  s.addTable([hd, r2], { x: 6.8, y: 1.3, w: 6.08, colW: [0.78, ...Array(11).fill(0.4818)], rowH: 0.34, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 2.2, 6.08, 2.0, 'Worked calculation of c', '', [
    ['Power', `P = V × I = 12.0 × 4.0 = ${pP} W`],
    ['Energy', `E = P × t = ${pP} × 600 = ${pE.toLocaleString('en-GB').replace(/,/g, ' ')} J`],
    ['Δθ', `${pTheta[10].toFixed(1)} − ${pTheta[0].toFixed(1)} = ${pDT} °C`],
    ['Answer', `c = ${pE} ÷ (1.0 × ${pDT}) ≈ ${sf(pC, 2)} J/kg °C`]], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.33, 6.08, 1.92, 'Evaluation: why is c too big?', '', [
    ['Data book', `c(aluminium) = ${cAl} J/kg °C: our value is about ${Math.round((pC - cAl) / cAl * 100)}% high`],
    ['Energy lost', 'to the air and bench, and to warm the heater/thermometer → Δθ too small'],
    ['Improve', 'more insulation and a lid; good thermal contact; start from room temperature'],
    ['Answer', 'losses always make the measured c larger than the true value']], { size: 10.5 });
  D.quickCheck(s, 'Without losses, how much would the temperature of the block have risen in 600 s? (c = 900 J/kg °C)');
  D.notes(s, `QUICK CHECK ANSWER: Δθ = E ÷ (m × c) = 28 800 ÷ (1.0 × 900) = 32 °C (it actually rose 26.5 °C).\nStretch (gradient method): c = P ÷ (m × gradient) = 48 ÷ (1.0 × ${slope.toFixed(4)}) ≈ ${Math.round(cGrad)} J/kg °C; it ignores the slow start, so is closer to 900. Line of best fit = least squares through the 60–600 s points (node).\nP = V × I and P = E ÷ t are RECALL equations in J260.`);
  reg(s, 'PAG P5 SHC: results');
}

// ======================= 19 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('P6.1.7')} • PAG P5 specific heat capacity`, [
  { q: 'In the specific heat capacity practical, a joulemeter is not available. Which measurements are needed to work out the **energy supplied** by the heater?', marks: 2, ms: 'Potential difference and current (1); time (1). (E = V × I × t.)' },
  { q: 'A heater of power **40 W** is switched on for **300 s**. Calculate the energy it transfers.', marks: 2, ms: 'E = P × t = 40 × 300 (1); = 12 000 J (1).' },
  { q: 'A student\'s value for the specific heat capacity of aluminium is **higher** than the data-book value. Explain why.', marks: 2, ms: 'Energy is lost to the surroundings / used to heat the heater or thermometer (1); so the temperature rise is smaller than it should be, so c = E ÷ (mΔθ) is larger (1).' },
  { q: 'Suggest **two** ways to make the result more accurate.', marks: 2, ms: 'Any two (1 each): more insulation / lagging; lid on top; oil or water in the holes for good thermal contact; thermometer with better resolution or data logger; use gradient of the linear part of the graph.' },
]);
reg(R5.s, 'Recap 5');

// ======================= 20 SPECIFIC LATENT HEAT =======================
reg(D.contentSlide({
  title: 'Specific latent heat',
  subtitle: `Specification ${sp('P6.1.6')}, ${sp('P6.1.8')} • energy to change the state of 1 kg, with no change in temperature`,
  tag: 'P6.1.8', caption: 'latent heats of water drawn to scale (kJ/kg)',
  draw: (s, p) => {
    eqBadge(s, 0.8, 1.5, 5.4, 'SLH');
    label(s, 0.8, 2.15, 5.4, 'Energy to change the state of 1 kg of water', { size: 11, bold: true });
    hbar(s, 2.25, 2.5, 3.2, Lf / 1000, Lv / 1000, '7FB2D9', 'fusion (melt)', '334 kJ/kg');
    hbar(s, 2.25, 2.95, 3.2, Lv / 1000, Lv / 1000, C.red, 'vaporisation (boil)', '2260 kJ/kg');
    label(s, 2.25, 3.3, 3.2, '', { h: 0.02 });
    const rows = [[HDR(''), HDR('Specific heat capacity, c'), HDR('Specific latent heat, L')],
      ['What changes', 'temperature', 'state'], ['Temperature', 'rises or falls', 'constant'], ['Equation (given)', 'ΔE = m × c × Δθ', 'E = m × L'], ['Unit', 'J/kg °C', 'J/kg']]
      .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 0.7, y: 3.6, w: 5.6, colW: [1.5, 2.05, 2.05], rowH: 0.32, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Latent heat',
  lines: [
    '**Specific latent heat (L)**: the energy needed to change the state of **1 kg** of a substance **with no change in temperature**.',
    `**E = m × L**  (${ST('SLH')}). Units: J, kg, J/kg.`,
    '**Fusion**: solid ↔ liquid. **Vaporisation**: liquid ↔ gas. The same energy is released when it freezes or condenses.',
    'L(vaporisation) is much bigger: the particles must be pulled **completely apart**.',
  ],
  worked: { head: 'Worked example', q: 'Calculate the energy needed to melt 0.25 kg of ice at 0 °C. L(fusion) = 334 000 J/kg.',
    steps: [['Equation', 'E = m × L'], ['Substitute', 'E = 0.25 × 334 000'], ['Check', 'temperature stays at 0 °C, so no Δθ'], ['Answer', 'E = 83 500 J (83.5 kJ)']] },
  qc: 'Calculate the energy needed to boil away 0.40 kg of water at 100 °C. L(vaporisation) = 2 260 000 J/kg.',
  notes: 'QUICK CHECK ANSWER: E = 0.40 × 2 260 000 = 904 000 J (904 kJ).\nE = mL is on the J260 equation sheet (GIVEN). Common error: using ΔE = mcΔθ during a change of state. Bars to scale: 2260 ÷ 334 ≈ 6.8 times longer.',
}), 'P6.1.6, P6.1.8 Specific latent heat');

// ======================= 21 HEATING CURVE =======================
const GH = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 700, ymin: -40, ymax: 140, xstep: 100, ystep: 20, minor: 2, xlabel: 'time / s', ylabel: 'temperature / °C', fmt: v => String(Math.round(v)) };
reg(D.contentSlide({
  title: 'Heating curves',
  subtitle: `Specification ${sp('P6.1.5')}, ${sp('P6.1.8')} • flat sections (plateaus) show a change of state`,
  tag: 'P6.1.8', caption: 'to scale: 0.20 kg of ice at −30 °C, 1000 W heater, no energy losses',
  draw: (s, p) => {
    axes(s, GH);
    line(s, px(GH, 0), py(GH, 0), px(GH, 700), py(GH, 0), C.ink, 1, { dash: 'dash' });
    const pts = [[0, -30], [cum[0], 0], [cum[1], 0], [cum[2], 100], [cum[3], 100], [cum[4], 120]];
    // shade plateaus
    box(s, px(GH, cum[0]), py(GH, 0) - 0.06, px(GH, cum[1]) - px(GH, cum[0]), 0.12, '7FB2D9', null, { tr: 40 });
    box(s, px(GH, cum[2]), py(GH, 100) - 0.06, px(GH, cum[3]) - px(GH, cum[2]), 0.12, 'F5A742', null, { tr: 40 });
    plotLine(s, GH, pts, C.red, 2.5);
    label(s, px(GH, 15), py(GH, -22), 1.6, 'ice warms', { size: 10.5, bold: true, color: C.ink, align: 'left' });
    label(s, px(GH, 88), py(GH, 0) + 0.04, 1.5, '← melting (0 °C)', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, px(GH, 125), py(GH, 52), 1.5, 'water warms', { size: 10.5, bold: true, color: C.ink, align: 'left' });
    label(s, px(GH, 250), py(GH, 100) - 0.33, 2.2, 'boiling (100 °C)', { size: 10.5, bold: true, color: C.orange });
    label(s, px(GH, 520), py(GH, 128) - 0.1, 1.2, 'steam', { size: 10.5, bold: true, color: C.ink, align: 'right' });
    label(s, px(GH, 330), py(GH, 30), 1.9, 'boiling takes 452 s; melting 66.8 s', { h: 0.45, size: 10, italic: true, color: C.grey, align: 'left', valign: 'top' });
  },
  head: 'Reading a heating curve',
  lines: [
    '**Sloping** sections: one state is warming up. Energy increases the **kinetic** energy of particles (ΔE = mcΔθ).',
    '**Flat** sections (plateaus): a **change of state** at the melting or boiling point. Energy breaks bonds (**potential** energy) (E = mL).',
    'The boiling plateau is **longer** than the melting one because L(vaporisation) > L(fusion).',
    'A **cooling curve** has the same shape in reverse: plateaus at the freezing and condensing points.',
  ],
  size: 11,
  worked: { head: 'Stretch: L from a heating curve', q: 'The melting plateau runs from 12.6 s to 79.4 s. P = 1000 W, m = 0.20 kg.',
    steps: [['Time', `79.4 − 12.6 = ${seg[1]} s`], ['Energy', `E = P × t = 1000 × ${seg[1]} = 66 800 J`], ['Equation', 'L = E ÷ m = 66 800 ÷ 0.20'], ['Answer', 'L(fusion) = 334 000 J/kg']], size: 10.5 },
  qc: 'Why does the temperature stay at 100 °C for 452 s even though the heater is still supplying energy?',
  notes: `QUICK CHECK ANSWER: The energy is used to break the bonds between water particles / increase their potential energy to change liquid into gas (latent heat), not to make them move faster, so the temperature does not rise.\nCurve computed in node: ice 0.20 × 2100 × 30 / 1000 = 12.6 s; melting 0.20 × 334 000 / 1000 = 66.8 s; water 0.20 × 4200 × 100 / 1000 = 84 s; boiling 0.20 × 2 260 000 / 1000 = 452 s; steam 0.20 × 2000 × 20 / 1000 = 8 s. Totals at 12.6, 79.4, 163.4, 615.4, 623.4 s. Slopes differ because c differs (ice and steam warm about twice as fast per joule as water).`,
}), 'P6.1.5, P6.1.8 Heating curves');

// ======================= 22 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('P6.1.6')}, ${sp('P6.1.8')} • specific latent heat and heating curves`, [
  { q: 'Define **specific latent heat of vaporisation**.', marks: 2, ms: 'Energy needed to change 1 kg of a liquid into a gas / vapour (1); with no change in temperature (1).' },
  { q: 'Calculate the energy needed to melt **0.30 kg** of ice at 0 °C. (L = 334 000 J/kg)', marks: 2, ms: 'E = m × L = 0.30 × 334 000 (1); = 100 200 J (accept 1.0 × 10⁵ J) (1).' },
  { q: 'Explain why a heating curve has a **flat** section while a solid is melting.', marks: 2, ms: 'Energy is used to break bonds / increase the potential energy of particles (1); not to increase their kinetic energy, so the temperature does not change (1).' },
  { q: 'On a heating curve for water, the boiling section is longer than the melting section. Explain why.', marks: 1, ms: 'Specific latent heat of vaporisation is (much) greater than of fusion / more energy needed to separate particles completely (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Particle model', 'Matter is made of tiny particles; their arrangement and motion explain the states.'],
  ['Density (ρ)', 'Mass per unit volume: ρ = m ÷ V, in kg/m³ or g/cm³.'],
  ['Change of state', 'Melting, freezing, evaporating/boiling, condensing or sublimating.'],
  ['Sublimation', 'A solid changing straight into a gas without melting.'],
  ['Conservation of mass', 'In a change of state no particles are made or lost, so mass stays the same.'],
  ['Physical change', 'No new substance; reversing it recovers the original material and properties.'],
  ['Chemical change', 'Atoms rearranged into new substances with different properties.'],
  ['Displacement', 'Finding the volume of an object from the water it pushes out.'],
  ['Internal energy', 'Total kinetic and potential energy of the particles in a system.'],
  ['Temperature', 'Rises when the particles gain kinetic energy (move faster).'],
  ['Specific heat capacity', 'Energy to raise the temperature of 1 kg by 1 °C (J/kg °C).'],
  ['Specific latent heat', 'Energy to change the state of 1 kg with no temperature change (J/kg).'],
  ['Latent heat of fusion', 'For melting or freezing (solid ↔ liquid).'],
  ['Latent heat of vaporisation', 'For boiling or condensing (liquid ↔ gas).'],
  ['Heating curve', 'Graph of temperature against time; flat sections show changes of state.'],
  ['Insulation', 'Reduces energy transfer to the surroundings in PAG P5.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= EQUATIONS SUMMARY =======================
reg(D.equationsSlide([['RHO', 'P6.1.4'], ['SHC', 'P6.1.7'], ['SLH', 'P6.1.8'], ['PET', 'PAG P5'], ['PVI', 'PAG P5']], {
  subtitle: 'Recall or given? Check against the J260 equation sheet',
  qc: 'Which of these equations must you learn by heart? Which two can you look up on the equation sheet?',
  notes: 'QUICK CHECK ANSWER: Learn: ρ = m ÷ V, P = E ÷ t, P = V × I. Given on the sheet: ΔE = mcΔθ and E = mL.\nStatus follows the GCSE subject content equation lists used by J260 (density, power = energy/time and power = p.d. × current are recall; ΔE = mcΔθ and E = mL are on the sheet). UNVERIFIED against the current J260 equation sheet wording: check before printing.',
}), 'Summary: equations');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student uses an electric kettle to heat **0.50 kg** of water from **20 °C** to its boiling point, **100 °C**. Specific heat capacity of water = 4200 J/kg °C. Specific latent heat of vaporisation of water = 2 260 000 J/kg.', [
  { l: 'a', q: 'Describe the arrangement and movement of the particles in liquid water and in steam. Use your answer to explain why steam is much less dense than water.', marks: 3, ms: 'Water: particles touching/close together, random arrangement, move past each other (1); steam: particles far apart, moving fast in random directions (1); so the same mass takes up a much larger volume, so density = m ÷ V is much smaller (1).', h: 1.35 },
  { l: 'b', q: 'Calculate the energy needed to heat the water from 20 °C to 100 °C.', marks: 2, ms: 'ΔE = 0.50 × 4200 × 80 (1); = 168 000 J (1).' },
  { l: 'c', q: 'The kettle has a power of **2000 W**. Calculate the minimum time it takes to heat the water to 100 °C.', marks: 2, ms: 't = E ÷ P = 168 000 ÷ 2000 (1); = 84 s (1). ECF from (b).' },
  { l: 'd', q: 'The kettle does not switch off, and **0.050 kg** of water boils away. Calculate the energy needed.', marks: 2, ms: 'E = m × L = 0.050 × 2 260 000 (1); = 113 000 J (1).' },
  { l: 'e', q: 'Explain why the temperature of the water stays at 100 °C while it is boiling.', marks: 2, ms: 'Energy is used to break bonds / separate particles / increase potential energy (1); not to increase kinetic energy, so temperature stays the same (1).' },
  { l: 'f', q: 'The steam condenses on a cold window. Explain why condensing is a **physical** change, and what happens to the mass.', marks: 2, ms: 'No new substance is made / the water is the same substance and can be turned back into steam (1); the mass of water formed equals the mass of steam (mass conserved, particles not created or destroyed) (1).' },
], 13, { subtitle: `Specification ${sp('P6.1.1')}–${sp('P6.1.8')} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the change of state when a solid turns straight into a gas.', marks: 1, ms: 'Sublimation / sublimating (1).' },
  { n: '2', q: 'Explain why **100 g** of ice melts to give exactly **100 g** of water.', marks: 2, ms: 'The particles are only rearranged / same particles (1); no particles are added or lost, so mass is conserved (1).' },
  { n: '3', q: 'A stone of mass **54 g** displaces **20 cm³** of water. Calculate its density in g/cm³ **and** in kg/m³.', marks: 2, ms: 'ρ = 54 ÷ 20 = 2.7 g/cm³ (1); = 2700 kg/m³ (1).' },
  { n: '4', q: 'Calculate the energy needed to warm **0.80 kg** of oil by **30 °C**. (c = 2000 J/kg °C)', marks: 2, ms: 'ΔE = 0.80 × 2000 × 30 (1); = 48 000 J (1).' },
  { n: '5', q: 'Explain the difference between **specific heat capacity** and **specific latent heat**.', marks: 2, ms: 'Specific heat capacity: energy to raise temperature of 1 kg by 1 °C (1); specific latent heat: energy to change the state of 1 kg with no temperature change (1).' },
  { n: '6', q: '**Stretch:** a **0.20 kg** ice cube at 0 °C melts and the water warms to **20 °C**. Calculate the total energy. (L = 334 000 J/kg; c = 4200 J/kg °C)', marks: 2, ms: '0.20 × 334 000 = 66 800 J and 0.20 × 4200 × 20 = 16 800 J (1); total = 83 600 J (1).' },
  { n: '7', q: 'Describe how a student could find the **specific heat capacity** of a metal block. Include the equipment, the measurements, how to calculate c, and how to make the result accurate.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Equipment: metal block (e.g. 1 kg aluminium) with holes, immersion heater, thermometer, low-voltage supply, ammeter and voltmeter (or joulemeter), stopwatch, balance, insulation.',
    'Measure the mass of the block with a balance.',
    'Record the starting temperature; switch on the heater and start the stopwatch.',
    'Record p.d. and current (power P = V × I) or joulemeter readings; record the temperature after a measured time (e.g. every minute for 10 minutes).',
    'Energy E = P × t (or joulemeter); Δθ = final − starting temperature.',
    'c = E ÷ (m × Δθ); or plot temperature against time / energy and use the gradient.',
    'Accuracy: insulate the block; put water or oil in the thermometer hole for good thermal contact; use a lid; read the thermometer at eye level; repeat and average.',
    'Energy losses make Δθ smaller, so the measured c is bigger than the true value.',
  ], {
    l3: 'Describes a full method including the measurements AND explains how to calculate c from them AND gives at least one way to improve accuracy with a reason.',
    l2: 'Describes a method with most measurements AND EITHER how to calculate c OR a way to improve accuracy.',
    l1: 'Gives a simple description of heating the block and measuring the temperature OR names some equipment.',
  });
}
D.homework('All students answer all questions. Q6 is a stretch calculation.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 8); assert.strictEqual(R5.total, 8); assert.strictEqual(R6.total, 7);
const out = path.join(__dirname, 'OCR21C_P6.1_EnergyTransformsMatter_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
