// Muscle, physiology, training and nutrition diagrams.
import { figure, label, note, key, smooth, poly, band, seg, r } from './_svg.js';

const sm = (pts, t = 0.6) => smooth(pts, true, t);
const marker = (id, cls = 'mk') => `<marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="${cls}" d="M0 0 L10 5 L0 10 z"/></marker>`;
const ml = (x, y, text, cls = '', anchor = 'start') => `<text class="${cls}" x="${x}" y="${y}" text-anchor="${anchor}">${text.split('\n').map((l, i) => `<tspan x="${x}" dy="${i ? '1.2em' : 0}">${l}</tspan>`).join('')}</text>`;

/* ---------------- Muscle structure + sliding filaments ---------------- */

function muscle() {
  let s = `<defs>${marker('ms-ar')}</defs>`;
  // 1. whole muscle
  s += band('M14 140 L48 140', 12, 'my') + band('M216 140 L252 140', 12, 'my');
  s += `<path class="hl4" d="${sm([[44, 140], [72, 104], [130, 92], [190, 104], [220, 140], [190, 176], [130, 188], [72, 176]], 0.8)}"/>`;
  for (let k = -2; k <= 2; k++) s += `<path class="ln-thin" d="M${60} ${140 + k * 4} Q130 ${140 + k * 18} 204 ${140 + k * 4}"/>`;
  // 2. fascicle cross-section
  s += `<circle class="hl4" cx="350" cy="140" r="58"/>`;
  [[350, 140], [324, 118], [376, 118], [320, 158], [380, 160], [350, 98], [350, 182]].forEach(([x, y]) => { s += `<circle class="hl4b" cx="${x}" cy="${y}" r="19"/>`; });
  // 3. muscle fibre with striations, nuclei and myofibrils at the cut end
  s += `<rect class="hl4" x="450" y="108" width="150" height="64" rx="6"/>`;
  for (let x = 458; x < 598; x += 9) s += `<path class="ln-thin" d="${seg(x, 110, x, 170)}"/>`;
  s += `<ellipse class="nuc" cx="490" cy="112" rx="10" ry="4"/><ellipse class="nuc" cx="560" cy="168" rx="10" ry="4"/>`;
  s += `<ellipse class="hl4" cx="450" cy="140" rx="14" ry="32"/>`;
  for (let k = 0; k < 6; k++) s += `<circle class="hl4b" cx="${446 + (k % 2) * 8}" cy="${116 + k * 9.5}" r="4"/>`;
  // 4. myofibril with A and I bands
  s += `<rect class="bn" x="640" y="122" width="130" height="36" rx="4"/>`;
  for (let x = 640; x < 770; x += 26) s += `<rect class="hl4b" x="${x + 6}" y="123" width="14" height="34"/><path class="ln" d="${seg(x, 122, x, 158)}"/>`;
  // 5. one sarcomere (mini)
  s += `<rect class="bn" x="806" y="110" width="96" height="60" rx="4"/>`;
  s += `<path class="zline" d="M808 110 L808 170 M900 110 L900 170"/>`;
  for (let k = 0; k < 4; k++) { const y = 118 + k * 15; s += `<path class="actin" d="M808 ${y} L842 ${y} M900 ${y} L866 ${y}"/>`; if (k < 3) s += `<path class="myosin" d="M832 ${y + 7.5} L876 ${y + 7.5}"/>`; }
  // zoom wedges
  const wedge = (x1, y1a, y1b, x2, y2a, y2b) => `<path class="zoom" d="M${x1} ${y1a} L${x2} ${y2a} M${x1} ${y1b} L${x2} ${y2b}"/>`;
  s += wedge(170, 120, 160, 292, 82, 198) + wedge(366, 122, 158, 450, 108, 172) + wedge(560, 128, 152, 640, 122, 158) + wedge(718, 122, 158, 806, 110, 170);
  const heads = [['Muscle', 'wrapped in epimysium', 132], ['Fascicle', 'bundle of fibres; perimysium', 350], ['Muscle fibre (cell)', 'endomysium; many nuclei', 525], ['Myofibril', 'repeating sarcomeres', 705], ['Sarcomere', 'actin + myosin', 854]];
  heads.forEach(([t, d, x]) => { s += note(x, 236, t, 'dg-ex') + note(x, 256, d, 'dg-note'); });

  // sliding filament: relaxed vs contracted
  const sarc = (zl, zr, y, title) => {
    let g = `<rect class="bn" x="${zl}" y="${y - 6}" width="${zr - zl}" height="96" rx="6" opacity=".6"/>`;
    const mid = (zl + zr) / 2;
    for (let k = 0; k < 4; k++) {
      const yy = y + 6 + k * 24;
      g += `<path class="actin" d="M${zl} ${yy} L${zl + 150} ${yy} M${zr} ${yy} L${zr - 150} ${yy}"/>`;
      if (k < 3) {
        const my = yy + 12;
        g += `<path class="myosin" d="M${mid - 110} ${my} L${mid + 110} ${my}"/>`;
        for (let h = -100; h <= 100; h += 20) if (Math.abs(h) > 16) g += `<path class="xb" d="M${mid + h} ${my} l${h < 0 ? -7 : 7} -8 M${mid + h} ${my} l${h < 0 ? -7 : 7} 8"/>`;
      }
    }
    g += `<path class="zline" d="M${zl} ${y - 6} L${zl} ${y + 90} M${zr} ${y - 6} L${zr} ${y + 90}"/><path class="mline" d="M${mid} ${y - 6} L${mid} ${y + 90}"/>`;
    g += note(zl - 16, y + 44, title, 'dg-ex', 'end');
    return g;
  };
  s += sarc(160, 560, 300, 'Relaxed') + sarc(200, 520, 420, 'Contracted');
  s += `<path class="ln-thin" stroke-dasharray="4 4" d="M160 296 L200 416 M560 296 L520 416"/>`;
  const R = 600;
  s += label(160, 380, R, 300, 'Z line (sarcomere boundary)', { anchor: 'start' });
  s += label(220, 330, R, 330, 'Actin (thin filament)', { anchor: 'start' });
  s += label(300, 342, R, 360, 'Myosin (thick filament)', { anchor: 'start' });
  s += label(450, 334, R, 390, 'Myosin heads (cross-bridges)', { anchor: 'start' });
  s += label(360, 300, R, 420, 'M line (centre)', { anchor: 'start' });
  s += ml(R, 460, 'Myosin heads pull actin towards the centre,\nso each sarcomere shortens. The filaments\nthemselves stay the same length.', 'dg-note');
  return s;
}

