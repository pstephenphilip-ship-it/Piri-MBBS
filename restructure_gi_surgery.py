#!/usr/bin/env python3
"""
Restructure GASTROENTEROLOGY / HEPATOLOGY and SURGERY (GENERAL) into 5 new systems.
Also moves Haemochromatosis from HAEMATOLOGY to LIVER.
"""

import re

HTML_FILE = "/home/user/Piri-MBBS/index.html"

# ─────────────────────────────────────────────
# 1. Define the new systems and their conditions
# ─────────────────────────────────────────────

NEW_SYSTEMS = {
    "UPPER GI": {
        "icon": "🫁",  # will update below
        "conditions": [
            "Achalasia",
            "GORD / Dyspepsia",
            "PUD and H. Pylori",
            "GI Bleeding (upper & lower)",
            "Oesophageal Cancer",
            "Gastric Cancer",
        ]
    },
    "LOWER GI & BOWEL": {
        "icon": "🦠",
        "conditions": [
            "Coeliac Disease",
            "IBS",
            "IBD — Crohn's Disease",
            "IBD — Ulcerative Colitis",
            "C. Difficile Infection",
            "Diverticular Disease",
            "Acute Diverticulitis",
            "Colorectal Cancer",
            "Intestinal Ischaemia",
            "Bowel Obstruction (small & large)",
            "Stomas (types & complications)",
        ]
    },
    "HEPATOBILIARY & PANCREATIC": {
        "icon": "🫀",
        "conditions": [
            "Biliary Colic & Gallstone Disease",
            "Acute Cholecystitis",
            "Ascending Cholangitis",
            "Cholangiocarcinoma",
            "Acute Pancreatitis",
            "Chronic Pancreatitis",
            "Pancreatic Cancer",
        ]
    },
    "LIVER": {
        "icon": "🫁",
        "conditions": [
            "Alcoholic Liver Disease",
            "NAFLD",
            "Liver Cirrhosis",
            "Acute Hepatitis / Acute Liver Failure",
            "Autoimmune Hepatitis",
            "Primary Biliary Cholangitis",
            "Primary Sclerosing Cholangitis",
            "Jaundice",
            "Haemochromatosis",
        ]
    },
    "ACUTE ABDOMEN & SURGICAL PRINCIPLES": {
        "icon": "🔪",
        "conditions": [
            "Acute Abdomen",
            "Acute Appendicitis",
            "Abdominal Hernias",
            "Pre-operative Assessment",
            "Post-operative Complications",
            "Fluid Therapy",
            "Shock (types)",
            "Nutrition (malnutrition, feeding routes)",
            "Analgesia / Pain Ladder",
            "Local Anaesthetics",
        ]
    },
}

# ─────────────────────────────────────────────
# 2. Mapping: (old_system, old_condition) → (new_system, new_condition)
# ─────────────────────────────────────────────

GASTRO = "GASTROENTEROLOGY / HEPATOLOGY"
SURGERY = "SURGERY (GENERAL)"
HAEM = "HAEMATOLOGY"

