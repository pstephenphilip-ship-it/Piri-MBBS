// build_B4_2.js — OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260)
// Chapter B4 Using food and controlling growth, B4.2 How do we know about mitochondria and other cell structures?
// (one deck, Higher & Foundation). Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_B4_2.js
// Structure copied from build_B4_1.js. ocr_bio_template.js is NOT edited by this deck: deck-only helpers (big cells,
// bacterium, microscope, micrograph views, graticule, slide preparation apparatus) are in the DECK-SPECIFIC block.
'use strict';
const path = require('path');
const assert = require('assert');
const T = require('./ocr_bio_template');
const { calc, sf, C } = T;

const DECK = {
  chapter: 'B4', chapterTitle: 'Using food and controlling growth', code: 'B4.2', title: 'How do we know about mitochondria and other cell structures?',
  part: 2, parts: 3, specRange: 'B4.2.1',
  subtitle: 'Cells, microscopes and the evidence for organelles',
  keywords: ['Eukaryotic', 'Prokaryotic', 'Organelles', 'Magnification', 'Resolution', 'Electron microscope', 'µm and nm'],
};
const D = T.init(DECK);
const { line, arrow, label, box, SH } = D;
const sp = D.spec;
const SLIDES = [];
const reg = (s, name) => { SLIDES.push(`${s._no}. ${name}`); return s; };

// ======================= CALCULATIONS (asserted) =======================
const MM_UM = 1000, UM_NM = 1000;
// starter
calc('starter 3.5 mm in µm', 3.5 * MM_UM, 3500);
// slide 8 units
calc('0.06 mm → µm', 0.06 * MM_UM, 60, 1e-9);
calc('2500 nm → µm', 2500 / UM_NM, 2.5, 1e-12);
calc('QC 0.25 mm → µm', 0.25 * MM_UM, 250, 1e-9);
calc('QC 25 nm → µm', 25 / UM_NM, 0.025, 1e-12);
// slide 9 standard form (HT)
const SIZES = { atom: 1e-10, ribosome: 2.5e-8, virus: 1e-7, mito: 2e-6, bact: 2e-6, chloro: 5e-6, cheek: 6e-5, onion: 2.5e-4, eye: 1e-4 };
calc('ribosome 25 nm in m', 25 * 1e-9, 2.5e-8, 1e-20);
calc('cheek 60 µm in m', 60 * 1e-6, 6e-5, 1e-18);
const cheekRib = calc('cheek ÷ ribosome', SIZES.cheek / SIZES.ribosome, 2400, 1e-6);
calc('order of magnitude cheek/ribosome', Math.round(Math.log10(cheekRib)), 3);
calc('onion 250 µm in m', 250e-6, 2.5e-4, 1e-18);
calc('QC onion ÷ bacterium', SIZES.onion / SIZES.bact, 125, 1e-9);
calc('QC order onion/bact', Math.round(Math.log10(125)), 2);
// slide 11 total magnification
const objs = [4, 10, 40];
objs.forEach(o => calc(`total mag ×10 × ${o}`, 10 * o, { 4: 40, 10: 100, 40: 400 }[o]));
// slide 12 resolution ratio
const resLM = 200, resEM = 0.2; // nm
calc('resolution ratio 200 / 0.2', resLM / resEM, 1000, 1e-9);
calc('mag ratio 2 000 000 / 2000', 2e6 / 2000, 1000);
// slide 15 magnification
const mitoImg = 40, mitoReal = 2; // mm, µm
const mitoMag = calc('mito mag 40 mm ÷ 2 µm', mitoImg * MM_UM / mitoReal, 20000);
const cheekReal = calc('QC cheek 24 mm ÷ 400 (mm)', 24 / 400, 0.06, 1e-12);
calc('QC cheek in µm', cheekReal * MM_UM, 60, 1e-9);
// slide 16 scale bar
const barMM = 20, barUM = 5, chlMM = 18;
const sbMag = calc('scale bar mag 20 mm ÷ 5 µm', barMM * MM_UM / barUM, 4000);
const chlReal = calc('chloroplast real 18 mm ÷ 4000', chlMM * MM_UM / sbMag, 4.5, 1e-9);
calc('chloroplast in m (HT)', chlReal * 1e-6, 4.5e-6, 1e-18);
calc('QC ribosome image 5 mm ÷ 200 000 → nm', 5 / 200000 * 1e6, 25, 1e-9);
calc('QC ribosome in m', 5 / 200000 / 1000, 2.5e-8, 1e-20);
// PAG B1 graticule
const stageDiv = 10; // µm per stage-micrometer division
const epu400 = calc('×400: 10 stage divisions = 40 epu → µm per epu', 10 * stageDiv / 40, 2.5, 1e-12);
const epu100 = calc('×100: 10 stage divisions = 10 epu → µm per epu', 10 * stageDiv / 10, 10, 1e-12);
const cheekEPU = [24, 22, 26, 23, 25], onionEPU = [26, 23, 25, 27, 24];
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const cheekMean = calc('mean cheek epu', mean(cheekEPU), 24, 1e-12);
const onionMean = calc('mean onion epu', mean(onionEPU), 25, 1e-12);
const cheekUM = calc('cheek size µm', cheekMean * epu400, 60, 1e-9);
const onionUM = calc('onion size µm', onionMean * epu100, 250, 1e-9);
calc('cheek range', Math.max(...cheekEPU) * epu400 - Math.min(...cheekEPU) * epu400, 10, 1e-9);
calc('onion drawing ×100: 250 µm → image mm', onionUM * 100 / MM_UM, 25, 1e-9);
// recaps
calc('R2 0.04 mm → µm', 0.04 * MM_UM, 40, 1e-9);
calc('R2 25 nm → µm', 25 / UM_NM, 0.025, 1e-12);
calc('R2 bacteria across 1 mm', 1 * MM_UM / 2, 500);
calc('R2 cheek ÷ mito', 60 / 2, 30);
calc('R4 total ×10 × 40', 10 * 40, 400);
calc('R4 36 mm ÷ 1200 in µm', 36 / 1200 * MM_UM, 30, 1e-9);
calc('R4 bar 10 mm = 2 µm → mag', 10 * MM_UM / 2, 5000);
calc('R5 40 epu = 100 µm; 24 epu', 24 * (100 / 40), 60, 1e-9);
// full question
calc('FQ ×10 × 40', 10 * 40, 400);
calc('FQ 100 mm ÷ 400 = mm', 100 / 400, 0.25, 1e-12);
calc('FQ 0.25 mm = µm', 0.25 * MM_UM, 250, 1e-9);
calc('FQ 250 µm in m', 250 * 1e-6, 2.5e-4, 1e-18);
// homework
calc('HW 0.5 mm → µm', 0.5 * MM_UM, 500, 1e-9);
calc('HW 3000 nm → µm', 3000 / UM_NM, 3, 1e-12);
calc('HW mito 30 mm ÷ 2 µm', 30 * MM_UM / 2, 15000);
calc('HW bacterium ÷ virus', 2e-6 / 1e-7, 20, 1e-9);
calc('HW order bact/virus', Math.round(Math.log10(20)), 1);

