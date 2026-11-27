// Joint movement cards, grouped by plane. Each card: faded start position, solid end position, labelled arrows.
import { figure, note, smooth, band, seg, r } from './_svg.js';

const W = 270, H = 290;
const rad = d => d * Math.PI / 180;
const P = (x, y, ang, len) => [x + Math.cos(rad(ang)) * len, y + Math.sin(rad(ang)) * len];
const defs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="mk-acc" d="M0 0 L10 5 L0 10 z"/></marker><marker id="${id}2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path class="mk-2" d="M0 0 L10 5 L0 10 z"/></marker></defs>`;

let M = 'mv-a'; // current marker id (set per figure)
const limb = (x1, y1, x2, y2, w = 15) => band(seg(x1, y1, x2, y2), w, 'bn');
const ghost = (x1, y1, x2, y2, w = 15) => `<g opacity=".3">${limb(x1, y1, x2, y2, w)}</g>`;
const joint = (x, y) => `<circle class="axis-dot" cx="${r(x)}" cy="${r(y)}" r="5"/>`;
/** arc arrow around (x,y) from angle a0 to a1 (degrees, screen coords), text at the arrow end */
function arc(x, y, R, a0, a1, text, alt = false, tdx = 0, tdy = 0) {
  const [sx, sy] = P(x, y, a0, R), [ex, ey] = P(x, y, a1, R);
  const sweep = a1 > a0 ? 1 : 0, large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const [tx, ty] = P(x, y, a1, R + 16);
  const anchor = Math.cos(rad(a1)) > 0.3 ? 'start' : Math.cos(rad(a1)) < -0.3 ? 'end' : 'middle';
  return `<path class="${alt ? 'mv2' : 'mv'}" marker-end="url(#${M}${alt ? '2' : ''})" d="M${r(sx)} ${r(sy)} A${R} ${R} 0 ${large} ${sweep} ${r(ex)} ${r(ey)}"/>`;
}
const straight = (x1, y1, x2, y2, text, alt = false, anchor = 'middle', dx = 0, dy = -8) =>
  `<path class="${alt ? 'mv2' : 'mv'}" marker-end="url(#${M}${alt ? '2' : ''})" d="M${r(x1)} ${r(y1)} L${r(x2)} ${r(y2)}"/>`;
const head = (x, y, rr = 17) => `<circle class="bn" cx="${r(x)}" cy="${r(y)}" r="${rr}"/>`;
const torsoSide = (x, y) => `${head(x + 4, y - 74)}<path class="bn" d="${smooth([[x - 18, y - 52], [x + 20, y - 52], [x + 24, y + 20], [x + 18, y + 60], [x - 18, y + 60], [x - 22, y + 20]], true, 0.5)}"/>`;
const torsoFront = (x, y) => `${head(x, y - 76)}<path class="bn" d="${smooth([[x - 36, y - 54], [x + 36, y - 54], [x + 38, y + 10], [x + 30, y + 60], [x - 30, y + 60], [x - 38, y + 10]], true, 0.5)}"/>`;

function card(i, title, sub, draw, green, red, k = 0.68) {
  const x0 = (i % 3) * W, y0 = Math.floor(i / 3) * H, cx = x0 + W / 2, cy = y0 + 150;
  return `<g><rect class="card-bg" x="${x0 + 6}" y="${y0 + 6}" width="${W - 12}" height="${H - 12}" rx="12"/>
    ${note(cx, y0 + 30, title, 'dg-ex')}${note(cx, y0 + 48, sub, 'dg-small')}
    <g transform="translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})">${draw(cx, cy)}</g>
    ${green ? note(cx, y0 + H - 44, '● ' + green, 'mv-t') : ''}${red ? note(cx, y0 + H - 22, '● ' + red, 'mv2-t') : ''}</g>`;
}

