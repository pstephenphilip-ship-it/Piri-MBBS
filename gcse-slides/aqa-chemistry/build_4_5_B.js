// build_4_5_B.js — AQA GCSE Chemistry (8462) 4.5 Energy changes, lesson 2 of 2 (chemistry only):
// 4.5.2.1 Cells and batteries, 4.5.2.2 Fuel cells (HT half equations).
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_5_B.js
'use strict';
const path = require('path');
const { T, C, calc, deck, balanced, helpers } = require('./chem_common');

const D = T.init(deck('4.5.2', 'Chemical cells and fuel cells'));
const { frame, notes, txt, rect, circle, MX, W } = D;
const { headCard, bullets, seg, arrow, table, note } = helpers(D);
const HT = { tag: 'HT  Higher only', tagColor: C.red, tagText: C.white };
const near = (l, a, b) => calc(l, a, b, 1e-6 * Math.max(1, Math.abs(b)));

// ======================= checks =======================
// illustrative cell voltages of each metal paired with copper (V). V(A,B) = V(A,Cu) − V(B,Cu)
const VCU = { Mg: 2.0, Zn: 1.1, Fe: 0.8, Cu: 0 };
const V = (a, b) => Math.round((VCU[a] - VCU[b]) * 10) / 10;
near('Mg/Zn', V('Mg', 'Zn'), 0.9); near('Mg/Fe', V('Mg', 'Fe'), 1.2); near('Zn/Fe', V('Zn', 'Fe'), 0.3); near('Cu/Cu', V('Cu', 'Cu'), 0);
calc('order', VCU.Mg > VCU.Zn && VCU.Zn > VCU.Fe && VCU.Fe > VCU.Cu ? 1 : 0, 1);
// series
near('3 x 1.5', 3 * 1.5, 4.5); near('MT 4 x 1.5', 4 * 1.5, 6); near('MT 9 V / 1.5', 9 / 1.5, 6); near('YT 6 x 2', 6 * 2.0, 12); near('YT 12/1.5', 12 / 1.5, 8);
near('MT2 Mg/Fe', V('Mg', 'Fe'), 1.2); near('YT2 Zn/Fe', V('Zn', 'Fe'), 0.3);
// fuel cell equations (atoms and charge)
balanced('overall', [[2, 'H2'], [1, 'O2']], [[2, 'H2O']]);
balanced('anode acid', [[2, 'H2']], [[4, 'H']]); calc('anode acid charge', 0, 4 - 4);
balanced('cathode acid', [[1, 'O2'], [4, 'H']], [[2, 'H2O']]); calc('cathode acid charge', 4 - 4, 0);
balanced('anode alk', [[1, 'H2'], [2, 'OH']], [[2, 'H2O']]); calc('anode alk charge', -2, -2);
balanced('cathode alk', [[1, 'O2'], [2, 'H2O']], [[4, 'OH']]); calc('cathode alk charge', -4, -4);
calc('electrons match', 4, 4);

