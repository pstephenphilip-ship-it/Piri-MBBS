// build_C5_1.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C5 Chemical analysis, C5.1 How are chemicals separated and tested for purity?
// (one deck, Higher & Foundation; Part 1 of 3)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C5_1.js
// Structure copied from build_C4_4.js (approved). ocr_chem_template.js is NOT edited: beaker, flasks, funnel,
// condenser, thermometer, Bunsen, evaporating basin, chromatogram and equation-balance helpers are in the
// DECK-SPECIFIC block below.
// Scope (see SPEC_C5_1.md): J260 C5.1 = J258 C5.1 (C5.1.1–C5.1.8). Taught: purity (scientific vs everyday),
// formulations, melting point as a purity test, chromatography (phases, Rf, solvents, locating agents),
// filtration, crystallisation, simple and fractional distillation, choosing a purification method.
// Practicals: PAG C3 separation techniques (chromatography), PAG C2 distillation, PAG C4 production of salts.
// Moles, concentration and titration are C5.2 / C5.3 (other decks): NOT taught here.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C5', chapterTitle: 'Chemical analysis', code: 'C5.1', title: 'How are chemicals separated and tested for purity?',
  part: 1, parts: 3, specRange: 'C5.1.1–C5.1.8',
  subtitle: 'How are chemicals separated and tested for purity?',
  keywords: ['Purity', 'Formulations', 'Chromatography', 'Filtration', 'Crystallisation', 'Distillation'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const f2 = v => v.toFixed(2);

// ======================= EQUATIONS: atom and charge balance (asserted) =======================
function parseFormula(f) {
  let charge = 0;
  if (f === 'e-') return { atoms: {}, charge: -1 };
  const m = f.match(/^(.*?)(\d*)([+-])$/);
  let body = f;
  if (m) { body = m[1]; charge = (m[3] === '+' ? 1 : -1) * (m[2] ? +m[2] : 1); }
  const stack = [{}];
  const tokens = body.match(/([A-Z][a-z]?|\(|\)|\d+)/g) || [];
  let lastAdded = null;
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (t === '(') { stack.push({}); lastAdded = null; }
    else if (t === ')') {
      const grp = stack.pop(); let n = 1;
      if (tokens[i + 1] && /^\d+$/.test(tokens[i + 1])) n = +tokens[++i];
      for (const [k, v] of Object.entries(grp)) stack[stack.length - 1][k] = (stack[stack.length - 1][k] || 0) + v * n;
      lastAdded = null;
    } else if (/^\d+$/.test(t)) stack[stack.length - 1][lastAdded] += +t - 1;
    else { stack[stack.length - 1][t] = (stack[stack.length - 1][t] || 0) + 1; lastAdded = t; }
  }
  return { atoms: stack[0], charge };
}
function side(terms) {
  const tot = { atoms: {}, charge: 0 };
  terms.forEach(([n, f]) => { const p = parseFormula(f); tot.charge += n * p.charge; for (const [k, v] of Object.entries(p.atoms)) tot.atoms[k] = (tot.atoms[k] || 0) + n * v; });
  return tot;
}
const EQN = [];
function balanced(name, lhs, rhs) {
  const a = side(lhs), b = side(rhs);
  assert.deepStrictEqual(Object.keys(a.atoms).sort().map(k => [k, a.atoms[k]]), Object.keys(b.atoms).sort().map(k => [k, b.atoms[k]]), `atoms not balanced: ${name}`);
  assert.strictEqual(a.charge, b.charge, `charge not balanced: ${name}`);
  EQN.push(name);
}
balanced('CuO + H2SO4 → CuSO4 + H2O', [[1, 'CuO'], [1, 'H2SO4']], [[1, 'CuSO4'], [1, 'H2O']]);
balanced('CuSO4 + 5H2O → CuSO4·5H2O (crystals)', [[1, 'CuSO4'], [5, 'H2O']], [[1, 'CuSO4(H2O)5']]);
balanced('CuSO4·5H2O → CuSO4 + 5H2O (heating to dryness)', [[1, 'CuSO4(H2O)5']], [[1, 'CuSO4'], [5, 'H2O']]);
balanced('CuCO3 + H2SO4 → CuSO4 + H2O + CO2 (alternative base)', [[1, 'CuCO3'], [1, 'H2SO4']], [[1, 'CuSO4'], [1, 'H2O'], [1, 'CO2']]);
balanced('R6 Q3 CuO + H2SO4', [[1, 'CuO'], [1, 'H2SO4']], [[1, 'CuSO4'], [1, 'H2O']]);
balanced('starter: NaCl ions Na+ + Cl-', [[1, 'Na+'], [1, 'Cl-']], [[1, 'NaCl']]);
assert.throws(() => balanced('unbalanced test', [[1, 'CuSO4'], [4, 'H2O']], [[1, 'CuSO4(H2O)5']]));
assert.throws(() => balanced('unbalanced charge', [[1, 'Cu2+'], [1, 'e-']], [[1, 'Cu']]));

