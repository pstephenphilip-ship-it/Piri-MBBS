// build_T4.js — Edexcel GCSE Physics 1PH0 Topic 4 Waves (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T4.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 4,
  title: 'Waves',
  shortTitle: 'T4',
  subtitle: 'Wave properties, the wave equation, echoes, refraction, sound and hearing',
  specRange: '4.1–4.17',
  pOnly: ['4.8', '4.9', '4.12', '4.13', '4.14', '4.15', '4.16'],
  paper: 'Paper 1',
  keywords: ['Transverse', 'Longitudinal', 'v = f × λ', 'Echoes', 'Refraction', 'Ultrasound'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

Object.assign(T.EQS, {
  vfl: { eq: 'v = f × λ', words: 'wave speed (m/s) = frequency (Hz) × wavelength (m)', status: 'recall' },
  vxt: { eq: 'v = x ÷ t', words: 'wave speed (m/s) = distance (m) ÷ time (s)', status: 'recall' },
});

// ======================= CALCULATIONS (asserted) =======================
calc('v = 50 × 6.8', 50 * 6.8, 340, 1e-9);
calc('ripple 5 × 0.04', 5 * 0.04, 0.2, 1e-12);
calc('radio 100 MHz × 3 m', 100e6 * 3, 3e8, 1);
calc('YT λ = 330 / 256 (3 s.f.)', sf(330 / 256, 3), 1.29, 1e-12);
calc('YT f = 0.15 / 0.025', 0.15 / 0.025, 6, 1e-9);
calc('YT 2 kHz × 0.17 m', 2000 * 0.17, 340, 1e-9);
calc('YT 4: λ for 1500 m/s at 50 kHz', 1500 / 50000, 0.03, 1e-12);
calc('v = 680 / 2', 680 / 2, 340, 1e-12);
calc('period 1/50', 1 / 50, 0.02, 1e-12);
calc('period 1/0.5 Hz', 1 / 0.5, 2, 1e-12);
calc('echo 2 × 85 / 0.5', 2 * 85 / 0.5, 340, 1e-9);
calc('thunder 340 × 3', 340 * 3, 1020, 1e-9);
calc('two-mic 100 m / 0.29 s (3 s.f.)', sf(100 / 0.29, 3), 345, 1e-9);
// Core Practical
calc('CP ripple f = 10 / 5', 10 / 5, 2, 1e-12);
calc('CP ripple λ = 0.30 / 10', 0.30 / 10, 0.03, 1e-12);
calc('CP ripple v = 2 × 0.03', 2 * 0.03, 0.06, 1e-12);
calc('CP rod λ = 2 × 0.80', 2 * 0.80, 1.6, 1e-12);
calc('CP rod v = 2500 × 1.6', 2500 * 1.6, 4000, 1e-9);
calc('CP YT rod 1.20 m, 2100 Hz', 2100 * 2 * 1.2, 5040, 1e-9);
calc('CP YT ripple 15 waves in 10 s; 12 λ in 0.36 m', (15 / 10) * (0.36 / 12), 0.045, 1e-12);
// echoes
calc('sonar depth 1500 × 0.4 / 2', 1500 * 0.4 / 2, 300, 1e-9);
calc('YT sonar 1500 × 0.12 / 2', 1500 * 0.12 / 2, 90, 1e-9);
calc('YT bat 340 × 0.02 / 2', 340 * 0.02 / 2, 3.4, 1e-12);
calc('foetal 1500 × 1.2e-4 / 2 (m)', 1500 * 1.2e-4 / 2, 0.09, 1e-12);
calc('YT time for 450 m depth', 2 * 450 / 1500, 0.6, 1e-12);
// hearing
calc('λ at 20 Hz', 340 / 20, 17, 1e-12);
calc('λ at 20 000 Hz', 340 / 20000, 0.017, 1e-12);
calc('ultrasound λ 2 MHz in tissue (mm)', 1500 / 2e6 * 1000, 0.75, 1e-12);
// medium change
calc('air λ 330 / 500', 330 / 500, 0.66, 1e-12);
calc('water λ 1500 / 500', 1500 / 500, 3, 1e-12);
calc('steel λ 5000 / 500', 5000 / 500, 10, 1e-12);
// seismic
calc('P time 420 / 6', 420 / 6, 70, 1e-12);
calc('S time 420 / 3.5', 420 / 3.5, 120, 1e-12);
calc('lag', 120 - 70, 50, 1e-12);
// recaps / FQ / HW
calc('R2 v = 0.5 × 0.6', 0.5 * 0.6, 0.3, 1e-12);
calc('R2 λ = 340 / 850', 340 / 850, 0.4, 1e-12);
calc('R4 depth 1500 × 0.8 / 2', 1500 * 0.8 / 2, 600, 1e-9);
calc('FQ v = 4 × 0.025', 4 * 0.025, 0.1, 1e-12);
calc('FQ λ = 1500 / 30000', 1500 / 30000, 0.05, 1e-12);
calc('FQ depth 1500 × 0.06 / 2', 1500 * 0.06 / 2, 45, 1e-9);
calc('HW v = 440 × 0.75', 440 * 0.75, 330, 1e-9);
calc('HW distance 340 × 1.5 / 2', 340 * 1.5 / 2, 255, 1e-9);

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

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Waves',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • Core Practical 4.17 (waves in a solid and a fluid)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT and PHYSICS ONLY slides are marked' },
    { icon: '4', text: 'Topic 4 of 15 • assessed on Paper 1' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 4 Waves. Paper 1. Physics only (P): 4.8P, 4.9P, 4.12P–4.16P. Higher only (HT pill): 4.16P (medium-low confidence). Core Practical 4.17 (both courses). Equations: v = f × λ and v = x ÷ t, both RECALL. See SPEC_T4.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '4.1–4.2', text: 'Recall that waves transfer **energy and information**, not **matter**; describe the evidence.' },
  { code: '4.3–4.5', text: 'Use **frequency, wavelength, amplitude, period, wavefront**; compare **transverse** and **longitudinal** waves.' },
  { code: '4.6–4.7', text: 'Use **v = f × λ** and **v = x ÷ t**; describe how to measure the speed of **sound** and **ripples**.' },
  { code: '4.17', text: '**Core Practical:** measure the speed, frequency and wavelength of waves in a **solid** and a **fluid**.' },
  { code: `${sp('4.8')}–${sp('4.9')}`, text: 'Calculate **depth or distance** from echoes; describe **reflection, refraction, transmission, absorption**.' },
  { code: '4.10–4.11', text: 'Explain **refraction** by a change of **speed and direction**; how effects depend on **wavelength**.' },
  { code: `${sp('4.12')}–${sp('4.15')}`, text: 'Explain **hearing**, **ultrasound** and **infrasound** and their uses.' },
  { code: sp('4.16'), text: 'Explain how **speed, frequency and wavelength** change when sound enters a new medium.', ht: true },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'P = physics only (not in Combined Science 1SC0): 4.8P, 4.9P, 4.12P–4.16P. HT = 4.16P (medium-low confidence).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 4 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['4.1–4.5', 'What waves are; wave terms; transverse and longitudinal', 'BOTH COURSES', C.grey],
    ['4.6–4.7', 'Wave equations; measuring wave speeds', 'BOTH COURSES', C.grey],
    ['4.17', 'Core Practical: waves in a solid and a fluid', 'CORE PRACTICAL', C.orange],
    [`${sp('4.8')}–${sp('4.9')}`, 'Echoes; reflection, refraction, transmission, absorption', 'PHYSICS ONLY', C.blue],
    ['4.10–4.11', 'Refraction: speed and direction; wavelength effects', 'BOTH COURSES', C.grey],
    [`${sp('4.12')}–${sp('4.15')}`, 'Hearing; ultrasound, infrasound and their uses', 'PHYSICS ONLY', C.blue],
    [sp('4.16'), 'Sound entering a new medium (HT)', 'PHYSICS ONLY', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 4\nWaves', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 10.5, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.35);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 5 light and the electromagnetic spectrum • Topic 2 speed = distance ÷ time', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–7.',
      'Combined Science 1SC0 tests the statements **without** a P.',
      '**Recall** both wave equations: **v = f × λ** and **v = x ÷ t**.',
      '**Core Practical 4.17**: waves in a solid and a fluid.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Partly physics-only:** 4.8P, 4.9P and 4.12P–4.16P (echoes, interfaces, hearing, ultrasound, infrasound). Combined classes skip those.',
      '**HT** pill: sound entering a new medium (4.16P).',
      'Foundation students meet all other content.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Physics-only (P): 4.8P, 4.9P, 4.12P–4.16P (search listings confirmed 4.8P, 4.9P, 4.12P–4.15P; 4.16P from memory). Combined Science route: skip slides 17, 18, 21 Q3 and 22–26. Higher only: 4.16P (medium-low confidence; check the bold H in the Pearson PDF). Core Practical 4.17 is in both courses.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 2 • speed', q: 'A runner covers **400 m** in **80 s**. Calculate the average speed.' },
  { from: 'Topic 1 • units', q: 'Convert **2.5 kHz** into Hz and **3 cm** into m.' },
  { from: 'Topic 1 • rearranging', q: 'Rearrange **v = x ÷ t** to make **x** the subject.' },
  { from: 'KS3 • sound', q: 'Why can sound **not** travel through a vacuum?' },
  { from: 'KS3 • light', q: 'Which travels faster, **light** or **sound**? How do we know from a thunderstorm?' },
  { from: 'Topic 1 • standard form', q: 'Write **300 000 000 m/s** in standard form.' },
], { subtitle: 'Recall from Topics 1–2 and Key Stage 3 • 6 minutes • no notes', notes: 'ANSWERS\n1. 400 ÷ 80 = 5 m/s.\n2. 2500 Hz; 0.03 m.\n3. x = v × t.\n4. Sound needs particles (a medium) to vibrate; a vacuum has none.\n5. Light; we see lightning before we hear thunder.\n6. 3 × 10⁸ m/s.' }), 'Retrieval starter');