export const MUSCLE_STRUCTURE = figure({
  title: 'From muscle to sarcomere, and the sliding filament theory',
  viewBox: '0 0 920 530',
  minWidth: 660,
  body: muscle(),
  caption: 'A muscle is bundles within bundles: fascicles of muscle fibres, each packed with myofibrils made of repeating sarcomeres. In contraction, myosin cross-bridges grab actin and pull it inwards (powered by ATP), so the overlap increases and the sarcomere, and therefore the whole muscle, shortens.',
});

/* ---------------- Agonist / antagonist at the elbow ---------------- */

function elbow() {
  let s = `<defs>${marker('el-ar', 'mk-acc')}</defs>`;
  // scapula hint, humerus, forearm (elbow at 90°), dumbbell
  s += `<path class="bn back" d="${sm([[120, 30], [230, 40], [210, 120], [150, 170], [110, 90]], 0.7)}"/>`;
  s += band('M200 70 L204 270', 22, 'bn');
  s += `<circle class="bn" cx="200" cy="66" r="18"/>`;
  s += band('M196 286 L420 270', 18, 'bn');
  s += `<rect class="hl2" x="418" y="226" width="14" height="88" rx="4"/><rect class="hl2" x="440" y="226" width="14" height="88" rx="4"/>${band('M410 270 L462 270', 8, 'bn')}`;
  // triceps (posterior, antagonist) and biceps (anterior, agonist)
  s += `<path class="tri" d="${sm([[178, 70], [160, 130], [158, 220], [176, 290], [190, 288], [186, 210], [190, 110]], 0.7)}"/>`;
  s += band('M176 288 L182 300', 6, 'my');
  s += `<path class="bic" d="${sm([[214, 74], [244, 120], [258, 190], [248, 250], [236, 268], [222, 250], [222, 170], [214, 110]], 0.7)}"/>`;
  s += band('M236 266 L252 280', 6, 'my') + band('M210 46 L214 76', 5, 'my');
  // movement arrow around the elbow
  s += `<path class="mv-acc" marker-end="url(#el-ar)" d="M372 330 A160 160 0 0 0 330 160"/>`;
  s += label(214, 50, 90, 26, 'Origin: scapula', { anchor: 'end' });
  s += label(246, 276, 300, 330, 'Insertion: radius\n(radial tuberosity)', { anchor: 'start' });
  s += label(250, 180, 300, 150, 'Biceps brachii', { anchor: 'start' });
  s += label(162, 200, 90, 220, 'Triceps\nbrachii', { anchor: 'end' });
  s += label(200, 278, 90, 300, 'Elbow (hinge)', { anchor: 'end' });
  const X = 520;
  s += note(X, 40, 'Roles in a biceps curl', 'dg-head', 'start');
  const rows = [
    ['bic', 'Agonist (prime mover)', 'Biceps brachii'],
    ['tri', 'Antagonist', 'Triceps brachii: relaxes and lengthens'],
    ['ln', 'Synergists', 'Brachialis, brachioradialis'],
    ['ln', 'Fixators', 'Deltoid, rotator cuff, trunk muscles'],
  ];
  rows.forEach(([c, t, d], i) => { const y = 76 + i * 46; s += `<rect class="${c}" x="${X}" y="${y - 13}" width="18" height="18" rx="4"/>${note(X + 28, y, t, 'dg-ex', 'start')}${note(X + 28, y + 20, d, '', 'start')}`; });
  s += note(X, 280, 'Biceps contraction type', 'dg-head', 'start');
  [['Lifting', 'Concentric (shortens)'], ['Lowering', 'Eccentric (lengthens under load)'], ['Holding still', 'Isometric (no length change)']].forEach(([a, b], i) => {
    const y = 312 + i * 28; s += note(X, y, a, 'dg-ex', 'start') + note(X + 112, y, b, '', 'start');
  });
  return `<g transform="translate(70 0)">${s}</g>`;
}