// ======================= drawings =======================
function simpleCell(s, x, y) {
  // beaker with electrolyte, two metal strips, voltmeter
  rect(s, x + 0.04, y + 1.0, 3.12, 1.76, 'D6E8F7', 'D6E8F7');
  seg(s, x, y + 0.6, x, y + 2.8, C.ink, 2); seg(s, x + 3.2, y + 0.6, x + 3.2, y + 2.8, C.ink, 2); seg(s, x, y + 2.8, x + 3.2, y + 2.8, C.ink, 2);
  rect(s, x + 0.6, y + 0.2, 0.3, 2.2, 'B0B0B0', '777777'); rect(s, x + 2.3, y + 0.2, 0.3, 2.2, 'D9894A', '9C5A26');
  txt(s, 'Zn', x + 0.45, y + 2.4 - 0.65, 0.6, 0.35, { size: 13, bold: true, align: 'center' });
  txt(s, 'Cu', x + 2.15, y + 2.4 - 0.65, 0.6, 0.35, { size: 13, bold: true, align: 'center' });
  seg(s, x + 0.75, y + 0.2, x + 0.75, y - 0.45, C.ink, 2); seg(s, x + 2.45, y + 0.2, x + 2.45, y - 0.45, C.ink, 2);
  seg(s, x + 0.75, y - 0.45, x + 1.25, y - 0.45, C.ink, 2); seg(s, x + 1.95, y - 0.45, x + 2.45, y - 0.45, C.ink, 2);
  circle(s, x + 1.6, y - 0.45, 0.7, C.white, C.ink, 2); txt(s, 'V', x + 1.25, y - 0.8, 0.7, 0.7, { size: 18, bold: true, align: 'center', valign: 'middle' });
  txt(s, 'electrolyte (e.g. salt solution)', x - 0.2, y + 2.9, 3.6, 0.35, { size: 13, bold: true, align: 'center' });
}
function fuelCell(s, x, y, w, h) {
  rect(s, x, y, w, h, C.soft, C.maroon, { lw: 2 });
  rect(s, x + w * 0.3, y, 0.15, h, '555555', '333333'); rect(s, x + w * 0.7 - 0.15, y, 0.15, h, '555555', '333333');
  rect(s, x + w * 0.45, y, w * 0.25 - 0.15, h, 'EAF2E3', 'EAF2E3');
  txt(s, 'electro-\nlyte', x + w * 0.45, y + h / 2 - 0.3, w * 0.25 - 0.15, 0.6, { size: 12, bold: true, align: 'center' });
  arrow(s, x - 0.9, y + 0.5, x + 0.05, y + 0.5, C.blue, 2.5); txt(s, 'H₂ in', x - 1.0, y + 0.05, 1.0, 0.35, { size: 15, bold: true, color: C.blue });
  arrow(s, x + w + 0.9, y + 0.5, x + w - 0.05, y + 0.5, C.red, 2.5); txt(s, 'O₂ (air) in', x + w + 0.05, y + 0.05, 1.4, 0.35, { size: 15, bold: true, color: C.red });
  arrow(s, x + w - 0.05, y + h - 0.5, x + w + 0.9, y + h - 0.5, C.ink, 2.5); txt(s, 'H₂O out', x + w + 0.1, y + h - 0.45, 1.4, 0.35, { size: 15, bold: true });
  txt(s, 'anode (−)', x, y + h + 0.05, w * 0.4, 0.35, { size: 14, bold: true, align: 'center' });
  txt(s, 'cathode (+)', x + w * 0.6, y + h + 0.05, w * 0.4, 0.35, { size: 14, bold: true, align: 'center' });
  // external circuit
  seg(s, x + w * 0.37, y, x + w * 0.37, y - 0.6, C.ink, 2); seg(s, x + w * 0.63, y, x + w * 0.63, y - 0.6, C.ink, 2);
  seg(s, x + w * 0.37, y - 0.6, x + w * 0.63, y - 0.6, C.ink, 2);
  circle(s, x + w / 2, y - 0.6, 0.45, 'FFF3B0', C.ink, 1.5); txt(s, 'load', x + w / 2 - 0.5, y - 1.2, 1.0, 0.3, { size: 12, bold: true, align: 'center' });
  arrow(s, x + w * 0.39, y - 0.75, x + w * 0.45, y - 0.75, C.orange, 2); txt(s, 'e⁻', x + w * 0.33, y - 1.05, 0.5, 0.3, { size: 13, bold: true, color: C.orange });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'How chemical cells make a voltage, batteries, rechargeable and non-rechargeable cells, hydrogen fuel cells and their half equations',
  bullets: ['Part 1: chemical cells and voltage (4.5.2.1)', 'Part 2: batteries: rechargeable and not (4.5.2.1)', 'Part 3: hydrogen fuel cells (4.5.2.2)', 'Part 4: fuel cells vs batteries; half equations (HT)'],
  notes: 'AQA 8462 GCSE Chemistry 4.5, lesson 2 of 2 (separate science only). Links to the reactivity series (4.4.1.2) and electrolysis/half equations (4.4.3). Voltages are illustrative values for teaching. About two hours.',
});

