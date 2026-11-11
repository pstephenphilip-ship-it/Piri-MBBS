// build_4_1_A.js — AQA GCSE Biology (8461) 4.1 Cell biology, lesson 1 of 3:
// 4.1.1.1 Eukaryotes and prokaryotes, 4.1.1.2 Animal and plant cells, 4.1.1.3 Cell specialisation,
// 4.1.1.4 Cell differentiation, 4.1.1.5 Microscopy (+ Required practical 1).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_1_A.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.1.1', title: 'Cells and microscopy',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const F = (n, d) => ({ n, d });
const near = (l, a, b) => calc(l, a, b, 1e-9 * Math.max(1, Math.abs(b)));

// ======================= numbers (all checked) =======================
near('mag ex', 30 / 0.015, 2000); near('um', 0.015 * 1000, 15);
near('MT mag', 12 / 0.004, 3000); near('MT real', 25 / 500, 0.05); near('MT um', 0.05 * 1000, 50); near('MT image', 400 * 0.02, 8);
near('YT mag', 18 / 0.006, 3000); near('YT real', 40 / 800, 0.05); near('YT um', 0.05 * 1000, 50); near('YT image', 1500 * 0.004, 6);
near('sf1', 0.000002, 2e-6); near('sf2', 25e-9 / 1e-6, 0.025);
near('P7', 36 / 0.012, 3000); near('P8', 15 / 1000, 0.015); near('exam', 45 / 1500, 0.03); near('exam um', 0.03 * 1000, 30); near('HW', 22 / 0.011, 2000);

function headCard(s, x, y, w, h, head, colour, fill) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
}
function bullets(s, x, y, w, items, size = 18, gap = 0.16) {
  items.forEach(t => { const th = D.textH(t, size, w - 0.3); txt(s, '•', x, y, 0.3, 0.4, { size, bold: true, color: C.accent }); txt(s, t, x + 0.3, y, w - 0.3, th + 0.05, { size }); y += th + gap; });
  return y;
}
function seg(s, x1, y1, x2, y2, color, width = 1.25) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipV: (x2 - x1) * (y2 - y1) < 0, line: { color, width } });
}
function ell(s, x, y, w, h, fill, line, lw = 1.5) { s.addShape(D.SH.ellipse, { x, y, w, h, fill: { color: fill }, line: { color: line, width: lw } }); }
// label with a leader line from (px,py) to the label at (lx,ly)
function tag(s, px, py, lx, ly, t, right = true) {
  seg(s, px, py, lx, ly, C.grey, 1);
  circle(s, px, py, 0.08, C.ink);
  txt(s, t, right ? lx + 0.05 : lx - 2.05, ly - 0.17, 2.0, 0.34, { size: 13, bold: true, align: right ? 'left' : 'right' });
}
function animalCell(s, cx, cy, w, h) {
  ell(s, cx - w / 2, cy - h / 2, w, h, 'FBE9E7', 'B5655B', 2);
  circle(s, cx - 0.2, cy, 0.85, 'D9A7A0', '8C4A42', 1.5);
  [[0.75, -0.4], [0.6, 0.55], [-0.95, 0.5]].forEach(([dx, dy]) => ell(s, cx + dx - 0.22, cy + dy - 0.1, 0.44, 0.2, 'F0B26B', 'B5782E', 1));
  [[0.3, -0.75], [0.95, 0.15], [-0.7, -0.6], [0.1, 0.8], [-1.1, -0.1]].forEach(([dx, dy]) => circle(s, cx + dx, cy + dy, 0.07, '555555'));
}
function plantCell(s, cx, cy, w, h) {
  rect(s, cx - w / 2, cy - h / 2, w, h, 'E3F1DA', '3E7A2E', { lw: 4 });
  rect(s, cx - w / 2 + 0.1, cy - h / 2 + 0.1, w - 0.2, h - 0.2, 'EEF7E8', '6A9E58', { lw: 1 });
  rect(s, cx - w / 2 + 0.6, cy - h / 2 + 0.55, w - 1.15, h - 1.1, 'DDEBF7', '5B87B5', { lw: 1.5 });
  circle(s, cx + w / 2 - 0.4, cy - h / 2 + 0.45, 0.5, 'D9A7A0', '8C4A42', 1.5);
  [[-w / 2 + 0.33, -0.6], [-w / 2 + 0.33, 0.1], [-w / 2 + 0.33, 0.75], [w / 2 - 0.33, 0.4], [w / 2 - 0.33, 1.0]].forEach(([dx, dy]) => ell(s, cx + dx - 0.13, cy + dy - 0.2, 0.26, 0.4, '6DBE5A', '35582A', 1));
}
function bacterium(s, cx, cy, w, h) {
  rect(s, cx - w / 2, cy - h / 2, w, h, 'E7F0F7', '2A6F8E', { lw: 3 });
  for (let i = 0; i < 6; i++) seg(s, cx - 0.9 + i * 0.3, cy - 0.15 + (i % 2) * 0.3, cx - 0.6 + i * 0.3, cy + 0.15 - (i % 2) * 0.3, '7A4E9C', 2.5);
  circle(s, cx + 0.95, cy - 0.35, 0.28, C.white, C.red, 2); circle(s, cx + 1.0, cy + 0.35, 0.22, C.white, C.red, 2);
  for (let i = 0; i < 5; i++) seg(s, cx + w / 2 + i * 0.25, cy + (i % 2 ? 0.12 : -0.12), cx + w / 2 + (i + 1) * 0.25, cy + (i % 2 ? -0.12 : 0.12), C.ink, 2);
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'Eukaryotic and prokaryotic cells, animal and plant cells, specialised cells, differentiation, microscopes and magnification',
  bullets: ['Part 1: eukaryotes, prokaryotes, animal and plant cells (4.1.1.1, 4.1.1.2)', 'Part 2: specialisation and differentiation (4.1.1.3, 4.1.1.4)', 'Part 3: microscopy and magnification (4.1.1.5)', 'Part 4: Required practical 1: using a light microscope'],
  notes: 'AQA 8461 GCSE Biology 4.1 Cell biology, lesson 1 of 3. Lesson 2: cell division, stem cells and culturing microorganisms (RP2). Lesson 3: transport in cells (RP3). Diagrams are simplified plain-shape sketches. About two hours.',
});

