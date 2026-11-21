// build_T5.js — Edexcel GCSE Physics 1PH0 Topic 5 Light and the electromagnetic spectrum (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T5.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 5,
  title: 'Light and the electromagnetic spectrum',
  shortTitle: 'T5',
  subtitle: 'Reflection, refraction, lenses, colour, the EM spectrum, radiation and its uses',
  specRange: '5.1–5.24',
  pOnly: ['5.1', '5.2', '5.3', '5.4', '5.5', '5.6', '5.15', '5.16', '5.17', '5.18', '5.19'],
  paper: 'Paper 1',
  keywords: ['Reflection', 'Refraction', 'Lenses', 'EM spectrum', 'Radiation', 'Uses and dangers'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const deg = Math.PI / 180;

Object.assign(T.EQS, {
  vfl: { eq: 'v = f × λ', words: 'wave speed (m/s) = frequency (Hz) × wavelength (m); for EM waves in a vacuum v = 3 × 10⁸ m/s', status: 'recall' },
  vxt: { eq: 'v = x ÷ t', words: 'wave speed (m/s) = distance (m) ÷ time (s)', status: 'recall' },
});

// ======================= CALCULATIONS (asserted) =======================
const c0 = 3e8;
calc('radio 100 MHz λ', c0 / 100e6, 3, 1e-9);
calc('microwave 2.45 GHz λ (3 s.f., m)', sf(c0 / 2.45e9, 3), 0.122, 1e-12);
calc('visible 6e14 Hz λ (nm)', c0 / 6e14 * 1e9, 500, 1e-6);
calc('x-ray λ 1e-10 → f', c0 / 1e-10, 3e18, 1);
calc('YT 200 kHz λ', c0 / 200e3, 1500, 1e-9);
calc('YT λ 0.03 m → f', c0 / 0.03, 1e10, 1);
calc('YT 7.5e14 Hz λ (m)', c0 / 7.5e14, 4e-7, 1e-20);
calc('Sun to Earth time', 1.5e11 / c0, 500, 1e-9);
calc('glass λ 2e8 / 5e14', 2e8 / 5e14, 4e-7, 1e-20);
const n = 1.5, rOf = i => Math.asin(Math.sin(i * deg) / n) / deg;
const CP = [10, 20, 30, 40, 50, 60].map(i => [i, +rOf(i).toFixed(1)]);
calc('r at 10°', CP[0][1], 6.6, 1e-9); calc('r at 30°', CP[2][1], 19.5, 1e-9); calc('r at 40°', CP[3][1], 25.4, 1e-9); calc('r at 60°', CP[5][1], 35.3, 1e-9);
calc('critical angle glass (3 s.f.)', sf(Math.asin(1 / n) / deg, 3), 41.8, 1e-9);
calc('critical angle water n 1.33 (3 s.f.)', sf(Math.asin(1 / 1.33) / deg, 3), 48.8, 1e-9);
// lens images
const img = (u, f) => 1 / (1 / f - 1 / u);
calc('real image v (u 2.3, f 1.0) (3 s.f.)', sf(img(2.3, 1.0), 3), 1.77, 1e-9);
calc('virtual image v (u 0.6, f 1.0)', img(0.6, 1.0), -1.5, 1e-9);
calc('magnification 1.5/0.6', 1.5 / 0.6, 2.5, 1e-12);
// Leslie cube (illustrative)
const LES = [['matt black', 9.0], ['shiny black', 7.5], ['matt white', 5.0], ['shiny silver', 1.5]];
calc('Leslie black/silver ratio', 9.0 / 1.5, 6, 1e-12);
calc('Earth balance 240 − 240', 240 - 240, 0);
calc('Earth imbalance 240 in, 238 out', 240 - 238, 2);
// Planck shape (μm, K)
const planck = (lam, Tk) => 1 / (lam ** 5) / (Math.exp(14388 / (lam * Tk)) - 1);
const PK = planck(2898 / 5000, 5000);
calc('Wien peak 5000 K (μm, 3 s.f.)', sf(2898 / 5000, 3), 0.58, 1e-12);
calc('Wien peak 3000 K (μm, 3 s.f.)', sf(2898 / 3000, 3), 0.966, 1e-12);
// recaps etc
calc('R3 f = 3e8 / 1500', c0 / 1500, 2e5, 1e-6);
calc('FQ λ for 1.2e15 Hz (nm)', c0 / 1.2e15 * 1e9, 250, 1e-9);
calc('FQ time 3.6e7 m GPS (s)', 3.6e7 / c0, 0.12, 1e-12);
calc('HW f for λ 0.5 m', c0 / 0.5, 6e8, 1e-3);

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


function ray(s, x1, y1, x2, y2, col = C.red, w = 2.2, o = {}) { line(s, x1, y1, x2, y2, col, w, o); const mx = (x1 + x2) / 2, my = (y1 + y2) / 2, L = Math.hypot(x2 - x1, y2 - y1); if (!o.noHead) arrow(s, mx - (x2 - x1) / L * 0.01, my - (y2 - y1) / L * 0.01, mx + (x2 - x1) / L * 0.12, my + (y2 - y1) / L * 0.12, col, w); }
function normalLine(s, x, y1, y2) { line(s, x, y1, x, y2, C.grey, 1, { dash: 'dash' }); }
function lensConv(s, cx, cy, h) { oval(s, cx, cy, 0.3, h, 'DCEBFA', C.blueMid, { lw: 1.5 }); }
function lensDiv(s, cx, cy, h) { poly(s, [[cx - 0.2, cy - h / 2], [cx + 0.2, cy - h / 2], [cx + 0.06, cy], [cx + 0.2, cy + h / 2], [cx - 0.2, cy + h / 2], [cx - 0.06, cy]], 'DCEBFA', C.blueMid, { lw: 1.5 }); }
function objArrow(s, x, yAxis, h, col = C.ink, o = {}) { line(s, x, yAxis, x, yAxis - h, col, 3, { head: true, dash: o.dash }); }
const SPEC = [['radio', 'C9B6E4'], ['micro-\nwave', 'B9A2D8'], ['infrared', 'E89A9A'], ['visible', 'RAINBOW'], ['UV', 'B39DDB'], ['X-ray', '9FA8DA'], ['gamma', '7986CB']];
function spectrumBar(s, x, y, w, h) {
  const cw = w / SPEC.length;
  SPEC.forEach(([nm, col], i) => {
    const xx = x + i * cw;
    if (col === 'RAINBOW') { ['E74C3C', 'F39C12', 'F1C40F', '2ECC71', '3498DB', '5D3FD3', '8E44AD'].forEach((c, k) => box(s, xx + k * cw / 7, y, cw / 7, h, c, null)); }
    else box(s, xx, y, cw, h, col, null);
    label(s, xx, y, cw, nm, { size: 10, bold: true, h, color: col === 'RAINBOW' ? C.white : C.ink });
  });
  box(s, x, y, w, h, null, C.ink, { lw: 1.25 });
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Light and EM waves',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • Core Practicals 5.9 (glass block) and 5.19P (surfaces and radiation)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and PHYSICS ONLY slides are marked' },
    { icon: '5', text: 'Topic 5 of 15 • assessed on Paper 1' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 5 Light and the electromagnetic spectrum. Paper 1. Physics only (P): 5.1P–5.6P (reflection, TIR, colour, lenses) and 5.15P–5.19P (thermal radiation and its Core Practical). Higher only (HT pill): 5.14 and 5.23 (medium-low confidence). Core Practicals: 5.9 refraction (both courses), 5.19P surfaces (physics only). See SPEC_T5.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: `${sp('5.1')}–${sp('5.2')}`, text: 'Draw **ray diagrams** for reflection, refraction and **TIR**; compare **specular** and **diffuse** reflection.' },
  { code: `${sp('5.3')}–${sp('5.4')}`, text: 'Explain **colour** by absorption, transmission and reflection; use **filters**.' },
  { code: `${sp('5.5')}–${sp('5.6')}`, text: 'Draw ray diagrams for **converging and diverging lenses**; **real** and **virtual** images.' },
  { code: '5.7–5.12', text: 'Describe **EM waves** and the **EM spectrum**; use v = f × λ with c = 3 × 10⁸ m/s.' },
  { code: '5.9', text: '**Core Practical:** refraction in a rectangular **glass block**.' },
  { code: '5.13–5.14', text: 'Explain how materials affect EM waves; **refraction** from changes in **velocity**.', ht: true },
  { code: `${sp('5.15')}–${sp('5.19')}`, text: 'Explain **thermal radiation**, the **Earth’s temperature**; **Core Practical** on surfaces.' },
  { code: '5.20–5.24', text: 'Describe the **dangers** and **uses** of EM waves and how they are **produced**.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'P = physics only: 5.1P–5.6P, 5.15P–5.19P. HT = 5.14 and 5.23 (medium-low confidence).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 5 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    [`${sp('5.1')}–${sp('5.2')}`, 'Reflection, refraction, TIR; specular and diffuse', 'PHYSICS ONLY', C.blue],
    [`${sp('5.3')}–${sp('5.6')}`, 'Colour, filters and lenses', 'PHYSICS ONLY', C.blue],
    ['5.7–5.12', 'EM waves and the EM spectrum', 'BOTH COURSES', C.grey],
    ['5.9', 'Core Practical: refraction in a glass block', 'CORE PRACTICAL', C.orange],
    ['5.13–5.14', 'Materials and wave velocity (5.14 HT)', 'BOTH COURSES', C.grey],
    [`${sp('5.15')}–${sp('5.19')}`, 'Thermal radiation; Earth; CP surfaces', 'PHYSICS ONLY', C.blue],
    ['5.20–5.24', 'Dangers, uses, how EM waves are made (5.23 HT)', 'BOTH COURSES', C.grey],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 5\nLight and EM', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 10.5, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.35);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 4 waves and v = f × λ • Topic 6 radioactivity (gamma) • Topic 7 astronomy', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–7.',
      'Combined Science 1SC0 tests the statements **without** a P.',
      '**Recall** v = f × λ; c = 3 × 10⁸ m/s is given in questions.',
      '**Core Practicals** 5.9 (both courses) and 5.19P (physics only).',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Partly physics-only:** ray diagrams, colour and lenses (5.1P–5.6P); thermal radiation and its CP (5.15P–5.19P).',
      '**HT** pill: wave velocity and refraction (5.14); radio waves and circuits (5.23).',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Physics-only (P): 5.1P–5.6P and 5.15P–5.19P. Combined Science route: skip slides 5–13 and 21–24, and the physics-only homework Q3–Q5. Higher only (HT): 5.14 and 5.23 (medium-low confidence). Core Practicals: 5.9 (both), 5.19P (physics only, confirmed by Cognito).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 4 • waves', q: 'State the equation linking wave speed, frequency and wavelength.' },
  { from: 'Topic 4 • waves', q: 'What is the difference between a **transverse** and a **longitudinal** wave?' },
  { from: 'Topic 4 • refraction', q: 'What happens to the **speed** and **direction** of a wave when it enters a slower medium at an angle?' },
  { from: 'KS3 • light', q: 'Name the **seven** colours of the visible spectrum in order.' },
  { from: 'Topic 1 • standard form', q: 'Write **0.000 000 5 m** in standard form.' },
  { from: 'KS3 • light', q: 'What is the **angle of reflection** if the angle of incidence is 35°?' },
], { subtitle: 'Recall from Topics 1 and 4 and Key Stage 3 • 6 minutes • no notes', notes: 'ANSWERS\n1. v = f × λ.\n2. Transverse: vibrations perpendicular to energy transfer; longitudinal: parallel.\n3. It slows down and bends towards the normal.\n4. Red, orange, yellow, green, blue, indigo, violet.\n5. 5 × 10⁻⁷ m.\n6. 35°.' }), 'Retrieval starter');

