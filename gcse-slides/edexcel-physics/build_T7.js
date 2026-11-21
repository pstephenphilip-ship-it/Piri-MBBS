// build_T7.js — Edexcel GCSE Physics 1PH0 Topic 7 Astronomy (physics only; one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T7.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const P_CODES = []; for (let k = 1; k <= 18; k++) P_CODES.push('7.' + k);
const DECK = {
  topic: 7,
  title: 'Astronomy',
  shortTitle: 'T7',
  subtitle: 'Gravity and weight, the Solar System, orbits, stars, red-shift and the Big Bang',
  specRange: '7.1P–7.18P',
  pOnly: P_CODES,
  paper: 'Paper 1',
  keywords: ['Weight and g', 'Solar System', 'Orbits', 'Life cycle of stars', 'Red-shift', 'Big Bang'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
const G = [['Moon', 1.6], ['Mars', 3.7], ['Venus', 8.9], ['Earth', 10], ['Jupiter', 25]];
calc('60 kg on Earth', 60 * 10, 600, 1e-9);
calc('60 kg on Moon', 60 * 1.6, 96, 1e-9);
calc('60 kg on Mars', 60 * 3.7, 222, 1e-9);
calc('60 kg on Jupiter', 60 * 25, 1500, 1e-9);
calc('YT 80 kg on Mars', 80 * 3.7, 296, 1e-9);
calc('YT mass from 32 N on Moon', 32 / 1.6, 20, 1e-9);
calc('YT g from 445 N / 50 kg', 445 / 50, 8.9, 1e-12);
calc('YT Jupiter / Earth weight ratio', 25 / 10, 2.5, 1e-12);
calc('ISS orbit speed (km/s, 3 s.f.)', sf(2 * Math.PI * 6.8e6 / 5520 / 1000, 3), 7.74, 1e-9);
calc('Moon orbit speed (m/s, 3 s.f.)', sf(2 * Math.PI * 3.84e8 / (27.3 * 24 * 3600), 3), 1020, 1e-9);
calc('Earth orbit speed (km/s, 3 s.f.)', sf(2 * Math.PI * 1.5e11 / (365 * 24 * 3600) / 1000, 3), 29.9, 1e-9);
calc('red-shift Δλ 670 − 656', 670 - 656, 14);
const GAL = [[50, 3500], [100, 7000], [150, 10500], [200, 14000], [250, 17500]];
calc('galaxy speed / distance constant', GAL[4][1] / GAL[4][0], 70, 1e-12);
calc('Sun age fraction 4.6 / 10', 4.6 / 10, 0.46, 1e-12);
calc('R1 70 kg Moon', 70 * 1.6, 112, 1e-9);
calc('FQ 90 kg Mars', 90 * 3.7, 333, 1e-9);
calc('HW 15 kg Jupiter', 15 * 25, 375, 1e-9);

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
function sunIconP(s, cx, cy, r) {
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(s, cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r * 1.2, cx + Math.cos(a) * r * 1.6, cy + Math.sin(a) * r * 1.6, 'E39A2F', 2); }
  s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: 'F5C342' }, line: { color: 'E39A2F', width: 1 } });
}
function stageBox(s, x, y, w, h, t, fill, col = C.ink) { box(s, x, y, w, h, fill, '555555', { shape: SH.ROUNDED_RECTANGLE, r: 0.1 }); label(s, x, y, w, t, { size: 10.5, bold: true, h, color: col }); }
const NAVY = '0E1630';

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Astronomy',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • the whole topic is PHYSICS ONLY (not in Combined Science)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • every content slide carries the PHYSICS ONLY pill' },
    { icon: '7', text: 'Topic 7 of 15 • assessed on Paper 1 • no Core Practical' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 7 Astronomy. Paper 1. The whole topic is physics only (P): Combined Science 1SC0 classes do not study it. No Higher-only statements believed; no Core Practical. Statement numbers reconstructed from memory (UNVERIFIED): see SPEC_T7.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: sp('7.1'), text: 'Explain why **weight** and **g** differ on the Earth, the **Moon** and other bodies.' },
  { code: `${sp('7.2')}–${sp('7.4')}`, text: 'Describe the **Solar System**; the **geocentric** and **heliocentric** models.' },
  { code: `${sp('7.5')}–${sp('7.7')}`, text: 'Describe **orbits**; explain changing **velocity** at constant **speed**; radius and speed.' },
  { code: `${sp('7.15')}–${sp('7.17')}`, text: 'Describe the **life cycles of stars**; the balance of **gravity** and **thermal expansion**.' },
  { code: `${sp('7.10')}–${sp('7.12')}`, text: 'Explain the **Doppler effect** and **red-shift**; evidence for an **expanding Universe**.' },
  { code: `${sp('7.8')}–${sp('7.9')}`, text: 'Compare the **Steady State** and **Big Bang** theories.' },
  { code: `${sp('7.13')}–${sp('7.14')}`, text: 'Explain how the **CMB** made the Big Bang the accepted model.' },
  { code: sp('7.18'), text: 'Describe how **telescopes** changed; why some are in **space**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'All of Topic 7 is physics only (P). No HT statements believed.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 7 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    [sp('7.1'), 'Weight and g on other bodies'],
    [`${sp('7.2')}–${sp('7.4')}`, 'The Solar System; geocentric and heliocentric models'],
    [`${sp('7.5')}–${sp('7.7')}`, 'Orbits, velocity, speed and radius'],
    [`${sp('7.15')}–${sp('7.17')}`, 'Life cycles of stars'],
    [`${sp('7.10')}–${sp('7.12')}`, 'Doppler effect and red-shift'],
    [`${sp('7.8')}–${sp('7.9')}, ${sp('7.13')}–${sp('7.14')}`, 'Steady State vs Big Bang; the CMB'],
    [sp('7.18'), 'Observing the Universe'],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 7\nAstronomy', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 10.5, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, 'PHYSICS ONLY', C.blue, 1.35);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 2 weight W = mg • Topic 4 waves (Doppler) • Topic 5 EM spectrum • Topic 6 fusion', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–7.',
      '**Not** in Combined Science 1SC0.',
      'Maths: **W = m × g** (recall); orbit speeds from v = x ÷ t.',
      'No Core Practical; expect **compare** and **evaluate** questions on theories.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Whole topic is physics-only**: Combined Science classes skip this deck.',
      'No HT-only statements are believed to be in Topic 7.',
      'Higher students should push the explain and evaluate questions.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Topic 7 is entirely physics-only (P). Statement numbers 7.1P–7.18P are reconstructed from memory (UNVERIFIED; one search returned only GCSE Astronomy 1AS0 material). No HT markers believed; no Core Practical. Check against the Pearson PDF.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 2 • forces', q: 'State the equation linking weight, mass and gravitational field strength.' },
  { from: 'Topic 2 • forces', q: 'What is the difference between **mass** and **weight**?' },
  { from: 'Topic 2 • motion', q: 'Is **velocity** a scalar or a vector? Explain.' },
  { from: 'Topic 4 • waves', q: 'State the equation linking wave speed, frequency and wavelength.' },
  { from: 'Topic 5 • EM', q: 'Which end of the visible spectrum has the **longest** wavelength?' },
  { from: 'Topic 6 • nuclear', q: 'What process releases energy in the **Sun**?' },
], { subtitle: 'Recall from Topics 2, 4, 5 and 6 • 6 minutes • no notes', notes: 'ANSWERS\n1. W = m × g.\n2. Mass: amount of matter (kg), same everywhere; weight: force due to gravity (N), depends on g.\n3. Vector: has magnitude and direction.\n4. v = f × λ.\n5. Red.\n6. Nuclear fusion.' }), 'Retrieval starter');

