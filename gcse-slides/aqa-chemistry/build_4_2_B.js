// build_4_2_B.js — AQA GCSE Chemistry (8462) 4.2 Bonding, structure and properties of matter, lesson 2 of 3:
// 4.2.2.1 The three states of matter, 4.2.2.2 State symbols, 4.2.2.3 Properties of ionic compounds,
// 4.2.2.4 Properties of small molecules, 4.2.2.5 Polymers, 4.2.2.6 Giant covalent structures,
// 4.2.2.7 Properties of metals and alloys, 4.2.2.8 Metals as conductors.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_2_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, helpers } = require('./chem_common');

const D = T.init(deck('4.2.2', 'Structure and properties'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);

// ======================= checks =======================
// state at temperature t from melting point mp and boiling point bp (°C): 0 solid, 1 liquid, 2 gas
const state = (mp, bp, t) => (t < mp ? 0 : t < bp ? 1 : 2);
const S = ['solid', 'liquid', 'gas'];
const st = (label, mp, bp, t, want) => calc('state ' + label, state(mp, bp, t), S.indexOf(want));
st('ethanol 25', -114, 78, 25, 'liquid');
st('MT bromine 25', -7, 59, 25, 'liquid'); st('MT NaCl 1000', 801, 1413, 1000, 'liquid'); st('MT oxygen -220', -218, -183, -220, 'solid');
st('YT mercury 25', -39, 357, 25, 'liquid'); st('YT iodine 200', 114, 184, 200, 'gas'); st('YT sulfur 25', 115, 445, 25, 'solid');
st('exam A', -182, -162, 25, 'gas'); st('exam B', 1710, 2230, 25, 'solid'); st('exam C', 0, 100, 25, 'liquid');
st('hinge Cl2', -101, -34, 25, 'gas'); st('practice X', -95, 69, 80, 'gas');
// temperature range for liquid
calc('ethanol liquid range', 78 - -114, 192);

// ======================= drawings =======================
function particleBox(s, x, y, w, h, kind) {
  rect(s, x, y, w, h, C.white, C.grey, { lw: 1.5 });
  const d = 0.36, col = 'E07B39', line = 'A04F1C';
  if (kind === 'solid') {
    for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) circle(s, x + 0.35 + i * d, y + h - 0.3 - j * d, d - 0.01, col, line, 1);
  } else if (kind === 'liquid') {
    const P = [[0.3, 0.3], [0.66, 0.28], [1.02, 0.31], [1.38, 0.3], [1.74, 0.28], [0.48, 0.62], [0.84, 0.6], [1.22, 0.64], [1.58, 0.6], [0.3, 0.95], [0.7, 0.94], [1.1, 0.97], [1.48, 0.93], [1.84, 0.95]];
    P.forEach(([a, b]) => circle(s, x + a + 0.05, y + h - b, d - 0.01, col, line, 1));
  } else {
    [[0.35, 0.4], [1.4, 0.35], [0.9, 1.0], [1.85, 1.2], [0.4, 1.55], [1.3, 1.75], [0.75, 0.62], [1.75, 0.55]].forEach(([a, b]) => circle(s, x + a, y + b, d - 0.01, col, line, 1));
  }
}
// two small molecules, each with strong bonds inside and weak forces between (dashed)
function smallMolecules(s, x, y) {
  const mol = (cx, cy) => { circle(s, cx, cy, 0.5, '9DC3E6', C.blue, 1); circle(s, cx + 0.42, cy, 0.5, '9DC3E6', C.blue, 1); seg(s, cx + 0.05, cy, cx + 0.37, cy, C.ink, 3); };
  mol(x, y); mol(x + 1.6, y + 0.6); mol(x + 0.2, y + 1.5);
  seg(s, x + 0.7, y + 0.15, x + 1.35, y + 0.5, C.red, 1.5, { dash: 'dash' });
  seg(s, x + 0.3, y + 0.3, x + 0.35, y + 1.2, C.red, 1.5, { dash: 'dash' });
  seg(s, x + 0.8, y + 1.4, x + 1.55, y + 0.85, C.red, 1.5, { dash: 'dash' });
}
// layers of metal atoms; alloy adds bigger atoms
function layers(s, x, y, alloy) {
  const d = 0.48;
  for (let j = 0; j < 4; j++) for (let i = 0; i < 6; i++) {
    const big = alloy && ((i === 2 && j === 1) || (i === 4 && j === 2) || (i === 1 && j === 3));
    const yy = y + j * d + (alloy && j === 1 && i > 1 && i < 4 ? -0.06 : 0) + (alloy && j === 2 && i > 3 ? 0.06 : 0);
    if (big) circle(s, x + i * d + 0.24, yy + 0.24, d * 1.35, '7A4E9C', '4A2C6B', 1);
    else circle(s, x + i * d + 0.24, yy + 0.24, d - 0.02, 'C9C9C9', '7F8C8D', 1);
  }
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'States of matter, and why ionic, molecular, polymer, giant covalent and metallic substances behave as they do',
  bullets: ['Part 1: states of matter and state symbols (4.2.2.1, 4.2.2.2)', 'Part 2: ionic compounds and small molecules (4.2.2.3, 4.2.2.4)', 'Part 3: polymers and giant covalent structures (4.2.2.5, 4.2.2.6)', 'Part 4: metals and alloys (4.2.2.7, 4.2.2.8)'],
  notes: 'AQA 8462 GCSE Chemistry 4.2, lesson 2 of 3. Lesson 1 covered bonding. Lesson 3: diamond, graphite, graphene, fullerenes and nanoscience. Key idea: properties depend on WHICH forces are overcome (strong bonds or weak intermolecular forces). About two hours.',
});

