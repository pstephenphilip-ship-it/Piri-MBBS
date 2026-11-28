// build_T8.js — Edexcel GCSE Chemistry 1CH0 Topic 8 Fuels and Earth science (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T8.js
// Structure copied from build_T3.js / build_T7.js. edx_chem_template.js is NOT edited: the equation checker and
// glassware helpers are spliced in from build_T3.js; T8 helpers are below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 8,
  title: 'Fuels and Earth science',
  shortTitle: 'T8',
  subtitle: 'Crude oil, combustion, pollution, cracking, the atmosphere and climate change',
  specRange: '8.1–8.28',
  pOnly: [],
  paper: 'Paper 2',
  keywords: ['Crude oil', 'Alkanes', 'Combustion', 'Cracking', 'Atmosphere', 'Climate change'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= EQUATIONS: atom AND charge balance asserted; display text generated from the same data =======================
function parseFormula(f) {
  let charge = 0;
  if (f === 'e-') return { atoms: {}, charge: -1 };
  const m = f.match(/^(.*)\^(\d?)([+-])$/);
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
    } else if (/^\d+$/.test(t)) { stack[stack.length - 1][lastAdded] += +t - 1; }
    else { stack[stack.length - 1][t] = (stack[stack.length - 1][t] || 0) + 1; lastAdded = t; }
  }
  return { atoms: stack[0], charge };
}
// handles hydrates written 'CuSO4.5H2O'
function parseF(f) {
  if (f === 'e-') return parseFormula(f);
  const tot = { atoms: {}, charge: 0 };
  f.split('.').forEach((p, i) => {
    let n = 1; const mm = p.match(/^(\d+)(.*)$/);
    if (i > 0 && mm) { n = +mm[1]; p = mm[2]; }
    const r = parseFormula(p); tot.charge += n * r.charge;
    for (const [k, v] of Object.entries(r.atoms)) tot.atoms[k] = (tot.atoms[k] || 0) + n * v;
  });
  return tot;
}
function side(terms) {
  const tot = { atoms: {}, charge: 0 };
  terms.forEach(([n, f]) => { const p = parseF(f); tot.charge += n * p.charge; for (const [k, v] of Object.entries(p.atoms)) tot.atoms[k] = (tot.atoms[k] || 0) + n * v; });
  return tot;
}
const SUBD = { 0: '₀', 1: '₁', 2: '₂', 3: '₃', 4: '₄', 5: '₅', 6: '₆', 7: '₇', 8: '₈', 9: '₉' };
const SUPD = { 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹', '+': '⁺', '-': '⁻' };
function fmtF(f) {
  if (f === 'e-') return 'e⁻';
  let body = f, ch = '';
  const m = f.match(/^(.*)\^(\d?[+-])$/);
  if (m) { body = m[1]; ch = m[2].split('').map(c => SUPD[c]).join(''); }
  return body.split('.').map((p, i) => {
    let lead = '';
    if (i > 0) { const mm = p.match(/^(\d+)(.*)$/); if (mm) { lead = mm[1]; p = mm[2]; } }
    return lead + p.replace(/([A-Za-z)])(\d+)/g, (_, a, d) => a + d.split('').map(c => SUBD[c]).join(''));
  }).join('·') + ch;
}
const termStr = ([n, f, st]) => (n === 1 ? '' : n) + fmtF(f) + (st ? `(${st})` : '');
const EQ = {}, EQLIST = [];
// eq(key, lhs, rhs, o): terms [coefficient, formula, state]. Asserts atoms and charge; returns the display string.
function eq(key, lhs, rhs, o = {}) {
  const a = side(lhs), b = side(rhs);
  const norm = x => Object.keys(x.atoms).filter(k => x.atoms[k]).sort().map(k => [k, x.atoms[k]]);
  assert.deepStrictEqual(norm(a), norm(b), `atoms not balanced: ${key}`);
  assert.strictEqual(a.charge, b.charge, `charge not balanced: ${key}`);
  if (!o.noStates) [...lhs, ...rhs].forEach(t => assert(t[1] === 'e-' || t[2], `state symbol missing in ${key}: ${t[1]}`));
  const str = lhs.map(termStr).join(' + ') + (o.rev ? ' ⇌ ' : ' → ') + rhs.map(termStr).join(' + ');
  assert(!EQ[key], 'duplicate key ' + key);
  EQ[key] = str; EQ[key + '_d'] = { lhs, rhs, a, b }; EQLIST.push(`${key}: ${str}`);
  return str;
}
// charge total of one side, as text (for the "check" steps)
const qStr = q => q === 0 ? '0' : (q > 0 ? '+' + q : '−' + Math.abs(q));
// parser and formatter self-tests
assert.deepStrictEqual(parseF('CuSO4.5H2O').atoms, { Cu: 1, S: 1, O: 9, H: 10 });
assert.strictEqual(fmtF('SO4^2-'), 'SO₄²⁻');
assert.strictEqual(fmtF('Ca(OH)2'), 'Ca(OH)₂');
assert.strictEqual(fmtF('CuSO4.5H2O'), 'CuSO₄·5H₂O');
assert.throws(() => eq('test unbalanced', [[1, 'Mg', 's'], [1, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2', 'g']]));
assert.throws(() => eq('test charge', [[1, 'Cl^-', 'aq']], [[1, 'Cl2', 'g']], { noStates: true }));



// --- Topic 8 equations ---
eq('CH4 burn', [[1, 'CH4', 'g'], [2, 'O2', 'g']], [[1, 'CO2', 'g'], [2, 'H2O', 'l']]);
eq('C3H8 burn', [[1, 'C3H8', 'g'], [5, 'O2', 'g']], [[3, 'CO2', 'g'], [4, 'H2O', 'l']]);
eq('octane burn', [[2, 'C8H18', 'l'], [25, 'O2', 'g']], [[16, 'CO2', 'g'], [18, 'H2O', 'l']]);
eq('CH4 CO', [[2, 'CH4', 'g'], [3, 'O2', 'g']], [[2, 'CO', 'g'], [4, 'H2O', 'l']]);
eq('CH4 C', [[1, 'CH4', 'g'], [1, 'O2', 'g']], [[1, 'C', 's'], [2, 'H2O', 'l']]);
eq('S burn', [[1, 'S', 's'], [1, 'O2', 'g']], [[1, 'SO2', 'g']]);
eq('SO2 rain', [[1, 'SO2', 'g'], [1, 'H2O', 'l']], [[1, 'H2SO3', 'aq']]);
eq('NO', [[1, 'N2', 'g'], [1, 'O2', 'g']], [[2, 'NO', 'g']]);
eq('NO2', [[2, 'NO', 'g'], [1, 'O2', 'g']], [[2, 'NO2', 'g']]);
eq('H2 burn', [[2, 'H2', 'g'], [1, 'O2', 'g']], [[2, 'H2O', 'l']]);
eq('crack1', [[1, 'C10H22', 'g']], [[1, 'C8H18', 'g'], [1, 'C2H4', 'g']]);
eq('crack2', [[1, 'C12H26', 'g']], [[1, 'C8H18', 'g'], [2, 'C2H4', 'g']]);
eq('crack3', [[1, 'C14H30', 'g']], [[1, 'C10H22', 'g'], [2, 'C2H4', 'g']]);
eq('photo', [[6, 'CO2', 'g'], [6, 'H2O', 'l']], [[1, 'C6H12O6', 'aq'], [6, 'O2', 'g']]);
eq('C6H14 burn', [[2, 'C6H14', 'l'], [19, 'O2', 'g']], [[12, 'CO2', 'g'], [14, 'H2O', 'l']]);
eq('C2H6 burn', [[2, 'C2H6', 'g'], [7, 'O2', 'g']], [[4, 'CO2', 'g'], [6, 'H2O', 'l']]);

// ======================= DATA (asserted) =======================
const ALK = [['methane', 1, -162], ['ethane', 2, -89], ['propane', 3, -42], ['butane', 4, -1], ['pentane', 5, 36], ['hexane', 6, 69]];
ALK.forEach(([n, c], i) => { const f = `C${c > 1 ? c : ''}H${2 * c + 2}`; assert.strictEqual(parseF(f.replace('C1', 'C')).atoms.H, 2 * c + 2, n); if (i) assert(ALK[i][2] > ALK[i - 1][2], 'bp rises'); });
const alkF = c => `C${c > 1 ? c : ''}H${2 * c + 2}`;
calc('CH2 difference ethane→propane (H)', parseF(alkF(3)).atoms.H - parseF(alkF(2)).atoms.H, 2);
calc('decane H atoms', 2 * 10 + 2, 22);
const ATM = [['nitrogen', 78], ['oxygen', 21], ['argon', 0.9], ['carbon dioxide', 0.04]];
calc('atmosphere total (main gases, 2 d.p.)', Math.round(ATM.reduce((a, [, v]) => a + v, 0) * 100) / 100, 99.94, 1e-9);
// Mauna Loa annual mean CO2 (ppm, rounded) and global fossil CO2 emissions (Gt/yr, approx.)
const CO2 = [[1960, 317], [1970, 326], [1980, 339], [1990, 354], [2000, 370], [2010, 390], [2020, 414]];
const EMIS = [[1960, 9.4], [1970, 14.9], [1980, 19.4], [1990, 22.7], [2000, 25.5], [2010, 33.4], [2020, 34.8]];
for (let i = 1; i < CO2.length; i++) { assert(CO2[i][1] > CO2[i - 1][1]); assert(EMIS[i][1] > EMIS[i - 1][1]); }
calc('CO2 rise 1960→2020', 414 - 317, 97);
calc('% rise CO2 1960→2020 (2 s.f.)', sf((414 - 317) / 317 * 100, 2), 31, 1e-9);
// cracking supply and demand (illustrative %)
const SD = [['gases', 4, 6], ['petrol', 10, 24], ['kerosene', 13, 8], ['diesel', 18, 22], ['fuel oil', 40, 25], ['bitumen', 15, 15]];
calc('supply total', SD.reduce((a, r) => a + r[1], 0), 100); calc('demand total', SD.reduce((a, r) => a + r[2], 0), 100);
// combustion: oxygen needed
calc('O2 for 1 mol propane', 5, EQ['C3H8 burn_d'].lhs[1][0]);

// ======================= DECK-SPECIFIC drawing helpers (not in edx_chem_template.js) =======================
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
// equation box (bold, centred)
function eqn(s, x, y, w, t, o = {}) {
  box(s, x, y, w, o.h || 0.42, o.fill || C.white, o.edge || C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05, lw: o.lw || 1 });
  label(s, x + 0.08, y, w - 0.16, t, { size: o.size || 12, h: o.h || 0.42, color: o.color || C.ink, bold: o.bold !== false, align: o.align });
}
function callout(s, x, y, w, t, tx, ty, o = {}) {
  label(s, x, y, w, t, { size: o.size || 10.5, h: o.h || 0.26, align: o.align || 'left', color: o.color || C.text, bold: o.bold, valign: 'middle' });
  const ax = o.align === 'right' ? x + w + 0.03 : x - 0.03, ay = y + (o.h || 0.26) / 2;
  line(s, ax, ay, tx, ty, o.lc || '8A8F99', 0.75);
}
function badge(s, cx, cy, n, col = C.blue, r = 0.2) { ball(s, cx, cy, r, col, C.white, 1.5); label(s, cx - r, cy - r, 2 * r, String(n), { size: 13, bold: true, color: C.white, h: 2 * r }); }
const GLASS = 'EEF5FB', WAT = ['CFE4F7', '5B9BD5'], ACIDC = 'F9E0DA', CUSO4 = ['8EC9F0', '2F7FC1'], CUO = ['3A3A3A', '1A1A1A'], GRAPH = ['4A4F5A', '2A2F3A'], COPPER = ['C8783A', '8A4A1A'];
const PINK = ['F6C6DC', 'C2185B'];
// ions: coloured ball with the symbol written on it
const IONC = {
  'H⁺': ['F6B0A8', 'B7372B'], 'OH⁻': ['A9C8F0', '2F5FA8'], 'Cl⁻': ['B9E0A8', '3E7F2E'], 'Na⁺': ['F7E08A', '9A7A1A'], 'NO₃⁻': ['D7C4EE', '6A3FA0'],
  'SO₄²⁻': ['F5D1A0', 'A86A12'], 'Ag⁺': ['E3E6EA', '6B7385'], 'Cu²⁺': ['8EC9F0', '1F5F99'], 'A⁻': ['D6E9C6', '4E7A35'], 'Ba²⁺': ['F2C9E0', '9A3F6E'],
  'Br⁻': ['E8B48A', '8A4A1A'], 'Pb²⁺': ['C9CDD3', '4A5262'], 'K⁺': ['F7E08A', '9A7A1A'],
};
function ion(s, cx, cy, t, r = 0.17, o = {}) {
  const [f, e] = IONC[t] || ['FFFFFF', '8A8F99'];
  ball(s, cx, cy, r, f, e, 1);
  label(s, cx - r - 0.12, cy - r, 2 * r + 0.24, `**${t}**`, { size: o.size || 10, h: 2 * r, color: C.ink });
}
// spectator: dashed ring round an ion
function ring(s, cx, cy, r) { oval(s, cx, cy, 2 * r + 0.12, 2 * r + 0.12, null, C.red, { dash: 'dash', lw: 1.25 }); }
function water(s, cx, cy, r = 0.1) {
  ball(s, cx - r * 1.05, cy + r * 0.75, r * 0.62, 'FFFFFF', '8A8F99', 0.75); ball(s, cx + r * 1.05, cy + r * 0.75, r * 0.62, 'FFFFFF', '8A8F99', 0.75);
  ball(s, cx, cy, r, 'E06666', '9E2A2A', 0.75);
}
// un-ionised weak-acid molecule "HA"
function molHA(s, cx, cy) {
  ball(s, cx - 0.1, cy, 0.12, 'F6B0A8', 'B7372B', 1); ball(s, cx + 0.12, cy, 0.15, 'D6E9C6', '4E7A35', 1);
  label(s, cx - 0.3, cy - 0.15, 0.6, '**HA**', { size: 10, h: 0.3, color: C.ink });
}
function beaker(s, x, y, w, h, level = 0, liq = WAT[0], o = {}) {
  box(s, x, y, w, h, GLASS, null);
  if (level) box(s, x, y + h - level * h, w, level * h, liq, null);
  if (level) line(s, x, y + h - level * h, x + w, y + h - level * h, o.surface || WAT[1], 1);
  line(s, x, y, x, y + h, C.ink, 1.5); line(s, x + w, y, x + w, y + h, C.ink, 1.5); line(s, x, y + h, x + w, y + h, C.ink, 1.5);
  line(s, x - 0.06, y, x, y, C.ink, 1.5); line(s, x + w, y, x + w + 0.06, y, C.ink, 1.5);
}
function tube(s, x, y, w, h, level = 0, liq = WAT[0], o = {}) {
  const r = w / 2, cx = x + r, yb = y + h - r;
  const arc = (y0, a0, a1, n = 16) => { const p = []; for (let i = 0; i <= n; i++) { const t = a0 + (a1 - a0) * i / n; p.push([cx + r * Math.cos(t), y0 + r * Math.sin(t)]); } return p; };
  poly(s, [[x, y], [x + w, y], ...arc(yb, 0, Math.PI)], GLASS, null);
  if (level) { const ly = y + h - level * h; poly(s, [[x, Math.min(ly, yb)], [x + w, Math.min(ly, yb)], ...arc(yb, 0, Math.PI)], liq, null); }
  if (o.ppt) { poly(s, [[x, yb - 0.02], [x + w, yb - 0.02], ...arc(yb, 0, Math.PI)], o.ppt[0], null); for (let i = 0; i < 7; i++) ball(s, x + 0.08 + (w - 0.16) * ((i * 37) % 7) / 6, yb - 0.12 - ((i * 53) % 5) * 0.09, 0.025, o.ppt[0], o.ppt[1], 0.5); }
  line(s, x, y, x, yb, C.ink, 1.5); line(s, x + w, y, x + w, yb, C.ink, 1.5);
  poly(s, arc(yb, 0, Math.PI), null, C.ink, { open: true, lw: 1.5 });
  if (o.lip !== false) { line(s, x - 0.04, y, x, y, C.ink, 1.5); line(s, x + w, y, x + w + 0.04, y, C.ink, 1.5); }
  return { cx, yb };
}
function bubbles(s, pts, r = 0.035) { pts.forEach(([x, y]) => ball(s, x, y, r, 'FFFFFF', WAT[1], 0.6)); }
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
function funnel(s, cx, top, w, h, o = {}) {
  const sw = 0.1, stem = o.stem || 0.45;
  poly(s, [[cx - w / 2, top], [cx + w / 2, top], [cx + sw / 2, top + h], [cx - sw / 2, top + h]], GLASS, C.ink, { lw: 1.5 });
  box(s, cx - sw / 2, top + h, sw, stem, GLASS, C.ink, { lw: 1.25 });
  poly(s, [[cx - w / 2 + 0.07, top + 0.03], [cx + w / 2 - 0.07, top + 0.03], [cx, top + h + 0.02]], 'FFFFFF', '9AA3B0', { lw: 0.75 });
  if (o.residue) { const rh = h * 0.42, rw = (w / 2 - 0.07) * 0.42; poly(s, [[cx - rw, top + h - rh], [cx + rw, top + h - rh], [cx, top + h]], o.residue[0], o.residue[1], { lw: 0.5 }); }
  if (o.drip) ball(s, cx, top + h + stem + 0.07, 0.035, o.drip, o.drip);
}
function basin(s, cx, y, w, d, liq) {
  const pts = []; for (let i = 0; i <= 24; i++) { const t = Math.PI * i / 24; pts.push([cx + (w / 2) * Math.cos(t), y + d * Math.sin(t)]); }
  poly(s, pts, 'F4F4F4', null);
  if (liq) {
    const pts2 = []; for (let i = 0; i <= 24; i++) { const t = 0.35 + (Math.PI - 0.7) * i / 24; pts2.push([cx + (w / 2) * Math.cos(t), y + d * Math.sin(t)]); }
    poly(s, pts2, liq, null);
  }
  poly(s, pts, null, C.ink, { open: true, lw: 1.5 });
  line(s, cx - w / 2, y, cx + w / 2, y, C.ink, 1.5);
}
function crystal(s, cx, cy, r, col = CUSO4) { poly(s, [[cx - r * 0.3, cy - r], [cx + r, cy - r * 0.45], [cx + r * 0.3, cy + r], [cx - r, cy + r * 0.45]], col[0], col[1], { lw: 0.75 }); }
const UI = ['D7191C', 'E8402A', 'F26B22', 'F7941D', 'FDB813', 'FFDE17', 'C8D82B', '7DC242', '2FA84F', '00A88F', '00A4D6', '0072BC', '2E3192', '5B2C8F', '4B1E6E'];
function phStrip(s, x, y, w, h, o = {}) {
  const cw = w / 15;
  UI.forEach((c, i) => {
    box(s, x + i * cw, y, cw, h, c, 'FFFFFF', { lw: 0.5 });
    label(s, x + i * cw, y, cw, `**${i}**`, { size: o.size || 11, h, color: (i <= 1 || i >= 11) ? C.white : C.ink });
  });
  return cw;
}
function phMeter(s, x, y, w, reading, pxp, py0, py1) {
  box(s, x, y, w, 0.8, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, x + 0.12, y + 0.1, w - 0.24, 0.4, '1F2A3A', null);
  label(s, x + 0.12, y + 0.1, w - 0.24, reading, { size: 13, bold: true, color: '7CFC9A', h: 0.4 });
  label(s, x, y + 0.53, w, 'pH meter', { size: 10, h: 0.22, color: C.grey });
  line(s, x + w, y + 0.4, pxp, py0, '4A5568', 1.25);
  box(s, pxp - 0.05, py0, 0.1, py1 - py0, 'D9DEE6', '4A5568', { lw: 1 });
  ball(s, pxp, py1, 0.07, 'F2F2F2', '4A5568', 1);
}
function tripodBunsen(s, cx, y, yb, o = {}) {
  const hw = o.hw || 0.6;
  box(s, cx - hw - 0.05, y, 2 * hw + 0.1, 0.05, '9AA3B0', '5A6275', { lw: 0.75 });
  line(s, cx - hw + 0.05, y + 0.05, cx - hw - 0.05, yb, '5A6275', 2); line(s, cx + hw - 0.05, y + 0.05, cx + hw + 0.05, yb, '5A6275', 2);
  box(s, cx - 0.25, yb - 0.08, 0.5, 0.08, '5A6275', '3A4255');
  const th = Math.max(0.3, (yb - y) * 0.42);
  box(s, cx - 0.06, yb - th, 0.12, th - 0.08, '8C96A8', '5A6275', { lw: 0.75 });
  const fh = Math.min(0.45, yb - th - y - 0.08);
  if (fh > 0.05) {
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.11, y: yb - th - fh, w: 0.22, h: fh, fill: { color: '5B8DEF' }, line: { color: '2F5FBF', width: 0.75 } });
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: cx - 0.05, y: yb - th - fh * 0.6, w: 0.1, h: fh * 0.6, fill: { color: 'BFD4FB' }, line: { type: 'none' } });
  }
}
function balance(s, x, y, reading) {
  box(s, x, y, 1.35, 0.55, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  box(s, x + 0.1, y + 0.13, 1.15, 0.29, '1F2A3A', null);
  label(s, x + 0.1, y + 0.13, 1.15, reading, { size: 11, bold: true, color: '7CFC9A', h: 0.29 });
  box(s, x + 0.15, y - 0.12, 1.05, 0.11, '9AA3B0', '4A5568', { lw: 0.75 });
}
function spatula(s, x1, y1, x2, y2, powder) {
  line(s, x1, y1, x2, y2, '6B7385', 3);
  oval(s, x2, y2, 0.26, 0.11, 'B8BEC9', '6B7385', { lw: 0.75 });
  if (powder) oval(s, x2, y2 - 0.04, 0.2, 0.08, powder[0], powder[1], { lw: 0.5 });
}
// burette: centre cx, top yTop, tube length len; level = reading (cm³); scale 0 at top
function burette(s, cx, yTop, len, o = {}) {
  const w = o.w || 0.2, y0 = yTop + 0.15, y50 = yTop + len - 0.2, yv = v => y0 + (y50 - y0) * v / 50;
  box(s, cx - w / 2, yTop, w, len, GLASS, null);
  const ly = yv(o.level || 0);
  box(s, cx - w / 2, ly, w, yTop + len - ly, o.liquid || ACIDC, null);
  for (let v = 0; v <= 50; v += 5) {
    const maj = v % 10 === 0;
    line(s, cx - w / 2, yv(v), cx - w / 2 + (maj ? 0.1 : 0.06), yv(v), C.ink, 0.6);
    if (maj && o.numbers) label(s, cx - w / 2 - 0.4, yv(v) - 0.1, 0.36, String(v), { size: 10, h: 0.2, align: 'right', color: C.grey });
  }
  line(s, cx - w / 2, yTop, cx - w / 2, yTop + len, C.ink, 1.25); line(s, cx + w / 2, yTop, cx + w / 2, yTop + len, C.ink, 1.25);
  const yt = yTop + len;
  box(s, cx - 0.05, yt, 0.1, 0.16, o.liquid || ACIDC, C.ink, { lw: 1 });
  box(s, cx - 0.17, yt + 0.04, 0.34, 0.08, '4A5568', '2A2F3A', { lw: 0.75 });
  poly(s, [[cx - 0.05, yt + 0.16], [cx + 0.05, yt + 0.16], [cx + 0.02, yt + 0.38], [cx - 0.02, yt + 0.38]], o.liquid || ACIDC, C.ink, { lw: 1 });
  return { yTap: yt + 0.08, yJet: yt + 0.38, yv };
}
function pipette(s, cx, yTop, len) {
  const sw = 0.07, bulbH = len * 0.28, bulbW = 0.28, yb0 = yTop + len * 0.38, yb1 = yb0 + bulbH;
  box(s, cx - sw / 2, yTop, sw, yb0 - yTop + 0.03, GLASS, C.ink, { lw: 1 });
  oval(s, cx, (yb0 + yb1) / 2, bulbW, bulbH, GLASS, C.ink, { lw: 1.25 });
  poly(s, [[cx - sw / 2, yb1 - 0.03], [cx + sw / 2, yb1 - 0.03], [cx + 0.015, yTop + len], [cx - 0.015, yTop + len]], GLASS, C.ink, { lw: 1 });
  line(s, cx - 0.09, yTop + len * 0.14, cx + 0.09, yTop + len * 0.14, C.red, 1.5);
}
function meniscus(s, x0, x1, yEdge, yBot, yEnd, col) {
  const pts = [];
  for (let i = 0; i <= 16; i++) { const t = i / 16, x = x0 + (x1 - x0) * t; pts.push([x, yBot - (yBot - yEdge) * Math.pow(2 * t - 1, 2)]); }
  poly(s, [...pts, [x1, yEnd], [x0, yEnd]], col, null);
  poly(s, pts, null, '3A6EA5', { open: true, lw: 1.5 });
}
// titration rig: clamp stand + burette over conical flask on a white tile
function rig(s, x, yBase, o = {}) {
  const bx = x + 1.15, len = o.len || 2.9, yTop = yBase - len - 1.55;
  box(s, x - 0.35, yBase - 0.12, 1.75, 0.12, '5A6275', '4A5262');
  box(s, x - 0.04, yTop - 0.15, 0.08, yBase - yTop + 0.03, '8C96A8', '6B7385');
  box(s, x, yTop + 0.45, bx - x - 0.1, 0.06, '8C96A8', '6B7385');
  box(s, bx - 0.16, yTop + 0.38, 0.32, 0.2, '4A5262', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.04 });
  const b = burette(s, bx, yTop, len, { level: o.level || 0, numbers: o.numbers });
  box(s, bx - 0.65, yBase - 0.22, 1.3, 0.1, C.white, '9AA3B0', { lw: 1 });
  conical(s, bx, yBase - 0.22 - 1.05, 1.0, 1.05, 0.42, o.flask || PINK[0]);
  return { bx, yTop, len, b };
}
// d.c. supply box with − (left) and + (right) terminals; returns terminal points
function dcSupply(s, cx, cy, w = 1.6) {
  box(s, cx - w / 2, cy - 0.3, w, 0.6, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, cx - w / 2, cy - 0.3, w, 'd.c. supply', { size: 10.5, bold: true, h: 0.6 });
  const tl = [cx - w / 2 - 0.12, cy], tr = [cx + w / 2 + 0.12, cy];
  ball(s, tl[0], tl[1], 0.1, '2A2F3A', '2A2F3A'); label(s, tl[0] - 0.1, tl[1] - 0.12, 0.2, '−', { size: 12, bold: true, color: C.white, h: 0.22 });
  ball(s, tr[0], tr[1], 0.1, C.red, C.red); label(s, tr[0] - 0.1, tr[1] - 0.12, 0.2, '+', { size: 12, bold: true, color: C.white, h: 0.22 });
  return { tl, tr };
}
// electrolysis cell: beaker top-left (x, y) size w×h; cathode (−) on the LEFT, anode (+) on the RIGHT
function eCell(s, x, y, w, h, o = {}) {
  beaker(s, x, y, w, h, o.level || 0.78, o.liq || CUSO4[0], { surface: o.surf || CUSO4[1] });
  const xC = x + w * 0.27, xA = x + w * 0.73, eTop = y - (o.above || 0.35), eBot = y + h - (o.gap || 0.3);
  const ew = o.ew || 0.16;
  const cc = o.cathode || GRAPH, ac = o.anode || GRAPH;
  box(s, xC - (o.cw || ew) / 2, eTop, o.cw || ew, eBot - eTop, cc[0], cc[1], { lw: 1 });
  box(s, xA - (o.aw || ew) / 2, eTop, o.aw || ew, eBot - eTop, ac[0], ac[1], { lw: 1 });
  const ySup = o.ySup != null ? o.ySup : y - 0.95;
  const T2 = dcSupply(s, (xC + xA) / 2, ySup, Math.min(1.6, xA - xC - 0.5));
  wire(s, [[xC, eTop], [xC, ySup], [T2.tl[0] - 0.1, ySup]], C.ink, 1.5);
  wire(s, [[xA, eTop], [xA, ySup], [T2.tr[0] + 0.1, ySup]], C.ink, 1.5);
  if (o.labels !== false) {
    const cwh = (o.cw || ew) / 2, awh = (o.aw || ew) / 2;
    label(s, xC - cwh - 1.4, y - (o.cNote ? 0.6 : 0.36), 1.32, '**cathode (−)**', { size: 10.5, align: 'right', color: '2A2F3A' });
    label(s, xA + awh + 0.08, y - (o.aNote ? 0.6 : 0.36), 1.32, '**anode (+)**', { size: 10.5, align: 'left', color: C.red });
    if (o.cNote) label(s, xC - cwh - 1.75, y - 0.36, 1.67, o.cNote, { size: 10, align: 'right', h: 0.24 });
    if (o.aNote) label(s, xA + awh + 0.08, y - 0.36, 1.67, o.aNote, { size: 10, align: 'left', h: 0.24 });
  }
  return { xC, xA, eTop, eBot, ySurf: y + h * (1 - (o.level || 0.78)), yb: y + h };
}
const HT_FILL = 'FBE3E4';
// equation as runs, with chosen terms struck through (spectator ions) — text from the same eq() data


