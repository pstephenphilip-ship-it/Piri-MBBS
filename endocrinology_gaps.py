# endocrinology_gaps.py
# Medical education content for MBBS endocrinology revision site
# Covers: Metabolic Syndrome (GAP 1) and Secondary Causes of Diabetes (GAP 2)

# =============================================================================
# GAP 1: METABOLIC SYNDROME
# =============================================================================

HTML_NOTES_METABOLIC_SYNDROME = """
<div class="rn-section-title">Metabolic Syndrome — Definition &amp; Diagnostic Criteria</div>
<div class="rn-body">
  <p>
    Metabolic syndrome is a cluster of cardiometabolic risk factors that occur together,
    significantly amplifying cardiovascular and type 2 diabetes risk. Two major frameworks
    are in common use:
  </p>

  <div class="rn-callout rn-callout-blue">
    <strong>IDF Consensus Criteria (2006) — requires central obesity PLUS ≥2 of the following:</strong>
    <ul>
      <li><strong>Central obesity</strong> (mandatory): waist circumference ≥94 cm (M) or ≥80 cm (F) — Europid; ≥90 cm (M) or ≥80 cm (F) — South Asian / Chinese / Japanese</li>
      <li>Triglycerides ≥1.7 mmol/L (or on TG-lowering treatment)</li>
      <li>HDL-cholesterol &lt;1.03 mmol/L (M) or &lt;1.29 mmol/L (F) (or on HDL-raising treatment)</li>
      <li>Blood pressure ≥130/85 mmHg (or on antihypertensive treatment)</li>
      <li>Fasting plasma glucose ≥5.6 mmol/L (or previously diagnosed T2DM)</li>
    </ul>
  </div>

  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Ethnicity</th>
          <th>Male waist (cm)</th>
          <th>Female waist (cm)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Europid / White</td>
          <td>≥94</td>
          <td>≥80</td>
        </tr>
        <tr>
          <td>South Asian / Chinese / Japanese</td>
          <td>≥90</td>
          <td>≥80</td>
        </tr>
        <tr>
          <td>WHO (waist:hip ratio alternative)</td>
          <td>&gt;0.90</td>
          <td>&gt;0.85</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="rn-section-title">Pathophysiology</div>
<div class="rn-body">
  <p>
    The central driver is <strong>insulin resistance</strong>, closely linked to excess
    visceral adipose tissue:
  </p>
  <ol>
    <li>
      <strong>Visceral fat</strong> releases free fatty acids (FFAs), adipokines (↓adiponectin,
      ↑TNF-α, ↑IL-6, ↑resistin) → hepatic and peripheral insulin resistance.
    </li>
    <li>
      <strong>Compensatory hyperinsulinaemia</strong> → promotes sodium retention (↑BP),
      stimulates hepatic VLDL synthesis (↑TG, ↓HDL), drives sympathetic overactivity.
    </li>
    <li>
      <strong>Pro-inflammatory state</strong>: ↑CRP, ↑fibrinogen, ↑PAI-1 → endothelial
      dysfunction → accelerated atherosclerosis.
    </li>
    <li>
      <strong>Hyperglycaemia</strong> develops when pancreatic β-cell compensation fails.
    </li>
  </ol>
  <div class="rn-callout rn-callout-red">
    <strong>Key numbers:</strong> Metabolic syndrome confers a <strong>5× increased risk of T2DM</strong>
    and a <strong>2× increased cardiovascular risk</strong> compared with the general population.
  </div>
</div>

<div class="rn-section-title">Associated Conditions</div>
<div class="rn-body">
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Condition</th>
          <th>Relationship to Metabolic Syndrome</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>NAFLD / NASH</strong></td>
          <td>Hepatic manifestation of insulin resistance; ↑VLDL synthesis → hepatic steatosis; present in ~70% of metabolic syndrome cases</td>
        </tr>
        <tr>
          <td><strong>PCOS</strong></td>
          <td>Insulin resistance drives hyperandrogenaemia; 50% of PCOS patients meet metabolic syndrome criteria; metformin used in both</td>
        </tr>
        <tr>
          <td><strong>Hyperuricaemia / Gout</strong></td>
          <td>Hyperinsulinaemia reduces renal urate excretion</td>
        </tr>
        <tr>
          <td><strong>Obstructive sleep apnoea</strong></td>
          <td>Bidirectional: obesity drives OSA; intermittent hypoxia worsens insulin resistance</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="rn-section-title">Management</div>
<div class="rn-body">
  <div class="rn-callout rn-callout-green">
    <strong>Lifestyle modification is first-line and can reverse metabolic syndrome:</strong>
    <ul>
      <li><strong>Weight loss 5–10%</strong> of body weight improves all components</li>
      <li>Mediterranean or low-glycaemic-index diet</li>
      <li>Physical activity ≥150 min/week moderate intensity</li>
      <li>Smoking cessation (smoking worsens insulin resistance)</li>
    </ul>
  </div>
  <p>Pharmacological management targets individual components:</p>
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Component</th>
          <th>Treatment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Hypertriglyceridaemia</td>
          <td>Fibrates, omega-3 fatty acids; address secondary causes (alcohol, hypothyroidism)</td>
        </tr>
        <tr>
          <td>Low HDL</td>
          <td>Lifestyle is most effective; niacin (limited use due to side effects)</td>
        </tr>
        <tr>
          <td>Hypertension</td>
          <td>ACE inhibitors / ARBs preferred (improve insulin sensitivity, renoprotective)</td>
        </tr>
        <tr>
          <td>Impaired fasting glucose / T2DM</td>
          <td>Metformin (also addresses insulin resistance); GLP-1 agonists, SGLT-2 inhibitors for weight benefit</td>
        </tr>
        <tr>
          <td>Overall CV risk</td>
          <td>Statin therapy if 10-year CV risk ≥10%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
"""

FC_METABOLIC_SYNDROME = [
    {
        "front": "What is the mandatory criterion for diagnosing metabolic syndrome using IDF 2006 criteria?",
        "back": "Central obesity (elevated waist circumference) — it is mandatory; diagnosis then requires ≥2 of the remaining 4 features (↑TG, ↓HDL, ↑BP, ↑fasting glucose)."
    },
    {
        "front": "What are the IDF waist circumference thresholds for metabolic syndrome in Europid vs South Asian males?",
        "back": "Europid males: ≥94 cm | South Asian / Chinese / Japanese males: ≥90 cm | Females (both groups): ≥80 cm."
    },
    {
        "front": "What is the central pathophysiological mechanism of metabolic syndrome and what does it lead to?",
        "back": "Insulin resistance (driven by visceral adiposity) → compensatory hyperinsulinaemia → dyslipidaemia (↑TG, ↓HDL), hypertension (Na⁺ retention), pro-inflammatory state → accelerated atherosclerosis."
    },
    {
        "front": "Metabolic syndrome increases the risk of T2DM by ___ times and CV disease by ___ times.",
        "back": "T2DM: 5× | Cardiovascular disease: 2×."
    },
    {
        "front": "What percentage weight loss is needed to reverse metabolic syndrome, and which diet is most evidence-based?",
        "back": "5–10% weight loss reverses most components | Mediterranean or low-GI diet is most evidence-based."
    },
    {
        "front": "Name two conditions that share a bidirectional relationship with metabolic syndrome via insulin resistance.",
        "back": "NAFLD/NASH (hepatic steatosis from ↑VLDL synthesis) | PCOS (insulin resistance drives hyperandrogenaemia; 50% of PCOS meets MetS criteria)."
    },
]

