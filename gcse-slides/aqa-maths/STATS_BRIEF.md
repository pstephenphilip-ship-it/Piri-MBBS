# Brief: AQA GCSE (9–1) Mathematics (8300) — Statistics (S1–S6) deck

The teacher wants AQA GCSE Maths decks, starting from the end of the spec: **Statistics S1–S6**.
Make ONE deck for the whole Statistics section, covering both tiers, about 40–48 slides.
This is a MATHS deck. There are no practicals and no levels-of-response marking. Maths house rules are below.

## Work folder and setup
- **Folder:** /home/user/Piri-MBBS/gcse-slides/aqa-maths/
- **Write ONLY:**
  - build_STATS.js
  - AQA_8300_Statistics.pptx
  - SPEC_STATS.md
  - render_STATS.sh
  - render_STATS/
  - lo_STATS/
- Do NOT edit aqa_maths_template.js. Put new helpers in a DECK-SPECIFIC block in your build file.
- Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules.

## Template
aqa_maths_template.js is the Edexcel physics template (../edexcel-physics/edx_template.js) with a maroon palette and AQA maths kicker/footer. It has the same API as the physics template.
- DECK config:
  - topicLabel: 'Statistics' (it is used in place of "Topic n")
  - topic: 'S1–S6'
  - title: e.g. 'Statistics'
  - plus the usual fields
- Pills:
  - **HT pill:** Higher-tier-only content. In the AQA spec this is shown in **bold**; some content is underlined, meaning Higher and harder.
  - **p-pill (reads "HIGHER ONLY"):** don't use it; use the HT pill.
  - **"GRADE 7–9 STRETCH" pill:** stretch content.
- Model your deck on ../edexcel-physics/build_T1.js (maths-skills deck) and build_T2.js (graphs plotted to scale), plus their SPEC files. Copy their structure, slide types, density and the SPEC format.
- For the 6-mark question in homework, the levels helper is science-specific. Instead, make the final homework question a multi-step problem-solving question (AO3, about 5–6 marks) with a points-based mark scheme in AQA style (M1, A1, B1 notation).
- Use AQA mark-scheme notation throughout the speaker notes: M1 method, A1 accuracy, B1 independent, ft follow-through, oe or equivalent.

## Spec: AQA 8300 Statistics S1–S6
- Use WebSearch to find the exact wording of each statement and which parts are Higher (bold/underlined).
- Sources: AQA website, the AQA 8300 spec PDF mirrors, Maths Genie, Corbettmaths, Dr Frost, Save My Exams, Mr Barton, Oak.
- Expected statements:
  - **S1:** populations and sampling; limitations of sampling; random sampling.
  - **S2:** interpret and construct tables, charts and diagrams:
    - frequency tables
    - bar charts, pie charts, pictograms, vertical line charts
    - two-way tables
    - time series line graphs
    - **H:** histograms with unequal class widths (frequency density)
    - **H:** cumulative frequency graphs
  - **S3:** construct and interpret diagrams for grouped discrete and continuous data:
    - histograms with equal class widths
    - **H:** histograms with unequal widths
    - **H:** cumulative frequency
  - **S4:** interpret, analyse and compare distributions with summary statistics:
    - mean, median, mode, range, modal class
    - **H:** quartiles and interquartile range
    - **H:** box plots
    - estimate the mean from grouped data
    - outliers
    - comparing distributions (average and spread, in context)
  - **S5:** apply statistics to describe a population.
  - **S6:** scatter graphs:
    - correlation
    - correlation does not imply causation
    - line of best fit, interpolation and extrapolation (and its dangers)
    - outliers
- Record everything with confidence levels in SPEC_STATS.md. Mark memory-only items as UNVERIFIED.

## Maths house rules
- **Worked examples:** each content slide has a fully worked example ("I do"). Use the template's worked-card steps, set out as AQA expects: method shown, then the answer with units.
- **Practice:** each slide has a short "You try" quick check, with answers in the notes.
- **Common mistakes:** include a "common mistakes / examiner tips" panel where useful, e.g.:
  - frequency density = frequency ÷ class width
  - plotting cumulative frequency at the upper class bound
  - using midpoints for the estimated mean, and why it is an estimate
  - comparing averages AND spread in context
  - correlation is not causation
- **Exam questions:** AQA style, with mark allocations, in recaps after every 2–3 content slides. Mark schemes go in the speaker notes using M1/A1/B1.
- **Checks:** every number is checked in node with calc() (means, medians, quartiles, frequency densities, angles in pie charts summing to 360, cumulative frequencies, IQR).
- **Data sets:** must be internally consistent. Build them in node, then derive every statistic from them.
- **Full exam question:** about 13 marks, mixed Foundation and Higher parts, Higher parts tagged.
- **Homework:** about 17 marks, ending with the multi-step problem-solving question.
- **Key words:** a summary slide.
- **Formulae:** no formulae sheet in AQA maths (only a few formulae are given in questions). Do not use the RECALL/GIVEN equation table; replace it with a "methods to remember" summary.

## Diagrams (LARGE, CLEAR, CORRECT, plotted to scale)
- bar chart
- pie chart with angles that sum to 360°, drawn with native pie/arc shapes or wedges
- pictogram
- two-way table
- time series line graph
- equal-width histogram
- unequal-width histogram with frequency density on the y-axis and bar areas correct
- cumulative frequency curve, with median and quartile reading lines
- box plots: two compared on one scale
- scatter graphs showing positive, negative and no correlation, with a line of best fit and an outlier circled
- a sampling illustration

## QA
- Render with LibreOffice using your own profile: -env:UserInstallation=file://$PWD/lo_STATS.
- Look at EVERY slide. Fix any overflow, overlap or diagram error, then re-render until clean.
- Make 3×3 contact sheets in render_STATS/ (copy ../edexcel-physics/render_T1.sh).

## Report
- output path, slide count and slide list
- spec confidence
- Higher-only content
- uncertain points
