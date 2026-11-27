// Knowledge bank. Categories → topics → article body (HTML).
// The syllabus follows the Level 3 Diploma in Fitness Instructing and Personal
// Training (Focus Awards manual); all text is written in our own words.
//
// Topic fields: id, title, body (HTML or null = coming soon),
//   optional group (section heading in the category list), summary (one line).
// Each category's topics live in their own file under ./knowledge/.

import { FOUNDATIONS, SKELETAL } from './knowledge/anatomy-skeleton.js';
import { JOINTS } from './knowledge/anatomy-joints.js';
import { APPLIED } from './knowledge/anatomy-applied.js';
import { MUSCLE_TISSUE } from './knowledge/anatomy-muscle-tissue.js';
import { UPPER } from './knowledge/muscles-upper.js';
import { TRUNK } from './knowledge/muscles-trunk.js';
import { LOWER } from './knowledge/muscles-lower.js';
import { OVERVIEW } from './knowledge/muscles-overview.js';
import { PHYSIOLOGY } from './knowledge/physiology.js';
import { TRAINING } from './knowledge/training.js';
import { NUTRITION } from './knowledge/nutrition.js';
import { COACHING, ASSESSMENT } from './knowledge/coaching.js';
import { INSTRUCTING, SPECIAL_POPS, SAFETY } from './knowledge/delivery.js';

const lifeCourse = MUSCLE_TISSUE.filter(t => t.group === 'Applied');
const muscleTissue = MUSCLE_TISSUE.filter(t => t.group !== 'Applied');

export const CATEGORIES = [
  {
    id: 'anatomy', name: 'Anatomy', emoji: '🦴', unit: 'Unit 1',
    blurb: 'Skeleton, joints, muscle tissue and movement',
    topics: [...FOUNDATIONS, ...SKELETAL, ...JOINTS, ...muscleTissue, ...APPLIED, ...lifeCourse],
  },
  {
    id: 'muscles', name: 'Muscles', emoji: '💪', unit: 'Unit 1',
    blurb: 'Origin, insertion, action and training for each muscle',
    topics: [...OVERVIEW, ...UPPER, ...TRUNK, ...LOWER],
  },
  {
    id: 'physiology', name: 'Physiology', emoji: '❤️', unit: 'Unit 1',
    blurb: 'Nervous, respiratory, cardiovascular, energy and endocrine systems',
    topics: PHYSIOLOGY,
  },
  {
    id: 'programming', name: 'Fitness & programme design', emoji: '📋', unit: 'Units 1, 3 & 4',
    blurb: 'Components of fitness, training principles, methods and planning',
    topics: TRAINING,
  },
  {
    id: 'nutrition', name: 'Nutrition', emoji: '🥗', unit: 'Unit 2',
    blurb: 'Nutrients, guidelines, exercise nutrition and weight management',
    topics: NUTRITION,
  },
  {
    id: 'coaching', name: 'Consultation & coaching', emoji: '💬', unit: 'Consultation & goal setting',
    blurb: 'Communication, behaviour change, goals and adherence',
    topics: COACHING,
  },
  {
    id: 'assessment', name: 'Screening & assessment', emoji: '📏', unit: 'Units 3 & 4',
    blurb: 'PAR-Q, client information, measurements and fitness tests',
    topics: ASSESSMENT,
  },
  {
    id: 'delivering', name: 'Delivering sessions', emoji: '🏋️', unit: 'Instructing & delivering',
    blurb: 'Preparing, instructing, adapting and reviewing sessions',
    topics: INSTRUCTING,
  },
  {
    id: 'special-pops', name: 'Special populations', emoji: '🧑‍🦳', unit: 'Instructing gym-based exercise',
    blurb: 'Contraindications, older adults, pregnancy, young people, disability, conditions',
    topics: SPECIAL_POPS,
  },
  {
    id: 'safety', name: 'Health, safety & professional', emoji: '🛟', unit: 'Health & safety',
    blurb: 'Legislation, risk, emergencies, safeguarding, data and insurance',
    topics: SAFETY,
  },
];
