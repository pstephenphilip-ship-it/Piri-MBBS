// build_4_1_C.js — AQA GCSE Chemistry (8462) 4.1 Atomic structure and the periodic table, lesson 3 of 3:
// 4.1.2.1 The periodic table, 4.1.2.2 Development of the periodic table, 4.1.2.3 Metals and non-metals,
// 4.1.2.4 Group 0, 4.1.2.5 Group 1, 4.1.2.6 Group 7, 4.1.3 Transition metals (chemistry only).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_1_C.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.1.2–4.1.3', 'The periodic table'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= checks =======================
balanced('Na+H2O', [[2, 'Na'], [2, 'H2O']], [[2, 'NaOH'], [1, 'H2']]);
balanced('K+H2O', [[2, 'K'], [2, 'H2O']], [[2, 'KOH'], [1, 'H2']]);
balanced('Li+O2', [[4, 'Li'], [1, 'O2']], [[2, 'Li2O']]);
balanced('Na+Cl2', [[2, 'Na'], [1, 'Cl2']], [[2, 'NaCl']]);
balanced('Cl2+KBr', [[1, 'Cl2'], [2, 'KBr']], [[2, 'KCl'], [1, 'Br2']]);
balanced('Cl2+NaI', [[1, 'Cl2'], [2, 'NaI']], [[2, 'NaCl'], [1, 'I2']]);
balanced('Br2+KI', [[1, 'Br2'], [2, 'KI']], [[2, 'KBr'], [1, 'I2']]);
balanced('MT Li+H2O', [[2, 'Li'], [2, 'H2O']], [[2, 'LiOH'], [1, 'H2']]);
balanced('MT K+Br2', [[2, 'K'], [1, 'Br2']], [[2, 'KBr']]);
balanced('YT Rb+H2O', [[2, 'Rb'], [2, 'H2O']], [[2, 'RbOH'], [1, 'H2']]);
balanced('YT Na+I2', [[2, 'Na'], [1, 'I2']], [[2, 'NaI']]);
balanced('H2+Cl2', [[1, 'H2'], [1, 'Cl2']], [[2, 'HCl']]);
balanced('exam Cs', [[2, 'Cs'], [2, 'H2O']], [[2, 'CsOH'], [1, 'H2']]);
balanced('Fe+Cl2', [[2, 'Fe'], [3, 'Cl2']], [[2, 'FeCl3']]);
// ionic (charge also checked by hand): Cl2 + 2Br- -> 2Cl- + Br2
balanced('ionic Cl2 Br-', [[1, 'Cl2'], [2, 'Br']], [[2, 'Cl'], [1, 'Br2']]);
calc('ionic charge', 2 * -1, 2 * -1);
// group 0 boiling points (°C): trend increases down the group; radon is predicted between -100 and -40 (actual -62)
const BP = [['He', -269], ['Ne', -246], ['Ar', -186], ['Kr', -153], ['Xe', -108], ['Rn', -62]];
calc('bp increasing', BP.every((b, i) => i === 0 || b[1] > BP[i - 1][1]) ? 1 : 0, 1);

