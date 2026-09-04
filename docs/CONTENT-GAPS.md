# Content gaps — conditions tab

Running record kept during the source-verified accuracy review. Scope is the
**Conditions tab only** (27 systems, 408 topics). Other tabs — Signs & Symptoms,
Investigations, OSCE Clinical Skills, Histology — are out of scope for the review
but ARE checked before calling something a gap, because content often lives there.

Every entry is verified against the repo before being listed. Entries are only
moved to "confirmed" after grepping all of `content/` and `index.html`.

---

## Confirmed gaps

### 1. Paediatric pneumonia is diagnosed but never treated
- `RESPIRATORY / Pneumonia` is adult and CURB-65-based (10 CURB-65 references).
  Its only paediatric content is that doxycycline is avoided under 12.
- `PAEDIATRICS / Lower Respiratory Infection & Wheeze` names pneumonia 10 times,
  but **only as the differential to distinguish bronchiolitis from**. No first-line
  antibiotic for childhood community-acquired pneumonia appears anywhere.
- Effect: a student can identify paediatric pneumonia and cannot treat it.
- Status: needs a decision — treatment could be added to the existing paediatric
  topic without creating a new topic.

### 2. Caput vs cephalhaematoma vs subgaleal haemorrhage comparison table
- The subgaleal safety callout was added during Paediatrics batch 6.
- The three-way comparison table (the examinable discriminator) was deferred as
  new content needing sign-off.
- Status: awaiting a decision.

### 3. Candidal balanitis had no home
- Was absent from the whole app except as an MCQ distractor in a Sexual Health
  investigations deck.
- Partially resolved: a note section was added to `SEXUAL HEALTH / Candidiasis
  (genital)` in batch 4. No flashcards or MCQs, per the no-new-cards rule.
- Status: resolved in the note; flag only if cards are wanted later.

---

## Checked and NOT gaps (do not re-raise)

### Newborn Life Support — present, in the OSCE tab
Previously reported as "absent from the entire app". **That was wrong.** It is
fully covered under OSCE Clinical Skills in `index.html`: the NLS algorithm,
dry/warm/stimulate, 5 inflation breaths, air for term babies, heart rate as the
guide to progress, 3:1 compressions. Absent from the Conditions tab only, which
is by design — resuscitation skills live in the OSCE tab.

### Trichomoniasis — present, in Obstetrics & Gynaecology
No topic in the Sexual Health module (it appears there only in comparison tables),
but `OBSTETRICS & GYNAECOLOGY / Pelvic & Vaginal Infections` covers it properly:
first-line and alternative treatment, treatment in pregnancy, partner notification
and contact tracing, and the metronidazole alcohol advice.

---

## Cross-module inconsistencies (not gaps — defects to fix)

### A. Asymptomatic BV in pregnancy — obstetrics carries the error Sexual Health just lost
`content/notes/obstetrics-gynaecology.json` and its cards say "do NOT routinely
treat **asymptomatic BV** outside pregnancy", which implies treating it in
pregnancy. Pregnant women are not screened for or routinely treated for
asymptomatic BV, because it does not reduce preterm birth. Same error corrected
in Sexual Health batch 4.
- Status: FIXED (see Infectious Disease batch 1 commit).

### B. MCQ explanations that name an option by position
`index.html` shuffles MCQ options at serve time and remaps `correctIndex`, so any
explanation saying "the second option" or "option A" points at a distractor most
of the time. Fixed in `sexual-health`. Still outstanding:
- `content/cards/upper-gi.json` (2) and `content/notes/upper-gi.json` (2)
- `content/cards/respiratory.json` (1)
- `content/cards/msk-rheumatology.json` (1)
- `content/cards/immunology-serology.json` (1)
- `content/cards/ct.json` (2)
- Status: awaiting a decision — a single sweep would clear all 9.

---

## Unresolved clinical questions raised during review
- **Fluconazole in breastfeeding** — BASHH is reported to advise avoiding oral
  azoles; NHS patient guidance says fluconazole can be taken while breastfeeding.
  Left silent in the app rather than assert either.
- **IUS quick-start window** — day 1–5 (current app wording) vs day 1–7. Searches
  were equivocal; the conservative existing wording was kept.