export const AGONIST_PAIR = figure({
  title: 'Agonist and antagonist: the biceps curl',
  viewBox: '0 0 950 400',
  minWidth: 640,
  body: elbow(),
  caption: 'Muscles work in pairs across a joint. Lifting the dumbbell, biceps brachii shortens (concentric) as the agonist while triceps relaxes as the antagonist. Lowering it under control, the biceps is still the working muscle but now lengthens (eccentric). Swap the movement (a triceps extension) and the roles swap too.',
});

/* ---------------- The heart: chambers, valves and blood flow ---------------- */

function heart() {
  let s = `<defs>${marker('ht-b', 'mk-b')}${marker('ht-r', 'mk-r')}</defs>`;
  // vessels behind the heart outline
  s += band('M560 70 Q620 90 620 200', 34, 'mr'); // descending aorta behind
  s += `<path class="hl4" d="${sm([[180, 170], [262, 128], [400, 140], [560, 128], [620, 190], [610, 320], [522, 448], [410, 504], [330, 470], [222, 362], [170, 262]], 0.75)}"/>`;
  s += `<rect class="cart" x="236" y="34" width="52" height="150" rx="10"/>`; // SVC
  s += band('M196 480 Q182 340 226 282', 44, 'cart'); // IVC
  // chambers
  s += `<path class="cart" d="${sm([[202, 196], [268, 162], [350, 176], [362, 262], [302, 292], [214, 272]], 0.75)}"/>`; // RA
  s += `<path class="cart" d="${sm([[244, 322], [368, 302], [392, 322], [392, 440], [342, 452], [262, 392]], 0.7)}"/>`; // RV
  s += `<path class="ox" d="${sm([[420, 178], [508, 152], [588, 192], [584, 262], [500, 282], [426, 262]], 0.75)}"/>`; // LA
  s += `<path class="ox" d="${sm([[412, 312], [548, 302], [568, 330], [522, 418], [430, 466], [406, 420]], 0.7)}"/>`; // LV
  // aorta (arch) and pulmonary trunk (in front)
  s += band('M440 300 L440 110 Q440 50 500 50 Q550 50 560 72', 40, 'mr');
  s += band('M440 50 L430 20 M478 46 L478 14 M512 50 L522 18', 10, 'mr');
  s += band('M368 300 L368 120 Q368 96 340 92 L130 92 M368 120 Q368 96 396 92 L520 92 Q600 92 640 92', 30, 'cart');
  // pulmonary veins into LA
  s += band('M720 182 L586 200 M720 238 L586 240', 22, 'mr');
  // valves
  const valve = (x1, y1, x2, y2) => `<path class="valve" d="M${x1} ${y1} L${(x1 + x2) / 2} ${(y1 + y2) / 2 + 12} L${x2} ${y2}"/>`;
  s += valve(262, 296, 336, 300) + valve(352, 304, 384, 304) + valve(440, 286, 512, 286) + valve(424, 310, 456, 310);
  // SA and AV nodes
  s += `<circle class="node" cx="282" cy="176" r="7"/><circle class="node" cx="378" cy="292" r="6"/>`;
  // flow arrows
  const fb = d => `<path class="flow-b" marker-end="url(#ht-b)" d="${d}"/>`;
  const fr = d => `<path class="flow-r" marker-end="url(#ht-r)" d="${d}"/>`;
  s += fb('M262 60 L262 200') + fb('M200 440 Q196 340 236 280') + fb('M300 230 L318 360') + fb('M338 420 Q368 380 368 250') + fb('M330 92 L150 92') + fb('M406 92 L626 92');
  s += fr('M700 210 L596 216') + fr('M520 230 L480 360') + fr('M450 420 Q440 380 440 160') + fr('M470 52 Q520 40 548 64');
  // labels
  const L = 128, R = 650;
  s += [
    label(262, 120, L, 40, 'Superior vena cava\n(from upper body)'),
    label(240, 230, L, 150, 'Right atrium'),
    label(282, 176, L, 196, 'SA node (pacemaker)'),
    label(300, 300, L, 250, 'Tricuspid valve'),
    label(300, 380, L, 330, 'Right ventricle'),
    label(194, 420, L, 420, 'Inferior vena cava\n(from lower body)'),
    label(180, 92, L, 92, 'To right lung', { straight: true }),
    label(500, 54, R, 30, 'Aorta (to body)'),
    label(632, 100, R + 6, 124, 'To left lung\n(pulmonary artery)'),
    label(368, 140, L, 121, 'Pulmonary trunk (to lungs)'),
    label(700, 186, R + 20, 160, 'Pulmonary veins (from lungs)'),
    label(540, 220, R + 20, 266, 'Left atrium'),
    label(476, 288, R, 296, 'Bicuspid (mitral) valve'),
    label(440, 312, R, 336, 'Aortic valve'),
    label(378, 292, R, 372, 'AV node'),
    label(500, 380, R, 410, 'Left ventricle\n(thickest wall)'),
    label(396, 440, R, 458, 'Septum'),
  ].join('');
  s += key(130, 500, [['cart', 'Deoxygenated blood']], 0) + key(320, 500, [['ox', 'Oxygenated blood']], 0) + key(500, 500, [['hl4', 'Heart muscle (myocardium)']], 0);
  return `<g transform="translate(44 0)">${s}</g>`;
}

