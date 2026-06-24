#!/usr/bin/env python3
"""
Append uploaded Hypopituitarism flashcards and MCQs to the existing entries in PRESET_FC.
"""

import json, re

with open('/home/user/Piri-MBBS/index.html', 'r') as f:
    c = f.read()

# ── New FCs from uploaded file ──────────────────────────────
new_fcs = [
    {"front": "What is the mnemonic for the anterior pituitary (adenohypophysis) hormones?",
     "back": "'FLAT PEG' — FSH, LH, ACTH, TSH, Prolactin, Endorphins (beta-endorphin / MSH co-products), GH."},
    {"front": "GH: what stimulates it, what inhibits it, and what is its target/effect?",
     "back": "Stimulated by: GHRH (hypothalamus); ghrelin. Inhibited by: somatostatin; IGF-1 (long-loop); GH itself (short-loop). Target/effect: liver → IGF-1; linear growth (epiphyses), lipolysis, gluconeogenesis, protein synthesis."},
    {"front": "TSH: what stimulates it, what inhibits it, and what is its target/effect?",
     "back": "Stimulated by: TRH (hypothalamus). Inhibited by: T3/T4 (negative feedback); somatostatin; dopamine. Target/effect: thyroid follicular cells → T3/T4; iodine uptake, thyroid growth."},
    {"front": "ACTH: what stimulates it, what inhibits it, and what is its target/effect?",
     "back": "Stimulated by: CRH (hypothalamus); stress; ADH (synergistic). Inhibited by: cortisol (negative feedback). Target/effect: adrenal cortex (zona fasciculata/reticularis) → cortisol, androgens (DHEA-S)."},
    {"front": "LH: what stimulates it, what inhibits it, and what is its target/effect?",
     "back": "Stimulated by: GnRH (hypothalamus, pulsatile). Inhibited by: sex steroids (oestrogen, testosterone); inhibin. Target/effect: ♀ ovulation trigger; corpus luteum → progesterone. ♂ Leydig cells → testosterone."},
    {"front": "FSH: what stimulates it, what inhibits it, and what is its target/effect?",
     "back": "Stimulated by: GnRH (hypothalamus, pulsatile). Inhibited by: inhibin (primarily); sex steroids. Target/effect: ♀ follicle development, oestrogen (via aromatase). ♂ Sertoli cells → spermatogenesis."},
    {"front": "Prolactin (PRL): what stimulates it, what inhibits it, and what is its target/effect?",
     "back": "Stimulated by: TRH; oestrogen; nipple stimulation; stress. Inhibited by: dopamine (dominant tonic inhibitor — unique mechanism). Target/effect: breast → lactation; inhibits GnRH → amenorrhoea / erectile dysfunction at high levels."},
    {"front": "beta-Endorphin / alpha-MSH: what stimulates them, what inhibits them, and what is their effect?",
     "back": "POMC derivatives, co-secreted with ACTH. Stimulated by: CRH (co-processed from POMC). Inhibited by: cortisol. Effect: opioid analgesia; melanocyte stimulation (hyperpigmentation in Addison's via high ACTH/MSH)."},
    {"front": "Why is prolactin unique among anterior pituitary hormones?",
     "back": "It is under tonic inhibition by dopamine from the hypothalamus. Loss of dopaminergic input (e.g. dopamine-blocking drugs such as metoclopramide, antipsychotics; or a pituitary stalk lesion) raises prolactin. All other anterior pituitary hormones require a positive releasing hormone signal."},
    {"front": "What is the important distinction about the posterior pituitary (neurohypophysis)?",
     "back": "The posterior pituitary does not synthesise hormones. ADH and oxytocin are made in hypothalamic nuclei and transported down axons for storage and release from the posterior pituitary."},
    {"front": "ADH/AVP: where is it synthesised, what are the stimuli for release, and what are its receptors/effects?",
     "back": "Synthesised in: supraoptic nucleus (predominantly); some paraventricular nucleus. Stimuli for release: ↑plasma osmolality (osmoreceptors); ↓blood volume/pressure (baroreceptors); nausea; pain. Receptors/effects: V2 receptors (renal collecting duct) → aquaporin-2 insertion → water reabsorption (antidiuresis); V1 receptors (vascular smooth muscle) → vasoconstriction (at high/pharmacological doses)."},
    {"front": "Oxytocin: where is it synthesised, what are the stimuli for release, and what are its effects?",
     "back": "Synthesised in: paraventricular nucleus (predominantly); some supraoptic nucleus. Stimuli for release: cervical/vaginal stretch (Ferguson reflex); nipple stimulation; positive-feedback loop in labour. Effects: uterine smooth muscle → labour contractions; myoepithelial cells → milk ejection (let-down reflex)."},
    {"front": "Exam trap: which nuclei make ADH vs oxytocin, and why can central DI partially recover?",
     "back": "Both are made in BOTH nuclei, but ADH is predominantly supraoptic and oxytocin predominantly paraventricular. Destruction of the stalk or posterior pituitary causes central DI (↓ADH) without affecting synthesis (which continues in the hypothalamus), so DI can partially recover over time."},
    {"front": "Hypothalamic-pituitary axes — what is the GH axis (hypothalamic signal, pituitary hormone, end-organ hormone, feedback)?",
     "back": "Hypothalamic signal: GHRH (+) / somatostatin (−). Pituitary hormone: GH. End-organ hormone: IGF-1 (liver). Feedback: IGF-1 inhibits GHRH and GH; somatostatin inhibits GH."},
    {"front": "Hypothalamic-pituitary axes — what is the thyroid axis?",
     "back": "Hypothalamic signal: TRH (+). Pituitary hormone: TSH. End-organ hormone: T3/T4. Feedback: T3/T4 inhibit TRH and TSH."},
    {"front": "Hypothalamic-pituitary axes — what is the adrenal axis?",
     "back": "Hypothalamic signal: CRH (+). Pituitary hormone: ACTH. End-organ hormone: cortisol. Feedback: cortisol inhibits CRH and ACTH."},
    {"front": "Hypothalamic-pituitary axes — what is the gonadal axis?",
     "back": "Hypothalamic signal: GnRH (+, pulsatile). Pituitary hormone: LH / FSH. End-organ hormone: sex steroids / inhibin. Feedback: steroids and inhibin inhibit GnRH, LH, FSH."},
    {"front": "Hypothalamic-pituitary axes — what is the prolactin axis, and how does its feedback differ?",
     "back": "Hypothalamic signal: dopamine (−) / TRH (+). Pituitary hormone: prolactin. End-organ hormone: — (none). Feedback: prolactin stimulates dopamine (short-loop auto-inhibition)."},
]

