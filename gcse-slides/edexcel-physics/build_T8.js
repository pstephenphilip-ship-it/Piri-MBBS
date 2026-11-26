// build_T8.js — Edexcel GCSE Physics 1PH0 Topic 8 Energy – forces doing work (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T8.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 8,
  title: 'Energy – forces doing work',
  shortTitle: 'T8',
  subtitle: 'Energy transfers, work done, power and efficiency',
  specRange: '8.1–8.14',
  pOnly: [],
  paper: 'Paper 2',
  keywords: ['Energy stores', 'Closed systems', 'Work done', 'Dissipation', 'Power', 'Efficiency'],
};
const D = T.init(DECK);
const { line, arrow, forceArrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const sp = D.spec;
const g = 10;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

Object.assign(T.EQS, {
  GPE: { eq: 'ΔGPE = m × g × Δh', words: 'change in gravitational potential energy (J) = mass (kg) × g (N/kg) × change in vertical height (m)', status: 'recall' },
  KE: { eq: 'KE = ½ × m × v²', words: 'kinetic energy (J) = ½ × mass (kg) × (speed (m/s))²', status: 'recall' },
  eff: { eq: 'efficiency = useful ÷ total', words: 'efficiency = useful energy transferred ÷ total energy supplied (or useful power ÷ total power); × 100 for a percentage', status: 'recall' },
});

// ======================= CALCULATIONS (asserted) =======================
calc('W = 50 × 4', 50 * 4, 200);
calc('lift person 600 N × 3 m', 600 * 3, 1800);
calc('YT 250 × 12', 250 * 12, 3000);
calc('YT d = 4500 / 150', 4500 / 150, 30, 1e-12);
calc('YT F = 900 / 0.6', 900 / 0.6, 1500, 1e-9);
calc('YT 2.4 kJ / 80 N', 2400 / 80, 30, 1e-12);
calc('car KE 0.5 × 1000 × 20²', 0.5 * 1000 * 20 * 20, 200000);
calc('stopping distance 200000 / 5000', 200000 / 5000, 40, 1e-12);
calc('crane GPE 500 × 10 × 12', 500 * g * 12, 60000);
calc('crane power 60000 / 30', 60000 / 30, 2000, 1e-12);
calc('stairs 60 × 10 × 3.0 / 4.0', 60 * g * 3.0 / 4.0, 450, 1e-12);
calc('kettle 2000 × 120', 2000 * 120, 240000);
calc('YT 1200 / 8', 1200 / 8, 150, 1e-12);
calc('YT 60 W × 60 s', 60 * 60, 3600);
calc('YT 0.45 MJ / 3 kW', 450000 / 3000, 150, 1e-12);
calc('YT stairs 50 kg 4.5 m 6 s', 50 * g * 4.5 / 6, 375, 1e-12);
calc('motor 400/500', 400 / 500, 0.8, 1e-12);
calc('bulb 6/60', 6 / 60, 0.1, 1e-12);
calc('useful 0.25 × 2000', 0.25 * 2000, 500, 1e-12);
calc('input 360 / 0.6', 360 / 0.6, 600, 1e-9);
calc('lift useful 800×10×15', 800 * g * 15, 120000);
calc('lift input 4000 × 40', 4000 * 40, 160000);
calc('lift efficiency', 120000 / 160000, 0.75, 1e-12);
calc('Sankey 60+30+10', 60 + 30 + 10, 100);
calc('drop: 2 kg from 5 m GPE', 2 * g * 5, 100);
calc('drop speed sqrt(2gh) (m/s, 3 s.f.)', sf(Math.sqrt(2 * g * 5), 3), 10, 1e-12);
calc('R2 W = 120 × 25', 120 * 25, 3000);
calc('R3 P 2.4 kJ / 30 s', 2400 / 30, 80, 1e-12);
calc('FQ GPE 70 × 10 × 6', 70 * g * 6, 4200);
calc('FQ P = 4200 / 12', 4200 / 12, 350, 1e-12);
calc('FQ eff 4200 / 6000', 4200 / 6000, 0.7, 1e-12);
calc('HW W 40 × 15', 40 * 15, 600);
calc('HW P 600 / 20', 600 / 20, 30, 1e-12);

// ======================= DECK-SPECIFIC drawing helpers =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: fill ? { color: fill } : { type: 'none' }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: o.rot, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
function polyline(s, pts, col, w = 1.5, o = {}) { for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, w, o); }
function sine(s, x0, x1, yc, A, lam, col = C.blue, w = 2.5, ph = 0) {
  const pts = []; const n = Math.max(40, Math.round((x1 - x0) / lam * 24));
  for (let i = 0; i <= n; i++) { const x = x0 + (x1 - x0) * i / n; pts.push([x, yc - A * Math.sin(2 * Math.PI * (x - x0) / lam + ph)]); }
  polyline(s, pts, col, w);
}
function dim(s, x1, y1, x2, y2, txt, col = C.red, o = {}) {
  line(s, x1, y1, x2, y2, col, 1.5, { head: true, tail: true });
  label(s, (x1 + x2) / 2 - (o.w || 1.4) / 2 + (o.dx || 0), (y1 + y2) / 2 + (o.dy != null ? o.dy : -0.32), o.w || 1.4, txt, { size: o.size || 10.5, bold: true, color: col });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
const table = (s, rows, o) => s.addTable(rows, Object.assign({ fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } }, o));
function slinky(s, x0, x1, yc, h, n, comp, col = C.blue) {
  // comp: function(u in 0..1) -> local density factor; spacing varies to show compressions
  const xs = []; let acc = 0; const dens = []; for (let i = 0; i < 400; i++) dens.push(comp(i / 399)); const tot = dens.reduce((a, b) => a + b);
  let cum = 0, k = 0; for (let i = 0; i < 400 && k < n; i++) { cum += dens[i]; if (cum / tot >= k / (n - 1)) { xs.push(x0 + (x1 - x0) * i / 399); k++; } }
  xs.forEach(x => line(s, x, yc - h / 2, x, yc + h / 2, col, 1.5));
  return xs;
}
function person(s, x, yFeet, col = C.ink) {
  ball(s, x, yFeet - 1.0, 0.13, C.white, col, 1.5);
  line(s, x, yFeet - 0.87, x, yFeet - 0.4, col, 2); line(s, x, yFeet - 0.4, x - 0.15, yFeet, col, 2); line(s, x, yFeet - 0.4, x + 0.15, yFeet, col, 2);
  line(s, x - 0.2, yFeet - 0.7, x + 0.2, yFeet - 0.7, col, 2);
}
function stopwatch(s, cx, cy, r = 0.22) { ball(s, cx, cy, r, C.white, C.ink, 1.5); box(s, cx - 0.04, cy - r - 0.08, 0.08, 0.08, C.ink, null); line(s, cx, cy, cx + r * 0.5, cy - r * 0.5, C.red, 1.5); }
function pPill(s) { /* header already shows PHYSICS ONLY via opts.p */ }


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

