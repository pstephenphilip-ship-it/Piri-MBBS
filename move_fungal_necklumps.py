#!/usr/bin/env python3
"""
1. Move fungal infections section from bottom of Diabetic Complications
   to a new 'Fungal Infections' tab, inserted before 'Other Complications'.
2. Extract Neck Lumps section from Hypothyroidism → new 'Neck Lumps' condition.
"""

with open('/home/user/Piri-MBBS/index.html', 'r') as f:
    c = f.read()

print(f"Starting size: {len(c):,}")

# ─────────────────────────────────────────────────────────────
# TASK 1: Fungal Infections → new tab in Diabetic Complications
# ─────────────────────────────────────────────────────────────

# The fungal section is appended after the tab structure inside
# ENDOCRINOLOGY__Diabetic Complications rich note.
# It has no enclosing <div class="rn-section"> wrapper.

# Find it
FUNGAL_TITLE = 'Fungal Infections in Diabetes Mellitus'
fungal_section_start = c.find('<div class=\\"rn-section-title\\">' + FUNGAL_TITLE)
assert fungal_section_start > 0, "Could not find fungal section-title div"

# There's a \n\n before the section-title
prefix_nn = c.rfind('\\n\\n', 0, fungal_section_start)
# Make sure it's directly before (within a few chars)
assert fungal_section_start - prefix_nn < 5, f"\\n\\n not directly before fungal: gap={fungal_section_start - prefix_nn}"

removal_start = prefix_nn  # include the \n\n

# Find end of the rn-body following the title
body_open = c.find('<div class=\\"rn-body\\">', fungal_section_start)
assert body_open > 0

# Count depth to find closing div of rn-body
i = body_open
depth = 0
body_end = -1
while i < body_open + 300000:
    if c[i:i+4] == '<div':
        depth += 1
    elif c[i:i+6] == '</div>':
        depth -= 1
        if depth == 0:
            body_end = i + 6
            break
    i += 1
assert body_end > 0, "Could not find end of fungal rn-body"

removal_end = body_end
fungal_html_raw = c[fungal_section_start:removal_end]  # the raw escaped HTML

print(f"Fungal section: {fungal_section_start} → {removal_end} ({removal_end - fungal_section_start} chars)")

# Build the new tab pane content (wrap in rn-section)
# We need the content as it appears in the JSON string (escaped)
fungal_pane_content = (
    '<div id=\\"dc-fungal\\" class=\\"tt-pane\\" style=\\"display:none;\\">\\n'
    '<div class=\\"rn-section\\">\\n'
    + fungal_html_raw +
    '\\n</div>\\n</div>'
)

# Find the "Other Complications" tab button to insert before it
OTHER_BTN_MARKER = 'data-pane=\\"dc-other\\"'
other_btn_pos = c.rfind(OTHER_BTN_MARKER, 0, fungal_section_start)
assert other_btn_pos > 0, "Could not find dc-other button"

# Go back to start of this button element (<button)
btn_start = c.rfind('<button', 0, other_btn_pos)
assert btn_start > 0

# Build new Fungal Infections button (same pattern as others, not active)
onclick_fn = (
    'var nav=this.closest(\'.tt-nav\');'
    'nav.querySelectorAll(\'.tt-btn\').forEach(function(b){b.classList.remove(\'tt-act\')});'
    'this.classList.add(\'tt-act\');'
    'var wrap=this.closest(\'.tt-wrap\');'
    'wrap.querySelectorAll(\'.tt-pane\').forEach(function(p){p.style.display=\'none\'});'
    'wrap.querySelector(\'#\'+this.dataset.pane).style.display=\'block\';'
)
fungal_btn = (
    f'<button class=\\"tt-btn\\" data-pane=\\"dc-fungal\\" '
    f'onclick=\\"{onclick_fn}\\">Fungal Infections</button>\\n    '
)

# Insert button before dc-other button
c = c[:btn_start] + fungal_btn + c[btn_start:]
print(f"Inserted Fungal Infections tab button before Other Complications")