D.objectives({
  tag: '4.5.2',
  items: [
    'Explain how a **chemical cell** produces a **voltage** and what affects its size.',
    'Explain why some cells are **rechargeable** and others are not.',
    'Describe a **hydrogen fuel cell** and write its overall equation.',
    'Evaluate fuel cells against batteries; write **half equations** (HT).',
  ],
  keywords: ['cell', 'battery', 'electrolyte', 'voltage', 'rechargeable', 'fuel cell'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Put in order of reactivity: Cu, Mg, Zn, Fe.', 'Define oxidation in terms of electrons.', 'Balance: H₂ + O₂ → H₂O', 'Is burning hydrogen exothermic or endothermic?'],
  answers: ['Mg, Zn, Fe, Cu', 'loss of electrons', '2H₂ + O₂ → 2H₂O', 'exothermic'],
  notes: 'Retrieval from 4.4 and lesson 1.',
});

D.vocab({
  title: 'Key words', tag: '4.5.2',
  items: [
    { term: 'Cell', def: 'Two different **electrodes** in an **electrolyte**. A chemical reaction makes a **voltage**.' },
    { term: 'Battery', def: 'Two or more cells joined **in series** for a bigger voltage.' },
    { term: 'Rechargeable', def: 'The reaction can be **reversed** by passing an **external current** through the cell.' },
    { term: 'Fuel cell', def: 'Supplied by a **fuel** and **oxygen** (or air); the fuel is **oxidised electrochemically** to make a voltage.' },
  ],
  notes: 'Spec 4.5.2.1 and 4.5.2.2.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: chemical cells', { tag: '4.5.2.1' });
  simpleCell(s, MX + 0.6, 2.4);
  const bx = MX + 5.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.4, 'How a cell works', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Two **different metals** dip into an **electrolyte**.', 'The **more reactive** metal loses electrons more easily.', 'Electrons flow through the wire to the **less reactive** metal: a **voltage**.'], 17, 0.14);
  headCard(s, bx, 5.0, bw, 1.85, 'The voltage depends on', C.green, C.greenSoft);
  txt(s, 'the **type of electrodes** (metals) and the **electrolyte**. A **bigger difference in reactivity** gives a **bigger voltage**.', bx + 0.2, 5.65, bw - 0.4, 1.1, { size: 16 });
  notes(s, 'Spec 4.5.2.1: "Cells contain chemicals which react to produce electricity. The voltage produced by a cell is dependent upon a number of factors including the type of electrode and electrolyte. A simple cell can be made by connecting two different metals in contact with an electrolyte." Students should be able to interpret data for relative reactivity of different metals and evaluate the use of cells. Students do not need to know the details of cells and batteries other than the hydrogen fuel cell. The more reactive metal (zinc) is the negative electrode.');
}

{
  const s = frame('Voltage and reactivity', { tag: '4.5.2.1' });
  const gx = MX + 0.9, gy = 1.85, gw = 5.4, gh = 4.1, vmax = 2.4;
  const py = v => gy + gh - v / vmax * gh;
  for (let v = 0; v <= 2.4 + 1e-9; v += 0.4) { D.hline(s, gx, py(v), gx + gw, v === 0 ? '4A3F45' : 'E6DDE1', v === 0 ? 1.75 : 0.75); txt(s, v.toFixed(1), gx - 0.6, py(v) - 0.14, 0.5, 0.28, { size: 12, color: C.grey, align: 'right' }); }
  D.vline(s, gx, gy, gy + gh, '4A3F45', 1.75);
  txt(s, 'Voltage with copper (V)', gx - 0.3, gy - 0.45, 3.5, 0.32, { size: 14, bold: true });
  [['Mg', 2.0], ['Zn', 1.1], ['Fe', 0.8], ['Cu', 0]].forEach(([m, v], i) => {
    const bw2 = gw / 4, x0 = gx + i * bw2 + 0.25, x1 = gx + (i + 1) * bw2 - 0.25;
    if (v > 0) rect(s, x0, py(v), x1 - x0, py(0) - py(v), C.accent, C.accent);
    txt(s, m, x0, py(0) + 0.05, x1 - x0, 0.3, { size: 15, bold: true, align: 'center' });
    txt(s, v.toFixed(1), x0, py(v) - 0.35, x1 - x0, 0.3, { size: 14, bold: true, align: 'center' });
  });
  txt(s, 'Each metal paired with copper (illustrative values)', MX + 0.6, 6.4, 6, 0.4, { size: 13, italic: true, color: C.grey });
  const bx = MX + 7.0, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.4, 'Reading the data', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Mg gives the **biggest** voltage: furthest from Cu.', 'Two identical metals give **0 V**.'], 16, 0.12);
  rect(s, bx, 4.0, bw, 2.85, C.orangeSoft, 'F3D9B5');
  txt(s, 'Predict a cell without copper', bx + 0.25, 4.1, bw - 0.5, 0.4, { size: 17, bold: true, color: C.orange });
  txt(s, 'Mg and Zn: 2.0 − 1.1 = **0.9 V**', bx + 0.25, 4.6, bw - 0.5, 0.45, { size: 17 });
  txt(s, 'Zn and Fe: 1.1 − 0.8 = **0.3 V**', bx + 0.25, 5.1, bw - 0.5, 0.45, { size: 17 });
  txt(s, 'The voltage comes from the **difference** in reactivity.', bx + 0.25, 5.65, bw - 0.5, 0.9, { size: 15 });
  notes(s, 'Illustrative values for a classroom salt-solution cell, chosen to show the trend; real values depend on the electrolyte. Subtracting voltages against a common metal is a useful data skill for "interpret data for relative reactivity". Checked in the build script.');
}

D.myTurnYourTurn({
  title: 'Cells and batteries', tag: 'Maths skill', stepSize: 18, labelW: 2.9, labelSize: 16, labelColor: C.maroon, labelPlain: false, showYourQs: true,
  mine: {
    q: 'Use the data (Mg 2.0, Zn 1.1, Fe 0.8 with Cu):',
    steps: [
      { label: 'Mg and Fe cell', text: '2.0 − 0.8 = **1.2 V**' },
      { label: '4 cells of 1.5 V in series', text: '4 × 1.5 = **6.0 V**' },
      { label: 'Cells of 1.5 V for 9 V', text: '9 ÷ 1.5 = **6 cells**' },
    ],
  },
  yours: {
    q: 'Use the data (Mg 2.0, Zn 1.1, Fe 0.8 with Cu):',
    steps: [
      { label: 'Zn and Fe cell', text: '1.1 − 0.8 = **0.3 V**' },
      { label: '6 cells of 2.0 V in series', text: '6 × 2.0 = **12 V**' },
      { label: 'Cells of 1.5 V for 12 V', text: '12 ÷ 1.5 = **8 cells**' },
    ],
  },
  notes: 'Cells in series: add the voltages. All values checked in the build script.',
});

D.hinge({
  title: 'Quick check',
  q: 'Which pair of metals would give the biggest voltage?',
  options: ['Magnesium and copper', 'Zinc and copper', 'Iron and copper', 'Copper and copper'],
  correct: 0,
  notes: 'Answer A: largest difference in reactivity. D gives 0 V.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: batteries', { tag: '4.5.2.1' });
  // 3 cells in series
  for (let i = 0; i < 3; i++) { const x = MX + 0.5 + i * 1.7; rect(s, x, 2.0, 1.4, 0.8, 'F2D7A0', 'B58B3E', { lw: 1.5 }); rect(s, x + 1.4, 2.2, 0.15, 0.4, '777777', '555555'); txt(s, '1.5 V', x, 2.0, 1.4, 0.8, { size: 16, bold: true, align: 'center', valign: 'middle' }); }
  txt(s, '3 cells in series = **4.5 V**', MX + 0.5, 3.0, 5, 0.45, { size: 18 });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 3.75, cw, 3.1, 'Non-rechargeable (e.g. alkaline)', C.red, 'FBEAEA');
  bullets(s, MX + 0.2, 4.45, cw - 0.4, ['The chemical reactions **stop** when one of the **reactants is used up**.', 'Then the cell must be **replaced** (and recycled).'], 17, 0.14);
  headCard(s, MX + cw + gap, 3.75, cw, 3.1, 'Rechargeable (e.g. lithium-ion)', C.green, C.greenSoft);
  bullets(s, MX + cw + gap + 0.2, 4.45, cw - 0.4, ['The reactions can be **reversed** when an **external electrical current** is supplied.', 'Can be used **many times**, but they wear out eventually.'], 17, 0.14);
  note(s, MX + 5.9, 1.4, W - MX - (MX + 5.9), 2.1, 'A **battery** is two or more cells **connected together in series** to give a **greater voltage**.', { fill: C.soft, line: C.line, size: 17 });
  notes(s, 'Spec 4.5.2.1: "A battery consists of two or more cells connected together in series to provide a greater voltage. In non-rechargeable cells and batteries the chemical reactions stop when one of the reactants has been used up. Alkaline batteries are non-rechargeable. Rechargeable cells and batteries can be recharged because the chemical reactions are reversed when an external electrical current is supplied."');
}

