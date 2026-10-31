# SPEC_C5_2: OCR J260 Combined Science B (Twenty First Century), C5.2 How are the amounts of substances in reactions calculated?

Chapter C5 **Chemical analysis**. This deck is Part 2 of 3.

## J260 code and sub-topic count
- **J260 C5.2 = J258 C5.3** "How are the amounts of substances in reactions calculated?". J258 C5.2 "How do chemists find the composition of unknown samples?" is separate-science only, so J260 numbers the later sub-topics one lower.
- Evidence (WebSearch extracts; every fetch of ocr.org.uk, plutoniumscience, tutordex, studydex, PMT, edu.rsc.org and the cambridgeassessment mirror failed with ENOTFOUND):
  - OCR J260 Advance Information, Summer 2022: C5 sections listed as C5.1 separated and tested for purity, **C5.2 amounts of substances in reactions calculated**, C5.3 amounts of chemicals in solution measured.
  - docbrown.info combined page (2016ocr21chemB2c.htm): "Revision summary Chapter C5.2 How are the amounts of substances in reactions calculated?". The separate page (B2.htm) gives it as C5.3.
  - An RSC resource tags "OCR Combined Science B C5.2.2" (non-enclosed systems) and "C5.2.3 / C5.2.7" (Mr; masses from a balanced equation). The same resource tags the J258 statement as C5.3.2.
  - SPEC_C5_1.md reached the same list independently.
- Confidence: **high** for the code, the title and N = 3.

## Statements
| Code | Statement | HT | Confidence | Slides |
|---|---|---|---|---|
| C5.2.1 | recall and use the law of conservation of mass | | Wording **high** (RSC quotes J258 C5.3.1). Code **medium–high** (inferred by the shift). | 5 (recap 7) |
| C5.2.2 | explain any observed changes in mass in non-enclosed systems during a chemical reaction and explain them using the particle model | | Wording **high**. Code **high** (RSC "Combined Science B C5.2.2"). | 6, 18–19 (recap 7) |
| C5.2.3 | calculate relative formula masses of species separately and in a balanced chemical equation | | Wording **high**. Code **high** (RSC). | 8, 9 (recap 10) |
| C5.2.4 | describe the measurement of amounts of substance in moles, including the Avogadro constant (6.02 × 10²³) | HT | Wording and code **UNVERIFIED** (from memory of the J258 structure). | 11 (recap 13) |
| C5.2.5 | relate the mass of a substance to its amount in moles, and vice versa | HT | **UNVERIFIED** | 12 (recap 13) |
| C5.2.6 | deduce the stoichiometry of an equation from the masses of reactants and products | HT | Wording medium. Code **UNVERIFIED**. | 15 (recap 16) |
| C5.2.7 | use a balanced equation to calculate masses of reactants or products | HT for the moles route (UNVERIFIED) | Wording **high**. Code **high** (RSC). | 14 (recap 16) |
| C5.2.8 | explain the effect of a limiting quantity of a reactant on the amount of products it is possible to make, in terms of amount of product in moles or masses in grams | HT | Wording medium–high (an OCR B revision extract). Code **UNVERIFIED**. | 17 (recap 20) |

**HT:** I could not see the bold markers in the spec document. Moles, the Avogadro constant, stoichiometry and limiting reactants are marked HT. This matches every GCSE board and the Oak National Academy OCR "Higher" lesson split (UNVERIFIED for J260). For C5.2.7, the deck teaches two routes:
- Foundation: scaling the Mr ratio, which is conservation of mass plus ratio. All students learn this.
- HT: the moles route, which carries the HT pill.

**Possible J258-only content not taught:** a tutoring index lists molar gas volume (24 dm³ at RTP) under J258 C5.3. I could not confirm it for J260, so it is left out.

## Practical
- No PAG code. SPEC_C5_1.md lists the Combined chemistry PAGs as C1 electrolysis, C2 distillation, C3 separation, C4 salts and C5 rates; none covers this sub-topic.
- The slides therefore use the label **SUGGESTED PRACTICAL**: the mass change when magnesium burns (the RSC classic).
- **Slide 18** covers method and apparatus:
  - Apparatus drawn: crucible with lid lifted, pipeclay triangle, tripod, Bunsen and heat-resistant mat, plus a balance reading to 0.01 g.
  - IV is the mass of Mg; DV is the mass of oxygen gained; the controls are listed.
  - CLEAPSS-style safety: Mg ribbon FLAMMABLE; do not look at the flame; hot crucible, so use tongs; eye protection.
- **Slide 19** covers results and analysis:
  - A results table for 5 masses of Mg.
  - A to-scale graph of mass of oxygen against mass of Mg, with a line of best fit through the origin (gradient 0.66) and the anomaly at 0.48 g circled.
  - The HT formula calculation gives a ratio of 1 : 1, so MgO.
  - Errors and improvements: smoke loss, incomplete reaction, weighing while hot, heating to constant mass.

## Data conventions
Ar values are given to 1 d.p., as on the OCR periodic table: H 1.0, C 12.0, N 14.0, O 16.0, Na 23.0, Mg 24.3, S 32.1, Cl 35.5, Ca 40.1, Cu 63.5. The Oak OCR lessons are labelled "RAM 1 d.p.". Every Mr is computed in node from the formula.

## Equations (atom balance asserted in node: 13 equations, plus 2 unbalanced cases that must throw)
- CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄
- 2Mg + O₂ → 2MgO
- CaCO₃ → CaO + CO₂
- CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂
- CH₄ + 2O₂ → CO₂ + 2H₂O
- 2H₂ + O₂ → 2H₂O
- C + O₂ → CO₂
- Mg + 2HCl → MgCl₂ + H₂
- Zn + 2HCl → ZnCl₂ + H₂
- 2Cu + O₂ → 2CuO
- CuCO₃ → CuO + CO₂
- H₂ + Cl₂ → 2HCl
- starter: Fe₂O₃ + 3CO → 2Fe + 3CO₂

## Maths
117 calcs are asserted, including:
- 21 Mr values.
- Mr totals on both sides of four equations.
- Avogadro: 2.5 mol of molecules → 1.5 × 10²⁴.
- Mass and moles: 88.0 g CO₂ → 2.00 mol; 0.250 mol CaCO₃ → 25.0 g.
- Reacting masses: 8.0 g CH₄ → 18.0 g H₂O; 25.0 g CaCO₃ → 11.0 g CO₂.
- Stoichiometry: Mg/O₂/MgO in the ratio 2 : 1 : 2.
- Limiting: 4.86 g Mg + 4.80 g O₂ → 8.06 g MgO.
- Practical data and line reading.
- Every recap, full-question and homework answer.

## Marks
- Recaps: 5 × 8 marks. Recap 3 is all HT; other HT parts are flagged.
- Full question: 13 marks, on the decomposition of CuCO₃ in an open crucible; (e) is HT.
- Homework: 17 marks; Q4 and Q5 are HT. Q7 is a 6-mark OCR levels question: method for finding the mass of oxygen that reacts with Mg, and an explanation of the mass increase given conservation of mass.
- All totals are asserted.

## Overlap control
- C5.1 (separation, purity) appears in one starter question only.
- C5.3 (concentration, solutions, titration) is not taught, and no concentration key words are used.
- Formulae and balancing come from C2/C3 and are used, not retaught.

## J260 Chapter C5 sub-topics (N = 3)
- C5.1 How are chemicals separated and tested for purity?
- **C5.2 How are the amounts of substances in reactions calculated?** (this deck)
- C5.3 How are the amounts of chemicals in solution measured?