export const HEART = figure({
  title: 'The heart: chambers, valves and blood flow',
  viewBox: '0 0 940 520',
  minWidth: 660,
  body: heart(),
  caption: 'Drawn as if facing the person, so the heart\'s right side is on your left. Deoxygenated blood (blue) returns via the venae cavae to the right atrium, passes to the right ventricle and is pumped to the lungs. Oxygenated blood (red) returns via the pulmonary veins to the left atrium, then the left ventricle pumps it through the aorta to the body. Valves stop backflow; the SA node starts each beat.',
});

/* ---------------- Respiratory system + gas exchange ---------------- */

function lungs() {
  let s = `<defs>${marker('lg-r', 'mk-r')}${marker('lg-b', 'mk-b')}</defs>`;
  s += `<path class="lung" d="${sm([[252, 106], [196, 140], [148, 232], [128, 352], [150, 404], [262, 392], [270, 250]], 0.7)}"/>`;
  s += `<path class="lung" d="${sm([[322, 106], [376, 140], [424, 232], [444, 352], [422, 404], [332, 394], [312, 330], [346, 296], [318, 248]], 0.7)}"/>`;
  s += `<path class="ln-thin" d="M150 282 Q206 252 262 250 M136 330 Q200 300 266 318 M428 300 Q372 270 324 250"/>`;
  // trachea + branching airways
  s += `<rect class="cart" x="274" y="30" width="26" height="118" rx="6"/>`;
  for (let y = 40; y < 148; y += 12) s += `<path class="ln-thin" d="${seg(276, y, 298, y)}"/>`;
  const branch = (x, y, a, len, w, d) => {
    const x2 = x + Math.cos(a) * len, y2 = y + Math.sin(a) * len;
    let out = band(seg(x, y, x2, y2), w, 'cart');
    if (d > 0) out += branch(x2, y2, a - 0.45, len * 0.68, w * 0.7, d - 1) + branch(x2, y2, a + 0.45, len * 0.68, w * 0.7, d - 1);
    return out;
  };
  s += branch(287, 146, Math.PI / 2 + 0.55, 62, 14, 3) + branch(287, 146, Math.PI / 2 - 0.75, 66, 13, 3);
  s += `<path class="diaph" d="M110 436 Q290 360 470 436"/>`;
  // alveolus inset
  const ax = 700, ay = 250;
  s += `<circle class="ln" cx="460" cy="230" r="10"/><path class="ln-thin" stroke-dasharray="4 4" d="M468 224 L590 130 M468 236 L590 380"/>`;
  s += band(`M${ax - 150} 120 L${ax - 70} 190`, 16, 'cart');
  [[ax - 40, ay - 60, 36], [ax + 30, ay - 70, 34], [ax - 60, ay + 10, 34], [ax + 50, ay + 5, 40]].forEach(([x, y, rr]) => { s += `<circle class="alv" cx="${x}" cy="${y}" r="${rr}"/>`; });
  s += `<circle class="alv" cx="${ax}" cy="${ay}" r="62"/>`;
  s += band(`M${ax - 120} ${ay + 100} Q${ax - 70} ${ay + 70} ${ax} ${ay + 70}`, 14, 'cart') + band(`M${ax} ${ay + 70} Q${ax + 70} ${ay + 70} ${ax + 120} ${ay + 100}`, 14, 'mr');
  s += `<path class="flow-r" marker-end="url(#lg-r)" d="M${ax - 8} ${ay + 10} L${ax - 8} ${ay + 58}"/><path class="flow-b" marker-end="url(#lg-b)" d="M${ax + 24} ${ay + 60} L${ax + 24} ${ay + 12}"/>`;
  s += `<text class="gas-r" x="${ax - 14}" y="${ay}" text-anchor="end">O₂</text><text class="gas-b" x="${ax + 30}" y="${ay}" text-anchor="start">CO₂</text>`;
  const L = 110, R = 470;
  s += [
    label(287, 60, L, 40, 'Trachea'),
    label(260, 176, L, 120, 'Right main bronchus'),
    label(200, 240, L, 200, 'Bronchioles'),
    label(160, 320, L, 290, 'Right lung (3 lobes)'),
    label(180, 410, L, 410, 'Diaphragm'),
    label(400, 330, R + 20, 330, 'Left lung (2 lobes)', { anchor: 'start' }),
    label(ax + 40, ay - 40, ax + 110, 96, 'Alveolus', { anchor: 'start' }),
    label(ax - 80, ay + 82, ax - 120, ay + 150, 'Capillary (from heart,\nlow in O₂)', { anchor: 'end' }),
    label(ax + 90, ay + 84, ax + 150, ay + 150, 'To heart, rich in O₂', { anchor: 'end' }),
  ].join('');
  s += note(ax, 40, 'Gas exchange in the alveoli', 'dg-head');
  return `<g transform="translate(50 0)">${s}</g>`;
}

