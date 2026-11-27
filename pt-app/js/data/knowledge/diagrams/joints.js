// Joint diagrams: synovial joint structure, six synovial joint types, planes of movement, knee.
import { figure, label, note, key, smooth, poly, band, seg, r } from './_svg.js';

const sm = (pts, t = 0.6) => smooth(pts, true, t);
const arrowDefs = id => `<defs><marker id="${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>`;

/* ---------------- Synovial joint (section) ---------------- */

function synovial() {
  const c = 300;
  const upper = `M${c - 50} 20 L${c - 50} 110 Q${c - 104} 140 ${c - 104} 176 Q${c - 96} 206 ${c} 212 Q${c + 96} 206 ${c + 104} 176 Q${c + 104} 140 ${c + 50} 110 L${c + 50} 20 Z`;
  const lower = `M${c - 50} 440 L${c - 50} 340 Q${c - 104} 310 ${c - 106} 262 Q${c - 96} 236 ${c - 60} 238 Q${c} 252 ${c + 60} 238 Q${c + 96} 236 ${c + 106} 262 Q${c + 104} 310 ${c + 50} 340 L${c + 50} 440 Z`;
  const cartTop = `M${c - 100} 184 Q${c - 90} 206 ${c} 210 Q${c + 90} 206 ${c + 100} 184`;
  const cartBot = `M${c - 102} 252 Q${c - 92} 238 ${c - 60} 240 Q${c} 254 ${c + 60} 240 Q${c + 92} 238 ${c + 102} 252`;
  const cavity = `M${c - 104} 176 Q${c - 140} 222 ${c - 106} 262 L${c + 106} 262 Q${c + 140} 222 ${c + 104} 176 Z`;
  const capsule = s => `M${c + s * 96} 132 Q${c + s * 158} 222 ${c + s * 96} 312`;
  const membrane = s => `M${c + s * 98} 142 Q${c + s * 140} 222 ${c + s * 98} 302`;
  const lig = `M${c + 112} 120 Q${c + 176} 222 ${c + 112} 324`;
  const meniscus = s => poly([[c + s * 118, 224], [c + s * 86, 214], [c + s * 86, 236]]);
  const L = 150, R = 470;
  const labels = [
    label(c, 60, L, 60, 'Bone'),
    label(c - 30, 160, L, 116, 'Spongy bone\n(red marrow)'),
    label(c - 119, 177, L, 166, 'Joint (fibrous) capsule'),
    label(c - 96, 190, L, 214, 'Articular (hyaline)\ncartilage'),
    label(c - 104, 224, L, 264, 'Meniscus / articular\ndisc (some joints)'),
    label(c - 116, 254, L, 314, 'Synovial membrane'),
    label(c + 20, 226, R, 222, 'Joint cavity with\nsynovial fluid'),
    label(c + 162, 200, R, 150, 'Ligament'),
    label(c + 132, 76, R, 70, 'Tendon'),
    label(c + 154, 112, R, 108, 'Bursa'),
  ].join('');
  return `
  <path class="bn" d="${upper}"/><path class="bn" d="${lower}"/>
  <path fill="var(--dg-sp)" opacity=".7" d="M${c - 44} 120 Q${c - 96} 146 ${c - 96} 176 L${c + 96} 176 Q${c + 96} 146 ${c + 44} 120 Z"/>
  <path class="fluid" d="${cavity}"/>
  ${band(cartTop, 10, 'cart')}${band(cartBot, 10, 'cart')}
  <path class="cart" d="${meniscus(-1)}"/><path class="cart" d="${meniscus(1)}"/>
  ${[-1, 1].map(s => `<path class="membrane" d="${membrane(s)}"/><path class="capsule" d="${capsule(s)}"/>`).join('')}
  ${band(lig, 9, 'my')}
  ${band(`M${c + 72} 20 Q${c + 150} 60 ${c + 150} 120`, 10, 'my')}
  <ellipse class="bursa" cx="${c + 142}" cy="112" rx="13" ry="20"/>
  ${labels}`;
}

