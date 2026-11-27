// Axial skeleton diagrams: skull (lateral), thoracic cage, vertebral column (lateral), vertebra + disc.
import { figure, label, note, key, smooth, poly, band, seg, r } from './_svg.js';
import { cx, X, spine, ribs, sternum, RIB } from './skeleton.js';

/* ---------------- Skull, lateral view (facing left) ---------------- */

function skull() {
  const cranium = smooth([[250, 238], [246, 212], [252, 170], [270, 128], [300, 94], [345, 68], [400, 54], [460, 52], [515, 64], [560, 90], [594, 128], [614, 175], [618, 225], [608, 268], [588, 300], [562, 324], [536, 338], [500, 336], [460, 326], [420, 318], [370, 310], [330, 302], [296, 292], [268, 270]], true, 1);
  const reg = pts => poly(pts);
  const frontal = reg([[180, 0], [394, 0], [392, 54], [384, 110], [372, 160], [360, 206], [348, 246], [320, 300], [180, 320]]);
  const parietal = reg([[394, 0], [556, 0], [552, 88], [566, 150], [566, 212], [544, 266], [520, 228], [470, 206], [420, 204], [374, 220], [348, 246], [360, 206], [372, 160], [384, 110], [392, 54]]);
  const occipital = reg([[556, 0], [720, 0], [720, 420], [536, 420], [540, 330], [544, 266], [566, 212], [566, 150], [552, 88]]);
  const temporal = reg([[348, 246], [374, 220], [420, 204], [470, 206], [520, 228], [544, 266], [540, 330], [526, 360], [460, 345], [400, 330], [356, 312]]);
  const sphenoid = reg([[322, 250], [348, 246], [356, 312], [326, 306]]);
  const sutures = `<path class="suture" d="M392 54 Q386 110 374 160 Q362 206 348 246"/>
    <path class="suture" d="M552 88 Q568 150 566 212 Q560 245 544 266"/>
    <path class="suture" d="M348 246 Q372 218 420 204 Q470 204 520 228 Q536 244 544 266"/>`;
  const sm = (pts, t = 0.7) => smooth(pts, true, t);
  const maxilla = sm([[254, 248], [266, 262], [270, 290], [300, 300], [306, 328], [340, 330], [352, 348], [346, 364], [262, 366], [249, 352], [246, 332], [241, 304], [246, 272]]);
  const zygomatic = sm([[300, 236], [312, 240], [316, 268], [334, 290], [374, 306], [372, 320], [334, 322], [306, 334], [290, 314], [292, 288], [298, 262]]);
  const nasal = sm([[249, 238], [259, 242], [248, 284], [234, 283], [240, 258]], 0.5);
  const mandible = sm([[262, 394], [344, 394], [382, 388], [408, 352], [420, 322], [433, 346], [446, 352], [455, 334], [463, 322], [471, 331], [467, 372], [459, 418], [446, 438], [420, 447], [340, 453], [284, 459], [262, 453], [254, 432], [258, 410]], 0.6);
  const teeth = (y, x0, x1, h) => { let t = `<rect class="bn" x="${x0}" y="${y}" width="${x1 - x0}" height="${h}" rx="3"/>`; for (let x = x0 + 10; x < x1; x += 10) t += `<path class="ln-thin" d="${seg(x, y, x, y + h)}"/>`; return t; };
  const mastoid = sm([[512, 322], [534, 330], [522, 382], [502, 344]], 0.7);
  const arch = `M444 320 Q412 312 372 314`;
  const styloid = `M481 344 L462 392`;

  const L = 205, R = 650;
  const labels = [
    label(300, 150, L, 120, 'Frontal bone'),
    label(250, 262, L, 214, 'Nasal bone'),
    label(334, 268, L, 252, 'Sphenoid (greater wing)'),
    label(303, 312, L, 300, 'Zygomatic bone'),
    label(272, 342, L, 348, 'Maxilla'),
    label(300, 430, L, 430, 'Mandible'),
    label(376, 140, R, 54, 'Coronal suture'),
    label(470, 130, R, 96, 'Parietal bone'),
    label(470, 205, R, 138, 'Squamous suture'),
    label(566, 180, R, 180, 'Lambdoid suture'),
    label(596, 240, R, 222, 'Occipital bone'),
    label(450, 270, R, 264, 'Temporal bone'),
    label(488, 318, R, 304, 'External acoustic meatus'),
    label(518, 366, R, 344, 'Mastoid process'),
    label(464, 328, R, 384, 'Temporomandibular joint'),
    label(470, 376, R, 420, 'Styloid process'),
    label(405, 315, R, 456, 'Zygomatic arch'),
  ].join('');
  return `
  <defs><clipPath id="sk-cr"><path d="${cranium}"/></clipPath></defs>
  <g clip-path="url(#sk-cr)">
    <path class="hl1" d="${frontal}"/><path class="hl2" d="${parietal}"/><path class="hl5" d="${occipital}"/>
    <path class="hl3" d="${temporal}"/><path class="hl4" d="${sphenoid}"/>
  </g>
  <path class="ln" d="${cranium}"/>
  ${sutures}
  <path class="hl3" d="${mastoid}"/>
  ${band(styloid, 4, 'h3')}
  <path class="cart" d="${maxilla}"/>
  <ellipse class="hole" cx="280" cy="262" rx="22" ry="24"/>
  <path class="hl4" d="${nasal}"/>
  ${band(arch, 12, 'h3')}
  <path class="my" d="${zygomatic}"/>
  ${teeth(363, 262, 346, 16)}
  <path class="bn-2" d="${mandible}"/>
  ${teeth(380, 266, 344, 15)}
  <circle class="hole" cx="298" cy="424" r="3.5"/>
  <ellipse class="hole" cx="488" cy="318" rx="9" ry="11"/>
  ${labels}`;
}