MOVES = [
    # GASTRO → UPPER GI
    (GASTRO, "GORD / Dyspepsia",                        "UPPER GI",                             "GORD / Dyspepsia"),
    (GASTRO, "Peptic Ulcer Disease",                     "UPPER GI",                             "PUD and H. Pylori"),
    (GASTRO, "GI Bleeding (upper & lower)",              "UPPER GI",                             "GI Bleeding (upper & lower)"),

    # GASTRO → LOWER GI & BOWEL
    (GASTRO, "Coeliac Disease",                          "LOWER GI & BOWEL",                     "Coeliac Disease"),
    (GASTRO, "IBS",                                      "LOWER GI & BOWEL",                     "IBS"),
    (GASTRO, "IBD — Crohn's Disease",                    "LOWER GI & BOWEL",                     "IBD — Crohn's Disease"),
    (GASTRO, "IBD — Ulcerative Colitis",                 "LOWER GI & BOWEL",                     "IBD — Ulcerative Colitis"),
    (GASTRO, "C. Difficile Infection",                   "LOWER GI & BOWEL",                     "C. Difficile Infection"),
    (GASTRO, "Diverticular Disease",                     "LOWER GI & BOWEL",                     "Diverticular Disease"),
    (GASTRO, "Intestinal Ischaemia",                     "LOWER GI & BOWEL",                     "Intestinal Ischaemia"),

    # GASTRO → LIVER
    (GASTRO, "Alcoholic Liver Disease",                  "LIVER",                                "Alcoholic Liver Disease"),
    (GASTRO, "Liver Cirrhosis",                          "LIVER",                                "Liver Cirrhosis"),
    (GASTRO, "Acute Hepatitis / Acute Liver Failure",    "LIVER",                                "Acute Hepatitis / Acute Liver Failure"),
    (GASTRO, "Autoimmune Hepatitis",                     "LIVER",                                "Autoimmune Hepatitis"),
    (GASTRO, "Primary Biliary Cholangitis",               "LIVER",                                "Primary Biliary Cholangitis"),
    (GASTRO, "Primary Sclerosing Cholangitis",            "LIVER",                                "Primary Sclerosing Cholangitis"),
    (GASTRO, "Jaundice",                                 "LIVER",                                "Jaundice"),

    # GASTRO → ACUTE ABDOMEN & SURGICAL PRINCIPLES
    (GASTRO, "Nutrition (malnutrition, feeding routes)", "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Nutrition (malnutrition, feeding routes)"),

    # SURGERY → UPPER GI
    (SURGERY, "Oesophageal Cancer",                      "UPPER GI",                             "Oesophageal Cancer"),
    (SURGERY, "Gastric Cancer",                          "UPPER GI",                             "Gastric Cancer"),

    # SURGERY → LOWER GI & BOWEL
    (SURGERY, "Acute Diverticulitis",                    "LOWER GI & BOWEL",                     "Acute Diverticulitis"),
    (SURGERY, "Colorectal Cancer",                       "LOWER GI & BOWEL",                     "Colorectal Cancer"),
    (SURGERY, "Bowel Obstruction (small & large)",       "LOWER GI & BOWEL",                     "Bowel Obstruction (small & large)"),
    (SURGERY, "Stomas (types & complications)",          "LOWER GI & BOWEL",                     "Stomas (types & complications)"),

    # SURGERY → HEPATOBILIARY & PANCREATIC
    # "Acute Cholecystitis / Biliary Colic" split: existing data → "Acute Cholecystitis"
    (SURGERY, "Acute Cholecystitis / Biliary Colic",     "HEPATOBILIARY & PANCREATIC",           "Acute Cholecystitis"),
    (SURGERY, "Cholangiocarcinoma",                      "HEPATOBILIARY & PANCREATIC",           "Cholangiocarcinoma"),
    # "Acute Pancreatitis / Chronic Pancreatitis" split: existing data → "Acute Pancreatitis"
    (SURGERY, "Acute Pancreatitis / Chronic Pancreatitis", "HEPATOBILIARY & PANCREATIC",         "Acute Pancreatitis"),

    # SURGERY → ACUTE ABDOMEN & SURGICAL PRINCIPLES
    (SURGERY, "Acute Abdomen",                           "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Acute Abdomen"),
    (SURGERY, "Acute Appendicitis",                      "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Acute Appendicitis"),
    (SURGERY, "Abdominal Hernias",                       "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Abdominal Hernias"),
    (SURGERY, "Pre-operative Assessment",                "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Pre-operative Assessment"),
    (SURGERY, "Post-operative Complications",            "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Post-operative Complications"),
    (SURGERY, "Fluid Therapy",                           "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Fluid Therapy"),
    (SURGERY, "Shock (types)",                           "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Shock (types)"),
    (SURGERY, "Analgesia / Pain Ladder",                 "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Analgesia / Pain Ladder"),
    (SURGERY, "Local Anaesthetics",                      "ACUTE ABDOMEN & SURGICAL PRINCIPLES",  "Local Anaesthetics"),

    # HAEMATOLOGY → LIVER
    (HAEM, "Haemochromatosis",                           "LIVER",                                "Haemochromatosis"),
]

