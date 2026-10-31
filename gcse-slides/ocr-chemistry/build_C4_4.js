// build_C4_4.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter C4 Material choices, C4.4 What happens to products at the end of their useful life?
// (one deck, Higher & Foundation; Part 4 of 4, the last C4 deck)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_C4_4.js
// Structure copied from ../ocr-biology/build_B6_3.js. ocr_chem_template.js is NOT edited: test tube, nail, steel
// cross-section, polymer chain, bar chart and equation-balance helpers are in the DECK-SPECIFIC block below.
// Scope (see SPEC_C4_4.md): J260 C4.4 = J258 C4.5 renumbered (J258 C4.2 polymers is separate-science only).
// Taught: corrosion (conditions, process, barrier and sacrificial protection; HT electron-transfer explanation),
// suggested practical on corrosion prevention, life-cycle assessment (principles and data), end-of-life options,
// recycling for a different use, factors affecting recycling decisions. Material properties (C4.1), bonding and
// structure (C4.2) and nanoparticles (C4.3) are recap only; the reactivity series and oxidation are C3 recap.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_chem_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'C4', chapterTitle: 'Material choices', code: 'C4.4', title: 'What happens to products at the end of their useful life?',
  part: 4, parts: 4, specRange: 'C4.4.1–C4.4.7',
  subtitle: 'What happens to products at the end of their useful life?',
  keywords: ['Corrosion', 'Sacrificial protection', 'Life-cycle assessment', 'Recycling', 'Landfill'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };
const fmt = v => String(+v.toFixed(6));
const pct = (a, b) => (b - a) / a * 100;

