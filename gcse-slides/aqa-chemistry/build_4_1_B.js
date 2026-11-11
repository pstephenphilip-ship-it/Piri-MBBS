// build_4_1_B.js — AQA GCSE Chemistry (8462) 4.1 Atomic structure and the periodic table, lesson 2 of 3:
// 4.1.1.3 Scientific models of the atom, 4.1.1.4 Relative electrical charges of subatomic particles,
// 4.1.1.5 Size and mass of atoms, 4.1.1.6 Relative atomic mass, 4.1.1.7 Electronic structure.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_1_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, helpers } = require('./chem_common');

const D = T.init(deck('4.1.1', 'Atomic structure'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, ell, ball, table, note } = helpers(D);
const near = (l, a, b) => calc(l, a, b, 1e-9 * Math.max(1, Math.abs(b)));
const r1 = x => Math.round(x * 10) / 10;

// ======================= checks =======================
// electron arrangement for Z = 1..20 (GCSE model: 2, 8, 8, 2)
function shells(Z) { const out = []; let left = Z; for (const cap of [2, 8, 8, 2]) { if (left <= 0) break; const k = Math.min(cap, left); out.push(k); left -= k; } return out; }
const cfg = Z => shells(Z).join(',');
calc('Na', cfg(11) === '2,8,1' ? 1 : 0, 1); calc('Cl', cfg(17) === '2,8,7' ? 1 : 0, 1); calc('Ca', cfg(20) === '2,8,8,2' ? 1 : 0, 1);
calc('Al', cfg(13) === '2,8,3' ? 1 : 0, 1); calc('O', cfg(8) === '2,6' ? 1 : 0, 1); calc('K', cfg(19) === '2,8,8,1' ? 1 : 0, 1);
calc('Mg', cfg(12) === '2,8,2' ? 1 : 0, 1); calc('S', cfg(16) === '2,8,6' ? 1 : 0, 1); calc('Ar', cfg(18) === '2,8,8' ? 1 : 0, 1);
calc('N', cfg(7) === '2,5' ? 1 : 0, 1); calc('Si', cfg(14) === '2,8,4' ? 1 : 0, 1); calc('F', cfg(9) === '2,7' ? 1 : 0, 1); calc('P', cfg(15) === '2,8,5' ? 1 : 0, 1);
// particles: [symbol, Z, A] -> p, n, e
const pne = (Z, A) => [Z, A - Z, Z];
calc('Na n', pne(11, 23)[1], 12); calc('Cl n', pne(17, 35)[1], 18); calc('Cl37 n', pne(17, 37)[1], 20); calc('K n', pne(19, 39)[1], 20);
calc('Fe n', pne(26, 56)[1], 30); calc('U n', pne(92, 238)[1], 146); calc('Al n', pne(13, 27)[1], 14); calc('Ca n', pne(20, 40)[1], 20);
// ions
calc('Na+ e', 11 - 1, 10); calc('O2- e', 8 + 2, 10); calc('Mg2+ e', 12 - 2, 10); calc('Cl- e', 17 + 1, 18);
// relative atomic mass
const ram = list => list.reduce((a, [m, p]) => a + m * p, 0) / list.reduce((a, [, p]) => a + p, 0);
near('Cl', ram([[35, 75], [37, 25]]), 35.5);
calc('Cu', r1(ram([[63, 69], [65, 31]])), 63.6);
calc('MT Li', r1(ram([[6, 7.5], [7, 92.5]])), 6.9);
calc('MT Mg', r1(ram([[24, 79], [25, 10], [26, 11]])), 24.3);
calc('YT B', r1(ram([[10, 20], [11, 80]])), 10.8);
calc('YT Ne', r1(ram([[20, 90], [22, 10]])), 20.2);
calc('exam Ga', r1(ram([[69, 60], [71, 40]])), 69.8);
calc('HW Br', r1(ram([[79, 51], [81, 49]])), 80.0);
calc('practice Ag', r1(ram([[107, 52], [109, 48]])), 108.0);
// sizes
near('nucleus', 1e-10 / 1e4, 1e-14); near('nm', 0.1e-9, 1e-10); near('ratio', 1e-10 / 1e-14, 1e4);

// ======================= local drawings =======================
const NUC = 'C0392B', NEU = '95A5A6', EL = '2F5DA8';
// Bohr-style atom: rings for shells, electrons as dots
function atomDraw(s, cx, cy, Z, sym, o = {}) {
  const sh = shells(Z), r0 = o.r0 || 0.42, step = o.step || 0.32;
  circle(s, cx, cy, r0 * 1.1, 'F6D7D3', NUC, 1.5);
  txt(s, sym, cx - 0.4, cy - 0.2, 0.8, 0.4, { size: o.symSize || 16, bold: true, align: 'center', valign: 'middle' });
  sh.forEach((k, i) => {
    const r = r0 + (i + 1) * step;
    circle(s, cx, cy, 2 * r, C.white, C.grey, 1);
    // re-draw inner things on top is not possible, so draw rings from outside in instead (handled by caller order)
    for (let j = 0; j < k; j++) {
      const a = -Math.PI / 2 + (j * 2 * Math.PI) / k + (i % 2 ? Math.PI / k : 0);
      circle(s, cx + r * Math.cos(a), cy + r * Math.sin(a), 0.16, EL);
    }
  });
}
// draw outer rings first so inner shapes stay visible
function atomShells(s, cx, cy, Z, sym, o = {}) {
  const sh = shells(Z), r0 = o.r0 || 0.42, step = o.step || 0.32;
  for (let i = sh.length - 1; i >= 0; i--) { const r = r0 + (i + 1) * step; circle(s, cx, cy, 2 * r, i % 2 ? C.white : 'FAF8FC', C.grey, 1); }
  circle(s, cx, cy, r0 * 1.2, 'F6D7D3', NUC, 1.5);
  txt(s, sym, cx - 0.4, cy - 0.2, 0.8, 0.4, { size: o.symSize || 16, bold: true, align: 'center', valign: 'middle' });
  sh.forEach((k, i) => {
    const r = r0 + (i + 1) * step;
    for (let j = 0; j < k; j++) {
      const a = -Math.PI / 2 + (j * 2 * Math.PI) / k + (i % 2 ? Math.PI / k : 0);
      circle(s, cx + r * Math.cos(a), cy + r * Math.sin(a), 0.14, EL);
    }
  });
  return r0 + sh.length * step;
}
void atomDraw;
// nuclide symbol: mass number top-left, atomic number bottom-left
function nuclide(s, x, y, A, Z, sym, size = 40) {
  const sw = size / 72 * 0.9;
  txt(s, String(A), x, y, 0.8, 0.45, { size: Math.round(size * 0.5), bold: true, color: C.accent, align: 'right' });
  txt(s, String(Z), x, y + size / 72 * 0.95, 0.8, 0.45, { size: Math.round(size * 0.5), bold: true, color: C.red, align: 'right' });
  txt(s, sym, x + 0.85, y + 0.12, sw * 2.2, size / 72 * 1.4, { size, bold: true });
}
function label(s, t, x, y, w = 2.4, o = {}) { txt(s, t, x, y, w, 0.34, Object.assign({ size: 13, bold: true }, o)); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'How the model of the atom developed, protons, neutrons and electrons, isotopes, relative atomic mass and electron arrangement',
  bullets: ['Part 1: how the model of the atom developed (4.1.1.3)', 'Part 2: protons, neutrons, electrons; atomic and mass number (4.1.1.4, 4.1.1.5)', 'Part 3: isotopes and relative atomic mass (4.1.1.6)', 'Part 4: electronic structure (4.1.1.7)'],
  notes: 'AQA 8462 GCSE Chemistry 4.1, lesson 2 of 3. Lesson 1 covered atoms, equations and mixtures. Lesson 3: the periodic table, groups 0, 1 and 7 and the transition metals. About two hours.',
});