# Now find the dc-other pane to insert the fungal pane before it
# Position shifted by the button insert length
other_pane_marker = 'id=\\"dc-other\\"'
other_pane_pos = c.find(other_pane_marker, other_btn_pos)
assert other_pane_pos > 0

# Go back to <div
pane_div_start = c.rfind('<div', 0, other_pane_pos)
assert pane_div_start > 0

# Insert fungal pane before dc-other pane
c = c[:pane_div_start] + fungal_pane_content + '\\n' + c[pane_div_start:]
print(f"Inserted Fungal Infections tab pane before Other Complications pane")

# Now remove the free-floating fungal section at the bottom
# The positions have shifted; re-find
remove_marker_start = c.find('\\n\\n<div class=\\"rn-section-title\\">' + FUNGAL_TITLE)
assert remove_marker_start > 0, "Could not find free-floating fungal section to remove"

# Find body_end again
body_open2 = c.find('<div class=\\"rn-body\\">', remove_marker_start)
i = body_open2
depth = 0
body_end2 = -1
while i < body_open2 + 300000:
    if c[i:i+4] == '<div':
        depth += 1
    elif c[i:i+6] == '</div>':
        depth -= 1
        if depth == 0:
            body_end2 = i + 6
            break
    i += 1
assert body_end2 > 0

c = c[:remove_marker_start] + c[body_end2:]
print(f"Removed free-floating fungal section from bottom of Diabetic Complications")


# ─────────────────────────────────────────────────────────────
# TASK 2: Extract Neck Lumps from Hypothyroidism
# ─────────────────────────────────────────────────────────────

NECK_TITLE = 'Euthyroid Goitre and Approach to the Neck Lump'
neck_section_marker = '<div class=\\"rn-section-title\\">' + NECK_TITLE

neck_start = c.find(neck_section_marker)
assert neck_start > 0, "Could not find Neck Lump section in Hypothyroidism"

# Check it's inside ENDOCRINOLOGY__Hypothyroidism
hypo_key_pos = c.rfind('ENDOCRINOLOGY__Hypothyroidism', 0, neck_start)
assert hypo_key_pos > 0, "Neck Lump section is not inside Hypothyroidism"

# Find end of the rn-body that follows
body_open3 = c.find('<div class=\\"rn-body\\">', neck_start)
assert body_open3 > 0

i = body_open3
depth = 0
body_end3 = -1
while i < body_open3 + 300000:
    if c[i:i+4] == '<div':
        depth += 1
    elif c[i:i+6] == '</div>':
        depth -= 1
        if depth == 0:
            body_end3 = i + 6
            break
    i += 1
assert body_end3 > 0

# Include the \n\n before the section if present
prefix_neck = c.rfind('\\n\\n', 0, neck_start)
neck_removal_start = prefix_neck if (neck_start - prefix_neck < 5) else neck_start

neck_html_raw = c[neck_start:body_end3]
print(f"Neck Lumps section: {neck_start} → {body_end3} ({body_end3 - neck_start} chars)")

# Remove from Hypothyroidism
c = c[:neck_removal_start] + c[body_end3:]
print("Removed Neck Lumps section from Hypothyroidism")

# Build rich note for Neck Lumps condition
# Use the extracted content wrapped in a proper rich-note div
neck_note_html = (
    '<div class=\\"rich-note\\">\\n'
    '<div class=\\"rn-section\\">\\n  '
    + neck_html_raw +
    '\\n</div>\\n</div>'
)

