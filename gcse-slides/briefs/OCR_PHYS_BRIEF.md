# Brief: OCR J260 Combined Science B (Twenty First Century) deck series

You are building the next deck in a teacher's series. Work in /tmp/claude-0/-home-user-Piri-MBBS/89c8b6e3-286f-51a7-8036-c7ffaf8182ac/scratchpad/ocr21p/. Write ONLY your own files:
build_<code>.js, the output pptx, SPEC_<code>.md, render_<code>/, lo_<code>/, and render_<code>.sh if you want one.

## Base it on the approved decks
- Read the base scripts named in "PHYSICS-SPECIFIC RULES" below; copy their helpers, cover, slide types, footer pattern and structure exactly.
- Footer: "OCR GCSE Twenty First Century Science — Combined Science B (J260) | <code> <title> | Higher & Foundation".
- Cover: "Part n of N in Chapter Bx: <chapter title>".
- Also read ../gcse/BRIEF.md and ../bioH/HIGHER_BRIEF.md for the series rules.
- ONE deck covers both tiers. Teach all the Foundation content. Tag Higher-only outcomes (bold in OCR) with the red "HT" pill, and extension material with "GRADE 7–9 STRETCH".

## Spec first
- curl and WebFetch to ocr.org.uk are blocked. Use WebSearch instead; load it with ToolSearch "select:WebSearch,WebFetch".
- Useful sources: the plutoniumscience J260 mirror, Cherry Hill Tuition, docbrown.info J260 pages, the Centre of the Cell curriculum-links PDFs, the OCR J257 delivery guides, and Oak National Academy OCR lessons (Foundation vs Higher lesson titles hint at HT content).
- Write the outcomes, their numbering, HT markers, PAG/maths/IaS links and your sources to SPEC_<code>.md. Mark anything from memory as UNVERIFIED.
- Follow what the spec actually says. Do NOT stray into other sub-topics; read the SPEC_*.md files already in the folder to see what neighbouring decks cover.

## Content (same structure as B2.1)
- Learning objectives mapped to the spec codes, and a "where this fits" slide.
- A retrieval starter that includes recall of earlier decks.
- Content slides, each with a native-shape diagram and a quick check.
- Exam practice after every 2–3 content slides.
- Any linked PAG or suggested practical: method, apparatus drawn, variables, safety, results and sources of error.
- Worked maths verified with node asserts.
- Summary: Key Words.
- A full exam question (a)–(f), about 13 marks.
- Homework, about 17 marks, including a 6-mark OCR levels-of-response question.
- Mark schemes and quick-check answers go in the speaker notes. Assert the marks totals.
- UK spelling, one-line titles, 10pt minimum.

## QA
- Render with LibreOffice, using your own profile: -env:UserInstallation=file://$PWD/lo_<code>.
- Convert to PNG and LOOK at every slide. Fix overflow, overlap and diagram errors, then re-render until clean.
- Make contact sheets: python3 ../gcse/contact.py render_<code>/<pdf> render_<code>/c

## Final report (short)
- Output path and slide count.
- Slide list.
- Spec source: verified or UNVERIFIED.
- HT outcomes.
- Uncertain points.
- The sub-topic list of the NEXT chapter, if your deck is the last in its chapter.

## PHYSICS-SPECIFIC RULES
- These are PHYSICS decks for OCR J260 Combined Science B. The course codes and titles are P1–P6.
- Structure and slide types: copy the approved OCR chemistry template ../ocr21c/build_C1_1.js and its DECK config block. Use ../ocr21c/build_C3_3.js as a recent example: it has practicals, HT pills, maths and drawing helpers. Remove helpers that are only for chemistry, such as eqn() and atoms, or leave them unused.
- Swap the palette for the PHYSICS palette used in ../physH/build_deck_611_H.js (or whichever build_deck_*_H.js exists there). Keep everything else identical: layout, helpers, recap and exam-question formats.
- Every later physics deck copies the first approved physics script (build_P1_1.js) exactly.
- Footer: "OCR GCSE Twenty First Century Science — Combined Science B (J260) | <code> <title> | Higher & Foundation".
- Physics rules:
  - Every calculation uses the OCR equation-sheet style: write the equation, substitute, rearrange (HT where the spec says so), then give the answer with units and sensible significant figures. Verify each one in node.
  - Use SI units and standard form.
  - State whether students must recall each equation or are given it on the equation sheet, following the J260 equation list.
  - Use correct circuit symbols, drawn with native shapes.
