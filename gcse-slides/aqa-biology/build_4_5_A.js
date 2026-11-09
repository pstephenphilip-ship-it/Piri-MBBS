// build_4_5_A.js — AQA GCSE Biology (8461) 4.5 Homeostasis and response, lesson 1 of 5:
// 4.5.1 Homeostasis, 4.5.2.1 The nervous system and reflexes, Required practical 7 (reaction time).
// One two-hour lesson for a Higher student.
// Run: NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules node build_4_5_A.js
'use strict';
const path = require('path');
const T = require('../aqa-maths/maths_lesson');
const { C, calc } = T;

const DECK = {
  code: '4.5.1–4.5.2.1', title: 'Homeostasis and reflexes',
  kicker: 'AQA GCSE BIOLOGY (8461)  •  HIGHER',
  footer: 'AQA GCSE Biology 8461', author: 'GCSE Biology', docPrefix: 'AQA 8461',
  palette: { maroon: '1D4E63', accent: '2A6F8E', soft: 'EEF5F8', line: 'D3E3EA', ink: '1C2730' },
  light: 'CFE3EC',
};
const D = T.init(DECK);
const { frame, notes, txt, rect, circle, hline, vline, MX, W } = D;
const NEURO = '7A4E9C';
const mean = a => a.reduce((x, y) => x + y, 0) / a.length;
const tdrop = cm => Math.sqrt(2 * cm / 100 / 9.8);
const r3 = v => Math.round(v * 1000) / 1000;

// ======================= numbers (all checked) =======================
const DIST = [5, 10, 15, 20, 25, 30], TIMES = ['0.101', '0.143', '0.175', '0.202', '0.226', '0.247'];
DIST.forEach((d, i) => calc('t' + d, r3(tdrop(d)), Number(TIMES[i])));
calc('MT mean', mean([18, 22, 20, 16, 24]), 20); calc('YT mean', mean([12, 15, 9, 14]), 12.5);
calc('P8', mean([14, 16, 15]), 15); calc('exam d', mean([25, 21, 23]), 23); calc('HW5', mean([11, 13, 12, 8]), 11);

function arrow(s, x1, y1, x2, y2, color = C.ink, width = 2.5) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipH: x2 < x1, flipV: y2 < y1, line: { color, width, endArrowType: 'triangle' } });
}
function seg(s, x1, y1, x2, y2, color, width = 2) {
  s.addShape(D.SH.line, { x: Math.min(x1, x2), y: Math.min(y1, y2), w: Math.max(Math.abs(x2 - x1), 0.001), h: Math.max(Math.abs(y2 - y1), 0.001),
    flipV: (x2 - x1) * (y2 - y1) < 0, line: { color, width } });
}
function headCard(s, x, y, w, h, head, colour, fill) {
  rect(s, x, y, w, h, fill, colour);
  rect(s, x, y, w, 0.58, colour);
  txt(s, head, x + 0.2, y, w - 0.4, 0.58, { size: 19, bold: true, color: C.white, valign: 'middle' });
}
function bullets(s, x, y, w, items, size = 18, gap = 0.16) {
  items.forEach(t => { const th = D.textH(t, size, w - 0.3); txt(s, '•', x, y, 0.3, 0.4, { size, bold: true, color: C.accent }); txt(s, t, x + 0.3, y, w - 0.3, th + 0.05, { size }); y += th + gap; });
  return y;
}
// row of boxes joined by arrows
function flow(s, items, y, h, size = 18, cols) {
  const n = items.length, gap = 0.42, bw = (W - 2 * MX - (n - 1) * gap) / n;
  items.forEach(([a, b], i) => {
    const x = MX + i * (bw + gap), col = (cols && cols[i]) || C.maroon;
    rect(s, x, y, bw, h, C.white, col, { lw: 2 });
    const hh = Math.min(h, 0.68);
    rect(s, x, y, bw, hh, col);
    txt(s, a, x + 0.06, y, bw - 0.12, hh, { size: 15, bold: true, color: C.white, align: 'center', valign: 'middle' });
    if (b) txt(s, b, x + 0.12, y + hh + 0.1, bw - 0.24, h - hh - 0.15, { size, align: 'center' });
    if (i < n - 1) arrow(s, x + bw + 0.04, y + h / 2, x + bw + gap - 0.04, y + h / 2, C.ink, 2.5);
  });
}

