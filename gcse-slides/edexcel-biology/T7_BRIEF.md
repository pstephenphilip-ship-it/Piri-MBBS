# Brief: Pearson Edexcel GCSE (9–1) Biology (1BI0), Topic 7 deck

**Course:** Pearson Edexcel GCSE (9–1) Biology 1BI0 (separate biology).

**Topic:** Topic 7, "Animal coordination, control and homeostasis". This is the topic that contains the kidney.

**Format:** ONE big deck covering the whole topic and both tiers. Match the Edexcel physics decks: one deck per topic, 33–45 slides.

## Work folder and setup
- Work folder: /home/user/Piri-MBBS/gcse-slides/edexcel-biology/
- Write ONLY these files: build_T7.js, EDX_1BI0_T7_<Short>.pptx, SPEC_T7.md, render_T7.sh, render_T7/, lo_T7/
- Do NOT edit edx_bio_template.js. Put any new helpers in a DECK-SPECIFIC block in build_T7.js.
- Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules.

## Read first
- ../briefs/EDX_PHYS_BRIEF.md. The "EDEXCEL OVERRIDES" section applies. Ignore its old scratchpad paths and the OCR/physics-specific lines. Translate it to biology:
  - Kicker: "PEARSON EDEXCEL GCSE BIOLOGY (1BI0)" (the template default).
  - Footer: "Pearson Edexcel GCSE (9–1) Biology (1BI0) | Topic 7 <title> | Higher & Foundation" (the template does this).
  - Core Practicals: "CP" wording.
  - 6-mark extended open response: Edexcel levels (L1 1–2, L2 3–4, L3 5–6) plus indicative content.
- edx_bio_template.js: the Edexcel physics template with a green palette. The API is the same as ../edexcel-physics/edx_template.js.
  - The p-pill reads "BIOLOGY ONLY". Use it for statements marked B / biology-only, i.e. NOT in Combined Science 1SC0.
  - Use the HT pill for Higher-only statements (bold H).
- ../edexcel-physics/build_T10.js and SPEC_T10.md: the approved Edexcel deck. Copy its DECK config, structure, slide types, density and SPEC format.
- For good biological drawing helpers (cells, organs), see ../ocr-biology/ocr_bio_template.js (animalCell, plantCell, mitochondrion) and the B5 decks in ../ocr-biology/:
  - build_B5_1.js: heart
  - build_B5_3.js: endocrine glands
  - build_B5_4.js
  - build_B5_6.js: diabetes and glucose
  Copy any helpers you need into your DECK-SPECIFIC block.

## Spec
- Use WebSearch to get the Topic 7 statements (expected 7.1–7.21 or so), their exact wording, the H (Higher) markers, and which statements are biology-only (not in 1SC0).
- Expected content:
  - hormones and the endocrine glands
  - adrenaline and thyroxine (negative feedback, HT)
  - the menstrual cycle; hormones in the cycle (HT)
  - contraception; assisted reproductive technology (ART, HT)
  - homeostasis
  - thermoregulation (likely biology-only)
  - blood glucose regulation (insulin; glucagon HT); type 1 and type 2 diabetes; BMI and waist:hip calculations
  - osmoregulation, the kidney, the nephron, ADH and kidney failure treatments (likely biology-only)
- Sources: Pearson qualifications site, Save My Exams, PMT Edexcel biology, Cognito, BBC Bitesize Edexcel, Oak, past-paper mark schemes.
- Record each statement, H/B markers, CP links and sources with confidence in SPEC_T7.md. Mark anything from memory as UNVERIFIED.

## Deck structure (same as T10)
- title, objectives, where this fits (say which statements are biology-only), retrieval starter
- content slides, each with a native-shape diagram and a quick check
- a recap after every 2–3 content slides
- any core practical, if Topic 7 has one (check)
- key words
- full question (about 13 marks)
- homework divider
- homework (about 17 marks, including a 6-mark Edexcel levels question)

Also:
- Mark schemes and quick-check answers go in the speaker notes.
- Verify every number with calc() in node (BMI, waist:hip ratio, graph readings, percentages).

## Diagrams (draw these LARGE, CLEAR and CORRECTLY LABELLED)
- the endocrine glands on a body outline (pituitary, thyroid, adrenal, pancreas, ovary, testis)
- the menstrual cycle graph: four hormones plotted to scale over 28 days, with the uterus lining
- the negative feedback loops
- the skin cross-section for thermoregulation
- the urinary system: kidneys, ureters, bladder, urethra, renal artery and vein
- the nephron: glomerulus, Bowman's capsule, proximal tubule, loop of Henle, distal tubule, collecting duct, with labelled filtration, selective reabsorption and water reabsorption
- dialysis

## QA
Render the deck with LibreOffice using your own profile (-env:UserInstallation=file://$PWD/lo_T7). Look at EVERY slide; fix overflow, overlap and diagram errors; re-render until clean. Make 3×3 contact sheets in render_T7/ (c1.png, c2.png…); copy ../edexcel-physics/render_T10.sh.

## Report
Report:
- output path, slide count and slide list
- spec confidence
- H statements
- biology-only statements
- core practicals
- uncertain points
