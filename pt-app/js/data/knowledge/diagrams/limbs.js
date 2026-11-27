// Appendicular skeleton diagrams: scapula + humerus, hand, pelvis, femur/tibia/fibula, foot.
import { figure, label, note, key, smooth, poly, band, seg, r } from './_svg.js';

const sm = (pts, t = 0.6) => smooth(pts, true, t);

/* ---------------- Scapula (posterior) + humerus (anterior), right side ---------------- */

function scapulaHumerus() {
  // A. Right scapula, posterior view (medial border on the left, glenoid on the right)
  const TX = x => 190 + (x - 150) * 1.25; // widen to true proportions
  const T = pts => pts.map(([x, y]) => [TX(x), y]);
  const body = sm(T([[150, 80], [230, 96], [282, 96], [300, 110], [318, 124], [326, 140], [318, 158], [306, 170], [262, 260], [220, 350], [196, 402], [176, 392], [168, 300], [160, 200], [154, 140]]), 0.55);
  const above = poly(T([[100, 0], [420, 0], [420, 98], [318, 102], [160, 150], [100, 150]]));
  const spine = `M${TX(160)} 152 Q${TX(240)} 126 ${TX(318)} 102`;
  const acromion = sm(T([[296, 98], [334, 82], [354, 92], [344, 110], [316, 114]]), 0.6);
  const coracoid = sm(T([[270, 98], [280, 76], [304, 66], [312, 74], [294, 86], [288, 100]]), 0.6);
  const glenoid = `M${TX(321)} 124 Q${TX(330)} 141 ${TX(321)} 160`;

  // B. Right humerus, anterior view (head faces medially = viewer's right)
  const o = 100; // horizontal shift
  const H = pts => pts.map(([x, y]) => [x + o, y]);
  const humerus = sm(H([[600, 96], [616, 72], [650, 60], [690, 70], [704, 96], [700, 122], [680, 134], [660, 140], [648, 160], [648, 250], [650, 380], [668, 410], [706, 432], [700, 448], [676, 466], [672, 484], [636, 484], [630, 478], [622, 480], [600, 476], [590, 452], [588, 432], [604, 400], [612, 380], [612, 250], [612, 160], [600, 134]]), 0.55);
  const headArt = sm(H([[628, 80], [650, 62], [690, 70], [704, 96], [700, 122], [680, 134], [662, 130], [646, 106]]), 0.7);
  const gt = sm(H([[598, 128], [596, 100], [612, 78], [626, 84], [632, 112], [618, 134]]), 0.7);
  const lt = sm(H([[636, 114], [652, 112], [655, 130], [640, 136]]), 0.7);
  const groove = `M${634 + o} 114 Q${628 + o} 150 ${630 + o} 186`;
  const anatNeck = `M${628 + o} 80 Q${646 + o} 112 ${680 + o} 134`;
  const surgNeck = `M${612 + o} 160 L${648 + o} 160`;
  const trochlea = sm(H([[632, 456], [676, 456], [680, 482], [656, 476], [634, 484]]), 0.6);

  const La = 150, Ra = 468, Lb = 680, Rb = 840;
  const labels = [
    label(TX(152), 84, La, 70, 'Superior angle'),
    label(TX(200), 112, La, 112, 'Supraspinous fossa'),
    label(TX(206), 140, La, 150, 'Spine of scapula'),
    label(TX(166), 260, La, 260, 'Medial border'),
    label(TX(222), 250, La, 220, 'Infraspinous fossa'),
    label(TX(194), 398, La, 400, 'Inferior angle'),
    label(TX(300), 70, Ra, 34, 'Coracoid process'),
    label(TX(340), 92, Ra, 70, 'Acromion'),
    label(TX(326), 142, Ra, 150, 'Glenoid fossa'),
    label(TX(262), 262, Ra, 300, 'Lateral border'),
    label(600 + o, 108, Lb, 108, 'Greater tubercle', { anchor: 'end' }),
    label(608 + o, 250, Lb, 250, 'Deltoid tuberosity', { anchor: 'end' }),
    label(590 + o, 436, Lb, 420, 'Lateral epicondyle', { anchor: 'end' }),
    label(612 + o, 470, Lb, 470, 'Capitulum', { anchor: 'end' }),
    label(686 + o, 86, Rb, 50, 'Head'),
    label(664 + o, 124, Rb, 88, 'Anatomical neck'),
    label(648 + o, 124, Rb, 126, 'Lesser tubercle'),
    label(630 + o, 172, Rb, 164, 'Intertubercular\n(bicipital) groove'),
    label(646 + o, 160, Rb, 210, 'Surgical neck'),
    label(632 + o, 320, Rb, 300, 'Shaft'),
    label(654 + o, 432, Rb, 384, 'Coronoid fossa'),
    label(700 + o, 440, Rb, 428, 'Medial epicondyle'),
    label(660 + o, 472, Rb, 470, 'Trochlea'),
  ].join('');
  return `
  ${note(300, 470, 'A. Right scapula (posterior view)', 'dg-head')}
  ${note(730, 520, 'B. Right humerus (anterior view)', 'dg-head')}
  <defs><clipPath id="sc-body"><path d="${body}"/></clipPath></defs>
  <path class="hl3" d="${body}"/>
  <g clip-path="url(#sc-body)"><path class="hl2" d="${above}"/></g>
  <path class="ln" d="${body}"/>
  <path class="bn" d="${coracoid}"/>
  ${band(spine, 16, 'bn')}
  <path class="bn" d="${acromion}"/>
  ${band(glenoid, 6, 'cart')}
  <path class="bn" d="${humerus}"/>
  <path class="cart" d="${headArt}"/>
  <path class="hl1" d="${gt}"/><path class="hl1" d="${lt}"/>
  <path class="ln" stroke-width="2.2" d="${groove}"/>
  <path class="suture" d="${anatNeck} ${surgNeck}"/>
  <ellipse class="hl4" cx="${608 + o}" cy="250" rx="6" ry="22"/>
  <ellipse class="hole" cx="${654 + o}" cy="432" rx="12" ry="8"/><ellipse class="hole" cx="${618 + o}" cy="438" rx="7" ry="5"/>
  <circle class="cart" cx="${614 + o}" cy="466" r="13"/><path class="cart" d="${trochlea}"/>
  ${labels}`;
}