D.hinge({
  title: 'Quick check',
  q: 'Why does a non-rechargeable cell eventually stop working?',
  options: ['One of the reactants is used up', 'The electrolyte freezes', 'The voltage reverses', 'The metals become more reactive'],
  correct: 0,
  notes: 'Answer A. The others are not the reason. A rechargeable cell can reverse the reaction with an external current.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: hydrogen fuel cells', { tag: '4.5.2.2' });
  fuelCell(s, MX + 1.3, 2.6, 4.2, 2.8);
  const bx = MX + 7.4, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 3.35, 'How it works', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Fed **continuously** with **hydrogen** and **oxygen** (from air).', 'Hydrogen is **oxidised** to make a **voltage**.', 'The only product is **water**.'], 17, 0.14);
  rect(s, bx, 4.95, bw, 1.9, C.greenSoft, C.green, { lw: 2 });
  txt(s, 'Overall reaction', bx + 0.25, 5.05, bw - 0.5, 0.4, { size: 17, bold: true, color: C.green });
  txt(s, '2H₂(g) + O₂(g) → 2H₂O(l)', bx + 0.25, 5.55, bw - 0.5, 0.6, { size: 22, bold: true });
  notes(s, 'Spec 4.5.2.2: "Fuel cells are supplied by an external source of fuel (eg hydrogen) and oxygen or air. The fuel is oxidised electrochemically within the fuel cell to produce a potential difference. The overall reaction in a hydrogen fuel cell involves the oxidation of hydrogen to produce water. Hydrogen fuel cells offer a potential alternative to rechargeable cells and batteries." The diagram is simplified. It is the same overall reaction as burning hydrogen, but the energy is released as electricity rather than heat.');
}

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: fuel cells vs rechargeable batteries', { tag: '4.5.2.2' });
  const tw = W - 2 * MX;
  table(s, MX, 1.4, [tw * 0.24, tw * 0.38, tw * 0.38], ['', 'Hydrogen fuel cell', 'Rechargeable battery'], [
    ['Waste products', '**only water**', 'toxic metal compounds when disposed of'],
    ['Refuelling / recharging', 'quick to refuel', 'slow to recharge'],
    ['Lifetime', 'lasts longer; fewer parts to replace', 'limited number of recharges'],
    ['Storage', 'hydrogen is a **flammable gas**; hard to store at high pressure', 'easy to store and carry'],
    ['Where the energy comes from', 'making H₂ often uses fossil fuels / electricity', 'charging uses mains electricity (may be from fossil fuels)'],
  ], { rh: 0.8, size: 15, boldFirst: true });
  note(s, MX, 6.2, tw, 0.65, '**Evaluate:** give advantages **and** disadvantages, then a **justified conclusion**.', { size: 17 });
  notes(s, 'Spec 4.5.2.2: "Students should be able to evaluate the use of hydrogen fuel cells in comparison with rechargeable cells and batteries." A good 6-mark answer compares two or three points each way and reaches a conclusion (e.g. fuel cells suit buses with a central refuelling depot).');
}

