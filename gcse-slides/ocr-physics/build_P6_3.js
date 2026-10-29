// build_P6_3.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter P6 Matter – models and explanations, P6.3 How does the particle model relate to material under stress?
// (one deck, Higher & Foundation). Part 3 of 3: the last P6 deck, and the last physics sub-topic in J260 (P1–P6).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_P6_3.js
// Structure copied from build_P6_1.js. ocr_template.js is NOT edited: deck-only helpers are in the DECK-SPECIFIC block.
// Spring / mass-hanger / clamp-stand / ruler drawings and the force–extension graph code follow
// ../edexcel-physics/build_T15.js (approved deck); the base primitives (spring, massHanger, clampStand, ruler,
// areaTriangle) already exist in ocr_template.js and are used from there.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'P6', chapterTitle: 'Matter – models and explanations', code: 'P6.3', title: 'How does the particle model relate to material under stress?',
  part: 3, parts: 3, specRange: 'P6.3.1–P6.3.7',
  subtitle: 'Stretching, compressing and bending; springs, F = kx and elastic energy',
  keywords: ['Elastic', 'Plastic', 'Extension', 'Spring constant', 'Limit of proportionality', 'Elastic energy'],
};
const D = T.init(DECK);
const { line, arrow, forceArrow, label, box, spring, hspring, massHanger, clampStand, ruler, axes, points, plotLine, fnLine, areaTriangle, px, py, SH } = D;
const sp = D.spec;
const g = 10; // N/kg (OCR data-sheet value used in J260 papers)
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= EQUATIONS (J260 equation list) =======================
// F = k × x is a RECALL equation; E = ½ × k × x² is GIVEN on the equation sheet ("energy stored in a stretched spring").
// W = m × g and work done = F × d are RECALL equations (P4, used here).
T.addEq('FKX', { eq: 'F = k × x', words: 'force exerted by a spring (N) = spring constant (N/m) × extension (m)', status: 'recall' });
T.addEq('EKX', { eq: 'E = ½ × k × x²', words: 'energy stored in a stretched spring (J) = ½ × spring constant (N/m) × (extension (m))²', status: 'given' });
T.addEq('WMG', { eq: 'W = m × g', words: 'weight (N) = mass (kg) × gravitational field strength (N/kg)', status: 'recall' });
T.addEq('WFD', { eq: 'W = F × d', words: 'work done (J) = force (N) × distance moved in the direction of the force (m)', status: 'recall' });
const ST = k => T.EQS[k].status === 'recall' ? '!!RECALL!!' : '**GIVEN** on the equation sheet';

