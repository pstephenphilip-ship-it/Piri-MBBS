// build_4_2_C.js — AQA GCSE Chemistry (8462) 4.2 Bonding, structure and properties of matter, lesson 3 of 3:
// 4.2.3.1 Diamond, 4.2.3.2 Graphite, 4.2.3.3 Graphene and fullerenes,
// 4.2.4.1 Sizes of particles and their properties (chemistry only), 4.2.4.2 Uses of nanoparticles (chemistry only).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_2_C.js
'use strict';
const path = require('path');
const { T, C, calc, deck, helpers } = require('./chem_common');

const D = T.init(deck('4.2.3–4.2.4', 'Carbon and nanoscience'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const near = (l, a, b) => calc(l, a, b, 1e-9 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
const sa = a => 6 * a * a, vol = a => a ** 3, ratio = a => sa(a) / vol(a);
near('cube 2 SA', sa(2), 24); near('cube 2 V', vol(2), 8); near('cube 2 ratio', ratio(2), 3);
near('cube 1 ratio', ratio(1), 6); near('cube 10 ratio', ratio(10), 0.6);
near('MT 3', ratio(3), 2); near('MT 6', ratio(6), 1); near('MT factor', ratio(3) / ratio(6), 2);
near('YT 4', ratio(4), 1.5); near('YT 5', ratio(5), 1.2); near('YT 0.5', ratio(0.5), 12);
near('factor 10', ratio(1) / ratio(10), 10);
// sizes
near('50 nm in m', 50e-9, 5e-8); near('100 nm in m', 100e-9, 1e-7); near('2500 nm in m', 2500e-9, 2.5e-6);
near('exam times', 5000 / 20, 250); near('exam m', 20e-9, 2e-8);
near('nano vs atom', 100 / 0.1, 1000);
near('practice 0.1 um in nm', 0.1 * 1000, 100);

// ======================= drawings =======================
function hex(s, cx, cy, r, color = C.ink, w = 2) {
  const P = [...Array(6)].map((_, k) => { const a = (Math.PI / 3) * k + Math.PI / 6; return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
  P.forEach((p, k) => { const q = P[(k + 1) % 6]; seg(s, p[0], p[1], q[0], q[1], color, w); });
  return P;
}
// honeycomb sheet of hexagons
function sheet(s, x, y, cols, rows, r, color, dots = true) {
  const dx = r * Math.sqrt(3), dy = r * 1.5, pts = [];
  for (let j = 0; j < rows; j++) for (let i = 0; i < cols; i++) {
    const cx = x + i * dx + (j % 2 ? dx / 2 : 0), cy = y + j * dy;
    pts.push(...hex(s, cx, cy, r, color, 1.75));
  }
  if (dots) pts.forEach(([a, b]) => circle(s, a, b, 0.11, '555555'));
}
// diamond: 2D sketch of each carbon joined to four others
function diamondSketch(s, x, y) {
  const P = [];
  for (let j = 0; j < 4; j++) for (let i = 0; i < 5; i++) P.push([x + i * 0.8 + (j % 2 ? 0.4 : 0), y + j * 0.7]);
  P.forEach(([a, b], k) => {
    const i = k % 5, j = Math.floor(k / 5);
    if (i < 4) seg(s, a, b, P[k + 1][0], P[k + 1][1], C.ink, 2.25);
    if (j < 3) { seg(s, a, b, P[k + 5][0], P[k + 5][1], C.ink, 2.25); const n2 = j % 2 ? k + 6 : k + 4; if (j % 2 ? i < 4 : i > 0) seg(s, a, b, P[n2][0], P[n2][1], C.ink, 2.25); }
  });
  P.forEach(([a, b]) => circle(s, a, b, 0.3, '7F8C8D', '333333', 1));
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Diamond, graphite, graphene and fullerenes, nanoparticles, surface area to volume ratio, and the uses and risks of nanoparticles',
  bullets: ['Part 1: diamond and graphite (4.2.3.1, 4.2.3.2)', 'Part 2: graphene and fullerenes (4.2.3.3)', 'Part 3: sizes of particles; surface area to volume (4.2.4.1)', 'Part 4: uses and risks of nanoparticles (4.2.4.2)'],
  notes: 'AQA 8462 GCSE Chemistry 4.2, lesson 3 of 3. Nanoscience (4.2.4) is in the separate science specification only. Carbon structures are simplified 2D sketches. About two hours.',
});

D.objectives({
  tag: '4.2.3',
  items: [
    'Explain the properties of **diamond** and **graphite** from their structures.',
    'Describe **graphene**, **fullerenes** and **nanotubes** and their uses.',
    'Compare **nanoparticles** with coarse particles and calculate **surface area : volume**.',
    'Evaluate the **uses** and **risks** of nanoparticles.',
  ],
  keywords: ['diamond', 'graphite', 'graphene', 'fullerene', 'nanotube', 'nanoparticle', 'surface area'],
  notes: 'Share the objectives. Builds on giant covalent structures from lesson 2.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Why does a giant covalent substance have a high melting point?', 'Why does a metal conduct electricity?', 'Write 0.000 000 1 m in standard form.', 'How many nanometres are in 1 micrometre?'],
  answers: ['many strong covalent bonds to break', 'delocalised electrons carry charge', '1 × 10^{−7} m', '1000'],
  notes: 'Retrieval from lesson 2, plus the standard form and unit skills needed in Part 3.',
});

D.vocab({
  title: 'Key words', tag: '4.2.3',
  items: [
    { term: 'Allotropes', def: 'Different forms of the **same element** in the same state, e.g. diamond and graphite are both carbon.' },
    { term: 'Fullerene', def: 'A molecule of carbon atoms with a **hollow** shape: a cage or a tube. Rings of 5, 6 or 7 atoms.' },
    { term: 'Nanoparticle', def: 'A particle **1–100 nm** across (a few hundred atoms).' },
    { term: 'Surface area : volume', def: 'How much **surface** a particle has for its **size**. Smaller particles have a **larger** ratio.' },
  ],
  notes: '"Allotrope" is not on the specification by name but is a useful word. 1 nm = 1 × 10⁻⁹ m.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: diamond', { tag: '4.2.3.1' });
  diamondSketch(s, MX + 0.6, 1.9);
  txt(s, 'Each carbon atom is bonded to **four** others', MX, 4.35, 4.6, 0.5, { size: 15, bold: true, align: 'center' });
  const bx = MX + 5.0, bw = W - MX - bx;
  table(s, bx, 1.4, [bw * 0.33, bw * 0.67], ['Property', 'Explanation'], [
    ['Very hard', 'each C atom has **4 strong covalent bonds** in a rigid giant structure'],
    ['Very high melting point', 'many strong covalent bonds must be **broken**: lots of energy'],
    ['Does not conduct', '**no delocalised electrons**: all 4 outer electrons are in bonds'],
  ], { rh: 1.05, size: 16 });
  note(s, MX, 5.2, W - 2 * MX, 1.65, '**Uses:** cutting tools and drill tips (very hard), jewellery. The real structure is 3D (tetrahedral); this sketch is flattened.', { size: 17 });
  notes(s, 'Spec 4.2.3.1: "In diamond, each carbon atom forms four covalent bonds with other carbon atoms in a giant covalent structure, so diamond is very hard, has a very high melting point and does not conduct electricity." Students should be able to explain the properties of diamond in terms of its structure and bonding.');
}

{
  const s = frame('Graphite', { tag: '4.2.3.2' });
  const r = 0.32;
  [0, 1, 2].forEach(k => {
    sheet(s, MX + 0.55, 1.7 + k * 1.2, 7, 1, r, C.ink, true);
    if (k < 2) for (let i = 0; i < 6; i++) seg(s, MX + 0.75 + i * 0.6, 2.05 + k * 1.2, MX + 0.75 + i * 0.6, 2.85 + k * 1.2, C.red, 1.25, { dash: 'dash' });
  });
  txt(s, 'layers of hexagons;  - - weak forces between layers', MX, 4.65, 5.2, 0.4, { size: 14, bold: true, align: 'center' });
  const bx = MX + 5.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.55, 'Structure and properties', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Each carbon is bonded to **three** others, forming **layers of hexagonal rings**.', '**Weak forces between layers**, so layers **slide**: **soft and slippery**.', 'High melting point: strong covalent bonds within layers.', 'Each carbon has **one delocalised electron**, so graphite **conducts** electricity and heat.'], 16, 0.12);
  note(s, MX, 5.2, W - 2 * MX, 1.65, '**Uses:** pencil "lead", lubricants, electrodes in electrolysis. Graphite is similar to **metals**: it has delocalised electrons.', { size: 17 });
  notes(s, 'Spec 4.2.3.2: "In graphite, each carbon atom forms three covalent bonds with three other carbon atoms, forming layers of hexagonal rings which have no covalent bonds between the layers. In graphite, one electron from each carbon atom is delocalised. Students should be able to explain the properties of graphite in terms of its structure and bonding. Students should know that graphite is similar to metals in that it has delocalised electrons."');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does graphite conduct electricity but diamond does not?',
  options: ['Graphite has delocalised electrons', 'Graphite has weaker covalent bonds', 'Graphite contains ions', 'Diamond has no outer electrons'],
  correct: 0,
  notes: 'Answer A: each C in graphite forms 3 bonds, leaving 1 delocalised electron. B: covalent bonds in graphite are actually very strong; the bond strength is not why it conducts. C: graphite is not ionic. D: diamond has 4 outer electrons per C but all are used in bonds.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: graphene', { tag: '4.2.3.3' });
  sheet(s, MX + 0.6, 1.85, 8, 4, 0.36, C.ink, true);
  txt(s, 'One layer of graphite: one atom thick', MX, 4.65, 6.2, 0.4, { size: 15, bold: true, align: 'center' });
  const bx = MX + 6.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.6, 'Properties', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['A **single layer** of graphite.', 'Very **strong** (strong covalent bonds) and very **light**.', '**Conducts** electricity: delocalised electrons.', 'Almost **transparent**.'], 17, 0.13);
  note(s, MX, 5.25, W - 2 * MX, 1.6, '**Uses:** electronics (flexible screens, faster chips) and **composites** (to make materials stronger and lighter).', { size: 17 });
  notes(s, 'Spec 4.2.3.3: "Graphene is a single layer of graphite and has properties that make it useful in electronics and composites. Students should be able to explain the properties of graphene in terms of its structure and bonding."');
}

{
  const s = frame('Fullerenes and nanotubes', { tag: '4.2.3.3' });
  // C60 sketch: circle with hexagons and pentagons hinted
  const cx = MX + 1.9, cy = 2.75;
  circle(s, cx, cy, 2.4, 'F4F2F3', C.ink, 2);
  hex(s, cx, cy, 0.42, C.ink, 1.75); hex(s, cx - 0.72, cy - 0.42, 0.38, C.ink, 1.5); hex(s, cx + 0.72, cy - 0.42, 0.38, C.ink, 1.5); hex(s, cx, cy + 0.82, 0.38, C.ink, 1.5); hex(s, cx - 0.72, cy + 0.42, 0.3, C.ink, 1.25); hex(s, cx + 0.72, cy + 0.42, 0.3, C.ink, 1.25);
  txt(s, 'Buckminsterfullerene C₆₀', MX, 4.1, 3.8, 0.4, { size: 16, bold: true, align: 'center' });
  txt(s, 'hollow sphere, 60 carbon atoms (hexagons and pentagons)', MX, 4.5, 3.8, 0.7, { size: 13, align: 'center', color: C.grey });
  // nanotube: cylinder
  const tx = MX + 4.2, ty = 2.2, tl = 3.6, th = 1.1;
  rect(s, tx, ty, tl, th, 'F4F2F3', 'F4F2F3');
  seg(s, tx, ty, tx + tl, ty, C.ink, 2); seg(s, tx, ty + th, tx + tl, ty + th, C.ink, 2);
  s.addShape(D.SH.ellipse, { x: tx - 0.25, y: ty, w: 0.5, h: th, fill: { color: 'E3E3E3' }, line: { color: C.ink, width: 2 } });
  s.addShape(D.SH.ellipse, { x: tx + tl - 0.25, y: ty, w: 0.5, h: th, fill: { color: 'FFFFFF', transparency: 100 }, line: { color: C.ink, width: 2 } });
  for (let i = 0; i < 5; i++) hex(s, tx + 0.6 + i * 0.6, ty + th / 2, 0.3, C.grey, 1.25);
  txt(s, 'Carbon nanotube', tx, 3.55, tl, 0.4, { size: 16, bold: true, align: 'center' });
  txt(s, 'a cylinder of carbon: very high length to diameter ratio', tx - 0.2, 3.95, tl + 0.4, 0.7, { size: 13, align: 'center', color: C.grey });
  const bx = MX + 8.2, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.8, 'Uses', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Delivering drugs** into the body (hollow cages).', '**Lubricants**.', '**Catalysts**: huge surface area.', 'Nanotubes: **reinforcing** materials (tennis rackets), **electronics** (high tensile strength, conductivity).'], 15, 0.1);
  note(s, MX, 5.45, W - 2 * MX, 1.4, '**Fullerenes**: molecules of carbon atoms with hollow shapes, based on **hexagonal rings** (sometimes rings of 5 or 7). The first discovered was C₆₀.', { size: 17 });
  notes(s, 'Spec 4.2.3.3: "Fullerenes are molecules of carbon atoms with hollow shapes. The structure of fullerenes is based on hexagonal rings of carbon atoms but they may also contain rings with five or seven carbon atoms. The first fullerene to be discovered was Buckminsterfullerene (C60) which has a spherical shape. Carbon nanotubes are cylindrical fullerenes with very high length to diameter ratios. Their properties make them useful for nanotechnology, electronics and materials. Students should be able to recognise graphene and fullerenes from diagrams and descriptions of their bonding and structure; give examples of the uses of fullerenes, including carbon nanotubes." C₆₀ is drawn as a simplified sketch.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which form of carbon is a single layer of atoms?',
  options: ['Graphene', 'Graphite', 'Diamond', 'Buckminsterfullerene'],
  correct: 0,
  notes: 'Answer A. B is many layers. C is a 3D giant structure. D is a hollow sphere, C₆₀.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: sizes of particles', { tag: '4.2.4.1' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.3, tw * 0.35, tw * 0.35], ['Particle', 'Diameter (nm)', 'Diameter (m)'], [
    ['Atom', 'about 0.1 nm', '1 × 10^{−10} m'],
    ['Nanoparticle', '1 to 100 nm', '1 × 10^{−9} to 1 × 10^{−7} m'],
    ['Fine particle (PM2.5)', '100 to 2500 nm', '1 × 10^{−7} to 2.5 × 10^{−6} m'],
    ['Coarse particle (PM10, dust)', '2500 to 10 000 nm', '2.5 × 10^{−6} to 1 × 10^{−5} m'],
  ], { rh: 0.72, size: 17 });
  note(s, MX, 5.0, tw, 1.85, 'Nanoparticles are only a **few hundred atoms** across. Because they are so small, they can have **different properties** from the same material in bulk: a much **larger surface area to volume ratio**, so they can be better **catalysts**, and less is needed.', { size: 17 });
  notes(s, 'Spec 4.2.4.1: "Nanoscience refers to structures that are 1–100 nm in size, of the order of a few hundred atoms. Nanoparticles, are smaller than fine particles (PM2.5), which have diameters between 100 and 2500 nm (1 x 10⁻⁷ m and 2.5 x 10⁻⁶ m). Coarse particles (PM10) have diameters between 1 x 10⁻⁵ m and 2.5 x 10⁻⁶ m. Coarse particles are often referred to as dust. As the side of cube decreases by a factor of 10 the surface area to volume ratio increases by a factor of 10. Nanoparticles may have properties different from those for the same materials in bulk because of their high surface area to volume ratio. It may also mean that smaller quantities are needed to be effective than for materials with normal particle sizes."');
}

{
  const s = frame('Surface area to volume ratio', { tag: '4.2.4.1' });
  // two cubes drawn as squares with depth
  const cube = (x, y, a) => { const d = a * 0.35; rect(s, x, y + d, a, a, 'CFE0F5', C.blue, { lw: 1.5 }); seg(s, x, y + d, x + d, y, C.blue, 1.5); seg(s, x + a, y + d, x + a + d, y, C.blue, 1.5); seg(s, x + d, y, x + a + d, y, C.blue, 1.5); seg(s, x + a + d, y, x + a + d, y + a, C.blue, 1.5); seg(s, x + a, y + a + d, x + a + d, y + a, C.blue, 1.5); };
  cube(MX + 0.4, 1.6, 1.6); txt(s, 'side 2 cm', MX + 0.4, 3.85, 2.2, 0.35, { size: 15, bold: true, align: 'center' });
  cube(MX + 3.2, 2.4, 0.8); txt(s, 'side 1 cm', MX + 2.9, 3.85, 1.8, 0.35, { size: 15, bold: true, align: 'center' });
  rect(s, MX, 4.4, 5.4, 2.45, C.soft, C.line);
  D.math(s, MX + 0.3, 5.05, ['SA : V = ', { n: '6a²', d: 'a³' }, ' = ', { n: '6', d: 'a' }], { size: 22, bold: true });
  txt(s, 'for a cube of side a', MX + 0.3, 5.85, 5, 0.4, { size: 15, italic: true, color: C.grey });
  const bx = MX + 5.8, bw = W - MX - bx;
  rect(s, bx, 1.4, bw, 3.6, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', bx + 0.3, 1.5, 5, 0.45, { size: 19, bold: true, color: C.orange });
  const L = [['Side 2 cm', 'SA = 6 × 2² = 24 cm²;  V = 8 cm³;  ratio **3 : 1**'], ['Side 1 cm', 'SA = 6 cm²;  V = 1 cm³;  ratio **6 : 1**'], ['So', 'halving the side **doubles** the ratio']];
  L.forEach(([a, b], i) => { txt(s, a, bx + 0.3, 2.05 + i * 0.95, 1.6, 0.8, { size: 17, bold: true, color: C.maroon }); txt(s, b, bx + 1.9, 2.05 + i * 0.95, bw - 2.2, 0.9, { size: 17 }); });
  note(s, bx, 5.2, bw, 1.65, 'If the side gets **10 times smaller**, the surface area to volume ratio gets **10 times bigger**.', { size: 18 });
  notes(s, 'Spec 4.2.4.1: "Students should be able to compare ‘nano’ dimensions to typical dimensions of atoms and molecules." Maths: surface area and volume of a cube; ratio. Check: 6 ÷ 2 = 3; 6 ÷ 1 = 6; 6 ÷ 10 = 0.6, so a factor of 10 smaller side gives a factor of 10 bigger ratio.');
}

D.myTurnYourTurn({
  title: 'Surface area to volume', tag: 'Maths skill', stepSize: 19, labelW: 1.6, labelSize: 17, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Find SA : V for a cube of side:',
    steps: [
      { label: '3 cm', text: '54 ÷ 27 = **2 : 1**' },
      { label: '6 cm', text: '216 ÷ 216 = **1 : 1**' },
      { label: 'Compare', text: 'half the side, **2 ×** the ratio' },
    ],
  },
  yours: {
    q: 'Find SA : V for a cube of side:',
    steps: [
      { label: '4 cm', text: '96 ÷ 64 = **1.5 : 1**' },
      { label: '5 cm', text: '150 ÷ 125 = **1.2 : 1**' },
      { label: '0.5 cm', text: '1.5 ÷ 0.125 = **12 : 1**' },
    ],
  },
  notes: 'SA = 6a², V = a³, so the ratio is 6 ÷ a. Mine: 6 ÷ 3 = 2, 6 ÷ 6 = 1. Yours: 6 ÷ 4 = 1.5, 6 ÷ 5 = 1.2, 6 ÷ 0.5 = 12. All checked in the build script.',
});

D.hinge({
  title: 'Quick check',
  q: 'A cube’s side is made 10 times smaller. What happens to its surface area to volume ratio?',
  options: ['10 times bigger', '10 times smaller', '100 times bigger', 'It stays the same'],
  correct: 0,
  notes: 'Answer A: ratio = 6 ÷ a, so dividing a by 10 multiplies the ratio by 10. C confuses with area (which falls by 100). B and D are wrong directions.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: uses of nanoparticles', { tag: '4.2.4.2' });
  const gap = 0.25, cw = (W - 2 * MX - 2 * gap) / 3, h = 2.55;
  const cards = [
    ['Medicine', 'Delivering **drugs** to exactly where they are needed in the body.'],
    ['Electronics', 'Tiny, fast components; conductive inks.'],
    ['Cosmetics', 'Sun creams that **absorb UV** but go on clear; deodorants.'],
    ['Catalysts', 'Huge **surface area**, so less catalyst is needed.'],
    ['Fabrics', '**Silver** nanoparticles kill bacteria in socks and plasters.'],
    ['New materials', 'Nanotubes make strong, light **composites**.'],
  ];
  cards.forEach(([a, b], i) => { const x = MX + (i % 3) * (cw + gap), y = 1.4 + Math.floor(i / 3) * (h + 0.3); headCard(s, x, y, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, y + 0.75, cw - 0.4, h - 0.9, { size: 18 }); });
  notes(s, 'Spec 4.2.4.2: "Nanoparticles have many applications in medicine, in electronics, in cosmetics and sun creams, as deodorants, and as catalysts. New applications for nanoparticulate materials are an important area of research. Students should consider advantages and disadvantages of the applications of these nanoparticulate materials, but do not need to know specific examples or properties other than those specified." Silver and sun creams are illustrative examples.');
}

{
  const s = frame('Nanoparticles: benefits and risks', { tag: '4.2.4.2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.6, 'Benefits', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['**Smaller amounts** needed: cheaper, less waste.', 'New properties not seen in bulk materials.', 'Targeted medicine with fewer side effects.', 'Better sun protection without white marks.'], 17, 0.14);
  headCard(s, MX + cw + gap, 1.4, cw, 3.6, 'Risks', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['So small they may be **absorbed into the body** (through skin or lungs) and **into cells**.', '**Long-term effects** on health and the environment are **not yet known**.', 'Hard to remove from water once released.'], 17, 0.14);
  note(s, MX, 5.25, W - 2 * MX, 1.6, '**Evaluate:** weigh the benefits against the risks, and say that **more research** and **testing** are needed before wider use.', { size: 18 });
  notes(s, 'Spec 4.2.4.2: students should "evaluate the use of nanoparticles for a specified purpose; explain that there are possible risks associated with the use of nanoparticles." A balanced 6-mark answer gives benefits, risks and a justified conclusion.');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['How many bonds does each carbon form in diamond?', '4'], ['Why is graphite soft?', 'Weak forces between layers, so layers slide'], ['What is graphene?', 'A single layer of graphite'], ['What size range are nanoparticles?', '1–100 nm'],
    ['Find SA : V for a cube of side 10 cm.', '0.6 : 1'], ['Why are nanoparticles good catalysts?', 'Large surface area to volume ratio'],
    ['Convert 50 nm to metres in standard form.', '5 × 10^{−8} m'], ['Give one risk of nanoparticles in sun cream.', 'May enter cells; long-term effects unknown'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) four  2) weak intermolecular forces between layers allow them to slide  3) a single layer of graphite, one atom thick  4) 1–100 nm  5) SA 600 cm², V 1000 cm³, ratio 0.6 : 1  6) high surface area to volume ratio, so more particles exposed to react; less needed  7) 50 × 10⁻⁹ = 5 × 10⁻⁸ m  8) may be absorbed through the skin into cells; long-term effects unknown.');
  }
}
near('practice 10 SA', sa(10), 600); near('practice 10 V', vol(10), 1000);

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Explain why graphite conducts electricity and is soft, but diamond does not conduct and is hard.', m: 4, lines: 2 },
    { l: 'b', q: 'A nanoparticle is 20 nm across. A dust particle is 5000 nm across. How many times bigger is the dust particle? Give 20 nm in metres in standard form.', m: 2, lines: 1 },
    { l: 'c', q: 'Silver nanoparticles are added to socks to kill bacteria. Evaluate this use.', m: 4, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'graphite: each C bonded to 3, one delocalised electron per C carries charge; weak forces between layers so layers slide; diamond: each C bonded to 4, no delocalised electrons; rigid giant structure of strong bonds so hard', '4', ''],
    ['(b)', '5000 ÷ 20 = 250 times; 2 × 10⁻⁸ m', '2', ''],
    ['(c)', 'benefit: large surface area to volume ratio so effective in small amounts; stops smells / infection; risk: may be absorbed through skin / into cells; may wash out into water and harm organisms; conclusion with reason', '4', 'max 3 without a conclusion'],
  ],
  notes: 'Mark scheme on the next slide. 5000 ÷ 20 = 250; 20 nm = 20 × 10⁻⁹ = 2 × 10⁻⁸ m.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Give one use of diamond and explain it.', 'Why does graphite conduct?', 'What is C₆₀?', 'SA : V of a cube of side 2 cm?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) cutting tools, because it is very hard (4 strong covalent bonds per atom)  2) one delocalised electron per carbon atom  3) buckminsterfullerene, a hollow sphere of 60 carbon atoms  4) 24 : 8 = 3 : 1. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw and label the structures of diamond and graphite.',
    'Compare graphite and graphene (two similarities, one difference).',
    'Give two uses of carbon nanotubes and the property behind each.',
    'Find SA : V for cubes of side 1 cm, 0.1 cm and 0.01 cm. What pattern do you see?',
    'Write 1 nm, 100 nm and 2500 nm in metres, in standard form.',
    'Should nanoparticles be used in sun creams? Give a balanced answer.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) see Part 1  2) both: hexagonal carbon rings, conduct, strong covalent bonds; difference: graphene is one layer  3) reinforcing materials (high tensile strength); electronics (conduct)  4) 6, 60, 600: each time the side is 10 times smaller, the ratio is 10 times bigger  5) 1 × 10⁻⁹ m; 1 × 10⁻⁷ m; 2.5 × 10⁻⁶ m  6) benefits (better UV protection, clear) vs risks (absorbed into cells, unknown effects), with a conclusion.');
}
near('HW 0.1', ratio(0.1), 60); near('HW 0.01', ratio(0.01), 600);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.2_C_CarbonNanoscience.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