// ======================= DECK-SPECIFIC drawing helpers (not in ocr_bio_template.js) =======================
function ball(s, cx, cy, r, fill, edge, lw = 0.75) { s.addShape(SH.OVAL, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: fill ? { color: fill } : { type: 'none' }, line: { color: edge || fill, width: lw } }); }
function poly(s, pts, fill, edge, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), y0 = Math.min(...ys), w = Math.max(...xs) - x0 || 0.01, h = Math.max(...ys) - y0 || 0.01;
  const P = pts.map(([x, y]) => ({ x: x - x0, y: y - y0 }));
  if (o.open !== true) P.push({ close: true });
  s.addShape(SH.CUSTOM_GEOMETRY, { x: x0, y: y0, w, h, points: P,
    fill: fill ? { color: fill, transparency: o.tr || 0 } : { type: 'none' }, line: edge ? { color: edge, width: o.lw || 1 } : { type: 'none' } });
}
// deterministic pseudo-random numbers
let SEED = 11;
const rnd = () => { SEED = (SEED * 16807) % 2147483647; return SEED / 2147483647; };
// ribosome dots inside an ellipse (or rect), avoiding circles [cx, cy, r] and rects [x, y, w, h]
function ribosomes(s, shape, n, o = {}) {
  const r = o.r || 0.028, col = o.color || '3F2A5C', pts = [];
  let tries = 0;
  while (pts.length < n && tries < 5000) {
    tries++;
    let x, y;
    if (shape.ell) { const [cx, cy, rx, ry] = shape.ell; x = cx + (rnd() * 2 - 1) * rx; y = cy + (rnd() * 2 - 1) * ry; if (((x - cx) / (rx - 0.08)) ** 2 + ((y - cy) / (ry - 0.08)) ** 2 > 1) continue; }
    else { const [rx0, ry0, rw, rh] = shape.rect; x = rx0 + rnd() * rw; y = ry0 + rnd() * rh; }
    if ((o.avoidC || []).some(([ax, ay, ar]) => Math.hypot(x - ax, y - ay) < ar + r * 1.5)) continue;
    if ((o.avoidR || []).some(([ax, ay, aw, ah]) => x > ax - r * 1.5 && x < ax + aw + r * 1.5 && y > ay - r * 1.5 && y < ay + ah + r * 1.5)) continue;
    if (pts.some(([px_, py_]) => Math.hypot(x - px_, y - py_) < r * 3.2)) continue;
    pts.push([x, y]);
  }
  pts.forEach(([x, y]) => ball(s, x, y, r, col, col, 0.25));
  return pts;
}
// label with a leader line from (ax, ay) to a label anchored at (lx, ly). side: 'left' | 'right' | 'top' | 'bottom'
function lead(s, ax, ay, lx, ly, text, side = 'right', o = {}) {
  const w = o.w || 1.4, h = o.h || 0.26, col = o.color || C.ink;
  line(s, ax, ay, lx, ly, o.lineColor || '4A5262', 0.9);
  ball(s, ax, ay, 0.022, o.lineColor || '4A5262', o.lineColor || '4A5262', 0.25);
  if (side === 'right') label(s, lx + 0.05, ly - h / 2, w, text, { h, size: o.size || 10.5, bold: true, color: col, align: 'left' });
  else if (side === 'left') label(s, lx - w - 0.05, ly - h / 2, w, text, { h, size: o.size || 10.5, bold: true, color: col, align: 'right' });
  else if (side === 'top') label(s, lx - w / 2, ly - h - 0.02, w, text, { h, size: o.size || 10.5, bold: true, color: col });
  else label(s, lx - w / 2, ly + 0.02, w, text, { h, size: o.size || 10.5, bold: true, color: col });
}
// large animal cell with ribosomes; returns anchors
function bigAnimalCell(s, x, y, w, h) {
  const cx = x + w / 2, cy = y + h / 2, rx = w / 2, ry = h / 2;
  s.addShape(SH.OVAL, { x, y, w, h, fill: { color: C.cyto }, line: { color: C.membrane, width: 2.5 } });
  const nr = Math.min(w, h) * 0.2, ncx = x + w * 0.45, ncy = y + h * 0.44;
  ball(s, ncx, ncy, nr, C.nucleus, C.nucleusEdge, 1.5);
  s.addShape(SH.OVAL, { x: ncx - nr * 0.32, y: ncy - nr * 0.28, w: nr * 0.6, h: nr * 0.55, fill: { color: C.nucleusEdge, transparency: 40 }, line: { type: 'none' } });
  const mw = Math.min(w, h) * 0.24;
  const mito = [[0.74, 0.3, 35], [0.72, 0.72, -25], [0.3, 0.78, 15], [0.27, 0.22, -40]];
  const mpts = mito.map(([fx, fy, r]) => { const mx = x + w * fx, my = y + h * fy; D.mitochondrion(s, mx, my, mw, mw * 0.48, { rot: r }); return [mx, my]; });
  const rib = ribosomes(s, { ell: [cx, cy, rx, ry] }, 34, { avoidC: [[ncx, ncy, nr + 0.03], ...mpts.map(([a, b]) => [a, b, mw * 0.55])] });
  return { nucleus: [ncx, ncy, nr], mito: mpts, rib, membrane: (deg) => [cx + rx * Math.cos(deg * Math.PI / 180), cy + ry * Math.sin(deg * Math.PI / 180)], cyto: [x + w * 0.5, y + h * 0.88] };
}
// large plant cell (palisade-like): wall, membrane, cytoplasm, permanent vacuole, nucleus, chloroplasts, mitochondria, ribosomes
function bigPlantCell(s, x, y, w, h) {
  s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: 0.1, fill: { color: 'D9EBC8' }, line: { color: C.wall, width: 4 } });
  const t = 0.09;
  s.addShape(SH.ROUNDED_RECTANGLE, { x: x + t, y: y + t, w: w - 2 * t, h: h - 2 * t, rectRadius: 0.08, fill: { color: C.cyto }, line: { color: C.membrane, width: 1.5 } });
  const vx = x + w * 0.2, vy = y + h * 0.16, vw = w * 0.6, vh = h * 0.62;
  s.addShape(SH.ROUNDED_RECTANGLE, { x: vx, y: vy, w: vw, h: vh, rectRadius: 0.18, fill: { color: C.vacuole }, line: { color: '7FA9C4', width: 1.25 } });
  const nr = Math.min(w, h) * 0.13, ncx = x + w * 0.68, ncy = y + h * 0.88;
  ball(s, ncx, ncy, nr, C.nucleus, C.nucleusEdge, 1.5);
  s.addShape(SH.OVAL, { x: ncx - nr * 0.3, y: ncy - nr * 0.28, w: nr * 0.6, h: nr * 0.55, fill: { color: C.nucleusEdge, transparency: 40 }, line: { type: 'none' } });
  const cw = w * 0.15, chh = cw * 0.55, cpts = [];
  [[0.1, 0.12, 90], [0.1, 0.42, 90], [0.1, 0.72, 90], [0.9, 0.2, 90], [0.9, 0.5, 90], [0.5, 0.075, 0], [0.3, 0.9, 0]].forEach(([fx, fy, r]) => {
    const cx = x + w * fx, cy = y + h * fy;
    s.addShape(SH.OVAL, { x: cx - cw / 2, y: cy - chh / 2, w: cw, h: chh, rotate: r, fill: { color: C.chloro }, line: { color: C.chloroEdge, width: 1 } });
    if (r === 0) [-0.22, 0, 0.22].forEach(d => line(s, cx + d * cw, cy - chh * 0.2, cx + d * cw, cy + chh * 0.2, C.chloroEdge, 1.5));
    else [-0.22, 0, 0.22].forEach(d => line(s, cx - chh * 0.2, cy + d * cw, cx + chh * 0.2, cy + d * cw, C.chloroEdge, 1.5));
    cpts.push([cx, cy]);
  });
  const mw = w * 0.16;
  const mpts = [[0.9, 0.78, 80], [0.1, 0.93, 0]].map(([fx, fy, r]) => { const mx = x + w * fx, my = y + h * fy; D.mitochondrion(s, mx, my, mw, mw * 0.48, { rot: r }); return [mx, my]; });
  const rib = ribosomes(s, { rect: [x + t + 0.05, y + t + 0.05, w - 2 * t - 0.1, h - 2 * t - 0.1] }, 26, {
    avoidR: [[vx, vy, vw, vh]], avoidC: [[ncx, ncy, nr + 0.03], ...cpts.map(([a, b]) => [a, b, cw * 0.55]), ...mpts.map(([a, b]) => [a, b, mw * 0.55])] });
  return { wall: [x + w, y + h * 0.06], membrane: [x + w - t, y + h * 0.35], vacuole: [vx + vw * 0.7, vy + vh * 0.5], nucleus: [ncx, ncy, nr], chloro: cpts, mito: mpts, rib, cyto: [x + w * 0.88, y + h * 0.66] };
}
// bacterium (rod): wall, membrane, cytoplasm, DNA loop, plasmids, ribosomes, flagellum
function bacterium(s, x, y, w, h, o = {}) {
  // flagellum
  const fx0 = x + w, fy0 = y + h / 2, fpts = [];
  for (let i = 0; i <= 30; i++) fpts.push([fx0 + i * (o.flag || 1.0) / 30, fy0 + 0.1 * Math.sin(i / 30 * 4 * Math.PI)]);
  for (let i = 0; i < 30; i++) line(s, fpts[i][0], fpts[i][1], fpts[i + 1][0], fpts[i + 1][1], '6E5232', 2);
  s.addShape(SH.ROUNDED_RECTANGLE, { x, y, w, h, rectRadius: h / 2, fill: { color: 'E7DDF0' }, line: { color: '7A5BA6', width: 4 } });
  const t = Math.min(0.11, h * 0.08);
  s.addShape(SH.ROUNDED_RECTANGLE, { x: x + t, y: y + t, w: w - 2 * t, h: h - 2 * t, rectRadius: (h - 2 * t) / 2, fill: { color: C.cyto }, line: { color: C.membrane, width: 1.5 } });
  // DNA loop: tangled closed curve
  const cx = x + w * 0.46, cy = y + h * 0.5, rx = w * 0.24, ry = h * 0.27, pts = [];
  for (let i = 0; i < 90; i++) {
    const th = i / 90 * 2 * Math.PI, k = 1 + 0.16 * Math.sin(7 * th) + 0.08 * Math.cos(3 * th + 0.6);
    pts.push([cx + rx * k * Math.cos(th), cy + ry * k * Math.sin(th)]);
  }
  poly(s, pts, null, C.nucleusEdge, { lw: 2 });
  // plasmids
  const pl = [[x + w * 0.83, y + h * 0.3, 0.12], [x + w * 0.8, y + h * 0.7, 0.09], [x + w * 0.14, y + h * 0.36, 0.1]];
  pl.forEach(([a, b, r]) => ball(s, a, b, r, null, C.red, 2));
  const rib = ribosomes(s, { rect: [x + h * 0.3, y + t + 0.08, w - h * 0.6, h - 2 * t - 0.16] }, o.nrib || 30, { r: 0.024,
    avoidC: [...pl.map(([a, b, r]) => [a, b, r + 0.02])], avoidR: [[cx - rx * 1.25, cy - ry * 1.25, rx * 2.5, ry * 2.5]] });
  return { wall: [x + w * 0.3, y], membrane: [x + w * 0.62, y + t], dna: [cx + rx * 1.0, cy - ry * 0.6], plasmid: pl, rib, cyto: [x + w * 0.66, y + h * 0.88], flag: fpts[22] };
}
// light microscope (native shapes). (x0, y0) top-left, k = scale. About 2.9k wide × 4.55k tall. Returns label anchors.
function microscope(s, x0, y0, k = 1) {
  const X = v => x0 + v * k, Y = v => y0 + v * k;
  // arm (behind)
  poly(s, [[X(2.15), Y(4.2)], [X(2.65), Y(4.2)], [X(2.65), Y(1.35)], [X(2.25), Y(0.78)], [X(1.6), Y(0.78)], [X(1.6), Y(1.3)], [X(2.0), Y(1.3)], [X(2.15), Y(1.6)]], '7C8598', '4A5262', { lw: 1.25 });
  // base
  box(s, X(0.3), Y(4.2), 2.6 * k, 0.36 * k, '4A5262', '2F3542', { shape: SH.ROUNDED_RECTANGLE, r: 0.08 });
  // light source
  box(s, X(0.98), Y(3.72), 0.64 * k, 0.48 * k, '6B7385', '4A5262', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  ball(s, X(1.3), Y(3.93), 0.15 * k, 'FFE066', 'B8930A', 1.25);
  line(s, X(1.3), Y(3.7), X(1.3), Y(3.38), 'E3B505', 2, { dash: 'dash' });
  // condenser
  box(s, X(1.08), Y(3.18), 0.44 * k, 0.18 * k, '8C96A8', '4A5262');
  // stage + hole + glass slide + clips
  box(s, X(0.25), Y(3.0), 2.4 * k, 0.18 * k, '5A6275', '2F3542');
  box(s, X(1.17), Y(3.0), 0.26 * k, 0.18 * k, 'FFF1A8', '2F3542', { lw: 0.5 });
  box(s, X(0.75), Y(2.93), 1.1 * k, 0.07 * k, 'DDEEF7', '5B9BD5', { lw: 0.75 });
  [[0.38, 0.92], [1.68, 2.22]].forEach(([a, b]) => { box(s, X(a), Y(2.86), (b - a) * k, 0.06 * k, '2F3542', '2F3542'); ball(s, X(a + 0.03), Y(2.89), 0.06 * k, '2F3542', '2F3542'); });
  // focus knobs
  ball(s, X(2.4), Y(2.22), 0.25 * k, '4A5262', '2F3542', 1.25);
  ball(s, X(2.4), Y(2.22), 0.08 * k, '8C96A8', '2F3542', 0.5);
  ball(s, X(2.4), Y(2.75), 0.14 * k, 'AEB6C4', '4A5262', 1.25);
  // body tube + eyepiece
  box(s, X(1.0), Y(0.55), 0.6 * k, 1.38 * k, 'C5CCD6', '5A6275', { lw: 1.25 });
  box(s, X(1.08), Y(0.08), 0.44 * k, 0.5 * k, '8C96A8', '4A5262', { lw: 1.25 });
  box(s, X(1.03), Y(0.0), 0.54 * k, 0.12 * k, '4A5262', '2F3542', { shape: SH.ROUNDED_RECTANGLE, r: 0.03 });
  // nosepiece + objectives (the in-use, longest one is over the stage hole)
  poly(s, [[X(0.82), Y(1.92)], [X(1.78), Y(1.92)], [X(1.66), Y(2.14)], [X(0.94), Y(2.14)]], '5A6275', '2F3542', { lw: 1 });
  [[0.9, 0.18, 0.26, C.red], [1.18, 0.24, 0.56, '2B4C9B'], [1.5, 0.2, 0.4, 'E3B505']].forEach(([a, bw, len, band]) => {
    box(s, X(a), Y(2.14), bw * k, len * k, 'AEB6C4', '4A5262', { lw: 1 });
    box(s, X(a), Y(2.14) + len * k * 0.45, bw * k, 0.05 * k, band, null);
    box(s, X(a) + bw * k * 0.15, Y(2.14) + len * k - 0.03, bw * k * 0.7, 0.05 * k, '2F3542', null);
  });
  return {
    eyepiece: [X(1.08), Y(0.33)], tube: [X(1.6), Y(1.65)], objectives: [X(0.9), Y(2.3)], stage: [X(0.25), Y(3.09)], clip: [X(0.42), Y(2.89)],
    light: [X(0.98), Y(3.95)], coarse: [X(2.6), Y(2.08)], fine: [X(2.53), Y(2.78)], arm: [X(2.65), Y(3.6)], base: [X(2.9), Y(4.38)], slide: [X(1.85), Y(2.96)], condenser: [X(1.08), Y(3.27)],
  };
}
// greyscale "electron micrograph" mitochondrion with cristae
function emMito(s, cx, cy, w, h, rot = 0) {
  s.addShape(SH.OVAL, { x: cx - w / 2, y: cy - h / 2, w, h, rotate: rot, fill: { color: '8E8E8E' }, line: { color: '2E2E2E', width: 1.5 } });
  const t = h * 0.1;
  s.addShape(SH.OVAL, { x: cx - w / 2 + t, y: cy - h / 2 + t, w: w - 2 * t, h: h - 2 * t, rotate: rot, fill: { color: 'B5B5B5' }, line: { color: '2E2E2E', width: 1 } });
  const a = rot * Math.PI / 180, n = 6, iw = w - 2 * t, ih = h - 2 * t;
  for (let i = 0; i < n; i++) {
    const u = -iw / 2 + (i + 1) * iw / (n + 1), edge = (ih / 2) * Math.sqrt(1 - (2 * u / iw) ** 2), L = edge * 1.2, sg = i % 2 ? 1 : -1;
    const v = sg * (edge - L / 2), qx = cx + u * Math.cos(a) - v * Math.sin(a), qy = cy + u * Math.sin(a) + v * Math.cos(a);
    s.addShape(SH.ROUNDED_RECTANGLE, { x: qx - 0.035, y: qy - L / 2, w: 0.07, h: L, rotate: rot, rectRadius: 0.035, fill: { color: '6E6E6E' }, line: { color: '2E2E2E', width: 0.5 } });
  }
}
// round field of view (eyepiece view)
function fieldView(s, cx, cy, r, bg = 'FBF8EE') { ball(s, cx, cy, r + 0.06, '2F3542', '2F3542'); ball(s, cx, cy, r, bg, '2F3542', 0.5); }
// onion epidermis cells (brick pattern) drawn only where fully inside a circle (cx, cy, r)
function onionCells(s, cx, cy, r, cw, ch, o = {}) {
  const out = [];
  for (let row = -6; row <= 6; row++) for (let col = -6; col <= 6; col++) {
    const x = cx + col * cw + (row % 2 ? cw / 2 : 0) - cw / 2, y = cy + row * ch - ch / 2;
    const corners = [[x, y], [x + cw, y], [x, y + ch], [x + cw, y + ch]];
    if (corners.every(([a, b]) => Math.hypot(a - cx, b - cy) <= r - 0.04)) {
      box(s, x, y, cw, ch, o.fill || 'F6E9C4', o.edge || '9C7A2A', { lw: o.lw || 1.25 });
      ball(s, x + cw * (0.3 + 0.4 * ((row + col + 12) % 3) / 2), y + ch * 0.5, o.nr || 0.07, o.nfill || 'B07B2A', o.nedge || '6E4A14', 0.75);
      out.push([x, y]);
    }
  }
  return out;
}
const R_ = (t, o = {}) => T.rich(t, Object.assign({ color: C.text }, o));
const brk = arr => { arr[arr.length - 1].options.breakLine = true; return arr; };
const HDR = t => ({ text: t, options: { bold: true, color: C.white, fill: { color: C.ink } } });
const tick = (t, i, o = {}) => ({ text: t, options: Object.assign({ align: 'center', bold: t === '✓' || t === '✗', color: t === '✓' ? C.green : t === '✗' ? C.red : C.text, fill: { color: i % 2 ? C.white : C.cardBlue } }, o) });
function eqStrip(s, x, y, w, h, runs, o = {}) {
  box(s, x, y, w, h, C.white, o.border || C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: o.lw || 1 });
  s.addText(runs, { x: x + 0.12, y, w: w - 0.24, h, fontFace: 'Calibri', fontSize: o.size || 12, color: C.text, valign: 'middle', align: o.align || 'center', margin: 0 });
}
// slide with a custom-width left panel and a right column (for big diagrams)
function wideSlide(o) {
  const s = D.contentHeader(o.title, o.subtitle, o);
  const pw = o.panelW;
  D.panel(s, 0.45, 1.3, pw, 4.95, o.caption);
  if (o.draw) o.draw(s);
  const rx = 0.45 + pw + 0.25, rw = T.W - 0.45 - rx;
  if (o.right) o.right(s, rx, rw);
  if (o.qc) D.quickCheck(s, o.qc);
  if (o.notes) D.notes(s, o.notes);
  return s;
}