// ======================= CALCULATIONS (asserted) =======================
const close = (a, b, rel = 0.01) => Math.abs(a - b) <= rel * Math.abs(b);
// starter
calc('starter resultant 12 − 5', 12 - 5, 7);
calc('starter W = 0.20 × 10', 0.20 * g, 2.0, 1e-12);
calc('starter work 5.0 × 0.40', 5.0 * 0.40, 2.0, 1e-12);
calc('starter 35 cm in m', 35 / 100, 0.35, 1e-12);
calc('starter 2.5 kN in N', 2.5 * 1000, 2500, 1e-9);
// slide 5: two forces on a hanging spring
calc('hanging 200 g weight', 0.200 * g, 2.0, 1e-12);
// F = kx (slide 9)
const k9 = calc('k = 3.0 / 0.12', 3.0 / 0.12, 25, 1e-9);
const qc9 = calc('QC F = 40 × 0.050', 40 * 0.050, 2.0, 1e-12);
calc('QC x = 3.0 / 40', 3.0 / 40, 0.075, 1e-12);
// slide 10 graph: spring k = 40 N/m, LoP at x = 0.15 m, F = 6 N; rubber band F = 100x²
const kG = 40, xL = 0.15, FL = calc('FL = 40 × 0.15', kG * xL, 6, 1e-12);
const tau = 0.06, Aq = kG * tau; // curve beyond LoP: slope matches at the LoP, then flattens
const fG = x => x <= xL ? kG * x : FL + Aq * (1 - Math.exp(-(x - xL) / tau));
const fR = x => 100 * x * x;
calc('rubber band F at 0.30', fR(0.30), 9, 1e-9);
calc('k from graph 4.0 / 0.10', 4.0 / 0.10, 40, 1e-12);
calc('QC10 F at 0.05', fG(0.05), 2.0, 1e-12);
calc('rubber band gradient doubles: F(0.2)/F(0.1)', fR(0.2) / fR(0.1), 4, 1e-9);
// slide 12: energy
const E12 = calc('E = 0.5 × 40 × 0.15²', 0.5 * 40 * 0.15 ** 2, 0.45, 1e-12);
calc('area = 0.5 × 6.0 × 0.15', 0.5 * 6 * 0.15, 0.45, 1e-12);
const qc12 = calc('QC E = 0.5 × 200 × 0.050²', 0.5 * 200 * 0.05 ** 2, 0.25, 1e-12);
calc('average force method 3.0 × 0.15', (0 + 6) / 2 * 0.15, 0.45, 1e-12);
// slide 13: rearranging + counting squares (stretch)
const x13 = calc('x = √(2 × 0.20 / 40)', Math.sqrt(2 * 0.20 / 40), 0.10, 1e-12);
const qc13 = calc('QC x = √(2 × 1.0 / 50)', Math.sqrt(2 * 1.0 / 50), 0.20, 1e-12);
let areaCurve = 0; { const n = 3000, a = 0, b = 0.30; for (let i = 0; i < n; i++) { const x0 = a + (b - a) * i / n, x1 = a + (b - a) * (i + 1) / n; areaCurve += (fG(x0) + fG(x1)) / 2 * (x1 - x0); } }
calc('one square = 0.05 m × 1 N', 0.05 * 1, 0.05, 1e-12);
const nSq = areaCurve / 0.05;
assert(nSq > 31 && nSq < 32.5, 'squares ' + nSq);
calc('area under curve ≈ 1.6 J (2 s.f.)', sf(areaCurve, 2), 1.6, 1e-12);
calc('linear part triangle 0.45 J = 9 squares', 0.45 / 0.05, 9, 1e-9);
// PAG P2 data: 100 g masses (1.0 N each), unloaded length 5.0 cm, k = 20 N/m, LoP passed at 7 N
const L0 = 5.0;
const pF = [0, 1, 2, 3, 4, 5, 6, 7];
const pL = [5.0, 10.1, 14.9, 20.0, 25.1, 29.9, 35.0, 42.5];
const pX = pL.map(l => +(l - L0).toFixed(1));
assert.deepStrictEqual(pX, [0, 5.1, 9.9, 15.0, 20.1, 24.9, 30.0, 37.5]);
pX.slice(1, 7).forEach((x, i) => assert(Math.abs(x / 100 * 20 - pF[i + 1]) < 0.05, 'PAG scatter within 0.05 N'));
assert(37.5 / 100 * 20 - 7 > 0.4, '7 N point clearly off the line');
calc('mass 100 g weight', 0.100 * g, 1.0, 1e-12);
const kGrad = calc('k = ΔF/Δx = 5.0 / 0.25', (6.0 - 1.0) / (0.30 - 0.05), 20, 1e-9);
const kLS = pX.slice(0, 7).reduce((a, x, i) => a + x / 100 * pF[i], 0) / pX.slice(0, 7).reduce((a, x) => a + (x / 100) ** 2, 0);
assert(close(kLS, 20, 0.01), 'least-squares k ≈ 20: ' + kLS);
const Wp = calc('W = 0.5 × 6.0 × 0.30', 0.5 * 6.0 * 0.30, 0.90, 1e-12);
calc('E = 0.5 × 20 × 0.30²', 0.5 * 20 * 0.30 ** 2, 0.90, 1e-12);
const qcP = calc('PAG QC 0.5 × 20 × 0.20²', 0.5 * 20 * 0.20 ** 2, 0.40, 1e-12);
calc('PAG QC area ½ × 4.0 × 0.20', 0.5 * 4.0 * 0.20, 0.40, 1e-12);
calc('PAG QC2 extension at 4.0 N', 25.1 - 5.0, 20.1, 1e-9);
// recaps
calc('R2 k = 6.0 / 0.15', 6.0 / 0.15, 40, 1e-9);
calc('R2 x = 2.0 / 50', 2.0 / 50, 0.040, 1e-12);
calc('R3 E = 0.5 × 30 × 0.20²', 0.5 * 30 * 0.2 ** 2, 0.60, 1e-12);
calc('R3 area = 0.5 × 4.0 × 0.080', 0.5 * 4.0 * 0.080, 0.16, 1e-12);
calc('R3 x = √(2 × 0.36 / 50)', Math.sqrt(2 * 0.36 / 50), 0.12, 1e-12);
calc('R4 k = 4.0 / 0.16', 4.0 / 0.16, 25, 1e-9);
calc('R4 W = 0.5 × 4.0 × 0.16', 0.5 * 4.0 * 0.16, 0.32, 1e-12);
// full question
const fqx = calc('FQ x = 20.0 − 8.0 cm', 20.0 - 8.0, 12.0, 1e-9);
calc('FQ x in m', fqx / 100, 0.12, 1e-12);
calc('FQ k = 3.0 / 0.12', 3.0 / 0.12, 25, 1e-9);
calc('FQ E = 0.5 × 25 × 0.12²', 0.5 * 25 * 0.12 ** 2, 0.18, 1e-12);
calc('FQ mass = 3.0 / 10', 3.0 / g, 0.30, 1e-12);
// homework
calc('HW F = 80 × 0.050', 80 * 0.050, 4.0, 1e-12);
calc('HW E = 0.5 × 80 × 0.050²', 0.5 * 80 * 0.05 ** 2, 0.10, 1e-12);
calc('HW stretch k = 2 × 5.0 / 0.20²', 2 * 5.0 / 0.20 ** 2, 250, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_template.js) =======================
function ball(s, cx, cy, r, fill, edge) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: 0.75 } }); }
// filled polygon from absolute points [[x,y],...]
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
// equation badge: equation + RECALL / GIVEN pill (as build_P6_1.js)
function eqBadge(s, x, y, w, key) {
  const e = T.EQS[key], rec = e.status === 'recall';
  box(s, x, y, w, 0.5, C.white, rec ? C.red : C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
  label(s, x + 0.1, y, w - 1.4, e.eq, { h: 0.5, size: 16, bold: true, color: C.ink, align: 'left' });
  D.pill(s, x + w - 1.25, y + 0.1, rec ? 'RECALL' : 'GIVEN', rec ? C.red : C.green, 1.1);
}
// particle lattice with "bonds" drawn as small springs between neighbours.
// (x,y) top-left of the first particle centre; dx,dy spacing; shift[j] = horizontal offset of row j (for slip);
// o.bond: 'spring' | 'line' | false. Returns nothing.
const PART = ['5B7FD6', '2E4A9A'];
function lattice(s, x, y, nx, ny, dx, dy, o = {}) {
  const r = o.r || 0.11, shift = o.shift || [], col = o.col || PART;
  const P = (i, j) => [x + i * dx + (shift[j] || 0), y + j * dy];
  if (o.bond !== false) {
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      const [a, b] = P(i, j);
      if (i < nx - 1) { const [c] = P(i + 1, j); hspring(s, a + r, b, c - a - 2 * r, { coils: 3, width: 0.09, lw: 1, color: o.bondCol || '8C96A8' }); }
      if (j < ny - 1) {
        // vertical bond to the particle directly below, if there is one at the same x
        const below = [...Array(nx).keys()].map(k => P(k, j + 1)).find(([c]) => Math.abs(c - a) < 0.02);
        if (below) spring(s, a, b + r, below[1] - b - 2 * r, { coils: 3, width: 0.09, lw: 1, color: o.bondCol || '8C96A8' });
      }
    }
  }
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) { const [a, b] = P(i, j); ball(s, a, b, r, col[0], col[1]); }
}
// eye for the parallax diagram (as build_T15.js)
function eye(s, x, y, col, t) {
  s.addShape(SH.OVAL, { x: x - 0.22, y: y - 0.13, w: 0.44, h: 0.26, fill: { color: C.white }, line: { color: col, width: 1.5 } });
  s.addShape(SH.OVAL, { x: x - 0.07, y: y - 0.07, w: 0.14, h: 0.14, fill: { color: col }, line: { color: col } });
  label(s, x - 0.6, y + 0.15, 1.2, t, { size: 10.5, bold: true, color: col });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const lop = (s, gg, xv, yv) => s.addShape(SH.OVAL, { x: px(gg, xv) - 0.09, y: py(gg, yv) - 0.09, w: 0.18, h: 0.18, fill: { color: C.white }, line: { color: C.ink, width: 2 } });

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Materials under stress',
  footer: 'OCR J260 Combined Science B • P6.3 How does the particle model relate to material under stress? • teacher deck • mark schemes in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • PAG P2 forces: the force–extension investigation for a spring` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found in P6.3 • stretch items marked' },
    { icon: 'k', text: 'More than one force • elastic and plastic • F = kx • limit of proportionality • E = ½kx²' },
  ],
  notes: 'P6.3 How does the particle model relate to material under stress? is Part 3 of 3 in J260 Chapter P6 (P6.1, P6.2, P6.3) and the last physics sub-topic in Combined Science B (chapters P1–P6; there is no P7).\nThe P4 decks in this series left Hooke\'s law and springs (P4.1) and elastic energy (P4.4) to this sub-topic, so they are taught in full here.\nSpec wording and numbering in this deck were reconstructed from search extracts and memory because ocr.org.uk could not be fetched: see SPEC_P6_3.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'P6.3.1', text: 'Explain that to **stretch, compress or bend** an object, **more than one force** has to be applied.' },
  { code: 'P6.3.2', text: 'Describe the difference between **elastic** and **plastic** deformation, and explain it with the **particle model**.' },
  { code: 'P6.3.3', text: 'Describe the relationship between **force and extension** for a spring and other simple systems.' },
  { code: 'P6.3.4', text: 'Describe the difference between **linear** and **non-linear** force–extension relationships; the **limit of proportionality**.' },
  { code: 'P6.3.5', text: 'Recall and apply **F = k × x** and calculate a **spring constant** in linear cases.' },
  { code: 'P6.3.6', text: 'Calculate the **work done** in stretching from the **area under the force–extension graph**.' },
  { code: 'P6.3.7', text: 'Apply **E = ½ × k × x²** to find the energy stored in a stretched spring.' },
  { code: 'PAG P2', text: '**Practical:** investigate how the extension of a spring depends on the force applied.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'No P6.3 statement was found to be Higher tier only (bold) in the J260 specification (UNVERIFIED: check the spec). All objectives are for both tiers; rearranging E = ½kx² and the area under a curved graph are marked GRADE 7–9 STRETCH.\nNumbering P6.3.1–P6.3.7 is reconstructed (see SPEC_P6_3.md): check against the OCR J260 specification before using codes with students.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter P6 Matter – models and explanations • P6.3 is Part 3 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['P6.3.1', 'Stretching, compressing and bending need more than one force', 'Both tiers', C.blue],
    ['P6.3.2', 'Elastic and plastic deformation; the particle model', 'Both tiers', C.blue],
    ['P6.3.3–P6.3.5', 'Force–extension, F = k × x, limit of proportionality', 'Both tiers', C.blue],
    ['P6.3.6–P6.3.7', 'Work done = area under the graph; E = ½kx²', 'Both tiers', C.blue],
    ['PAG P2', 'Practical: force and extension of a spring; k and energy', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'P6.3\nMaterials under stress', { h: 0.75, size: 11.5, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 4 * 0.82 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.82;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.5, 6.6, 'Earlier links: P4 forces (resultant force, weight W = mg, work done W = Fd) • P6.1 particle model • P2 energy stores', { h: 0.4, size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.05, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter P6 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**P6.1 How does energy transform matter?** Density, specific heat capacity, latent heat.',
      '**P6.2 How does the particle model explain the effects of heating?** Gas particles, temperature and pressure.',
      '**P6.3 How does the particle model relate to material under stress?** (this deck)',
      'P6.3 is the **last physics sub-topic** in J260 (chapters P1–P6).',
    ], { size: 11.5, color: 'E6ECFA' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.85, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.55, 5.53, 2.3, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Every slide is for both tiers: no P6.3 statement was found to be Higher only.',
      '**F = k × x** must be recalled; **E = ½ × k × x²** is given on the equation sheet.',
      'One practical: **PAG P2** (forces): stretching a spring.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.65, w: 5.15, h: 2.1, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter P6 has three sub-topics in Combined Science: P6.1, P6.2 and P6.3 (see SPEC_P6_1.md). P6.4 (pressure in fluids) and P6.5 (Big Bang) are Physics B (J259) only. J260 physics has chapters P1–P6 only (the J260/03 and /07 examiners\' reports describe the papers as testing chapters P1–P6), so this deck completes J260 physics.\nThe P4 decks were lost; in the earlier series P4.1 left Hooke\'s law and springs to P6.3 and P4.4 left elastic energy to P6.3. This deck therefore teaches F = kx and E = ½kx² from scratch.\nPAG link: OCR PAG 2 (Forces) "Investigating the effect of forces on springs" (PMT OCR B PAG 2 notes; search extract). Its placement in P6.3 is the natural home but UNVERIFIED against the outline scheme of work.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'P4 • resultant force', q: 'A box has **12 N** acting to the right and **5 N** acting to the left. Give the size and direction of the **resultant force**.' },
  { from: 'P4 • weight', q: 'Calculate the **weight** of a **0.20 kg** mass. (g = 10 N/kg)' },
  { from: 'P4 • work done', q: 'A **5.0 N** force pulls a box **0.40 m**. Calculate the **work done**.' },
  { from: 'P6.1 • particle model', q: 'Describe the **arrangement** and **movement** of the particles in a **solid**.' },
  { from: 'P2 • energy stores', q: 'A catapult\'s elastic band is pulled back. Name the **energy store** that increases.' },
  { from: 'Maths • units', q: 'Convert **35 cm** into metres and **2.5 kN** into newtons.' },
], { subtitle: 'Recall from P4, P6.1, P2 and maths • 6 minutes • no notes', notes: 'ANSWERS\n1. 7 N to the right.\n2. W = m × g = 0.20 × 10 = 2.0 N.\n3. W = F × d = 5.0 × 0.40 = 2.0 J.\n4. Regular pattern / fixed positions, touching; they vibrate about fixed positions.\n5. Elastic (potential) energy store.\n6. 0.35 m; 2500 N.' }), 'Retrieval starter');

// ======================= 5 MORE THAN ONE FORCE =======================
reg(D.contentSlide({
  title: 'Changing shape needs more than one force',
  subtitle: `Specification ${sp('P6.3.1')} • stretching, compressing and bending`,
  tag: 'P6.3.1', caption: 'force arrows show the forces acting on each object',
  draw: (s, p) => {
    label(s, 0.65, 1.5, 1.6, 'Stretching', { bold: true, size: 12, align: 'left', color: C.ink });
    hspring(s, 2.3, 2.15, 2.3, { coils: 9 });
    forceArrow(s, 2.3, 2.15, 'left', 0.75, 'pull', C.red, { lw: 0.6 });
    forceArrow(s, 4.6, 2.15, 'right', 0.75, 'pull', C.red, { lw: 0.6 });
    label(s, 0.65, 2.75, 1.6, 'Compressing', { bold: true, size: 12, align: 'left', color: C.ink });
    hspring(s, 2.85, 3.4, 1.3, { coils: 9, width: 0.34 });
    arrow(s, 2.05, 3.4, 2.83, 3.4, C.red, 3); label(s, 1.5, 3.26, 0.5, 'push', { bold: true, color: C.red, size: 11, align: 'right' });
    arrow(s, 4.95, 3.4, 4.17, 3.4, C.red, 3); label(s, 5.0, 3.26, 0.6, 'push', { bold: true, color: C.red, size: 11, align: 'left' });
    label(s, 0.65, 4.0, 1.6, 'Bending', { bold: true, size: 12, align: 'left', color: C.ink });
    const pts = []; for (let i = 0; i <= 20; i++) { const t = i / 20; pts.push([1.9 + 3.4 * t, 4.75 + 0.28 * Math.sin(Math.PI * t)]); }
    for (let i = 0; i < 20; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], C.wood, 6);
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: 1.75, y: 4.8, w: 0.36, h: 0.32, fill: { color: '5A6275' }, line: { color: '5A6275' } });
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: 5.1, y: 4.8, w: 0.36, h: 0.32, fill: { color: '5A6275' }, line: { color: '5A6275' } });
    arrow(s, 3.6, 4.15, 3.6, 4.95, C.red, 3); label(s, 3.7, 4.12, 0.7, 'push', { bold: true, color: C.red, size: 11, align: 'left' });
    arrow(s, 1.93, 5.75, 1.93, 5.15, C.blue, 3); arrow(s, 5.28, 5.75, 5.28, 5.15, C.blue, 3);
    label(s, 2.05, 5.5, 3.1, 'support forces from both ends', { color: C.blue, size: 10.5, bold: true });
  },
  head: 'Why one force is not enough',
  lines: [
    'To **stretch**, **compress** or **bend** an object, **more than one force** must act on it, at different places.',
    'With only **one** force there is a **resultant force**, so the object just **accelerates** instead of changing shape.',
    'A spring held at the top: the load pulls down, the clamp pulls up.',
    'Bending a plank needs **three** forces: a push in the middle and a support force at each end.',
  ],
  worked: { head: 'Think it through', q: 'A 200 g mass hangs on a spring. The spring is still. (g = 10 N/kg)',
    steps: [['Load', `the weight (0.200 × 10 = ${0.200 * g} N) pulls the bottom of the spring **down**`], ['Clamp', 'pulls the top of the spring **up** with 2.0 N'], ['Balanced', 'resultant force = 0, so no acceleration'], ['Answer', 'two forces at the two ends → the spring stretches']] },
  qc: 'Explain why you cannot squash a ball of modelling clay with just one force.',
  notes: 'QUICK CHECK ANSWER: One force on its own gives a resultant force, so the clay would accelerate/move in that direction. To squash it you need two forces in opposite directions on different parts (e.g. two hands, or a hand and the table).\nDemo: pull one end of a spring lying on a smooth bench – it slides rather than stretches. Then hold the other end.',
}), 'P6.3.1 More than one force');

