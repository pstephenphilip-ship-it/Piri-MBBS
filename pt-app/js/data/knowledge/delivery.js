// Instructing & delivering sessions, special populations, health & safety — Level 3 Diploma syllabus, in our own words.
import { table, callout, quiz, kb } from './_helpers.js';

export const INSTRUCTING = [
  {
    id: 'session-prep', group: 'Delivering sessions', title: 'Preparing for a session',
    summary: 'Preparing yourself, the environment and the client',
    body: `
<h3>Preparing yourself</h3>
<ul>
  <li>Arrive early; be professionally dressed with a watch, notes, programme and pen or app.</li>
  <li>Review the client's notes, last session and any health changes.</li>
</ul>
<h3>Preparing the environment</h3>
<ul>
  <li>Check equipment is safe and available (cables, pins, collars, benches), the space is clear and the temperature and ventilation are suitable.</li>
  <li>Know the emergency procedures, first aid kit and defibrillator (AED) location.</li>
</ul>
<h3>When the client arrives</h3>
<ul>
  <li>Welcome them; ask how they're feeling, about sleep, food and fluid, soreness, illness or medication changes.</li>
  <li>Check suitable clothing and footwear and that they have water.</li>
  <li>Explain the session plan and its purpose; agree any changes.</li>
</ul>
${quiz([
  ['Name three things to check with a client on arrival.', 'For example: how they feel, any illness or injury, medication changes, food and fluid, footwear.'],
  ['Name two equipment checks before a session.', 'For example: cables and pins secure, collars available, benches stable, space clear.'],
])}`,
  },
  {
    id: 'instructing', group: 'Delivering sessions', title: 'Instructing exercise',
    summary: 'Demonstrations, teaching points, cueing, learning styles, feedback',
    body: `
<h3>Teaching a new exercise</h3>
<ol>
  <li><strong>Name</strong> the exercise and explain its purpose.</li>
  <li><strong>Demonstrate</strong> it silently at normal speed, then slowly with 2–3 key teaching points, from the best viewing angle.</li>
  <li>Client <strong>performs</strong> it with light or no load.</li>
  <li><strong>Observe</strong> from different angles and give <strong>feedback</strong>: praise what's good, correct one point at a time.</li>
  <li><strong>Check understanding</strong> and progress the load gradually.</li>
</ol>
<h3>Communication methods</h3>
${table(['Verbal', 'Visual', 'Physical'], [
  ['Clear, concise instructions; teaching points; cueing (e.g. "chest up", "push the floor away"); counting reps; motivation and praise', 'Demonstrations, mirroring, hand signals, body language, eye contact, facial expressions', 'Light touch to guide position, only with permission'],
])}
<h3>Learning styles (VAK)</h3>
${table(['Style', 'Learns best by', 'Use'], [
  ['<strong>Visual</strong>', 'Seeing', 'Demonstrations, diagrams, videos, mirrors'],
  ['<strong>Auditory</strong>', 'Hearing', 'Clear verbal explanations and cues'],
  ['<strong>Kinaesthetic</strong>', 'Doing and feeling', 'Practice, "feel your glutes working", guided movement'],
])}
<p>Most people benefit from a mix.</p>
<h3>Cueing</h3>
<ul>
  <li><strong>External cues</strong> (focus on the environment or outcome: "push the floor away", "drive the bar to the ceiling") often improve performance.</li>
  <li><strong>Internal cues</strong> (focus on the body: "squeeze your glutes") help awareness of target muscles.</li>
  <li>Keep cues short, positive and specific.</li>
</ul>
<h3>Feedback and motivation</h3>
<ul>
  <li>Give specific praise ("great depth on that rep") rather than generic praise.</li>
  <li>Use the "praise, correct, praise" approach.</li>
  <li>Adjust voice volume to the setting; use positive language and visual imagery.</li>
  <li>Use key performance markers to show progress.</li>
</ul>
<h3>Teaching positions</h3>
<p>Position yourself where you can see the key joints and the whole client, move around to observe from the front and side, and stay close enough to assist.</p>
${quiz([
  ['List the steps for teaching a new exercise.', 'Name and explain, demonstrate, client performs, observe and give feedback, check understanding.'],
  ['What does VAK stand for?', 'Visual, auditory, kinaesthetic.'],
  ['Give an example of an external cue for a squat.', 'For example: "push the floor away" or "sit back to the box".'],
])}`,
  },
  {
    id: 'adapting', group: 'Delivering sessions', title: 'Monitoring & adapting exercise',
    summary: 'Regressions, progressions, monitoring safety and ending the session',
    body: `
<h3>When to adapt</h3>
${table(['Situation', 'Possible adaptation'], [
  ['Poor technique', 'Reduce load or range; regress (e.g. box squat, incline press-up); give a different cue'],
  ['Too intense', 'Lower load, speed or reps; longer rests; simpler exercise'],
  ['Not intense enough', 'Increase load, reps or tempo; reduce rest; harder variation'],
  ['Client is tired or unwell', 'Lighter session, more mobility; stop if unwell'],
  ['Pain', 'Stop that exercise; try a pain-free alternative; refer if it persists'],
  ['Special population needs or body size', 'Adjust equipment, positions and intensity (e.g. avoid lying flat in later pregnancy)'],
])}
<h3>Monitoring during sessions</h3>
<p>Watch technique, breathing, colour, sweating and facial expression; ask about RPE and how they feel; use heart rate where useful; watch for signs of overexertion (dizziness, nausea, unusual breathlessness, chest pain).</p>
<h3>Ending the session</h3>
<ul>
  <li>Cool down, then give feedback on the session and progress.</li>
  <li>Ask how they felt; answer questions; set "homework" (activity, nutrition or mobility).</li>
  <li>Book the next session; leave equipment and area tidy.</li>
  <li>Record the session (loads, reps, observations).</li>
</ul>
<h3>Personal reflection</h3>
<p>After each session, ask yourself: what went well, what could be better, did the session meet the objectives, and what will I change next time? Reflection drives your development as a trainer.</p>
${quiz([
  ['A client\'s squat technique breaks down. Name two adaptations.', 'For example: reduce load, shorten range, use a box squat, change the cue.'],
  ['What should you do if a client feels pain during an exercise?', 'Stop the exercise, try a pain-free alternative and refer if it persists.'],
  ['Name three things to do at the end of a session.', 'For example: cool down, give feedback, set homework, book the next session, record the session.'],
])}`,
  },
];

