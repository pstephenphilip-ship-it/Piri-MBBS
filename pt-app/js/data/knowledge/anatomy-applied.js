// Anatomy — connective tissue and applied topics (exercise effects, conditions).
import { table, callout, quiz, ex, kb } from './_helpers.js';

export const APPLIED = [
  {
    id: 'connective-tissue', group: 'Connective tissue', title: 'Ligaments, tendons & cartilage',
    summary: 'What they are made of, how they adapt and heal',
    body: `
<h3>Tendons and ligaments</h3>
${table(['', 'Tendons', 'Ligaments'], [
  ['Connect', 'Muscle to bone', 'Bone to bone'],
  ['Made of', 'Dense regular connective tissue: tightly packed, parallel type I collagen fibres', 'Similar, with fibres slightly less regularly arranged and (in some ligaments) more elastin'],
  ['Job', 'Transmit muscle force to bone; store and release elastic energy (e.g. Achilles in running)', 'Stabilise joints, guide movement and limit excessive movement; contain sensors for joint position'],
  ['Blood supply', 'Limited', 'Limited'],
])}
<p>Tendons are not just passive cables. Springy tendons such as the Achilles stretch and recoil like a spring during running and jumping, saving energy.</p>

<h3>Cartilage</h3>
${table(['Type', 'Description', 'Where it\'s found'], [
  ['<strong>Hyaline</strong>', 'Smooth, glassy; the most common type', 'Articular surfaces of joints, costal cartilage of ribs, growth plates, nose, trachea'],
  ['<strong>Fibrocartilage</strong>', 'Tough, with thick collagen bundles; resists compression and tension', 'Intervertebral discs, menisci, pubic symphysis, labrum of hip and shoulder'],
  ['<strong>Elastic</strong>', 'Flexible, contains elastic fibres', 'Outer ear, epiglottis'],
])}
<p>Cartilage has no blood vessels and relies on diffusion from surrounding fluid, so it heals poorly.</p>

<h3>Fascia</h3>
<p>Fascia is the sheet-like connective tissue that wraps and connects muscles, groups of muscles, vessels and organs. The thoracolumbar fascia in the lower back links the latissimus dorsi, gluteus maximus and deep abdominals, helping transfer force between the upper and lower body. The plantar fascia supports the arch of the foot.</p>

<h3>How connective tissue adapts to training</h3>
<ul>
  <li>Tendons and ligaments become stiffer and stronger with progressive loading, and tendons can increase in size.</li>
  <li>They adapt <strong>more slowly than muscle</strong>. Muscle strength can increase noticeably within weeks; tendon adaptations take months. A rapid increase in training load can let muscle outpace tendon, which is a common cause of tendinopathy.</li>
  <li>Heavy, slow resistance and isometric holds are effective for building tendon capacity.</li>
  <li>Inactivity and immobilisation weaken them.</li>
</ul>

<h3>Tissue healing timeframes (approximate)</h3>
${table(['Phase', 'Roughly', 'What happens', 'Training approach'], [
  ['<strong>Inflammation</strong>', 'First few days', 'Swelling, heat, pain; the body clears damaged tissue', 'Protect; relative rest of the injured area; keep the rest of the body moving'],
  ['<strong>Proliferation (repair)</strong>', 'From a few days to about 6 weeks', 'New, disorganised collagen is laid down', 'Gentle, pain-guided movement and light loading'],
  ['<strong>Remodelling</strong>', 'From weeks to 12 months or more', 'Collagen reorganises along lines of stress and strengthens', 'Progressive loading to restore strength and capacity'],
])}
<p>Ligament and tendon injuries can take many months to regain full strength, even after pain has gone.</p>

<h3>Sprains and strains</h3>
<ul>
  <li><strong>Sprain</strong>: an injury to a <strong>ligament</strong>.</li>
  <li><strong>Strain</strong>: an injury to a <strong>muscle or tendon</strong>.</li>
  <li>Both are graded 1 (mild, fibres stretched), 2 (partial tear) and 3 (complete rupture).</li>
</ul>
${callout('pt', 'Trainer application', `<ul>
<li>Increase training load gradually, especially plyometrics, running volume and new exercises, to give tendons time to adapt.</li>
<li>For acute soft tissue injuries, current guidance (e.g. PEACE &amp; LOVE) emphasises protecting the area at first, then early, progressive loading and movement guided by pain, rather than prolonged rest.</li>
<li>Remember the difference: sprain = ligament, strain = muscle/tendon.</li>
</ul>`)}

${quiz([
  ['What does a tendon connect, and what does a ligament connect?', 'A tendon connects muscle to bone; a ligament connects bone to bone.'],
  ['Name the three types of cartilage and an example of each.', 'Hyaline (articular cartilage), fibrocartilage (intervertebral discs, menisci), elastic (outer ear).'],
  ['Why might a client develop tendon pain after a big jump in training volume?', 'Tendons adapt more slowly than muscle, so a rapid increase in load can exceed what the tendon can tolerate.'],
  ['What is the difference between a sprain and a strain?', 'A sprain injures a ligament; a strain injures a muscle or tendon.'],
  ['What happens in the remodelling phase of healing?', 'New collagen reorganises along lines of stress and strengthens; progressive loading helps this.'],
])}`,
  },
  {
    id: 'exercise-bones-joints', group: 'Applied', title: 'Effects of exercise on bones & joints',
    summary: 'Short-term and long-term adaptations',
    body: `
<h3>Short-term (acute) effects</h3>
<ul>
  <li>Increased production of synovial fluid; fluid becomes less viscous.</li>
  <li>Articular cartilage absorbs fluid and thickens slightly, improving shock absorption.</li>
  <li>Range of motion increases as connective tissues and muscles warm.</li>
  <li>Small amounts of bone micro-strain stimulate osteocytes, starting the signals for bone remodelling.</li>
</ul>

<h3>Long-term (chronic) adaptations</h3>
${table(['Tissue', 'Adaptation', 'Benefit'], [
  ['<strong>Bone</strong>', 'Increased bone mineral density and improved structure, especially with resistance and impact training', 'Reduced risk of osteoporosis and fractures'],
  ['<strong>Tendons and ligaments</strong>', 'Stronger and stiffer; tendons can thicken', 'Better force transfer, more joint stability, lower injury risk'],
  ['<strong>Articular cartilage</strong>', 'Healthier cartilage with regular moderate loading', 'Better shock absorption; may help protect against joint degeneration'],
  ['<strong>Joint stability</strong>', 'Stronger muscles around joints and better proprioception and balance', 'Fewer sprains and falls'],
  ['<strong>Range of motion</strong>', 'Maintained or improved with regular full-range training and flexibility work', 'Easier daily movement; better exercise technique'],
  ['<strong>Posture</strong>', 'Stronger postural muscles and better body awareness', 'Easier to hold positions; more comfortable movement'],
])}

<h3>Myth-busting</h3>
${table(['Myth', 'What the evidence says'], [
  ['"Running wears out your knees."', 'Recreational runners do not have higher rates of knee osteoarthritis than non-runners; some studies show lower rates. Very high-volume elite running and previous injury are different stories.'],
  ['"Deep squats are bad for the knees."', 'In healthy knees, deep squats built up gradually are safe. Load on some knee structures is actually lower in full depth for a given weight than in a half squat.'],
  ['"Lifting weights stunts growth in children."', 'Not supported by evidence. Supervised, well-designed resistance training is safe and beneficial for young people.'],
  ['"People with osteoporosis shouldn\'t lift weights."', 'Progressive resistance and appropriate impact training are recommended for bone health, adapted for the individual.'],
  ['"Clicking joints are a sign of damage."', 'Painless clicking and cracking is common and usually harmless.'],
])}

${callout('pt', 'Trainer application', `<p>When explaining benefits to clients, connect them to their goals: "These ${ex('back-squat', 'squats')} and ${ex('farmer-carry', 'carries')} are strengthening your bones and the ligaments around your knees and hips, which keeps you steady on your feet." See also ${kb('anatomy', 'bone-remodelling', 'bone growth & remodelling')}.</p>`)}

${quiz([
  ['List three short-term effects of exercise on joints.', 'More synovial fluid, less viscous fluid, cartilage absorbs fluid and thickens, increased range of motion.'],
  ['Which type of training most improves bone density?', 'Progressive resistance training and impact (jumping, hopping) training.'],
  ['Does recreational running cause knee osteoarthritis?', 'The evidence suggests not; recreational runners do not have higher rates than non-runners.'],
  ['How does strength training reduce the risk of falls in older adults?', 'Stronger muscles, better joint stability, improved balance and proprioception.'],
])}`,
  },
  {
    id: 'bone-joint-conditions', group: 'Applied', title: 'Common bone & joint conditions',
    summary: 'Osteoporosis, osteoarthritis, rheumatoid arthritis, hypermobility',
    body: `
${callout('warn', 'Scope of practice', '<p>Personal trainers do not diagnose or treat medical conditions. Your role is to screen (e.g. with the PAR-Q), refer when needed, work within guidance from the client\'s healthcare team, and adapt exercise. Special-population qualifications (e.g. Level 4 qualifications in the UK) allow you to work with some conditions in more depth.</p>')}

<h3>Osteoporosis and osteopenia</h3>
<ul>
  <li><strong>What it is</strong>: reduced bone density and a weakened bone structure, increasing fracture risk. Diagnosed by a DXA scan: a T-score of −2.5 or below is osteoporosis; between −1 and −2.5 is osteopenia (low bone mass).</li>
  <li><strong>Risk factors</strong>: older age, being female (especially after menopause), low body weight, smoking, high alcohol intake, family history, inactivity, long-term steroid use, low energy availability, some medical conditions.</li>
  <li><strong>Common fracture sites</strong>: spine (vertebral fractures, sometimes painless, causing height loss and increased kyphosis), wrist and hip.</li>
  <li><strong>Exercise</strong>: progressive resistance training, appropriate impact for the individual, and balance training to reduce falls. UK guidance from the Royal Osteoporosis Society supports these.</li>
  <li><strong>Precautions</strong>: for people with vertebral fractures or high risk, avoid loaded or repeated end-range spinal flexion and twisting (e.g. weighted sit-ups); learn and use a hip hinge for lifting; prioritise falls prevention.</li>
</ul>

<h3>Osteoarthritis (OA)</h3>
<ul>
  <li><strong>What it is</strong>: the most common joint condition. A whole-joint process involving cartilage thinning, bone changes (including bony spurs called osteophytes) and inflammation of the joint lining. Most common in the knees, hips, hands and spine.</li>
  <li><strong>Symptoms</strong>: pain on activity, stiffness (usually lasting under 30 minutes in the morning or after rest), reduced range, sometimes swelling or crepitus (grating).</li>
  <li><strong>Risk factors</strong>: age, previous joint injury, higher body weight, genetics, being female.</li>
  <li><strong>Exercise</strong>: NICE recommends exercise (strengthening plus general aerobic fitness) as a core treatment for everyone with OA. Pain during exercise is acceptable if it is mild and settles within about 24 hours.</li>
  <li><strong>Adapt</strong>: choose comfortable ranges and positions, reduce impact if it flares symptoms, and progress gradually. Weight loss helps knee OA in those who are overweight.</li>
</ul>

<h3>Rheumatoid arthritis (RA)</h3>
<ul>
  <li><strong>What it is</strong>: an autoimmune disease in which the immune system attacks the joint lining (synovium), causing inflammation. Usually affects small joints of the hands and feet symmetrically (both sides), and can affect the whole body (fatigue, heart, lungs).</li>
  <li><strong>Symptoms</strong>: hot, swollen, painful joints; morning stiffness lasting more than 30 minutes; flare-ups.</li>
  <li><strong>Exercise</strong>: very beneficial between flares (strength, aerobic, range of motion). During a flare, avoid loading hot, swollen joints; gentle range of motion is usually fine.</li>
</ul>

<h3>OA vs RA at a glance</h3>
${table(['', 'Osteoarthritis', 'Rheumatoid arthritis'], [
  ['Cause', 'Degenerative / mechanical and biological joint changes', 'Autoimmune inflammation'],
  ['Joints', 'Weight-bearing joints, hands; often one side more than the other', 'Small joints of hands and feet; symmetrical'],
  ['Morning stiffness', 'Less than 30 minutes', 'More than 30 minutes'],
  ['Onset', 'Gradual, usually over 45', 'Any age, often 30–60; can be rapid'],
])}

<h3>Joint hypermobility</h3>
<ul>
  <li>A larger than usual range of movement in several joints. Common, especially in women and younger people, and often causes no problems. Can be assessed with the Beighton score.</li>
  <li>Some people have symptoms such as joint pain, recurrent sprains or dislocations, and fatigue (hypermobility spectrum disorder or hypermobile Ehlers-Danlos syndrome).</li>
  <li><strong>Training</strong>: focus on strength, control and proprioception through the full range rather than more flexibility work. Avoid sitting at end range (e.g. locking out elbows and knees under load).</li>
</ul>

<h3>Other conditions to know about</h3>
${table(['Condition', 'Brief description', 'Training notes'], [
  ['<strong>Gout</strong>', 'Inflammatory arthritis from uric acid crystals, classically the big toe; sudden, very painful flares', 'Don\'t exercise the affected joint during a flare'],
  ['<strong>Ankylosing spondylitis (axial spondyloarthritis)</strong>', 'Inflammatory arthritis of the spine and SI joints; back pain and stiffness worse in the morning and better with exercise, often starting before 45', 'Exercise, especially mobility and extension work, is a key treatment'],
  ['<strong>Stress fracture</strong>', 'A small crack from repeated load exceeding bone\'s repair rate; common in shins, metatarsals, femoral neck', 'Localised bone pain worsening with impact: stop impact and refer'],
  ['<strong>Joint replacement</strong> (hip/knee)', 'Surgical replacement of a worn joint', 'Follow the surgeon/physio\'s precautions (e.g. some hip replacements limit deep flexion, adduction and rotation early on)'],
])}

${callout('pt', 'Trainer application', `<ul>
<li>Record conditions and medications on the client's PAR-Q and keep it up to date.</li>
<li>When in doubt, get medical clearance and ask the client's healthcare provider for specific precautions.</li>
<li>The core message for most bone and joint conditions is the same: appropriately dosed, progressive exercise helps.</li>
</ul>`)}

${quiz([
  ['What DXA T-score indicates osteoporosis?', '−2.5 or lower.'],
  ['What exercise approach does NICE recommend for osteoarthritis?', 'Exercise is a core treatment: muscle strengthening and general aerobic fitness, for everyone with OA.'],
  ['Name two differences between OA and RA.', 'For example: RA is autoimmune and inflammatory, OA is degenerative; RA is usually symmetrical and affects small joints; RA morning stiffness lasts more than 30 minutes.'],
  ['A client with RA has a hot, swollen knee today. What do you do?', 'Avoid loading that joint; gentle range of motion and training other areas is usually fine. Encourage contact with their rheumatology team if the flare persists.'],
  ['What should the focus be for a symptomatic hypermobile client?', 'Strength, control and proprioception through the range, rather than further stretching.'],
  ['Which movements should be avoided for a client with vertebral osteoporosis?', 'Loaded or repeated end-range spinal flexion and twisting (e.g. weighted sit-ups).'],
])}`,
  },
];
