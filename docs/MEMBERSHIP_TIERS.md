# Membership access tiers — target model (FUTURE)

> Status: **not yet enforced.** Right now the app runs the pre-existing model:
> anonymous visitors get a small free preview, and **any signed-in account gets
> everything**. Stripe/membership plumbing is being added first; the per-tier
> content locks below are the agreed target to switch on afterwards.

The 8 tabs: `Conditions · Anatomy · Histology · Signs & Symptoms ·
Investigations · OSCE · Pharmacology · Calculator`.

Each Conditions/Anatomy topic has up to three content modes: **Notes**,
**Flashcards**, **MCQs**.

## Tier 1 — No account (anonymous)

- **Conditions:** first **1–3 conditions per system** — full access (Notes +
  Flashcards + MCQs) for those only.
- **Anatomy:** all of **Upper Limb** (every subtab, notes + decks). All other
  regions locked.
- **Pharmacology** tab: **fully unlocked.**
- **Calculator** tab: **fully unlocked.**
- **Histology, Signs & Symptoms, Investigations, OSCE:** **fully locked.**

## Tier 2 — Free account (signed in, not paying)

- Everything Tier 1 has, **plus**:
- **All Notes** across every Conditions system (but **not** their Flashcards/
  MCQs, except the Tier-1 free ones).
- **All Anatomy notes** (every region) (but **not** anatomy Flashcards/MCQs,
  except the Tier-1 free ones).
- **Open question to confirm before enforcing:** whether a free account also
  unlocks Histology / Signs / Investigations / OSCE (treated as "notes"), or
  those stay membership-only. (Leaning: membership-only, to give a reason to
  upgrade — confirm with owner.)

## Tier 3 — Membership (paid)

- **Everything.**

## Where to implement

The single gate is `isUnlocked(p, system, topic)` in the "Freemium gating"
`<script>` block in `index.html`. To switch this model on it needs to become
aware of:

1. **Membership** — `window.__isMember()` (already wired) as the Tier-3 check.
2. **Content mode** — Notes vs Flashcards vs MCQs (currently `switchMode`
   gates the whole topic; needs a per-mode signal).
3. **Tab identity** — Pharmacology/Calculator always-free; Histology/Signs/
   Investigations/OSCE locked below Tier 3.
4. **Anatomy region** — Upper Limb free at Tier 1; all region **notes** free at
   Tier 2.

The current `FREE_CONDITIONS` / `FREE_SECTIONS` / `FREE_N_OTHER` constants are
the seam to extend.
