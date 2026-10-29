# SPEC_P6_2: OCR J260 Combined Science B (Twenty First Century), P6.2 How does the particle model explain the effects of heating?

Chapter P6 **Matter – models and explanations**, Part 2 of 3 (P6.1, P6.2, P6.3 in J260; P6.4 and P6.5 are J259 only — see SPEC_P6_1.md).

## Sources (WebSearch extracts only; WebFetch could not resolve ocr.org.uk, docbrown.info, pmt.physicsandmathstutor.com, plutoniumscience.com, savemyexams.com, tutordex.net, cyberphysics.co.uk)
- **OCR delivery guide GPBDG022 "P6.2 How does the particle model explain the effects of heating?"** (search extract): it lists the P6.2 learning objectives as (1) density differences between the states explained by the arrangement of atoms/molecules, (2) how mass is conserved in physical changes of state, and (3) how heating changes the stored energy and raises the temperature or produces changes of state. https://ocr.org.uk/qualifications/gcse-twenty-first-century-science-suite-physics-b-j259-from-2016/delivery-guide/topic-gpbt06-p6-matter-models-and-explanations/delivery-guide-gpbdg022-p62-how-does-the-particle-model-explain-the-effects-of-heating/
- docbrown J259/J260 P6 pages (extract): "Topic P6.2 considers how the particle model explains the differences in densities between solids, liquids and gases and the effect of heating both in terms of temperature changes and changes of state." https://www.docbrown.info/page17/2016ocr21physB2c.htm
- Search extract (source unclear, likely a Tutordex/cyberphysics page): "P6.2.4 … explain how the motion of the molecules in a gas is related both to its temperature and its pressure … explain the relationship between the temperature of a gas and its pressure at constant volume (qualitative only)".
- OCR Physics B equation sheets (J259, June 2023/2025) list under P6 "for a given mass of gas at a constant temperature: pressure × volume = constant". A third-party list (Discover Tutoring) labels the same equation as on the "OCR Combined Science B Equation Sheet". https://www.ocr.org.uk/Images/673225-equation-sheet.pdf ; https://discovertutoring.co.uk/gcse-physics-revision/equations/
- J259/04 SAM (search extract): an HT bicycle-pump question (120 cm³ at 100 kPa → 50 cm³) whose mark scheme credits "work done on the gas increases internal energy so temperature rises". https://www.ocr.org.uk/Images/234636-unit-j259-04-depth-in-physics-higher-tier-sample-assessment-material.pdf
- An OCR checklist extract: "explain why changing the temperature of a fixed mass of gas (held at constant volume) causes the pressure exerted by it to increase".
- No PAG linked to 6.2 was found in any extract.

## Learning outcomes (numbering and wording RECONSTRUCTED — UNVERIFIED; check against J260 spec v4.x)
| Code (UNVERIFIED) | Statement (reconstructed) | HT | Confidence | Slides |
|---|---|---|---|---|
| P6.2.1 | Explain the differences in density between the states of matter in terms of the arrangements of atoms and molecules | | Content high (delivery guide); taught in P6.1 deck as P6.1.3 → RECAP only | 4, 5, 8 |
| P6.2.2 | Describe how mass is conserved when substances change state; physical changes are reversible (material recovers its properties) | | Content high (delivery guide); taught in P6.1 as P6.1.1–2 → RECAP only | 4, 5 |
| P6.2.3 | Describe how heating a system changes the energy stored (internal energy) and raises its temperature or produces changes of state | | Content high (delivery guide); taught in P6.1 as P6.1.5 → RECAP only | 4, 5 |
| P6.2.4 | Explain how the motion of the molecules in a gas is related both to its temperature and its pressure; explain the relationship between the temperature of a gas and its pressure at constant volume (qualitative only) | | Medium–high (search extract quoted this wording and the code P6.2.4) | 6, 7, 9, 10, 12, 13 |
| P6.2.4 (support) | Absolute zero, kelvin scale, T = θ + 273 | | LOW: not seen in any J260 extract; included because the p–T graph through absolute zero was requested | 10, 13 |
| P6.2.5 | (HT) Use p × V = constant for a fixed mass of gas at constant temperature | HT | Medium: equation is on the OCR Physics B sheet and (per a third-party list) the Combined Science B sheet; HT status follows the national content. Could be J259 only | 15, 16, 17 |
| P6.2.6 | (HT) Explain how doing work on a gas can increase its temperature (e.g. bicycle pump) | HT | Medium–low: J259 SAM HT question; J260 placement unverified | 18, 20 |
| IaS | Limitations of the particle model (ideas about science: models) | | Medium (generic IaS) | 19, 20 |

Note on overlap with P6.1: the P6.1 deck's notes flagged that density of the states and internal energy might belong to P6.2. The delivery guide confirms they are listed under P6.2 (and so are conservation of mass/physical change). Because P6.1 already teaches them in full, this deck recaps them on one slide (5), in the starter and in Recap 1, and does not re-teach.

## Equations
| Equation | Status | Where |
|---|---|---|
| p × V = constant (p₁V₁ = p₂V₂) | GIVEN (equation sheet), HT | P6.2.5 |
| T (K) = θ (°C) + 273 | RECALL (not on the sheet) | P6.2.4 |
| ρ = m ÷ V | RECALL (recap from P6.1) | P6.2.1 |

## Practical
- **Suggested practical (not a named PAG):** pressure of a fixed volume of air (a flask in a water bath, connected to a pressure gauge) against temperature. Slides 12–13 cover the method, apparatus drawn, variables, safety, a results table, a p–T(K) graph to scale through 0 K, and errors and improvements. Slide 10 replots the same data against °C, extrapolated to −273 °C.
- Boyle's law syringe data (slide 16) is shown as results with p–V (curve) and p–1/V (line) graphs to scale. The method is given in the notes.

## Numbers checked in node (34 calc() asserts plus additional asserts)
- Constant-volume data: p = 100 × T/293 within 0.5%. The least-squares gradient through the origin is 0.341 kPa/K, and the first-to-last extrapolation meets p = 0 within 6 °C of −273 °C.
- Boyle data: pV = 6000, 6050, 5960, 6030, 5960 (mean 6000). The p–1/V gradient is ≈ 6000.
- Air molecule spacing at STP ≈ 3.3 × 10⁻⁹ m ≈ 11 × a 0.3 nm diameter (slide 19).
- All recap, full-question and homework answers are asserted. Recaps total 7/7/7/9/7, the full question 13 and the homework 17.

## Neighbouring content (no overlap)
| Content | Deck |
|---|---|
| Specific heat capacity, latent heat, heating curves, PAG P1, PAG P5 | P6.1 |
| Springs, F = kx, elastic energy, force–extension practical | P6.3 |
| Pressure in fluids, upthrust; Big Bang | J259 only |