D.objectives({
  tag: '4.2.2',
  items: [
    'Use the **particle model** to explain changes of state, and its **limitations**.',
    'Predict the **state** of a substance from its melting and boiling points.',
    'Explain the properties of **ionic**, **small molecular**, **polymer** and **giant covalent** substances.',
    'Explain why **metals** conduct and bend, and why **alloys** are harder.',
  ],
  keywords: ['melting point', 'boiling point', 'intermolecular forces', 'polymer', 'giant covalent', 'alloy'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What type of bonding is in sodium chloride?', 'What is a covalent bond?', 'What are delocalised electrons?', 'What does (aq) mean?'],
  answers: ['ionic', 'a shared pair of electrons', 'electrons free to move through a metal', 'dissolved in water'],
  notes: 'Retrieval from lesson 1 and 4.1.',
});

D.vocab({
  title: 'Key words', tag: '4.2.2',
  items: [
    { term: 'Intermolecular forces', def: '**Weak** forces **between** molecules. Not the same as the strong covalent bonds **inside** a molecule.' },
    { term: 'Giant covalent', def: 'A huge network of atoms all joined by **strong covalent bonds**, e.g. diamond, silicon dioxide.' },
    { term: 'Polymer', def: 'A very **long molecule** made of many repeating units joined by covalent bonds.' },
    { term: 'Alloy', def: 'A **mixture** of a metal with other elements, usually other metals.' },
  ],
  notes: 'The difference between intermolecular forces and covalent bonds is the most common misconception in this topic.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the three states of matter', { tag: '4.2.2.1' });
  const bw = 2.3, bh = 1.95, y = 1.85, xs = [MX + 0.3, MX + 4.95, MX + 9.6];
  [['solid', 'Solid'], ['liquid', 'Liquid'], ['gas', 'Gas']].forEach(([k, t], i) => {
    txt(s, t, xs[i], 1.4, bw, 0.4, { size: 19, bold: true, color: C.maroon, align: 'center' });
    particleBox(s, xs[i], y, bw, bh, k);
  });
  arrow(s, xs[0] + bw + 0.2, y + 0.55, xs[1] - 0.2, y + 0.55, C.red, 2); txt(s, 'melting', xs[0] + bw + 0.15, y + 0.12, 2.0, 0.35, { size: 14, bold: true, color: C.red, align: 'center' });
  arrow(s, xs[1] - 0.2, y + 1.35, xs[0] + bw + 0.2, y + 1.35, C.blue, 2); txt(s, 'freezing', xs[0] + bw + 0.15, y + 1.42, 2.0, 0.35, { size: 14, bold: true, color: C.blue, align: 'center' });
  arrow(s, xs[1] + bw + 0.2, y + 0.55, xs[2] - 0.2, y + 0.55, C.red, 2); txt(s, 'boiling', xs[1] + bw + 0.15, y + 0.12, 2.0, 0.35, { size: 14, bold: true, color: C.red, align: 'center' });
  arrow(s, xs[2] - 0.2, y + 1.35, xs[1] + bw + 0.2, y + 1.35, C.blue, 2); txt(s, 'condensing', xs[1] + bw + 0.15, y + 1.42, 2.0, 0.35, { size: 14, bold: true, color: C.blue, align: 'center' });
  const cw = (W - 2 * MX - 0.6) / 3;
  [['Regular pattern, touching. **Vibrate** in place.', 0], ['Random, touching. **Move around** each other.', 1], ['Random, far apart. Move **fast** in all directions.', 2]].forEach(([t, i]) => txt(s, t, MX + i * (cw + 0.3), 3.95, cw, 0.8, { size: 16, align: 'center' }));
  note(s, MX, 4.95, W - 2 * MX, 1.9, 'To **melt** or **boil**, energy must be **transferred to** the substance to overcome the forces between particles. The **stronger** the forces, the **higher** the melting and boiling points.', { size: 17 });
  notes(s, 'Spec 4.2.2.1: "The three states of matter are solid, liquid and gas. Melting and freezing take place at the melting point, boiling and condensing take place at the boiling point. The three states of matter can be represented by a simple model. In this model, particles are represented by small solid spheres. Particle theory can help to explain melting, boiling, freezing and condensing. The amount of energy needed to change state from solid to liquid and from liquid to gas depends on the strength of the forces between the particles of the substance. The nature of the particles involved depends on the type of bonding and the structure of the substance."');
}

{
  const s = frame('Limitations of the particle model', HT_or_tag('4.2.2.1'));
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 4.0, 'The model shows', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['How particles are **arranged** in each state.', 'How they **move**.', 'Why energy is needed to change state.'], 18, 0.15);
  headCard(s, MX + cw + gap, 1.4, cw, 4.0, 'Limitations', C.red, 'FBEAEA');
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['There are **no forces** shown between the spheres.', 'All particles are drawn as **solid spheres**: real particles are atoms, ions or molecules of different shapes.', 'Particles are **not to scale**: gas particles are much further apart.'], 18, 0.15);
  note(s, MX, 5.65, W - 2 * MX, 1.2, '**Higher tier:** be ready to explain limitations, e.g. "the model does not show the forces between particles, so it cannot explain why different substances have different melting points".', { size: 16 });
  notes(s, 'Spec 4.2.2.1 (HT only): "Students should be able to explain the limitations of the particle theory in relation to changes of state when particles are represented by inelastic spheres (eg like bubbles)."');
}
function HT_or_tag(t) { return { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white, _spec: t }; }

