// build_4_2_A.js — AQA GCSE Chemistry (8462) 4.2 Bonding, structure and properties of matter, lesson 1 of 3:
// 4.2.1.1 Chemical bonds, 4.2.1.2 Ionic bonding, 4.2.1.3 Ionic compounds, 4.2.1.4 Covalent bonding,
// 4.2.1.5 Metallic bonding.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_2_A.js
'use strict';
const path = require('path');
const { T, C, calc, deck, parse, helpers } = require('./chem_common');

const D = T.init(deck('4.2.1', 'Ionic, covalent and metallic bonding'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);

// ======================= checks =======================
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
// ionic formula from ion charges: returns [nCation, nAnion]
function ratio(qp, qn) { const l = qp * qn / gcd(qp, qn); return [l / qp, l / qn]; }
// simpler direct checks of each formula's charge balance
const charge = (label, items) => calc('charge ' + label, items.reduce((t, [n, q]) => t + n * q, 0), 0);
charge('NaCl', [[1, 1], [1, -1]]); charge('MgO', [[1, 2], [1, -2]]); charge('MgCl2', [[1, 2], [2, -1]]);
charge('Al2O3', [[2, 3], [3, -2]]); charge('Ca(OH)2', [[1, 2], [2, -1]]); charge('Na2SO4', [[2, 1], [1, -2]]);
charge('MT K2O', [[2, 1], [1, -2]]); charge('MT AlCl3', [[1, 3], [3, -1]]); charge('MT (NH4)2CO3', [[2, 1], [1, -2]]);
charge('YT Li2S', [[2, 1], [1, -2]]); charge('YT CaF2', [[1, 2], [2, -1]]); charge('YT Fe2(SO4)3', [[2, 3], [3, -2]]);
charge('Mg3N2', [[3, 2], [2, -3]]); charge('CaO', [[1, 2], [1, -2]]); charge('Na2O', [[2, 1], [1, -2]]);
const rr = (a, b) => { const [m, n] = ratio(a, b); return m * 10 + n; };
calc('ratio Al2O3', rr(3, 2), 23); calc('ratio Mg3N2', rr(2, 3), 32); calc('ratio CaF2', rr(2, 1), 12); calc('ratio Fe2(SO4)3', rr(3, 2), 23); calc('ratio K2O', rr(1, 2), 21);
// full shells in molecules: each atom's own lone electrons + 2 × bonds (shared pairs) = 8 (2 for H)
const full = (label, lone, bonds, target) => calc('shell ' + label, lone + 2 * bonds, target);
full('H in H2', 0, 1, 2); full('Cl in Cl2', 6, 1, 8); full('Cl in HCl', 6, 1, 8); full('O in H2O', 4, 2, 8);
full('N in NH3', 2, 3, 8); full('C in CH4', 0, 4, 8); full('O in O2', 4, 2, 8); full('N in N2', 2, 3, 8); full('O in CO2', 4, 2, 8); full('C in CO2', 0, 4, 8);
// ion electron counts
calc('Na+ e', 11 - 1, 10); calc('Cl- e', 17 + 1, 18); calc('Mg2+ e', 12 - 2, 10); calc('O2- e', 8 + 2, 10);

// ======================= dot-and-cross helpers =======================
const DOT = C.blue, CROSS = C.red;
function edot(s, x, y) { circle(s, x, y, 0.13, DOT); }
function ecross(s, x, y) { const d = 0.065; seg(s, x - d, y - d, x + d, y + d, CROSS, 2.25); seg(s, x - d, y + d, x + d, y - d, CROSS, 2.25); }
function el(s, x, y, kind) { if (kind === 'x') ecross(s, x, y); else edot(s, x, y); }
// outer shell with electrons in 4 slots (E, N, W, S), each holding up to 2: kinds is an array like ['x','o','o',...]
function shellAtom(s, cx, cy, r, sym, kinds, o = {}) {
  circle(s, cx, cy, 2 * r, o.fill || C.white, o.ring || C.grey, 1.25);
  txt(s, sym, cx - r, cy - 0.22, 2 * r, 0.44, { size: o.size || 20, bold: true, align: 'center', valign: 'middle' });
  const slots = [0, -90, 180, 90];
  kinds.forEach((k, i) => {
    const slot = slots[i % 4], pairPos = Math.floor(i / 4); // first one in each slot, then the second
    const a = (slot + (pairPos ? 14 : -14) * (kinds.length > 4 || o.pairs ? 1 : 0)) * Math.PI / 180;
    el(s, cx + r * Math.cos(a), cy + r * Math.sin(a), k);
  });
}
function bracket(s, cx, cy, r, charge) {
  const t = cy - r - 0.15, b = cy + r + 0.15, l = cx - r - 0.2, rr = cx + r + 0.2;
  seg(s, l, t, l, b, C.ink, 2); seg(s, l, t, l + 0.15, t, C.ink, 2); seg(s, l, b, l + 0.15, b, C.ink, 2);
  seg(s, rr, t, rr, b, C.ink, 2); seg(s, rr - 0.15, t, rr, t, C.ink, 2); seg(s, rr - 0.15, b, rr, b, C.ink, 2);
  txt(s, charge, rr + 0.02, t - 0.12, 0.6, 0.4, { size: 18, bold: true });
}
// covalent molecule: centre atom + ligands. bonds: [{ang, sym, n (shared pairs), lone: [angles] (pairs on ligand)}]
// centreLone: angles of lone pairs on the central atom.
function molecule(s, cx, cy, r, sym, bonds, centreLone = [], o = {}) {
  const d = r * 1.55;
  bonds.forEach(b => {
    const a = b.ang * Math.PI / 180, lx = cx + d * Math.cos(a), ly = cy + d * Math.sin(a), rl = b.r || r;
    circle(s, lx, ly, 2 * rl, C.white, C.grey, 1.25);
    txt(s, b.sym, lx - rl, ly - 0.22, 2 * rl, 0.44, { size: o.size || 18, bold: true, align: 'center', valign: 'middle' });
    (b.lone || []).forEach(la => pairAt(s, lx, ly, rl, la, 'x'));
  });
  s.addShape(D.SH.ellipse, { x: cx - r, y: cy - r, w: 2 * r, h: 2 * r, fill: { color: 'FFFFFF', transparency: 100 }, line: { color: C.grey, width: 1.25 } });
  txt(s, sym, cx - r, cy - 0.22, 2 * r, 0.44, { size: o.size || 18, bold: true, align: 'center', valign: 'middle' });
  bonds.forEach(b => {
    const a = b.ang * Math.PI / 180, mx = cx + (d / 2) * Math.cos(a), my = cy + (d / 2) * Math.sin(a);
    const px = -Math.sin(a), py = Math.cos(a), n = b.n || 1;
    for (let k = 0; k < n; k++) {
      const off = (k - (n - 1) / 2) * 0.3;
      el(s, mx + px * (off - 0.08), my + py * (off - 0.08), 'o');
      el(s, mx + px * (off + 0.08), my + py * (off + 0.08), 'x');
    }
  });
  centreLone.forEach(la => pairAt(s, cx, cy, r, la, 'o'));
}
function pairAt(s, cx, cy, r, angDeg, kind) {
  [-13, 13].forEach(dd => { const a = (angDeg + dd) * Math.PI / 180; el(s, cx + r * Math.cos(a), cy + r * Math.sin(a), kind); });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Ionic bonding and dot-and-cross diagrams, ionic lattices and formulae, covalent bonding in small molecules, and metallic bonding',
  bullets: ['Part 1: three types of strong bond (4.2.1.1)', 'Part 2: ionic bonding and ionic compounds (4.2.1.2, 4.2.1.3)', 'Part 3: covalent bonding (4.2.1.4)', 'Part 4: metallic bonding (4.2.1.5)'],
  notes: 'AQA 8462 GCSE Chemistry 4.2 Bonding, structure and properties of matter, lesson 1 of 3. Lesson 2: states of matter and the properties of ionic, covalent and metallic substances. Lesson 3: structure and bonding of carbon, and nanoscience. Dots = electrons from one atom, crosses = electrons from the other. About two hours.',
});

