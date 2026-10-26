// build_T9.js — Edexcel GCSE Physics 1PH0 Topic 9 Forces and their effects (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T9.js
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 9,
  title: 'Forces and their effects',
  shortTitle: 'T9',
  subtitle: 'Interacting forces, vector diagrams, moments, levers and gears',
  specRange: '9.1–9.10',
  pOnly: ['9.6', '9.7', '9.8', '9.9', '9.10'],
  paper: 'Paper 2',
  keywords: ['Contact', 'Non-contact', 'Vectors', 'Resultant force', 'Moments', 'Levers and gears'],
};
const D = T.init(DECK);
const { line, arrow, forceArrow, label, box, massHanger, axes, points, plotLine, px, py, SH } = D;
const sp = D.spec;
const g = 10; // N/kg, Edexcel exam value
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const deg = r => r * 180 / Math.PI, rad = d => d * Math.PI / 180;
const near = (a, b, tol, msg) => assert(Math.abs(a - b) <= tol, `${msg}: ${a} vs ${b}`);

// ======================= local drawing helpers =======================
// arc (optionally with an arrowhead at a1). Angles in degrees in SCREEN coordinates (y down),
// so increasing angle = clockwise on the slide.
function arc(s, cx, cy, r, a0, a1, color = C.ink, w = 2, head = false, n = 18) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const a = rad(a0 + (a1 - a0) * i / n); pts.push([cx + r * Math.cos(a), cy + r * Math.sin(a)]); }
  for (let i = 0; i < n; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], color, w, { head: head && i === n - 1 });
}
// rotation arrow: dir = +1 clockwise, -1 anticlockwise; drawn over the top of the centre between angles -150° and -30°
function turnArrow(s, cx, cy, r, dir, color = C.blue, w = 2.25, span = [-150, -30]) {
  const [a, b] = span;
  if (dir > 0) arc(s, cx, cy, r, a, b, color, w, true); else arc(s, cx, cy, r, b, a, color, w, true);
}
// square grid for scale drawings
function grid(s, x, y, nx, ny, sq) {
  box(s, x, y, nx * sq, ny * sq, C.white, null);
  for (let i = 0; i <= nx; i++) line(s, x + i * sq, y, x + i * sq, y + ny * sq, i % 5 === 0 ? 'C9D3E6' : 'E2E8F2', 0.5);
  for (let j = 0; j <= ny; j++) line(s, x, y + j * sq, x + nx * sq, y + j * sq, j % 5 === 0 ? 'C9D3E6' : 'E2E8F2', 0.5);
}
// arrow of length (newtons × k) from (x,y) at angle a (deg, screen coords: 0 = right, -90 = up); returns tip
function vec(s, x, y, F, k, a, color = C.red, w = 2.75, o = {}) {
  const x2 = x + F * k * Math.cos(rad(a)), y2 = y + F * k * Math.sin(rad(a));
  arrow(s, x, y, x2, y2, color, w, o);
  return [x2, y2];
}
// pivot wedge with apex at (x, y)
function pivot(s, x, y, w = 0.42, h = 0.42, color = '5A6275') {
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: x - w / 2, y, w, h, fill: { color }, line: { color } });
}
// gear: body circle + n radial teeth; phase in degrees
function gear(s, cx, cy, r, n, phase, fill, o = {}) {
  const th = o.th || 0.13, tw = (2 * Math.PI * r / n) * 0.48;
  for (let i = 0; i < n; i++) {
    const a = phase + 360 * i / n, rr = r + th * 0.15;
    box(s, cx + rr * Math.cos(rad(a)) - tw / 2, cy + rr * Math.sin(rad(a)) - th / 2, tw, th, fill, '4A5262', { lw: 0.75, rotate: a - 90 });
  }
  s.addShape(SH.OVAL, { x: cx - (r - th * 0.35), y: cy - (r - th * 0.35), w: 2 * (r - th * 0.35), h: 2 * (r - th * 0.35), fill: { color: fill }, line: { color: '4A5262', width: 1 } });
  s.addShape(SH.OVAL, { x: cx - 0.09, y: cy - 0.09, w: 0.18, h: 0.18, fill: { color: '4A5262' }, line: { color: '4A5262' } });
}
// labelled leader line
const lead = (s, x, y, x2, y2, t, w, al = 'left') => { line(s, x, y, x2, y2, C.grey, 0.75); label(s, al === 'right' ? x2 - w - 0.05 : x2 + 0.05, y2 - 0.14, w, t, { size: 10.5, bold: true, align: al, color: C.ink }); };

// ======================= CALCULATIONS (asserted) =======================
// starter
calc('starter 450 g', 450 / 1000, 0.45, 1e-12);
calc('starter W = 60*10', 60 * g, 600);
calc('starter E = 50*4.0', 50 * 4.0, 200);
// slide 6: block pulled at constant speed (scale 0.08 in/N)
const k6 = 0.08, F6 = { W: 20, N: 20, T: 12, Fr: 12 };
calc('s6 vertical resultant', F6.N - F6.W, 0); calc('s6 horizontal resultant', F6.T - F6.Fr, 0);
// slide 7: book 0.50 kg
const Wbook = calc('book W = 0.50*10', 0.50 * g, 5.0, 1e-12);
// slide 10: parachutist 80 kg (scale 0.0015 in/N)
const W10 = calc('skydiver W = 80*10', 80 * g, 800), k10 = 0.002;
const R10a = calc('just after jump 800-200', W10 - 200, 600), R10b = calc('terminal 800-800', W10 - 800, 0);
calc('a just after jump = 600/80', R10a / 80, 7.5, 1e-12);
// slide 11: box pushed (scale 0.03 in/N)
const k11 = 0.03, push11 = 50, fr11 = 30, W11 = 40;
const R11 = calc('R11 = 50-30', push11 - fr11, 20);
const a11 = calc('a11 = 20/4.0', R11 / (W11 / g), 5.0, 1e-12);
const qc11 = calc('qc11 R = 3000-1800', 3000 - 1800, 1200); calc('qc11 a = 1200/1200', qc11 / 1200, 1.0, 1e-12);
// slide 13: right angles, 40 N east + 30 N north; scale 1 square (0.5 in) = 10 N
const sq13 = 0.5, k13 = sq13 / 10;
const O13 = [3.6, 4.8], A13 = [O13[0] + 40 * k13, O13[1]], B13 = [A13[0], A13[1] - 30 * k13];
const R13 = calc('s13 measured resultant (drawn length / scale)', Math.hypot(B13[0] - O13[0], B13[1] - O13[1]) / k13, 50, 1e-9);
const th13 = deg(Math.atan2(O13[1] - B13[1], B13[0] - O13[0]));
near(th13, 36.87, 0.01, 's13 angle'); calc('s13 angle rounded', Math.round(th13), 37);
calc('s13 Pythagoras check', Math.sqrt(40 ** 2 + 30 ** 2), 50, 1e-12);
const qc13 = calc('qc13 sqrt(6^2+8^2)', Math.hypot(6, 8), 10, 1e-12); near(deg(Math.atan2(8, 6)), 53.13, 0.01, 'qc13 angle');
// slide 14: 8.0 N east + 6.0 N at 60° above east; scale 1 square (0.3 in) = 1 N
const sq14 = 0.3, k14 = sq14 / 1;
const O14 = [1.0, 5.3], A14 = [O14[0] + 8 * k14, O14[1]], B14 = [A14[0] + 6 * k14 * Math.cos(rad(60)), A14[1] - 6 * k14 * Math.sin(rad(60))];
const R14 = Math.hypot(B14[0] - O14[0], B14[1] - O14[1]) / k14;
near(R14, Math.sqrt(64 + 36 + 2 * 48 * 0.5), 1e-9, 's14 cosine-rule check');
near(R14, 12.17, 0.005, 's14 resultant'); calc('s14 resultant 2 s.f.', sf(R14, 2), 12, 1e-12);
const th14 = deg(Math.atan2(O14[1] - B14[1], B14[0] - O14[0]));
near(th14, 25.3, 0.05, 's14 angle'); calc('s14 angle rounded', Math.round(th14), 25);
// slide 16: resolve 20 N at 30° above horizontal; scale 1 square (0.25 in) = 2 N
const sq16 = 0.25, k16 = sq16 / 2;
const O16 = [1.4, 5.1], T16 = [O16[0] + 20 * k16 * Math.cos(rad(30)), O16[1] - 20 * k16 * Math.sin(rad(30))];
const Fx16 = (T16[0] - O16[0]) / k16, Fy16 = (O16[1] - T16[1]) / k16;
near(Fx16, 17.32, 0.005, 's16 Fx'); calc('s16 Fx 3 s.f.', sf(Fx16, 3), 17.3, 1e-12); calc('s16 Fy', Fy16, 10, 1e-9);
calc('s16 squares across (Fx/2)', sf(Fx16 / 2, 2), 8.7, 1e-12);
calc('qc16 Fx = 12 cos60', 12 * Math.cos(rad(60)), 6.0, 1e-9); calc('qc16 Fy = 12 sin60 (3 s.f.)', sf(12 * Math.sin(rad(60)), 3), 10.4, 1e-12);
// slide 17: lamp 50 N held by two cables at 90° to each other; closed triangle
const W17 = 50, T1 = 40, T2 = 30;
const al1 = deg(Math.atan(T2 / T1)); // left cable angle from vertical
near(al1, 36.87, 0.01, 's17 alpha');
const al2 = 90 - al1;
const u1 = [-Math.sin(rad(al1)), -Math.cos(rad(al1))], u2 = [Math.sin(rad(al2)), -Math.cos(rad(al2))];
near(T1 * u1[0] + T2 * u2[0], 0, 1e-9, 's17 horizontal equilibrium');
near(T1 * u1[1] + T2 * u2[1] + W17, 0, 1e-9, 's17 vertical equilibrium');
const k17t = 0.05, S17 = [4.4, 1.75];
const P17a = [S17[0], S17[1] + W17 * k17t], P17b = [P17a[0] + T2 * k17t * u2[0], P17a[1] + T2 * k17t * u2[1]], P17c = [P17b[0] + T1 * k17t * u1[0], P17b[1] + T1 * k17t * u1[1]];
near(Math.hypot(P17c[0] - S17[0], P17c[1] - S17[1]), 0, 1e-9, 's17 triangle closes');
// slide 20: moment
const M20 = calc('M20 = 40*0.25', 40 * 0.25, 10, 1e-12);
const qc20 = calc('qc20 = 15*0.80', 15 * 0.80, 12, 1e-12);
// slide 21: see-saw
const ss = { A: [400, 1.5], B: [600, 1.0] };
calc('see-saw anticlockwise 400*1.5', ss.A[0] * ss.A[1], 600, 1e-12);
calc('see-saw clockwise 600*1.0', ss.B[0] * ss.B[1], 600, 1e-12);
const d21 = calc('d21 = 300*2.0/500', 300 * 2.0 / 500, 1.2, 1e-12);
const qc21 = calc('qc21 = 250*2.4/400', 250 * 2.4 / 400, 1.5, 1e-12);
// slide 22: beam with its own weight
const b22 = { L: 2.0, Wb: 40, pivotAt: 0.50, right: 30 };
const F22 = calc('F22 = (40*0.50 + 30*1.5)/0.50', (b22.Wb * (b22.L / 2 - b22.pivotAt) + b22.right * (b22.L - b22.pivotAt)) / b22.pivotAt, 130, 1e-9);
const S22 = calc('support = 130+40+30', F22 + b22.Wb + b22.right, 200, 1e-9);
// practical: principle of moments data (left = anticlockwise, right = clockwise)
const PM = [[1.0, 0.300, 1.5, 0.201], [1.0, 0.400, 2.0, 0.199], [2.0, 0.150, 1.0, 0.302], [1.5, 0.400, 2.0, 0.298], [2.0, 0.250, 2.5, 0.199], [2.5, 0.240, 3.0, 0.201]];
PM.forEach(([f1, d1, f2, d2], i) => assert(Math.abs(f1 * d1 - f2 * d2) / (f1 * d1) < 0.012, 'PM row ' + i));
calc('PM drawn: 1.0*0.30 = 1.5*0.20', 1.0 * 0.30 - 1.5 * 0.20, 0, 1e-12);
calc('qc24 d = 2.0*0.15/1.5', 2.0 * 0.15 / 1.5, 0.20, 1e-12);
calc('mass 150 g weight', 0.150 * g, 1.5, 1e-12);
// slide 27: lever (crowbar)
const lv = { E: 50, dE: 1.2, dL: 0.15 };
const L27 = calc('L27 = 50*1.2/0.15', lv.E * lv.dE / lv.dL, 400, 1e-9);
const qc27 = calc('qc27 effort = 600*0.40/1.2', 600 * 0.40 / 1.2, 200, 1e-9);
// slide 28: gears
const gA = { n: 12, r: 0.05, dir: +1 }, gB = { n: 24, r: 0.10 };
gB.dir = -gA.dir; // meshing gears turn in opposite directions
assert.strictEqual(gB.dir, -1, 'driven gear must turn anticlockwise');
const Ft28 = calc('tooth force = 6.0/0.05', 6.0 / gA.r, 120, 1e-9);
const MB28 = calc('driven moment = 120*0.10', Ft28 * gB.r, 12, 1e-9);
const turns28 = calc('driven turns per driver turn = 12/24', gA.n / gB.n, 0.5, 1e-12);
calc('qc28 speed = 60*40/20', 60 * 40 / 20, 120, 1e-12);
// slide 29: lubrication efficiency
const eff1 = calc('eff before = (500-150)/500', (500 - 150) / 500, 0.70, 1e-12);
const eff2 = calc('eff after = (500-50)/500', (500 - 50) / 500, 0.90, 1e-12);
// recaps
calc('R2 resultant 700-250', 700 - 250, 450);
calc('R3 Q1 sqrt(5^2+12^2)', Math.hypot(5, 12), 13, 1e-12); near(deg(Math.atan2(12, 5)), 67.38, 0.01, 'R3 Q1 angle');
const R3q2 = Math.sqrt(16 + 49 + 2 * 28 * Math.cos(rad(50))); near(R3q2, 10.05, 0.005, 'R3 Q2'); near(deg(Math.atan2(4 * Math.sin(rad(50)), 7 + 4 * Math.cos(rad(50)))), 17.75, 0.01, 'R3 Q2 angle');
calc('R4 Q1 Fx (3 s.f.)', sf(50 * Math.cos(rad(40)), 3), 38.3, 1e-12); calc('R4 Q1 Fy (3 s.f.)', sf(50 * Math.sin(rad(40)), 3), 32.1, 1e-12);
calc('R4 Q3 tension (3 s.f.)', sf(Math.hypot(13, 5), 3), 13.9, 1e-12);
calc('R5 Q2 = 25*0.40', 25 * 0.40, 10, 1e-12); calc('R5 Q3 = 450*1.2/360', 450 * 1.2 / 360, 1.5, 1e-12);
calc('R6 Q3 = 2.0*0.25/1.5 (2 s.f.)', sf(2.0 * 0.25 / 1.5, 2), 0.33, 1e-12);
calc('R7 Q1 = 600*0.20/1.5', 600 * 0.20 / 1.5, 80, 1e-9); calc('R7 Q2 = 10/30', 10 / 30, 1 / 3, 1e-12);
// full question
calc('FQ c', Math.hypot(30, 40), 50, 1e-12);
calc('FQ d = 300*2.0', 300 * 2.0, 600, 1e-12); calc('FQ e = 600/400', 600 / 400, 1.5, 1e-12);
// homework
calc('HW3 = 60-45', 60 - 45, 15); calc('HW4 = 45*0.20', 45 * 0.20, 9.0, 1e-12);

