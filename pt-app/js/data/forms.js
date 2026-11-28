// Client onboarding forms. Each form is a schema rendered by views/clients.js.
// Order = the onboarding journey (screening → information → measurements → goals).
//
// Field types: text, textarea, number, date, select, yesno, checkbox, multi (checkbox group),
//   signature, heading, info (static text), computed (read-only, recalculated live).
// Optional on any field: showIf(values) → boolean, hint, placeholder, min, max, step, default ('today').
//
// IMPORTANT: PAR-Q and consent wording here is a working template. Before using it with
// real clients, check it against the official PAR-Q+ and have consent reviewed for your
// jurisdiction and insurer.
import { CONDITIONS, GROUPS } from './considerations.js';
import { ageFrom } from '../ui.js';

const PARQ_Q = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
export const parqAnyYes = v => PARQ_Q.some(q => v?.[q] === 'yes');
export const parqCleared = v => ['Obtained', 'Not required (PAR-Q+ follow-up cleared)'].includes(v?.clearance);

/* ---------- calculations used by the assessment ---------- */
export function bpCategory(sys, dia) {
  sys = +sys; dia = +dia; if (!sys || !dia) return null;
  const rows = [[180, 110, 'Stage 3 hypertension', 'danger'], [160, 100, 'Stage 2 hypertension', 'danger'], [140, 90, 'Stage 1 hypertension', 'warn'], [130, 85, 'High normal', 'warn'], [120, 80, 'Normal', 'ok']];
  for (const [s, d, label, tone] of rows) if (sys >= s || dia >= d) return { label, tone };
  if (sys < 90 || dia < 60) return { label: 'Low (hypotension)', tone: 'warn' };
  return { label: 'Optimal', tone: 'ok' };
}
export function bmi(h, w) { h = +h / 100; w = +w; if (!h || !w) return null; return w / (h * h); }
export function bmiCategory(b) {
  if (!b) return null;
  if (b < 18.5) return { label: 'Underweight', tone: 'warn' };
  if (b < 25) return { label: 'Healthy weight', tone: 'ok' };
  if (b < 30) return { label: 'Overweight', tone: 'warn' };
  if (b < 35) return { label: 'Obese (class I)', tone: 'danger' };
  if (b < 40) return { label: 'Obese (class II)', tone: 'danger' };
  return { label: 'Obese (class III)', tone: 'danger' };
}
const fmt = (n, d = 1) => (Math.round(n * 10 ** d) / 10 ** d).toFixed(d);