{
  const s = frame('Half equations in a fuel cell', HT);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2;
  headCard(s, MX, 1.4, cw, 2.5, 'Anode (−): hydrogen is oxidised', C.red, 'FBEAEA');
  txt(s, '2H₂ → 4H⁺ + 4e⁻', MX + 0.2, 2.15, cw - 0.4, 0.55, { size: 24, bold: true });
  txt(s, 'Hydrogen **loses** electrons (OIL).', MX + 0.2, 2.85, cw - 0.4, 0.5, { size: 17 });
  headCard(s, MX + cw + gap, 1.4, cw, 2.5, 'Cathode (+): oxygen is reduced', C.blue, C.blueSoft);
  txt(s, 'O₂ + 4H⁺ + 4e⁻ → 2H₂O', MX + cw + gap + 0.2, 2.15, cw - 0.4, 0.55, { size: 24, bold: true });
  txt(s, 'Oxygen **gains** electrons (RIG).', MX + cw + gap + 0.2, 2.85, cw - 0.4, 0.5, { size: 17 });
  rect(s, MX, 4.15, W - 2 * MX, 1.25, C.soft, C.line);
  txt(s, 'Add them: the 4H⁺ and 4e⁻ cancel, leaving **2H₂ + O₂ → 2H₂O**.', MX + 0.3, 4.15, W - 2 * MX - 0.6, 1.25, { size: 20, valign: 'middle', align: 'center' });
  note(s, MX, 5.6, W - 2 * MX, 1.25, 'In an **alkaline** fuel cell: H₂ + 2OH⁻ → 2H₂O + 2e⁻ and O₂ + 2H₂O + 4e⁻ → 4OH⁻. The overall reaction is the same.', { size: 16 });
  notes(s, 'Spec 4.5.2.2 (HT): "Students should be able to write the half equations for the electrode reactions in the hydrogen fuel cell." The acidic forms are given in AQA materials. All four half equations are checked for atoms and charge in the build script.');
}