/* ---------- Sagittal plane ---------- */
const sagittal = [
  ['Elbow: flexion / extension', 'side view', (x, y) => {
    const ex = x - 30, ey = y + 6;
    return `${limb(ex, ey - 82, ex, ey, 16)}${ghost(ex, ey, ...P(ex, ey, 90, 78))}${limb(ex, ey, ...P(ex, ey, -40, 78))}${joint(ex, ey)}
      ${arc(ex, ey, 56, 84, -34, 'Flexion')}${arc(ex, ey, 70, -46, 82, 'Extension', true, 6, 6)}`;
  }],
  ['Shoulder: flexion / extension', 'side view, facing right', (x, y) => {
    const sx = x - 6, sy = y - 40;
    return `${torsoSide(sx, sy + 52)}${ghost(sx, sy, ...P(sx, sy, 90, 86))}${limb(sx, sy, ...P(sx, sy, -60, 86))}<g opacity=".7">${limb(sx, sy, ...P(sx, sy, 135, 80))}</g>${joint(sx, sy)}
      ${arc(sx, sy, 100, 80, -54, 'Flexion')}${arc(sx, sy, 100, 100, 128, 'Extension', true)}`;
  }],
  ['Hip: flexion / extension', 'side view, facing right', (x, y) => {
    const hx = x - 10, hy = y - 22;
    return `${limb(hx, hy - 84, hx, hy, 34)}${head(hx + 2, hy - 104, 15)}${ghost(hx, hy, ...P(hx, hy, 90, 92), 18)}${limb(hx, hy, ...P(hx, hy, 15, 92), 18)}<g opacity=".7">${limb(hx, hy, ...P(hx, hy, 118, 88), 18)}</g>${joint(hx, hy)}
      ${arc(hx, hy, 70, 82, 22, 'Flexion')}${arc(hx, hy, 108, 98, 112, 'Extension', true, -4, 10)}`;
  }],
  ['Knee: flexion / extension', 'side view, facing right', (x, y) => {
    const kx = x + 10, ky = y + 4;
    return `${limb(kx, ky - 92, kx, ky, 20)}${ghost(kx, ky, ...P(kx, ky, 90, 86), 16)}${limb(kx, ky, ...P(kx, ky, 160, 86), 16)}${joint(kx, ky)}
      ${arc(kx, ky, 58, 96, 152, 'Flexion')}${arc(kx, ky, 72, 154, 96, 'Extension', true, 2, 8)}`;
  }],
  ['Ankle: dorsiflexion / plantarflexion', 'side view, toes to the right', (x, y) => {
    const ax = x - 34, ay = y + 20;
    const foot = ang => `${limb(ax, ay, ...P(ax, ay, ang, 66), 13)}`;
    return `${limb(ax, ay - 100, ax, ay, 18)}<g opacity=".3">${foot(0)}</g>${foot(-24)}<g opacity=".7">${foot(42)}</g>${joint(ax, ay)}
      ${arc(ax, ay, 84, -4, -26, 'Dorsiflexion', false, 0, -6)}${arc(ax, ay, 84, 6, 42, 'Plantarflexion', true)}`;
  }],
  ['Spine: flexion / extension', 'side view, facing right', (x, y) => {
    const px = x - 10, py = y + 40;
    const trunk = ang => { const [tx, ty] = P(px, py, ang, 96); return `${limb(px, py, tx, ty, 30)}${head(...P(px, py, ang, 120), 15)}`; };
    return `${limb(px - 4, py, px - 6, py + 58, 18)}<g opacity=".3">${trunk(-90)}</g>${trunk(-38)}<g opacity=".7">${trunk(-112)}</g>${joint(px, py)}
      ${arc(px, py, 146, -84, -44, 'Flexion')}${arc(px, py, 146, -96, -114, 'Extension', true)}`;
  }],
];

