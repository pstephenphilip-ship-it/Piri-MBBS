#!/usr/bin/env python3
"""Add flashcards / MCQs / a rich note for one topic — the on-demand-architecture
replacement for the old scripts that appended into index.html's PRESET_FC/PRESET_Q.

Cards and notes now live in per-system JSON under content/; index.html is only
touched to register a NEW topic in CONDITIONS_SYSTEMS (so it shows in the sidebar).

USAGE (matches the old add_X.py ergonomics):

    import sys; sys.path.insert(0, 'tools')
    from add_content import add_topic

    add_topic(
        system="CARDIOVASCULAR",
        topic="Infective Endocarditis",
        idbase="IE",                       # -> piri_fc__conditions__CARDIOVASCULAR__IE__0001
        note_html="<div class=...>...</div>",   # optional; None to skip
        FC=[("front","back"), ...],              # optional flashcards
        Q=[("question", [o1,o2,o3,o4,o5], correctIndex, "explanation"), ...],  # optional MCQs
    )

Appends are collision-safe (IDs continue past existing ones) and NEVER erase an
existing deck. Re-runs the manifest counts and sub-topic search aliases for you.
"""
import os, re, json, base64

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CONTENT = os.path.join(ROOT, 'content')
IMG = os.path.join(ROOT, 'img')
INDEX = os.path.join(ROOT, 'index.html')

def _dump(o):
    return json.dumps(o, ensure_ascii=False, separators=(',', ':'))

def _slugify(s):
    s = s.lower()
    s = re.sub(r'[/&]', ' ', s)
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

def _load_manifest():
    with open(os.path.join(CONTENT, 'manifest.json'), encoding='utf-8') as f:
        return json.load(f)

def slug_for(system, manifest=None):
    m = manifest or _load_manifest()
    return (m.get('slugMap', {}) or {}).get(system) or _slugify(system)

def _load_json(path, default):
    if os.path.exists(path):
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    return default

# ---- image externalisation (mirrors tools/split_content.py) ----
def _externalize_images(system_slug, val):
    s = json.dumps(val, ensure_ascii=False)
    uris = re.findall(r'data:image/([a-zA-Z]+);base64,([A-Za-z0-9+/=]+)', s)
    if not uris:
        return val
    os.makedirs(IMG, exist_ok=True)
    existing = len([f for f in os.listdir(IMG) if f.startswith(system_slug + '-')])
    for ext, b64 in uris:
        existing += 1
        fn = '%s-%02d.%s' % (system_slug, existing, ext.replace('jpeg', 'jpg'))
        with open(os.path.join(IMG, fn), 'wb') as f:
            f.write(base64.b64decode(b64))
        s = s.replace('data:image/%s;base64,%s' % (ext, b64), 'img/' + fn)
    return json.loads(s)

# ---- sub-topic search aliases (mirrors tools/split_content.py) ----
_GEN = ['overview','management','assessment','investigation','diagnosis','feature','classification',
 'screening','aetiolog','triggers','complication','algorithm','cpr','arrest rhythm','defib','4hs','4ts',
 'criteria','capacity test','mha','mca','rights','best interest','emergenc','principle','comparison',
 'triage','organism','pearl','other causes','& others','cluster a','cluster b','cluster c','transplant',
 'right-sided','physiology','summary']
_TT_RE = re.compile(r'<button class="tt-btn[^"]*"[\s\S]*?>([^<>]+)</button>')

def _subnav_labels(note_html):
    if not isinstance(note_html, str) or 'tt-nav' not in note_html:
        return []
    labels = []
    for m in _TT_RE.finditer(note_html):
        lab = m.group(1).replace('&amp;', '&').replace('&#39;', "'").replace('&#x27;', "'")
        lab = re.sub(r'\s+', ' ', lab).strip()
        if lab and not any(g in lab.lower() for g in _GEN):
            labels.append(lab)
    return labels

def _next_index(deck, idbase, kind):
    """Highest %04d already used for this idbase in the deck, so appends continue."""
    prefix = 'piri_%s__conditions__' % kind  # kind = 'fc' or 'q'
    mx = 0
    for c in deck:
        cid = c.get('id', '')
        m = re.search(re.escape('__' + idbase + '__') + r'(\d{4})$', cid)
        if m:
            mx = max(mx, int(m.group(1)))
    return mx

def _register_topic(system, topic):
    """Ensure `topic` is listed under CONDITIONS_SYSTEMS[system] in index.html."""
    h = open(INDEX, encoding='utf-8').read()
    i = h.find('const CONDITIONS_SYSTEMS=')
    assert i >= 0, 'CONDITIONS_SYSTEMS not found in index.html'
    j = i + len('const CONDITIONS_SYSTEMS=')
    depth = 0; k = j; instr = False; esc = False
    while k < len(h):
        c = h[k]
        if instr:
            if esc: esc = False
            elif c == '\\': esc = True
            elif c == '"': instr = False
        else:
            if c == '"': instr = True
            elif c == '{': depth += 1
            elif c == '}':
                depth -= 1
                if depth == 0: break
        k += 1
    span = h[j:k + 1]
    cs = json.loads(span)
    sysobj = cs.setdefault(system, {'conditions': []})
    key = 'conditions' if 'conditions' in sysobj else ('topics' if 'topics' in sysobj else 'conditions')
    lst = sysobj.setdefault(key, [])
    if topic in lst:
        return False
    lst.append(topic)
    new = h[:j] + _dump(cs) + h[k + 1:]
    open(INDEX, 'w', encoding='utf-8').write(new)
    return True

