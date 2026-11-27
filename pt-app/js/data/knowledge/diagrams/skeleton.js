// Full skeleton, anterior view, coloured axial vs appendicular.
// Proportions: ~8 head-heights tall; iliac crest at L4; wrist at hip level;
// fingertips at mid-thigh; knees ~ quarter height from the floor.
import { figure, label, key, smooth, poly, band, seg, r } from './_svg.js';

export const cx = 380;
export const X = (s, dx) => cx + s * dx;
const S = (s, arr) => arr.map(([dx, y]) => [X(s, dx), y]);
export const SIDES = [-1, 1];

/* ---------- Axial ---------- */

function skull() {
  const cranium = smooth([
    [cx, 16], [cx + 34, 22], [cx + 52, 48], [cx + 54, 80], [cx + 49, 104], [cx + 42, 118], [cx + 30, 126],
    [cx + 16, 131], [cx, 132], [cx - 16, 131], [cx - 30, 126], [cx - 42, 118], [cx - 49, 104], [cx - 54, 80], [cx - 52, 48], [cx - 34, 22],
  ]);
  const orbit = s => smooth(S(s, [[8, 80], [18, 74], [31, 77], [35, 88], [29, 99], [16, 100], [8, 92]]));
  const nasal = smooth([[cx, 96], [cx + 8, 104], [cx + 9, 114], [cx, 118], [cx - 9, 114], [cx - 8, 104]]);
  const mandible = smooth([
    [cx - 43, 106], [cx - 42, 130], [cx - 38, 146], [cx - 24, 158], [cx, 163], [cx + 24, 158], [cx + 38, 146], [cx + 42, 130], [cx + 43, 106],
    [cx + 35, 110], [cx + 33, 134], [cx + 24, 147], [cx, 151], [cx - 24, 147], [cx - 33, 134], [cx - 35, 110],
  ]);
  const teeth = (y, w) => {
    let t = `<rect class="bn" x="${cx - w}" y="${y}" width="${w * 2}" height="8" rx="2"/>`;
    for (let x = cx - w + 6; x < cx + w; x += 6) t += `<path class="ln-thin" d="${seg(x, y, x, y + 8)}"/>`;
    return t;
  };
  return `
  <path class="bn-ax" d="${cranium}"/>
  <path class="ln-thin" d="M${cx - 50} 58 Q${cx} 48 ${cx + 50} 58"/>
  <path class="ln-thin" d="M${cx - 50} 104 Q${cx - 44} 112 ${cx - 36} 110 M${cx + 50} 104 Q${cx + 44} 112 ${cx + 36} 110"/>
  ${SIDES.map(s => `<path class="hole" d="${orbit(s)}"/>`).join('')}
  <path class="hole" d="${nasal}"/>
  ${teeth(121, 18)}
  <path class="bn-ax" d="${mandible}"/>
  ${teeth(131, 16)}`;
}

export function spine() {
  let out = '';
  // cervical C1–C7
  for (let i = 0; i < 7; i++) out += `<rect class="bn-ax" x="${cx - 11}" y="${163 + i * 7}" width="22" height="6" rx="1.5"/>`;
  // thoracic T1–T12 (behind the sternum and ribs)
  for (let i = 0; i < 12; i++) {
    const w = 26 + i * 0.8, y = 213 + i * 15.6;
    out += `<rect class="bn-ax" x="${r(cx - w / 2)}" y="${r(y)}" width="${r(w)}" height="13" rx="2"/>`;
    out += `<path class="ln-thin" d="${seg(cx - w / 2 - 6, y + 6, cx + w / 2 + 6, y + 6)}"/>`; // transverse processes
  }
  // lumbar L1–L5
  for (let i = 0; i < 5; i++) {
    const w = 36 + i * 1.5, y = 401 + i * 16.4;
    out += `<path class="bn-ax" d="${smooth([[cx - w / 2, y + 1], [cx, y - 0.5], [cx + w / 2, y + 1], [cx + w / 2 + 1, y + 7], [cx + w / 2, y + 13], [cx, y + 14.5], [cx - w / 2, y + 13], [cx - w / 2 - 1, y + 7]])}"/>`;
    out += `<path class="ln" d="${seg(cx - w / 2 - 1, y + 6, cx - w / 2 - 12, y + 4)} ${seg(cx + w / 2 + 1, y + 6, cx + w / 2 + 12, y + 4)}"/>`;
  }
  return out;
}