D.objectives({
  tag: '4.1.1',
  items: [
    'Compare **eukaryotic** and **prokaryotic** cells, and **orders of magnitude** of size.',
    'Label **animal** and **plant** cells and give the **function** of each part.',
    'Explain how **specialised cells** are adapted, and what **differentiation** is.',
    'Use **magnification = image ÷ real**, with **units** and **standard form**; do **RP1**.',
  ],
  keywords: ['eukaryotic', 'prokaryotic', 'organelle', 'differentiation', 'magnification', 'resolution'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['How many millimetres are in 1 cm?', 'Write 0.004 in standard form.', 'Rearrange  a = b ÷ c  to make b the subject.', 'Name one organelle you remember from KS3.'],
  answers: ['10', '4 × 10⁻³', 'b = a × c', 'e.g. nucleus, chloroplast'],
  notes: 'The maths today: unit conversion, standard form, rearranging. 1 mm = 1000 µm; 1 µm = 1000 nm.',
});

D.vocab({
  title: 'Key words', tag: '4.1.1',
  items: [
    { term: 'Eukaryotic', def: 'Cells with **genetic material enclosed in a nucleus**: animal and plant cells.' },
    { term: 'Prokaryotic', def: 'Much smaller cells with **no nucleus**: DNA is a single loop in the cytoplasm (bacteria).' },
    { term: 'Magnification', def: 'How many times **bigger** an image is than the real object.' },
    { term: 'Resolution', def: 'The ability to tell **two points apart**: higher resolution shows more **detail**.' },
  ],
  notes: 'Organelle: a structure inside a cell with a particular job.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: animal and plant cells', { tag: '4.1.1.2' });
  const ax = MX + 2.2, ay = 3.45;
  animalCell(s, ax, ay, 3.0, 2.3);
  txt(s, 'Animal cell', ax - 1.5, 1.4, 3.0, 0.4, { size: 18, bold: true, color: C.maroon, align: 'center' });
  tag(s, ax - 0.2, ay, ax - 0.8, ay + 1.75, 'nucleus', false);
  tag(s, ax + 0.75, ay - 0.4, ax + 1.55, ay - 1.45, 'mitochondrion');
  tag(s, ax + 0.95, ay + 0.15, ax + 1.75, ay + 0.55, 'ribosome');
  tag(s, ax - 0.4, ay + 1.12, ax + 0.4, ay + 1.75, 'cell membrane');
  tag(s, ax - 0.95, ay - 0.35, ax - 1.75, ay - 0.95, 'cytoplasm', false);
  const px = MX + 8.9, py = 3.45;
  plantCell(s, px, py, 2.6, 3.0);
  txt(s, 'Plant cell', px - 1.3, 1.4, 2.6, 0.4, { size: 18, bold: true, color: C.green, align: 'center' });
  tag(s, px - 1.3, py - 0.5, px - 2.1, py - 1.2, 'cell wall', false);
  tag(s, px - 0.97, py + 0.1, px - 2.1, py + 0.4, 'chloroplast', false);
  tag(s, px, py + 0.4, px - 0.6, py + 1.95, 'permanent vacuole', false);
  tag(s, px + 0.9, py - 1.05, px + 1.75, py - 1.5, 'nucleus');
  tag(s, px + 1.2, py + 0.2, px + 1.75, py + 0.6, 'cell membrane');
  rect(s, MX, 5.95, W - 2 * MX, 0.9, C.soft, C.line);
  txt(s, 'Plant cells have **everything** an animal cell has, **plus**: a cellulose **cell wall**, **chloroplasts** and a **permanent vacuole** of cell sap.', MX + 0.3, 5.95, W - 2 * MX - 0.6, 0.9, { size: 17, valign: 'middle' });
  notes(s, 'Spec 4.1.1.2. Students should be able to explain how the main sub-cellular structures, including the nucleus, cell membranes, mitochondria, chloroplasts in plant cells and plasmids in bacterial cells, are related to their functions. Simplified sketches (not to scale).');
}

{
  const s = frame('What each part does', { tag: '4.1.1.2' });
  const rows = [['Nucleus', 'contains genetic material; controls the activities of the cell'], ['Cytoplasm', 'gel where most chemical reactions happen (enzymes)'], ['Cell membrane', 'controls what enters and leaves the cell'], ['Mitochondria', 'aerobic respiration: release energy'], ['Ribosomes', 'protein synthesis'], ['Cell wall (plants)', 'made of cellulose: strengthens the cell'], ['Chloroplasts (plants)', 'absorb light for photosynthesis'], ['Permanent vacuole (plants)', 'filled with cell sap: keeps the cell rigid']];
  rows.forEach(([a, b], i) => {
    const y = 1.4 + i * 0.68, pl = i >= 5;
    rect(s, MX, y, W - 2 * MX, 0.62, i % 2 ? C.white : (pl ? C.greenSoft : C.soft), C.line);
    txt(s, a, MX + 0.25, y, 3.9, 0.62, { size: 18, bold: true, color: pl ? C.green : C.maroon, valign: 'middle' });
    txt(s, b, MX + 4.2, y, W - 2 * MX - 4.4, 0.62, { size: 18, valign: 'middle' });
  });
  notes(s, 'Spec 4.1.1.2. The first five are in most animal and plant cells. Mitochondria are where aerobic respiration happens, not where energy is "made".');
}

{
  const s = frame('Prokaryotic cells: bacteria', { tag: '4.1.1.1' });
  bacterium(s, MX + 2.8, 3.1, 3.2, 1.7);
  tag(s, MX + 2.2, 3.1, MX + 1.4, 4.6, 'single loop of DNA (no nucleus)', false);
  tag(s, MX + 3.75, 2.75, MX + 4.6, 1.75, 'plasmid (small ring of DNA)');
  tag(s, MX + 1.2, 2.25, MX + 1.0, 1.75, 'cell wall', false);
  txt(s, 'flagellum', MX + 4.6, 3.3, 1.6, 0.35, { size: 13, bold: true });
  const bx = MX + 6.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.4, 'Eukaryotic vs prokaryotic', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['**Eukaryotes**: DNA in a **nucleus**; have mitochondria (and chloroplasts in plants).', '**Prokaryotes**: **no nucleus**; DNA in a single loop, plus **plasmids**; have a cell membrane, cytoplasm and cell wall.', 'Prokaryotes are **much smaller**.'], 16, 0.15);
  rect(s, MX, 5.05, W - 2 * MX, 1.8, C.orangeSoft, 'F3D9B5');
  txt(s, '**Orders of magnitude:** a bacterium is about **1 µm** long (1 × 10⁻⁶ m); an animal cell about **20 µm**; a plant cell about **100 µm**. A plant cell is about **100 times** (two orders of magnitude) longer than a bacterium.', MX + 0.3, 5.05, W - 2 * MX - 0.6, 1.8, { size: 17, valign: 'middle' });
  notes(s, 'Spec 4.1.1.1: "Bacterial cells (prokaryotic cells) are much smaller in comparison. They have cytoplasm and a cell membrane surrounded by a cell wall. The genetic material is not enclosed in a nucleus. It is a single DNA loop and there may be one or more small rings of DNA called plasmids." Students should understand orders of magnitude and use prefixes centi, milli, micro and nano. Typical sizes; actual sizes vary.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which structure is found in a plant cell but NOT in an animal cell?',
  options: ['Chloroplast', 'Mitochondrion', 'Nucleus', 'Ribosome'],
  correct: 0,
  notes: 'Answer A. B, C and D are in both. (Cell wall and permanent vacuole are also plant-only.)',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: specialised cells', { tag: '4.1.1.3' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, h = 2.55;
  const cells = [
    ['Sperm cell', 'Tail to swim; many **mitochondria** for energy; head with **enzymes** to get into the egg.', C.maroon],
    ['Nerve cell', '**Long axon** to carry impulses; branched endings to connect to other cells.', C.maroon],
    ['Muscle cell', 'Protein fibres that **contract**; many **mitochondria**.', C.maroon],
    ['Root hair cell', 'Long hair: **large surface area** to absorb water and mineral ions.', C.green],
    ['Xylem', 'Dead cells joined end to end; **lignin** strengthens; carries water up.', C.green],
    ['Phloem', 'Cells with **sieve plates**; carries dissolved sugars; companion cells supply energy.', C.green],
  ];
  cells.forEach(([a, b, col], i) => {
    const x = MX + (i % 3) * (cw + gap), y = 1.4 + Math.floor(i / 3) * (h + 0.3);
    headCard(s, x, y, cw, h, a, col, col === C.green ? C.greenSoft : C.soft);
    txt(s, b, x + 0.2, y + 0.72, cw - 0.4, h - 0.85, { size: 17 });
  });
  notes(s, 'Spec 4.1.1.3: students should be able to explain how the structure of different types of cell relate to their function: sperm, nerve and muscle cells in animals; root hair, xylem and phloem cells in plants.');
}

{
  const s = frame('Cell differentiation', { tag: '4.1.1.4' });
  rect(s, MX, 1.4, W - 2 * MX, 1.15, C.soft, C.line);
  txt(s, '**Differentiation**: a cell changes to become **specialised**. It develops the sub-cellular structures it needs to do its job.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.15, { size: 19, valign: 'middle' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.8, h = 4.05;
  headCard(s, MX, top, cw, h, 'Animals', C.maroon, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['Most cells differentiate at an **early stage** of development.', 'In adults, cell division is mainly for **repair** and **replacement**.'], 18, 0.25);
  headCard(s, MX + cw + gap, top, cw, h, 'Plants', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Many cells can differentiate **throughout life**.', 'This is why plants can be grown from **cuttings**.'], 18, 0.25);
  notes(s, 'Spec 4.1.1.4: "As an organism develops, cells differentiate to form different types of cells. Most types of animal cell differentiate at an early stage. Many types of plant cells retain the ability to differentiate throughout life. In mature animals, cell division is mainly restricted to repair and replacement." Links to stem cells in lesson 2.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does a sperm cell have many mitochondria?',
  options: ['To release energy for swimming', 'To make proteins', 'To store genetic material', 'To absorb water'],
  correct: 0,
  notes: 'Answer A: respiration in mitochondria releases energy for the tail. B is ribosomes. C is the nucleus. D is a root hair cell.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: light and electron microscopes', { tag: '4.1.1.5' });
  const head = ['', 'Light microscope', 'Electron microscope'];
  const rows = [['Uses', 'light', 'electrons'], ['Max magnification', 'about × 2000', 'up to × 2 000 000'], ['Resolution', 'about 200 nm', 'about 0.2 nm (much higher)'], ['Shows', 'cells, nucleus', 'mitochondria, ribosomes in detail'], ['Specimens', 'can be alive; cheap', 'dead; expensive, large']];
  const cws = [3.4, (W - 2 * MX - 3.4) / 2, (W - 2 * MX - 3.4) / 2], ty = 1.45, rh = 0.78;
  head.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0); rect(s, x, ty, cws[j], 0.62, j === 2 ? C.accent : C.maroon); txt(s, t, x + 0.2, ty, cws[j] - 0.4, 0.62, { size: 18, bold: true, color: C.white, valign: 'middle' }); });
  rows.forEach((r, i) => r.forEach((t, j) => { const x = MX + cws.slice(0, j).reduce((a, b) => a + b, 0), y = ty + 0.62 + i * rh; rect(s, x, y, cws[j], rh, i % 2 ? C.white : C.soft, C.line); txt(s, t, x + 0.2, y, cws[j] - 0.4, rh, { size: 18, bold: j === 0, valign: 'middle' }); }));
  rect(s, MX, 6.1, W - 2 * MX, 0.75, C.orangeSoft, 'F3D9B5');
  txt(s, 'Electron microscopes let scientists see **sub-cellular structures** in much more detail, so our understanding of cells improved.', MX + 0.3, 6.1, W - 2 * MX - 0.6, 0.75, { size: 16, valign: 'middle' });
  notes(s, 'Spec 4.1.1.5: students should understand how microscopy techniques have developed over time and explain how electron microscopy has increased understanding of sub-cellular structures. Limitations: electron microscopes need a vacuum, so specimens are dead. Typical values.');
}