export const LUNGS = figure({
  title: 'The respiratory system and gas exchange',
  viewBox: '0 0 940 470',
  minWidth: 660,
  body: lungs(),
  caption: 'Air travels down the trachea, bronchi and ever-smaller bronchioles to millions of alveoli. Each alveolus is wrapped in capillaries; their walls are one cell thick, so oxygen diffuses into the blood and carbon dioxide diffuses out to be breathed away. The diaphragm contracts and flattens to draw air in.',
});

/* ---------------- Energy system contribution over time (schematic) ---------------- */

function energy() {
  const x0 = 80, x1 = 800, y0 = 320, y1 = 40;
  const T = [0, 2, 5, 10, 20, 30, 60, 120, 180, 300, 600];
  const pc = [0.9, 0.7, 0.55, 0.35, 0.18, 0.1, 0.05, 0.03, 0.02, 0.02, 0.01];
  const gl = [0.05, 0.25, 0.38, 0.48, 0.55, 0.5, 0.35, 0.2, 0.15, 0.08, 0.04];
  const X = t => x0 + (Math.log(t + 2) - Math.log(2)) / (Math.log(602) - Math.log(2)) * (x1 - x0);
  const Y = v => y0 - v * (y0 - y1);
  const pts1 = T.map((t, i) => [X(t), Y(pc[i])]);
  const pts2 = T.map((t, i) => [X(t), Y(pc[i] + gl[i])]);
  const area = (upper, lower) => `M${upper.map(([x, y]) => `${r(x)} ${r(y)}`).join(' L')} L${lower.slice().reverse().map(([x, y]) => `${r(x)} ${r(y)}`).join(' L')} Z`;
  const base = T.map(t => [X(t), y0]), top = T.map(t => [X(t), y1]);
  let s = `<path class="e-aer" d="${area(top, pts2)}"/><path class="e-gly" d="${area(pts2, pts1)}"/><path class="e-pc" d="${area(pts1, base)}"/>`;
  s += `<path class="axis" d="M${x0} ${y1} L${x0} ${y0} L${x1} ${y0}"/>`;
  [[0, '0'], [10, '10 s'], [30, '30 s'], [60, '1 min'], [120, '2 min'], [300, '5 min'], [600, '10 min']].forEach(([t, l]) => { s += `<path class="axis" d="M${r(X(t))} ${y0} l0 6"/><text class="dg-tick" x="${r(X(t))}" y="${y0 + 22}" text-anchor="middle">${l}</text>`; });
  [0, 0.5, 1].forEach(v => { s += `<text class="dg-tick" x="${x0 - 8}" y="${r(Y(v)) + 4}" text-anchor="end">${v * 100}%</text>`; });
  s += `<text class="dg-tick" x="${(x0 + x1) / 2}" y="${y0 + 46}" text-anchor="middle">Duration of all-out effort</text>`;
  s += `<text class="dg-tick" transform="translate(22 ${(y0 + y1) / 2}) rotate(-90)" text-anchor="middle">Share of energy supplied</text>`;
  s += `<text class="e-lbl" x="${X(1.2)}" y="${Y(0.2)}">ATP–PC</text><text class="e-lbl" x="${X(14)}" y="${Y(0.5)}">Lactate (anaerobic glycolysis)</text><text class="e-lbl" x="${X(160)}" y="${Y(0.62)}">Aerobic</text>`;
  [[10, '100 m'], [50, '400 m'], [110, '800 m'], [240, '1500 m']].forEach(([t, l]) => { s += `<path class="ln-thin" stroke-dasharray="3 3" d="M${r(X(t))} ${y1} L${r(X(t))} ${y0}"/><text class="dg-small" x="${r(X(t)) + 4}" y="${y1 + 14}">${l}</text>`; });
  return s;
}