# New stub conditions (no existing data)
NEW_STUB_CONDITIONS = [
    ("UPPER GI",                    "Achalasia"),
    ("HEPATOBILIARY & PANCREATIC",  "Biliary Colic & Gallstone Disease"),
    ("HEPATOBILIARY & PANCREATIC",  "Ascending Cholangitis"),
    ("HEPATOBILIARY & PANCREATIC",  "Chronic Pancreatitis"),
    ("HEPATOBILIARY & PANCREATIC",  "Pancreatic Cancer"),
    ("LIVER",                       "NAFLD"),
]


def make_fc_key(system, condition):
    return f"conditions__{system}__{condition}"

def make_note_key(system, condition):
    return f"{system}__{condition}"


# ─────────────────────────────────────────────
# 3. Read file
# ─────────────────────────────────────────────
print("Reading index.html...")
with open(HTML_FILE, "r", encoding="utf-8") as f:
    content = f.read()

original_len = len(content)
print(f"File size: {original_len:,} bytes")

# ─────────────────────────────────────────────
# 4. Rename keys in PRESET_FC, PRESET_Q, RICH_NOTES
#    Strategy: do simple string replacement of the key strings.
#    Keys in FC/MCQ:   "conditions__SYSTEM__Condition"
#    Keys in Notes:    "SYSTEM__Condition"
# ─────────────────────────────────────────────

rename_count = 0
skip_count = 0

for old_sys, old_cond, new_sys, new_cond in MOVES:
    old_fc_key   = f'"conditions__{old_sys}__{old_cond}"'
    new_fc_key   = f'"conditions__{new_sys}__{new_cond}"'
    old_note_key = f'"{old_sys}__{old_cond}"'
    new_note_key = f'"{new_sys}__{new_cond}"'

    fc_count   = content.count(old_fc_key)
    note_count = content.count(old_note_key)

    if fc_count > 0:
        content = content.replace(old_fc_key, new_fc_key)
        rename_count += fc_count
        print(f"  FC/MCQ key renamed ({fc_count}x): {old_sys}__{old_cond} → {new_sys}__{new_cond}")
    else:
        print(f"  [MISSING FC/MCQ] {old_sys}__{old_cond}")
        skip_count += 1

    if note_count > 0:
        content = content.replace(old_note_key, new_note_key)
        rename_count += note_count
        print(f"  Notes key renamed ({note_count}x): {old_sys}__{old_cond} → {new_sys}__{new_cond}")
    else:
        print(f"  [MISSING Notes] {old_sys}__{old_cond}")

print(f"\nTotal key renames: {rename_count}, missing keys: {skip_count}")

# ─────────────────────────────────────────────
# 5. Update CONDITIONS_SYSTEMS
#    Find the GASTROENTEROLOGY, SURGERY, and HAEMATOLOGY entries and replace them.
# ─────────────────────────────────────────────

# Icons from the old systems (we'll preserve HAEMATOLOGY's icon)
# Find old icon values
def find_old_icon(html, system_name):
    # Pattern: "SYSTEM NAME": { ... "icon": "EMOJI" ...
    pattern = re.escape(f'"{system_name}"') + r'\s*:\s*\{[^}]*?"icon"\s*:\s*"([^"]+)"'
    m = re.search(pattern, html)
    if m:
        return m.group(1)
    return "🩺"

gastro_icon  = find_old_icon(content, GASTRO)
surgery_icon = find_old_icon(content, SURGERY)
haem_icon    = find_old_icon(content, HAEM)
print(f"Old icons — Gastro: {gastro_icon}, Surgery: {surgery_icon}, Haem: {haem_icon}")

# Assign icons for new systems
SYSTEM_ICONS = {
    "UPPER GI":                         "🫄",
    "LOWER GI & BOWEL":                 "🦠",
    "HEPATOBILIARY & PANCREATIC":       "🟡",
    "LIVER":                            "🫀",
    "ACUTE ABDOMEN & SURGICAL PRINCIPLES": "🔪",
}

def build_system_entry(system_name, conditions, icon):
    cond_strs = ',\n            '.join(f'"{c}"' for c in conditions)
    return (
        f'"{system_name}": {{\n'
        f'            "icon": "{icon}",\n'
        f'            "conditions": [\n'
        f'            {cond_strs}\n'
        f'            ]\n'
        f'        }}'
    )

