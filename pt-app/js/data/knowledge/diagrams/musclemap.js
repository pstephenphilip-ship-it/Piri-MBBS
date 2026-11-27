// Muscle maps: anterior and posterior body with the major superficial muscles.
// Each muscle links to its topic in the Muscles category.
import { figure, label, note, key, smooth, r } from './_svg.js';

// Body outline (right half, mirrored), y from head to feet. Same outline for front and back.
const HALF = [[16, 120], [20, 150], [80, 160], [106, 170], [124, 210], [128, 300], [132, 360], [140, 440], [142, 500], [146, 560], [126, 566], [122, 505], [116, 440], [108, 370], [104, 300], [98, 252], [92, 280], [72, 380], [86, 440], [90, 500], [86, 600], [64, 690], [66, 760], [58, 880], [66, 925], [30, 935], [26, 900], [24, 800], [18, 700], [16, 600], [8, 505], [0, 505]];

const GROUP = {
  chest: ['mm-chest', 'chest'], shoulders: ['mm-shoulder', 'deltoids'], back: ['mm-back', 'upper-back'], lats: ['mm-back', 'lats'],
  arms: ['mm-arm', 'elbow-flexors'], triceps: ['mm-arm', 'triceps'], forearm: ['mm-arm', 'forearm'],
  core: ['mm-core', 'abdominals'], lowback: ['mm-core', 'back-extensors'], glutes: ['mm-glute', 'glutes'], quads: ['mm-leg', 'quadriceps'],
  adductors: ['mm-leg', 'adductors'], hipflex: ['mm-leg', 'hip-flexors'], hams: ['mm-glute', 'hamstrings'], calves: ['mm-calf', 'lower-leg'], cuff: ['mm-shoulder', 'rotator-cuff'],
};

function bodyOutline(cx) {
  const pts = [...HALF.map(([x, y]) => [cx + x, y]), ...HALF.slice(0, -1).reverse().map(([x, y]) => [cx - x, y])];
  return `<path class="skin" d="${smooth(pts, true, 0.55)}"/><circle class="skin" cx="${cx}" cy="85" r="34"/>`;
}

/** muscles: [group, pointsRightHalf] → drawn on both sides, linked to the group's topic */
function muscles(cx, list) {
  return list.map(([g, pts, t = 0.7, both = true]) => {
    const [cls, topic] = GROUP[g];
    const side = s => `<path class="mm ${cls}" d="${smooth(pts.map(([x, y]) => [cx + s * x, y]), true, t)}"/>`;
    return `<a href="#/knowledge/muscles/${topic}">${side(1)}${both ? side(-1) : ''}</a>`;
  }).join('');
}