def _refresh_manifest(system, slug):
    m = _load_manifest()
    notes = _load_json(os.path.join(CONTENT, 'notes', slug + '.json'), {})
    cards = _load_json(os.path.join(CONTENT, 'cards', slug + '.json'), {'fc': {}, 'q': {}})
    fcards = sum(len(v) for v in cards.get('fc', {}).values())
    qcards = sum(len(v) for v in cards.get('q', {}).values())
    entry = {'name': system, 'slug': slug, 'notes': len(notes),
             'fcards': fcards, 'qcards': qcards,
             'hasNotes': bool(notes), 'hasCards': bool(cards.get('fc') or cards.get('q'))}
    systems = m.setdefault('systems', [])
    for idx, s in enumerate(systems):
        if s.get('slug') == slug:
            systems[idx] = entry
            break
    else:
        systems.append(entry)
        systems.sort(key=lambda s: s['name'])
    m.setdefault('slugMap', {})[system] = slug
    with open(os.path.join(CONTENT, 'manifest.json'), 'w', encoding='utf-8') as f:
        json.dump(m, f, ensure_ascii=False, indent=1)

def add_topic(system, topic, idbase=None, note_html=None, FC=None, Q=None, register=True):
    FC = FC or []
    Q = Q or []
    idbase = idbase or _slugify(topic).replace('-', '')[:20] or 'x'
    slug = slug_for(system)
    deckkey = 'conditions__%s__%s' % (system, topic)

    # ---- cards ----
    if FC or Q:
        path = os.path.join(CONTENT, 'cards', slug + '.json')
        data = _load_json(path, {'fc': {}, 'q': {}})
        data.setdefault('fc', {}); data.setdefault('q', {})

        fc_deck = data['fc'].setdefault(deckkey, [])
        start = _next_index(fc_deck, idbase, 'fc')
        existing_ids = {c.get('id') for c in fc_deck}
        for n, (front, back) in enumerate(FC, start + 1):
            cid = 'piri_fc__conditions__%s__%s__%04d' % (system, idbase, n)
            assert cid not in existing_ids, 'duplicate fc id ' + cid
            fc_deck.append({'id': cid, 'front': front, 'back': back})

        q_deck = data['q'].setdefault(deckkey, [])
        start = _next_index(q_deck, idbase, 'q')
        existing_ids = {c.get('id') for c in q_deck}
        for n, (q, opts, ci, ex) in enumerate(Q, start + 1):
            assert len(opts) == 5, 'MCQ %d must have 5 options' % n
            cid = 'piri_q__conditions__%s__%s__%04d' % (system, idbase, n)
            assert cid not in existing_ids, 'duplicate q id ' + cid
            q_deck.append({'id': cid, 'type': 'mcq', 'question': q, 'options': opts,
                           'correctIndex': ci, 'answer': opts[ci], 'explanation': ex})

        if not data['fc'][deckkey]: del data['fc'][deckkey]
        if not data['q'][deckkey]: del data['q'][deckkey]
        os.makedirs(os.path.dirname(path), exist_ok=True)
        open(path, 'w', encoding='utf-8').write(_dump(data))

    # ---- note ----
    if note_html:
        npath = os.path.join(CONTENT, 'notes', slug + '.json')
        notes = _load_json(npath, {})
        notekey = '%s__%s' % (system, topic)
        notes[notekey] = _externalize_images(slug, note_html)
        os.makedirs(os.path.dirname(npath), exist_ok=True)
        open(npath, 'w', encoding='utf-8').write(_dump(notes))
        labels = _subnav_labels(note_html)
        sn_path = os.path.join(CONTENT, 'subnav.json')
        sn = _load_json(sn_path, {})
        if labels:
            sn[notekey] = labels
        elif notekey in sn:
            del sn[notekey]
        open(sn_path, 'w', encoding='utf-8').write(_dump(sn))

    # ---- sidebar registration + manifest ----
    registered = _register_topic(system, topic) if register else False
    _refresh_manifest(system, slug)

    print('added: %s / %s  (fc +%d, q +%d%s%s)' % (
        system, topic, len(FC), len(Q),
        ', note' if note_html else '',
        ', registered topic' if registered else ''))
    return {'system': system, 'topic': topic, 'slug': slug, 'deckkey': deckkey,
            'fc_added': len(FC), 'q_added': len(Q), 'registered': registered}

if __name__ == '__main__':
    print(__doc__)
