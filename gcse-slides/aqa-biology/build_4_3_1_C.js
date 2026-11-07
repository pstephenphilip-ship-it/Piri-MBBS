// build_4_3_1_C.js — AQA GCSE Biology (8461) 4.3.1 Communicable diseases, lesson 3 of 3
// 4.3.1.8 Antibiotics and painkillers, 4.3.1.9 Discovery and development of drugs (+ link to RP2, 4.1.1.6).
// One two-hour lesson for a Higher student.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_3_1_C.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.3.1', title: 'Antibiotics and new drugs',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, MX, W } = D;
const area = d => Math.PI * (d / 2) ** 2;
const sf3 = v => Number(v.toPrecision(3));

// ======================= numbers (all checked) =======================
calc('ex A', sf3(area(24)), 452); calc('ex B', sf3(area(16)), 201);
calc('MT', sf3(area(24)), 452); calc('YT', sf3(area(18)), 254);
calc('P7', sf3(area(30)), 707); calc('exam d', sf3(area(22)), 380); calc('HW6', sf3(area(26)), 531);

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function headCard(s, x, y, w, h, head, colour, fill) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
}
function bullets(s, x, y, w, items, size = 18, gap = 0.18) {
  items.forEach(t => { const th = D.textH(t, size, w - 0.3); txt(s, '•', x, y, 0.3, 0.4, { size, bold: true, color: C.accent }); txt(s, t, x + 0.3, y, w - 0.3, th + 0.05, { size }); y += th + gap; });
  return y;
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'What antibiotics and painkillers can and cannot do, antibiotic resistance, where drugs come from and how new drugs are tested',
  bullets: ['Part 1: antibiotics and painkillers (4.3.1.8)', 'Part 2: testing antibiotics on bacteria (link to RP2)', 'Part 3: discovering and developing new drugs (4.3.1.9)'],
  notes: 'AQA 8461 GCSE Biology 4.3.1.8 and 4.3.1.9. Lesson 3 of 3 on 4.3.1. Part 2 links to the microbiology required practical (4.1.1.6), which is separate Biology only. Next: 4.3.2 Monoclonal antibodies (Higher) and 4.3.3 Plant disease. About two hours.',
});