D.objectives({
  tag: '4.2.1',
  items: [
    'Name the **three types** of strong chemical bond and which particles they join.',
    'Draw **dot-and-cross** diagrams for **ionic** compounds and work out **formulae** from ion charges.',
    'Draw dot-and-cross diagrams for **covalent** molecules, including **double bonds**.',
    'Describe **metallic bonding** and the **limitations** of each model.',
  ],
  keywords: ['ion', 'ionic bond', 'lattice', 'covalent bond', 'molecule', 'delocalised', 'metallic bond'],
  notes: 'Share the objectives. Students need the electronic structures from 4.1 lesson 2.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Electronic structure of chlorine (Z = 17)?', 'How many outer electrons does a group 2 atom have?', 'Do metals lose or gain electrons when they react?', 'Write the formula of sodium chloride.'],
  answers: ['2,8,7', '2', 'lose (form positive ions)', 'NaCl'],
  notes: 'Retrieval from 4.1. Outer electrons decide bonding.',
});

D.vocab({
  title: 'Key words', tag: '4.2.1',
  items: [
    { term: 'Ionic bond', def: '**Strong electrostatic attraction** between oppositely charged **ions**. Metal + non-metal.' },
    { term: 'Covalent bond', def: 'A **shared pair of electrons** between two atoms. Non-metal + non-metal.' },
    { term: 'Metallic bond', def: 'Attraction between **positive metal ions** and a sea of **delocalised electrons**.' },
    { term: 'Lattice', def: 'A regular, repeating 3D arrangement of particles in a **giant structure**.' },
  ],
  notes: 'Spec 4.2.1.1: "There are three types of strong chemical bonds: ionic, covalent and metallic."',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: three types of strong bond', { tag: '4.2.1.1' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.18, tw * 0.25, tw * 0.57], ['Bond', 'Between', 'What happens to the electrons'], [
    ['Ionic', 'metal + non-metal', 'Electrons **transferred**: metal atoms lose electrons, non-metal atoms gain them'],
    ['Covalent', 'non-metal + non-metal', 'Electrons **shared** in pairs'],
    ['Metallic', 'metal atoms', 'Outer electrons **delocalised** (free to move through the whole structure)'],
  ], { rh: 1.05, size: 18 });
  note(s, MX, 5.35, tw, 1.5, 'In every case atoms end up with a **stable** electron arrangement, like a **noble gas** (a full outer shell).\nExamples: sodium chloride (ionic), water (covalent), copper (metallic).', { size: 18 });
  notes(s, 'Spec 4.2.1.1: "For ionic bonding the particles are oppositely charged ions. For covalent bonding the particles are atoms which share pairs of electrons. For metallic bonding the particles are atoms which share delocalised electrons. Ionic bonding occurs in compounds formed from metals combined with non-metals. Covalent bonding occurs in most non-metallic elements and in compounds of non-metals. Metallic bonding occurs in metallic elements and alloys."');
}

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: ionic bonding, sodium chloride', { tag: '4.2.1.2' });
  const y = 2.9, r = 0.62;
  shellAtom(s, MX + 0.9, y, r, 'Na', ['x']);
  txt(s, '+', MX + 1.75, y - 0.3, 0.5, 0.6, { size: 28, bold: true, align: 'center' });
  shellAtom(s, MX + 3.0, y, r, 'Cl', ['o', 'o', 'o', 'o', 'o', 'o', 'o']);
  arrow(s, MX + 3.95, y, MX + 5.25, y, C.ink, 2.5);
  txt(s, 'electron transferred', MX + 3.85, y - 0.62, 1.6, 0.5, { size: 13, bold: true, align: 'center' });
  shellAtom(s, MX + 6.35, y, r, 'Na', [], { ring: 'BBBBBB' }); bracket(s, MX + 6.35, y, r, '+');
  shellAtom(s, MX + 8.75, y, r, 'Cl', ['x', 'o', 'o', 'o', 'o', 'o', 'o', 'o']); bracket(s, MX + 8.75, y, r, '−');
  txt(s, 'Na  2,8,1', MX + 0.15, 4.0, 1.6, 0.4, { size: 15, bold: true, align: 'center' });
  txt(s, 'Cl  2,8,7', MX + 2.25, 4.0, 1.6, 0.4, { size: 15, bold: true, align: 'center' });
  txt(s, 'Na⁺  [2,8]', MX + 5.55, 4.0, 1.6, 0.4, { size: 15, bold: true, align: 'center' });
  txt(s, 'Cl⁻  [2,8,8]', MX + 7.95, 4.0, 1.6, 0.4, { size: 15, bold: true, align: 'center' });
  const kx = MX + 10.3; edot(s, kx + 0.1, 2.3); txt(s, 'chlorine electron', kx + 0.3, 2.12, 2.0, 0.36, { size: 13 }); ecross(s, kx + 0.1, 2.8); txt(s, 'sodium electron', kx + 0.3, 2.62, 2.0, 0.36, { size: 13 });
  bullets(s, MX, 4.65, W - 2 * MX, ['Sodium **loses** its one outer electron: Na⁺. Chlorine **gains** one electron: Cl⁻.', 'Both ions now have the electronic structure of a **noble gas** (Ne and Ar).', 'Only **outer shells** are drawn. The Na⁺ ion has lost its outer shell, so its new outer shell (8) is not drawn here.'], 17, 0.12);
  notes(s, 'Spec 4.2.1.2: "When a metal atom reacts with a non-metal atom electrons in the outer shell of the metal atom are transferred. Metal atoms lose electrons to become positively charged ions. Non-metal atoms gain electrons to become negatively charged ions. The ions produced by metals in Groups 1 and 2 and by non-metals in Groups 6 and 7 have the electronic structure of a noble gas (Group 0)." Some teachers draw Na⁺ with a full shell of 8 crosses; either is accepted if consistent.');
}