// ======================= EQUATIONS: atom and charge balance (asserted) =======================
// parse a formula such as 'Fe(OH)3' or 'Fe2+' into element counts; charge from trailing +/− (e.g. 'Fe2+', 'OH-', 'e-')
function parseFormula(f) {
  let charge = 0;
  const m = f.match(/^(.*?)(\d*)([+-])$/);
  let body = f;
  if (m && f !== 'e-') { body = m[1]; charge = (m[3] === '+' ? 1 : -1) * (m[2] ? +m[2] : 1); }
  if (f === 'e-') return { atoms: {}, charge: -1 };
  const stack = [{}];
  const re = /([A-Z][a-z]?|\(|\)|\d+)/g; let t; let lastAdded = null;
  const tokens = body.match(re) || [];
  for (let i = 0; i < tokens.length; i++) {
    t = tokens[i];
    if (t === '(') { stack.push({}); lastAdded = null; }
    else if (t === ')') {
      const grp = stack.pop(); let n = 1;
      if (tokens[i + 1] && /^\d+$/.test(tokens[i + 1])) { n = +tokens[++i]; }
      for (const [k, v] of Object.entries(grp)) stack[stack.length - 1][k] = (stack[stack.length - 1][k] || 0) + v * n;
      lastAdded = null;
    } else if (/^\d+$/.test(t)) { stack[stack.length - 1][lastAdded] += +t - 1; }
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
balanced('rusting 4Fe + 3O2 + 6H2O → 4Fe(OH)3', [[4, 'Fe'], [3, 'O2'], [6, 'H2O']], [[4, 'Fe(OH)3']]);
balanced('rust dehydrates 2Fe(OH)3 → Fe2O3 + 3H2O', [[2, 'Fe(OH)3']], [[1, 'Fe2O3'], [3, 'H2O']]);
balanced('aluminium oxide layer 4Al + 3O2 → 2Al2O3', [[4, 'Al'], [3, 'O2']], [[2, 'Al2O3']]);
balanced('HT iron oxidised Fe → Fe2+ + 2e-', [[1, 'Fe']], [[1, 'Fe2+'], [2, 'e-']]);
balanced('HT zinc oxidised Zn → Zn2+ + 2e-', [[1, 'Zn']], [[1, 'Zn2+'], [2, 'e-']]);
balanced('HT magnesium oxidised Mg → Mg2+ + 2e-', [[1, 'Mg']], [[1, 'Mg2+'], [2, 'e-']]);
balanced('HT oxygen reduced O2 + 2H2O + 4e- → 4OH-', [[1, 'O2'], [2, 'H2O'], [4, 'e-']], [[4, 'OH-']]);
balanced('HT overall 2Fe + O2 + 2H2O → 2Fe2+ + 4OH-', [[2, 'Fe'], [1, 'O2'], [2, 'H2O']], [[2, 'Fe2+'], [4, 'OH-']]);
balanced('R1 Q3 balanced rust equation', [[4, 'Fe'], [3, 'O2'], [6, 'H2O']], [[4, 'Fe(OH)3']]);
// guard: the parser must reject an unbalanced equation
assert.throws(() => balanced('unbalanced test', [[2, 'Fe'], [3, 'O2'], [6, 'H2O']], [[4, 'Fe(OH)3']]));
assert.throws(() => balanced('unbalanced charge', [[1, 'Fe']], [[1, 'Fe2+'], [1, 'e-']]));
balanced('2Zn + O2 → 2ZnO', [[2, 'Zn'], [1, 'O2']], [[2, 'ZnO']]);

// ======================= CALCULATIONS (asserted) =======================
// slide 5: rust mass from iron (illustrative)
calc('nail 5.00 g gains 0.06 g: % increase', 0.06 / 5.00 * 100, 1.2, 1e-9);
calc('QC 2.50 g → 2.53 g % increase', (2.53 - 2.50) / 2.50 * 100, 1.2, 1e-9);
// slide 6 (HT): electrons
calc('3 Fe atoms lose 2e each', 3 * 2, 6);
calc('O2 accepts 4e; Fe atoms per O2', 4 / 2, 2);
// slide 8: paint every 4 years over 12 years
calc('bike repaint 12 ÷ 4', 12 / 4, 3);
calc('railings: paint 30 m × 1.2 m', 30 * 1.2, 36, 1e-9);
calc('railings: tins 36 ÷ 12 m² per tin', 36 / 12, 3, 1e-9);
calc('QC gate 2.0 × 1.5 × 2 sides', 2.0 * 1.5 * 2, 6, 1e-9);
// slide 9: ship hull zinc blocks
calc('zinc blocks 12 × 8 kg', 12 * 8, 96);
calc('zinc used per year 96 ÷ 4', 96 / 4, 24, 1e-9);
calc('QC 60 kg Mg lasts 3 years: per year', 60 / 3, 20, 1e-9);
// slides 11–12: practical — mass gain (mg) of nails after 7 days, nail 5.00 g (illustrative)
const TUBES = [['A', 'tap water', 45], ['B', 'salt water', 90], ['C', 'painted nail', 3], ['D', 'zinc strip', 0], ['E', 'copper strip', 70]];
const DAYS = [0, 1, 2, 3, 4, 5, 6, 7];
const TAP = [0, 6, 12, 19, 25, 32, 38, 45];
const SALT = [0, 12, 25, 38, 51, 64, 77, 90];
for (let i = 1; i < 8; i++) assert(TAP[i] > TAP[i - 1] && SALT[i] > SALT[i - 1], 'mass gain rises each day');
calc('tap day 7 equals table', TAP[7], TUBES[0][2]);
calc('salt day 7 equals table', SALT[7], TUBES[1][2]);
calc('A % mass increase 0.045 / 5.00', 0.045 / 5.00 * 100, 0.9, 1e-9);
const rTap = calc('A rate 45 / 7 mg per day', 45 / 7, 6.428571428571429, 1e-9);
calc('A rate 2 s.f.', sf(rTap, 2), 6.4, 1e-12);
const rSalt = calc('B rate 90 / 7', 90 / 7, 12.857142857142858, 1e-9);
calc('B rate 2 s.f.', sf(rSalt, 2), 13, 1e-12);
calc('B / A factor', 90 / 45, 2, 1e-12);
calc('E / A factor 70 / 45 (2 s.f.)', sf(70 / 45, 2), 1.6, 1e-12);
calc('QC salt mass gain days 2→5', SALT[5] - SALT[2], 39);
// slide 14: LCA energy for a glass bottle (illustrative, MJ)
const BOT = [['Raw materials', 1.2], ['Manufacture', 2.6], ['Transport', 0.7], ['Disposal', 0.5]];
const botTot = calc('glass bottle LCA total', BOT.reduce((a, b) => a + b[1], 0), 5.0, 1e-9);
calc('manufacture share %', 2.6 / botTot * 100, 52, 1e-9);
calc('QC reused 10 times per use', botTot / 10, 0.5, 1e-9);
// slide 15: bags LCA (illustrative MJ per bag)
const STAGES = ['Raw materials', 'Manufacture', 'Transport', 'Disposal'];
const PLA = [0.40, 0.30, 0.05, 0.05], PAP = [0.50, 1.00, 0.20, 0.10];
const pT = calc('plastic bag total MJ', PLA.reduce((a, b) => a + b, 0), 0.80, 1e-9);
const qT = calc('paper bag total MJ', PAP.reduce((a, b) => a + b, 0), 1.80, 1e-9);
calc('paper / plastic', qT / pT, 2.25, 1e-9);
calc('plastic per use (5 uses)', pT / 5, 0.16, 1e-9);
calc('paper per use (1 use)', qT / 1, 1.8, 1e-9);
calc('QC cotton 12 MJ / 100 uses', 12 / 100, 0.12, 1e-9);
// slide 17: household waste
calc('waste 400 kg × 45% recycled', 400 * 0.45, 180, 1e-9);
calc('landfill 400 − 180 − 100', 400 - 180 - 100, 120);
calc('landfill %', 120 / 400 * 100, 30, 1e-9);
calc('QC 25% of 480 kg', 480 * 0.25, 120, 1e-9);
// slide 18: PET bottles → fleece
calc('fleece 500 g ÷ 20 g', 500 / 20, 25, 1e-9);
calc('QC 300 g jumper ÷ 20 g', 300 / 20, 15, 1e-9);
// slide 19: aluminium recycling (illustrative MJ per kg)
const AL_ORE = 170, AL_REC = 8.5;
calc('Al saving per kg', AL_ORE - AL_REC, 161.5, 1e-9);
calc('Al % saving', (AL_ORE - AL_REC) / AL_ORE * 100, 95, 1e-9);
calc('500 cans × 15 g in kg', 500 * 15 / 1000, 7.5, 1e-9);
const alSave = calc('energy saved 7.5 × 161.5', 7.5 * 161.5, 1211.25, 1e-9);
calc('energy saved 2 s.f.', sf(alSave, 2), 1200, 1e-9);
calc('QC steel 20 → 8 MJ/kg saving %', (20 - 8) / 20 * 100, 60, 1e-9);
// recaps, FQ, HW
calc('R3 Q1 5.00 → 5.06 g %', (5.06 - 5.00) / 5.00 * 100, 1.2, 1e-9);
calc('R4 Q2 paper bag 1.8 MJ used 3 times', 1.8 / 3, 0.6, 1e-9);
calc('R4 Q2 plastic 0.8 / 5', 0.8 / 5, 0.16, 1e-9);
calc('R5 Q2 copper 60 → 9 MJ/kg %', (60 - 9) / 60 * 100, 85, 1e-9);
calc('FQ painted 900 + 6 × 40', 900 + 6 * 40, 1140);
calc('FQ galvanised 900 + 150', 900 + 150, 1050);
calc('FQ difference', 1140 - 1050, 90);
calc('HW Q3 steel 20 → 8 % saving', (20 - 8) / 20 * 100, 60, 1e-9);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_chem_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: fill }, line: { color: edge || fill, width: lw } }); }
function oval(s, cx, cy, w, h, fill, edge, o = {}) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: o.rot, fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' },
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
const RUST = ['B5541E', '7A3510'], STEEL = ['B9C0CC', '5A6275'], ZINC = ['D5DBE3', '7D8794'], PAINT = ['3A7BC8', '1F4E8C'], GLASS = 'EEF5FB', WAT = ['CFE4F7', '5B9BD5'], OIL = ['F3D27A', 'B8912A'], CU = ['D9894A', '9A5524'], MG = 'E9ECEF';
// test tube with rounded bottom; top at y, height h, width w; level = fraction filled with liquid
function testTube(s, x, y, w, h, o = {}) {
  const r = w / 2, bodyH = h - r;
  const fillLiquid = (top, col) => { oval(s, x + r, y + h - r, w, w, col, null); box(s, x, top, w, y + h - r - top, col, null); };
  oval(s, x + r, y + h - r, w, w, GLASS, C.ink, { lw: 1.25 });
  box(s, x, y, w, bodyH, GLASS, null);
  if (o.level) {
    const top = y + h - o.level * h;
    fillLiquid(top, o.liquid || WAT[0]);
    if (o.oil) box(s, x, top - o.oil, w, o.oil, OIL[0], null);
  }
  if (o.granules) for (let i = 0; i < 9; i++) ball(s, x + 0.07 + (i % 3) * (w - 0.14) / 2, y + h - 0.1 - Math.floor(i / 3) * 0.09, 0.045, 'FFFFFF', '8A8F99', 0.5);
  if (o.cotton) box(s, x + 0.02, y + h - 0.58, w - 0.04, 0.2, 'F7F7F7', 'B0B0B0', { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 0.5 });
  line(s, x, y, x, y + bodyH + 0.01, C.ink, 1.25); line(s, x + w, y, x + w, y + bodyH + 0.01, C.ink, 1.25);
  if (o.bung) box(s, x - 0.04, y - 0.12, w + 0.08, 0.22, '8C6A4A', '5A4030', { lw: 0.75 });
}
// vertical nail: head at top (cx, y), length len
function nail(s, cx, y, len, o = {}) {
  const col = o.painted ? PAINT : STEEL;
  box(s, cx - 0.09, y, 0.18, 0.05, col[0], col[1], { lw: 0.5 });
  box(s, cx - 0.03, y + 0.05, 0.06, len - 0.15, col[0], col[1], { lw: 0.5 });
  poly(s, [[cx - 0.03, y + len - 0.1], [cx + 0.03, y + len - 0.1], [cx, y + len]], col[0], col[1], { lw: 0.5 });
  if (o.rust) for (let i = 0; i < o.rust; i++) ball(s, cx + (i % 2 ? 0.03 : -0.03), y + 0.2 + i * (len - 0.35) / Math.max(1, o.rust - 1), 0.035, RUST[0], RUST[1], 0.5);
  if (o.wrap) for (let i = 0; i < 3; i++) box(s, cx - 0.06, y + len * 0.35 + i * 0.09, 0.12, 0.05, o.wrap[0], o.wrap[1], { lw: 0.5 });
}
// steel cross-section with coating; scratch at sx (optional)
function section(s, x, y, w, o = {}) {
  box(s, x, y + 0.2, w, 0.55, STEEL[0], STEEL[1], { lw: 1 });
  for (let i = 0; i < Math.floor(w / 0.22); i++) ball(s, x + 0.12 + i * 0.22, y + 0.48, 0.06, 'A5ADBA', '7D8794', 0.5);
  if (o.coat) {
    const c = o.coat;
    if (o.scratch != null) {
      box(s, x, y, o.scratch - x - 0.1, 0.2, c[0], c[1], { lw: 0.75 });
      box(s, o.scratch + 0.1, y, x + w - o.scratch - 0.1, 0.2, c[0], c[1], { lw: 0.75 });
    } else box(s, x, y, w, 0.2, c[0], c[1], { lw: 0.75 });
  }
  if (o.rustAt != null) { oval(s, o.rustAt, y + 0.22, 0.42, 0.22, RUST[0], RUST[1], { lw: 0.75 }); }
}
// water droplet sitting on a surface at (cx, base)
function droplet(s, cx, base, w, h) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: base - h, w, h: 2 * h, fill: { color: WAT[0], transparency: 10 }, line: { color: WAT[1], width: 1 } });
}
// a few polymer chains (C4.2 recap), drawn as zig-zag polylines
function chains(s, x, y, w, h, col = C.blue, n = 4) {
  for (let k = 0; k < n; k++) {
    const pts = []; const yy = y + (k + 0.5) * h / n;
    for (let i = 0; i <= 12; i++) pts.push([x + i * w / 12, yy + (i % 2 ? -0.07 : 0.07) + Math.sin(i * 0.9 + k) * 0.05]);
    poly(s, pts, null, col, { open: true, lw: 1.5 });
  }
}
// bar chart helper on template axes: bars centred on category positions
function bars(s, g, items, col, bwf = 0.42) {
  items.forEach(([xv, yv, c]) => {
    const bw = bwf * (D.px(g, 1) - D.px(g, 0));
    box(s, D.px(g, xv) - bw / 2, D.py(g, yv), bw, D.py(g, g.ymin) - D.py(g, yv), c || col, C.ink, { lw: 0.75 });
  });
}
function stackBar(s, g, xv, vals, cols, bwf = 0.5) {
  const bw = bwf * (D.px(g, 1) - D.px(g, 0));
  let acc = 0;
  vals.forEach((v, i) => { box(s, D.px(g, xv) - bw / 2, D.py(g, acc + v), bw, D.py(g, acc) - D.py(g, acc + v), cols[i], C.ink, { lw: 0.75 }); acc += v; });
}
// equation strip: dark ink, Georgia
function eqn(s, x, y, w, t, o = {}) {
  box(s, x, y, w, o.h || 0.42, o.fill || C.white, o.edge || C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  label(s, x + 0.08, y, w - 0.16, t, { size: o.size || 12, h: o.h || 0.42, color: C.ink, bold: true });
}
const STAGECOL = ['8E7CC3', '6A3FA0', 'E39A2F', '7D8794'];

// ======================= 1 COVER =======================
{
  const s = D.coverSlide({
    bigTitle: 'End of life',
    footer: 'OCR J260 Combined Science B • C4.4 what happens to products at the end of their useful life • teacher deck • mark schemes in the notes',
    rows: [
      { icon: '§', text: `Specification ${DECK.specRange} • corrosion, life-cycle assessment, reuse, recycling, disposal` },
      { icon: 'H', text: 'Higher & Foundation in one deck • electron-transfer explanations of corrosion marked HT' },
      { icon: '▲', text: 'Suggested practical: corrosion prevention • LCA data • recycling energy savings' },
    ],
    notes: 'C4.4 What happens to products at the end of their useful life? is Part 4 of 4 in J260 Chapter C4 Material choices (C4.1 choosing materials with data; C4.2 bonding and structure; C4.3 nanoparticles; C4.4 end of life). It is the LAST C4 deck; Chapter C5 Chemical analysis follows.\nNumbering: in J258 (Chemistry B, separate science) this sub-topic is C4.5, because J258 has an extra C4.2 "What are the different types of polymers?" that is separate-science only. Evidence: OCR J260 Advance Information (June 2022) lists "Section C4.4 What happens to products at the end of their useful life?"; docbrown combined page says "Topic C4.4 considers the life cycle of materials" (separate page: C4.5). See SPEC_C4_4.md.\nStatement wording is taken from J258 C4.5 search extracts and renumbered. C4.4.1 (corrosion) and C4.4.4 (LCA principles) are the most certain; see SPEC for the rest.',
  });
  // deck-specific fix: the full title is long, so the cover subtitle is set to 15 pt (the template is not edited)
  const sub = s._slideObjects.find(o => o._type === 'text' && JSON.stringify(o.text).includes('end of their useful life?') && o.options && o.options.fontSize === 18);
  assert(sub, 'cover subtitle object found');
  Object.assign(sub.options, { fontSize: 15, y: 2.55, h: 0.66, w: 7.3, valign: 'top' });
  sub.options._bodyProp && Object.assign(sub.options._bodyProp, { anchor: 't' });
  reg(s, 'Title');
}

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'C4.4.1', text: 'Describe the **conditions** that cause **corrosion** (rusting) and the **process** of corrosion.' },
  { code: 'C4.4.1', text: 'Explain corrosion as **oxidation**: metal atoms **lose electrons**; write **half equations**.', ht: true },
  { code: 'C4.4.1', text: 'Explain how a **physical barrier** to oxygen and water and **sacrificial protection** prevent corrosion.' },
  { code: 'C4.4.1', text: 'Plan and analyse a **practical** comparing ways to prevent rusting.' },
  { code: 'C4.4.4', text: 'Describe the **principles** of a **life-cycle assessment (LCA)**: energy, water and impacts at each stage.' },
  { code: 'C4.4.5', text: '**Interpret LCA data** and calculate energy per use.' },
  { code: 'C4.4.6', text: 'Describe how a material is **recycled for a different use** and explain why it is **viable**.' },
  { code: 'C4.4.7', text: '**Evaluate** factors that affect decisions on **recycling**, **reuse**, incineration and landfill.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'Statements (J258 C4.5 wording from search extracts, renumbered for J260 C4.4; see SPEC_C4_4.md for confidence):\nC4.4.1 describe the conditions which cause corrosion and the process of corrosion, and explain how mitigation is achieved by creating a physical barrier to oxygen and water and by sacrificial protection (wording seen in two sources as J258 C4.5.1)\nC4.4.2–C4.4.3: wording NOT found in any reachable source. The deck covers the likely content (corrosion as oxidation, extending useful life, the suggested corrosion practical) under C4.4.1 rather than inventing codes.\nC4.4.4 describe the basic principles in carrying out a life-cycle assessment of a material or product, including the use of water, energy and environmental impact at each stage (combined code C4.4.4 seen in a search extract)\nC4.4.5 interpret data from a life-cycle assessment of a material or product\nC4.4.6 describe a process where a material or product is recycled for a different use, and explain why this is viable (J258 wording; code inferred)\nC4.4.7 evaluate factors that affect decisions on recycling (J258 C4.5.7)\nHT: the electron-transfer (half equation) explanation is marked HT because electron-transfer redox is Higher tier elsewhere in OCR B; UNVERIFIED as an HT statement in C4.4. Teach the "loses electrons" idea to all if your copy has no bold.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter C4 Material choices • C4.4 is Part 4 of 4 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['C4.4.1', 'Corrosion: what rusting needs; oxidation', 'Both tiers', C.blue],
    ['C4.4.1', 'Electron transfer and half equations', 'HT', C.red],
    ['C4.4.1', 'Barrier and sacrificial protection', 'Both tiers', C.blue],
    ['Practical', 'Comparing ways to prevent rusting', 'Practical', C.orange],
    ['C4.4.4–5', 'Life-cycle assessment and LCA data', 'Both tiers', C.blue],
    ['C4.4.6–7', 'Reuse, recycling, incineration, landfill', 'Both tiers', C.blue],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'C4.4\nEnd of useful life', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: C3 reactivity series, oxidation, extraction of metals • C1 combustion • C4.1–C4.3 materials', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter C4 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'C4.1 How is data used to choose a material for a particular use?',
      'C4.2 How do bonding and structure affect properties of materials?',
      'C4.3 Why are nanoparticles so useful?',
      '**C4.4 What happens to products at the end of their useful life?** (this deck)',
      'J258 (separate) has an extra polymers sub-topic, so this is **C4.5** there.',
      'C4.4 is the **last** C4 deck; **C5 Chemical analysis** follows.',
    ], { size: 11, color: 'E9E0F7', space: 2 }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.25, 5.53, 2.6, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Slides with the red **HT** pill (electron transfer, half equations) are for Higher tier only.',
      'Ideas about Science: **benefits**, **risks**, **sustainability** and **decisions**; data can be **uncertain**.',
      'Maths: **percentage change**, **rates**, totals and **per use** values, reading and plotting **graphs**.',
    ], { size: 11 }),
  ], { x: 7.55, y: 4.35, w: 5.15, h: 2.4, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter C4 has four sub-topics (OCR J260 Advance Information June 2022 lists C4.4 "What happens to products at the end of their useful life?"; SPEC_C4_1.md reached the same list independently). J258 Chemistry B has five: C4.2 "What are the different types of polymers?" is separate science only, so the later sub-topics are renumbered down by one.\nOverlap control: properties data and choosing materials are C4.1; bonding, polymer structure and thermosoftening are C4.2; nanoparticles are C4.3. They are recapped only (starter; slide 18 polymer chains). The reactivity series, oxidation and metal extraction are C3 (recap only on slides 6 and 9).');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'C3 • reactivity', q: 'Put these metals in order of **reactivity**, most reactive first: **iron, magnesium, copper, zinc**.' },
  { from: 'C3 • oxidation', q: 'Define **oxidation** in terms of oxygen. Name the product when **magnesium** burns in air.' },
  { from: 'C1 • air', q: 'What percentage of dry air is **oxygen**? Name **one** gas made when fossil fuels burn.' },
  { from: 'C4.1 • data', q: 'Give **two** properties you would check in a data table when choosing a metal for a **bridge**.' },
  { from: 'C4.2 • polymers', q: 'Why does a **thermosoftening** polymer melt when heated but a **thermosetting** one does not?' },
  { from: 'C4.3 • nanoparticles', q: 'Why are nanoparticles good **catalysts**? (A cube of side **2 nm**: surface area?)' },
], { subtitle: 'Recall from C1, C3 and C4.1–C4.3 • 6 minutes • no notes', notes: 'ANSWERS\n1. Magnesium > zinc > iron > copper (C3 reactivity series).\n2. Oxidation = gain of oxygen (also loss of electrons, HT). Magnesium oxide, MgO.\n3. About 21% (20.9%). Carbon dioxide, water vapour, carbon monoxide, soot (particulates), sulfur dioxide, nitrogen oxides (C1).\n4. Any two: strength (tensile / compressive), stiffness, density, cost, resistance to corrosion, hardness (C4.1).\n5. Thermosoftening: separate chains held by weak intermolecular forces that are overcome by heating, so chains slide / it melts. Thermosetting: strong covalent cross-links between chains, which do not break on heating (C4.2; recap only).\n6. Very large surface area to volume ratio, so more particles exposed to react (C4.3). 6 faces × 2 × 2 = 24 nm².' }), 'Retrieval starter');
calc('starter cube 6 × 2 × 2 nm²', 6 * 2 * 2, 24);

