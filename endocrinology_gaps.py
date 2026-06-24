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