// ======================= 6 ELASTIC / PLASTIC =======================
reg(D.contentSlide({
  title: 'Elastic and plastic deformation',
  subtitle: `Specification ${sp('P6.3.2')} • does the object go back to its original shape?`,
  tag: 'P6.3.2', caption: 'the same kind of spring before, during and after loading',
  draw: (s, p) => {
    box(s, 0.7, 1.5, 5.6, 0.12, '5A6275', null);
    const xs = [1.75, 2.95, 4.15, 5.5], top = 1.62, Lr = 1.3;
    spring(s, xs[0], top, Lr, { coils: 10 });
    spring(s, xs[1], top, 2.0, { coils: 10 }); massHanger(s, xs[1], top + 2.0, 3, { w: 0.5 });
    spring(s, xs[2], top, Lr, { coils: 10 });
    spring(s, xs[3], top, 1.85, { coils: 10, width: 0.24 });
    line(s, 0.7, top + Lr, 6.3, top + Lr, C.blue, 1, { dash: 'dash' });
    label(s, 0.6, top + Lr - 0.55, 0.85, 'original\nlength', { h: 0.5, size: 10, italic: true, color: C.blue, align: 'left' });
    const cap = [['1 No load', C.ink], ['2 Load added:\nstretches', C.ink], ['3 Load removed:\nsame length', C.green], ['4 Overstretched,\nload removed:\nstays longer', C.red]];
    cap.forEach(([t, col], i) => label(s, xs[i] - 0.68, 4.3, 1.36, t, { h: 0.7, size: 10.5, bold: true, color: col, valign: 'top' }));
    box(s, 1.05, 5.05, 3.75, 0.55, 'E6F4EC', C.green, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 1.05, 5.05, 3.75, 'ELASTIC', { h: 0.55, bold: true, color: C.green, size: 12 });
    box(s, 4.9, 5.05, 1.3, 0.55, 'FBE9EA', C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.9, 5.05, 1.3, 'PLASTIC', { h: 0.55, bold: true, color: C.red, size: 12 });
  },
  head: 'Two kinds of deformation',
  lines: [
    '**Elastic deformation:** the object goes back to its **original shape and size** when the forces are removed (a spring or rubber band used gently).',
    '**Plastic deformation:** the object is **permanently** changed; it does **not** go back when the forces are removed (modelling clay, a bent paper clip).',
    'If a spring is stretched too far it passes its **elastic limit** and then deforms plastically.',
    'Test: remove the load and measure the length again.',
  ],
  worked: { head: 'Sort the examples', q: 'Decide whether each deformation is elastic or plastic.',
    steps: [['Trampoline', 'springs return to shape → **elastic**'], ['Crushed can', 'stays crushed → **plastic**'], ['Bow string', 'returns when released → **elastic**'], ['Answer', 'elastic = returns to shape; plastic = permanent change']] },
  qc: 'A car bumper dents in a crash and stays dented. Is this elastic or plastic deformation? Give a reason.',
  notes: 'QUICK CHECK ANSWER: Plastic – the bumper does not return to its original shape when the force is removed.\nOCR uses "elastic" and "plastic" deformation (students may also meet "inelastic" from other boards).',
}), 'P6.3.2 Elastic and plastic');

