// build_T3.js — Edexcel GCSE Physics 1PH0 Topic 3 Conservation of energy (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T3.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 3,
  title: 'Conservation of energy',
  shortTitle: 'T3',
  subtitle: 'Energy stores, GPE, KE, efficiency and energy resources',
  specRange: '3.1–3.14',
  pOnly: [], // no physics-only statements found: Topic 3 is also in Combined Science 1SC0
  paper: 'Paper 1',
  keywords: ['Energy stores', 'GPE', 'Kinetic energy', 'Sankey diagrams', 'Efficiency', 'Energy resources'],
};
const D = T.init(DECK);
const { line, arrow, forceArrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const sp = D.spec;
const g = 10; // N/kg (Edexcel value)
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmtN = v => v.toLocaleString('en-GB').replace(/,/g, ' ');

// ======================= DECK-SPECIFIC: Topic 3 equations (added to the shared table at run time) =======================
Object.assign(T.EQS, {
  GPE: { eq: 'ΔGPE = m × g × Δh', words: 'change in gravitational potential energy (J) = mass (kg) × gravitational field strength (N/kg) × change in vertical height (m)', status: 'recall' },
  KE: { eq: 'KE = ½ × m × v²', words: 'kinetic energy (J) = ½ × mass (kg) × (speed (m/s))²', status: 'recall' },
  eff: { eq: 'efficiency = useful ÷ total', words: 'efficiency = useful energy transferred by the device (J) ÷ total energy supplied to the device (J); × 100 for a percentage', status: 'recall' },
});

// ======================= DECK-SPECIFIC drawing helpers =======================
const STORE = { GPE: C.blue, KE: C.green, TH: C.red, CH: 'B8730A', EL: '7B4FB8', IN: '7C8AA8' };
// small rounded "chip" with centred text
function chip(s, x, y, w, h, txt, fill, o = {}) {
  box(s, x, y, w, h, fill, o.border || null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: o.lw || 1 });
  label(s, x + 0.04, y, w - 0.08, txt, { h, size: o.size || 10.5, bold: true, color: o.color || C.white });
}
// right-pointing arrowhead with its tip at x + L, centred on yc, base B
function headRight(s, x, yc, L, B, color) {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: x + L / 2 - B / 2, y: yc - L / 2, w: B, h: L, rotate: 90, fill: { color }, line: { color, width: 0.5 } });
}
function headDown(s, xc, y, L, B, color) {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: xc - B / 2, y, w: B, h: L, flipV: true, fill: { color }, line: { color, width: 0.5 } });
}
// Sankey diagram drawn to scale. k = inches per joule. branches[0] = useful (straight on), the rest bend down.
function sankey(s, x0, yTop, k, input, branches, o = {}) {
  const tot = branches.reduce((a, b) => a + b.v, 0);
  assert(Math.abs(tot - input.v) < 1e-9, 'Sankey: outputs must add up to the input');
  const inLen = o.inLen || 1.6, outLen = o.outLen || 1.6, gap = o.gap || 0.25, yEnd = o.yEnd || yTop + input.v * k + 0.8;
  const xJ = x0 + inLen, Hin = input.v * k;
  box(s, x0, yTop, inLen, Hin, input.color || STORE.IN, null);
  label(s, x0 + 0.05, yTop, inLen - 0.1, input.label, { h: Hin, size: o.fs || 10.5, bold: true, color: C.white });
  // useful
  const b0 = branches[0], h0 = b0.v * k;
  box(s, xJ, yTop, outLen, h0, b0.color || STORE.KE, null);
  headRight(s, xJ + outLen, yTop + h0 / 2, 0.32, h0 + 0.24, b0.color || STORE.KE);
  label(s, xJ + outLen + 0.38, yTop + h0 / 2 - 0.25, o.uw || 1.3, b0.label, { h: 0.5, size: o.fs || 10.5, bold: true, color: b0.color || STORE.KE, align: 'left' });
  // wasted: last (lowest) branch turns first
  let y = yTop + h0;
  const ys = branches.slice(1).map(b => { const r = y; y += b.v * k; return r; });
  let xt = xJ;
  for (let i = branches.length - 1; i >= 1; i--) {
    const b = branches[i], h = b.v * k, yi = ys[i - 1];
    box(s, xJ, yi, xt - xJ + h, h, b.color || C.red, null);
    box(s, xt, yi, h, yEnd - yi, b.color || C.red, null);
    headDown(s, xt + h / 2, yEnd, 0.3, h + 0.22, b.color || C.red);
    label(s, xt + h / 2 - 0.65, yEnd + 0.32, 1.3, b.label, { h: 0.46, size: o.fs || 10.5, bold: true, color: b.color || C.red });
    xt += h + gap;
  }
  return { xJ, yEnd };
}
// vertical energy bars: vals [[name, value, color]]; base yBase, full height Hmax for value max
function bars(s, x, yBase, Hmax, max, vals, o = {}) {
  const bw = o.bw || 0.3, gp = o.gap || 0.08;
  vals.forEach(([nm, v, col], i) => {
    const bx = x + i * (bw + gp), h = v / max * Hmax;
    if (h > 0.001) box(s, bx, yBase - h, bw, h, col, null);
    if (o.values) label(s, bx - 0.2, yBase - h - 0.22, bw + 0.4, o.values[i], { size: 10, bold: true, color: col, h: 0.2 });
    label(s, bx - 0.1, yBase + 0.02, bw + 0.2, nm, { size: 10, bold: true, color: col, h: 0.2 });
  });
  line(s, x - 0.05, yBase, x + vals.length * (bw + gp) - gp + 0.05, yBase, C.ink, 1);
}
// simple icons
function sunIcon(s, cx, cy, r) {
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(s, cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r * 1.2, cx + Math.cos(a) * r * 1.7, cy + Math.sin(a) * r * 1.7, 'E39A2F', 2.5); }
  s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: 'F5C342' }, line: { color: 'E39A2F', width: 1 } });
}
function turbineIcon(s, cx, yb, h) {
  box(s, cx - 0.04, yb - h, 0.08, h, 'B0B7C6', '6B7385', { lw: 0.5 });
  const hy = yb - h, L = h * 0.55;
  [90, 210, 330].forEach(d => { const a = d * Math.PI / 180; line(s, cx, hy, cx + Math.cos(a) * L, hy - Math.sin(a) * L, '6B7385', 3.5); });
  s.addShape(SH.OVAL, { x: cx - 0.06, y: hy - 0.06, w: 0.12, h: 0.12, fill: { color: '4A5262' }, line: { color: '4A5262' } });
}
function wavesIcon(s, x, y, w, col = C.waterDark) {
  for (let r = 0; r < 2; r++) for (let i = 0; i < 4; i++) {
    const xx = x + i * w / 4, yy = y + r * 0.18;
    s.addShape(SH.ARC, { x: xx, y: yy, w: w / 4, h: 0.2, angleRange: [180, 360], line: { color: col, width: 2 }, fill: { type: 'none' } });
  }
}
function leafIcon(s, cx, cy, sz) {
  s.addShape(SH.OVAL, { x: cx - sz / 2, y: cy - sz / 4, w: sz, h: sz / 2, rotate: -35, fill: { color: '5FA35F' }, line: { color: '2E7D32', width: 1 } });
  line(s, cx - sz / 2, cy + sz / 3, cx + sz * 0.35, cy - sz * 0.25, '2E7D32', 1.5);
}
function damIcon(s, x, yb, w, h) {
  box(s, x, yb - h * 0.85, w * 0.45, h * 0.85, C.water, null);
  s.addShape(SH.TRAPEZOID, { x: x + w * 0.42, y: yb - h, w: w * 0.3, h, fill: { color: 'A9AFBB' }, line: { color: '6B7385', width: 1 } });
  box(s, x + w * 0.72, yb - h * 0.25, w * 0.28, h * 0.25, C.water, null);
}
function atomIcon(s, cx, cy, r) {
  [0, 60, 120].forEach(a => s.addShape(SH.OVAL, { x: cx - r, y: cy - r * 0.38, w: 2 * r, h: r * 0.76, rotate: a, fill: { type: 'none' }, line: { color: '7B4FB8', width: 1.5 } }));
  s.addShape(SH.OVAL, { x: cx - 0.07, y: cy - 0.07, w: 0.14, h: 0.14, fill: { color: C.red }, line: { color: C.red } });
}
function chimneyIcon(s, x, yb, w, h) {
  box(s, x, yb - h * 0.45, w, h * 0.45, '8C96A8', '4A5262', { lw: 0.75 });
  box(s, x + w * 0.65, yb - h, w * 0.18, h * 0.55, '6B7385', '4A5262', { lw: 0.75 });
  [0, 1, 2].forEach(i => s.addShape(SH.OVAL, { x: x + w * 0.62 + i * 0.12, y: yb - h - 0.18 - i * 0.12, w: 0.2, h: 0.16, fill: { color: 'C9CED8' }, line: { color: 'A9AFBB', width: 0.5 } }));
}
// beaker of hot water with lid and thermometer; wrap = insulation colour (or null)
function beaker(s, x, yb, w, h, wrap, txt) {
  if (wrap) box(s, x - 0.1, yb - h + 0.05, w + 0.2, h - 0.05, wrap, '8A6A3A', { lw: 0.75, tr: 10 });
  if (wrap) for (let i = 1; i < 6; i++) line(s, x - 0.1, yb - h + 0.05 + i * (h - 0.05) / 6, x + w + 0.1, yb - h + 0.05 + i * (h - 0.05) / 6, 'FFFFFF', 0.75, { dash: 'dash' });
  const wb = { x: x + 0.04, y: yb - h * 0.72, w: w - 0.08, h: h * 0.72 - 0.03 };
  box(s, wb.x, wb.y, wb.w, wb.h, C.water, null);
  line(s, x, yb - h, x, yb, C.ink, 2); line(s, x + w, yb - h, x + w, yb, C.ink, 2); line(s, x, yb, x + w, yb, C.ink, 2);
  box(s, x - 0.06, yb - h - 0.1, w + 0.12, 0.1, '4A5262', null); // lid
  const tx = x + w / 2;
  box(s, tx - 0.035, yb - h - 0.75, 0.07, h + 0.55, 'F4F6FA', '6B7385', { lw: 0.5 });
  box(s, tx - 0.015, yb - h * 0.6, 0.03, h * 0.45, C.red, null);
  s.addShape(SH.OVAL, { x: tx - 0.06, y: yb - 0.25, w: 0.12, h: 0.12, fill: { color: C.red }, line: { color: C.red } });
  if (txt) label(s, x - 0.3, yb + 0.06, w + 0.6, txt, { size: 10, bold: true, h: 0.4, color: C.ink, valign: 'top' });
}
const lead = (s, x, y, x2, y2, t, w, al = 'left') => { line(s, x, y, x2, y2, C.grey, 0.75); label(s, al === 'right' ? x2 - w - 0.05 : x2 + 0.05, y2 - 0.14, w, t, { size: 10.5, bold: true, align: al, color: C.ink }); };
const practicalPill = s => D.pill(s, W_ - 0.45 - 2.1, 0.32, 'SUGGESTED PRACTICAL', C.orange, 2.1);
const W_ = T.W;

