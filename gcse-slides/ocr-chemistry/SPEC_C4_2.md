# SPEC_C4_2: OCR J260 Combined Science B (Twenty First Century), C4.2 How do bonding and structure affect properties of materials?

Chapter C4 **Material choices**. This deck is Part 2 of 4.

## J260 code and sub-topic count
- **C4.2 in J260 is NOT the polymer-types topic.** J258 (Chemistry B, separate) C4.2 "What are the different types of polymers?" (addition and condensation polymerisation, natural polymers) is marked **separate science only** (OCR material-choices delivery guide and PMT OCR-B notes, search extracts). So J260 renumbers the later J258 sub-topics down by one.
- **J260 C4.2 = "How do bonding and structure affect properties of materials?"** (J258 C4.3). Evidence:
  - **OCR J260 Advance Information, Summer 2022** (ocr.org.uk PDF, search extract): "Section C4.1 How is data used to choose a material for a particular use?" … "C4.2 how bonding and structure shape properties", "C4.3 nanoparticles", "Section C4.4 What happens to products at the end of their useful life?".
  - **RSC Education lesson-plan page** "Linking structure, bonding and substance properties" (search extract): lists "C4.2 How do bonding and structure affect properties of materials?" with C4.2.1 on bulk properties (strength, melting point, electrical and thermal conductivity, hardness) related to the bonds in the material.
  - **docbrown.info combined page** 2016ocr21chemB2c.htm (search extract): "Topic C4.2 extends the study of properties to looking at bonding and structure in order to explain why a particular material behaves as it does … the bonding in metals, polymers and giant covalent structures … different materials can be made from the same atoms but have different properties".
  - SPEC_C4_1.md (parallel agent) reached the same list independently.
- **J260 Chapter C4 has 4 sub-topics** (N = 4).

Confidence: **high** for the title and that it is in J260; **high** for N = 4.

## Statements (reconstructed; exact J260 wording NOT seen)
ocr.org.uk, plutoniumscience.com (J260 spec PDF), docbrown.info, edu.rsc.org and thinka.ai were all unreachable by fetch (ENOTFOUND / proxy 403). Wording below is from search extracts plus the J258 C4.3 structure, renumbered.

| Code | Statement (summary) | HT | Confidence | Slides |
|---|---|---|---|---|
| C4.2.1 | Explain how the bulk properties of materials (including strength, melting point, electrical and thermal conductivity, brittleness, flexibility, hardness and malleability) are related to the different types of bonds they contain, their bond strengths in relation to intermolecular forces and the ways in which their bonds are arranged, recognising that the atoms themselves do not have these properties | | Wording medium–high (RSC extract); code high | 5, 6, 8, 14 |
| C4.2.2 | Describe the nature and arrangement of chemical bonds in polymers and relate them to properties (covalent bonds in chains, intermolecular forces between chains, chain length, cross-links) | | Content high (docbrown, RSC); wording and code **UNVERIFIED** | 9, 10, 16–17 |
| C4.2.3 | Describe the nature and arrangement of chemical bonds in giant covalent structures | | Content high; code **UNVERIFIED** | 12 |
| C4.2.4 | Explain the properties of diamond and graphite in terms of their structures and bonding (melting point, hardness, conductivity and lubricating action of graphite) | | Content high (RSC extract "C4.3.6" in a J258 list); J260 code **UNVERIFIED** | 12, 13 |

- **HT:** no statement in this sub-topic was found marked Higher-only (bold) in any extract. No HT pills are used. The bond-energy calculation on slide 12 is marked **GRADE 7–9 STRETCH**. If your copy of the spec shows a bold statement, tag it in class.
- Ideas about Science: models and their limitations (ball-and-stick, 2D drawings) on slides 5, 6, 12, 13.

