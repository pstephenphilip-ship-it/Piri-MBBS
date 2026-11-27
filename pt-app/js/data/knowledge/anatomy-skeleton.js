// Anatomy — foundations and the skeletal system.
import { table, callout, quiz, ex, kb } from './_helpers.js';
import { PLANES, PLANES_AXES } from './diagrams/joints.js';
import { SKELETON } from './diagrams/skeleton.js';
import { LONG_BONE, BONE_SHAPES, REMODELLING, BONE_MASS } from './diagrams/bones.js';
import { SKULL, THORACIC_CAGE, SPINE_LATERAL, VERTEBRA } from './diagrams/axial.js';
import { SCAPULA_HUMERUS, HAND, PELVIS, LEG_BONES, FOOT } from './diagrams/limbs.js';

export const FOUNDATIONS = [
  {
    id: 'terminology', group: 'Foundations', title: 'Anatomical terminology',
    summary: 'Anatomical position, directional terms, body positions',
    body: `
<p>Anatomy has its own language so that everyone describes the body the same way, whatever position the person is in. Learn these terms early: every later topic uses them.</p>

<h3>The anatomical position</h3>
<p>All terms refer to the body in the <strong>anatomical position</strong>: standing upright, facing forward, feet parallel, arms by the sides with <strong>palms facing forward</strong>. Even when a client is lying down, "anterior" still means the front of the body.</p>

<h3>Directional terms</h3>
${table(['Term', 'Meaning', 'Example'], [
  ['Anterior (ventral)', 'Towards the front', 'The sternum is anterior to the heart'],
  ['Posterior (dorsal)', 'Towards the back', 'The spine is posterior to the sternum'],
  ['Superior (cranial)', 'Towards the head / above', 'The head is superior to the shoulders'],
  ['Inferior (caudal)', 'Towards the feet / below', 'The knee is inferior to the hip'],
  ['Medial', 'Towards the midline', 'The big toe is on the medial side of the foot'],
  ['Lateral', 'Away from the midline', 'The fibula is lateral to the tibia'],
  ['Proximal', 'Closer to the trunk or point of attachment (limbs)', 'The elbow is proximal to the wrist'],
  ['Distal', 'Further from the trunk or point of attachment (limbs)', 'The fingers are distal to the wrist'],
  ['Superficial', 'Closer to the surface', 'Skin is superficial to muscle'],
  ['Deep', 'Further from the surface', 'Transversus abdominis is deep to rectus abdominis'],
  ['Ipsilateral', 'Same side of the body', 'Right arm and right leg'],
  ['Contralateral', 'Opposite side of the body', 'Right arm and left leg (as in walking)'],
  ['Unilateral / bilateral', 'One side / both sides', 'A single-leg squat is unilateral'],
])}

<h3>Body positions</h3>
<ul>
  <li><strong>Supine</strong>: lying face up (think "on your spine"), e.g. glute bridge, dead bug.</li>
  <li><strong>Prone</strong>: lying face down, e.g. prone Y-raise, plank start position.</li>
  <li><strong>Side-lying</strong>: on one side, e.g. side plank, clamshell.</li>
</ul>

<h3>Regions of the body</h3>
<p>Some regional terms you'll see in exercise and medical notes: <strong>cervical</strong> (neck), <strong>thoracic</strong> (chest/upper back), <strong>lumbar</strong> (lower back), <strong>pelvic</strong>, <strong>brachial</strong> (upper arm), <strong>antebrachial</strong> (forearm), <strong>femoral</strong> (thigh), <strong>crural</strong> (lower leg), <strong>plantar</strong> (sole of the foot), <strong>palmar</strong> (palm).</p>

<h3>Origin and insertion</h3>
<p>A muscle's <strong>origin</strong> is its usually proximal, more stable attachment; its <strong>insertion</strong> is the usually distal attachment that moves when the muscle contracts. In closed-chain exercises (feet or hands fixed, e.g. a squat or push-up) the "insertion" end can be the fixed one and the origin moves instead.</p>

${callout('pt', 'Trainer application', '<p>Using precise terms in your notes ("anterior knee pain on descent", "medial knee collapse") makes them useful to a physio or GP if you need to refer a client, and builds professional credibility.</p>')}

${quiz([
  ['A client is lying face down. What is this position called?', 'Prone.'],
  ['Is the wrist proximal or distal to the elbow?', 'Distal: it is further from the trunk.'],
  ['In the anatomical position, which way do the palms face?', 'Forward (anteriorly).'],
  ['What does "contralateral" mean? Give an exercise example.', 'The opposite side of the body. In a bird-dog you extend the contralateral arm and leg (e.g. right arm with left leg).'],
])}`,
  },
  {
    id: 'planes-axes', group: 'Foundations', title: 'Planes & axes of movement',
    summary: 'Sagittal, frontal and transverse planes',
    body: `
<p>All human movement can be described in three planes. Each plane has an axis running at right angles to it, which the joint rotates around.</p>
${table(['Plane', 'Divides body into', 'Axis', 'Main movements', 'Exercise examples'], [
  ['<strong>Sagittal</strong>', 'Left and right', 'Frontal (medio-lateral)', 'Flexion, extension, dorsiflexion, plantarflexion', 'Squat, deadlift, biceps curl, running, forward lunge'],
  ['<strong>Frontal (coronal)</strong>', 'Front and back', 'Sagittal (antero-posterior)', 'Abduction, adduction, lateral flexion, inversion, eversion', 'Lateral raise, side lunge, jumping jack, side bend'],
  ['<strong>Transverse (horizontal)</strong>', 'Top and bottom', 'Longitudinal (vertical)', 'Rotation, horizontal ab/adduction, pronation, supination', 'Woodchop, Russian twist, cable fly, golf swing'],
])}
${PLANES}
<p>Real movements usually combine planes. A tennis serve or a throw is <strong>multiplanar</strong>.</p>
${PLANES_AXES}
${callout('pt', 'Trainer application', '<p>Most gym programmes are heavily sagittal. Including frontal and transverse work (lateral lunges, anti-rotation presses, carries, rotational med-ball throws) builds clients who are more robust for sport and daily life, where movement happens in every direction.</p>')}
${quiz([
  ['Which plane does a lateral raise happen in?', 'The frontal plane (abduction of the shoulder).'],
  ['Which axis does a squat rotate around at the knee?', 'The frontal (medio-lateral) axis. Sagittal-plane movements rotate around the frontal axis.'],
  ['Name one transverse-plane exercise.', 'Examples: cable woodchop, Pallof press (resisting rotation), Russian twist, cable fly.'],
])}`,
  },
];

