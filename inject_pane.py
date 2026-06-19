import json, re

with open('/home/user/Piri-MBBS/index.html', encoding='utf-8') as f:
    html = f.read()

# Extract RICH_NOTES JSON
rn_start = html.index('const RICH_NOTES=') + len('const RICH_NOTES=')
depth = 0; i = rn_start
while i < len(html):
    if html[i] == '{': depth += 1
    elif html[i] == '}':
        depth -= 1
        if depth == 0: rn_end = i + 1; break
    i += 1

notes = json.loads(html[rn_start:rn_end])
note_key = 'CARDIOVASCULAR__Tachycardia Overview'
note_html = notes[note_key]

new_inner = r"""<!-- Section 0: Opening Banner -->
<div class="rn-section">
  <div class="rn-section-title" style="color:#1E2640">Irregular Narrow-Complex Tachycardias — Defining Features</div>
  <div class="rn-body">
    <div style="background:#EBF2FF;border-left:4px solid #3B7DD8;border-radius:8px;padding:14px 16px;margin-bottom:16px;color:#1E2640;font-weight:600;font-size:0.97em;">
      All three share: <span style="color:#3B7DD8">narrow QRS</span> + <span style="color:#3B7DD8">irregularly irregular rhythm</span> + <span style="color:#3B7DD8">no consistent P–QRS relationship</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:4px;">
      <div style="background:#F4F6FB;border-radius:8px;padding:12px 14px;border:1px solid #E2E6F0;">
        <div style="font-weight:700;color:#3B7DD8;margin-bottom:6px;font-size:0.97em;">Atrial Fibrillation (AF)</div>
        <div style="color:#1E2640;font-size:0.92em;line-height:1.6;">No P waves · chaotic fibrillatory baseline · completely irregular R-R intervals</div>
      </div>
      <div style="background:#F4F6FB;border-radius:8px;padding:12px 14px;border:1px solid #E2E6F0;">
        <div style="font-weight:700;color:#3B7DD8;margin-bottom:6px;font-size:0.97em;">Variable-Block Flutter</div>
        <div style="color:#1E2640;font-size:0.92em;line-height:1.6;">Sawtooth waves ~300 bpm · irregular ventricular response due to varying AV block</div>
      </div>
      <div style="background:#F4F6FB;border-radius:8px;padding:12px 14px;border:1px solid #E2E6F0;">
        <div style="font-weight:700;color:#3B7DD8;margin-bottom:6px;font-size:0.97em;">MAT</div>
        <div style="color:#1E2640;font-size:0.92em;line-height:1.6;">≥3 distinct P-wave morphologies · irregular · PR intervals vary</div>
      </div>
    </div>
  </div>
</div>

<!-- Section 1: AF -->
<div class="rn-section">
  <div class="rn-section-title" style="color:#1E2640">2A — Atrial Fibrillation</div>
  <div class="rn-body">

    <!-- Definition & Mechanism -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:6px;font-size:0.97em;">Definition &amp; Mechanism</div>
    <div style="color:#1E2640;font-size:0.93em;line-height:1.7;margin-bottom:14px;">
      Disorganised atrial electrical activity arising from multiple chaotic re-entry wavelets — no coordinated atrial contraction occurs. Blood stagnates in the <strong>left atrial appendage (LAA)</strong> → thrombus formation → stroke / TIA. Atrial rate: <strong>350–600 bpm</strong>; ventricular rate: variable (AV node acts as a rate-limiting filter/gatekeeper).
    </div>

    <!-- Classification -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:8px;font-size:0.97em;">Classification</div>
    <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:8px;">
      <div style="background:#EBF2FF;border-radius:20px;padding:6px 14px;font-size:0.88em;color:#1E2640;border:1px solid #3B7DD8;"><strong>Paroxysmal</strong> — self-terminating &lt;7 days (often &lt;48h)</div>
      <div style="background:#EBF2FF;border-radius:20px;padding:6px 14px;font-size:0.88em;color:#1E2640;border:1px solid #3B7DD8;"><strong>Persistent</strong> — &gt;7 days, requires cardioversion</div>
      <div style="background:#EBF2FF;border-radius:20px;padding:6px 14px;font-size:0.88em;color:#1E2640;border:1px solid #3B7DD8;"><strong>Long-standing persistent</strong> — &gt;12 months, still attempting rhythm control</div>
      <div style="background:#EBF2FF;border-radius:20px;padding:6px 14px;font-size:0.88em;color:#1E2640;border:1px solid #3B7DD8;"><strong>Permanent</strong> — cardioversion abandoned; rate control only</div>
    </div>
    <div style="background:#F4F6FB;border-radius:8px;padding:10px 14px;color:#1E2640;font-size:0.91em;margin-bottom:14px;border:1px solid #E2E6F0;">
      <strong>Valvular AF</strong> (mitral stenosis or mechanical heart valve) → must use <strong>warfarin</strong> (not DOAC). All other AF = non-valvular → DOAC preferred.
    </div>

    <!-- Causes (SMITH) -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:8px;font-size:0.97em;">Causes — SMITH Mnemonic</div>
    <div style="background:#F4F6FB;border-radius:10px;padding:14px 16px;margin-bottom:8px;border:1px solid #E2E6F0;">
      <div style="display:grid;grid-template-columns:36px 1fr;gap:6px 10px;align-items:start;">
        <div style="font-size:1.3em;font-weight:800;color:#3B7DD8;line-height:1.2;">S</div>
        <div style="color:#1E2640;font-size:0.93em;padding-top:2px;"><strong>Sepsis</strong> / Surgery / Sleep apnoea</div>
        <div style="font-size:1.3em;font-weight:800;color:#3B7DD8;line-height:1.2;">M</div>
        <div style="color:#1E2640;font-size:0.93em;padding-top:2px;"><strong>Mitral valve disease</strong> (MS, MR)</div>
        <div style="font-size:1.3em;font-weight:800;color:#3B7DD8;line-height:1.2;">I</div>
        <div style="color:#1E2640;font-size:0.93em;padding-top:2px;"><strong>IHD / MI / Inflammation</strong> (pericarditis, myocarditis)</div>
        <div style="font-size:1.3em;font-weight:800;color:#3B7DD8;line-height:1.2;">T</div>
        <div style="color:#1E2640;font-size:0.93em;padding-top:2px;"><strong>Thyroid</strong> — hyperthyroidism</div>
        <div style="font-size:1.3em;font-weight:800;color:#3B7DD8;line-height:1.2;">H</div>
        <div style="color:#1E2640;font-size:0.93em;padding-top:2px;"><strong>Hypertension</strong> — most common modifiable cause</div>
      </div>
    </div>
    <div style="color:#1E2640;font-size:0.91em;margin-bottom:14px;line-height:1.6;">
      Also: Alcohol (holiday heart), PE, COPD/pneumonia, obesity, caffeine (minor), <em>lone AF</em> (idiopathic — young patients with no structural disease)
    </div>

    <!-- ECG Features -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:8px;font-size:0.97em;">ECG Features</div>
    <div style="background:#EBF2FF;border-radius:10px;padding:14px 16px;margin-bottom:14px;border:1px solid #3B7DD8;">
      <ul style="margin:0;padding-left:18px;color:#1E2640;font-size:0.93em;line-height:1.8;">
        <li><strong>Irregularly irregular</strong> rhythm — no two R-R intervals equal</li>
        <li><strong>Absent P waves</strong> — replaced by fibrillatory f-waves (best seen in V1 and lead II)</li>
        <li><strong>Narrow QRS</strong> — unless BBB or WPW pre-excitation coexists</li>
        <li>Ventricular rate: <strong>100–160 bpm</strong> untreated</li>
      </ul>
    </div>

    <!-- Acute Management -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:8px;font-size:0.97em;">Acute Management</div>
    <div style="background:#fff3cd;border-left:4px solid #e6a817;border-radius:8px;padding:10px 14px;margin-bottom:10px;color:#1E2640;font-size:0.91em;">
      <strong>Haemodynamically unstable?</strong> → Immediate <strong>synchronised DC cardioversion</strong> regardless of onset time. Do not delay for anticoagulation.
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:14px;">
      <div style="background:#F4F6FB;border-radius:10px;padding:14px;border:1px solid #E2E6F0;">
        <div style="font-weight:700;color:#3B7DD8;margin-bottom:8px;font-size:0.94em;">Rate Control</div>
        <ul style="margin:0;padding-left:16px;color:#1E2640;font-size:0.91em;line-height:1.7;">
          <li><strong>Beta-blockers</strong> (bisoprolol, metoprolol) — first-line</li>
          <li><strong>CCB</strong> (diltiazem, verapamil) — if BB contraindicated</li>
          <li><strong>Digoxin</strong> — sedentary patients or HF</li>
          <li>Target: <strong>HR &lt;110 bpm</strong> at rest (lenient control)</li>
        </ul>
      </div>
      <div style="background:#F4F6FB;border-radius:10px;padding:14px;border:1px solid #E2E6F0;">
        <div style="font-weight:700;color:#3B7DD8;margin-bottom:8px;font-size:0.94em;">Rhythm Control</div>
        <ul style="margin:0;padding-left:16px;color:#1E2640;font-size:0.91em;line-height:1.7;">
          <li><strong>&lt;48h onset</strong> OR anticoagulated ≥3 weeks → can cardiovert directly</li>
          <li><strong>&gt;48h or unknown</strong> → TOE to exclude LAA thrombus OR anticoagulate ≥3 weeks first, then 4 weeks post-cardioversion</li>
          <li>Chemical: <strong>flecainide</strong> (no structural disease) · <strong>amiodarone</strong> (structural disease / HF)</li>
          <li>Electrical: synchronised DC cardioversion</li>
        </ul>
      </div>
    </div>

    <!-- Anticoagulation -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:8px;font-size:0.97em;">Anticoagulation — CHA₂DS₂-VASc Score</div>
    <div style="background:#F4F6FB;border-radius:10px;padding:14px 16px;margin-bottom:10px;border:1px solid #E2E6F0;">
      <table style="width:100%;border-collapse:collapse;font-size:0.9em;color:#1E2640;">
        <thead>
          <tr style="background:#EBF2FF;">
            <th style="padding:6px 10px;text-align:left;border-bottom:2px solid #3B7DD8;color:#1E2640;">Letter</th>
            <th style="padding:6px 10px;text-align:left;border-bottom:2px solid #3B7DD8;color:#1E2640;">Risk Factor</th>
            <th style="padding:6px 10px;text-align:center;border-bottom:2px solid #3B7DD8;color:#1E2640;">Points</th>
          </tr>
        </thead>
        <tbody>
          <tr><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;"><strong>C</strong></td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;">Congestive Heart Failure</td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;text-align:center;">1</td></tr>
          <tr><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;"><strong>H</strong></td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;">Hypertension</td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;text-align:center;">1</td></tr>
          <tr><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;"><strong>A₂</strong></td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;">Age ≥75 years</td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;text-align:center;"><strong>2</strong></td></tr>
          <tr><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;"><strong>D</strong></td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;">Diabetes Mellitus</td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;text-align:center;">1</td></tr>
          <tr><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;"><strong>S₂</strong></td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;">Stroke / TIA / Thromboembolism</td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;text-align:center;"><strong>2</strong></td></tr>
          <tr><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;"><strong>V</strong></td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;">Vascular disease (MI, PAD, aortic plaque)</td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;text-align:center;">1</td></tr>
          <tr><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;"><strong>A</strong></td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;">Age 65–74 years</td><td style="padding:5px 10px;border-bottom:1px solid #E2E6F0;text-align:center;">1</td></tr>
          <tr><td style="padding:5px 10px;"><strong>Sc</strong></td><td style="padding:5px 10px;">Sex category female</td><td style="padding:5px 10px;text-align:center;">1</td></tr>
        </tbody>
      </table>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-bottom:10px;">
      <div style="background:#d4edda;border-radius:8px;padding:10px 12px;text-align:center;border:1px solid #28a745;">
        <div style="font-weight:700;color:#1E2640;font-size:0.88em;">Score ≥2 (men) / ≥3 (women)</div>
        <div style="color:#1E2640;font-size:0.85em;margin-top:4px;">Anticoagulate</div>
      </div>
      <div style="background:#fff3cd;border-radius:8px;padding:10px 12px;text-align:center;border:1px solid #e6a817;">
        <div style="font-weight:700;color:#1E2640;font-size:0.88em;">Score 1 (men) / 2 (women)</div>
        <div style="color:#1E2640;font-size:0.85em;margin-top:4px;">Consider anticoagulation</div>
      </div>
      <div style="background:#f8d7da;border-radius:8px;padding:10px 12px;text-align:center;border:1px solid #dc3545;">
        <div style="font-weight:700;color:#1E2640;font-size:0.88em;">Score 0 (men) / 1 (women)</div>
        <div style="color:#1E2640;font-size:0.85em;margin-top:4px;">No anticoagulation</div>
      </div>
    </div>
    <div style="background:#F4F6FB;border-radius:8px;padding:10px 14px;margin-bottom:10px;color:#1E2640;font-size:0.91em;border:1px solid #E2E6F0;">
      <strong>Choice of anticoagulant:</strong> DOAC (apixaban, rivaroxaban, edoxaban, dabigatran) preferred for non-valvular AF. Warfarin (VKA) mandatory for valvular AF (mechanical valve or moderate-severe MS).
    </div>
    <div style="background:#F4F6FB;border-radius:8px;padding:10px 14px;margin-bottom:14px;color:#1E2640;font-size:0.91em;border:1px solid #E2E6F0;">
      <strong>ORBIT bleeding risk score</strong> — key factors: <strong>O</strong>lder age ≥75 · <strong>R</strong>educed haemoglobin/haematocrit (anaemia) · <strong>B</strong>leeding history · <strong>I</strong>NR lability · <strong>T</strong>reatment with antiplatelets/NSAIDs. Use to weigh bleeding vs. stroke risk before anticoagulating.
    </div>

    <!-- Cross-reference -->
    <div style="background:#EBF2FF;border-radius:8px;padding:10px 14px;color:#1E2640;font-size:0.91em;border-left:3px solid #3B7DD8;">
      <strong>Cross-reference:</strong> Chronic AF management — long-term rate/rhythm strategy, pill-in-pocket flecainide, catheter ablation, follow-up → see <em>standalone AF note</em>
    </div>

  </div>
</div>

<!-- Section 2: Atrial Flutter Variable Block -->
<div class="rn-section">
  <div class="rn-section-title" style="color:#1E2640">2B — Atrial Flutter with Variable Block</div>
  <div class="rn-body">

    <div style="font-weight:700;color:#1E2640;margin-bottom:6px;font-size:0.97em;">Mechanism</div>
    <div style="color:#1E2640;font-size:0.93em;line-height:1.7;margin-bottom:14px;">
      Macro re-entry circuit rotating around the <strong>tricuspid annulus</strong>. The <strong>cavotricuspid isthmus (CTI)</strong> is the critical slow conduction zone. Atrial rate: ~300 bpm. When AV conduction is variable, ventricular rate is irregular — distinguishing this from regular flutter (fixed 2:1 → see §3 Regular Narrow pane).
    </div>

    <!-- ECG Features -->
    <div style="background:#EBF2FF;border-radius:10px;padding:14px 16px;margin-bottom:14px;border:1px solid #3B7DD8;">
      <div style="font-weight:700;color:#1E2640;margin-bottom:6px;font-size:0.94em;">ECG Features</div>
      <ul style="margin:0;padding-left:18px;color:#1E2640;font-size:0.93em;line-height:1.8;">
        <li><strong>Sawtooth flutter waves</strong> — best seen in II, III, aVF (inverted) and V1</li>
        <li>No isoelectric baseline between flutter waves</li>
        <li>Variable R-R intervals (irregular ventricular response)</li>
        <li>Narrow QRS (unless aberrant conduction)</li>
      </ul>
    </div>

    <!-- Management -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:8px;font-size:0.97em;">Management</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:12px;">
      <div style="background:#F4F6FB;border-radius:10px;padding:12px 14px;border:1px solid #E2E6F0;">
        <div style="font-weight:700;color:#3B7DD8;margin-bottom:6px;font-size:0.93em;">Acute Rate/Rhythm Control</div>
        <ul style="margin:0;padding-left:16px;color:#1E2640;font-size:0.91em;line-height:1.7;">
          <li>Rate control: beta-blockers, CCB, digoxin (same as AF)</li>
          <li>Anticoagulation: same <strong>CHA₂DS₂-VASc</strong> thresholds as AF</li>
          <li>DC cardioversion: often <strong>more responsive</strong> than AF — lower energy (~50–100J)</li>
        </ul>
      </div>
      <div style="background:#F4F6FB;border-radius:10px;padding:12px 14px;border:1px solid #E2E6F0;">
        <div style="font-weight:700;color:#3B7DD8;margin-bottom:6px;font-size:0.93em;">Definitive Treatment</div>
        <ul style="margin:0;padding-left:16px;color:#1E2640;font-size:0.91em;line-height:1.7;">
          <li><strong>CTI ablation</strong> — curative in ~95% of typical flutter</li>
          <li>First-line for recurrent or symptomatic flutter</li>
          <li>Preferred over long-term antiarrhythmics</li>
        </ul>
      </div>
    </div>
    <div style="background:#EBF2FF;border-radius:8px;padding:10px 14px;color:#1E2640;font-size:0.91em;border-left:3px solid #3B7DD8;">
      <strong>Cross-reference:</strong> Fixed 2:1 flutter (regular rate ~150 bpm) → §3 Regular Narrow pane
    </div>

  </div>
</div>

<!-- Section 3: MAT -->
<div class="rn-section">
  <div class="rn-section-title" style="color:#1E2640">2C — Multifocal Atrial Tachycardia (MAT)</div>
  <div class="rn-body">

    <div style="color:#1E2640;font-size:0.93em;line-height:1.7;margin-bottom:14px;">
      <strong>Definition:</strong> ≥3 distinct P-wave morphologies, varying PR intervals, irregular rhythm, rate &gt;100 bpm. Mechanism: multiple <em>ectopic atrial foci</em> firing chaotically — <strong>NOT re-entry</strong> (important: cardioversion is therefore ineffective).
    </div>

    <!-- Classic Cause -->
    <div style="background:#fff3cd;border-left:4px solid #e6a817;border-radius:8px;padding:10px 14px;margin-bottom:12px;color:#1E2640;font-size:0.92em;">
      <strong>Classic cause: COPD</strong> (hypoxia + hypercapnia + raised catecholamines). Also: theophylline toxicity, hypomagnesaemia, sepsis, pulmonary hypertension.
    </div>

    <!-- ECG -->
    <div style="background:#EBF2FF;border-radius:10px;padding:12px 16px;margin-bottom:14px;border:1px solid #3B7DD8;">
      <div style="font-weight:700;color:#1E2640;margin-bottom:6px;font-size:0.94em;">ECG Features</div>
      <ul style="margin:0;padding-left:18px;color:#1E2640;font-size:0.93em;line-height:1.8;">
        <li>At least <strong>3 clearly different P-wave morphologies</strong> visible in the same lead</li>
        <li>Irregular rhythm with varying PR intervals</li>
        <li>Narrow QRS complexes</li>
        <li>Rate &gt;100 bpm (distinguishes from wandering atrial pacemaker, which is slower)</li>
      </ul>
    </div>

    <!-- Management -->
    <div style="font-weight:700;color:#1E2640;margin-bottom:8px;font-size:0.97em;">Management</div>
    <div style="background:#F4F6FB;border-radius:10px;padding:14px 16px;border:1px solid #E2E6F0;">
      <ul style="margin:0;padding-left:18px;color:#1E2640;font-size:0.93em;line-height:1.8;">
        <li><strong>Treat the underlying cause</strong> — oxygen, bronchodilators, correct hypomagnesaemia, treat sepsis</li>
        <li>Rate control: <strong>CCB (verapamil/diltiazem)</strong> — avoid beta-blockers if bronchospasm present</li>
        <li><strong>Cardioversion is INEFFECTIVE</strong> — do not attempt (not a re-entrant rhythm)</li>
        <li>No routine anticoagulation — MAT does not carry the same LAA thrombus risk as AF</li>
      </ul>
    </div>

  </div>
</div>

<!-- Section 4: Shared Principle -->
<div class="rn-section">
  <div class="rn-section-title" style="color:#1E2640">Shared Management Principles</div>
  <div class="rn-body">
    <div style="background:#EBF2FF;border-radius:10px;padding:16px 18px;border:1px solid #3B7DD8;">
      <div style="font-weight:700;color:#3B7DD8;margin-bottom:10px;font-size:0.97em;">Key Concepts Across All Three Rhythms</div>
      <ul style="margin:0;padding-left:18px;color:#1E2640;font-size:0.93em;line-height:1.9;">
        <li>The <strong>AV node is a bystander</strong> — not part of the sustaining circuit in AF, flutter, or MAT</li>
        <li>Block the AV node to <strong>control ventricular rate</strong>, not to terminate the arrhythmia</li>
        <li><strong>Anticoagulation</strong>: applies to AF and atrial flutter (same stroke risk → same CHA₂DS₂-VASc thresholds). Not routinely for MAT.</li>
        <li><strong>Rate control target</strong>: HR &lt;110 bpm at rest (lenient rate control). Stricter target &lt;80 bpm only if persistently symptomatic at rest.</li>
        <li>In AF and flutter, the longer the arrhythmia persists, the harder it is to cardiovert ("AF begets AF" — electrical remodelling)</li>
      </ul>
    </div>
  </div>
</div>"""