D.objectives({
  tag: '4.3.1.8, 4.3.1.9',
  items: [
    'Explain what **antibiotics** and **painkillers** do, and why antibiotics cannot treat **viruses**.',
    'Explain why **antibiotic resistance** is a concern and how to reduce it.',
    'Calculate the area of a **clear zone** to compare antibiotics.',
    'Describe how drugs are **discovered** and **tested**: preclinical, clinical, **double-blind** trials.',
  ],
  keywords: ['antibiotic', 'painkiller', 'resistant', 'preclinical', 'placebo', 'double-blind'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['Name a disease caused by bacteria.', 'What do antitoxins do?', 'What does a vaccine contain?', 'Why is gonorrhoea harder to treat than it used to be?'],
  answers: ['Salmonella or gonorrhoea', 'Neutralise toxins made by bacteria', 'Dead or inactive pathogen', 'Many strains resist penicillin'],
  notes: 'Retrieval from lessons 1 and 2. Q4 leads straight into antibiotic resistance.',
});

D.vocab({
  title: 'Key words', tag: '4.3.1.8, 4.3.1.9',
  items: [
    { term: 'Antibiotic', def: 'A medicine that **kills bacteria** inside the body, e.g. **penicillin**. It does not affect viruses.' },
    { term: 'Painkiller', def: 'A medicine that treats the **symptoms** of a disease, but does **not kill the pathogen**.' },
    { term: 'Placebo', def: 'A **dummy treatment** that looks like the drug but has no active ingredient.' },
    { term: 'Double-blind', def: 'A trial where **neither the patients nor the doctors** know who has the drug and who has the placebo.' },
  ],
  notes: 'Also: efficacy (does it work?), toxicity (is it harmful?), dose (how much?), peer review.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: antibiotics and painkillers', { tag: '4.3.1.8' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4, h = 3.7;
  headCard(s, MX, top, cw, h, 'Antibiotics, e.g. penicillin', C.green, C.greenSoft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['**Kill bacteria** inside the body, curing the disease.', 'Each one works on **specific** bacteria, so the right antibiotic must be used.', 'Have greatly **reduced deaths** from bacterial disease.']);
  headCard(s, MX + cw + gap, top, cw, h, 'Painkillers and other medicines', C.orange, C.orangeSoft);
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['e.g. paracetamol, aspirin, cough medicine.', 'Treat the **symptoms** (pain, fever) so you feel better.', 'Do **not kill pathogens**: the body still has to fight the infection.']);
  rect(s, MX, 5.3, W - 2 * MX, 1.55, C.soft, C.line);
  txt(s, '**Antibiotics cannot kill viruses.** Viruses live and reproduce **inside our cells**, so it is hard to make a drug that kills them **without damaging body tissues**.', MX + 0.3, 5.3, W - 2 * MX - 0.6, 1.55, { size: 20, valign: 'middle' });
  notes(s, 'Spec: "Antibiotics, such as penicillin, are medicines that help to cure bacterial disease by killing infective bacteria inside the body. It is important that specific bacteria should be treated by specific antibiotics." Antiviral drugs exist (e.g. antiretrovirals for HIV, lesson 1) but are hard to develop for this reason.');
}

{
  const s = frame('Antibiotic resistance', { tag: '4.3.1.8' });
  // natural selection strip: 4 panels
  const steps = [
    ['Mutation', 'A random mutation makes one bacterium **resistant**.', 1],
    ['Antibiotic used', 'Non-resistant bacteria are **killed**. The resistant one **survives**.', 1],
    ['Reproduction', 'It **reproduces** quickly with no competition.', 4],
    ['Resistant strain', 'The whole population is now resistant: the antibiotic **no longer works**.', 9],
  ];
  const bw = 2.75, gap = (W - 2 * MX - 4 * bw) / 3, y = 1.45, h = 3.25;
  steps.forEach(([a, b, nr], i) => {
    const x = MX + i * (bw + gap);
    headCard(s, x, y, bw, h, a, C.maroon, C.soft);
    const cx = x + bw / 2, cy = y + 1.15;
    const pts = [[-0.8, -0.25], [-0.3, 0.2], [0.2, -0.3], [0.7, 0.15], [-0.6, 0.35], [0.4, 0.4], [0.0, 0.0], [-0.1, -0.35], [0.85, -0.25]];
    pts.forEach(([dx, dy], k) => {
      const res = i === 0 ? k === 6 : i === 1 ? k === 6 : k < nr;
      const dead = i === 1 && k !== 6;
      if (i === 1 && dead) { s.addShape(D.SH.ellipse, { x: cx + dx - 0.2, y: cy + dy - 0.09, w: 0.4, h: 0.18, fill: { color: 'E6E1E3' }, line: { color: C.grey, width: 1, dashType: 'dash' } }); return; }
      if (i >= 2 && !res) return;
      s.addShape(D.SH.ellipse, { x: cx + dx - 0.2, y: cy + dy - 0.09, w: 0.4, h: 0.18, fill: { color: res ? 'F3B6AE' : 'D6E6EE' }, line: { color: res ? C.red : C.accent, width: 1.5 } });
    });
    if (i === 0) pts.forEach(([dx, dy], k) => { if (k !== 6) s.addShape(D.SH.ellipse, { x: cx + dx - 0.2, y: cy + dy - 0.09, w: 0.4, h: 0.18, fill: { color: 'D6E6EE' }, line: { color: C.accent, width: 1.5 } }); });
    txt(s, b, x + 0.18, y + 1.8, bw - 0.36, 1.35, { size: 16 });
    if (i < 3) arrow(s, x + bw + 0.04, y + 1.15, x + bw + gap - 0.04, y + 1.15, C.ink, 2.5);
  });
  rect(s, MX, 4.95, W - 2 * MX, 1.9, C.greenSoft, C.green);
  txt(s, 'Reducing resistance', MX + 0.3, 5.03, 5, 0.42, { size: 19, bold: true, color: C.green });
  bullets(s, MX + 0.3, 5.5, (W - 2 * MX) / 2 - 0.4, ['Do not prescribe antibiotics for **viral** or mild infections.', '**Finish the course**, so all the bacteria are killed.'], 17, 0.1);
  bullets(s, MX + (W - 2 * MX) / 2 + 0.1, 5.5, (W - 2 * MX) / 2 - 0.4, ['Use fewer antibiotics in **farming**.', 'Develop **new** antibiotics (slow and expensive).'], 17, 0.1);
  notes(s, 'Spec: "the emergence of strains resistant to antibiotics is of great concern." The mechanism (natural selection) is 4.6.3.8 Resistant bacteria; MRSA is the classic example. Pink = resistant, blue = non-resistant, dashed grey = killed.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why should a doctor not give antibiotics for a cold?',
  options: ['Colds are caused by viruses, and antibiotics do not kill viruses', 'Painkillers work better than antibiotics', 'Antibiotics are toxins that damage cells', 'The person will become resistant to antibiotics'],
  correct: 0,
  notes: 'Answer A. D is the classic misconception: BACTERIA become resistant, not people. Using antibiotics needlessly does help resistant bacteria spread, which is a second reason.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: testing antibiotics on bacteria', { tag: 'Link: RP2 (4.1.1.6)' });
  const cx = MX + 2.9, cy = 4.0, R = 2.45;
  circle(s, cx, cy, 2 * R + 0.2, 'E9EEF1', C.grey, 2);
  circle(s, cx, cy, 2 * R, 'E8E1BE', 'B9A96A', 1.5);
  const discs = [['A', -1.05, -0.95, 1.6], ['B', 1.05, -0.95, 1.07], ['C', -1.05, 1.0, 0.0], ['D', 1.05, 1.0, 0.75]];
  discs.forEach(([l, dx, dy, z]) => {
    if (z > 0) circle(s, cx + dx, cy + dy, z, C.white, 'B9A96A', 1);
    circle(s, cx + dx, cy + dy, 0.42, 'F7F7F7', C.grey, 1.5);
    txt(s, l, cx + dx - 0.21, cy + dy - 0.21, 0.42, 0.42, { size: 16, bold: true, align: 'center', valign: 'middle' });
  });
  txt(s, 'bacteria grow across the agar (cloudy); clear zone = bacteria killed', MX, 6.65, 6, 0.35, { size: 14, color: C.grey });
  const bx = MX + 6.3, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.55, 'Method (aseptic technique)', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.15, bw - 0.4, ['Spread bacteria on agar; add paper discs soaked in different antibiotics.', 'Sterilise equipment; tape the lid on (not sealed); incubate at **25 °C**.'], 16, 0.1);
  headCard(s, bx, 4.15, bw, 2.7, 'Comparing antibiotics', C.green, C.greenSoft);
  txt(s, 'Area of clear zone = **πr²**.  A **bigger** zone = a **more effective** antibiotic.', bx + 0.2, 4.85, bw - 0.4, 0.75, { size: 17 });
  txt(s, 'A: diameter 24 mm, r = 12 mm,  π × 12² = **452 mm²**', bx + 0.2, 5.65, bw - 0.4, 0.45, { size: 17 });
  txt(s, 'B: diameter 16 mm, r = 8 mm,  π × 8² = **201 mm²**', bx + 0.2, 6.15, bw - 0.4, 0.45, { size: 17 });
  notes(s, 'Separate Biology required practical (4.1.1.6). C has no clear zone: these bacteria are resistant to antibiotic C. Incubate at 25 °C maximum in schools to reduce the chance of growing human pathogens. Measure the diameter, halve it for the radius. Zones drawn to scale: A 24 mm, B 16 mm.');
}

D.myTurnYourTurn({
  title: 'Clear zone areas', tag: 'Maths skill', stepSize: 22, labelW: 1.75, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'A clear zone has a diameter of 24 mm. Calculate its area to 3 significant figures.',
    steps: [
      { label: 'Radius', text: '**24 ÷ 2 = 12 mm**' },
      { label: 'Formula', text: '**π × 12²**' },
      { label: 'Area', text: '**452 mm²**' },
    ],
  },
  yours: {
    q: 'A clear zone has a diameter of 18 mm. Calculate its area to 3 significant figures.',
    steps: [
      { label: 'Radius', text: '**18 ÷ 2 = 9 mm**' },
      { label: 'Formula', text: '**π × 9²**' },
      { label: 'Area', text: '**254 mm²**' },
    ],
  },
  notes: 'Common error: using the diameter in πr² (π × 24² = 1810). π × 144 = 452.39; π × 81 = 254.47.',
});

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: where drugs come from', { tag: '4.3.1.9' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 1.4, h = 2.15;
  const src = [['Digitalis', 'from **foxgloves**', 'A heart drug.', C.blue], ['Aspirin', 'from **willow** bark', 'A painkiller.', C.orange], ['Penicillin', 'from **Penicillium** mould', 'The first antibiotic.', C.green]];
  src.forEach(([a, b, c, col], i) => {
    const x = MX + i * (cw + gap);
    headCard(s, x, top, cw, h, a, col, C.white);
    txt(s, b, x + 0.25, top + 0.8, cw - 0.5, 0.5, { size: 21 });
    txt(s, c, x + 0.25, top + 1.4, cw - 0.5, 0.5, { size: 19, color: C.grey });
  });
  txt(s, 'Traditionally, drugs were **extracted from plants and microorganisms**.', MX, top + 2.35, W - 2 * MX, 0.5, { size: 20 });
  rect(s, MX, 4.4, (W - 2 * MX) / 2 - 0.2, 2.45, C.soft, C.line);
  txt(s, '**Fleming, 1928:** he noticed that bacteria did **not grow** around a Penicillium mould that had got onto his plate. The mould made **penicillin**.', MX + 0.25, 4.45, (W - 2 * MX) / 2 - 0.5, 2.35, { size: 20, valign: 'middle' });
  const x2 = MX + (W - 2 * MX) / 2 + 0.2;
  rect(s, x2, 4.4, (W - 2 * MX) / 2 - 0.2, 2.45, C.greyLight, C.line);
  txt(s, '**Today:** most new drugs are **made by chemists** in the pharmaceutical industry. The starting point may still be a chemical from a plant.', x2 + 0.25, 4.45, (W - 2 * MX) / 2 - 0.5, 2.35, { size: 20, valign: 'middle' });
  notes(s, 'Spec: "The heart drug digitalis originates from foxgloves. The painkiller aspirin originates from willow. Penicillin was discovered by Alexander Fleming from the Penicillium mould." Students must know all three pairings.');
}