// ======================= slides =======================
D.titleSlide({
  subtitle: 'What homeostasis is, how control systems work, the nervous system, reflex arcs and measuring reaction time',
  bullets: ['Part 1: homeostasis and control systems (4.5.1)', 'Part 2: the nervous system and synapses (4.5.2.1)', 'Part 3: reflex actions (4.5.2.1)', 'Part 4: Required practical 7: reaction time'],
  notes: 'AQA 8461 GCSE Biology 4.5 Homeostasis and response, lesson 1 of 5. Lesson 2: the brain and the eye. Lesson 3: temperature control, hormones, blood glucose and diabetes. Lesson 4: water balance, the kidney and reproductive hormones. Lesson 5: plant hormones (RP8). RP7 (reaction time) is separate Biology only. About two hours.',
});

D.objectives({
  tag: '4.5.1, 4.5.2.1',
  items: [
    'Explain what **homeostasis** is and why it matters for **enzymes**.',
    'Describe a control system: **receptor, coordination centre, effector**.',
    'Describe the **nervous system**, **synapses** and the **reflex arc**.',
    'Plan **RP7** and calculate a **mean** reaction distance.',
  ],
  keywords: ['homeostasis', 'stimulus', 'receptor', 'effector', 'neurone', 'synapse'],
  notes: 'Share the objectives.',
});

D.doNow({
  tag: '5 minutes • retrieval',
  qs: ['What is the "optimum" temperature of an enzyme?', 'What happens to an enzyme far above its optimum temperature?', 'Which gas do muscles need more of during exercise?', 'What is diffusion?'],
  answers: ['The temperature it works fastest at', 'It is denatured (active site changes shape)', 'Oxygen', 'Net movement from high to low concentration'],
  notes: 'Retrieval from 4.2 (enzymes), 4.4.2 (exercise) and 4.1 (diffusion: needed for synapses).',
});

D.vocab({
  title: 'Key words', tag: '4.5.1',
  items: [
    { term: 'Homeostasis', def: '**Keeping internal conditions** at the optimum level, despite internal and external changes.' },
    { term: 'Receptor', def: 'A cell that **detects a stimulus** (a change in the environment).' },
    { term: 'Effector', def: 'A **muscle** or **gland** that brings about a response.' },
    { term: 'Synapse', def: 'The **gap** between two neurones. A **chemical** diffuses across it.' },
  ],
  notes: 'Coordination centre: receives and processes information from receptors, e.g. the brain, spinal cord or pancreas.',
});