# Build FC stub
neck_fc_key = 'conditions__ENDOCRINOLOGY__Neck Lumps'
neck_fc_stub = (
    f'"{neck_fc_key}":[{{"front":"Neck Lumps — Approach","back":'
    f'"Thyroid vs non-thyroid lumps: thyroid lumps move with swallowing (tethered to trachea). '
    f'Non-thyroid neck lumps: lymph nodes (most common), cysts (thyroglossal, branchial, cystic hygroma), '
    f'salivary gland pathology. Assess: site, size, consistency, mobility, transillumination."}},'
    f'{{"front":"Goitre — Investigation Approach","back":'
    f'"1. TFTs (euthyroid vs hyper/hypothyroid) | 2. Thyroid USS (nodule characterisation) | '
    f'3. FNA if USS suspicious | 4. Radionuclide scan if functional nodule | 5. CT/MRI if retrosternal"}},'
    f'{{"front":"Solitary thyroid nodule — red flags","back":'
    f'"Male sex, age <20 or >70, rapid growth, hard/fixed, hoarseness (RLN invasion), '
    f'lymphadenopathy, prior neck irradiation → urgent FNA/USS"}}]'
)

neck_mcq_key = neck_fc_key + '_mcq'
neck_mcq_stub = (
    f'"{neck_mcq_key}":[{{"type":"mcq",'
    f'"question":"A patient presents with a neck lump that moves on swallowing but not on tongue protrusion. What is the most likely diagnosis?",'
    f'"options":["A. Thyroid nodule","B. Thyroglossal cyst","C. Branchial cyst","D. Lymph node","E. Submandibular salivary gland"],'
    f'"answer":0,'
    f'"explanation":"A neck lump that moves on swallowing is tethered to the trachea/larynx → thyroid origin. A thyroglossal cyst moves on BOTH swallowing AND tongue protrusion (tethered to hyoid). Branchial cysts are lateral neck, do not move. Lymph nodes are mobile and do not move with swallowing."}}]'
)

# Add to PRESET_FC
fc_var_end = len(c) - 1
# Find end of PRESET_FC variable
fc_pos = c.find('const PRESET_FC=')
i = c.index('{', fc_pos)
depth = 0
while i < len(c):
    if c[i] == '{': depth += 1
    elif c[i] == '}':
        depth -= 1
        if depth == 0:
            fc_var_end = i
            break
    i += 1

c = c[:fc_var_end] + ',' + neck_fc_stub + ',' + neck_mcq_stub + c[fc_var_end:]
print("Added Neck Lumps FC and MCQ stubs to PRESET_FC")

# Add to RICH_NOTES
neck_note_key = 'ENDOCRINOLOGY__Neck Lumps'
note_pos = c.find('const RICH_NOTES=')
i = c.index('{', note_pos)
depth = 0
note_end = -1
while i < len(c):
    if c[i] == '{': depth += 1
    elif c[i] == '}':
        depth -= 1
        if depth == 0:
            note_end = i
            break
    i += 1

note_insert = f',"{neck_note_key}":"{neck_note_html}"'
c = c[:note_end] + note_insert + c[note_end:]
print("Added Neck Lumps rich note to RICH_NOTES")

# Add Neck Lumps to ENDOCRINOLOGY conditions list in CONDITIONS_SYSTEMS
# Insert before last condition or at end
# Find ENDOCRINOLOGY block
endo_pos = c.find('"ENDOCRINOLOGY":')
endo_cond_list_start = c.find('"conditions": [', endo_pos)
if endo_cond_list_start == -1:
    endo_cond_list_start = c.find('"conditions":[', endo_pos)
# Find end of this array
i = c.index('[', endo_cond_list_start)
depth = 0
endo_list_end = -1
while i < len(c):
    if c[i] == '[': depth += 1
    elif c[i] == ']':
        depth -= 1
        if depth == 0:
            endo_list_end = i
            break
    i += 1

# Insert "Neck Lumps" before closing ]
# Find the last condition to insert after it
# Just insert before the ]
neck_cond_insert = '\n            "Neck Lumps"'
c = c[:endo_list_end] + neck_cond_insert + '\n            ' + c[endo_list_end:]
print("Added 'Neck Lumps' to ENDOCRINOLOGY conditions list")

# ─────────────────────────────────────────────────────────────
# Write output
# ─────────────────────────────────────────────────────────────
with open('/home/user/Piri-MBBS/index.html', 'w') as f:
    f.write(c)

print(f"\nDone! Final size: {len(c):,}")
