# Brief: Pearson Edexcel GCSE (9–1) Physics (1PH0), Topic 1 deck

**Course:** Pearson Edexcel GCSE (9–1) Physics, 1PH0.
**Topic:** Topic 1 "Key concepts of physics".
**Format:** ONE big deck for the whole topic, covering both tiers, about 22–28 slides (Topic 1 is short: compact deck). Match the approved T9, T10 and T15 decks.

## Work folder and setup
- **Folder:** /home/user/Piri-MBBS/gcse-slides/edexcel-physics/
- **Write ONLY these files:**
  - build_T1.js
  - EDX_1PH0_T1_KeyConcepts.pptx
  - SPEC_T1.md
  - render_T1.sh
  - render_T1/
  - lo_T1/
- Do NOT edit edx_template.js. Put any new helpers in a DECK-SPECIFIC block in build_T1.js.
- Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules.

## Read first
- ../briefs/EDX_PHYS_BRIEF.md. Its "EDEXCEL OVERRIDES" section and the physics rules apply: equation, substitute, rearrange, answer with units and sensible s.f.; recall vs given equation status. Ignore its old scratchpad paths and the OCR wording.
- build_T10.js, SPEC_T10.md and render_T10.sh, the latest approved deck. Copy the DECK config, structure, slide types, density, the EQS recall/given table, the SPEC format and the render script.
- build_T2.js and SPEC_T2.md: the most recent approved deck. It is your closest model.

## Spec
- WebSearch the Topic 1 statements (expected 1.1 to about 1.6). Record their exact wording, H markers and confidence in SPEC_T1.md. Mark anything from memory as UNVERIFIED.
- Expected content:
  - the seven SI base units, plus derived units (e.g. N, J, W, Pa, C, V, ohm, Hz)
  - prefixes from giga to nano: G, M, k, c, m, micro, n
  - converting units: km/h to m/s, minutes and hours to seconds, kWh to J, cm2/cm3 to m2/m3
  - standard form
  - significant figures
  - estimation and orders of magnitude (if in spec)
- Teach it as a maths-skills toolkit with many worked examples using physics contexts from later topics. There is no Core Practical. Instead, add slides on measurement:
  - reading scales and instruments
  - resolution
  - random and systematic error, accuracy and precision, anomalies, and means. Check whether these are in Topic 1 or only in the practical skills appendix, and label them accordingly.

## Deck structure (as T10)
1. Title
2. Objectives
3. Where this fits (say whether there are physics-only statements)
4. Retrieval starter
5. Content slides, each with a native-shape diagram and a quick check
6. A recap after every 2–3 content slides
7. Measurement and data slides (no Core Practical in Topic 1)
8. Key words
9. Full question (about 13 marks)
10. Homework divider
11. Homework (about 17 marks, including a 6-mark Edexcel levels question)

Also:
- Every calculation is verified with calc().
- Equation slides state RECALL or GIVEN.
- Mark schemes go in the speaker notes.

## Diagrams (LARGE, CLEAR, CORRECT)
- a prefix ladder with powers of ten
- a unit-conversion flow (multiply / divide by)
- scale readings (ruler, measuring cylinder meniscus, thermometer, ammeter dial)
- a precision vs accuracy target diagram
- an orders-of-magnitude scale (atom to galaxy) drawn on a log scale

## QA
Render with LibreOffice using your own profile (-env:UserInstallation=file://$PWD/lo_T1). Look at EVERY slide, fix any problems and re-render until clean. Make contact sheets.

## Report
- output path, slide count and slide list
- spec confidence
- H statements
- physics-only statements
- core practical
- uncertain points