// ======================= 5 REFLECTION (P) =======================
reg(D.contentSlide({
  title: 'Reflection',
  subtitle: `Specification ${sp('5.1')} • the law of reflection`,
  tag: sp('5.1'), p: true, caption: 'a ray reflected by a plane mirror',
  draw: (s, p) => {
    box(s, 1.0, 4.6, 5.0, 0.18, 'B7C9E2', C.ink, { lw: 1.5 }); for (let x = 1.1; x < 6.0; x += 0.25) line(s, x, 4.78, x - 0.15, 4.98, C.ink, 1);
    normalLine(s, 3.5, 1.7, 4.6); label(s, 3.55, 1.6, 0.9, 'normal', { size: 10, italic: true, color: C.grey, align: 'left', h: 0.25 });
    const L = 2.6, a = 40 * deg;
    ray(s, 3.5 - L * Math.sin(a), 4.6 - L * Math.cos(a), 3.5, 4.6); ray(s, 3.5, 4.6, 3.5 + L * Math.sin(a), 4.6 - L * Math.cos(a));
    s.addShape(SH.ARC, { x: 2.9, y: 4.0, w: 1.2, h: 1.2, angleRange: [230, 270], line: { color: C.blue, width: 1.5 } });
    s.addShape(SH.ARC, { x: 2.9, y: 4.0, w: 1.2, h: 1.2, angleRange: [270, 310], line: { color: '2E8B57', width: 1.5 } });
    label(s, 2.65, 3.6, 0.6, '**i**', { size: 13, color: C.blue, h: 0.3 }); label(s, 3.75, 3.6, 0.6, '**r**', { size: 13, color: '2E8B57', h: 0.3 });
    label(s, 0.8, 2.6, 1.6, 'incident ray', { size: 10.5, bold: true, color: C.red, h: 0.3 }); label(s, 4.7, 2.6, 1.6, 'reflected ray', { size: 10.5, bold: true, color: C.red, h: 0.3 });
    label(s, 0.9, 5.05, 5.2, 'plane mirror', { size: 10.5, italic: true, h: 0.3 });
  },
  head: 'Key ideas',
  lines: [
    '**Law of reflection:** angle of incidence = angle of reflection (**i = r**).',
    'Angles are measured from the **normal**: a line at **90°** to the surface where the ray hits.',
    'The incident ray, reflected ray and normal are in the **same plane**.',
    'A plane mirror forms a **virtual** image, the same size, as far behind the mirror as the object is in front.',
  ],
  worked: { head: 'Common mistake', q: 'A ray hits a mirror at 30° to the mirror surface. What is the angle of reflection?',
    steps: [['Normal', 'measure from the normal, not the mirror'], ['i', '90° − 30° = 60°'], ['Answer', 'r = 60°']], size: 11 },
  workedH: 1.75,
  qc: 'Draw a ray hitting a mirror with an angle of incidence of **25°**. Mark the normal and the reflected ray.',
  notes: 'QUICK CHECK ANSWER: normal at 90° to mirror; reflected ray at 25° on the other side of the normal (1 for normal, 1 for correct angle).\nSpec 5.1P (physics only).',
}), '5.1P Reflection (PHYSICS ONLY)');

// ======================= 6 SPECULAR vs DIFFUSE (P) =======================
reg(D.contentSlide({
  title: 'Specular and diffuse reflection',
  subtitle: `Specification ${sp('5.2')} • smooth and rough surfaces`,
  tag: sp('5.2'), p: true, caption: 'parallel rays hitting a smooth surface (left) and a rough surface (right)',
  draw: (s, p) => {
    label(s, 0.7, 1.45, 2.7, '**Specular** (smooth)', { size: 12, color: C.blue });
    box(s, 0.8, 4.2, 2.5, 0.12, 'B7C9E2', C.ink);
    [0, 1, 2].forEach(k => { const x = 1.5 + k * 0.45; ray(s, x - 0.9, 2.2, x, 4.2, C.red, 1.75); ray(s, x, 4.2, x + 0.9, 2.2, C.red, 1.75); });
    label(s, 0.7, 4.5, 2.7, 'reflected rays stay **parallel**: a clear image', { size: 10, h: 0.5 });
    label(s, 3.6, 1.45, 2.7, '**Diffuse** (rough)', { size: 12, color: C.blue });
    polyline(s, [[3.7, 4.2], [3.95, 4.05], [4.2, 4.3], [4.5, 4.0], [4.8, 4.28], [5.1, 4.05], [5.4, 4.3], [5.7, 4.1], [6.1, 4.25]], C.ink, 2);
    [[4.08, -0.9, 1.15], [4.62, 0.2, 0.7], [5.25, 1.1, -0.2]].forEach(([x, dx1, dx2]) => { ray(s, x - 0.9, 2.2, x, 4.15, C.red, 1.75); ray(s, x, 4.15, x + dx2 + 0.4, 2.3 + Math.abs(dx1) * 0.3, C.red, 1.75); });
    label(s, 3.6, 4.5, 2.7, 'reflected rays **scatter** in many directions: no image', { size: 10, h: 0.5 });
  },
  head: 'The difference',
  lines: [
    '**Specular reflection:** from a **smooth**, flat surface (mirror, still water). Every ray reflects at the **same angle**, so parallel rays stay parallel and an **image** forms.',
    '**Diffuse reflection:** from a **rough** surface (paper, clothes). The normal points in **different directions** at each point, so rays **scatter**: no clear image.',
    'The **law of reflection** is obeyed at every point in **both** cases.',
  ],
  worked: { head: 'Explain', q: 'Why can you see your reflection in a mirror but not in a sheet of paper?',
    steps: [['Mirror', 'smooth: rays reflect in one direction'], ['Paper', 'rough at a small scale'], ['Scatter', 'normals point in many directions'], ['Answer', 'diffuse reflection: no image']] },
  qc: 'Is the law of reflection obeyed in **diffuse** reflection? Explain.',
  notes: 'QUICK CHECK ANSWER: yes (1); each ray obeys i = r at its own normal, but the normals point in different directions (1).\nSpec 5.2P (physics only).',
}), '5.2P Specular and diffuse (PHYSICS ONLY)');