export const SYNOVIAL_JOINT = figure({
  title: 'Structure of a synovial joint',
  viewBox: '0 0 760 450',
  minWidth: 560,
  body: synovial(),
  caption: 'Bone ends are capped with smooth hyaline cartilage. A fibrous capsule encloses the joint; its inner synovial membrane makes synovial fluid, which lubricates the joint and feeds the cartilage. Ligaments (inside or outside the capsule) stabilise it. Some joints have extra structures: menisci or discs (knee), bursae where tendons rub over bone.',
});

/* ---------------- Six types of synovial joint ---------------- */

function types() {
  const W = 250, H = 250;
  const cell = (i, draw, title, axes, ex) => {
    const x0 = (i % 3) * W, y0 = Math.floor(i / 3) * H, cx = x0 + W / 2, cy = y0 + 112;
    return `${note(cx, y0 + 26, title, 'dg-head')}${draw(cx, cy)}
      <text class="dg-ex" x="${cx}" y="${y0 + 206}" text-anchor="middle">${axes}</text>
      <text class="dg-note" x="${cx}" y="${y0 + 228}" text-anchor="middle">${ex}</text>`;
  };
  const arc = (cx, cy, rx, ry, a0, a1) => {
    const p = a => [cx + rx * Math.cos(a), cy + ry * Math.sin(a)];
    const [x0, y0] = p(a0), [x1, y1] = p(a1);
    return `<path class="mv" marker-start="url(#jt-ar)" marker-end="url(#jt-ar)" d="M${r(x0)} ${r(y0)} A${rx} ${ry} 0 0 1 ${r(x1)} ${r(y1)}"/>`;
  };
  const hinge = (cx, cy) => `
    <path class="hl2" d="M${cx - 60} ${cy + 70} L${cx - 60} ${cy + 10} L${cx - 30} ${cy + 10} A30 30 0 0 0 ${cx + 30} ${cy + 10} L${cx + 60} ${cy + 10} L${cx + 60} ${cy + 70} Z"/>
    <circle class="hl1" cx="${cx}" cy="${cy + 10}" r="26"/><path class="hl1" d="M${cx - 16} ${cy - 10} L${cx - 16} ${cy - 70} L${cx + 16} ${cy - 70} L${cx + 16} ${cy - 10} Z"/><circle class="hl1" cx="${cx}" cy="${cy + 10}" r="26" stroke="none"/>
    ${arc(cx, cy + 10, 74, 74, -2.55, -0.6)}`;
  const pivot = (cx, cy) => `
    <path class="hl1" d="M${cx - 14} ${cy - 70} L${cx + 14} ${cy - 70} L${cx + 14} ${cy + 50} L${cx - 14} ${cy + 50} Z"/>
    <ellipse class="hl2" cx="${cx}" cy="${cy + 10}" rx="44" ry="16"/><ellipse class="hl1" cx="${cx}" cy="${cy + 10}" rx="14" ry="6"/>
    <path class="hl2" d="M${cx - 44} ${cy + 10} L${cx - 44} ${cy + 26} A44 16 0 0 0 ${cx + 44} ${cy + 26} L${cx + 44} ${cy + 10} A44 16 0 0 1 ${cx - 44} ${cy + 10} Z"/>
    ${arc(cx, cy - 40, 40, 13, 0.3, 2.85)}`;
  const ball = (cx, cy) => `
    <path class="hl2" d="M${cx - 56} ${cy + 66} L${cx - 56} ${cy + 22} A44 44 0 0 0 ${cx + 56} ${cy + 22} L${cx + 56} ${cy + 66} Z"/>
    <path class="hl2" d="M${cx - 56} ${cy + 22} L${cx - 44} ${cy + 22} A44 44 0 0 0 ${cx + 44} ${cy + 22} L${cx + 56} ${cy + 22}"/>
    <path class="hl1" d="M${cx - 12} ${cy - 10} L${cx - 22} ${cy - 72} L${cx + 6} ${cy - 76} L${cx + 12} ${cy - 10} Z"/><circle class="hl1" cx="${cx}" cy="${cy + 18}" r="34"/>
    ${arc(cx, cy + 18, 78, 78, -2.75, -2.05)}${arc(cx, cy + 18, 78, 78, -1.1, -0.4)}${arc(cx, cy - 64, 40, 12, 0.3, 2.85)}`;
  const condyloid = (cx, cy) => `
    <path class="hl2" d="M${cx - 66} ${cy + 66} L${cx - 66} ${cy + 18} Q${cx} ${cy + 64} ${cx + 66} ${cy + 18} L${cx + 66} ${cy + 66} Z"/>
    <path class="hl1" d="M${cx - 60} ${cy + 16} Q${cx} ${cy + 58} ${cx + 60} ${cy + 16} L${cx + 26} ${cy - 20} L${cx + 26} ${cy - 72} L${cx - 26} ${cy - 72} L${cx - 26} ${cy - 20} Z"/>
    ${arc(cx, cy + 20, 84, 84, -2.75, -2.0)}${arc(cx, cy + 20, 84, 84, -1.15, -0.4)}`;
  const saddle = (cx, cy) => `
    <path class="hl2" d="M${cx - 60} ${cy + 66} L${cx - 60} ${cy + 6} Q${cx} ${cy + 46} ${cx + 60} ${cy + 6} L${cx + 60} ${cy + 66} Z"/>
    <path class="hl2" d="M${cx - 60} ${cy + 6} Q${cx} ${cy + 46} ${cx + 60} ${cy + 6} L${cx + 40} ${cy - 6} Q${cx} ${cy + 26} ${cx - 40} ${cy - 6} Z" opacity=".7"/>
    <path class="hl1" d="M${cx - 34} ${cy + 18} Q${cx} ${cy - 6} ${cx + 34} ${cy + 18} L${cx + 26} ${cy - 66} L${cx - 26} ${cy - 66} Z"/>
    ${arc(cx, cy + 14, 84, 84, -2.75, -2.0)}${arc(cx, cy + 14, 84, 84, -1.15, -0.4)}`;
  const plane = (cx, cy) => `
    <path class="hl2" d="M${cx - 70} ${cy + 66} L${cx - 70} ${cy + 20} L${cx + 70} ${cy + 20} L${cx + 70} ${cy + 66} Z"/>
    <path class="hl1" d="M${cx - 50} ${cy + 18} L${cx - 50} ${cy - 30} L${cx + 50} ${cy - 30} L${cx + 50} ${cy + 18} Z"/>
    <path class="mv" marker-start="url(#jt-ar)" marker-end="url(#jt-ar)" d="M${cx - 64} ${cy - 50} L${cx + 64} ${cy - 50}"/>`;
  return arrowDefs('jt-ar') + [
    cell(0, hinge, 'Hinge', 'Uniaxial: flexion / extension', 'Elbow, knee, ankle, fingers'),
    cell(1, pivot, 'Pivot', 'Uniaxial: rotation', 'Atlas–axis (C1–C2), radio-ulnar'),
    cell(2, ball, 'Ball and socket', 'Multiaxial: all movements', 'Shoulder, hip'),
    cell(3, condyloid, 'Condyloid (ellipsoid)', 'Biaxial: no rotation', 'Wrist, knuckles (MCP)'),
    cell(4, saddle, 'Saddle', 'Biaxial (+ opposition)', 'Thumb (carpometacarpal)'),
    cell(5, plane, 'Gliding (plane)', 'Sliding movements', 'Intercarpal, AC joint, spinal facets'),
  ].join('');
}