# Find and replace the tt-irr-narrow pane content
# The pane looks like: <div class="tt-pane" id="tt-irr-narrow" style="display:none">...CONTENT...</div>
# We need to find the opening tag, then find the matching closing </div>

pane_open_pattern = r'<div class="tt-pane" id="tt-irr-narrow"[^>]*>'
m = re.search(pane_open_pattern, note_html)
if not m:
    print("ERROR: tt-irr-narrow pane not found!")
    exit(1)

pane_start = m.start()
content_start = m.end()

# Find the matching closing </div> by counting nesting
depth = 1
i = content_start
while i < len(note_html) and depth > 0:
    if note_html[i:i+4] == '<div':
        depth += 1
        i += 4
    elif note_html[i:i+6] == '</div>':
        depth -= 1
        if depth == 0:
            content_end = i
            break
        i += 6
    else:
        i += 1

pane_end = content_end + 6  # include </div>

# Build new pane
opening_tag = note_html[pane_start:content_start]
new_pane = opening_tag + new_inner + '</div>'

# Replace in note_html
new_note_html = note_html[:pane_start] + new_pane + note_html[pane_end:]

# Update notes dict
notes[note_key] = new_note_html

# Serialize back to JSON
new_json = json.dumps(notes, ensure_ascii=False)

# Replace in html
new_html = html[:rn_start] + new_json + html[rn_end:]

with open('/home/user/Piri-MBBS/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)

print("Done! File written successfully.")
print(f"Note HTML length before: {len(note_html)}, after: {len(new_note_html)}")
