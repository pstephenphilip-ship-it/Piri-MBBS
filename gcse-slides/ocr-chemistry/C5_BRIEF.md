# Brief: OCR J260 Chemistry Chapter C5 decks

**Series:** OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260), Chemistry Chapter C5 "Chemical analysis". Each sub-topic gets one deck covering both tiers.

## Work folder and setup
- Work folder: /home/user/Piri-MBBS/gcse-slides/ocr-chemistry/
- Write ONLY your own sub-topic's new files.
- Do NOT edit ocr_chem_template.js. Other agents are building other C5 decks at the same time. Put any new helpers in a DECK-SPECIFIC block in your own build file.
- Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules.

## Template
ocr_chem_template.js is the approved biology template (../ocr-biology/ocr_bio_template.js) with the palette swapped to chemistry violet. Spec codes must look like C5.1.1.
- The C4 decks (build_C4_1.js … build_C4_4.js) are approved and use this template.
- Use build_C4_4.js (approved, same template) as your structural model; also see build_C4_2.js: copy its structure, density, slide types and quality. Also read SPEC_C4_4.md to see the SPEC file format.
- Change the require to './ocr_chem_template' and the chapter to 'C5' / 'Chemical analysis'.
- Long titles: widen footer boxes to 11.1 in, and set the cover subtitle to 15 pt on two lines if needed. build_C4_2.js and build_C4_4.js already do this.

## Read first
../briefs/OCR_DECK_BRIEF.md and ../briefs/OCR_CHEM_BRIEF.md (series and chemistry rules). In those briefs, ignore the old scratchpad paths: this brief's paths win.

## Chemistry rules
- Write balanced equations with state symbols, and check atom balance in node.
- Work calculations step by step with units and sensible significant figures, verified in node with calc() / assert.
- Write hazards in CLEAPSS-style wording.
- Draw particle, structure and bonding diagrams with native shapes, correctly and clearly. Examples: polymer chains, cross-links, giant covalent lattices, metallic lattices, ionic lattices, nanoparticle surface area to volume.

## Spec check
Use WebSearch to confirm that your sub-topic is in J260 Combined (some C5 sub-topics may be J258 separate-only), and get its exact title, statements and HT markers.
- Possible sources: docbrown.info 2016ocr21chem pages, physicsandmathstutor OCR-B notes, Oak National Academy, the OCR J260 Advance Information (2022), and Cherry Hill Tuition.
- If your sub-topic turns out to be J258-only, STOP. Report that, and say which J260 C5 sub-topic list is correct.
- Record the statements, sources and confidence in SPEC_<code>.md.

## Outputs
- OCR21C_<code>_<Short>_Combined.pptx
- build_<code_with_underscore>.js
- SPEC_<code_with_underscore>.md
- render_<code_with_underscore>.sh

The cover reads "Part n of N in Chapter C5: Chemical analysis". Use the real N for J260. The cover title is fixed at 40pt, so use a short cover title; the full title goes in the subtitle and footer.

## Deck structure
- title, objectives, where this fits, retrieval starter (include recall of C1–C4)
- content slides, each with a native-shape diagram and a quick check
- a recap after every 2–3 content slides
- any PAG practical: apparatus drawn, method, variables, safety, a results table and a graph to scale, worked calculations, errors
- key words
- full question (13 marks)
- homework divider
- homework (17 marks, including a 6-mark OCR levels question)

Also:
- Mark schemes and quick-check answers go in the speaker notes.
- Mark HT statements with the HT pill.
- Verify every number in node.

## Overlap
Avoid overlapping the other C5 decks (read any SPEC_C5_*.md that appears). Recap only.

## QA
Render the deck and look at EVERY slide. Fix problems and re-render until clean. Make 3×3 contact sheets in render_<code>/ (c1.png, c2.png…); see ../ocr-biology/render_B6_3.sh.

## Report
Report:
- output path, slide count and slide list
- spec confidence
- HT statements
- PAG
- uncertain points
- the confirmed J260 C5 sub-topic list

## Practicals (C5)
OCR PAGs are likely here (chromatography, distillation, salt preparation, titration). Name the PAG code if a source confirms it, otherwise "SUGGESTED PRACTICAL". Draw the apparatus correctly (chromatography paper and solvent level below the start line; Liebig condenser with water in at the bottom; burette/pipette).
