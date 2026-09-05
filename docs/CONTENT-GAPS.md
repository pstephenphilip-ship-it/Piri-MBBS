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

### J. SLT positioning in COAG — RESOLVED
A screening agent proposed that the SLT-first-line recommendation is scoped to
COAG "that is not advanced", with advanced disease going to trabeculectomy with
mitomycin C. My own searches confirmed the SLT-first-line half but returned
nothing on that exception, so it was not written at first.
- The user then supplied the guideline text (NICE), in two parts. All of it has
  now been written into the topic:
  - 360 degree SLT as the preferred initial intervention for newly diagnosed
    COAG **and** ocular hypertension, the reason being that avoiding drops
    removes the adherence burden.
  - **Pigment dispersion syndrome** — SLT generally unsuitable.
  - **Generic prostaglandin analogue offered instead** when the patient declines
    SLT, is waiting for it, or SLT is unsuitable.
  - **Advanced COAG at diagnosis bypasses both laser and drops** — offer
    **primary trabeculectomy with mitomycin C**, which lowers IOP further and
    better preserves long-term vision in that group, with a prostaglandin
    analogue in the interim while surgery is arranged.
- The MCQ asking for first-line treatment in newly diagnosed COAG was re-scoped
  to "that is not already advanced", because the new exception would otherwise
  have made trabeculectomy a defensible second answer.
- Status: **RESOLVED.** Lesson for later modules: two of my own searches came
  back empty on a recommendation that does exist, because the primary sources
  are proxy-blocked here. Absence of a search hit is not evidence against a
  claim in this environment — flag it as unverified and ask, rather than
  treating it as disproved.

### K. Option-length cues in Ophthalmology were levelled, not eliminated
Two levelling passes over the seven batch-3 topics took the median keyed-option
excess from 44.5 characters to 19, across 90 flagged items. The remaining items
are mild. Answer *position* is not a defect — `index.html` shuffles options at
serve time — but length is not shuffled, so it stays the thing worth watching.

---

## Added during the Geriatric Medicine review

All of the below are **outside the agreed Conditions-tab scope**, so none has been
edited. They are listed in the order I would fix them.

### L. `geriatric-assessment.json` taught DoLS law overruled in June 2026 — FIXED
The app carried a **second DoLS topic** — note key
`GERIATRIC ASSESSMENT__DoLS / Deprivation of Liberty Safeguards` and its deck of
7 flashcards and 4 MCQs — teaching the *Cheshire West* acid test as current law,
including that "compliance or lack of objection is irrelevant, and the
reason and normality of the placement do not matter".
- **`geri_dols_q01` was actively mis-keyed.** Its stem described an 84-year-old
  who "appears settled and content", keyed the acid test, and offered "She is
  content, so no deprivation of liberty is occurring" as a distractor — which on
  those facts is now defensible.
- Status: **FIXED** on the user's instruction. The note now teaches the
  multifactorial assessment with the acid test as explicitly labelled history;
  the MCQ stem was rewritten so the patient objects, making the answer
  unambiguous under the current test, and the key and explanation follow.

### M. `psychiatry.json` used the overruled acid test as a definition — FIXED
`PSYCHIATRY__Mental Health Law & Capacity` defined a deprivation of liberty as
"continuous supervision + not free to leave". Replaced with the multifactorial
assessment, noting the acid test as overruled. The stale line that LPS
implementation is "postponed indefinitely" was updated.
- Status: **FIXED.**

### N. `risk-scores-criteria.json` stated the refeeding threshold wrongly — FIXED
The MUST pane gave "little/no intake **>5 days**" as a standalone high-risk
criterion. The standalone threshold is **>10 days**; >5 days counts only within
the "two or more" list. Both NICE lists are now given in full, in the note and in
flashcard `rsc_acute_must_fc_05`, which carried the same error.
- The MUST bands exam pearl, which muddled the bands against its own section
  above it, was also corrected.
- Status: **FIXED.**

### O. `geriatric-assessment.json` Timed Up-and-Go conflicted with the falls guidance — FIXED
The note told students to "quote ≥12 seconds as the screening threshold for
increased falls risk", while current guidance — correctly taught in the Falls
topic — advises against falls-risk-prediction tools. The timings are retained for
observation and tracking, now framed as a trigger for a full multifactorial
assessment rather than a predicted risk. Flashcard `geri_tug_fc_02` carried the
same framing and was corrected with it.
- Status: **FIXED.**