// ======================= 5 WEIGHT & g =======================
reg(D.contentSlide({
  title: 'Weight on other worlds',
  subtitle: `Specification ${sp('7.1')} • why weight and g differ`,
  tag: sp('7.1'), p: true, caption: 'surface gravitational field strength (approximate)',
  draw: (s, p) => {
    const g = { x: 1.35, y: 1.6, w: 4.6, h: 3.3, xmin: 0, xmax: 5, xstep: 1, ymin: 0, ymax: 26, ystep: 5, xlabel: '', ylabel: 'g (N/kg)', fmt: () => '' };
    axes(s, g);
    const cols = ['B7C0CA', 'D35400', 'E8C27A', '2E5BD8', 'C99A5B'];
    G.forEach(([n, v], i) => { const x0 = px(g, i + 0.15), x1 = px(g, i + 0.85); box(s, x0, py(g, v), x1 - x0, py(g, 0) - py(g, v), cols[i], '555555', { lw: 0.75 }); label(s, x0 - 0.15, py(g, 0) + 0.06, x1 - x0 + 0.3, `**${n}**`, { size: 10, h: 0.25 }); label(s, x0 - 0.15, py(g, v) - 0.26, x1 - x0 + 0.3, String(v), { size: 10, bold: true, h: 0.22 }); });
  },
  head: 'Key ideas',
  lines: [
    '**Weight** is the force of gravity on an object: **W = m × g** (recall). **Mass** stays the same everywhere.',
    'The value of **g** depends on the **mass** and **radius** of the planet or moon: a **more massive** body gives a **larger** g; at a **greater distance** from its centre g is **smaller**.',
    'The **Moon** has much less mass than the Earth, so g ≈ **1.6 N/kg** (about 1/6 of Earth’s).',
  ],
  worked: { head: 'Worked example', q: 'An astronaut has a mass of 60 kg. Calculate her weight on the Earth and on the Moon.',
    steps: [['Earth', 'W = 60 × 10 = 600 N'], ['Moon', 'W = 60 × 1.6 = 96 N'], ['Answer', 'mass is 60 kg in both places']] , size: 11 },
  workedH: 1.75,
  qc: 'Explain why an astronaut can jump higher on the Moon than on the Earth.',
  notes: 'QUICK CHECK ANSWER: g on the Moon is smaller (because the Moon has less mass) (1); so the astronaut’s weight / downward force is smaller (mass unchanged) and the same push gives a higher jump (1).\nSpec 7.1P. g values approximate; Edexcel uses g = 10 N/kg on Earth.',
}), '7.1P Weight and g');

// ======================= 6 WEIGHT PRACTICE =======================
{
  const s = D.contentHeader('Practice: weight on other worlds', `Specification ${sp('7.1')} • W = m × g`, { tag: sp('7.1'), p: true });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A 60 kg astronaut visits **Mars** (g = 3.7 N/kg) and **Jupiter** (g = 25 N/kg).',
    [['Mars', 'W = 60 × 3.7 = **222 N**'], ['Jupiter', 'W = 60 × 25 = **1500 N**'], ['Compare', 'Jupiter weight is 2.5 × the Earth weight'], ['Answer', '222 N; 1500 N; mass 60 kg throughout']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** Calculate the weight of an **80 kg** rover on Mars (g = 3.7 N/kg).',
    '**2** A rock weighs **32 N** on the Moon (g = 1.6 N/kg). Calculate its mass.',
    '**3** A **50 kg** probe weighs **445 N** on a planet. Calculate g there. Which planet could it be?',
    '**4** Explain why the mass of the rock is the same on the Earth.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'What is the **unit** of g? Give **two** ways to write it.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 296 N. 2) 20 kg. 3) 8.9 N/kg: Venus. 4) mass is the amount of matter and does not depend on gravity.\nQUICK CHECK: N/kg (also m/s²).');
  reg(s, '7.1P Practice: weight');
}