export const ENERGY_CHART = figure({
  title: 'Which energy system supplies the energy?',
  viewBox: '0 0 820 380',
  minWidth: 600,
  body: energy(),
  caption: 'Schematic, not exact values. All three systems work at once; their share depends on how long a maximal effort lasts. The ATP–PC system dominates the first few seconds, anaerobic glycolysis peaks between about 10 seconds and a minute, and beyond about 1–2 minutes the aerobic system supplies most of the energy.',
});

/* ---------------- Heart-rate zones ---------------- */

function zones() {
  const x0 = 200, x1 = 800;
  const X = p => x0 + (p - 50) / 50 * (x1 - x0);
  const Z = [
    [50, 60, 'z1', 'Recovery', '2–3', 'Chat or sing', '90–108', 'Recovery'],
    [60, 70, 'z2', 'Aerobic base', '4–5', 'Full sentences', '108–126', 'Endurance base'],
    [70, 80, 'z3', 'Tempo', '6–7', 'Short sentences', '126–144', 'Aerobic fitness'],
    [80, 90, 'z4', 'Threshold', '8', 'A few words', '144–162', 'Lactate threshold'],
    [90, 100, 'z5', 'Maximal', '9–10', 'Can\'t talk', '162–180', 'VO₂ max, speed'],
  ];
  const rows = ['Zone', '% of max HR', 'RPE (0–10)', 'Talk test', 'Age 40 (bpm)', 'Main benefit'];
  let s = '';
  rows.forEach((t, i) => { s += note(x0 - 14, 44 + i * 44, t, 'dg-ex', 'end'); });
  Z.forEach(([a, b, c, name, rpe, talk, bpm, ben]) => {
    const xa = X(a), xb = X(b), xm = (xa + xb) / 2;
    s += `<rect class="${c}" x="${xa + 2}" y="22" width="${xb - xa - 4}" height="34" rx="6"/>`;
    s += note(xm, 44, name, 'z-name');
    [`${a}–${b}%`, rpe, talk, bpm, ben].forEach((v, i) => { s += note(xm, 88 + i * 44, v, i === 4 ? 'dg-small' : ''); });
  });
  for (let i = 1; i < rows.length; i++) s += `<path class="ln-thin" d="M${x0} ${66 + (i - 1) * 44} L${x1} ${66 + (i - 1) * 44}"/>`;
  return s;
}