// ======================= periodic table drawing =======================
const P = [
  ['H', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', 'He'],
  ['Li', 'Be', '', '', '', '', '', '', '', '', '', '', 'B', 'C', 'N', 'O', 'F', 'Ne'],
  ['Na', 'Mg', '', '', '', '', '', '', '', '', '', '', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar'],
  ['K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr'],
];
const NONMETAL = new Set(['H', 'He', 'C', 'N', 'O', 'F', 'Ne', 'P', 'S', 'Cl', 'Ar', 'Se', 'Br', 'Kr']);
const SEMI = new Set(['B', 'Si', 'Ge', 'As']);
const METALC = 'CFE0F5', NONC = 'F9E0B8', SEMIC = 'E3E3E3', TRANS = 'DCD2EC';
function ptable(s, x, y, cw, ch, o = {}) {
  P.forEach((row, r) => row.forEach((e, c) => {
    if (!e) return;
    let fill = NONMETAL.has(e) ? NONC : SEMI.has(e) ? SEMIC : METALC;
    if (o.highlight) fill = o.highlight(e, c, r) || C.white;
    else if (o.trans && c >= 2 && c <= 11) fill = TRANS;
    rect(s, x + c * cw, y + r * ch, cw, ch, fill, '9A8FB0', { lw: 0.75 });
    txt(s, e, x + c * cw, y + r * ch, cw, ch, { size: o.size || 15, bold: true, align: 'center', valign: 'middle' });
  }));
  if (o.groups) {
    [[0, '1'], [1, '2'], [12, '3'], [13, '4'], [14, '5'], [15, '6'], [16, '7'], [17, '0']].forEach(([c, g]) => txt(s, g, x + c * cw, y - 0.34, cw, 0.3, { size: 13, bold: true, color: C.maroon, align: 'center' }));
    [1, 2, 3, 4].forEach((p, r) => txt(s, String(p), x - 0.35, y + r * ch, 0.3, ch, { size: 13, bold: true, color: C.maroon, align: 'right', valign: 'middle' }));
  }
}
function label(s, t, x, y, w = 2.4, o = {}) { txt(s, t, x, y, w, 0.34, Object.assign({ size: 13, bold: true }, o)); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'How the periodic table is arranged and developed, metals and non-metals, the noble gases, alkali metals, halogens and transition metals',
  bullets: ['Part 1: the periodic table and how it developed (4.1.2.1–4.1.2.3)', 'Parts 2–3: group 0 noble gases and group 1 alkali metals (4.1.2.4–4.1.2.5)', 'Part 4: group 7, the halogens (4.1.2.6)', 'Part 5: the transition metals (4.1.3)'],
  notes: 'AQA 8462 GCSE Chemistry 4.1, lesson 3 of 3. Builds on electronic structure (lesson 2). The transition metals (4.1.3) are in the separate science specification only. About two hours.',
});

D.objectives({
  tag: '4.1.2',
  items: [
    'Explain how the **periodic table** is arranged and how **Mendeleev** developed it.',
    'Compare **metals** and **non-metals** using electrons.',
    'Describe and **explain the trends** in groups **0**, **1** and **7**.',
    'Compare the **transition metals** with group 1.',
  ],
  keywords: ['group', 'period', 'noble gas', 'alkali metal', 'halogen', 'displacement', 'transition metal'],
  notes: 'Share the objectives. The key skill is EXPLAINING trends with electrons and shielding, not only describing them.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Electronic structure of sodium (Z = 11)?', 'What is an isotope?', 'Balance: Na + Cl₂ → NaCl', 'Which particle has a relative charge of −1?'],
  answers: ['2,8,1', 'same protons, different neutrons', '2Na + Cl₂ → 2NaCl', 'the electron'],
  notes: 'Retrieval from lessons 1 and 2.',
});

D.vocab({
  title: 'Key words', tag: '4.1.2',
  items: [
    { term: 'Group', def: 'A **column**. Elements in a group have the **same number of outer electrons**, so similar reactions.' },
    { term: 'Period', def: 'A **row**. The period number is the number of **electron shells**.' },
    { term: 'Displacement', def: 'A **more reactive** element takes the place of a **less reactive** one in a compound.' },
    { term: 'Ion', def: 'An atom that has **lost** (positive ion) or **gained** (negative ion) electrons.' },
  ],
  notes: 'Ions are covered fully in 4.2.1.2; here we just need the idea of losing or gaining electrons.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: the periodic table', { tag: '4.1.2.1' });
  const cw = 0.64, ch = 0.62, x = MX + 0.45, y = 1.85;
  ptable(s, x, y, cw, ch, { groups: true });
  txt(s, 'Group', x - 0.95, 1.5, 0.9, 0.3, { size: 12, bold: true, color: C.grey, align: 'right' });
  txt(s, 'Period', MX - 0.25, y + 4 * ch + 0.05, 0.9, 0.3, { size: 12, bold: true, color: C.grey });
  [[METALC, 'metal'], [NONC, 'non-metal'], [SEMIC, 'in between']].forEach(([c, t], i) => { rect(s, x + 2.2 * cw + i * 2.1, y + 0.1, 0.35, 0.35, c, '9A8FB0'); txt(s, t, x + 2.2 * cw + i * 2.1 + 0.45, y + 0.1, 1.6, 0.35, { size: 14, bold: true, valign: 'middle' }); });
  txt(s, 'transition metals', x + 2 * cw, y + 3 * ch - 0.4, 10 * cw, 0.35, { size: 14, bold: true, color: C.accent, align: 'center' });
  bullets(s, MX, 4.8, W - 2 * MX, ['Elements are in order of **atomic number** (protons).', 'Elements with similar properties are in the same **group**: same number of **outer electrons**.', 'The table is called **periodic** because similar properties occur at **regular intervals**.'], 18, 0.12);
  notes(s, 'Spec 4.1.2.1: "The elements in the periodic table are arranged in order of atomic (proton) number and so that elements with similar properties are in columns, known as groups. The table is called a periodic table because similar properties occur at regular intervals. Elements in the same group in the periodic table have the same number of electrons in their outer shell (outer electrons) and this gives them similar chemical properties." Only the first four periods are shown. B, Si, Ge and As are shown as "in between" (metalloids); students only need metals and non-metals.');
}

