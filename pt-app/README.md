# PT Coach — Personal Trainer app (skeleton)

Phone-first web app (installable PWA) for personal trainers. No build step,
no dependencies — plain HTML/CSS and ES modules.

## Features (skeleton)

| Tab | What's there |
| --- | --- |
| **Exercises** | 81 entries: 55 exercises plus 26 stretches (10 dynamic warm-up, 16 static maintenance), searchable and filterable by pattern and equipment. Each has set-up from the ground up, step-by-step execution, breathing and bracing, stability (what stays still and which muscles hold it), joint actions with planes, coaching cues, common mistakes, safety and who should modify, regressions, progressions and a starting prescription. Muscle names link to the Muscles articles. |
| **Knowledge** | 103 articles (~42,000 words) following the Level 3 Diploma in Fitness Instructing and Personal Training syllabus: Anatomy, Muscles (76 muscles), Physiology, Fitness & programme design, Nutrition, Consultation & coaching, Screening & assessment, Delivering sessions, Special populations, and Health, safety & professional. Each has tables, trainer-application and safety notes, and self-test questions. Global search. |
| **Clients** | Add/edit/delete clients. Each client has tabs: Overview, PAR-Q, Consent, Goals (SMART), Assessment, Notes. Signature pad, PAR-Q "Yes" flag, onboarding progress. |

## Run locally

```bash
cd pt-app
python3 -m http.server 8080
```

Open http://localhost:8080 (on your phone: use your computer's LAN IP).
ES modules need to be served over http — opening `index.html` directly won't work.

## Structure

```
pt-app/
  index.html            app shell (top bar, view, bottom tab bar)
  css/app.css           mobile-first styles, light/dark
  js/app.js             hash router  (#/exercises, #/knowledge/..., #/clients/...)
  js/store.js           data layer (localStorage for now — swap for a backend)
  js/ui.js              small DOM helpers
  js/data/exercises.js  exercise bank content
  js/data/knowledge.js  knowledge bank content
  js/data/forms.js      client form schemas (PAR-Q, consent, goals, assessment)
  js/views/*.js         one module per tab
```

### Adding content

- **Exercise** → add an object to `EXERCISES` in `js/data/exercises.js`.
- **Knowledge article** → fill a topic's `body` (HTML) in `js/data/knowledge.js`, or for a big
  category put the topics in their own file under `js/data/knowledge/` (see the anatomy files).
  `js/data/knowledge/_helpers.js` has `table()`, `callout()`, `quiz()` and link helpers.
- **New client form** → add a schema to `FORMS` in `js/data/forms.js`; it shows up as a tab on every client automatically.

## Before real-world use

- Client data is stored **only in this browser** (localStorage). It is not
  backed up or synced. Health data (PAR-Q) is special-category data under
  UK/EU GDPR — move to an encrypted, authenticated backend before real use.
- PAR-Q and consent wording is placeholder. Replace with the official
  PAR-Q+ / your governing body's version and have the consent reviewed.

## Next steps (ideas)

- Backend + login (e.g. Supabase) and multi-device sync
- Programme / workout builder using the exercise bank
- Progress charts from repeat assessments
- Exercise videos/images
- Service worker for offline use, app icons
- PDF export of signed PAR-Q / consent