{
  const s = frame('Ionic bonding: MgO and MgCl₂', { tag: '4.2.1.2' });
  const r = 0.55;
  txt(s, 'Magnesium oxide: 2 electrons transferred', MX, 1.35, 6, 0.4, { size: 18, bold: true, color: C.maroon });
  shellAtom(s, MX + 0.9, 2.65, r, 'Mg', [], { ring: 'BBBBBB' }); bracket(s, MX + 0.9, 2.65, r, '2+');
  shellAtom(s, MX + 3.3, 2.65, r, 'O', ['x', 'x', 'o', 'o', 'o', 'o', 'o', 'o']); bracket(s, MX + 3.3, 2.65, r, '2−');
  txt(s, 'Mg 2,8,2 → Mg²⁺ [2,8]      O 2,6 → O²⁻ [2,8]', MX, 3.65, 6, 0.4, { size: 15, bold: true });
  txt(s, 'Magnesium chloride: one electron to each of two Cl atoms', MX, 4.25, 7.5, 0.4, { size: 18, bold: true, color: C.maroon });
  shellAtom(s, MX + 0.9, 5.55, r, 'Cl', ['x', 'o', 'o', 'o', 'o', 'o', 'o', 'o']); bracket(s, MX + 0.9, 5.55, r, '−');
  shellAtom(s, MX + 3.3, 5.55, r, 'Mg', [], { ring: 'BBBBBB' }); bracket(s, MX + 3.3, 5.55, r, '2+');
  shellAtom(s, MX + 5.7, 5.55, r, 'Cl', ['x', 'o', 'o', 'o', 'o', 'o', 'o', 'o']); bracket(s, MX + 5.7, 5.55, r, '−');
  const bx = MX + 7.5, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.95, 'Ion charges from the group', C.green, C.greenSoft);
  table(s, bx + 0.2, 2.15, [(bw - 0.4) / 2, (bw - 0.4) / 2], ['Group', 'Ion'], [['1', '+1  (Na⁺)'], ['2', '+2  (Mg²⁺)'], ['3', '+3  (Al³⁺)'], ['6', '−2  (O²⁻)'], ['7', '−1  (Cl⁻)']], { rh: 0.45, hh: 0.45, size: 15, headFill: C.green, align: ['center', 'left'] });
  note(s, bx, 5.55, bw, 1.3, 'The **total charge** is zero, so MgCl₂ has **two** Cl⁻ for every Mg²⁺.', { size: 16 });
  notes(s, 'Spec 4.2.1.2: "Students should be able to draw dot and cross diagrams for ionic compounds formed by metals in Groups 1 and 2 with non-metals in Groups 6 and 7. The charge on the ions produced by metals in Groups 1 and 2 and by non-metals in Groups 6 and 7 relates to the group number of the element in the periodic table." Group 3 (Al³⁺) and group 5 (N³⁻) also follow the pattern.');
}

