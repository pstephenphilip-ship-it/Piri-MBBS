// build_4_7_C.js — AQA GCSE Chemistry (8462) 4.7 Organic chemistry, lesson 3 of 3 (chemistry only):
// 4.7.3.1 Addition polymerisation, 4.7.3.2 Condensation polymerisation (HT), 4.7.3.3 Amino acids (HT),
// 4.7.3.4 DNA and other naturally occurring polymers.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_7_C.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, parse, helpers } = require('./chem_common');

const D = T.init(deck('4.7.3', 'Polymers and natural polymers'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };

// ======================= checks =======================
// addition polymers: the monomer and the repeating unit have the same atoms
const atomsOf = g => { const o = { C: 2 }; g.forEach(x => { const p = parse(x); for (const k in p) o[k] = (o[k] || 0) + p[k]; }); return o; };
const eqAtoms = (a, b) => Object.keys({ ...a, ...b }).every(k => (a[k] || 0) === (b[k] || 0)) ? 1 : 0;
const MON = {
  ethene: ['H', 'H', 'H', 'H'], propene: ['H', 'H', 'H', 'CH3'], chloroethene: ['H', 'H', 'H', 'Cl'], tetrafluoroethene: ['F', 'F', 'F', 'F'], styrene: ['H', 'H', 'H', 'C6H5'],
};
calc('ethene', eqAtoms(atomsOf(MON.ethene), parse('C2H4')), 1); calc('propene', eqAtoms(atomsOf(MON.propene), parse('C3H6')), 1);
calc('chloroethene', eqAtoms(atomsOf(MON.chloroethene), parse('C2H3Cl')), 1); calc('TFE', eqAtoms(atomsOf(MON.tetrafluoroethene), parse('C2F4')), 1);
calc('styrene', eqAtoms(atomsOf(MON.styrene), parse('C8H8')), 1);
// condensation: dipeptide from two glycine molecules loses one water
balanced('glycine dipeptide', [[2, 'C2H5NO2']], [[1, 'C4H8N2O3'], [1, 'H2O']]);
balanced('alanine+glycine', [[1, 'C3H7NO2'], [1, 'C2H5NO2']], [[1, 'C5H10N2O3'], [1, 'H2O']]);
// ester link from ethanediol + ethanedioic acid (one link)
balanced('ester link', [[1, 'C2H6O2'], [1, 'C2H2O4']], [[1, 'C4H6O5'], [1, 'H2O']]);
calc('water per n', 2, 2); // n diol + n diacid → polyester + 2n H2O (AQA convention)
// glucose units in starch: n C6H12O6 → (C6H10O5)n + n H2O
balanced('glucose unit', [[1, 'C6H12O6']], [[1, 'C6H10O5'], [1, 'H2O']]);

// ======================= drawings =======================
const at = (s, t, cx, cy, sz = 16) => txt(s, t, cx - 0.3, cy - 0.2, 0.6, 0.4, { size: sz, bold: t !== 'H', align: 'center', valign: 'middle', color: t === 'H' ? C.grey : t === 'C' ? C.ink : C.red });
// g = [up1, down1, up2, down2]
function monomer(s, x, y, g, sz = 16) {
  const c1 = x + 0.4, c2 = x + 1.2, h = 0.15;
  at(s, 'C', c1, y, sz); at(s, 'C', c2, y, sz);
  seg(s, c1 + h, y - 0.05, c2 - h, y - 0.05, C.ink, 1.5); seg(s, c1 + h, y + 0.05, c2 - h, y + 0.05, C.ink, 1.5);
  [[c1, -1, g[0]], [c1, 1, g[1]], [c2, -1, g[2]], [c2, 1, g[3]]].forEach(([cx, d, t]) => { seg(s, cx, y + d * h, cx, y + d * 0.32, C.ink, 1.5); at(s, t.replace('CH3', 'CH₃').replace('C6H5', 'C₆H₅'), cx, y + d * 0.5, sz); });
}
function unit(s, x, y, g, sz = 16) {
  const c1 = x + 0.75, c2 = x + 1.55, h = 0.15;
  seg(s, x + 0.2, y, c1 - h, y, C.ink, 1.5); seg(s, c1 + h, y, c2 - h, y, C.ink, 1.5); seg(s, c2 + h, y, x + 2.1, y, C.ink, 1.5);
  at(s, 'C', c1, y, sz); at(s, 'C', c2, y, sz);
  [[c1, -1, g[0]], [c1, 1, g[1]], [c2, -1, g[2]], [c2, 1, g[3]]].forEach(([cx, d, t]) => { seg(s, cx, y + d * h, cx, y + d * 0.32, C.ink, 1.5); at(s, t.replace('CH3', 'CH₃').replace('C6H5', 'C₆H₅'), cx, y + d * 0.5, sz); });
  const bl = x + 0.45, br = x + 1.85;
  seg(s, bl, y - 0.6, bl, y + 0.6, C.ink, 2); seg(s, bl, y - 0.6, bl + 0.12, y - 0.6, C.ink, 2); seg(s, bl, y + 0.6, bl + 0.12, y + 0.6, C.ink, 2);
  seg(s, br, y - 0.6, br, y + 0.6, C.ink, 2); seg(s, br - 0.12, y - 0.6, br, y - 0.6, C.ink, 2); seg(s, br - 0.12, y + 0.6, br, y + 0.6, C.ink, 2);
  txt(s, 'n', br + 0.05, y + 0.35, 0.3, 0.35, { size: sz, bold: true, italic: true });
}
function polymerEq(s, x, y, g, sz = 16) {
  txt(s, 'n', x, y - 0.2, 0.3, 0.4, { size: sz + 2, bold: true, italic: true, valign: 'middle' });
  monomer(s, x + 0.25, y, g, sz);
  arrow(s, x + 1.95, y, x + 2.7, y, C.ink, 2);
  unit(s, x + 2.7, y, g, sz);
}
function block(s, x, y, w, h, col, t) { rect(s, x, y, w, h, col, C.ink, { lw: 1.25 }); if (t) txt(s, t, x, y, w, h, { size: 14, bold: true, align: 'center', valign: 'middle' }); }

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Addition polymers and repeating units, condensation polymers, amino acids and proteins, DNA, starch and cellulose',
  bullets: ['Part 1: addition polymerisation (4.7.3.1)', 'Part 2: condensation polymerisation (4.7.3.2, HT)', 'Part 3: amino acids and proteins (4.7.3.3, HT)', 'Part 4: DNA and other natural polymers (4.7.3.4)'],
  notes: 'AQA 8462 GCSE Chemistry 4.7, lesson 3 of 3 (separate science only). Monomer and repeating-unit drawings are simplified. About two hours.',
});