// ======================= CALCULATIONS (asserted) =======================
// slide 5: paint formulation (illustrative % by mass)
const PAINT = [['binder', 40, '6A3FA0'], ['pigment', 25, 'E39A2F'], ['solvent', 30, '5B9BD5'], ['additives', 5, '2E8B57']];
calc('paint % total', PAINT.reduce((a, p) => a + p[1], 0), 100);
calc('binder in 250 g', 40 / 100 * 250, 100, 1e-9);
calc('pigment in 250 g', 0.25 * 250, 62.5, 1e-9);
calc('QC medicine 2.5% of 400 g', 0.025 * 400, 10, 1e-9);
// slide 6: melting
calc('impure range 119 − 115', 119 - 115, 4);
calc('impure lowered by at least 122 − 119', 122 - 119, 3);
// slide 9: chromatogram (solvent front 8.0 cm)
const FRONT = 8.0;
const REF = { A: 2.4, B: 4.8, C: 5.6, D: 6.8 };
const RF = {}; for (const [k, d] of Object.entries(REF)) RF[k] = d / FRONT;
calc('Rf A 2.4/8.0', RF.A, 0.30, 1e-9); calc('Rf B 4.8/8.0', RF.B, 0.60, 1e-9); calc('Rf C 5.6/8.0', RF.C, 0.70, 1e-9); calc('Rf D 6.8/8.0', RF.D, 0.85, 1e-9);
const XSPOTS = [2.4, 4.8, 6.8];
XSPOTS.forEach(d => assert(Object.values(REF).includes(d), 'X spot matches a reference'));
calc('QC Rf 3.1/6.2', 3.1 / 6.2, 0.5, 1e-9);
// slide 10: amino acids
calc('amino Rf 1.8/6.0', 1.8 / 6.0, 0.30, 1e-9); calc('amino Rf 3.6/6.0', 3.6 / 6.0, 0.60, 1e-9);
// slide 13: PAG C3 results (illustrative)
const SF = [2.0, 4.0, 6.0, 8.0], RED = [1.2, 2.5, 3.5, 4.8], YEL = [0.6, 1.1, 1.8, 2.4];
for (let i = 0; i < 4; i++) { assert(Math.abs(RED[i] / SF[i] - 0.6) <= 0.03 + 1e-9, 'red ≈ 0.6'); assert(Math.abs(YEL[i] / SF[i] - 0.3) <= 0.03 + 1e-9, 'yellow ≈ 0.3'); }
calc('red Rf 4.8/8.0', 4.8 / 8.0, 0.60, 1e-9);
calc('yellow Rf 2.4/8.0', 2.4 / 8.0, 0.30, 1e-9);
calc('QC red at 5.0 cm front', 0.60 * 5.0, 3.0, 1e-9);
calc('R3 Q4 0.30 × 7.0', 0.30 * 7.0, 2.1, 1e-9);
// slide 15: rock salt
calc('rock salt lost 10.0 − 6.2 − 3.6', 10.0 - 6.2 - 3.6, 0.2, 1e-9);
calc('rock salt % salt', 3.6 / 10.0 * 100, 36, 1e-9);
calc('QC 8.0/25.0 %', 8.0 / 25.0 * 100, 32, 1e-9);
// slide 16: sea water
calc('sea water salt 3.5% of 200 g', 0.035 * 200, 7.0, 1e-9);
calc('sea water water 200 − 7.0', 200 - 7.0, 193, 1e-9);
// slide 20: PAG C2 fractional distillation of 50 cm³ ethanol–water (illustrative)
const VOL = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20], TEMP = [78, 78, 79, 79, 80, 80, 82, 88, 95, 99, 100];
for (let i = 1; i < TEMP.length; i++) assert(TEMP[i] >= TEMP[i - 1], 'temperature never falls');
calc('fraction 1 volume (T ≤ 82 °C)', VOL[TEMP.findIndex(t => t > 82) - 1], 12);
calc('fraction 1 % of 50 cm³', 12 / 50 * 100, 24, 1e-9);
// slides 22–23: PAG C4 copper sulfate (illustrative)
calc('CuO reacted 2.50 − 0.51', 2.50 - 0.51, 1.99, 1e-9);
const SOL = [[0, 14.3], [20, 20.7], [40, 28.5], [60, 40.0], [80, 55.0], [100, 75.4]]; // g CuSO4 per 100 g water (approx. data-book)
calc('crystallises 80 → 20 °C', 55.0 - 20.7, 34.3, 1e-9);
calc('QC crystallises 100 → 20 °C', 75.4 - 20.7, 54.7, 1e-9);
calc('R6 Q4 60 → 20 °C', 40.0 - 20.7, 19.3, 1e-9);
// recaps, FQ, HW
calc('R2 Q2 4.2/6.0', 4.2 / 6.0, 0.70, 1e-9);
calc('FQ (b) 3.0/7.5', 3.0 / 7.5, 0.40, 1e-9);
calc('FQ (e) 801 − 795', 801 - 795, 6);
calc('HW Q2 2.7/9.0', 2.7 / 9.0, 0.30, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_chem_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' },
    line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), ...(o.open ? [] : [{ close: true }])],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle', align: o.align });
}
function eqn(s, x, y, w, t, o = {}) {
  box(s, x, y, w, o.h || 0.42, o.fill || C.white, o.edge || C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, x + 0.08, y, w - 0.16, t, { size: o.size || 12, h: o.h || 0.42, color: C.ink, bold: true });
}
const GLASS = 'EEF5FB', WAT = ['CFE4F7', '5B9BD5'], SALTW = 'DCEBF5', CUSO4 = ['7FB8E6', '2F6FA8'], CUO = '2B2B2B', SAND = ['D9B77A', '9A7A3A'], ETH = 'E8F1D6', PENCIL = '555555';
// labelled pointer: text box with a thin line to (tx, ty)
function callout(s, x, y, w, t, tx, ty, o = {}) {
  label(s, x, y, w, t, { size: o.size || 10, h: o.h || 0.24, align: o.align || 'left', color: o.color || C.text, bold: o.bold, valign: 'middle' });
  const ax = o.align === 'right' ? x + w + 0.03 : x - 0.03, ay = y + (o.h || 0.24) / 2;
  line(s, ax, ay, tx, ty, o.lc || '8A8F99', 0.75);
}
// beaker: open top at y, liquid level as a fraction of h
function beaker(s, x, y, w, h, level = 0, liq = WAT[0], o = {}) {
  box(s, x, y, w, h, GLASS, null);
  if (level) box(s, x, y + h - level * h, w, level * h, liq, null);
  if (level) line(s, x, y + h - level * h, x + w, y + h - level * h, o.surface || WAT[1], 1);
  line(s, x, y, x, y + h, C.ink, 1.5); line(s, x + w, y, x + w, y + h, C.ink, 1.5); line(s, x, y + h, x + w, y + h, C.ink, 1.5);
  line(s, x - 0.06, y, x, y, C.ink, 1.5); line(s, x + w, y, x + w + 0.06, y, C.ink, 1.5);
}
// conical flask: neck top at (cx, top), base width w, total height h; level = fraction of the cone height
function conical(s, cx, top, w, h, level = 0, liq = WAT[0]) {
  const nw = Math.min(0.32, w * 0.3), nh = h * 0.3;
  const pts = [[cx - nw / 2, top], [cx - nw / 2, top + nh], [cx - w / 2, top + h], [cx + w / 2, top + h], [cx + nw / 2, top + nh], [cx + nw / 2, top]];
  poly(s, pts, GLASS, null);
  if (level) {
    const ch = h - nh, yl = top + h - level * ch, hw = nw / 2 + (w / 2 - nw / 2) * ((yl - top - nh) / ch);
    poly(s, [[cx - hw, yl], [cx - w / 2, top + h], [cx + w / 2, top + h], [cx + hw, yl]], liq, null);
    line(s, cx - hw, yl, cx + hw, yl, WAT[1], 1);
  }
  poly(s, pts, null, C.ink, { open: true, lw: 1.5 });
}
// round-bottomed flask: bulb centre (cx, cy), radius r, neck up to cy - r - neckH
function roundFlask(s, cx, cy, r, level = 0, liq = WAT[0], neckH = 0.5, o = {}) {
  const nw = o.nw || 0.26;
  oval(s, cx, cy, 2 * r, 2 * r, GLASS, null);
  if (level) {
    const yl = cy + r - level * 2 * r, ph = Math.asin(Math.max(-1, Math.min(1, (yl - cy) / r)));
    const pts = []; for (let i = 0; i <= 30; i++) { const t = ph + (Math.PI - 2 * ph) * i / 30; pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]); }
    poly(s, pts, liq, null);
  }
  oval(s, cx, cy, 2 * r, 2 * r, null, C.ink, { lw: 1.5 });
  const top = cy - r - neckH;
  box(s, cx - nw / 2, top, nw, neckH + 0.06, GLASS, null);
  line(s, cx - nw / 2, top, cx - nw / 2, cy - r * 0.97, C.ink, 1.5); line(s, cx + nw / 2, top, cx + nw / 2, cy - r * 0.97, C.ink, 1.5);
  if (o.granules) for (let i = 0; i < 5; i++) ball(s, cx - 0.24 + i * 0.12, cy + r - 0.1 - (i % 2) * 0.05, 0.035, 'FFFFFF', '7D8794', 0.5);
  return top;
}
// filter funnel: top at y, width w, cone height h; stem below; paper and residue optional
function funnel(s, cx, top, w, h, o = {}) {
  const sw = 0.1, stem = o.stem || 0.45;
  poly(s, [[cx - w / 2, top], [cx + w / 2, top], [cx + sw / 2, top + h], [cx - sw / 2, top + h]], GLASS, C.ink, { lw: 1.5 });
  box(s, cx - sw / 2, top + h, sw, stem, GLASS, C.ink, { lw: 1.25 });
  poly(s, [[cx - w / 2 + 0.07, top + 0.03], [cx + w / 2 - 0.07, top + 0.03], [cx, top + h + 0.02]], 'FFFFFF', '9AA3B0', { lw: 0.75 });
  if (o.residue) { const rh = h * 0.42, rw = (w / 2 - 0.07) * 0.42; poly(s, [[cx - rw, top + h - rh], [cx + rw, top + h - rh], [cx, top + h]], o.residue[0], o.residue[1], { lw: 0.5 }); }
  if (o.drip) ball(s, cx, top + h + stem + 0.07, 0.035, o.drip, o.drip);
}
// evaporating basin: lower half-ellipse, rim at y
function basin(s, cx, y, w, d, liq, o = {}) {
  const pts = []; for (let i = 0; i <= 24; i++) { const t = Math.PI * i / 24; pts.push([cx + (w / 2) * Math.cos(t), y + d * Math.sin(t)]); }
  poly(s, pts, 'F4F4F4', null);
  if (liq) {
    const pts2 = []; for (let i = 0; i <= 24; i++) { const t = 0.35 + (Math.PI - 0.7) * i / 24; pts2.push([cx + (w / 2) * Math.cos(t), y + d * Math.sin(t)]); }
    poly(s, pts2, liq, null);
  }
  poly(s, pts, null, C.ink, { open: true, lw: 1.5 });
  line(s, cx - w / 2, y, cx + w / 2, y, C.ink, 1.5);
  if (o.crystals) for (let i = 0; i < o.crystals; i++) { const xx = cx - w * 0.25 + i * (w * 0.5) / Math.max(1, o.crystals - 1); crystal(s, xx, y + d * 0.55 - (i % 2) * 0.05, 0.09); }
}
function crystal(s, cx, cy, r, col = CUSO4) { poly(s, [[cx, cy - r], [cx + r * 0.8, cy], [cx, cy + r], [cx - r * 0.8, cy]], col[0], col[1], { lw: 0.75 }); }
// thermometer: top at y, bulb centre at yb
function thermo(s, cx, y, yb) {
  box(s, cx - 0.04, y, 0.08, yb - y, 'FFFFFF', C.ink, { shape: SH.ROUNDED_RECTANGLE, r: 0.03, lw: 1 });
  line(s, cx, y + (yb - y) * 0.35, cx, yb, C.red, 1.5);
  ball(s, cx, yb, 0.065, C.red, '8E2A33');
}
// tripod + gauze with top at y; Bunsen burner below (base at yb)
function tripodBunsen(s, cx, y, yb, o = {}) {
  const hw = o.hw || 0.6;
  box(s, cx - hw - 0.05, y, 2 * hw + 0.1, 0.05, '9AA3B0', '5A6275', { lw: 0.75 });
  line(s, cx - hw + 0.05, y + 0.05, cx - hw - 0.05, yb, '5A6275', 2); line(s, cx + hw - 0.05, y + 0.05, cx + hw + 0.05, yb, '5A6275', 2);
  box(s, cx - 0.25, yb - 0.08, 0.5, 0.08, '5A6275', '3A4255');
  const th = Math.max(0.35, (yb - y) * 0.45);
  box(s, cx - 0.06, yb - th, 0.12, th - 0.08, '8C96A8', '5A6275', { lw: 0.75 });
  const fh = Math.min(0.5, yb - th - y - 0.08);
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.11, y: yb - th - fh, w: 0.22, h: fh, fill: { color: '5B8DEF' }, line: { color: '2F5FBF', width: 0.75 } });
  s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.05, y: yb - th - fh * 0.6, w: 0.1, h: fh * 0.6, fill: { color: 'BFD4FB' }, line: { type: 'none' } });
}
// sloped Liebig condenser from (x1,y1) (upper, vapour in) to (x2,y2) (lower, distillate out)
function condenser(s, x1, y1, x2, y2, o = {}) {
  const L = Math.hypot(x2 - x1, y2 - y1), ux = (x2 - x1) / L, uy = (y2 - y1) / L, nx = -uy, ny = ux; // n points to the lower side
  const P = (t, v) => [x1 + ux * t + nx * v, y1 + uy * t + ny * v];
  const jw = o.jw || 0.16, iw = 0.055, a = 0.12 * L, b = 0.88 * L;
  const quad = (t1, t2, hw) => [P(t1, -hw), P(t2, -hw), P(t2, hw), P(t1, hw)];
  // water stubs: in near the lower end (bottom side), out near the upper end (top side)
  const inP = P(b - 0.18, jw), outP = P(a + 0.18, -jw);
  box(s, inP[0] - 0.045, inP[1] - 0.02, 0.09, 0.3, WAT[0], C.ink, { lw: 1 });
  box(s, outP[0] - 0.045, outP[1] - 0.28, 0.09, 0.3, WAT[0], C.ink, { lw: 1 });
  poly(s, quad(a, b, jw), WAT[0], C.ink, { lw: 1.25 });
  poly(s, quad(0, L, iw), GLASS, C.ink, { lw: 1 });
  return { in: [inP[0], inP[1] + 0.28], out: [outP[0], outP[1] - 0.28], mid: P(L / 2, 0), jw };
}
// chromatogram on paper: x,y top-left, w,h; baseline at yb; k inches per cm; lanes [{x, spots:[[d, col]], lab}]
function chromPaper(s, x, y, w, h, yb, front, k, lanes, o = {}) {
  box(s, x, y, w, h, 'FFFFFF', '9AA3B0', { lw: 1 });
  line(s, x + 0.08, yb, x + w - 0.08, yb, PENCIL, 1);
  if (front != null) line(s, x + 0.05, yb - front * k, x + w - 0.05, yb - front * k, '7D8794', 1, { dash: 'dash' });
  lanes.forEach(l => {
    (l.spots || []).forEach(([d, col, ghost]) => {
      if (ghost) oval(s, l.x, yb - d * k, o.sw || 0.28, o.sh || 0.18, null, 'B0B0B0', { dash: 'sysDot', lw: 0.75 });
      else oval(s, l.x, yb - d * k, o.sw || 0.28, o.sh || 0.18, col, null);
    });
    if (l.lab) label(s, l.x - 0.3, yb + 0.05, 0.6, l.lab, { size: o.ls || 10.5, bold: true, h: 0.24 });
  });
}
// spots on the baseline only (before running)
const DYE = { yellow: 'F2C230', red: 'D94848', green: '3E9E5A', blue: '3A6FD0', purple: '8E44AD' };

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Separation and purity',
    footer: 'OCR J260 Combined Science B • C5.1 how are chemicals separated and tested for purity? • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • purity, formulations, chromatography, filtration, crystallisation, distillation` },
      { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements found in C5.1' },
      { icon: '▲', text: 'PAG C3 chromatography • PAG C2 distillation • PAG C4 making a salt' },
    ],
    notes: 'C5.1 How are chemicals separated and tested for purity? is Part 1 of 3 in J260 Chapter C5 Chemical analysis (C5.1 separation and purity; C5.2 How are the amounts of substances in reactions calculated?; C5.3 How are the amounts of chemicals in solution measured?).\nNumbering: J258 (Chemistry B, separate science) has an extra C5.2 "How do chemists find the composition of unknown samples?" which is separate science only, so the later J260 sub-topics are one lower. C5.1 has the same code in both. See SPEC_C5_1.md for sources and confidence.\nStatement wording is taken from J258 C5.1 search extracts (C5.1.1–C5.1.8). No HT (bold) statement was found for C5.1, so no slide carries the HT pill.',
  });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C5.1.1', text: 'Explain that many useful materials are **formulations**: mixtures designed for a purpose.' },
  { code: 'C5.1.2', text: 'Distinguish the **scientific** meaning of **pure** from its **everyday** meaning.' },
  { code: 'C5.1.3', text: 'Use **melting point** data to tell **pure** from **impure** substances.' },
  { code: 'C5.1.4', text: 'Recall that chromatography has a **stationary** and a **mobile phase**.' },
  { code: 'C5.1.5', text: '**Interpret chromatograms** and calculate **R~~f~~ values**.' },
  { code: 'C5.1.6', text: 'Suggest **chromatographic methods**: solvents and **locating agents**.' },
  { code: 'C5.1.7', text: 'Describe **filtration**, **crystallisation**, **simple** and **fractional distillation**.' },
  { code: 'C5.1.8', text: 'Suggest a suitable **purification technique** from data about the substances.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J258 C5.1 wording from search extracts; J260 C5.1 has the same code; see SPEC_C5_1.md):\nC5.1.1 useful materials are formulations of mixtures (wording medium)\nC5.1.2 the scientific versus everyday meaning of "pure" (wording medium)\nC5.1.3 use melting point data to distinguish pure from impure substances (high)\nC5.1.4 chromatography involves a stationary and a mobile phase; separation depends on the distribution of substances between the phases (medium–high)\nC5.1.5 interpret chromatograms, including calculating Rf values (high)\nC5.1.6 suggest chromatographic methods for distinguishing pure from impure substances, including paper chromatography, aqueous and non-aqueous solvents, and locating agents (high)\nC5.1.7 describe, explain and exemplify the processes of filtration, crystallisation, simple distillation and fractional distillation; PAG3, PAG7 in J258 numbering (high)\nC5.1.8 suggest suitable purification techniques given information about the substances involved; PAG3, PAG7 (high)\nHT: none found. If your copy shows any statement in bold, add the HT pill to it.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C5 Chemical analysis • C5.1 is Part 1 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C5.1.1–2', 'Pure substances, mixtures, formulations', 'Both tiers', C.blue],
    ['C5.1.3', 'Melting point as a test for purity', 'Both tiers', C.blue],
    ['C5.1.4–6', 'Chromatography, Rf values, locating agents', 'Both tiers', C.blue],
    ['PAG C3', 'Paper chromatography of dyes', 'Practical', C.orange],
    ['C5.1.7', 'Filtration, crystallisation, distillation', 'Both tiers', C.blue],
    ['C5.1.8', 'Choosing a purification method (PAG C2, C4)', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C5.1\nSeparation and purity', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C1 potable water • C2 particles, elements, compounds • C4.2 bonding and melting points', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C5 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**C5.1 How are chemicals separated and tested for purity?** (this deck)',
      'C5.2 How are the amounts of substances in reactions calculated?',
      'C5.3 How are the amounts of chemicals in solution measured?',
      'J258 (separate) has an extra C5.2 on finding the composition of unknown samples, so J260 numbers the later sub-topics one lower.',
    ], { size: 11, color: 'E9E0F7', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'No C5.1 statement is Higher-only, so **everything** here is for both tiers.',
      'Practicals: **PAG C3** separation techniques, **PAG C2** distillation, **PAG C4** production of salts.',
      'Maths: **R~~f~~** ratios, **percentages**, **gradients**, reading and plotting **graphs** to scale.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C5 has three sub-topics. C5.1 title: OCR C5 scheme-of-work extract. C5.2: the docbrown combined page heading "Chapter C5.2 How are the amounts of substances in reactions calculated?" (J258 C5.3; the planning booklet gives 10 h separate / 6.5 h combined). C5.3 amounts of chemicals in solution (J258 C5.4), inferred with medium confidence.\nPAG codes: OCR\'s example set of Combined Science practicals lists PAG C2 Distillation, PAG C3 Separation techniques and PAG C4 Production of salts; the OCR PAG C3 document links its chromatography activity to Suite B C5.1.4 and C5.1.6.\nOverlap control: moles, masses in reactions, concentration and titration belong to C5.2 and C5.3 (other decks) and are not taught here. Making a salt is used only as a separation practical (filtration and crystallisation); no yield calculation.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C1 • potable water', q: 'Name **two** stages used to treat water so that it is **potable** (safe to drink).' },
  { from: 'C2 • particles', q: 'Name the change of state from **liquid to gas**. What happens to the forces between the particles?' },
  { from: 'C2 • elements and compounds', q: 'What is the difference between an **element** and a **compound**?' },
  { from: 'C2 • formulae', q: 'Write the formulae of **sodium chloride** and **copper(II) sulfate**.' },
  { from: 'C4.2 • bonding', q: 'Explain why **sodium chloride** has a **high** melting point.' },
  { from: 'C4.1 • using data', q: 'Ethanol boils at **78 °C** and water at **100 °C**. What state is each in at **90 °C**?' },
], { subtitle: 'Recall from C1, C2 and C4 • 6 minutes • no notes', notes: 'ANSWERS\n1. Any two: sedimentation; filtration (through sand beds); chlorination (or ozone / UV) to kill microorganisms (C1).\n2. Boiling / evaporation. The forces of attraction between the particles are overcome; particles move far apart (C2).\n3. An element contains only one type of atom; a compound contains two or more elements chemically combined (bonded) in fixed proportions (C2).\n4. NaCl; CuSO₄ (C2).\n5. Giant ionic lattice with strong electrostatic attraction between oppositely charged ions in all directions; lots of energy is needed to overcome them (C4.2; recap only).\n6. Ethanol is a gas (90 > 78 °C); water is a liquid (90 < 100 °C). This idea is the basis of fractional distillation.' }), 'Retrieval starter');