D.hinge({
  title: 'Quick check',
  q: 'What happens when magnesium reacts with oxygen?',
  options: ['Mg gives 2 electrons to O', 'Mg and O share 2 electrons', 'O gives 2 electrons to Mg', 'Mg gives 1 electron to O'],
  correct: 0,
  notes: 'Answer A: Mg 2,8,2 loses two; O 2,6 gains two. B describes covalent bonding. C: metals lose electrons, not gain. D would leave Mg⁺ and O⁻, neither with a full shell.',
});

{
  const s = frame('Ionic compounds: giant lattices and formulae', { tag: '4.2.1.3' });
  // 2D lattice
  const gx = MX + 0.4, gy = 1.75, st = 0.62;
  for (let i = 0; i < 6; i++) for (let j = 0; j < 6; j++) {
    const pos = (i + j) % 2 === 0, cx = gx + i * st, cy = gy + j * st;
    circle(s, cx, cy, pos ? 0.4 : 0.56, pos ? 'B9D3EE' : 'C9E7B5', pos ? C.blue : C.green, 1);
    txt(s, pos ? '+' : '−', cx - 0.2, cy - 0.17, 0.4, 0.34, { size: 13, bold: true, align: 'center', valign: 'middle' });
  }
  txt(s, 'Na⁺ (small)   Cl⁻ (large)', gx - 0.3, gy + 6 * st - 0.1, 4.2, 0.35, { size: 14, bold: true, align: 'center' });
  const bx = MX + 4.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.6, 'Giant ionic lattice', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Ions held in a **regular lattice** by **strong electrostatic forces** acting in **all directions**.', 'Many ions, so it is a **giant** structure, not a molecule.'], 17, 0.12);
  rect(s, bx, 4.2, bw, 2.65, C.orangeSoft, 'F3D9B5');
  txt(s, 'Formula from charges: make the total charge zero', bx + 0.25, 4.3, bw - 0.5, 0.45, { size: 17, bold: true, color: C.orange });
  bullets(s, bx + 0.25, 4.8, bw - 0.5, ['Al³⁺ and O²⁻: 2 × (+3) = +6 and 3 × (−2) = −6, so **Al₂O₃**.', 'Keep brackets round groups: Ca²⁺ and OH⁻ give **Ca(OH)₂**.'], 16, 0.12);
  notes(s, 'Spec 4.2.1.3: "An ionic compound is a giant structure of ions. Ionic compounds are held together by strong electrostatic forces of attraction between oppositely charged ions. These forces act in all directions in the lattice and this is called ionic bonding." Students should be able to work out the empirical formula of an ionic compound from a given model or diagram. Common polyatomic ions: OH⁻, NO₃⁻, SO₄²⁻, CO₃²⁻, NH₄⁺.');
}