{
  const s = frame('How the periodic table developed', { tag: '4.1.2.2' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.3, 'Early tables (before 1869)', C.grey, C.greyLight);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['Protons, neutrons and electrons were **not yet discovered**.', 'Elements were put in order of **atomic weight**.', 'Tables were **incomplete**, and some elements were in the **wrong groups**.'], 17, 0.14);
  headCard(s, MX + cw + gap, 1.4, cw, 3.3, 'Mendeleev (1869)', C.maroon, C.soft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['Left **gaps** for elements not yet discovered.', '**Swapped** the order of some elements so they fitted their group (e.g. tellurium and iodine).', 'Predicted the properties of missing elements.'], 17, 0.14);
  note(s, MX, 4.95, W - 2 * MX, 1.9, '**Evidence:** elements found later (e.g. gallium and germanium) **matched his predictions**.\n**Later explanation:** isotopes show why order by atomic weight was not always right. The true order is by **atomic number**.', { size: 17 });
  notes(s, 'Spec 4.1.2.2: "Mendeleev overcame some of the problems by leaving gaps for elements that he thought had not been discovered and in some places changed the order based on atomic weights. Knowledge of isotopes made it possible to explain why the order based on atomic weights was not always correct." Students should explain how testing a prediction can support or refute a new scientific idea. Tellurium (Ar 127.6) comes before iodine (Ar 126.9).');
}