# ─────────────────────────────────────────────
# Find and replace the GASTROENTEROLOGY / HEPATOLOGY block in CONDITIONS_SYSTEMS
# ─────────────────────────────────────────────

def find_system_block(html, system_name):
    """Find the full system block including closing brace, return (start, end) positions."""
    # Find the start of this system entry
    key_pat = '"' + re.escape(system_name) + '"'
    m = re.search(key_pat, html)
    if not m:
        return None, None
    start = m.start()
    # Find the opening brace
    brace_pos = html.index('{', start)
    depth = 0
    i = brace_pos
    while i < len(html):
        if html[i] == '{':
            depth += 1
        elif html[i] == '}':
            depth -= 1
            if depth == 0:
                return start, i + 1
        i += 1
    return None, None

# Replace GASTROENTEROLOGY block with UPPER GI + LOWER GI & BOWEL
# Replace SURGERY block with HEPATOBILIARY & PANCREATIC + ACUTE ABDOMEN & SURGICAL PRINCIPLES
# Insert LIVER after one of them (after HEPATOBILIARY)

# Strategy:
# 1. Replace the GASTROENTEROLOGY block text with the UPPER GI + LOWER GI & BOWEL entries
# 2. Replace the SURGERY block text with HEPATOBILIARY & PANCREATIC + LIVER + ACUTE ABDOMEN entries
# 3. Remove Haemochromatosis from HAEMATOLOGY conditions list

# --- Step 5a: Replace GASTROENTEROLOGY block ---
g_start, g_end = find_system_block(content, GASTRO)
if g_start is None:
    print("ERROR: Could not find GASTROENTEROLOGY block!")
else:
    print(f"Found GASTRO block at {g_start}:{g_end}")
    upper_gi_entry = build_system_entry(
        "UPPER GI", NEW_SYSTEMS["UPPER GI"]["conditions"], SYSTEM_ICONS["UPPER GI"])
    lower_gi_entry = build_system_entry(
        "LOWER GI & BOWEL", NEW_SYSTEMS["LOWER GI & BOWEL"]["conditions"], SYSTEM_ICONS["LOWER GI & BOWEL"])
    replacement = upper_gi_entry + ',\n        ' + lower_gi_entry
    content = content[:g_start] + replacement + content[g_end:]
    print("Replaced GASTROENTEROLOGY / HEPATOLOGY block")

# --- Step 5b: Replace SURGERY block ---
s_start, s_end = find_system_block(content, SURGERY)
if s_start is None:
    print("ERROR: Could not find SURGERY block!")
else:
    print(f"Found SURGERY block at {s_start}:{s_end}")
    hbp_entry = build_system_entry(
        "HEPATOBILIARY & PANCREATIC", NEW_SYSTEMS["HEPATOBILIARY & PANCREATIC"]["conditions"], SYSTEM_ICONS["HEPATOBILIARY & PANCREATIC"])
    liver_entry = build_system_entry(
        "LIVER", NEW_SYSTEMS["LIVER"]["conditions"], SYSTEM_ICONS["LIVER"])
    acute_entry = build_system_entry(
        "ACUTE ABDOMEN & SURGICAL PRINCIPLES", NEW_SYSTEMS["ACUTE ABDOMEN & SURGICAL PRINCIPLES"]["conditions"], SYSTEM_ICONS["ACUTE ABDOMEN & SURGICAL PRINCIPLES"])
    replacement = hbp_entry + ',\n        ' + liver_entry + ',\n        ' + acute_entry
    content = content[:s_start] + replacement + content[s_end:]
    print("Replaced SURGERY (GENERAL) block")

# --- Step 5c: Remove Haemochromatosis from HAEMATOLOGY conditions ---
# Find the HAEMATOLOGY block and remove "Haemochromatosis" from its conditions array
haem_start, haem_end = find_system_block(content, HAEM)
if haem_start is None:
    print("ERROR: Could not find HAEMATOLOGY block!")