### P. `general-systemic.json` used "Grade 4" for a pressure ulcer — FIXED
An option in `elderab-q-2` read "Grade 4 pressure sores" where the app's own
dermatology note teaches that UK practice uses **category**, and the Pressure
Sores topic uses "category" throughout. Now "Category 4 pressure ulcers".
- Status: **FIXED.**

### Q. Lesson carried forward on verification
Two things in this module could only be settled by checking rather than
reasoning: the June 2026 DoLS ruling (after my training cutoff, and the app's own
flashcards were ahead of its note) and the 2023 change to the total hip
replacement criteria. In both cases the app contradicted itself, and the
*newer* half was right. Where two parts of this app disagree, check which is
current before assuming the note is authoritative.

---

## ENT module (11/11 topics screened, v977–v980)

### R. Repo-wide decisions — ALL FOUR NOW RESOLVED (v981)
Raised at the end of the ENT pass, answered by the owner, and applied
repo-wide in one pass rather than piecemeal.

1. **"Monospot" — RESOLVED: lead with the generic, keep the name in brackets.**
   Monospot is a trade name for the heterophile antibody (Paul-Bunnell) test,
   but it is also standard UK exam nomenclature and appears in national
   guidance, so deleting it outright would cost recognition. About half the app
   already wrote it as "heterophile antibody test (Monospot)"; that form is now
   used everywhere — 16 substitutions across `ent`, `haematological`,
   `immunology-serology`, `infectious-disease-immunology`, `microbiology`,
   `haematology` and their card files, plus one tag-split repair and two grammar
   repairs my own substitution introduced.
   - Deliberately kept bare in six one-word MCQ option lists (expanding it there
     would create a length cue against "FBC" / "LDH" / "TFTs") and in the
     "Monospot-positive / -negative" shorthand.
   - Status: **RESOLVED.**

