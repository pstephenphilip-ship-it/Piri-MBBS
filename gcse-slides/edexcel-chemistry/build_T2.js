// build_T2.js — Edexcel GCSE Chemistry 1CH0 Topic 2 States of matter and mixtures (one deck, both tiers)
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_T2.js
// Structure copied from build_T3.js / build_T1.js. edx_chem_template.js is NOT edited: glassware helpers are spliced
// in from build_T3.js; distillation, chromatography and particle helpers are below.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./edx_chem_template');
const { calc, sf, C } = T;

const DECK = {
  topic: 2,
  title: 'States of matter and mixtures',
  shortTitle: 'T2',
  subtitle: 'Particles, purity, separating mixtures and water',
  specRange: '2.1–2.13',
  pOnly: [],
  paper: 'Papers 1 and 2',
  keywords: ['States of matter', 'Purity', 'Distillation', 'Chromatography', 'Rf values', 'Potable water'],
};
const D = T.init(DECK);
const { line, arrow, label, box, axes, points, plotLine, fnLine, px, py, SH } = D;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS AND DATA (asserted) =======================
const Rf = (spot, front) => spot / front;
calc('Rf A 2.4/8.0', Rf(2.4, 8.0), 0.30, 1e-12); calc('Rf B 5.6/8.0', Rf(5.6, 8.0), 0.70, 1e-12); calc('Rf C 4.4/8.0', Rf(4.4, 8.0), 0.55, 1e-12);
calc('Rf QC 3.9/6.5', Rf(3.9, 6.5), 0.60, 1e-12); calc('spot for Rf 0.45, front 7.0', 0.45 * 7.0, 3.15, 1e-12);
calc('Rf R3 2.1/7.0', Rf(2.1, 7.0), 0.30, 1e-12); calc('Rf FQ 3.0/7.5', Rf(3.0, 7.5), 0.40, 1e-12); calc('Rf HW 4.2/8.4', Rf(4.2, 8.4), 0.50, 1e-12);
calc('Rf worked 3.6/8.0', Rf(3.6, 8.0), 0.45, 1e-12);
// state at a temperature from melting and boiling points
const stateAt = (mp, bp, t) => t < mp ? 'solid' : (t < bp ? 'liquid' : 'gas');
const SUBS = [['A (ethanol)', -114, 78], ['B (sodium chloride)', 801, 1413], ['C (oxygen)', -218, -183], ['D (phosphorus)', 44, 280]];
assert.deepStrictEqual(SUBS.map(([, m, b]) => stateAt(m, b, 25)), ['liquid', 'solid', 'gas', 'solid']);
assert.strictEqual(stateAt(44, 280, 100), 'liquid');
assert.strictEqual(stateAt(-7, 59, 25), 'liquid'); // bromine, recap
assert.strictEqual(stateAt(-39, 357, 400), 'gas'); // mercury, homework
assert.strictEqual(stateAt(-39, 357, -50), 'solid');
// heating curve for 1 kg-ish ice sample (illustrative, piecewise linear)
const HC = [[0, -20], [2, 0], [6, 0], [12, 100], [17, 100], [19, 120]];
calc('heating curve plateaus', HC[2][1] - HC[1][1] + HC[4][1] - HC[3][1], 0);
// CP 2.11: ink distillation thermometer reading and chromatogram
const CP = { front: 8.0, dyes: { A: 2.4, B: 5.6, C: 4.4 }, ink: [2.4, 5.6] };
CP.ink.forEach(d => assert(Object.values(CP.dyes).includes(d), 'ink dye matches a reference'));

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


