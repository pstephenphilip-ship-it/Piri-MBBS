/* =====================================================================
   DoctoRise promo reel — copy, numbers and sample content.
   ---------------------------------------------------------------------
   Everything the reel says lives here, so the script can be reworded
   without touching the animation engine.

   The sample notes, cards, questions and lists below are lifted from the
   live site — real sentences from real topics, not invented filler. The
   counts were measured on 2026-09-07; re-measure with `node
   promo/count.js` after a content drop and update STATS here.
   ===================================================================== */
(function (root) {
  'use strict';

  var DATA = {

    SITE_URL: 'doctorise.co.uk',

    BRAND: {
      name: 'DoctoRise',
      logo: '../logo.png',
      tagline: 'Everything MBBS. One place.'
    },

    STATS: {
      conditions: 672,
      flashcards: 21389,
      questions: 15444,
      systems: 27,
      anatomy: 54,
      anatomyRegions: 9,
      histology: 69,
      histologyGroups: 10,
      drugClasses: 574,
      pharmaSections: 18,
      presentations: 322,
      presentationGroups: 17,
      investigations: 195,
      investigationGroups: 33
    },

    /* Every system, with its real condition count. Scrolled in scene 2. */
    SYSTEMS: [
      ['Cardiovascular', 30], ['Respiratory', 25], ['Haematology', 22],
      ['Endocrinology', 28], ['Upper GI', 8], ['Lower GI & Bowel', 16],
      ['Hepatobiliary & Pancreatic', 7], ['Liver', 14],
      ['Acute Abdomen & Surgical Principles', 11], ['Renal', 15],
      ['Urology', 12], ['Neurology / Neurosurgery', 58], ['Psychiatry', 45],
      ['MSK / Rheumatology', 36], ['Orthopaedics', 42], ['Dermatology', 45],
      ['Breast', 9], ['Obstetrics & Gynaecology', 65], ['Contraception', 9],
      ['Sexual Health', 12], ['Ophthalmology', 14], ['ENT', 26],
      ['Paediatrics', 78], ['Geriatric Medicine', 14],
      ['Infectious Disease & Immunology', 18],
      ['Clinical Pharmacology & Prescribing', 10],
      ['Public Health & Evidence-Based Medicine', 3]
    ],

    /* Scene 3 — the red-flag lines from the site's own Headache note,
       quoted verbatim, highlighted live. */
    NOTE: {
      breadcrumb: 'Signs & Symptoms / Neurological / Headache',
      title: 'Headache',
      lines: [
        { text: 'Each red flag points to a serious cause:', hl: null },
        { text: 'a thunderclap onset (SAH);', hl: 'yellow' },
        { text: 'fever with neck stiffness (meningitis);', hl: null },
        { text: 'a new headache over 50 with scalp tenderness (GCA);', hl: 'pink' },
        { text: 'a progressive headache with focal signs or papilloedema.', hl: null }
      ],
      annotation: 'Thunderclap → CT head within 1 hour. If it is negative and you are more than 6 h from onset, LP for xanthochromia.'
    },

    /* Scene 4 — the site's "Add your own topic" editor: you write a topic
       and it lands in your library beside the rest. Header, toolbar and
       block types match the real editor. */
    MYNOTE: {
      crumb: 'Medical Conditions · ★ My Topics',
      title: 'Thunderclap headache — my summary',
      cancel: 'Cancel',
      save: 'Save note',
      /* The formatting row, then the block palette. */
      tools: ['B', 'I', 'U', 'S'],
      inserts: ['+ Lead', '+ Warning', '+ Step', '+ List', '+ Table', '+ Image', '+ Divider'],
      blocks: [
        { kind: 'lead', text: 'Sudden headache, maximal within seconds — subarachnoid haemorrhage until proven otherwise.' },
        { kind: 'warn', text: 'CT head within 1 hour. A normal CT beyond 6 h does not exclude it — do the LP.' },
        { kind: 'step', n: '1', head: 'First step / Imaging', text: 'Non-contrast CT head immediately.' },
        { kind: 'step', n: '2', head: 'Second step / LP', text: 'At 12 h from onset, look for xanthochromia.' }
      ],
      savedLabel: 'Your own topic',
      savedCrumb: '★ My Topics',
      edit: 'Edit note',
      del: 'Delete'
    },

    /* Scene 5 — a real flashcard from content/cards/cardiovascular.json */
    FLASHCARD: {
      deck: 'Cardiovascular · Abnormal Apex Beat',
      front: 'What does a heaving, sustained, non-displaced apex beat indicate?',
      back: 'LV <b>pressure</b> overload — aortic stenosis or hypertension.',
      buttons: [
        { label: 'Again', sub: '<10m', cls: 'again' },
        { label: 'Hard', sub: '1d', cls: 'hard' },
        { label: 'Good', sub: '4d', cls: 'good' },
        { label: 'Easy', sub: '10d', cls: 'easy' }
      ],
      chosen: 2,
      due: 'Next review in 4 days'
    },

    /* Scene 6 — a real question from content/cards/respiratory.json */
    MCQ: {
      topic: 'Respiratory · Asthma',
      stem: 'What single word most importantly distinguishes asthma from COPD?',
      options: ['Inflammation', 'Eosinophilia', 'Hyperreactivity', 'Reversibility', 'Obstruction'],
      correct: 3,
      explanation: 'Asthma is characterised by <b>reversible</b> airflow obstruction — reversibility is the single word that separates it from COPD, where the obstruction is fixed.'
    },

    /* Scene 7 — the three modules, listing their real top-level groups. */
    SPLIT: [
      {
        key: 'anatomy', label: 'Anatomy', accent: '#0A7568',
        count: 54, sub: 'topics · 9 regions',
        items: ['Upper Limb', 'Lower Limb', 'Thorax', 'Abdomen', 'Head & Neck', 'Neuroanatomy', 'Embryology']
      },
      {
        key: 'histology', label: 'Histology', accent: '#6D28D9',
        count: 69, sub: 'topics · 10 groups',
        items: ['Basic Tissues', 'Cardiovascular', 'Respiratory', 'Gastrointestinal', 'Renal', 'Endocrine', 'Pathological Histology']
      },
      {
        key: 'pharmacology', label: 'Pharmacology', accent: '#C2410C',
        count: 574, sub: 'drug classes · 18 sections',
        items: ['Cardiovascular Drugs', 'Respiratory Drugs', 'Antibiotics & Antimicrobials', 'Endocrinology & Diabetes', 'Neurology & Psychiatry', 'Oncology & Immunosuppression', 'Emergency & Critical Care']
      }
    ],

    /* Scene 8 — from the site's Haemoptysis note. */
    SIGNS: {
      symptom: 'Haemoptysis',
      differentials: [
        { name: 'Lung cancer', tag: "Can't miss", tone: 'danger' },
        { name: 'Tuberculosis', tag: "Can't miss", tone: 'danger' },
        { name: 'Pulmonary embolism', tag: "Can't miss", tone: 'danger' },
        { name: 'Bronchiectasis', tag: 'Common', tone: 'muted' },
        { name: 'Pneumonia', tag: 'Common', tone: 'muted' }
      ],
      tests: ['Chest X-ray', 'CT chest', 'Bronchoscopy', 'Sputum for AFB', 'Clotting']
    },

    /* Scene 9 — an ABG in type 2 respiratory failure, read the way the
       site teaches it. */
    INVESTIGATION: {
      name: 'Arterial Blood Gas (ABG)',
      group: 'Bedside Tests · Respiratory',
      rows: [
        ['pH', '7.28', 'low', '7.35 – 7.45'],
        ['PaCO₂', '8.4 kPa', 'high', '4.7 – 6.0'],
        ['PaO₂', '7.1 kPa', 'low', '10 – 13 on air'],
        ['HCO₃⁻', '29 mmol/L', 'high', '22 – 26']
      ],
      when: 'Take one in respiratory distress or hypoxia — and to assess type 2 respiratory failure before or during NIV.',
      interpret: 'A <b>respiratory acidosis</b>: the CO₂ is retained and the pH has fallen. The raised bicarbonate is renal compensation, so this is <b>acute-on-chronic</b>, not new.'
    },

    /* Scene 10 — the mock exam customiser. */
    MOCK: {
      presetLabel: 'Standard paper',
      presetSpec: '120 questions · 120 minutes · mixed topics',
      customLabel: 'Or build your own',
      countFrom: 120,
      countTo: 45,
      tree: [
        ['Respiratory', true], ['Neurology / Neurosurgery', true], ['Endocrinology', true],
        ['Paediatrics', false], ['Dermatology', false], ['Obstetrics & Gynaecology', false]
      ],
      timer: '45:00'
    },

    COPY: {
      hero:      { kicker: 'MBBS revision, done properly', line: 'Everything you need.' },
      systems:   { kicker: 'MLA-aligned', line: 'Learn <b>672</b> medical conditions<br>across <b>27</b> systems.' },
      annotate:  { kicker: '', line: 'Make it your own.' },
      mynotes:   { kicker: '', line: 'Add your own notes.',
                   sub: 'Write your own topic — and it lands in your library beside the rest.' },
      recall:    { kicker: '', line: 'Want to practise active recall?' },
      mcq:       { kicker: '', line: 'So you want to practise MCQs?' },
      split:     { kicker: '', line: 'And the same for every other module.' },
      signs:     { kicker: 'Signs &amp; Symptoms', line: 'Start from the symptom,<br>not the diagnosis.' },
      invest:    { kicker: 'Investigations', line: 'What to order.<br>When. And how to read it.' },
      mock:      { kicker: 'Mock exams', line: 'Sit a full MBBS-level paper.' },
      outro:     { kicker: '', line: 'DoctoRise' }
    }
  };

  root.REEL_DATA = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