// ======================= 5 PURE SUBSTANCES AND FORMULATIONS =======================
reg(D.contentSlide({
  title: 'Pure substances and formulations',
  subtitle: `Specification ${sp('C5.1.1')}, ${sp('C5.1.2')} • the scientific meaning of pure; mixtures designed as useful products`,
  tag: 'C5.1.1–2', caption: 'particle diagrams and a paint formulation; not to scale',
  draw: (s) => {
    const bx = [0.75, 2.7, 4.65];
    bx.forEach(x => box(s, x, 1.5, 1.6, 1.45, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }));
    // pure element: identical atoms
    [[0.25, 0.3], [0.7, 0.25], [1.2, 0.35], [0.4, 0.75], [0.9, 0.7], [1.35, 0.85], [0.3, 1.15], [0.8, 1.15], [1.25, 1.2]].forEach(([dx, dy]) => ball(s, 0.75 + dx, 1.5 + dy, 0.11, '9AA3B0', '5A6275'));
    // pure compound: identical H2O-type molecules
    const mol = (cx, cy) => { ball(s, cx, cy, 0.1, C.red, '8E2A33'); ball(s, cx - 0.12, cy + 0.08, 0.065, 'FFFFFF', '7D8794'); ball(s, cx + 0.12, cy + 0.08, 0.065, 'FFFFFF', '7D8794'); };
    [[0.35, 0.35], [1.1, 0.3], [0.7, 0.75], [0.3, 1.1], [1.2, 1.05]].forEach(([dx, dy]) => mol(2.7 + dx, 1.5 + dy));
    // mixture: two substances, not joined
    [[0.35, 0.35], [1.15, 0.85], [0.45, 1.1]].forEach(([dx, dy]) => mol(4.65 + dx, 1.5 + dy));
    [[0.95, 0.3], [0.7, 0.75], [1.25, 1.2]].forEach(([dx, dy]) => { ball(s, 4.65 + dx - 0.08, 1.5 + dy, 0.09, C.blue, '3E2266'); ball(s, 4.65 + dx + 0.08, 1.5 + dy, 0.09, C.blue, '3E2266'); });
    label(s, 0.7, 3.0, 1.7, '**pure element**\none type of atom', { size: 10.5, h: 0.45, valign: 'top' });
    label(s, 2.65, 3.0, 1.7, '**pure compound**\none type of molecule', { size: 10.5, h: 0.45, valign: 'top' });
    label(s, 4.6, 3.0, 1.7, '**mixture**\nnot chemically joined', { size: 10.5, h: 0.45, valign: 'top' });
    label(s, 0.75, 3.62, 5.5, 'A **formulation**: gloss paint (percentage by mass, illustrative)', { size: 10.5, h: 0.26, align: 'left' });
    let x = 0.75; const W5 = 5.5;
    PAINT.forEach(([n, p, c]) => {
      const w = W5 * p / 100;
      box(s, x, 3.95, w, 0.55, c, C.ink, { lw: 0.75 });
      if (p >= 20) label(s, x, 3.95, w, `**${n} ${p}%**`, { size: 10.5, color: C.white, h: 0.55 });
      x += w;
    });
    label(s, 5.55, 4.52, 0.75, '**additives 5%**', { size: 10, h: 0.22, align: 'right', color: C.green });
    label(s, 0.75, 4.75, 5.5, 'binder: sticks to the surface • pigment: colour • solvent: helps it spread, then evaporates • additives: e.g. speed up drying', { size: 10, h: 0.5, color: C.text, align: 'left', valign: 'top' });
    label(s, 0.75, 5.35, 5.5, 'Other formulations: medicines, fuels, cleaning products, fertilisers, alloys, foods', { size: 10.5, h: 0.3, italic: true, color: C.blue, align: 'left' });
  },
  head: 'What does pure mean?',
  lines: [
    'In chemistry a **pure** substance contains only **one** element or **one** compound.',
    'In everyday use "pure" means **nothing added**, e.g. "pure orange juice", but juice is a mixture of water, sugars, acids and more.',
    'In a **mixture** the substances are **not chemically joined**, so they can be separated by **physical** methods.',
    'A **formulation** is a mixture **designed** as a useful product. Each component is there for a **purpose**, in a **measured** amount.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: a formulation', q: 'A 250 g tin of the paint shown.',
    steps: [['Binder', '40 ÷ 100 × 250 = 100 g'], ['Answer', 'pigment = 0.25 × 250 = **62.5 g**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Is "**pure** spring water" pure in the scientific sense? Explain. A 400 g medicine contains **2.5%** active ingredient: what mass is that?',
  notes: 'QUICK CHECK ANSWER: No: spring water contains dissolved minerals (ions such as calcium and magnesium) and gases, so it is a mixture. In everyday language "pure" means natural / nothing added. 0.025 × 400 = 10 g.\nC5.1.1 / C5.1.2 wording (J258 extracts): many useful materials are formulations of mixtures; scientific vs everyday "pure". Paint percentages are illustrative (asserted to total 100%). Each component has a purpose; the amounts are measured carefully so the product works the same every time.',
}), 'C5.1.1–2 Pure substances and formulations');

// ======================= 6 MELTING POINT AND PURITY =======================
reg(D.contentSlide({
  title: 'Melting point: a test for purity',
  subtitle: `Specification ${sp('C5.1.3')} • use melting point data to distinguish pure from impure substances`,
  tag: 'C5.1.3', caption: 'heating curves plotted to scale (illustrative data)',
  draw: (s) => {
    const g = { x: 1.35, y: 1.55, w: 4.85, h: 3.3, xmin: 0, xmax: 8, ymin: 100, ymax: 135, xstep: 1, ystep: 5, minor: 1, xlabel: 'Time / minutes', ylabel: 'Temperature / °C' };
    D.axes(s, g);
    line(s, D.px(g, 0), D.py(g, 122), D.px(g, 8), D.py(g, 122), C.grey, 1, { dash: 'dash' });
    label(s, D.px(g, 0.05), D.py(g, 122) - 0.25, 1.9, 'data-book value 122 °C', { size: 10, color: C.grey, align: 'left', h: 0.22 });
    D.plotLine(s, g, [[0, 104], [2, 122], [6, 122], [8, 132]], C.blue, 2.5);
    D.plotLine(s, g, [[0, 101], [1.6, 115], [6.4, 119], [8, 127]], C.red, 2.5, { dash: 'dash' });
    label(s, D.px(g, 4.1), D.py(g, 127.5), 2.3, '**pure**: melts at **122 °C** (sharp)', { size: 10.5, color: C.blue, align: 'left', h: 0.24 });
    label(s, D.px(g, 2.2), D.py(g, 112.5), 2.9, '**impure**: melts over **115–119 °C**', { size: 10.5, color: C.red, align: 'left', h: 0.24 });
    label(s, 0.7, 5.45, 5.6, 'Flat line: energy is used to melt the solid, so the temperature stays constant', { size: 10.5, italic: true, h: 0.3 });
  },
  head: 'Pure or impure?',
  lines: [
    'A **pure** substance melts at a **fixed, sharp** temperature (and boils at a fixed temperature).',
    'An **impure** substance melts at a **lower** temperature and over a **range** of temperatures.',
    'Compare the measured melting point with the **data-book** value: a sharp match means the sample is pure.',
    'Measure it with a **melting point apparatus**: a little solid in a capillary tube is heated **slowly** and watched.',
    'Impurities also make a liquid boil at a **higher** temperature, over a range.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: using data', q: 'Pure benzoic acid melts at 122 °C. Sample X melts from 115 °C to 119 °C.',
    steps: [['Compare', 'range 119 − 115 = 4 °C, and all below 122 °C'], ['Answer', 'X melts over a range and too low: X is **impure**']], size: 10.5 },
  workedH: 1.4,
  qc: 'Paracetamol melts at **169 °C**. Sample P melts at **169 °C**; sample Q melts between **160 °C and 165 °C**. Which is pure? Explain.',
  notes: 'QUICK CHECK ANSWER: P is pure: it melts sharply at the data-book value. Q is impure: it melts below 169 °C and over a range (5 °C).\nC5.1.3 "use melting point data to distinguish pure from impure substances". Heating-curve values are illustrative; benzoic acid melts at about 122 °C and paracetamol at about 169 °C (data-book values). GRADE 7–9 STRETCH: impurity particles disrupt the regular lattice of the solid, so less energy is needed to separate the particles; the impurity concentration in the remaining solid changes as it melts, so it melts over a range.',
}), 'C5.1.3 Melting point and purity');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C5.1.1')}–${sp('C5.1.3')} • purity, mixtures and formulations`, [
  { q: 'What is meant by a **pure** substance in chemistry?', marks: 2, ms: 'Contains only one substance (1); a single element or a single compound / no other substances mixed in (1).' },
  { q: 'A carton says "**100% pure orange juice**". Explain why a chemist would **not** call it pure.', marks: 2, ms: 'It is a mixture (1); of water, sugars, acids / several substances (1). (Everyday "pure" means nothing added.)' },
  { q: 'What is a **formulation**? Give **one** example.', marks: 2, ms: 'A mixture designed as a useful product / components in measured amounts, each with a purpose (1); example, e.g. paint, medicine, fuel, cleaning product, fertiliser, alloy, food (1).' },
  { q: 'Pure aspirin melts at **136 °C**. A sample melts between **128 °C and 132 °C**. What can you conclude? Explain.', marks: 2, ms: 'The sample is impure (1); it melts below 136 °C / over a range of temperatures (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 CHROMATOGRAPHY: THE TWO PHASES =======================
reg(D.contentSlide({
  title: 'Chromatography: two phases',
  subtitle: `Specification ${sp('C5.1.4')} • a stationary phase and a mobile phase`,
  tag: 'C5.1.4', panelW: 6.4, caption: 'paper chromatography part-way through a run; close-up not to scale',
  draw: (s) => {
    // beaker with lid, paper hung from a glass rod
    beaker(s, 0.8, 2.0, 1.9, 3.1, 0.15, ETH, { surface: '8DB04A' });
    box(s, 0.7, 1.86, 2.1, 0.1, 'DDE7F0', C.ink, { lw: 1 });
    ball(s, 1.75, 2.12, 0.05, 'C9D6E2', C.ink, 0.75);
    const px = 1.45, pw = 0.6, pt = 2.12, pb = 5.0, yb = 4.45;
    box(s, px, pt, pw, pb - pt, 'FFFFFF', '9AA3B0', { lw: 1 });
    box(s, px, 4.63, pw, pb - 4.63, ETH, null, { tr: 30 });
    box(s, px, 2.75, pw, pb - 2.75, 'F4F9EC', null, { tr: 40 });
    line(s, px + 0.04, yb, px + pw - 0.04, yb, PENCIL, 1);
    line(s, px + 0.02, 2.75, px + pw - 0.02, 2.75, '7D8794', 1, { dash: 'dash' });
    oval(s, px + pw / 2, 3.05, 0.26, 0.18, DYE.blue, null);
    oval(s, px + pw / 2, 3.95, 0.26, 0.18, DYE.yellow, null);
    callout(s, 2.95, 1.75, 1.6, 'lid', 2.6, 1.91);
    callout(s, 2.95, 2.62, 1.6, 'solvent front', 2.05, 2.75);
    callout(s, 2.95, 3.25, 1.6, '**paper**: stationary phase', 2.05, 3.4, { h: 0.4 });
    callout(s, 2.95, 4.32, 1.6, 'pencil baseline', 2.05, 4.45);
    callout(s, 2.95, 4.72, 1.6, '**solvent**: mobile phase', 2.4, 4.8, { h: 0.4 });
    label(s, 0.7, 5.25, 2.2, 'ink spot has separated into **blue** and **yellow**', { size: 10, h: 0.45, valign: 'top' });
    // close-up of distribution
    const cx = 4.65, cy = 1.55, cw = 1.75, chh = 3.35;
    box(s, cx, cy, cw, chh, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, cx, cy + 0.03, cw, '**Close-up**', { size: 10.5, h: 0.24 });
    box(s, cx + 0.1, cy + 0.32, 0.72, 2.6, 'F3E6CC', 'C9A86A', { lw: 0.75 });
    box(s, cx + 0.92, cy + 0.32, 0.73, 2.6, ETH, '8DB04A', { lw: 0.75 });
    label(s, cx + 0.1, cy + 2.95, 0.72, 'paper', { size: 10, h: 0.22, bold: true, color: '8A6A2A' });
    label(s, cx + 0.92, cy + 2.95, 0.73, 'solvent', { size: 10, h: 0.22, bold: true, color: '5E7F2A' });
    arrow(s, cx + 1.28, cy + 2.75, cx + 1.28, cy + 0.45, '5E7F2A', 1.5);
    [[0.3, 0.6], [0.55, 1.2], [0.3, 1.9], [0.6, 2.5], [1.1, 1.5]].forEach(([dx, dy]) => ball(s, cx + dx, cy + dy, 0.07, DYE.yellow, 'A88410'));
    [[1.08, 0.7], [1.45, 1.05], [1.12, 1.95], [1.48, 2.35], [0.45, 2.2]].forEach(([dx, dy]) => ball(s, cx + dx, cy + dy, 0.07, DYE.blue, '23488F'));
    label(s, 4.55, 5.0, 1.95, '**blue**: mostly in the solvent, so it moves **further**', { size: 10, h: 0.45, align: 'left', valign: 'top', color: '23488F' });
    label(s, 4.55, 5.42, 1.95, '**yellow**: held by the paper', { size: 10, h: 0.25, align: 'left', color: 'A88410' });
  },
  head: 'How chromatography separates',
  lines: [
    'Chromatography separates the **soluble** substances in a mixture, e.g. the dyes in an ink.',
    'The **stationary phase** does not move: in paper chromatography it is the **paper**.',
    'The **mobile phase** moves through it: the **solvent**.',
    'Each substance is **distributed** between the two phases. A substance that spends **more time** in the mobile phase moves **further** up the paper.',
    'Draw the baseline in **pencil**: graphite does not dissolve, so it does not run.',
    'The solvent must start **below** the baseline, or the spots dissolve into the solvent pool.',
  ],
  size: 11.5,
  qc: 'Why is a **lid** placed on the beaker? Why would a baseline drawn in **ink** spoil the chromatogram?',
  notes: 'QUICK CHECK ANSWER: The lid keeps the air in the beaker saturated with solvent vapour, so the solvent does not evaporate from the paper and the solvent front rises evenly (it also reduces flammable / irritant vapour in the room). An ink line would dissolve in the solvent and separate too, giving extra spots that confuse the result.\nC5.1.4 "recall that chromatography involves a stationary and a mobile phase and that separation depends on the distribution of substances between the phases" (wording medium–high). GRADE 7–9 STRETCH: the distribution depends on how strongly each substance is attracted to the paper (and the water held in its fibres) compared with how soluble it is in the solvent.',
}), 'C5.1.4 Chromatography: two phases');

// ======================= 9 INTERPRETING CHROMATOGRAMS =======================
reg(D.contentSlide({
  title: 'Interpreting chromatograms: R~~f~~ values',
  subtitle: `Specification ${sp('C5.1.5')} • interpret chromatograms, including calculating Rf values`,
  tag: 'C5.1.5', caption: 'chromatogram drawn to scale: 1 cm on the paper = 0.45 in here',
  draw: (s) => {
    const k = 0.45, yb = 5.2, px = 1.3, pw = 4.0;
    const lanes = [['X', XSPOTS.map((d, i) => [d, [DYE.yellow, DYE.red, DYE.blue][i]])], ['A', [[REF.A, DYE.yellow]]], ['B', [[REF.B, DYE.red]]], ['C', [[REF.C, DYE.green]]], ['D', [[REF.D, DYE.blue]]]];
    chromPaper(s, px, 1.48, pw, 4.15, yb, FRONT, k, lanes.map(([lab, sp2], i) => ({ x: px + 0.45 + i * 0.77, lab, spots: sp2 })));
    // ruler
    box(s, 0.72, yb - FRONT * k - 0.05, 0.3, FRONT * k + 0.1, 'F6E7B8', 'B79B4A', { lw: 0.75 });
    for (let c = 0; c <= 8; c++) { const yy = yb - c * k; line(s, 0.72, yy, 0.86, yy, '6B5A2A', 0.75); label(s, 0.83, yy - 0.09, 0.18, String(c), { size: 10, h: 0.18, align: 'center' }); }
    label(s, 0.55, yb + 0.1, 0.65, 'cm', { size: 10, h: 0.2 });
    // dimension arrows
    const xb = px + 0.45 + 2 * 0.77 + 0.3;
    line(s, xb, yb, xb, yb - REF.B * k, C.red, 1.25, { head: true, tail: true });
    label(s, xb + 0.03, yb - REF.B * k / 2 - 0.12, 0.62, '**4.8 cm**', { size: 10, color: C.red, h: 0.24, align: 'left' });
    const xf = px + pw + 0.25;
    line(s, xf, yb, xf, yb - FRONT * k, C.ink, 1.25, { head: true, tail: true });
    label(s, xf + 0.05, yb - FRONT * k / 2 - 0.12, 0.7, '**8.0 cm**', { size: 10, h: 0.24, align: 'left' });
    label(s, px + pw + 0.1, yb - FRONT * k - 0.32, 1.1, 'solvent front', { size: 10, h: 0.22, align: 'left', color: C.grey });
    label(s, px + pw + 0.1, yb + 0.05, 1.1, 'baseline', { size: 10, h: 0.22, align: 'left', color: C.grey });
    label(s, 0.6, 5.6, 5.9, '**X** = unknown ink; **A–D** = pure reference dyes', { size: 10.5, h: 0.28 });
  },
  head: 'Reading a chromatogram',
  lines: [
    { t: 'R~~f~~ = distance moved by substance ÷ distance moved by solvent', b: true, color: C.blue, nob: true },
    'Measure both from the **baseline**, to the **centre** of the spot and to the **solvent front**.',
    'R~~f~~ has **no units** and is always **between 0 and 1**.',
    'The **same** substance has the **same R~~f~~** in the same solvent and paper, so we can **identify** it.',
    'A **pure** substance gives **one** spot; a **mixture** gives **two or more**.',
    'X has spots that match **A**, **B** and **D**, but not C.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: R~~f~~ of dye B', q: 'Use the chromatogram.',
    steps: [['Measure', 'spot 4.8 cm; solvent front 8.0 cm'], ['Answer', `R~~f~~ = 4.8 ÷ 8.0 = **${f2(RF.B)}**`]], size: 10.5 },
  workedH: 1.3,
  qc: 'A spot moves **3.1 cm** while the solvent front moves **6.2 cm**. Calculate R~~f~~. Is ink **X** pure? Explain.',
  notes: `QUICK CHECK ANSWER: Rf = 3.1 ÷ 6.2 = 0.50. X is not pure: it gives three spots, so it is a mixture of (at least) three dyes, A, B and D.\nChromatogram drawn to scale and asserted in node: front 8.0 cm; A 2.4 cm (Rf ${f2(RF.A)}), B 4.8 (${f2(RF.B)}), C 5.6 (${f2(RF.C)}), D 6.8 (${f2(RF.D)}); X spots match A, B and D. C5.1.5 "interpret chromatograms, including calculating Rf values". A spot that stays on the baseline is insoluble in that solvent (Rf = 0).`,
}), 'C5.1.5 Interpreting chromatograms');

// ======================= 10 SOLVENTS AND LOCATING AGENTS =======================
reg(D.contentSlide({
  title: 'Choosing a chromatography method',
  subtitle: `Specification ${sp('C5.1.6')} • aqueous and non-aqueous solvents; locating agents`,
  tag: 'C5.1.6', caption: 'chromatograms of sample S and of an amino acid mixture (illustrative)',
  draw: (s) => {
    const k = 0.3, yb = 4.15;
    label(s, 0.65, 1.42, 2.5, '**Test for purity: two solvents**', { size: 10.5, h: 0.25 });
    chromPaper(s, 0.8, 1.75, 1.0, 2.6, yb, 7.0, k, [{ x: 1.3, spots: [[3.0, DYE.green]], lab: '' }], { sw: 0.26, sh: 0.17 });
    chromPaper(s, 2.1, 1.75, 1.0, 2.6, yb, 7.0, k, [{ x: 2.6, spots: [[2.0, DYE.green], [4.6, DYE.blue]], lab: '' }], { sw: 0.26, sh: 0.17 });
    label(s, 0.7, 4.4, 1.2, 'in **water**', { size: 10.5, h: 0.24 });
    label(s, 2.0, 4.4, 1.2, 'in **ethanol**', { size: 10.5, h: 0.24 });
    label(s, 0.65, 4.68, 2.6, 'one spot in water, **two** in ethanol: S is **impure**', { size: 10, h: 0.42, valign: 'top', color: C.red });
    // locating agent
    label(s, 3.45, 1.42, 2.9, '**Colourless spots: locating agent**', { size: 10.5, h: 0.25 });
    chromPaper(s, 3.6, 1.75, 1.0, 2.6, yb, 6.0, k * 1.2, [{ x: 4.1, spots: [[1.8, null, true], [3.6, null, true]] }], { sw: 0.26, sh: 0.17 });
    chromPaper(s, 5.25, 1.75, 1.0, 2.6, yb, 6.0, k * 1.2, [{ x: 5.75, spots: [[1.8, DYE.purple], [3.6, DYE.purple]] }], { sw: 0.26, sh: 0.17 });
    arrow(s, 4.68, 2.9, 5.17, 2.9, C.ink, 1.5);
    label(s, 4.62, 2.38, 0.62, 'spray', { size: 10, h: 0.22, italic: true });
    label(s, 3.45, 4.4, 1.3, 'dried: nothing seen', { size: 10, h: 0.24 });
    label(s, 5.05, 4.4, 1.4, 'after ninhydrin', { size: 10, h: 0.24 });
    pbox(s, 0.7, 5.15, 2.75, 0.62, '**Aqueous** (water): food colourings, sugars, salts', C.white, WAT[1], { size: 10, lw: 0.75 });
    pbox(s, 3.6, 5.15, 2.75, 0.62, '**Non-aqueous** (ethanol, propanone): permanent inks, chlorophyll', C.white, '8DB04A', { size: 10, lw: 0.75 });
  },
  head: 'Planning the method',
  lines: [
    'Choose a solvent that the substances **dissolve** in: **aqueous** (water) or **non-aqueous** (e.g. ethanol).',
    'To test **purity**, run the sample in **two or more** different solvents. A pure substance gives a **single** spot in **every** solvent.',
    'Run **pure reference** samples on the same paper and compare R~~f~~ values.',
    '**Colourless** substances: spray the dried chromatogram with a **locating agent**, which reacts to make **coloured** spots, e.g. **ninhydrin** for amino acids.',
  ],
  size: 11,
  worked: { head: 'Worked example: amino acids', q: 'After spraying, spots are at 1.8 cm and 3.6 cm. The solvent front is at 6.0 cm.',
    steps: [['R~~f~~', '1.8 ÷ 6.0 = 0.30 and 3.6 ÷ 6.0 = 0.60'], ['Answer', '**two** different amino acids: a **mixture**']], size: 10.5 },
  workedH: 1.45,
  qc: 'A **permanent** marker ink does not move from the baseline in water. What should the student change? Why?',
  notes: 'QUICK CHECK ANSWER: Use a non-aqueous solvent such as ethanol (or propanone): the ink is insoluble in water, so it stays on the baseline; it dissolves in the non-aqueous solvent and can then move and separate.\nC5.1.6 "suggest chromatographic methods for distinguishing pure from impure substances, including paper chromatography, aqueous and non-aqueous solvents, and locating agents". A substance can give one spot in one solvent by chance (two substances with the same Rf), which is why two solvents are used.\nCLEAPSS-style hazards: ninhydrin spray is HARMFUL if swallowed and an IRRITANT (it stains skin purple); its ethanol solvent is HIGHLY FLAMMABLE. Teacher sprays in a fume cupboard; wear gloves and eye protection. Ethanol and propanone are HIGHLY FLAMMABLE and cause serious eye irritation: no naked flames. Data illustrative (Rf asserted).',
}), 'C5.1.6 Solvents and locating agents');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C5.1.4')}–${sp('C5.1.6')} • chromatography`, [
  { q: 'Name the **stationary** phase and the **mobile** phase in paper chromatography.', marks: 2, ms: 'Stationary: the paper (1); mobile: the solvent (1).' },
  { q: 'A dye moves **4.2 cm**. The solvent front moves **6.0 cm**. Calculate the R~~f~~ value of the dye.', marks: 2, ms: '4.2 ÷ 6.0 (1); = 0.70 (1). No units.' },
  { q: 'Explain why two dyes in an ink travel **different distances** up the paper.', marks: 2, ms: 'They are distributed differently between the two phases / have different solubility in the solvent / attraction to the paper (1); the one spending more time in the mobile phase (more soluble) moves further (1).' },
  { q: 'Describe how chromatography can show that a substance is **pure**.', marks: 2, ms: 'Gives only one spot (1); in several / two different solvents (1). Accept: matches the Rf of a pure reference sample in each solvent.' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 PAG C3 METHOD =======================
reg(D.contentSlide({
  title: 'Practical: chromatography of dyes',
  subtitle: `Specification ${sp('C5.1.4')}, ${sp('C5.1.6')} • PAG C3 separation techniques`,
  tag: 'PAG C3', pag: 'PAG C3', caption: 'apparatus for paper chromatography; dimensions not to scale',
  draw: (s) => {
    beaker(s, 1.4, 1.95, 2.0, 3.35, 0.09, WAT[0]);
    box(s, 1.3, 1.82, 2.2, 0.1, 'DDE7F0', C.ink, { lw: 1 });
    line(s, 1.45, 2.08, 3.35, 2.08, '9AA3B0', 3);
    const px = 1.75, pw = 1.3, pb = 5.22, yb = 4.75;
    box(s, px, 2.1, pw, pb - 2.1, 'FFFFFF', '9AA3B0', { lw: 1 });
    box(s, px + pw / 2 - 0.1, 2.0, 0.2, 0.2, '7D8794', '4A5262', { lw: 0.5 });
    box(s, px, 4.99, pw, pb - 4.99, WAT[0], null);
    line(s, px + 0.05, yb, px + pw - 0.05, yb, PENCIL, 1);
    ['X', 'A', 'B', 'C'].forEach((t, i) => { const xx = px + 0.2 + i * 0.3; oval(s, xx, yb, 0.13, 0.1, [DYE.blue, DYE.yellow, DYE.red, DYE.green][i], null); label(s, xx - 0.15, yb - 0.32, 0.3, t, { size: 10, h: 0.2, color: PENCIL }); });
    // dimension brackets on the left
    line(s, 1.2, yb, 1.2, pb + 0.08, C.red, 1, { head: true, tail: true });
    label(s, 0.5, (yb + pb) / 2 - 0.25, 0.68, '**1.5 cm**\nbaseline', { size: 10, h: 0.42, color: C.red, align: 'right' });
    callout(s, 3.75, 1.7, 2.5, 'lid (stops the solvent evaporating)', 3.5, 1.87, { h: 0.3 });
    callout(s, 3.75, 2.25, 2.5, 'paper clipped to a glass rod', 3.05, 2.25, { h: 0.3 });
    callout(s, 3.75, 3.1, 2.5, 'chromatography paper', 3.05, 3.2, { h: 0.3 });
    callout(s, 3.75, 4.35, 2.5, 'pencil baseline with small spots', 3.05, 4.72, { h: 0.3 });
    callout(s, 3.75, 4.95, 2.5, 'solvent about **1 cm** deep, **below** the baseline', 3.4, 5.1, { h: 0.42 });
    // capillary tube
    line(s, 0.85, 2.2, 1.12, 3.4, '7D8794', 3);
    oval(s, 1.13, 3.45, 0.1, 0.07, DYE.blue, null);
    label(s, 0.45, 1.72, 1.2, 'capillary tube', { size: 10, h: 0.42, valign: 'top' });
  },
  head: 'Method',
  lines: [
    'Draw a **pencil** line 1.5 cm from the bottom of the paper. Put a **small** spot of each dye on it with a capillary tube; let it dry; repeat to concentrate.',
    'Add solvent (water) to about **1 cm** depth. Hang the paper so the bottom dips in but the **baseline is above** the solvent. Put the lid on.',
    'When the solvent is near the top, remove the paper and **mark the solvent front** in pencil at once. Dry it.',
    'Measure the distances and calculate **R~~f~~** values.',
    '**IV**: the dye. **DV**: distance moved / R~~f~~. **Control**: solvent, paper, temperature, baseline height.',
    '**Safety**: eye protection. Food dyes low hazard; if ethanol is used, HIGHLY FLAMMABLE: no naked flames.',
  ],
  size: 10.5,
  qc: 'Why are the spots kept **small** and **concentrated**? Why must the solvent front be marked **immediately**?',
  notes: 'QUICK CHECK ANSWER: Small spots give separated, sharp spots that can be measured accurately; large spots spread and overlap. Concentrated spots are easy to see after running. The solvent evaporates quickly once the paper is out, so the front disappears; marking it late would make the solvent distance too small and the Rf values too large.\nPAG C3 Separation techniques (OCR Combined Science PAG list; the OCR PAG C3 activity document links to Suite B C5.1.4 and C5.1.6). Alternatives: chromatography of leaf pigments with a non-aqueous solvent (teacher-prepared; propanone or ethanol, HIGHLY FLAMMABLE).\nCLEAPSS-style hazards: food colourings low hazard; water low hazard; ethanol HIGHLY FLAMMABLE, causes serious eye irritation; propanone HIGHLY FLAMMABLE, causes serious eye irritation, vapour may cause drowsiness. Wear eye protection; keep away from flames; good ventilation.',
}), 'PAG C3 Chromatography (method)');

// ======================= 13 PAG C3 RESULTS =======================
{
  const s = D.contentHeader('Practical: chromatography results', `Specification ${sp('C5.1.5')} • tables, a graph to scale, R~~f~~ values and errors`.replace(/~~/g, ''), { pag: 'PAG C3', tag: 'PAG C3' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'graph plotted to scale from four runs stopped at different times (illustrative data)');
  const g = { x: 1.45, y: 1.55, w: 5.2, h: 2.85, xmin: 0, xmax: 8, ymin: 0, ymax: 5, xstep: 1, ystep: 1, minor: 2, xlabel: 'Distance moved by solvent front / cm', ylabel: 'Distance moved by dye / cm' };
  D.axes(s, g);
  D.plotLine(s, g, [[0, 0], [8, 4.8]], DYE.red, 2); D.points(s, g, SF.map((v, i) => [v, RED[i]]), C.ink);
  D.plotLine(s, g, [[0, 0], [8, 2.4]], 'C89A10', 2); D.points(s, g, SF.map((v, i) => [v, YEL[i]]), C.ink);
  label(s, D.px(g, 5.6), D.py(g, 4.3), 1.5, '**red** dye', { size: 10.5, color: DYE.red, align: 'left', h: 0.22 });
  label(s, D.px(g, 6.0), D.py(g, 1.35), 1.5, '**yellow** dye', { size: 10.5, color: 'A88410', align: 'left', h: 0.22 });
  const rows = [[HDR('Solvent front / cm'), ...SF.map(v => HDR(v.toFixed(1)))],
    [tcell('Red dye / cm', 0, { bold: true }), ...RED.map(v => tcell(v.toFixed(1), 0))],
    [tcell('Yellow dye / cm', 1, { bold: true }), ...YEL.map(v => tcell(v.toFixed(1), 1))]];
  s.addTable(rows, { x: 0.7, y: 4.98, w: 6.1, colW: [1.7, 1.1, 1.1, 1.1, 1.1], rowH: 0.21, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 1.3, 5.58, 1.75, 'Worked example: R~~f~~ from the graph', 'R~~f~~ = gradient of the line of best fit.', [
    ['Red', '4.8 ÷ 8.0 = **0.60**'], ['Yellow', '2.4 ÷ 8.0 = **0.30**'], ['Answer', 'they match dyes **B** (0.60) and **A** (0.30)']], { size: 10.5 });
  D.card(s, 7.3, 3.2, 5.58, 3.05, 'Conclusion and errors', [
    'Straight lines through the origin: R~~f~~ stays the **same** as the run goes on, so it identifies the dye.',
    '**Errors**: large spots spread and overlap; measuring to the spot **edge**, not the centre; front marked late.',
    'Baseline under the solvent: dyes wash into the solvent. Uneven paper or no lid: the front is not level.',
    '**Improve**: small spots, mark the front at once, repeat and find a **mean** R~~f~~, run reference dyes on the same paper.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the graph: how far had the **red** dye moved when the solvent front was at **5.0 cm**? Why is the line straight?');
  D.notes(s, 'QUICK CHECK ANSWER: 0.60 × 5.0 = 3.0 cm (read from the graph: accept 2.9–3.1 cm). The distance moved by the dye is always the same fraction (the Rf) of the distance moved by the solvent, so the ratio is constant and the graph is a straight line through the origin.\nData illustrative; each reading is within ±0.03 of the stated Rf (asserted in node). Rf red 0.60 and yellow 0.30 asserted. This graph links C5.1.5 with the maths skill of finding a gradient.');
  reg(s, 'PAG C3 Chromatography (results)');
}

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C5.1.5')}, ${sp('C5.1.6')} • the chromatography practical`, [
  { q: 'Give **two** variables that must be **controlled** when comparing dyes by chromatography.', marks: 2, ms: 'Any two (1 each): same solvent; same type of paper; same temperature; same height of baseline; same depth of solvent; run on the same paper at the same time.' },
  { q: 'Explain why the solvent front must be marked **as soon as** the paper is removed.', marks: 2, ms: 'The solvent evaporates and the front can no longer be seen (1); so the solvent distance would be measured too short / Rf values wrong (too large) (1).' },
  { q: 'A student\'s spots were **smudged** and **overlapped**. Suggest a cause and an improvement.', marks: 2, ms: 'Spots too large / too much dye applied / baseline below solvent (1); use smaller spots with a capillary tube, dry between applications / keep the baseline above the solvent (1).' },
  { q: 'A dye has R~~f~~ = **0.30**. The solvent front moved **7.0 cm**. How far did the dye move?', marks: 2, ms: '0.30 × 7.0 (1); = 2.1 cm (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 FILTRATION AND CRYSTALLISATION =======================
reg(D.contentSlide({
  title: 'Filtration and crystallisation',
  subtitle: `Specification ${sp('C5.1.7')} • separating an insoluble solid; obtaining a soluble solid from a solution`,
  tag: 'C5.1.7', caption: 'filtration (left) and crystallisation on a water bath (right); not to scale',
  draw: (s) => {
    // filtration
    funnel(s, 1.9, 1.75, 1.5, 0.95, { residue: SAND, drip: SALTW, stem: 0.55 });
    conical(s, 1.9, 2.95, 1.6, 2.0, 0.35, SALTW);
    for (let i = 0; i < 10; i++) ball(s, 1.72 + (i % 5) * 0.09, 2.45 + Math.floor(i / 5) * 0.08, 0.03, SAND[1], SAND[1]);
    callout(s, 0.55, 1.42, 1.3, 'filter paper', 1.35, 1.82);
    callout(s, 2.75, 2.2, 1.1, '**residue** (sand)', 2.0, 2.45, { h: 0.4 });
    callout(s, 2.85, 4.4, 1.0, '**filtrate** (salt solution)', 2.5, 4.55, { h: 0.4 });
    // crystallisation on a water bath
    tripodBunsen(s, 5.0, 3.6, 5.05, { hw: 0.65 });
    beaker(s, 4.4, 2.85, 1.2, 0.75, 0.75, WAT[0]);
    basin(s, 5.0, 2.62, 1.45, 0.38, SALTW, { crystals: 4 });
    // steam
    [4.65, 5.0, 5.35].forEach(x => line(s, x, 2.5, x + 0.06, 2.12, 'B0B8C4', 1.25, { dash: 'sysDot' }));
    callout(s, 3.95, 1.7, 1.6, 'water evaporates', 4.65, 2.2, { h: 0.24 });
    callout(s, 5.75, 2.32, 0.75, 'evaporating basin', 5.55, 2.65, { h: 0.42 });
    callout(s, 5.75, 3.1, 0.75, 'water bath', 5.6, 3.2, { h: 0.24 });
    label(s, 5.25, 4.3, 0.9, 'heat', { size: 10, bold: true, color: C.red, h: 0.22, align: 'left' });
    label(s, 0.6, 5.3, 2.9, '**Filtration**: an **insoluble** solid', { size: 10.5, h: 0.28 });
    label(s, 3.6, 5.3, 2.9, '**Crystallisation**: a **soluble** solid', { size: 10.5, h: 0.28 });
  },
  head: 'Two separation methods',
  lines: [
    '**Filtration** separates an **insoluble solid** from a liquid. The **residue** stays on the filter paper; the **filtrate** passes through.',
    '**Crystallisation** gets a **soluble solid** from its solution:',
    { t: '1 heat to evaporate some water until crystals start to form (the **crystallisation point**)', nob: true },
    { t: '2 leave to **cool** slowly so crystals form; 3 **filter** them off and dry between filter papers', nob: true },
    'Do **not** boil to dryness: the solid can spit, decompose or lose its **water of crystallisation**.',
  ],
  size: 11,
  worked: { head: 'Worked example: rock salt', q: '10.0 g of rock salt gives 6.2 g of dry sand and 3.6 g of salt.',
    steps: [['Lost', '10.0 − 6.2 − 3.6 = 0.2 g lost in the process'], ['Answer', 'salt = 3.6 ÷ 10.0 × 100 = **36%** of the rock salt']], size: 10.5 },
  workedH: 1.4,
  qc: 'Why is rock salt stirred in **water** before it is filtered? **25.0 g** of rock salt gives **8.0 g** of salt: what percentage is salt?',
  notes: 'QUICK CHECK ANSWER: The salt must dissolve so that it passes through the filter paper in the filtrate, while the insoluble sand is left as the residue. 8.0 ÷ 25.0 × 100 = 32%.\nC5.1.7 "describe, explain and exemplify the processes of filtration, crystallisation, simple distillation and fractional distillation". The crystallisation point can be tested by dipping a cold glass rod in the solution: crystals form on it. Values asserted in node. Heating over a water bath (rather than directly) avoids spitting. Link to C1 water treatment (filtration through sand beds).',
}), 'C5.1.7 Filtration and crystallisation');

// ======================= 16 SIMPLE DISTILLATION =======================
reg(D.contentSlide({
  title: 'Simple distillation',
  subtitle: `Specification ${sp('C5.1.7')} • separating a liquid from a solution`,
  tag: 'C5.1.7', caption: 'simple distillation of salt water; water in at the bottom of the condenser',
  draw: (s) => {
    const top = roundFlask(s, 1.45, 3.85, 0.62, 0.5, SALTW, 0.55, { granules: true });
    // still head
    box(s, 1.32, top - 0.45, 0.26, 0.47, GLASS, C.ink, { lw: 1.25 });
    box(s, 1.36, top - 0.6, 0.18, 0.17, '8C6A4A', '5A4030', { lw: 0.75 });
    const cd = condenser(s, 1.58, top - 0.25, 5.0, 3.85);
    thermo(s, 1.45, 1.42, top - 0.25);
    conical(s, 5.15, 3.8, 1.1, 1.45, 0.3, WAT[0]);
    tripodBunsen(s, 1.45, 4.5, 5.75, { hw: 0.55 });
    arrow(s, cd.in[0] + 0.4, cd.in[1] + 0.05, cd.in[0] + 0.03, cd.in[1] - 0.05, C.blue, 1.5);
    label(s, cd.in[0] + 0.15, cd.in[1] + 0.06, 1.3, '**cold water in**', { size: 10, color: C.blue, h: 0.22, align: 'left' });
    arrow(s, cd.out[0], cd.out[1] + 0.02, cd.out[0] + 0.35, cd.out[1] - 0.2, C.blue, 1.5);
    label(s, cd.out[0] + 0.35, cd.out[1] - 0.38, 1.1, '**water out**', { size: 10, color: C.blue, h: 0.22, align: 'left' });
    callout(s, 3.75, 2.05, 1.6, 'Liebig condenser', 3.3, 2.95);
    callout(s, 1.75, 1.45, 1.5, 'thermometer bulb level with the side arm', 1.53, top - 0.25, { h: 0.42 });
    callout(s, 2.4, 4.15, 1.6, 'salt water + anti-bumping granules', 1.95, 4.1, { h: 0.42 });
    callout(s, 4.1, 5.4, 1.4, '**distillate**: pure water', 5.0, 5.05, { h: 0.42 });
  },
  head: 'How it works',
  lines: [
    'Simple distillation separates a **liquid** from a **solution**, e.g. pure water from salt water or inky water.',
    'Heat the solution: the **water boils**, the vapour moves into the **condenser**, is **cooled** and **condenses**.',
    'The pure liquid collected is the **distillate**. The dissolved solid stays in the flask.',
    'The thermometer bulb sits at the **side arm** to measure the temperature of the vapour leaving: **100 °C** for water.',
    'Cold water enters the condenser at the **bottom** so the jacket stays **full** and cooling is efficient.',
  ],
  size: 11,
  worked: { head: 'Worked example: sea water', q: '200 g of sea water contains 3.5% salt by mass.',
    steps: [['Salt', '0.035 × 200 = 7.0 g stays in the flask'], ['Answer', 'up to 200 − 7.0 = **193 g** of pure water can be collected']], size: 10.5 },
  workedH: 1.4,
  qc: 'Why would the thermometer give the **wrong** reading if its bulb were **in** the salt water? What would it read?',
  notes: 'QUICK CHECK ANSWER: In the liquid it measures the temperature of the boiling salt solution, which is above 100 °C (impurities raise the boiling point), not the temperature of the vapour being collected. Accept "a little over 100 °C".\nAnti-bumping granules give smooth boiling. Sea water 3.5% by mass is a typical value; calculation asserted. CLEAPSS-style: salt solution low hazard; hot apparatus: allow to cool; check the condenser hoses are secure before heating; never heat a closed system.',
}), 'C5.1.7 Simple distillation');

// ======================= 17 FRACTIONAL DISTILLATION =======================
reg(D.contentSlide({
  title: 'Fractional distillation',
  subtitle: `Specification ${sp('C5.1.7')} • separating miscible liquids with different boiling points`,
  tag: 'C5.1.7', caption: 'fractional distillation of ethanol and water, heated electrically; not to scale',
  draw: (s) => {
    // heating mantle behind the flask
    box(s, 0.72, 4.3, 1.46, 1.05, 'B9A28A', '6E5A44', { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1 });
    roundFlask(s, 1.45, 4.35, 0.55, 0.5, ETH, 0.25);
    label(s, 0.72, 5.36, 1.46, 'heating mantle', { size: 10, h: 0.22, bold: true, color: '6E5A44' });
    // column
    const cTop = 2.15, cBot = 3.85;
    box(s, 1.29, cTop, 0.32, cBot - cTop, GLASS, C.ink, { lw: 1.25 });
    for (let r = 0; r < 9; r++) for (let c = 0; c < 2; c++) ball(s, 1.37 + c * 0.16 + (r % 2) * 0.03, cTop + 0.12 + r * 0.18, 0.055, 'FFFFFF', '9AA3B0', 0.5);
    box(s, 1.31, cTop - 0.35, 0.28, 0.36, GLASS, C.ink, { lw: 1.25 });
    const cd = condenser(s, 1.59, cTop - 0.15, 4.75, 3.35);
    thermo(s, 1.45, 1.4, cTop - 0.15);
    conical(s, 4.95, 3.3, 1.0, 1.4, 0.25, ETH);
    // temperature gradient bar
    for (let i = 0; i < 6; i++) box(s, 0.8, cTop + i * (cBot - cTop) / 6, 0.18, (cBot - cTop) / 6, ['5B9BD5', '86A9D8', 'B1A7C9', 'D69A9A', 'D9736F', 'C8414C'][i], null);
    label(s, 0.45, cTop - 0.3, 0.9, 'cooler', { size: 10, h: 0.22, bold: true, color: '3A6FB0' });
    label(s, 0.45, cBot + 0.02, 0.9, 'hotter', { size: 10, h: 0.22, bold: true, color: C.red });
    callout(s, 2.15, 2.7, 1.55, 'fractionating column with glass beads', 1.62, 3.0, { h: 0.42 });
    callout(s, 1.75, 1.42, 1.6, 'reads 78 °C while ethanol distils', 1.53, cTop - 0.15, { h: 0.42 });
    callout(s, 2.55, 4.3, 1.4, 'ethanol + water', 1.95, 4.5);
    callout(s, 3.6, 5.0, 1.2, 'ethanol (first fraction)', 4.75, 4.5, { h: 0.42, align: 'right' });
    label(s, cd.in[0] - 0.4, cd.in[1] + 0.02, 0.8, 'water in', { size: 10, color: C.blue, bold: true, h: 0.22 });
    label(s, cd.out[0] - 0.45, cd.out[1] - 0.24, 0.9, 'water out', { size: 10, color: C.blue, bold: true, h: 0.22 });
    pbox(s, 2.6, 5.5, 1.75, 0.34, '**ethanol** boils at **78 °C**', C.white, '8DB04A', { size: 10, lw: 0.75 });
    pbox(s, 4.45, 5.5, 1.75, 0.34, '**water** boils at **100 °C**', C.white, WAT[1], { size: 10, lw: 0.75 });
  },
  head: 'Separating liquids',
  lines: [
    'Fractional distillation separates **miscible** liquids (liquids that mix) with **different boiling points**, e.g. ethanol and water.',
    'The column is **hottest at the bottom** and **coolest at the top**. Vapours condense and boil again many times on the glass beads.',
    'The liquid with the **lowest boiling point** reaches the top first and distils over.',
    'When the thermometer reading **rises**, change the receiver to collect the next **fraction**.',
    'Ethanol is **flammable**: heat with an electric mantle or water bath, **not** a flame.',
  ],
  size: 11,
  worked: { head: 'Worked example: order of fractions', q: 'Methanol boils at 65 °C, ethanol at 78 °C, water at 100 °C.',
    steps: [['Rule', 'lowest boiling point reaches the top of the column first'], ['Answer', '**methanol**, then **ethanol**, then **water**']], size: 10.5 },
  workedH: 1.4,
  qc: 'Propanone (**56 °C**) is mixed with water. Which liquid is collected **first**, and what will the thermometer read?',
  notes: 'QUICK CHECK ANSWER: Propanone is collected first; the thermometer reads about 56 °C while it distils, then rises towards 100 °C.\nIndustrial examples: fractional distillation of crude oil into fractions, and of liquid air into nitrogen and oxygen (recap only). GRADE 7–9 STRETCH: each condense–boil cycle enriches the vapour in the more volatile liquid; ethanol and water cannot be fully separated by distillation (the distillate is at most about 96% ethanol).\nCLEAPSS-style: ethanol HIGHLY FLAMMABLE, causes serious eye irritation; no naked flames; eye protection.',
}), 'C5.1.7 Fractional distillation');

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('C5.1.7')} • filtration, crystallisation and distillation`, [
  { q: 'Name the method used to separate **sand** from **water**. Explain why it works.', marks: 2, ms: 'Filtration (1); sand is insoluble / particles too large to pass through the filter paper, water passes through (1).' },
  { q: 'Explain why a salt solution is heated only to the **crystallisation point** and then left to cool, not boiled to dryness.', marks: 2, ms: 'Boiling to dryness can make the solid spit / decompose / lose water of crystallisation / gives tiny or impure crystals (1); cooling slowly lets larger, purer crystals form (1).' },
  { q: 'Describe how **simple distillation** obtains pure water from salt water.', marks: 2, ms: 'Water boils / evaporates and the salt is left in the flask (1); the vapour is cooled and condenses in the condenser and is collected (1).' },
  { q: 'Explain why **fractional** distillation, not simple distillation, is needed to separate **ethanol** from water.', marks: 2, ms: 'Both are liquids that mix / both evaporate / boiling points fairly close (78 and 100 °C) (1); the column lets them separate by repeated condensing and boiling, so the lower boiling ethanol reaches the top first (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 19 CHOOSING A PURIFICATION METHOD =======================
reg(D.contentSlide({
  title: 'Choosing a purification method',
  subtitle: `Specification ${sp('C5.1.8')} • suggest suitable techniques from information about the substances`,
  tag: 'C5.1.8', caption: 'decision chart: match the mixture to the method',
  draw: (s) => {
    pbox(s, 0.7, 1.5, 5.6, 0.42, '**What is in the mixture, and which part do you want?**', C.ink, C.ink, { size: 11, color: C.white });
    const rows = [
      ['insoluble solid in a liquid', 'filtration'],
      ['dissolved solid: want the **solid**', 'crystallisation'],
      ['dissolved solid: want the **liquid**', 'simple distillation'],
      ['liquids that mix, different boiling points', 'fractional distillation'],
      ['several dissolved substances, e.g. dyes', 'chromatography'],
    ];
    rows.forEach(([a, b], i) => {
      const y = 2.12 + i * 0.66;
      pbox(s, 0.7, y, 3.3, 0.52, a, C.cardBlue, C.line, { size: 10.5, lw: 0.75 });
      arrow(s, 4.05, y + 0.26, 4.35, y + 0.26, C.ink, 1.5);
      pbox(s, 4.4, y, 1.9, 0.52, `**${b}**`, i === 4 ? 'FBEFD9' : 'E9E1F5', i === 4 ? C.orange : C.blue, { size: 10.5, lw: 1 });
    });
    line(s, 0.55, 1.92, 0.55, 2.12 + 4 * 0.66 + 0.26, C.blue, 1.25);
    label(s, 0.7, 5.45, 5.6, 'Several steps may be needed, e.g. rock salt: **dissolve → filter → crystallise**', { size: 10.5, h: 0.3 });
  },
  head: 'Use the data',
  lines: [
    'Look at **solubility**: in water or in another solvent?',
    'Look at **melting** and **boiling points**: is it a solid or liquid at room temperature? How far apart are the boiling points?',
    'Decide **which part** you want to keep: the solid, the liquid, or every component.',
    'Check whether a substance **decomposes** on heating: then avoid strong heating.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: muddy sea water', q: 'Suggest how to obtain pure water from muddy sea water.',
    steps: [['Step 1', '**filter**: the mud is insoluble and stays on the paper'], ['Step 2', '**simple distillation** of the filtrate: water boils off and condenses'], ['Answer', 'pure water is the **distillate**, collected at 100 °C']], size: 10.5 },
  workedH: 1.7,
  qc: 'Which method separates: (a) **chalk** from water, (b) copper sulfate **crystals** from its solution, (c) the dyes in a **pen ink**?',
  notes: 'QUICK CHECK ANSWER: (a) filtration (chalk is insoluble); (b) crystallisation; (c) paper chromatography.\nC5.1.8 "suggest suitable purification techniques given information about the substances involved" (PAG3, PAG7 in J258 numbering; PAG C2, C3, C4 in Combined numbering). Exam questions give a table of melting points, boiling points and solubility: students should quote the data in their answer.',
}), 'C5.1.8 Choosing a purification method');

// ======================= 20 PAG C2 DISTILLATION =======================
{
  const s = D.contentHeader('Practical: distilling an ethanol–water mixture', `Specification ${sp('C5.1.7')} • PAG C2 distillation: temperature readings and fractions`, { pag: 'PAG C2', tag: 'PAG C2' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'graph plotted to scale from the readings (illustrative data)');
  const g = { x: 1.45, y: 1.55, w: 5.2, h: 2.85, xmin: 0, xmax: 20, ymin: 70, ymax: 105, xstep: 2, ystep: 5, minor: 2, xlabel: 'Volume of distillate collected / cm³', ylabel: 'Temperature / °C' };
  D.axes(s, g);
  box(s, D.px(g, 0), g.y, D.px(g, 12) - D.px(g, 0), g.h, 'E8F1D6', null, { tr: 30 });
  D.plotLine(s, g, VOL.map((v, i) => [v, TEMP[i]]), C.blue, 2); D.points(s, g, VOL.map((v, i) => [v, TEMP[i]]), C.ink);
  line(s, D.px(g, 12), g.y, D.px(g, 12), g.y + g.h, '5E7F2A', 1, { dash: 'dash' });
  label(s, D.px(g, 0.3), D.py(g, 74), 2.0, '**fraction 1**: mostly ethanol', { size: 10.5, color: '5E7F2A', align: 'left', h: 0.24 });
  label(s, D.px(g, 12.3), D.py(g, 76), 2.0, 'change receiver at **82 °C**', { size: 10.5, color: C.ink, align: 'left', h: 0.24 });
  const rows = [[HDR('V / cm³'), ...VOL.map(v => HDR(String(v)))], [tcell('T / °C', 0, { bold: true }), ...TEMP.map(t => tcell(String(t), 0))]];
  s.addTable(rows, { x: 0.7, y: 5.0, w: 6.1, colW: [0.88, ...VOL.map(() => 0.4745)], rowH: 0.24, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.card(s, 7.3, 1.3, 5.58, 2.95, 'Method and safety', [
    'Set up the fractional distillation apparatus (slide 17) with **50 cm³** of the mixture and anti-bumping granules.',
    'Heat **gently** with a heating mantle. Record the temperature every **2 cm³** of distillate.',
    'Change the receiver when the temperature **rises** above about 82 °C.',
    '**Safety**: ethanol is **HIGHLY FLAMMABLE**: no flames; eye protection; check the condenser hoses; never heat a sealed system.',
  ], { size: 11 });
  D.workedSteps(s, 7.3, 4.4, 5.58, 1.85, 'Worked example: size of fraction 1', 'Fraction 1 is collected below 82 °C.', [
    ['Read', 'temperature stays ≤ 82 °C up to **12 cm³**'], ['Answer', '12 ÷ 50 × 100 = **24%** of the mixture distils as fraction 1']], { size: 10.5 });
  D.quickCheck(s, 'Why does the temperature stay **almost constant** at first? Suggest **one** reason why fraction 1 still contains some **water**.');
  D.notes(s, 'QUICK CHECK ANSWER: While ethanol (the lower boiling liquid) is distilling, the vapour reaching the thermometer is mostly ethanol, so the temperature stays near its boiling point (78–80 °C). Some water evaporates too (water has a vapour pressure below 100 °C) and the column is not perfectly efficient / heating too fast pushes water vapour over; ethanol and water cannot be fully separated by distillation.\nPAG C2 Distillation (OCR Combined Science PAG list). Readings illustrative; asserted: temperature never falls; fraction 1 = 12 cm³ = 24% of 50 cm³. Errors: heating too fast (poor separation); thermometer bulb not at the side arm; reading the thermometer late. Improve: heat slowly; repeat; use a longer column.\nCLEAPSS-style: ethanol HIGHLY FLAMMABLE, causes serious eye irritation. A water bath can be used instead of a mantle.');
  reg(s, 'PAG C2 Distillation (results)');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('C5.1.7')}, ${sp('C5.1.8')} • choosing a method; the distillation practical`, [
  { q: 'Hexane boils at **69 °C** and octane at **126 °C**. They mix. Name the method to separate them and which is collected **first**.', marks: 2, ms: 'Fractional distillation (1); hexane first (lower boiling point) (1).' },
  { q: 'Suggest how to obtain dry **sand** and **salt crystals** from a mixture of the two.', marks: 2, ms: 'Add water, stir and filter: sand is the residue (dry it) (1); heat the filtrate to the crystallisation point and leave to cool / crystallise (1).' },
  { q: 'Use the graph on slide 20: at what temperature did most of fraction 1 distil? Name the liquid.', marks: 2, ms: 'About 78–80 °C (1); ethanol (1).' },
  { q: 'Explain why the ethanol–water mixture is heated with a **heating mantle**, not a Bunsen burner.', marks: 2, ms: 'Ethanol is (highly) flammable (1); its vapour could catch fire from a naked flame (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 22 PAG C4 METHOD =======================
reg(D.contentSlide({
  title: 'Practical: making copper sulfate crystals',
  subtitle: `Specification ${sp('C5.1.7')} • PAG C4 production of salts: filtration and crystallisation in use`,
  tag: 'PAG C4', pag: 'PAG C4', caption: 'the four stages; apparatus not to scale',
  draw: (s) => {
    const cells = [[0.65, 1.45], [3.55, 1.45], [0.65, 3.4], [3.55, 3.4]];
    cells.forEach(([x, y], i) => { box(s, x, y, 2.8, 1.85, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, x + 0.08, y + 0.05, 0.35, `**${i + 1}**`, { size: 12, color: C.blue, h: 0.28 }); });
    // 1 warm acid + excess CuO
    beaker(s, 1.15, 1.95, 1.0, 1.05, 0.6, CUSO4[0]);
    for (let i = 0; i < 9; i++) ball(s, 1.25 + i * 0.1, 2.93 - (i % 2) * 0.04, 0.04, CUO, CUO);
    line(s, 1.95, 1.75, 1.6, 2.85, '9AA3B0', 2.5);
    label(s, 2.25, 1.75, 1.2, 'add **CuO** until some is left over', { size: 10, h: 0.6, align: 'left', valign: 'top' });
    label(s, 0.75, 3.02, 2.6, 'warm dilute sulfuric acid', { size: 10, h: 0.25, italic: true });
    // 2 filter
    funnel(s, 4.4, 1.85, 0.9, 0.55, { residue: [CUO, CUO], drip: CUSO4[0], stem: 0.3 });
    conical(s, 4.4, 2.6, 0.9, 0.6, 0.4, CUSO4[0]);
    label(s, 5.0, 1.75, 1.3, '**filter** off excess CuO', { size: 10, h: 0.45, align: 'left', valign: 'top' });
    label(s, 3.65, 3.02, 2.6, 'filtrate: copper sulfate solution', { size: 10, h: 0.25, italic: true });
    // 3 evaporate
    beaker(s, 1.3, 4.35, 0.9, 0.55, 0.75, WAT[0]);
    basin(s, 1.75, 4.15, 1.1, 0.3, CUSO4[0]);
    [1.55, 1.75, 1.95].forEach(x => line(s, x, 4.05, x + 0.05, 3.78, 'B0B8C4', 1.25, { dash: 'sysDot' }));
    label(s, 2.35, 3.75, 1.05, 'heat to the **crystallisation point**', { size: 10, h: 0.6, align: 'left', valign: 'top' });
    label(s, 0.75, 4.97, 2.6, 'on a water bath', { size: 10, h: 0.25, italic: true });
    // 4 crystals
    oval(s, 4.4, 4.5, 1.3, 0.3, 'F4F4F4', '7D8794', { lw: 1 });
    [[4.05, 4.42], [4.3, 4.36], [4.55, 4.44], [4.78, 4.38], [4.2, 4.55], [4.62, 4.56]].forEach(([x, y]) => crystal(s, x, y, 0.11));
    label(s, 5.15, 3.75, 1.15, 'cool slowly, **filter**, pat **dry**', { size: 10, h: 0.6, align: 'left', valign: 'top' });
    label(s, 3.65, 4.97, 2.6, 'blue crystals of CuSO₄·5H₂O', { size: 10, h: 0.25, italic: true });
    eqn(s, 0.65, 5.4, 5.7, 'CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)', { size: 12, h: 0.42 });
  },
  head: 'Method',
  lines: [
    'Warm **25 cm³** of dilute sulfuric acid to about 50 °C (do **not** boil).',
    'Add copper(II) oxide a spatula at a time, stirring, until some black solid is **left over** (**excess**): all the acid has reacted.',
    '**Filter** to remove the excess copper(II) oxide.',
    'Heat the filtrate on a water bath to the **crystallisation point**, then leave to cool. Filter off the crystals and dry them.',
    '**Safety**: eye protection. Sulfuric acid (1.0 mol/dm³) **IRRITANT**. Copper(II) oxide and copper(II) sulfate **HARMFUL** if swallowed, eye irritant, toxic to aquatic life.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: mass of base reacted', q: '2.50 g of CuO was added. The dried excess had a mass of 0.51 g.',
    steps: [['Subtract', '2.50 − 0.51'], ['Answer', '**1.99 g** of copper(II) oxide reacted']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why is copper(II) oxide added in **excess**? Why is the excess removed by **filtration** and not by crystallisation?',
  notes: 'QUICK CHECK ANSWER: Excess makes sure all the sulfuric acid is used up, so the solution contains only copper sulfate and water (no acid left in the crystals); you can see when this happens because black solid remains. Copper(II) oxide is insoluble, so filtration separates it; crystallisation is for getting the dissolved salt out of the solution.\nPAG C4 Production of salts (OCR Combined Science PAG list; suggested activity: copper sulfate synthesis). The acid + base reaction itself is recap (C3 / C6 in J260); here the focus is the separation steps. Equations balanced in node: CuO + H₂SO₄ → CuSO₄ + H₂O; CuCO₃ + H₂SO₄ → CuSO₄ + H₂O + CO₂ (alternative insoluble base); CuSO₄ + 5H₂O → CuSO₄·5H₂O.\nCLEAPSS-style hazards: sulfuric acid 0.5–1.5 mol/dm³ IRRITANT (skin and serious eye irritation); copper(II) oxide HARMFUL if swallowed, very toxic to aquatic life (dispose of residues as solid waste, not down the sink); copper(II) sulfate pentahydrate HARMFUL if swallowed, causes skin and serious eye irritation, toxic to aquatic life. Wear eye protection; do not boil the acid; heat the evaporating basin over a water bath so the solution cannot spit.',
}), 'PAG C4 Making copper sulfate (method)');

// ======================= 23 PAG C4 RESULTS =======================
{
  const s = D.contentHeader('Practical: crystallisation results', `Specification ${sp('C5.1.7')} • PAG C4: why crystals form on cooling; masses and errors`, { pag: 'PAG C4', tag: 'PAG C4' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'solubility curve plotted to scale (approximate data-book values)');
  const g = { x: 1.45, y: 1.55, w: 5.2, h: 2.85, xmin: 0, xmax: 100, ymin: 0, ymax: 80, xstep: 20, ystep: 10, minor: 2, xlabel: 'Temperature / °C', ylabel: 'Solubility / g per 100 g water' };
  D.axes(s, g);
  const curve = []; for (let t = 0; t <= 100; t += 2) { // piecewise-linear through the data points
    const j = Math.min(4, Math.floor(t / 20)), [t0, s0] = SOL[j], [t1, s1] = SOL[j + 1]; curve.push([t, s0 + (s1 - s0) * (t - t0) / (t1 - t0)]); }
  D.plotLine(s, g, curve, CUSO4[1], 2.25); D.points(s, g, SOL, C.ink);
  line(s, D.px(g, 80), D.py(g, 55.0), D.px(g, 20), D.py(g, 55.0), C.red, 1, { dash: 'dash' });
  line(s, D.px(g, 20), D.py(g, 55.0), D.px(g, 20), D.py(g, 20.7), C.red, 1.5, { head: true });
  label(s, D.px(g, 21), D.py(g, 42), 1.6, '**34.3 g** crystallises', { size: 10.5, color: C.red, align: 'left', h: 0.24 });
  label(s, D.px(g, 44), D.py(g, 60), 1.5, 'cool 80 → 20 °C', { size: 10, color: C.red, align: 'left', h: 0.22 });
  const rows = [[HDR('CuO added / g'), HDR('dry excess CuO / g'), HDR('CuO reacted / g'), HDR('dry crystals / g')], [tcell('2.50', 0), tcell('0.51', 0), tcell('1.99', 0, { bold: true }), tcell('4.40', 0)]];
  s.addTable(rows, { x: 0.7, y: 5.0, w: 6.1, colW: [1.525, 1.525, 1.525, 1.525], rowH: 0.25, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 1.3, 5.58, 1.75, 'Worked example: crystals from cooling', 'A solution in 100 g of water is saturated at 80 °C and cooled to 20 °C.', [
    ['Read', 'solubility 55.0 g at 80 °C; 20.7 g at 20 °C'], ['Answer', '55.0 − 20.7 = **34.3 g** of copper sulfate crystallises']], { size: 10.5 });
  D.card(s, 7.3, 3.2, 5.58, 3.05, 'Conclusion and errors', [
    'Solubility **falls** as the solution cools, so the extra copper sulfate comes out as **crystals**.',
    'Some copper sulfate always **stays dissolved**, so the mass of crystals is less than expected.',
    '**Errors**: crystals still **wet** (mass too high); excess CuO not dried (reacted mass too low); solid lost on filter paper.',
    '**Improve**: dry to **constant mass**; rinse with a little cold water; cool slowly for larger crystals.',
  ], { size: 11 });
  D.quickCheck(s, 'Use the graph: at what temperature does 100 g of water dissolve **40 g**? What mass crystallises if a saturated solution is cooled from **100 °C to 20 °C**?');
  D.notes(s, 'QUICK CHECK ANSWER: 60 °C. 75.4 − 20.7 = 54.7 g (per 100 g of water; accept 54–55 g from the graph).\nSolubility values (g of CuSO₄ per 100 g water) are approximate data-book values: 0 °C 14.3, 20 °C 20.7, 40 °C 28.5, 60 °C 40.0, 80 °C 55.0, 100 °C 75.4. Calculations asserted. Masses in the table are illustrative; CuO reacted 2.50 − 0.51 = 1.99 g asserted. Percentage yield is NOT calculated here (it needs moles: C5.2 / C6, other decks).\nHeating the crystals strongly turns them white: CuSO₄·5H₂O → CuSO₄ + 5H₂O (balanced in node) — this is why we do not evaporate to dryness.');
  reg(s, 'PAG C4 Crystallisation (results)');
}

// ======================= 24 RECAP 6 =======================
const R6 = D.recapSlide(6, `Specification ${sp('C5.1.7')} • making a pure, dry salt`, [
  { q: 'Explain why copper(II) oxide is added in **excess** to the sulfuric acid.', marks: 2, ms: 'To make sure all the acid reacts / is used up (1); so the solution contains only copper sulfate (and water) / no acid in the product; the excess is easy to remove by filtering (1).' },
  { q: 'Name the method used to remove the excess copper(II) oxide, and the name of the solution that passes through.', marks: 2, ms: 'Filtration (1); filtrate (1).' },
  { q: 'Write a balanced symbol equation, with state symbols, for copper(II) oxide reacting with sulfuric acid.', marks: 2, ms: 'CuO + H₂SO₄ → CuSO₄ + H₂O correct formulae and balanced (1); state symbols (s), (aq), (aq), (l) (1).' },
  { q: 'Use the solubility curve: a saturated solution in 100 g of water is cooled from **60 °C** to **20 °C**. What mass crystallises?', marks: 2, ms: '40.0 − 20.7 (1); = 19.3 g (1). Accept 19–20 g from the graph.' },
]);
reg(R6.s, 'Recap 6');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Pure substance', 'Contains only one element or one compound.'],
  ['Mixture', 'Two or more substances not chemically joined; separable by physical methods.'],
  ['Formulation', 'A mixture designed as a useful product, each part in a measured amount.'],
  ['Melting point test', 'Pure: sharp, at the data-book value. Impure: lower and over a range.'],
  ['Chromatography', 'Separates soluble substances by their distribution between two phases.'],
  ['Stationary phase', 'The phase that does not move, e.g. the paper.'],
  ['Mobile phase', 'The phase that moves through the stationary phase: the solvent.'],
  ['Rf value', 'Distance moved by substance ÷ distance moved by solvent; between 0 and 1.'],
  ['Solvent front', 'The furthest point reached by the solvent; mark it at once.'],
  ['Locating agent', 'Sprayed on to make colourless spots visible, e.g. ninhydrin.'],
  ['Filtration', 'Separates an insoluble solid (residue) from a liquid (filtrate).'],
  ['Crystallisation', 'Getting a soluble solid from solution: evaporate some solvent, cool.'],
  ['Simple distillation', 'Separates a liquid from a solution by boiling and condensing.'],
  ['Fractional distillation', 'Separates miscible liquids with different boiling points.'],
  ['Condenser', 'Cools the vapour so it condenses; cold water enters at the bottom.'],
  ['Miscible', 'Liquids that mix completely, e.g. ethanol and water.'],
], { notes: 'Use as a cover-and-recall activity. No term here is Higher-only. Water of crystallisation (CuSO₄·5H₂O) is mentioned in the practical but is not a C5.1 statement.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A food scientist tests a green food colouring **G** with paper chromatography, and checks the **salt** used in a sweet factory.', [
  { l: 'a', q: 'Name the **stationary** phase and the **mobile** phase in paper chromatography.', marks: 2, ms: 'Stationary: paper (1); mobile: solvent / water (1).' },
  { l: 'b', q: 'One spot from G moved **3.0 cm**. The solvent front moved **7.5 cm**. Calculate its R~~f~~ value.', marks: 2, ms: '3.0 ÷ 7.5 (1); = 0.40 (1). No units.' },
  { l: 'c', q: 'G gave spots with R~~f~~ **0.40** and **0.75**. Allowed dyes: E102 (0.40), E133 (0.75). Banned dye Z: 0.55. What does this show?', marks: 2, ms: 'G is a mixture / not pure (two spots) (1); it contains E102 and E133 and not the banned dye Z (1).', h: 1.2 },
  { l: 'd', q: 'Explain how the scientist could check that a sample of E133 is **pure** using chromatography.', marks: 2, ms: 'Run it in two or more different solvents (1); a pure sample gives a single spot every time / matches the Rf of a pure reference (1).', h: 1.1 },
  { l: 'e', q: 'Pure sodium chloride melts at **801 °C**. The salt melts between **785 °C and 795 °C**. What does this show? Explain.', marks: 2, ms: 'The salt is impure (1); it melts below 801 °C / over a range of temperatures (1).', h: 1.1 },
  { l: 'f', q: 'The salt is contaminated with **sand**. Describe how to obtain **pure, dry** salt crystals.', marks: 3, ms: 'Dissolve in (warm) water and stir (1); filter to remove the sand (residue) (1); heat the filtrate to the crystallisation point / evaporate some water, leave to cool, then filter and dry the crystals (1).', h: 1.4 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Add water to the mixture (if needed) and stir so that all the salt dissolves; sand is insoluble.',
    'Filter: sand is the residue on the filter paper; rinse with a little water and dry it (warm oven / leave to dry) to get dry sand.',
    'The filtrate is salt solution. Split it into two portions (or use separate samples).',
    'Crystallisation: heat one portion on a water bath to the crystallisation point / evaporate some water, leave to cool, filter off and dry the salt crystals (do not boil to dryness).',
    'Simple distillation of the other portion: water boils, vapour condenses in a Liebig condenser (cold water in at the bottom), pure water collected as distillate; thermometer at the side arm reads 100 °C.',
    'Explains WHY each method works: insoluble vs soluble; boiling point of water far lower than salt; testing purity, e.g. water boils at exactly 100 °C.',
  ], {
    l3: 'Describes a correct sequence to obtain ALL THREE pure substances (filtration, crystallisation, distillation) AND explains why each method works.',
    l2: 'Describes methods for at least TWO of the substances in a sensible order, with some explanation.',
    l1: 'Names one or two suitable methods, e.g. "filter it" or "evaporate the water", with little explanation.',
  });
}
const HW = [
  { n: '1', q: 'State what is meant by a **formulation**.', marks: 1, ms: 'A mixture designed as a useful product (with components in measured amounts / each with a purpose) (1).' },
  { n: '2', q: 'A spot moves **2.7 cm**; the solvent front moves **9.0 cm**. Calculate the R~~f~~ value.', marks: 2, ms: '2.7 ÷ 9.0 (1); = 0.30 (1).' },
  { n: '3', q: 'Give **two** reasons why the baseline is drawn in **pencil** and kept **above** the solvent.', marks: 2, ms: 'Pencil (graphite) is insoluble so it does not run / separate (1); above the solvent so the spots do not dissolve into the solvent pool / wash off the paper (1).' },
  { n: '4', q: 'Inky water is distilled. What does the thermometer read while the distillate is collected? Why does cold water enter the condenser at the **bottom**?', marks: 2, ms: '100 °C (1); so the condenser jacket fills completely / cooling is more efficient (1).', h: 1.2 },
  { n: '5', q: 'Explain what a **locating agent** is and when one is needed.', marks: 2, ms: 'A chemical sprayed on the dried chromatogram that reacts to make spots coloured / visible (1); needed when the substances are colourless, e.g. amino acids with ninhydrin (1).' },
  { n: '6', q: 'Pure naphthalene melts at **80 °C**. Sample A melts at **80 °C**; sample B melts between **74 °C and 78 °C**. Which is pure? Explain.', marks: 2, ms: 'A is pure (1); it melts sharply at the data-book value, whereas B melts lower / over a range so is impure (1).', h: 1.2 },
  { n: '7', q: 'A mixture contains **sand**, **salt** and **water**. Describe how to obtain **dry sand**, **salt crystals** and **pure water** from it. Explain why each method works.', marks: 6, levels: true, h: 2.2, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. All questions are for both tiers.', HW, 17, { dividerSub: 'C5.1 Separation and purity • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5, R6].forEach(r => assert.strictEqual(r.total, 8));
// deck-specific: the C5.1 title is long, so widen every footer text box to keep it on one line
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C5.1') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
console.log(`${EQN.length} equations atom/charge-balanced`);
const out = path.join(__dirname, 'OCR21C_C5.1_SeparationPurity_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
