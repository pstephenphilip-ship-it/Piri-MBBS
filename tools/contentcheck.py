#!/usr/bin/env python3
"""Prove a note's TEXT is unchanged after a layout edit.

Strips all markup, normalises whitespace and entities, then compares the
visible words of the before and after versions. Reports anything lost,
anything added, and any reordering — so a reformat can be shown to be
purely structural.

    python3 contentcheck.py <before.json> <after.json> [note-key ...]
"""
import sys, json, re, html, difflib

def visible_text(markup: str) -> str:
    s = markup
    s = re.sub(r'<(script|style)\b.*?</\1>', ' ', s, flags=re.S|re.I)   # never rendered
    s = re.sub(r'<[^>]+>', ' ', s)                                       # tags
    s = html.unescape(s)
    s = s.replace(' ', ' ')
    s = re.sub(r'\s+', ' ', s)
    return s.strip()

def words(markup: str):
    return visible_text(markup).split()

STOP = set("""a an the and or of to in for on with is are was were be been being it its this that these
those as at by from into than then so if not no nor but also very can may might will would should
you your they their there here we our i he she his her him them do does did done have has had
each per which who whom whose what when where how why all any both few more most other some such
only own same too s t don now""".split())

def content_words(markup: str):
    """lowercased, punctuation-stripped words that carry meaning — the test for
    whether a restructure lost a FACT, as opposed to reordering wording."""
    from collections import Counter
    out = Counter()
    for w in words(markup):
        w = re.sub(r"^[^0-9a-z%<>=+/\u00b5\u2264\u2265-]+|[^0-9a-z%<>=+/\u00b5\u2264\u2265-]+$", "", w.lower())
        if not w or w in STOP: continue
        out[w] += 1
    return out

def compare(key, before, after):
    wb, wa = words(before), words(after)
    sm = difflib.SequenceMatcher(a=wb, b=wa, autojunk=False)
    lost, added = [], []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag in ('delete','replace'): lost.append(' '.join(wb[i1:i2]))
        if tag in ('insert','replace'): added.append(' '.join(wa[j1:j2]))
    cb, ca = content_words(before), content_words(after)
    dropped = {w:(n, ca.get(w,0)) for w,n in cb.items() if ca.get(w,0) < n}
    return {'key':key,'words_before':len(wb),'words_after':len(wa),
            'lost':[x for x in lost if x.strip()],'added':[x for x in added if x.strip()],
            'identical': wb == wa, 'dropped': dropped}

def main():
    a = json.load(open(sys.argv[1], encoding='utf-8'))
    b = json.load(open(sys.argv[2], encoding='utf-8'))
    argv = [x for x in sys.argv[3:] if x != '-v']
    verbose = '-v' in sys.argv
    keys = argv or sorted(set(a) | set(b))
    missing = [k for k in a if k not in b]
    extra   = [k for k in b if k not in a]
    if missing: print("!! NOTES REMOVED ENTIRELY:", missing)
    if extra:   print("++ notes added:", extra)
    bad = 0
    for k in keys:
        if k not in a or k not in b: continue
        if a[k] == b[k]: continue
        r = compare(k, a[k], b[k])
        if r['identical']:
            status = "TEXT IDENTICAL"
        elif not r['dropped']:
            status = "RESTRUCTURED — no content word lost"
        else:
            status = "!! CONTENT LOST"; bad += 1
        print(f"\n[{status}] {k}")
        print(f"    words {r['words_before']} -> {r['words_after']}")
        if r['dropped']:
            for w,(before_n,after_n) in sorted(r['dropped'].items()):
                print(f"    DROPPED: '{w}'  x{before_n} -> x{after_n}")
        elif not r['identical'] and verbose:
            for x in r['lost'][:8]:  print(f"    moved out : {x[:120]}")
            for x in r['added'][:8]: print(f"    moved in  : {x[:120]}")
    print(f"\n=== {len(keys)} keys checked · {bad} with CONTENT LOSS · "
          f"{len(missing)} notes removed")
    sys.exit(1 if (bad or missing) else 0)

main()