export const SPECIAL_POPS = [
  {
    id: 'contraindications', group: 'Overview', title: 'Contraindications & safe exercise',
    summary: 'Exercises to avoid or adapt, and general principles',
    body: `
<p>A <strong>contraindication</strong> is a reason an exercise could do more harm than good for a particular person. An exercise that is fine for one client may be contraindicated for another.</p>
${table(['Exercise or practice', 'Concern', 'Safer alternative'], [
  ['Full sit-ups with feet anchored', 'Hip flexors pull on the lumbar spine; repeated loaded flexion', 'Curl-ups, dead bugs, planks'],
  ['Straight-leg sit-ups / double leg raises (beginners)', 'High lumbar stress', 'Bent-knee variations'],
  ['Behind-the-neck press or pulldown', 'Stresses shoulder capsule; neck flexion', 'Press or pull to the front'],
  ['Ballistic stretching', 'Stretch reflex; tissue injury', 'Static or dynamic stretching'],
  ['Deep knee bends under load (if knee issues)', 'Joint load', 'Partial range, then progress'],
  ['Breath-holding with heavy loads (Valsalva)', 'Blood pressure spikes', 'Exhale on effort'],
  ['Lying flat on the back after about 16 weeks of pregnancy', 'Pressure on the vena cava can cause dizziness', 'Inclined or side-lying positions'],
])}
<h3>General principles for special populations</h3>
<ul>
  <li>Screen thoroughly; get medical clearance and guidance where needed.</li>
  <li>Start low and progress slowly; use RPE.</li>
  <li>Longer warm-ups and cool-downs.</li>
  <li>Know your scope: some groups need specialist (e.g. Level 4) qualifications.</li>
</ul>
${quiz([
  ['What is a contraindication?', 'A reason an exercise could do more harm than good for a particular person.'],
  ['Why are anchored full sit-ups often avoided?', 'The hip flexors pull strongly on the lumbar spine.'],
])}`,
  },
  {
    id: 'older-adults', group: 'Populations', title: 'Older adults',
    summary: 'Ageing changes and how to programme for them',
    body: `
<h3>Changes with ageing</h3>
<ul>
  <li>Loss of muscle and strength (sarcopenia), especially power; reduced bone density.</li>
  <li>Stiffer joints and reduced range of movement; more osteoarthritis.</li>
  <li>Lower maximum heart rate and VO₂ max; higher blood pressure.</li>
  <li>Slower reactions, poorer balance and vision: higher risk of falls.</li>
  <li>More likely to have medical conditions and take medication.</li>
</ul>
<h3>Programming</h3>
<ul>
  <li><strong>Strength training</strong> 2+ days a week (all major muscles), including some power work (moving with intent) once technique is good.</li>
  <li><strong>Balance</strong> training (progressing from support to unsupported, static to dynamic) to reduce falls.</li>
  <li>Weight-bearing and, where suitable, impact for bone.</li>
  <li>Aerobic activity at moderate intensity (RPE).</li>
  <li>Longer warm-ups; avoid sudden changes of position (dizziness); allow longer recovery.</li>
  <li>Teaching: clear demonstrations, repeat key points, be patient and encouraging.</li>
</ul>
${quiz([
  ['What are the two most important components to include for falls prevention?', 'Strength (especially of the legs) and balance training.'],
  ['Why avoid rapid changes of position with older clients?', 'They are more prone to postural hypotension and dizziness.'],
])}`,
  },
  {
    id: 'pre-postnatal', group: 'Populations', title: 'Pre- and postnatal clients',
    summary: 'Benefits, guidelines, warning signs and returning after birth',
    body: `
<p>Regular moderate exercise in an uncomplicated pregnancy is safe and beneficial: it reduces risk of gestational diabetes, pre-eclampsia and excessive weight gain, and improves mood, sleep and fitness. Guidelines suggest 150 minutes of moderate activity a week plus muscle strengthening twice a week.</p>
<h3>Guidelines</h3>
<ul>
  <li>Screen carefully; get clearance from the GP or midwife if there are any complications.</li>
  <li>Use RPE and the talk test (heart rate is less reliable).</li>
  <li>Avoid lying flat on the back for long periods after about 16 weeks.</li>
  <li>Avoid contact sports, activities with a risk of falling, scuba diving, exercise at high altitude, and overheating (stay hydrated; avoid hot, humid conditions).</li>
  <li>Relaxin increases joint laxity: avoid developmental and ballistic stretching and extreme ranges.</li>
  <li>Include pelvic floor exercises; avoid heavy straining and breath-holding.</li>
  <li>As the bump grows, avoid exercises that bulge the abdomen (e.g. full crunches, front planks if doming appears).</li>
</ul>
${callout('warn', 'Stop exercising and seek medical advice if', '<ul><li>Vaginal bleeding or fluid leakage.</li><li>Chest pain, dizziness, headache, or breathlessness before exertion.</li><li>Calf pain or swelling.</li><li>Regular painful contractions.</li><li>Reduced fetal movement.</li></ul>')}
<h3>Postnatal</h3>
<ul>
  <li>Gentle walking, breathing and pelvic floor exercises can start soon after an uncomplicated birth.</li>
  <li>Progress after the 6–8 week postnatal check, or later after a caesarean section.</li>
  <li>Screen for diastasis recti, pelvic floor problems (leaking, heaviness) and back pain; refer to a pelvic health physiotherapist if present.</li>
  <li>Avoid high-impact exercise and heavy lifting until pelvic floor and core function are restored (often around 12 weeks or more).</li>
  <li>Consider sleep deprivation, breastfeeding (supportive bra, feed before exercise) and fitting around childcare.</li>
</ul>
${quiz([
  ['Why avoid lying on the back for long periods later in pregnancy?', 'The weight of the uterus can compress the vena cava, reducing blood return and causing dizziness.'],
  ['Which hormone increases joint laxity in pregnancy?', 'Relaxin.'],
  ['Name three warning signs to stop exercise in pregnancy.', 'For example: vaginal bleeding, chest pain, dizziness, calf pain or swelling, regular contractions, reduced fetal movement.'],
])}`,
  },
  {
    id: 'young-people', group: 'Populations', title: 'Children & young people',
    summary: 'Physiological differences and safe training guidelines',
    body: `
<h3>How children differ</h3>
<ul>
  <li><strong>Growth plates</strong> are the weakest part of the growing skeleton.</li>
  <li><strong>Temperature regulation</strong> is less efficient: they overheat and get cold more easily, and should drink regularly.</li>
  <li>Lower capacity for anaerobic (lactate) work; they recover quickly from short bursts.</li>
  <li>Motor skills and coordination are still developing; growth spurts can temporarily affect coordination and flexibility.</li>
</ul>
<h3>Guidelines</h3>
<ul>
  <li>Aim for an average of 60 minutes a day of moderate-to-vigorous activity, including bone- and muscle-strengthening activities.</li>
  <li>Emphasise fun, variety and fundamental movement skills (running, jumping, throwing, balancing).</li>
  <li>Resistance training is safe with qualified supervision, correct technique and appropriate loads: progress gradually, and avoid maximal lifts until technique and maturity allow.</li>
  <li>Avoid excessive repetitive training and early specialisation in one sport.</li>
  <li>Use correctly sized equipment; match by size and maturity in contact activities.</li>
  <li>Children can't judge "mild tension" well: avoid forced stretching.</li>
  <li>Follow safeguarding policies (see ${kb('safety', 'safeguarding', 'safeguarding')}).</li>
</ul>
${quiz([
  ['Why must children be monitored for temperature during exercise?', 'Their temperature regulation is less efficient, so they overheat or get cold more easily.'],
  ['Is resistance training safe for children?', 'Yes, with qualified supervision, good technique and appropriate, gradually progressed loads.'],
])}`,
  },
  {
    id: 'disabled-clients', group: 'Populations', title: 'Disabled clients & neurological conditions',
    summary: 'Inclusive practice, physical and sensory impairments, neurological conditions',
    body: `
<h3>Inclusive practice</h3>
<ul>
  <li>Focus on what the client can do; ask them about their needs and preferences: they are the expert on their condition.</li>
  <li>Use accessible facilities and equipment (e.g. Inclusive Fitness accredited gyms).</li>
  <li>Adapt communication: face clients who lip-read; describe demonstrations for visually impaired clients and orient them to the space; give one instruction at a time where needed.</li>
</ul>
<h3>Considerations</h3>
${table(['Issue', 'Considerations'], [
  ['<strong>Spasticity</strong> (involuntary muscle tightness, e.g. after stroke, cerebral palsy, MS)', 'Slow, controlled movements; stretching; avoid triggering spasms with fast movements or cold'],
  ['<strong>Loss of sensation</strong> (e.g. spinal cord injury, diabetes)', 'Check skin for pressure sores and blisters, as the client may not feel them; check footwear and padding'],
  ['<strong>Wheelchair users</strong>', 'Upper body strength and shoulder health (balance pushing with pulling); transfer safety; temperature regulation may be impaired'],
  ['<strong>Visual or hearing impairment</strong>', 'Adapt instruction methods; clear pathways; consistent equipment layout'],
  ['<strong>Fatigue and depression</strong>', 'Common in many conditions; flexible plans; exercise helps mood but may be harder to sustain'],
])}
<h3>Neurological conditions</h3>
${table(['Condition', 'Key points for exercise'], [
  ['<strong>Stroke</strong>', 'Often one-sided weakness and balance problems; follow rehab team guidance; supported balance and functional strength'],
  ['<strong>Multiple sclerosis (MS)</strong>', 'Fatigue and heat sensitivity: avoid overheating, plan rest; strength and balance work help'],
  ['<strong>Parkinson\'s disease</strong>', 'Slowness, tremor, stiffness, falls risk; large, rhythmic movements, balance and strength training are beneficial'],
  ['<strong>Epilepsy</strong>', 'Most people can exercise; know their triggers and seizure plan; avoid activities where a seizure would be dangerous (e.g. unsupervised swimming, climbing at height)'],
  ['<strong>Cerebral palsy</strong>', 'Varies widely; spasticity and coordination; individualised strength and flexibility'],
])}
<p>Work within your competence and refer to, or work alongside, specialists (physiotherapists, Level 4 instructors) for complex needs.</p>
${quiz([
  ['Why must you check skin for clients with loss of sensation?', 'They may not feel blisters or pressure sores developing.'],
  ['What is a key consideration for clients with MS?', 'Fatigue and heat sensitivity: avoid overheating and plan rest.'],
  ['Who is the best source of information about a disabled client\'s needs?', 'The client themselves (alongside their healthcare team).'],
])}`,
  },
  {
    id: 'hypertension', group: 'Conditions', title: 'Hypertension',
    summary: 'Exercise guidelines for high blood pressure',
    body: `
<ul>
  <li>Get GP clearance if resting BP is 160/100 or above (or per your policy); don't exercise at 180/110 or above.</li>
  <li>Aerobic exercise at moderate intensity most days lowers blood pressure; resistance and isometric training help too.</li>
  <li>Continuous breathing; avoid breath-holding, heavy maximal lifts, long isometric holds and working to failure.</li>
  <li>Avoid head-below-heart positions; get up slowly from the floor.</li>
  <li>Beta blockers lower heart rate: use RPE. Some medicines (e.g. diuretics) affect hydration.</li>
  <li>Long warm-ups and cool-downs.</li>
</ul>
<p>See ${kb('physiology', 'blood-pressure', 'blood pressure')} for classifications.</p>
${quiz([
  ['Why use RPE for a client on beta blockers?', 'Beta blockers lower heart rate, so heart-rate targets are unreliable.'],
  ['Which training practice should hypertensive clients avoid?', 'Breath-holding (Valsalva) with heavy loads, maximal lifts and long isometric holds.'],
])}`,
  },
  {
    id: 'diabetes', group: 'Conditions', title: 'Diabetes',
    summary: 'Type 1 and type 2, hypoglycaemia, exercise precautions',
    body: `
<ul>
  <li><strong>Type 1</strong>: little or no insulin; managed with insulin. <strong>Type 2</strong>: insulin resistance; managed with lifestyle, tablets and sometimes insulin. Exercise improves insulin sensitivity and blood glucose control in both.</li>
  <li>Aim for regular aerobic and resistance training (most days; no more than 2 days without activity).</li>
</ul>
${callout('warn', 'Hypoglycaemia (low blood sugar)', '<p>Risk is highest for clients on insulin or some tablets (e.g. sulphonylureas). Signs: shakiness, sweating, hunger, pale skin, confusion, irritability, blurred vision. Action: stop exercise; give fast-acting sugar (e.g. glucose tablets, a sugary drink or juice); recheck after 10–15 minutes; then a longer-acting carbohydrate snack. If they become unconscious, call 999 and don\'t give anything by mouth.</p>')}
<h3>Precautions</h3>
<ul>
  <li>Clients should check blood glucose before, during (for long sessions) and after exercise, and carry fast-acting sugar.</li>
  <li>Avoid exercise if glucose is very high with ketones present (type 1), or if they feel unwell; follow their diabetes team's advice.</li>
  <li>Hypoglycaemia can occur hours after exercise, including overnight.</li>
  <li>Check feet for blisters and sores (reduced sensation); wear good footwear.</li>
  <li>Be aware of related complications: eye problems (avoid heavy straining if retinopathy), heart disease, nerve damage.</li>
</ul>
${quiz([
  ['Name three signs of hypoglycaemia.', 'For example: shakiness, sweating, hunger, confusion, irritability, pale skin.'],
  ['What should you give a client with hypoglycaemia who is conscious?', 'Fast-acting sugar such as glucose tablets or a sugary drink, then a longer-acting carbohydrate snack.'],
  ['Why check the feet of diabetic clients?', 'Reduced sensation means they may not notice blisters or sores.'],
])}`,
  },
];