function sacrum() {
  const d = smooth([[cx - 33, 484], [cx, 481], [cx + 33, 484], [cx + 30, 505], [cx + 18, 530], [cx + 6, 546], [cx - 6, 546], [cx - 18, 530], [cx - 30, 505]]);
  let foramina = '';
  for (let i = 0; i < 4; i++) for (const s of SIDES) foramina += `<circle class="hole" cx="${X(s, 13 - i * 1.5)}" cy="${494 + i * 13}" r="2.6"/>`;
  const coccyx = poly([[cx - 6, 547], [cx + 6, 547], [cx + 3, 556], [cx, 560], [cx - 3, 556]]);
  return `<path class="bn-ax" d="${d}"/>${foramina}<path class="ln-thin" d="${seg(cx - 22, 507, cx + 22, 507)} ${seg(cx - 15, 521, cx + 15, 521)}"/><path class="bn-ax" d="${coccyx}"/>`;
}

// Rib geometry (shared with the thoracic cage diagram)
export const RIB = {
  w: [40, 58, 70, 78, 84, 88, 90, 90, 88, 84, 78, 70],          // half-width of cage at the rib's lateral point
  c: [22, 24, 28, 32, 36, 42, 48, 56, 62, 68],                    // half-width of the bony anterior end (ribs 1–10)
  yS: [226, 246, 262, 278, 293, 307, 322],                        // sternal attachment of costal cartilage (ribs 1–7)
  yL: i => 222 + i * 14.5,                                        // y of lateral point (i = 0..11)
  yA: i => 222 + i * 14.5 + 22 + (i + 1) * 1.2,                   // y of anterior bony end
};

export function ribs(fillTrue = 'ax', fillFalse = 'ax', fillFloat = 'ax', withBack = true) {
  let back = '', bone = '', cart = '';
  for (const s of SIDES) {
    const carts = []; // [anteriorEnd, sternalOrJoinEnd] per rib, for false-rib joins
    for (let i = 0; i < 12; i++) {
      const w = RIB.w[i], yL = RIB.yL(i);
      const fill = i < 7 ? fillTrue : i < 10 ? fillFalse : fillFloat;
      // posterior part: from the vertebra up and out to the side of the cage (seen through the chest)
      if (withBack) back += band(`M${r(X(s, 15))} ${r(yL - 12)} Q${r(X(s, w * 0.72))} ${r(yL - 22)} ${r(X(s, w))} ${r(yL + 4)}`, 5, fill, 'opacity=".38"');
      if (i >= 10) { // floating ribs: short, free anterior end
        bone += band(`M${r(X(s, w))} ${r(yL + 4)} Q${r(X(s, w - 1))} ${r(yL + 16)} ${r(X(s, w - 10))} ${r(yL + 26)}`, 6, fill);
        continue;
      }
      const c = RIB.c[i], yA = RIB.yA(i);
      bone += band(`M${r(X(s, w))} ${r(yL + 4)} Q${r(X(s, w * 0.93))} ${r(yA + 5)} ${r(X(s, c))} ${r(yA)}`, 6.5, fill);
      const a = [X(s, c), yA];
      const end = i < 7 ? [X(s, 9), RIB.yS[i]] : (() => { const [p, q] = carts[i - 1]; return [p[0] + (q[0] - p[0]) * 0.42, p[1] + (q[1] - p[1]) * 0.42]; })();
      cart += band(`M${r(a[0])} ${r(a[1])} Q${r((a[0] + end[0]) / 2)} ${r((a[1] + end[1]) / 2 + 3)} ${r(end[0])} ${r(end[1])}`, 5, 'cart');
      carts[i] = [a, end];
    }
  }
  return { back, bone, cart };
}

export function sternum(cls = 'bn-ax') {
  const manubrium = smooth([[cx - 17, 213], [cx - 5, 213], [cx, 217], [cx + 5, 213], [cx + 17, 213], [cx + 18, 230], [cx + 11, 245], [cx - 11, 245], [cx - 18, 230]], true, 0.6);
  const body = smooth([[cx - 11, 247], [cx + 11, 247], [cx + 12, 290], [cx + 12, 330], [cx + 6, 338], [cx - 6, 338], [cx - 12, 330], [cx - 12, 290]], true, 0.6);
  const xiphoid = poly([[cx - 5, 339], [cx + 5, 339], [cx + 2, 354], [cx - 2, 354]]);
  return `<path class="${cls}" d="${manubrium}"/><path class="${cls}" d="${body}"/><path class="${cls}" d="${xiphoid}"/>`;
}

/* ---------- Appendicular ---------- */

function shoulderGirdle(s) {
  const scap = smooth(S(s, [[58, 214], [92, 207], [104, 222], [104, 244], [94, 296], [82, 336], [72, 318], [60, 260]]), true, 0.8);
  const acromion = smooth(S(s, [[90, 204], [110, 201], [122, 206], [118, 214], [104, 214]]), true, 0.8);
  const coracoid = smooth(S(s, [[90, 222], [102, 224], [104, 234], [98, 233]]), true, 0.8);
  const clav = `M${r(X(s, 12))} ${r(211)} C${r(X(s, 42))} 198 ${r(X(s, 72))} 216 ${r(X(s, 110))} 205`;
  return { back: `<path class="bn-ap back" d="${scap}"/>`, front: `<path class="bn-ap" d="${acromion}"/><path class="bn-ap" d="${coracoid}"/>${band(clav, 8, 'ap')}` };
}