export const SCAPULA_HUMERUS = figure({
  title: 'Scapula and humerus landmarks',
  viewBox: '0 0 1060 540',
  minWidth: 680,
  body: scapulaHumerus(),
  caption: 'A. The spine of the scapula divides the supraspinous fossa (origin of supraspinatus) from the infraspinous fossa (infraspinatus), and ends laterally as the acromion. The shallow glenoid fossa forms the shoulder joint with the head of the humerus. B. The rotator cuff attaches to the greater and lesser tubercles; the long head of biceps runs in the groove between them; deltoid inserts on the deltoid tuberosity; the forearm flexors and extensors start on the medial and lateral epicondyles.',
});

/* ---------------- Hand: right hand, palmar view (thumb on the viewer's left) ---------------- */

function hand() {
  const radius = sm([[258, 604], [260, 566], [262, 540], [290, 540], [330, 538], [372, 542], [380, 566], [378, 604]], 0.5);
  const ulna = sm([[400, 604], [402, 566], [420, 550], [452, 552], [462, 574], [458, 604]], 0.5);
  const carp = {
    scaphoid: sm([[272, 504], [288, 488], [316, 490], [320, 514], [304, 530], [280, 528]]),
    lunate: sm([[322, 496], [356, 494], [362, 516], [344, 532], [324, 524]]),
    triquetrum: sm([[364, 492], [396, 486], [404, 504], [394, 520], [366, 520]]),
    pisiform: `M${404} ${488} m-11 0 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0`,
    trapezium: sm([[244, 470], [256, 448], [286, 448], [288, 476], [272, 488], [252, 486]]),
    trapezoid: sm([[289, 450], [316, 446], [318, 484], [292, 486]]),
    capitate: sm([[320, 444], [358, 440], [362, 470], [356, 494], [324, 494], [320, 470]]),
    hamate: sm([[362, 444], [400, 442], [408, 470], [398, 488], [366, 490]]),
  };
  let s = `<path class="bn" d="${radius}"/><path class="bn" d="${ulna}"/>`;
  for (const k of ['scaphoid', 'lunate', 'triquetrum']) s += `<path class="hl3" d="${carp[k]}"/>`;
  for (const k of ['trapezium', 'trapezoid', 'capitate', 'hamate']) s += `<path class="my" d="${carp[k]}"/>`;
  s += `<path class="hl3" d="${carp.pisiform}"/><ellipse class="my" cx="392" cy="466" rx="7" ry="9"/>`; // pisiform; hook of hamate
  const meta = [[[262, 446], [204, 372]], [[304, 442], [296, 300]], [[340, 438], [344, 290]], [[382, 440], [388, 300]], [[398, 446], [426, 318]]];
  meta.forEach(([a, b], i) => { s += band(seg(...a, ...b), i === 0 ? 17 : 15, 'h2'); });
  const fingers = [
    [[[198, 364], [172, 304]], [[168, 296], [152, 254]]], // thumb: proximal, distal
    [[[295, 292], [290, 214]], [[290, 206], [287, 160]], [[287, 152], [286, 124]]],
    [[[344, 282], [346, 196]], [[346, 188], [347, 136]], [[347, 128], [348, 98]]],
    [[[389, 292], [398, 212]], [[399, 204], [404, 158]], [[405, 150], [408, 122]]],
    [[[428, 310], [446, 248]], [[448, 240], [457, 206]], [[458, 198], [464, 176]]],
  ];
  const cls = ['h1', 'h5', 'h4'];
  fingers.forEach((f, i) => f.forEach(([a, b], j) => { const c = i === 0 && j === 1 ? 'h4' : cls[j]; s += band(seg(...a, ...b), [14, 12, 11][j] - (i === 4 ? 1.5 : 0), c); }));

  const L = 214, R = 516;
  s += [
    label(230, 406, L, 400, 'Metacarpal I (thumb)'),
    label(258, 466, L, 456, 'Trapezium'),
    label(303, 468, L, 484, 'Trapezoid'),
    label(294, 512, L, 512, 'Scaphoid'),
    label(264, 548, L, 548, 'Radius\n(radial styloid)'),
    label(286, 136, L, 136, 'Distal phalanx'),
    label(288, 184, L, 184, 'Middle phalanx'),
    label(292, 252, L, 252, 'Proximal phalanx'),
    label(422, 340, R, 330, 'Metacarpal V'),
    label(340, 468, R, 410, 'Capitate'),
    label(392, 466, R, 438, 'Hamate (hook)'),
    label(408, 482, R, 466, 'Pisiform'),
    label(342, 514, R, 494, 'Lunate'),
    label(382, 508, R, 522, 'Triquetrum'),
    label(458, 576, R, 570, 'Ulna\n(ulnar styloid)'),
  ].join('');
  s += `${key(20, 30, [['my', 'Distal carpal row']])}${key(20, 54, [['hl3', 'Proximal carpal row']])}${key(560, 30, [['hl2', 'Metacarpals']])}${key(560, 54, [['hl1', 'Proximal phalanges']])}${key(560, 78, [['hl5', 'Middle phalanges']])}${key(560, 102, [['hl4', 'Distal phalanges']])}`;
  return s;
}