export const SKULL = figure({
  title: 'The skull (lateral view)',
  viewBox: '0 0 860 480',
  minWidth: 600,
  body: skull(),
  caption: 'The cranium (frontal, parietal, temporal, occipital, sphenoid and ethmoid) encloses the brain; its bones are joined by immovable fibrous sutures. The facial bones include the maxilla, zygomatic, nasal and mandible. The mandible is the only movable skull bone, hinging at the temporomandibular joint just in front of the ear canal.',
});

/* ---------------- Thoracic cage (anterior) ---------------- */

function cage() {
  const rb = ribs('h1', 'h2', 'h3', true);
  const L = 268, R = 492;
  const yA = RIB.yA, yL = RIB.yL;
  const labels = [
    label(cx - 6, 226, L, 214, 'Manubrium'),
    label(cx - 11, 246, L, 240, 'Sternal angle (rib 2)'),
    label(cx - 6, 290, L, 268, 'Body of sternum'),
    label(cx - 1, 348, L, 296, 'Xiphoid process'),
    label(X(-1, 30), 288, L, 324, 'Costal cartilage'),
    label(X(-1, 66), 297, L, 352, 'Intercostal space'),
    label(X(-1, 70), yA(8) + 6, L, 380, 'Costal margin'),
    label(X(1, 30), 238, R, 214, 'Rib 1'),
    label(X(1, 78), yL(3) + 14, R, 252, 'True ribs (1–7)'),
    label(X(1, 88), yL(8) + 14, R, 300, 'False ribs (8–10)'),
    label(X(1, 64), yL(11) + 22, R, 348, 'Floating ribs (11–12)'),
    label(cx + 14, 395, R, 384, 'T12 vertebra'),
  ].join('');
  return `
  ${key(110, 140, [['hl1', 'True ribs (1–7)']], 0)}${key(110, 164, [['hl2', 'False ribs (8–10)']], 0)}${key(500, 140, [['hl3', 'Floating ribs (11–12)']], 0)}${key(500, 164, [['cart', 'Costal cartilage']], 0)}
  ${spine()}${rb.back}${rb.bone}${rb.cart}${sternum('bn')}${labels}`;
}

