# Brief: Pearson Edexcel GCSE (9–1) Chemistry (1CH0), Topic 3 deck

Course: Pearson Edexcel GCSE (9–1) Chemistry 1CH0 (separate chemistry). Topic 3 "Chemical changes". The teacher chose it for IONIC EQUATIONS and HALF EQUATIONS and wants HIGHER-level depth: teach all Higher content fully (red HT pill) and make ionic and half equations a strong thread with many worked examples. ONE big deck for the whole topic, both tiers, like the Edexcel physics decks (about 40–48 slides).

## Work folder and setup
- Folder: /home/user/Piri-MBBS/gcse-slides/edexcel-chemistry/
- Write ONLY: build_T3.js, EDX_1CH0_T3_<Short>.pptx, SPEC_T3.md, render_T3.sh, render_T3/, lo_T3/
- Do NOT edit edx_chem_template.js (put new helpers in a DECK-SPECIFIC block). Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules

## Read first
- ../briefs/EDX_PHYS_BRIEF.md — its "EDEXCEL OVERRIDES" apply (ignore its old scratchpad paths and OCR/physics-specific lines), translated to chemistry: kicker "PEARSON EDEXCEL GCSE CHEMISTRY (1CH0)", footer "Pearson Edexcel GCSE (9–1) Chemistry (1CH0) | Topic 3 <title> | Higher & Foundation" (template does both), Core Practicals "CP", 6-mark extended open response with Edexcel levels (L1 1–2, L2 3–4, L3 5–6) + indicative content.
- edx_chem_template.js = the Edexcel physics template with a violet palette; same API as ../edexcel-physics/edx_template.js. The p-pill reads "CHEMISTRY ONLY": use it for statements not in Combined Science 1SC0. HT pill for Higher-only (bold H).
- ../edexcel-physics/build_T10.js + SPEC_T10.md and ../edexcel-biology/build_T7.js + SPEC_T7.md: approved Edexcel decks — copy DECK config, structure, slide types, density, SPEC format.
- Chemistry helpers to copy if useful (balanced-equation / atom-and-charge checker, apparatus: burette, conical flask, beaker, evaporating basin, electrolysis cell): ../ocr-chemistry/build_C5_3.js (titration), build_C6_1.js (acids, salts, pH, salt practical), build_C5_1.js (filtration, crystallisation).

## Spec
- WebSearch the Topic 3 statements (expected 3.1–3.31 or so): exact wording, H markers, which are chemistry-only (not in 1SC0), and the Topic 3 Core Practicals (likely: pH change when calcium hydroxide/oxide is added to dilute HCl; preparing pure dry hydrated copper sulfate crystals; electrolysis of copper sulfate solution with inert and copper electrodes; acid–alkali titration (chemistry-only)). Confirm CP numbering.
- Expected content: acids/alkalis and H+/OH- ions; pH, indicators; neutralisation (H+ + OH- → H2O); strong/weak and dilute/concentrated, pH factor-of-ten (H); bases and salts; acids with metals, metal oxides, hydroxides, carbonates; solubility rules and precipitation (ionic equations for precipitates); titration (chemistry-only, HT calculation); electrolysis of molten and aqueous ionic compounds, products at electrodes, half equations (H), oxidation/reduction as electron loss/gain (H); electrolysis of copper sulfate and copper purification.
- Ionic and half equations: a dedicated, scaffolded METHOD slide for each (ionic: full equation → split aqueous ionic compounds into ions → cancel spectator ions → check atoms and charges; half equation: ion → atom/molecule, add electrons to balance charge, OIL RIG, which electrode), plus plenty of practice in recaps, the full question and homework. Assert atom AND charge balance of every equation and half equation in node; balanced equations carry state symbols.
- Sources: Pearson qualifications site, Save My Exams, PMT Edexcel chemistry, Cognito, BBC Bitesize, Oak, past-paper mark schemes. Record statements, H/C markers, CP links, sources and confidence in SPEC_T3.md; mark memory-only items UNVERIFIED.

## Deck structure (as T10 / T7)
Title, objectives, where this fits (say which statements are chemistry-only), retrieval starter; content slides each with a native-shape diagram and quick check; recap after every 2–3 content slides; each Topic 3 core practical (method, apparatus drawn, variables, CLEAPSS-style safety, results table, graph to scale, analysis, errors); key words; full question (~13 marks); homework divider; homework (~17 marks incl. a 6-mark Edexcel levels question). Mark schemes and quick-check answers in speaker notes. Verify every number with calc().

## Diagrams (LARGE, CLEAR, CORRECT)
Particle pictures of acids, alkalis and neutralisation with spectator ions; pH/universal indicator scale; strong vs weak acid particles; precipitation; CP apparatus; electrolysis cells showing ion movement and the half equation at each electrode; inert vs copper electrodes; graphs to scale.

## QA
Render with LibreOffice using your own profile (-env:UserInstallation=file://$PWD/lo_T3). Look at EVERY slide, fix overflow/overlap/diagram errors, re-render until clean. Make 3×3 contact sheets in render_T3/ (copy ../edexcel-biology/render_T7.sh).

## Report
Output path, slide count and slide list; spec confidence; H statements; chemistry-only statements; core practicals; uncertain points.