D.hinge({
  title: 'Quick check', tag: 'HT • Show me on your whiteboard',
  q: 'Which half equation happens at the anode of a hydrogen fuel cell?',
  options: ['2H₂ → 4H⁺ + 4e⁻', 'O₂ + 4H⁺ + 4e⁻ → 2H₂O', '2H₂O → 2H₂ + O₂', '4H⁺ + 4e⁻ → 2H₂'],
  correct: 0,
  notes: 'Answer A: oxidation (loss of electrons) at the anode. B is the cathode. C is electrolysis of water (the reverse). D is reduction of H⁺ (as in electrolysis).',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is needed to make a simple cell?', 'Two different metals in an electrolyte'], ['What is a battery?', 'Two or more cells in series'], ['Why can a rechargeable cell be reused?', 'Reactions reversed by an external current'], ['What is the only product of a hydrogen fuel cell?', 'Water'],
    ['How could you increase the voltage of a cell?', 'Use metals further apart in reactivity'], ['Data: Mg/Cu 2.0 V, Zn/Cu 1.1 V. Predict Mg/Zn.', '0.9 V'],
    ['Give two disadvantages of hydrogen fuel cells.', 'H₂ flammable; hard to store; made using fossil fuels'], ['Write the cathode half equation. (HT)', 'O₂ + 4H⁺ + 4e⁻ → 2H₂O'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) two different metals in contact with an electrolyte  2) two or more cells connected in series  3) the reactions are reversed when an external current is supplied  4) water  5) use two metals with a bigger difference in reactivity, or a different electrolyte, or join cells in series  6) 2.0 − 1.1 = 0.9 V  7) any two: hydrogen is flammable/explosive; difficult to store; hydrogen often made from fossil fuels; few refuelling stations; expensive  8) O₂ + 4H⁺ + 4e⁻ → 2H₂O.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 18, lineGap: 0.26,
  stem: 'Voltages of cells made with copper: magnesium 2.0 V, zinc 1.1 V, iron 0.8 V, metal X 1.5 V.',
  parts: [
    { l: 'a', q: 'Place metal X in the reactivity order with Mg, Zn and Fe. Explain your answer.', m: 2, lines: 1 },
    { l: 'b', q: 'Predict the voltage of a cell made from zinc and iron.', m: 1, lines: 0 },
    { l: 'c', q: 'Explain why an alkaline battery stops working but a lithium-ion battery can be recharged.', m: 3, lines: 1 },
    { l: 'd', q: 'Evaluate the use of hydrogen fuel cells instead of rechargeable batteries in cars.', m: 4, lines: 2 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'Mg, X, Zn, Fe; X gives a voltage between Mg and Zn (bigger voltage = more reactive)', '2', ''],
    ['(b)', '0.3 V', '1', ''],
    ['(c)', 'alkaline: a reactant is used up; reaction stops; lithium-ion: external current reverses the reaction', '3', ''],
    ['(d)', 'for: only water produced; quick to refuel; long-lasting; against: H₂ flammable / hard to store; made using fossil fuels / energy; conclusion with reason', '4', 'max 3 without a conclusion'],
  ],
  notes: 'Mark scheme on the next slide.',
});
calc('exam X order', 2.0 > 1.5 && 1.5 > 1.1 ? 1 : 0, 1);

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What two things affect the voltage of a cell?', 'Five 1.5 V cells in series give what voltage?', 'Write the overall fuel cell equation.', 'Give one advantage of fuel cells over batteries.'], { cols: 2, size: 24 });
  notes(s, 'Answers: 1) the electrodes (metals) and the electrolyte  2) 7.5 V  3) 2H₂ + O₂ → 2H₂O  4) only water produced / quick to refuel / long lasting. Revisit the objectives.');
}
near('exit 5 x 1.5', 5 * 1.5, 7.5);

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Draw a labelled diagram of a simple cell.',
    'Explain why two copper electrodes give 0 V.',
    'Describe the difference between a cell and a battery.',
    'Compare non-rechargeable and rechargeable batteries.',
    'Write a balanced 6-mark answer: should buses use hydrogen fuel cells?',
    'HT: write both half equations for a hydrogen fuel cell and show they add to the overall equation.',
  ], { cols: 2, size: 20 });
  notes(s, 'Answers: 1) two different metals in an electrolyte, connected to a voltmeter  2) no difference in reactivity  3) a battery is two or more cells in series  4) non-rechargeable: reaction stops when a reactant is used up; rechargeable: reversed by external current  5) balanced points and a conclusion  6) 2H₂ → 4H⁺ + 4e⁻; O₂ + 4H⁺ + 4e⁻ → 2H₂O; add: 2H₂ + O₂ → 2H₂O.');
}

D.save(path.join(__dirname, 'AQA_8462_Chem_4.5_B_CellsFuelCells.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