D.objectives({
  tag: '4.1.1',
  items: [
    'Describe how the **model of the atom** changed and **why** (new evidence).',
    'Give the **charge** and **mass** of protons, neutrons and electrons; use **atomic** and **mass number**.',
    'Explain **isotopes** and **calculate relative atomic mass** from abundances.',
    'Write and draw the **electronic structure** of the first 20 elements.',
  ],
  keywords: ['nucleus', 'proton', 'neutron', 'electron', 'isotope', 'relative atomic mass', 'shell'],
  notes: 'Share the objectives. Physics 8463 covers the same atomic model history (4.4.1), so this is a useful cross-subject link.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['How many atoms are in H₂SO₄?', 'Balance: Mg + O₂ → MgO', 'Write 0.0000000001 in standard form.', 'Which method separates ethanol from water?'],
  answers: ['7', '2Mg + O₂ → 2MgO', '1 × 10^{−10}', 'fractional distillation'],
  notes: 'Retrieval from lesson 1 plus the standard form needed for atom sizes today.',
});

D.vocab({
  title: 'Key words', tag: '4.1.1',
  items: [
    { term: 'Nucleus', def: 'The tiny **centre** of an atom. Contains **protons** and **neutrons**. Almost all the mass.' },
    { term: 'Atomic number', def: 'The number of **protons**. Every atom of an element has the same atomic number.' },
    { term: 'Mass number', def: 'The total number of **protons + neutrons**.' },
    { term: 'Isotopes', def: 'Atoms of the same element with the **same number of protons** but **different numbers of neutrons**.' },
  ],
  notes: 'Spec 4.1.1.4–4.1.1.6 definitions.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: how the model of the atom developed', { tag: '4.1.1.3' });
  const n = 5, gap = 0.2, cw = (W - 2 * MX - (n - 1) * gap) / n, top = 1.4, h = 5.45;
  const cards = [
    ['Dalton', 'early 1800s', 'Atoms are **tiny solid spheres** that cannot be divided.'],
    ['Thomson', '1897', 'Discovered the **electron**. **Plum pudding** model: a ball of positive charge with electrons in it.'],
    ['Rutherford', '1909–11', '**Alpha scattering**: mass and positive charge in a tiny **nucleus**. Nuclear model.'],
    ['Bohr', '1913', 'Electrons orbit the nucleus at **fixed distances** (shells). Matched experiments.'],
    ['Chadwick', '1932', 'Proved that **neutrons** exist in the nucleus.'],
  ];
  cards.forEach(([who, when, what], i) => {
    const x = MX + i * (cw + gap);
    rect(s, x, top, cw, h, C.soft, C.line);
    rect(s, x, top, cw, 0.9, C.maroon);
    txt(s, who, x + 0.1, top + 0.05, cw - 0.2, 0.45, { size: 19, bold: true, color: C.white, align: 'center' });
    txt(s, when, x + 0.1, top + 0.48, cw - 0.2, 0.35, { size: 14, color: 'DCD2EC', align: 'center' });
    const cx = x + cw / 2, cy = top + 1.85;
    if (i === 0) circle(s, cx, cy, 1.1, '9B8BB4', '5E4B7E', 1.5);
    if (i === 1) { circle(s, cx, cy, 1.25, 'F6D7D3', NUC, 1.5); [[-0.3, -0.25], [0.25, -0.3], [0.05, 0.05], [-0.28, 0.3], [0.3, 0.25]].forEach(([a, b]) => circle(s, cx + a, cy + b, 0.17, EL)); txt(s, '+', cx - 0.15, cy - 0.6, 0.3, 0.3, { size: 14, bold: true, color: NUC, align: 'center' }); }
    if (i === 2) { circle(s, cx, cy, 1.3, C.white, C.grey, 1); circle(s, cx, cy, 0.18, NUC); [[-0.45, -0.3], [0.5, 0.15], [-0.1, 0.55]].forEach(([a, b]) => circle(s, cx + a, cy + b, 0.15, EL)); }
    if (i === 3) { circle(s, cx, cy, 1.4, C.white, C.grey, 1); circle(s, cx, cy, 0.85, C.white, C.grey, 1); circle(s, cx, cy, 0.22, NUC); circle(s, cx, cy - 0.425, 0.15, EL); circle(s, cx, cy + 0.425, 0.15, EL); circle(s, cx + 0.7, cy, 0.15, EL); circle(s, cx - 0.7, cy, 0.15, EL); }
    if (i === 4) { circle(s, cx - 0.17, cy - 0.12, 0.38, NUC); circle(s, cx + 0.17, cy - 0.12, 0.38, NEU, '6B7778', 1); circle(s, cx - 0.17, cy + 0.2, 0.38, NEU, '6B7778', 1); circle(s, cx + 0.17, cy + 0.2, 0.38, NUC); }
    txt(s, what, x + 0.15, top + 2.85, cw - 0.3, h - 2.95, { size: 16 });
  });
  notes(s, 'Spec 4.1.1.3: "New experimental evidence may lead to a scientific model being changed or replaced... Students should be able to describe why the new evidence from the scattering experiment led to a change in the atomic model; describe the difference between the plum pudding model of the atom and the nuclear model of the atom." Details of experimental work supporting the Bohr model are not required. Drawings are simplified: red = positive/proton, grey = neutron, blue = electron.');
}