D.objectives({
  tag: '4.7.3',
  items: [
    'Draw the **repeating unit** of an addition polymer from its **monomer**, and back.',
    'Explain **condensation polymerisation** with two functional groups (HT).',
    'Describe how **amino acids** join to make **proteins** (HT).',
    'Name the monomers in **DNA**, **proteins**, **starch** and **cellulose**.',
  ],
  keywords: ['monomer', 'polymer', 'repeating unit', 'addition', 'condensation', 'amino acid', 'nucleotide'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What functional group do alkenes have?', 'Ethanol + ethanoic acid makes?', 'Why are polymers solid at room temperature?', 'What is made when ethene reacts with hydrogen?'],
  answers: ['C=C', 'ethyl ethanoate + water', 'large molecules, strong intermolecular forces', 'ethane'],
  notes: 'Retrieval from lesson 2 and 4.2.',
});

D.vocab({
  title: 'Key words', tag: '4.7.3',
  items: [
    { term: 'Monomer', def: 'A small molecule that joins with many others to make a **polymer**.' },
    { term: 'Addition polymer', def: 'Made from **alkene** monomers; the C=C opens and they join. **Only one product**.' },
    { term: 'Condensation polymer', def: 'Monomers with **two functional groups** join and a **small molecule** (often water) is **lost** (HT).' },
    { term: 'Repeating unit', def: 'The part of the polymer that repeats; drawn in **brackets** with **n**.' },
  ],
  notes: 'Spec 4.7.3.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: addition polymerisation', { tag: '4.7.3.1' });
  txt(s, 'ethene → poly(ethene)', MX, 1.4, 6, 0.4, { size: 19, bold: true, color: C.maroon });
  polymerEq(s, MX + 0.6, 2.75, MON.ethene, 18);
  txt(s, 'monomer', MX + 0.9, 3.55, 1.6, 0.35, { size: 14, bold: true, align: 'center' });
  txt(s, 'repeating unit', MX + 3.2, 3.55, 2.2, 0.35, { size: 14, bold: true, align: 'center' });
  const bx = MX + 6.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.0, 'What happens', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Many **alkene** monomers join.', 'The **C=C** opens: each carbon makes a new bond to the next monomer.', 'The polymer is the **only product**.'], 16, 0.12);
  headCard(s, MX, 4.6, W - 2 * MX, 2.25, 'Drawing the repeating unit', C.green, C.greenSoft);
  bullets(s, MX + 0.2, 5.3, W - 2 * MX - 0.4, ['Change **C=C** to **C–C**; keep the **same groups** on each carbon.', 'Draw bonds **through the brackets** on both sides, and add **n**.', 'Name: **poly(** monomer **)**. The monomer and the repeating unit have the **same atoms**.'], 16, 0.08);
  notes(s, 'Spec 4.7.3.1: "Alkenes can be used to make polymers such as poly(ethene) and poly(propene) by addition polymerisation. In addition polymerisation reactions, many small molecules (monomers) join together to form very large molecules (polymers). In addition polymers the repeating unit has the same atoms as the monomer because no other molecule is formed in the reaction. Students should be able to: recognise addition polymers and monomers from diagrams in the forms shown and from the presence of the functional group C=C in the monomers; draw diagrams to represent the formation of a polymer from a given alkene monomer; relate the repeating unit to the monomer."');
}

{
  const s = frame('More addition polymers', { tag: '4.7.3.1' });
  [['propene → poly(propene)', MON.propene, 'ropes, crates'], ['chloroethene → poly(chloroethene), PVC', MON.chloroethene, 'window frames, pipes'], ['tetrafluoroethene → PTFE', MON.tetrafluoroethene, 'non-stick pans']].forEach(([t, g, use], i) => {
    const y = 1.45 + i * 1.8;
    rect(s, MX, y, W - 2 * MX, 1.65, i % 2 ? C.white : C.soft, C.line);
    txt(s, t, MX + 0.2, y + 0.08, 6.5, 0.4, { size: 17, bold: true, color: C.maroon });
    polymerEq(s, MX + 0.4, y + 1.0, g, 15);
    txt(s, 'Uses: ' + use, MX + 7.0, y + 0.75, 5.0, 0.5, { size: 16 });
  });
  notes(s, 'Only poly(ethene) and poly(propene) are named on the spec, but students must be able to draw any polymer from a given monomer. Each monomer and repeating unit are checked to contain the same atoms in the build script.');
}

D.myTurnYourTurn({
  title: 'Monomer ↔ polymer', tag: 'Skill practice', stepSize: 17, labelW: 2.7, labelSize: 15, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Draw or name:',
    steps: [
      { label: 'Polymer of butene?', text: '**poly(butene)**' },
      { label: 'Monomer of poly(styrene)?', text: '**styrene**' },
    ],
  },
  yours: {
    q: 'Draw or name:',
    steps: [
      { label: 'Polymer of chloroethene?', text: '**poly(chloroethene)**, PVC' },
      { label: 'Unit C–C with 4 F: monomer?', text: '**tetrafluoroethene**' },
    ],
  },
  notes: 'Ask students to draw each on whiteboards: change C=C to C–C, add brackets with bonds through them and n. To go back, remove the brackets and n and make the C–C a C=C.',
});