// slide plan constants for the "where this fits" slide (asserted at the end)
const P_FIRST = 19, P_LAST = 31;

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Forces and their Effects',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • no Core Practical; suggested practical: principle of moments` },
    { icon: 'H', text: 'Higher & Foundation in one deck • HT pill = Higher tier only • P = physics only' },
    { icon: '9', text: `Topic 9 of 15 • ${DECK.paper}` },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Physics 1PH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 9 Forces and their effects (Paper 2). Statements 9.1–9.5 are also in Combined Science 1SC0 (9.3–9.5 are Higher only). 9.6P–9.10P (moments, levers, gears, lubrication) are physics only. Topic 9 has no Core Practical; slides 24–26 are a suggested practical. g = 10 N/kg is used throughout, as in Edexcel papers.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '9.1', text: 'Describe how objects interact **at a distance** (gravitational, electrostatic, magnetic) and **by contact**, in **pairs of forces**.' },
  { code: '9.2', text: 'Explain the difference between **vector** and **scalar** quantities, using examples.' },
  { code: '9.3', text: 'Use **vector diagrams** (scale drawings) for a resultant force, resolving a force, and equilibrium.', ht: true },
  { code: '9.4, 9.5', text: 'Draw and use **free body diagrams**; explain **resultant** and **balanced** forces on an object.', ht: true },
  { code: '9.6P, 9.7P', text: 'Describe how forces cause **rotation**; recall and use **moment = force × distance**.' },
  { code: '9.8P', text: 'Recall and use the **principle of moments** for objects in equilibrium.' },
  { code: 'Practical', text: '**Suggested practical:** test the principle of moments with a metre rule on a pivot.' },
  { code: '9.9P, 9.10P', text: 'Explain how **levers** and **gears** transmit turning effects, and how **lubrication** reduces energy waste.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'Objectives 1–4 are in both 1PH0 and Combined Science 1SC0; objectives 3 and 4 are Higher only (9.3, 9.4, 9.5 marked H). Objectives 5–8 are physics only (9.6P–9.10P). The practical is a suggested practical, not a Core Practical: Topic 9 has no Core Practical.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 9 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['9.1', 'Non-contact and contact forces; interaction pairs', 'BOTH COURSES', C.blue],
    ['9.2', 'Vector and scalar quantities', 'BOTH COURSES', C.blue],
    ['9.3–9.5 (H)', 'Vector diagrams, free body diagrams, resultants', 'BOTH • HT', C.blue],
    ['9.6P–9.8P', 'Moments and the principle of moments', 'PHYSICS ONLY', C.red],
    ['Practical', 'Suggested practical: principle of moments', 'SUGGESTED', C.orange],
    ['9.9P–9.10P', 'Levers, gears and lubrication', 'PHYSICS ONLY', C.red],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'Topic 9\nForces and their effects', { h: 0.75, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.75 + 0.3, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.75;
    line(s, 1.0, y + 0.3, 1.45, y + 0.3, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who, col, 1.2);
  });
  label(s, 0.45, 6.55, 6.6, 'Earlier links: Topic 1 units • Topic 2 W = mg, F = ma • Topic 3 energy • Topic 8 work done', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.65, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1PH0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 8–15.',
      'Combined Science 1SC0 **Paper 6** tests 9.1–9.5 only.',
      'Equations: **recall** moment = force × distance normal to the direction of the force.',
      '**No Core Practical** in Topic 9. The moments practical here is a suggested practical.',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.15, 5.53, 2.7, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both courses and tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      `**Combined (1SC0) classes skip slides ${P_FIRST}–${P_LAST}** (moments, the practical, levers, gears and lubrication), full question (d)–(f) and homework Q4–Q6.`,
      'So **most** of the topic is physics only, but **not all**: 9.1–9.5 are in both courses.',
      '**HT** pills: 9.3, 9.4 and 9.5 are Higher only.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.25, w: 5.15, h: 2.5, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, `Physics-only statements: ${DECK.pOnly.map(c => c + 'P').join(', ')}. Combined Science classes stop after slide 18 (recap 4) and go straight to the equations, key words, full question (a)–(c) and homework Q1–Q3.\nCombined classes met lubrication as a way of reducing unwanted energy transfer in Topic 3 (3.9). Electrostatic forces are developed further in Topic 11 (static electricity, physics only).`);
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 1 • units', q: 'Convert **450 g** into kilograms and **35 cm** into metres.' },
  { from: 'Topic 2 • weight', q: 'Calculate the **weight** of a 60 kg student. g = 10 N/kg.' },
  { from: 'Topic 2 • speed and velocity', q: 'Explain the difference between **speed** and **velocity**.' },
  { from: 'Topic 2 • Newton’s first law', q: 'The resultant force on a moving car is **zero**. Describe its motion.' },
  { from: 'Topic 8 • work done', q: 'A 50 N force pushes a box **4.0 m**. Calculate the **work done**.' },
  { from: 'Topic 3 • energy', q: 'A bike chain rubs as it moves. What happens to the energy transferred by **friction**?' },
], { subtitle: 'Recall from Topics 1, 2, 3 and 8 • 6 minutes • no notes', notes: 'ANSWERS\n1. 0.45 kg; 0.35 m.\n2. W = m × g = 60 × 10 = 600 N.\n3. Speed has size only (scalar); velocity is speed in a given direction (vector).\n4. It continues at a constant speed in a straight line (constant velocity).\n5. E = F × d = 50 × 4.0 = 200 J.\n6. It is dissipated: the chain and surroundings warm up (thermal energy store) – wasted energy.' }), 'Retrieval starter');

// ======================= 5 9.1 NON-CONTACT FORCES =======================
reg(D.contentSlide({
  title: 'Forces at a distance: non-contact forces',
  subtitle: `Specification ${sp('9.1')}(a) • gravitational, electrostatic and magnetic fields`,
  tag: '9.1', caption: 'each pair of arrows is equal in size and opposite in direction',
  draw: (s, p) => {
    // gravity
    label(s, 0.7, 1.45, 4.0, 'Gravitational: masses attract', { bold: true, size: 12, align: 'left', color: C.ink });
    s.addShape(SH.OVAL, { x: 1.0, y: 1.85, w: 0.9, h: 0.9, fill: { color: '4F8FD6' }, line: { color: '2E5BA8', width: 1 } });
    label(s, 1.0, 2.15, 0.9, 'Earth', { size: 10.5, bold: true, color: C.white });
    s.addShape(SH.OVAL, { x: 5.1, y: 2.12, w: 0.36, h: 0.36, fill: { color: 'B8BDC7' }, line: { color: '6B7385', width: 1 } });
    label(s, 4.85, 2.5, 0.86, 'Moon', { size: 10.5, bold: true });
    forceArrow(s, 1.9, 2.3, 'right', 0.8, null, C.red); forceArrow(s, 5.1, 2.3, 'left', 0.8, null, C.red);
    label(s, 2.5, 2.42, 2.0, 'equal and opposite pulls', { size: 10.5, color: C.red, bold: true });
    // electrostatic
    label(s, 0.7, 3.0, 4.0, 'Electrostatic: like charges repel', { bold: true, size: 12, align: 'left', color: C.ink });
    [[2.2, 'A'], [4.3, 'B']].forEach(([x]) => {
      s.addShape(SH.OVAL, { x: x - 0.32, y: 3.4, w: 0.64, h: 0.8, fill: { color: 'F4B183' }, line: { color: 'B8730A', width: 1 } });
      line(s, x, 4.2, x + 0.05, 4.55, C.grey, 1);
      label(s, x - 0.32, 3.55, 0.64, '− −\n− −', { h: 0.5, size: 12, bold: true, color: C.ink });
    });
    forceArrow(s, 1.88, 3.8, 'left', 0.7, null, C.red); forceArrow(s, 4.62, 3.8, 'right', 0.7, null, C.red);
    // magnetic
    label(s, 0.7, 4.65, 4.0, 'Magnetic: unlike poles attract', { bold: true, size: 12, align: 'left', color: C.ink });
    const mag = (x) => { box(s, x, 5.1, 0.7, 0.42, 'D9534F', '8A2A26'); box(s, x + 0.7, 5.1, 0.7, 0.42, '4F8FD6', '2E5BA8'); label(s, x, 5.1, 0.7, 'N', { h: 0.42, bold: true, color: C.white, size: 12 }); label(s, x + 0.7, 5.1, 0.7, 'S', { h: 0.42, bold: true, color: C.white, size: 12 }); };
    mag(0.9); mag(4.1);
    forceArrow(s, 2.3, 5.31, 'right', 0.55, null, C.red); forceArrow(s, 4.1, 5.31, 'left', 0.55, null, C.red);
  },
  head: 'Non-contact forces act through a field',
  lines: [
    'A **non-contact force** acts between objects that are **not touching**. Each object is in the other’s **field**.',
    '**Gravitational** field: every mass attracts every other mass (weight is the Earth’s pull on you).',
    '**Electrostatic** field: charged objects – like charges **repel**, unlike charges **attract**.',
    '**Magnetic** field: magnets and magnetic materials – like poles repel, unlike poles attract.',
    'The forces always come in **pairs**: the Moon pulls the Earth as hard as the Earth pulls the Moon.',
  ],
  worked: { head: 'Name the field', q: 'For each force, name the field involved.',
    steps: [['Fridge magnet', 'stays on the door → **magnetic**'], ['Rubbed balloon', 'sticks to a wall → **electrostatic**'], ['Falling apple', 'pulled down by the Earth → **gravitational**'], ['Answer', 'all three act without contact']] },
  qc: 'Name the field involved when (a) a charged comb picks up bits of paper, (b) a satellite stays in orbit around the Earth.',
  notes: 'QUICK CHECK ANSWER: (a) electrostatic; (b) gravitational.\n9.1(a): interact at a distance without contact, linking these to the gravitational, electrostatic and magnetic fields involved. Static electricity in detail is Topic 11 (physics only).',
}), '9.1 Non-contact forces');

// ======================= 6 9.1 CONTACT FORCES =======================
reg(D.contentSlide({
  title: 'Contact forces: normal, friction and tension',
  subtitle: `Specification ${sp('9.1')}(b) • objects touching each other`,
  tag: '9.1', caption: 'block pulled at constant speed; arrows from its centre, drawn to scale',
  draw: (s, p) => {
    const cx = 3.3, cy = 3.55, bw = 0.9, bh = 0.7;
    box(s, 0.8, cy + bh / 2, 5.4, 0.18, C.wood, '8A6A3A'); // table top
    box(s, 1.0, cy + bh / 2 + 0.18, 0.15, 1.3, C.wood, '8A6A3A'); box(s, 5.85, cy + bh / 2 + 0.18, 0.15, 1.3, C.wood, '8A6A3A');
    line(s, cx + bw / 2, cy + 0.2, 6.2, cy + 0.2, '8C7A5A', 3); // rope
    label(s, 5.3, cy - 0.12, 0.9, 'rope', { size: 10.5, italic: true, color: C.grey });
    box(s, cx - bw / 2, cy - bh / 2, bw, bh, 'E8C27A', '8A6A3A', { lw: 1.25 });
    forceArrow(s, cx, cy, 'down', F6.W * k6, 'weight 20 N', C.red, { lw: 1.4, ly: cy + F6.W * k6 - 0.1, lx: cx + 0.08 });
    forceArrow(s, cx, cy, 'up', F6.N * k6, 'normal contact force 20 N', C.blue, { lw: 2.6 });
    forceArrow(s, cx, cy, 'left', F6.Fr * k6, 'friction 12 N', C.green, { lw: 1.25 });
    forceArrow(s, cx, cy, 'right', F6.T * k6, null, C.orange);
    label(s, cx + F6.T * k6 + 0.05, cy - 0.3, 1.2, 'tension 12 N', { size: 11, bold: true, color: C.orange, align: 'left' });
    label(s, 3.5, 4.5, 2.2, 'weight is a non-contact force', { size: 10.5, italic: true, color: C.red, align: 'left' });
  },
  head: 'Contact forces',
  lines: [
    '**Normal contact force:** a surface pushes back on an object resting on it, at 90° to the surface.',
    '**Friction:** acts along the surface, **opposing** sliding. Air resistance (drag) is friction from a fluid.',
    '**Tension:** the pull of a stretched rope, string or cable.',
    'Constant speed → forces **balanced**: tension = friction; normal force = weight.',
    'Arrow **length** shows the **size** of each force.',
  ],
  worked: { head: 'Read the diagram', q: 'The block is pulled at a steady speed.',
    steps: [['Vertical', 'normal 20 N up, weight 20 N down → balanced'], ['Horizontal', 'tension 12 N right, friction 12 N left → balanced'], ['Contact?', 'normal, friction, tension: contact; weight: non-contact'], ['Answer', 'resultant force = 0 N, so the speed stays constant']], size: 10.5 },
  qc: 'A crate is pushed across the floor at a steady speed with a force of 25 N. What is the friction force on it? Explain.',
  notes: `QUICK CHECK ANSWER: 25 N (backwards) – the crate moves at constant speed so the forces are balanced (resultant force zero).\nDiagram scale 0.08 in per N; arrows asserted balanced in node: ${F6.T} = ${F6.Fr} N, ${F6.N} = ${F6.W} N.`,
}), '9.1 Contact forces');