MCQ_METABOLIC_SYNDROME = [
    {
        "type": "mcq",
        "question": "A 48-year-old South Asian man has a waist circumference of 92 cm, fasting glucose 5.8 mmol/L, triglycerides 2.1 mmol/L, HDL 1.0 mmol/L, and BP 128/82 mmHg. According to IDF 2006 criteria, does he have metabolic syndrome?",
        "options": [
            "A. No — his waist circumference does not meet the South Asian threshold",
            "B. No — he needs at least 3 additional features beyond central obesity",
            "C. Yes — he meets the South Asian waist threshold and has all 4 additional features",
            "D. Yes — he meets the Europid waist threshold and 2 additional features",
            "E. No — fasting glucose must be ≥7.0 mmol/L to count as a criterion"
        ],
        "answer": "C",
        "explanation": "IDF South Asian waist threshold for males is ≥90 cm (he has 92 cm — met). He also has ↑TG (≥1.7), ↓HDL (<1.03), ↑BP (≥130/85 — borderline, 128 is just below, but ↑fasting glucose ≥5.6 is met). He meets 3 of 4 additional criteria (TG, HDL, glucose), satisfying the ≥2 required. Answer C is the best available option."
    },
    {
        "type": "mcq",
        "question": "Which of the following best explains the hypertriglyceridaemia seen in metabolic syndrome?",
        "options": [
            "A. Reduced pancreatic lipase activity",
            "B. Hyperinsulinaemia stimulating hepatic VLDL synthesis",
            "C. Increased lipoprotein lipase activity in adipose tissue",
            "D. Reduced chylomicron clearance due to low LPL",
            "E. Excess dietary saturated fat intake"
        ],
        "answer": "B",
        "explanation": "Compensatory hyperinsulinaemia (secondary to insulin resistance) upregulates hepatic VLDL synthesis, raising triglycerides and — because VLDL and HDL share triglyceride via CETP exchange — lowering HDL-cholesterol."
    },
    {
        "type": "mcq",
        "question": "A 35-year-old woman with PCOS and metabolic syndrome asks about medication. Which drug would address both her insulin resistance and help with menstrual irregularity?",
        "options": [
            "A. Atorvastatin",
            "B. Amlodipine",
            "C. Metformin",
            "D. Spironolactone",
            "E. Orlistat"
        ],
        "answer": "C",
        "explanation": "Metformin reduces hepatic glucose output and improves peripheral insulin sensitivity. In PCOS, reducing hyperinsulinaemia lowers LH-driven androgen production by the ovarian theca cells, restoring menstrual regularity. It does not directly block androgens (unlike spironolactone)."
    },
    {
        "type": "mcq",
        "question": "Which antihypertensive class is preferred in metabolic syndrome and why?",
        "options": [
            "A. Thiazide diuretics — reduce fluid overload",
            "B. Beta-blockers — reduce cardiac output",
            "C. ACE inhibitors or ARBs — improve insulin sensitivity and are renoprotective",
            "D. Alpha-blockers — reduce peripheral resistance",
            "E. Calcium channel blockers — metabolically neutral"
        ],
        "answer": "C",
        "explanation": "ACE inhibitors and ARBs are preferred in metabolic syndrome: they improve insulin sensitivity (unlike thiazides or beta-blockers which worsen it), reduce albuminuria, and lower progression to T2DM. Beta-blockers and thiazides can worsen glycaemia and dyslipidaemia."
    },
    {
        "type": "mcq",
        "question": "Metabolic syndrome is most directly linked to which hepatic condition?",
        "options": [
            "A. Autoimmune hepatitis",
            "B. Primary biliary cholangitis",
            "C. Non-alcoholic fatty liver disease (NAFLD)",
            "D. Haemochromatosis",
            "E. Wilson's disease"
        ],
        "answer": "C",
        "explanation": "NAFLD is the hepatic manifestation of insulin resistance. Hyperinsulinaemia drives hepatic de novo lipogenesis and VLDL synthesis; ↑FFA delivery from visceral fat causes hepatic steatosis. ~70% of patients with metabolic syndrome have NAFLD."
    },
    {
        "type": "mcq",
        "question": "A patient with metabolic syndrome achieves 8% weight loss through diet and exercise. Which outcome is most likely?",
        "options": [
            "A. Improvement in blood pressure only",
            "B. Improvement in triglycerides only",
            "C. Reversal of metabolic syndrome in most patients",
            "D. No significant change as pharmacotherapy is required",
            "E. Improvement in HDL only"
        ],
        "answer": "C",
        "explanation": "A 5–10% weight reduction improves all components of metabolic syndrome simultaneously (BP, TG, HDL, fasting glucose) and can reverse the diagnosis entirely. Lifestyle modification is the cornerstone of treatment and is more effective than treating individual components pharmacologically."
    },
]


# =============================================================================
# GAP 2: SECONDARY CAUSES OF DIABETES
# =============================================================================

HTML_NOTES_SECONDARY_DM = """
<div class="rn-section-title">Secondary Causes of Diabetes — Overview</div>
<div class="rn-body">
  <p>
    Secondary diabetes arises from an identifiable underlying cause other than primary autoimmune
    (T1DM) or polygenic insulin resistance (T2DM). It accounts for approximately <strong>1–5%</strong>
    of all diabetes cases. Recognising the cause is essential as treatment of the underlying
    condition may improve or resolve hyperglycaemia.
  </p>
  <div class="rn-callout rn-callout-blue">
    <strong>Key diagnostic tool — C-peptide:</strong>
    <ul>
      <li><strong>Low/absent C-peptide</strong>: absolute insulin deficiency — T1DM, total pancreatectomy, advanced chronic pancreatitis</li>
      <li><strong>Normal/high C-peptide</strong>: insulin resistance or excess insulin secretion — T2DM, Cushing's, acromegaly, drug-induced</li>
      <li><strong>Detectable C-peptide + young age + family history</strong>: consider MODY (helps distinguish from T1DM where C-peptide is undetectable)</li>
    </ul>
  </div>
</div>

<div class="rn-section-title">1. Pancreatic Causes</div>
<div class="rn-body">
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Cause</th>
          <th>Mechanism</th>
          <th>Key Features</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Chronic pancreatitis</strong></td>
          <td>Progressive destruction of islet cells (both α and β)</td>
          <td>Both insulin deficiency AND glucagon deficiency → brittle, hypoglycaemia-prone diabetes; often alcohol-related</td>
        </tr>
        <tr>
          <td><strong>Acute pancreatitis</strong></td>
          <td>Transient β-cell damage from inflammation</td>
          <td>Usually transient; ~40% develop persistent glucose intolerance post-acute pancreatitis; screen at 3 months</td>
        </tr>
        <tr>
          <td><strong>Pancreatectomy</strong></td>
          <td>Surgical removal of islets</td>
          <td>Total pancreatectomy → type 3c diabetes; exocrine insufficiency + loss of glucagon → brittle; needs insulin + pancreatic enzyme replacement</td>
        </tr>
        <tr>
          <td><strong>Haemochromatosis</strong></td>
          <td>Iron deposition destroys β-cells</td>
          <td>"Bronze diabetes" — skin bronzing + diabetes + cirrhosis; HFE gene (C282Y mutation); treat with venesection (may reverse early diabetes)</td>
        </tr>
        <tr>
          <td><strong>Cystic fibrosis</strong></td>
          <td>Fibrosis + fatty replacement of pancreas destroys islets</td>
          <td>Cystic fibrosis-related diabetes (CFRD): ~50% of adults; insulin deficiency predominates; unique post-meal hyperglycaemia pattern; treat with insulin</td>
        </tr>
        <tr>
          <td><strong>Pancreatic cancer</strong></td>
          <td>Tumour destroys islets; paraneoplastic insulin resistance</td>
          <td>New-onset diabetes in a lean, older patient may be early sign of pancreatic adenocarcinoma; investigate if no other risk factors</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="rn-section-title">2. Endocrine Causes</div>
<div class="rn-body">
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Condition</th>
          <th>Hormone excess</th>
          <th>Mechanism of hyperglycaemia</th>
          <th>Clues</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Cushing's syndrome</strong></td>
          <td>Cortisol</td>
          <td>↑Gluconeogenesis, ↑proteolysis (→gluconeogenic substrates), ↓GLUT4 expression → peripheral insulin resistance</td>
          <td>Central obesity, purple striae, proximal myopathy, buffalo hump, moon face; check 24h urinary cortisol / dexamethasone suppression test</td>
        </tr>
        <tr>
          <td><strong>Acromegaly</strong></td>
          <td>Growth hormone (GH)</td>
          <td>GH antagonises insulin signalling (post-receptor); ↑lipolysis → ↑FFAs → further insulin resistance</td>
          <td>Coarse features, enlarged hands/feet, prognathism, bitemporal hemianopia; IGF-1 elevated; diagnose with OGTT (GH fails to suppress)</td>
        </tr>
        <tr>
          <td><strong>Phaeochromocytoma</strong></td>
          <td>Adrenaline / Noradrenaline</td>
          <td>Catecholamines inhibit insulin secretion (α₂-receptors on β-cells) and stimulate glycogenolysis/gluconeogenesis</td>
          <td>Episodic headache, sweating, palpitations, hypertension; 24h urine metanephrines; adrenal mass on imaging</td>
        </tr>
        <tr>
          <td><strong>Glucagonoma</strong></td>
          <td>Glucagon</td>
          <td>Direct stimulation of hepatic glucose output; inhibition of insulin release</td>
          <td>Necrolytic migratory erythema (pathognomonic), weight loss, diarrhoea; pancreatic tail tumour; ↑↑glucagon levels</td>
        </tr>
        <tr>
          <td><strong>Hyperthyroidism</strong></td>
          <td>T3 / T4</td>
          <td>↑Glucose absorption, ↑glycogenolysis, ↑gluconeogenesis; ↑peripheral glucose utilisation also (net effect is hyperglycaemia in pre-existing insulin resistance)</td>
          <td>Weight loss, palpitations, heat intolerance; TSH suppressed; ↑free T4</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="rn-section-title">3. Drug-Induced Diabetes</div>
<div class="rn-body">
  <div class="rn-callout rn-callout-red">
    <strong>Glucocorticoids are the most common cause of drug-induced diabetes.</strong>
    Steroid-induced hyperglycaemia characteristically peaks post-lunch/evening (post-prandial pattern) —
    morning fasting glucose may be near-normal initially. Treat with insulin if significant.
  </div>
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Drug</th>
          <th>Mechanism</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Glucocorticoids</strong> (prednisolone, dexamethasone)</td>
          <td>↑Hepatic gluconeogenesis, ↓peripheral insulin sensitivity, ↓β-cell insulin secretion</td>
          <td>Most common; dose-dependent; post-prandial predominant; may require insulin; usually reversible on cessation</td>
        </tr>
        <tr>
          <td><strong>Thiazide diuretics</strong> (bendroflumethiazide)</td>
          <td>Hypokalaemia → inhibits insulin secretion (K⁺ required for β-cell depolarisation)</td>
          <td>Low-dose thiazides have minimal effect; risk increases with hypokalaemia; SHEP / ALLHAT trials showed modest glycaemia effect</td>
        </tr>
        <tr>
          <td><strong>Atypical antipsychotics</strong> (olanzapine, clozapine)</td>
          <td>Weight gain (dopamine/serotonin blockade → ↑appetite); direct impairment of insulin signalling; clozapine may have direct β-cell toxicity</td>
          <td>Monitor fasting glucose and lipids at baseline and 3-monthly; metabolic monitoring guidelines (NICE)</td>
        </tr>
        <tr>
          <td><strong>Tacrolimus / Ciclosporin</strong></td>
          <td>Calcineurin inhibitors → direct β-cell toxicity (inhibit insulin gene transcription)</td>
          <td>Post-transplant diabetes mellitus (PTDM); tacrolimus &gt; ciclosporin for diabetes risk; may require insulin</td>
        </tr>
        <tr>
          <td><strong>Protease inhibitors</strong> (ritonavir, lopinavir)</td>
          <td>Peripheral insulin resistance; lipodystrophy</td>
          <td>HIV-related metabolic syndrome; peripheral fat wasting + central adiposity</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

<div class="rn-section-title">4. Genetic Causes</div>
<div class="rn-body">
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Condition</th>
          <th>Genetics / Mechanism</th>
          <th>Key Features</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>MODY</strong> (Maturity Onset Diabetes of the Young)</td>
          <td>Autosomal dominant single-gene defects in β-cell function; HNF-1α (MODY3) most common (~70%); HNF-4α (MODY1); glucokinase (MODY2)</td>
          <td>Young (&lt;25 yrs), non-obese, strong family history (3 generations), C-peptide detectable (unlike T1DM); MODY3 responds to sulphonylureas; MODY2 (glucokinase) — mild stable hyperglycaemia, no treatment needed usually</td>
        </tr>
        <tr>
          <td><strong>Wolfram syndrome</strong> (DIDMOAD)</td>
          <td>WFS1 gene mutation; mitochondrial dysfunction in β-cells and neurons</td>
          <td><strong>D</strong>iabetes <strong>I</strong>nsipidus, <strong>D</strong>iabetes <strong>M</strong>ellitus, <strong>O</strong>ptic <strong>A</strong>trophy, <strong>D</strong>eafness; progressive neurodegeneration; autosomal recessive</td>
        </tr>
        <tr>
          <td><strong>Down syndrome</strong> (Trisomy 21)</td>
          <td>Autoimmune predisposition; ↑T1DM risk; also ↑T2DM due to obesity</td>
          <td>Both T1DM and T2DM more prevalent; check thyroid function (autoimmune thyroiditis also ↑)</td>
        </tr>
        <tr>
          <td><strong>Turner syndrome</strong> (45,XO)</td>
          <td>Insulin resistance; autoimmune T1DM predisposition</td>
          <td>Short stature, gonadal dysgenesis, webbed neck; diabetes prevalence 10×; also ↑HTN, aortic coarctation</td>
        </tr>
        <tr>
          <td><strong>Klinefelter syndrome</strong> (47,XXY)</td>
          <td>Insulin resistance; possibly reduced β-cell mass</td>
          <td>Tall stature, small testes, gynaecomastia; ↑T2DM and metabolic syndrome risk; ↑autoimmune disease</td>
        </tr>
        <tr>
          <td><strong>Myotonic dystrophy</strong></td>
          <td>DMPK gene (CTG repeat); post-receptor insulin resistance; defective GLUT4 translocation</td>
          <td>Muscle wasting, myotonia, frontal baldness, cataracts; diabetes in ~5–10%; autosomal dominant</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="rn-callout rn-callout-blue">
    <strong>Distinguishing MODY from T1DM:</strong>
    <ul>
      <li>MODY: C-peptide <em>detectable</em>, GAD/islet-cell antibodies <em>negative</em>, strong family history (autosomal dominant — 50% of first-degree relatives affected), onset &lt;25 years, non-obese</li>
      <li>T1DM: C-peptide <em>undetectable</em>, GAD/IA2/ZnT8 antibodies <em>positive</em></li>
      <li>Confirm MODY with <strong>targeted genetic testing</strong> (next-generation sequencing panel)</li>
    </ul>
  </div>
</div>
"""