// ======================= 7 SOLAR SYSTEM =======================
reg(D.contentSlide({
  title: 'The Solar System',
  subtitle: `Specification ${sp('7.2')}–${sp('7.3')} • the Sun, planets, moons and smaller bodies`,
  tag: `${sp('7.2')}–${sp('7.3')}`, p: true, caption: 'planets in order from the Sun (sizes and distances not to scale)',
  draw: (s, p) => {
    box(s, 0.6, 1.45, 5.8, 4.3, NAVY, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    sunIconP(s, 1.0, 3.5, 0.3);
    const pl = [['Mercury', 0.07, 'B7B7B7'], ['Venus', 0.11, 'E8C27A'], ['Earth', 0.12, '2E5BD8'], ['Mars', 0.09, 'D35400'], ['Jupiter', 0.32, 'C99A5B'], ['Saturn', 0.27, 'E3C98A'], ['Uranus', 0.18, '9FD3F0'], ['Neptune', 0.17, '3A63C9']];
    let x = 1.55;
    pl.forEach(([n, r, c], i) => { x += r + 0.08; ball(s, x, 3.5, r, c, c); if (n === 'Saturn') oval(s, x, 3.5, r * 3, r * 0.7, null, 'E3C98A', { lw: 1.5 }); label(s, x - 0.4, i % 2 ? 4.0 : 2.75, 0.8, n, { size: 9, color: C.white, h: 0.25 }); x += r + 0.08; });
    label(s, 0.75, 5.1, 5.4, 'My Very Easy Method Just Speeds Up Naming', { size: 11, italic: true, color: 'FFE7A0', h: 0.35 });
  },
  head: 'What is in the Solar System?',
  lines: [
    'One **star**: the **Sun**.',
    '**Eight planets**: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune (in order from the Sun).',
    '**Natural satellites** (moons) orbit planets, e.g. our Moon.',
    '**Dwarf planets** (e.g. Pluto), **asteroids** (rocky, mostly between Mars and Jupiter) and **comets** (ice and dust).',
    'The Solar System is part of the **Milky Way** galaxy.',
  ],
  worked: { head: 'Classify', q: 'Is the Moon a planet? Is Pluto a planet?',
    steps: [['Moon', 'orbits a planet: a natural satellite'], ['Pluto', 'too small to clear its orbit'], ['Answer', 'Moon: satellite; Pluto: dwarf planet']], size: 11 },
  workedH: 1.75,
  qc: 'Name the planets in order from the Sun.',
  notes: 'QUICK CHECK ANSWER: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune (2 marks for correct order; 1 for one error).\nSpec 7.2P–7.3P.',
}), '7.2P–7.3P Solar System');

// ======================= 8 MODELS =======================
reg(D.contentSlide({
  title: 'Geocentric and heliocentric models',
  subtitle: `Specification ${sp('7.4')} • how ideas changed`,
  tag: sp('7.4'), p: true, caption: 'geocentric (left) and heliocentric (right) models',
  draw: (s, p) => {
    const draw = (cx, centre) => {
      [0.55, 0.9, 1.25].forEach(R => ball(s, cx, 3.4, R, null, '9AA5B1', 1));
      if (centre === 'E') { ball(s, cx, 3.4, 0.18, '2E5BD8', '2E5BD8'); sunIconP(s, cx + 1.25, 3.4, 0.14); ball(s, cx - 0.55, 3.4, 0.08, 'B7B7B7', 'B7B7B7'); ball(s, cx, 3.4 - 0.9, 0.09, 'D35400', 'D35400'); }
      else { sunIconP(s, cx, 3.4, 0.2); ball(s, cx + 0.9, 3.4, 0.11, '2E5BD8', '2E5BD8'); ball(s, cx - 0.55, 3.4, 0.08, 'B7B7B7', 'B7B7B7'); ball(s, cx, 3.4 - 1.25, 0.09, 'D35400', 'D35400'); }
    };
    draw(1.9, 'E'); draw(5.0, 'S');
    label(s, 0.8, 1.6, 2.2, '**Geocentric**: Earth at the centre', { size: 10.5, h: 0.4 });
    label(s, 3.9, 1.6, 2.2, '**Heliocentric**: Sun at the centre', { size: 10.5, h: 0.4 });
    label(s, 0.7, 4.9, 5.6, 'Ptolemy (c. 150 AD) → Copernicus (1543) → Galileo (1610)', { size: 10.5, h: 0.4 });
  },
  head: 'How ideas changed',
  lines: [
    '**Geocentric model** (ancient Greeks, Ptolemy): the **Earth** is at the centre; the Sun, Moon and planets orbit it. It fitted everyday observations (the Sun seems to move across the sky).',
    '**Heliocentric model** (Copernicus): the **Sun** is at the centre; the Earth and planets orbit it.',
    '**Evidence:** Galileo used a **telescope** to see **moons orbiting Jupiter** (not everything orbits the Earth) and the **phases of Venus**.',
    'Later observations (better telescopes) showed orbits are slightly **elliptical**.',
  ],
  worked: { head: 'Explain', q: 'Why did the discovery of Jupiter’s moons support the heliocentric model?',
    steps: [['Seen', 'moons orbiting Jupiter'], ['So', 'not everything orbits the Earth'], ['Conflict', 'geocentric model could not explain it'], ['Answer', 'evidence for the Sun-centred model']] },
  qc: 'Which invention provided new evidence that changed the model of the Solar System?',
  notes: 'QUICK CHECK ANSWER: the telescope (1).\nSpec 7.4P.',
}), '7.4P Models of the Solar System');

// ======================= 9 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('7.1')}–${sp('7.4')} • weight and the Solar System`, [
  { q: 'A 70 kg astronaut stands on the Moon (g = 1.6 N/kg). Calculate the weight.', marks: 2, ms: 'W = 70 × 1.6 (1); = 112 N (1).' },
  { q: 'Explain why g is smaller on the Moon than on the Earth.', marks: 2, ms: 'The Moon has a smaller mass (1); so a smaller gravitational force on each kg (1).' },
  { q: 'Name **two** types of object in the Solar System other than planets.', marks: 2, ms: 'Any two: the Sun / star; moons / natural satellites; dwarf planets; asteroids; comets (1 each).' },
  { q: 'Describe the heliocentric model.', marks: 1, ms: 'The Sun is at the centre and the planets (including Earth) orbit it (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 10 ORBITS =======================
reg(D.contentSlide({
  title: 'Orbits',
  subtitle: `Specification ${sp('7.5')} • moons, planets, comets and artificial satellites`,
  tag: sp('7.5'), p: true, caption: 'a planet’s orbit (nearly circular) and a comet’s orbit (very elliptical)',
  draw: (s, p) => {
    box(s, 0.6, 1.45, 5.8, 4.3, NAVY, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    sunIconP(s, 2.4, 3.6, 0.25);
    ball(s, 2.4, 3.6, 1.0, null, '9FD3F0', 1.5); ball(s, 3.4, 3.6, 0.1, '2E5BD8', '2E5BD8'); label(s, 3.5, 3.45, 1.0, 'planet', { size: 9.5, color: C.white, h: 0.25, align: 'left' });
    oval(s, 3.9, 3.6, 4.6, 1.4, null, 'F5A742', { lw: 1.5, dash: 'dash' }); ball(s, 6.0, 3.6, 0.07, 'FFFFFF', 'FFFFFF'); line(s, 6.05, 3.6, 6.3, 3.45, 'BFD9F2', 2);
    label(s, 5.1, 2.65, 1.3, 'comet', { size: 9.5, color: 'F5A742', h: 0.25 });
    label(s, 0.75, 1.55, 5.5, 'the comet moves **fastest** when it is **closest** to the Sun', { size: 10, color: C.white, h: 0.3 });
  },
  head: 'Types of orbit',
  lines: [
    '**Planets** orbit the **Sun** in nearly **circular** (slightly elliptical) orbits.',
    '**Moons** orbit **planets** in nearly circular orbits.',
    '**Comets** have very **elliptical** orbits: they speed up near the Sun and slow down far from it.',
    '**Artificial satellites:** **geostationary** satellites orbit above the equator once every **24 hours** (stay above one place: communications); **polar** satellites orbit over the poles in low orbits (weather, mapping).',
    '**Gravity** provides the force that keeps every object in orbit.',
  ],
  worked: { head: 'Orbit speed (Topic 2 link)', q: 'The Moon orbits at a radius of 3.84 × 10⁸ m every 27.3 days. Calculate its speed.',
    steps: [['Distance', '2πr = 2 × π × 3.84 × 10⁸ = 2.41 × 10⁹ m'], ['Time', '27.3 × 24 × 3600 = 2.36 × 10⁶ s'], ['Answer', 'v = x ÷ t ≈ 1020 m/s']] , size: 11 },
  workedH: 1.75,
  qc: 'Why is a **geostationary** satellite useful for satellite TV?',
  notes: 'QUICK CHECK ANSWER: it stays above the same point on the Earth (1); so a dish can point at it without moving (1).\nSpec 7.5P. Orbit speed calculation is a Topic 2 link (checked: ≈ 1020 m/s).',
}), '7.5P Orbits');

// ======================= 11 VELOCITY vs SPEED =======================
reg(D.contentSlide({
  title: 'Circular orbits: changing velocity, constant speed',
  subtitle: `Specification ${sp('7.6')} • the role of gravity`,
  tag: sp('7.6'), p: true, caption: 'velocity (blue) is tangent to the orbit; gravity (red) points to the centre',
  draw: (s, p) => {
    const cx = 3.4, cy = 3.5, R = 1.6;
    ball(s, cx, cy, R, null, '9AA5B1', 1.5, ); ball(s, cx, cy, 0.35, '2E5BD8', '1F3F9F');
    [0, 90, 200, 300].forEach(a => { const t = a * Math.PI / 180, x = cx + R * Math.cos(t), y = cy - R * Math.sin(t); ball(s, x, y, 0.1, 'B7B7B7', '555555'); arrow(s, x, y, x - 0.8 * Math.sin(t), y - 0.8 * Math.cos(t), C.blue, 2.5); arrow(s, x, y, x - 0.6 * Math.cos(t), y + 0.6 * Math.sin(t), C.red, 2.5); });
    label(s, 0.7, 5.35, 2.6, 'velocity (direction changes)', { size: 10, bold: true, color: C.blue, h: 0.3, align: 'left' });
    label(s, 3.5, 5.35, 2.7, 'gravity (towards the centre)', { size: 10, bold: true, color: C.red, h: 0.3, align: 'left' });
  },
  head: 'Explanation',
  lines: [
    '**Speed** is a **scalar**; **velocity** is a **vector** (speed in a given direction).',
    'In a circular orbit the **speed is constant**, but the **direction** keeps changing, so the **velocity changes**.',
    'A changing velocity means the object is **accelerating**, so there must be a **resultant force**: **gravity**, acting **towards the centre** of the orbit.',
    'The force is at **90°** to the motion, so it changes the **direction** but not the **speed**.',
  ],
  worked: { head: 'Exam technique', q: 'Explain how a satellite can accelerate without speeding up.',
    steps: [['Acceleration', 'change in velocity'], ['Velocity', 'direction changes in a circle'], ['Force', 'gravity towards the centre, at 90° to motion'], ['Answer', 'direction changes; speed stays the same']] },
  qc: 'In which direction does the force of gravity act on a planet in a circular orbit?',
  notes: 'QUICK CHECK ANSWER: towards the centre of the orbit / towards the Sun (1).\nSpec 7.6P.',
}), '7.6P Velocity and speed in orbit');

// ======================= 12 RADIUS & SPEED =======================
reg(D.contentSlide({
  title: 'Orbit radius and speed',
  subtitle: `Specification ${sp('7.7')} • a stable orbit needs the right speed`,
  tag: sp('7.7'), p: true, caption: 'closer orbits are faster (qualitative)',
  draw: (s, p) => {
    const cx = 2.6, cy = 3.5;
    ball(s, cx, cy, 0.4, '2E5BD8', '1F3F9F'); ball(s, cx, cy, 0.9, null, '9AA5B1', 1.25); ball(s, cx, cy, 1.7, null, '9AA5B1', 1.25);
    ball(s, cx + 0.9, cy, 0.08, C.red, C.red); arrow(s, cx + 0.9, cy, cx + 0.9, cy - 1.0, C.red, 3); label(s, cx + 0.95, cy - 1.1, 1.3, 'low orbit: fast', { size: 10, bold: true, color: C.red, h: 0.25, align: 'left' });
    ball(s, cx - 1.7, cy, 0.08, C.blue, C.blue); arrow(s, cx - 1.7, cy, cx - 1.7, cy + 0.5, C.blue, 3); label(s, cx - 1.75, cy + 0.6, 1.6, 'high orbit: slower', { size: 10, bold: true, color: C.blue, h: 0.25, align: 'left' });
    const rows = [[{ text: 'Object', options: { bold: true, color: C.white, fill: { color: C.ink } } }, { text: 'Orbit speed', options: { bold: true, color: C.white, fill: { color: C.ink } } }], ['ISS (≈ 400 km up)', '7.7 km/s'], ['Moon', '1.0 km/s'], ['Earth around Sun', '29.9 km/s']].map((r, i) => i ? r.map(t => ({ text: t, options: { fill: { color: i % 2 ? C.cardBlue : C.white } } })) : r);
    s.addTable(rows, { x: 4.4, y: 4.3, w: 1.95, colW: [1.15, 0.8], fontFace: 'Calibri', fontSize: 9, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 }, rowH: 0.26 });
  },
  head: 'Key ideas',
  lines: [
    'Gravity is **stronger closer** to a planet, so an object in a **small** orbit must move **faster** to stay in orbit.',
    'For a **stable orbit**, if the **speed changes**, the **radius** must change too.',
    '**Faster than needed:** the object moves into a **larger** orbit (or escapes). **Slower:** it falls into a **smaller** orbit.',
    'So low-orbit satellites are faster and take less time per orbit (ISS ≈ 90 minutes) than geostationary satellites (24 hours).',
  ],
  worked: { head: 'Predict', q: 'A satellite’s speed drops because of air resistance. What happens?',
    steps: [['Speed', 'too slow for that orbit'], ['Gravity', 'pulls it into a smaller orbit'], ['Then', 'it speeds up but meets more air'], ['Answer', 'orbit shrinks; it may eventually burn up']] },
  qc: 'Which moves faster: a satellite in a low orbit or one in a high orbit?',
  notes: 'QUICK CHECK ANSWER: the satellite in the low orbit (1).\nSpec 7.7P (qualitative only). Orbit speeds checked: ISS 7.74 km/s, Moon ≈ 1.02 km/s, Earth 29.9 km/s.',
}), '7.7P Radius and speed');

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('7.5')}–${sp('7.7')} • orbits`, [
  { q: 'Describe the shape of a comet’s orbit.', marks: 1, ms: 'Very elliptical / elongated (1).' },
  { q: 'Explain why a planet in a circular orbit is accelerating even though its speed is constant.', marks: 3, ms: 'Velocity is a vector / includes direction (1); direction is constantly changing so velocity changes (1); acceleration is caused by gravity towards the centre (1).' },
  { q: 'State what must happen to the radius of a satellite’s orbit if its speed increases.', marks: 1, ms: 'Radius increases / moves to a higher orbit (1).' },
  { q: 'Give **one** use of a polar orbit satellite.', marks: 1, ms: 'Weather monitoring / mapping / spying / imaging the whole Earth (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 14 LIFE CYCLE (Sun-like) =======================
reg(D.contentSlide({
  title: 'The life cycle of a star like the Sun',
  subtitle: `Specification ${sp('7.15')} • nebula → main sequence → red giant → white dwarf`,
  tag: sp('7.15'), p: true, caption: 'stages in the life of a star of about the Sun’s mass (not to scale)',
  draw: (s, p) => {
    box(s, 0.6, 1.45, 5.8, 4.3, NAVY, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    oval(s, 1.3, 2.4, 1.2, 0.8, '7B4FB8', null, { tr: 40 }); oval(s, 1.4, 2.5, 0.8, 0.5, 'C9B6E4', null, { tr: 40 }); label(s, 0.7, 2.9, 1.3, 'nebula', { size: 10.5, bold: true, color: C.white, h: 0.3 });
    arrow(s, 2.0, 2.4, 2.8, 2.4, C.white, 2);
    ball(s, 3.3, 2.4, 0.35, 'F5C342', 'E39A2F', 1); label(s, 2.7, 2.9, 1.3, 'main sequence', { size: 10.5, bold: true, color: C.white, h: 0.3 });
    arrow(s, 3.8, 2.4, 4.6, 2.4, C.white, 2);
    ball(s, 5.3, 2.5, 0.65, 'E74C3C', 'A93226', 1); label(s, 4.7, 3.25, 1.3, 'red giant', { size: 10.5, bold: true, color: C.white, h: 0.3 });
    arrow(s, 5.3, 3.6, 5.3, 4.2, C.white, 2);
    ball(s, 5.3, 4.65, 0.12, 'FFFFFF', 'DDDDDD'); label(s, 4.4, 4.9, 1.8, 'white dwarf', { size: 10.5, bold: true, color: C.white, h: 0.3 });
    ball(s, 3.3, 4.6, 0.5, null, '9FD3F0', 1); label(s, 2.4, 5.2, 1.8, 'outer layers drift off', { size: 9.5, color: '9FD3F0', h: 0.3 });
  },
  head: 'The stages',
  lines: [
    '**Nebula:** a cloud of **dust and gas** (mainly hydrogen) pulled together by **gravity**; it heats up (protostar).',
    '**Main sequence star:** hot enough for **hydrogen nuclei to fuse** into helium. This is a **stable** stage lasting billions of years (the Sun is about halfway through ~10 billion years).',
    '**Red giant:** hydrogen in the core runs out; the star **expands** and cools; heavier elements form by fusion.',
    '**White dwarf:** the outer layers drift away; the hot, dense **core** remains and slowly cools.',
  ],
  worked: { head: 'Order', q: 'Put in order: white dwarf, nebula, red giant, main sequence.',
    steps: [['1', 'nebula'], ['2', 'main sequence'], ['3', 'red giant'], ['Answer', '…then white dwarf']], size: 11 },
  workedH: 1.75,
  qc: 'Which force pulls the gas and dust of a nebula together?',
  notes: 'QUICK CHECK ANSWER: gravity (1).\nSpec 7.15P.',
}), '7.15P Life cycle: Sun-like stars');

// ======================= 15 BALANCE =======================
reg(D.contentSlide({
  title: 'Gravity and thermal expansion',
  subtitle: `Specification ${sp('7.16')} • why a main sequence star is stable`,
  tag: sp('7.16'), p: true, caption: 'forces on a main sequence star',
  draw: (s, p) => {
    ball(s, 3.4, 3.5, 1.4, 'F5C342', 'E39A2F', 2);
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4, c = Math.cos(a), sn = Math.sin(a); arrow(s, 3.4 + 2.2 * c, 3.5 + 2.2 * sn, 3.4 + 1.5 * c, 3.5 + 1.5 * sn, C.red, 2.5); arrow(s, 3.4 + 0.6 * c, 3.5 + 0.6 * sn, 3.4 + 1.3 * c, 3.5 + 1.3 * sn, C.blue, 2.5); }
    label(s, 0.6, 1.5, 2.6, '**gravity** pulls inwards', { size: 10.5, color: C.red, h: 0.3 });
    label(s, 0.8, 5.45, 5.4, '**thermal expansion** (pressure from fusion energy) pushes outwards', { size: 10.5, color: C.blue, h: 0.35 });
  },
  head: 'The balance',
  lines: [
    '**Gravity** pulls the star’s matter **inwards**.',
    'Energy from **fusion** heats the core; the hot gas exerts an **outward pressure** (**thermal expansion**).',
    '**Main sequence:** the two are **balanced**, so the star is **stable** in size.',
    'When hydrogen in the core runs out, fusion changes, the balance is lost: the star **expands** (red giant) and later **collapses** under gravity (white dwarf, or more for massive stars).',
  ],
  worked: { head: 'Explain', q: 'Why does a star collapse when fusion stops?',
    steps: [['Fusion stops', 'less energy released in the core'], ['Pressure', 'outward pressure falls'], ['Gravity', 'now greater than outward force'], ['Answer', 'the core collapses inwards']] },
  qc: 'Name the **two** forces that are balanced in a main sequence star.',
  notes: 'QUICK CHECK ANSWER: gravity (inwards) (1); outward pressure from thermal expansion / radiation pressure (1).\nSpec 7.16P.',
}), '7.16P Gravity and thermal expansion');

// ======================= 16 MASSIVE STARS =======================
reg(D.contentSlide({
  title: 'The life cycle of massive stars',
  subtitle: `Specification ${sp('7.17')} • stars much larger than the Sun`,
  tag: sp('7.17'), p: true, caption: 'two paths depending on mass',
  draw: (s, p) => {
    box(s, 0.6, 1.45, 5.8, 4.3, NAVY, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    stageBox(s, 0.8, 1.7, 1.4, 0.55, 'nebula', 'C9B6E4'); arrow(s, 2.2, 1.97, 2.55, 1.97, C.white, 2);
    stageBox(s, 2.55, 1.7, 1.6, 0.55, 'main sequence', 'F5C342'); arrow(s, 3.35, 2.25, 3.35, 2.6, C.white, 2);
    stageBox(s, 2.35, 2.6, 2.0, 0.55, 'red supergiant', 'E74C3C', C.white); arrow(s, 3.35, 3.15, 3.35, 3.5, C.white, 2);
    stageBox(s, 2.55, 3.5, 1.6, 0.55, 'SUPERNOVA', 'F5A742'); arrow(s, 3.0, 4.05, 2.0, 4.6, C.white, 2); arrow(s, 3.7, 4.05, 4.7, 4.6, C.white, 2);
    stageBox(s, 0.9, 4.6, 1.9, 0.55, 'neutron star', '9FD3F0'); stageBox(s, 3.9, 4.6, 1.9, 0.55, 'black hole', '111111', C.white);
    label(s, 0.9, 5.2, 1.9, 'very dense', { size: 9, color: C.white, h: 0.25 }); label(s, 3.9, 5.2, 1.9, 'most massive stars', { size: 9, color: C.white, h: 0.25 });
  },
  head: 'The stages',
  lines: [
    'Massive stars use their hydrogen **faster** and have **shorter** lives.',
    'After the main sequence they become **red supergiants**; fusion makes heavier elements up to **iron**.',
    'The core collapses and the star explodes as a **supernova**, scattering elements (heavier than iron are made in the explosion) into space: new stars and planets form from this material.',
    'The remaining core becomes a **neutron star**, or for the most massive stars a **black hole** (gravity so strong that not even light escapes).',
  ],
  worked: { head: 'Compare', q: 'How does the end of a massive star differ from the Sun’s?',
    steps: [['Sun', 'red giant → white dwarf'], ['Massive', 'red supergiant → supernova'], ['Remnant', 'neutron star or black hole'], ['Answer', 'massive stars explode']] },
  qc: 'What is a **supernova**?',
  notes: 'QUICK CHECK ANSWER: the explosion of a massive star (red supergiant) at the end of its life (1).\nSpec 7.17P.',
}), '7.17P Massive stars');

// ======================= 17 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('7.15')}–${sp('7.17')} • stars`, [
  { q: 'Describe how a star forms from a nebula.', marks: 2, ms: 'Gravity pulls dust and gas together (1); it heats up until hydrogen fusion starts (1).' },
  { q: 'Explain why a main sequence star stays the same size.', marks: 2, ms: 'Gravity pulling in (1); balanced by outward pressure from thermal expansion / fusion energy (1).' },
  { q: 'Name the **two** possible final stages of a very massive star.', marks: 2, ms: 'Neutron star (1); black hole (1).' },
  { q: 'Name the stage that the Sun will become after the main sequence.', marks: 1, ms: 'Red giant (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 18 DOPPLER =======================
reg(D.contentSlide({
  title: 'The Doppler effect',
  subtitle: `Specification ${sp('7.10')} • a moving source changes the observed wavelength`,
  tag: sp('7.10'), p: true, caption: 'wavefronts from a source moving to the right',
  draw: (s, p) => {
    for (let k = 0; k < 5; k++) { const r = 0.3 + k * 0.38, cx = 3.6 - k * 0.28; ball(s, cx, 3.4, r, null, C.blue, 1.5); }
    ball(s, 3.75, 3.4, 0.1, C.red, C.red); arrow(s, 3.85, 3.4, 4.5, 3.4, C.red, 2.5);
    person(s, 0.8, 5.3); person(s, 6.0, 5.3);
    label(s, 1.15, 5.4, 2.3, 'behind: **longer λ, lower f**', { size: 10.5, color: C.red, h: 0.3 });
    label(s, 3.5, 5.4, 2.3, 'in front: **shorter λ, higher f**', { size: 10.5, color: C.blue, h: 0.3 });
  },
  head: 'Key ideas',
  lines: [
    'When a wave source **moves** relative to an observer, the **observed frequency and wavelength change**.',
    '**Moving towards** you: wavefronts are **squashed**: **shorter wavelength**, **higher frequency** (a siren sounds higher).',
    '**Moving away**: wavefronts are **stretched**: **longer wavelength**, **lower frequency**.',
    'For light, moving away shifts the light towards the **red** end: **red-shift**. Moving towards shifts it to the **blue** end: **blue-shift**.',
  ],
  worked: { head: 'Explain', q: 'Why does an ambulance siren drop in pitch as it passes?',
    steps: [['Approach', 'wavefronts squashed: higher frequency'], ['Pass', 'source now moving away'], ['After', 'wavefronts stretched: lower frequency'], ['Answer', 'pitch drops']] },
  qc: 'A galaxy is moving **away** from the Earth. What happens to the observed **wavelength** of its light?',
  notes: 'QUICK CHECK ANSWER: it increases / is red-shifted (1).\nSpec 7.10P.',
}), '7.10P Doppler effect');

// ======================= 19 RED-SHIFT =======================
reg(D.contentSlide({
  title: 'Red-shift and the expanding Universe',
  subtitle: `Specification ${sp('7.11')}–${sp('7.12')} • more distant galaxies move away faster`,
  tag: `${sp('7.11')}–${sp('7.12')}`, p: true, caption: 'absorption lines in the Sun (top) and a distant galaxy (bottom)',
  draw: (s, p) => {
    const sp1 = (y, shift) => { ['8E44AD', '3498DB', '2ECC71', 'F1C40F', 'F39C12', 'E74C3C'].forEach((c, k) => box(s, 0.8 + k * 0.92, y, 0.92, 0.55, c, null)); [1.4, 2.6, 3.9, 4.7].forEach(x => line(s, x + shift, y, x + shift, y + 0.55, '111111', 3)); };
    sp1(1.7, 0); label(s, 0.8, 2.25, 5.5, 'Sun (not moving away)', { size: 10, h: 0.25 });
    sp1(2.7, 0.45); label(s, 0.8, 3.25, 5.5, 'distant galaxy: lines shifted to the **red** end', { size: 10, h: 0.25 });
    const g = { x: 1.45, y: 3.75, w: 4.4, h: 1.65, xmin: 0, xmax: 250, xstep: 50, ymin: 0, ymax: 18000, ystep: 6000, xlabel: 'Distance (Mpc)', ylabel: 'Speed (km/s)' };
    axes(s, g); points(s, g, GAL, C.red); plotLine(s, g, [[0, 0], [250, 17500]], C.blue, 1.5);
  },
  head: 'The evidence',
  lines: [
    'Light from **almost all** galaxies is **red-shifted**: they are **moving away** from us.',
    'The **further away** a galaxy is, the **greater** its red-shift, so the **faster** it is moving away.',
    'This means the whole **Universe is expanding**: space itself is stretching.',
    'Going back in time, everything would have been together at a single point: evidence for the **Big Bang**.',
  ],
  worked: { head: 'Read the graph', q: 'What does the straight line through the origin show?',
    steps: [['Shape', 'speed is proportional to distance'], ['Meaning', 'twice as far → moving away twice as fast'], ['Model', 'uniform expansion'], ['Answer', 'the Universe is expanding']] },
  qc: 'Explain why a **larger** red-shift means a galaxy is **further away**.',
  notes: 'QUICK CHECK ANSWER: larger red-shift means the galaxy is moving away faster (1); galaxies moving away faster are further away (speed proportional to distance) (1).\nSpec 7.11P–7.12P. Graph data illustrative (speed / distance = 70 km/s per Mpc).',
}), '7.11P–7.12P Red-shift');

// ======================= 20 THEORIES =======================
{
  const s = D.contentHeader('Steady State and Big Bang theories', `Specification ${sp('7.8')}, ${sp('7.13')} • two explanations of red-shift`, { tag: `${sp('7.8')}, ${sp('7.13')}`, p: true });
  D.card(s, 0.45, 1.3, 6.1, 3.3, 'Big Bang theory', [
    'The Universe began about **13.8 billion years ago** from a very **small, hot, dense** point and has been **expanding** and **cooling** ever since.',
    'It has a **beginning**; it is changing over time.',
    '**Explains red-shift:** galaxies are moving apart because space has expanded since the Big Bang.',
  ], { size: 12.5 });
  D.card(s, 6.8, 1.3, 6.08, 3.3, 'Steady State theory', [
    'The Universe has **always existed** and always will; it looks the **same** at all times.',
    'It is **expanding**, but **new matter** is continuously **created** to keep the density constant.',
    '**Explains red-shift:** the Universe is expanding, with new galaxies forming in the gaps.',
  ], { size: 12.5 });
  D.workedSteps(s, 0.45, 4.75, 12.43, 1.5, 'Compare', 'How are the two theories similar and different?', [['Same', 'both say the Universe is expanding, so both explain red-shift'], ['Different', 'Big Bang: a beginning and changing; Steady State: no beginning, unchanging, matter created'], ['Decider', 'evidence such as the CMB']], { size: 12 });
  D.quickCheck(s, 'Why can red-shift **not** tell us which theory is correct?');
  D.notes(s, 'QUICK CHECK ANSWER: both theories predict an expanding Universe / both explain red-shift (1); so other evidence (the CMB) is needed to decide (1).\nSpec 7.8P and 7.13P.');
  reg(s, '7.8P, 7.13P Steady State vs Big Bang');
}

// ======================= 21 CMB =======================
reg(D.contentSlide({
  title: 'The cosmic microwave background',
  subtitle: `Specification ${sp('7.9')}, ${sp('7.14')} • why the Big Bang is the accepted model`,
  tag: `${sp('7.9')}, ${sp('7.14')}`, p: true, caption: 'the CMB comes from every direction in space (map illustrative)',
  draw: (s, p) => {
    oval(s, 3.5, 3.4, 5.2, 2.6, '2E5BD8', '1F3F9F', { lw: 1.5 });
    let r = 11; const rnd = () => { r = (r * 9301 + 49297) % 233280; return r / 233280; };
    for (let i = 0; i < 70; i++) { const a = rnd() * 2 * Math.PI, d = Math.sqrt(rnd()); const x = 3.5 + 2.4 * d * Math.cos(a), y = 3.4 + 1.18 * d * Math.sin(a); ball(s, x, y, 0.08 + rnd() * 0.12, ['F39C12', 'E74C3C', '5DADE2', 'F7DC6F'][Math.floor(rnd() * 4)], null); }
    label(s, 0.8, 4.9, 5.4, 'tiny temperature differences across the sky', { size: 10.5, h: 0.35 });
  },
  head: 'The CMB',
  lines: [
    'The **CMB** is **microwave radiation** detected coming from **all directions** in space (discovered in 1965 by Penzias and Wilson).',
    'The **Big Bang theory predicts** it: radiation released when the early Universe was very hot has been **stretched** (red-shifted) to **microwave** wavelengths as the Universe expanded and cooled.',
    'The **Steady State theory cannot explain** the CMB.',
    'So the discovery of the CMB led to the **Big Bang** becoming the **accepted model**.',
  ],
  worked: { head: 'Exam technique', q: 'Explain how the CMB supports the Big Bang theory.',
    steps: [['Prediction', 'Big Bang predicts leftover radiation'], ['Stretch', 'expansion red-shifted it to microwaves'], ['Observed', 'found from all directions'], ['Answer', 'Steady State cannot explain it']] },
  qc: 'Give the **two** pieces of evidence for the Big Bang theory.',
  notes: 'QUICK CHECK ANSWER: red-shift of galaxies (1); cosmic microwave background (CMB) radiation (1).\nSpec 7.9P and 7.14P.',
}), '7.9P, 7.14P CMB');

// ======================= 22 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('7.8')}–${sp('7.14')} • red-shift and the Big Bang`, [
  { q: 'Describe what is meant by red-shift.', marks: 2, ms: 'Observed wavelength of light is longer / shifted towards the red end (1); because the source is moving away (1).' },
  { q: 'Explain how red-shift shows that the Universe is expanding.', marks: 2, ms: 'Galaxies are moving away from us (1); more distant galaxies move away faster / all galaxies moving apart (1).' },
  { q: 'Explain why the Big Bang theory replaced the Steady State theory.', marks: 3, ms: 'CMB discovered (1); Big Bang predicts / explains the CMB (1); Steady State cannot explain it (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 23 TELESCOPES =======================
reg(D.contentSlide({
  title: 'Observing the Universe',
  subtitle: `Specification ${sp('7.18')} • from the naked eye to space telescopes`,
  tag: sp('7.18'), p: true, caption: 'the atmosphere absorbs some wavelengths before they reach the ground',
  draw: (s, p) => {
    box(s, 0.6, 1.45, 5.8, 4.3, NAVY, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    box(s, 0.6, 3.9, 5.8, 1.0, '5DADE2', null, { tr: 60 }); label(s, 0.7, 3.95, 2.0, 'atmosphere', { size: 10, color: C.white, h: 0.25, align: 'left' });
    box(s, 0.6, 4.9, 5.8, 0.85, '5E8A4A', null);
    [['visible', 1.4, true, 'F1C40F'], ['radio', 2.6, true, 'C9B6E4'], ['UV', 3.8, false, '8E44AD'], ['X-ray', 5.0, false, '9FA8DA']].forEach(([t, x, through, c]) => { arrow(s, x, 1.9, x, through ? 4.85 : 4.3, c, 2.5); label(s, x - 0.5, 1.6, 1.0, t, { size: 10, bold: true, color: c, h: 0.25 }); if (!through) label(s, x - 0.55, 4.35, 1.1, 'absorbed', { size: 9, color: C.white, h: 0.25 }); });
    box(s, 4.2, 2.6, 0.6, 0.35, 'B7C0CA', '555555'); box(s, 3.95, 2.68, 0.25, 0.2, '2E5BD8', null); box(s, 4.8, 2.68, 0.25, 0.2, '2E5BD8', null);
    label(s, 4.1, 3.0, 1.6, 'space telescope', { size: 9.5, color: C.white, h: 0.25 });
  },
  head: 'How methods changed',
  lines: [
    '**Naked eye** → **optical telescopes** (Galileo, 1609) → larger telescopes with **photography** and digital cameras (CCDs) → telescopes for **other wavelengths** (radio, infrared, UV, X-ray, gamma).',
    'Different wavelengths show different objects, e.g. **radio** shows gas clouds; **X-rays** show very hot objects.',
    '**Why space telescopes?** The atmosphere **absorbs** some wavelengths (UV, X-rays, much IR); it also **blurs** images (turbulence); and there is no **light pollution** or cloud.',
    '**Disadvantages:** very **expensive** to launch; hard to **repair** or upgrade.',
  ],
  worked: { head: 'Evaluate', q: 'Why are X-ray telescopes always in space?',
    steps: [['Atmosphere', 'absorbs X-rays'], ['Ground', 'no X-rays reach the surface'], ['Space', 'above the atmosphere'], ['Answer', 'only place to detect them']] },
  qc: 'Give **one** advantage and **one** disadvantage of putting a telescope in space.',
  notes: 'QUICK CHECK ANSWER: advantage: no atmospheric absorption / no blurring / no light pollution / no clouds (1); disadvantage: expensive / hard to repair or maintain (1).\nSpec 7.18P (content supported by Save My Exams).',
}), '7.18P Observing the Universe');

// ======================= 24 EQUATIONS =======================
reg(D.equationsSlide([['Wmg', sp('7.1') + ' (Topic 2)']], {
  subtitle: 'Topic 7 equations • RECALL = learn it',
  qc: 'Rearrange W = m × g to find **m** and to find **g**.',
  notes: 'QUICK CHECK: m = W ÷ g; g = W ÷ m. Orbit speeds use v = x ÷ t with x = 2πr (Topic 2 link).',
}), 'Summary: equations');

// ======================= 25 KEY WORDS =======================
reg(D.keyWords([
  ['Gravitational field strength', 'Force per kg (N/kg); 10 on Earth, 1.6 on the Moon.'],
  ['Weight', 'Force of gravity: W = m × g.'],
  ['Natural satellite', 'A moon orbiting a planet.'],
  ['Dwarf planet', 'Small planet-like body, e.g. Pluto.'],
  ['Geocentric', 'Model with the Earth at the centre.'],
  ['Heliocentric', 'Model with the Sun at the centre.'],
  ['Geostationary', 'Satellite orbiting once per 24 h above the equator.'],
  ['Nebula', 'Cloud of dust and gas where stars form.'],
  ['Main sequence', 'Stable stage: gravity balances thermal expansion.'],
  ['Red giant', 'Expanded star after core hydrogen runs out.'],
  ['White dwarf', 'Hot, dense remnant core of a Sun-like star.'],
  ['Supernova', 'Explosion of a massive star.'],
  ['Doppler effect', 'Change in observed f and λ from a moving source.'],
  ['Red-shift', 'Light from receding galaxies shifted to longer λ.'],
  ['Big Bang', 'Universe began from a hot, dense point and expanded.'],
  ['CMB', 'Microwave radiation from all directions: Big Bang evidence.'],
], { notes: 'Cover-and-recall. All of Topic 7 is physics only.' }), 'Summary: key words');

// ======================= 26 FULL QUESTION =======================
reg(D.fullQuestion('A space probe of mass **90 kg** is sent to Mars (g = 3.7 N/kg). Astronomers also study light from distant galaxies.', [
  { l: 'a', q: 'Calculate the weight of the probe on Mars.', marks: 2, ms: 'W = 90 × 3.7 (1); = 333 N (1).' },
  { l: 'b', q: 'Explain why the probe’s weight on Mars is less than on the Earth, even though its mass is the same.', marks: 2, ms: 'g is smaller on Mars (1); because Mars has less mass (than Earth) (1).' },
  { l: 'c', q: 'Mars moves in a nearly circular orbit at constant speed. Explain why its velocity is changing.', marks: 2, ms: 'Velocity has direction (1); the direction of motion is constantly changing (1).' },
  { l: 'd', q: 'Describe how light from distant galaxies provides evidence that the Universe is expanding.', marks: 3, ms: 'Light is red-shifted (1); galaxies moving away (1); more distant galaxies have a greater red-shift / move away faster (1).', h: 1.2 },
  { l: 'e', q: 'Explain why the discovery of the CMB supports the Big Bang theory rather than the Steady State theory.', marks: 2, ms: 'Big Bang predicts radiation left over from the early hot Universe (1); Steady State cannot explain the CMB (1).' },
  { l: 'f', q: 'State the final stage of a star with the same mass as the Sun.', marks: 1, ms: 'White dwarf (1).' },
  { l: 'g', q: 'Give **one** reason why some telescopes are placed in space.', marks: 1, ms: 'Atmosphere absorbs some wavelengths / blurs images / no light pollution (1).' },
], 13, { subtitle: `Specification ${sp('7.1')}, ${sp('7.6')}, ${sp('7.9')}–${sp('7.15')}, ${sp('7.18')} • answer every part • 13 marks` }), 'Full question');

// ======================= 27–28 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the stage of a star’s life when it is stable and fusing hydrogen.', marks: 1, ms: 'Main sequence (1).' },
  { n: '2', q: 'A **15 kg** instrument is taken to Jupiter (g = 25 N/kg). Calculate its weight.', marks: 2, ms: 'W = 15 × 25 (1); = 375 N (1).' },
  { n: '3', q: 'Describe **two** differences between the Steady State and Big Bang theories.', marks: 2, ms: 'Big Bang: Universe has a beginning / Steady State: always existed (1); Big Bang: Universe changes / cools; Steady State: unchanging, new matter created (1).' },
  { n: '4', q: 'Explain how the speed of a satellite must change if it moves to a smaller orbit.', marks: 2, ms: 'Speed must increase (1); gravity is stronger closer to the planet so a faster speed is needed for a stable orbit (1).' },
  { n: '5', q: 'Describe and compare the life cycles of a star like the Sun and a star much more massive than the Sun.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Both begin as a nebula of dust and gas pulled together by gravity.',
    'Both become main sequence stars: hydrogen fusion; gravity balanced by outward pressure.',
    'Sun-like star: becomes a red giant when core hydrogen runs out.',
    'Sun-like star: outer layers drift away leaving a white dwarf, which cools.',
    'Massive star: uses fuel faster; becomes a red supergiant; fuses heavier elements.',
    'Massive star: explodes as a supernova; leaves a neutron star or black hole.',
    'Supernova spreads heavy elements that form new stars and planets.',
  ], 'Physics-only (7.15P–7.17P). Level 3 answers describe both paths in order and make clear comparisons.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 13);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7);
assert(D.slideNo >= 28 && D.slideNo <= 38, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T7_Astronomy.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
