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
- Status: **DEFERRED by the user — deal with gaps later.** Treatment could be
  added to the existing paediatric topic without creating a new topic.

### 2. Caput vs cephalhaematoma vs subgaleal haemorrhage comparison table
- The subgaleal safety callout was added during Paediatrics batch 6.
- The three-way comparison table (the examinable discriminator) was deferred as
  new content needing sign-off.
- Status: **DEFERRED by the user — deal with gaps later.**

### 3. Candidal balanitis had no home
- Was absent from the whole app except as an MCQ distractor in a Sexual Health
  investigations deck.
- Partially resolved: a note section was added to `SEXUAL HEALTH / Candidiasis
  (genital)` in batch 4. No flashcards or MCQs, per the no-new-cards rule.
- Status: resolved in the note; flag only if cards are wanted later.

### 4. Paediatric anaphylaxis doses live only in Infectious Disease and Respiratory
- The age-band IM adrenaline doses (500 / 300 / 150 / 100–150 mcg) were added to
  `INFECTIOUS DISEASE & IMMUNOLOGY / Hypersensitivity Reactions & Autoimmunity`
  in batch 5 and already exist in `RESPIRATORY / Anaphylaxis`.
- `PAEDIATRICS` has no anaphylaxis topic of its own. Worth checking whether that
  is deliberate before adding anything.
- Status: flagged, not actioned.

### 5. Neutropenic sepsis has no topic of its own
- Now covered in three places as a callout — `Sepsis`, `PUO`, and (added in batch 5)
  `Immune System Overview & Immunodeficiency` — but there is no dedicated topic,
  and a student searching for it by name will not find one.
- Status: flagged. Probably correct as-is given the no-new-topics rule.

---

## Scope questions for the user (raised by the Infectious Disease review)

### S1. The two foundational decks — DECIDED: keep everything
- `Foundations of Cell Biology & General Physiology` — 129 flashcards + 110 MCQs
  = **239 items**. `Foundations of Microbiology` — 95 flashcards + 65 MCQs =
  **160 items**. Together **399 items, 32% of the 1,245-item module**.
  (An earlier note in this file said 42%; that was wrong.)
- A screening agent proposed deleting ~114 of the 239 cell-biology items as
  below MLA level.
- **User decision: these are important, remove nothing.** Nothing was deleted at
  any point — only four factual corrections were made to wording (Friedreich's
  ataxia and anticipation, colloids, 0.9% saline, hyponatraemia correction rate).
- Closed. Do not re-raise.

### S2. Length-cue levelling is incomplete on the two foundational decks
- After the batch 6 levelling pass, 117 MCQs across the three batch-6 topics still
  have the correct answer as the longest option, median excess 24 characters.
- Almost all of these sit in the two foundational decks, which were not rewritten.
- A dedicated cue pass over those two decks would clear it. Not attempted, because
  it is a large mechanical job unrelated to accuracy.
- Status: flagged.

---

## Checked and NOT gaps (do not re-raise)

### Newborn Life Support — present, in the OSCE tab
Previously reported as "absent from the entire app". **That was wrong.** It is
fully covered under OSCE Clinical Skills in `index.html`: the NLS algorithm,
dry/warm/stimulate, 5 inflation breaths, air for term babies, heart rate as the
guide to progress, 3:1 compressions. Absent from the Conditions tab only, which
is by design — resuscitation skills live in the OSCE tab. **Recorded at the
user's request for a later decision on whether it also belongs in Conditions.**

### Trichomoniasis — present, in Obstetrics & Gynaecology
No topic in the Sexual Health module (it appears there only in comparison tables),
but `OBSTETRICS & GYNAECOLOGY / Pelvic & Vaginal Infections` covers it properly:
first-line and alternative treatment, treatment in pregnancy, partner notification
and contact tracing, and the metronidazole alcohol advice.

---

## Cross-module inconsistencies (not gaps — defects to fix)

### C. "Screen every unwell patient with NEWS2 and qSOFA" — FIXED
`content/notes/general-systemic.json` (`GENERAL / SYSTEMIC__Sepsis / The Septic Patient`)
tells students to screen with qSOFA, contradicting the corrected sepsis topic, which
states qSOFA is not the screening tool. That file is in the **Signs & Symptoms tab**,
which is out of scope for this review, so it has been left alone.
- Status: **FIXED** (user authorised the sweep). qSOFA corrected in all six
  places, blanket 1-hour Sepsis 6 replaced with the risk-based clock, and the
  cultures-first rule given its do-not-delay exception.

### D. "High-flow O2" and "antibiotics after cultures" in the risk-scores note
`content/notes/risk-scores-criteria.json` gives the Sepsis Six as "High-flow O2" (pre-dates
target saturations, conflicts with 94–98% / 88–92%) and "IV antibiotics: broad-spectrum,
after cultures" as an unqualified rule (conflicts with "never delay antibiotics in shock").
- **Correction to this entry:** the oxygen line already read "High-flow O2 **to target
  saturations**", so the claim that it pre-dated target saturations was wrong. It has
  still been improved to name the targets (94–98%, or 88–92% if at risk of hypercapnic
  respiratory failure).