{
  const s = frame('Rutherford’s alpha scattering experiment', { tag: '4.1.1.3' });
  // gold foil and paths
  const fx = MX + 3.4;
  rect(s, fx - 0.06, 1.6, 0.12, 3.6, GOLDC(), '9C7A1E');
  label(s, 'thin gold foil', fx - 0.8, 5.3, 1.6, { align: 'center' });
  rect(s, MX, 3.1, 0.8, 0.6, C.greyLight, C.grey); label(s, 'alpha source', MX - 0.05, 3.75, 1.2);
  [2.2, 2.75, 3.4, 4.05, 4.6].forEach(y => arrow(s, MX + 0.85, y, fx + 3.2, y, C.green, 1.75));
  arrow(s, MX + 0.85, 3.25, fx + 2.6, 2.3, C.orange, 1.75);
  seg(s, MX + 0.85, 3.55, fx - 0.08, 3.55, C.red, 1.75); arrow(s, fx - 0.08, 3.55, MX + 1.6, 4.6, C.red, 1.75);
  label(s, 'most go straight through', fx + 0.4, 1.75, 2.8, { color: C.green });
  label(s, 'a few deflected', fx + 2.0, 2.45, 2.0, { color: C.orange });
  label(s, 'very few bounce back', MX + 1.0, 4.85, 2.6, { color: C.red });
  const tx = MX + 7.2, tw = W - MX - tx;
  table(s, tx, 1.4, [tw * 0.5, tw * 0.5], ['Observation', 'Conclusion'], [
    ['Most alpha particles **pass straight through**', 'Most of the atom is **empty space**'],
    ['Some are **deflected**', 'The centre is **positively charged** (repels alpha +)'],
    ['A very few **bounce back**', 'Mass is concentrated in a **tiny nucleus**'],
  ], { rh: 1.2, size: 16, boldFirst: false });
  note(s, MX, 5.95, W - 2 * MX, 0.9, 'The plum pudding model predicted **all** alpha particles would pass through. The results did not match, so the model was **replaced** by the **nuclear model**.', { size: 17 });
  notes(s, 'Spec 4.1.1.3: "The results from the alpha particle scattering experiment led to the conclusion that the mass of an atom was concentrated at the centre (nucleus) and that the nucleus was charged." Alpha particles are positively charged (helium nuclei). Work was by Geiger and Marsden under Rutherford.');
}
function GOLDC() { return 'E0B83A'; }