{
  const s = frame('Testing a new drug', { tag: '4.3.1.9' });
  const st = [
    ['Preclinical', 'In a lab, on **cells**, **tissues** and **live animals**.', C.maroon],
    ['Volunteers', '**Clinical trial**: healthy people, **very low doses**, to check it is **safe**.', C.accent],
    ['Patients', '**Clinical trial**: find the **optimum dose**; check it **works**.', C.blue],
    ['Peer review', 'Other scientists **check** the results before they are published.', C.green],
  ];
  const bw = 2.75, gap = (W - 2 * MX - 4 * bw) / 3, y = 1.45, h = 2.75;
  st.forEach(([a, b, col], i) => {
    const x = MX + i * (bw + gap);
    headCard(s, x, y, bw, h, a, col, C.white);
    txt(s, b, x + 0.18, y + 0.75, bw - 0.36, h - 0.9, { size: 18 });
    if (i < 3) arrow(s, x + bw + 0.04, y + h / 2, x + bw + gap - 0.04, y + h / 2, C.ink, 2.5);
  });
  rect(s, MX, 4.45, W - 2 * MX, 2.4, C.soft, C.line);
  txt(s, 'Every new drug is tested for three things:', MX + 0.3, 4.55, W - 2 * MX - 0.6, 0.45, { size: 19, bold: true, color: C.maroon });
  [['Toxicity', 'Is it harmful? Are there side effects?'], ['Efficacy', 'Does it work? Does it make the patient better?'], ['Dose', 'What amount works best and is safe?']].forEach(([a, b], i) => {
    const x = MX + 0.3 + i * 4.05;
    txt(s, a, x, 5.15, 3.8, 0.45, { size: 21, bold: true });
    txt(s, b, x, 5.65, 3.8, 1.0, { size: 17 });
  });
  notes(s, 'Spec: "New drugs are extensively tested and trialled before being used to check that they are safe and effective. Preclinical testing is done in a laboratory using cells, tissues and live animals. Clinical trials use healthy volunteers and patients. Very low doses of the drug are given at the start of the clinical trial. If the drug is found to be safe, further clinical trials are carried out to find the optimum dose." The whole process takes about 10–15 years.');
}

