// build_T5.js — Edexcel GCSE Chemistry 1CH0 Topic 5 Separate chemistry 1 (one deck, both tiers; all chemistry-only)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T5.js
// Structure copied from build_T3.js / build_T4.js. edx_chem_template.js is NOT edited: the equation checker and
// glassware / titration / electrolysis helpers are spliced in from build_T3.js; T5 helpers are below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 5,
  title: 'Separate chemistry 1',
  shortTitle: 'T5',
  subtitle: 'Transition metals, alloys, titrations, yield, gas volumes, fertilisers and fuel cells',
  specRange: '5.1C–5.25C',
  pOnly: [],
  paper: 'Paper 1',
  keywords: ['Corrosion', 'Alloys', 'Titration', 'Yield', 'Atom economy', 'Fuel cells'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH, comp, wire, dot } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const CO = { p: true }; // chemistry-only pill on every content slide

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



// --- Topic 5 equations (atoms and charges asserted) ---
eq('rust', [[4, 'Fe', 's'], [3, 'O2', 'g'], [6, 'H2O', 'l']], [[4, 'Fe(OH)3', 's']]);
eq('Fe ox3', [[1, 'Fe']], [[1, 'Fe^3+'], [3, 'e-']], { noStates: true });
eq('Zn ox', [[1, 'Zn']], [[1, 'Zn^2+'], [2, 'e-']], { noStates: true });
eq('Ag plate', [[1, 'Ag^+'], [1, 'e-']], [[1, 'Ag']], { noStates: true });
eq('Ag anode', [[1, 'Ag']], [[1, 'Ag^+'], [1, 'e-']], { noStates: true });
eq('NaOH+HCl', [[1, 'NaOH', 'aq'], [1, 'HCl', 'aq']], [[1, 'NaCl', 'aq'], [1, 'H2O', 'l']]);
eq('H2SO4+NaOH', [[1, 'H2SO4', 'aq'], [2, 'NaOH', 'aq']], [[1, 'Na2SO4', 'aq'], [2, 'H2O', 'l']]);
eq('CaCO3 heat', [[1, 'CaCO3', 's']], [[1, 'CaO', 's'], [1, 'CO2', 'g']]);
eq('ferment', [[1, 'C6H12O6', 'aq']], [[2, 'C2H5OH', 'aq'], [2, 'CO2', 'g']]);
eq('hydration', [[1, 'C2H4', 'g'], [1, 'H2O', 'g']], [[1, 'C2H5OH', 'g']]);
eq('steam reform', [[1, 'CH4', 'g'], [1, 'H2O', 'g']], [[1, 'CO', 'g'], [3, 'H2', 'g']]);
eq('CaCO3+HCl', [[1, 'CaCO3', 's'], [2, 'HCl', 'aq']], [[1, 'CaCl2', 'aq'], [1, 'H2O', 'l'], [1, 'CO2', 'g']]);
eq('Mg+HCl', [[1, 'Mg', 's'], [2, 'HCl', 'aq']], [[1, 'MgCl2', 'aq'], [1, 'H2', 'g']]);
eq('CH4 burn', [[1, 'CH4', 'g'], [2, 'O2', 'g']], [[1, 'CO2', 'g'], [2, 'H2O', 'l']]);
eq('Haber', [[1, 'N2', 'g'], [3, 'H2', 'g']], [[2, 'NH3', 'g']], { rev: true });
eq('NH4NO3', [[1, 'NH3', 'aq'], [1, 'HNO3', 'aq']], [[1, 'NH4NO3', 'aq']]);
eq('(NH4)2SO4', [[2, 'NH3', 'aq'], [1, 'H2SO4', 'aq']], [[1, '(NH4)2SO4', 'aq']]);
eq('fuel cell', [[2, 'H2', 'g'], [1, 'O2', 'g']], [[2, 'H2O', 'l']]);
eq('fc anode', [[1, 'H2']], [[2, 'H^+'], [2, 'e-']], { noStates: true });
eq('fc cathode', [[1, 'O2'], [4, 'H^+'], [4, 'e-']], [[2, 'H2O']], { noStates: true });
eq('Zn+Cu cell', [[1, 'Zn', 's'], [1, 'Cu^2+', 'aq']], [[1, 'Zn^2+', 'aq'], [1, 'Cu', 's']]);
eq('H2+Cl2', [[1, 'H2', 'g'], [1, 'Cl2', 'g']], [[2, 'HCl', 'g']]);

// ======================= CALCULATIONS (asserted) =======================
const AR = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5, Zn: 65 };
const Mr = f => Object.entries(parseF(f).atoms).reduce((a, [k, v]) => { assert(AR[k], 'no Ar ' + k); return a + AR[k] * v; }, 0);
const r3 = x => Math.round(x * 1000) / 1000;
// concentration
calc('0.20 mol in 250 cm³', 0.20 / 0.250, 0.80, 1e-12);
calc('4.0 g NaOH in 500 cm³ (mol/dm³)', 4.0 / Mr('NaOH') / 0.500, 0.20, 1e-12);
calc('7.3 g/dm³ HCl → mol/dm³', 7.3 / Mr('HCl'), 0.20, 1e-12);
calc('0.50 mol/dm³ NaOH → g/dm³', 0.50 * Mr('NaOH'), 20, 1e-12);
calc('moles in 25.0 cm³ of 0.10', 0.10 * 0.0250, 0.0025, 1e-12);
// titration CP 5.9
const TITRES = [22.60, 22.15, 22.10, 22.20];
const conc = TITRES.slice(1);
assert(Math.max(...conc) - Math.min(...conc) <= 0.10 + 1e-9, 'concordant');
const meanT = conc.reduce((a, b) => a + b, 0) / conc.length;
calc('mean titre', Math.round(meanT * 100) / 100, 22.15, 1e-9);
const nHCl = 0.100 * meanT / 1000;
calc('mol HCl', r3(nHCl * 1e3) / 1e3, 0.002215, 1e-9);
calc('[NaOH]', sf(nHCl / 0.0250, 3), 0.0886, 1e-12);
calc('H2SO4 practice: mol acid', 0.050 * 0.0200, 0.001, 1e-12);
calc('H2SO4 practice: [NaOH]', 2 * 0.050 * 0.0200 / 0.0250, 0.080, 1e-12);
calc('volume of 0.20 HCl for 0.0050 mol NaOH (cm³)', 0.0050 / 0.20 * 1000, 25, 1e-9);
// yield and atom economy
calc('CaO theoretical from 50 g', 50 * Mr('CaO') / Mr('CaCO3'), 28, 1e-9);
calc('% yield 22.4/28', 22.4 / 28 * 100, 80, 1e-9);
calc('% yield 9.0/12.0', 9.0 / 12.0 * 100, 75, 1e-9);
calc('AE CaO', Mr('CaO') / Mr('CaCO3') * 100, 56, 1e-9);
calc('AE ethanol fermentation (1 d.p.)', Math.round(2 * Mr('C2H5OH') / Mr('C6H12O6') * 1000) / 10, 51.1, 1e-9);
calc('AE ethanol hydration', Mr('C2H5OH') / (Mr('C2H4') + Mr('H2O')) * 100, 100, 1e-9);
calc('AE H2 steam reforming (1 d.p.)', Math.round(3 * Mr('H2') / (Mr('CH4') + Mr('H2O')) * 1000) / 10, 17.6, 1e-9);
calc('AE (NH4)2SO4', Mr('(NH4)2SO4') / (2 * Mr('NH3') + Mr('H2SO4')) * 100, 100, 1e-9);
calc('% yield FQ 5.6/7.0', 5.6 / 7.0 * 100, 80, 1e-9);
// molar volume (HT)
const MV = 24;
calc('3.6 dm³ gas mol', 3.6 / MV, 0.15, 1e-12);
calc('5.0 g CaCO3 → CO2 dm³', 5.0 / Mr('CaCO3') * MV, 1.2, 1e-12);
calc('0.24 g Mg → H2 cm³', 0.24 / AR.Mg * MV * 1000, 240, 1e-9);
calc('0.5 mol O2 volume', 0.5 * MV, 12, 1e-12);
calc('mass of 6.0 dm³ CO2', 6.0 / MV * Mr('CO2'), 11, 1e-12);
calc('Avogadro: CH4 50 → O2', 50 * 2, 100, 1e-12);
calc('Avogadro: 30 dm³ H2 → NH3', 30 * 2 / 3, 20, 1e-12);
calc('Avogadro: 40 cm³ H2 + Cl2 → HCl', 40 * 2, 80, 1e-12);
calc('FQ: 1.2 g Mg → H2 dm³', 1.2 / 24 * MV, 1.2, 1e-12);
// carat gold
calc('18 carat %', 18 / 24 * 100, 75, 1e-12);
// fertiliser % nitrogen (stretch)
calc('% N in NH4NO3', 2 * AR.N / Mr('NH4NO3') * 100, 35, 1e-9);

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