function crate(s, x, y, w, h) { box(s, x, y, w, h, 'C99A5B', '8A6A3A', { lw: 1.5 }); line(s, x, y, x + w, y + h, '8A6A3A', 1); line(s, x + w, y, x, y + h, '8A6A3A', 1); }
function stepBoxes(s, x, y, w, items, o = {}) {
  const h = o.h || 0.62, gap = o.gap || 0.15;
  items.forEach(([t, col], i) => {
    const yy = y + i * (h + gap);
    box(s, x, yy, w, h, col || C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
    ball(s, x + 0.3, yy + h / 2, 0.19, C.blue, C.blue); label(s, x + 0.11, yy + h / 2 - 0.15, 0.38, String(i + 1), { size: 11, bold: true, color: C.white, h: 0.3 });
    s.addText(T.rich(t), { x: x + 0.6, y: yy, w: w - 0.7, h, fontFace: 'Calibri', fontSize: o.size || 11, valign: 'middle', margin: 0, color: C.text });
    if (i < items.length - 1) arrow(s, x + 0.3, yy + h, x + 0.3, yy + h + gap, C.ink, 1.25);
  });
}
function suggestedPill(s) { D.pill(s, 13.333 - 0.45 - 2.1, 0.32, 'SUGGESTED PRACTICAL', C.orange, 2.1); }

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Forces doing work',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • energy transfers, work done, power and efficiency` },
    { icon: 'H', text: 'Higher & Foundation in one deck • same content in Combined Science' },
    { icon: '8', text: 'Topic 8 of 15 • assessed on Paper 2 • no Core Practical' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 8 Energy – forces doing work. Paper 2. No physics-only or Higher-only statements believed (medium confidence). No Core Practical; a suggested stair-climbing power practical is included. Equations E = F × d, P = E ÷ t and efficiency are all RECALL. Numbering reconstructed: see SPEC_T8.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '8.1–8.3', text: 'Describe **energy stores** and **transfers**; energy in a **closed system**.' },
  { code: '8.4', text: 'Identify how energy changes: **work done by forces**, **electrical** equipment, **heating**.' },
  { code: '8.5–8.6', text: 'Measure and calculate **work done**: **E = F × d**.' },
  { code: '8.7–8.8', text: 'Calculate energy changes caused by **work done** (GPE, KE, braking).' },
  { code: '8.9–8.10', text: 'Explain **dissipation** and why heating makes processes **wasteful**.' },
  { code: '8.11–8.13', text: 'Define **power**; use **P = E ÷ t**; **1 W = 1 J/s**.' },
  { code: '8.14', text: 'Calculate **efficiency** from energy or power.' },
  { code: 'Practical', text: '**Suggested:** measure your own **power** climbing stairs.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'No HT or P statements believed in Topic 8.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 8 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['8.1–8.3', 'Energy stores, transfers and closed systems', 'BOTH COURSES', C.grey],
    ['8.4', 'Work, electrical and heating transfers', 'BOTH COURSES', C.grey],
    ['8.5–8.8', 'Work done: E = F × d; GPE and KE changes', 'BOTH COURSES', C.grey],
    ['8.9–8.10', 'Dissipation and wasteful heating', 'BOTH COURSES', C.grey],
    ['8.11–8.13', 'Power: P = E ÷ t', 'BOTH COURSES', C.grey],
    ['Practical', 'Suggested: power climbing stairs', 'SUGGESTED', C.orange],
    ['8.14', 'Efficiency', 'BOTH COURSES', C.grey],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 8\nForces doing work', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 10.5, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.35);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 3 conservation of energy and efficiency • Topic 2 braking • Topic 10 electrical power', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 8–15.',
      'Combined Science 1SC0 tests the **same** Topic 8 statements.',
      '**Recall:** E = F × d, P = E ÷ t, efficiency (and GPE, KE).',
      'g = **10 N/kg** in every calculation.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Not physics-only**: Combined classes use every slide.',
      '**No HT statements** believed; harder maths is marked as stretch in questions.',
      '**No Core Practical**; the stair-climbing investigation is suggested.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'No physics-only or HT statements believed in Topic 8 (medium confidence). Topic 3 already covered stores, conservation, Sankey diagrams and efficiency: slides 5–7 and 17–18 are recap-plus. Numbering reconstructed; Tutordex confirms 8.6 = work done equation.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 3 • energy', q: 'Name **four** energy stores.' },
  { from: 'Topic 3 • energy', q: 'State the equation for **kinetic energy**.' },
  { from: 'Topic 3 • efficiency', q: 'A lamp is supplied with **100 J** and gives out **20 J** of light. Calculate its efficiency.' },
  { from: 'Topic 2 • forces', q: 'Calculate the **weight** of a **50 kg** person (g = 10 N/kg).' },
  { from: 'Topic 1 • units', q: 'Convert **3.5 kJ** into joules and **2 minutes** into seconds.' },
  { from: 'Topic 2 • braking', q: 'Which force does work to stop a car when it brakes?' },
], { subtitle: 'Recall from Topics 1–3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Any four: kinetic, gravitational potential, elastic potential, thermal, chemical, magnetic, electrostatic, nuclear.\n2. KE = ½ × m × v².\n3. 20 ÷ 100 = 0.2 (20%).\n4. 500 N.\n5. 3500 J; 120 s.\n6. Friction (between brakes and wheels).' }), 'Retrieval starter');