// ======================= 7 9.1 PAIRS OF FORCES =======================
reg(D.contentSlide({
  title: 'Forces come in interaction pairs',
  subtitle: `Specification ${sp('9.1')}(c) • two objects, two equal and opposite forces`,
  tag: '9.1', caption: 'a 5 N book on a table: two interaction pairs (arrow lengths to scale)',
  draw: (s, p) => {
    const L = 0.9;
    box(s, 1.2, 2.2, 1.6, 0.4, '6E8BC7', '3A548A'); label(s, 2.15, 2.2, 0.6, 'book', { h: 0.4, bold: true, color: C.white });
    box(s, 0.8, 3.5, 2.5, 0.15, C.wood, '8A6A3A'); box(s, 0.9, 3.65, 0.12, 1.4, C.wood, '8A6A3A'); box(s, 3.08, 3.65, 0.12, 1.4, C.wood, '8A6A3A');
    label(s, 2.4, 3.2, 0.9, 'table', { size: 10.5, italic: true, color: C.grey, align: 'right' });
    box(s, 0.65, 5.05, 5.8, 0.5, '8DB36B', '5F7F45'); label(s, 4.6, 5.05, 1.8, 'Earth', { h: 0.5, bold: true, color: C.white });
    // pair 1 gravitational (red)
    arrow(s, 1.5, 2.4, 1.5, 2.4 + L, C.red, 3); arrow(s, 1.5, 5.05, 1.5, 5.05 - L, C.red, 3);
    label(s, 0.3, 2.75, 1.12, 'Earth pulls\nbook 5 N', { h: 0.45, size: 10, bold: true, color: C.red, align: 'right' });
    label(s, 1.6, 4.55, 1.3, 'book pulls\nEarth 5 N', { h: 0.45, size: 10, bold: true, color: C.red, align: 'left' });
    // pair 2 contact (blue)
    arrow(s, 2.0, 2.4, 2.0, 2.4 - L, C.blue, 3); arrow(s, 2.0, 3.5, 2.0, 3.5 + L, C.blue, 3);
    label(s, 2.1, 1.45, 1.4, 'table pushes\nbook 5 N', { h: 0.45, size: 10, bold: true, color: C.blue, align: 'left' });
    label(s, 2.1, 3.85, 0.95, 'book pushes\ntable 5 N', { h: 0.45, size: 10, bold: true, color: C.blue, align: 'left' });
    // key
    box(s, 3.6, 1.55, 2.75, 1.2, C.white, C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: 'Pair 1: gravitational', options: { bold: true, color: C.red, breakLine: true } }, { text: 'Earth on book, book on Earth. Same size, opposite directions, on different objects.', options: { color: C.text } }], { x: 3.7, y: 1.6, w: 2.55, h: 1.1, fontFace: 'Calibri', fontSize: 10.5, valign: 'top', margin: 0 });
    box(s, 3.6, 3.0, 2.75, 1.2, C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: 'Pair 2: contact', options: { bold: true, color: C.blue, breakLine: true } }, { text: 'Table on book, book on table. Both are normal contact forces.', options: { color: C.text } }], { x: 3.7, y: 3.05, w: 2.55, h: 1.1, fontFace: 'Calibri', fontSize: 10.5, valign: 'top', margin: 0 });
  },
  head: 'Interaction pairs (Newton’s third law)',
  lines: [
    'When two objects interact, they exert forces on **each other**: an **interaction pair**.',
    'The two forces are **equal in size**, **opposite in direction** and the **same type** of force.',
    'They act on **different objects**, so they never cancel each other out.',
    'Each force has a size and a direction, so it can be drawn as a **vector** arrow.',
    'Weight and the normal force on the book are **not** a pair: both act on the book.',
  ],
  worked: { head: 'Spot the pair', q: 'A footballer kicks a ball with a force of 300 N.',
    steps: [['Force 1', 'foot pushes ball forwards, 300 N'], ['Force 2', 'ball pushes foot backwards'], ['Size', 'equal: 300 N'], ['Answer', 'pair: 300 N on the ball and 300 N on the foot']] },
  qc: 'A swimmer pushes the water backwards with a force of 80 N. Describe the other force in this interaction pair.',
  notes: `QUICK CHECK ANSWER: The water pushes the swimmer forwards with a force of 80 N (same type – contact, opposite direction, acts on the swimmer).\nBook weight = 0.50 kg × 10 N/kg = ${Wbook} N; all four arrows drawn the same length (to scale).`,
}), '9.1 Interaction pairs');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('9.1')} • non-contact forces, contact forces and interaction pairs`, [
  { q: 'Name **two** non-contact forces and the field involved in each.', marks: 2, ms: 'Any two of: gravitational force/weight – gravitational field; electrostatic force – electric/electrostatic field; magnetic force – magnetic field (1 each; force and field must match).' },
  { q: 'A magnet pulls an iron nail to the left with a force of **0.4 N**. Describe the other force in the interaction pair.', marks: 2, ms: 'The nail pulls the magnet with a force of 0.4 N (1); to the right / in the opposite direction (1).' },
  { q: 'A book rests on a table. Its weight and the normal contact force on it are equal and opposite. Explain why they are **not** an interaction pair.', marks: 3, ms: 'Both forces act on the same object (the book) (1); an interaction pair acts on two different objects (1); they are different types of force (gravitational and contact) (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 9.2 VECTORS AND SCALARS =======================
reg(D.contentSlide({
  title: 'Vector and scalar quantities',
  subtitle: `Specification ${sp('9.2')} • size only, or size and direction`,
  tag: '9.2', caption: 'two cars with the same speed but different velocities',
  draw: (s, p) => {
    const hdr = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
    const rows = [[hdr('Scalar (size only)'), hdr('Vector (size and direction)')],
      ['distance', 'displacement'], ['speed', 'velocity'], ['mass', 'weight (a force)'], ['energy', 'force'], ['time', 'acceleration'], ['', 'momentum']]
      .map((r, i) => i === 0 ? r : r.map(t => ({ text: t, options: { fill: { color: i % 2 ? C.white : C.cardBlue } } })));
    s.addTable(rows, { x: 0.75, y: 1.5, w: 5.5, colW: [2.75, 2.75], rowH: 0.34, fontFace: 'Calibri', fontSize: 12, align: 'center', valign: 'middle', color: C.text, border: { type: 'solid', color: C.line, pt: 0.75 } });
    // cars
    const car = (x, y, col) => { box(s, x, y, 1.0, 0.36, col, '333A4A', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 }); [x + 0.2, x + 0.8].forEach(cx => s.addShape(SH.OVAL, { x: cx - 0.11, y: y + 0.28, w: 0.22, h: 0.22, fill: { color: '333A4A' }, line: { color: '333A4A' } })); };
    car(1.2, 4.55, 'D9534F'); arrow(s, 2.25, 4.73, 3.25, 4.73, C.blue, 3); label(s, 2.25, 4.3, 1.4, '+20 m/s', { size: 11, bold: true, color: C.blue, align: 'left' });
    car(4.9, 5.15, '4F8FD6'); arrow(s, 4.85, 5.33, 3.85, 5.33, C.blue, 3); label(s, 3.85, 4.9, 1.0, '−20 m/s', { size: 11, bold: true, color: C.blue, align: 'left' });
  },
  head: 'Vectors have a direction',
  lines: [
    'A **scalar** quantity has **size (magnitude) only**, e.g. mass = 5 kg, speed = 20 m/s.',
    'A **vector** quantity has **size and direction**, e.g. weight = 50 N **downwards**, velocity = 20 m/s **east**.',
    'Vectors are drawn as **arrows**: length shows size, the arrowhead shows direction.',
    'In one dimension, use **+** and **−** to show opposite directions.',
    'Force is a vector, so forces must be added taking direction into account.',
  ],
  worked: { head: 'Classify', q: 'A runner travels 400 m round a track and finishes where she started.',
    steps: [['Distance', '400 m – a **scalar**'], ['Displacement', '0 m – a **vector** (start = finish)'], ['Why', 'displacement is distance in a stated direction'], ['Answer', 'distance 400 m, displacement 0 m']] },
  qc: 'Which of these are vectors: 20 m/s north, 15 kg, 9.8 N downwards, 300 J, 5 km east, 12 s?',
  notes: 'QUICK CHECK ANSWER: Vectors: 20 m/s north (velocity), 9.8 N downwards (force/weight), 5 km east (displacement). Scalars: 15 kg, 300 J, 12 s.\nEdexcel 9.2 wording: “Explain the difference between vector and scalar quantities using examples”.',
}), '9.2 Vectors and scalars');

// ======================= 10 9.4 FREE BODY DIAGRAMS =======================
reg(D.contentSlide({
  title: 'Free body force diagrams',
  subtitle: `Specification ${sp('9.4')} • draw and use free body force diagrams`,
  tag: '9.4', ht: true, caption: 'an 80 kg skydiver; arrows drawn to scale from the centre',
  draw: (s, p) => {
    const fig = (cx, cy, t) => { box(s, cx - 0.2, cy - 0.2, 0.4, 0.4, 'C9D5F2', '3A548A', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 }); label(s, cx - 1.2, 1.4, 2.4, t, { size: 11.5, bold: true, color: C.ink }); };
    const ya = 3.7;
    fig(1.9, ya, 'A  just after jumping');
    forceArrow(s, 1.9, ya, 'down', W10 * k10, 'weight 800 N', C.red, { lw: 1.4 });
    forceArrow(s, 1.9, ya, 'up', 200 * k10, null, C.blue);
    label(s, 2.0, ya - 0.62, 1.6, 'air resistance 200 N', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    fig(4.7, ya, 'B  at terminal velocity');
    forceArrow(s, 4.7, ya, 'down', W10 * k10, 'weight 800 N', C.red, { lw: 1.4 });
    forceArrow(s, 4.7, ya, 'up', W10 * k10, 'air resistance 800 N', C.blue, { lw: 1.8 });
    label(s, 0.7, 5.62, 2.4, `resultant ${R10a} N down`, { size: 11, bold: true, color: C.red });
    label(s, 3.5, 5.62, 2.4, 'resultant 0 N', { size: 11, bold: true, color: C.green });
  },
  head: 'Drawing a free body diagram',
  lines: [
    'Show **one object** (a box or a dot) and **only the forces acting on it**.',
    'Draw each force as an arrow **from the object**, in the direction it acts.',
    'Make arrow **lengths to scale**, and **label** each force with its name and size.',
    'Use it to find the **resultant force**: add forces in one direction, subtract the opposite ones.',
  ],
  worked: { head: 'Use the diagram', q: 'Find the resultant force on the skydiver in A and in B.',
    steps: [['A', '800 N − 200 N = 600 N downwards → accelerates'], ['B', '800 N − 800 N = 0 N → constant velocity'], ['Check', 'A: a = F ÷ m = 600 ÷ 80 = 7.5 m/s²'], ['Answer', 'A: 600 N down; B: 0 N (balanced)']], size: 10.5 },
  qc: 'Draw a free body diagram for a book resting on a table. What is the resultant force on the book?',
  notes: `QUICK CHECK ANSWER: Two arrows of equal length from the book: weight downwards, normal contact force upwards; resultant force = 0 N.\nWorked: ${W10} − 200 = ${R10a} N; a = ${R10a}/80 = 7.5 m/s². Scale: 0.002 in per N.\nTier: 9.4 is marked H (Higher) in our spec check – see SPEC_T9.md.`,
}), '9.4 Free body diagrams');

// ======================= 11 9.5 RESULTANT AND BALANCED =======================
reg(D.contentSlide({
  title: 'Resultant force and balanced forces',
  subtitle: `Specification ${sp('9.5')} • several forces on one object add to one resultant`,
  tag: '9.5', ht: true, caption: 'a 4.0 kg box pushed along the floor; arrows to scale',
  draw: (s, p) => {
    const cx = 2.3, cy = 3.6;
    box(s, 0.7, cy + 0.35, 5.6, 0.12, 'B0B7C6', null);
    box(s, cx - 0.45, cy - 0.35, 0.9, 0.7, 'E8C27A', '8A6A3A', { lw: 1.25 });
    forceArrow(s, cx, cy, 'right', push11 * k11, 'push 50 N', C.orange, { lw: 1.0 });
    forceArrow(s, cx, cy, 'left', fr11 * k11, 'friction 30 N', C.green, { lw: 1.3 });
    forceArrow(s, cx, cy, 'down', W11 * k11, 'weight 40 N', C.red, { lw: 1.3, lx: cx + 0.08, ly: cy + W11 * k11 - 0.2 });
    forceArrow(s, cx, cy, 'up', W11 * k11, 'normal force 40 N', C.blue, { lw: 1.8 });
    // resultant
    label(s, 4.3, 2.0, 1.9, 'Resultant force', { size: 12, bold: true, color: C.ink });
    s.addShape(SH.OVAL, { x: 4.6 - 0.07, y: 2.75 - 0.07, w: 0.14, h: 0.14, fill: { color: C.ink }, line: { color: C.ink } });
    forceArrow(s, 4.6, 2.75, 'right', R11 * k11, null, C.red, { width: 3.5 });
    label(s, 4.3, 2.95, 1.9, `${R11} N to the right`, { size: 11, bold: true, color: C.red });
    label(s, 4.3, 3.3, 1.9, '= 50 − 30', { size: 11, color: C.text });
  },
  head: 'Adding forces along a line',
  lines: [
    'The **resultant force** is the single force that has the same effect as all the forces acting together.',
    'Forces in the **same** direction: **add**. Forces in **opposite** directions: **subtract**.',
    'Resultant ≠ 0 → the object **accelerates** in the direction of the resultant (F = m × a).',
    '**Balanced** forces: resultant = 0 → the object stays **still** or moves at **constant velocity**.',
  ],
  worked: { head: 'Worked example', q: 'Find the resultant force on the box and its acceleration.',
    steps: [['Vertical', '40 N − 40 N = 0 N'], ['Horizontal', '50 N − 30 N = 20 N to the right'], ['F = m × a', `a = F ÷ m = 20 ÷ 4.0`], ['Answer', `resultant ${R11} N right; a = ${a11.toFixed(1)} m/s²`]], size: 10.5 },
  qc: 'A 1200 kg car has a driving force of 3000 N and resistive forces of 1800 N. Calculate the resultant force and its acceleration.',
  notes: `QUICK CHECK ANSWER: Resultant = 3000 − 1800 = ${qc11} N forwards; a = F/m = 1200/1200 = 1.0 m/s².\n9.5 (H): explain examples of the forces acting on an isolated solid object or a system where several forces lead to a resultant force, and the special case of balanced forces when the resultant force is zero.`,
}), '9.5 Resultant and balanced forces');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('9.2')}, ${sp('9.4')}, ${sp('9.5')} • vectors, free body diagrams and resultant forces`, [
  { q: 'State whether each quantity is a **vector** or a **scalar**: velocity, mass, weight, energy.', marks: 2, ms: 'Vector: velocity, weight (1); scalar: mass, energy (1). All four correct for 2 marks; 2–3 correct for 1 mark.' },
  { q: 'A skydiver has a weight of **700 N**. The air resistance on her is **250 N**. Draw a free body diagram and calculate the resultant force on her.', marks: 3, ht: true, ms: 'Diagram: two labelled arrows from the object, weight down longer than air resistance up (1); 700 − 250 (1); = 450 N downwards (1, direction needed).' },
  { q: 'Later the air resistance on her is **700 N**. Explain what happens to her motion.', marks: 2, ht: true, ms: 'Forces are balanced / resultant force is zero (1); she falls at a constant velocity (terminal velocity) (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 9.3 RESULTANT AT RIGHT ANGLES =======================
reg(D.contentSlide({
  title: 'Scale drawing: forces at right angles',
  subtitle: `Specification ${sp('9.3')} • vector diagram for a resultant force (scale drawings only)`,
  tag: '9.3', ht: true, caption: 'scale: 1 square = 10 N; vectors joined tip to tail',
  draw: (s, p) => {
    // object diagram
    label(s, 0.65, 1.45, 2.3, 'Forces on the sledge', { size: 11.5, bold: true, color: C.ink, align: 'left' });
    const ox = 1.0, oy = 3.4, k = 0.03;
    box(s, ox - 0.15, oy - 0.1, 0.3, 0.2, '8A6A3A', null);
    vec(s, ox, oy, 40, k, 0, C.blue); vec(s, ox, oy, 30, k, -90, C.orange);
    label(s, ox + 0.2, oy + 0.05, 1.2, '40 N east', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, ox + 0.08, oy - 1.05, 1.2, '30 N north', { size: 10.5, bold: true, color: C.orange, align: 'left' });
    // compass
    arrow(s, 0.9, 5.4, 0.9, 4.85, C.grey, 1.5); label(s, 0.75, 4.6, 0.3, 'N', { size: 10.5, bold: true, color: C.grey });
    // scale drawing
    const gx = 3.1, gy = 2.8;
    grid(s, gx, gy, 6, 5, sq13);
    line(s, O13[0], O13[1], A13[0], A13[1], C.blue, 2.75, { head: true });
    line(s, A13[0], A13[1], B13[0], B13[1], C.orange, 2.75, { head: true });
    line(s, O13[0], O13[1], B13[0], B13[1], C.red, 3.25, { head: true });
    arc(s, O13[0], O13[1], 0.55, -th13, 0, C.ink, 1.25);
    label(s, O13[0] + 0.58, O13[1] - 0.3, 0.6, `${Math.round(th13)}°`, { size: 11, bold: true, align: 'left' });
    label(s, O13[0], O13[1] + 0.05, 2.0, '40 N (4 squares)', { size: 10.5, bold: true, color: C.blue });
    label(s, A13[0] + 0.05, A13[1] - 0.95, 1.0, '30 N\n(3 sq)', { h: 0.45, size: 10.5, bold: true, color: C.orange, align: 'left' });
    label(s, O13[0] - 0.2, B13[1] + 0.25, 1.4, `R = ${R13} N`, { size: 11.5, bold: true, color: C.red, align: 'left' });
  },
  head: 'Method: tip to tail',
  lines: [
    'Choose a **scale**, e.g. 1 square (or 1 cm) = 10 N.',
    'Draw the first force to scale. Draw the second force starting at the **tip** of the first.',
    'The **resultant** goes from the **start** of the first arrow to the **tip** of the last.',
    'Measure its **length** (convert with the scale) and its **angle** with a protractor.',
  ],
  worked: { head: 'Worked example', q: 'Forces of 40 N east and 30 N north act on a sledge. Find the resultant.',
    steps: [['Draw', '4 squares east, then 3 squares north'], ['Measure', 'resultant = 5.0 squares long'], ['Convert', '5.0 × 10 N = 50 N; angle = 37° north of east'], ['Answer', `R = ${R13} N at ${Math.round(th13)}° north of east`]], size: 10.5 },
  qc: 'Use a scale drawing to find the resultant of a 6 N force east and an 8 N force north.',
  notes: `QUICK CHECK ANSWER: ${qc13} N at 53° north of east (bearing about 037°). Accept 9.8–10.2 N and 51–55°.\nScale drawing asserted in node: drawn length / scale = ${R13} N; angle ${th13.toFixed(2)}° (rounded ${Math.round(th13)}°). Pythagoras check √(40² + 30²) = 50 N – Edexcel 9.3 asks for scale drawings only.`,
}), '9.3 Resultant at right angles');

// ======================= 14 9.3 RESULTANT AT OTHER ANGLES =======================
reg(D.contentSlide({
  title: 'Scale drawing: forces at other angles',
  subtitle: `Specification ${sp('9.3')} • two forces with 60° between them`,
  tag: '9.3', ht: true, caption: 'scale: 1 square = 1 N; the resultant is measured, not calculated',
  draw: (s, p) => {
    grid(s, 0.7, 1.7, 19, 13, sq14);
    line(s, O14[0], O14[1], A14[0], A14[1], C.blue, 2.75, { head: true });
    line(s, A14[0], A14[1], B14[0], B14[1], C.orange, 2.75, { head: true });
    line(s, O14[0], O14[1], B14[0], B14[1], C.red, 3.25, { head: true });
    line(s, A14[0], A14[1], A14[0] + 1.2, A14[1], C.grey, 1, { dash: 'dash' });
    arc(s, A14[0], A14[1], 0.4, -60, 0, C.ink, 1.25); label(s, A14[0] + 0.42, A14[1] - 0.36, 0.5, '60°', { size: 10.5, bold: true, align: 'left' });
    arc(s, O14[0], O14[1], 0.9, -th14, 0, C.ink, 1.25); label(s, O14[0] + 0.92, O14[1] - 0.3, 0.5, `${Math.round(th14)}°`, { size: 10.5, bold: true, align: 'left' });
    label(s, O14[0] + 0.6, O14[1] + 0.03, 1.4, '8.0 N', { size: 10.5, bold: true, color: C.blue });
    label(s, A14[0] + 0.85, A14[1] - 1.0, 0.7, '6.0 N', { size: 10.5, bold: true, color: C.orange, align: 'left' });
    label(s, O14[0] + 0.7, O14[1] - 1.2, 1.6, `R ≈ ${sf(R14, 2)} N`, { size: 11.5, bold: true, color: C.red, align: 'left' });
    // inset: forces on the object
    box(s, 4.55, 1.8, 1.85, 1.55, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.6, 1.83, 1.75, 'forces on the object', { size: 10, italic: true, color: C.grey });
    const ix = 4.8, iy = 3.05, ik = 0.15;
    s.addShape(SH.OVAL, { x: ix - 0.05, y: iy - 0.05, w: 0.1, h: 0.1, fill: { color: C.ink }, line: { color: C.ink } });
    vec(s, ix, iy, 8, ik, 0, C.blue, 2.25); vec(s, ix, iy, 6, ik, -60, C.orange, 2.25);
    label(s, ix + 0.7, iy + 0.02, 0.6, '8.0 N', { size: 10, bold: true, color: C.blue }); label(s, ix + 0.5, iy - 0.75, 0.6, '6.0 N', { size: 10, bold: true, color: C.orange, align: 'left' });
  },
  head: 'Same method, any angle',
  lines: [
    'Draw the first force to scale along its direction.',
    'From its **tip**, draw the second force at the **correct angle** (use a protractor).',
    'Join the start to the final tip: this is the **resultant**. Measure length and angle.',
    'The resultant of 8 N and 6 N is **not** 14 N here – direction matters for vectors.',
  ],
  worked: { head: 'Worked example', q: 'Forces of 8.0 N (east) and 6.0 N (60° above east) act on a point.',
    steps: [['Draw', '8 squares east, then 6 squares at 60°'], ['Measure', 'resultant ≈ 12.2 squares long'], ['Angle', `≈ ${Math.round(th14)}° above the 8.0 N force`], ['Answer', `R ≈ ${sf(R14, 2)} N at ${Math.round(th14)}° above east`]], size: 10.5 },
  qc: 'Two 10 N forces act on an object with 60° between them. Use a scale drawing to find the resultant.',
  notes: `QUICK CHECK ANSWER: About 17 N (17.3 N), at 30° to each force (along the bisector). Accept 16.8–17.8 N.\nScale drawing asserted in node: resultant ${R14.toFixed(3)} N at ${th14.toFixed(2)}° (cosine-rule check √148). Students are not expected to use trigonometry: Edexcel 9.3 says scale drawings only.`,
}), '9.3 Resultant at other angles');

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('9.3')} • resultant forces by scale drawing`, [
  { q: 'A boat is pulled by two ropes at right angles: **5.0 N** east and **12 N** north. Use a scale drawing to find the size and direction of the resultant force.', marks: 3, ms: 'Correct scale drawing, tip to tail with a stated scale (1); resultant 13 N (allow 12.6–13.4 N) (1); 67° north of east / 23° east of north (allow ±2°) (1).' },
  { q: 'Forces of **7.0 N** and **4.0 N** act on a point with **50°** between them. Find the resultant by scale drawing.', marks: 3, ms: 'Scale drawing with 50° angle drawn correctly (1); resultant ≈ 10 N (allow 9.6–10.4 N) (1); at ≈ 18° to the 7.0 N force (allow 15–21°) (1).' },
  { q: 'State what is meant by the **resultant** force on an object.', marks: 1, ms: 'The single force that has the same effect as all the forces acting on the object together (1).' },
], { ht: true });
reg(R3.s, 'Recap 3');

// ======================= 16 9.3 RESOLVING =======================
reg(D.contentSlide({
  title: 'Resolving a force into two components',
  subtitle: `Specification ${sp('9.3')} • resolution of forces by scale drawing`,
  tag: '9.3', ht: true, caption: 'scale: 1 square = 2 N; a 20 N pull on a sledge rope at 30° to the ground',
  draw: (s, p) => {
    grid(s, 0.9, 1.6, 21, 16, sq16);
    const C16 = [T16[0], O16[1]];
    line(s, O16[0], O16[1], C16[0], C16[1], C.blue, 2.5, { head: true, dash: 'dash' });
    line(s, C16[0], C16[1], T16[0], T16[1], C.orange, 2.5, { head: true, dash: 'dash' });
    line(s, O16[0], O16[1], T16[0], T16[1], C.red, 3.25, { head: true });
    arc(s, O16[0], O16[1], 0.6, -30, 0, C.ink, 1.25); label(s, O16[0] + 0.62, O16[1] - 0.28, 0.5, '30°', { size: 10.5, bold: true, align: 'left' });
    box(s, C16[0] - 0.15, C16[1] - 0.15, 0.15, 0.15, null, C.ink, { lw: 0.75 });
    label(s, O16[0] + 0.55, 4.1, 1.0, '20 N', { size: 11.5, bold: true, color: C.red, align: 'left' });
    label(s, O16[0], O16[1] + 0.05, C16[0] - O16[0], `horizontal ≈ ${sf(Fx16, 3)} N`, { size: 10.5, bold: true, color: C.blue });
    label(s, C16[0] + 0.08, (C16[1] + T16[1]) / 2 - 0.2, 1.4, `vertical\n= ${Fy16.toFixed(0)} N`, { h: 0.45, size: 10.5, bold: true, color: C.orange, align: 'left' });
    box(s, 4.3, 1.75, 1.75, 1.0, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.35, 1.8, 1.65, 'Measure:\nhorizontal 8.7 squares\nvertical 5.0 squares', { h: 0.9, size: 10.5, color: C.ink, align: 'left' });
  },
  head: 'Components',
  lines: [
    'One force at an angle has the same effect as **two forces at right angles**: its **components**.',
    'Draw the force to scale. Draw a horizontal line from its start and a vertical line up to its tip.',
    'Measure each line and use the scale: these are the **horizontal** and **vertical** components.',
    'Only the horizontal component pulls the sledge forwards.',
  ],
  worked: { head: 'Worked example', q: 'Resolve a 20 N pull at 30° above the horizontal.',
    steps: [['Scale', '1 square = 2 N, so draw 10 squares at 30°'], ['Horizontal', '8.7 squares × 2 N = 17 N (17.3 N)'], ['Vertical', '5.0 squares × 2 N = 10 N'], ['Answer', `components ≈ ${sf(Fx16, 2)} N forward and ${Fy16.toFixed(0)} N up`]], size: 10.5 },
  qc: 'A 12 N force acts at 60° above the horizontal. Use a scale drawing to find its horizontal and vertical components.',
  notes: `QUICK CHECK ANSWER: Horizontal ≈ 6.0 N; vertical ≈ 10.4 N (accept 10–11 N).\nScale drawing asserted in node: Fx = ${Fx16.toFixed(3)} N, Fy = ${Fy16.toFixed(3)} N. Check: the components recombine (tip to tail) to give 20 N.`,
}), '9.3 Resolving forces');

// ======================= 17 9.3 EQUILIBRIUM =======================
reg(D.contentSlide({
  title: 'Equilibrium: a closed vector triangle',
  subtitle: `Specification ${sp('9.3')} • three forces with zero resultant`,
  tag: '9.3', ht: true, caption: '50 N lamp on two cables at 90° to each other (both to scale)',
  draw: (s, p) => {
    const P = [1.75, 3.2], kf = 0.02, ceilY = 2.0;
    box(s, 0.65, ceilY - 0.12, 3.1, 0.12, '8C96A8', null);
    const a1 = [P[0] + u1[0] * (P[1] - ceilY) / -u1[1], ceilY], a2 = [P[0] + u2[0] * (P[1] - ceilY) / -u2[1], ceilY];
    line(s, P[0], P[1], a1[0], a1[1], '6B7385', 1.5); line(s, P[0], P[1], a2[0], a2[1], '6B7385', 1.5);
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: P[0] - 0.22, y: P[1], w: 0.44, h: 0.3, fill: { color: 'F5C242' }, line: { color: 'B8730A' } });
    vec(s, P[0], P[1], W17, kf, 90, C.red, 3); label(s, P[0] + 0.1, P[1] + 0.75, 1.0, 'W = 50 N', { size: 10.5, bold: true, color: C.red, align: 'left' });
    arrow(s, P[0], P[1], P[0] + T1 * kf * u1[0], P[1] + T1 * kf * u1[1], C.blue, 3);
    arrow(s, P[0], P[1], P[0] + T2 * kf * u2[0], P[1] + T2 * kf * u2[1], C.green, 3);
    label(s, 0.55, 2.55, 0.85, 'T₁ = 40 N', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, 2.35, 2.75, 1.0, 'T₂ = 30 N', { size: 10.5, bold: true, color: C.green, align: 'left' });
    label(s, 0.65, 4.55, 3.0, 'forces on the lamp', { size: 10.5, italic: true, color: C.grey });
    // closed triangle
    line(s, S17[0], S17[1], P17a[0], P17a[1], C.red, 3, { head: true });
    line(s, P17a[0], P17a[1], P17b[0], P17b[1], C.green, 3, { head: true });
    line(s, P17b[0], P17b[1], P17c[0], P17c[1], C.blue, 3, { head: true });
    label(s, S17[0] - 1.0, (S17[1] + P17a[1]) / 2 - 0.15, 0.95, 'W 50 N', { size: 10.5, bold: true, color: C.red, align: 'right' });
    label(s, (P17a[0] + P17b[0]) / 2 + 0.1, (P17a[1] + P17b[1]) / 2, 1.0, 'T₂ 30 N', { size: 10.5, bold: true, color: C.green, align: 'left' });
    label(s, (P17b[0] + P17c[0]) / 2 + 0.12, (P17b[1] + P17c[1]) / 2 - 0.3, 1.0, 'T₁ 40 N', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, 3.9, 4.55, 2.4, 'tip to tail: the triangle closes', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'Balanced forces in two dimensions',
  lines: [
    'An object is in **equilibrium** when the resultant force on it is **zero**.',
    'Draw all the forces **tip to tail** to scale. If they form a **closed** shape, the resultant is zero.',
    'Three forces in equilibrium form a **closed triangle**.',
    'Use it to find an unknown force: draw the known forces, then close the triangle.',
  ],
  worked: { head: 'Worked example', q: 'The lamp weighs 50 N. The cables are at 37° and 53° to the vertical. Find the tensions.',
    steps: [['Draw W', '50 N downwards, to scale'], ['Close', 'draw lines along each cable direction until they meet'], ['Measure', 'T₁ = 40 N, T₂ = 30 N'], ['Answer', 'resultant = 0 N, so the lamp stays still']], size: 10.5 },
  qc: 'Three forces act on an object. Drawn tip to tail they form a closed triangle. What is the resultant force, and what does this tell you about the object’s motion?',
  notes: `QUICK CHECK ANSWER: Resultant = 0 N; the object is in equilibrium – stationary or moving at constant velocity.\nAsserted in node: horizontal and vertical components sum to zero; triangle closes (cable angles ${al1.toFixed(2)}° and ${al2.toFixed(2)}° from the vertical).`,
}), '9.3 Equilibrium');

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('9.3')} • resolving forces and equilibrium`, [
  { q: 'A force of **50 N** acts at **40°** above the horizontal. Use a scale drawing to find its horizontal and vertical components.', marks: 3, ms: 'Scale drawing of 50 N at 40° with components drawn (1); horizontal ≈ 38 N (allow 37–40 N) (1); vertical ≈ 32 N (allow 30–34 N) (1).' },
  { q: 'Describe what a vector diagram looks like for an object in **equilibrium**, and why.', marks: 2, ms: 'Forces drawn tip to tail form a closed shape/triangle (1); because the resultant force is zero / the last tip returns to the start (1).' },
  { q: 'A **13 N** weight hangs on a string. A horizontal force of **5.0 N** pulls it sideways so it hangs still. Use a closed vector triangle to find the tension in the string.', marks: 3, ms: 'Triangle drawn: 13 N down, 5.0 N horizontal, tension closes it (1); tension measured ≈ 14 N (1); (13.9 N, allow 13.5–14.3 N) with direction ≈ 21° to the vertical (1).' },
], { ht: true });
reg(R4.s, 'Recap 4');

