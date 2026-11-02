# SPEC_STATS — AQA GCSE (9–1) Mathematics 8300, Statistics S1–S6

Statistics is assessed on all three papers (8300/1F–3F, 1H–3H). Paper 1 is non-calculator; Papers 2 and 3 allow a calculator.
In the AQA specification, **bold** text is Higher tier only and underlined text is "Higher, harder". **No underlined text was found in S1–S6.**
WebFetch failed with DNS errors for www.aqa.org.uk and tutordex.net (both outside the session's allowed network domains). Everything below comes from WebSearch extracts plus memory. Statements from memory are marked UNVERIFIED.

| Code | Statement (wording as found / reconstructed) | H (bold) | Confidence |
|---|---|---|---|
| S1 | Infer properties of populations or distributions from a sample, whilst knowing the limitations of sampling | | High (search extract: AQA 8300 listing on Tutordex, Mr Barton AQA sampling page) |
| S2 | Interpret and construct tables, charts and diagrams, including frequency tables, bar charts, pie charts and pictograms for categorical data, vertical line charts for ungrouped discrete numerical data, tables and line graphs for time series data and know their appropriate use | | High for "vertical line charts for ungrouped discrete numerical data" and "tables and line graphs for time series data … know their appropriate use" (AQA 8300 3.6 page, via search). Rest of the clause: medium-high (UNVERIFIED wording, matches the DfE subject content) |
| S3 | Construct and interpret diagrams for grouped discrete data and continuous data, i.e. histograms with equal and **unequal class intervals** and **cumulative frequency graphs**, and know their appropriate use | **unequal class intervals; cumulative frequency graphs** | Wording high (exact phrase matched by search: Mr Barton AQA S3, AQA All About Maths). Bold: medium-high (memory, matches DfE bold and AQA Higher-only guidance) |
| S4 | Interpret, analyse and compare the distributions of data sets from univariate empirical distributions through: appropriate graphical representation involving discrete, continuous and grouped data, **including box plots**; appropriate measures of central tendency (median, mean, mode and modal class) and spread (range, including consideration of outliers, **quartiles and inter-quartile range**) | **box plots; quartiles and IQR** | Wording high (AQA All About Maths extract via search). Bold: high for box plots (AQA S4h guidance: "box plots are higher tier only"); medium-high for quartiles/IQR |
| S5 | Apply statistics to describe a population | | High (Mr Barton; matches memory). Secondary source only |
| S6 | Use and interpret scatter graphs of bivariate data; recognise correlation and know that it does not indicate causation; draw estimated lines of best fit; make predictions; interpolate and extrapolate apparent trends whilst knowing the dangers of so doing | | High (ICAEW reproduces the full statement; AQA All About Maths gives the first two clauses) |

## Points from AQA guidance (not statement text)
- **Estimated mean from grouped data:** both tiers. AQA Foundation statistics guidance: "calculate an estimate of the mean for a grouped frequency distribution, knowing why it is an estimate" and "find the mode or modal class". High (search extract of AQA All About Maths).
- **Cumulative frequency:** AQA guidance says cumulative frequency diagrams are only used for continuous data and may be curves or polygons (search extract). The deck draws a smooth curve and says either is acceptable.
- **Two-way tables:** not named in the S2 statement. They sit in AQA's S2 teaching guidance and in the probability section (P). Medium (UNVERIFIED). Taught on slide 12, both tiers.
- **Outliers:** S4 says "range, including consideration of outliers". AQA 8300 does not appear to require the 1.5 × IQR rule (that is GCSE Statistics 8382). The deck treats outliers informally. Medium.
- **Frequency polygons:** not named in S2/S3 as found. Mentioned only in the notes on slide 20. UNVERIFIED.
- **Stratified sampling:** not in 8300 S1 (it is in 8382). Not taught. Medium-high.
- **Weighting:** probability and statistics together are about 15% of marks in both tiers (DfE weighting, memory, UNVERIFIED).

## Tier markers in the deck
- **HT pill:**
  - slides 21–22: unequal-width histograms and reading them (S3)
  - slide 24: cumulative frequency graphs (S3)
  - slides 25–28: median and quartiles from CF, quartiles from a list, box plots, comparing box plots (S4)
  - recap 4 Q2–Q4, recap 5 (all), full question (d) and (e), homework Q4
- **GRADE 7–9 STRETCH pill:** slide 32 (reverse and combined means, S4 problem solving; both tiers).
- Both tiers: everything else, including slide 20 (equal-width histogram), slide 18 (estimated mean), slide 17 (outliers), slides 30–31 and 34–36.
- The "HIGHER ONLY" p-pill is not used.

## Data and checks
- Every data set is built in build_STATS.js and every statistic is derived from it. 154 `calc()`/`assert` checks run at build time: means, medians, modes, ranges, quartiles, IQRs, frequency densities and bar areas, cumulative frequencies, pie angles (sum 360°), two-way table rows and columns, mark totals.
- The cumulative frequency curve is a monotone cubic through the plotted points. The median and quartiles quoted (26, 17, 34.5) are read from that curve in node, to the nearest 0.5.
- The line of best fit on slide 35 is the least-squares line of the 12 non-outlier points, drawn through the mean point (5.17, 44.17); readings 51 (6.5 h) and 119 (20 h, impossible: test is out of 80).
- The puzzle-time data set (slide 18) is reused for the equal-width histogram (slide 20) and the cumulative frequency slides (24–25), so the estimated mean (25.75) can be compared with the median (≈26).
- The template's RECALL/GIVEN equations slide is replaced by a "methods to remember" table (slide 38): there is no formulae sheet for statistics.

## Sources (WebSearch extracts only)
- AQA 8300 3.6 Statistics subject content (S2 wording): https://www.aqa.org.uk/subjects/mathematics/gcse/mathematics-8300/specification/subject-content/3.6-statistics
- AQA All About Maths (S3, S4 and S6 wording; Foundation statistics guidance on the estimated mean and modal class; S4h box plots Higher only): https://allaboutmaths-classic.aqa.org.uk/1090 , /1092 , /1088 , /960
- Tutordex AQA 8300 Statistics listing (S1 wording): https://tutordex.net/course/51/gcse-maths-aqa-8300/topic/96
- Mr Barton AQA guidance pages (S1, S3h, S4h; S5 wording): https://mrbartonmaths.com/topics/averages-and-range/sampling/gcse.html
- ICAEW maths (full S6 statement): https://icaew.com/learning-and-development/icaew-maths/13-statistics
- Save My Exams AQA 8300 statistical diagrams and averages (supporting detail): https://www.savemyexams.com/gcse/maths/aqa/22/higher/flashcards/statistics/statistical-diagrams/

## Confidence summary
- Statement numbering S1–S6: HIGH.
- Exact wording: HIGH for S1, S3, S4, S6; MEDIUM-HIGH for the start of S2; HIGH for S5 (short statement, secondary source).
- Higher (bold) markers: HIGH for box plots; MEDIUM-HIGH for unequal class intervals, cumulative frequency graphs, quartiles and IQR.
- No underlined (Higher, harder) statistics content: MEDIUM.
- **Before publishing, check the bold and underlined text against the AQA 8300 specification PDF (section 3.6).**