// ======================= 5 STORES & CLOSED SYSTEMS =======================
reg(D.contentSlide({
  title: 'Energy stores and closed systems',
  subtitle: `Specification ${sp('8.1')}–${sp('8.3')} • how energy is stored changes; the total does not`,
  tag: '8.1–8.3', caption: 'a 2 kg ball dropped from 5 m: energy stores at the top and just before landing (to scale)',
  draw: (s, p) => {
    const yb = 4.9, k = 0.025;
    [[1.5, 'top', 100, 0], [4.3, 'bottom', 0, 100]].forEach(([x, t, gpe, ke]) => {
      if (gpe) box(s, x, yb - gpe * k, 0.6, gpe * k, STORE.GPE, null); if (ke) box(s, x + 0.75, yb - ke * k, 0.6, ke * k, STORE.KE, null);
      label(s, x - 0.1, yb + 0.05, 0.8, 'GPE', { size: 10, bold: true, color: STORE.GPE, h: 0.25 }); label(s, x + 0.65, yb + 0.05, 0.8, 'KE', { size: 10, bold: true, color: STORE.KE, h: 0.25 });
      label(s, x - 0.2, yb + 0.35, 1.8, `**${t}**`, { size: 11, h: 0.3 });
      label(s, x - 0.3, yb - (gpe || ke) * k - 0.3, 2.0, '100 J', { size: 10, bold: true, h: 0.25 });
    });
    line(s, 1.3, yb, 2.95, yb, C.ink, 1); line(s, 4.1, yb, 5.75, yb, C.ink, 1);
    arrow(s, 3.15, 3.6, 3.95, 3.6, C.red, 3); label(s, 2.9, 3.15, 1.3, 'falls', { size: 10.5, bold: true, color: C.red, h: 0.3 });
  },
  head: 'Key ideas',
  lines: [
    'Energy stores: **kinetic**, **gravitational potential**, **elastic potential**, **thermal**, **chemical**, **magnetic**, **electrostatic**, **nuclear**.',
    'When a **system** changes, energy is **transferred** between stores.',
    '**Conservation of energy:** energy cannot be created or destroyed.',
    'In a **closed system** (nothing enters or leaves) there is **no net change** in the **total** energy, only in how it is stored.',
  ],
  worked: { head: 'Worked example', q: 'A 2.0 kg ball falls 5.0 m. Ignoring air resistance, find its KE just before landing.',
    steps: [['GPE lost', 'm g Δh = 2.0 × 10 × 5.0 = 100 J'], ['Conserve', 'KE gained = GPE lost'], ['Answer', 'KE = 100 J (speed 10 m/s)']], size: 11 },
  workedH: 1.75,
  qc: 'Describe the energy transfer when a stretched catapult fires a stone upwards.',
  notes: 'QUICK CHECK ANSWER: elastic potential store of the catapult (1) → kinetic store of the stone (1) → gravitational potential store as it rises (and some thermal by air resistance) (1).\nSpec 8.1–8.3 (recap of Topic 3). Bars drawn to scale (1 J = 0.025 in).',
}), '8.1–8.3 Stores and closed systems');

// ======================= 6 ENERGY DIAGRAMS =======================
reg(D.contentSlide({
  title: 'Energy transfer diagrams',
  subtitle: `Specification ${sp('8.2')} • Sankey diagrams drawn to scale`,
  tag: '8.2', caption: 'an electric motor supplied with 100 J (1 J = 0.03 in)',
  draw: (s, p) => {
    sankey(s, 0.8, 1.8, 0.03, { v: 100, label: '100 J electrical' }, [{ v: 60, label: '60 J kinetic (useful)', color: STORE.KE }, { v: 30, label: '30 J thermal', color: C.red }, { v: 10, label: '10 J sound', color: 'E39A2F' }], { inLen: 1.7, outLen: 1.5, uw: 1.7, yEnd: 5.1 });
  },
  head: 'Reading a Sankey diagram',
  lines: [
    'The **width** of each arrow is **proportional** to the amount of energy.',
    'The **input** arrow on the left equals the **sum** of all output arrows (conservation of energy).',
    '**Useful** energy goes straight on; **wasted** energy bends away.',
    'Wasted energy is usually **dissipated** to the **thermal** store of the surroundings.',
  ],
  worked: { head: 'Use the diagram', q: 'Calculate the efficiency of the motor.',
    steps: [['Useful', '60 J kinetic'], ['Total', '100 J'], ['Answer', 'efficiency = 60 ÷ 100 = 0.60 (60%)']], size: 11 },
  workedH: 1.75,
  qc: 'A Sankey diagram has an input of **500 J** and a useful output of **350 J**. How much energy is wasted?',
  notes: 'QUICK CHECK ANSWER: 500 − 350 = 150 J (1).\nSpec 8.2. Sankey drawn to scale; outputs assert to the input.',
}), '8.2 Energy transfer diagrams');

