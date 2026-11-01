# Brief: Pearson Edexcel GCSE (9–1) Physics (1PH0), Topic 2 deck

**Course:** Pearson Edexcel GCSE (9–1) Physics, 1PH0.
**Topic:** Topic 2 "Motion and forces".
**Format:** ONE big deck for the whole topic, covering both tiers, about 38–46 slides. Match the approved T9, T10 and T15 decks.

## Work folder and setup
- **Folder:** /home/user/Piri-MBBS/gcse-slides/edexcel-physics/
- **Write ONLY these files:**
  - build_T2.js
  - EDX_1PH0_T2_MotionAndForces.pptx
  - SPEC_T2.md
  - render_T2.sh
  - render_T2/
  - lo_T2/
- Do NOT edit edx_template.js. Put any new helpers in a DECK-SPECIFIC block in build_T2.js.
- Do NOT git commit.
- Build with NODE_PATH=/home/user/Piri-MBBS/gcse-slides/node_modules.

## Read first
- ../briefs/EDX_PHYS_BRIEF.md. Its "EDEXCEL OVERRIDES" section and the physics rules apply: equation, substitute, rearrange, answer with units and sensible s.f.; recall vs given equation status. Ignore its old scratchpad paths and the OCR wording.
- build_T10.js, SPEC_T10.md and render_T10.sh, the latest approved deck. Copy the DECK config, structure, slide types, density, the EQS recall/given table, the SPEC format and the render script.
- build_T9.js and SPEC_T9.md. Topic 9 "Forces and their effects" already covers:
  - vectors/scalars in force diagrams
  - resolution and free-body diagrams (H)
  - moments, levers and gears (physics only)

  Recap those only; don't re-teach them.

## Spec
- Use WebSearch to find the Topic 2 statements (expected 2.1 to about 2.19). Record:
  - their exact wording
  - the H (Higher) markers
  - any P (physics-only) statements
  - the Core Practical. It is likely CP "investigate the effect of mass on the acceleration of a trolley" (or force on acceleration), with light gates or ticker timer. Confirm its numbering.
  - which equations are RECALL and which are GIVEN on the Physics Equations List
- **Expected content:**
  - scalars and vectors
  - speed, velocity, distance–time graphs
  - acceleration
  - v² − u² = 2as (given)
  - velocity–time graphs, with area = distance (H for area?)
  - typical speeds
  - g ≈ 10 m/s² and falling objects
  - Newton's first, second and third laws
  - F = ma; inertial mass (H)
  - weight W = mg
  - momentum p = mv (H)
  - conservation of momentum (H)
  - force = change in momentum ÷ time (H, given)
  - reaction time
  - stopping distance = thinking + braking distance and the factors affecting each
  - large decelerations and safety (H?)
  - work done by braking → kinetic energy (link to Topic 8 if relevant)
- **Sources:** Pearson qualifications site, Save My Exams, PMT Edexcel physics, Cognito, BBC Bitesize Edexcel, Oak, MathsGenie and docbrown (1SC0 pages, which mark HT).
- Record everything with confidence levels in SPEC_T2.md. Mark anything from memory as UNVERIFIED.

## Deck structure (as T10)
1. Title
2. Objectives
3. Where this fits (say whether there are physics-only statements)
4. Retrieval starter
5. Content slides, each with a native-shape diagram and a quick check
6. A recap after every 2–3 content slides
7. The Core Practical: method, apparatus drawn (trolley, ramp, light gates, pulley and masses), variables, safety, results table, graph to scale, analysis, errors
8. Key words
9. Full question (about 13 marks)
10. Homework divider
11. Homework (about 17 marks, including a 6-mark Edexcel levels question)

Also:
- Every calculation is verified with calc().
- Equation slides state RECALL or GIVEN.
- Mark schemes go in the speaker notes.

## Diagrams (LARGE, CLEAR, CORRECT)
- distance–time graphs and velocity–time graphs plotted to scale, with gradient and area shading
- free-body diagrams with correctly sized arrows
- Newton's third law pairs (equal size, opposite direction, on different objects)
- collision/explosion momentum diagrams (before and after)
- a stopping-distance bar chart (thinking + braking) for several speeds, to scale
- Core Practical apparatus

## QA
Render with LibreOffice using your own profile (-env:UserInstallation=file://$PWD/lo_T2). Look at EVERY slide, fix any problems and re-render until clean. Make contact sheets.

## Report
- output path, slide count and slide list
- spec confidence
- H statements
- physics-only statements
- core practical
- uncertain points
