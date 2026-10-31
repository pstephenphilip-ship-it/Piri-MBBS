# SPEC_C5_1: OCR J260 Combined Science B (Twenty First Century), C5.1 How are chemicals separated and tested for purity?

## J260 Chapter C5 "Chemical analysis": confirmed sub-topic list (N = 3)
| J260 code | Title | J258 (separate) code | Confidence |
|---|---|---|---|
| **C5.1** | How are chemicals separated and tested for purity? | C5.1 | **High**. OCR C5 scheme-of-work extract gives "Chapter C5: Chemical analysis, C5.1 How are chemicals separated and tested for purity?". The caller's J258/J260 planning booklet lists it as combined (7 h). |
| — | *How do chemists find the composition of unknown samples?* | C5.2 | **Separate only (J258). Not in J260.** This is why J260 numbering shifts down by one from here. |
| **C5.2** | How are the amounts of substances in reactions calculated? | C5.3 | **High**. The docbrown.info combined-science page (2016ocr21chemB2c.htm) extract reads "Revision summary Chapter C5.2 How are the amounts of substances in reactions calculated?". The planning booklet extract lists it as 10 h (separate) / 6.5 h (combined). |
| **C5.3** | How are the amounts of chemicals in solution measured? | C5.4 | **High** (raised from medium). My own evidence was the J258 C5.4 title plus the one-place shift. SPEC_C5_3.md then found a docbrown combined heading "Chapter C5.3 How are the amounts of chemicals in solution measured?", RSC tags "Combined Science B C5.3.1/.2/.6/.7", and OCR's C5 scheme of work marking C5.2 "(separate science only) 6 / 0" h. |

So the cover reads "Part 1 of 3 in Chapter C5: Chemical analysis".

### Combined Science chemistry PAG codes (OCR, shared J250/J260)
OCR's "example set of combined science practicals" lists: **PAG C1 Electrolysis, PAG C2 Distillation, PAG C3 Separation techniques, PAG C4 Production of salts, PAG C5 Measuring rates of reaction**.
- An OCR PAG document is headed "Chemistry PAG 3: Separation techniques / Combined Science PAG C3: Separation techniques" and links to Suite B C5.1.4 and C5.1.6.
- J258 tags C5.1.7 and C5.1.8 with PAG3 and PAG7 (separate numbering: 3 = separation techniques, 7 = production of salts).
- One older OCR Gateway support document says "PAG C4: Distillation of mixtures", which conflicts with the list above. This deck uses the example-set labels (C2 / C3 / C4).

## Deck
- Output: `OCR21C_C5.1_SeparationPurity_Combined.pptx`, 28 slides, built by `build_C5_1.js` and rendered by `render_C5_1.sh` into `render_C5_1/` (c1–c4.png).
- Cover: "C5.1 Separation and purity". The full title is in the subtitle and footer, and the footer boxes are widened to 11.1 in.

## Statements (J258 C5.1 wording, same code in J260)
The wording comes from WebSearch extracts (tutordex J258 topic list, PMT OCR-B C5.1 notes, revision listings). ocr.org.uk, cambridgeassessment.org.uk, docbrown.info, tutordex.net and cognito.org all failed on fetch (host not allowed), so I used search extracts only.

| Code | Statement | HT | Confidence | Slides |
|---|---|---|---|---|
| C5.1.1 | useful materials are formulations of mixtures | no | wording medium; code high | 5 (R1) |
| C5.1.2 | the scientific versus everyday meaning of "pure" | no | wording medium; code high | 5 (R1) |
| C5.1.3 | use melting point data to distinguish pure from impure substances | no | high | 6 (R1) |
| C5.1.4 | chromatography involves a stationary and a mobile phase; separation depends on the distribution between the phases | no | medium–high | 8, 12 (R2) |
| C5.1.5 | interpret chromatograms, including calculating Rf values | no | high | 9, 13 (R2, R3) |
| C5.1.6 | suggest chromatographic methods for distinguishing pure from impure substances: paper chromatography, aqueous and non-aqueous solvents, locating agents | no | high | 10, 12 (R2, R3) |
| C5.1.7 | describe, explain and exemplify filtration, crystallisation, simple distillation and fractional distillation (J258: PAG3, PAG7) | no | high (two extracts agree) | 15, 16, 17, 20, 22, 23 (R4–R6) |
| C5.1.8 | suggest suitable purification techniques given information about the substances involved (J258: PAG3, PAG7) | no | high | 19 (R5) |