// ======================= 7 WAYS ENERGY CHANGES =======================
reg(D.contentSlide({
  title: 'Three ways to change a system’s energy',
  subtitle: `Specification ${sp('8.4')} • work by forces, electrical equipment, heating`,
  tag: '8.4', caption: 'examples of each transfer pathway',
  draw: (s, p) => {
    const card = (y, t, d, col) => { box(s, 0.75, y, 5.5, 1.25, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 2 }); label(s, 0.9, y + 0.08, 5.2, `**${t}**`, { size: 12.5, color: col, h: 0.35, align: 'left' }); label(s, 0.9, y + 0.45, 5.2, d, { size: 10.5, h: 0.75, align: 'left', valign: 'top' }); };
    card(1.55, 'Work done by forces (mechanically)', 'pushing a trolley; lifting a box; friction slowing a car', C.blue);
    card(2.95, 'Electrical work', 'a current transfers energy from a battery to a motor or kettle', '7B4FB8');
    card(4.35, 'Heating', 'energy transferred because of a temperature difference: a hob heating a pan', C.red);
  },
  head: 'Key ideas',
  lines: [
    'Energy is transferred between stores by **work done by forces**, by **electrical work** (current in a circuit) and by **heating**.',
    'Radiation (light, infrared, sound waves) also transfers energy.',
    '**Work done** means energy transferred by a **force** moving an object.',
  ],
  worked: { head: 'Classify', q: 'Name the pathway: (a) a fan heater (b) a crane lifting a load.',
    steps: [['(a)', 'electrical work, then heating'], ['(b)', 'work done by a force (and electrical in the motor)'], ['Answer', 'state each pathway']], size: 11 },
  workedH: 1.75,
  qc: 'Name the energy transfer pathway when you **rub your hands** together.',
  notes: 'QUICK CHECK ANSWER: work done by forces (friction) (1), transferring energy to the thermal store of your hands (1).\nSpec 8.4.',
}), '8.4 Ways energy is transferred');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, '8.1–8.4 • stores and transfers', [
  { q: 'State what is meant by a **closed system**.', marks: 1, ms: 'A system where no energy (or matter) enters or leaves / total energy stays constant (1).' },
  { q: 'Describe the energy transfers when a battery-powered car speeds up.', marks: 2, ms: 'Chemical store of battery (1) → kinetic store of car, via electrical work (some to thermal) (1).' },
  { q: 'A 1.5 kg book falls 2.0 m. Calculate the GPE it loses. (g = 10 N/kg)', marks: 2, ms: '1.5 × 10 × 2.0 (1); = 30 J (1).' },
  { q: 'Name the three ways the energy of a system can be changed.', marks: 2, ms: 'Work done by forces; electrical work / equipment; heating (2 for all three; 1 for two).' },
]);
calc('R1 GPE 1.5 × 10 × 2', 1.5 * g * 2, 30, 1e-12);
reg(R1.s, 'Recap 1');

// ======================= 9 WORK DONE =======================
reg(D.contentSlide({
  title: 'Work done',
  subtitle: `Specification ${sp('8.5')}–${sp('8.6')} • E = F × d`,
  tag: '8.5–8.6', caption: 'pushing a crate 4.0 m with a 50 N force',
  draw: (s, p) => {
    line(s, 0.7, 4.3, 6.3, 4.3, C.ink, 2); for (let x = 0.8; x < 6.3; x += 0.25) line(s, x, 4.3, x - 0.15, 4.45, C.ink, 1);
    crate(s, 1.7, 3.3, 1.0, 1.0); crate(s, 4.7, 3.3, 1.0, 1.0);
    forceArrow(s, 2.7, 3.8, 'right', 0.9, '50 N', C.red, { lw: 1 });
    forceArrow(s, 1.7, 4.1, 'left', 0.6, 'friction', C.blue, { lw: 1.0, fs: 10 });
    line(s, 2.2, 2.8, 5.2, 2.8, '2E8B57', 1.5, { head: true, tail: true }); label(s, 3.0, 2.4, 1.4, '**d = 4.0 m**', { size: 11, color: '2E8B57', h: 0.3 });
    box(s, 1.6, 4.85, 3.8, 0.75, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 2 }); label(s, 1.6, 4.85, 3.8, '**E = F × d**', { size: 22, h: 0.75, color: C.ink });
  },
  head: 'Key ideas',
  lines: [
    '**Work is done** when a **force** moves an object: energy is **transferred**.',
    '**energy transferred = work done** (both in joules, J).',
    '**work done (J) = force (N) × distance moved in the direction of the force (m)**. RECALL.',
    '**Measuring work done:** measure the force with a **newtonmeter** and the distance moved with a **metre rule** or tape.',
    'If the object does not move in the direction of the force, **no work** is done.',
  ],
  worked: { head: 'Worked example', q: 'A 50 N force pushes a crate 4.0 m along the floor.',
    steps: [['Equation', 'E = F × d'], ['Substitute', 'E = 50 × 4.0'], ['Answer', 'E = 200 J']], size: 11 },
  workedH: 1.75,
  qc: 'A person of weight **600 N** climbs stairs **3.0 m** high. How much work do they do against gravity?',
  notes: 'QUICK CHECK ANSWER: E = 600 × 3.0 = 1800 J (1). The distance is the vertical height (direction of the force).\nSpec 8.5–8.6. RECALL equation (Tutordex confirms 8.6).',
}), '8.5–8.6 Work done');