// ---------------- Part 1 ----------------
{
  const s = frame('Part 1: what is homeostasis?', { tag: '4.5.1' });
  rect(s, MX, 1.4, W - 2 * MX, 1.25, C.soft, C.line);
  txt(s, '**Homeostasis** is the regulation of the internal conditions of a cell or organism to keep them at the **optimum**, in response to internal and external changes.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 1.25, { size: 20, valign: 'middle' });
  const gap = 0.3, cw = (W - 2 * MX - 2 * gap) / 3, top = 3.15, h = 1.95;
  [['Blood glucose', 'concentration'], ['Body temperature', 'about 37 °C'], ['Water levels', 'in the blood and cells']].forEach(([a, b], i) => {
    const x = MX + i * (cw + gap); headCard(s, x, top, cw, h, a, C.maroon, C.white); txt(s, b, x + 0.2, top + 0.8, cw - 0.4, 0.6, { size: 20 });
  });
  txt(s, 'Three conditions controlled in the human body:', MX, top - 0.42, 7, 0.4, { size: 16, bold: true, color: C.grey });
  rect(s, MX, 5.35, W - 2 * MX, 1.5, C.orangeSoft, 'F3D9B5');
  txt(s, '**Why it matters:** enzymes and all cell functions need **optimum conditions**. Too hot and enzymes **denature**; too little water and cells stop working.', MX + 0.3, 5.35, W - 2 * MX - 0.6, 1.5, { size: 19, valign: 'middle' });
  notes(s, 'Spec 4.5.1: homeostasis is important for maintaining optimal conditions for enzyme action and all cell functions. These automatic control systems may involve nervous responses or chemical (hormone) responses. Blood glucose: lesson 3. Temperature: lesson 3. Water: lesson 4.');
}

{
  const s = frame('How a control system works', { tag: '4.5.1' });
  flow(s, [['Stimulus', 'a change, e.g. it gets hot'], ['Receptor', 'cells that **detect** the stimulus'], ['Coordination centre', 'brain, spinal cord or pancreas: **processes** the information'], ['Effector', 'a **muscle** or **gland**'], ['Response', 'restores the **optimum** level']], 1.55, 2.4, 16, [C.grey, C.maroon, C.accent, C.green, C.grey]);
  rect(s, MX, 4.25, W - 2 * MX, 2.6, C.greyLight, C.line);
  txt(s, 'Two ways to send the message', MX + 0.3, 4.35, 6, 0.45, { size: 20, bold: true, color: C.maroon });
  const gw = (W - 2 * MX - 0.9) / 2;
  txt(s, '**Nervous**: electrical impulses along neurones. **Fast**, short-lived and precise.', MX + 0.3, 4.95, gw, 1.6, { size: 19 });
  txt(s, '**Hormonal**: chemicals carried in the blood. **Slower**, but the effect lasts longer.', MX + 0.6 + gw, 4.95, gw, 1.6, { size: 19 });
  notes(s, 'Spec 4.5.1: "All control systems include: cells called receptors, which detect stimuli (changes in the environment); coordination centres (such as the brain, spinal cord and pancreas) that receive and process information from receptors; effectors, muscles or glands, which bring about responses which restore optimum levels." The nervous/hormonal comparison returns in lesson 3.');
}

D.hinge({
  title: 'Quick check',
  q: 'Which of these is an effector?',
  options: ['A gland', 'The brain', 'A temperature receptor in the skin', 'The spinal cord'],
  correct: 0,
  notes: 'Answer A: effectors are muscles or glands. B and D are coordination centres. C is a receptor.',
});

// ---------------- Part 2 ----------------
{
  const s = frame('Part 2: the nervous system', { tag: '4.5.2.1' });
  flow(s, [['Stimulus', ''], ['Receptor', ''], ['Coordinator (CNS)', ''], ['Effector', ''], ['Response', '']], 1.5, 0.52, 16, [C.grey, C.maroon, C.accent, C.green, C.grey]);
  const gap = 0.4, cw = (W - 2 * MX - gap) / 2, top = 2.35;
  headCard(s, MX, top, cw, 4.5, 'Central nervous system (CNS)', C.accent, C.soft);
  bullets(s, MX + 0.25, top + 0.8, cw - 0.5, ['The **brain** and **spinal cord**.', 'Receives impulses from receptors and **coordinates** the response of effectors.', 'Lets us **react** to our surroundings and coordinate behaviour.'], 18, 0.2);
  headCard(s, MX + cw + gap, top, cw, 4.5, 'Neurones (nerve cells)', NEURO, 'F4F0F9');
  bullets(s, MX + cw + gap + 0.25, top + 0.8, cw - 0.5, ['Carry information as **electrical impulses**.', '**Sensory** neurones: receptors → CNS.', '**Motor** neurones: CNS → effectors.', '**Relay** neurones: inside the CNS, sensory → motor.'], 18, 0.2);
  notes(s, 'Spec 4.5.2.1: "The nervous system enables humans to react to their surroundings and to coordinate their behaviour. Information from receptors passes along cells (neurones) as electrical impulses to the central nervous system (CNS). The CNS is the brain and spinal cord. The CNS coordinates the response of effectors which may be muscles contracting or glands secreting hormones."');
}

{
  const s = frame('Neurones and synapses', { tag: '4.5.2.1' });
  // neurone
  const y = 2.6;
  for (let k = -2; k <= 2; k++) seg(s, MX + 0.9, y, MX + 0.35, y + k * 0.32, NEURO, 2);
  circle(s, MX + 1.15, y, 0.75, 'E4DAF0', NEURO, 2); circle(s, MX + 1.15, y, 0.28, NEURO);
  hline(s, MX + 1.5, y, MX + 6.6, NEURO, 3);
  for (let i = 0; i < 6; i++) rect(s, MX + 1.9 + i * 0.8, y - 0.17, 0.62, 0.34, 'F6E7A8', 'C9A227');
  for (let k = -1; k <= 1; k++) seg(s, MX + 6.6, y, MX + 7.0, y + k * 0.3, NEURO, 2);
  txt(s, 'cell body', MX + 0.6, y + 0.45, 1.3, 0.35, { size: 14, bold: true, align: 'center' });
  txt(s, 'dendrites', MX - 0.1, y - 1.05, 1.3, 0.35, { size: 14, bold: true });
  txt(s, 'long axon with a fatty myelin sheath (insulates, speeds up the impulse)', MX + 1.9, y + 0.3, 4.8, 0.65, { size: 14, bold: true });
  txt(s, 'nerve endings', MX + 6.0, y - 0.8, 1.5, 0.35, { size: 14, bold: true });
  arrow(s, MX + 2.2, y - 0.55, MX + 5.4, y - 0.55, C.red, 2); txt(s, 'impulse', MX + 3.3, y - 0.95, 1.2, 0.35, { size: 14, bold: true, color: C.red });
  // synapse
  const sx = MX + 8.0, sy = 1.6;
  rect(s, sx, sy, W - MX - sx, 2.6, C.soft, C.line);
  txt(s, 'Synapse', sx + 0.2, sy + 0.08, 3, 0.4, { size: 18, bold: true, color: C.maroon });
  s.addShape(D.SH.ellipse, { x: sx + 0.35, y: sy + 0.75, w: 1.7, h: 1.5, fill: { color: 'E4DAF0' }, line: { color: NEURO, width: 2 } });
  rect(s, sx + 2.55, sy + 0.65, 1.55, 1.7, 'E4DAF0', NEURO);
  [[1.55, 1.15], [1.75, 1.55], [1.5, 1.85], [2.25, 1.3], [2.35, 1.7]].forEach(([dx, dy]) => circle(s, sx + dx, sy + dy, 0.13, C.red));
  arrow(s, sx + 1.9, sy + 2.45, sx + 2.65, sy + 2.45, C.red, 2);
  txt(s, 'gap', sx + 2.05, sy + 0.4, 0.6, 0.3, { size: 13, bold: true, color: C.grey });
  rect(s, MX, 4.45, W - 2 * MX, 2.4, C.greyLight, C.line);
  bullets(s, MX + 0.3, 4.6, W - 2 * MX - 0.6, ['An impulse reaches the end of a neurone. It releases a **chemical** into the synapse.', 'The chemical **diffuses** across the gap and binds to the next neurone, starting a **new impulse**.', 'Synapses make sure impulses go **one way**. They are the slowest part of the pathway.'], 18, 0.14);
  notes(s, 'Adaptations: long axons carry impulses a long way; the myelin sheath insulates and speeds up the impulse; many dendrites connect with many other neurones. The chemical is a neurotransmitter (the term is not required by the spec but is useful).');
}

// ---------------- Part 3 ----------------
{
  const s = frame('Part 3: reflex actions', { tag: '4.5.2.1' });
  rect(s, MX, 1.4, W - 2 * MX, 0.95, C.soft, C.line);
  txt(s, 'Reflexes are **automatic** and **rapid**. They do **not** involve the conscious part of the brain, so they protect us from harm.', MX + 0.3, 1.4, W - 2 * MX - 0.6, 0.95, { size: 19, valign: 'middle' });
  flow(s, [['Stimulus', 'hot pan'], ['Receptor', 'in the skin'], ['Sensory neurone', 'to the spinal cord'], ['Relay neurone', 'in the spinal cord'], ['Motor neurone', 'to the muscle'], ['Effector', 'muscle contracts: hand moves']], 2.65, 2.0, 16, [C.grey, C.maroon, NEURO, NEURO, NEURO, C.green]);
  rect(s, MX, 4.95, W - 2 * MX, 1.9, C.orangeSoft, 'F3D9B5');
  txt(s, 'Examples', MX + 0.3, 5.05, 3, 0.42, { size: 19, bold: true, color: C.orange });
  bullets(s, MX + 0.3, 5.55, W - 2 * MX - 0.6, ['Pulling your hand away from something hot or sharp.', 'The **pupil** getting smaller in bright light (lesson 2).', 'Blinking when something comes near your eye.'], 17, 0.06);
  notes(s, 'Spec 4.5.2.1: "Reflex actions are automatic and rapid; they do not involve the conscious part of the brain. Students should be able to explain how the various structures in a reflex arc – including the sensory neurone, synapse, relay neurone and motor neurone – relate to their function." There are synapses between each pair of neurones. The brain is told what happened after the response.');
}

D.hinge({
  title: 'Quick check',
  q: 'Why are reflex actions so fast?',
  options: ['They do not involve the conscious part of the brain', 'Their neurones have no synapses', 'They use hormones in the blood', 'The impulse goes to the brain first'],
  correct: 0,
  notes: 'Answer A. B: there are still synapses. C: hormones are slow. D: the reflex arc goes through the spinal cord (or unconscious brain), not the conscious brain.',
});

D.myTurnYourTurn({
  title: 'Describing a reflex arc', tag: 'Exam skill', stepSize: 19, labelW: 1.75, labelSize: 17, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'You touch a hot pan. Describe the reflex arc.  [5 marks]',
    steps: [
      { label: 'Receptor', text: '**Skin receptors detect heat**' },
      { label: 'Sensory', text: '**Impulse to spinal cord**' },
      { label: 'Relay', text: '**Passes it to motor neurone**' },
      { label: 'Motor', text: '**Impulse to arm muscle**' },
      { label: 'Effector', text: '**Muscle contracts**' },
    ],
  },
  yours: {
    q: 'A bright light shines in your eye. Describe the reflex arc.  [5 marks]',
    steps: [
      { label: 'Receptor', text: '**Light receptors in retina**' },
      { label: 'Sensory', text: '**Impulse to the brain**' },
      { label: 'Relay', text: '**Unconscious part of brain**' },
      { label: 'Motor', text: '**Impulse to iris muscles**' },
      { label: 'Effector', text: '**Iris muscles: pupil smaller**' },
    ],
  },
  notes: 'Mention synapses between the neurones for full marks in longer questions: "a chemical diffuses across the synapse". Yours: the pupil reflex goes through the brain, but not the conscious part.',
});