D.myTurnYourTurn({
  title: 'Formulae of ionic compounds', tag: 'Skill practice', stepSize: 20, labelW: 2.2, labelSize: 17, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Write the formula:',
    steps: [
      { label: 'K⁺ and O²⁻', text: '**K₂O**' },
      { label: 'Al³⁺ and Cl⁻', text: '**AlCl₃**' },
      { label: 'NH₄⁺ and CO₃²⁻', text: '**(NH₄)₂CO₃**' },
    ],
  },
  yours: {
    q: 'Write the formula:',
    steps: [
      { label: 'Li⁺ and S²⁻', text: '**Li₂S**' },
      { label: 'Ca²⁺ and F⁻', text: '**CaF₂**' },
      { label: 'Fe³⁺ and SO₄²⁻', text: '**Fe₂(SO₄)₃**' },
    ],
  },
  notes: 'Each formula is checked in the build script: total positive charge = total negative charge. Fe₂(SO₄)₃: 2 × (+3) = +6, 3 × (−2) = −6.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: covalent bonding', { tag: '4.2.1.4' });
  note(s, MX, 1.35, W - 2 * MX, 0.8, 'A **covalent bond** is a **shared pair of electrons** between two non-metal atoms. The bond is **strong**.', { fill: C.soft, line: C.line, size: 18 });
  const r = 0.7, y = 3.45;
  // H2
  molecule(s, MX + 0.9, y, 0.55, 'H', [{ ang: 0, sym: 'H', r: 0.55 }]);
  txt(s, 'Hydrogen H₂', MX + 0.2, 4.6, 2.4, 0.4, { size: 17, bold: true, align: 'center' });
  // Cl2
  molecule(s, MX + 3.9, y, r, 'Cl', [{ ang: 0, sym: 'Cl', lone: [-90, 0, 90] }], [-90, 180, 90]);
  txt(s, 'Chlorine Cl₂', MX + 3.4, 4.6, 2.6, 0.4, { size: 17, bold: true, align: 'center' });
  // HCl
  molecule(s, MX + 8.5, y, r, 'Cl', [{ ang: 180, sym: 'H', r: 0.55 }], [-90, 0, 90]);
  txt(s, 'Hydrogen chloride HCl', MX + 6.8, 4.6, 3.2, 0.4, { size: 17, bold: true, align: 'center' });
  const kx = MX + 10.2; edot(s, kx + 0.1, 2.6); txt(s, 'from one atom', kx + 0.3, 2.42, 1.9, 0.36, { size: 13 }); ecross(s, kx + 0.1, 3.05); txt(s, 'from the other', kx + 0.3, 2.87, 1.9, 0.36, { size: 13 });
  note(s, MX, 5.3, W - 2 * MX, 1.55, 'Each atom now has a **full outer shell** (H: 2, Cl: 8). Count shared electrons for **both** atoms.\nDisplayed formula: **H–H**, **Cl–Cl**, **H–Cl**. Each line is one shared pair.', { size: 17 });
  notes(s, 'Spec 4.2.1.4: "When atoms share pairs of electrons, they form covalent bonds. These bonds between atoms are strong. Covalently bonded substances may consist of small molecules." Students should be able to draw dot and cross diagrams for the molecules of hydrogen, chlorine, oxygen, nitrogen, hydrogen chloride, water, ammonia and methane. Shells are drawn as overlapping circles; shared pairs sit in the overlap.');
}