FC_SECONDARY_DM = [
    {
        "front": "Name the 5 pancreatic causes of secondary diabetes.",
        "back": "1. Chronic pancreatitis | 2. Acute pancreatitis (transient) | 3. Pancreatectomy (type 3c diabetes) | 4. Haemochromatosis ('bronze diabetes') | 5. Cystic fibrosis (CFRD) | Also: pancreatic adenocarcinoma."
    },
    {
        "front": "A patient with Cushing's syndrome develops diabetes. What is the primary mechanism?",
        "back": "Cortisol → ↑hepatic gluconeogenesis (from amino acids via proteolysis) + ↓GLUT4 expression → peripheral insulin resistance. C-peptide is normal/high (insulin resistance, not deficiency)."
    },
    {
        "front": "What is the most common cause of drug-induced diabetes, and what is its characteristic glycaemic pattern?",
        "back": "Glucocorticoids (most common). | Pattern: predominantly post-prandial / afternoon-evening hyperglycaemia; morning fasting glucose may be near-normal in early stages."
    },
    {
        "front": "How does C-peptide help distinguish MODY from Type 1 DM?",
        "back": "MODY: C-peptide is detectable (β-cell function preserved) + GAD/IA2 antibodies negative + autosomal dominant family history. | T1DM: C-peptide undetectable + GAD/IA2/ZnT8 antibodies positive. | Confirm MODY with genetic testing."
    },
    {
        "front": "What is DIDMOAD and which gene is mutated?",
        "back": "Wolfram syndrome: Diabetes Insipidus, Diabetes Mellitus, Optic Atrophy, Deafness. | Caused by WFS1 gene mutation (autosomal recessive). Progressive neurodegenerative course."
    },
    {
        "front": "Which MODY subtype is most common, what gene is mutated, and what is its first-line treatment?",
        "back": "MODY3 (HNF-1α mutation) — most common (~70% of MODY). | Treatment: sulphonylureas (exquisitely sensitive — low-dose effective). | MODY2 (glucokinase) — mild, stable hyperglycaemia, usually no pharmacotherapy needed."
    },
]