export const THORACIC_CAGE = figure({
  title: 'The thoracic cage (anterior view)',
  viewBox: '100 118 560 312',
  minWidth: 540,
  body: cage(),
  caption: 'Twelve pairs of ribs join the thoracic vertebrae at the back. Ribs 1–7 (true ribs) reach the sternum by their own costal cartilage; ribs 8–10 (false ribs) join the cartilage of the rib above, forming the costal margin; ribs 11–12 (floating ribs) end free in the abdominal wall. The costal cartilage lets the cage expand when you breathe.',
});

/* ---------------- Vertebral column, lateral view (anterior = left) ---------------- */

function sampleSpline(pts, n = 1200) {
  const out = [];
  const P = i => pts[Math.max(0, Math.min(pts.length - 1, i))];
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
    const steps = Math.ceil(n / (pts.length - 1));
    for (let k = 0; k < steps; k++) {
      const t = k / steps, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) => 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  // cumulative arc length
  let s = 0; const acc = [0];
  for (let i = 1; i < out.length; i++) { s += Math.hypot(out[i][0] - out[i - 1][0], out[i][1] - out[i - 1][1]); acc.push(s); }
  const at = len => {
    let i = acc.findIndex(v => v >= len); if (i < 1) i = Math.max(1, i < 0 ? out.length - 1 : 1);
    const a = out[i - 1], b = out[i];
    const k = (len - acc[i - 1]) / ((acc[i] - acc[i - 1]) || 1);
    const p = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const t = [(b[0] - a[0]) / d, (b[1] - a[1]) / d]; // tangent (downwards)
    const nrm = [t[1], -t[0]];                           // normal pointing posterior (+x)
    return { p, t, n: nrm };
  };
  return { at, length: s };
}