// ======================= 5 WAVES TRANSFER ENERGY =======================
reg(D.contentSlide({
  title: 'Waves transfer energy, not matter',
  subtitle: `Specification ${sp('4.1')}–${sp('4.2')} • the wave travels, the medium stays`,
  tag: '4.1–4.2', caption: 'a duck on a water wave moves up and down, not along',
  draw: (s, p) => {
    box(s, 0.75, 2.6, 5.5, 1.5, 'CFE3F7', null);
    sine(s, 0.75, 6.25, 2.6, 0.28, 1.8, C.blue, 3);
    [[2.1, 2.32], [2.1, 2.88]].forEach(([x, y], i) => { oval(s, x, y - 0.1, 0.5, 0.22, i ? 'F7D98A' : 'F5C342', 'B8730A', { lw: 1.25, tr: i ? 55 : 0 }); ball(s, x + 0.2, y - 0.28, 0.1, i ? 'F7D98A' : 'F5C342', 'B8730A', 1); });
    line(s, 1.65, 2.25, 1.65, 2.9, C.red, 2, { head: true, tail: true });
    label(s, 0.6, 1.6, 2.2, 'duck moves **up and down**', { size: 10.5, color: C.red, h: 0.4 });
    arrow(s, 3.6, 2.0, 5.6, 2.0, C.blue, 3); label(s, 3.5, 1.6, 2.2, '**wave** travels along', { size: 10.5, color: C.blue, h: 0.35 });
    // sound
    box(s, 0.9, 4.55, 0.45, 0.8, '555555', '333333'); poly(s, [[1.35, 4.55], [1.7, 4.3], [1.7, 5.6], [1.35, 5.35]], '777777', '333333');
    for (let i = 0; i < 4; i++) s.addShape(SH.ARC, { x: 1.9 + i * 0.4 - 0.4, y: 4.95 - 0.3 - i * 0.1, w: 0.8, h: 0.6 + i * 0.2, angleRange: [300, 60], line: { color: C.grey, width: 1.5 } });
    box(s, 4.6, 4.55, 0.06, 0.8, '8A6A3A', null); oval(s, 4.63, 4.5, 0.18, 0.28, 'F5A742', 'D35400');
    label(s, 3.2, 5.45, 3.0, 'the candle flame **flickers**: air vibrates but does not flow to it', { size: 10, h: 0.5 });
  },
  head: 'Key ideas',
  lines: [
    'Waves transfer **energy** and **information** from one place to another **without transferring matter**.',
    '**Water waves:** a floating object (a duck or cork) moves **up and down** as the wave passes; it is not carried along.',
    '**Sound:** a loudspeaker makes the air vibrate **back and forth**; the air particles do not travel to your ear, so you are not blown over by a loud sound.',
  ],
  worked: { head: 'Explain the evidence', q: 'How do we know that sound waves do not carry the air along?',
    steps: [['Observe', 'a candle flame near a speaker flickers'], ['Not', 'the flame is not blown away'], ['So', 'air particles vibrate about a fixed point'], ['Answer', 'the energy travels, not the air']] },
  qc: 'A cork floats on a pond as ripples pass. Describe the motion of the cork.',
  notes: 'QUICK CHECK ANSWER: it moves up and down (oscillates) about the same position (1); it does not move along with the wave (1).\nSpec 4.1–4.2.',
}), '4.1–4.2 Waves transfer energy');

// ======================= 6 WAVE TERMS =======================
reg(D.contentSlide({
  title: 'Describing waves',
  subtitle: `Specification ${sp('4.3')}–${sp('4.4')} • frequency, wavelength, amplitude, period, wave velocity, wavefront`,
  tag: '4.3–4.4', caption: 'a transverse wave (displacement against distance)',
  draw: (s, p) => {
    const x0 = 0.85, x1 = 6.15, yc = 3.3, A = 0.85, lam = 2.2;
    line(s, x0, yc, x1, yc, C.grey, 1, { dash: 'dash' });
    sine(s, x0, x1, yc, A, lam, C.blue, 3);
    dim(s, x0 + lam / 4, yc - A - 0.2, x0 + lam / 4 + lam, yc - A - 0.2, 'wavelength λ', C.red, { w: 1.6 });
    dim(s, x0 + lam / 4 - 0.25, yc, x0 + lam / 4 - 0.25, yc - A, 'amplitude', '2E8B57', { w: 1.2, dx: -0.8, dy: -0.15 });
    label(s, x0 + lam / 4 - 0.4, yc - A - 0.62, 0.8, 'crest', { size: 10.5, bold: true, h: 0.25 });
    label(s, x0 + 3 * lam / 4 - 0.4, yc + A + 0.05, 0.8, 'trough', { size: 10.5, bold: true, h: 0.25 });
    label(s, x1 - 1.8, yc + 0.1, 1.8, 'rest position', { size: 9.5, italic: true, color: C.grey, h: 0.25, align: 'right' });
    // wavefronts
    [1.2, 1.7, 2.2, 2.7, 3.2].forEach(x => line(s, x, 4.75, x, 5.55, C.blue, 2));
    arrow(s, 3.5, 5.15, 4.4, 5.15, C.ink, 2);
    label(s, 4.45, 5.0, 1.8, 'wavefronts (seen from above)', { size: 10, align: 'left', h: 0.35 });
  },
  head: 'Definitions',
  lines: [
    '**Wavelength (λ):** distance from one point on a wave to the **same point** on the next wave (e.g. crest to crest), in **m**.',
    '**Amplitude:** maximum **displacement** of a point from its **rest position**, in **m**.',
    '**Frequency (f):** number of waves passing a point **each second**, in **hertz (Hz)**.',
    '**Period (T):** time for **one complete wave** to pass, in **s**. T = 1 ÷ f.',
    '**Wave velocity:** speed of the wave in a given direction (m/s). **Wavefront:** a line joining points on the same part of each wave, e.g. each crest.',
  ],
  worked: { head: 'Period', q: 'A wave has a frequency of 50 Hz. Calculate its period.',
    steps: [['Equation', 'T = 1 ÷ f'], ['Substitute', '1 ÷ 50'], ['Answer', 'T = 0.02 s']], size: 11 },
  workedH: 1.75,
  qc: 'A common mistake is to measure amplitude from **crest to trough**. Explain why this is wrong.',
  notes: 'QUICK CHECK ANSWER: amplitude is measured from the rest position (middle) to a crest or trough (1); crest to trough is twice the amplitude (1).\nSpec 4.3–4.4. Period T = 1/f is useful but is not on the Topic 4 recall list.',
}), '4.3–4.4 Wave terms');