export const SKELETAL = [
  {
    id: 'skeletal-overview', group: 'Skeletal system', title: 'The skeletal system: overview & functions',
    summary: '206 bones, axial vs appendicular, six functions',
    body: `
<p>The adult skeleton has <strong>206 bones</strong>. A newborn has around 270–300, many of which fuse during childhood and adolescence (for example the bones of the skull, sacrum and pelvis). The number varies slightly between people because of extra sesamoid bones or small sutural bones in the skull.</p>

<h3>Functions of the skeleton</h3>
${table(['Function', 'What it means', 'Example'], [
  ['<strong>Support</strong>', 'Provides a rigid framework that holds the body up and gives it shape', 'Vertebral column and lower limbs carry body weight'],
  ['<strong>Protection</strong>', 'Surrounds and shields vital organs', 'Skull (brain), rib cage (heart, lungs), vertebrae (spinal cord), pelvis (reproductive organs)'],
  ['<strong>Movement</strong>', 'Bones act as levers; muscles pull on them via tendons across joints', 'Quadriceps pull on the tibia to extend the knee'],
  ['<strong>Mineral storage</strong>', 'Stores about 99% of the body\'s calcium and most of its phosphate, releasing them into the blood when needed', 'Calcium is needed for muscle contraction and nerve signals'],
  ['<strong>Blood cell production</strong>', 'Red bone marrow makes red cells, white cells and platelets (haematopoiesis)', 'In adults: mainly the pelvis, sternum, ribs, vertebrae, skull and the ends of the femur and humerus'],
  ['<strong>Energy storage</strong>', 'Yellow bone marrow stores fat', 'Medullary cavity of long bones in adults'],
])}
<p>Bone also acts as an endocrine organ: bone cells release hormones (such as osteocalcin and FGF23) involved in blood sugar and phosphate regulation.</p>

<h3>The two divisions</h3>
${table(['Division', 'Bones', 'Main role'], [
  ['<strong>Axial skeleton</strong> (80 bones)', 'Skull (22), middle-ear ossicles (6), hyoid (1), vertebral column (26), thoracic cage: sternum + 24 ribs (25)', 'Forms the central axis: protects the brain, spinal cord and thoracic organs and supports the trunk'],
  ['<strong>Appendicular skeleton</strong> (126 bones)', 'Pectoral (shoulder) girdles (4), upper limbs (60), pelvic girdle (2), lower limbs (60)', 'Attaches the limbs to the axial skeleton and allows movement and manipulation'],
])}
${SKELETON}
<p>See ${kb('anatomy', 'axial-skeleton', 'the axial skeleton')}, ${kb('anatomy', 'vertebral-column', 'the vertebral column')}, ${kb('anatomy', 'upper-limb-bones', 'upper limb bones')} and ${kb('anatomy', 'lower-limb-bones', 'pelvis & lower limb bones')} for the detail.</p>

${callout('key', 'Key facts', '<ul><li>206 bones in the adult: 80 axial + 126 appendicular.</li><li>Bone is living tissue: it has a blood supply and nerves, and is constantly broken down and rebuilt.</li><li>About half the bones in the body are in the hands and feet (54 in the hands, 52 in the feet).</li></ul>')}

${quiz([
  ['List the six functions of the skeleton.', 'Support, protection, movement, mineral storage, blood cell production, energy (fat) storage.'],
  ['How many bones are in the axial and appendicular skeletons?', 'Axial 80, appendicular 126 (total 206).'],
  ['Where is red bone marrow mainly found in adults?', 'In flat and irregular bones (pelvis, sternum, ribs, vertebrae, skull) and the proximal ends of the femur and humerus.'],
  ['Which division does the scapula belong to?', 'The appendicular skeleton (it is part of the pectoral girdle).'],
])}`,
  },
  {
    id: 'bone-structure', group: 'Skeletal system', title: 'Bone structure & classification',
    summary: 'Five bone shapes, parts of a long bone, bone cells',
    body: `
<h3>Classification by shape</h3>
${table(['Type', 'Description', 'Examples', 'Main role'], [
  ['<strong>Long</strong>', 'Longer than they are wide; a shaft with two ends', 'Femur, humerus, tibia, radius, metacarpals, phalanges', 'Levers for movement'],
  ['<strong>Short</strong>', 'Roughly cube-shaped', 'Carpals (wrist), tarsals (ankle)', 'Stability and some gliding movement; spread load'],
  ['<strong>Flat</strong>', 'Thin, flattened, often curved', 'Sternum, ribs, scapula, cranial bones, ilium', 'Protection and broad areas for muscle attachment'],
  ['<strong>Irregular</strong>', 'Complex shapes that don\'t fit other groups', 'Vertebrae, sacrum, facial bones', 'Varied: protection, support, attachment'],
  ['<strong>Sesamoid</strong>', 'Small bones that develop inside a tendon', 'Patella (largest), pisiform, two under the big toe', 'Protect the tendon and improve its leverage'],
])}
${BONE_SHAPES}
${callout('pt', 'Why the patella matters', '<p>The patella holds the quadriceps tendon further from the knee\'s axis of rotation, increasing the quads\' leverage (moment arm). That is why it is called a sesamoid "pulley".</p>')}

<h3>Parts of a long bone</h3>
<ul>
  <li><strong>Diaphysis</strong>: the shaft. A thick tube of compact bone around a hollow <strong>medullary cavity</strong> containing yellow marrow.</li>
  <li><strong>Epiphyses</strong>: the two ends (proximal and distal). Spongy bone inside, filled with red marrow, with a thin shell of compact bone.</li>
  <li><strong>Metaphysis</strong>: the region where shaft meets end. In children it contains the <strong>epiphyseal (growth) plate</strong>, a layer of hyaline cartilage where lengthening happens. In adults it becomes the <strong>epiphyseal line</strong>.</li>
  <li><strong>Articular cartilage</strong>: smooth hyaline cartilage covering joint surfaces. It reduces friction and absorbs shock. It has no blood supply.</li>
  <li><strong>Periosteum</strong>: a tough two-layered membrane covering the outside (except at joint surfaces). The outer fibrous layer anchors tendons and ligaments (via Sharpey's fibres); the inner layer contains bone-forming cells. It is rich in nerves and blood vessels, which is why bone bruises and fractures hurt.</li>
  <li><strong>Endosteum</strong>: a thin membrane lining the medullary cavity.</li>
  <li><strong>Nutrient foramen</strong>: a small hole where the main artery enters the bone.</li>
</ul>

${LONG_BONE}
<h3>Compact vs spongy bone</h3>
${table(['', 'Compact (cortical)', 'Spongy (cancellous / trabecular)'], [
  ['Where', 'Outer layer of all bones; thick in the shaft of long bones', 'Inside the ends of long bones and inside flat, short and irregular bones'],
  ['Structure', 'Dense, organised into cylinders called <strong>osteons</strong> (Haversian systems) around central canals carrying vessels and nerves', 'A lattice of thin struts (<strong>trabeculae</strong>) aligned along lines of stress; spaces filled with red marrow'],
  ['Share of skeleton', 'About 80% of bone mass', 'About 20% of bone mass but much greater surface area'],
  ['Role', 'Strength against bending and twisting', 'Light but strong; absorbs load; houses marrow; remodels faster'],
])}
<p>Because spongy bone has a large surface area and turns over quickly, it is affected first by bone loss. This is why osteoporotic fractures are most common in the vertebrae, wrist and hip, which are all rich in spongy bone.</p>

<h3>What bone is made of</h3>
<ul>
  <li><strong>Mineral</strong> (about 60–70% by weight), mostly calcium phosphate in the form of hydroxyapatite. Gives hardness and resistance to compression.</li>
  <li><strong>Organic matrix</strong> (about 20–30%), mainly type I collagen. Gives flexibility and resistance to tension. Without collagen bone would shatter like chalk; without mineral it would bend like rubber.</li>
  <li><strong>Water</strong> (about 10%).</li>
</ul>

<h3>Bone cells</h3>
${table(['Cell', 'Job', 'Memory aid'], [
  ['<strong>Osteoblasts</strong>', 'Build new bone by laying down collagen matrix, which then mineralises', 'B for <strong>b</strong>uild'],
  ['<strong>Osteoclasts</strong>', 'Large cells that break down (resorb) bone, releasing calcium', 'C for <strong>c</strong>hew / <strong>c</strong>lear'],
  ['<strong>Osteocytes</strong>', 'Mature osteoblasts trapped in the matrix. They sense mechanical strain and signal where bone should be added or removed', 'The "strain gauges" of bone'],
  ['<strong>Osteoprogenitor cells</strong>', 'Stem cells that become osteoblasts', ''],
])}

${quiz([
  ['What type of bone is the patella and why does it matter?', 'A sesamoid bone. It sits in the quadriceps tendon and increases the quads\' leverage at the knee.'],
  ['Which cells break down bone and which build it?', 'Osteoclasts break it down; osteoblasts build it.'],
  ['Where is the growth plate and what is it made of?', 'In the metaphysis, between the shaft and the end of a long bone. It is hyaline cartilage.'],
  ['Why are the wrist, spine and hip common sites for osteoporotic fractures?', 'They are rich in spongy (trabecular) bone, which has a high turnover and loses density first.'],
  ['What does collagen contribute to bone?', 'Flexibility and tensile strength, so bone can bend slightly without breaking.'],
])}`,
  },
  {
    id: 'bone-remodelling', group: 'Skeletal system', title: 'Bone growth, remodelling & exercise',
    summary: 'Ossification, peak bone mass, Wolff\'s law, loading for bone',
    body: `
<h3>How bones form and grow</h3>
<ul>
  <li><strong>Endochondral ossification</strong>: most bones start as a hyaline cartilage model that is gradually replaced by bone. Long bones grow in length at the epiphyseal plates.</li>
  <li><strong>Intramembranous ossification</strong>: bone forms directly from membrane-like tissue. This makes the flat bones of the skull, parts of the jaw and much of the clavicle.</li>
  <li>Bones grow in <strong>width</strong> throughout life by adding bone under the periosteum (appositional growth).</li>
  <li>Growth plates close (fuse) typically between the mid-teens and early twenties, earlier in girls than boys. After that, bones can't get longer.</li>
</ul>
${callout('pt', 'Training young people', '<p>Supervised resistance training is safe and beneficial for children and adolescents. Position statements from bodies such as the UK Strength and Conditioning Association and the NSCA support it. Growth-plate injuries are linked to poor technique, excessive loads and lack of supervision, not to resistance training itself. Focus on technique, gradual progression and variety.</p>')}

<h3>Remodelling: bone is always changing</h3>
<p>Throughout life, osteoclasts remove old bone and osteoblasts replace it. Roughly 10% of the adult skeleton is replaced each year. Remodelling repairs micro-damage, adapts bone to the loads placed on it and releases calcium into the blood.</p>
<ul>
  <li>When building exceeds breakdown, bone density increases (childhood, adolescence, effective training).</li>
  <li>When breakdown exceeds building, density falls (ageing, menopause, inactivity, bed rest, spaceflight, low energy availability, some medications such as long-term steroids).</li>
</ul>

${REMODELLING}
<h3>Peak bone mass</h3>
<p>Bone mass rises through childhood and especially adolescence (around a quarter of adult bone is laid down in the two years around the growth spurt), and peaks around the late twenties to about 30. From about the age of 40 it slowly declines. Women lose bone faster for several years after menopause because oestrogen, which restrains osteoclasts, falls sharply.</p>
<p>The higher the peak, the longer it takes for bone to fall to fracture-risk levels later. Active, well-fed adolescents bank bone for life.</p>

${BONE_MASS}
<h3>Wolff's law and the mechanostat</h3>
<p><strong>Wolff's law</strong>: bone adapts to the loads placed upon it. Osteocytes sense the tiny deformation (strain) caused by loading. If strain stays above a threshold, bone is added; if loading is too low, bone is removed. Tennis players' racket arms have measurably thicker bone than their other arms.</p>

<h3>What kind of exercise builds bone?</h3>
${table(['Most effective (osteogenic)', 'Less effective for bone'], [
  ['<strong>High magnitude</strong>: heavy-ish resistance training', 'Low loads lifted many times'],
  ['<strong>High rate</strong>: impact and jumping (hops, skipping, jumping, sprinting)', 'Slow, smooth, steady activities'],
  ['<strong>Unusual directions</strong>: varied, multidirectional loading (sports, agility)', 'Repetitive, same-direction loading'],
  ['<strong>Short bouts with rest</strong>: bone responds to the first few loading cycles; rest between bouts restores sensitivity', 'Long continuous sessions'],
  ['Weight-bearing: running, racket sports, stair climbing', 'Non-weight-bearing: swimming and cycling (great for fitness, but do little for bone)'],
])}
<p>Bone needs to be loaded through the specific site you want to strengthen. Squats and deadlifts load the hip and spine; push-ups and hand-supported work load the wrist.</p>
${callout('pt', 'Trainer application', `<ul>
<li>For clients wanting to protect bone: combine progressive resistance training (working towards challenging loads with good technique) with some impact appropriate to their level, 2–3 times a week.</li>
<li>Research such as the LIFTMOR trial (2018) found that supervised, progressive heavy resistance and impact training (deadlifts, squats, overhead press, jumping chin-ups) improved bone density in post-menopausal women with low bone mass, without injury.</li>
<li>Swimmers and cyclists benefit from adding resistance training and some impact for bone health.</li>
<li>Good nutrition matters: enough total energy, calcium, vitamin D and protein.</li>
</ul>`)}
${callout('warn', 'Low energy availability', '<p>Under-eating relative to training (Relative Energy Deficiency in Sport, RED-S) disrupts hormones, including oestrogen and testosterone, and leads to bone loss and stress fractures, even in very active people. Warning signs include missed or absent periods, frequent injuries, persistent fatigue and rapid weight loss. Refer to a GP or sports medicine doctor.</p>')}

${quiz([
  ['What is Wolff\'s law?', 'Bone adapts to the loads placed on it: it becomes stronger where it is loaded and weaker where it isn\'t.'],
  ['At roughly what age does peak bone mass occur?', 'Around the late twenties to about 30.'],
  ['Why do women lose bone faster after menopause?', 'Oestrogen falls. Oestrogen normally restrains osteoclast activity, so bone breakdown speeds up.'],
  ['A client only swims. What would you add for bone health and why?', 'Progressive resistance training and some impact (e.g. hops, skipping). Swimming is non-weight-bearing and provides little bone-building strain.'],
  ['Which cells sense mechanical load in bone?', 'Osteocytes.'],
])}`,
  },
  {
    id: 'axial-skeleton', group: 'Skeletal system', title: 'The axial skeleton',
    summary: 'Skull, hyoid, thoracic cage, ribs and sternum',
    body: `
<p>The axial skeleton (80 bones) forms the body's central axis. For trainers, the most important parts are the vertebral column (see ${kb('anatomy', 'vertebral-column', 'its own topic')}) and the thoracic cage, which affect posture, breathing and bracing.</p>

<h3>Skull (22 bones)</h3>
<ul>
  <li><strong>Cranium (8)</strong>: frontal, 2 parietal, 2 temporal, occipital, sphenoid, ethmoid. Joined by immovable fibrous joints called sutures.</li>
  <li><strong>Facial bones (14)</strong>: including the mandible (the only movable skull bone, at the temporomandibular joint), maxillae, zygomatic (cheek) and nasal bones.</li>
  <li>The <strong>occipital bone</strong> sits on the first cervical vertebra (atlas). Its large hole, the foramen magnum, is where the spinal cord passes through.</li>
  <li>The <strong>mastoid process</strong> of the temporal bone (the bump behind the ear) is the attachment for sternocleidomastoid.</li>
</ul>
<p>Also part of the axial skeleton: the 6 <strong>auditory ossicles</strong> (malleus, incus and stapes in each ear) and the <strong>hyoid</strong> bone in the neck, the only bone that doesn't form a joint with another bone. It anchors the tongue and swallowing muscles.</p>

${SKULL}
<h3>Thoracic cage (25 bones)</h3>
<p>The rib cage protects the heart and lungs, supports the shoulder girdle and moves with every breath.</p>
<ul>
  <li><strong>Sternum</strong> (breastbone): three parts: <strong>manubrium</strong> (top, joins the clavicles and first ribs), <strong>body</strong>, and the small <strong>xiphoid process</strong> at the bottom. The xiphoid is a landmark for hand position in CPR (compress on the lower half of the sternum, above the xiphoid).</li>
  <li><strong>12 pairs of ribs</strong>, all joining the thoracic vertebrae at the back:
    ${table(['Ribs', 'Name', 'Front attachment'], [
      ['1–7', '<strong>True ribs</strong>', 'Directly to the sternum by their own costal cartilage'],
      ['8–10', '<strong>False ribs</strong>', 'Indirectly, joining the costal cartilage of the rib above'],
      ['11–12', '<strong>Floating ribs</strong>', 'None: they end in the muscles of the abdominal wall'],
    ])}
  </li>
  <li><strong>Costal cartilage</strong> (hyaline) lets the cage expand during breathing.</li>
</ul>

${THORACIC_CAGE}
<h3>The rib cage and breathing</h3>
<p>When the diaphragm contracts and flattens, and the external intercostals lift the ribs, the chest expands up and out (often described as a "pump handle" movement for the upper ribs and a "bucket handle" movement for the lower ribs). This lowers pressure in the lungs and air flows in.</p>
${callout('pt', 'Trainer application', `<ul>
<li><strong>Bracing</strong>: a breath into the belly and sides (360° expansion) followed by tensing the trunk raises intra-abdominal pressure, stiffening the spine for heavy lifts. Clients who only breathe into the upper chest often struggle to brace.</li>
<li><strong>Rib position</strong>: "ribs down" or "rib cage stacked over the pelvis" is a common cue to reduce excessive lumbar extension in overhead pressing and planks.</li>
<li>Thoracic mobility (rotation and extension) depends partly on rib cage mobility. Stiff ribs and thoracic spine often push movement into the neck and lower back.</li>
</ul>`)}
${callout('warn', 'Rib injuries', '<p>Rib pain after a fall or impact, especially with pain on breathing in, may mean a fracture. Stop training and refer to a doctor; seek urgent help for breathlessness.</p>')}

${quiz([
  ['Name the three parts of the sternum.', 'Manubrium, body, xiphoid process.'],
  ['What are the differences between true, false and floating ribs?', 'True ribs (1–7) attach directly to the sternum; false ribs (8–10) attach indirectly via the cartilage of the rib above; floating ribs (11–12) do not attach at the front.'],
  ['What type of joint joins the cranial bones?', 'Sutures: immovable fibrous joints.'],
  ['Which bone does not articulate with any other bone?', 'The hyoid.'],
])}`,
  },
  {
    id: 'vertebral-column', group: 'Skeletal system', title: 'The vertebral column (spine)',
    summary: 'Regions, curves, vertebra structure, discs, posture',
    body: `
<p>The spine is a flexible column of 33 vertebrae in childhood that become <strong>26 bones in adults</strong> as the sacral and coccygeal vertebrae fuse. It supports the head and trunk, protects the spinal cord, allows movement and transfers load between the upper and lower body.</p>

<h3>Regions</h3>
${table(['Region', 'Vertebrae', 'Key features', 'Movement favoured'], [
  ['<strong>Cervical</strong> (neck)', '7 (C1–C7)', 'Smallest; holes in the transverse processes for the vertebral arteries. C1 (atlas) has no body; C2 (axis) has the dens (odontoid peg). C7 (vertebra prominens) has the long spinous process you can feel at the base of the neck', 'The most mobile region: flexion, extension, rotation, side bending'],
  ['<strong>Thoracic</strong> (upper back)', '12 (T1–T12)', 'Medium size; facets for the ribs; long, downward-pointing spinous processes', 'Rotation; flexion and extension limited by the ribs'],
  ['<strong>Lumbar</strong> (lower back)', '5 (L1–L5)', 'Largest, thickest bodies to carry the most weight; short, blunt spinous processes', 'Flexion and extension; very little rotation (roughly 1–2° per level)'],
  ['<strong>Sacrum</strong>', '5 fused into 1', 'Triangular; forms the back of the pelvis and joins the hip bones at the sacroiliac joints', 'Small nutation / counter-nutation movements only'],
  ['<strong>Coccyx</strong> (tailbone)', '3–5 fused into 1', 'Attachment for pelvic floor muscles and ligaments', 'Minimal'],
])}
${callout('key', 'Memory aid', '<p>Breakfast at 7, lunch at 12, dinner at 5: 7 cervical, 12 thoracic, 5 lumbar.</p>')}
<p>The two top vertebrae form special joints: the <strong>atlanto-occipital</strong> joint (skull on C1) allows the "yes" nod; the <strong>atlanto-axial</strong> joint (C1 rotating around the dens of C2) is a pivot joint allowing about half of all neck rotation, the "no" movement.</p>

${SPINE_LATERAL}
<h3>Structure of a typical vertebra</h3>
<ul>
  <li><strong>Body</strong>: the thick, weight-bearing front section.</li>
  <li><strong>Vertebral arch</strong>: the ring behind the body, made of pedicles and laminae. Together with the body it surrounds the <strong>vertebral foramen</strong>; stacked foramina form the canal holding the spinal cord.</li>
  <li><strong>Spinous process</strong>: points backwards; the bumps you can feel down someone's back. Muscle and ligament attachment.</li>
  <li><strong>Transverse processes</strong>: one each side; muscle attachment (and, in the thoracic spine, rib attachment).</li>
  <li><strong>Articular processes and facets</strong>: form the <strong>facet (zygapophyseal) joints</strong> with the vertebra above and below. These are small synovial joints whose orientation decides which movements each region favours.</li>
  <li><strong>Intervertebral foramina</strong>: gaps between neighbouring vertebrae where spinal nerves exit.</li>
</ul>

<h3>Intervertebral discs</h3>
<p>There are 23 discs, from C2/C3 down to L5/S1 (there is no disc between the skull and C1, or between C1 and C2). Each disc is a fibrocartilage joint (symphysis) with two parts:</p>
<ul>
  <li><strong>Annulus fibrosus</strong>: tough outer rings of fibrocartilage with fibres in alternating directions, like plywood. Resists twisting and contains the nucleus.</li>
  <li><strong>Nucleus pulposus</strong>: a gel-like, water-rich centre that spreads compressive load.</li>
</ul>
<p>Discs make up about a quarter of the spine's length. They have very little blood supply and are nourished by fluid moving in and out with loading and unloading, which is one reason regular movement is good for spinal health. Discs lose some water overnight under load and rehydrate lying down, so people are slightly taller in the morning.</p>
<p>A <strong>disc herniation</strong> (often called a "slipped disc", although discs don't slip) is when nucleus material pushes through a weakened annulus, most often towards the back and side at L4/L5 or L5/S1. It can press on a nerve root and cause leg pain (sciatica). Many disc bulges seen on scans cause no symptoms at all and they often improve with time.</p>

${VERTEBRA}
<h3>Ligaments of the spine</h3>
${table(['Ligament', 'Where', 'Role'], [
  ['<strong>Anterior longitudinal ligament (ALL)</strong>', 'Down the front of the vertebral bodies and discs, from the skull to the sacrum', 'Limits extension (backward bending)'],
  ['<strong>Posterior longitudinal ligament (PLL)</strong>', 'Down the back of the vertebral bodies, inside the spinal canal', 'Limits flexion; helps contain the discs'],
  ['<strong>Ligamentum flavum</strong>', 'Between the laminae of neighbouring vertebrae', 'Elastic (yellow) ligament; helps the spine return upright from flexion and protects the cord'],
  ['<strong>Interspinous ligaments</strong>', 'Between neighbouring spinous processes', 'Limit flexion'],
  ['<strong>Supraspinous ligament</strong>', 'Along the tips of the spinous processes (in the neck it becomes the ligamentum nuchae)', 'Limits flexion'],
])}

<h3>The spinal curves</h3>
${table(['Curve', 'Direction', 'Type'], [
  ['Cervical', '<strong>Lordosis</strong> (curves forwards, concave at the back)', 'Secondary: develops as a baby starts to hold up its head'],
  ['Thoracic', '<strong>Kyphosis</strong> (curves backwards, convex at the back)', 'Primary: present at birth'],
  ['Lumbar', '<strong>Lordosis</strong>', 'Secondary: develops as a child begins to stand and walk'],
  ['Sacral', '<strong>Kyphosis</strong>', 'Primary'],
])}
<p>The S-shaped curves act like a spring, absorbing shock and balancing the head over the pelvis. A <strong>neutral spine</strong> is the position where these natural curves are present without exaggeration. It is the strongest position for resisting heavy loads.</p>

<h3>Postural variations</h3>
${table(['Posture', 'Description', 'Often associated with'], [
  ['<strong>Hyperkyphosis</strong>', 'Increased rounding of the thoracic spine', 'Prolonged sitting, forward head posture, ageing, osteoporotic vertebral fractures'],
  ['<strong>Hyperlordosis</strong>', 'Increased lumbar curve, usually with anterior pelvic tilt', 'Pregnancy, high abdominal mass, habitual standing posture'],
  ['<strong>Flat back</strong>', 'Reduced lumbar curve, posterior pelvic tilt', 'Long periods of slumped sitting'],
  ['<strong>Sway back</strong>', 'Hips pushed forward of the ankles, upper back leaning back', 'Habitual relaxed standing'],
  ['<strong>Scoliosis</strong>', 'A sideways (lateral) curve of the spine with rotation of the vertebrae', 'Mostly idiopathic (no known cause), commonly appearing in adolescence'],
])}
<p>Posture varies a lot between healthy people and is only weakly linked to pain. Treat posture as one piece of information, not a diagnosis, and avoid telling clients their posture is "bad" or "damaged".</p>
${callout('pt', 'Trainer application', `<ul>
<li>Teach clients to find and hold a <strong>neutral spine</strong> under heavy load (e.g. ${ex('rdl', 'Romanian deadlift')}, ${ex('back-squat', 'back squat')}). Some spinal flexion during everyday and light tasks is normal and safe.</li>
<li>The thoracic spine is built for rotation; the lumbar spine is not. In rotational exercises, aim to rotate through the hips and thoracic spine while keeping the lower back stable.</li>
<li>Core exercises that resist movement (${ex('plank', 'plank')}, ${ex('dead-bug', 'dead bug')}, ${ex('farmer-carry', 'carries')}) train the trunk to stabilise the spine.</li>
<li>For clients with osteoporosis of the spine, avoid loaded or repeated end-range flexion and twisting (e.g. weighted sit-ups, toe-touches with load), and favour extension-based and neutral-spine strengthening.</li>
</ul>`)}
${callout('warn', 'Red flags: refer urgently', '<p>Back pain with any of: numbness in the saddle area (between the legs), new difficulty passing urine or controlling bladder or bowels, weakness in both legs, unexplained weight loss, fever, a history of cancer, or severe night pain. These can signal cauda equina syndrome or other serious conditions. Stop and advise same-day medical assessment (A&amp;E for cauda equina symptoms).</p>')}

${quiz([
  ['How many vertebrae are in each region?', 'Cervical 7, thoracic 12, lumbar 5, sacrum 5 fused, coccyx 3–5 fused.'],
  ['Which region is best suited to rotation and why is the lumbar spine not?', 'The thoracic spine. The lumbar facet joints face mostly sideways (in the sagittal plane), which blocks rotation and allows flexion and extension.'],
  ['What are the two parts of an intervertebral disc?', 'The annulus fibrosus (outer fibrous rings) and the nucleus pulposus (gel-like centre).'],
  ['Which curves are primary and which are secondary?', 'Primary (present at birth): thoracic and sacral kyphoses. Secondary: cervical and lumbar lordoses.'],
  ['Which joint allows the "no" head movement?', 'The atlanto-axial joint (C1 pivoting around the dens of C2).'],
  ['A client with back pain mentions numbness between their legs. What do you do?', 'Stop the session and advise immediate medical assessment (A&E): this is a red flag for cauda equina syndrome.'],
])}`,
  },
  {
    id: 'upper-limb-bones', group: 'Skeletal system', title: 'Shoulder girdle & upper limb bones',
    summary: 'Clavicle, scapula, humerus, radius, ulna, hand',
    body: `
<p>Each upper limb and its girdle has 32 bones: the clavicle and scapula (the <strong>pectoral or shoulder girdle</strong>) and 30 bones in the arm, forearm and hand.</p>

<h3>Pectoral (shoulder) girdle</h3>
<p><strong>Clavicle (collarbone)</strong>: an S-shaped strut connecting the arm to the trunk. It is the <em>only</em> bony connection between the upper limb and the axial skeleton, at the sternoclavicular joint. Its lateral end meets the scapula at the acromioclavicular (AC) joint. It is one of the most commonly fractured bones, usually from falling onto the shoulder or an outstretched hand.</p>
<p><strong>Scapula (shoulder blade)</strong>: a triangular flat bone that floats on the back of the rib cage, held only by muscles. Key landmarks:</p>
${table(['Landmark', 'Where / what', 'Why it matters'], [
  ['<strong>Glenoid fossa (cavity)</strong>', 'Shallow socket on the lateral side', 'Forms the shoulder (glenohumeral) joint with the humeral head'],
  ['<strong>Acromion</strong>', 'The bony "point of the shoulder"', 'Joins the clavicle (AC joint); the space below it is where the supraspinatus tendon runs'],
  ['<strong>Coracoid process</strong>', 'Hook-like projection at the front', 'Attachment for pec minor, short head of biceps and coracobrachialis'],
  ['<strong>Spine of the scapula</strong>', 'Ridge across the back', 'Attachment for trapezius and posterior deltoid'],
  ['<strong>Supraspinous / infraspinous fossae</strong>', 'Hollows above and below the spine', 'Origins of supraspinatus and infraspinatus (rotator cuff)'],
  ['<strong>Medial (vertebral) border</strong>', 'Edge nearest the spine', 'Attachment for rhomboids and serratus anterior'],
  ['<strong>Inferior angle</strong>', 'Lowest point', 'Useful for observing scapular movement; "winging" shows here'],
])}

<h3>Arm</h3>
<p><strong>Humerus</strong>: the upper arm bone.</p>
<ul>
  <li><strong>Head</strong>: the ball of the shoulder joint.</li>
  <li><strong>Greater and lesser tubercles</strong>: attachments for the rotator cuff, separated by the <strong>intertubercular (bicipital) groove</strong> which holds the long head of biceps tendon.</li>
  <li><strong>Deltoid tuberosity</strong>: roughened area on the shaft where the deltoid inserts.</li>
  <li><strong>Medial and lateral epicondyles</strong>: bumps either side of the elbow. The medial is the common flexor origin (site of "golfer's elbow"); the lateral is the common extensor origin ("tennis elbow").</li>
  <li><strong>Trochlea and capitulum</strong>: joint surfaces for the ulna and radius at the elbow.</li>
</ul>

${SCAPULA_HUMERUS}
<h3>Forearm</h3>
<ul>
  <li><strong>Radius</strong>: on the <strong>lateral (thumb) side</strong>. Its distal end is wide and forms most of the wrist joint, which is why falls on an outstretched hand often fracture the distal radius. It rotates around the ulna during pronation and supination.</li>
  <li><strong>Ulna</strong>: on the <strong>medial (little finger) side</strong>. Its proximal end, the <strong>olecranon</strong>, is the point of the elbow and the attachment for triceps.</li>
</ul>
${callout('key', 'Memory aid', '<p><strong>R</strong>adius = <strong>r</strong>otates and is on the thumb side. Thumbs up: the radius is the one you can feel turning when you twist your forearm.</p>')}

<h3>Hand (27 bones each)</h3>
<ul>
  <li><strong>Carpals (8)</strong>: two rows of short bones. Proximal row (thumb side first): scaphoid, lunate, triquetrum, pisiform. Distal row: trapezium, trapezoid, capitate, hamate. A memory aid: "<strong>S</strong>ome <strong>L</strong>overs <strong>T</strong>ry <strong>P</strong>ositions <strong>T</strong>hat <strong>T</strong>hey <strong>C</strong>an't <strong>H</strong>andle".</li>
  <li>The <strong>scaphoid</strong> is the most commonly fractured carpal (fall on outstretched hand). Its blood supply is poor, so pain in the anatomical "snuffbox" at the base of the thumb after a fall must be checked by a doctor, even if an early X-ray looks normal.</li>
  <li><strong>Metacarpals (5)</strong>: the palm, numbered 1 (thumb) to 5 (little finger).</li>
  <li><strong>Phalanges (14)</strong>: 3 per finger (proximal, middle, distal) and 2 in the thumb.</li>
</ul>
${HAND}

${callout('pt', 'Trainer application', `<ul>
<li>The scapula needs to move freely for healthy overhead movement. It upwardly rotates as the arm rises (see ${kb('anatomy', 'shoulder-complex', 'the shoulder complex')}).</li>
<li>Because the clavicle is the only bony link to the trunk, the shoulder relies on muscles for stability: train the rotator cuff and scapular muscles (rows, face pulls, push-up plus, carries).</li>
<li>Wrist discomfort in push-ups or front squats is common. Try push-up handles or dumbbells, or adjust the grip, and build up wrist extension mobility gradually.</li>
</ul>`)}

${quiz([
  ['What is the only bony joint linking the upper limb to the axial skeleton?', 'The sternoclavicular joint.'],
  ['Which forearm bone is on the thumb side?', 'The radius.'],
  ['Name the eight carpal bones.', 'Scaphoid, lunate, triquetrum, pisiform, trapezium, trapezoid, capitate, hamate.'],
  ['Why should a client with pain at the base of the thumb after a fall see a doctor?', 'It could be a scaphoid fracture, which can be missed on early X-rays and heal poorly because of the bone\'s poor blood supply.'],
  ['Which humeral landmark is the origin of the wrist extensors?', 'The lateral epicondyle.'],
])}`,
  },
  {
    id: 'lower-limb-bones', group: 'Skeletal system', title: 'Pelvis & lower limb bones',
    summary: 'Pelvic girdle, femur, patella, tibia, fibula, foot',
    body: `
<p>The lower limbs carry body weight, so their bones are larger and stronger than those of the upper limb, and stability is favoured over mobility.</p>

<h3>The pelvic girdle</h3>
<p>Each <strong>hip bone (os coxae)</strong> forms from three bones that fuse in the teenage years at the <strong>acetabulum</strong> (the hip socket):</p>
<ul>
  <li><strong>Ilium</strong>: the large upper "wing". Its top edge is the <strong>iliac crest</strong> (where hands rest on hips). At the front is the <strong>anterior superior iliac spine (ASIS)</strong>; at the back, the <strong>posterior superior iliac spine (PSIS)</strong>, often visible as dimples in the lower back.</li>
  <li><strong>Ischium</strong>: the lower back part. The <strong>ischial tuberosity</strong> is the "sit bone" and the origin of the hamstrings.</li>
  <li><strong>Pubis</strong>: the front part. The two pubic bones meet at the <strong>pubic symphysis</strong>, a cartilaginous joint.</li>
</ul>
<p>The two hip bones and the sacrum form the <strong>pelvis</strong>, joined at the back by the two <strong>sacroiliac (SI) joints</strong>. These are strong, mostly very stable joints with only a few degrees of movement. The pelvis transfers weight from the spine to the legs and protects the pelvic organs.</p>
${PELVIS}
<h3>Male and female pelvis</h3>
<p>On average the female pelvis is wider, shallower and has a larger, rounder inlet to allow childbirth. The wider pelvis increases the <strong>Q-angle</strong> (the angle between the line of the quadriceps pull and the patellar tendon), one of several factors linked to higher rates of some knee injuries in female athletes.</p>
<h3>Pelvic tilt</h3>
<ul>
  <li><strong>Anterior pelvic tilt</strong>: the top of the pelvis tips forward (ASIS moves down and forward), increasing lumbar lordosis.</li>
  <li><strong>Posterior pelvic tilt</strong>: the top tips backward, flattening the lumbar spine. At the bottom of a deep squat this is the "butt wink".</li>
</ul>

<h3>Thigh</h3>
<p><strong>Femur</strong>: the longest, strongest bone in the body (roughly a quarter of a person's height).</p>
<ul>
  <li><strong>Head</strong>: the ball of the hip joint, sitting in the acetabulum.</li>
  <li><strong>Neck</strong>: angled at about 125° to the shaft. It is the most common site of hip fracture in older adults with osteoporosis.</li>
  <li><strong>Greater trochanter</strong>: the bony bump on the outside of the hip; attachment for gluteus medius and minimus. <strong>Lesser trochanter</strong>: attachment for iliopsoas.</li>
  <li><strong>Linea aspera</strong>: a ridge down the back of the shaft; attachment for the adductors and parts of the quadriceps.</li>
  <li><strong>Medial and lateral condyles</strong>: the rounded lower ends that sit on the tibia at the knee.</li>
</ul>
<p><strong>Patella (kneecap)</strong>: the largest sesamoid bone, embedded in the quadriceps tendon. It glides in the trochlear groove of the femur and improves the quadriceps' leverage.</p>

<h3>Lower leg</h3>
<ul>
  <li><strong>Tibia (shin bone)</strong>: the <strong>medial</strong>, weight-bearing bone. The flat <strong>tibial plateau</strong> holds the menisci; the <strong>tibial tuberosity</strong> at the front is where the patellar tendon attaches (site of Osgood-Schlatter pain in growing adolescents). The <strong>medial malleolus</strong> is the inner ankle bump.</li>
  <li><strong>Fibula</strong>: the thin <strong>lateral</strong> bone. It carries little body weight but is important for muscle attachment and ankle stability. Its lower end is the <strong>lateral malleolus</strong>, the outer ankle bump, which sits lower than the medial one.</li>
</ul>

${LEG_BONES}
<h3>Foot (26 bones each)</h3>
<ul>
  <li><strong>Tarsals (7)</strong>: <strong>talus</strong> (sits between the tibia and fibula to form the ankle joint; no muscles attach to it), <strong>calcaneus</strong> (heel bone, the largest tarsal; Achilles tendon attachment), <strong>navicular</strong>, <strong>cuboid</strong> and three <strong>cuneiforms</strong> (medial, intermediate, lateral).</li>
  <li><strong>Metatarsals (5)</strong>: numbered 1 (big toe) to 5. The 2nd and 3rd are common sites of stress fractures in runners and military recruits.</li>
  <li><strong>Phalanges (14)</strong>: 3 per toe, 2 in the big toe (hallux).</li>
  <li>Two small sesamoid bones under the head of the first metatarsal.</li>
</ul>
${FOOT}
<h3>Arches of the foot</h3>
<p>The <strong>medial longitudinal arch</strong> (the highest, on the inside), the <strong>lateral longitudinal arch</strong> and the <strong>transverse arch</strong> (across the midfoot) work like springs. They are supported by the shape of the bones, by ligaments and the plantar fascia, and by muscles. Arches flatten slightly to absorb shock and stiffen to push off.</p>
<p>Foot types vary widely. A low arch ("flat foot") or high arch is not a problem in itself if the person is pain-free and functions well.</p>

${callout('pt', 'Trainer application', `<ul>
<li>Learn to palpate the ASIS, PSIS, iliac crest, greater trochanter and patella: they are reference points for posture observation, measurements and placing equipment such as belts.</li>
<li>Hip hinge exercises (${ex('rdl', 'RDL')}, ${ex('kb-swing', 'kettlebell swing')}) load the hamstrings from their origin on the ischial tuberosity.</li>
<li>For a stable foot in lifting, cue a "tripod foot": weight spread across the heel, the base of the big toe and the base of the little toe.</li>
<li>Persistent, localised bone pain in the shin or foot that worsens with running and feels tender to touch may be a stress fracture: stop impact and refer.</li>
</ul>`)}

${quiz([
  ['Which three bones fuse to form each hip bone, and where do they meet?', 'The ilium, ischium and pubis. They meet at the acetabulum.'],
  ['Where do the hamstrings originate?', 'The ischial tuberosity (sit bone).'],
  ['Which lower-leg bone carries most of the body\'s weight?', 'The tibia.'],
  ['Which tarsal bone forms the ankle joint with the tibia and fibula?', 'The talus.'],
  ['What is anterior pelvic tilt?', 'The top of the pelvis tips forward, increasing the curve of the lower back.'],
  ['Name the three arches of the foot.', 'Medial longitudinal, lateral longitudinal and transverse.'],
])}`,
  },
];