MCQ_SECONDARY_DM = [
    {
        "type": "mcq",
        "question": "A 58-year-old man presents with skin bronzing, new-onset diabetes, and abnormal liver function tests. Ferritin is 2800 μg/L. What is the underlying diagnosis and its genetic basis?",
        "options": [
            "A. Wilson's disease — ATP7B gene mutation",
            "B. Haemochromatosis — HFE gene C282Y mutation",
            "C. Primary biliary cholangitis — AMA antibody positive",
            "D. Porphyria cutanea tarda — UROD gene mutation",
            "E. Addison's disease — CYP21A2 mutation"
        ],
        "answer": "B",
        "explanation": "The triad of skin bronzing + diabetes + liver disease ('bronze diabetes') is classic hereditary haemochromatosis. The most common mutation is C282Y in the HFE gene (chromosome 6). Iron deposition destroys pancreatic β-cells. Treatment is venesection; early treatment may reverse diabetes."
    },
    {
        "type": "mcq",
        "question": "A 24-year-old non-obese woman presents with diabetes. Her mother and maternal grandfather also have diabetes. C-peptide is 0.9 nmol/L (normal), GAD antibodies are negative. What is the most likely diagnosis?",
        "options": [
            "A. Type 1 diabetes mellitus with late onset",
            "B. Type 2 diabetes mellitus",
            "C. Maturity onset diabetes of the young (MODY)",
            "D. Wolfram syndrome",
            "E. Latent autoimmune diabetes of adults (LADA)"
        ],
        "answer": "C",
        "explanation": "MODY is characterised by: onset <25 years, non-obese, autosomal dominant family history (3 generations), detectable C-peptide, negative autoantibodies. LADA would have positive GAD antibodies. T1DM would have undetectable C-peptide. T2DM is unlikely in a non-obese 24-year-old with this family pattern. Confirm with MODY genetic panel."
    },
    {
        "type": "mcq",
        "question": "Which mechanism best explains hyperglycaemia in a patient with a phaeochromocytoma?",
        "options": [
            "A. Direct destruction of β-cells by catecholamines",
            "B. Catecholamines stimulate α₂-adrenoceptors on β-cells inhibiting insulin secretion, and promote glycogenolysis",
            "C. Excess cortisol co-secretion stimulates gluconeogenesis",
            "D. Noradrenaline activates β₂-adrenoceptors causing lipolysis only",
            "E. Tumour mass effect on the pancreas reduces insulin output"
        ],
        "answer": "B",
        "explanation": "Catecholamines (adrenaline/noradrenaline) act on α₂-adrenoceptors on pancreatic β-cells to inhibit insulin secretion. They also stimulate glycogenolysis (liver and muscle via β₂) and gluconeogenesis (liver via β₂/α₁), raising blood glucose. This is reversible after adrenalectomy."
    },
    {
        "type": "mcq",
        "question": "A renal transplant patient develops hyperglycaemia 6 weeks post-transplant. Which immunosuppressant is most likely responsible and what is its mechanism?",
        "options": [
            "A. Azathioprine — bone marrow suppression impairs insulin production",
            "B. Mycophenolate mofetil — purine synthesis inhibition affects β-cells",
            "C. Tacrolimus — calcineurin inhibition causes direct β-cell toxicity and inhibits insulin gene transcription",
            "D. Prednisolone — only causes diabetes after years of use",
            "E. Basiliximab — IL-2 receptor blockade causes insulin resistance"
        ],
        "answer": "C",
        "explanation": "Post-transplant diabetes mellitus (PTDM) is most strongly associated with tacrolimus (> ciclosporin). Calcineurin inhibitors block calcineurin in β-cells, inhibiting NFAT-driven insulin gene transcription and impairing insulin secretion. Tacrolimus carries ~2–3× greater PTDM risk than ciclosporin. Prednisolone also contributes but acts via insulin resistance rather than β-cell toxicity."
    },
    {
        "type": "mcq",
        "question": "In acromegaly, what is the primary mechanism by which excess growth hormone causes diabetes?",
        "options": [
            "A. GH directly destroys pancreatic β-cells",
            "B. IGF-1 causes excessive glycogenolysis",
            "C. GH antagonises post-receptor insulin signalling and promotes lipolysis raising circulating FFAs",
            "D. GH stimulates glucagon release from α-cells",
            "E. GH upregulates hepatic glucose transporter expression"
        ],
        "answer": "C",
        "explanation": "GH is a counter-regulatory hormone that antagonises insulin at the post-receptor level (reduces IRS-1 phosphorylation). GH also promotes lipolysis, raising plasma free fatty acids which further impair insulin signalling (Randle cycle). ~25% of acromegaly patients develop overt diabetes. Treatment of acromegaly (surgery, somatostatin analogues) improves glycaemia."
    },
    {
        "type": "mcq",
        "question": "A 52-year-old woman develops new-onset diabetes while taking prednisolone 40 mg/day for an autoimmune condition. Fasting glucose is 6.2 mmol/L, but post-lunch glucose is 14.8 mmol/L. What is the most appropriate first-line management?",
        "options": [
            "A. Dietary advice alone and recheck in 3 months",
            "B. Metformin 500 mg twice daily",
            "C. Basal insulin (e.g. insulin glargine once daily at night)",
            "D. Prandial insulin (e.g. short-acting insulin with meals) titrated to post-meal glucose",
            "E. Sulphonylurea (e.g. gliclazide)"
        ],
        "answer": "D",
        "explanation": "Steroid-induced diabetes characteristically causes predominantly post-prandial hyperglycaemia (steroids peak 4–8 hours after morning dose → afternoon/evening glucose rise) with relatively preserved fasting glucose. Prandial (short-acting) insulin given with meals, especially lunch and dinner, targets this pattern most effectively. Basal insulin alone addresses overnight fasting glucose but not the post-prandial spike. Sulphonylureas can be used but prandial insulin is preferred for significant hyperglycaemia on high-dose steroids."
    },
]
# endocrinology_gaps.py
# Medical education content for MBBS Endocrinology revision site
# GAP 1: Full Pituitary Hormone Roster
# GAP 2: Furosemide + Prednisolone in Acute Hypercalcaemia

# ---------------------------------------------------------------------------
# GAP 1 — PITUITARY HORMONE ROSTER
# ---------------------------------------------------------------------------

HTML_NOTES_PITUITARY_HORMONES = """
<div class="rn-section-title">Pituitary Hormone Roster</div>
<div class="rn-body">

  <div class="rn-callout rn-callout-blue">
    <strong>Mnemonic — Anterior Pituitary (Adenohypophysis):</strong>
    <strong>"FLAT PEG"</strong> — <strong>F</strong>SH, <strong>L</strong>H,
    <strong>A</strong>CTH, <strong>T</strong>SH, <strong>P</strong>rolactin,
    <strong>E</strong>ndorphins (beta-endorphin / MSH co-products), <strong>G</strong>H
  </div>

  <div class="rn-section-title">Anterior Pituitary (Adenohypophysis)</div>
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Hormone</th>
          <th>Stimulated by</th>
          <th>Inhibited by</th>
          <th>Target / Effect</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>GH</strong> (Growth Hormone / Somatotropin)</td>
          <td>GHRH (hypothalamus); ghrelin</td>
          <td>Somatostatin; IGF-1 (long-loop); GH itself (short-loop)</td>
          <td>Liver &#x2192; <strong>IGF-1</strong>; linear growth (epiphyses), lipolysis,
              gluconeogenesis, protein synthesis</td>
        </tr>
        <tr>
          <td><strong>TSH</strong> (Thyroid-Stimulating Hormone / Thyrotropin)</td>
          <td>TRH (hypothalamus)</td>
          <td>T3/T4 (negative feedback); somatostatin; dopamine</td>
          <td>Thyroid follicular cells &#x2192; T3/T4; iodine uptake, thyroid growth</td>
        </tr>
        <tr>
          <td><strong>ACTH</strong> (Adrenocorticotrophic Hormone / Corticotropin)</td>
          <td>CRH (hypothalamus); stress; ADH (synergistic)</td>
          <td>Cortisol (negative feedback)</td>
          <td>Adrenal cortex (zona fasciculata/reticularis) &#x2192; <strong>cortisol</strong>,
              androgens (DHEA-S)</td>
        </tr>
        <tr>
          <td><strong>LH</strong> (Luteinising Hormone)</td>
          <td>GnRH (hypothalamus, pulsatile)</td>
          <td>Sex steroids (oestrogen, testosterone); inhibin</td>
          <td>&#x2640; Ovulation trigger; corpus luteum &#x2192; progesterone.
              &#x2642; Leydig cells &#x2192; <strong>testosterone</strong></td>
        </tr>
        <tr>
          <td><strong>FSH</strong> (Follicle-Stimulating Hormone)</td>
          <td>GnRH (hypothalamus, pulsatile)</td>
          <td>Inhibin (primarily); sex steroids</td>
          <td>&#x2640; Follicle development, oestrogen (via aromatase).
              &#x2642; Sertoli cells &#x2192; <strong>spermatogenesis</strong></td>
        </tr>
        <tr>
          <td><strong>Prolactin</strong> (PRL)</td>
          <td>TRH; oestrogen; nipple stimulation; stress</td>
          <td><strong>Dopamine</strong> (dominant tonic inhibitor — unique mechanism)</td>
          <td>Breast &#x2192; <strong>lactation</strong>; inhibits GnRH &#x2192;
              amenorrhoea / erectile dysfunction at high levels</td>
        </tr>
        <tr>
          <td><strong>beta-Endorphin / alpha-MSH</strong> (POMC derivatives, co-secreted with ACTH)</td>
          <td>CRH (co-processed from POMC)</td>
          <td>Cortisol</td>
          <td>Opioid analgesia; melanocyte stimulation (hyperpigmentation in Addison's
              via high ACTH/MSH)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="rn-callout rn-callout-blue">
    <strong>Key fact — Prolactin is unique:</strong> it is under <em>tonic inhibition</em> by
    dopamine from the hypothalamus. Loss of dopaminergic input (e.g. dopamine-blocking drugs
    such as metoclopramide, antipsychotics; or a pituitary stalk lesion) raises prolactin.
    All other anterior pituitary hormones require a positive releasing hormone signal.
  </div>

  <div class="rn-section-title">Posterior Pituitary (Neurohypophysis)</div>
  <div class="rn-callout rn-callout-blue">
    <strong>Important distinction:</strong> The posterior pituitary does <em>not</em> synthesise
    hormones. ADH and oxytocin are made in hypothalamic nuclei and transported down axons for
    <strong>storage and release</strong> from the posterior pituitary.
  </div>
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Hormone</th>
          <th>Synthesised in</th>
          <th>Stimuli for Release</th>
          <th>Receptors and Effects</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>ADH / AVP</strong> (Antidiuretic Hormone / Arginine Vasopressin)</td>
          <td>Supraoptic nucleus (predominantly); some paraventricular nucleus</td>
          <td>&#x2191; Plasma osmolality (osmoreceptors); &#x2193; blood volume/pressure
              (baroreceptors); nausea; pain</td>
          <td>
            <strong>V2</strong> receptors (renal collecting duct) &#x2192; aquaporin-2 insertion
            &#x2192; water reabsorption (antidiuresis)<br>
            <strong>V1</strong> receptors (vascular smooth muscle) &#x2192; vasoconstriction
            (at high/pharmacological doses)
          </td>
        </tr>
        <tr>
          <td><strong>Oxytocin</strong></td>
          <td>Paraventricular nucleus (predominantly); some supraoptic nucleus</td>
          <td>Cervical/vaginal stretch (Ferguson reflex); nipple stimulation;
              positive-feedback loop in labour</td>
          <td>Uterine smooth muscle &#x2192; <strong>labour contractions</strong>;
              myoepithelial cells &#x2192; <strong>milk ejection</strong> (let-down reflex)</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="rn-callout rn-callout-red">
    <strong>Exam trap — ADH vs Oxytocin nuclei:</strong> Both are made in BOTH nuclei, but
    ADH is predominantly supraoptic and oxytocin predominantly paraventricular.
    Destruction of the stalk or posterior pituitary causes central DI (&#x2193; ADH) without
    affecting synthesis (which continues in the hypothalamus), so DI can partially recover
    over time.
  </div>

  <div class="rn-section-title">Hypothalamic-Pituitary Axes — Quick Reference</div>
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Axis</th>
          <th>Hypothalamic signal</th>
          <th>Pituitary hormone</th>
          <th>End-organ hormone</th>
          <th>Feedback</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>GH axis</td>
          <td>GHRH (+) / Somatostatin (-)</td>
          <td>GH</td>
          <td>IGF-1 (liver)</td>
          <td>IGF-1 inhibits GHRH and GH; somatostatin inhibits GH</td>
        </tr>
        <tr>
          <td>Thyroid axis</td>
          <td>TRH (+)</td>
          <td>TSH</td>
          <td>T3 / T4</td>
          <td>T3/T4 inhibit TRH and TSH</td>
        </tr>
        <tr>
          <td>Adrenal axis</td>
          <td>CRH (+)</td>
          <td>ACTH</td>
          <td>Cortisol</td>
          <td>Cortisol inhibits CRH and ACTH</td>
        </tr>
        <tr>
          <td>Gonadal axis</td>
          <td>GnRH (+, pulsatile)</td>
          <td>LH / FSH</td>
          <td>Sex steroids / inhibin</td>
          <td>Steroids and inhibin inhibit GnRH, LH, FSH</td>
        </tr>
        <tr>
          <td>Prolactin axis</td>
          <td>Dopamine (-) / TRH (+)</td>
          <td>Prolactin</td>
          <td>—</td>
          <td>Prolactin stimulates dopamine (short-loop auto-inhibition)</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
"""

