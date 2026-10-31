// build_C4_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C4 Material choices, C4.2 How do bonding and structure affect properties of materials?
// (one deck, Higher & Foundation; Part 2 of 4)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C4_2.js
// Structure copied from ../ocr-biology/build_B6_3.js. ocr_chem_template.js is NOT edited: lattice, chain, honeycomb,
// diamond, apparatus and equation-check helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_C4_2.md): J260 C4.2 = J258 C4.3 renumbered (J258 C4.2 "types of polymers" is separate science only).
// Taught: C4.2.1 bulk properties from bonds, bond strength vs intermolecular forces and arrangement (atoms do not have
// bulk properties); C4.2.2 bonds in polymers, chain length, cross-links; C4.2.3 giant covalent structures; C4.2.4 diamond
// and graphite. Ionic (C2), simple covalent (C2) and metallic (C3.1) bonding are recapped only; graphene / fullerenes are C4.3.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C4', chapterTitle: 'Material choices', code: 'C4.2', title: 'How do bonding and structure affect properties of materials?',
  part: 2, parts: 4, specRange: 'C4.2.1–C4.2.4',
  subtitle: 'How do bonding and structure affect properties of materials?',
  keywords: ['Bulk properties', 'Intermolecular forces', 'Polymers', 'Cross-links', 'Diamond', 'Graphite'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));
let DIA = null;
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;

// ======================= EQUATION ATOM-BALANCE CHECK =======================
const AR = { H: 1, C: 12, O: 16, Na: 23, Cl: 35.5, Si: 28, Mg: 24, Al: 27, Br: 80 };
function atoms(formula) { // e.g. 'C2H3Cl', '(C2H4)n' handled by caller
  const out = {};
  const re = /([A-Z][a-z]?)(\d*)/g; let m;
  while ((m = re.exec(formula))) { if (!m[1]) continue; out[m[1]] = (out[m[1]] || 0) + (m[2] ? +m[2] : 1); }
  return out;
}
function side(terms) { const t = {}; terms.forEach(([k, f]) => Object.entries(atoms(f)).forEach(([el, n]) => { t[el] = (t[el] || 0) + k * n; })); return t; }
function balanced(name, lhs, rhs) { assert.deepStrictEqual(side(lhs), side(rhs), `equation not balanced: ${name}`); return true; }
const Mr = f => Object.entries(atoms(f)).reduce((a, [el, n]) => a + AR[el] * n, 0);
balanced('C + O2 -> CO2', [[1, 'C'], [1, 'O2']], [[1, 'CO2']]);
balanced('Si + O2 -> SiO2', [[1, 'Si'], [1, 'O2']], [[1, 'SiO2']]);
balanced('2Na + Cl2 -> 2NaCl', [[2, 'Na'], [1, 'Cl2']], [[2, 'NaCl']]);
balanced('n C2H4 -> (C2H4)n, n = 5000', [[5000, 'C2H4']], [[1, 'C10000H20000']]);
balanced('2Mg + O2 -> 2MgO (recap)', [[2, 'Mg'], [1, 'O2']], [[2, 'MgO']]);
// Mg -> Mg2+ + 2e- : charge balance 0 = +2 - 2
calc('Mg charge balance', 0 - (2 - 2), 0);