// ======================= 7 PARTICLE MODEL =======================
reg(D.contentSlide({
  title: 'The particle model of stretching',
  subtitle: `Specification ${sp('P6.3.2')} • forces between particles change when their separation changes`,
  tag: 'P6.3.2', caption: 'particles in a solid joined by forces, drawn as tiny springs (NOT to scale)',
  draw: (s, p) => {
    const r = 0.1, d0 = 0.42;
    const panelBox = (x, y, w, h, title, col) => {
      box(s, x, y, w, h, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      label(s, x, y + 0.04, w, title, { size: 11, bold: true, color: col });
    };
    // A normal
    panelBox(0.65, 1.45, 2.75, 2.15, 'A  No force', C.ink);
    lattice(s, 1.25, 2.05, 4, 3, d0, d0, { r });
    // B stretched
    panelBox(3.6, 1.45, 2.75, 2.15, 'B  Stretched', C.red);
    lattice(s, 4.05, 2.05, 4, 3, 0.56, d0, { r });
    forceArrow(s, 4.05 - r - 0.02, 2.47, 'left', 0.3, null, C.red, { width: 2.5 });
    forceArrow(s, 4.05 + 3 * 0.56 + r + 0.02, 2.47, 'right', 0.3, null, C.red, { width: 2.5 });
    label(s, 3.65, 3.25, 2.65, 'further apart: attraction pulls back', { size: 10, italic: true, color: C.red });
    // C compressed
    panelBox(0.65, 3.75, 2.75, 2.1, 'C  Compressed', C.blue);
    lattice(s, 1.37, 4.35, 4, 3, 0.335, d0, { r });
    forceArrow(s, 1.37 - r - 0.37, 4.77, 'right', 0.33, null, C.blue, { width: 2.5 });
    forceArrow(s, 1.37 + 3 * 0.335 + r + 0.37, 4.77, 'left', 0.33, null, C.blue, { width: 2.5 });
    label(s, 0.7, 5.55, 2.65, 'closer together: repulsion pushes back', { size: 10, italic: true, color: C.blue });
    // D plastic: top rows slipped by one spacing
    panelBox(3.6, 3.75, 2.75, 2.1, 'D  Plastic: layers slip', C.orange);
    lattice(s, 4.2, 4.35, 4, 3, d0, d0, { r, shift: [d0, d0, 0] });
    line(s, 3.85, 4.98, 6.2, 4.98, C.orange, 1.25, { dash: 'dash' });
    arrow(s, 4.0, 4.2, 4.42, 4.2, C.orange, 2);
    label(s, 3.65, 5.55, 2.65, 'new neighbours: stays deformed', { size: 10, italic: true, color: C.orange });
  },
  head: 'Explaining elastic and plastic',
  lines: [
    'Particles in a solid are held in place by **forces between them** (bonds).',
    '**Stretching** pulls particles slightly **further apart**: attractive forces pull them back. **Compressing** pushes them **closer**: repulsive forces push back.',
    '**Elastic:** remove the force and the particles **return** to their original positions.',
    '**Plastic:** a large force makes **layers of particles slide** to new positions. They bond to new neighbours, so they **stay** there.',
  ],
  size: 11,
  worked: { head: 'Use the model', q: 'Why does a stretched spring pull back on your hand?',
    steps: [['Stretch', 'the separation of the particles increases'], ['Forces', 'attraction between particles pulls them back together'], ['Spring', 'these forces add up along the spring'], ['Answer', 'the spring exerts a force back towards its original length']], size: 10.5 },
  qc: 'Use the particle model to explain why a paper clip stays bent after you bend it a long way.',
  notes: 'QUICK CHECK ANSWER: The large force made layers of particles slide past each other to new positions (1); the particles form bonds with new neighbours, so they do not return when the force is removed – plastic deformation (1).\nSpec link: the OCR B background to 6.3 says compressing or stretching changes the separation of the particles and the forces between them (docbrown J259/J260 extract). The "slip" picture is a simple model of plastic flow (dislocations are not required).',
}), 'P6.3.2 Particle model');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('P6.3.1')}–${sp('P6.3.2')} • forces and deformation`, [
  { q: 'Explain why **two** forces are needed to stretch an elastic band.', marks: 2, ms: 'One force alone gives a resultant force so the band accelerates/moves (1); two forces in opposite directions at different points stretch it / change its shape (1).' },
  { q: 'Describe the difference between **elastic** and **plastic** deformation. Give **one** example of each.', marks: 3, ms: 'Elastic: returns to original shape/length when the force is removed (1); plastic: permanent change / does not return (1); one correct example of each, e.g. spring used gently / modelling clay (1).' },
  { q: 'Use the particle model to explain why a stretched wire pulls back when it is stretched a small amount.', marks: 2, ms: 'Particles are pulled further apart / separation increases (1); attractive forces between particles pull them back towards their original positions (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 F = kx =======================
reg(D.contentSlide({
  title: 'Force and extension: F = k × x',
  subtitle: `Specification ${sp('P6.3.3')}, ${sp('P6.3.5')} • recall and apply the spring equation in linear cases`,
  tag: 'P6.3.5', caption: 'extension = new length − original length',
  draw: (s, p) => {
    box(s, 0.8, 1.55, 5.4, 0.12, '5A6275', null);
    const top = 1.67, L0d = 1.4, L1 = 2.5;
    spring(s, 1.9, top, L0d, { coils: 10 });
    spring(s, 4.3, top, L1, { coils: 10 }); const hb = massHanger(s, 4.3, top + L1, 3, { w: 0.5 });
    line(s, 1.0, top + L0d, 5.9, top + L0d, C.blue, 1, { dash: 'dash' });
    line(s, 3.6, top + L1, 5.9, top + L1, C.blue, 1, { dash: 'dash' });
    arrow(s, 1.3, top + 0.02, 1.3, top + L0d, C.blue, 1.5, { tail: true });
    label(s, 0.45, top + L0d / 2 - 0.3, 0.75, 'original\nlength', { h: 0.6, size: 10.5, color: C.blue, bold: true, align: 'right' });
    arrow(s, 5.55, top + L0d, 5.55, top + L1, C.red, 1.75, { tail: true });
    label(s, 5.62, top + (L0d + L1) / 2 - 0.15, 0.6, 'x', { size: 14, bold: true, color: C.red, align: 'left' });
    label(s, 4.95, top + L1 + 0.05, 1.3, 'extension', { size: 10.5, bold: true, color: C.red, align: 'right' });
    forceArrow(s, 4.3, hb + 0.05, 'down', 0.6, 'F (weight of load)', C.red, { lw: 1.8 });
    label(s, 1.2, 3.25, 1.4, 'no load', { size: 11, bold: true });
    eqBadge(s, 0.8, 4.35, 2.9, 'FKX');
  },
  head: 'The spring equation',
  lines: [
    `**F = k × x**  (${ST('FKX')}). F in N, x in **m**, k in **N/m**.`,
    '**Extension x** = new length − original length. Convert cm to m: ÷ 100.',
    'The **spring constant k** measures stiffness: a stiffer spring has a bigger k and needs more force for each metre of extension.',
    'It only works while F and x are **directly proportional** (a **linear** system).',
  ],
  worked: { head: 'Worked example', q: 'A 3.0 N force stretches a spring by 12 cm. Calculate the spring constant.',
    steps: ['F = k × x', 'k = F ÷ x', 'k = 3.0 N ÷ 0.12 m', `k = ${k9} N/m`] },
  qc: 'A spring has k = 40 N/m. What force stretches it by 5.0 cm? What extension would a 3.0 N force give?',
  notes: `QUICK CHECK ANSWER: F = 40 × 0.050 = ${qc9.toFixed(1)} N. x = F ÷ k = 3.0 ÷ 40 = 0.075 m (7.5 cm).\nF = k × x is a RECALL equation (national list: force exerted by a spring = extension × spring constant). Rearranging is expected at both tiers here because it is a simple two-term rearrangement.`,
}), 'P6.3.5 F = k × x');

// ======================= 10 LINEAR / NON-LINEAR =======================
const G10 = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 0.30, ymin: 0, ymax: 9, xstep: 0.05, ystep: 1, minor: 5, xlabel: 'extension / m', ylabel: 'force / N', fmt: v => v.toFixed(2), yfmt: v => String(v) };
reg(D.contentSlide({
  title: 'Linear and non-linear force–extension graphs',
  subtitle: `Specification ${sp('P6.3.3')}, ${sp('P6.3.4')} • the limit of proportionality`,
  tag: 'P6.3.4', caption: 'to scale: a spring with k = 40 N/m, and a rubber band (non-linear)',
  draw: (s, p) => {
    axes(s, G10);
    fnLine(s, G10, fR, 0, 0.27, 27, C.green, 2);
    fnLine(s, G10, fG, 0, xL, 6, C.blue, 2.5);
    fnLine(s, G10, fG, xL, 0.30, 30, C.red, 2.5);
    lop(s, G10, xL, FL);
    arrow(s, px(G10, xL) - 0.75, py(G10, FL) - 0.62, px(G10, xL) - 0.12, py(G10, FL) - 0.1, C.ink, 1.25);
    label(s, px(G10, xL) - 2.2, py(G10, FL) - 0.92, 1.95, 'limit of proportionality', { size: 10.5, bold: true, color: C.ink, align: 'right' });
    label(s, px(G10, 0.075), py(G10, 2.0), 1.2, 'linear', { size: 11, bold: true, color: C.blue, align: 'left' });
    label(s, px(G10, 0.21), py(G10, 7.95) + 0.12, 1.2, 'spring: curves', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, px(G10, 0.205), py(G10, 3.6), 1.1, 'rubber band', { size: 10.5, bold: true, color: C.green, align: 'left' });
  },
  head: 'Reading the graph',
  lines: [
    '**Linear:** a straight line through the origin, so **F ∝ x**. Double the force → double the extension.',
    'With force on the y-axis, the **gradient = spring constant k**.',
    '**Limit of proportionality:** the point beyond which F and x are no longer proportional; the line curves.',
    '**Non-linear:** equal force steps do not give equal extensions, so F = k × x does not apply. A rubber band is **elastic but non-linear**.',
  ],
  size: 11,
  worked: { head: 'Worked example: k from the graph', q: 'Use the straight part of the spring line.',
    steps: [['Read', 'at x = 0.10 m, F = 4.0 N'], ['Equation', 'k = F ÷ x (= gradient)'], ['Substitute', 'k = 4.0 N ÷ 0.10 m'], ['Answer', `k = ${kG} N/m`]] },
  qc: 'Use the graph: what force gives an extension of 0.05 m on the spring? What is the force at its limit of proportionality?',
  notes: `QUICK CHECK ANSWER: 2.0 N (F = 40 × 0.05); limit of proportionality at ${FL} N (x = ${xL} m).\nGraph drawn to scale: spring F = 40x to (0.15 m, 6.0 N), then curving (extension increases more for each extra newton). Rubber band drawn as F = 100x² (illustrative: real rubber is more complicated, but the key point is that it is elastic yet non-linear).\nThe limit of proportionality is not always the same point as the elastic limit (the spring can still be elastic a little beyond it).`,
}), 'P6.3.4 Linear and non-linear');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('P6.3.3')}–${sp('P6.3.5')} • F = k × x and force–extension graphs`, [
  { q: 'A force of **6.0 N** stretches a spring by **15 cm**. Calculate the spring constant. Give the unit.', marks: 3, ms: 'k = F ÷ x (1); = 6.0 ÷ 0.15 (1); = 40 N/m (1, unit needed).' },
  { q: 'Describe how a force–extension graph shows that a spring is **linear**, and how you would find the **limit of proportionality**.', marks: 2, ms: 'Straight line through the origin / F directly proportional to x (1); the limit of proportionality is where the line stops being straight / starts to curve (1).' },
  { q: 'A spring has a spring constant of **50 N/m**. Calculate its extension when a **2.0 N** force is applied. Give your answer in cm.', marks: 2, ms: 'x = F ÷ k = 2.0 ÷ 50 = 0.040 m (1); = 4.0 cm (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 ENERGY STORED =======================
const G12 = Object.assign({}, G10, { xmax: 0.20, ymax: 8 });
reg(D.contentSlide({
  title: 'Work done in stretching a spring',
  subtitle: `Specification ${sp('P6.3.6')}, ${sp('P6.3.7')} • energy stored = area under the force–extension graph`,
  tag: 'P6.3.6', caption: 'shaded area = work done = energy stored (k = 40 N/m)',
  draw: (s, p) => {
    axes(s, G12);
    areaTriangle(s, G12, 0.15, 6.0);
    plotLine(s, G12, [[0, 0], [0.15, 6.0]], C.blue, 2.5);
    line(s, px(G12, 0.15), py(G12, 6), px(G12, 0.15), py(G12, 0), C.ink, 1, { dash: 'dash' });
    label(s, px(G12, 0.085), py(G12, 1.6), 1.3, 'area = ½ × F × x', { size: 11, bold: true, color: C.orange, align: 'left' });
    label(s, px(G12, 0.15) + 0.05, py(G12, 6.3), 1.4, '(0.15 m, 6.0 N)', { size: 10.5, bold: true, color: C.blue, align: 'left' });
  },
  head: 'Energy stored in a stretched spring',
  lines: [
    'You do **work** to stretch a spring. If the deformation is **elastic**, the energy is stored in its **elastic energy store**, and is given back when it is released.',
    `**E = ½ × k × x²**  (${ST('EKX')}).`,
    'Work done = **area under the force–extension graph**. In the linear part this is a **triangle**: ½ × F × x.',
    'Why ½? The force rises from 0 to F, so the **average force** is ½F.',
  ],
  size: 11,
  worked: { head: 'Worked example', q: 'The spring (k = 40 N/m) is stretched by 0.15 m. Calculate the energy stored.',
    steps: [['Equation', 'E = ½ × k × x²'], ['Substitute', 'E = 0.5 × 40 × 0.15²'], ['Check', 'area = ½ × 6.0 N × 0.15 m'], ['Answer', `E = ${E12.toFixed(2)} J`]] },
  qc: 'A spring with k = 200 N/m is stretched by 5.0 cm. Calculate the energy stored.',
  notes: `QUICK CHECK ANSWER: E = 0.5 × 200 × 0.050² = ${qc12} J.\nCommon errors: forgetting to square x; squaring (k × x); leaving x in cm.\nE = ½kx² is GIVEN on the J260 equation sheet ("energy stored in a stretched spring = ½ × spring constant × (extension)²" appears on the OCR B data sheet in third-party copies of J259 papers). In P4.4 of this series elastic energy was left to P6.3.`,
}), 'P6.3.6–7 Energy stored');

// ======================= 13 STRETCH: rearranging & non-linear area =======================
reg(D.contentSlide({
  title: 'Energy beyond the limit of proportionality',
  subtitle: `Specification ${sp('P6.3.6')}, ${sp('P6.3.7')} • rearranging E = ½kx² and counting squares`,
  tag: 'P6.3.6 stretch', stretch: true, caption: 'area under the whole curve, estimated by counting squares',
  draw: (s, p) => {
    axes(s, G10);
    const n = 30; for (let i = 0; i < n; i++) { const xa = 0.30 * i / n, xb = 0.30 * (i + 1) / n, f = fG((xa + xb) / 2); box(s, px(G10, xa), py(G10, f), px(G10, xb) - px(G10, xa), py(G10, 0) - py(G10, f), 'F5A742', null, { tr: 60 }); }
    fnLine(s, G10, fG, 0, xL, 6, C.blue, 2.5);
    fnLine(s, G10, fG, xL, 0.30, 30, C.red, 2.5);
    box(s, px(G10, 0.0), py(G10, 9), px(G10, 0.05) - px(G10, 0.0), py(G10, 8) - py(G10, 9), null, C.ink, { lw: 1.5 });
    label(s, px(G10, 0.05) + 0.05, py(G10, 9) - 0.03, 2.4, '1 square = 0.05 m × 1 N = 0.05 J', { size: 10.5, bold: true, align: 'left' });
  },
  head: 'Two Grade 7–9 skills',
  lines: [
    '**Rearranging E = ½kx²:** x² = 2E ÷ k, so **x = √(2E ÷ k)**. Take the square root last.',
    'Beyond the limit of proportionality E = ½kx² does **not** apply: use the **area under the curve**.',
    `Count squares: about **${Math.round(nSq)} squares** × 0.05 J ≈ **${sf(areaCurve, 2)} J** up to 0.30 m.`,
    'Count part-squares as halves. State the value of one square first.',
  ],
  worked: { head: 'Worked example (rearranging)', q: 'A spring with k = 40 N/m stores 0.20 J. Calculate its extension.',
    steps: ['E = ½ × k × x²', 'x = √(2E ÷ k)', 'x = √(2 × 0.20 ÷ 40) = √0.010', `x = ${x13.toFixed(2)} m (10 cm)`] },
  qc: 'A spring with k = 50 N/m stores 1.0 J of energy. Calculate its extension.',
  notes: `QUICK CHECK ANSWER: x = √(2 × 1.0 ÷ 50) = √0.040 = ${qc13.toFixed(2)} m.\nArea under the curve computed numerically in node: ${areaCurve.toFixed(3)} J = ${nSq.toFixed(1)} squares of 0.05 J (accept 1.5–1.7 J). The linear part alone (to 0.15 m) is 0.45 J = 9 squares.\nNo P6.3 statement was found to be HT; this is extension material (spec: "calculate the work done ... by calculating the appropriate area on the force–extension graph" – the area method applies to non-linear systems too).`,
}), 'Stretch: rearranging and area');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('P6.3.6')}–${sp('P6.3.7')} • work done and energy stored`, [
  { q: 'A spring has a spring constant of **30 N/m**. It is stretched by **0.20 m**. Calculate the energy stored. Use E = ½ × k × x².', marks: 2, ms: 'E = 0.5 × 30 × 0.20² (1); = 0.60 J (1).' },
  { q: 'A force–extension graph is a straight line from the origin to **4.0 N** at **0.080 m**. Use the graph to calculate the work done stretching the spring.', marks: 2, ms: 'Area of triangle = ½ × 4.0 × 0.080 (1); = 0.16 J (1).' },
  { q: '**Stretch:** a spring with spring constant **50 N/m** stores **0.36 J**. Calculate its extension.', marks: 3, ms: 'x² = 2E ÷ k (1); = 2 × 0.36 ÷ 50 = 0.0144 (1); x = 0.12 m (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 PAG P2 METHOD =======================
reg(D.contentSlide({
  title: 'PAG P2: force and extension of a spring',
  subtitle: `Specification ${sp('P6.3.3')} • apparatus and method`,
  tag: 'PAG P2', pag: 'PAG P2', caption: 'clamp stand, spring, metre rule, pointer and slotted masses',
  draw: (s, p) => {
    box(s, 0.65, 5.55, 5.7, 0.08, 'B0B7C6', null);
    clampStand(s, 1.4, 5.55, 4.0, 3.55, 1.85);
    box(s, 1.31, 4.85, 0.18, 0.16, '4A5262', '4A5262'); box(s, 1.4, 4.9, 2.6, 0.06, '8C96A8', '6B7385');
    ruler(s, 4.0, 2.2, 30, 0.105);
    spring(s, 3.55, 1.88, 1.35, { coils: 10, width: 0.3 });
    line(s, 3.55, 3.23, 4.05, 3.23, C.red, 2);
    massHanger(s, 3.55, 3.23, 4, { w: 0.5 });
    box(s, 0.75, 5.35, 0.35, 0.2, '4A5262', null);
    const L = (x, y, x2, y2, t, w) => { line(s, x, y, x2, y2, C.grey, 0.75); label(s, x2 + 0.05, y2 - 0.14, w, t, { size: 10.5, bold: true, align: 'left', color: C.ink }); };
    L(3.7, 2.4, 5.0, 1.95, 'spring', 1.0);
    L(4.36, 3.5, 5.0, 3.0, 'metre rule', 1.2);
    L(4.05, 3.23, 5.0, 3.45, 'pointer', 1.0);
    L(3.85, 3.8, 5.0, 4.15, 'slotted masses', 1.3);
    L(1.4, 3.9, 2.3, 3.6, 'clamp stand', 1.3);
    L(0.92, 5.4, 1.6, 5.2, 'G-clamp', 1.0);
  },
  head: 'Method',
  lines: [
    'Clamp the spring and a vertical metre rule to the stand. Fix a **pointer** to the bottom of the spring.',
    'Record the pointer reading with no load: the **original length**.',
    'Add a **100 g** mass (weight **1.0 N**). Read the new length with your **eye level** with the pointer.',
    'Repeat, adding 1.0 N each time, up to 7 N. **Extension** = length − original length.',
    'Unload one mass at a time to check the spring returns to its original length (elastic).',
    'Plot **force (y-axis) against extension (x-axis)** and draw a line of best fit.',
  ],
  size: 11,
  worked: { head: 'Tips for accurate results', q: '',
    steps: [['Zero', 'measure the original length **before** loading'], ['Eye level', 'avoids parallax error'], ['Wait', 'let the spring stop bouncing before reading'], ['Answer', 'check the rule is vertical with a set square']], size: 10.5 },
  workedH: 2.0,
  qc: 'A 100 g mass is added each time. Show that each mass adds a force of 1.0 N. (g = 10 N/kg)',
  notes: 'QUICK CHECK ANSWER: W = m × g = 0.100 kg × 10 N/kg = 1.0 N.\nEquipment: clamp stand, two bosses and clamps, G-clamp, spring, metre rule, pointer (e.g. a splint taped to the spring), 100 g mass hanger and slotted masses, safety goggles.\nPAG P2 (OCR Forces group): "Investigating the effect of forces on springs" (PMT OCR B PAG 2 notes, search extract). OCR\'s second suggested activity (determining the work done in stretching safely) is covered by the graph-area analysis on the next slides.',
}), 'PAG P2: apparatus and method');

// ======================= 16 PAG P2 VARIABLES & SAFETY =======================
reg(D.contentSlide({
  title: 'PAG P2: variables and safety',
  subtitle: `Specification ${sp('P6.3.3')} • planning a fair test`,
  tag: 'PAG P2', pag: 'PAG P2', caption: 'what you change, measure and keep the same',
  draw: (s, p) => {
    const bx = (y, col, head, body) => {
      box(s, 0.75, y, 5.5, 1.15, C.white, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
      box(s, 0.75, y, 0.12, 1.15, col, null);
      s.addText([{ text: head, options: { bold: true, color: col, fontSize: 12.5, breakLine: true } }, ...T.rich(body, { fontSize: 11.5, color: C.text })], { x: 1.0, y: y + 0.06, w: 5.1, h: 1.03, fontFace: 'Calibri', valign: 'middle', margin: 0 });
    };
    bx(1.5, C.blue, 'Independent variable (you change)', '**force** on the spring (weight of the masses, N)');
    arrow(s, 3.5, 2.67, 3.5, 2.93, C.grey, 2);
    bx(2.95, C.red, 'Dependent variable (you measure)', '**extension** of the spring (m), from the length readings');
    arrow(s, 3.5, 4.12, 3.5, 4.38, C.grey, 2);
    bx(4.4, C.green, 'Control variables (keep the same)', 'the **same spring** • rule fixed in the same place • same size of mass steps');
  },
  head: 'Analysis plan',
  lines: [
    'Find **k** from the **gradient** of the straight part of the graph.',
    'Find the **work done** from the **area under the graph** (or E = ½kx² in the linear part).',
    'Mark the **limit of proportionality**, where the line starts to curve.',
  ],
  worked: { head: 'Safety', q: 'Hazard → risk → control',
    steps: [['Masses', 'could fall on feet → keep feet clear; tray or cushion below'], ['Spring', 'could snap back into eyes → wear **safety goggles**'], ['Stand', 'could topple → clamp it to the bench with a G-clamp'], ['Answer', 'do not overload: stop when the spring stays stretched']], size: 10.5 },
  workedH: 2.55,
  qc: 'Name the independent variable and the dependent variable in this investigation.',
  notes: 'QUICK CHECK ANSWER: Independent = force (weight added); dependent = extension.\nControl: same spring (same material, coil diameter, number of coils), same temperature, rule kept vertical and fixed.',
}), 'PAG P2: variables and safety');

// ======================= 17 PAG P2 RESULTS =======================
const GP = { x: 1.45, y: 1.55, w: 4.8, h: 3.6, xmin: 0, xmax: 0.40, ymin: 0, ymax: 8, xstep: 0.05, ystep: 1, minor: 5, xlabel: 'extension / m', ylabel: 'force / N', fmt: v => v.toFixed(2), yfmt: v => String(v) };
{
  const s = D.contentHeader('PAG P2: results and graph', `Specification ${sp('P6.3.3')}, ${sp('P6.3.4')} • sample results for one spring (g = 10 N/kg)`, { pag: 'PAG P2', tag: 'PAG P2' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'sample data plotted to scale; best-fit line through the linear points');
  axes(s, GP);
  points(s, GP, pX.map((x, i) => [x / 100, pF[i]]));
  plotLine(s, GP, [[0, 0], [0.30, 6]], C.blue, 2);
  plotLine(s, GP, [[0.30, 6], [0.32, 6.4], [0.345, 6.75], [0.375, 7.0]], C.red, 2);
  lop(s, GP, 0.30, 6);
  label(s, px(GP, 0.305), py(GP, 4.5), 1.3, 'limit of\nproportionality', { h: 0.45, size: 10.5, bold: true, align: 'left' });
  arrow(s, px(GP, 0.315), py(GP, 4.75), px(GP, 0.30) + 0.05, py(GP, 6) + 0.1, C.ink, 1);
  const head = ['Force / N', 'Length / cm', 'Extension / cm', 'Extension / m'].map(HDR);
  const rows = [head, ...pF.map((f, i) => [f.toFixed(1), pL[i].toFixed(1), pX[i].toFixed(1), (pX[i] / 100).toFixed(3)].map((t, j) => ({ text: t, options: { fill: { color: i === 7 ? 'FBE9EA' : (i % 2 ? C.white : C.cardBlue) }, color: i === 7 ? C.red : C.text, bold: j === 0 } })))];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.4, 1.5, 1.6, 1.58], rowH: 0.36, fontFace: 'Calibri', fontSize: 11.5, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 6.8, 4.68, 6.08, 1.57, 'What the results show', [
    'Up to **6.0 N** the points lie on a straight line through the origin: F ∝ x (linear).',
    'The **7.0 N** point (red) is well off the line: the spring is past its limit of proportionality.',
    `Original length = ${L0.toFixed(1)} cm. Each extension = length − ${L0.toFixed(1)} cm.`,
  ], { size: 11 });
  D.quickCheck(s, 'Use the table: what is the extension, in metres, when the force is 4.0 N? Does F = k × x with k = 20 N/m fit this point?');
  D.notes(s, `QUICK CHECK ANSWER: 25.1 − 5.0 = 20.1 cm = 0.201 m; yes: 20 × 0.201 = 4.0 N (to 2 s.f.).\nSample data: lengths ${pL.join(', ')} cm for 0–7 N. Extensions ${pX.join(', ')} cm. Least-squares gradient through the origin for 0–6 N = ${kLS.toFixed(2)} N/m (node). Plotted to scale with force on the y-axis.`);
  reg(s, 'PAG P2: results and graph');
}

// ======================= 18 PAG P2 k AND WORK DONE =======================
reg(D.contentSlide({
  title: 'PAG P2: spring constant and work done',
  subtitle: `Specification ${sp('P6.3.5')}, ${sp('P6.3.6')} • analysing the graph`,
  tag: 'PAG P2', pag: 'PAG P2', caption: 'gradient triangle and shaded area on the best-fit line',
  draw: (s, p) => {
    axes(s, GP);
    areaTriangle(s, GP, 0.30, 6, 'F5A742', 60);
    plotLine(s, GP, [[0, 0], [0.30, 6]], C.blue, 2.5);
    points(s, GP, pX.slice(0, 7).map((x, i) => [x / 100, pF[i]]));
    line(s, px(GP, 0.05), py(GP, 1), px(GP, 0.30), py(GP, 1), C.red, 1.5, { dash: 'dash' });
    line(s, px(GP, 0.30), py(GP, 1), px(GP, 0.30), py(GP, 6), C.red, 1.5, { dash: 'dash' });
    label(s, px(GP, 0.12), py(GP, 1) + 0.03, 1.6, 'Δx = 0.25 m', { size: 10.5, bold: true, color: C.red });
    label(s, px(GP, 0.30) + 0.05, py(GP, 3.6), 1.2, 'ΔF = 5.0 N', { size: 10.5, bold: true, color: C.red, align: 'left' });
    label(s, px(GP, 0.155), py(GP, 2.0), 1.5, 'area = work done', { size: 10.5, bold: true, color: C.orange, align: 'left' });
  },
  head: 'Finding k and the work done',
  lines: [
    '**k = gradient** = ΔF ÷ Δx. Use a **large** triangle on the line of best fit, not two data points.',
    `Gradient = 5.0 N ÷ 0.25 m = **${kGrad} N/m**.`,
    '**Work done** stretching the spring to 6.0 N = area under the line = ½ × 6.0 N × 0.30 m.',
  ],
  worked: { head: 'Worked example: work done', q: 'Calculate the energy stored when the spring (k = 20 N/m) is stretched by 0.30 m.',
    steps: [['Equation', 'E = ½ × k × x²'], ['Substitute', 'E = 0.5 × 20 × 0.30²'], ['Check', `area = ½ × 6.0 × 0.30 = ${Wp.toFixed(2)} J ✓`], ['Answer', `E = ${Wp.toFixed(2)} J`]] },
  workedH: 2.25,
  qc: 'Calculate the work done when the same spring is stretched to an extension of 0.20 m.',
  notes: `QUICK CHECK ANSWER: E = 0.5 × 20 × 0.20² = ${qcP.toFixed(2)} J (or area ½ × 4.0 × 0.20 = 0.40 J).\nGradient triangle from (0.05 m, 1.0 N) to (0.30 m, 6.0 N) on the best-fit line.`,
}), 'PAG P2: k and work done');

// ======================= 19 PAG P2 ERRORS =======================
reg(D.contentSlide({
  title: 'PAG P2: errors and improvements',
  subtitle: `Specification ${sp('P6.3.3')} • evaluating the method`,
  tag: 'PAG P2', pag: 'PAG P2', caption: 'parallax: the reading depends on where your eye is',
  draw: (s, p) => {
    ruler(s, 3.2, 1.7, 30, 0.115, { major: 5 });
    line(s, 2.3, 3.4, 3.55, 3.4, C.red, 2.5); label(s, 1.3, 3.27, 1.0, 'pointer', { size: 10.5, bold: true, color: C.red, align: 'right' });
    eye(s, 5.3, 2.2, C.red, 'too high'); line(s, 5.08, 2.2, 3.2, 3.68, C.red, 1, { dash: 'dash' });
    eye(s, 5.3, 3.4, C.green, 'eye level ✓'); line(s, 5.08, 3.4, 3.55, 3.4, C.green, 1, { dash: 'dash' });
    eye(s, 5.3, 4.6, C.red, 'too low'); line(s, 5.08, 4.6, 3.2, 3.12, C.red, 1, { dash: 'dash' });
  },
  head: 'Sources of error',
  lines: [
    '**Parallax error:** reading from above or below → read at eye level, with the pointer close to the rule.',
    '**Rule not vertical** → check with a set square or plumb line.',
    '**Spring still bouncing** → wait until it is still before reading.',
    '**Zero error:** measure extension from the unloaded length, not from 0 on the rule.',
    '**Overloading** past the elastic limit stretches the spring for good, so later results cannot be repeated.',
  ],
  size: 11,
  worked: { head: 'Improving the investigation', q: '',
    steps: [['Repeat', 'read while loading and unloading; calculate a mean'], ['Range', 'use smaller force steps near the limit of proportionality'], ['Precision', 'use a rule with mm marks and a fine pointer'], ['Answer', 'more points → a more reliable gradient (k)']], size: 10.5 },
  qc: 'A student plots force against **length** instead of extension. How would the graph look?',
  notes: 'QUICK CHECK ANSWER: Still a straight line (in the linear region) with the same gradient, but it would NOT pass through the origin – it would cross the length axis at the original length (5.0 cm).',
}), 'PAG P2: errors and improvements');

// ======================= 20 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('P6.3.3')}–${sp('P6.3.6')} • PAG P2 springs`, [
  { q: 'In the spring investigation, name the **independent** variable, the **dependent** variable and **one control** variable.', marks: 3, ms: 'IV: force/weight/mass added (1); DV: extension (1); CV: same spring / same original length / same temperature (1).' },
  { q: 'Explain why the student reads the metre rule with their eye level with the pointer.', marks: 1, ms: 'To avoid parallax error (so the readings are accurate) (1).' },
  { q: 'On a student\'s graph, a force of **4.0 N** gives an extension of **0.16 m** in the linear region. Calculate the spring constant **and** the work done stretching the spring to this extension.', marks: 4, ms: 'k = 4.0 ÷ 0.16 (1) = 25 N/m (1); work done = ½ × 4.0 × 0.16 or ½ × 25 × 0.16² (1) = 0.32 J (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Deformation', 'A change of shape: stretching, compressing, bending or twisting.'],
  ['Stretching', 'Pulling an object longer: needs forces pulling in opposite directions.'],
  ['Compressing', 'Squashing an object shorter: needs forces pushing towards each other.'],
  ['Bending', 'Changing shape with forces in more than one place, e.g. push + two supports.'],
  ['Elastic deformation', 'The object returns to its original shape when the forces are removed.'],
  ['Plastic deformation', 'A permanent change of shape: it does not return when forces are removed.'],
  ['Elastic limit', 'The largest force for which deformation is still elastic.'],
  ['Particle model', 'Stretching or compressing changes particle separation and the forces between them.'],
  ['Extension (x)', 'New length − original length, in m.'],
  ['Spring constant (k)', 'Force per metre of extension (N/m); a stiffer spring has a bigger k.'],
  ['Linear', 'F ∝ x: a straight line through the origin on a force–extension graph.'],
  ['Non-linear', 'Force and extension not proportional: the graph is curved.'],
  ['Limit of proportionality', 'The point beyond which F and x are no longer proportional.'],
  ['Work done', 'Energy transferred by a force; area under the force–extension graph.'],
  ['Elastic energy store', 'Energy stored in a stretched or compressed object: E = ½kx².'],
  ['Parallax error', 'A reading error from not having your eye level with the pointer.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= EQUATIONS SUMMARY =======================
reg(D.equationsSlide([['FKX', 'P6.3.5'], ['EKX', 'P6.3.7'], ['WMG', 'PAG P2'], ['WFD', 'P6.3.6']], {
  subtitle: 'Recall or given? Check against the J260 equation sheet',
  qc: 'Which equation for springs must you learn by heart? Which one can you look up on the equation sheet?',
  notes: 'QUICK CHECK ANSWER: Learn F = k × x (and W = m × g, W = F × d). E = ½ × k × x² is given on the sheet.\nStatus follows the GCSE subject content equation lists used by J260 (force exerted by a spring = extension × spring constant is recall; energy stored in a stretched spring = ½ × k × x² is on the sheet; third-party copies of J259 papers show it on the OCR B data sheet). UNVERIFIED against the current J260 equation sheet wording: check before printing.',
}), 'Summary: equations');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student hangs a spring from a clamp. With no load its length is **8.0 cm**. With a load of weight **3.0 N** its length is **20.0 cm**. The spring is still elastic and obeys F = k × x. (g = 10 N/kg)', [
  { l: 'a', q: 'Explain why the clamp must exert a force on the spring for it to stretch.', marks: 2, ms: 'Stretching needs more than one force / two forces in opposite directions (1); without the clamp\'s upward force the resultant force would make the spring and load accelerate/fall rather than stretch (1).' },
  { l: 'b', q: 'Calculate the extension in metres, and the spring constant of the spring.', marks: 3, ms: 'x = 20.0 − 8.0 = 12.0 cm = 0.12 m (1); k = F ÷ x = 3.0 ÷ 0.12 (1); = 25 N/m (1).' },
  { l: 'c', q: 'Calculate the energy stored in the spring. Use E = ½ × k × x².', marks: 2, ms: 'E = 0.5 × 25 × 0.12² (1); = 0.18 J (1). ECF from (b).' },
  { l: 'd', q: 'Calculate the mass of the load.', marks: 1, ms: 'm = W ÷ g = 3.0 ÷ 10 = 0.30 kg (1).' },
  { l: 'e', q: 'The student adds much more load. When the load is removed, the spring is **10.5 cm** long. Name this type of deformation and explain it using the particle model.', marks: 3, ms: 'Plastic deformation (1); layers of particles have slid / moved to new positions (1); bonds formed with new neighbours so particles do not return to original positions (1).', h: 1.35 },
  { l: 'f', q: 'Describe how a force–extension graph for this spring would show the point where it stopped obeying F = k × x.', marks: 2, ms: 'Straight line through origin at first (1); the line curves / stops being straight at the limit of proportionality (1).' },
], 13, { subtitle: `Specification ${sp('P6.3.1')}–${sp('P6.3.7')} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the type of deformation where an object returns to its original shape when the forces are removed.', marks: 1, ms: 'Elastic (deformation) (1).' },
  { n: '2', q: 'A spring has a spring constant of **80 N/m**. Calculate the force needed to stretch it by **5.0 cm**.', marks: 2, ms: 'F = k × x = 80 × 0.050 (1); = 4.0 N (1).' },
  { n: '3', q: 'Calculate the energy stored in the spring in Q2. Use E = ½ × k × x².', marks: 2, ms: 'E = 0.5 × 80 × 0.050² (1); = 0.10 J (1).' },
  { n: '4', q: 'Describe the difference between a **linear** and a **non-linear** force–extension relationship.', marks: 2, ms: 'Linear: force directly proportional to extension / straight line through the origin (1); non-linear: not proportional / curved graph, e.g. rubber band or a spring beyond its limit of proportionality (1).' },
  { n: '5', q: 'Use the particle model to explain why **plastic** deformation is permanent.', marks: 2, ms: 'Layers of particles slide to new positions (1); they bond to new neighbours, so they do not return when the force is removed (1).' },
  { n: '6', q: '**Stretch:** **5.0 J** of work stretches a spring by **0.20 m**. Calculate the spring constant.', marks: 2, ms: 'k = 2E ÷ x² = 2 × 5.0 ÷ 0.20² (1); = 250 N/m (1).' },
  { n: '7', q: 'Describe how a student could investigate how the extension of a spring depends on the force applied. Include the equipment, the measurements, how to use a graph to find the spring constant and the energy stored, and one safety precaution.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Equipment: clamp stand, boss and clamp, spring, metre rule (clamped vertically), pointer, 100 g mass hanger and slotted masses, G-clamp, goggles.',
    'Measure the original (unloaded) length of the spring from the pointer reading.',
    'Add masses in equal steps (e.g. 100 g = 1.0 N); read the new length each time at eye level; wait for the spring to stop moving.',
    'Extension = new length − original length; convert to m; weight W = m × g.',
    'Plot force (y-axis) against extension (x-axis); draw a line of best fit.',
    'Spring constant k = gradient of the straight (linear) part; limit of proportionality where the line curves.',
    'Energy stored / work done = area under the graph (½ × F × x) or E = ½kx² in the linear part.',
    'Safety: goggles in case the spring snaps; keep feet clear / tray under the masses; G-clamp the stand so it does not topple.',
  ], {
    l3: 'Describes a full method including the measurements AND explains how to use the graph to find k AND the energy stored, AND gives a safety precaution.',
    l2: 'Describes a method with most measurements AND EITHER how to find k OR how to find the energy from the graph.',
    l1: 'Gives a simple description of adding masses and measuring the spring OR names some equipment.',
  });
}
D.homework('All students answer all questions. Q6 is a stretch calculation.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 8);
const out = path.join(__dirname, 'OCR21C_P6.3_MaterialsUnderStress_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
