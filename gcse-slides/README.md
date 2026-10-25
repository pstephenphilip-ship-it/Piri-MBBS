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