const FRONT = [
  ['back', [[18, 128], [30, 148], [78, 162], [40, 150]]],                                         // upper trapezius (seen from front)
  ['shoulders', [[80, 160], [110, 170], [124, 210], [118, 252], [102, 236], [88, 190]]],           // deltoid
  ['chest', [[8, 170], [80, 166], [100, 200], [96, 228], [60, 252], [10, 252]]],                   // pectoralis major
  ['core', [[74, 256], [92, 262], [88, 296], [72, 300]], 0.5],                                      // serratus anterior
  ['arms', [[104, 240], [118, 250], [124, 300], [120, 346], [110, 352], [104, 300]]],              // biceps
  ['forearm', [[112, 368], [130, 374], [136, 432], [134, 492], [124, 494], [114, 432]]],           // forearm flexors
  ['core', [[4, 258], [38, 258], [40, 420], [30, 470], [4, 476]], 0.4],                             // rectus abdominis
  ['core', [[44, 262], [76, 302], [72, 380], [76, 432], [46, 420], [42, 330]], 0.5],               // external oblique
  ['hipflex', [[76, 446], [90, 464], [86, 500], [76, 492]], 0.6],                                   // tensor fasciae latae
  ['adductors', [[10, 504], [34, 488], [40, 600], [22, 604], [12, 552]]],                           // adductors
  ['quads', [[78, 476], [88, 520], [82, 650], [66, 684], [62, 600]]],                               // vastus lateralis
  ['quads', [[44, 470], [64, 482], [66, 620], [56, 670], [44, 622]]],                               // rectus femoris
  ['quads', [[22, 606], [40, 612], [46, 676], [30, 682], [20, 646]]],                               // vastus medialis
  ['calves', [[48, 722], [58, 732], [54, 850], [44, 872], [42, 800]]],                              // tibialis anterior
  ['calves', [[18, 712], [34, 708], [36, 800], [26, 822], [18, 772]]],                              // gastrocnemius (medial)
];
const FRONT_DETAIL = cx => {
  let s = '';
  for (const sgn of [-1, 1]) for (let k = 0; k < 3; k++) s += `<path class="ln-thin" d="M${cx + sgn * 4} ${300 + k * 42} L${cx + sgn * 39} ${300 + k * 42}"/>`;
  s += `<path class="ln-thin" d="M${cx} 258 L${cx} 476"/>`; // linea alba
  for (const sgn of [-1, 1]) s += `<path class="band-o" stroke-width="10" d="M${cx + sgn * 74} 452 Q${cx + sgn * 56} 560 ${cx + sgn * 24} 690"/><path class="band-mm" stroke-width="7.6" d="M${cx + sgn * 74} 452 Q${cx + sgn * 56} 560 ${cx + sgn * 24} 690"/>`; // sartorius
  for (const sgn of [-1, 1]) s += `<path class="band-o" stroke-width="7" d="M${cx + sgn * 24} 104 L${cx + sgn * 8} 150"/><path class="band-mm" stroke-width="5" d="M${cx + sgn * 24} 104 L${cx + sgn * 8} 150"/>`; // SCM
  return s;
};

const BACK = [
  ['back', [[0, 116], [20, 130], [86, 164], [60, 196], [16, 300], [0, 312]], 0.5],                // trapezius
  ['shoulders', [[80, 160], [110, 170], [124, 210], [118, 252], [102, 236], [88, 190]]],           // deltoid
  ['cuff', [[40, 204], [84, 204], [94, 232], [62, 246], [38, 232]]],                                // infraspinatus / teres
  ['lats', [[14, 284], [42, 244], [94, 254], [90, 302], [74, 372], [22, 404]], 0.6],                // latissimus dorsi
  ['triceps', [[104, 240], [124, 252], [128, 320], [120, 356], [108, 346], [104, 290]]],            // triceps
  ['forearm', [[112, 368], [130, 374], [136, 432], [134, 492], [124, 494], [114, 432]]],           // forearm extensors
  ['lowback', [[4, 330], [22, 332], [24, 440], [6, 452]], 0.5],                                     // erector spinae
  ['glutes', [[42, 428], [84, 440], [90, 470], [62, 474]], 0.6],                                    // gluteus medius
  ['glutes', [[6, 452], [60, 462], [90, 494], [84, 540], [40, 558], [6, 542]], 0.6],                // gluteus maximus
  ['hams', [[54, 562], [86, 562], [76, 660], [62, 690], [56, 620]]],                                // biceps femoris
  ['hams', [[12, 562], [50, 562], [54, 632], [30, 682], [16, 640]]],                                // semitendinosus / semimembranosus
  ['calves', [[22, 790], [62, 794], [56, 862], [30, 866]], 0.5],                                    // soleus
  ['calves', [[18, 704], [40, 700], [42, 782], [30, 814], [20, 782]]],                               // gastrocnemius medial head
  ['calves', [[42, 700], [64, 708], [62, 782], [48, 814], [42, 760]]],                               // gastrocnemius lateral head
];
const BACK_DETAIL = cx => {
  let s = '';
  for (const sgn of [-1, 1]) s += `<path class="band-o" stroke-width="9" d="M${cx + sgn * 38} 860 L${cx + sgn * 38} 906"/><path class="band-my" stroke-width="7" d="M${cx + sgn * 38} 860 L${cx + sgn * 38} 906"/>`; // Achilles
  s += `<path class="ln-thin" d="M${cx} 116 L${cx} 500"/>`;
  return s;
};