// ---------------- Part 4 ----------------
{
  const s = frame('Part 4: Required practical 7: reaction time', { tag: 'RP7' });
  // ruler drop picture
  const rx = MX + 1.0, ry = 1.6;
  rect(s, rx, ry, 0.55, 4.6, 'F6E7A8', 'C9A227');
  for (let i = 0; i <= 30; i++) hline(s, rx, ry + 0.15 + i * 0.145, rx + (i % 5 === 0 ? 0.3 : 0.15), C.ink, 1);
  rect(s, rx - 0.4, ry + 4.0, 1.35, 0.5, 'E8C9B5', 'B08A72');
  txt(s, 'thumb and finger at 0 cm', rx + 1.05, ry + 4.0, 1.8, 0.6, { size: 14, bold: true });
  arrow(s, rx + 0.9, ry + 0.4, rx + 0.9, ry + 2.0, C.red, 2.5); txt(s, 'ruler dropped', rx + 1.0, ry + 0.9, 1.8, 0.4, { size: 14, bold: true, color: C.red });
  const bx = MX + 3.9, bw = W - MX - bx;
  headCard(s, bx, 1.4, bw, 2.75, 'Method', C.maroon, C.soft);
  bullets(s, bx + 0.2, 2.1, bw - 0.4, ['Partner holds a ruler; your thumb and finger are level with 0 cm.', 'Partner drops it **without warning**; you catch it. Read the distance.', 'Repeat **5 times**; then change the factor (e.g. after a caffeine drink) and repeat.'], 16, 0.08);
  headCard(s, bx, 4.3, bw, 2.55, 'Variables', C.green, C.greenSoft);
  bullets(s, bx + 0.2, 5.0, bw - 0.4, ['**Independent**: the factor, e.g. caffeine, or which hand.', '**Dependent**: distance (converted to time).', '**Control**: same person, same ruler, same hand, same start position, no distractions.'], 16, 0.06);
  notes(s, 'RP7 (separate Biology only): "plan and carry out an investigation into the effect of a factor on human reaction time." A shorter catch distance = a faster reaction. Computer reaction-time tests are an acceptable alternative. Caffeine is a stimulant and usually shortens reaction time.');
}