// ======================= T2 drawing helpers =======================
function particleBox(s, x, y, w, h, kind, col = ['8EC9F0', '2F7FC1']) {
  box(s, x, y, w, h, 'FFFFFF', '6B7385', { lw: 1.25 });
  const r = 0.12;
  if (kind === 'solid') { for (let i = 0; i < 4; i++) for (let j = 0; j < 5; j++) ball(s, x + 0.25 + j * 0.25, y + h - 0.2 - i * 0.25, r, col[0], col[1], 1); }
  if (kind === 'liquid') { const pts = [[0.22, 0.2], [0.47, 0.22], [0.7, 0.18], [0.95, 0.21], [1.2, 0.2], [0.32, 0.43], [0.58, 0.45], [0.83, 0.42], [1.1, 0.44], [0.2, 0.66], [0.47, 0.68], [0.95, 0.65], [1.2, 0.67], [0.7, 0.69]];
    pts.forEach(([dx, dy]) => ball(s, x + dx * w / 1.4, y + h - dy, r, col[0], col[1], 1)); }
  if (kind === 'gas') { [[0.25, 0.3], [1.1, 0.25], [0.7, 0.75], [0.3, 1.05], [1.15, 0.95], [0.75, 1.3]].forEach(([dx, dy]) => { ball(s, x + dx * w / 1.4, y + dy, r, col[0], col[1], 1); arrow(s, x + dx * w / 1.4 + 0.12, y + dy, x + dx * w / 1.4 + 0.32, y + dy - 0.12, '8A8F99', 1); }); }
}
function rbFlask(s, cx, cy, r, neckTop, liq = WAT[0], level = 0.45) {
  box(s, cx - 0.09, neckTop, 0.18, cy - r - neckTop + 0.05, GLASS, null);
  oval(s, cx, cy, 2 * r, 2 * r, GLASS, null);
  if (level) { const yl = cy + r - 2 * r * level, pts = []; const a0 = Math.asin(Math.max(-1, Math.min(1, (yl - cy) / r))); for (let i = 0; i <= 24; i++) { const t = a0 + (Math.PI - 2 * a0) * i / 24; pts.push([cx + r * Math.cos(t), cy + r * Math.sin(t)]); } poly(s, pts, liq, null); }
  oval(s, cx, cy, 2 * r, 2 * r, null, C.ink, { lw: 1.5 });
  box(s, cx - 0.06, cy - r - 0.02, 0.12, 0.06, GLASS, null);
  line(s, cx - 0.09, neckTop, cx - 0.09, cy - r * 0.96, C.ink, 1.5); line(s, cx + 0.09, neckTop, cx + 0.09, cy - r * 0.96, C.ink, 1.5);
}
function thermometer(s, x, y1, y2) { box(s, x - 0.035, y1, 0.07, y2 - y1, 'FFFFFF', '6B7385', { lw: 0.75 }); ball(s, x, y2, 0.055, C.red, C.red); line(s, x, y1 + 0.3, x, y2, C.red, 1.5); }
function condenser(s, x1, y1, x2, y2, o = {}) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy), ux = dx / L, uy = dy / L, vx = -uy, vy = ux, j = 0.17, a = 0.35, b = L - 0.25;
  const P = (t, k) => [x1 + ux * t + vx * k, y1 + uy * t + vy * k];
  poly(s, [P(a, -j), P(b, -j), P(b, j), P(a, j)], 'DDEEFB', '2F5FA8', { lw: 1.25 });
  line(s, ...P(0, -0.045), ...P(L, -0.045), C.ink, 1.25); line(s, ...P(0, 0.045), ...P(L, 0.045), C.ink, 1.25);
  const [ix, iy] = P(b - 0.2, j), [ox, oy] = P(a + 0.2, -j);
  line(s, ix, iy, ix, iy + 0.3, '2F5FA8', 2); arrow(s, ix + 0.12, iy + 0.45, ix + 0.02, iy + 0.12, '2F5FA8', 1.5);
  line(s, ox, oy, ox, oy - 0.3, '2F5FA8', 2); arrow(s, ox, oy - 0.2, ox + 0.1, oy - 0.48, '2F5FA8', 1.5);
  if (o.labels !== false) { label(s, ix - 0.3, iy + 0.45, 1.1, 'water in', { size: 9.5, h: 0.24, color: '2F5FA8', align: 'left' }); label(s, ox - 0.1, oy - 0.75, 1.1, 'water out', { size: 9.5, h: 0.24, color: '2F5FA8', align: 'left' }); }
}
function chromPaper(s, x, y, w, h, lanes, o = {}) {
  // lanes: [{name, rfs:[...], cols:[...]}]; base line near the bottom, front near the top
  box(s, x, y, w, h, 'FFFFFF', '8A8F99', { lw: 1 });
  const base = y + h - 0.45, front = y + 0.35, dist = base - front;
  line(s, x + 0.1, base, x + w - 0.1, base, '6B7385', 1, { dash: 'dash' });
  line(s, x + 0.1, front, x + w - 0.1, front, '2F7FC1', 1.25, { dash: 'dash' });
  const lw = (w - 0.2) / lanes.length;
  lanes.forEach((ln, i) => {
    const cx = x + 0.1 + lw * (i + 0.5);
    label(s, cx - lw / 2, base + 0.08, lw, `**${ln.name}**`, { size: 10, h: 0.26 });
    (ln.rfs || []).forEach((rf, k) => oval(s, cx, base - rf * dist, 0.22, 0.16, ln.cols[k], ln.cols[k]));
    if (o.origin !== false) ball(s, cx, base, 0.03, '6B7385', '6B7385');
  });
  return { base, front, dist };
}
const DYE = { A: 'E04848', B: '3B6FD8', C: 'E0B020' };
function flowBox(s, x, y, w, h, head, sub, col) {
  box(s, x, y, w, h, col[0], col[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
  label(s, x + 0.05, y + 0.05, w - 0.1, `**${head}**`, { size: 11, h: 0.3, color: C.ink });
  label(s, x + 0.05, y + 0.36, w - 0.1, sub, { size: 9.5, h: h - 0.4, color: C.text, valign: 'top' });
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'States and mixtures',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • particles, purity, separation, chromatography, water` },
    { icon: 'CP', text: 'Core Practical 2.11: investigate inks by simple distillation and paper chromatography' },
    { icon: '2', text: 'Topic 2 • assessed on both papers • same content in Combined Science' },
  ],
  footer: 'Pearson Edexcel GCSE (9–1) Chemistry 1CH0 • teacher deck • mark schemes and answers in the speaker notes',
  notes: 'Topic 2 States of matter and mixtures. No Higher-only statements and no chemistry-only statements believed (medium confidence): every slide is for both tiers and both courses. One Core Practical: 2.11 (inks: simple distillation and paper chromatography). Statement numbers partly confirmed by search (2.11 CP, 2.12 potable water); others reconstructed: see SPEC_T2.md.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: '2.1', text: 'Describe the **arrangement**, **movement** and **energy** of particles in solids, liquids and gases.' },
  { code: '2.2–2.3', text: 'Name the **changes of state** and explain them as **physical changes**.' },
  { code: '2.4', text: '**Predict** the state of a substance from its melting and boiling points.' },
  { code: '2.5–2.6', text: 'Explain what **pure** means in chemistry; test purity using **melting point**.' },
  { code: '2.7–2.8', text: 'Choose and describe **filtration**, **crystallisation**, **simple** and **fractional distillation**.' },
  { code: '2.9–2.10', text: 'Explain **paper chromatography**; interpret chromatograms; calculate **Rf values**.' },
  { code: '2.11 CP', text: '**Core Practical:** investigate the composition of **inks**.' },
  { code: '2.12–2.13', text: 'Explain how water is made **potable**, and why analysis needs **pure water**.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this topic you can…`, notes: 'No HT statements in Topic 2 (believed). Rf calculations and the Core Practical are both tiers.' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', `Specification ${DECK.specRange} • Topic 2 is assessed on both papers`, { tag: 'Context' });
  const nodes = [
    ['2.1–2.4', 'States of matter, changes of state, predicting state', 'BOTH COURSES', C.blue],
    ['2.5–2.6', 'Pure substances and melting point', 'BOTH COURSES', C.blue],
    ['2.7–2.8', 'Filtration, crystallisation, distillation', 'BOTH COURSES', C.blue],
    ['2.9–2.10', 'Paper chromatography and Rf values', 'BOTH COURSES', C.blue],
    ['2.11', 'Core Practical: investigating inks', 'CORE PRACTICAL', C.orange],
    ['2.12', 'Making water potable', 'BOTH COURSES', C.blue],
    ['2.13', 'Pure water for chemical analysis', 'BOTH COURSES', C.blue],
  ];
  box(s, 0.45, 1.3, 2.3, 0.7, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.3, 2.3, 'Topic 2\nStates and mixtures', { h: 0.7, size: 12, bold: true, color: C.white });
  line(s, 1.0, 2.0, 1.0, 2.15 + 6 * 0.62 + 0.27, C.blue, 1.5);
  nodes.forEach(([code, txt, tg, col], i) => {
    const y = 2.15 + i * 0.62;
    line(s, 1.0, y + 0.27, 1.45, y + 0.27, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.54, tg === 'CORE PRACTICAL' ? C.cream : C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.05, h: 0.54, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.7, y + 0.12, tg, col, 1.28);
  });
  label(s, 0.45, 6.6, 6.6, 'Links: Topic 1 particles and bonding • Topic 3 crystallisation of salts • Topic 5 crude oil fractions', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.3, 5.53, 2.75, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'How this is assessed', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      'Topic 2 can be examined on **both** 1CH0 papers.',
      'Combined Science 1SC0 tests the **same** Topic 2 statements.',
      'Core Practical **2.11** questions: method, Rf, safety and errors.',
      'Practical skills: choosing and describing separation methods.',
    ], { size: 11.5, color: 'E9E1F7' }),
  ], { x: 7.55, y: 1.4, w: 5.15, h: 2.55, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.2, 5.53, 2.65, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      '**No HT** and **no chemistry-only** statements believed: every class uses every slide.',
      'Higher students should explain in terms of **forces between particles** and **energy**.',
      'Every Rf value and state prediction in the deck is checked.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.3, w: 5.15, h: 2.45, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'Topic 2 has no Higher-only or chemistry-only statements as far as we could check (medium confidence). 2.11 (CP) and 2.12 (potable water) numbers confirmed by search; others reconstructed.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'KS3 • particles', q: 'Name the **three** states of matter.' },
  { from: 'KS3 • mixtures', q: 'What is the difference between a **compound** and a **mixture**?' },
  { from: 'KS3 • solutions', q: 'Salt dissolves in water. Name the **solute**, **solvent** and **solution**.' },
  { from: 'Topic 1 • bonding', q: 'Why does sodium chloride have a **high** melting point?' },
  { from: 'Topic 1 • molecules', q: 'Why does water have a **low** boiling point?' },
  { from: 'Maths • decimals', q: 'Work out **2.4 ÷ 8.0**.' },
], { subtitle: 'Recall from KS3 and Topic 1 • 6 minutes • no notes', notes: 'ANSWERS\n1. Solid, liquid, gas.\n2. A compound has elements chemically combined in fixed proportions; a mixture has substances not chemically joined, which can be separated by physical methods.\n3. Salt = solute, water = solvent, salt water = solution.\n4. Giant ionic lattice; strong electrostatic forces between ions need a lot of energy to overcome.\n5. Simple molecules with weak intermolecular forces.\n6. 0.3 (this is exactly an Rf calculation).' }), 'Retrieval starter');

