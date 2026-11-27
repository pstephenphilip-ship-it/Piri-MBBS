// Bone structure diagrams: long bone section, bone shapes, remodelling, bone mass over life.
import { figure, label, note, key, smooth, poly, band, seg, r } from './_svg.js';

/* ---------------- Long bone (longitudinal section of a femur) ---------------- */

function longBone() {
  const cx = 300;
  const mirror = half => [...half, ...half.slice(1, -1).reverse().map(([x, y]) => [-x, y])];
  const M = (pts) => pts.map(([x, y]) => [cx + x, y]);
  // right half of the outline, top → bottom (x = distance from centre)
  const outer = M(mirror([[0, 26], [38, 30], [66, 52], [74, 88], [64, 120], [44, 146], [34, 176], [33, 260], [32, 350], [34, 430], [42, 466], [60, 500], [76, 530], [80, 562], [68, 588], [44, 594], [20, 584], [0, 574]]));
  const spongyTop = M(mirror([[0, 33], [34, 37], [59, 56], [67, 88], [58, 116], [40, 140], [28, 168], [20, 192], [0, 186]]));
  const spongyBot = M(mirror([[0, 450], [20, 444], [30, 452], [37, 470], [54, 502], [70, 530], [73, 560], [63, 582], [44, 587], [22, 578], [0, 568]]));
  const cavity = M(mirror([[0, 182], [16, 190], [21, 230], [21, 420], [17, 446], [0, 456]]));
  // articular cartilage caps (open paths following the ends)
  const capTop = smooth(M([[-70, 74], [-58, 46], [-36, 28], [0, 22], [36, 28], [58, 46], [70, 74]]), false);
  const capBot = smooth(M([[-80, 552], [-72, 584], [-46, 598], [-22, 590], [0, 580], [22, 590], [46, 598], [72, 584], [80, 552]]), false);
  const perioL = smooth(M([[-37, 156], [-36.5, 180], [-35.5, 260], [-34.5, 350], [-36.5, 430], [-43, 462]]), false);
  const perioR = smooth(M([[37, 156], [36.5, 180], [35.5, 260], [34.5, 350], [36.5, 430], [43, 462]]), false);
  const endoL = smooth(M([[-16, 192], [-20.5, 232], [-20.5, 418], [-16.5, 444]]), false);
  const epiTop = `M${cx - 44} 148 Q${cx} 136 ${cx + 44} 148`;
  const epiBot = `M${cx - 50} 478 Q${cx} 490 ${cx + 50} 478`;
  const artery = `M${cx + 74} 296 L${cx + 36} 312 L${cx + 14} 326`;

  // spongy-bone texture: red marrow between trabeculae
  const pat = `<defs><pattern id="lb-sp" width="12" height="12" patternUnits="userSpaceOnUse">
    <rect class="sp" width="12" height="12" stroke="none"/>
    <ellipse class="mr" cx="4" cy="4" rx="2.6" ry="1.8" stroke="none"/>
    <ellipse class="mr" cx="10" cy="9.5" rx="2" ry="2.6" stroke="none"/>
    <path class="ln-thin" d="M0 7 L5 9 L12 6 M7 0 L8 4"/>
  </pattern></defs>`;

  // osteon inset
  const ox = 820, oy = 270, oR = 100;
  let osteon = `<circle class="bn" cx="${ox}" cy="${oy}" r="${oR}"/>`;
  for (let k = 1; k <= 6; k++) osteon += `<circle class="ln-thin" cx="${ox}" cy="${oy}" r="${12 + k * 13}"/>`;
  osteon += `<circle class="hole" cx="${ox}" cy="${oy}" r="11"/><circle class="mr" cx="${ox - 3}" cy="${oy}" r="3.4"/><circle class="cart" cx="${ox + 4}" cy="${oy + 2}" r="2.6"/>`;
  for (let k = 1; k <= 5; k++) {
    const rad = 12 + k * 13 + 6.5;
    const n = 6 + k * 3;
    for (let j = 0; j < n; j++) {
      const a = (j / n) * Math.PI * 2 + k * 0.4;
      const x = ox + Math.cos(a) * rad, y = oy + Math.sin(a) * rad;
      osteon += `<ellipse class="hl3" cx="${r(x)}" cy="${r(y)}" rx="3.4" ry="1.9" transform="rotate(${r(a * 180 / Math.PI + 90)} ${r(x)} ${r(y)})"/>`;
      osteon += `<path class="ln-thin" d="${seg(x, y, ox + Math.cos(a) * (rad - 6), oy + Math.sin(a) * (rad - 6))}"/>`;
    }
  }
  osteon += `<path class="art-o" d="M${ox + oR - 8} ${oy - 54} L${ox + 10} ${oy - 4}"/><path class="art" d="M${ox + oR - 8} ${oy - 54} L${ox + 10} ${oy - 4}"/>`;
  // magnifier lines from the shaft wall to the inset
  const mag = `<circle class="ln" cx="${cx + 27}" cy="330" r="9"/><path class="ln-thin" stroke-dasharray="4 4" d="M${cx + 34} 323 L${ox - 70} ${oy + 76} M${cx + 34} 337 L${ox - 46} ${oy + 98}"/>`;

  const L = 170, R = 432;
  const brackets = [
    [26, 146, 'Proximal\nepiphysis'], [148, 190, 'Metaphysis'], [190, 446, 'Diaphysis\n(shaft)'], [446, 482, 'Metaphysis'], [482, 596, 'Distal\nepiphysis'],
  ].map(([y1, y2, t]) => `<path class="ln" d="M${L + 10} ${y1 + 2} L${L + 4} ${y1 + 2} L${L + 4} ${y2 - 2} L${L + 10} ${y2 - 2}"/>${note(L - 2, (y1 + y2) / 2, '', 'dg-note')}<text class="dg-region" x="${L - 2}" y="${(y1 + y2) / 2}" text-anchor="end">${t.split('\n').map((l, i, a) => `<tspan x="${L - 2}" dy="${i ? '1.1em' : (-(a.length - 1) * 0.55 + 0.35) + 'em'}">${l}</tspan>`).join('')}</text>`).join('');

  const labels = [
    label(cx + 30, 30, R, 40, 'Articular (hyaline) cartilage'),
    label(cx + 36, 90, R, 92, 'Spongy (cancellous) bone\nwith red marrow'),
    label(cx + 30, 144, R, 146, 'Epiphyseal line\n(growth plate in children)'),
    label(cx + 30, 250, R, 214, 'Compact (cortical) bone'),
    label(cx + 38, 210, R, 176, 'Periosteum'),
    label(cx + 6, 260, R, 262, 'Medullary cavity\n(yellow marrow)'),
    label(cx + 20, 380, R, 380, 'Endosteum'),
    label(cx + 52, 304, R, 314, 'Nutrient artery\n(via nutrient foramen)'),
    label(cx + 74, 568, R, 560, 'Articular cartilage'),
    label(ox, oy - 2, ox + 4, oy + oR + 26, 'Central (Haversian) canal', { anchor: 'middle', straight: true }),
    label(ox - 62, oy - 52, ox - 20, oy - oR - 44, 'Lamellae (rings of matrix)', { anchor: 'middle', straight: true }),
    label(ox + 62, oy + 30, ox + 60, oy + oR + 52, 'Osteocyte in lacuna', { anchor: 'middle', straight: true }),
  ].join('');

  return `${pat}
  <path class="bn" d="${smooth(outer, true, 0.8)}"/>
  <path fill="url(#lb-sp)" stroke="currentColor" stroke-width="1" d="${smooth(spongyTop, true, 0.8)}"/>
  <path fill="url(#lb-sp)" stroke="currentColor" stroke-width="1" d="${smooth(spongyBot, true, 0.8)}"/>
  <path class="my" d="${smooth(cavity, true, 0.8)}"/>
  <path class="ln" stroke-width="2" d="${epiTop} ${epiBot}"/>
  ${band(capTop, 7, 'cart')}${band(capBot, 7, 'cart')}
  <path class="perio" d="${perioL} ${perioR}"/>
  <path class="endo" d="${endoL}"/>
  <path class="art-o" d="${artery}"/><path class="art" d="${artery}"/>
  ${mag}${osteon}
  ${note(ox, oy - oR - 16, 'Osteon (magnified)', 'dg-head')}
  ${brackets}${labels}`;
}