{
  const s = frame('Double-blind trials and placebos', { tag: '4.3.1.9' });
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 1.4;
  // two groups of patients
  headCard(s, MX, top, cw, 3.1, 'Two groups, chosen at random', C.maroon, C.soft);
  const grp = (x0, col, lab) => {
    for (let k = 0; k < 6; k++) { const x = x0 + (k % 3) * 0.6, y = top + 1.0 + Math.floor(k / 3) * 0.75; circle(s, x, y, 0.3, col); rect(s, x - 0.2, y + 0.18, 0.4, 0.3, col); }
    txt(s, lab, x0 - 0.45, top + 2.45, 2.2, 0.5, { size: 17, bold: true, color: col, align: 'center' });
  };
  grp(MX + 0.9, C.accent, 'the new drug');
  grp(MX + 3.6, C.grey, 'a placebo');
  headCard(s, MX + cw + gap, top, cw, 3.1, 'Double-blind', C.orange, C.orangeSoft);
  txt(s, '**Neither** the patients **nor** the doctors know who has the drug and who has the placebo, until the end.', MX + cw + gap + 0.25, top + 0.8, cw - 0.5, 2.1, { size: 19 });
  rect(s, MX, 4.7, W - 2 * MX, 2.15, C.greenSoft, C.green);
  txt(s, 'Why?', MX + 0.3, 4.78, 3, 0.42, { size: 19, bold: true, color: C.green });
  bullets(s, MX + 0.3, 5.25, W - 2 * MX - 0.6, ['The **placebo** group is a control: people can feel better just because they think they are being treated.', 'Double-blind stops **bias**: doctors cannot treat or judge the groups differently, so any difference is due to the drug.'], 17, 0.12);
  notes(s, 'Spec: "In double blind trials, some patients are given a placebo." Placebos are not always used for very ill patients (it would be unethical to give them nothing); then the new drug is compared with the best existing treatment.');
}

