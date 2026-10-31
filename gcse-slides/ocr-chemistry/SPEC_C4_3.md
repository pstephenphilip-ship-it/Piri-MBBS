# SPEC_C4_3: OCR J260 Combined Science B (Twenty First Century), C4.3 Why are nanoparticles so useful?

Chapter C4 **Material choices**. This deck is Part 3 of 4.

## J260 code and sub-topic count
- **J260 C4.3 = "Why are nanoparticles so useful?"** It is J258 (Chemistry B, separate science) C4.4, renumbered. It is NOT "How do bonding and structure affect properties of materials?": that is J260 C4.2 (J258 C4.3). Bonding and structure is in J260, so it is not J258-only.
- What is J258-only: J258 C4.2 "What are the different types of polymers?", so J260 renumbers every later sub-topic down by one.
- Evidence (WebSearch extracts only):
  - **J260 specification PDF** (plutoniumscience.com mirror, search extract): "C4.1 How is data used to choose a material for a particular use? … C4.2 How do bonding and structure affect properties of materials?; C4.3 Why are nanoparticles so useful?"
  - **RSC Education "Nanoparticles in sunscreen challenge"** (search extract): lists OCR Combined Science B "C4.3 Why are nanoparticles so useful?" with C4.3.3, and the same statement as C4.4.x for OCR Chemistry B.
  - **RSC "Toxic socks"** (search extract): cites "C4.3.5 explain the possible risks associated with some nanoparticulate materials".
  - **RSC "Should we worry about nanomaterials?"** (search extract): cites C4.3.1 (nano dimensions compared with atoms and molecules).
  - **docbrown.info:** the combined page (2016ocr21chemB2c.htm) has C4.3 nanoparticles and C4.4 life cycle; the separate page has C4.4 nanoparticles and C4.5 life cycle.
  - SPEC_C4_1.md and SPEC_C4_2.md reached the same list independently.

Confidence: **high** for the code, the title, and N = 4.

