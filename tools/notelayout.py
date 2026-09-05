#!/usr/bin/env python3
"""Structural layout pass for a rich note JSON file.

Three transforms, all purely presentational — no word is added or removed:

  1. section accents  — give each rn-section an accent class from its title, so
                        a long note can be navigated by colour instead of a
                        column of identical blue header bars.
  2. prose walls      — a callout that runs to five lines is a list of separate
                        claims written as one sentence; split it into a lead
                        plus one claim per row. A long body paragraph is split
                        into paragraphs instead, so prose stays prose.
  3. dense cells      — a table cell listing several clues as a run-on sentence
                        becomes one clue per line.

Splitting is HTML-aware: a split point is only taken where the inline tag stack
is empty, so every fragment is balanced markup. Verify the result with
tools/contentcheck.py, which proves no content word was lost.

    python3 tools/notelayout.py <file.json> [--apply] [--only KEY]
"""
import sys, json, re, html

# ---------------------------------------------------------------- accents
# Ordered: first pattern that matches a section title wins.
# A section title is usually "<subject> — <qualifier>". The subject decides the
# accent: "Management — Symptom & Risk-Driven" is management (green), not risk
# (amber). So match the head phrase first and only fall back to the whole title.
ACCENT_RULES = [
    (r'pearl|high.?yield',                                          None),
    (r'emergenc|resus|cardiac arrest|life.threatening|'
     r'tension pneumothorax|crisis|refractory|danger|red flag|'
     r'acute management|immediate management|deteriorat',           'red'),
    (r'differential|mimic|looks like|vs\b.*\bvs\b',                'purple'),
    (r'after the|after treatment|follow.?up|discharge|rehab|'
     r'aftercare|survivor|relapse|specialist centre',               'green'),
    (r'investigat|diagnos|imaging|spirometr|biopsy|bloods|'
     r'\btests?\b|criteria|staging|grading',                        'teal'),
    (r'recognition|clinical feature|symptom|\bsigns?\b|'
     r'presentation|examination|assessment|history taking',         'teal'),
    (r'complication|risk factor|\brisks?\b|^severity|'
     r'severity (assessment|scor)|CURB|prognos|mortality|survival|'
     r'safety|when to (worry|refer|admit)|side.effect|adverse',     'amber'),
    (r'management|treatment|therap|drug|prescrib|antibiotic|'
     r'ventilation strateg|invasive ventilation|oxygen (therapy|'
     r'support|delivery)|surger|surgical|regimen|\bNRT\b|smoking '
     r'cessation|prevent|vaccin|monitor|\bNIV\b|\bCPAP\b|'
     r'\bBiPAP\b|intubat|contraindicat',                            'green'),
    (r'classif|patholog|aetiolog|etiolog|pathophys|mechanism|'
     r'\bcauses?\b|natural history',                                'purple'),
]

def _match(t):
    for pat, acc in ACCENT_RULES:
        if re.search(pat, t, re.I):
            return acc, True
    return None, False

def accent_for(title):
    t = re.sub(r'<[^>]+>', '', title)
    t = html.unescape(t).strip()
    head = re.split(r'\s*[\u2014\u2013:(]\s*', t)[0]
    acc, hit = _match(head)
    if hit: return acc
    acc, hit = _match(t)
    return acc if hit else None

# ---------------------------------------------------------------- splitting
ABBR = {'e.g','i.e','vs','etc','approx','dr','mr','no','fig','ref','cf','ie','eg'}
TAG = re.compile(r'<(/?)([a-zA-Z][\w-]*)([^>]*?)(/?)>')
VOID = {'br','img','hr','input','wbr'}

def split_points(s):
    """Offsets just after a sentence end that sits outside every inline tag."""
    depth = 0; pts = []; i = 0
    stack_empty_at = set()
    for m in TAG.finditer(s):
        # record depth for the text run BEFORE this tag
        seg = s[i:m.start()]
        if depth == 0:
            for k in _sentence_ends(seg):
                pts.append(i + k)
        name = m.group(2).lower()
        if name not in VOID and not m.group(4):
            depth += -1 if m.group(1) else 1
            if depth < 0: depth = 0
        i = m.end()
    if depth == 0:
        for k in _sentence_ends(s[i:]):
            pts.append(i + k)
    return pts