// ======================= 1 COVER =======================
reg(D.coverSlide({
  bigTitle: 'Cell structures',
  footer: 'OCR J260 Combined Science B • B4.2 How do we know about mitochondria and other cell structures? • teacher deck • mark schemes in the speaker notes',
  rows: [
    { icon: '§', text: `Specification ${DECK.specRange} • electron microscopy • PAG B1 microscopy` },
    { icon: 'H', text: 'Higher & Foundation in one deck • Higher-only maths (standard form) marked HT' },
    { icon: 'µm', text: 'Eukaryotic and prokaryotic cells • sizes and scales • magnification and resolution' },
  ],
  notes: 'B4.2 How do we know about mitochondria and other cell structures? is Part 2 of 3 in J260 Chapter B4 (B4.1 respiration, B4.2 microscopy and cell structures, B4.3 growth and development).\nThe B4.2.1 statement comes from a search extract of the OCR Twenty First Century Biology B specification (ocr.org.uk could not be fetched): see SPEC_B4_2.md before showing codes to students.',
}), 'Title');

// ======================= 2 OBJECTIVES =======================
reg(D.objectivesSlide([
  { code: 'B1.1 link', text: 'Describe the structures in **animal and plant cells** (eukaryotic) and what each one does.' },
  { code: 'B1.1 link', text: 'Describe a **bacterial cell** (prokaryotic): DNA loop, **plasmids**, no nucleus, and compare it with eukaryotic cells.' },
  { code: 'Maths', text: 'Use **mm, µm and nm** to compare the sizes of cells and organelles.' },
  { code: 'Maths', text: 'Write sizes in **standard form** and compare them as **orders of magnitude**.', ht: true },
  { code: 'B4.2.1', text: 'Compare **light and electron microscopes**: magnification and **resolution**.' },
  { code: 'B4.2.1', text: 'Explain how **electron microscopy** has increased our understanding of sub-cellular structures (mitochondria, ribosomes).' },
  { code: 'Maths', text: 'Use **magnification = image size ÷ real size**, with unit conversions, rearranging and scale bars.' },
  { code: 'PAG B1', text: 'Prepare slides, use a light microscope, draw cells and **measure** them with an eyepiece graticule.' },
], { subtitle: `Specification ${DECK.specRange} • by the end of this sub-topic you can…`, notes: 'B4.2.1 (both tiers): "explain how electron microscopy has increased our understanding of sub-cellular structures" (wording from search extracts of the OCR B specification; J260 numbering UNVERIFIED).\nCell structures: KS3 underlying knowledge plus the J260 B1.1 statement on the nucleus and genetic material of eukaryotic cells and the genetic material, including plasmids, of prokaryotic cells. They are revised here because B4.2 asks how we know about them.\nHT: standard form and orders of magnitude are marked Higher. Evidence: Oak National Academy\'s OCR Higher lesson is "Electron microscopy, and the size and scale of cells: including standard form"; the Foundation lesson omits standard form (UNVERIFIED against the OCR spec, where bold = HT).' }), 'Learning objectives');