D.hinge({
  title: 'Quick check',
  q: 'Why is addition polymerisation called "addition"?',
  options: ['The monomers add together with no other product', 'Water is added', 'A catalyst is added', 'Hydrogen is added'],
  correct: 0,
  notes: 'Answer A. B describes the reverse of condensation. C and D are not the reason.',
});

// ---------------- Part 2 (HT) ----------------
{
  const s = frame('Part 2: condensation polymerisation', HT);
  note(s, MX, 1.4, W - 2 * MX, 0.9, 'Monomers each have **two functional groups**. When they join, a **small molecule** such as **water** is **lost**.', { fill: C.soft, line: C.line, size: 18 });
  txt(s, 'Polyester: diol + dicarboxylic acid', MX, 2.5, 7, 0.4, { size: 18, bold: true, color: C.maroon });
  const y = 3.35;
  block(s, MX + 0.3, y, 0.8, 0.5, 'F6D7D3', 'HO–'); block(s, MX + 1.1, y, 1.0, 0.5, C.white, '▢'); block(s, MX + 2.1, y, 0.8, 0.5, 'F6D7D3', '–OH');
  txt(s, '+', MX + 3.0, y, 0.4, 0.5, { size: 22, bold: true, align: 'center', valign: 'middle' });
  block(s, MX + 3.5, y, 1.1, 0.5, 'CFE0F5', 'HOOC–'); block(s, MX + 4.6, y, 1.0, 0.5, C.white, '◯'); block(s, MX + 5.6, y, 1.1, 0.5, 'CFE0F5', '–COOH');
  txt(s, '→  –[ ▢ –OOC– ◯ –COO– ]ₙ–  +  2n H₂O', MX + 6.9, y, W - MX - (MX + 6.9), 0.5, { size: 17, bold: true, valign: 'middle' });
  txt(s, 'n of each monomer. Boxes stand for the carbon chains. The product is a polyester.', MX + 0.3, y + 0.6, 9, 0.35, { size: 13, italic: true, color: C.grey });
  const tw = W - 2 * MX;
  table(s, MX, 4.55, [tw * 0.3, tw * 0.35, tw * 0.35], ['', 'Addition', 'Condensation'], [
    ['Monomers', 'one type, with C=C', 'two functional groups (often two types)'], ['Products', 'polymer only', 'polymer + small molecule (water)'], ['Repeating unit', 'same atoms as the monomer', 'fewer atoms than the monomers'],
  ], { rh: 0.62, size: 16 });
  notes(s, 'Spec 4.7.3.2 (HT): "Condensation polymerisation involves monomers with two functional groups. When these types of monomers react they join together, usually losing small molecules such as water, and so the reactions are called condensation reactions. The simplest polymers are produced from two different monomers with two of the same functional groups on each monomer. For example: ethane diol and hexanedioic acid → polyester + water. Students should be able to explain the basic principles of condensation polymerisation by reference to the functional groups in the monomers and the repeating units in the polymers." AQA writes the water as 2n H₂O. One ester link (ethanediol + ethanedioic acid) is checked in the build script.');
}