{
  const s = frame('Water, ammonia and methane', { tag: '4.2.1.4' });
  const r = 0.7, y = 3.45;
  molecule(s, MX + 1.9, y, r, 'O', [{ ang: 180, sym: 'H', r: 0.52 }, { ang: 90, sym: 'H', r: 0.52 }], [-90, 0]);
  molecule(s, MX + 6.0, y, r, 'N', [{ ang: 180, sym: 'H', r: 0.52 }, { ang: 0, sym: 'H', r: 0.52 }, { ang: 90, sym: 'H', r: 0.52 }], [-90]);
  molecule(s, MX + 10.1, y, r, 'C', [{ ang: 180, sym: 'H', r: 0.52 }, { ang: 0, sym: 'H', r: 0.52 }, { ang: 90, sym: 'H', r: 0.52 }, { ang: -90, sym: 'H', r: 0.52 }]);
  [['Water H₂O', 'O: 2 bonds + 2 lone pairs', MX + 1.5], ['Ammonia NH₃', 'N: 3 bonds + 1 lone pair', MX + 6.0], ['Methane CH₄', 'C: 4 bonds', MX + 10.1]].forEach(([a, b, x]) => {
    txt(s, a, x - 1.6, 1.4, 3.2, 0.42, { size: 19, bold: true, color: C.maroon, align: 'center' });
    txt(s, b, x - 1.8, 5.15, 3.6, 0.4, { size: 16, bold: true, align: 'center' });
  });
  note(s, MX, 5.7, W - 2 * MX, 1.15, 'Number of bonds = electrons needed to fill the shell: C needs **4**, N needs **3**, O needs **2**, H and Cl need **1**. A pair of outer electrons not in a bond is a **lone pair**.', { size: 17 });
  notes(s, 'Spec 4.2.1.4. Shapes are not required: these are flat dot-and-cross diagrams. Every atom is checked in the build script: O 4 + 2 × 2 = 8; N 2 + 3 × 2 = 8; C 4 × 2 = 8; H 1 × 2 = 2.');
}