function arm(s) {
  const head = `<circle class="bn-ap" cx="${X(s, 112)}" cy="234" r="14"/>`;
  const humerus = smooth(S(s, [[106, 226], [124, 220], [134, 232], [130, 262], [134, 380], [143, 414], [138, 430], [122, 434], [106, 432], [97, 416], [110, 380], [114, 262], [108, 246]]), true, 0.7);
  const ulna = smooth(S(s, [[102, 424], [120, 428], [121, 452], [126, 556], [129, 576], [118, 580], [113, 560], [107, 452]]), true, 0.7);
  const radius = smooth(S(s, [[125, 436], [138, 434], [139, 452], [150, 548], [159, 572], [134, 580], [132, 556], [128, 452]]), true, 0.7);
  // hand: carpals (2 rows of 4), metacarpals, phalanges; thumb lateral
  let hand = '';
  const cx1 = [116, 126, 137, 148];
  for (let i = 0; i < 4; i++) hand += `<rect class="bn-ap" x="${r(X(s, cx1[i]) - (s < 0 ? 9 : 0))}" y="582" width="9" height="9" rx="2.5"/>`;
  const cx2 = [117, 127, 138, 150];
  for (let i = 0; i < 4; i++) hand += `<rect class="bn-ap" x="${r(X(s, cx2[i]) - (s < 0 ? 10 : 0))}" y="593" width="10" height="10" rx="2.5"/>`;
  const fingers = [[121, 40, 1.0], [130, 46, 1.1], [139, 49, 1.15], [148, 45, 1.05]]; // little → index: x, total phalanx length, scale
  fingers.forEach(([fx, len, k], j) => {
    const sp = (j - 1.5) * 1.6; // slight fan
    // metacarpal, then proximal, middle and distal phalanges, each joint a small gap
    const parts = [[38, 5.2], [22 * k, 4.4], [14 * k, 3.9], [10 * k, 3.4]];
    let y = 606, x = X(s, fx), step = 0;
    for (const [len, w] of parts) {
      const nx = x + s * sp * 0.35;
      hand += band(seg(x, y, nx, y + len), w, 'ap');
      x = nx; y += len + 4; step++;
    }
  });
  // thumb
  hand += band(seg(X(s, 158), 604, X(s, 168), 632), 5.4, 'ap');
  hand += band(seg(X(s, 170), 637, X(s, 177), 657), 4.6, 'ap');
  hand += band(seg(X(s, 178), 662, X(s, 182), 676), 4, 'ap');
  return `${head}<path class="bn-ap" d="${humerus}"/><path class="bn-ap" d="${ulna}"/><path class="bn-ap" d="${radius}"/>${hand}`;
}

function hipBone(s) {
  const d = smooth(S(s, [[29, 484], [42, 460], [64, 449], [86, 452], [99, 464], [97, 490], [88, 499], [86, 512], [91, 530], [86, 560], [74, 582], [64, 593], [46, 592], [28, 586], [8, 578], [6, 556], [24, 548], [38, 532], [30, 510]]), true, 0.75);
  const brim = `M${r(X(s, 31))} 506 Q${r(X(s, 46))} 520 ${r(X(s, 22))} 550`; // arcuate line / pelvic brim
  const fossa = `M${r(X(s, 44))} 468 Q${r(X(s, 70))} 462 ${r(X(s, 90))} 474`;  // inner lip of iliac fossa
  return `<path class="bn-ap" d="${d}"/><path class="ln-thin" d="${brim} ${fossa}"/><ellipse class="hole" cx="${X(s, 44)}" cy="568" rx="14" ry="12"/>`;
}