- The real defects in that file were the lead calling qSOFA "a rapid bedside screen"
  (contradicting its own later text), the blanket 1-hour Sepsis Six, and the
  unqualified "after cultures".
- Status: **FIXED** (user authorised the sweep).

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
- Status: **DEFERRED by the user — deal with gaps later.** A single sweep would
  clear all 9.

---

## Unresolved clinical questions raised during review

- **IUS quick-start window** — day 1–5 (current app wording) vs day 1–7. Searches
  were equivocal; the conservative existing wording was kept. **Decision: leave
  as-is.**

### Resolved
- **Fluconazole in breastfeeding** — RESOLVED. BASHH is explicit: in breastfeeding
  women use topical imidazoles only, oral therapies avoided. The permissive NHS
  page found earlier is general fluconazole advice, not the vaginal-thrush
  guideline. A line was added to the Candidiasis note, the pregnancy card head,
  two flashcards and two Exam Pearls.


---

## Added during the Infectious Disease review

### E. `general-systemic` and `risk-scores-criteria` now conflict with more topics — FIXED
Items C and D above were raised during the Sepsis batch. Batches 4–6 added more
content those two files now contradict — the Infection Control note's statutory
notification rule, and the Inflammatory Effect note's corrected Sepsis-3 wording.
Both files remain out of the agreed scope (Signs & Symptoms tab, and a separate
module). One sweep would align them.
- Status: **FIXED** — swept on the user's instruction. See items C and D.
- Note: `general-systemic` has a **pre-existing unbalanced div** in the sepsis
  section (135 opening vs 134 closing), present at HEAD before any edit here. It
  renders without error, so it was left alone rather than silently altered.

### F. SCID newborn screening claim was overstated in my own earlier work
`Vaccinations & Immunisation Schedule` (corrected in batch 3) stated flatly that
BCG is given after the newborn bloodspot result for SCID is known. SCID screening
is an in-service evaluation covering about two-thirds of England, not a routine
UK-wide programme (UK NSC), and is not offered in Scotland, Wales or Northern
Ireland. Corrected in batch 5.
- Status: FIXED.

### G. Anaphylaxis adjuncts were the pre-2021 algorithm
`Hypersensitivity Reactions & Autoimmunity` named IV hydrocortisone 200 mg and
chlorphenamine 10 mg as adjuncts with doses, contradicting the app's own
`RESPIRATORY / Anaphylaxis` and `DERMATOLOGY / Urticaria / Angioedema` notes,
both of which already carried the current position. Corrected in batch 5.
- Status: FIXED. Worth a repo-wide grep for any other pre-2021 anaphylaxis
  wording outside the Conditions tab.

---

## Added during the Ophthalmology review

### H. `ophthalmic.json` (Signs & Symptoms tab) called ophthalmia neonatorum "notifiable" — FIXED
`OPHTHALMIC__Watery / Discharging Eye` and the card `watery-q-1` both described
gonococcal/neonatal conjunctivitis as **notifiable**. Ophthalmia neonatorum was
removed from the statutory notification list in England and Wales in 2010, and
neither it nor gonorrhoea is a notifiable disease now. Partner notification —
which is correct, and is a different thing — appears elsewhere and was kept.
- Status: **FIXED** on the user's instruction. The word was replaced with the
  action that actually matters (urgent Gram stain and culture, systemic
  antibiotics, and treating the mother and her partner).
- The Signs & Symptoms tab had already been screened, so this was a miss on that
  pass rather than an out-of-scope item.

### I. `ophthalmic.json` Red Eye read as though topical steroid treats scleritis — FIXED
Two lines in the Red Eye walkthrough said "uveitis / scleritis → steroid under
specialist care", which is right for uveitis and wrong for scleritis (systemic
NSAID first-line, then systemic steroid/immunosuppression; topical steroid is
adjunctive only). The Conditions topic was already correct.
- Status: **FIXED** — the two diagnoses are now split on both lines.

### J. SLT positioning in COAG — RESOLVED from the user's sources
A screening agent proposed that the SLT-first-line recommendation is scoped to
COAG "that is not advanced", with advanced disease going to trabeculectomy with
mitomycin C. My own searches confirmed the SLT-first-line half but returned
nothing on that exception, so it was not written.
- The user then supplied the guideline text (NICE). It confirms 360° SLT as the
  preferred initial intervention for newly diagnosed COAG **and** ocular
  hypertension, and gives two qualifiers, both of which have now been added:
  **pigment dispersion syndrome**, where SLT is generally unsuitable, and a
  **generic prostaglandin analogue offered instead** when the patient declines
  SLT, is waiting for it, or SLT is unsuitable.
- The **advanced-COAG / mitomycin C** claim is **not supported** by those
  sources either, so it remains unwritten. Treat the agent's version of it as
  unverified rather than pending.
- Status: **RESOLVED.**

### K. Option-length cues in Ophthalmology were levelled, not eliminated
Two levelling passes over the seven batch-3 topics took the median keyed-option
excess from 44.5 characters to 19, across 90 flagged items. The remaining items
are mild. Answer *position* is not a defect — `index.html` shuffles options at
serve time — but length is not shuffled, so it stays the thing worth watching.