// ======================= CALCULATIONS (asserted) =======================
// slide 5: same atoms, same product: carbon burns to CO2 (Ar C 12, O 16)
const mCO2 = calc('Mr CO2', Mr('CO2'), 44);
calc('12 g C -> 44 g CO2', 12 / 12 * mCO2, 44, 1e-9);
calc('6 g C -> 22 g CO2', 6 / 12 * mCO2, 22, 1e-9);
calc('QC 3 g C -> 11 g CO2', 3 / 12 * mCO2, 11, 1e-9);
// slide 8: melting points (approximate data-book values, °C)
const MP = [['CH₄', -182, 'sm'], ['H₂O', 0, 'sm'], ['poly(ethene)', 110, 'po'], ['NaCl', 801, 'io'], ['Cu', 1085, 'me'], ['SiO₂', 1710, 'gc'], ['diamond', 3550, 'gc']];
calc('NaCl − CH4', 801 - (-182), 983);
calc('QC SiO2 − NaCl', 1710 - 801, 909);
for (let i = 1; i < MP.length; i++) assert(MP[i][1] > MP[i - 1][1], 'melting points sorted ascending');
// slide 9: polymer Mr
const mrE = calc('Mr C2H4', Mr('C2H4'), 28);
calc('poly(ethene) 5000 units', mrE * 5000, 140000);
const mrV = calc('Mr C2H3Cl', Mr('C2H3Cl'), 62.5, 1e-9);
calc('PVC 2000 units', mrV * 2000, 125000, 1e-9);
// slide 10: alkane chain length vs melting point (approximate data-book values, °C)
const CN = [10, 20, 30, 40], CMP = [-30, 37, 66, 81];
calc('rise C10 → C20', CMP[1] - CMP[0], 67);
calc('rise C20 → C30', CMP[2] - CMP[1], 29);
calc('rise C30 → C40', CMP[3] - CMP[2], 15);
for (let i = 1; i < CN.length; i++) assert(CMP[i] > CMP[i - 1], 'mp rises with chain length');
assert(CMP[1] - CMP[0] > CMP[2] - CMP[1] && CMP[2] - CMP[1] > CMP[3] - CMP[2], 'rise gets smaller');
// slide 12: diamond and silica
calc('diamond bonds per atom 4 ÷ 2', 4 / 2, 2);
calc('stretch: 2 × 347 kJ', 2 * 347, 694);
calc('SiO2: O per Si = 4 ÷ 2', 4 / 2, 2);
// slide 13: graphite
calc('graphite bonds per atom 3 ÷ 2', 3 / 2, 1.5, 1e-12);
calc('graphite delocalised e per atom 4 − 3', 4 - 3, 1);
calc('QC graphite 10 atoms → 15 bonds', 10 * 1.5, 15, 1e-12);
// slide 14: metals
calc('10 Mg atoms → 20 delocalised e', 10 * 2, 20);
calc('QC 50 Al atoms → 150 delocalised e', 50 * 3, 150);
// slides 16–17: PVA + borax practical (illustrative)
const VOL = [0, 1, 2, 3, 4, 5];
const TR = [[2, 3, 4], [9, 11, 10], [22, 26, 24], [41, 44, 38], [61, 88, 63], [85, 89, 87]];
const ANOM = [4, 1]; // row 4 (4 cm³), trial 2 is anomalous
const MEANS = TR.map((r, i) => mean(r.filter((v, j) => !(i === ANOM[0] && j === ANOM[1]))));
[3, 10, 24, 41, 62, 87].forEach((m, i) => calc(`mean time ${VOL[i]} cm³`, MEANS[i], m, 1e-9));
for (let i = 1; i < MEANS.length; i++) assert(MEANS[i] > MEANS[i - 1], 'flow time rises with borax');
const unc5 = calc('uncertainty at 5 cm³ ±half range', (Math.max(...TR[5]) - Math.min(...TR[5])) / 2, 2);
calc('% uncertainty at 5 cm³', sf(unc5 / MEANS[5] * 100, 2), 2.3, 1e-12);
calc('total volume 25 + 5', 25 + 5, 30);
// least-squares quadratic through the means (line of best fit)
function quadFit(xs, ys) {
  const n = xs.length, S = k => xs.reduce((a, x) => a + x ** k, 0), Sy = k => xs.reduce((a, x, i) => a + x ** k * ys[i], 0);
  const M = [[n, S(1), S(2)], [S(1), S(2), S(3)], [S(2), S(3), S(4)]], v = [Sy(0), Sy(1), Sy(2)];
  // Gaussian elimination
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) { const f = M[j][i] / M[i][i]; for (let k = i; k < 3; k++) M[j][k] -= f * M[i][k]; v[j] -= f * v[i]; }
  const c = [0, 0, 0]; for (let i = 2; i >= 0; i--) { c[i] = (v[i] - M[i].slice(i + 1).reduce((a, m, k) => a + m * c[i + 1 + k], 0)) / M[i][i]; }
  return c;
}
const QF = quadFit(VOL, MEANS);
const qf = x => QF[0] + QF[1] * x + QF[2] * x * x;
VOL.forEach((x, i) => assert(Math.abs(qf(x) - MEANS[i]) < 3, 'quadratic fit within 3 s of each mean'));
calc('QC read graph at 2.5 cm³ (fit, 2 s.f.)', sf(qf(2.5), 2), 32, 1e-9);
// recaps, FQ, HW
calc('R4 mean (38 + 42 + 40) ÷ 3', (38 + 42 + 40) / 3, 40, 1e-9);
calc('R4 uncertainty (42 − 38) ÷ 2', (42 - 38) / 2, 2);
calc('R2 C30 − C10', 66 - (-30), 96);
calc('FQ A − B = 3550 − (−7)', 3550 - (-7), 3557);
const mrP = calc('HW Mr C3H6', Mr('C3H6'), 42);
calc('HW poly(propene) 3000 units', mrP * 3000, 126000);
balanced('HW Si + O2 -> SiO2', [[1, 'Si'], [1, 'O2']], [[1, 'SiO2']]);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_chem_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
function ion(s, cx, cy, r, fill, edge, t, size = 10, col = C.white) { ball(s, cx, cy, r, fill, edge, 1); if (t) label(s, cx - r, cy - r, 2 * r, t, { size, bold: true, color: col, h: 2 * r }); }
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: [...pts.map(([x, y]) => ({ x: x - x0, y: y - y0 })), { close: true }],
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1, dashType: o.dash } : { type: 'none' } });
}
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tcell = (t, i, o = {}) => ({ text: t, options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
function pbox(s, x, y, w, h, text, fill, edge, o = {}) {
  box(s, x, y, w, h, fill, edge, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1.25 });
  label(s, x + 0.06, y, w - 0.12, text, { size: o.size || 11, bold: o.bold, color: o.color || C.text, h, valign: 'middle' });
}
// colours for structure types
const CARB = ['4A4A55', '22222A'], NA = ['8E7CC3', '5B3A8C'], CL = ['7DBE6A', '3E7F2E'], SI = ['E0A458', '9A6420'], OX = ['D9534F', '8E2A27'];
const METAL = ['D7A15E', '8A5A2B'], ELEC = '2F7FC1', IMF = 'C8414C', XLINK = 'C8414C';
const TYPECOL = { sm: '7DBE6A', po: '8EC3E6', io: '8E7CC3', me: 'D7A15E', gc: '4A4A55' };
// ionic lattice (2D slice): alternating + and − ions
function ionicGrid(s, x0, y0, nx, ny, step, o = {}) {
  const r1 = o.r1 || step * 0.32, r2 = o.r2 || step * 0.45;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const neg = (i + j + (o.shift || 0)) % 2 === 1;
    const cx = x0 + i * step, cy = y0 + j * step;
    if (neg) ion(s, cx, cy, r2, CL[0], CL[1], o.labels === false ? '' : '−', 11, C.ink);
    else ion(s, cx, cy, r1, NA[0], NA[1], o.labels === false ? '' : '+', 11, C.white);
  }
}
// metallic lattice: positive ions in rows with delocalised electrons between
function metalGrid(s, x0, y0, nx, ny, step, o = {}) {
  const r = o.r || step * 0.4;
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) ion(s, x0 + i * step + (o.slip && j >= o.slipRow ? o.slip : 0), y0 + j * step, r, METAL[0], METAL[1], '+', 11, C.ink);
  // electrons in the gaps (deterministic scatter)
  for (let j = 0; j < ny - 0.5; j++) for (let i = 0; i < nx - 1; i++) {
    const dx = ((i * 7 + j * 3) % 5) / 10 - 0.2, dy = ((i * 3 + j * 5) % 4) / 10 - 0.15;
    const ex = x0 + (i + 0.5) * step + dx * step * 0.3 + (o.slip && j + 0.5 >= o.slipRow ? o.slip : 0), ey = y0 + (j + 0.5) * step + dy * step * 0.3;
    if (j + 0.5 < ny - 0.5 + 0.01) ball(s, ex, ey, 0.045, ELEC, '1B4F7A', 0.5);
  }
}
// simple molecules: diatomic pairs spaced apart (e.g. Cl2 / Br2)
function molecules(s, x0, y0, w, h, n = 6, col = CL) {
  const spots0 = [[0.15, 0.2, 20], [0.55, 0.15, -30], [0.85, 0.35, 60], [0.3, 0.6, -10], [0.7, 0.7, 35], [0.12, 0.85, 80], [0.48, 0.9, -50]];
  const spots = spots0.map(([a, b, c]) => [a, b, c]);
  spots.slice(0, n).forEach(([fx, fy, a]) => {
    const cx = x0 + fx * w, cy = y0 + fy * h, d = 0.15, rad = a * Math.PI / 180;
    const x1 = cx - d * Math.cos(rad), y1 = cy - d * Math.sin(rad), x2 = cx + d * Math.cos(rad), y2 = cy + d * Math.sin(rad);
    line(s, x1, y1, x2, y2, C.ink, 3);
    ball(s, x1, y1, 0.1, col[0], col[1], 1); ball(s, x2, y2, 0.1, col[0], col[1], 1);
  });
}
// silica 2D network: Si at grid points, O on each Si–Si edge
function silica2D(s, x0, y0, nx, ny, step) {
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const x = x0 + i * step, y = y0 + j * step;
    if (i < nx - 1) line(s, x, y, x + step, y, C.ink, 1.5);
    if (j < ny - 1) line(s, x, y, x, y + step, C.ink, 1.5);
    // dangling bonds at the edges show the network continues
    if (i === nx - 1) line(s, x, y, x + step * 0.45, y, C.ink, 1.5, { dash: 'dash' });
    if (j === ny - 1) line(s, x, y, x, y + step * 0.45, C.ink, 1.5, { dash: 'dash' });
  }
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
    const x = x0 + i * step, y = y0 + j * step;
    ion(s, x + step / 2, y, step * 0.13, OX[0], OX[1], '');
    ion(s, x, y + step / 2, step * 0.13, OX[0], OX[1], '');
  }
  for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) ion(s, x0 + i * step, y0 + j * step, step * 0.2, SI[0], SI[1], 'Si', 10, C.ink);
}
// diamond cluster projected to 2D: real diamond-cubic sites within radius R of the centre; bonds then atoms back-to-front
function diamond3D(s, ox, oy, size, o = {}) {
  const R = o.R || 0.72, sites = [];
  const base = [[0, 0, 0], [0, 0.5, 0.5], [0.5, 0, 0.5], [0.5, 0.5, 0]];
  for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = -1; c <= 1; c++) base.forEach(f => [0, 0.25].forEach(d => {
    const p = [f[0] + a + d, f[1] + b + d, f[2] + c + d];
    if (Math.hypot(p[0] - 0.25, p[1] - 0.25, p[2] - 0.25) <= R + 1e-9) sites.push(p);
  }));
  let atomsL = sites, bonds = [];
  for (let iter = 0; iter < 5; iter++) {
    bonds = [];
    for (let i = 0; i < atomsL.length; i++) for (let j = i + 1; j < atomsL.length; j++) {
      const p = atomsL[i], q = atomsL[j];
      if (Math.abs(Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]) - Math.sqrt(3) / 4) < 1e-6) bonds.push([p, q]);
    }
    const deg = p => bonds.filter(b => b[0] === p || b[1] === p).length;
    const keep = atomsL.filter(p => deg(p) >= 1);
    if (keep.length === atomsL.length) break; atomsL = keep;
  }
  const deg = p => bonds.filter(b => b[0] === p || b[1] === p).length;
  atomsL.forEach(p => assert(deg(p) <= 4, 'no carbon has more than 4 bonds'));
  assert(atomsL.some(p => deg(p) === 4), 'interior carbons have 4 bonds');
  const th = o.th == null ? 0.0 : o.th, ph = o.ph == null ? 0.4 : o.ph;
  const proj = ([x, y, z]) => {
    x -= 0.25; y -= 0.25; z -= 0.25;
    const x1 = x * Math.cos(th) + z * Math.sin(th), z1 = -x * Math.sin(th) + z * Math.cos(th);
    const y2 = y * Math.cos(ph) - z1 * Math.sin(ph), z2 = y * Math.sin(ph) + z1 * Math.cos(ph);
    return [ox + x1 * size, oy - y2 * size, z2];
  };
  bonds.forEach(([p, q]) => { const a = proj(p), b = proj(q); line(s, a[0], a[1], b[0], b[1], '5A5A66', 2); });
  atomsL.map(p => proj(p)).sort((a, b) => a[2] - b[2]).forEach(([x, y, z]) => ball(s, x, y, size * 0.05, z > 0 ? CARB[0] : '8A8A96', CARB[1], 0.75));
  return { bonds: bonds.length, atoms: atomsL.length, four: atomsL.filter(p => deg(p) === 4).length };
}
// honeycomb (graphite layer) in perspective: y squashed
function honeycomb(s, ox, oy, w, h, a, sq, o = {}) {
  const pts = [];
  const a1 = [Math.sqrt(3) * a, 0], a2 = [Math.sqrt(3) * a / 2, 1.5 * a];
  for (let i = -12; i <= 12; i++) for (let j = -6; j <= 6; j++) for (const bz of [[0, 0], [0, a]]) {
    const x = i * a1[0] + j * a2[0] + bz[0], y = j * a2[1] + bz[1];
    if (x >= -1e-6 && x <= w + 1e-6 && y >= -1e-6 && y <= h + 1e-6) pts.push([x, y]);
  }
  const P = ([x, y]) => [ox + x + y * (o.skew || 0), oy + y * sq];
  let nb = 0;
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    if (Math.abs(Math.hypot(pts[i][0] - pts[j][0], pts[i][1] - pts[j][1]) - a) < 1e-6) { const p = P(pts[i]), q = P(pts[j]); line(s, p[0], p[1], q[0], q[1], o.col || '4A4A55', 1.5); nb++; }
  }
  pts.forEach(p => { const q = P(p); ball(s, q[0], q[1], o.r || 0.04, CARB[0], CARB[1], 0.5); });
  return { pts: pts.map(P), nb };
}
// polymer chain: carbon zigzag with dots
function chain(s, x0, y0, n, dx, dy, col = '4A4A55', o = {}) {
  const pts = []; for (let i = 0; i <= n; i++) pts.push([x0 + i * dx, y0 + (i % 2 ? dy : 0) + (o.wave ? Math.sin(i / o.wave) * o.amp : 0)]);
  for (let i = 0; i < n; i++) line(s, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], col, o.lw || 2);
  if (o.dots !== false) pts.forEach(([x, y]) => ball(s, x, y, o.r || 0.04, CARB[0], CARB[1], 0.5));
  return pts;
}
// lab apparatus (front view)
function beaker(s, x, y, w, h, fill = 'EAF2F8', level = 0.55, liq = 'F4F0FA') {
  box(s, x, y + h * (1 - level), w, h * level, liq, null);
  line(s, x, y, x, y + h, '6B7385', 1.5); line(s, x + w, y, x + w, y + h, '6B7385', 1.5); line(s, x, y + h, x + w, y + h, '6B7385', 1.5);
  line(s, x - 0.06, y, x, y + 0.06, '6B7385', 1.5);
}
function cylinder(s, x, y, w, h, level = 0.6, liq = 'DDEFF7') {
  box(s, x, y + h * (1 - level), w, h * level, liq, null);
  line(s, x, y, x, y + h, '6B7385', 1.25); line(s, x + w, y, x + w, y + h, '6B7385', 1.25);
  box(s, x - 0.12, y + h, w + 0.24, 0.07, '6B7385', null);
  for (let i = 1; i < 8; i++) line(s, x, y + i * h / 8, x + w * (i % 2 ? 0.3 : 0.5), y + i * h / 8, '6B7385', 0.75);
}
function stopwatch(s, cx, cy, r) {
  box(s, cx - 0.05, cy - r - 0.1, 0.1, 0.1, '6B7385', null);
  ball(s, cx, cy, r, C.white, '4A5568', 1.5);
  line(s, cx, cy, cx, cy - r * 0.75, C.red, 1.5); line(s, cx, cy, cx + r * 0.5, cy + r * 0.2, C.ink, 1.5);
}

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'Bonding and properties',
    footer: 'OCR J260 Combined Science B • C4.2 How do bonding and structure affect properties of materials? • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • bulk properties, polymers, giant covalent, diamond and graphite` },
      { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statement found • stretch marked' },
      { icon: '▲', text: 'Practical: cross-linking PVA slime • melting-point data • chain length graph' },
    ],
    notes: 'C4.2 How do bonding and structure affect properties of materials? is Part 2 of 4 in J260 Chapter C4 Material choices (C4.1 data to choose materials, C4.2 bonding and structure, C4.3 nanoparticles, C4.4 end of life / life cycle).\nNumbering: in J258 (Chemistry B, separate science) this sub-topic is C4.3, because J258 has an extra C4.2 "What are the different types of polymers?" (addition / condensation / natural polymers), which is separate science only. Evidence: OCR J260 Advance Information June 2022; RSC Education lesson plan (C4.2 heading); docbrown combined page; SPEC_C4_1.md. See SPEC_C4_2.md.\nThe statement wording is reconstructed from search extracts (exact J260 text not seen). No Higher-only statement was found; the bond-energy calculation on slide 12 is marked GRADE 7–9 STRETCH.',
  });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C4.2.1', text: 'Explain why **bulk properties** come from **bonds** and **structure**, not from the atoms themselves.' },
  { code: 'C4.2.1', text: 'Compare **ionic**, **simple molecular**, **giant covalent** and **metallic** structures (recap C2, C3).' },
  { code: 'C4.2.1', text: 'Explain melting points using **bond strength** versus **intermolecular forces**.' },
  { code: 'C4.2.2', text: 'Describe the bonds **in** and **between** polymer chains.' },
  { code: 'C4.2.2', text: 'Explain how **chain length** and **cross-links** change a polymer\'s properties.' },
  { code: 'C4.2.3', text: 'Describe **giant covalent** structures: diamond and silicon dioxide.' },
  { code: 'C4.2.4', text: 'Explain the properties and uses of **diamond** and **graphite**.' },
  { code: 'C4.2.1', text: 'Explain **malleability**, **brittleness** and **conductivity** of metals and ionic solids.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (reconstructed from search extracts; J258 C4.3 renumbered for J260 C4.2; see SPEC_C4_2.md):\nC4.2.1 explain how the bulk properties of materials (including strength, melting point, electrical and thermal conductivity, brittleness, flexibility, hardness and malleability) are related to the different types of bonds they contain, their bond strengths in relation to intermolecular forces and the ways in which their bonds are arranged, recognising that the atoms themselves do not have these properties (RSC extract; medium–high)\nC4.2.2 describe the nature and arrangement of chemical bonds in polymers (code UNVERIFIED)\nC4.2.3 describe the nature and arrangement of chemical bonds in giant covalent structures (code UNVERIFIED)\nC4.2.4 explain the properties of diamond and graphite in terms of their structures and bonding (code UNVERIFIED)\nNo statement found in bold (HT). Ideas about Science: models and their limitations.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C4 Material choices • C4.2 is Part 2 of 4 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C4.2.1', 'Properties come from bonds, not atoms', 'Both tiers', C.blue],
    ['C4.2.1', 'Bonds versus intermolecular forces', 'Both tiers', C.blue],
    ['C4.2.2', 'Polymers: chains, chain length, cross-links', 'Both tiers', C.blue],
    ['C4.2.3–4', 'Giant covalent: diamond, silica, graphite', 'Both tiers', C.blue],
    ['C4.2.1', 'Metals and ionic solids: malleable or brittle', 'Both tiers', C.blue],
    ['Practical', 'Cross-linking PVA slime', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C4.2\nBonding and properties', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C1 states of matter • C2 ionic and covalent bonding • C3.1 metallic bonding • C4.1 property data', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C4 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'C4.1 How is data used to choose a material for a particular use?',
      '**C4.2 How do bonding and structure affect properties of materials?** (this deck)',
      'C4.3 Why are nanoparticles so useful?',
      'C4.4 What happens to products at the end of their useful life?',
    ], { size: 11, color: 'E9E1F7', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'No Higher-only statement was found for C4.2: teach every slide to both tiers. The **GRADE 7–9 STRETCH** pill marks extension.',
      'Ideas about Science: **models** (ball-and-stick, 2D drawings) and their **limitations**.',
      'Maths: reading **data tables** and **bar charts**, **means**, **uncertainty**, relative formula mass **Mr**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C4 has four sub-topics (OCR J260 Advance Information June 2022 lists C4.1–C4.4). J258 Chemistry B has five: its C4.2 "What are the different types of polymers?" is separate science only, so J258 C4.3 (bonding and structure) becomes J260 C4.2.\nOverlap control: ionic and simple covalent bonding (C2) and metallic bonding (C3.1) are recapped, then USED to explain bulk properties (C4.2.1). Addition polymerisation appears as a one-line recap only; condensation and natural polymers are J258 only and are not taught. Graphene, fullerenes and nanotubes belong to C4.3 (nanoparticles) and are only named. Choosing materials from data is C4.1.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C1 • states of matter', q: 'Name the change of state from **solid** to **liquid**. What happens to the **particles** and the forces between them?' },
  { from: 'C2 • ionic bonding', q: 'Sodium reacts with chlorine. What **ions** form? What holds the ions together in **sodium chloride**?' },
  { from: 'C2 • covalent bonding', q: 'What is a **covalent bond**? How many covalent bonds does a **carbon** atom usually form?' },
  { from: 'C3.1 • metals', q: 'Describe the structure of a **metal**. What are **delocalised electrons**?' },
  { from: 'C2 • formulae and Mr', q: 'How many atoms are in one molecule of **C₂H₄**? Calculate its **Mr** (C = 12, H = 1).' },
  { from: 'C4.1 • properties', q: 'What do the words **hardness**, **strength** and **flexibility** mean when describing a material?' },
], { subtitle: 'Recall from C1, C2, C3 and C4.1 • 6 minutes • no notes', notes: 'ANSWERS\n1. Melting. Particles gain energy, vibrate more, and some forces between particles are overcome so particles can move past each other (stay close together).\n2. Na⁺ and Cl⁻ ions (sodium loses one electron, chlorine gains one). Strong electrostatic attraction between oppositely charged ions in all directions: an ionic lattice. 2Na(s) + Cl₂(g) → 2NaCl(s).\n3. A shared pair of electrons between two atoms (non-metals). Carbon forms 4 covalent bonds.\n4. A giant lattice of positive metal ions in a "sea" of delocalised electrons; the electrons are free to move through the whole structure and attract the positive ions (metallic bonding).\n5. 6 atoms (2 C + 4 H). Mr = 2 × 12 + 4 × 1 = 28.\n6. Hardness: resistance to scratching / denting. Strength: force needed to break it (in tension or compression). Flexibility: able to bend without breaking (C4.1 recap only; property data are C4.1).' }), 'Retrieval starter');

