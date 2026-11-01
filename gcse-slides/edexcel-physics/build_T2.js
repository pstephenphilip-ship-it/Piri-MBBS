// build_T2.js — Edexcel GCSE Physics 1PH0 Topic 2 Motion and forces (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T2.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 2,
  title: 'Motion and forces',
  shortTitle: 'T2',
  subtitle: 'Describing motion, Newton’s laws, momentum and stopping distances',
  specRange: '2.1–2.33',
  pOnly: [], // no physics-only statements found: Topic 2 is also in Combined Science 1SC0
  paper: 'Paper 1',
  keywords: ['Speed', 'Acceleration', 'Motion graphs', 'Newton’s laws', 'Momentum', 'Stopping distance'],
};
const D = T.init(DECK);
const { line, arrow, forceArrow, label, box, massHanger, axes, points, plotLine, fnLine, px, py, areaTriangle, SH } = D;
const sp = D.spec;
const g = 10; // m/s² (N/kg): Edexcel 2.13 value
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const rad = d => d * Math.PI / 180;
const fmtN = v => v.toLocaleString('en-GB').replace(/,/g, ' ');

// ======================= DECK-SPECIFIC: Topic 2 equations (added to the shared table at run time) =======================
Object.assign(T.EQS, {
  sdt: { eq: 's = d ÷ t', words: 'average speed (m/s) = distance (m) ÷ time (s); also distance = average speed × time', status: 'recall' },
  avut: { eq: 'a = (v − u) ÷ t', words: 'acceleration (m/s²) = change in velocity (m/s) ÷ time taken (s)', status: 'recall' },
  suvat: { eq: 'v² − u² = 2 × a × x', words: '(final velocity (m/s))² − (initial velocity (m/s))² = 2 × acceleration (m/s²) × distance (m)', status: 'given' },
  pmv: { eq: 'p = m × v', words: 'momentum (kg m/s) = mass (kg) × velocity (m/s)   HT', status: 'recall' },
  Fdp: { eq: 'F = (mv − mu) ÷ t', words: 'force (N) = change in momentum (kg m/s) ÷ time (s)   HT', status: 'given' },
});

