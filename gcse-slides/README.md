# GCSE science slide decks: build files

This folder holds the scripts and briefs used to build the GCSE science PowerPoint decks. It is not part of the website.

## What's here

- `briefs/`: the build briefs for the OCR J260 biology, chemistry and physics decks and the Edexcel 1PH0 physics decks. They were recovered from the conversation history after the build container was reset on 25 Oct 2026.
- `aqa-merge/jobs_chem.py`: the job list that merged the AQA separate-chemistry add-ons into the Higher chemistry decks. `merge.js` itself was lost in the reset.

## Lost in the reset

The build scripts (`build_*.js`) for the decks below were lost. The finished `.pptx` decks are held by the teacher.

- AQA Trilogy Foundation and Higher
- AQA separate-science add-ons
- OCR 21C B1–B3, C1–C3, P1–P4
- Edexcel 1PH0 Topics 11–14

From now on, every new build script, spec note and finished deck is saved here.

## Build

    cd gcse-slides && npm install pptxgenjs@3.12.0
    NODE_PATH=node_modules node <build script>

## AQA GCSE Biology 8461 (new format)

`aqa-biology/` holds the two-hour lesson decks for AQA GCSE Biology (8461, separate science), built in the same phone-safe style as the maths decks (Arial, plain shapes, a PDF with every deck). They reuse `aqa-maths/maths_lesson.js`; the deck's `DECK.kicker`, `DECK.footer` and `DECK.palette` set the science branding.

## AQA GCSE Chemistry 8462 (separate science)

`aqa-chemistry/` holds the two-hour lesson decks for AQA GCSE Chemistry (8462), in the same style as the Biology decks (Arial, plain shapes, a PDF with every deck, Higher content tagged in red). They reuse `aqa-maths/maths_lesson.js`. `aqa-chemistry/chem_common.js` sets the purple Chemistry branding and adds a formula parser, so every formula's atom count and every balanced equation is checked when a deck is built.

Build and render one deck with `aqa-chemistry/render_<lesson>.sh`; `render_template.sh` is the starting point for a new lesson. Write `^{...}` in slide text for a true superscript (e.g. `10^{−10}`), because the font has no superscript zero.

| Lesson | Deck |
|---|---|
| 4.1 A | Atoms, elements, compounds, equations, mixtures and separation |
| 4.1 B | Atomic model history, subatomic particles, isotopes, relative atomic mass, electronic structure |
| 4.1 C | The periodic table, metals and non-metals, groups 0, 1 and 7, transition metals |
| 4.2 A | Ionic, covalent and metallic bonding, dot-and-cross diagrams, ionic formulae |
| 4.2 B | States of matter, predicting states, properties of ionic, molecular, polymer, giant covalent and metallic substances, alloys |
| 4.2 C | Diamond, graphite, graphene, fullerenes, nanoparticles, surface area to volume ratio |
| 4.3 A | Conservation of mass, relative formula mass, mass changes with gases, uncertainty |
| 4.3 B | (HT) Moles, Avogadro constant, reacting masses, balancing from masses, limiting reactants |
| 4.3 C | Concentration (g/dm³), percentage yield, atom economy, (HT) titration calculations and gas volumes |