// ======================= 7 TRANSVERSE vs LONGITUDINAL =======================
reg(D.contentSlide({
  title: 'Transverse and longitudinal waves',
  subtitle: `Specification ${sp('4.5')} • the direction of vibration compared with the direction of energy transfer`,
  tag: '4.5', caption: 'waves on a slinky spring',
  draw: (s, p) => {
    label(s, 0.6, 1.45, 3, '**Transverse**', { size: 12.5, align: 'left', color: C.blue });
    sine(s, 0.9, 6.0, 2.45, 0.45, 1.7, C.blue, 3);
    line(s, 1.32, 2.0, 1.32, 2.9, C.red, 2, { head: true, tail: true }); label(s, 1.4, 2.95, 1.6, 'vibration', { size: 10, color: C.red, align: 'left', h: 0.25 });
    arrow(s, 3.8, 1.65, 5.8, 1.65, C.ink, 2); label(s, 3.8, 1.35, 2.0, 'energy transfer', { size: 10, h: 0.25 });
    label(s, 0.6, 3.45, 3, '**Longitudinal**', { size: 12.5, align: 'left', color: '7B4FB8' });
    const comp = u => 1 + 0.75 * Math.cos(2 * Math.PI * u * 3);
    slinky(s, 0.9, 6.0, 4.4, 0.6, 46, comp, '7B4FB8');
    label(s, 0.75, 4.75, 1.5, 'compression', { size: 10, bold: true, h: 0.25 });
    label(s, 1.0, 3.78, 1.5, 'rarefaction', { size: 10, bold: true, h: 0.25 });
    line(s, 2.6, 5.15, 3.4, 5.15, C.red, 2, { head: true, tail: true }); label(s, 2.4, 5.2, 1.2, 'vibration', { size: 10, color: C.red, h: 0.25 });
    arrow(s, 3.8, 5.15, 5.8, 5.15, C.ink, 2); label(s, 3.8, 5.2, 2.0, 'energy transfer', { size: 10, h: 0.25 });
  },
  head: 'The difference',
  lines: [
    '**Transverse:** vibrations are **perpendicular** (at 90°) to the direction of energy transfer. Examples: **water** waves, all **electromagnetic** waves (light, radio), **S-waves** (seismic).',
    '**Longitudinal:** vibrations are **parallel** to the direction of energy transfer, making **compressions** and **rarefactions**. Examples: **sound**, **P-waves** (seismic).',
    'Electromagnetic waves can travel through a **vacuum**; sound cannot.',
  ],
  worked: { head: 'Classify', q: 'Is a seismic P-wave transverse or longitudinal? An S-wave?',
    steps: [['P-wave', 'pushes and pulls along the direction of travel'], ['So', 'longitudinal'], ['S-wave', 'shakes side to side'], ['Answer', 'P longitudinal; S transverse']] },
  qc: 'Describe the difference between transverse and longitudinal waves. Give **one** example of each.',
  notes: 'QUICK CHECK ANSWER: transverse: oscillations perpendicular to direction of energy transfer (1), e.g. light / water / S-waves (1); longitudinal: oscillations parallel to direction of energy transfer (1), e.g. sound / P-waves (1).\nSpec 4.5.',
}), '4.5 Transverse and longitudinal');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 4.1–4.5 • wave properties', [
  { q: 'State what is transferred by a wave, and what is **not** transferred.', marks: 2, ms: 'Energy (and information) transferred (1); matter / the medium is not (1).' },
  { q: 'Define **frequency** and give its unit.', marks: 2, ms: 'Number of waves passing a point per second (1); hertz / Hz (1).' },
  { q: 'Describe the difference between a compression and a rarefaction.', marks: 2, ms: 'Compression: particles close together / high pressure (1); rarefaction: particles spread out / low pressure (1).' },
  { q: 'A wave has a period of 2 s. Calculate its frequency.', marks: 1, ms: '0.5 Hz (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 WAVE EQUATIONS =======================
reg(D.contentSlide({
  title: 'The wave equations',
  subtitle: `Specification ${sp('4.6')} • both equations must be RECALLED`,
  tag: '4.6', caption: 'one wavelength passes each wave period',
  draw: (s, p) => {
    box(s, 0.85, 1.6, 5.3, 1.05, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 2 });
    label(s, 0.85, 1.65, 5.3, '**v = f × λ**', { size: 26, color: C.ink, h: 0.6 });
    label(s, 0.85, 2.2, 5.3, 'wave speed (m/s) = frequency (Hz) × wavelength (m)', { size: 11, h: 0.35 });
    box(s, 0.85, 2.85, 5.3, 1.05, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 2 });
    label(s, 0.85, 2.9, 5.3, '**v = x ÷ t**', { size: 26, color: C.ink, h: 0.6 });
    label(s, 0.85, 3.45, 5.3, 'wave speed (m/s) = distance (m) ÷ time (s)', { size: 11, h: 0.35 });
    D.pill(s, 2.55, 4.05, 'RECALL: learn both', C.red, 1.9);
    label(s, 0.85, 4.55, 5.3, 'Convert first: kHz → Hz (× 1000); MHz → Hz (× 10⁶); cm → m (÷ 100).', { size: 10.5, h: 0.5 });
  },
  head: 'Using the equations',
  lines: [
    'Use **v = f × λ** when you know two of speed, frequency and wavelength.',
    'Use **v = x ÷ t** when you know a distance travelled and the time taken (e.g. echoes, thunder).',
    'Rearranged: **f = v ÷ λ**, **λ = v ÷ f**; **x = v × t**, **t = x ÷ v**.',
    'The frequency of a wave is set by its **source** and does not change when the wave enters a new medium.',
  ],
  worked: { head: 'Worked example', q: 'A sound wave has a frequency of 50 Hz and a wavelength of 6.8 m. Calculate its speed.',
    steps: [['Equation', 'v = f × λ'], ['Substitute', 'v = 50 × 6.8'], ['Answer', 'v = 340 m/s']], size: 11 },
  workedH: 1.75,
  qc: 'Thunder is heard **3.0 s** after a lightning flash. Sound travels at **340 m/s**. How far away is the storm?',
  notes: 'QUICK CHECK ANSWER: x = v × t = 340 × 3.0 (1) = 1020 m (≈ 1 km) (1).\nSpec 4.6. Both equations are RECALL (not on the Physics Equations List).',
}), '4.6 The wave equations');