else:
    haem_block = content[haem_start:haem_end]
    # Remove the Haemochromatosis entry - handle both with trailing comma and with leading comma
    # Pattern: optional comma + whitespace + "Haemochromatosis" + optional comma
    new_haem_block = re.sub(r',?\s*"Haemochromatosis"\s*,?', lambda m: ',' if m.group().count(',') == 2 else '', haem_block)
    # Clean up any double commas or trailing commas before ]
    new_haem_block = re.sub(r',\s*,', ',', new_haem_block)
    new_haem_block = re.sub(r',\s*\]', '\n            ]', new_haem_block)
    content = content[:haem_start] + new_haem_block + content[haem_end:]
    print("Removed Haemochromatosis from HAEMATOLOGY")

# ─────────────────────────────────────────────
# 6. Add stub entries for new conditions (no existing data)
# ─────────────────────────────────────────────

# Find where PRESET_FC ends (last } before the closing of the object)
# We'll add minimal stub FC entries for new conditions

STUB_FC_ENTRIES = []
STUB_MCQ_ENTRIES = []
STUB_NOTE_ENTRIES = []

for sys_name, cond_name in NEW_STUB_CONDITIONS:
    fc_key = f"conditions__{sys_name}__{cond_name}"
    note_key = f"{sys_name}__{cond_name}"

    stub_fc = f'''"{fc_key}": [
    {{
      "front": "{cond_name} — Definition",
      "back": "Content to be added. See notes for details."
    }}
  ]'''

    stub_mcq = f'''"{fc_key}_mcq": [
    {{
      "type": "mcq",
      "question": "Which of the following best describes {cond_name}?",
      "options": ["A. Content to be added", "B. Option B", "C. Option C", "D. Option D", "E. Option E"],
      "answer": 0,
      "explanation": "Content to be added."
    }}
  ]'''

    stub_note = f'''"{note_key}": "<div class=\\"rich-note\\"><h2>{cond_name}</h2><p><em>Content to be added.</em></p></div>"'''

    STUB_FC_ENTRIES.append(stub_fc)
    STUB_MCQ_ENTRIES.append(stub_mcq)
    STUB_NOTE_ENTRIES.append(stub_note)
    print(f"  Stub prepared for: {sys_name} → {cond_name}")

# Insert stub FCs into PRESET_FC
# Find "const PRESET_FC = {" and insert before the closing };
if STUB_FC_ENTRIES:
    # Find the end of PRESET_FC
    fc_marker = 'const PRESET_FC = {'
    fc_pos = content.find(fc_marker)
    if fc_pos == -1:
        print("ERROR: Cannot find PRESET_FC")
    else:
        # Find its closing brace
        brace_start = content.index('{', fc_pos)
        depth = 0
        i = brace_start
        while i < len(content):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    fc_end = i
                    break
            i += 1
        # Insert stubs before the closing brace
        insert_text = ',\n  ' + ',\n  '.join(STUB_FC_ENTRIES) + ',\n  ' + ',\n  '.join(STUB_MCQ_ENTRIES)
        content = content[:fc_end] + insert_text + '\n' + content[fc_end:]
        print(f"Inserted {len(STUB_FC_ENTRIES)} FC stubs and {len(STUB_MCQ_ENTRIES)} MCQ stubs into PRESET_FC")

# Insert stub notes into RICH_NOTES
if STUB_NOTE_ENTRIES:
    note_marker = 'const RICH_NOTES = {'
    note_pos = content.find(note_marker)
    if note_pos == -1:
        print("ERROR: Cannot find RICH_NOTES")
    else:
        brace_start = content.index('{', note_pos)
        depth = 0
        i = brace_start
        while i < len(content):
            if content[i] == '{':
                depth += 1
            elif content[i] == '}':
                depth -= 1
                if depth == 0:
                    note_end = i
                    break
            i += 1
        insert_text = ',\n  ' + ',\n  '.join(STUB_NOTE_ENTRIES)
        content = content[:note_end] + insert_text + '\n' + content[note_end:]
        print(f"Inserted {len(STUB_NOTE_ENTRIES)} note stubs into RICH_NOTES")

# ─────────────────────────────────────────────
# 7. Write output
# ─────────────────────────────────────────────
print(f"\nWriting output ({len(content):,} bytes)...")
with open(HTML_FILE, "w", encoding="utf-8") as f:
    f.write(content)

print("Done!")
print(f"Size change: {original_len:,} → {len(content):,} bytes ({len(content) - original_len:+,})")