# ── New MCQs from uploaded file ─────────────────────────────
new_mcqs = [
    {"type": "mcq",
     "question": "What does the 'FLAT PEG' mnemonic represent for the anterior pituitary?",
     "options": ["A. FSH, LH, ACTH, TSH, Prolactin, Endorphins, GH",
                 "B. FSH, LH, ADH, TSH, Prolactin, Endorphins, GH",
                 "C. FSH, LH, ACTH, TRH, Prolactin, Endorphins, GH",
                 "D. FSH, LH, ACTH, TSH, Progesterone, Endorphins, GH",
                 "E. FSH, LH, Aldosterone, TSH, Prolactin, Endorphins, GH"],
     "answer": 0,
     "explanation": "FLAT PEG stands for the anterior pituitary hormones: FSH, LH, ACTH, TSH, Prolactin, Endorphins (beta-endorphin/MSH co-products) and GH."},
    {"type": "mcq",
     "question": "Which hormones stimulate GH release from the anterior pituitary?",
     "options": ["A. GHRH and ghrelin",
                 "B. Somatostatin and IGF-1",
                 "C. TRH and dopamine",
                 "D. CRH and ADH",
                 "E. GnRH and inhibin"],
     "answer": 0,
     "explanation": "GH is stimulated by GHRH (hypothalamus) and ghrelin, and inhibited by somatostatin, IGF-1 (long-loop) and GH itself (short-loop)."},
    {"type": "mcq",
     "question": "Through which mediator does GH produce most of its growth effects, and where is it made?",
     "options": ["A. IGF-1, produced by the liver",
                 "B. Cortisol, produced by the adrenal cortex",
                 "C. T3/T4, produced by the thyroid",
                 "D. Inhibin, produced by the gonads",
                 "E. DHEA-S, produced by the liver"],
     "answer": 0,
     "explanation": "GH acts on the liver to produce IGF-1, driving linear growth (epiphyses), lipolysis, gluconeogenesis and protein synthesis."},
    {"type": "mcq",
     "question": "Besides T3/T4 negative feedback, which two factors inhibit TSH?",
     "options": ["A. Somatostatin and dopamine",
                 "B. GHRH and ghrelin",
                 "C. CRH and ADH",
                 "D. GnRH and inhibin",
                 "E. Oestrogen and TRH"],
     "answer": 0,
     "explanation": "TSH is stimulated by TRH and inhibited by T3/T4 (negative feedback), somatostatin and dopamine; it drives thyroid follicular cells to make T3/T4."},
    {"type": "mcq",
     "question": "Which factors stimulate ACTH release, and what is its end-organ product?",
     "options": ["A. CRH, stress and ADH (synergistic); cortisol and adrenal androgens",
                 "B. TRH and dopamine; T3/T4",
                 "C. GnRH pulsatile; sex steroids",
                 "D. GHRH and ghrelin; IGF-1",
                 "E. Oestrogen and nipple stimulation; lactation"],
     "answer": 0,
     "explanation": "ACTH is stimulated by CRH, stress and ADH (synergistic) and inhibited by cortisol; it acts on the adrenal cortex (zona fasciculata/reticularis) to produce cortisol and androgens (DHEA-S)."},
    {"type": "mcq",
     "question": "What inhibits FSH primarily, and what is its role in the male?",
     "options": ["A. Inhibin (primarily); acts on Sertoli cells → spermatogenesis",
                 "B. Sex steroids only; acts on Leydig cells → testosterone",
                 "C. Dopamine; acts on the breast → lactation",
                 "D. Cortisol; acts on the adrenal cortex",
                 "E. Somatostatin; acts on the liver → IGF-1"],
     "answer": 0,
     "explanation": "FSH is inhibited primarily by inhibin (and sex steroids); in males it acts on Sertoli cells to drive spermatogenesis, and in females on follicle development and oestrogen via aromatase."},
    {"type": "mcq",
     "question": "What is the role of LH in females and males?",
     "options": ["A. ♀ ovulation trigger and corpus luteum → progesterone; ♂ Leydig cells → testosterone",
                 "B. ♀ follicle development; ♂ Sertoli cells → spermatogenesis",
                 "C. ♀ lactation; ♂ erectile function",
                 "D. ♀ oestrogen via aromatase; ♂ inhibin",
                 "E. ♀ amenorrhoea; ♂ gynaecomastia"],
     "answer": 0,
     "explanation": "LH is the ovulation trigger and drives the corpus luteum to make progesterone in females, and stimulates Leydig cells to make testosterone in males."},
    {"type": "mcq",
     "question": "What makes prolactin unique among the anterior pituitary hormones?",
     "options": ["A. It is under dominant tonic inhibition by dopamine, not a positive releasing signal",
                 "B. It is the only one stimulated by a releasing hormone",
                 "C. It is synthesised in the posterior pituitary",
                 "D. It is inhibited by cortisol negative feedback",
                 "E. It requires ADH for release"],
     "answer": 0,
     "explanation": "Prolactin is unique because it is under tonic inhibition by dopamine; loss of dopaminergic input (dopamine-blocking drugs or a stalk lesion) raises it, whereas all other anterior pituitary hormones need a positive releasing signal."},
    {"type": "mcq",
     "question": "A patient started on metoclopramide develops a raised prolactin. What is the mechanism?",
     "options": ["A. Loss of dopaminergic inhibition disinhibits prolactin release",
                 "B. Increased TRH directly stimulates prolactin synthesis",
                 "C. Cortisol feedback failure",
                 "D. Excess GnRH pulsatility",
                 "E. Stimulation of V2 receptors"],
     "answer": 0,
     "explanation": "Dopamine is the dominant tonic inhibitor of prolactin; dopamine-blocking drugs such as metoclopramide and antipsychotics remove this inhibition and raise prolactin."},
    {"type": "mcq",
     "question": "At high levels, what effect does prolactin have on the gonadal axis?",
     "options": ["A. Inhibits GnRH → amenorrhoea / erectile dysfunction",
                 "B. Stimulates GnRH → increased fertility",
                 "C. Raises cortisol → Cushing's",
                 "D. Increases ADH → water retention",
                 "E. Triggers ovulation directly"],
     "answer": 0,
     "explanation": "High prolactin inhibits GnRH, causing amenorrhoea or erectile dysfunction, alongside its action on the breast to drive lactation."},
    {"type": "mcq",
     "question": "Beta-endorphin and alpha-MSH are co-secreted with which hormone, from what precursor?",
     "options": ["A. ACTH, from POMC",
                 "B. TSH, from thyroglobulin",
                 "C. GH, from somatotropin",
                 "D. ADH, from a hypothalamic precursor",
                 "E. Prolactin, from a lactotroph precursor"],
     "answer": 0,
     "explanation": "Beta-endorphin and alpha-MSH are POMC derivatives co-secreted with ACTH; they provide opioid analgesia and melanocyte stimulation (explaining hyperpigmentation in Addison's via high ACTH/MSH)."},
    {"type": "mcq",
     "question": "Why does Addison's disease cause hyperpigmentation, based on the POMC pathway?",
     "options": ["A. High ACTH/MSH co-products stimulate melanocytes",
                 "B. Cortisol directly darkens the skin",
                 "C. Low ACTH reduces melanin breakdown",
                 "D. Dopamine excess stimulates melanocytes",
                 "E. ADH causes pigment deposition"],
     "answer": 0,
     "explanation": "In Addison's, high ACTH (with its POMC-derived MSH co-products) stimulates melanocytes, producing hyperpigmentation."},
    {"type": "mcq",
     "question": "What is the important distinction about hormone production in the posterior pituitary?",
     "options": ["A. It does not synthesise hormones — ADH and oxytocin are made in hypothalamic nuclei and stored/released here",
                 "B. It synthesises ADH and oxytocin directly",
                 "C. It synthesises ACTH and TSH",
                 "D. It only stores anterior pituitary hormones",
                 "E. It makes dopamine for prolactin inhibition"],
     "answer": 0,
     "explanation": "The posterior pituitary does not synthesise hormones; ADH and oxytocin are made in hypothalamic nuclei and transported down axons for storage and release."},
    {"type": "mcq",
     "question": "Which stimuli trigger ADH/AVP release?",
     "options": ["A. ↑Plasma osmolality, ↓blood volume/pressure, nausea, pain",
                 "B. ↓Plasma osmolality and ↑blood volume",
                 "C. Cervical/vaginal stretch and nipple stimulation",
                 "D. GnRH pulsatility",
                 "E. Cortisol negative feedback"],
     "answer": 0,
     "explanation": "ADH/AVP is released in response to raised plasma osmolality (osmoreceptors), reduced blood volume/pressure (baroreceptors), nausea and pain."},
    {"type": "mcq",
     "question": "Which ADH receptor mediates water reabsorption, and how?",
     "options": ["A. V2 receptors in the renal collecting duct → aquaporin-2 insertion",
                 "B. V1 receptors on vascular smooth muscle → vasoconstriction",
                 "C. V2 receptors on vascular smooth muscle → vasodilation",
                 "D. V1 receptors in the collecting duct → sodium reabsorption",
                 "E. Osmoreceptors in the hypothalamus → thirst"],
     "answer": 0,
     "explanation": "ADH acts on V2 receptors in the renal collecting duct to insert aquaporin-2, driving water reabsorption (antidiuresis); V1 receptors cause vasoconstriction at high doses."},
    {"type": "mcq",
     "question": "What are the two main effects of oxytocin?",
     "options": ["A. Uterine contractions (labour) and milk ejection (let-down reflex)",
                 "B. Water reabsorption and vasoconstriction",
                 "C. Cortisol release and analgesia",
                 "D. Spermatogenesis and testosterone production",
                 "E. Thyroid growth and iodine uptake"],
     "answer": 0,
     "explanation": "Oxytocin acts on uterine smooth muscle to drive labour contractions and on myoepithelial cells to cause milk ejection (the let-down reflex)."},
    {"type": "mcq",
     "question": "Which nucleus predominantly synthesises each posterior pituitary hormone (the exam trap)?",
     "options": ["A. ADH predominantly supraoptic; oxytocin predominantly paraventricular",
                 "B. ADH predominantly paraventricular; oxytocin predominantly supraoptic",
                 "C. Both exclusively supraoptic",
                 "D. Both exclusively paraventricular",
                 "E. ADH in the posterior pituitary; oxytocin in the hypothalamus"],
     "answer": 0,
     "explanation": "Both hormones are made in both nuclei, but ADH is predominantly supraoptic and oxytocin predominantly paraventricular."},
    {"type": "mcq",
     "question": "Why can central DI partially recover after a stalk or posterior pituitary lesion?",
     "options": ["A. Synthesis continues in the hypothalamus, which is unaffected",
                 "B. The posterior pituitary regenerates ADH-producing cells",
                 "C. Oxytocin compensates for ADH loss",
                 "D. V1 receptors upregulate to retain water",
                 "E. Cortisol replaces ADH function"],
     "answer": 0,
     "explanation": "Destruction of the stalk or posterior pituitary causes central DI (↓ADH) without affecting synthesis, which continues in the hypothalamus, so DI can partially recover over time."},
    {"type": "mcq",
     "question": "In the GH axis, what provides negative feedback?",
     "options": ["A. IGF-1 inhibits GHRH and GH; somatostatin inhibits GH",
                 "B. Cortisol inhibits GHRH and GH",
                 "C. T3/T4 inhibit GH",
                 "D. Inhibin inhibits GH",
                 "E. Dopamine inhibits GH"],
     "answer": 0,
     "explanation": "In the GH axis, IGF-1 (from the liver) inhibits GHRH and GH, and somatostatin inhibits GH."},
    {"type": "mcq",
     "question": "How does the prolactin axis feedback differ from the other hypothalamic-pituitary axes?",
     "options": ["A. Prolactin stimulates dopamine in a short-loop auto-inhibition, with no end-organ hormone",
                 "B. Prolactin is inhibited by cortisol",
                 "C. Prolactin has a sex-steroid end-organ feedback",
                 "D. Prolactin is stimulated by IGF-1",
                 "E. Prolactin feeds back through T3/T4"],
     "answer": 0,
     "explanation": "The prolactin axis has no end-organ hormone; prolactin stimulates dopamine in a short-loop auto-inhibition, and its hypothalamic control is dopamine (−)/TRH (+)."},
    {"type": "mcq",
     "question": "In the gonadal axis, what inhibits GnRH, LH and FSH?",
     "options": ["A. Sex steroids and inhibin",
                 "B. Cortisol and ADH",
                 "C. IGF-1 and somatostatin",
                 "D. T3/T4 and dopamine",
                 "E. Oxytocin and prolactin"],
     "answer": 0,
     "explanation": "In the gonadal axis, sex steroids and inhibin inhibit GnRH, LH and FSH; the hypothalamic signal is pulsatile GnRH."},
    {"type": "mcq",
     "question": "In the adrenal axis, what is the end-organ hormone and its feedback target?",
     "options": ["A. Cortisol, which inhibits CRH and ACTH",
                 "B. Aldosterone, which inhibits CRH only",
                 "C. DHEA-S, which inhibits ACTH only",
                 "D. Cortisol, which stimulates CRH",
                 "E. ACTH, which inhibits cortisol"],
     "answer": 0,
     "explanation": "In the adrenal axis, CRH (+) drives ACTH, which drives cortisol; cortisol then inhibits both CRH and ACTH."},
]