export const JOINT_TYPES = figure({
  title: 'The six types of synovial joint',
  viewBox: '0 0 750 500',
  minWidth: 560,
  body: types(),
  caption: 'The shape of the joint surfaces sets which movements are possible (arrows). Hinge and pivot joints move in one plane; condyloid and saddle joints in two; ball-and-socket joints in all three. Plane joints only glide.',
});

/* ---------------- Planes of movement ---------------- */

function planes() {
  const cx = 300;
  // simple human figure, anterior view
  const fig = `
    <circle class="bn" cx="${cx}" cy="70" r="28"/>
    <path class="bn" d="${sm([[cx - 50, 112], [cx + 50, 112], [cx + 58, 160], [cx + 44, 250], [cx + 46, 280], [cx - 46, 280], [cx - 44, 250], [cx - 58, 160]], 0.5)}"/>
    <path class="bn" d="${sm([[cx + 52, 116], [cx + 76, 130], [cx + 92, 220], [cx + 100, 300], [cx + 86, 302], [cx + 72, 226], [cx + 58, 160]], 0.5)}"/>
    <path class="bn" d="${sm([[cx - 52, 116], [cx - 76, 130], [cx - 92, 220], [cx - 100, 300], [cx - 86, 302], [cx - 72, 226], [cx - 58, 160]], 0.5)}"/>
    <path class="bn" d="${sm([[cx - 46, 276], [cx - 4, 280], [cx - 10, 400], [cx - 14, 470], [cx - 38, 472], [cx - 40, 400], [cx - 48, 320]], 0.5)}"/>
    <path class="bn" d="${sm([[cx + 46, 276], [cx + 4, 280], [cx + 10, 400], [cx + 14, 470], [cx + 38, 472], [cx + 40, 400], [cx + 48, 320]], 0.5)}"/>`;
  // planes drawn in oblique projection (depth goes up-right)
  const dx = 50, dy = -30;
  const sag = `<path class="pl-s" d="${poly([[cx - dx * 0.6, 30 - dy * 0.6], [cx + dx * 0.8, 30 + dy * 0.8], [cx + dx * 0.8, 490 + dy * 0.8], [cx - dx * 0.6, 490 - dy * 0.6]])}"/>`;
  const fro = `<path class="pl-f" d="${poly([[cx - 140, 24], [cx + 140, 24], [cx + 140, 486], [cx - 140, 486]])}"/>`;
  const tra = `<path class="pl-t" d="${poly([[cx - 150 - dx * 0.6, 200 - dy * 0.6], [cx + 150 - dx * 0.6, 200 - dy * 0.6], [cx + 150 + dx * 0.8, 200 + dy * 0.8], [cx - 150 + dx * 0.8, 200 + dy * 0.8]])}"/>`;
  const rows = [
    ['pl-s', 'Sagittal plane', 'Divides left and right · frontal axis', 'Flexion and extension', 'Squat, curl, running'],
    ['pl-f', 'Frontal (coronal) plane', 'Divides front and back · sagittal axis', 'Abduction, adduction, lateral flexion', 'Lateral raise, side lunge, star jump'],
    ['pl-t', 'Transverse plane', 'Divides top and bottom · longitudinal axis', 'Rotation, horizontal ab/adduction', 'Woodchop, golf swing, cable fly'],
  ];
  const legend = rows.map(([cls, t, d, m, e], i) => {
    const y = 70 + i * 140;
    return `<rect class="${cls}" x="500" y="${y - 14}" width="22" height="22" rx="4"/>
      <text class="dg-head" x="532" y="${y + 3}">${t}</text>
      <text x="532" y="${y + 28}">${d}</text>
      <text x="532" y="${y + 50}">${m}</text>
      <text class="dg-note" x="532" y="${y + 72}">e.g. ${e}</text>`;
  }).join('');
  // axes: each runs at right angles to its plane
  const axes = `${arrowDefs('pl-ar')}
    <path class="mv-ax" marker-start="url(#pl-ar)" marker-end="url(#pl-ar)" d="M${cx} 6 L${cx} 496"/>
    <path class="mv-ax" marker-start="url(#pl-ar)" marker-end="url(#pl-ar)" d="M${cx - 180} 300 L${cx + 180} 300"/>
    <path class="mv-ax" marker-start="url(#pl-ar)" marker-end="url(#pl-ar)" d="M${cx - 70} 392 L${cx + 70} 308"/>
    <text class="dg-anno" x="${cx + 8}" y="20">Longitudinal axis</text>
    <text class="dg-anno" x="${cx - 178}" y="292">Frontal axis</text>
    <text class="dg-anno" x="${cx - 76}" y="414" text-anchor="end">Sagittal axis</text>`;
  return `${fro}${fig}${sag}${tra}${axes}${legend}`;
}

