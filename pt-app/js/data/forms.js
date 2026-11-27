// Client form templates. Each form is a schema the generic form renderer in
// views/clients.js turns into UI. Add a new form here and it appears as a
// tab on every client — no other code changes needed.
//
// Field types: text, textarea, number, date, select, yesno, checkbox, signature, heading
//
// IMPORTANT: the PAR-Q / consent wording below is placeholder text for the
// skeleton. Before using with real clients, replace it with the official
// PAR-Q+ (or your governing body's version) and have your consent/waiver
// reviewed for your jurisdiction and insurer.

export const FORMS = [
  {
    id: 'parq',
    title: 'PAR-Q',
    description: 'Pre-exercise health screening. Any "Yes" answer means the client should get medical clearance before starting or increasing activity.',
    flag: values => Object.entries(values).some(([k, v]) => k.startsWith('q') && v === 'yes'),
    fields: [
      { id: 'q1', type: 'yesno', label: 'Has a doctor ever said you have a heart condition or high blood pressure?' },
      { id: 'q2', type: 'yesno', label: 'Do you feel pain in your chest at rest, during daily activities, or when you do physical activity?' },
      { id: 'q3', type: 'yesno', label: 'Do you lose balance because of dizziness, or have you lost consciousness in the last 12 months?' },
      { id: 'q4', type: 'yesno', label: 'Have you been diagnosed with another chronic medical condition (other than heart disease or high blood pressure)?' },
      { id: 'q5', type: 'yesno', label: 'Are you currently taking prescribed medication for a chronic medical condition?' },
      { id: 'q6', type: 'yesno', label: 'Do you currently have (or have had in the past 12 months) a bone, joint or soft-tissue problem that could be made worse by becoming more active?' },
      { id: 'q7', type: 'yesno', label: 'Has a doctor ever said you should only do medically supervised physical activity?' },
      { id: 'details', type: 'textarea', label: 'If you answered yes to any question, please give details' },
      { id: 'meds', type: 'textarea', label: 'Current medications' },
      { id: 'sig', type: 'signature', label: 'Client signature' },
      { id: 'date', type: 'date', label: 'Date', default: 'today' },
    ],
  },
  {
    id: 'consent',
    title: 'Consent',
    description: 'Informed consent and data-processing agreement.',
    fields: [
      { id: 'c1', type: 'checkbox', label: 'I understand that physical exercise involves some risk of injury, and I take part voluntarily.' },
      { id: 'c2', type: 'checkbox', label: 'I confirm the health information I have provided is accurate, and I will tell my trainer about any changes.' },
      { id: 'c3', type: 'checkbox', label: 'I will stop exercising and inform my trainer if I feel pain, dizziness, or discomfort.' },
      { id: 'c4', type: 'checkbox', label: 'I consent to my trainer storing my personal and health data to deliver training services.' },
      { id: 'c5', type: 'checkbox', label: '(Optional) I consent to progress photos being taken and stored privately.' },
      { id: 'name', type: 'text', label: 'Full name' },
      { id: 'sig', type: 'signature', label: 'Client signature' },
      { id: 'date', type: 'date', label: 'Date', default: 'today' },
    ],
    required: ['c1', 'c2', 'c3', 'c4', 'name'],
  },
  {
    id: 'goals',
    title: 'Goals',
    description: 'SMART goal setting and motivation.',
    fields: [
      { id: 'primary', type: 'select', label: 'Primary goal', options: ['Fat loss', 'Muscle gain', 'Strength', 'General fitness', 'Sport performance', 'Rehab / pain-free movement', 'Health condition management', 'Other'] },
      { id: 'h1', type: 'heading', label: 'SMART goal' },
      { id: 'specific', type: 'textarea', label: 'Specific — what exactly do you want to achieve?' },
      { id: 'measurable', type: 'text', label: 'Measurable — how will we measure it?' },
      { id: 'achievable', type: 'text', label: 'Achievable — what makes this realistic?' },
      { id: 'relevant', type: 'textarea', label: 'Relevant — why does this matter to you?' },
      { id: 'timebound', type: 'date', label: 'Time-bound — target date' },
      { id: 'h2', type: 'heading', label: 'Lifestyle' },
      { id: 'days', type: 'number', label: 'Days per week available to train' },
      { id: 'experience', type: 'select', label: 'Training experience', options: ['None', '< 6 months', '6–24 months', '2+ years'] },
      { id: 'barriers', type: 'textarea', label: 'Potential barriers (time, work, family, motivation…)' },
      { id: 'confidence', type: 'number', label: 'Confidence in reaching the goal (1–10)', min: 1, max: 10 },
    ],
  },
  {
    id: 'assessment',
    title: 'Assessment',
    description: 'Baseline measurements. Re-do periodically to track progress.',
    fields: [
      { id: 'date', type: 'date', label: 'Assessment date', default: 'today' },
      { id: 'h1', type: 'heading', label: 'Vitals' },
      { id: 'rhr', type: 'number', label: 'Resting heart rate (bpm)' },
      { id: 'bp', type: 'text', label: 'Blood pressure (mmHg)', placeholder: 'e.g. 120/80' },
      { id: 'h2', type: 'heading', label: 'Body' },
      { id: 'height', type: 'number', label: 'Height (cm)' },
      { id: 'weight', type: 'number', label: 'Weight (kg)' },
      { id: 'waist', type: 'number', label: 'Waist (cm)' },
      { id: 'h3', type: 'heading', label: 'Fitness' },
      { id: 'pushups', type: 'number', label: 'Push-ups (max reps)' },
      { id: 'plank', type: 'number', label: 'Plank hold (seconds)' },
      { id: 'sitreach', type: 'number', label: 'Sit & reach (cm)' },
      { id: 'notes', type: 'textarea', label: 'Movement screen / posture notes' },
    ],
  },
];