// ======================= DECK-SPECIFIC drawing helpers =======================
// trolley standing on ground line yb (wheel bottoms); returns top of body
function trolley(s, x, yb, w = 1.1, h = 0.36, fill = '5B7FD6', txt, o = {}) {
  const r = 0.09, top = yb - 2 * r - h + 0.03;
  box(s, x, top, w, h, fill, '2B3F7A', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
  [x + 0.2, x + w - 0.2].forEach(cx => s.addShape(SH.OVAL, { x: cx - r, y: yb - 2 * r, w: 2 * r, h: 2 * r, fill: { color: '3B4252' }, line: { color: '1F2430', width: 0.75 } }));
  if (txt) label(s, x, top, w, txt, { h, size: o.size || 10.5, bold: true, color: C.white });
  return top;
}
// side-view car on ground line yb; returns {top, mid}
function car(s, x, yb, w = 1.6, fill = '3A63C9', flip = false, txt) {
  const bodyH = w * 0.22, cabH = w * 0.17, rw = Math.max(0.1, w * 0.08);
  const bodyTop = yb - rw - bodyH;
  const cx = flip ? x + w * 0.12 : x + w * 0.33;
  box(s, cx, bodyTop - cabH + 0.02, w * 0.55, cabH, fill, '1F2A4A', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
  box(s, cx + 0.05, bodyTop - cabH + 0.06, w * 0.55 - 0.1, cabH - 0.06, 'DCE8FA', null, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  box(s, x, bodyTop, w, bodyH, fill, '1F2A4A', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  [x + w * 0.2, x + w * 0.8].forEach(c => s.addShape(SH.OVAL, { x: c - rw, y: yb - 2 * rw, w: 2 * rw, h: 2 * rw, fill: { color: '2A2F3A' }, line: { color: '1F2430', width: 0.75 } }));
  if (txt) label(s, x, bodyTop, w, txt, { h: bodyH, size: 10, bold: true, color: C.white });
  return { top: bodyTop - cabH, mid: bodyTop + bodyH / 2 };
}
// stick person, feet on yFeet; arms: 'down' | 'right' | 'left'
function person(s, cx, yFeet, hgt = 1.3, color = '3B4252', arms = 'down') {
  const head = hgt * 0.17, hip = yFeet - hgt * 0.45, neck = yFeet - hgt + head;
  s.addShape(SH.OVAL, { x: cx - head / 2, y: yFeet - hgt, w: head, h: head, fill: { color }, line: { color } });
  line(s, cx, neck, cx, hip, color, 3);
  line(s, cx, hip, cx - 0.18, yFeet, color, 3); line(s, cx, hip, cx + 0.18, yFeet, color, 3);
  const sh = neck + 0.12;
  if (arms === 'right') { line(s, cx, sh, cx + 0.42, sh, color, 3); line(s, cx, sh + 0.06, cx + 0.4, sh + 0.1, color, 3); }
  else if (arms === 'left') { line(s, cx, sh, cx - 0.42, sh, color, 3); line(s, cx, sh + 0.06, cx - 0.4, sh + 0.1, color, 3); }
  else { line(s, cx, sh, cx - 0.22, hip, color, 3); line(s, cx, sh, cx + 0.22, hip, color, 3); }
}
// double-headed dimension arrow with label above (or below)
function dim(s, x1, x2, y, txt, color = C.blue, o = {}) {
  arrow(s, x1, y, x2, y, color, 1.25, { tail: true });
  label(s, Math.min(x1, x2), o.below ? y + 0.04 : y - 0.3, Math.abs(x2 - x1), txt, { size: o.size || 10.5, bold: true, color });
}
// light gate seen from the side: post on the bench (yBench) up to a housing centred at beam height yBeam
function lightGate(s, x, yBench, yBeam, txt) {
  box(s, x - 0.04, yBeam - 0.2, 0.08, yBench - yBeam + 0.2, '8C96A8', '6B7385', { lw: 0.5 });
  box(s, x - 0.16, yBeam - 0.42, 0.32, 0.24, '2F3747', '1F2430', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
  s.addShape(SH.OVAL, { x: x - 0.045, y: yBeam - 0.345, w: 0.09, h: 0.09, fill: { color: C.red }, line: { color: C.red } });
  if (txt) label(s, x - 0.6, yBeam - 0.72, 1.2, txt, { size: 10, bold: true, color: C.ink });
}
function pulley(s, cx, cy, r = 0.13) {
  box(s, cx - 0.03, cy, 0.06, 0.32, '6B7385', null);
  s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: 'B0B7C6' }, line: { color: '4A5262', width: 1.25 } });
  s.addShape(SH.OVAL, { x: cx - 0.03, y: cy - 0.03, w: 0.06, h: 0.06, fill: { color: '4A5262' }, line: { color: '4A5262' } });
}
// rectangle shading under a graph between x-values a..b up to y-value v
function areaRect(s, G, a, b, v, color, tr = 55) {
  s.addShape(SH.RECTANGLE, { x: px(G, a), y: py(G, v), w: px(G, b) - px(G, a), h: py(G, 0) - py(G, v), fill: { color, transparency: tr }, line: { type: 'none' } });
}
// triangle under a falling line from (a, v) to (b, 0)
function areaFall(s, G, a, b, v, color, tr = 55) {
  s.addShape(SH.RIGHT_TRIANGLE, { x: px(G, a), y: py(G, v), w: px(G, b) - px(G, a), h: py(G, 0) - py(G, v), fill: { color, transparency: tr }, line: { type: 'none' } });
}
// triangle under a rising line from (a, 0) to (b, v)
function areaRise(s, G, a, b, v, color, tr = 55) {
  s.addShape(SH.RIGHT_TRIANGLE, { x: px(G, a), y: py(G, v), w: px(G, b) - px(G, a), h: py(G, 0) - py(G, v), flipH: true, fill: { color, transparency: tr }, line: { type: 'none' } });
}
// gradient triangle (dashed) from (x1,y1) to (x2,y2) on a graph with rise/run labels
function gradTri(s, G, x1, y1, x2, y2, run, rise, color = C.red) {
  line(s, px(G, x1), py(G, y1), px(G, x2), py(G, y1), color, 1.25, { dash: 'dash' });
  line(s, px(G, x2), py(G, y1), px(G, x2), py(G, y2), color, 1.25, { dash: 'dash' });
  label(s, px(G, x1), py(G, y1) + 0.02, px(G, x2) - px(G, x1), run, { size: 10, bold: true, color });
  label(s, px(G, x2) + 0.05, (py(G, y1) + py(G, y2)) / 2 - 0.14, 1.1, rise, { size: 10, bold: true, color, align: 'left' });
}
const lead = (s, x, y, x2, y2, t, w, al = 'left') => { line(s, x, y, x2, y2, C.grey, 0.75); label(s, al === 'right' ? x2 - w - 0.05 : x2 + 0.05, y2 - 0.14, w, t, { size: 10.5, bold: true, align: al, color: C.ink }); };

// ======================= CALCULATIONS (asserted) =======================
// starter
calc('starter 2.4 km', 2.4 * 1000, 2400); calc('starter 3 min', 3 * 60, 180);
calc('starter cyclist 600/120', 600 / 120, 5);
calc('starter resultant 80-50', 80 - 50, 30);
// 2.4 displacement
const disp = calc('displacement sqrt(400^2+300^2)', Math.hypot(400, 300), 500, 1e-9);
const dispAng = calc('bearing angle atan(300/400)', Math.atan2(300, 400) * 180 / Math.PI, 36.86989764584402, 1e-9);
calc('distance 400+300', 400 + 300, 700);
// 2.6 speed
const v6 = calc('runner 100/12.5', 100 / 12.5, 8.0, 1e-12);
const qc6 = calc('qc6 d = 25*120', 25 * 120, 3000, 1e-9);
// 2.7 d-t graph journey
const DT = [[0, 0], [20, 100], [30, 100], [50, 300]];
const vA = calc('d-t A 100/20', 100 / 20, 5, 1e-12), vC = calc('d-t C 200/20', (300 - 100) / (50 - 30), 10, 1e-12);
calc('d-t mean speed 300/50', 300 / 50, 6, 1e-12);
// 2.8 acceleration
const a8 = calc('a8 (30-12)/6.0', (30 - 12) / 6.0, 3.0, 1e-12);
const qc8 = calc('qc8 (5-25)/40', (5 - 25) / 40, -0.5, 1e-12);
// 2.10 v-t gradients
calc('vt A 20/10', 20 / 10, 2.0, 1e-12); calc('vt B 20/20', 20 / 20, 1.0, 1e-12);
const qc10 = calc('qc10 (0-20)/8', (0 - 20) / 8, -2.5, 1e-12);
// 2.10 area
const A1 = calc('area1 0.5*10*20', 0.5 * 10 * 20, 100), A2 = calc('area2 20*20', 20 * 20, 400), A3 = calc('area3 0.5*10*20', 0.5 * 10 * 20, 100);
const Atot = calc('area total', A1 + A2 + A3, 600);
calc('mean speed 600/40', Atot / 40, 15, 1e-12);
const qc11 = calc('qc11 area 0.5*6*12', 0.5 * 6 * 12, 36, 1e-12);
// 2.9 v^2 - u^2 = 2ax
const x9 = calc('x9 (30^2-10^2)/(2*2.0)', (30 ** 2 - 10 ** 2) / (2 * 2.0), 200, 1e-9);
const qc9 = calc('qc9 v = sqrt(2*10*5)', Math.sqrt(2 * g * 5.0), 10, 1e-12);
// 2.11 light gate
const v11 = calc('light gate 0.10/0.040', 0.10 / 0.040, 2.5, 1e-12);
const qcLG = calc('qc light gate 0.050/0.025', 0.050 / 0.025, 2.0, 1e-12);
// 2.14 / 2.15 Newton's laws
const R15 = calc('resultant 3600-600', 3600 - 600, 3000);
const a15 = calc('a15 3000/1200', R15 / 1200, 2.5, 1e-12);
const qc15 = calc('qc15 F = 70*3.0', 70 * 3.0, 210, 1e-9);
calc('qc15b a = 4.0/0.50', 4.0 / 0.50, 8.0, 1e-12);
// 2.16 weight
const W16 = calc('W 2.0 kg Earth', 2.0 * g, 20, 1e-12), Wm16 = calc('W 2.0 kg Moon', 2.0 * 1.6, 3.2, 1e-12);
const qc16 = calc('qc16 m = 650/10', 650 / g, 65, 1e-12);
// 2.22 inertial mass
const mi = calc('inertial m = 2.4/0.60', 2.4 / 0.60, 4.0, 1e-12);
const aI1 = calc('10 N on 2 kg', 10 / 2, 5), aI2 = calc('10 N on 5 kg', 10 / 5, 2);
// 2.23 third law skaters 120 N
const aS1 = calc('skater 60 kg 120/60', 120 / 60, 2.0, 1e-12), aS2 = calc('skater 40 kg 120/40', 120 / 40, 3.0, 1e-12);
// 2.19 CP: light gates and sample data (F = 1.0 N, total mass varied)
const cpv1 = calc('cp v1 0.10/0.20', 0.10 / 0.20, 0.50, 1e-12), cpv2 = calc('cp v2 0.10/0.050', 0.10 / 0.050, 2.0, 1e-12);
const cpa = calc('cp a (2.0-0.50)/0.75', (cpv2 - cpv1) / 0.75, 2.0, 1e-12);
const CPm = [0.50, 0.70, 0.90, 1.10, 1.30];
const CPa = CPm.map(m => +(1.0 / m - 0.04).toFixed(2)); // measured: slightly less than F/m (friction not fully compensated)
assert.deepStrictEqual(CPa, [1.96, 1.39, 1.07, 0.87, 0.73]);
const CPth = CPm.map(m => sf(1.0 / m, 3));
assert.deepStrictEqual(CPth, [2, 1.43, 1.11, 0.909, 0.769]);
CPm.forEach((m, i) => assert(CPa[i] * m < 1.0 && CPa[i] * m > 0.94, 'F = ma within 6%'));
calc('cp qc ma 0.90*1.07', sf(0.90 * 1.07, 2), 0.96, 1e-12);
// varying force (part 1): total mass 1.0 kg
const CPF = [0.2, 0.4, 0.6, 0.8, 1.0];
CPF.forEach(F => calc(`cp a = ${F}/1.0`, F / 1.0, F, 1e-12));
// 2.24 momentum
const p24 = calc('p car 1200*15', 1200 * 15, 18000);
const qc24 = calc('qc24 p ball 0.16*25', 0.16 * 25, 4.0, 1e-12);
// 2.25 collision
const pBefore = calc('p before 0.80*1.5', 0.80 * 1.5, 1.2, 1e-12);
const vAfter = calc('v after 1.2/1.2', pBefore / (0.80 + 0.40), 1.0, 1e-12);
const vRecoil = calc('explosion 40*3.0/60', 40 * 3.0 / 60, 2.0, 1e-12);
// 2.26 F = change in p / t
const Fc1 = calc('crash 18000/0.05', 18000 / 0.05, 360000, 1e-6), Fc2 = calc('crash 18000/0.20', 18000 / 0.20, 90000, 1e-6);
const qc26 = calc('qc26 0.45*20/0.010', 0.45 * 20 / 0.010, 900, 1e-6);
// 2.27 reaction-time ruler: d = ½ g t²
const RT = [0.10, 0.15, 0.20, 0.25].map(t => [t, 0.5 * g * t * t * 100]);
assert.deepStrictEqual(RT.map(r => Math.round(r[1])), [5, 11, 20, 31]);
const think20 = calc('thinking 0.70*20', 0.70 * 20, 14, 1e-12);
// 2.28-2.32 stopping distances model: reaction 0.70 s, deceleration 6.25 m/s²
const SPD = [10, 15, 20, 25, 30];
const TH = SPD.map(v => calc(`think ${v}`, 0.70 * v, [7, 10.5, 14, 17.5, 21][SPD.indexOf(v)], 1e-9));
const BR = SPD.map(v => calc(`brake ${v}`, v * v / (2 * 6.25), [8, 18, 32, 50, 72][SPD.indexOf(v)], 1e-9));
const ST = SPD.map((v, i) => calc(`stop ${v}`, TH[i] + BR[i], [15, 28.5, 46, 67.5, 93][i], 1e-9));
calc('brake ratio 20 vs 10', BR[2] / BR[0], 4, 1e-12);
calc('think ratio 20 vs 10', TH[2] / TH[0], 2, 1e-12);
const mph = v => Math.round(v * 2.237);
assert.deepStrictEqual(SPD.map(mph), [22, 34, 45, 56, 67]);
// 2.31 decelerations: 60 kg passenger from 20 m/s
const DEC = [3.0, 0.20, 0.05].map(t => [t, 20 / t, 60 * 20 / t]);
calc('dec normal a', sf(DEC[0][1], 2), 6.7, 1e-12); calc('dec normal F', DEC[0][2], 400, 1e-9);
calc('dec crumple a', DEC[1][1], 100, 1e-9); calc('dec crumple F', DEC[1][2], 6000, 1e-9);
calc('dec rigid a', DEC[2][1], 400, 1e-9); calc('dec rigid F', DEC[2][2], 24000, 1e-9);
// 2.33 braking work: 1200 kg, braking force 6000 N
const KE20 = calc('KE 0.5*1200*20^2', 0.5 * 1200 * 20 ** 2, 240000, 1e-6);
const dB20 = calc('braking d = 240000/6000', KE20 / 6000, 40, 1e-9);
calc('braking d at 30 = 0.5*1200*900/6000', 0.5 * 1200 * 900 / 6000, 90, 1e-9);
calc('braking d at 40', 0.5 * 1200 * 1600 / 6000, 160, 1e-9);
const qc33 = calc('qc33 d = 0.5*1000*15^2/5000', 0.5 * 1000 * 15 ** 2 / 5000, 22.5, 1e-9);
// recaps
calc('R1 450/30', 450 / 30, 15, 1e-12);
calc('R2 (8.0-2.0)/4.0', (8.0 - 2.0) / 4.0, 1.5, 1e-12); calc('R2 area 0.5*6*12', 0.5 * 6 * 12, 36, 1e-12);
calc('R3 v = sqrt(2*10*20)', Math.sqrt(2 * g * 20), 20, 1e-12);
calc('R4 a = 1800/900', 1800 / 900, 2.0, 1e-12); calc('R4 W = 5.0*10', 5.0 * g, 50, 1e-12);
calc('R5 m = 6.0/1.5', 6.0 / 1.5, 4.0, 1e-12);
calc('R6 v = 0.10/0.050', 0.10 / 0.050, 2.0, 1e-12); calc('R6 a = (2.0-0.50)/0.75', (2.0 - 0.50) / 0.75, 2.0, 1e-12);
calc('R7 p = 0.40*5.0', 0.40 * 5.0, 2.0, 1e-12); calc('R7 v = 1500*8/2000', 1500 * 8.0 / 2000, 6.0, 1e-12);
calc('R8 d = 0.5*1000*20^2/5000', 0.5 * 1000 * 400 / 5000, 40, 1e-9);
// full question
calc('FQ a = 15/6.0', 15 / 6.0, 2.5, 1e-12); calc('FQ F = 1200*2.5', 1200 * 2.5, 3000, 1e-9);
calc('FQ x = 15^2/(2*2.5)', 15 ** 2 / (2 * 2.5), 45, 1e-9); calc('FQ p = 1200*15', 1200 * 15, 18000);
calc('FQ F = 18000/0.30', 18000 / 0.30, 60000, 1e-6); calc('FQ think 0.5*15', 0.5 * 15, 7.5, 1e-12);
// homework
calc('HW v = 3000/600', 3000 / 600, 5.0, 1e-12); calc('HW F = 70*4.0', 70 * 4.0, 280, 1e-9);
calc('HW p = 0.80*2.5', 0.80 * 2.5, 2.0, 1e-12); calc('HW v = 2.0/2.0', 2.0 / (0.80 + 1.2), 1.0, 1e-12);

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Motion and Forces',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • Core Practical 2.19 (force, mass and acceleration)` },
    { icon: 'H', text: 'Higher & Foundation in one deck • Higher-only content carries a red HT pill' },
    { icon: '2', text: `Topic 2 of 15 • ${DECK.paper}` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 2 Motion and forces (Paper 1). Every statement 2.1–2.33 appears to be shared with Combined Science 1SC0 (no P statements found). Higher-only (H): 2.20–2.22, 2.24–2.26, 2.33, plus the momentum part of 2.23 and the force-estimate part of 2.31 – see SPEC_T2.md for confidence notes. Vectors, free body diagrams and resolution are taught in full in Topic 9; this deck only recaps them.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '2.1–2.6', text: 'Explain **scalars and vectors**; use **average speed = distance ÷ time**; know that velocity is speed in a stated direction.' },
  { code: '2.7–2.10', text: 'Use **a = (v − u) ÷ t** and **v² − u² = 2ax**; analyse **distance–time** and **velocity–time** graphs.' },
  { code: '2.11–2.13', text: 'Describe how to **measure speed** (light gates); recall **typical speeds** and **g = 10 m/s²**.' },
  { code: '2.14–2.18', text: 'Apply **Newton’s first and second laws**; use **F = m × a** and **W = m × g**; describe how weight is measured.' },
  { code: '2.19', text: '**Core Practical:** investigate force, mass and acceleration by varying the masses added to trolleys.' },
  { code: '2.20–2.22', text: 'Explain **circular motion** and **centripetal force**; define **inertial mass**.', ht: true },
  { code: '2.23–2.26', text: 'Apply **Newton’s third law**; use **p = m × v**, conservation of momentum and **F = Δp ÷ t**.', ht: true },
  { code: '2.27–2.33', text: 'Explain **reaction times** and **stopping distances**, large decelerations and braking work done.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'HT pills mark objectives that are wholly or partly Higher only: 2.20–2.22, 2.24–2.26 (and the momentum link in 2.23). 2.31 (estimating forces) and 2.33 (braking work and v²) are also Higher – they carry HT pills on their slides. Confidence notes in SPEC_T2.md.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 2 is assessed on Paper 1`, { tag: 'Context' });
  const nodes = [
    ['2.1–2.7', 'Scalars, vectors, speed, distance–time graphs', 'BOTH TIERS', C.blue],
    ['2.8–2.13', 'Acceleration, v–t graphs, v² − u² = 2ax, g', 'BOTH TIERS', C.blue],
    ['2.14–2.18', 'Newton’s first and second laws; weight', 'BOTH TIERS', C.blue],
    ['2.19', 'Core Practical: force, mass and acceleration', 'CORE PRACTICAL', C.orange],
    ['2.20–2.22', 'Circular motion; inertial mass', 'HT ONLY', C.red],
    ['2.23–2.26', 'Newton’s third law; momentum', 'MOSTLY HT', C.red],
    ['2.27–2.33', 'Reaction time, stopping distance, braking', 'BOTH • SOME HT', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 2\nMotion and forces', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.0, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.65, y + 0.12, who, col, 1.3);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 units • Topic 3 kinetic energy • Topic 8 work done • Topic 9 vectors and free body diagrams', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–7.',
      'Combined Science 1SC0 **Paper 5** (Physics 1) tests the same Topic 2 statements.',
      '**Recall** s = d/t, a = (v − u)/t, F = ma, W = mg, p = mv; **given** v² − u² = 2ax and F = (mv − mu)/t.',
      'Core Practical 2.19 can be examined in any style.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**Combined (1SC0) classes skip nothing:** no physics-only (P) statements were found in Topic 2.',
      '**HT pills** mark Higher-only content: circular motion, inertial mass, momentum, estimating crash forces and braking work.',
      'Vectors and free body diagrams are **recapped** here and taught fully in Topic 9.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Physics-only statements: none found (medium confidence – the 1SC0 Topic 2 list appears identical). Higher-only (H): 2.20, 2.21, 2.22, 2.24, 2.25, 2.26, 2.33; partly H: 2.23 (relating the third law to conservation of momentum) and 2.31 (estimating the forces). Check the bold H markers in the Pearson spec PDF before publishing; see SPEC_T2.md.\nFoundation-only classes can skip slides 21–22 and 30–32, and the HT parts of later slides.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • units', q: 'Convert **2.4 km** into metres and **3 minutes** into seconds.' },
  { from: 'Topic 1 • standard form', q: 'Write **340 000 m** and **0.045 s** in standard form.' },
  { from: 'KS3 • speed', q: 'A cyclist travels **600 m** in **120 s**. Calculate the cyclist’s speed.' },
  { from: 'KS3 • forces', q: 'A box has **50 N** pulling left and **80 N** pulling right. Find the **resultant force**.' },
  { from: 'KS3 • mass and weight', q: 'Give **one difference** between mass and weight, and the **unit** of each.' },
  { from: 'Topic 1 • rearranging', q: 'Rearrange **F = m × a** to make **a** the subject.' },
], { subtitle: 'Recall from Topic 1 and Key Stage 3 • 6 minutes • no notes', notes: 'ANSWERS\n1. 2400 m; 180 s.\n2. 3.4 × 10⁵ m; 4.5 × 10⁻² s.\n3. 600 ÷ 120 = 5 m/s.\n4. 30 N to the right.\n5. Mass is the amount of matter (kg) and is the same everywhere; weight is the force of gravity on it (N) and depends on g.\n6. a = F ÷ m.' }), 'Retrieval starter');

// ======================= 5 SCALARS AND VECTORS =======================
{
  const G0 = { x: 1.0, y: 1.75, sq: 0.36 };
  reg(D.contentSlide({
    title: 'Scalars and vectors',
    subtitle: `Specification ${sp('2.1')}–${sp('2.4')} • size only, or size and direction (recap of Topic 9.2)`,
    tag: '2.1', caption: 'a walk drawn to scale: 1 square = 50 m',
    draw: (s, p) => {
      const sq = G0.sq, nx = 12, ny = 9;
      box(s, G0.x, G0.y, nx * sq, ny * sq, C.white, null);
      for (let i = 0; i <= nx; i++) line(s, G0.x + i * sq, G0.y, G0.x + i * sq, G0.y + ny * sq, 'E2E8F2', 0.5);
      for (let j = 0; j <= ny; j++) line(s, G0.x, G0.y + j * sq, G0.x + nx * sq, G0.y + j * sq, 'E2E8F2', 0.5);
      const ox = G0.x + 2 * sq, oy = G0.y + 8 * sq, k = sq / 50; // 400 m east = 8 squares, 300 m north = 6 squares
      arrow(s, ox, oy, ox + 400 * k, oy, C.blue, 3);
      arrow(s, ox + 400 * k, oy, ox + 400 * k, oy - 300 * k, C.blue, 3);
      arrow(s, ox, oy, ox + 400 * k, oy - 300 * k, C.red, 3);
      s.addShape(SH.OVAL, { x: ox - 0.07, y: oy - 0.07, w: 0.14, h: 0.14, fill: { color: C.ink }, line: { color: C.ink } });
      label(s, ox - 0.6, oy + 0.06, 0.9, 'start', { size: 10.5, bold: true });
      label(s, ox + 0.6, oy + 0.04, 2.0, '400 m east', { size: 11, bold: true, color: C.blue });
      label(s, ox + 400 * k + 0.08, oy - 150 * k - 0.14, 1.2, '300 m north', { size: 11, bold: true, color: C.blue, align: 'left' });
      label(s, ox + 0.15, oy - 160 * k - 0.45, 2.0, 'displacement\n500 m', { h: 0.5, size: 11, bold: true, color: C.red, align: 'left' });
      // north arrow
      arrow(s, G0.x + 0.3, G0.y + 1.1, G0.x + 0.3, G0.y + 0.35, C.ink, 2); label(s, G0.x + 0.15, G0.y + 0.1, 0.3, 'N', { size: 12, bold: true });
    },
    head: 'Size only, or size and direction?',
    lines: [
      'A **scalar** has **magnitude (size)** but **no direction**. A **vector** has **magnitude and a direction**.',
      { t: '**Scalars:** distance, speed, mass, energy, time', nob: true },
      { t: '**Vectors:** displacement, velocity, acceleration, force, weight, momentum', nob: true },
      'Walk 400 m east then 300 m north: **distance = 700 m** (scalar); **displacement = 500 m** in a straight line north-east of the start (vector).',
    ],
    worked: { head: 'Pairs to learn', q: 'Each vector has a matching scalar.',
      steps: [['distance', '→ displacement (distance in a stated direction)'], ['speed', '→ velocity (speed in a stated direction)'], ['mass', '→ weight is a force, a vector (pulls down)'], ['Answer', 'a vector always needs a direction']] , size: 10.5 },
    qc: 'A runner completes one full lap of a 400 m track. State the distance travelled and the displacement.',
    notes: `QUICK CHECK ANSWER: Distance = 400 m; displacement = 0 m (finishes where she started).\nDiagram: √(400² + 300²) = ${disp} m at ${dispAng.toFixed(0)}° north of east (checked in node). The angle is not needed at this level; 2.4 lists displacement/distance, velocity/speed, acceleration, force, weight/mass, momentum, energy. Vector diagrams are taught fully in Topic 9 (9.2–9.3).`,
  }), '2.1–2.4 Scalars and vectors');
}

// ======================= 6 SPEED AND VELOCITY =======================
reg(D.contentSlide({
  title: 'Speed and velocity',
  subtitle: `Specification ${sp('2.5')}, ${sp('2.6')} • average speed = distance ÷ time`,
  tag: '2.6', caption: 'same speed, different velocities: direction matters',
  draw: (s, p) => {
    // road with two cars
    box(s, 0.75, 1.75, 5.5, 1.55, '5A6275', null);
    line(s, 0.75, 2.52, 6.25, 2.52, 'F5F5F5', 2, { dash: 'dash' });
    car(s, 1.0, 2.35, 1.5, C.blue, false);
    arrow(s, 2.65, 2.0, 3.65, 2.0, C.white, 3); label(s, 3.7, 1.86, 1.9, '+20 m/s (east)', { size: 11, bold: true, color: C.white, align: 'left' });
    car(s, 4.5, 3.13, 1.5, C.red, true);
    arrow(s, 4.35, 2.8, 3.35, 2.8, C.white, 3); label(s, 1.3, 2.66, 2.0, '−20 m/s (west)', { size: 11, bold: true, color: C.white, align: 'right' });
    label(s, 0.75, 3.35, 5.5, 'both cars: speed 20 m/s • velocities +20 m/s and −20 m/s', { size: 10.5, italic: true, color: C.grey });
    // sprinter timing
    box(s, 0.75, 4.0, 5.5, 0.5, 'C9774B', null);
    line(s, 1.0, 3.85, 1.0, 4.65, C.white, 3); line(s, 6.0, 3.85, 6.0, 4.65, C.white, 3);
    person(s, 1.3, 4.3, 0.9, C.ink, 'right');
    dim(s, 1.0, 6.0, 4.95, 'distance = 100 m', C.blue, { below: true });
    label(s, 3.4, 5.35, 2.8, 'time = 12.5 s', { size: 11, bold: true, color: C.red });
  },
  head: 'Speed tells you how fast; velocity adds direction',
  lines: [
    '**Velocity** is **speed in a stated direction**: a vector. Speed is a scalar.',
    { t: '__average speed = distance ÷ time__   s = d ÷ t   (m/s, m, s)', nob: true },
    { t: '__distance = average speed × time__', nob: true },
    { t: 'RECALL: you must learn both forms.', nob: true, color: C.red, b: true, size: 10.5 },
    'An object moving in a circle at a steady speed has a **changing velocity**, because its direction changes.',
  ],
  worked: { head: 'Worked example', q: 'A sprinter runs 100 m in 12.5 s. Calculate her average speed.',
    steps: [['Equation', 'average speed = distance ÷ time'], ['Substitute', 's = 100 m ÷ 12.5 s'], ['Check', 'about 8 m/s is a sensible sprinting speed'], ['Answer', `s = ${v6.toFixed(1)} m/s`]] },
  qc: 'A car travels at an average speed of 25 m/s for 2.0 minutes. Calculate the distance it travels.',
  notes: `QUICK CHECK ANSWER: t = 120 s; d = s × t = 25 × 120 = ${fmtN(qc6)} m (3.0 km).\nCommon error: forgetting to convert minutes to seconds.`,
}), '2.5–2.6 Speed and velocity');

// ======================= 7 DISTANCE–TIME GRAPHS =======================
const GDT = { x: 1.4, y: 1.55, w: 4.8, h: 3.7, xmin: 0, xmax: 50, ymin: 0, ymax: 300, xstep: 10, ystep: 50, minor: 2, xlabel: 'time / s', ylabel: 'distance / m', fmt: v => String(v) };
reg(D.contentSlide({
  title: 'Distance–time graphs',
  subtitle: `Specification ${sp('2.7')} • speed = gradient of a distance–time graph`,
  tag: '2.7', caption: 'a cyclist’s journey, plotted to scale',
  draw: (s, p) => {
    axes(s, GDT);
    plotLine(s, GDT, DT, C.blue, 2.5);
    gradTri(s, GDT, 30, 100, 50, 300, '20 s', '200 m');
    label(s, px(GDT, 3), py(GDT, 120), 1.0, 'A', { size: 13, bold: true, color: C.blue });
    label(s, px(GDT, 20), py(GDT, 100) - 0.34, px(GDT, 30) - px(GDT, 20), 'B', { size: 13, bold: true, color: C.blue });
    label(s, px(GDT, 33), py(GDT, 230), 0.5, 'C', { size: 13, bold: true, color: C.blue });
  },
  head: 'Reading a distance–time graph',
  lines: [
    '**Gradient = speed.** Steeper line → faster.',
    '**A:** straight sloping line → constant speed: 100 m ÷ 20 s = **5 m/s**.',
    '**B:** horizontal line → **stationary** (not moving).',
    '**C:** steeper straight line → faster constant speed.',
    'A **curved** line means the speed is changing (accelerating).',
  ],
  worked: { head: 'Worked example', q: 'Calculate the speed in section C.',
    steps: [['Equation', 'speed = gradient = change in distance ÷ change in time'], ['Read off', 'Δd = 300 − 100 = 200 m;  Δt = 50 − 30 = 20 s'], ['Substitute', 'speed = 200 m ÷ 20 s'], ['Answer', `speed = ${vC} m/s`]] },
  qc: 'Calculate the average speed for the whole 50 s journey. Why is it not the mean of 5 m/s and 10 m/s?',
  notes: `QUICK CHECK ANSWER: average speed = total distance ÷ total time = 300 ÷ 50 = 6 m/s. The cyclist spends different times at each speed (and 10 s stopped), so you cannot just average the speeds.\nGraph checked in node: A ${vA} m/s, B 0 m/s, C ${vC} m/s.`,
}), '2.7 Distance–time graphs');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('2.1')}–${sp('2.7')} • scalars, vectors, speed and distance–time graphs`, [
  { q: 'Explain the difference between a **scalar** and a **vector** quantity. Give **one** example of each.', marks: 2, ms: 'Scalar has magnitude/size only, vector has magnitude and direction (1); one correct example of each, e.g. speed / velocity (1).' },
  { q: 'A car travels **450 m** in **30 s**. Calculate its average speed. Give the unit.', marks: 3, ms: 'speed = distance ÷ time (1); = 450 ÷ 30 (1); = 15 m/s (1, unit needed).' },
  { q: 'Describe what a **horizontal** section and a **steeper straight** section of a distance–time graph each show.', marks: 2, ms: 'Horizontal: object is stationary / not moving (1); steeper straight line: moving at a greater constant speed (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 ACCELERATION =======================
reg(D.contentSlide({
  title: 'Acceleration: a = (v − u) ÷ t',
  subtitle: `Specification ${sp('2.8')} • acceleration is the rate of change of velocity`,
  tag: '2.8', caption: 'a car speeding up: positions every 1.0 s are not equally spaced',
  draw: (s, p) => {
    box(s, 0.75, 2.85, 5.5, 0.08, '5A6275', null);
    // positions at t = 0,1,2,3 s for u=0, a=?  (illustrative: x = 0.5 a t² with a scaled)
    const xs = [0, 1, 2, 3].map(t => 0.75 + 0.7 * t + 0.3 * t * t);
    xs.forEach((x, i) => { car(s, x, 2.85, 0.7, i === 3 ? C.blue : 'A9B8DE'); label(s, x - 0.1, 2.95, 0.95, `t = ${i} s`, { size: 10, bold: true, color: C.ink }); });
    label(s, 0.75, 3.3, 5.5, 'gaps grow each second → the car is accelerating', { size: 10.5, italic: true, color: C.grey });
    // equation box
    box(s, 0.95, 3.85, 5.1, 1.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.95, 3.95, 5.1, 'a = (v − u) ÷ t', { size: 22, bold: true, color: C.ink, h: 0.5 });
    label(s, 1.1, 4.5, 4.8, 'a = acceleration (m/s²)     v = final velocity (m/s)', { size: 11, color: C.text, h: 0.3 });
    label(s, 1.1, 4.82, 4.8, 'u = initial velocity (m/s)     t = time taken (s)', { size: 11, color: C.text, h: 0.3 });
    label(s, 1.1, 5.2, 4.8, 'negative a = deceleration (slowing down)', { size: 11, bold: true, color: C.red, h: 0.3 });
  },
  head: 'Acceleration',
  lines: [
    '**Acceleration** = change in velocity ÷ time taken. Unit: **m/s²** (metres per second, per second).',
    'An acceleration of 3 m/s² means the velocity **increases by 3 m/s every second**.',
    { t: 'RECALL: you must learn a = (v − u) ÷ t.', nob: true, color: C.red, b: true, size: 10.5 },
    'Acceleration is a **vector**. A **deceleration** is a negative acceleration.',
  ],
  worked: { head: 'Worked example', q: 'A car speeds up from 12 m/s to 30 m/s in 6.0 s. Calculate its acceleration.',
    steps: [['Equation', 'a = (v − u) ÷ t'], ['Substitute', 'a = (30 − 12) m/s ÷ 6.0 s = 18 ÷ 6.0'], ['Check', 'velocity rises by 3 m/s each second ✓'], ['Answer', `a = ${a8.toFixed(1)} m/s²`]] },
  qc: 'A train slows from 25 m/s to 5 m/s in 40 s. Calculate its acceleration. What does the sign tell you?',
  notes: `QUICK CHECK ANSWER: a = (5 − 25) ÷ 40 = ${qc8} m/s². Negative → deceleration of 0.50 m/s².\nDiagram positions are illustrative (uniform acceleration from a non-zero starting speed: gaps grow by the same amount each second).`,
}), '2.8 Acceleration');

// ======================= 10 VELOCITY–TIME GRAPHS: GRADIENT =======================
const GVT1 = { x: 1.4, y: 1.55, w: 4.8, h: 3.7, xmin: 0, xmax: 25, ymin: 0, ymax: 25, xstep: 5, ystep: 5, minor: 2, xlabel: 'time / s', ylabel: 'velocity / m/s', fmt: v => String(v) };
reg(D.contentSlide({
  title: 'Velocity–time graphs: gradient',
  subtitle: `Specification ${sp('2.10')} • acceleration = gradient of a velocity–time graph`,
  tag: '2.10', caption: 'two cars starting from rest, plotted to scale',
  draw: (s, p) => {
    axes(s, GVT1);
    plotLine(s, GVT1, [[0, 0], [10, 20], [25, 20]], C.red, 2.5);
    plotLine(s, GVT1, [[0, 0], [20, 20], [25, 20]], C.blue, 2.5);
    gradTri(s, GVT1, 0, 0, 10, 20, '', '', C.red);
    label(s, px(GVT1, 1), py(GVT1, 19), 1.3, 'car A', { size: 11, bold: true, color: C.red, align: 'left' });
    label(s, px(GVT1, 14.5), py(GVT1, 11.5), 1.3, 'car B', { size: 11, bold: true, color: C.blue, align: 'left' });
    label(s, px(GVT1, 10.3), py(GVT1, 17), 1.6, 'Δv = 20 m/s', { size: 10, bold: true, color: C.red, align: 'left' });
    label(s, px(GVT1, 0), py(GVT1, 0) - 0.3, px(GVT1, 10) - px(GVT1, 0), 'Δt = 10 s', { size: 10, bold: true, color: C.red });
    label(s, px(GVT1, 18), py(GVT1, 22.5), 2.0, 'horizontal = constant velocity', { size: 10, italic: true, color: C.ink });
  },
  head: 'Reading a velocity–time graph',
  lines: [
    '**Gradient = acceleration.** Steeper line → greater acceleration (compare qualitatively).',
    'Horizontal line → **constant velocity** (a = 0).',
    'Line sloping **down** → deceleration (negative gradient).',
    'Car A reaches 20 m/s in half the time of car B, so A has **twice** the acceleration.',
  ],
  worked: { head: 'Worked example', q: 'Calculate the acceleration of car A from the gradient.',
    steps: [['Equation', 'a = gradient = Δv ÷ Δt'], ['Read off', 'Δv = 20 − 0 = 20 m/s;  Δt = 10 s'], ['Substitute', 'a = 20 m/s ÷ 10 s'], ['Answer', 'a = 2.0 m/s²  (car B: 20 ÷ 20 = 1.0 m/s²)']] },
  qc: 'A cyclist slows steadily from 20 m/s to rest in 8.0 s. Sketch the line and calculate the gradient.',
  notes: `QUICK CHECK ANSWER: straight line sloping down to the time axis; gradient = (0 − 20) ÷ 8.0 = ${qc10} m/s² (deceleration 2.5 m/s²).\nSpec 2.10(b): calculate acceleration from the gradient for uniform acceleration only.`,
}), '2.10 v–t graphs: gradient');

// ======================= 11 VELOCITY–TIME GRAPHS: AREA =======================
const GVT2 = { x: 1.4, y: 1.55, w: 4.8, h: 3.7, xmin: 0, xmax: 40, ymin: 0, ymax: 25, xstep: 5, ystep: 5, minor: 2, xlabel: 'time / s', ylabel: 'velocity / m/s', fmt: v => String(v) };
reg(D.contentSlide({
  title: 'Velocity–time graphs: area = distance',
  subtitle: `Specification ${sp('2.10')} • area between the line and the time axis = distance travelled`,
  tag: '2.10', caption: 'a 40 s journey: split the area into triangles and a rectangle',
  draw: (s, p) => {
    axes(s, GVT2);
    areaRise(s, GVT2, 0, 10, 20, 'F5A742');
    areaRect(s, GVT2, 10, 30, 20, '5B9BD5');
    areaFall(s, GVT2, 30, 40, 20, '2E8B57');
    plotLine(s, GVT2, [[0, 0], [10, 20], [30, 20], [40, 0]], C.ink, 2.5);
    label(s, px(GVT2, 5), py(GVT2, 6), px(GVT2, 10) - px(GVT2, 5), '1', { size: 14, bold: true, color: C.orange });
    label(s, px(GVT2, 10), py(GVT2, 11), px(GVT2, 30) - px(GVT2, 10), `2  = 20 × 20 = ${A2} m`, { size: 11, bold: true, color: C.ink });
    label(s, px(GVT2, 30), py(GVT2, 6), px(GVT2, 35) - px(GVT2, 30), '3', { size: 14, bold: true, color: C.green });
  },
  head: 'Finding the distance',
  lines: [
    'The **area under** a velocity–time graph = **distance travelled** (uniform acceleration: triangles and rectangles).',
    { t: 'Triangle: ½ × base × height.   Rectangle: base × height.', nob: true },
    'Area 1 (speeding up), area 2 (steady 20 m/s), area 3 (slowing down).',
  ],
  worked: { head: 'Worked example', q: 'Calculate the total distance travelled in 40 s.',
    steps: [['Area 1', `½ × 10 s × 20 m/s = ${A1} m`], ['Area 2', `20 s × 20 m/s = ${A2} m`], ['Area 3', `½ × 10 s × 20 m/s = ${A3} m`], ['Answer', `distance = ${A1} + ${A2} + ${A3} = ${Atot} m`]] },
  qc: 'A runner accelerates uniformly from rest to 12 m/s in 6.0 s. Use the area under the graph to find the distance.',
  notes: `QUICK CHECK ANSWER: triangle ½ × 6.0 × 12 = ${qc11} m.\nAverage speed for the slide journey = 600 ÷ 40 = 15 m/s (checked). Tier: no H marker was found for 2.10(c) in our checks, so it is taught to both tiers – see SPEC_T2.md.`,
}), '2.10 v–t graphs: area');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('2.8')}, ${sp('2.10')} • acceleration and velocity–time graphs`, [
  { q: 'A cyclist speeds up from **2.0 m/s** to **8.0 m/s** in **4.0 s**. Calculate the acceleration. Give the unit.', marks: 3, ms: 'a = (v − u) ÷ t (1); = (8.0 − 2.0) ÷ 4.0 (1); = 1.5 m/s² (1, unit needed).' },
  { q: 'State what is shown by (i) the **gradient** and (ii) the **area under the line** of a velocity–time graph.', marks: 2, ms: '(i) acceleration (1); (ii) distance travelled (1).' },
  { q: 'A car accelerates uniformly from rest to **12 m/s** in **6.0 s**. Use the velocity–time graph idea to calculate the distance travelled.', marks: 2, ms: 'area = ½ × 6.0 × 12 (1); = 36 m (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 v² − u² = 2ax =======================
reg(D.contentSlide({
  title: 'Using v² − u² = 2 × a × x',
  subtitle: `Specification ${sp('2.9')} • links velocities, acceleration and distance (no time needed)`,
  tag: '2.9', caption: 'a car accelerating along a slip road (not to scale)',
  draw: (s, p) => {
    box(s, 0.75, 2.75, 5.5, 0.08, '5A6275', null);
    car(s, 0.85, 2.75, 1.3, 'A9B8DE');
    car(s, 4.75, 2.75, 1.3, C.blue);
    arrow(s, 1.35, 1.75, 2.35, 1.75, C.green, 2.5); label(s, 0.8, 1.45, 2.2, 'u = 10 m/s', { size: 11, bold: true, color: C.green });
    arrow(s, 4.9, 1.75, 6.1, 1.75, C.red, 2.5); label(s, 4.6, 1.45, 2.0, 'v = 30 m/s', { size: 11, bold: true, color: C.red });
    dim(s, 1.5, 5.4, 3.15, 'x = ? (distance)', C.ink, { below: true });
    label(s, 2.3, 2.0, 2.4, 'a = 2.0 m/s²', { size: 12, bold: true, color: C.blue });
    box(s, 0.95, 3.95, 5.1, 1.75, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.95, 4.02, 5.1, 'v² − u² = 2 × a × x', { size: 22, bold: true, color: C.ink, h: 0.5 });
    label(s, 1.1, 4.55, 4.8, 'v = final velocity (m/s)   u = initial velocity (m/s)', { size: 11, h: 0.3 });
    label(s, 1.1, 4.87, 4.8, 'a = acceleration (m/s²)   x = distance (m)', { size: 11, h: 0.3 });
    label(s, 1.1, 5.25, 4.8, 'GIVEN on the Physics Equations List', { size: 11, bold: true, color: C.green, h: 0.3 });
  },
  head: 'When to use it',
  lines: [
    'Use it when the question gives (or asks for) **velocities, acceleration and distance** but **no time**.',
    { t: 'GIVEN: on the Physics Equations List. You must be able to select, rearrange and use it.', nob: true, color: C.green, b: true, size: 10.5 },
    'Only for **uniform** (constant) acceleration.',
    'Starting from rest: u = 0. Coming to rest: v = 0.',
  ],
  worked: { head: 'Worked example', q: 'A car accelerates at 2.0 m/s² from 10 m/s to 30 m/s. Calculate the distance travelled.',
    steps: [['Equation', 'v² − u² = 2 × a × x'], ['Rearrange', 'x = (v² − u²) ÷ (2 × a)'], ['Substitute', 'x = (30² − 10²) ÷ (2 × 2.0) = 800 ÷ 4.0'], ['Answer', `x = ${x9} m`]] },
  qc: 'A ball is dropped from rest and falls 5.0 m. Calculate its speed just before it lands. (a = g = 10 m/s²)',
  notes: `QUICK CHECK ANSWER: u = 0, so v² = 2 × a × x = 2 × 10 × 5.0 = 100; v = √100 = ${qc9} m/s.\nCommon errors: squaring the difference (30 − 10)² instead of 30² − 10²; forgetting the square root.`,
}), '2.9 v² − u² = 2ax');

// ======================= 14 MEASURING SPEED =======================
reg(D.contentSlide({
  title: 'Measuring speed in the laboratory',
  subtitle: `Specification ${sp('2.11')} • methods including light gates`,
  tag: '2.11', caption: 'a single light gate times a card of known length',
  draw: (s, p) => {
    box(s, 0.75, 3.55, 5.5, 0.1, 'C99A5B', '8A6A3A');
    const top = trolley(s, 2.3, 3.55, 1.2, 0.36, C.blue, 'trolley');
    box(s, 2.85, top - 0.55, 0.06, 0.55, 'F5A742', 'B8730A');
    dim(s, 2.85 - 0.2, 2.91 + 0.2, top - 0.75, '', C.orange);
    label(s, 1.3, top - 1.05, 2.2, 'card length 0.10 m', { size: 10.5, bold: true, color: C.orange, align: 'right' });
    lightGate(s, 4.3, 3.55, top - 0.15, 'light gate');
    line(s, 4.46, top - 0.45, 5.6, top - 0.45, C.ink, 1.25); line(s, 5.6, top - 0.45, 5.6, top - 0.95, C.ink, 1.25);
    box(s, 5.1, top - 1.4, 1.0, 0.45, '2F3747', '1F2430', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 5.1, top - 1.4, 1.0, '0.040 s', { size: 11, bold: true, color: 'C9E3B5', h: 0.45 });
    label(s, 5.0, top - 1.68, 1.2, 'data logger', { size: 10, bold: true, color: C.ink });
    arrow(s, 1.0, 3.25, 2.0, 3.25, C.red, 2.5);
    // three methods table
    const rows = [['Method', 'Measure', 'Speed'], ['metre rule + stopwatch', 'distance, time', 'd ÷ t'], ['one light gate + card', 'card length, time beam blocked', 'L ÷ t'], ['two light gates', 'gap between gates, time between', 'd ÷ t']];
    s.addTable(rows.map((r, i) => r.map(t => ({ text: t, options: i === 0 ? { bold: true, color: C.white, fill: { color: C.ink } } : { fill: { color: i % 2 ? C.white : C.cardBlue } } }))), { x: 0.75, y: 4.1, w: 5.5, colW: [1.95, 2.55, 1.0], rowH: 0.36, fontFace: 'Calibri', fontSize: 10.5, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Why use light gates?',
  lines: [
    'A **light gate** sends a beam across a gap. A data logger times how long the beam is **blocked** by a card.',
    '**speed = card length ÷ time blocked**.',
    'Light gates remove **human reaction time** from the timing, so they are more accurate than a stopwatch for short times.',
    'Two readings of speed (two gates, or a double card) give the **acceleration**.',
  ],
  worked: { head: 'Worked example', q: 'A 0.10 m card blocks the beam for 0.040 s. Calculate the speed of the trolley.',
    steps: [['Equation', 'speed = distance ÷ time'], ['Substitute', 'speed = 0.10 m ÷ 0.040 s'], ['Check', '2.5 m/s is reasonable for a trolley'], ['Answer', `speed = ${v11} m/s`]] },
  qc: 'A 5.0 cm card blocks a light gate for 0.025 s. Calculate the speed. Why is a stopwatch a poor choice here?',
  notes: `QUICK CHECK ANSWER: 0.050 ÷ 0.025 = ${qcLG.toFixed(1)} m/s. The time (0.025 s) is far shorter than a human reaction time (about 0.2 s), so a stopwatch reading would have a huge percentage error.\nOther methods: ticker timer, video analysis with a scale, speed cameras / trundle wheel outdoors.`,
}), '2.11 Measuring speed');

// ======================= 15 TYPICAL SPEEDS AND g =======================
{
  const s = D.contentHeader('Typical speeds and accelerations', `Specification ${sp('2.12')}, ${sp('2.13')} • estimate everyday values; free fall acceleration g = 10 m/s²`, { tag: '2.12' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'typical speeds on a logarithmic scale (each grid line ×10)');
  const items = [['walking', 1.5], ['running', 3], ['cycling', 6], ['wind (breeze)', 5], ['car in town', 13], ['car on motorway', 31], ['fast train', 55], ['aeroplane', 250], ['sound in air', 330]];
  const X0 = 2.35, XW = 3.7, lg = v => X0 + Math.log10(v) / 3 * XW; // 1 to 1000 m/s
  [1, 10, 100, 1000].forEach(v => { line(s, lg(v), 1.55, lg(v), 5.6, 'C9D3E6', 0.75); label(s, lg(v) - 0.35, 5.62, 0.7, String(v), { size: 10, h: 0.2 }); });
  label(s, X0, 5.82, XW, 'speed / m/s (log scale)', { size: 10.5, bold: true, h: 0.22 });
  items.forEach(([n, v], i) => {
    const y = 1.6 + i * 0.44;
    label(s, 0.6, y, 1.7, n, { size: 10.5, bold: true, align: 'right', color: C.ink });
    box(s, X0, y + 0.04, lg(v) - X0, 0.26, i === 8 ? C.red : C.blue, null);
    label(s, lg(v) + 0.05, y, 0.6, String(v), { size: 10.5, bold: true, align: 'left', color: i === 8 ? C.red : C.blue });
  });
  D.card(s, 6.8, 1.3, 6.08, 2.5, 'Typical speeds to recall (m/s)', [
    'walking ≈ **1.5** • running ≈ **3** • cycling ≈ **6**',
    'car: town ≈ **13**, motorway ≈ **31** (70 mph) • train up to ≈ **55**',
    'wind ≈ **5–20** • aeroplane ≈ **250** • sound in air ≈ **330**',
    'Speeds vary: e.g. wind speed and a person’s walking speed change from moment to moment.',
  ], { size: 11.5 });
  D.card(s, 6.8, 3.95, 6.08, 2.3, 'Accelerations to estimate', [
    'Free fall (no air resistance): **g = 10 m/s²** (RECALL).',
    'A car pulling away: about **2–3 m/s²**; a sprinter’s start: about **5 m/s²**.',
    'Emergency stop in a car: about **−7 m/s²**. A crash: hundreds of m/s².',
    'So a falling object gains about **10 m/s every second**.',
  ], { size: 11.5, fill: C.cream });
  D.quickCheck(s, 'Estimate how long it takes to walk 1 km. A stone falls from rest for 2.0 s: estimate its speed (ignore air resistance).');
  D.notes(s, 'QUICK CHECK ANSWER: t = 1000 ÷ 1.5 ≈ 670 s ≈ 11 minutes. v = u + at = 0 + 10 × 2.0 = 20 m/s (from a = (v − u)/t).\nValues are typical values used by Edexcel/revision sources; 2.12 asks students to recall typical speeds for wind, sound, walking, running, cycling and transport. Bar lengths are log10(speed) to scale.');
  reg(s, '2.12–2.13 Typical speeds and g');
}

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('2.9')}, ${sp('2.11')}–${sp('2.13')} • v² − u² = 2ax, measuring speed, typical values`, [
  { q: 'A stone is dropped from rest and falls **20 m**. Calculate its speed just before it hits the ground. Use v² − u² = 2 × a × x and g = 10 m/s².', marks: 3, ms: 'u = 0 so v² = 2 × 10 × 20 (1); v² = 400 (1); v = 20 m/s (1).' },
  { q: 'Give a typical value for the speed of (i) a person walking and (ii) sound in air.', marks: 2, ms: '(i) about 1.5 m/s (accept 1–2 m/s) (1); (ii) about 330 m/s (accept 300–350 m/s) (1).' },
  { q: 'Explain why a light gate gives a more accurate time than a stopwatch for a fast-moving trolley.', marks: 2, ms: 'No human reaction time in starting/stopping the timing (1); the time is very short so reaction time would be a large fraction / large percentage error (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 NEWTON'S FIRST LAW =======================
reg(D.contentSlide({
  title: 'Newton’s first law',
  subtitle: `Specification ${sp('2.14')} • resultant force zero or not zero (free body diagrams: see Topic 9)`,
  tag: '2.14', caption: 'free body diagrams of a car; arrow lengths to scale (1 cm ≈ 1000 N)',
  draw: (s, p) => {
    const k = 0.0004;
    label(s, 0.65, 1.42, 5.6, 'A  Balanced: constant velocity', { size: 12, bold: true, align: 'left', color: C.green });
    const m1 = car(s, 2.45, 2.95, 1.6, C.blue);
    forceArrow(s, 4.05, m1.mid, 'right', 2000 * k, 'driving 2000 N', C.green, { lw: 1.4 });
    forceArrow(s, 2.45, m1.mid, 'left', 2000 * k, 'drag + friction 2000 N', C.red, { lw: 1.6 });
    label(s, 0.65, 3.4, 5.6, 'resultant = 0 N → no change in velocity', { size: 11, bold: true, color: C.green });
    label(s, 0.65, 3.85, 5.6, 'B  Unbalanced: accelerating', { size: 12, bold: true, align: 'left', color: C.red });
    const m2 = car(s, 2.45, 5.35, 1.6, C.blue);
    forceArrow(s, 4.05, m2.mid, 'right', 3600 * k, 'driving 3600 N', C.green, { lw: 1.4 });
    forceArrow(s, 2.45, m2.mid, 'left', 600 * k, '600 N', C.red, { lw: 0.6 });
    label(s, 0.65, 5.55, 5.6, 'resultant = 3000 N forwards → speeds up', { size: 11, bold: true, color: C.red });
  },
  head: 'Newton’s first law',
  lines: [
    'If the **resultant force is zero**: a **stationary** object stays at rest; a **moving** object keeps moving at the **same speed in the same direction** (constant velocity).',
    'If the **resultant force is not zero**: the velocity changes – it speeds up, slows down or **changes direction**.',
    'Resultant force: add forces in the same direction, subtract opposite ones (Topic 9).',
  ],
  worked: { head: 'Apply the law', q: 'A skydiver falls at a steady 55 m/s. Weight = 700 N.',
    steps: [['Velocity', 'constant → acceleration is zero'], ['First law', 'so the resultant force must be zero'], ['Forces', 'air resistance = weight'], ['Answer', 'air resistance = 700 N upwards']], size: 10.5 },
  qc: 'A car moves at constant velocity. Its driving force is 1500 N. What is the total resistive force? Explain.',
  notes: 'QUICK CHECK ANSWER: 1500 N backwards – constant velocity means the resultant force is zero, so the forces are balanced (Newton’s first law).\nFree body diagrams and resultant forces are taught fully in Topic 9 (9.4–9.5, Higher). Arrows here: 0.0004 in per N.',
}), '2.14 Newton’s first law');

// ======================= 18 NEWTON'S SECOND LAW =======================
reg(D.contentSlide({
  title: 'Newton’s second law: F = m × a',
  subtitle: `Specification ${sp('2.15')} • resultant force = mass × acceleration`,
  tag: '2.15', caption: 'same resultant force, different masses (arrow lengths to scale)',
  draw: (s, p) => {
    box(s, 0.75, 2.6, 5.5, 0.08, '5A6275', null);
    trolley(s, 1.0, 2.6, 1.0, 0.36, C.blue, '1.0 kg');
    forceArrow(s, 2.0, 2.27, 'right', 1.0, '2.0 N', C.red, { lw: 0.6 });
    arrow(s, 1.0, 1.65, 3.0, 1.65, C.green, 3); label(s, 3.05, 1.5, 2.5, 'a = 2.0 m/s²', { size: 11, bold: true, color: C.green, align: 'left' });
    box(s, 0.75, 4.15, 5.5, 0.08, '5A6275', null);
    trolley(s, 1.0, 4.15, 1.8, 0.5, '3A548A', '2.0 kg');
    forceArrow(s, 2.8, 3.75, 'right', 1.0, '2.0 N', C.red, { lw: 0.6 });
    arrow(s, 1.0, 3.12, 2.0, 3.12, C.green, 3); label(s, 2.05, 2.97, 2.5, 'a = 1.0 m/s²', { size: 11, bold: true, color: C.green, align: 'left' });
    box(s, 0.95, 4.5, 5.1, 1.2, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.95, 4.55, 5.1, 'F = m × a', { size: 22, bold: true, color: C.ink, h: 0.5 });
    label(s, 1.0, 5.1, 5.0, 'force (N) = mass (kg) × acceleration (m/s²)', { size: 11, h: 0.3 });
  },
  head: 'Force, mass and acceleration',
  lines: [
    'The acceleration is **proportional to the resultant force** and **inversely proportional to the mass**.',
    'Double the force → double the acceleration. Double the mass → half the acceleration.',
    { t: 'RECALL: you must learn F = m × a. Use the resultant force.', nob: true, color: C.red, b: true, size: 10.5 },
    '1 newton is the force that gives 1 kg an acceleration of 1 m/s².',
  ],
  worked: { head: 'Worked example', q: 'A 1200 kg car has a driving force of 3600 N and resistive forces of 600 N. Calculate its acceleration.',
    steps: [['Resultant', 'F = 3600 − 600 = 3000 N'], ['Rearrange', 'a = F ÷ m'], ['Substitute', 'a = 3000 N ÷ 1200 kg'], ['Answer', `a = ${a15} m/s²`]] },
  qc: 'Calculate the resultant force needed to accelerate a 70 kg sprinter at 3.0 m/s².',
  notes: `QUICK CHECK ANSWER: F = m × a = 70 × 3.0 = ${qc15} N.\nExtension: a 4.0 N resultant force on a 0.50 kg ball gives a = 8.0 m/s².`,
}), '2.15 Newton’s second law');

// ======================= 19 WEIGHT =======================
reg(D.contentSlide({
  title: 'Weight: W = m × g',
  subtitle: `Specification ${sp('2.16')}–${sp('2.18')} • weight is a force; measure it with a newtonmeter`,
  tag: '2.16', caption: 'a 2.0 kg mass weighed on Earth and on the Moon',
  draw: (s, p) => {
    const nm = (x, reading, txt, ext) => {
      box(s, x - 0.6, 1.5, 1.2, 0.1, '5A6275', null);
      line(s, x, 1.6, x, 1.75, C.ink, 1.5);
      box(s, x - 0.18, 1.75, 0.36, 1.6, 'E7ECF5', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
      for (let i = 0; i <= 10; i++) line(s, x + 0.06, 1.9 + i * 0.13, x + 0.16, 1.9 + i * 0.13, '6B7385', 0.75);
      box(s, x - 0.12, 1.85 + ext, 0.12, 0.08, C.red, null);
      line(s, x, 3.35, x, 3.55, C.ink, 1.5);
      box(s, x - 0.3, 3.55, 0.6, 0.55, '969FB1', '4A5262');
      label(s, x - 0.3, 3.55, 0.6, '2.0 kg', { h: 0.55, size: 10, bold: true, color: C.white });
      forceArrow(s, x, 4.1, 'down', reading / 20 * 0.9, `W = ${reading} N`, C.red, { lw: 1.3 });
      label(s, x - 1.1, 5.3, 2.2, txt, { size: 11, bold: true, color: C.ink, h: 0.45 });
    };
    nm(2.0, W16, 'Earth\ng = 10 N/kg', 1.2);
    nm(4.9, Wm16, 'Moon\ng = 1.6 N/kg', 0.2);
    label(s, 2.35, 2.3, 1.4, 'newtonmeter\n(spring balance)', { size: 10, italic: true, align: 'left', h: 0.4 });
  },
  head: 'Mass and weight',
  lines: [
    '**Weight** is the **force** on an object due to a **gravitational field**. It is measured in **newtons (N)** with a **newtonmeter** (a calibrated spring balance).',
    '**Mass** (kg) is the amount of matter; it is the **same everywhere**.',
    { t: '__W = m × g__   weight (N) = mass (kg) × gravitational field strength (N/kg)', nob: true },
    { t: 'RECALL. On Earth g = 10 N/kg. Weight is **directly proportional** to g.', nob: true, color: C.red, b: true, size: 10.5 },
  ],
  worked: { head: 'Worked example', q: 'Calculate the weight of the 2.0 kg mass on Earth and on the Moon (g = 1.6 N/kg).',
    steps: [['Equation', 'W = m × g'], ['Earth', `W = 2.0 kg × 10 N/kg = ${W16} N`], ['Moon', `W = 2.0 kg × 1.6 N/kg = ${Wm16} N`], ['Answer', 'mass stays 2.0 kg; weight falls with g']] },
  qc: 'A person weighs 650 N on Earth. Calculate their mass. What would their mass be on the Moon?',
  notes: `QUICK CHECK ANSWER: m = W ÷ g = 650 ÷ 10 = ${qc16} kg; mass on the Moon is still 65 kg (only the weight changes).\nNote: g = 10 N/kg = 10 m/s² (the same quantity).`,
}), '2.16–2.18 Weight');

// ======================= 20 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('2.14')}–${sp('2.18')} • Newton’s first and second laws, weight`, [
  { q: 'A lorry travels at a constant velocity on a straight, level road. Use Newton’s first law to explain what this tells you about the forces on the lorry.', marks: 2, ms: 'The resultant force is zero (1); driving force = resistive forces / forces are balanced (1).' },
  { q: 'A **900 kg** car has a resultant force of **1800 N** on it. Calculate its acceleration.', marks: 3, ms: 'a = F ÷ m (1); = 1800 ÷ 900 (1); = 2.0 m/s² (1).' },
  { q: 'Name the instrument used to measure weight, and calculate the weight of a **5.0 kg** bag. g = 10 N/kg.', marks: 2, ms: 'newtonmeter / spring balance (1); W = 5.0 × 10 = 50 N (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 21 CIRCULAR MOTION (H) =======================
reg(D.contentSlide({
  title: 'Circular motion and centripetal force',
  subtitle: `Specification ${sp('2.20')}, ${sp('2.21')} • constant speed but changing velocity`,
  tag: '2.20', ht: true, caption: 'a satellite in a circular orbit: velocity along the tangent, force towards the centre',
  draw: (s, p) => {
    const cx = 3.5, cy = 3.6, r = 1.75;
    s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { type: 'none' }, line: { color: C.grey, width: 1.25, dashType: 'dash' } });
    s.addShape(SH.OVAL, { x: cx - 0.45, y: cy - 0.45, w: 0.9, h: 0.9, fill: { color: '5B9BD5' }, line: { color: '2E5B8A', width: 1 } });
    label(s, cx - 0.45, cy - 0.15, 0.9, 'Earth', { size: 10.5, bold: true, color: C.white });
    [0, 90, 180, 270].forEach(a => {
      const sx = cx + r * Math.cos(rad(a)), sy = cy + r * Math.sin(rad(a));
      // velocity tangent (anticlockwise on screen) and force to centre
      const tx = Math.sin(rad(a)), ty = -Math.cos(rad(a));
      arrow(s, sx, sy, sx + 0.9 * tx, sy + 0.9 * ty, C.blue, 2.5);
      arrow(s, sx, sy, sx + 0.7 * (cx - sx) / r, sy + 0.7 * (cy - sy) / r, C.red, 2.5);
      box(s, sx - 0.1, sy - 0.1, 0.2, 0.2, C.ink, null);
    });
    label(s, 0.6, 1.4, 2.5, 'velocity v (tangent)', { size: 11, bold: true, color: C.blue, align: 'left' });
    label(s, 0.6, 1.7, 2.8, 'centripetal force (to centre)', { size: 11, bold: true, color: C.red, align: 'left' });
  },
  head: 'Why circular motion needs a force',
  lines: [
    'At constant **speed** in a circle, the **direction** keeps changing, so the **velocity changes** (velocity is a vector).',
    'A changing velocity is an **acceleration**, so (first law) there must be a **resultant force**.',
    'This resultant force acts **towards the centre** of the circle: the **centripetal force**.',
    'It is not a new force – it is provided by another force:',
    { t: 'satellite → **gravity** • car on a bend → **friction** • ball on a string → **tension**', nob: true },
  ],
  worked: { head: 'Explain it', q: 'Why does a car on an icy roundabout slide off the bend?',
    steps: [['Need', 'a force towards the centre to keep turning'], ['Provided by', 'friction between tyres and road'], ['Ice', 'friction too small → not enough centripetal force'], ['Answer', 'car continues in a straighter line (first law)']], size: 10.5 },
  qc: 'A ball is whirled in a horizontal circle on a string. The string snaps. Describe the path of the ball.',
  notes: 'QUICK CHECK ANSWER: The ball moves off along the tangent (straight line, in the direction of its velocity at that instant – viewed from above), because there is no longer a centripetal force.\nHT: 2.20 and 2.21 are Higher only (qualitative only; no F = mv²/r at GCSE). Save My Exams marks this content Higher Tier only.',
}), '2.20–2.21 Circular motion (HT)');

// ======================= 22 INERTIAL MASS (H) =======================
reg(D.contentSlide({
  title: 'Inertial mass',
  subtitle: `Specification ${sp('2.22')} • how difficult it is to change an object’s velocity`,
  tag: '2.22', ht: true, caption: 'the same 10 N resultant force on two trolleys (arrows to scale)',
  draw: (s, p) => {
    box(s, 0.75, 2.75, 5.5, 0.08, '5A6275', null);
    trolley(s, 1.0, 2.75, 0.9, 0.34, C.blue, '2.0 kg');
    forceArrow(s, 1.9, 2.42, 'right', 1.0, '10 N', C.red, { lw: 0.6 });
    arrow(s, 1.0, 1.75, 1.0 + aI1 * 0.6, 1.75, C.green, 3); label(s, 1.0 + aI1 * 0.6 + 0.05, 1.6, 1.6, `a = ${aI1} m/s²`, { size: 11, bold: true, color: C.green, align: 'left' });
    box(s, 0.75, 4.55, 5.5, 0.08, '5A6275', null);
    trolley(s, 1.0, 4.55, 2.0, 0.55, '3A548A', '5.0 kg');
    forceArrow(s, 3.0, 4.1, 'right', 1.0, '10 N', C.red, { lw: 0.6 });
    arrow(s, 1.0, 3.35, 1.0 + aI2 * 0.6, 3.35, C.green, 3); label(s, 1.0 + aI2 * 0.6 + 0.05, 3.2, 1.6, `a = ${aI2} m/s²`, { size: 11, bold: true, color: C.green, align: 'left' });
    box(s, 0.95, 4.85, 5.1, 0.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.95, 4.9, 5.1, 'inertial mass = F ÷ a', { size: 20, bold: true, color: C.ink, h: 0.45 });
    label(s, 0.95, 5.35, 5.1, 'larger inertial mass → smaller acceleration', { size: 11, h: 0.28, color: C.text });
  },
  head: 'Inertia and inertial mass',
  lines: [
    '**Inertia:** objects tend to keep their velocity (stay at rest or keep moving) unless a resultant force acts.',
    '**Inertial mass** is a measure of **how difficult it is to change the velocity** of an object (including starting it from rest).',
    'It is defined as the **ratio of force over acceleration**: m = F ÷ a.',
    'A loaded lorry is harder to start and to stop than a car: it has a larger inertial mass.',
  ],
  worked: { head: 'Worked example', q: 'A resultant force of 2.4 N gives a trolley an acceleration of 0.60 m/s². Calculate its inertial mass.',
    steps: [['Equation', 'inertial mass = F ÷ a'], ['Substitute', 'm = 2.4 N ÷ 0.60 m/s²'], ['Check', 'same as rearranging F = m × a'], ['Answer', `m = ${mi.toFixed(1)} kg`]] },
  qc: 'Explain why it is harder to stop a full supermarket trolley than an empty one moving at the same speed.',
  notes: 'QUICK CHECK ANSWER: The full trolley has a greater inertial mass, so for the same force its deceleration is smaller (a = F/m); it takes a larger force or longer time to stop it.\nHT: 2.22 is Higher only (medium-high confidence: 1SC0 checklist lists inertial mass as HT).',
}), '2.22 Inertial mass (HT)');

// ======================= 23 NEWTON'S THIRD LAW =======================
reg(D.contentSlide({
  title: 'Newton’s third law',
  subtitle: `Specification ${sp('2.23')} • equal and opposite forces on two different objects`,
  tag: '2.23', caption: 'two skaters push each other: a third law pair (arrows to scale)',
  draw: (s, p) => {
    box(s, 0.75, 3.7, 5.5, 0.12, 'CFE3F5', '9FBEDD');
    person(s, 2.7, 3.7, 1.6, '2E5B8A', 'right');
    person(s, 3.54, 3.7, 1.6, C.red, 'left');
    label(s, 1.9, 3.85, 1.6, 'A  60 kg', { size: 11, bold: true, color: '2E5B8A' });
    label(s, 2.95, 3.85, 1.6, 'B  40 kg', { size: 11, bold: true, color: C.red });
    const y = 2.2;
    arrow(s, 3.13, y - 0.45, 1.93, y - 0.45, C.blue, 3.5); label(s, 0.7, y - 0.8, 2.8, 'force of B on A: 120 N', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    arrow(s, 3.13, y - 0.45, 4.33, y - 0.45, C.red, 3.5); label(s, 3.3, y - 0.8, 2.9, 'force of A on B: 120 N', { size: 10.5, bold: true, color: C.red, align: 'right' });
    label(s, 0.75, 4.3, 5.5, `A: a = 120 ÷ 60 = ${aS1} m/s² (left)    B: a = 120 ÷ 40 = ${aS2} m/s² (right)`, { size: 11, bold: true, color: C.ink });
    box(s, 0.95, 4.75, 5.1, 0.95, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 1.05, 4.8, 4.9, 'Same size • opposite directions • same type of force •\nact on DIFFERENT objects', { size: 11.5, bold: true, color: C.ink, h: 0.85 });
  },
  head: 'Newton’s third law',
  lines: [
    'When two objects interact, they exert **equal and opposite forces on each other**.',
    'The two forces act on **different objects**, so they **never cancel** each other.',
    '**Equilibrium:** a book on a table – the book pushes down on the table and the table pushes up on the book. The pair to the book’s **weight** is the book pulling the **Earth** upwards.',
    '!!HT!! In a collision the forces on the two objects are equal and opposite for the same time, so the momentum one gains equals the momentum the other loses: **momentum is conserved**.',
  ],
  worked: { head: 'Not a third law pair', q: 'Weight and normal contact force on a book on a table are equal and opposite. Why are they not a third law pair?',
    steps: [['Objects', 'both act on the same object (the book)'], ['Types', 'one is gravitational, one is a contact force'], ['First law', 'they are balanced forces (resultant zero)'], ['Answer', 'a third law pair acts on two different objects']], size: 10.5 },
  qc: 'A swimmer pushes backwards on the water. Use Newton’s third law to explain why she moves forwards.',
  notes: `QUICK CHECK ANSWER: The water pushes forwards on the swimmer with an equal-sized force (third law), so there is a forward force on her.\nSkaters checked: 120/60 = ${aS1} m/s², 120/40 = ${aS2} m/s². Same force, same time → equal and opposite momenta (links to slide 31).\nHT: the momentum part of 2.23 is treated as Higher (medium confidence).`,
}), '2.23 Newton’s third law');

// ======================= 24 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('2.20')}–${sp('2.23')} • circular motion, inertial mass, Newton’s third law`, [
  { q: 'A car drives round a roundabout at a constant speed. Explain why the car is accelerating.', marks: 2, ht: true, ms: 'Its direction is changing so its velocity is changing (velocity is a vector) (1); acceleration is the rate of change of velocity / there is a resultant (centripetal) force towards the centre (1).' },
  { q: 'A resultant force of **6.0 N** gives an object an acceleration of **1.5 m/s²**. Calculate its inertial mass.', marks: 2, ht: true, ms: 'm = F ÷ a = 6.0 ÷ 1.5 (1); = 4.0 kg (1).' },
  { q: 'A book rests on a table. Its weight and the normal contact force are equal and opposite. Explain why these two forces are **not** a Newton’s third law pair, and state the force that does pair with the weight.', marks: 3, ms: 'Both forces act on the same object / the book (1); they are different types of force (1); the pair is the gravitational force of the book on the Earth (pulling the Earth up) (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 25 CP APPARATUS AND METHOD =======================
reg(D.contentSlide({
  title: 'Core Practical: apparatus and method',
  subtitle: `Specification ${sp('2.19')} • investigate force, mass and acceleration by varying the masses added to trolleys`,
  tag: 'CP 2.19', cp: true, caption: 'side view; the runway is tilted slightly to compensate for friction',
  draw: (s, p) => {
    const yB = 3.75; // bench top
    box(s, 0.65, yB, 5.25, 0.14, 'C99A5B', '8A6A3A');
    box(s, 0.85, yB + 0.14, 0.14, 1.25, 'A57E48', null); box(s, 5.55, yB + 0.14, 0.14, 1.25, 'A57E48', null);
    // runway: raised left end on a block
    const A = [0.85, yB - 0.42], B = [5.3, yB - 0.06];
    box(s, 0.9, A[1] + 0.05, 0.4, yB - A[1] - 0.05, '8C96A8', '6B7385');
    label(s, 1.05, yB + 0.17, 0.6, 'block', { size: 10, bold: true, color: C.ink, h: 0.22, align: 'left' });
    line(s, A[0], A[1], B[0], B[1], '8A6A3A', 6);
    const th = Math.atan2(B[1] - A[1], B[0] - A[0]), d = [Math.cos(th), Math.sin(th)], n = [Math.sin(th), -Math.cos(th)];
    const P = t => [A[0] + t * (B[0] - A[0]), A[1] + t * (B[1] - A[1])];
    const [tx, ty] = P(0.3), bw = 1.0, bh = 0.32;
    const bc = [tx + n[0] * 0.3, ty + n[1] * 0.3];
    box(s, bc[0] - bw / 2, bc[1] - bh / 2, bw, bh, C.blue, '2B3F7A', { rotate: th * 180 / Math.PI });
    label(s, bc[0] - bw / 2, bc[1] - bh / 2, bw, 'trolley', { h: bh, size: 10, bold: true, color: C.white });
    [-0.32, 0.32].forEach(u => { const wx = tx + d[0] * u + n[0] * 0.09, wy = ty + d[1] * u + n[1] * 0.09; s.addShape(SH.OVAL, { x: wx - 0.08, y: wy - 0.08, w: 0.16, h: 0.16, fill: { color: '3B4252' }, line: { color: '1F2430' } }); });
    const cc = [bc[0] + n[0] * 0.38, bc[1] + n[1] * 0.38];
    box(s, cc[0] - 0.03, cc[1] - 0.22, 0.06, 0.44, 'F5A742', 'B8730A', { rotate: th * 180 / Math.PI });
    label(s, cc[0] - 0.75, cc[1] - 0.62, 1.5, 'card', { size: 10, bold: true, color: C.orange, h: 0.22 });
    // light gates
    [[0.55, 'light gate 1'], [0.82, 'light gate 2']].forEach(([t, nm]) => { const [gx, gy] = P(t); lightGate(s, gx, gy, cc[1] + 0.1, nm); });
    // pulley and string
    const pc = [5.55, B[1] - 0.15];
    pulley(s, pc[0], pc[1]);
    const front = [bc[0] + d[0] * bw / 2, bc[1] + d[1] * bw / 2];
    line(s, front[0], front[1], pc[0] - 0.02, pc[1] - 0.13, C.ink, 1);
    line(s, pc[0] + 0.13, pc[1], pc[0] + 0.13, pc[1] + 0.85, C.ink, 1);
    massHanger(s, pc[0] + 0.13, pc[1] + 0.85, 3, { w: 0.42 });
    label(s, 5.0, pc[1] + 1.55, 1.45, 'hanging mass\n(force = weight)', { size: 10, bold: true, h: 0.45, align: 'right' });
    label(s, 5.2, pc[1] - 0.52, 1.2, 'pulley', { size: 10, bold: true, h: 0.22 });
    // data logger
    box(s, 1.6, 4.55, 1.6, 0.6, '2F3747', '1F2430', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 1.6, 4.55, 1.6, 'data logger', { h: 0.6, size: 10.5, bold: true, color: 'C9E3B5' });
    line(s, 3.2, 4.85, 4.15, 4.85, C.grey, 1); line(s, 4.15, 4.85, 4.15, yB + 0.14, C.grey, 1);
    label(s, 0.75, 1.42, 5.6, 'masses added to the trolley (vary m) or moved to the hanger (vary F)', { size: 10.5, italic: true, color: C.blue });
  },
  head: 'Method',
  lines: [
    'Tilt the runway until the trolley rolls at **constant speed** when pushed (friction compensated).',
    'Attach a card. Two light gates record the speed at each gate and the time between them.',
    '**Vary mass:** keep the hanging mass (force) the same; **add masses to the trolley**; release from the same point.',
    '**Vary force:** move masses from the trolley to the hanger, so the **total mass stays the same**.',
    'Calculate **a = (v − u) ÷ t** for each run; repeat 3 times and find the mean.',
  ],
  worked: { head: 'Light-gate calculation', q: '10 cm card: blocks gate 1 for 0.20 s and gate 2 for 0.050 s; 0.75 s between gates.',
    steps: [['Gate 1', `u = 0.10 ÷ 0.20 = ${cpv1.toFixed(2)} m/s`], ['Gate 2', `v = 0.10 ÷ 0.050 = ${cpv2.toFixed(1)} m/s`], ['Acceleration', 'a = (2.0 − 0.50) ÷ 0.75'], ['Answer', `a = ${cpa.toFixed(1)} m/s²`]], size: 10.5 },
  qc: 'Why is the runway tilted slightly? Why do we move masses to the hanger rather than adding new ones when varying the force?',
  notes: 'QUICK CHECK ANSWER: The slope makes a component of weight balance friction, so the resultant force is the weight of the hanging masses. Moving masses keeps the total mass being accelerated (trolley + hanger) constant, so only the force changes.\nApparatus: dynamics trolley, runway, block, two light gates + data logger (or ticker timer / stopwatch with metre rule), card, bench pulley, string, mass hanger and 100 g / 10 g slotted masses, balance, (sand tray / buffer to catch the masses).\nCP numbering: 2.19 in the spec (PMT calls it “CP 1 Newton’s Second Law”; Save My Exams “Core Practical: Investigating Force & Acceleration”).',
}), 'CP: apparatus and method');

// ======================= 26 CP VARIABLES AND SAFETY =======================
reg(D.contentSlide({
  title: 'Core Practical: variables and safety',
  subtitle: `Specification ${sp('2.19')} • two investigations: vary mass, then vary force`,
  tag: 'CP 2.19', cp: true, caption: 'what you change, measure and keep the same',
  draw: (s, p) => {
    const bx = (y, col, head, body) => {
      box(s, 0.75, y, 5.5, 1.15, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
      box(s, 0.75, y, 0.12, 1.15, col, null);
      s.addText([{ text: head, options: { bold: true, color: col, fontSize: 12.5, breakLine: true } }, ...T.rich(body, { fontSize: 11.5, color: C.text })], { x: 1.0, y: y + 0.06, w: 5.1, h: 1.03, fontFace: 'Calibri', valign: 'middle', margin: 0 });
    };
    bx(1.5, C.blue, 'Independent variable (you change)', '**mass** of the trolley (part 1) or the **force** = weight of the hanging masses (part 2)');
    arrow(s, 3.5, 2.67, 3.5, 2.93, C.grey, 2);
    bx(2.95, C.red, 'Dependent variable (you measure)', '**acceleration** of the trolley, from the light-gate speeds and time');
    arrow(s, 3.5, 4.12, 3.5, 4.38, C.grey, 2);
    bx(4.4, C.green, 'Control variables (keep the same)', 'force when varying mass • **total mass** when varying force • slope of runway • start position • card length');
  },
  head: 'Predictions',
  lines: [
    '**Vary force** (mass constant): a ∝ F – a straight line through the origin.',
    '**Vary mass** (force constant): a ∝ 1/m – a curve; doubling the mass halves the acceleration.',
    'Both are tests of **Newton’s second law, F = m × a**.',
  ],
  worked: { head: 'Safety', q: 'Hazard → risk → control',
    steps: [['Falling masses', 'injured feet → put a sand tray / soft mat under the hanger; keep feet clear'], ['Moving trolley', 'trolley falls off the bench → use a buffer / stop block at the end'], ['Masses on bench', 'keep the total small; clamp the pulley firmly'], ['Answer', 'never stand under the hanging masses']], size: 10.5 },
  workedH: 2.5,
  qc: 'In part 1 (vary mass), name the control variable that tests Newton’s second law most directly.',
  notes: 'QUICK CHECK ANSWER: The accelerating force – the hanging mass (its weight) must stay the same while the trolley mass is changed.\nThe Edexcel wording (“varying the masses added to trolleys”) covers both versions; exam questions use either.',
}), 'CP: variables and safety');

// ======================= 27 CP RESULTS AND GRAPH =======================
const GCP = { x: 1.4, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 1.4, ymin: 0, ymax: 2.5, xstep: 0.2, ystep: 0.5, minor: 2, xlabel: 'total mass being accelerated, m / kg', ylabel: 'acceleration / m/s²', fmt: v => v.toFixed(1), yfmt: v => v.toFixed(1) };
{
  const s = D.contentHeader('Core Practical: results and graph', `Specification ${sp('2.19')} • sample results: force = 1.0 N, total mass varied`, { cp: true, tag: 'CP 2.19' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale; dashed curve = theory a = F ÷ m');
  axes(s, GCP);
  plotLine(s, GCP, Array.from({ length: 41 }, (_, i) => { const m = 0.4 + i * 0.025; return [m, 1.0 / m]; }), C.grey, 1.25, { dash: 'dash' });
  fnLine(s, GCP, m => 1.0 / m - 0.04, 0.45, 1.35, 40, C.blue, 2);
  points(s, GCP, CPm.map((m, i) => [m, CPa[i]]), C.red);
  label(s, px(GCP, 0.8), py(GCP, 1.6), 2.0, 'curve of best fit', { size: 11, bold: true, color: C.blue, align: 'left' });
  const head = ['m / kg', 'a / m/s²', 'F ÷ m / m/s²', 'm × a / N'].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
  const rows = [head, ...CPm.map((m, i) => [m.toFixed(2), CPa[i].toFixed(2), CPth[i].toPrecision(3), (m * CPa[i]).toFixed(2)].map((t, j) => ({ text: t, options: { fill: { color: i % 2 ? C.white : C.cardBlue }, bold: j === 0, color: j === 3 ? C.red : C.text } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.35, 1.5, 1.6, 1.63], rowH: 0.36, fontFace: 'Calibri', fontSize: 11.5, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 3.65, 6.08, 2.6, 'What the results show', [
    'As the mass increases, the acceleration **decreases**; the graph is a curve.',
    'm × a is almost constant (**0.95–0.98 N**), close to the 1.0 N force: **a ∝ 1/m**, as F = m × a predicts.',
    'Every result is slightly **below** theory: friction is not fully compensated.',
    '**Total** mass = trolley + added masses + hanging mass (all are accelerated).',
  ], { size: 11 });
  D.quickCheck(s, 'Use the row m = 0.90 kg to calculate m × a. Stretch: what graph would give a straight line through the origin?');
  D.notes(s, `QUICK CHECK ANSWER: 0.90 × 1.07 = 0.96 N (2 s.f.). Plot a against 1/m – a straight line through the origin with gradient = F.\nSample data: a = 1.0/m − 0.04, rounded to 2 d.p. (asserted in node); each m × a lies within 6% of 1.0 N.\nFor part 2 (vary F, total mass 1.0 kg) the theory gives a = F: 0.2, 0.4 … 1.0 m/s² – a straight line through the origin.`);
  reg(s, 'CP: results and graph');
}

// ======================= 28 CP ERRORS =======================
reg(D.contentSlide({
  title: 'Core Practical: errors and improvements',
  subtitle: `Specification ${sp('2.19')} • evaluating the method`,
  tag: 'CP 2.19', cp: true, caption: 'why light gates beat a stopwatch, and where friction acts',
  draw: (s, p) => {
    // stopwatch vs light gate comparison bars (timing uncertainty) to scale
    label(s, 0.75, 1.45, 5.5, 'Typical timing uncertainty (to scale)', { size: 11.5, bold: true, color: C.ink });
    const sc = 15; // in per s
    [['stopwatch (reaction time)', 0.2, C.red], ['light gate + data logger', 0.001, C.green]].forEach(([n, t, c], i) => {
      const y = 1.85 + i * 0.55;
      label(s, 0.75, y, 2.2, n, { size: 10.5, bold: true, align: 'right', color: C.ink });
      box(s, 3.05, y + 0.04, Math.max(0.03, t * sc), 0.24, c, null);
      label(s, 3.1 + Math.max(0.03, t * sc), y, 1.2, t === 0.2 ? '≈ 0.2 s' : '≈ 0.001 s', { size: 10.5, bold: true, color: c, align: 'left' });
    });
    // friction sketch
    box(s, 0.75, 4.55, 5.5, 0.1, '8A6A3A', null);
    const top = trolley(s, 2.4, 4.55, 1.3, 0.4, C.blue, 'trolley');
    forceArrow(s, 3.7, top + 0.2, 'right', 1.3, 'pull of string', C.green, { lw: 1.4 });
    forceArrow(s, 2.4, top + 0.2, 'left', 0.5, 'friction', C.red, { lw: 0.9 });
    label(s, 0.75, 4.85, 5.5, 'If friction is not compensated, the resultant force is less than the weight of the hanging mass → a is smaller than F ÷ m.', { size: 10.5, italic: true, color: C.grey, h: 0.6 });
  },
  head: 'Sources of error',
  lines: [
    '**Friction** not fully compensated → systematic error: all accelerations too low.',
    '**Forgetting the hanging mass** in the total mass → F ÷ m is calculated wrongly.',
    '**Stopwatch timing** → random error from reaction time (about 0.2 s).',
    'Card **not vertical** or a different length → wrong speeds.',
    'Trolley **released with a push** or from different positions → speeds vary.',
  ],
  worked: { head: 'Improving the investigation', q: '',
    steps: [['Timing', 'use light gates and a data logger, not a stopwatch'], ['Repeats', 'take 3 runs for each mass and calculate a mean; discard anomalies'], ['Range', 'use at least 5 masses over a wide range'], ['Answer', 'more accurate and more repeatable values of a']], size: 10.5 },
  qc: 'A student’s accelerations are all about 5% lower than F ÷ m. Is this a random or a systematic error? Suggest a cause.',
  notes: 'QUICK CHECK ANSWER: Systematic (all results shifted the same way). Likely cause: friction not fully compensated (runway not tilted enough), or the hanging mass left out of the total mass.\nTicker-timer alternative: tape with dots at 0.02 s intervals; spacing gives speeds.',
}), 'CP: errors and improvements');

// ======================= 29 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('2.19')} • Core Practical: force, mass and acceleration`, [
  { q: 'Explain why the runway is tilted slightly before the investigation starts.', marks: 2, ms: 'To compensate for / balance friction (1); so the resultant force on the trolley equals the weight of the hanging masses / trolley moves at constant speed with no pull (1).' },
  { q: 'A **0.10 m** card passes through a light gate in **0.050 s**. Earlier it passed the first gate at **0.50 m/s**. The time between the gates is **0.75 s**. Calculate the acceleration.', marks: 3, ms: 'v = 0.10 ÷ 0.050 = 2.0 m/s (1); a = (2.0 − 0.50) ÷ 0.75 (1); = 2.0 m/s² (1).' },
  { q: 'A student investigates the effect of **force** on acceleration. Explain why she moves masses from the trolley onto the hanger, instead of adding new masses to the hanger.', marks: 2, ms: 'Keeps the total mass being accelerated constant (1); so only the force changes / it is a fair test of a ∝ F (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 30 MOMENTUM (H) =======================
reg(D.contentSlide({
  title: 'Momentum: p = m × v',
  subtitle: `Specification ${sp('2.24')} • momentum is mass × velocity, a vector`,
  tag: '2.24', ht: true, caption: 'momentum has a direction: choose right as positive',
  draw: (s, p) => {
    box(s, 0.75, 2.6, 5.5, 0.08, '5A6275', null);
    car(s, 1.0, 2.6, 1.6, C.blue, false, '1200 kg');
    arrow(s, 2.8, 1.85, 4.3, 1.85, C.green, 3); label(s, 4.35, 1.7, 1.8, 'v = +15 m/s', { size: 11, bold: true, color: C.green, align: 'left' });
    label(s, 0.75, 2.75, 5.5, `p = 1200 × 15 = +${fmtN(p24)} kg m/s`, { size: 12, bold: true, color: C.ink });
    box(s, 0.75, 4.35, 5.5, 0.08, '5A6275', null);
    trolley(s, 1.4, 4.35, 1.0, 0.36, C.blue, '2.0 kg');
    trolley(s, 4.0, 4.35, 1.0, 0.36, C.red, '2.0 kg');
    arrow(s, 1.4, 3.6, 2.4, 3.6, C.green, 3); label(s, 1.2, 3.25, 1.6, '+1.0 m/s', { size: 11, bold: true, color: C.green });
    arrow(s, 5.0, 3.6, 4.0, 3.6, C.green, 3); label(s, 3.8, 3.25, 1.6, '−1.0 m/s', { size: 11, bold: true, color: C.green });
    label(s, 0.75, 4.5, 5.5, 'p = +2.0 kg m/s and −2.0 kg m/s', { size: 11.5, bold: true, color: C.ink });
    label(s, 0.75, 4.85, 5.5, 'total momentum = 0 kg m/s', { size: 11.5, bold: true, color: C.red });
  },
  head: 'What is momentum?',
  lines: [
    '**Momentum** = mass × velocity. Unit: **kg m/s**.',
    { t: '__p = m × v__   momentum (kg m/s) = mass (kg) × velocity (m/s)', nob: true },
    { t: 'RECALL: you must learn this equation (Higher).', nob: true, color: C.red, b: true, size: 10.5 },
    'Momentum is a **vector**: it has the same direction as the velocity. Objects moving in opposite directions have momenta of opposite sign.',
  ],
  worked: { head: 'Worked example', q: 'Calculate the momentum of a 1200 kg car travelling at 15 m/s.',
    steps: [['Equation', 'p = m × v'], ['Substitute', 'p = 1200 kg × 15 m/s'], ['Unit', 'kg × m/s = kg m/s'], ['Answer', `p = ${fmtN(p24)} kg m/s (1.8 × 10⁴ kg m/s)`]] },
  qc: 'Calculate the momentum of a 0.16 kg cricket ball moving at 25 m/s.',
  notes: `QUICK CHECK ANSWER: p = 0.16 × 25 = ${qc24.toFixed(1)} kg m/s.\nHT: 2.24 “Define momentum, recall and use p = m × v” is Higher only (1SC0 checklist marks momentum HT).`,
}), '2.24 Momentum (HT)');

// ======================= 31 CONSERVATION OF MOMENTUM (H) =======================
reg(D.contentSlide({
  title: 'Conservation of momentum',
  subtitle: `Specification ${sp('2.23')}, ${sp('2.25')} • total momentum before = total momentum after`,
  tag: '2.25', ht: true, caption: 'a collision in which two trolleys stick together (velocities to scale)',
  draw: (s, p) => {
    const kv = 0.9; // in per m/s
    label(s, 0.65, 1.42, 2.0, 'BEFORE', { size: 12, bold: true, color: C.ink, align: 'left' });
    box(s, 0.75, 2.75, 5.5, 0.08, '5A6275', null);
    trolley(s, 1.0, 2.75, 1.2, 0.4, C.blue, 'A 0.80 kg');
    trolley(s, 3.9, 2.75, 1.0, 0.36, C.red, 'B 0.40 kg');
    arrow(s, 2.2, 2.0, 2.2 + 1.5 * kv, 2.0, C.green, 3); label(s, 2.0, 1.65, 1.7, 'u = 1.5 m/s', { size: 11, bold: true, color: C.green });
    label(s, 3.75, 1.95, 1.3, 'at rest', { size: 11, bold: true, color: C.grey });
    label(s, 0.75, 2.9, 5.5, `total p = 0.80 × 1.5 + 0 = ${pBefore.toFixed(1)} kg m/s`, { size: 11.5, bold: true, color: C.ink });
    line(s, 0.75, 3.35, 6.25, 3.35, C.line, 1, { dash: 'dash' });
    label(s, 0.65, 3.45, 2.0, 'AFTER', { size: 12, bold: true, color: C.ink, align: 'left' });
    box(s, 0.75, 4.75, 5.5, 0.08, '5A6275', null);
    trolley(s, 2.0, 4.75, 1.2, 0.4, C.blue, 'A');
    trolley(s, 3.2, 4.75, 1.0, 0.36, C.red, 'B');
    arrow(s, 4.2, 4.05, 4.2 + 1.0 * kv, 4.05, C.green, 3); label(s, 4.0, 3.7, 1.7, `v = ${vAfter.toFixed(1)} m/s`, { size: 11, bold: true, color: C.green });
    label(s, 0.75, 4.9, 5.5, `total p = (0.80 + 0.40) × v = ${pBefore.toFixed(1)} kg m/s`, { size: 11.5, bold: true, color: C.ink });
  },
  head: 'Collisions and explosions',
  lines: [
    'In a collision or explosion (no external forces), **total momentum before = total momentum after**.',
    'Why: by Newton’s third law the objects push on each other with **equal and opposite forces** for the **same time**, so their changes in momentum are equal and opposite.',
    '**Explosion** from rest: total momentum is zero before, so the pieces move apart with **equal and opposite momenta** (e.g. a gun recoils).',
  ],
  worked: { head: 'Worked example', q: 'Find the velocity of the joined trolleys after the collision.',
    steps: [['Before', 'p = 0.80 × 1.5 + 0.40 × 0 = 1.2 kg m/s'], ['After', 'p = (0.80 + 0.40) × v = 1.2 × v'], ['Conserve', '1.2 × v = 1.2  →  v = 1.2 ÷ 1.2'], ['Answer', `v = ${vAfter.toFixed(1)} m/s to the right`]] },
  qc: 'Skaters A (60 kg) and B (40 kg) stand still, then push apart. B moves off at 3.0 m/s. Calculate A’s velocity.',
  notes: `QUICK CHECK ANSWER: total p before = 0; after: 40 × 3.0 = 120 kg m/s, so A has −120 kg m/s: v = 120 ÷ 60 = ${vRecoil.toFixed(1)} m/s in the opposite direction.\nThis matches slide 23: a 120 N push for 1.0 s gives 120 kg m/s to each skater.\nHT: 2.25 and the momentum part of 2.23 are Higher only.`,
}), '2.23, 2.25 Conservation of momentum (HT)');

// ======================= 32 F = Δp / t (H) =======================
reg(D.contentSlide({
  title: 'Force and rate of change of momentum',
  subtitle: `Specification ${sp('2.26')} • F = (mv − mu) ÷ t, and safety features`,
  tag: '2.26', ht: true, caption: 'a 1200 kg car stopping from 15 m/s: force for two stopping times (to scale)',
  draw: (s, p) => {
    box(s, 5.75, 1.5, 0.35, 1.45, '8C96A8', '6B7385');
    label(s, 5.4, 2.95, 1.1, 'wall', { size: 10, bold: true, h: 0.22 });
    box(s, 3.9, 2.95, 1.85, 0.08, '5A6275', null);
    const c = car(s, 3.95, 2.95, 1.8, C.blue);
    box(s, 5.25, c.top + 0.25, 0.48, 0.43, 'F5A742', null, { tr: 30 });
    lead(s, 5.45, c.top + 0.3, 4.3, 1.55, 'crumple zone', 1.4, 'right');
    arrow(s, 1.0, 2.5, 3.6, 2.5, C.green, 3); label(s, 1.0, 2.15, 2.6, 'u = 15 m/s → v = 0', { size: 11, bold: true, color: C.green });
    // bar chart of force
    const sc = 4.2 / 360000;
    label(s, 0.75, 3.35, 5.5, 'Average force on the car', { size: 11.5, bold: true, color: C.ink });
    [['stops in 0.05 s (rigid)', Fc1, C.red], ['stops in 0.20 s (crumple zone)', Fc2, C.green]].forEach(([n, F, col], i) => {
      const y = 3.75 + i * 0.85;
      label(s, 0.75, y, 4.4, n, { size: 10.5, bold: true, align: 'left', color: C.ink, h: 0.24 });
      box(s, 0.75, y + 0.27, F * sc, 0.32, col, null);
      label(s, 0.8 + F * sc, y + 0.27, 1.4, `${fmtN(F)} N`, { size: 10.5, bold: true, color: col, align: 'left', h: 0.32 });
    });
  },
  head: 'Force = change in momentum ÷ time',
  lines: [
    { t: '__F = (mv − mu) ÷ t__   force (N) = change in momentum (kg m/s) ÷ time (s)', nob: true },
    { t: 'GIVEN on the Physics Equations List (Higher).', nob: true, color: C.green, b: true, size: 10.5 },
    'For the same change in momentum, a **longer time** means a **smaller force**.',
    '**Crumple zones, airbags, seat belts, cycle helmets, crash mats** all increase the time of the collision, reducing the force (and deceleration) on the people.',
  ],
  worked: { head: 'Worked example', q: 'The 1200 kg car stops from 15 m/s in 0.20 s. Calculate the average force.',
    steps: [['Equation', 'F = (mv − mu) ÷ t'], ['Change in p', 'mv − mu = 1200 × 0 − 1200 × 15 = −18 000 kg m/s'], ['Substitute', 'F = −18 000 ÷ 0.20'], ['Answer', `F = −${fmtN(Fc2)} N (size 9.0 × 10⁴ N, opposing motion)`]] },
  qc: 'A footballer kicks a 0.45 kg ball from rest to 20 m/s. The contact time is 0.010 s. Calculate the average force.',
  notes: `QUICK CHECK ANSWER: F = (0.45 × 20 − 0) ÷ 0.010 = ${qc26} N.\nBars to scale: 18 000/0.05 = ${fmtN(Fc1)} N; 18 000/0.20 = ${fmtN(Fc2)} N.\nHT: 2.26 is Higher only; “Use” → the equation is GIVEN on the equation sheet.`,
}), '2.26 Force and momentum change (HT)');

// ======================= 33 RECAP 7 =======================
const R7 = D.recapSlide(7, `Specification ${sp('2.24')}–${sp('2.26')} • momentum (Higher)`, [
  { q: 'Calculate the momentum of a **0.40 kg** ball moving at **5.0 m/s**. Give the unit.', marks: 2, ht: true, ms: 'p = m × v = 0.40 × 5.0 (1); = 2.0 kg m/s (1, unit needed).' },
  { q: 'A **1500 kg** car moving at **8.0 m/s** hits a stationary **500 kg** car. They move off together. Calculate their velocity just after the collision.', marks: 3, ht: true, ms: 'momentum before = 1500 × 8.0 = 12 000 kg m/s (1); 12 000 = (1500 + 500) × v (1); v = 6.0 m/s (1).' },
  { q: 'Explain how an **airbag** reduces the force on a driver in a crash.', marks: 3, ht: true, ms: 'Increases the time taken for the driver to stop (1); the change in momentum is the same (1); force = change in momentum ÷ time, so the force is smaller (1).' },
]);
reg(R7.s, 'Recap 7');

// ======================= 34 REACTION TIME =======================
reg(D.contentSlide({
  title: 'Reaction times',
  subtitle: `Specification ${sp('2.27')}, ${sp('2.30')} • measuring human reaction time; what affects it`,
  tag: '2.27', caption: 'the ruler-drop test: the further the ruler falls, the longer the reaction time',
  draw: (s, p) => {
    const x = 1.6, y0 = 1.55, per = 0.11; // ruler 0–30 cm
    box(s, x, y0 - 0.05, 0.38, 30 * per + 0.1, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let c = 0; c <= 30; c++) { const yy = y0 + c * per; line(s, x, yy, x + (c % 5 ? 0.08 : 0.18), yy, '6B5A2A', 0.75); if (c % 10 === 0) label(s, x + 0.15, yy - 0.1, 0.22, String(30 - c), { size: 10, h: 0.2, align: 'right' }); }
    // fingers at 0 cm (start) and catch at 20 cm
    box(s, x - 0.45, y0 + 30 * per - 0.12, 0.45, 0.22, 'E8B795', 'B07A55', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
    box(s, x + 0.38, y0 + 30 * per - 0.12, 0.45, 0.22, 'E8B795', 'B07A55', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
    label(s, x + 0.9, y0 + 30 * per - 0.18, 1.6, 'fingers ready at 0 cm\n(bottom of ruler)', { size: 10, bold: true, h: 0.4, align: 'left' });
    arrow(s, 1.1, 2.0, 1.1, 3.6, C.red, 2.5); label(s, 0.55, 2.55, 0.5, 'falls', { size: 10, bold: true, color: C.red, h: 0.45 });
    label(s, x + 0.55, y0 + 10 * per - 0.2, 1.5, 'caught at 20 cm\nfrom the bottom', { size: 10, bold: true, h: 0.4, align: 'left', color: C.blue });
    line(s, x + 0.4, y0 + 10 * per, x + 0.45, y0 + 10 * per, C.blue, 2);
    // conversion table
    const rows = [['distance fallen / cm', 'reaction time / s'], ...RT.map(([t, d]) => [d.toFixed(0), t.toFixed(2)])];
    s.addTable(rows.map((r, i) => r.map(t => ({ text: t, options: i === 0 ? { bold: true, color: C.white, fill: { color: C.ink } } : { fill: { color: i % 2 ? C.white : C.cardBlue } } }))), { x: 3.75, y: 2.55, w: 2.55, colW: [1.35, 1.2], rowH: 0.36, fontFace: 'Calibri', fontSize: 10.5, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    label(s, 3.75, 4.4, 2.55, 'table supplied in exams\n(from d = ½ g t²)', { size: 10, italic: true, color: C.grey, h: 0.4 });
  },
  head: 'Measuring reaction time',
  lines: [
    '**Ruler drop:** a partner drops a ruler without warning; you catch it. Read the distance fallen and convert to a time with a table. Repeat and take a mean.',
    'Computer tests: click when the screen changes colour.',
    'Typical reaction time: **0.2 s to 0.9 s** (about **0.7 s** for a driver in a real emergency).',
    'Longer reaction times are caused by **tiredness, alcohol, drugs** and **distractions** (e.g. using a phone, talking).',
  ],
  worked: { head: 'Reaction time and distance', q: 'A driver with a 0.70 s reaction time is travelling at 20 m/s. How far does the car go before braking starts?',
    steps: [['Equation', 'distance = speed × time'], ['Substitute', 'd = 20 m/s × 0.70 s'], ['Name', 'this is the thinking distance'], ['Answer', `d = ${think20} m`]] },
  qc: 'Give two reasons why a ruler-drop result might not be repeatable, and how to improve it.',
  notes: 'QUICK CHECK ANSWER: e.g. the catcher anticipates the drop; fingers not at the same start position; different hand used; tiredness. Improve: random timing of release, same start position and hand, repeat 5+ times and average, discard anomalies.\nConversion table checked in node: d = ½ × 10 × t² (5 cm ↔ 0.10 s, 11 cm ↔ 0.15 s, 20 cm ↔ 0.20 s, 31 cm ↔ 0.25 s). Students do not need this equation.',
}), '2.27, 2.30 Reaction times');

// ======================= 35 STOPPING DISTANCE =======================
reg(D.contentSlide({
  title: 'Stopping distance = thinking + braking',
  subtitle: `Specification ${sp('2.28')}–${sp('2.30')} • the factors that affect each part`,
  tag: '2.28', caption: 'a car at 20 m/s (about 45 mph): distances to scale',
  draw: (s, p) => {
    const k = 4.75 / 46; // in per m
    const x0 = 1.4, yR = 2.6;
    box(s, 0.6, yR - 0.35, 5.8, 0.9, '5A6275', null);
    line(s, 0.6, yR + 0.1, 6.4, yR + 0.1, 'F5F5F5', 1.5, { dash: 'dash' });
    car(s, x0 - 0.75, yR + 0.3, 0.75, C.blue);
    line(s, x0, 1.68, x0, yR + 0.55, C.ink, 1.5, { dash: 'dash' });
    line(s, x0 + TH[2] * k, 1.68, x0 + TH[2] * k, yR + 0.55, C.ink, 1.5, { dash: 'dash' });
    line(s, x0 + ST[2] * k, 1.68, x0 + ST[2] * k, yR + 0.55, C.ink, 1.5, { dash: 'dash' });
    label(s, x0 - 0.6, 1.4, 1.2, 'hazard seen', { size: 10, bold: true, h: 0.2 });
    label(s, x0 + TH[2] * k - 0.6, 1.4, 1.2, 'brakes on', { size: 10, bold: true, h: 0.2 });
    label(s, x0 + ST[2] * k - 0.9, 1.4, 1.0, 'stops', { size: 10, bold: true, h: 0.2, align: 'right' });
    box(s, x0, 3.25, TH[2] * k, 0.4, C.blue, null); label(s, x0, 3.25, TH[2] * k, `thinking ${TH[2]} m`, { h: 0.4, size: 10.5, bold: true, color: C.white });
    box(s, x0 + TH[2] * k, 3.25, BR[2] * k, 0.4, C.orangeTab, null); label(s, x0 + TH[2] * k, 3.25, BR[2] * k, `braking ${BR[2]} m`, { h: 0.4, size: 10.5, bold: true, color: C.white });
    dim(s, x0, x0 + ST[2] * k, 3.95, `stopping distance = ${TH[2]} + ${BR[2]} = ${ST[2]} m`, C.ink, { below: true });
    const bx = (x, col, head, body) => { box(s, x, 4.5, 2.65, 1.3, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: 1.5 }); s.addText([{ text: head, options: { bold: true, color: col, fontSize: 12, breakLine: true } }, ...T.rich(body, { fontSize: 11.5, color: C.text })], { x: x + 0.1, y: 4.55, w: 2.45, h: 1.2, fontFace: 'Calibri', valign: 'top', margin: 0 }); };
    bx(0.75, C.blue, 'Thinking distance ↑ with', '**speed** • driver’s **reaction time**: tiredness, alcohol, drugs, distractions');
    bx(3.6, C.orange, 'Braking distance ↑ with', '**speed** • **mass** • worn **brakes** • wet/icy **road** • worn **tyres** (less friction)');
  },
  head: 'Two parts to stopping',
  lines: [
    '**Thinking distance:** distance travelled during the driver’s **reaction time** (= speed × reaction time).',
    '**Braking distance:** distance travelled while the **brakes** slow the car to rest.',
    { t: '__stopping distance = thinking distance + braking distance__', nob: true },
    'Factors (2.29): **mass**, **speed**, **reaction time**, state of the **brakes**, state of the **road**, **friction** between tyre and road.',
  ],
  worked: { head: 'Which part changes?', q: 'Sort each factor into thinking or braking distance.',
    steps: [['Mobile phone', 'thinking distance increases (distraction)'], ['Icy road', 'braking distance increases (less friction)'], ['Heavy load', 'braking distance increases (more mass)'], ['Answer', 'speed increases BOTH parts']], size: 10.5 },
  qc: 'A driver has drunk alcohol. Explain the effect on the thinking distance and on the braking distance.',
  notes: `QUICK CHECK ANSWER: Reaction time increases, so the thinking distance increases. The braking distance is unchanged (it depends on the car, road and speed, not the driver).\nModel used: reaction time 0.70 s, braking deceleration 6.25 m/s² (asserted): at 20 m/s, 14 m + 32 m = 46 m (Highway Code at 40–50 mph: 12–15 m thinking, 24–38 m braking).`,
}), '2.28–2.30 Stopping distance');

// ======================= 36 STOPPING DISTANCES AT TYPICAL SPEEDS =======================
const GSD = { x: 1.4, y: 1.55, w: 4.8, h: 3.7, xmin: 5, xmax: 35, ymin: 0, ymax: 100, xstep: 5, ystep: 20, minor: 2, xlabel: 'speed / m/s', ylabel: 'distance / m', fmt: v => String(v) };
{
  const s = D.contentHeader('Stopping distances at typical speeds', `Specification ${sp('2.32')} • estimate how the emergency stopping distance varies with speed`, { tag: '2.32' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'model: reaction time 0.70 s, deceleration 6.25 m/s²; stacked bars to scale');
  axes(s, GSD);
  SPD.forEach((v, i) => {
    const x = px(GSD, v - 1.6), w = px(GSD, v + 1.6) - px(GSD, v - 1.6);
    box(s, x, py(GSD, TH[i]), w, py(GSD, 0) - py(GSD, TH[i]), C.blue, null);
    box(s, x, py(GSD, ST[i]), w, py(GSD, TH[i]) - py(GSD, ST[i]), C.orangeTab, null);
    label(s, x - 0.2, py(GSD, ST[i]) - 0.24, w + 0.4, String(ST[i]), { size: 10, bold: true, color: C.ink, h: 0.22 });
  });
  box(s, 1.6, 1.62, 0.22, 0.18, C.blue, null); label(s, 1.86, 1.58, 1.0, 'thinking', { size: 10.5, bold: true, align: 'left', h: 0.24 });
  box(s, 1.6, 1.92, 0.22, 0.18, C.orangeTab, null); label(s, 1.86, 1.88, 1.0, 'braking', { size: 10.5, bold: true, align: 'left', h: 0.24 });
  const head = ['speed / m/s', '≈ mph', 'thinking / m', 'braking / m', 'stopping / m'].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
  const rows = [head, ...SPD.map((v, i) => [String(v), String(mph(v)), String(TH[i]), String(BR[i]), String(ST[i])].map((t, j) => ({ text: t, options: { fill: { color: i % 2 ? C.white : C.cardBlue }, bold: j === 4, color: j === 4 ? C.red : C.text } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.25, 0.95, 1.25, 1.25, 1.38], rowH: 0.36, fontFace: 'Calibri', fontSize: 11.5, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 3.65, 6.08, 2.6, 'Patterns to spot', [
    '**Thinking distance ∝ speed:** double the speed (10 → 20 m/s) → thinking distance doubles (7 → 14 m).',
    '**Braking distance ∝ speed²:** double the speed → braking distance **× 4** (8 → 32 m).',
    'So at high speed the **braking** part dominates: at 30 m/s it is 72 m of the 93 m.',
    'A motorway stop at 70 mph is about **96 m** (Highway Code) – about 24 car lengths.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the table: by what factor does the braking distance increase from 10 m/s to 30 m/s? Explain why.');
  D.notes(s, `QUICK CHECK ANSWER: 72 ÷ 8 = 9 = 3². Braking distance is proportional to speed squared (the kinetic energy to remove is proportional to v²).\nModel values asserted in node: thinking = 0.70 v; braking = v² ÷ 12.5. mph conversions ×2.237. Highway Code (UK) typical stopping distances: 20 mph 12 m, 30 mph 23 m, 40 mph 36 m, 50 mph 53 m, 60 mph 73 m, 70 mph 96 m.`);
  reg(s, '2.32 Stopping distances at typical speeds');
}

// ======================= 37 LARGE DECELERATIONS =======================
{
  reg(D.contentSlide({
    title: 'Large decelerations: dangers and forces',
    subtitle: `Specification ${sp('2.31')} • estimate the forces in typical situations on a public road`,
    tag: '2.31', ht: true, caption: 'force on a 60 kg passenger stopping from 20 m/s (bars to scale)',
    draw: (s, p) => {
      const sc = 4.2 / 24000;
      label(s, 0.75, 1.45, 5.5, 'Same change in speed (20 m/s → 0), different stopping times', { size: 11.5, bold: true, color: C.ink });
      [['normal braking, 3.0 s', DEC[0], C.green], ['crash with crumple zone, seat belt, airbag: 0.20 s', DEC[1], C.orange], ['crash into a rigid wall, no restraint: 0.05 s', DEC[2], C.red]].forEach(([n, [t, a, F], col], i) => {
        const y = 1.95 + i * 1.15;
        label(s, 0.75, y, 5.5, n, { size: 10.5, bold: true, align: 'left', color: C.ink, h: 0.24 });
        box(s, 0.75, y + 0.3, Math.max(0.05, F * sc), 0.36, col, null);
        label(s, 0.85 + Math.max(0.05, F * sc), y + 0.3, 1.9, `${fmtN(F)} N`, { size: 11, bold: true, color: col, align: 'left', h: 0.36 });
        label(s, 0.75, y + 0.68, 5.5, `deceleration ≈ ${sf(a, 2)} m/s² (≈ ${sf(a / g, 2)} g)`, { size: 10.5, color: C.text, align: 'left', h: 0.24 });
      });
    },
    head: 'Why large decelerations are dangerous',
    lines: [
      'A sudden stop means a **large deceleration**, so (F = m × a) a **large force** acts on the people inside.',
      'Large forces cause serious injury: bones break, organs hit the body wall, the neck is whiplashed.',
      'Large decelerations also make **brakes overheat** and tyres skid.',
      '!!HT!! To **estimate** the force: estimate the speed, mass and stopping time, then use a = (v − u) ÷ t and F = m × a.',
    ],
    worked: { head: 'Estimate the force (HT)', q: 'A 60 kg passenger stops from 20 m/s in 0.20 s in a crash.',
      steps: [['Deceleration', 'a = (0 − 20) ÷ 0.20 = −100 m/s²'], ['Force', 'F = m × a = 60 × 100'], ['Compare', 'about 10 × the passenger’s weight (600 N)'], ['Answer', 'F ≈ 6000 N']] },
    qc: 'A cyclist (total mass 80 kg) at 6 m/s stops in 0.1 s when hitting a wall. Estimate the force on the cyclist.',
    notes: 'QUICK CHECK ANSWER: a = 6 ÷ 0.1 = 60 m/s²; F = 80 × 60 ≈ 4800 N (about 5000 N).\nValues asserted in node: 20/3.0 ≈ 6.7 m/s² (400 N); 20/0.20 = 100 m/s² (6000 N); 20/0.05 = 400 m/s² (24 000 N).\nTier: a 1SC0 checklist lists “explain the dangers caused by large decelerations” for both tiers and “estimate the forces involved” as HT only, so the slide carries an HT pill for the estimate.',
  }), '2.31 Large decelerations');
}
calc('qc37 a = 6/0.1', 6 / 0.1, 60, 1e-9); calc('qc37 F = 80*60', 80 * 60, 4800, 1e-9);

// ======================= 38 BRAKING WORK DONE (H) =======================
const GBW = { x: 1.4, y: 1.55, w: 4.8, h: 3.4, xmin: 0, xmax: 40, ymin: 0, ymax: 160, xstep: 10, ystep: 40, minor: 2, xlabel: 'initial speed / m/s', ylabel: 'braking distance / m', fmt: v => String(v) };
reg(D.contentSlide({
  title: 'Braking distance and kinetic energy',
  subtitle: `Specification ${sp('2.33')} • work done by the brakes = initial kinetic energy, so braking distance ∝ v²`,
  tag: '2.33', ht: true, caption: '1200 kg car, braking force 6000 N: plotted to scale',
  draw: (s, p) => {
    axes(s, GBW);
    fnLine(s, GBW, v => 0.5 * 1200 * v * v / 6000, 0, 40, 40, C.red, 2.5);
    [[20, 40], [40, 160]].forEach(([v, d]) => {
      line(s, px(GBW, v), py(GBW, 0), px(GBW, v), py(GBW, d), C.blue, 1, { dash: 'dash' });
      line(s, px(GBW, 0), py(GBW, d), px(GBW, v), py(GBW, d), C.blue, 1, { dash: 'dash' });
      s.addShape(SH.OVAL, { x: px(GBW, v) - 0.06, y: py(GBW, d) - 0.06, w: 0.12, h: 0.12, fill: { color: C.blue }, line: { color: C.blue } });
    });
    label(s, px(GBW, 21), py(GBW, 32), 1.5, '20 m/s → 40 m', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, px(GBW, 21), py(GBW, 160) + 0.05, 1.7, '40 m/s → 160 m', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, 1.5, 5.6, 4.6, 'double the speed → 4 × the braking distance', { size: 11, bold: true, color: C.red, h: 0.26 });
  },
  head: 'Work done by the brakes',
  lines: [
    'Friction in the brakes does **work** on the car: energy is transferred from the **kinetic store** to the **thermal store** of the brakes.',
    { t: 'work done by brakes = initial kinetic energy:   __F × d = ½ × m × v²__', nob: true },
    { t: 'RECALL: E = F × d (Topic 8) and KE = ½ × m × v² (Topic 3).', nob: true, color: C.red, b: true, size: 10.5 },
    'For a fixed braking force, **d ∝ v²**.',
  ],
  worked: { head: 'Worked example', q: 'A 1200 kg car at 20 m/s brakes with a force of 6000 N. Calculate the braking distance.',
    steps: [['KE', `½ × 1200 × 20² = ${fmtN(KE20)} J`], ['Equation', 'F × d = KE, so d = KE ÷ F'], ['Substitute', `d = ${fmtN(KE20)} J ÷ 6000 N`], ['Answer', `d = ${dB20} m`]] },
  qc: 'A 1000 kg car at 15 m/s brakes with a constant force of 5000 N. Calculate the braking distance.',
  notes: `QUICK CHECK ANSWER: KE = ½ × 1000 × 15² = 112 500 J; d = 112 500 ÷ 5000 = ${qc33} m.\nCurve: d = ½ × 1200 × v² ÷ 6000 = v²/10 (asserted at 20, 30 and 40 m/s).\nHT: 2.33 is Higher only (medium confidence).`,
}), '2.33 Braking distance and KE (HT)');

// ======================= 39 RECAP 8 =======================
const R8 = D.recapSlide(8, `Specification ${sp('2.27')}–${sp('2.33')} • reaction time and stopping distance`, [
  { q: 'State what is meant by the **stopping distance** of a car. Give **one** factor that increases the thinking distance and **one** that increases the braking distance.', marks: 3, ms: 'thinking distance + braking distance (1); thinking: e.g. tiredness / alcohol / drugs / distraction / higher speed (1); braking: e.g. wet or icy road / worn tyres / worn brakes / greater mass / higher speed (1).' },
  { q: 'Describe how a ruler-drop test can be used to measure a person’s reaction time.', marks: 2, ms: 'Partner drops a ruler without warning; person catches it as quickly as possible (1); measure distance fallen and convert to a time using a table / repeat and average (1).' },
  { q: 'A **1000 kg** car travelling at **20 m/s** brakes with a constant force of **5000 N**. Calculate the braking distance.', marks: 3, ht: true, ms: 'KE = ½ × 1000 × 20² = 200 000 J (1); F × d = KE so d = 200 000 ÷ 5000 (1); = 40 m (1).' },
]);
reg(R8.s, 'Recap 8');

// ======================= 40 EQUATIONS =======================
reg(D.equationsSlide([['sdt', sp('2.6')], ['avut', sp('2.8')], ['suvat', sp('2.9')], ['Fma', sp('2.15')], ['Wmg', sp('2.16')], ['pmv', sp('2.24') + ' (H)'], ['Fdp', sp('2.26') + ' (H)']], {
  subtitle: 'Topic 2 equations • RECALL = learn it; GIVEN = on the Physics Equations List',
  qc: 'Cover the middle column. For each equation, say every quantity and its unit aloud. Also recall: KE = ½mv² and E = F × d.',
  notes: 'QUICK CHECK: self-check against the table. Recall: average speed = distance ÷ time; a = (v − u)/t; F = ma; W = mg; p = mv (H). Given: v² − u² = 2ax; F = (mv − mu)/t (H). Links used on slide 38: KE = ½ × m × v² (Topic 3, recall) and work done E = F × d (Topic 8, recall). See SPEC_T2.md for sources.',
}), 'Summary: equations');

// ======================= 41 KEY WORDS =======================
reg(D.keyWords([
  ['Scalar', 'Has magnitude (size) only, e.g. distance, speed, mass.'],
  ['Vector', 'Has magnitude and direction, e.g. displacement, velocity, force.'],
  ['Velocity', 'Speed in a stated direction (m/s).'],
  ['Acceleration', 'Rate of change of velocity: a = (v − u) ÷ t, in m/s².'],
  ['Gradient', 'd–t graph: speed. v–t graph: acceleration.'],
  ['Area under v–t', 'Distance travelled.'],
  ['Resultant force', 'Single force with the same effect as all the forces acting.'],
  ['Newton’s 1st law', 'Resultant force zero → velocity stays constant (or at rest).'],
  ['Newton’s 2nd law', 'F = m × a: resultant force = mass × acceleration.'],
  ['Newton’s 3rd law', 'Interacting objects exert equal and opposite forces on each other.'],
  ['Weight', 'Force due to gravity: W = m × g, measured with a newtonmeter.'],
  ['Inertial mass (H)', 'How hard it is to change velocity: m = F ÷ a.'],
  ['Centripetal force (H)', 'Resultant force towards the centre of a circle.'],
  ['Momentum (H)', 'p = m × v (kg m/s); conserved in collisions.'],
  ['Thinking distance', 'Distance travelled during the driver’s reaction time.'],
  ['Braking distance', 'Distance travelled while the brakes stop the vehicle.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. (H) terms are Higher only.' }), 'Summary: key words');

// ======================= 42 FULL QUESTION =======================
reg(D.fullQuestion('A car of mass **1200 kg** accelerates uniformly from rest to **15 m/s** in **6.0 s** along a straight road. Later, the driver sees a hazard and makes an emergency stop.', [
  { l: 'a', q: 'State the equation that links acceleration, change in velocity and time taken.', marks: 1, ms: 'acceleration = change in velocity ÷ time taken / a = (v − u) ÷ t (1).' },
  { l: 'b', q: 'Calculate the acceleration of the car.', marks: 2, ms: 'a = (15 − 0) ÷ 6.0 (1); = 2.5 m/s² (1).' },
  { l: 'c', q: 'Calculate the resultant force on the car while it accelerates.', marks: 2, ms: 'F = m × a = 1200 × 2.5 (1); = 3000 N (1). ECF from (b).' },
  { l: 'd', q: 'Use v² − u² = 2 × a × x to calculate the distance the car travels while accelerating.', marks: 3, ms: 'x = (v² − u²) ÷ 2a (1); = (15² − 0) ÷ (2 × 2.5) (1); = 45 m (1). ECF from (b). Alternative: area under v–t graph = ½ × 6.0 × 15 = 45 m.', h: 1.2 },
  { l: 'e', q: 'The driver is tired. Explain how this affects the **stopping distance**.', marks: 2, ms: 'Reaction time increases so thinking distance increases (1); braking distance unchanged, so stopping distance increases (1).' },
  { l: 'f', q: 'In a crash at 15 m/s the car stops in **0.30 s**. Calculate the momentum of the car before the crash and the average force on it.', marks: 3, ht: true, ms: 'p = 1200 × 15 = 18 000 kg m/s (1); F = change in momentum ÷ t = 18 000 ÷ 0.30 (1); = 60 000 N (1).', h: 1.2 },
], 13, { subtitle: 'Specification 2.8–2.9, 2.15, 2.24–2.30 • answer every part • 13 marks' }), 'Full question');

// ======================= 43–44 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Explain the difference between **speed** and **velocity**.', marks: 2, ms: 'Speed is a scalar / has size only (1); velocity is a vector: speed in a stated direction (1).' },
  { n: '2', q: 'A cyclist travels **3.0 km** in **10 minutes**. Calculate the average speed in m/s.', marks: 3, ms: 'd = 3000 m and t = 600 s (1); s = 3000 ÷ 600 (1); = 5.0 m/s (1).' },
  { n: '3', q: 'Calculate the resultant force needed to give a **70 kg** sprinter an acceleration of **4.0 m/s²**.', marks: 2, ms: 'F = m × a = 70 × 4.0 (1); = 280 N (1).' },
  { n: '4', q: 'A **0.80 kg** trolley moving at **2.5 m/s** hits a stationary **1.2 kg** trolley. They stick together. Calculate their velocity just after the collision.', marks: 4, ht: true, ms: 'p before = 0.80 × 2.5 = 2.0 kg m/s (1); momentum is conserved (1); 2.0 = (0.80 + 1.2) × v (1); v = 1.0 m/s (1).' },
  { n: '5', q: 'Explain how the driver, the car and the road affect the stopping distance of a car. Explain why the stopping distance increases so much at high speeds.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Stopping distance = thinking distance + braking distance.',
    'Thinking distance = distance travelled during the reaction time.',
    'Driver: tiredness, alcohol, drugs, distractions (phone) increase reaction time → longer thinking distance.',
    'Car: worn brakes, worn tyres, greater mass (heavy load) → longer braking distance.',
    'Road: wet, icy, oily or loose surfaces reduce friction between tyres and road → longer braking distance.',
    'Higher speed → thinking distance increases in proportion to speed.',
    'Braking distance increases with speed squared (doubling speed → four times the braking distance).',
    'Because kinetic energy ∝ v² and the work done by the brakes (F × d) must equal the kinetic energy.',
    'So at high speed braking distance is the larger part of the stopping distance.',
  ]);
}
D.homework('Answer every question. Show your working for calculations. g = 10 N/kg.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7);
assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 7); assert.strictEqual(R7.total, 8); assert.strictEqual(R8.total, 8);
assert(D.slideNo >= 38 && D.slideNo <= 46, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T2_MotionAndForces.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