{
  const s = frame('Predicting the state of a substance', { tag: '4.2.2.2' });
  // number line for ethanol
  const x0 = MX + 0.6, x1 = W - MX - 0.6, y = 2.6, lo = -150, hi = 120;
  const px = v => x0 + (v - lo) / (hi - lo) * (x1 - x0);
  rect(s, x0, y - 0.25, px(-114) - x0, 0.5, 'CFE0F5'); rect(s, px(-114), y - 0.25, px(78) - px(-114), 0.5, 'CFE8C0'); rect(s, px(78), y - 0.25, x1 - px(78), 0.5, 'F9E0B8');
  txt(s, 'solid', x0, y - 0.25, px(-114) - x0, 0.5, { size: 15, bold: true, align: 'center', valign: 'middle' });
  txt(s, 'liquid', px(-114), y - 0.25, px(78) - px(-114), 0.5, { size: 15, bold: true, align: 'center', valign: 'middle' });
  txt(s, 'gas', px(78), y - 0.25, x1 - px(78), 0.5, { size: 15, bold: true, align: 'center', valign: 'middle' });
  [[-114, 'mp −114 °C'], [78, 'bp 78 °C']].forEach(([v, t]) => { seg(s, px(v), y - 0.45, px(v), y + 0.45, C.ink, 2); txt(s, t, px(v) - 1.0, y + 0.5, 2.0, 0.35, { size: 15, bold: true, align: 'center' }); });
  seg(s, px(25), y - 0.6, px(25), y + 0.25, C.red, 2.5); txt(s, '25 °C', px(25) - 0.6, y - 0.95, 1.2, 0.35, { size: 15, bold: true, color: C.red, align: 'center' });
  txt(s, 'Ethanol', x0, 1.4, 3, 0.4, { size: 19, bold: true, color: C.maroon });
  headCard(s, MX, 3.75, 6.6, 3.1, 'The rule', C.maroon, C.soft);
  bullets(s, MX + 0.2, 4.45, 6.2, ['Below the **melting point**: **solid**.', 'Between melting and boiling points: **liquid**.', 'Above the **boiling point**: **gas**.'], 18, 0.14);
  const bx = MX + 7.0, bw = W - MX - bx;
  headCard(s, bx, 3.75, bw, 3.1, 'State symbols', C.green, C.greenSoft);
  txt(s, '(s) solid   (l) liquid   (g) gas\n(aq) aqueous: dissolved in water', bx + 0.2, 4.45, bw - 0.4, 1.0, { size: 18, bold: true });
  txt(s, 'e.g. NaCl(s) melts to NaCl(l); in water it is NaCl(aq).', bx + 0.2, 5.55, bw - 0.4, 1.0, { size: 16 });
  notes(s, 'Spec 4.2.2.1: "Students should be able to predict the states of substances at different temperatures given appropriate data." Spec 4.2.2.2: "In chemical equations, the three states of matter are shown as (s), (l) and (g), with (aq) for aqueous solutions. Students should be able to include appropriate state symbols in chemical equations for the reactions in this specification." Ethanol: liquid at 25 °C because −114 < 25 < 78.');
}