def _sentence_ends(seg):
    out = []
    for m in re.finditer(r'([.!?])(\s+)', seg):
        dot = m.start()
        if dot == 0: continue
        prev = seg[dot-1]
        if prev.isdigit():                       # 0.5 mL, 1.5 h
            continue
        word = re.search(r'([A-Za-z.]+)$', seg[:dot])
        if word and word.group(1).lower().strip('.') in ABBR:
            continue
        if len(word.group(1)) < 2 if word else True:   # single initial
            continue
        nxt = seg[m.end():m.end()+1]
        if nxt and not (nxt.isupper() or nxt == '<' or nxt in '⚠🔺'):
            continue
        out.append(m.end())
    return out

def fragments(inner):
    pts = split_points(inner)
    if not pts: return [inner.strip()]
    frags = []; last = 0
    for p in pts:
        frags.append(inner[last:p].strip()); last = p
    tail = inner[last:].strip()
    if tail: frags.append(tail)
    return [f for f in frags if f]

def strip_trailing_stop(f):
    return re.sub(r'\.\s*$', '', f)

def visible(m):
    t = re.sub(r'<[^>]+>', ' ', m); t = html.unescape(t)
    return re.sub(r'\s+', ' ', t).strip()

LEAD = re.compile(r'^\s*((?:[^\w<]{0,4}\s*)?<strong>.*?</strong>[:.]?)\s*', re.S)

def to_lead_and_list(inner, min_items=2):
    """<lead line> + one row per remaining sentence. None if it will not split."""
    lead = ''
    m = LEAD.match(inner)
    body = inner
    if m and len(visible(m.group(1))) <= 120:
        lead = m.group(1).strip(); body = inner[m.end():]
    frags = fragments(body)
    frags = [f for f in frags if visible(f)]
    if not lead:
        if len(frags) < min_items + 1: return None
        lead, frags = frags[0], frags[1:]
    # A fragment that opens with a dash, a bracket or a lowercase word is the
    # tail of the lead sentence, not a claim of its own: "MDR-TB = resistance to
    # both" / "- the two drugs that carry the regimen" must not become two rows.
    while frags and _is_continuation(frags[0]):
        lead = (lead + ' ' + frags.pop(0)).strip()
    if len(frags) < min_items: return None
    if len(visible(lead)) > 260: return None
    if any(len(visible(f)) < 3 for f in frags): return None
    if any(_is_continuation(f, allow_lower=False) for f in frags): return None
    if any(f.count('(') != f.count(')') for f in frags): return None
    items = ''.join('<li>%s</li>' % _cap(strip_trailing_stop(f)) for f in frags)
    return lead, '<ul class="rn-tightlist">%s</ul>' % items

# A fragment that opens with punctuation, an arrow or a bracket continues the
# one before it. A LOWERCASE opening means that too when the split was on a
# sentence end -- but not when the split was on a list separator, where
# "wheeze -> asthma * acid + worse lying -> GORD" is two rows by design.
_CONT_PUNCT = (r'^\s*(?:<[^>]+>\s*)*'
               r'(?:&[mn]dash;|&r?arr;|&hellip;|[-–—→⇒(\[,;:])')
CONT       = re.compile(_CONT_PUNCT + r'|^\s*(?:<[^>]+>\s*)*[a-z]')
CONT_PUNCT = re.compile(_CONT_PUNCT)

def _is_continuation(frag, allow_lower=True):
    return bool((CONT if allow_lower else CONT_PUNCT).match(frag))

def _cap(f):
    """Sentence fragments become rows; give a row a capital where it lost one."""
    m = re.match(r'^(\s*(?:<[^>]+>\s*)*)([a-z])', f)
    if not m: return f
    return f[:m.end(1)] + m.group(2).upper() + f[m.end(2):]