{
  const s = frame('Metals and non-metals', { tag: '4.1.2.3' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 3.4, 'Metals (left and centre)', C.blue, C.blueSoft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['React to form **positive ions**: they **lose** outer electrons.', 'Shiny, good conductors, high melting points (mostly).', 'Oxides are **basic**.'], 18, 0.15);
  headCard(s, MX + cw + gap, 1.4, cw, 3.4, 'Non-metals (right)', C.orange, C.orangeSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['Do **not** form positive ions; many **gain** electrons to form negative ions.', 'Dull, poor conductors, low boiling points (mostly).', 'Oxides are **acidic**.'], 18, 0.15);
  note(s, MX, 5.05, W - 2 * MX, 1.8, 'Why? Atoms on the **left** have **few outer electrons**, so it is easier to **lose** them. Atoms on the **right** have **nearly full** outer shells, so it is easier to **gain** electrons.', { fill: C.soft, line: C.line, size: 18 });
  notes(s, 'Spec 4.1.2.3: "Metals are elements that react to form positive ions. Elements that do not form positive ions are non-metals. The majority of elements are metals. Metals are found to the left and towards the bottom of the periodic table. Non-metals are found towards the right and top." Students should explain differences in terms of their atomic structures.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why did Mendeleev leave gaps in his periodic table?',
  options: ['For elements not yet discovered', 'Because some elements had no mass', 'To separate metals and non-metals', 'For the noble gases only'],
  correct: 0,
  notes: 'Answer A. His predictions for these missing elements were later confirmed, which supported his table. D: the noble gases were not known in 1869, but he did not predict a whole group.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: group 0, the noble gases', { tag: '4.1.2.4' });
  const bx = MX, bw = 5.9;
  headCard(s, bx, 1.4, bw, 5.45, 'Unreactive gases', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Full outer shell** (helium 2, the others 8).', 'So they do **not** need to lose or gain electrons: **very unreactive**.', 'Exist as **single atoms** (monatomic).', '**Boiling points increase** down the group: **larger atoms**, more electrons, so **stronger forces between atoms**.'], 17, 0.15);
  // bar chart of boiling points
  const gx = MX + 7.0, gy = 1.75, gw = W - MX - gx - 0.1, gh = 4.3, y0 = -300, y1 = 0;
  const py = v => gy + (y1 - v) / (y1 - y0) * gh;
  for (let v = 0; v >= -300; v -= 50) { D.hline(s, gx, py(v), gx + gw, v === 0 ? '4A3F45' : 'E6DDE1', v === 0 ? 1.5 : 0.75); txt(s, String(v).replace('-', '−'), gx - 0.6, py(v) - 0.14, 0.52, 0.28, { size: 12, color: C.grey, align: 'right' }); }
  D.vline(s, gx, gy, gy + gh, '4A3F45', 1.5);
  const bwid = gw / BP.length;
  BP.forEach(([e, v], i) => {
    const x = gx + i * bwid + 0.12, isRn = e === 'Rn';
    if (!isRn) rect(s, x, py(0), bwid - 0.24, py(v) - py(0), C.accent);
    else rect(s, x, py(0), bwid - 0.24, py(v) - py(0), C.white, C.accent, { lw: 1.5 });
    txt(s, e, x - 0.1, py(v) + 0.04, bwid - 0.04, 0.3, { size: 13, bold: true, align: 'center' });
  });
  txt(s, 'Boiling point (°C)', gx - 0.1, 1.38, 3, 0.32, { size: 14, bold: true });
  txt(s, 'Bars hang down from 0 °C: a longer bar is a lower boiling point. Radon (outline) is −62 °C.', gx, gy + gh + 0.15, gw, 0.6, { size: 13, italic: true, color: C.grey });
  notes(s, 'Spec 4.1.2.4: "The elements in Group 0 of the periodic table are called the noble gases. They are unreactive and do not easily form molecules because their atoms have stable arrangements of electrons... The boiling points of the noble gases increase with increasing relative atomic mass (going down the group)." Data (°C): He −269, Ne −246, Ar −186, Kr −153, Xe −108, Rn −62. Ask students to predict radon before revealing it.');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: group 1, the alkali metals', { tag: '4.1.2.5' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.75, 'Properties', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, cw - 0.4, ['**One** outer electron.', 'Soft metals, low density (Li, Na, K float on water).', 'Stored in **oil**. **More reactive** down the group.'], 17, 0.12);
  headCard(s, MX + cw + gap, 1.4, cw, 2.75, 'Reactions', C.blue, C.blueSoft);
  bullets(s, MX + cw + gap + 0.2, 2.1, cw - 0.4, ['**Water** → metal hydroxide + hydrogen', '**Oxygen** → metal oxide', '**Chlorine** → metal chloride (white salt)'], 17, 0.12);
  rect(s, MX, 4.35, W - 2 * MX, 1.15, C.greyLight, C.line);
  ['2Na(s) + 2H₂O(l) → 2NaOH(aq) + H₂(g)', '4Li(s) + O₂(g) → 2Li₂O(s)', '2Na(s) + Cl₂(g) → 2NaCl(s)'].forEach((e, i) => txt(s, e, MX + 0.3, 4.42 + i * 0.34, W - 2 * MX - 0.6, 0.34, { size: 17, bold: true, align: 'center' }));
  const cols = [['Lithium', 'fizzes steadily, floats'], ['Sodium', 'melts into a ball, fizzes, moves around'], ['Potassium', 'melts, lilac flame, may spark']];
  const tw = (W - 2 * MX - 0.4) / 3;
  cols.forEach(([a, b], i) => { const x = MX + i * (tw + 0.2); rect(s, x, 5.65, tw, 1.2, i === 2 ? C.orangeSoft : C.white, 'F3D9B5'); txt(s, a, x + 0.2, 5.7, tw - 0.4, 0.4, { size: 17, bold: true, color: C.maroon }); txt(s, b, x + 0.2, 6.1, tw - 0.4, 0.7, { size: 16 }); });
  notes(s, 'Spec 4.1.2.5: "Students should be able to describe the reactions of the first three alkali metals with oxygen, chlorine and water." The solution of the hydroxide is alkaline (universal indicator turns purple). Reactivity increases down the group: the arrow shows more vigorous reactions. All equations checked by atom counting. Demonstrate only with tiny pieces behind a safety screen.');
}

{
  const s = frame('Why reactivity increases down group 1', { tag: '4.1.2.5' });
  // three atoms, sizes growing
  [[3, 'Li', '2,1'], [11, 'Na', '2,8,1'], [19, 'K', '2,8,8,1']].forEach(([Z, sym, c], i) => {
    const cx = MX + 1.3, cy = 1.95 + i * 1.5, n = c.split(',').length;
    for (let k = n; k >= 1; k--) circle(s, cx, cy, 0.42 + k * 0.26, k % 2 ? C.white : 'FAF8FC', C.grey, 1);
    circle(s, cx, cy, 0.42, 'F6D7D3', 'C0392B', 1.25);
    txt(s, sym, cx - 0.3, cy - 0.17, 0.6, 0.34, { size: 13, bold: true, align: 'center', valign: 'middle' });
    const r = 0.21 + n * 0.13;
    circle(s, cx + r, cy, 0.17, C.red);
    txt(s, `${sym}  ${c}`, MX + 2.6, cy - 0.2, 2.0, 0.4, { size: 17, bold: true });
  });
  arrow(s, MX + 4.6, 1.9, MX + 4.6, 5.4, C.red, 2.5);
  txt(s, 'more reactive', MX + 4.75, 3.5, 1.6, 0.4, { size: 15, bold: true, color: C.red });
  const bx = MX + 6.6, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 4.2, 'Explanation (4 steps)', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Going down, atoms have **more shells**, so the outer electron is **further from the nucleus**.', 'There is more **shielding** by inner electrons.', 'So the **attraction** between the nucleus and the outer electron is **weaker**.', 'So the outer electron is **lost more easily**: more reactive.'], 17, 0.15);
  note(s, MX, 5.8, W - 2 * MX, 1.05, 'Red dot = the **outer electron** that is lost. Group 1 metals form **+1 ions**, e.g. Na⁺.', { size: 17 });
  notes(s, 'Spec 4.1.2.5: "Students should be able to explain how properties of the elements in Group 1 depend on the outer shell of electrons of the atoms and predict properties from given trends down the group." Shell rings are simplified (other electrons not drawn).');
}

D.myTurnYourTurn({
  title: 'Group 1 and 7 equations', tag: 'Skill practice', stepSize: 19, labelW: 1.6, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Write balanced symbol equations:',
    steps: [
      { label: 'Li + water', text: '2Li + 2H₂O → 2LiOH + H₂' },
      { label: 'K + bromine', text: '2K + Br₂ → 2KBr' },
    ],
  },
  yours: {
    q: 'Write balanced symbol equations:',
    steps: [
      { label: 'Rb + water', text: '2Rb + 2H₂O → 2RbOH + H₂' },
      { label: 'Na + iodine', text: '2Na + I₂ → 2NaI' },
    ],
  },
  notes: 'Pattern: group 1 metals form MOH and M⁺X⁻ salts; halogens are diatomic (Br₂, I₂). All checked by atom counting.',
});

D.hinge({
  title: 'Quick check',
  q: 'Why is potassium more reactive than sodium?',
  options: ['Its outer electron is further from the nucleus', 'It has more outer electrons', 'Its nucleus has fewer protons', 'It has a full outer shell'],
  correct: 0,
  notes: 'Answer A (with more shielding, weaker attraction, so the electron is lost more easily). B: both have one outer electron. C: potassium has more protons (19), but the extra shielding and distance outweigh this. D: that describes group 0.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: group 7, the halogens', { tag: '4.1.2.6' });
  const tw = 7.3;
  table(s, MX, 1.4, [tw * 0.25, tw * 0.37, tw * 0.38], ['Halogen', 'At room temp.', 'Colour'], [
    ['Fluorine F₂', 'gas', 'pale yellow'], ['Chlorine Cl₂', 'gas', 'green'], ['Bromine Br₂', 'liquid', 'red-brown'], ['Iodine I₂', 'solid', 'grey-black (purple vapour)'],
  ], { rh: 0.7, size: 16 });
  bullets(s, MX, 4.95, tw, ['**Seven** outer electrons; exist as **diatomic molecules** (X₂).', 'Going down: **higher** melting and boiling points; **less reactive**.', 'React with metals to form **salts** with **−1 ions** (e.g. Cl⁻), and with non-metals to form **covalent** molecules (e.g. HCl).'], 16, 0.1);
  const bx = MX + 7.7, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 5.45, 'Why reactivity decreases', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Halogens react by **gaining** one electron.', 'Going down, the outer shell is **further from the nucleus** with more **shielding**.', 'So the attraction for an **incoming electron** is **weaker**.', 'So an electron is **gained less easily**: less reactive.'], 17, 0.15);
  notes(s, 'Spec 4.1.2.6: "The elements in Group 7 of the periodic table are known as the halogens and have similar reactions because they all have seven electrons in their outer shell. The halogens are non-metals and consist of molecules which are made of pairs of atoms... In Group 7, the further down the group an element is: the higher the relative molecular mass, melting point and boiling point; the less reactive the element." Group 1 gets MORE reactive down the group (losing electrons); group 7 gets LESS reactive (gaining).');
}

{
  const s = frame('Halogen displacement reactions', { tag: '4.1.2.6' });
  note(s, MX, 1.4, W - 2 * MX, 0.85, 'A **more reactive** halogen **displaces** a less reactive halogen from a solution of its salt.', { fill: C.soft, line: C.line, size: 18 });
  const tw = 7.0, cws = [1.9, (tw - 1.9) / 3, (tw - 1.9) / 3, (tw - 1.9) / 3];
  table(s, MX, 2.45, cws, ['Added', 'KCl(aq)', 'KBr(aq)', 'KI(aq)'], [
    ['Chlorine', '—', 'orange', 'brown'], ['Bromine', 'no change', '—', 'brown'], ['Iodine', 'no change', 'no change', '—'],
  ], { rh: 0.75, size: 16, align: ['left', 'center', 'center', 'center'] });
  txt(s, 'Colour change = reaction. Orange = bromine made; brown = iodine made.', MX, 5.5, tw, 0.6, { size: 15, italic: true, color: C.grey });
  const bx = MX + 7.4, bw = W - MX - bx;
  rect(s, bx, 2.45, bw, 2.15, C.orangeSoft, 'F3D9B5');
  txt(s, 'Chlorine + potassium bromide', bx + 0.25, 2.55, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, 'Cl₂(aq) + 2KBr(aq) → 2KCl(aq) + Br₂(aq)', bx + 0.2, 3.05, bw - 0.4, 0.5, { size: 16, bold: true });
  txt(s, 'Cl₂ + 2NaI → 2NaCl + I₂', bx + 0.25, 3.7, bw - 0.5, 0.45, { size: 17 });
  rect(s, bx, 4.8, bw, 2.05, C.greenSoft, C.green);
  txt(s, 'Ionic equation (HT)', bx + 0.25, 4.9, bw - 0.5, 0.4, { size: 17, bold: true, color: C.red });
  txt(s, 'Cl₂ + 2Br⁻ → 2Cl⁻ + Br₂', bx + 0.25, 5.35, bw - 0.5, 0.5, { size: 20, bold: true });
  txt(s, 'K⁺ is a spectator ion. Chlorine **gains** electrons; bromide ions **lose** them.', bx + 0.25, 5.9, bw - 0.5, 0.85, { size: 15 });
  notes(s, 'Spec 4.1.2.6: "A more reactive halogen can displace a less reactive halogen from an aqueous solution of its salt." The ionic equation and the electron transfer idea (redox) are HT and return in 4.4.1.4. All equations checked by atom counting; charges: left 2 × (−1) = −2, right 2 × (−1) = −2.');
}

D.hinge({
  title: 'Quick check',
  q: 'Bromine water is added to potassium iodide solution. What happens?',
  options: ['Brown iodine forms: bromine displaces iodine', 'No reaction: iodine is more reactive', 'Chlorine gas is given off', 'Orange colour disappears: iodine displaces bromine'],
  correct: 0,
  notes: 'Answer A: Br₂ + 2KI → 2KBr + I₂. B: iodine is LESS reactive. C: there is no chlorine. D: iodine cannot displace the more reactive bromine.',
});
balanced('hinge Br2+KI', [[1, 'Br2'], [2, 'KI']], [[2, 'KBr'], [1, 'I2']]);

// ---------------- Part 5 ----------------
{
  const s = frame('Part 5: the transition metals', { tag: '4.1.3' });
  const cw = 0.64, ch = 0.5, x = MX + 0.2, y = 1.55;
  ptable(s, x, y, cw, ch, { size: 12, highlight: (e, c, r) => (c >= 2 && c <= 11 ? TRANS : c === 0 && r > 0 ? METALC : null) });
  const tw = W - 2 * MX;
  table(s, MX, 3.75, [tw * 0.3, tw * 0.35, tw * 0.35], ['Property', 'Transition metals (e.g. Cr, Mn, Fe, Co, Ni, Cu)', 'Group 1'], [
    ['Melting point', 'high (iron 1538 °C)', 'low (sodium 98 °C)'], ['Density', 'high', 'low'], ['Strength and hardness', 'strong, hard', 'soft'], ['Reactivity with water / oxygen', 'much less reactive', 'very reactive'],
  ], { rh: 0.6, size: 16 });
  notes(s, 'Spec 4.1.3.1 (chemistry only): "The transition elements are metals with similar properties which are different from those of the elements in Group 1. Students should be able to describe the difference compared with Group 1 in melting points, densities, strength, hardness and reactivity with oxygen, water and halogens." Students should be able to exemplify these using Cr, Mn, Fe, Co, Ni, Cu.');
}

{
  const s = frame('Typical properties of transition metals', { tag: '4.1.3.2' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, h = 3.6;
  const cards = [
    ['Ions with different charges', 'e.g. iron forms **Fe²⁺** and **Fe³⁺**; copper forms Cu⁺ and **Cu²⁺**.'],
    ['Coloured compounds', 'e.g. copper sulfate is **blue**; iron(II) compounds **green**; iron(III) **orange-brown**.'],
    ['Useful as catalysts', 'e.g. **iron** in the Haber process; **nickel** for hardening vegetable oils; **manganese(IV) oxide** decomposes hydrogen peroxide.'],
  ];
  cards.forEach(([a, b], i) => { const x = MX + i * (cw + gap); headCard(s, x, 1.4, cw, h, a, C.maroon, C.soft); txt(s, b, x + 0.2, 2.15, cw - 0.4, h - 0.9, { size: 18 }); });
  const colours = [['0E6FB8', 'Cu²⁺ blue'], ['5E9C3E', 'Fe²⁺ green'], ['B5651D', 'Fe³⁺ orange-brown'], ['C8A2C8', 'Mn²⁺ pale pink'], ['2E8B57', 'Ni²⁺ green']];
  colours.forEach(([c, t], i) => { const x = MX + i * 2.45; circle(s, x + 0.35, 5.7, 0.55, c, '555555', 0.75); txt(s, t, x + 0.75, 5.5, 1.7, 0.45, { size: 14, bold: true, valign: 'middle' }); });
  txt(s, 'Colours of the ions in solution (approximate).', MX, 6.35, 8, 0.4, { size: 13, italic: true, color: C.grey });
  notes(s, 'Spec 4.1.3.2 (chemistry only): "Many transition elements have ions with different charges, form coloured compounds and are useful as catalysts." Fe in the Haber process is 4.10.4.1; MnO₂ catalyst appears in rates (4.6.1.4). Hydroxide precipitate colours are in 4.8.3.')
}

D.hinge({
  title: 'Quick check',
  q: 'Which property is typical of a transition metal but NOT a group 1 metal?',
  options: ['Forms coloured compounds', 'Conducts electricity', 'Forms positive ions', 'Reacts with chlorine'],
  correct: 0,
  notes: 'Answer A. B, C and D are true of both: all metals conduct, form positive ions and react with chlorine (2Fe + 3Cl₂ → 2FeCl₃).',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['How are elements ordered in the modern periodic table?', 'By atomic (proton) number'], ['Why are noble gases unreactive?', 'Full outer shell'], ['What is made when sodium reacts with water?', 'Sodium hydroxide and hydrogen'], ['What colour is bromine at room temperature?', 'Red-brown liquid'],
    ['Predict how caesium reacts with water compared with potassium.', 'More vigorously'], ['Astatine is below iodine. Predict its state at room temperature.', 'Solid (dark/black)'],
    ['Chlorine is added to sodium iodide solution. Write the equation.', 'Cl₂ + 2NaI → 2NaCl + I₂'], ['Give two differences between iron and sodium.', 'Iron: higher mp, denser, harder, less reactive'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) atomic number  2) full/stable outer shell, do not need to gain or lose electrons  3) sodium hydroxide and hydrogen  4) red-brown liquid  5) more vigorous, outer electron further away, lost more easily  6) solid (trend: higher melting point down the group)  7) Cl₂ + 2NaI → 2NaCl + I₂ (solution turns brown)  8) any two: higher melting point, higher density, harder/stronger, less reactive, coloured compounds.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Caesium is in group 1. Write a balanced symbol equation for caesium reacting with water.', m: 2, lines: 1 },
    { l: 'b', q: 'Explain why caesium is more reactive than sodium.', m: 3, lines: 1 },
    { l: 'c', q: 'Describe what you would see when chlorine water is added to potassium bromide solution. Explain your answer.', m: 3, lines: 1 },
    { l: 'd', q: 'Explain why Mendeleev left gaps in his periodic table, and how this was later shown to be right.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'correct formulae Cs + H₂O → CsOH + H₂; balanced 2Cs + 2H₂O → 2CsOH + H₂', '2', ''],
    ['(b)', 'outer electron further from the nucleus / more shells; more shielding; weaker attraction so electron lost more easily', '3', ''],
    ['(c)', 'colourless to orange; chlorine more reactive than bromine; displaces bromine (bromine formed)', '3', ''],
    ['(d)', 'gaps for undiscovered elements; elements later found with the predicted properties (e.g. gallium, germanium)', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Why do elements in a group react in similar ways?', 'Name the gas made when lithium reacts with water.', 'Which is more reactive: fluorine or chlorine?', 'Give one use of a transition metal as a catalyst.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) same number of outer electrons  2) hydrogen  3) fluorine  4) iron in the Haber process; nickel for hardening oils; MnO₂ decomposing hydrogen peroxide. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain why argon is unreactive and why its boiling point is higher than neon’s.',
    'Write balanced equations for potassium with water, oxygen and chlorine.',
    'Explain why reactivity decreases down group 7.',
    'Predict what happens when bromine is added to potassium chloride. Explain.',
    'Compare Mendeleev’s table with the modern table (two points).',
    'Give three properties of transition metals, with examples.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) full outer shell; larger atoms, stronger forces between atoms  2) 2K + 2H₂O → 2KOH + H₂; 4K + O₂ → 2K₂O; 2K + Cl₂ → 2KCl  3) outer shell further from the nucleus, more shielding, weaker attraction for the incoming electron  4) no reaction: bromine is less reactive than chlorine  5) Mendeleev: atomic weight, gaps, swaps; modern: atomic number, no gaps, includes noble gases  6) different ion charges (Fe²⁺/Fe³⁺), coloured compounds (CuSO₄ blue), catalysts (Fe in the Haber process).');
}
balanced('HW K+O2', [[4, 'K'], [1, 'O2']], [[2, 'K2O']]); balanced('HW K+Cl2', [[2, 'K'], [1, 'Cl2']], [[2, 'KCl']]);

D.save(path.join(__dirname, 'AQA_8462_Chem_4.1_C_PeriodicTable.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