{
  const s = frame('Double and triple bonds', { tag: '4.2.1.4' });
  const r = 0.72, y = 2.95;
  molecule(s, MX + 1.4, y, r, 'O', [{ ang: 0, sym: 'O', n: 2, lone: [-90, 90] }], [-90, 90]);
  txt(s, 'Oxygen O₂: O=O', MX + 0.6, 4.15, 3.2, 0.4, { size: 18, bold: true, align: 'center' });
  txt(s, '2 shared pairs = **double bond**', MX + 0.3, 4.6, 3.8, 0.4, { size: 16, align: 'center' });
  molecule(s, MX + 6.0, y, r, 'C', [{ ang: 180, sym: 'O', n: 2, lone: [-90, 90] }, { ang: 0, sym: 'O', n: 2, lone: [-90, 90] }]);
  txt(s, 'Carbon dioxide CO₂: O=C=O', MX + 4.3, 4.15, 3.4, 0.4, { size: 18, bold: true, align: 'center' });
  const bx = MX + 8.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.6, 'Nitrogen N₂: N≡N', C.maroon, C.soft);
  txt(s, 'Each N (2,5) needs **3** more electrons, so they share **3 pairs**: a **triple bond**. Each N also has one **lone pair**.', bx + 0.2, 2.1, bw - 0.4, 2.7, { size: 17 });
  note(s, MX, 5.3, W - 2 * MX, 1.55, 'Check every atom: count its **own** electrons plus **all** the shared electrons. In O₂: 4 lone + 4 shared = **8**. In CO₂, carbon has 4 pairs shared = **8**.', { size: 17 });
  notes(s, 'Spec 4.2.1.4: oxygen and nitrogen are in the required list; carbon dioxide is a useful extra (it appears in 4.9 and 4.7). Triple bond drawn in words only to keep the slide clear; students can try drawing N₂ on whiteboards.');
}

{
  const s = frame('Representing molecules: limitations', { tag: '4.2.1.4' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.24, tw * 0.38, tw * 0.38], ['Model', 'Shows', 'Does not show'], [
    ['Dot and cross', 'which atom each electron came from; bonds', 'the shape (3D); relative sizes'],
    ['Displayed formula (H–O–H)', 'which atoms are bonded, with single and double bonds', 'the shape; lone pairs; which electrons'],
    ['Ball and stick', 'the 3D shape', 'bonds as sticks (really shared electrons); sizes'],
    ['Space filling (3D)', 'relative sizes and shape', 'the bonds; atoms at the back'],
  ], { rh: 0.9, size: 16 });
  note(s, MX, 5.75, tw, 1.1, 'Small molecules (H₂O, CH₄) are **simple**. Some covalent substances are **polymers** (long chains) or **giant covalent** structures (diamond, silicon dioxide): see lesson 3.', { size: 16 });
  notes(s, 'Spec 4.2.1.4: "Students should be able to: represent the covalent bonds in small molecules, in the repeating units of polymers and in part of giant covalent structures, using a line to represent a single bond; describe the limitations of using dot and cross, ball and stick, two and three dimensional diagrams to represent molecules or giant structures; deduce the molecular formula of a substance from a given model or diagram."');
}