// ======================= CALCULATIONS (asserted) =======================
// starter
calc('starter W = 5.0*10', 5.0 * g, 50, 1e-12);
calc('starter 2.5 kJ', 2.5 * 1000, 2500, 1e-9); calc('starter 450 g', 450 / 1000, 0.45, 1e-12);
calc('starter speed 120/20', 120 / 20, 6, 1e-12);
// 3.4/3.6 closed system
calc('closed 70 + 30', 70 + 30, 100);
const qc6 = calc('qc6 wasted 500-350', 500 - 350, 150);
// 3.1 GPE
const gpe7 = calc('GPE book 2.0*10*1.5', 2.0 * g * 1.5, 30, 1e-12);
const qc7 = calc('qc7 climber h = 9000/(60*10)', 9000 / (60 * g), 15, 1e-12);
// 3.2 KE
const ke9 = calc('KE car 0.5*1200*15^2', 0.5 * 1200 * 15 ** 2, 135000, 1e-6);
const qc9 = calc('qc9 KE ball 0.5*0.40*5.0^2', 0.5 * 0.40 * 5.0 ** 2, 5.0, 1e-12);
const KEcurve = v => 0.5 * 1000 * v * v / 1000; // kJ, 1000 kg car
calc('KE 1000 kg 10 m/s', KEcurve(10), 50, 1e-9); calc('KE 1000 kg 20 m/s', KEcurve(20), 200, 1e-9); calc('KE ratio', KEcurve(20) / KEcurve(10), 4, 1e-12);
// 3.5 falling ball 0.50 kg from 5.0 m
const fbTop = calc('ball GPE top 0.50*10*5.0', 0.50 * g * 5.0, 25, 1e-12);
const fbHalf = calc('ball GPE half', 0.50 * g * 2.5, 12.5, 1e-12);
const fbV = calc('ball v = sqrt(2*25/0.50)', Math.sqrt(2 * fbTop / 0.50), 10, 1e-12);
calc('ball v = sqrt(2gh)', Math.sqrt(2 * g * 5.0), 10, 1e-12);
const qc10 = calc('qc10 v = sqrt(2*10*20)', Math.sqrt(2 * g * 20), 20, 1e-12);
// rollercoaster 500 kg; A 20 m, B 0, C 12 m, D 5 m
const RC = [['A', 20], ['B', 0], ['C', 12], ['D', 5]].map(([n, h]) => {
  const gpe = 500 * g * h, ke = 500 * g * 20 - gpe;
  return { n, h, gpe, ke, v: Math.sqrt(2 * ke / 500) };
});
assert.deepStrictEqual(RC.map(r => r.gpe), [100000, 0, 60000, 25000]);
assert.deepStrictEqual(RC.map(r => r.ke), [0, 100000, 40000, 75000]);
calc('RC vB', RC[1].v, 20, 1e-12);
calc('RC vC 3 s.f.', sf(RC[2].v, 3), 12.6, 1e-12);
calc('RC vD 3 s.f.', sf(RC[3].v, 3), 17.3, 1e-12);
// 3.3 Sankey motor 200 J
calc('motor sankey 120+60+20', 120 + 60 + 20, 200);
calc('motor wasted 60+20', 60 + 20, 80);
calc('lamp qc 100-15', 100 - 15, 85);
// 3.11 efficiency
const effMotor = calc('eff motor 120/200', 120 / 200, 0.60, 1e-12);
const effFil = calc('eff filament 10/100', 10 / 100, 0.10, 1e-12), effLED = calc('eff LED 40/100', 40 / 100, 0.40, 1e-12);
const qc19 = calc('qc19 eff kettle 1800/2000', 1800 / 2000, 0.90, 1e-12);
calc('stretch useful = 0.25*4000', 0.25 * 4000, 1000, 1e-9);
// 3.12 increasing efficiency
calc('car 25% of 100 kJ', 0.25 * 100, 25, 1e-12); calc('car 30% of 100 kJ', 0.30 * 100, 30, 1e-12);
// 3.9 house (illustrative heat-loss shares)
const HOUSE = [['roof', 25], ['walls', 35], ['windows', 10], ['floor', 15], ['draughts', 15]];
calc('house shares sum', HOUSE.reduce((a, r) => a + r[1], 0), 100);
// practical: cooling, 80 °C start, room 20 °C; T = 20 + 60 e^(-kt)
const TIMES = [0, 4, 8, 12, 16, 20];
const MATS = [['none', 0.06, C.red], ['newspaper', 0.04, 'B8730A'], ['bubble wrap', 0.03, C.blue], ['cotton wool', 0.02, C.green]];
const COOL = MATS.map(([, k]) => TIMES.map(t => Math.round(20 + 60 * Math.exp(-k * t))));
assert.deepStrictEqual(COOL, [[80, 67, 57, 49, 43, 38], [80, 71, 64, 57, 52, 47], [80, 73, 67, 62, 57, 53], [80, 75, 71, 67, 64, 60]]);
const DROP = COOL.map(r => r[0] - r[5]);
assert.deepStrictEqual(DROP, [42, 33, 27, 20]);
const rateNone = calc('rate none 42/20', 42 / 20, 2.1, 1e-12);
calc('rate cotton 20/20', 20 / 20, 1.0, 1e-12);
// electricity mix (illustrative, % of UK electricity generation)
const MIXY = ['2000', '2005', '2010', '2015', '2020', '2024'];
const MIX = [ // coal, gas, nuclear, renewables, other
  [32, 39, 23, 3, 3], [34, 38, 20, 4, 4], [28, 46, 16, 7, 3], [22, 30, 21, 25, 2], [2, 36, 16, 43, 3], [0, 32, 14, 50, 4]];
MIX.forEach((r, i) => calc(`mix ${MIXY[i]} sums to 100`, r.reduce((a, b) => a + b, 0), 100));
calc('renewables rise 2010->2020', MIX[4][3] - MIX[2][3], 36);
calc('fossil 2000', MIX[0][0] + MIX[0][1], 71); calc('fossil 2024', MIX[5][0] + MIX[5][1], 32);
// recaps
calc('R1 GPE 0.50*10*4.0', 0.50 * g * 4.0, 20, 1e-12);
calc('R2 KE 0.5*70*8.0^2', 0.5 * 70 * 8.0 ** 2, 2240, 1e-9);
calc('R2 KE ball 0.5*0.20*6.0^2', 0.5 * 0.20 * 6.0 ** 2, 3.6, 1e-12); calc('R2 h = 3.6/(0.20*10)', 3.6 / (0.20 * g), 1.8, 1e-12);
calc('R3 wasted 500-100', 500 - 100, 400);
calc('R4 eff 450/1500', 450 / 1500, 0.30, 1e-12);
calc('R5 rate 30/15', 30 / 15, 2.0, 1e-12);
// full question: 600 kg car lifted 30 m
const fqGPE = calc('FQ GPE 600*10*30', 600 * g * 30, 180000, 1e-6);
calc('FQ eff 180000/300000', fqGPE / 300000, 0.60, 1e-12);
const fqV = calc('FQ v = sqrt(2*180000/600)', Math.sqrt(2 * fqGPE / 600), 24.49489742783178, 1e-9);
calc('FQ v 2 s.f.', sf(fqV, 2), 24, 1e-12);
const fqKE = calc('FQ KE 0.5*600*22^2', 0.5 * 600 * 22 ** 2, 145200, 1e-6);
calc('FQ dissipated', fqGPE - fqKE, 34800, 1e-6);
// homework
calc('HW KE 0.5*0.060*40^2', 0.5 * 0.060 * 40 ** 2, 48, 1e-9);
calc('HW eff 60/400', 60 / 400, 0.15, 1e-12); calc('HW wasted 400-60', 400 - 60, 340);

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Conservation of Energy',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • suggested practical: thermal insulation (no Core Practical in Topic 3)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found in Topic 3' },
    { icon: '3', text: `Topic 3 of 15 • ${DECK.paper}` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 3 Conservation of energy (Paper 1). All statements 3.1–3.14 appear to be shared with Combined Science 1SC0 (no P statements found) and none are marked H (medium confidence; see SPEC_T3.md). There is no Core Practical in Topic 3: the specific heat capacity Core Practical is in Topic 14. The insulation practical here is a suggested practical. Work done (E = F × d) and power are taught in Topic 8; they are only linked here.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '3.1', text: 'Recall and use **ΔGPE = m × g × Δh** for an object raised above the ground.' },
  { code: '3.2', text: 'Recall and use **KE = ½ × m × v²** for a moving object.' },
  { code: '3.3–3.4', text: 'Draw and interpret **energy transfer diagrams**; explain **conservation of energy**.' },
  { code: '3.5–3.6', text: 'Analyse **changes in energy stores** when a system changes; **closed systems**.' },
  { code: '3.7–3.8', text: 'Explain how energy is **dissipated** and stored in **less useful** ways.' },
  { code: '3.9–3.10', text: 'Reduce unwanted transfers: **lubrication**, **thermal insulation**, wall **thickness** and **thermal conductivity**.' },
  { code: '3.11–3.12', text: 'Recall and use **efficiency = useful ÷ total energy**; explain how efficiency can be **increased**.' },
  { code: '3.13–3.14', text: 'Compare **renewable** and **non-renewable** energy resources; explain **trends** in their use.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'No HT pills: no Higher-only statements were found in Topic 3 (medium confidence). Harder rearrangements (e.g. v = √(2gh)) carry a GRADE 7–9 STRETCH pill instead. Confidence notes in SPEC_T3.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 3 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['3.1–3.2', 'Gravitational potential and kinetic energy', 'BOTH TIERS', C.blue],
    ['3.3–3.6', 'Energy diagrams, conservation, closed systems', 'BOTH TIERS', C.blue],
    ['3.7–3.8', 'Dissipation and wasted energy', 'BOTH TIERS', C.blue],
    ['3.9–3.10', 'Lubrication, insulation, conductivity', 'BOTH TIERS', C.blue],
    ['Practical', 'Suggested: comparing thermal insulators', 'SUGGESTED', C.orange],
    ['3.11–3.12', 'Efficiency and how to increase it', 'BOTH TIERS', C.blue],
    ['3.13–3.14', 'Energy resources and trends in use', 'BOTH TIERS', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 3\nConservation of energy', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.3);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 2 braking and KE (2.33) • Topic 8 work done, power, efficiency • Topic 14 specific heat capacity', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–7.',
      'Combined Science 1SC0 **Paper 5** (Physics 1) tests the same Topic 3 statements.',
      '**Recall** all three Topic 3 equations: ΔGPE = mgΔh, KE = ½mv² and efficiency.',
      'g = **10 N/kg** in every calculation.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Not physics-only:** no P statements were found, so Combined (1SC0) classes skip nothing.',
      '**No HT statements** were found in Topic 3: every slide is for both tiers. Stretch pills mark harder maths.',
      '**No Core Practical** in Topic 3; the insulation investigation is a suggested practical.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Physics-only statements: none found (medium confidence – the 1SC0 Topic 3 list appears identical). Higher-only (H): none found (medium confidence). Core Practical: none in Topic 3 (the Edexcel Core Practicals sit in Topics 2, 4, 5, 10, 14 and 15; the nearest thermal one, specific heat capacity, is in Topic 14). One Save My Exams summary lists a "core practical on conservation of energy" for Topic 3; we could not confirm it and treat it as an error, as with its wrong Topic 2 CP. Check the Pearson spec PDF before publishing; see SPEC_T3.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 2 • weight', q: 'Calculate the **weight** of a **5.0 kg** mass. g = 10 N/kg.' },
  { from: 'Topic 1 • units', q: 'Convert **2.5 kJ** into joules and **450 g** into kilograms.' },
  { from: 'Topic 2 • braking (2.33)', q: 'When a car brakes, work is done by friction. Which **energy store** does the car’s kinetic energy end up in?' },
  { from: 'KS3 • energy', q: 'Name **four** different energy stores.' },
  { from: 'Topic 2 • speed', q: 'A dog runs **120 m** in **20 s**. Calculate its average speed.' },
  { from: 'Topic 1 • rearranging', q: 'Rearrange **W = m × g** to make **m** the subject.' },
], { subtitle: 'Recall from Topics 1–2 and Key Stage 3 • 6 minutes • no notes', notes: 'ANSWERS\n1. W = 5.0 × 10 = 50 N.\n2. 2500 J; 0.45 kg.\n3. The thermal store of the brakes (and surroundings).\n4. Any four of: kinetic, gravitational potential, elastic potential, chemical, thermal, magnetic, electrostatic, nuclear.\n5. 120 ÷ 20 = 6 m/s.\n6. m = W ÷ g.' }), 'Retrieval starter');

// ======================= 5 ENERGY STORES AND TRANSFERS =======================
reg(D.contentSlide({
  title: 'Energy stores and transfers',
  subtitle: `Specification ${sp('3.3')}, ${sp('3.5')} • energy is stored in stores and moved between them by transfers`,
  tag: '3.3', caption: 'stores (boxes) and transfer pathways (arrows): a torch',
  draw: (s, p) => {
    label(s, 0.7, 1.42, 5.6, 'Energy STORES', { size: 12, bold: true, color: C.ink, align: 'left' });
    const st = [['kinetic', STORE.KE], ['gravitational potential', STORE.GPE], ['elastic potential', '2E8B8B'], ['chemical', STORE.CH],
      ['thermal', STORE.TH], ['magnetic', '5A6275'], ['electrostatic', '7B4FB8'], ['nuclear', '9C3F6E']];
    st.forEach(([n, c], i) => chip(s, 0.7 + (i % 4) * 1.42, 1.75 + Math.floor(i / 4) * 0.62, 1.32, 0.52, n, c, { size: 10.5 }));
    label(s, 0.7, 3.05, 5.6, 'Transfer PATHWAYS', { size: 12, bold: true, color: C.ink, align: 'left' });
    ['mechanically (a force)', 'electrically', 'by heating', 'by radiation'].forEach((n, i) => chip(s, 0.7 + i * 1.42, 3.38, 1.32, 0.45, n, C.white, { color: C.blue, border: C.blue, size: 10 }));
    // torch flow
    label(s, 0.7, 4.05, 5.6, 'Example: a torch', { size: 12, bold: true, color: C.ink, align: 'left' });
    chip(s, 0.75, 4.45, 1.5, 0.8, 'chemical store\nof the battery', STORE.CH, { size: 10.5 });
    arrow(s, 2.3, 4.85, 3.3, 4.85, C.blue, 2.5); label(s, 2.25, 4.5, 1.1, 'electrically', { size: 10, bold: true, color: C.blue });
    chip(s, 3.35, 4.55, 0.8, 0.6, 'lamp', '5A6275', { size: 10.5 });
    arrow(s, 4.2, 4.7, 4.75, 4.45, C.blue, 2); arrow(s, 4.2, 5.0, 4.75, 5.25, C.red, 2);
    label(s, 4.8, 4.3, 1.6, 'by radiation (light)', { size: 10, bold: true, color: C.blue, align: 'left' });
    label(s, 4.8, 5.15, 1.6, 'by heating', { size: 10, bold: true, color: C.red, align: 'left' });
    label(s, 3.3, 5.4, 3.1, '→ both end in the thermal store of the surroundings', { size: 10, italic: true, color: C.grey, align: 'left' });
  },
  head: 'Stores and pathways',
  lines: [
    'A **system** is an object or group of objects. Energy is held in **stores**.',
    'Energy moves between stores by **transfers**: mechanically (a force does work), electrically, by heating, or by radiation.',
    'Describe a change as: **store → pathway → store**.',
    'Light and sound are **transfers**, not stores: the energy ends up in a store such as the thermal store of the surroundings.',
  ],
  worked: { head: 'Worked example', q: 'Describe the energy transfer when an electric kettle boils water.',
    steps: [['Start', 'energy supplied electrically from the mains'], ['Pathway', 'the heating element transfers energy by heating'], ['End', 'thermal store of the water rises (its temperature increases)'], ['Answer', 'electrically → by heating → thermal store of the water (some to the surroundings)']], size: 10.5 },
  qc: 'A person climbs a flight of stairs. Name the store that empties and the store that fills.',
  notes: 'QUICK CHECK ANSWER: Chemical store of the person (from food) empties; gravitational potential store of the person fills (some energy also goes to the thermal store of the body/surroundings).\nStores and pathways are also met in Topic 8 (forces doing work); this slide gives just enough to analyse system changes for 3.3 and 3.5.',
}), '3.3 Energy stores and transfers');