**HT:** I found no bold (Higher-only) statement in C5.1 (UNVERIFIED: the spec PDF was not reachable). No slide carries the HT pill. Extension points are marked GRADE 7–9 STRETCH in the speaker notes: why impurities lower the melting point, the distribution and attraction explanation, and the ethanol–water distillation limit.

## Practicals
- **PAG C3 Separation techniques:** paper chromatography of dyes. Slide 12 covers apparatus, method, variables and safety. Slide 13 covers the results table, a graph to scale of dye distance against solvent-front distance (gradient = Rf), the Rf calculation and errors.
- **PAG C2 Distillation:** apparatus is drawn on slides 16 and 17. Slide 20 covers the fractional distillation of 50 cm³ of ethanol–water: method, safety, temperature table, graph to scale, fraction 1 = 12 cm³ = 24%, and errors.
- **PAG C4 Production of salts:** copper(II) sulfate from CuO and H₂SO₄. Slide 22 covers the four stages drawn, method and safety. Slide 23 covers the solubility curve to scale, the masses table, crystals on cooling (55.0 − 20.7 = 34.3 g) and errors.
- **Hazards (CLEAPSS style):**
  - ethanol and propanone: HIGHLY FLAMMABLE, eye irritant
  - ninhydrin spray: HARMFUL / IRRITANT, sprayed in a fume cupboard
  - H₂SO₄ at 1.0 mol/dm³: IRRITANT
  - CuO and CuSO₄·5H₂O: HARMFUL if swallowed, eye irritant, toxic to aquatic life

## Equations (atom balance asserted in node; 6 equations, plus 2 unbalanced test cases that must throw)
- CuO(s) + H₂SO₄(aq) → CuSO₄(aq) + H₂O(l)
- CuSO₄ + 5H₂O → CuSO₄·5H₂O
- CuSO₄·5H₂O → CuSO₄ + 5H₂O
- CuCO₃ + H₂SO₄ → CuSO₄ + H₂O + CO₂

## Maths (32 asserted calcs; data illustrative unless stated)
- Paint formulation: 250 g gives 100 g binder and 62.5 g pigment. Medicine: 2.5% of 400 g = 10 g.
- Melting range 115–119 °C against 122 °C (benzoic acid).
- Rf: A 0.30, B 0.60, C 0.70, D 0.85 (front 8.0 cm). 3.1/6.2 = 0.50. Amino acids 0.30 and 0.60. Practical gradients 0.60 and 0.30.
- Rock salt: 36% salt (QC 32%). Sea water: 7.0 g salt and 193 g water.
- Distillation fraction: 24%.
- CuO reacted: 1.99 g.
- Solubility of CuSO₄ (approximate data-book values: 14.3, 20.7, 28.5, 40.0, 55.0, 75.4 g per 100 g water at 0–100 °C): 34.3, 54.7 and 19.3 g crystallise.

## Marks
- Recaps: 6 × 8 marks.
- Full question: 13 marks, parts (a)–(f), with no HT part.
- Homework: 17 marks. Q7 is a 6-mark OCR levels question: "A mixture contains sand, salt and water: obtain dry sand, salt crystals and pure water, and explain each method."
- All totals are asserted.

## Overlap control
- Moles, reacting masses, yield, concentration and titration are for C5.2 and C5.3 and are not taught here. The salt practical is used only for filtration and crystallisation; no percentage yield is calculated.
- C1 (potable water), C2 (particles, formulae) and C4.2 (ionic bonding) appear only as starter recall.

## Sources (WebSearch extracts)
- OCR C5 scheme-of-work docx (title of C5.1).
- docbrown.info 2016ocr21chemB2c.htm (combined page; C5.2 heading).
- physicsandmathstutor OCR B C5 topic list and C5.1 notes.
- tutordex J258 C5.1 (C5.1.1–C5.1.8, PAG3, PAG7).
- OCR "example set of combined science practicals" (PAG C2 Distillation, PAG C4 Production of salts, PAG C5 Rates).
- OCR PAG C3 separation techniques activity document (Suite B C5.1.4 and C5.1.6).
- Cognito (Combined drops separate PAG 1, 5 and 6).