def json_encode_card(card):
    """Encode a single card dict to a compact JSON object string."""
    return json.dumps(card, ensure_ascii=False)

# Find the existing FC array for Hypopituitarism and append to it
FC_KEY = '"conditions__ENDOCRINOLOGY__Hypopituitarism"'
fc_key_pos = c.find(FC_KEY)
assert fc_key_pos > 0, "FC key not found"

# Find the opening [ of the array
arr_open = c.index('[', fc_key_pos)
# Find the closing ] (depth counting)
i = arr_open
depth = 0
arr_end = -1
while i < arr_open + 500000:
    if c[i] == '[':
        depth += 1
    elif c[i] == ']':
        depth -= 1
        if depth == 0:
            arr_end = i
            break
    i += 1
assert arr_end > 0, "Could not find end of FC array"

# Build insert string: comma-separated new FC objects
fc_inserts = ',\n'.join(json_encode_card(fc) for fc in new_fcs)
c = c[:arr_end] + ',\n' + fc_inserts + c[arr_end:]
print(f"Appended {len(new_fcs)} FCs to conditions__ENDOCRINOLOGY__Hypopituitarism")

# MCQs go in the same array as FCs — re-find arr_end after the FC insert
fc_key_pos2 = c.find(FC_KEY)
arr_open2 = c.index('[', fc_key_pos2)
i = arr_open2; depth = 0; arr_end2 = -1
while i < arr_open2 + 600000:
    if c[i] == '[': depth += 1
    elif c[i] == ']':
        depth -= 1
        if depth == 0: arr_end2 = i; break
    i += 1
assert arr_end2 > 0, "Could not find end of array for MCQs"

mcq_inserts = ',\n'.join(json_encode_card(mcq) for mcq in new_mcqs)
c = c[:arr_end2] + ',\n' + mcq_inserts + c[arr_end2:]
print(f"Appended {len(new_mcqs)} MCQs to same array")

with open('/home/user/Piri-MBBS/index.html', 'w') as f:
    f.write(c)

print(f"\nDone! File size: {len(c):,}")