FC_PITUITARY_HORMONES = [
    {
        "front": "What mnemonic covers the six main anterior pituitary hormones and what does each letter stand for?",
        "back": (
            "<strong>FLAT PEG</strong><br>"
            "F — FSH<br>"
            "L — LH<br>"
            "A — ACTH<br>"
            "T — TSH<br>"
            "P — Prolactin<br>"
            "E — Endorphins (beta-endorphin / MSH, POMC derivatives)<br>"
            "G — GH"
        ),
    },
    {
        "front": "Which anterior pituitary hormone is under TONIC INHIBITION rather than tonic stimulation, and what is the inhibitor?",
        "back": (
            "<strong>Prolactin</strong> — tonically inhibited by <strong>dopamine</strong> "
            "from the hypothalamus (tuberoinfundibular pathway).<br><br>"
            "Clinical implication: dopamine antagonists (antipsychotics, metoclopramide) "
            "and stalk compression raise prolactin "
            "-> galactorrhoea, amenorrhoea, hypogonadism."
        ),
    },
    {
        "front": "Where are ADH and oxytocin SYNTHESISED, and where are they RELEASED from?",
        "back": (
            "<strong>Synthesised in hypothalamic nuclei:</strong><br>"
            "ADH — predominantly supraoptic nucleus<br>"
            "Oxytocin — predominantly paraventricular nucleus<br><br>"
            "<strong>Released from:</strong> posterior pituitary (neurohypophysis), "
            "which merely stores them."
        ),
    },
    {
        "front": "Name the two ADH receptor subtypes, their locations, and their effects.",
        "back": (
            "<strong>V1 (V1a)</strong> — vascular smooth muscle "
            "-> <strong>vasoconstriction</strong> "
            "(relevant at high/pharmacological doses, e.g. vasopressin in septic shock)<br><br>"
            "<strong>V2</strong> — renal collecting duct principal cells "
            "-> insertion of <strong>aquaporin-2</strong> channels "
            "-> water reabsorption -> concentrated urine<br><br>"
            "V2 antagonists (vaptans) used in SIADH."
        ),
    },
    {
        "front": "What are the hypothalamic stimulatory and inhibitory regulators of GH secretion?",
        "back": (
            "<strong>Stimulatory:</strong> GHRH (Growth Hormone-Releasing Hormone); "
            "also ghrelin<br><br>"
            "<strong>Inhibitory:</strong> Somatostatin (GHIH); IGF-1 (long-loop negative "
            "feedback); GH itself (short-loop)<br><br>"
            "Octreotide (somatostatin analogue) lowers GH — used in acromegaly treatment."
        ),
    },
    {
        "front": "ACTH is cleaved from a larger precursor. Name the precursor and two other hormones also derived from it.",
        "back": (
            "<strong>Precursor:</strong> POMC (Pro-opiomelanocortin)<br><br>"
            "<strong>Also derived from POMC:</strong><br>"
            "beta-Endorphin (endogenous opioid)<br>"
            "alpha-MSH / beta-MSH (melanocyte-stimulating hormones)<br><br>"
            "Clinical relevance: in Addison's disease, high ACTH drive "
            "-> high MSH -> <strong>hyperpigmentation</strong> of skin and mucosae."
        ),
    },
]