export const LONG_BONE = figure({
  title: 'Structure of a long bone',
  viewBox: '0 0 960 620',
  minWidth: 620,
  body: longBone(),
  caption: 'A femur cut lengthways. The shaft (diaphysis) is a tube of compact bone around the medullary cavity; the ends (epiphyses) are spongy bone holding red marrow, capped with articular cartilage. The magnified osteon shows how compact bone is built: rings of matrix around a central canal carrying blood vessels, with osteocytes sitting in small spaces (lacunae).',
});

/* ---------------- Five bone shapes ---------------- */

function shapes() {
  const P = 152, y0 = 40;
  const cxs = [80, 80 + P, 80 + 2 * P, 80 + 3 * P, 80 + 4 * P];
  const out = [];
  // 1. Long: humerus
  {
    const c = cxs[0];
    out.push(`<circle class="bn" cx="${c - 6}" cy="${y0 + 26}" r="14"/><path class="bn" d="${smooth([[c - 12, y0 + 18], [c + 6, y0 + 12], [c + 16, y0 + 24], [c + 10, y0 + 50], [c + 9, y0 + 150], [c + 22, y0 + 172], [c + 16, y0 + 182], [c, y0 + 184], [c - 16, y0 + 182], [c - 22, y0 + 172], [c - 6, y0 + 150], [c - 4, y0 + 50], [c - 10, y0 + 36]], true, 0.7)}"/>`);
  }
  // 2. Short: carpal (roughly cube-shaped)
  {
    const c = cxs[1], y = y0 + 70;
    out.push(`<path class="bn" d="${poly([[c - 30, y], [c + 10, y - 16], [c + 38, y], [c + 38, y + 40], [c - 2, y + 58], [c - 30, y + 40]])}"/><path class="ln" d="M${c - 30} ${y} L${c + 2} ${y + 16} L${c + 38} ${y} M${c + 2} ${y + 16} L${c - 2} ${y + 58}"/>`);
  }
  // 3. Flat: sternum
  {
    const c = cxs[2];
    out.push(`<path class="bn" d="${smooth([[c - 26, y0 + 20], [c - 6, y0 + 18], [c, y0 + 24], [c + 6, y0 + 18], [c + 26, y0 + 20], [c + 24, y0 + 46], [c + 14, y0 + 60], [c - 14, y0 + 60], [c - 24, y0 + 46]], true, 0.6)}"/>
    <path class="bn" d="${smooth([[c - 15, y0 + 63], [c + 15, y0 + 63], [c + 17, y0 + 150], [c + 8, y0 + 160], [c - 8, y0 + 160], [c - 17, y0 + 150]], true, 0.5)}"/>
    <path class="bn" d="${poly([[c - 6, y0 + 162], [c + 6, y0 + 162], [c + 2, y0 + 184], [c - 2, y0 + 184]])}"/>`);
  }
  // 4. Irregular: vertebra (superior view)
  {
    const c = cxs[3], y = y0 + 60;
    out.push(`<path class="bn" d="${smooth([[c - 36, y], [c, y - 10], [c + 36, y], [c + 36, y + 22], [c + 14, y + 34], [c + 40, y + 44], [c + 52, y + 42], [c + 52, y + 52], [c + 20, y + 58], [c + 8, y + 108], [c, y + 112], [c - 8, y + 108], [c - 20, y + 58], [c - 52, y + 52], [c - 52, y + 42], [c - 40, y + 44], [c - 14, y + 34], [c - 36, y + 22]], true, 0.6)}"/><ellipse class="hole" cx="${c}" cy="${y + 48}" rx="13" ry="11"/>`);
  }
  // 5. Sesamoid: patella in the quadriceps tendon
  {
    const c = cxs[4];
    out.push(`<path class="tendon" d="M${c - 9} ${y0 + 6} L${c + 9} ${y0 + 6} L${c + 12} ${y0 + 76} L${c - 12} ${y0 + 76} Z M${c - 8} ${y0 + 128} L${c + 8} ${y0 + 128} L${c + 7} ${y0 + 184} L${c - 7} ${y0 + 184} Z"/>
    <path class="bn" d="${smooth([[c, y0 + 66], [c + 22, y0 + 76], [c + 24, y0 + 102], [c + 10, y0 + 132], [c, y0 + 136], [c - 10, y0 + 132], [c - 24, y0 + 102], [c - 22, y0 + 76]], true, 0.8)}"/>
    <text class="dg-small" x="${c + 18}" y="${y0 + 30}">tendon</text><text class="dg-small" x="${c + 14}" y="${y0 + 166}">ligament</text>`);
  }
  const titles = ['Long', 'Short', 'Flat', 'Irregular', 'Sesamoid'];
  const ex = ['Femur, humerus, tibia,\nphalanges', 'Carpals, tarsals', 'Sternum, ribs, scapula,\ncranial bones', 'Vertebrae, sacrum,\nfacial bones', 'Patella, pisiform'];
  const role = ['Levers for movement', 'Stability, spread load', 'Protection, muscle\nattachment', 'Protection, support', 'Protect tendon,\nimprove leverage'];
  const ml = (x, y, t, cls) => `<text class="${cls}" x="${x}" y="${y}" text-anchor="middle">${t.split('\n').map((l, i) => `<tspan x="${x}" dy="${i ? '1.15em' : 0}">${l}</tspan>`).join('')}</text>`;
  cxs.forEach((c, i) => {
    out.push(note(c, 24, titles[i], 'dg-head'));
    out.push(ml(c, 252, ex[i], 'dg-ex'));
    out.push(ml(c, 296, role[i], 'dg-note'));
  });
  return out.join('');
}

