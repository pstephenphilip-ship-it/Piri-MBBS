#!/usr/bin/env python3
"""
1. Replace emoji icons on the 5 new systems with proper SVG icons.
2. Fix stub rich notes to use proper rn-section/rn-body structure.
"""

with open('/home/user/Piri-MBBS/index.html', 'r') as f:
    c = f.read()

print(f"Starting size: {len(c):,}")

# ─────────────────────────────────────────────
# 1. SVG Icons for the 5 new systems
# Each SVG uses viewBox="0 0 20 20", stroke="currentColor" style
# matching the existing icons exactly.
# ─────────────────────────────────────────────

NEW_ICONS = {
    "UPPER GI": (
        # Stomach / oesophagus — curved pipe shape
        '<svg viewBox=\\"0 0 20 20\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">'
        '<path d=\\"M7 3c0 0-2 1.5-2 4s1 3 1 5-1 2-1 3\\"/>'
        '<path d=\\"M7 3h5c1.5 0 2.5 1 2.5 3S13 8 13 10s1 3 1 4\\"/>'
        '<path d=\\"M5 15h9\\"/>'
        '</svg>'
    ),
    "LOWER GI & BOWEL": (
        # Colon / bowel loop
        '<svg viewBox=\\"0 0 20 20\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">'
        '<path d=\\"M4 4c0 0 0 3 3 3s4-2 4 0-2 3 0 4 4 1 4 4\\"/>'
        '<path d=\\"M4 4h3\\"/>'
        '<path d=\\"M15 15v-3\\"/>'
        '</svg>'
    ),
    "HEPATOBILIARY & PANCREATIC": (
        # Gallbladder / duct — oval with line
        '<svg viewBox=\\"0 0 20 20\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">'
        '<ellipse cx=\\"10\\" cy=\\"13\\" rx=\\"4\\" ry=\\"3\\"/>'
        '<path d=\\"M10 10V5\\"/>'
        '<path d=\\"M7 5h6\\"/>'
        '<path d=\\"M8 7.5c-2 0-4 1-4 3\\"/>'
        '</svg>'
    ),
    "LIVER": (
        # Liver silhouette — lobed shape
        '<svg viewBox=\\"0 0 20 20\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">'
        '<path d=\\"M3 10c0-4 3-7 7-7s8 3 8 6c0 2-1 3-3 4-1 .5-2 2-3 2H8c-2 0-5-2-5-5z\\"/>'
        '<path d=\\"M10 13v3\\"/>'
        '</svg>'
    ),
    "ACUTE ABDOMEN & SURGICAL PRINCIPLES": (
        # Scalpel / surgical blade
        '<svg viewBox=\\"0 0 20 20\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1.5\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\">'
        '<path d=\\"M5 15L14 4\\"/>'
        '<path d=\\"M14 4l1.5 1.5-2 2-1.5-1.5\\"/>'
        '<path d=\\"M5 15l2-1 1-2\\"/>'
        '</svg>'
    ),
}

import re

def replace_icon(html, system_name, new_icon_svg):
    # Find the system entry and locate its "icon": "..." value
    sys_pos = html.find(f'"{system_name}":')
    if sys_pos == -1:
        print(f"  WARNING: system not found: {system_name}")
        return html
    icon_pos = html.find('"icon"', sys_pos)
    # Find the value (quoted string after "icon": )
    colon = html.index(':', icon_pos)
    # skip whitespace
    i = colon + 1
    while html[i] in ' \t': i += 1
    # i now points to opening quote
    assert html[i] == '"', f"Expected quote at {i}, got {html[i]!r}"
    val_start = i
    # Find end of quoted string
    j = val_start + 1
    while j < val_start + 5000:
        if html[j] == '\\':
            j += 2
        elif html[j] == '"':
            val_end = j + 1
            break
        else:
            j += 1
    return html[:val_start] + '"' + new_icon_svg + '"' + html[val_end:]

for sys_name, svg in NEW_ICONS.items():
    c = replace_icon(c, sys_name, svg)
    print(f"  Updated icon for: {sys_name}")

# ─────────────────────────────────────────────
# 2. Fix stub rich notes — wrap in rn-section/rn-body structure
# ─────────────────────────────────────────────

STUB_CONDITIONS = [
    ("UPPER GI", "Achalasia"),
    ("HEPATOBILIARY & PANCREATIC", "Biliary Colic & Gallstone Disease"),
    ("HEPATOBILIARY & PANCREATIC", "Ascending Cholangitis"),
    ("HEPATOBILIARY & PANCREATIC", "Chronic Pancreatitis"),
    ("HEPATOBILIARY & PANCREATIC", "Pancreatic Cancer"),
    ("LIVER", "NAFLD"),
    ("ENDOCRINOLOGY", "Neck Lumps"),  # check if this one needs fix too
]

def make_proper_stub_note(condition_name):
    """Generate a minimal but properly structured rich note."""
    return (
        '<div class=\\"rich-note\\">\\n'
        '<div class=\\"rn-section\\">\\n'
        '  <div class=\\"rn-section-title\\">' + condition_name + ' — Overview</div>\\n'
        '  <div class=\\"rn-body\\">\\n'
        '    <div class=\\"rn-callout rn-callout-blue\\">\\n'
        '      <strong>' + condition_name + '</strong> — content to be added.\\n'
        '    </div>\\n'
        '  </div>\\n'
        '</div>\\n'
        '</div>'
    )

for sys_name, cond_name in STUB_CONDITIONS:
    note_key = f'"{sys_name}__{cond_name}"'
    pos = c.find(note_key)
    if pos == -1:
        print(f"  Note key not found: {note_key}")
        continue

    # Find the value
    colon = c.index(':', pos + len(note_key))
    i = colon + 1
    while c[i] in ' \t': i += 1
    if c[i] != '"':
        print(f"  No quoted string for {note_key}")
        continue
    val_start = i
    j = val_start + 1
    while j < val_start + 200000:
        if c[j] == '\\':
            j += 2
        elif c[j] == '"':
            val_end = j + 1
            break
        else:
            j += 1

    current_val = c[val_start:val_end]
    # Check if it's already a stub (contains "<h2>")
    if '<h2>' in current_val:
        new_val = '"' + make_proper_stub_note(cond_name) + '"'
        c = c[:val_start] + new_val + c[val_end:]
        print(f"  Fixed stub note: {sys_name}__{cond_name}")
    else:
        print(f"  Note already structured: {sys_name}__{cond_name} (skipped)")

with open('/home/user/Piri-MBBS/index.html', 'w') as f:
    f.write(c)

print(f"\nDone! File size: {len(c):,}")