// ======================= 5 CORROSION: WHAT RUSTING NEEDS =======================
reg(D.contentSlide({
  title: 'Corrosion: what rusting needs',
  subtitle: `Specification ${sp('C4.4.1')} • the conditions that cause corrosion and the process`,
  tag: 'C4.4.1', caption: 'three iron nails after one week; not to scale',
  draw: (s) => {
    const tubes = [
      [1.0, 'A', '**air + water**', { level: 0.45 }, 6],
      [2.95, 'B', '**boiled water + oil**\n(no air)', { level: 0.55, oil: 0.12, bung: true }, 0],
      [4.9, 'C', '**dry air**\n(drying agent)', { granules: true, cotton: true, bung: true, short: true }, 0],
    ];
    tubes.forEach(([x, L, t, o, r]) => {
      testTube(s, x, 1.85, 0.62, 2.6, o);
      nail(s, x + 0.31, 2.2, o.short ? 1.65 : 1.95, { rust: r });
      label(s, x - 0.25, 1.45, 1.1, `**${L}**`, { size: 13, color: C.blue, h: 0.3 });
      label(s, x - 0.5, 4.55, 1.6, t, { size: 10.5, h: 0.55, valign: 'top' });
      pbox(s, x - 0.35, 5.15, 1.32, 0.34, r ? 'rusts' : 'no rust', r ? 'F6DCCB' : 'D8F0E2', r ? RUST[0] : C.green, { size: 10.5, bold: true, lw: 0.75 });
    });
    label(s, 1.62, 3.0, 0.9, 'rust', { size: 10, bold: true, color: RUST[1], align: 'left' });
    label(s, 3.62, 2.0, 0.9, 'oil layer', { size: 10, bold: true, color: OIL[1], align: 'left' });
    label(s, 5.57, 3.62, 0.95, 'cotton wool', { size: 10, bold: true, color: C.grey, align: 'left', h: 0.22 });
    label(s, 5.57, 4.05, 0.95, 'calcium chloride', { size: 10, bold: true, color: C.grey, align: 'left', h: 0.4 });
    label(s, 0.6, 5.62, 5.8, 'Only A rusts: iron needs **both** oxygen **and** water', { size: 11, color: C.ink, h: 0.3 });
  },
  head: 'Corrosion',
  lines: [
    '**Corrosion**: a metal reacts with substances around it (oxygen, water) and is slowly **oxidised**.',
    '**Rusting** is the corrosion of **iron** and steel. It needs **oxygen** (air) **and** **water**.',
    '**Salt** water and **acid** rain make iron rust **faster**.',
    'Rust is **hydrated iron(III) oxide**. It is weak and **flakes off**, so fresh iron is exposed and rusting continues.',
    'iron + oxygen + water → hydrated iron(III) oxide',
    { t: '4Fe(s) + 3O₂(g) + 6H₂O(l) → 4Fe(OH)₃(s)', b: true, color: C.blue, nob: true },
  ],
  size: 12,
  worked: { head: 'Worked example: mass gain', q: 'A 5.00 g nail weighs 5.06 g after rusting.',
    steps: [['Gain', '5.06 − 5.00 = 0.06 g (oxygen and water added)'], ['Answer', '0.06 ÷ 5.00 × 100 = **1.2%** increase']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why does tube **B** use **boiled** water and a layer of **oil**? A 2.50 g nail weighs 2.53 g after a week: what is the % increase?',
  notes: 'QUICK CHECK ANSWER: Boiling removes dissolved air (oxygen); the oil layer stops air dissolving back in. So the nail has water but no oxygen. (2.53 − 2.50) ÷ 2.50 × 100 = 1.2%.\nThe mass increases because the oxygen and water atoms are added to the iron (link to conservation of mass, C1/C3). Rust Fe(OH)₃ loses water to give hydrated iron(III) oxide, Fe₂O₃·xH₂O; both equations are atom-balanced in node. Aluminium corrodes too but forms a thin, tough Al₂O₃ layer that sticks and protects it (4Al(s) + 3O₂(g) → 2Al₂O₃(s)). Calcium chloride (anhydrous) is the drying agent: CLEAPSS hazard IRRITANT, causes serious eye irritation.',
}), 'C4.4.1 Corrosion: what rusting needs');

// ======================= 6 CORROSION AS OXIDATION (HT) =======================
{
  const s = D.contentHeader('Corrosion as electron loss', `Specification ${sp('C4.4.1')} • the process of corrosion: iron atoms are oxidised`, { ht: true, tag: 'C4.4.1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'a water drop on iron; ions and electrons not to scale');
  // water drop first, so the iron lattice covers its lower half (drop sits on the surface at y = 4.1)
  droplet(s, 3.5, 4.1, 3.7, 1.05);
  box(s, 0.75, 4.1, 5.5, 1.1, 'E6E9EE', STEEL[1], { lw: 1 });
  for (let r = 0; r < 3; r++) for (let k = 0; k < 15; k++) ball(s, 0.95 + k * 0.365, 4.3 + r * 0.33, 0.14, STEEL[0], STEEL[1]);
  label(s, 0.75, 5.25, 5.5, '**iron** (giant metallic lattice): electrons flow through the metal', { size: 10.5, h: 0.25 });
  label(s, 2.5, 3.1, 2.0, 'water drop', { size: 10.5, bold: true, color: WAT[1], h: 0.22 });
  // Fe2+ leaving the centre into the drop
  ball(s, 3.5, 3.68, 0.18, 'F2B279', 'A4561C');
  label(s, 3.2, 3.54, 0.6, '**Fe²⁺**', { size: 10, h: 0.28 });
  arrow(s, 3.5, 4.12, 3.5, 3.88, 'A4561C', 1.5);
  label(s, 2.3, 3.32, 2.4, 'centre: Fe loses electrons', { size: 10, color: 'A4561C', bold: true, h: 0.22 });
  // electrons moving through the metal (top row) to the edges of the drop
  [[2.1, 4.3], [2.5, 4.3], [4.5, 4.3], [4.9, 4.3]].forEach(([x, y]) => ball(s, x, y, 0.075, 'F5D547', 'B8912A'));
  arrow(s, 3.25, 4.3, 2.65, 4.3, 'B8912A', 1.75); arrow(s, 3.75, 4.3, 4.35, 4.3, 'B8912A', 1.75);
  label(s, 2.05, 3.9, 0.6, '← **e⁻**', { size: 10.5, h: 0.2, color: 'B8912A' }); label(s, 4.35, 3.9, 0.6, '**e⁻** →', { size: 10.5, h: 0.2, color: 'B8912A' });
  // oxygen arrives at the edges of the drop
  arrow(s, 1.75, 3.45, 1.95, 3.95, C.blue, 1.5); arrow(s, 5.25, 3.45, 5.05, 3.95, C.blue, 1.5);
  label(s, 0.6, 2.95, 1.7, 'edge: O₂ from air\ngains electrons', { size: 10, color: C.blue, bold: true, h: 0.45 });
  label(s, 4.7, 2.95, 1.7, 'edge: O₂ from air\ngains electrons', { size: 10, color: C.blue, bold: true, h: 0.45 });
  // equations
  eqn(s, 0.75, 1.5, 5.5, 'Fe(s) → Fe²⁺(aq) + 2e⁻      oxidation (loss of electrons)', { size: 11.5, h: 0.4 });
  eqn(s, 0.75, 1.98, 5.5, 'O₂(g) + 2H₂O(l) + 4e⁻ → 4OH⁻(aq)      reduction (gain)', { size: 11.5, h: 0.4 });
  label(s, 0.75, 2.42, 5.5, 'Fe²⁺ + OH⁻ → iron hydroxide → (more O₂) → **rust**', { size: 10.5, h: 0.28, color: RUST[1] });
  D.card(s, 6.8, 1.3, 6.08, 2.85, 'Oxidation and reduction', [
    '**Oxidation** is **loss of electrons** (and gain of oxygen). **Reduction** is **gain of electrons**.',
    'In rusting, **iron atoms** lose 2 electrons to become **Fe²⁺ ions**: iron is **oxidised**.',
    'The electrons flow through the metal to where **oxygen** and **water** meet: oxygen is **reduced** to hydroxide ions.',
    'Water is needed as the **electrolyte**: ions move through it. Salt water has **more ions**, so rusting is faster.',
  ], { size: 11 });
  D.workedSteps(s, 6.8, 4.3, 6.08, 1.95, 'Worked example: counting electrons', 'How many iron atoms must be oxidised to reduce one O₂ molecule?', [
    ['O₂ needs', 'O₂ + 2H₂O + 4e⁻ → 4OH⁻: **4 electrons**'], ['Each Fe gives', 'Fe → Fe²⁺ + 2e⁻: 2 electrons'], ['Answer', '4 ÷ 2 = **2 iron atoms** per O₂ molecule']], { size: 10.5 });
  D.quickCheck(s, 'Write the half equation for **zinc** being oxidised. Explain why it is called **oxidation**.');
  D.notes(s, 'QUICK CHECK ANSWER: Zn(s) → Zn²⁺(aq) + 2e⁻ (accept Zn → Zn²⁺ + 2e⁻). Zinc atoms lose electrons; loss of electrons is oxidation ("OIL RIG").\nAll half equations atom- and charge-balanced in node; overall 2Fe + O₂ + 2H₂O → 2Fe²⁺ + 4OH⁻ also checked. HT status UNVERIFIED for C4.4: OCR B treats electron-transfer redox as Higher in C3; if your copy shows this in normal type, teach it to all. Foundation students need only: rusting is oxidation; iron needs oxygen and water; salt speeds it up.\nGRADE 7–9 STRETCH: the electrochemical picture (anode in the drop centre, cathode at the edge) explains why pits form under a drop and rust forms at the edge.');
  reg(s, 'C4.4.1 Corrosion as electron loss (HT)');
}

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, `Specification ${sp('C4.4.1')} • the conditions and process of corrosion`, [
  { q: 'Name the **two** substances that must be present for iron to rust.', marks: 2, ms: 'Oxygen / air (1); water (1).' },
  { q: 'A nail in boiled water with a layer of oil on top does **not** rust. Explain why.', marks: 2, ms: 'Boiling removes dissolved oxygen / air (1); oil stops air / oxygen dissolving back into the water (1).' },
  { q: 'Balance the equation: (…) Fe(s) + (…) O₂(g) + (…) H₂O(l) → (…) Fe(OH)₃(s)', marks: 2, ms: '4Fe + 3O₂ + 6H₂O → 4Fe(OH)₃: all four correct (2); three correct coefficients / correct ratio for Fe and Fe(OH)₃ (1).' },
  { q: 'Iron changes to Fe²⁺ ions when it rusts. Write the half equation and explain why this is **oxidation**.', marks: 2, ht: true, ms: 'Fe → Fe²⁺ + 2e⁻ (1); iron (atoms) lose electrons, and loss of electrons is oxidation (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 BARRIER METHODS =======================
reg(D.contentSlide({
  title: 'Preventing corrosion: barriers',
  subtitle: `Specification ${sp('C4.4.1')} • mitigation by a physical barrier to oxygen and water`,
  tag: 'C4.4.1', caption: 'steel in cross-section; coating thickness exaggerated',
  draw: (s) => {
    label(s, 0.7, 1.45, 5.6, '**1** Painted steel: the paint keeps out air and water', { size: 10.5, align: 'left' });
    section(s, 0.9, 2.05, 5.2, { coat: PAINT });
    label(s, 5.2, 1.78, 0.9, 'paint', { size: 10, bold: true, color: PAINT[1], align: 'right', h: 0.22 });
    [1.4, 2.6, 3.8].forEach(x => { arrow(s, x, 1.76, x, 2.02, WAT[1], 1.25); });
    label(s, 0.95, 2.85, 3, 'O₂ and H₂O blocked', { size: 10, italic: true, color: WAT[1], align: 'left', h: 0.22 });
    label(s, 0.7, 3.12, 5.6, '**2** Scratched paint: air and water reach the steel, which rusts', { size: 10.5, align: 'left' });
    section(s, 0.9, 3.72, 5.2, { coat: PAINT, scratch: 3.5, rustAt: 3.5 });
    arrow(s, 3.5, 3.45, 3.5, 3.82, WAT[1], 1.5);
    label(s, 3.65, 3.45, 2.2, 'rust spreads under paint', { size: 10, bold: true, color: RUST[1], align: 'left', h: 0.22 });
    // examples row
    const ex = [['Paint', 'cars, bridges, gates', PAINT[0]], ['Oil / grease', 'bike chains, tools', OIL[0]], ['Plastic', 'wire fences, dish racks', '5FB37A'], ['Tin plating', 'food cans', ZINC[0]]];
    ex.forEach(([h, t, c], i) => {
      const x = 0.7 + i * 1.42;
      box(s, x, 4.65, 1.32, 1.0, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
      box(s, x + 0.1, 4.75, 1.12, 0.14, c, C.ink, { lw: 0.5 });
      label(s, x + 0.03, 4.92, 1.26, `**${h}**`, { size: 10.5, h: 0.26 });
      label(s, x + 0.03, 5.18, 1.26, t, { size: 10, italic: true, color: C.grey, h: 0.45, valign: 'top' });
    });
  },
  head: 'Barrier methods',
  lines: [
    'A **barrier** coats the metal so **oxygen** and **water** cannot reach its surface.',
    '**Paint**: cheap, covers large areas; must be renewed. **Oil or grease**: for moving parts that paint would crack on.',
    '**Plastic coating**: tough, waterproof. **Electroplating** with tin or chromium: thin metal layer, attractive.',
    'If the barrier is **scratched** or worn, the iron underneath is exposed and **rusts**.',
    'Barriers **extend the useful life** of a product, which improves its **life-cycle assessment**.',
  ],
  size: 11,
  worked: { head: 'Worked example: paint needed', q: 'A railing is 30 m long and 1.2 m high. One tin of paint covers 12 m².',
    steps: [['Area', '30 × 1.2 = 36 m²'], ['Answer', '36 ÷ 12 = **3 tins** for one coat']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why is a bicycle **chain** oiled rather than painted? A gate is **2.0 m × 1.5 m**: what area is painted on **both** sides?',
  notes: 'QUICK CHECK ANSWER: The chain links move against each other, so paint would crack and flake off; oil keeps a flexible barrier that also lubricates. 2.0 × 1.5 × 2 = 6.0 m².\nTin plating is a barrier, NOT sacrificial: tin is LESS reactive than iron, so once scratched the iron rusts even faster than bare iron (HW Q2). Calculations asserted in node.',
}), 'C4.4.1 Barrier methods');

// ======================= 9 SACRIFICIAL PROTECTION =======================
reg(D.contentSlide({
  title: 'Preventing corrosion: sacrificial metals',
  subtitle: `Specification ${sp('C4.4.1')} • mitigation by sacrificial protection with a more reactive metal`,
  tag: 'C4.4.1', caption: 'galvanised steel (top); ship hull with zinc blocks (bottom); not to scale',
  draw: (s) => {
    label(s, 0.7, 1.45, 3.9, '**Galvanised** steel, scratched', { size: 10.5, align: 'left' });
    section(s, 0.9, 2.1, 3.6, { coat: ZINC, scratch: 2.7 });
    label(s, 3.3, 1.82, 1.2, 'zinc layer', { size: 10, bold: true, color: ZINC[1], align: 'right', h: 0.22 });
    arrow(s, 2.7, 1.78, 2.7, 2.18, WAT[1], 1.5);
    label(s, 1.3, 1.82, 1.3, 'O₂ and H₂O', { size: 10, italic: true, color: WAT[1], align: 'right', h: 0.22 });
    [2.5, 2.9].forEach(x => ball(s, x, 2.1, 0.07, 'F4F4F4', '9AA3B0'));
    label(s, 0.7, 2.92, 3.9, 'Zinc next to the scratch corrodes **instead of** the iron: no rust', { size: 10, italic: true, color: C.green, align: 'left', h: 0.4, valign: 'top' });
    // reactivity bar
    const R = [['Mg', MG], ['Al', 'E3E6EA'], ['Zn', ZINC[0]], ['Fe', STEEL[0]], ['Sn', 'C9CDD3'], ['Cu', CU[0]]];
    label(s, 4.75, 1.4, 1.7, '**Reactivity** (C3)', { size: 10.5, h: 0.25 });
    R.forEach(([m, c], i) => { pbox(s, 5.05, 1.68 + i * 0.36, 1.1, 0.3, `**${m}**`, c, m === 'Fe' ? RUST[0] : C.ink, { size: 10.5, lw: m === 'Fe' ? 2 : 0.75 }); });
    arrow(s, 4.85, 3.75, 4.85, 1.75, C.blue, 2);
    label(s, 4.3, 3.82, 1.95, 'more reactive at top', { size: 10, italic: true, color: C.blue, h: 0.22 });
    // ship hull
    poly(s, [[0.8, 3.95], [4.4, 3.95], [4.0, 4.85], [1.2, 4.85]], '7D8794', '4A5568', { lw: 1.25 });
    box(s, 0.6, 4.35, 5.3, 1.1, WAT[0], null, { tr: 35 });
    line(s, 0.6, 4.35, 5.9, 4.35, WAT[1], 1.25);
    [1.7, 2.6, 3.5].forEach(x => box(s, x - 0.17, 4.7, 0.34, 0.16, ZINC[0], ZINC[1], { lw: 1 }));
    label(s, 4.15, 4.55, 1.75, 'zinc blocks on the hull, replaced when used up', { size: 10, bold: true, color: ZINC[1], h: 0.6, align: 'left', valign: 'top' });
    label(s, 0.8, 3.65, 3.6, 'steel ship in salt water', { size: 10, italic: true, color: C.grey, h: 0.25 });
  },
  head: 'Sacrificial protection',
  lines: [
    'Attach or coat iron with a **more reactive** metal, e.g. **zinc** or **magnesium**.',
    'The more reactive metal **corrodes instead of** the iron: it is **sacrificed**.',
    '**Galvanising** = coating steel with zinc. Zinc is also a **barrier**, and still protects if **scratched**.',
    'Uses: galvanised buckets, car bodies, fences; zinc or magnesium blocks on **ships**, **oil rigs** and **pipes**.',
    '!!HT!! Zinc **loses electrons** more easily than iron: Zn → Zn²⁺ + 2e⁻, so the iron is not oxidised.',
  ],
  size: 11,
  worked: { head: 'Worked example: replacing zinc blocks', q: 'A ship carries 12 zinc blocks of 8 kg. They are used up in 4 years.',
    steps: [['Total zinc', '12 × 8 = 96 kg'], ['Answer', '96 ÷ 4 = **24 kg** of zinc corroded per year']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why would **copper** blocks **not** protect a steel hull? A pipeline uses **60 kg** of magnesium in **3** years: how much per year?',
  notes: 'QUICK CHECK ANSWER: Copper is LESS reactive than iron, so the iron would corrode instead (in fact faster); a sacrificial metal must be MORE reactive than iron. 60 ÷ 3 = 20 kg per year.\nThe reactivity order Mg > Al > Zn > Fe > Sn > Cu is C3 recap. Aluminium is not used as a sacrificial coating at GCSE because its oxide layer makes it behave as if unreactive. HT line: half equation balanced in node; Foundation students need "zinc is more reactive, so it reacts / corrodes instead of the iron". Calculations asserted.',
}), 'C4.4.1 Sacrificial protection');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, `Specification ${sp('C4.4.1')} • barrier and sacrificial protection`, [
  { q: 'Give **two** barrier methods used to stop iron rusting.', marks: 2, ms: 'Any two (1 each): painting; oiling / greasing; plastic coating; electroplating / tin plating / chromium plating; galvanising (zinc coating) as a barrier.' },
  { q: 'A galvanised steel bucket is scratched but does not rust. Explain why.', marks: 2, ms: 'Zinc is more reactive than iron (1); so zinc corrodes / is oxidised instead of the iron (sacrificial protection) (1).' },
  { q: 'Explain why **copper** cannot be used for sacrificial protection of iron.', marks: 2, ms: 'Copper is less reactive than iron (1); so the iron would corrode / be oxidised instead of the copper (1).' },
  { q: 'Explain, in terms of **electrons**, how magnesium blocks protect a steel pipe.', marks: 2, ht: true, ms: 'Magnesium loses electrons more readily / is oxidised in preference to iron: Mg → Mg²⁺ + 2e⁻ (1); so iron atoms do not lose electrons / are not oxidised (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 PRACTICAL: METHOD =======================
reg(D.contentSlide({
  title: 'Practical: preventing rusting',
  subtitle: `Specification ${sp('C4.4.1')} • suggested practical: compare the effectiveness of barrier and sacrificial methods`,
  tag: 'Practical', pag: 'SUGGESTED PRACTICAL', caption: 'five boiling tubes in a rack, left for 7 days; balance reads to 0.001 g',
  draw: (s) => {
    // rack
    box(s, 0.7, 4.1, 4.4, 0.22, C.wood, '8A5A2B', { lw: 1 });
    box(s, 0.75, 4.32, 0.15, 0.6, C.wood, '8A5A2B'); box(s, 4.9, 4.32, 0.15, 0.6, C.wood, '8A5A2B');
    const T5 = [['A', 'tap water', {}, WAT[0]], ['B', 'salt water', {}, 'B9D3EC'], ['C', 'painted', { painted: true }, WAT[0]], ['D', 'zinc strip', { wrap: ZINC }, WAT[0]], ['E', 'copper strip', { wrap: CU }, WAT[0]]];
    T5.forEach(([L, t, no, liq], i) => {
      const x = 0.95 + i * 0.83;
      testTube(s, x, 1.95, 0.5, 2.55, { level: 0.6, liquid: liq });
      nail(s, x + 0.25, 2.3, 1.95, no);
      label(s, x - 0.1, 1.55, 0.7, `**${L}**`, { size: 12.5, color: C.blue, h: 0.3 });
      label(s, x - 0.2, 4.95, 0.9, t, { size: 10, h: 0.42, valign: 'top' });
    });
    // balance
    box(s, 5.2, 3.95, 1.15, 0.55, 'E8EBF0', '4A5568', { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    box(s, 5.3, 4.08, 0.95, 0.28, '1F2A3A', null);
    label(s, 5.3, 4.08, 0.95, '5.045 g', { size: 10.5, bold: true, color: '7CFC9A', h: 0.28 });
    box(s, 5.35, 3.8, 0.85, 0.12, '9AA3B0', '4A5568', { lw: 0.75 });
    label(s, 5.1, 4.55, 1.35, 'balance', { size: 10, italic: true, color: C.grey, h: 0.22 });
    label(s, 0.7, 5.45, 5.7, 'Same nail type, same volume of water, same place, same time', { size: 10.5, color: C.ink, bold: true, h: 0.3 });
  },
  head: 'Method',
  lines: [
    '**Clean** five iron nails with emery paper. Weigh each nail (to 0.001 g).',
    'Treat them: **A** untreated, **B** untreated in salt water, **C** painted, **D** wrapped with **zinc**, **E** wrapped with **copper**.',
    'Add the same volume of water to each tube. Leave for **7 days**.',
    'Remove, dry carefully **without** knocking off rust, and reweigh. **Mass gain** = mass of oxygen and water added.',
    '**IV**: protection method. **DV**: mass gain / mg. **Control**: nail size, volume, temperature, time.',
    '**Safety**: eye protection; salt solution low hazard; wash hands; nails are sharp.',
  ],
  size: 11.5,
  worked: { head: 'Worked example: % mass increase', q: 'Nail A: 5.000 g → 5.045 g.',
    steps: [['Gain', '5.045 − 5.000 = 0.045 g = 45 mg'], ['Answer', '0.045 ÷ 5.000 × 100 = **0.90%**']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why are the nails cleaned with emery paper first? Why must the balance read to **0.001 g**, not 0.1 g?',
  notes: 'QUICK CHECK ANSWER: To remove any grease, coating or existing rust so that all nails start the same (fair test). The mass changes are only a few mg (0.003–0.090 g), so a 0.1 g balance would read no change: resolution too low.\nSuggested practical: sources list "investigating the effectiveness of corrosion prevention (barrier and sacrificial protection methods)" as a suggested activity for this topic; a PAG code is NOT confirmed for J260 (the OCR B chemistry PAG list was not reachable), so it is labelled SUGGESTED PRACTICAL. Tube C painted nail = barrier; D zinc = sacrificial; E copper = less reactive metal (shows the opposite effect).\nCLEAPSS-style hazards: sodium chloride solution (low hazard); if anhydrous calcium chloride is used for a dry tube, IRRITANT, causes serious eye irritation; wear eye protection. Alternative indicator: rust indicator / potassium hexacyanoferrate(III) in agar turns blue where Fe²⁺ forms (low hazard at the concentrations used; teacher prepares).',
}), 'Practical: preventing rusting (method)');

// ======================= 12 PRACTICAL: RESULTS =======================
{
  const s = D.contentHeader('Practical: results and analysis', `Specification ${sp('C4.4.1')} • tables, graphs, rates and errors`, { pag: 'SUGGESTED PRACTICAL', tag: 'Practical' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'graph plotted to scale from the daily readings (illustrative data)');
  const g = { x: 1.45, y: 1.55, w: 5.3, h: 2.9, xmin: 0, xmax: 7, ymin: 0, ymax: 100, xstep: 1, ystep: 20, minor: 2, xlabel: 'Time / days', ylabel: 'Mass gain / mg' };
  D.axes(s, g);
  const pA = DAYS.map((d, i) => [d, TAP[i]]), pB = DAYS.map((d, i) => [d, SALT[i]]);
  D.plotLine(s, g, [[0, 0], [7, 45]], WAT[1], 2); D.points(s, g, pA, C.ink);
  D.plotLine(s, g, [[0, 0], [7, 90]], RUST[0], 2); D.points(s, g, pB, C.ink);
  label(s, D.px(g, 4.6), D.py(g, 80), 1.6, '**B** salt water', { size: 10.5, color: RUST[1], align: 'left', h: 0.22 });
  label(s, D.px(g, 5.0), D.py(g, 22), 1.6, '**A** tap water', { size: 10.5, color: WAT[1], align: 'left', h: 0.22 });
  const rows = [[HDR('Tube'), ...TUBES.map(t => HDR(t[0]))], [tcell('Method', 0, { bold: true }), ...TUBES.map(t => tcell(t[1], 0))], [tcell('Gain / mg', 1, { bold: true }), ...TUBES.map(t => tcell(String(t[2]), 1))]];
  s.addTable(rows, { x: 0.7, y: 4.98, w: 6.1, colW: [1.1, 1, 1, 1, 1, 1], rowH: 0.21, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.workedSteps(s, 7.3, 1.3, 5.58, 1.6, 'Worked example: rate of rusting', 'Use the 7-day values.', [
    ['A', `45 ÷ 7 = ${fmt(sf(rTap, 2))} mg per day`], ['B', `90 ÷ 7 = ${fmt(sf(rSalt, 2))} mg per day`],
    ['Answer', 'salt water rusts the nail **2.0 times** as fast']], { size: 10.5 });
  D.card(s, 7.3, 3.05, 5.58, 3.2, 'Conclusion and errors', [
    '**D** (zinc) best: 0 mg, zinc corrodes instead. **C** (paint) 3 mg: barrier works until chipped.',
    '**E** (copper) 70 mg, **more** than A: a less reactive metal makes iron rust **faster**.',
    '**Errors**: rust flakes fall off (gain too low); nail still wet (too high); nails differ → use one batch.',
    '**Improve**: 3 nails per tube and find a **mean**; spot anomalies; keep tubes at the same temperature.',
  ], { size: 11.5 });
  D.quickCheck(s, 'Use the graph: how much mass did nail **B** gain between day **2** and day **5**? Explain why tube **E** gained **more** mass than tube **A**.');
  D.notes(s, `QUICK CHECK ANSWER: Day 2 = 25 mg, day 5 = 64 mg: 64 − 25 = 39 mg (accept 38–40 from the graph). Copper is less reactive than iron, so the iron is oxidised in preference (it acts as the sacrificial metal); the iron corrodes faster than on its own.\nAll values illustrative; asserted in node: daily readings rise each day; day-7 values match the table; rates 45 ÷ 7 = ${fmt(rTap)} → 6.4 and 90 ÷ 7 = ${fmt(rSalt)} → 13 mg per day; B ÷ A = 2.0; E ÷ A = 1.6 (2 s.f.). The lines are lines of best fit through the origin (straight: constant rate over one week).`);
  reg(s, 'Practical: results and analysis');
}

// ======================= 13 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('C4.4.1')} • the corrosion practical`, [
  { q: 'A nail of mass **5.00 g** has a mass of **5.06 g** after one week. Calculate the percentage increase in mass.', marks: 2, ms: '(5.06 − 5.00) ÷ 5.00 × 100 (1); = 1.2% (1).' },
  { q: 'Give **two** variables that must be **controlled** in the corrosion practical.', marks: 2, ms: 'Any two (1 each): size / mass / type of nail; volume of water; temperature; time left; same cleaning of nails; same concentration of salt.' },
  { q: 'Explain why the student found the mass gain was **lower** than expected, and suggest an improvement.', marks: 2, ms: 'Some rust flaked off / was lost when drying the nail (1); weigh the nail with the tube contents filtered and dried / handle gently / collect the rust (1). Accept balance resolution too low → use a 0.001 g balance.' },
  { q: 'A zinc-wrapped nail gained **0 mg**. A copper-wrapped nail gained **70 mg**. Explain the difference.', marks: 2, ms: 'Zinc is more reactive than iron so it corrodes instead / sacrificial protection (1); copper is less reactive so the iron corrodes (faster) (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 14 LIFE-CYCLE ASSESSMENT =======================
reg(D.contentSlide({
  title: 'Life-cycle assessment (LCA)',
  subtitle: `Specification ${sp('C4.4.4')} • the basic principles: water, energy and environmental impact at each stage`,
  tag: 'C4.4.4', caption: 'the four stages of a life cycle, with inputs and outputs',
  draw: (s) => {
    const st = [[1.85, 2.05, 'Raw materials', 'mining, quarrying, crude oil, trees'], [4.95, 2.05, 'Manufacture', 'making the material and product'],
      [4.95, 4.25, 'Use', 'energy, water, repairs'], [1.85, 4.25, 'Disposal', 'reuse, recycle, incinerate, landfill']];
    st.forEach(([cx, cy, t, sub], i) => {
      box(s, cx - 1.05, cy - 0.45, 2.1, 0.9, STAGECOL[i], C.ink, { shape: SH.ROUNDED_RECTANGLE, r: 0.08, lw: 0.75 });
      label(s, cx - 1.0, cy - 0.42, 2.0, `**${i + 1} ${t}**`, { size: 11, color: C.white, h: 0.3 });
      label(s, cx - 1.0, cy - 0.1, 2.0, sub, { size: 10, color: C.white, h: 0.5, valign: 'top' });
    });
    arrow(s, 2.95, 2.05, 3.85, 2.05, C.ink, 2); arrow(s, 4.95, 2.55, 4.95, 3.75, C.ink, 2); arrow(s, 3.85, 4.25, 2.95, 4.25, C.ink, 2);
    arrow(s, 1.85, 3.75, 1.85, 2.55, C.green, 2, { dash: 'dash' });
    label(s, 0.55, 2.95, 1.25, 'recycling closes the loop', { size: 10, bold: true, color: C.green, h: 0.5, align: 'right' });
    label(s, 3.0, 1.75, 0.8, 'transport', { size: 10, italic: true, color: C.grey, h: 0.22 });
    label(s, 3.0, 4.3, 0.8, 'transport', { size: 10, italic: true, color: C.grey, h: 0.22 });
    pbox(s, 2.7, 2.8, 1.4, 0.8, '**In**: energy, water, raw materials', 'E3F0FB', WAT[1], { size: 10, lw: 0.75 });
    pbox(s, 4.2, 2.8, 1.4, 0.8, '**Out**: CO₂, pollution, waste', 'FBE3E4', C.red, { size: 10, lw: 0.75 });
    label(s, 0.6, 5.0, 5.8, 'Example: a glass bottle (MJ per bottle)', { size: 10.5, bold: true, h: 0.24, color: C.ink });
    BOT.forEach(([t, v], i) => {
      const x = 0.75 + i * 1.42;
      pbox(s, x, 5.3, 1.3, 0.5, `${t}\n**${v.toFixed(1)}**`, i % 2 ? C.white : C.cardBlue, STAGECOL[i], { size: 10, lw: 1 });
    });
  },
  head: 'What an LCA does',
  lines: [
    'An **LCA** assesses the **environmental impact** of a product at **every stage** of its life: “cradle to grave”.',
    'At each stage it counts the **energy** and **water** used, the **raw materials** used up and the **emissions** and **waste** made.',
    '**Transport** between stages is included.',
    'LCAs let us **compare** products or materials doing the same job.',
    'Some impacts are easy to measure (energy, CO₂); others need **judgements** (litter, harm to wildlife), so LCAs can be **biased**.',
  ],
  size: 11,
  worked: { head: 'Worked example: LCA total', q: 'Use the glass bottle values.',
    steps: [['Add', '1.2 + 2.6 + 0.7 + 0.5 = 5.0 MJ'], ['Answer', 'manufacture is 2.6 ÷ 5.0 × 100 = **52%** of the total']], size: 10.5 },
  workedH: 1.3,
  qc: 'Name the **four** stages of an LCA. If the bottle is **reused 10 times**, what is the energy **per use**? (Ignore washing.)',
  notes: 'QUICK CHECK ANSWER: Extracting / obtaining raw materials; manufacture (and packaging); use (including maintenance); disposal at the end of life (transport between stages too). 5.0 ÷ 10 = 0.50 MJ per use.\nC4.4.4 wording (J258 C4.5.4 extract): "describe the basic principles in carrying out a life-cycle assessment of a material or product, including the use of water, energy and environmental impact of each stage". Glass bottle values illustrative (asserted: total 5.0 MJ, manufacture 52%). IaS: LCAs involve value judgements and may be used selectively in advertising (shortened LCAs).',
}), 'C4.4.4 Life-cycle assessment');

// ======================= 15 LCA DATA: BAGS =======================
{
  const s = D.contentHeader('LCA data: paper or plastic bag?', `Specification ${sp('C4.4.5')} • interpreting data from a life-cycle assessment`, { tag: 'C4.4.5' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'stacked bars plotted to scale from the table (illustrative LCA data)');
  const g = { x: 1.5, y: 1.55, w: 3.6, h: 2.95, xmin: 0, xmax: 3, ymin: 0, ymax: 2.0, xstep: 1, ystep: 0.4, minor: 2, ylabel: 'Energy per bag / MJ', fmt: () => '', yfmt: v => v.toFixed(1) };
  D.axes(s, g);
  stackBar(s, g, 1, PLA, STAGECOL); stackBar(s, g, 2, PAP, STAGECOL);
  label(s, D.px(g, 1) - 0.7, g.y + g.h + 0.08, 1.4, '**Plastic** (LDPE)', { size: 10.5, h: 0.24 });
  label(s, D.px(g, 2) - 0.7, g.y + g.h + 0.08, 1.4, '**Paper**', { size: 10.5, h: 0.24 });
  label(s, D.px(g, 1) - 0.5, D.py(g, pT) - 0.28, 1.0, `**${pT.toFixed(2)}**`, { size: 10.5, h: 0.24 });
  label(s, D.px(g, 2) - 0.5, D.py(g, qT) - 0.28, 1.0, `**${qT.toFixed(2)}**`, { size: 10.5, h: 0.24 });
  STAGES.forEach((t, i) => { box(s, 5.3, 1.75 + (3 - i) * 0.4, 0.25, 0.25, STAGECOL[i], C.ink, { lw: 0.5 }); label(s, 5.6, 1.73 + (3 - i) * 0.4, 1.4, t, { size: 10, align: 'left', h: 0.28 }); });
  const rows = [[HDR('MJ per bag'), ...STAGES.map(t => HDR(t)), HDR('Total')],
    [tcell('Plastic', 0, { bold: true }), ...PLA.map(v => tcell(v.toFixed(2), 0)), tcell(pT.toFixed(2), 0, { bold: true })],
    [tcell('Paper', 1, { bold: true }), ...PAP.map(v => tcell(v.toFixed(2), 1)), tcell(qT.toFixed(2), 1, { bold: true })]];
  s.addTable(rows, { x: 0.7, y: 4.92, w: 6.1, colW: [1.05, 1.05, 1.05, 0.95, 0.95, 1.05], rowH: 0.22, fontFace: 'Calibri', fontSize: 10, color: C.text, align: 'center', valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.5 } });
  D.card(s, 7.3, 1.3, 5.58, 2.65, 'Reading the LCA', [
    'Paper uses **2.25 times** the energy of plastic per bag, mostly in **manufacture** (pulping, drying).',
    'But paper is from **renewable** trees and is **biodegradable**; plastic is from **crude oil** (finite) and persists as **litter**.',
    'The answer depends on **how many times** a bag is reused, and on impacts that are hard to put a number on.',
  ], { size: 11 });
  D.workedSteps(s, 7.3, 4.1, 5.58, 2.15, 'Worked example: energy per use', 'The plastic bag is used 5 times; the paper bag once.', [
    ['Plastic', `${pT.toFixed(2)} ÷ 5 = 0.16 MJ per use`], ['Paper', `${qT.toFixed(2)} ÷ 1 = 1.80 MJ per use`],
    ['Answer', 'reused plastic uses **about 11 times** less energy per use']], { size: 10.5 });
  D.quickCheck(s, 'A cotton bag needs **12 MJ** to make and is used **100 times**. Calculate its energy per use. Give **one** impact this LCA does **not** show.');
  D.notes(s, 'QUICK CHECK ANSWER: 12 ÷ 100 = 0.12 MJ per use (lower than the plastic bag here). Not shown: water use, land use for trees / cotton, litter and harm to wildlife, microplastics, emissions other than energy (CO₂), pesticides for cotton.\nIllustrative values (asserted: 0.80 and 1.80 MJ; ratio 2.25; 0.16 MJ per use; 1.80 ÷ 0.16 = 11.25, "about 11 times"). C4.4.5 "interpret data from a life-cycle assessment of a material or product". The J258 spec is commonly taught with a shopping-bag LCA comparison (UNVERIFIED as a named example in the J260 statement).');
  calc('paper per use / plastic per use', 1.8 / 0.16, 11.25, 1e-9);
  reg(s, 'C4.4.5 LCA data: bags');
}

// ======================= 16 RECAP 4 =======================
const R4 = D.recapSlide(4, `Specification ${sp('C4.4.4')}, ${sp('C4.4.5')} • life-cycle assessment`, [
  { q: 'Name the **four** main stages considered in a life-cycle assessment.', marks: 2, ms: 'Raw materials / extraction; manufacture; use; disposal. All four (2); two or three (1).' },
  { q: 'A paper bag needs **1.8 MJ** and is used **3** times. A plastic bag needs **0.8 MJ** and is used **5** times. Which uses less energy **per use**?', marks: 2, ms: 'Paper 1.8 ÷ 3 = 0.6 MJ and plastic 0.8 ÷ 5 = 0.16 MJ (1); plastic uses less per use (1).' },
  { q: 'Suggest **two** reasons why two LCAs of the same product may give different conclusions.', marks: 2, ms: 'Any two (1 each): some impacts are hard to measure / need value judgements; different assumptions (e.g. number of uses, transport distance, energy source); data estimated / incomplete; may be biased / selective by the company paying for it.' },
  { q: 'Give **one** environmental advantage of a paper bag over a plastic bag **other than** energy.', marks: 2, ms: 'Made from a renewable resource / trees can be regrown (1) OR biodegradable / does not persist as litter (1), with a reason, e.g. plastic comes from crude oil which is finite / plastic litter harms wildlife (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 17 END-OF-LIFE OPTIONS =======================
reg(D.contentSlide({
  title: 'End of life: the options',
  subtitle: `Specification ${sp('C4.4.7')} • reuse, recycle, incinerate or landfill`,
  tag: 'C4.4.7', caption: 'the waste hierarchy: best option at the top',
  draw: (s) => {
    const lv = [['Reduce', 'use less material in the first place', '2E8B57'], ['Reuse', 'use the product again (refill, repair)', '4FA36B'],
      ['Recycle', 'make the material into new products', '8DBE5A'], ['Recover energy', 'incinerate and generate electricity', 'E3A93A'], ['Landfill', 'bury in the ground: last resort', 'C8414C']];
    lv.forEach(([t, d, c], i) => {
      const w = 5.1 - i * 0.65, x = 3.75 - w / 2, y = 1.5 + i * 0.75;
      box(s, x, y, w, 0.65, c, C.ink, { lw: 0.75 });
      label(s, x, y + 0.02, w, `**${t}**`, { size: 11.5, color: C.white, h: 0.3 });
      label(s, x, y + 0.3, w, d, { size: 10, color: C.white, h: 0.3 });
    });
    arrow(s, 0.7, 5.15, 0.7, 1.55, C.green, 2.5);
    label(s, 0.45, 5.25, 1.5, 'better for the environment', { size: 10, bold: true, color: C.green, h: 0.45, align: 'left', valign: 'top' });
    label(s, 2.0, 5.35, 4.4, 'Household waste: **400 kg** a year per home (illustrative)', { size: 10.5, h: 0.4 });
  },
  head: 'Disposal choices',
  lines: [
    '**Reuse**: little extra energy; e.g. refillable glass bottles, repairing a phone.',
    '**Recycle**: saves **raw materials** and usually **energy**; needs collecting, **sorting** and cleaning.',
    '**Incinerate**: reduces volume and can generate electricity, but releases **CO₂** and possibly toxic gases.',
    '**Landfill**: cheap, but uses land, wastes resources; plastics persist; rotting waste releases **methane**.',
    'Extending **useful life** (repair, rust prevention) delays all of these.',
  ],
  size: 11,
  worked: { head: 'Worked example: waste data', q: '400 kg: 45% recycled, 100 kg incinerated, the rest to landfill.',
    steps: [['Recycled', '400 × 0.45 = 180 kg'], ['Landfill', '400 − 180 − 100 = 120 kg'], ['Answer', '120 ÷ 400 × 100 = **30%** to landfill']], size: 10.5 },
  workedH: 1.55,
  qc: 'Why is **reuse** usually better than **recycling**? A home makes **480 kg** of waste and recycles **25%**: how many kg is recycled?',
  notes: 'QUICK CHECK ANSWER: Reuse needs only cleaning / repair, so far less energy, water and transport than melting or re-processing the material, and no material is lost. 480 × 0.25 = 120 kg.\nWaste hierarchy is a widely used framework (UK waste regulations). Figures illustrative, asserted in node. Methane from landfill: a greenhouse gas (link to C1 climate change, recap only).',
}), 'C4.4.7 End-of-life options');

// ======================= 18 RECYCLED FOR A DIFFERENT USE =======================
reg(D.contentSlide({
  title: 'Recycling for a different use',
  subtitle: `Specification ${sp('C4.4.6')} • a process where a material is recycled for a different use, and why it is viable`,
  tag: 'C4.4.6', caption: 'PET drinks bottles recycled into fleece fibre; chains not to scale',
  draw: (s) => {
    const steps = [['Collect', 'bottles in recycling bins'], ['Sort', 'PET separated from other plastics'], ['Wash and shred', 'into small flakes'], ['Melt', 'flakes soften and melt'], ['Spin', 'pull into fibres'], ['Weave', 'fleece jackets, carpets']];
    steps.forEach(([t, d], i) => {
      const col = i < 3 ? 0 : 1, row = i < 3 ? i : i - 3;
      const x = 0.7 + col * 2.95, y = 1.5 + row * 0.85;
      pbox(s, x, y, 2.55, 0.68, `**${i + 1} ${t}**\n${d}`, i % 2 ? C.white : C.cardBlue, C.blue, { size: 10, lw: 0.75 });
      if (row < 2) arrow(s, x + 1.27, y + 0.68, x + 1.27, y + 0.85, C.ink, 1.5);
    });
    arrow(s, 3.25, 3.54, 3.65, 1.84, C.ink, 1.5);
    // bottle
    box(s, 0.9, 4.25, 0.55, 1.05, 'D6ECF5', '5B9BD5', { shape: SH.ROUNDED_RECTANGLE, r: 0.1, lw: 1.25 });
    box(s, 1.06, 4.05, 0.23, 0.22, '5B9BD5', '2F5F8F', { lw: 0.75 });
    label(s, 0.7, 5.33, 0.95, 'PET bottle', { size: 10, h: 0.22 });
    arrow(s, 1.6, 4.75, 2.1, 4.75, C.ink, 1.5);
    // chains (C4.2 recap)
    box(s, 2.2, 4.15, 1.9, 1.15, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    chains(s, 2.35, 4.2, 1.6, 1.05, C.blue, 4);
    label(s, 2.2, 5.33, 1.9, 'separate chains, no cross-links', { size: 10, h: 0.22 });
    arrow(s, 4.2, 4.75, 4.7, 4.75, C.ink, 1.5);
    // fleece (wavy fabric)
    box(s, 4.8, 4.2, 1.4, 1.1, 'C9B6E4', '6A4C93', { shape: SH.ROUNDED_RECTANGLE, r: 0.12, lw: 1.25 });
    for (let k = 0; k < 4; k++) chains(s, 4.9, 4.28 + k * 0.24, 1.2, 0.22, '6A4C93', 1);
    label(s, 4.6, 5.33, 1.8, 'fleece fabric', { size: 10, h: 0.22 });
  },
  head: 'Why this recycling is viable',
  lines: [
    'PET is a **thermosoftening** polymer (C4.2): its chains are not cross-linked, so it can be **melted and reshaped**.',
    'Fibres do not need **food-grade** purity, so slightly mixed or coloured PET can still be used.',
    'It saves **crude oil** (finite) and **energy**, and keeps plastic out of **landfill**.',
    'There is a **market**: people buy fleece, carpets and fillings, so the process pays.',
    'Other examples: crushed **glass** → road surfaces and insulation; old **tyres** → playground surfaces.',
  ],
  size: 10.5,
  worked: { head: 'Worked example: bottles per fleece', q: 'A fleece has a mass of 500 g. Each bottle gives 20 g of PET.',
    steps: [['Divide', '500 ÷ 20'], ['Answer', '**25 bottles** per fleece']], size: 10.5 },
  workedH: 1.3,
  qc: 'Why can a **thermosetting** plastic **not** be recycled in this way? How many 20 g bottles make a **300 g** jumper?',
  notes: 'QUICK CHECK ANSWER: Thermosetting polymers have covalent cross-links between chains, so they do not soften or melt on heating (they char); they cannot be reshaped. 300 ÷ 20 = 15 bottles.\nC4.4.6 wording (J258 extract): "describe a process where a material or product is recycled for a different use, and explain why this is viable". Polymer structure is C4.2 (recap only: one sentence and the chain drawing). Bottle and fleece masses illustrative (asserted).',
}), 'C4.4.6 Recycling for a different use');

// ======================= 19 EVALUATING RECYCLING =======================
{
  const s = D.contentHeader('Should we recycle it?', `Specification ${sp('C4.4.7')} • evaluating the factors that affect decisions on recycling`, { tag: 'C4.4.7' });
  D.panel(s, 0.45, 1.3, 6.6, 4.95, 'bar chart to scale (illustrative energy values)');
  const g = { x: 1.55, y: 1.55, w: 3.3, h: 3.3, xmin: 0, xmax: 3, ymin: 0, ymax: 180, xstep: 1, ystep: 30, minor: 2, ylabel: 'Energy to make 1 kg of aluminium / MJ', fmt: () => '', yfmt: v => String(v) };
  D.axes(s, g);
  bars(s, g, [[1, AL_ORE, '9AA3B0'], [2, AL_REC, C.green]], null, 0.5);
  label(s, D.px(g, 1) - 0.7, g.y + g.h + 0.08, 1.4, '**from ore**', { size: 10.5, h: 0.24 });
  label(s, D.px(g, 2) - 0.7, g.y + g.h + 0.08, 1.4, '**recycled**', { size: 10.5, h: 0.24 });
  label(s, D.px(g, 1) - 0.5, D.py(g, AL_ORE) - 0.26, 1.0, `**${AL_ORE}**`, { size: 10.5, h: 0.22 });
  label(s, D.px(g, 2) - 0.5, D.py(g, AL_REC) - 0.26, 1.0, `**${AL_REC}**`, { size: 10.5, h: 0.22 });
  label(s, 5.05, 1.7, 1.85, 'Extraction by **electrolysis** of molten ore uses a lot of electricity (C3)', { size: 10, h: 1.0, align: 'left', valign: 'top' });
  label(s, 5.05, 2.8, 1.85, 'Recycling only **melts** the metal', { size: 10, h: 0.6, align: 'left', valign: 'top', color: C.green });
  // scales of decision
  label(s, 0.75, 5.4, 6.0, '**For**: energy, raw materials, landfill space  •  **Against**: collection, sorting, transport, purity', { size: 10.5, h: 0.5 });
  D.card(s, 7.3, 1.3, 5.58, 2.85, 'Factors to weigh up', [
    '**Energy saved** compared with making new material; **finite resources** (ores, crude oil) conserved.',
    '**Costs** of collecting, **sorting**, cleaning and **transporting** the waste: these use energy and money too.',
    '**Purity**: mixed or contaminated materials are hard to separate; plastics often lose quality each time.',
    '**Value** and **market** for the recycled material; **emissions** and **landfill** space saved.',
  ], { size: 10.5 });
  D.workedSteps(s, 7.3, 4.3, 5.58, 1.95, 'Worked example: aluminium cans', 'From ore 170 MJ/kg; recycled 8.5 MJ/kg. A school collects 500 cans of 15 g.', [
    ['Saving', '(170 − 8.5) ÷ 170 × 100 = **95%**'], ['Mass', '500 × 15 g = 7.5 kg'], ['Answer', `7.5 × 161.5 = ${fmt(alSave)} ≈ **1200 MJ** saved`]], { size: 10.5 });
  D.quickCheck(s, 'Making steel from ore needs **20 MJ/kg**; from scrap **8 MJ/kg**. Calculate the % saving. Why are **mixed plastics** less often recycled than **aluminium**?');
  D.notes(s, 'QUICK CHECK ANSWER: (20 − 8) ÷ 20 × 100 = 60%. Mixed plastics are hard to sort into separate polymers, are often contaminated, and the recycled plastic is lower quality and worth less; the energy saving is smaller; aluminium is easy to separate (magnets remove steel; eddy currents pull out aluminium), keeps its quality and saves about 95% of the energy.\nThe 95% energy saving for recycled aluminium is a widely quoted figure; the 170 MJ/kg value is illustrative and chosen to match it (asserted). C4.4.7 "evaluate factors that affect decisions on recycling" (J258 C4.5.7). IaS: sustainability; decisions weigh costs, benefits and risks for different groups.');
  reg(s, 'C4.4.7 Evaluating recycling');
}

// ======================= 20 RECAP 5 =======================
const R5 = D.recapSlide(5, `Specification ${sp('C4.4.6')}, ${sp('C4.4.7')} • end-of-life decisions`, [
  { q: 'Give **one** advantage and **one** disadvantage of **incinerating** waste.', marks: 2, ms: 'Advantage: reduces volume of waste / generates electricity / less land used for landfill (1). Disadvantage: releases carbon dioxide / toxic gases / resources lost (1).' },
  { q: 'Making copper from ore uses **60 MJ/kg**; recycling uses **9 MJ/kg**. Calculate the percentage energy saving.', marks: 2, ms: '(60 − 9) ÷ 60 × 100 (1); = 85% (1).' },
  { q: 'Describe **one** example of a material that is recycled for a **different use**, and explain why it is viable.', marks: 2, ms: 'Example, e.g. PET bottles → fleece fibres / glass → road surfaces or insulation / tyres → playground surfaces (1); reason, e.g. thermosoftening so can be melted and reshaped / does not need high purity / saves raw materials and energy / there is a market (1).' },
  { q: 'Suggest **two** reasons why recycling a product is **not** always the best choice.', marks: 2, ms: 'Any two (1 each): collecting / sorting / transport use energy and cost money; hard to separate mixed / contaminated materials; recycled material is lower quality; little or no market; reuse may be better still.' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Corrosion', 'A metal reacting with substances around it (oxygen, water) and being slowly oxidised.'],
  ['Rusting', 'The corrosion of iron and steel; needs both oxygen and water.'],
  ['Rust', 'Hydrated iron(III) oxide: weak and flaky, so it exposes more iron.'],
  ['Oxidation', 'Gain of oxygen; (HT) loss of electrons, e.g. Fe → Fe²⁺ + 2e⁻.'],
  ['Reduction (HT)', 'Loss of oxygen; gain of electrons, e.g. O₂ + 2H₂O + 4e⁻ → 4OH⁻.'],
  ['Barrier method', 'A coating (paint, oil, plastic, plating) that keeps oxygen and water off the metal.'],
  ['Sacrificial protection', 'A more reactive metal corrodes instead of iron, e.g. zinc, magnesium.'],
  ['Galvanising', 'Coating steel with zinc: barrier + sacrificial protection.'],
  ['Electroplating', 'Coating a metal with a thin layer of another metal, e.g. tin, chromium.'],
  ['Life-cycle assessment', 'Assessing the environmental impact of a product at every stage of its life.'],
  ['Useful life', 'How long a product can do its job before it must be repaired or replaced.'],
  ['Reuse', 'Using a product again for the same or another purpose without reprocessing.'],
  ['Recycling', 'Processing used materials so they can be made into new products.'],
  ['Incineration', 'Burning waste, often to generate electricity; releases CO₂.'],
  ['Landfill', 'Burying waste in the ground; uses land and may release methane.'],
  ['Sustainable', 'Meeting needs today without harming the ability to meet future needs.'],
], { notes: 'Use as a cover-and-recall activity. The electron-based definitions of oxidation and reduction are HT. Thermosoftening / thermosetting are C4.2 terms (recap only).' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A steel footbridge must last **60 years**. Engineers compare **painting** it (paint renewed every 10 years) with **galvanising** it. Energy for making the steel: **900 GJ**. Each coat of paint: **40 GJ** (6 coats in total). Galvanising once: **150 GJ**.', [
  { l: 'a', q: 'Name the **two** substances in the air that cause the steel to rust.', marks: 2, ms: 'Oxygen (1); water / water vapour (1).' },
  { l: 'b', q: 'Write the **word equation** for the rusting of iron.', marks: 1, ms: 'iron + oxygen + water → hydrated iron(III) oxide / rust (1).' },
  { l: 'c', q: 'Explain how paint prevents rusting, and why the bridge rusts if the paint is **chipped**.', marks: 2, ms: 'Paint is a barrier that keeps oxygen and water away from the iron (1); when chipped, oxygen and water reach the iron / exposed steel, so it rusts (1).', h: 1.1 },
  { l: 'd', q: 'Explain why galvanised steel does **not** rust even when the zinc is scratched.', marks: 2, ms: 'Zinc is more reactive than iron (1); so zinc corrodes / is oxidised instead (sacrificial protection) (1).', h: 1.1 },
  { l: 'e', q: 'Write a **half equation** for zinc corroding and explain why zinc is **oxidised**.', marks: 2, ht: true, ms: 'Zn → Zn²⁺ + 2e⁻ (1); zinc loses electrons / loss of electrons is oxidation (1).', h: 1.1 },
  { l: 'f', q: 'Use the data to compare the **total energy** over 60 years for each method. Which is better, and give **one** other factor to consider.', marks: 4, ms: 'Painted: 900 + 6 × 40 = 1140 GJ (1); galvanised: 900 + 150 = 1050 GJ (1); galvanising uses 90 GJ less / is better for energy (1); other factor, e.g. cost, appearance, closing the bridge for repainting, emissions / solvents from paint, zinc is a finite resource, safety of workers (1).', h: 1.5 },
], 13, { subtitle: `Specification ${DECK.specRange} • answer every part • 13 marks • (e) is HT` }), 'Full question');

// ======================= HOMEWORK =======================
function levelsHW() {
  return D.levels6([
    'For recycling aluminium cans: saves about 95% of the energy compared with electrolysis of ore; conserves finite bauxite ore; less mining and quarrying damage; easy to separate (eddy currents); keeps its quality; valuable, so there is a market.',
    'For recycling plastic bottles: saves crude oil (finite) and some energy; keeps plastic out of landfill and the environment; PET is thermosoftening so can be melted and reused, e.g. for fleece fibres.',
    'Against / challenges: cost and energy of collection, sorting, cleaning and transport (lorries emit CO₂); mixed and contaminated plastics are hard to separate; recycled plastic is lower quality and worth less; need a market.',
    'Alternatives: reuse / refill is better than recycling; incineration recovers energy but releases CO₂; landfill wastes resources and land.',
    'Use of LCA: compare energy, water and emissions at every stage, including transport; LCAs involve judgements and estimates.',
    'Conclusion: e.g. aluminium recycling clearly worthwhile; plastic recycling worthwhile if sorting and markets exist; supported by reasons.',
  ], {
    l3: 'Evaluates factors FOR and AGAINST recycling for BOTH materials, using energy / resource data or LCA ideas, AND reaches a justified conclusion.',
    l2: 'Describes some advantages AND some disadvantages of recycling, for at least one material, with some explanation.',
    l1: 'Simple statements, e.g. "recycling saves energy" or "it costs money to collect".',
  });
}
const HW = [
  { n: '1', q: 'Name the process in which a metal slowly reacts with oxygen and water in the air.', marks: 1, ms: 'Corrosion / rusting (for iron) (1).' },
  { n: '2', q: 'A food can is **tin-plated** steel. Explain why the can rusts **quickly** once the tin is scratched.', marks: 2, ms: 'Tin is only a barrier / tin is less reactive than iron (1); so the exposed iron corrodes (faster) / iron is oxidised in preference to tin (1).' },
  { n: '3', q: 'Making steel from ore uses **20 MJ/kg**; from scrap **8 MJ/kg**. Calculate the percentage energy saving.', marks: 2, ms: '(20 − 8) ÷ 20 × 100 (1); = 60% (1).' },
  { n: '4', q: 'Describe what is measured at **each stage** of a life-cycle assessment.', marks: 2, ms: 'Energy / water used (1); emissions / pollution / waste produced / raw materials used, at each stage from raw materials to disposal (1).' },
  { n: '5', q: 'Explain, in terms of **electrons**, how magnesium blocks protect a steel ship hull.', marks: 2, ht: true, ms: 'Magnesium is more reactive / loses electrons more easily than iron: Mg → Mg²⁺ + 2e⁻ (1); so iron does not lose electrons / is not oxidised (1).', h: 1.1 },
  { n: '6', q: 'PET bottles are recycled into fleece fibres. Explain why this process is **viable**.', marks: 2, ms: 'PET is thermosoftening / can be melted and reshaped (1); plus one: fibres do not need high purity / saves crude oil / energy / there is a market for fleece (1).', h: 1.1 },
  { n: '7', q: 'A council is deciding whether to collect **aluminium cans** and **plastic bottles** for recycling. **Evaluate** the factors it should consider.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
D.homework('Answer all questions. Q7 is a 6-mark extended answer. Q5 is Higher tier.', HW, 17, { dividerSub: 'C4.4 End of useful life • 17 marks • about 30 minutes' });
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach(r => assert.strictEqual(r.total, 8));
// deck-specific: the C4.4 title is long, so widen every footer text box to keep it on one line
let nFoot = 0;
(D.pres._slides || D.pres.slides).forEach(sl => sl._slideObjects.forEach(o => {
  if (o._type === 'text' && JSON.stringify(o.text).includes('Combined Science B (J260) | C4.4') && o.options && o.options.w === 10.2) { o.options.w = 11.1; nFoot++; }
}));
assert.strictEqual(nFoot, D.slideNo - 1, 'every non-cover slide has a footer');
console.log(`${EQN.length} equations atom/charge-balanced`);
const out = path.join(__dirname, 'OCR21C_C4.4_EndOfLife_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