// ======================= T8 helpers =======================
function eqLine(s, x, y, w, key, o = {}) { eqn(s, x, y, w, EQ[key], Object.assign({ size: 11.5 }, o)); }
function flowBox(s, x, y, w, h, head, sub, col) {
  box(s, x, y, w, h, col[0], col[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, x + 0.05, y + 0.04, w - 0.1, `**${head}**`, { size: 11, h: 0.3, color: C.ink });
  if (sub) label(s, x + 0.05, y + 0.34, w - 0.1, sub, { size: 9.5, h: h - 0.38, color: C.text, valign: 'top' });
}
// displayed formula of a straight-chain alkane, carbons in a row
function alkane(s, x, y, n, sp = 0.5, sz = 11) {
  for (let k = 0; k < n; k++) {
    const cx = x + k * sp;
    label(s, cx - 0.15, y - 0.14, 0.3, '**C**', { size: sz, h: 0.28 });
    if (k < n - 1) line(s, cx + 0.12, y, cx + sp - 0.12, y, C.ink, 1.25);
    label(s, cx - 0.15, y - 0.55, 0.3, 'H', { size: sz - 1, h: 0.26 }); line(s, cx, y - 0.3, cx, y - 0.14, C.ink, 1);
    label(s, cx - 0.15, y + 0.28, 0.3, 'H', { size: sz - 1, h: 0.26 }); line(s, cx, y + 0.14, cx, y + 0.3, C.ink, 1);
  }
  label(s, x - 0.55, y - 0.14, 0.3, 'H', { size: sz - 1, h: 0.26 }); line(s, x - 0.27, y, x - 0.12, y, C.ink, 1);
  const ex = x + (n - 1) * sp;
  label(s, ex + 0.25, y - 0.14, 0.3, 'H', { size: sz - 1, h: 0.26 }); line(s, ex + 0.12, y, ex + 0.27, y, C.ink, 1);
}
const FRACS = [['refinery gases', 'heating and cooking (LPG)', '1–4', 'DCE8F7'], ['petrol', 'fuel for cars', '5–10', 'E3EEF9'], ['kerosene', 'fuel for aircraft', '10–16', 'EFE6FA'],
  ['diesel oil', 'some cars and trains', '14–20', 'F6E6F2'], ['fuel oil', 'large ships, some power stations', '20–40', 'FBE6DA'], ['bitumen', 'roads and roofs', '40+', 'E8DCCB']];

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Fuels and Earth science',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • crude oil, pollutants, cracking, atmosphere, climate` },
    { icon: 'H', text: 'Higher & Foundation in one deck • no Higher-only statements believed in Topic 8' },
    { icon: '8', text: 'Topic 8 • Paper 2 • same content in Combined Science • every equation checked' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 8 Fuels and Earth science (Paper 2). No Higher-only statements and no chemistry-only statements believed (medium confidence). No Core Practical. Numbering reconstructed from memory: see SPEC_T8.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '8.1–8.4', text: 'Describe **crude oil**; explain **fractional distillation**; name the **fractions** and their uses.' },
  { code: '8.5–8.6', text: 'Explain how fractions differ; describe the **alkanes** as a **homologous series**.' },
  { code: '8.7–8.10', text: 'Describe **complete** and **incomplete combustion**; dangers of **CO** and **soot**.' },
  { code: '8.11–8.14', text: 'Explain how **SO₂** and **NOₓ** form; **acid rain**.' },
  { code: '8.15–8.18', text: 'Evaluate **hydrogen** as a fuel; explain **cracking** and why it is needed.' },
  { code: '8.19–8.24', text: 'Describe how the **early atmosphere** changed; the **test for oxygen**.' },
  { code: '8.25–8.26', text: 'Explain the **greenhouse effect**; evaluate evidence for **climate change**.' },
  { code: '8.27–8.28', text: 'Describe human effects on the atmosphere, **mitigation** and **effects on climate**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'No HT statements believed in Topic 8. Lots of evaluation and data interpretation.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 8 is assessed on Paper 2`, { tag: 'Context' });
  const nodes = [
    ['8.1–8.6', 'Crude oil, fractions, alkanes', 'BOTH COURSES', C.blue],
    ['8.7–8.10', 'Combustion; carbon monoxide and soot', 'BOTH COURSES', C.blue],
    ['8.11–8.14', 'Sulfur dioxide, NOₓ, acid rain', 'BOTH COURSES', C.blue],
    ['8.15–8.16', 'Hydrogen as a fuel; fossil fuels', 'BOTH COURSES', C.blue],
    ['8.17–8.18', 'Cracking', 'BOTH COURSES', C.blue],
    ['8.19–8.24', 'Early atmosphere; test for oxygen', 'BOTH COURSES', C.blue],
    ['8.25–8.28', 'Greenhouse effect and climate change', 'BOTH COURSES', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 8\nFuels and Earth', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 2 fractional distillation • Topic 7 exothermic reactions • Topic 9 alkanes and alkenes (chemistry only)', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1CH0 **Paper 2** (2F or 2H): 1 h 45 min, 100 marks, Topics 1 and 6–9.',
      'Combined Science 1SC0 tests the **same** Topic 8 statements.',
      'Expect **data** and **evaluation** questions (climate graphs, hydrogen cars).',
      'No Core Practical in Topic 8.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**No HT** and **no chemistry-only** statements believed: every class uses every slide.',
      'Higher students should balance combustion equations and evaluate data critically.',
      'Every equation is checked for **atoms and charges**.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'No HT or C statements believed (medium confidence). Numbering reconstructed: see SPEC_T8.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 2 • separation', q: 'What does **fractional distillation** separate?' },
  { from: 'Topic 1 • bonding', q: 'Why do simple molecules have **low** boiling points?' },
  { from: 'Topic 7 • energy', q: 'Is combustion **exothermic** or **endothermic**?' },
  { from: 'Topic 3 • acids', q: 'What is the pH range of an **acid**?' },
  { from: 'Topic 6 • gas tests', q: 'Describe the test for **hydrogen**.' },
  { from: 'KS3 • biology', q: 'Write the word equation for **photosynthesis**.' },
], { subtitle: 'Recall from KS3 and Topics 1–7 • 6 minutes • no notes', notes: 'ANSWERS\n1. Liquids with different boiling points (a mixture of miscible liquids).\n2. Weak forces between molecules need little energy to overcome.\n3. Exothermic.\n4. Below 7.\n5. Lighted splint: squeaky pop.\n6. Carbon dioxide + water → glucose + oxygen (light, chlorophyll).' }), 'Retrieval starter');

// ======================= 5 CRUDE OIL =======================
reg(D.contentSlide({
  title: 'Crude oil and hydrocarbons',
  subtitle: 'Specification 8.1–8.2 • a finite mixture of hydrocarbons',
  tag: '8.1–8.2', caption: 'displayed formulae: carbon atoms in chains (and some in rings)',
  draw: (s, p) => {
    label(s, 0.7, 1.5, 2.0, '**ethane, C₂H₆**', { size: 11, h: 0.3, align: 'left', color: C.blue });
    alkane(s, 1.4, 2.4, 2);
    label(s, 3.3, 1.5, 3.0, '**pentane, C₅H₁₂**', { size: 11, h: 0.3, align: 'left', color: C.blue });
    alkane(s, 3.75, 2.4, 5, 0.55);
    label(s, 0.7, 3.25, 2.5, '**a ring hydrocarbon**', { size: 11, h: 0.3, align: 'left', color: C.blue });
    const cx = 1.9, cy = 4.35, R = 0.55, pts = [];
    for (let k = 0; k < 6; k++) { const a = Math.PI / 6 + k * Math.PI / 3; pts.push([cx + R * Math.cos(a), cy + R * Math.sin(a)]); }
    pts.forEach((q, k) => { const n = pts[(k + 1) % 6]; line(s, q[0], q[1], n[0], n[1], C.ink, 1.5); label(s, q[0] - 0.12, q[1] - 0.12, 0.24, '**C**', { size: 9, h: 0.24 }); });
    box(s, 3.2, 3.5, 3.2, 1.7, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 3.3, 3.55, 3.0, 'Crude oil is:\n• a mixture of hydrocarbons\n• a source of fuels and feedstock\n• finite: non-renewable', { size: 10.5, h: 1.6, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    'A **hydrocarbon** is a compound of **carbon and hydrogen only**.',
    '**Crude oil** is a complex mixture of hydrocarbons whose carbon atoms are joined in **chains** or **rings**.',
    'It is an important source of **fuels** and of **feedstock** for the **petrochemical industry** (plastics, solvents, medicines).',
    'It is **finite**: it formed over millions of years and is being used up much faster than it forms.',
  ],
  worked: { head: 'Classify', q: 'Is ethanol, C₂H₅OH, a hydrocarbon?',
    steps: [['Elements', 'carbon, hydrogen AND oxygen'], ['Answer', 'no: a hydrocarbon has C and H only']], size: 11 },
  workedH: 1.5,
  qc: 'Explain why crude oil is described as a **finite** resource.',
  notes: 'QUICK CHECK ANSWER: it takes millions of years to form (1); we use it much faster than it is made, so it will run out (1).\nSpec 8.1–8.2.',
}), '8.1–8.2 Crude oil');

// ======================= 6 FRACTIONAL DISTILLATION =======================
reg(D.contentSlide({
  title: 'Fractional distillation of crude oil',
  subtitle: 'Specification 8.3–8.4 • fractions and their uses',
  tag: '8.3–8.4', caption: 'fractionating column: hot at the bottom, cooler at the top (carbon numbers approximate)',
  draw: (s, p) => {
    const x0 = 1.0, w = 1.4, top = 1.55, bot = 5.35, n = FRACS.length, hh = (bot - top) / n;
    box(s, x0, top, w, bot - top, 'F4F4F4', '4A5262', { lw: 1.75 });
    FRACS.forEach(([f, u, cn, col], i) => {
      const y = top + i * hh;
      box(s, x0, y, w, hh, col, null);
      if (i) line(s, x0, y, x0 + w, y, '4A5262', 1);
      arrow(s, x0 + w, y + hh / 2, x0 + w + 0.4, y + hh / 2, C.ink, 1.5);
      label(s, x0 + w + 0.45, y + 0.02, 2.0, `**${f}**`, { size: 10.5, h: 0.3, align: 'left' });
      label(s, x0 + w + 0.45, y + 0.28, 3.0, `${u} • C${cn}`, { size: 9, h: 0.28, align: 'left', color: C.grey });
    });
    arrow(s, 0.3, 5.1, x0, 5.1, C.red, 2.5); label(s, 0.05, 4.7, 1.0, 'hot crude oil vapour', { size: 9, h: 0.4, color: C.red });
    arrow(s, 0.65, 4.4, 0.65, 2.0, C.orange, 2); label(s, 0.05, 2.05, 0.55, 'cooler', { size: 9, h: 0.25, color: C.orange });
  },
  head: 'How it works',
  lines: [
    'Crude oil is **heated** until it evaporates; the vapour enters the column near the bottom.',
    'The column has a **temperature gradient**: **hot** at the bottom, **cooler** at the top.',
    'Vapours rise and **condense** at the level where the temperature falls below their **boiling point**.',
    'Each **fraction** is a mixture of hydrocarbons with **similar boiling points**. Bitumen does not evaporate and comes out at the bottom.',
  ],
  worked: { head: 'Explain', q: 'Why do refinery gases come out at the top?',
    steps: [['Molecules', 'smallest molecules (1–4 carbons)'], ['Boiling point', 'very low: they do not condense in the column'], ['Answer', 'leave at the top as gases']], size: 11 },
  workedH: 1.75,
  qc: 'Name the fraction used as **aircraft fuel** and the fraction used for **roads**.',
  notes: 'QUICK CHECK ANSWER: kerosene (1); bitumen (1).\nCarbon-number ranges are approximate (sources differ). Spec 8.3–8.4.',
}), '8.3–8.4 Fractional distillation');

// ======================= 7 PROPERTIES OF FRACTIONS =======================
{
  const s = D.contentHeader('How the fractions differ', 'Specification 8.5 • size of molecules controls the properties', { tag: '8.5' });
  const rows = [[HDR('Property'), HDR('Top of the column (e.g. gases, petrol)'), HDR('Bottom of the column (e.g. fuel oil, bitumen)')],
    ...[['Number of C and H atoms', 'fewer: small molecules', 'more: large molecules'], ['Boiling point', 'low', 'high'], ['Ease of ignition', 'ignite easily (flammable)', 'hard to ignite'], ['Viscosity', 'runny (low viscosity)', 'thick (high viscosity)']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [3.0, 4.7, 4.73], rowH: 0.5, fontFace: 'Calibri', fontSize: 12.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  arrow(s, 0.6, 4.2, 12.6, 4.2, C.red, 2.5);
  label(s, 0.6, 4.3, 12.0, 'molecules get **bigger** → stronger forces between molecules → **higher** boiling point and viscosity, **harder** to ignite', { size: 12.5, h: 0.4, color: C.red });
  D.card(s, 0.45, 4.85, 12.43, 1.4, 'Alkanes', ['Most of the hydrocarbons in crude oil are **alkanes**: saturated hydrocarbons with the general formula **CₙH₂ₙ₊₂**.'], { size: 12.5 });
  D.quickCheck(s, 'Explain why bitumen has a **higher boiling point** than petrol.');
  D.notes(s, 'QUICK CHECK ANSWER: bitumen has much larger molecules (more carbon atoms) (1); so the forces between molecules are stronger and need more energy to overcome (1).\nSpec 8.5.');
  reg(s, '8.5 Properties of fractions');
}

// ======================= 8 HOMOLOGOUS SERIES =======================
reg(D.contentSlide({
  title: 'The alkanes: a homologous series',
  subtitle: 'Specification 8.6 • same general formula, differ by CH₂',
  tag: '8.6', caption: 'boiling points of the first six alkanes (data-book values)',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.55, w: 4.8, h: 2.5, xmin: 0, xmax: 7, xstep: 1, ymin: -200, ymax: 100, ystep: 50, xlabel: 'number of carbon atoms', ylabel: 'boiling point (°C)', grid: true };
    axes(s, g);
    const pts = ALK.map(([, c, bp]) => [c, bp]);
    plotLine(s, g, pts, '7B4FB8', 2); points(s, g, pts, '7B4FB8');
    const rows = [[HDR('Name'), HDR('Formula'), HDR('bp (°C)')], ...ALK.slice(0, 4).map(([n, c, bp], i) => [tcell(n, i, { bold: true }), tcell(fmtF(alkF(c)), i, { align: 'center' }), tcell(String(bp).replace('-', '−'), i, { align: 'center' })])];
    s.addTable(rows, { x: 0.8, y: 4.45, w: 5.5, colW: [2.0, 1.75, 1.75], rowH: 0.27, fontFace: 'Calibri', fontSize: 10, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'A homologous series…',
  lines: [
    'has the **same general formula** (alkanes: **CₙH₂ₙ₊₂**);',
    'neighbouring members **differ by CH₂**;',
    'shows a **gradual change** in physical properties, e.g. **boiling point increases** as the chain gets longer;',
    'has **similar chemical properties** (e.g. all alkanes burn to give CO₂ and H₂O).',
  ],
  worked: { head: 'Use the formula', q: 'Write the formula of the alkane with 10 carbon atoms.',
    steps: [['General formula', 'CₙH₂ₙ₊₂ with n = 10'], ['Hydrogen', '2 × 10 + 2 = 22'], ['Answer', 'C₁₀H₂₂ (decane)']], size: 11 },
  workedH: 1.75,
  qc: 'Predict the state of **pentane** (C₅H₁₂) at 25 °C. Use the graph.',
  notes: 'QUICK CHECK ANSWER: liquid (1); its boiling point (36 °C) is above 25 °C (and it melts well below 25 °C) (1).\nFormulae and the CH₂ difference checked in node. Spec 8.6.',
}), '8.6 Homologous series');

// ======================= 9 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 8.1–8.6 • crude oil and alkanes', [
  { q: 'What is a **hydrocarbon**?', marks: 1, ms: 'A compound containing carbon and hydrogen only (1).' },
  { q: 'Explain how crude oil is separated into fractions.', marks: 3, ms: 'Crude oil is heated / evaporated (1); the column is hotter at the bottom and cooler at the top (1); fractions condense at different heights according to their boiling points (1).' },
  { q: 'Give **two** differences between the petrol fraction and the fuel oil fraction.', marks: 2, ms: 'Any two: petrol has smaller molecules / lower boiling point / ignites more easily / is less viscous (1 each).' },
  { q: 'Write the formula of the alkane with **8** carbon atoms.', marks: 1, ms: 'C₈H₁₈ (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 10 COMBUSTION =======================
reg(D.contentSlide({
  title: 'Complete and incomplete combustion',
  subtitle: 'Specification 8.7–8.8 • enough oxygen, or not',
  tag: '8.7–8.8', caption: 'Bunsen burner: air hole open (blue, complete) and closed (yellow, sooty, incomplete)',
  draw: (s, p) => {
    [[1.8, true], [4.6, false]].forEach(([x, open]) => {
      box(s, x - 0.13, 3.3, 0.26, 1.8, '8C96A8', '5A6275', { lw: 1 });
      box(s, x - 0.35, 5.1, 0.7, 0.15, '5A6275', '3A4255');
      box(s, x - 0.13, 4.6, 0.26, 0.15, open ? '1A1F2A' : '8C96A8', '3A4255');
      if (open) { s.addShape(SH.ISOSCELES_TRIANGLE, { x: x - 0.22, y: 2.2, w: 0.44, h: 1.1, fill: { color: '5B8DEF' }, line: { color: '2F5FBF', width: 1 } }); s.addShape(SH.ISOSCELES_TRIANGLE, { x: x - 0.1, y: 2.65, w: 0.2, h: 0.65, fill: { color: 'BFD4FB' }, line: { type: 'none' } }); }
      else { oval(s, x, 2.4, 0.6, 1.8, 'F7C548', 'E09A1A', { lw: 1 }); [[x - 0.1, 1.4], [x + 0.12, 1.25], [x, 1.1]].forEach(([a, b]) => ball(s, a, b, 0.06, '333333', '111111')); }
      label(s, x - 1.1, 5.35, 2.2, open ? '**air hole open**' : '**air hole closed**', { size: 10.5, h: 0.3 });
    });
    label(s, 0.6, 1.5, 2.5, 'complete:\nCO₂ + H₂O', { size: 10.5, h: 0.5, color: '2F5FBF', bold: true });
    label(s, 5.0, 1.5, 1.6, 'incomplete:\nCO, C (soot)', { size: 10.5, h: 0.5, color: 'B5651D', bold: true });
  },
  head: 'Key ideas',
  lines: [
    '**Complete combustion** (plenty of oxygen): hydrocarbon + oxygen → **carbon dioxide + water**; **energy is given out** (exothermic).',
    '**Incomplete combustion** (limited oxygen): the carbon is only partly oxidised, so **carbon monoxide** (CO) and/or **carbon** (soot) form, plus water. Less energy is released.',
  ],
  worked: { head: 'Equations', q: '',
    steps: [['Complete', EQ['CH4 burn']], ['Incomplete (CO)', EQ['CH4 CO']], ['Incomplete (C)', EQ['CH4 C']]], size: 10.5 },
  workedH: 1.85,
  qc: 'Balance the complete combustion of propane: C₃H₈ + __O₂ → __CO₂ + __H₂O.',
  notes: `QUICK CHECK ANSWER: ${EQ['C3H8 burn']} (1 for 5O₂; 1 for 3CO₂ + 4H₂O).\nAll equations checked. Spec 8.7–8.8.`,
}), '8.7–8.8 Combustion');

// ======================= 11 CO AND SOOT =======================
reg(D.contentSlide({
  title: 'Carbon monoxide and soot',
  subtitle: 'Specification 8.9–8.10 • why incomplete combustion is dangerous',
  tag: '8.9–8.10', caption: 'carbon monoxide binds to haemoglobin in red blood cells',
  draw: (s, p) => {
    oval(s, 2.2, 2.9, 2.6, 1.6, 'E57373', 'B23B3B', { lw: 1.5 }); oval(s, 2.2, 2.9, 1.2, 0.7, 'D45A5A', null);
    label(s, 0.9, 2.65, 2.6, '**red blood cell**\n(haemoglobin)', { size: 10.5, h: 0.5, color: C.white });
    [[4.2, 2.3, 'O₂', 'DCE8F7', false], [4.2, 3.5, 'CO', '4A4F5A', true]].forEach(([x, y, t, col, bad]) => {
      ball(s, x, y, 0.26, col, '4A5262', 1); label(s, x - 0.3, y - 0.14, 0.6, `**${t}**`, { size: 11, h: 0.28, color: bad ? C.white : C.ink });
      arrow(s, x - 0.3, y, 3.55, y > 3 ? 3.2 : 2.6, bad ? C.red : '7A9CC9', 2);
      label(s, x + 0.35, y - 0.15, 2.0, bad ? 'binds strongly: blocks O₂' : 'normally carried', { size: 10, h: 0.3, align: 'left', color: bad ? C.red : C.grey });
    });
    box(s, 0.7, 4.3, 5.7, 1.0, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.8, 4.3, 5.5, '**Soot**: blackens appliances and buildings, blocks flues, causes breathing problems', { size: 10.5, h: 1.0 });
  },
  head: 'Key ideas',
  lines: [
    'Carbon monoxide is **toxic**: it combines with **haemoglobin** in red blood cells, so the blood carries **less oxygen**. This can cause unconsciousness and death.',
    'CO is **colourless and odourless**: you cannot see or smell it. Use a **CO detector**.',
    'Faulty gas boilers and heaters with **poor ventilation** or blocked flues produce CO and **soot**.',
    'Soot (carbon particles) **blackens** surfaces, **blocks** chimneys and damages **lungs**.',
  ],
  worked: { head: 'Explain', q: 'Why should gas boilers be serviced every year?',
    steps: [['Fault', 'poor air supply → incomplete combustion'], ['Danger', 'toxic CO and soot produced'], ['Answer', 'checks keep enough oxygen reaching the flame']], size: 11 },
  workedH: 1.75,
  qc: 'Why is carbon monoxide especially dangerous compared with smoke?',
  notes: 'QUICK CHECK ANSWER: it is colourless and odourless, so it cannot be detected without a detector (1); it is toxic: reduces the oxygen carried by the blood (1).\nSpec 8.9–8.10.',
}), '8.9–8.10 CO and soot');

// ======================= 12 SO2, NOx, ACID RAIN =======================
reg(D.contentSlide({
  title: 'Sulfur dioxide, oxides of nitrogen and acid rain',
  subtitle: 'Specification 8.11–8.14 • pollutants from burning fuels',
  tag: '8.11–8.14', caption: 'how burning fuels leads to acid rain',
  draw: (s, p) => {
    flowBox(s, 0.65, 1.55, 2.7, 1.05, 'Sulfur impurities', 'in fuels (coal, some oil) burn', ['FFF1D6', 'D9A441']);
    flowBox(s, 3.65, 1.55, 2.7, 1.05, 'High temperature in engines', 'N₂ and O₂ from air react', ['DCE8F7', '7A9CC9']);
    eqLine(s, 0.65, 2.75, 2.7, 'S burn', { size: 10 }); eqLine(s, 3.65, 2.75, 2.7, 'NO', { size: 10 });
    arrow(s, 2.0, 3.25, 3.2, 3.75, C.ink, 2); arrow(s, 5.0, 3.25, 3.8, 3.75, C.ink, 2);
    flowBox(s, 1.9, 3.8, 3.2, 0.95, 'Dissolve in rain water', 'SO₂ and NOₓ form acidic solutions', ['F9E0DA', 'C2685A']);
    eqLine(s, 1.6, 4.9, 3.8, 'SO2 rain', { size: 10 });
    label(s, 0.65, 5.35, 5.75, 'acid rain: damages trees, kills fish in lakes, corrodes limestone buildings and metal', { size: 10, h: 0.35, color: C.red });
  },
  head: 'Key ideas',
  lines: [
    'Some fuels contain **sulfur impurities**. When they burn, **sulfur dioxide** (SO₂) forms.',
    'In hot **engines**, **nitrogen and oxygen from the air** react to form **oxides of nitrogen** (NOₓ: NO and NO₂).',
    'SO₂ and NOₓ dissolve in rain water to form **acid rain**. NOₓ are also **toxic** and cause **breathing problems**.',
    'Reduce them: remove sulfur from fuels; **catalytic converters**; scrubbers in power stations.',
  ],
  worked: { head: 'Explain', q: 'Why do car engines produce NOₓ even though petrol contains no nitrogen?',
    steps: [['Source', 'nitrogen comes from the air'], ['Conditions', 'very high temperature in the engine'], ['Answer', 'N₂ and O₂ combine to form nitrogen oxides']], size: 11 },
  workedH: 1.75,
  qc: 'Give **two** effects of acid rain.',
  notes: `QUICK CHECK ANSWER: any two: damages / kills trees; makes lakes acidic, killing fish; corrodes limestone buildings and statues; corrodes metal (1 each).\nEquations checked: ${EQ['S burn']}; ${EQ['NO']}; ${EQ['NO2']}; ${EQ['SO2 rain']}. Spec 8.11–8.14.`,
}), '8.11–8.14 Acid rain');

// ======================= 13 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 8.7–8.14 • combustion and pollutants', [
  { q: 'Name the products of the **complete** combustion of a hydrocarbon.', marks: 2, ms: 'Carbon dioxide (1); water (1).' },
  { q: 'Explain why carbon monoxide is **toxic**.', marks: 2, ms: 'It combines with haemoglobin (in red blood cells) (1); so less oxygen is carried round the body (1).' },
  { q: 'Explain how **sulfur dioxide** is produced when coal is burned.', marks: 2, ms: 'Coal contains sulfur (impurities) (1); which reacts with oxygen when it burns (1).' },
  { q: 'Give **one** way of reducing the amount of NOₓ released by cars.', marks: 1, ms: 'Catalytic converter / lower engine temperature / use electric or hydrogen cars (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 14 HYDROGEN AS A FUEL =======================
{
  const s = D.contentHeader('Hydrogen or petrol?', 'Specification 8.15–8.16 • evaluating fuels for cars; fossil fuels', { tag: '8.15–8.16' });
  eqn(s, 0.45, 1.3, 6.1, EQ['H2 burn'], { size: 13 }); eqn(s, 6.78, 1.3, 6.1, EQ['octane burn'], { size: 13 });
  const rows = [[HDR(''), HDR('Hydrogen'), HDR('Petrol')],
    ...[['Product of combustion', 'water only: no CO₂', 'CO₂ (greenhouse gas), CO, NOₓ, soot'], ['Source', 'electrolysis of water or from natural gas (needs energy)', 'crude oil: finite'],
      ['Renewable?', 'can be, if made with renewable electricity', 'no: non-renewable fossil fuel'], ['Storage', 'gas: needs high-pressure tanks; flammable', 'liquid: easy to store and transport'],
      ['Infrastructure', 'few refuelling stations', 'filling stations everywhere'], ['Energy per kg', 'high', 'lower than hydrogen']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.9, w: 12.43, colW: [2.6, 5.0, 4.83], rowH: 0.42, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 0.45, 5.0, 12.43, 1.25, 'Fossil fuels (8.16)', ['**Petrol, kerosene and diesel oil** come from crude oil; **methane** is the main part of **natural gas**. All are **non-renewable fossil fuels**.'], { size: 12 });
  D.quickCheck(s, 'Hydrogen cars are called "zero-emission". Evaluate this claim.');
  D.notes(s, `QUICK CHECK ANSWER: true at the exhaust: only water is produced (1); but making hydrogen usually uses natural gas or electricity from fossil fuels, which releases CO₂ (1); so it depends on how the hydrogen is made (judgement) (1).\nEquations checked: ${EQ['H2 burn']}; ${EQ['octane burn']}. Spec 8.15–8.16.`);
  reg(s, '8.15–8.16 Hydrogen vs petrol');
}

// ======================= 15 CRACKING =======================
reg(D.contentSlide({
  title: 'Cracking',
  subtitle: 'Specification 8.17–8.18 • large alkanes → smaller alkanes + alkenes',
  tag: '8.17–8.18', caption: 'supply and demand for crude oil fractions (illustrative %)',
  draw: (s, p) => {
    const g = { x: 1.2, y: 1.6, w: 5.0, h: 2.6, xmin: 0, xmax: 6, xstep: 1, ymin: 0, ymax: 45, ystep: 10, xlabel: '', ylabel: '% of crude oil', grid: true, fmt: () => '' };
    axes(s, g);
    SD.forEach(([f, sup, dem], i) => {
      const x = px(g, i + 0.5);
      box(s, x - 0.3, py(g, sup), 0.28, py(g, 0) - py(g, sup), '7B4FB8', '7B4FB8');
      box(s, x + 0.02, py(g, dem), 0.28, py(g, 0) - py(g, dem), 'E8A040', 'E8A040');
      label(s, x - 0.45, py(g, 0) + 0.04, 0.9, f, { size: 8.5, h: 0.26 });
    });
    box(s, 1.4, 1.65, 0.18, 0.18, '7B4FB8', '7B4FB8'); label(s, 1.62, 1.6, 1.0, 'supply', { size: 9.5, h: 0.26, align: 'left' });
    box(s, 2.4, 1.65, 0.18, 0.18, 'E8A040', 'E8A040'); label(s, 2.62, 1.6, 1.0, 'demand', { size: 9.5, h: 0.26, align: 'left' });
    eqLine(s, 0.65, 4.75, 5.75, 'crack1', { size: 11.5 });
    label(s, 0.65, 5.2, 5.75, 'decane → octane (petrol) + **ethene** (an alkene, for plastics)', { size: 10.5, h: 0.35 });
  },
  head: 'Key ideas',
  lines: [
    '**Cracking** breaks down **large**, **saturated** hydrocarbons (alkanes) into **smaller, more useful** molecules, some of which are **unsaturated** (**alkenes**).',
    'Conditions: **heat** the vapour over a hot **catalyst** (or with steam at a very high temperature).',
    '**Why?** Crude oil contains **more large molecules** than are needed, but **not enough small ones** (e.g. petrol) to meet **demand**. Alkenes are used to make **polymers**.',
  ],
  worked: { head: 'Balance', q: 'C₁₂H₂₆ is cracked into octane and ethene. Write the equation.',
    steps: [['Atoms', 'C: 12 = 8 + 2 × 2;  H: 26 = 18 + 2 × 4'], ['Equation', EQ.crack2]], size: 10.5 },
  workedH: 1.5,
  qc: 'Use the chart: name **one** fraction that is cracked and **one** that is in short supply.',
  notes: `QUICK CHECK ANSWER: fuel oil (or kerosene) is in excess and is cracked (1); petrol (or gases) is in short supply (1).\nSupply/demand values are illustrative (each totals 100%, checked). Also checked: ${EQ.crack3}. Spec 8.17–8.18.`,
}), '8.17–8.18 Cracking');

// ======================= 16 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 8.15–8.18 • hydrogen fuel and cracking', [
  { q: 'Give **one** advantage and **one** disadvantage of hydrogen as a fuel for cars.', marks: 2, ms: 'Advantage: only water produced / no CO₂ at point of use (1); disadvantage: hard to store / flammable / few refuelling stations / made from fossil fuels (1).' },
  { q: 'What is **cracking**?', marks: 2, ms: 'Breaking down large (saturated) hydrocarbon molecules (1); into smaller, more useful molecules, including alkenes (1).' },
  { q: 'Explain why oil companies crack the fuel oil fraction.', marks: 2, ms: 'Supply of fuel oil is greater than demand (1); smaller molecules such as petrol are in high demand / more useful (1).' },
  { q: 'Balance: C₁₄H₃₀ → C₁₀H₂₂ + __C₂H₄', marks: 1, ms: '2 (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 17 EARLY ATMOSPHERE =======================
reg(D.contentSlide({
  title: 'The Earth’s early atmosphere',
  subtitle: 'Specification 8.19–8.22 • volcanoes, oceans and carbon dioxide',
  tag: '8.19–8.22', caption: 'how the early atmosphere changed (simplified timeline)',
  draw: (s, p) => {
    const st = [['Volcanoes', 'release CO₂, water vapour, small amounts of other gases (e.g. NH₃, CH₄)', ['F9E0DA', 'C2685A']], ['Early atmosphere', 'mostly CO₂; little or no oxygen', ['FFF1D6', 'D9A441']],
      ['Oceans form', 'Earth cools: water vapour condenses', ['DCE8F7', '7A9CC9']], ['CO₂ decreases', 'CO₂ dissolves in the oceans; later locked in sedimentary rocks', ['E1F3E6', '4E9A65']]];
    st.forEach(([h, t, col], i) => { const y = 1.5 + i * 1.0; flowBox(s, 0.9, y, 5.2, 0.8, h, t, col); if (i < 3) arrow(s, 3.5, y + 0.81, 3.5, y + 0.99, C.ink, 2); });
  },
  head: 'Key ideas',
  lines: [
    'The early atmosphere formed from gases released by **volcanic activity**.',
    'It is thought to have contained **little or no oxygen**, a **large amount of carbon dioxide**, **water vapour** and small amounts of other gases.',
    'As the Earth **cooled**, water vapour **condensed** to form the **oceans**.',
    'Carbon dioxide **dissolved** in the oceans, so the amount in the atmosphere **decreased**.',
  ],
  worked: { head: 'Evidence', q: 'How do scientists know about an atmosphere 4 billion years ago?',
    steps: [['Evidence', 'gases from volcanoes today; rocks and ice cores; other planets (Mars, Venus)'], ['Limitation', 'no direct measurements: ideas are based on interpretation']], size: 10.5 },
  workedH: 1.6,
  qc: 'Explain how the **oceans** formed.',
  notes: 'QUICK CHECK ANSWER: the Earth cooled (1); water vapour condensed into liquid water (1).\nSpec 8.19–8.22.',
}), '8.19–8.22 Early atmosphere');

// ======================= 18 OXYGEN =======================
reg(D.contentSlide({
  title: 'The rise of oxygen',
  subtitle: 'Specification 8.23–8.24 • photosynthesis; the test for oxygen',
  tag: '8.23–8.24', caption: 'composition of dry air today (approximate %)',
  draw: (s, p) => {
    const cx = 2.0, cy = 3.2, R = 1.25, cols = ['7A9CC9', 'E57373', 'F7C548', '4E9A65'];
    let a0 = -Math.PI / 2;
    ATM.forEach(([n, v], i) => {
      const a1 = a0 + 2 * Math.PI * v / 100, pts = [[cx, cy]];
      for (let k = 0; k <= 30; k++) { const t = a0 + (a1 - a0) * k / 30; pts.push([cx + R * Math.cos(t), cy + R * Math.sin(t)]); }
      if (v > 0.5) poly(s, pts, cols[i], 'FFFFFF', { lw: 1 });
      a0 = a1;
    });
    ATM.forEach(([n, v], i) => { box(s, 3.6, 2.2 + i * 0.45, 0.25, 0.25, cols[i], cols[i]); label(s, 3.95, 2.15 + i * 0.45, 2.5, `${n}: **${v}%**`, { size: 11, h: 0.32, align: 'left' }); });
    eqLine(s, 0.65, 4.75, 5.75, 'photo', { size: 11 });
  },
  head: 'Key ideas',
  lines: [
    '**Primitive plants** and algae carried out **photosynthesis**: they **used carbon dioxide** and **released oxygen**.',
    'So over billions of years the amount of **oxygen gradually increased** and carbon dioxide decreased.',
    'Today: about **78% nitrogen**, **21% oxygen**, ~1% argon and a small amount (~0.04%) of CO₂.',
    '**Test for oxygen:** a **glowing splint relights**.',
  ],
  worked: { head: 'Explain', q: 'Why is there so little CO₂ in the atmosphere now?',
    steps: [['Oceans', 'CO₂ dissolved'], ['Plants', 'photosynthesis used CO₂'], ['Rocks', 'carbon locked in sedimentary rocks and fossil fuels']], size: 11 },
  workedH: 1.75,
  qc: 'Describe the test for oxygen and the result.',
  notes: `QUICK CHECK ANSWER: put a glowing splint into the gas (1); it relights (1).\nPie chart values approximate; main gases total 99.94% (checked). ${EQ.photo}. Spec 8.23–8.24.`,
}), '8.23–8.24 Oxygen');

// ======================= 19 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 8.19–8.24 • the atmosphere', [
  { q: 'Where did the gases in the Earth’s early atmosphere come from?', marks: 1, ms: 'Volcanoes / volcanic activity (1).' },
  { q: 'Explain **two** ways the amount of carbon dioxide in the atmosphere decreased.', marks: 2, ms: 'Dissolved in the oceans (1); used by plants / algae in photosynthesis (1).' },
  { q: 'Explain why the amount of **oxygen** in the atmosphere increased.', marks: 2, ms: 'Plants / algae photosynthesised (1); releasing oxygen (1).' },
  { q: 'Give the approximate percentage of **nitrogen** in the atmosphere today.', marks: 1, ms: '78% (accept 78–80%) (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 20 GREENHOUSE EFFECT =======================
reg(D.contentSlide({
  title: 'The greenhouse effect',
  subtitle: 'Specification 8.25 • greenhouse gases absorb and re-emit heat',
  tag: '8.25', caption: 'short-wavelength radiation in; infrared out, partly absorbed and re-emitted',
  draw: (s, p) => {
    ball(s, 1.0, 1.85, 0.42, 'F7C548', 'E09A1A', 1.5); label(s, 0.6, 2.35, 0.8, 'Sun', { size: 10.5, h: 0.26, bold: true });
    box(s, 0.7, 4.7, 5.7, 0.55, '7DB86A', '4E7A35'); label(s, 0.7, 4.7, 5.7, '**Earth’s surface**', { size: 11, h: 0.55, color: C.white });
    box(s, 0.7, 3.0, 5.7, 0.4, 'E8EEF5', null); line(s, 0.7, 3.0, 6.4, 3.0, '9AA3B0', 1, { dash: 'dash' }); line(s, 0.7, 3.4, 6.4, 3.4, '9AA3B0', 1, { dash: 'dash' });
    label(s, 3.9, 3.0, 2.5, 'CO₂, CH₄, H₂O in the atmosphere', { size: 9.5, h: 0.4, italic: true, color: C.grey });
    arrow(s, 1.3, 2.2, 2.3, 4.65, 'E0A020', 2.5); label(s, 1.6, 2.6, 1.6, 'sunlight in', { size: 9.5, h: 0.26, color: 'B07A10', align: 'left' });
    arrow(s, 2.9, 4.65, 3.4, 1.7, C.red, 2); label(s, 3.45, 1.6, 1.8, 'some infrared escapes', { size: 9.5, h: 0.26, color: C.red, align: 'left' });
    arrow(s, 4.3, 4.65, 4.7, 3.25, C.red, 2); arrow(s, 4.75, 3.25, 5.2, 4.65, C.red, 2, {}); label(s, 4.6, 3.95, 1.8, 'absorbed and re-emitted', { size: 9.5, h: 0.4, color: C.red, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    'The Sun’s radiation passes through the atmosphere and **warms the Earth’s surface**.',
    'The Earth radiates **heat (infrared)** back towards space.',
    '**Greenhouse gases** (**carbon dioxide**, **methane**, **water vapour**) **absorb** this heat and then **re-emit** energy in all directions, including back to Earth.',
    'This **keeps the Earth warm** enough for life. More greenhouse gas → more heat trapped → warming.',
  ],
  worked: { head: 'Explain', q: 'Why is the greenhouse effect needed for life?',
    steps: [['Without it', 'the Earth would be about −18 °C'], ['With it', 'average about 15 °C: liquid water']], size: 11 },
  workedH: 1.5,
  qc: 'Name **three** greenhouse gases.',
  notes: 'QUICK CHECK ANSWER: carbon dioxide, methane, water vapour (2 for three; 1 for two).\nThe −18 °C and 15 °C figures are commonly quoted approximate values. Spec 8.25.',
}), '8.25 Greenhouse effect');

// ======================= 21 CLIMATE EVIDENCE =======================
reg(D.contentSlide({
  title: 'Evidence for human-caused climate change',
  subtitle: 'Specification 8.26 • correlation, and its uncertainties',
  tag: '8.26', caption: 'atmospheric CO₂ (Mauna Loa, ppm) and global fossil-fuel CO₂ emissions (Gt/yr); rounded values',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.6, h: 3.3, xmin: 1960, xmax: 2020, xstep: 20, ymin: 300, ymax: 420, ystep: 20, xlabel: 'year', ylabel: 'CO₂ (ppm)', grid: true };
    axes(s, g);
    plotLine(s, g, CO2, C.red, 2.25); points(s, g, CO2, C.red);
    const g2 = Object.assign({}, g, { ymin: 0, ymax: 40 });
    plotLine(s, g2, EMIS, '1F5F99', 2, { dash: 'dash' });
    label(s, px(g, 1990), py(g, 395), 1.6, '**CO₂ (ppm)**', { size: 10, h: 0.26, color: C.red, align: 'left' });
    label(s, px(g, 1998), py(g, 335), 2.0, 'emissions (Gt/yr), dashed', { size: 9.5, h: 0.26, color: '1F5F99', align: 'left' });
    [0, 10, 20, 30, 40].forEach(v => label(s, g.x + g.w + 0.05, py(g2, v) - 0.12, 0.5, String(v), { size: 9, h: 0.24, align: 'left', color: '1F5F99' }));
  },
  head: 'Evaluating the evidence',
  lines: [
    'There is a **correlation**: as **fossil fuel use** has increased, the **CO₂ concentration** has increased (317 → 414 ppm, 1960–2020). Average temperatures have also risen.',
    'A correlation does not on its own prove cause, but the **mechanism** (greenhouse effect) explains it.',
    '**Uncertainties:** measurements are taken at **particular locations**; **historical** data (ice cores, old records) are **less accurate** and have fewer data points.',
    'Most scientists agree that human activity is causing climate change (**peer review**).',
  ],
  worked: { head: 'Use the data', q: 'By how many ppm did CO₂ rise from 1960 to 2020?',
    steps: [['Read', '317 ppm → 414 ppm'], ['Answer', '97 ppm (about a 31% increase)']], size: 11 },
  workedH: 1.5,
  qc: 'Why are older CO₂ measurements less certain than modern ones?',
  notes: 'QUICK CHECK ANSWER: they come from indirect methods such as ice cores / few locations / less accurate instruments (1); so they may not represent the whole atmosphere (1).\nMauna Loa annual means and Global Carbon Project emissions are rounded, approximate values; asserted to increase. Spec 8.26.',
}), '8.26 Climate evidence');

// ======================= 22 HUMAN EFFECTS AND MITIGATION =======================
{
  const s = D.contentHeader('Human activity, climate effects and mitigation', 'Specification 8.27–8.28 • carbon dioxide and methane', { tag: '8.27–8.28' });
  D.card(s, 0.45, 1.3, 4.0, 4.95, 'Human activities', ['**CO₂:** burning **fossil fuels**; **deforestation** (fewer trees to absorb CO₂; burning releases it).', '**Methane:** **cattle** farming (digestion), **rice** paddy fields, **landfill** sites, leaks from gas wells.'], { size: 12 });
  D.card(s, 4.65, 1.3, 4.0, 4.95, 'Possible effects', ['Rising **global temperatures**.', 'Melting **ice caps** and glaciers: **rising sea levels**, flooding.', 'More **extreme weather** (storms, droughts).', 'Changes in **rainfall**; effects on **crops** and **habitats**; species migrate or die out.'], { size: 12 });
  D.card(s, 8.85, 1.3, 4.03, 4.95, 'Mitigation', ['Use **renewable** energy and **less** fossil fuel.', '**Carbon capture and storage** (store CO₂ underground).', '**Plant trees** (reforestation).', 'Reduce **methane**: less landfill, change farming.', 'Problems: cost, international agreement, lifestyle change.'], { size: 12, fill: C.cream, border: 'F1D9A8' });
  D.quickCheck(s, 'Explain how **deforestation** increases the amount of carbon dioxide in the atmosphere.');
  D.notes(s, 'QUICK CHECK ANSWER: fewer trees to remove CO₂ by photosynthesis (1); burning or decay of the trees releases CO₂ (1).\nSpec 8.27–8.28.');
  reg(s, '8.27–8.28 Effects and mitigation');
}

// ======================= 23 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 8.25–8.28 • greenhouse effect and climate change', [
  { q: 'Describe how greenhouse gases keep the Earth warm.', marks: 3, ms: 'The Earth radiates heat / infrared (1); greenhouse gases absorb it (1); and re-emit energy, some back towards the Earth (1).' },
  { q: 'Give **two** human activities that increase the amount of **methane** in the atmosphere.', marks: 2, ms: 'Any two: cattle farming; rice paddy fields; landfill; gas leaks (1 each).' },
  { q: 'Give **one** way to reduce the amount of CO₂ released.', marks: 1, ms: 'Any one: renewable energy; carbon capture and storage; plant trees; use less fossil fuel / energy (1).' },
  { q: 'Give **one** possible effect of climate change.', marks: 1, ms: 'Any one: rising sea levels; extreme weather; changes in rainfall; effects on habitats / crops (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 24 EQUATION BANK =======================
{
  const s = D.contentHeader('Summary: Topic 8 equations', 'Specification 8.7–8.23 • every equation checked for atoms and charges', { tag: 'Equation bank' });
  const bank = [['Complete combustion', EQ['CH4 burn']], ['Complete combustion', EQ['C3H8 burn']], ['Incomplete (CO)', EQ['CH4 CO']], ['Incomplete (soot)', EQ['CH4 C']],
    ['Sulfur dioxide', EQ['S burn']], ['Nitrogen oxides', EQ.NO + ';  ' + EQ.NO2], ['Acid rain (SO₂)', EQ['SO2 rain']], ['Hydrogen fuel', EQ['H2 burn']], ['Cracking', EQ.crack1], ['Photosynthesis', EQ.photo]];
  const rows = [[HDR('Process'), HDR('Equation')], ...bank.map(([a, b], i) => [tcell(a, i, { bold: true }), tcell(b, i, { bold: true, color: C.ink, fontSize: 12.5 })])];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [3.2, 9.23], rowH: 0.43, fontFace: 'Calibri', fontSize: 11.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.quickCheck(s, 'Cover the Equation column. Write each equation from memory, then check the atoms.');
  D.notes(s, 'Equations asserted in build_T8.js:\n' + EQLIST.join('\n'));
  reg(s, 'Summary: equations');
}

// ======================= 25 KEY WORDS =======================
reg(D.keyWords([
  ['Hydrocarbon', 'Compound of carbon and hydrogen only.'],
  ['Crude oil', 'Finite mixture of hydrocarbons.'],
  ['Fraction', 'Mixture of hydrocarbons with similar boiling points.'],
  ['Viscosity', 'How thick (resistant to flow) a liquid is.'],
  ['Alkane', 'Saturated hydrocarbon, CₙH₂ₙ₊₂.'],
  ['Homologous series', 'Same general formula; differ by CH₂.'],
  ['Complete combustion', 'Plenty of O₂: CO₂ + H₂O.'],
  ['Incomplete combustion', 'Limited O₂: CO and/or C (soot).'],
  ['Carbon monoxide', 'Toxic gas: reduces O₂ carried by blood.'],
  ['Acid rain', 'Rain made acidic by SO₂ and NOₓ.'],
  ['Cracking', 'Breaking large alkanes into smaller alkanes and alkenes.'],
  ['Alkene', 'Unsaturated hydrocarbon (C=C).'],
  ['Feedstock', 'Raw material for the chemical industry.'],
  ['Greenhouse gas', 'Absorbs and re-emits infrared: CO₂, CH₄, H₂O.'],
  ['Carbon capture', 'Trapping CO₂ and storing it underground.'],
  ['Test for oxygen', 'A glowing splint relights.'],
], { notes: 'Cover-and-recall activity.' }), 'Summary: key words');

// ======================= 26 FULL QUESTION =======================
reg(D.fullQuestion('Methane is used as a fuel in homes. Propane is used in camping stoves.', [
  { l: 'a', q: 'Methane is a member of the **alkane** homologous series. Give **two** features of a homologous series.', marks: 2, ms: 'Any two: same general formula; differ by CH₂; similar chemical properties; gradual change in physical properties (1 each).' },
  { l: 'b', q: 'Balance the equation for the complete combustion of propane: C₃H₈ + __O₂ → __CO₂ + __H₂O.', marks: 2, ms: `${EQ['C3H8 burn']}: 5O₂ (1); 3CO₂ and 4H₂O (1).`, h: 1.0 },
  { l: 'c', q: 'A gas heater has a blocked air vent. Explain why this is dangerous.', marks: 3, ms: 'Not enough oxygen, so incomplete combustion (1); carbon monoxide is produced (1); CO is toxic / reduces the oxygen carried by the blood, and is colourless and odourless (1).', h: 1.15 },
  { l: 'd', q: 'Methane is a greenhouse gas. Describe how greenhouse gases warm the Earth.', marks: 2, ms: 'They absorb heat / infrared radiated from the Earth (1); and re-emit it, some back to the Earth (1).' },
  { l: 'e', q: 'Give **two** sources of methane caused by human activity.', marks: 2, ms: 'Any two: cattle; rice paddies; landfill; gas leaks (1 each).' },
  { l: 'f', q: 'Explain why scientists are less certain about CO₂ levels 200 years ago than today.', marks: 2, ms: 'Measurements were indirect (e.g. ice cores) / fewer and less accurate (1); fewer locations, so may not represent the global atmosphere (1).' },
], 13, { subtitle: 'Specification 8.6–8.28 • answer every part • 13 marks' }), 'Full question');

// ======================= 27–28 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the crude oil fraction used for (a) **car fuel** and (b) **surfacing roads**.', marks: 2, ms: '(a) petrol (1); (b) bitumen (1).', h: 0.8 },
  { n: '2', q: 'Write the formula of the alkane with **6** carbon atoms.', marks: 1, ms: 'C₆H₁₄ (1).', h: 0.7 },
  { n: '3', q: 'Explain how oxides of nitrogen are produced in car engines.', marks: 2, ms: 'Nitrogen and oxygen from the air (1); react at the high temperature in the engine (1).', h: 0.85 },
  { n: '4', q: 'Balance the cracking equation: C₁₂H₂₆ → C₈H₁₈ + __C₂H₄. Name the product used to make plastics.', marks: 2, ms: '2 (1); ethene (1).', h: 0.9 },
  { n: '5', q: 'Describe how the Earth’s oceans formed and how this changed the atmosphere.', marks: 4, ms: 'The Earth cooled (1); water vapour condensed to form the oceans (1); carbon dioxide dissolved in the oceans (1); so the amount of CO₂ in the atmosphere decreased (1).', h: 1.0 },
  { n: '6', q: 'Evaluate the use of **hydrogen** instead of **petrol** as a fuel for cars.', marks: 6, levels: true, h: 1.45, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    `Hydrogen burns to form only water: ${EQ['H2 burn']}; no CO₂, CO, soot or SO₂ at the point of use.`,
    'Petrol produces CO₂ (greenhouse gas), and can produce CO, soot and NOₓ.',
    'Hydrogen can be made by electrolysis of water; renewable if the electricity is from renewable sources.',
    'But most hydrogen is made from natural gas / fossil fuels, which releases CO₂.',
    'Hydrogen is a gas: hard to store; needs high-pressure tanks; flammable / explosive risk.',
    'Few hydrogen refuelling stations; cars are expensive.',
    'Petrol is from crude oil: finite / non-renewable; but easy to store and widely available.',
    'Judgement: hydrogen is better for the environment only if it is made using renewable energy.',
  ], 'Level 3 answers give advantages AND disadvantages of both fuels and reach a justified conclusion.');
}
D.homework('Answer every question. Show balancing in equations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach((r, i) => console.log(`recap ${i + 1}: ${r.total} marks`));
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 6); assert.strictEqual(R5.total, 7);
assert(D.slideNo >= 26 && D.slideNo <= 32, 'slide count ' + D.slideNo);
console.log(`${EQLIST.length} equations asserted (atoms and charges)`);
const out = path.join(__dirname, 'EDX_1CH0_T8_FuelsEarthScience.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