// ======================= T5 drawing helpers =======================
function flowBox(s, x, y, w, h, head, sub, col) {
  box(s, x, y, w, h, col[0], col[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, x + 0.05, y + 0.04, w - 0.1, `**${head}**`, { size: 11, h: 0.3, color: C.ink });
  if (sub) label(s, x + 0.05, y + 0.34, w - 0.1, sub, { size: 9.5, h: h - 0.38, color: C.text, valign: 'top' });
}
function eqLine(s, x, y, w, key, o = {}) { eqn(s, x, y, w, EQ[key], Object.assign({ size: 11.5 }, o)); }
function nail(s, x, y, h, rusty) { box(s, x - 0.04, y, 0.08, h, rusty ? 'B5651D' : '8A8F99', rusty ? '7A3E10' : '4A4F5A', { lw: 0.75 }); box(s, x - 0.09, y - 0.04, 0.18, 0.06, rusty ? 'B5651D' : '8A8F99', '4A4F5A', { lw: 0.75 }); }
function stopper(s, x, y, w) { box(s, x - 0.02, y - 0.16, w + 0.04, 0.2, '5A3E2B', '3A2A1B'); }
const HT = { ht: true };

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Separate chemistry 1',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • the whole topic is chemistry only (not in Combined Science)` },
    { icon: 'CP', text: 'Core Practical 5.9C: an accurate acid–alkali titration' },
    { icon: 'H', text: 'Higher & Foundation in one deck • mol dm⁻³, titration calculations and gas volumes are HT' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 5 Separate chemistry 1 (Paper 1). Every statement has a C suffix: chemistry only, not in Combined Science 1SC0. Core Practical 5.9C (titration). Higher-only (HT pill, medium confidence): 5.8C (mol dm⁻³), 5.10C (titration calculations in mol dm⁻³), 5.16C–5.18C (molar gas volume and Avogadro’s law), 5.20C (equilibrium conditions in the Haber process). Numbering reconstructed: see SPEC_T5.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '5.1C–5.4C', text: 'Describe **transition metals**; explain **rusting**, its **prevention** and **electroplating**.' },
  { code: '5.5C–5.7C', text: 'Explain why **alloys** are harder; link metal **uses** to their **properties**.' },
  { code: '5.8C', text: 'Calculate concentration in **mol dm⁻³**; convert from g dm⁻³.', ht: true },
  { code: '5.9C–5.10C', text: '**Core Practical:** carry out an accurate **titration**; calculate an unknown **concentration**.', ht: true },
  { code: '5.11C–5.15C', text: 'Calculate **percentage yield** and **atom economy**; choose a **reaction pathway**.' },
  { code: '5.16C–5.18C', text: 'Use the **molar volume** (24 dm³) and **Avogadro’s law** for gases.', ht: true },
  { code: '5.19C–5.22C', text: 'Explain **Haber** conditions; describe making **fertilisers** in the lab and industry.' },
  { code: '5.23C–5.25C', text: 'Describe **chemical cells** and **fuel cells**; evaluate fuel cells.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'All of Topic 5 is chemistry only. HT pill marks groups with a Higher-only statement.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 5 is assessed on Paper 1`, { tag: 'Context', p: true });
  const nodes = [
    ['5.1C–5.7C', 'Transition metals, corrosion, alloys, uses', 'CHEMISTRY ONLY', C.blue],
    ['5.8C–5.10C', 'Concentration; titration (CP 5.9C)', 'CORE PRACTICAL', C.orange],
    ['5.8C, 5.10C', 'mol dm⁻³ and titration calculations', 'HIGHER ONLY', C.red],
    ['5.11C–5.15C', 'Yield, atom economy, reaction pathways', 'CHEMISTRY ONLY', C.blue],
    ['5.16C–5.18C', 'Molar volume and Avogadro’s law', 'HIGHER ONLY', C.red],
    ['5.19C–5.22C', 'Haber process and fertilisers', 'CHEMISTRY ONLY', C.blue],
    ['5.23C–5.25C', 'Chemical cells and fuel cells', 'CHEMISTRY ONLY', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 5\nSeparate chemistry 1', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'CORE PRACTICAL' ? C.cream : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 moles • Topic 3 titration, electrolysis • Topic 4 reactivity, Haber', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '1CH0 **Paper 1** (1F or 1H): 1 h 45 min, 100 marks, Topics 1–5.',
      '**Chemistry only:** Combined Science 1SC0 classes do **not** study Topic 5.',
      'Core Practical **5.9C** titration: method, results, calculation.',
      'Lots of **calculations**: yield, atom economy, mol dm⁻³, gas volumes.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**CHEMISTRY ONLY** pill on every slide: the whole topic is separate science.',
      '**HT** pill: mol dm⁻³, titration calculations, molar gas volume, Avogadro’s law, Haber equilibrium.',
      'Every equation and calculation in the deck is **checked**.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'All statements carry the C suffix (chemistry only). HT markers medium confidence. Numbering reconstructed: see SPEC_T5.md.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'Topic 4 • reactivity', q: 'Put **zinc**, **iron** and **copper** in order of reactivity.' },
  { from: 'Topic 4 • oxidation', q: 'Define **oxidation** in terms of oxygen.' },
  { from: 'Topic 1 • Mr', q: 'Calculate the Mr of **NaOH** (Na = 23, O = 16, H = 1).' },
  { from: 'Topic 1 • moles (HT)', q: 'How many moles are in **4.0 g** of NaOH?' },
  { from: 'Topic 3 • neutralisation', q: 'Write the word equation for hydrochloric acid + sodium hydroxide.' },
  { from: 'Topic 4 • Haber', q: 'State the **three** conditions for the Haber process.' },
], { subtitle: 'Recall from Topics 1, 3 and 4 • 6 minutes • no notes', notes: 'ANSWERS\n1. Zinc > iron > copper.\n2. Gain of oxygen.\n3. 40.\n4. 0.1 mol.\n5. Hydrochloric acid + sodium hydroxide → sodium chloride + water.\n6. 450 °C, 200 atmospheres, iron catalyst.' }), 'Retrieval starter');

// ======================= 5 TRANSITION METALS =======================
reg(D.contentSlide(Object.assign({
  title: 'Transition metals',
  subtitle: 'Specification 5.1C • the central block of the periodic table',
  tag: '5.1C', caption: 'the transition metals (shaded) sit between groups 2 and 3',
  draw: (s, p) => {
    const cw = 0.3, ch = 0.42, x0 = 0.8, y0 = 1.75;
    const rowsN = [[1, 0, 0, 1], [2, 0, 0, 6], [2, 0, 0, 6], [2, 10, 0, 6]];
    const order = []; for (let c = 0; c < 18; c++) order.push(c);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 18; c++) {
      const tm = r === 3 && c >= 2 && c <= 11, show = (c < 2 && (r > 0 || c === 0)) || c >= 12 && (r > 0 || c === 17) || tm || (r === 3);
      if (!show) continue;
      box(s, x0 + c * cw, y0 + r * ch, cw - 0.03, ch - 0.03, tm ? 'F5D7A0' : (c < 2 ? 'DCE8F7' : 'EFE6FA'), tm ? 'C88A2E' : 'B8BEC9', { lw: 0.5 });
    }
    ['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn'].forEach((e, i) => label(s, x0 + (i + 2) * cw, y0 + 3 * ch, cw - 0.03, `**${e}**`, { size: 7.5, h: ch - 0.03 }));
    const ex = [['Fe', 'catalyst in the Haber process', 'B5651D'], ['Ni', 'catalyst: hardening fats', '6B7385'], ['Cu', 'blue compounds (copper sulfate)', '2F7FC1'], ['Mn', 'MnO₂ catalyses H₂O₂ decomposition', '5A3E2B']];
    ex.forEach(([e, t, col], i) => { const y = 3.75 + i * 0.45; box(s, 0.8, y, 0.55, 0.36, col, col, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, 0.8, y, 0.55, `**${e}**`, { size: 11, h: 0.36, color: C.white }); label(s, 1.45, y, 4.9, t, { size: 11, h: 0.36, align: 'left' }); });
  },
  head: 'Typical properties',
  lines: [
    'Most metals are **transition metals**.',
    '**High melting points** (except mercury) and **high densities**.',
    'They form **coloured compounds** (e.g. blue copper sulfate, green iron(II) compounds).',
    'They and their compounds are often **catalysts** (iron in the Haber process).',
    'Compared with group 1: harder, stronger, much **less reactive**.',
  ],
  worked: { head: 'Compare', q: 'How is iron different from sodium?',
    steps: [['Melting point', 'iron 1538 °C; sodium 98 °C'], ['Density', 'iron much denser'], ['Reactivity', 'iron reacts slowly; sodium reacts vigorously with water']], size: 11 },
  workedH: 1.75,
  qc: 'Give **two** properties of transition metals that are **not** typical of group 1 metals.',
  notes: 'QUICK CHECK ANSWER: any two: high melting point; high density; coloured compounds; catalytic activity (1 each).\nSpec 5.1C. Melting points: Fe 1538 °C, Na 98 °C (data-book values).',
}, CO)), '5.1C Transition metals');

// ======================= 6 RUSTING =======================
reg(D.contentSlide(Object.assign({
  title: 'Corrosion and rusting',
  subtitle: 'Specification 5.2C–5.3C • rusting needs both oxygen and water',
  tag: '5.2C–5.3C', caption: 'after a week: only the nail with both air and water rusts',
  draw: (s, p) => {
    const set = [['air + water', true, WAT[0], 0.55, false], ['no water (drying agent)', false, 'FFFFFF', 0, false], ['no air (boiled water + oil)', false, WAT[0], 0.75, true]];
    set.forEach(([t, rusty, liq, lvl, oil], i) => {
      const x = 0.95 + i * 1.85;
      tube(s, x, 1.95, 0.7, 2.75, lvl, liq);
      if (oil) box(s, x + 0.02, 1.95 + 2.75 * 0.25 - 0.18, 0.66, 0.18, 'F2D76B', null);
      if (i === 1) { for (let k = 0; k < 8; k++) ball(s, x + 0.15 + (k % 4) * 0.13, 4.45 - Math.floor(k / 4) * 0.12, 0.05, 'F4F4F4', '9AA3B0', 0.5); }
      if (i !== 1) stopper(s, x, 1.95, 0.7); else stopper(s, x, 1.95, 0.7);
      nail(s, x + 0.35, 2.4, 1.75, rusty);
      label(s, x - 0.4, 4.85, 1.5, `**${t}**`, { size: 9.5, h: 0.45 });
      label(s, x - 0.4, 5.3, 1.5, rusty ? 'rusts' : 'no rust', { size: 10, h: 0.26, color: rusty ? C.red : C.green, bold: true });
    });
  },
  head: 'Key ideas',
  lines: [
    '**Corrosion** is the **oxidation** of a metal by substances in its surroundings.',
    '**Rusting** is the corrosion of **iron**: it needs **oxygen AND water**.',
    'Rust is hydrated iron(III) oxide. It flakes off, so fresh iron is exposed.',
    '**HT:** iron atoms **lose electrons**:  ' + EQ['Fe ox3'],
  ],
  worked: { head: 'Explain the control', q: 'Why is the water boiled and covered with oil?',
    steps: [['Boil', 'removes dissolved air (oxygen)'], ['Oil', 'stops oxygen dissolving again'], ['Answer', 'so the nail has water but no oxygen']], size: 11 },
  workedH: 1.75,
  qc: 'Explain why iron railings near the sea rust **faster** than in a desert.',
  notes: `QUICK CHECK ANSWER: more water (and salt) near the sea (1); rusting needs water as well as oxygen / salt speeds up rusting (1).\nSimplified equation checked: ${EQ.rust}.\nSpec 5.2C.`,
}, CO)), '5.2C Rusting');

// ======================= 7 PREVENTING RUSTING =======================
reg(D.contentSlide(Object.assign({
  title: 'Preventing rusting',
  subtitle: 'Specification 5.3C • barriers and sacrificial protection',
  tag: '5.3C', caption: 'galvanised steel: zinc corrodes instead of iron, even when scratched',
  draw: (s, p) => {
    box(s, 0.8, 3.3, 5.4, 0.6, '8A8F99', '4A4F5A', { lw: 1 }); label(s, 0.8, 3.3, 5.4, '**iron / steel**', { size: 12, h: 0.6, color: C.white });
    box(s, 0.8, 3.0, 2.3, 0.3, 'C9CDD3', '6B7385', { lw: 1 }); box(s, 3.6, 3.0, 2.6, 0.3, 'C9CDD3', '6B7385', { lw: 1 });
    label(s, 0.8, 3.0, 2.3, 'zinc coating', { size: 10, h: 0.3 }); label(s, 3.6, 3.0, 2.6, 'zinc coating', { size: 10, h: 0.3 });
    label(s, 2.95, 2.55, 0.8, 'scratch', { size: 10, h: 0.3, color: C.red, bold: true });
    arrow(s, 2.3, 2.2, 1.9, 2.95, '1F5F99', 1.75); label(s, 0.9, 1.65, 3.0, 'Zn → Zn²⁺ + 2e⁻ (zinc oxidised)', { size: 10.5, h: 0.5, color: '1F5F99', bold: true });
    const bar = [['Paint', 'bridges, cars'], ['Oil / grease', 'chains, tools'], ['Plastic coating', 'garden furniture']];
    bar.forEach(([a, b], i) => { const y = 4.2 + i * 0.45; box(s, 0.8, y, 1.8, 0.38, 'DCE8F7', '7A9CC9', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 }); label(s, 0.8, y, 1.8, `**${a}**`, { size: 11, h: 0.38 }); label(s, 2.75, y, 3.5, b, { size: 11, h: 0.38, align: 'left' }); });
  },
  head: 'Two ways to stop rust',
  lines: [
    '**Barrier methods:** paint, oil, grease or plastic keep **oxygen and water** away from the iron. If the barrier is scratched, the iron rusts.',
    '**Sacrificial protection:** attach a **more reactive** metal (zinc or magnesium). It is oxidised **instead of** the iron.',
    '**Galvanising** = coating with zinc: it is a barrier **and** sacrificial, so it still works when scratched.',
  ],
  worked: { head: 'Explain', q: 'Why are magnesium blocks bolted to ships’ hulls?',
    steps: [['Reactivity', 'magnesium is more reactive than iron'], ['Electrons', 'magnesium loses electrons instead of iron'], ['Answer', 'the magnesium corrodes; the hull does not']], size: 11 },
  workedH: 1.75,
  qc: 'A painted bike frame is scratched and rusts, but a galvanised bucket does not. Explain the difference.',
  notes: `QUICK CHECK ANSWER: paint is only a barrier: once scratched, water and oxygen reach the iron (1); zinc on the bucket is more reactive, so it corrodes / is oxidised instead of the iron (sacrificial protection) (1).\nHalf equation: ${EQ['Zn ox']}. Spec 5.3C.`,
}, CO)), '5.3C Preventing rusting');

// ======================= 8 ELECTROPLATING =======================
reg(D.contentSlide(Object.assign({
  title: 'Electroplating',
  subtitle: 'Specification 5.4C • coating an object with a thin layer of metal',
  tag: '5.4C', caption: 'silver plating a spoon: the object is the cathode',
  draw: (s, p) => {
    const E = eCell(s, 1.6, 3.0, 3.4, 2.2, { liq: 'E3EDF7', surf: '7A9CC9', ySup: 2.05, cathode: ['B8BEC9', '5A6275'], anode: ['E8EAEE', '9AA3B0'], cw: 0.32, aw: 0.24 });
    label(s, 1.6, 5.22, 3.4, 'silver nitrate solution (Ag⁺ ions)', { size: 10, h: 0.28 });
    label(s, 0.55, 5.52, 2.8, `cathode: **${EQ['Ag plate']}**`, { size: 10, h: 0.3, align: 'left' });
    label(s, 3.4, 5.52, 3.0, `anode: **${EQ['Ag anode']}**`, { size: 10, h: 0.3, align: 'left' });
    callout(s, 0.55, 3.75, 0.9, '**spoon**', 2.45, 3.9, { align: 'right' });
    callout(s, 5.35, 3.75, 1.0, '**silver**', 4.55, 3.9, {});
  },
  head: 'How it works',
  lines: [
    'The object to be plated is the **cathode** (−); the plating metal is the **anode** (+).',
    'The **electrolyte** contains ions of the plating metal.',
    'Metal ions are **reduced** at the cathode and form a thin layer on the object; the anode dissolves to replace them.',
    '**Why?** To improve **appearance** (silver, gold) or **resistance to corrosion** (chromium, tin on steel cans).',
  ],
  worked: { head: 'Apply', q: 'Plan how to copper-plate an iron key.',
    steps: [['Cathode', 'the iron key'], ['Anode', 'a piece of copper'], ['Electrolyte', 'copper sulfate solution']], size: 11 },
  workedH: 1.75,
  qc: 'Why are steel food cans plated with **tin**?',
  notes: 'QUICK CHECK ANSWER: to stop the steel corroding / rusting (1); tin is unreactive and non-toxic (a barrier) (1).\nHalf equations checked. Spec 5.4C.',
}, CO)), '5.4C Electroplating');

// ======================= 9 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 5.1C–5.4C • transition metals and corrosion', [
  { q: 'Give **two** typical properties of transition metals.', marks: 2, ms: 'Any two: high melting point; high density; coloured compounds; catalysts (1 each).' },
  { q: 'Name the **two** substances needed for iron to rust.', marks: 2, ms: 'Oxygen (1); water (1).' },
  { q: 'Explain how **galvanising** protects iron even when the zinc is scratched.', marks: 2, ms: 'Zinc is more reactive than iron (1); so zinc is oxidised / corrodes instead of the iron (sacrificial protection) (1).' },
  { q: 'In silver plating, name the electrode the object is attached to, and the electrolyte.', marks: 2, ms: 'Cathode / negative electrode (1); a solution of a silver compound, e.g. silver nitrate (1).' },
], { p: true });
reg(R1.s, 'Recap 1');

// ======================= 10 ALLOYS =======================
reg(D.contentSlide(Object.assign({
  title: 'Alloys',
  subtitle: 'Specification 5.5C–5.6C • why alloys are harder than pure metals',
  tag: '5.5C–5.6C', caption: 'left: pure metal, layers slide; right: alloy, different-sized atoms stop layers sliding',
  draw: (s, p) => {
    const grid = (x0, y0, alloy) => {
      for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) {
        const big = alloy && ((r === 1 && c === 2) || (r === 3 && c === 4) || (r === 2 && c === 0));
        ball(s, x0 + c * 0.42 + (big ? 0.02 : 0), y0 + r * 0.42 + (alloy && r === 1 && c > 2 ? -0.05 : 0), big ? 0.27 : 0.2, big ? 'E8743B' : 'C9CDD3', big ? '8A3A12' : '5A6275', 1);
      }
    };
    grid(0.95, 2.0, false); grid(3.85, 2.0, true);
    label(s, 0.7, 1.45, 2.6, '**pure metal**', { size: 12, h: 0.3 }); label(s, 3.6, 1.45, 2.6, '**alloy**', { size: 12, h: 0.3 });
    arrow(s, 1.0, 4.35, 2.9, 4.35, C.red, 2); label(s, 0.7, 4.45, 2.6, 'layers slide easily', { size: 10, h: 0.3, color: C.red });
    label(s, 3.6, 4.45, 2.6, 'layers cannot slide', { size: 10, h: 0.3, color: C.green, bold: true });
    const al = [['Steel', 'iron + carbon', 'bridges, tools'], ['Brass', 'copper + zinc', 'instruments, fittings'], ['Magnalium', 'aluminium + magnesium', 'aircraft, car parts']];
    al.forEach(([a, b, c2], i) => { const y = 4.85 + i * 0.33; label(s, 0.75, y, 1.3, `**${a}**`, { size: 10.5, h: 0.3, align: 'left' }); label(s, 2.0, y, 2.2, b, { size: 10.5, h: 0.3, align: 'left' }); label(s, 4.2, y, 2.2, c2, { size: 10.5, h: 0.3, align: 'left', color: C.grey }); });
  },
  head: 'Key ideas',
  lines: [
    'An **alloy** is a mixture of a metal with one or more other elements (usually metals).',
    'Pure metals are **soft**: their atoms are the same size, so **layers slide** easily.',
    'In an alloy, atoms of **different sizes** distort the layers, so they **cannot slide** as easily: the alloy is **harder** and **stronger**.',
    'Alloys are designed for a **purpose**, e.g. magnalium is **light and strong**.',
  ],
  worked: { head: 'Explain', q: 'Why is brass used for door handles instead of pure copper?',
    steps: [['Structure', 'zinc atoms distort the copper layers'], ['Property', 'brass is harder and does not bend or wear'], ['Answer', 'stronger and still resists corrosion']], size: 11 },
  workedH: 1.75,
  qc: 'Explain, in terms of particles, why steel is harder than pure iron.',
  notes: 'QUICK CHECK ANSWER: carbon atoms are a different size from iron atoms (1); they distort the layers so the layers cannot slide over each other easily (1).\nSpec 5.5C–5.6C.',
}, CO)), '5.5C–5.6C Alloys');

// ======================= 11 USES OF METALS =======================
{
  const s = D.contentHeader('Uses of metals and alloys', 'Specification 5.7C • linking uses to properties', { p: true, tag: '5.7C' });
  const rows = [[HDR('Metal or alloy'), HDR('Use'), HDR('Properties that make it suitable')],
    ...[['Aluminium', 'aircraft, overhead power cables', 'low density; resists corrosion (oxide layer); conducts electricity'],
      ['Copper', 'electrical wires, water pipes', 'very good conductor; ductile; does not react with water'],
      ['Gold', 'jewellery, electrical contacts', 'shiny; very unreactive (does not corrode); malleable'],
      ['Steel (iron + carbon)', 'buildings, bridges, cars', 'strong and hard; cheap; can be protected from rusting'],
      ['Magnalium', 'aircraft and car parts', 'lighter and stronger than aluminium'],
      ['Brass', 'musical instruments, door fittings', 'harder than copper; resists corrosion; attractive colour']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.6, 3.6, 6.23], rowH: 0.46, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 0.45, 4.75, 12.43, 1.5, 'Gold alloys', ['Pure gold is **24 carat** but too soft for rings. **18 carat** gold is 18/24 = **75%** gold, alloyed with copper or silver to make it **harder**.'], { size: 12 });
  D.quickCheck(s, 'Explain why aluminium, not steel, is used for aircraft bodies.');
  D.notes(s, 'QUICK CHECK ANSWER: aluminium has a much lower density / lighter (1); and resists corrosion (1).\n18 carat = 75% checked. Spec 5.7C.');
  reg(s, '5.7C Uses of metals');
}

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 5.5C–5.7C • alloys and uses', [
  { q: 'What is an **alloy**?', marks: 1, ms: 'A mixture of a metal with (one or more) other elements (1).' },
  { q: 'Explain why alloys are **harder** than pure metals.', marks: 2, ms: 'Different-sized atoms distort the layers (1); so the layers cannot slide over each other easily (1).' },
  { q: 'What percentage of an **18 carat** gold ring is gold?', marks: 1, ms: '75% (1).' },
  { q: 'Give **two** properties of copper that make it suitable for electrical wires.', marks: 2, ms: 'Good conductor of electricity (1); ductile / can be drawn into wires (1).' },
], { p: true });
reg(R2.s, 'Recap 2');

// ======================= 13 CONCENTRATION mol dm-3 (HT) =======================
reg(D.contentSlide(Object.assign({
  title: 'Concentration in mol dm⁻³',
  subtitle: 'Specification 5.8C • moles of solute per cubic decimetre', ht: true,
  tag: '5.8C', caption: 'formula triangle; 1 dm³ = 1000 cm³',
  draw: (s, p) => {
    const ax = 1.0, ay = 4.4, bx = 4.3, top = 1.6;
    poly(s, [[(ax + bx) / 2, top], [bx, ay], [ax, ay]], 'EFE6FA', '6A3FA0', { lw: 2 });
    line(s, ax + 0.8, 3.25, bx - 0.8, 3.25, '6A3FA0', 2); line(s, (ax + bx) / 2, 3.25, (ax + bx) / 2, ay, '6A3FA0', 2);
    label(s, (ax + bx) / 2 - 0.7, 2.5, 1.4, '**moles**', { size: 13, h: 0.4 });
    label(s, ax + 0.25, 3.6, 1.4, '**conc.**', { size: 12, h: 0.4 }); label(s, (ax + bx) / 2 + 0.05, 3.6, 1.4, '**vol (dm³)**', { size: 12, h: 0.4 });
    box(s, 4.55, 1.6, 1.85, 2.8, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 4.6, 1.65, 1.75, '**g dm⁻³ → mol dm⁻³**\n÷ Mr\n\n**mol dm⁻³ → g dm⁻³**\n× Mr', { size: 11.5, h: 2.7 });
    label(s, 0.6, 4.7, 5.8, '**cm³ → dm³: ÷ 1000**   (250 cm³ = 0.250 dm³)', { size: 12, h: 0.4 });
  },
  head: 'Key ideas',
  lines: [
    '**concentration (mol dm⁻³) = moles of solute ÷ volume of solution (dm³)**',
    'Convert volumes in **cm³** to **dm³** first (÷ 1000).',
    'To change **g dm⁻³** to **mol dm⁻³**, divide by the **Mr** of the solute.',
  ],
  worked: { head: 'Worked example', q: '4.0 g of NaOH is dissolved to make 500 cm³ of solution. Find its concentration in mol dm⁻³.',
    steps: [['Moles', '4.0 ÷ 40 = 0.10 mol'], ['Volume', '500 cm³ = 0.500 dm³'], ['Divide', '0.10 ÷ 0.500'], ['Answer', '0.20 mol dm⁻³']] },
  qc: 'Hydrochloric acid has a concentration of **7.3 g dm⁻³**. Convert this to mol dm⁻³. (Mr HCl = 36.5)',
  notes: 'QUICK CHECK ANSWER: 7.3 ÷ 36.5 (1) = 0.20 mol dm⁻³ (1).\nOther checked values: 0.20 mol in 250 cm³ = 0.80 mol dm⁻³; 0.50 mol dm⁻³ NaOH = 20 g dm⁻³.\nSpec 5.8C (Higher only; g dm⁻³ is in Topic 1 for both tiers).',
}, CO)), '5.8C Concentration (HT)');

// ======================= 14 CP 5.9C METHOD =======================
{
  const s = D.contentSlide(Object.assign({
    title: 'Core Practical: titration (method)',
    subtitle: 'Specification 5.9C • an accurate acid–alkali titration', cp: true,
    tag: '5.9C CP', caption: 'burette of acid over 25.0 cm³ of alkali with indicator, on a white tile',
    draw: (s, p) => {
      const R = rig(s, 0.95, 5.85, { level: 8, numbers: true, len: 2.9 });
      pipette(s, 4.6, 1.6, 2.6);
      callout(s, 2.7, 1.6, 1.6, '**burette** (acid)', R.bx + 0.12, 2.3, {});
      callout(s, 4.85, 2.7, 1.5, '**pipette** 25.0 cm³', 4.7, 2.9, {});
      callout(s, 3.0, 5.0, 2.6, 'conical flask: alkali + indicator', R.bx + 0.4, 5.2, {});
      label(s, 3.0, 5.4, 3.3, 'white tile: see the colour change', { size: 10, h: 0.3, align: 'left', color: C.grey });
    },
    head: 'Method',
    lines: [
      '**1** Use a **pipette** and filler to put **25.0 cm³** of alkali in a conical flask. Add a few drops of **indicator** (e.g. phenolphthalein or methyl orange).',
      '**2** Fill the **burette** with acid; record the start reading at eye level (bottom of the meniscus).',
      '**3** Add acid, swirling, then **drop by drop** near the end point until the indicator **just** changes colour. Record the reading.',
      '**4** Do a **rough** titration, then repeat until you have **concordant** titres (within **0.10 cm³**).',
    ],
    worked: { head: 'Safety and accuracy', q: '',
      steps: [['Safety', 'eye protection; acids and alkalis are irritant'], ['Accuracy', 'rinse burette with acid and pipette with alkali first; white tile; read at eye level']], size: 10.5 },
    workedH: 1.55,
    qc: 'Why is the acid added **drop by drop** near the end point?',
    notes: 'QUICK CHECK ANSWER: so you do not overshoot the end point (1); and the volume recorded is accurate (1).\nIndicators: phenolphthalein pink → colourless; methyl orange yellow → red (acid added to alkali). Universal indicator is not used: its colour change is gradual.\nSpec 5.9C Core Practical (chemistry only; PMT CP5).',
  }, CO));
  reg(s, '5.9C CP method');
}

// ======================= 15 CP 5.9C RESULTS =======================
{
  const s = D.contentHeader('Core Practical: titration (results)', 'Specification 5.9C–5.10C • concordant titres and the mean', { p: true, cp: true, tag: '5.9C CP' });
  const rows = [[HDR(''), HDR('Rough'), HDR('1'), HDR('2'), HDR('3')],
    [tcell('Final reading (cm³)', 0, { bold: true }), ...['23.60', '22.65', '22.40', '22.70'].map(v => tcell(v, 0, { align: 'center' }))],
    [tcell('Initial reading (cm³)', 1, { bold: true }), ...['1.00', '0.50', '0.30', '0.50'].map(v => tcell(v, 1, { align: 'center' }))],
    [tcell('Titre (cm³)', 0, { bold: true }), ...TITRES.map((v, i) => tcell(v.toFixed(2), 0, { align: 'center', bold: true, color: i ? C.green : C.grey }))]];
  [[23.60, 1.00], [22.65, 0.50], [22.40, 0.30], [22.70, 0.50]].forEach(([f, i0], k) => calc('titre ' + k, Math.round((f - i0) * 100) / 100, TITRES[k], 1e-9));
  s.addTable(rows, { x: 0.45, y: 1.3, w: 7.3, colW: [2.5, 1.2, 1.2, 1.2, 1.2], rowH: 0.45, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 0.45, 3.35, 7.3, 2.9, 'Processing the results', [
    'Ignore the **rough** titre (22.60 cm³).',
    'Titres 1–3 are **concordant**: they are within 0.10 cm³ of each other.',
    `**Mean titre** = (22.15 + 22.10 + 22.20) ÷ 3 = **${meanT.toFixed(2)} cm³**.`,
    'Record readings to **2 decimal places** (nearest 0.05 cm³).',
  ], { size: 12 });
  D.card(s, 8.0, 1.3, 4.88, 4.95, 'Errors to evaluate', [
    'Overshooting the end point: titre too **big**.',
    'Air bubble in the burette tip: wrong reading.',
    'Funnel left in the burette: drips change the level.',
    'Not rinsing the burette with the acid: acid diluted by water.',
    'Reading the top of the meniscus instead of the bottom.',
  ], { size: 12 });
  D.quickCheck(s, 'A student’s titres are 24.30, 23.80, 23.85 and 23.75 cm³ (first is rough). Calculate the mean titre.');
  calc('QC mean titre', Math.round((23.80 + 23.85 + 23.75) / 3 * 100) / 100, 23.80, 1e-9);
  D.notes(s, 'QUICK CHECK ANSWER: (23.80 + 23.85 + 23.75) ÷ 3 = 23.80 cm³ (1); concordant, rough ignored (1).\nAll titres and the mean are checked in node. Spec 5.9C.');
  reg(s, '5.9C CP results');
}

// ======================= 16 TITRATION CALCULATIONS (HT) =======================
reg(D.contentSlide(Object.assign({
  title: 'Titration calculations',
  subtitle: 'Specification 5.10C • finding an unknown concentration', ht: true,
  tag: '5.10C', caption: 'the four-step method',
  draw: (s, p) => {
    const st = [['1 Moles of known', 'moles = conc × vol (dm³)'], ['2 Use the ratio', 'from the balanced equation'], ['3 Moles of unknown', 'in the volume used'], ['4 Concentration', 'conc = moles ÷ vol (dm³)']];
    st.forEach(([h, t], i) => { const y = 1.55 + i * 0.95; flowBox(s, 1.0, y, 5.0, 0.75, h, t, [['DCE8F7', '7A9CC9'], ['EFE6FA', 'A58BD1'], ['FFF1D6', 'D9A441'], ['E1F3E6', '4E9A65']][i]); if (i < 3) arrow(s, 3.5, y + 0.76, 3.5, y + 0.94, C.ink, 2); });
    eqLine(s, 0.8, 5.35, 5.4, 'NaOH+HCl');
  },
  head: 'Worked example (the Core Practical data)',
  lines: [
    '25.0 cm³ of NaOH needed a mean of **22.15 cm³** of 0.100 mol dm⁻³ HCl.',
    '**1** moles HCl = 0.100 × 22.15 ÷ 1000 = **0.002215 mol**',
    '**2** ratio 1 : 1, so moles NaOH = **0.002215 mol**',
    '**3–4** [NaOH] = 0.002215 ÷ 0.0250 = **0.0886 mol dm⁻³**',
  ],
  worked: { head: 'Your turn', q: '20.0 cm³ of 0.050 mol dm⁻³ H₂SO₄ neutralises 25.0 cm³ of NaOH. Find [NaOH].',
    steps: [['Moles acid', '0.050 × 0.0200 = 0.0010 mol'], ['Ratio 1 : 2', 'NaOH = 0.0020 mol'], ['Answer', '0.0020 ÷ 0.0250 = 0.080 mol dm⁻³']], size: 11 },
  workedH: 1.75,
  qc: 'What volume of **0.20 mol dm⁻³** HCl reacts with **0.0050 mol** of NaOH? Give your answer in cm³.',
  notes: `QUICK CHECK ANSWER: 0.0050 ÷ 0.20 = 0.025 dm³ (1) = 25 cm³ (1).\nEquations: ${EQ['NaOH+HCl']}; ${EQ['H2SO4+NaOH']} (note the 1 : 2 ratio).\nAll values checked. Spec 5.10C (Higher only).`,
}, CO)), '5.10C Titration calculations (HT)');

// ======================= 17 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 5.8C–5.10C • concentration and titration', [
  { q: '**HT** Calculate the concentration of a solution containing **0.20 mol** in **250 cm³**.', marks: 2, ms: '0.20 ÷ 0.250 (1); = 0.80 mol dm⁻³ (1).' },
  { q: 'Explain why a **pipette** is used to measure the alkali, not a measuring cylinder.', marks: 1, ms: 'It measures a fixed volume more accurately (1).' },
  { q: 'What does **concordant** mean?', marks: 1, ms: 'Titres within 0.10 cm³ of each other (1).' },
  { q: '**HT** 25.0 cm³ of KOH is neutralised by 20.0 cm³ of 0.10 mol dm⁻³ HCl. Calculate [KOH].', marks: 3, ms: 'mol HCl = 0.10 × 0.0200 = 0.0020 (1); mol KOH = 0.0020 (1:1) (1); 0.0020 ÷ 0.0250 = 0.080 mol dm⁻³ (1).' },
], { p: true });
calc('R3 KOH', 0.10 * 0.0200 / 0.0250, 0.080, 1e-12);
reg(R3.s, 'Recap 3');

// ======================= 18 PERCENTAGE YIELD =======================
reg(D.contentSlide(Object.assign({
  title: 'Percentage yield',
  subtitle: 'Specification 5.11C–5.12C • actual yield is usually less than theoretical',
  tag: '5.11C–5.12C', caption: 'theoretical vs actual mass of calcium oxide from 50 g of calcium carbonate (to scale)',
  draw: (s, p) => {
    const g = { x: 1.6, y: 1.7, w: 4.4, h: 2.9, xmin: 0, xmax: 2, xstep: 1, ymin: 0, ymax: 30, ystep: 5, xlabel: '', ylabel: 'mass of CaO (g)', grid: true, fmt: () => '' };
    axes(s, g);
    [[0.5, 28, 'theoretical', '7B4FB8'], [1.5, 22.4, 'actual', C.green]].forEach(([x, v, t, col]) => { box(s, px(g, x) - 0.45, py(g, v), 0.9, py(g, 0) - py(g, v), col, col); label(s, px(g, x) - 0.8, py(g, 0) + 0.05, 1.6, `**${t}**`, { size: 11, h: 0.28 }); label(s, px(g, x) - 0.6, py(g, v) - 0.3, 1.2, `${v} g`, { size: 11, h: 0.26, bold: true }); });
    eqLine(s, 0.8, 5.25, 5.4, 'CaCO3 heat');
  },
  head: 'Key ideas',
  lines: [
    '**% yield = actual yield ÷ theoretical yield × 100**',
    'The **theoretical yield** is the maximum mass calculated from the equation.',
    'The actual yield is lower because of: **incomplete reactions** (e.g. reversible); **practical losses** (left in apparatus, filtering, transferring); **competing, unwanted reactions**.',
  ],
  worked: { head: 'Worked example', q: '50 g of CaCO₃ is heated; 22.4 g of CaO is collected. Find the % yield.',
    steps: [['Theoretical', '50 × 56 ÷ 100 = 28 g'], ['% yield', '22.4 ÷ 28 × 100'], ['Answer', '80%']] },
  qc: 'The theoretical yield is **12.0 g** but only **9.0 g** is made. Calculate the percentage yield.',
  notes: 'QUICK CHECK ANSWER: 9.0 ÷ 12.0 × 100 (1) = 75% (1).\nSpec 5.11C–5.12C. Bars drawn to scale.',
}, CO)), '5.11C–5.12C Percentage yield');

// ======================= 19 ATOM ECONOMY =======================
reg(D.contentSlide(Object.assign({
  title: 'Atom economy',
  subtitle: 'Specification 5.13C–5.14C • how much of the reactants ends up in the useful product',
  tag: '5.13C–5.14C', caption: 'atom economy of making calcium oxide (to scale)',
  draw: (s, p) => {
    eqLine(s, 0.75, 1.55, 5.6, 'CaCO3 heat', { size: 13 });
    const x0 = 0.9, w = 5.4, y = 2.4;
    box(s, x0, y, w * 0.56, 0.7, '7B4FB8', '7B4FB8'); box(s, x0 + w * 0.56, y, w * 0.44, 0.7, 'C9CDD3', '8A8F99');
    label(s, x0, y, w * 0.56, '**CaO (useful): 56**', { size: 12, h: 0.7, color: C.white }); label(s, x0 + w * 0.56, y, w * 0.44, '**CO₂ (waste): 44**', { size: 12, h: 0.7 });
    label(s, x0, y + 0.75, w, 'total Mr of reactants: CaCO₃ = 100', { size: 11, h: 0.3 });
    box(s, 0.75, 3.75, 5.6, 1.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.85, 3.8, 5.4, '**atom economy = Mr of useful product ÷ total Mr of reactants × 100**\n\n= 56 ÷ 100 × 100 = **56%**', { size: 12, h: 1.5 });
  },
  head: 'Key ideas',
  lines: [
    '**Atom economy** is the percentage of the **mass of reactants** that becomes the **desired product**.',
    'Use the **balanced equation**: include the balancing numbers in the Mr totals.',
    'A **high** atom economy means **less waste**: better for **sustainability** and usually cheaper.',
    'Reactions with only **one product** have **100%** atom economy.',
  ],
  worked: { head: 'Worked example', q: 'Hydrogen is made by CH₄ + H₂O → CO + 3H₂. Find the atom economy for hydrogen.',
    steps: [['Useful', '3H₂ = 3 × 2 = 6'], ['Reactants', '16 + 18 = 34'], ['Answer', '6 ÷ 34 × 100 = 17.6%']] },
  qc: 'Explain why making ammonium sulfate from ammonia and sulfuric acid has an atom economy of **100%**.',
  notes: `QUICK CHECK ANSWER: ${EQ['(NH4)2SO4']} has only one product (1); so all the reactant atoms end up in the desired product (1).\nAll atom economies checked in node. Spec 5.13C–5.14C.`,
}, CO)), '5.13C–5.14C Atom economy');

// ======================= 20 CHOOSING A PATHWAY =======================
{
  const s = D.contentHeader('Choosing a reaction pathway', 'Specification 5.15C • yield, atom economy, rate, equilibrium and by-products', { p: true, tag: '5.15C' });
  const rows = [[HDR('Making ethanol'), HDR('Fermentation of sugar'), HDR('Hydration of ethene')],
    ...[['Equation', EQ.ferment, EQ.hydration], ['Atom economy', '51.1% (CO₂ by-product)', '100% (one product)'], ['Rate', 'slow (days)', 'fast'],
      ['Conditions', '30–40 °C, yeast, no air', '300 °C, 60–70 atm, catalyst'], ['Raw material', 'sugar cane: renewable', 'ethene from crude oil: finite'],
      ['Product', 'dilute; needs distilling', 'pure; continuous process']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 })))];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.4, 5.0, 5.03], rowH: 0.43, fontFace: 'Calibri', fontSize: 11.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 0.45, 4.45, 12.43, 1.8, 'How to decide', [
    'Compare **yield** and **atom economy** (waste), **rate**, **equilibrium position** (for reversible reactions), **energy** and **cost**, and whether the **by-products are useful** or can be sold.',
    'Countries with lots of sugar cane often use **fermentation**; those with oil use **hydration**.',
  ], { size: 12 });
  D.quickCheck(s, 'Give **one** advantage of each method of making ethanol.');
  D.notes(s, 'QUICK CHECK ANSWER: fermentation: renewable raw material / low temperature (1); hydration: 100% atom economy / fast / pure product (1).\nAtom economies checked (51.1% and 100%). Hydration conditions are the standard textbook values. Spec 5.15C.');
  reg(s, '5.15C Choosing a pathway');
}

// ======================= 21 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 5.11C–5.15C • yield and atom economy', [
  { q: 'Give **two** reasons why the actual yield is less than the theoretical yield.', marks: 2, ms: 'Any two: reaction incomplete / reversible; product lost when transferring or filtering; side reactions (1 each).' },
  { q: 'A reaction should make **7.0 g** of product but makes **5.6 g**. Calculate the percentage yield.', marks: 2, ms: '5.6 ÷ 7.0 × 100 (1); = 80% (1).' },
  { q: 'Calculate the atom economy for CaO in ' + EQ['CaCO3 heat'] + '.', marks: 2, ms: '56 ÷ 100 × 100 (1); = 56% (1).' },
  { q: 'Explain why a **high atom economy** is important for sustainable development.', marks: 1, ms: 'Less waste produced / fewer raw materials used (1).' },
], { p: true });
reg(R4.s, 'Recap 4');

// ======================= 22 MOLAR VOLUME (HT) =======================
reg(D.contentSlide(Object.assign({
  title: 'Molar volume of a gas',
  subtitle: 'Specification 5.16C–5.17C • 1 mole of any gas = 24 dm³ at room temperature and pressure', ht: true,
  tag: '5.16C–5.17C', caption: 'one mole of different gases: same volume, different masses',
  draw: (s, p) => {
    [['H₂', '2 g'], ['O₂', '32 g'], ['CO₂', '44 g']].forEach(([g, m], i) => {
      const x = 0.85 + i * 1.9;
      box(s, x, 1.8, 1.5, 1.8, 'E3EDF7', '6B7385', { lw: 1.25 });
      label(s, x, 1.85, 1.5, `**${g}**`, { size: 16, h: 0.4 });
      label(s, x, 2.4, 1.5, '1 mol', { size: 12, h: 0.3 }); label(s, x, 2.75, 1.5, '**24 dm³**', { size: 13, h: 0.35, color: '1F5F99' }); label(s, x, 3.15, 1.5, m, { size: 12, h: 0.3, color: C.grey });
    });
    box(s, 0.8, 4.0, 5.6, 1.4, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.9, 4.05, 5.4, '**volume of gas (dm³) = moles × 24**\n**moles = volume (dm³) ÷ 24**\n(use 24 000 for cm³)', { size: 12, h: 1.3 });
  },
  head: 'Key ideas',
  lines: [
    'One mole of **any gas** occupies **24 dm³** (24 000 cm³) at room temperature and pressure (**rtp**).',
    'Use it with **balanced equations** to link masses of solids to volumes of gases.',
  ],
  worked: { head: 'Worked example', q: 'What volume of CO₂ forms when 5.0 g of CaCO₃ reacts with excess acid?',
    steps: [['Equation', EQ['CaCO3+HCl']], ['Moles CaCO₃', '5.0 ÷ 100 = 0.050 mol'], ['Ratio 1 : 1', '0.050 mol CO₂'], ['Answer', '0.050 × 24 = 1.2 dm³']], size: 10.5 },
  workedH: 2.25,
  qc: 'What volume of hydrogen (in cm³) is made when **0.24 g** of magnesium reacts with excess acid?',
  notes: `QUICK CHECK ANSWER: 0.24 ÷ 24 = 0.010 mol Mg (1); 1 : 1 so 0.010 mol H₂ × 24 000 = 240 cm³ (1). Equation: ${EQ['Mg+HCl']}.\nOther checked values: 3.6 dm³ = 0.15 mol; 6.0 dm³ CO₂ has mass 11 g.\nSpec 5.16C–5.17C (Higher only).`,
}, CO)), '5.16C–5.17C Molar volume (HT)');

// ======================= 23 AVOGADRO'S LAW (HT) =======================
reg(D.contentSlide(Object.assign({
  title: 'Avogadro’s law and gas volumes',
  subtitle: 'Specification 5.18C • equal volumes of gases contain equal numbers of molecules', ht: true,
  tag: '5.18C', caption: 'balancing numbers give the volume ratio for gases',
  draw: (s, p) => {
    eqLine(s, 0.75, 1.55, 5.6, 'Haber', { size: 13 });
    [['N₂', '1', 10], ['H₂', '3', 30], ['NH₃', '2', 20]].forEach(([g, n, v], i) => {
      const x = 0.95 + i * 1.95, hgt = v * 0.07;
      box(s, x, 4.6 - hgt, 1.2, hgt, ['DCE8F7', 'F4F4F4', 'EFE6FA'][i], '6B7385', { lw: 1 });
      label(s, x - 0.2, 4.65, 1.6, `**${g}**: ${n} vol`, { size: 11, h: 0.3 });
      label(s, x - 0.2, 4.6 - hgt - 0.32, 1.6, `**${v} dm³**`, { size: 11, h: 0.3, color: '1F5F99' });
    });
    label(s, 0.7, 5.1, 5.7, 'volume ratio 1 : 3 : 2 (bars to scale)', { size: 10.5, h: 0.3, italic: true });
  },
  head: 'Key ideas',
  lines: [
    '**Avogadro’s law:** at the same temperature and pressure, **equal volumes** of gases contain the **same number of molecules**.',
    'So the **balancing numbers** in an equation give the **ratio of gas volumes** directly: no need to convert to moles.',
    'Only use it for **gases** (not liquids or solids).',
  ],
  worked: { head: 'Worked example', q: 'What volume of oxygen burns 50 cm³ of methane?',
    steps: [['Equation', EQ['CH4 burn']], ['Ratio', 'CH₄ : O₂ = 1 : 2'], ['Answer', '50 × 2 = 100 cm³ of O₂']], size: 11 },
  workedH: 1.75,
  qc: '**30 dm³** of hydrogen reacts completely in the Haber process. What volume of ammonia forms?',
  notes: `QUICK CHECK ANSWER: H₂ : NH₃ = 3 : 2 (1); 30 × 2 ÷ 3 = 20 dm³ (1).\nAlso checked: ${EQ['H2+Cl2']}: 40 cm³ H₂ gives 80 cm³ HCl.\nSpec 5.18C (Higher only).`,
}, CO)), '5.18C Avogadro’s law (HT)');

// ======================= 24 RECAP 5 (HT) =======================
const R5 = D.recapSlide(5, 'Specification 5.16C–5.18C • gas volumes (Higher)', [
  { q: 'State the volume of **1 mole** of any gas at room temperature and pressure.', marks: 1, ms: '24 dm³ / 24 000 cm³ (1).' },
  { q: 'Calculate the volume of **0.5 mol** of oxygen at rtp.', marks: 1, ms: '12 dm³ (1).' },
  { q: 'Calculate the mass of **6.0 dm³** of carbon dioxide at rtp. (Mr = 44)', marks: 2, ms: '6.0 ÷ 24 = 0.25 mol (1); 0.25 × 44 = 11 g (1).' },
  { q: 'H₂(g) + Cl₂(g) → 2HCl(g). What volume of HCl forms from **40 cm³** of hydrogen?', marks: 2, ms: 'Ratio 1 : 2 (1); 80 cm³ (1).' },
], { p: true, ht: true });
reg(R5.s, 'Recap 5 (HT)');

// ======================= 25 HABER CONDITIONS =======================
reg(D.contentSlide(Object.assign({
  title: 'Haber process: rate and equilibrium',
  subtitle: 'Specification 5.19C–5.20C • why 450 °C, 200 atm and iron?',
  tag: '5.19C–5.20C', caption: 'each condition is a compromise',
  draw: (s, p) => {
    eqLine(s, 0.75, 1.55, 5.6, 'Haber', { size: 13 });
    label(s, 0.75, 2.0, 5.6, 'forward reaction **exothermic**; 4 gas molecules → 2', { size: 11, h: 0.3 });
    const rows = [[HDR('Condition'), HDR('Effect on rate'), HDR('Effect on yield (HT)')],
      ...[['Higher temperature', 'faster', 'lower (endothermic way favoured)'], ['Higher pressure', 'faster', 'higher (fewer gas molecules)'], ['Iron catalyst', 'faster', 'no change']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 })))];
    s.addTable(rows, { x: 0.65, y: 2.45, w: 5.8, colW: [1.8, 1.4, 2.6], rowH: 0.5, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'The compromise',
  lines: [
    '**450 °C:** a lower temperature gives more ammonia at equilibrium, but the rate would be **too slow**.',
    '**200 atm:** higher pressure gives more ammonia **and** a faster rate, but costs more and is more **dangerous**.',
    '**Iron catalyst:** reaches equilibrium **faster**; the yield is unchanged.',
    'Unreacted N₂ and H₂ are **recycled**; ammonia is removed by **cooling** (it liquefies).',
  ],
  worked: { head: 'Explain', q: 'Why is ammonia removed as it forms?',
    steps: [['Equilibrium', 'removing product shifts it to the right (HT)'], ['Answer', 'more N₂ and H₂ react: more ammonia overall']], size: 11 },
  workedH: 1.5,
  qc: 'Explain why the Haber process is not carried out at **1000 atm**.',
  notes: 'QUICK CHECK ANSWER: very high pressure is expensive (equipment, energy to compress) (1); and dangerous (1); 200 atm gives an acceptable yield at an acceptable cost.\nSpec 5.19C–5.20C (equilibrium reasoning Higher only, medium confidence; links to Topic 4.17).',
}, CO)), '5.19C–5.20C Haber conditions');

// ======================= 26 FERTILISERS =======================
reg(D.contentSlide(Object.assign({
  title: 'Fertilisers',
  subtitle: 'Specification 5.21C–5.22C • NPK; making ammonium salts in the lab and in industry',
  tag: '5.21C–5.22C', caption: 'ammonium sulfate: lab-scale (titration) and industrial-scale routes',
  draw: (s, p) => {
    flowBox(s, 0.65, 1.55, 2.75, 1.85, 'Laboratory', 'titrate ammonia solution with dilute sulfuric acid; crystallise. Small batches, simple apparatus', ['DCE8F7', '7A9CC9']);
    flowBox(s, 3.65, 1.55, 2.75, 1.85, 'Industry', 'several stages from raw materials (air, natural gas, sulfur): Haber + Contact processes. Continuous, large scale', ['FFF1D6', 'D9A441']);
    eqLine(s, 0.65, 3.65, 5.75, '(NH4)2SO4');
    eqLine(s, 0.65, 4.2, 5.75, 'NH4NO3');
    label(s, 0.65, 4.8, 5.75, '**N**itrogen, **P**hosphorus, **K** (potassium): the three essential elements in NPK fertilisers', { size: 11, h: 0.5 });
  },
  head: 'Key ideas',
  lines: [
    'Fertilisers replace **nitrogen**, **phosphorus** and **potassium** that crops remove from the soil, to increase **crop yield**.',
    '**Ammonium nitrate** and **ammonium sulfate** are made by neutralising **ammonia** with an **acid**.',
    'Lab: a **titration** then crystallisation; small amounts. Industry: large, continuous plants with **many stages** from raw materials.',
  ],
  worked: { head: 'Compare', q: 'Why is the lab method not used in industry?',
    steps: [['Lab', 'batch; small amounts; uses bought-in chemicals'], ['Industry', 'continuous; makes its own ammonia and acid from raw materials'], ['Answer', 'industry needs huge, cheap, continuous production']], size: 10.5 },
  workedH: 1.85,
  qc: 'Name the acid and alkali used to make **ammonium nitrate**.',
  notes: `QUICK CHECK ANSWER: nitric acid (1); ammonia (solution) (1).\nEquations checked: ${EQ['NH4NO3']}; ${EQ['(NH4)2SO4']}. Stretch: % N in NH₄NO₃ = 35% (checked).\nSpec 5.21C–5.22C.`,
}, CO)), '5.21C–5.22C Fertilisers');

// ======================= 27 RECAP 6 =======================
const R6 = D.recapSlide(6, 'Specification 5.19C–5.22C • Haber process and fertilisers', [
  { q: 'Explain why **450 °C** is used in the Haber process rather than a lower temperature.', marks: 2, ms: 'A lower temperature would give a higher yield (1); but the rate would be too slow (so 450 °C is a compromise) (1).' },
  { q: 'State the effect of the **iron catalyst** on the yield of ammonia.', marks: 1, ms: 'No effect (it only increases the rate) (1).' },
  { q: 'Name the **three** main elements in NPK fertilisers.', marks: 2, ms: 'Nitrogen, phosphorus, potassium (2 for all three; 1 for two).' },
  { q: 'Write the word equation for making ammonium sulfate.', marks: 1, ms: 'Ammonia + sulfuric acid → ammonium sulfate (1).' },
], { p: true });
reg(R6.s, 'Recap 6');

// ======================= 28 CHEMICAL CELLS =======================
reg(D.contentSlide(Object.assign({
  title: 'Chemical cells',
  subtitle: 'Specification 5.23C • a voltage until a reactant is used up',
  tag: '5.23C', caption: 'zinc and copper in their salt solutions joined by a salt bridge',
  draw: (s, p) => {
    beaker(s, 0.85, 3.0, 2.0, 2.1, 0.75, 'E8EBF0'); beaker(s, 3.95, 3.0, 2.0, 2.1, 0.75, CUSO4[0]);
    box(s, 1.65, 2.3, 0.3, 2.4, 'C9CDD3', '5A6275', { lw: 1 }); box(s, 4.85, 2.3, 0.3, 2.4, COPPER[0], COPPER[1], { lw: 1 });
    poly(s, [[2.45, 3.35], [2.45, 2.85], [4.35, 2.85], [4.35, 3.35], [4.2, 3.35], [4.2, 3.0], [2.6, 3.0], [2.6, 3.35]], 'F4F4F4', '6B7385', { lw: 1 });
    label(s, 2.6, 2.55, 1.6, 'salt bridge', { size: 9.5, h: 0.26 });
    wire(s, [[1.8, 2.3], [1.8, 1.75], [2.95, 1.75]], C.ink, 1.5); wire(s, [[5.0, 2.3], [5.0, 1.75], [3.85, 1.75]], C.ink, 1.5);
    ball(s, 3.4, 1.75, 0.42, 'FFFFFF', C.ink, 1.5); label(s, 3.0, 1.55, 0.8, '**V**', { size: 16, h: 0.4 });
    label(s, 0.85, 5.15, 2.0, '**Zn** in ZnSO₄', { size: 11, h: 0.3 }); label(s, 3.95, 5.15, 2.0, '**Cu** in CuSO₄', { size: 11, h: 0.3 });
    arrow(s, 2.3, 1.55, 2.9, 1.55, '1F5F99', 1.5); label(s, 2.05, 1.25, 1.0, 'e⁻', { size: 11, h: 0.26, color: '1F5F99', bold: true });
  },
  head: 'Key ideas',
  lines: [
    'A **chemical cell** produces a **voltage** from a chemical reaction until one of the **reactants is used up**.',
    'The bigger the difference in **reactivity** between the two metals, the bigger the voltage.',
    'The more reactive metal (zinc) **loses electrons**; they flow through the wire to the less reactive metal.',
    `Overall: ${EQ['Zn+Cu cell']}`,
  ],
  worked: { head: 'Predict', q: 'Which pair gives the bigger voltage: Zn/Cu or Fe/Cu?',
    steps: [['Reactivity', 'Zn is further above Cu than Fe is'], ['Answer', 'Zn/Cu gives the bigger voltage']], size: 11 },
  workedH: 1.5,
  qc: 'Why does a non-rechargeable battery eventually **stop** working?',
  notes: 'QUICK CHECK ANSWER: one of the reactants is used up (1); so the reaction (and the voltage) stops (1).\nSpec 5.23C.',
}, CO)), '5.23C Chemical cells');

// ======================= 29 FUEL CELLS =======================
reg(D.contentSlide(Object.assign({
  title: 'Hydrogen–oxygen fuel cells',
  subtitle: 'Specification 5.24C–5.25C • continuous supply of fuel; evaluate strengths and weaknesses',
  tag: '5.24C–5.25C', caption: 'hydrogen fuel cell with an acid electrolyte (simplified)',
  draw: (s, p) => {
    box(s, 1.2, 2.0, 4.6, 2.6, 'F4F4F4', '6B7385', { lw: 1.25 });
    box(s, 1.2, 2.0, 0.4, 2.6, GRAPH[0], GRAPH[1]); box(s, 5.4, 2.0, 0.4, 2.6, GRAPH[0], GRAPH[1]);
    box(s, 1.6, 2.0, 3.8, 2.6, 'F9E0DA', null); label(s, 1.6, 3.1, 3.8, 'electrolyte', { size: 11, h: 0.3, color: C.grey });
    arrow(s, 0.4, 2.6, 1.15, 2.6, '1F5F99', 2); label(s, 0.3, 2.25, 1.0, '**H₂ in**', { size: 10.5, h: 0.3, color: '1F5F99' });
    arrow(s, 6.6, 2.6, 5.85, 2.6, C.red, 2); label(s, 5.75, 2.25, 1.0, '**O₂ in**', { size: 10.5, h: 0.3, color: C.red });
    arrow(s, 5.85, 4.2, 6.6, 4.2, C.ink, 2); label(s, 5.75, 4.3, 1.1, '**H₂O out**', { size: 10.5, h: 0.3 });
    wire(s, [[1.4, 2.0], [1.4, 1.55], [5.6, 1.55], [5.6, 2.0]], C.ink, 1.5); ball(s, 3.5, 1.55, 0.25, 'FFF1D6', C.ink, 1.25); label(s, 3.25, 1.4, 0.5, '**M**', { size: 11, h: 0.3 });
    label(s, 0.7, 4.75, 5.8, `HT: ${EQ['fc anode']}  •  ${EQ['fc cathode']}`, { size: 10, h: 0.3 });
    label(s, 0.7, 5.1, 5.8, `overall: **${EQ['fuel cell']}**`, { size: 11, h: 0.3 });
  },
  head: 'Key ideas',
  lines: [
    'A **fuel cell** is supplied **continuously** with a fuel (hydrogen) and **oxygen**; it produces a **voltage** for as long as they are supplied.',
    'Hydrogen is **oxidised**; the only product is **water**.',
    '**Strengths:** no CO₂ or pollutants at the point of use; efficient; few moving parts; quiet.',
    '**Weaknesses:** hydrogen is **flammable** and hard to **store**; made mostly from **fossil fuels** or electrolysis (energy); fuel cells are **expensive**; few refuelling stations.',
  ],
  worked: { head: 'Evaluate', q: 'Is a hydrogen car "zero emission"?',
    steps: [['In use', 'only water comes out of the car'], ['Making H₂', 'usually from natural gas: CO₂ released'], ['Answer', 'zero at the exhaust, not over the whole life cycle']], size: 10.5 },
  workedH: 1.75,
  qc: 'Give **one** advantage and **one** disadvantage of hydrogen fuel cells compared with petrol engines.',
  notes: `QUICK CHECK ANSWER: advantage, e.g. only water produced / no CO₂ at point of use (1); disadvantage, e.g. hydrogen hard to store / flammable / made using fossil fuels (1).\nAll equations checked: ${EQ['fuel cell']}; half equations (acid electrolyte) are extension. Spec 5.24C–5.25C.`,
}, CO)), '5.24C–5.25C Fuel cells');

// ======================= 30 RECAP 7 =======================
const R7 = D.recapSlide(7, 'Specification 5.23C–5.25C • cells and fuel cells', [
  { q: 'Explain how a **chemical cell** differs from a **fuel cell**.', marks: 2, ms: 'A chemical cell stops when a reactant is used up (1); a fuel cell keeps working while fuel and oxygen are supplied (1).' },
  { q: 'Write the overall equation for a hydrogen fuel cell with state symbols.', marks: 2, ms: `${EQ['fuel cell']}: formulae and balancing (1); state symbols (1).` },
  { q: 'Give **two** disadvantages of hydrogen fuel cells.', marks: 2, ms: 'Any two: hydrogen is flammable / explosive; hard to store (high pressure); made from fossil fuels; expensive; few refuelling stations (1 each).' },
], { p: true });
reg(R7.s, 'Recap 7');

// ======================= 31 CALCULATION BANK =======================
{
  const s = D.contentHeader('Summary: Topic 5 calculations', 'Specification 5.8C–5.18C • every example checked', { p: true, tag: 'Calculation bank' });
  const bank = [
    ['Concentration (HT)', 'mol dm⁻³ = moles ÷ volume (dm³)', '4.0 g NaOH in 500 cm³ = 0.20', '5.8C'],
    ['g dm⁻³ ↔ mol dm⁻³ (HT)', '÷ Mr  /  × Mr', '7.3 g dm⁻³ HCl = 0.20 mol dm⁻³', '5.8C'],
    ['Mean titre', 'mean of concordant titres (within 0.10 cm³)', '22.15 cm³', '5.9C'],
    ['Titration (HT)', 'moles known → ratio → moles unknown → conc', '[NaOH] = 0.0886 mol dm⁻³', '5.10C'],
    ['Percentage yield', 'actual ÷ theoretical × 100', '22.4 ÷ 28 × 100 = 80%', '5.11C'],
    ['Atom economy', 'Mr useful ÷ total Mr reactants × 100', 'CaO: 56%', '5.14C'],
    ['Gas volume (HT)', 'volume = moles × 24 dm³', '5.0 g CaCO₃ → 1.2 dm³ CO₂', '5.17C'],
    ['Avogadro (HT)', 'gas volumes in the ratio of balancing numbers', '30 dm³ H₂ → 20 dm³ NH₃', '5.18C'],
  ];
  const rows = [[HDR('Calculation'), HDR('Method'), HDR('Example'), HDR('Spec')], ...bank.map(([a, b, c2, d], i) => [tcell(a, i, { bold: true }), tcell(b, i), tcell(c2, i, { bold: true, color: C.ink }), tcell(d, i, { color: C.blue, align: 'center' })])];
  s.addTable(rows, { x: 0.45, y: 1.3, w: 12.43, colW: [2.9, 4.8, 3.6, 1.13], rowH: 0.48, fontFace: 'Calibri', fontSize: 12, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.quickCheck(s, 'Cover the Method column. Say each method aloud, then check it.');
  D.notes(s, 'Retrieval grid. Equations checked in build_T5.js:\n' + EQLIST.join('\n'));
  reg(s, 'Summary: calculations');
}

// ======================= 32 KEY WORDS =======================
reg(D.keyWords([
  ['Transition metal', 'Central-block metal: high mp, coloured compounds, catalyst.'],
  ['Corrosion', 'Oxidation of a metal by its surroundings.'],
  ['Rusting', 'Corrosion of iron: needs oxygen and water.'],
  ['Sacrificial protection', 'More reactive metal corrodes instead.'],
  ['Galvanising', 'Coating iron with zinc.'],
  ['Electroplating', 'Coating an object (cathode) with a metal.'],
  ['Alloy', 'Metal mixed with other elements; harder.'],
  ['Titration', 'Finds exact reacting volumes using an indicator.'],
  ['Concordant', 'Titres within 0.10 cm³ of each other.'],
  ['Percentage yield', 'Actual ÷ theoretical × 100.'],
  ['Atom economy', 'Mr useful product ÷ total Mr reactants × 100.'],
  ['Molar volume (HT)', '24 dm³ per mole of gas at rtp.'],
  ['Avogadro’s law (HT)', 'Equal gas volumes: equal numbers of molecules.'],
  ['Fertiliser', 'Supplies N, P and K for plant growth.'],
  ['Chemical cell', 'Gives a voltage until a reactant runs out.'],
  ['Fuel cell', 'Continuous fuel + oxygen → voltage; H₂ gives water.'],
], { notes: 'Cover-and-recall activity. HT terms marked (HT).' }), 'Summary: key words');

// ======================= 33 FULL QUESTION =======================
reg(D.fullQuestion('A student reacts **magnesium** with hydrochloric acid, then carries out a **titration** to find the concentration of some sodium hydroxide.', [
  { l: 'a', q: 'Magnesium is used to protect iron ships from rusting. Explain how.', marks: 2, ms: 'Magnesium is more reactive than iron (1); so it is oxidised / corrodes instead of the iron (sacrificial protection) (1).' },
  { l: 'b', q: '**HT** ' + EQ['Mg+HCl'] + '. Calculate the volume of hydrogen at rtp made from **1.2 g** of magnesium.', marks: 3, ht: true, ms: '1.2 ÷ 24 = 0.050 mol Mg (1); 0.050 mol H₂ (1:1) (1); 0.050 × 24 = 1.2 dm³ (1).', h: 1.15 },
  { l: 'c', q: 'The student expected 7.0 g of magnesium chloride but obtained 5.6 g. Calculate the percentage yield.', marks: 2, ms: '5.6 ÷ 7.0 × 100 (1); = 80% (1).' },
  { l: 'd', q: 'Describe how the student should carry out the titration to get an **accurate** result.', marks: 3, ms: 'Use a pipette for 25.0 cm³ of alkali and add indicator (1); add acid from the burette, drop by drop near the end point, swirling (1); repeat until titres are concordant / within 0.10 cm³ (1).', h: 1.15 },
  { l: 'e', q: '**HT** 25.0 cm³ of NaOH needs **20.0 cm³** of **0.10 mol dm⁻³** HCl. Calculate [NaOH].', marks: 3, ht: true, ms: 'mol HCl = 0.10 × 0.0200 = 0.0020 (1); mol NaOH = 0.0020 (1); 0.0020 ÷ 0.0250 = 0.080 mol dm⁻³ (1).', h: 1.1 },
], 13, { ht: true, p: true, subtitle: 'Specification 5.3C–5.17C • answer every part • 13 marks (parts b and e are HT)' }), 'Full question');

// ======================= 34–35 HOMEWORK =======================
const HW = [
  { n: '1', q: 'State **two** typical properties of transition metals.', marks: 2, ms: 'Any two: high mp; high density; coloured compounds; catalysts (1 each).', h: 0.75 },
  { n: '2', q: 'Calculate the **atom economy** for hydrogen in ' + EQ['steam reform'] + '.', marks: 2, ms: '3 × 2 ÷ (16 + 18) × 100 (1); = 17.6% (1).', h: 0.85 },
  { n: '3', q: '**HT** Convert **0.50 mol dm⁻³** sodium hydroxide into g dm⁻³.', marks: 2, ht: true, ms: '0.50 × 40 (1); = 20 g dm⁻³ (1).', h: 0.8 },
  { n: '4', q: '**HT** What volume of oxygen is needed to burn **50 cm³** of methane? ' + EQ['CH4 burn'], marks: 2, ht: true, ms: 'Ratio 1 : 2 (1); 100 cm³ (1).', h: 0.95 },
  { n: '5', q: 'Give **two** strengths and **one** weakness of hydrogen fuel cells.', marks: 3, ms: 'Strengths (any two): only water produced; no CO₂ at point of use; efficient (1 each). Weakness: hard to store / flammable / made from fossil fuels / expensive (1).', h: 0.95 },
  { n: '6', q: 'Describe and explain **three** different ways of preventing iron from rusting, and evaluate which is best for a steel bucket.', marks: 6, levels: true, h: 1.45, ms: levelsHW() },
];
calc('HW2 AE', Math.round(6 / 34 * 1000) / 10, 17.6, 1e-9);
function levelsHW() {
  return D.levels6([
    'Rusting needs both oxygen and water.',
    'Painting: a barrier that keeps oxygen and water away; fails if scratched.',
    'Oiling / greasing: a barrier for moving parts; must be renewed.',
    'Plastic coating: a tough barrier.',
    'Sacrificial protection: attach a more reactive metal (zinc, magnesium), which is oxidised instead of iron.',
    'Galvanising: zinc coating acts as a barrier and gives sacrificial protection, so it still protects when scratched.',
    'Evaluation: a bucket is scratched in use and holds water, so galvanising is best.',
  ], 'Level 3 answers explain three methods in terms of oxygen/water or reactivity AND give a justified choice for the bucket.');
}
D.homework('Answer every question. Questions 3 and 4 are Higher tier. Show your working.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5, R6, R7].forEach((r, i) => console.log(`recap ${i + 1}: ${r.total} marks`));
assert.strictEqual(R1.total, 8); assert.strictEqual(R2.total, 6); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7);
assert.strictEqual(R5.total, 6); assert.strictEqual(R6.total, 6); assert.strictEqual(R7.total, 6);
assert(D.slideNo >= 32 && D.slideNo <= 40, 'slide count ' + D.slideNo);
console.log(`${EQLIST.length} equations asserted (atoms and charges)`);
const out = path.join(__dirname, 'EDX_1CH0_T5_SeparateChemistry1.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