function leg(s) {
  const femur = smooth(S(s, [[64, 552], [80, 532], [100, 538], [108, 556], [102, 580], [86, 690], [74, 760], [81, 778], [76, 792], [60, 797], [54, 789], [48, 797], [34, 794], [30, 778], [40, 760], [56, 690], [80, 594], [76, 584]]), true, 0.7);
  const head = `<circle class="bn-ap" cx="${X(s, 72)}" cy="546" r="14"/>`;
  const patella = `<ellipse class="bn-ap" cx="${X(s, 56)}" cy="770" rx="11" ry="15"/>`;
  const tibia = smooth(S(s, [[31, 800], [56, 798], [79, 801], [76, 814], [64, 832], [59, 900], [59, 928], [52, 938], [44, 950], [39, 940], [40, 900], [39, 832], [31, 814]]), true, 0.7);
  const fibula = smooth(S(s, [[78, 811], [89, 806], [91, 818], [85, 832], [75, 915], [77, 936], [70, 958], [63, 944], [67, 915], [78, 830]]), true, 0.7);
  // foot (anterior view, foreshortened): talus, tarsals, metatarsals, phalanges
  let foot = `<path class="bn-ap" d="${smooth(S(s, [[42, 946], [66, 946], [70, 956], [40, 956]]), true, 0.5)}"/>`;
  foot += `<path class="bn-ap" d="${smooth(S(s, [[38, 958], [72, 958], [82, 970], [30, 970]]), true, 0.5)}"/>`;
  const toes = [[33, 6.2], [45, 5], [55, 4.6], [65, 4.4], [75, 4.2]]; // big toe medial
  toes.forEach(([tx, w], j) => {
    const sp = (j - 2) * 1.5;
    foot += band(seg(X(s, tx), 973, X(s, tx + sp), 984), w, 'ap');
    foot += band(seg(X(s, tx + sp), 988, X(s, tx + sp * 1.3), 995), w - 0.8, 'ap');
  });
  return { femur: `<path class="bn-ap" d="${femur}"/>${head}`, rest: `<path class="bn-ap" d="${fibula}"/><path class="bn-ap" d="${tibia}"/>${patella}${foot}` };
}

/* ---------- Assemble ---------- */

function body() {
  const g = SIDES.map(shoulderGirdle);
  const legs = SIDES.map(leg);
  const rb = ribs();
  const L = 185, R = 575; // label columns
  const labels = [
    // left: axial skeleton
    label(cx - 40, 46, L, 46, 'Skull (cranium)'),
    label(cx - 34, 150, L, 150, 'Mandible'),
    label(cx - 11, 190, L, 190, 'Cervical vertebrae (7)'),
    label(cx - 8, 270, L, 236, 'Sternum'),
    label(X(-1, 88), 310, L, 290, 'Ribs (12 pairs)'),
    label(cx - 13, 392, L, 344, 'Thoracic vertebrae (12)'),
    label(cx - 19, 433, L, 398, 'Lumbar vertebrae (5)'),
    label(cx - 18, 500, L, 452, 'Sacrum'),
    label(cx - 3, 555, L, 506, 'Coccyx'),
    // left: lower limb
    label(X(-1, 66), 724, L, 736, 'Femur'),
    label(X(-1, 56), 772, L, 782, 'Patella'),
    label(X(-1, 80), 878, L, 836, 'Fibula'),
    label(X(-1, 48), 880, L, 880, 'Tibia'),
    label(X(-1, 56), 952, L, 928, 'Tarsals (7)'),
    label(X(-1, 46), 978, L, 960, 'Metatarsals (5)'),
    label(X(-1, 34), 992, L, 992, 'Phalanges (14)'),
    // right: shoulder girdle, upper limb, pelvic girdle
    label(X(1, 62), 207, R, 190, 'Clavicle'),
    label(X(1, 99), 272, R, 244, 'Scapula'),
    label(X(1, 124), 330, R, 320, 'Humerus'),
    label(X(1, 118), 505, R, 462, 'Ulna'),
    label(X(1, 143), 520, R, 510, 'Radius'),
    label(X(1, 92), 470, R, 410, 'Pelvis (hip bone)'),
    label(X(1, 141), 588, R, 572, 'Carpals (8)'),
    label(X(1, 139), 626, R, 616, 'Metacarpals (5)'),
    label(X(1, 140), 680, R, 668, 'Phalanges (14)'),
  ].join('');

  return `
  ${key(560, 24, [['bn-ax', 'Axial skeleton (80 bones)']])}${key(560, 48, [['bn-ap', 'Appendicular (126 bones)']])}
  ${g.map(x => x.back).join('')}
  ${spine()}
  ${rb.back}
  ${SIDES.map(hipBone).join('')}
  ${sacrum()}
  ${legs.map(l => l.femur).join('')}
  ${rb.bone}${rb.cart}
  ${sternum()}
  ${g.map(x => x.front).join('')}
  ${SIDES.map(arm).join('')}
  ${legs.map(l => l.rest).join('')}
  ${skull()}
  ${labels}`;
}

export const SKELETON = figure({
  title: 'The human skeleton (anterior view)',
  viewBox: '0 0 760 1010',
  minWidth: 560,
  body: body(),
  caption: 'The axial skeleton (orange) forms the central axis: skull, vertebral column, ribs and sternum. The appendicular skeleton (teal) is the shoulder and pelvic girdles plus the limbs. Shown in the anatomical position: palms forward, so the radius is on the lateral (thumb) side. Hidden structures such as the thoracic vertebrae and scapulae sit behind the rib cage.',
});