export const BONE_SHAPES = figure({
  title: 'The five bone shapes',
  viewBox: '0 0 760 330',
  minWidth: 600,
  body: shapes(),
  caption: 'Bones are classified by shape, and shape reflects function. Long bones act as levers, short bones give stability, flat bones protect organs and give broad attachment areas, irregular bones fit complex roles, and sesamoid bones sit inside tendons.',
});

/* ---------------- Remodelling cycle ---------------- */

function remodelling() {
  const y = 150; // bone surface
  const stages = [
    { x: 95, t: '1. Resting', d: 'Lining cells cover\nthe bone surface' },
    { x: 285, t: '2. Resorption', d: 'Osteoclasts dissolve\nold bone (~2–4 weeks)' },
    { x: 475, t: '3. Formation', d: 'Osteoblasts lay new\nmatrix (~3–4 months)' },
    { x: 665, t: '4. Mineralisation', d: 'Matrix hardens; some\ncells become osteocytes' },
  ];
  let s = '';
  // bone block with surface profile per stage
  const surf = [[0, y], [190, y], [205, y], [230, y + 40], [340, y + 40], [365, y], [380, y], [400, y + 16], [550, y + 16], [570, y], [760, y]];
  s += `<path class="bn" d="${poly([...surf, [760, 260], [0, 260]])}"/>`;
  // new osteoid in formation pit, new bone in stage 4
  s += `<path class="cart" d="${poly([[400, y + 16], [550, y + 16], [550, y], [400, y]])}" opacity=".9"/>`;
  s += `<path class="hl1" d="${poly([[580, y], [750, y], [750, y + 40], [580, y + 40]])}" opacity=".55"/>`;
  // osteocytes in bone
  for (let i = 0; i < 12; i++) { const xx = 30 + i * 62, yy = 200 + (i % 2) * 28; s += `<ellipse class="hl3" cx="${xx}" cy="${yy}" rx="7" ry="4"/><path class="ln-thin" d="M${xx - 7} ${yy} l-9 -4 M${xx + 7} ${yy} l9 4 M${xx} ${yy - 4} l2 -9"/>`; }
  // lining cells (stage 1)
  for (let i = 0; i < 5; i++) s += `<rect class="bn-2" x="${30 + i * 32}" y="${y - 9}" width="28" height="8" rx="4"/>`;
  // osteoclast: big multinucleated cell in the pit
  s += `<path class="hl2" d="${smooth([[238, y + 36], [262, y + 10], [300, y + 4], [336, y + 14], [336, y + 36], [300, y + 40], [262, y + 40]], true, 0.8)}"/>`;
  for (let i = 0; i < 4; i++) s += `<circle class="bn" cx="${262 + i * 18}" cy="${y + 24}" r="5"/>`;
  // osteoblasts lining the formation pit
  for (let i = 0; i < 6; i++) s += `<path class="hl1" d="${smooth([[404 + i * 24, y + 14], [414 + i * 24, y - 6], [424 + i * 24, y + 14]], true, 0.8)}"/><circle class="bn" cx="${414 + i * 24}" cy="${y + 4}" r="3.6"/>`;
  // labels and stage titles
  stages.forEach(st => {
    s += note(st.x, 34, st.t, 'dg-head');
    s += `<text class="dg-note" x="${st.x}" y="58" text-anchor="middle">${st.d.split('\n').map((l, i) => `<tspan x="${st.x}" dy="${i ? '1.15em' : 0}">${l}</tspan>`).join('')}</text>`;
  });
  s += `<defs><marker id="rm-ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>`;
  for (let i = 0; i < 3; i++) s += `<path class="ln" marker-end="url(#rm-ar)" d="M${stages[i].x + 58} 104 L${stages[i + 1].x - 58} 104"/>`;
  s += label(300, y + 6, 300, 290, 'Osteoclast', { anchor: 'middle', straight: true });
  s += label(450, y - 4, 450, 290, 'Osteoblasts', { anchor: 'middle', straight: true });
  s += label(475, y + 10, 560, 300, 'New matrix (osteoid)', { anchor: 'start' });
  s += label(216, 228, 130, 300, 'Osteocyte', { anchor: 'end' });
  s += `<text class="dg-small" x="665" y="${y + 25}" text-anchor="middle">new bone</text>`;
  return s;
}