function column() {
  const line = sampleSpline([[300, 34], [291, 72], [288, 108], [300, 152], [322, 222], [334, 300], [327, 380], [307, 444], [286, 504], [284, 560], [300, 604], [319, 648], [335, 684], [338, 712], [328, 738]]);
  const regions = [
    { name: 'cervical', n: 7, hb: 14, disc: 4.5, wb: 28, sp: 22, drop: 3, spw: 6, cls: 'hl2' },
    { name: 'thoracic', n: 12, hb: 17, disc: 4.5, wb: 34, sp: 30, drop: 16, spw: 7, cls: 'hl1' },
    { name: 'lumbar', n: 5, hb: 23, disc: 8, wb: 44, sp: 30, drop: 3, spw: 15, cls: 'hl3' },
  ];
  const pt = (o, a, b) => [o.p[0] + o.n[0] * a + o.t[0] * b, o.p[1] + o.n[1] * a + o.t[1] * b];
  let s = 4, bodies = '', arches = '', discs = '', marks = {};
  let prevBottom = null;
  regions.forEach(R => {
    marks[R.name] = { start: s };
    for (let i = 0; i < R.n; i++) {
      const isC1 = R.name === 'cervical' && i === 0;
      const mid = line.at(s + R.hb / 2);
      const hw = R.wb / 2, hh = R.hb / 2;
      // disc above this body (none between C1 and C2, nor above C1)
      const top = [pt(mid, -hw, -hh), pt(mid, hw, -hh)];
      if (prevBottom && !(R.name === 'cervical' && i <= 1)) discs += `<path class="cart" d="${poly([prevBottom[0], prevBottom[1], top[1], top[0]])}"/>`;
      // body (C1 has no body: draw its anterior arch as a small ring)
      if (isC1) bodies += `<ellipse class="${R.cls}" cx="${r(pt(mid, -hw + 5, 0)[0])}" cy="${r(mid.p[1])}" rx="7" ry="6"/>`;
      else bodies += `<path class="${R.cls}" d="${smooth([pt(mid, -hw, -hh), pt(mid, 0, -hh - 0.8), pt(mid, hw, -hh), pt(mid, hw + 0.6, 0), pt(mid, hw, hh), pt(mid, 0, hh + 0.8), pt(mid, -hw, hh), pt(mid, -hw - 0.6, 0)], true, 0.35)}"/>`;
      if (R.name === 'cervical' && i === 1) bodies += `<path class="${R.cls}" d="${smooth([pt(mid, -hw + 8, -hh), pt(mid, -hw + 12, -hh - 14), pt(mid, -hw + 18, -hh - 14), pt(mid, -hw + 20, -hh)], true, 0.5)}"/>`; // dens of C2
      // posterior arch: pedicle + lamina + spinous process (tip angled down by "drop")
      const spLen = R.sp + (R.name === 'cervical' && i === 6 ? 12 : 0); // C7 vertebra prominens
      const a0 = pt(mid, hw - 1, -hh * 0.55), a1 = pt(mid, hw + 9, -hh * 0.75), tip1 = pt(mid, hw + spLen, R.drop - R.spw / 2), tip2 = pt(mid, hw + spLen - 2, R.drop + R.spw / 2), a2 = pt(mid, hw + 9, hh * 0.65), a3 = pt(mid, hw - 1, hh * 0.45);
      arches += `<path class="${R.cls}" d="${smooth([a0, a1, tip1, tip2, a2, a3], true, 0.45)}"/>`;
      // transverse/articular process hint (small knob at the arch)
      const k = pt(mid, hw + 10, 0);
      arches += `<circle class="ln" cx="${r(k[0])}" cy="${r(k[1])}" r="${R.name === 'lumbar' ? 5 : 3.5}"/>`;
      if (i === 0) marks[R.name].first = mid;
      if (i === R.n - 1) marks[R.name].last = mid;
      if (R.name === 'lumbar' && i === 2) marks.l3 = mid;
      if (R.name === 'thoracic' && i === 6) marks.t7 = mid;
      if (R.name === 'cervical' && i === 3) marks.c4 = mid;
      if (R.name === 'cervical' && i === 6) marks.c7 = { mid, tip: tip1 };
      if (R.name === 'cervical' && i === 1) marks.c2 = mid;
      if (R.name === 'cervical' && i === 0) marks.c1 = mid;
      if (R.name === 'lumbar' && i === 3) marks.l4 = { mid, tip: tip1, hw, hh };
      prevBottom = [pt(mid, -hw, hh), pt(mid, hw, hh)];
      s += R.hb + R.disc;
    }
    marks[R.name].end = s;
  });
  // sacrum (5 fused) and coccyx
  const sacStart = s, sacLen = 108;
  const sa = line.at(sacStart), sb = line.at(sacStart + sacLen * 0.5), sc = line.at(sacStart + sacLen);
  const sq = line.at(sacStart + sacLen * 0.25), s3 = line.at(sacStart + sacLen * 0.75);
  const sacrum = smooth([pt(sa, -23, 0), pt(sa, 2, -2), pt(sa, 24, 0), pt(sa, 32, 9), pt(sq, 22, 0), pt(sb, 18, 0), pt(s3, 12, 0), pt(sc, 6, 0), pt(sc, -5, 0), pt(s3, -9, 0), pt(sb, -12, 0), pt(sq, -17, 0)], true, 0.7);
  discs += `<path class="cart" d="${poly([prevBottom[0], prevBottom[1], pt(sa, 22, 0), pt(sa, -22, 0)])}"/>`;
  let ridges = '';
  for (let k = 1; k < 5; k++) { const m = line.at(sacStart + sacLen * k / 5); const w = 19 - k * 3; ridges += `<path class="ln-thin" d="${seg(...pt(m, -w, 0), ...pt(m, w - 2, 0))}"/>`; }
  let coccyx = '';
  for (let k = 0; k < 4; k++) { const m = line.at(sacStart + sacLen + 3 + k * 8); const w = 7 - k * 1.2; coccyx += `<path class="hl5" d="${smooth([pt(m, -w, -3), pt(m, w, -3), pt(m, w, 3), pt(m, -w, 3)], true, 0.5)}"/>`; }
  const sacMid = sb;

  // region brackets on the anterior (left) side
  const bracket = (s1, s2, text, sub) => {
    const a = line.at(s1), b = line.at(s2);
    const x = Math.min(a.p[0], b.p[0], line.at((s1 + s2) / 2).p[0]) - 44;
    const ym = (a.p[1] + b.p[1]) / 2;
    return `<path class="ln" d="M${r(x + 8)} ${r(a.p[1])} L${r(x)} ${r(a.p[1])} L${r(x)} ${r(b.p[1])} L${r(x + 8)} ${r(b.p[1])}"/>
      <text class="dg-region" x="${r(x - 8)}" y="${r(ym)}" text-anchor="end"><tspan x="${r(x - 8)}" dy="-0.2em">${text}</tspan><tspan x="${r(x - 8)}" dy="1.2em" class="dg-sub">${sub}</tspan></text>`;
  };
  const brackets = bracket(marks.cervical.start, marks.cervical.end - 4, 'Cervical', 'C1–C7') + bracket(marks.thoracic.start, marks.thoracic.end - 4, 'Thoracic', 'T1–T12') +
    bracket(marks.lumbar.start, marks.lumbar.end - 8, 'Lumbar', 'L1–L5') + bracket(sacStart, sacStart + sacLen, 'Sacrum', '5 fused') + bracket(sacStart + sacLen + 2, sacStart + sacLen + 32, 'Coccyx', '3–5 fused');

  const R = 470;
  const labels = [
    label(marks.c1.p[0] - 8, marks.c1.p[1], R, 30, 'Atlas (C1)'),
    label(marks.c2.p[0] - 6, marks.c2.p[1] - 14, R, 58, 'Axis (C2) with dens'),
    label(...pt(marks.c4, 30, 0), R, 96, 'Cervical lordosis'),
    label(marks.c7.tip[0], marks.c7.tip[1], R, 150, 'C7 (vertebra prominens)'),
    label(...pt(marks.t7, 52, 6), R, 300, 'Thoracic kyphosis'),
    label(...pt(marks.thoracic.first, 30, 14), R, 214, 'Spinous process'),
    label(...pt(marks.l4.mid, marks.l4.hw + 4, -marks.l4.hh - 5), R, 486, 'Intervertebral foramen'),
    label(...pt(marks.l3, 30, 0), R, 520, 'Lumbar lordosis'),
    label(...pt(sacMid, 20, 0), R, 650, 'Sacral kyphosis'),
  ].join('');
  const left = [
    label(...pt(marks.lumbar.last, -10, 0), 130, 598, 'Vertebral body', { anchor: 'end' }),
    label(...pt(marks.lumbar.last, -8, -14), 130, 556, 'Intervertebral disc', { anchor: 'end' }),
  ].join('');

  return `${discs}${arches}${bodies}<path class="hl5" d="${sacrum}"/>${ridges}${coccyx}${brackets}${labels}${left}
    ${note(150, 758, '◀ Anterior', 'dg-note', 'middle')}${note(470, 758, 'Posterior ▶', 'dg-note', 'middle')}`;
}