/* ---------- Frontal plane ---------- */
const frontal = [
  ['Shoulder: abduction / adduction', 'front view', (x, y) => {
    const sx = x + 22, sy = y - 44;
    return `${torsoFront(x - 18, sy + 54)}${limb(x - 54, sy + 2, x - 60, sy + 86)}${ghost(sx, sy, ...P(sx, sy, 86, 86))}${limb(sx, sy, ...P(sx, sy, -20, 86))}${joint(sx, sy)}
      ${arc(sx, sy, 100, 74, -14, 'Abduction')}${arc(sx, sy, 72, -10, 74, 'Adduction', true, 0, 10)}`;
  }],
  ['Hip: abduction / adduction', 'front view', (x, y) => {
    const hx = x + 14, hy = y - 30;
    return `<path class="bn" d="${smooth([[x - 46, hy - 70], [x + 30, hy - 70], [x + 32, hy + 4], [x - 48, hy + 4]], true, 0.4)}"/>${limb(x - 30, hy, x - 32, hy + 100, 18)}${ghost(hx, hy, ...P(hx, hy, 90, 100), 18)}${limb(hx, hy, ...P(hx, hy, 50, 100), 18)}${joint(hx, hy)}
      ${arc(hx, hy, 92, 84, 44, 'Abduction')}${arc(hx, hy, 66, 46, 86, 'Adduction', true, 0, 10)}`;
  }],
  ['Spine: lateral flexion', 'front view', (x, y) => {
    const px = x, py = y + 42;
    const trunk = ang => { const [tx, ty] = P(px, py, ang, 92); return `${limb(px, py, tx, ty, 40)}${head(...P(px, py, ang, 118), 16)}`; };
    return `${limb(px - 14, py, px - 16, py + 56, 16)}${limb(px + 14, py, px + 16, py + 56, 16)}<g opacity=".3">${trunk(-90)}</g>${trunk(-58)}${joint(px, py)}
      ${arc(px, py, 140, -86, -62, 'Lateral flexion (side bend)')}`;
  }],
  ['Shoulder girdle: elevation / depression', 'front view: a shrug', (x, y) => {
    const arms = dy => `${limb(x - 44, y - 40 + dy, x - 50, y + 60 + dy, 15)}${limb(x + 44, y - 40 + dy, x + 50, y + 60 + dy, 15)}<path class="ln" stroke-width="6" stroke-linecap="round" d="M${x - 10} ${y - 44 + dy} L${x - 46} ${y - 40 + dy} M${x + 10} ${y - 44 + dy} L${x + 46} ${y - 40 + dy}"/>`;
    return `${head(x, y - 88)}<path class="bn" d="${smooth([[x - 36, y - 46], [x + 36, y - 46], [x + 38, y + 20], [x + 30, y + 80], [x - 30, y + 80], [x - 38, y + 20]], true, 0.5)}"/>
      <g opacity=".3">${arms(0)}</g>${arms(-22)}
      ${straight(x + 82, y - 34, x + 82, y - 78, '')}${straight(x - 82, y - 78, x - 82, y - 34, '', true)}`;
  }],
  ['Ankle: inversion / eversion', 'back view, right ankle (medial on left)', (x, y) => {
    const ax = x, ay = y;
    const sole = (ang, op) => `<g transform="rotate(${ang} ${ax} ${ay})" opacity="${op}"><rect class="bn" x="${ax - 40}" y="${ay + 8}" width="80" height="20" rx="6"/></g>`;
    return `${limb(ax, ay - 100, ax, ay, 22)}${sole(0, 0.3)}${sole(-16, 0.55)}${sole(22, 1)}${joint(ax, ay)}
      ${arc(ax, ay, 66, 130, 160, '')}${arc(ax, ay, 66, 50, 24, '', true)}
      <path class="ln" stroke-dasharray="4 4" d="M${ax - 90} ${ay + 60} L${ax + 90} ${ay + 60}"/>`;
  }],
  ['Wrist: radial / ulnar deviation', 'right hand, palm forward', (x, y) => {
    const wx = x, wy = y - 30;
    const hand = (ang, op) => `<g transform="rotate(${ang} ${wx} ${wy})" opacity="${op}"><rect class="bn" x="${wx - 20}" y="${wy + 6}" width="40" height="52" rx="10"/>${[-14, -5, 4, 13].map(dx => limb(wx + dx, wy + 58, wx + dx, wy + 86, 8)).join('')}${limb(wx - 22, wy + 16, wx - 36, wy + 46, 9)}</g>`;
    return `${limb(wx, wy - 86, wx, wy, 24)}${hand(0, 0.3)}${hand(-26, 0.6)}${hand(20, 1)}${joint(wx, wy)}
      ${arc(wx, wy, 104, 94, 112, '')}${arc(wx, wy, 104, 86, 62, '', true)}`;
  }],
];