2. **Brand names — RESOLVED: three categories, applied by what the brand teaches.**
   - **Category A — KEPT, deliberately.** Inhalers (Symbicort, Seretide,
     Fostair, Qvar, Clenil, Relvar, Anoro, Spiolto, Trelegy), insulins (Lantus,
     Humalog, Humulin, NovoRapid, Actrapid, NovoMix, Tresiba, Insuman, Apidra,
     Insulatard, Levemir, Toujeo, Abasaglar) and adrenaline auto-injectors
     (EpiPen, Jext). Here the brand **is** the safety point, and the app already
     teaches exactly that in `ph_rs_combo_12` ("Why must combination inhalers be
     prescribed by brand name?"), `ph_en_ins_13` ("Why must long-acting analogue
     insulins be prescribed by exact brand?") and `ph_on_trans_08` (tacrolimus).
     Stripping these would destroy the lesson.
   - **Category B — REPLACED with the defining property** (37 substitutions).
     Shingrix → "the recombinant (non-live) shingles vaccine"; Zostavax → "the
     older live-attenuated shingles vaccine"; Gardasil 9 → "the 9-valent HPV
     vaccine"; Cervarix → "a bivalent HPV vaccine"; Varilrix → "the varicella
     vaccine"; Pneumovax → PPV23; Prevenar → PCV; Menitorix → "the Hib/MenC
     vaccine"; Abrysvo → "the maternal RSV vaccine". This teaches better than the
     brand did: the property named is the one that decides whether the vaccine
     can be given in immunosuppression.
   - **Category C — STRIPPED entirely** (44 substitutions in the conditions tab,
     28 more in the pharmacology tab). Topical steroids, emollients, Gaviscon,
     Cilodex, Dymista, Buccastem, Stemetil, Movicol/Laxido, Fybogel, Ear Clear.
   - Two side-benefits of category C: the dermatology potency MCQ
     (`piri_q__conditions__DERM__Eczema__0009`) and the pharmacology potency
     ladder now both force the student to separate clobetas**one** butyrate
     (moderate) from clobetas**ol** propionate (very potent) — a distinction the
     brand names hid completely.
   - **Search aliases kept on purpose.** `PHARMA_SEARCH[i][0]` still carries
     Movicol, Laxido, Diprobase, E45, Aveeno and Doublebase as *search terms*.
     That array also builds `__DRUG_INDEX` / `__DRUG_RX`, the auto-linker, so a
     student who hears a brand on the ward still finds the monograph — which
     then teaches the generic. `PHARMA_SEARCH[i][1]` was re-synced to the new
     monograph titles; verified 0 orphaned search entries out of 1046.
   - Status: **RESOLVED.**

3. **Duplicate card ids — RESOLVED: 62 ids renamed.**
   Investigating how the app keys progress showed the collisions were a *real*
   bug, not cosmetic. SRS is namespaced by deck key (`srsId(pk,id)`), and
   flashcard mastery is namespaced per tab/system/topic (`fcProgKey`) — but the
   **pharmacology tab alone** uses a single global set, `piri_ph_mastered`, keyed
   on the **bare card id**. "Mood Stabilisers" and "Multiple Sclerosis
   Disease-Modifying Therapies" both abbreviate to `ms`, so 36 ids collided and
   mastering a card in one deck silently marked the other deck's card mastered.
   All 62 MS DMT ids are now `ph_np_dmt_NN`; the pharmacology tab has 0 duplicate
   bare ids.
   - The other ~163 repo-wide duplicate string ids were checked and are
     **harmless**: none is duplicated *within* a single deck, and all sit in
     namespaced tabs. The integer ids (urology, cardiovascular, endocrinology,
     acute-abdomen, gastroenterology) are likewise fine.
   - Status: **RESOLVED.**

4. **`ENT__Facial Pain` "antibiotics if bacterial / severe" — RESOLVED.**
   That is exactly the loose formulation the 10-day rule exists to displace, and
   students cannot tell bacterial from viral sinusitis at the bedside — which is
   the whole reason the rule is a *duration* rule. Replaced in both places with
   the correct ladder: analgesia and no antibiotic at or under 10 days; beyond 10
   days without improvement, a high-dose intranasal corticosteroid ± a back-up
   phenoxymethylpenicillin (NICE). The presentations tab now matches the
   conditions-tab topic.
   - Status: **RESOLVED.**

### R2. Pharmacology-tab brand names — RESOLVED (v982)
Owner's rule: **keep the brand if it is what students actually learn; strip it
if it is brand-specific with no teaching value** (the "Advil" test). Applied to
all 574 monographs, 68 substitutions.

**KEPT — the name students genuinely learn or hear said aloud**
- Inhalers, insulins, adrenaline auto-injectors (category A, unchanged).
- `Clexane`, `Tazocin` — said constantly on UK wards.
- `Sinemet`, `Madopar`, `Stalevo` — how UK Parkinson's prescribing is written.
- `Mirena`, `Kyleena`, `Levonelle` — standard UK contraception nomenclature.
- `Syntocinon`, `Syntometrine` — standard UK obstetric nomenclature.
- `Buscopan`, `Entresto`, `Herceptin`, `Tamiflu`, `Malarone`, `Riamet`,
  `Ferinject`, `DigiFab`, `Truvada`, `Kaftrio`, `Entonox`, `Calcium Resonium`.
- `Curosurf` / `Survanta` — neonatal units use these, and the two differ in
  source and dose, so the brand carries the distinction.
- `Cyanokit`, `Tensilon` — the antidote is stocked under that name, and the
  "Tensilon test" is standard myasthenia nomenclature.
- `Handihaler`, `Respimat` — device names; the device matters clinically.
- `Hemgenix`, `Roctavian` — gene therapies with no usable generic name in
  practice (the INN is given alongside).
- `Avastin` — kept deliberately: the whole teaching point is "bevacizumab
  (Avastin) = cheap off-label cousin", so the brand *is* the lesson. Its
  siblings (`Lucentis`, `Eylea`, `Beovu`, `Vabysmo`) were stripped, because
  there the generic is what is taught.
- `Calpol` — kept in the paediatric OSCE script, where it is quoted speech to a
  parent ("Have you given any Calpol or ibuprofen?"). That is realistic
  patient-facing language, not pharmacology teaching.

**STRIPPED — brand-specific, no teaching value**
Advate, Kogenate, Benefix, Beriplex, Octaplex, Cosmofer, Descovy, Digibind,
Dovonex, Silkis, Dovobet/Enstilar, Esmya, Hemlibra, Menopur, Puregon, Gonal-F,
Mestinon, Praxbind, Protopic, Elidel, Tysabri, Piriton, Lucentis, Eylea, Beovu,
Vabysmo, Cosopt, Latisse, Lumigan, Rifinah/Rifater, Oxbryta, Qfitlia,
"Ketoconazole HRA".
Where a brand carried meaning, the meaning was kept: Descovy → "TAF-based"
(the safety and daily-only points survive); PCC, recombinant FIX, FSH,
"fixed-dose combination tablet" all replace their brands directly.

**Findability preserved.** `PHARMA_SEARCH[i][0]` keeps every stripped brand as
a search term, and 14 new aliases were added for brands that had existed only
inside a monograph title (Tysabri, Piriton, Protopic, Elidel, Mestinon,
Praxbind, Esmya, Hemlibra, Dovonex, Silkis, Digibind, Benefix, Oxbryta,
Cosopt). 1060 entries, 0 orphans. A student who hears the brand still reaches
the monograph, which then teaches the generic.

**Caught in the same sweep and fixed:** a trial name (CATT), a company name
(Pfizer), and four dates (Sept 2024, the two Esmya suspension years, the
JCVI/MHRA years on the RSV and topical-steroid entries).

### R3. Years and issuing-body names in the pharmacology tab — OPEN
The brand sweep incidentally showed that the pharmacology monographs carry
roughly **35 remaining year references** — "MHRA 2020", "NICE 2022",
"BASHH 2019", "RCUK 2021", "ESC 2023", "withdrawn worldwide in 2024",
"EMA marketing authorisation withdrawn (2023)", "Class C, Nov 2023" and similar
— plus one more trial name (STAND) and two non-UK bodies (ESC, EMA) that are
not on the approved issuing-body list.
Under the house rule the bracketed body is fine but the year is not. I removed
only the years on lines I was already editing for brands, so the tab is
currently inconsistent. This is a distinct defect class from brand names and
was not part of the brand decision, so it is left for the owner to call.
   - Status: **OPEN — owner decision.**

### S. Cross-file contradictions found and fixed during the ENT pass
Recorded because the pattern matters: in every case the conditions tab was one
half of a disagreement, and the fix was applied to whichever half was wrong.
- `neurology-neurosurgery.json` and `risk-scores-criteria.json` — a Bell's palsy
  section title carrying a document name, and the Centor/FeverPAIN probability
  error, both corrected to match the conditions tab.
- The neurology Ménière's topic is a 1:1 twin of the ENT Ménière's content; the
  ENT copy was the stale pre-correction version. It was brought up to the
  corrected twin, and three further improvements were synced back so the two do
  not drift apart again.
- `pharmacology-flashcards.json` `ph_ab_pen_19` named amoxicillin for sinusitis;
  first-line is phenoxymethylpenicillin. Corrected — a factual error contradicting
  the conditions tab, distinct from the brand-name items above, which are style.
- The sore-throat deck gave azithromycin as the scarlet fever penicillin-allergy
  alternative against paediatrics' clarithromycin. Aligned on clarithromycin.

### T. Items deliberately not changed, with reasons
- **Kiesselbach's plexus contributors.** The epistaxis topic lists a posterior
  ethmoidal contribution alongside the standard four. Anatomy sources genuinely
  differ; left as it stands rather than changed on low confidence.
- **"~60% lifetime" and "~90% anterior" epistaxis figures**, and the "~10%"
  chronic rhinosinusitis prevalence. Standard examinable figures that could not
  be tied to a UK issuing body; left unchanged, and the CRS figure is worth
  softening to "common" if it is ever revisited.
- **Topical tranexamic acid in epistaxis** was attributed to NICE in four places
  and called "better than anterior packing". No NICE recommendation for it could
  be found, and the largest UK randomised evidence found no benefit over placebo.
  The attribution was removed and it is now taught as an optional adjunct — but
  absence could not be proved from a blocked source, so this is worth a
  spot-check.

### U. Lesson carried forward
Two ENT findings could only be settled by checking rather than reasoning: that
the arachis (peanut) oil excipient has been removed from the chlorhexidine–neomycin
nasal cream, which makes the widely-taught "contains peanut" caution wrong in the
present tense; and that four head-and-neck referral criteria attributed to NICE
in the app were withdrawn from the current guideline and belong to older
guidance. Both were still being taught as current. Where content names a
guideline or a product, check it is still true before trusting it.
