// Physiology — Unit 1 of the Level 3 Diploma syllabus, in our own words.
import { table, callout, quiz, ex, kb } from './_helpers.js';

const note = html => callout('key', 'Course note', html);

export const PHYSIOLOGY = [
  {
    id: 'nervous-system', group: 'Nervous system', title: 'The nervous system',
    summary: 'CNS and PNS, sensory and motor nerves, autonomic system, proprioceptors',
    body: `
<p>The nervous system is the body's control and communication network. It has three jobs: <strong>input</strong> (sensing), <strong>analysis</strong> (deciding) and <strong>output</strong> (responding). Because nerves and muscles work so closely together, they are often called the <strong>neuromuscular system</strong>.</p>

<h3>Structure</h3>
${table(['Division', 'Made up of', 'Role'], [
  ['<strong>Central nervous system (CNS)</strong>', 'Brain and spinal cord', 'Processes information and makes decisions, conscious and unconscious. The cerebellum coordinates movement and balance; the spinal cord relays messages and handles reflexes'],
  ['<strong>Peripheral nervous system (PNS)</strong>', 'All nerves outside the CNS', 'Carries information to and from the CNS'],
])}
<p>The PNS contains:</p>
<ul>
  <li><strong>Sensory (afferent) neurons</strong>: carry information <em>to</em> the CNS from receptors (touch, temperature, limb position, blood chemistry). They enter the back of the spinal cord.</li>
  <li><strong>Motor (efferent) neurons</strong>: carry instructions <em>from</em> the CNS to muscles and glands. They leave the front of the spinal cord.</li>
</ul>

<h3>Somatic and autonomic systems</h3>
${table(['System', 'Controls', 'Branches'], [
  ['<strong>Somatic</strong>', 'Voluntary control of skeletal muscle', ''],
  ['<strong>Autonomic</strong>', 'Involuntary functions: heart rate, breathing, digestion, sweating, blood vessel diameter', '<strong>Sympathetic</strong> ("fight or flight"): raises heart rate, breathing and blood pressure, releases adrenaline, diverts blood to muscles.<br><strong>Parasympathetic</strong> ("rest and digest"): slows heart rate and promotes digestion and recovery'],
])}

<h3>Proprioceptors</h3>
<ul>
  <li><strong>Muscle spindles</strong>: sit inside muscles and detect stretch and how fast it happens. A sudden stretch triggers a reflex contraction (the <strong>stretch reflex</strong>, e.g. the knee-jerk). This is why bouncing (ballistic) stretches can be counter-productive.</li>
  <li><strong>Golgi tendon organs (GTOs)</strong>: sit where muscle meets tendon and detect tension. High tension makes the muscle relax (<strong>autogenic inhibition</strong>), protecting it from damage. This is used in PNF stretching.</li>
  <li><strong>Joint receptors</strong>: in capsules and ligaments, sensing joint position and movement.</li>
</ul>

${callout('pt', 'Trainer application', '<p>Balance and proprioception training (single-leg work, unstable surfaces, eyes closed) improves the speed and quality of these signals. That helps prevent ankle sprains and falls.</p>')}

${quiz([
  ['What two parts make up the CNS?', 'The brain and spinal cord.'],
  ['What is the difference between sensory and motor neurons?', 'Sensory neurons carry information to the CNS; motor neurons carry instructions from the CNS to muscles and glands.'],
  ['Which branch of the autonomic nervous system raises heart rate during exercise?', 'The sympathetic nervous system.'],
  ['What do Golgi tendon organs detect and what do they cause?', 'Tension in the muscle-tendon unit. High tension causes the muscle to relax (autogenic inhibition).'],
  ['What triggers the stretch reflex?', 'Muscle spindles detecting a rapid stretch.'],
])}`,
  },
  {
    id: 'motor-units', group: 'Nervous system', title: 'Motor units & neuromuscular adaptation',
    summary: 'All-or-none law, recruitment, why beginners get stronger fast',
    body: `
<p>A <strong>motor unit</strong> is one motor neuron plus all the muscle fibres it supplies. A unit can have from a handful of fibres (eye and finger muscles, for fine control) to well over a thousand (large leg muscles, for force). All fibres in a unit are the same type.</p>

<h3>The all-or-none law</h3>
<p>When a motor neuron fires strongly enough, <strong>every fibre in that unit contracts fully</strong>; if it doesn't, none do. A motor unit can't contract "a bit".</p>

<h3>How force is graded</h3>
<ul>
  <li><strong>Recruitment</strong>: more motor units are switched on for more force. Small (Type 1) units are recruited first, then larger Type 2 units (the size principle).</li>
  <li><strong>Firing rate (rate coding)</strong>: units fire more often, so their twitches add together.</li>
  <li><strong>Synchronisation</strong>: units fire together rather than taking turns.</li>
</ul>
<p>In long, low-intensity work, units take turns (asynchronous recruitment) so some can rest. In a hard set, more and more units are recruited until they're all fatigued.</p>

<h3>Neural adaptations to training</h3>
<p>In the first 4–8 weeks of strength training, most strength gain comes from the nervous system rather than bigger muscles:</p>
<ul>
  <li>More motor units recruited, firing faster and more synchronously.</li>
  <li>Better coordination between agonists, synergists and antagonists (less unwanted co-contraction).</li>
  <li>Reduced protective inhibition (e.g. from Golgi tendon organs), letting more force be expressed.</li>
</ul>
<p>Muscle growth (hypertrophy) becomes a bigger contributor after this.</p>

<h3>Responses of the neuromuscular system</h3>
${table(['Acute (during exercise)', 'Chronic (after weeks or months)'], [
  ['Increased muscle temperature; vasodilation and more blood to working muscles; faster nerve impulses; reduced inhibition after a good warm-up', 'Resistance training: hypertrophy, more strength and power, better coordination, bigger glycogen and creatine phosphate stores, stronger tendons.<br>Aerobic training: more and bigger mitochondria, more capillaries, more aerobic enzymes, more stored glycogen and fat in muscle'],
])}

${callout('pt', 'Trainer application', '<p>Explain to new clients that early strength gains are mostly "learning": their body is getting better at using the muscle it already has. It is a great motivator, and it means technique practice is training.</p>')}

${quiz([
  ['What is a motor unit?', 'A motor neuron and all the muscle fibres it supplies.'],
  ['What is the all-or-none law?', 'When a motor unit is stimulated, all its fibres contract fully, or none do.'],
  ['Give two ways the nervous system increases force.', 'Recruiting more motor units and increasing their firing rate (also synchronisation).'],
  ['Why do beginners get stronger quickly without much muscle growth?', 'Neural adaptations: better recruitment, firing and coordination, and less inhibition.'],
])}`,
  },
  {
    id: 'respiratory', group: 'Respiratory system', title: 'The respiratory system',
    summary: 'Airways, mechanics of breathing, gaseous exchange, lung volumes',
    body: `
<p>The respiratory system takes oxygen into the body and removes carbon dioxide, a waste product of aerobic energy production.</p>

<h3>Pathway of air</h3>
<p>Nose/mouth → <strong>pharynx</strong> (throat) → <strong>larynx</strong> (voice box) → <strong>trachea</strong> (windpipe, held open by C-shaped cartilage rings) → left and right <strong>bronchi</strong> → <strong>bronchioles</strong> → <strong>alveoli</strong> (tiny air sacs surrounded by capillaries). The nose warms, moistens and filters air.</p>

<h3>Mechanics of breathing</h3>
${table(['', 'Inspiration (breathing in)', 'Expiration (breathing out)'], [
  ['At rest', 'Diaphragm contracts and flattens; external intercostals lift the ribs up and out. Chest volume increases, pressure in the lungs falls, air flows in', '<strong>Passive</strong>: diaphragm and intercostals relax; the lungs recoil'],
  ['During exercise', 'Extra muscles help lift the rib cage: sternocleidomastoid, scalenes, pectoralis minor', '<strong>Active</strong>: internal intercostals and abdominal muscles (e.g. rectus abdominis, obliques) push air out forcefully'],
])}
<ul>
  <li><strong>Diaphragmatic breathing</strong> (belly rises, chest moves little) is efficient at rest and linked to relaxation.</li>
  <li><strong>Costal (chest) breathing</strong> adds rib movement when more air is needed. Combining the two gives the biggest breath.</li>
</ul>

<h3>Gaseous exchange</h3>
<ul>
  <li>Gases move by <strong>diffusion</strong>, from high to low concentration.</li>
  <li><strong>External respiration</strong>: in the lungs, oxygen diffuses from the alveoli into the blood; carbon dioxide diffuses from the blood into the alveoli to be breathed out.</li>
  <li><strong>Internal respiration</strong>: at the tissues, oxygen moves from the blood into cells and carbon dioxide moves out.</li>
  <li>Alveoli are ideal for exchange: a huge surface area (roughly the size of a tennis court), walls one cell thick, a dense capillary network and a moist surface.</li>
  <li>Oxygen is carried mainly bound to <strong>haemoglobin</strong> in red blood cells (oxyhaemoglobin). Carbon dioxide is carried mostly dissolved in plasma as bicarbonate, and some bound to haemoglobin.</li>
</ul>

<h3>Composition of air</h3>
${table(['Gas', 'Inhaled', 'Exhaled'], [
  ['Nitrogen', '~78–79%', '~78–79% (unchanged)'],
  ['Oxygen', '~21%', '~16–17%'],
  ['Carbon dioxide', '~0.04%', '~4%'],
])}

<h3>Control of breathing</h3>
<p>Breathing is controlled automatically by the brainstem. The main trigger is rising <strong>carbon dioxide</strong> (and acidity) in the blood, not low oxygen. During exercise CO₂ rises quickly, so breathing rate and depth increase.</p>

<h3>Lung measures</h3>
${table(['Measure', 'Definition', 'Typical resting value', 'Acute exercise', 'Chronic training'], [
  ['<strong>Breathing rate</strong>', 'Breaths per minute', '12–16', 'Increases', 'Resting rate slightly decreases'],
  ['<strong>Tidal volume (TV)</strong>', 'Air breathed in or out per breath', '~500 ml', 'Increases', 'Increases during maximal exercise'],
  ['<strong>Minute ventilation (VE)</strong>', 'Air breathed per minute = breathing rate × tidal volume', '~6–8 L/min', 'Increases (can exceed 100 L/min)', 'Unchanged at rest; higher maximum'],
  ['<strong>Vital capacity</strong>', 'Most air that can be exhaled after a maximal breath in', '~4–5 L', '', 'May increase slightly'],
  ['<strong>Residual volume</strong>', 'Air left in the lungs after a maximal exhale', '~1–1.5 L', '', ''],
])}
<p>Example: 12 breaths/min × 0.5 L = 6 L/min.</p>
<p>Long-term training strengthens the breathing muscles and improves capillarisation around the alveoli, making breathing more efficient.</p>

${note('<p>Some course materials call haemoglobin carrying CO₂ "carboxyhaemoglobin". The correct term is <strong>carbaminohaemoglobin</strong>; carboxyhaemoglobin is haemoglobin bound to carbon monoxide.</p>')}

${quiz([
  ['List the pathway of air from the nose to the alveoli.', 'Nose/mouth, pharynx, larynx, trachea, bronchi, bronchioles, alveoli.'],
  ['What happens to the diaphragm during inspiration?', 'It contracts and flattens, increasing chest volume.'],
  ['What is the difference between external and internal respiration?', 'External: gas exchange between alveoli and blood. Internal: between blood and body tissues.'],
  ['What is the main chemical trigger for breathing?', 'Rising carbon dioxide (and acidity) in the blood.'],
  ['Calculate minute ventilation for 15 breaths/min with a tidal volume of 600 ml.', '9,000 ml/min (9 L/min).'],
])}`,
  },
  {
    id: 'heart-blood', group: 'Cardiovascular system', title: 'The heart & blood',
    summary: 'Blood components, heart chambers and valves, conduction, circulation',
    body: `
<h3>Blood</h3>
<p>An adult has roughly 5 litres of blood (about 7–8% of body weight).</p>
${table(['Component', 'Share', 'Function'], [
  ['<strong>Plasma</strong>', '~55%', 'Mostly water; carries nutrients, hormones, waste, CO₂, proteins and electrolytes'],
  ['<strong>Red blood cells</strong> (erythrocytes)', '~40–45%', 'Contain haemoglobin to carry oxygen. Made in red bone marrow; need iron. Too few causes anaemia (tiredness, poor exercise tolerance)'],
  ['<strong>White blood cells</strong> (leucocytes)', '<1%', 'Fight infection'],
  ['<strong>Platelets</strong> (thrombocytes)', '<1%', 'Help blood clot. Anticoagulant medicines (e.g. warfarin) reduce clotting: take care with bruising'],
])}

<h3>Structure of the heart</h3>
<p>A fist-sized muscular pump behind the sternum, slightly left of centre, made of cardiac muscle (myocardium). A wall called the <strong>septum</strong> divides it into left and right sides.</p>
${table(['Chamber', 'Receives', 'Sends to'], [
  ['<strong>Right atrium</strong>', 'Deoxygenated blood from the body (via the superior and inferior vena cava)', 'Right ventricle'],
  ['<strong>Right ventricle</strong>', 'Blood from the right atrium', 'Lungs (via the pulmonary artery)'],
  ['<strong>Left atrium</strong>', 'Oxygenated blood from the lungs (via the pulmonary veins)', 'Left ventricle'],
  ['<strong>Left ventricle</strong>', 'Blood from the left atrium', 'The whole body (via the aorta). It has the thickest wall because it pumps furthest'],
])}
<h3>Valves</h3>
<p>Valves stop blood flowing backwards:</p>
<ul>
  <li><strong>Tricuspid valve</strong>: between the right atrium and right ventricle (three flaps).</li>
  <li><strong>Bicuspid (mitral) valve</strong>: between the left atrium and left ventricle (two flaps).</li>
  <li><strong>Pulmonary valve</strong>: between the right ventricle and pulmonary artery.</li>
  <li><strong>Aortic valve</strong>: between the left ventricle and aorta.</li>
</ul>

<h3>Two circuits</h3>
<ul>
  <li><strong>Pulmonary circulation</strong>: right side of the heart → lungs → left side of the heart. Picks up oxygen and gets rid of CO₂.</li>
  <li><strong>Systemic circulation</strong>: left side of the heart → body → right side of the heart. Delivers oxygen and nutrients.</li>
  <li>The heart muscle has its own supply, the <strong>coronary arteries</strong>. Blockage of these causes angina and heart attacks.</li>
</ul>
<p>Remember: arteries carry blood <strong>a</strong>way from the heart; veins return it. The pulmonary artery is the only artery carrying deoxygenated blood, and the pulmonary veins the only veins carrying oxygenated blood.</p>

<h3>Conduction system</h3>
<p>The heart beats on its own. The <strong>sinoatrial (SA) node</strong>, the natural pacemaker in the right atrium, sends an impulse that makes the atria contract. The impulse passes to the <strong>atrioventricular (AV) node</strong>, which briefly delays it so the ventricles can fill, then down the <strong>bundle of His</strong> and <strong>Purkinje fibres</strong> so the ventricles contract from the bottom up. The autonomic nervous system and adrenaline speed it up or slow it down.</p>
<ul>
  <li><strong>Systole</strong>: contraction phase. <strong>Diastole</strong>: relaxation and filling phase.</li>
  <li>Resting heart rate is typically 60–100 bpm, averaging around 70. Below 60 is <strong>bradycardia</strong> (common in trained people); above 100 is <strong>tachycardia</strong>.</li>
</ul>

${note('<p>Some course materials describe all heart valves as tricuspid, or give tachycardia as any resting rate above 72 bpm. The standard clinical definitions are used above: only the right atrioventricular valve is tricuspid, and tachycardia is above 100 bpm at rest.</p>')}

${quiz([
  ['Which chamber of the heart has the thickest wall and why?', 'The left ventricle, because it pumps blood around the whole body.'],
  ['Trace blood from the body back to the body.', 'Vena cava, right atrium, tricuspid valve, right ventricle, pulmonary artery, lungs, pulmonary veins, left atrium, bicuspid valve, left ventricle, aorta, body.'],
  ['What is the heart\'s natural pacemaker?', 'The sinoatrial (SA) node.'],
  ['What do red blood cells carry and what mineral do they depend on?', 'Oxygen, bound to haemoglobin. They depend on iron.'],
  ['What is systole?', 'The contraction phase of the heartbeat.'],
])}`,
  },
  {
    id: 'blood-vessels', group: 'Cardiovascular system', title: 'Blood vessels & venous return',
    summary: 'Arteries, veins, capillaries, venous return, vasodilation, atherosclerosis',
    body: `
${table(['Vessel', 'Structure', 'Function'], [
  ['<strong>Arteries</strong>', 'Thick, muscular, elastic walls; carry blood under high pressure', 'Carry blood away from the heart. The pulse is felt in arteries (radial at the wrist, carotid in the neck)'],
  ['<strong>Arterioles</strong>', 'Small arteries with smooth muscle walls', 'Control blood flow into capillary beds by narrowing or widening'],
  ['<strong>Capillaries</strong>', 'Walls one cell thick', 'Exchange oxygen, nutrients, CO₂ and waste with the tissues. Training increases their number (capillarisation)'],
  ['<strong>Venules</strong>', 'Small veins', 'Collect blood from capillaries'],
  ['<strong>Veins</strong>', 'Thinner walls, wider lumen, low pressure, contain one-way valves', 'Return blood to the heart. Faulty valves cause varicose veins'],
])}
<p>Blood flows in a closed loop: heart → arteries → arterioles → capillaries → venules → veins → heart.</p>

<h3>Venous return</h3>
<p>Blood returning to the heart from the legs has to work against gravity at low pressure. It is helped by:</p>
<ul>
  <li><strong>The skeletal muscle pump</strong>: contracting muscles squeeze the veins and push blood upwards.</li>
  <li><strong>One-way valves</strong> in the veins, which stop backflow.</li>
  <li><strong>The respiratory pump</strong>: pressure changes in the chest and abdomen during breathing draw blood towards the heart.</li>
  <li><strong>Smooth muscle</strong> in vein walls (venoconstriction) and suction from the heart as it refills.</li>
  <li><strong>Gravity</strong> for blood above the heart.</li>
</ul>
${callout('warn', 'Blood pooling', '<p>If a client stops suddenly after hard exercise, especially leg-dominant work, the muscle pump stops and blood can pool in the legs, causing dizziness, nausea or fainting. Always finish with a gradual cool-down, and don\'t let clients stand still or lie flat straight after intense work.</p>')}

<h3>Redistributing blood: the vascular shunt</h3>
<p>Blood vessels widen (<strong>vasodilation</strong>) or narrow (<strong>vasoconstriction</strong>) to send blood where it's needed. At rest, working muscles get about 15–20% of blood flow; in hard exercise, up to around 80–85%, with less going to the gut. This is why a large meal shortly before exercise is a bad idea.</p>

<h3>Atherosclerosis</h3>
<p>Fatty plaque builds up in artery walls, narrowing them and stiffening them (arteriosclerosis). Risk factors include smoking, high blood pressure, high LDL cholesterol, diabetes, inactivity, obesity, age and family history. If plaque ruptures, a clot can form:</p>
<ul>
  <li>In a <strong>coronary artery</strong>: angina (chest pain on exertion) or a heart attack (myocardial infarction).</li>
  <li>In an artery to the brain: an <strong>ischaemic stroke</strong>.</li>
</ul>
<p>Regular exercise is one of the most effective ways to reduce these risks.</p>

${quiz([
  ['Which blood vessels have one-way valves?', 'Veins.'],
  ['Why are capillary walls only one cell thick?', 'To allow gases, nutrients and waste to pass through easily.'],
  ['Name three mechanisms that aid venous return.', 'Skeletal muscle pump, one-way valves, respiratory pump (also smooth muscle in veins, gravity, suction of the heart).'],
  ['Why should clients cool down gradually?', 'To keep the muscle pump working and prevent blood pooling, which can cause dizziness or fainting.'],
  ['What is atherosclerosis?', 'Build-up of fatty plaque in artery walls, narrowing them.'],
])}`,
  },
  {
    id: 'blood-pressure', group: 'Cardiovascular system', title: 'Blood pressure',
    summary: 'Systolic and diastolic, categories, exercise effects, the Valsalva manoeuvre',
    body: `
<p><strong>Blood pressure (BP)</strong> is the force blood exerts on the walls of the arteries, measured in millimetres of mercury (mmHg) and written as systolic over diastolic, e.g. 120/80.</p>
<ul>
  <li><strong>Systolic</strong>: the pressure when the ventricles contract (the higher number).</li>
  <li><strong>Diastolic</strong>: the pressure when the heart relaxes and refills (the lower number).</li>
</ul>
<h3>What determines blood pressure</h3>
<p><strong>Blood pressure = cardiac output × peripheral resistance.</strong> It is also affected by blood volume.</p>
<ul>
  <li><strong>Cardiac output</strong> rises with heart rate and stroke volume; affects mainly systolic pressure.</li>
  <li><strong>Peripheral resistance</strong>: how hard it is for blood to flow through the vessels. Raised by narrowed or stiff arteries and vasoconstriction.</li>
  <li><strong>Blood volume</strong>: raised by fluid retention (e.g. high salt intake, kidney problems), lowered by blood loss or dehydration.</li>
</ul>

<h3>Classification</h3>
${table(['Category', 'Systolic (mmHg)', 'Diastolic (mmHg)'], [
  ['Low (hypotension)', 'below 90–100', 'below 60'],
  ['Optimal', 'below 120', 'below 80'],
  ['Normal', '120–129', '80–84'],
  ['High normal', '130–139', '85–89'],
  ['Stage 1 hypertension', '140–159', '90–99'],
  ['Stage 2 hypertension', '160–179', '100–109'],
  ['Stage 3 / severe hypertension', '180 or above', '110 or above'],
])}
<p>These are clinic readings. NICE (UK) diagnoses hypertension from 140/90 in clinic, confirmed by home or ambulatory monitoring (135/85 or above).</p>
${callout('warn', 'Exercise and high blood pressure', '<ul><li>Many exercise professionals use a resting reading of 160/100 or above as the point where a client should get GP clearance before starting a new programme, and around 180/110 or above as a reason not to exercise that day. Follow your employer\'s or governing body\'s screening policy.</li><li>Hypotension can cause dizziness, especially when standing up quickly (postural hypotension), for example after floor exercises.</li></ul>')}

<h3>Effects of exercise</h3>
${table(['', 'Short term (during exercise)', 'Long term (regular training)'], [
  ['<strong>Aerobic exercise</strong>', 'Systolic rises steadily with intensity; diastolic stays similar or falls slightly', 'Resting BP falls: aerobic training can lower it by around 5–8 mmHg, and more in people with hypertension'],
  ['<strong>Resistance exercise</strong>', 'Both systolic and diastolic can rise sharply, especially with heavy loads, isometric holds and breath-holding', 'Resistance training (including isometric training) also lowers resting BP modestly'],
])}
<p>After a session, blood pressure often stays a little lower than normal for several hours (post-exercise hypotension).</p>

<h3>The Valsalva manoeuvre</h3>
<p>Forcefully breathing out against a closed airway (holding the breath while straining). It raises pressure in the chest and abdomen, which briefly stiffens the trunk but causes a large spike in blood pressure, followed by a drop that can cause dizziness or fainting.</p>
${callout('pt', 'Hypertensive clients', `<ul><li>Teach them to breathe continuously: exhale on effort.</li><li>Avoid breath-holding, maximal lifts, long isometric holds and working to failure.</li><li>Favour moderate loads with more repetitions and circuit-style sessions.</li><li>Avoid positions with the head below the heart (e.g. decline bench) and prolonged overhead work, and get up slowly from the floor.</li><li>Some medications (e.g. beta blockers) blunt heart rate, so use RPE rather than heart rate to judge intensity.</li></ul>`)}

${quiz([
  ['What does systolic pressure represent?', 'The pressure in the arteries when the ventricles contract.'],
  ['State the formula for blood pressure.', 'Blood pressure = cardiac output × peripheral resistance.'],
  ['What is "optimal" blood pressure?', 'Below 120/80 mmHg.'],
  ['What happens to systolic pressure during aerobic exercise?', 'It rises in line with intensity.'],
  ['What is the Valsalva manoeuvre and why is it a risk for hypertensive clients?', 'Breath-holding while straining; it causes a sharp spike in blood pressure.'],
])}`,
  },
  {
    id: 'cv-adaptations', group: 'Cardiovascular system', title: 'Cardiovascular measures & adaptations',
    summary: 'Heart rate, stroke volume, cardiac output; acute and chronic effects',
    body: `
${table(['Measure', 'Definition', 'Typical resting value (untrained adult)'], [
  ['<strong>Heart rate (HR)</strong>', 'Beats per minute', '60–100 bpm (around 70)'],
  ['<strong>Stroke volume (SV)</strong>', 'Blood pumped from the left ventricle per beat', '~70 ml'],
  ['<strong>Cardiac output (Q)</strong>', 'Blood pumped per minute = HR × SV', '~5 L/min'],
])}
<p>Example: 70 bpm × 70 ml = 4,900 ml (about 5 L) per minute. In hard exercise cardiac output can rise to 20–25 L/min, and higher in elite endurance athletes.</p>

<h3>Acute and chronic responses</h3>
${table(['Measure', 'During exercise (acute)', 'After training (chronic, at rest)'], [
  ['Heart rate', 'Increases (and rises slightly just before exercise: the anticipatory rise)', 'Decreases (e.g. from 72 to 55 bpm)'],
  ['Stroke volume', 'Increases', 'Increases'],
  ['Cardiac output', 'Increases', 'Unchanged at rest; higher maximum'],
  ['Systolic BP', 'Increases', 'Decreases or normalises'],
  ['Diastolic BP', 'Little change in aerobic exercise; can rise sharply with heavy resistance', 'Decreases or normalises'],
])}

<h3>Long-term adaptations to aerobic training</h3>
<ul>
  <li><strong>Heart</strong>: the left ventricle enlarges and gets stronger (cardiac hypertrophy), so stroke volume increases and resting heart rate falls. Heart rate recovers faster after exercise.</li>
  <li><strong>Blood</strong>: blood volume and plasma volume increase; more red blood cells and haemoglobin in total.</li>
  <li><strong>Vessels</strong>: more capillaries in muscles (capillarisation); arteries stay more elastic; better blood lipid profile (higher HDL, lower triglycerides).</li>
  <li><strong>Lungs</strong>: stronger breathing muscles and more efficient gas exchange.</li>
  <li><strong>Muscles</strong>: more mitochondria and aerobic enzymes; better use of fat as fuel.</li>
  <li><strong>Health</strong>: lower risk of coronary heart disease, stroke, type 2 diabetes and high blood pressure; improved insulin sensitivity.</li>
</ul>

${callout('pt', 'Trainer application', '<p>Tracking a client\'s resting heart rate (first thing in the morning) over weeks is a simple way to show progress. A resting rate that is unusually raised for several days can signal illness, poor sleep or overtraining.</p>')}

${quiz([
  ['State the formula for cardiac output.', 'Cardiac output = heart rate × stroke volume.'],
  ['What happens to resting heart rate after months of aerobic training, and why?', 'It falls, because the stronger heart pumps more blood per beat (higher stroke volume).'],
  ['Calculate cardiac output for HR 150 bpm and SV 120 ml.', '18,000 ml/min (18 L/min).'],
  ['What is capillarisation?', 'An increase in the number of capillaries, improving oxygen delivery to muscles.'],
])}`,
  },
  {
    id: 'energy-systems', group: 'Energy systems', title: 'Energy systems',
    summary: 'ATP, the creatine phosphate, lactate and aerobic systems, the energy continuum',
    body: `
<p>Muscles run on <strong>adenosine triphosphate (ATP)</strong>. Breaking off one phosphate releases energy and leaves adenosine diphosphate (ADP). Muscles store only enough ATP for about 2 seconds of hard work, so it must be continuously rebuilt by three energy systems.</p>
<p>All three are always working; the one that <strong>predominates</strong> depends on intensity and duration.</p>

${table(['', 'Creatine phosphate (ATP-PC)', 'Lactate (anaerobic glycolysis)', 'Aerobic (oxidative)'], [
  ['Oxygen needed?', 'No (anaerobic, alactic)', 'No (anaerobic)', 'Yes'],
  ['Fuel', 'Creatine phosphate stored in muscle', 'Glucose / muscle glycogen', 'Carbohydrate and fat (a little protein)'],
  ['Where in the cell', 'Cytoplasm', 'Cytoplasm', 'Mitochondria'],
  ['Rate of ATP production', 'Very fast', 'Fast', 'Slow'],
  ['Amount of ATP', 'Very limited', 'Limited (about 2 ATP per glucose)', 'Very large (about 30–32 ATP per glucose; far more per fatty acid)'],
  ['By-products', 'None that cause fatigue', 'Lactate and hydrogen ions (H⁺) causing acidity and the "burn"', 'Carbon dioxide, water, heat'],
  ['Predominant duration', 'Up to about 10 seconds', 'About 10 seconds to 2–3 minutes', 'Beyond about 2–3 minutes'],
  ['Intensity', 'Maximal (95–100%)', 'High (about 60–95%)', 'Low to moderate'],
  ['Recovery', 'About 50% in 30 s; nearly full in 3–5 min', 'Lactate cleared in about 30–60 min (faster with an active recovery)', 'Refuel with food and drink'],
  ['Examples', '1RM lift, 100 m sprint, jump, tennis serve', '400 m run, 1-minute hard interval, high-rep set to failure', 'Walking, jogging, long cycle or swim, rest'],
])}

<h3>Lactate and fatigue</h3>
<p>As intensity rises, lactate is produced faster than it can be cleared. The point where blood lactate starts to rise sharply is the <strong>lactate threshold</strong>; the point where it accumulates rapidly (around 4 mmol/L) is called <strong>OBLA (onset of blood lactate accumulation)</strong>. Fatigue at this level is caused mainly by hydrogen ions (acidity) and other metabolites, not by lactate itself. Lactate is actually recycled as a fuel by the heart, liver and other muscles.</p>
<p>Interval training raises the lactate threshold, so clients can work harder before fatigue sets in.</p>

<h3>The energy continuum</h3>
<p>Activities sit on a continuum from mostly anaerobic to mostly aerobic. Team sports such as football use all three: sprints (ATP-PC), repeated hard efforts (lactate) and lots of jogging and recovery (aerobic).</p>

<h3>Fuel use: fat and carbohydrate</h3>
<ul>
  <li>At rest and at low intensity, a higher <em>percentage</em> of energy comes from fat.</li>
  <li>As intensity increases, carbohydrate supplies more of the energy, because it can be broken down faster.</li>
  <li>For fat loss, total energy expenditure matters far more than the percentage from fat, which is why the "fat-burning zone" is largely a myth.</li>
</ul>

${note('<p>Some materials describe the creatine phosphate system as "anaerobic lactate". It is the <strong>alactic</strong> anaerobic system: it produces no lactate. The lactate system is anaerobic glycolysis.</p>')}

${quiz([
  ['What is ATP and why must it be constantly rebuilt?', 'Adenosine triphosphate, the energy currency of muscle. Only about 2 seconds\' worth is stored.'],
  ['Which energy system predominates in a 30-second all-out sprint?', 'The lactate system (anaerobic glycolysis), after the first few seconds of ATP-PC.'],
  ['What are the by-products of the aerobic system?', 'Carbon dioxide, water and heat.'],
  ['How long does creatine phosphate take to recover almost fully?', 'About 3–5 minutes (about half in 30 seconds).'],
  ['Why is carbohydrate used more than fat at high intensity?', 'It can be broken down and turned into ATP faster.'],
])}`,
  },
  {
    id: 'oxygen-uptake', group: 'Energy systems', title: 'Oxygen uptake, VO₂ max & METs',
    summary: 'VO₂ max, METs, oxygen deficit and EPOC',
    body: `
<h3>Oxygen uptake (VO₂)</h3>
<p>The amount of oxygen the body uses, usually given in millilitres per kilogram of body weight per minute (ml/kg/min). At rest it is about <strong>3.5 ml/kg/min</strong>, which is defined as <strong>1 MET</strong> (metabolic equivalent).</p>

<h3>METs</h3>
${table(['Intensity', 'METs', 'Examples'], [
  ['Light', 'Less than 3', 'Slow walking, light housework'],
  ['Moderate', '3 to 6', 'Brisk walking, easy cycling, doubles tennis'],
  ['Vigorous', 'More than 6', 'Running, fast cycling, swimming lengths, singles tennis'],
])}
<p>UK guidance (150 minutes moderate or 75 minutes vigorous a week) is based on these bands.</p>

<h3>VO₂ max</h3>
<p>The maximum rate at which a person can take in, transport and use oxygen. It is the best single measure of aerobic (cardiorespiratory) fitness. Typical values: about 30–45 ml/kg/min for untrained adults; 70–90 for elite endurance athletes. It is influenced by genetics, age (declining roughly 10% per decade after 30 without training), sex, body composition and training. A high VO₂ max doesn't guarantee winning: lactate threshold, efficiency and motivation matter too.</p>
<p>VO₂ max is measured directly in a lab, or estimated with field tests such as the Rockport walk test or a multistage fitness test (see ${kb('assessment', 'fitness-tests', 'fitness tests')}).</p>

<h3>Oxygen deficit and EPOC</h3>
<ul>
  <li>At the start of exercise, the aerobic system takes a few minutes to catch up, so anaerobic systems fill the gap: the <strong>oxygen deficit</strong>. A gradual warm-up reduces it.</li>
  <li>After exercise, oxygen use stays raised to replace creatine phosphate, clear lactate, reload oxygen stores, and cool the body: <strong>excess post-exercise oxygen consumption (EPOC)</strong>, sometimes called the "afterburn" or "oxygen debt".</li>
  <li>EPOC is larger after high-intensity exercise, but adds a fairly small number of calories overall.</li>
</ul>

${quiz([
  ['What is 1 MET?', 'Resting oxygen consumption, about 3.5 ml/kg/min.'],
  ['What MET range counts as moderate activity?', '3 to 6 METs.'],
  ['Define VO₂ max.', 'The maximum rate at which the body can take in, transport and use oxygen.'],
  ['What is EPOC?', 'Excess post-exercise oxygen consumption: raised oxygen use after exercise for recovery processes.'],
])}`,
  },
  {
    id: 'endocrine', group: 'Endocrine system', title: 'The endocrine system',
    summary: 'Glands, key hormones and their roles in exercise',
    body: `
<p>The endocrine system is a network of glands that release <strong>hormones</strong> (chemical messengers) into the blood. Hormones act on target cells with matching receptors. The system controls growth, metabolism, reproduction, the stress response and <strong>homeostasis</strong> (keeping the internal environment stable). It works more slowly than the nervous system but its effects last longer.</p>
<p>Endocrine glands release hormones directly into the blood. Exocrine glands (sweat, salivary) release their products through ducts.</p>

${table(['Gland', 'Key hormones', 'Main effects'], [
  ['<strong>Hypothalamus</strong> (brain)', 'Releasing hormones', 'Links the nervous and endocrine systems; controls the pituitary'],
  ['<strong>Pituitary</strong> ("master gland")', 'Growth hormone (GH), TSH, ACTH, FSH, LH, ADH', 'Controls other glands; GH promotes growth, protein synthesis and fat breakdown; ADH controls water balance'],
  ['<strong>Pineal</strong>', 'Melatonin', 'Sleep–wake cycle'],
  ['<strong>Thyroid</strong>', 'Thyroxine (T4), triiodothyronine (T3); calcitonin', 'Sets metabolic rate; calcitonin lowers blood calcium'],
  ['<strong>Parathyroids</strong>', 'Parathyroid hormone (PTH)', 'Raises blood calcium (releases it from bone)'],
  ['<strong>Thymus</strong>', 'Thymosin', 'Development of immune (T) cells, mainly in childhood'],
  ['<strong>Adrenal glands</strong>', 'Adrenaline and noradrenaline (medulla); cortisol and aldosterone (cortex)', 'Fight-or-flight: raise heart rate, BP and fuel release. Cortisol: stress hormone, raises blood glucose, breaks down tissue (catabolic) and reduces inflammation. Aldosterone: sodium and water balance'],
  ['<strong>Pancreas</strong>', 'Insulin, glucagon', 'Insulin lowers blood glucose (moves it into cells and storage); glucagon raises it (releases liver glycogen)'],
  ['<strong>Ovaries</strong>', 'Oestrogen, progesterone (and relaxin in pregnancy)', 'Female characteristics; oestrogen protects bone'],
  ['<strong>Testes</strong>', 'Testosterone', 'Male characteristics; muscle and bone growth (anabolic)'],
])}

<h3>Hormones and exercise</h3>
<ul>
  <li><strong>During exercise</strong>: adrenaline, noradrenaline, glucagon, cortisol and growth hormone rise to release fuel; insulin falls. Muscles can take up glucose during exercise without much insulin, which is why exercise helps blood sugar control.</li>
  <li><strong>Long term</strong>: improved insulin sensitivity; a better hormonal response to stress.</li>
  <li><strong>Anabolic</strong> hormones (testosterone, growth hormone, insulin) build tissue; <strong>catabolic</strong> hormones (cortisol, glucagon) break it down. Chronic stress, poor sleep and overtraining keep cortisol raised, hindering recovery.</li>
</ul>

<h3>Common endocrine conditions</h3>
<ul>
  <li><strong>Type 1 diabetes</strong>: the pancreas makes little or no insulin (autoimmune).</li>
  <li><strong>Type 2 diabetes</strong>: the body becomes resistant to insulin. Strongly linked to inactivity and excess body fat; exercise is a key treatment.</li>
  <li><strong>Hypothyroidism</strong> (underactive thyroid: tiredness, weight gain, feeling cold) and <strong>hyperthyroidism</strong> (overactive, e.g. Graves\' disease: weight loss, raised heart rate).</li>
  <li><strong>Addison\'s disease</strong> (low cortisol) and <strong>Cushing\'s syndrome</strong> (excess cortisol).</li>
</ul>
<p>See ${kb('special-pops', 'diabetes', 'diabetes')} for exercise guidance.</p>

${quiz([
  ['What is a hormone?', 'A chemical messenger released into the blood by a gland, acting on target cells.'],
  ['Which two pancreatic hormones control blood glucose?', 'Insulin (lowers it) and glucagon (raises it).'],
  ['Which gland is called the "master gland"?', 'The pituitary.'],
  ['Name an anabolic and a catabolic hormone.', 'Anabolic: testosterone or growth hormone. Catabolic: cortisol.'],
  ['What is the difference between type 1 and type 2 diabetes?', 'Type 1: little or no insulin is produced. Type 2: the body becomes resistant to insulin.'],
])}`,
  },
  {
    id: 'adaptations', group: 'Training adaptations', title: 'Effects of exercise on the body',
    summary: 'Acute and chronic effects of aerobic and resistance training, DOMS',
    body: `
${table(['System', 'Aerobic training', 'Resistance training'], [
  ['<strong>Cardiovascular</strong>', 'Larger, stronger heart; higher stroke volume; lower resting HR; more blood volume and capillaries; lower BP', 'Modest reduction in resting BP; stronger heart wall'],
  ['<strong>Respiratory</strong>', 'Stronger breathing muscles; more efficient gas exchange', 'Little change'],
  ['<strong>Muscular</strong>', 'More mitochondria, aerobic enzymes and capillaries; mainly Type 1 fibres adapt; better fat use', 'Hypertrophy (bigger myofibrils and fibres, mainly Type 2); more strength and power; more creatine phosphate and glycogen; better neural recruitment'],
  ['<strong>Skeletal</strong>', 'Weight-bearing activity maintains bone density', 'Greater increases in bone density; stronger tendons and ligaments'],
  ['<strong>Metabolic</strong>', 'Better insulin sensitivity and blood lipids; reduced body fat', 'Better insulin sensitivity; more muscle mass raises resting metabolic rate slightly'],
  ['<strong>Psychological</strong>', 'Reduced stress, anxiety and depression; better sleep and self-esteem', 'Same, plus improved body image and confidence'],
])}

<h3>Short-term (acute) effects</h3>
<ul>
  <li>Raised heart rate, breathing rate, blood pressure (systolic) and body temperature.</li>
  <li>Vasodilation in working muscles; blood redirected from the gut.</li>
  <li>More synovial fluid; increased range of movement.</li>
  <li>Sweating; fatigue; muscle "pump".</li>
</ul>

<h3>Delayed onset muscle soreness (DOMS)</h3>
<ul>
  <li>Muscle soreness and stiffness that starts 12–24 hours after unaccustomed exercise and peaks around 24–72 hours.</li>
  <li>Caused mainly by eccentric work (lowering, downhill running) and new exercises or big jumps in volume. Linked to micro-damage in muscle and the resulting inflammation; not caused by lactic acid.</li>
  <li>Not a reliable sign of a good workout. Severe DOMS can put beginners off exercise, so progress volume gradually.</li>
  <li>The <strong>repeated bout effect</strong>: after one bout, the same exercise causes much less soreness next time.</li>
  <li>Light activity eases symptoms.</li>
</ul>

<h3>Overtraining</h3>
<p>Too much training with too little recovery leads to falling performance, persistent fatigue, raised resting heart rate, poor sleep, mood changes, frequent illness and injuries. Plan rest days and lighter weeks, and watch for warning signs.</p>

${quiz([
  ['Give three long-term effects of aerobic training on the heart.', 'Larger and stronger left ventricle, increased stroke volume, lower resting heart rate.'],
  ['Which type of muscle action causes the most DOMS?', 'Eccentric.'],
  ['When does DOMS typically peak?', 'Around 24–72 hours after exercise.'],
  ['Name two long-term effects of resistance training on the skeletal system.', 'Increased bone density and stronger tendons and ligaments.'],
])}`,
  },
];