{
  const s = frame('Converting distance to reaction time', { tag: 'RP7 data' });
  const cw0 = 3.2, cw = (W - 2 * MX - cw0) / 6;
  [['Distance (cm)', ...DIST.map(String)], ['Reaction time (s)', ...TIMES]].forEach((r, i) => r.forEach((c, j) => {
    const x = j === 0 ? MX : MX + cw0 + (j - 1) * cw, w = j === 0 ? cw0 : cw, y = 1.5 + i * 0.75;
    rect(s, x, y, w, 0.75, i === 0 ? C.maroon : C.white, i === 0 ? C.maroon : C.line);
    txt(s, c, x + 0.15, y, w - 0.3, 0.75, { size: 19, bold: i === 0 || j === 0, color: i === 0 ? C.white : C.ink, align: j === 0 ? 'left' : 'center', valign: 'middle' });
  }));
  txt(s, 'You will be given a table like this: you do not need to calculate the times.', MX, 3.1, W - 2 * MX, 0.4, { size: 15, color: C.grey });
  rect(s, MX, 3.7, W - 2 * MX, 3.15, C.soft, C.line);
  txt(s, 'Working with the results', MX + 0.3, 3.8, 6, 0.45, { size: 20, bold: true, color: C.maroon });
  bullets(s, MX + 0.3, 4.35, W - 2 * MX - 0.6, ['Calculate the **mean** distance: add the results and divide by how many there are.', 'Leave out any **anomaly** (a result that does not fit the pattern) before finding the mean.', 'A **shorter** distance means a **faster** reaction.', 'Repeating and finding a mean makes the results more **reliable**: it reduces the effect of random errors.'], 18, 0.1);
  notes(s, 'Times come from t = √(2d ÷ g) with g = 9.8 m/s²: physics, not needed for biology. Spec: students should be able to extract and interpret data from graphs, charts and tables about the nervous system.');
}