export const PLANES = figure({
  title: 'The three planes of movement',
  viewBox: '0 0 880 500',
  minWidth: 620,
  body: planes(),
  caption: 'Each plane slices the body in a different direction, and movement happens parallel to it, rotating around the axis that runs at right angles through it (dashed lines): sagittal plane around the frontal axis, frontal plane around the sagittal axis, transverse plane around the longitudinal axis. Most gym exercises are sagittal; including frontal and transverse work builds strength for real-life, multidirectional movement.',
});

/* ---------------- Knee (anterior view, flexed, patella removed) + tibial plateau ---------------- */

function knee() {
  // Right knee, anterior view: lateral (fibula) on the viewer's left, medial on the right.
  const c = 260;
  const femur = sm([[c - 40, 20], [c + 40, 20], [c + 50, 120], [c + 92, 170], [c + 100, 206], [c + 84, 238], [c + 52, 244], [c + 24, 222], [c, 208], [c - 24, 222], [c - 52, 244], [c - 84, 238], [c - 100, 206], [c - 92, 170], [c - 50, 120]], 0.5);
  const notch = `<path class="hole" d="M${c - 26} 226 Q${c - 24} 182 ${c} 176 Q${c + 24} 182 ${c + 26} 226 Q${c} 210 ${c - 26} 226 Z"/>`;
  const tibia = sm([[c - 104, 270], [c - 30, 262], [c, 268], [c + 30, 262], [c + 106, 270], [c + 100, 300], [c + 60, 330], [c + 42, 440], [c - 42, 440], [c - 60, 330], [c - 100, 300]], 0.5);
  const fibula = sm([[c - 122, 300], [c - 98, 292], [c - 92, 312], [c - 100, 330], [c - 102, 440], [c - 118, 440], [c - 116, 330], [c - 126, 316]], 0.6);
  const menM = `M${c + 22} 256 Q${c + 70} 246 ${c + 104} 262 L${c + 100} 270 Q${c + 66} 258 ${c + 26} 266 Z`;
  const menL = `M${c - 22} 256 Q${c - 70} 246 ${c - 102} 262 L${c - 98} 270 Q${c - 66} 258 ${c - 26} 266 Z`;
  const acl = `M${c + 8} 264 Q${c - 6} 232 ${c - 22} 200`;  // front of tibia → lateral condyle (in front)
  const pcl = `M${c - 8} 272 Q${c + 6} 232 ${c + 20} 196`;  // back of tibia → medial condyle (behind)
  const mcl = `M${c + 98} 200 Q${c + 112} 256 ${c + 92} 330`;
  const lcl = `M${c - 98} 200 Q${c - 116} 250 ${c - 112} 298`;
  // tibial plateau from above (inset): anterior at the bottom
  const px = 660, py = 230;
  const plateau = sm([[px - 120, py - 10], [px - 90, py - 56], [px - 20, py - 64], [px, py - 50], [px + 20, py - 64], [px + 90, py - 56], [px + 120, py - 10], [px + 100, py + 40], [px + 20, py + 56], [px - 20, py + 56], [px - 100, py + 40]], 0.6);
  const medC = `M${px + 20} ${py - 46} Q${px + 100} ${py - 50} ${px + 100} ${py} Q${px + 96} ${py + 40} ${px + 26} ${py + 40} L${px + 30} ${py + 26} Q${px + 82} ${py + 26} ${px + 84} ${py} Q${px + 82} ${py - 32} ${px + 26} ${py - 32} Z`;
  const latO = `M${px - 24} ${py - 30} Q${px - 92} ${py - 46} ${px - 96} ${py - 2} Q${px - 92} ${py + 38} ${px - 34} ${py + 34} Q${px - 14} ${py + 20} ${px - 22} ${py + 6} L${px - 36} ${py + 18} Q${px - 78} ${py + 22} ${px - 80} ${py - 2} Q${px - 78} ${py - 28} ${px - 30} ${py - 18} Z`;
  const L = 120, R = 400;
  const labels = [
    label(c - 60, 80, L, 60, 'Femur'),
    label(c - 92, 200, L, 150, 'Lateral condyle'),
    label(c - 110, 250, L, 200, 'Lateral collateral\nligament (LCL)'),
    label(c - 70, 256, L, 256, 'Lateral meniscus'),
    label(c - 112, 360, L, 320, 'Fibula'),
    label(c - 40, 400, L, 400, 'Tibia'),
    label(c - 4, 236, R - 60, 66, 'Anterior cruciate\nligament (ACL)', { anchor: 'start' }),
    label(c + 14, 212, R - 60, 120, 'Posterior cruciate\nligament (PCL)', { anchor: 'start' }),
    label(c + 96, 196, R - 60, 170, 'Medial condyle', { anchor: 'start' }),
    label(c + 66, 254, R - 60, 300, 'Medial meniscus', { anchor: 'start' }),
    label(c + 108, 270, R - 60, 350, 'Medial collateral\nligament (MCL)', { anchor: 'start' }),
    label(px + 96, py - 14, px + 20, py - 150, 'Medial meniscus (C-shaped)', { anchor: 'start' }),
    label(px - 86, py - 18, px - 120, py - 118, 'Lateral meniscus (O-shaped)', { anchor: 'start' }),
    label(px - 2, py + 30, px - 40, py + 110, 'ACL attachment', { anchor: 'end' }),
    label(px + 2, py - 46, px + 40, py + 110, 'PCL attachment', { anchor: 'start' }),
  ].join('');
  return `
  ${note(c, 470, 'A. Right knee, front view (flexed, patella removed)', 'dg-head')}
  ${note(px, 470, 'B. Top of the tibia (menisci)', 'dg-head')}
  ${note(px, py + 80, '▼ anterior', 'dg-note')}
  <path class="hl5" d="${fibula}"/><path class="hl2" d="${tibia}"/><path class="hl1" d="${femur}"/>${notch}
  <path class="cart" d="${menM}"/><path class="cart" d="${menL}"/>
  ${band(pcl, 9, 'h3')}${band(acl, 9, 'h4')}${band(mcl, 9, 'my')}${band(lcl, 7, 'my')}
  <path class="hl2" d="${plateau}"/>
  ${band(`M${px - 30} ${py - 12} A34 34 0 1 0 ${px - 30} ${py + 12}`, 14, 'cart')}
  ${band(`M${px + 26} ${py - 34} A50 42 0 1 1 ${px + 26} ${py + 34}`, 14, 'cart')}
  <ellipse class="hl4" cx="${px - 4}" cy="${py + 28}" rx="10" ry="7"/><ellipse class="hl3" cx="${px + 4}" cy="${py - 46}" rx="10" ry="7"/>
  ${labels}`;
}