export const FORMS = [
  {
    id: 'parq', title: 'PAR-Q', step: 'Health screening (PAR-Q)',
    description: 'Physical Activity Readiness Questionnaire. Any "Yes" means the client should get medical advice before starting or increasing activity, unless PAR-Q+ follow-up questions clear them.',
    flag: v => parqAnyYes(v) && !parqCleared(v),
    fields: [
      { id: 'q1', type: 'yesno', label: 'Has a doctor ever said you have a heart condition or high blood pressure?' },
      { id: 'q2', type: 'yesno', label: 'Do you feel pain in your chest at rest, during daily activities, or when you do physical activity?' },
      { id: 'q3', type: 'yesno', label: 'Do you lose balance because of dizziness, or have you lost consciousness in the last 12 months?' },
      { id: 'q4', type: 'yesno', label: 'Have you been diagnosed with another chronic medical condition (other than heart disease or high blood pressure)?' },
      { id: 'q5', type: 'yesno', label: 'Are you currently taking prescribed medication for a chronic medical condition?' },
      { id: 'q6', type: 'yesno', label: 'Do you currently have (or have had in the past 12 months) a bone, joint or soft-tissue problem that could be made worse by becoming more active?' },
      { id: 'q7', type: 'yesno', label: 'Has a doctor ever said you should only do medically supervised physical activity?' },
      { id: 'details', type: 'textarea', label: 'Details of any "Yes" answers', showIf: parqAnyYes },
      { id: 'meds', type: 'textarea', label: 'Current medications (name and what it is for)' },
      { id: 'h1', type: 'heading', label: 'Medical clearance', showIf: parqAnyYes },
      { id: 'clearance', type: 'select', label: 'Clearance status', options: ['Not yet obtained', 'Obtained', 'Not required (PAR-Q+ follow-up cleared)'], showIf: parqAnyYes },
      { id: 'clearedBy', type: 'text', label: 'Cleared by (GP / doctor / physiotherapist)', showIf: v => parqAnyYes(v) && v.clearance === 'Obtained' },
      { id: 'clearedDate', type: 'date', label: 'Date of clearance', showIf: v => parqAnyYes(v) && v.clearance === 'Obtained' },
      { id: 'h2', type: 'heading', label: 'Declaration' },
      { id: 'declare', type: 'checkbox', label: 'I have answered honestly and will tell my trainer if my health changes.' },
      { id: 'sig', type: 'signature', label: 'Client signature' },
      { id: 'date', type: 'date', label: 'Date', default: 'today' },
    ],
    required: ['declare'],
  },
  {
    id: 'consent', title: 'Consent', step: 'Informed consent & data',
    description: 'Informed consent to exercise and to processing personal and health data (UK GDPR).',
    fields: [
      { id: 'h1', type: 'heading', label: 'Exercise' },
      { id: 'c1', type: 'checkbox', label: 'I understand that exercise involves some risk of injury and I take part voluntarily.' },
      { id: 'c2', type: 'checkbox', label: 'I understand what my programme and any fitness tests involve, and that I can stop at any time.' },
      { id: 'c3', type: 'checkbox', label: 'I will stop and tell my trainer if I feel pain, dizziness, chest discomfort or feel unwell.' },
      { id: 'c4', type: 'checkbox', label: 'The health information I have given is accurate and I will report any changes.' },
      { id: 'h2', type: 'heading', label: 'Data' },
      { id: 'c5', type: 'checkbox', label: 'I consent to my trainer storing my personal and health information securely to deliver training. I can ask to see or delete it.' },
      { id: 'c6', type: 'checkbox', label: '(Optional) I consent to progress photos being taken and stored privately.' },
      { id: 'c7', type: 'checkbox', label: '(Optional) I am happy to receive session reminders and check-ins by message or email.' },
      { id: 'guardian', type: 'text', label: 'Parent / guardian name (clients under 18)', showIf: (v, c) => (ageFrom(c?.dob) ?? 99) < 18 },
      { id: 'name', type: 'text', label: 'Full name' },
      { id: 'sig', type: 'signature', label: 'Signature' },
      { id: 'date', type: 'date', label: 'Date', default: 'today' },
    ],
    required: ['c1', 'c2', 'c3', 'c4', 'c5', 'name'],
  },
  {
    id: 'lifestyle', title: 'Lifestyle', step: 'Lifestyle & history questionnaire',
    description: 'Gathering information: daily life, habits, exercise history, preferences, motivation and barriers.',
    fields: [
      { id: 'h1', type: 'heading', label: 'Work and daily life' },
      { id: 'occupation', type: 'text', label: 'Occupation' },
      { id: 'workType', type: 'select', label: 'Your day is mostly…', options: ['Sitting', 'Standing', 'Active / manual work', 'Shift work', 'Not working / retired'] },
      { id: 'steps', type: 'select', label: 'Daily activity', options: ['Sedentary (under 5,000 steps)', 'Lightly active (5,000–7,500)', 'Active (7,500–10,000)', 'Very active (10,000+)'] },
      { id: 'h2', type: 'heading', label: 'Sleep and stress' },
      { id: 'sleep', type: 'number', label: 'Average sleep (hours per night)', step: 0.5, min: 0, max: 14 },
      { id: 'sleepQ', type: 'select', label: 'Sleep quality', options: ['Good', 'OK', 'Poor'] },
      { id: 'stress', type: 'number', label: 'Stress level (1 = very low, 10 = very high)', min: 1, max: 10 },
      { id: 'h3', type: 'heading', label: 'Health habits' },
      { id: 'smoking', type: 'select', label: 'Smoking', options: ['Never', 'Ex-smoker', 'Smoker / vaper'] },
      { id: 'alcohol', type: 'number', label: 'Alcohol (units per week)', hint: 'UK guideline: no more than 14 units a week.' },
      { id: 'water', type: 'select', label: 'Water / fluids per day', options: ['Under 1 litre', '1–1.5 litres', '1.5–2 litres', 'Over 2 litres'] },
      { id: 'diet', type: 'textarea', label: 'Typical day of eating', placeholder: 'Breakfast, lunch, dinner, snacks, drinks…' },
      { id: 'h4', type: 'heading', label: 'Exercise history' },
      { id: 'current', type: 'textarea', label: 'Current activity (what, how often)' },
      { id: 'previous', type: 'textarea', label: 'Previous exercise or sport (good and bad experiences)' },
      { id: 'injuries', type: 'textarea', label: 'Past injuries or operations' },
      { id: 'likes', type: 'text', label: 'Activities you enjoy' },
      { id: 'dislikes', type: 'text', label: 'Activities you dislike' },
      { id: 'h5', type: 'heading', label: 'Practicalities' },
      { id: 'days', type: 'number', label: 'Days per week available to train', min: 1, max: 7 },
      { id: 'sessionLength', type: 'select', label: 'Session length', options: ['30 minutes', '45 minutes', '60 minutes', '90 minutes'] },
      { id: 'times', type: 'multi', label: 'Preferred times', options: ['Early morning', 'Daytime', 'Evening', 'Weekends'] },
      { id: 'equipment', type: 'select', label: 'Where will you train outside sessions?', options: ['Gym', 'Home with equipment', 'Home, no equipment', 'Outdoors', 'Only in PT sessions'] },
      { id: 'h6', type: 'heading', label: 'Motivation and barriers' },
      { id: 'reasons', type: 'multi', label: 'Why do you want to exercise?', options: ['Health', 'Weight management', 'Strength / muscle', 'Appearance', 'Sport performance', 'Stress relief / mental health', 'Medical advice', 'Social', 'Confidence', 'More energy'] },
      { id: 'barriers', type: 'multi', label: 'What has stopped you before?', options: ['Time', 'Cost', 'Motivation', 'Confidence', 'Family commitments', 'Work', 'Injury / pain', 'Access / transport', 'Bad previous experience', 'Boredom'] },
      { id: 'strategies', type: 'textarea', label: 'Agreed strategies for those barriers' },
      { id: 'stage', type: 'select', label: 'Stage of change', options: ['Pre-contemplation: not thinking about changing', 'Contemplation: thinking about it, undecided', 'Preparation: planning to start soon', 'Action: exercising regularly for under 6 months', 'Maintenance: exercising regularly for 6+ months'] },
      { id: 'confidence', type: 'number', label: 'Confidence you can stick to a plan (1–10)', min: 1, max: 10 },
      { id: 'support', type: 'text', label: 'Who will support you? (family, friends, colleagues)' },
      { id: 'notes', type: 'computed', label: 'Lifestyle flags', compute: v => {
        const f = [];
        if (+v.sleep && +v.sleep < 6) f.push('Short sleep: recovery and progress will be limited');
        if (v.sleepQ === 'Poor') f.push('Poor sleep quality');
        if (+v.stress >= 8) f.push('High stress: consider lighter sessions and recovery');
        if (+v.alcohol > 14) f.push('Alcohol above the 14 units/week guideline');
        if (v.smoking === 'Smoker / vaper') f.push('Smoker: signpost to stop-smoking support');
        if (v.steps === 'Sedentary (under 5,000 steps)') f.push('Sedentary: build daily movement (NEAT)');
        if (+v.confidence && +v.confidence <= 6) f.push('Low confidence: set small, achievable process goals');
        return f.length ? f.join(' · ') : 'None';
      } },
    ],
  },
  {
    id: 'considerations', title: 'Special considerations', step: 'Special populations & conditions',
    description: 'Tick anything that applies. Each item adds warnings to the client\'s file (what to avoid, modify, monitor and when to refer) and flags exercises to avoid or use with caution. Age groups are added automatically from the date of birth.',
    fields: [
      { id: 'ageInfo', type: 'computed', label: 'From date of birth', compute: (v, c) => {
        const a = ageFrom(c?.dob);
        if (a == null) return 'No date of birth on the profile.';
        return a < 18 ? `Age ${a}: young person considerations added automatically.` : a >= 65 ? `Age ${a}: older adult considerations added automatically.` : `Age ${a}: no age-related considerations.`;
      } },
      ...GROUPS.filter(g => g !== 'Age').flatMap(g => [
        { id: 'h_' + g, type: 'heading', label: g },
        { id: 'cond_' + g, type: 'multi', label: '', options: CONDITIONS.filter(c => c.group === g).map(c => [c.id, c.label]) },
      ]),
      { id: 'h_preg', type: 'heading', label: 'Pregnancy details', showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('pregnant') },
      { id: 'weeks', type: 'number', label: 'Weeks pregnant', min: 0, max: 42, showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('pregnant') },
      { id: 'pregNotes', type: 'textarea', label: 'Complications / midwife advice', showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('pregnant') },
      { id: 'h_post', type: 'heading', label: 'Postnatal details', showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('postnatal') },
      { id: 'weeksPost', type: 'number', label: 'Weeks since giving birth', min: 0, showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('postnatal') },
      { id: 'birth', type: 'select', label: 'Type of birth', options: ['Vaginal', 'Assisted', 'Caesarean'], showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('postnatal') },
      { id: 'check', type: 'select', label: '6–8 week postnatal check done?', options: ['Not yet', 'Yes, cleared', 'Yes, with restrictions'], showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('postnatal') },
      { id: 'pelvic', type: 'select', label: 'Pelvic floor symptoms (leaking, heaviness) or tummy doming?', options: ['None', 'Yes: referred to pelvic health physio'], showIf: v => (v['cond_Pregnancy & postnatal'] || []).includes('postnatal') },
      { id: 'h_more', type: 'heading', label: 'More detail' },
      { id: 'details', type: 'textarea', label: 'Details (diagnosis, affected side, specialist advice, what helps)' },
      { id: 'adjustments', type: 'textarea', label: 'Reasonable adjustments agreed with the client (communication, equipment, access)' },
      { id: 'clearance', type: 'select', label: 'Medical / specialist clearance for these conditions', options: ['Not needed', 'Requested', 'Obtained', 'Obtained with restrictions'] },
    ],
  },
  {
    id: 'assessment', title: 'Assessment', step: 'Physical measurements & tests',
    description: 'Baseline measurements and fitness tests. Re-test every 4–8 weeks. Stop any test immediately for chest pain, dizziness, severe breathlessness or nausea.',
    fields: [
      { id: 'date', type: 'date', label: 'Assessment date', default: 'today' },
      { id: 'h1', type: 'heading', label: 'Vitals (after 5 minutes seated rest)' },
      { id: 'rhr', type: 'number', label: 'Resting heart rate (bpm)' },
      { id: 'bpSys', type: 'number', label: 'Blood pressure: systolic (mmHg)', placeholder: 'e.g. 125' },
      { id: 'bpDia', type: 'number', label: 'Blood pressure: diastolic (mmHg)', placeholder: 'e.g. 80' },
      { id: 'bpCat', type: 'computed', label: 'Blood pressure category', compute: v => { const c = bpCategory(v.bpSys, v.bpDia); if (!c) return '—'; const s = +v.bpSys, d = +v.bpDia; return c.label + (s >= 180 || d >= 110 ? ' · DO NOT EXERCISE today: refer' : s >= 160 || d >= 100 ? ' · Refer for GP clearance before training' : ''); } },
      { id: 'h2', type: 'heading', label: 'Body measurements' },
      { id: 'height', type: 'number', label: 'Height (cm)' },
      { id: 'weight', type: 'number', label: 'Weight (kg)', step: 0.1 },
      { id: 'bmi', type: 'computed', label: 'BMI', compute: v => { const b = bmi(v.height, v.weight); return b ? `${fmt(b)} · ${bmiCategory(b).label} (doesn't distinguish muscle from fat)` : '—'; } },
      { id: 'waist', type: 'number', label: 'Waist (cm), midway between lowest rib and hip bone' },
      { id: 'whtr', type: 'computed', label: 'Waist-to-height ratio', compute: v => { if (!+v.waist || !+v.height) return '—'; const r = v.waist / v.height; return `${fmt(r, 2)} · ${r < 0.5 ? 'Healthy (under 0.5)' : r < 0.6 ? 'Increased risk' : 'High risk'}`; } },
      { id: 'waistRisk', type: 'computed', label: 'Waist risk', compute: (v, c) => { const w = +v.waist; if (!w) return '—'; if (c?.sex === 'Male') return w >= 102 ? 'High risk (102 cm+)' : w >= 94 ? 'Increased risk (94 cm+)' : 'Low risk'; if (c?.sex === 'Female') return w >= 88 ? 'High risk (88 cm+)' : w >= 80 ? 'Increased risk (80 cm+)' : 'Low risk'; return 'Add sex to the profile to classify'; } },
      { id: 'hip', type: 'number', label: 'Hips (cm), widest part' },
      { id: 'whr', type: 'computed', label: 'Waist-to-hip ratio', compute: (v, c) => { if (!+v.waist || !+v.hip) return '—'; const r = v.waist / v.hip; const lim = c?.sex === 'Male' ? 0.9 : c?.sex === 'Female' ? 0.85 : null; return fmt(r, 2) + (lim ? (r > lim ? ' · Higher risk' : ' · Lower risk') : ''); } },
      { id: 'bodyfat', type: 'number', label: 'Body fat % (method in notes)', step: 0.1 },
      { id: 'h3', type: 'heading', label: 'Fitness tests' },
      { id: 'pushups', type: 'number', label: 'Press-ups (max with good form)' },
      { id: 'pushType', type: 'select', label: 'Press-up type', options: ['Full', 'From knees', 'Incline'] },
      { id: 'curlups', type: 'number', label: 'Curl-ups in 1 minute (skip for back pain / osteoporosis)' },
      { id: 'plank', type: 'number', label: 'Plank hold (seconds)' },
      { id: 'sitreach', type: 'number', label: 'Sit and reach (cm; skip for back pain)' },
      { id: 'balance', type: 'number', label: 'Single-leg balance, eyes open (seconds, max 60)' },
      { id: 'rockTime', type: 'number', label: 'Rockport 1-mile walk: time (minutes, e.g. 14.5)', step: 0.1 },
      { id: 'rockHR', type: 'number', label: 'Rockport: heart rate at the finish (bpm)' },
      { id: 'vo2', type: 'computed', label: 'Estimated VO₂ max (Rockport)', compute: (v, c) => {
        const age = ageFrom(c?.dob), lb = +v.weight * 2.2046, t = +v.rockTime, hr = +v.rockHR;
        if (!t || !hr) return '—';
        if (!lb || age == null || !['Male', 'Female'].includes(c?.sex)) return 'Needs weight, date of birth and sex on the profile';
        const vo2 = 132.853 - 0.0769 * lb - 0.3877 * age + 6.315 * (c.sex === 'Male' ? 1 : 0) - 3.2649 * t - 0.1565 * hr;
        return `${fmt(vo2)} ml/kg/min`;
      } },
      { id: 'h4', type: 'heading', label: 'Observations' },
      { id: 'posture', type: 'textarea', label: 'Posture and movement screen (squat, hinge, lunge, overhead reach)' },
      { id: 'notes', type: 'textarea', label: 'Other notes (test conditions, how the client felt)' },
      { id: 'retest', type: 'computed', label: 'Re-test due', compute: v => { if (!v.date) return '—'; const d = new Date(v.date); d.setDate(d.getDate() + 42); return d.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' }) + ' (6 weeks)'; } },
    ],
  },
  {
    id: 'goals', title: 'Goals', step: 'SMART goal setting', custom: true,
    description: 'Goal-setting consultation, then SMART goals for the short, medium and long term.',
    fields: [
      { id: 'primary', type: 'select', label: 'Main goal', options: ['Fat loss', 'Muscle gain', 'Strength', 'General fitness and health', 'Sport performance', 'Rehab / pain-free movement', 'Manage a health condition', 'Event (e.g. 10 km, wedding)', 'Other'] },
      { id: 'why', type: 'textarea', label: 'Why does this matter to you? (the "R" in SMART)' },
      { id: 'success', type: 'textarea', label: 'What will success look and feel like?' },
      { id: 'reward', type: 'text', label: 'Rewards for milestones (optional)' },
    ],
  },
];

export const FORM_BY_ID = Object.fromEntries(FORMS.map(f => [f.id, f]));