export const HR_ZONES = figure({
  title: 'Heart-rate zones, RPE and the talk test',
  viewBox: '0 0 820 290',
  minWidth: 640,
  body: zones(),
  caption: 'Three ways to judge the same intensity. Example bpm uses an estimated maximum of 180 (220 − 40). Age-predicted maximums can be 10–12 bpm out either way, and medicines such as beta blockers lower heart rate, so cross-check with RPE and the talk test.',
});

/* ---------------- Eatwell Guide proportions ---------------- */

function eatwell() {
  const cx = 230, cy = 210, R = 170, ri = 66;
  const parts = [
    ['hl5', 'Fruit and vegetables', 40, 'At least 5 portions a day'],
    ['my', 'Potatoes, bread, rice, pasta', 38, 'Choose wholegrain / higher fibre'],
    ['hl4', 'Beans, pulses, fish, eggs, meat', 12, '2 portions of fish a week, 1 oily'],
    ['cart', 'Dairy and alternatives', 8, 'Lower fat and lower sugar options'],
    ['hl3', 'Oils and spreads', 1, 'Unsaturated, small amounts'],
  ];
  const total = 100;
  let a = -Math.PI / 2, s = '';
  const P = (ang, rad) => [cx + Math.cos(ang) * rad, cy + Math.sin(ang) * rad];
  parts.forEach(([cls, , pct]) => {
    const a2 = a + (pct / total) * Math.PI * 2;
    const large = a2 - a > Math.PI ? 1 : 0;
    const [x1, y1] = P(a, R), [x2, y2] = P(a2, R), [x3, y3] = P(a2, ri), [x4, y4] = P(a, ri);
    s += `<path class="${cls}" d="M${r(x1)} ${r(y1)} A${R} ${R} 0 ${large} 1 ${r(x2)} ${r(y2)} L${r(x3)} ${r(y3)} A${ri} ${ri} 0 ${large} 0 ${r(x4)} ${r(y4)} Z"/>`;
    const [lx, ly] = P((a + a2) / 2, (R + ri) / 2);
    if (pct >= 8) s += note(lx, ly + 6, `${pct}%`, 'pct');
    a = a2;
  });
  s += note(cx, cy - 4, 'Eatwell', 'dg-head') + note(cx, cy + 16, 'Guide', 'dg-head');
  parts.forEach(([cls, t, pct, adv], i) => {
    const y = 60 + i * 62;
    s += `<rect class="${cls}" x="450" y="${y - 14}" width="20" height="20" rx="4"/>${note(480, y, `${t} (${pct}%)`, 'dg-ex', 'start')}${note(480, y + 22, adv, 'dg-note', 'start')}`;
  });
  s += note(450, 382, 'Plus: 6–8 drinks a day. Foods high in fat, salt and sugar sit outside the', 'dg-small', 'start') + note(450, 400, 'guide: eat less often and in small amounts.', 'dg-small', 'start');
  return s;
}

export const EATWELL = figure({
  title: 'The Eatwell Guide in proportions',
  viewBox: '0 0 880 420',
  minWidth: 620,
  body: eatwell(),
  caption: 'The UK Eatwell Guide shows the balance of a healthy diet over a day or a week, not every meal. Fruit and vegetables and starchy carbohydrates each make up just over a third; protein foods, dairy and a little unsaturated oil make up the rest.',
});
