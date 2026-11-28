// Special populations and conditions: what each means for training.
// Used by the client "Special considerations" form and the warnings in a client's file.
// Guidance follows the Level 3 syllabus and UK good practice; it is not medical advice.
// Fields: id, label, group, level ('refer' = needs medical clearance/specialist input, 'caution'),
//   avoid[], modify[], monitor[], refer (text), avoidEx[] / cautionEx[] (exercise-bank ids).

const SUPINE = ['dead-bug', 'crunch', 'glute-bridge', 'hip-thrust', 'bench-press', 'db-bench', 'incline-db-press', 'knees-to-chest', 'hamstring-stretch', 'glute-stretch'];
const IMPACT = ['squat-jump', 'burpee', 'jumping-jack', 'mountain-climber'];
const SPINE_FLEX = ['crunch', 'windmills', 'knees-to-chest', 'hanging-knee-raise'];

export const GROUPS = ['Age', 'Pregnancy & postnatal', 'Cardiovascular & metabolic', 'Musculoskeletal', 'Neurological', 'Disability & sensory', 'Other'];

export const CONDITIONS = [
  /* ---------------- Age (also detected automatically from date of birth) ---------------- */
  {
    id: 'young', label: 'Young person (under 18)', group: 'Age', level: 'caution',
    avoid: ['Maximal (1RM) lifts and testing without specialist supervision', 'High-volume repetitive impact and early single-sport specialisation', 'Forced or partner stretching', 'Inappropriate size pairings in contact activities'],
    modify: ['Technique first with bodyweight and light loads; progress gradually', 'Correctly sized equipment', 'More breaks and fluids: children overheat and get cold more easily', 'Fun, varied, skill-based sessions'],
    monitor: ['Growth spurts (temporary loss of coordination and flexibility; growth-plate injury risk)', 'Signs of overtraining'],
    refer: 'Parent or guardian consent is required. Follow safeguarding policy (DBS check, open environment, never alone with a child).',
    avoidEx: [], cautionEx: ['deadlift', 'back-squat', 'bench-press', 'squat-jump', 'burpee'],
  },
  {
    id: 'older', label: 'Older adult (65+)', group: 'Age', level: 'caution',
    avoid: ['Sudden changes of position (postural hypotension, dizziness)', 'High-impact plyometrics if frail, low bone density or fall history', 'Heavy breath-holding'],
    modify: ['Longer, gradual warm-up and cool-down', 'Strength and balance work at least twice a week (falls prevention)', 'Clear demonstrations; repeat teaching points; allow more recovery', 'Use supports for balance at first'],
    monitor: ['Falls risk, medication side effects, joint pain'],
    refer: 'Check medications and conditions on the PAR-Q; many older clients will need GP clearance.',
    avoidEx: [], cautionEx: ['squat-jump', 'burpee', 'mountain-climber', 'pull-up', 'hanging-knee-raise', 'inchworm', 'windmills', 'walking-lunge'],
  },

  /* ---------------- Pregnancy & postnatal ---------------- */
  {
    id: 'pregnant', label: 'Pregnant', group: 'Pregnancy & postnatal', level: 'refer',
    avoid: ['Lying flat on the back for long after about 16 weeks (vena cava compression)', 'Breath-holding / heavy straining (Valsalva)', 'Contact sports and activities with a risk of falling or being hit', 'Exercises that cause abdominal doming (crunches, sit-ups, hanging leg raises; front planks later on)', 'Developmental and ballistic stretching (relaxin increases joint laxity)', 'High-impact jumping if it causes pelvic floor symptoms or discomfort', 'Overheating: hot, humid environments'],
    modify: ['Use RPE and the talk test (heart rate is unreliable)', 'Incline or side-lying instead of flat on the back', 'Include pelvic floor exercises', 'Narrow the range of wide-stance and single-leg work if pelvic girdle pain'],
    monitor: ['STOP and seek medical advice: vaginal bleeding or fluid loss, chest pain, dizziness, headache, calf pain or swelling, regular painful contractions, reduced fetal movement'],
    refer: 'GP/midwife clearance before starting, and immediately for any complications.',
    avoidEx: ['crunch', 'hanging-knee-raise', 'squat-jump', 'burpee', 'knees-to-chest'], cautionEx: [...SUPINE.filter(x => !['crunch', 'knees-to-chest'].includes(x)), 'plank', 'jumping-jack', 'mountain-climber', 'deadlift', 'back-squat', 'adductor-stretch', 'kb-swing'],
  },
  {
    id: 'postnatal', label: 'Postnatal (given birth in the last 12 months)', group: 'Pregnancy & postnatal', level: 'refer',
    avoid: ['High-impact exercise and heavy lifting until pelvic floor and core function are restored (often 12 weeks+)', 'Crunches and sit-ups while there is abdominal separation (diastasis recti) or doming', 'Developmental stretching while relaxin is still raised'],
    modify: ['Start with breathing, pelvic floor and walking', 'Progress after the 6–8 week postnatal check (longer after a caesarean)', 'Plan around sleep, feeding and childcare'],
    monitor: ['Leaking, heaviness or dragging, abdominal doming, back or pelvic pain'],
    refer: 'GP postnatal check before strenuous exercise; pelvic health physiotherapist for any pelvic floor symptoms or diastasis.',
    avoidEx: ['squat-jump', 'burpee', 'crunch', 'hanging-knee-raise'], cautionEx: ['jumping-jack', 'mountain-climber', 'plank', 'kb-swing', 'deadlift', 'back-squat'],
  },

  /* ---------------- Cardiovascular & metabolic ---------------- */
  {
    id: 'hypertension', label: 'High blood pressure (hypertension)', group: 'Cardiovascular & metabolic', level: 'caution',
    avoid: ['Breath-holding (Valsalva) and maximal lifts', 'Long isometric holds (wall sits, long planks)', 'Head-below-heart positions and heavy overhead work', 'Working to failure'],
    modify: ['Exhale on effort; moderate loads, higher reps; circuits', 'Long warm-up and cool-down; get up slowly from the floor', 'Use RPE if on beta blockers'],
    monitor: ['Resting BP each session if poorly controlled; dizziness, headache'],
    refer: 'GP clearance if resting BP is 160/100 or above. Do not exercise if 180/110 or above.',
    avoidEx: [], cautionEx: ['wall-sit', 'plank', 'side-plank', 'leg-press', 'deadlift', 'back-squat', 'ohp', 'bench-press', 'inchworm', 'windmills', 'burpee'],
  },
  {
    id: 'heart', label: 'Heart condition / cardiac history', group: 'Cardiovascular & metabolic', level: 'refer',
    avoid: ['High-intensity or maximal exercise until cleared', 'Breath-holding and heavy isometric work'],
    modify: ['Low-to-moderate intensity guided by RPE; long warm-up and cool-down', 'Specialist (Level 4 cardiac rehabilitation) instructor may be required'],
    monitor: ['STOP: chest pain, unusual breathlessness, palpitations, dizziness'],
    refer: 'Written medical clearance required. Know the location of the defibrillator (AED).',
    avoidEx: ['burpee', 'squat-jump'], cautionEx: ['mountain-climber', 'rower-intervals', 'deadlift', 'back-squat', 'wall-sit'],
  },
  {
    id: 'diabetes1', label: 'Type 1 diabetes', group: 'Cardiovascular & metabolic', level: 'caution',
    avoid: ['Exercising when unwell, or with very high glucose and ketones present'],
    modify: ['Client checks blood glucose before, during (long sessions) and after', 'Fast-acting sugar always to hand'],
    monitor: ['Hypoglycaemia: shaky, sweaty, hungry, confused, pale. Stop, give fast sugar, recheck in 10–15 min', 'Hypos can occur hours later, including overnight', 'Feet: blisters and sores'],
    refer: 'Follow the client\'s diabetes team advice; refer if control is poor.',
    avoidEx: [], cautionEx: [],
  },
  {
    id: 'diabetes2', label: 'Type 2 diabetes', group: 'Cardiovascular & metabolic', level: 'caution',
    avoid: ['Heavy straining if diabetic eye disease (retinopathy)'],
    modify: ['Regular aerobic and resistance training (no more than 2 days without activity)', 'Hypo risk if on insulin or sulphonylureas: carry fast sugar'],
    monitor: ['Feet, signs of hypoglycaemia, associated heart disease'],
    refer: 'GP clearance if complications (heart, eye, kidney, nerve damage).',
    avoidEx: [], cautionEx: [],
  },
  {
    id: 'asthma', label: 'Asthma', group: 'Cardiovascular & metabolic', level: 'caution',
    avoid: ['Training without the reliever inhaler to hand', 'Known triggers (cold dry air, pollen, sudden all-out efforts)'],
    modify: ['Longer, gradual warm-up', 'Use the inhaler before exercise if advised'],
    monitor: ['Wheeze, tight chest, breathlessness: stop and use the inhaler; call 999 if not improving'],
    refer: 'Poorly controlled asthma: GP review before increasing intensity.',
    avoidEx: [], cautionEx: ['burpee', 'mountain-climber', 'rower-intervals'],
  },
  {
    id: 'betablockers', label: 'Medication affecting heart rate (e.g. beta blockers)', group: 'Cardiovascular & metabolic', level: 'caution',
    avoid: ['Heart-rate-based intensity targets'],
    modify: ['Use RPE and the talk test to set intensity'],
    monitor: ['Dizziness, fatigue'],
    refer: '',
    avoidEx: [], cautionEx: [],
  },

  /* ---------------- Musculoskeletal ---------------- */
  {
    id: 'osteoporosis', label: 'Osteoporosis / osteopenia', group: 'Musculoskeletal', level: 'caution',
    avoid: ['Loaded or repeated end-range spinal flexion and twisting (sit-ups, toe touches, windmills)', 'Activities with a high risk of falling'],
    modify: ['Progressive resistance and appropriate impact for bone; balance training', 'Hinge with a neutral spine for lifting'],
    monitor: ['Height loss or new back pain (possible vertebral fracture): refer'],
    refer: 'If fractures have occurred, get guidance from the GP or physiotherapist.',
    avoidEx: SPINE_FLEX, cautionEx: ['upper-back-stretch', 'childs-pose', 'inchworm', 'cat-cow', 'bent-over-row', 'rower-intervals'],
  },
  {
    id: 'osteoarthritis', label: 'Osteoarthritis', group: 'Musculoskeletal', level: 'caution',
    avoid: ['Repetitive high impact through painful joints'],
    modify: ['Strengthening is a core treatment; work in comfortable ranges', 'Pain during exercise is fine if mild and settled within 24 hours', 'Reduce impact; swap to low-impact cardio during flares'],
    monitor: ['Swelling, pain that lasts beyond 24 hours'],
    refer: '',
    avoidEx: [], cautionEx: [...IMPACT, 'forward-lunge', 'walking-lunge', 'bulgarian-split-squat'],
  },
  {
    id: 'backpain', label: 'Low back pain', group: 'Musculoskeletal', level: 'caution',
    avoid: ['Heavy loaded spinal flexion while symptoms are acute'],
    modify: ['Keep moving; choose pain-free ranges and lighter loads', 'Neutral-spine strength and core endurance (bird dog, side plank, Pallof press)'],
    monitor: ['RED FLAGS (refer urgently): numbness between the legs, bladder or bowel changes, weakness in both legs, fever, unexplained weight loss, severe night pain'],
    refer: 'Refer to a GP or physiotherapist if pain is severe, spreading down the leg, or not improving.',
    avoidEx: [], cautionEx: ['deadlift', 'back-squat', 'bent-over-row', 'kb-swing', 'windmills', 'crunch', 'leg-press', 'standing-hamstring-stretch', 'inchworm'],
  },
  {
    id: 'hipreplacement', label: 'Hip replacement', group: 'Musculoskeletal', level: 'refer',
    avoid: ['Follow the surgeon\'s precautions. Common early ones: deep hip flexion past 90°, crossing the leg past the midline, inward rotation of the operated hip'],
    modify: ['Higher seats and boxes; shallow squats', 'Progressive strengthening once cleared'],
    monitor: ['Pain, clicking or a sense of instability'],
    refer: 'Physiotherapist / surgeon guidance on current precautions.',
    avoidEx: ['glute-stretch'], cautionEx: ['hip-openers', 'goblet-squat', 'back-squat', 'leg-press', 'lateral-lunge', 'adductor-stretch', 'childs-pose', 'knees-to-chest'],
  },
  {
    id: 'kneereplacement', label: 'Knee replacement', group: 'Musculoskeletal', level: 'refer',
    avoid: ['High-impact jumping and running', 'Kneeling on the operated knee (often uncomfortable)'],
    modify: ['Low-impact cardio (bike, rower, swimming)', 'Progressive strengthening of the quadriceps'],
    monitor: ['Swelling, warmth'],
    refer: 'Physiotherapist / surgeon guidance.',
    avoidEx: IMPACT, cautionEx: ['hip-flexor-stretch', 'childs-pose', 'forward-lunge', 'walking-lunge'],
  },
  {
    id: 'shoulder', label: 'Shoulder pain / instability', group: 'Musculoskeletal', level: 'caution',
    avoid: ['Behind-the-neck pressing and pulling', 'Deep dips; extreme stretched positions with the arm raised and turned out'],
    modify: ['Neutral grips; reduce range; strengthen the rotator cuff and scapular muscles'],
    monitor: ['Pain at night, clicking with weakness, loss of movement: refer'],
    refer: 'Physiotherapist assessment if persistent.',
    avoidEx: ['bench-dip'], cautionEx: ['ohp', 'db-shoulder-press', 'pull-up', 'lateral-raise', 'pec-stretch', 'bench-press', 'overhead-triceps-extension'],
  },
  {
    id: 'knee', label: 'Knee pain / previous knee injury', group: 'Musculoskeletal', level: 'caution',
    avoid: ['Jumping and fast landings while painful'],
    modify: ['Reduce depth to a pain-free range; reverse rather than forward lunges', 'Strengthen quadriceps and hips'],
    monitor: ['Swelling, locking or giving way: refer'],
    refer: 'Physiotherapist if swelling, locking or giving way.',
    avoidEx: [], cautionEx: ['squat-jump', 'burpee', 'forward-lunge', 'walking-lunge', 'leg-extension', 'bulgarian-split-squat'],
  },
  {
    id: 'hypermobility', label: 'Hypermobility', group: 'Musculoskeletal', level: 'caution',
    avoid: ['Developmental stretching and pushing to end range', 'Locking out joints under load'],
    modify: ['Focus on strength, control and proprioception through the range', 'Slow tempos; stop just short of lockout'],
    monitor: ['Recurrent sprains or subluxations: refer'],
    refer: '',
    avoidEx: [], cautionEx: ['adductor-stretch', 'pec-stretch', 'hamstring-stretch', 'standing-hamstring-stretch', 'quad-stretch', 'windmills'],
  },
  {
    id: 'recentinjury', label: 'Recent injury or surgery', group: 'Musculoskeletal', level: 'refer',
    avoid: ['Loading the injured area beyond what the healthcare team advises'],
    modify: ['Train other areas; follow the rehabilitation plan'],
    monitor: ['Pain, swelling'],
    refer: 'Get clearance and guidance from the GP, surgeon or physiotherapist.',
    avoidEx: [], cautionEx: [],
  },

  /* ---------------- Neurological ---------------- */
  {
    id: 'epilepsy', label: 'Epilepsy', group: 'Neurological', level: 'caution',
    avoid: ['Activities where a seizure would be dangerous: working at height, unsupervised water, heavy free weights overhead without safety'],
    modify: ['Know the client\'s triggers and seizure plan; use machines or safety bars'],
    monitor: ['Tiredness, missed medication, flashing lights (photosensitive epilepsy)'],
    refer: 'Recent or poorly controlled seizures: GP advice.',
    avoidEx: [], cautionEx: ['pull-up', 'hanging-knee-raise', 'ohp', 'back-squat', 'bench-press'],
  },
  {
    id: 'ms', label: 'Multiple sclerosis (MS)', group: 'Neurological', level: 'refer',
    avoid: ['Overheating (worsens symptoms)', 'Training to exhaustion'],
    modify: ['Cool environment; plan rests; short bouts', 'Strength, balance and aerobic work at moderate intensity'],
    monitor: ['Fatigue, balance, spasticity, symptom flare-ups'],
    refer: 'Work alongside the neurology team or a specialist instructor.',
    avoidEx: [], cautionEx: [...IMPACT, 'walking-lunge'],
  },
  {
    id: 'parkinsons', label: 'Parkinson\'s disease', group: 'Neurological', level: 'refer',
    avoid: ['Unsupported balance challenges where a fall is likely'],
    modify: ['Large, rhythmic movements; balance, strength and gait work with support', 'Exercise when medication is working best'],
    monitor: ['Freezing, falls, postural hypotension'],
    refer: 'Specialist input (physiotherapy) recommended.',
    avoidEx: [], cautionEx: [...IMPACT, 'walking-lunge', 'single-leg-rdl', 'bulgarian-split-squat'],
  },
  {
    id: 'stroke', label: 'Stroke', group: 'Neurological', level: 'refer',
    avoid: ['High-intensity or heavy straining until cleared (blood pressure)'],
    modify: ['Supported balance and functional strength; work both sides', 'Follow the rehabilitation team\'s guidance'],
    monitor: ['Blood pressure, one-sided weakness, fatigue, falls risk'],
    refer: 'Medical clearance required; specialist (Level 4) support recommended.',
    avoidEx: ['burpee', 'squat-jump'], cautionEx: ['walking-lunge', 'single-leg-rdl', 'deadlift', 'back-squat'],
  },
  {
    id: 'cerebralpalsy', label: 'Cerebral palsy', group: 'Neurological', level: 'caution',
    avoid: ['Fast, jerky movements that trigger spasticity'],
    modify: ['Slow, controlled strength and stretching; individual adaptations'],
    monitor: ['Spasticity, fatigue, balance'],
    refer: '',
    avoidEx: [], cautionEx: IMPACT,
  },

  /* ---------------- Disability & sensory ---------------- */
  {
    id: 'visual', label: 'Visual impairment', group: 'Disability & sensory', level: 'caution',
    avoid: ['Cluttered walkways; moving equipment without orientation'],
    modify: ['Orient the client to the space; keep equipment in consistent places', 'Describe demonstrations clearly; use touch only with permission', 'Supports for balance work'],
    monitor: ['Trip hazards; how the client prefers to be guided'],
    refer: '',
    avoidEx: [], cautionEx: ['walking-lunge', 'burpee', 'squat-jump', 'kb-swing'],
  },
  {
    id: 'hearing', label: 'Hearing impairment', group: 'Disability & sensory', level: 'caution',
    avoid: [],
    modify: ['Face the client (lip-reading); demonstrate; use written plans and hand signals', 'Agree an emergency signal (they may not hear alarms)'],
    monitor: ['Understanding of instructions'],
    refer: '',
    avoidEx: [], cautionEx: [],
  },
  {
    id: 'wheelchair', label: 'Wheelchair user / spinal cord injury', group: 'Disability & sensory', level: 'refer',
    avoid: ['Prolonged pressure on the same areas (pressure sores)', 'Overuse of the shoulders (lots of pushing)'],
    modify: ['Balance pushing with pulling to protect the shoulders', 'Safe transfers; accessible equipment', 'Temperature control may be impaired: keep cool/warm'],
    monitor: ['Skin and pressure areas; temperature', 'AUTONOMIC DYSREFLEXIA (injury at T6 or above): sudden pounding headache, sweating, flushing above the injury. Medical emergency: sit upright, remove the trigger (e.g. full bladder, tight strap), call 999'],
    refer: 'Specialist input recommended; ask the client what works for them.',
    avoidEx: [], cautionEx: ['bench-dip', 'ohp'],
  },
  {
    id: 'learning', label: 'Learning disability', group: 'Disability & sensory', level: 'caution',
    avoid: ['Complex multi-step instructions given all at once'],
    modify: ['One instruction at a time; demonstrate; consistent routine', 'Check understanding; involve the carer where appropriate'],
    monitor: ['Ability to give informed consent (involve the carer / support worker)'],
    refer: '',
    avoidEx: [], cautionEx: [],
  },
  {
    id: 'amputation', label: 'Limb difference / amputation', group: 'Disability & sensory', level: 'caution',
    avoid: [],
    modify: ['Adapt exercises to the client; check the prosthesis fit and the residual limb skin', 'Balance and core strength'],
    monitor: ['Skin on the residual limb; balance'],
    refer: '',
    avoidEx: [], cautionEx: [],
  },

  /* ---------------- Other ---------------- */
  {
    id: 'mental', label: 'Anxiety / depression', group: 'Other', level: 'caution',
    avoid: [],
    modify: ['Supportive, non-judgemental approach; achievable goals; flexible plans', 'Exercise helps mood, but motivation may vary'],
    monitor: ['Adherence; signs of crisis (signpost to GP, NHS 111, Samaritans 116 123)'],
    refer: '',
    avoidEx: [], cautionEx: [],
  },
  {
    id: 'eating', label: 'Eating disorder (current or history)', group: 'Other', level: 'refer',
    avoid: ['Weight-loss goals, calorie targets, weighing in sessions', 'Excessive exercise volume'],
    modify: ['Focus on strength, enjoyment and wellbeing'],
    monitor: ['Weight loss, fatigue, dizziness, obsessive exercise'],
    refer: 'Work alongside the client\'s healthcare team; signpost to Beat (UK).',
    avoidEx: [], cautionEx: ['burpee', 'rower-intervals'],
  },
];

export const CONDITION_BY_ID = Object.fromEntries(CONDITIONS.map(c => [c.id, c]));