# ---------------------------------------------------------------- transforms
CALLOUT = re.compile(r'(<div class="rn-callout[^"]*"[^>]*>)(.*?)(</div>)', re.S)
PARA    = re.compile(r'(<p(?![^>]*class="rn-small")[^>]*>)(.*?)(</p>)', re.S)
CELL    = re.compile(r'(<td\b[^>]*>)(.*?)(</td>)', re.S)

WALL_CALLOUT = 210    # a callout past this is a wall, not a note
WALL_PARA    = 300    # prose gets more rope than a callout
DENSE_CELL   = 150

def pass_accents(s, stats):
    def rep(m):
        cls, title = m.group(1), m.group(2)
        if cls.strip():                       # already accented - leave it
            return m.group(0)
        acc = accent_for(title)
        if not acc: return m.group(0)
        stats['accents'] += 1
        return '<div class="rn-section rn-section-%s">%s<div class="rn-section-title">%s</div>' % (
            acc, m.group(3), title)
    return re.sub(r'<div class="rn-section([^"]*)">(\s*)<div class="rn-section-title">(.*?)</div>',
                  lambda m: rep(_Shim(m)), s, flags=re.S)

class _Shim:
    """Adapt the accent regex's group order to rep()'s expectations."""
    def __init__(self, m): self.m = m
    def group(self, i):
        return {0: self.m.group(0), 1: self.m.group(1),
                2: self.m.group(3), 3: self.m.group(2)}[i]

def pass_callouts(s, stats):
    def rep(m):
        open_, inner, close = m.groups()
        if re.search(r'<(ul|ol|table|div)\b', inner): return m.group(0)
        if len(visible(inner)) < WALL_CALLOUT: return m.group(0)
        r = to_lead_and_list(inner) or to_sep_list(inner)
        if not r: return m.group(0)
        lead, lst = r
        stats['callouts'] += 1
        return '%s<div class="rn-cl-lead">%s</div>%s%s' % (open_, lead, lst, close)
    return CALLOUT.sub(rep, s)