## Statements
The exact J260 wording was NOT seen in full. plutoniumscience, ocr.org.uk, docbrown.info, edu.rsc.org, tutordex.net and pmt.physicsandmathstutor.com all failed to fetch with ENOTFOUND (outside the session's allowed network domains).

| Code | Statement | HT | Confidence | Slides |
|---|---|---|---|---|
| C4.3.1 | Compare "nano" dimensions to typical dimensions of atoms and molecules | | High (RSC) | 5, 6 (recap 7) |
| C4.3.2 | Describe the surface area to volume relationship for different-sized particles, and describe how this affects properties | | Medium (J258 spec extract wording) | 8, 9, 11–12 (recaps 10, 14) |
| C4.3.3 | Describe how the properties of nanoparticulate materials are related to their uses, including size, surface area and the arrangement of atoms in tubes or rings | | Medium–high (RSC extract) | 13, 15 (recaps 14, 17) |
| C4.3.4 | Nanoparticles incorporated in or embedded in a matrix (nanocomposites) | | **UNVERIFIED.** Inferred from a Cherry Hill Tuition extract; the code and wording may differ | 16 (recap 17) |
| C4.3.5 | Explain the possible risks associated with some nanoparticulate materials | | High (RSC Toxic socks) | 18, 19 (recap 20) |
| Maths | M1b standard form; M1c ratios; M5c surface area and volume of cubes | | Medium (RSC extract mentions C4.3.6/C4.3.7 for the size and standard-form maths, so those may be extra numbered statements) | 5, 6, 8, 13, 15 |

- **HT:** no statement in C4.3 is marked bold (Higher only) in any extract, so the deck uses no HT pills. Two items are marked **GRADE 7–9 STRETCH**: the 1 cm³ → 10 nm cubes calculation on slide 8, and the 3D surface-atom figures on slide 9.
- **Ideas about Science:** risk, uncertainty, benefits against risks, and who decides (slides 18–19, homework Q6).

## Overlap control
- **C4.2** (SPEC_C4_2.md): diamond, graphite and giant covalent structures are recap only. C4.2 leaves graphene, fullerenes and nanotubes to C4.3, so they are taught on slide 15. Graphene is introduced as "one layer of graphite".
- **C4.1:** composites on a bulk scale belong to C4.1 (build_C4_1.js). Slide 16 teaches only nanocomposites, and its notes say so.
- **C4.4:** life cycle and disposal are mentioned only, as silver washed into waste water.
- **C1:** particulates (PM2.5) and catalytic converters are recap. **C2:** atom size and covalent bonds are recap. **C6:** rates are linked only.

## Practical
No PAG is linked to C4.3 in any source found. Slides 11–12 are a **suggested practical** (orange pill): manganese(IV) oxide powder vs granules (0.5 g each) catalysing 5 cm³ of 10-volume hydrogen peroxide, measured with a 100 cm³ gas syringe.
- 2H₂O₂(aq) → 2H₂O(l) + O₂(g). Atom balance is asserted in node.
- The slides cover the apparatus (drawn), method, IV, DV and control variables.
- Hazards, CLEAPSS style:
  - 10-volume H₂O₂: low hazard at this concentration, but may irritate eyes. Wear eye protection.
  - MnO₂: HARMFUL if swallowed or inhaled. Avoid raising dust.
  - Keep the oxygen away from flames.
- Results table, graph to scale, mean rates of 1.4 and 0.5 cm³/s (ratio 2.8), maximum 50 cm³, errors and improvements.
- The data are illustrative.

## Maths (72 asserted calcs; see build_C4_3.js)
- **Sizes:**
  - 1 nm = 10⁻⁹ m; atom 0.1 nm; 2 nm ÷ 0.1 nm = 20 atoms across
  - QC: 50 nm = 5 × 10⁻⁸ m; hair 8 × 10⁻⁵ m ÷ 80 nm = 1000
- **Standard form:**
  - 35 nm = 3.5 × 10⁻⁸ m; nanoparticle ÷ atom = 350; hair ÷ atom = 8 × 10⁵ (log 5.9)
  - QC: 2.5 µm ÷ 25 nm = 100
- **SA : V:**
  - Cubes: 1 → 6 : 1; 8 × 0.5 cm → 12 : 1; 64 × 0.25 cm → 24 : 1. QC: 2 cm cube → 24, 8 and 3 : 1.
  - Stretch: 1 cm³ as 10 nm cubes gives 10¹⁸ cubes, 6 × 10⁶ cm² = 600 m², a factor of 10⁶.
- **Surface atoms (2D):** 4 × 4 → 75%; 10 × 10 → 36%; QC 6 × 6 → 56%. 3D: 48.8% and 5.9%.
- **Catalyst size:** 10 nm vs 1 µm → 100×. QC: 5 vs 50 nm → 10×.
- **Nanotube:** 1000 : 1. C₆₀: (12 × 5 + 20 × 6) ÷ 3 = 60. QC: 4.5 µm. The fullerene drawing checks that each hexagon shares an edge with the pentagon.
- **Silver in socks** (illustrative, UNVERIFIED pattern after Benn & Westerhoff 2008):
  - 40 → 28 → 20 → 14 → 10 µg/g; 75% lost after 4 washes
  - 20 g sock holds 0.8 mg
  - QC: 30%
- **Full question:** 4 × 10⁻⁹ m; 40 atoms; 96 nm², 64 nm³, 1.5; 1.5 ÷ 0.15 = 10.
- **Homework:** 8 × 10⁻⁸ m; 12 : 1; 75%.

## Marks
- Recaps: 5 × 8 marks.
- Full question: 13 marks, parts (a)–(f). The context is a cerium oxide fuel catalyst.
- Homework: 17 marks. Q6 is a 6-mark OCR levels-of-response question: evaluate silver nanoparticles in socks and in wound dressings.
- All totals are asserted. Mark schemes and quick-check answers are in the speaker notes.

## J260 Chapter C4 sub-topics (N = 4)
- C4.1 How is data used to choose a material for a particular use?
- C4.2 How do bonding and structure affect properties of materials?
- **C4.3 Why are nanoparticles so useful?** (this deck)
- C4.4 What happens to products at the end of their useful life? (life cycle assessment)