// ======================= 5 STATES OF MATTER =======================
reg(D.contentSlide({
  title: 'Solids, liquids and gases',
  subtitle: 'Specification 2.1 • arrangement, movement and energy of particles',
  tag: '2.1', caption: 'particle model: each circle is one particle (atom, molecule or ion)',
  draw: (s, p) => {
    [['solid', 0.7], ['liquid', 2.65], ['gas', 4.6]].forEach(([k, x]) => {
      label(s, x, 1.5, 1.6, `**${k[0].toUpperCase() + k.slice(1)}**`, { size: 13, h: 0.3, color: C.blue });
      particleBox(s, x, 1.9, 1.6, 1.5, k);
    });
    const rows = [[HDR(''), HDR('Solid'), HDR('Liquid'), HDR('Gas')],
      ...[['Arrangement', 'regular, touching', 'random, touching', 'random, far apart'], ['Movement', 'vibrate in place', 'move past each other', 'fast, all directions'], ['Energy', 'lowest', 'medium', 'highest']].map((r, i) => r.map((c, j) => tcell(c, i, { bold: j === 0 })))];
    s.addTable(rows, { x: 0.65, y: 3.7, w: 5.75, colW: [1.25, 1.5, 1.5, 1.5], rowH: 0.42, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Key ideas',
  lines: [
    '**Solid:** particles in a regular arrangement, touching; they **vibrate** about fixed positions. Fixed shape and volume.',
    '**Liquid:** particles touching but **randomly** arranged; they **move past each other**. Flows; takes the shape of its container.',
    '**Gas:** particles **far apart**, moving **quickly and randomly**. Fills its container; easily compressed.',
    'Particles have **more energy** in a liquid than a solid, and most in a gas.',
  ],
  worked: { head: 'Explain', q: 'Why can a gas be compressed but a liquid cannot?',
    steps: [['Gas', 'large spaces between particles'], ['Liquid', 'particles already touching'], ['Answer', 'only a gas has space to push particles closer']], size: 11 },
  workedH: 1.75,
  qc: 'Describe the **movement** of particles in a liquid.',
  notes: 'QUICK CHECK ANSWER: they move around / slide past each other (1) randomly, while still touching (1).\nSpec 2.1. Limitation of the model: particles drawn as solid spheres with no forces shown.',
}), '2.1 States of matter');

// ======================= 6 CHANGES OF STATE =======================
reg(D.contentSlide({
  title: 'Changes of state',
  subtitle: 'Specification 2.2–2.3 • physical changes; energy and forces between particles',
  tag: '2.2–2.3', caption: 'heating curve for ice (illustrative); flat parts = changes of state',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.8, h: 3.5, xmin: 0, xmax: 20, xstep: 4, ymin: -20, ymax: 120, ystep: 20, xlabel: 'time (min)', ylabel: 'temperature (°C)', grid: true };
    axes(s, g);
    plotLine(s, g, HC, C.red, 2.5);
    label(s, px(g, 2.2), py(g, 0) - 0.32, 1.4, '**melting**', { size: 10.5, h: 0.26, color: C.blue, align: 'left' });
    label(s, px(g, 12), py(g, 100) - 0.32, 1.4, '**boiling**', { size: 10.5, h: 0.26, color: C.blue, align: 'left' });
    label(s, px(g, 0.3), py(g, 14), 1.0, 'solid', { size: 9.5, h: 0.22, align: 'left', color: C.grey });
    label(s, px(g, 5.0), py(g, 62), 1.0, 'liquid', { size: 9.5, h: 0.22, align: 'left', color: C.grey });
    label(s, px(g, 14.5), py(g, 118), 0.6, 'gas', { size: 9.5, h: 0.22, align: 'left', color: C.grey });
  },
  head: 'Key ideas',
  lines: [
    '**Melting** (solid → liquid), **freezing** (liquid → solid), **evaporating / boiling** (liquid → gas), **condensing** (gas → liquid). Solid → gas directly is **subliming**.',
    'Changes of state are **physical changes**: no new substance forms and they can be **reversed**.',
    'Melting and boiling need **energy** to **overcome the forces between particles**; freezing and condensing **release** energy.',
    'The **temperature stays constant** while the state changes.',
  ],
  worked: { head: 'Explain', q: 'Why is the curve flat at 100 °C?',
    steps: [['Energy', 'still being supplied'], ['Used for', 'overcoming forces between water molecules'], ['Answer', 'not raising the temperature, so it stays at 100 °C']], size: 11 },
  workedH: 1.85,
  qc: 'Name the change of state when steam turns into water on a cold window. Is energy taken in or given out?',
  notes: 'QUICK CHECK ANSWER: condensing (1); energy is given out / released (1).\nSpec 2.2–2.3. Heating curve values are illustrative (not to a particular mass).',
}), '2.2–2.3 Changes of state');

// ======================= 7 PREDICTING STATE =======================
reg(D.contentSlide({
  title: 'Predicting the state of a substance',
  subtitle: 'Specification 2.4 • compare the temperature with the melting and boiling points',
  tag: '2.4', caption: 'states at room temperature (25 °C)',
  draw: (s, p) => {
    const rows = [[HDR('Substance'), HDR('Melting point (°C)'), HDR('Boiling point (°C)'), HDR('State at 25 °C')],
      ...SUBS.map(([n, m, b], i) => [tcell(n, i, { bold: true }), tcell(String(m).replace('-', '−'), i, { align: 'center' }), tcell(String(b).replace('-', '−'), i, { align: 'center' }), tcell(stateAt(m, b, 25), i, { bold: true, color: C.green, align: 'center' })])];
    s.addTable(rows, { x: 0.65, y: 1.55, w: 5.75, colW: [1.9, 1.3, 1.3, 1.25], rowH: 0.45, fontFace: 'Calibri', fontSize: 11, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    const x0 = 0.9, x1 = 6.1, y = 4.6, T2x = t => x0 + (t + 120) / (400 + 120) * (x1 - x0);
    box(s, x0, y - 0.12, T2x(78) - x0, 0.24, 'DCE8F7', null); box(s, T2x(78), y - 0.12, x1 - T2x(78), 0.24, 'F3EEFB', null);
    box(s, x0, y - 0.12, T2x(-114) - x0, 0.24, 'E3E6EA', null);
    line(s, x0, y, x1, y, C.ink, 1.5);
    [[-114, 'mp −114'], [78, 'bp 78'], [25, '25 °C']].forEach(([t, tx]) => { line(s, T2x(t), y - 0.2, T2x(t), y + 0.2, t === 25 ? C.red : C.ink, 2); label(s, T2x(t) - 0.6, y + 0.22, 1.2, tx, { size: 10, h: 0.26, color: t === 25 ? C.red : C.ink }); });
    label(s, x0, y - 0.48, 1.2, 'solid', { size: 10, h: 0.26, align: 'left' }); label(s, T2x(-60), y - 0.48, 1.4, 'liquid', { size: 10, h: 0.26, align: 'left' }); label(s, T2x(150), y - 0.48, 1.0, 'gas', { size: 10, h: 0.26, align: 'left' });
    label(s, 0.65, 5.15, 5.75, 'ethanol: 25 °C is between its melting and boiling points, so it is a **liquid**', { size: 10.5, h: 0.4 });
  },
  head: 'The rule',
  lines: [
    'Below the **melting point**: **solid**.',
    'Between the melting point and the **boiling point**: **liquid**.',
    'Above the boiling point: **gas**.',
    'Careful with **negative** numbers: −183 °C is colder than −114 °C.',
  ],
  worked: { head: 'Worked example', q: 'Phosphorus melts at 44 °C and boils at 280 °C. What is its state at 100 °C?',
    steps: [['Compare', '100 is above 44 but below 280'], ['Answer', 'liquid']], size: 11 },
  workedH: 1.5,
  qc: 'Mercury melts at **−39 °C** and boils at **357 °C**. Give its state at **−50 °C** and at **400 °C**.',
  notes: 'QUICK CHECK ANSWER: solid at −50 °C (1); gas at 400 °C (1).\nSpec 2.4. Every state on this slide is checked in node with stateAt(mp, bp, T).',
}), '2.4 Predicting state');

// ======================= 8 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Specification 2.1–2.4 • particles and changes of state', [
  { q: 'Describe the **arrangement** of particles in a liquid.', marks: 2, ms: 'Touching / close together (1); randomly arranged / no pattern (1).' },
  { q: 'Name the change of state from liquid to gas.', marks: 1, ms: 'Evaporating / boiling (1).' },
  { q: 'Explain why the temperature stays the same while ice is **melting**.', marks: 2, ms: 'Energy is used to overcome the forces between particles (1); not to increase the temperature / kinetic energy (1).' },
  { q: 'Bromine melts at **−7 °C** and boils at **59 °C**. Predict its state at 25 °C and explain.', marks: 2, ms: 'Liquid (1); 25 °C is above the melting point and below the boiling point (1).' },
]);
reg(R1.s, 'Recap 1');

// ======================= 9 PURITY =======================
reg(D.contentSlide({
  title: 'Pure substances and melting points',
  subtitle: 'Specification 2.5–2.6 • "pure" in chemistry; testing purity',
  tag: '2.5–2.6', caption: 'cooling curves (illustrative): a pure substance freezes at one temperature',
  draw: (s, p) => {
    const g = { x: 1.3, y: 1.6, w: 4.8, h: 3.4, xmin: 0, xmax: 10, xstep: 2, ymin: 60, ymax: 100, ystep: 10, xlabel: 'time (min)', ylabel: 'temperature (°C)', grid: true };
    axes(s, g);
    plotLine(s, g, [[0, 95], [2.5, 80], [7, 80], [10, 68]], C.blue, 2.5);
    plotLine(s, g, [[0, 92], [2.5, 77], [7, 71], [10, 62]], C.red, 2.5);
    label(s, px(g, 3.2), py(g, 80) - 0.32, 2.2, '**pure**: sharp, 80 °C', { size: 10.5, h: 0.26, color: C.blue, align: 'left' });
    label(s, px(g, 0.4), py(g, 66), 2.6, '**impure**: lower, over a range', { size: 10.5, h: 0.26, color: C.red, align: 'left' });
  },
  head: 'Key ideas',
  lines: [
    'In **everyday** language, "pure" means natural or with nothing added (e.g. "pure orange juice").',
    'In **chemistry**, a **pure** substance contains **only one** element or compound.',
    'A pure substance melts and boils at a **sharp, fixed** temperature.',
    'An **impure** substance melts over a **range** of temperatures, usually **lower** than the pure substance.',
  ],
  worked: { head: 'Use the data', q: 'Pure aspirin melts at 136 °C. A sample melts between 128 °C and 133 °C. Is it pure?',
    steps: [['Compare', 'lower than 136 °C'], ['Range', 'melts over 5 °C, not one temperature'], ['Answer', 'impure']], size: 11 },
  workedH: 1.75,
  qc: 'Why is "pure orange juice" **not** pure in the chemistry sense?',
  notes: 'QUICK CHECK ANSWER: it is a mixture of many substances (water, sugars, acids…) (1); a chemically pure substance contains only one substance (1).\nSpec 2.5–2.6. Cooling curves are illustrative.',
}), '2.5–2.6 Purity');

// ======================= 10 CHOOSING A METHOD =======================
{
  const s = D.contentHeader('Separating mixtures: choosing a method', 'Specification 2.7–2.8 • match the method to the properties of the substances', { tag: '2.7–2.8' });
  const fx = 0.6, fw = 2.25, gap = 0.3;
  const methods = [
    ['Filtration', 'insoluble solid from a liquid', 'sand from salt water', ['DCE8F7', '7A9CC9']],
    ['Crystallisation', 'soluble solid from a solution', 'salt from salt water', ['EFE6FA', 'A58BD1']],
    ['Simple distillation', 'solvent from a solution', 'water from sea water', ['FFF1D6', 'D9A441']],
    ['Fractional distillation', 'liquids with different boiling points', 'ethanol from water', ['F9E0DA', 'C2685A']],
    ['Paper chromatography', 'soluble substances (e.g. dyes)', 'dyes in an ink', ['E1F3E6', '4E9A65']],
  ];
  methods.forEach(([h, what, eg, col], i) => {
    const x = fx + i * (fw + gap);
    box(s, x, 1.4, fw, 2.3, col[0], col[1], { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
    label(s, x + 0.08, 1.5, fw - 0.16, `**${h}**`, { size: 13, h: 0.55, color: C.ink });
    label(s, x + 0.08, 2.1, fw - 0.16, `separates: ${what}`, { size: 11, h: 0.8 });
    label(s, x + 0.08, 2.95, fw - 0.16, `e.g. ${eg}`, { size: 11, h: 0.6, italic: true, color: C.grey });
  });
  D.card(s, 0.6, 3.95, 12.13, 2.3, 'How to choose', [
    'Is there an **insoluble solid**? → **filtration** first.',
    'Do you want the **dissolved solid**? → **crystallisation** (evaporate some water, then cool).',
    'Do you want the **liquid** (solvent)? → **simple distillation**. Two or more **liquids** that mix? → **fractional distillation**.',
    'Several **coloured** substances, small amounts, to identify? → **paper chromatography**.',
  ], { size: 12 });
  D.quickCheck(s, 'Choose a method to get: (a) **water** from ink, (b) **sand** from a sand and water mixture, (c) **copper sulfate crystals** from its solution.');
  D.notes(s, 'QUICK CHECK ANSWERS: (a) simple distillation (1); (b) filtration (1); (c) crystallisation (1).\nSpec 2.7–2.8 (2.8: choose an appropriate technique from the properties of the components).');
  reg(s, '2.7–2.8 Choosing a method');
}

// ======================= 11 FILTRATION AND CRYSTALLISATION =======================
reg(D.contentSlide({
  title: 'Filtration and crystallisation',
  subtitle: 'Specification 2.7 • getting salt from rock salt',
  tag: '2.7', caption: 'left: filtration (residue stays in the paper); right: crystallisation over a water bath',
  draw: (s, p) => {
    label(s, 0.6, 1.45, 2.7, '**1 Filtration**', { size: 12, h: 0.28, color: C.blue });
    funnel(s, 1.9, 2.0, 1.3, 1.0, { residue: ['C9A66B', '8A6A3A'], drip: WAT[1], stem: 0.55 });
    conical(s, 1.9, 3.35, 1.4, 1.9, 0.35, WAT[0]);
    callout(s, 2.8, 2.15, 1.2, '**residue**', 1.95, 2.75, {});
    callout(s, 2.8, 4.75, 1.2, '**filtrate**', 2.2, 4.95, {});
    label(s, 3.6, 1.45, 2.8, '**2 Crystallisation**', { size: 12, h: 0.28, color: C.blue });
    tripodBunsen(s, 4.9, 3.95, 5.65, { hw: 0.75 });
    beaker(s, 4.25, 3.15, 1.3, 0.8, 0.6, WAT[0]);
    basin(s, 4.9, 3.0, 1.35, 0.4, 'EEF5FB');
    [[4.6, 2.85], [4.95, 2.75], [5.25, 2.9]].forEach(([x, y]) => { line(s, x, y, x + 0.05, y - 0.25, '9AA3B0', 1.25); });
    label(s, 3.6, 2.2, 1.0, 'steam', { size: 9.5, h: 0.24, color: C.grey });
    callout(s, 3.6, 3.5, 0.6, 'water bath', 4.25, 3.6, { size: 9.5 });
  },
  head: 'Method',
  lines: [
    '**Filtration:** pour the mixture through filter paper; the **insoluble** solid (residue) stays behind; the solution (filtrate) passes through.',
    '**Crystallisation:** heat the filtrate gently (water bath) to evaporate **some** of the water until crystals start to form; then **leave to cool** so crystals grow.',
    '**Filter** off and **dry** the crystals between filter papers.',
    'Do **not** heat to dryness: crystals may break down and spit.',
  ],
  worked: { head: 'Rock salt (salt + sand)', q: '',
    steps: [['Dissolve', 'add water and stir: salt dissolves, sand does not'], ['Filter', 'sand stays in the paper'], ['Crystallise', 'evaporate some water, cool, then dry the salt crystals']], size: 11 },
  workedH: 1.85,
  qc: 'Why is a **water bath** used to heat the evaporating basin?',
  notes: 'QUICK CHECK ANSWER: gentle, even heating / temperature cannot go above 100 °C (1); so the solution does not spit or the crystals do not decompose (1).\nSpec 2.7.',
}), '2.7 Filtration and crystallisation');

// ======================= 12 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Specification 2.5–2.8 • purity and separation', [
  { q: 'What does **pure** mean in chemistry?', marks: 1, ms: 'Contains only one substance / one element or compound (1).' },
  { q: 'Describe how you could use a melting point to check whether a sample is pure.', marks: 2, ms: 'Measure the melting point and compare it with the data-book value (1); pure melts sharply at that value; impure melts lower / over a range (1).' },
  { q: 'Describe how to separate sand from a mixture of sand and salt water.', marks: 2, ms: 'Filter (1); sand is left as the residue in the filter paper (1).' },
  { q: 'Explain why a solution is not heated to dryness when making crystals.', marks: 2, ms: 'Crystals form when the (saturated) solution cools / slowly (1); heating to dryness can decompose the crystals / remove water of crystallisation / cause spitting (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 13 SIMPLE DISTILLATION =======================
reg(D.contentSlide({
  title: 'Simple distillation',
  subtitle: 'Specification 2.7 • separating a solvent from a solution',
  tag: '2.7', caption: 'distilling water from salt water; the thermometer bulb is level with the side arm',
  draw: (s, p) => {
    tripodBunsen(s, 1.45, 4.85, 5.75, { hw: 0.6 });
    rbFlask(s, 1.45, 4.25, 0.55, 2.45, 'CFE4F7', 0.45);
    box(s, 1.36, 2.3, 0.18, 0.15, '5A3E2B', '3A2A1B');
    thermometer(s, 1.45, 1.6, 2.75);
    condenser(s, 1.55, 2.72, 4.85, 3.95);
    beaker(s, 4.65, 4.05, 1.1, 1.0, 0.3, 'EEF5FB');
    ball(s, 4.95, 3.98, 0.035, WAT[1], WAT[1]);
    callout(s, 2.2, 1.55, 1.6, '**thermometer**', 1.5, 1.8, {});
    callout(s, 0.55, 3.15, 0.8, 'salt water', 1.1, 4.4, { size: 9.5, align: 'right' });
    callout(s, 4.95, 5.25, 1.4, '**distillate** (pure water)', 5.1, 4.85, { size: 10 });
    callout(s, 3.5, 2.35, 1.4, '**condenser**', 3.2, 3.25, {});
  },
  head: 'How it works',
  lines: [
    'Heat the solution: the **solvent evaporates** (boils); the dissolved solid stays in the flask.',
    'The vapour passes into the **condenser**, where cold water cools it and it **condenses** back to a liquid.',
    'The pure liquid (**distillate**) is collected.',
    'Cold water enters the condenser at the **bottom** so the jacket fills completely.',
    '**Safety:** anti-bumping granules; never heat a sealed apparatus.',
  ],
  worked: { head: 'Check the product', q: 'How do you know the distillate is pure water?',
    steps: [['Test', 'measure its boiling point'], ['Answer', 'pure water boils at exactly 100 °C']], size: 11 },
  workedH: 1.5,
  qc: 'Why is the thermometer bulb placed at the **side arm**, not in the liquid?',
  notes: 'QUICK CHECK ANSWER: to measure the temperature of the vapour that is distilling over (1), which tells you which substance is being collected (1).\nSpec 2.7. Diagram follows the standard exam convention.',
}), '2.7 Simple distillation');

// ======================= 14 FRACTIONAL DISTILLATION =======================
reg(D.contentSlide({
  title: 'Fractional distillation',
  subtitle: 'Specification 2.7 • separating liquids with different boiling points',
  tag: '2.7', caption: 'separating ethanol (bp 78 °C) from water (bp 100 °C)',
  draw: (s, p) => {
    tripodBunsen(s, 1.3, 4.95, 5.75, { hw: 0.55 });
    rbFlask(s, 1.3, 4.45, 0.48, 4.0, 'E6EEF8', 0.45);
    box(s, 1.12, 1.95, 0.36, 2.15, GLASS, C.ink, { lw: 1.5 });
    for (let i = 0; i < 9; i++) for (let j = 0; j < 2; j++) ball(s, 1.21 + j * 0.18, 2.3 + i * 0.2 + (j * 0.1), 0.06, 'FFFFFF', '9AA3B0', 0.75);
    box(s, 1.2, 1.8, 0.2, 0.15, '5A3E2B', '3A2A1B');
    thermometer(s, 1.3, 1.25, 2.15);
    condenser(s, 1.45, 2.12, 4.75, 3.35, { labels: false });
    conical(s, 5.0, 3.35, 0.9, 1.3, 0.3, 'FFF6D6');
    callout(s, 2.0, 1.25, 1.8, '**78 °C** while ethanol distils', 1.38, 1.9, { size: 10 });
    callout(s, 2.3, 4.0, 1.6, '**fractionating column** (glass beads)', 1.5, 3.3, { size: 10 });
    label(s, 4.5, 4.75, 1.9, '**ethanol** collects first', { size: 10, h: 0.3 });
  },
  head: 'How it works',
  lines: [
    'The mixture is heated; the vapour rises up the **fractionating column**.',
    'The column is **hotter at the bottom**, cooler at the top. The liquid with the **higher boiling point condenses** and drips back.',
    'The liquid with the **lowest boiling point** reaches the top first, passes into the condenser and is collected.',
    'When the thermometer reading **rises**, change the collecting flask: the next fraction is coming over.',
    'Used for **crude oil** and **liquid air**.',
  ],
  worked: { head: 'Explain', q: 'Why can simple distillation not separate ethanol and water well?',
    steps: [['Both', 'evaporate when heated'], ['Close bp', '78 °C and 100 °C'], ['Answer', 'the column is needed to separate the vapours']], size: 11 },
  workedH: 1.75,
  qc: 'A mixture contains liquids that boil at **56 °C** and **118 °C**. Which is collected **first**? How would you know when to change the flask?',
  notes: 'QUICK CHECK ANSWER: the 56 °C liquid (1); when the thermometer reading rises above 56 °C (1).\nSpec 2.7.',
}), '2.7 Fractional distillation');

// ======================= 15 CHROMATOGRAPHY =======================
reg(D.contentSlide({
  title: 'Paper chromatography',
  subtitle: 'Specification 2.9–2.10 • mobile phase, stationary phase and Rf values',
  tag: '2.9–2.10', caption: 'left: running a chromatogram; right: measuring Rf (dye B)',
  draw: (s, p) => {
    beaker(s, 0.75, 2.0, 1.9, 3.3, 0.12, 'D9ECF7');
    box(s, 1.2, 1.7, 1.0, 3.4, 'FFFFFF', '8A8F99', { lw: 1 });
    line(s, 0.7, 1.7, 2.7, 1.7, '6B7385', 3);
    line(s, 1.25, 4.6, 2.15, 4.6, '6B7385', 1, { dash: 'dash' });
    oval(s, 1.5, 4.6, 0.16, 0.12, DYE.A, DYE.A); oval(s, 1.9, 4.6, 0.16, 0.12, '444444', '444444');
    callout(s, 2.85, 4.4, 1.5, 'pencil line', 2.15, 4.6, { size: 10 });
    callout(s, 2.85, 4.95, 1.5, 'solvent', 2.3, 5.05, { size: 10 });
    callout(s, 2.85, 1.95, 1.5, 'paper', 2.15, 2.3, { size: 10 });
    const c = chromPaper(s, 4.15, 1.6, 1.6, 3.6, [{ name: 'B', rfs: [0.70], cols: [DYE.B] }]);
    const x = 5.95;
    line(s, x, c.base, x, c.front, C.green, 1.5, { head: true, tail: true });
    line(s, x - 0.25, c.base, x - 0.25, c.base - 0.70 * c.dist, C.red, 1.5, { head: true, tail: true });
    label(s, x - 0.02, (c.base + c.front) / 2 - 0.3, 0.5, '**8.0 cm**', { size: 9.5, h: 0.24, color: C.green, align: 'left' });
    label(s, 3.8, c.base - 0.35 * c.dist, 0.5, '**5.6**', { size: 9.5, h: 0.24, color: C.red });
  },
  head: 'How it works',
  lines: [
    'The **stationary phase** is the paper; the **mobile phase** is the **solvent** moving up it.',
    'Each substance is **distributed** between the two phases. A substance that is more attracted to the **solvent** moves **further**.',
    'A **pure** substance gives **one spot**; a mixture gives several.',
    '**Rf = distance moved by the spot ÷ distance moved by the solvent**. Always less than 1.',
  ],
  worked: { head: 'Worked example', q: 'Dye B moved 5.6 cm; the solvent moved 8.0 cm. Find its Rf.',
    steps: [['Rf', '5.6 ÷ 8.0'], ['Answer', '0.70 (no units)']], size: 11 },
  workedH: 1.5,
  qc: 'A spot moves **3.9 cm** and the solvent front moves **6.5 cm**. Calculate the Rf value.',
  notes: 'QUICK CHECK ANSWER: 3.9 ÷ 6.5 (1) = 0.60 (1).\nOther checked values: a substance with Rf 0.45 and a 7.0 cm front travels 3.15 cm.\nSpec 2.9–2.10. Measure from the pencil line to the CENTRE of the spot.',
}), '2.9–2.10 Paper chromatography');

// ======================= 16 INTERPRETING CHROMATOGRAMS =======================
reg(D.contentSlide({
  title: 'Interpreting chromatograms',
  subtitle: 'Specification 2.10 • pure or impure; identifying substances',
  tag: '2.10', caption: 'a food colouring X compared with three known dyes (same solvent, same paper)',
  draw: (s, p) => {
    const c = chromPaper(s, 0.9, 1.55, 4.0, 4.1, [{ name: 'X', rfs: [0.30, 0.70], cols: [DYE.A, DYE.B] }, { name: 'A', rfs: [0.30], cols: [DYE.A] }, { name: 'B', rfs: [0.70], cols: [DYE.B] }, { name: 'C', rfs: [0.55], cols: [DYE.C] }]);
    label(s, 5.0, c.front - 0.14, 1.4, 'solvent front', { size: 9.5, h: 0.26, align: 'left', color: '2F7FC1' });
    label(s, 5.0, c.base - 0.14, 1.4, 'start line', { size: 9.5, h: 0.26, align: 'left', color: C.grey });
  },
  head: 'Reading the chromatogram',
  lines: [
    'X has **two spots**, so it is a **mixture** (impure).',
    'Spots at the **same height** (same Rf, same solvent) are probably the **same substance**.',
    'X contains **A** and **B**, but **not C**.',
    'A substance that does not move is **insoluble** in that solvent: try another solvent.',
  ],
  worked: { head: 'Use Rf values', q: 'An unknown spot has Rf 0.55 in this solvent. Identify it.',
    steps: [['Compare', 'A 0.30, B 0.70, C 0.55'], ['Answer', 'dye C']], size: 11 },
  workedH: 1.5,
  qc: 'Why must the reference dyes be run on the **same paper** with the **same solvent**?',
  notes: 'QUICK CHECK ANSWER: Rf values depend on the solvent (and paper / temperature) (1); so only results from the same conditions can be compared (1).\nSpec 2.10. Rf values (A 0.30, B 0.70, C 0.55) checked.',
}), '2.10 Interpreting chromatograms');

// ======================= 17 RECAP 3 =======================
const R3 = D.recapSlide(3, 'Specification 2.7–2.10 • distillation and chromatography', [
  { q: 'Explain the job of the **condenser** in simple distillation.', marks: 2, ms: 'It cools the vapour (1); so it condenses back to a liquid (1).' },
  { q: 'Explain why **fractional** distillation is used to separate ethanol and water.', marks: 2, ms: 'Both are liquids that evaporate (1); they have different (but close) boiling points, so the column is needed to separate them (1).' },
  { q: 'A spot moves **2.1 cm**; the solvent moves **7.0 cm**. Calculate the Rf value.', marks: 2, ms: '2.1 ÷ 7.0 (1); = 0.30 (1).' },
  { q: 'Name the **mobile phase** in paper chromatography.', marks: 1, ms: 'The solvent (1).' },
]);
reg(R3.s, 'Recap 3');

// ======================= 18 CP 2.11 METHOD =======================
{
  const s = D.contentSlide({
    title: 'Core Practical: investigating inks (method)',
    subtitle: 'Specification 2.11 • simple distillation and paper chromatography', cp: true,
    tag: '2.11 CP', caption: 'part 1 distils the solvent from the ink; part 2 separates the dyes',
    draw: (s, p) => {
      label(s, 0.6, 1.45, 2.8, '**Part 1: distil the ink**', { size: 11.5, h: 0.28, color: C.blue });
      tripodBunsen(s, 1.25, 4.6, 5.6, { hw: 0.5 });
      rbFlask(s, 1.25, 4.05, 0.48, 2.5, '4A3F8A', 0.45);
      box(s, 1.16, 2.35, 0.18, 0.15, '5A3E2B', '3A2A1B');
      thermometer(s, 1.25, 1.85, 2.75);
      condenser(s, 1.35, 2.72, 3.0, 3.5, { labels: false });
      tube(s, 2.85, 3.55, 0.3, 1.0, 0.35, 'EEF5FB');
      label(s, 0.6, 5.62, 2.8, 'thermometer reads **100 °C**: the solvent is water', { size: 9.5, h: 0.26, align: 'left' });
      label(s, 3.6, 1.45, 2.8, '**Part 2: chromatography**', { size: 11.5, h: 0.28, color: C.blue });
      beaker(s, 3.75, 2.05, 2.4, 3.3, 0.1, 'D9ECF7');
      box(s, 3.95, 1.8, 2.0, 3.4, 'FFFFFF', '8A8F99', { lw: 1 });
      line(s, 3.7, 1.8, 6.2, 1.8, '6B7385', 3);
      line(s, 4.0, 4.7, 5.9, 4.7, '6B7385', 1, { dash: 'dash' });
      [['ink', '333366'], ['A', DYE.A], ['B', DYE.B], ['C', DYE.C]].forEach(([n, col], i) => { const x = 4.25 + i * 0.47; oval(s, x, 4.7, 0.14, 0.1, col, col); label(s, x - 0.25, 4.8, 0.5, n, { size: 9, h: 0.22 }); });
      label(s, 3.75, 5.62, 2.6, 'solvent below the pencil line', { size: 9.5, h: 0.26, align: 'left' });
    },
    head: 'Method',
    lines: [
      '**1** Put ink in a flask with anti-bumping granules; set up for simple distillation and heat gently. Record the temperature at which the solvent distils.',
      '**2** Draw a **pencil** line 1–2 cm from the bottom of the paper. Spot the ink and known dyes on the line; let them dry and re-spot.',
      '**3** Stand the paper in a little solvent (below the line); cover. Remove when the solvent is near the top; **mark the solvent front**.',
      '**4** Measure each spot; calculate **Rf**.',
    ],
    worked: { head: 'Safety (CLEAPSS-style)', q: '',
      steps: [['Hazard', 'hot apparatus / ink is flammable if alcohol-based'], ['Control', 'heat gently; anti-bumping granules; eye protection; no flames near solvents']], size: 10.5 },
    workedH: 1.55,
    qc: 'Why is the start line drawn in **pencil**, not pen?',
    notes: 'QUICK CHECK ANSWER: pencil (graphite) is insoluble so it will not move up the paper / ink would dissolve and run, mixing with the spots (1).\nVariables: independent = substance spotted; dependent = distance moved / Rf; control = same paper, same solvent, same starting line, same temperature, lid on.\nSpec 2.11 Core Practical (number confirmed by search: Cognito, Save My Exams).',
  });
  reg(s, '2.11 CP method');
}

// ======================= 19 CP 2.11 RESULTS =======================
{
  const s = D.contentHeader('Core Practical: investigating inks (results)', 'Specification 2.11 • analyse the chromatogram; evaluate errors', { cp: true, tag: '2.11 CP' });
  const p = D.panel(s, 0.45, 1.3, 5.2, 4.95, 'illustrative chromatogram; solvent front 8.0 cm');
  const c = chromPaper(s, 0.85, 1.5, 4.0, 4.1, [{ name: 'ink', rfs: [0.30, 0.70], cols: [DYE.A, DYE.B] }, { name: 'A', rfs: [0.30], cols: [DYE.A] }, { name: 'B', rfs: [0.70], cols: [DYE.B] }, { name: 'C', rfs: [0.55], cols: [DYE.C] }]);
  const rows = [[HDR('Sample'), HDR('Spot (cm)'), HDR('Solvent (cm)'), HDR('Rf')],
    ...[['ink: spot 1', '2.4', '8.0', '0.30'], ['ink: spot 2', '5.6', '8.0', '0.70'], ['dye A', '2.4', '8.0', '0.30'], ['dye B', '5.6', '8.0', '0.70'], ['dye C', '4.4', '8.0', '0.55']].map((r, i) => r.map((c2, j) => tcell(c2, i, { bold: j === 0 || j === 3, align: j ? 'center' : 'left' })))];
  s.addTable(rows, { x: 5.9, y: 1.3, w: 6.98, colW: [2.0, 1.6, 1.8, 1.58], rowH: 0.36, fontFace: 'Calibri', fontSize: 11.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  D.card(s, 5.9, 3.65, 6.98, 2.6, 'Conclusion and errors', [
    'The ink is a **mixture** of dyes **A** and **B** (same Rf values); it does **not** contain C.',
    'Distillation: the solvent boiled at **100 °C**, so it is **water**.',
    '**Errors:** start line below the solvent (dyes wash off); spots too large (smear); solvent front not marked; measuring to the top of a spot instead of its centre.',
  ], { size: 11.5 });
  D.quickCheck(s, 'A student’s spots are below the solvent level when the paper is put in. What happens, and how should they fix it?');
  D.notes(s, 'QUICK CHECK ANSWER: the dyes dissolve into the solvent in the beaker instead of moving up the paper (1); draw the start line above the solvent level / use less solvent (1).\nAll Rf values checked in node. Spec 2.11.');
  reg(s, '2.11 CP results');
}

// ======================= 20 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Specification 2.11 • Core Practical: inks', [
  { q: 'Explain why a **lid** is placed over the chromatography beaker.', marks: 1, ms: 'To stop the solvent evaporating / keep the air saturated with solvent vapour (1).' },
  { q: 'Explain why the spots must be **above** the solvent level at the start.', marks: 1, ms: 'Otherwise the dyes dissolve into the solvent in the beaker (1).' },
  { q: 'Describe how the chromatogram shows that an ink contains dye A.', marks: 2, ms: 'The ink has a spot at the same height / same Rf as dye A (1); in the same solvent / same paper (1).' },
  { q: 'Give **one** hazard in distilling ink and a precaution.', marks: 2, ms: 'Hazard, e.g. hot apparatus / flammable solvent / bumping (1); matching precaution, e.g. heat gently, use anti-bumping granules, no naked flame near flammable solvent (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 21 POTABLE WATER =======================
{
  const s = D.contentHeader('Making water potable', 'Specification 2.12 • safe to drink: sedimentation, filtration, chlorination', { tag: '2.12' });
  const col = [['DCE8F7', '7A9CC9'], ['FFF1D6', 'D9A441'], ['EFE6FA', 'A58BD1'], ['E1F3E6', '4E9A65']];
  const steps = [
    ['Source', 'ground water or waste water: contains solids, microbes'],
    ['Sedimentation', 'large insoluble particles sink to the bottom of a tank'],
    ['Filtration', 'beds of sand and gravel remove small insoluble particles'],
    ['Chlorination', 'chlorine kills harmful microorganisms (bacteria)'],
  ];
  steps.forEach(([h, t], i) => {
    const x = 0.55 + i * 3.1;
    flowBox(s, x, 1.45, 2.65, 1.6, h, t, col[i]);
    if (i < 3) arrow(s, x + 2.68, 2.25, x + 3.07, 2.25, C.ink, 2);
  });
  label(s, 0.55, 3.15, 12.2, '→ **potable** water: safe to drink (but **not** pure: it still contains dissolved substances)', { size: 13, h: 0.4, color: C.green });
  flowBox(s, 0.55, 3.75, 2.65, 1.3, 'Sea water', 'too much dissolved salt to drink', ['DCE8F7', '7A9CC9']);
  arrow(s, 3.23, 4.4, 3.62, 4.4, C.ink, 2);
  flowBox(s, 3.65, 3.75, 2.65, 1.3, 'Distillation', 'water evaporates, salt is left; vapour condensed', ['F9E0DA', 'C2685A']);
  D.card(s, 6.75, 3.75, 6.1, 2.5, 'Key points', [
    '**Potable** means **safe to drink**: low levels of microbes and dissolved salts.',
    '**Desalination** by distillation needs a lot of **energy**, so it is expensive; used where fresh water is scarce.',
    'Chlorine (or ozone, UV) is used because filtration **does not remove microorganisms**.',
  ], { size: 11.5 });
  D.quickCheck(s, 'Explain why water is **filtered before** it is chlorinated.');
  D.notes(s, 'QUICK CHECK ANSWER: filtration removes insoluble particles (1); which would otherwise shield microbes / use up chlorine, so chlorination works better on clear water (1).\nSpec 2.12 (number confirmed by search: CCHSG revision sheet; Tutordex).');
  reg(s, '2.12 Potable water');
}

// ======================= 22 WATER FOR ANALYSIS =======================
reg(D.contentSlide({
  title: 'Water for chemical analysis',
  subtitle: 'Specification 2.13 • why tap water is not good enough',
  tag: '2.13', caption: 'tap water contains dissolved ions; distilled or deionised water does not',
  draw: (s, p) => {
    [[0.9, 'tap water', [['Ca²⁺', 'F2C9E0'], ['Cl⁻', 'B9E0A8'], ['Mg²⁺', 'F7E08A'], ['SO₄²⁻', 'F5D1A0'], ['Na⁺', 'DCE8F7']]], [3.75, 'distilled water', []]].forEach(([x, t, ions]) => {
      beaker(s, x, 2.0, 2.0, 2.6, 0.8, 'E3F0FA');
      label(s, x, 4.7, 2.0, `**${t}**`, { size: 12, h: 0.3 });
      ions.forEach(([n, col], i) => { const cx = x + 0.4 + (i % 3) * 0.6, cy = 3.0 + Math.floor(i / 3) * 0.75; ball(s, cx, cy, 0.22, col, '6B7385', 1); label(s, cx - 0.3, cy - 0.13, 0.6, `**${n}**`, { size: 9, h: 0.26 }); });
    });
    label(s, 3.75, 3.2, 2.0, 'only H₂O molecules', { size: 11, h: 0.4, italic: true, color: C.grey });
  },
  head: 'Key ideas',
  lines: [
    'Tap water is **potable** but contains **dissolved salts** (ions such as Ca²⁺, Mg²⁺, Cl⁻, SO₄²⁻).',
    'In chemical analysis these ions could **react** with the chemicals being tested, or give **false positive** results (e.g. a white precipitate in a chloride test).',
    'So analysis uses **distilled** or **deionised** water, which has **no dissolved salts**.',
  ],
  worked: { head: 'Explain', q: 'A student tests a solution for chloride ions using tap water. Why might the result be wrong?',
    steps: [['Tap water', 'already contains Cl⁻ ions'], ['Effect', 'silver nitrate gives a precipitate anyway'], ['Answer', 'false positive: use distilled water']], size: 11 },
  workedH: 1.75,
  qc: 'How could you show that a sample of water has **no dissolved solids**?',
  notes: 'QUICK CHECK ANSWER: evaporate a sample to dryness (1); no solid residue is left / OR it boils at exactly 100 °C (1).\nSpec 2.13.',
}), '2.13 Water for analysis');

// ======================= 23 RECAP 5 =======================
const R5 = D.recapSlide(5, 'Specification 2.12–2.13 • water', [
  { q: 'Name the **three** stages used to make ground water potable, in order.', marks: 3, ms: 'Sedimentation (1); filtration (1); chlorination (1).' },
  { q: 'State the purpose of **chlorination**.', marks: 1, ms: 'To kill (harmful) microorganisms / bacteria (1).' },
  { q: 'Explain why sea water must be **distilled** before drinking.', marks: 2, ms: 'It contains (high levels of) dissolved salts (1); filtration cannot remove dissolved substances, distillation leaves the salt behind (1).' },
  { q: 'Why is **deionised** water used in chemical analysis?', marks: 1, ms: 'It contains no dissolved ions/salts that could interfere with the results (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= 24 KEY WORDS =======================
reg(D.keyWords([
  ['Melting / freezing', 'Solid → liquid / liquid → solid.'],
  ['Evaporating / condensing', 'Liquid → gas / gas → liquid.'],
  ['Physical change', 'No new substance; can be reversed.'],
  ['Pure substance', 'Contains only one element or compound.'],
  ['Mixture', 'Substances not chemically joined.'],
  ['Filtration', 'Separates an insoluble solid from a liquid.'],
  ['Residue / filtrate', 'Solid left in the paper / liquid through it.'],
  ['Crystallisation', 'Gets a soluble solid from a solution.'],
  ['Simple distillation', 'Separates a solvent from a solution.'],
  ['Fractional distillation', 'Separates liquids with different boiling points.'],
  ['Stationary phase', 'The paper in chromatography.'],
  ['Mobile phase', 'The solvent that moves up the paper.'],
  ['Rf value', 'Spot distance ÷ solvent distance.'],
  ['Potable water', 'Water that is safe to drink.'],
  ['Chlorination', 'Adding chlorine to kill microorganisms.'],
  ['Deionised water', 'Water with no dissolved ions.'],
], { notes: 'Cover-and-recall activity.' }), 'Summary: key words');

// ======================= 25 FULL QUESTION =======================
reg(D.fullQuestion('A student investigates a black ink. First she **distils** a sample; then she runs a **paper chromatogram** of the ink beside two known dyes, P and Q.', [
  { l: 'a', q: 'The thermometer reads **100 °C** while liquid distils over. Identify the liquid and explain your answer.', marks: 2, ms: 'Water (1); pure water boils at 100 °C (1).' },
  { l: 'b', q: 'Give the job of the **condenser**.', marks: 1, ms: 'Cools the vapour so it condenses (to a liquid) (1).' },
  { l: 'c', q: 'Explain why the start line is drawn in **pencil** and placed **above** the solvent.', marks: 2, ms: 'Pencil does not dissolve / move with the solvent (1); above the solvent so the ink does not dissolve into the solvent in the beaker (1).' },
  { l: 'd', q: 'One spot moved **3.0 cm**; the solvent moved **7.5 cm**. Calculate its Rf value.', marks: 2, ms: '3.0 ÷ 7.5 (1); = 0.40 (1).' },
  { l: 'e', q: 'The ink gives three spots. Two match P and Q. What can she conclude?', marks: 2, ms: 'The ink is a mixture of (at least) three dyes (1); it contains P and Q plus one other dye (not tested / unknown) (1).' },
  { l: 'f', q: 'Ethanol (bp 78 °C) and water (bp 100 °C) are mixed. Explain how fractional distillation separates them.', marks: 3, ms: 'Heat: both evaporate and the vapour rises up the column (1); water (higher bp) condenses in the column and drips back (1); ethanol reaches the top first at 78 °C, condenses in the condenser and is collected (1).', h: 1.2 },
  { l: 'g', q: 'Explain why she must use **distilled** water, not tap water, for any solutions in a chemical test.', marks: 1, ms: 'Tap water contains dissolved ions/salts that could interfere / give false results (1).' },
], 13, { subtitle: 'Specification 2.7–2.13 • answer every part • 13 marks' }), 'Full question');

// ======================= 26–27 HOMEWORK =======================
const HW = [
  { n: '1', q: 'Name the change of state when a **gas becomes a liquid**.', marks: 1, ms: 'Condensing / condensation (1).', h: 0.7 },
  { n: '2', q: 'Mercury melts at **−39 °C** and boils at **357 °C**. Give its state at **−50 °C** and at **400 °C**.', marks: 2, ms: 'Solid (1); gas (1).', h: 0.8 },
  { n: '3', q: 'A spot moves **4.2 cm** and the solvent moves **8.4 cm**. Calculate the Rf value.', marks: 2, ms: '4.2 ÷ 8.4 (1); = 0.50 (1).', h: 0.8 },
  { n: '4', q: 'Explain how a **melting point** measurement shows whether a sample is pure.', marks: 2, ms: 'Pure: melts at a sharp / exact temperature matching the data book (1); impure: lower and over a range (1).', h: 0.85 },
  { n: '5', q: 'Describe the **four** steps used to make ground water safe to drink, and the purpose of each.', marks: 4, ms: 'Choose a source / reservoir (1); sedimentation: large particles settle (1); filtration through sand: removes small insoluble particles (1); chlorination: kills microorganisms (1).', h: 1.1 },
  { n: '6', q: 'Describe how to obtain **pure, dry salt crystals** from **rock salt** (salt mixed with sand). Explain why each step is done.', marks: 6, levels: true, h: 1.45, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Grind the rock salt (pestle and mortar) to break up the lumps / increase surface area.',
    'Add water and stir (warm) so that the salt dissolves; sand does not dissolve.',
    'Filter: sand stays in the filter paper as the residue; salt solution passes through as the filtrate.',
    'Heat the filtrate gently in an evaporating basin (water bath) to evaporate some of the water until crystals start to form.',
    'Leave to cool so that crystals form; do not heat to dryness (spitting / smaller crystals).',
    'Filter off the crystals and dry them between filter papers or in a warm oven.',
    'Safety: eye protection; care with hot apparatus.',
  ], 'Level 3 answers give the steps in a logical order AND explain the purpose of dissolving, filtering and crystallising.');
}
D.homework('Answer every question. Show your working for calculations.', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
[R1, R2, R3, R4, R5].forEach((r, i) => console.log(`recap ${i + 1}: ${r.total} marks`));
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 6); assert.strictEqual(R5.total, 7);
assert(D.slideNo >= 24 && D.slideNo <= 34, 'slide count ' + D.slideNo);
const out = path.join(__dirname, 'EDX_1CH0_T2_StatesMixtures.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