export const HAND = figure({
  title: 'Bones of the hand and wrist (right hand, palmar view)',
  viewBox: '0 0 760 620',
  minWidth: 560,
  body: hand(),
  caption: '27 bones: 8 carpals in two rows, 5 metacarpals (I = thumb) and 14 phalanges (the thumb has no middle phalanx). Proximal row, thumb side first: scaphoid, lunate, triquetrum, pisiform. Distal row: trapezium, trapezoid, capitate, hamate ("Some Lovers Try Positions That They Can\'t Handle"). The scaphoid, in the anatomical snuffbox at the base of the thumb, is the carpal most often fractured.',
});

/* ---------------- Pelvis, anterior view ---------------- */

function pelvis() {
  const c = 460;
  const S = (s, pts) => pts.map(([dx, y]) => [c + s * dx, y]);
  let out = '', back = '';
  for (const s of [-1, 1]) {
    const ilium = sm(S(s, [[62, 158], [62, 118], [92, 90], [150, 58], [220, 52], [262, 74], [274, 126], [254, 148], [248, 176], [254, 204], [214, 214], [150, 212], [92, 192]]), 0.8);
    const pubis = sm(S(s, [[150, 210], [204, 220], [192, 246], [150, 262], [106, 266], [88, 276], [82, 304], [94, 326], [114, 338], [102, 352], [58, 340], [20, 314], [20, 256], [52, 238], [100, 226]]), 0.75);
    const ischium = sm(S(s, [[200, 218], [244, 234], [254, 268], [244, 310], [222, 348], [190, 366], [148, 362], [112, 340], [146, 334], [170, 312], [176, 282], [166, 266], [190, 246]]), 0.75);
    out += `<path class="hl1" d="${ilium}"/><path class="hl2" d="${ischium}"/><path class="hl3" d="${pubis}"/>`;
    out += `<ellipse class="hole" cx="${c + s * 129}" cy="301" rx="46" ry="38"/>`;
    // lunate (articular) surface: a horseshoe open at the bottom (acetabular notch)
    const arc = `M${r(c + s * 202.4)} 269.9 A30 30 0 1 ${s > 0 ? 1 : 0} ${r(c + s * 225.6)} 269.9`;
    out += `<circle class="acet" cx="${c + s * 214}" cy="238" r="34"/><path class="band-o" stroke-width="10.4" d="${arc}"/><path class="band-cart" stroke-width="8" d="${arc}"/>`;
    out += `<path class="ln-thin" d="M${c + s * 96} 112 Q${c + s * 160} 92 ${c + s * 238} 98"/>`; // iliac fossa inner lip
  }
  const sacrum = sm([[c - 62, 118], [c, 112], [c + 62, 118], [c + 66, 160], [c + 52, 220], [c + 26, 266], [c, 274], [c - 26, 266], [c - 52, 220], [c - 66, 160]], 0.6);
  back += `<path class="bn" d="${sacrum}"/>`;
  for (let i = 0; i < 4; i++) for (const s of [-1, 1]) back += `<ellipse class="hole" cx="${c + s * (28 - i * 4)}" cy="${150 + i * 28}" rx="5" ry="4"/>`;
  for (let i = 1; i < 5; i++) back += `<path class="ln-thin" d="${seg(c - 40 + i * 4, 136 + i * 28, c + 40 - i * 4, 136 + i * 28)}"/>`;
  for (let i = 0; i < 4; i++) back += `<rect class="bn" x="${c - 8 + i}" y="${276 + i * 9}" width="${16 - i * 2}" height="8" rx="3"/>`;
  const brim = `M${c} 122 Q${c - 60} 128 ${c - 66} 170 Q${c - 120} 200 ${c - 150} 210 Q${c - 120} 228 ${c - 52} 238 L${c - 20} 256 M${c} 122 Q${c + 60} 128 ${c + 66} 170 Q${c + 120} 200 ${c + 150} 210 Q${c + 120} 228 ${c + 52} 238 L${c + 20} 256`;
  const L = 170, R = 750;
  const labels = [
    label(c - 180, 56, L, 40, 'Iliac crest'),
    label(c - 160, 124, L, 96, 'Iliac fossa'),
    label(c - 272, 126, L, 140, 'ASIS (anterior superior\niliac spine)'),
    label(c - 248, 178, L, 186, 'AIIS (anterior inferior\niliac spine)'),
    label(c - 220, 236, L, 232, 'Acetabulum'),
    label(c - 130, 246, L, 270, 'Superior pubic ramus'),
    label(c - 130, 312, L, 308, 'Obturator foramen'),
    label(c - 100, 344, L, 344, 'Ischiopubic ramus'),
    label(c - 196, 362, L, 382, 'Ischial tuberosity'),
    label(c + 2, 116, R, 40, 'Sacral promontory'),
    label(c + 64, 150, R, 84, 'Sacroiliac joint'),
    label(c + 30, 200, R, 128, 'Sacrum'),
    label(c + 112, 200, R, 172, 'Pelvic brim (inlet)'),
    label(c + 52, 238, R, 220, 'Pubic tubercle'),
    label(c + 6, 296, R, 268, 'Coccyx'),
    label(c + 18, 300, R, 312, 'Pubic symphysis'),
  ].join('');
  return `${back}${out}<path class="suture" d="${brim}"/>${labels}
    ${key(c - 190, 412, [['hl1', 'Ilium']])}${key(c - 80, 412, [['hl2', 'Ischium']])}${key(c + 40, 412, [['hl3', 'Pubis']])}${key(c + 140, 412, [['cart', 'Articular surface']])}`;
}

