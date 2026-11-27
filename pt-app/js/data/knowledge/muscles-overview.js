// Muscles — overview with the clickable muscle map.
import { table, kb } from './_helpers.js';
import { MUSCLE_MAP } from './diagrams/musclemap.js';

export const OVERVIEW = [
  {
    id: 'muscle-map', group: 'Overview', title: 'Muscle map',
    summary: 'Front and back views of the major muscles; tap one to open it',
    body: `
<p>Use this map to find where each major muscle sits, then tap or click a muscle to open its article with origin, insertion, action and how to train it. Use <strong>Hide labels</strong> to test yourself.</p>
${MUSCLE_MAP}
<h3>Muscle groups at a glance</h3>
${table(['Group', 'Main muscles', 'Article'], [
  ['Chest', 'Pectoralis major and minor, serratus anterior', kb('muscles', 'chest', 'Chest')],
  ['Shoulders', 'Anterior, lateral and posterior deltoid', kb('muscles', 'deltoids', 'Shoulders (deltoids)')],
  ['Rotator cuff', 'Supraspinatus, infraspinatus, teres minor, subscapularis', kb('muscles', 'rotator-cuff', 'Rotator cuff')],
  ['Upper back', 'Trapezius, rhomboids, levator scapulae', kb('muscles', 'upper-back', 'Upper back')],
  ['Back', 'Latissimus dorsi, teres major', kb('muscles', 'lats', 'Lats')],
  ['Arms', 'Biceps brachii, brachialis, brachioradialis; triceps', kb('muscles', 'elbow-flexors', 'Front of the arm') + ', ' + kb('muscles', 'triceps', 'triceps')],
  ['Core and spine', 'Rectus abdominis, obliques, transversus abdominis, erector spinae, multifidus', kb('muscles', 'abdominals', 'Abdominals') + ', ' + kb('muscles', 'back-extensors', 'back extensors')],
  ['Hips', 'Gluteals, hip flexors, adductors', kb('muscles', 'glutes', 'Glutes') + ', ' + kb('muscles', 'hip-flexors', 'hip flexors') + ', ' + kb('muscles', 'adductors', 'adductors')],
  ['Thigh', 'Quadriceps, hamstrings', kb('muscles', 'quadriceps', 'Quadriceps') + ', ' + kb('muscles', 'hamstrings', 'hamstrings')],
  ['Lower leg', 'Gastrocnemius, soleus, tibialis anterior, fibularis', kb('muscles', 'lower-leg', 'Lower leg')],
])}`,
  },
];