def pass_paras(s, stats):
    def rep(m):
        open_, inner, close = m.groups()
        if re.search(r'<(ul|ol|table|div|p)\b', inner): return m.group(0)
        if len(visible(inner)) < WALL_PARA: return m.group(0)
        frags = [f for f in fragments(inner) if visible(f)]
        if len(frags) < 2: return m.group(0)
        # regroup into 2-3 paragraphs of roughly even length, never 1-sentence orphans
        target = 2 if len(frags) < 5 else 3
        per = max(1, len(frags) // target)
        groups, cur = [], []
        for f in frags:
            cur.append(f)
            if len(cur) >= per and len(groups) < target - 1:
                groups.append(cur); cur = []
        if cur: groups.append(cur)
        if len(groups) < 2: return m.group(0)
        stats['paras'] += 1
        return ''.join('%s%s%s' % (open_, ' '.join(g), close) for g in groups)
    return PARA.sub(rep, s)

def pass_cells(s, stats):
    def rep(m):
        open_, inner, close = m.groups()
        if re.search(r'<(ul|ol|table|div)\b', inner): return m.group(0)
        t = visible(inner)
        if len(t) < DENSE_CELL or (t.count(',') + t.count(';')) < 3: return m.group(0)
        frags = [f for f in fragments(inner) if visible(f)]
        if len(frags) < 2:                       # one sentence: split on ; instead
            parts = _semi_split(inner)
            if len(parts) < 3: return m.group(0)
            frags = parts
        stats['cells'] += 1
        items = ''.join('<li>%s</li>' % _cap(strip_trailing_stop(f)) for f in frags)
        return '%s<ul class="rn-tightlist">%s</ul>%s' % (open_, items, close)
    return CELL.sub(rep, s)

SEP_PATTERNS = [
    r'\s*&middot;\s*',      # the corpus writes its list separator as an entity
    r'\s+\u00b7\s+',        # ... and occasionally as a literal middot
    r';\s+',                 # otherwise, clauses
]

def _sep_split(inner, pat):
    """Split on a separator that sits outside every tag AND outside every HTML
    entity. Splitting on ';' without the entity guard tears '&rarr;' in half,
    which is how "expiration &rarr; COPD" became two rows."""
    rx = re.compile(pat)
    depth = 0; out = []; last = 0; i = 0
    def scan(seg, base, bracket):
        for sm in rx.finditer(seg):
            # never inside an entity: &rarr; &mdash; &#8594;
            if re.search(r'&[a-zA-Z#][a-zA-Z0-9]*$', seg[:sm.start()]):
                continue
            # never inside brackets: "who (a smoker -> COPD * the young -> CF)"
            # is one clause, and splitting it strands the closing half
            b = bracket[0] + seg[:sm.start()].count('(') - seg[:sm.start()].count(')')
            if b > 0:
                continue
            yield base + sm.start(), base + sm.end()
    bracket = [0]
    for m in TAG.finditer(inner):
        seg = inner[i:m.start()]
        if depth == 0:
            for a, b in scan(seg, i, bracket):
                out.append(inner[last:a].strip()); last = b
        bracket[0] = max(0, bracket[0] + seg.count('(') - seg.count(')'))
        name = m.group(2).lower()
        if name not in VOID and not m.group(4):
            depth += -1 if m.group(1) else 1
            if depth < 0: depth = 0
        i = m.end()
    if depth == 0:
        for a, b in scan(inner[i:], i, bracket):
            out.append(inner[last:a].strip()); last = b
    tail = inner[last:].strip()
    if tail: out.append(tail)
    return [o for o in out if visible(o)]

def _semi_split(inner):
    for pat in SEP_PATTERNS:
        parts = _sep_split(inner, pat)
        if len(parts) >= 3:
            return parts
    return []

# A plain-text lead: "The feature that flips it:" with no <strong> around it.
PLAIN_LEAD = re.compile(r'^\s*((?:<[^>]+>\s*)*[^<:]{4,90}:)\s*')

def to_sep_list(inner, min_items=3):
    """Lead + rows for a block written as 'lead: a -> b * c -> d * e -> f'."""
    lead = ''; body = inner
    m = LEAD.match(inner) or PLAIN_LEAD.match(inner)
    if m and len(visible(m.group(1))) <= 90:
        lead = m.group(1).strip(); body = inner[m.end():]
    parts = _semi_split(body)
    # The row right after a <strong> lead may be the rest of the lead sentence
    # ("CPAP adherence >=4 h/night" + "is the benchmark, and ...").  Between
    # rows a lowercase start is normal, so only punctuation folds there.
    # ... but a lead ending in ':' announces the list, so its first row is a
    # row, not the rest of the lead sentence.
    if (lead and parts and not visible(lead).rstrip().endswith(':')
            and _is_continuation(parts[0], allow_lower=True)):
        lead = (lead + ' ' + parts.pop(0)).strip()
    merged = []
    for p in parts:
        if merged and (_is_continuation(p, allow_lower=False)
                       or merged[-1].count('(') != merged[-1].count(')')):
            merged[-1] = (merged[-1] + ' ' + p).strip()
        else:
            merged.append(p)
    parts = merged
    if len(parts) < min_items: return None
    if any(len(visible(p)) < 4 for p in parts): return None
    if any(p.count('(') != p.count(')') for p in parts): return None
    if not lead:
        if len(visible(parts[0])) > 90: return None
        lead, parts = parts[0], parts[1:]
        if len(parts) < min_items - 1: return None
    # Refuse rather than emit a row that reads as a fragment.
    if any(_is_continuation(p, allow_lower=False) for p in parts): return None
    if any(p.count('(') != p.count(')') for p in parts): return None
    if len(visible(lead)) > 200: return None
    items = ''.join('<li>%s</li>' % strip_trailing_stop(p) for p in parts)
    return lead, '<ul class="rn-tightlist">%s</ul>' % items

def tag_depth(frag):
    """Net unclosed-tag count. Compared before/after so a note that was already
    malformed is still processed, but a transform can never unbalance one."""
    depth = 0
    for m in TAG.finditer(frag):
        name = m.group(2).lower()
        if name in VOID or m.group(4): continue
        depth += -1 if m.group(1) else 1
    return depth

def balanced(frag):
    return tag_depth(frag) == 0

PEARL  = re.compile(r'(<div class="(?:rn|cp)-pearl"[^>]*>)(.*?)(</div>)', re.S)
CPBLK  = re.compile(r'(<div class="cp-(?:lead|warn|hand|kill-desc|confirm|bed)[^"]*"[^>]*>)(.*?)(</div>)', re.S)
LI    = re.compile(r'(<li\b[^>]*>)(.*?)(</li>)', re.S)

WALL_PEARL = 210      # a pearl is meant to be a one-liner
WALL_LI    = 240      # a bullet past this is really several bullets

def pass_pearls(s, stats):
    def rep(m):
        open_, inner, close = m.groups()
        if re.search(r'<(ul|ol|table|div)\b', inner): return m.group(0)
        if len(visible(inner)) < WALL_PEARL: return m.group(0)
        r = to_lead_and_list(inner) or to_sep_list(inner)
        if not r: return m.group(0)
        lead, lst = r
        stats['pearls'] += 1
        return '%s<div class="rn-cl-lead">%s</div>%s%s' % (open_, lead, lst, close)
    return PEARL.sub(rep, s)

def pass_cpblocks(s, stats):
    """The clinical-pathway blocks (cp-lead, cp-warn, cp-hand, ...) that the
    Signs notes are built from, which carry no rn-* class."""
    def rep(m):
        open_, inner, close = m.groups()
        if re.search(r'<(ul|ol|table|div)\b', inner): return m.group(0)
        if len(visible(inner)) < WALL_CALLOUT: return m.group(0)
        r = to_lead_and_list(inner) or to_sep_list(inner)
        if not r: return m.group(0)
        lead, lst = r
        stats['cpblocks'] += 1
        return '%s<div class="rn-cl-lead">%s</div>%s%s' % (open_, lead, lst, close)
    return CPBLK.sub(rep, s)

def pass_lis(s, stats):
    """A very long bullet keeps its first sentence and nests the elaboration."""
    def rep(m):
        open_, inner, close = m.groups()
        if re.search(r'<(ul|ol|table|li)\b', inner): return m.group(0)
        if len(visible(inner)) < WALL_LI: return m.group(0)
        frags = [f for f in fragments(inner) if visible(f)]
        if len(frags) < 3:
            frags = _semi_split(inner)
            if len(frags) < 4: return m.group(0)
        head, rest = frags[0], frags[1:]
        items = ''.join('<li>%s</li>' % _cap(strip_trailing_stop(f)) for f in rest)
        stats['lis'] += 1
        return '%s%s<ul class="rn-tightlist">%s</ul>%s' % (open_, head, items, close)
    return LI.sub(rep, s)

def process(path, apply=False, only=None):
    d = json.load(open(path, encoding='utf-8'))
    stats = dict(accents=0, callouts=0, pearls=0, cpblocks=0, lis=0, paras=0, cells=0)
    changed = 0
    for k, v in list(d.items()):
        if not isinstance(v, str): continue
        if only and only not in k: continue
        before = v
        v = pass_accents(v, stats)
        v = pass_callouts(v, stats)
        v = pass_pearls(v, stats)
        v = pass_cpblocks(v, stats)
        v = pass_cells(v, stats)
        v = pass_lis(v, stats)
        v = pass_paras(v, stats)
        # Some notes ship malformed (a doubled, never-closed wrapper div is
        # common). Require only that the transform does not make it worse.
        if tag_depth(v) != tag_depth(before):
            print('!! transform changed tag balance, skipping:', k); continue
        if v != before:
            changed += 1; d[k] = v
    print(f"{path}: {changed} notes changed | " +
          " ".join(f"{k}={v}" for k, v in stats.items()))
    if apply:
        open(path, 'w', encoding='utf-8').write(json.dumps(d, ensure_ascii=False))
        print("  written")
    return stats

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    only = None
    if '--only' in sys.argv: only = sys.argv[sys.argv.index('--only') + 1]
    process(args[0], apply='--apply' in sys.argv, only=only)