{
  const s = frame('Magnification', { tag: '4.1.1.5' });
  rect(s, MX, 1.4, 5.6, 1.4, C.soft, C.line);
  D.math(s, MX + 0.3, 2.1, ['magnification = ', F('size of image', 'size of real object')], { size: 24, bold: true });
  const tx = MX + 6.0, tw = W - MX - tx;
  headCard(s, tx, 1.4, tw, 2.6, 'Units', C.maroon, C.soft);
  bullets(s, tx + 0.2, 2.1, tw - 0.4, ['1 mm = 1000 µm (micrometres)', '1 µm = 1000 nm (nanometres)', 'Use the **same units** for image and real size.'], 17, 0.1);
  rect(s, MX, 3.05, 5.6, 0.95, C.greyLight, C.line);
  txt(s, 'Rearrange:  image = mag × real;   real = image ÷ mag', MX + 0.3, 3.05, 5.3, 0.95, { size: 17, bold: true, valign: 'middle' });
  rect(s, MX, 4.25, W - 2 * MX, 2.6, C.orangeSoft, 'F3D9B5');
  txt(s, 'Worked example', MX + 0.3, 4.35, 5, 0.45, { size: 19, bold: true, color: C.orange });
  txt(s, 'A cell is 0.015 mm across. In a drawing it is 30 mm across. Find the magnification.', MX + 0.3, 4.85, W - 2 * MX - 0.6, 0.5, { size: 18 });
  txt(s, 'Magnification = 30 ÷ 0.015 = **× 2000**.   Real size = 0.015 mm = **15 µm** = 1.5 × 10⁻² mm.', MX + 0.3, 5.5, W - 2 * MX - 0.6, 0.9, { size: 18 });
  notes(s, 'Spec 4.1.1.5: "Students should be able to carry out calculations involving magnification, real size and image size using the formula... Students should be able to express answers in standard form if appropriate." Magnification has no units.');
}

