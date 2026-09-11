#!/usr/bin/env python3
"""Refresh the flashcard / question counts in content/manifest.json.

Each manifest system points at content/cards/<slug>.json; this recounts that
file and writes the totals back. Nothing else in the manifest is touched — no
entries are added or removed — so it is safe to re-run after a content drop.

    python3 tools/refresh-manifest-counts.py [--check]

--check reports drift and exits non-zero without writing, for CI.

The "version" field is a content hash produced by the full
tools/split_content.py pipeline and is deliberately left alone here: this
reconciles counts against the card files, it does not rebuild content.
"""
import json, sys, pathlib

ROOT = pathlib.Path(__file__).resolve().parent.parent
MF = ROOT / "content" / "manifest.json"
CARDS = ROOT / "content" / "cards"

def counts(slug):
    p = CARDS / f"{slug}.json"
    if not p.exists():
        return None
    d = json.loads(p.read_text())
    return (sum(len(v) for v in d.get("fc", {}).values()),
            sum(len(v) for v in d.get("q", {}).values()))

def main():
    check = "--check" in sys.argv
    mf = json.loads(MF.read_text())
    drift, missing = [], []

    for s in mf.get("systems", []):
        got = counts(s["slug"])
        if got is None:
            missing.append(f'{s["name"]} ({s["slug"]}.json)')
            continue
        fc, q = got
        if fc != s.get("fcards") or q != s.get("qcards"):
            drift.append(f'  {s["name"][:36]:<38} fc {s.get("fcards"):>5} -> {fc:<5} q {s.get("qcards"):>5} -> {q}')
            if not check:
                s["fcards"], s["qcards"] = fc, q

    for line in drift:
        print(line)
    if missing:
        print("\nmanifest entries with no card file:")
        for m in missing:
            print("  " + m)

    tf = sum(s.get("fcards", 0) for s in mf.get("systems", []))
    tq = sum(s.get("qcards", 0) for s in mf.get("systems", []))
    print(f"\ntotals: {tf:,} flashcards, {tq:,} questions across {len(mf.get('systems', []))} systems")

    if check:
        print(f"\n{len(drift)} system(s) adrift" if drift else "\nmanifest matches the card files")
        sys.exit(1 if drift else 0)

    if drift:
        # Match tools/split_content.py byte for byte, so the diff is the
        # counts and nothing else.
        MF.write_text(json.dumps(mf, ensure_ascii=False, indent=1))
        print(f"wrote {MF.relative_to(ROOT)} ({len(drift)} system(s) updated)")
    else:
        print("nothing to do")

if __name__ == "__main__":
    main()