// ---------------- Part 3 (HT) ----------------
{
  const s = frame('Part 3: amino acids and proteins', HT);
  txt(s, 'Glycine, H₂NCH₂COOH', MX, 1.4, 6, 0.4, { size: 18, bold: true, color: C.maroon });
  block(s, MX + 0.3, 2.0, 1.0, 0.55, 'F6D7D3', 'H₂N–'); block(s, MX + 1.3, 2.0, 1.0, 0.55, C.white, 'CH₂'); block(s, MX + 2.3, 2.0, 1.2, 0.55, 'CFE0F5', '–COOH');
  txt(s, 'amine group', MX + 0.1, 2.6, 1.6, 0.35, { size: 13, bold: true, align: 'center' });
  txt(s, 'carboxylic acid group', MX + 2.0, 2.6, 2.2, 0.35, { size: 13, bold: true, align: 'center' });
  const bx = MX + 6.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.0, 'Key points', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Amino acids have **two different functional groups**.', 'They join by **condensation polymerisation** to make **polypeptides**.', 'Different amino acids combine to make **proteins**.'], 16, 0.12);
  rect(s, MX, 3.3, 5.9, 1.1, C.orangeSoft, 'F3D9B5');
  txt(s, 'glycine + glycine → dipeptide + water\n2C₂H₅NO₂ → C₄H₈N₂O₃ + H₂O', MX + 0.25, 3.3, 5.4, 1.1, { size: 16, valign: 'middle' });
  // chain of beads
  const cols = ['E07B39', '3C7DC4', '5E9C3E', 'C9A227', 'E07B39', '7A4E9C', '3C7DC4', '5E9C3E'];
  cols.forEach((c, i) => { circle(s, MX + 0.6 + i * 1.45, 5.55, 0.7, c, '333333', 1); if (i < cols.length - 1) seg(s, MX + 0.95 + i * 1.45, 5.55, MX + 1.7 + i * 1.45, 5.55, C.ink, 2.5); });
  txt(s, 'A protein: many different amino acids joined in a chain (each colour = a different amino acid)', MX, 6.15, W - 2 * MX, 0.4, { size: 15, italic: true, align: 'center', color: C.grey });
  notes(s, 'Spec 4.7.3.3 (HT): "Amino acids have two different functional groups in a molecule. Amino acids react by condensation polymerisation to produce polypeptides. For example: glycine is H2NCH2COOH and polymerises to produce the polypeptide (-HNCH2COO-)n and n H2O. Different amino acids can be combined in the same chain to produce proteins." The dipeptide equation is checked by atom counting.');
}

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'Which pair of functional groups does an amino acid have?',
  options: ['–NH₂ and –COOH', '–OH and –COOH', 'C=C and –OH', 'two –COOH groups'],
  correct: 0,
  notes: 'Answer A: amine and carboxylic acid. B is an alcohol with an acid group. C and D are not amino acids.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: DNA and other natural polymers', { tag: '4.7.3.4' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.24, tw * 0.3, tw * 0.46], ['Natural polymer', 'Monomers', 'Notes'], [
    ['DNA', '**nucleotides** (four different ones)', 'two strands in a **double helix**; carries **genetic** instructions'],
    ['Proteins', '**amino acids**', 'enzymes, muscle, hair'],
    ['Starch', '**glucose** (a sugar)', 'energy store in plants'],
    ['Cellulose', '**glucose** (a sugar)', 'plant **cell walls**'],
  ], { rh: 0.62, size: 16 });
  // simple double helix sketch: two zigzag strands with rungs
  const x0 = MX + 0.4, y0 = 5.25;
  for (let i = 0; i < 12; i++) {
    const xa = x0 + i * 0.6, ya = y0 + Math.sin(i * 0.75) * 0.45, yb = y0 - Math.sin(i * 0.75) * 0.45 + 0.9;
    seg(s, xa, ya, xa, yb, ['E07B39', '3C7DC4', '5E9C3E', 'C9A227'][i % 4], 3);
    if (i < 11) { const xn = xa + 0.6; seg(s, xa, ya, xn, y0 + Math.sin((i + 1) * 0.75) * 0.45, C.maroon, 2.5); seg(s, xa, yb, xn, y0 - Math.sin((i + 1) * 0.75) * 0.45 + 0.9, C.blue, 2.5); }
  }
  note(s, MX + 7.5, 4.85, W - MX - (MX + 7.5), 2.0, 'DNA: two polymer chains, made from **four different nucleotides**, wound into a **double helix**.', { size: 16 });
  notes(s, 'Spec 4.7.3.4: "Deoxyribonucleic acid (DNA) is a large molecule essential for life. DNA encodes genetic instructions for the development and functioning of living organisms and viruses. Most DNA molecules are two polymer chains, made from four different monomers called nucleotides, in the form of a double helix. Other naturally occurring polymers important for life include proteins, starch and cellulose. Students should be able to name the types of monomers from which these naturally occurring polymers are made." The helix is a flat schematic sketch. Links to Biology 4.6.1.4.');
}