/* ---------- Transverse plane ---------- */
const topTorso = (x, y, ang = 0) => `<g transform="rotate(${ang} ${x} ${y})"><ellipse class="bn" cx="${x}" cy="${y}" rx="62" ry="22"/></g>${head(x, y, 15)}<path class="bn" d="M${x - 5} ${y + 13} L${x} ${y + 21} L${x + 5} ${y + 13} Z"/>`;
const transverse = [
  ['Shoulder: medial / lateral rotation', 'from above, elbow bent at 90°', (x, y) => {
    const ex = x + 56, ey = y - 14;
    return `${topTorso(x - 20, y - 20)}${ghost(ex, ey, ...P(ex, ey, 90, 70), 13)}${limb(ex, ey, ...P(ex, ey, 20, 70), 13)}<g opacity=".7">${limb(ex, ey, ...P(ex, ey, 150, 70), 13)}</g>${joint(ex, ey)}
      ${arc(ex, ey, 84, 84, 26, 'Lateral (outward)', false, 0, 6)}${arc(ex, ey, 84, 96, 146, 'Medial (inward)', true, 0, 12)}`;
  }],
  ['Shoulder: horizontal abduction / adduction', 'from above', (x, y) => {
    const sx = x - 4, sy = y - 26;
    return `${topTorso(x - 60, y - 26)}${ghost(sx, sy, ...P(sx, sy, 0, 96), 13)}${limb(sx, sy, ...P(sx, sy, 80, 96), 13)}<g opacity=".7">${limb(sx, sy, ...P(sx, sy, -26, 90), 13)}</g>${joint(sx, sy)}
      ${arc(sx, sy, 104, 8, 74, 'Horizontal adduction', false, 0, 8)}${arc(sx, sy, 76, -4, -22, 'Horizontal abduction', true, 0, -6)}`;
  }],
  ['Forearm: pronation / supination', 'elbow bent, viewed from the front', (x, y) => {
    const hand = (cx, cy, palm) => `<path class="${palm ? 'palm' : 'bn'}" d="${smooth([[cx - 24, cy - 16], [cx + 22, cy - 18], [cx + 26, cy + 4], [cx + 18, cy + 18], [cx - 22, cy + 16]], true, 0.6)}"/>${limb(cx + (palm ? -18 : 18), cy - 16, cx + (palm ? -30 : 30), cy - 34, 9)}`;
    return `${limb(x - 110, y - 30, x - 54, y - 30, 18)}${hand(x - 30, y - 30, true)}
      ${limb(x - 110, y + 50, x - 54, y + 50, 18)}<g transform="rotate(180 ${x - 30} ${y + 50})">${hand(x - 30, y + 50, false)}</g>
      <ellipse class="mv" cx="${x + 70}" cy="${y + 10}" rx="16" ry="44"/><path class="mv" marker-end="url(#${M})" d="M${x + 86} ${y + 4} L${x + 86} ${y + 16}"/>`;
  }],
  ['Spine: rotation', 'from above', (x, y) => `
      <g opacity=".3"><ellipse class="bn" cx="${x}" cy="${y}" rx="62" ry="22"/></g>${topTorso(x, y, -32)}
      ${arc(x, y, 80, -150, -120, 'Rotation', false, 0, -4)}${arc(x, y, 80, 30, 60, '', false)}`],
  ['Scapula: protraction / retraction', 'from above, chest at the bottom', (x, y) => `
      <ellipse class="bn" cx="${x}" cy="${y + 6}" rx="78" ry="52"/><circle class="hole" cx="${x}" cy="${y - 40}" r="7"/>
      ${[-1, 1].map(s => `<g opacity=".3">${limb(x + s * 26, y - 48, x + s * 58, y - 38, 9)}</g>${limb(x + s * 56, y - 36, x + s * 80, y - 8, 9)}`).join('')}
      ${arc(x, y + 6, 96, -64, -26, 'Protraction (forward)', false, 0, -2)}${arc(x, y + 6, 96, -148, -116, 'Retraction (back)', true, 0, -4)}`],
  ['Circumduction', 'multi-planar: shoulder, hip, wrist', (x, y) => {
    const sx = x - 24, sy = y - 60;
    return `${torsoFront(x - 70, sy + 54)}${limb(sx, sy, x + 50, y + 34, 15)}${joint(sx, sy)}
      <ellipse class="mv" cx="${x + 50}" cy="${y + 34}" rx="38" ry="18" stroke-dasharray="6 4"/><path class="mv" marker-end="url(#${M})" d="M${x + 88} ${y + 30} L${x + 87} ${y + 40}"/>
      <path class="ln-thin" stroke-dasharray="3 3" d="M${sx} ${sy} L${x + 12} ${y + 34} M${sx} ${sy} L${x + 88} ${y + 34}"/>`;
  }],
];