D.myTurnYourTurn({
  title: 'Predict the state', tag: 'Skill practice', stepSize: 20, labelW: 4.1, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'State at the temperature given?',
    steps: [
      { label: 'Bromine: mp −7, bp 59, 25 °C', text: '**liquid**' },
      { label: 'NaCl: mp 801, bp 1413, 1000 °C', text: '**liquid**' },
      { label: 'Oxygen: mp −218, bp −183, −220 °C', text: '**solid**' },
    ],
  },
  yours: {
    q: 'State at the temperature given?',
    steps: [
      { label: 'Mercury: mp −39, bp 357, 25 °C', text: '**liquid**' },
      { label: 'Iodine: mp 114, bp 184, 200 °C', text: '**gas**' },
      { label: 'Sulfur: mp 115, bp 445, 25 °C', text: '**solid**' },
    ],
  },
  notes: 'Watch negative numbers: −220 is BELOW −218, so oxygen is solid. All checked in the build script.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: properties of ionic compounds', { tag: '4.2.2.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.75, 'High melting and boiling points', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['Giant lattice with **many strong** ionic bonds (electrostatic forces).', '**Lots of energy** is needed to break them, e.g. NaCl melts at **801 °C**.'], 17, 0.14);
  headCard(s, MX + cw + gap, 1.4, cw, 2.75, 'Electrical conductivity', C.blue, C.blueSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['**Solid:** does **not** conduct. Ions are fixed in place.', '**Molten or dissolved:** **conducts**. The **ions are free to move** and carry charge.'], 17, 0.14);
  // two mini-diagrams: fixed vs free ions
  const draw = (x, y, free) => {
    rect(s, x, y, 2.6, 1.9, C.white, C.grey);
    const P = free ? [[0.3, 0.3, 1], [1.1, 0.5, 0], [2.0, 0.35, 1], [0.6, 1.2, 0], [1.6, 1.0, 1], [2.2, 1.5, 0], [1.0, 1.55, 1], [0.25, 0.85, 0]] : [];
    if (!free) for (let i = 0; i < 5; i++) for (let j = 0; j < 4; j++) P.push([0.35 + i * 0.47, 0.3 + j * 0.43, (i + j) % 2]);
    P.forEach(([a, b, pos]) => { circle(s, x + a, y + b, 0.34, pos ? 'B9D3EE' : 'C9E7B5', pos ? C.blue : C.green, 1); txt(s, pos ? '+' : '−', x + a - 0.17, y + b - 0.17, 0.34, 0.34, { size: 12, bold: true, align: 'center', valign: 'middle' }); });
    if (free) { arrow(s, x + 0.45, y + 0.3, x + 0.85, y + 0.15, C.ink, 1.5); arrow(s, x + 1.75, y + 1.0, x + 2.1, y + 0.75, C.ink, 1.5); }
  };
  draw(MX + 0.4, 4.45, false); txt(s, 'solid: ions fixed', MX + 0.4, 6.4, 2.6, 0.35, { size: 14, bold: true, align: 'center' });
  draw(MX + 3.4, 4.45, true); txt(s, 'molten: ions move', MX + 3.4, 6.4, 2.6, 0.35, { size: 14, bold: true, align: 'center' });
  note(s, MX + 6.6, 4.45, W - MX - (MX + 6.6), 2.4, 'Exam tip: say "**ions** are free to move", never "electrons" for an ionic compound.', { size: 18 });
  notes(s, 'Spec 4.2.2.3: "Ionic compounds have regular structures (giant ionic lattices) in which there are strong electrostatic forces of attraction in all directions between oppositely charged ions. These compounds have high melting points and high boiling points because of the large amounts of energy needed to break the many strong bonds. When melted or dissolved in water, ionic compounds conduct electricity because the ions are free to move and so charge can flow." Links to electrolysis (4.4.3).');
}

{
  const s = frame('Properties of small molecules', { tag: '4.2.2.4' });
  smallMolecules(s, MX + 0.6, 1.8);
  txt(s, '— strong covalent bond (inside)', MX + 0.1, 3.95, 4.2, 0.35, { size: 14, bold: true });
  txt(s, '- - weak intermolecular force (between)', MX + 0.1, 4.3, 4.2, 0.35, { size: 14, bold: true, color: C.red });
  const bx = MX + 4.5, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.3, 'Low melting and boiling points', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Usually **gases or liquids** at room temperature (e.g. O₂, H₂O, CH₄).', 'Melting or boiling only overcomes the **weak intermolecular forces**. The covalent bonds **do not break**.', 'Intermolecular forces get **stronger** as molecules get **bigger**, so boiling points rise.'], 17, 0.13);
  headCard(s, bx, 4.9, bw, 1.95, 'Do not conduct electricity', C.blue, C.blueSoft);
  txt(s, 'Molecules have **no overall charge**, and there are no free electrons or ions.', bx + 0.2, 5.55, bw - 0.4, 1.2, { size: 17 });
  notes(s, 'Spec 4.2.2.4: "Substances that consist of small molecules are usually gases or liquids that have relatively low melting points and boiling points. These substances have only weak forces between the molecules (intermolecular forces). It is these intermolecular forces that are overcome, not the covalent bonds, when the substance melts or boils. The intermolecular forces increase with the size of the molecules, so larger molecules have higher melting and boiling points. These substances do not conduct electricity because the molecules do not have an overall electric charge." Example trend: methane bp −162 °C, butane −1 °C, octane 126 °C.');
}

D.hinge({
  title: 'Quick check',
  q: 'When water boils, what is overcome?',
  options: ['Weak forces between the molecules', 'Covalent bonds between H and O', 'Ionic bonds', 'The attraction between the nucleus and electrons'],
  correct: 0,
  notes: 'Answer A. B is the classic misconception: if O–H bonds broke, steam would be hydrogen and oxygen, not water. C: water is not ionic. D is never broken by heating in GCSE chemistry.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: polymers', { tag: '4.2.2.5' });
  // zig-zag chain
  const y = 2.4, x = MX + 0.3;
  for (let i = 0; i < 14; i++) { const a = x + i * 0.42, b = y + (i % 2 ? 0.25 : -0.25); seg(s, a, b, a + 0.42, y + ((i + 1) % 2 ? 0.25 : -0.25), C.ink, 2.5); circle(s, a, b, 0.2, '7F8C8D'); }
  txt(s, '… a chain of thousands of carbon atoms …', x, 2.85, 6.2, 0.4, { size: 15, italic: true, color: C.grey, align: 'center' });
  // repeating unit with brackets
  const rx = MX + 7.2, ry = 1.6;
  txt(s, 'Poly(ethene) repeating unit', rx, 1.35, 5, 0.4, { size: 17, bold: true, color: C.maroon });
  const cx1 = rx + 1.0, cx2 = rx + 2.2, cy = ry + 1.05;
  seg(s, rx + 0.25, cy, cx1 - 0.2, cy, C.ink, 2); seg(s, cx1 + 0.2, cy, cx2 - 0.2, cy, C.ink, 2); seg(s, cx2 + 0.2, cy, rx + 3.0, cy, C.ink, 2);
  [cx1, cx2].forEach(cx => { txt(s, 'C', cx - 0.2, cy - 0.2, 0.4, 0.4, { size: 20, bold: true, align: 'center', valign: 'middle' }); seg(s, cx, cy - 0.2, cx, cy - 0.5, C.ink, 2); seg(s, cx, cy + 0.2, cx, cy + 0.5, C.ink, 2); txt(s, 'H', cx - 0.2, cy - 0.88, 0.4, 0.38, { size: 18, bold: true, align: 'center' }); txt(s, 'H', cx - 0.2, cy + 0.5, 0.4, 0.38, { size: 18, bold: true, align: 'center' }); });
  seg(s, rx + 0.45, cy - 0.7, rx + 0.45, cy + 0.7, C.ink, 2); seg(s, rx + 0.45, cy - 0.7, rx + 0.6, cy - 0.7, C.ink, 2); seg(s, rx + 0.45, cy + 0.7, rx + 0.6, cy + 0.7, C.ink, 2);
  seg(s, rx + 2.8, cy - 0.7, rx + 2.8, cy + 0.7, C.ink, 2); seg(s, rx + 2.65, cy - 0.7, rx + 2.8, cy - 0.7, C.ink, 2); seg(s, rx + 2.65, cy + 0.7, rx + 2.8, cy + 0.7, C.ink, 2);
  txt(s, 'n', rx + 2.85, cy + 0.45, 0.4, 0.4, { size: 18, bold: true, italic: true });
  headCard(s, MX, 3.75, W - 2 * MX, 3.1, 'Why polymers are solids at room temperature', C.maroon, C.soft);
  bullets(s, MX + 0.2, 4.45, W - 2 * MX - 0.4, ['Polymers are **very large molecules**. The atoms in the chain are joined by **strong covalent bonds**.', 'The **intermolecular forces** between the long chains are **relatively strong** because the molecules are so big.', 'So most polymers are **solid** at room temperature. They still melt at lower temperatures than giant structures.'], 17, 0.14);
  notes(s, 'Spec 4.2.2.5: "Polymers have very large molecules. The atoms in the polymer molecules are linked to other atoms by strong covalent bonds. The intermolecular forces between polymer molecules are relatively strong and so these substances are solids at room temperature." Representing polymers with brackets and n is in 4.2.1.4 and 4.7.3 (addition polymerisation).');
}

{
  const s = frame('Giant covalent structures', { tag: '4.2.2.6' });
  // simple network: hexagonal grid of atoms with bonds
  const ox = MX + 0.5, oy = 1.75, dx = 0.7, dy = 0.6, pts = [];
  for (let j = 0; j < 6; j++) for (let i = 0; i < 6; i++) pts.push([ox + i * dx + (j % 2 ? dx / 2 : 0), oy + j * dy]);
  pts.forEach(([a, b], k) => { const i = k % 6, j = Math.floor(k / 6); if (i < 5) seg(s, a, b, pts[k + 1][0], pts[k + 1][1], C.ink, 2); if (j < 5) { seg(s, a, b, pts[k + 6][0], pts[k + 6][1], C.ink, 2); const n2 = j % 2 ? k + 7 : k + 5; if ((j % 2 ? i < 5 : i > 0)) seg(s, a, b, pts[n2][0], pts[n2][1], C.ink, 2); } });
  pts.forEach(([a, b]) => circle(s, a, b, 0.28, '7F8C8D', '444444', 1));
  txt(s, 'Every atom joined to others by strong covalent bonds', MX, 5.15, 4.9, 0.6, { size: 14, bold: true, align: 'center' });
  const bx = MX + 5.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.0, 'Very high melting and boiling points', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['All atoms are linked by **strong covalent bonds** in a giant network.', 'To melt, **many strong covalent bonds must be broken**: a lot of energy.'], 17, 0.14);
  table(s, bx, 4.6, [bw * 0.38, bw * 0.62], ['Example', 'Melting point'], [['Diamond (C)', 'about 3550 °C'], ['Graphite (C)', 'about 3650 °C'], ['Silicon dioxide (SiO₂)', 'about 1710 °C']], { rh: 0.5, hh: 0.5, size: 16 });
  notes(s, 'Spec 4.2.2.6: "Substances that consist of giant covalent structures are solids with very high melting points. All of the atoms in these structures are linked to other atoms by strong covalent bonds. These bonds must be overcome to melt or boil these substances. Diamond and graphite (forms of carbon) and silicon dioxide (silica) are examples of giant covalent structures." The network drawn is a simplified 2D sketch, not a real crystal structure. Diamond and graphite are covered in detail in lesson 3. Diamond sublimes rather than melting at normal pressure; values are approximate.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does silicon dioxide have a much higher melting point than carbon dioxide?',
  options: ['Strong covalent bonds must break in SiO₂', 'SiO₂ is ionic', 'CO₂ has no covalent bonds', 'SiO₂ molecules are heavier'],
  correct: 0,
  notes: 'Answer A: SiO₂ is giant covalent, CO₂ is small molecules held by weak intermolecular forces. B: both are covalent. C: CO₂ has strong C=O bonds, but they are not broken when it sublimes. D: SiO₂ is not made of small molecules at all.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: metals and alloys', { tag: '4.2.2.7' });
  txt(s, 'Pure metal', MX + 0.3, 1.4, 3.0, 0.4, { size: 18, bold: true, color: C.maroon, align: 'center' });
  layers(s, MX + 0.3, 1.9, false);
  txt(s, 'Layers can **slide** over each other: metals can be **bent and shaped**.', MX, 3.95, 3.6, 0.9, { size: 15, align: 'center' });
  txt(s, 'Alloy', MX + 4.2, 1.4, 3.0, 0.4, { size: 18, bold: true, color: C.maroon, align: 'center' });
  layers(s, MX + 4.2, 1.9, true);
  txt(s, 'Different sized atoms **distort the layers**, so they **slide less easily**: **harder**.', MX + 3.9, 3.95, 3.6, 0.9, { size: 15, align: 'center' });
  const bx = MX + 7.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.45, 'Properties of metals', C.blue, C.blueSoft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**High** melting and boiling points: **strong metallic bonding**.', 'Giant structure with **delocalised electrons**.', 'Pure metals are **too soft** for many uses, so they are mixed into alloys.'], 16, 0.12);
  note(s, MX, 5.1, W - 2 * MX, 1.75, '**Examples of alloys:** steel (iron + carbon) for buildings; brass (copper + zinc) for musical instruments; 18-carat gold (gold + copper/silver) for jewellery. More on alloys in 4.10.3.', { size: 17 });
  notes(s, 'Spec 4.2.2.7: "Metals have giant structures of atoms with strong metallic bonding. This means that most metals have high melting and boiling points. In pure metals, atoms are arranged in layers, which allows metals to be bent and shaped. Pure metals are too soft for many uses and so are mixed with other metals to make alloys which are harder." Students should be able to explain why alloys are harder than pure metals in terms of distortion of the layers of atoms in the structure of a pure metal.');
}