export const SAFETY = [
  {
    id: 'health-safety-law', group: 'Health & safety', title: 'Health & safety responsibilities',
    summary: 'Key legislation, employer and employee duties',
    body: `
<h3>Key UK legislation</h3>
${table(['Law / regulation', 'What it covers'], [
  ['<strong>Health and Safety at Work etc. Act 1974</strong>', 'The main law: employers must protect employees and others (members, visitors) as far as reasonably practicable; employees must take reasonable care'],
  ['<strong>Management of Health and Safety at Work Regulations 1999</strong>', 'Risk assessments; competent people; emergency procedures'],
  ['<strong>RIDDOR 2013</strong>', 'Reporting serious injuries, diseases and dangerous occurrences to the HSE'],
  ['<strong>COSHH 2002</strong>', 'Control of substances hazardous to health (e.g. cleaning chemicals)'],
  ['<strong>Manual Handling Operations Regulations 1992</strong>', 'Avoiding and assessing risky lifting'],
  ['<strong>Health and Safety (First-Aid) Regulations 1981</strong>', 'Adequate first aid provision'],
  ['<strong>PPE, electrical, noise, fire safety regulations</strong>', 'Protective equipment, safe electrical equipment, noise limits, fire risk assessment'],
  ['<strong>UK GDPR / Data Protection Act 2018</strong>', 'Handling personal and health data securely and lawfully'],
  ['<strong>Equality Act 2010</strong>', 'No discrimination; reasonable adjustments for disabled people'],
])}
<h3>Duties</h3>
${table(['Employers', 'Employees (including instructors)'], [
  ['Provide safe premises, equipment and systems of work; carry out risk assessments; provide training, information and supervision; first aid; emergency plans; insurance', 'Take reasonable care of themselves and others; follow procedures and training; report hazards, faults and incidents; use equipment correctly; don\'t misuse safety equipment'],
])}
<h3>Professional requirements</h3>
<ul>
  <li>Recognised qualification and continuing professional development (CPD).</li>
  <li>Professional registration (e.g. CIMSPA; previously REPs).</li>
  <li><strong>Public liability</strong> and <strong>professional indemnity insurance</strong>.</li>
  <li>Current first aid / CPR qualification.</li>
  <li><strong>Duty of care</strong>: acting as a reasonable, competent professional would to avoid foreseeable harm.</li>
</ul>
${quiz([
  ['Which act is the main UK health and safety law?', 'The Health and Safety at Work etc. Act 1974.'],
  ['What does RIDDOR require?', 'Reporting of serious injuries, diseases and dangerous occurrences to the HSE.'],
  ['Name two responsibilities of an employee.', 'For example: take reasonable care, follow procedures, report hazards and incidents.'],
])}`,
  },
  {
    id: 'risk-assessment', group: 'Health & safety', title: 'Risk assessment & manual handling',
    summary: 'Five steps to risk assessment, hazards in the gym, safe lifting',
    body: `
<p>A <strong>hazard</strong> is anything with the potential to cause harm; a <strong>risk</strong> is the likelihood that harm will occur and how severe it would be.</p>
<h3>Five steps to risk assessment (HSE)</h3>
<ol>
  <li>Identify the hazards.</li>
  <li>Decide who might be harmed and how.</li>
  <li>Evaluate the risks and decide on precautions.</li>
  <li>Record your significant findings.</li>
  <li>Review the assessment and update it when things change.</li>
</ol>
<p>Risk is often scored as <strong>likelihood × severity</strong> (e.g. each 1–5).</p>
<h3>Common gym hazards</h3>
<p>Trip hazards (weights and cables left out), wet floors, faulty equipment, overcrowding, poor ventilation or temperature, unsupervised or inexperienced users, sharp edges, chemicals, noise, and clients with health conditions.</p>
<h3>Exercise risk</h3>
<p>Each client's risk depends on their medical status, body type, fitness, occupation, lifestyle and the exercises chosen. Higher intensity, speed, resistance and complexity increase risk; low intensity, slow and controlled exercises reduce it.</p>
<h3>Manual handling</h3>
<ul>
  <li>Avoid lifting where possible; use trolleys or ask for help.</li>
  <li>Assess the load (weight, shape), the environment and yourself.</li>
  <li>Plan the route; stable base with feet apart; bend hips and knees; keep the load close; brace; avoid twisting (pivot with the feet); lift smoothly.</li>
  <li>Push rather than pull where possible.</li>
</ul>
${quiz([
  ['What are the five steps of a risk assessment?', 'Identify hazards; decide who might be harmed; evaluate risks and decide on precautions; record findings; review and update.'],
  ['What is the difference between a hazard and a risk?', 'A hazard can cause harm; risk is the likelihood and severity of that harm.'],
  ['Give three manual handling tips.', 'For example: keep the load close, bend hips and knees, avoid twisting, plan the route, get help.'],
])}`,
  },
  {
    id: 'emergencies', group: 'Health & safety', title: 'Emergency procedures',
    summary: 'Responding to accidents, illness, fire and evacuations',
    body: `
<h3>Types of emergency</h3>
<p>Accidents and injuries, sudden illness (cardiac arrest, asthma attack, hypoglycaemia, seizure, fainting), fire, bomb threats, power failure, structural damage, chemical spills, security incidents.</p>
<h3>Responding to an accident or sudden illness</h3>
<ol>
  <li><strong>Stay calm</strong> and assess the situation.</li>
  <li><strong>Make the area safe</strong> for you, the casualty and others (danger first).</li>
  <li>Assess the casualty (DRSABC: Danger, Response, Shout for help, Airway, Breathing, CPR / Circulation).</li>
  <li><strong>Get help</strong>: first aider, AED, call 999/112 if needed.</li>
  <li>Give first aid within your training.</li>
  <li><strong>Record and report</strong> the incident (incident/accident book; RIDDOR where required).</li>
</ol>
<h3>Calling 999: information to give</h3>
<p>Your location (exact address and entrance), what has happened, the number of casualties and their condition, any hazards, and your phone number. Send someone to meet the ambulance.</p>
${callout('warn', 'Cardiac arrest', '<p>Not responding and not breathing normally: call 999, start CPR (30 compressions to 2 breaths, or hands-only) and send for an AED immediately. Every minute without CPR and defibrillation reduces survival.</p>')}
<h3>Evacuation</h3>
<ul>
  <li>Know the alarm sounds, escape routes, assembly points and who is responsible for checking areas.</li>
  <li>Stop sessions immediately, guide clients out calmly, don\'t use lifts, don't stop for belongings.</li>
  <li>Give extra help to children, older people and disabled people (personal emergency evacuation plans, PEEPs).</li>
</ul>
${quiz([
  ['What does DRSABC stand for?', 'Danger, Response, Shout for help, Airway, Breathing, CPR/Circulation.'],
  ['What information should you give when calling 999?', 'Location, what happened, number and condition of casualties, hazards, and a contact number.'],
  ['What should be done after any incident?', 'Record and report it according to procedures.'],
])}`,
  },
  {
    id: 'safeguarding', group: 'Health & safety', title: 'Safeguarding children & vulnerable adults',
    summary: 'Types of abuse, signs, DBS checks and how to report concerns',
    body: `
<p>Safeguarding means protecting people's health, wellbeing and rights, and enabling them to live free from harm, abuse and neglect. Everyone working with children or vulnerable adults has a responsibility.</p>
<h3>DBS checks (England and Wales)</h3>
<ul>
  <li><strong>Basic</strong>: unspent convictions.</li>
  <li><strong>Standard</strong>: spent and unspent convictions and cautions.</li>
  <li><strong>Enhanced</strong>: as standard, plus relevant police information.</li>
  <li><strong>Enhanced with barred list checks</strong>: required for regulated activity with children or vulnerable adults.</li>
</ul>
<h3>Types of abuse</h3>
${table(['Type', 'Examples', 'Possible signs'], [
  ['<strong>Physical</strong>', 'Hitting, shaking, burning, misusing medication', 'Unexplained injuries, flinching, covering up arms and legs, fear of going home'],
  ['<strong>Emotional / psychological</strong>', 'Threats, humiliation, constant criticism, isolation', 'Withdrawn, anxious, low self-esteem, aggressive outbursts'],
  ['<strong>Sexual</strong>', 'Any non-consensual or inappropriate sexual activity', 'Inappropriate knowledge or behaviour, fear of certain people, physical symptoms'],
  ['<strong>Neglect</strong>', 'Failing to provide food, care, hygiene, medical help', 'Hungry, dirty, unsuitable clothing, untreated injuries'],
  ['<strong>Financial</strong> (adults)', 'Theft, fraud, pressure over money', 'Unexplained lack of money, missing belongings'],
  ['<strong>Discriminatory</strong>', 'Abuse based on race, sex, disability, religion, etc.', 'Withdrawal, distress'],
  ['<strong>Bullying and harassment</strong>', 'Repeated intimidation, including online', 'Avoiding sessions, mood changes'],
])}
<h3>Good practice</h3>
<ul>
  <li>Work in open, visible areas; avoid being alone with a child; get parental consent.</li>
  <li>Use appropriate touch only when necessary and with permission.</li>
  <li>Follow your organisation's safeguarding policy and code of conduct.</li>
</ul>
<h3>If you suspect abuse or someone discloses it</h3>
<ol>
  <li>Stay calm; listen; take it seriously.</li>
  <li>Don't promise to keep it secret; explain you must pass it on to people who can help.</li>
  <li>Don't ask leading questions or investigate yourself.</li>
  <li>Record what was said and seen, factually, with date and time, in the person's own words.</li>
  <li>Report to your designated safeguarding lead promptly (or police / social services if someone is in immediate danger: call 999).</li>
  <li>Keep information confidential and share it only on a need-to-know basis.</li>
</ol>
${quiz([
  ['Which DBS check is needed for regulated activity with children?', 'An enhanced check with barred list checks.'],
  ['Name four types of abuse.', 'For example: physical, emotional, sexual, neglect, financial, discriminatory.'],
  ['Should you promise to keep a disclosure secret?', 'No. Explain that you must share it with those who can help.'],
  ['Who should you report safeguarding concerns to?', 'Your organisation\'s designated safeguarding lead (or emergency services if there is immediate danger).'],
])}`,
  },
  {
    id: 'data', group: 'Professional practice', title: 'Client data & confidentiality',
    summary: 'UK GDPR principles for trainers',
    body: `
<ul>
  <li>Health information is <strong>special category data</strong> under UK GDPR and needs extra protection.</li>
  <li>Collect only what you need, explain why, and get clear consent.</li>
  <li>Store records securely (locked cabinet, password-protected and encrypted devices or software).</li>
  <li>Keep data accurate and up to date; don't keep it longer than necessary.</li>
  <li>Share only with consent or where legally required (e.g. safeguarding).</li>
  <li>Clients have the right to see their data and ask for it to be deleted.</li>
  <li>Sole traders handling personal data may need to register with the ICO.</li>
</ul>
${quiz([
  ['Why does a PAR-Q need extra protection?', 'It contains health information, which is special category data under UK GDPR.'],
  ['Name two ways to store client data securely.', 'For example: locked cabinet, password-protected and encrypted devices or software.'],
])}`,
  },
  {
    id: 'insurance', group: 'Professional practice', title: 'Insurance, qualifications & professional conduct',
    summary: 'Insurance types, registration, CPD, working within scope',
    body: `
${table(['Requirement', 'Why'], [
  ['<strong>Public liability insurance</strong>', 'Covers claims for injury or damage to clients or the public'],
  ['<strong>Professional indemnity insurance</strong>', 'Covers claims that your advice or instruction caused loss or injury'],
  ['<strong>Recognised qualification</strong> (e.g. Level 3 Diploma in Personal Training)', 'Shows competence; required by employers and insurers'],
  ['<strong>Professional registration</strong> (e.g. CIMSPA)', 'Professional standards, credibility'],
  ['<strong>CPD</strong>', 'Keeps knowledge current; often required to stay registered'],
  ['<strong>First aid and CPR</strong>', 'Ability to respond in an emergency'],
  ['<strong>Business records</strong>', 'Client records, session logs, incident reports, accounts'],
])}
<p>Always work within your scope of practice, follow your code of conduct, and refer clients on when their needs go beyond your qualifications.</p>
${quiz([
  ['What is the difference between public liability and professional indemnity insurance?', 'Public liability covers injury or damage to people or property; professional indemnity covers claims arising from your advice or instruction.'],
  ['What is CPD?', 'Continuing professional development: ongoing learning to keep skills and knowledge current.'],
])}`,
  },
];
