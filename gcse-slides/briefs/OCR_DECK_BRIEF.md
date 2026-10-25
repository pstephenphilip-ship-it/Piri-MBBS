# Brief: OCR J260 Combined Science B (Twenty First Century) deck series

You are building the next deck in a teacher's series. Work in /tmp/claude-0/-home-user-Piri-MBBS/89c8b6e3-286f-51a7-8036-c7ffaf8182ac/scratchpad/ocr21/. Write ONLY your own files:
build_<code>.js, the output pptx, SPEC_<code>.md, render_<code>/, lo_<code>/, and render_<code>.sh if you want one.

## Base it on the approved decks
- Read build_B2_1.js (latest approved) and build_B1_3.js, which has the HT pill. Copy their helpers, palette, cover, slide types, footer pattern and structure exactly.
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