D.myTurnYourTurn({
  title: 'Magnification calculations', tag: 'Maths skill', stepSize: 19, labelW: 3.5, labelSize: 16, labelPlain: false, labelColor: C.maroon, showYourQs: true,
  mine: {
    q: 'Find each one:',
    steps: [
      { label: 'Mag? image 12, real 0.004 mm', text: '**× 3000**' },
      { label: 'Real? image 25 mm, × 500', text: '**50 µm**' },
      { label: 'Image? real 0.02 mm, × 400', text: '**8 mm**' },
    ],
  },
  yours: {
    q: 'Find each one:',
    steps: [
      { label: 'Mag? image 18, real 0.006 mm', text: '**× 3000**' },
      { label: 'Real? image 40 mm, × 800', text: '**50 µm**' },
      { label: 'Image? real 0.004 mm, × 1500', text: '**6 mm**' },
    ],
  },
  notes: 'Mine: 12 ÷ 0.004 = 3000; 25 ÷ 500 = 0.05 mm; 0.02 × 400 = 8 mm. Yours: 18 ÷ 0.006 = 3000; 40 ÷ 800 = 0.05 mm; 0.004 × 1500 = 6 mm.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: Required practical 1: microscopy', { tag: 'RP1' });
  headCard(s, MX, 1.4, 6.0, 5.45, 'Method (onion cells)', C.maroon, C.soft);
  bullets(s, MX + 0.2, 2.1, 5.6, ['Peel a thin layer of onion epidermis; place on a slide in a drop of **iodine** (stains the nucleus).', 'Lower a **cover slip** at an angle to avoid air bubbles.', 'Start on the **lowest power** objective; focus with the **coarse** then **fine** focus.', 'Switch to a higher power and refocus with the fine focus.', 'Draw a **few cells** with a sharp pencil, no shading; add a **scale bar** or magnification.'], 15, 0.1);
  const bx = MX + 6.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.5, 'Total magnification', C.green, C.greenSoft);
  txt(s, 'eyepiece × objective', bx + 0.2, 2.1, bw - 0.4, 0.45, { size: 18, bold: true });
  txt(s, 'e.g. × 10 eyepiece and × 40 objective = **× 400**', bx + 0.2, 2.65, bw - 0.4, 0.9, { size: 17 });
  headCard(s, bx, 4.1, bw, 2.75, 'Good biological drawings', C.orange, C.orangeSoft);
  bullets(s, bx + 0.2, 4.8, bw - 0.4, ['Clear single lines, no shading.', 'Labels with ruled lines, no arrowheads.', 'Title and magnification.'], 15, 0.06);
  notes(s, 'RP1: "use a light microscope to observe, draw and label a selection of plant and animal cells. A magnification scale must be included." Cheek cells can be stained with methylene blue. Never use the coarse focus at high power (could crack the slide).');
}