// ======================= 7 REFRACTION & TIR (P) =======================
reg(D.contentSlide({
  title: 'Refraction and total internal reflection',
  subtitle: `Specification ${sp('5.1')} • the critical angle`,
  tag: sp('5.1'), p: true, caption: 'light inside glass meeting the glass–air boundary',
  draw: (s, p) => {
    const cases = [[25, 'i < critical angle', 'refracted out (and a weak reflection)'], [41.8, 'i = critical angle', 'refracted along the boundary'], [60, 'i > critical angle', 'total internal reflection']];
    cases.forEach(([ang, t, d], k) => {
      const x0 = 0.75 + k * 1.95, w = 1.75, yb = 3.1, cx = x0 + w / 2;
      box(s, x0, yb, w, 1.6, 'DCEBFA', C.blueMid, { lw: 1 }); label(s, x0, yb + 1.25, w, 'glass', { size: 9.5, italic: true, h: 0.25 });
      label(s, x0, 1.55, w, 'air', { size: 9.5, italic: true, h: 0.25 });
      normalLine(s, cx, 1.9, 4.6);
      const L = 1.3, a = ang * deg;
      ray(s, cx - L * Math.sin(a), yb + L * Math.cos(a), cx, yb, C.red, 2);
      if (ang < 41) { const r = Math.asin(Math.min(1, 1.5 * Math.sin(a))); ray(s, cx, yb, cx + 1.1 * Math.sin(r), yb - 1.1 * Math.cos(r), C.red, 2); line(s, cx, yb, cx + 0.7 * Math.sin(a), yb + 0.7 * Math.cos(a), 'E8A0A6', 1, { dash: 'dash' }); }
      else if (ang < 45) { ray(s, cx, yb, cx + 0.85, yb - 0.02, C.red, 2); }
      else ray(s, cx, yb, cx + L * Math.sin(a), yb + L * Math.cos(a), C.red, 2);
      label(s, x0, 4.75, w, `**${t}**`, { size: 9.5, h: 0.3 });
      label(s, x0, 5.05, w, d, { size: 9, h: 0.5, color: C.grey, valign: 'top' });
    });
  },
  head: 'Key ideas',
  lines: [
    '**Refraction:** light changes direction when it crosses a boundary at an angle because its **speed changes**. Into glass (slower): bends **towards** the normal; out into air: **away** from it.',
    'The **critical angle** is the angle of incidence (inside the denser material) at which the refracted ray travels **along the boundary**. For glass it is about **42°**.',
    '**Total internal reflection (TIR):** if the angle of incidence is **greater** than the critical angle, **all** the light is reflected back inside.',
    'TIR only happens going from a **slower** (denser) to a **faster** medium. Used in **optical fibres** and endoscopes.',
  ],
  worked: { head: 'Conditions for TIR', q: 'State the two conditions needed for TIR.',
    steps: [['1', 'light travels from a denser (slower) to a less dense (faster) medium'], ['2', 'angle of incidence > critical angle'], ['Answer', 'both conditions needed']], size: 11 },
  workedH: 1.75,
  qc: 'Explain how light stays inside an **optical fibre**.',
  notes: 'QUICK CHECK ANSWER: light hits the inside of the fibre at an angle greater than the critical angle (1); so it is totally internally reflected along the fibre (1).\nSpec 5.1P (physics only). Critical angle of glass (n = 1.5) = 41.8°, of water ≈ 49° (asserted).',
}), '5.1P Refraction and TIR (PHYSICS ONLY)');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('5.1')}–${sp('5.2')} • reflection and TIR`, [
  { q: 'State the law of reflection.', marks: 1, ms: 'Angle of incidence = angle of reflection (1).' },
  { q: 'Explain why a rough surface gives diffuse reflection.', marks: 2, ms: 'Surface is uneven so the normal is in different directions at each point (1); rays reflect / scatter in many directions (1).' },
  { q: 'Explain what is meant by the **critical angle**.', marks: 2, ms: 'Angle of incidence (in the denser material) (1) at which the angle of refraction is 90° / ray travels along the boundary (1).' },
  { q: 'Give **one** use of total internal reflection.', marks: 1, ms: 'Optical fibres / endoscopes / periscopes / reflectors (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 COLOUR (P) =======================
reg(D.contentSlide({
  title: 'Colour',
  subtitle: `Specification ${sp('5.3')} • absorption, transmission and reflection of different wavelengths`,
  tag: sp('5.3'), p: true, caption: 'white light falling on a red object',
  draw: (s, p) => {
    const cols = ['E74C3C', 'F39C12', 'F1C40F', '2ECC71', '3498DB', '8E44AD'];
    cols.forEach((c, k) => line(s, 0.9, 1.8 + k * 0.12, 3.0, 3.3 + k * 0.05, c, 2));
    label(s, 0.7, 1.45, 1.6, '**white light**', { size: 11, h: 0.3 });
    ball(s, 3.5, 3.8, 0.75, 'E74C3C', 'A93226', 2); line(s, 3.5, 3.05, 3.6, 2.75, '5E8A4A', 3);
    ray(s, 3.8, 3.2, 5.3, 2.0, 'E74C3C', 3); label(s, 4.6, 1.65, 1.6, '**red reflected**', { size: 11, color: 'E74C3C', h: 0.3 });
    label(s, 2.4, 4.75, 2.4, 'other colours **absorbed**', { size: 10.5, h: 0.3 });
    box(s, 0.9, 5.15, 0.4, 0.3, C.white, '999999'); label(s, 1.35, 5.15, 1.4, 'white: reflects all', { size: 9.5, h: 0.3, align: 'left' });
    box(s, 3.2, 5.15, 0.4, 0.3, '111111', '111111'); label(s, 3.65, 5.15, 1.6, 'black: absorbs all', { size: 9.5, h: 0.3, align: 'left' });
  },
  head: 'How objects get their colour',
  lines: [
    'White light is a mixture of all **wavelengths** (colours) of visible light.',
    '**Opaque** objects: the colour we see is the wavelength they **reflect**; the others are **absorbed**. A red apple reflects red, absorbs the rest.',
    '**White** objects reflect **all** wavelengths; **black** objects absorb **all** of them.',
    '**Transparent / translucent** objects: the colour is the wavelength they **transmit**.',
  ],
  worked: { head: 'Explain', q: 'Why does a green leaf look green in sunlight?',
    steps: [['White light', 'contains all colours'], ['Absorb', 'leaf absorbs red, blue and other colours'], ['Reflect', 'green wavelengths reflected'], ['Answer', 'green light enters our eyes']] },
  qc: 'Explain why a black T-shirt warms up more in sunlight than a white one.',
  notes: 'QUICK CHECK ANSWER: black absorbs all wavelengths / more energy absorbed (1); white reflects them (1).\nSpec 5.3P (physics only).',
}), '5.3P Colour (PHYSICS ONLY)');

// ======================= 10 FILTERS (P) =======================
reg(D.contentSlide({
  title: 'Colour filters',
  subtitle: `Specification ${sp('5.4')} • transmitting only some wavelengths`,
  tag: sp('5.4'), p: true, caption: 'white light passing through a red filter',
  draw: (s, p) => {
    const cols = ['E74C3C', 'F39C12', 'F1C40F', '2ECC71', '3498DB', '8E44AD'];
    cols.forEach((c, k) => line(s, 0.9, 2.4 + k * 0.12, 2.8, 2.4 + k * 0.12, c, 2.5));
    label(s, 0.8, 2.0, 1.8, '**white light**', { size: 11, h: 0.3 });
    box(s, 2.85, 1.9, 0.35, 1.6, 'E74C3C', 'A93226', { tr: 25 }); label(s, 2.5, 3.55, 1.1, 'red filter', { size: 10.5, bold: true, h: 0.3 });
    line(s, 3.25, 2.4, 5.8, 2.4, 'E74C3C', 3); label(s, 4.0, 2.0, 1.9, '**only red** transmitted', { size: 11, color: 'E74C3C', h: 0.3 });
    const rows = [[HDR('Object (in white light)'), HDR('Seen in red light')], ...[['red', 'red'], ['white', 'red'], ['blue', 'black'], ['green', 'black']].map(([a, b], i) => [tcell(a, i, { bold: true }), tcell(b, i, { bold: true, color: b === 'red' ? C.red : C.ink })])];
    table(s, rows, { x: 0.9, y: 3.95, w: 5.0, colW: [2.6, 2.4], rowH: 0.3, fontSize: 10.5 });
  },
  head: 'Key ideas',
  lines: [
    'A **colour filter** **transmits** only its own colour (range of wavelengths) and **absorbs** all the others.',
    'A red filter lets red through; blue and green are absorbed.',
    'An object in **coloured light** can only reflect the colours that **reach** it. A blue object in red light has no blue to reflect, so it looks **black**.',
    'Two filters in a row (e.g. red then green) let **no** light through.',
  ],
  worked: { head: 'Predict', q: 'A white shirt with blue writing is lit by red light only. Describe what you see.',
    steps: [['Shirt', 'white reflects the red light: looks red'], ['Writing', 'blue absorbs red: looks black'], ['Answer', 'black writing on a red shirt']], size: 11 },
  workedH: 1.75,
  qc: 'What colour does a **green** car appear under **red** street lights? Explain.',
  notes: 'QUICK CHECK ANSWER: black (1); only red light reaches it and green paint absorbs red, so nothing is reflected (1).\nSpec 5.4P (physics only; number medium-low confidence).',
}), '5.4P Colour filters (PHYSICS ONLY)');

// ======================= 11 LENSES (P) =======================
reg(D.contentSlide({
  title: 'Converging and diverging lenses',
  subtitle: `Specification ${sp('5.5')} • ray diagrams`,
  tag: sp('5.5'), p: true, caption: 'parallel rays through each lens; F = principal focus',
  draw: (s, p) => {
    const ya = 2.55;
    label(s, 0.7, 1.45, 3.0, '**Converging** (convex)', { size: 11.5, align: 'left', color: C.blue });
    line(s, 0.8, ya, 6.2, ya, C.grey, 1); lensConv(s, 3.0, ya, 1.6);
    [-0.5, 0, 0.5].forEach(d => { ray(s, 0.9, ya + d, 3.0, ya + d, C.red, 1.75); line(s, 3.0, ya + d, 4.3, ya, C.red, 1.75); line(s, 4.3, ya, 4.95, ya - d * 0.5, C.red, 1.75); });
    ball(s, 4.3, ya, 0.05, C.ink); label(s, 4.15, ya + 0.08, 0.3, 'F', { size: 11, bold: true, h: 0.25 });
    line(s, 3.0, ya + 0.95, 4.3, ya + 0.95, '2E8B57', 1.25, { head: true, tail: true }); label(s, 3.1, ya + 0.98, 1.2, 'focal length', { size: 9.5, color: '2E8B57', h: 0.25 });
    const yb = 4.6;
    label(s, 0.7, 3.65, 3.0, '**Diverging** (concave)', { size: 11.5, align: 'left', color: C.blue });
    line(s, 0.8, yb, 6.2, yb, C.grey, 1); lensDiv(s, 3.0, yb, 1.6);
    [-0.5, 0, 0.5].forEach(d => { ray(s, 0.9, yb + d, 3.0, yb + d, C.red, 1.75); const ex = 4.6, ey = yb + d + d / 1.3 * 1.6; line(s, 3.0, yb + d, ex, ey, C.red, 1.75); if (d) line(s, 1.7, yb, 3.0, yb + d, C.red, 1, { dash: 'dash' }); });
    ball(s, 1.7, yb, 0.05, C.ink); label(s, 1.55, yb + 0.08, 0.3, 'F', { size: 11, bold: true, h: 0.25 });
  },
  head: 'Similarities and differences',
  lines: [
    'Both lenses **refract** light at their curved surfaces.',
    '**Converging (convex):** fatter in the middle; parallel rays are brought together at the **principal focus F** (a real focus).',
    '**Diverging (concave):** thinner in the middle; parallel rays **spread out** as if they came from a **virtual** focus F on the same side as the light enters.',
    'The **focal length** is the distance from the centre of the lens to F. A **more curved** lens has a **shorter** focal length (more powerful).',
    'Ray diagram rules: a ray **through the centre** goes straight on; a ray **parallel** to the axis goes through (or appears to come from) **F**.',
  ],
  worked: { head: 'Uses', q: 'Which lens corrects each eye defect?',
    steps: [['Long sight', 'converging lens'], ['Short sight', 'diverging lens'], ['Others', 'cameras and magnifiers: converging'], ['Answer', 'converging for long, diverging for short']] },
  qc: 'Describe what happens to parallel rays passing through a **diverging** lens.',
  notes: 'QUICK CHECK ANSWER: they spread out / diverge (1); as if from a point (the virtual focus F) on the near side of the lens (1).\nSpec 5.5P (physics only; number medium confidence).',
}), '5.5P Lenses (PHYSICS ONLY)');

// ======================= 12 REAL & VIRTUAL IMAGES (P) =======================
{
  const s = D.contentHeader('Real and virtual images', `Specification ${sp('5.6')} • using a converging lens`, { tag: sp('5.6'), p: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'object beyond 2F (top): real image • object inside F (bottom): virtual image');
  // real
  const ya = 2.6, lx = 3.5, f = 1.0;
  line(s, 0.7, ya, 6.3, ya, C.grey, 1); lensConv(s, lx, ya, 1.7);
  [lx - f, lx + f, lx - 2 * f, lx + 2 * f].forEach((x, k) => { ball(s, x, ya, 0.04, C.ink); label(s, x - 0.25, ya + 0.05, 0.5, ['F', 'F', '2F', '2F'][k], { size: 9.5, bold: true, h: 0.22 }); });
  const u = 2.3, v = img(u, f), ho = 0.75, hi = ho * v / u;
  objArrow(s, lx - u, ya, ho, C.ink); line(s, lx + v, ya, lx + v, ya + hi, '2E8B57', 3, { head: true });
  line(s, lx - u, ya - ho, lx, ya - ho, C.red, 1.5); line(s, lx, ya - ho, lx + v, ya + hi, C.red, 1.5);
  line(s, lx - u, ya - ho, lx + v, ya + hi, C.red, 1.5);
  label(s, lx + v - 0.2, ya + hi + 0.02, 1.2, 'real, inverted, smaller', { size: 9.5, bold: true, color: '2E8B57', h: 0.25, align: 'left' });
  // virtual
  const yb = 4.95, u2 = 0.6, v2 = img(u2, f), hi2 = ho * (-v2) / u2;
  line(s, 0.7, yb, 6.3, yb, C.grey, 1); lensConv(s, lx, yb, 1.5);
  [lx - f, lx + f].forEach(x => { ball(s, x, yb, 0.04, C.ink); label(s, x - 0.25, yb + 0.05, 0.5, 'F', { size: 9.5, bold: true, h: 0.22 }); });
  objArrow(s, lx - u2, yb, ho * 0.55, C.ink);
  const top = yb - ho * 0.55, Ih = ho * 0.55 * (-v2) / u2;
  line(s, lx - u2, top, lx, top, C.red, 1.5); line(s, lx, top, lx + f, yb, C.red, 1.5); line(s, lx + f, yb, lx + 1.6, yb + 0.6 * (ho * 0.55) / f, C.red, 1.5);
  line(s, lx - u2, top, lx + 0.9, top + (top - yb) * -1 * 0 + (yb - top) / u2 * (0.9 + u2), C.red, 1.5);
  line(s, lx + v2, yb - Ih, lx, top, '7B4FB8', 1, { dash: 'dash' }); line(s, lx + v2, yb - Ih, lx - u2, top, '7B4FB8', 1, { dash: 'dash' });
  line(s, lx + v2, yb, lx + v2, yb - Ih, '7B4FB8', 2.5, { head: true, dash: 'dash' });
  label(s, 0.6, yb - Ih - 0.3, 1.9, 'virtual, upright, magnified', { size: 9.5, bold: true, color: '7B4FB8', h: 0.25 });
  D.card(s, 6.8, 1.3, 6.08, 3.0, 'Real vs virtual', [
    'A **real** image is formed where light rays **actually meet**. It can be shown on a **screen** (cameras, projectors, the eye).',
    'A **virtual** image is where rays only **appear** to come from. It **cannot** be shown on a screen (magnifying glass, mirrors, diverging lenses).',
    'Converging lens: object **beyond F** → **real**, inverted image; object **inside F** → **virtual**, upright, magnified.',
  ], { size: 12 });
  D.workedSteps(s, 6.8, 4.45, 6.08, 1.8, 'Magnifying glass', 'Object 0.6 units from a lens with f = 1.0. The image is 1.5 units from the lens.', [['Magnification', 'image distance ÷ object distance = 1.5 ÷ 0.6'], ['Answer', '× 2.5, virtual and upright']], { size: 11.5 });
  D.quickCheck(s, 'A diverging lens always forms a **virtual** image. Explain why.');
  D.notes(s, 'QUICK CHECK ANSWER: the rays spread out after the lens and never meet (1); they only appear to come from a point on the same side as the object (1).\nSpec 5.6P (physics only). Image positions calculated with 1/u + 1/v = 1/f (extension only; not on the specification).');
  reg(s, '5.6P Real and virtual images (PHYSICS ONLY)');
}

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('5.3')}–${sp('5.6')} • colour and lenses`, [
  { q: 'Explain why a blue book looks blue in white light.', marks: 2, ms: 'Reflects blue wavelengths (1); absorbs all other colours (1).' },
  { q: 'A white card is viewed through a green filter. What colour does it look? Explain.', marks: 2, ms: 'Green (1); filter only transmits green light (absorbs the rest) (1).' },
  { q: 'Give **two** differences between a real image and a virtual image.', marks: 2, ms: 'Real: rays actually meet / virtual: rays only appear to meet (1); real can be projected on a screen / virtual cannot (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 14 EM WAVES =======================
reg(D.contentSlide({
  title: 'Electromagnetic waves',
  subtitle: `Specification ${sp('5.7')}–${sp('5.8')} • transverse waves that transfer energy`,
  tag: '5.7–5.8', caption: 'energy is transferred from the source to the observer',
  draw: (s, p) => {
    sunIconP(s, 1.4, 2.6, 0.5);
    for (let k = 0; k < 2; k++) { const y = 2.4 + k * 0.4; const pts = []; for (let i = 0; i <= 60; i++) { const x = 2.1 + 3.1 * i / 60; pts.push([x, y - 0.15 * Math.sin(2 * Math.PI * (x - 2.1) / 0.6)]); } polyline(s, pts, ['E39A2F', 'C8414C'][k], 2); }
    oval(s, 5.6, 2.6, 0.6, 0.6, '5B9BD5', '2F5F8F'); label(s, 5.1, 3.0, 1.2, 'Earth', { size: 10, h: 0.25 });
    label(s, 2.1, 1.75, 3.2, 'light and infrared: about **8 minutes** to reach us', { size: 10, h: 0.45 });
    line(s, 1.0, 4.0, 6.0, 4.0, C.grey, 1); const pts = []; for (let i = 0; i <= 80; i++) { const x = 1.0 + 5.0 * i / 80; pts.push([x, 4.0 - 0.45 * Math.sin(2 * Math.PI * (x - 1.0) / 1.6)]); } polyline(s, pts, C.blue, 2.5);
    arrow(s, 4.5, 4.75, 5.9, 4.75, C.ink, 2); label(s, 4.4, 4.8, 1.6, 'energy transfer', { size: 9.5, h: 0.25 });
    line(s, 1.4, 3.55, 1.4, 4.45, C.red, 2, { head: true, tail: true }); label(s, 1.5, 4.5, 1.8, 'oscillation at 90°', { size: 9.5, color: C.red, h: 0.25, align: 'left' });
  },
  head: 'Properties of all EM waves',
  lines: [
    'All electromagnetic waves are **transverse**.',
    'They all travel at the **same speed** in a **vacuum**: **3 × 10⁸ m/s** (the speed of light). They do **not** need a medium.',
    'They **transfer energy** from a **source** to an **observer** (absorber). Examples: the Sun warms the Earth (infrared); a microwave oven heats food; radio waves transfer energy to an aerial.',
  ],
  worked: { head: 'Calculation', q: 'Light travels 1.5 × 10¹¹ m from the Sun to the Earth. How long does it take?',
    steps: [['Equation', 't = x ÷ v'], ['Substitute', '1.5 × 10¹¹ ÷ 3 × 10⁸'], ['Answer', 't = 500 s (about 8 minutes)']], size: 11 },
  workedH: 1.75,
  qc: 'State **two** properties shared by **all** electromagnetic waves.',
  notes: 'QUICK CHECK ANSWER: any two: transverse; same speed in a vacuum / 3 × 10⁸ m/s; transfer energy; can travel through a vacuum (1 each).\nSpec 5.7–5.8.',
}), '5.7–5.8 EM waves');

// ======================= 15 EM SPECTRUM =======================
reg(D.contentSlide({
  title: 'The electromagnetic spectrum',
  subtitle: `Specification ${sp('5.10')}–${sp('5.12')} • a continuous spectrum`,
  tag: '5.10–5.12', caption: 'the seven groupings in order (not to scale)',
  draw: (s, p) => {
    spectrumBar(s, 0.75, 2.2, 5.5, 0.75);
    arrow(s, 5.9, 3.3, 0.9, 3.3, C.red, 2); label(s, 1.5, 3.35, 4.0, 'wavelength **increases** (radio ≈ km; gamma ≈ 10⁻¹² m)', { size: 10, color: C.red, h: 0.3 });
    arrow(s, 0.9, 3.85, 5.9, 3.85, C.blue, 2); label(s, 1.5, 3.9, 4.0, 'frequency and energy **increase**', { size: 10, color: C.blue, h: 0.3 });
    const pts = []; const N = 26, kk = 3; for (let i = 0; i <= 500; i++) { const u = i / 500, ph = 2 * Math.PI * N * (Math.exp(kk * u) - 1) / (Math.exp(kk) - 1); pts.push([0.9 + 5.2 * u, 4.75 - 0.3 * Math.sin(ph)]); }
    polyline(s, pts, '7B4FB8', 1.5);
    label(s, 0.75, 1.6, 5.5, '**R**abbits **M**ate **I**n **V**ery **U**nusual e**X**otic **G**ardens', { size: 11, h: 0.4 });
  },
  head: 'Key facts',
  lines: [
    'In order of **decreasing wavelength** (increasing frequency): **radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays**.',
    'Visible light: **red, orange, yellow, green, blue, indigo, violet** (red has the longest wavelength).',
    'The spectrum is **continuous**: the groups merge into each other.',
    'Our **eyes** can only detect a **limited range**: visible light, about 4 × 10⁻⁷ m to 7 × 10⁻⁷ m.',
  ],
  worked: { head: 'Order', q: 'Put in order of increasing frequency: X-rays, microwaves, visible, radio.',
    steps: [['Lowest', 'radio'], ['Then', 'microwaves, visible'], ['Highest', 'X-rays'], ['Answer', 'radio, microwaves, visible, X-rays']] },
  qc: 'Which part of the EM spectrum has the **longest** wavelength? Which has the **highest** frequency?',
  notes: 'QUICK CHECK ANSWER: radio waves (1); gamma rays (1).\nSpec 5.10–5.12 (5.12 number medium confidence).',
}), '5.10–5.12 EM spectrum');

// ======================= 16 EM CALCS =======================
{
  const s = D.contentHeader('Practice: v = f × λ for EM waves', `Specification ${sp('5.7')}, ${sp('5.10')} • c = 3 × 10⁸ m/s`, { tag: '5.7' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'Calculate the wavelength of **2.45 GHz** microwaves and of **6.0 × 10¹⁴ Hz** green light.',
    [['Convert', '2.45 GHz = 2.45 × 10⁹ Hz'], ['Microwave', 'λ = 3 × 10⁸ ÷ 2.45 × 10⁹ = **0.122 m**'], ['Light', 'λ = 3 × 10⁸ ÷ 6.0 × 10¹⁴ = **5.0 × 10⁻⁷ m**'], ['Answer', '12.2 cm; 500 nm']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A radio station broadcasts at **200 kHz**. Calculate the wavelength.',
    '**2** Microwaves have a wavelength of **3.0 cm**. Calculate the frequency.',
    '**3** Violet light has a frequency of **7.5 × 10¹⁴ Hz**. Calculate its wavelength.',
    '**4** An X-ray has a wavelength of **1.0 × 10⁻¹⁰ m**. Calculate its frequency.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'As the frequency of an EM wave **doubles**, what happens to its wavelength? Explain.');
  D.notes(s, 'YOUR TURN ANSWERS: 1) 1500 m. 2) 1.0 × 10¹⁰ Hz. 3) 4.0 × 10⁻⁷ m. 4) 3.0 × 10¹⁸ Hz.\nQUICK CHECK: it halves, because the speed (3 × 10⁸ m/s) is constant, so λ is inversely proportional to f.');
  reg(s, '5.7 Practice: EM calculations');
}

// ======================= 17 CP GLASS BLOCK =======================
reg(D.contentSlide({
  title: 'Core Practical: refraction in a glass block',
  subtitle: `Specification ${sp('5.9')} • tracing rays through a rectangular block`,
  tag: '5.9', cp: true, caption: 'ray box and rectangular glass block on paper',
  draw: (s, p) => {
    const bx = 2.0, by = 2.4, bw = 3.0, bh = 2.1, xh = 3.0, a = 40 * deg, r = Math.asin(Math.sin(a) / n);
    box(s, bx, by, bw, bh, 'DCEBFA', C.blueMid, { lw: 2 }); label(s, bx + 1.5, by + 1.6, 1.4, 'glass block', { size: 10, italic: true, h: 0.25 });
    const x1 = xh - 1.0 * Math.tan(a), x2 = xh + bh * Math.tan(r), x3 = x2 + 0.9 * Math.tan(a);
    ray(s, x1, by - 1.0, xh, by); ray(s, xh, by, x2, by + bh); ray(s, x2, by + bh, x3, by + bh + 0.9);
    normalLine(s, xh, by - 0.9, by + 1.0); normalLine(s, x2, by + bh - 1.0, by + bh + 0.85);
    label(s, xh - 0.6, by - 0.62, 0.5, 'i', { size: 13, bold: true, color: C.blue, h: 0.3 }); label(s, xh + 0.08, by + 0.3, 0.5, 'r', { size: 13, bold: true, color: '2E8B57', h: 0.3 });
    box(s, x1 - 0.55, by - 1.25, 0.5, 0.3, '555555', '333333', { rotate: 50 }); label(s, 0.55, 1.4, 1.2, 'ray box', { size: 10, bold: true, h: 0.25 });
    label(s, 3.9, 5.0, 2.4, 'emergent ray is **parallel** to the incident ray', { size: 9.5, h: 0.45 });
  },
  head: 'Method',
  lines: [
    'Draw round the block on paper. Shine a **narrow ray** from a ray box at the block.',
    'Mark the incident and emergent rays with **crosses**, remove the block, and join them up.',
    'Draw the **normal** where the ray enters; measure **i** and **r** with a **protractor**.',
    'Repeat for angles of incidence from 10° to 60°.',
    '**Safety:** ray box gets hot; work in a dim room carefully.',
  ],
  worked: { head: 'Explain (EM waves and matter)', q: 'Why does the ray bend at the boundary?',
    steps: [['Speed', 'light slows down in glass (≈ 2 × 10⁸ m/s)'], ['Wavefront', 'one side slows first'], ['Answer', 'ray bends towards the normal']], size: 11 },
  workedH: 1.75,
  qc: 'Why should the ray be **narrow**?',
  notes: 'QUICK CHECK ANSWER: so that its position and the angles can be measured accurately / easier to mark the centre of the ray (1).\nCP 5.9. Diagram drawn to scale with n = 1.5 and i = 40°, r = 25.4°.',
}), '5.9 CP: glass block');

// ======================= 18 CP RESULTS =======================
{
  const s = D.contentHeader('Core Practical: results and analysis', `Specification ${sp('5.9')} • angle of refraction against angle of incidence`, { tag: '5.9', cp: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'results for a glass block (calculated for n = 1.5)');
  const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.3, xmin: 0, xmax: 70, xstep: 10, ymin: 0, ymax: 40, ystep: 10, xlabel: 'Angle of incidence i (°)', ylabel: 'Angle of refraction r (°)', grid: true };
  axes(s, g); points(s, g, CP, C.red); fnLine(s, g, rOf, 0, 70, 60, C.blue, 2);
  const rows = [[HDR('i (°)'), ...CP.map(([i]) => HDR(String(i)))], [tcell('r (°)', 0, { bold: true }), ...CP.map(([, r]) => tcell(r.toFixed(1), 0))]];
  table(s, rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.1, ...Array(6).fill(4.98 / 6)], rowH: 0.42, fontSize: 12 });
  D.card(s, 6.8, 2.35, 6.08, 2.3, 'Analysis', [
    '**r is always smaller than i**: light bends towards the normal entering glass.',
    'The graph is a **curve**, not a straight line: r is not proportional to i.',
    'At **i = 0°** the ray passes straight through (no bending).',
  ], { size: 12 });
  D.card(s, 6.8, 4.8, 6.08, 1.45, 'Errors and improvements', ['Wide rays and thick pencil lines cause **random errors**: use a narrow slit, sharp pencil; repeat and average.'], { size: 11.5 });
  D.quickCheck(s, 'Use the table: what is the angle of refraction when i = **30°**?');
  D.notes(s, 'QUICK CHECK ANSWER: 19.5°.\nCP 5.9. Data calculated from n = 1.5 (asserted). Higher students may compare the shape with Snell’s law (not required).');
  reg(s, '5.9 CP: results');
}

// ======================= 19 MATERIALS & VELOCITY =======================
reg(D.contentSlide({
  title: 'EM waves in different materials',
  subtitle: `Specification ${sp('5.13')}–${sp('5.14')} • absorption, transmission and changes in velocity`,
  tag: '5.13–5.14', ht: true, caption: 'a wavefront slowing down as it enters glass at an angle',
  draw: (s, p) => {
    box(s, 3.5, 1.6, 2.75, 4.0, 'DCEBFA', C.blueMid, { lw: 1.5 }); label(s, 4.3, 1.65, 1.8, 'glass: slower', { size: 10.5, bold: true, h: 0.3 }); label(s, 0.9, 1.65, 1.8, 'air: faster', { size: 10.5, bold: true, h: 0.3 });
    const a = 40 * deg, r = Math.asin(Math.sin(a) / n), step = 0.6 / Math.sin(a);
    for (let yb = -0.6; yb < 8; yb += step) {
      const seg = (xa, xb, ang) => { const pts = []; for (let k = 0; k <= 50; k++) { const x = xa + (xb - xa) * k / 50, y = yb - (x - 3.5) * Math.cos(ang) / Math.sin(ang); if (y > 2.0 && y < 5.5) pts.push([x, y]); } if (pts.length > 1) line(s, pts[0][0], pts[0][1], pts[pts.length - 1][0], pts[pts.length - 1][1], C.blue, 2); };
      seg(0.8, 3.5, a); seg(3.5, 6.2, r);
    }
    arrow(s, 3.5 - 1.3 * Math.cos(a), 3.6 - 1.3 * Math.sin(a), 3.5, 3.6, C.red, 3); arrow(s, 3.5, 3.6, 3.5 + 1.4 * Math.cos(r), 3.6 + 1.4 * Math.sin(r), C.red, 3);
    line(s, 2.2, 3.6, 5.9, 3.6, C.grey, 1, { dash: 'dash' });
  },
  head: 'Key ideas',
  lines: [
    'Different substances **absorb, transmit, refract or reflect** EM waves in ways that **vary with wavelength** (e.g. glass transmits visible light but absorbs UV; skin absorbs UV; bone absorbs X-rays).',
    '**HT:** EM waves travel at **different velocities** in different substances (slower in glass and water than in air).',
    '**HT:** when a wave enters a slower medium at an angle, one side of each wavefront slows first, so the wave **changes direction**: **refraction**. Its **wavelength decreases**; **frequency is unchanged**.',
  ],
  worked: { head: 'HT calculation', q: 'Light of frequency 5.0 × 10¹⁴ Hz travels at 2.0 × 10⁸ m/s in glass. Calculate its wavelength in glass.',
    steps: [['Equation', 'λ = v ÷ f'], ['Substitute', '2.0 × 10⁸ ÷ 5.0 × 10¹⁴'], ['Answer', 'λ = 4.0 × 10⁻⁷ m (shorter than in air)']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why light changes direction when it enters glass at an angle.',
  notes: 'QUICK CHECK ANSWER: light slows down in glass (1); one side of the wavefront slows before the other / enters first (1); so the wavefront turns, changing direction (1).\nSpec 5.13–5.14 (5.14 HT, medium-low confidence).',
}), '5.13–5.14 Materials and velocity (HT)');

// ======================= 20 RECAP 3 =======================
const R3 = D.recapSlide(3, '5.7–5.14 • EM waves, spectrum and the glass block', [
  { q: 'List the EM spectrum in order of increasing frequency.', marks: 2, ms: 'Radio, microwave, infrared, visible, ultraviolet, X-ray, gamma (2 for all correct; 1 for one error).' },
  { q: 'Radio waves travel at 3 × 10⁸ m/s and have a wavelength of 1500 m. Calculate their frequency.', marks: 2, ms: 'f = 3 × 10⁸ ÷ 1500 (1); = 2 × 10⁵ Hz / 200 kHz (1).' },
  { q: 'In the glass block practical, explain why the normal is drawn.', marks: 1, ms: 'Angles of incidence and refraction are measured from the normal (1).' },
  { q: 'Explain what happens to the wavelength of light as it enters glass.', marks: 2, ht: true, ms: 'Speed decreases, frequency unchanged (1); so wavelength decreases (v = f λ) (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 21 BODIES EMIT RADIATION (P) =======================
reg(D.contentSlide({
  title: 'All bodies emit radiation',
  subtitle: `Specification ${sp('5.15')} • intensity and wavelength depend on temperature`,
  tag: sp('5.15'), p: true, caption: 'radiation emitted by bodies at three temperatures (relative units)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.3, xmin: 0, xmax: 3, xstep: 0.5, ymin: 0, ymax: 1.05, ystep: 0.25, xlabel: 'Wavelength (μm)', ylabel: 'Intensity', fmt: v => (+v.toFixed(1)).toString(), yfmt: () => '' };
    axes(s, g);
    box(s, px(g, 0.4), g.y, px(g, 0.7) - px(g, 0.4), g.h, 'FFF4B0', null, { tr: 30 }); label(s, px(g, 0.4) - 0.2, g.y + 0.05, px(g, 0.7) - px(g, 0.4) + 0.4, 'visible', { size: 9, h: 0.22 });
    [[5000, C.red], [4000, 'E39A2F'], [3000, C.blue]].forEach(([Tk, col]) => { fnLine(s, g, lam => planck(Math.max(lam, 0.05), Tk) / PK, 0.1, 3, 120, col, 2.5); const pk = 2898 / Tk; label(s, px(g, pk) + 0.05, py(g, planck(pk, Tk) / PK) - 0.3, 1.0, `${Tk} K`, { size: 10, bold: true, color: col, align: 'left', h: 0.25 }); });
  },
  head: 'Key ideas',
  lines: [
    '**All** objects emit and absorb **infrared** radiation, whatever their temperature.',
    'The **hotter** an object, the **more** radiation it emits each second (greater **intensity**).',
    'Hotter objects emit a greater proportion at **shorter wavelengths**: the peak moves towards visible light. A very hot object glows **red**, then **white**.',
  ],
  worked: { head: 'Read the graph', q: 'Compare the 5000 K and 3000 K curves.',
    steps: [['Height', '5000 K emits much more at every wavelength'], ['Peak', 'peak at a shorter wavelength'], ['Visible', 'more of its output is visible light'], ['Answer', 'hotter → brighter and bluer']] },
  qc: 'Explain why a heated metal rod first glows **red** and then **yellow-white** as it gets hotter.',
  notes: 'QUICK CHECK ANSWER: as temperature rises, more radiation is emitted (1); and the peak moves to shorter wavelengths, so more visible light of shorter wavelength (1).\nSpec 5.15P (physics only). Curves follow Planck’s law shape (relative units, asserted peaks).',
}), '5.15P Thermal radiation (PHYSICS ONLY)');

// ======================= 22 BALANCE & EARTH (P) =======================
reg(D.contentSlide({
  title: 'Radiation balance and the Earth’s temperature',
  subtitle: `Specification ${sp('5.16')}–${sp('5.18')} • power absorbed and power radiated`,
  tag: `${sp('5.16')}–${sp('5.18')}`, p: true, caption: 'energy flows for the Earth (simplified)',
  draw: (s, p) => {
    sunIconP(s, 1.1, 2.0, 0.42);
    ball(s, 3.9, 3.8, 1.1, '5B9BD5', '2F5F8F', 2); oval(s, 3.9, 3.8, 2.9, 2.9, null, '9FD3F0', { lw: 3, dash: 'dash' });
    label(s, 3.0, 5.3, 1.8, 'atmosphere', { size: 10, italic: true, color: '2F7FB0', h: 0.25 });
    arrow(s, 1.5, 2.3, 3.2, 3.2, 'E39A2F', 3); label(s, 0.55, 3.15, 1.3, 'incoming (mostly visible)', { size: 9.5, color: 'B8730A', h: 0.45 });
    arrow(s, 4.7, 3.1, 5.9, 2.0, C.red, 3); label(s, 4.9, 1.6, 1.4, 'emitted infrared', { size: 9.5, color: C.red, h: 0.3 });
    arrow(s, 4.85, 3.2, 5.05, 3.0, C.red, 1.5); arrow(s, 5.15, 2.9, 4.75, 3.35, C.red, 1.5, { dash: 'dash' });
    label(s, 5.4, 3.5, 1.05, 'some absorbed and re-emitted by greenhouse gases', { size: 9, h: 0.9, align: 'left', valign: 'top' });
  },
  head: 'Key ideas',
  lines: [
    '**Constant temperature:** a body must **radiate** the **same average power** as it **absorbs**.',
    'If it **absorbs more** than it radiates, its temperature **rises**; if it **radiates more**, it **cools** (until a new balance is reached).',
    '**The Earth:** absorbs radiation from the Sun (mostly visible and UV) and radiates **infrared** into space.',
    'Factors: **greenhouse gases** (CO₂, methane, water vapour) absorb outgoing infrared and re-emit some back, so less escapes and the temperature **rises**. **Clouds, ice and snow** reflect incoming radiation (cooling).',
  ],
  worked: { head: 'Explain', q: 'The Earth absorbs 240 W/m² but now radiates only 238 W/m². Predict and explain.',
    steps: [['Compare', 'absorbs 2 W/m² more than it radiates'], ['Effect', 'net energy gain'], ['Result', 'temperature rises'], ['Answer', 'until radiated power rises to match']] },
  qc: 'Explain why a cup of hot tea stops cooling when it reaches room temperature.',
  notes: 'QUICK CHECK ANSWER: it then absorbs radiation from the surroundings at the same rate as it emits (1); no net energy transfer so temperature is constant (1).\nSpec 5.16P–5.18P (physics only; numbers medium confidence).',
}), '5.16P–5.18P Radiation balance (PHYSICS ONLY)');

// ======================= 23 CP SURFACES (P) =======================
reg(D.contentSlide({
  title: 'Core Practical: surfaces and thermal radiation',
  subtitle: `Specification ${sp('5.19')} • Leslie cube`,
  tag: sp('5.19'), p: true, cp: true, caption: 'a Leslie cube filled with hot water; an infrared detector measures each face',
  draw: (s, p) => {
    const x0 = 1.4, y0 = 2.3, a = 1.8, d = 0.6;
    poly(s, [[x0, y0], [x0 + d, y0 - d], [x0 + a + d, y0 - d], [x0 + a, y0]], 'C9C9C9', '555555', { lw: 1.25 });
    box(s, x0, y0, a, a, '111111', '555555', { lw: 1.25 }); label(s, x0, y0 + a / 2 - 0.15, a, 'matt black', { size: 10.5, bold: true, color: C.white, h: 0.3 });
    poly(s, [[x0 + a, y0], [x0 + a + d, y0 - d], [x0 + a + d, y0 + a - d], [x0 + a, y0 + a]], 'D9DDE3', '555555', { lw: 1.25 });
    label(s, x0 + a + 0.02, y0 + 0.5, d, 'shiny', { size: 9, bold: true, h: 0.25 });
    line(s, x0 + a / 2 + 0.2, y0 - d / 2, x0 + a / 2 + 0.2, y0 - 1.0, C.red, 3); label(s, x0 + a / 2 - 0.2, y0 - 1.25, 1.4, 'thermometer', { size: 9.5, h: 0.25, align: 'left' });
    box(s, 4.4, 2.9, 0.9, 0.55, '555555', '333333', { shape: SH.ROUNDED_RECTANGLE, r: 0.1 }); box(s, 4.45, 2.95, 0.55, 0.45, 'D6EAF8', null); label(s, 4.2, 3.5, 1.4, 'IR detector', { size: 10, bold: true, h: 0.25 });
    arrow(s, 3.95, 3.15, 4.38, 3.15, C.red, 2);
    line(s, 3.9, 3.85, 4.4, 3.85, C.ink, 1.25, { head: true, tail: true }); label(s, 3.7, 3.9, 1.0, 'same distance', { size: 9, h: 0.3 });
    const rows = [[HDR('Surface'), HDR('Reading')], ...LES.map(([t, v], i) => [tcell(t, i, { bold: true }), tcell(v.toFixed(1), i)])];
    table(s, rows, { x: 0.9, y: 4.45, w: 5.2, colW: [3.0, 2.2], rowH: 0.23, fontSize: 10 });
  },
  head: 'Method and results',
  lines: [
    'Fill a **Leslie cube** with **hot water** from a kettle; its four faces have different surfaces.',
    'Hold an **infrared detector** (or thermometer with blackened bulb) the **same distance** from each face; record the reading.',
    '**Results:** matt black emits most; shiny silver emits least. **Good emitters are also good absorbers.**',
    '**Absorption version:** place two metal plates (matt black, shiny) at equal distances from a heater; wax and a drawing pin on the back: the pin on the black plate drops first.',
    '**Safety:** hot water: stand the cube on a heat-proof mat; do not touch the faces.',
  ],
  worked: { head: 'Conclusion', q: 'Which surface is best for a car radiator?', steps: [['Best emitter', 'matt black'], ['Answer', 'matt black radiates most energy']], size: 11 },
  workedH: 1.4,
  qc: 'Why must the detector be the **same distance** from each face?',
  notes: 'QUICK CHECK ANSWER: the amount of radiation detected depends on distance, so it must be controlled for a fair comparison (1).\nCP 5.19P (physics only; confirmed by Cognito). Readings are illustrative.',
}), '5.19P CP: surfaces (PHYSICS ONLY)');

// ======================= 24 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('5.15')}–${sp('5.19')} • thermal radiation`, [
  { q: 'Describe how the radiation emitted by a body changes as its temperature increases.', marks: 2, ms: 'More radiation / higher intensity emitted (1); peak at shorter wavelength (1).' },
  { q: 'State the condition for a body to stay at a constant temperature.', marks: 1, ms: 'Radiates the same average power as it absorbs (1).' },
  { q: 'Explain how greenhouse gases affect the temperature of the Earth.', marks: 2, ms: 'Absorb (and re-emit) infrared radiated by the Earth (1); less energy escapes to space so temperature rises (1).' },
  { q: 'Give **two** control variables in the Leslie cube experiment.', marks: 2, ms: 'Any two: distance from detector to face; temperature of water / same time after filling; same detector; surroundings (1 each).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 25 DANGERS =======================
reg(D.contentSlide({
  title: 'Dangers of EM radiation',
  subtitle: `Specification ${sp('5.20')}–${sp('5.21')} • danger increases with frequency`,
  tag: '5.20–5.21', caption: 'higher frequency = more energy = more dangerous',
  draw: (s, p) => {
    spectrumBar(s, 0.75, 1.65, 5.5, 0.6);
    const g0 = 0.75, cw = 5.5 / 7;
    const hz = [0.2, 0.45, 0.8, 0.6, 1.4, 2.2, 2.8];
    hz.forEach((h0, i) => { const h = h0 * 0.8; box(s, g0 + i * cw + 0.12, 5.0 - h, cw - 0.24, h, i < 4 ? 'F5C26B' : C.red, null); });
    label(s, 0.75, 5.05, 5.5, 'potential danger (illustrative)', { size: 10, italic: true, h: 0.25 });
    label(s, 0.9, 2.45, 2.6, '**ionising**: UV, X-rays, gamma', { size: 10, color: C.red, h: 0.3 });
  },
  head: 'Harmful effects of excessive exposure',
  lines: [
    'The potential **danger increases with frequency** (higher frequency waves carry more energy).',
    '**Microwaves:** **internal heating** of body tissue.',
    '**Infrared:** **skin burns**.',
    '**Ultraviolet:** damage to **surface cells** and **eyes**: sunburn, **skin cancer**, **eye conditions** (cataracts).',
    '**X-rays and gamma rays:** **ionising**: cause **mutation** or **damage to cells** (cancer).',
  ],
  worked: { head: 'Protection', q: 'How can people reduce the risk from each?',
    steps: [['UV', 'sunscreen, sunglasses, clothing'], ['X-rays', 'lead aprons; radiographers stand behind screens'], ['Gamma', 'limit exposure time; shielding'], ['Answer', 'reduce dose and time']] },
  qc: 'Why are gamma rays more dangerous than radio waves?',
  notes: 'QUICK CHECK ANSWER: gamma rays have a much higher frequency / more energy (1); they are ionising and can damage cells or cause mutations / cancer (1).\nSpec 5.20–5.21 (numbers medium confidence). Bar heights illustrative.',
}), '5.20–5.21 Dangers');

// ======================= 26 USES =======================
{
  const s = D.contentHeader('Uses of EM radiation', `Specification ${sp('5.22')} • from radio to gamma`, { tag: '5.22' });
  const rows = [[HDR('Wave'), HDR('Uses')], ...[
    ['Radio waves', 'broadcasting (TV, radio); communications; satellite transmissions'],
    ['Microwaves', 'cooking; communications (mobile phones); satellite transmissions'],
    ['Infrared', 'cooking; thermal imaging; short-range communications; optical fibres; TV remote controls; security systems'],
    ['Visible light', 'vision; photography; illumination'],
    ['Ultraviolet', 'security marking; fluorescent lamps; detecting forged bank notes; disinfecting water'],
    ['X-rays', 'observing internal structure (medical X-rays); airport security scanners'],
    ['Gamma rays', 'sterilising food and medical equipment; detecting and treating cancer'],
  ].map(([a, b], i) => [tcell(a, i, { bold: true, color: C.blue }), tcell(b, i)])];
  table(s, rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.2, 10.23], rowH: 0.52, fontSize: 12 });
  D.workedSteps(s, 0.45, 5.6, 12.43, 0.68, 'Link', '', [['Why', 'each use matches a property: e.g. X-rays pass through soft tissue but are absorbed by bone']], { size: 12 });
  D.quickCheck(s, 'Give **one** use of **infrared** and **one** use of **gamma rays**.');
  D.notes(s, 'QUICK CHECK ANSWER: infrared: any one of cooking, thermal imaging, remote controls, optical fibres, security (1); gamma: sterilising / cancer treatment or detection (1).\nSpec 5.22 (number medium confidence).');
  reg(s, '5.22 Uses of EM radiation');
}

// ======================= 27 PRODUCING EM WAVES =======================
reg(D.contentSlide({
  title: 'How EM waves are produced and absorbed',
  subtitle: `Specification ${sp('5.23')}–${sp('5.24')} • circuits, atoms and nuclei`,
  tag: '5.23–5.24', ht: true, caption: 'a transmitter and a receiver aerial',
  draw: (s, p) => {
    line(s, 1.3, 2.0, 1.3, 4.6, C.ink, 4); box(s, 0.9, 4.6, 0.8, 0.5, 'D6EAF8', C.ink); label(s, 0.7, 5.15, 1.2, 'a.c. source', { size: 10, h: 0.25 });
    for (let k = 0; k < 3; k++) s.addShape(SH.ARC, { x: 1.3 + k * 0.6 - 0.5, y: 2.6 - k * 0.3, w: 1.0 + k * 0.4, h: 1.2 + k * 0.6, angleRange: [300, 60], line: { color: C.blue, width: 1.75 } });
    line(s, 5.6, 2.0, 5.6, 4.6, C.ink, 4); box(s, 5.2, 4.6, 0.8, 0.5, 'FFF4E0', C.ink); label(s, 5.0, 5.15, 1.2, 'receiver', { size: 10, h: 0.25 });
    arrow(s, 3.2, 3.3, 5.4, 3.3, C.blue, 2); label(s, 3.0, 2.85, 2.4, 'radio waves', { size: 10.5, color: C.blue, h: 0.3 });
    label(s, 0.6, 1.55, 2.0, 'electrons oscillate', { size: 9.5, h: 0.3 }); label(s, 4.6, 1.55, 2.0, 'induced oscillation', { size: 9.5, h: 0.3 });
  },
  head: 'Key ideas',
  lines: [
    '**HT:** **radio waves** are produced when **electrons oscillate** in an electrical circuit (an aerial connected to an alternating current).',
    '**HT:** when radio waves are absorbed by a receiving aerial, they **induce** an **alternating current** with the **same frequency**: this carries the signal.',
    '**Changes in atoms** (electrons moving between energy levels) emit and absorb **visible**, **UV** and **X-ray** radiation.',
    '**Changes in nuclei** emit **gamma rays** (Topic 6).',
  ],
  worked: { head: 'Explain', q: 'How does a radio receive a station broadcasting at 100 MHz?',
    steps: [['Wave', '100 MHz radio waves reach the aerial'], ['Induce', 'electrons in the aerial oscillate'], ['Current', 'a.c. at 100 MHz induced'], ['Answer', 'circuit decodes the signal']] },
  qc: 'Which part of the EM spectrum is produced by changes in the **nucleus**?',
  notes: 'QUICK CHECK ANSWER: gamma rays (1).\nSpec 5.23 (HT, medium-low confidence) and 5.24.',
}), '5.23–5.24 Producing EM waves (HT)');

// ======================= 28 RECAP 5 =======================
const R5 = D.recapSlide(5, '5.20–5.24 • dangers, uses and production', [
  { q: 'Describe the harmful effect of excessive exposure to ultraviolet.', marks: 2, ms: 'Damage to surface cells / sunburn / skin cancer (1); damage to eyes / eye conditions (1).' },
  { q: 'Give **one** use of X-rays and explain why they are suitable.', marks: 2, ms: 'Medical images / airport scanners (1); pass through soft tissue / bags but are absorbed by bone / dense materials (1).' },
  { q: 'Explain why microwaves are used for satellite communication.', marks: 1, ms: 'Pass through the atmosphere (without being absorbed or reflected) (1).' },
  { q: 'Describe how radio waves are received by an aerial.', marks: 2, ht: true, ms: 'Radio waves absorbed by the aerial (1); induce an alternating current / electron oscillations at the same frequency (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 29 EQUATIONS =======================
reg(D.equationsSlide([['vfl', '5.7 (Topic 4.6)'], ['vxt', 'Topic 4.6']], {
  subtitle: 'Topic 5 equations • RECALL = learn it; c = 3 × 10⁸ m/s is given in the question',
  qc: 'Rearrange v = f × λ for f and for λ. Then calculate the frequency of light with λ = 6 × 10⁻⁷ m.',
  notes: 'QUICK CHECK: f = v ÷ λ; λ = v ÷ f. f = 3 × 10⁸ ÷ 6 × 10⁻⁷ = 5 × 10¹⁴ Hz.',
}), 'Summary: equations');

// ======================= 30 KEY WORDS =======================
reg(D.keyWords([
  ['Normal', 'Line at 90° to a surface where a ray hits.'],
  ['Law of reflection', 'Angle of incidence = angle of reflection.'],
  ['Specular', 'Reflection from a smooth surface: rays stay parallel.'],
  ['Diffuse', 'Reflection from a rough surface: rays scatter.'],
  ['Refraction', 'Change in direction due to a change in speed.'],
  ['Critical angle', 'Angle of incidence where the refracted ray runs along the boundary.'],
  ['TIR', 'All light reflected inside when i > critical angle.'],
  ['Filter', 'Transmits one colour and absorbs the rest.'],
  ['Converging lens', 'Brings parallel rays together at the focus.'],
  ['Virtual image', 'Rays only appear to meet; cannot be projected.'],
  ['EM spectrum', 'Radio, micro, IR, visible, UV, X-ray, gamma.'],
  ['Transverse', 'Oscillations at 90° to energy transfer: all EM waves.'],
  ['Ionising', 'Can damage cells and cause mutations: UV, X, gamma.'],
  ['Emitter', 'Surface that radiates infrared; matt black is best.'],
  ['Greenhouse gas', 'Absorbs infrared from the Earth: CO₂, methane.'],
  ['Leslie cube', 'Cube with different surfaces for testing emission.'],
], { notes: 'Cover-and-recall. Physics-only terms: specular, diffuse, critical angle, TIR, filter, lenses, emitter, Leslie cube.' }), 'Summary: key words');

// ======================= 31 FULL QUESTION =======================
reg(D.fullQuestion('Ultraviolet radiation from the Sun reaches the Earth. Some is absorbed by the atmosphere.', [
  { l: 'a', q: 'Name the part of the EM spectrum with a slightly longer wavelength than ultraviolet.', marks: 1, ms: 'Visible light (violet) (1).' },
  { l: 'b', q: 'UV has a frequency of 1.2 × 10¹⁵ Hz. Calculate its wavelength. (speed = 3 × 10⁸ m/s)', marks: 3, ms: 'λ = v ÷ f (1); 3 × 10⁸ ÷ 1.2 × 10¹⁵ (1); = 2.5 × 10⁻⁷ m (1).' },
  { l: 'c', q: 'Describe **two** harmful effects of excessive exposure to UV.', marks: 2, ms: 'Skin damage / sunburn / skin cancer (1); eye damage / cataracts (1).' },
  { l: 'd', q: 'Give **one** use of UV.', marks: 1, ms: 'Security marking / detecting forged notes / fluorescent lamps / disinfecting water (1).' },
  { l: 'e', q: 'A GPS signal travels 3.6 × 10⁷ m from a satellite. Calculate the time taken.', marks: 2, ms: 't = 3.6 × 10⁷ ÷ 3 × 10⁸ (1); = 0.12 s (1).' },
  { l: 'f', q: 'In the glass block practical, describe how to measure the angle of refraction accurately.', marks: 4, ms: 'Narrow ray; mark the ray with crosses far apart (1); draw the normal at 90° at the point of entry (1); join entry and exit points to show the ray in the block (1); measure from the normal with a protractor; repeat (1).', h: 1.3 },
], 13, { subtitle: 'Specification 5.7, 5.9–5.11, 5.21–5.22 • answer every part • 13 marks' }), 'Full question');

// ======================= 32–33 HOMEWORK =======================
const HW = [
  { n: '1', q: 'State the speed of all EM waves in a vacuum.', marks: 1, ms: '3 × 10⁸ m/s (1).' },
  { n: '2', q: 'Radio waves have a wavelength of **0.5 m**. Calculate their frequency.', marks: 2, ms: 'f = 3 × 10⁸ ÷ 0.5 (1); = 6 × 10⁸ Hz (1).' },
  { n: '3', q: 'Explain why a red rose looks black in blue light.', marks: 2, ms: 'Only blue light reaches the rose (1); red petals absorb blue / reflect only red, so no light is reflected (1).' },
  { n: '4', q: 'Describe what is meant by total internal reflection and give the conditions needed.', marks: 3, ms: 'All light reflected back at the boundary (1); light going from denser / slower to less dense / faster medium (1); angle of incidence greater than the critical angle (1).' },
  { n: '5', q: 'Explain how the temperature of the Earth depends on the balance between incoming and outgoing radiation.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'The Earth absorbs radiation from the Sun (mostly visible and UV).',
    'The Earth emits infrared radiation into space.',
    'If the power absorbed equals the power radiated, the temperature stays constant.',
    'If more is absorbed than radiated, the temperature rises; if less, it falls.',
    'Greenhouse gases (CO₂, methane, water vapour) absorb infrared emitted by the Earth and re-emit some back.',
    'Increasing greenhouse gases means less infrared escapes, so the temperature rises (global warming).',
    'Clouds, ice and snow reflect incoming radiation; melting ice reduces reflection, increasing absorption.',
  ], 'Physics-only question (5.16P–5.18P). Level 3 answers link the balance of power in and out to temperature change, with factors.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 14);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 6); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7);
assert(D.slideNo >= 30 && D.slideNo <= 38, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T5_LightEM.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
function sunIconP(s, cx, cy, r) {
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; line(s, cx + Math.cos(a) * r * 1.2, cy + Math.sin(a) * r * 1.2, cx + Math.cos(a) * r * 1.7, cy + Math.sin(a) * r * 1.7, 'E39A2F', 2.5); }
  s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: 'F5C342' }, line: { color: 'E39A2F', width: 1 } });
}