// ======================= 6 CONSERVATION OF ENERGY AND CLOSED SYSTEMS =======================
reg(D.contentSlide({
  title: 'Conservation of energy and closed systems',
  subtitle: `Specification ${sp('3.4')}, ${sp('3.6')} • energy cannot be created or destroyed`,
  tag: '3.4', caption: 'a wind-up toy as a closed system: bars drawn to scale (1 J = 0.03 in)',
  draw: (s, p) => {
    const k = 0.03, yb = 5.15;
    s.addShape(SH.ROUNDED_RECTANGLE, { x: 0.75, y: 1.5, w: 5.5, h: 4.25, fill: { type: 'none' }, line: { color: C.blue, width: 2, dashType: 'dash' }, rectRadius: 0.08 });
    label(s, 0.9, 1.58, 5.2, 'CLOSED SYSTEM: toy + floor + air (no energy enters or leaves)', { size: 10.5, bold: true, color: C.blue });
    // before
    box(s, 1.4, yb - 100 * k, 1.0, 100 * k, '2E8B8B', null); label(s, 1.4, yb - 100 * k, 1.0, 'elastic\n100 J', { h: 100 * k, size: 11, bold: true, color: C.white });
    label(s, 1.1, yb + 0.05, 1.6, 'BEFORE: spring wound', { size: 10.5, bold: true, color: C.ink });
    arrow(s, 2.65, yb - 1.5, 3.5, yb - 1.5, C.grey, 3);
    // after: 70 J KE + 30 J thermal stacked
    box(s, 3.8, yb - 70 * k, 1.0, 70 * k, STORE.KE, null); label(s, 3.8, yb - 70 * k, 1.0, 'kinetic\n70 J', { h: 70 * k, size: 11, bold: true, color: C.white });
    box(s, 3.8, yb - 100 * k, 1.0, 30 * k, STORE.TH, null); label(s, 3.8, yb - 100 * k, 1.0, 'thermal 30 J', { h: 30 * k, size: 10, bold: true, color: C.white });
    label(s, 3.4, yb + 0.05, 1.8, 'AFTER: toy moving', { size: 10.5, bold: true, color: C.ink });
    line(s, 1.2, yb - 100 * k, 5.2, yb - 100 * k, C.ink, 1, { dash: 'dash' });
    label(s, 4.9, yb - 100 * k + 0.05, 1.3, 'total = 100 J', { size: 10.5, bold: true, color: C.ink, align: 'left' });
  },
  head: 'Energy is conserved',
  lines: [
    '**Conservation of energy:** energy can be **transferred** usefully, **stored** or **dissipated**, but it can **never be created or destroyed**.',
    'A **closed system** is one where energy transfers happen only inside it.',
    'In a closed system there is **no net change in the total energy**: what one store loses, other stores gain.',
    'So: **energy in = useful energy out + wasted energy out**.',
  ],
  worked: { head: 'Worked example', q: 'A motor is supplied with 500 J. It transfers 350 J usefully. How much energy is wasted?',
    steps: [['Idea', 'total energy is conserved'], ['Equation', 'wasted = total supplied − useful'], ['Substitute', 'wasted = 500 J − 350 J'], ['Answer', `wasted = ${qc6} J`]], size: 10.5 },
  qc: 'A student says “energy is used up when a toy car slows down”. Explain why this is wrong.',
  notes: 'QUICK CHECK ANSWER: Energy is not used up/destroyed (1); the kinetic store decreases and the thermal store of the car and surroundings increases by the same amount – it is dissipated (1).\nDiagram values: 100 J = 70 J + 30 J, asserted in node.',
}), '3.4, 3.6 Conservation and closed systems');

