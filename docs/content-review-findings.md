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