D.myTurnYourTurn({
  title: 'Mean reaction distance', tag: 'Maths skill', stepSize: 21, labelW: 1.75, labelSize: 18, labelPlain: false, labelColor: C.maroon, showYourQs: false,
  mine: {
    q: 'Results (cm): 18, 22, 20, 16, 24. Find the mean.',
    steps: [
      { label: 'Anomaly?', text: '**None**' },
      { label: 'Total', text: '**100 cm**' },
      { label: 'Mean', text: '**100 ÷ 5 = 20 cm**' },
    ],
  },
  yours: {
    q: 'Results (cm): 12, 15, 9, 31, 14. Find the mean.',
    steps: [
      { label: 'Anomaly?', text: '**31 cm: leave it out**' },
      { label: 'Total', text: '**50 cm**' },
      { label: 'Mean', text: '**50 ÷ 4 = 12.5 cm**' },
    ],
  },
  notes: 'Yours: 31 cm is far from the others (perhaps the catcher was distracted), so it is excluded. Divide by 4, not 5.',
});

// ---------------- Practice & assessment ----------------
{
  const items = [
    ['What is homeostasis?', 'Keeping internal conditions at the optimum'], ['Name three conditions controlled by homeostasis.', 'Blood glucose, temperature, water levels'], ['What do receptors do?', 'Detect stimuli (changes)'], ['What two organs make up the CNS?', 'The brain and spinal cord'],
    ['How does an impulse cross a synapse?', 'A chemical diffuses across the gap'], ['Why are reflex actions important?', 'They are fast and protect us from harm'],
    ['RP7: give two control variables.', 'Same person, same hand (or ruler, start height)'], ['Ruler results: 14, 16, 30, 15 cm. Find the mean, leaving out the anomaly.', '15 cm'],
  ];
  for (const [ttl, k, tag] of [['Practice: recall', 0, 'Questions 1–4'], ['Practice: apply', 4, 'Questions 5–8']]) for (const reveal of [false, true]) {
    const s = frame(reveal ? ttl + ': answers' : ttl, { tag: reveal ? 'Mark your work' : tag });
    if (reveal) D.qCards(s, items.slice(k, k + 4).map(i => i[1]), { cols: 2, size: 24, color: C.green, bold: true, start: k });
    else D.qCards(s, items.slice(k, k + 4).map(i => i[0]), { cols: 2, size: 24, start: k });
    notes(s, 'Answers: 1) regulating internal conditions to keep them at the optimum  2) blood glucose concentration, body temperature, water levels  3) detect stimuli  4) brain and spinal cord  5) a chemical is released, diffuses across the gap and starts an impulse in the next neurone  6) automatic and rapid: protect the body from harm  7) same person, same hand, same ruler, same start position, no distractions  8) leave out 30: (14 + 16 + 15) ÷ 3 = 15 cm.');
  }
}