export const PELVIS = figure({
  title: 'The pelvis (anterior view)',
  viewBox: '0 0 940 430',
  minWidth: 640,
  body: pelvis(),
  caption: 'Each hip bone is three bones (ilium, ischium and pubis) fused at the acetabulum, the socket of the hip joint. The two hip bones meet at the front at the pubic symphysis and join the sacrum at the back at the sacroiliac joints. Key surface landmarks for trainers: iliac crest, ASIS, and the ischial tuberosity (hamstring origin).',
});

/* ---------------- Femur, tibia, fibula (right leg, anterior view) ---------------- */

function legBones() {
  // right leg, anterior view: medial = viewer's right. Femur ≈ 1.2 × tibia; neck–shaft angle ≈ 125°.
  const femur = sm([[360, 78], [386, 86], [414, 104], [448, 78], [466, 118], [430, 150], [414, 178], [424, 192], [410, 206], [420, 300], [426, 396], [456, 414], [466, 440], [454, 468], [432, 476], [412, 464], [390, 476], [370, 468], [362, 438], [386, 398], [380, 300], [364, 172], [350, 126], [352, 94]], 0.6);
  const tibia = sm([[370, 496], [410, 488], [468, 496], [466, 518], [444, 542], [438, 600], [440, 800], [448, 826], [452, 858], [440, 866], [424, 852], [406, 850], [402, 820], [404, 600], [398, 546], [378, 522]], 0.6);
  const fibula = sm([[344, 518], [352, 506], [366, 504], [375, 514], [372, 530], [365, 542], [366, 820], [374, 846], [366, 882], [352, 878], [348, 846], [352, 820], [354, 542], [347, 532]], 0.7);
  const L = 312, R = 540;
  const labels = [
    label(358, 90, L, 64, 'Greater trochanter'),
    label(370, 260, L, 260, 'Shaft of femur'),
    label(364, 436, L, 420, 'Lateral epicondyle'),
    label(380, 468, L, 460, 'Lateral condyle (femur)'),
    label(376, 504, L, 500, 'Lateral condyle (tibia)'),
    label(358, 520, L, 540, 'Head of fibula'),
    label(360, 700, L, 700, 'Fibula'),
    label(360, 872, L, 872, 'Lateral malleolus'),
    label(486, 84, R, 50, 'Head of femur'),
    label(436, 124, R, 108, 'Neck of femur'),
    label(392, 142, R, 150, 'Intertrochanteric line'),
    label(422, 192, R, 192, 'Lesser trochanter'),
    label(455, 412, R, 380, 'Adductor tubercle'),
    label(465, 440, R, 416, 'Medial epicondyle'),
    label(420, 436, R, 452, 'Patella'),
    label(462, 504, R, 494, 'Medial condyle (tibia)'),
    label(418, 552, R, 548, 'Tibial tuberosity'),
    label(436, 700, R, 700, 'Tibia (shin)'),
    label(450, 858, R, 858, 'Medial malleolus'),
  ].join('');
  return `<path class="hl1" d="${femur}"/><circle class="cart" cx="472" cy="92" r="30"/><path class="ln-thin" d="M366 108 Q392 140 418 176"/>
    <path class="hl5" d="${fibula}"/><path class="hl2" d="${tibia}"/><ellipse class="hl4" cx="418" cy="550" rx="9" ry="7"/>
    <path class="hl3" d="${sm([[412, 404], [432, 412], [434, 442], [412, 464], [390, 442], [392, 412]], 0.8)}"/>
    ${labels}`;
}