D.hinge({
  title: 'Quick check',
  q: 'What are the monomers of starch and cellulose?',
  options: ['Glucose (sugars)', 'Amino acids', 'Nucleotides', 'Ethene'],
  correct: 0,
  notes: 'Answer A. B make proteins. C make DNA. D makes poly(ethene).',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is a monomer?', 'A small molecule that joins to make a polymer'], ['What functional group do addition-polymer monomers have?', 'C=C'], ['What are the monomers of DNA?', 'Nucleotides'], ['What is lost in condensation polymerisation? (HT)', 'A small molecule, usually water'],
    ['Name the polymer made from propene.', 'Poly(propene)'], ['A repeating unit is C–C with one Cl. Name the monomer.', 'Chloroethene'],
    ['Give two differences between addition and condensation polymers. (HT)', 'Monomer C=C vs 2 groups; one product vs + water'], ['What two groups does an amino acid have? (HT)', 'Amine (–NH₂) and carboxylic acid (–COOH)'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) a small molecule that can join with many others to form a polymer  2) C=C  3) nucleotides (four different)  4) a small molecule, usually water  5) poly(propene)  6) chloroethene  7) addition: one monomer with C=C, polymer only, repeating unit same atoms as monomer; condensation: monomers with two functional groups, water also made  8) amine and carboxylic acid groups.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  parts: [
    { l: 'a', q: 'Draw the repeating unit of poly(propene) and explain why the repeating unit has the same atoms as propene.', m: 3, lines: 1 },
    { l: 'b', q: 'Describe how a polyester is formed from its monomers. (HT)', m: 3, lines: 1 },
    { l: 'c', q: 'Proteins are made from amino acids. Name the type of polymerisation and the other product. (HT)', m: 2, lines: 0 },
    { l: 'd', q: 'Describe the structure of DNA.', m: 2, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'correct unit (C–C, CH₃ on one carbon, H elsewhere, brackets and n); no other product formed so no atoms lost', '3', '2 for the drawing'],
    ['(b)', 'monomers: a diol and a dicarboxylic acid (two functional groups each); join by condensation; water lost (2n H₂O)', '3', ''],
    ['(c)', 'condensation; water', '2', ''],
    ['(d)', 'two polymer chains in a double helix; made from four different nucleotides', '2', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Draw the repeating unit of poly(ethene).', 'What is the monomer of PVC?', 'Name the monomers in proteins.', 'Name two natural polymers made from glucose.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) [–CH₂–CH₂–]n with brackets and n  2) chloroethene  3) amino acids  4) starch and cellulose. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw the formation of poly(ethene) and poly(propene) from their monomers.',
    'Draw the monomer for PTFE from its repeating unit.',
    'HT: explain, using functional groups, how a polyester forms.',
    'HT: compare addition and condensation polymerisation in a table.',
    'HT: write the equation for two glycine molecules joining.',
    'Name the monomers in DNA, proteins, starch and cellulose.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) see Part 1  2) C₂F₄ with C=C  3) diol (–OH groups) + dicarboxylic acid (–COOH groups), ester links form, water lost  4) see the comparison table  5) 2C₂H₅NO₂ → C₄H₈N₂O₃ + H₂O  6) nucleotides; amino acids; glucose; glucose.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.7_C_Polymers.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
