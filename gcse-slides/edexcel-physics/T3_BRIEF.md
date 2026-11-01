# Brief: Pearson Edexcel GCSE (9–1) Physics (1PH0), Topic 3 deck

**Course:** Pearson Edexcel GCSE (9–1) Physics, 1PH0.
**Topic:** Topic 3 "Conservation of energy".
**Format:** ONE big deck for the whole topic, covering both tiers, about 30–38 slides. Match the approved T9, T10 and T15 decks.

## Work folder and setup
- **Folder:** /home/user/Piri-MBBS/gcse-slides/edexcel-physics/
- **Write ONLY these files:**
  - build_T3.js
  - EDX_1PH0_T3_ConservationOfEnergy.pptx
  - SPEC_T3.md
  - render_T3.sh
  - render_T3/
  - lo_T3/
- Do NOT edit edx_template.js. Put any new helpers in a DECK-SPECIFIC block in build_T3.js.
- Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules.

## Read first
- ../briefs/EDX_PHYS_BRIEF.md. Its "EDEXCEL OVERRIDES" section and the physics rules apply: equation, substitute, rearrange, answer with units and sensible s.f.; recall vs given equation status. Ignore its old scratchpad paths and the OCR wording.
- build_T10.js, SPEC_T10.md and render_T10.sh, the latest approved deck. Copy the DECK config, structure, slide types, density, the EQS recall/given table, the SPEC format and the render script.
- build_T2.js and SPEC_T2.md (most recent approved deck: closest model) and build_T1.js. Topic 2 already taught braking work done -> KE (2.33): recap only. Topic 8 (Energy - forces doing work: work done, power, efficiency) is NOT yet built; keep work done W = F x d and power to Topic 8 except as brief recap/link.

## Spec
- WebSearch the Topic 3 statements (expected 3.1 to about 3.15): exact wording, H markers, P (physics-only) statements, and whether Topic 3 has a Core Practical (probably not; the specific heat capacity CP is Topic 14, and the thermal insulation CP may be Topic 3 physics-only 3.x? check). Note which equations are RECALL vs GIVEN.
- Expected content: energy stores and transfers (mechanical, electrical, heating, radiation); conservation of energy; closed systems; GPE = mgh (recall); KE = 1/2 mv^2 (recall); GPE -> KE calculations (falling objects, rollercoaster, pendulum); energy diagrams (Sankey diagrams drawn to scale); dissipation and wasted energy; reducing unwanted transfers (lubrication, thermal insulation; thermal conductivity, wall thickness); efficiency = useful/total (recall) and as a percentage; non-renewable and renewable energy resources, their uses, advantages and disadvantages, environmental issues, and trends in use (with data/graph).
- Record in SPEC_T3.md with confidence; mark memory-only as UNVERIFIED.

## Deck structure (as T10)
1. Title
2. Objectives
3. Where this fits (say whether there are physics-only statements)
4. Retrieval starter
5. Content slides, each with a native-shape diagram and a quick check
6. A recap after every 2–3 content slides
7. Any Topic 3 Core Practical (or a suggested practical on thermal insulation if none): method, apparatus drawn, variables, safety, results table, graph to scale, analysis, errors
8. Key words
9. Full question (about 13 marks)
10. Homework divider
11. Homework (about 17 marks, including a 6-mark Edexcel levels question)

Also:
- Every calculation is verified with calc().
- Equation slides state RECALL or GIVEN.
- Mark schemes go in the speaker notes.

## Diagrams (LARGE, CLEAR, CORRECT)
- energy store and transfer diagrams (store boxes, transfer arrows)
- Sankey diagrams drawn to scale (arrow widths proportional to energy)
- a rollercoaster or pendulum GPE/KE exchange with a bar chart at each point
- a house with heat-loss routes and insulation methods
- energy-resource icons and a comparison table
- a UK electricity-mix chart over time to scale (illustrative data, labelled as such)
- a CP apparatus, if there is a Topic 3 CP (e.g. insulation: beakers wrapped in materials, thermometer, cooling curves plotted to scale)

## QA
Render with LibreOffice using your own profile (-env:UserInstallation=file://$PWD/lo_T3). Look at EVERY slide, fix any problems and re-render until clean. Make contact sheets.

## Report
- output path, slide count and slide list
- spec confidence
- H statements
- physics-only statements
- core practical
- uncertain points