export const REMODELLING = figure({
  title: 'The bone remodelling cycle',
  viewBox: '0 0 760 320',
  minWidth: 600,
  body: remodelling(),
  caption: 'Bone is constantly renewed. Osteoclasts remove a small patch of old bone, then osteoblasts fill the pit with new matrix that mineralises; some osteoblasts become trapped as osteocytes, which sense load and signal where bone is needed. Loading the skeleton tips the balance towards formation.',
});

/* ---------------- Bone mass across life (schematic) ---------------- */

function boneMass() {
  const x0 = 70, x1 = 720, y0 = 290, y1 = 40;
  const X = age => x0 + (age / 90) * (x1 - x0);
  const Y = v => y0 - v * (y0 - y1); // v = 0..1 relative bone mass
  // schematic curves (relative to male peak = 1)
  const male = [[0, 0.1], [10, 0.32], [14, 0.5], [18, 0.82], [25, 0.97], [30, 1], [40, 0.98], [50, 0.93], [60, 0.86], [70, 0.78], [80, 0.7], [90, 0.63]];
  const female = [[0, 0.1], [10, 0.32], [12, 0.45], [16, 0.68], [22, 0.8], [30, 0.82], [40, 0.8], [50, 0.75], [55, 0.65], [60, 0.59], [70, 0.52], [80, 0.46], [90, 0.41]];
  const path = pts => smooth(pts.map(([a, v]) => [X(a), Y(v)]), false, 0.8);
  let s = `<rect class="zone" x="${x0}" y="${Y(0.55)}" width="${x1 - x0}" height="${Y(0.35) - Y(0.55)}"/>`;
  s += `<text class="dg-note" x="${X(37)}" y="${Y(0.45) + 5}" text-anchor="middle">Higher fracture risk (osteoporosis range)</text>`;
  s += `<rect class="zone2" x="${X(45)}" y="${y1}" width="${X(56) - X(45)}" height="${y0 - y1}"/>`;
  s += `<text class="dg-note" x="${X(50.5)}" y="${y0 - 10}" text-anchor="middle">Menopause</text>`;
  // axes
  s += `<path class="axis" d="M${x0} ${y1} L${x0} ${y0} L${x1} ${y0}"/>`;
  for (let a = 0; a <= 90; a += 10) s += `<path class="axis" d="M${X(a)} ${y0} l0 5"/><text class="dg-tick" x="${X(a)}" y="${y0 + 20}" text-anchor="middle">${a}</text>`;
  s += `<text class="dg-tick" x="${(x0 + x1) / 2}" y="${y0 + 42}" text-anchor="middle">Age (years)</text>`;
  s += `<text class="dg-tick" transform="translate(24 ${(y0 + y1) / 2}) rotate(-90)" text-anchor="middle">Bone mass (relative)</text>`;
  s += `<path class="curve-m" d="${path(male)}"/><path class="curve-f" d="${path(female)}"/>`;
  s += `<text class="lbl-m" x="${X(82)}" y="${Y(0.72)}">Men</text><text class="lbl-f" x="${X(82)}" y="${Y(0.47) - 10}">Women</text>`;
  // annotations
  s += `<circle class="lbl-dot" cx="${X(30)}" cy="${Y(1)}" r="3.5"/><text class="dg-anno" x="${X(30)}" y="${Y(1) - 10}" text-anchor="middle">Peak bone mass (~25–30)</text>`;
  s += `<path class="ln-thin" d="M${X(10)} ${Y(0.3)} L${X(10)} ${Y(0.12)} M${X(16)} ${Y(0.68)} L${X(16)} ${Y(0.12)}"/><text class="dg-anno" x="${X(13)}" y="${Y(0.06)}" text-anchor="middle">Puberty: fastest gain</text>`;
  s += `<text class="dg-anno" x="${X(72)}" y="${Y(0.86)}" text-anchor="middle">Gradual loss from ~40</text>`;
  return s;
}

export const BONE_MASS = figure({
  title: 'Bone mass across the lifespan',
  viewBox: '0 0 760 350',
  minWidth: 560,
  body: boneMass(),
  caption: 'Schematic, not to scale. Bone mass climbs fastest around puberty, peaks around the late twenties, and declines slowly from about 40. Women lose bone faster for several years after menopause. A higher peak, and slowing the loss with resistance and impact training, keeps people further from the fracture-risk range for longer.',
});