// ======================= 10 PRACTICE =======================
{
  const s = D.contentHeader('Practice: the wave equation', `Specification ${sp('4.6')} • my turn, then your turn`, { tag: '4.6' });
  D.workedSteps(s, 0.45, 1.3, 6.1, 4.95, 'My turn', 'A radio station broadcasts at **100 MHz** with wavelength **3.0 m**. A ripple has f = 5.0 Hz and λ = **4.0 cm**.',
    [['Convert', '100 MHz = 100 × 10⁶ Hz; 4.0 cm = 0.040 m'], ['Radio', 'v = 100 × 10⁶ × 3.0 = **3.0 × 10⁸ m/s**'], ['Ripple', 'v = 5.0 × 0.040 = **0.20 m/s**'], ['Answer', '3.0 × 10⁸ m/s; 0.20 m/s']], { size: 13 });
  D.card(s, 6.8, 1.3, 6.08, 4.95, 'Your turn', [
    '**1** A tuning fork makes a **256 Hz** note. Sound travels at **330 m/s**. Calculate the wavelength.',
    '**2** Ripples of wavelength **2.5 cm** travel at **0.15 m/s**. Calculate their frequency.',
    '**3** A sound of **2.0 kHz** has a wavelength of **0.17 m**. Calculate its speed.',
    '**4** Sound travels at **1500 m/s** in water. Calculate the wavelength of a **50 kHz** sonar pulse.',
  ], { size: 14, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Which **two** quantities must you convert before using v = f × λ in Q2 and Q3?');
  D.notes(s, 'YOUR TURN ANSWERS: 1) λ = 330 ÷ 256 = 1.29 m. 2) f = 0.15 ÷ 0.025 = 6.0 Hz. 3) v = 2000 × 0.17 = 340 m/s. 4) λ = 1500 ÷ 50 000 = 0.030 m (3.0 cm).\nQUICK CHECK: cm → m (Q2) and kHz → Hz (Q3).');
  reg(s, '4.6 Practice: wave equation');
}

// ======================= 11 MEASURING SPEED OF SOUND =======================
reg(D.contentSlide({
  title: 'Measuring the speed of sound and of ripples',
  subtitle: `Specification ${sp('4.7')} • v = x ÷ t`,
  tag: '4.7', caption: 'echo method: clap in front of a wall at least 50 m away',
  draw: (s, p) => {
    box(s, 5.6, 1.7, 0.45, 2.6, 'B04A3A', '7A2E22'); for (let r = 0; r < 8; r++) line(s, 5.6, 1.7 + r * 0.33, 6.05, 1.7 + r * 0.33, 'E7B9A8', 0.75);
    label(s, 5.4, 4.35, 0.9, 'wall', { size: 10.5, bold: true, h: 0.25 });
    person(s, 1.55, 4.3);
    arrow(s, 1.85, 2.7, 5.5, 2.7, C.blue, 2); arrow(s, 5.5, 3.1, 1.85, 3.1, C.blue, 2, { dash: 'dash' });
    label(s, 2.5, 2.35, 2.2, 'clap', { size: 10.5, color: C.blue, h: 0.25 }); label(s, 2.5, 3.15, 2.2, 'echo', { size: 10.5, color: C.blue, h: 0.25 });
    line(s, 1.55, 4.6, 5.6, 4.6, C.red, 1.5, { head: true, tail: true }); label(s, 2.5, 4.65, 2.2, '**85 m** (trundle wheel)', { size: 10.5, color: C.red, h: 0.3 });
    stopwatch(s, 0.85, 2.9);
    label(s, 0.7, 5.05, 5.6, 'Clap in time with the echoes; time **20 claps**. Sound travels **2 × 85 m** for each clap.', { size: 10.5, h: 0.5 });
  },
  head: 'Methods',
  lines: [
    '**Echo method:** stand a measured distance from a large wall. Clap so each clap matches the echo. Time many claps: time per clap = total ÷ number. Speed = **2 × distance ÷ time**.',
    '**Two microphones:** place them a measured distance apart; a data logger or oscilloscope records the **time** between the sound reaching each one.',
    '**Ripples:** in a ripple tank, measure the time for a wavefront to travel a measured distance, or use **v = f × λ** (Core Practical).',
    'Timing **many** waves or claps reduces the effect of **reaction time**.',
  ],
  worked: { head: 'Worked example', q: '20 claps take 10 s with the wall 85 m away.',
    steps: [['Time', 'one clap-echo = 10 ÷ 20 = 0.5 s'], ['Distance', 'there and back = 2 × 85 = 170 m'], ['Answer', 'v = 170 ÷ 0.5 = 340 m/s']], size: 11 },
  workedH: 1.75,
  qc: 'Why is the distance in the echo method **doubled**?',
  notes: 'QUICK CHECK ANSWER: the sound travels to the wall and back to the person (1).\nSpec 4.7. Two-microphone example: 100 m in 0.29 s gives 345 m/s.',
}), '4.7 Measuring wave speed');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 4.6–4.7 • wave equations and speed of sound', [
  { q: 'State the equation linking wave speed, frequency and wavelength.', marks: 1, ms: 'v = f × λ (1).' },
  { q: 'Ripples have a frequency of 0.5 Hz and a wavelength of 0.6 m. Calculate their speed.', marks: 2, ms: 'v = 0.5 × 0.6 (1); = 0.3 m/s (1).' },
  { q: 'A sound has a frequency of 850 Hz in air (340 m/s). Calculate its wavelength.', marks: 2, ms: 'λ = 340 ÷ 850 (1); = 0.4 m (1).' },
  { q: 'Explain why timing 20 echoes is better than timing one.', marks: 2, ms: 'Reaction time is a large fraction of one short time (1); dividing a longer total reduces the effect / more accurate (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 CP RIPPLE TANK =======================
reg(D.contentSlide({
  title: 'Core Practical: waves in a fluid (ripple tank)',
  subtitle: 'Specification 4.17 • speed, frequency and wavelength of water waves',
  tag: '4.17', cp: true, caption: 'ripple tank: a lamp above projects the waves onto paper below',
  draw: (s, p) => {
    poly(s, [[1.0, 2.6], [5.7, 2.6], [6.1, 3.6], [0.6, 3.6]], 'BFD9F2', '5B9BD5', { lw: 2 });
    box(s, 1.2, 2.72, 3.6, 0.12, '777777', '444444'); label(s, 1.0, 2.25, 2.0, 'vibrating bar (motor)', { size: 10, bold: true, h: 0.3 });
    for (let i = 0; i < 7; i++) line(s, 1.0 + i * 0.0, 2.95 + i * 0.09, 5.75 + i * 0.05, 2.95 + i * 0.09, '2E5BD8', 1.5);
    line(s, 3.35, 1.5, 3.35, 1.95, '555555', 2); poly(s, [[3.05, 1.95], [3.65, 1.95], [3.5, 2.15], [3.2, 2.15]], '555555', '333333'); label(s, 3.75, 1.55, 1.2, 'lamp', { size: 10, bold: true, h: 0.3, align: 'left' });
    box(s, 0.9, 4.0, 5.2, 1.0, C.white, '999999', { lw: 1 }); label(s, 0.9, 5.0, 5.2, 'white paper: shadows of the wavefronts', { size: 10, italic: true, h: 0.3 });
    for (let i = 0; i < 10; i++) line(s, 1.05 + i * 0.5, 4.1, 1.05 + i * 0.5, 4.9, '2E5BD8', 2);
    line(s, 1.05, 5.45, 5.55, 5.45, C.red, 1.5, { head: true, tail: true }); label(s, 2.2, 5.45, 2.4, '**10 wavelengths = 0.30 m**', { size: 10.5, color: C.red, h: 0.35 });
  },
  head: 'Method',
  lines: [
    'Set up the ripple tank with a **lamp** above and **paper** below. Switch on the motor.',
    '**Frequency:** count the number of waves passing a point in **10 s** (or use a stroboscope / slow-motion phone video). f = waves ÷ time.',
    '**Wavelength:** place a **ruler** on the paper; measure across **10 wavefronts**, then divide by 10.',
    '**Speed:** v = f × λ, or time one wavefront crossing a known distance (v = x ÷ t).',
  ],
  worked: { head: 'Worked example', q: '10 waves pass in 5.0 s; 10 wavelengths measure 0.30 m.',
    steps: [['f', '10 ÷ 5.0 = 2.0 Hz'], ['λ', '0.30 ÷ 10 = 0.030 m'], ['Answer', 'v = 2.0 × 0.030 = 0.060 m/s']], size: 11 },
  workedH: 1.75,
  qc: 'Why is it better to measure **10** wavelengths and divide by 10?',
  notes: 'QUICK CHECK ANSWER: one wavelength is small, so the percentage (measurement) uncertainty is large (1); measuring many reduces it / more accurate (1).\nCP 4.17 (fluid). Safety: water near electrical mains: keep plugs and lamp leads dry; mop up spills.',
}), '4.17 CP: ripple tank');

// ======================= 14 CP SOLID =======================
reg(D.contentSlide({
  title: 'Core Practical: waves in a solid (metal rod)',
  subtitle: 'Specification 4.17 • using sound to find the speed of waves in a solid',
  tag: '4.17', cp: true, caption: 'hit the end of a rod; a microphone or phone app measures the frequency',
  draw: (s, p) => {
    box(s, 1.2, 2.6, 4.4, 0.2, 'B7C0CA', '555555', { lw: 1.25 }); label(s, 2.4, 2.2, 2.0, 'metal rod', { size: 10.5, bold: true, h: 0.3 });
    [1.8, 5.0].forEach(x => { poly(s, [[x - 0.3, 3.4], [x + 0.3, 3.4], [x, 2.8]], 'C99A5B', '8A6A3A'); });
    label(s, 1.3, 3.45, 4.2, 'clamped / supported near each end', { size: 9.5, italic: true, h: 0.3 });
    line(s, 0.7, 2.0, 1.1, 2.6, '8A6A3A', 3); box(s, 0.55, 1.75, 0.35, 0.3, '555555', '333333'); label(s, 0.3, 1.45, 1.0, 'hammer', { size: 10, bold: true, h: 0.25 });
    box(s, 5.75, 2.4, 0.5, 0.75, '333333', '111111', { shape: SH.ROUNDED_RECTANGLE, r: 0.1 }); box(s, 5.8, 2.48, 0.4, 0.5, 'D6EAF8', null); label(s, 5.4, 3.2, 1.2, 'phone app: 2500 Hz', { size: 9.5, bold: true, h: 0.45 });
    line(s, 1.2, 4.0, 5.6, 4.0, C.red, 1.5, { head: true, tail: true }); label(s, 2.4, 4.0, 2.0, '**L = 0.80 m**', { size: 10.5, color: C.red, h: 0.3 });
    sine(s, 1.2, 5.6, 4.85, 0.3, 8.8, '7B4FB8', 2, Math.PI / 2); sine(s, 1.2, 5.6, 4.85, 0.3, 8.8, '7B4FB8', 1, -Math.PI / 2);
    label(s, 0.9, 5.25, 5.0, 'the rod holds **half a wavelength**: **λ = 2L**', { size: 10.5, h: 0.4 });
  },
  head: 'Method',
  lines: [
    'Measure the **length L** of the rod with a metre rule.',
    'Hit the end with a hammer. Use a microphone with an **oscilloscope** or a **frequency app** to measure the **peak frequency**.',
    'The main vibration has **λ = 2 × L**.',
    'Calculate **v = f × λ**. Repeat several times and find a **mean**.',
  ],
  worked: { head: 'Worked example', q: 'L = 0.80 m; frequency = 2500 Hz.',
    steps: [['λ', '2 × 0.80 = 1.6 m'], ['Equation', 'v = f × λ'], ['Answer', 'v = 2500 × 1.6 = 4000 m/s']], size: 11 },
  workedH: 1.75,
  qc: 'A rod of length **1.20 m** gives a frequency of **2100 Hz**. Calculate the speed of sound in the rod.',
  notes: 'QUICK CHECK ANSWER: λ = 2.40 m (1); v = 2100 × 2.40 = 5040 m/s (1).\nCP 4.17 (solid). Safety: keep fingers away from the hammer; wear eye protection; ear defenders if very loud.',
}), '4.17 CP: waves in a solid');

// ======================= 15 CP EVALUATION =======================
{
  const s = D.contentHeader('Core Practical: suitability of equipment', 'Specification 4.17 • results, errors and improvements', { tag: '4.17', cp: true });
  const rows = [[HDR('Measurement'), HDR('Equipment'), HDR('Problem'), HDR('Better choice')], ...[
    ['Ripple frequency', 'counting by eye + stopwatch', 'waves too fast to count; reaction time', 'stroboscope; slow-motion video; count for longer'],
    ['Ripple wavelength', 'ruler over the tank', 'waves move; shadows blur', 'measure 10 waves on a still photo with a ruler in view'],
    ['Rod frequency', 'phone app / oscilloscope', 'background noise', 'quiet room; repeat; take the peak value'],
    ['Rod length', 'metre rule', 'parallax', 'read at eye level; mm resolution'],
  ].map(([a, b, c, d], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i, { color: C.red }), tcell(d, i, { color: '2E8B57' })])];
  table(s, rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.2, 2.9, 3.4, 3.93], rowH: 0.62, fontSize: 12 });
  D.workedSteps(s, 0.45, 4.6, 6.1, 1.65, 'Your turn', '15 ripples pass in 10 s; 12 wavelengths measure 0.36 m.', [['Find', 'f, λ and then v']], { size: 12 });
  D.card(s, 6.8, 4.6, 6.08, 1.65, 'Suitability', ['Equipment is **suitable** if its **resolution** and **range** suit the size of the measurement and it reduces **random error**.'], { size: 12 });
  D.quickCheck(s, 'Suggest why a **slow-motion video** gives a more accurate frequency than counting by eye.');
  D.notes(s, 'YOUR TURN ANSWER: f = 15 ÷ 10 = 1.5 Hz; λ = 0.36 ÷ 12 = 0.030 m; v = 1.5 × 0.030 = 0.045 m/s.\nQUICK CHECK: waves can be counted frame by frame / no reaction time error / time read from the video (1–2).\nCP 4.17.');
  reg(s, '4.17 CP: evaluation');
}

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 4.17 • Core Practical', [
  { q: 'Describe how to measure the wavelength of water waves in a ripple tank.', marks: 2, ms: 'Use a lamp to project waves onto paper / take a photo with a ruler (1); measure across several (e.g. 10) wavelengths and divide (1).' },
  { q: 'A rod is 0.50 m long. Explain why the wavelength of the sound in it is 1.0 m.', marks: 1, ms: 'The rod holds half a wavelength, so λ = 2 × L (1).' },
  { q: 'A rod gives 3200 Hz and λ = 1.0 m. Calculate the speed of the wave in the rod.', marks: 2, ms: 'v = 3200 × 1.0 (1); = 3200 m/s (1).' },
  { q: 'Give **one** safety precaution for the ripple tank.', marks: 1, ms: 'Keep electrical equipment / plugs away from water / mop up spills (1).' },
]);
calc('R3 3200 × 1.0', 3200 * 1.0, 3200, 1e-9);
reg(R3.s, 'Recap 3');