D.hinge({
  title: 'Quick check',
  q: 'Why did a few alpha particles bounce straight back?',
  options: ['They hit the small, dense, positive nucleus', 'They hit electrons', 'The atom is mostly empty space', 'The foil was too thick'],
  correct: 0,
  notes: 'Answer A. B: electrons are far too light to turn an alpha particle back. C explains why most went straight through. D: the foil was very thin (a few hundred atoms thick).',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: protons, neutrons and electrons', { tag: '4.1.1.4' });
  const tw = 7.2;
  table(s, MX, 1.4, [tw * 0.34, tw * 0.33, tw * 0.33], ['Particle', 'Relative charge', 'Relative mass'], [
    ['Proton', '+1', '1'], ['Neutron', '0', '1'], ['Electron', '−1', 'very small'],
  ], { rh: 0.75, size: 20, align: ['left', 'center', 'center'] });
  bullets(s, MX, 4.5, tw, ['Atoms have **no overall charge**: number of electrons = number of protons.', 'The number of protons (atomic number) decides **which element** it is.'], 18, 0.15);
  const ax = MX + 10.0, ay = 3.4;
  // Lithium-7 drawing: 3 p, 4 n, 2,1 electrons
  circle(s, ax, ay, 3.6, 'FAF8FC', C.grey, 1); circle(s, ax, ay, 2.2, C.white, C.grey, 1);
  [[-0.17, -0.17, NUC], [0.17, -0.17, NEU], [0.17, 0.17, NUC], [-0.17, 0.17, NEU], [0, -0.38, NEU], [0, 0.38, NUC], [0.38, 0, NEU]].forEach(([a, b, c]) => circle(s, ax + a, ay + b, 0.32, c, '555555', 0.75));
  circle(s, ax, ay - 1.1, 0.2, EL); circle(s, ax, ay + 1.1, 0.2, EL); circle(s, ax + 1.8, ay, 0.2, EL);
  txt(s, 'Lithium-7: 3 protons, 4 neutrons, 3 electrons', ax - 2.2, 5.3, 4.4, 0.4, { size: 15, bold: true, align: 'center' });
  rect(s, MX, 5.95, W - 2 * MX, 0.9, C.soft, C.line);
  [[NUC, 'proton'], [NEU, 'neutron'], [EL, 'electron']].forEach(([c, t], i) => { circle(s, MX + 0.5 + i * 2.6, 6.4, 0.3, c); txt(s, t, MX + 0.8 + i * 2.6, 6.2, 1.8, 0.4, { size: 17, bold: true }); });
  txt(s, 'Not to scale', MX + 8.3, 6.2, 3, 0.4, { size: 15, italic: true, color: C.grey });
  notes(s, 'Spec 4.1.1.4: "The relative electrical charges of the particles in atoms are: proton +1, neutron 0, electron −1." Spec 4.1.1.5: relative mass of proton 1, neutron 1, electron very small. Electron mass is about 1/1840 of a proton.');
}

{
  const s = frame('Atomic number, mass number and size', { tag: '4.1.1.5' });
  nuclide(s, MX + 0.3, 1.6, 23, 11, 'Na', 54);
  label(s, 'mass number (protons + neutrons)', MX + 2.5, 1.7, 4.3, { size: 16, color: C.accent });
  label(s, 'atomic number (protons)', MX + 2.5, 2.55, 4.3, { size: 16, color: C.red });
  rect(s, MX, 3.3, 6.4, 1.6, C.soft, C.line);
  txt(s, 'Sodium-23:  protons = **11**,  electrons = **11**', MX + 0.3, 3.45, 6.0, 0.5, { size: 20 });
  txt(s, 'neutrons = 23 − 11 = **12**', MX + 0.3, 4.1, 6.0, 0.5, { size: 20 });
  txt(s, 'neutrons = mass number − atomic number', MX, 5.1, 6.4, 0.45, { size: 18, bold: true, color: C.maroon });
  const bx = MX + 6.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'How big is an atom?', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Radius of an atom: about **0.1 nm** = **1 × 10^{−10} m**.', 'Radius of the nucleus: about **1/10 000** of the atom = **1 × 10^{−14} m**.', 'Almost all the **mass** is in the nucleus.', 'Scale: if the nucleus were a pea in the centre of a football stadium, the electrons would be at the edge of the stands.'], 17, 0.18);
  notes(s, 'Spec 4.1.1.5: "Atoms are very small, having a radius of about 0.1 nm (1 x 10^{−10} m). The radius of a nucleus is less than 1/10 000 of that of the atom (about 1 x 10^{−14} m). Almost all of the mass of an atom is in the nucleus." Students should be able to relate size and scale of atoms to objects in the physical world.');
}

D.myTurnYourTurn({
  title: 'Protons, neutrons, electrons', tag: 'Skill practice', stepSize: 20, labelW: 2.3, labelSize: 18, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Find p, n and e:',
    steps: [
      { label: 'Cl: A 35, Z 17', text: 'p **17**, n **18**, e **17**' },
      { label: 'Al: A 27, Z 13', text: 'p **13**, n **14**, e **13**' },
      { label: 'Mg²⁺: A 24, Z 12', text: 'p **12**, n **12**, e **10**' },
    ],
  },
  yours: {
    q: 'Find p, n and e:',
    steps: [
      { label: 'K: A 39, Z 19', text: 'p **19**, n **20**, e **19**' },
      { label: 'Fe: A 56, Z 26', text: 'p **26**, n **30**, e **26**' },
      { label: 'Cl⁻: A 35, Z 17', text: 'p **17**, n **18**, e **18**' },
    ],
  },
  notes: 'Ions: a positive ion has LOST electrons (Mg²⁺: 12 − 2 = 10); a negative ion has GAINED electrons (Cl⁻: 17 + 1 = 18). Protons and neutrons do not change. Ions are taught fully in 4.2.1.2.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: isotopes', { tag: '4.1.1.6' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  [[35, 18, 'chlorine-35', '75%'], [37, 20, 'chlorine-37', '25%']].forEach(([A, n, name, ab], i) => {
    const x = MX + i * (cw + gap);
    rect(s, x, 1.4, cw, 3.3, i ? C.white : C.soft, C.line);
    nuclide(s, x + 0.3, 1.6, A, 17, 'Cl', 48);
    txt(s, name, x + 2.6, 1.6, cw - 2.8, 0.45, { size: 20, bold: true, color: C.maroon });
    txt(s, `17 protons\n**${n} neutrons**\n17 electrons`, x + 2.6, 2.15, cw - 2.8, 1.4, { size: 18 });
    txt(s, `Abundance: **${ab}**`, x + 0.3, 3.9, cw - 0.6, 0.45, { size: 18 });
  });
  note(s, MX, 4.95, W - 2 * MX, 1.9, '**Isotopes**: same number of **protons**, different number of **neutrons**. They have the **same chemical properties** (same electrons) but **different masses**. The periodic table shows a **mean** mass, weighted by abundance: the **relative atomic mass** (Aᵣ).', { size: 18 }) || 0;
  notes(s, 'Spec 4.1.1.6: "Atoms of the same element can have different numbers of neutrons; these atoms are called isotopes of that element... The relative atomic mass of an element is an average value that takes account of the abundance of the isotopes of the element."');
}

{
  const s = frame('Calculating relative atomic mass', { tag: '4.1.1.6' });
  rect(s, MX, 1.4, W - 2 * MX, 1.15, C.soft, C.line);
  D.math(s, MX + 0.3, 1.97, ['Aᵣ = ', { n: '(mass₁ × %₁) + (mass₂ × %₂)', d: '100' }], { size: 24, bold: true });
  rect(s, MX, 2.8, W - 2 * MX, 2.0, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example: chlorine', MX + 0.3, 2.9, 6, 0.45, { size: 19, bold: true, color: C.orange });
  txt(s, 'Chlorine-35: 75%.   Chlorine-37: 25%.', MX + 0.3, 3.35, W - 2 * MX - 0.6, 0.45, { size: 19 });
  txt(s, 'Aᵣ = (35 × 75 + 37 × 25) ÷ 100 = (2625 + 925) ÷ 100 = **35.5**', MX + 0.3, 3.9, W - 2 * MX - 0.6, 0.6, { size: 21 });
  rect(s, MX, 5.05, W - 2 * MX, 1.8, C.greyLight, C.line);
  txt(s, 'Check your answer', MX + 0.3, 5.15, 6, 0.45, { size: 19, bold: true, color: C.maroon });
  bullets(s, MX + 0.3, 5.65, W - 2 * MX - 0.6, ['It must lie **between** the isotope masses (35 and 37), and **closer to the more common** isotope.', 'If the percentages do not add to 100, divide by their **total** instead.'], 17, 0.08);
  notes(s, 'Spec 4.1.1.6: "Students should be able to calculate the relative atomic mass of an element given the percentage abundance of its isotopes." Copper check: 63 (69%) and 65 (31%) gives 63.62, so 63.6 (the periodic table value is 63.5).');
}

D.myTurnYourTurn({
  title: 'Relative atomic mass', tag: 'Maths skill', stepSize: 19, labelW: 3.0, labelSize: 17, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Calculate Aᵣ to 1 decimal place:',
    steps: [
      { label: 'Li: 6 (7.5%), 7 (92.5%)', text: '(45 + 647.5) ÷ 100 = **6.9**' },
      { label: 'Mg: 24 (79%), 25 (10%), 26 (11%)', text: '(1896 + 250 + 286) ÷ 100 = **24.3**' },
    ],
  },
  yours: {
    q: 'Calculate Aᵣ to 1 decimal place:',
    steps: [
      { label: 'B: 10 (20%), 11 (80%)', text: '(200 + 880) ÷ 100 = **10.8**' },
      { label: 'Ne: 20 (90%), 22 (10%)', text: '(1800 + 220) ÷ 100 = **20.2**' },
    ],
  },
  notes: 'Lithium: 6.925 → 6.9. Magnesium: 2432 ÷ 100 = 24.32 → 24.3. Boron 10.8. Neon 20.2. All checked in the build script.',
});

D.hinge({
  title: 'Quick check',
  q: 'Carbon-12 and carbon-14 are isotopes. What is different about them?',
  options: ['The number of neutrons', 'The number of protons', 'The number of electrons', 'Their chemical reactions'],
  correct: 0,
  notes: 'Answer A: 6 and 8 neutrons. B: both have 6 protons (that makes them carbon). C: both have 6 electrons. D: same electrons, so same chemistry.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: electronic structure', { tag: '4.1.1.7' });
  headCard(s, MX, 1.4, 4.4, 5.45, 'Filling shells', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 4.0, ['Electrons fill the **lowest energy** shell (closest to the nucleus) first.', 'Shell 1 holds up to **2**.', 'Shells 2 and 3 hold up to **8** (for the first 20 elements).', 'Write it as numbers: sodium is **2,8,1**.'], 18, 0.2);
  const items = [[11, 'Na', '2,8,1'], [17, 'Cl', '2,8,7'], [20, 'Ca', '2,8,8,2']];
  items.forEach(([Z, sym, c], i) => {
    const cx = [6.25, 8.55, 11.3][i], cy = 3.35;
    atomShells(s, cx, cy, Z, sym, { r0: 0.32, step: 0.22, symSize: 14 });
    txt(s, sym === 'Na' ? 'Sodium' : sym === 'Cl' ? 'Chlorine' : 'Calcium', cx - 1.1, 1.4, 2.2, 0.4, { size: 17, bold: true, color: C.maroon, align: 'center' });
    txt(s, c, cx - 1.1, 5.0, 2.2, 0.5, { size: 22, bold: true, align: 'center' });
  });
  note(s, MX + 5.2, 5.75, W - MX - (MX + 5.2), 1.1, 'The number of shells = the **period**. Electrons in the outer shell = the **group** (for groups 1–7).', { size: 17 });
  notes(s, 'Spec 4.1.1.7: "Students should be able to represent the electronic structures of the first twenty elements of the periodic table in both forms" (diagram and numbers). Calcium is 2,8,8,2 in the GCSE model. Links to lesson 3 (periodic table).');
}

{
  const s = frame('Electronic structures: first 20 elements', { tag: '4.1.1.7' });
  const els = ['H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca'];
  const cols = 5, gap = 0.18, cw = (W - 2 * MX - (cols - 1) * gap) / cols, rh = 1.2;
  els.forEach((e, i) => {
    const Z = i + 1, x = MX + (i % cols) * (cw + gap), y = 1.4 + Math.floor(i / cols) * (rh + 0.15);
    rect(s, x, y, cw, rh, i % 2 ? C.white : C.soft, C.line);
    txt(s, String(Z), x + 0.12, y + 0.08, 0.6, 0.35, { size: 13, color: C.grey });
    txt(s, e, x + 0.12, y + 0.4, 1.0, 0.6, { size: 26, bold: true, color: C.maroon });
    txt(s, cfg(Z), x + 1.1, y, cw - 1.25, rh, { size: 22, bold: true, valign: 'middle', align: 'right' });
  });
  txt(s, 'The small number on each card is the atomic number.', MX, 6.85, W - 2 * MX, 0.3, { size: 12, italic: true, color: C.grey });
  notes(s, 'Generated from the atomic number by filling 2, 8, 8, 2, so every entry is checked. Students should spot that the outer-shell number repeats: Li, Na, K are all ...1 (group 1); F and Cl are ...7 (group 7); He, Ne, Ar have full shells (group 0).');
}

D.hinge({
  title: 'Quick check',
  q: 'Sulfur has atomic number 16. What is its electronic structure?',
  options: ['2,8,6', '2,8,8', '2,6,8', '8,8'],
  correct: 0,
  notes: 'Answer A. B is argon (18). C fills shells out of order. D forgets that the first shell holds only 2.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is the relative charge of a neutron?', '0'], ['What did Chadwick discover?', 'The neutron'], ['What is the radius of an atom?', 'About 0.1 nm (1 × 10^{−10} m)'], ['Give the electronic structure of aluminium (Z = 13).', '2,8,3'],
    ['How many neutrons in ²³⁸U (Z = 92)?', '146'], ['Why do isotopes have the same chemical properties?', 'Same number of electrons'],
    ['Ag: 107 (52%), 109 (48%). Find Aᵣ.', '108.0'], ['How many electrons in O²⁻ (Z = 8)?', '10'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) 0  2) the neutron (1932)  3) about 0.1 nm, 1 × 10^{−10} m  4) 2,8,3  5) 238 − 92 = 146  6) same number of electrons (outer shell decides reactions)  7) (107 × 52 + 109 × 48) ÷ 100 = (5564 + 5232) ÷ 100 = 107.96 → 108.0  8) 8 + 2 = 10.');
  }
}
calc('Ag parts', 107 * 52 + 109 * 48, 10796);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Describe the differences between the plum pudding model and the nuclear model of the atom.', m: 3, lines: 1 },
    { l: 'b', q: 'Gallium has two isotopes: gallium-69 (60%) and gallium-71 (40%). Calculate the relative atomic mass. Give your answer to 1 decimal place.', m: 2, lines: 1 },
    { l: 'c', q: 'Gallium-71 has atomic number 31. Give the number of protons, neutrons and electrons.', m: 3, lines: 1 },
    { l: 'd', q: 'Potassium has atomic number 19. Give its electronic structure and explain how this shows its group.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'plum pudding: ball of positive charge with electrons embedded; nuclear: positive charge and mass in a tiny nucleus; electrons outside / mostly empty space', '3', ''],
    ['(b)', '(69 × 60 + 71 × 40) ÷ 100; = 69.8', '2', 'answer only = 2'],
    ['(c)', '31 protons; 40 neutrons; 31 electrons', '3', ''],
    ['(d)', '2,8,8,1; one electron in the outer shell so group 1', '2', ''],
  ],
  notes: 'Mark scheme on the next slide. (b): 4140 + 2840 = 6980; ÷ 100 = 69.8.',
});
calc('Ga n', 71 - 31, 40); calc('Ga parts', 69 * 60 + 71 * 40, 6980);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What is the relative mass of an electron?', 'Who discovered the electron?', 'Define isotopes.', 'Electronic structure of phosphorus (Z = 15)?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) very small (about 1/1840)  2) J.J. Thomson  3) atoms of the same element with the same number of protons but different numbers of neutrons  4) 2,8,5. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw a timeline of the atomic model: Dalton, Thomson, Rutherford, Bohr, Chadwick.',
    'Explain what the alpha scattering results showed.',
    'Find p, n, e for: ¹⁹F (Z 9), ^{40}Ca²⁺ (Z 20).',
    'Br: 79 (51%), 81 (49%). Calculate Aᵣ.',
    'Draw the electron shells for nitrogen and silicon.',
    'Explain why the nucleus is about 1/10 000 the radius of the atom but has almost all the mass.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) see Part 1  2) see the alpha scattering slide  3) F: 9, 10, 9; Ca²⁺: 20, 20, 18  4) (4029 + 3969) ÷ 100 = 79.98 → 80.0  5) N 2,5; Si 2,8,4  6) protons and neutrons have relative mass 1; electrons have very small mass and are far out.');
}
calc('F n', 19 - 9, 10); calc('Ca2+ e', 20 - 2, 18); calc('Br parts', 79 * 51 + 81 * 49, 7998);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.1_B_AtomicStructure.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