// ======================= 19 9.6P FORCES CAUSE ROTATION =======================
reg(D.contentSlide({
  title: 'Forces can make objects turn',
  subtitle: `Specification ${sp('9.6')} • describe situations where forces can cause rotation`,
  tag: '9.6P', p: true, caption: 'each force acts at a distance from a pivot, so it has a turning effect',
  draw: (s, p) => {
    // door from above
    label(s, 0.7, 1.45, 2.5, 'Door (from above)', { size: 11.5, bold: true, align: 'left', color: C.ink });
    s.addShape(SH.OVAL, { x: 0.85, y: 2.15, w: 0.16, h: 0.16, fill: { color: C.ink }, line: { color: C.ink } });
    box(s, 0.93, 2.17, 2.3, 0.12, C.wood, '8A6A3A');
    forceArrow(s, 2.95, 2.29, 'down', 0.7, 'push', C.red, { lw: 0.8 });
    turnArrow(s, 0.93, 2.23, 0.55, +1, C.blue, 2, [-30, 60]);
    label(s, 0.55, 2.38, 0.8, 'hinge', { size: 10.5, italic: true, color: C.grey });
    // spanner
    label(s, 3.6, 1.45, 2.5, 'Spanner on a nut', { size: 11.5, bold: true, align: 'left', color: C.ink });
    s.addShape(SH.HEXAGON, { x: 3.75, y: 2.0, w: 0.5, h: 0.44, fill: { color: '8C96A8' }, line: { color: '4A5262', width: 1 } });
    box(s, 4.2, 2.13, 1.9, 0.18, '6B7385', '4A5262');
    forceArrow(s, 5.9, 2.31, 'down', 0.7, 'force', C.red, { lw: 0.8 });
    turnArrow(s, 4.0, 2.22, 0.55, +1, C.blue, 2, [-30, 60]);
    // see-saw
    label(s, 0.7, 3.55, 3.0, 'See-saw', { size: 11.5, bold: true, align: 'left', color: C.ink });
    box(s, 1.0, 4.5, 4.6, 0.1, C.wood, '8A6A3A'); pivot(s, 3.3, 4.6, 0.5, 0.5);
    box(s, 1.25, 4.05, 0.42, 0.45, 'F4B183', 'B8730A'); box(s, 4.8, 3.95, 0.5, 0.55, '9DC3E6', '2E5BA8');
    forceArrow(s, 1.46, 4.6, 'down', 0.55, null, C.red); forceArrow(s, 5.05, 4.6, 'down', 0.7, null, C.red);
    turnArrow(s, 3.3, 4.55, 0.9, -1, C.blue, 2, [-150, -110]); turnArrow(s, 3.3, 4.55, 0.9, +1, C.blue, 2, [-70, -30]);
    label(s, 1.6, 3.42, 1.6, 'anticlockwise', { size: 10.5, bold: true, color: C.blue });
    label(s, 3.5, 3.42, 1.4, 'clockwise', { size: 10.5, bold: true, color: C.blue });
    label(s, 2.6, 5.15, 1.4, 'pivot', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'Turning effects',
  lines: [
    'A force can make an object **rotate** (turn) about a fixed point called the **pivot** (or fulcrum).',
    'Examples: opening a door, a spanner turning a nut, a see-saw, a wheelbarrow, scissors, pedals.',
    'The turning effect can be **clockwise** or **anticlockwise**.',
    'The turning effect is **bigger** if the force is bigger or acts **further from the pivot**.',
  ],
  worked: { head: 'Explain it in steps', q: 'Why is a long spanner better for undoing a tight nut?',
    steps: [['Distance', 'you push further from the pivot (the nut)'], ['Effect', 'same force gives a bigger turning effect'], ['Or', 'a smaller force gives the same turning effect'], ['Answer', 'easier to make the nut turn']] },
  qc: 'Explain why door handles are fixed on the side of the door furthest from the hinges.',
  notes: 'QUICK CHECK ANSWER: The handle is a long way from the pivot (hinge), so a small force gives a large turning effect (moment) – the door is easy to open.\n9.6P is physics only.',
}), '9.6P Forces cause rotation');

// ======================= 20 9.7P MOMENT = F × d =======================
reg(D.contentSlide({
  title: 'The moment of a force',
  subtitle: `Specification ${sp('9.7')} • moment = force × distance normal to the direction of the force`,
  tag: '9.7P', p: true, caption: 'spanner drawn to scale: d is measured from the pivot at 90° to the force',
  draw: (s, p) => {
    const nx = 1.3, ny = 3.0, sc = 16; // 16 in per m
    s.addShape(SH.HEXAGON, { x: nx - 0.32, y: ny - 0.28, w: 0.64, h: 0.56, fill: { color: '8C96A8' }, line: { color: '4A5262', width: 1 } });
    s.addShape(SH.OVAL, { x: nx - 0.06, y: ny - 0.06, w: 0.12, h: 0.12, fill: { color: C.ink }, line: { color: C.ink } });
    const fx = nx + 0.25 * sc;
    box(s, nx + 0.3, ny - 0.12, fx - nx - 0.05, 0.24, '6B7385', '4A5262');
    forceArrow(s, fx, ny + 0.12, 'down', 40 * 0.03, 'F = 40 N', C.red, { lw: 1.2 });
    line(s, fx, ny - 0.5, fx, ny + 1.9, C.red, 1, { dash: 'dash' });
    arrow(s, nx, ny + 1.75, fx, ny + 1.75, C.ink, 1.5, { tail: true });
    line(s, nx, ny + 0.2, nx, ny + 1.9, C.ink, 1, { dash: 'dash' });
    label(s, nx, ny + 1.8, fx - nx, 'd = 0.25 m (at 90° to the force)', { size: 11, bold: true });
    turnArrow(s, nx, ny, 0.65, +1, C.blue, 2.25, [-140, -40]);
    label(s, nx - 0.6, ny - 1.05, 1.2, 'clockwise', { size: 10.5, bold: true, color: C.blue });
    label(s, nx - 0.85, ny + 0.3, 0.7, 'pivot', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'Calculating a moment',
  lines: [
    { t: '__moment of a force (N m) = force (N) × distance normal to the direction of the force (m)__', nob: true },
    { t: 'RECALL: you must learn this equation. M = F × d.', nob: true, color: C.red, b: true, size: 10.5 },
    '**d** is the **perpendicular** distance from the **pivot** to the **line of action** of the force.',
    'Unit: **newton metre (N m)**. Convert cm to m first.',
    'Bigger force or bigger distance → bigger moment.',
  ],
  worked: { head: 'Worked example', q: 'A 40 N force acts at right angles to a spanner, 0.25 m from the nut. Calculate the moment.',
    steps: [['Equation', 'moment = F × d'], ['Substitute', 'moment = 40 N × 0.25 m'], ['Direction', 'the force turns the spanner clockwise'], ['Answer', `moment = ${M20} N m clockwise`]] },
  qc: 'A 15 N force pushes at right angles on a door handle 80 cm from the hinge. Calculate the moment.',
  notes: `QUICK CHECK ANSWER: moment = 15 × 0.80 = ${qc20} N m (1 mark for converting 80 cm to 0.80 m).\nStretch: if the force is not at 90° to the spanner, use the perpendicular distance to its line of action, which is smaller – so the moment is smaller.`,
}), '9.7P Moment = F × d');

// ======================= 21 9.8P PRINCIPLE OF MOMENTS =======================
const SS = { x0: 1.0, len: 5.0, m: 4.0, y: 3.5 };
const ssX = d => SS.x0 + SS.len / 2 + d * SS.len / SS.m;
reg(D.contentSlide({
  title: 'The principle of moments',
  subtitle: `Specification ${sp('9.8')} • balanced: total clockwise moment = total anticlockwise moment`,
  tag: '9.8P', p: true, caption: '4.0 m see-saw drawn to scale; weight arrows to scale',
  draw: (s, p) => {
    const xp = ssX(0);
    box(s, SS.x0, SS.y, SS.len, 0.12, C.wood, '8A6A3A');
    pivot(s, xp, SS.y + 0.12, 0.5, 0.55);
    const xa = ssX(-ss.A[1]), xb = ssX(ss.B[1]);
    box(s, xa - 0.22, SS.y - 0.5, 0.44, 0.5, 'F4B183', 'B8730A'); label(s, xa - 0.4, SS.y - 0.8, 0.8, 'A', { size: 11, bold: true });
    box(s, xb - 0.27, SS.y - 0.6, 0.54, 0.6, '9DC3E6', '2E5BA8'); label(s, xb - 0.4, SS.y - 0.9, 0.8, 'B', { size: 11, bold: true });
    forceArrow(s, xa, SS.y + 0.12, 'down', ss.A[0] * 0.002, '400 N', C.red, { lw: 0.8, lx: xa - 0.88, ly: SS.y + 0.7 });
    forceArrow(s, xb, SS.y + 0.12, 'down', ss.B[0] * 0.002, '600 N', C.red, { lw: 0.8, lx: xb + 0.08, ly: SS.y + 0.75 });
    // distances
    const yd = SS.y + 1.6;
    arrow(s, xa, yd, xp, yd, C.ink, 1.25, { tail: true }); arrow(s, xp, yd, xb, yd, C.ink, 1.25, { tail: true });
    line(s, xp, SS.y + 0.67, xp, yd + 0.15, C.grey, 0.75, { dash: 'dash' });
    box(s, xp - 0.5, SS.y + 0.67, 1.0, 0.08, '5A6275', null);
    label(s, xa, yd + 0.03, xp - xa, '1.5 m', { size: 11, bold: true });
    label(s, xp, yd + 0.03, xb - xp, '1.0 m', { size: 11, bold: true });
    turnArrow(s, xp, SS.y, 1.25, -1, C.blue, 2, [-155, -115]); turnArrow(s, xp, SS.y, 1.25, +1, C.blue, 2, [-65, -25]);
    label(s, 0.8, 1.55, 2.3, 'anticlockwise: 400 × 1.5 = 600 N m', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    label(s, 3.75, 1.55, 2.6, 'clockwise: 600 × 1.0 = 600 N m', { size: 10.5, bold: true, color: C.blue, align: 'right' });
  },
  head: 'Balanced turning effects',
  lines: [
    'When an object is **balanced** (not turning), the moments about any pivot balance:',
    { t: '__sum of clockwise moments = sum of anticlockwise moments__', nob: true },
    'If one side has a bigger moment, the object **turns** that way.',
    'A heavier person must sit **closer** to the pivot to balance a lighter person.',
  ],
  worked: { head: 'Worked example', q: 'A 300 N child sits 2.0 m left of the pivot. Where must a 500 N child sit to balance?',
    steps: [['Principle', 'clockwise moment = anticlockwise moment'], ['Substitute', '500 × d = 300 × 2.0 = 600 N m'], ['Rearrange', 'd = 600 ÷ 500'], ['Answer', `d = ${d21} m right of the pivot`]] },
  qc: 'A 250 N child sits 2.4 m from the pivot of a see-saw. How far from the pivot must a 400 N child sit to balance it?',
  notes: `QUICK CHECK ANSWER: 400 × d = 250 × 2.4 = 600 N m, so d = ${qc21} m on the other side.\nDiagram asserted in node: 400 N × 1.5 m = 600 N × 1.0 m = 600 N m; positions drawn from the same data (1.25 in per m). The see-saw is uniform and pivoted at its centre, so its own weight has no moment.`,
}), '9.8P Principle of moments');

// ======================= 22 STRETCH: beam weight and centre of gravity =======================
const BM = { x0: 0.9, len: 5.0, y: 3.9 };
const bmX = d => BM.x0 + d * BM.len / b22.L; // d measured from the left end (m)
reg(D.contentSlide({
  title: 'Moments with the weight of the beam',
  subtitle: `Specification ${sp('9.8')} • several forces, and the centre of gravity of a uniform beam`,
  tag: '9.8P stretch', p: true, stretch: true, caption: '2.0 m uniform beam, pivot 0.50 m from the left end; arrows to scale',
  draw: (s, p) => {
    const xp = bmX(b22.pivotAt), xc = bmX(b22.L / 2), xr = bmX(b22.L), xl = bmX(0);
    box(s, BM.x0, BM.y, BM.len, 0.14, C.wood, '8A6A3A');
    pivot(s, xp, BM.y + 0.14, 0.42, 0.45);
    const k = 0.01;
    forceArrow(s, xl + 0.06, BM.y + 0.14, 'down', F22 * k, null, C.red);
    label(s, xl + 0.1, BM.y + 1.05, 1.0, 'F = ?', { size: 11, bold: true, color: C.red, align: 'left' });
    forceArrow(s, xc, BM.y + 0.14, 'down', b22.Wb * k, null, C.red);
    label(s, xc - 0.7, BM.y + 0.6, 1.4, 'weight 40 N', { size: 10.5, bold: true, color: C.red });
    s.addShape(SH.OVAL, { x: xc - 0.07, y: BM.y, w: 0.14, h: 0.14, fill: { color: C.ink }, line: { color: C.white } });
    label(s, xc - 1.0, BM.y - 0.35, 2.0, 'centre of gravity', { size: 10.5, italic: true, color: C.ink });
    forceArrow(s, xr - 0.06, BM.y + 0.14, 'down', b22.right * k, null, C.red);
    label(s, xr - 1.0, BM.y + 0.5, 0.95, 'load 30 N', { size: 10.5, bold: true, color: C.red, align: 'right' });
    forceArrow(s, xp, BM.y, 'up', S22 * k, null, C.blue);
    label(s, xp + 0.08, BM.y - 1.95, 1.6, 'support 200 N', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    const yd = BM.y + 1.55;
    [[xl, xp, '0.50 m'], [xp, xc, '0.50 m'], [xc, xr, '1.00 m']].forEach(([a, b, t]) => { arrow(s, a, yd, b, yd, C.ink, 1.1, { tail: true }); label(s, a, yd + 0.02, b - a, t, { size: 10.5, bold: true }); });
  },
  head: 'Two Grade 7–9 ideas',
  lines: [
    'The weight of an object acts at its **centre of gravity** (centre of mass). For a **uniform** beam this is the **middle**.',
    'So a beam’s own weight has a moment unless the pivot is at its centre.',
    'Add **all** the clockwise moments and **all** the anticlockwise moments.',
    'For balance the upward support force also equals the total downward force.',
    'An object **topples** if its centre of gravity moves outside its base.',
  ],
  worked: { head: 'Worked example', q: 'Find the force F needed at the left end to keep the beam level.',
    steps: [['Clockwise', '40 × 0.50 + 30 × 1.5 = 20 + 45 = 65 N m'], ['Anticlockwise', 'F × 0.50'], ['Balance', 'F × 0.50 = 65, so F = 65 ÷ 0.50'], ['Answer', `F = ${F22} N; support = ${S22} N`]], size: 10.5 },
  qc: 'Explain why the support force at the pivot is 200 N, not 130 N.',
  notes: `QUICK CHECK ANSWER: The beam is not accelerating, so the upward force must equal the total downward force: ${F22} + ${b22.Wb} + ${b22.right} = ${S22} N.\nAsserted in node: moments about the pivot balance (65 N m each way); forces drawn to scale.\nCentre of gravity and stability are NOT numbered 1PH0 Topic 9 statements in our spec check – taught here as stretch because exam questions on 9.8P often include the weight of a uniform beam.`,
}), 'Stretch: beam weight');

// ======================= 23 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('9.6')}–${sp('9.8')} • moments and the principle of moments`, [
  { q: 'State the **principle of moments**.', marks: 2, ms: 'For an object in equilibrium / balanced (1); the sum of the clockwise moments equals the sum of the anticlockwise moments (about the same pivot) (1).' },
  { q: 'A force of **25 N** is applied at right angles to a lever, **0.40 m** from the pivot. Calculate the moment of the force. Give the unit.', marks: 2, ms: 'moment = 25 × 0.40 (1); = 10 N m (1, unit needed).' },
  { q: 'A **450 N** man sits **1.2 m** from the pivot of a see-saw. Calculate how far from the pivot a **360 N** boy must sit to balance it.', marks: 3, ms: 'Clockwise = anticlockwise / 360 × d = 450 × 1.2 (1); = 540 N m (1); d = 540/360 = 1.5 m (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 24 PRACTICAL: APPARATUS AND METHOD =======================
const MR = { x0: 0.9, len: 5.2, y: 3.15 };
const mrX = cm => MR.x0 + cm * MR.len / 100;
reg(D.contentSlide({
  title: 'Suggested practical: principle of moments',
  subtitle: `Specification ${sp('9.8')} • not a Core Practical • a metre rule balanced on a pivot`,
  tag: 'Practical 9.8P', p: true, caption: 'metre rule pivoted at 50 cm; masses on thread loops (to scale)',
  draw: (s, p) => {
    box(s, MR.x0, MR.y, MR.len, 0.16, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let c = 0; c <= 100; c += 5) { line(s, mrX(c), MR.y, mrX(c), MR.y + (c % 10 ? 0.06 : 0.1), '6B5A2A', 0.75); }
    [0, 20, 50, 70, 100].forEach(c => label(s, mrX(c) - 0.25, MR.y - 0.26, 0.5, String(c), { size: 10, h: 0.22 }));
    // pivot: wedge on a block
    pivot(s, mrX(50), MR.y + 0.16, 0.36, 0.5);
    box(s, mrX(50) - 0.45, MR.y + 0.66, 0.9, 1.6, '8C96A8', '6B7385');
    box(s, 0.7, MR.y + 2.26, 5.6, 0.1, 'B0B7C6', null);
    // left: 1.0 N at 20 cm; right: 1.5 N at 70 cm
    const xl = mrX(20), xr = mrX(70);
    line(s, xl, MR.y + 0.16, xl, MR.y + 0.55, C.ink, 1); massHanger(s, xl, MR.y + 0.55, 4, { w: 0.4 });
    line(s, xr, MR.y + 0.16, xr, MR.y + 0.55, C.ink, 1); massHanger(s, xr, MR.y + 0.55, 6, { w: 0.4 });
    label(s, xl - 1.35, MR.y + 0.95, 1.0, '100 g\n(1.0 N)', { h: 0.45, size: 10.5, bold: true, align: 'right' });
    label(s, xr + 0.3, MR.y + 1.1, 1.0, '150 g\n(1.5 N)', { h: 0.45, size: 10.5, bold: true, align: 'left' });
    // distances
    const yd = MR.y - 0.75;
    arrow(s, xl, yd, mrX(50), yd, C.blue, 1.25, { tail: true }); arrow(s, mrX(50), yd, xr, yd, C.blue, 1.25, { tail: true });
    label(s, xl, yd - 0.3, mrX(50) - xl, 'd₁ = 30 cm', { size: 10.5, bold: true, color: C.blue });
    label(s, mrX(50), yd - 0.3, xr - mrX(50), 'd₂ = 20 cm', { size: 10.5, bold: true, color: C.blue });
    lead(s, mrX(88), MR.y + 0.16, mrX(90) + 0.05, MR.y + 0.75, 'metre rule', 1.0);
    label(s, mrX(50) - 0.45, MR.y + 0.9, 0.9, 'knife-edge\npivot on\na block', { h: 0.7, size: 10, bold: true, color: C.white });
    lead(s, xl, MR.y + 0.4, mrX(4), MR.y + 0.55, 'thread loop', 1.0, 'right');
  },
  head: 'Method',
  lines: [
    'Balance the metre rule on the pivot **without masses** (at its centre of mass, about 50 cm).',
    'Hang a known weight (e.g. 1.0 N) at a fixed distance d₁ on the left.',
    'Hang a second weight on the right. **Slide it** until the rule balances level.',
    'Record both weights and both distances **from the pivot** (in m).',
    'Repeat for at least 5 different combinations.',
    'Calculate the anticlockwise moment (F₁ × d₁) and the clockwise moment (F₂ × d₂).',
  ],
  worked: { head: 'Variables', q: '',
    steps: [['Independent', 'weight F₁ and its distance d₁ (left side)'], ['Dependent', 'distance d₂ of the right weight at balance'], ['Control', 'same rule, same pivot point, loops hung vertically'], ['Answer', 'prediction: F₁ × d₁ = F₂ × d₂ every time']], size: 10.5 },
  qc: 'Why is the pivot placed at the centre of mass of the metre rule?',
  notes: `QUICK CHECK ANSWER: So the weight of the rule acts through the pivot and has no moment – only the hanging weights produce moments.\nDrawn arrangement asserted in node: 1.0 N × 0.30 m = 1.5 N × 0.20 m = 0.30 N m. 100 g → 1.0 N with g = 10 N/kg.\nApparatus: metre rule (with a hole at 50 cm or a knife-edge pivot), pivot / clamp stand, thread, mass hangers and slotted masses (10 g – 100 g), (optional) spirit level.\nThis is a suggested practical: Topic 9 has no Core Practical in 1PH0.`,
}), 'Practical: apparatus and method');

// ======================= 25 PRACTICAL: RESULTS =======================
const GPM = { x: 1.45, y: 1.55, w: 4.6, h: 3.55, xmin: 0, xmax: 0.7, ymin: 0, ymax: 0.7, xstep: 0.1, ystep: 0.1, minor: 2, xlabel: 'anticlockwise moment F₁ × d₁ / N m', ylabel: 'clockwise moment F₂ × d₂ / N m', fmt: v => v.toFixed(1) };
{
  const s = D.contentHeader('Suggested practical: results and analysis', `Specification ${sp('9.8')} • sample results (g = 10 N/kg)`, { p: true, tag: 'Practical 9.8P' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale; the line is clockwise = anticlockwise');
  axes(s, GPM);
  plotLine(s, GPM, [[0, 0], [0.7, 0.7]], C.blue, 1.75);
  points(s, GPM, PM.map(([f1, d1, f2, d2]) => [f1 * d1, f2 * d2]));
  const hdr = ['F₁ / N', 'd₁ / m', 'F₁ × d₁ / N m', 'F₂ / N', 'd₂ / m', 'F₂ × d₂ / N m'].map(t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } }));
  const rows = [hdr, ...PM.map(([f1, d1, f2, d2], i) => [f1.toFixed(1), d1.toFixed(3), (f1 * d1).toFixed(3), f2.toFixed(1), d2.toFixed(3), (f2 * d2).toFixed(3)].map((t, j) => ({ text: t, options: { fill: { color: i % 2 ? C.white : C.cardBlue }, bold: j === 2 || j === 5, color: j === 2 || j === 5 ? C.blue : C.text } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [0.85, 0.9, 1.29, 0.85, 0.9, 1.29], rowH: 0.36, fontFace: 'Calibri', fontSize: 11, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.05, 6.08, 2.2, 'What the results show', [
    'In every row F₁ × d₁ ≈ F₂ × d₂ (within about 1%).',
    'All points lie close to the line **clockwise moment = anticlockwise moment**.',
    'Small differences come from reading the loop positions (about ±2 mm) and from friction at the pivot.',
    'Conclusion: the results **support** the principle of moments.',
  ], { size: 11 });
  D.quickCheck(s, 'A 2.0 N weight hangs 15 cm left of the pivot. Where should a 1.5 N weight hang for the rule to balance?');
  D.notes(s, `QUICK CHECK ANSWER: 2.0 × 0.15 = 0.30 N m; d = 0.30 ÷ 1.5 = 0.20 m = 20 cm to the right of the pivot.\nEach row asserted in node to agree within 1.2%. Sample data: ${PM.map(r => r.join('/')).join('; ')}.`);
  reg(s, 'Practical: results and analysis');
}

// ======================= 26 PRACTICAL: ERRORS AND SAFETY =======================
reg(D.contentSlide({
  title: 'Suggested practical: errors and safety',
  subtitle: `Specification ${sp('9.8')} • evaluating the method`,
  tag: 'Practical 9.8P', p: true, caption: 'check the rule is level and read each loop position square-on',
  draw: (s, p) => {
    // tilted rule
    label(s, 0.7, 1.45, 5.6, 'Not balanced before loading → zero error', { size: 11.5, bold: true, color: C.red, align: 'left' });
    s.addShape(SH.RECTANGLE, { x: 1.0, y: 2.25, w: 4.6, h: 0.14, fill: { color: 'F6E7B8' }, line: { color: 'B79B4A', width: 0.75 }, rotate: -6 });
    pivot(s, 3.6, 2.4, 0.34, 0.45);
    label(s, 1.0, 2.75, 2.3, 'centre of mass not over the pivot', { size: 10.5, italic: true, color: C.grey, align: 'left' });
    // level rule with eye
    label(s, 0.7, 3.3, 5.6, 'Balanced and level → read loop positions at eye level', { size: 11.5, bold: true, color: C.green, align: 'left' });
    box(s, 1.0, 4.1, 4.6, 0.14, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let c = 0; c <= 100; c += 10) line(s, 1.0 + c * 0.046, 4.1, 1.0 + c * 0.046, 4.2, '6B5A2A', 0.75);
    pivot(s, 3.3, 4.24, 0.34, 0.45);
    line(s, 2.08, 4.24, 2.08, 4.7, C.ink, 1); massHanger(s, 2.08, 4.7, 3, { w: 0.34 });
    s.addShape(SH.OVAL, { x: 2.08 - 0.2, y: 3.62, w: 0.4, h: 0.24, fill: { color: C.white }, line: { color: C.green, width: 1.5 } });
    s.addShape(SH.OVAL, { x: 2.08 - 0.06, y: 3.68, w: 0.12, h: 0.12, fill: { color: C.green }, line: { color: C.green } });
    line(s, 2.08, 3.86, 2.08, 4.08, C.green, 1, { dash: 'dash' });
    label(s, 4.0, 4.55, 2.3, 'spirit level on top', { size: 10.5, italic: true, color: C.grey, align: 'left' });
  },
  head: 'Sources of error',
  lines: [
    '**Rule not balanced** at the start → its weight adds a moment. Balance it first, or include its weight.',
    '**Loop position** hard to judge → use thin thread loops; read the scale square-on to avoid **parallax**.',
    '**Distances** measured from the end of the rule, not the pivot → always measure from the pivot.',
    '**Friction** at the pivot lets the rule stay still when it is slightly unbalanced → use a sharp knife edge.',
    'Masses may not be exactly their stated value → check with a balance.',
  ],
  worked: { head: 'Safety and improvements', q: '',
    steps: [['Hazard', 'masses could fall on feet → keep the set-up low; tray beneath'], ['Improve', 'use a spirit level to judge “balanced”'], ['Repeat', 'repeat each balance and take a mean of d₂'], ['Answer', 'more precise distances → better test of the principle']], size: 10.5 },
  qc: 'A student measured all the distances from the 0 cm end of the rule instead of from the pivot. Explain why her moments did not balance.',
  notes: 'QUICK CHECK ANSWER: Moments must be calculated with the distance from the pivot (the perpendicular distance to the line of the force). Distances from the end are wrong for at least one side, so F × d would not be the moment and the two totals would not be equal.\nAlso accept: systematic error.',
}), 'Practical: errors and safety');

// ======================= 27 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('9.8')} • suggested practical: principle of moments`, [
  { q: 'In the metre-rule investigation, name the **independent** variable, the **dependent** variable and **one control** variable.', marks: 3, ms: 'IV: the weight/distance on the left side (F₁ or d₁) (1); DV: the distance of the second weight at balance (d₂) (1); CV: same rule / same pivot position / same g / loops vertical (1).' },
  { q: 'Explain why the metre rule should balance on the pivot **before** any masses are added.', marks: 2, ms: 'So the centre of mass/weight of the rule is over the pivot (1); so the rule’s weight has no moment / only the hanging weights give moments (1).' },
  { q: 'A **2.0 N** weight hangs **25 cm** from the pivot. Calculate where a **1.5 N** weight must hang on the other side for balance.', marks: 3, ms: '2.0 × 0.25 = 0.50 N m (1); d = 0.50/1.5 (1); = 0.33 m / 33 cm (1).' },
]);
reg(R6.s, 'Recap 6');

// ======================= 28 9.9P LEVERS =======================
const LV = { x0: 0.8, xLoad: 1.15, xEnd: 6.0, y: 4.4, m: lv.dL + lv.dE };
const lvX = d => LV.xLoad + d * (LV.xEnd - LV.xLoad) / LV.m; // d measured from the load point (m)
near((lvX(LV.m) - lvX(lv.dL)) / (lvX(lv.dL) - lvX(0)), lv.dE / lv.dL, 1e-9, 'lever drawn to scale');
reg(D.contentSlide({
  title: 'Levers are force multipliers',
  subtitle: `Specification ${sp('9.9')} • how levers transmit the rotational effect of a force`,
  tag: '9.9P', p: true, caption: 'a crowbar lifting a rock, drawn to scale; force arrows to scale',
  draw: (s, p) => {
    const xp = lvX(lv.dL), xr = lvX(LV.m), xl = lvX(0);
    box(s, LV.x0, LV.y, LV.xEnd - LV.x0, 0.12, '6B7385', '4A5262');
    box(s, xp - 0.5, LV.y + 0.6, 1.0, 0.08, 'B0B7C6', null);
    pivot(s, xp, LV.y + 0.12, 0.36, 0.48);
    // rock above the load end
    s.addShape(SH.ROUNDED_RECTANGLE, { x: xl - 0.3, y: LV.y - 0.55, w: 0.6, h: 0.55, fill: { color: '9A9184' }, line: { color: '6B6258' }, rectRadius: 0.1 });
    forceArrow(s, xl, LV.y - 0.3, 'up', L27 * 0.005, null, C.blue);
    label(s, xl + 0.12, LV.y - 2.3, 2.0, 'force on rock 400 N', { size: 10.5, bold: true, color: C.blue, align: 'left' });
    forceArrow(s, xr - 0.06, LV.y + 0.12, 'down', lv.E * 0.005, null, C.red, { width: 3 });
    label(s, xr - 1.65, LV.y + 0.18, 1.5, 'effort 50 N', { size: 10.5, bold: true, color: C.red, align: 'right' });
    const yd = LV.y + 0.95;
    arrow(s, xl, yd, xp, yd, C.ink, 1.1, { tail: true }); label(s, xl - 0.45, yd + 0.03, 1.0, '0.15 m', { size: 10.5, bold: true, align: 'left' });
    arrow(s, xp, yd, xr - 0.06, yd, C.ink, 1.1, { tail: true }); label(s, xp, yd + 0.03, xr - xp, '1.2 m', { size: 10.5, bold: true });
    label(s, xp - 0.6, LV.y + 0.62, 1.2, 'pivot', { size: 10.5, italic: true, color: C.grey });
  },
  head: 'How a lever works',
  lines: [
    'A **lever** is a rigid bar that turns about a **pivot**.',
    'A small **effort** a long way from the pivot gives the same **moment** as a large force close to the pivot.',
    'So the lever **multiplies the force**: effort × its distance = load × its distance.',
    'The trade-off: the effort must move a **larger distance** than the load.',
    'Examples: crowbar, wheelbarrow, bottle opener, scissors, pliers.',
  ],
  worked: { head: 'Worked example', q: 'A 50 N effort is applied 1.2 m from the pivot. The rock is 0.15 m from the pivot. What force acts on the rock?',
    steps: [['Principle', 'moment of effort = moment of load'], ['Substitute', '50 × 1.2 = F × 0.15'], ['Rearrange', 'F = 60 ÷ 0.15'], ['Answer', `F = ${L27} N (8 times the effort)`]] },
  qc: 'A wheelbarrow carries a 600 N load 0.40 m from the wheel axle. The handles are 1.2 m from the axle. What upward force is needed at the handles?',
  notes: `QUICK CHECK ANSWER: F × 1.2 = 600 × 0.40 = 240 N m, so F = ${qc27} N.\nAsserted in node: 50 N × 1.2 m = 400 N × 0.15 m = 60 N m. In the wheelbarrow the pivot (wheel) is at one end and the load is between the pivot and the effort.`,
}), '9.9P Levers');

// ======================= 29 9.9P GEARS =======================
const GTH = 0.16, GA = { cx: 1.6, cy: 3.75, r: 0.7 }, GB = { cx: 1.6 + 0.7 + 1.4 + 0.3 * GTH, cy: 3.75, r: 1.4 }; // tooth tips reach the other gear's root circle
near(GA.r + 0.65 * GTH, (GB.cx - GA.cx) - (GB.r - 0.35 * GTH), 1e-9, 'gear A tip meets B root');
near(2 * Math.PI * GA.r / gA.n, 2 * Math.PI * GB.r / gB.n, 1e-9, 'gears share the same tooth pitch');
near(GB.r / GA.r, gB.r / gA.r, 1e-9, 'drawn radii in the 1:2 ratio of the worked example');
reg(D.contentSlide({
  title: 'Gears transmit turning effects',
  subtitle: `Specification ${sp('9.9')} • meshing gears turn in opposite directions`,
  tag: '9.9P', p: true, caption: 'driver gear (12 teeth) turning a driven gear (24 teeth)',
  draw: (s, p) => {
    gear(s, GA.cx, GA.cy, GA.r, gA.n, 0, 'F5C242', { th: GTH });
    gear(s, GB.cx, GB.cy, GB.r, gB.n, 180 + 180 / gB.n, '9DC3E6', { th: GTH });
    turnArrow(s, GA.cx, GA.cy, GA.r + 0.32, gA.dir, C.red, 2.5, [-160, -40]);
    turnArrow(s, GB.cx, GB.cy, GB.r + 0.3, gB.dir, C.blue, 2.5, [-140, -40]);
    label(s, 0.55, 1.8, 2.4, gA.dir > 0 ? 'driver: clockwise' : 'driver: anticlockwise', { size: 11, bold: true, color: C.red });
    label(s, 3.0, 1.5, 3.4, gB.dir > 0 ? 'driven: clockwise' : 'driven: anticlockwise', { size: 11, bold: true, color: C.blue });
    label(s, 0.55, 4.75, 2.4, '12 teeth, r = 5 cm', { size: 10.5, bold: true });
    label(s, 3.3, 5.35, 2.4, '24 teeth, r = 10 cm', { size: 10.5, bold: true });
  },
  head: 'Gears',
  lines: [
    'Gears are wheels with **teeth** that interlock. The teeth push on each other with **equal and opposite forces**.',
    'Meshing gears turn in **opposite directions**.',
    'A **larger** driven gear: the same force acts at a bigger radius → **bigger moment**, but it turns **more slowly**.',
    'A **smaller** driven gear turns **faster** with a smaller moment.',
    'Used in bicycles, clocks, car gearboxes and drills.',
  ],
  worked: { head: 'Worked example', q: 'The driver (radius 0.05 m) has a moment of 6.0 N m. Find the moment of the driven gear (radius 0.10 m).',
    steps: [['Tooth force', 'F = M ÷ r = 6.0 ÷ 0.05 = 120 N'], ['Driven', 'M = F × r = 120 × 0.10'], ['Speed', `24 teeth: ${turns28} turn for each turn of the driver`], ['Answer', `moment = ${MB28} N m (doubled), half the speed`]], size: 10.5 },
  qc: 'A driver gear with 40 teeth turns clockwise at 60 turns per minute. It drives a gear with 20 teeth. Give the direction and speed of the driven gear.',
  notes: `QUICK CHECK ANSWER: Anticlockwise; 60 × 40/20 = 120 turns per minute (twice as fast, half the moment).\nRotation directions are set from data in node (driven dir = −driver dir, asserted) and the arrows are drawn from those values. Tooth force ${Ft28} N; driven moment ${MB28} N m.`,
}), '9.9P Gears');

// ======================= 30 9.10P LUBRICATION =======================
reg(D.contentSlide({
  title: 'Friction and lubrication',
  subtitle: `Specification ${sp('9.10')} • reducing unwanted energy transfer through lubrication`,
  tag: '9.10P', p: true, caption: 'magnified view of two surfaces sliding past each other',
  draw: (s, p) => {
    const rough = (x0, x1, y, amp, up, seed) => {
      let r = seed; const rnd = () => (r = (r * 9301 + 49297) % 233280) / 233280;
      const pts = []; const n = 14; for (let i = 0; i <= n; i++) pts.push([x0 + (x1 - x0) * i / n, y + (i % 2 ? amp * (0.6 + 0.4 * rnd()) : 0) * (up ? -1 : 1)]);
      for (let i = 0; i < n; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.ink, 1.75);
    };
    const panelSide = (x0, title, oil, col) => {
      label(s, x0, 1.5, 2.7, title, { size: 12, bold: true, color: col });
      box(s, x0 + 0.1, 2.1, 2.5, 1.0, 'C9D5F2', null); box(s, x0 + 0.1, oil ? 3.65 : 3.3, 2.5, 1.2, 'B0B7C6', null);
      if (oil) box(s, x0 + 0.1, 3.1, 2.5, 0.55, 'F5C242', null, { tr: 30 });
      rough(x0 + 0.1, x0 + 2.6, 3.1, 0.2, false, 3); rough(x0 + 0.1, x0 + 2.6, oil ? 3.65 : 3.3, 0.2, true, 7);
      arrow(s, x0 + 0.8, 2.6, x0 + 1.9, 2.6, C.blue, 2.5);
      label(s, x0, 4.95, 2.7, oil ? 'oil keeps the surfaces apart' : 'bumps catch and rub', { size: 10.5, bold: true, color: col });
    };
    panelSide(0.65, 'Dry surfaces', false, C.red);
    panelSide(3.65, 'Lubricated', true, C.green);
    label(s, 3.75, 4.45, 2.5, 'yellow layer = oil', { size: 10.5, bold: true, color: C.ink });
  },
  head: 'Why lubricate?',
  lines: [
    '**Friction** opposes motion when surfaces slide. Work done against friction **heats** the surfaces.',
    'This energy is **dissipated** to the thermal store of the surroundings – an **unwanted** energy transfer. It also causes **wear**.',
    'A **lubricant** (oil, grease) forms a thin layer between surfaces, so they slide easily: **less friction**.',
    'Less friction → less energy wasted → **higher efficiency**.',
  ],
  worked: { head: 'Worked example', q: 'A motor is supplied with 500 J. Friction wastes 150 J. After oiling, it wastes 50 J. Compare the efficiencies.',
    steps: [['Before', `useful = 350 J; efficiency = 350 ÷ 500 = ${eff1.toFixed(2)}`], ['After', `useful = 450 J; efficiency = 450 ÷ 500 = ${eff2.toFixed(2)}`], ['Change', '70% → 90%'], ['Answer', 'lubrication raises the efficiency by 20 percentage points']], size: 10.5 },
  qc: 'Give two machines where lubrication is used to reduce friction, and one situation where friction is useful.',
  notes: `QUICK CHECK ANSWER: Lubricated: bicycle chain, car engine, door hinges, gears, bearings (any two). Friction useful: brakes, tyres gripping the road, walking (any one).\nEfficiency = useful energy output ÷ total energy input (Topic 3, recall). Combined Science classes met lubrication in Topic 3 (3.9); 9.10P is physics only.`,
}), '9.10P Lubrication');

// ======================= 31 RECAP 7 =======================
const R7 = D.recapSlide(7, `Specification ${sp('9.9')}, ${sp('9.10')} • levers, gears and lubrication`, [
  { q: 'A gardener uses a lever to lift a **600 N** rock **0.20 m** from the pivot. She pushes **1.5 m** from the pivot. Calculate the effort force needed.', marks: 3, ms: '600 × 0.20 = 120 N m (1); F × 1.5 = 120 (1); F = 80 N (1).' },
  { q: 'A driver gear with **10** teeth turns a gear with **30** teeth. State the direction of the driven gear and how many turns it makes for each turn of the driver.', marks: 2, ms: 'Opposite direction (1); one third of a turn (1).' },
  { q: 'Explain how oiling a bicycle chain reduces unwanted energy transfer.', marks: 2, ms: 'Oil/lubricant reduces friction between moving parts (1); so less work is done against friction / less energy is dissipated as heat (thermal energy) to the surroundings (1).' },
]);
reg(R7.s, 'Recap 7');

// ======================= 32 EQUATIONS =======================
reg(D.equationsSlide([['MFd', sp('9.7')], ['Fma', 'Topic 2 / 9.5'], ['Wmg', 'Topic 2 / 9.1'], ['WFd', 'Topic 8 / 9.10P']], {
  subtitle: 'Topic 9 equations • RECALL = learn it; GIVEN = on the Physics Equations List',
  qc: 'Cover the middle column. For each equation, say every quantity and its unit aloud.',
  notes: 'QUICK CHECK: self-check against the table. Topic 9 has one new equation, moment = force × distance normal to the direction of the force (9.7P, RECALL; physics only). F = m × a, W = m × g and E = F × d are recall equations from Topics 2 and 8 used in this deck. The principle of moments (9.8P) is a rule to recall, not an equation-sheet item.',
}), 'Summary: equations');

// ======================= 33 KEY WORDS =======================
reg(D.keyWords([
  ['Non-contact force', 'Acts between objects that are not touching, through a field: gravitational, electrostatic, magnetic.'],
  ['Contact force', 'Acts between objects that touch: normal contact force, friction, tension, air resistance.'],
  ['Normal contact force', 'The push of a surface on an object, at 90° to the surface.'],
  ['Friction', 'A force along a surface that opposes sliding between the surfaces.'],
  ['Interaction pair', 'Two equal and opposite forces of the same type, acting on two different objects.'],
  ['Vector', 'A quantity with size and direction, e.g. force, velocity, displacement.'],
  ['Scalar', 'A quantity with size only, e.g. mass, speed, energy, distance.'],
  ['Resultant force', 'The single force with the same effect as all the forces on an object.'],
  ['Free body diagram', 'One object with labelled arrows for every force acting on it.'],
  ['Equilibrium', 'Resultant force zero; vectors drawn tip to tail form a closed shape.'],
  ['Component', 'One of two forces at right angles that together replace a single force.'],
  ['Moment', 'Turning effect of a force: force × distance normal to the force (N m).'],
  ['Pivot', 'The fixed point an object turns about (also called the fulcrum).'],
  ['Principle of moments', 'Balanced: sum of clockwise moments = sum of anticlockwise moments.'],
  ['Levers and gears', 'Transmit turning effects; can increase the force or the speed of turning.'],
  ['Lubrication', 'A layer of oil or grease that reduces friction and wasted energy.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal. Terms 12–16 are physics only (9.6P–9.10P).' }), 'Summary: key words');

// ======================= 34 FULL QUESTION =======================
reg(D.fullQuestion('Two children play in a park. First they pull a **sledge** across the snow with ropes. Then they sit on a **see-saw** that is pivoted at its centre.', [
  { l: 'a', q: 'Name **one** non-contact force and **two** contact forces that act on the moving sledge.', marks: 2, ms: 'Non-contact: weight/gravitational force (1); contact: any two of friction, tension, normal contact force, air resistance (1).' },
  { l: 'b', q: 'Force is a **vector** quantity. State what is meant by a vector quantity and name **one** scalar quantity.', marks: 2, ms: 'Has size/magnitude and direction (1); any scalar, e.g. mass, speed, energy, distance, time (1).' },
  { l: 'c', q: 'The children pull with forces of **30 N** east and **40 N** north. Use a scale drawing to find the size and direction of the resultant force.', marks: 3, ht: true, ms: 'Scale drawing, tip to tail with a scale (1); 50 N (allow 48–52 N) (1); 53° north of east / 37° east of north (allow ±2°) (1).', h: 1.2 },
  { l: 'd', q: '(Physics only) A child of weight **300 N** sits **2.0 m** from the pivot of the see-saw. Calculate the moment of her weight about the pivot. Give the unit.', marks: 2, ms: 'moment = 300 × 2.0 (1); = 600 N m (1, unit needed).' },
  { l: 'e', q: '(Physics only) Her friend has a weight of **400 N**. Calculate how far from the pivot he must sit, on the other side, for the see-saw to balance.', marks: 2, ms: '400 × d = 600 (1); d = 1.5 m (1). ECF from (d).' },
  { l: 'f', q: '(Physics only) Explain why it is easier to open a door by pushing at the handle than by pushing near the hinge.', marks: 2, ms: 'The handle is further from the pivot/hinge (1); so the same force gives a larger moment / a smaller force is needed for the same moment (1).' },
], 13, { subtitle: 'Specification 9.1–9.3, 9.6P–9.8P • answer every part • 13 marks', ht: true }), 'Full question');

// ======================= 35–36 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Which **one** of these is a non-contact force? friction • magnetic force • tension • normal contact force', marks: 1, ms: 'magnetic force (1).' },
  { n: '2', q: 'Explain the difference between a **vector** and a **scalar** quantity. Give **one** example of each.', marks: 3, ms: 'Vector has size and direction; scalar has size only (1); vector example, e.g. force/velocity/displacement/acceleration/momentum/weight (1); scalar example, e.g. mass/speed/energy/distance/time (1).' },
  { n: '3', q: 'A box has a **60 N** push to the right and **45 N** of friction acting on it. Its weight is **80 N**. Draw a free body diagram and calculate the resultant force.', marks: 3, ht: true, ms: 'Diagram with four labelled arrows from the box, normal force = weight (1); 60 − 45 (1); = 15 N to the right (1).' },
  { n: '4', q: '(Physics only) A force of **45 N** acts at right angles to a spanner **0.20 m** from the nut. Calculate the moment.', marks: 2, ms: 'moment = 45 × 0.20 (1); = 9.0 N m (1).' },
  { n: '5', q: '(Physics only) A small gear drives a larger gear. Explain why the larger gear turns with a **larger moment** but **more slowly**.', marks: 2, ms: 'The forces on the teeth are equal, but the larger gear has a larger radius so the moment (F × d) is larger (1); it has more teeth, so it makes fewer turns for each turn of the small gear (1).' },
  { n: '6', q: '(Physics only) Describe how to use a metre rule, a pivot and some masses to test the principle of moments. Include how you would use your results.', marks: 6, levels: true, h: 2.3, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Balance the metre rule on a pivot at its centre of mass (about 50 cm) with no masses.',
    'Hang a known mass/weight on one side at a measured distance from the pivot, using a thread loop.',
    'Hang a second known weight on the other side; move it until the rule balances (is level).',
    'Measure both distances from the pivot (in m); convert masses to weights (W = mg).',
    'Repeat with different weights and positions (at least 5 sets); repeat each and take means.',
    'Calculate the clockwise moment (F × d) and the anticlockwise moment for each set.',
    'Compare: if clockwise moment = anticlockwise moment each time, the principle is supported; plot one against the other – a straight line through the origin with gradient 1.',
    'Control: same rule, same pivot position; read distances square-on (parallax); use a spirit level.',
    'Safety: keep feet clear of the masses; secure the pivot.',
  ]);
}
D.homework('Combined Science (1SC0) students: answer Q1–Q3 only (7 marks).', HW, 17, { ht: true });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 8);
assert.strictEqual(R5.total, 7); assert.strictEqual(R6.total, 8); assert.strictEqual(R7.total, 7);
assert(SLIDES.find(t => t.startsWith(P_FIRST + '. 9.6P')), 'P section must start at slide ' + P_FIRST);
assert(SLIDES.find(t => t.startsWith(P_LAST + '. Recap 7')), 'P section must end at slide ' + P_LAST);
assert.strictEqual(HW.filter(q => ['1', '2', '3'].includes(q.n)).reduce((a, q) => a + q.marks, 0), 7);
assert(D.slideNo >= 30 && D.slideNo <= 36, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1PH0_T9_ForcesAndTheirEffects.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
