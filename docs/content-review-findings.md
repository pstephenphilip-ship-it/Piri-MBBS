# Content review findings

Compiled while reformatting the conditions flashcards for layout. Every entry
was found by reading the cards, not by generating them, and each was verified
against the raw JSON before being written down.

**Nothing in this file has been changed in the deck** unless it is explicitly
marked FIXED. The formatting work deliberately preserved every word; these are
observations for whoever owns the medical content.

Conventions used throughout:

- **"absent from this topic"** means the fact exists elsewhere in the app. This
  is a routing observation, not a gap.
- **"absent from the app"** means an anchored search across all card files
  (excluding `pharmacology-flashcards.json`), including list-valued quiz fields
  such as `options`, found nothing. This is the stronger claim and is rarer.
- Card references are `topic [index]`, 0-based, matching the position in the
  `fc` array at the time of review.

---

# Content findings — reported, NEVER fixed
Formatting session only. Everything here is for the content session to decide.
Each entry: file / topic / card index (position in the topic array, not id).

## endocrinology.json — Acid-Base Balance
- Compensation model. The file ALLOWS full compensation and defines MIXED by the
  pH CROSSING to the opposite side, not by a normal pH.
    card 14 "Partial (pH still abnormal) vs full (pH back in range)."
    card 9  "never fully overshoots — if pH has crossed … suspect a mixed"
    card 24 "pH rarely fully corrects."
  Self-consistent across 9/11/14/24. Marked up as written.
- Absent: Winter's formula, delta ratio, a base-excess card (BE appears only as
  a normal value "±2" inside card 3).
- card 38 "COPD chronic adaption" — probably "adaptation". A word change, untouched.
- card 27's whole back is duplicated as the last clause of card 26.

## endocrinology.json — Neck Lumps
- Absent: anterior/posterior triangle contents, Virchow's/supraclavicular node,
  pharyngeal pouch.
- Same operation, two names: card 25 "diagnostic hemithyroidectomy",
  card 30 "diagnostic lobectomy".
- Uses current NICE wording "suspected cancer pathway referral", not "two-week-wait".

## haematology.json — Foundations of Haematology physiology (143 cards, 6 blocks)
  0-28 coagulation cascade | 29-45 haemostasis | 46-66 natural anticoagulants
  67-93 haemopoiesis | 94-121 red cell | 122-142 white cells
- BLOOD GROUPS ABSENT. Zero word-boundary hits for blood group/ABO/Rhesus/RhD/
  Coombs/crossmatch/agglutin across all 143 cards. Independently confirmed.
- JAK2 absent from Foundations entirely, including card 88 which defines the
  myeloproliferative disorders without any genetics.
- PT/APTT direction is CORRECT and consistent across cards 2,5,6,10,11,14.
  Independently confirmed: PT=extrinsic, APTT=intrinsic, both + common.

## haematology.json — Polycythaemia vs Myeloproliferative Disorders (overlap on PV)
- EPO IN SECONDARY POLYCYTHAEMIA — the two topics disagree. Confirmed directly:
    MPN 7  "EPO is LOW in PV … but HIGH in secondary"
    MPN 31 "EPO is high in secondary polycythaemia — the key discriminator"
    Poly 7  "normal or high in secondary … a normal EPO does not exclude a
             secondary cause, and in COPD, OSA, smoking … frequently normal"
    Poly 24 same caveat.
  Poly 5/6 also say flatly "EPO HIGH", so Polycythaemia disagrees with itself too.
  The Poly 7/24 wording is the clinically safer one.
- Gaisbock: Poly 30 warns it is one subtype, NOT a synonym for the category;
  MPN 35 uses exactly that loose equation. Poly 30 also adds diuretics as a
  cause of relative polycythaemia where MPN 6 lists only two.
- Aspirin threshold punctuation: Poly 12/36 ">1000-1500" (hyphen),
  MPN 18/29/38 ">1000-1500" (en dash). Same value, different dash. Not normalised.
- Diagnostic Hct: Poly 39 (WHO) >0.49 men / >0.48 women vs Poly 29/35 and MPN 16
  >0.52 men / >0.48 women — but card 39 flags the UK-practice difference itself,
  so self-explained rather than contradictory.

## haematology.json — Anaemia / Thalassaemia / Sickle
- RDW ABSENT from all three topics (0 hits). The microcytic fork rests entirely
  on ferritin / TIBC / transferrin saturation.
- Mentzer index appears ONCE, Thalassaemia 39, and the direction is CORRECT:
  "<13 = thalassaemia; >13 = iron deficiency". Confirmed against raw JSON.
  It appears NOWHERE in the Anaemia topic (0 hits) — so a learner meets the
  microcytic fork without it.
- HbA2 likewise absent from the Anaemia topic (0 hits); Anaemia 102 says only
  "confirm with Hb electrophoresis/HPLC" without naming the analyte.
- NO FOLATE-DEFICIENCY CARD in its own right (0 fronts about folate alone) —
  no causes, no features, and the file never states positively that folate
  deficiency spares the cord. The B12-before-folate warning IS present and
  explicit (Anaemia 88, 134), so the neurological distinction is only implied.
- Hyperhaemolytic crisis is not named anywhere in Sickle.
- Cosmetic, untouched: Anaemia 8 "Iron deficiency" vs 16 "Iron deficiency
  anaemia"; Sickle 17 oxygen "if SpO2 95% or below" vs 36 "titrated to >95%".

## haematology.json — acute oncology group
- Malignant hypercalcaemia block (Onc emerg 23-26, 47) gives NO calcium value
  at all — no corrected/adjusted calcium, no treatment threshold.
- TLS gives no numeric potassium threshold (directions only: K+, phosphate,
  urate UP; calcium DOWN — Onc emerg 18, confirmed).
- Neutropenic sepsis definition agrees across neutsep 1/16/22 and onc emerg 2
  (neutrophils <=0.5, temp >38C, antibiotics within 1 hour, Tazocin first-line).
  TYPOGRAPHY does not agree: "0.5 x10^9/L" vs "0.5 x 10^9/L"; ">38C" vs ">38 C";
  piperacillin-tazobactam spelled with hyphen, slash and en dash.
- Antifungal escalation window "4-6 days" (neutsep 10, 20) vs "4-7 days
  (~96 hours)" (neutsep 28).
- neutsep 1 and 22 are word-for-word duplicate definition cards.
- ASCII/Unicode inequality mixing: "<=8 g/dL" (malaria 35), ">=20%" (pancyt 34)
  against the Unicode forms elsewhere.

## haematology.json — malignancy group
- AML AGE CONFLICT (confirmed against raw JSON). Cards 3 and 7 give ">75y" —
  card 7 is the mnemonic "ALL <5 & >45 · CLL >55 · CML ~65 · AML >75 (rises
  across the alphabet)". Cards 21 and 41 give "median ~70y" / "median age at
  diagnosis around 70". The mnemonic needs AML to sit above CML's ~65, which
  is plausibly why it drifted. ~5-year disagreement; editorial call.
- Rouleaux ABSENT from all four malignancy topics (it lives in
  investigations__HAEMATOLOGY__Blood Count & Film, cards 26 and 30).
- "Pepperpot skull" does not appear; the file's term is "raindrop skull"
  (myeloma 24, 35).
- No serum paraprotein concentration threshold (no "30 g/L") for MGUS vs
  smouldering — the file says only "Higher paraprotein".
- Correct and consistent, checked: Auer rods AML-only; smudge cells CLL-only;
  Philadelphia t(9;22) on CML and correctly also flagged in Ph+ ALL rather
  than claimed CML-exclusive; B symptoms identical on 5 cards; Ann Arbor
  present with E and S modifiers; CRAB thresholds; MDS/AML blast cut-off 20%
  with the genetic override.
- Notation mixing: ASCII ">=1"/">=20%" (MDS 21, 23) vs Unicode (MDS 3, 22, 26, 39).

## haematology.json — haemostasis / transfusion group
- NO SINGLE platelets/PT/APTT/fibrinogen/D-dimer GRID EXISTS. It is split across
  three topics with different column sets, and two rows are simply missing:
  the haemophilia/VWD table (haemo 27-34) has NO fibrinogen and NO D-dimer row;
  the thrombocytopenia table (thromb 21-25) merges PT and APTT into one
  "clotting" row and has neither. Fibrinogen and D-dimer appear only in the DIC
  topic, and there against liver disease and TTP/HUS, never against
  haemophilia/VWD/ITP. Nothing added.
- BLEEDING TIME IS DELIBERATELY ABSENT — the file says so in card text twice
  (haemo 9, 29): "the skin bleeding time is obsolete in UK practice". It teaches
  PFA-100 closure time instead (prolonged in VWD, normal in haemophilia).
  This is the file being MORE current than the standard teaching axis.
- TTP pentad given twice with the same five members in different order
  (thromb 14 vs 36). Not an error; the strings differ.
- TACO vs TRALI separated on four different axes across five cards (trans 26
  BP, 27 mechanism, 28 management, 29 memory hook, 32 restatement) and they
  agree. trans 24 includes fever among TRALI features, trans 32 does not —
  completeness difference, not contradiction.
- Transfusion timings absent for: minor allergic reaction (trans 21) and TACO
  (trans 25). Every other reaction carries one.
- Duplicated content, different wording: trans 13 vs 35 (CMV; "neonates up to
  28 days" vs "neonates (<=28 days)"), trans 14 vs 34 (irradiation; spells the
  disease TA-GVHD and TA-GvHD respectively).
- thromb 20 uses ASCII ">=150 x10^9/L" against Unicode elsewhere.
- Platelet thresholds framed differently but NOT conflicting: thromb 32
  (">=50 adequate for most invasive procedures") vs trans 33 ("<50 pre-
  procedure") is threshold-to-treat vs target; DIC 27 is DIC-specific.
- thromb 2 lists hapten drugs as quinine/vancomycin/sulfonamides; thromb 38/49
  add abciximab.

## dermatology.json — infections / cellulitis / burns
- NO INFESTATION CONTENT IN DERMATOLOGY AT ALL. Zero hits across all 23
  dermatology topics for scabies/pediculosis/head lice/burrow/permethrin/
  malathion/Sarcoptes. Confirmed independently.
  BUT it is not missing from the app: sexual-health.json has 34 hits and
  infectious-disease-immunology.json has 5. So the content exists, just not
  where a student would look for it. Filing decision, not a gap.
- Skin Infections (132 cards) is six contiguous blocks but the file NEVER
  LABELS THE ORGANISM CLASSES and has no organising card: tinea 0-21 (fungal),
  HSV 22-44, VZV 45-69, molluscum 70-89, warts 90-110 (all viral),
  impetigo 111-131 (bacterial). The class split is implicit in card order only.
- Skin Infections names no cellulitis antibiotic; the Cellulitis topic gives
  flucloxacillin (NICE, 500mg-1g QDS, 5-7 days). No conflict — impetigo's oral
  first-line in Skin Infections is also flucloxacillin.
- Parkland given with BOTH figures and the reason: "Classically 4 mL x weight
  x %TBSA over the first 24 hours ... UK burn services commonly start lower,
  at 3 mL" — the file explains the divergence rather than picking one.
  Verified intact after markup.
- Burns carries two threshold sets: fluid resuscitation >=15% adults / >=10%
  children (noting some UK units use 20%), and burns-unit referral >=2% child
  / >=3% adult.
- Nec fasc appears in BOTH Cellulitis (4, 6, 21, 23) and Dermatological
  Emergencies (4 more cards) — reported consistent on "pain out of proportion".

## dermatology.json — the psoriasis/eczema distribution contrast (CROSS-TOPIC TENSION)
Neither the Psoriasis nor the Eczema topic contains a card contrasting the two;
each states only its own side. The contrast DOES exist, but only in the
vocabulary topic, Skin Lesion Morphology & Terminology card 28:
  "Extensor (elbows/knees) = psoriasis; flexural (creases) = atopic eczema; ..."
That flat pairing is qualified by the disease topics themselves:
  - Eczema card 7: "Infancy: face, scalp and EXTENSOR surfaces; children and
    adults: usually the FLEXURES" — so the eczema side is AGE-DEPENDENT.
  - Psoriasis card 6: psoriasis has its own FLEXURAL (inverse) subtype.
So a learner meeting Morphology 28 alone gets a rule that two other topics
partly contradict. Not an error in any single card; an artefact of the contrast
living in the vocabulary topic rather than in either disease topic. Reported.

## dermatology.json — cancer / lumps / morphology / SK
- AK -> SCC transformation risk is stated ONLY QUALITATIVELY ("a small risk",
  "small per lesion but significant cumulative population risk"). No numeric
  rate anywhere for AK or Bowen's.
- Two melanoma diameter figures coexist and are BOTH CORRECT because they
  belong to different instruments: ABCDE ">6 mm" (card 45) vs 7-point checklist
  ">=7 mm" (card 47). Not a conflict; worth not "fixing".
- WLE margins are given BY STAGE (in situ >=0.5cm, I >=1cm, II 2cm) while
  self-labelling as "guided by Breslow thickness"; NICE NG14 specifies them by
  thickness band. Internally consistent, so left as written.
- Morphology size cut-offs leave EXACTLY 1 cm unclassified for macule/patch
  (<1 vs >1) and for pustule (<1). Papule/plaque and vesicle/bulla use <=1/>1
  and are complete. Card 11 restates this, so the file is self-consistent.
- Near-duplicate cards in the cancer topic: 27 vs 68 (actinic keratosis),
  52 vs 92 (lentigo maligna), 25 vs 26 (SCC vs BCC).
- Lichen planus cards 2 and 21 both give the 6 P's mnemonic.
- LP hepatitis C: the file is MORE careful than standard teaching — says the
  association is strong in Mediterranean/Japanese series but "weak to absent in
  UK and northern European series, so it does not justify reflex serology in
  everyone". Deliberately left; do not "correct" toward the textbook version.

## dermatology.json — emergencies / immunobullous / erythema / urticaria
- AGEP IS ABSENT FROM THE ENTIRE APP. Zero hits deck-wide (all files, fc and q)
  for "AGEP" / "acute generalised exanthematous" / "pustulosis". It is a
  recognised severe cutaneous adverse reaction and sits naturally beside
  SJS/TEN and DRESS. Genuine gap, nothing added.
- DRESS appears only 3 times and never gets its own card — always a comparator
  (emerg 16 "the exception at 2-8 weeks", 57, 65).
- SCORTEN appears ONCE (emerg 21), names all seven variables and calls it a
  mortality score, but gives NO cut-offs and no score-to-mortality table.
- "Iris lesion" phrasing never appears (0 hits); the file describes the target
  lesion's three zones in full (erythema 5) but not under that synonym.
- SJS/TEN BSA thresholds verified intact after markup: SJS <10%, overlap 10-30%,
  TEN >30% (emerg 12), restated at emerg 2. Standard figures.
- Nikolsky coherent across 16 cards and both topics: POSITIVE in SJS/TEN, SSSS
  and pemphigus vulgaris; explicitly NEGATIVE in bullous pemphigoid.
- Every one of the five emergencies appears in TWO non-contiguous runs (an
  overview run at cards 2-6 plus its own block) — recurrence must be judged
  against the whole topic, not the run in view.
- Immunobullous 17 and 57 are near-duplicate immunofluorescence cards
  (same three patterns, different order and capitalisation).
- emerg 23 calls the SJS/TEN split "FULL-thickness split (dermo-epidermal
  junction)" — loose (full-thickness epidermal necrosis with a sub-epidermal
  split) but internally consistent with 22, 76, 83. Left alone.
- erythema 7 says EM has "no/minimal mucosal involvement" while erythema 12
  defines EM MAJOR as "skin + mucosal". Standard EM-major tension; the file
  flags it itself.

## dermatology.json — CTD / systemic signs / leg ulcers
- ABPI CARDS DISAGREE, and a compression decision hangs on them. Verified raw:
    card 13: "0.8-1.3 -> full compression safe; 0.5-0.8 (mixed) -> reduced,
      specialist supervision + refer; <0.5 -> contraindicated -> urgent
      vascular referral; >1.3 -> calcified/incompressible, unreliable -> refer"
    card 20: "<0.9 = PAD; <0.8 with an ulcer = arterial; <0.5 = critical
      ischaemia; >1.3-1.4 = calcified/incompressible -> unreliable"
  Three tensions: (a) card 13's bands are CLOSED AT BOTH ENDS, so 0.8 and 1.3
  each fall in two bands; (b) unreliable threshold is >1.3 (c13) vs >1.3-1.4
  (c20); (c) c20's "<0.9 = PAD" sits inside c13's "safe" floor of 0.8.
  NOT harmonised — this is a clinical-safety edit for a human.
- Pressure injury uses NPUAP/EPUAP with 4 numbered categories PLUS two
  unnumbered (unstageable, deep tissue injury). Risk tools: Waterlow, Braden,
  Norton; NICE 6-hour documentation window; SSKIN bundle.

## dermatology.json — A RECURRING STRUCTURAL PATTERN (not a single-card defect)
The dermatology CONDITIONS deck is missing several things a dermatology
revision session would expect, and in every case the content exists in a
SIBLING FILE rather than being absent from the app:
  - infestations (scabies/lice): 0 in dermatology.json;
    34 in sexual-health.json, 5 in infectious-disease-immunology.json
  - Raynaud / systemic sclerosis / CREST / morphoea: 0 in dermatology.json;
    Raynaud 69 deck-wide, systemic sclerosis 50 deck-wide
  - pyoderma gangrenosum: 0 in dermatology.json;
    18 deck-wide, 13 of them in dermatological.json
  - erythema nodosum: not in Cutaneous Signs of Systemic Disease; it lives in
    the Erythema Reactions topic of the same file
  - AGEP: 0 ANYWHERE in the app (the one true absence, see above)
So this is a FILING question, not a content-writing question, except for AGEP.
A student revising the Dermatology tab will not meet any of the above.

## psychiatry.json — Mental Health Law & Capacity (44 cards)
VERIFIED CORRECT (I ran my own numeric check: 0 mismatches across all 88
fields, section numbers including the composite "S5(2)" intact, no tag
boundary inside any number):
  s2  28 days, assessment, NOT renewable, AMHP + 2 doctors (one s12-approved)
  s3  6 months, treatment, renewable
  s4  72 hours, emergency, 1 doctor + AMHP/NR
  s5(2) 72 hours doctor/AC in charge; s5(4) 6 hours MH or LD nurse
  s135 court warrant, private dwelling, 24 hours
  s136 no warrant, anywhere but a private dwelling, 24 hours + one 12-hour
       extension, and correctly reaches hospital premises including A&E
  s17A CTO 6 months renewable, RC + AMHP agreement
All durations and roles match the MHA 1983 as amended, including the
post-Policing and Crime Act 2017 changes. No error found.
MCA: two-stage test correctly ordered with the causal link stated; four
elements as URWC; DoLS named as the operative framework with LPS legislated
but unimplemented (current and correctly scoped); Gillick and Fraser
correctly distinguished.

GAPS (findings, nothing added) — checked deck-wide, not just this topic:
  - s7 GUARDIANSHIP: 0 hits ANYWHERE in the app.
  - s37/s41 hospital and restriction orders: 1 hit deck-wide
    (psychiatry-cognition), absent from the law topic.
  - s117 AFTERCARE: 5 hits deck-wide but only 1 in psychiatry.json, and it is
    not taught in the law topic. s117 is the aftercare duty following s3 —
    a common exam point and a real practice duty.
  - Tribunal appears only as a right (card 40), with no timescales.

## psychiatry.json — other topics in this batch
- Autism uses the DSM-5/ICD-11 DYAD explicitly; the word "triad" appears
  nowhere. Current, not an omission.
- LD is graded by IQ band (mild ~50-69, moderate 35-49, severe 20-34,
  profound <20) but the file corrects itself on card 6 ("IQ bands are a guide
  only; severity is graded primarily on adaptive functioning and support
  needs") and card 2 ("IQ < 70 alone is NOT a learning disability without
  impaired adaptive functioning AND childhood onset"). Not IQ-reductive.
- Gender dysphoria: ICD-11 "gender incongruence" (moved out of the mental
  disorders chapter) vs DSM-5 "gender dysphoria"; puberty blocker card
  matches the current UK position including the private-prescription
  prohibition and its three exceptions. Nothing out of date found.
- Cosmetic: IQ and age bands mix en dash (50-69, 16-17) and hyphen (35-49,
  20-34). Preserved byte-for-byte.

## psychiatry.json — dementias / substance / WKS / TGA
VERIFIED CORRECT against raw JSON:
- Wernicke triad is the RIGHT one: "Confusion + ophthalmoplegia/oculomotor
  signs (nystagmus, CN VI palsy) + ataxia (broad-based gait)" (WKS 7).
  Confabulation does NOT appear in the triad card — that is the common
  misremembering and the file avoids it. Stated consistently 3 times.
- The file also says the full triad appears in only ~10-16% of cases and to
  treat on any ONE feature in an at-risk patient (WKS 5, 8).
- Thiamine BEFORE glucose stated 3 times WITH the mechanism (WKS 4, 13,
  Substance 16), plus the magnesium-activates-thiamine point (WKS 16).

GAPS (findings, nothing added):
- COGNITIVE SCREENING TOOLS ARE NAMED BUT CARRY NO CUT-OFFS AT ALL.
  Dementias card 57 names 6CIT, 10-CS, Mini-Cog, TYM, MoCA, ACE-III and notes
  the MMSE is copyright-restricted — but gives not one numeric threshold for
  any of them. So the deck can name the tools and cannot score them.
- AMTS and 4AT: 0 hits in the Dementias topic. The 4AT is the NICE-endorsed
  delirium tool and the topic teaches dementia-vs-delirium in detail.
- CAGE, FAST and AUDIT-C are named without cut-offs; AUDIT and CIWA-Ar DO
  have full cut-offs (AUDIT >=8 / >=16 / >=20; CIWA <8 / 8-15 / >=15).
- Chlordiazepoxide regimen given as "reducing over ~5-7 days" with NO
  milligram schedule anywhere.
- Typographic: WKS 5 "10-16%" (hyphen) vs WKS 8 "10-16%" (en dash).

## TOOLING NOTE — why locate-and-wrap beats retyping (validated again)
An agent composing a list item typed a CURLY apostrophe into "can't" where the
file uses a straight one (WKS 36). Because every output character must be a
located slice of the source, the locate step FAILED LOUDLY instead of silently
substituting the character. A retype-based builder would have shipped it and
both the word check and the character check would have flagged it only as an
unexplained diff. This is the third independent confirmation that the
locate-by-index rule is what makes the guards meaningful.

## psychiatry.json — drugs / personality / schizophrenia / delusional
VERIFIED against raw JSON (my own check: 0 numeric mismatches across all 168
drug-topic fields, no tag boundary inside any number):
- Lithium: target 0.6-0.8 mmol/L (0.8-1.0 after relapse), toxicity above ~1.5;
  levels 12 hours post-dose, weekly until stable, 3-monthly first year then
  3-6-monthly; thyroid/renal/calcium 6-monthly. All intact and correct.
- Clozapine FBC schedule consistent in 3 places: weekly 18 weeks, fortnightly
  to one year, then 4-weekly.
- NMS vs serotonin syndrome separated on all three axes and consistent across
  4 cards: NMS = lead-pipe rigidity + HYPOreflexia, slower onset, dopamine
  blockade; SS = clonus + HYPERreflexia, rapid onset. (The file says "clonus",
  never "myoclonus".)

GAPS (checked deck-wide, nothing added):
- "NEVER RESTART CLOZAPINE WITHOUT SPECIALIST ADVICE" IS ABSENT from
  psychiatry.json. The only restart guidance is "Missed >48h -> re-titrate
  from a low dose". Deck-wide there are 2 loosely-matching hits, both in
  other files. This is a patient-safety rule worth a human's attention.
- FOLIE A DEUX / induced or shared delusional disorder: 0 hits ANYWHERE in
  the app, though the Delusional topic covers Capgras, Fregoli, Cotard,
  Othello, de Clerambault, Ekbom and Charles-Bonnet.
- No first-line ANTIPSYCHOTIC agent is named anywhere (only "an oral
  antipsychotic chosen jointly... guided by side-effect profile").
- Akathisia and drug-induced parkinsonism carry NO timing, while acute
  dystonia ("early") and tardive dyskinesia ("months to years") do.
- Schizophrenia duration uses "UK practice" / "the American criteria" and
  never the labels ICD or DSM. Deliberate-looking; left alone.

INTERNAL DISAGREEMENTS (left byte-identical):
- Adequate antipsychotic trial: drugs 19 says "6-8 weeks", schizophrenia 29
  says "4-6 weeks".
- Clozapine myocarditis window: drugs 20 "first 2 months", schizophrenia 35
  "first few weeks".
- Near-duplicate pairs in the drug topic: 7~76, 23~77+78, 41~79+80, 42~81,
  46+47~82, 20~83; personality 6~18; delusional 5/6 differ only by
  "(part 1)"/"(part 2)".

## PROCESS NOTE — agent temp-file collision (handled, no data affected)
Two agents in the psychiatry batch independently chose the same "PSY4_" temp
prefix; one overwrote the other's shared library mid-run. The affected agent
detected it via an import failure, isolated its work in a subdirectory and
regenerated all four of its outputs. I re-validated ALL TWELVE psychiatry
output files afterwards, including ones already passed, and all 12 were clean.
The guard is independent of whatever library produced a file — ingest.py
re-derives every field from the source — so a clobbered build cannot pass.
FUTURE: give each agent a unique temp prefix in the prompt.

## psychiatry.json — eating / sleep / somatisation / sleep paralysis
PROSE DEFECT (confirmed raw, NOT fixed — a word-order fix is a content edit):
  Sleep Disorders card 19: "...caused by loss of orexin (hypocretin)
  signalling — the defining lesion of narcolepsy type 1 — the wakefulness
  neuropeptide."
  The closing apposition "the wakefulness neuropeptide" describes OREXIN, but
  an interpolated clause has been pushed between them, so it now reads as
  describing "the defining lesion of narcolepsy type 1". Facts are correct;
  the sentence is broken. Worth an editor moving the clause.

GAPS (checked deck-wide, nothing added):
- NO BMI FIGURE FOR ANOREXIA ITSELF. BMI appears in only 3 backs (50 refeeding
  risk "under 16", 58 "Weight/BMI trend", 72 admission "below 13 in an adult").
  The definition cards say only "a markedly low body weight". So the deck gives
  BMI thresholds for refeeding risk and for admission but never for diagnosis.
- MARSIPAN / MEED / RCPsych: 0 hits in psychiatry.json (3 deck-wide, in
  bedside-tests and psychiatry-cognition). Card 72's admission parameters are
  recognisably MEED/MARSIPAN-shaped but no framework is cited.
- No numeric electrolyte thresholds for refeeding — only "a low
  K+/phosphate/magnesium before feeding". Figures that ARE given: 10 kcal/kg/day
  (5 in extreme risk), 4-7 days, thiamine 200-300 mg daily, first 10 days.
- "Insight" is never used as an anorexia/bulimia discriminator — the file
  separates them on weight, compensatory behaviour and driving belief only.

VERIFIED CORRECT / notable:
- Admission criteria (card 72) intact after markup: HR <40, systolic BP <90
  with marked postural drop, temp <35.5C, QTc >450 ms, K+ <3.0 mmol/L,
  hypoglycaemia, BMI <13, inability to sit up or stand without using the arms.
- CBT-i is explicitly first-line for insomnia AND the file explicitly warns
  that sleep hygiene alone is NOT effective treatment for chronic insomnia.
  That trap is unusually well put; it was given fc-caveat.
- ARFID vs anorexia rests on the ABSENCE of body-image disturbance, stated on
  six separate cards — the best-covered discriminator in the topic.
- The Sleep Paralysis standalone topic and the 2 sleep-paralysis cards inside
  Sleep Disorders AGREE on mechanism, timing, benignity, management and the
  narcolepsy link. Difference is depth only. No contradiction.
- Anorexia/bulimia contrast is stated ASYMMETRICALLY: the bulimia block carries
  the explicit comparisons; the anorexia block (9-20) has no "how does anorexia
  differ from bulimia" card.

Minor, untouched: Eating 16 has a stray closing apostrophe ("the 'G's'.")
where card 14 has "the 'G's."; ion typography mixes ASCII (H+, Cl-, K+) and
superscript across cards 28/50 vs 53/54; CBT-i vs CBT-ED capitalisation.
Duplicate pairs: Eating 41/71 (ARFID management), 14/16, 28/52, 48/55.

## psychiatry.json — mood / anxiety / self-harm / PTSD
MY OWN BRIEFING ERROR, caught by the agent: I described Depressive Disorders
as a single-disease topic. It is an UMBRELLA — overview 0-7, major depression
+ pharmacology + ECT 8-38, SAD 39-52, perinatal 53-68 (with its own internal
triad: baby blues / PND / postpartum psychosis). The agent applied umbrella
handling and said so rather than obeying quietly. Correct.

INTERNAL TENSIONS (reported, untouched):
- LIGHT THERAPY IN SAD IS SELF-CONTRADICTORY. DEP 3 "with light therapy as an
  option"; DEP 48 "a SAD-specific adjunct"; DEP 50 "evidence modest/mixed so
  an adjunct/option"; but DEP 51 "Light therapy is the SAD-specific option,
  THOUGH IT IS NOT RECOMMENDED BY NICE because the evidence is limited."
  Three cards offer it, one says NICE does not recommend it.
- PTSD threshold stated both ways: PTSD 2/9 and ANX 67 use ">=1 month";
  ANX 68 uses a strict ">1 month" and silently equates 4 weeks with 1 month.
- GAD "if under 30, see within 1 week" vs depression "at 1 week if under 25".
  The file FLAGS this difference itself (ANX 26), so it is deliberate.

GAPS (nothing added):
- NO PHOBIA BLOCK in the anxiety topic. Phobias appear only as two contrast
  mentions (ANX 9, 13); agoraphobia is 2 cards inside panic.
- Adjustment disorder is ONE card (ANX 69), not a block.

VERIFIED / notable:
- Depression severity is graded on TWO instruments: ICD (mild/moderate/severe
  by symptom counts) and PHQ-9 with the current NICE two-category split
  ("less severe" <16, "more severe" >=16). DSM is used only for acute stress
  disorder and PTSD's fourth cluster, never for depression severity.
- The self-harm topic's central message is that risk stratification and
  risk-prediction scales MUST NOT be used (NICE), stated five separate times,
  including that SAD PERSONS-type mnemonics are exactly what is now
  deprecated. This is current and unusually well done.
- Antidepressant-induced switch to mania covered in both topics, naming
  venlafaxine and TCAs as highest risk.
- Lithium figures in the bipolar topic AGREE with the drug topic (0.6-0.8,
  up to 1.0, toxicity >1.5, 12h post-dose, 3-monthly then 6-monthly,
  TFT/renal/calcium 6-monthly) — two independently marked-up topics, no drift.

DEVICE-DISCIPLINE PRECEDENT SET THIS BATCH:
The self-harm topic contains ZERO fc-sub and ZERO fc-caveat. Demoting a
safety instruction into the smaller grey device would change which part of a
prohibition carries the emphasis. Where a card held two parallel prohibitions
the agent bolded BOTH rather than privileging half. Adopt this for any future
safety-critical topic (anaphylaxis, sepsis, major haemorrhage, DKA).

## orthopaedics.json — fractures / spine / neuropathies / hand / shoulder
VERIFIED (my own checks): Salter-Harris I-V all chipped correctly, with the
"V" landing on the standalone numeral and not inside "IV". Spine nerve-root
tokens: 0 mismatches across 205 fields, no tag splitting an L5-type token.
Cauda equina cards carry every red flag bolded and ZERO block devices.

GAPS — checked deck-wide with anchored patterns:
- PLASTIC DEFORMATION / BOWING FRACTURE: 0 hits ANYWHERE in the app. The
  paediatric topic covers buckle and greenstick thoroughly but the third
  classic paediatric pattern is missing entirely.
- ARCO staging: 0 deck-wide. Ficat: 6 (5 in msk-rheumatology, 1 in
  orthopaedics, where it is NAMED but its stages I-IV are never listed).
  Steinberg: 2, both msk-rheumatology.
- Ottawa KNEE rules: 0 in orthopaedics (5 deck-wide, in mri, msk,
  plain-film-fluoroscopy and risk-scores-criteria). Absent from the 23-card
  tibial-plateau block where they belong. Ottawa ANKLE and FOOT rules ARE in
  orthopaedics and given verbatim.
- Gustilo-Anderson: 0 in orthopaedics (2 deck-wide). Open fractures are
  managed clinically but with no grading system.
- Compartment syndrome is taught as a PURELY CLINICAL diagnosis — no
  compartment-pressure figures anywhere in orthopaedics (2 deck-wide, in
  msk-rheumatology). The clinical teaching is good ("pulses are usually
  present; pulselessness is a late sign").
- Cauda equina vs CONUS MEDULLARIS: not distinguished; "conus" does not
  appear in the spine topic at all.
- Compression Neuropathies covers only carpal tunnel, cubital tunnel and
  meralgia paraesthetica. RADIAL nerve entrapment and COMMON PERONEAL palsy
  are both absent — no Saturday-night palsy, no wrist drop, no PIN syndrome.
  Foot drop is covered ONLY as an L5 root lesion.
- Shoulder Disorders has NO acromioclavicular joint injury, no Hawkins-Kennedy
  and no Neer test. Card 0 states the topic's scope explicitly (cuff, capsule,
  biceps tendon), so the file is self-consistent.
- Charcot joint has no "triad" — the file gives a presentation clue, the
  X-ray "6 Ds", and three management pillars instead.

NOTE ON FILING (same pattern as dermatology): carpal tunnel, Phalen's and
Froment's are absent from Hand & Wrist Disorders but present in the separate
Compression Neuropathies topic. Not a gap — a filing choice.

INTERNAL TENSION (untouched): Dupuytren's inheritance — card 30 gives
autosomal dominant with variable penetrance; card 33 says AD with variable
penetrance AND "genuinely polygenic". Those are different claims.

DIVERGENCE FROM MY BRIEF (file wins, correctly): I asked for "Garden I-IV";
the file uses "Grade 1-4". The agent refused to convert Arabic to Roman.

## orthopaedics.json — upper limb / dislocations / ribs
THE UPPER LIMB FRACTURES TOPIC IS NOT WHAT ITS NAME SUGGESTS. It covers
distal radius (Colles'/Smith's), scaphoid, Galeazzi-Monteggia, clavicle+AC
and radial head. ABSENT as fracture blocks, with their classic nerve pairings:
  - HUMERAL SHAFT -> radial nerve. No humeral shaft card exists; the phrase
    occurs once, inside a shoulder-dislocation card warning about reduction
    technique. The classic pairing is nowhere in the topic.
  - SURGICAL NECK OF HUMERUS -> axillary nerve. Zero occurrences of "surgical
    neck". (Axillary nerve IS paired — but with shoulder dislocation.)
  - SUPRACONDYLAR -> median/AIN and brachial artery. Three mentions, all as a
    differential aside ("in a child, an effusion with no visible fracture is a
    supracondylar fracture until proven otherwise"); no nerve paired with it.
These are the three fractures most exam questions pair with a nerve, and the
deck has none of them as cards. Biggest single coverage finding in this batch.
- GALEAZZI HAS NO NERVE STATED anywhere, while its mirror Monteggia is paired
  with the posterior interosseous nerve (card 59). The asymmetry is the file's.
- Pairings the file DOES make beyond the usual list: clavicle -> subclavian
  vessels + brachial plexus (75); radial head -> PIN (94, 105).
VERIFIED CORRECT: Colles'/Smith' bidirectional (dorsal/dinner-fork vs volar/
garden-spade); scaphoid retrograde blood supply, snuffbox, AVN, MRI-first with
repeat imaging 7-10 days; shoulder posterior dislocation with lightbulb sign
and the "3 Es"; hip anterior/posterior limb positions; flail chest ">=2
fractures along >=3 consecutive ribs" AND the stronger point that the
underlying pulmonary contusion is often the main driver of hypoxia.

## orthopaedics.json — foot/ankle and knee group
- HALLUX VALGUS ABSENT entirely (no "hallux", "valgus" or "bunion" in 64 cards).
- MORTON'S NEUROMA is a one-card differential only; MULDER'S CLICK absent;
  the file says "between the 3rd and 4th toes" but never "web space".
- OBER TEST absent (Noble's is present and correct).
- GURD'S CRITERIA named but never enumerated.
- ACHILLES RUPTURE: the file states the palpable gap only POSITIVELY and never
  warns it may be absent (e.g. obscured by haematoma). Simmonds/Thompson is
  well covered, including that a ruptured Achilles can still weakly plantarflex.
- BAKER'S CYST vs DVT: I briefed this expecting a clinical discriminator. THE
  FILE DELIBERATELY SAYS THERE ISN'T ONE — "clinically indistinguishable",
  a diagnosis made AFTER excluding DVT (Wells, then ultrasound), and finding a
  cyst does not exclude DVT since they coexist and a large cyst can cause one.
  Do not "fix" this toward a clinical sign.
- RICE (card 34) vs PRICE (card 39) inconsistency; near-duplicate Ottawa cards
  3 and 36.

## PROCESS ERROR THIS BATCH (mine, recorded so it is not repeated)
I applied three agent output files BEFORE that agent reported, acting on file
existence — the exact thing this session's procedure forbids. Outcome was
clean (the guard passed, coverage was complete, and the files proved to be the
agent's final versions, 417/417 fields matching byte-for-byte). But the
exposure was real: a PARTIAL write passes every per-field check, which is
precisely why ingest.py has a separate coverage() report. Rule reaffirmed:
wait for the completion notification, then dry-run, then check coverage, then
apply.

## msk-rheumatology.json — NOTE: real key prefix is "conditions__MSK / RHEUMATOLOGY__"

### A BROKEN CARD (not a gap — the front asks what the back never answers)
Foundations of Musculoskeletal card 84:
  FRONT: "How do denosumab and teriparatide work?"
  BACK:  denosumab only (anti-RANKL, plus the rebound-fracture warning).
Confirmed: "teriparatide" appears EXACTLY ONCE in all 101 cards — in that front.
Teriparatide IS covered elsewhere in the deck (Metabolic Bone Disease), so this
is a defective card, not missing content. Highest-priority fix in this batch.

### "FOUNDATIONS OF MUSCULOSKELETAL" IS A MISNOMER
101 cards of muscle physiology, NMJ pharmacology, bone and calcium:
  A 0-21 three muscle types | B 22-41 sarcomere & cross-bridge cycle
  C 42-61 neuromuscular junction | D 62-85 bone | E 86-100 calcium
Confirmed absent from all 101 cards (anchored, 0 hits each):
  joint types / synovial joints · cartilage or chondrocytes · any autoantibody
  (ANA, anti-CCP, rheumatoid factor) · the inflammatory-vs-mechanical framing
All four ARE elsewhere in the same file (Inflammatory Arthritis & Joint Fluid,
OA, RA, Connective Tissue Diseases). So a student opening "Foundations" for the
groundwork of rheumatology gets muscle physiology and NMJ pharmacology instead.
Filing/naming issue, not missing content.

### INTERNAL INCONSISTENCIES (left byte-identical)
- RA morning stiffness threshold: ">30-60 min" on OA card 4 vs ">30 min" on
  RA cards 4 and 12. Same fact, two numbers, two topics.
- MTP joints listed on the RA side of RA card 5 but omitted from the RA side
  of OA card 5.
- Near-duplicates in Foundations: 77~98 (PTH/bone), 66~97 (dual role of bone),
  34/36/37 (ATP and detachment).

### VERIFIED CORRECT (checked because these are the classic swaps)
- Morning stiffness direction correct everywhere: prolonged = RA, transient = OA.
- X-ray mnemonics NOT swapped: LOSS on OA (Loss of joint space, Osteophytes,
  Subchondral sclerosis, Subchondral cysts); LESS on RA (Loss of joint space,
  Erosions, Soft-tissue swelling, Soft bones), and RA's card names LOSS as OA's.
- DIP vs MCP/PIP correct in both directions, with "RA SPARES the DIP" explicit.
- RF (~70%) vs anti-CCP (far more specific, similar sensitivity, pre-dates
  disease, linked to smoking/citrullination) — correctly ranked.
- Crystal birefringence NOT swapped: gout = monosodium urate, needle-shaped,
  NEGATIVELY birefringent; pseudogout = calcium pyrophosphate, rhomboid,
  POSITIVELY birefringent. Consistent across 6 cards.
- Every autoantibody-to-disease pairing standard; none misattached.

### GAPS (anchored, checked beyond the topic)
- SLE DIAGNOSTIC CRITERIA SET ABSENT APP-WIDE. Neither SLICC nor 2019
  ACR/EULAR appears anywhere in content/cards/. This is an app-level gap.
- APS obstetric criteria THRESHOLDS absent (no >=3 losses <10wk / >=1 loss
  >=10wk / delivery <34wk); the clinical features and the ">=12 weeks apart"
  antibody rule ARE given.
- MCTD / anti-U1-RNP absent from Connective Tissue Diseases, but present in
  the investigations topic OF THE SAME FILE and in immunology-serology.
- Enteropathic (IBD-associated) arthritis: 0 hits in the spondyloarthropathy
  topic; covered in msk.json and immunology-serology.json instead.
- Lyme has no tick-exposure history card (no attachment duration, no
  post-exposure prophylaxis); erythema migrans and doxycycline ARE covered.
- Not covered in CTD: undifferentiated CTD, overlap syndromes, relapsing
  polychondritis, IgG4-related disease.

### Cosmetic, untouched: "Sjogren's" without diaeresis on CTD front 69 and in
back 81 against "Sjögren's" elsewhere; "anti-cardiolipin"/"anti-beta-2-
glycoprotein I" (card 6) vs "anticardiolipin"/"anti-β2-glycoprotein I" (104).

## msk-rheumatology.json — metabolic bone / tumours / bursitis / compartment

### TWO MORE BROKEN CARDS (front asks what the back does not answer) — confirmed raw
Metabolic Bone Disease card 3:
  FRONT: "What is the bone profile AND HALLMARK of osteomalacia (rickets in children)?"
  BACK:  biochemistry only — no hallmark, and no mention of rickets.
  Its two siblings prove the defect: card 2 (osteoporosis) and card 4 (Paget's)
  both end "hallmark = ...". Card 3 is the only one of the three that does not.
Metabolic Bone Disease card 13:
  FRONT: "WHICH DRUG is a major reversible cause of osteoporosis?"
  BACK:  never names the drug as the answer. It gives the glucocorticoid
  bone-protection thresholds ("oral glucocorticoids for 3 months or more",
  "aged 70 or over", "prednisolone 7.5 mg daily"). Answerable only by inference.
Together with Foundations card 84 (denosumab/teriparatide), that is THREE cards
in this specialty whose back does not answer its front. This class of defect is
invisible to every guard I run — the guards prove nothing was lost, not that the
card makes sense — and it has only surfaced because agents read every front
against its back.

### VERIFIED CORRECT
- T-scores intact, all five U+2212 minus signs byte-identical, each band chipped
  WHOLE (">= -1", "-1 to -2.5", "<= -2.5") so a minus can never orphan outside
  its chip: Normal >= -1; osteopenia -1 to -2.5; osteoporosis <= -2.5;
  severe/established <= -2.5 plus a fragility fracture.
- The 3-disease biochemistry grid is internally consistent across cards 1, 2,
  3, 4, 10, 32, 33, 50, 53.
- Bisphosphonates: dosing, the full administration instruction, and BOTH MHRA
  risks (atypical femoral fracture, osteonecrosis of the jaw) with renal
  cut-offs.
- Compartment syndrome gives figures AFTER ALL (contradicting my earlier
  orthopaedics finding, which was scoped to that file): delta pressure <30 mmHg
  and absolute 30-40 mmHg, while still teaching it as primarily clinical with
  "a normal reading does NOT exclude it".
- FRAX and QFracture both present; the file puts QFracture FIRST (NICE order).

### GAPS
- PRIMARY and TERTIARY hyperparathyroidism: 0 hits in the entire fc map of this
  file. Secondary HPT appears only as a consequence of osteomalacia, never as a
  grid row. Renal osteodystrophy has no block and no biochemistry row. All are
  covered in endocrinology/renal/biochemistry files — so the 6-row grid a
  student expects does not exist anywhere as one table.
- Osteoid osteoma: no site and NO radiographic appearance (no lucent nidus with
  sclerotic rim) — only "night pain relieved by NSAIDs".
- Chondrosarcoma: no X-ray appearance given.
- Osteosarcoma (Codman's triangle, sunburst) and Ewing's (onion-skin, t(11;22))
  ARE complete.

## msk-rheumatology.json — Vasculitis topic (the biggest structural finding here)
THE TOPIC CALLED "VASCULITIS" IS NOT A VASCULITIS SURVEY. Its 84 cards are:
  0-7 overview | 8-25 giant cell arteritis | 26-45 POLYMYALGIA RHEUMATICA
  46-65 granulomatosis with polyangiitis | 66-83 BEHCET'S DISEASE
Card 0 sets up a large/medium/small vessel classification that the topic then
does not follow. Anchored searches across all 84 cards:
  - NO MEDIUM-VESSEL BLOCK AT ALL.
  - Polyarteritis nodosa: 0 hits.  Kawasaki: 0.  Coronary aneurysm: 0.  IVIG: 0.
  - HSP / Henoch / IgA vasculitis: 0 hits, no tetrad.
  - Cryoglobulinaemic: 0.   Takayasu: 1 passing mention.
  - EGPA: 3 hits, MPA: 4 hits — both only inside the ANCA comparison card.
Meanwhile the file itself says (card 3) that polymyalgia rheumatica "is NOT
itself a vasculitis" — and gives it a 20-card block inside the Vasculitis topic.
NOT missing from the app: Kawasaki (22 cards) and HSP (23 cards) are in
paediatrics.json :: Paediatric Vasculitis; PAN in ct/dermatological/ID files;
cryoglobulinaemia in dermatology and immunology-serology; Takayasu in
cardiovascular. So this is a scoping/naming problem, not absent content.

VERIFIED CORRECT (the highest-risk card in the topic):
  card 50 — "GPA = cANCA (anti-PR3) + granulomas + prominent ENT (saddle nose).
  MPA = pANCA (anti-MPO), NO granulomas. EGPA = asthma + eosinophilia, with
  pANCA (anti-MPO) positive in only about a third of cases — a negative ANCA
  does NOT exclude it." Corroborated on cards 4, 49, 51, 58. No contradiction.
GCA is thorough and current: the three-tier steroid rule (40 mg / 60 mg with
jaw claudication / IV methylprednisolone 500 mg-1 g for visual symptoms), start
before biopsy, biopsy stays positive 2-6 weeks after steroids start, skip
lesions mean a negative biopsy does not exclude, >=1 cm segment, permanent
visual loss in 15-20%, fellow eye at risk within days. Nothing to fix.
Still's: salmon-pink evanescent rash, quotidian fever, ferritin >1000 with the
low glycosylated fraction <20%, Yamaguchi criteria in full.
JIA uveitis screening is specific: slit-lamp within 6 weeks, then every 2-4 months.
CFS and fibromyalgia criteria are both CURRENT (NICE four core symptoms with PEM
required; fibromyalgia on widespread pain index + symptom severity score, with
the file explicitly noting the old tender-point criteria are superseded).

Cosmetic: front 67 "Behcet's" without cedilla against "Behçet's" elsewhere.

## infectious-disease-immunology.json — A 129-CARD TOPIC WITH NO INFECTION CONTENT
"Foundations of Cell Biology & General Physiology" sits inside the INFECTIOUS
DISEASE & IMMUNOLOGY file. Independently confirmed across all 129 cards, both
fields, anchored patterns:
    bacteri* 0 · virus/viral 0 · pathogen* 0 · microb* 0 · fung* 0
    parasit* 0 · antibiotic* 0 · gram- 0
    infecti* 1 (card 97, "infection resets the hypothalamic set point" in a
                fever/homeostasis card)
    immun*   1 (card 29, "some immune signals" as an autocrine example)
Contents are: membrane transport 0-26 · cell signalling 27-52 · fluid
compartments and IV fluids 53-81 · homeostasis 82-101 · GENETICS 102-128.
Two separate problems:
 1. FILING — 129 cards of general physiology and genetics are in the
    infectious disease deck. A student revising ID meets Na+/K+ ATPase,
    tonicity and mitochondrial inheritance.
 2. NAMING — the last 27 cards are genetics (confirmed: card 103 "organising
    principle of genetics", 115 mitochondrial inheritance, 128 genetic
    counselling), which is neither cell biology nor general physiology. The
    title under-describes a fifth of the topic.
This is the third misnamed/misscoped topic found this session, after
"Foundations of Musculoskeletal" (no joints, no cartilage) and "Vasculitis"
(largest block is PMR, which the file says is not a vasculitis).

## infectious-disease-immunology.json — Foundations of Microbiology (95)
Name MATCHES contents. Blocks: general principles 0-15 · bacteriology 16-32 ·
virology 33-48 · mycology 49-63 · parasitology 64-80 · prions 81-94.
VERIFIED CORRECT — every organism-to-Gram-status and organism-to-shape pairing
in the topic was checked individually against raw JSON (13 contexts): Gram
quadrants, catalase (Staph + / Strep -), coagulase (S. aureus + / S. epidermidis
-), haemolysis (alpha = pneumococcus/viridans, beta = GAS/GBS, gamma =
Enterococcus), oxidase (Pseudomonas/Neisseria +), MacConkey lactose fermenters,
exotoxin mainly Gram-positive vs endotoxin = LPS of Gram-negative outer
membrane, spore-formers all Gram-positive rods. NO MISASSIGNMENT FOUND.
Gram stain given correctly in BOTH directions (card 18 from the organism's side,
card 19 from the stain's side, with the correct step order).
GAPS: culture media are thin — only MacConkey and Sabouraud. No blood agar, no
chocolate agar, no Lowenstein-Jensen, no selective-vs-differential card. All of
those exist in the sibling file microbiology.json, so not an app-level gap.
Duplicate front: micro cards 4 and 81 are both exactly "What is a prion?" with
different, complementary backs.

## ANOTHER BROKEN CARD (front asks what the back does not answer)
Cell Biology card 66: front "What is tonicity, AND WHY IS IT THE CLINICALLY
USEFUL CONCEPT?" — the back defines tonicity only and never answers the "why".
That is now FOUR such cards this session (Foundations of MSK 84, Metabolic Bone
3 and 13, and this one).

## infectious-disease-immunology.json — sepsis / meningococcal / TSS / diarrhoea / tetanus-rabies

### A LINK THE DECK NEVER MAKES EXPLICIT (confirmed: 0 cards contain both terms)
NO CARD ANYWHERE IN THIS FILE CONTAINS BOTH "non-blanching" AND "penicillin".
The file describes the non-blanching rash thoroughly (card 11, including the
trap that it may start blanching and "viral-looking", and the instruction to
undress the patient), and separately gives the benzylpenicillin rule — but
triggered on "suspected / strongly suspected meningococcal disease", never on
the rash itself. A learner must join cards 2, 5, 11 and 19 to get the rule that
is usually taught as one sentence. Authoring decision, not a markup one.
Note also the file says benzylpenicillin "must NEVER delay transfer" — it does
NOT say "before transfer" as a sequencing instruction.

### WHERE MY OWN BRIEF WAS WRONG (the file is right)
I briefed "antibiotics within 1 hour" as a flat rule. THE FILE USES THE NICE
RISK-STRATIFIED TARGET and is internally consistent about it (cards 1, 15):
  within 1 hour  — high-risk sepsis or septic shock (NEWS2 >=7 or a red flag)
  within 3 hours — moderate risk (NEWS2 5-6)
  within 6 hours — lower risk (NEWS2 1-4)
NEWS2 is named as the UK screening tool; qSOFA is present (GCS<15, RR>=22,
SBP<=100, one point each, >=2) but EXPLICITLY DEMOTED as "no longer the
screening tool (less sensitive than early warning scores)", with the careful
note that qSOFA >=2 is not the same as NICE's "high risk". SIRS appears only
historically. This is a more current position than the classic golden-hour
teaching and should not be "corrected" toward it.

### VERIFIED CORRECT — a nuance many decks get backwards
Meningococcal 22: dexamethasone reduces neurological complications especially
hearing loss, greatest benefit in PNEUMOCOCCAL disease, "It is NOT routinely
given in meningococcal disease (NICE), where it has been associated with
HIGHER MORTALITY", and antibiotics are never delayed to give it. Correct.
Community benzylpenicillin doses given by age (<1y 300mg, 1-9y 600mg,
>=10y 1.2g). Contact prophylaxis: ciprofloxacin single dose, first-line at any
age including pregnancy, with paediatric doses.
E. coli O157: the antibiotics-increase-HUS warning appears on NINE cards and is
extended to ANTIMOTILITY agents too. Mechanism (Shiga toxin -> Gb3 -> MAHA) and
the normal clotting screen separating HUS from DIC are both given.
Tetanus: the file explicitly RETIRES the old ">6 hours old wound" criterion —
more current than standard teaching.
Rabies: "There is no time limit on starting treatment", RIG infiltrated into
the wound not a distant muscle, and not given >7 days after the first vaccine
dose.

### Minor, untouched
- Sepsis 16 reads "500 mL over under 15 min" in the pregnancy clause — awkward,
  probably a flattened "<15 min". Meaning recoverable; not re-punctuated.
- Sepsis 3 and 26 give "MAP >=65" without units where card 12 writes
  "SBP <=100 mmHg".
- Infective diarrhoea mixes en dashes and hyphens in incubation ranges.
- Meningococcal 26 gives under-5 ciprofloxacin as a flat 125 mg where UKHSA
  expresses it weight-based (30 mg/kg up to 125 mg). Defensible simplification.
- Absent from the diarrhoea topic: Vibrio/cholera, Yersinia, Entamoeba,
  Cryptosporidium, Listeria.

## infectious-disease-immunology.json — antibiotics / stewardship / infection control / vaccines

### TWO MORE BROKEN CARDS (now SIX this session)
- Antibiotics card 36. FRONT: "how are ESBL-producing organisms AND INCREASING
  CRE treated?" BACK: answers ESBL only (-> meropenem). Confirmed: "CRE" does
  not appear in the back, and deck-wide it occurs exactly once — on that front.
- Vaccinations card 9. FRONT asks what is given "at 65 years, 65+, AND 70
  YEARS". BACK never gives 70 as a start age; it gives shingles routinely at 65
  with a 70-79 CATCH-UP cohort. The front's third age is not answered.
Running total of cards whose back does not answer their front: MSK Foundations
84, Metabolic Bone 3, Metabolic Bone 13, ID Cell Biology 66, ID Antibiotics 36,
ID Vaccinations 9.

### THE IMMUNISATION SCHEDULE IS INTERNALLY INCONSISTENT ON MMR vs MMRV
Confirmed by card index:
  cards 3, 4, 11 use the newer MMRV schedule (MMRV 1st at 12 months, MMRV 2nd
    at 18 months, and explicitly NO MMR-containing dose at 3y4m)
  cards 8, 20, 22 still say "MMR" with no mention of MMRV
The AGES agree; the PRODUCT NAMES do not. A learner meets both.
Also: pertussis-in-pregnancy timing is stated two ways — card 7 "from 16 weeks,
optimally 20-32 weeks" vs card 25 "at 16-32 weeks".
Possibly dated, flagged not corrected: card 18 says "PCV13" and "13 common
capsular types" where higher-valency conjugates are in use.
Near-duplicates: cards 20 and 22 both ask why MMR is given at 12 months.
Card 26 begins a sentence in lower case ("...genital warts. the 9-valent...").

### VERIFIED CORRECT
- Every antibiotic class-to-mechanism pairing is right: cell wall (beta-lactams,
  glycopeptides binding D-Ala-D-Ala), 30S (aminoglycosides, tetracyclines),
  50S (macrolides, clindamycin, chloramphenicol, linezolid), DNA gyrase
  (quinolones), RNA polymerase (rifampicin), folate (trimethoprim/sulfonamides).
  None misattached.
- VRE correctly given as TARGET MODIFICATION (D-Ala-D-Ala -> D-Ala-D-Lac), with
  the card explicitly saying it is not an alternative pathway.
- C. difficile: oral vancomycin first-line, fidaxomicin second, metronidazole
  NO LONGER first-line; IV vancomycin does not work (must reach the lumen);
  avoid antimotility agents (toxic megacolon). Current.
- The hand-hygiene card is the strong version: soap and water not alcohol gel
  for C. difficile (spores) AND norovirus (non-enveloped), explicitly noting
  "the two fail alcohol for different reasons".
- "Red man syndrome" correctly reframed as a vancomycin INFUSION REACTION,
  "NOT an allergy: slow the infusion rather than labelling the patient allergic".
- "Start Smart, Then Focus" named, with the 48-72 hour review AND the note that
  current UK wording asks for review within 24-72 hours.

### GAPS in this topic (all present elsewhere in the app)
- mecA never named (MRSA mechanism given as altered PBP/PBP2a, which is correct);
  mecA appears once, in microbiology.json.
- Grey baby syndrome absent; chloramphenicol is named with no adverse effect
  attached. It is in liver.json Foundations of Metabolism.
- Aminoglycoside nephro/ototoxicity appears ONLY on the gentamicin exam-pearl
  card, NOT on the aminoglycoside class card, which also omits cidal/static
  where every sibling class card gives it.
- Not covered as HCAIs in their own right: VRE, CPE/carbapenemase producers,
  Candida auris, Legionella.

### ANOTHER UNANCHORED-GREP TRAP (third instance this session)
"porin" matches inside "cephaloSPORIN" and "cicloSPORIN" — a naive grep hit 30
files. Anchored \bporins?\b gives exactly one real hit. Same failure class as
"ABO" in "about", "Ficat" in "classification", "Tinel" in "routinely".

## infectious-disease-immunology.json — traveller / travel med / fungal / viral / PUO

### A TEXT DEFECT (confirmed raw, not fixed)
Travel Medicine card 12 (mefloquine):
  "...any current or previous psychiatric disorder (depression, anxiety,
   psychosis, schizophrenia). (MHRA) reactions may persist for months or
   years after stopping..."
The "(MHRA)" citation is orphaned at the start of a sentence whose subject
appears to have been lost; it reads as though it should be
"...schizophrenia) (MHRA). Reactions may persist...". The WARNING CONTENT is
correct and complete (persistence for months-years, patient alert card, stop
and seek advice). Punctuation/citation defect only.

### CROSS-FILE MALARIA CHECK — the two decks AGREE (no contradiction)
haematology.json::Malaria (42 cards, already formatted) vs this deck:
  diagnostic test — identical (films gold standard, thick detects, thin
    speciates and quantifies, RDT adjunct never a replacement)
  three-film rule — identical (repeat at 12-24h then a further 24h; one
    negative film never excludes)
  species split — identical (falciparum most severe, no dormant stage;
    vivax/ovale hypnozoites -> primaquine after G6PD)
  treatment — identical (IV artesunate severe, artemether-lumefantrine
    uncomplicated)
DIVERGENCES ARE COVERAGE GAPS, NOT CONFLICTS. Only haematology has: the
NUMERIC severe-malaria thresholds (pH <7.3, lactate >4, glucose <2.2, Hb <=8,
parasitaemia >2% with >10% hyperparasitaemia), post-artesunate delayed
haemolysis, tafenoquine, blackwater fever, protective host factors, fever
periodicity. Only this deck has: the "up to a year" post-travel window and the
VFR/asplenia risk groups. This deck names neither P. malariae nor P. knowlesi.
So the ID deck teaches severe malaria NARRATIVELY, without the numbers a
student needs to act on.

### WHERE MY BRIEF WAS WRONG AGAIN (file wins)
I asked whether bite avoidance is emphasised OVER drugs. The file says
"bite avoidance matters AS MUCH AS the drugs" — equal, not above. The agent
declined to mark toward my phrasing. Correct.

### VERIFIED / notable
- Dengue warning signs given twice IN FULL with the critical phase at
  defervescence (days 3-7, "not the fever peak") and the NSAID/aspirin warning.
- VHF handled better than usual: a full risk assessment, isolate + PPE, contact
  UKHSA and the infection consultant BEFORE sending samples so the lab is
  warned, and malaria screening CONTINUES under those precautions.
- EBV vs CMV separated twice, and the amoxicillin-rash card explicitly says it
  is NOT a true penicillin allergy and not to label the patient allergic.
- PCP CD4 <200 and Cryptococcus CD4 <100 consistent across 4 cards.
- PUO has FOUR SUB-TYPES (classic / healthcare-associated / immunocompromised /
  HIV) AND four cause-buckets (infection / malignancy / inflammatory / misc).
  Easy to conflate; worth knowing they are different fours.
GAPS: endemic dimorphic fungi absent (Histoplasma, Coccidioides, Blastomyces,
Talaromyces), as are Fusarium/Scedosporium. Tafenoquine absent from this topic.
Dengue is listed in BOTH the <1 week and 1-2 week incubation bands — the only
disease listed twice; defensible since true incubation is 3-14 days.

## GREP TRAP #4 — ANCHORING CAUSES FALSE NEGATIVES ON KEY NAMES
Underscore is a word character, so r'\bmalaria\b' does NOT match
"conditions__HAEMATOLOGY__Malaria". Anchor when searching CARD TEXT; do not
anchor when searching KEY NAMES. Confirmed both ways. Now in the brief.

## infectious-disease-immunology.json — the immunology topics are SPLIT ALONG THE WRONG SEAM
Not a duplication problem — a naming/filing one. Confirmed by card counts:
- "Immune System Overview & Immunodeficiency" (33): 30 of 33 cards are
  IMMUNODEFICIENCY. Only 3 are "overview". \binnate\b and \badaptive\b appear
  ZERO times in it. The overview material it advertises is not there.
- "Immunity (active/passive)" (34): only 12 of 34 cards are active/passive.
  The rest are innate vs adaptive (0,3,4,5), herd immunity (1), live-vs-killed
  vaccines (13-16), immunoglobulin classes (21-26), interleukins and Th1/Th2
  (28-33). It is really a general-immunology topic.
So a student searching "innate vs adaptive" or "interleukins" looks in
"Immune System Overview" and does not find them — they are in
"Immunity (active/passive)". The two topics do NOT contradict each other
(checked pairwise across all 34x33 back-text pairs); they are complementary,
split along the wrong seam.
- "Transplant Immunology & Rejection" (28): cards 17-27 (39%) are
  immunosuppression PHARMACOLOGY. Accurate name, undersells half the topic.
- "Inflammatory Effect" (26) is a complete acute/chronic inflammation topic
  plus wound healing. Vague name. NOTE A DECK-LEVEL DUPLICATE:
  pathological-histology.json :: "Inflammation (acute & chronic)" has 42 cards
  covering much the same ground.
That is now FIVE misnamed/misscoped topics this session (MSK Foundations,
Vasculitis, ID Cell Biology, Immune System Overview, Immunity).

### VERIFIED CORRECT — the hypersensitivity set
All five type-to-mechanism-to-disease pairings correct, with timings
(I seconds-30 min, II hours-days, III 4-10 days with the Arthus local form at
4-12 h, IV 48-72 h) and the core split (I-III+V antibody-mediated, IV T-cell).
Gell and Coombs named (2 hits deck-wide, both here). The file handles the
four-vs-five-type ambiguity EXPLICITLY: "If a question offers only four types,
put Graves' and MG in Type II." That is better than most textbooks.
Transplant rejection timings all correct with their hypersensitivity types
(hyperacute = II, acute = IV, chronic = mixed), and GVHD explicitly
distinguished from rejection twice.
Innate/adaptive cell assignments all correct (NK cells and complement innate,
T and B cells adaptive, dendritic/macrophages as APCs).
Complement deficiency correctly split: terminal C5-C9/MAC -> Neisseria WITH
the mechanism; early C1/C2/C4 -> encapsulated organisms PLUS SLE-like
autoimmunity; the general encapsulated link attached to humoral/IgG deficiency
and asplenia rather than to complement generally.

### ONE SIMPLIFICATION FLAGGED, NOT CHANGED
Two cards say "IL-5: IgA class switch + eosinophil growth". IL-5 is the
eosinophil cytokine; IgA class SWITCHING is conventionally TGF-beta, with IL-5
enhancing secretion from already-switched B cells. The two cards agree with
each other, so the deck is internally consistent — textbook shorthand, not a
contradiction. Left as written.

### CROSS-DECK DRIFT RISK (not checked, flagged for whoever does content)
Anaphylaxis is covered in FOUR places: here (hypersens 9-12, with the full
Resus Council UK age-banded adrenaline doses) plus dedicated topics in
general-systemic.json, respiratory.json and paediatrics.json. The dose tables
in those four should be compared for drift. Not done here.

## ent.json — otitis / cholesteatoma / Ramsay Hunt / TM perforation
FIRST BATCH THIS SESSION WITH NO GAPS AND NO CLINICAL ERRORS. Every mapping I
briefed was present, in the topic I expected it in, and correct. Worth recording
because it shows the "check for absences" instruction is not just finding
whatever it is told to look for.
All four topic NAMES match their CONTENTS (the first batch where that is true
of every topic). Only scope note: TM Perforation carries 6 cards on ear trauma
generally (perilymph fistula, temporal bone fracture, ossicular disruption),
which are the red-flag differentials of a traumatic perforation — coherent.

VERIFIED PRESENT AND CORRECT:
- OE vs OM discriminator given AS A PAIR: pain on moving the tragus/pinna
  (canal, OE) vs bulging red drum (middle ear, AOM) vs retracted dull drum
  (glue ear). Card 0 states all three together.
- Necrotising OE fully covered across 23 cards: diabetes as THE dominant risk,
  Pseudomonas with the >90% figure, CT temporal bones first-line for bony
  erosion and MRI best for soft tissue/intracranial, granulation tissue at the
  bony-cartilaginous junction, CN VII then IX/X/XI jugular foramen syndrome,
  and the "ordinary OE not improving in a diabetic -> think MOE" rule.
- AOM antibiotics: ALL THREE ARMS plus the middle tier — no antibiotic
  (>2 years, unilateral, not systemically unwell); delayed (start after 3 days);
  immediate (very unwell / serious illness / high complication risk); and
  "immediate OR back-up" for under-2 bilateral or any child with otorrhoea.
- Glue ear: active observation ~3 months, effusion confirmed on 2 occasions
  about 3 months apart, grommets with ~10-month extrusion, the NICE ~25 dB HL
  threshold, AND the unilateral-OME-in-an-adult -> urgent nasendoscopy /
  nasopharyngeal carcinoma / 2-week-wait card.
- Cholesteatoma: attic/pars flaccida with a dedicated "why the attic" card, the
  painless foul-smelling discharge, erosion as the danger, and facial nerve
  palsy among the complications. Complications split extracranial vs
  intracranial in BOTH the cholesteatoma and otitis topics.
- Ramsay Hunt: canal vesicles, LMN palsy with forehead involvement, antiviral
  plus steroid ideally within 72 hours WITH the explicit "do NOT withhold
  beyond 72 hours" rule, full doses, and the Bell's contrast on 5 cards
  including zoster sine herpete.
- TM perforation: keep-dry rule with a dedicated "why it matters" card,
  6-8 weeks healing with 80-90% spontaneous closure, and a full referral list.

Harmless internal variations, read and deliberately left: card 2 "commonest
cause of childhood hearing loss" vs card 63 "commonest cause of acquired
(conductive) hearing loss in childhood"; CSOM at 6 weeks with "some definitions
use 2 weeks"; syringing contraindicated for 12 months after healing.

## ent.json — hearing loss / Weber & Rinne / vertigo

### WEBER AND RINNE ARE ALL CORRECT (the single highest-risk check in ENT)
Verified raw, and by an ORDERED direction-word assertion over 212 occurrences
(stronger than a multiset — order preserved too):
  Rinne POSITIVE = AC > BC = normal or sensorineural
  Rinne NEGATIVE = BC > AC = conductive, with the file's own note that the
    naming is confusing ("'negative' = abnormal/conductive")
  Weber in CONDUCTIVE -> the AFFECTED (worse) ear, with BOTH mechanisms
    (shielding from room noise + the occlusion effect) and a do-it-yourself
    demonstration
  Weber in SENSORINEURAL -> the UNAFFECTED (better) ear
Consistent across the Weber/Rinne topic AND the hearing-loss topic (cards 1,
38, 56, 73). FALSE-NEGATIVE RINNE is given twice, correctly, including that
Weber is what resolves it and that masking can confirm. No swapped word found.

### "HEARING LOSS" IS 20% A TINNITUS TOPIC
Cards 89-110 of 111 are tinnitus — confirmed, 22 of 22 fronts name it. The file
itself says tinnitus is a SYMPTOM (cards 2 and 89), and there is a separate
signs__ENT__Tinnitus (12 cards) in the same file.
MISSING for the topic's name: no noise-induced hearing loss block (only 2
passing mentions, in presbycusis risk factors and tinnitus causes), no
congenital/paediatric hearing loss, no acoustic neuroma block (it appears only
as the "don't miss" differential). Noise-induced IS elsewhere in the app —
investigations__ENT/AUDIOVESTIBULAR, signs__ENT__Reduced Hearing,
signs__ENT__Tinnitus. Zero hits deck-wide for "occupational", "acoustic
trauma", "hearing protection", "temporary threshold".
That is SIX misnamed/misscoped topics this session.

### VERTIGO IS DUPLICATED ACROSS THREE FILES (confirmed)
  conditions__ENT__Vertigo & Balance Disorders: Meniere's 0-21, BPPV 30-48
  conditions__NEUROLOGY / NEUROSURGERY__Meniere's Disease — 22 cards
  conditions__GERIATRIC MEDICINE__Benign Paroxysmal Positional Vertigo — 20
Plus signs__ENT__Vertigo (12) and signs__NEUROLOGICAL__Dizziness & Vertigo (18).
The ENT topic's two main blocks are mirrored almost card-for-card elsewhere.
Also: the topic is called "Balance Disorders" but vestibular neuritis and
labyrinthitis have NO block (contrast cards only), and vestibular migraine,
PPPD, bilateral vestibulopathy and ototoxic vestibulotoxicity are absent.
NOTE FOR WHOEVER FORMATS NEUROLOGY/GERIATRICS: those two topics are already
formatted (neurology shipped early this session). Their Meniere's/BPPV content
should be compared against the ENT version for drift.

### VERIFIED CORRECT
- SSNHL flagged as an ENT EMERGENCY three times, with the diagnostic criterion
  (>=30 dB across 3 contiguous frequencies over <=72 hours), the steroid
  timeframe (best in the first 2 weeks, little benefit beyond ~6 weeks),
  "don't wait for the MRI to start treatment", and the NICE referral triggers.
  It also explicitly says a sudden CONDUCTIVE loss is NOT this emergency.
- Air-bone gap given in 7 places including Carhart's notch (BC dip at 2 kHz)
  for otosclerosis and "NO air-bone gap" for presbycusis.
- Vertigo durations all given and internally consistent: BPPV seconds (<1 min,
  typically 10-30 s); Meniere's 20 minutes to 12 hours with an explicit
  out-of-range rule ("shorter than 20 minutes or longer than 12 hours, think
  again"); vestibular neuronitis days; labyrinthitis the same BUT with hearing
  loss.
- HINTS on 3 cards, each stating it is valid ONLY in acute vestibular syndrome
  and not in BPPV, and card 39 gets the counterintuitive rule RIGHT:
  ABNORMAL head impulse = peripheral, NORMAL head impulse = central.
- Central-vs-peripheral card 8 carries the safety caveat that "new hearing loss
  does NOT exclude a stroke, because AICA infarction causes vertigo with sudden
  deafness" — better than most decks.

### A DEVICE DECISION I AGREE WITH
The only real <b> in 185 cards wrapped "20-25 dB" — a THRESHOLD, not an answer
core. The agent converted it to an fc-num chip rather than <strong>. That
satisfies the purpose of the housekeeping rule (remove the black-rendering <b>)
and uses the device the brief assigns to a cutoff. Correct; no change needed.
Also correct: it refused to chip "20 minutes to 12 hours" (five words, over the
cap) rather than SPLIT A CLINICAL RANGE ACROSS TWO CHIPS, and used <strong>.

## ent.json — A REFERRAL-RULE CONTRADICTION (highest-priority content fix in ENT)
Head & Neck Cancer card 80, verbatim:
  "The NICE neck-lump criterion itself carries no age threshold; the age-45
   threshold applies to the hoarseness criterion."
Card 24 carries the same loose phrasing ("the NICE neck-lump criterion carries
no age threshold").
FOUR CARDS IN THE SAME FILE SAY OTHERWISE, and they are the correct ones:
  cancer 2:  "aged 45 and over with persistent UNEXPLAINED hoarseness OR an
              unexplained neck lump (laryngeal); unexplained oral ulceration
              lasting >3 weeks OR a persistent unexplained neck lump (oral)"
  cancer 11: "aged 45 and over with persistent unexplained hoarseness, OR an
              unexplained neck lump"
  cancer 73: "Aged >=45 with persistent unexplained hoarseness OR an
              unexplained neck lump"
  necklumps 17: spells it out properly — laryngeal criterion 45+, ORAL
              criterion at ANY age, and "Age 45 raises suspicion but does not
              gate the referral" [for the oral criterion]
Card 80's claim is HALF TRUE and therefore misleading: the ORAL criterion has
no age gate, but the LARYNGEAL criterion gates BOTH hoarseness and neck lump at
45+. As written card 80 tells a learner the age threshold never applies to a
neck lump, which is wrong for the laryngeal route. Cards 80 and 24 should be
reworded to match card 2 / necklumps 17. NOT CHANGED.

## ent.json — head & neck cancer / neck lumps / trauma: scope
- "Head & Neck Cancer" (90) names SEVEN sites on its own opening card but gives
  blocks to only THREE (larynx, nasopharynx, oral cavity). Oropharynx and
  hypopharynx have no block; salivary and thyroid have zero disease content.
  12 of 90 cards are not cancer at all (laryngopharyngeal reflux, recurrent
  laryngeal nerve palsy, and 8 benign oral conditions).
- HYPOPHARYNGEAL CANCER IS AN APP-LEVEL GAP: "hypopharyngeal cancer /
  pyriform / piriform fossa" returns NOTHING anywhere in the app.
- "Head & Neck (Laryngeal / Neck) Trauma" (30) contains NO head or face trauma
  at all — no skull fracture, facial fracture, TBI or ocular injury. The
  parenthetical "(Laryngeal / Neck)" is exact; "Head &" is unearned.
That is SEVEN misnamed/misscoped topics this session.

## ent.json vs endocrinology.json — the TWO Neck Lumps topics AGREE clinically
Tongue protrusion, the 48-hour child lymphadenopathy rule, never-excise-first /
USS-guided FNA, the parotid facial-nerve and never-biopsy rules, cystic
hygroma, carotid body tumour and branchial cyst — all consistent across both.
ONE DIVERGENCE WORTH A DECISION: for the same finding (unexplained adult
lymphadenopathy) endocrinology routes to a suspected cancer pathway FOR
LYMPHOMA, while ENT routes to an urgent 2WW HEAD-AND-NECK CANCER referral.
Both are NICE-legitimate but a learner meeting both gets two pathways with no
cross-reference. Only ENT carries Virchow's node/Troisier's sign; only
endocrinology carries the BTA U and Thy gradings. Complementary, not
contradictory.

VERIFIED CORRECT: HPV-positive oropharyngeal cancer distinguished from
smoking/alcohol disease WITH the better prognosis stated, p16, and the
excellent trap that "a new 'branchial cyst' in an adult is a cystic nodal
metastasis". Leukoplakia vs erythroplakia with the wipe-off bedside test and
"red beats white". Salivary: pleomorphic vs Warthin's vs adenoid cystic as
separate cards, facial-nerve rule, never-biopsy rule with its three reasons,
and a three-way stones/tumour/infection discriminator. Trauma: airway priority,
the full laryngeal-fracture sign list, and an unusually good
do-not-intubate-blindly card naming the false-passage and
partial-to-complete-separation risks.

## ent.json — rhinitis / epistaxis / nasal fracture / FB ear-nose

### A PRECEDENT CORRECTLY GENERALISED (worth keeping)
The montelukast MHRA warning names SUICIDAL THOUGHTS. The agent put it in
fc-sub, not fc-caveat, citing this project's rule that self-harm content is
never demoted into the smaller grey device — even though that rule was written
for the psychiatry self-harm topic, not for a drug safety warning. Verified:
card 12 uses fc-sub. That is the right reading. The same choice was applied to
the sepsis/admit line, the airway-compromise line and a safeguarding/
domestic-abuse line. ADOPT: a warning naming self-harm is never demoted,
wherever it appears.

### WHERE MY BRIEF WAS WRONG AGAIN (file wins, 4th time this session)
I briefed a "5-10 day window" for nasal fracture review. The file is more
precise and differs (card 4, verbatim):
  "Adults: review at ~5-7 days once swelling settles, then manipulate as soon
   as swelling allows and no later than about day 14 - the bones set by
   ~3 weeks. Children heal faster: review at ~3-7 days and manipulate within
   ~7-10 days."
So 7-10 days is the PAEDIATRIC MANIPULATION window, not an adult review window.
Nothing changed.

### GAPS (anchored, checked deck-wide)
- NON-ALLERGIC / VASOMOTOR RHINITIS IS ABSENT FROM THE CONDITIONS DECKS.
  One hit deck-wide and it is inside pharmacology-flashcards.json, which is
  out of scope. Cards 3-12 are entirely ALLERGIC rhinitis; the only
  non-allergic entity anywhere is rhinitis medicamentosa. So a topic called
  "Rhinitis" teaches one kind of rhinitis.
- "Severe headache" is NOT given as a sinusitis red flag anywhere in the ENT
  file. Orbital and intracranial red flags ARE covered well (preseptal vs
  orbital cellulitis with proptosis, restricted movements, reduced acuity/
  colour vision, RAPD, chemosis; meningitis, abscess, cavernous sinus
  thrombosis, Pott's puffy tumour).

### VERIFIED CORRECT — both time-critical items handled well
SEPTAL HAEMATOMA: the mechanism is given properly (cartilage supplied only by
overlying perichondrium -> haematoma strips it -> avascular necrosis within
days), with "Ischaemia begins within 24-72 hours, so drain on the day of
diagnosis" kept as full-size body prose with NO block device at all, so it
cannot be visually demoted.
BUTTON BATTERY: "liquefactive (caustic) necrosis within hours", "Requires
immediate removal", and crucially "never irrigate a battery - moisture
accelerates the caustic injury". All body prose, both halves bolded.
Also correct and often missed: the file's TRANEXAMIC ACID position in epistaxis
is that it is "an optional adjunct only... the largest UK randomised evidence
found no benefit over placebo, so it does not replace a rung on the ladder" —
and the summary ladder card omits it, consistently. That is more current than
most teaching.
Insect in the ear: kill first with olive oil or lidocaine 2%, but instil
NOTHING if the drum may be perforated or grommets are in. Organic FB: swells
with moisture, do not irrigate.

## ent.json — airway / tracheostomy / FB throat / tonsillitis
FIRST SPECIALTY WITH EVERY BACK MARKED (750/750, 0 unmarked).

### THE SINGLE MOST LIFE-CRITICAL RULE IN THIS DECK IS STATED WELL (4 times)
Laryngectomy oxygen, card 3 verbatim: "To the STOMA - not the face. There is no
connection between the mouth/nose and the lungs, so face-route oxygen and
mouth-to-mouth are useless. Ventilate and, if needed, intubate via the stoma."
Repeated on cards 1, 2 ("Getting this wrong can be fatal") and 16.
The GREEN/RED bed-head sign is given with a memory hook (card 4): GREEN =
tracheostomy, potentially patent upper airway; RED = laryngectomy, stoma only.
The tracheostomy emergency algorithm (card 11) is complete and IN ORDER, and
was deliberately left as prose because its nine steps are joined by arrows —
bulleting would have deleted the sequence.

### TERMINOLOGY DIVERGENCES FROM MY BRIEF (file wins, all reported not changed)
- "silent chest" appears NOWHERE in ent.json. The file expresses it as
  "Complete = SILENT - no air movement, no cough, no voice". The phrase exists
  18 times elsewhere (respiratory, paediatrics, general-systemic, bedside-tests).
- "disc battery" appears nowhere in the whole deck; the file uses "button
  battery" exclusively (17 hits). Terminology, not a content gap.
- "National Tracheostomy Safety Project" is never expanded — "NTSP" appears
  twice as initials only. The laryngectomy algorithm is covered narratively
  rather than as a second named algorithm.
- The file says the missing connection is mouth/nose-to-LUNGS, not
  mouth-to-trachea. Same claim, different noun.

### VERIFIED CORRECT
- Do-NOT-examine-the-throat in suspected epiglottitis, stated twice with the
  reason (instrumenting can precipitate complete obstruction).
- Emergency front-of-neck airway: CICO defined, DAS plans named, and the
  scalpel-bougie-tube cricothyroidotomy technique given step by step.
- Button battery: removal within 2 HOURS of ingestion, necrosis within minutes,
  AND the post-removal warning that catastrophic bleeding can occur days to
  weeks later (aorto-oesophageal fistula has its own card). Food bolus: not
  beyond 24 hours.
- Centor (>=3) and FeverPAIN (>=4) both with full criteria and banding, plus a
  card warning not to attach FeverPAIN's probability figures to Centor.
- Quinsy: trismus, hot-potato voice, uvular deviation to the UNAFFECTED side,
  with a dedicated card on the direction.

### A GOOD REFUSAL TO OVER-APPLY A PRECEDENT
The agent used fc-caveat ONCE in 113 cards and explained why it did not extend
the "zero caveats" pattern into a blanket ban: the one use is a pure
score-interpretation trap carrying no clinical action, which is exactly what
the device is for. The instruction bars DEMOTING RED FLAGS, not using the
device. Correct reading.

## liver.json — cirrhosis / alcoholic liver disease / NAFLD
VERIFIED CORRECT — the classic swap is NOT swapped, and is stated in BOTH
directions on two different cards that agree:
  ALD 14:   "An AST:ALT ratio >=2:1 suggests alcoholic liver disease; in viral
             hepatitis and NAFLD, ALT > AST."
  NAFLD 15: "ALT > AST in NAFLD (whereas alcoholic liver disease shows
             AST:ALT >=2:1)."
Child-Pugh correct: ABCDE = Albumin, Bilirubin, Clotting (PT), Dilation
(ascites), Encephalopathy; Class A 5-6 well-compensated, B 7-9 significant
impairment, C 10-15 decompensated.
SBP neutrophil count >250 cells/mm3 given in THREE places with "treat
immediately (don't wait for culture)". Ascites ladder complete through to TIPS.
Variceal bleeding: terlipressin, prophylactic ceftriaxone, band ligation, and
the Sengstaken-Blakemore tube with "not left in place beyond 24 hours".
Alcohol/Wernicke cross-referenced in BOTH directions, including the cirrhosis
care bundle preferring lorazepam/oxazepam in decompensated disease and giving
thiamine before glucose.

GAPS (reported, nothing added):
- GLASGOW ALCOHOLIC HEPATITIS SCORE absent from the whole file. The file uses
  Maddrey's discriminant function >=32 as the steroid threshold, with the Lille
  score at day 7 (stop if >0.45). Internally complete; just not Glasgow.
- MINNESOTA TUBE never mentioned; the file gives Sengstaken-Blakemore only.
- No self-harm or suicide warning anywhere in the alcohol topics (0 anchored
  hits). Notable given the subject; reported, not supplied.
- MELD appears ONCE and only as "the equivalent score used internationally" —
  the file uses UKELD for transplant listing. Not an error, but a student
  revising MELD will find almost nothing here.

LOCATE-AND-WRAP CAUGHT A WORD DELETION AGAIN: the agent's own reading of
cirrhosis card 40 had dropped ", over-diuresis" from the precipitant list. The
engine raised rather than emitting the shortened text. That is now the fourth
distinct defect class this mechanism has caught (curly apostrophe, wrong
occurrence index, non-existent match, and now a dropped clause).

## liver.json — "Foundations of Metabolism" IS GENERAL BIOCHEMISTRY, NOT HEPATOLOGY
148 cards filed under conditions__LIVER__ alongside cirrhosis, PBC, PSC,
Wilson's and HCC. Independently confirmed:
  - only 34 of 148 cards mention liver/hepatic/hepatocyte/bile/portal at all
  - CARDS 20-54 — THIRTY-FIVE CONSECUTIVE CARDS, the entire Krebs cycle and
    oxidative phosphorylation blocks — CONTAIN ZERO LIVER TERMS
  - no lobule, no zonation, no sinusoid, no Kupffer cell, no dual blood supply,
    no bilirubin handling as a subject
Eight blocks: glycolysis 0-19, Krebs 20-37, oxidative phosphorylation 38-54,
glycogen+gluconeogenesis 55-73, fat/ketones/DKA 74-91, fed-vs-fasted 92-108,
amino acids+urea 109-127, drug metabolism 128-147. Six of eight are pure
general biochemistry. Same shape as the ID file's "Foundations of Cell Biology".
EIGHT misnamed/misfiled topics this session.

### AND IT DUPLICATES THREE SIBLING TOPICS (scanned 1,098 topics deck-wide)
1. clinical-pharmacology-prescribing.json :: Pharmacokinetics, Pharmacodynamics
   & Drug Interactions (29 cards) substantially duplicates the drug-metabolism
   block: Phase 1/2, first-pass, CYP450 inducers/inhibitors.
2. endocrinology.json :: Diabetic Complications (161 cards) covers DKA far more
   fully than this topic's thin 5-card DKA sub-run.
3. lower-gi-bowel.json :: Foundations of Gastrointestinal & Hepatobiliary
   Physiology (123 cards) is WHERE THE LIVER-SPECIFIC METABOLIC CONTENT
   ACTUALLY LIVES — liver's role in carbohydrate/fat/protein metabolism, liver
   failure, dual blood supply, first-pass. It has the hepatology this topic
   lacks.
UNIQUE to this topic and found nowhere else in the deck: the Cori cycle
(3 cards), chemiosmotic theory, the ATP tally, uncouplers/brown fat, the
Warburg-PET link. So it cannot simply be deleted.

### GAPS (confirmed: 0 hits each)
- PENTOSE PHOSPHATE PATHWAY and G6PD entirely absent — the topic covers RBC
  glycolysis and pyruvate kinase deficiency but not their PPP/G6PD counterpart.
- VITAMINS: only thiamine (B1) is covered, correctly linked to PDH and to
  Wernicke's/beriberi. Zero hits for pellagra, niacin, scurvy, B12, folate,
  pyridoxine, riboflavin, biotin or any "vitamin A-K".

### VERIFIED CORRECT
All four compartment assignments right (glycolysis cytoplasm, Krebs matrix,
beta-oxidation mitochondria with the carnitine shuttle, oxphos inner
mitochondrial membrane), and the file states the contrast explicitly ("unlike
glycolysis, which is in the cytoplasm"). Four fed/fasted timeline cards agree
with each other. All 22 insulin/glucagon cards read individually — ZERO
reversals. Five inborn errors present (von Gierke's, carnitine/CPT, OTC, PKU,
pyruvate kinase deficiency). Two nuances better than most decks: DKA "not
exclusive to T1DM" with euglycaemic DKA on SGLT2 inhibitors, and
morphine-6-glucuronide as an active Phase II metabolite accumulating in renal
impairment.

### A RULE-1 vs RULE-4 COLLISION, RESOLVED WELL
"final electron acceptor" appears word-for-word on FOUR cards (39, 41, 44, 47).
Rule 1 bars bolding a term that recurs; rule 4 wants an answer core on every
card. The agent suppressed the shared phrase and gave each card its own
distinct target instead (Complex IV / water / "the whole chain backs up" /
"Krebs + link reaction halt"). Correct — and it reported the four cards as
near-duplicates rather than merging them.

### ORDERING ANOMALY (untouched)
Card 74 "How is beta-oxidation regulated by insulin and glucagon?" sits BEFORE
the block's own opener at 76 "Outline beta-oxidation" and before 75 "Describe
fat as a fuel". The regulation card precedes the definition card.

## liver.json — PBC/PSC/AIH + Wilson's/haemochromatosis/a1-antitrypsin
THE MIRROR PAIR IS CORRECT IN BOTH DIRECTIONS on two independent cards:
  PBC 2: "PBC: intrahepatic ducts, AMA, middle-aged woman, Sjogren's/RA/
          sclerosis. PSC: intra + extrahepatic ducts, p-ANCA, young man + UC,
          bile duct beading on MRCP."
  PSC 2: the same grid stated from the PSC side, agreeing on every axis.
Every axis checked: antibody, sex/age, duct level, IBD association, imaging,
cancer risk, treatment. NOTHING SWAPPED. PBC has NO IBD association anywhere
in its topic (0 hits) — correct. Immunoglobulins also right: IgM raised in PBC,
IgG in autoimmune hepatitis.
WILSON'S CAERULOPLASMIN IS LOW — the inversion that would flip the diagnosis is
absent: 0 hits for raised/high caeruloplasmin, 2 for low. Urinary copper
raised, biopsy copper >250 mcg/g. Kayser-Fleischer rings covered with
"absence never excludes".
HAEMOCHROMATOSIS: ferritin high, transferrin saturation high, TIBC LOW, with
sex-split genotyping thresholds (TSAT >50% men / >40% women; ferritin >300 /
>200). HFE C282Y homozygosity causative with incomplete penetrance; H63D
correctly described as low-penetrance and not causative alone. Venesection to
ferritin <50 with a maintenance target.
AIH: type 1 (ANA/SMA) vs type 2 (anti-LKM1) split, and the file correctly says
anti-SLA/LP sits WITHIN type 1 with the old "type 3" label obsolete — current.
Prednisolone + azathioprine with TPMT, plus the good caveat that TPMT testing
does NOT replace FBC monitoring, and avoid allopurinol.
a1-ANTITRYPSIN: PiMM/PiMZ/PiZZ all present; emphysema panacinar and BASAL,
correctly contrasted with centrilobular APICAL in smoking COPD — not inverted.

### WHERE MY BRIEF WAS WRONG (5th time this session)
I described the haemochromatosis triad as "arthropathy, bronzed skin and
diabetes". THE FILE'S TRIAD IS SKIN / DIABETES / LIVER (card 3: "Bronze skin
pigmentation, diabetes mellitus ('bronze diabetes'), and hepatomegaly/
cirrhosis"). Arthropathy IS covered but as a SEPARATE card (2nd/3rd MCP joints,
pseudogout/chondrocalcinosis), not as part of the triad. The file's framing is
the clinically standard one. Nothing changed.

### A WORDING DEFECT (confirmed raw, not fixed)
Wilson's card 20: "Trientine - an alternative chelator IF PENICILLAMINE IS
INTOLERANT (rash, nephrotoxicity, bone marrow suppression)." Subject and object
are inverted — the patient is intolerant, not the drug. The FRONT of the same
card uses the correct phrasing ("if penicillamine is not tolerated"). Purely
grammatical; the drug mapping is right.

### GAP
Serum copper has no value in the Wilson's topic (only a mechanistic mention).
It IS in biochemistry.json :: Liver & Pancreas card 24, correctly: "Total serum
copper is often low... but the free (non-caeruloplasmin) copper is HIGH" —
which is the nuance students most often get wrong. Absent from this topic, not
from the app.

## liver.json — viral hepatitis / ALF / DILI / HCC

### THE HBV SEROLOGY WINDOW PERIOD IS ABSENT FROM THE ENTIRE LIVER FILE
Confirmed: 0 hits for "window" anywhere in liver.json. Deck-wide "window
period" appears 3 times, all in HIV/sexual-health contexts, never for hepatitis
B. The classic fifth serology column — HBsAg negative, anti-HBs negative,
anti-HBc IgM POSITIVE — is nowhere in the app for HBV.
The other four states ARE covered, as five one-marker-per-card definitions plus
four interpretation cards (not a table): acute (HBsAg + HBcAb IgM), chronic
(HBsAg, with HBeAg/HBV DNA stratifying replication), resolved (HBcAb IgG with
HBsAg negative; "HBsAb + HBcAb = past natural infection"), vaccinated
("Isolated HBsAb = vaccinated"). No marker-to-state pairing is swapped.
ALSO ABSENT: the >=6-month duration that formally defines chronicity.
COINFECTION vs SUPERINFECTION in hepatitis D: both WORDS appear once, neither
is ever DEFINED, and the decisive contrast (simultaneous coinfection usually
self-limiting vs superinfection on chronic B -> ~80-90% chronicity, much worse)
is absent.
Notation is inconsistent within one file: HBsAb/HBcAb/HBeAb in the viral
hepatitis topic, "Anti-HBs" on card 25, "anti-HBc IgM" in the ALF topic.

### AN EIGHTH BROKEN CARD (front asks what the back does not answer)
DILI card 13. FRONT: "What PROPORTION of DILI is cholestatic, and what drug
types most commonly cause it?" BACK: "Cholestatic injury is common, and
antibiotics are the usual culprits." No proportion given. Confirmed raw.
Running total: MSK Foundations 84, Metabolic Bone 3, Metabolic Bone 13,
ID Cell Biology 66, ID Antibiotics 36, ID Vaccinations 9, Liver DILI 13.
(That is seven; plus the ENT referral-rule contradiction which is a different
class.)

### VERIFIED CORRECT
- KING'S COLLEGE CRITERIA, BOTH ARMS, with exact thresholds and internally
  consistent: paracetamol = pH <7.3 alone, OR all three of INR >6.5, creatinine
  >300, grade III/IV encephalopathy; lactate >3.5 as an early criterion.
  Non-paracetamol = INR >6.5 alone OR any 3 of 5 (age <10 or >40, bilirubin
  >300, jaundice-to-encephalopathy >7 days, INR >3.5, unfavourable aetiology).
  Card 36's summary agrees with card 35's list.
- NAC "effective even late (after liver injury established) - do not withhold",
  with both halves marked; plus empirical NAC for staggered/unknown-time
  overdose.
- West Haven I-IV encephalopathy grading, cross-referenced to the intubation
  threshold (III-IV) and the King's criteria.
- Faecal-oral vs blood-borne: no virus on the wrong side ("the vowels A & E
  come from the bowels"); B alone is DNA.
- Hepatitis E in pregnancy correctly GENOTYPE-QUALIFIED — genotype 1 endemic
  carries high mortality, "UK-acquired genotype 3 does not carry this risk".
  Better than the usual blanket teaching.
- DILI: R-ratio with ALT:ALP each as a multiple of its OWN ULN; Hy's law
  (ALT >3x ULN + bilirubin >2x ULN, ~10% mortality); co-amoxiclav named as the
  commonest cholestatic culprit.
- HCC: 6-monthly ultrasound +/- AFP, "a normal AFP does NOT exclude HCC",
  BCLC staging, and Milan criteria with exact thresholds.

### A VERIFIER REFINEMENT WORTH KEEPING
The agent hit the welding problem this project has documented: stripping tags
with '' fuses "active/acute" + "IgG" into "active/acuteIgG" across a
</li><li> join, which LOSES a serology token and produced 4 false alarms. It
switched to the space-substituting strip AND added a hard assertion that no tag
boundary may sit between two word-characters (including '-', so "anti-HBs" and
"NAPQI-mediated" are covered). That assertion caught a real defect during the
build: <strong>NAPQI</strong>-mediated would have split the token.
ADOPT: the space-strip plus an explicit no-tag-inside-a-token assertion is
strictly better than either check alone.

## hepatobiliary-pancreatic.json — all 7 topics
THE THREE-WAY BILIARY DISCRIMINATOR IS CORRECT, stated FOUR times across three
topics with no feature on the wrong member. Checked in every direction:
fever on cholecystitis and cholangitis, explicitly NEGATED on colic; jaundice
ONLY on cholangitis and explicitly negated on cholecystitis; Murphy's only on
cholecystitis and explicitly negated on colic; normal bloods pinned to colic;
CBD (not cystic duct) pinned to cholangitis. Mirizzi's is correctly framed as
the one jaundice-with-cholecystitis case, WITHOUT a CBD stone.
Charcot's triad and Reynolds' pentad both correctly composed (3 + 2 = 5).
Murphy's sign defined with its MECHANISM (gallbladder descending onto the
examining hand), plus the sonographic variant as a separate card.
Glasgow score >=3 with the full PANCREAS mnemonic and all eight thresholds —
all standard, no numeric error. Lipase more sensitive/specific than amylase
with the longer half-life, and "a normal amylase does not exclude".
Courvoisier's law stated twice WITH the mechanism (stones cause a fibrosed,
non-distensible gallbladder), and correctly refined to distal tumours only.
CA19-9 caveat present in both the pancreatic cancer and cholangiocarcinoma
topics. Cholangiocarcinoma-PSC link on 4 cards with the UC route correct
(UC -> PSC -> cholangiocarcinoma).

GAPS / EDITORIAL (reported, not fixed):
- RANSON, APACHE II, GLASGOW-IMRIE, "modified Glasgow" and BISAP are ALL absent
  from these 7 topics. The file says "Glasgow score" and "PANCREAS Glasgow
  criteria" only. They exist in sibling files (risk-scores-criteria.json ::
  Hepatology, gastrointestinal.json), so the severity-score material is filed
  elsewhere — the same pattern as scabies, rouleaux and carpal tunnel.
- TOKYO GUIDELINES absent from these topics (1 hit, in gastrointestinal.json ::
  Jaundice).
- Pseudocyst and necrosis have timings (>4 weeks); ARDS and hypocalcaemia have
  none.
- "Reynolds pentad" (no apostrophe) on card 8 vs "Reynolds' pentad" on card 19.
- WHIPPLE'S IS USED FOR TWO UNRELATED THINGS in the same seven topics —
  Whipple's PROCEDURE (pancreaticoduodenectomy) and Whipple's TRIAD for
  insulinoma. Both correct; no card warns the reader they are different
  eponyms.
- ERCP timing is given as an INDICATION not a clock in gallstone pancreatitis
  ("cholangitis or persistent CBD obstruction; predicted-severe alone is not an
  indication") and as severity-dependent in cholangitis. The only clock in the
  topic is antibiotics within 1 hour.

## GI batch (upper-gi, lower-gi-bowel, gastroenterology-hepatology) — v1438

### Clinical divergence needing a human (highest priority in this batch)
- **"Curative surgery for UC" means two different operations in two topics.**
  lower-gi-bowel :: IBD [11] and [39] say PANPROCTOCOLECTOMY is curative
  ("removes the entire disease"/"entire diseased organ"). gastroenterology-
  hepatology :: "IBD — Ulcerative Colitis" [12], whose front literally asks
  "What surgery is CURATIVE for UC?", answers "Total colectomy (with ileostomy
  or ileal pouch-anal anastomosis)". A total colectomy leaves the rectum and is
  therefore not curative. The two files assert curativeness of two different
  operations; the combined topic is the precise one. NOT fixed.

### Front does not match back
- gastroenterology-hepatology :: Crohn's [7] — front asks for a **blood**
  marker; the back leads with **faecal** calprotectin (a stool test).
- gastroenterology-hepatology :: Crohn's [2] — front asks what distinguishes
  Crohn's HISTOLOGICALLY; back answers with skip lesions and transmural
  inflammation, which are distributional/macroscopic. Minor.
- lower-gi-bowel :: Foundations [98] (hepatic jaundice) is the only one of the
  three jaundice-classification siblings that gives NO urine or stool change,
  breaking the parallel with pre-hepatic [97] and post-hepatic [99].

### Gaps between topics covering the same ground (not contradictions)
- **ASCA / pANCA is absent from all 44 cards of the combined IBD topic**, though
  both standalones carry it (Crohn's [5], UC [3]). Standard exam discriminator.
- **Neither standalone ever states Crohn's diarrhoea is typically non-bloody**,
  though the combined topic does (4 cards). Arguably the most examined
  discriminator in the set.
- Truelove-Witts: combined [34] gives every threshold; UC standalone [10] names
  the six domains with NO threshold for any of them — nameable, not applicable.
- Absent from both standalones: gallstones in Crohn's, EEN in children,
  Crohn's-colitis CRC equivalence, pyoderma gangrenosum, calprotectin as the
  IBS-vs-IBD discriminator. Absent from combined: MRI enterography, capsule
  endoscopy, bimodal age peaks, "stopping smoking can trigger flares".
  Neither topic is a superset of the other.
- C. difficile: the lower-GI topic lacks three things the (already-formatted)
  infectious-disease file has — avoid antimotility agents / toxic megacolon
  risk; why IV vancomycin does not work; chlorine-based cleaning. No
  CONTRADICTION anywhere: both agree on oral vancomycin 1st, fidaxomicin 2nd,
  metronidazole no longer 1st, soap-and-water because alcohol spares spores,
  48h isolation. Note lower-gi-bowel :: Stomas [14] recommends loperamide for a
  high-output ileostomy — different indication, same file, not a conflict.
- IBS diagnostic criteria are present and positively framed (NICE CG61 shape)
  but unattributed; "Rome" appears nowhere in the adult IBS topic (it is in
  paediatric.json). Marsh classification absent from Coeliac but present in
  gastrointestinal.json. Both "absent from topic, present in app".

### Internal inconsistency of register
- Smoking in UC: the combined topic hedges on 2 of 5 cards ("still advised to
  stop", "risks outweigh any benefit") and states it flat on the other 3
  ("smoking protective"). The standalone is flat. No factual conflict.

### Duplicates / redundancy
- C. difficile: [16]/[21] both answer first-line for a first episode; [10]/[18]
  both cover life-threatening treatment; [9]/[18] both restate "same drug at any
  severity". 4 of 22 cards redundant.
- Foundations near-duplicate pairs: 30/110 (bile made-stored-released),
  35/59 (Zollinger-Ellison), 12/69 (erythromycin as motilin agonist),
  83/88 (oestrogen clearance). First-pass metabolism is duplicated ACROSS files
  (lower-gi-bowel Foundations [72] vs liver Foundations [144]/[145]).

### Not defects — checked and confirmed correct
- Upper GI barium: the file says "not barium FIRST" and correctly adds that a
  dilute barium study is more sensitive if the water-soluble study is negative.
  My brief's flat "never barium" was the imprecise one. File wins.
- Barrett's [10] states "ALARM is an aide-memoire, not the referral rule" — a
  deliberate correction in the file, left alone.
- Liver zonation / lobule / sinusoid architecture is absent from BOTH
  Foundations topics but present in gastrointestinal.json ::
  histology__GASTROINTESTINAL__Liver. Not an app-level gap.
- Adeno-vs-SCC site/risk pairings verified character-identical across all 12
  pairing-bearing cards. Nothing moved.

### Cosmetic
- Foundations [93] "…→ urine (urobilin), in the intestine." — location clause
  stranded at the end, reads like a template artifact.
- Foundations [105] writes "↓ hepatic" with a space; the deck elsewhere writes "↓x".
- Colorectal Cancer [10] writes "ages 50–74 (the programme has been extended
  down to age 50)" — the parenthetical restates the lower bound already given.
- Bowel obstruction [6]/[7] name the single commonest cause but give no ranked
  top three; the remaining causes are lumped unranked.
- Chronic mesenteric ischaemia is not tied to a named vessel ([8] says "≥2 of
  the 3 vessels"), which is correct but differs from the AMI=SMA pattern.
- "Truelove-Witts" vs "Truelove and Witts" across the two files.

### PUD / gastric cancer / dyspepsia / anorectal (same batch)
- **upper-gi :: PUD [30]** says the urea-breath test-of-cure is "6-8 weeks
  **after starting** treatment". The usual formulation is after COMPLETING
  eradication (and >=4 weeks after antibiotics, >=2 weeks off PPI). Possible
  imprecision; not altered.
- **upper-gi :: PUD [9]** gives the OGD indication as "Age >=55 or red flags",
  which reads as scope-everyone-over-55. The Dyspepsia and Gastric Cancer
  topics are precise that 55+ alone is a NON-URGENT direct-access criterion in
  specified combinations only. Not strictly contradictory; PUD [9] is looser.
- **NSAID + steroid (or + SSRI / anticoagulant) co-prescribing is nowhere
  stated as a MULTIPLIED risk warranting gastroprotection.** Both drug classes
  appear in the bleeding-risk and iatrogenic-dyspepsia lists, but the
  interaction itself is absent. Genuine gap; nothing added.
- The BNF's clarithromycin-free alternative for patients with prior
  clarithromycin exposure is absent from the eradication cards.
- Glasgow-Blatchford and Rockall are absent from all 8 topics of upper-gi.json,
  but present in risk-scores-criteria.json, gastrointestinal.json (signs) and
  acute-abdomen-surgical-principles.json. Absent from topic, NOT from app.

### Not defects — verified correct
- Gastric vs duodenal ulcer pain-and-food: GASTRIC worse with eating (fear of
  eating, weight loss, must biopsy); DUODENAL relieved by eating, worse when
  hungry and at night. Stated the conventional way round on all three cards
  ([3], [4], [5]) with no internal contradiction.
- H. pylori washout (2 weeks PPI / 4 weeks antibiotics) stated four times
  across two topics, fully consistent, and correctly applied to BOTH the breath
  and stool tests. Serology and stool antigen both explicitly excluded as
  test-of-cure.
- Dyspepsia [10] self-corrects the ALARM mnemonic ("aide-memoire only... several
  ALARM letters are not themselves referral criteria"). A strength.
- Anorectal [23] explicitly rescues the ANTERIOR midline fissure from being
  misread as atypical (2nd commonest primary site, commoner in women after
  childbirth). Better than the usual textbook shorthand.
- Anorectal [37] gives Goodsall's rule AND caveats that it is unreliable in
  practice (EUA +/- MRI defines the tract).
- Anorectal topic does NOT cover pruritus ani, rectal prolapse, anal carcinoma
  as its own entity, or proctalgia fugax. Scope note only.

### Display defect (FIXED separately, not a content change)
- gastroenterology-hepatology.json had two topic keys containing the six literal
  characters — instead of an em dash, in both the `fc` and `q` maps, plus
  the matching two entries in index.html's HIGH_YIELD set. The topic titles
  rendered on screen as "IBD — Crohn's Disease". Whole-deck scan found
  these 4 + 2 occurrences and no others.

## Ophthalmology — AMD / retinal detachment / optic neuritis (v1441)

### Cosmetic / easy to conflate
- AMD holds TWO different "~90%" figures meaning different things: dry AMD is
  ~85-90% of CASES (card 4), and wet AMD causes ~90% of SEVERE VISUAL LOSS
  (card 6). Both correct, easily conflated.
- AMD [3] calls drusen "the hallmark of AMD" rather than of DRY AMD. The only
  place drusen is not tied specifically to dry. Correct as written.
- Retinal Detachment [10] calls it a "warning triad", lists three features,
  then adds painlessness as a fourth outside the count.
- "a RAPD" vs "an RAPD" alternates within ophthalmology.json (Optic Neuritis 6
  vs Retinal Detachment 21, and again in CRAO/CRVO). Orthographic only.

### Not defects — verified correct
- Dry vs wet AMD: drusen, geographic atrophy and gradual course attached to
  DRY; choroidal neovascularisation, rapid onset, metamorphopsia and anti-VEGF
  attached to WET. Checked on all 9 contrast-bearing cards. ZERO reversals.
- Macula-on vs macula-off is handled unusually carefully: the difference is in
  the SURGICAL window (~24h vs ~2-3 days), and [17] states explicitly that
  macula status "never downgrades the urgency of the referral itself".
- Optic neuritis [22] is better than most sources: standard-dose ORAL
  prednisolone alone does not speed recovery and INCREASES recurrence.
- MS risk correctly stratified by MRI ([26]): ~50% by 15 years overall, ~3 in 4
  with lesions, ~1 in 4 with a normal scan.

### My brief was wrong again (6th and 7th time) — file correct both times
- I told the agent AMD and retinal detachment "both present with new floaters/
  metamorphopsia". They do not, in this file: \bfloater appears ONLY in Retinal
  Detachment (5 cards, zero in AMD); \bmetamorphopsia/\bdistort appears ONLY in
  AMD (5 cards, zero in Retinal Detachment). The file keeps the two symptom
  sets cleanly separated. Nothing was added.
- I described the group as "visual loss without a red eye"; the phrase "red eye"
  has zero hits in these three topics (it is elsewhere in the file and in nine
  other card files). Absent from topic, not from app.
- The phrase "days, not weeks" is absent from the whole deck. The substance is
  present and STRONGER: refer suspected wet AMD within 1 working day (NICE),
  treat within 14 days.

## Ophthalmology — cellulitis / strabismus / systemic disease (v1442)

### Highest-priority safety check: PASSED
- Periorbital (preseptal) vs orbital (postseptal) cellulitis: proptosis, pain on
  eye movement, ophthalmoplegia, reduced acuity and RAPD are attached to ORBITAL
  on every card, and preseptal is explicitly stated to LACK each ("full and
  painless", "normal"). No card anywhere in the topic attaches any of the five
  to the preseptal form. I re-read cards 7 and 8 from raw JSON myself and
  confirm this independently. Cross-deck: 25 further anchored hits across 9
  other files, all running the same direction. NO REVERSAL IN THE DECK.

### Misfiled card (the umbrella-topic pattern again, 9th instance)
- "Systemic Disease & the Eye" [10] is a scleritis-vs-episcleritis comparison
  with no systemic disease mentioned in it at all. It duplicates material with
  three existing homes (conditions__OPHTHALMOLOGY__Scleritis / Episcleritis [3],
  investigations__OPHTHALMOLOGY__Fundoscopy Signs & Special [20] and [21]).
  It does NOT conflict with any of them. Its only link to the topic is that it
  follows the rheumatoid arthritis card. Reported, not moved.

### Coverage asymmetry worth a decision
- The systemic topic gives DIABETES a one-line signpost card [0] but gives
  HYPERTENSION nothing at all (0 anchored hits for \bhypertens\w* in all 32
  cards), even though both have dedicated 27- and 24-card topics. Diabetes gets
  a pointer, hypertension does not. Not an error; an inconsistency.
- The diabetes signpost does NOT conflict with the dedicated topic (both say
  leading cause of working-age blindness, largely preventable). Legitimate
  signpost, not a duplicate.

### Possible app-level gaps (each checked deck-wide before being called a gap)
- **SLE ocular features: no card anywhere in the deck gives them.** One ophthalmic
  mention only, as a scleritis cause. Closest thing to a genuine app-level gap.
- **Sickle cell retinopathy: no card anywhere.** Mentioned in passing in three
  other ophthalmology cards but proliferative sickle retinopathy has no card.
- Albinism: 2 deck-wide hits, neither ophthalmic. Minor.
- NOT gaps (filed in sibling files): hyperlipidaemia/corneal arcus, herpes
  zoster ophthalmicus, ocular TB.

### Cross-file wording divergence (direction agrees, interval differs)
- Abnormal red reflex referral: ophthalmology Strabismus [17]/[21] say "urgent
  suspected-cancer referral, seen within 2 weeks (NICE)"; paediatric.json
  signs__PAEDIATRIC__Leukocoria [3]/[9] say "same-week (urgent) ophthalmology
  referral — never watch and wait". Both mandate urgency and neither permits
  watchful waiting; only the stated interval differs.

### My brief was wrong an 8th time — file correct, and deliberately so
- I briefed "treat before age 7-8 or vision is permanently lost". The file
  (Strabismus [3]) gives the 7-8 year window but explicitly rejects the
  absolutist half: "It can still help older children, with lower response rates,
  so a late presentation is treated rather than abandoned." The file is right
  and the correction looks deliberate. Nothing changed.

## Ophthalmology — glaucoma / uveitis / cataracts (v1443)

### GENUINE NUMERIC CONTRADICTION — three cut-offs for one sign, one file
Verified independently against raw JSON. The glaucomatous cup:disc threshold is
given three different ways inside ophthalmology.json:
  conditions__...__Chronic Open-Angle Glaucoma [10].back  -> ">0.5, or asymmetry"
  conditions__...__Chronic Open-Angle Glaucoma [13] (quiz explanation) -> 0.5
  investigations__...__Core Examination [8].back -> "0.6 or greater, or asymmetry of more than 0.2"
  investigations__...__Fundoscopy Signs & Special [7].back -> ">= 0.7"
  investigations__...__Fundoscopy Signs & Special [4] (quiz answer) -> 0.7
A student meeting two of these meets a contradiction. Needs a human to pick one.
(Same family as the dermatology ABPI compression-threshold disagreement.)

### Stated nowhere in the deck (strong claim, checked deck-wide)
- **The IOP in anterior uveitis is never stated anywhere in the app** — no value,
  no direction, not even "usually normal or low". The uveitis topic's single IOP
  mention is "measuring IOP (uveitic glaucoma)" as an investigation. AACG by
  contrast is fully specified (normal 10-21; AACG often 50-80, usually >40-50).
  So the IOP axis of the AACG-vs-uveitis discriminator exists on ONE SIDE ONLY.

### Register inconsistency across the urgency cluster
- AACG — the most urgent of the three — gets only "Immediate ophthalmology
  referral" [14]. Anterior uveitis gets "Same-day ophthalmology assessment" [21]
  and cataract/retinoblastoma gets "urgent same-day referral" [13]. The phrase
  "same-day" for AACG exists in the app but in a DIFFERENT file (ophthalmic.json,
  Red Eye quiz explanation). Not a clinical error; the least urgent-sounding
  wording is on the most urgent condition.

### Internal tension, no false statement
- AACG [9] names SYMPATHOMIMETICS as a mydriatic precipitant; AACG [16]
  recommends a topical ALPHA-2 AGONIST (brimonidine/apraclonidine) as treatment.
  Alpha-2 agonists are sympathomimetics. Neither card asserts anything false;
  they are simply never reconciled. A qualifier would help.

### My brief was wrong a 9th time — and the file is making a real distinction
- I asked whether "first-line treatment (prostaglandin analogue)" was present.
  In this file the PGA is explicitly NOT first-line treatment:
    [18] first-line TREATMENT = 360-degree selective laser trabeculoplasty (NICE),
         with a generic PGA offered only if the patient declines SLT, is waiting
         for it, or SLT is unsuitable
    [19] first-line DRUG (drop) = prostaglandin analogue (latanoprost)
  The two cards are internally consistent and the distinction is deliberate; the
  file's own quiz bank agrees. My brief carried the outdated position.

### Absent from topic, present in app (not gaps)
- Normal IOP range 10-21 mmHg is absent from the COAG topic (its only IOP number
  is the ocular-hypertension treatment threshold >=24 mmHg); the range lives in
  the AACG topic and in investigations__...__Core Examination [11].

### Not defects — verified correct
- AACG pupil (fixed, mid-dilated, oval, non-reactive) vs uveitis pupil (small,
  miotic, irregular with posterior synechiae): the two cards AGREE, clean contrast.
- The two big contrast cards (COAG [3] and AACG [23]) are identical on every
  shared axis; COAG [3] adds the angle axis, AACG [23] adds the pupil axis.
- Normal-tension glaucoma present twice and hedged correctly in four places.
- Pilocarpine card [19] carries the correct and often-omitted timing caveat:
  above ~40-45 mmHg the iris sphincter is ischaemic and unresponsive, so
  pilocarpine is given once the pressure has started to fall.
- Cycloplegic rationale given BOTH ways ([22]): relieve pain from ciliary spasm
  AND prevent/break posterior synechiae.
- Topiramate correctly singled out as closing the angle WITHOUT pupillary block
  (bilateral, myopic shift, stop the drug rather than iridotomy).

## Ophthalmology — retinal vascular (v1444)

### Highest-priority safety check: PASSED, verified independently
- CRAO vs CRVO fundoscopy: I grepped the WHOLE deck myself for cherry-red /
  pale retina / blood and thunder / stormy sunset / cattle-trucking /
  Hollenhorst. 30+ occurrences across 6 files (ophthalmology, ophthalmic,
  neurological, skin-special-senses + the two quiz maps). EVERY pale-retina /
  cherry-red reference pairs with CRAO; EVERY blood-and-thunder / stormy-sunset
  pairs with CRVO. No card anywhere teaches the opposite disease.
- The only other "cherry-red" uses in the deck are unrelated and correct:
  CO-poisoning skin (clinical-pharmacology-prescribing), septal haematoma (ent),
  and the epiglottis in paediatric stridor.

### Asymmetric summary card — one side carries the reconciling clause
- Diabetic Retinopathy [26]: "Diabetes: microaneurysms, dot-blot haemorrhages,
  neovascularisation. Hypertension: AV nipping, flame haemorrhages, cotton-wool
  spots, copper/silver wiring."
- Hypertensive Retinopathy [23]: the same two lists, PLUS "(Cotton-wool spots
  occur in both.)"
  Read alone, DR [26] implies cotton-wool spots discriminate hypertension, which
  DR [5] and HTN [23] both contradict in substance. The mirror card has the
  parenthetical; DR [26] does not. Not fixed.

### Urgency wording sits in the sibling topic
- "Emergency" appears ONCE inside the CRAO topic ([19]). The explicit statement
  that CRAO is a same-day stroke-pathway emergency is worded on CRVO [1]
  ("CRAO ... is managed as a stroke — emergency same-day referral onto the
  stroke pathway"). Present in the app; a student revising CRAO alone meets
  "urgent/immediate", not "same-day emergency". Same family as the AACG
  register finding above.

### Not defects — the file is careful in three places worth preserving
- Diabetic Retinopathy [5] explicitly refuses to make cotton-wool spots an R2
  criterion: "Cotton-wool spots often accompany these and signal ischaemia, but
  on their own they do not upgrade a fundus to R2." Correct and often got wrong.
- Hypertensive Retinopathy [6]/[7]/[10] deliberately DO NOT pin copper/silver
  wiring to a grade, stating that sources differ and it must not be used to
  assign one. A deliberate hedge; preserved, not "tidied".
- CRAO [19] labels ocular massage / IOP-lowering / carbogen as low-evidence and
  to be done only while the emergency referral is being made, and [20] states
  thrombolysis is NOT standard care. Appropriately hedged.
- Maculopathy is kept on its own axis from the R-ladder ("every report gives
  both an R and an M grade"), which is correct DESP practice.

## Ophthalmology — red eye differential (v1445). OPHTHALMOLOGY NOW COMPLETE 492/492.

### SAFETY INVERSION — a back that contradicts its own front
Verified independently against raw JSON.
  conditions__OPHTHALMOLOGY__Bacterial Conjunctivitis [4]
  FRONT: "Which features are shared by bacterial, viral and allergic
          conjunctivitis — and what does their ABSENCE mean?"
  BACK:  "Red eye, normal vision, no significant pain, no photophobia, normal
          pupil. IF ANY OF THESE RED FLAGS ARE PRESENT -> think keratitis,
          uveitis, scleritis or acute angle-closure glaucoma instead."
The listed items are REASSURING findings. The front says it is their ABSENCE
that matters; the back calls them "red flags" and says to worry when they are
PRESENT. Read as written, the back tells a student to refer a painless red eye
with normal vision, and to reassure a painful one with reduced vision. The
back should say "if any of these are ABSENT". Highest-priority content fix in
the ophthalmology batch. NOT fixed.

### Not defects — verified correct across the cluster
- Discharge, laterality, pain quality, acuity, itch and the fluorescein/slit-lamp
  findings are consistent across all five red-eye topics AND agree with the
  sibling file ophthalmic.json :: signs__OPHTHALMIC__Red Eye (12 cards). No
  conflict on any axis.
- Scleritis vs episcleritis: phenylephrine blanching direction correct;
  scleritis = severe boring pain worse at night, sight-threatening, ~50% have
  systemic autoimmune disease; episcleritis = mild/no pain, self-limiting.
  Card [10] adds a good safety-net: if blanching is equivocal, pain is more
  than mild, the globe is tender or vision is reduced, treat as scleritis.
- HSV keratitis: dendritic ulcer on fluorescein present; steroids CONTRAINDICATED
  with the geographic-ulcer and perforation mechanism given; same-day referral
  present. "corneal melt" appears exactly once in the whole deck, here.
- Contact lens: Pseudomonas and Acanthamoeba both named; "do not treat as simple
  conjunctivitis" present in substance on two cards.

### Where my brief's PHRASING differed from the file (file correct each time)
- I wrote "school-exclusion advice"; the file states the OPPOSITE POLARITY and is
  right: exclusion is NOT routinely required (UKHSA), for both viral and
  bacterial. An otherwise-well child can attend.
- I wrote episcleritis is "uncomfortable"; the deck never uses that word — it
  says "mild/no pain (gritty discomfort)". Same meaning.
- I wrote "absolute contraindication" for steroids in HSV; the deck says
  "CONTRAINDICATED" and "the classic reason NEVER to give steroid drops for an
  undiagnosed red eye". The phrase "absolute contraindication" occurs 16x
  elsewhere in the deck but not here.

### Worth knowing before anyone edits the cluster
- Viral [0] qualifies the headline claim: adenoviral is commonest overall and in
  adults, BUT in young children a bacterial cause is commoner (though most still
  settle without antibiotics). Self-consistent and consistent with the other four.

### Cross-file formatting divergence (for whoever formats ophthalmic.json)
- ophthalmic.json encodes em dashes as &mdash; entities; ophthalmology.json uses
  literal em dashes. Same content, different encoding.

## Renal — Foundations of Nephrology (v1446)

### App-level gaps (checked with the LIST-AWARE deck search, see note below)
- **Cystatin C is never TAUGHT anywhere in the deck.** Exactly one occurrence in
  all 80 card files: renal.json q :: Chronic Kidney Disease [4].options[4],
  where it is a multiple-choice DISTRACTOR ("Cystatin C alone in all patients")
  — i.e. the wrong answer. So a student can only ever meet it as something to
  reject. NGAL and KIM-1: zero occurrences anywhere.
  (Reporting nuance: "absent from the deck" was too strong; "present only as a
  wrong answer, never taught" is the accurate statement.)
- **The insensitivity of creatinine — that roughly half of GFR is lost before
  creatinine rises — is absent from the whole deck.** The LAG is stated
  (Foundations [36]: "unreliable in AKI, not at steady state"), but not the
  insensitivity. These are different facts and the second is the examinable one.

### Genuine misfiling — clinical management inside a physiology topic
- Foundations [147], [148], [149] are clinical management, not foundations.
  [147] gives hyperkalaemia causes AND the full emergency ladder (calcium
  gluconate -> insulin-dextrose -> salbutamol), duplicating Electrolyte
  Disturbances [4]/[5]/[7]/[8]; [148] duplicates its [10]; [149] restates
  [147]'s middle rung. Recommend moving 147-149 to the Electrolyte topic.
  The rest of that block (129-146) is legitimate mechanism.
- 10th instance of the "Foundations of X is where unrelated material
  accumulates" pattern.

### Backs that do not answer their front
- [88] front asks how NSAIDs interact with RAAS and renal perfusion; the back
  answers the perfusion half then answers the RAAS half by RESTATING the
  question ("-> interact with RAAS"). Circular.
- [96] front asks ADH's "secondary action" (singular); back gives two.
- [149] front asks how insulin-dextrose works; back covers insulin only, never
  explains the dextrose.
- [18] maps RTA to segments but omits type 4 (supplied by [125]).

### Duplication within the file (same material taught twice)
- histology__RENAL__Tubules re-teaches PCT/TAL/DCT/CD with NKCC2/NCC/ENaC,
  overlapping Foundations 4-9 and 132. histology__RENAL__Juxtaglomerular
  Apparatus carries 17 renin cards + 12 macula densa cards against Foundations
  15-16 and 75-76. Not misfiled, but redundant within one file.
- Near-duplicate pairs inside Foundations: 17/56, 67/93, 31/79, 32/79, 65/95,
  68/97+98, 69/100+101, 70/103, 14/144, 18/126, 5+6/60. Three cards (92, 105,
  134) state "sodium concentration disorders are water problems" independently.
- Pharmacology/critical-care content sitting in a physiology topic, topically
  tethered so NOT called misfiled: [53] probenecid/penicillin, [106]
  desmopressin for enuresis and vWF, [107] vasopressin in shock, [127]
  acetazolamide in glaucoma/altitude.

### Absent from this topic, present in the app (NOT gaps)
- Anion gap formula and range: 0 hits in these 150 cards, but present and
  CONSISTENT in four places (Electrolyte Disturbances [33] and toxicology.json
  both give Na - (Cl + HCO3), normal ~8-12). Foundations [128] teaches the
  normal- vs raised-gap fork by mechanism without the arithmetic.
- Urinalysis and casts: 0 hits here. I checked every cast attribution deck-wide:
  red cell -> GN/nephritic, muddy brown -> ATN, white cell -> pyelonephritis OR
  interstitial nephritis, fatty/oval fat bodies -> nephrotic, broad waxy ->
  chronic. ALL CORRECT, no swap anywhere. (AKI [23] names only interstitial
  nephritis for white cell casts, not pyelonephritis — an omission, not a swap.)
- ACR thresholds: absent here, present in CKD [0]/[10]/[23]-[26] (A1 <3, A2
  3-30, A3 >30 mg/mmol) and nephrotic range in GN [6].
- ACEi-vs-ARB mechanism (ACE vs AT1 receptor): absent from this topic, present
  in histology__RENAL__Juxtaglomerular Apparatus [28].

### Not defects — verified correct
- Every diuretic is attached to the correct nephron segment (26 mentions
  checked): acetazolamide/SGLT2 -> PCT, loops -> NKCC2 in the thick ascending
  limb, thiazides -> NCC in the DCT, K-sparing -> aldosterone receptor/ENaC in
  the collecting duct. No reversal.
- Card [14] explicitly corrects the common error that loop diuretics treat
  hypercalcaemia, and the loop->calcium-loss / thiazide->calcium-retention
  direction is right in both places it appears.
- Full RAAS cascade correct at every step, including aldosterone's site (zona
  glomerulosa) and an accurate note that it is NOT a direct Na/K swap.
- RTA types 1/2/4 all present, correct, and all correctly normal-anion-gap.

### Tooling note (mine, not the file's)
Absence claims were missing quiz `options`, which is a LIST of strings — an
isinstance(s, str) test skipped it silently. A term present only as a
multiple-choice distractor therefore read as absent from the whole deck.
Rewrote the deck search to walk nested lists/dicts ($SD/deckgrep.py).

## Renal — electrolytes, AKI, renal vascular (v1447)

### Verified correct — the swap-risk checks all passed
- **Chvostek's vs Trousseau's: correct everywhere.** I audited the whole deck
  myself (46 Chvostek hits, 79 Trousseau hits across 15 files). Trousseau =
  carpopedal spasm on cuff inflation; Chvostek = facial twitch on tapping the
  facial nerve. No swap anywhere, in any file, in fc or q. The one place the
  reversal appears is endocrinology.json q Hypoparathyroidism [37].options[3],
  where it is correctly a DISTRACTOR.
  (Note the deck also carries Trousseau's SIGN OF MALIGNANCY — migratory
  thrombophlebitis — as a separate eponym, and gastrointestinal.json has a card
  that explicitly warns the two Trousseau's signs are different things. Good.)
- **Urine Na / FENa attached the RIGHT WAY ROUND**: pre-renal low urine Na
  (<20) and FENa <1%; ATN high urine Na (>40) and FENa >2%. Corroborated
  independently by urine.json [21]/[23]. No reversal.
- **Muddy brown casts -> ATN** present; ATN vs pre-renal distinguished by fluid
  responsiveness; [6] correctly frames them as two ends of one spectrum.
- **AKI staging internally consistent**: creatinine bands 1.5-1.9 / 2.0-2.9 /
  >=3 contiguous with no gap or overlap; urine-output thresholds monotonic.
  Agrees with biochemistry.json.
- **Hyperkalaemia management agrees across topics.** AKI [33] and Electrolyte
  [7] match on every shared element: >=6.5 threshold, ECG-changes override,
  calcium gluconate 10% 30 mL over 10 min, "does not lower K+", insulin 10
  units in 25 g glucose, SZC/patiromer, calcium resonium retired. Electrolyte
  [7] is a superset. No contradiction.
- Electrolyte [8] exists solely to make the point students get wrong:
  "It stabilises the cardiac membrane (protects the heart) BUT DOES NOT LOWER
  K+." Stated three times across the topic. A real strength.
- Hyponatraemia correction limit present with numbers AND the consequence named
  both ways (ODS / central pontine myelinolysis for too-fast correction of
  hyponatraemia; cerebral oedema for hypernatraemia). Both mnemonics present.
- RAS: the "AKI on starting an ACEi" card [10] adds a specificity caveat that
  pre-empts the classic exam trap (commoner causes must be excluded first).

### Labelling gaps — content present, name absent
- **KDIGO is never named in the AKI topic** (0 hits) even though the staging IS
  KDIGO. The name is in the app (biochemistry.json, bedside-tests.json,
  urine.json, immunology-serology.json). RIFLE: 0 hits anywhere in the deck.
- **No mnemonic label for the nephrotoxic list.** AADN and DAMN both have 0 hits
  in the AKI topic; both exist in clinical-pharmacology-prescribing.json
  "Renal / Hepatic Dose Adjustment Principles" [12], which ALSO carries the
  mechanism split the AKI topic lacks: "Only aminoglycosides and NSAIDs are
  directly nephrotoxic; ACEi/ARB and diuretics impair renal perfusion."
- AKI gives a REASON for withholding only SGLT2 inhibitors (euglycaemic DKA) and
  metformin (lactic acidosis). No reason is given for ACEi/ARB, NSAIDs or
  diuretics, so the nephrotoxic-vs-perfusion distinction is absent from the topic.
- "corrected calcium" -> the renal file says "ADJUSTED calcium" (same standard
  formula). "corrected" is used in 6 other files. Terminology split.
- Hyperkalaemia ECG vocabulary is split within one file: Electrolyte [6] says
  "loss of P waves ... sinusoidal wave"; AKI [19] says "flattened/absent P waves
  ... sine wave". Same progression, different words.

### Scope
- **11 of the 43 cards in "Electrolyte Disturbances (K+, Na+, Ca2+)" are
  ACID-BASE cards** (positions 32-42): anion gap, MUDPILES, type A/B lactic
  acidosis, respiratory and metabolic acidosis/alkalosis, salicylate mixed
  picture. Outside the topic title. Either the title or the filing needs a
  decision.

### Duplication
- AEIOU appears SIX times app-wide (renal AKI [34], renal RRT [3],
  biochemistry [17], renal-urological [7], risk-scores-criteria [15]/[16]/[18]).
  They do not conflict.
- Renal Vascular is built hub-and-spoke: [13] is a strict subset of [12];
  [17]'s two halves are [18] and [19] verbatim in substance; same shape at
  [2]->[3]/[4], [5]->[6]-[9], [10]->[11], [21]->[22]/[23]. By design, but heavy.
- Electrolyte near-duplicates: [3]/[23] (hypercalcaemia causes near-verbatim),
  [7]/[8], [7]/[9], [1]/[2].
- AKI [13]/[14] backs are 0.93 similar and differ ONLY in "1.5-1.9x -> 2-2.9x"
  and ">6 h -> >12 h" — the highest-risk confusion pair in the topic.
- AKI [11] (NICE diagnosis, >=50% in 7 days) and [13] (KDIGO stage 1, 1.5-1.9x
  baseline) state the same numeric fact two ways on adjacent cards.

### Cosmetic
- Renal Vascular [22] front is ungrammatical: "When is revascularisation
  reserved for in atherosclerotic RAS?" (stray "for"). Back answers correctly.
- Renal Vascular [2] gives FMD's SIGN where it gives atherosclerosis's SITE;
  the FMD site (mid/distal) only appears on [4].
- AKI [11] says urine output "for >6 h"; biochemistry.json [13] says ">=6 h".
  Each matches its own source body's wording. Not a contradiction.

### My brief was wrong 4 more times (11th-14th) — file correct each time
- "calcium chloride" — absent from the renal topic (gluconate only); present in
  cardiovascular.json ALS cards and endocrinology.json.
- "corrected calcium" — file says "adjusted".
- "bones, stones, abdominal groans, psychic moans" — file says "stones, bones,
  groans & PSYCHIATRIC moans".
- "flattened P waves / sine wave" — the electrolyte topic says "loss of P waves
  / sinusoidal wave" (the AKI topic uses my wording).

## Renal — CKD and renal replacement therapy (v1448)

### Verified correct — the checks that could have gone wrong did not
- **CKD staging ladder is gapless, non-overlapping and internally consistent**
  across every card that states a number: >=90 / 60-89 / 45-59 / 30-44 / 15-29
  / <15, with every cross-reference (CKD 0, 14, 22, 28, 33, 34, 35; RRT 2, 17)
  agreeing. I looked specifically for the ophthalmology-style three-way numeric
  disagreement. THERE IS NONE.
- **CKD-MBD chain correct in direction**: low 1-alpha-hydroxylation + PHOSPHATE
  RETENTION (high) -> LOW calcium -> secondary hyperparathyroidism -> bone
  disease. Corroborated by [2] ("low calcium, high phosphate") and [20]
  (tertiary: PTH stays high WITH a high calcium). No reversal.
- **Iron before ESA stated explicitly as an ordered ladder** (CKD [16]):
  optimise iron first, oral -> IV, then ESA, and "do not aim to normalise the
  haemoglobin". Reinforced by [18] (iron deficiency commonest cause of ESA
  failure).
- CKD [35] and RRT [2] both correct a common misconception: dialysis is not
  started automatically at eGFR 15 — it may be ~5-7 if asymptomatic (NICE).
- AV fistula maturation (6-8 weeks), steal syndrome and the "lost its thrill
  and bruit -> same-day vascular access referral" action all present.
- PD peritonitis present with organism (coagulase-negative staph, Staph aureus)
  and the examinable point (INTRAPERITONEAL vancomycin + ceftazidime).

### Absent from topic, present in app
- "renal osteodystrophy" is absent from the CKD topic — [19] ends at "bone
  disease" and [21] names the lesions without the umbrella term. It IS in the
  app on 9 cards (renal.json histology, msk-rheumatology, biochemistry,
  endocrinology).
- Nomenclature: the topic says "Stage 1...Stage 5", not G1-G5. The G-form
  appears on only 6 cards app-wide, none of them a CKD staging card, though
  CKD [10] does say "G-stage + A-stage heat map".
- CKD [34] is the ONLY card in all 80 files mentioning the kidney failure risk
  equation.

### Duplication
- RRT [19] restates RRT [18]'s steal-syndrome parenthetical almost word for word.
- RRT [43] duplicates RRT [42]'s opt-out/deemed-consent sentence without adding
  a way to expand the donor pool.
- CKD [25] and [34] carry the same two ACR referral triggers near-verbatim.
- NOT a duplicate, despite appearing to be one: RRT [23]'s whole back is
  contained VERBATIM inside RRT [22]'s third list item. I checked the FRONTS
  before concluding: [22] asks for the list of intradialytic problems, [23]
  asks what dialysis disequilibrium syndrome IS and how it is avoided. Two
  different questions; [22] simply inlines the definition. Keep both.

## Renal — glomerulonephritis and inherited kidney disease (v1449). RENAL NOW COMPLETE 419/419.

### The critical checks all passed
- **Nephrotic/nephritic split: NO REVERSAL on any of the 7 contrast cards.**
  Haematuria, hypertension, oliguria, red cell casts -> NEPHRITIC. Heavy
  proteinuria, hypoalbuminaemia, marked oedema, fatty/oval fat bodies,
  hyperlipidaemia -> NEPHROTIC. Correct on every row of the two grid cards
  ([2] three rows, [3] five rows) and on the summary card [4].
- **Every named GN is filed on the correct side.** Minimal change, FSGS,
  membranous, diabetes -> nephrotic. IgA, post-strep, RPGN/crescentic,
  anti-GBM, HSP -> nephritic.
- **IgA vs post-strep timing correct, and I verified it deck-wide myself.**
  IgA = 1-2 days after URTI (the file calls the short interval "the
  discriminator" in words); post-strep = 1-2 weeks after throat, 3-6 weeks
  after skin. Consistent across renal.json fc and q and
  immunology-serology.json. The one place the reversal appears is
  renal.json q GN [22].options[0], where it is correctly a DISTRACTOR.
- ANCA subtypes correct (c-ANCA/PR3 = GPA; p-ANCA/MPO = microscopic
  polyangiitis). Anti-GBM -> Goodpasture's. Anti-PLA2R -> membranous.
  Low C3 -> post-strep; low C3 AND C4 with anti-dsDNA -> lupus nephritis.
- ADPKD: PKD-1 correctly the EARLIER/MORE SEVERE one (85%, chr 16) vs PKD-2
  milder/later (chr 4). Correct way round.
- Alport handled carefully: GN [13] calls it "a mimic rather than a true
  nephritis"; Inherited [15] says it sits in the haematuric group but usually
  presents as isolated microscopic haematuria. No swapped attribution.

### Minor inconsistency across topics in the same file
- Post-strep latency: GN [37] says "1-2 weeks (7-14 days)"; renal.json
  histology__RENAL__Glomerulus & Filtration Barrier [25] says "the 1-3 week
  latency of post-streptococcal". 1-2 vs 1-3 weeks. Both defensible; not
  identical.

### Absent / unlabelled
- Lupus nephritis is never labelled "nephritic" outright — it appears as a
  cause of a MIXED picture [5], as a complement pattern [17], and as an
  immune-complex cause of RPGN [46]. Filed correctly by implication only.
- Membranoproliferative GN is NOT assigned to either side. It appears on ONE
  card in the topic ([17]) purely as a low-C3 discriminator. The "can be
  either nephrotic or nephritic" framing is absent from the topic.
  "mesangiocapillary" has 0 hits anywhere in the deck.
- Thin basement membrane disease: absent from both topics.
- "diabetic nephropathy" as a phrase: 0 hits in the GN topic (the concept is
  there under "diabetes"); the phrase is used in three other topics.

### Duplication
- The GN "biopsy master table" run (20-25) restates each disease's biopsy
  near-verbatim in the disease block (27, 30, 32, 35, 38, 41). By design.
- GN [34] and [36] both state IgA's 1-2 day interval.
- Inherited [1]/[2]/[3] are summary cards duplicating their own blocks.
- paediatrics.json Nephrotic Syndrome (paediatric) overlaps GN [7], [8],
  [26]-[28] substantially. Cross-file.

## Urology — torsion, scrotal lumps, phimosis (v1450)

### FRONT/BACK MISMATCH — verified independently against raw JSON
  conditions__UROLOGY__Phimosis & Paraphimosis [16]
  FRONT: "How does paraphimosis present?"
  BACK:  "Analgesia (± a penile block), then reduce the glans oedema by firm
          sustained manual compression. Adjuncts include a wrapped cold pack..."
That is MANAGEMENT, not presentation, and it duplicates card [17] ("What are
the first steps in managing paraphimosis?"). The actual presentation (painful,
swollen, dusky glans) appears nowhere on this card. The topic therefore has no
card answering how paraphimosis presents. NOT fixed.

### Verified correct — the time-critical topic is sound
- **Torsion: no card softens the urgency and no reassuring sign is attached to
  torsion.** "Imaging must NEVER delay surgery" is stated FOUR separate times
  across two topics, and the file explicitly says a normal Doppler does NOT
  exclude torsion and that negative imaging never overrides clinical suspicion.
  Ultrasound is never presented as a routine step.
- Salvage ladder present with numbers: <6 h >90%, 12-24 h ~50%, >24 h <10%.
- **Prehn's sign is the RIGHT WAY ROUND, and I checked all 18 deck-wide hits
  across 4 files.** Relief on elevation = epididymo-orchitis (positive);
  negative in torsion. Every file adds the hedge that it is unreliable and must
  never be used to rule out torsion. The reversal appears only as a quiz
  DISTRACTOR (urology q Torsion [2].options[0] and [8].options[0]).
- Cremasteric reflex correctly attached AND correctly hedged ("a present
  cremasteric reflex does NOT exclude torsion").
- Bilateral orchidopexy present, including in the consent card.
- **Phimosis vs paraphimosis the right way round**, stated four times:
  paraphimosis = retracted foreskin trapped behind the glans = EMERGENCY, with
  the constricting band and ischaemia spelled out. Iatrogenic cause (foreskin
  not replaced after catheterisation) present, with a prevention rule.
- Transillumination correct throughout; varicocele left-sided predominance WITH
  the anatomical reason; non-decompressing or isolated right-sided varicocele
  correctly flagged for renal/retroperitoneal tumour imaging.

### Absent from topic, present in app
- **Torsion of the testicular appendage / "blue dot sign" is absent from all 77
  cards of these three topics** (0 anchored hits for blue dot, appendage,
  appendix testis, Morgagni). It exists in renal-urological.json ::
  signs__RENAL / UROLOGICAL__Acute Scrotal Pain [5]. So the Testicular Torsion
  topic itself never distinguishes appendage torsion from true torsion.

### Duplication
- Phimosis [6]/[7] give the same four causes, differing only in a "check HbA1c"
  tail, though one is framed "commonest pathological cause" and the other
  "other causes".
- Phimosis [16]/[17] (see mismatch above), [4]/[25], and the penile SCC clause
  appears verbatim on [12], [13] and [22].
- Scrotal Lumps states "new adult hydrocele needs USS" three times ([3], [11],
  [12]).
- Torsion [4]/[12] (cremasteric), [5]/[12] (Prehn's), [13]/[14] (imaging).

### Wording difference across topics (not a conflict)
- Scrotal Lumps says a new hydrocele in an ADULT needs USS; Testicular Cancer
  [27] says "in YOUNG MEN". Both defensible; not identical.

## Urology — renal stones and urinary retention (v1451)

### Verified correct
- **Uric acid is RADIOLUCENT everywhere in the deck.** I checked all 7 files
  that mention it (ct, plain-film-fluoroscopy, renal-urological, urine,
  urology fc and q). No card anywhere calls it opaque. Calcium oxalate
  correctly commonest and radio-opaque; struvite correctly staghorn/Proteus/
  urease.
- **Acute vs chronic retention: painful vs painless is the RIGHT WAY ROUND.**
  [1] "Acute (AUR): sudden onset; usually painful ... Chronic (CUR):
  long-standing; painless". [6] acute = suprapubic pain; [11] chronic opens
  "Painless". And [1] correctly adds that painless ACUTE retention points to a
  neurological cause — no contradiction with the rule.
- Cauda equina IS in the topic ([5] dedicated red-flag card: retention +
  saddle anaesthesia + back pain -> emergency MRI). No grep needed to rescue it.
- Post-obstructive diuresis complete: rate, danger, and the "replace about
  three-quarters of losses, as over-replacement perpetuates the diuresis" point.
- Infected obstructed kidney flagged as an emergency needing decompression on
  four cards.

### Gaps in the topic (each present elsewhere in the app)
- **"Antibiotics alone are not enough" for an obstructed infected kidney is
  ABSENT from the stones topic.** Card [19] lists IV antibiotics ALONGSIDE
  decompression but never says antibiotics alone will not clear pus under
  pressure. That sentence exists in renal-urological.json [5]/[11],
  nuclear-interventional.json [10] and urology q Pyelonephritis [11].
  Of the gaps in this batch this is the one with clinical consequence.
- Ultrasound-as-first-line-in-pregnancy is absent from the stones topic (the
  pregnancy mentions there are about treatment, not imaging). Present in
  urology Cancer Imaging [9], ct.json [16], renal-urological [2].
- **"Low-pressure chronic retention" is never named** — HPCR is contrasted only
  against acute retention, not against its low-pressure counterpart. Present in
  renal-urological.json Chronic Urinary Retention [0]/[1]/[5] and urology BPH [10].
- **No post-void residual threshold defining retention** in the retention topic.
  Present in urology BPH [8] (">150-200 mL significant, PVR >300 mL suggests
  chronic retention") and Bladder & Urodynamics [1].
- Cystine stones' radio-opacity ("faintly opaque") absent from the fc topic;
  present in the same topic's q bank [6] and plain-film-fluoroscopy [9]/[11].

### Minor internal inconsistency
- Medical expulsive therapy stone size: [28] says "<=10 mm", [16] says "under
  10 mm". Same intent, different boundary.
- Stones [1] and [15] are a true duplicate pair (both ask which stone is
  radiolucent, both answer uric acid); [15] is the fuller version.
- Stones [6] and [21] both give ureteroscopy indications with NON-OVERLAPPING
  content, so a reader meeting one does not get the other's indications.

### DECK-WIDE COSMETIC DECISION FOR THE OWNER (not a defect)
Where a source card numbers its steps "1. 2. 3.", converting it to a bullet
list renders as "• 1. Confirm retention...". Stripping the numerals would
delete content, so the only alternatives are keep-the-numerals or leave the
card as prose. BOTH conventions are already live in the shipped deck:
  53 cards across 11 specialties render "<li>N. ..."  (bullet + numeral)
  22 cards keep a 1./2. run as prose
I have followed the dominant convention rather than diverging in one topic.
If you want one convention deck-wide, it is a single pass to make.

## Urology — UTI and pyelonephritis (v1452)

### FRONT/BACK CONTRADICTION — verified against raw JSON
  conditions__UROLOGY__Urinary Tract Infection (UTI) [29]
  FRONT: "What NON-ANTIBIOTIC measures reduce UTI recurrence in women?"
  BACK ends: "... Cranberry products (modest evidence). PROPHYLACTIC
              TRIMETHOPRIM if >=3/year."
The last item is an antibiotic and directly contradicts the front's qualifier.
Everything before it is correct. NOT fixed.
- Related, milder: [31]'s front asks for the prophylactic ANTIBIOTIC regime and
  the back closes with "Alternative: self-start therapy", which is not
  prophylaxis.

### Verified correct — the pregnancy orientation, checked deck-wide myself
- **Trimethoprim -> FIRST TRIMESTER** (folate antagonist -> neural tube
  defects). **Nitrofurantoin -> AVOID AT TERM** (neonatal haemolysis).
  Confirmed across urology.json, clinical-pharmacology-prescribing.json and
  infectious-disease-immunology.json. The reversal appears ONLY as a quiz
  distractor (clinical-pharmacology q Drugs to Avoid in Pregnancy
  [10].options[0]). No card teaches it the wrong way round.
- Asymptomatic bacteriuria: correctly NOT treated in the non-pregnant, and
  correctly treated in pregnancy, with the two stated as an explicit contrast
  ([16] gives the two UK exceptions: pregnancy, and before an invasive
  urological procedure).
- Antibiotic durations are consistent wherever they appear: non-pregnant women
  3 days, men 7 days (14 if prostatitis), pregnancy 7 days, pyelonephritis
  cefalexin 7-10 days. No disagreement between the two topics.
- Obstructed infected kidney handled strongly here, unlike in the stones topic:
  Pyelo [13] "needs urgent decompression, NOT JUST ANTIBIOTICS" and [14] "pus
  under pressure in a system that does not drain — antibiotics cannot reach
  it ... alongside resuscitation and IV antibiotics, NOT AFTER THEM."
  (Compare the stones-topic gap logged under v1451 — the same concept is
  explicit here and missing there.)

### Gaps
- **The REASON nitrofurantoin is avoided at term (neonatal haemolysis/G6PD) is
  not given in either urology topic.** It is in clinical-pharmacology-
  prescribing.json. And "avoid at term" appears on only ONE urology card ([20],
  the asymptomatic-bacteriuria card) — [6] ("7 days regardless of trimester")
  and [18] do not restate it.
- "A positive dipstick alone does not diagnose UTI over 65 or if catheterised"
  is in the PYELONEPHRITIS topic ([7]) but absent from the UTI topic's
  flashcards, where dipstick interpretation is covered ([2], [32]).
- "Do not routinely send urine from a catheter" is absent from both topics and
  from the deck in flashcard form. Note Pyelo [7] arguably points the other way:
  if catheterised "you diagnose on symptoms and SEND A CULTURE".
- No time-to-antibiotic target in either topic. Sepsis Six is named (Pyelo [12])
  but never given the "within 1 hour" clock that acute-abdomen-surgical-
  principles.json, bedside-tests.json and biochemistry.json all carry. The only
  clock here is "review by 48 hours", which is a step-down timer.
- The words "urosepsis", "emergency" and "pyonephrosis" appear in neither
  topic, though the concepts are fully covered. Terminology gap, not a safety
  gap — the same file's Renal Stone Disease [19] does use "pyonephrosis".
- UTI [19] is the UTI topic's pyelonephritis-antibiotic card and does NOT carry
  the avoid-trimethoprim-in-pregnancy caveat; only Pyelo [9] does.

### Cosmetic
- "7-10 days" is written with an en dash on UTI [19]/[39] and Pyelo [10], and
  with a hyphen on Pyelo [9]. Preserved byte-for-byte; noting so it is not
  mistaken for later corruption.
- UTI [3] and [18] are near-identical first-line cards differing only in
  "risk of resistance"/"local resistance" plus [18]'s extra duration and eGFR
  material.

## Urology — BPH, prostate cancer, incontinence (v1453)

### TERMINOLOGY ERROR — one word, two cards, and the deck disagrees with itself
Verified against raw JSON, and the deck-wide count checked myself.
  urology.json :: BPH [5]            "...with a maintained CENTRAL sulcus."
  urology.json :: Prostate Cancer [3] "...with loss of CENTRAL sulcus"
The prostatic landmark is the MEDIAN sulcus. Seventeen occurrences across three
other files all say "median sulcus" (bedside-tests.json Focused Examination
[0]/[1] + q; pelvis-perineum.json Applied/Clinical Anatomy [13]/[28] + q;
renal-urological.json Abnormal Prostate on DRE [0]/[1]/[2] + q). These two
urology cards are the ONLY prostate cards in the app using "central".
"Central sulcus" elsewhere in the deck is the BRAIN landmark (neuroanatomy.json
Cerebral Cortex [0], "the central sulcus (of Rolando)").
A one-word fix on two cards. NOT fixed here.

### Verified correct — the two classic reversals are NOT present
- **DRE findings the right way round**: benign = smooth, symmetrical, rubbery,
  sulcus maintained; malignant = hard, craggy, irregular, asymmetrical, sulcus
  lost.
- **Zones correct on all three cards that state one**: BPH = TRANSITION zone
  (BPH [21] even says "not peripheral zone"); cancer = PERIPHERAL zone (~70-75%,
  Prostate Cancer [23]/[24]). Agrees with pelvis-perineum.json.
- **Incontinence first-line management NOT swapped**: stress -> supervised
  pelvic floor muscle training >=3 months ([14] step 2, [15]); urge/OAB ->
  supervised bladder retraining >=6 weeks ([18] step 2, [19]). Right way round
  on all four cards.
- 5-ARI halves PSA and the "double the measured value" rule is present ([14]),
  as is "failure to suppress PSA raises concern for cancer".
- Alpha-blocker vs 5-ARI fully separated: days vs months onset, relaxes smooth
  muscle vs shrinks the gland, and their distinct side effects. Nothing crossed.
- TUR syndrome mechanism present (absorption of hypotonic glycine irrigant ->
  dilutional hyponatraemia).

### Backs that do not answer their front
- BPH [33] front: "What PSA LEVEL is associated with BPH vs prostate cancer
  concern?" The back gives NO PSA level — "There is no single normal PSA — UK
  referral uses age-specific thresholds...". Clinically the better answer, but
  it does not answer the question as asked, and the front implies a number.
- Prostate Cancer [22] front asks for EMERGENCY MANAGEMENT; the last item is
  prognosis ("worst prognosis if already paraplegic at presentation").
- BPH [6] front asks what the IPSS MEASURES; the back answers the severity
  bands and addresses "what it measures" only obliquely.

### Gaps (each checked deck-wide)
- **Cycling is missing from the falsely-raised-PSA list** (Prostate Cancer [2]
  has BPH, prostatitis, UTI, ejaculation, exercise, DRE, catheter). Cycling is
  in biochemistry.json Tumour Markers [10].
- **No PSA timing rule in the Prostate Cancer topic** — the causes are listed
  with no "check PSA before DRE / defer ~1 week" instruction. BPH [4] has the
  retention-specific version; bedside-tests.json [4] and biochemistry.json [11]
  have the general one.
- **The FALLS limb of the anticholinergic caveat is absent** from the
  Incontinence topic (0 anchored hits for "falls"). The harms named are
  cognitive decline, dementia, dry mouth, constipation, blurred vision,
  retention. Falls + anticholinergics is in geriatric-medicine.json Falls
  Assessment [9] and Polypharmacy [12]/[14] (ACB score; oxybutynin scores 3).
- Mirabegron is never stated as preferred in the frail elderly — it sits at
  step 4 AFTER antimuscarinics ([18]) and is described only as "an alternative
  with less anticholinergic burden" ([21]). Nearest app statement is
  renal-urological.json [2], where it is a co-equal alternative in a sentence
  that mentions frailty. Reported as "implied, never stated".
- No standalone "what is ADT and how does it work" card; the mechanism is
  reachable only via the osteoporosis card [16] and the drug list [21].
- The storage-vs-voiding symptom split appears on ONE card in all three topics
  (BPH [0]). Prostate Cancer has no storage/voiding card at all.

### Duplication — Incontinence is the worst-affected topic seen so far
- Cards [18]-[22] are a five-step ladder PLUS four standalone cards restating
  its individual steps. Same shape for stress: [14] vs [15], [16], [17].
  Eight near-duplicate pairs in a 27-card topic.
- BPH [4]/[25], [8]/[10], [1]/[13]/[34] (tamsulosin mechanism three times).
- Prostate Cancer [6]/[17] (sclerotic mets twice), [8]/[22] (MSCC twice),
  [5]/[9]/[10] (Gleason three ways), [23]/[24] (zones twice).

### Naming wrinkle
- This topic says "TUR syndrome"; endocrinology.json and risk-scores-criteria
  say "TURP syndrome". Not an error, but it breaks search.

## Urology — bladder, renal cell and testicular cancer (v1454). UROLOGY NOW COMPLETE 380/380.

### CARD CONTENTS SWAPPED — verified against raw JSON
  conditions__UROLOGY__Testicular Cancer [20] and [21] answer each other's fronts.
  [20] FRONT: "What are the risk FACTORS (plural) for testicular cancer?"
       BACK:  cryptorchidism ONLY (3-5x risk, persists after orchidopexy).
  [21] FRONT: "What is the importance of CRYPTORCHIDISM in relation to
               testicular cancer?"
       BACK:  the four-item risk-factor list (cryptorchidism; Klinefelter;
               previous testicular tumour; family history).
Swapping the two backs would fix both cards. NOT fixed.

### Other backs that do not answer their front
- Testicular [29] front asks 5-year survival for "stage I VS stage III"; the
  back gives one undifferentiated figure (">95%") with no stage split.
- Testicular [34] front asks for "key FACTS (plural) ... for finals"; the back
  gives ONE fact, the same survival statistic as [29].
- RCC [18] front asks what surveillance is "RECOMMENDED" after nephrectomy; the
  back gives only the principle, no intervals or duration — unlike the
  comparable Bladder [19], which gives full NICE intervals.

### Verified correct — the markers, which were the highest-risk check
- **AFP is correctly attached to NON-seminoma and explicitly DENIED in pure
  seminoma**, on four cards, and I confirmed it deck-wide myself: urology,
  biochemistry.json Tumour Markers [8]/[16]/[17] + q, reproductive.json Testis
  [26] + q all agree ("pure seminoma NEVER raises AFP"). No card anywhere puts
  AFP on a seminoma.
- Beta-hCG correctly raised in BOTH, with the quantitative split (about 60% of
  NSGCT, 10-20% of seminomas).
- Zero germ-cell markers leak onto the bladder or renal topics (0 hits for AFP,
  hCG, LDH in either).
- Seminoma vs NSGCT age split correct (seminoma 25-35, NSGCT 15-30).
- Never-biopsy-trans-scrotally stated on five cards with the lymphatic-seeding
  rationale; radical INGUINAL orchidectomy correct.
- 2-week-wait haematuria thresholds identical on three bladder cards AND in
  urine.json Dipstick & Microscopy [20]. No conflict.
- RCC paraneoplastic set complete and correct, including the good point that
  PTHrP hypercalcaemia is "not from bone metastases per se".
- RCC varicocele card is better than my brief: it gives BOTH sides (left
  testicular vein into the left renal vein; right straight into the IVC, so a
  right varicocele is unusual and more suspicious).

### Gaps
- **LDH is listed but never explained.** It appears only in the two panel cards
  ([16], [33]) as a marker to send; no card in the topic says it reflects
  tumour bulk/burden. A characterisation gap.
- **"Most RCCs are incidental findings on imaging" is absent from the APP**, not
  just this topic. The rare/late half of the triad caveat is present ("only 10%
  have all 3"), but the positive statement that most present incidentally is
  nowhere. Card [21] is about managing a renal incidentaloma, which is a
  different claim.
- "Aniline" has 0 hits app-wide; the file says "aromatic amines (dye industry,
  rubber industry)", which is correct and arguably better. My brief's wording
  was the loose one. (15th time.)
- The "commonest in the UK" framing for urothelial carcinoma does not exist —
  the file gives "(90%)" with no country. 0 hits for a TCC card also naming the UK.

### Duplication
- Testicular [29]/[34] carry the SAME survival sentence; [5]/[20]/[21] overlap
  three ways on cryptorchidism (compounded by the swap above); [3]/[4]/[15]
  give the trans-scrotal rationale three times; [7]/[19]/[26] cover BEP twice
  and its toxicity a third time.
- Bladder [8] is a strict subset of [16] (both: which organism causes bladder
  SCC). Bladder [4]/[15] state the 2WW criteria twice.
- RCC [23]/[24] state the zones twice; [15]/[16] the ADT osteoporosis twice.

## Acute abdomen — post-op complications and nutrition (v1455)

### Verified correct — both high-risk checks passed
- **Refeeding syndrome: phosphate FALLS, and I checked this deck-wide myself.**
  112 anchored hits for "refeeding" across 8+ files; every field that pairs it
  with phosphate says fall/hypophosphataemia/shift INTO cells. ZERO cards
  anywhere state a rise. Cardinal-low-phosphate stated on both cards 19 and 20,
  with low K+ and low Mg2+ alongside.
  At-risk criteria complete in both NICE tiers (ONE-alone card 21: BMI <16,
  loss >15% in 3-6 months, >10 days no intake, low electrolytes; TWO-needed
  card 22). Thiamine 200-300 mg/day BEFORE and during the first 10 days
  present, with the correct instruction NOT to pre-correct electrolytes before
  feeding. Rate present: max 10 kcal/kg/day (5 if BMI <14), full over 4-7 days.
- **Post-operative pyrexia timeline: every cause on the right day.** Wind
  (atelectasis/pneumonia) day 0-2, Water (UTI) day 3-5, Walking (DVT/PE) day
  4-6, Wound (SSI/anastomotic leak) day 5-7, Wonder drugs/line any time. The
  dedicated deep-dive cards agree with the timeline cards on every date.
- Anastomotic leak: day 5-7 (range 2-14), and the EARLY trap is stated well —
  "a patient who looks well but has unexplained persistent tachycardia,
  new-onset AF, oliguria, prolonged ileus or simple failure to progress". Card
  15 adds "after bowel surgery, new AF is an anastomotic leak until proven
  otherwise". Urgent senior review and CT both explicit; observation is offered
  nowhere in the deck (38 anchored hits checked).
- NG tube confirmation rule complete and correct: pH 1-5.5 on CE-marked paper,
  X-ray second line reported by a competent assessor, auscultation/litmus/
  appearance explicitly forbidden, and the Never Event named. Concordant across
  18 fields in 5 other files.

### Internal tension (the deck is self-aware about it)
- Card 2 lists ATELECTASIS as a cause of the day 0-2 "Wind" PYREXIA; card 10
  states "It does not itself cause fever — the classic teaching is not
  supported by the evidence, so if the patient is febrile look for another
  cause." Card 10's front explicitly asks "does it cause fever?", so this reads
  as a deliberate setup rather than a contradiction — but a learner meeting
  card 2 alone takes the classic teaching at face value, and the resolution is
  eight cards away.

### Taxonomy
- Post-op [15] files STROKE under "cardiac complications" in both front and
  back. It is cerebrovascular. Front and back agree with each other, so it is a
  labelling quibble, not a front/back mismatch.

### Duplication
- The four timeline cards ([2]-[5]) versus their own deep-dive cards
  ([10]/[11], [24], [13]/[14], [17]/[20]). Deliberate scaffolding, but [3] and
  [24] are near word-for-word on cause, day and action.
- Post-op [30]/[31]: [31] repeats [30]'s whole PINCH-ME payload inside a
  parenthesis. Strongest near-duplicate in the topic.
- Nutrition [19]/[20] both state phosphate is cardinal; the 4-week NG-vs-PEG
  rule is stated three times ([10], [12], [14]); [4]/[5] overlap numerically on
  BMI <18.5 / >10% / 3-6 months with different framing.

## Acute abdomen — pre-operative management and assessment (v1456)

### THE SPLIT IS COHERENT — this pair BREAKS the pattern
For the first time in this whole sweep, two adjacent near-synonymous topics do
NOT duplicate each other. Measured, not asserted: the longest verbatim shared
text block across all 36x28 front/back combinations is ZERO characters at a
60-char threshold. Not one duplicated sentence, clause or phrase.
  ASSESSMENT = risk stratification (ASA, frailty, functional capacity) +
               history/examination + investigations
  MANAGEMENT = optimisation + drug handling + VTE + prep + WHO checklist
Warfarin, DOACs, antiplatelets, insulin, VRIII, metformin, COCP/HRT, steroids,
ACEi, VTE, consent, fasting and the WHO checklist appear ONLY in Management.
ASA, group-and-save/crossmatch, CPET, Mallampati and frailty appear ONLY in
Assessment. Zero contradictions on any drug, interval or threshold.

### BACKS THAT DO NOT ANSWER THEIR FRONT — and the gap behind them
Verified against raw JSON:
  Assessment [20] FRONT: "What are ASA grades I and II AND THEIR MORTALITY?"
                  BACK:  grades only. No mortality.
  Assessment [21] FRONT: "What are ASA grades III and IV AND THEIR MORTALITY?"
                  BACK:  grades only. No mortality.
**ASA-grade mortality figures are absent from the whole app** — the only
deck-wide hits are those two fronts plus two quiz explanations saying ASA
"correlates directly with operative mortality" with no figures. So the fix is
not a re-file; the numbers do not exist anywhere. Note [23] also says ASA "is
not itself a risk-prediction score", which sits awkwardly with two fronts
promising mortality.
- [13] front asks why FBC and U&Es are done; the back's last sentence is about
  morphine dosing in renal impairment, which belongs to [25] and is duplicated
  there near-verbatim.
- [15] front asks WHY a clotting screen is done; the back answers WHEN IT IS NOT.

### Verified correct — the two dangerous checks
- **FASTING 2-4-6 IS THE RIGHT WAY ROUND**: clear fluids 2 h, breast milk 4 h,
  formula/cow's milk/solids 6 h. Only one card states them, so nothing can
  contradict it, and the quiz card corroborates. The card also correctly adds
  that these are minimums not targets and that many UK units allow clear fluids
  until an hour before ("sip til send").
- **STEROIDS ARE CONTINUED, NOT STOPPED**, with IV hydrocortisone at induction
  continued until eating and drinking, and the adrenal-crisis rationale stated.
  The highest-risk drug item in the topic and the deck gets it right.
- Every other drug instruction checked and correct, including the ones most
  often got wrong: aspirin CONTINUED through surgery while clopidogrel stops at
  7 days; never stop insulin in type 1; the post-BRIDGE restrictive bridging
  position for warfarin; metformin's current contrast guidance (not the old
  blanket 48-hour stop); the POP and transdermal-HRT exemptions; and the VRIII
  conversion overlap of 30-60 minutes, which is the detail most often missed.

### Gaps absent from the APP (not re-filings)
- **ASA-grade mortality figures** (above).
- **A METs threshold.** Functional capacity is covered only via CPET/VO2 max/
  anaerobic threshold with NO numeric cutoff. Deck-wide: "METs" appears exactly
  once, with no number; `\d+\s*MET` returns 0 hits; "metabolic equivalent"
  returns 0; there is no "4 METs" and no numeric anaerobic-threshold cutoff.
- **Perioperative lithium handling.** Lithium appears 274 times deck-wide but
  never in a perioperative context.

### Thin rather than wrong
- [17] lumps MAOIs with SSRIs ("usually continue; avoid serotonergic drugs").
  Nothing stated is wrong, but the MAOI-specific hazards (indirect
  sympathomimetics such as ephedrine; pethidine as an absolute rather than
  shared contraindication) are not distinguished.
- "Sick day rules" as a phrase has 0 hits in this file; the surgical stress-dose
  logic is present and correct, and the phrase lives in
  clinical-pharmacology-prescribing.json "Steroid Equivalents & Sick Day Rules".

### Duplication — all internal to Assessment; Management has none
- [18]/[19]: 148 shared characters, [19] almost wholly contained in [18]. The
  closest thing to a redundant card in either topic.
- [13]/[25]: 83 shared characters (the morphine sentence, see above).
- [12]/[17]: 115 shared characters — the same ECG rule with clauses reordered.
  IDENTICAL thresholds, so not a disagreement.
- [2]/[24]: paraphrase pair on functional capacity.

## Acute abdomen — remaining 7 topics (v1457). ACUTE ABDOMEN NOW COMPLETE 380/380.

### CONTRADICTION WITHIN ONE TOPIC — two cards, both say "first-line"
Verified against raw JSON.
  Analgesia [25]: "Treated with: AMITRIPTYLINE (FIRST-LINE), duloxetine,
                   gabapentin/pregabalin, topical capsaicin, SNRIs."
  Analgesia [34]: "Gabapentinoids — bind alpha-2-delta subunit ...
                   FIRST-LINE FOR NEUROPATHIC PAIN (diabetic neuropathy,
                   post-herpetic neuralgia)."
Two different drug classes each labelled first-line for neuropathic pain, nine
cards apart in the same topic. The topic's OWN quiz bank sides with [25]:
"NICE recommends amitriptyline (or duloxetine) as first-line ... pregabalin/
gabapentin are ALTERNATIVES if TCAs not tolerated." So [34] is the outlier.

### CROSS-FILE DIVERGENCE — two different transfusion targets for a variceal bleed
  acute-abdomen GI bleed [5]: "Restrictive transfusion (Hb <70 g/L, TARGET
    70-90) ... take particular care not to over-transfuse a variceal bleed, as
    this raises portal pressure."
  liver.json Liver Cirrhosis [24] AND [49]: "Target Hb 70-80 g/L" / "restrictive
    transfusion to Hb 70-80 g/L (avoid over-transfusion)".
70-90 is the deck-wide consensus for GI bleeding generally (haematology,
upper-gi, gastrointestinal, acute-abdomen post-op all agree). The liver file
gives the tighter VARICEAL-SPECIFIC target. Both positions are defensible; the
problem is that the acute-abdomen card applies 70-90 to a variceal bleed while
acknowledging the portal-pressure concern, so a student meeting both gets two
numbers for the same scenario.

### CROSS-FILE DIVERGENCE — sepsis timing, and what is being timed
  acute-abdomen Shock [26]/[27] AND infectious-disease-immunology Sepsis [15]:
    ANTIBIOTIC urgency stratified by NEWS2 (NICE) — within 1 h if NEWS2 >=7,
    3 h if 5-6, 6 h if 1-4.
  bedside-tests.json Vital Signs q[21]: "NEWS2 >=5 with suspected infection
    should trigger THE SEPSIS SIX within one hour".
Two files time ANTIBIOTICS by band; one times the WHOLE BUNDLE at 1 hour for
NEWS2 >=5. Both defensible, but a student with NEWS2 5-6 reads "3 hours" in one
file and "1 hour" in another. Worth aligning the wording.

### Backs that do not answer their front
- Analgesia [28] FRONT: "What is the ABCDE mnemonic for acute pain management?"
  BACK: "NOT A STANDARD MNEMONIC FOR PAIN — rather: assess severity..."
  The back refutes the front's premise. The front asserts a mnemonic exists
  that the back says does not.
- Acute Abdomen [15] front ends "(hepatobiliary table)" — a pointer to a table
  that does not exist in the flashcard set. An authoring artefact.

### The strongest unqualified claim in the set
- Appendicitis [15]: "a negative test EXCLUDES ectopic pregnancy", stated
  without qualification. The same topic hedges correctly elsewhere ([10]:
  "ovarian torsion ... a negative pregnancy test does not exclude it").

### Verified correct — every reversal check passed
- **Shock profiles all the right way round**: cardiogenic COLD with raised JVP;
  distributive WARM with low SVR (and [11] states outright "only distributive
  shock has warm peripheries"); neurogenic BRADYCARDIA, stated emphatically as
  "not tachycardia — unlike all other shocks". Obstructive JVP raised.
- Haemorrhage class I-IV numerically contiguous, monotonic, and consistent with
  the blood-volume card (70 mL/kg): 750/1500/2000 mL = 15/30/40% of 5 L exactly.
- "Hypotension is a late sign" present, with ~1.5 L already lost by class III.
- **Indirect hernia LATERAL / direct MEDIAL to the inferior epigastric vessels**,
  correct on every card and consistent with abdomen.json. Femoral inferolateral
  to the pubic tubercle, inguinal superomedial, with the femoral strangulation
  risk and urgent repair.
- Rovsing's (LIF palpation -> RIF pain) and psoas (RIF pain on hip EXTENSION ->
  retrocaecal) both correct, not swapped.
- Blatchford = PRE-endoscopy with the score-0 discharge rule; Rockall =
  POST-endoscopy for rebleeding and mortality. Not swapped. Agrees with
  risk-scores-criteria.json and gastrointestinal.json.
- "PPI AFTER endoscopy, not before" present twice and agrees across four files.
- Richter's hernia trap present twice (can strangulate WITHOUT obstructing).
- Medical mimics of an acute abdomen all present (MI, DKA, pneumonia,
  Addisonian crisis) PLUS the rule to treat the medical cause first and the
  re-entry trap that pain persisting after DKA correction needs re-imaging.

### Gaps: absent from the topic, present in the app
- Sengstaken-Blakemore / balloon tamponade absent from the GI bleed topic (the
  topic jumps from failed endoscopy straight to TIPS); present in
  gastrointestinal.json, scoping-endoscopy.json and liver.json.
- Paracetamol's 4 g/day maximum and the <50 kg reduction are absent from the
  Analgesia FLASHCARDS but present in that topic's own QUIZ bank and in
  clinical-pharmacology-prescribing.json. Same for codeine's CYP2D6 variability
  and the under-12 contraindication.
- Gastroprotection/PPI co-prescription absent from the Analgesia flashcards
  (present in its quiz and five other files). "Elderly" absent as an NSAID
  caution from the whole topic.
- McBurney's point is NAMED in the appendicitis topic but never LOCATED; the
  location is correct in abdomen.json and gastrointestinal.json.
- Alvarado score and the obturator sign absent from all three acute topics;
  both present with components in risk-scores-criteria.json and
  gastrointestinal.json.
- "~70% of perforations show free air" absent from Acute Abdomen; present in
  gastrointestinal.json.
- "IV adrenaline is specialist use only" absent from the Shock topic; present
  in general-systemic.json, cardiovascular.json and paediatrics.json.
- Rebound tenderness is deliberately NOT taught as a named sign — it appears
  once in 86 cards, only as the manoeuvre to avoid in favour of percussion and
  cough tenderness. A defensible modern position, but it is not retrievable as
  a named sign from these topics.

### Absent from the app
- "Avoid Hartmann's in hyperkalaemia": 0 hits deck-wide for Hartmann's/Ringer
  within 200 characters of hyperkalaemia.
- The "BP is a late sign ESPECIALLY IN THE YOUNG" framing: the principle is
  present, the young-patient qualifier is nowhere.

### Tooling note
The shock/fluids agent's number-stream assertion caught a real defect before
writing: a chip boundary landed on the decimal point of "0.9%", producing
<span class="fc-inline">(0</span>.9% saline. No character changed, so both the
token check AND the character diff passed it — only the number-stream check
failed. It also added a balanced-parenthesis check per span after the same bug
with no digit produced "(e</span>.g. heart failure)", and an "<li> must not
open on a separator" rule that caught 16 cases of a separator carried into the
next list item. All three are invisible to every text-level check.

## Geriatrics — NOF fracture and BPPV (v1464)

83 fields formatted across two topics: Neck of Femur (NOF) Fracture
Peri-operative Care (44) and Benign Paroxysmal Positional Vertigo (39).
Markup only; verified field by field against HEAD, problems: 0.

### Verified correct (checked from raw source, not from the agent's report)
- Fracture pattern to operation matching, all four cases:
  undisplaced intracapsular → internal fixation (or hemiarthroplasty if unfit);
  displaced intracapsular → replace the joint, THR or hemiarthroplasty, with
  the disrupted retrograde blood supply given as the reason; stable
  inter-trochanteric (extracapsular) → dynamic hip screw; sub-trochanteric or
  reverse-oblique (extracapsular) → intramedullary nail. No mismatch.
- Dix-Hallpike is the diagnostic manoeuvre and Epley the treatment, checked
  across bedside-tests.json, ent-audiovestibular.json and ent.json. No
  reversal anywhere, including in quiz distractors.

### Gaps: absent from the topic, present in the app
- The NOF topic explains that displaced intracapsular fractures disrupt the
  retrograde blood supply but never NAMES the medial femoral circumflex artery
  or the retinacular vessels. Both are named elsewhere in the app, so a student
  revising this topic alone gets the principle without the vessel.

### Presentational splits — deliberate, NOT to be "corrected"
- Garden classification numerals are Roman (I-IV) in geriatric-medicine.json
  and msk.json but Arabic (1-4) in orthopaedics.json. Both conventions are in
  real use; harmonising would be a style change, not a fix.
- "Meniere's" vs "Menière's" and "vestibular neuronitis" vs "vestibular
  neuritis" are both split across files. Both members of each pair are correct.

### Correction to my own brief (brief error #18)
I told the NOF agent that strong opioids are problematic in hip fracture. The
file is right and I was wrong: it deliberately states that opioids are OFFERED,
not withheld, which is the NICE-aligned position — under-treated pain is itself
a driver of delirium in this group. The agent did not act on my error. This is
the eighteenth time a brief of mine has been wrong where the file was correct,
which is the argument for the guards re-deriving every field from disk rather
than trusting either the brief or the agent.

## Geriatrics — thermoregulation, pressure sores, polypharmacy, malnutrition, CGA (v1465)

244 fields across five topics. Markup only; verified field by field against
HEAD, problems: 0. Backs covered 125/125; the six uncovered fronts are the
documented deliberate bare openers, not misses.

### Verified correct by me, deck-wide, not taken on the agents' word
- **STOPP stops, START starts.** 48 hits across geriatric-medicine.json,
  geriatric-assessment.json and neurological.json. No reversal in any field,
  distractors included. This is the reversal that would matter most in this
  topic and it is not there.
- **Waterlow and Braden run in OPPOSITE directions, and the app says so.**
  Waterlow higher = higher risk (>=10 at risk, >=15 high, >=20 very high);
  Braden LOWER = higher risk (<=9 very high ... 19-23 low). risk-scores-criteria.json
  states the opposition explicitly on both cards. Correct throughout.
- **NMS vs serotonin syndrome vs malignant hyperthermia.** Scanned 213,832
  non-distractor fields for a cross-attributed feature (clonus or hyperreflexia
  pinned to NMS; lead-pipe rigidity or bradyreflexia pinned to serotonin
  syndrome). 22 co-occurrences, every one of them the contrast stated
  CORRECTLY in a single sentence. No reversal anywhere. Cyproheptadine maps to
  serotonin syndrome and dantrolene to NMS across 45 hits; the one
  "NMS -> cyproheptadine" string is a quiz distractor whose sibling option is
  the correct pairing.
- **Haloperidol is avoided/contraindicated in Parkinson's disease and Lewy
  body dementia** across six files. geriatric-medicine.json states it as a hard
  MHRA contraindication where others say "avoid" — a strength-of-wording
  difference, not a contradiction.
- **Hypothermia bands** (mild 32-35, moderate 28-32 with shivering STOPPING,
  severe <28) — contiguous, monotonic, consistent with the <35 definition.
- **MUST scoring** and the **refeeding direction** (insulin surge -> cellular
  uptake -> phosphate FALLS; hallmark hypophosphataemia) — both correct, and
  identical to acute-abdomen-surgical-principles.json on every threshold.

### Absent from the app (checked deck-wide including quiz options)
- **The drug classes that most commonly cause admissions in older people**
  (NSAIDs, anticoagulants, diuretics, antiplatelets, hypoglycaemics). The app
  says ADRs are a major cause of admission but never names the list. The
  nearest analogues (general-systemic.json Falls[6], neurological.json Falls in
  the Elderly[4]) are falls-drug lists and name neither NSAIDs nor
  anticoagulants. A genuine app-level gap.
- **The blunted shivering response of older people** as an age-specific
  feature. Every shivering statement in the app is the temperature effect
  (shivering stops below ~32degC), which is a different claim.
- **"Rewarming too fast is dangerous"** as stated: 0 hits app-wide. What the
  app teaches is the danger of rewarming the PERIPHERY first (afterdrop),
  which is a different mechanism. "Rewarming shock" appears once, in
  general-systemic.json, and not in the geriatrics topic.
- **Blanching erythema is NOT a pressure ulcer** — the explicit negative. The
  app glosses category 1 as "redness that doesn't blanch" but never states the
  contrast as a discriminator. (dermatology.json has blanching vs non-blanching
  only in a rash context.)

### Absent from the topic, present in the app
- **The numeric rewarming rate.** ~0.5-2degC/hour exists in the QUIZ bank of
  this very topic but on no flashcard in it — a card/quiz mismatch inside one
  topic, which is the sharper form of this gap.
- **Discharge planning** appears on no flashcard anywhere in
  geriatric-medicine.json (only as quiz distractors). It is present in
  geriatric-assessment.json and acute-abdomen-surgical-principles.json.
- **FRIDs** as a term, and the anticholinergic syndrome picture with the full
  ACB-3 drug roster, live only in geriatric-assessment.json.

### Back does not answer its front — one real case
Hyperthermia/Hypothermia card 19. The front asks what prevents HEAT illness in
heatwaves; the back answers that, then appends a sentence about winter,
Cold-Health Alerts and hypothermia as a social diagnosis. Good content on the
wrong card, and there is no hypothermia-prevention card for it to move to. Left
in place as an fc-sub continuation; an authoring decision, not a markup one.

### Two files, same criterion, different example — not contradictions
- START bone protection is triggered by a fragility fracture in
  geriatric-medicine.json and by long-term oral corticosteroids in
  geriatric-assessment.json. Both are real START indications; a student meeting
  only one learns only one trigger.
- The STOPP NSAID criterion carries eGFR <50 in geriatric-assessment.json and
  no number in geriatric-medicine.json. Broader, not conflicting.
- NMS hyporeflexia is called "bradyreflexia" in geriatric-medicine.json and
  "hyporeflexia" in neurology and psychiatry. Same thing, two words.
- CANH: the surgical file's "CANH is a medical treatment, NOT basic care" could
  be misread as denying that ORAL feeding is basic care. The geriatrics card
  says both halves explicitly. Read together they agree; read alone the
  surgical phrasing is the weaker one.

### Tooling defect found and fixed
`ingest.py` resolved its target file from an `FC_FILE` environment variable.
That variable is sticky: it survives from the previous batch, so this run aimed
at cardiovascular.json while holding geriatrics content. It raised a KeyError
only because the key happened not to exist in the stale target — luck, not a
guard, and the same mistake between two files that shared a key would have
written to the wrong one. The target is now resolved from the topic key itself
and asserted unique across the deck; FC_FILE is a cross-check that prints a
note when it disagrees. This is the second time a default in this script has
pointed the wrong way (the first was `--coverage` defaulting to apply).

## Geriatrics — delirium, falls, frailty (v1468). GERIATRICS NOW COMPLETE 302/302.

135 fields. Markup only, problems: 0.

### Verified correct by me from raw source
- The delirium-versus-dementia table, attribute by attribute: acute vs
  insidious onset, fluctuating vs slowly progressive course, impaired vs normal
  consciousness, markedly impaired vs relatively preserved attention, usually
  reversible vs irreversible. Every attribute on the correct side.
- Hypoactive delirium named as the commonest and most dangerous BECAUSE it is
  missed. This is the one most often taught backwards and it is right here.
- Postural hypotension: fall of >=20 mmHg systolic and/or >=10 mmHg diastolic
  within 3 minutes of standing, measured after >=5 minutes lying then at 1 and
  3 minutes. Correct.
- 4AT bands (>=4 possible delirium, 1-3 possible cognitive impairment, 0 makes
  delirium unlikely) and the Clinical Frailty Scale (9-point, 1 very fit to 9
  terminally ill, >=5 triggers the pathway, scored on BASELINE function):
  unanimous across both geriatrics files, no reversal.
- Gait speed ">5 s to walk 4 m" and the sibling file's "<0.8 m/s" are the SAME
  threshold expressed two ways, not a disagreement.

### The formatting decision that mattered most in this batch
The CFS card's safeguard — "always alongside clinical judgement and the
patient's wishes, never as a sole determinant", and that the CFS is NOT an
eligibility criterion for stroke thrombolysis or thrombectomy — stays in the
card body at full weight. Greying that into fc-caveat would have made a
formatting choice with a clinical effect: a frailty score used alone to
withhold treatment is the exact harm the sentence exists to prevent. Across the
whole geriatrics specialty, fc-caveat was used on 5 cards out of 302, and never
once on anything touching capacity, safeguarding, dignity, or a patient's own
risk. In the ethics, capacity and safeguarding topics it was used zero times in
127 fields.

### Absent from the topic, present in the app
- **"Avoid benzodiazepines in delirium"** as a flat statement appears on no card
  in the Delirium topic. The restriction is there but distributed: benzodiazepines
  are first-line for alcohol/benzodiazepine-withdrawal delirium, and the
  alternative in Parkinson's/Lewy body dementia, with a note that they can
  themselves deepen delirium. The flat statement exists in
  acute-abdomen-surgical-principles.json. Worth a card; an authoring decision.
- **"Anticholinergic burden"** as a named term is absent from all three topics,
  though anticholinergics are named among the falls-risk-increasing drugs. The
  term with its ACB-3 threshold is in the same file's Polypharmacy topic.
- **Frailty is distinct from multimorbidity and from age** is stated flatly only
  in this topic's QUIZ layer, not on any flashcard — a card/quiz mismatch inside
  one topic, the same shape as the hypothermia rewarming-rate gap in v1465.

### Genuine redundancies (reported, not fixed)
- Falls 21's entire answer ("a shortened, externally rotated leg") is already
  contained in Falls 19.
- Falls 15 and 19 both carry the anticoagulant CT-head rule; 15 is the fuller
  version.

### Tooling note
This agent replaced the fragile index-based check that a dropped separator sits
at a list join with a builder-level one: the emitter records what it wrote
immediately before each drop, so a drop is proven to be at a join rather than
merely proven to be a comma. It also asserted its span list tiles the source
exactly, so nothing can be dropped, duplicated or reordered. Both are stronger
than what the shared brief asks for and should migrate into it.

## Clinical pharmacology — 8 of 10 topics (v1469, v1470)

443 fields. Markup only except one content fix, recorded below.

### CONTENT FIX: an eGFR claim that was backwards for obese patients
The renal dosing card said eGFR "overstates true clearance and leads to
overdosing" in "small, elderly or very obese patients", and tied the claim to
body-surface-area normalisation. That mechanism gives the right answer for two
of those three groups and the wrong one for the third. eGFR is reported per
1.73 m2, so absolute clearance is eGFR x BSA/1.73. Where BSA is BELOW 1.73
(small, elderly) the reported figure exceeds true clearance: eGFR overstates,
and dosing on it overdoses. Where BSA is ABOVE 1.73 (very obese) the reported
figure understates clearance and the risk is UNDER-dosing.

As written the card taught a student to under-dose a drug while believing they
were being cautious, which is the direction that does not announce itself.
Fixed in both fields that carried it, the flashcard back and the quiz
explanation restating it. The card's separate line about extremes of body
habitus is safe in both directions and was left alone.

### Verified correct by me, from raw source, not from the agents' reports
- **Every antidote-poison pairing in the toxicology topic**, thirteen of them
  named individually in the commit. All correct. The paracetamol nomogram is
  on the current SINGLE MHRA treatment line from 100 mg/L at 4 hours, with the
  old high-risk-group second line correctly demoted to "guides clinical concern
  only". Cyanide has hydroxocobalamin first line with dicobalt edetate
  restricted to confirmed poisoning — current UK practice, ahead of older texts.
- **The digoxin potassium nuance**, which is subtle and right: chronic
  hypokalaemia predisposes to toxicity, but hyperkalaemia in ACUTE overdose
  marks severe toxicity and is itself an indication for Fab.
- **The warfarin reversal ladder**, including the switch most often got wrong:
  vitamin K is ORAL at INR >8 without bleeding and slow IV at INR 5-8 or >8
  WITH bleeding. PCC is explicitly preferred over FFP for major bleeding, with
  FFP named only as the fallback.
- **All four HIT rules**: stop heparin, switch to a non-heparin agent, NOT
  LMWH because it cross-reacts, do not start warfarin until platelets recover
  (limb gangrene), do not transfuse platelets.
- **The steroid equivalence set** and its internal arithmetic against the
  stated potency ratios; the adrenal crisis regimen including the rule that a
  cortisol sample must never delay hydrocortisone.
- **The trimethoprim/nitrofurantoin trimester split** — the classic
  transposition — correct in all five places the file states it.
- **The valproate Pregnancy Prevention Programme** at current MHRA strength,
  including the under-55 and two-specialist conditions.

### Deck-wide audit: antidote bound to the wrong poison
333,988 fields scanned for six dangerous mis-pairings (naloxone with
benzodiazepines, flumazenil with opioids, acetylcysteine with salicylates,
desferrioxamine with lead, bicarbonate with opioids, glucagon with digoxin).
Two candidates, both false positives on reading: one card says glucagon is
explicitly NOT the antidote there, the other pairs naloxone with opioids in a
sentence that separately treats alcohol withdrawal with a benzodiazepine.
No genuine mis-pairing exists in the deck.

### Absent from the app
- **Duty of candour after a discovered prescribing error.** Zero hits across
  the whole Safe Prescribing topic. Incident reporting is present but framed as
  a system-level SAFEGUARD that prevents errors, not as what you do after
  making one. No card asks "you have just discovered your own prescribing
  error - what now?" The concept exists in haematology.json for transfusion
  incidents, so it is absent from this topic rather than from the app, but the
  topic that should own it does not.
- **High-dose insulin euglycaemic therapy** for beta-blocker and
  calcium-channel-blocker overdose. The file gives atropine and glucagon.

### Absent from the topic, present in the app
- The **loading versus maintenance dose** distinction does not appear in the
  Renal/Hepatic topic at all, so it cannot be reversed there. It is stated
  correctly in the Pharmacokinetics topic of the same file: loading dose
  follows volume of distribution, maintenance follows clearance, which is the
  right way round for renal impairment.
- **Mitral stenosis** appears once in the anticoagulation topic, framed as a
  reason warfarin is still preferred, and NOT as a DOAC contraindication on the
  dedicated DOAC cautions card. The substance is there; the framing is not.

### Wording, not errors (reported, unchanged)
- The salicylate card's acid-base order is correct (respiratory alkalosis then
  metabolic acidosis), but its gloss "(hyperventilation stimulates the
  medulla)" inverts the causation: salicylate stimulates the medullary
  respiratory centre, which causes the hyperventilation.
- The Safe Prescribing card on prescription legal requirements omits the dose
  itself and the prescriber's address, though both are covered elsewhere.
- Lithium is described as accumulating "rather than damaging the kidney" —
  true of digoxin, an oversimplification for lithium, which does cause
  nephrogenic DI and chronic tubulointerstitial nephropathy.

### Still outstanding in this file
Palliative Care & Routes of Administration (29 cards) and Pain Management &
Analgesia (27). Held deliberately: they carry the opioid conversion ratios,
where a ratio stated in the wrong direction is the most dangerous error
available in the deck, and that work is not worth rushing to close a file.

## Clinical pharmacology — palliative care and analgesia (v1471). FILE NOW COMPLETE 278/278.

110 fields. Markup only, problems: 0.

### Why these two were held back
They carry the opioid conversion ratios. A ratio stated in the wrong direction
is the most dangerous error available in this deck: it does not look wrong on
the page, and acting on it gives a two- or three-fold overdose of a strong
opioid. So these were audited from raw source BEFORE the markup was applied
rather than after, and independently of the agent that formatted them.

### Every conversion ratio in the app, with its direction — all correct
- Oral morphine to SC morphine: divide by 2.
- Oral morphine to SC diamorphine: divide by 3.
- Oral morphine to oral oxycodone: divide by 2.
- Codeine to oral morphine: divide by 10. **This is the one most often taught
  backwards, and this file has it the right way round.**
- Opioid rotation: reduce the calculated dose by 25-50% for incomplete
  cross-tolerance and reassess within 24 hours — correct, and in the safe
  direction (reduce, never increase).
Every ratio puts the smaller number on the more potent side. The card opens by
stating that ratios are drug-specific and must never be carried across to a
different opioid, and the quiz bank tests exactly that error. The ratios also
agree with the Analgesia / Pain Ladder topic in
acute-abdomen-surgical-principles.json, checked directly.

### Absent from the app
- **Any patch conversion.** No fentanyl or buprenorphine patch is ever
  converted to or from oral morphine; "micrograms/h" matches zero times in the
  entire deck. Patches appear only with safety content. Given patches are where
  conversion errors actually kill people, this is the most significant gap
  found in the specialty.
- **Tramadol to morphine conversion.** Tramadol appears four times with its own
  dosing and never a conversion.
- **Syringe driver compatibility and dilution.** Zero matches deck-wide for a
  diluent or compatibility statement alongside a syringe driver. The file gives
  four end-of-life symptom classes (opioid, antiemetic, antisecretory,
  sedative), not five — breathlessness has its own card and is deliberately not
  treated as a syringe-driver symptom.

### Internal tensions (reported, unchanged — both defensible)
- The palliative naloxone bolus is "20-100 micrograms" on one card and
  "100 micrograms" on the other. The second is a value inside the first's
  range, and both correctly titrate against respiratory rate and both
  explicitly contrast themselves with the resuscitation bolus. Not a conflict.
- Both breakthrough cards pair modified-release morphine 10 mg BD (20 mg/24 h)
  with a 5 mg PRN, which is a quarter rather than the stated one sixth. This is
  what NICE CG140 itself says (20-30 mg/24 h with 5 mg rescue), so it is exactly
  one sixth only at the top of the range. The rule and the worked example on the
  same card are both arithmetically right.

### Backs that do not fully answer their front
- The palliative definition card's front says "(WHO definition)" but the back
  never attributes it to the WHO.
- A front names DNACPR and ReSPECT; neither appears in its back.
- A front asks who makes up the palliative MDT; the back lists services and
  teams rather than professions, naming no doctor, OT, physio or social worker.

### Misfiled content
Four cards in Palliative Care & Routes of Administration are about IV fluids —
NICE fluid requirements, hypovolaemia, crystalloid versus colloid, and
potassium infusion rules. They are neither palliative care nor a route of
administration. Formatted on their own terms; flagged for the content owner.

## Breast and public health (v1476-v1480). BOTH NOW COMPLETE: breast 262/262, public health 96/96.

715 fields across 14 breast topics and 3 public health topics.

### CONTENT FIX: a 2-week-wait threshold that excluded 50-year-olds
The triple assessment card listing urgent-referral features of nipple discharge
ended "and age >50". NICE NG12 says "aged 50 and over", and this same file's
Breast Cancer card already said "50 or over". As written a 50-year-old woman
with unilateral, single-duct, spontaneous, blood-stained discharge fell outside
the criterion. The error ran in the direction that delays a cancer diagnosis,
which is why it was fixed rather than only logged.

TWO fields carried it, not one: the flashcard back, where it was HTML-escaped
inside a value chip, and the quiz explanation, where it was a bare character.
The first pass fixed only the card; the guard asserting that no ">50" age
survived anywhere in the file failed, nothing was written, and the second was
found. This is the third time this session that an escaped character in raw
JSON has hidden a second copy of the thing being fixed.

### Verified correct by me, from raw source
- Tamoxifen for pre-menopausal and anastrozole for post-menopausal ER-positive
  disease -- correct here and in all 11 statements of it deck-wide.
- LCIS as a RISK MARKER for future often bilateral cancer, not a cancer and not
  an obligate precursor. Stated explicitly, which is better than most resources.
- Phyllodes is NOT called benign: "can be borderline/malignant, recurs locally
  -- don't assume benign without histology."
- Fibrocystic change's no-increased-risk claim is correctly restricted to the
  NON-PROLIFERATIVE form rather than stated flat.
- Paget's begins ON THE NIPPLE and does not spare it; eczema involves the
  areola and spares the nipple. Right way round on all three cards stating it.
- Sensitivity TP/(TP+FN), specificity TN/(TN+FP), PPV TP/(TP+FP), NPV
  TN/(TN+FN); type I as alpha and false positive, type II as beta and false
  negative; cohort prospective, case-control retrospective. All four of the
  most-transposed definition pairs in medicine are the right way round.
- The notification duty: any GMC-registered doctor with "reasonable grounds for
  suspecting", to the local authority Proper Officer (in practice the UKHSA
  Health Protection Team), urgent by phone within 24 hours, routine online
  within 3 days, with a separate laboratory duty direct to UKHSA within 7 days
  that does NOT discharge the doctor's.

### Absent from the app
- **That a normal, CONCORDANT triple assessment still does not entirely exclude
  cancer**, and that a clinically suspicious lump is excised regardless. The
  file says a normal ultrasound does not exclude cancer, and a normal mammogram
  does not either, and that DISCORDANCE mandates re-biopsy -- but the case where
  all three arms agree and are benign is exactly the one not covered. Checked
  deck-wide before accepting.
- **Acute encephalitis and smallpox** are missing from the notifiable list
  (acute meningitis is missing from this topic but present elsewhere; the topic
  lists only meningococcal septicaemia, which is a separate statutory entry).
- **Gynaecomastia appears nowhere in breast.json at all.** It is filed in
  endocrine, reproductive and paediatrics. A male breast presentation has
  nowhere to land in the BREAST specialty.
- **The p-value's common misinterpretation is never flagged.** The definition
  is correct and conditioned on the null being true, and the arbitrariness of
  0.05 is stated, but no card says p is not the probability that the null is
  true. Zero hits deck-wide for any such warning.
- **Risk-reducing mastectomy** for BRCA carriers: zero mentions deck-wide.
- **"Health inequality" as a named phrase** never appears anywhere, though the
  gradient, equity and amenable-mortality concepts are all present and correct.

### Absent from the topic, present in the app
- Atypical hyperplasia. The benign topic makes NO claim about it, so there is
  nothing there to be wrong, but a student working only that topic finishes it
  believing benign breast disease raises no cancer risk in any form. It is
  handled correctly in Pathology & Staging as a B3 result needing excision.
- Statutory notification requires no patient consent and lawfully overrides
  confidentiality -- carried only by evidence-test-interpretation.json. This is
  the part students most often get wrong in an ethics station.
- The 2-week-wait pathway is stated in only two of the eight breast
  presentation topics.

### Internal inconsistencies (reported, not fixed)
- Nipple Retraction puts ANY newly retracted nipple on the 2-week-wait pathway
  with no age qualifier, where Breast Cancer restricts retraction 2WW to 50 and
  over. This errs toward OVER-referral, so nobody is missed, but a student
  answering from one card is marked wrong by the other.
- The Axillary Lump topic states no referral pathway at all, though Breast
  Cancer carries "consider 2WW at 30 or over for an unexplained axillary lump".
- The mastalgia management card carries no red-flag guard of its own. Read
  alone it could reassure a woman with painful breasts without examining her.
  Four other cards in the topic mitigate it heavily.

### The reassurance test
Presentation-based topics fail dangerously when a benign explanation is offered
without its guard. I read all eight breast sign topics specifically for this.
Every benign diagnosis across them is gated behind a confirmation step, and the
mastalgia card that says isolated breast pain is rarely cancer never separates
that claim from its qualifier -- they are in the same sentence. There is no
reassurance trap in any of the eight. The same holds in the 68-card benign
topic, where every benign entity carries an explicit exclusion guard on or
beside its own card.

## MEDICAL CONDITIONS COMPLETE (v1483) — 19,722 / 19,763

The `conditions__` prefix is finished. What follows records the 41 cards that
carry no formatting device, so that a later pass does not mistake them for
missed work and "fix" them.

### Why 41 cards carry no markup, and should not
Two shapes, both barred from marking by the rule this project has applied
throughout — that bolding every element discriminates between none of them.

**The whole back is one term.** Bolding it would bold the entire answer:
"Fever." (the most consistent sign in infective endocarditis), "Osteomyelitis.",
"Autosomal recessive.", "Keratin pearls.", "Thrombocytosis.", "Adenocarcinoma."
(twice), "Squamous cell carcinoma.", "Small cell lung cancer (SCLC).",
"Leukocytoclastic vasculitis.", "Superficial epidermal necrolysis.",
"Adult-onset Still's disease.", "Cocaine and amphetamines.", "Alcohol and
benzodiazepines.", "Viral respiratory infections.", "All new diagnoses.",
"CBT and motivational interviewing.", "CT-guided percutaneous biopsy.",
"micro-opioid agonist.", "Anti-TIF1-gamma and anti-NXP2.", and, on the card
asking whether being transgender is a mental illness, "No."

**An arrow chain in which every node is equally the answer.** The arrows encode
sequence and are not a droppable separator, so these stay as prose, and no node
outranks another: the cardinal movements of labour, the steps of IVF, the
atopic march (twice), the respiratory support escalation ladder, how ECMO
works, the Barrett's metaplasia-to-adenocarcinoma sequence, the anaphylaxis
mechanism, retinoblastoma's save-life/save-eye/preserve-vision order, the
analgesic prescribing framework, and labour analgesia options.

### Separately: 1,123 condition cards have a list or a chip but no bold
These are formatted, not missed. They are the enumerations where the list IS
the device and marking each item would mark none — the ten categories of abuse,
the six qualifying DoLS assessments, the four hepatotoxins, the postural-drop
numbers carried by value chips. Any future audit counting "cards without
<strong>" will over-report by this amount.

### The nine marked in this final pass
Chosen because a discriminator existed that did not swallow the card: the
rosacea phenotype names plus "NO comedones" (the separator from acne); the
rungs of the eczema ladder; sacroiliitis and HLA-B27 rather than all four
ankylosing spondylitis criteria; the DLE/SLE/DIL spectrum; the three colours of
Raynaud's; the objective red flags for secondary Raynaud's (digital ulcers,
abnormal capillaries, positive antibodies) rather than the softer historical
ones; the sight-threatening swab indications in conjunctivitis (hyperacute,
gonococcal/chlamydial, neonatal); the meralgia paraesthetica escalation rungs;
and the NUMBER of adrenaline auto-injectors prescribed on discharge, which is
the examinable point on that card.

### What remains in the deck, outside medical conditions
- `signs__`          4,518 of 5,526 unformatted
- `investigations__` 4,029 of 4,198 unformatted
- `histology__`      2,166 of 2,480 unformatted
- `anatomy__`            3 of 1,637 unformatted (effectively complete)

## Risk scores & criteria — 8 of 10 topics (v1486, v1487)

395 fields. NOTE: the v1487 commit message claims "FILE COMPLETE 328/328". That
is WRONG and is corrected here — Neurology (38 cards) and Alcohol, Sepsis &
Acute Care (35) were still outstanding at that commit. The true figure was
255/328. Recorded rather than quietly fixed, because a false completion claim
in the history is worse than the original miscount.

### CORRECTION 1: the CHA2DS2-VASc sex split (also fixed in cardiovascular.json)
"Offer anticoagulation if >=2 in men or >=3 in women" is the ESC framing. NICE
NG196 offers at >=2 REGARDLESS OF SEX, considers at 1 in men, and withholds
only where the person is under 65 and female sex is their sole risk factor.

Two things made this clear-cut rather than a guideline-vintage judgement call:
- The deck already contradicted itself. cardiovascular.json's Tachycardia topic
  teaches the NICE rule twice and explicitly calls the sex-split a
  MISCONCEPTION, spelling out that female sex scores a point but does not move
  the threshold. Four fields across two files disagreed with three other cards
  in the same app.
- The split created a COVERAGE HOLE. As written, a woman scoring exactly 2 fell
  in no band at all: not >=3, not 0, not a 1-from-sex-alone. The error and the
  gap are the same defect seen twice, and fixing the threshold closes both.

The direction matters: this under-anticoagulates women. A woman aged 65-74 with
one other risk factor scores 2 and would be denied stroke prevention she should
be offered. That is a documented real-world inequity.

Four fields corrected in total — two in cardiovascular.json (v1484) and two
here (v1487). In both quiz items the question, options and ANSWER were already
correct and were left untouched; only the stated reasoning was wrong.

### CORRECTION 2: overlapping acute asthma PEF bands
Acute severe is PEF 33-50%; moderate was written as PEF 50-75%. A PEF of
exactly 50% satisfied BOTH bands, and the two differ in disposition. BTS/SIGN
write moderate as >50-75%. One character, one real decision.

### A near-miss worth recording
The deck-wide scan that found the CHA2DS2-VASc error first reported ZERO
mentions of the score. The deck writes it with Unicode subscripts and the
pattern used ASCII digits, so all 99 mentions across 18 files were invisible.
Had that "0 hits" been taken at face value it would have read as "this score
isn't in the deck" rather than "my pattern is wrong". This is the fourth
character-encoding false negative in this project, after the escaped quotes in
raw JSON (twice) and the backslash-eaten regex.

An agent hit the same class independently: a plain semicolon list-split matched
INSIDE the HTML entity "&gt;" on "Fever &gt; 38.5", which would have produced a
silently mangled inequality across a list join. Its cut matcher now skips any
separator overlapping an entity or tag span.

### Verified correct by me, from raw source
- Ottawa ankle/foot/knee framed as high-sensitivity rule-OUT tools -- a
  negative rule excludes fracture -- not as rule-in tests.
- The scores that run against intuition, all stated correctly and explicitly:
  MASCC (higher = LOWER risk), MELD (higher = higher transplant PRIORITY),
  Braden (LOWER = higher risk, with the opposition to Waterlow named on the
  card), PERC (a rule-out gate, all eight negative excludes PE), pleural fluid
  pH (lower = worse), and acute asthma (lower PEF = worse, and a NORMAL PaCO2
  is a life-threatening sign rather than a reassuring one).
- Child-Pugh A/B/C mapping to 5-6, 7-9, 10-15 contiguously over the full range.
- Wells cut-offs hold at 2 for DVT and 4 for PE across all five files.

### Band problems found and reported, not fixed
- Duke criteria: DEFINITE and POSSIBLE overlap as written. 1 major + 3 minor
  satisfies both cards. Real BCLC-style hierarchy (definite first, then
  possible) is not stated, and the third category, REJECTED, is absent.
- BCLC stages C and D overlap: C is "vascular invasion or PS 1-2", D is
  "Child-Pugh C or PS 3-4". A patient with PS 1-2 and Child-Pugh C meets both.
- ISTH DIC fibrinogen: ">1 g/L = 0, <1 g/L = 1" leaves exactly 1 g/L scoring
  neither.
- ASA II gives "BMI 30-40" and ASA III "BMI >=40", so BMI exactly 40 is in
  both. Faithful to the ASA's own published wording, so flagged rather than
  called an error.
- Modified Centor (McIsaac) runs -1 to 5, but the antibiotic bands only cover
  0-4. Scores of -1 and 5 map to nothing.
- Alvarado bands start at 1, but the score runs 0-10.

### Absent from the app
- Revised Cardiac Risk Index / Lee index: zero hits deck-wide, and
  "Perioperative" is exactly where it would belong.
- Pneumonia Severity Index (PSI/PORT): zero hits deck-wide.
- MELD 3.0: zero hits deck-wide (MELD-Na is present).
- ASA I is never defined anywhere, though II to VI all are.
- The ECOG/Karnofsky inversion is never stated and the two tools never appear
  on the same card. Both are USED correctly (Karnofsky <80% adverse, ECOG >=2
  adverse), so the inversion can be inferred but is never taught.
- No pain-measurement tool exists in the Pain topic, and no card anywhere says
  a pain score is self-reported and not to be overridden.

## MRI — all 12 topics (v1489-v1491). FILE COMPLETE: 342 cards, 0 unformatted.

Figure taken from a count of the file run before this entry was written. See the
process note at the end of this section.

### CORRECTION 1: the myeloma-defining event threshold
Two cards in the same topic disagreed at exactly one lesion. One said ">=1
unequivocal focal marrow lesion on MRI is a myeloma-defining event indicating
active (treatment-requiring) myeloma"; the other said "more than one focal
lesion". The IMWG 2014 SLiM criteria define the M as MORE THAN ONE focal
lesion, each at least 5 mm. Checked against IMWG, not from memory, because this
threshold decides whether someone starts chemotherapy.

The error ran toward OVER-treatment: a single focal lesion would have
reclassified smouldering myeloma as active myeloma requiring therapy. The 5 mm
floor was added at the same time, since "more than one lesion" without it is
only half the criterion.

### CORRECTION 2: deep myometrial invasion
Card 11 gave the cut as "<50% vs >=50%", which is FIGO-correct since stage IB
is invasion of the outer half. Card 31 wrote "deep (>50%)", excluding a tumour
invading exactly 50% and understaging it -- and that depth is what drives
whether lymphadenectomy is done. Card 31 now matches card 11.

This is the THIRD boundary in this project that excluded its own endpoint,
after the breast 2-week-wait age (">50" where NICE says 50 and over) and the
acute asthma PEF bands (severe 33-50% against moderate 50-75%, so exactly 50%
met both). Worth naming as a class: whenever a card states a cut-off, check
what happens to a patient sitting exactly on it.

### Verified correct by me, from raw source
- **Every late gadolinium enhancement pattern is paired with the right
  disease** -- subendocardial or transmural following a coronary territory for
  infarction, mid-wall septal stripe for dilated cardiomyopathy, subepicardial
  for myocarditis, patchy mid-wall at the RV insertion points for hypertrophic
  cardiomyopathy, global subendocardial with failure to null for amyloid. The
  file also states explicitly that the infarct pattern follows a coronary
  territory while the others do not, which is what makes the set usable rather
  than memorised. This is the classic cardiac MRI error and it is not here.
- **Restricted diffusion is BRIGHT on DWI and DARK on ADC** on all eight cards
  that state it, with T2 shine-through given as the discriminator and ADC
  pseudonormalisation correctly timed at days 7-10.
- **Bone marrow oedema is LOW on T1 and HIGH on fluid-sensitive sequences** on
  all five cards, and the file teaches the reason (normal marrow is bright on
  T1 because it is fatty; pathology replaces fat with water or cells) rather
  than asserting the pairing.
- **T2\* and iron: LOW T2\* equals HIGH iron.** Correct direction.
- The cord ends at the conus around L1/L2, so compression below it gives a
  cauda equina LMN pattern rather than a cord UMN syndrome -- stated with its
  reasoning.
- MSCC: whole-spine MRI within 24 hours, dexamethasone 16 mg daily with a PPI,
  MSCC coordinator referral.

### The soft-tissue sarcoma biopsy pathway is present, twice, in bold
"An unplanned 'whoops' excision seeds tumour and worsens outcomes ... an
MDT-planned image-guided core biopsy placed along the future resection line, so
the biopsy tract can be excised en bloc", and "referred to a bone-tumour /
sarcoma MDT BEFORE biopsy". Neither is demoted. This is the card that saves a
limb and it is formatted like it.

### Absent from the app
- **SWI and GRE**, the blood-sensitive sequences: two hits deck-wide, neither
  in a brain topic, despite cavernoma and petechial haemorrhage both appearing
  as brain content. No microbleed, cerebral amyloid angiopathy or
  haemorrhagic-transformation card exists.
- **"A normal neurological examination does not exclude cauda equina
  syndrome."** Absent in any form. The file covers the TIMING half of the point
  well ("never delay it while waiting for retention to develop") but not the
  examination half.
- **Bilateral sciatica** as a cauda equina red flag.
- **MRI before biopsy in the UK prostate pathway.** Only implied, by the score
  existing before the biopsy it triggers.
- **"A normal MRI does not exclude endometriosis"**, and laparoscopy is not
  mentioned anywhere in the file.
- **T2-FLAIR mismatch sign** (the IDH-mutant astrocytoma sign). What the file
  has is the different and correctly described DWI-FLAIR mismatch used for
  wake-up stroke.
- The explicit negative form "a normal X does not exclude Y" appears exactly
  once in the 75 MSK and whole-body cards. The fracture cards make the same
  point positively ("before radiographs turn positive"), which is a weaker
  signal to a skimming reader.

### Internal tensions reported, not fixed
- Viability: one card gives the tripartite scheme (<25% scar viable, 25-50%
  intermediate, >50% non-viable), another collapses it to "<50% = viable ->
  revascularise". Both are taught; reconciling them means picking a scheme,
  which is an authoring decision.
- Spinal infection: one card says "do not wait for markers or biopsy"
  (epidural abscess with neurology), another says "get the organism first"
  (stable discitis). Clinically reconcilable, but neither card says which
  situation it is in.
- MRI safety: the file gives one flat hazard list and never distinguishes
  absolute from relative contraindications. Claustrophobia, the archetypal
  relative one, is absent from the brain and skull base topics.

### Process note: two false completion claims, and the fix
Commit v1487 claimed "FILE COMPLETE 328/328" for risk-scores-criteria when it
was 255/328. Commit v1490 claimed "MRI COMPLETE 342/342" when it was 267/342.
Both had the same cause: the message was written from "every result file I am
holding has been applied" rather than from a count of the file. Both were
caught within minutes by running the count -- but afterwards, with the claim
already pushed.

Neither was rewritten. v1487 is corrected in this document and v1490 has an
explicit correction commit of its own. From v1491 the count is run BEFORE the
commit message is written and the number is pasted into it, which is why that
message says "342/342, 0 unformatted" rather than "COMPLETE".

## Ultrasound — file complete (306/306, 0 unformatted)

Counted before writing this heading: `306 cards, 0 unformatted`.

### Correction applied: postmenopausal-bleeding endometrial threshold

Two cards in `investigations__ULTRASOUND__Pelvic & Gynae` gave different
cut-offs for the same decision. Card 11 said `≤4 mm` reassuring / `>4 mm`
hysteroscopy plus biopsy. Card 7 said `<4–5 mm` reassuring / `≥4–5 mm`
investigate.

Card 7's fuzzy range is the error, not merely the inconsistency: at 4.5 mm it
reassures where card 11 investigates. The direction of harm is
under-investigation of postmenopausal bleeding, i.e. a missed endometrial
cancer. UK guidance — verified by search, not recalled — is investigate above
4 mm, reassure at 4 mm or less. Card 7 was moved onto card 11's threshold;
card 11 untouched.

**The second copy fired again.** The guard refused the write until a third
field was found: `.q.…Pelvic & Gynae[4].explanation` carried the same loose
range in plain text ("A stripe <4–5 mm is reassuring"), while its sibling quiz
card `us_pel_uterus_q01` already taught `>4 mm`. The quiz layer contradicted
itself. Fixing only the flashcard would have left the quiz teaching the loose
cut-off. This is the fourth time a threshold correction has found a second copy
hiding in `q` with different escaping (after breast 2WW age, CHA₂DS₂-VASc and
the acute-asthma PEF bands). The replacement also removed a bare `<` from that
explanation string.

### Findings reported, not fixed (agent clinical checks, ultrasound batches)

Absences confirmed deck-wide by anchored search, left for a clinician:

- **TAPSE** — zero hits in any card file. No quantitative RV systolic measure
  (TAPSE, S′, RV FAC) appears anywhere. PASP from the TR jet is present and
  correct, including the RAP term (`4v² + RAP`).
- **"Ultrasound is operator dependent" for MSK** — 6 cards carry the phrase
  deck-wide, none of them MSK. Within `ultrasound.json` it appears only on
  Abdomen 3 and Renal/Aorta 17.
- **Preserved Doppler flow does not exclude testicular torsion** — absent from
  Small Parts, and Small Parts 11 closes "Doppler flow is the key discriminator"
  with no qualifier. NOT an app-level gap: it is stated in `urology.json`
  (Testicular Torsion 4, 12, 14), `sexual-health.json` (Epididymo-orchitis 15)
  and `renal-urological.json` (Acute Scrotal Pain 2). Topic-level gap only.
- **Low-flow low-gradient severe AS** — present and correct on a dedicated card
  (Echo Core 13, dobutamine differentiating true from pseudo-severe), but NOT on
  Echo Assessment 6, the card carrying the `>40 mmHg` threshold, and the two sit
  in different topics.
- **Mitral stenosis** — severe `<1.5 cm²` is right; guidelines usually write it
  as `≤1.5 cm²` and add "very severe ≤1.0 cm²". No mean gradient or pressure
  half-time figure appears in either echo topic.
- **Exaggerated respiratory variation in mitral/tricuspid inflow** (a standard
  tamponade sign) exists only as an MCQ distractor, on no flashcard.
- **"Tamponade is a clinical diagnosis supported by echo"** exists in the file,
  but only in the `q` map's explanation for `us_echo_tte_q02`, not on any back.
- **RWMA → coronary territory mapping** (anteroseptal→LAD etc.) is asserted as a
  principle on Echo Core 10 but the mapping itself appears only on the MCQ side
  here; it does exist in `thorax.json` and `cardiovascular.json`.
- **Thyroid cyst vs solid nodule** is not distinguished in Small Parts; it is in
  `ent.json` Neck Lumps 18 and `nuclear-interventional.json`.

### Unresolved cross-file tension: ejection-fraction bands

`ultrasound.json` Echo Core 25 and Echo Assessment 1 give HFrEF `≤40%`,
HFmrEF `41–49%`, HFpEF `≥50%` — ESC/NICE, and internally consistent.
`cardiovascular.json` `conditions__CARDIOVASCULAR__Heart Failure` card 0
(`conditions__cardiovascula_1`) gives HFrEF `<40%` and HFmrEF `40–49%`, which
contradicts them — and contradicts its own `chf_fc_03`, which gives HFmrEF as
`41–49%`. An EF of exactly 40% falls in two bands at once across the two files.

A smaller internal one in the same topic: Echo Core 25 calls normal EF `>50%`
while Echo Assessment 0 calls it `≥50%`, so exactly 50% is both normal and not
normal. Cosmetic beside the `cardiovascular.json` divergence, but real.

Nothing changed in either file — this is the heart-failure topic owner's call,
and picking a side here would silently re-band the cardiology deck.

### Editorial notes (no action taken)

- Echo Core 3 attributes *diastolic* collapse to both RA and RV; Echo Assessment
  11 correctly refines this to RA **systolic** / RV **diastolic**. Core 3's
  phrasing is the common simplification rather than an error, but read alone it
  teaches the wrong half.
- The TOE block states the endocarditis / LA-appendage / prosthetic-valve triad
  four times (Core 4, 6, 7, 9); Core 4 consequently had no discriminator left to
  bold on its front and was left deliberately bare.
- Small Parts 16, 17 and 18 name no organ on the front ("features suggesting
  malignancy", "women under ~40"), so out of block order they read as orphans,
  and 1 vs 18 overlap heavily on malignancy features.
- DDH cards argue from **ossification**, not radiation avoidance — the better
  answer, but worth knowing the radiation rationale is stated only for pyloric
  stenosis (Paediatric 10) in this topic.

## The tail of `conditions__` / `anatomy__`: 43 bare backs, 4 changed

A sweep found 43 cards in already-completed topics whose backs carried no
markup at all. The instinct is to treat that as 43 misses. It was not.

**These are mostly a deliberate card type**, not an oversight: short
"companion retrieval" cards paired with a fuller marked-up card in the same
topic. The companion's whole back *is* the answer the front already names in
bold, so marking it would bold the entire back — which is not emphasis.

| Full card (already marked) | Companion (left bare) |
|---|---|
| Lung Cancer 9 (list, `keratin pearls` bold) | 11: "Keratin pearls." |
| Anaphylaxis 39 (`allergy clinic referral`) | 40: "All new diagnoses." |
| Asthma 21 (`Viral respiratory infections` bold) | 20: "Viral respiratory infections." |
| Substance Use 36 (6-item list) | 35: "Cocaine and amphetamines." |

Four cards were genuinely unfinished and were changed:

- **Orthopaedics Upper Limb Fractures 96** — the terrible triad (elbow
  dislocation + radial head + coronoid fracture) became a 3-item `fc-list`.
- **Respiratory Anaphylaxis 48** — `2 auto-injectors` chipped, matching the
  topic's own house style (card 45 chips `2 doses`, card 47 chips `2 h`).
- **Upper Limb Muscles 19** — shoulder extension's prime movers bolded. This
  is whole-back bold, accepted only because card 18 is its literal template
  sibling ("Name the prime movers of shoulder flexion") and bolds both movers;
  left bare, 19 read as unfinished beside three marked twins.
- **Upper Limb Nerves 16** — the two nerve groups bolded, labels left plain,
  matching sibling card 21's identical "Label: **content**." prose shape.

### Left bare deliberately, and why it was the right call

- **Lower Back & Spine 8 and 9** (spinal infection and fracture red flags) look
  like textbook 3-item lists. They are members 3 and 4 of a four-card red-flag
  run whose **first member, card 7, is itself unbolded prose** with only its
  value chipped (`Age >50, previous cancer, night pain and weight loss.`).
  Verified directly against the raw file. Bolding 8 and 9 would have made 7 the
  odd one out in its own run. The fronts already carry the discriminator in
  bold (MALIGNANCY / INFECTION / FRACTURE).
- **Antimicrobial Stewardship 13** — "Right drug, dose, route, duration, for
  the right diagnosis." "Right" is a shared lead-in that survives in prose and
  dies in bullets, where the rest become three bare nouns.
- **Immunobullous 32** — "Conjunctival, nasal, oesophageal and genital
  erosions." One shared head noun; bulleting attaches "erosions" to "genital"
  alone and silently changes the claim.
- **Barrett's 2** — `(low- then high-grade)` refused `fc-inline`: grading drives
  surveillance and management, so greying it fails the tone test.
- **Eleven arrow-chain backs** left as prose. On the three ordered ones
  (cardinal movements of labour, IVF sequence, retinoblastoma treatment
  priorities) `<ul class="fc-list">` is **unordered**, so converting would have
  destroyed the ordering the front explicitly demands.
- **Respiratory Support 2** — "Nasal cannula / mask / NRB / Venturi." `/` is not
  a droppable separator; a list would require deleting characters off the
  whitelist.

One card is flagged as a genuine close call rather than settled: **Cutaneous
CTD 42**, "Anti-TIF1-γ and anti-NXP2." Two discrete named antibodies, and
siblings 40/41 bold their answer cores — but those fronts carry the antibody
and ask for the meaning, so this one inverts the template and has no identical
run to look unfinished against. Left bare.

## CT and plain film & fluoroscopy — both files complete

Counted before writing this heading: `ct.json 217 cards, 0 unformatted` and
`plain-film-fluoroscopy.json 285 cards, 0 unformatted`.

### Correction 1: adrenal adenoma attenuation, at the boundary again

Three fields said a lipid-rich adrenal adenoma is `<10 HU`; two others in the
same file said `≤10 HU`. A lesion measuring **exactly 10 HU** was therefore a
benign adenoma needing nothing on one card, and an indeterminate lesion needing
washout characterisation on another. The standard cut-off is 10 HU or less, so
the strict-inequality copies moved.

This is the fifth member of a now well-established error class in this deck:
**a boundary that excludes its own endpoint.** Its siblings are the breast 2WW
age (`>50` excluding 50-year-olds), the acute-asthma PEF bands (33–50% vs
50–75%, so exactly 50% met both), the FIGO myometrial invasion depth (`>50%`
understaging at exactly 50%) and the endometrial thickness above. The check
that finds them is always the same: ask what happens to a patient sitting
exactly on the stated number.

Two of the three fields also stored a **bare `<`** rather than `&lt;`. That is
what made an earlier scan of mine display them garbled — a naive `<[^>]+>` tag
strip eats `<10 HU ... (` as though it were a tag. Correcting the value removed
the bare `<` as a side effect. Worth remembering as yet another instance of the
character-encoding false negative that has now bitten six times.

### Correction 2: scaphoid re-imaging interval

Six fields across four files said repeat the radiograph at **10–14 days**.
Three fields in `orthopaedics.json` alone said **7–10 days**.

The minority moved, for a clinical reason rather than a majority one: the bone
resorption that makes an occult scaphoid fracture line visible takes roughly
10–14 days, so a film repeated at 7 days is likelier to be falsely negative —
and a false negative here means a missed scaphoid fracture, non-union and
avascular necrosis.

**The trap in this fix, and why a blanket replace would have been wrong.**
`orthopaedics.json` also uses 7–10 days for **distal radius** re-imaging, where
it is correct. Three of the eight `7–10 days` strings in that file are distal
radius and had to stay. Worse, two of them are character-identical up to the
end of the chip — `repeat imaging in <chip>7–10 days</chip>` — and are
distinguished only by what follows: `" if the initial X-ray"` (radius, keep)
versus `" (a fracture line"` (scaphoid, move). Each anchor had to carry that
tail. The survivor sweep was also narrowed to exclude fields mentioning distal
radius, or it would have fired on the cards that were right.

The quiz answer string is simultaneously an option string, so both copies had
to move together or the answer would no longer match any option.

### Reported, not changed

- **Stanford type B dissection is defined two ways.** `ct.json` Cardiac & Aorta
  11 says "descending only (distal to left subclavian)"; `cardiovascular.json`
  Aortic Dissection 8 says "does NOT involve the ascending aorta (arch and/or
  descending)" and explicitly notes that "distal to the left subclavian" is the
  narrower **DeBakey III** definition. An arch-only dissection is type B under
  one card and excluded under the other.
- **Clavicle fracture site.** `plain-film-fluoroscopy.json` and
  `orthopaedics.json` both say the middle third (~80%); `upper-limb.json`
  Osteology & Joints q22 says "the junction of the middle and lateral thirds".
- **Ottawa rules conflated.** `lower-limb.json` Applied Anatomy 18 answers "what
  do the Ottawa **ankle** rules assess?" with the navicular and base of the 5th
  metatarsal — those are the **foot** rule criteria in every other card.
- **Radio-opaque stone proportion** differs on adjacent cards in one topic:
  `~90%` (X-ray Abdomen 4) vs `~80–90%` (X-ray Abdomen 11).
- **Metformin and contrast** is stated three ways across the deck: a conditional
  eGFR-30 rule in `acute-abdomen-surgical-principles.json`, the older blanket
  "stop for 48 h" in `endocrinology.json`, and "if renal impairment" in
  `ct.json`.
- **Head injury CT wording.** `neurology-neurosurgery.json` says "any CURRENT
  bleeding or clotting disorder" where NICE says "any history of". All four
  copies of the head-injury rules otherwise agree with each other and with
  NG232, including the anticoagulant criterion.
- **`ct.json` Neck & Facial 2** asked for "three" pre-FESS anatomical variants
  and listed four. The back is right — all four are real and each endangers a
  different structure — so the front's count moved, not the content.
- **`ct.json` Head/Brain 4** said the LP after a CT-negative thunderclap
  headache is at "~12 hours"; seven other cards across five files say at least
  12 hours. "~12 hours" admits an LP at 10 h that the others exclude, and an
  early LP is falsely negative for xanthochromia — a missed SAH. The outlier
  moved to `≥12 hours`.

### Absences confirmed deck-wide (anchored search, pharmacology excluded)

- **No BTS lung-nodule size thresholds anywhere.** Brock, Herder, Fleischner and
  "volume doubling" all return zero hits; no card pairs "nodule" with a mm
  threshold. CT nodule follow-up is qualitative throughout.
- **No CAD-RADS anywhere.** The Agatston bands in `ct.json` are the deck's only
  copy, and `cardiovascular.json` holds no competing band, so the divergence I
  briefed for does not exist.
- **No radiation dose figure for CT anywhere** — `mSv` appears twice, both
  nuclear medicine; chest-X-ray-equivalent phrasing and `IR(ME)R` return zero.
- **No statement that free air is missed on a supine film** — a genuine
  deck-level gap, though erect-versus-supine is covered for effusion and
  pneumothorax.
- **"A normal CXR does not exclude PE"** is nowhere in those words, though
  `respiratory.json` teaches that the CXR is usually normal in PE.
- **"Plain CT can look normal early in mesenteric ischaemia"** is absent; the
  deck attaches the same warning to the lactate instead ("lactate rises late,
  so a normal lactate does not exclude it").
- **Contrast allergy and contrast nephropathy appear nowhere in
  `plain-film-fluoroscopy.json`** except as wrong-answer MCQ distractors, even
  though several studies in that file use iodinated contrast.
- **Salter-Harris** is absent from all four plain-film limb topics but well
  covered in `orthopaedics.json` and `paediatrics.json` — topic gap, not an app
  gap.

### A brief error of mine, caught by the file

My brief told one agent the lateral cervical film has "three alignment lines".
The file says **four** (anterior vertebral body, posterior vertebral body,
spinolaminar, spinous process tips), which is correct. The agent checked the
source, marked what was there, and reported the divergence rather than
obeying the brief. The "three lines" in that range are the McGrigor–Campbell
lines on a **facial** X-ray — a different structure entirely.

Two other briefed items were likewise absent and correctly not invented: the
"3-3-1" bowel calibre rule (zero deck hits — the deck uses the 3/6/9 rule, and
all copies of it agree) and the literal "two views at 90 degrees" (present as
"two orthogonal views", and only outside those topics).

## A systematic sweep for the boundary error class

Five corrections so far had the same shape: a threshold stated with a strict
inequality in one place and a non-strict one in another, so a patient sitting
**exactly on the number** falls into two categories at once, or into none. They
were all found by accident, one at a time. So I wrote a scan for the whole
class rather than waiting to trip over the sixth.

**Method.** Extract every `<`, `>`, `≤`, `≥` followed by a number and optional
unit from every field in every card file (pharmacology excluded), then pair
mentions that share the same number, the same unit and the same *direction* but
differ in strictness. The naive version returned 187 candidates and was
useless — "2" is a murmur grade, a lactate, a Wells point, a vertebral body and
a cortical ratio. Requiring the two contexts to share at least three content
words (stopwords stripped) cut it to pairs that are plausibly about the same
thing.

Three collisions were real: one copy disagreeing both with a clear majority and
with the published definition.

### Fixed

- **SAAG.** `≥11 g/L` in `gastrointestinal.json` (many cards),
  `special-tests.json` and `ultrasound.json`; `>11 g/L` in `liver.json` alone,
  across three fields. The definition is ≥11 g/L — and one card in the deck
  teaches precisely that 11 g/L equals 1.1 g/dL, "the threshold is the same
  value in different units". At exactly 11, `liver.json` denied portal
  hypertension.
- **ICD primary prevention.** `EF ≤35%` on nine cards across four files;
  `EF <35%` in exactly one quiz explanation. This is the one that really bites:
  ejection fraction is reported in rounded whole numbers and lands on 35
  constantly, so a patient at EF 35% qualified for an ICD on every card except
  that one.
- **Wells immobilisation.** The published criterion is immobilisation ≥3 days.
  `respiratory.json` stated it both ways — `≥3` on the flashcard, `>3` in its
  own quiz explanation.

### Found and deliberately not fixed

- **HVPG 10 mmHg.** `≥10` in `gastrointestinal.json` and
  `nuclear-interventional.json` ("10 mmHg or more"); `>10` in `liver.json`. The
  definition of clinically significant portal hypertension is ≥10, so
  `liver.json` is technically the outlier — but its copy is an MCQ framed
  "**Above** what hepatic venous pressure gradient…" with a matching `>12`,
  `>30`, `>50` distractor set. Correcting it means rewriting a sound question
  and its distractors, and unlike SAAG and EF, HVPG is a continuous
  catheter measurement that essentially never reads exactly 10. Reported.
- **PUO duration** (`>3 weeks` vs `≥3 weeks`), **neutropenic sepsis
  temperature** (`>38°C` vs `≥38°C`) and **UTI fever** (same, within one file).
  Published guidance genuinely varies in wording on all three, so these are
  house-style inconsistencies rather than errors. Worth one editorial decision
  applied deck-wide.
- **Notation inconsistency:** several cards in `geriatric-medicine.json` and
  `genetics-molecular.json` write ASCII `>=3` and `<=2` where the rest of the
  deck uses `≥` and `≤`. Same meaning, but it renders as literal `>=` to the
  learner.

### Verified absences (checked properly, at sentence level)

Two gaps I had previously reported on an agent's word, now confirmed myself by
requiring the claim to sit within a single sentence rather than merely
co-occurring in a card:

- **"A normal neurological examination does not exclude cauda equina"** — zero
  sentences, deck-wide.
- **"Ultrasound cannot exclude AAA rupture"** — zero sentences, deck-wide.

Both remain for a clinician. Writing them myself would be authoring new
clinical content, which is outside what this pass should do.

## GI and neurological signs — 12 topics, and four more boundary corrections

731 cards across nine GI-signs topics and six neurological-signs topics.

### The scan works; my triage of it did not

The boundary scan from the previous commit produced **546 same-subject
collisions**, and I eyeballed the top twelve. One of the ones I skipped past
was real, and an agent found it independently minutes later:
`scoping-endoscopy.json`'s ALARMS55 card said **"age >55"**, excluding a
55-year-old, where roughly twenty copies across `upper-gi.json`,
`microbiology.json` and `gastrointestinal.json` say "≥55" or "55 and over" —
the NICE wording. A missed 55-year-old here is a missed upper GI cancer.

The lesson is not that the scan failed. It surfaced the pair. The lesson is
that a screen returning 546 candidates needs a triage pass over all of them,
not a glance at the head of the list.

### Fixed

- **SBP ascitic neutrophil count.** `≥250 cells/mm³` on eleven fields across
  `gastrointestinal.json`, `special-tests.json` and `ultrasound.json`; `>250`
  on six fields in `liver.json` alone. At exactly 250, `liver.json` said this
  is not SBP. Untreated spontaneous bacterial peritonitis has very high
  mortality, so this is the worst harm direction the class has produced so far.
  Found independently by two agents and by the scan.
  **The trap:** `liver.json` also carries `>250 mcg/g dry weight` for hepatic
  copper in Wilson's disease, which is correct. Every anchor had to carry its
  own units, and the survivor sweep had to exempt the copper card explicitly —
  otherwise the guard would have demanded I "fix" a correct threshold.
- **Upper-GI 2WW age** — `>55` → `≥55` in `scoping-endoscopy.json`.
- **IBS / chronic abdominal pain red-flag age** — two cards said `>50` where
  the sibling topic in the same file says `≥50`. Lower stakes (PR bleeding is
  separately listed on both cards, so a 50-year-old is still caught), but the
  same endpoint exclusion.
- **Status epilepticus.** The ILAE/NICE operational definition is a seizure
  lasting **5 minutes or more**. `neurological.json` had `≥5`;
  `neurology-neurosurgery.json` had `>5` and `paediatric.json` had "more than
  5 minutes", both excluding exactly 5.
  **The guard fired twice here**, and both times on a copy in the quiz layer:
  first on an MCQ's `options[2]` (whose text the `answer` string must match
  exactly, so both had to move together), then on a paediatric quiz
  explanation. That makes five separate occasions this sweep has found a
  threshold's second copy hiding in `q` with different escaping.

### Found and deliberately not fixed

- **RMI 250** for gynae-oncology referral: `>250` vs `≥250`. RCOG's own wording
  is `>250`, RMI is a computed product that essentially never lands on 250, and
  the majority here favours the strict form.
- **SBP primary prophylaxis ascitic protein**: `<15 g/L` in two files vs
  "15 g/L or less" in `liver.json`. Same class; `liver.json` matches NICE here,
  so the other two are the outliers. Left for a clinician because it changes
  who gets long-term antibiotics.
- **Ovarian mass age** `>50` in `obstetrics-gynaecology.json` against `≥50`
  elsewhere.
- **Transudate/exudate framing.** `gastrointestinal.json` teaches that the SAAG
  has *replaced* the old protein-based transudate/exudate split, while
  `liver.json` and `ultrasound.json` still equate high SAAG with "transudate" —
  the very split the first cards call superseded. A conceptual contradiction,
  not a numeric one.

### Absences confirmed deck-wide

- **"New confusion is delirium until proven otherwise"** — zero hits in any
  phrasing. The deck says "organic until proven otherwise" for psychosis and
  "always exclude delirium before diagnosing dementia", but never this.
- **"Tap before antibiotics" in SBP** — zero hits. The deck says do not wait
  for *culture*, and that deranged clotting must not delay the tap, but never
  states the ordering.
- **"A PPI can mask gastric cancer"** exists in `gastrointestinal.json` and
  `upper-gi.json` but is absent from Dysphagia, Odynophagia and Heartburn —
  whose card on when to use an empirical PPI trial is its natural home.
- **A lactate caveat on mesenteric ischaemia** is absent from the abdominal
  pain topics, though `acute-abdomen-surgical-principles.json` and `ct.json`
  both say "lactate rises late, so a normal lactate does not exclude it". A
  reader working only from the signs cards could read a normal lactate as
  reassurance.
- **"Ultrasound cannot exclude AAA rupture"** — re-confirmed at zero. The only
  "does not exclude rupture" hits in the deck are Achilles tendon.

### One boundary with no second copy to contradict it

The deck's only AAA age gate is **"over 60"**, in two cards that agree with
each other. Nothing contradicts it — but "over 60" excludes 60, so a
60-year-old with first-episode loin-to-groin pain falls outside the deck's only
stated AAA rule. There is no majority to appeal to here, so this is a clinician's
call, not mine.

## A formatting error of mine, found late: safety content in grey spans

An agent reading another file noticed that `neurology-neurosurgery.json` put
the list of findings that make a lumbar puncture contraindicated — falling GCS,
new focal neurology, seizures, papilloedema, abnormal posturing, bradycardia
with hypertension — inside `<span class="fc-inline">`, which is grey. The same
file greyed "(coning risk)" immediately after "Never do an LP in obstructive
hydrocephalus".

I fixed both. Then I scanned the whole deck and found the real scale of it:
**roughly 114 grey spans carry prohibition or risk language.**

### Why my earlier remediation missed this

Earlier in this project I discovered that my brief described `fc-inline` as
"an aside that sits inside a sentence" without saying that the CSS greys it,
and agents had reasonably put safety prohibitions in grey across 18 files. I
unwrapped 63 such spans and updated the brief.

**That fix was `fc-inline` only.** I never audited `fc-caveat`, which is the
stronger demotion — grey *and* 13px. The brief bars both devices from
prohibitions, but my remediation script only searched for one of them. A
partial fix to a systematic problem reads as a completed fix, and I treated it
as one.

The general lesson, which has now bitten twice in this project: when a defect
is found in one device, class or file, the next question is always "where else
does this shape exist?" — not "is this instance fixed?".

### Fixed directly

- The LP-contraindication list and the hydrocephalus coning risk, un-greyed.
  Verified word-for-word identical before and after; only the wrapper moved.

A full per-span audit of all grey spans in the deck is running separately,
against the brief's test: *if a reader skimmed and their eye slid off this text
because it was grey, could a patient be harmed?* Not every "do not" is a safety
point — "Do not learn this as a triad" and "Do not confuse a granuloma with
granulation tissue" are teaching notes and should stay demoted. The audit is
judging by consequence, not by keyword.

## Other corrections in this batch

- **Mojibake in a clinical value.** The platelet transfusion threshold in
  `gastrointestinal.json` was written `&#8317;` — U+207D SUPERSCRIPT LEFT
  PARENTHESIS, not superscript nine — so it rendered as `<50×10⁽/L` instead of
  `<50×10⁹/L`. It is the only `&#8317;` in the deck; 113 other places write the
  exponent correctly. This is the rare case where changing a character is
  required rather than forbidden: the current glyph is not a value at all.
- **A card contradicting itself.** `liver.json` q[41] asks the transfusion
  target for a variceal bleed. Its answer says "Restrictive Hb 70–80 g/L,
  because over-transfusion raises portal pressure"; its own explanation said
  70–90. The explanation now matches the answer.
  **Not forced:** `liver.json` fc[49] also says 70–90 for a variceal bleed.
  That is a real guidance divergence — Baveno targets 70–80 for varices, while
  70–90 is the general upper-GI figure used across four other files — not a
  typo. Choosing between them deck-wide is a clinical editorial call. What was
  indefensible was one card disagreeing with itself at the point of testing.
- **The loose LP timing had a third home.** After correcting "~12 hours" on the
  `ct.json` flashcard, the same looseness survived in that file's MCQ:
  `options[2]`, `answer` and `explanation` all said "around" or "approximately"
  12 hours, against 25 places in 7 files saying *at least* 12 hours. The option
  and answer strings had to move together or the card breaks.

## Reported, not changed

- **Listeria cover age.** `neurological.json` adds amoxicillin for Listeria if
  ">50"; `neurophysiology-csf.json` says ">60" twice. UK sources genuinely
  differ (55 and 60 both appear in practice), so this is a clinician's call,
  not a typo to harmonise.
- **Kasai timing** is "before ~8 weeks" in `gastrointestinal.json` and "before
  60 days" in `paediatric.json` — two standard formulations of one cut-off, but
  two different numbers for one decision.
- **Migraine aura duration** is "5–60 min" in `neurological.json` and
  "~20–30 minutes" twice in `ophthalmic.json`.
- **Melaena volume.** "~50 mL of blood" appears exactly once in the deck with
  nothing to check it against. It matches standard teaching (50–100 mL);
  flagged only because it is unverifiable internally.
- **The 6-hour CT rule for SAH** sits alongside the flat "a normal CT does not
  exclude SAH". `neurology-neurosurgery.json` and `neurophysiology-csf.json`
  both say a normal CT within 6 hours effectively rules it out; `ct.json` says
  the unqualified form. Not factually contradictory, but a learner meeting only
  one of them gets a different rule.

## The grey-span audit: 362 safety clauses restored to full colour

My keyword scan found ~114 suspect grey spans. A full audit found the real
shape of the problem:

| | |
|---|---|
| Grey spans deck-wide | **5,993** (5,242 `fc-inline`, 751 `fc-caveat`) |
| Read and judged individually | 1,175 |
| **Un-greyed** | **362** — 194 `fc-caveat`→`fc-sub`, 168 `fc-inline`→plain body |
| Kept grey | 5,631 |
| Fields changed | 354, across 22 files |
| Word changes | **0** of 213,337 fields compared |

Every grey span in the deck sits in the `fc` map — none in `q` — so there was
no quiz-layer remediation to do, which is the first time this project has had
that luck.

### The rule applied

Un-grey when the span, read alone, changes what the reader **does or fails to
do**: a prohibition or contraindication not already stated in black; an urgent
or time-critical action; any "X does not exclude Y"; a lethal or irreversible
consequence of an action the reader might take; a drug-safety monitoring or
pre-treatment requirement; a drug choice in pregnancy or breastfeeding.

Keep grey when it explains *why* a black directive exists and names only a
non-lethal consequence, or when it is descriptive, terminological, an eponym, a
mnemonic or an exam-technique note.

That distinction is what a keyword list cannot make. `(avoid radiation)` is a
rationale. `Do not confuse a granuloma with granulation tissue` is terminology.
`Do NOT reduce mortality` is a pharmacology fact about loop diuretics. All
three match "avoid/do not" and all three should stay demoted. Meanwhile
`(NOT scrotal; avoids disrupting lymphatic drainage and seeding to inguinal
nodes)` matched nothing in my list — because `\bavoid\b` does not match
"avoids" — and is a genuine surgical prohibition. A third residual sweep after
the edits caught that one and two others.

### Borderline calls, reviewed and upheld

- **`(coning)`** stays grey in two raised-ICP cards. It is a one-word synonym
  gloss for tonsillar herniation; both the mechanism and the instruction to
  image first are already in black. This is the keyword I most consciously
  overrode.
- **"Do not offer betahistine for tinnitus"** and **"NICE says do not offer
  vitamin D solely to treat MS"** stay grey. Literal prohibitions, but the
  consequence is an ineffective prescription, not patient harm.
- **"A score <10% does not rule treatment out"** (QRISK3) stays grey, though
  "does not exclude" was otherwise treated as an absolute. Checked directly:
  the operative instruction, `≥10% → offer atorvastatin 20 mg`, is already in
  black, so the grey clause only softens it. The consequence is a missed
  conversation about primary prevention, not a missed diagnosis.
- **Mirror-image reassurances kept grey deliberately** — `(safe in
  breastfeeding)` stays demoted while `(not in pregnancy or breastfeeding)` was
  restored. Missing a warning harms someone; missing a reassurance does not.

### What remains

39 grey spans still match a crude safety-keyword search, down from 114. Every
one was read: two `(coning)` glosses, five "do not confuse" terminology notes,
three mnemonic/exam notes, two low-harm guideline prohibitions, one
pharmacology fact, four clarifications, and 19 uses of "avoid" or "never" as
rationale, lifestyle advice or idiom. None of them, read alone, changes what a
clinician does.

No `<strong>` was added to the restored clauses. Un-greying already returns
full size and colour, and bolding 362 clauses at once would breach the rule
that if six things are bold, none is.

## The boundary triage, done properly this time

Last time the scan produced 546 collisions and I reviewed the top twelve; one I
skipped was real. So I collapsed the 546 raw pairs into **104 subject groups**
(merging pairs that share vocabulary) and flagged the **29 "lopsided"** ones —
a settled majority against one or two outliers, which is the shape every real
fix so far has had. All 29 were read.

### Fixed: the INR threshold for acute liver failure

The published definition (AASLD/EASL) is coagulopathy with **INR ≥ 1.5**. The
deck said `>1.5` in **nine** fields across `liver.json` and
`risk-scores-criteria.json`, and `≥1.5` in three — two in `biochemistry.json`
and, tellingly, one in **`liver.json`'s own autoimmune-hepatitis card**. So that
file contradicted itself, and an INR of exactly 1.5 failed the definition on
nine cards, under-diagnosing a condition whose entire management is early
referral to a transplant centre.

**This is the first time in this sweep that the majority has had to move.** It
moves because a published definition decides, not a headcount. Four of the nine
were in the `q` layer, two of them an MCQ option and its matching answer string
which had to change together; one was a distractor describing acute-on-chronic
failure, which moved too, since what makes it wrong is the pre-existing
cirrhosis, not the INR.

### Fixed: 126 ASCII inequalities rendering literally

The deck uses the real `≥`/`≤` characters 2,651 times, but 126 places stored
ASCII `>=` / `<=` (some bare, some as `&gt;=`), which renders to the learner as
a literal `>=`. Squarely a visuals defect, and the largest single cosmetic
inconsistency found so far — 25 in `geriatric-medicine.json`, 16 in
`haematology.json`, 15 in `special-tests.json`.

**The interesting part is what nearly went wrong.** My first rule allowed a
preceding double-quote, on the reasoning that `">=` must be a JSON string
opening. It is not. The only such case in the deck is
`class=\"fc-num\">= 0</span>` — a **chip tag** followed by `= 0`. That rule
would have eaten the tag's closing bracket.

Nothing corrupt reached disk, because the run aborted on an unrelated assertion
first and I reverted. But I reverted anyway rather than keep the eight files
already written, because **the guard in place could not have proved they were
clean**: a `<span>` whose `>` has been eaten still leaves `<span` and `</span>`
balanced, so the tag-balance check passes. A guard that cannot fail on the
defect you are worried about is not evidence.

The rule is now whitespace or an opening bracket only, and the guard compares
the **full ordered tag sequence** of every field before and after. Both
protected cases — `<strong>= ACh` and the `fc-num` chip — are verifiably
untouched, and five real conversions were followed by a word rather than a digit
(`(>=grade 3)`, `>=T2`), which a digit-only rule would have missed.

### Read and deliberately not changed

- **Neutropenic sepsis temperature.** `>38°C` on seven fields (NICE's own
  wording is "higher than 38°C") against `≥38°C` on two. The majority matches
  the guideline; the outlier is the safer direction. Left, reported.
- **PUO duration** (`>3 weeks` vs `≥3 weeks`) and **morning stiffness**
  (`>30 min` vs `≥30 min`) — published wording genuinely varies for both.
- **Hyperemesis weight loss** — `>5%` on four fields (RCOG wording) against
  `≥5%` on one.
- **Kawasaki fever** `≥5 days` — the two apparent outliers were ASCII `>=5`,
  i.e. the same value in the wrong notation, now fixed by the notation pass.
- **False groupings the merge could not separate**, all confirmed by reading:
  back-pain red-flag `age >55` against upper-GI `age ≥55` (different decisions);
  lactate `>2 mmol/L` against SOFA `≥2 points` (different quantities); chronic
  pain `>3 months` against chronic bronchitis `≥3 months/year`; hypercalcaemic
  emergency `>3.0` against NICE cinacalcet eligibility `≥3.0`.

### Also fixed

- **Neutrophil count for neutropenic sepsis.** `<0.5 ×10⁹/L` in one
  `haematology.json` quiz explanation against `≤0.5` on five fields in the same
  file. NICE says 0.5 or lower; exactly 0.5 was excluded.

## Wave: MSK and neurological signs (in progress)

### Fixed: one drug name spelled two ways in one file

`neurological.json` wrote the Horner's pharmacological localisation test as
**hydroxyamphetamine** in the Horner's Syndrome topic (3 fields) and
**hydroxyamfetamine** in Ptosis and Abnormal Pupils (4 fields) — same drug, same
test, same file. The deck's other amfetamine drug names are uniformly INN/BNF
spelling (lisdexamfetamine ×16, dexamfetamine ×5), so the minority moved.

Scope kept deliberately narrow to this one named drug. The broader
`amphetamine(s)` vs `amfetamine(s)` split elsewhere is the general noun for a
drug class, where both spellings read naturally; changing that is a house-style
decision across many files, not a name disagreeing with itself.

### Fixed: 13 invisible characters

`bedside-tests.json` stored U+200B ZERO WIDTH SPACE inside its postural-drop
inequalities — `≥<ZWSP>20 mmHg systolic`. Invisible to the reader, so not a
visual defect, but it silently defeats every search: an audit of postural-drop
thresholds anchored on the value skipped those cards entirely. Same
false-negative class as the CHA₂DS₂-VASc subscript scan that returned zero hits
across 99 real mentions. The threshold is now findable in four fields where
search could not see it.

### The recurring shape: present in the app, absent where the learner meets it

Three agents independently hit the same pattern, and it is worth naming as a
class rather than a list of one-offs. A fact is in the deck, sometimes **in the
same file**, but not on the card that needs it:

- **"Oxygen saturations fall late in Guillain-Barré"** appears four times in
  `neurological.json` — Weakness, Bulbar Palsy, Ptosis — but not on the three
  GBS cards that say to monitor FVC.
- **"Folate before B12 precipitates subacute combined degeneration"** is in
  `haematology.json` five times; the three SACD/B12 cards in neurological signs
  carry no such warning.
- **"Irreversible cord damage"** in cervical myelopathy is in `msk.json` and
  `neurology-neurosurgery.json`; the Hoffmann's topic says only that a new
  myelopathy "should not be left to deteriorate".
- **Serotonin syndrome** is absent from Movement Disorders but present twice in
  the neighbouring Increased Tone topic of the same file.
- **Foot drop urgency** exists only in its full bilateral-triad form. No card
  anywhere says a foot drop with back pain alone, or with new bladder symptoms
  alone, warrants urgent imaging — though the general cauda equina rule is
  covered 138 times across 19 files.
- **A limping child's "never dismissed without excluding malignancy and
  infection"** exists only as two separate halves, never as the combined rule.

None of these is an app-level gap, so none was authored in. But the distinction
matters: a deck-wide absence is a content decision, whereas a fact sitting in
the topic next door is an editing decision, and the second is much cheaper to
fix.

### Verified correct, worth recording because they are easy to get wrong

- **Romberg's sign.** All 64 mentions deck-wide audited: not one card asserts it
  tests cerebellar function. Two cards state the correction explicitly ("it is
  **not** a test of cerebellar function", "NOT a cerebellar ataxia"). The 24
  Howship–Romberg hits in the hernia topics are a different eponym, correctly
  used.
- **Functional neurological disorder.** No card implies the symptoms are
  feigned; Hoover's is framed as a rule-IN sign and FND as a positive diagnosis
  rather than one of exclusion, corroborated in psychiatry. `respiratory.json`
  defines a different Hoover's sign (paradoxical rib movement in COPD) — both
  correct, neither cross-referencing the other.
- **Neurofibromatosis criteria.** `≥6` café-au-lait macules (inclusive) each
  `>5 mm` pre-puberty / `>15 mm` post-puberty (strict), consistent in every copy
  and matching the NIH wording. No endpoint-exclusion defect.
- **Kocher criteria** for septic arthritis: `>38.5°C`, `>40`, `>12` and the
  strict `>` identical across seven copies in four files.
- **Soft-tissue sarcoma red flags**: `>5 cm` strict and "deep to the fascia",
  identical in every copy across four files, with no `≥5 cm` variant anywhere.

### Reported, not changed

- **SUFE age range** is `10–16` in `msk.json` and `10–15` in `paediatrics.json`.
- **Ankle jerk root** is `S1` in four places and `S1–S2` in `lower-limb.json`;
  both are standard teaching.
- **Reflex root values** generally: `S1 / L3-4 / C5-6 / C7` in three files
  against the two-root form `S1–2 / L3–4 / C5–6 / C7–8` in
  `neurology-neurosurgery.json`.
- **Tetrabenazine's depression and suicidality contraindication** is on the
  Huntington's cards in `neurology-neurosurgery.json` but not on the Movement
  Disorders card that names the drug.
- **SAH CT sensitivity.** A Neck Stiffness card says CT is "near 100% sensitive
  early" without the 6-hour qualifier that `neurophysiology-csf.json` attaches,
  and without the flat "a normal CT does not exclude SAH" that `ct.json` states.
  It does carry the safety net of an LP at ≥12 h if negative.

### neurological.json complete — 708/708, 0 unformatted

Counted before writing this heading.

**One app-level gap found, and it is a safety one.** No card anywhere in the
deck states that **a partial or progressive third-nerve palsy needs imaging
whatever the pupil does**. Tested across several phrasings (partial /
incomplete / progressive within 120 characters of third / III / oculomotor and
of imaging / angiography / CTA / MRA / scan): zero hits.

This matters because three cards state the pupil rule flatly — "pupil-sparing =
microvascular (diabetes / hypertension)" — with no qualifier. The qualifier
does exist for the *complete* case: `neurology-neurosurgery.json` Brainstem /
Cranial-Nerve Syndromes says pupil sparing "only reassures in a COMPLETE,
isolated palsy in a vasculopath over about 50", and that ischaemic palsies
"involve the pupil in up to a fifth of cases". So the deck knows the rule is
conditional, but the sign topics where a learner meets a ptosis or a diplopia
state it unconditionally, and nothing anywhere covers the partial palsy.

Left for a clinician: writing it would be authoring new clinical content, which
is outside this pass. Flagged as the highest-priority content gap found so far.

**An entity-boundary defect the agent's own checks caught mid-build**, worth
recording because it is the fourth variant of the same bug: a list-splitting
rule matching on `"; "` matched the semicolon *inside* `&rarr;` and `&mdash;`,
eating the entity and splitting lines mid-sentence. Caught by the token check
before anything was written. The separator-inside-an-entity family has now
produced defects on `&gt;`, `&ge;`, `&ndash;`, `&rsquo;`, `&mdash;` and `&rarr;`.

**Checked and consistent** across files, recorded because each looked like a
contradiction at first pass: pilocarpine `0.1%` for Adie's versus `1%` for a
third-nerve palsy (different tests, both correct); Bell's palsy prognosis
`~70–85%` against "about 70% untreated, ~85% with early prednisolone" (the same
two figures as a range); MS relapse steroids `500 mg daily for 5 days` against
`0.5 g daily for 5 days` (same value, different unit).

### MSK signs: an anatomy error fixed, and a drug contradiction left for a clinician

**Fixed — NOF fracture, which fragment the muscles pull.** `msk.json` said "the
**proximal** fragment is pulled up and outward by the iliopsoas and short
external rotators"; `orthopaedics.json`, on the same question, says the pull is
on the **distal** fragment.

Anatomy settles this rather than a headcount. In a femoral neck fracture the
proximal fragment is the head and neck, which stays seated in the acetabulum.
The iliopsoas inserts on the lesser trochanter and the short external rotators
on the greater trochanter and intertrochanteric crest — **both on the distal
fragment**. So it is the distal fragment, the limb, that rides up and externally
rotates, which is exactly why the leg looks shortened and externally rotated.
One word, verifiable answer, corrected.

**Reported, not changed — GCA and aspirin. This is the highest-value content
item found in this wave.** `msk.json` says treatment includes "Add **aspirin**,
a PPI and bone protection". `msk-rheumatology.json` says, twice: "Routine
aspirin or antiplatelet therapy is **NOT** recommended for GCA itself; give it
only if there is a separate cardiovascular indication."

These cannot both be right, and current BSR guidance is against routine aspirin.
But resolving it means **removing a drug from a treatment list**, which is a
clinical decision, not a formatting one. The line I am holding: harmonising a
threshold (`>` to `≥`) is mechanical and reversible; adding or removing a
therapeutic recommendation is authoring. Flagged for a clinician.

**Also reported, not changed:**
- **Charcot foot referral timing.** `msk.json` says "the same day";
  `orthopaedics.json`, `endocrinology.json` and
  `neurology-neurosurgery.json` all say "within 1 working day (NICE)".
  `msk.json` is the outlier — but it is the *stricter* one, and I will not make
  guidance less urgent to win consistency.
- **GCA age threshold, deck-wide.** Stated as `>50` or "over 50" in **13 fields
  across 7 files**, uniformly. The ACR criterion is age **≥50** at onset, so the
  whole deck excludes its own endpoint — but consistently, with no internal
  contradiction. Deliberately not changed: unlike a SAAG of exactly 11, an EF of
  exactly 35 or an INR of exactly 1.5, which are rounded lab values that land on
  the boundary constantly, "anyone over 50" is screening prose and no clinician
  excludes GCA because a patient is 50 rather than 51. One house-style decision
  for a clinician, not nine separate fixes.
- **SUFE age** `10–16` (`msk.json`) vs `10–15` (`paediatrics.json`);
  **Duchenne onset** `3–5` vs `~2–5`; **occult NOF rate** "around 10%"
  (`mri.json`) vs "around 2–10%" (`msk-rheumatology.json`).
- **Kocher criteria variant:** `msk.json` lists "ESR/CRP ↑" where two other
  files use ESR alone. Not a numeric clash.

**Absences confirmed:** "a palpable gap may be absent" in Achilles rupture
appears nowhere in the deck — all 15 `palpable gap` hits treat it as a positive
finding — though the plantarflexion half ("preserved active movement does not
exclude a rupture") is present and correct. And no card phrases the Charcot/
cellulitis trap as a prohibition, though the distinction itself is well covered.

**A process note worth recording.** One agent found `msk.json` had changed on
disk mid-task, because I had applied a sibling agent's output to the same file.
It re-diffed all 140 of its own cards against its opening snapshot (zero
differences), re-ran its full verification suite against the live file, and only
then handed back. That is the behaviour the one-writer design is meant to
produce: agents read, I write, and a concurrent write to a different topic in
the same file is detectable and harmless rather than a silent race.

## msk.json complete — 528/528, 0 unformatted. And a better test for grey spans.

Counted before writing this heading. Wave one's eight agents are all applied:
**1,986 fields across 34 MSK and 26 neurological sign topics.**

### Seven more grey spans restored, and the rule that should have caught them

An agent independently audited all 5,677 grey spans in the deck and confirmed my
earlier remediation held: **zero grey spans anywhere contain "not exclude" or
"not rule out"**. But it found one my audit had missed, and chasing that shape
found six more:

| card | greyed text |
|---|---|
| Compartment Syndrome | `(especially on passive stretch)` |
| Bradycardias / Heart Block | `(hypotension, pallor, diaphoresis, cold extremities, confusion)` |
| Bradycardias / Heart Block | `(chest pain or ECG ischaemia related to the bradycardia)` |
| Limb Ischaemia | `(absent distal pulses — confirm with handheld Doppler)` |
| Limb Ischaemia | `(numbness/tingling — early nerve ischaemia, threatened limb)` |
| Tachycardia | `(or defibrillation for pulseless VT/VF)` |
| JIA | `— the eye is neither red nor painful —` |
| Sickle Cell Disease | `(fever is not required)` |

**Why the audit missed them.** Both pattern passes searched for *directive*
language — never, do not, urgent, contraindicated, does not exclude. Not one of
these contains a directive word, because they are clinical **findings**, not
instructions. Pain on passive stretch is an earliest sign of a limb-threatening
emergency. "The eye is neither red nor painful" is the entire reason JIA uveitis
screening exists. "Fever is not required" sits on the commonest cause of death
in sickle cell disease.

**The rule that already covered four of them, mechanically: rule 3 — if the
front asks for it, the back cannot demote it.** The fronts read "What are the
five life-threatening (adverse) features in bradycardia?" and "What are the 6
P's of acute limb ischaemia?" That makes every one of those features answer
content by definition, with no judgement about danger required. Checking a span
against its own front is both easier and more reliable than weighing how harmful
it would be to skim past it. That is the test to apply in any future sweep.

Left grey deliberately: `(foreign-body sensation, not true pain)` on bacterial
conjunctivitis. It is a discriminator, but the safety-critical form — "no
significant pain/photophobia, vision normal" — is already in the body of the
same card, so the gloss only explains it.

### A guard of mine that was wrong, and how

The first attempt at these edits compared tag-stripped text with tags replaced
by a **space**, and it failed on `confusion)</span>,` — there is no space before
that comma, so stripping the tag was *inventing* one, and removing the span
merged `confusion)` and `,` into a single token. No word changed and the rendered
text was identical; the guard was measuring an artefact of its own
normalisation.

For a tag-**removal** edit the correct comparison is what the reader actually
sees: tags stripped to the empty string. That is unsafe when a field contains a
bare `<`, so the script asserts no bare `<` in the field first and only then
makes the comparison. Worth recording because the space-strip is the right
default everywhere else in this project — it is specifically tag removal that
needs the other one.

### Two endpoint gaps found that no single card owns

Unlike the nine boundary fixes so far, these are gaps rather than overlaps —
a value that falls into **neither** category:

- **Morning stiffness.** Inflammatory is `>30–60 min`, mechanical is `<30 min`.
  A stiffness of **exactly 30 minutes satisfies neither.** The same shape appears
  in `msk-rheumatology.json` for rheumatoid arthritis and osteoarthritis, so it
  is a shared deck convention rather than one card's slip.
- **Monoarthritis tempo.** Acute is "(days)", chronic is "persisting `>6 weeks`".
  Exactly 6 weeks — and the whole 1-to-6-week band — falls in neither.

By contrast the joint-count boundaries partition cleanly and agree across
topics: 1 joint, 2–4, then `≥5`.

### Reported, not changed

- **Fibromyalgia: diagnosis of exclusion or positive diagnosis?** `msk.json`
  frames it as a diagnosis of exclusion in three places, including a front
  ("Why is fibromyalgia a diagnosis of exclusion...?"). `msk-rheumatology.json`
  says the opposite twice: "a POSITIVE clinical diagnosis... **not a diagnosis
  reached by ruling everything else out**", and its CFS card says the same. The
  modern ACR-2016/EULAR position favours `msk-rheumatology.json`. Fixing it means
  rewriting a question stem, which is authoring.
- **Synovial neutrophil fraction in septic arthritis:** `>90%` in `msk.json`
  against `>75%` in `msk-rheumatology.json`. Both figures are in the literature
  (>75% commoner, >90% more specific), so this is a harmonisation choice.
- **"Open fractures must not be closed primarily" appears nowhere in the deck.**
  Twenty candidate hits all proved unrelated. The nearest statements are "do NOT
  irrigate in the emergency department" and "refer for debridement in theatre".
- **"Septic arthritis is a surgical emergency"** as a phrase appears nowhere,
  though the concept is carried six times in other wording ("joint-threatening
  emergency", "destroys the joint within days").
- **"Normal WCC/CRP does not exclude septic arthritis"** exists in
  `msk-rheumatology.json` (with "around 40% are afebrile") but in none of the
  seven MSK sign topics where a hot joint is actually presented.

## Histology begins: basic tissues (epithelium, muscle, nervous, connective)

307 fields across four topics, clean.

### Another error in my brief, caught by the file

I briefed the apical junctional complex as "tight junction, then adherens, then
desmosome, **then gap junction**". The gap junction is **not** a member of the
classical apical junctional complex. No card in the deck includes it, correctly,
and the agent reported the divergence instead of "correcting" the file toward me.

That is the third time this project my brief has been wrong and the deck right —
after the lateral cervical film's four alignment lines and the non-existent
"3-3-1" bowel rule. The pattern is worth stating: a hint in a brief is a place to
look, never a fact to install, and the instruction that agents report divergence
rather than reconcile it has now paid for itself three times.

### Checked on all five axes and correct — the cardiac/skeletal muscle comparison

This is the single easiest table in histology to get reversed, so all five axes
were verified against every copy in the deck:
striation (skeletal + cardiac, not smooth); nuclei (skeletal **many, peripheral**
vs cardiac **1–2, central**); intercalated discs (cardiac only, with fascia
adherens + desmosomes + gap junctions); **T-tubules — cardiac diad at the Z line,
skeletal triad at the A–I junction**; and voluntary control (skeletal only).
Nothing reversed anywhere. Excitation–contraction coupling is also right: skeletal
DHPR mechanically coupled to RyR1 with little extracellular calcium, cardiac
calcium-induced calcium release via RyR2 requiring it.

Likewise **central versus peripheral myelination**, including the ratios — one
oligodendrocyte myelinating segments of up to ~50 axons, one Schwann cell to
exactly one internode — with zero reversals in 30 mentions across three files.

And the **pemphigus/pemphigoid** pairing: desmoglein for pemphigus vulgaris
(intra-epidermal) against BP180/BP230 hemidesmosome targets for bullous
pemphigoid (sub-epidermal), consistent across 68 mentions in five files with no
contradictions.

### Naming gaps in the deck, reported not filled

- **`E-cadherin` is never named as the adherens-junction protein anywhere.** All
  15 mentions are oncological (lobular breast carcinoma, CDH1 diffuse gastric,
  EMT). The adherens junction's protein is simply not given on any card.
- **`connexin`** appears once in the whole deck, and only as an MCQ distractor.
  The flashcard says "connexons", which is correct — a connexon is the hexamer of
  connexins — so this is a naming gap, not an error.
- **`desmocollin`** and **`macula adherens`**: zero hits deck-wide.

### Reported, not changed

- **Duchenne onset age** is now divergent in three places: `~3–5 yr` in
  `basic-tissues.json` and `msk.json`, `~2–5 yrs` in `paediatrics.json`.
- **Cardiac myocyte nuclei**: `1–2 central` in `basic-tissues.json` and
  `msk-rheumatology.json`, but "a **single** central nucleus" in
  `cardiovascular.json`. Not a swap, and 1–2 is the more standard statement, but
  the three cards do not agree.
- **"Satellite cell" is used in two correct but unrelated senses** in one file —
  the skeletal-muscle stem cell, and the glial cell of a peripheral ganglion.
  Both standard; flagged only because a learner meeting both in one deck will
  collide them.

### basic-tissues.json complete — 325/325, 0 unformatted

Counted before writing this heading. 649 fields across eight topics.

**This batch found no content errors at all**, which is worth recording rather
than passing over, because the checks were aimed squarely at the things that are
usually wrong in histology:

- **Haematoxylin and eosin are not reversed anywhere.** All six relevant cards
  are right: haematoxylin is the *basic* dye binding *acidic* (basophilic)
  structures, eosin the *acidic* dye binding *basic* (eosinophilic) ones,
  including the Romanowsky card and the cartilage-GAG basophilia card. This is
  the single most commonly muddled pair in the subject.
- **Every special stain is correctly attributed and unanimous deck-wide**: PAS
  (13 mentions), Congo red with apple-green birefringence (48), Perls' Prussian
  blue (24), Ziehl–Neelsen with auramine–rhodamine as the fluorescent
  alternative (48), reticulin silver, toluidine blue *by metachromasia*,
  Grocott's for Pneumocystis, Warthin–Starry for spirochaetes, von Kossa for
  calcium.
- **The osteoclast lineage is right**, which was the highest-risk item briefed:
  osteoclasts from the monocyte/macrophage haematopoietic line, with
  osteoprogenitor, osteoblast and osteocyte mesenchymal. **No card anywhere in
  the deck derives the osteoclast from mesenchyme.**
- **All three cartilage types are correctly sited**, corroborated from four other
  files (pinna and epiglottis elastic; intervertebral disc, pubic symphysis,
  menisci and TMJ fibrocartilage), with the no-perichondrium claim correctly
  limited to fibrocartilage and articular hyaline.

**One pair that looks like a contradiction and is not**, recorded so it is not
"fixed" later by mistake: hypersegmented neutrophils are `>5 lobes` in
`basic-tissues.json` and `≥6 nuclear lobes` in `haematology.json`. Those are
arithmetically identical.

**Absences confirmed, reported not filled:** no card anywhere teaches **van
Gieson on its own as a collagen stain** — all three mentions are
"Verhoeff–Van Gieson" for elastic fibres, consistently. And `haematology.json`
carries **no white-cell differential percentages, no haematocrit reference range,
no red-cell or platelet diameters and no platelet lifespan** at all, so the
figures in `basic-tissues.json` have nothing to disagree with.

**A brief/file divergence handled correctly again:** I briefed "van Gieson" as a
stain to check; the file uses only the abbreviation "EVG". The agent marked what
was there and did not expand, rename or gloss it.

## Pathological histology: inflammation, granulomas, cell death, neoplasia

330 fields across four topics, clean. A second batch with **no content errors**,
again on checks aimed at the classic reversals:

- **Caseating versus non-caseating is uniform across the deck** — 98 anchored
  mentions, caseating to TB, non-caseating to sarcoidosis, Crohn's, foreign body
  and berylliosis, corroborated in eleven other files. **No card anywhere
  reverses it.**
- **Apoptosis versus necrosis is right on all four axes** — membrane integrity,
  inflammation, ATP dependence and caspases (8 extrinsic, 9 intrinsic, 3/6/7
  executioners, 1 pyroptosis, necroptosis explicitly caspase-independent). The
  wrong versions ("apoptosis ruptures the membrane") exist only as MCQ
  distractors. `caspase` appears nowhere else in the deck, so there is no copy to
  disagree.
- **Coagulative versus liquefactive** is consistent, including the brain as the
  classic exception, and agrees with the caustic-injury cards in three other
  files (alkali liquefactive, acid coagulative).

### A flag I checked and declined to act on

The agent noted that `cardiovascular.json` contains the deck's only pairing of
Langhans giant cells with *non-caseating* granulomas, in an MCQ option, and
suggested it needed review. I read the card: the question is "Which histological
finding confirms cardiac amyloidosis?", the keyed answer is Congo red with
apple-green birefringence, and that option is a **distractor describing cardiac
sarcoidosis**. Langhans-type giant cells genuinely occur in sarcoid granulomas as
well as in TB, so the distractor is not internally wrong — it is simply not the
answer to that question. Nothing to fix.

Recording it because declining is as much part of this work as correcting: an
agent flag is a place to look, not a verdict, and three of the flags this session
have turned out to be correct content (the Camitta criteria for severe aplastic
anaemia, the Wilson's copper threshold, and now this).

### Absences confirmed, reported not filled

- **No numeric grading threshold anywhere in these four topics.** The neoplasia
  cards are entirely qualitative on capsule, invasion, mitotic rate, pleomorphism
  and nuclear-to-cytoplasmic ratio. Numeric systems do exist elsewhere and do not
  conflict — Nottingham/SBR in `breast.json`, Ki-67 bands and the Weiss criteria
  in `endocrine.json`, Breslow in `dermatology.json`.
- **Congo red appears nowhere in these topics**, including the card on reactive
  AA amyloidosis, which names SAA and AA amyloid but no stain. It is present and
  correct in two other files, so this is a topic-level absence.

### A nuance worth distinguishing from a contradiction

`infectious-disease-immunology.json` lists granulomatosis with polyangiitis under
"non-caseating", while the granuloma topic here calls GPA a "necrotising
granulomatous vasculitis" and omits it from the non-caseating list. Two files
draw the boundary differently in wording; no value conflicts and neither is wrong.

### pathological-histology.json complete — 338/338, 0 unformatted

665 fields across eight topics. Third histology file finished, and the third
consecutive batch with no content error requiring a fix.

**Verified correct, on the reversals that matter:** the
metaplasia → dysplasia → CIS → invasive sequence with reversibility attributed
to the right steps (CIS is nowhere called reversible, and invasion through the
basement membrane is named as the irreversible one); plaque components and the
thin-cap/large-core vulnerability rule, agreeing with `cardiovascular.json` in
six places; Virchow's triad across five files; the type III → I collagen switch;
and every tumour-histology attribution — **keratin pearls appear 32 times deck-wide
and no file attributes them to a non-squamous tumour**, with intercellular
bridges, gland formation, mucin, signet-ring cells, p40/p63, GATA3, TTF-1 with
its invasive-mucinous exception, and CK7−/CK20+ all consistent.

### A discrepancy I am reporting rather than fixing, and the reason why

`pathological-histology.json` credits the goblet-cell-requiring Barrett's
definition to **US/CAP** in three fields; `gastrointestinal.json` credits the
same definition to **US/ACG** in two. The clinical substance is identical and
correct in both — the UK/BSG definition needs only a columnar-lined oesophagus,
the American one also needs intestinal metaplasia.

I fixed the NOF proximal/distal error earlier and am not fixing this, and the
distinction is worth stating because it is the line I am holding generally.
**Anatomy is verifiable from first principles**: the iliopsoas inserts on the
lesser trochanter, which is on the distal fragment, and that settles it without
reference to any source. **Which professional body published a definition is a
citation**, and correcting it means asserting a fact about authorship from
recall while the deck itself disagrees with itself. A student learning "the
American definition requires goblet cells" gets the right medicine from either
acronym. Flagged for someone who can check the source.

### Absences confirmed, reported not filled

- **No card states that carcinoma in situ is irreversible.** The deck names
  invasion as the irreversible step and calls metaplasia and dysplasia
  "potentially reversible", but never closes the loop on CIS.
- **The ≥1 cm segment-length criterion for Barrett's is absent** from these
  topics, though both `gastrointestinal.json` and `upper-gi.json` carry it.
  Anchored search for any centimetre value across the four topics: zero hits.
- **No Barrett's surveillance interval** here either — so, consistent by
  omission with `upper-gi.json`'s 2–3 year / 3–5 year figures rather than in
  conflict with them.

### Hedging difference worth knowing about

`basic-tissues.json` calls metaplasia flatly "**a reversible** change", while
this file is more careful — "*potentially* reversible", and "many established
metaplasias (Barrett's, gastric intestinal metaplasia) persist and rarely fully
regress". Not a factual conflict, but the second is the better teaching and the
two files will read differently to a student.

### Deck hygiene, flagged not acted on

`Fibrosis & Repair` cards 10 and 34 are **near-duplicates** — the same four
wound-strength figures (~10% at one week, ~70–80% plateau by three months, never
100%) in different phrasing. Both were marked up. Merging them is an editorial
call.

Also incidental, in files outside this batch: the two **Krukenberg** cards
disagree on the alternative primary — `obstetrics-gynaecology.json` says
"gastric — or breast", `reproductive.json` says "gastric (or colonic)". Both are
recognised primaries, so neither is wrong.

## A duplicate-card sweep, and why none of them should be deleted

Agents have flagged near-duplicate cards by hand several times now (the two
wound-strength cards in Fibrosis & Repair, Shenton's line in two plain-film
topics, the TOE indication triad stated four times). Since duplicates are
allowed to be deleted, it was worth measuring the real scale before anyone acts.

**Result: 28 groups of same-topic duplicate fronts, and ZERO of them have an
identical back.** That single fact settles what to do with them: every pair says
two different things, so deleting either member loses content. They are
candidates for **merging**, which is authoring, not for deletion. Reported, none
touched.

The genuine pairs cluster into one recognisable pattern — a terse front and a
full one asking the same thing, which looks like two generations of card
authoring merged:

| topic | the pair |
|---|---|
| DVT | "Virchow's triad?" / "What is Virchow's triad?" |
| DVT | "Post-thrombotic syndrome?" / "What is post-thrombotic syndrome?" |
| Cushing's | "Treatment of Cushing's disease?" / "What is the treatment for Cushing's disease?" |
| Addison's | "Waterhouse-Friderichsen syndrome?" / "What is Waterhouse-Friderichsen syndrome?" |
| Skin Cancer | "What is an actinic (solar) keratosis?" / "What is actinic keratosis (solar keratosis)?" |
| Anaemia | "What causes megaloblastic macrocytic anaemia?" / "What are the megaloblastic causes of macrocytic anaemia?" |

### Two methodological notes, because the first version of this scan was wrong

**Dropping short tokens destroyed the signal.** The first pass ignored tokens
under three characters and produced 373 "duplicate" groups — because the
distinguishing token *was* the short one: Category **1/2/3/4** pressure ulcer,
hepatitis **A/B/C/D/E**, Ground **A/B/C/D/E** of the Abortion Act, Type
**I/II/IV** hypersensitivity. Every one of those was a false positive, and they
buried the 28 real ones.

**Comparing token SETS is order-blind, and some cards differ only by order.**
These remaining false positives are genuinely complementary pairs that a set
comparison cannot separate:
`low target + HIGH pituitary hormone` against `high target + LOW pituitary
hormone`; `HIGH TSH + LOW free T4` against `LOW TSH + HIGH free T4`; "how does
bullous pemphigoid differ from pemphigus vulgaris" against the same question
reversed. Any future duplicate detection needs to be order-sensitive.

### Cross-file repeats are not duplication at all

The scan also found 272 groups spanning topics or files — Sister Mary Joseph's
nodule on four cards, the cauda equina red flags on four, the 6 P's of acute limb
ischaemia on four, Fitz-Hugh-Curtis on four. **These should stay.** The deck is
organised three ways at once — by system, by presenting sign, and by
investigation — so a student revising "Abdominal Mass" and one revising
"Cholangiocarcinoma" should both meet Sister Mary Joseph's nodule. That is
deliberate redundancy across access paths, and removing it would damage the deck
rather than tidy it.

## Reproductive histology: testis, prostate, endometrium

230 fields across three topics, clean.

### Two backs deliberately left unmarked — a documented exception to the count

`Testis` cards 5 and 19 are pure ordered sequences:
`Spermatogonia → primary spermatocytes → secondary spermatocytes → spermatids →
spermatozoa`, and the excurrent duct chain from seminiferous tubule to vas
deferens. Every element is the answer. Bolding all five or six breaches rule 4
("if six things are bold, none is"); bolding one arbitrarily privileges a stage;
and a `<ul>` would require deleting the `→` characters, which are content.

So both backs stay plain, with only their fronts marked. **This means my
back-only counting predicate will report reproductive.json as having 2
unformatted cards forever.** Recording it here rather than special-casing the
counter — a simple predicate with documented exceptions is more honest than a
predicate tuned to produce a zero.

### Verified correct, on the classic swap

**Sertoli versus Leydig is right on all eight load-bearing cards**, and 52
anchored mentions deck-wide contain no card attributing the blood-testis barrier,
FSH, androgen-binding protein, inhibin or AMH to Leydig cells, or testosterone,
LH or Reinke crystals to Sertoli cells. The barrier is correctly the tight
junctions *between adjacent Sertoli cells* dividing basal from adluminal
compartments; Charcot-Böttcher crystals are Sertoli and Reinke crystals Leydig on
both the definition card and the contrast card.

**The prostate zones have zero disagreement across the entire deck** — 22
substantive statements in four files, all transition/periurethral zone for BPH and
peripheral zone for carcinoma, one of them explicitly adding "(not peripheral
zone)". The only inverted strings anywhere are MCQ distractors with the correct
answer recorded.

**The endometrial cycle checks out on every day number** — ovulation ~day 14,
sub-nuclear vacuoles ~days 16–17, predecidual change ~day 23+, implantation window
days 20–24 (≈LH+7), menstrual phase days 1–4 — and is mutually consistent with
`obstetrics-gynaecology.json`'s fixed 14-day luteal phase and day-21 mid-luteal
progesterone.

### Reported, not changed

- **Gleason score construction — a genuine three-way divergence.** The flashcard
  says the biopsy score is "the primary pattern + the **highest-grade** pattern
  present"; the MCQ explanation in the same topic says "the two **commonest**
  patterns are summed"; `urology.json` says "the primary and **secondary**
  patterns are summed". The first is the current ISUP biopsy rule and the others
  are the classic/prostatectomy rule, so all three are defensible in context —
  which is exactly why resolving it is a clinician's call rather than mine.
- **Spermatogenesis duration** is `64–74 days` here, and `obstetrics-gynaecology.json`
  says `~74 days` in four places but `~72 days` in a fifth. The inconsistency is
  internal to that other file; this card's range spans both.
- **Peripheral-zone cancer proportion** varies within `urology.json` alone:
  `~70–75%` on a flashcard against `~70–80%` in a quiz explanation.
- **Terminology:** this file writes "transitional (periurethral) zone",
  `urology.json` mixes "transition zone" and "transitional zone". Same zone,
  but it would show up in any string-match audit.

### A false-positive class worth naming

Anchored search for `Charcot-Böttcher` returns 3 hits, all in this file. The same
search **unanchored on "Charcot" returns 266 phantom hits across 21 files** —
Charcot joint, Charcot's triad, Charcot-Marie-Tooth. And `Reinke` hits `ent.json`
too, but for **Reinke's oedema** of the vocal cords, an unrelated eponym. Both
are the eponym-collision version of the false-negative problem that has bitten
this project repeatedly from the other direction.

### lymphoid-immune.json complete — 192/192, 0 unformatted

383 fields across six topics. Clean, and clean on the two swaps that matter most:

- **Lymph node compartments are not swapped on any of six cards** — cortex and
  follicles B-cell, paracortex T-cell with interdigitating dendritic cells — and
  agree with the MALT and spleen cards.
- **Thymic selection is placed correctly**: positive selection in the **cortex**
  ("death by neglect"), negative selection in the **medulla and at the
  corticomedullary junction**, stated independently on two cards, with AIRE
  correctly attributed to medullary cells and Hassall's corpuscles in the medulla
  on all three cards that give a location.
- **The splenic PALS is correctly a T-cell cuff** around the central arteriole
  with B-cell follicles attached, and the marginal zone correctly at the
  white/red interface.

**The post-splenectomy safety content is present and agrees with every copy in
the deck** — vaccination plus antibiotic prophylaxis, lifelong risk of rapidly
fatal OPSI, and the pneumococcus/meningococcus/Hib organism list, matching four
other files. It is in the body and bolded, not greyed.

### An absence in a file I named in the brief

I told the agent to check the splenectomy requirement against
`immunology-serology.json`. **That file contains no splenectomy or OPSI content at
all** — zero hits for `spleen` and `OPSI`, and its one `splen` hit is
"splenomegaly" in an EBV Monospot stem. So there was nothing there to agree or
disagree with, and the deck's authoritative version lives in
`infectious-disease-immunology.json`. Another case of my brief pointing at the
wrong file and the agent checking rather than assuming.

The operational detail — phenoxymethylpenicillin, the vaccine list, the ≥2-week
timing, the patient alert card — is **absent from the spleen topic** (zero hits
for each) and lives only in `infectious-disease-immunology.json`. A learner
drilling the spleen histology topic meets "vaccination and antibiotic
prophylaxis" without the specifics. Topic-level absence, not filled.

### Two nuances that are scope differences, not contradictions

- The thymus cards derive it from the **3rd** pharyngeal pouch, while
  `embryology.json` attributes DiGeorge to failure of the **3rd and 4th**. Both
  correct — the 4th gives the superior parathyroid — just narrower scope.
- A MALT card says selective IgA deficiency "can cause anaphylactic reactions to
  IgA-containing blood products" unqualified, where
  `infectious-disease-immunology.json` adds that the risk is confined to those
  with anti-IgA antibodies and that routine pre-transfusion screening is
  therefore not required. A completeness difference.

### Zero block devices used in 192 cards, and the reason is structural

No back in this topic has a second sentence. Every one is a single sentence, so
any `fc-sub` or `fc-caveat` would have split a sentence across the dividing rule
and stranded a `;` or `—` above it. The agent used neither device at all rather
than force one — the right call, and a useful datapoint that the device counts
in these reports are driven by the source's sentence structure, not by taste.

## Endocrine and reproductive histology complete

`endocrine.json` histology **194/194, 0 unformatted** (384 fields).
`reproductive.json` histology **304/304, 2 unformatted** — those two being the
documented spermatogenic-sequence exception above (375 fields this batch).

### Fixed: a structure with the wrong name

`embryology.json` calls the 4th-pouch structure the **"ultimopharyngeal body"**
in four fields. The accepted term is the **ultimobranchial body**, and
`endocrine.json`'s thyroid card already uses the correct form — so the deck
disagreed with itself on the name of one structure. Both files already agreed on
the substance (4th pouch, neural crest, gives the calcitonin-producing C cells),
so only the name moved.

Corrected rather than reported because it is a **verifiable term, not a
citation** — the same category as the hydroxyamfetamine spelling, and distinct
from the Barrett's CAP/ACG question where correcting would mean asserting which
professional body published a definition from recall.

### Verified correct on the classic swaps

- **Adrenal zones and products in order on every card, no swap** — glomerulosa
  aldosterone, fasciculata cortisol, reticularis androgens — with the correct
  mechanism (glomerulosa lacks CYP17, so it cannot make cortisol or androgens)
  and the medulla's chromaffin cells as modified postganglionic sympathetic
  neurons of neural-crest origin. Agrees with `endocrinology.json`.
- **The posterior pituitary correctly stores rather than synthesises**, stated
  twice, with ADH to the supraoptic and oxytocin to the paraventricular nucleus,
  and the anterior lobe from Rathke's pouch. Corroborated in six places across
  two other files.
- **Follicular versus parafollicular C cells correct on every card**, corroborated
  in eleven places. The gastric "chief cells" elsewhere in the deck are never
  blurred with parathyroid chief cells.
- **Islet proportions and the two-cell ovarian model both right** — theca makes
  androgens under LH, granulosa aromatises under FSH, with the reciprocal enzyme
  deficiency stated. A swap here is the classic error and it is not present.
- **The cervical transformation zone is correctly defined** as the region between
  the original and new squamocolumnar junctions, with the biopsy-target logic
  explicit and the right reason (actively dividing metaplastic cells are
  susceptible to HPV integration). HPV types and CIN grades have **no
  disagreement anywhere in the deck**.

### The highest-value content finding in this batch, reported not changed

**`obstetrics-gynaecology.json` conflates the transformation zone with the
squamocolumnar junction.** Asked the same question, it answers "**The
squamocolumnar junction** — a dynamic zone that moves with oestrogen", and another
card writes "the transformation zone (squamocolumnar junction)" as though they
were the same thing. They are not: the transformation zone is the region *between*
the original and the new SCJ. `reproductive.json` has it right.

This is a real teaching error rather than a wording difference, but correcting it
means rewriting a definition, which is authoring. Flagged as the item most worth a
clinician's attention from this batch.

### Also reported, not changed

- **Luteo-placental shift timing:** `~7–9 weeks` in `reproductive.json` against
  `~8–12 weeks` twice in `obstetrics-gynaecology.json`. Barely overlapping ranges
  for the same event.
- **Prolactin threshold in different units:** `>200 ng/mL` here against
  `>5000 mU/L` in `endocrinology.json`. 200 ng/mL ≈ 4200 mU/L, so it is the same
  rule, but the deck teaches it in two unit systems.
- **Cervical adenocarcinoma share:** `~20–25%` against `~20%`.

### Absences confirmed deck-wide

- **Which follicular stages are gonadotrophin-dependent appears nowhere in the
  deck.** No card says early growth (primordial to preantral) is
  gonadotrophin-independent while antral and Graafian growth is FSH-dependent.
  I named this mapping in the brief; the file does not contain it, so nothing was
  added.
- **No single "name the follicular stages in order" card exists** — the four
  stages appear only as four separate cards, and `primordial follicle` and
  `Graafian` occur only in this one topic deck-wide.

### A rule-4 judgement I agree with

Two agents independently bolded **one term per `<li>`** on enumeration cards
(the breast duct system, the placental barrier layers, the islet cell types)
rather than obeying "if six things are bold, none is" literally. That is right:
rule 4 guards against six *competing* bolds within one claim, not against a
structural list where every item is the retrieval target and the front asks for
the whole set. Leaving those bare would have left the card's entire answer
unmarked.

### skin-special-senses.json complete — 288/288, 0 unformatted

573 fields across seven topics, the largest single-agent assignment of the project.

### Fixed: the cystic fibrosis sweat chloride threshold

The CF diagnostic threshold is **≥60 mmol/L** (30–59 intermediate, <30 normal).
The deck said `≥60` in **nine** fields across three files and `>60` in **four**,
all inside `respiratory.json`'s Goblet Cells & Cilia topic.

At exactly 60 mmol/L those four cards move a **diagnostic** result into the
**intermediate** band — in a child with suggestive symptoms, a delayed CF
diagnosis. Majority, published threshold and direction of harm all pointed the
same way, so the outlier topic moved. One of the four sat inside an `fc-num`
chip, so the anchor had to carry the tag; my first plain-text anchor could not
match it and the run aborted before writing anything, which is the guard working
as intended. Two others were an MCQ option and its matching answer string.

### Verified correct on the reversals that matter

- **Pemphigus versus pemphigoid is consistent across the ENTIRE deck** — checked
  against 14 cards in `dermatology.json`, four in `basic-tissues.json`, and cards
  in three more files. Every one puts pemphigus intra-epidermal with
  anti-desmoglein at the desmosome, and pemphigoid sub-epidermal with
  anti-BP180/BP230 at the hemidesmosome. **No intra- versus sub-epidermal swap
  anywhere.** The basement-membrane ladder card correctly places dystrophic
  epidermolysis bullosa at type VII collagen below the lamina densa.
- **The organ of Corti is right on all four points** — inner hair cells as the
  transducers carrying ~95% of afferent CN VIII signal, outer hair cells as the
  prestin-driven amplifier receiving mostly efferent input, base-to-apex tonotopy
  (stiff narrow base high frequency), and high frequencies lost first because the
  basal outer hair cells are most vulnerable. That last point matches `ent.json`
  in substance.
- **Light passes through the inner retina to reach the photoreceptors**, stated
  explicitly, with the ten retinal layers in standard order and the fovea
  correctly cone-only and avascular.
- **Taste innervation correct** — CN VII chorda tympani anterior two-thirds, CN IX
  posterior third, CN X epiglottis — agreeing with seven other files.
- **The stratum lucidum is correctly restricted to thick skin** on all three
  cards that mention it.

### An app-level gap worth naming

**`Merkel cell carcinoma` returns zero hits in the entire deck.** Merkel cells
and their CK20 perinuclear-dot marker are covered, but the malignancy is absent
everywhere — not a topic-level absence. Reported, not authored.

### Reported, not changed

- **Ménière's is a "tetrad" here and a "triad" in `ent.json`** — the same four
  features either way (episodic vertigo, tinnitus, aural fullness, fluctuating
  low-frequency sensorineural loss), just a different count label.
- **Taste laterality** is specified as ipsilateral VPM and gustatory cortex here,
  and left unspecified in `neurology-neurosurgery.json`. Less specific, not
  contradictory.
- **Intra-file duplication:** hidradenitis suppurativa has near-duplicate cards in
  the Hair Follicle and Sweat Glands topics, and Muir–Torre appears twice in Hair
  Follicle. Mutually consistent.

### An editorial choice I want on the record

On the two ordered-layer cards — the five epidermal layers and the ten retinal
layers — the agent bulleted the items but left them **unbolded**, on the grounds
that bolding nine of ten would imply a hierarchy the card does not claim. That is
the same reasoning as the spermatogenic-sequence exception, reached
independently, and I agree with it: where the answer is an ordered set, the
ordering is the content and selective emphasis distorts it.

## renal.json histology complete — 210/210, 0 unformatted

415 fields across six topics.

### THE HIGHEST-PRIORITY CONTENT ITEM OF THE PROJECT SO FAR

**The deck tells a reader both that loop diuretics treat hypercalcaemia and that
they do not.** Two cards in the Tubules topic say they do:

- `Tubules[30].back` — "…so calcium excretion rises (hypercalciuria) — **the
  basis for loop diuretics in hypercalcaemia**"
- `Tubules[21].explanation` — "raising calcium excretion **(useful in
  hypercalcaemia)**"

Against that, **seven** statements across three files say the opposite, several
in terms:

- `renal.json` Foundations[14] — "a physiological fact, **not a treatment**"
- `renal.json` Foundations[4] — "…but **that does not make them a treatment**"
- `renal.json` Foundations[144] — "**not a treatment for hypercalcaemia**"
- `renal.json` Electrolytes[21] — "**Furosemide is no longer routinely
  recommended**"
- `haematology.json` Myeloma[30] — "**loop diuretics are not first-line**"
- `endocrinology.json` — an entire run of cards: furosemide **only after** IV
  rehydration, giving it before fluids is "**dangerous and contraindicated**",
  and an MCQ whose keyed answer is "**Furosemide caused diuresis, leading to
  haemoconcentration and worsened hypercalcaemia**"

**Why this matters more than the earlier contradictions.** The GCA aspirin item
was a genuine dispute — two files, two defensible positions, current guidance
favouring one. This is not a dispute. **The deck has already adjudicated it**, in
writing, in the same file: one card exists specifically to say that the physiology
does not license the treatment. The two Tubules cards carry an **un-propagated
correction** — someone fixed this and missed two fields.

And the harm path is already documented inside the deck: a student who learns
"loop diuretics are useful in hypercalcaemia" may give furosemide to a dehydrated
hypercalcaemic patient, which the endocrinology cards call dangerous and
contraindicated, causing haemoconcentration and **worsening** the very
hypercalcaemia being treated.

**I am still not changing it**, and the reason is consistency rather than
comfort. I ruled earlier that harmonising a threshold is mechanical while adding
or removing a **therapeutic recommendation** is authoring, and I declined the GCA
aspirin item on exactly that basis. Reversing that here because this instance
feels worse would make my own line unpredictable, which is worse than being
conservative.

What makes this cheap to fix for whoever owns the content: **it is two fields, and
the correct wording already exists elsewhere in the same file.** No new clinical
judgement is required — only propagating a decision the deck has already made.

### Verified correct — the whole high-risk list came back clean

- **The filtration barrier order is right in all six statements deck-wide**
  (fenestrated endothelium → GBM → podocyte foot processes), and both reversals
  appear only as MCQ distractors with the correct answer keyed. **The negative
  charge is attributed to the GBM and its heparan sulfate on every card that names
  a layer** — no card mislocates it.
- **No transporter is on the wrong segment**, checked by reading around 30 NKCC2,
  14 NCC and 33 ENaC mentions: PCT bulk reabsorption with SGLT2, thick ascending
  limb NKCC2 with loop diuretics, DCT NCC with thiazides, collecting duct ENaC
  plus aquaporin-2 and ROMK under aldosterone and ADH.
- **Tubuloglomerular feedback runs the right way** — raised macula densa NaCl →
  adenosine → afferent constriction → reduced GFR and reduced renin; the reverse
  via COX-2/PGE2. No reversal anywhere, and the SGLT2-inhibitor mechanism is
  consistent with it.
- **Podocyte effacement is correctly minimal change disease** (normal light
  microscopy, negative immunofluorescence) against granular immunofluorescence for
  immune-complex disease and linear for anti-GBM.

### Also reported, not changed

- **"Main size barrier" is attributed two ways**: the basement membrane in one
  topic, the podocyte slit diaphragm in another. The *charge* attribution agrees
  everywhere; only size diverges.
- **Commonest primary adult nephrotic syndrome**: FSGS unqualified in one topic,
  membranous "in older White adults" in another. Reconcilable via the qualifier,
  but one states it flatly.
- **Charge-selectivity loss** is attributed to the podocyte in one quiz
  explanation where the flashcards locate the charge barrier in the GBM.
- **Type 3 renal tubular acidosis is absent from the whole deck** — normal for
  this syllabus, flagged only because "three main types" could be read as
  complete.

## FIXED (authorised): loop diuretics and hypercalcaemia

The user authorised this after I flagged it, so the two Tubules cards now say what
the rest of the deck says.

**What changed — only the therapeutic inference:**

- `fc Tubules[30].back` — "…so calcium excretion rises (hypercalciuria) — ~~the
  basis for loop diuretics in hypercalcaemia~~" → "**a physiological effect, not a
  treatment for hypercalcaemia**"
- `q Tubules[21].explanation` — "raising calcium excretion ~~(useful in
  hypercalcaemia)~~" → "(a physiological effect, not a treatment for
  hypercalcaemia)"

**The replacement text is not invented.** Both phrases are lifted verbatim from
the deck's own corrective cards: Foundations[144] already says "a physiological
effect… not a treatment for hypercalcaemia", and Foundations[14] states the full
position — "that is IV fluids then an IV bisphosphonate, with a loop only if the
patient becomes fluid-overloaded". This was propagating a decision the deck had
already made, not making a new one.

**The physiology was preserved and asserted intact**: the guard requires ROMK, the
lumen-positive transepithelial voltage, NKCC2, claudin-16/19, the paracellular
calcium and magnesium reabsorption, and hypercalciuria all to survive verbatim in
the flashcard. Every one does. Nothing about the mechanism changed; only the
clinical conclusion drawn from it.

Verified at **zero** deck-wide: no card anywhere now presents a loop diuretic as a
treatment for hypercalcaemia.

**Why I asked first rather than doing this unprompted.** I had ruled that
harmonising a threshold is mechanical while adding or removing a therapeutic
recommendation is authoring, and declined the GCA aspirin item on that basis.
Acting here without asking would have made that line unpredictable. With
authorisation the rule is intact and the change is made — and the GCA aspirin item
remains open, because it is a genuine dispute between two files rather than an
un-propagated correction, and nobody has adjudicated it.

## immunology-serology.json complete — 193/193, 0 unformatted

386 fields across eight topics. The whole high-risk list came back clean, which
matters here because autoantibody attribution is easy to get subtly wrong:

- **Sensitive versus specific is right on every card** — ANA sensitive but
  non-specific, anti-dsDNA and anti-Sm specific, RF sensitive against anti-CCP
  specific, anti-intrinsic-factor specific against anti-parietal-cell sensitive.
  **No card anywhere swaps the two properties**, and it agrees with three other
  files.
- **Linear versus granular immunofluorescence matches `renal.json` exactly** —
  smooth linear IgG along the GBM for anti-GBM, granular for immune-complex,
  pauci-immune for ANCA.
- **c-ANCA/PR3 and p-ANCA/MPO are correctly mapped**, and **AMA for PBC against
  ASMA and anti-LKM for autoimmune hepatitis matches `liver.json` term for term.**
- **The coeliac safety point is intact and was promoted**: the requirement to be
  eating gluten when tested is now bold, with the IgA-deficiency caveat and the
  IgG-based fallback both in the body. A gluten-free diet normalising the serology
  is a real cause of missed coeliac disease.
- **44 numeric expressions audited and not one inequality excludes its own
  endpoint wrongly** — the inclusive ones (`≥12 weeks`, `≥3 vertebral segments`,
  `≥10%` clonal plasma cells, `≥3 mm` wheal) and the correctly exclusive ones
  (`CD4 <200`, `<45 years` onset, `>1000 IU/mL` IgE) are each right for what they
  measure.

### A flagged grey span that I checked and am keeping grey

The agent flagged `infectious-disease-immunology.json`'s
"**Polyarteritis nodosa is characteristically ANCA-negative.**" sitting in an
`fc-caveat`, as possibly the same tone defect I have been remediating. I applied
both of my own tests and it passes:

- **The front-asks rule does not bind.** The front is "Which diseases are
  associated with cANCA and pANCA?" PAN is *not* associated with ANCA, so its
  negativity is not part of that answer — it is a contrast note saying the disease
  you might expect on the list is not on it.
- **The consequence test does not bind either.** The load-bearing clause on that
  card — "pANCA is positive in only about a third of eosinophilic GPA, so **a
  negative ANCA does not exclude it**" — is already in the body, correctly. What
  is greyed is the adjacent contrast.

So this is a legitimate `fc-caveat`: a trap aside the front does not ask for,
whose loss costs a learner a distinction rather than a patient anything. Recorded
because the agent raised it in good faith and the answer is instructive — the
tests exist precisely so this call is repeatable rather than a matter of taste.

### Absences confirmed, reported not filled

- **The EGPA sensitivity caveat is missing from this file's ANCA cards.** "pANCA
  is positive in only about a third of eosinophilic GPA, so a negative ANCA does
  not exclude it" exists in `msk-rheumatology.json` and
  `infectious-disease-immunology.json` but not in `immunology-serology.json`,
  whose ANCA-mapping cards state the associations without it.
- **`liver.json` quantifies AMA at ~95% with 5–10% AMA-negative PBC**; that figure
  is absent here.

### A classification divergence, not a value conflict

This file groups **infective endocarditis-related glomerulonephritis** under "low
C3 **and** low C4" (classical/immune-complex consumption), while `renal.json`
groups it under "low C3" alongside PSGN and MPGN. Both readings are defensible —
endocarditis-associated GN classically consumes C3 with low-or-normal C4 — so the
two files sort the same entity differently rather than contradicting each other.

## Haematology investigations (189 cards, 376 fields)

Formatted the seven `investigations__HAEMATOLOGY__` topics: Anaemia & Haematinics (38),
ABG (23), Blood Count & Film (32), Haemolysis (23), Coagulation & Thrombosis (28),
Inflammation & Marrow (20), Transfusion (25).

**Verified against source before applying** — all correct as written, no change needed:
Hb <70 g/L non-ACS (target 70–90) and <80 g/L in ACS (target 80–100) per NICE NG24;
FFP for factor deficiency with bleeding at PT/APTT >1.5× normal; cryoprecipitate for
fibrinogen <1.5 g/L; PCC contains II/VII/IX/X and is always given with IV vitamin K
(the INR rebounds without it because factor VII is short-lived); TRALI = hypotension,
non-cardiogenic oedema, **no** diuretics vs TACO = hypertension + raised JVP, furosemide;
O RhD-negative red cells vs AB plasma as universal donors; G&S valid 72 h if transfused
or pregnant within 3 months.

**Real fix made in passing:** `Transfusion/13` carried a bare `<` (`reversal <1 h`).
Bare `<` in a field rendered through `innerHTML` is a parse hazard — escaped to `&lt;1 h`.

**Confirmed propagation of earlier fixes:** every remaining copy of the neutropenic-sepsis
neutrophil threshold now reads `≤0.5`. `conditions__HAEMATOLOGY__Pancytopenia/14` correctly
keeps `<0.5` (severe aplastic anaemia) and `<0.2` (very severe) — these are the Camitta
criteria and **must not** be harmonised with the sepsis threshold.

**Confirmed consistent:** red-cell transfusion thresholds agree across all 8 copies deck-wide.

### Open: platelet threshold endpoints disagree at exactly 50 and 100

`investigations__HAEMATOLOGY__Transfusion/11` states the procedural figures as **targets to
exceed** — "(>50 surgery, >100 neurosurgery/eye)". Four other copies (including
`Transfusion/24`) state them as **triggers to transfuse** — "<50 = surgery / major bleeding;
<100 = critical sites".

At a count of exactly 50 (or 100) the two readings give opposite answers: card 11 says the
target is not yet met, so transfuse; card 24 says the trigger is not met, so do not. Card 11
is the lone outlier by count but matches the conventional BSH phrasing ("raise the count
above 50×10⁹/L for surgery").

**Not patched.** The mechanical fix — moving card 24's `<50`/`<100` to `≤50`/`≤100` — would
leave a mixed convention inside a single card, because `<10` prophylactic and `<30` for active
bleeding are written that way universally and are right. Harmonising the five cards means
rewriting the definitions, which is authoring, not correction. Flagged for a clinician.

### Other endpoint/range divergences found, reported not patched

- Lactate `<2` vs `>2` mmol/L — a lactate of exactly 2.0 falls in neither category.
- Neutropenic fever `>38` vs `≥38°C` across files.
- HIT onset window: ~30 days in one card vs 100 days in another.
- Borderline B12: `200–300` vs `180–350 ng/L`.
- Malaria film repeat timing: 36–48 h vs 48–72 h.

## Special tests investigations (160 cards, 319 fields)

Formatted the six `investigations__SPECIAL TESTS__` topics: Endocrine — Adrenal &
Pituitary (37), Endocrine — Glucose & Water (16), GI Absorption & Breath Tests (22),
Respiratory & Sleep (27), Hepatology & Biopsy (31), Neurology Bedside (27).
Zero `fc-caveat` spans emitted in the whole file; the only two grey spans are neutral
mechanism glosses. Every safety-bearing statement stayed in the body, bolded.

Rule 3 (if the front asks for it, the back cannot demote it) caught four demotions that
danger-judging alone had missed — `(assay-dependent)` qualifying a peak-cortisol
threshold the front asks for, the iontophoresis mechanism on a card whose front asks
*how sweat is generated*, and two `fc-sub`s holding the exact thing their front asks.
All reverted before writing. This keeps confirming rule 3 is the better test: it is
mechanical and needs no judgement about what counts as dangerous.

**Confirmed three earlier harmonisations have fully propagated**, with no surviving
outlier anywhere in the deck: SAAG **≥11 g/L** (the `>12 g/L` hits are the *pleural*
serum–effusion gradient, a different quantity and correctly `>12`); SBP ascitic
neutrophils **≥250/mm³**; CF sweat chloride **≥60 mmol/L** with bands `≥60 / 30–59 / <30`
tiling cleanly in all three files that carry them.

### FIXED — AHI severity bands: an overlap at 15 and a severe cut-off excluding 30

AASM and NICE define mild 5–14.9, moderate 15–29.9, **severe ≥30**.
`respiratory.json`'s conditions topic already stated exactly that across 9 fields
(fc 22/23/24/25/35 and q 19/20/21/22). Two other statements were outliers:

| where | was | now |
|---|---|---|
| `special-tests.json` Respiratory & Sleep 16 | mild `5-15`, moderate `15-30`, severe `>30` | mild `5-14`, moderate `15-29`, severe `≥30` |
| `respiratory.json` signs — Snoring & Witnessed Apnoeas 7 | mild `5–15` (with `≥15` moderate) | mild `5–14` |

Two separate defects, both now gone:
- **An overlap inside a single card.** `5-15` mild alongside `15-30`/`≥15` moderate made
  an AHI of exactly 15 belong to two named bands at once — a self-contradiction within
  one field, not merely a cross-file difference.
- **A boundary excluding its own endpoint** (the deck's recurring error class). `>30`
  severe alongside `15-30` moderate put an AHI of exactly 30 in the *moderate* band,
  while respiratory.json called the same value severe. A published definition decides
  this one, and the majority of the deck already matched it.

Fixed rather than reported because both are mechanical: a published definition settles
the cut-off, and the overlap is a contradiction visible without any clinical judgement.
The guard script initially aborted on its own field-count assertion — three anchors sat
in one field, so one field changed, not three. The guard was wrong, not the content;
I corrected the guard.

`special-tests.json` q 9 ("AHI of 22 → Moderate") is unaffected — 22 is moderate under
both the old and new bands.

**Still outstanding:** `lung-function.json` Oxygenation & Respiratory Support 2 carries
the same `15–30` / `>30` problem **plus a gap** — `5–14` mild then `15–30` moderate
leaves an AHI of 14.5 in neither band. It is deliberately left for now because an agent
is mid-pass on that file and editing the text under it would break its token-identity
check. It will be fixed when that batch lands.

### Open for a clinician: 9am cortisol bands, with divergent management

Two incompatible band sets, and the difference changes what you *do*:

- `endocrinology.json` (Addison's 40, Hypopituitarism 15, q 42/12), both NICE-attributed:
  **>300 very unlikely / 150–300 equivocal / <150 start replacement and refer**.
- `special-tests.json` Adrenal & Pituitary 6:
  **<100 insufficiency likely, do SST / 100-400 indeterminate / >400-500 intact axis**.

A 9am cortisol of **120 nmol/L** means "start replacement and refer" under the first and
merely "indeterminate, needs dynamic testing" under the second. A value of **350** is
"insufficiency very unlikely" vs "indeterminate". Separately, `>400-500 nmol/L` is a
double-bounded inequality whose actual cut is ambiguous — 400 or 500?

**Not patched:** choosing between two published band sets and rewriting the management
attached to them is authoring, not correction.

### Open: normal CSF opening pressure stated three ways

- `neuroanatomy.json` Ventricles & CSF 10 — "About **7–18** cmH₂O"
- `neurophysiology-csf.json` CSF Analysis 20 — "**6–20** cmH₂O (up to ~25 borderline)"
- `neurology-neurosurgery.json` Foundations 219 — "**10-20** cmH₂O"

The IIH threshold **>25 cmH₂O** is consistent everywhere. Reported, not patched — the
normal range genuinely varies between sources.

### Confirmed consistent (no action)

Short Synacthen test and its interpretation match `endocrinology.json` exactly, including
the assay-dependence caveat (250 µg tetracosactide, cortisol at 0 and 30 ±60 min, peak
>550 on older polyclonal assays / ~>420–450 on monoclonal LC-MS, paired ACTH to separate
primary from secondary, falsely normal in recent-onset secondary insufficiency).
Water deprivation test safety content is in the body and bolded, not greyed. GTT
thresholds tile with no gap against the deck's diabetes copy (IFG 6.1–6.9 → fasting ≥7.0;
IGT 7.8–11.0 → 2-h ≥11.1), every inequality inclusive. Light's criteria, pleural pH <7.2,
ELF ≥10.51, FibroScan ≥12–15 kPa: no contradicting value anywhere.
Xanthochromia **≥12 h** confirmed holding across ct.json (×4), microbiology.json (×3),
mri.json, neurological.json (×6), neurology-neurosurgery.json (×6) and
neurophysiology-csf.json — **no card anywhere says >12 h or 6 h.**

### Not gaps (present elsewhere in the deck — nothing added)

Biopsy coagulation thresholds (platelets ≥50 ×10⁹/L, INR ≤1.5) live in
`nuclear-interventional.json`, consistent across its three cards. "A normal oximetry does
not exclude OSA" lives in `lung-function.json`. Both absent from this topic but present
in the app.

### Method note worth keeping

An unanchored `AHI` search matched inside "bet**AHI**stine" and returned ~15 phantom
sleep-medicine hits from ENT/vertigo topics. Anchored, case-sensitive patterns (`\bAHI\b`)
are required before trusting any count — this is the second time an unanchored search
has produced phantom hits in this review.

## Biochemistry, nuclear/interventional and bedside tests (543 cards, 1,082 fields)

Three files formatted in one wave, each verified independently and clean:
- `biochemistry.json` — 8 topics, 187 cards, 374 fields. `fc-caveat` used **zero** times.
- `nuclear-interventional.json` — 7 topics, 197 cards, 391 fields. `fc-caveat` used **once**,
  on a card whose front asks for "the two core indications" — the demoted clause is a
  genuinely third, more controversial use, carries no prohibition, and no front asks for it.
- `bedside-tests.json` — 5 topics, 159 cards, 317 fields. `fc-caveat` and `fc-sub` both
  **zero**; only two `fc-inline`, both neutral glosses.

On an investigations deck almost every trailing clause is a threshold, a "does not
exclude", or an action, so essentially nothing qualifies for demotion. That is the right
outcome and worth stating: the grey devices are for material genuinely outside what the
card teaches, and on these files that set is nearly empty.

Rule 3 again earned its place over danger-judging. In biochemistry it reverted three
`fc-inline` spans: `(should be suppressed)` / `(should be raised)` on a card whose front
asks *why* PTH must be read against calcium — that reasoning is the answer — and
`(low calcium:creatinine clearance ratio)` on a card whose front asks *how FHH differs*,
where that ratio is the discriminating test. In nuclear medicine it kept the ¹³¹I absolute
contraindications, the "benign result must not override a suspicious ultrasound" caveat,
and the adenosine asthma/AV-block contraindications in the body, all bolded — including
a card whose source text literally began "Caveat:", which was deliberately **not** promoted
into an `fc-caveat` span just because of the word.

**Invisible characters: confirmed zero** across all 318 bedside fields — Cf/Cs/Co/Cn
categories, C0 controls, ZWSP/ZWNJ/ZWJ/BOM/NBSP/soft-hyphen/word-joiner/thin-and-figure
spaces. The 13 zero-width spaces corrected earlier are gone and none were reintroduced.

**Invisible-character guards were proven to fire on positive controls** rather than merely
passing — a welded tag boundary, a bare `&`, an unbalanced tag, an over-length chip, an
`fc-sub` inside an `<li>`, a non-trailing `fc-sub`, and an injected ZWSP were each fed in
deliberately and each was caught. A check that has never been shown to fail is not evidence.

### Duplicate front worth a look (content, not markup)

`investigations__NUCLEAR & INTERVENTIONAL__IR — Vascular & Embolisation` cards 9 and 18
have **word-for-word identical fronts** — "What is post-embolisation syndrome?" — inside
one topic, so no markup on either front can distinguish them. Their backs differ (card 9
covers raised inflammatory markers and "not antibiotics"; card 18 covers it as the
commonest complication after TACE with right-upper-quadrant pain). Left unchanged; this
needs a decision about merging or re-framing, not formatting.

### Near-duplicate pair

`bedside-tests.json` Auscultation 32 and 37 both teach the same pleural-versus-pericardial
rub breath-hold discriminator. Marked up consistently rather than treating either as odd.

## Three more boundaries that excluded their own endpoint — FIXED

Each of these had the guideline-accurate form **already present elsewhere in the deck**,
so the fix was harmonising to what the deck itself already taught, not picking a number.

### A. Subclinical hypothyroidism levothyroxine threshold

NICE NG145: treat when TSH is "**10 mIU/litre or higher** on 2 separate occasions 3 months
apart" — inclusive. `biochemistry.json` already said `≥10 mU/L` in both its fc card
(Endocrine 21) and its q explanation (Endocrine 12). `endocrinology.json` q Hypothyroidism 1
said `>10`, excluding a TSH of exactly 10.0 — a value labs report routinely.

Moved 3 fields: `answer`, `options[0]` and `explanation`. The answer and option are
identical strings and had to move together or the card breaks.

**Deliberately NOT touched — and this is the point of the check:**
- q Hypothyroidism 0 explanation, `TSH >10 + low FT4 + symptoms` — that describes **overt**
  hypothyroidism, where the figure is a rough marker, not the NICE subclinical threshold.
- q Hypothyroidism 4 `options[3]` "Only adjust if TSH >10" — an **MCQ distractor**.
- q Hypothyroidism 22 `options[0]` "No — only treat if TSH >10" — an **MCQ distractor**.

Two of the six occurrences are wrong on purpose. A bulk replace would have silently
"corrected" two distractors and edited a descriptive sentence that was never the threshold.
The agent that reported this named three `fc` cards; all six occurrences are actually in
`q`, and three must not move. **This is the seventh time a report located content wrongly
and the file was what it was** — anchoring each claim to source before editing is what
keeps catching it.

### B. Moderate acute asthma PEF band — a genuine overlap at exactly 50%

BTS states moderate as "PEF **>**50–75% best or predicted" and acute severe as "33–50%".
`respiratory.json` wrote moderate as `50–75%` alongside severe `33–50%`, so a PEF of
**exactly 50% was both moderate and acute severe** — and the two carry different
management (acute severe means back-to-back nebulisers and senior review).
`risk-scores-criteria.json` already carried BTS's `>50–75%`.

Moved 4 fields: fc Asthma 49 back, and q Asthma 48's `answer`, `options[4]` and
`explanation`. Distractor options `[0]` and `[2]` carry deliberately scrambled bands
and were left alone.

### C. Acute severe asthma PEF endpoint

BTS acute severe is `33–50%`, inclusive of 50. `bedside-tests.json` wrote `<50%`,
excluding it — so a PEF of exactly 50% was not acute severe there while it was
everywhere else in the deck. Moved to `≤50%` in 2 fields (fc Point-of-Care Tests 33 back,
q 19 explanation).

### Guard note

The fix script asserted, before writing: exact occurrence counts for every anchor
(2+1+1+1+1 = all six `TSH >10` sites accounted for, so none was missed or over-matched);
that the three strings which must **survive** did; that the old forms did **not**;
identical topic keys, card counts, field sets and option counts; identical ordered tag
sequence on any field containing markup; and **that every MCQ answer still matches exactly
one option**. That last check is what makes moving an `answer` safe.

## Reported, not patched — and why

These came out of the same wave and are all real, but each would mean authoring rather
than correcting, or the sources genuinely disagree:

- **AST:ALT ratio for alcohol.** `>2` in 4 cards, `≥2:1` in 3 (`liver.json`). No single
  published definition settles 2.0 exactly; both phrasings are in common use.
- **Lactate "severe".** `>4` in 3 cards, `≥4` in 2. Surviving Sepsis uses the figure
  without settling the endpoint. (The `>2` hypoperfusion threshold is consistent everywhere.)
- **AKI urine output.** `≥6 h` (biochemistry) vs `>6 h` (`renal.json`). **KDIGO reads ≥6 h
  and NICE CG169 says >6 h** — two guidelines, genuinely opposed. Not mine to pick.
- **CKD duration.** `≥3 months` / "at least 3 months" / `>3 months` all appear.
  KDIGO says >3 months, but a duration of exactly 3 months is not a value anyone measures
  to the boundary, unlike a lab result. Left alone deliberately: the endpoint error class
  matters where readings actually land on the endpoint.
- **Capillary refill 2 s.** `bedside-tests.json` says "2 seconds or more is prolonged";
  `acute-abdomen-surgical-principles.json` says `>2 s`; an `msk-rheumatology.json` vignette
  treats exactly 2 s as reassuring. So 2.0 s is abnormal in one file and normal in two.
  The literature does not settle it.
- **Anion gap normal range.** `8–14` in `endocrinology.json` vs `8–12` in four other files.
  Published normals genuinely vary with whether K⁺ is included in the formula; `8–14` is
  within range, so the lone outlier is not wrong.
- **ABPI.** `<0.5` is "severe PAD, not yet critical" in `bedside-tests.json` and "critical
  limb ischaemia" in `cardiovascular.json`; and `0.9` sits in two bands at once in **both**
  files (normal `0.9–1.3` alongside mild PAD `0.5–0.9`). Because both files share the same
  defect shape it is a deck convention, and ABPI band conventions vary between sources.
- **DKA ketone endpoint.** `bedside-tests.json` uses `≥3 mmol/L`, JBDS and
  `endocrinology.json` use `>3`. Note the deck-wide JBDS form leaves **exactly 3.0
  unassigned** (DKA `>3`, HHS `<3`) while bedside's `≥3` partitions cleanly — so here the
  outlier is the one without a gap. Fixing either way trades one defect for the other.
- **Sepsis Six timing.** `bedside-tests.json` fc says a flat "within 1 hour"; its own q and
  the rest of the deck use NICE's NEWS2-stratified antibiotic timing. These are two
  different things — the UK Sepsis Trust bundle versus NICE antibiotic timing — so not
  strictly a contradiction, but a student meeting both would not know that.
- **Cold thyroid nodule malignancy risk.** `~10–20%` in `nuclear-interventional.json` vs
  `~5–15%` in four `endocrinology.json` places. Published figures genuinely span both.
- **NEWS2 parameter count.** "six parameters plus a separate oxygen weighting" vs
  "7 parameters (including supplemental oxygen)". Both defensible readings of the RCP chart.
- **IV potassium rate.** `10 mmol/h` peripherally in 4 cards vs "never faster than
  20 mmol/hour" in one. Not a contradiction — 10 is the peripheral rate, 20 the absolute
  ceiling with monitoring — but the second states no qualifier.
- **HVPG.** Checked because it was reported as divergent; `gastrointestinal.json` already
  reads `≥10 mmHg`. The report was wrong. One `liver.json` q answer says "above 10 mmHg";
  Baveno defines clinically significant portal hypertension as ≥10, so that single q
  wording is the only loose one and is not a threshold a learner applies to a number.

### Nuclear medicine: an asymmetry worth a clinician's eye

Two fc cards assert a **normal perfusion scan "effectively excludes" pulmonary embolism**,
while four other fc cards in the same file teach false negatives (FDG-negative tumours,
somatostatin analogues, lytic myeloma on bone scan, drugs blocking MIBG) without ever
generalising the rule. The file's only explicit "a negative scan does not exclude" caveat
sits in a **q explanation**, not on the fc side. Nothing changed.

### Confirmed absent deck-wide (nothing added)

- **No breastfeeding-interruption interval exists anywhere** for ⁹⁹ᵐTc, ¹²³I, ¹³¹I, ¹⁸F or
  ⁶⁸Ga. The one card that raises it says only "may need temporary interruption". All eight
  deck hits for interruption language are contraception or HSV, not radioisotopes.
- **No radiation dose figure** for CT, plain film, fluoroscopy, V/Q or bone scan; the only
  two numeric doses in the deck are FDG-PET/CT "6–10 mSv" and ⁹⁹ᵐTc-MDP "a few mSv",
  neither with a comparator. No diagnostic reference level and no background-dose comparator.
- **No insulin guidance for PET preparation** — the glucose target `<11 mmol/L` is stated
  but nothing on how to reach it in an insulin-treated patient, and no reschedule rule.
- **Percutaneous abscess drainage and nephrostomy carry no "give antibiotics" statement**
  on the fc side; the fact is in the app but filed in
  `acute-abdomen-surgical-principles.json` and `urology.json`, not in the IR topic where a
  student revising drainage meets it.
- **Urine dipstick unreliability over 65** is absent from `bedside-tests.json` entirely
  though present in six other files; **peak-flow technique** is absent from it too, living
  in `lung-function.json`.

## Wave 4 — the rest of `investigations__` (761 cards, 1,314 fields)

| file | cards | fields |
|---|---|---|
| microbiology.json | 120 | 240 |
| lung-function.json | 117 | 234 |
| scoping-endoscopy.json | 112 | 224 |
| neurophysiology-csf.json | 73 | 146 |
| urine.json | 71 | 142 |
| urology.json | 65 | 130 |
| therapeutic-drug-monitoring.json | 54 | 108 |
| toxicology.json | 45 | 90 |

Grey demotion devices barely used again: **zero** `fc-caveat` and zero `fc-inline` in
lung-function, toxicology, TDM, scoping-endoscopy and neurophysiology-csf; one
`fc-inline` in microbiology (a Ziehl-Neelsen reagent recipe on a card whose front asks
*why* mycobacteria need a special stain); three `fc-caveat` in urine/urology, all neutral
glosses or study-aid meta-commentary. On investigations content almost nothing qualifies
for demotion, and that is the correct outcome.

**Bare `<` characters escaped as real parse hazards:** 14 in lung-function, 9 in
neurophysiology-csf, 4 in microbiology, ~30 in urine/urology, plus several in toxicology.
A field like `<5/hour = normal; …` is swallowed as a pseudo-tag by any HTML parser.

### FIXED — six more values, each harmonised to a published guideline AND the deck majority

| # | where | was | now | authority |
|---|---|---|---|---|
| 1 | lung-function AHI bands | `15–30` mod, `>30` severe | `15–29`, `≥30` | AASM; respiratory.json ×9 |
| 2 | lung-function PEF | `≥50–75%` moderate | `>50–75%` | BTS; risk-scores-criteria |
| 3 | lung-function triangle of safety | `lateral edge` of lat dorsi | `anterior border` | standard anatomy; 4 other cards + thorax.json |
| 4 | lung-function adult FeNO | `≥40 ppb` | `≥50 ppb` | current BTS/NICE/SIGN; respiratory.json ×5 |
| 5 | lung-function LTOT | PaO₂ `≤7.3 kPa` | `<7.3 kPa` | BTS home oxygen; respiratory.json ×4 |
| 6 | neurophysiology-csf Listeria cover | `>60` | `≥60` | 7 cards across 2 files say "aged 60 and over" |

Plus a spelling correction: **Löwenstein–Jensen** carries an umlaut. `microbiology.json`
had it both ways (3 with, 4 without) in cards that sit adjacent to each other;
`respiratory.json` uses the umlaut 8 times. Fixed 4 fields.

Items 1 and 2 were each an **overlap inside a single card** as well as a cross-file
disagreement — a PEF of exactly 50% was both moderate and acute severe on the same card,
and the AHI card put exactly 30 in moderate where nine other fields call it severe.
Item 4's MCQ needed `options[4]` and `answer` to move together; the guard confirmed the
answer still matches exactly one option afterwards. The paediatric FeNO threshold
(35 ppb) agrees everywhere and was deliberately left.

Deliberately **not** touched inside these same cards: `lateral edge of pectoralis major`
(that IS the anterior border of the triangle, and correct), `≥35 ppb` paediatric FeNO,
the severe PEF band `33–50%`, and lung-function's second LTOT limb `≤8 kPa` (see below).

### The single highest-risk finding in this wave — NOT fixed, needs a clinician

`lung-function.json` Oxygenation & Respiratory Support **18**, whose front asks for
"the key blood-gas thresholds that **mandate escalation from NIV to intubation**", lists
`pH <7.25` among them.

`respiratory.json` teaches the **opposite**, explicitly and in about seven places:
"A pH **<7.25 does NOT mean intubate** — it predicts a higher chance of NIV failure, so
give NIV in HDU/ICU with immediate access to intubation." That is also what BTS/ICS
guidance says.

So a learner meeting one card is told pH <7.25 mandates intubation, and the rest of the
deck tells them it does not. This is a management-changing contradiction, not a boundary.

**Not fixed, on the standing line:** correcting it means either rewriting the question
stem or removing a threshold from a therapeutic recommendation, both of which are
authoring rather than correction. Flagged to the user directly as well as here.

### Also reported, not patched

**Guidelines genuinely differ, or the choice would be authoring:**
- **Upper-GI 2WW pathway mis-assigned.** `scoping-endoscopy.json` Upper GI 1 says bare
  "age ≥55 with new symptoms … prompt 2-week-wait referral". `upper-gi.json` says the
  opposite explicitly and repeatedly — bare age ≥55 with new dyspepsia is **not** a 2WW
  criterion and routes to non-urgent direct-access endoscopy; `gastrointestinal.json`
  agrees with `upper-gi.json`. The age threshold (≥55) is consistent deck-wide; it is the
  *pathway* that is wrong on one card. Rewriting the claim is authoring.
- **Lithium toxicity threshold.** TDM says `>1.2` risk / `>2.0` severe; `psychiatry.json`
  says toxicity "above about 1.5" in four places. TDM also leaves **1.0–1.2 in no band**.
- **Warfarin high-INR management, a direct contradiction.**
  `clinical-pharmacology-prescribing.json` says INR 5–8 without bleeding gets **no**
  vitamin K; `cardiovascular.json` says vitamin K if INR >5. Opposite instructions for the
  same patient, and they disagree at exactly 5. Within one topic, "INR 5–8 with bleeding →
  vitamin K 1–3 mg" also overlaps "significant bleeding → 5 mg + PCC".
- **Gentamicin sampling: two incompatible protocols**, each presented as *the* method
  (pre-dose trough before the second dose, vs 6–14 h after the first dose for once-daily).
- **Paracetamol 8 h**: `4–8h` and `8–24h` bands in one card put exactly 8 h in both, and
  at 8 h one file plots the nomogram while the other starts NAC.
- **Salicylate band gap 300–499 mg/L** — and the same topic's MCQ is built on a 320 mg/L
  level, so a learner meeting that stem finds no band for it.
- **Antidepressant early-review age**: `under 30` (TDM) vs `under 25` (two other files).
- **Factor Xa reversal**: andexanet-or-PCC vs PCC-only with "no NICE-recommended antidote".
- **QTc**: `>500`/`+60 ms` (action) vs `>440/>460` vs `>450` (prolonged) — the deck never
  says the 500 figure is a different kind of threshold.
- **COHb threshold excludes its own endpoint**: "greater than 10% in a non-smoker is
  significant" sits against "smokers have a baseline up to ~10%", so the non-smoker action
  threshold equals the top of the smoker baseline and exactly 10% is not significant.
- **Uroflowmetry 150 mL**: "at least 150 mL" on the fc card vs ">150 mL" in its own q map
  and two other cards — at exactly 150 mL the same topic calls the trace valid and invalid.
- **Stone MET at exactly 10 mm** is claimed by two management bands (`5–10 mm` → MET and
  `10–20 mm` → ureteroscopy), and a third card says "under 10 mm", excluding it.
- **Stone-prevention urine output**: `>2.5 L/day` vs `>2 L/day` in three other cards.
- **hCG 48-h rise**: "at least 63%" vs ">~63%".
- **ACR exactly 30** is band A2 by the banding cards yet fires the `≥30` referral pathway.
- **COHb half-life**: `~4–6 h` air / `~90 min` O₂ vs `~4–5 h` / `~1 h`.
- **CSF values inside one topic**: normal cell count `<5` on one card and `≤5` on another
  (disagreeing at exactly 5); pleocytosis `>10` leaves 6–10 unlabelled; protein `>1 g/L`
  bacterial vs `<1 g/L` viral leaves exactly 1.0 in neither; glucose "60–70% of serum"
  normal vs "<50%" low leaves 0.55 in neither.
- **CSF opening pressure**: normal `6–20` (fc) with the q map omitting the fc card's
  "up to ~25 borderline" clause, so 20–25 falls in no band there; `neurology-neurosurgery`
  has the same gap independently with `10-20`.
- **MIP sign convention.** `special-tests.json` states the 20/30/40 rule as
  "MIP < 30 cmH2O", unsigned — read literally a *normal* MIP of −90 satisfies it.
  `lung-function.json` has the correct form, "MIP less negative than −30 cmH2O".
  **Not fixed** because the minimal fix would make the MCQ's correct option the only one
  worded differently from its distractors — identifiable by format rather than by content —
  and rewording all five options is authoring an MCQ.
- **Vaginal pH exactly 4.5** falls in no band (normal `<4.5`, BV `>4.5`), and **GOLD grade
  bands** leave 79.5% and 49.5% unbanded. Both are standard printing conventions, like the
  CKD "3 months" case; left alone for the same reason — the endpoint class matters where
  readings actually land on the endpoint.
- **Post-void residual 50–100 mL** and **Q_max 10–15 mL/s** are unbanded; the PVR gap is
  filled in `ultrasound.json` with an age qualifier ("up to ~100 mL may be acceptable in
  the elderly") that the urology card lacks.

### A disagreement between two agents, resolved against both

The microbiology agent reported the urine-culture threshold as a genuine contradiction —
`≥10⁵` in two cards against `>10⁵` in seven. The urine/urology agent reported it as
consistent. **I checked every occurrence in the deck myself. The urine/urology agent was
right, and for a reason neither stated:** all three cards that *define* the threshold
(`microbiology.json` fc 5, `urine.json` fc 5, `urology.json` fc 30) use `≥10⁵` and agree.
Every `>10^5` is inside a **question vignette** — "MSU grows >10⁵ CFU/mL of E. coli" —
which describes a patient's lab result, not a cutoff, and is correct English for a stem.

Acting on the first report would have "corrected" seven question stems that were right,
and made them read worse. Recorded because the lesson is not "verify agent reports" — it
is that a threshold **appearing** in text is not the same as a threshold being **defined**
there, and a census has to tell those apart.

### Confirmed absent deck-wide (genuine gaps; nothing added)

- **No numeric COHb threshold for hyperbaric oxygen referral** anywhere, though the
  toxicology MCQ presents a COHb of 28%.
- **No DLCO/TLCO severity bands** anywhere (the conventional >60 / 40–60 / <40 % split).
- **No post-polypectomy adenoma surveillance interval** anywhere — and the scoping cards
  on polypectomy are exactly where a learner meets the problem.
- **No numeric normal bladder capacity**, though a card asks the learner to recognise a
  "markedly reduced" one.
- **No numeric age-specific PSA bands**, though three cards refer to "age-specific
  thresholds that rise with age".
- **No numeric nerve-conduction-velocity cut-off** — but the deck's framing is
  consistently qualitative, so this is a stylistic choice, not a gap.
- **IV phenytoin rate safety exists only inside one MCQ explanation**, so a learner in
  card mode never meets it.

### Not gaps (present elsewhere in the app)

Barrett's surveillance intervals and the 3 cm rule (`upper-gi.json`, consistent ×3);
bowel screening FIT 2-yearly ages 50–74; the ~6-hour torsion salvage window; prostate
T3a/T3b staging; eGFR/CKD G-bands; SSRI discontinuation syndrome; STOP-BANG; DVLA rules
for OSA; CPAP adherence ≥4 h/night; the warning-versus-trigger distinction for
neuromuscular FVC; and the caution that early bacterial meningitis — Listeria especially —
can give a lymphocytic CSF.

## Wave 5 — the first four `signs__` files (1,131 cards, 2,262 fields)

| file | cards | fields |
|---|---|---|
| general-systemic.json | 360 | 720 |
| dermatological.json | 252 | 504 |
| obstetric-gynaecological.json | 252 | 504 |
| dermatology.json (2 remaining investigations topics) | 57 | 114 |

Grey devices stayed near-zero on the most safety-dense scope in the deck: 2 spans in
360 general-systemic cards, 4 in 252 dermatological, 4 in 252 obstetric-gynaecological.

### Two defects my own tooling had, both found here

**1. `ingest.py` silently truncated a batch on any rejection.** The main loop read
`ok = all(ingest(f, dry) for f in files)`. `all()` short-circuits, so one rejected file
meant **every remaining file was never looked at** — and only the exit code said so. A
21-file obstetric batch reported "17 applied" with no mention of the 3 it never opened.
I found it because 504 − 408 = 96 fields did not add up, not because anything warned me.

Fixed to process every file and print an explicit `N/M ok, REJECTED: …` summary. The very
next batch proved the fix: general-systemic came back `1/30 ok` and **named all 29
rejected files**, where the old code would have said "1 applied" and stopped.

This is the same family as the `--coverage`-wrote-the-deck bug already recorded above: a
batch tool whose failure mode is to do less than it reports is worse than one that crashes.

**2. My rendered-text guard compared entity text, not rendered text.** `seen()` strips tags
but leaves `&gt;` as `&gt;`, so a `>500 → ≥500` fix tripped a guard written against `>`.
Narrowed to three explicitly named permitted deltas rather than loosened — and the guard
had already caught my first attempt, where my allowed-delta key was a fragment of the
rendered string instead of the whole of it.

### Two agent defects the guard caught that the agents' own checks passed

**1. A tag boundary inserted inside a word.** `og_subfertility` card 2 emitted
`<strong>fe<strong>male-factor</strong></strong>` — the anchor for "male-factor" matched
inside "**fe**male-factor", producing nested tags that split the word on screen.
The agent reported "0 errors" and was not lying: **token identity passes this**, because
stripping those tags returns "female-factor" intact. Only a tag-boundary/weld check catches
it. Repaired by hand, asserted to render identically, then re-validated.

**2. 86 conjunctions deleted as if they were list separators.** The general-systemic agent
classified `" and "`, `", and "`, `" or "`, `", plus "` and `"; also "` as separator
punctuation droppable at an `<li>` boundary — 76 `and`, 7 `or`, 2 `plus`, 1 `also`. Its
drop accounting was internally consistent and reported 313/313 drops on a join, which was
true; the error was in what it counted as a separator. Every other batch in this review
kept the conjunction inside the final `<li>`.

That is content loss under the standing rule, so I did not accept it. Repaired
mechanically: for each `<li>`, look at what precedes that item's text **in the source**,
and if a conjunction sits there, put it back at the start of the `<li>`. All 86 restored,
and all 30 topics then passed the independent check that had rejected 29 of them.

### FIXED — three Rule 1 violations in already-applied work

Formatting defects from earlier passes, found while agents read neighbouring cards.
Un-greyed and kept in the body, bolded:

- **`dermatology.json` Skin Cancer 74 (Bowen's disease)** — "persistent and does not respond
  to topical steroids" was in 13px grey. That is the discriminator which stops an SCC
  in situ being treated as eczema indefinitely.
- **`obstetrics-gynaecology.json` IUFD 19** — "how macerated the baby looks does **NOT**
  predict DIC" was grey, under a bolded 10–30% DIC risk. It prevents false reassurance.
- **`obstetrics-gynaecology.json` Lactation 87** — the contraceptive effect being
  **unreliable** was grey, beneath a bolded "suppressing ovulation". A learner could read
  breastfeeding as contraception.

Three leftover `<b>` tags converted to `<strong>` in the same cards.

**Deliberately left grey, because the device was used correctly:**
- `dermatology.json` Seborrhoeic Keratosis 12 — "the association is debated: many patients
  with eruptive SKs have no malignancy". This demotes a **reassurance**, not a risk. Rule 1
  guards against demoting danger; a hedge that lowers urgency is exactly what grey is for,
  and the urgent-referral instruction is bolded in the body above it.
- `obstetrics-gynaecology.json` IUFD 27 — a coronial-reform legal footnote. Not
  safety-bearing. Its stray `<b>` was still converted.

### FIXED — two thresholds

- **Primary PPH `>500 mL` → `≥500 mL`** (3 fields, one an MCQ option). RCOG defines primary
  PPH as ≥500 mL, which `obstetrics-gynaecology.json` already said. The old pairing of
  `>500` here with `<500 = likely normal lochia` in the sibling left exactly 500 mL in
  neither category. This file stores no denormalised `answer`, so `correctIndex` was
  unaffected; asserted anyway.
- **`scoping-endoscopy.json`: postmenopausal endometrium "4 mm or more requires direct
  assessment" → "more than 4 mm"**. It made exactly 4.0 mm abnormal, contradicting three
  other files and the "4 mm or less is reassuring" correction made earlier in this review.

### The highest-risk item in this wave — NOT fixed

**Anti-D below 12 weeks: two files give opposite instructions.**
- `obstetric-gynaecological.json` — give anti-D under 12 weeks "if heavy/painful or
  surgically managed, or if ectopic or molar".
- `obstetrics-gynaecology.json`, twice — anti-D is **NOT given** below 12 weeks for
  miscarriage, threatened miscarriage or ectopic, "whether managed medically or surgically".

For a surgically managed miscarriage at 8 weeks the deck says both give it and don't.
And `obstetrics-gynaecology.json` **contradicts itself** on the same point: one card says
anti-D from 12+0 for medical *or* surgical management, while an MCQ explanation says NICE
advises it for surgical management only, using "give anti-D only for medical management"
as a distractor. Reported, not touched — this needs a clinician, not a guard.

### Reported, not patched

- **Kleihauer "after 20 weeks" vs "from 20 weeks"** — deliberately left. "After 20 weeks"
  is BCSH/RCOG's own wording, so the ambiguity at exactly 20+0 is in the source guidance,
  not in the deck. Fixing it would impose a precision the guideline does not have.
- **Hypothermia bands**: hypothermia is "below 35°C" yet mild is "32–35°C", so exactly
  35.0°C is both not-hypothermia and mild; and exactly 32.0°C is in both mild and moderate.
  `bedside-tests.json` states identical bands, so it is a shared convention.
- **Heat exhaustion vs heat stroke**: "below 40°C" vs "above 40°C" leaves exactly 40.0°C in
  neither — and the gap is reproduced in two keyed MCQ options, one of which would be false
  for a 40.0°C patient.
- **PUO duration** `>3 weeks` vs `≥3 weeks`; **ME/CFS** `>3 months` vs `≥3 months`;
  **weight loss** `>5%` where the MUST bands score `5–10%` inclusively — and that card's
  own MCQ asks for "the minimum threshold" while keying a strict `>5%`, so the stated
  minimum is itself excluded.
- **NEWS2 antibiotic timing leaves NEWS2 = 0 in no band** (`≥7` / `5–6` / `1–4`).
- **BMI 34.1–34.9 falls in no UKMEC band** (`30-34` vs `35 or over`) in
  `contraception.json`, where `endocrinology.json` correctly uses `30–34.9`.
- **Malaria film repeat schedule stated four ways**: `12–24 h apart` ×3, `12–24 h then 24 h
  later`, `3 films over 3 consecutive days`, `48–72 hours`. One of them lives in an MCQ
  **option**, so it would have to move with its `correctIndex`.
- **Sepsis Six timing** and **qSOFA's status** differ between files; one file states qSOFA
  "is no longer recommended as a sole screening tool" and another presents it without that.
- **Lymph node size**: `>2 cm` concerning (clinical) vs `>1 cm` short axis (radiological) —
  a factor of two, never contrasted.
- **Anaphylaxis observation**: a `6–12 hour` range vs NICE's `2 / 6 / 12` risk tiers.
- **SJS/TEN**: one card gives `<10%` and `>30%` and omits the 10–30% overlap band, so a 25%
  patient — the subject of that same file's own MCQ stem — falls in neither. Another card in
  the same topic states all three bands correctly.
- **SLNB Breslow `>0.8–1.0 mm`** is malformed (a `>` applied to a range), and at exactly
  1.0 mm with no high-risk feature **neither** stated band claims the patient.
- **Burns**: the fc card says "15% TBSA or more" and its own MCQ says "greater than 15%".
- **ABPI**: `0.5–0.8` described as the typical mixed-ulcer range while `≥0.8` is called safe
  for full compression — but "typically" makes the first descriptive, not a threshold, so
  this is the vignette-versus-definition distinction again rather than a contradiction.
  Critical ischaemia is `<0.5` in three cards and `<0.3` in one.
- **2WW routing for BCC**: `dermatological.json` puts "new, growing, ulcerating, bleeding or
  non-healing lesion" on the 2-week-wait; `dermatology.json` says in five places that BCC
  is the exception and usually routine. A non-healing ulcerating lesion is classic BCC.
- **Transformation zone / squamocolumnar junction** — the conflation already logged in
  `obstetrics-gynaecology.json` also appears in **`reproductive.json`**, in an MCQ answer
  string, even though that same file elsewhere defines the TZ correctly as the region
  *between* the original and new squamocolumnar junctions. A third file.
- **PMB referral**: all PMB urgent vs `≥55` only. **Secondary amenorrhoea `≥3–6 months`** is
  malformed (a `≥` on a range). **Antenatal corticosteroids `24–34+ weeks`** is ambiguous
  notation, and the sibling *considers* rather than *offers* them at 34+0.
- **Endometrial assessment age differs by symptom within one file**: HMB at `45 or over`,
  IMB at `over 40`. May be intentional; it reads as one rule.

### A methodological note worth keeping

The general-systemic agent audited the 20 demotions it *considered* and found that
**rules 1 and 3 together still miss a class.** Seven candidates passed both the keyword
audit and the front-overlap test and still must not be demoted — among them "in a patient
who may not mount a fever", "always septic-screen", "so a low threshold and a lactate are
needed", and "characterised by vasodilatation and often warm peripheries". These are bare
findings or directives sharing no vocabulary with their front and containing no flagged
word. Rule 3 as a pure word-overlap test does not catch them; a judgement about whether the
span is a *finding or a directive* is still required on top of both rules. All seven stayed
in the body. Worth recording because it bounds what the mechanical tests can do.

## Paediatrics (396 cards, 792 fields)

`paediatric.json`, 28 topics, every card touched. **Zero `fc-caveat` and zero `fc-inline`
in the whole file** — a deliberate policy, because in paediatrics almost every trailing
clause is safety-bearing ("do not wait for investigations", "a mimic does not exclude
co-existing abuse", "NOT routinely"). Second blocks used `fc-sub` (43 times), which
inherits body size and colour and is not a demotion.

Rule 3 is therefore vacuously satisfied, and the directive-free *finding* shape stayed in
the body and bolded throughout: bulging fontanelle, grunting, silent chest, non-blanching
rash, sunken eyes, high-pitched cry, retinal haemorrhages, bruising in a non-mobile infant,
absent femoral pulses, "classic neck stiffness and photophobia may be absent", and
"signs are non-specific".

Fixed in passing, as part of the markup: 4 bare `&` (`U&E`, `dip & culture`, `FBC & film`)
and 1 bare `<` (`<2 weeks`) escaped. The same tokens were already correctly escaped on
other cards in the same file, so this was an inconsistency, not a uniform convention.

**Note on id conventions:** this file uses two, each stable within its topic —
`piri_fc__signs__PAEDIATRIC__<slug>__NNNN` for 4 large topics and `<short>-fc-N` for the
other 24. A single prefix assertion would have failed. Indexing is positional throughout,
so nothing depended on it.

### A genuine app-level gap, and it is the one I briefed for

I asked specifically about the NICE traffic-light temperature tiers. **The amber criterion
`≥39°C in the 3–6 month infant` does not exist anywhere in the deck.** An anchored,
case-sensitive search for `≥39` / `>39` / `39°C` co-occurring with any "3–6 months"
phrasing returns **zero hits across all 80 files**. `39°C` does appear, but only for
transfusion reactions, systemic JIA and pneumonia-versus-bronchiolitis. The traffic-light
system is *named* on five cards across two files, and no card anywhere lists its
age-banded temperature tiers. Absent deck-wide → a real gap. Nothing added.

The `≥38°C` figure and the "under 3 months" phrasing are, by contrast, **completely
consistent**: 7 of 7 instances in the file use "under 3 months", and there is no
`>3 months`, no `3–6 months` and no `3 months to 6 months` anywhere in `paediatric.json` —
so the age-band phrasing divergence I briefed for does not occur here.

### Also absent deck-wide (nothing added)

- **No age-banded respiratory-rate or heart-rate table exists anywhere.** `paediatric.json`
  is entirely qualitative (tachypnoea, grunting, recession). The only paediatric numeric
  respiratory thresholds in the deck are `RR >70` and `RR >60` in one other file, and they
  are not age-banded at all.
- **No weight-estimation rule** (no WETFLAG, no `(age+4)×2`) and no weight-for-age figures.
- **No paediatric dehydration percentage bands.** The deck uses NICE's categorical grading,
  so there is no % band — but one MCQ stem says "he is 8% dehydrated", with no band anywhere
  to place that in.

### Internal contradictions found — reported, not patched

- **HUS "tetrad" vs "triad", in the same file.** One card's front asks for the *tetrad* and
  lists bloody diarrhoea as a fourth component; another asks for the *triad* with bloody
  diarrhoea as the antecedent. Every other statement in the deck — 6 places across 4 files —
  is a triad. The "tetrad" card is the lone outlier and HUS is conventionally a triad, but
  correcting it means restructuring the back as well as the front word, so it is authoring.
- **SpO₂ 92–94% falls in no band.** One card sets life-threatening asthma at `<92%`, another
  sets the oxygen target at `≥94%` — a child at 93% is neither life-threatening nor at
  target, with no stated action. Deck-wide there are **three** action thresholds for the
  wheezy or bronchiolitic child: 90%, 92% and 94%.
- **Pyloric stenosis age stated three ways in one file** (`2–8` / `4-8` weeks / "around 6
  weeks") and two more ways elsewhere (`3–6 weeks`; `2–8 weeks, peak 3–6`).
- **Apley's rule is repudiated on one card and applied as a red flag on three others.** One
  card says plainly it "has never been validated" and that pain location "was dropped from
  the modern consensus criteria"; three others list pain away from the umbilicus as an
  organic red flag, one of them as an unqualified exam pearl.
- **A therapy ranking contradicted by its own summary card**: one card says gut-directed
  hypnotherapy has the strongest evidence with CBT close behind; the summary card drops
  hypnotherapy and presents CBT as the treatment.
- **Acute/chronic diarrhoea**: `chronic is ≥2-4 weeks` is malformed (a `≥` on a range) and
  **leaves anything over 4 weeks in no band at all**. `gastrointestinal.json` has the correct
  three-tier split (acute `<2`, persistent `2–4`, chronic `>4` weeks). Not patched, for
  consistency with the other malformed-range cases in this review — fixing it means adding
  a band, which is authoring.
- **Infant WCC red flag `below 5 or above 15`** excludes both its own endpoints.
- **Kocher's criteria** are all strictly-greater (`>38.5°C`, `ESR >40`, `WCC >12`), so
  exactly 38.5 / 40 / 12 satisfies none. Replicated identically in three other files, so it
  is house style, not a local slip. Worth noting Kocher uses 38.5°C where the deck's NICE
  fever threshold is 38°C — different conditions, but a learner meeting both is not told so.
- **Delayed meconium**: `>48 hours` in four places vs "failure to pass within 48 hours" in
  four others — at exactly 48 h one trigger fires and the other does not.
- **Simple vs complex febrile convulsion**: `<15 min` vs `>15 min` across three files leaves
  exactly 15 minutes in neither.
- **Kasai timing**: "before 60 days" (two files) vs "before ~8 weeks" (= 56 days) in a third.
- **DDH imaging crossover**: `under about 4.5 months` vs `<4.5–6 months` vs `~6 months` vs
  `<6 months` — at 5 months one file X-rays and another still uses ultrasound. And
  `<6 months` / `>6 months` in one file leaves exactly 6 months in neither.
- **Limp age→differential mapping does not tile**: "toddler" then "3-10 years" leaves 2–3
  ambiguous; and Perthes is `3-10 years` on one card but "boys aged 4-8" on another, so a
  3-year-old gets Perthes from one card and not the other.
- **Fluid bolus**: `paediatric.json` says 10 mL/kg and explicitly warns that "older sources
  will say 20" — and `paediatrics.json` still says `10–20 mL/kg`, so the deck contains the
  very figure the other card warns against. A third file adds a 250 mL cap that neither has.

### Typography inconsistency (in scope, noted for a possible sweep)

The same value is written with an en dash on one card and an ASCII hyphen on another —
`3–4 months` / `~3-4 months` / `3-4 months`; `3 months–2 years` / `3 months-2 years`. This
is a visual-consistency issue rather than a content one. Not swept yet; it would touch many
files and is worth doing as one deliberate pass rather than piecemeal.

## Gastrointestinal, part 2 (132 cards, 264 fields) — and a count correction

Applied 5 topics: Palmar Erythema, Rectal Pain / Perianal Lump, Rovsing's Sign, Spider
Naevi, Steatorrhoea. Clean. Only 2 grey spans in 132 cards, both exam meta-commentary.

**A correction to that agent's scope report, made by counting the file myself.** It
reported `gastrointestinal.json` as having 19 outstanding topics / 469 cards with 23
already done. The file actually has **27 unmarked topics / 776 cards and 15 marked ones
(515 cards)** — and the agent's own figures do not reconcile with the file (its 23 + 19
totals 1,338 cards; the file holds 1,291). It had classified the **8 GI histology topics
(307 cards) as already done when they carry no markup at all** — and those are precisely
the two histology batches from an earlier wave that never landed.

The practical consequence is a coverage gap to fill rather than an overlap, and it is the
reason a scope claim gets checked against the file rather than accepted.

Worth recording as a good catch on its side too: its dropped-string inventory proved
failure mode A directly rather than by inference, counting conjunctions in rendered source
versus rendered output (`" and "` 191→191, `" or "` 45→45) and showing that the 10
serial-comma cases dropped the comma while keeping the conjunction inside the final `<li>`.
Its weld check also found 8 welds, correctly identified all 8 as pre-existing deliberate
letter-level bolds in an Alvarado mnemonic, and emitted no new ones.

## Deck-wide Rule 1 / Rule 3 sweep of pre-existing grey spans — 13 FIXED

An audit of every existing `fc-caveat` and `fc-inline` in the deck against a risk lexicon
returned **48 hits**. Most are correct use of the device and were left alone:

- **study-aid meta-commentary** — "Do not learn this as a 'triad'", "the letters of MAPT do
  not encode the true frequency order", "Newer data question how real this harm is, but
  'avoid' remains the expected exam answer";
- **"do not confuse X with Y" differentials**, which are revision scaffolding rather than
  clinical directives (neurogenic vs spinal shock, granuloma vs granulation tissue, the
  cerebellum's functions vs its anatomical divisions);
- **one-word or short glosses** whose content the body already carries — `(avoid radiation)`,
  `(one missed meal)`, `(to avoid hypos)`, `(circulatory delay)`.

A keyword audit alone would have "fixed" all 48. That is why each was judged against its
own front.

**The 13 genuine violations, un-greyed**, on one of three grounds — (a) the span is a bare
clinical **finding**, the shape a keyword audit misses; (b) **Rule 3**, the card's own front
asks for exactly what the span holds; (c) it is a **prescribing or action directive**:

| file | card | was grey | ground |
|---|---|---|---|
| cardiovascular | Acute Heart Failure 7 | "cool clammy peripheries, mottling, oliguria, confusion, rising lactate" | a, b |
| cardiovascular | Acute Heart Failure 20 | the same finding list, driving the stated strategy | a |
| cardiovascular | Heart Failure 32 | "Do NOT reduce mortality" | b |
| cardiovascular | Varicose Veins 24 | "An ABPI >1.3 … is unreliable" | b, c |
| cardiovascular | DVT 18 | "Homan's sign … is unreliable" | c |
| respiratory | Increased Work of Breathing 30 | "(falling RR, silent chest, drowsy)" | a |
| respiratory | Respiratory and Oxygen Support 31 | which patients need acute NIV vs a compensated retainer | c |
| neurology-neurosurgery | Raised ICP 20 | "(coning)" | b |
| neurology-neurosurgery | Raised ICP 21 | "(coning)" | a |
| neurology-neurosurgery | Dystonia 15 | "serum copper alone is unreliable" | c |
| paediatrics | Neonatal Medicine 99 | "(bedside glucometers are unreliable at low values)" | b |
| ent | Hearing Loss 104 | "Do not offer betahistine to treat tinnitus (NICE)" | b, c |
| ophthalmology | CRAO 1 | "(urgent work-up + secondary prevention)" | b |

Three of these are the exact shape recorded earlier as the one both mechanical rules miss:
`rising lactate` and `falling RR, silent chest, drowsy` are **bare findings** with no
directive word in them, and `(coning)` is a single greyed word that happens to be the whole
answer to its own front ("Why is lumbar puncture contraindicated in raised ICP?").

**The fix only removes the wrapper.** No word was added, removed or reordered and no new
emphasis was invented — the text returns to body size and colour, which is all Rule 1
requires. Asserted per span: rendered text identical before and after, the raw JSON form of
the back unique in the file, and topic keys, card counts and field sets unchanged.

The guard also caught my own slip first: matching the topic by substring made
"Heart Failure" ambiguous against "Acute Heart Failure" and a third topic. Nothing was
written, because staging completes before any file is touched.

## Ophthalmic, ENT, ophthalmology and ent-audiovestibular (408 cards, 816 fields)

27 topics across four files. Only **4 grey spans in 408 cards**, all four confirmed
non-safety-bearing against their own fronts (a canal-anatomy rationale, a "same-same" rule
name, a mnemonic, and an example gloss). On a scope carrying acute angle closure, GCA,
orbital cellulitis, retinal detachment, chemical eye injury, endophthalmitis, epiglottitis,
airway obstruction, quinsy and sudden SNHL, nothing safety-bearing is demoted anywhere.

Escaped 6 bare comparison operators, one of which — `(typically < −100 daPa)` — was a real
parse hazard: a bare `<` followed by a space in a field rendered through `innerHTML`.

**One topic my guard rejected although the agent reported all checks at zero.** An
`fc-caveat` sat **inside an `<li>`**, which splits the bullet — and inconsistently, because
the other five bullets in the same list carry their parenthetical examples as plain text.
Un-greyed for consistency, rendered text asserted identical, then applied.

That agent's own weld guard is worth recording as the state of the art here: it caught three
genuine failure-mode-B events during authoring, none of which reached output — `scleritis`
matching inside **epi**scleritis, `venous phase` matching inside arterio**venous**, and three
apparent welds that were really `</li><li>` seams, which it traced to a bug in its own
block-tag transparency and fixed in the guard rather than suppressing. Its dropped-string
inventory contained no letter at all, and conjunctions were never candidates for deletion,
so failure mode A was ruled out by construction rather than by audit.

### FIXED — three endpoint gaps, all closing a value that fell in NO band

**CRVO — one card with two gaps.** `ophthalmology.json` Central Retinal Vein Occlusion 3
split the two types as non-ischaemic `(>6/60)` with `<10 disc areas` of non-perfusion, and
ischaemic `(<6/60)` with `>10 disc areas`. A patient at **exactly 6/60** belonged to neither
type, and so did one with **exactly 10 disc areas**. Ischaemic CRVO is conventionally vision
of 6/60 *or worse* with *≥10* disc areas, so the ischaemic side moved to `≤6/60` and
`≥10 disc areas`. The non-ischaemic side is correct and untouched, and the two now tile
exactly.

**Sudden SNHL** — `ent.json` Reduced Hearing 3 said `<72h`, excluding exactly 72 hours. The
same file's `conditions__ENT__Hearing Loss` topic says `≤72 hours` on **four** cards, and
≤72 h is the published definition. Moved to `≤72h`, written with the literal `≤` character
to match the neighbouring cards rather than the `&le;` entity — my first attempt used the
entity and the survival guard caught it.

### Merkel cell carcinoma — the earlier "zero hits" finding has changed, and the gap is real

An earlier pass recorded MCC as absent deck-wide. The string now returns **3 hits** — but
**all three are MCQ distractors**, in two files, and **not one card anywhere teaches it**.
No front, back, answer or explanation covers its presentation, AEIOU features, staging or
management. `Merkel cells` (the normal basal-layer mechanoreceptor with its CK20 perinuclear
dot) is well covered, which is a different thing.

So the string is no longer absent but **the content gap is genuine and app-level**: the deck
asks a learner to reject Merkel cell carcinoma as a wrong answer three times without ever
teaching what it is. Nothing added. This is a better-stated version of the earlier finding
and supersedes it.

### Reported, not patched

- **Hoarseness referral stated three ways.** The signs card says "beyond 3 weeks" with no age
  criterion; another file says "hoarseness for 4 weeks"; and the conditions topic gives the
  actual NICE criterion as "**aged 45 and over** with persistent unexplained hoarseness",
  with no duration. A learner working from the signs card would refer a 30-year-old at 3
  weeks, which does not meet the criterion the same file states elsewhere. The deck's own
  MCQ distractors use "55 and over / six weeks", so its quizzes treat duration as the
  discriminator. Adding the age criterion is authoring.
- **Sudden SNHL urgency differs materially** even after the endpoint fix: the signs card says
  "high-dose corticosteroids within days", the conditions card says "refer to ENT immediately
  (within 24 hours), start steroids as soon as possible" and adds a "within the past 30 days"
  eligibility qualifier the signs card lacks. A third card gives the same emergency with no
  timing at all.
- **Ocular hypertension has a treatment gap at 22–23 mmHg**: OHT is *defined* at `>21 mmHg`
  but SLT is *offered* at `≥24 mmHg`, so 22–23 is ocular hypertension with no stated pathway.
  Not a definitional contradiction.
- **AACG typical pressure**: `>40-50 mmHg` on one card (malformed — a `>` on a range) versus
  `50–80 mmHg` on another. Left, consistent with the other malformed-range decisions.
- **Audiometry bands tile at integers** (`Mild 21-40 / Moderate 41-70 / Severe 71-90 /
  Profound >90`) with no gap or overlap, and 0–20 correctly unlabelled. Non-integer values
  fall in no band, which is benign since thresholds are recorded in 5 dB steps. **The real
  gap is the averaging basis**: the card gives bands "by average threshold" but never says
  which average, and the 4-frequency average (0.5, 1, 2 and 4 kHz) is defined **exactly once
  in the whole deck**, in a different file. Present elsewhere → not an app-level gap, but
  absent from the topic where the learner meets it.
- **GCA age `>50`** confirmed uniform across 13 places in these and adjacent files, and the
  ACR criterion is age at onset **≥50**, so at exactly 50 the whole deck disagrees with the
  guideline. Left as already logged: it is a uniform convention, "over 50" is the standard
  textbook phrasing, and moving 13 places on my own initiative is the sweeping kind of change
  I have consistently declined. Still open for a clinician.
- **A third-nerve palsy needing imaging whatever the pupil does** — confirmed by name that
  this is **not grey anywhere**: it sits inside an `fc-sub` (body weight, not a demotion) in
  one file and in an unmarked MCQ explanation. But two cards in *this* scope state the pupil
  dichotomy **without** the "partial or progressive needs imaging whatever the pupil is
  doing" qualifier that the other file adds. Present elsewhere → not a gap, but it is missing
  where a learner meets diplopia.
- **"The eye is neither red nor painful"** — confirmed by name: 1 occurrence deck-wide, in
  `msk-rheumatology.json`, already correctly **inside `<strong>`** and not grey.

### Deferred, deliberately: the `<b>` → `<strong>` sweep

There are **4,684 leftover `<b>` tags across 40 files**. Most sit in topics not yet
formatted, whose own agents convert them as part of the markup pass — so sweeping now would
rewrite text that live agents are anchoring against and break their token-identity checks.
This belongs at the end, as one deliberate pass once every topic is marked, when any
remaining `<b>` is by definition a leftover. Noted so it is not forgotten.

Related, and part of the same cleanup: several `<b>` tags sit **inside `fc-sub` blocks**
written by an earlier pass (for example `<span class="fc-sub">…<b>permanent blindness</b>.
</span>`), so that sweep should check nesting as well as the tag name.

## Wave 6 — GI first half, psychiatric, renal-urological, endocrine (1,222 cards)

| file | cards | fields |
|---|---|---|
| gastrointestinal.json (14 topics, incl. all 8 histology) | 436 | 872 |
| endocrine.json (16 signs topics) | 192 | 384 |
| renal-urological.json | 186 | 372 |
| psychiatric.json | 168 | 336 |
| psychiatry-cognition.json | 66 | 132 |

Grey spans stayed near-zero on scopes saturated with risk: **3 in 436** GI cards, **2 in 234**
psychiatric cards, **3 in 378** renal/endocrine cards, and every one confirmed against its own
front. One agent removed a fourth candidate because its own mechanical Rule 3 test flagged it,
rather than arguing the case — which is the behaviour the rule is for.

### I CORRECTED MY OWN EARLIER FIX — and the reason matters more than the fix

I reported the subclinical-hypothyroidism threshold harmonised after moving 3 fields in
`endocrinology.json`'s `q` map. **It was not harmonised. Three `fc` cards still said `>10`**
(Hypothyroidism 7, 28 and 39), and my search could not see them.

The cause: the threshold sits **inside a chip** —
`TSH <span class="fc-num">&gt;10</span>` — and my pattern `TSH (&gt;|>)10` **cannot span a tag
boundary**. The markup hid the value from the search. An agent reading tag-stripped text found
them immediately.

**2,803 chips deck-wide open with a comparison operator**, so this is a general flaw in the
method, not one unlucky card. Any threshold search run against an already-marked file could
miss instances the same way — and I ran several.

So I re-audited every harmonisation I had previously reported complete, this time on
**tag-stripped, entity-decoded** text. Result: **all of them held.** Every apparent divergence
was a *different quantity* that my looser regex swept up:

| looked like a divergence | actually |
|---|---|
| `SAAG <11` in 6 places | the complementary non-portal band; tiles exactly with `≥11` |
| `INR ≤1.5` in nuclear medicine | the procedural coagulation threshold, not the ALF definition |
| `neutrophils <0.5` in Pancytopenia | the Camitta criteria for severe aplastic anaemia — confirmed earlier as must-not-harmonise |
| `>12 h` in renal | the AKI urine-output criterion, not xanthochromia |
| `Age >55` in hepatobiliary | the Glasgow/PANCREAS score, a different rule |
| `<5 min` / `>5 min` in febrile convulsion | the simple-versus-prolonged seizure split, not status epilepticus |

The three `fc` cards are now `≥10 mU/L`, matching NICE NG145's "10 mIU/litre or higher" and
`biochemistry.json`. Card 7's complementary band ("above the reference range but `<10` with
symptoms") is correct, untouched, and now tiles exactly at 10.

**Lesson recorded for the rest of this review: a threshold search must strip tags first.**
Searching raw or parsed field text finds only the thresholds that markup has not split.

### A Rule 3 violation my keyword sweep structurally could not find

`gastrointestinal.json` PR Bleeding 23 greyed *"Note Blatchford/Rockall are for upper-GI
bleeds"* on a card whose front asks **which score risk-stratifies lower-GI bleeding**. That is
the applicability limit of the scoring tools, and the front asks for it.

My deck-wide sweep matched risk *words* — and this sentence contains none. **Rule 3 violations
are invisible to a keyword audit by construction.** Un-greyed, and its `<i>upper</i>` converted
to `<strong>` since `<i>` is not one of the six devices and the text now sits in the body.

### I taught the guard a general rule rather than whitelisting files

Five psychiatric topics were rejected for welds, and all 16 rejection lines were **first-letter
mnemonic bolds** — DIGFAST, SCOFF twice, PANDAS, CAGE — exactly as the agent had declared. The
deck already does this legitimately for AEIOU and Alvarado's MANTRELS.

Rather than whitelist those files, both `ingest.py` and `verify_file.py` now allow a weld **only
when every affected token maps to exactly its own first letter plus the remainder**, and report
it as a visible warning. Tested against synthetic cases: it still rejects `fe|male-factor` and
`hypo|mania`, and passes only true first-letter bolds.

### Content findings — reported, not patched

- **DIPPERS is mislabelled.** `renal-urological.json` Urinary Incontinence 6 labels the mnemonic
  DIPPERS (7 letters) but lists **8** items, one of which — atrophic vaginitis — carries no
  letter, and "Endocrine" stands where the standard mnemonic has **E for Excess urine output**.
  The standard form for that exact item list is **DIAPPERS**, with A for Atrophic vaginitis.
  The `q` map repeats the same label and items, and it appears nowhere else in the deck, so
  there is no cross-check. Bulleting makes the defect *more* visible: the unlettered item now
  sits in its own bullet.
- **DKA: exactly 3.0 mmol/L is neither diagnostic nor resolved.** Diagnosis is ketones `>3` and
  resolution is ketones `<3` in the same file, so a patient at 3.0 is in neither state.
- **Stone size gap**: `<5 mm` usually pass, `>10 mm` rarely pass — 5–10 mm, and exactly 5 and
  exactly 10, fall in no band on that card. The middle band exists in two other files.
- **PHQ-9 has two incompatible schemes cutting the same score.** The 5 severity bands tile 0–27
  perfectly, but NG222's "less severe `<16`" / "more severe `≥16`" slices the 15–19
  moderately-severe band in half: **a score of 15 is moderately severe by band and less severe
  by NG222, with opposite drug advice.** And `psychiatry.json` glosses "more severe" as
  "moderate + severe, PHQ-9 ≥16" while its own moderate band is 10–14 — below 16.
- **AUDIT bands differ between files**: two bands (`8+`, `20+`) versus three (`8+`, `16+`, `20+`),
  so 16–19 is "hazardous/harmful" in one and specifically "harmful" in the other.
- **EPDS**: `≥10–13` prompts assessment in two files, `≥13` in a third, and one MCQ option says
  "above 13", excluding 13 where both others include it.
- **Y-BOCS**: bands tile 0–40 perfectly but the management map starts at "Mild 8–15", so 0–7
  falls in no management band.
- **CIWA-Ar bands overlap at 15** ("8-15 moderate" and "15 or more severe").
- **AMTS has three cut-points** in the deck under one instrument name — `≤6/10` for cognitive
  impairment, `≤8` for CURB-65 confusion, and 4AT `≥4` — with no cross-reference.
- **TCA overdose bicarbonate trigger**: `QRS >100 ms` on one card, `>100–120 ms` on two others,
  while `cardiovascular.json` uses 120 ms throughout as the narrow/broad QRS boundary.
- **Mental Health Act**: s136 is "a PUBLIC place" in one file and "any place other than a
  private dwelling" in another — differing over a communal stairwell or an A&E waiting room;
  s4's test is "undesirable delay" in one and "dangerous delay" in another (the statute says
  undesirable); and an MCQ keys **s5(4)** for a voluntary inpatient on a **medical** ward, where
  another file states s5(4) applies only to patients receiving inpatient treatment for mental
  disorder. Its `answer`, `options[2]` and `explanation` would have to move together.
- **Clozapine neutrophil threshold**: the schedule is in three `fc` cards but the number
  (`<1.5 ×10⁹/L`, stop immediately) exists **only inside one MCQ explanation** and on no
  flashcard at all; the amber 1.5–2.0 band appears nowhere. For contrast the deck states the
  same 1.5 threshold plainly in `fc` prose for carbimazole.
- **Lithium**: a level of 1.0–1.2 falls in neither the therapeutic band nor the stated toxicity
  risk; on another file's figures the unlabelled zone is 1.0–1.5.
- **Wernicke appears three ways** in text a learner reads — `Wernicke's`, `Wernicke` and
  `Wernicke’s` with a curly apostrophe — so a case-sensitive search for `Wernicke's` misses two
  of three. All preserved exactly; flagged because it defeats searching.
- **`>400-500 nmol/L`** in the 9am cortisol bands is a range used as a threshold, so 400–500
  falls in no band. The two incompatible cortisol band sets remain open.

## gastrointestinal.json COMPLETE — final 8 topics (208 cards, 416 fields)

Dyspepsia & Epigastric Pain 33, Grey Turner's & Cullen's 18, Groin Lump 33,
Hepatomegaly & Splenomegaly 33, Leukonychia 18, Migratory Thrombophlebitis 18,
Murphy's Sign 18, Nausea & Vomiting 37. Every card in the file's 42 topics — **1,291
cards** — now carries markup; 655 more `<b>` pairs converted, none left in the file.

**1 grey span in 208 cards** (`"a classic viva distinction"`, pure exam meta), zero
`fc-caveat`. One safety line was **newly bolded** rather than demoted: `Do not force
reduction of a tender, tense hernia` had no emphasis at all before this pass.

### The tag-boundary lesson recurred in a second form, and is worth generalising

I had warned that agent to strip tags before searching, because `>` inside a tag breaks
pattern matching. It hit the *same class of bug inside its own list splitter*: **`&mdash;`
ends in a semicolon**, so a `;` separator matched inside the entity and silently split one
list item into three. Its expected-item-count assertion caught it before anything shipped.

So the general statement is: **entity boundaries break `;`-based splitting exactly the way
tag boundaries break `>`-based matching.** Any character that terminates an HTML entity —
`;` — or opens/closes a tag — `<` `>` — cannot be used as a delimiter on un-decoded text.

### FIXED — a card that contradicted itself, and a decision I reversed

`Dyspepsia & Epigastric Pain 11`: the **front** said "in a patient **over 55**" while its
own **back** said `≥55`. The two halves of one card gave opposite answers at exactly 55.

**I declined this earlier in the review as "editing a question stem".** I have changed that,
and the reason is a fact I did not have then: this is not a judgement about which guideline
to follow — it is a card contradicting *itself*, and the correct value is settled beyond
doubt. A tag-stripped deck-wide search found **18 inclusive statements across four files**
(`upper-gi.json` ×14, `gastrointestinal.json` ×4, `scoping-endoscopy.json`,
`microbiology.json`) against exactly two exclusive ones — the front, and a `q` explanation
copy. Those two were the only "over 55" instances in this context anywhere.

Both moved together to "55 or over". No clinical claim changed; the front now agrees with
its own back. The `q` item's stem patient is 68, so no option or answer text needed to move,
and MCQ integrity was asserted across the whole file afterwards.

### Reported, not patched

- **The gallstone "5 Fs" diverge three ways.** One card gives the fifth F as **Family
  history**, a histology card gives **Fair**, and `hepatobiliary-pancreatic.json` lists only
  **four** Fs despite naming the mnemonic for five. The classic fifth is *Fair*; family
  history is a real risk factor but is not the mnemonic's F. Correcting it would mean
  removing a true risk factor and substituting another — authoring, not correction.
- **Biliary colic `<6 hours` versus cholecystitis `>6 hours`** leaves exactly 6 hours in
  neither band, echoed in the `q` map. No other card states a duration cutoff, so there is
  nothing to harmonise against — a shared convention, left as such for the same reason as
  the GOLD bands and the vaginal-pH gap.
- **H. pylori test-of-cure has three different anchors and windows**: "at least 4 weeks after
  finishing antibiotics", "4–8 weeks after completing", and — NICE-attributed —
  "**6–8 weeks after starting**". "After starting" versus "after completing" is a different
  anchor point entirely, so a test at 4 weeks post-course satisfies two cards and is too
  early under the third.
- **Triple-therapy duration** `7 days` on three cards versus `7-14 days` on a histology card
  in the same file.
- **Nephrotic-range proteinuria**: `>3.5 g/day` in three places versus `>3 g/day` in
  `renal.json`, so a patient at 3.2 g/day is nephrotic by one file and not the other. And
  `renal.json` pairs `<3 g` with `>3 g/day`, leaving exactly 3 g/day in neither band.
- **Pyloric stenosis**: this file says a **3–6-week-old** where the deck's presenting window
  is `2–8 weeks` in four places (one explicitly "2–8 weeks, peak 3–6"). The card states the
  *peak* as though it were the presenting range.
- **Bare versus treatment-resistant dyspepsia at 55+**: two cards route bare new dyspepsia to
  routine endoscopy, where `upper-gi.json` states — NICE-attributed — that the non-urgent
  direct-access criterion is **treatment-resistant** dyspepsia.
- **An internal contradiction in `acute-abdomen-surgical-principles.json`**: one card says
  inguinal and femoral hernias "cannot be told apart reliably at the bedside, refer any groin
  hernia in a woman urgently", while its own MCQ calls the pubic-tubercle relation "the single
  highest-yield discriminator". Outside the scope of this pass.

### Checks that came back clean (recorded so the negatives are on file)

Glasgow-Blatchford (score 0, some centres ≤1) agrees across five independent statements.
Rockall components and maxima agree, and no risk-band cutoff exists anywhere to conflict.
Hernia anatomy is fully consistent across six files — inguinal superomedial and femoral
inferolateral to the pubic tubercle, indirect lateral and direct medial to the inferior
epigastric vessels, with Hesselbach's borders agreeing. Charcot's triad and Reynolds' pentad
agree across seven files. Gallbladder wall `>3 mm`, cholecystectomy "within ~1 week",
metoclopramide's MHRA 5-day maximum, hyperemesis `>5%` weight loss, the PPI 2-week and
antibiotic 4-week washouts, and gastric-ulcer re-scope at 6–8 weeks all agree wherever stated.

## GU, sexual health, geriatric assessment, genetics (314 cards, 628 fields)

`genitourinary-sexual-health.json` 96, `genetics-molecular.json` 102, `geriatric-assessment.json`
60, `sexual-health-gum.json` 56. **4 grey spans in 628 fields**, all `fc-inline`, zero
`fc-caveat`, each checked against its own front. 215 legacy `<b>` tags converted; 8 bare `<`
parse hazards escaped.

One Rule 3 decision worth recording as the counter-example to the two mnemonic greys that
agent *did* emit: the anticholinergic mnemonic "mad, dry, red, hot, blind" **is** the answer to
its own front ("Describe the anticholinergic syndrome"), so it stayed in the body even though
formally it is a mnemonic. A mnemonic is demotable only when it is a nickname for content
stated elsewhere on the card, not when it is the content.

### A MISTAKE OF MINE: I applied stale output to a file outside scope, and reverted it

My apply command used the shell glob `agentout/sh_*.json`. That matched the 9 files this agent
wrote (`sh_00`–`sh_08`) **and 13 unrelated files from 20 September** targeting
`conditions__SEXUAL HEALTH__` topics in `sexual-health.json` — a different file, already fully
marked, and not in this wave's scope. Five were rejected by the guard; **eight applied**,
changing 9 fields.

The guard did not stop them because it checks *content integrity*, not *intent*: token identity
held, so from its point of view nothing was wrong. It reported 0 problems, correctly.

I reverted `sexual-health.json` with `git checkout`. The changes were unreviewed, out of scope,
and I had no basis for preferring a five-day-old markup pass to the reviewed version in HEAD.
The 13 stale files are archived out of the glob path so this cannot recur.

**What this says about the tooling:** every guard I have built checks whether an edit is
*correct*. None checks whether it is the edit I *meant*. A filename glob is not a manifest, and
using one to select inputs put that judgement in the shell rather than in a checked list. The
other batches in this review were applied by explicit filename, which is why this happened once.

### Boundary findings — reported, not patched

- **Testicular torsion salvage window: 8 distinct formulations across 6 files** (worse than the
  5 previously logged). `within 6 hours` in `urology.json` *includes* 6 h; `salvage <6 hours` in
  `sexual-health.json` *excludes* it — so a presentation at exactly 6 h is both salvageable and
  outside the window.
- **HIV window period is self-contradictory across two files.** One card says the combined assay
  "shortens the window period to about 4 weeks"; another says it detects most infections from
  about 4 weeks "**but the window period is 45 days**". And 45 days is glossed as "about 6–7
  weeks" in one file and "about 6 weeks" in another.
- **Huntington repeat count 27–35 falls in no band** — `≥40` fully penetrant, `36–39` reduced
  penetrance, `≤26` normal. The intermediate band is **absent deck-wide**, so this is a genuine
  app-level gap.
- **Timed Up-and-Go has a gap and a double threshold in one field**: `<10 s` normal, "roughly
  `≥12 s` is slow (`≥14 s` is often quoted)". 10–11.9 s is in neither band, and 12–13.9 s is
  slow by one stated threshold and not the other. The file's own `q` map confirms the
  duplication.
- **Aneuploidy screening overlaps at exactly 14+0 weeks** (combined 11–14, quadruple 14–20), and
  **invasive testing gaps at 14+1 to 14+6** (CVS 11–14, amniocentesis ≥15).
- **Transferrin saturation `>45-50%`** is a range used as a single threshold in three files, so
  46% is above one endpoint and below the other — **and `liver.json` states a different,
  sex-specific rule** (`>50%` men, `>40%` women). A man at 46% qualifies under three files and
  not under `liver.json`; a woman at 42% is the reverse.
- **AMTS confirmed to carry three incompatible scales under one name**: `≤6/10` for cognitive
  impairment, `≤8` for CURB-65 confusion, and AMT-4 scored 0/1/2 inside the 4AT. Worse,
  `respiratory.json` shows `≤4` and `≤6` as MCQ *distractors* for the CURB-65 item, so a learner
  meets `AMT ≤6` as a wrong answer in one file and `AMTS ≤6/10` as the right one in another.
- **CFS 4 is on both sides of the frailty threshold**: one card labels 4 "Living with Very Mild
  Frailty" while another says frailty starts at `≥5` and a third file anchors 4 as "vulnerable".
- **4AT `≥4` is "likely" delirium in a `q` explanation and "possible" delirium on its own `fc`
  card**, where a third file states emphatically that it is *possible* and "does not exclude
  delirium or diagnose dementia".
- **NSAID renal cut-point**: STOPP at `eGFR <50` ("AKI risk") versus "contraindicated in CKD
  (`eGFR <30`)" — different strengths at different cut-points with no cross-reference, so at
  eGFR 40 one card says deprescribe and the other implies permissible.
- **BRCA1 ovarian lifetime risk**: `~40-60%` in one file, `~40%` in another — the lower bound of
  one is the whole figure of the other.
- **Front/back count mismatch**: a front asks for "**two** non-melanoma cancers where BRAF V600E
  is important" and the back lists three.
- **A probable text defect**: "Floor: profoundly dependent patients **both** score 0 despite
  differing needs" — the dangling "both" implies a lost first limb of a contrasted pair.
- **A `>4-fold` versus `a 4-fold` fall** in syphilis titre response: read literally, "a 4-fold
  fall" excludes a 16-fold fall.

### One card I cannot verify, and am flagging rather than guessing

`geriatric-assessment.json` DoLS card 0 asserts "**Until June 2026: …** The Supreme Court
overruled that test in **June 2026**." Today's date is after that, so the card is internally
self-consistent — but **my knowledge cutoff is May 2026, so I cannot confirm or refute a June
2026 judgment.** It is also the only card in scope whose correctness turns on a very recent
ruling, and the DoLS content in two other files does not mention any overruling. Left exactly as
found; this needs a subject-matter check by someone who can see past my cutoff.

### The reproductive.json transformation-zone conflation — confirmed precisely

`q/histology__REPRODUCTIVE__Cervix[3]`, `options[2]` and the scored answer:
"Transformation zone (squamocolumnar junction)". The same file contradicts it three times,
defining the SCJ as a **point** and the TZ as the **region between the original and new**
junctions — and another MCQ in the file scores that correct definition as the right answer.
The conflating string is simultaneously the option text and the answer, so any fix must move
both. Still open for a clinician.

## The tail — 41 topics across 15 files (240 cards, 449 fields)

Zero `fc-caveat` in the whole batch; 2 grey spans, both acronym expansions. 48 legacy `<b>`
pairs converted, 12 bare `<`/`>`/`&` escaped. 31 cards already had a marked front, and those
31 fronts were left byte-identical.

Applied from an **explicit filename manifest**, not a glob — the direct consequence of the
misapply recorded above.

### The entity/tag-delimiter class appeared for a THIRD time, in a third engine

Independently of the two instances already recorded, this agent hit both halves of it:
- a `'; '` list separator matched the `;` **inside `&amp;`**, silently eating a word
  (`&amp; vision` → `&amp` + ` vision`);
- stripping tags with a loose `<[^>]*>` **ate a real span of text** between a bare `<50` and a
  later `>`, corrupting the comparison baseline itself.

Both were caught and fixed in the engine. Three independent instances in three separate engines
makes this the single most reproducible defect class in this work, and it has two faces: a
delimiter that also terminates an entity (`;`), and a delimiter that also delimits a tag
(`<`, `>`). Neither can be used on un-decoded, un-stripped text.

### AN ERROR IN MY OWN ACCOUNTING: every "outstanding" figure I reported was backs-only

That agent questioned my detector's wording, and it was right to. `todo.py` tests **the back
only**:

```python
n = sum(1 for c in cs if '<strong>' not in c['back'] and 'fc-' not in c['back'] and '<ul' not in c['back'])
```

So a card whose **back** was marked by an earlier pass but whose **front** was never touched
counted as *done*. Measured deck-wide:

| | count |
|---|---|
| cards with an unmarked back | 224 |
| cards with an unmarked **front** | 3,604 |
| **marked back but unmarked front** — never counted | **3,381** |
| of those, fronts **over 7 words**, where Rule 2 applies | **1,416** |

Rule 2 is my own brief's second rule — *"Every front over ~7 words must carry bold. A wall of
unmarked front text is the commonest failure."* So this is not a technicality: **1,416 fronts
are outstanding work that my figures hid.**

They are concentrated in the anatomy files, which an earlier pass marked backs-only:
embryology 189, neuroanatomy 155, lower-limb 141, head-neck 139, pelvis-perineum 123,
upper-limb 115, abdomen 113, thorax 113, back-spine 84 — **1,172 between them** — plus
msk-rheumatology 104 and haematological 79, which are in the final agent's scope.

Typical examples, all plainly in scope for Rule 2: *"List the layers of the anterior abdominal
wall from superficial to deep."* (12 words), *"What is Scarpa's fascia continuous with, and why
does it matter?"* (11), *"Where is McBurney's point, and what does it overlie?"* (9).

Every completion figure in this document before this entry should be read as **backs**. The
front pass on the anatomy files is a distinct remaining piece of work.

### Content findings — reported, not patched

- **PoTS heart-rate criterion three ways in one file**: "more than 30 bpm" on one card,
  "≥30 bpm (≥40 in adolescents) within 10 minutes" on another, "more than 30 bpm" in the `q`.
  At exactly 30 bpm one card diagnoses PoTS and the other two do not; two of the three also omit
  the 10-minute window and the adolescent value.
- **Faecal elastase at exactly 200 µg/g**: the bands card calls 200 mild-moderate insufficiency;
  two other files call `<200` insufficiency, so 200 is normal there. The topic's own MCQ
  deliberately offers "Exactly 200 micrograms/g" as an option — correctly not the answer under
  its own bands, which makes the cross-file disagreement sharper, not softer.
- **A range written with a comparison operator is genuinely ambiguous, not merely inconsistent**:
  `>150-250` for calprotectin, `>3-4 mm` and `>15-17 mm` for pyloric stenosis. A calprotectin of
  200 or a wall of 3.5 mm cannot be classified from the text at all.
- **The likelihood-ratio ladder shares its band endpoints**: LR+ `>10` / `5–10` / `2–5` and
  `~0.5–2` negligible means an LR of exactly 5 is both moderate and small, exactly 2 is both
  small and negligible, and 0.5 and 0.2 are likewise doubled. The outer edges are clean.
- **Newborn blood-spot panel: an `fc`/`q` contradiction inside one topic.** The `fc` card says
  **10** conditions, correctly noting "Wales and Northern Ireland currently screen for 9", and
  another file agrees on 10. The `q` explanation for that very topic gives **9** unqualified as
  *the* UK number and omits tyrosinaemia. The MCQ's answer is unaffected, so this is an
  explanation-only divergence — the one place in this batch where `q` text would need to move to
  match its own `fc`.
- **Breast screening age** given once as `50-71` against nine other places saying `50-70`.
- **The deck contradicts its own rule of thumb**: a `q` explanation says an LR+ of 2–5 gives
  "roughly +15–20 points mid-range", where the deck's own McGee card gives 2/5/10 → +15/+30/+45.
  Under its own rule an LR of 5 adds ~30, not 20.
- **Kasai timing**: "by ~8 weeks" (56 days) versus "before 60 days", so a 58-day-old is inside
  one window and outside the other. One card states both.
- **Duplicated cards**: two bare one-line lung-biopsy cards restate what an adjacent marked card
  already delivers as a two-item list, and the atopic march appears twice with the middle term
  spelled differently.

### evidence-test-interpretation checked against first principles — nothing wrong

All 37 cards verified: sensitivity, specificity, PPV, NPV, LR+ `sens/(1−spec)`, LR−
`(1−sens)/spec`, SnNOut and SpPIn mapped to the right result direction *and* the right ratio,
PPV↑/NPV↓ with prevalence, sensitivity and specificity intrinsic while LRs are
prevalence-independent, cut-off effects, AUC, parallel versus serial testing, and the
odds↔probability conversions. All four worked MCQ calculations are arithmetically correct,
including one that correctly labels an 80/110 ≈ 73% PPV as the trap.

Because no half of any definition was wrong, no half was bolded: the markup marks the
numerator/denominator pair and the population qualifier (*WITH* / *WITHOUT the disease*), never
one side of a definition. Recorded because "check it rather than assume the deck is wrong" is the
finding.

One soft observation left untouched: a card states, already bolded in the source, that a high NPV
means a negative result "reliably excludes disease and permits reassurance/discharge without
further testing". That holds only given adequate sensitivity and a genuinely low pre-test
probability, and the card carries no qualifier.

## haematological.json + msk-rheumatology.json (223 cards, 446 fields) — BACKS COMPLETE

**Zero grey spans in 446 fields** — no `fc-caveat`, no `fc-inline` — and deliberately so: this
scope is almost entirely safety-bearing (marrow failure, TTP, DIC, purpura fulminans,
meningococcal sepsis, sickle sequestration, septic arthritis, GCA, compartment syndrome, cord
compression, NAI safeguarding, B12 subacute combined degeneration). Every second block used
`fc-sub`, so Rules 1 and 3 hold by construction rather than by judgement.

That agent verified **positively** rather than only negatively — it asserted for each safety
phrase that it sits inside `<strong>` and outside any grey span, rather than merely asserting no
grey span contains risk language. Sixteen such phrases confirmed, including *"NEGATIVE Gram stain
does NOT exclude septic arthritis"* and *"Never simply reassure and discharge"*.

**Both named shapes confirmed by name.** "Pain on passive stretch" is inside `<strong>` and
ungreyed at all three of its occurrences. "The eye is neither red nor painful" was re-read from
disk after the pass and re-confirmed still bolded and not grey; it occurs nowhere else in the deck.

**A scope correction it made:** my brief said 6 topics / 116 cards; the file has exactly **5**
unmarked topics / **115** cards, with 19 topics (837 cards) fully marked and skipped.

### The last unmarked back in the deck

One card sat inside an otherwise-marked topic, so every per-topic scope had passed over it:
`Juvenile Idiopathic Arthritis[12]`, whose whole back is "Adult-onset Still's disease." — a
four-word answer where the named disease *is* the content. Bolded. **Unmarked backs remaining
deck-wide: 0.**

This is the difference between a per-topic and a per-card detector, and it is why the residual
was 224 rather than 223.

### A process incident, checked rather than trusted

That agent flagged that it had used an unscoped `rm -f agentout/*.json` in a directory shared
with concurrently running agents, and said it could not rule out having deleted a pending batch.

I did not verify this by counting files — a file count proves nothing about what was lost.
I verified it **from the deck**: after applying the tail batch, the only files with any unmarked
back were the two in this final batch. Had a pending `tail_*` batch been destroyed, its topics
would still be unmarked. Nothing was lost.

Worth recording that this is the second time in one wave that a shared scratch directory caused
trouble — once for me (a glob selecting stale inputs) and once for an agent (an unscoped delete).
Both are the same underlying hazard: a shared mutable directory addressed by pattern rather than
by manifest.

### Content findings — reported, not patched

- **T-score bands overlap at BOTH endpoints.** `≥ −1.0` normal, `−1.0 to −2.5` osteopenia,
  `≤ −2.5` osteoporosis: exactly −1.0 is both normal and osteopenia, and exactly −2.5 is both
  osteopenia and osteoporosis. WHO's own definition is half-open. Same double overlap in three
  places across two files. The `≤ −2.5` value itself is consistent everywhere.
- **Morning stiffness is the most tangled threshold found in this review.** RA/inflammatory
  appears as `>30 min`, `≥30 min`, `>30–60 min` and `>1 hour`; OA as `<30 min`, "no longer than
  30 minutes" (NICE's inclusive wording) and "under 30 minutes". The `>30`/`<30` pairing leaves
  **exactly 30 minutes in neither** band, while the NICE-worded pairing partitions correctly —
  so the deck is internally inconsistent about whether 30 minutes is classifiable at all. And
  `≥30` for axial SpA against `<30` for OA puts exactly 30 in **both**.
- **PMR age diverges inside one file**: "Over 60" on one card and in a `q` explanation, "Over 50
  (typically over 60)" on another, and "Over 50" in that `q`'s own option and answer.
- **Kocher's criteria — confirmed, with a nuance I would have got wrong.** All numeric limbs are
  strictly-greater, so a child at exactly 38.5 °C, ESR exactly 40 and WCC exactly 12 satisfies
  **none** and scores 0 despite meeting every stated value. The nuance: only **three** of the
  four files spell all three limbs numerically — the fourth gives the fever limb as `>38.5°C` and
  the other two qualitatively. So "all three limbs in four files" was my overstatement.
- **ISTH DIC score: a fibrinogen of exactly 1 g/L scores in neither band** (`>1` = 0, `<1` = 1),
  while the platelet and PT bands of the same score partition correctly.
- **Modified Schober's**: "less than 5 cm" reduced and "more than 5 cm" normal leaves exactly
  5 cm unclassified, in both the card and its `q` explanation.
- **Synovial fluid WCC bands are nested, not exclusive**: normal `<200` and non-inflammatory
  `<2,000` both claim any count below 200. The upper boundaries are clean, and the card's own
  "no cut-off is absolute — treat on clinical suspicion" is bolded and intact.
- **Compartment pressure is ambiguous and its `q` disagrees with its `fc`**: the card gives an
  absolute threshold of `>30–40 mmHg` without saying whether the cut-off is 30 or 40, while a
  `q` item marks "absolute pressure of 45 mmHg alone" as **not** an indication for fasciotomy —
  yet 45 exceeds both ends of the card's range.
- **Variceal transfusion target, fc versus q in one topic**: `Hb 70–90 g/L` on two flashcards,
  `Hb 70–80 g/L` in a `q` explanation and in that `q`'s options and answer.
- **Neutropenic sepsis fever limb** disagrees at exactly 38.0 °C — `>38 °C` in six places across
  two files, `≥38°C` in two places in a third. NICE NG151 says "higher than 38 °C". The
  neutrophil limb is uniformly `≤0.5 ×10⁹/L`.
- **Lymph-node persistence** before referral: "beyond about 6 weeks", "4–6 weeks", "changing over
  3–6 weeks", "beyond a few weeks" across four files. Node *size* is consistent at 2 cm.
- **A pre-existing inconsistency worth a touch-up**: in the already-marked Compartment Syndrome
  topic, "worse on passive stretch" and "severe on PASSIVE STRETCH" sit **outside** the bold runs
  on two cards while the same phrase is bolded on two others. Not a rule violation — the text is
  neither grey nor demoted — but it is the sign of the pass that marked those cards.
- Confirmed clean: transfusion triggers (`Hb <70` → target 70–90; `<80` → 80–100 in ACS) across
  five files with no gap at 70 or 90; CRP antibiotic bands; pancreatitis `CRP >150 at 48 h`;
  Weber, Garden, Salter-Harris, Ficat and the modified New York criterion; haematocrit target
  `<0.45`, with the two different PV *diagnostic* thresholds explicitly flagged as different on
  the cards themselves.

## Fronts, part 1 — the 62 non-anatomy stragglers

With every back marked, the remaining Rule 2 work was 1,234 unmarked fronts over 7 words.
1,172 sit in the nine anatomy files and are with agents. The other **62 were scattered
singletons across 19 files** — a card here and there whose back an earlier pass marked and
whose front it never touched. All 62 are now marked.

Bold went on the term the card turns on, never on the interrogative scaffolding (*what, which,
where, name, list, describe*). **Median bold share 0.25**, min 0.10, max 0.75. Five fronts
exceed 50%, all of the form *"What is <long named entity>?"* where the only unbolded words are
the scaffolding — Rule 2a, not 2a-ii:
habit (psychogenic / tic) cough; traumatic tympanic membrane (TM) perforation; Deprivation of
Liberty Safeguards (DoLS); chronic fatigue syndrome / ME (ME/CFS); somatisation / medically
unexplained symptom disorders.

### My own script hit the weld hazard I had just briefed agents about

The uniqueness assertion fired on **"Mobitz I" inside "Mobitz II"**: a first-match replace on
*"Distinguish Mobitz I and Mobitz II second-degree AV block"* would have emitted
`<strong>Mobitz I</strong>I`, splitting the word. Precisely the `fe|male-factor` class, in my
own code, one turn after writing the warning into the brief.

The fix is general rather than a special case: substitute the **longest term first via a
sentinel**, asserting uniqueness at the moment of use, then restore. Recording it because the
lesson is not "be careful with Mobitz" — it is that *knowing* about a defect class does not
protect you from it, and only the assertion does.

Two further defects the assertions caught before any write:
- **The raw front string is not unique in the file.** One front's text recurs in another topic
  and in the `q` map, so a string replace would have hit the wrong card. Switched to a
  positional splice using `ingest.py`'s own card locator.
- **"Heart Failure" matches three topics** (plus Acute and Chronic). Exact topic-tail match
  first, substring only as a fallback — the same fix the grey-span sweep needed.

All three aborted before writing, because every assertion runs before any file is touched.

### Deck state

| | count |
|---|---|
| unmarked backs | **0** |
| unmarked long fronts outside the anatomy files | **0** |
| unmarked long fronts in the nine anatomy files | 1,172 (in progress) |

## Anatomy fronts, part 1 — trunk (424 fronts across 15 topics)

`abdomen.json` 147, `thorax.json` 143, `back-spine.json` 134. **Every front now carries bold;
not one back changed** (verified against HEAD field by field, not asserted). Median bold share
**0.333**, mean 0.342, inside the 0.30–0.40 target. Interrogative scaffolding is bolded nowhere.

Only 3 `fc-num` chips in 424 fronts, each a genuine level — `(L1)` for the transpyloric plane,
`(L1–L2)` for the genitofemoral nerve, `T8, T10 and T12` for the diaphragmatic openings. No
`fc-list`, `fc-sub`, `fc-caveat` or `fc-inline` on any front, which is correct: a front is one
question and has nothing to demote.

**7 fronts over 50%**, all genuinely Rule 2a/2a-ii — *"State Courvoisier's law"* (3 words, the
eponym is the card), *"What is a Sister Mary Joseph nodule?"*, and five stated contrasts
(pectus excavatum vs carinatum; white vs grey rami communicantes; kyphosis/lordosis/scoliosis;
spina bifida occulta/meningocele/myelomeningocele; upper vs lower motor neuron lesion). Where an
over-50 would have meant bolding scaffolding, the agent re-authored instead — *"extrahepatic
biliary tree"* trimmed to `biliary tree`, and so on.

### The substring/weld class was hit twice more and guarded both times

This is now its fourth and fifth appearance in this work, and the first time it was anticipated
rather than discovered:

- **`meningocele` is a substring of `myelomeningocele`**, in one front containing both. Guarded
  with a negative lookbehind. Verified in the applied file: `<strong>meningocele</strong> and
  <strong>myelomeningocele</strong>` — not `<strong>myelo<strong>meningocele</strong></strong>`.
- **`hemiazygos` occurs twice** in one front (plain, and inside "accessory hemiazygos veins").
  Guarded with a lookahead so the two are separate spans.

It also used a **strict allowed-tag pattern** for stripping rather than a loose `<[^>]*>` —
directly avoiding the defect that corrupted another engine's comparison baseline earlier.

### Content findings — reported, not patched

**Front contradicts its own back, or a value lives only on the front:**
- A front asks to name "**two** internal features" of the right atrium; the back gives **three**.
- One card has the vagus supplying "the foregut & midgut (**to the distal ⅓ of the transverse
  colon**)" while two other cards in the same file put the midgut/SMA boundary at the
  **proximal ⅔**. Read strictly the two are reconcilable ("up to but not including"), but the
  phrasing invites the opposite reading.

**Dermatome, myotome and reflex levels differing between files:**
- **Ankle jerk** is `S1` in `back-spine.json` and `S1–S2` in `lower-limb.json`.
- **Femoral stretch test** roots are `L2–L4` in one file and `L3/L4` in two others.
- **Dorsal scapular nerve** is `C4–5` in one file and `C5` in another.
- **Cardiac referred pain** is `T1–T4/5` in one file and `T1–T4` in another.
- Trunk dermatome anchors agree (T4 nipple, T10 umbilicus, L1 groin); `thorax.json` alone adds
  T2 axilla and T6 xiphisternum, and writes the groin as "T12/L1" where another file says
  "L1 = inguinal ligament".

**One eponym with three incompatible scopes, two of them in the same file:** **Ortner's
syndrome** is attributed to "an aortic arch aneurysm **or apical lung tumour**" on one card,
restricted to "a **cardiovascular** cause — the last being Ortner's" on another in the same
file, and tied specifically to mitral stenosis in a third file.

**Other named-entity divergences:**
- **Flail chest** is "**≥2** adjacent ribs each fractured in ≥2 places" in `thorax.json` and
  "**≥3**" in `orthopaedics.json`.
- **Tension pneumothorax decompression**: "5th ICS mid-axillary" / "5th ICS anterior or
  mid-axillary (2nd ICS in …)" / "**4th/5th** ICS".
- **Posterior spinal arteries** arise "from the vertebral arteries" on one card and "from the
  vertebral arteries/**PICA**" on another — in the same file.
- **Posterior intercostal arteries** are "from the thoracic aorta" unqualified on one card,
  "(the upper two spaces from the **costocervical trunk**)" on another, and "(**3rd–11th**)" on
  a third.

**Checked and clean** (recorded so the negatives are on file): the transpyloric plane is L1
everywhere; the aortic hiatus is T12 in all 12 occurrences; the sympathetic trunk is T1–L2
consistently across five files. Also consistent deck-wide: coeliac T12, SMA L1, IMA L3, aortic
bifurcation L4, IVC formation L5, cisterna chyli L1–L2, caval opening T8, oesophageal hiatus
T10, sternal angle and carina T4/5, trachea C6, dural sac S2, conus L1/L2, Adamkiewicz left
T9–T12, Tuffier's line L4, McBurney's point one-third ASIS→umbilicus, and the vertebral artery's
C6→C1 course.

## Anatomy fronts, parts 2 and 3 — limbs/pelvis and head/neuro/embryo (1,213 fronts)

`upper-limb` 217, `pelvis-perineum` 179, `lower-limb` 181, `embryology` 252, `head-neck` 200,
`neuroanatomy` 184. **Every front marked; not one back changed** in any of the six files,
verified field by field against HEAD. Median bold share 0.300 and 0.333. Only 11 `fc-num` chips
across 1,213 fronts, all genuine values; zero block or grey devices on any front.

**Rule 2 for long fronts is now complete deck-wide: 0 unmarked fronts over 7 words.**

### The substring class was anticipated and neutralised everywhere

Both agents built anchor resolution that requires a **whole-term match count of exactly 1**, never
first-match. One reported the raw-substring count alongside, which makes the trap visible:
`meningocele` has raw count **2** in *"spina bifida occulta, meningocele and myelomeningocele"*
but whole-term count 1. Handled the same way: `pharyngeal` vs `pharyngeal arch/pouch/cleft`,
`arch` vs `aortic arch`, `nucleus` vs `lentiform nucleus`, `foramen` vs `foramen ovale/rotundum/
spinosum`, `ventricle` vs `third/fourth ventricle`, `oesophageal` inside `tracheo-oesophageal`,
`scalp` vs `SCALP`, `foregut` twice in one front, and the cranial-nerve numerals — **`VI` inside
`VII`/`VIII`, `CN I` inside `CN III`**.

`fe|male` came through clean too: `<strong>female</strong> from the <strong>male pelvis</strong>`.

Both also masked entities out of the matchable region before searching and used strict
allowed-tag stripping — so the defect class that appeared three times earlier appeared zero times
in 1,213 fronts once it was written into the brief.

### Two flagged "conflicts" dissolved when I checked them myself

Worth recording, because the value of checking is symmetrical — it catches false positives too:

- **"brachial plexus C5–T1 versus L1–S3"** was reported as a possible error. The card actually
  reads *"the cervical enlargement (C5–T1) for the upper limb (brachial plexus) and the
  lumbosacral enlargement (L1–S3) for the lower limb"*. The `L1–S3` belongs to the lumbosacral
  enlargement, not the brachial plexus; a co-occurrence scan put them in one field. **Not an error.**
- **Sacroiliac joint "part fibrous" versus "part syndesmosis"** was reported as two labels for the
  posterior component. A syndesmosis **is** a fibrous joint — the two cards differ in specificity,
  not in fact. **Not a conflict.**
- **Commonest clavicle fracture site** — "the middle third" on one card and "the junction of the
  middle and lateral thirds" on another. I did *not* fix this either: the junction is the classical
  weakest point and lies within the middle-third region, so this is a specificity difference rather
  than a contradiction. Three other cards say middle third (one with ~80%).

### Content findings — reported, not patched

- **CN V's nuclear complex is placed in two different brainstem levels**: one card's summary maps
  "PONS → V, VI, VII, VIII" while two others put the **mesencephalic nucleus of V in the midbrain**.
  The usual simplification-versus-detail split, but the cards read as contradictory side by side.
- **Pelvic sympathetic origin stated three ways inside one file**: `T10/T12–L2`, `T12–L2`, and
  `L1–2` on the bladder summary card.
- **Perineal body and episiotomy**: one card says it is "cut in an episiotomy" unqualified, while
  two others say a **midline** episiotomy incises it and a **mediolateral** one is deliberately
  directed away from it.
- **Lung maturation windows overlap**: canalicular "weeks ~16–26" and saccular "roughly week 24 to
  birth" put weeks 24–26 in both stages.
- **Corticospinal decussation arithmetic does not close**: "~85–90% cross … ~10% remain uncrossed" —
  the complement of 85–90% is 10–15%.
- **Pudendal nerve rendered four ways** (`S2, S3 & S4`, `S2–4`, `S2–S4`) and several nerve roots
  written long-form in one file and short-form in another (`C5–C6` vs `C5-6`, `C3–5` vs `C3–C5`,
  accessory nerve `C3–C4` / `C3-4` / `C2-3`).
- **Femoral nerve `L2–L4` vs `L1–L2`** and **lumbar plexus `T12–L4` vs `L1–L4`** across files.
- **`pharyngeal pouch` names two different structures** — the embryological endodermal pouches and
  the clinical Zenker's diverticulum. A terminology collision, not an error, but it is exactly the
  substring trap this deck is full of.
- **Five exact-duplicate fronts across topics**, with backs agreeing in substance but differing in
  wording. Both agents anchored each duplicate pair identically so the rendered fronts stay
  consistent.
- **Confirmed clean**: `ultimobranchial body` is correctly spelled and a deck-wide search for
  malformed derivative coinages found none surviving. All pharyngeal arch, pouch and cleft
  derivatives are internally consistent. Every embryological remnant pair agrees across cards
  (ductus venosus → ligamentum venosum, vitelline duct → Meckel's, notochord → nucleus pulposus,
  Rathke's pouch → craniopharyngioma, and the rest).

## Where the deck now stands

| | count |
|---|---|
| total flashcards (excluding pharmacology) | **33,604** |
| unmarked **backs** | **0** |
| unmarked **fronts over 7 words** (Rule 2) | **0** |
| unmarked **short fronts** (≤7 words, Rule 2a) | **1,776** |

The 1,776 are the remaining work. They are not noise: a sample shows most name a specific concept
and so fall under Rule 2a — *"What is Ménière's disease?"*, *"What is the Bentall procedure?"*,
*"What are Janeway lesions?"*, *"Define placenta percreta."*, *"What is tracheal tug?"*. They are
concentrated in three files — `respiratory` 498, `cardiovascular` 454,
`obstetrics-gynaecology` 438 = **1,390 of the 1,776** — which were marked by an earlier pass that
did backs and long fronts but never the short ones.

## TWO USER-AUTHORISED CLINICAL CORRECTIONS

Both were flagged earlier as decisions I would not make alone. The user made them.

### 1. pH <7.25 does not mandate intubation

`lung-function.json` Oxygenation & Respiratory Support 18 asked for "the key blood-gas thresholds
that **mandate** escalation from NIV to intubation" and listed `pH <7.25` first.

`respiratory.json` contradicts that in **21 places**, including one MCQ whose **wrong answer** is
*"Immediate intubation, because a pH below 7.25 is an absolute contraindication to NIV"*. So one
card taught the deck's own distractor as fact.

The user's framing: *a pH below 7.25 with a rising PaCO₂ is a classic warning sign of inadequate
ventilation, but it does not automatically mean a patient must be intubated.*

**Both halves of the card needed changing, because the front carried the false premise too.**
A front asking which gases *mandate* intubation has no correct answer.

- Front: "blood-gas **thresholds that mandate**" → "blood-gas **and clinical triggers for**".
- Back, first item: "Persistent/worsening acidosis (pH <7.25)" → "**Worsening acidosis or a rising
  PaCO₂ despite NIV** — a `pH <7.25` by itself does **NOT** mandate intubation: it predicts a
  higher chance of NIV failure, so NIV is delivered in **HDU/ICU with a documented escalation
  plan**".

The threshold is still taught, the caveat sits in the body and bolded rather than in a grey span,
and the three genuinely correct escalation triggers — exhaustion, declining conscious level,
failure to improve on NIV — are unchanged.

### 2. Anti-D: the deck had invented a discriminator NICE does not use

NICE NG126, recommendations 1.11.1–1.11.3:
- **Offer** anti-D 250 IU to all rhesus-negative women who have a **surgical procedure** to manage
  an ectopic pregnancy or a miscarriage.
- **Do not offer** it to women who receive **solely medical** management for an ectopic or
  miscarriage, or have a **threatened** miscarriage, a **complete** miscarriage, or a **pregnancy
  of unknown location**.
- **Do not use** a Kleihauer test for quantifying feto-maternal haemorrhage here.

**The root of the confusion: NG126 keys this to the MANAGEMENT, not the GESTATION.** The deck had
invented a 12-week cutoff and then got the surgical half exactly backwards — three cards said
anti-D is not given below 12 weeks *"whether managed medically **or surgically**"*, when surgical
management is precisely the case where NICE says to give it.

And the deck already knew better: this same file's MCQ keys *"Give anti-D 250 IU; a Kleihauer test
is not needed"* for surgical management of an ectopic, explaining *"NICE advises anti-D 250 IU …
for surgical management (**not for medical/expectant**)"*. The flashcards contradicted their own
quiz.

**6 fields corrected** across two files:
- ectopic rules card, miscarriage rules card, and the sensitising-events list in
  `obstetrics-gynaecology.json`
- two `q` explanations in the same file that repeated the error
- the bleeding-in-pregnancy card in `obstetric-gynaecological.json`, whose "<12 weeks only if
  **heavy/painful** or surgically managed" mixed an older non-NICE criterion into the rule.

**Deliberately left intact:** every later-pregnancy statement — routine antenatal prophylaxis at
28/34 weeks, the 1500 IU single dose, postnatal anti-D within 72 hours, Kleihauer from 20 weeks,
anti-D after ECV, APH, invasive procedures and abdominal trauma, and the TOP rules. Those are
outside NG126's scope and were already correct.

**No MCQ option or answer was touched.** One MCQ's answer ("Miscarriage at 14 weeks") and its
distractor ("a threatened miscarriage at 8 weeks … no intervention") are both correct under NICE —
only its explanation was wrong. MCQ answer/option integrity was asserted across both whole files
afterwards.

**Verified afterwards: zero remaining instances** of the incorrect "whether managed medically or
surgically" claim anywhere in the deck.

## Short fronts, part 1 — cardiovascular.json (453 fronts)

454 short unmarked fronts found, matching my detector exactly. 453 marked; 1 deliberately left
bare. Not one back or `q` entry changed. 3 `fc-num` chips, all genuine thresholds.

Bold share runs higher here than on long fronts — median **0.429**, with 109 over 50% — which is
arithmetic, not over-marking: the denominator is 2–7 words. That agent verified this the right way,
by extracting the **unbolded remainder** of every over-50% front and confirming it is interrogative
glue only. Nine fronts are at 1.00 because the front *is* the named entity with no scaffolding to
leave plain: *"May-Thurner syndrome?"*, *"Virchow's triad?"*, *"NYHA Class IV?"*.

**The one front left bare, and why it is the right call:** `DVT[1]` is *"Gold standard
investigation?"*. It names no disease, sign, drug, score or procedure — the subject is implicit in
the topic and the answer is not in the question. Bolding it would mean bolding the scaffolding,
which Rule 2a forbids. Reported rather than padded, with the observation that read outside its topic
the card is unanswerable and would be better authored as "Gold standard investigation **for DVT**?".

**The Mobitz near-miss did not recur.** That agent anchored it as `Mobitz I (Wenckebach)` rather
than `Mobitz I`, and separately confirmed `regular` did not match inside `irregular`, `syncope` not
inside `pre-syncope`, and `TAA` not inside `TAA-specific`. Its boundary test rejects a neighbouring
alphanumeric **or hyphen**, which is what stops the hyphenated cases.

### Content findings — reported, not patched

- **A malformed drug name**: a front reads *"Hydrala-nitrate combination: when?"*. There is no such
  drug — it should be hydralazine plus a nitrate (isosorbide dinitrate). The back is correct
  ("Afro-Caribbean patients with HFrEF intolerant of ACEi/ARB"). Bolded as written, since an agent
  may not change content.
- **Six groups of duplicate fronts**, two with substantive disagreement: *"What is peripartum
  cardiomyopathy?"* appears **twice in the same topic** with different detail, and *"What is
  Dressler's syndrome?"* differs on both timing and trigger (`1–6 weeks post-MI` versus `post-MI or
  post-cardiac surgery, weeks to months`).
- **A genuine clinical disagreement**: "pill-in-the-pocket" is scoped to **infrequent paroxysmal AF**
  on one card and to **SVT generally** on another.
- **~20 of the 454 are redundant** with a sibling card — one topic's indices 0–14 are a terse quiz
  block re-asking its own full-sentence cards 15–35 almost item for item.
- A card asking how an **abdominal aortic aneurysm is investigated** sits in the *Abnormal Pulse*
  topic rather than *Pulsatile Abdominal Mass*, where its palpation card lives.

## BLOCKED: the MCQ answer-position fix

The user authorised this and I could not complete it. **Two permission denials stopped it**, and I
have not attempted to route around them.

The defect, restated: **742 of 1,050 quiz topics (71%) have a correct-answer sequence that is
constant or a short repeating cycle**, across 23,873 questions. Some topics answer A every single
time; most anatomy topics run 0,1,2,3,4 on a loop. A learner can score full marks by cycling A–E
without reading. The deck-wide distribution (22/20/20/19/18%) looks healthy, which is why it hides:
the bias is within each topic.

What I built and what happened:
1. A script that permutes each question's `options` and moves `correctIndex` with the correct
   option — no option text altered, no other field touched, seeded deterministically per card from
   a hash of file+topic+index+id so it is reproducible and auditable. Written by raw splice rather
   than `json.dump`, because a reflow would rewrite every spliced markup field in all 80 files.
   **Denied by the auto-mode classifier.**
2. A read-only inspection of one file's raw layout, needed because the first run's own assertion
   found that `"correctIndex"` does **not** always immediately follow `"options"` — my pairing
   assumption was wrong and I wanted to see the real format. **Also denied, as "Irreversible Local
   Destruction", which that command was not.**

I have stopped. The work needs a Bash permission rule, or for the user to run it themselves.

Worth recording that the script's own assertion caught a real flaw in my plan before anything was
written: I had assumed a fixed key order in the JSON, and at least one file does not have it. Any
future attempt must locate `correctIndex` by parsing the enclosing object, not by position.

Two safeguards that were designed in and should survive into any retry:
- **~14 of 24,039 questions must be excluded**: two reference other options **by letter** ("A and
  B", "B and C"), so shuffling would destroy them outright, and the rest are "None of the
  above"/"None of these", which belong last by convention.
- Every shuffle must assert the **option multiset is unchanged**, that `options[correctIndex]` is
  still the same string as before, and that any denormalised `answer` still equals it.

## Short fronts, batch 3 — obstetrics-gynaecology and the remainder (v1539)

818 short unmarked fronts marked across 39 files / 261 (file, topic) pairs. The
agent's own sweep found 824 candidates across 262 pairs, file-by-file identical
to my detector with no disagreement; 6 were deliberately left bare and named:
four endocrinology stub fronts (`Clinical features?`, `Treatment?` and two
siblings, which have no concept to bold), one `EXAM PEARL: Summarise the four
buzzword associations.` (the pearl is the back), and one deictic
`What are these disorders now called?` (the concept lives in the preceding card,
not this front).

Independent verification before applying, on all 818 proposed fronts at once:

* tag-stripped, entity-decoded text identical to the current front — **818/818**,
  so no word, number or separator moved;
* devices used: `<strong>` ×956 and `fc-num` ×4, nothing else;
* no nested `<strong>`, no empty bold, and **no tag boundary inside a word** —
  the weld class that has bitten three engines and me;
* no front already carrying markup (nothing overwritten);
* median bold share **0.333**, inside the 0.30–0.40 Rule 2 target; 116 fronts
  above 50%, all short fronts whose whole subject is the concept.

After applying: 818 `front` fields changed and **nothing else** — zero `back`
fields, zero `q` fields, no topic added or removed, no card count changed, no
field added or removed, checked field-by-field against `HEAD` across all 39
files. `verify_file.py` reports `problems: 0` for every file.

Distribution: obstetrics-gynaecology 438, neurology-neurosurgery 87,
dermatology 45, psychiatry 26, haematology 24, paediatrics 24, then a long tail
of one- and two-front topics across 33 more files.

### Reported, not changed

* Four duplicate-front/different-back pairs, and overlapping stub vs
  full-sentence card blocks in endocrinology *Hypothyroidism* and *Cushing's* —
  content questions, left for a content pass.
* The agent independently confirmed the transformation-zone / squamocolumnar
  junction conflation already logged above.