// ======================= 17 ECHOES (P) =======================
reg(D.contentSlide({
  title: 'Echoes: calculating depth and distance',
  subtitle: `Specification ${sp('4.8')} • x = v × t, then halve it`,
  tag: sp('4.8'), p: true, caption: 'a ship uses sonar to measure the depth of the sea',
  draw: (s, p) => {
    box(s, 0.75, 2.3, 5.5, 3.0, 'CFE3F7', null);
    sine(s, 0.75, 6.25, 2.3, 0.05, 0.6, '5B9BD5', 1.5);
    poly(s, [[2.4, 2.3], [4.6, 2.3], [4.3, 2.65], [2.7, 2.65]], '555555', '333333'); box(s, 3.0, 1.9, 0.9, 0.4, '777777', '444444');
    poly(s, [[0.75, 5.0], [2.0, 4.85], [3.5, 5.05], [5.0, 4.9], [6.25, 5.1], [6.25, 5.3], [0.75, 5.3]], 'C99A5B', '8A6A3A');
    arrow(s, 3.3, 2.7, 3.3, 4.85, C.red, 2.5); arrow(s, 3.7, 4.85, 3.7, 2.7, C.blue, 2.5, { dash: 'dash' });
    label(s, 1.5, 3.4, 1.7, 'pulse sent', { size: 10.5, bold: true, color: C.red, h: 0.3, align: 'right' }); label(s, 3.85, 3.4, 1.7, 'echo returns', { size: 10.5, bold: true, color: C.blue, h: 0.3, align: 'left' });
    line(s, 5.6, 2.65, 5.6, 4.9, C.ink, 1.5, { head: true, tail: true }); label(s, 5.0, 3.6, 1.2, 'depth d', { size: 10.5, bold: true, h: 0.3, align: 'right' });
    label(s, 0.7, 5.4, 5.6, 'time measured = there **and back**', { size: 10.5, h: 0.35 });
  },
  head: 'Method',
  lines: [
    'A pulse of sound (or ultrasound) is sent out; it **reflects** off a surface and the **echo** returns.',
    'The time measured is for the wave to travel **there and back**.',
    'Total distance **x = v × t**; the depth or distance to the surface is **x ÷ 2**.',
    'Used in **sonar** (ships, submarines, fish-finders), bat echolocation and ultrasound scanning.',
  ],
  worked: { head: 'Worked example', q: 'An echo returns after 0.40 s. Sound travels at 1500 m/s in sea water. Calculate the depth.',
    steps: [['Distance', 'x = v × t = 1500 × 0.40 = 600 m'], ['Halve', 'there and back, so ÷ 2'], ['Answer', 'depth = 300 m']] },
  qc: 'A bat hears an echo **0.020 s** after its call. Sound travels at **340 m/s**. How far away is the insect?',
  notes: 'QUICK CHECK ANSWER: x = 340 × 0.020 = 6.8 m (1); ÷ 2 = 3.4 m (1).\nSpec 4.8P (physics only).',
}), '4.8P Echoes (PHYSICS ONLY)');

// ======================= 18 INTERFACES (P) =======================
reg(D.contentSlide({
  title: 'Waves at a boundary',
  subtitle: `Specification ${sp('4.9')} • reflection, refraction, transmission and absorption`,
  tag: sp('4.9'), p: true, caption: 'a wave meets the boundary between two materials',
  draw: (s, p) => {
    box(s, 0.75, 3.4, 5.5, 2.1, 'D6EAF8', '5B87B5', { lw: 1.5 }); label(s, 4.6, 5.1, 1.6, 'material 2', { size: 10.5, italic: true, h: 0.3 });
    label(s, 4.6, 1.5, 1.6, 'material 1', { size: 10.5, italic: true, h: 0.3 });
    line(s, 3.5, 1.5, 3.5, 5.4, C.grey, 1, { dash: 'dash' }); label(s, 3.55, 1.45, 0.9, 'normal', { size: 9.5, italic: true, color: C.grey, align: 'left', h: 0.25 });
    arrow(s, 1.6, 1.7, 3.5, 3.4, C.ink, 3); label(s, 0.8, 1.5, 1.4, '**incident** wave', { size: 10.5, h: 0.3 });
    arrow(s, 3.5, 3.4, 5.4, 1.7, C.blue, 2.5); label(s, 4.95, 2.0, 1.3, '**reflected**', { size: 10.5, color: C.blue, h: 0.3 });
    arrow(s, 3.5, 3.4, 4.4, 5.3, '2E8B57', 2.5); label(s, 4.15, 4.4, 1.9, '**refracted / transmitted**', { size: 10.5, color: '2E8B57', h: 0.3, align: 'left' });
    for (let i = 0; i < 6; i++) ball(s, 2.0 + i * 0.22, 4.6 + (i % 2) * 0.2, 0.05, C.red, C.red);
    label(s, 0.85, 4.95, 2.4, '**absorbed**: energy goes into the material', { size: 10, color: C.red, h: 0.45 });
  },
  head: 'What can happen',
  lines: [
    '**Reflection:** the wave bounces back from the boundary (e.g. echoes, mirrors).',
    '**Refraction:** the wave changes **speed** and often **direction** as it enters the new material.',
    '**Transmission:** the wave passes **through** the material (it may be refracted).',
    '**Absorption:** the wave’s **energy** is transferred to the material, often heating it.',
    'Usually **several** happen at once: some energy is reflected, some transmitted, some absorbed.',
  ],
  worked: { head: 'Apply', q: 'Why do recording studios have soft foam on the walls?',
    steps: [['Hard walls', 'reflect sound: echoes'], ['Soft foam', 'absorbs sound energy'], ['Effect', 'less reflection'], ['Answer', 'clearer recordings with no echo']] },
  qc: 'Name the process when a wave passes **through** a material, and when its energy is taken in by the material.',
  notes: 'QUICK CHECK ANSWER: transmission (1); absorption (1).\nSpec 4.9P (physics only).',
}), '4.9P Waves at boundaries (PHYSICS ONLY)');

