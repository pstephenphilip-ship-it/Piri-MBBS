/* =====================================================================
   DoctoRise promo reel — copy, numbers and sample content.
   ---------------------------------------------------------------------
   Everything the reel says lives here, so the script can be reworded
   without touching the animation engine.

   The counts below were measured from the live app on 2026-09-07:
     conditions / systems  ->  CONDITIONS_SYSTEMS + content/subnav.json
     flashcards / questions ->  content/manifest.json (fcards + qcards)
     anatomy / histology / signs / investigations -> their TAB_* objects
     drug classes -> PHARMA_SECTIONS subsections
   Re-measure with `node promo/count.js` after a content drop and update
   STATS here, then re-render.
   ===================================================================== */
(function (root) {
  'use strict';

  var DATA = {

    /* Shown in the outro. Left empty on purpose — set it to your real
       domain (e.g. 'doctorise.com') and the outro will show it. */
    SITE_URL: '',

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
      investigations: 740,
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

    /* Scene 3 — a real note, highlighted live. */
    NOTE: {
      breadcrumb: 'Cardiovascular / Acute Coronary Syndrome',
      title: 'Acute Coronary Syndrome',
      lines: [
        { text: 'Every acute coronary syndrome starts the same way:', hl: null },
        { text: 'rupture or erosion of a vulnerable plaque.', hl: 'yellow' },
        { text: 'The culprit is often NOT the tightest stenosis —', hl: null },
        { text: 'a 40% lipid-rich plaque beats a stable 80% one.', hl: 'pink' },
        { text: 'Type 2 MI is supply–demand mismatch: treat the driver.', hl: null }
      ],
      annotation: 'Came up in the 2025 paper — know the 40% vs 80% trap cold.'
    },

    /* Scene 4 — the custom note being written. */
    MYNOTE: {
      title: 'My revision — ACS pitfalls',
      body: 'Troponin: it is the RISE / FALL that matters, not the absolute number.\nCKD baseline is static.',
      typeFrom: 22
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

    /* Scene 6 — a real MCQ from the same deck. */
    MCQ: {
      topic: 'Cardiovascular · Abnormal Pulse',
      stem: 'A 74-year-old presents with an irregularly irregular pulse; the apical rate is 96 but the radial rate is 78. What is the most likely diagnosis?',
      options: [
        'Frequent ventricular ectopics',
        'Second-degree (Mobitz I) heart block',
        'Atrial fibrillation',
        'Sinus arrhythmia',
        'Pulsus alternans'
      ],
      correct: 2,
      explanation: 'An irregularly irregular rhythm with an <b>apex–radial deficit</b> points to <b>atrial fibrillation</b> — weak beats never reach the wrist.'
    },

    /* Scene 7 — the three-way split. */
    SPLIT: [
      {
        key: 'anatomy', label: 'Anatomy', accent: '#00C2A8',
        count: 54, unit: 'topics', sub: 'topics · 9 regions',
        items: ['Osteology & Joints', 'Muscles & Movements', 'Nerves', 'Vessels & Lymphatics', 'Applied / Clinical Anatomy']
      },
      {
        key: 'histology', label: 'Histology', accent: '#A78BFA',
        count: 69, unit: 'topics', sub: 'topics · 10 groups',
        items: ['Epithelium', 'Connective Tissue', 'Blood & Haemopoiesis', 'Cartilage', 'Bone', 'Muscle', 'Nervous Tissue']
      },
      {
        key: 'pharmacology', label: 'Pharmacology', accent: '#F0B429',
        count: 574, unit: 'drug classes', sub: 'drug classes · 18 sections',
        items: ['ACE Inhibitors', 'Beta-blockers', 'DOACs', 'Macrolides', 'SGLT2 Inhibitors', 'Corticosteroids', 'Opioids']
      }
    ],

    /* Scene 8 — presenting symptom -> differentials -> tests to order. */
    SIGNS: {
      symptom: 'Chest Pain',
      differentials: [
        { name: 'Acute coronary syndrome', tag: "Can't miss", tone: 'danger' },
        { name: 'Pulmonary embolism', tag: "Can't miss", tone: 'danger' },
        { name: 'Aortic dissection', tag: "Can't miss", tone: 'danger' },
        { name: 'Pericarditis', tag: 'Common', tone: 'muted' },
        { name: 'GORD / oesophageal spasm', tag: 'Common', tone: 'muted' }
      ],
      tests: ['ECG', 'Troponin', 'CXR', 'D-dimer', 'CT aortogram'],
      peers: ['Palpitations', 'Syncope & Pre-syncope', 'Breathlessness', 'Abnormal Pulse', 'Swollen Leg']
    },

    /* Scene 9 — an investigation, read the way the app teaches it. */
    INVESTIGATION: {
      name: 'High-sensitivity Troponin T',
      group: 'Cardiac Markers · Biochemistry',
      rows: [
        ['0 h', '82 ng/L', 'high', 'Reference < 14 ng/L'],
        ['3 h', '210 ng/L', 'high', '↑ dynamic rise']
      ],
      when: 'Order when ischaemic chest pain is suspected — 0 h and 3 h, always paired.',
      interpret: 'A significant <b>rise and/or fall</b> defines acute injury. A high but <b>static</b> level is chronic (CKD, heart failure), not an MI.'
    },

    /* Scene 10 — the mock exam customiser. */
    MOCK: {
      presetLabel: 'Standard paper',
      presetSpec: '120 questions · 120 minutes · mixed topics',
      customLabel: 'Or build your own',
      countFrom: 120,
      countTo: 45,
      tree: [
        ['Cardiovascular', true], ['Respiratory', true], ['Endocrinology', true],
        ['Neurology / Neurosurgery', false], ['Paediatrics', false], ['Dermatology', false]
      ],
      timer: '45:00'
    },

    /* Scene copy. Beats are keyed to the scene ids in reel.js. */
    COPY: {
      hero:      { kicker: 'MBBS revision, done properly', line: 'Everything you need.' },
      systems:   { kicker: 'MLA-aligned', line: 'Learn <b>672</b> medical conditions<br>across <b>27</b> systems.' },
      annotate:  { kicker: '', line: 'Make it your own.' },
      mynotes:   { kicker: '', line: 'Add your own notes.' },
      recall:    { kicker: '', line: 'Want to practise active recall?' },
      mcq:       { kicker: '', line: 'So you want to practise MCQs?' },
      split:     { kicker: '', line: 'And the same for the basic sciences.' },
      signs:     { kicker: 'Signs &amp; Symptoms', line: 'Start from the symptom,<br>not the diagnosis.' },
      invest:    { kicker: 'Investigations', line: 'What to order.<br>When. And how to read it.' },
      mock:      { kicker: 'Mock exams', line: 'Sit a full MBBS-level paper.' },
      outro:     { kicker: '', line: 'DoctoRise' }
    }
  };

  root.REEL_DATA = DATA;
})(typeof window !== 'undefined' ? window : globalThis);