D.examQuestion({
  title: 'Exam question', tag: 'AQA style • 10 marks', size: 19, lineGap: 0.28,
  parts: [
    { l: 'a', q: 'What is meant by homeostasis?', m: 2, lines: 1 },
    { l: 'b', q: 'Complete the sequence:  stimulus → receptor → __________ → effector → response', m: 1, lines: 0 },
    { l: 'c', q: 'A person steps on a pin and moves their foot away. Describe the reflex arc that causes this.', m: 4, lines: 2 },
    { l: 'd', q: 'A student measured her reaction time with a ruler drop: 25, 21 and 23 cm. Calculate the mean, and give two variables she should control.', m: 3, lines: 1 },
  ],
  total: 10, schemeTag: '1 mark per point',
  scheme: [
    ['(a)', 'regulation of internal conditions; to keep them at the optimum (in response to changes)', '2', ''],
    ['(b)', 'coordination centre / CNS', '1', 'allow: brain or spinal cord'],
    ['(c)', 'receptor detects the pin; sensory neurone to spinal cord; relay neurone (synapse); motor neurone to muscle (effector) contracts', '4', 'allow: chemical across synapses'],
    ['(d)', 'mean = 23 cm; any two: same hand, same ruler, same start position, same person', '3', '1 + 2'],
  ],
  notes: 'Mark scheme on the next slide.',
});

{
  const s = frame('Exit ticket', { tag: 'On your own • 5 minutes' });
  D.qCards(s, ['What are the two types of effector?', 'Name the three neurones in a reflex arc.', 'What happens at a synapse?', 'In RP7, does a shorter catch distance mean a faster or slower reaction?'], { cols: 2, size: 25 });
  notes(s, 'Answers: 1) muscles and glands  2) sensory, relay, motor  3) a chemical diffuses across the gap and starts a new impulse  4) faster. Revisit the objectives.');
}

{
  const s = frame('Homework', { tag: 'About 30 minutes' });
  D.qCards(s, [
    'Explain why homeostasis is important for enzymes.',
    'Describe the job of the coordination centre, with two examples.',
    'Draw and label a reflex arc for touching a sharp object.',
    'Explain how a neurone is adapted to carry impulses.',
    'Results: 11, 13, 12, 8 cm. Calculate the mean distance.',
    'Plan an investigation into whether practice improves reaction time.',
  ], { cols: 2, size: 21 });
  notes(s, 'Answers: 1) enzymes need optimum temperature and pH; outside these they work slowly or denature  2) receives and processes information from receptors and coordinates effectors: brain, spinal cord, pancreas  3) receptor → sensory → relay (spinal cord) → motor → muscle  4) long axon; myelin sheath insulates and speeds up; dendrites connect to many neurones  5) 44 ÷ 4 = 11 cm  6) IV: number of practice attempts; DV: catch distance; control person, hand, ruler, start position; repeat and find means.');
}

D.save(path.join(__dirname, 'AQA_8461_Bio_4.5_A_HomeostasisNervousSystem.pptx')).then(f2 => console.log('saved', f2, 'slides', D.count, 'checks', T.CALCS.length));