export const KNEE = figure({
  title: 'Ligaments and menisci of the knee',
  viewBox: '0 0 900 490',
  minWidth: 620,
  body: knee(),
  caption: 'A. The cruciate ligaments cross inside the joint: the ACL stops the tibia sliding forward, the PCL stops it sliding back. The collateral ligaments resist sideways forces: MCL on the inside, LCL (to the fibula) on the outside. B. The C-shaped medial meniscus is attached to the MCL, so it is less mobile and more often torn than the rounder lateral meniscus.',
});

/* ---------------- Planes and axes, one panel each ---------------- */

function planeAxes() {
  const W = 290;
  const dot = (x, y) => `<circle class="axis-dot" cx="${x}" cy="${y}" r="9"/><circle cx="${x}" cy="${y}" r="3" fill="currentColor"/>`;
  const mv = d => `<path class="mv" marker-end="url(#pa-ar)" d="${d}"/>`;
  const limb = (x1, y1, x2, y2, w = 16, cls = 'bn') => band(seg(x1, y1, x2, y2), w, cls === 'bn' ? 'bn' : cls);
  const ghost = (x1, y1, x2, y2, w = 16) => `<g opacity=".35">${limb(x1, y1, x2, y2, w)}</g>`;
  // A: sagittal plane, side view facing right; front raise around the frontal axis at the shoulder
  const A = (x0) => {
    const sx = x0 + 130, sy = 130;
    return `<rect class="pl-s" x="${x0 + 10}" y="40" width="${W - 20}" height="290" rx="10"/>
      <circle class="bn" cx="${sx + 4}" cy="84" r="24"/>
      <path class="bn" d="${smooth([[sx - 22, 112], [sx + 24, 112], [sx + 28, 200], [sx + 22, 250], [sx - 20, 250], [sx - 26, 200]], true, 0.5)}"/>
      ${limb(sx - 4, 250, sx - 6, 320, 20)}${limb(sx + 8, 250, sx + 10, 320, 20)}
      ${ghost(sx, sy, sx, sy + 100)}${limb(sx, sy, sx + 96, sy - 6)}
      ${mv(`M${sx + 18} ${sy + 92} A92 92 0 0 0 ${sx + 90} ${sy + 22}`)}${dot(sx, sy)}`;
  };
  // B: frontal plane, front view; lateral raise around the sagittal axis at the shoulder
  const B = (x0) => {
    const cx = x0 + W / 2, sx = cx + 40, sy = 132;
    return `<rect class="pl-f" x="${x0 + 10}" y="40" width="${W - 20}" height="290" rx="10"/>
      <circle class="bn" cx="${cx}" cy="84" r="24"/>
      <path class="bn" d="${smooth([[cx - 40, 112], [cx + 40, 112], [cx + 42, 200], [cx + 34, 250], [cx - 34, 250], [cx - 42, 200]], true, 0.5)}"/>
      ${limb(cx - 18, 250, cx - 22, 320, 20)}${limb(cx + 18, 250, cx + 22, 320, 20)}
      ${limb(cx - 40, sy, cx - 46, sy + 96)}
      ${ghost(sx, sy, sx + 6, sy + 96)}${limb(sx, sy, sx + 84, sy - 8)}
      ${mv(`M${sx + 24} ${sy + 92} A84 84 0 0 0 ${sx + 80} ${sy + 24}`)}${dot(sx, sy)}`;
  };
  // C: transverse plane, viewed from above; trunk rotation around the longitudinal axis
  const C = (x0) => {
    const cx = x0 + W / 2, cy = 186;
    return `<rect class="pl-t" x="${x0 + 10}" y="40" width="${W - 20}" height="290" rx="10"/>
      <ellipse class="bn" cx="${cx}" cy="${cy}" rx="78" ry="30"/>
      <ellipse class="bn" cx="${cx - 84}" cy="${cy + 2}" rx="14" ry="16"/><ellipse class="bn" cx="${cx + 84}" cy="${cy + 2}" rx="14" ry="16"/>
      <circle class="bn" cx="${cx}" cy="${cy}" r="24"/><path class="bn" d="M${cx - 6} ${cy + 22} L${cx} ${cy + 32} L${cx + 6} ${cy + 22} Z"/>
      ${mv(`M${cx + 60} ${cy + 70} A100 64 0 0 1 ${cx - 66} ${cy + 66}`)}${mv(`M${cx - 60} ${cy - 70} A100 64 0 0 1 ${cx + 66} ${cy - 66}`)}
      ${dot(cx, cy)}<text class="dg-small" x="${cx}" y="${cy + 112}" text-anchor="middle">(viewed from above, nose ▼)</text>`;
  };
  const cap = (x0, t, ax, mvTxt, ex) => {
    const cx = x0 + W / 2;
    return `${note(cx, 26, t, 'dg-head')}
      <text class="dg-ex" x="${cx}" y="356" text-anchor="middle">Axis: ${ax}</text>
      <text x="${cx}" y="380" text-anchor="middle">${mvTxt}</text>
      <text class="dg-note" x="${cx}" y="402" text-anchor="middle">e.g. ${ex}</text>`;
  };
  return `${arrowDefs('pa-ar')}${A(0)}${B(W)}${C(2 * W)}
    ${cap(0, 'Sagittal plane', 'frontal (side to side)', 'Flexion / extension', 'front raise, squat, curl')}
    ${cap(W, 'Frontal plane', 'sagittal (front to back)', 'Abduction / adduction', 'lateral raise, side lunge')}
    ${cap(2 * W, 'Transverse plane', 'longitudinal (head to toe)', 'Rotation', 'woodchop, Russian twist')}`;
}

export const PLANES_AXES = figure({
  title: 'Each plane and its axis',
  viewBox: '0 0 870 412',
  minWidth: 620,
  body: planeAxes(),
  caption: 'Here each panel is the plane itself, and the dot is its axis pointing straight into the page: the joint pivots around the axis while the limb moves across the plane. Pairs to remember: sagittal plane with the frontal axis, frontal plane with the sagittal axis, transverse plane with the longitudinal axis.',
});