D.hinge({
  title: 'Quick check',
  q: 'Eyepiece × 10, objective × 40. Total magnification?',
  options: ['× 400', '× 50', '× 4', '× 4000'],
  correct: 0,
  notes: 'Answer A: multiply. B added. C divided. D multiplied wrongly by 10 again.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['Where is the genetic material in a prokaryotic cell?', 'A single loop in the cytoplasm, plus plasmids'], ['What is the function of ribosomes?', 'Protein synthesis'], ['Give two adaptations of a root hair cell.', 'Large surface area; many mitochondria'], ['How many µm are in 1 mm?', '1000'],
    ['Why can an electron microscope show ribosomes but a light one cannot?', 'Higher resolution'], ['Why do plants keep the ability to differentiate?', 'To grow and repair throughout life'],
    ['Image 36 mm, real 0.012 mm. Magnification?', '× 3000'], ['Write 15 µm in mm.', '0.015 mm (1.5 × 10⁻² mm)'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) single DNA loop in the cytoplasm; plasmids  2) protein synthesis  3) long hair, large surface area; many mitochondria for active transport (lesson 3)  4) 1000  5) electron microscopes have much higher resolution  6) to keep growing and replace damaged parts; can be grown from cuttings  7) 36 ÷ 0.012 = 3000  8) 15 ÷ 1000 = 0.015 mm.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'Give two structures found in a plant cell but not in an animal cell.', m: 2, lines: 0 },
    { l: 'b', q: 'Describe two differences between a bacterial cell and an animal cell.', m: 2, lines: 1 },
    { l: 'c', q: 'A student draws a cell 45 mm long. The magnification is × 1500. Calculate the real length in µm.', m: 3, lines: 1 },
    { l: 'd', q: 'Explain why electron microscopes have improved our understanding of cells.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'any two: cell wall, chloroplasts, permanent vacuole', '2', ''],
    ['(b)', 'bacterium has no nucleus / DNA in a loop; plasmids; cell wall; no mitochondria; much smaller', '2', ''],
    ['(c)', '45 ÷ 1500 = 0.03 mm; × 1000; = 30 µm', '3', ''],
    ['(d)', 'higher magnification; higher resolution; sub-cellular structures (mitochondria, ribosomes) seen in detail', '3', ''],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What does the cell membrane do?', 'What is a plasmid?', 'Give one adaptation of a nerve cell.', 'Write the magnification formula.'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) controls what enters and leaves  2) a small ring of DNA in bacteria  3) long axon; branched endings  4) magnification = image size ÷ real size. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw and label an animal cell, a plant cell and a bacterium.',
    'Explain how xylem and phloem are adapted.',
    'A cell drawing is 22 mm; the real cell is 0.011 mm. Find the magnification.',
    'Convert: (a) 0.5 mm to µm  (b) 250 nm to µm.',
    'Compare light and electron microscopes.',
    'Write a method for viewing onion cells with a microscope.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) see the diagrams  2) xylem: dead, hollow, lignin, carries water; phloem: sieve plates, carries sugars  3) 22 ÷ 0.011 = × 2000  4) (a) 500 µm (b) 0.25 µm  5) see the table  6) see the RP1 slide.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.1_A_CellsMicroscopy.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