export const LEG_BONES = figure({
  title: 'Femur, patella, tibia and fibula (right leg, anterior view)',
  viewBox: '0 0 780 900',
  minWidth: 560,
  body: legBones(),
  caption: 'The femur angles inwards from hip to knee. Gluteus medius and minimus attach to the greater trochanter and iliopsoas to the lesser trochanter. The patella sits in the quadriceps tendon, which continues as the patellar ligament to the tibial tuberosity. The tibia carries body weight; the slender fibula is lateral, and its lateral malleolus sits lower than the medial malleolus of the tibia.',
});

/* ---------------- Foot: right foot, dorsal (top) view, big toe on the viewer's left ---------------- */

function foot() {
  const b = {
    calcaneus: sm([[334, 566], [304, 532], [306, 486], [330, 470], [372, 462], [392, 446], [408, 470], [404, 522], [384, 562]]),
    talus: sm([[300, 472], [294, 428], [314, 396], [350, 390], [372, 412], [370, 462], [336, 468]]),
    navicular: sm([[286, 392], [298, 368], [352, 362], [354, 386], [320, 396]]),
    cuboid: sm([[372, 420], [372, 384], [404, 374], [428, 400], [412, 440], [388, 452]]),
    cunM: sm([[282, 370], [292, 320], [318, 316], [316, 366]], 0.4),
    cunI: sm([[318, 364], [320, 324], [338, 322], [336, 362]], 0.4),
    cunL: sm([[338, 362], [340, 320], [362, 318], [370, 370]], 0.4),
  };
  let s = `<path class="hl5" d="${b.calcaneus}"/><path class="hl1" d="${b.talus}"/><path class="bn" d="${sm([[312, 404], [350, 398], [362, 420], [356, 450], [320, 452], [308, 430]], 0.7)}"/>
    <path class="hl2" d="${b.navicular}"/><path class="hl3" d="${b.cuboid}"/><path class="hl4" d="${b.cunM}"/><path class="hl4" d="${b.cunI}"/><path class="hl4" d="${b.cunL}"/>`;
  const meta = [[[300, 318], [284, 200], 19], [[329, 320], [326, 190], 14], [[350, 318], [356, 196], 13], [[378, 330], [388, 212], 13], [[408, 370], [430, 236], 13]];
  meta.forEach(([a, z, w]) => { s += band(seg(...a, ...z), w, 'cart'); });
  s += `<ellipse class="cart" cx="416" cy="372" rx="12" ry="10"/>`; // tuberosity of 5th metatarsal
  const toes = [
    [[[283, 194], [279, 142]], [[279, 134], [277, 100]]],
    [[[325, 184], [324, 150]], [[324, 144], [324, 126]], [[324, 120], [324, 106]]],
    [[[356, 190], [358, 158]], [[358, 152], [359, 136]], [[359, 130], [360, 118]]],
    [[[389, 206], [393, 176]], [[393, 170], [395, 156]], [[395, 150], [396, 140]]],
    [[[431, 230], [438, 204]], [[439, 198], [442, 186]], [[442, 180], [444, 172]]],
  ];
  toes.forEach((t, i) => t.forEach(([a, z], j) => { s += band(seg(...a, ...z), i === 0 ? [17, 15][j] : [11, 10, 9][j], 'my'); }));
  const L = 236, R = 492;
  s += [
    label(278, 112, L, 104, 'Distal phalanx (hallux)'),
    label(281, 168, L, 160, 'Proximal phalanx'),
    label(290, 250, L, 250, 'Metatarsal I'),
    label(298, 344, L, 340, 'Medial cuneiform'),
    label(306, 384, L, 384, 'Navicular'),
    label(316, 448, L, 432, 'Talus (trochlea on top)'),
    label(318, 528, L, 528, 'Calcaneus (heel)'),
    label(396, 152, R, 150, 'Phalanges (toes 2–5)'),
    label(424, 280, R, 262, 'Metatarsal V'),
    label(328, 342, R, 312, 'Intermediate cuneiform'),
    label(354, 344, R, 340, 'Lateral cuneiform'),
    label(420, 374, R, 372, 'Tuberosity of 5th metatarsal'),
    label(404, 416, R, 416, 'Cuboid'),
  ].join('');
  s += `${key(30, 590, [['hl1', 'Talus']])}${key(120, 590, [['hl5', 'Calcaneus']])}${key(240, 590, [['hl2', 'Navicular']])}${key(350, 590, [['hl3', 'Cuboid']])}${key(450, 590, [['hl4', 'Cuneiforms']])}${key(570, 590, [['cart', 'Metatarsals']])}${key(680, 590, [['my', 'Phalanges']])}`;
  return s;
}

export const FOOT = figure({
  title: 'Bones of the foot (right foot, from above)',
  viewBox: '0 0 800 610',
  minWidth: 600,
  body: foot(),
  caption: '26 bones: 7 tarsals (talus, calcaneus, navicular, cuboid and three cuneiforms), 5 metatarsals and 14 phalanges (the big toe, or hallux, has two). The talus sits between the tibia and fibula to form the ankle joint. The base of the 5th metatarsal is where fibularis brevis attaches, a common site of avulsion fracture after an ankle sprain.',
});