// ======================= 7 GPE =======================
reg(D.contentSlide({
  title: 'Gravitational potential energy: ΔGPE = m × g × Δh',
  subtitle: `Specification ${sp('3.1')} • energy stored when an object is raised above the ground`,
  tag: '3.1', caption: 'only the change in VERTICAL height counts, not the route taken',
  draw: (s, p) => {
    const yF = 5.35, yS = 2.65;
    box(s, 0.7, yF, 5.6, 0.1, '8A6A3A', null);
    // shelf
    box(s, 4.15, yS, 1.45, 0.12, 'C99A5B', '8A6A3A'); box(s, 5.52, yS, 0.08, yF - yS, 'A57E48', null);
    // ramp
    line(s, 1.0, yF, 4.15, yS + 0.06, '8A6A3A', 5);
    // boxes
    box(s, 0.95, yF - 0.5, 0.6, 0.5, C.white, C.grey, { lw: 1.25 });
    s.addShape(SH.RECTANGLE, { x: 0.95, y: yF - 0.5, w: 0.6, h: 0.5, fill: { type: 'none' }, line: { color: C.grey, width: 1.25, dashType: 'dash' } });
    label(s, 0.95, yF - 0.5, 0.6, 'start', { h: 0.5, size: 10, color: C.grey });
    box(s, 4.55, yS - 0.5, 0.6, 0.5, C.blue, '2B3F7A'); label(s, 4.55, yS - 0.5, 0.6, '2.0 kg', { h: 0.5, size: 10.5, bold: true, color: C.white });
    // routes
    arrow(s, 1.6, yF - 0.65, 3.9, yS - 0.25, C.grey, 1.5, { dash: 'dash' }); label(s, 0.75, 3.5, 1.7, 'route 1: up the ramp', { size: 10, italic: true, color: C.grey, align: 'right' });
    arrow(s, 4.85, yF - 0.1, 4.85, yS + 0.2, C.grey, 1.5, { dash: 'dash' }); label(s, 3.0, 4.4, 1.75, 'route 2: lift straight up', { size: 10, italic: true, color: C.grey, align: 'right' });
    // dimension
    arrow(s, 6.32, yF, 6.32, yS, C.red, 1.5, { tail: true });
    label(s, 5.62, (yF + yS) / 2 - 0.25, 0.64, 'Δh =\n1.5 m', { h: 0.5, size: 11, bold: true, color: C.red });
    label(s, 0.75, 1.5, 5.5, 'g = 10 N/kg on Earth', { size: 11, bold: true, color: C.blue, align: 'left' });
  },
  head: 'Gravitational potential energy',
  lines: [
    'Raising an object **increases** the energy in its **gravitational potential store**.',
    { t: '__ΔGPE = m × g × Δh__', nob: true, size: 13 },
    { t: 'ΔGPE in J • m mass in kg • g in N/kg • Δh change in vertical height in m', nob: true, size: 10.5 },
    { t: 'RECALL: you must learn this equation.', nob: true, color: C.red, b: true, size: 10.5 },
    'Both routes give the **same** ΔGPE: only the vertical height matters.',
  ],
  worked: { head: 'Worked example', q: 'A 2.0 kg box is lifted onto a shelf 1.5 m high. Calculate the gain in GPE.',
    steps: [['Equation', 'ΔGPE = m × g × Δh'], ['Substitute', 'ΔGPE = 2.0 kg × 10 N/kg × 1.5 m'], ['Check', 'units: kg × N/kg × m = N m = J'], ['Answer', `ΔGPE = ${gpe7} J`]], size: 10.5 },
  qc: 'A 60 kg climber gains 9000 J of gravitational potential energy. Calculate the height she climbs.',
  notes: `QUICK CHECK ANSWER: Δh = ΔGPE ÷ (m × g) = 9000 ÷ (60 × 10) = ${qc7} m.\nWording (3.1): “Recall and use the equation to calculate the change in gravitational PE when an object is raised above the ground”. RECALL equation.`,
}), '3.1 GPE');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('3.1')}, ${sp('3.3')}–${sp('3.6')} • stores, conservation and GPE`, [
  { q: 'Name the energy store that increases when **(a)** a bow is pulled back and **(b)** water is heated in a kettle.', marks: 2, ms: '(a) elastic potential store (of the bow) (1); (b) thermal store (of the water) (1).' },
  { q: 'State the **principle of conservation of energy** and explain what it means for a **closed system**.', marks: 2, ms: 'Energy cannot be created or destroyed, only transferred/stored/dissipated (1); in a closed system the total energy does not change / no net change (1).' },
  { q: 'A **0.50 kg** ball is lifted through a height of **4.0 m**. Calculate the change in its gravitational potential energy. g = 10 N/kg.', marks: 3, ms: 'ΔGPE = m × g × Δh (1); = 0.50 × 10 × 4.0 (1); = 20 J (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 KINETIC ENERGY =======================
const GKE = { x: 1.4, y: 1.6, w: 4.8, h: 3.55, xmin: 0, xmax: 30, ymin: 0, ymax: 500, xstep: 5, ystep: 100, minor: 2, xlabel: 'speed / m/s', ylabel: 'kinetic energy / kJ', fmt: v => String(v) };
reg(D.contentSlide({
  title: 'Kinetic energy: KE = ½ × m × v²',
  subtitle: `Specification ${sp('3.2')} • the energy in the kinetic store of a moving object`,
  tag: '3.2', caption: 'KE of a 1000 kg car against speed, plotted to scale',
  draw: (s, p) => {
    axes(s, GKE);
    fnLine(s, GKE, KEcurve, 0, 30, 40, C.green, 2.5);
    [[10, 50], [20, 200]].forEach(([v, e]) => {
      line(s, px(GKE, v), py(GKE, 0), px(GKE, v), py(GKE, e), C.blue, 1, { dash: 'dash' });
      line(s, px(GKE, 0), py(GKE, e), px(GKE, v), py(GKE, e), C.blue, 1, { dash: 'dash' });
      s.addShape(SH.OVAL, { x: px(GKE, v) - 0.06, y: py(GKE, e) - 0.06, w: 0.12, h: 0.12, fill: { color: C.blue }, line: { color: C.blue } });
    });
    label(s, px(GKE, 10.5), py(GKE, 50) - 0.3, 1.6, '10 m/s → 50 kJ', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, px(GKE, 20.5), py(GKE, 200) + 0.02, 1.7, '20 m/s → 200 kJ', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, 1.5, 5.65, 4.6, 'double the speed → 4 × the kinetic energy', { size: 11, bold: true, color: C.red, h: 0.24 });
  },
  head: 'Kinetic energy',
  lines: [
    'Every moving object has energy in its **kinetic store**.',
    { t: '__KE = ½ × m × v²__', nob: true, size: 13 },
    { t: 'KE in J • m mass in kg • v speed in m/s', nob: true, size: 10.5 },
    { t: 'RECALL: you must learn this equation.', nob: true, color: C.red, b: true, size: 10.5 },
    'KE ∝ m, but KE ∝ **v²**: speed matters most. **Square the speed first**, then multiply.',
  ],
  worked: { head: 'Worked example', q: 'Calculate the kinetic energy of a 1200 kg car travelling at 15 m/s.',
    steps: [['Equation', 'KE = ½ × m × v²'], ['Substitute', 'KE = 0.5 × 1200 kg × (15 m/s)² = 0.5 × 1200 × 225'], ['Check', 'square only the speed, not ½ × m'], ['Answer', `KE = ${fmtN(ke9)} J (135 kJ)`]], size: 10.5 },
  qc: 'Calculate the kinetic energy of a 0.40 kg ball moving at 5.0 m/s. What happens to its KE if its speed doubles?',
  notes: `QUICK CHECK ANSWER: KE = 0.5 × 0.40 × 5.0² = ${qc9} J. Doubling the speed multiplies KE by 4 (to 20 J).\nGraph: KE = ½ × 1000 × v², asserted at 10 and 20 m/s (ratio 4). Link: Topic 2.33 used KE = work done by the brakes.`,
}), '3.2 Kinetic energy');

// ======================= 10 FALLING OBJECTS =======================
reg(D.contentSlide({
  title: 'Falling objects: GPE → KE',
  subtitle: `Specification ${sp('3.1')}, ${sp('3.2')}, ${sp('3.5')} • GPE lost = KE gained (ignoring air resistance)`,
  tag: '3.5', stretch: true, caption: '0.50 kg ball dropped from 5.0 m; bars to scale (1 J = 0.1 in)',
  draw: (s, p) => {
    const yTop = 1.95, yBot = 5.35, k = 0.1;
    box(s, 0.7, yBot + 0.12, 2.1, 0.08, '8A6A3A', null);
    line(s, 1.0, yTop, 1.0, yBot + 0.12, C.grey, 1);
    [[5.0, 'top', fbTop, 0], [2.5, 'halfway', fbHalf, fbTop - fbHalf], [0, 'just before the ground', 0, fbTop]].forEach(([h, nm, gp, ke], i) => {
      const y = yBot - h / 5 * (yBot - yTop);
      s.addShape(SH.OVAL, { x: 1.55, y: y - 0.12 + (i === 2 ? -0.02 : 0), w: 0.24, h: 0.24, fill: { color: 'E06A2C' }, line: { color: '9C3F12' } });
      line(s, 0.92, y, 1.08, y, C.ink, 1); label(s, 0.3, y - 0.12, 0.6, `${h} m`, { size: 10, bold: true, align: 'right', h: 0.24 });
      // horizontal stacked bar: GPE then KE
      const bx = 2.3, by = y - 0.35;
      label(s, bx, by - 0.02, 3.0, nm, { size: 10, italic: true, color: C.grey, align: 'left', h: 0.2 });
      if (gp) { box(s, bx, by + 0.2, gp * k, 0.3, STORE.GPE, null); label(s, bx, by + 0.2, gp * k, `GPE ${gp} J`, { h: 0.3, size: 10, bold: true, color: C.white }); }
      if (ke) { box(s, bx + gp * k, by + 0.2, ke * k, 0.3, STORE.KE, null); label(s, bx + gp * k, by + 0.2, ke * k, `KE ${ke} J`, { h: 0.3, size: 10, bold: true, color: C.white }); }
    });
    arrow(s, 1.67, 2.25, 1.67, 3.3, C.red, 2); label(s, 1.15, 3.95, 1.15, 'falls', { size: 10, bold: true, color: C.red, align: 'left' });
  },
  head: 'Energy changes as an object falls',
  lines: [
    'As an object falls, its **gravitational potential store decreases** and its **kinetic store increases**.',
    'If air resistance is negligible: **GPE lost = KE gained**.',
    'At every height **GPE + KE = 25 J** (the total is conserved).',
    'With air resistance, some energy is **dissipated** to the thermal store of the air: the object lands more slowly.',
  ],
  worked: { head: 'Worked example (stretch)', q: 'Calculate the speed of the ball just before it hits the ground.',
    steps: [['GPE lost', `ΔGPE = 0.50 × 10 × 5.0 = ${fbTop} J = KE gained`], ['Equation', 'KE = ½ × m × v², so v = √(2 × KE ÷ m)'], ['Substitute', 'v = √(2 × 25 J ÷ 0.50 kg) = √100'], ['Answer', `v = ${fbV} m/s`]], size: 10.5 },
  qc: 'Stretch: show that the mass cancels, so v = √(2gh). Use it to find the landing speed after a 20 m fall.',
  notes: `QUICK CHECK ANSWER: mgh = ½mv² → v² = 2gh → v = √(2gh) (mass cancels). v = √(2 × 10 × 20) = ${qc10} m/s.\nBars: 25 J total at each height; halfway 12.5 J + 12.5 J (asserted). Spec 3.5(a)-type analysis (object projected upwards is the same in reverse).`,
}), '3.5 Falling objects (stretch)');

// ======================= 11 ROLLERCOASTER =======================
{
  const s = D.contentHeader('Rollercoaster: swapping GPE and KE', `Specification ${sp('3.3')}–${sp('3.5')} • a 500 kg car released from rest at A, friction ignored`, { tag: '3.5' });
  D.panel(s, 0.45, 1.3, 7.2, 4.95, 'track height and bars drawn to scale; total energy 100 kJ at every point');
  const yG = 3.75, kh = 0.09; // in per m
  const KP = [[0.8, 20], [1.35, 20], [2.85, 0], [4.55, 12], [6.6, 5], [7.3, 5]];
  const yOf = h => yG - h * kh;
  const pts = [];
  for (let i = 0; i < KP.length - 1; i++) for (let j = 0; j < 12; j++) {
    const t = j / 12, f = (1 - Math.cos(Math.PI * t)) / 2;
    pts.push([KP[i][0] + (KP[i + 1][0] - KP[i][0]) * t, yOf(KP[i][1] + (KP[i + 1][1] - KP[i][1]) * f)]);
  }
  pts.push([KP[KP.length - 1][0], yOf(KP[KP.length - 1][1])]);
  for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], '4A5262', 3.5);
  line(s, 0.65, yG + 0.04, 7.45, yG + 0.04, '8A6A3A', 2);
  // supports
  [1.35, 4.55, 6.9].forEach(x => { const yy = pts.reduce((b, q) => Math.abs(q[0] - x) < Math.abs(b[0] - x) ? q : b)[1]; line(s, x, yy + 0.05, x, yG, 'A9AFBB', 1.5); });
  // car at A
  box(s, 1.1, yOf(20) - 0.27, 0.5, 0.24, C.red, '8A2A30', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
  const PX = [1.35, 2.85, 4.55, 6.6];
  RC.forEach((r, i) => {
    label(s, PX[i] - 0.3, yOf(r.h) - (i === 0 ? 0.62 : 0.4), 0.6, r.n, { size: 13, bold: true, color: C.ink });
    if (i > 0) s.addShape(SH.OVAL, { x: PX[i] - 0.05, y: yOf(r.h) - 0.05, w: 0.1, h: 0.1, fill: { color: C.ink }, line: { color: C.ink } });
    label(s, PX[i] - 0.5, yG + 0.08, 1.0, `h = ${r.h} m`, { size: 10, bold: true, color: C.grey, h: 0.2 });
    // bar chart
    bars(s, PX[i] - 0.36, 5.55, 1.05, 100000, [['GPE', r.gpe, STORE.GPE], ['KE', r.ke, STORE.KE]], { bw: 0.3, gap: 0.12, values: [`${r.gpe / 1000}`, `${r.ke / 1000}`] });
  });
  label(s, 7.0, 4.5, 0.6, 'energy\n/ kJ', { size: 10, bold: true, color: C.ink, h: 0.4 });
  D.card(s, 7.9, 1.3, 4.98, 2.55, 'Energy at each point', [
    '**A:** all GPE: 500 × 10 × 20 = **100 kJ**; KE = 0.',
    '**B** (lowest): all KE = 100 kJ → **fastest** (20 m/s).',
    '**C:** GPE = 60 kJ, so KE = 100 − 60 = **40 kJ**.',
    'GPE + KE is the **same at every point**. Real cars lose some energy to friction and air resistance.',
  ], { size: 11 });
  D.workedSteps(s, 7.9, 4.0, 4.98, 2.25, 'Worked example', 'Calculate the speed of the car at C.', [
    ['KE at C', 'KE = 100 000 − 60 000 = 40 000 J'], ['Equation', 'v = √(2 × KE ÷ m)'], ['Substitute', 'v = √(2 × 40 000 ÷ 500) = √160'], ['Answer', `v = ${sf(RC[2].v, 3)} m/s (3 s.f.)`]], { size: 10.5 });
  D.quickCheck(s, 'Calculate the kinetic energy and the speed of the car at D (h = 5 m). Why would the real speed be lower?');
  D.notes(s, `QUICK CHECK ANSWER: GPE at D = 500 × 10 × 5 = 25 000 J; KE = 100 000 − 25 000 = 75 000 J; v = √(2 × 75 000 ÷ 500) = √300 = ${sf(RC[3].v, 3)} m/s. Real speed lower: work done against friction and air resistance dissipates energy to the thermal store of the track/air.\nAll values asserted in node. The same reasoning applies to a pendulum: GPE at the ends of the swing, KE at the bottom.`);
  reg(s, '3.5 Rollercoaster GPE ↔ KE');
}

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('3.1')}, ${sp('3.2')}, ${sp('3.5')} • GPE, KE and energy changes`, [
  { q: 'A **70 kg** sprinter runs at **8.0 m/s**. Calculate her kinetic energy.', marks: 3, ms: 'KE = ½ × m × v² (1); = 0.5 × 70 × 8.0² (1); = 2240 J (1) (accept 2200 J).' },
  { q: 'A **0.20 kg** ball is thrown straight up at **6.0 m/s**. Ignoring air resistance, calculate the maximum height it reaches. g = 10 N/kg.', marks: 3, ms: 'KE = 0.5 × 0.20 × 6.0² = 3.6 J (1); GPE gained = 3.6 J so Δh = 3.6 ÷ (0.20 × 10) (1); = 1.8 m (1).' },
  { q: 'Describe the energy changes as a pendulum swings from one end of its swing to the lowest point.', marks: 2, ms: 'Gravitational potential store decreases, kinetic store increases (1); a little energy dissipated to the thermal store of the surroundings / air by air resistance / friction at the pivot (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 ANALYSING SYSTEM CHANGES =======================
{
  const s = D.contentHeader('Analysing changes in a system', `Specification ${sp('3.5')} • which store empties, which fills, and how?`, { tag: '3.5' });
  D.panel(s, 0.45, 1.3, 7.6, 4.95, 'five situations named in the specification');
  const rows = [
    ['(a) ball projected upwards / up a slope', ['kinetic', STORE.KE], ['grav. potential', STORE.GPE], 'mechanically'],
    ['(b) moving object hits an obstacle', ['kinetic', STORE.KE], ['thermal (+ sound)', STORE.TH], 'mechanically'],
    ['(c) object accelerated by a constant force', ['chemical (person)', STORE.CH], ['kinetic', STORE.KE], 'mechanically'],
    ['(d) vehicle slowing down (braking)', ['kinetic', STORE.KE], ['thermal (brakes)', STORE.TH], 'by friction'],
    ['(e) water boiled in an electric kettle', ['mains supply', STORE.EL], ['thermal (water)', STORE.TH], 'electrically, heating'],
  ];
  label(s, 0.7, 1.4, 2.6, 'Situation', { size: 11, bold: true, color: C.ink, align: 'left' });
  label(s, 3.35, 1.4, 1.5, 'Store empties', { size: 11, bold: true, color: C.ink });
  label(s, 5.0, 1.4, 1.1, 'Pathway', { size: 11, bold: true, color: C.ink });
  label(s, 6.25, 1.4, 1.6, 'Store fills', { size: 11, bold: true, color: C.ink });
  rows.forEach(([sit, a, b, path], i) => {
    const y = 1.78 + i * 0.8;
    box(s, 0.65, y, 7.2, 0.68, i % 2 ? C.white : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.04, lw: 0.5 });
    label(s, 0.75, y, 2.55, sit, { h: 0.68, size: 10.5, bold: true, color: C.ink, align: 'left' });
    chip(s, 3.35, y + 0.12, 1.5, 0.44, a[0], a[1], { size: 10 });
    arrow(s, 4.9, y + 0.34, 6.2, y + 0.34, C.blue, 2);
    label(s, 4.9, y + 0.04, 1.3, path, { size: 10, italic: true, color: C.blue, h: 0.26 });
    chip(s, 6.25, y + 0.12, 1.5, 0.44, b[0], b[1], { size: 10 });
  });
  D.card(s, 8.3, 1.3, 4.58, 2.75, 'How to answer', [
    'Name the **store that decreases** and the **store that increases**.',
    'Say **how** the energy is transferred: mechanically, electrically, by heating, by radiation.',
    'Mention the **wasted** energy: usually the **thermal store of the surroundings**.',
    'Use the word **store**, not “energy type”.',
  ], { size: 11 });
  D.workedSteps(s, 8.3, 4.2, 4.58, 2.05, 'Model answer: (b) car hits a wall', '', [
    ['Before', 'energy is in the kinetic store of the car'], ['Transfer', 'forces do work, deforming the car and wall'], ['After', 'thermal store of car, wall and air rises; some by sound'], ['Answer', 'kinetic store → (mechanically) → thermal stores']], { size: 10.5 });
  D.quickCheck(s, 'A cyclist pedals to accelerate from rest. Describe the changes in energy stores, including any wasted energy.');
  D.notes(s, 'QUICK CHECK ANSWER: Chemical store of the cyclist decreases (1); transferred mechanically (force on pedals) to the kinetic store of the cyclist and bike (1); some dissipated by heating the cyclist/surroundings and by air resistance (1).\nWording of 3.5 (medium confidence): “Analyse the changes involved in the way energy is stored when a system changes, including: a an object projected upwards or up a slope, b a moving object hitting an obstacle, c an object being accelerated by a constant force, d a vehicle slowing down, e bringing water to a boil in an electric kettle”. Item (e) is UNVERIFIED.');
  reg(s, '3.5 Analysing system changes');
}

// ======================= 14 SANKEY DIAGRAMS =======================
reg(D.contentSlide({
  title: 'Energy transfer diagrams: Sankey diagrams',
  subtitle: `Specification ${sp('3.3')} • arrow widths are drawn to scale`,
  tag: '3.3', caption: 'an electric motor: 200 J supplied, drawn to scale (100 J = 1.0 in)',
  draw: (s, p) => {
    const k = 0.01;
    sankey(s, 0.7, 1.75, k, { v: 200, label: 'electrical\n200 J' }, [
      { v: 120, label: 'kinetic (useful)\n120 J', color: STORE.KE },
      { v: 60, label: 'thermal\n60 J', color: STORE.TH },
      { v: 20, label: 'sound\n20 J', color: 'C77D3A' },
    ], { inLen: 1.6, outLen: 1.7, yEnd: 4.55, uw: 1.3, gap: 0.45 });
    // scale bar
    box(s, 5.6, 4.6, 0.25, 1.0, '7C8AA8', null);
    label(s, 4.7, 4.95, 0.85, '100 J', { size: 10, bold: true, color: C.ink, align: 'right' });
    label(s, 4.45, 5.6, 1.9, 'scale bar', { size: 10, italic: true, color: C.grey });
  },
  head: 'Drawing a Sankey diagram',
  lines: [
    'The **width** of each arrow is **proportional** to the energy it represents.',
    '**Input** on the left; **useful** energy goes straight on; **wasted** energy bends away (down).',
    'Energy is conserved: **input = sum of all outputs** (200 = 120 + 60 + 20).',
    'You may be asked to **draw** one to scale on squared paper, or to **read** values from one.',
  ],
  worked: { head: 'Worked example', q: 'Use the Sankey diagram to find the total energy wasted by the motor.',
    steps: [['Idea', 'wasted = everything that is not useful'], ['Read off', 'thermal 60 J and sound 20 J'], ['Check', '120 + 60 + 20 = 200 J ✓'], ['Answer', 'wasted energy = 80 J']], size: 10.5 },
  qc: 'A lamp is supplied with 100 J and gives out 15 J of light. Calculate the energy wasted, and the widths at a scale of 1 mm per joule.',
  notes: 'QUICK CHECK ANSWER: wasted (thermal) = 100 − 15 = 85 J. Widths: input 100 mm, light 15 mm, thermal 85 mm.\nThe diagram is drawn by the sankey() helper in build_T3.js, which asserts that the outputs add up to the input; widths are 0.01 in per joule.',
}), '3.3 Sankey diagrams');

// ======================= 15 DISSIPATION =======================
reg(D.contentSlide({
  title: 'Dissipation: wasted energy',
  subtitle: `Specification ${sp('3.7')}, ${sp('3.8')} • energy spreads out and is stored in less useful ways`,
  tag: '3.7', caption: 'friction heats moving parts; the energy spreads into the surroundings',
  draw: (s, p) => {
    // box pushed on floor
    label(s, 0.7, 1.45, 5.6, 'A box slides across a rough floor', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    box(s, 0.75, 3.05, 5.5, 0.12, '8A6A3A', null);
    box(s, 2.5, 2.35, 1.4, 0.7, C.blue, '2B3F7A'); label(s, 2.5, 2.35, 1.4, 'box', { h: 0.7, size: 11, bold: true, color: C.white });
    forceArrow(s, 3.9, 2.55, 'right', 1.0, 'velocity', C.green, { lw: 1.0 });
    forceArrow(s, 2.5, 2.95, 'left', 0.9, 'friction', C.red, { lw: 0.9 });
    [2.7, 3.2, 3.7].forEach(x => s.addShape(SH.ARC, { x: x - 0.08, y: 3.2, w: 0.16, h: 0.3, angleRange: [270, 90], line: { color: 'E39A2F', width: 2 }, fill: { type: 'none' } }));
    label(s, 0.75, 3.55, 5.5, 'surfaces warm up: kinetic store → thermal store of box and floor', { size: 10.5, italic: true, color: C.red });
    // hot cup spreading
    label(s, 0.7, 4.0, 5.6, 'The thermal energy then spreads out', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    box(s, 1.2, 4.55, 0.7, 0.75, 'D86A3A', '9C3F12', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    label(s, 1.2, 4.55, 0.7, 'hot', { h: 0.75, size: 10.5, bold: true, color: C.white });
    for (let i = 0; i < 7; i++) { const a = (-75 + i * 25) * Math.PI / 180; arrow(s, 1.95 + 0.0, 4.92, 1.95 + Math.cos(a) * 1.1, 4.92 + Math.sin(a) * 0.55, 'E39A2F', 1.5); }
    for (let i = 0; i < 10; i++) s.addShape(SH.OVAL, { x: 3.4 + (i % 5) * 0.55, y: 4.5 + Math.floor(i / 5) * 0.55 + (i % 2) * 0.12, w: 0.12, h: 0.12, fill: { color: 'F5A742' }, line: { color: 'E39A2F' } });
    label(s, 3.2, 5.55, 3.0, 'warm air particles: tiny temperature rise', { size: 10, italic: true, color: C.grey, h: 0.24 });
  },
  head: 'Why energy is wasted',
  lines: [
    'Mechanical processes become **wasteful** when they cause a **rise in temperature** (e.g. friction, air resistance).',
    'The energy goes into the **thermal store of the surroundings** and **spreads out**: it is **dissipated**.',
    'Dissipated energy is stored in a **less useful** way: it is very hard to collect and use again.',
    'In **all** system changes, some energy is dissipated. Never say energy is “lost” or “used up”: it is **conserved**.',
  ],
  worked: { head: 'Examples of dissipation', q: '',
    steps: [['Car engine', 'friction in moving parts heats the engine and the air'], ['Phone charger', 'current heats the wires and the charger'], ['Bouncing ball', 'each bounce heats the ball and floor, so it rises less high'], ['Answer', 'all end up in the thermal store of the surroundings']], size: 10.5 },
  qc: 'A bouncing ball rises less high after each bounce. Explain why, using the idea of dissipation.',
  notes: 'QUICK CHECK ANSWER: At each bounce some energy is transferred to the thermal store of the ball, floor and air (and by sound) (1); so less energy is in the kinetic store after the bounce / less GPE at the top (1); the energy is dissipated, not destroyed (1).\nWording (3.7): “Explain that mechanical processes become wasteful when they cause a rise in temperature so dissipating energy in heating the surroundings” (high confidence – matched exactly by search).',
}), '3.7–3.8 Dissipation');

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('3.3')}, ${sp('3.5')}, ${sp('3.7')}, ${sp('3.8')} • Sankey diagrams and dissipation`, [
  { q: 'A filament lamp is supplied with **500 J** of energy. It transfers **100 J** by light. **(a)** Calculate the energy wasted. **(b)** State where the wasted energy goes.', marks: 2, ms: '(a) 500 − 100 = 400 J (1); (b) thermal store of the surroundings / heats the lamp and the room (1).' },
  { q: 'Describe how you would draw a **Sankey diagram** for the lamp to scale.', marks: 3, ms: 'Choose a scale, e.g. 1 mm = 10 J / input arrow width 50 mm (1); useful (light) arrow width 10 mm, going straight on (1); wasted (thermal) arrow 40 mm bending away / widths add up to the input (1).' },
  { q: 'Explain what is meant by **energy being dissipated**.', marks: 2, ms: 'Energy spreads out (into the surroundings) (1); stored in less useful ways / thermal store of surroundings, cannot easily be used again (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 REDUCING UNWANTED TRANSFERS =======================
{
  const s = D.contentHeader('Reducing unwanted energy transfers', `Specification ${sp('3.9')} • lubrication and thermal insulation`, { tag: '3.9' });
  D.panel(s, 0.45, 1.3, 7.2, 4.95, 'heat-loss routes from a house (illustrative shares) and how to reduce them');
  const hx = 2.0, hw = 3.3, yTop = 2.85, yB = 5.4;
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: hx - 0.25, y: 1.75, w: hw + 0.5, h: 1.1, fill: { color: 'B5523B' }, line: { color: '7A2F20', width: 1 } });
  box(s, hx, yTop, hw, yB - yTop, 'E8D2B0', '8A6A3A', { lw: 1.25 });
  box(s, hx + 0.08, yTop, hw - 0.16, 0.14, 'F5D76E', null); // loft insulation
  // cavity walls
  [hx, hx + hw - 0.22].forEach(x => { box(s, x, yTop, 0.22, yB - yTop, 'C2764B', '8A6A3A', { lw: 0.5 }); box(s, x + 0.07, yTop + 0.15, 0.08, yB - yTop - 0.2, 'F5D76E', null); });
  // windows (double glazed)
  [[hx + 0.5, 3.25], [hx + 2.05, 3.25]].forEach(([x, y]) => { box(s, x, y, 0.75, 0.6, 'DCEBFA', '4A5262', { lw: 1 }); line(s, x + 0.06, y + 0.04, x + 0.06, y + 0.56, '4A5262', 0.75); line(s, x + 0.69, y + 0.04, x + 0.69, y + 0.56, '4A5262', 0.75); });
  // door + draught excluder
  box(s, hx + 1.35, 4.35, 0.6, 1.05, '7A5230', '4A3018'); box(s, hx + 1.3, 5.3, 0.7, 0.1, '5FA35F', null);
  // carpet
  box(s, hx + 0.22, yB - 0.08, hw - 0.44, 0.08, '9C3F6E', null);
  line(s, 0.6, yB, 7.5, yB, '6B5A2A', 2);
  // heat-loss arrows (width ∝ share)
  const hl = (x1, y1, x2, y2, pct, t, lx, ly, lw, al) => { arrow(s, x1, y1, x2, y2, C.red, 1 + pct * 0.18); label(s, lx, ly, lw, `${t} ${pct}%`, { size: 10.5, bold: true, color: C.red, align: al }); };
  hl(hx + hw / 2, 1.85, hx + hw / 2, 1.45, 25, 'roof', hx + hw / 2 + 0.15, 1.4, 1.2, 'left');
  hl(hx - 0.02, 4.3, hx - 0.7, 4.3, 35, 'walls', 0.55, 3.95, 1.0, 'left');
  hl(hx + hw + 0.02, 3.55, hx + hw + 0.55, 3.55, 10, 'windows', hx + hw + 0.6, 3.4, 1.4, 'left');
  hl(hx + 2.6, yB + 0.02, hx + 2.6, yB + 0.4, 15, 'floor', hx + 2.75, yB + 0.1, 1.2, 'left');
  hl(hx + hw + 0.02, 4.95, hx + hw + 0.55, 4.95, 15, 'draughts (gaps)', hx + hw + 0.6, 4.8, 1.6, 'left');
  // insulation key
  [['loft insulation', 'F5D76E'], ['cavity wall insulation', 'F5D76E'], ['double glazing', 'DCEBFA'], ['draught excluder', '5FA35F'], ['carpet / floor insulation', '9C3F6E']].forEach(([t, c], i) => {
    const y = 1.45 + i * 0.3;
    box(s, 0.6, y + 0.05, 0.2, 0.18, c, '6B7385', { lw: 0.5 });
    label(s, 0.85, y, 1.1, t, { size: 10, align: 'left', color: C.ink, h: 0.28 });
  });
  D.card(s, 7.9, 1.3, 4.98, 2.75, 'Two main methods', [
    '**Lubrication:** oil or grease between moving parts reduces **friction**, so less energy is transferred to the thermal store.',
    '**Thermal insulation:** materials that **trap air** (a poor conductor) reduce the rate of energy transfer by heating.',
    'Insulating a house keeps its thermal store higher for longer, so **less fuel** is needed.',
  ], { size: 11 });
  D.workedSteps(s, 7.9, 4.2, 4.98, 2.05, 'Explain it', 'Why does loft insulation reduce heating bills?', [
    ['Material', 'fibreglass / mineral wool traps pockets of air'], ['Physics', 'air is a poor thermal conductor, so the rate of energy transfer through the roof falls'], ['Effect', 'the house cools more slowly'], ['Answer', 'less energy (fuel) needed to keep it warm']], { size: 10.5 });
  D.quickCheck(s, 'Explain why a cyclist oils the bicycle chain. Use the words friction and thermal store.');
  D.notes(s, `QUICK CHECK ANSWER: Oil (lubricant) reduces friction between the chain and the gears (1); so less energy is transferred to the thermal store of the chain/surroundings – more stays useful (kinetic) / less is wasted (1).\nHeat-loss shares are illustrative (roof 25%, walls 35%, windows 10%, floor 15%, draughts 15%; sum asserted = 100%). Arrow line widths scale with the share.\nWording (3.9): “Explain ways of reducing unwanted energy transfer including through lubrication and thermal insulation” (medium-high confidence).`);
  reg(s, '3.9 Reducing unwanted transfers');
}

// ======================= 18 THICKNESS AND THERMAL CONDUCTIVITY =======================
{
  const s = D.contentHeader('Walls: thickness and thermal conductivity', `Specification ${sp('3.10')} • what affects how quickly a building cools (qualitative)`, { tag: '3.10' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'arrow widths show the rate of energy transfer; conductivities are typical values');
  // two wall sections
  const wall = (x, w, col, txt, rate) => {
    box(s, x, 1.7, w, 1.6, col, '6B5A2A', { lw: 1 });
    label(s, x - 0.4, 3.35, w + 0.8, txt, { size: 10, bold: true, color: C.ink, h: 0.4, valign: 'top' });
    arrow(s, x - 0.55, 2.5, x + w + 0.55, 2.5, C.red, rate);
  };
  label(s, 0.7, 1.4, 2.5, 'INSIDE 20 °C', { size: 10, bold: true, color: C.red, align: 'left' });
  label(s, 4.0, 1.4, 2.3, 'OUTSIDE 5 °C', { size: 10, bold: true, color: C.blue, align: 'right' });
  wall(1.35, 0.3, 'C2764B', 'thin brick', 9);
  wall(3.2, 0.8, 'C2764B', 'thick brick', 4);
  wall(5.15, 0.6, 'F5D76E', 'foam insulation', 1.5);
  // conductivity bar chart (to scale)
  const KC = [['glass', 1.0], ['brick', 0.7], ['wood', 0.15], ['fibreglass', 0.04], ['polystyrene', 0.03]];
  label(s, 0.7, 3.9, 5.6, 'Thermal conductivity / W/(m K) (typical values, to scale)', { size: 10.5, bold: true, color: C.ink, align: 'left' });
  KC.forEach(([n, v], i) => {
    const y = 4.25 + i * 0.3;
    label(s, 0.7, y, 1.2, n, { size: 10, bold: true, align: 'right', color: C.ink, h: 0.26 });
    box(s, 2.0, y + 0.04, Math.max(0.03, v * 3.6), 0.2, v > 0.5 ? C.red : v > 0.1 ? 'E39A2F' : C.green, null);
    label(s, 2.05 + Math.max(0.03, v * 3.6), y, 0.6, String(v), { size: 10, align: 'left', color: C.ink, h: 0.26 });
  });
  D.card(s, 6.8, 1.3, 6.08, 2.75, 'Rate of cooling', [
    '**Thermal conductivity** is how well a material transfers energy by conduction.',
    '**Higher** thermal conductivity → **faster** energy transfer → the building **cools faster**.',
    '**Thicker** walls → **slower** energy transfer → the building cools more slowly.',
    'A bigger temperature difference between inside and outside also makes it cool faster.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.2, 6.08, 2.05, 'Explain it', 'House A has thin brick walls. House B has thick walls filled with foam. Which cools faster?', [
    ['Thickness', 'A’s walls are thinner, so energy is transferred through them faster'], ['Conductivity', 'brick conducts better than foam (B’s cavity is filled with a low-conductivity material)'], ['Answer', 'House A cools faster, so it needs more heating']], { size: 10.5 });
  D.quickCheck(s, 'Explain why window frames made of wood keep a house warmer than metal frames of the same thickness.');
  D.notes(s, 'QUICK CHECK ANSWER: Wood has a lower thermal conductivity than metal (1); so the rate of energy transfer through the frame is lower and the house cools more slowly (1).\n3.10 is qualitative only: “Describe the effects of the thickness and thermal conductivity of the walls of a building on its rate of cooling qualitatively” (high confidence – Issue 4 extract). No conductivity equation is needed. Conductivity values are typical textbook values, rounded.');
  reg(s, '3.10 Thickness and thermal conductivity');
}

// ======================= 19 EFFICIENCY =======================
reg(D.contentSlide({
  title: 'Efficiency',
  subtitle: `Specification ${sp('3.11')} • the fraction of the energy supplied that is transferred usefully`,
  tag: '3.11', caption: 'two lamps, 100 J each; to scale, 100 J = 1.0 in (illustrative)',
  draw: (s, p) => {
    const k = 0.01;
    label(s, 0.7, 1.4, 2.8, 'Filament lamp', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    sankey(s, 0.7, 1.75, k, { v: 100, label: '100 J' }, [{ v: 10, label: 'light\n10 J', color: STORE.KE }, { v: 90, label: 'thermal 90 J', color: STORE.TH }], { inLen: 0.55, outLen: 1.05, yEnd: 3.4, uw: 0.8 });
    label(s, 0.7, 4.45, 2.8, 'efficiency = 10 ÷ 100 = 0.10 (10%)', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, 3.6, 1.4, 2.8, 'LED lamp', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    sankey(s, 3.6, 1.75, k, { v: 100, label: '100 J' }, [{ v: 40, label: 'light\n40 J', color: STORE.KE }, { v: 60, label: 'thermal 60 J', color: STORE.TH }], { inLen: 0.55, outLen: 1.05, yEnd: 3.4, uw: 0.8 });
    label(s, 3.6, 4.45, 2.8, 'efficiency = 40 ÷ 100 = 0.40 (40%)', { size: 10.5, bold: true, color: C.green, align: 'left' });
    label(s, 0.7, 4.95, 5.6, 'The LED wastes less energy, so it is more efficient.', { size: 11, italic: true, color: C.ink, align: 'left' });
  },
  head: 'Calculating efficiency',
  lines: [
    { t: '__efficiency = useful energy transferred by the device ÷ total energy supplied to the device__', nob: true },
    { t: 'RECALL: you must learn this equation.', nob: true, color: C.red, b: true, size: 10.5 },
    'Efficiency has **no unit**. Multiply by 100 for a **percentage**.',
    'No device can be more than **100%** efficient (energy is conserved), and real devices are always less.',
  ],
  worked: { head: 'Worked example', q: 'A motor is supplied with 200 J and transfers 120 J to its kinetic store. Calculate its efficiency.',
    steps: [['Equation', 'efficiency = useful energy ÷ total energy supplied'], ['Substitute', 'efficiency = 120 J ÷ 200 J'], ['Percentage', `${effMotor} × 100 = ${effMotor * 100}%`], ['Answer', `efficiency = ${effMotor.toFixed(2)} (or ${effMotor * 100}%)`]], size: 10.5 },
  qc: 'A kettle is supplied with 2000 J; 1800 J goes to the water. Calculate the efficiency. Stretch: a 25% efficient engine is supplied with 4000 J: find the useful output.',
  notes: `QUICK CHECK ANSWER: 1800 ÷ 2000 = ${qc19.toFixed(2)} = 90%. Stretch: useful = efficiency × total = 0.25 × 4000 = 1000 J.\nLamp values are illustrative (filament ≈ 10%, LED ≈ 40% of input as light); asserted 0.10 and 0.40. Topic 8 revisits efficiency with power.`,
}), '3.11 Efficiency');

// ======================= 20 INCREASING EFFICIENCY =======================
reg(D.contentSlide({
  title: 'Increasing efficiency',
  subtitle: `Specification ${sp('3.12')} • reduce the wasted energy transfers`,
  tag: '3.12', caption: 'identify the wasted transfer, then reduce it',
  draw: (s, p) => {
    label(s, 0.7, 1.42, 1.5, 'Device', { size: 11, bold: true, color: C.ink });
    label(s, 2.45, 1.42, 1.75, 'Wasted transfer', { size: 11, bold: true, color: C.red });
    label(s, 4.45, 1.42, 1.85, 'How to reduce it', { size: 11, bold: true, color: C.green });
    const R = [
      ['electric motor', 'friction heats moving parts', 'lubricate the bearings'],
      ['car', 'air resistance and engine heating', 'streamline the body; tune the engine'],
      ['kettle', 'heating the kettle body and air', 'insulate the kettle walls'],
      ['lighting', 'filament lamp heats the room', 'replace with LED lamps'],
      ['electric cables', 'current heats the wires', 'use thicker, low-resistance wires'],
    ];
    R.forEach(([d, w, f], i) => {
      const y = 1.8 + i * 0.8;
      chip(s, 0.7, y, 1.5, 0.62, d, C.ink, { size: 10.5 });
      arrow(s, 2.22, y + 0.31, 2.43, y + 0.31, C.grey, 1.5);
      chip(s, 2.45, y, 1.75, 0.62, w, 'FBE3E5', { color: C.red, border: C.red, size: 10 });
      arrow(s, 4.22, y + 0.31, 4.43, y + 0.31, C.grey, 1.5);
      chip(s, 4.45, y, 1.85, 0.62, f, 'E3F3EA', { color: C.green, border: C.green, size: 10 });
    });
  },
  head: 'Making devices more efficient',
  lines: [
    'Efficiency increases when **less energy is wasted**, so more of the input is transferred usefully.',
    'First identify **where** energy is dissipated, then reduce that transfer: lubrication, insulation, streamlining, lower-resistance wires.',
    'Some energy is **always** wasted, so efficiency is always less than 100%.',
  ],
  worked: { head: 'Worked example', q: 'Streamlining raises a car’s efficiency from 25% to 30%. How much more useful energy is obtained from 100 kJ of fuel?',
    steps: [['Before', 'useful = 0.25 × 100 kJ = 25 kJ'], ['After', 'useful = 0.30 × 100 kJ = 30 kJ'], ['Compare', '30 kJ − 25 kJ'], ['Answer', '5 kJ more useful energy (less fuel needed per journey)']], size: 10.5 },
  qc: 'Suggest two ways of increasing the efficiency of a bicycle, and explain one of them.',
  notes: 'QUICK CHECK ANSWER: e.g. oil the chain/bearings (reduces friction, less energy to thermal store); pump the tyres up (less energy wasted deforming the tyres); streamlined riding position/clothing (less air resistance). Any two, with one explained.\nWording (3.12): “Explain how efficiency can be increased” (medium confidence).',
}), '3.12 Increasing efficiency');

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('3.9')}–${sp('3.12')} • insulation, conductivity and efficiency`, [
  { q: 'An electric motor is supplied with **1500 J**. It transfers **450 J** usefully. Calculate its efficiency as a **percentage**.', marks: 3, ms: 'efficiency = useful ÷ total (1); = 450 ÷ 1500 = 0.30 (1); = 30% (1).' },
  { q: 'House A has walls of **thin brick**. House B has **thick** walls with **foam** in the cavity. Explain which house cools more quickly.', marks: 3, ms: 'House A (1); thinner walls give a higher rate of energy transfer (1); brick has a higher thermal conductivity than foam / foam traps air, a poor conductor (1).' },
  { q: 'Explain how **lubrication** increases the efficiency of a machine.', marks: 2, ms: 'Reduces friction between moving parts (1); so less energy is dissipated to the thermal store / less energy wasted, more transferred usefully (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 PRACTICAL: APPARATUS AND METHOD =======================
{
  const s = D.contentSlide({
    title: 'Practical: comparing thermal insulators',
    subtitle: `Specification ${sp('3.9')}, ${sp('3.10')} • suggested practical (Topic 3 has no Core Practical)`,
    tag: 'Practical', caption: 'identical beakers of hot water, one wrapped in each material',
    draw: (s, p) => {
      const yb = 4.9;
      box(s, 0.65, yb, 5.7, 0.12, 'C99A5B', '8A6A3A');
      [[0.85, null, 'no insulation\n(control)'], [2.25, 'C9B79C', 'newspaper'], [3.65, 'BFD9F2', 'bubble wrap'], [5.05, 'F4F1EA', 'cotton wool']].forEach(([x, c, t]) => beaker(s, x, yb, 0.85, 1.45, c, t));
      label(s, 0.7, 1.5, 5.6, 'thermometer through each lid', { size: 10.5, italic: true, color: C.blue });
      lead(s, 1.28, 2.75, 1.9, 2.0, 'thermometer', 1.3);
      lead(s, 5.4, 3.5, 5.9, 3.0, 'lid', 0.5);
      // stopwatch
      s.addShape(SH.OVAL, { x: 5.6, y: 5.25, w: 0.5, h: 0.5, fill: { color: C.white }, line: { color: C.ink, width: 1.5 } });
      box(s, 5.81, 5.15, 0.08, 0.1, C.ink, null); line(s, 5.85, 5.5, 5.85, 5.32, C.red, 1.5);
      label(s, 4.3, 5.35, 1.25, 'stopwatch', { size: 10, bold: true, align: 'right' });
      label(s, 0.7, 5.35, 3.4, 'hot water from a kettle, about 80 °C', { size: 10, italic: true, color: C.grey, align: 'left' });
    },
    head: 'Method',
    lines: [
      'Wrap identical beakers in **the same thickness** of each material; leave one bare as a **control**.',
      'Pour the **same volume** (e.g. 200 cm³) of hot water into each; fit a lid and thermometer.',
      'Record the **starting temperature**, then the temperature every **2 minutes** for 20 minutes.',
      'Calculate the **temperature drop**. The best insulator has the **smallest drop**.',
      'Plot **cooling curves**: temperature against time.',
    ],
    worked: { head: 'Rate of cooling', q: 'The bare beaker cools from 80 °C to 38 °C in 20 minutes.',
      steps: [['Drop', '80 − 38 = 42 °C'], ['Equation', 'mean rate of cooling = drop ÷ time'], ['Substitute', '42 °C ÷ 20 min'], ['Answer', `mean rate = ${rateNone} °C per minute`]], size: 10.5 },
    qc: 'Why must every beaker start with the same volume and the same starting temperature of water?',
    notes: 'QUICK CHECK ANSWER: These are control variables: a larger volume stores more energy and cools more slowly; a hotter start means a bigger temperature difference and faster cooling – either would make the comparison unfair.\nNOT a Core Practical: Topic 3 has none. This is the standard “keeping warm” investigation (Edexcel textbook SP3c/CP3c style) supporting 3.9–3.10. Apparatus: 4 identical beakers, lids, thermometers (or temperature probes and data logger), kettle, measuring cylinder, insulating materials, elastic bands, stopwatch.',
  });
  practicalPill(s);
  reg(s, 'Practical: apparatus and method');
}

// ======================= 23 PRACTICAL: VARIABLES AND SAFETY =======================
{
  const s = D.contentSlide({
    title: 'Practical: variables and safety',
    subtitle: `Specification ${sp('3.9')}, ${sp('3.10')} • make it a fair test`,
    tag: 'Practical', caption: 'what you change, measure and keep the same',
    draw: (s, p) => {
      const bx = (y, col, head, body) => {
        box(s, 0.75, y, 5.5, 1.15, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
        box(s, 0.75, y, 0.12, 1.15, col, null);
        s.addText([{ text: head, options: { bold: true, color: col, fontSize: 12.5, breakLine: true } }, ...T.rich(body, { fontSize: 11.5, color: C.text })], { x: 1.0, y: y + 0.06, w: 5.1, h: 1.03, fontFace: 'Calibri', valign: 'middle', margin: 0 });
      };
      bx(1.5, C.blue, 'Independent variable (you change)', 'the **insulating material** wrapped around the beaker');
      arrow(s, 3.5, 2.67, 3.5, 2.93, C.grey, 2);
      bx(2.95, C.red, 'Dependent variable (you measure)', '**temperature** of the water at each time → the **temperature drop** in 20 minutes');
      arrow(s, 3.5, 4.12, 3.5, 4.38, C.grey, 2);
      bx(4.4, C.green, 'Control variables (keep the same)', 'volume of water • starting temperature • **thickness** of material • beaker size • lid • room temperature');
    },
    head: 'Prediction',
    lines: [
      'Materials that **trap air** (cotton wool, bubble wrap) have a low thermal conductivity, so the water should **cool most slowly**.',
      'The **control** (no insulation) should cool fastest.',
      'Extension: vary the **number of layers** of one material to test the effect of **thickness** (3.10).',
    ],
    worked: { head: 'Safety', q: 'Hazard → risk → control',
      steps: [['Hot water', 'scalds → fill beakers with care, stand up, use a jug'], ['Kettle', 'burns from steam → let the teacher pour'], ['Glass', 'broken thermometer/beaker → report, do not pick up glass'], ['Answer', 'keep beakers away from the bench edge']], size: 10.5 },
    workedH: 2.5,
    qc: 'Suggest why a lid is put on every beaker, including the control.',
    notes: 'QUICK CHECK ANSWER: To reduce energy transfer from the water surface by evaporation/convection, so that the comparison tests only the wrapping material; the same lid on every beaker keeps it a control variable.',
  });
  practicalPill(s);
  reg(s, 'Practical: variables and safety');
}

// ======================= 24 PRACTICAL: RESULTS AND COOLING CURVES =======================
const GCC = { x: 1.4, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 20, ymin: 20, ymax: 90, xstep: 4, ystep: 10, minor: 2, xlabel: 'time / min', ylabel: 'temperature / °C', fmt: v => String(v) };
{
  const s = D.contentHeader('Practical: results and cooling curves', `Specification ${sp('3.9')}, ${sp('3.10')} • sample results; room temperature 20 °C`, { tag: 'Practical' });
  practicalPill(s);
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale with curves of best fit');
  axes(s, GCC);
  MATS.forEach(([n, k, col], i) => {
    fnLine(s, GCC, t => 20 + 60 * Math.exp(-k * t), 0, 20, 40, col, 2);
    points(s, GCC, TIMES.map((t, j) => [t, COOL[i][j]]), col);
    const ly = py(GCC, 88) + i * 0.24; line(s, px(GCC, 12.3), ly + 0.11, px(GCC, 13.6), ly + 0.11, col, 2.5); label(s, px(GCC, 13.8), ly, 1.2, n, { size: 10, bold: true, color: col, align: 'left', h: 0.22 });
  });
  const head = ['time / min', ...MATS.map(m => m[0])].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
  const rows = [head, ...TIMES.map((t, j) => [String(t), ...COOL.map(r => String(r[j]))].map((v, c) => ({ text: v, options: { fill: { color: j % 2 ? C.white : C.cardBlue }, bold: c === 0 } })))];
  rows.push(['drop / °C', ...DROP.map(String)].map((v, c) => ({ text: v, options: { bold: true, color: C.red, fill: { color: C.cream } } })));
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.08, 1.0, 1.3, 1.35, 1.35], rowH: 0.3, fontFace: 'Calibri', fontSize: 11, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.15, 6.08, 2.1, 'What the results show', [
    '**Cotton wool** gave the smallest drop (20 °C): the **best insulator** tested.',
    'Every curve gets **less steep** with time: cooling slows as the water gets closer to room temperature.',
    'Unwrapped water cooled about **twice as fast** as water in cotton wool.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the table to calculate the mean rate of cooling for bubble wrap over 20 minutes. Why do the curves level off?');
  D.notes(s, `QUICK CHECK ANSWER: (80 − 53) ÷ 20 = 27 ÷ 20 = 1.35 °C/min (about 1.4 °C/min). The curves level off because the temperature difference between the water and the room gets smaller, so the rate of energy transfer decreases.\nSample data model: T = 20 + 60e^(−kt) with k = 0.06, 0.04, 0.03, 0.02 per minute, rounded to whole degrees (asserted in node). Illustrative, not real measurements.`);
  reg(s, 'Practical: results and cooling curves');
}

// ======================= 25 PRACTICAL: ANALYSIS AND ERRORS =======================
{
  const s = D.contentSlide({
    title: 'Practical: analysis, errors and improvements',
    subtitle: `Specification ${sp('3.9')}, ${sp('3.10')} • evaluating the method`,
    tag: 'Practical', caption: 'temperature drop in 20 minutes for each material, to scale',
    draw: (s, p) => {
      const yb = 5.1, k = 0.075;
      label(s, 0.7, 1.45, 5.6, 'Temperature drop in 20 min / °C (smaller = better insulator)', { size: 11, bold: true, color: C.ink, align: 'left' });
      line(s, 1.0, yb, 6.1, yb, C.ink, 1.5); line(s, 1.0, yb, 1.0, yb - 45 * k, C.ink, 1.5);
      [0, 10, 20, 30, 40].forEach(v => { line(s, 0.94, yb - v * k, 1.0, yb - v * k, C.ink, 1); label(s, 0.5, yb - v * k - 0.1, 0.4, String(v), { size: 10, align: 'right', h: 0.2 }); line(s, 1.0, yb - v * k, 6.1, yb - v * k, 'E6EBF4', 0.5); });
      MATS.forEach(([n, , col], i) => {
        const x = 1.3 + i * 1.2, h = DROP[i] * k;
        box(s, x, yb - h, 0.8, h, col, null);
        label(s, x - 0.1, yb - h - 0.26, 1.0, String(DROP[i]), { size: 10.5, bold: true, color: col, h: 0.24 });
        label(s, x - 0.2, yb + 0.05, 1.2, n, { size: 10, bold: true, color: C.ink, h: 0.24 });
      });
    },
    head: 'Sources of error',
    lines: [
      '**Different thicknesses** of material → unfair test (a systematic difference).',
      '**Reading the thermometer** at slightly wrong times or with parallax error → random error.',
      'Water **not stirred** → temperature not the same throughout.',
      '**Starting temperatures** differ slightly → compare temperature drops, not final temperatures.',
      'Draughts or a heater nearby change the rate of cooling of some beakers.',
    ],
    worked: { head: 'Improvements', q: '',
      steps: [['Sensors', 'use temperature probes and a data logger to record automatically'], ['Repeats', 'repeat each material 3 times and calculate a mean drop'], ['Fair test', 'same number of layers; same place in the room'], ['Answer', 'more accurate, more repeatable results']], size: 10.5 },
    qc: 'A student’s cotton-wool beaker started at 85 °C, the others at 80 °C. Explain why comparing final temperatures would be unfair.',
    notes: 'QUICK CHECK ANSWER: A higher starting temperature means a larger temperature difference with the room, so faster cooling at first and a different final temperature (1); compare the temperature drop, or start all beakers at the same temperature (1).\nBar heights: drops 42, 33, 27, 20 °C (asserted), scale 0.075 in per °C.',
  });
  practicalPill(s);
  reg(s, 'Practical: analysis and errors');
}

// ======================= 26 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Suggested practical • comparing thermal insulators', [
  { q: 'Name the **independent** and **dependent** variables in the insulation investigation, and give **two control variables**.', marks: 3, ms: 'IV: type of insulating material (1); DV: temperature (drop) of the water (1); two controls from: volume of water, starting temperature, thickness of material, beaker size, lid, room temperature (1).' },
  { q: 'Water in a beaker wrapped in felt cools from **75 °C** to **45 °C** in **15 minutes**. Calculate the mean rate of cooling.', marks: 2, ms: '(75 − 45) ÷ 15 (1); = 2.0 °C per minute (1).' },
  { q: 'Suggest **one improvement** to the method and explain how it improves the results.', marks: 2, ms: 'e.g. use temperature probe/data logger (1) – removes reading/timing errors, more accurate (1); or repeat and calculate a mean (1) – reduces effect of random errors/identify anomalies (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 27 NON-RENEWABLE RESOURCES =======================
reg(D.contentSlide({
  title: 'Non-renewable energy resources',
  subtitle: `Specification ${sp('3.13')} • fossil fuels and nuclear fuel will run out`,
  tag: '3.13', caption: 'a thermal power station: the energy stores at each stage',
  draw: (s, p) => {
    const st = [
      ['fuel: coal, oil, gas or nuclear fuel', 'chemical or nuclear store', STORE.CH],
      ['boiler: water heated to steam', 'thermal store of the steam', STORE.TH],
      ['turbine: steam turns the blades', 'kinetic store of the turbine', STORE.KE],
      ['generator: magnet spins in coils', 'transferred electrically', STORE.EL],
      ['National Grid → homes and industry', 'electricity supply', C.ink],
    ];
    st.forEach(([t, e, col], i) => {
      const y = 1.5 + i * 0.86;
      chip(s, 0.75, y, 3.0, 0.6, t, col, { size: 10.5 });
      label(s, 3.9, y, 1.55, e, { h: 0.6, size: 10.5, italic: true, bold: true, color: col, align: 'left' });
      if (i < st.length - 1) arrow(s, 2.25, y + 0.62, 2.25, y + 0.84, C.grey, 2);
    });
    chimneyIcon(s, 5.55, 2.95, 0.8, 1.1);
    label(s, 5.4, 3.0, 1.1, 'fossil fuel', { size: 10, bold: true, color: C.ink, h: 0.22 });
    atomIcon(s, 5.95, 3.95, 0.32);
    label(s, 5.4, 4.35, 1.1, 'nuclear', { size: 10, bold: true, color: C.ink, h: 0.22 });
    label(s, 3.9, 5.75, 2.4, 'about 2/3 of the energy is wasted', { size: 10, italic: true, color: C.red, align: 'left', h: 0.2 });
  },
  head: 'Fossil fuels and nuclear fuel',
  lines: [
    '**Non-renewable:** will run out; cannot be replaced as fast as we use them.',
    '**Fossil fuels** (coal, oil, natural gas): electricity, heating, **transport**. Reliable, on demand; but burning releases **CO₂** (climate change) and coal releases **SO₂** (acid rain).',
    '**Nuclear fuel** (uranium): no CO₂ when generating, lots of energy from a little fuel; but **radioactive waste**, high costs and risk of accidents.',
  ],
  worked: { head: 'Describe it', q: 'Describe how a gas-fired power station generates electricity.',
    steps: [['Burn', 'gas burns: chemical store → thermal store of water/steam'], ['Turbine', 'high-pressure steam turns a turbine (kinetic store)'], ['Generator', 'the turbine turns a generator'], ['Answer', 'energy transferred electrically to the National Grid']], size: 10.5 },
  qc: 'Give one advantage and one disadvantage of using nuclear fuel instead of coal to generate electricity.',
  notes: 'QUICK CHECK ANSWER: Advantage: no CO₂/greenhouse gases or SO₂ released when generating / very large energy from small mass of fuel / reliable base load. Disadvantage: radioactive waste that must be stored for a long time / risk of accidents / high building and decommissioning costs / still non-renewable.\nSpec 3.13 lists fossil fuels, nuclear fuel, bio-fuel, wind, hydro-electricity, the tides and the Sun (high confidence on the list).',
}), '3.13 Non-renewable resources');

// ======================= 28 RENEWABLE RESOURCES =======================
{
  const s = D.contentHeader('Renewable energy resources', `Specification ${sp('3.13')} • resources that are replaced as fast as we use them`, { tag: '3.13' });
  const R = [
    ['Wind', 'Moving air turns a turbine and generator.', 'No fuel cost, no CO₂ • unreliable: no wind, no power; visual and noise impact', (x, y) => turbineIcon(s, x, y + 0.75, 0.6)],
    ['Solar (the Sun)', 'Solar cells transfer light energy electrically; solar panels heat water.', 'No CO₂ • none at night, less in winter or when cloudy', (x, y) => sunIcon(s, x, y + 0.35, 0.18)],
    ['Hydro-electricity', 'Water stored behind a dam falls through turbines.', 'Reliable, on demand • floods valleys, destroys habitats', (x, y) => damIcon(s, x - 0.4, y + 0.75, 0.8, 0.6)],
    ['Tides', 'Tidal barrage traps water at high tide, releases it through turbines.', 'Predictable • few suitable sites; affects estuary wildlife', (x, y) => wavesIcon(s, x - 0.4, y + 0.3, 0.8)],
    ['Bio-fuel', 'Fuel from plants or waste, burned like a fossil fuel.', '“Carbon neutral”: plants absorb CO₂ as they grow • uses farmland', (x, y) => leafIcon(s, x, y + 0.4, 0.55)],
    ['Uses', 'Mostly to generate **electricity**; bio-fuels also for **transport**; solar for **heating** water.', 'Renewables cannot yet meet all demand at every moment', (x, y) => chip(s, x - 0.35, y + 0.2, 0.7, 0.42, 'UK', C.ink, { size: 11 })],
  ];
  R.forEach(([n, how, pc, icon], i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.45 + col * 4.2, y = 1.3 + row * 2.45, w = 4.0, h = 2.3;
    box(s, x, y, w, h, i === 5 ? C.cream : C.cardBlue, i === 5 ? 'F1D9A8' : C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.75 });
    box(s, x + 0.12, y + 0.12, 1.0, 1.0, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 0.5 });
    icon(x + 0.62, y + 0.17);
    label(s, x + 1.25, y + 0.12, w - 1.35, n, { size: 13, bold: true, color: C.ink, align: 'left', h: 0.32 });
    s.addText(T.rich(how, { fontSize: 11, color: C.text }), { x: x + 1.25, y: y + 0.45, w: w - 1.4, h: 0.75, fontFace: 'Calibri', valign: 'top', margin: 0 });
    s.addText(T.rich(pc, { fontSize: 10.5, color: C.text, italic: true }), { x: x + 0.15, y: y + 1.25, w: w - 0.3, h: h - 1.35, fontFace: 'Calibri', valign: 'top', margin: 0 });
  });
  D.quickCheck(s, 'Explain why a country cannot rely only on wind and solar power to generate its electricity.');
  D.notes(s, 'QUICK CHECK ANSWER: Wind and solar are unreliable / depend on the weather and time of day (1); demand must be met at all times, so reliable sources (gas, nuclear, hydro) or energy storage are needed as back-up (1).\nRenewable resources in 3.13: bio-fuel, wind, hydro-electricity, tides, the Sun (geothermal and waves are not named in the Edexcel list but can be mentioned).');
  reg(s, '3.13 Renewable resources');
}

// ======================= 29 COMPARING RESOURCES =======================
{
  const s = D.contentHeader('Comparing energy resources', `Specification ${sp('3.13')} • reliability, environmental impact and use`, { tag: '3.13' });
  const H = ['Resource', 'Renewable?', 'Reliable?', 'CO₂ when generating?', 'Main environmental issue', 'Main uses'];
  const R = [
    ['Coal, oil, gas', 'No', 'Yes', 'Yes', 'CO₂ → climate change; SO₂ → acid rain; oil spills', 'Electricity, heating, transport'],
    ['Nuclear fuel', 'No', 'Yes', 'No', 'Long-lived radioactive waste; accident risk', 'Electricity'],
    ['Bio-fuel', 'Yes', 'Yes', 'Yes (but absorbed in growth)', 'Land for crops, forests cleared', 'Transport, electricity'],
    ['Wind', 'Yes', 'No', 'No', 'Visual and noise impact; birds', 'Electricity'],
    ['Solar', 'Yes', 'No', 'No', 'Land use for solar farms', 'Electricity, heating water'],
    ['Hydro-electricity', 'Yes', 'Yes', 'No', 'Flooded valleys; habitats lost', 'Electricity'],
    ['Tides', 'Yes', 'Yes (predictable)', 'No', 'Estuary habitats changed', 'Electricity'],
  ];
  const yes = t => t.startsWith('Yes'), cellC = (t, j) => j === 1 ? (yes(t) ? C.green : C.red) : j === 2 ? (yes(t) ? C.green : C.red) : j === 3 ? (yes(t) ? C.red : C.green) : C.text;
  const rows = [H.map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } })),
    ...R.map((r, i) => r.map((t, j) => ({ text: t, options: { fill: { color: i % 2 ? C.white : C.cardBlue }, bold: j === 0 || (j >= 1 && j <= 3), color: j === 0 ? C.ink : cellC(t, j) } })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: W_ - 0.9, colW: [1.9, 1.3, 1.55, 1.95, 3.7, 2.033], rowH: 0.56, fontFace: 'Calibri', fontSize: 11.5, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.quickCheck(s, 'Use the table: name one resource that is renewable AND reliable, and one that is reliable but releases CO₂. Suggest why the UK still uses gas.');
  D.notes(s, 'QUICK CHECK ANSWER: Renewable and reliable: hydro-electricity or tides (or bio-fuel). Reliable but CO₂: coal, oil, gas (or bio-fuel). Gas: can be switched on quickly to meet changes in demand, backs up wind and solar, existing power stations and supply network.\nThis summary supports 3.13 “compare the ways in which both renewable and non-renewable sources are used”.');
  reg(s, '3.13 Comparing resources');
}

// ======================= 30 TRENDS =======================
{
  const s = D.contentHeader('Patterns and trends in energy use', `Specification ${sp('3.14')} • how the UK generates its electricity has changed`, { tag: '3.14' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'ILLUSTRATIVE approximate data, rounded: share of UK electricity generation');
  const x0 = 1.3, yb = 5.15, Hc = 3.4, bw = 0.5, gap = 0.22;
  const COLS = [['coal', '4A4A4A'], ['gas', 'E39A2F'], ['nuclear', '7B4FB8'], ['renewables', C.green], ['other', 'A9AFBB']];
  [0, 20, 40, 60, 80, 100].forEach(v => { const y = yb - v / 100 * Hc; line(s, x0 - 0.06, y, x0 + 6 * (bw + gap), y, v ? 'E6EBF4' : C.ink, v ? 0.5 : 1.5); label(s, x0 - 0.5, y - 0.1, 0.4, String(v), { size: 10, align: 'right', h: 0.2 }); });
  line(s, x0, yb, x0, yb - Hc, C.ink, 1.5);
  label(s, 0.72 - Hc / 2, yb - Hc / 2 - 0.14, Hc, 'share of electricity / %', { size: 10.5, bold: true, rotate: 270 });
  MIX.forEach((r, i) => {
    const x = x0 + 0.15 + i * (bw + gap);
    let y = yb;
    r.forEach((v, j) => { const h = v / 100 * Hc; if (h > 0) { box(s, x, y - h, bw, h, COLS[j][1], C.white, { lw: 0.5 }); if (v >= 10) label(s, x, y - h, bw, String(v), { h, size: 10, bold: true, color: C.white }); } y -= h; });
    label(s, x - 0.1, yb + 0.05, bw + 0.2, MIXY[i], { size: 10, bold: true, h: 0.22 });
  });
  label(s, x0, yb + 0.3, 6 * (bw + gap), 'year', { size: 10.5, bold: true, h: 0.22 });
  COLS.forEach(([n, c], j) => { const y = 1.75 + j * 0.34; box(s, 5.95, y + 0.05, 0.22, 0.2, c, null); label(s, 6.22, y, 0.8, n, { size: 10, bold: true, align: 'left', h: 0.3 }); });
  D.card(s, 7.3, 1.3, 5.58, 2.9, 'Patterns and trends', [
    '**Coal** fell from about a third to **zero** (the last UK coal power station closed in 2024).',
    '**Renewables** (mainly wind) rose from about **3% to about 50%**.',
    '**Gas** is still important: it can be switched on quickly when demand rises or the wind drops.',
    '**Nuclear** is falling slowly as old power stations close.',
  ], { size: 11 });
  D.card(s, 7.3, 4.35, 5.58, 1.9, 'Reasons for the trends', [
    'Laws and targets to **cut CO₂** emissions (climate change).',
    'Falling cost of **wind turbines and solar panels**; fossil fuels running out.',
    'Rising world population and use of electricity (e.g. electric cars) increase **demand**.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the chart: by how many percentage points did the renewable share rise from 2010 to 2020? Suggest two reasons.');
  D.notes(s, `QUICK CHECK ANSWER: 43 − 7 = 36 percentage points. Reasons: government targets/laws to reduce CO₂; cheaper wind/solar technology; subsidies; closing coal power stations; public concern about climate change.\nDATA: ILLUSTRATIVE, rounded to resemble published UK generation shares (DESNZ/Energy Trends); each year sums to 100% (asserted). Check current figures before using as fact. Fossil share fell from ${MIX[0][0] + MIX[0][1]}% (2000) to ${MIX[5][0] + MIX[5][1]}% (2024).`);
  reg(s, '3.14 Patterns and trends');
}

// ======================= 31 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('3.13')}, ${sp('3.14')} • energy resources and trends`, [
  { q: 'Explain what is meant by a **renewable** energy resource. Give **one** example.', marks: 2, ms: 'Replenished/replaced as quickly as it is used / will not run out (1); e.g. wind, solar, hydro, tides, bio-fuel (1).' },
  { q: 'Give **two** disadvantages of using **wind turbines** to generate electricity.', marks: 2, ms: 'Any two: unreliable / no electricity when there is no wind (or too much) (1); visual pollution / noise / harm to birds / need many turbines / large areas of land or sea (1).' },
  { q: 'In 2000 about **3%** of UK electricity came from renewable resources. In 2024 it was about **50%**. Describe this trend and suggest **two** reasons for it.', marks: 3, ms: 'Renewable share increased greatly / by about 47 percentage points (1); any two reasons: targets/laws to reduce CO₂ emissions / climate change; fossil fuels running out; cheaper wind and solar technology; government subsidies (2).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 32 EQUATIONS =======================
reg(D.equationsSlide([['GPE', sp('3.1')], ['KE', sp('3.2')], ['eff', sp('3.11')], ['Wmg', '2.16 (link)'], ['WFd', 'Topic 8 (link)']], {
  subtitle: 'Topic 3 equations • RECALL = learn it; GIVEN = on the Physics Equations List',
  qc: 'Cover the middle column. For each equation, say every quantity and its unit aloud. Then rearrange each one for a different subject.',
  notes: 'QUICK CHECK: self-check against the table. All three Topic 3 equations are RECALL (none on the Physics Equations List). Links: W = m × g (Topic 2) and work done E = F × d (Topic 8) are also recall. Rearrangements: Δh = ΔGPE ÷ (m g); m = 2KE ÷ v²; v = √(2KE ÷ m); useful = efficiency × total.',
}), 'Summary: equations');

// ======================= 33 KEY WORDS =======================
reg(D.keyWords([
  ['Energy store', 'Where energy is held: kinetic, gravitational, elastic, thermal, chemical…'],
  ['Energy transfer', 'Energy moving between stores: mechanically, electrically, by heating, by radiation.'],
  ['System', 'An object or group of objects being studied.'],
  ['Closed system', 'No net change in the total energy: transfers happen only inside it.'],
  ['Conservation of energy', 'Energy cannot be created or destroyed, only transferred, stored or dissipated.'],
  ['Gravitational PE', 'Energy stored by height: ΔGPE = m × g × Δh.'],
  ['Kinetic energy', 'Energy of a moving object: KE = ½ × m × v².'],
  ['Dissipated', 'Spread out into the surroundings and stored in less useful ways.'],
  ['Wasted energy', 'Energy not transferred usefully, usually to thermal stores.'],
  ['Sankey diagram', 'Energy transfer diagram with arrow widths drawn to scale.'],
  ['Lubrication', 'Oil or grease that reduces friction between moving parts.'],
  ['Thermal insulation', 'Material that reduces the rate of energy transfer by heating.'],
  ['Thermal conductivity', 'How well a material transfers energy by conduction.'],
  ['Efficiency', 'Useful energy transferred ÷ total energy supplied.'],
  ['Renewable resource', 'Replaced as fast as it is used: wind, solar, hydro, tides, bio-fuel.'],
  ['Non-renewable', 'Will run out: coal, oil, gas, nuclear fuel.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= 34 FULL QUESTION =======================
reg(D.fullQuestion('A rollercoaster car of mass **600 kg** is pulled to the top of a ride, **30 m** above the ground, by an electric motor. It is then released and runs down the track. g = 10 N/kg.', [
  { l: 'a', q: 'State the equation linking change in gravitational potential energy, mass, gravitational field strength and change in vertical height.', marks: 1, ms: 'ΔGPE = m × g × Δh (1) (words or symbols).' },
  { l: 'b', q: 'Calculate the gravitational potential energy gained by the car.', marks: 2, ms: 'ΔGPE = 600 × 10 × 30 (1); = 180 000 J (1).' },
  { l: 'c', q: 'The motor is supplied with **300 000 J** while lifting the car. Calculate the efficiency of the motor.', marks: 2, ms: 'efficiency = 180 000 ÷ 300 000 (1); = 0.60 or 60% (1). ECF from (b).' },
  { l: 'd', q: 'Assume no energy is dissipated. Show that the speed of the car at the bottom of the ride would be about **24 m/s**.', marks: 3, h: 1.2, ms: 'KE at bottom = GPE lost = 180 000 J (1); v² = 2 × 180 000 ÷ 600 = 600 (1); v = 24.5 m/s ≈ 24 m/s (1) (must see a value to more than 2 s.f. or full working).' },
  { l: 'e', q: 'The actual speed at the bottom is **22 m/s**. Calculate the kinetic energy of the car and the energy dissipated.', marks: 3, h: 1.2, ms: 'KE = 0.5 × 600 × 22² (1); = 145 200 J (1); dissipated = 180 000 − 145 200 = 34 800 J (1). ECF from (b).' },
  { l: 'f', q: 'Explain where the dissipated energy goes, and suggest **one** way to reduce it.', marks: 2, ms: 'Thermal store of the track/wheels/air (and sound) due to friction and air resistance (1); lubricate the wheels / streamline the car / smoother track (1).' },
], 13, { subtitle: 'Specification 3.1, 3.2, 3.5, 3.7–3.12 • answer every part • 13 marks' }), 'Full question');

// ======================= 35–36 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the energy store that **decreases** in each case: **(a)** a battery-powered torch is switched on; **(b)** a car brakes to a stop.', marks: 2, ms: '(a) chemical store (of the battery) (1); (b) kinetic store (of the car) (1).' },
  { n: '2', q: 'A **0.060 kg** tennis ball is served at **40 m/s**. Calculate its kinetic energy.', marks: 3, ms: 'KE = ½ × m × v² (1); = 0.5 × 0.060 × 40² (1); = 48 J (1).' },
  { n: '3', q: 'A lamp is supplied with **400 J**. It transfers **60 J** by light. Calculate **(a)** its efficiency and **(b)** the energy wasted.', marks: 3, ms: '(a) 60 ÷ 400 (1); = 0.15 or 15% (1); (b) 400 − 60 = 340 J (1).' },
  { n: '4', q: 'Explain how the **thickness** and the **thermal conductivity** of a house’s walls affect how quickly the house cools.', marks: 3, ms: 'Thicker walls → slower rate of energy transfer / cools more slowly (1); lower thermal conductivity → slower rate of energy transfer (1); so thick walls of low-conductivity material keep the house warm for longer / need less heating (1).' },
  { n: '5', q: 'The UK now generates much less electricity from fossil fuels and much more from renewable resources than in 2000. Discuss the advantages and disadvantages of this change.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Fossil fuels (coal, oil, gas) are non-renewable and will run out; renewables will not.',
    'Burning fossil fuels releases CO₂ (greenhouse gas → climate change); coal releases SO₂ (acid rain).',
    'Renewables (wind, solar, hydro, tides) release no CO₂ when generating; bio-fuel is (nearly) carbon neutral.',
    'Renewables have no fuel costs; fossil fuels must be extracted, transported and often imported.',
    'But wind and solar are unreliable: depend on weather/time of day; output cannot be increased on demand.',
    'Fossil-fuel (gas) power stations are reliable and can be switched on quickly to meet peaks in demand.',
    'So back-up (gas, nuclear, hydro) or energy storage is still needed.',
    'Renewables can have environmental impacts: visual/noise (wind), flooding valleys (hydro), habitats (tidal), land use.',
    'Building renewable capacity has high initial costs; many sites needed.',
  ], 'Level 3 answers must give advantages AND disadvantages and reach a reasoned judgement.');
}
D.homework('Answer every question. Show your working for calculations. g = 10 N/kg.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 8); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 8); assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7);
assert(D.slideNo >= 30 && D.slideNo <= 38, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T3_ConservationOfEnergy.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