MCQ_PITUITARY_HORMONES = [
    {
        "type": "mcq",
        "question": (
            "A 28-year-old woman is started on haloperidol for schizophrenia. "
            "Six weeks later she reports milky nipple discharge and her periods have stopped. "
            "Serum prolactin is markedly elevated. "
            "Which best explains the mechanism of hyperprolactinaemia in this case?"
        ),
        "options": [
            "A. Haloperidol directly stimulates lactotroph cells via TRH receptors",
            "B. Haloperidol blocks dopamine D2 receptors, removing tonic inhibition of prolactin secretion",
            "C. Haloperidol stimulates GHRH release, which cross-reacts with prolactin receptors",
            "D. Haloperidol causes pituitary stalk compression, destroying somatotrophs",
            "E. Haloperidol activates V2 receptors, promoting prolactin gene transcription",
        ],
        "answer": "B",
        "explanation": (
            "Prolactin is uniquely under tonic inhibitory control by dopamine via the "
            "tuberoinfundibular pathway. Dopamine D2 receptor antagonists (typical antipsychotics, "
            "metoclopramide, domperidone) remove this inhibition, causing hyperprolactinaemia "
            "leading to galactorrhoea and amenorrhoea (by suppressing GnRH pulsatility). "
            "TRH is a stimulator but not the primary regulator. Stalk compression is a structural "
            "cause, not a pharmacological one."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "A medical student is asked about the posterior pituitary. "
            "Which statement is CORRECT regarding ADH and oxytocin?"
        ),
        "options": [
            "A. Both hormones are synthesised by specialised cells within the posterior pituitary",
            "B. ADH is predominantly synthesised in the paraventricular nucleus",
            "C. Oxytocin is predominantly synthesised in the supraoptic nucleus",
            "D. Both hormones are synthesised in hypothalamic nuclei and stored in the posterior pituitary",
            "E. Destruction of the posterior pituitary permanently abolishes ADH production",
        ],
        "answer": "D",
        "explanation": (
            "The posterior pituitary (neurohypophysis) does NOT synthesise hormones. "
            "ADH and oxytocin are made by magnocellular neurons in the hypothalamus "
            "(ADH predominantly supraoptic nucleus; oxytocin predominantly paraventricular "
            "nucleus), transported down axons, and stored in Herring bodies in the posterior "
            "pituitary. Because synthesis continues in the hypothalamus, destruction of the "
            "posterior pituitary or stalk does not permanently abolish ADH production — "
            "diabetes insipidus may partially recover over time."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "In the hypothalamic-pituitary-thyroid axis, which combination of signals "
            "correctly describes regulation of TSH secretion?"
        ),
        "options": [
            "A. TRH stimulates; T3/T4 stimulate; somatostatin inhibits",
            "B. TRH stimulates; T3/T4 inhibit; dopamine inhibits",
            "C. CRH stimulates; T3/T4 inhibit; somatostatin inhibits",
            "D. TRH stimulates; T3/T4 stimulate; GnRH inhibits",
            "E. GHRH stimulates; T3/T4 inhibit; somatostatin inhibits",
        ],
        "answer": "B",
        "explanation": (
            "TSH is stimulated by TRH (from hypothalamus) and inhibited by T3/T4 (negative "
            "feedback — T3 is the active intracellular form). Dopamine also inhibits TSH "
            "secretion (relevant in dopamine infusions causing secondary hypothyroidism in ITU). "
            "Somatostatin can inhibit TSH but dopamine is the more clinically tested inhibitor "
            "alongside T3/T4. CRH drives ACTH, not TSH; GHRH drives GH."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "Which anterior pituitary hormone is derived from POMC, "
            "and which clinical sign results from excess co-secretion of its fellow POMC derivative?"
        ),
        "options": [
            "A. TSH; pretibial myxoedema",
            "B. GH; acral enlargement",
            "C. ACTH; hyperpigmentation",
            "D. Prolactin; galactorrhoea",
            "E. FSH; gynaecomastia",
        ],
        "answer": "C",
        "explanation": (
            "ACTH is cleaved from POMC alongside beta-endorphin and alpha/beta-MSH "
            "(melanocyte-stimulating hormones). In primary adrenal insufficiency (Addison's "
            "disease), loss of cortisol negative feedback drives high CRH -> high POMC "
            "processing -> high ACTH and high MSH. Excess MSH stimulates melanocytes -> "
            "characteristic hyperpigmentation of skin creases, buccal mucosa, and scars."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "Octreotide is used in the treatment of acromegaly. "
            "What is its mechanism of action relevant to GH excess?"
        ),
        "options": [
            "A. It is a GHRH analogue that desensitises GHRH receptors on somatotrophs",
            "B. It is a somatostatin analogue that inhibits GH release from somatotrophs",
            "C. It blocks IGF-1 receptors in peripheral tissues, reducing GH-driven effects",
            "D. It is a dopamine agonist that suppresses GH via the same pathway as prolactin inhibition",
            "E. It inhibits the conversion of GH to IGF-1 in the liver",
        ],
        "answer": "B",
        "explanation": (
            "Octreotide is a long-acting somatostatin analogue. Somatostatin (growth hormone "
            "inhibitory hormone, GHIH) is the main physiological inhibitor of GH release from "
            "pituitary somatotrophs. Octreotide mimics this action, reducing GH (and IGF-1) levels "
            "in acromegaly. It also inhibits TSH and various GI hormones. Pegvisomant is the GH "
            "receptor antagonist (option C mechanism). Dopamine agonists (cabergoline) have a minor "
            "role in acromegaly but are not the mechanism of octreotide."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "A 32-year-old man presents with infertility and low testosterone. "
            "LH and FSH are both undetectable. MRI shows a large pituitary macroadenoma. "
            "His serum prolactin is 8,500 mU/L (normal < 500). "
            "What is the most likely mechanism causing his hypogonadism?"
        ),
        "options": [
            "A. Direct destruction of gonadotroph cells by the adenoma",
            "B. Hyperprolactinaemia suppressing pulsatile GnRH release from the hypothalamus",
            "C. Raised IGF-1 inhibiting LH receptor expression in Leydig cells",
            "D. Excess dopamine secretion from the adenoma blocking LH release",
            "E. ADH excess causing water retention and dilutional hypogonadism",
        ],
        "answer": "B",
        "explanation": (
            "Hyperprolactinaemia (from a prolactinoma here) suppresses the hypothalamic GnRH "
            "pulse generator. Pulsatile GnRH is required for normal LH and FSH secretion; "
            "absent/suppressed GnRH signal -> suppression of gonadotrophs -> low LH/FSH -> "
            "hypogonadism (low testosterone in males, oligo/amenorrhoea in females). "
            "This is a functional — not structural — cause of hypogonadism, and normalises "
            "with dopamine agonist treatment (cabergoline) that reduces prolactin."
        ),
    },
]

# ---------------------------------------------------------------------------
# GAP 2 — FUROSEMIDE + PREDNISOLONE IN ACUTE HYPERCALCAEMIA
# ---------------------------------------------------------------------------