{
  const s = frame('Metals as conductors', { tag: '4.2.2.8' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.2, 'Electricity', C.maroon, C.soft);
  txt(s, 'The **delocalised electrons** can **move through the structure** and carry **charge**.', MX + 0.2, 2.1, cw - 0.4, 2.3, { size: 19 });
  headCard(s, MX + cw + gap, 1.4, cw, 3.2, 'Thermal energy', C.orange, C.orangeSoft);
  txt(s, 'Energy is **transferred** by the **delocalised electrons** moving through the metal.', MX + cw + gap + 0.2, 2.1, cw - 0.4, 2.3, { size: 19 });
  const tw = W - 2 * MX;
  table(s, MX, 4.85, [tw * 0.3, tw * 0.35, tw * 0.35], ['What conducts?', 'Particles that move', 'When'], [
    ['Metals', 'delocalised **electrons**', 'solid and liquid'], ['Ionic compounds', '**ions**', 'only molten or dissolved'], ['Small molecules', 'nothing', 'never'],
  ], { rh: 0.45, hh: 0.45, size: 16 });
  notes(s, 'Spec 4.2.2.8: "Metals are good conductors of electricity because the delocalised electrons in the metal carry electrical charge through the metal. Metals are good conductors of thermal energy because energy is transferred by the delocalised electrons." Graphite is an exception (a non-metal that conducts), covered in lesson 3.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why is brass (copper + zinc) harder than pure copper?',
  options: ['Zinc atoms distort the layers so they cannot slide', 'Brass has stronger covalent bonds', 'Brass has no delocalised electrons', 'Zinc atoms are the same size as copper atoms'],
  correct: 0,
  notes: 'Answer A. B: metals have metallic bonds, not covalent. C: brass still conducts, so it has delocalised electrons. D: it is the DIFFERENT size that distorts the layers.',
});

{
  const s = frame('Summary: structure and properties', { tag: '4.2.2' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.19, tw * 0.25, tw * 0.2, tw * 0.36], ['Structure', 'Particles and forces', 'Melting point', 'Conducts?'], [
    ['Giant ionic', 'ions; strong electrostatic forces', 'high', 'when molten or dissolved (ions move)'],
    ['Small molecules', 'molecules; weak intermolecular forces', 'low', 'no (no charged particles)'],
    ['Polymer', 'long molecules; stronger intermolecular forces', 'medium (solid)', 'no'],
    ['Giant covalent', 'atoms; strong covalent bonds', 'very high', 'no (except graphite)'],
    ['Metallic', 'positive ions + delocalised electrons', 'high', 'yes (electrons move)'],
  ], { rh: 0.9, size: 16 });
  notes(s, 'A summary to copy or use as a retrieval grid (blank out cells). Graphite conducts because each carbon atom has one delocalised electron (lesson 3).');
}

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Describe the particles in a liquid.', 'Random, touching, moving around each other'], ['Why do ionic compounds have high melting points?', 'Many strong bonds need lots of energy to break'], ['Why does molten NaCl conduct?', 'Ions are free to move'], ['What is an alloy?', 'A mixture of a metal with other elements'],
    ['Hexane: mp −95 °C, bp 69 °C. State at 80 °C?', 'Gas'], ['Why does pentane boil higher than methane?', 'Bigger molecules, stronger intermolecular forces'],
    ['Why does copper conduct electricity?', 'Delocalised electrons carry charge'], ['Why is diamond’s melting point so high?', 'Many strong covalent bonds to break'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) close together, random arrangement, move around each other  2) giant lattice, many strong electrostatic forces, lots of energy  3) ions free to move and carry charge  4) a mixture of a metal and other elements  5) 80 > 69, so gas  6) larger molecules, stronger intermolecular forces, more energy to overcome  7) delocalised electrons move and carry charge  8) giant covalent: many strong covalent bonds must break.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'Substance A: mp −182 °C, bp −162 °C, does not conduct.   Substance B: mp 1710 °C, bp 2230 °C, does not conduct.   Substance C: mp 801 °C, conducts only when molten.',
  parts: [
    { l: 'a', q: 'Give the state of A and of B at 25 °C.', m: 2, lines: 0 },
    { l: 'b', q: 'Which substance is made of small molecules? Explain your answer.', m: 3, lines: 1 },
    { l: 'c', q: 'Identify the structure of B and explain why its melting point is high.', m: 3, lines: 1 },
    { l: 'd', q: 'Explain why C conducts only when molten.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'A gas; B solid', '2', ''],
    ['(b)', 'A; low melting/boiling point; only weak intermolecular forces to overcome (does not conduct)', '3', ''],
    ['(c)', 'giant covalent; many strong covalent bonds; need lots of energy to break', '3', ''],
    ['(d)', 'ionic; ions free to move when molten (fixed in the solid)', '2', ''],
  ],
  notes: 'Mark scheme on the next slide. A is methane, B is silicon dioxide, C is sodium chloride.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Name the change of state from gas to liquid.', 'What is overcome when a small molecule melts?', 'Why do polymers tend to be solids?', 'Why are alloys harder than pure metals?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) condensing  2) weak intermolecular forces  3) large molecules, relatively strong intermolecular forces  4) different sized atoms distort the layers so they cannot slide. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw particle diagrams for the three states, with the four changes of state.',
    'Give two limitations of the particle model (HT).',
    'Chlorine: mp −101 °C, bp −34 °C. Predict its state at 25 °C and at −50 °C.',
    'Explain why magnesium oxide has a high melting point.',
    'Explain why poly(ethene) is a solid but ethene is a gas.',
    'Copy and learn the summary table.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) see Part 1  2) no forces shown; spheres are solid and not to scale  3) gas at 25 °C; liquid at −50 °C  4) giant ionic lattice, strong electrostatic forces between Mg²⁺ and O²⁻, lots of energy  5) poly(ethene) has very large molecules, stronger intermolecular forces  6) see the summary slide.');
}
st('HW Cl2 -50', -101, -34, -50, 'liquid');

D.save(path.join(__dirname, 'AQA_8462_Chem_4.2_B_StructureProperties.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