// ======================= 19 REFRACTION =======================
reg(D.contentSlide({
  title: 'Refraction: change of speed and direction',
  subtitle: `Specification ${sp('4.10')} • wavefronts entering a slower medium`,
  tag: '4.10', caption: 'water waves passing from deep into shallow water (slower)',
  draw: (s, p) => {
    const bx = 3.5, Y0 = 1.6, Y1 = 5.5, iA = 35 * Math.PI / 180, rA = Math.asin(Math.sin(iA) * 0.4 / 0.6);
    box(s, bx, Y0, 6.25 - bx, Y1 - Y0, 'BFD9F2', null);
    line(s, bx, Y0, bx, Y1, '5B9BD5', 2);
    label(s, 0.8, Y0 + 0.02, 2.6, 'deep water: **faster**, λ = 0.6', { size: 10.5, h: 0.3, align: 'left' });
    label(s, bx + 0.1, Y0 + 0.02, 2.6, 'shallow: **slower**, λ = 0.4', { size: 10.5, h: 0.3, align: 'left' });
    const clipSeg = (xa, xb, f) => { const pts = []; for (let k = 0; k <= 60; k++) { const x = xa + (xb - xa) * k / 60, y = f(x); if (y >= Y0 + 0.35 && y <= Y1 - 0.05) pts.push([x, y]); } if (pts.length > 1) line(s, pts[0][0], pts[0][1], pts[pts.length - 1][0], pts[pts.length - 1][1], C.blue, 2.2); };
    const step = 0.6 / Math.sin(iA);
    for (let yb = -1.0; yb < 9; yb += step) {
      clipSeg(0.8, bx, x => yb - (x - bx) * Math.cos(iA) / Math.sin(iA));
      clipSeg(bx, 6.2, x => yb - (x - bx) * Math.cos(rA) / Math.sin(rA));
    }
    line(s, 2.2, 3.55, 6.1, 3.55, C.grey, 1, { dash: 'dash' }); label(s, 5.3, 3.6, 0.9, 'normal', { size: 9.5, italic: true, color: C.grey, h: 0.25 });
    arrow(s, bx - 1.4 * Math.cos(iA), 3.55 - 1.4 * Math.sin(iA), bx, 3.55, C.red, 3);
    arrow(s, bx, 3.55, bx + 1.5 * Math.cos(rA), 3.55 + 1.5 * Math.sin(rA), C.red, 3);
    label(s, 0.8, 5.52, 2.6, 'bends **towards** the normal', { size: 10.5, color: C.red, h: 0.3, align: 'left' });
  },
  head: 'Explanation',
  lines: [
    'When a wave crosses a boundary at an **angle**, one side of each wavefront reaches the new medium **first**.',
    'That part **slows down** (or speeds up) before the rest, so the wavefront **turns**: the wave changes **direction**.',
    '**Slower** medium: bends **towards** the normal and the wavelength gets **shorter**. **Faster** medium: bends **away** from the normal.',
    'Along the normal (90° to the boundary) the speed changes but the **direction does not**.',
    'The **frequency does not change**.',
  ],
  worked: { head: 'Exam technique', q: 'Explain why water waves change direction when they enter shallow water at an angle.',
    steps: [['Speed', 'waves travel slower in shallow water'], ['First', 'one end of the wavefront slows first'], ['Turn', 'the wavefront pivots'], ['Answer', 'direction changes towards the normal']] },
  qc: 'Which quantity stays the **same** when a wave is refracted: speed, wavelength or frequency?',
  notes: 'QUICK CHECK ANSWER: frequency (1).\nSpec 4.10 (H marker unverified; treated as both tiers). Wavefront diagrams link to Topic 5 refraction of light.',
}), '4.10 Refraction');