HTML_NOTES_HYPERCALCAEMIA_DRUGS = """
<div class="rn-section-title">Acute Hypercalcaemia: Drug Management</div>
<div class="rn-body">

  <div class="rn-callout rn-callout-red">
    <strong>Severe / symptomatic hypercalcaemia (corrected Ca&#xB2;&#x207A; &gt; 3.0 mmol/L
    or symptomatic) is a medical emergency.</strong>
    Symptoms: bones (pain), stones (renal colic), groans (nausea/vomiting/constipation),
    psychic moans (confusion, lethargy, coma).
    ECG: <strong>shortened QT interval</strong>.
  </div>

  <div class="rn-section-title">Step-by-Step Acute Management Sequence</div>
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Step</th>
          <th>Intervention</th>
          <th>Dose / Route</th>
          <th>Mechanism</th>
          <th>Key Caveat</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>1 — FIRST AND MOST IMPORTANT</strong></td>
          <td><strong>IV 0.9% Normal Saline</strong></td>
          <td>2–4 L/day IV (guided by clinical assessment)</td>
          <td>
            Rehydration (hypercalcaemia causes nephrogenic DI &#x2192; dehydration
            &#x2192; worsened hypercalcaemia).<br>
            Volume expansion &#x2192; &#x2191; GFR &#x2192;
            <strong>calciuresis</strong> (calcium follows sodium excretion)
          </td>
          <td>Monitor for fluid overload (cardiac/renal disease);
              replace electrolytes (K&#x207A;, Mg&#xB2;&#x207A;)</td>
        </tr>
        <tr>
          <td><strong>2</strong></td>
          <td><strong>Furosemide</strong> (loop diuretic)</td>
          <td>20–40 mg IV</td>
          <td>
            Inhibits Na&#x207A;/K&#x207A;/2Cl&#x207B; co-transporter in thick ascending limb
            of loop of Henle. Reduces paracellular Ca&#xB2;&#x207A; reabsorption
            &#x2192; <strong>calciuresis</strong>
          </td>
          <td>
            <strong>MUST only be given after adequate rehydration.</strong>
            If given to a dehydrated patient &#x2192; haemoconcentration
            &#x2192; <strong>worsens hypercalcaemia</strong> and risks AKI.
            Thiazides are <strong>contraindicated</strong> (&#x2191; Ca&#xB2;&#x207A; reabsorption).
          </td>
        </tr>
        <tr>
          <td><strong>3</strong></td>
          <td><strong>IV Bisphosphonates</strong> (zoledronate or pamidronate)</td>
          <td>
            Zoledronate 4 mg IV over 15 min (single dose);<br>
            Pamidronate 60–90 mg IV over 2–4 h
          </td>
          <td>
            Bind hydroxyapatite in bone &#x2192; taken up by osteoclasts &#x2192;
            inhibit farnesyl pyrophosphate synthase (mevalonate pathway)
            &#x2192; osteoclast apoptosis &#x2192; &#x2193; bone resorption
            &#x2192; &#x2193; Ca&#xB2;&#x207A; release
          </td>
          <td>
            Onset <strong>2–4 days</strong>; peak effect <strong>4–7 days</strong>.
            Check renal function before use (dose-adjust if eGFR &lt; 35).
            Mainstay for <strong>malignancy-associated hypercalcaemia</strong>.
          </td>
        </tr>
        <tr>
          <td><strong>4</strong></td>
          <td><strong>Prednisolone</strong> (corticosteroid)</td>
          <td>40–60 mg/day oral (or equivalent IV hydrocortisone)</td>
          <td>
            <strong>(a)</strong> Inhibits <strong>1&#x03B1;-hydroxylase</strong> in activated
            macrophages (granuloma-associated) &#x2192; &#x2193; conversion of 25-OH-D to
            <strong>1,25-(OH)&#x2082;-D (calcitriol)</strong>
            &#x2192; &#x2193; intestinal Ca&#xB2;&#x207A; absorption.<br>
            <strong>(b)</strong> Anti-cytokine effect &#x2192; &#x2193; osteoclast activation
            in lymphoma / myeloma.<br>
            <strong>(c)</strong> &#x2193; Intestinal Ca&#xB2;&#x207A; absorption directly
          </td>
          <td>
            Specifically indicated for:
            <ul>
              <li><strong>Granulomatous disease</strong> — sarcoidosis, TB, berylliosis,
                  fungal infections</li>
              <li><strong>Haematological malignancy</strong> — lymphoma, myeloma</li>
              <li><strong>Vitamin D toxicity</strong></li>
            </ul>
            <em>Not effective</em> for primary hyperparathyroidism or solid-tumour
            PTHrP-mediated hypercalcaemia.
          </td>
        </tr>
        <tr>
          <td><strong>5</strong></td>
          <td><strong>Calcitonin</strong></td>
          <td>4–8 IU/kg SC/IM every 6–12 h</td>
          <td>
            Inhibits osteoclast-mediated bone resorption (calcitonin receptor).
            Promotes renal Ca&#xB2;&#x207A; excretion
          </td>
          <td>
            <strong>Fastest onset</strong> of pharmacological agents (hours).
            Effect is short-lived due to <strong>tachyphylaxis</strong>
            (receptor downregulation within 24–48 h).
            Used as a <em>bridge</em> while bisphosphonates take effect.
          </td>
        </tr>
        <tr>
          <td><strong>6</strong></td>
          <td><strong>Cinacalcet</strong> (calcimimetic)</td>
          <td>30–90 mg oral BD</td>
          <td>
            Allosteric activator of <strong>calcium-sensing receptor (CaSR)</strong> on
            parathyroid chief cells &#x2192; &#x2193; PTH secretion
          </td>
          <td>
            Indicated for: <strong>primary hyperparathyroidism</strong> (unfit for surgery),
            <strong>tertiary hyperparathyroidism</strong> in CKD, parathyroid carcinoma.
            Not effective for PTHrP-mediated or vitamin-D-mediated hypercalcaemia.
          </td>
        </tr>
        <tr>
          <td><strong>7</strong></td>
          <td><strong>Haemodialysis</strong> (or haemodiafiltration)</td>
          <td>Low-calcium dialysate</td>
          <td>Direct removal of calcium from plasma</td>
          <td>
            Reserved for <strong>refractory severe hypercalcaemia</strong> with renal failure,
            cardiac arrhythmias, or when other treatments are contraindicated.
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="rn-callout rn-callout-red">
    <strong>Critical Rule — Furosemide Timing:</strong> Furosemide must NEVER be given
    before adequate IV fluid rehydration. A dehydrated hypercalcaemic patient given furosemide
    will lose more water than calcium &#x2192; haemoconcentration &#x2192; higher serum calcium
    &#x2192; renal vasoconstriction &#x2192; AKI. <strong>Fluids first. Furosemide second.</strong>
  </div>

  <div class="rn-callout rn-callout-green">
    <strong>Prednisolone — when to use it (mechanism summary):</strong><br>
    Prednisolone is effective when hypercalcaemia is driven by <strong>excess calcitriol
    (1,25-dihydroxyvitamin D)</strong> production or cytokine-driven osteoclast activation:
    <ul>
      <li><strong>Sarcoidosis / TB / granulomata:</strong> macrophage 1&#x03B1;-hydroxylase
          &#x2192; &#x2191; calcitriol &#x2192; &#x2191; gut Ca&#xB2;&#x207A; absorption.
          Prednisolone blocks this enzyme.</li>
      <li><strong>Lymphoma / myeloma:</strong> cytokines activate osteoclasts.
          Prednisolone suppresses cytokine drive.</li>
    </ul>
    It does NOT lower PTH and is <strong>ineffective for primary hyperparathyroidism</strong>.
  </div>

  <div class="rn-section-title">Causes of Hypercalcaemia and Preferred Treatments</div>
  <div class="rn-table">
    <table>
      <thead>
        <tr>
          <th>Cause</th>
          <th>Mechanism</th>
          <th>Specific Treatment</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Primary hyperparathyroidism</td>
          <td>&#x2191; PTH &#x2192; &#x2191; bone resorption + &#x2191; renal Ca&#xB2;&#x207A;
              reabsorption + &#x2191; calcitriol</td>
          <td>Parathyroidectomy (definitive); cinacalcet (medical)</td>
        </tr>
        <tr>
          <td>Malignancy (PTHrP)</td>
          <td>PTHrP mimics PTH at same receptors; bone metastases cause lytic resorption</td>
          <td>IV bisphosphonates; treat underlying malignancy; IV fluids</td>
        </tr>
        <tr>
          <td>Sarcoidosis / granulomata</td>
          <td>Macrophage 1&#x03B1;-hydroxylase &#x2192; &#x2191; calcitriol
              &#x2192; &#x2191; gut absorption</td>
          <td><strong>Prednisolone</strong>; avoid sun/vitamin D supplementation</td>
        </tr>
        <tr>
          <td>Lymphoma / myeloma</td>
          <td>Cytokine-driven osteoclast activation &#xB1; ectopic calcitriol production</td>
          <td><strong>Prednisolone</strong>; bisphosphonates; treat malignancy</td>
        </tr>
        <tr>
          <td>Tertiary hyperparathyroidism (CKD)</td>
          <td>Autonomous PTH hypersecretion after prolonged secondary HPT</td>
          <td>Cinacalcet; parathyroidectomy</td>
        </tr>
        <tr>
          <td>Vitamin D toxicity</td>
          <td>Exogenous calcitriol excess &#x2192; &#x2191; gut Ca&#xB2;&#x207A; absorption</td>
          <td><strong>Prednisolone</strong>; stop supplement; IV fluids</td>
        </tr>
        <tr>
          <td>Thiazide diuretics</td>
          <td>&#x2191; Renal Ca&#xB2;&#x207A; reabsorption in distal convoluted tubule</td>
          <td>Stop thiazide; switch to loop diuretic (furosemide) if diuresis required</td>
        </tr>
      </tbody>
    </table>
  </div>

</div>
"""

FC_HYPERCALCAEMIA_DRUGS = [
    {
        "front": (
            "What is the FIRST and most important step in managing acute severe hypercalcaemia, "
            "and what is its dual mechanism?"
        ),
        "back": (
            "<strong>IV 0.9% Normal Saline (2-4 L/day)</strong><br><br>"
            "Mechanism:<br>"
            "1. <strong>Rehydration</strong> — hypercalcaemia causes nephrogenic DI "
            "-> polyuria -> dehydration -> worsened hypercalcaemia (vicious cycle)<br>"
            "2. <strong>Calciuresis</strong> — volume expansion raises GFR and promotes "
            "urinary calcium excretion (calcium follows sodium in the proximal tubule)"
        ),
    },
    {
        "front": (
            "Why must furosemide ONLY be given AFTER IV fluid rehydration in hypercalcaemia? "
            "What happens if given to a dehydrated patient?"
        ),
        "back": (
            "Furosemide causes <strong>calciuresis</strong> by blocking the "
            "Na+/K+/2Cl- transporter in the thick ascending limb, reducing "
            "paracellular Ca2+ reabsorption.<br><br>"
            "If given to a <strong>dehydrated patient</strong>:<br>"
            "- More water lost than calcium -> haemoconcentration<br>"
            "- Serum calcium concentration <strong>rises further</strong><br>"
            "- Renal hypoperfusion -> AKI<br><br>"
            "<strong>Rule: Fluids first. Furosemide second.</strong>"
        ),
    },
    {
        "front": (
            "In which clinical scenarios is prednisolone indicated for hypercalcaemia? "
            "What is the mechanism in granulomatous disease?"
        ),
        "back": (
            "<strong>Indications:</strong><br>"
            "- Granulomatous disease: sarcoidosis, TB, berylliosis, fungal infections<br>"
            "- Haematological malignancy: lymphoma, myeloma<br>"
            "- Vitamin D toxicity<br><br>"
            "<strong>Mechanism (granulomata):</strong> Activated macrophages within "
            "granulomata express <strong>1alpha-hydroxylase</strong>, converting "
            "25-OH-D to <strong>calcitriol (1,25-(OH)2-D)</strong> -> raised intestinal "
            "Ca2+ absorption.<br>"
            "Prednisolone inhibits this enzyme -> lower calcitriol -> lower calcium.<br><br>"
            "<em>Not effective for primary HPT or PTHrP-mediated hypercalcaemia.</em>"
        ),
    },
    {
        "front": "What is the onset and main limitation of calcitonin in treating hypercalcaemia?",
        "back": (
            "<strong>Onset:</strong> Rapid — hours (fastest pharmacological agent available)<br><br>"
            "<strong>Main limitation:</strong> <strong>Tachyphylaxis</strong> — receptor "
            "downregulation within 24-48 hours -> effect wanes despite continued dosing<br><br>"
            "<strong>Role:</strong> Bridge therapy while bisphosphonates take effect "
            "(bisphosphonates onset 2-4 days, peak 4-7 days)"
        ),
    },
    {
        "front": (
            "What is the mechanism of IV bisphosphonates in hypercalcaemia, "
            "and after how many days does peak effect occur?"
        ),
        "back": (
            "<strong>Mechanism:</strong> Bisphosphonates (zoledronate, pamidronate) "
            "bind hydroxyapatite in bone -> internalised by osteoclasts -> inhibit "
            "<strong>farnesyl pyrophosphate synthase</strong> (mevalonate pathway) "
            "-> disrupt osteoclast cytoskeleton -> <strong>osteoclast apoptosis</strong> "
            "-> reduced bone resorption -> reduced Ca2+ release<br><br>"
            "<strong>Onset:</strong> 2-4 days<br>"
            "<strong>Peak effect:</strong> 4-7 days<br><br>"
            "Mainstay for malignancy-associated hypercalcaemia."
        ),
    },
    {
        "front": (
            "What is cinacalcet, what is its mechanism, "
            "and for which causes of hypercalcaemia is it used?"
        ),
        "back": (
            "<strong>Class:</strong> Calcimimetic agent<br><br>"
            "<strong>Mechanism:</strong> Allosteric activator of the "
            "<strong>calcium-sensing receptor (CaSR)</strong> on parathyroid chief cells "
            "-> increased CaSR sensitivity to Ca2+ -> reduced PTH secretion<br><br>"
            "<strong>Indications:</strong><br>"
            "- Primary hyperparathyroidism (patients unfit for surgery)<br>"
            "- Tertiary hyperparathyroidism in CKD<br>"
            "- Parathyroid carcinoma<br><br>"
            "<em>Not effective for PTHrP-, calcitriol-, or vitamin-D-mediated hypercalcaemia "
            "(CaSR-independent mechanisms).</em>"
        ),
    },
]