## Overlap control
- **C2 / C3 recap only:** ionic bonding (C2), covalent bonding in simple molecules (C2), metallic bonding (J260 C3.1 "how are the atoms held together in a metal", per docbrown extract). They appear as recall, and slide 6 / 14 *use* them to explain bulk properties, as C4.2.1 requires.
- **C4.1 (data to choose a material):** property words (strength, stiffness, hardness, density) recapped in the starter only. No material-selection exercise.
- **J258 C4.2 polymer types:** not taught. Addition polymerisation appears as a one-line equation recap only (so the polymer chain is understood); no condensation or natural polymers.
- **C4.3 nanoparticles:** graphene, fullerenes and nanotubes are NOT taught (named once as "see C4.3").
- **C4.4 life cycle:** not touched.

## Practical
No PAG code was found linked to C4.2. Slides 16–17 are a **suggested practical** (orange pill): cross-linking PVA with borax (sodium tetraborate) solution.
- IV: volume of 4% borax solution added to 25 cm³ of 4% PVA (0–5 cm³). DV: time for the slime to flow 10 cm down a tile at a fixed angle. Controls: PVA volume and concentration, tile angle, temperature, stirring time.
- Apparatus drawn; method; CLEAPSS-style hazards (borax solid is a reproductive toxicant; technician prepares the dilute solution; check the current CLEAPSS Hazcard and recipe. The concentration threshold for classification is UNVERIFIED).
- Results table with 3 repeats and one anomaly; mean graph drawn to scale; ±half-range uncertainty; errors and improvements. Data illustrative.

## Maths (asserted in node; see build_C4_2.js)
- Melting points (approx. data-book values): CH₄ −182, H₂O 0, poly(ethene) ~110 (softens), NaCl 801, Cu 1085, SiO₂ 1710, diamond ~3550 °C. NaCl − CH₄ = 983 °C.
- Alkane chain length vs melting point (approx.): C10 −30, C20 37, C30 66, C40 81 °C (UNVERIFIED ±2 °C). Rises 67, 29, 15 °C.
- Poly(ethene) Mr: 28 × 5000 = 140 000; PVC 62.5 × 2000 = 125 000.
- Diamond: 4 bonds per atom, each shared → 2 bonds per atom; graphite 3/2 = 1.5 (QC 10 atoms → 15 bonds); SiO₂ O per Si = 4 ÷ 2 = 2. Stretch: 2 × 347 = 694 kJ. CO₂ from carbon: 6 g → 22 g, 3 g → 11 g. Delocalised electrons: 10 Mg → 20, 50 Al → 150. Graph read-off at 2.5 cm³ ≈ 32 s (least-squares quadratic) to break the bonds in 12 g diamond (C–C 347 kJ/mol, data-book average).
- Practical: means 3, 10, 24, 41, 62 (anomaly 88 excluded), 87 s; uncertainty ±2 s; 2.3%.
- Equations (atom balance asserted): C(s) + O₂(g) → CO₂(g); Si(s) + O₂(g) → SiO₂(s); 2Na(s) + Cl₂(g) → 2NaCl(s); n C₂H₄(g) → (C₂H₄)ₙ(s).

## Marks
Recaps 4 × 8. Full question 13 (a)–(f). Homework 17 including Q7, a 6-mark OCR levels question: "Diamond and graphite are both made only of carbon atoms. Explain why they have different properties and uses." All totals asserted.

## Sources (WebSearch extracts only)
- OCR J260 Advance Information June 2022 (C4.1–C4.4 section titles).
- OCR 311752 Material choices delivery guide; PMT OCR-B C4 notes (4.2 polymers = separate science only; 4.3 bonding and structure).
- RSC Education "Linking structure, bonding and substance properties" (C4.2 heading, C4.2.1 wording; diamond/graphite statement).
- docbrown.info 2016ocr21chemB2c.htm and B2.htm (C4.2 content; C3.1 metals).
- Oak National Academy OCR combined "Bonding, structure and properties" lessons (Foundation and Higher both exist; no Higher-only content identified).

## J260 Chapter C4 sub-topics (N = 4)
- C4.1 How is data used to choose a material for a particular use?
- **C4.2 How do bonding and structure affect properties of materials?** (this deck)
- C4.3 Why are nanoparticles so useful?
- C4.4 What happens to products at the end of their useful life? (life-cycle assessment)