// ======================= 5 BONDS NOT ATOMS =======================
reg(D.contentSlide({
  title: 'Properties come from bonds, not atoms',
  subtitle: `Specification ${sp('C4.2.1')} • bulk properties belong to the whole material`,
  tag: 'C4.2.1', caption: 'one carbon atom and two carbon materials; models, not to scale',
  draw: (s) => {
    ball(s, 1.2, 2.55, 0.32, CARB[0], CARB[1], 1);
    label(s, 0.88, 2.39, 0.64, 'C', { size: 14, bold: true, color: C.white, h: 0.32 });
    label(s, 0.55, 2.95, 1.35, '**one carbon atom**', { size: 10.5, h: 0.25 });
    label(s, 0.55, 3.2, 1.35, 'not hard, not soft, not shiny, does not conduct', { size: 10, italic: true, color: C.grey, h: 0.62, valign: 'top' });
    arrow(s, 1.65, 2.3, 2.55, 1.95, C.ink, 1.75); arrow(s, 1.65, 2.8, 2.55, 3.55, C.ink, 1.75);
    // diamond
    diamond3D(s, 3.55, 2.45, 1.45);
    label(s, 4.45, 1.5, 1.95, '**Diamond**', { size: 11.5, align: 'left', h: 0.28 });
    label(s, 4.45, 1.8, 1.95, 'every C bonded to **4** others in 3D: very hard, does not conduct', { size: 10, align: 'left', valign: 'top', h: 0.8 });
    // graphite: two layers
    honeycomb(s, 2.7, 3.5, 1.5, 0.9, 0.22, 0.5, { skew: 0, r: 0.03 });
    honeycomb(s, 2.7 + 0.19, 4.1, 1.5, 0.9, 0.22, 0.5, { skew: 0, r: 0.03 });
    [[3.1, 3.75], [3.75, 3.75]].forEach(([x, y]) => line(s, x, y, x + 0.05, y + 0.42, IMF, 1, { dash: 'dash' }));
    label(s, 4.75, 3.45, 1.7, '**Graphite**', { size: 11.5, align: 'left', h: 0.28 });
    label(s, 4.75, 3.75, 1.7, 'layers of C bonded to **3** others: soft, slippery, conducts', { size: 10, align: 'left', valign: 'top', h: 0.8 });
    // equation band
    box(s, 0.7, 4.95, 5.6, 0.8, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    label(s, 0.8, 4.98, 5.4, 'Both are **carbon**: both burn to give the same product', { size: 10.5, h: 0.3 });
    label(s, 0.8, 5.3, 5.4, '**C(s) + O₂(g) → CO₂(g)**', { size: 13, color: C.blue, h: 0.38 });
  },
  head: 'Bulk properties',
  lines: [
    'A **bulk property** belongs to a large piece of material: **strength**, **hardness**, **melting point**, **electrical** and **thermal conductivity**, **brittleness**, **flexibility**, **malleability**.',
    'A single atom does **not** have these properties. They come from:',
    '1  the **type of bonds** (ionic, covalent, metallic);',
    '2  how **strong** the bonds are compared with the **forces between molecules**;',
    '3  how the bonds are **arranged** (chains, layers, 3D network).',
    'Same atoms, different structure → different properties (diamond and graphite).',
  ],
  size: 11.5,
  worked: { head: 'Worked example: same atoms, same product', q: '6 g of diamond burns completely. What mass of CO₂ forms? (C = 12, O = 16)',
    steps: [['Mr', 'CO₂ = 12 + 2 × 16 = 44'], ['Ratio', '12 g C gives 44 g CO₂'], ['Answer', '6 g gives 44 × 6 ÷ 12 = **22 g** (the same for graphite)']], size: 10.5 },
  workedH: 1.5,
  qc: 'Why does it make no sense to say "a carbon atom is hard"? What mass of CO₂ forms when **3 g** of graphite burns?',
  notes: 'QUICK CHECK ANSWER: Hardness is a bulk property of a large collection of bonded atoms; it depends on how the atoms are bonded and arranged, and one atom on its own has no bonds to resist scratching. 3 g × 44 ÷ 12 = 11 g CO₂.\nEquation atom balance asserted in node (C 1 = 1, O 2 = 2). The diamond cell is drawn from real diamond-cubic coordinates (cluster of real diamond-cubic sites; no carbon has more than 4 bonds and interior carbons have exactly 4: asserted). Models: ball-and-stick drawings exaggerate the gaps between atoms (limitation of the model).',
}), 'C4.2.1 Properties come from bonds, not atoms');

// ======================= 6 FOUR STRUCTURES =======================
{
  const s = D.contentHeader('Four types of structure', `Specification ${sp('C4.2.1')} • particles, bonds and arrangement (recap of C2 and C3.1)`, { tag: 'C4.2.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'four structure models; not to scale');
  const cells = [[0.65, 1.45, 'Ionic lattice', 'NaCl'], [3.55, 1.45, 'Simple molecules', 'Br₂, H₂O, CH₄'], [0.65, 3.7, 'Giant covalent', 'SiO₂, diamond'], [3.55, 3.7, 'Metallic lattice', 'Cu, Al, Fe']];
  cells.forEach(([x, y, t, e]) => {
    box(s, x, y, 2.75, 2.1, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, x + 0.08, y + 0.04, 2.6, `**${t}**  e.g. ${e}`, { size: 10.5, color: C.ink, h: 0.28, align: 'left' });
  });
  ionicGrid(s, 1.0, 2.0, 5, 4, 0.42, { r1: 0.13, r2: 0.18 });
  molecules(s, 3.75, 1.85, 2.4, 1.55, 7, ['B5523B', '6E2A1C']);
  silica2D(s, 0.95, 4.25, 4, 3, 0.48);
  metalGrid(s, 3.9, 4.2, 5, 4, 0.42, { r: 0.15 });
  label(s, 0.65, 5.83, 5.7, 'Si (orange) and O (red) in silicon dioxide', { size: 10, italic: true, color: C.grey, h: 0.1, align: 'left' });
  const rows = [[HDR('Structure'), HDR('Bonds'), HDR('Typical properties')],
    [tcell('Ionic', 0, { bold: true }), tcell('+ and − ions; strong attraction in all directions', 0), tcell('high m.p.; brittle; conducts only molten or dissolved', 0)],
    [tcell('Simple molecular', 1, { bold: true }), tcell('strong covalent bonds **in** molecules; **weak** forces **between**', 1), tcell('low m.p. and b.p.; soft; does not conduct', 1)],
    [tcell('Giant covalent', 0, { bold: true }), tcell('every atom joined by covalent bonds in a huge network', 0), tcell('very high m.p.; hard; usually does not conduct', 0)],
    [tcell('Metallic', 1, { bold: true }), tcell('+ ions in a sea of **delocalised** electrons', 1), tcell('high m.p.; malleable; conducts heat and electricity', 1)]];
  rows.forEach(r => r.forEach(c => { c.text = c.text.replace(/\*\*/g, ''); }));
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.35, 2.43, 2.3], rowH: [0.3, 0.55, 0.55, 0.55, 0.55], fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 4.0, 6.08, 1.5, 'Worked example: identify the structure', 'Substance X melts at 1600 °C. It does not conduct when solid or when molten.', [
    ['High m.p.', 'many strong bonds must break: a **giant** structure'], ['No conduction', 'not a metal (solid) and not ionic (molten)'], ['Answer', 'X is **giant covalent** (e.g. silicon dioxide)']], { size: 10.5 });
  D.card(s, 6.8, 5.62, 6.08, 0.63, null, ['**Exception**: graphite is giant covalent but **conducts** (slide 13).'], { size: 11 });
  D.quickCheck(s, 'Y melts at **−7 °C** and does not conduct. Z conducts when **solid** and can be hammered flat. Name the structure of Y and Z.');
  D.notes(s, 'QUICK CHECK ANSWER: Y: simple molecular (low melting point: only weak intermolecular forces to overcome; no ions or free electrons), e.g. bromine (m.p. −7 °C). Z: metallic (delocalised electrons carry charge; layers of ions can slide).\nThis slide recaps C2 (ionic, covalent) and C3.1 (metallic) and links each to bulk properties, which is the C4.2.1 requirement. Ionic equation recap: 2Na(s) + Cl₂(g) → 2NaCl(s) (balance asserted). Graphite is the main exception to "giant covalent does not conduct" (slide 13). The 2D silica drawing keeps the 1 : 2 ratio of Si : O (used on slide 12). Limitation: 2D models cannot show the real 3D tetrahedral arrangement.');
  reg(s, 'C4.2.1 Four types of structure');
}

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C4.2.1')} • bonds, structure and bulk properties`, [
  { q: 'Diamond and graphite both contain only **carbon** atoms. Explain why they have **different** properties.', marks: 2, ms: 'The atoms are bonded / arranged differently (1); diamond: each C bonded to 4 others in a 3D network, graphite: each C bonded to 3 in layers (1).' },
  { q: 'A solid melts at **1610 °C** and does not conduct electricity when solid or molten. Name its type of structure and give a reason.', marks: 2, ms: 'Giant covalent (1); high melting point so many strong (covalent) bonds broken AND no ions / free electrons so does not conduct (1).' },
  { q: 'Write a balanced equation, with **state symbols**, for carbon burning completely in oxygen.', marks: 2, ms: 'C + O₂ → CO₂ (1); state symbols (s), (g), (g) (1).' },
  { q: 'Calculate the mass of carbon dioxide made when **6 g** of carbon burns completely. (C = 12, O = 16)', marks: 2, ms: 'Mr CO₂ = 44 / 12 g → 44 g (1); 6 × 44 ÷ 12 = 22 g (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 BONDS VS INTERMOLECULAR FORCES =======================
{
  const s = D.contentHeader('Bonds versus intermolecular forces', `Specification ${sp('C4.2.1')} • bond strength compared with the forces between molecules`, { tag: 'C4.2.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'bar chart drawn to scale from approximate data-book melting points');
  const g = { x: 1.35, y: 1.5, w: 5.0, h: 3.35, xmin: 0, xmax: 7, ymin: -500, ymax: 4000, xstep: 7, ystep: 500, minor: 1, ylabel: 'Melting point / °C', fmt: () => '', yfmt: v => String(v).replace('-', '−') };
  D.axes(s, g);
  line(s, g.x, D.py(g, 0), g.x + g.w, D.py(g, 0), C.ink, 1);
  MP.forEach(([n, v, t], i) => {
    const cx = D.px(g, i + 0.5), bw = 0.42;
    const y1 = D.py(g, Math.max(v, 0)), y2 = D.py(g, Math.min(v, 0));
    box(s, cx - bw / 2, y1, bw, Math.max(y2 - y1, 0.02), TYPECOL[t], C.ink, { lw: 0.75 });
    label(s, cx - 0.36, v >= 0 ? y1 - 0.22 : y2 + 0.01, 0.72, String(v).replace('-', '−'), { size: 10, bold: true, h: 0.2 });
    label(s, cx - 0.37, g.y + g.h + 0.04, 0.74, n === 'poly(ethene)' ? 'poly-\n(ethene)' : n, { size: 10, h: 0.38, valign: 'top' });
  });
  const leg = [['sm', 'simple molecular'], ['po', 'polymer'], ['io', 'ionic'], ['me', 'metal'], ['gc', 'giant covalent']];
  leg.forEach(([k, t], i) => { const x = 0.75 + i * 1.15; box(s, x, 5.42, 0.2, 0.2, TYPECOL[k], C.ink, { lw: 0.5 }); label(s, x + 0.24, 5.4, 0.92, t, { size: 10, align: 'left', h: 0.24 }); });
  D.card(s, 6.8, 1.3, 6.08, 2.95, 'What has to be overcome when it melts?', [
    '**Simple molecules**: the covalent bonds **inside** each molecule are strong, but the **intermolecular forces** between molecules are **weak**. Melting or boiling only overcomes these weak forces: **low** melting points.',
    '**Giant** structures (ionic, giant covalent, metallic): melting must break **many strong bonds**: **high** melting points.',
    '**Polymers** are in between: chains are long, so the forces between them add up.',
  ], { size: 12 });
  D.workedSteps(s, 6.8, 4.4, 6.08, 1.85, 'Worked example: reading the chart', 'How much higher is the melting point of NaCl than CH₄?', [
    ['Values', 'NaCl 801 °C; CH₄ −182 °C'], ['Subtract', '801 − (−182) = 801 + 182'], ['Answer', '**983 °C** higher']], { size: 10.5 });
  D.quickCheck(s, 'When water **boils**, are the O–H bonds broken? Explain. How much higher is the melting point of SiO₂ than NaCl?');
  D.notes(s, 'QUICK CHECK ANSWER: No. Boiling separates whole H₂O molecules by overcoming the weak intermolecular forces; the strong covalent O–H bonds inside each molecule stay intact (steam is still H₂O). 1710 − 801 = 909 °C.\nData: approximate data-book values (CH₄ −182, H₂O 0, NaCl 801, Cu 1085, SiO₂ about 1710, diamond about 3550 °C; diamond actually changes to graphite / sublimes at about this temperature). Poly(ethene) has no sharp melting point: it softens over a range (LDPE about 105–115 °C); 110 is shown as a typical value. Ascending order and 983 / 909 asserted in node.\nCommon misconception: "covalent bonds break when a simple molecular substance melts".');
  reg(s, 'C4.2.1 Bonds versus intermolecular forces');
}

// ======================= 9 POLYMERS =======================
reg(D.contentSlide({
  title: 'Polymers: bonds in and between chains',
  subtitle: `Specification ${sp('C4.2.2')} • the nature and arrangement of bonds in polymers`,
  tag: 'C4.2.2', caption: 'poly(ethene): one chain (top) and many tangled chains (bottom); not to scale',
  draw: (s) => {
    // structural formula of poly(ethene) repeat unit
    const y = 1.95, x0 = 0.95, dx = 0.7;
    for (let i = 0; i < 7; i++) {
      const x = x0 + i * dx;
      label(s, x - 0.15, y - 0.15, 0.3, 'C', { size: 13, bold: true, h: 0.3 });
      label(s, x - 0.15, y - 0.68, 0.3, 'H', { size: 12, h: 0.3 }); line(s, x, y - 0.38, x, y - 0.16, C.ink, 1.25);
      label(s, x - 0.15, y + 0.38, 0.3, 'H', { size: 12, h: 0.3 }); line(s, x, y + 0.16, x, y + 0.38, C.ink, 1.25);
      if (i < 6) line(s, x + 0.15, y, x + dx - 0.15, y, C.ink, 1.25);
    }
    line(s, x0 - 0.45, y, x0 - 0.15, y, C.ink, 1.25, { dash: 'dash' }); line(s, x0 + 6 * dx + 0.15, y, x0 + 6 * dx + 0.45, y, C.ink, 1.25, { dash: 'dash' });
    // repeat-unit brackets around atoms 2–3
    const bx1 = x0 + 1.5 * dx, bx2 = x0 + 3.5 * dx;
    [bx1, bx2].forEach((bx, k) => { line(s, bx, y - 0.62, bx, y + 0.62, C.red, 1.75); line(s, bx, y - 0.62, bx + (k ? -0.08 : 0.08), y - 0.62, C.red, 1.75); line(s, bx, y + 0.62, bx + (k ? -0.08 : 0.08), y + 0.62, C.red, 1.75); });
    label(s, bx2 + 0.03, y + 0.45, 0.18, 'n', { size: 12, bold: true, color: C.red, h: 0.25 });
    label(s, 0.65, 2.75, 5.7, '**repeat unit** –CH₂–CH₂–   • strong **covalent** bonds along the chain', { size: 10.5, h: 0.28 });
    line(s, 0.65, 3.12, 6.35, 3.12, C.line, 1, { dash: 'dash' });
    // tangled chains
    const ys = [3.45, 3.85, 4.25, 4.65];
    ys.forEach((yy, i) => chain(s, 0.85 + (i % 2) * 0.12, yy, 18, 0.28, 0.16, ['4A4A55', '5B3A8C', '2F6B8F', '6B4F2A'][i], { wave: 2.5 + i, amp: 0.05, r: 0.035 }));
    [[1.5, 3.62], [2.7, 4.02], [3.9, 3.62], [4.6, 4.42], [2.1, 4.42], [5.4, 4.02]].forEach(([x, yy]) => line(s, x, yy, x, yy + 0.2, IMF, 1.25, { dash: 'sysDot' }));
    label(s, 0.65, 4.95, 5.7, 'red dotted lines: **weak intermolecular forces** between chains', { size: 10.5, color: IMF, h: 0.28 });
    label(s, 0.65, 5.25, 5.7, 'n C₂H₄(g) → (C₂H₄)ₙ(s)   (addition polymerisation, recap only)', { size: 10.5, italic: true, color: C.grey, h: 0.28 });
  },
  head: 'Bonds in polymers',
  lines: [
    'A **polymer** is a very long molecule made of many repeating units joined by **strong covalent bonds**.',
    '**Between** chains there are only **weak intermolecular forces**. But chains are long and touch at many points, so the forces add up: polymers are **solids** at room temperature.',
    'Chains can **slide** past each other: many polymers are **flexible** and **soften** when heated.',
    'All the electrons are held in covalent bonds: **no** free electrons or ions, so polymers **do not conduct** (good insulators).',
  ],
  size: 12,
  worked: { head: 'Worked example: Mr of a polymer chain', q: 'A poly(ethene) chain has 5000 repeat units of C₂H₄. (C = 12, H = 1)',
    steps: [['Repeat unit', 'Mr = 2 × 12 + 4 × 1 = 28'], ['Multiply', '28 × 5000'], ['Answer', 'Mr = **140 000**']], size: 10.5 },
  workedH: 1.5,
  qc: 'Why are plastics used to coat electrical wires? PVC has the repeat unit **C₂H₃Cl** (Cl = 35.5). Find Mr for **2000** repeat units.',
  notes: 'QUICK CHECK ANSWER: Polymers do not conduct electricity (no delocalised electrons or ions: all electrons are in covalent bonds), so they insulate; also flexible. Mr C₂H₃Cl = 24 + 3 + 35.5 = 62.5; × 2000 = 125 000.\nAtom balance of n C₂H₄ → (C₂H₄)ₙ asserted for n = 5000. The chemistry of addition and condensation polymerisation is J258 C4.2 (separate science only), so it is recapped in one line here. Real chains have thousands of carbon atoms and are coiled in 3D; the drawing is a 2D model (limitation).',
}), 'C4.2.2 Polymers: bonds in and between chains');

// ======================= 10 CHAIN LENGTH AND CROSS-LINKS =======================
reg(D.contentSlide({
  title: 'Chain length and cross-links',
  subtitle: `Specification ${sp('C4.2.2')} • changing the structure changes the properties`,
  tag: 'C4.2.2', caption: 'graph to scale (approximate data-book values); chain models not to scale',
  draw: (s) => {
    const g = { x: 1.35, y: 1.55, w: 4.85, h: 1.9, xmin: 0, xmax: 45, ymin: -40, ymax: 100, xstep: 5, ystep: 20, minor: 1, xlabel: 'Number of carbon atoms in the chain', ylabel: 'M.p. / °C' };
    D.axes(s, g);
    line(s, g.x, D.py(g, 0), g.x + g.w, D.py(g, 0), C.grey, 0.75, { dash: 'dash' });
    const pts = CN.map((n, i) => [n, CMP[i]]);
    // smooth curve through the points (monotone interpolation)
    const sm = []; for (let i = 0; i < pts.length - 1; i++) for (let k = 0; k < 10; k++) { const t = k / 10, a = pts[i], b = pts[i + 1]; sm.push([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * (t * (2 - t) * 0.35 + t * 0.65)]); }
    sm.push(pts[pts.length - 1]);
    D.plotLine(s, g, sm, C.blue, 2); D.points(s, g, pts, C.ink);
    pts.forEach(([n, v]) => label(s, D.px(g, n) + 0.05, D.py(g, v) - 0.05, 0.45, String(v).replace('-', '−'), { size: 10, bold: true, color: C.blue, h: 0.2, align: 'left' }));
    // two models
    const y0 = 4.35;
    box(s, 0.7, y0 - 0.25, 2.65, 1.6, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    box(s, 3.6, y0 - 0.25, 2.65, 1.6, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.75, y0 - 0.23, 2.55, '**Thermosoftening**: separate chains', { size: 10, h: 0.25 });
    label(s, 3.65, y0 - 0.23, 2.55, '**Thermosetting**: cross-linked', { size: 10, h: 0.25 });
    [0.25, 0.6, 0.95].forEach((dy, i) => chain(s, 0.95, y0 + dy, 8, 0.27, 0.12, '4A4A55', { r: 0.03, lw: 1.75 }));
    [0.25, 0.6, 0.95].forEach((dy, i) => chain(s, 3.85, y0 + dy, 8, 0.27, 0.12, '4A4A55', { r: 0.03, lw: 1.75 }));
    [[4.39, 0.37, 0.6], [5.47, 0.37, 0.6], [4.93, 0.72, 0.95], [3.85 + 0.27 * 7, 0.72, 0.95]].forEach(([x, a, b]) => line(s, x, y0 + a, x, y0 + b, XLINK, 2.5));
    label(s, 3.65, y0 + 1.07, 2.55, 'red = **covalent cross-links**', { size: 10, color: XLINK, h: 0.24 });
    label(s, 0.75, y0 + 1.07, 2.55, 'chains slide when warm', { size: 10, color: C.grey, italic: true, h: 0.24 });
  },
  head: 'Two ways to change a polymer',
  lines: [
    '**Longer chains**: more contact between chains → more intermolecular forces to overcome → **higher** melting point, **stronger**.',
    '**Cross-links**: **covalent bonds** between chains. Chains cannot slide, so the polymer is **rigid** and **hard**.',
    '**Thermosoftening** polymers (no cross-links) soften when heated and can be **reshaped** and recycled, e.g. poly(ethene) bags.',
    '**Thermosetting** polymers (cross-linked) do **not** soften; strong heating **chars** them, e.g. plug sockets, pan handles.',
  ],
  size: 12,
  worked: { head: 'Worked example: describe the trend', q: 'Use the graph values.',
    steps: [['C10 → C20', '37 − (−30) = 67 °C rise'], ['C30 → C40', '81 − 66 = 15 °C rise'], ['Answer', 'm.p. **rises** with chain length, but **less steeply** for longer chains']], size: 10.5 },
  workedH: 1.5,
  qc: 'Explain why a **pan handle** is made from a thermosetting polymer. Which melts at a higher temperature: a C₂₀ or a C₃₀ chain?',
  notes: 'QUICK CHECK ANSWER: The handle gets hot; a thermoset has covalent cross-links between chains, so the chains cannot slide apart when heated and it does not soften or melt (it is rigid). C₃₀ (66 °C vs 37 °C).\nData: approximate data-book melting points of straight-chain alkanes C₁₀H₂₂ (−30), C₂₀H₄₂ (37), C₃₀H₆₂ (66), C₄₀H₈₂ (81) °C, UNVERIFIED to ±2 °C; poly(ethene) chains (thousands of C) soften at about 110–135 °C. Rises 67, 29, 15 asserted. The curve is drawn through the plotted points.\nPlasticisers (small molecules that push chains apart, making a polymer more flexible) can be mentioned as an extra if your specification copy includes them; not confirmed for J260.',
}), 'C4.2.2 Chain length and cross-links');

// ======================= 11 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C4.2.1')}, ${sp('C4.2.2')} • forces, polymers and cross-links`, [
  { q: 'Methane (CH₄) boils at **−162 °C**. Explain why its boiling point is so low.', marks: 2, ms: 'Simple molecules / only weak intermolecular forces between molecules (1); little energy needed to overcome them; covalent bonds are not broken (1).' },
  { q: 'Explain why poly(ethene) **softens** when heated but diamond does not.', marks: 2, ms: 'Poly(ethene): only weak forces between chains are overcome, chains slide (1); diamond: would need to break many strong covalent bonds in a giant structure (1).' },
  { q: 'A C₁₀ chain melts at **−30 °C** and a C₃₀ chain at **66 °C**. Calculate the difference and state the trend.', marks: 2, ms: '66 − (−30) = 96 °C (1); longer chain → higher melting point (1).' },
  { q: 'Explain why a **thermosetting** polymer does not soften when it is heated.', marks: 2, ms: 'Covalent cross-links between chains (1); chains cannot move / slide past each other (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 12 GIANT COVALENT =======================
reg(D.contentSlide({
  title: 'Giant covalent: diamond and silica',
  subtitle: `Specification ${sp('C4.2.3')}, ${sp('C4.2.4')} • a continuous network of covalent bonds`,
  tag: 'C4.2.3', stretch: true, caption: 'diamond: real 3D unit cell; silicon dioxide: 2D model',
  draw: (s) => {
    const r = diamond3D(s, 1.95, 3.05, 1.9);
    label(s, 0.6, 1.4, 2.8, '**Diamond** (carbon)', { size: 11.5, h: 0.28 });
    label(s, 0.6, 4.35, 2.8, 'each C: **4** covalent bonds, tetrahedral, in 3D', { size: 10, h: 0.45, valign: 'top' });
    silica2D(s, 3.85, 2.05, 4, 4, 0.55);
    label(s, 3.5, 1.4, 2.95, '**Silicon dioxide** (sand, quartz)', { size: 11.5, h: 0.28 });
    label(s, 3.5, 4.35, 2.95, 'each Si: **4** O; each O: **2** Si', { size: 10, h: 0.45, valign: 'top' });
    label(s, 0.65, 4.95, 5.7, 'No separate molecules: the whole crystal is **one giant structure**.', { size: 10.5, h: 0.3 });
    label(s, 0.65, 5.27, 5.7, 'Si(s) + O₂(g) → SiO₂(s)', { size: 10.5, italic: true, color: C.grey, h: 0.28 });
    assert(r.four >= 4, 'several 4-bonded carbons drawn'); DIA = r;
  },
  head: 'Properties of giant covalent structures',
  lines: [
    '**Very high melting points**: melting means breaking **millions of strong covalent bonds**; there are no weak forces to overcome.',
    '**Hard** and rigid: each atom is held in place in all directions. Diamond is the hardest natural substance → cutting and drilling tools.',
    '**Do not conduct** electricity: every outer electron is used in a bond; there are no ions and no free electrons.',
    '**Insoluble** in water.',
  ],
  size: 12,
  worked: { head: 'Worked example: formula from the structure', q: 'Use the silicon dioxide model.',
    steps: [['Bonds', 'each Si bonds to 4 O; each O is shared by 2 Si'], ['Count', 'O per Si = 4 ÷ 2 = 2'], ['Answer', 'Si : O = 1 : 2, so the formula is **SiO₂**']], size: 10.5 },
  workedH: 1.5,
  qc: 'Explain why diamond is used on **drill tips**. STRETCH: each C–C bond needs **347 kJ/mol**. Each C shares 4 bonds. Estimate the energy to break 1 mol of diamond.',
  notes: 'QUICK CHECK ANSWER: Diamond is very hard because every carbon is joined to four others by strong covalent bonds in a rigid 3D network, so it can cut / scratch other materials without wearing; very high melting point too, so it does not melt from friction. STRETCH: each bond is shared by 2 atoms, so bonds per atom = 4 ÷ 2 = 2; 1 mol of C has 2 mol C–C bonds; 2 × 347 = 694 kJ (a data-book average bond energy; the measured value is a little higher). GRADE 7–9 STRETCH, not a J260 statement.\nThe diamond drawing uses real diamond-cubic coordinates (no carbon has more than 4 bonds; interior carbons 4: asserted in node). Si(s) + O₂(g) → SiO₂(s) balance asserted. Real SiO₂ is 3D (tetrahedral SiO₄ units); the 2D grid model keeps the 1 : 2 ratio but not the shape (limitation).',
}), 'C4.2.3 Giant covalent: diamond and silica');

// ======================= 13 GRAPHITE =======================
{
  const s = D.contentHeader('Graphite: layers and free electrons', `Specification ${sp('C4.2.4')} • explaining the properties of diamond and graphite`, { tag: 'C4.2.4' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'three layers of graphite in perspective; not to scale');
  const L = [];
  [1.75, 2.85, 3.95].forEach((y, i) => L.push(honeycomb(s, 0.95 + (i % 2) * 0.24, y, 4.0, 1.4, 0.28, 0.5, { skew: 0, r: 0.04 })));
  // weak forces between layers
  [[1.55, 2.5], [3.0, 2.5], [4.3, 2.5], [1.75, 3.55], [3.2, 3.55], [4.5, 3.55]].forEach(([x, y]) => line(s, x, y, x, y + 0.35, IMF, 1.25, { dash: 'sysDot' }));
  // delocalised electrons on the top layer + arrow
  [[1.6, 1.98], [2.4, 2.2], [3.1, 1.95], [3.8, 2.25], [2.0, 2.35]].forEach(([x, y]) => ball(s, x, y, 0.05, ELEC, '1B4F7A', 0.5));
  arrow(s, 1.4, 1.6, 3.9, 1.6, ELEC, 2);
  label(s, 3.95, 1.45, 2.5, 'delocalised electrons move **along** the layers', { size: 10, color: ELEC, bold: true, align: 'left', h: 0.45, valign: 'top' });
  label(s, 4.85, 2.6, 1.65, 'weak forces **between** layers: layers slide', { size: 10, color: IMF, bold: true, align: 'left', h: 0.6, valign: 'top' });
  label(s, 4.85, 3.85, 1.65, 'each C: **3** strong covalent bonds in hexagons', { size: 10, color: C.ink, align: 'left', h: 0.6, valign: 'top' });
  label(s, 0.65, 5.45, 5.7, 'A single layer is **graphene** (see C4.3)', { size: 10, italic: true, color: C.grey, h: 0.25 });
  const rows = [[HDR('Property'), HDR('Diamond'), HDR('Graphite'), HDR('Why the graphite is different')],
    [tcell('Hardness', 0, { bold: true }), tcell('very hard', 0), tcell('soft, slippery', 0), tcell('weak forces between layers: layers slide', 0)],
    [tcell('Melting point', 1, { bold: true }), tcell('very high', 1), tcell('very high', 1), tcell('both: many strong covalent bonds to break', 1)],
    [tcell('Conducts?', 0, { bold: true }), tcell('no', 0), tcell('yes', 0), tcell('one delocalised electron per C atom', 0)],
    [tcell('Uses', 1, { bold: true }), tcell('drill tips, cutting tools', 1), tcell('electrodes, lubricant, pencils', 1), tcell('', 1)]];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.15, 1.3, 1.35, 2.28], rowH: [0.3, 0.5, 0.5, 0.5, 0.5], fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 3.85, 6.08, 2.4, 'Worked example: where does the free electron come from?', 'Carbon has 4 outer electrons.', [
    ['Bonds', 'each C forms 3 covalent bonds in its layer: 3 electrons used'], ['Left over', '4 − 3 = **1** electron per atom'], ['Shared', 'bonds per atom = 3 ÷ 2 = 1.5 (each bond shared by 2 atoms)'],
    ['Answer', 'one **delocalised** electron per C: it moves along the layer and carries charge']], { size: 10.5 });
  D.quickCheck(s, 'Explain why graphite is used as a **lubricant** and as an **electrode**. How many C–C bonds are in a layer of **10** carbon atoms (ignore edges)?');
  D.notes(s, 'QUICK CHECK ANSWER: Lubricant: weak forces between layers, so layers slide over each other easily (and it has a high melting point, so works when hot). Electrode: delocalised electrons move along the layers, so it conducts electricity; high melting point and fairly unreactive. 10 × 1.5 = 15 bonds.\nC4.2.4: explain the properties of diamond and graphite in terms of their structures and bonding. The comparison table is the core exam content. Graphene, fullerenes and nanotubes belong to C4.3 (nanoparticles): name only. The honeycomb layers are generated from the real hexagonal lattice and offset (ABAB stacking). Electrons in graphite move along the layers, not between them: graphite conducts much better along the layers.');
  reg(s, 'C4.2.4 Graphite');
}

// ======================= 14 METALS AND IONIC SOLIDS =======================
reg(D.contentSlide({
  title: 'Metals and ionic solids: malleable or brittle?',
  subtitle: `Specification ${sp('C4.2.1')} • explaining malleability, brittleness and conductivity (uses C2 and C3.1)`,
  tag: 'C4.2.1', caption: 'a force is applied to each lattice (left: before, right: after); not to scale',
  draw: (s) => {
    label(s, 0.65, 1.42, 5.7, '**Metal**: layers of ions slide, electrons still hold them → **malleable**', { size: 10.5, h: 0.28 });
    metalGrid(s, 0.95, 2.0, 5, 3, 0.36, { r: 0.13 });
    arrow(s, 2.95, 2.36, 3.5, 2.36, C.ink, 2);
    metalGrid(s, 3.85, 2.0, 5, 3, 0.36, { r: 0.13, slip: 0.36, slipRow: 1 });
    arrow(s, 0.5, 2.36, 0.75, 2.36, C.red, 2.5); label(s, 0.42, 2.5, 0.6, 'force', { size: 10, bold: true, color: C.red, h: 0.2 });
    line(s, 0.65, 3.12, 6.35, 3.12, C.line, 1, { dash: 'dash' });
    label(s, 0.65, 3.22, 5.7, '**Ionic**: layer shifts, **like charges line up and repel** → **brittle**, it shatters', { size: 10.5, h: 0.28 });
    ionicGrid(s, 1.0, 3.85, 5, 3, 0.36, { r1: 0.12, r2: 0.16 });
    arrow(s, 2.95, 4.2, 3.5, 4.2, C.ink, 2);
    // shifted ionic lattice: top row moved by one ion
    for (let j = 0; j < 3; j++) for (let i = 0; i < 5; i++) {
      const neg = (i + j) % 2 === 1, cx = 3.9 + i * 0.36 + (j === 0 ? 0.36 : 0), cy = 3.85 + j * 0.36;
      if (neg) ion(s, cx, cy, 0.16, CL[0], CL[1], '−', 11, C.ink); else ion(s, cx, cy, 0.12, NA[0], NA[1], '+', 11, C.white);
    }
    [4.26, 4.62, 4.98, 5.34].forEach(x => { line(s, x - 0.08, 4.0, x + 0.08, 4.1, C.red, 2); line(s, x - 0.08, 4.1, x + 0.08, 4.0, C.red, 2); });
    label(s, 3.75, 4.75, 2.6, 'repulsion between like charges', { size: 10, bold: true, color: C.red, h: 0.24 });
    label(s, 0.65, 5.15, 5.7, 'blue dots: **delocalised electrons**; + metal ions; Na⁺ purple, Cl⁻ green', { size: 10, italic: true, color: C.grey, h: 0.28 });
  },
  head: 'Explaining the properties',
  lines: [
    '**Metals**: strong attraction between + ions and the sea of delocalised electrons → high melting points.',
    '**Malleable** and **ductile**: layers of ions slide but the electrons still hold them, so the metal bends instead of breaking.',
    '**Conduct** electricity and heat: delocalised electrons move through the lattice.',
    '**Ionic** solids: hard, high melting point, but **brittle**. They conduct only when **molten** or **dissolved**, when ions can move.',
  ],
  size: 12,
  worked: { head: 'Worked example: counting free electrons', q: 'Each magnesium atom gives 2 electrons to the sea: Mg → Mg²⁺ + 2e⁻',
    steps: [['Per atom', '2 delocalised electrons'], ['10 atoms', '10 × 2 = 20 electrons'], ['Answer', '**20** delocalised electrons; the charges balance (+20 and −20)']], size: 10.5 },
  workedH: 1.5,
  qc: 'Why can copper be drawn into **wires** but a salt crystal **shatters** when hit? How many delocalised electrons come from **50** Al atoms (Al³⁺)?',
  notes: 'QUICK CHECK ANSWER: Copper: layers of positive ions slide over each other while the delocalised electrons keep attracting them (non-directional metallic bonding), so it stretches without breaking. Salt: a blow shifts a layer so ions of the same charge line up and repel, and the crystal splits. 50 × 3 = 150 electrons.\nThis slide uses metallic bonding (J260 C3.1) and ionic bonding (C2) as a recap, and applies them to the C4.2.1 bulk properties: malleability, brittleness, conductivity. Charge balance for Mg → Mg²⁺ + 2e⁻ asserted. Models: 2D slices of 3D lattices; real metals have defects and grains (C4.1 alloys are not repeated here).',
}), 'C4.2.1 Metals and ionic solids');

// ======================= 15 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C4.2.1')}, ${sp('C4.2.3')}, ${sp('C4.2.4')} • giant structures`, [
  { q: 'Explain why diamond is very **hard**.', marks: 2, ms: 'Each carbon atom is covalently bonded to four others (1); in a rigid 3D giant structure / many strong bonds must be broken (1).' },
  { q: 'Explain why graphite **conducts** electricity but diamond does not.', marks: 2, ms: 'Graphite: each C bonds to 3, so one delocalised electron per atom that can move (1); diamond: all 4 outer electrons in bonds, no free electrons (1).' },
  { q: 'Explain why metals are **malleable**.', marks: 2, ms: 'Layers of (positive) ions can slide over each other (1); the delocalised electrons still hold them together / bonds not broken (1).' },
  { q: 'In silicon dioxide each Si is bonded to **4** O and each O to **2** Si. Show that the formula is **SiO₂**.', marks: 2, ms: 'Each O shared between 2 Si, so O per Si = 4 ÷ 2 (1); = 2, so Si : O = 1 : 2 (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 16 PRACTICAL METHOD =======================
reg(D.contentSlide({
  title: 'Cross-linking slime: method',
  subtitle: `Specification ${sp('C4.2.2')} • how does the amount of cross-linker change how a polymer flows?`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'apparatus: measuring cylinders, beaker, glass rod, tile on a block, ruler, stopwatch',
  draw: (s) => {
    cylinder(s, 0.85, 1.6, 0.42, 1.7, 0.75, 'F4F0FA');
    label(s, 0.55, 3.45, 1.05, '25 cm³ of 4% **PVA**', { size: 10, h: 0.42, valign: 'top' });
    cylinder(s, 1.9, 2.2, 0.28, 1.1, 0.5, 'DDEFF7');
    label(s, 1.55, 3.45, 1.0, 'x cm³ of 4% **borax**', { size: 10, h: 0.42, valign: 'top' });
    beaker(s, 2.85, 2.2, 1.0, 1.1, 'EAF2F8', 0.5, 'E6DDF3');
    line(s, 3.05, 1.75, 3.55, 3.15, '8C96A8', 2.5);
    label(s, 2.65, 3.45, 1.4, 'stir for **1 min**', { size: 10, h: 0.42, valign: 'top' });
    arrow(s, 1.4, 2.1, 2.75, 2.4, C.ink, 1.25); arrow(s, 2.25, 2.65, 2.75, 2.7, C.ink, 1.25);
    // tile on block with ruler
    const bx = 0.9, by = 5.3;
    box(s, bx + 2.9, by - 0.6, 0.55, 0.6, 'C99A5B', '8A5A2B');
    poly(s, [[bx, by], [bx + 3.45, by - 0.6], [bx + 3.45, by - 0.5], [bx, by + 0.1]], C.white, '6B7385', { lw: 1.25 });
    label(s, bx + 2.9, by - 0.25, 0.55, 'block', { size: 10, h: 0.2 });
    // slime blob at top + 10 cm marks
    s.addShape(SH.OVAL, { x: bx + 2.65, y: by - 0.78, w: 0.45, h: 0.22, rotate: -10, fill: { color: 'B9A3E0' }, line: { color: '6A4C93', width: 1 } });
    [[bx + 2.6, by - 0.45], [bx + 0.95, by - 0.16]].forEach(([x, y], i) => { line(s, x, y - 0.12, x, y + 0.12, C.red, 2); });
    label(s, bx + 1.0, by - 0.72, 1.6, 'flows 10 cm', { size: 10, bold: true, color: C.red, h: 0.22 });
    line(s, bx + 2.55, by - 0.49, bx + 1.0, by - 0.22, C.red, 1, { dash: 'dash', head: true });
    stopwatch(s, 5.6, 2.55, 0.42);
    label(s, 4.9, 3.05, 1.4, 'time to flow **10 cm**', { size: 10, h: 0.42, valign: 'top' });
    label(s, 0.65, 5.5, 5.7, 'Repeat for 0, 1, 2, 3, 4 and 5 cm³ of borax; three trials each', { size: 10.5, h: 0.3 });
  },
  head: 'Method',
  lines: [
    'Measure **25 cm³** of PVA solution into a beaker. Add **1.0 cm³** of borax solution and stir for exactly **1 minute**.',
    'Put the slime at the top mark of a tile propped at a **fixed angle**. Time how long it takes to flow **10 cm**.',
    'Repeat with 0–5 cm³ of borax, **three** trials each. Calculate the **mean** time.',
    '**IV**: volume of borax. **DV**: time to flow 10 cm. **Control**: PVA volume and concentration, tile angle, stirring time, temperature.',
    '**Safety**: wear eye protection. Borax is a **reproductive toxicant**: the technician makes up the dilute solution; avoid skin contact; wash hands; never eat or take the slime home.',
  ],
  size: 10.5,
  worked: { head: 'Why does it work?', q: '',
    steps: [['PVA', 'long polymer chains, poly(ethenol), dissolved in water'], ['Borax', 'borate ions form **cross-links** between chains'], ['Answer', 'more borax → **more cross-links** → chains slide less → flows **more slowly**']], size: 10.5 },
  workedH: 1.4,
  qc: 'Name the **independent** and **dependent** variables. Why must the tile be at the **same angle** every time?',
  notes: 'QUICK CHECK ANSWER: IV: volume of borax solution added. DV: time for the slime to flow 10 cm. Same angle: the angle changes how fast the slime flows, so it must be controlled to make the test fair (only the borax should change the result).\nSuggested practical (no PAG code confirmed for C4.2 in J260). Hazards (CLEAPSS-style): sodium tetraborate (borax) SOLID is classified as a reproductive toxicant (DANGER: may damage fertility or the unborn child): technician only, prepared as a dilute solution; check the current CLEAPSS Hazcard and recipe for the concentration classification threshold (UNVERIFIED here). PVA (poly(ethenol)) 4% solution: low hazard. Eye protection; avoid skin contact; wash hands; spills on floors are slippery. The cross-links formed by borate are weaker (reversible) than the permanent covalent cross-links in a thermoset: discuss as a model limitation.',
}), 'Practical: cross-linking slime (method)');

// ======================= 17 PRACTICAL RESULTS =======================
{
  const s = D.contentHeader('Cross-linking slime: results', `Specification ${sp('C4.2.2')} • means, anomalies, uncertainty and a graph`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'graph of mean time against borax volume, plotted to scale; bars show the range');
  const g = { x: 1.35, y: 1.55, w: 4.9, h: 3.55, xmin: 0, xmax: 5, ymin: 0, ymax: 100, xstep: 1, ystep: 10, minor: 2, xlabel: 'Volume of borax solution / cm³', ylabel: 'Mean time to flow 10 cm / s' };
  D.axes(s, g);
  D.fnLine(s, g, qf, 0, 5, 40, C.blue, 2);
  TR.forEach((r, i) => {
    const kept = r.filter((v, j) => !(i === ANOM[0] && j === ANOM[1]));
    const hi = Math.max(...kept), lo = Math.min(...kept), x = D.px(g, VOL[i]);
    line(s, x, D.py(g, hi), x, D.py(g, lo), C.ink, 1.25);
    line(s, x - 0.07, D.py(g, hi), x + 0.07, D.py(g, hi), C.ink, 1.25); line(s, x - 0.07, D.py(g, lo), x + 0.07, D.py(g, lo), C.ink, 1.25);
  });
  D.points(s, g, VOL.map((v, i) => [v, MEANS[i]]), C.red);
  const ax = D.px(g, 4), ay = D.py(g, 88);
  s.addShape(SH.OVAL, { x: ax - 0.09, y: ay - 0.09, w: 0.18, h: 0.18, fill: { type: 'none' }, line: { color: C.orange, width: 1.5 } });
  label(s, ax - 1.75, ay - 0.12, 1.6, 'anomaly 88 s (not used)', { size: 10, bold: true, color: C.orange, h: 0.22, align: 'right' });
  const rows = [[HDR('Borax / cm³'), HDR('Trial 1 / s'), HDR('Trial 2 / s'), HDR('Trial 3 / s'), HDR('Mean / s')],
    ...TR.map((r, i) => [tcell(String(VOL[i]), i, { bold: true }), ...r.map((v, j) => tcell(String(v), i, (i === ANOM[0] && j === ANOM[1]) ? { color: C.orange, bold: true } : {})), tcell(fmt(MEANS[i]), i, { bold: true })])];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.28, 1.2, 1.2, 1.2, 1.2], rowH: 0.26, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.workedSteps(s, 6.8, 3.45, 6.08, 1.4, 'Worked example: mean and uncertainty', '', [
    ['4 cm³ mean', '88 s is anomalous: (61 + 63) ÷ 2 = **62 s**'],
    ['5 cm³ range', `(89 − 85) ÷ 2 = ±${fmt(unc5)} s`],
    ['Answer', `87 ± 2 s, a ${fmt(sf(unc5 / MEANS[5] * 100, 2))}% uncertainty`]], { size: 10.5 });
  D.card(s, 6.8, 4.97, 6.08, 1.28, 'Conclusion and errors', [
    'More borax → longer flow time: more **cross-links** stop chains sliding. The curve gets steeper.',
    'Errors: judging when the slime reaches the line; slime sticks to the beaker. Improve: video it; use a fixed mass.',
  ], { size: 10.5 });
  D.quickCheck(s, 'Use the graph to estimate the flow time for **2.5 cm³** of borax. Suggest **why** trial 2 at 4 cm³ might be anomalous.');
  D.notes(s, `QUICK CHECK ANSWER: About 32 s (read from the curve; accept 30–35 s). Anomaly: stirred for longer / less PVA / some borax left in the cylinder / tile angle changed / timing error.\nAll values illustrative, asserted in node: means ${MEANS.map(fmt).join(', ')} s; uncertainty ±${fmt(unc5)} s at 5 cm³ (${fmt(sf(unc5 / MEANS[5] * 100, 2))}%). The line of best fit is a least-squares quadratic through the means (asserted within 3 s of every mean). Plot points with ×, draw a smooth curve, and do not join dot to dot. The anomaly is circled and left out of the mean.`);
  reg(s, 'Practical: cross-linking slime (results)');
}

// ======================= 18 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('C4.2.2')} • practical skills`, [
  { q: 'Three flow times were **38 s**, **42 s** and **40 s**. Calculate the mean.', marks: 2, ms: '(38 + 42 + 40) ÷ 3 = 120 ÷ 3 (1); = 40 s (1).' },
  { q: 'Use the same three results to state the uncertainty in the mean.', marks: 2, ms: 'Half the range: (42 − 38) ÷ 2 (1); ± 2 s (1).' },
  { q: 'A fourth result was **65 s**. What should the student do with it, and why?', marks: 2, ms: 'It is anomalous / does not fit the pattern (1); leave it out of the mean / repeat that trial (1).' },
  { q: 'Explain why adding **more borax** makes the slime flow more slowly.', marks: 2, ms: 'More cross-links form between the polymer chains (1); chains cannot slide past each other as easily (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Bulk property', 'A property of a large piece of material (e.g. hardness); single atoms do not have it.'],
  ['Covalent bond', 'A shared pair of electrons between two atoms; strong.'],
  ['Intermolecular forces', 'Weak forces between molecules; overcome when simple molecules melt or boil.'],
  ['Simple molecular', 'Small molecules: strong bonds inside, weak forces between; low m.p.'],
  ['Giant covalent', 'A huge network of atoms all joined by covalent bonds, e.g. diamond, SiO₂.'],
  ['Ionic lattice', 'Giant structure of + and − ions held by strong electrostatic attraction.'],
  ['Metallic bonding', 'Attraction between + metal ions and a sea of delocalised electrons.'],
  ['Delocalised electrons', 'Electrons free to move through a structure; they carry charge.'],
  ['Polymer', 'A very long molecule made of many repeat units joined by covalent bonds.'],
  ['Repeat unit', 'The section of a polymer chain that repeats, e.g. –CH₂–CH₂–.'],
  ['Cross-link', 'A covalent bond joining two polymer chains; stops chains sliding.'],
  ['Thermosoftening', 'A polymer without cross-links: softens when heated and can be reshaped.'],
  ['Thermosetting', 'A cross-linked polymer: does not soften when heated; chars instead.'],
  ['Diamond', 'Carbon, each atom bonded to 4 others in 3D: very hard, does not conduct.'],
  ['Graphite', 'Carbon in layers, each atom bonded to 3: soft, slippery, conducts.'],
  ['Malleable vs brittle', 'Malleable: can be hammered into shape (metals). Brittle: shatters (ionic).'],
], { notes: 'Use as a cover-and-recall activity. Ionic lattice, metallic bonding and delocalised electrons are recap terms from C2 and C3.1, used here to explain bulk properties. Graphene and fullerenes are C4.3 key words.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student tests four solids. **A** melts at **3550 °C** and does not conduct. **B** melts at **−7 °C** and does not conduct. **C** melts at **1085 °C** and conducts when solid. **D** melts at **801 °C** and conducts only when molten or dissolved.', [
  { l: 'a', q: 'Which solid, **A**, **B**, **C** or **D**, has a **giant covalent** structure and which is **simple molecular**?', marks: 2, ms: 'Giant covalent: A (1). Simple molecular: B (1).' },
  { l: 'b', q: 'Explain why **B** has a low melting point.', marks: 2, ms: 'Only weak intermolecular forces between molecules (1); little energy needed to overcome them / covalent bonds not broken (1).' },
  { l: 'c', q: 'Explain why **C** conducts electricity when solid.', marks: 2, ms: 'C is a metal with delocalised electrons (1); which move through the structure carrying charge (1).', h: 1.05 },
  { l: 'd', q: '**D** is brittle. Explain why it shatters when hit with a hammer.', marks: 2, ms: 'Layers of ions shift so that ions with the same charge line up (1); they repel and the crystal splits (1).' },
  { l: 'e', q: 'Calculate the difference between the melting points of **A** and **B**.', marks: 2, ms: '3550 − (−7) (1); = 3557 °C (1). Allow 3560 °C.' },
  { l: 'f', q: 'A pan handle must not soften when hot. Explain why a **thermosetting** polymer is used, not a thermosoftening one.', marks: 3, ms: 'Thermoset has cross-links (1); which are covalent bonds between chains (1); so chains cannot slide / it does not soften or melt when heated, whereas a thermosoftening polymer would soften (1).', h: 1.2 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'Both are giant covalent structures made only of carbon atoms joined by strong covalent bonds.',
    'Diamond: each C bonded to 4 others in a rigid 3D (tetrahedral) network → very hard → cutting / drilling tools.',
    'Graphite: each C bonded to 3 others in flat hexagonal layers; weak forces between layers → layers slide → soft, slippery → lubricant, pencils.',
    'Graphite: the fourth electron of each C is delocalised and moves along the layers → conducts electricity → electrodes.',
    'Diamond: all four outer electrons used in bonds → no free electrons → does not conduct.',
    'Both: very high melting points because many strong covalent bonds must be broken → graphite electrodes work at high temperature.',
    'Properties come from the bonding and arrangement, not from the carbon atoms themselves.',
  ], {
    l3: 'Explains at least TWO differences in properties in terms of the bonding / structure of BOTH diamond and graphite, AND links each property to a use.',
    l2: 'Describes the structures of diamond and graphite AND explains at least one property difference, with a use.',
    l1: 'Simple statements, e.g. "diamond is hard" or "graphite has layers", with little explanation.',
  });
}
const HW = [
  { n: '1', q: 'Name the type of bond that joins the atoms **along** a polymer chain.', marks: 1, ms: 'Covalent (1).' },
  { n: '2', q: 'Explain why poly(ethene) does **not** conduct electricity.', marks: 2, ms: 'No delocalised / free electrons and no ions (1); all electrons are held in covalent bonds (1).' },
  { n: '3', q: 'Poly(propene) has the repeat unit **C₃H₆**. Calculate Mr for a chain of **3000** repeat units. (C = 12, H = 1)', marks: 2, ms: 'Mr C₃H₆ = 3 × 12 + 6 × 1 = 42 (1); × 3000 = 126 000 (1).', h: 1.15 },
  { n: '4', q: 'Explain why polymers with **longer** chains have higher melting points.', marks: 2, ms: 'More contact between chains / more intermolecular forces (1); more energy needed to overcome them (1).' },
  { n: '5', q: 'Explain why aluminium is a good material for **saucepans**.', marks: 2, ms: 'Conducts heat (1); because delocalised electrons move / transfer energy through the metal (1). Allow malleable: layers slide so it can be shaped (1 + 1).' },
  { n: '6', q: 'Silicon burns in oxygen to make solid silicon dioxide. Write a balanced equation with **state symbols**.', marks: 2, ms: 'Si + O₂ → SiO₂ (1); (s) + (g) → (s) (1).' },
  { n: '7', q: 'Diamond and graphite are both made only of **carbon** atoms. Explain why they have **different properties and uses**.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. All questions are for both tiers.', HW, 17, { dividerSub: 'C4.2 Bonding and properties • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4].forEach(r => assert.strictEqual(r.total, 8));
// deck-specific: the C4.2 title is long, so widen every footer text box to keep it on one line
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C4.2') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
const out = path.join(__dirname, 'OCR21C_C4.2_BondingProperties_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