MCQ_HYPERCALCAEMIA_DRUGS = [
    {
        "type": "mcq",
        "question": (
            "A 65-year-old woman with known sarcoidosis presents with nausea, confusion and "
            "polyuria. Corrected calcium is 3.4 mmol/L. She is commenced on IV 0.9% saline. "
            "Which additional treatment is most specifically indicated for the underlying "
            "cause of her hypercalcaemia?"
        ),
        "options": [
            "A. IV zoledronate",
            "B. SC calcitonin",
            "C. Oral prednisolone",
            "D. Oral cinacalcet",
            "E. IV furosemide before completing fluid resuscitation",
        ],
        "answer": "C",
        "explanation": (
            "Sarcoidosis causes hypercalcaemia via activated macrophages in granulomata "
            "expressing 1alpha-hydroxylase -> excess calcitriol (1,25-dihydroxyvitamin D) "
            "-> raised intestinal calcium absorption. Prednisolone inhibits macrophage "
            "1alpha-hydroxylase and is the specific treatment. Bisphosphonates and calcitonin "
            "reduce bone resorption but do not address the underlying calcitriol-driven mechanism. "
            "Cinacalcet lowers PTH and is used in hyperparathyroidism. Furosemide before "
            "adequate rehydration is dangerous and contraindicated."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "A 72-year-old man with multiple myeloma has a corrected calcium of 3.6 mmol/L. "
            "He receives 3 litres of IV saline over 6 hours. "
            "Calcium is still 3.3 mmol/L. What is the most appropriate next pharmacological step?"
        ),
        "options": [
            "A. IV furosemide 40 mg to promote calciuresis",
            "B. SC calcitonin 4 IU/kg every 12 h as definitive long-term therapy",
            "C. IV zoledronate 4 mg over 15 minutes",
            "D. Oral cinacalcet 30 mg BD",
            "E. Oral prednisolone 60 mg/day as the only required treatment",
        ],
        "answer": "C",
        "explanation": (
            "After adequate IV fluid rehydration, IV bisphosphonates are the mainstay for "
            "malignancy-associated hypercalcaemia (including myeloma). Zoledronate 4 mg IV "
            "is preferred over pamidronate due to shorter infusion time and equivalent efficacy. "
            "Furosemide (A) can now be considered post-rehydration but bisphosphonates address "
            "the underlying mechanism of osteoclast-mediated bone resorption. Calcitonin (B) has "
            "a bridging role but is not definitive due to tachyphylaxis. Cinacalcet (D) is for "
            "PTH-driven causes. Prednisolone alone (E) is insufficient for myeloma without "
            "bisphosphonates."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "A junior doctor gives IV furosemide 40 mg to a patient with a calcium of "
            "3.1 mmol/L before starting IV fluids. "
            "Repeat calcium 2 hours later is 3.5 mmol/L. "
            "What is the most likely explanation for the worsening hypercalcaemia?"
        ),
        "options": [
            "A. Furosemide directly stimulates PTH release from parathyroid glands",
            "B. Furosemide increases calcitriol production in the kidney",
            "C. Furosemide caused diuresis, leading to haemoconcentration and worsened hypercalcaemia",
            "D. Furosemide blocks calcium-sensing receptors, raising the calcium set-point",
            "E. Furosemide activates osteoclasts via the mevalonate pathway",
        ],
        "answer": "C",
        "explanation": (
            "Furosemide causes loss of water and electrolytes. If given to a dehydrated patient "
            "before IV fluid rehydration, it causes further haemoconcentration — the serum calcium "
            "concentration rises because there is less volume to dilute it. Additionally, reduced "
            "renal perfusion from volume depletion impairs calcium excretion. This is the classic "
            "error of giving furosemide before fluids. The rule is: IV saline first to restore "
            "volume and establish calciuresis via GFR expansion, then furosemide if needed."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "Which of the following correctly describes the timeline of bisphosphonate action "
            "in acute hypercalcaemia and the rationale for using calcitonin concurrently?"
        ),
        "options": [
            "A. Bisphosphonates act within 1 hour; calcitonin is used for its prolonged 7-day effect",
            "B. Bisphosphonates peak in 2-4 hours; calcitonin bridges until oral agents can be started",
            "C. Bisphosphonates onset 2-4 days, peak 4-7 days; calcitonin acts within hours but causes tachyphylaxis, serving as a bridge",
            "D. Bisphosphonates onset 7-10 days; calcitonin is preferred first-line as it has no tachyphylaxis",
            "E. Bisphosphonates and calcitonin have identical onset; combination prevents rebound hypercalcaemia",
        ],
        "answer": "C",
        "explanation": (
            "IV bisphosphonates (zoledronate, pamidronate) have an onset of 2-4 days with peak "
            "effect at 4-7 days due to the time required for osteoclast apoptosis. Calcitonin "
            "acts within hours by directly inhibiting osteoclast function, providing rapid but "
            "temporary calcium lowering. However, tachyphylaxis (receptor downregulation) develops "
            "within 24-48 hours, making calcitonin unsuitable as monotherapy. Combining early "
            "calcitonin with bisphosphonates bridges the gap until bisphosphonates reach full effect."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "A 45-year-old man with a history of tuberculosis is found to have a corrected "
            "calcium of 2.98 mmol/L. PTH is suppressed. 25-OH-vitamin D is normal. "
            "1,25-(OH)2-vitamin D (calcitriol) is markedly elevated. "
            "Which enzyme is responsible and where does it act?"
        ),
        "options": [
            "A. 25-hydroxylase in the liver, converting vitamin D2 to 25-OH-D",
            "B. 1alpha-hydroxylase in the kidney proximal tubule, stimulated by elevated PTH",
            "C. 1alpha-hydroxylase in activated macrophages within granulomata, functioning autonomously",
            "D. 24-hydroxylase in the kidney, converting 25-OH-D to the active form",
            "E. CYP2R1 in the liver, constitutively active in granulomatous disease",
        ],
        "answer": "C",
        "explanation": (
            "In granulomatous diseases (TB, sarcoidosis), activated macrophages express "
            "1alpha-hydroxylase (CYP27B1) autonomously — independent of PTH regulation. "
            "This enzyme converts 25-OH-D to calcitriol (1,25-(OH)2-D) at sites of "
            "granulomatous inflammation. The result is calcitriol-driven hypercalcaemia with "
            "suppressed PTH (from the elevated calcium). Renal 1alpha-hydroxylase (B) is "
            "PTH-dependent and PTH is suppressed here. 24-hydroxylase (D) inactivates vitamin D "
            "metabolites rather than activating them. This is why prednisolone — which inhibits "
            "macrophage 1alpha-hydroxylase — is the specific treatment."
        ),
    },
    {
        "type": "mcq",
        "question": (
            "A patient with end-stage renal disease on haemodialysis develops severe "
            "hypercalcaemia with a corrected calcium of 3.8 mmol/L and is anuric. "
            "Which treatment modality is most appropriate?"
        ),
        "options": [
            "A. IV 0.9% saline 4 L over 12 hours",
            "B. IV furosemide 120 mg to promote renal calcium excretion",
            "C. SC calcitonin as sole definitive therapy",
            "D. Haemodialysis with low-calcium dialysate",
            "E. Oral prednisolone 60 mg/day as first-line treatment",
        ],
        "answer": "D",
        "explanation": (
            "In anuric patients with renal failure, IV fluids (A) will cause fluid overload "
            "without achieving calciuresis (no urine output). Furosemide (B) cannot work without "
            "renal function. Calcitonin (C) provides temporary reduction but tachyphylaxis limits "
            "its utility as sole therapy and it does not remove calcium from the body. "
            "Haemodialysis with a low-calcium dialysate is the definitive acute treatment for "
            "severe refractory hypercalcaemia in anuric/oliguric patients — calcium is directly "
            "removed across the dialysis membrane. Prednisolone (E) is only appropriate for "
            "specific calcitriol/cytokine-mediated causes and would not address this acutely."
        ),
    },
]
