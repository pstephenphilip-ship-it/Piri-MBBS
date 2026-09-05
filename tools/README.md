# Content tooling

The app loads content on demand: `index.html` is a ~1.6 MB shell, and the notes /
flashcards / MCQs live in per-system JSON under `content/`, fetched when a system
is opened. **Add content to the JSON files, not to `index.html`.**

## Layout

```
content/
  manifest.json            index: version, slugMap (system name -> slug), per-system counts
  notes/<slug>.json        { "SYSTEM__Topic": "<note html>" }
  cards/<slug>.json        { "fc": { "conditions__SYSTEM__Topic": [ ... ] },
                             "q":  { "conditions__SYSTEM__Topic": [ ... ] } }
  subnav.json              precomputed sub-topic search aliases
img/                       note images externalised from base64
```

Flashcard: `{ "id", "front", "back" }`
MCQ: `{ "id", "type":"mcq", "question", "options":[5], "correctIndex", "answer", "explanation" }`
IDs: `piri_fc__conditions__SYSTEM__IDBASE__0001`, `piri_q__conditions__SYSTEM__IDBASE__0001`

## Adding a topic (the current workflow)

Use `add_content.add_topic` — it appends to the right `content/*.json`, registers a
new topic in `CONDITIONS_SYSTEMS` (so it shows in the sidebar), externalises any
base64 images, and refreshes `manifest.json` + `subnav.json`. Appends are
collision-safe and never erase an existing deck.

```python
import sys; sys.path.insert(0, 'tools')
from add_content import add_topic

add_topic(
    system="CARDIOVASCULAR",
    topic="Infective Endocarditis",
    idbase="IE",
    note_html="<div class=...>...</div>",     # optional
    FC=[("front", "back"), ...],               # optional
    Q=[("question", [o1,o2,o3,o4,o5], correctIndex, "explanation"), ...],  # optional
)
```

To append more cards to an existing topic, call again with the same `system` /
`topic` / `idbase`; IDs continue past the existing ones.

## Reformatting a note without losing content

`contentcheck.py` proves a layout edit changed only the *structure* of a note,
never its words. Keep a copy of the file before you touch it, then:

```
python3 tools/contentcheck.py before.json content/notes/<file>.json          # every key
python3 tools/contentcheck.py before.json content/notes/<file>.json "KEY"    # one key
```

It strips markup and entities, then compares the visible words two ways: the
word sequence (so you can see what moved) and a content-word multiset with
stopwords filtered (so any word whose count dropped is flagged). It exits 1 on
loss, so it drops straight into a pre-commit hook or CI.

Statuses: `TEXT IDENTICAL` · `RESTRUCTURED — no content word lost` ·
`!! CONTENT LOST`. Run it before every note-layout commit.

One thing it cannot check: a reader's saved highlight is re-anchored by
searching the rendered note for the exact phrase it covered (see
`annotHighlightOne` in `index.html`). Their typed note always survives — it
lives in `localStorage` and still shows in My Notes — but the yellow marker
stops painting if you reword or split the sentence it sat on. Move whole
sentences rather than chopping them where you can.

## Regenerating / re-wiring (only if you change the shell architecture)

- `split_content.py` — regenerate `content/` + `img/` from a full (unslimmed) `index.html`.
- `wire_shell.py` — slim a full `index.html` into the on-demand shell (idempotent-guarded).

These are one-time build steps; day-to-day content work only needs `add_content.py`.