function maps() {
  const A = 330, B = 780; // centres of front and back figures
  const L = 170, R = 940;
  let s = `${note(A, 22, 'Front (anterior)', 'dg-head')}${note(B, 22, 'Back (posterior)', 'dg-head')}`;
  s += bodyOutline(A) + muscles(A, FRONT) + FRONT_DETAIL(A);
  s += bodyOutline(B) + muscles(B, BACK) + BACK_DETAIL(B);
  const fl = (x, y, ly, t) => label(A - x, y, L, ly, t);
  s += [
    fl(16, 120, 104, 'Sternocleidomastoid'),
    fl(54, 156, 144, 'Trapezius (upper)'),
    fl(108, 200, 184, 'Deltoid'),
    fl(50, 210, 224, 'Pectoralis major'),
    fl(82, 280, 262, 'Serratus anterior'),
    fl(114, 300, 300, 'Biceps brachii'),
    fl(22, 380, 338, 'Rectus abdominis'),
    fl(60, 360, 376, 'External oblique'),
    fl(124, 430, 414, 'Forearm flexors'),
    fl(82, 476, 452, 'Tensor fasciae latae'),
    fl(26, 560, 548, 'Adductors'),
    fl(60, 548, 586, 'Sartorius'),
    fl(56, 580, 622, 'Rectus femoris'),
    fl(76, 600, 658, 'Vastus lateralis'),
    fl(32, 650, 694, 'Vastus medialis'),
    fl(50, 790, 790, 'Tibialis anterior'),
    fl(26, 760, 740, 'Gastrocnemius'),
  ].join('');
  const bl = (x, y, ly, t) => label(B + x, y, R, ly, t);
  s += [
    bl(30, 190, 140, 'Trapezius'),
    bl(110, 196, 184, 'Deltoid (posterior)'),
    bl(66, 222, 224, 'Infraspinatus, teres'),
    bl(118, 300, 264, 'Triceps brachii'),
    bl(60, 320, 304, 'Latissimus dorsi'),
    bl(14, 400, 344, 'Erector spinae'),
    bl(126, 430, 384, 'Forearm extensors'),
    bl(66, 452, 424, 'Gluteus medius'),
    bl(46, 510, 474, 'Gluteus maximus'),
    bl(72, 610, 560, 'Biceps femoris'),
    bl(30, 620, 610, 'Semitendinosus,\nsemimembranosus'),
    bl(54, 750, 720, 'Gastrocnemius'),
    bl(50, 830, 810, 'Soleus'),
    bl(38, 890, 880, 'Achilles tendon'),
  ].join('');
  const groups = [['mm-chest', 'Chest'], ['mm-shoulder', 'Shoulders & cuff'], ['mm-back', 'Back'], ['mm-arm', 'Arms'], ['mm-core', 'Core & spine'], ['mm-glute', 'Glutes & hamstrings'], ['mm-leg', 'Thigh (front & inner)'], ['mm-calf', 'Lower leg']];
  s += groups.map(([c, t], i) => `<rect class="mm ${c}" x="${30 + (i % 4) * 270}" y="${958 + Math.floor(i / 4) * 26}" width="16" height="14" rx="3"/><text x="${52 + (i % 4) * 270}" y="${970 + Math.floor(i / 4) * 26}">${t}</text>`).join('');
  return s;
}

export const MUSCLE_MAP = figure({
  title: 'Muscle map: major superficial muscles',
  viewBox: '0 0 1110 1010',
  minWidth: 720,
  body: maps(),
  caption: 'The major superficial muscles from the front and back, coloured by group. Tap or click a muscle to open its article (origin, insertion, action and training). Deeper muscles such as the rotator cuff (except infraspinatus and teres), rhomboids, psoas, soleus (partly) and transversus abdominis lie underneath these.',
});