const LABELS = {"Elbow: flexion / extension": ["Flexion", "Extension"], "Shoulder: flexion / extension": ["Flexion (forward and up)", "Extension (backwards)"], "Hip: flexion / extension": ["Flexion (thigh forwards)", "Extension (thigh backwards)"], "Knee: flexion / extension": ["Flexion (heel to bottom)", "Extension (straighten)"], "Ankle: dorsiflexion / plantarflexion": ["Dorsiflexion (toes up)", "Plantarflexion (point toes)"], "Spine: flexion / extension": ["Flexion (bend forwards)", "Extension (bend back)"], "Shoulder: abduction / adduction": ["Abduction (away from body)", "Adduction (towards body)"], "Hip: abduction / adduction": ["Abduction (away from body)", "Adduction (towards body)"], "Spine: lateral flexion": ["Lateral flexion (side bend)", ""], "Shoulder girdle: elevation / depression": ["Elevation (shrug up)", "Depression (pull down)"], "Ankle: inversion / eversion": ["Inversion (sole faces in)", "Eversion (sole faces out)"], "Wrist: radial / ulnar deviation": ["Radial deviation (thumb side)", "Ulnar deviation (little-finger side)"], "Shoulder: medial / lateral rotation": ["Lateral rotation (outwards)", "Medial rotation (inwards)"], "Shoulder: horizontal abduction / adduction": ["Horizontal adduction (flexion)", "Horizontal abduction (extension)"], "Forearm: pronation / supination": ["Pronation: palm down (lower)", "Supination: palm up (upper)"], "Spine: rotation": ["Rotation (to either side)", ""], "Scapula: protraction / retraction": ["Protraction (forwards)", "Retraction (squeeze back)"], "Circumduction": ["Limb traces a cone", ""]};
function build(cards, id) { M = id; return defs(id) + cards.map(([t, p, d], i) => card(i, t, p, d, ...LABELS[t])).join(''); }

export const MOVES_SAGITTAL = figure({
  title: 'Sagittal-plane movements', viewBox: `0 0 ${3 * W} ${2 * H}`, minWidth: 620,
  body: build(sagittal, 'mvs'),
  caption: 'Faded = starting position; solid = end position. Flexion decreases the angle at a joint, extension increases it. At the ankle these are called dorsiflexion (toes up) and plantarflexion (point the toes).',
});
export const MOVES_FRONTAL = figure({
  title: 'Frontal-plane movements', viewBox: `0 0 ${3 * W} ${2 * H}`, minWidth: 620,
  body: build(frontal, 'mvf'),
  caption: 'Abduction moves a limb away from the midline, adduction towards it. The spine bends sideways (lateral flexion); the shoulder girdle lifts and lowers (elevation and depression); the foot tilts its sole inwards (inversion) or outwards (eversion).',
});
export const MOVES_TRANSVERSE = figure({
  title: 'Transverse-plane and multi-planar movements', viewBox: `0 0 ${3 * W} ${2 * H}`, minWidth: 620,
  body: build(transverse, 'mvt'),
  caption: 'Rotation happens around the long axis of a bone or the spine. Pronation and supination turn the palm down and up as the radius rolls over the ulna. Protraction and retraction slide the shoulder blades around the rib cage. Circumduction combines several planes so the limb traces a cone.',
});
