// Muscles — trunk and core.
import { muscleTopic, ex, kb } from './_helpers.js';

const G = 'Trunk & core';

export const TRUNK = [
  muscleTopic({
    id: 'abdominals', group: G, title: 'Abdominals', summary: 'Rectus abdominis, external and internal obliques, transversus abdominis',
    intro: '<p>The abdominal wall has four layered muscles. Together they move the trunk, resist unwanted movement, and raise the pressure inside the abdomen to stiffen the spine under load.</p>',
    muscles: [
      {
        name: 'Rectus abdominis', aka: '"six-pack"',
        origin: 'Pubic crest and pubic symphysis.',
        insertion: 'Xiphoid process and costal cartilages of ribs 5–7.',
        action: 'Flexes the trunk, tilts the pelvis posteriorly, and compresses the abdomen.',
        short: 'Trunk flexion',
        train: `Crunches, reverse crunches, hanging knee/leg raises, ab-wheel rollouts and ${ex('plank', 'planks')} (resisting extension).`,
        notes: '<ul><li>Tendinous intersections divide it into the visible "packs". Whether they show depends mostly on body fat.</li><li>The two halves meet at the linea alba, which stretches in pregnancy (diastasis recti). Postnatal clients should rebuild with graded core work, ideally after a pelvic health assessment.</li><li>Prioritise anti-extension and controlled flexion work over high-rep sit-ups, especially for clients with osteoporosis.</li></ul>',
      },
      {
        name: 'External oblique',
        origin: 'Outer surfaces of ribs 5–12.',
        insertion: 'Linea alba, pubic tubercle and the front half of the iliac crest.',
        action: 'Both sides: flex the trunk and compress the abdomen. One side: side-bends the trunk to the same side and rotates it to the opposite side.',
        short: 'Rotation (to opposite side), side bend',
        train: 'Cable woodchops, Pallof press (anti-rotation), side planks, suitcase carries, hanging oblique raises.',
        notes: '<p>The largest and most superficial lateral abdominal muscle. Its fibres run like hands in front pockets (down and inward).</p>',
      },
      {
        name: 'Internal oblique',
        origin: 'Thoracolumbar fascia, front two-thirds of the iliac crest and the lateral part of the inguinal ligament.',
        insertion: 'Lower borders of ribs 10–12, the linea alba and the pubic crest.',
        action: 'Both sides: flex the trunk and compress the abdomen. One side: side-bends and rotates the trunk to the same side.',
        short: 'Rotation (to same side), side bend',
        train: 'Same as the external oblique.',
        notes: '<p>Lies under the external oblique with fibres at right angles to it. Turning to the right uses the left external oblique together with the right internal oblique.</p>',
      },
      {
        name: 'Transversus abdominis', aka: 'TVA, "the corset"',
        origin: 'Inner surfaces of the costal cartilages of ribs 7–12, thoracolumbar fascia, iliac crest and the lateral part of the inguinal ligament.',
        insertion: 'Linea alba and pubic crest.',
        action: 'Compresses the abdomen and raises intra-abdominal pressure. Its fibres run horizontally, so it produces no trunk movement.',
        short: 'Compresses the abdomen',
        train: `${ex('dead-bug', 'Dead bugs')}, ${ex('plank', 'planks')}, bird dogs, ${ex('farmer-carry', 'carries')}, controlled breathing and bracing practice.`,
        notes: '<ul><li>The deepest abdominal muscle. It contracts with the diaphragm, pelvic floor and multifidus to stiffen the trunk.</li><li>Bracing (tensing the whole trunk 360°) is generally more useful for heavy lifting than "drawing the belly button in".</li></ul>',
      },
    ],
    qa: [
      ['Where does rectus abdominis originate and insert?', 'Origin: pubic crest and symphysis. Insertion: xiphoid process and costal cartilages of ribs 5–7.'],
      ['Turning the trunk to the right uses which obliques?', 'The left external oblique and the right internal oblique.'],
      ['Which abdominal muscle doesn\'t move the trunk, and what does it do?', 'Transversus abdominis. It compresses the abdomen and raises intra-abdominal pressure.'],
      ['What is diastasis recti?', 'Separation of the two halves of rectus abdominis along the linea alba, common in pregnancy.'],
    ],
  }),

  muscleTopic({
    id: 'back-extensors', group: G, title: 'Back extensors & quadratus lumborum', summary: 'Erector spinae (iliocostalis, longissimus, spinalis), multifidus, quadratus lumborum',
    intro: `<p>The muscles along the spine hold you upright, extend and side-bend the trunk, and control bending forward. See also ${kb('anatomy', 'vertebral-column', 'the vertebral column')}.</p>`,
    muscles: [
      {
        name: 'Iliocostalis', aka: 'erector spinae: outer column',
        origin: 'Common tendon from the back of the iliac crest and sacrum; then the ribs.',
        insertion: 'Angles of the ribs and the transverse processes of the lower cervical vertebrae.',
        action: 'Both sides: extend the spine. One side: side-bends the spine.',
        short: 'Spinal extension, side bend',
        train: `${ex('rdl', 'RDLs')}, deadlifts, back extensions, good mornings, ${ex('kb-swing', 'kettlebell swings')}.`,
        notes: '<p>The most lateral of the three erector spinae columns.</p>',
      },
      {
        name: 'Longissimus', aka: 'erector spinae: middle column',
        origin: 'Common tendon (iliac crest, sacrum, lumbar spinous processes) and transverse processes of the lumbar and thoracic vertebrae.',
        insertion: 'Transverse processes of the thoracic and cervical vertebrae, the lower ribs and the mastoid process of the skull.',
        action: 'Both sides: extend the spine and head. One side: side-bends the spine and turns the head to the same side.',
        short: 'Spinal extension',
        train: 'As iliocostalis.',
        notes: '<p>The largest and longest column; the thick bands you can see either side of the lower spine.</p>',
      },
      {
        name: 'Spinalis', aka: 'erector spinae: inner column',
        origin: 'Spinous processes of the upper lumbar and lower thoracic vertebrae.',
        insertion: 'Spinous processes of the upper thoracic (and cervical) vertebrae.',
        action: 'Extends the spine.',
        short: 'Spinal extension',
        train: 'As iliocostalis.',
        notes: '<p>The smallest, most medial column, running alongside the spinous processes.</p>',
      },
      {
        name: 'Multifidus',
        origin: 'Back of the sacrum, the PSIS, and the processes of the lumbar, thoracic and lower cervical vertebrae.',
        insertion: 'Spinous processes 2–4 vertebrae higher.',
        action: 'Stiffens and controls individual spinal segments; extends the spine and rotates it to the opposite side.',
        short: 'Segmental stability',
        train: 'Bird dogs, back extensions, deadlifts and other loaded neutral-spine work.',
        notes: '<p>Thickest in the lumbar region. Reduced size and activity of the lumbar multifidus is often seen in people with low back pain, and it is a target in many rehab programmes.</p>',
      },
      {
        name: 'Quadratus lumborum', aka: 'QL',
        origin: 'Back of the iliac crest and the iliolumbar ligament.',
        insertion: 'The 12th rib and the transverse processes of L1–L4.',
        action: 'One side: side-bends the trunk or hitches the hip up on the same side. Both sides: extend and stabilise the lumbar spine. Fixes the 12th rib during breathing.',
        short: 'Side bend, hip hitch',
        train: `Suitcase carries (one-arm ${ex('farmer-carry', 'farmer\'s carry')}), side planks, single-arm deadlifts.`,
        notes: '<p>A key lateral stabiliser of the lumbar spine and pelvis, especially in single-leg and one-sided loading.</p>',
      },
    ],
    qa: [
      ['Name the three columns of the erector spinae from lateral to medial.', 'Iliocostalis, longissimus, spinalis.'],
      ['Which deep back muscle stabilises individual spinal segments?', 'Multifidus.'],
      ['Where does quadratus lumborum insert?', 'The 12th rib and the transverse processes of L1–L4.'],
      ['Which exercise targets the QL by resisting side bending?', 'The suitcase carry (or side plank).'],
    ],
  }),

  muscleTopic({
    id: 'diaphragm-pelvic-floor', group: G, title: 'Diaphragm & pelvic floor', summary: 'The top and bottom of the "core canister"',
    intro: '<p>Think of the core as a canister: the diaphragm is the lid, the pelvic floor the base, transversus abdominis and the obliques the walls, and multifidus the back. They work together to control pressure inside the trunk.</p>',
    muscles: [
      {
        name: 'Diaphragm',
        origin: 'Xiphoid process, inner surfaces of the lower six ribs and costal cartilages, and the bodies of L1–L3 (via the crura).',
        insertion: 'Central tendon (the top of the dome).',
        action: 'The main muscle of breathing in: it contracts and flattens, enlarging the chest cavity. Also raises intra-abdominal pressure for bracing.',
        short: 'Inspiration',
        train: 'Breathing drills (360° breathing into the belly, sides and back), bracing practice before lifts.',
        notes: '<ul><li>A client who breathes mainly with the upper chest and neck muscles may struggle to brace. Teach a full breath first.</li><li>Holding the breath under very heavy load (Valsalva) raises blood pressure sharply: avoid it for clients with high blood pressure or heart conditions.</li></ul>',
      },
      {
        name: 'Pelvic floor', aka: 'levator ani (puborectalis, pubococcygeus, iliococcygeus) and coccygeus',
        origin: 'Back of the pubic bone, the fascia of the side wall of the pelvis and the ischial spine.',
        insertion: 'Perineal body, anococcygeal ligament and the coccyx.',
        action: 'Supports the pelvic organs, controls continence and works with the diaphragm and deep abdominals to manage pressure.',
        short: 'Supports pelvic organs; continence',
        train: 'Pelvic floor contractions (both quick squeezes and longer holds), coordinated with breathing; then integrated into lifts.',
        notes: '<ul><li>Leaking urine during jumping, running, coughing or heavy lifting is common, but not normal or something to just accept. Refer to a pelvic health physiotherapist.</li><li>Particularly relevant for pregnant and postnatal clients, and during and after menopause. Men have a pelvic floor too, and problems are common after prostate surgery.</li></ul>',
      },
    ],
    qa: [
      ['What is the main muscle of inspiration?', 'The diaphragm.'],
      ['Where does the diaphragm insert?', 'Into its own central tendon.'],
      ['A client leaks urine when jumping. What should you do?', 'Adapt the exercise for now and recommend a pelvic health physiotherapist.'],
    ],
  }),
];