// ======================= 20 WAVELENGTH EFFECTS =======================
reg(D.contentSlide({
  title: 'Effects depend on wavelength',
  subtitle: `Specification ${sp('4.11')} • the same material treats different waves differently`,
  tag: '4.11', caption: 'how glass and the body treat different wavelengths',
  draw: (s, p) => {
    const rows = [['visible light', 'glass', 'transmitted (passes through)'], ['ultraviolet', 'glass', 'mostly absorbed'], ['X-rays', 'bone', 'absorbed'], ['X-rays', 'soft tissue', 'transmitted'], ['high-pitch sound', 'soft furnishings', 'absorbed well'], ['low-pitch sound', 'walls', 'transmitted (you hear the bass next door)']];
    const R = [[HDR('Wave'), HDR('Material'), HDR('Mainly…')], ...rows.map(([a, b, c], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c, i)])];
    table(s, R, { x: 0.75, y: 1.6, w: 5.5, colW: [1.6, 1.5, 2.4], rowH: 0.5, fontSize: 11 });
  },
  head: 'Key idea',
  lines: [
    'Different substances may **absorb**, **transmit**, **refract** or **reflect** waves in ways that **vary with wavelength**.',
    'This is why glass is **transparent** to visible light but blocks much **UV**, and why **X-rays** show bones.',
    'Sound: **low frequencies** (long wavelengths) pass through walls more easily than **high frequencies**.',
  ],
  worked: { head: 'Apply', q: 'Why can you hear the bass but not the singer through a wall?',
    steps: [['Bass', 'low frequency, long wavelength'], ['Wall', 'transmits long wavelengths better'], ['Singer', 'higher frequencies absorbed / reflected'], ['Answer', 'mainly the bass gets through']] },
  qc: 'Give **one** example where the same material transmits one wavelength but absorbs another.',
  notes: 'QUICK CHECK ANSWER: e.g. glass transmits visible light but absorbs UV; soft tissue transmits X-rays but bone absorbs them; walls transmit low but absorb high frequencies (1–2).\nSpec 4.11 (wording and P status medium confidence).',
}), '4.11 Wavelength effects');

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('4.8')}–4.11 • echoes, boundaries and refraction`, [
  { q: 'Explain why a wave changes direction when it enters a new medium at an angle.', marks: 3, ms: 'Wave changes speed (1); one side of the wavefront changes speed first (1); so the wavefront turns / bends towards or away from the normal (1).' },
  { q: 'State what happens to the wavelength of a wave as it slows down.', marks: 1, ms: 'Wavelength decreases / gets shorter (frequency unchanged) (1).' },
  { q: 'A sonar echo returns after 0.80 s in sea water (1500 m/s). Calculate the depth.', marks: 2, ms: '1500 × 0.80 = 1200 m (1); ÷ 2 = 600 m (1).' },
  { q: 'Describe what is meant by **absorption** of a wave.', marks: 1, ms: 'Energy of the wave is transferred to the material (which may heat up) (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 22 HEARING (P) =======================
reg(D.contentSlide({
  title: 'Sound, vibrations and hearing',
  subtitle: `Specification ${sp('4.12')} • converting sound waves to vibrations in solids`,
  tag: sp('4.12'), p: true, caption: 'the human ear (simplified)',
  draw: (s, p) => {
    poly(s, [[0.9, 2.0], [1.5, 1.7], [1.8, 2.6], [1.6, 3.7], [1.2, 4.5], [0.9, 4.2], [1.2, 3.3]], 'F2D0B8', 'B5655B', { lw: 1.5 });
    box(s, 1.65, 3.0, 1.7, 0.45, 'FBE9E7', 'B5655B'); label(s, 1.7, 3.5, 1.6, 'ear canal', { size: 10, h: 0.25 });
    oval(s, 3.45, 3.22, 0.12, 0.8, 'E8C4B4', '8C4A42', { lw: 2 }); label(s, 2.95, 1.95, 1.1, 'eardrum', { size: 10, bold: true, h: 0.25 }); line(s, 3.4, 2.2, 3.45, 2.85, C.grey, 1);
    polyline(s, [[3.55, 3.2], [3.9, 3.0], [4.2, 3.25], [4.5, 3.05]], 'C9A97C', 4); label(s, 3.6, 2.45, 1.4, 'small bones', { size: 10, bold: true, h: 0.25 });
    s.addShape(SH.ARC, { x: 4.5, y: 2.6, w: 1.2, h: 1.2, angleRange: [0, 330], line: { color: '2E8B57', width: 5 } }); label(s, 4.6, 3.85, 1.3, 'cochlea', { size: 10, bold: true, h: 0.25 });
    line(s, 5.7, 3.2, 6.2, 3.6, 'B8730A', 3); label(s, 5.2, 4.15, 1.2, 'nerve to brain', { size: 9.5, h: 0.4 });
    for (let i = 0; i < 4; i++) s.addShape(SH.ARC, { x: 0.2 + i * 0.25, y: 2.6 + -i * 0.05, w: 0.6, h: 1.2 + i * 0.1, angleRange: [300, 60], line: { color: C.grey, width: 1.25 } });
    label(s, 0.7, 4.75, 5.6, 'sound waves → eardrum vibrates → bones vibrate → cochlea → electrical signals', { size: 10.5, h: 0.5 });
  },
  head: 'How we hear',
  lines: [
    'Sound waves in air make the **eardrum vibrate** at the same frequency.',
    'The **small bones** pass the vibrations to the **cochlea**, where tiny hairs make **electrical signals** for the brain.',
    'Microphones work the same way: a **diaphragm** vibrates. Loudspeakers do the reverse.',
    'Each part can only vibrate over a **limited frequency range**, so humans hear only about **20 Hz to 20 000 Hz**. The upper limit falls with **age**.',
  ],
  worked: { head: 'Wavelengths we hear', q: 'Calculate the wavelengths at the limits of hearing (v = 340 m/s).',
    steps: [['20 Hz', 'λ = 340 ÷ 20 = 17 m'], ['20 000 Hz', 'λ = 340 ÷ 20 000 = 0.017 m'], ['Answer', '17 m down to 1.7 cm']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why we cannot hear sounds above about **20 000 Hz**.',
  notes: 'QUICK CHECK ANSWER: the eardrum / small bones / cochlea hairs cannot vibrate at such high frequencies (1); so no signal is produced (1).\nSpec 4.12P (physics only).',
}), '4.12P Hearing (PHYSICS ONLY)');

// ======================= 23 ULTRASOUND & INFRASOUND (P) =======================
reg(D.contentSlide({
  title: 'Ultrasound and infrasound',
  subtitle: `Specification ${sp('4.13')}–${sp('4.14')} • sound we cannot hear`,
  tag: `${sp('4.13')}–${sp('4.14')}`, p: true, caption: 'frequency scale (logarithmic)',
  draw: (s, p) => {
    const xs = f => 0.9 + (Math.log10(f) - 0) / 6 * 5.3;
    box(s, xs(1), 2.6, xs(20) - xs(1), 0.7, 'D7C3E8', '7B4FB8'); box(s, xs(20), 2.6, xs(20000) - xs(20), 0.7, 'CFE6D6', '2E8B57'); box(s, xs(20000), 2.6, xs(1e6) - xs(20000), 0.7, 'D6EAF8', '2E5BD8');
    label(s, xs(1), 2.6, xs(20) - xs(1), '**infrasound**', { size: 10.5, h: 0.7 }); label(s, xs(20), 2.6, xs(20000) - xs(20), '**human hearing**', { size: 11, h: 0.7 }); label(s, xs(20000), 2.6, xs(1e6) - xs(20000), '**ultrasound**', { size: 10.5, h: 0.7 });
    [[1, '1'], [20, '20'], [1000, '1000'], [20000, '20 000'], [1e6, '10⁶']].forEach(([f, t]) => { line(s, xs(f), 3.3, xs(f), 3.45, C.ink, 1.25); label(s, xs(f) - 0.45, 3.5, 0.9, t, { size: 10, h: 0.25 }); });
    label(s, 0.9, 3.8, 5.3, 'frequency (Hz)', { size: 10.5, italic: true, h: 0.25 });
    label(s, 0.8, 4.3, 2.6, 'elephants, whales, earthquakes, volcanoes', { size: 10, color: '7B4FB8', h: 0.6, valign: 'top' });
    label(s, 3.7, 4.3, 2.6, 'bats, dolphins, medical scanners', { size: 10, color: '2E5BD8', h: 0.6, valign: 'top' });
  },
  head: 'Definitions',
  lines: [
    '**Ultrasound:** sound with frequencies **greater than 20 000 Hz** (20 kHz).',
    '**Infrasound:** sound with frequencies **less than 20 Hz**.',
    'Both are **longitudinal** sound waves; they obey **v = f × λ** like any other sound.',
    'Ultrasound has a **short wavelength**, so it can show small details; infrasound has a **long wavelength** and travels **very long distances**.',
  ],
  worked: { head: 'Calculation', q: 'Calculate the wavelength of 2.0 MHz ultrasound in body tissue (1500 m/s).',
    steps: [['Equation', 'λ = v ÷ f'], ['Substitute', '1500 ÷ 2.0 × 10⁶'], ['Answer', 'λ = 7.5 × 10⁻⁴ m = 0.75 mm']], size: 11 },
  workedH: 1.75,
  qc: 'Classify these sounds: **15 Hz**, **15 kHz**, **50 kHz**.',
  notes: 'QUICK CHECK ANSWER: 15 Hz infrasound; 15 kHz audible; 50 kHz ultrasound (2 marks for all three).\nSpec 4.13P–4.14P (physics only).',
}), '4.13P–4.14P Ultrasound and infrasound (PHYSICS ONLY)');

// ======================= 24 USES (P) =======================
reg(D.contentSlide({
  title: 'Uses of ultrasound and infrasound',
  subtitle: `Specification ${sp('4.15')} • sonar, foetal scanning and exploring the Earth’s core`,
  tag: sp('4.15'), p: true, caption: 'seismic waves inside the Earth (simplified)',
  draw: (s, p) => {
    const cx = 3.5, cy = 3.5;
    ball(s, cx, cy, 1.9, 'E8D5B0', 'A88B63', 2); ball(s, cx, cy, 1.0, 'F5B041', 'B8730A', 1.5); ball(s, cx, cy, 0.4, 'E74C3C', 'A93226', 1);
    label(s, cx - 0.5, cy + 0.45, 1.0, 'liquid outer core', { size: 9, h: 0.4 }); label(s, cx - 0.9, cy + 1.25, 1.8, 'mantle', { size: 10, h: 0.25 });
    ball(s, cx, cy - 1.9, 0.08, C.red, C.red); label(s, cx - 0.8, cy - 2.2, 1.6, 'earthquake', { size: 10, bold: true, color: C.red, h: 0.25 });
    polyline(s, [[cx, cy - 1.9], [cx - 1.3, cy - 0.6], [cx - 1.75, cy + 0.7]], '2E5BD8', 2); polyline(s, [[cx, cy - 1.9], [cx + 0.3, cy], [cx + 0.6, cy + 1.8]], '2E5BD8', 2);
    polyline(s, [[cx, cy - 1.9], [cx + 1.35, cy - 0.65], [cx + 1.8, cy + 0.6]], '7B4FB8', 2, { dash: 'dash' });
    label(s, 5.2, 2.3, 1.2, 'P (solid + liquid)', { size: 9.5, color: '2E5BD8', h: 0.45, align: 'left' }); label(s, 5.35, 4.1, 1.0, 'S (solid only)', { size: 9.5, color: '7B4FB8', h: 0.45, align: 'left' });
  },
  head: 'Uses',
  lines: [
    '**Sonar (ultrasound):** pulses reflect off the seabed, fish or submarines; **distance = v × t ÷ 2**.',
    '**Foetal scanning (ultrasound):** pulses partly **reflect at boundaries** between tissues; the echo times build an **image**. Safe: no ionising radiation.',
    '**Exploring the Earth’s core (infrasound / seismic waves):** **P-waves** (longitudinal) travel through solids and liquids; **S-waves** (transverse) only through **solids**. S-waves are **not detected** on the far side: the **outer core is liquid**.',
    'Infrasound also detects **volcanic eruptions**, nuclear tests and animal calls.',
  ],
  worked: { head: 'Foetal scan', q: 'An echo from a baby’s skull returns after 1.2 × 10⁻⁴ s (1500 m/s). How deep is the skull?',
    steps: [['Distance', '1500 × 1.2 × 10⁻⁴ = 0.18 m'], ['Halve', '0.18 ÷ 2'], ['Answer', '0.090 m = 9.0 cm']] },
  qc: 'Why is ultrasound, not X-rays, used to scan a foetus?',
  notes: 'QUICK CHECK ANSWER: ultrasound is not ionising / does not damage cells (1); X-rays are ionising and could harm the developing baby (1).\nSpec 4.15P (physics only). Seismic example: P at 6 km/s and S at 3.5 km/s over 420 km arrive 70 s and 120 s after the quake (lag 50 s).',
}), '4.15P Uses of ultrasound and infrasound (PHYSICS ONLY)');

// ======================= 25 CHANGING MEDIUM (HT, P) =======================
{
  const s = D.contentHeader('Sound passing into a new medium', `Specification ${sp('4.16')} • how v, f and λ are inter-related`, { tag: sp('4.16'), p: true, ht: true });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'a 500 Hz sound passing from air into water (λ drawn to scale ÷ 2)');
  box(s, 0.75, 1.65, 2.6, 3.2, 'F5F8FE', '999999'); box(s, 3.35, 1.65, 2.9, 3.2, 'BFD9F2', '5B9BD5');
  label(s, 0.75, 1.7, 2.6, '**air** 330 m/s', { size: 11, h: 0.3 }); label(s, 3.35, 1.7, 2.9, '**water** 1500 m/s', { size: 11, h: 0.3 });
  sine(s, 0.8, 3.35, 3.25, 0.4, 0.66 / 2, C.blue, 2); sine(s, 3.35, 6.2, 3.25, 0.4, 3.0 / 2, C.blue, 2);
  label(s, 0.75, 3.9, 2.6, 'λ = 0.66 m', { size: 11, bold: true, color: C.red, h: 0.3 }); label(s, 3.35, 3.9, 2.9, 'λ = 3.0 m', { size: 11, bold: true, color: C.red, h: 0.3 });
  label(s, 0.75, 4.95, 5.5, 'frequency stays **500 Hz** in both', { size: 11.5, h: 0.4 });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Inter-related', [
    '**Frequency** is set by the **source**, so it does **not change**.',
    'If the **speed changes**, the **wavelength changes** in proportion: v = f × λ, so **λ ∝ v**.',
    'Sound travels **fastest in solids**, then liquids, slowest in **gases** (particles closer together pass on vibrations faster).',
  ], { size: 12 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example', 'A 500 Hz sound passes from air (330 m/s) into water (1500 m/s).', [['Air', 'λ = 330 ÷ 500 = 0.66 m'], ['Water', 'λ = 1500 ÷ 500 = 3.0 m'], ['Answer', 'λ increases about 4.5 times; f unchanged']], { size: 11.5 });
  D.quickCheck(s, 'The same 500 Hz sound enters steel (5000 m/s). Calculate its wavelength in steel.');
  D.notes(s, 'QUICK CHECK ANSWER: λ = 5000 ÷ 500 = 10 m.\nSpec 4.16P (physics only; Higher only from memory, medium-low confidence).');
  reg(s, '4.16P Changing medium (HT, PHYSICS ONLY)');
}

// ======================= 26 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('4.12')}–${sp('4.16')} • sound, hearing, ultrasound`, [
  { q: 'State the range of frequencies humans can hear.', marks: 1, ms: '20 Hz to 20 000 Hz (1).' },
  { q: 'Explain how S-waves show that the Earth’s outer core is liquid.', marks: 2, ms: 'S-waves are transverse and cannot travel through liquids (1); they are not detected on the opposite side of the Earth / shadow zone (1).' },
  { q: 'Explain how ultrasound is used to produce an image of a foetus.', marks: 2, ms: 'Ultrasound partly reflects at boundaries between tissues (1); times of echoes used to calculate distances / build an image (1).' },
  { q: 'Describe what happens to the frequency and wavelength of sound passing from air into water.', marks: 2, ht: true, ms: 'Frequency stays the same (1); wavelength increases (as speed increases) (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 27 EQUATIONS =======================
reg(D.equationsSlide([['vfl', sp('4.6')], ['vxt', sp('4.6')]], {
  subtitle: 'Topic 4 equations • RECALL = learn it; GIVEN = on the Physics Equations List',
  qc: 'Rearrange each equation for every other quantity. Then write the unit of each quantity.',
  notes: 'QUICK CHECK: f = v ÷ λ; λ = v ÷ f; x = v × t; t = x ÷ v. Units: v m/s, f Hz, λ m, x m, t s. Both Topic 4 equations are RECALL. Period T = 1/f is a useful extra.',
}), 'Summary: equations');

// ======================= 28 KEY WORDS =======================
reg(D.keyWords([
  ['Wave', 'Transfers energy and information without transferring matter.'],
  ['Transverse', 'Vibrations at 90° to the direction of energy transfer.'],
  ['Longitudinal', 'Vibrations parallel to the direction of energy transfer.'],
  ['Wavelength (λ)', 'Distance between the same point on adjacent waves (m).'],
  ['Amplitude', 'Maximum displacement from the rest position.'],
  ['Frequency (f)', 'Number of waves passing a point per second (Hz).'],
  ['Period', 'Time for one complete wave: T = 1 ÷ f.'],
  ['Wavefront', 'Line joining the same point on each wave, e.g. crests.'],
  ['Compression', 'Region where particles are close together.'],
  ['Echo', 'A reflected sound wave.'],
  ['Refraction', 'Change in speed (and often direction) at a boundary.'],
  ['Absorption', 'Wave energy transferred to the material.'],
  ['Ultrasound', 'Sound above 20 000 Hz.'],
  ['Infrasound', 'Sound below 20 Hz.'],
  ['P-wave', 'Longitudinal seismic wave; travels through solids and liquids.'],
  ['S-wave', 'Transverse seismic wave; travels through solids only.'],
], { notes: 'Cover-and-recall. Physics-only terms: echo calculations, ultrasound, infrasound, P- and S-waves in the Earth’s core.' }), 'Summary: key words');

// ======================= 29 FULL QUESTION =======================
reg(D.fullQuestion('A student uses a ripple tank to study water waves, then reads about sonar.', [
  { l: 'a', q: 'Water waves are transverse. Describe what is meant by a transverse wave.', marks: 1, ms: 'Vibrations / oscillations perpendicular to the direction of energy transfer (1).' },
  { l: 'b', q: 'The waves have a frequency of 4.0 Hz and a wavelength of 2.5 cm. Calculate their speed in m/s.', marks: 3, ms: 'v = f × λ (1); 2.5 cm = 0.025 m (1); v = 4.0 × 0.025 = 0.10 m/s (1).' },
  { l: 'c', q: 'Describe how the student could measure the frequency of the waves accurately.', marks: 2, ms: 'Count waves passing a point in a measured time, e.g. 10 s, and divide (1); use a video / stroboscope to avoid counting errors (1).' },
  { l: 'd', q: 'The waves pass into shallower water. Explain what happens to their speed, wavelength and direction.', marks: 3, ms: 'Speed decreases (1); wavelength decreases (frequency constant) (1); direction changes / bends towards the normal if at an angle (1).', h: 1.2 },
  { l: 'e', q: 'Sonar uses ultrasound of frequency 30 kHz in water (1500 m/s). Calculate its wavelength.', marks: 2, ms: 'λ = 1500 ÷ 30 000 (1); = 0.05 m (1).' },
  { l: 'f', q: 'An echo returns 0.060 s after a pulse is sent. Calculate the depth of the water.', marks: 2, ms: '1500 × 0.060 = 90 m (1); ÷ 2 = 45 m (1).' },
], 13, { subtitle: 'Specification 4.5–4.6, 4.8P, 4.10, 4.13P, 4.17 • answer every part • 13 marks' }), 'Full question');

// ======================= 30–31 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Give **one** example of a transverse wave and **one** example of a longitudinal wave.', marks: 2, ms: 'Transverse: light / water / any EM / S-wave (1); longitudinal: sound / P-wave (1).' },
  { n: '2', q: 'A note has a frequency of **440 Hz** and a wavelength of **0.75 m**. Calculate its speed.', marks: 2, ms: 'v = 440 × 0.75 (1); = 330 m/s (1).' },
  { n: '3', q: 'A person hears the echo of a shout from a cliff **1.5 s** later. Sound travels at **340 m/s**. Calculate the distance to the cliff.', marks: 3, ms: 'x = v × t = 340 × 1.5 (1); = 510 m (1); ÷ 2 = 255 m (1).' },
  { n: '4', q: 'State the frequency limits of **ultrasound** and **infrasound**.', marks: 2, ms: 'Ultrasound above 20 000 Hz (1); infrasound below 20 Hz (1).' },
  { n: '5', q: 'Describe how to use a metal rod, a hammer and a frequency app to find the speed of sound in the rod.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Measure the length of the rod with a metre rule.',
    'Support / clamp the rod near its ends; hit one end with the hammer.',
    'Use a microphone with an app or oscilloscope to record the peak frequency.',
    'Wavelength = 2 × length of the rod.',
    'Calculate speed using v = f × λ.',
    'Repeat several times and calculate a mean; discard anomalies.',
    'Reduce background noise; read the ruler at eye level; safety: eye protection, care with the hammer.',
  ], 'Level 3 answers give a logical method including λ = 2L and v = f × λ, with repeats.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 15);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 6);
assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7);
assert(D.slideNo >= 30 && D.slideNo <= 38, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T4_Waves.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
