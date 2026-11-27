// Anatomy — muscle tissue, fibre types, muscle actions and the life course.
// Syllabus follows the Level 3 Diploma (Unit 1); written in our own words.
import { table, callout, quiz, ex, kb } from './_helpers.js';

const G = 'Muscular system';

export const MUSCLE_TISSUE = [
  {
    id: 'muscle-tissue', group: G, title: 'Muscle tissue & structure',
    summary: 'Three muscle types, four properties, structure, sliding filament theory',
    body: `
<h3>Three types of muscle tissue</h3>
${table(['Type', 'Where', 'Control', 'Notes'], [
  ['<strong>Skeletal</strong>', 'Attached to bones by tendons', '<strong>Voluntary</strong> (somatic nervous system)', 'Striped (striated). Produces movement, holds posture, stabilises joints, generates heat'],
  ['<strong>Cardiac</strong> (myocardium)', 'Heart wall only', '<strong>Involuntary</strong>; rhythm set by the sinoatrial (SA) node', 'Striated, branched cells; highly resistant to fatigue'],
  ['<strong>Smooth</strong>', 'Walls of hollow organs: blood vessels, gut, bladder, airways', '<strong>Involuntary</strong> (autonomic nervous system)', 'Not striated; slow, sustained contractions (e.g. vasoconstriction, peristalsis)'],
])}

<h3>Four properties of muscle</h3>
<ul>
  <li><strong>Excitability</strong>: responds to a stimulus (a nerve impulse).</li>
  <li><strong>Contractility</strong>: shortens and develops tension.</li>
  <li><strong>Extensibility</strong>: can be stretched beyond its resting length.</li>
  <li><strong>Elasticity</strong>: returns to its resting length after stretching.</li>
</ul>

<h3>Structure of skeletal muscle (largest to smallest)</h3>
${table(['Level', 'Wrapped by', 'Description'], [
  ['<strong>Muscle</strong>', '<strong>Epimysium</strong>', 'The whole muscle. Its connective tissue blends into the tendon, which attaches to the periosteum of bone'],
  ['<strong>Fascicle</strong>', '<strong>Perimysium</strong>', 'A bundle of muscle fibres'],
  ['<strong>Muscle fibre</strong> (cell)', '<strong>Endomysium</strong>', 'A long cell with many nuclei, packed with myofibrils'],
  ['<strong>Myofibril</strong>', '', 'Chains of repeating units called <strong>sarcomeres</strong>, the basic contractile units'],
  ['<strong>Myofilaments</strong>', '', '<strong>Actin</strong> (thin) and <strong>myosin</strong> (thick) protein filaments'],
])}
<p>Muscle makes up roughly 40% of body weight and is about 70–75% water and around 20% protein.</p>

<h3>The sliding filament theory</h3>
<ol>
  <li>A nerve impulse reaches the muscle fibre, releasing calcium inside the cell.</li>
  <li>Calcium exposes binding sites on the actin filaments.</li>
  <li>The heads of the myosin filaments attach to actin, forming <strong>cross-bridges</strong>.</li>
  <li>The myosin heads pivot and pull the actin towards the centre of the sarcomere (the <strong>power stroke</strong>). This uses energy from ATP.</li>
  <li>The heads detach, re-cock and reattach further along (the <strong>recovery stroke</strong>), repeating while the stimulus and ATP last.</li>
</ol>
<p>The filaments themselves don't shorten: they slide past each other, so the sarcomere, and the whole muscle, shortens.</p>

${callout('pt', 'Trainer application', '<p>Muscle needs a steady supply of ATP and calcium control to contract. When ATP supply can\'t keep up (high intensity) the muscle fatigues. See ' + kb('physiology', 'energy-systems', 'energy systems') + '.</p>')}

${quiz([
  ['Name the three types of muscle tissue and say which is voluntary.', 'Skeletal (voluntary), cardiac and smooth (both involuntary).'],
  ['What are the four properties of muscle tissue?', 'Excitability, contractility, extensibility and elasticity.'],
  ['Which connective tissue surrounds a fascicle?', 'Perimysium.'],
  ['What is a sarcomere?', 'The basic contractile unit of a myofibril, containing actin and myosin.'],
  ['In the sliding filament theory, what forms the cross-bridges?', 'The heads of the myosin filaments attaching to actin.'],
])}`,
  },
  {
    id: 'fibre-types', group: G, title: 'Muscle fibre types',
    summary: 'Type 1, Type 2a and Type 2b (2x) fibres and how training affects them',
    body: `
${table(['', 'Type 1 (slow twitch, slow oxidative)', 'Type 2a (fast oxidative-glycolytic)', 'Type 2b / 2x (fast glycolytic)'], [
  ['Colour', 'Red', 'Red/pink', 'White/pale'],
  ['Fibre size', 'Smallest', 'Larger', 'Largest'],
  ['Myoglobin, mitochondria, capillaries', 'Many', 'Many (moderate)', 'Few'],
  ['Main energy supply', 'Aerobic', 'Aerobic and anaerobic', 'Anaerobic'],
  ['Contraction speed', 'Slow', 'Fast', 'Fastest'],
  ['Force', 'Low', 'High', 'Highest'],
  ['Fatigue resistance', 'Very high', 'Moderate', 'Low'],
  ['Used for', 'Posture, walking, endurance events', 'Middle-distance running, repeated efforts', 'Sprinting, jumping, throwing, heavy lifting'],
])}
<p>Your manual calls the fastest fibres <strong>Type 2b</strong>. In humans these are now usually called <strong>Type 2x</strong>; they're the same thing for exam purposes.</p>

<h3>Fibre mix</h3>
<ul>
  <li>Every muscle contains a mix. Postural muscles (e.g. soleus, deep back muscles) are mostly Type 1; muscles used for powerful movements have more Type 2.</li>
  <li>The mix varies between people and is largely inherited, which partly explains why some people suit endurance events and others power sports.</li>
  <li>Fibres are recruited in order of size (the <strong>size principle</strong>): Type 1 first, then 2a, then 2b/2x as force demands increase. To train the fast fibres, the effort has to be heavy, fast or close to failure.</li>
</ul>

<h3>Can fibre types change?</h3>
<p>Training shifts fibres within the Type 2 group: endurance training makes Type 2b/2x fibres behave more like 2a (more aerobic). Strength training also tends to shift 2x towards 2a, while making Type 2 fibres bigger. Converting Type 1 to Type 2 (or the reverse) is very limited in humans. With ageing, Type 2 fibres are lost and shrink fastest, which contributes to <strong>sarcopenia</strong> (age-related muscle loss).</p>

${callout('pt', 'Trainer application', '<ul><li>For older clients, include some heavier and faster (power) work to protect Type 2 fibres: they matter for catching a fall and getting out of a chair.</li><li>Endurance clients still benefit from strength training.</li></ul>')}

${quiz([
  ['Which fibre type has the most mitochondria and capillaries?', 'Type 1 (slow twitch).'],
  ['Which fibre type would dominate in a 100 m sprint?', 'Type 2b/2x (fast glycolytic), with 2a.'],
  ['What is the size principle?', 'Motor units are recruited from smallest (Type 1) to largest (Type 2) as force demand rises.'],
  ['What is sarcopenia?', 'Age-related loss of muscle mass and strength, with Type 2 fibres affected most.'],
])}`,
  },
  {
    id: 'muscle-actions', group: G, title: 'Muscle contractions & roles',
    summary: 'Concentric, eccentric, isometric; agonist, antagonist, synergist, fixator',
    body: `
<h3>Types of muscle contraction</h3>
${table(['Type', 'What happens', 'Example'], [
  ['<strong>Concentric</strong>', 'Muscle shortens while producing force', 'Biceps lifting the dumbbell in a curl'],
  ['<strong>Eccentric</strong>', 'Muscle lengthens while producing force (controls a movement against gravity or load)', 'Biceps lowering the dumbbell; quadriceps lowering into a squat'],
  ['<strong>Isometric</strong> (static)', 'Muscle produces force without changing length', 'Plank; holding a wall sit'],
  ['<strong>Isotonic</strong>', 'Contractions that change length (concentric and eccentric) against a constant external load', 'Most free-weight exercise'],
  ['<strong>Isokinetic</strong>', 'Muscle contracts at a constant speed throughout the range (needs special equipment)', 'Isokinetic dynamometers used in labs and rehab'],
])}
${callout('key', 'Eccentric facts', '<ul><li>Muscles are strongest eccentrically: you can lower more than you can lift.</li><li>Eccentric work causes the most <strong>DOMS</strong> (delayed onset muscle soreness).</li><li>Rule of thumb: when a movement goes with gravity (lowering), the muscle that would lift it is working eccentrically.</li></ul>')}

<h3>Muscle roles</h3>
${table(['Role', 'Job', 'Example: biceps curl (lifting)'], [
  ['<strong>Agonist</strong> (prime mover)', 'Main muscle producing the movement', 'Biceps brachii'],
  ['<strong>Antagonist</strong>', 'Muscle with the opposite action, which relaxes and lengthens to allow movement', 'Triceps brachii'],
  ['<strong>Synergist</strong>', 'Assists the agonist or fine-tunes the movement', 'Brachialis, brachioradialis'],
  ['<strong>Fixator</strong> (stabiliser)', 'Holds a body part steady so the agonist can work efficiently', 'Rotator cuff and deltoids stabilise the shoulder; trunk muscles keep you upright'],
])}
<p>Muscles swap roles depending on the movement. In a ${ex('push-up', 'push-up')}, pectoralis major is the agonist, anterior deltoid and triceps are synergists, and the trunk muscles are fixators stopping the hips sagging.</p>

<h3>Reciprocal inhibition</h3>
<p>When the agonist contracts, the nervous system signals the antagonist to relax. This makes smooth movement possible and is used in stretching: contracting the quadriceps helps the hamstrings relax into a stretch.</p>

<h3>Muscle tone and imbalance</h3>
<ul>
  <li><strong>Muscle tone</strong>: a low level of constant tension in a resting muscle, with different fibres contracting at different times. Postural muscles keep tone to hold us upright.</li>
  <li><strong>Muscle imbalance</strong>: when opposing muscles differ in strength or length (e.g. tight hip flexors and weak glutes). Often linked to repetitive activities, long periods of sitting or unbalanced programmes, and associated with postural changes. Balanced programmes (equal pushing and pulling, front and back) help prevent it.</li>
</ul>

${quiz([
  ['What type of contraction happens in the quadriceps on the way down in a squat?', 'Eccentric.'],
  ['What type of contraction is a plank?', 'Isometric.'],
  ['In a lat pulldown (pulling down), name the agonist and antagonist.', 'Agonist: latissimus dorsi. Antagonist: deltoids/pectoralis major (shoulder flexors and abductors). Synergists include teres major, biceps and rhomboids.'],
  ['What is a fixator?', 'A muscle that stabilises a body part so the agonist can work efficiently.'],
  ['What is reciprocal inhibition?', 'The relaxation of the antagonist when the agonist contracts.'],
])}`,
  },
  {
    id: 'life-course', group: 'Applied', title: 'Life course of the musculoskeletal system',
    summary: 'Young people, older adults, pre- and postnatal women',
    body: `
<p>Bones, muscles and joints change across life. Exercise programmes should reflect where a client is in that journey.</p>

<h3>Young people</h3>
<ul>
  <li><strong>Growth spurts</strong>: girls typically from about 10–12 (fastest around 12), finishing around 16–18; boys from about 12–14 (fastest around 14), continuing towards 18–20.</li>
  <li>During growth spurts, bones grow faster than muscles and tendons can adapt, so flexibility and coordination can dip temporarily, and growth plates are vulnerable to injury (most common roughly 11–13 in girls, 14–16 in boys).</li>
  <li>Puberty brings big increases in muscle mass, especially in boys because of testosterone.</li>
  <li><strong>Training</strong>: varied, skill-based activities; good technique; avoid repetitive high-volume loading and maximal lifts without proper supervision and progression.</li>
</ul>

<h3>Older adults</h3>
<ul>
  <li><strong>Bone</strong>: bone density falls (osteopenia, then osteoporosis), especially in women after menopause as oestrogen drops.</li>
  <li><strong>Muscle</strong>: sarcopenia (loss of muscle mass and strength), with Type 2 fibres lost fastest, so power and reaction speed decline.</li>
  <li><strong>Joints</strong>: reduced range of movement as connective tissue stiffens and cartilage thins; osteoarthritis becomes more common.</li>
  <li><strong>Training</strong>: regular weight-bearing and resistance exercise slows bone and muscle loss; balance work reduces falls; allow longer warm-ups and more recovery; repeat teaching points and give clear demonstrations.</li>
</ul>

<h3>Pre- and postnatal women</h3>
<ul>
  <li>The hormone <strong>relaxin</strong> softens ligaments during pregnancy and can remain raised for some months after birth, so joints (especially the pelvis) are less stable. Avoid developmental (deep) stretching and ballistic movements.</li>
  <li>The growing bump shifts the centre of gravity forward, increasing lumbar lordosis; balance changes.</li>
  <li>The pelvic floor is under extra load: pelvic floor exercises are recommended throughout.</li>
  <li>Screen carefully; refer to the GP or midwife if in doubt.</li>
  <li><strong>Postnatal</strong>: return gradually depending on the birth and how the client feels. Start with pelvic floor work, breathing and walking; more strenuous exercise is usually resumed after the 6–8 week postnatal check, ideally after a pelvic health assessment.</li>
</ul>
<p>See also ${kb('special-pops', 'pre-postnatal', 'pre- and postnatal clients')} and ${kb('special-pops', 'older-adults', 'older adults')}.</p>

${quiz([
  ['Why are adolescents at extra risk of injury during growth spurts?', 'Growth plates are vulnerable and bones grow faster than muscles and tendons adapt.'],
  ['What is sarcopenia and which fibres are lost fastest?', 'Age-related muscle loss; Type 2 (fast twitch) fibres.'],
  ['Which hormone loosens ligaments in pregnancy?', 'Relaxin.'],
  ['When is strenuous exercise usually resumed after birth?', 'After the 6–8 week postnatal check, progressing gradually.'],
])}`,
  },
];