// ======================= 10 WORK PRACTICE =======================
{
  const s = D.contentHeader('Practice: work done', `Specification ${sp('8.6')} • E = F × d and rearranging`, { tag: '8.6' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A cyclist does **900 J** of work against friction over **0.60 m** of braking. Find the friction force.',
    [['Equation', 'E = F × d'], ['Rearrange', 'F = E ÷ d'], ['Substitute', 'F = 900 ÷ 0.60'], ['Answer', '**F = 1500 N**']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A **250 N** force pulls a sledge **12 m**. Calculate the work done.',
    '**2** A crane does **4500 J** of work with a force of **150 N**. How far does the load move?',
    '**3** **2.4 kJ** of work is done pushing a car with an **80 N** force. Calculate the distance.',
    '**4** A waiter carries a tray horizontally at constant height. Explain why no work is done against gravity.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Which unit must energy be in before you use E = F × d with force in newtons?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 3000 J. 2) 30 m. 3) 2400 ÷ 80 = 30 m. 4) the force (upwards) is at 90° to the motion (horizontal): no movement in the direction of the force.\nQUICK CHECK: joules (convert kJ to J).');
  reg(s, '8.6 Practice: work done');
}

// ======================= 11 WORK & ENERGY CHANGES =======================
reg(D.contentSlide({
  title: 'Work done changes energy stores',
  subtitle: `Specification ${sp('8.7')}–${sp('8.8')} • lifting, accelerating and braking`,
  tag: '8.7–8.8', caption: 'braking: friction does work that equals the car’s kinetic energy',
  draw: (s, p) => {
    line(s, 0.7, 4.4, 6.3, 4.4, C.ink, 2);
    const car = (x, fill, ln) => { box(s, x, 3.6, 1.6, 0.6, fill, ln, { shape: SH.ROUNDED_RECTANGLE, r: 0.15 }); ball(s, x + 0.35, 4.25, 0.15, '333333', '111111'); ball(s, x + 1.25, 4.25, 0.15, '333333', '111111'); };
    car(2.0, '3A63C9', '1F2A4A'); car(4.4, 'B8C8F0', '7C8AA8');
    label(s, 4.4, 3.25, 1.6, 'stopped', { size: 10, italic: true, color: C.grey, h: 0.25 });
    forceArrow(s, 2.0, 3.9, 'left', 0.9, null, C.red, { lw: 2.0 });
    label(s, 0.75, 3.2, 1.5, 'braking force\n5000 N', { size: 10, bold: true, color: C.red, h: 0.45 });
    arrow(s, 2.4, 2.9, 3.4, 2.9, C.ink, 1.5); label(s, 2.0, 2.45, 2.2, '20 m/s, 1000 kg', { size: 10, bold: true, h: 0.3 });
    line(s, 2.0, 4.7, 4.4, 4.7, '2E8B57', 1.5, { head: true, tail: true }); label(s, 2.2, 4.75, 2.0, 'stopping distance d', { size: 10.5, color: '2E8B57', h: 0.3 });
    label(s, 0.7, 1.6, 5.6, 'KE store of car → **thermal** store of brakes', { size: 11, h: 0.35, color: C.red });
  },
  head: 'Linking work and energy',
  lines: [
    '**Lifting:** work done against gravity = **gain in GPE** = m × g × Δh.',
    '**Accelerating:** work done by the driving force = **gain in KE** = ½ × m × v² (ignoring friction).',
    '**Braking:** the friction force does work = **loss of KE**; energy goes to the **thermal** store of the brakes.',
    'So **F × d = ½ m v²** for a car stopping with constant braking force.',
  ],
  worked: { head: 'Worked example', q: 'A 1000 kg car at 20 m/s brakes with a force of 5000 N. Find the braking distance.',
    steps: [['KE', '½ × 1000 × 20² = 200 000 J'], ['Work', 'F × d = KE lost'], ['Rearrange', 'd = 200 000 ÷ 5000'], ['Answer', 'd = 40 m']] },
  qc: 'A crane lifts a **500 kg** load **12 m**. Calculate the work done against gravity. (g = 10 N/kg)',
  notes: 'QUICK CHECK ANSWER: ΔGPE = 500 × 10 × 12 = 60 000 J (1)(1).\nSpec 8.7–8.8 (GPE and KE equations recall, as Topic 3).',
}), '8.7–8.8 Work and energy changes');

// ======================= 12 DISSIPATION =======================
reg(D.contentSlide({
  title: 'Dissipation and wasteful heating',
  subtitle: `Specification ${sp('8.9')}–${sp('8.10')} • energy stored in less useful ways`,
  tag: '8.9–8.10', caption: 'friction in moving parts heats them and the surroundings',
  draw: (s, p) => {
    ball(s, 2.2, 3.3, 1.0, 'B7C0CA', '555555', 2); ball(s, 2.2, 3.3, 0.25, '777777', '333333');
    for (let k = 0; k < 10; k++) { const a = k * Math.PI / 5; box(s, 2.2 + 1.0 * Math.cos(a) - 0.1, 3.3 + 1.0 * Math.sin(a) - 0.1, 0.2, 0.2, 'B7C0CA', '555555', { rotate: a * 180 / Math.PI }); }
    ball(s, 4.3, 3.3, 0.7, 'B7C0CA', '555555', 2); ball(s, 4.3, 3.3, 0.18, '777777', '333333');
    [[3.4, 2.3], [3.6, 2.0], [3.3, 1.8]].forEach(([x, y]) => { const pts = []; for (let i = 0; i <= 10; i++) pts.push([x + 0.1 * Math.sin(i), y - i * 0.05]); for (let i = 0; i < pts.length - 1; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.red, 1.5); });
    label(s, 3.8, 1.6, 2.4, 'heating at the contact', { size: 10.5, bold: true, color: C.red, h: 0.3, align: 'left' });
    label(s, 0.8, 4.75, 5.4, 'add **oil** (lubrication) to reduce friction', { size: 11, h: 0.35, color: '2E8B57' });
  },
  head: 'Key ideas',
  lines: [
    'In **all** system changes, some energy is **dissipated**: it spreads out into the surroundings and is stored in **less useful** ways (usually **thermal**).',
    '**Mechanical processes** become **wasteful** when **friction** or air resistance causes a **rise in temperature**, heating the surroundings.',
    'Examples: hot bearings in a motor; warm brakes; sound and heat from machines.',
    'Reduce waste by **lubrication**, **streamlining**, tightening loose parts and **thermal insulation**.',
  ],
  worked: { head: 'Explain', q: 'Why does a bicycle chain need oiling?',
    steps: [['Friction', 'between chain and gears'], ['Waste', 'energy dissipated by heating'], ['Oil', 'reduces friction'], ['Answer', 'less energy wasted; more useful KE']] },
  qc: 'Explain why dissipated energy is described as **less useful**.',
  notes: 'QUICK CHECK ANSWER: it is spread out into the surroundings (thermal store at low temperature) (1); so it cannot easily be used to do useful work (1).\nSpec 8.9–8.10.',
}), '8.9–8.10 Dissipation');

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, '8.5–8.10 • work done and dissipation', [
  { q: 'State the equation linking work done, force and distance.', marks: 1, ms: 'Work done = force × distance (moved in the direction of the force) (1).' },
  { q: 'A 120 N force moves a box 25 m. Calculate the work done.', marks: 2, ms: '120 × 25 (1); = 3000 J (1).' },
  { q: 'Explain why a car’s brakes get hot when it stops.', marks: 2, ms: 'Friction (between pads and discs) does work (1); kinetic energy transferred to the thermal store of the brakes (1).' },
  { q: 'Suggest **two** ways to reduce unwanted energy transfers in a machine.', marks: 2, ms: 'Any two: lubrication; streamlining; tightening loose parts; insulation (1 each).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 14 POWER =======================
reg(D.contentSlide({
  title: 'Power',
  subtitle: `Specification ${sp('8.11')}–${sp('8.13')} • the rate of energy transfer`,
  tag: '8.11–8.13', caption: 'two motors lift the same load to the same height',
  draw: (s, p) => {
    [[1.6, 'motor A', '10 s', 'higher power'], [4.6, 'motor B', '30 s', 'lower power']].forEach(([x, n, t, d]) => {
      box(s, x - 0.4, 1.6, 0.8, 0.45, '555555', '333333'); label(s, x - 0.6, 1.6, 1.2, n, { size: 10, color: C.white, bold: true, h: 0.45 });
      line(s, x, 2.05, x, 3.4, C.ink, 1.5); crate(s, x - 0.4, 3.4, 0.8, 0.7);
      label(s, x - 1.0, 4.3, 2.0, `same 1200 J in **${t}**`, { size: 10.5, h: 0.3 }); label(s, x - 1.0, 4.6, 2.0, d, { size: 10.5, bold: true, color: C.red, h: 0.3 });
    });
    box(s, 1.6, 5.05, 3.8, 0.6, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 2 }); label(s, 1.6, 5.05, 3.8, '**P = E ÷ t**', { size: 20, h: 0.6, color: C.ink });
  },
  head: 'Key ideas',
  lines: [
    '**Power** is the **rate** at which energy is transferred (or work is done).',
    '**power (W) = work done (J) ÷ time taken (s)**. RECALL.',
    '**1 watt = 1 joule per second** (1 W = 1 J/s). 1 kW = 1000 W.',
    'A more powerful machine transfers the **same energy** in **less time**, or **more energy** in the same time.',
  ],
  worked: { head: 'Worked example', q: 'Motor A lifts the load (1200 J) in 10 s; motor B in 30 s. Calculate each power.',
    steps: [['A', 'P = 1200 ÷ 10 = 120 W'], ['B', 'P = 1200 ÷ 30 = 40 W'], ['Answer', 'A is 3 times more powerful']], size: 11 },
  workedH: 1.75,
  qc: 'What does a power of **60 W** mean in terms of joules?',
  notes: 'QUICK CHECK ANSWER: 60 joules of energy are transferred every second (1).\nSpec 8.11–8.13. RECALL equation.',
}), '8.11–8.13 Power');
calc('motor A 1200/10', 1200 / 10, 120, 1e-12); calc('motor B 1200/30', 1200 / 30, 40, 1e-12);

// ======================= 15 POWER PRACTICE =======================
{
  const s = D.contentHeader('Practice: power', `Specification ${sp('8.12')} • P = E ÷ t and rearranging`, { tag: '8.12' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A crane lifts a **500 kg** load **12 m** in **30 s**. Calculate its useful power.',
    [['Energy', 'ΔGPE = 500 × 10 × 12 = 60 000 J'], ['Equation', 'P = E ÷ t'], ['Substitute', 'P = 60 000 ÷ 30'], ['Answer', '**P = 2000 W (2 kW)**']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A motor does **1200 J** of work in **8 s**. Calculate its power.',
    '**2** A **60 W** lamp is on for **1 minute**. How much energy does it transfer?',
    '**3** How long does a **3 kW** heater take to transfer **0.45 MJ**?',
    '**4** A **2000 W** kettle is on for **2 minutes**. Calculate the energy transferred.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Rearrange P = E ÷ t to make **E** the subject and then **t** the subject.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 150 W. 2) 60 × 60 = 3600 J. 3) 450 000 ÷ 3000 = 150 s. 4) 2000 × 120 = 240 000 J.\nQUICK CHECK: E = P × t; t = E ÷ P.');
  reg(s, '8.12 Practice: power');
}

// ======================= 16 SUGGESTED PRACTICAL =======================
{
  const s = D.contentSlide({
    title: 'Practical: measuring your own power',
    subtitle: `Specification ${sp('8.11')}–${sp('8.12')} • suggested practical (Topic 8 has no Core Practical)`,
    tag: 'Practical', caption: 'run up a flight of stairs and time it',
    draw: (s, p) => {
      for (let i = 0; i < 8; i++) box(s, 1.0 + i * 0.6, 4.9 - (i + 1) * 0.3, 0.6, 0.3 * (i + 1), 'E8D5B0', 'A88B63', { lw: 0.75 });
      line(s, 6.0, 4.9, 6.0, 2.5, C.red, 1.5, { head: true, tail: true }); label(s, 6.05, 3.5, 0.6, '**h**', { size: 13, color: C.red, h: 0.3 });
      person(s, 0.75, 4.9); person(s, 5.5, 2.5);
      label(s, 0.8, 5.3, 5.2, 'measure **h** (vertical height), **m** (scales) and **t** (stopwatch)', { size: 10.5, h: 0.35 });
    },
    head: 'Method',
    lines: [
      'Measure your **mass** on bathroom scales; weight W = m × g.',
      'Measure the **vertical height** of the stairs (height of one step × number of steps).',
      'Time how long it takes to run up the stairs; repeat and find a **mean** time.',
      'Work done = **m × g × h**; power = work done ÷ time.',
      '**Safety:** walk or jog; use a stairway with a handrail; no pushing.',
    ],
    worked: { head: 'Worked example', q: 'A 60 kg student climbs 3.0 m in 4.0 s.', steps: [['Work', '60 × 10 × 3.0 = 1800 J'], ['Power', '1800 ÷ 4.0'], ['Answer', 'P = 450 W']], size: 11 },
    workedH: 1.75,
    qc: 'Why do we measure the **vertical** height and not the length along the stairs?',
    notes: 'QUICK CHECK ANSWER: work against gravity depends on the distance moved in the direction of the force (vertical) (1).\nSuggested practical, not a Core Practical. Your turn: 50 kg, 4.5 m, 6.0 s → 375 W.',
  });
  suggestedPill(s);
  reg(s, 'Practical: personal power');
}

// ======================= 17 EFFICIENCY =======================
reg(D.contentSlide({
  title: 'Efficiency',
  subtitle: `Specification ${sp('8.14')} • from energy or from power`,
  tag: '8.14', caption: 'a lift motor (1 kJ = 0.012 in)',
  draw: (s, p) => {
    sankey(s, 0.8, 1.8, 0.012, { v: 160, label: '160 kJ in' }, [{ v: 120, label: '120 kJ GPE (useful)', color: STORE.GPE }, { v: 40, label: '40 kJ wasted', color: C.red }], { inLen: 1.6, outLen: 1.6, uw: 1.9, yEnd: 5.0 });
  },
  head: 'Key ideas',
  lines: [
    '**efficiency = useful energy transferred ÷ total energy supplied**. RECALL.',
    'It can also be calculated with **power**: useful power output ÷ total power input.',
    'Efficiency has **no units**; × 100 to give a **percentage**. It is always **less than 1** (100%).',
    '**Increasing efficiency:** reduce friction (lubricate), reduce air resistance (streamline), insulate, use better designs (LED lamps).',
  ],
  worked: { head: 'Worked example', q: 'A 4.0 kW lift motor raises 800 kg by 15 m in 40 s. Calculate its efficiency.',
    steps: [['Useful', '800 × 10 × 15 = 120 000 J'], ['Total', '4000 × 40 = 160 000 J'], ['Divide', '120 000 ÷ 160 000'], ['Answer', '0.75 (75%)']] },
  qc: 'A motor has an input power of **500 W** and a useful output of **400 W**. Calculate its efficiency.',
  notes: 'QUICK CHECK ANSWER: 400 ÷ 500 = 0.8 (80%).\nSpec 8.14. Sankey drawn to scale.',
}), '8.14 Efficiency');

// ======================= 18 EFFICIENCY PRACTICE =======================
{
  const s = D.contentHeader('Practice: efficiency', `Specification ${sp('8.14')} • rearranging and comparing`, { tag: '8.14' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A machine is **60%** efficient. It must transfer **360 J** usefully. How much energy must be supplied?',
    [['Equation', 'efficiency = useful ÷ total'], ['Rearrange', 'total = useful ÷ efficiency'], ['Substitute', 'total = 360 ÷ 0.60'], ['Answer', '**600 J**']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A filament bulb uses **60 J** each second and gives **6 J** of light. Calculate its efficiency as a percentage.',
    '**2** A **25%** efficient engine is supplied with **2000 J**. How much useful energy does it transfer?',
    '**3** An LED gives the same light as the bulb in Q1 using **15 J/s**. Calculate its efficiency.',
    '**4** Explain why no machine can be 100% efficient.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Efficiency = 0.35. Write this as a percentage. What fraction of the energy is wasted?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 6 ÷ 60 = 0.1 = 10%. 2) 0.25 × 2000 = 500 J. 3) 6 ÷ 15 = 0.4 = 40%. 4) some energy is always dissipated (friction, heating, sound).\nQUICK CHECK: 35%; 65% wasted.');
  calc('LED 6/15', 6 / 15, 0.4, 1e-12);
  reg(s, '8.14 Practice: efficiency');
}

// ======================= 19 RECAP 3 =======================
const R3 = D.recapSlide(3, '8.11–8.14 • power and efficiency', [
  { q: 'Define **power**.', marks: 1, ms: 'Rate of energy transfer / work done per second (1).' },
  { q: 'A motor transfers 2.4 kJ in 30 s. Calculate its power.', marks: 2, ms: '2400 ÷ 30 (1); = 80 W (1).' },
  { q: 'A 2000 W heater transfers 1500 J of useful energy each second. Calculate its efficiency.', marks: 2, ms: '1500 ÷ 2000 (1); = 0.75 / 75% (1).' },
  { q: 'Give **two** ways to increase the efficiency of a car.', marks: 2, ms: 'Any two: streamline; lubricate moving parts; reduce mass; efficient engine / tyres (1 each).' },
]);
calc('R3 heater 1500/2000', 1500 / 2000, 0.75, 1e-12);
reg(R3.s, 'Recap 3');

// ======================= 20 EQUATIONS =======================
reg(D.equationsSlide([['WFd', sp('8.6')], ['PEt', sp('8.12')], ['eff', sp('8.14')], ['GPE', '8.8 (Topic 3.1)'], ['KE', '8.8 (Topic 3.2)'], ['Wmg', 'Topic 2 link']], {
  subtitle: 'Topic 8 equations • RECALL = learn it; GIVEN = on the Physics Equations List',
  qc: 'Cover the middle column. Say each equation and every unit aloud. Then rearrange E = F × d and P = E ÷ t.',
  notes: 'QUICK CHECK: F = E ÷ d; d = E ÷ F; E = P × t; t = E ÷ P. All Topic 8 equations are RECALL.',
}), 'Summary: equations');

// ======================= 21 KEY WORDS =======================
reg(D.keyWords([
  ['Energy store', 'Where energy is held, e.g. kinetic, thermal.'],
  ['System', 'An object or group of objects being studied.'],
  ['Closed system', 'No net change in total energy.'],
  ['Conservation of energy', 'Energy cannot be created or destroyed.'],
  ['Work done', 'Energy transferred by a force: E = F × d.'],
  ['Joule (J)', 'Unit of energy and of work done.'],
  ['Newtonmeter', 'Instrument used to measure force.'],
  ['Dissipated', 'Spread out into the surroundings; less useful.'],
  ['Friction', 'Force opposing motion; causes heating.'],
  ['Lubrication', 'Oil reducing friction between moving parts.'],
  ['Power', 'Rate of energy transfer: P = E ÷ t.'],
  ['Watt (W)', 'One joule per second.'],
  ['Kilowatt', '1000 W.'],
  ['Efficiency', 'Useful energy (or power) ÷ total supplied.'],
  ['Sankey diagram', 'Energy diagram with arrow widths to scale.'],
  ['Useful energy', 'Energy transferred to the store we want.'],
], { notes: 'Cover-and-recall activity.' }), 'Summary: key words');

// ======================= 22 FULL QUESTION =======================
reg(D.fullQuestion('A **70 kg** student runs up a flight of stairs **6.0 m** high in **12 s**. g = 10 N/kg.', [
  { l: 'a', q: 'Calculate the work the student does against gravity.', marks: 2, ms: 'E = 70 × 10 × 6.0 (1); = 4200 J (1).' },
  { l: 'b', q: 'Calculate the student’s useful power.', marks: 2, ms: 'P = 4200 ÷ 12 (1); = 350 W (1). ECF from (a).' },
  { l: 'c', q: 'The student’s muscles transfer 6000 J in total. Calculate the efficiency.', marks: 2, ms: '4200 ÷ 6000 (1); = 0.70 / 70% (1).' },
  { l: 'd', q: 'Describe what happens to the energy that is not usefully transferred.', marks: 2, ms: 'Dissipated / transferred to the thermal store (1) of the student and surroundings (1).' },
  { l: 'e', q: 'Describe how the student could measure the height and time accurately.', marks: 3, ms: 'Measure one step with a metre rule and multiply by the number of steps (1); time with a stopwatch, started and stopped by the same person (1); repeat and take a mean (1).', h: 1.2 },
  { l: 'f', q: 'A second student of the same mass takes 15 s. Explain whether they did more, less or the same work.', marks: 2, ms: 'Same work (same mass and height) (1); but less power because it took longer (1).' },
], 13, { subtitle: 'Specification 8.6–8.14 • answer every part • 13 marks' }), 'Full question');

// ======================= 23–24 HOMEWORK =======================
const HW = [
  { n: '1', q: 'State the unit of power.', marks: 1, ms: 'Watt / W / J/s (1).' },
  { n: '2', q: 'A **40 N** force pulls a trolley **15 m** in **20 s**. Calculate **(a)** the work done and **(b)** the power.', marks: 4, ms: '(a) 40 × 15 (1) = 600 J (1); (b) 600 ÷ 20 (1) = 30 W (1).' },
  { n: '3', q: 'A motor is supplied with **800 J** and wastes **200 J**. Calculate its efficiency.', marks: 2, ms: 'Useful = 600 J (1); 600 ÷ 800 = 0.75 / 75% (1).' },
  { n: '4', q: 'Explain how a car’s kinetic energy is transferred when it brakes, and why the process is described as wasteful.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
calc('HW eff 600/800', 600 / 800, 0.75, 1e-12);
function levelsHW() {
  return D.levels6([
    'The car has energy in its kinetic store.',
    'The brakes apply a friction force; work is done by friction.',
    'Work done = force × distance; equals the kinetic energy lost.',
    'Energy is transferred to the thermal store of the brakes (and tyres, road).',
    'The brakes heat up and energy is dissipated to the surroundings (also some sound).',
    'Dissipated energy is spread out and stored in less useful ways: cannot be used again.',
    'Regenerative braking (electric cars) can store some energy usefully in a battery.',
  ], 'Level 3 answers describe the energy transfer chain via work done by friction and explain why heating the surroundings is wasteful.');
}
D.homework('Answer every question. Show your working for calculations. g = 10 N/kg.', HW, 13);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7);
assert(D.slideNo >= 24 && D.slideNo <= 38, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T8_ForcesDoingWork.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