// ======================= 3 WHERE THIS FITS =======================
{
  const s = D.contentHeader('Where this fits', 'Chapter B4 Using food and controlling growth • B4.2 is Part 2 of 3 in Combined Science B', { tag: 'Context' });
  const nodes = [
    ['B1.1 link', 'Eukaryotic cells: animal and plant cell structures', 'Both tiers', C.blue],
    ['B1.1 link', 'Prokaryotic cells: bacteria, DNA loop and plasmids', 'Both tiers', C.blue],
    ['Maths', 'Sizes: mm, µm, nm • standard form, orders of magnitude', 'Both + HT', C.red],
    ['B4.2.1', 'Light vs electron microscopes; what electron microscopes revealed', 'Both tiers', C.blue],
    ['Maths', 'Magnification = image size ÷ real size; scale bars', 'Both tiers', C.blue],
    ['PAG B1', 'Microscopy: slides, drawing and measuring cells', 'Practical', C.orange],
  ];
  box(s, 0.45, 1.35, 2.3, 0.75, C.ink, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  label(s, 0.45, 1.35, 2.3, 'B4.2\nHow do we know about cell structures?', { h: 0.75, size: 11, bold: true, color: C.white });
  line(s, 1.0, 2.1, 1.0, 2.3 + 5 * 0.72 + 0.31, C.blue, 1.5);
  nodes.forEach(([code, txt, who, col], i) => {
    const y = 2.3 + i * 0.72;
    line(s, 1.0, y + 0.31, 1.45, y + 0.31, C.blue, 1.5);
    box(s, 1.45, y, 5.6, 0.62, C.cardBlue, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addText([{ text: code + '   ', options: { bold: true, color: C.blue } }, { text: txt, options: { color: C.text } }], { x: 1.6, y, w: 4.1, h: 0.62, fontFace: 'Calibri', fontSize: 11, valign: 'middle', margin: 0 });
    D.pill(s, 5.75, y + 0.16, who.toUpperCase(), col, 1.2);
  });
  label(s, 0.45, 6.62, 6.6, 'Earlier links: B4.1 respiration in mitochondria • B1.1 the genome • KS3 cells and the light microscope', { size: 10.5, italic: true, color: C.grey });
  box(s, 7.35, 1.35, 5.53, 3.05, C.navy, null, { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'Chapter B4 in J260', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.white, breakLine: true } },
    ...D.para([
      '**B4.1 What happens during cellular respiration?** Aerobic and anaerobic respiration; mitochondria (done).',
      '**B4.2 How do we know about mitochondria and other cell structures?** (this deck)',
      '**B4.3 How do organisms grow and develop?** The cell cycle, mitosis, stem cells and differentiation (next).',
    ], { size: 11.5, color: 'E3F2F0' }),
  ], { x: 7.55, y: 1.45, w: 5.15, h: 2.85, valign: 'top', margin: 0, fontFace: 'Calibri' });
  box(s, 7.35, 4.55, 5.53, 2.3, C.cream, 'F1D9A8', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
  s.addText([
    { text: 'One deck for both tiers', options: { fontFace: 'Georgia', bold: true, fontSize: 15, color: C.orange, breakLine: true } },
    ...D.para([
      'Everything is for both tiers except **standard form** and **orders of magnitude** (red **HT** pill).',
      'Big idea: new **technology** (the electron microscope) gave new **evidence** about cells.',
      'One practical: **PAG B1** microscopy.',
    ], { size: 11.5 }),
  ], { x: 7.55, y: 4.65, w: 5.15, h: 2.1, valign: 'top', margin: 0, fontFace: 'Calibri' });
  D.notes(s, 'J260 Chapter B4 in Combined Science: B4.1, B4.2, B4.3. B4.4 (plant hormones) is separate science only (J257).\nBoundaries: respiration inside mitochondria was taught in B4.1, so it is only recapped here. Mitosis, the cell cycle and stem cells are B4.3, so this deck does not teach them.\nIdeas about Science: B4.2 is OCR\'s example of how a new technology (electron microscopy) led to new observations and explanations.');
  reg(s, 'Where this fits');
}

// ======================= 4 RETRIEVAL =======================
reg(D.retrievalSlide([
  { from: 'B4.1 • respiration', q: 'Write the **word equation** for aerobic respiration.' },
  { from: 'B4.1 • mitochondria', q: 'Where in the cell does most **aerobic** respiration happen? Why do muscle cells have **many** of them?' },
  { from: 'B4.1 • anaerobic', q: 'Where in the cell does **anaerobic** respiration happen? Name its product in yeast.' },
  { from: 'B1.1 • the genome', q: 'What is meant by the **genome** of an organism?' },
  { from: 'B1.1 • genetic material', q: 'Where is the genetic material found in a **plant cell**? Where is it found in a **bacterium**?' },
  { from: 'KS3 maths • units', q: '1 mm = 1000 µm. Convert **3.5 mm** into micrometres (µm).' },
], { subtitle: 'Recall from B4.1, B1.1 and KS3 • 6 minutes • no notes', notes: 'ANSWERS\n1. glucose + oxygen → carbon dioxide + water.\n2. Mitochondria. Muscle cells need a lot of ATP / energy to contract, so they do a lot of aerobic respiration.\n3. The cytoplasm. Ethanol (and carbon dioxide).\n4. The entire genetic material of an organism.\n5. Plant cell: in the nucleus (chromosomes). Bacterium: in the cytoplasm as a single loop of DNA (chromosomal DNA) and small rings called plasmids.\n6. 3.5 × 1000 = 3500 µm.' }), 'Retrieval starter');

// ======================= 5 EUKARYOTIC CELLS =======================
reg(wideSlide({
  title: 'Eukaryotic cells: animal and plant cells',
  subtitle: 'Underlying knowledge for B4.2 • links to B1.1 • the parts we can now see in detail',
  tag: 'Cells', panelW: 7.75, caption: 'as seen with an electron microscope; ribosomes drawn as dots',
  draw: (s) => {
    label(s, 1.85, 1.42, 2.4, 'Animal cell (e.g. cheek cell)', { size: 11, bold: true, color: C.blue });
    label(s, 4.3, 1.42, 2.3, 'Plant cell (e.g. leaf cell)', { size: 11, bold: true, color: C.blue });
    const A = bigAnimalCell(s, 1.95, 1.85, 2.2, 3.0);
    const lx = 1.82;
    const m1 = A.membrane(200);
    lead(s, m1[0], m1[1], lx, 2.15, 'cell membrane', 'left', { w: 1.3 });
    lead(s, A.nucleus[0] - A.nucleus[2] * 0.6, A.nucleus[1] - A.nucleus[2] * 0.5, lx, 2.75, 'nucleus', 'left', { w: 1.3 });
    lead(s, A.mito[3][0], A.mito[3][1], lx, 2.45, 'mitochondrion', 'left', { w: 1.3 });
    const rb = A.rib.reduce((b, p) => (p[0] < b[0] + 0.0001 && p[1] > 3.3 ? p : b), [9, 0]);
    lead(s, rb[0], rb[1], lx, 3.9, 'ribosomes', 'left', { w: 1.3 });
    lead(s, A.cyto[0] - 0.4, A.cyto[1] - 0.15, lx, 4.5, 'cytoplasm', 'left', { w: 1.3 });
    const P = bigPlantCell(s, 4.45, 1.8, 2.0, 3.75);
    const rx = 6.6;
    lead(s, P.wall[0], P.wall[1], rx, 2.0, 'cell wall', 'right', { w: 1.5 });
    lead(s, P.chloro[4][0], P.chloro[4][1], rx, 2.45, 'chloroplast', 'right', { w: 1.5 });
    lead(s, P.membrane[0], P.membrane[1] + 0.25, rx, 2.95, 'cell membrane', 'right', { w: 1.5 });
    lead(s, P.vacuole[0], P.vacuole[1], rx, 3.45, 'permanent vacuole', 'right', { w: 1.5, size: 10 });
    lead(s, P.cyto[0], P.cyto[1], rx, 3.95, 'cytoplasm', 'right', { w: 1.5 });
    lead(s, P.mito[0][0], P.mito[0][1], rx, 4.45, 'mitochondrion', 'right', { w: 1.5 });
    const pr = P.rib.reduce((b, p) => (p[0] > b[0] && p[1] > 4.6 && p[1] < 5.0 ? p : b), [0, 0]);
    lead(s, pr[0], pr[1], rx, 4.95, 'ribosomes', 'right', { w: 1.5 });
    lead(s, P.nucleus[0] + P.nucleus[2] * 0.7, P.nucleus[1] + P.nucleus[2] * 0.5, rx, 5.45, 'nucleus', 'right', { w: 1.5 });
    box(s, 0.65, 5.0, 3.6, 0.82, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.75, 5.0, 3.4, '**Eukaryotic** cells have their DNA inside a **nucleus**. Plants, animals and fungi are eukaryotes.', { h: 0.82, size: 10.5, align: 'left' });
  },
  right: (s, rx, rw) => D.card(s, rx, 1.3, rw, 4.95, 'Structures and their jobs', [
    '**Nucleus**: contains the genetic material (DNA in chromosomes); controls the cell.',
    '**Cytoplasm**: jelly where many chemical reactions happen (e.g. anaerobic respiration).',
    '**Cell membrane**: controls what enters and leaves the cell.',
    '**Mitochondria**: where aerobic respiration happens (B4.1).',
    '**Ribosomes**: where **proteins** are made (protein synthesis).',
    { t: '**Plant cells only:**', nob: true, color: C.green },
    '**Cell wall** (cellulose): strengthens and supports the cell.',
    '**Chloroplasts**: absorb light for **photosynthesis**.',
    '**Permanent vacuole**: filled with cell sap; keeps the cell firm.',
  ], { size: 11 }),
  qc: 'A root hair cell is a plant cell, but it has **no chloroplasts**. Suggest why. Which structures does it share with a cheek cell?',
  notes: 'QUICK CHECK ANSWER: Root cells are underground and get no light, so they cannot photosynthesise (chloroplasts would be no use). Shared with a cheek cell: nucleus, cytoplasm, cell membrane, mitochondria, ribosomes.\nThe structures and functions are KS3 underlying knowledge plus B1.1 (nucleus and genetic material). They are revised here because B4.2 asks how we know about them. Ribosomes and the detail inside mitochondria can only be seen with an electron microscope; the diagram is drawn as an electron microscope would show it, but not to scale.\nMisconception: plant cells DO have mitochondria. The cell wall is not a barrier like the membrane: it is fully permeable.',
}), 'Eukaryotic cells');

// ======================= 6 PROKARYOTIC CELLS =======================
reg(wideSlide({
  title: 'Prokaryotic cells: bacteria',
  subtitle: 'Links to B1.1 • a bacterium has no nucleus: its DNA is free in the cytoplasm',
  tag: 'Cells', panelW: 6.1, caption: 'bacterium enlarged about 2000 times; to-scale strip below',
  draw: (s) => {
    label(s, 0.65, 1.42, 5.7, 'A bacterial cell (about 1–5 µm long)', { size: 11, bold: true, color: C.blue });
    const B = bacterium(s, 0.95, 2.35, 4.2, 1.75, { flag: 0.95 });
    lead(s, B.wall[0], B.wall[1], 0.9, 1.95, 'cell wall', 'right', { w: 1.1 });
    lead(s, B.membrane[0], B.membrane[1] + 0.03, 2.6, 1.95, 'cell membrane', 'right', { w: 1.4 });
    lead(s, B.plasmid[0][0] + 0.06, B.plasmid[0][1] - 0.1, 4.65, 1.95, 'plasmids', 'right', { w: 1.2, color: C.red });
    lead(s, B.dna[0] - 0.3, B.dna[1] + 0.5, 2.85, 4.42, 'DNA loop (chromosomal DNA)', 'bottom', { w: 2.2, color: C.nucleusEdge });
    const rb = B.rib.reduce((b, p) => (p[1] > b[1] && p[0] < 2.2 ? p : b), [0, 0]);
    lead(s, rb[0], rb[1], 1.2, 4.42, 'ribosomes', 'bottom', { w: 1.0 });
    lead(s, B.flag[0], B.flag[1], 5.8, 4.42, 'flagellum', 'bottom', { w: 0.95 });
    lead(s, B.cyto[0] + 0.25, B.cyto[1] - 0.05, 4.55, 4.42, 'cytoplasm', 'bottom', { w: 0.95 });
    // to-scale strip: cheek cell 60 µm vs bacterium 2 µm (0.02 in per µm)
    const k = 0.02;
    box(s, 0.65, 5.05, 5.7, 0.8, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    s.addShape(SH.OVAL, { x: 0.85, y: 5.45 - 60 * k * 0.3, w: 60 * k, h: 60 * k * 0.6, fill: { color: C.cyto }, line: { color: C.membrane, width: 1.25 } });
    ball(s, 0.85 + 60 * k / 2, 5.45, 0.1, C.nucleus, C.nucleusEdge, 0.75);
    s.addShape(SH.ROUNDED_RECTANGLE, { x: 2.3, y: 5.43, w: 2 * k, h: 0.02, rectRadius: 0.01, fill: { color: '7A5BA6' }, line: { color: '7A5BA6', width: 0.75 } });
    line(s, 2.32, 5.4, 2.6, 5.2, C.ink, 0.75);
    label(s, 2.62, 5.08, 3.7, 'to scale: cheek cell 60 µm; bacterium 2 µm (the tiny dash)', { h: 0.3, size: 10, align: 'left' });
    label(s, 2.62, 5.4, 3.7, 'a bacterium is about **30×** shorter than a cheek cell', { h: 0.3, size: 10, align: 'left' });
  },
  right: (s, rx, rw) => {
    const rows = [[HDR('Structure'), HDR('Animal'), HDR('Plant'), HDR('Bacterium')],
      ...[['Cell membrane', '✓', '✓', '✓'], ['Cytoplasm', '✓', '✓', '✓'], ['Ribosomes', '✓', '✓', '✓ (smaller)'], ['Nucleus', '✓', '✓', '✗'],
        ['Mitochondria', '✓', '✓', '✗'], ['Chloroplasts', '✗', '✓', '✗'], ['Cell wall', '✗', '✓ cellulose', '✓ not cellulose'], ['DNA', 'in nucleus', 'in nucleus', 'loop + plasmids']]
        .map((r, i) => r.map((t, j) => tick(t, i, j === 0 ? { bold: true, align: 'left' } : {})))];
    s.addTable(rows, { x: rx, y: 1.3, w: rw, colW: [1.55, 1.25, 1.55, rw - 4.35], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
    D.card(s, rx, 4.2, rw, 2.05, 'Prokaryotic means "before nucleus"', [
      'Bacteria are **prokaryotes**: no nucleus, no mitochondria, no chloroplasts.',
      'Most genes are on one **loop of chromosomal DNA**. Extra genes are on small rings called **plasmids**.',
      'Bacteria respire in the **cytoplasm** and are much **smaller** than eukaryotic cells.',
    ], { size: 10.5 });
  },
  qc: 'Give **two** structures found in a bacterium that are also in a plant cell, and **two** ways the bacterium\'s genetic material is different.',
  notes: 'QUICK CHECK ANSWER: Shared (any two): cell membrane, cytoplasm, ribosomes, cell wall. Genetic material: not in a nucleus / free in the cytoplasm; a single loop (circular) of chromosomal DNA; also has plasmids (small rings of DNA).\nB1.1 link (J260, search extract): "explain how the nucleus and genetic material of eukaryotic cells (plants and animals) and the genetic material, including plasmids, of prokaryotic cells are related to cell functions".\nFlagella are not in every bacterium. The bacterial cell wall is not made of cellulose (peptidoglycan: name not needed). The to-scale strip uses 0.02 in per µm.',
}), 'Prokaryotic cells');

// ======================= 7 RECAP 1 =======================
const R1 = D.recapSlide(1, 'Eukaryotic and prokaryotic cells', [
  { q: 'Give the function of the **ribosomes**.', marks: 1, ms: 'Where proteins are made / protein synthesis (1).' },
  { q: 'Name **two** structures found in plant cells but **not** in animal cells. Give the function of **one** of them.', marks: 3, ms: 'Any two (1 each): cell wall; chloroplasts; permanent vacuole. Function (1): cell wall strengthens / supports; chloroplasts absorb light for photosynthesis; vacuole contains cell sap / keeps the cell firm.' },
  { q: 'Describe **two** differences between the genetic material of a bacterium and of an animal cell.', marks: 2, ms: 'Bacterium: no nucleus / DNA free in the cytoplasm (animal: in nucleus) (1); single loop of chromosomal DNA / has plasmids (animal: chromosomes, no plasmids) (1).' },
  { q: 'Explain why a bacterium is described as **prokaryotic**.', marks: 1, ms: 'It has no nucleus (its DNA is not enclosed in a nuclear membrane) (1). Accept: no membrane-bound organelles.' },
]);
reg(R1.s, 'Recap 1');

// ======================= 8 SIZES AND UNITS =======================
reg(D.contentSlide({
  title: 'Sizes and units: mm, µm and nm',
  subtitle: 'Maths skills • cells are measured in micrometres (µm); organelles and viruses in nanometres (nm)',
  tag: 'Maths', caption: 'each step down the staircase is 1000 times smaller',
  draw: (s, p) => {
    const steps = [['metre', 'm', 'a person, a tree'], ['millimetre', 'mm', 'an ant; the eye can just see 0.1 mm'], ['micrometre', 'µm', 'cells, bacteria, mitochondria'], ['nanometre', 'nm', 'ribosomes, viruses, membranes']];
    steps.forEach(([nm, sym, eg], i) => {
      const x = 0.75 + i * 0.95, y = 1.5 + i * 0.95;
      box(s, x, y, 1.55, 0.72, i === 2 ? C.blue : C.white, C.blue, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.5 });
      label(s, x, y + 0.02, 1.55, sym, { h: 0.4, size: 18, bold: true, color: i === 2 ? C.white : C.ink });
      label(s, x, y + 0.42, 1.55, nm, { h: 0.26, size: 10.5, color: i === 2 ? C.white : C.text });
      label(s, x + 1.65, y + 0.1, 6.3 - (x + 1.65), eg, { h: 0.5, size: 10.5, italic: true, align: 'left', color: C.grey });
      if (i < 3) {
        arrow(s, x + 0.45, y + 0.74, x + 0.95 + 0.45, y + 0.93, C.red, 2);
        label(s, x - 0.3, y + 0.72, 0.72, '×1000', { h: 0.24, size: 10.5, bold: true, color: C.red, align: 'right' });
      }
    });
    eqStrip(s, 0.75, 5.32, 5.5, 0.5, R_('**1 m = 1000 mm     1 mm = 1000 µm     1 µm = 1000 nm**', { fontSize: 12.5 }), { border: C.blue, lw: 1.5 });
  },
  head: 'Converting units',
  lines: [
    'Going to a **smaller** unit: the number gets **bigger**, so **× 1000** for each step.',
    'Going to a **bigger** unit: the number gets **smaller**, so **÷ 1000** for each step.',
    'µ is the Greek letter "mu": 1 µm is one-thousandth of a millimetre.',
    'Typical sizes: cheek cell **60 µm**; onion cell **250 µm**; mitochondrion **2 µm**; ribosome **25 nm**.',
  ],
  size: 11,
  worked: { head: 'Worked example: converting', q: 'Convert (a) 0.06 mm into µm, (b) 2500 nm into µm.',
    steps: [['(a) Step', 'mm → µm is one step down: × 1000'], ['(a) Answer', '0.06 × 1000 = 60 µm'], ['(b) Step', 'nm → µm is one step up: ÷ 1000'], ['Answer', '(b) 2500 ÷ 1000 = 2.5 µm']], size: 10.5 },
  qc: 'Convert (a) **0.25 mm** into µm and (b) **25 nm** into µm. Which is the onion cell and which is the ribosome?',
  notes: 'QUICK CHECK ANSWER: (a) 0.25 × 1000 = 250 µm (the onion cell); (b) 25 ÷ 1000 = 0.025 µm (the ribosome).\nTypical sizes used in this deck (rounded teaching values): cheek cell about 60 µm; onion epidermis cell about 250 µm long; mitochondrion about 1–2 µm (2 µm used); chloroplast about 5 µm; bacterium 1–5 µm (2 µm used); ribosome about 20–30 nm (25 nm used); virus about 100 nm. All conversions asserted in node.',
}), 'Sizes and units');

// ======================= 9 STANDARD FORM & ORDERS OF MAGNITUDE (HT) =======================
reg(D.contentSlide({
  title: 'Standard form and orders of magnitude',
  subtitle: 'Higher maths • comparing sizes from atoms to cells on a powers-of-ten scale',
  tag: 'Maths HT', ht: true, caption: 'each mark on the scale is 10 times bigger than the one before',
  draw: (s, p) => {
    const x0 = 0.95, x1 = 6.15, e0 = -10, e1 = -3, yA = 3.75;
    const X = v => x0 + (Math.log10(v) - e0) / (e1 - e0) * (x1 - x0);
    // resolution bands
    [['naked eye', 1e-4, 'C9D1DA', 4.15], ['light microscope', 2e-7, 'BFE3DF', 4.5], ['electron microscope', 2e-10, 'F6D9B5', 4.85]].forEach(([n, lo, col, y]) => {
      box(s, X(lo), y, x1 - X(lo), 0.28, col, null);
      const t = `${n} (from ${lo >= 1e-4 ? '0.1 mm' : lo >= 1e-7 ? '200 nm' : '0.2 nm'})`;
      if (x1 - X(lo) > 2.7) label(s, X(lo) + 0.08, y, 2.6, t, { h: 0.28, size: 10, bold: true, align: 'left' });
      else label(s, X(lo) - 2.65, y, 2.6, t, { h: 0.28, size: 10, bold: true, align: 'right' });
    });
    line(s, x0, yA, x1, yA, C.ink, 2);
    for (let e = e0; e <= e1; e++) {
      line(s, X(10 ** e), yA - 0.08, X(10 ** e), yA + 0.08, C.ink, 1.25);
      s.addText([{ text: '10', options: {} }, { text: String(e), options: { superscript: true } }], { x: X(10 ** e) - 0.3, y: yA + 0.08, w: 0.6, h: 0.26, fontFace: 'Calibri', fontSize: 11, bold: true, color: C.ink, align: 'center', margin: 0 });
    }
    label(s, x1 + 0.12, yA - 0.13, 0.3, 'm', { h: 0.26, size: 11, bold: true, align: 'right' });
    const items = [['atom', 1e-10, 3.35, '0.1 nm'], ['ribosome', 2.5e-8, 2.95, '25 nm'], ['virus', 1e-7, 2.55, '100 nm'], ['mitochondrion', 2e-6, 3.35, '2 µm'], ['bacterium', 2e-6, 2.95, '2 µm'], ['chloroplast', 5e-6, 2.55, '5 µm'], ['cheek cell', 6e-5, 2.15, '60 µm'], ['onion cell', 2.5e-4, 1.75, '250 µm']];
    items.forEach(([n, v, y, t]) => {
      line(s, X(v), y + 0.3, X(v), yA, '9AA3B0', 0.75, { dash: 'dash' });
      ball(s, X(v), yA, 0.05, C.red, C.red);
      const lw = 1.25, lx = Math.min(Math.max(X(v) - lw / 2, 0.6), 6.4 - lw);
      label(s, lx, y, lw, `**${n}**\n${t}`, { h: 0.38, size: 10, color: C.ink });
    });
    label(s, 0.7, 1.45, 5.6, 'Sizes on a powers-of-ten (log) scale', { size: 11, bold: true, color: C.blue, align: 'left' });
  },
  head: 'Standard form',
  lines: [
    'Standard form: __A × 10__^^n^^ where A is between 1 and 10. Small sizes have a **negative** power.',
    '1 mm = 10^^−3^^ m   1 µm = 10^^−6^^ m   1 nm = 10^^−9^^ m',
    'e.g. 60 µm = 60 × 10^^−6^^ m = __6 × 10__^^−5^^ __m__',
    'An **order of magnitude** is a factor of **10**. Two orders of magnitude = 100 times.',
  ],
  size: 11,
  worked: { head: 'Worked example (HT): orders of magnitude', q: 'A cheek cell is 6 × 10^^−5^^ m. A ribosome is 25 nm. How many orders of magnitude bigger is the cell?',
    steps: [['Convert', '25 nm = 25 × 10^^−9^^ m = 2.5 × 10^^−8^^ m'], ['Divide', '(6 × 10^^−5^^) ÷ (2.5 × 10^^−8^^) = 2.4 × 10^^3^^ = 2400'], ['Nearest power', '2400 is closest to 10^^3^^ (log₁₀ 2400 ≈ 3.4)'], ['Answer', 'about 3 orders of magnitude (≈ 1000 times) bigger']], size: 10.5 },
  qc: 'An onion cell is 2.5 × 10^^−4^^ m and a bacterium is 2 × 10^^−6^^ m. How many times longer is the onion cell? About how many orders of magnitude is that?',
  notes: `QUICK CHECK ANSWER: (2.5 × 10⁻⁴) ÷ (2 × 10⁻⁶) = 125 times; about 2 orders of magnitude (10² = 100).\nWorked example: 6e-5 ÷ 2.5e-8 = ${cheekRib} (node); log10 = ${Math.log10(cheekRib).toFixed(2)}, so the nearest power of ten is 10³.\nHT: marked Higher only on the evidence of Oak National Academy's OCR Higher lesson title ("…including standard form"); check the bold statements in the J260 spec. Maths skills: standard form (M1b) and order of magnitude calculations (M2h) — codes UNVERIFIED for J260 B4.2.\nResolution limits on the bands are approximate: eye ≈ 0.1 mm; light microscope ≈ 200 nm; electron microscope ≈ 0.2 nm (best modern instruments are better).`,
}), 'Standard form and orders of magnitude (HT)');

// ======================= 10 RECAP 2 =======================
const R2 = D.recapSlide(2, 'Sizes, units and standard form • HT questions marked', [
  { q: 'Convert **0.04 mm** into micrometres. Then convert **25 nm** into micrometres.', marks: 2, ms: '0.04 × 1000 = 40 µm (1); 25 ÷ 1000 = 0.025 µm (1).' },
  { q: 'A bacterium is **2 µm** long. How many bacteria placed end to end would fit across **1 mm**?', marks: 2, ms: '1 mm = 1000 µm (1); 1000 ÷ 2 = 500 (1).' },
  { q: 'Write **60 µm** in metres, in standard form.', marks: 1, ht: true, ms: '6 × 10⁻⁵ m (1).' },
  { q: 'A cheek cell is **60 µm** wide and a mitochondrion is **2 µm** long. How many times bigger is the cell? State the difference as an order of magnitude.', marks: 2, ht: true, ms: '60 ÷ 2 = 30 times (1); about one order of magnitude (10¹; 30 is nearer 10 than 100 on a log scale: log₁₀ 30 ≈ 1.5, accept 1 or "between 1 and 2") (1).' },
]);
reg(R2.s, 'Recap 2');

// ======================= 11 THE LIGHT MICROSCOPE =======================
reg(D.contentSlide({
  title: 'The light microscope',
  subtitle: 'PAG B1 skills • KS3 underlying knowledge • parts and what they do',
  tag: 'Microscopes', caption: 'a compound light microscope with a built-in lamp',
  draw: (s, p) => {
    const M = microscope(s, 2.0, 1.45, 0.97);
    const L = 1.85, R = 4.95;
    lead(s, M.eyepiece[0], M.eyepiece[1], L, 1.75, 'eyepiece lens', 'left', { w: 1.25 });
    lead(s, M.objectives[0], M.objectives[1], L, 3.35, 'objective lenses', 'left', { w: 1.25 });
    lead(s, M.clip[0], M.clip[1], L, 3.82, 'stage clip', 'left', { w: 1.25 });
    lead(s, M.stage[0], M.stage[1], L, 4.3, 'stage', 'left', { w: 1.25 });
    lead(s, M.light[0], M.light[1], L, 5.0, 'light source', 'left', { w: 1.25 });
    lead(s, M.tube[0], M.tube[1] - 0.6, R, 1.65, 'body tube', 'right', { w: 1.4 });
    lead(s, M.coarse[0], M.coarse[1], R, 2.6, 'coarse focus', 'right', { w: 1.4 });
    lead(s, M.fine[0], M.fine[1], R, 3.25, 'fine focus', 'right', { w: 1.4 });
    lead(s, M.arm[0], M.arm[1], R, 4.05, 'arm', 'right', { w: 1.4 });
    lead(s, M.base[0], M.base[1], R, 5.15, 'base', 'right', { w: 1.4 });
  },
  head: 'Parts and their jobs',
  lines: [
    '**Eyepiece lens**: the lens you look through; usually ×10.',
    '**Objective lenses**: ×4, ×10 and ×40; turn the nosepiece to change.',
    '**Stage** and **clips**: hold the slide over the hole.',
    '**Light source**: shines light **through** the thin specimen.',
    '**Coarse focus**: big movements, for low power. **Fine focus**: small movements, for high power.',
  ],
  size: 11,
  worked: { head: 'Worked example: total magnification', q: 'The eyepiece is ×10. What are the total magnifications with the ×4, ×10 and ×40 objectives?',
    steps: [['Equation', 'total = eyepiece × objective'], ['Low', '10 × 4 = ×40'], ['Medium', '10 × 10 = ×100'], ['Answer', 'high power: 10 × 40 = ×400']], size: 10.5 },
  qc: 'Why must you use the **fine focus**, not the coarse focus, with the ×40 objective?',
  notes: 'QUICK CHECK ANSWER: The ×40 objective is very close to the slide; the coarse focus moves the stage a long way and could crash the lens into the slide (breaking the slide or damaging the lens) and it is too coarse to get a sharp image.\nThe diagram uses a built-in lamp; older microscopes use a mirror (never point a mirror at the Sun). Light microscopes are KS3 underlying knowledge and are used in PAG B1.',
}), 'Light microscope');

// ======================= 12 MAGNIFICATION AND RESOLUTION =======================
reg(D.contentSlide({
  title: 'Magnification and resolution',
  subtitle: `Specification ${sp('B4.2.1')} • electron microscopes magnify more AND show much finer detail`,
  tag: 'B4.2.1', caption: 'two objects 100 nm apart viewed with each microscope',
  draw: (s, p) => {
    label(s, 0.7, 1.42, 5.6, 'Resolution: can you tell two close objects apart?', { size: 11, bold: true, color: C.blue, align: 'left' });
    // LM: blurred
    box(s, 0.85, 1.8, 2.4, 1.45, 'FBF8EE', '2F3542', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    [[1.85, 2.52], [2.2, 2.52]].forEach(([x, y]) => s.addShape(SH.OVAL, { x: x - 0.4, y: y - 0.4, w: 0.8, h: 0.8, fill: { color: '6A4C93', transparency: 60 }, line: { type: 'none' } }));
    label(s, 0.85, 3.27, 2.4, '**light microscope**: one blur', { size: 10.5 });
    // EM: two sharp dots
    box(s, 3.75, 1.8, 2.4, 1.45, '3A3A3A', '2F3542', { shape: SH.ROUNDED_RECTANGLE, r: 0.06 });
    ball(s, 4.6, 2.52, 0.2, 'E6E6E6', 'FFFFFF'); ball(s, 5.3, 2.52, 0.2, 'E6E6E6', 'FFFFFF');
    label(s, 3.75, 3.27, 2.4, '**electron microscope**: two objects', { size: 10.5 });
    const rows = [[HDR(''), HDR('Light microscope'), HDR('Electron microscope')],
      ['Uses', 'light', 'a beam of electrons'],
      ['Magnification', 'up to about ×2000', 'up to about ×2 000 000'],
      ['Resolution', 'about 200 nm', 'about 0.2 nm'],
      ['Specimens', 'living or dead', 'dead (in a vacuum)'],
      ['Cost and size', 'cheap, portable', 'expensive, fills a room']]
      .map((r, i) => i === 0 ? r : r.map((t, j) => ({ text: t, options: { bold: j === 0, fill: { color: i % 2 ? C.cardBlue : C.white } } })));
    s.addTable(rows, { x: 0.7, y: 3.68, w: 5.6, colW: [1.4, 2.0, 2.2], rowH: 0.34, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  },
  head: 'Two different ideas',
  lines: [
    '**Magnification**: how many times **bigger** the image is than the real object.',
    '**Resolution**: the **smallest distance** between two points that can still be seen as **separate**. It decides how much **detail** you see.',
    'Magnifying more without better resolution just gives a **bigger blur**.',
    'Electrons have a much shorter wavelength than light, so electron microscopes have a much **higher resolution**.',
  ],
  size: 11,
  worked: { head: 'Worked example: how much finer?', q: 'Resolution: light microscope 200 nm; electron microscope 0.2 nm. How many times finer is the detail?',
    steps: [['Equation', 'ratio = 200 nm ÷ 0.2 nm'], ['Units', 'both in nm, so divide directly'], ['Calculate', '200 ÷ 0.2 = 1000'], ['Answer', 'about 1000 times finer detail']], size: 10.5 },
  qc: 'A student says "a light microscope at ×4000 would show ribosomes". Explain why the student is wrong.',
  notes: `QUICK CHECK ANSWER: Ribosomes (about 25 nm) are smaller than the resolution of a light microscope (about 200 nm). More magnification would only make a bigger blur: the detail is limited by resolution, not magnification.\nFigures are typical textbook values: light microscope useful magnification about ×1500–×2000, resolution about 0.2 µm (200 nm); transmission electron microscope magnification up to about ×2 000 000 (modern instruments more), resolution about 0.2 nm (some texts quote 0.1 nm or 2 nm). Ratio ${resLM / resEM} asserted in node.\nThe wavelength explanation is stretch; "higher resolution" is the key idea.`,
}), 'B4.2.1 Magnification and resolution');

// ======================= 13 WHAT ELECTRON MICROSCOPES REVEALED =======================
reg(D.contentSlide({
  title: 'How electron microscopes changed what we know',
  subtitle: `Specification ${sp('B4.2.1')} • Ideas about Science: new technology gives new evidence`,
  tag: 'B4.2.1', caption: 'part of an animal cell: light microscope view (left) and electron micrograph (right)',
  draw: (s, p) => {
    // LM field of view: cheek cell
    label(s, 0.6, 1.4, 2.6, 'Light microscope (×1000)', { size: 10.5, bold: true, color: C.blue });
    fieldView(s, 1.9, 2.62, 0.95);
    s.addShape(SH.OVAL, { x: 1.2, y: 2.05, w: 1.4, h: 1.12, fill: { color: 'E3ECF7' }, line: { color: '5B7FB0', width: 1 } });
    ball(s, 1.82, 2.6, 0.2, '3E64A8', '2B4C9B');
    [[1.45, 2.35], [2.3, 2.45], [1.55, 2.9], [2.2, 2.85], [2.05, 2.25]].forEach(([x, y]) => ball(s, x, y, 0.022, '5B6F8F', '5B6F8F'));
    label(s, 0.65, 3.62, 2.6, 'nucleus clear; mitochondria = tiny dots\n**no ribosomes** visible', { h: 0.45, size: 10, valign: 'top' });
    // EM view
    label(s, 3.55, 1.4, 2.8, 'Electron microscope (×20 000)', { size: 10.5, bold: true, color: C.blue });
    box(s, 3.6, 1.68, 2.7, 1.9, 'C8C8C8', '2F3542', { lw: 1.25 });
    // nucleus edge with pores
    s.addShape(SH.OVAL, { x: 3.0, y: 2.25, w: 1.5, h: 1.6, fill: { color: '9A9A9A' }, line: { type: 'none' } });
    box(s, 3.0, 1.7, 0.6, 2.2, C.panel, null); // mask outside the frame
    box(s, 3.6, 3.58, 1.0, 0.35, C.panel, null);
    line(s, 3.6, 1.68, 3.6, 3.58, '2F3542', 1.25); line(s, 3.6, 3.58, 4.6, 3.58, '2F3542', 1.25);
    emMito(s, 5.3, 2.2, 1.4, 0.62, 10);
    // rough ER with ribosomes
    [[4.55, 2.95, 6.1, 2.95], [4.55, 3.2, 6.1, 3.2]].forEach(([a, b, c, d]) => { line(s, a, b, c, d, '3A3A3A', 1.5); for (let xx = a + 0.08; xx < c; xx += 0.14) ball(s, xx, b - 0.05, 0.022, '1E1E1E', '1E1E1E'); });
    [[4.7, 2.5], [4.85, 2.65], [4.6, 2.25], [5.9, 2.7], [6.15, 2.55], [4.75, 1.9], [5.0, 3.42], [5.6, 3.42], [5.85, 3.45]].forEach(([x, y]) => ball(s, x, y, 0.024, '1E1E1E', '1E1E1E'));
    lead(s, 5.55, 2.05, 5.95, 1.82, 'cristae', 'left', { w: 0.6, size: 10, color: '111111' });
    label(s, 3.55, 3.62, 2.85, 'inner membrane folds, **ribosomes**, nuclear membrane', { h: 0.45, size: 10, valign: 'top' });
    // timeline
    const tl = [[1665, 'Hooke: "cells" seen in cork'], [1831, 'Brown: the nucleus'], [1898, 'Benda names "mitochondria"'], [1931, 'Ruska & Knoll: first electron microscope'], [1953, 'Palade: cristae; ribosomes (1955)']];
    const tx0 = 1.1, tx1 = 5.9, ty = 4.75;
    line(s, tx0 - 0.1, ty, tx1 + 0.1, ty, C.ink, 2);
    tl.forEach(([yr, t], i) => {
      const x = tx0 + i * (tx1 - tx0) / 4;
      ball(s, x, ty, 0.07, i >= 3 ? C.orange : C.blue, C.ink, 0.75);
      label(s, x - 0.55, ty - 0.33, 1.1, String(yr), { h: 0.24, size: 10.5, bold: true, color: i >= 3 ? C.orange : C.blue });
      label(s, x - 0.6, ty + 0.1, 1.2, t, { h: 0.68, size: 10, valign: 'top' });
    });
  },
  head: 'Electron microscopy: new evidence',
  lines: [
    'Light microscopes showed **cells**, the **nucleus** and tiny granules (mitochondria), but no detail inside them.',
    'From the 1930s, **electron microscopes** gave much higher **resolution**.',
    'Scientists saw the **double membrane** and folded inner membrane of mitochondria, and discovered **ribosomes**.',
    'This explained **how** mitochondria work: a large membrane surface holds the respiration enzymes (B4.1).',
  ],
  size: 11,
  worked: { head: 'Ideas about Science', q: 'Why were ribosomes not discovered until the 1950s?',
    steps: [['Size', 'ribosomes are about 25 nm across'], ['Limit', 'light microscope resolution is about 200 nm'], ['Technology', 'electron microscopes resolve about 0.2 nm'], ['Answer', 'they could only be seen once the technology existed']], size: 10.5 },
  qc: 'Suggest **one** reason why scientists at first worried that electron micrographs might show structures that are not really in living cells.',
  notes: 'QUICK CHECK ANSWER: Specimens must be killed, fixed, cut very thin, stained (heavy metals) and put in a vacuum: this preparation could change the structure or create "artefacts". Scientists checked by using different preparation methods and getting the same structures (repeatability / reproducibility).\nB4.2.1 wording (search extract): "explain how electron microscopy has increased our understanding of sub-cellular structures". History (standard, from memory, UNVERIFIED dates checked against common sources): Hooke 1665 Micrographia; Robert Brown named the nucleus 1831; Altmann described "bioblasts" 1890 and Carl Benda named mitochondria 1898; Ernst Ruska and Max Knoll built the first electron microscope 1931 (Ruska, Nobel 1986); George Palade and Fritjof Sjöstrand showed cristae 1952–53; Palade described ribosomes ("Palade granules") 1955.\nRespiration in mitochondria itself is B4.1: recap only.',
}), 'B4.2.1 What electron microscopes revealed');

// ======================= 14 RECAP 3 =======================
const R3 = D.recapSlide(3, `Specification ${sp('B4.2.1')} • microscopes and what they reveal`, [
  { q: 'Which focusing knob should be used with the **×40** objective lens?', marks: 1, ms: 'Fine focus (1).' },
  { q: 'Explain the difference between **magnification** and **resolution**.', marks: 2, ms: 'Magnification: how many times bigger the image is than the real object (1); resolution: the smallest distance between two points that can be seen as separate / the ability to see fine detail (1).' },
  { q: 'Give **two** advantages and **one** disadvantage of an electron microscope compared with a light microscope.', marks: 3, ms: 'Advantages (any two, 1 each): higher magnification; higher resolution; can see sub-cellular structures e.g. ribosomes / inside mitochondria. Disadvantage (1): expensive / large / specimens must be dead / in a vacuum / complex preparation / black-and-white images.' },
  { q: 'Name **one** cell structure that was only discovered after the electron microscope was invented.', marks: 1, ms: 'Ribosomes (1). Accept: cristae / inner membrane of mitochondria / nuclear pores / endoplasmic reticulum.' },
]);
reg(R3.s, 'Recap 3');

// ======================= 15 MAGNIFICATION EQUATION =======================
reg(D.contentSlide({
  title: 'Calculating magnification',
  subtitle: 'Maths skills • magnification = image size ÷ real size • both sizes in the SAME unit',
  tag: 'Maths', caption: 'the image of a 2 µm mitochondrion drawn 40 mm long',
  draw: (s, p) => {
    // formula triangle
    const tx = 0.85, ty = 1.5, tw = 2.6, th = 2.2;
    s.addShape(SH.ISOSCELES_TRIANGLE, { x: tx, y: ty, w: tw, h: th, fill: { color: C.white }, line: { color: C.blue, width: 2 } });
    line(s, tx + tw * 0.2, ty + th * 0.55, tx + tw * 0.8, ty + th * 0.55, C.blue, 1.5);
    line(s, tx + tw / 2, ty + th * 0.55, tx + tw / 2, ty + th, C.blue, 1.5);
    label(s, tx + tw * 0.25, ty + th * 0.28, tw * 0.5, '**image**\nsize', { h: 0.5, size: 11, color: C.ink });
    label(s, tx + tw * 0.08, ty + th * 0.66, tw * 0.42, '**magni-\nfication**', { h: 0.5, size: 10.5, color: C.ink });
    label(s, tx + tw * 0.5, ty + th * 0.66, tw * 0.42, '**real**\nsize', { h: 0.5, size: 11, color: C.ink });
    s.addText([...brk(R_('**magnification = image size ÷ real size**', { fontSize: 11 })), ...brk(R_('real size = image size ÷ magnification', { fontSize: 11 })), ...R_('image size = magnification × real size', { fontSize: 11 })],
      { x: 3.65, y: 1.75, w: 2.7, h: 1.4, fontFace: 'Calibri', valign: 'middle', margin: 0 });
    // illustration
    label(s, 0.7, 3.95, 5.6, 'real mitochondrion: 2 µm  →  image: 40 mm = 40 000 µm', { size: 11, bold: true, color: C.blue, align: 'left' });
    D.mitochondrion(s, 1.0, 4.85, 0.06, 0.03, {});
    label(s, 0.7, 5.15, 0.8, 'real (dot)', { size: 10, italic: true, color: C.grey });
    arrow(s, 1.35, 4.85, 2.15, 4.85, C.red, 2.5);
    label(s, 1.3, 4.5, 0.95, '×20 000', { size: 10.5, bold: true, color: C.red });
    const L = 40 / 25.4; // 40 mm drawn at true printed size
    D.mitochondrion(s, 2.4 + L / 2, 4.85, L, 0.62, { detail: true, folds: 5 });
    line(s, 2.4, 5.35, 2.4 + L, 5.35, C.ink, 1.25, { head: true, tail: true });
    label(s, 2.4, 5.4, L, '40 mm', { size: 10.5, bold: true });
    label(s, 4.2, 4.55, 2.1, 'Always **convert** first: mm × 1000 → µm', { h: 0.62, size: 10.5, align: 'left', color: C.red });
  },
  head: 'Using the equation',
  lines: [
    'Measure the **image** with a ruler (usually in mm).',
    'Put image size and real size in the **same unit** before dividing (usually µm).',
    'Magnification has **no unit**: write it as ×20 000.',
    'Rearrange to find a **real size**: real size = image size ÷ magnification.',
  ],
  size: 11,
  worked: { head: 'Worked example: magnification', q: 'An electron micrograph shows a mitochondrion 40 mm long. The real mitochondrion is 2 µm long. Calculate the magnification.',
    steps: [['Convert', '40 mm × 1000 = 40 000 µm'], ['Equation', 'magnification = image size ÷ real size'], ['Substitute', '40 000 µm ÷ 2 µm'], ['Answer', `magnification = ×${mitoMag.toLocaleString('en-GB').replace(/,/g, ' ')}`]], size: 10.5 },
  qc: 'A student draws a cheek cell **24 mm** wide at a magnification of **×400**. Calculate the real width of the cell in µm.',
  notes: `QUICK CHECK ANSWER: real size = 24 mm ÷ 400 = ${cheekReal} mm (1); × 1000 = ${cheekReal * 1000} µm (1).\nThe image mitochondrion is drawn 40 mm long at true printed size (40/25.4 = ${(40 / 25.4).toFixed(3)} in). All numbers asserted in node.\nTotal magnification of a light microscope = eyepiece × objective (slide 11). The OCR equation status (recall or given) for magnification is UNVERIFIED: teach it as recall.`,
}), 'Magnification equation');

// ======================= 16 SCALE BARS =======================
const SB_BAR = 2.4; // on-screen bar length (in)
reg(D.contentSlide({
  title: 'Using a scale bar',
  subtitle: 'Maths skills • a scale bar lets you work out magnification and real sizes from an image',
  tag: 'Maths', caption: 'electron micrograph of a chloroplast (drawing); bar and chloroplast in proportion',
  draw: (s, p) => {
    box(s, 0.8, 1.5, 5.4, 2.9, 'CFCFCF', '2F3542', { lw: 1.25 });
    // chloroplast 4.5 µm when bar = 5 µm → chloroplast length = 0.9 × bar length
    const bar = SB_BAR, cl = 0.9 * bar, cx = 3.5, cy = 2.75;
    s.addShape(SH.OVAL, { x: cx - cl / 2, y: cy - 0.55, w: cl, h: 1.1, fill: { color: '9A9A9A' }, line: { color: '2E2E2E', width: 1.5 } });
    for (let i = 0; i < 5; i++) line(s, cx - cl * 0.36, cy - 0.32 + i * 0.16, cx + cl * 0.36, cy - 0.32 + i * 0.16, '3A3A3A', 1.75);
    [[cx - 0.3, cy - 0.12], [cx + 0.45, cy + 0.12]].forEach(([x, y]) => box(s, x - 0.11, y - 0.12, 0.22, 0.24, '4A4A4A', '2E2E2E', { lw: 0.5 }));
    line(s, cx - cl / 2, 3.55, cx + cl / 2, 3.55, C.red, 1.5, { head: true, tail: true });
    label(s, cx - cl / 2, 3.6, cl, 'image length 18 mm', { size: 10.5, bold: true, color: C.red });
    // scale bar
    box(s, 3.55, 4.0, bar, 0.09, '111111', null);
    label(s, 3.55, 3.68, bar, '5 µm', { size: 11, bold: true, color: '111111' });
    label(s, 0.95, 3.98, 2.5, 'scale bar: 20 mm long', { size: 10.5, bold: true, color: '111111', align: 'left' });
    // HT strip
    box(s, 0.8, 4.65, 5.4, 1.15, C.white, C.red, { shape: SH.ROUNDED_RECTANGLE, r: 0.06, lw: 1.25 });
    D.pill(s, 0.95, 4.75, 'HT', C.red, 0.45);
    label(s, 1.5, 4.72, 4.6, 'Give the answer in metres in standard form', { h: 0.34, size: 11, bold: true, align: 'left', color: C.red });
    label(s, 0.95, 5.1, 5.15, `4.5 µm = 4.5 × 10^^−6^^ m      (1 µm = 10^^−6^^ m)`, { h: 0.6, size: 11.5, align: 'left' });
  },
  head: 'Two steps',
  lines: [
    '**Step 1:** find the magnification from the bar: magnification = bar length on the image ÷ the length it represents.',
    '**Step 2:** measure the object and use real size = image size ÷ magnification.',
    'Scale bars stay correct if the image is enlarged or shrunk, because they change with it.',
  ],
  size: 11,
  worked: { head: 'Worked example: scale bar', q: 'On the printed micrograph the 5 µm scale bar is 20 mm long. The chloroplast image is 18 mm long. Find its real length.',
    steps: [['Magnification', `20 000 µm ÷ 5 µm = ×${sbMag}`], ['Image', '18 mm = 18 000 µm'], ['Real size', `18 000 ÷ ${sbMag}`], ['Answer', `real length = ${chlReal} µm`]], size: 10.5 },
  qc: 'A ribosome image is **5 mm** across at **×200 000**. Calculate its real size in nm. **HT:** give it in metres in standard form.',
  notes: `QUICK CHECK ANSWER: 5 mm ÷ 200 000 = 2.5 × 10⁻⁵ mm = 0.025 µm = 25 nm. HT: 2.5 × 10⁻⁸ m.\nOn screen the bar is ${SB_BAR} in and the chloroplast ${(0.9 * SB_BAR).toFixed(2)} in, so they are in the correct 20 : 18 proportion; the numbers in the question refer to the printed page. Magnification ${sbMag} and real size ${chlReal} µm asserted in node.`,
}), 'Scale bars');

// ======================= 17 RECAP 4 =======================
const R4 = D.recapSlide(4, 'Magnification calculations', [
  { q: 'Write the equation that links **magnification**, **image size** and **real size**.', marks: 1, ms: 'magnification = image size ÷ real size (1). Any correct rearrangement.' },
  { q: 'A microscope has a **×10** eyepiece and a **×40** objective. Calculate the total magnification.', marks: 1, ms: '×400 (1).' },
  { q: 'An image of a cell is **36 mm** long at a magnification of **×1200**. Calculate the real length of the cell in **µm**.', marks: 3, ms: 'real size = image size ÷ magnification (1); 36 ÷ 1200 = 0.03 mm (1); = 30 µm (1). Correct answer with no working = 3.' },
  { q: 'On a micrograph, a scale bar **10 mm** long represents **2 µm**. Calculate the magnification.', marks: 2, ms: '10 mm = 10 000 µm (1); 10 000 ÷ 2 = ×5000 (1).' },
]);
reg(R4.s, 'Recap 4');

// ======================= 18 PAG B1: PREPARING SLIDES =======================
reg(D.contentSlide({
  title: 'PAG B1: preparing microscope slides',
  subtitle: 'Practical activity group B1 microscopy • onion epidermis with iodine; cheek cells with methylene blue',
  tag: 'PAG B1', pag: 'PAG B1', caption: 'apparatus for making a wet mount',
  draw: (s, p) => {
    // pipette
    box(s, 0.95, 1.55, 0.1, 1.05, 'E8F1F8', '5B9BD5', { lw: 1 });
    s.addShape(SH.OVAL, { x: 0.87, y: 1.42, w: 0.26, h: 0.3, fill: { color: '9AA3B0' }, line: { color: '5A6275', width: 1 } });
    ball(s, 1.0, 2.72, 0.05, 'B07B2A', '6E4A14');
    label(s, 0.55, 2.85, 1.0, 'pipette of stain', { h: 0.4, size: 10, valign: 'top' });
    // slide top view with onion layer + stain
    box(s, 1.65, 1.75, 2.2, 0.75, 'EAF3FA', '5B9BD5', { lw: 1.25 });
    s.addShape(SH.OVAL, { x: 2.35, y: 1.88, w: 0.8, h: 0.5, fill: { color: 'D9A441', transparency: 35 }, line: { color: 'B07B2A', width: 0.75 } });
    box(s, 2.48, 1.96, 0.55, 0.34, 'F6E9C4', '9C7A2A', { lw: 0.75 });
    label(s, 1.65, 2.55, 2.2, 'slide: onion layer in a drop of iodine', { h: 0.4, size: 10, valign: 'top' });
    // forceps
    line(s, 4.15, 1.5, 4.75, 2.45, '5A6275', 2.5); line(s, 4.45, 1.48, 4.8, 2.45, '5A6275', 2.5);
    box(s, 4.68, 2.42, 0.2, 0.12, 'F6E9C4', '9C7A2A', { lw: 0.5 });
    label(s, 4.0, 2.6, 1.0, 'forceps', { h: 0.26, size: 10 });
    // cotton bud
    line(s, 5.45, 1.55, 5.85, 2.35, 'C99A5B', 3);
    s.addShape(SH.OVAL, { x: 5.75, y: 2.25, w: 0.24, h: 0.3, fill: { color: C.white }, line: { color: '9AA3B0', width: 1 } });
    label(s, 5.2, 2.6, 1.2, 'clean cotton bud (cheek)', { h: 0.4, size: 10, valign: 'top' });
    // side view: lowering a coverslip with a mounted needle
    label(s, 0.7, 3.25, 5.6, 'Lowering the coverslip (side view)', { size: 11, bold: true, color: C.blue, align: 'left' });
    box(s, 0.85, 4.55, 5.2, 0.14, 'EAF3FA', '5B9BD5', { lw: 1.25 });
    s.addShape(SH.OVAL, { x: 2.15, y: 4.42, w: 1.0, h: 0.2, fill: { color: 'D9A441', transparency: 30 }, line: { color: 'B07B2A', width: 0.75 } });
    // coverslip at ~25°, left end resting at x 2.15 on the drop
    const cx0 = 2.12, cy0 = 4.5, L = 1.6, ang = -25 * Math.PI / 180;
    line(s, cx0, cy0, cx0 + L * Math.cos(ang), cy0 + L * Math.sin(ang), '5B9BD5', 4);
    const nx = cx0 + L * 0.82 * Math.cos(ang), ny = cy0 + L * 0.82 * Math.sin(ang);
    line(s, nx + 0.35, ny + 0.02, nx + 1.6, ny - 0.18, 'C99A5B', 5);
    line(s, nx - 0.05, ny + 0.05, nx + 0.35, ny + 0.02, '5A6275', 1.5);
    label(s, nx + 0.6, ny + 0.05, 1.4, 'mounted needle', { h: 0.26, size: 10, bold: true, align: 'left' });
    label(s, 1.4, 3.75, 1.1, 'coverslip', { h: 0.26, size: 10, bold: true, align: 'right', color: '2B6CA8' });
    line(s, 2.52, 3.9, 2.75, 4.2, '2B6CA8', 0.75);
    label(s, 0.85, 4.75, 2.2, 'drop of stain + specimen', { h: 0.26, size: 10, bold: true, align: 'left' });
    label(s, 0.85, 5.1, 5.3, 'Lower slowly from one edge so air is pushed out: **no air bubbles**.', { h: 0.3, size: 10.5, align: 'left' });
    label(s, 0.85, 5.42, 5.3, 'Iodine: nuclei go yellow-brown. Methylene blue: nuclei go dark blue.', { h: 0.3, size: 10.5, align: 'left' });
  },
  head: 'Method',
  lines: [
    '**Onion:** peel a thin layer of **epidermis** from the inside of an onion scale with forceps. Lay it flat in a drop of **iodine solution** on a slide.',
    '**Cheek:** gently rub the inside of your cheek with a **clean cotton bud**. Smear it on a slide and add a drop of **methylene blue**.',
    'Lower a **coverslip** at an angle with a mounted needle. Blot excess stain with a paper towel.',
    'The **stain** makes the transparent cells and their nuclei visible.',
  ],
  size: 10.5,
  worked: { head: 'Safety', q: '',
    steps: [['Eyes', 'wear eye protection: iodine and methylene blue are irritants and stain skin'], ['Cheek cells', 'use only your own cells; a new cotton bud; put used buds and slides in disinfectant'], ['Glass', 'handle slides and coverslips carefully; report breakages'], ['Light', 'never reflect direct sunlight into the microscope']], size: 10.5 },
  workedH: 2.05,
  qc: 'Why must the layer of onion epidermis be only **one cell thick**? Why is a stain added?',
  notes: 'QUICK CHECK ANSWER: Light must pass through the specimen; a thin layer lets light through and stops cells overlapping, so individual cells can be seen. The stain colours parts of the cell (e.g. the nucleus) so they show up against the transparent cytoplasm, increasing contrast.\nPAG B1 is the OCR practical activity group for microscopy (group number from the OCR PAG list, from memory: UNVERIFIED for J260; check the J260 PAG handbook).\nSafety follows CLEAPSS guidance in outline: check your school\'s risk assessment for cheek cells (some schools use prepared slides or the onion only). Used cotton buds and slides go into 1% Virkon or similar disinfectant.',
}), 'PAG B1 Preparing slides');

// ======================= 19 PAG B1: USING THE MICROSCOPE AND DRAWING =======================
reg(D.contentSlide({
  title: 'PAG B1: viewing and drawing cells',
  subtitle: 'Practical activity group B1 microscopy • focus on low power first, then draw what you see',
  tag: 'PAG B1', pag: 'PAG B1', caption: 'onion epidermis at ×100 (left) and a good biological drawing (right)',
  draw: (s, p) => {
    label(s, 0.6, 1.4, 2.9, 'What you see (×100)', { size: 10.5, bold: true, color: C.blue });
    fieldView(s, 2.05, 3.2, 1.45);
    onionCells(s, 2.05, 3.2, 1.45, 0.72, 0.32, { nr: 0.045 });
    label(s, 3.75, 1.4, 2.6, 'Your drawing', { size: 10.5, bold: true, color: C.blue });
    box(s, 3.75, 1.75, 2.6, 3.4, C.white, C.line);
    // pencil drawing: 3 cells, clean lines, no shading
    [[3.95, 2.25], [4.95, 2.25], [4.45, 2.95]].forEach(([x, y]) => {
      box(s, x, y, 1.0, 0.7, null, '333333', { lw: 1 });
      s.addShape(SH.OVAL, { x: x + 0.35, y: y + 0.24, w: 0.2, h: 0.2, fill: { type: 'none' }, line: { color: '333333', width: 1 } });
    });
    line(s, 4.55, 2.59, 5.55, 1.95, '333333', 0.75); label(s, 5.5, 1.82, 0.8, 'nucleus', { h: 0.22, size: 10, align: 'left' });
    line(s, 4.95, 3.65, 5.55, 3.95, '333333', 0.75); label(s, 5.5, 3.85, 0.85, 'cell wall', { h: 0.22, size: 10, align: 'left' });
    line(s, 4.3, 2.75, 4.15, 3.95, '333333', 0.75); label(s, 3.85, 3.95, 1.1, 'cytoplasm', { h: 0.22, size: 10, align: 'left' });
    label(s, 3.8, 4.35, 2.5, 'Onion epidermis cells ×100', { h: 0.26, size: 10.5, bold: true });
    label(s, 3.8, 4.65, 2.5, '(title and magnification)', { h: 0.26, size: 10, italic: true, color: C.grey });
    box(s, 0.65, 5.25, 5.7, 0.55, C.white, C.line, { shape: SH.ROUNDED_RECTANGLE, r: 0.05 });
    label(s, 0.75, 5.25, 5.5, 'Drawing size: an onion cell 250 µm long at ×100 is drawn **25 mm** long.', { h: 0.55, size: 10.5, align: 'left' });
  },
  head: 'Using the microscope',
  lines: [
    'Clip the slide on the stage. Start with the **lowest power** (×4) objective.',
    'Looking from the **side**, turn the coarse focus to bring the lens close to the slide.',
    'Look down the eyepiece and turn the coarse focus to move them **apart** until the cells are in focus.',
    'Move to ×10 then ×40 and use only the **fine focus**.',
  ],
  size: 10.5,
  worked: { head: 'Rules for a biological drawing', q: '',
    steps: [['Pencil', 'sharp pencil; clear, continuous lines; no shading'], ['Scale', 'draw a few cells large, with correct proportions'], ['Labels', 'ruled label lines that do not cross; labels outside the drawing'], ['Answer', 'add a title and the magnification']], size: 10.5 },
  workedH: 2.05,
  qc: 'Why do you look from the **side** while lowering the objective, and why start on the **lowest power**?',
  notes: `QUICK CHECK ANSWER: Looking from the side stops you crashing the objective into the slide (breaking it or damaging the lens). Low power has the widest field of view and the most depth, so it is easiest to find and focus on the cells; then you centre the cells before going to higher power.\nDrawing size check: 250 µm × 100 = 25 000 µm = ${onionUM * 100 / 1000} mm (node). Onion cells in the field of view are drawn in proportion (not to an exact scale).`,
}), 'PAG B1 Viewing and drawing');

// ======================= 20 PAG B1: MEASURING, RESULTS, ERRORS =======================
{
  const s = D.contentHeader('PAG B1: measuring cells, results and errors', 'Practical activity group B1 microscopy • calibrate an eyepiece graticule with a stage micrometer', { pag: 'PAG B1', tag: 'PAG B1' });
  D.panel(s, 0.45, 1.3, 6.1, 4.95, 'graticule calibration at ×400 (top) and measuring a cheek cell (bottom)');
  label(s, 0.65, 1.4, 5.7, 'Calibrate: line up the two scales (×400)', { size: 11, bold: true, color: C.blue, align: 'left' });
  // stage micrometer: 10 divisions of 10 µm; eyepiece graticule: 40 units over the same length
  const sx = 0.95, sw = 4.8;
  box(s, sx - 0.1, 1.85, sw + 0.2, 0.55, 'EAF3FA', '5B9BD5', { lw: 0.75 });
  for (let i = 0; i <= 10; i++) line(s, sx + i * sw / 10, 1.9, sx + i * sw / 10, 2.15, '1F3A68', i % 5 ? 1.25 : 2);
  line(s, sx, 2.15, sx + sw, 2.15, '1F3A68', 1.25);
  label(s, sx, 2.15, sw, 'stage micrometer: each division = 10 µm (100 µm in total)', { h: 0.24, size: 10, color: '1F3A68' });
  box(s, sx - 0.1, 2.5, sw + 0.2, 0.62, 'FFF4E0', 'E39A2F', { lw: 0.75 });
  line(s, sx, 2.55, sx + sw, 2.55, C.orange, 1.25);
  for (let i = 0; i <= 40; i++) line(s, sx + i * sw / 40, 2.55, sx + i * sw / 40, 2.55 + (i % 10 ? (i % 5 ? 0.1 : 0.17) : 0.24), C.orange, i % 10 ? 0.75 : 1.5);
  for (let i = 0; i <= 40; i += 10) label(s, sx + i * sw / 40 - 0.2, 2.8, 0.4, String(i), { h: 0.22, size: 10, bold: true, color: C.orange });
  label(s, 0.65, 3.14, 5.7, `40 eyepiece units = 100 µm, so **1 eyepiece unit = ${epu400} µm** at ×400`, { h: 0.3, size: 11, align: 'left' });
  // measuring a cheek cell
  fieldView(s, 1.75, 4.55, 0.95);
  s.addShape(SH.OVAL, { x: 1.75 - 0.6, y: 4.55 - 0.45, w: 1.2, h: 0.9, fill: { color: 'E3ECF7' }, line: { color: '5B7FB0', width: 1 } });
  ball(s, 1.82, 4.5, 0.13, '3E64A8', '2B4C9B');
  line(s, 1.15, 4.55 + 0.52, 2.35, 4.55 + 0.52, C.orange, 1.25);
  for (let i = 0; i <= 24; i++) line(s, 1.15 + i * 1.2 / 24, 5.07, 1.15 + i * 1.2 / 24, 5.07 - (i % 4 ? 0.06 : 0.11), C.orange, 0.75);
  s.addText([...brk(R_('**Measure:** the cell spans **24** eyepiece units', { fontSize: 11 })), ...brk(R_(`size = 24 × ${epu400} µm = **${cheekUM} µm**`, { fontSize: 11 })), ...R_('Measure **5 cells** and find the mean.', { fontSize: 11 })],
    { x: 2.95, y: 3.75, w: 3.45, h: 1.5, fontFace: 'Calibri', valign: 'middle', margin: 0 });
  // results table
  const cell = (t, i, o = {}) => ({ text: String(t), options: Object.assign({ fill: { color: i % 2 ? C.white : C.cardBlue }, align: 'center' }, o) });
  const rows = [[HDR('Cells'), HDR('1'), HDR('2'), HDR('3'), HDR('4'), HDR('5'), HDR('Mean'), HDR('Size')],
    [cell('cheek ×400', 0, { bold: true }), ...cheekEPU.map(v => cell(v, 0)), cell(cheekMean, 0, { bold: true }), cell(`${cheekUM} µm`, 0, { bold: true })],
    [cell('onion ×100', 1, { bold: true }), ...onionEPU.map(v => cell(v, 1)), cell(onionMean, 1, { bold: true }), cell(`${onionUM} µm`, 1, { bold: true })]];
  s.addTable(rows, { x: 6.8, y: 1.3, w: 6.08, colW: [1.3, 0.55, 0.55, 0.55, 0.55, 0.55, 0.78, 1.25], rowH: 0.3, fontFace: 'Calibri', fontSize: 10.5, color: C.text, valign: 'middle', border: { type: 'solid', color: C.line, pt: 0.75 } });
  label(s, 6.8, 2.24, 6.08, `lengths in eyepiece units • ×400: 1 unit = ${epu400} µm • ×100: 1 unit = ${epu100} µm`, { size: 10, italic: true, color: C.grey, align: 'left', h: 0.22 });
  D.card(s, 6.8, 2.55, 6.08, 1.52, 'Results', [
    `Mean cheek cell = 24 × ${epu400} = **${cheekUM} µm**. Mean onion cell = 25 × ${epu100} = **${onionUM} µm**.`,
    'Onion cells are about **4 times** longer than cheek cells.',
    'Cells vary, so measuring several and taking a **mean** gives a better estimate.',
  ], { size: 10.5 });
  D.workedSteps(s, 6.8, 4.18, 6.08, 2.07, 'Sources of error and improvements', '', [
    ['Calibration', 'graticule units change with each objective → recalibrate for every lens'],
    ['Edges', 'cell edges are hard to judge → measure along the same axis; use higher power'],
    ['Preparation', 'air bubbles, folds or overlapping cells → thinner layer; lower coverslip slowly'],
    ['Answer', 'measure several cells, calculate a mean, ignore damaged cells']], { size: 10.5 });
  D.quickCheck(s, 'At ×100, 1 eyepiece unit = 10 µm. Why can you **not** use this value with the ×400 objective? What would 1 unit be at ×400?');
  D.notes(s, `QUICK CHECK ANSWER: The eyepiece graticule stays the same size in the eyepiece, but the specimen is magnified 4 times more at ×400, so each unit covers a smaller real distance. 1 unit = 10 ÷ 4 = 2.5 µm (matches the calibration).\nCalibration: 10 stage divisions (100 µm) = 40 eyepiece units at ×400 → ${epu400} µm per unit; at ×100, 10 divisions = 10 units → ${epu100} µm per unit. Means: cheek ${cheekMean} units → ${cheekUM} µm; onion ${onionMean} → ${onionUM} µm. All asserted in node. Data are illustrative (typical cheek cells 50–60 µm; onion epidermis cells 200–400 µm long).\nAlternative method without a graticule: estimate from the field of view diameter (e.g. ×400 field ≈ 0.4 mm) by counting how many cells fit across it.`);
  reg(s, 'PAG B1 Measuring and results');
}

// ======================= 21 RECAP 5 =======================
const R5 = D.recapSlide(5, 'PAG B1 microscopy', [
  { q: 'Why is **methylene blue** added to cheek cells on a slide?', marks: 1, ms: 'To stain the cells / nucleus so they can be seen (more contrast) (1).' },
  { q: 'Explain why the coverslip is lowered **at an angle** using a mounted needle.', marks: 1, ms: 'To avoid trapping air bubbles (which hide the cells) (1).' },
  { q: 'Give **two** rules for making a scientific drawing of cells.', marks: 2, ms: 'Any two (1 each): sharp pencil; clear continuous lines / no sketching; no shading; ruled label lines that do not cross; title and magnification; correct proportions; drawing large enough.' },
  { q: 'At ×400, **40** eyepiece units line up with **100 µm** on a stage micrometer. A cell is **24** eyepiece units long. Calculate its real length.', marks: 2, ms: '1 unit = 100 ÷ 40 = 2.5 µm (1); 24 × 2.5 = 60 µm (1).' },
  { q: 'Why should the student measure **several** cells?', marks: 1, ms: 'Cells vary in size, so a mean is more representative / reduces the effect of random error (1).' },
]);
reg(R5.s, 'Recap 5');

// ======================= KEY WORDS =======================
reg(D.keyWords([
  ['Eukaryotic cell', 'Cell with its DNA inside a nucleus, e.g. plant, animal and fungal cells.'],
  ['Prokaryotic cell', 'Cell with no nucleus, e.g. a bacterium. Its DNA is free in the cytoplasm.'],
  ['Nucleus', 'Contains the genetic material (chromosomes); controls the cell.'],
  ['Cell membrane', 'Controls what substances enter and leave the cell.'],
  ['Cytoplasm', 'Jelly where many chemical reactions happen, e.g. anaerobic respiration.'],
  ['Mitochondria', 'Organelles where aerobic respiration happens.'],
  ['Ribosomes', 'Tiny structures where proteins are made. Seen only with an electron microscope.'],
  ['Chloroplasts', 'Organelles in some plant cells that absorb light for photosynthesis.'],
  ['Cell wall', 'Strengthens the cell. Cellulose in plants; not cellulose in bacteria.'],
  ['Permanent vacuole', 'Large space in a plant cell filled with cell sap.'],
  ['Plasmids', 'Small rings of DNA in bacteria, separate from the main DNA loop.'],
  ['Chromosomal DNA', 'In a bacterium: one large loop of DNA holding most genes.'],
  ['Magnification', 'How many times bigger the image is: image size ÷ real size.'],
  ['Resolution', 'Smallest distance between two points that can be seen as separate.'],
  ['Electron microscope', 'Uses electrons; much higher magnification and resolution than light.'],
  ['µm and nm', '1 mm = 1000 µm; 1 µm = 1000 nm. HT: 1 µm = 10^^−6^^ m; 1 nm = 10^^−9^^ m.'],
], { notes: 'Use as a cover-and-recall activity: hide the definitions, students say them, then reveal.' }), 'Summary: key words');

// ======================= FULL QUESTION =======================
reg(D.fullQuestion('A student uses a light microscope to look at **onion cells**. She then compares them with an electron micrograph of a **bacterium**.', [
  { l: 'a', q: 'Name **two** structures found in **both** a bacterial cell and an onion cell.', marks: 2, ms: 'Any two (1 each): cell membrane; cytoplasm; ribosomes; cell wall.' },
  { l: 'b', q: 'Describe **two** differences between the genetic material of the bacterium and the genetic material of the onion cell.', marks: 2, ms: 'Bacterium: DNA free in the cytoplasm / no nucleus (onion: DNA in a nucleus) (1); bacterium: single loop of chromosomal DNA and plasmids (onion: chromosomes, no plasmids) (1).' },
  { l: 'c', q: 'The eyepiece lens is **×10** and the objective lens is **×40**. Calculate the total magnification. Give **one** reason why she adds **iodine** to the onion cells.', marks: 2, ms: '×400 (1); to stain the cells / nucleus so they can be seen / to increase contrast (1).', h: 1.1 },
  { l: 'd', q: 'Her drawing of one onion cell is **100 mm** long at a magnification of **×400**. Calculate the real length of the cell in **µm**.', marks: 3, ms: 'real size = image size ÷ magnification (1); 100 ÷ 400 = 0.25 mm (1); = 250 µm (1). Correct answer with no working = 3.', h: 1.1 },
  { l: 'e', q: 'Write your answer to (d) in **metres**, in **standard form**.', marks: 1, ht: true, ms: '2.5 × 10⁻⁴ m (1). Allow error carried forward from (d).', h: 0.8 },
  { l: 'f', q: 'Ribosomes are about **25 nm** across. Explain why ribosomes were not discovered until electron microscopes were developed.', marks: 3, ms: 'Light microscopes have a resolution of about 200 nm / cannot show detail smaller than about 200 nm (1); ribosomes are smaller than this, so they cannot be seen / cannot be resolved (1); electron microscopes have a much higher resolution (about 0.2 nm), so ribosomes can be seen (1).', h: 1.3 },
], 13, { subtitle: `Specification ${sp('B4.2.1')}, B1.1 link and PAG B1 • answer every part • 13 marks • (e) is HT` }), 'Full question');

// ======================= HOMEWORK =======================
const HW = [
  { n: '1', q: 'State the function of the **ribosomes**.', marks: 1, ms: 'Protein synthesis / where proteins are made (1).' },
  { n: '2', q: 'In a bacterium, name (a) the structure that holds **most** of its genes and (b) the small **rings** of DNA.', marks: 2, ms: '(a) DNA loop / chromosomal DNA / single circular chromosome (1); (b) plasmids (1).' },
  { n: '3', q: 'Convert (a) **0.5 mm** into µm and (b) **3000 nm** into µm.', marks: 2, ms: '(a) 500 µm (1); (b) 3 µm (1).' },
  { n: '4', q: 'A mitochondrion is **2 µm** long. Its image in an electron micrograph is **30 mm** long. Calculate the magnification.', marks: 2, ms: '30 mm = 30 000 µm (1); 30 000 ÷ 2 = ×15 000 (1).' },
  { n: '5', q: 'A virus is 1 × 10^^−7^^ m long and a bacterium is 2 × 10^^−6^^ m long. How many times longer is the bacterium? About how many orders of magnitude is this?', marks: 2, ht: true, ms: '(2 × 10⁻⁶) ÷ (1 × 10⁻⁷) = 20 times (1); about one order of magnitude (10¹) (1).' },
  { n: '6', q: 'Give **two** safety precautions when preparing a slide of **cheek cells** stained with methylene blue.', marks: 2, ms: 'Any two (1 each): wear eye protection; use a new / clean cotton bud; only use your own cells; put used cotton buds and slides in disinfectant; wash hands; avoid skin contact with the stain.' },
  { n: '7', q: 'For about 300 years scientists studied cells with **light microscopes**. Explain how the development of the **electron microscope** has increased our understanding of **cell structures**. Use ideas about magnification and resolution, and examples of structures.', marks: 6, levels: true, h: 2.6, ms: levelsHW() },
];
function levelsHW() {
  return D.levels6([
    'Light microscopes: magnification up to about ×2000; resolution about 200 nm.',
    'Light microscopes showed cells, the nucleus, the cell wall, chloroplasts and vacuoles; mitochondria only as tiny dots / granules.',
    'Electron microscopes use a beam of electrons; magnification up to about ×2 000 000; resolution about 0.2 nm (about 1000 times better).',
    'Higher resolution means much finer detail can be seen / two close points can be told apart.',
    'Electron microscopes showed the internal structure of mitochondria: double membrane, folded inner membrane (cristae).',
    'This helped explain the function of mitochondria: a large surface area for the enzymes of aerobic respiration.',
    'Electron microscopes revealed ribosomes (about 25 nm, too small for a light microscope), the nuclear membrane / pores, and the structure of bacteria (DNA loop, plasmids).',
    'Ideas about Science: a new technology produced new observations / data, which led to new or changed explanations of how cells work.',
  ], {
    l3: 'Explains the difference in resolution AND magnification AND links this to at least two named structures that were seen or understood in detail only with the electron microscope.',
    l2: 'Describes that electron microscopes have higher magnification or resolution AND gives at least one named structure revealed by electron microscopy.',
    l1: 'Makes a simple statement that electron microscopes magnify more / show more detail, OR names a structure seen with an electron microscope.',
  });
}
D.homework('Answer all questions. Q5 is Higher tier (HT).', HW, 17);
SLIDES.push(`${D.slideNo - 1}. Homework divider`);
SLIDES.push(`${D.slideNo}. Homework`);

// ======================= checks & save =======================
assert.strictEqual(R1.total, 7); assert.strictEqual(R2.total, 7); assert.strictEqual(R3.total, 7); assert.strictEqual(R4.total, 7); assert.strictEqual(R5.total, 7);
const out = path.join(__dirname, 'OCR21C_B4.2_CellStructures_Combined.pptx');
D.save(out).then(n => { console.log(SLIDES.join('\n')); });