D.hinge({
  title: 'Quick check',
  q: 'In a double-blind trial, who knows which patients are given the placebo?',
  options: ['Nobody, until the trial ends', 'Only the doctors', 'Only the patients', 'Both the doctors and the patients'],
  correct: 0,
  notes: 'Answer A. B is a single-blind trial. C and D would let bias in.',
});

D.myTurnYourTurn({
  title: 'Explaining drug trials', tag: 'Exam skill', stepSize: 19, labelW: 1.85, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Describe how a new drug is tested before doctors can use it.  [4 marks]',
    steps: [
      { label: 'Preclinical', text: '**On cells, tissues, animals**' },
      { label: 'Volunteers', text: '**Healthy people, low dose**' },
      { label: 'Patients', text: '**Find the optimum dose**' },
      { label: 'Checks', text: '**Toxicity, efficacy, dose**' },
    ],
  },
  yours: {
    q: 'Explain why new drugs are tested in double-blind trials with a placebo.  [3 marks]',
    steps: [
      { label: 'Placebo', text: '**A control to compare with**' },
      { label: 'Double-blind', text: '**No one knows who has it**' },
      { label: 'So…', text: '**No bias: a fair result**' },
    ],
  },
  notes: 'Yours: the three marks are placebo as a comparison; neither doctors nor patients know; this removes bias, so any effect is due to the drug.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What do antibiotics do?', 'Kill bacteria inside the body'], ['Who discovered penicillin?', 'Alexander Fleming'], ['Which plant does digitalis come from?', 'Foxglove'], ['What is a placebo?', 'A dummy treatment with no active drug'],
    ['Why can antibiotics not treat flu?', 'Flu is a virus; antibiotics do not kill viruses'], ['Why are very low doses used at the start of clinical trials?', 'To check the drug is safe (not toxic)'],
    ['A clear zone has a diameter of 30 mm. Calculate its area to 3 s.f.', '707 mm²'], ['Suggest why it is hard to make drugs that kill viruses.', 'Viruses are inside cells: the drug would damage them'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: explain', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) kill infective bacteria in the body  2) Alexander Fleming  3) foxgloves  4) a dummy treatment with no active ingredient  5) flu is caused by a virus; antibiotics only kill bacteria  6) in case it is toxic: check it is safe before larger doses  7) r = 15, π × 225 = 707 mm²  8) viruses reproduce inside body cells, so a drug that kills them would also damage body tissues.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.3,
  stem: 'A company has developed a new antibiotic.',
  parts: [
    { l: 'a', q: 'Explain why the antibiotic should not be used to treat measles.', m: 2, lines: 1 },
    { l: 'b', q: 'Describe the preclinical testing of the new antibiotic.', m: 2, lines: 1 },
    { l: 'c', q: 'The clinical trial was a double-blind trial with a placebo. Explain why.', m: 3, lines: 1 },
    { l: 'd', q: 'On an agar plate, the antibiotic made a clear zone 22 mm in diameter. Calculate the area of the clear zone. Give your answer to 3 significant figures.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'measles is caused by a virus; antibiotics only kill bacteria', '2', ''],
    ['(b)', 'tested on cells / tissues in a lab; then on live animals', '2', 'allow: for toxicity, efficacy, dose'],
    ['(c)', 'placebo gives a comparison; neither doctors nor patients know who has which; removes bias', '3', ''],
    ['(d)', 'r = 11 mm; π × 11²; 380 mm²', '3', '380.1 scores 2'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['Which drug comes from willow?', 'Why do painkillers not cure a disease?', 'Who is given the drug first in a clinical trial?', 'What is peer review?'], { cols: 2, size: 26 });
  notes(s, 'Answers: 1) aspirin  2) they treat symptoms but do not kill the pathogen  3) healthy volunteers, at a very low dose  4) other scientists check the results before they are published. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Compare antibiotics and painkillers.',
    'Describe how Fleming discovered penicillin.',
    'Explain how a strain of antibiotic-resistant bacteria develops.',
    'Describe the stages in developing a new drug.',
    'Explain why a placebo is used in a drug trial.',
    'A clear zone is 26 mm across. Calculate its area to 3 s.f.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) antibiotics kill bacteria and cure; painkillers treat symptoms only; neither kills viruses  2) bacteria did not grow near Penicillium mould on his plate  3) mutation; non-resistant bacteria killed; resistant survive and reproduce; population resistant  4) preclinical (cells, tissues, animals) → healthy volunteers, low dose → patients, optimum dose → peer review  5) a comparison, to show the effect is from the drug  6) r = 13, π × 169 = 531 mm².');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.3.1_C_AntibioticsAndDrugs.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
