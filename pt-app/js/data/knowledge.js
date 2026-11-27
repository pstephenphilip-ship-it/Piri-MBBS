// Knowledge bank. Categories → topics → article body (HTML).
// Only a few topics are filled in; the rest are stubs (body: null) showing
// where content goes. Write content in your own words or from properly
// licensed sources.

export const CATEGORIES = [
  {
    id: 'anatomy', name: 'Anatomy', emoji: '🦴', blurb: 'Muscles, bones, joints and planes of motion',
    topics: [
      {
        id: 'planes-axes', title: 'Planes & axes of movement',
        body: `
<p>All human movement can be described in three planes, each rotating about a perpendicular axis.</p>
<h3>Sagittal plane</h3>
<p>Divides the body into left and right. Movements: flexion and extension. Examples: squat, biceps curl, running.</p>
<h3>Frontal (coronal) plane</h3>
<p>Divides the body into front and back. Movements: abduction, adduction, lateral flexion. Examples: lateral raise, side lunge, jumping jacks.</p>
<h3>Transverse plane</h3>
<p>Divides the body into top and bottom. Movements: rotation, horizontal ab/adduction. Examples: woodchop, golf swing, cable fly.</p>
<h3>Why it matters for programming</h3>
<p>Most gym programmes are heavily sagittal. Including frontal and transverse plane work builds more robust, sport- and life-ready clients.</p>`,
      },
      { id: 'skeletal', title: 'The skeletal system', body: null },
      { id: 'joints', title: 'Joint types & movements', body: null },
      { id: 'lower-limb', title: 'Muscles of the lower limb', body: null },
      { id: 'upper-limb', title: 'Muscles of the upper limb', body: null },
      { id: 'trunk', title: 'Muscles of the trunk & core', body: null },
    ],
  },
  {
    id: 'physiology', name: 'Physiology', emoji: '❤️', blurb: 'Energy systems, cardio-respiratory, muscle',
    topics: [
      {
        id: 'energy-systems', title: 'Energy systems',
        body: `
<p>The body resynthesises ATP through three overlapping systems. All are always active — the dominant one depends on intensity and duration.</p>
<h3>1. Phosphocreatine (ATP-PC)</h3>
<ul><li>Fuel: stored ATP + creatine phosphate</li><li>Dominant: ~0–10 s, maximal efforts</li><li>Examples: 1RM lift, 40 m sprint</li><li>Recovery: ~50% in 30 s, near-full in 3–5 min</li></ul>
<h3>2. Glycolytic (anaerobic glycolysis)</h3>
<ul><li>Fuel: glucose / muscle glycogen</li><li>Dominant: ~10 s – 2 min, high intensity</li><li>By-products include H⁺ ions → "burn" and fatigue</li></ul>
<h3>3. Oxidative (aerobic)</h3>
<ul><li>Fuel: carbohydrate, fat (and a little protein)</li><li>Dominant: efforts beyond ~2 min, low–moderate intensity</li><li>Highest ATP yield, slowest rate</li></ul>
<h3>Programming takeaway</h3>
<p>Match work:rest ratios to the system you want to train — e.g. 1:12–1:20 for ATP-PC, 1:3–1:5 for glycolytic, 1:1 or continuous for aerobic.</p>`,
      },
      { id: 'muscle-contraction', title: 'Muscle contraction (sliding filament)', body: null },
      { id: 'fibre-types', title: 'Muscle fibre types', body: null },
      { id: 'cardio', title: 'Cardiovascular system & response to exercise', body: null },
      { id: 'respiratory', title: 'Respiratory system', body: null },
      { id: 'adaptations', title: 'Training adaptations', body: null },
    ],
  },
  {
    id: 'biomechanics', name: 'Biomechanics', emoji: '⚙️', blurb: 'Levers, forces, movement analysis',
    topics: [
      { id: 'levers', title: 'Lever systems', body: null },
      { id: 'force-velocity', title: 'Force–velocity & length–tension', body: null },
      { id: 'muscle-actions', title: 'Concentric, eccentric, isometric', body: null },
    ],
  },
  {
    id: 'programming', name: 'Programme design', emoji: '📋', blurb: 'FITT, overload, periodisation',
    topics: [
      {
        id: 'fitt', title: 'FITT principle & progressive overload',
        body: `
<p><strong>FITT</strong> gives you four dials to adjust any programme:</p>
<ul><li><strong>F</strong>requency — sessions per week</li><li><strong>I</strong>ntensity — load, %1RM, RPE/RIR, heart-rate zone</li><li><strong>T</strong>ime — session or set duration</li><li><strong>T</strong>ype — modality / exercise selection</li></ul>
<h3>Progressive overload</h3>
<p>Adaptation requires a stimulus slightly beyond current capacity. Progress one variable at a time: reps → sets → load, or reduce rest, improve tempo/ROM.</p>
<h3>Typical rep ranges (guide, not law)</h3>
<ul><li>Strength: 1–6 reps, 2–5 min rest</li><li>Hypertrophy: 6–15+ reps close to failure, 1–3 min rest</li><li>Muscular endurance: 15+ reps, &lt;1 min rest</li></ul>`,
      },
      { id: 'periodisation', title: 'Periodisation models', body: null },
      { id: 'rpe', title: 'RPE & RIR', body: null },
      { id: 'warmup', title: 'Warm-ups (RAMP)', body: null },
    ],
  },
  {
    id: 'nutrition', name: 'Nutrition', emoji: '🥗', blurb: 'Energy balance, macros, hydration, scope',
    topics: [
      { id: 'energy-balance', title: 'Energy balance & TDEE', body: null },
      { id: 'macros', title: 'Macronutrients', body: null },
      { id: 'hydration', title: 'Hydration', body: null },
      { id: 'scope', title: 'Scope of practice for PTs', body: null },
    ],
  },
  {
    id: 'special-pops', name: 'Special populations', emoji: '🧑‍🦳', blurb: 'Pre/postnatal, older adults, conditions',
    topics: [
      { id: 'older-adults', title: 'Older adults', body: null },
      { id: 'pre-postnatal', title: 'Pre- and postnatal clients', body: null },
      { id: 'hypertension', title: 'Hypertension', body: null },
      { id: 'diabetes', title: 'Type 2 diabetes', body: null },
    ],
  },
  {
    id: 'assessment', name: 'Screening & assessment', emoji: '📏', blurb: 'PAR-Q, posture, fitness tests',
    topics: [
      { id: 'parq', title: 'Health screening & PAR-Q', body: null },
      { id: 'bp-hr', title: 'Blood pressure & resting heart rate', body: null },
      { id: 'body-comp', title: 'Body composition methods', body: null },
      { id: 'fitness-tests', title: 'Fitness tests', body: null },
    ],
  },
  {
    id: 'coaching', name: 'Coaching & behaviour change', emoji: '💬', blurb: 'Motivation, communication, SMART goals',
    topics: [
      { id: 'smart', title: 'SMART goal setting', body: null },
      { id: 'stages-change', title: 'Stages of change', body: null },
      { id: 'cueing', title: 'Coaching cues (internal vs external)', body: null },
    ],
  },
  {
    id: 'business', name: 'Business & professional', emoji: '💼', blurb: 'Insurance, GDPR, ethics, marketing',
    topics: [
      { id: 'insurance', title: 'Insurance & liability', body: null },
      { id: 'data', title: 'Client data & GDPR', body: null },
      { id: 'first-aid', title: 'First aid & emergency procedures', body: null },
    ],
  },
];
