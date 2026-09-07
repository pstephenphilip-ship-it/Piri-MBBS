/* =====================================================================
   DoctoRise promo reel — script and numbers.
   ---------------------------------------------------------------------
   The screen area of every scene is real footage of the site, recorded by
   capture.mjs. This file holds only what is said around it.

   Counts were measured from the live app on 2026-09-07; `node
   promo/count.js` re-measures them and flags drift.
   ===================================================================== */
(function (root) {
  'use strict';

  root.REEL_DATA = {

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

    /* One entry per scene. `clip` names the folder under promo/shots/;
       omit it for a title card with no footage. */
    SCENES: [
      { id: 'hero', clip: 'home', hold: 0.6,
        kicker: 'MBBS revision, done properly',
        line: 'Everything you need,<br>already counted.' },

      { id: 'systems', clip: 'systems',
        kicker: 'MLA-aligned',
        line: 'Learn <b>672</b> medical conditions<br>across <b>27</b> systems.' },

      { id: 'annotate', clip: 'annotate',
        kicker: '',
        line: 'Make it your own.',
        sub: 'Highlight anything. Attach a note to it. It stays where you put it.' },

      { id: 'mynotes', clip: 'mynotes',
        kicker: '',
        line: 'Every note you write, in one drawer.' },

      { id: 'recall', clip: 'recall',
        kicker: '',
        line: 'Want to practise active recall?',
        sub: '<b>21,389</b> flashcards, graded the way you already revise.' },

      { id: 'mcq', clip: 'mcq',
        kicker: '',
        line: 'So you want to practise MCQs?',
        sub: '<b>15,444</b> questions, attached to the topic they belong to.' },

      /* The three modules, each a real screen of its own. */
      { id: 'anatomy', clip: 'anatomy', module: 0,
        kicker: 'Module',
        line: 'Anatomy',
        sub: '<b>54</b> topics across <b>9</b> regions.' },

      { id: 'histology', clip: 'histology', module: 1,
        kicker: 'Module',
        line: 'Histology',
        sub: '<b>69</b> topics across <b>10</b> groups.' },

      { id: 'pharmacology', clip: 'pharmacology', module: 2,
        kicker: 'Module',
        line: 'Pharmacology',
        sub: '<b>574</b> drug classes across <b>18</b> sections.' },

      { id: 'signs', clip: 'signs',
        kicker: 'Signs &amp; Symptoms',
        line: 'Start from the symptom,<br>not the diagnosis.',
        sub: '<b>322</b> presentations — differentials to exclude, and what to order.' },

      { id: 'invest', clip: 'invest',
        kicker: 'Investigations',
        line: 'What to order. When.<br>And how to read it.',
        sub: '<b>195</b> investigations across <b>33</b> categories.' },

      { id: 'mock', clip: 'mock',
        kicker: 'Mock exams',
        line: 'Sit a full MBBS-level paper.',
        sub: 'Take the standard paper, or build your own from any systems.' },

      { id: 'outro', clip: null, dur: 4.6,
        kicker: '',
        line: 'DoctoRise' }
    ],

    /* Labels for the module strip shown during the three module scenes. */
    MODULES: [
      { label: 'Anatomy', n: 54 },
      { label: 'Histology', n: 69 },
      { label: 'Pharmacology', n: 574 }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
