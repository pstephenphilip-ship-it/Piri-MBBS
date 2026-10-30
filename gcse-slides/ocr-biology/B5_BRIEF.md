# Brief: OCR J260 Biology Chapter B5 decks

**Series:** OCR GCSE (9–1) Twenty First Century Science, Combined Science B (J260), Biology Chapter B5 "The human body – staying alive". Each sub-topic gets one deck covering both tiers.

## Work folder and setup
- Work folder: /home/user/Piri-MBBS/gcse-slides/ocr-biology/
- Write ONLY your own sub-topic's new files.
- Do NOT edit ocr_bio_template.js. Other agents are building other B5 decks at the same time. Put any new helpers in a DECK-SPECIFIC block in your own build file.
- Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules.

## Read first
- ../briefs/OCR_DECK_BRIEF.md
- ocr_bio_template.js (approved teal template)
- build_B4_3.js and SPEC_B4_3.md (latest approved deck). Copy their structure, density and quality. The deck-specific helpers in build_B4_1.js, build_B4_2.js and build_B4_3.js (cells, microscope, chromosomes) are approved, so you may copy any that are useful.

## Spec check
Use WebSearch to confirm that your sub-topic is in J260 Combined (some B5 sub-topics may be J257 separate-only), and get its exact title, statements and HT markers.
- If your sub-topic turns out to be J257-only, STOP. Report that, and say which J260 sub-topic list is correct.
- Record the statements, sources and confidence in SPEC_<code>.md.

## Outputs
- OCR21C_<code>_<Short>_Combined.pptx
- build_<code>.js
- SPEC_<code>.md
- render_<code>.sh

The cover reads "Part n of N in Chapter B5: The human body – staying alive". Use the real N for J260. The template's cover title is fixed at 40pt, so use a short cover title; the full title goes in the subtitle and footer.

## Deck structure
- title, objectives, where this fits, retrieval starter
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
- Verify every number in node with calc().
- Draw biological diagrams (heart, nervous system, eye, kidney, glands and so on) large, clear and correctly labelled.

## Overlap
Avoid overlapping other B-chapters and the other B5 decks (read any SPEC_B5_*.md that exists). Recap only.

## QA
Render the deck and look at EVERY slide. Fix problems and re-render until clean. Make 3×3 contact sheets.

## Report
Report:
- output path, slide count and slide list
- spec confidence
- HT statements
- PAG
- uncertain points
- the confirmed J260 B5 sub-topic list