export const SPINE_LATERAL = figure({
  title: 'The vertebral column (lateral view)',
  viewBox: '0 0 700 772',
  minWidth: 520,
  body: column(),
  caption: 'Viewed from the left side with the front of the body on the left. 33 vertebrae in childhood become 26 bones in adults (7 cervical, 12 thoracic, 5 lumbar, the fused sacrum and coccyx). The S-shaped curves absorb shock: cervical and lumbar lordoses curve forwards; thoracic and sacral kyphoses curve backwards. Bodies get larger lower down because they carry more weight.',
});

/* ---------------- Typical vertebra (superior view) + intervertebral disc ---------------- */

function vertebra() {
  const c = 290;
  const M = pts => [...pts, ...pts.slice(0, -1).reverse().map(([x, y]) => [2 * c - x, y])];
  const body = smooth([[c - 62, 112], [c - 48, 86], [c, 76], [c + 48, 86], [c + 62, 112], [c + 54, 138], [c + 30, 150], [c, 146], [c - 30, 150], [c - 54, 138]], true, 0.75);
  // right half of the posterior arch (clockwise), then mirrored
  const archHalf = [[c + 22, 146], [c + 34, 150], [c + 38, 168], [c + 116, 160], [c + 124, 172], [c + 116, 184], [c + 44, 190], [c + 58, 196], [c + 60, 216], [c + 44, 224], [c + 22, 242], [c + 14, 304], [c, 310]];
  const arch = smooth(M(archHalf), true, 0.5);
  const foramen = smooth([[c, 156], [c + 22, 160], [c + 30, 184], [c + 16, 220], [c, 226], [c - 16, 220], [c - 30, 184], [c - 22, 160]], true, 0.8);
  const facet = s => `<ellipse class="cart" cx="${c + s * 48}" cy="206" rx="6" ry="11" transform="rotate(${s * 30} ${c + s * 48} 206)"/>`;

  // disc (superior view), anterior at top
  const dx = 740, dy = 156;
  let disc = '';
  for (let k = 6; k >= 1; k--) disc += `<ellipse class="${k % 2 ? 'cart' : 'bn'}" cx="${dx}" cy="${dy}" rx="${30 + k * 11}" ry="${20 + k * 7.5}"/>`;
  disc += `<ellipse class="hl4" cx="${dx}" cy="${dy + 6}" rx="32" ry="22"/>`;
  // posterolateral herniation (bottom-right = posterior, subject's left in this view)
  disc += `<path class="hl4" d="${smooth([[dx + 18, dy + 22], [dx + 40, dy + 42], [dx + 62, dy + 74], [dx + 74, dy + 88], [dx + 58, dy + 92], [dx + 36, dy + 62], [dx + 12, dy + 30]], true, 0.6)}"/>`;
  disc += `<circle class="cord" cx="${dx}" cy="${dy + 110}" r="22"/><circle class="my" cx="${dx + 74}" cy="${dy + 104}" r="9"/>`;

  const L = 180, R = 400;
  const labels = [
    label(c - 30, 100, L, 92, 'Vertebral body', { anchor: 'end' }),
    label(c - 32, 160, L, 150, 'Pedicle', { anchor: 'end' }),
    label(c - 110, 172, L, 196, 'Transverse process', { anchor: 'end' }),
    label(c - 50, 222, L, 240, 'Lamina', { anchor: 'end' }),
    label(c, 286, L, 290, 'Spinous process', { anchor: 'end' }),
    label(c + 48, 206, R - 10, 212, 'Superior articular\nprocess (facet)', { anchor: 'start' }),
    label(c + 10, 190, R - 10, 262, 'Vertebral foramen\n(spinal cord)', { anchor: 'start' }),
    label(dx + 70, dy - 44, 856, 78, 'Annulus fibrosus', { anchor: 'start' }),
    label(dx - 12, dy + 4, 620, 90, 'Nucleus pulposus', { anchor: 'end' }),
    label(dx + 50, dy + 62, 856, 196, 'Disc herniation', { anchor: 'start' }),
    label(dx + 82, dy + 106, 856, 262, 'Nerve root', { anchor: 'start' }),
    label(dx - 18, dy + 116, 640, 300, 'Spinal cord', { anchor: 'end' }),
  ].join('');

  return `
  ${note(c, 30, 'A. Lumbar vertebra (from above)', 'dg-head')}
  ${note(dx, 30, 'B. Intervertebral disc (from above)', 'dg-head')}
  ${note(c, 54, 'Anterior ▲', 'dg-note')}${note(dx, 54, 'Anterior ▲', 'dg-note')}
  <path class="hl3" d="${arch}"/>
  <path class="hl3" d="${body}"/>
  <path class="hole" d="${foramen}"/><circle class="cord" cx="${c}" cy="${190}" r="17"/>
  ${facet(1)}${facet(-1)}
  ${disc}${labels}`;
}

export const VERTEBRA = figure({
  title: 'A typical vertebra and intervertebral disc',
  viewBox: '0 0 990 350',
  minWidth: 680,
  body: vertebra(),
  caption: 'A. The weight-bearing body sits in front; the arch (pedicles and laminae) behind it encloses the vertebral foramen, which protects the spinal cord. Muscles and ligaments attach to the spinous and transverse processes, and the articular facets form the facet joints. B. Each disc has a tough outer annulus fibrosus around a gel-like nucleus pulposus. If the annulus weakens, nucleus material can bulge out, usually posterolaterally, and press on a nerve root.',
});