D.hinge({
  title: 'Quick check',
  q: 'How many lone pairs does the oxygen atom in water have?',
  options: ['2', '1', '0', '4'],
  correct: 0,
  notes: 'Answer A: O has 6 outer electrons; 2 are used in bonds (with 2 from the H atoms), leaving 4 = 2 lone pairs. B confuses with ammonia. C confuses with methane. D counts electrons not pairs.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: metallic bonding', { tag: '4.2.1.5' });
  const gx = MX + 0.6, gy = 1.85, st = 0.95;
  rect(s, MX, 1.4, 5.6, 4.0, 'EEF3FB', C.line);
  for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) {
    const cx = gx + i * st + 0.25, cy = gy + j * st + 0.2;
    circle(s, cx, cy, 0.66, 'F2C9A0', 'B5782E', 1.25);
    txt(s, '+', cx - 0.2, cy - 0.2, 0.4, 0.4, { size: 18, bold: true, align: 'center', valign: 'middle' });
  }
  for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) ecross(s, gx + 0.25 + (i + 0.5) * st, gy + 0.2 + (j + 0.5) * st);
  [[-0.5, 0.5], [4.5, 1.5], [1.5, -0.45], [2.5, 3.45], [-0.5, 2.5], [4.5, 3.4]].forEach(([a, b]) => ecross(s, gx + 0.25 + a * st, gy + 0.2 + b * st));
  txt(s, '+ = metal ion     × = delocalised electron', MX, 5.45, 5.6, 0.4, { size: 15, bold: true, align: 'center' });
  const bx = MX + 6.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'How it works', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Metals are **giant structures** of atoms in a regular pattern.', 'The **outer electrons** are **delocalised**: free to move through the whole structure.', 'This leaves **positive metal ions**.', 'The bond is the **strong electrostatic attraction** between the positive ions and the **shared, delocalised electrons**.'], 17, 0.18);
  notes(s, 'Spec 4.2.1.5: "Metals consist of giant structures of atoms arranged in a regular pattern. The electrons in the outer shell of metal atoms are delocalised and so are free to move through the whole structure. The sharing of delocalised electrons gives rise to strong metallic bonds." Properties of metals (conduction, malleability) are in lesson 2. Students should be able to recognise substances as metallic giant structures from diagrams.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which substance has metallic bonding?',
  options: ['Copper', 'Copper oxide', 'Carbon dioxide', 'Chlorine'],
  correct: 0,
  notes: 'Answer A: a metal element. B is ionic (metal + non-metal). C and D are covalent (non-metals only).',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is an ionic bond?', 'Electrostatic attraction between oppositely charged ions'], ['What is a covalent bond?', 'A shared pair of electrons'], ['What charge does a group 6 ion have?', '2−'], ['What are delocalised electrons?', 'Electrons free to move through the structure'],
    ['Write the formula of magnesium nitride (Mg²⁺, N³⁻).', 'Mg₃N₂'], ['Name the bonding in: (a) CaO  (b) NH₃  (c) Zn', '(a) ionic (b) covalent (c) metallic'],
    ['How many shared pairs in methane?', '4'], ['Give one limitation of a ball-and-stick model.', 'Bonds are not really sticks / sizes not shown'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) strong electrostatic attraction between oppositely charged ions  2) a shared pair of electrons between two atoms  3) 2− (gains 2 electrons)  4) outer electrons free to move through the whole metal  5) Mg₃N₂: 3 × (+2) = +6, 2 × (−3) = −6  6) ionic, covalent, metallic  7) 4  8) bonds shown as sticks; atoms not to scale; electrons not shown.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Describe what happens when sodium reacts with oxygen to form sodium oxide, Na₂O. Refer to electrons.', m: 4, lines: 2 },
    { l: 'b', q: 'Draw a dot-and-cross diagram for ammonia, NH₃. Show outer electrons only.', m: 2, lines: 1 },
    { l: 'c', q: 'Describe the bonding in a metal.', m: 3, lines: 1 },
    { l: 'd', q: 'Give the formula of calcium hydroxide.', m: 1, lines: 0 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'each Na atom loses one electron; O gains two electrons; two Na atoms needed / Na⁺ and O²⁻ formed; ions have full outer shells / noble gas structure', '4', ''],
    ['(b)', 'three shared pairs between N and H; one lone pair on N', '2', ''],
    ['(c)', 'positive metal ions in a lattice; delocalised electrons; strong electrostatic attraction between them', '3', ''],
    ['(d)', 'Ca(OH)₂', '1', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});
charge('exam Na2O', [[2, 1], [1, -2]]);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Which type of bond forms between a metal and a non-metal?', 'Write the formula of calcium oxide.', 'How many electrons are in a double bond?', 'Why can metals have strong bonds?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) ionic  2) CaO  3) four (two shared pairs)  4) strong attraction between positive ions and delocalised electrons. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw dot-and-cross diagrams to show how lithium fluoride forms.',
    'Draw the dot-and-cross diagram for calcium chloride.',
    'Write formulae: Al³⁺ + O²⁻; Na⁺ + SO₄²⁻; Mg²⁺ + NO₃⁻.',
    'Draw dot-and-cross diagrams for water and methane.',
    'Explain why oxygen, O₂, has a double bond.',
    'Compare ionic, covalent and metallic bonding in a table.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) Li gives one electron to F: [Li]⁺ [F]⁻  2) [Cl]⁻ [Ca]²⁺ [Cl]⁻  3) Al₂O₃; Na₂SO₄; Mg(NO₃)₂  4) see Part 3  5) each O (2,6) needs 2 electrons, so two shared pairs  6) see Part 1.');
}
charge('HW Mg(NO3)2', [[1, 2], [2, -1]]); charge('HW LiF', [[1, 1], [1, -1]]);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.2_A_Bonding.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
