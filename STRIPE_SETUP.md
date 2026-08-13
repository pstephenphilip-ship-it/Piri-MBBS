# Stripe membership — setup guide

This wires **Stripe subscriptions → Supabase → the app's Membership panel**.
The code is already in the repo; the steps below are the parts only you can do
(they involve your Stripe account and secret keys, which must never live in the
shipped `index.html`).

Approach: **Stripe Payment Link** (hosted checkout, no secret key in the
browser) + a **Supabase webhook** that grants/revokes membership.

---

## 1. Database (once)

Run the migration against your Supabase project (SQL editor → paste, or CLI):

```
supabase/migrations/20260712000000_memberships.sql
```

This creates `public.memberships` with row-level security so a user can read
**only their own** row and can **never** write it — only the webhook (service
role) can grant membership.

## 2. Stripe product + three prices + three Payment Links

Create **one product** ("DoctoRise Premium") with **three recurring prices**,
then a Payment Link for each. All prices are GBP (£).

| Plan      | Amount  | Billing period          | Works out as |
|-----------|---------|-------------------------|--------------|
| Monthly   | £8.99   | every **1 month**       | £8.99/mo     |
| 3 months  | £20.00  | every **3 months**      | ≈£6.67/mo    |
| Yearly    | £60.00  | every **12 months**     | £5.00/mo     |

1. Stripe Dashboard → **Product catalog** → add product "DoctoRise Premium".
2. Add **three recurring prices** to that product:
   - £8.99 / month
   - £20.00 every 3 months (set the billing period to "3 months")
   - £60.00 / year
3. For **each** price, copy its **Price ID** (`price_...`) — you'll paste these
   into the config so the app shows the right plan name.
4. **Payment Links** → create one link **per price** (three links total).
   - Under **After payment**, redirect back to `https://doctorise.co.uk`.
5. Copy the three link URLs — each looks like `https://buy.stripe.com/xxxxxxxx`.

> The `stripe-webhook` function records whichever price the customer bought, so
> it needs **no changes** for multiple tiers — it works for any number of prices.

## 3. Deploy the functions

```bash
# Grants/revokes membership when Stripe fires events:
supabase functions deploy stripe-webhook --no-verify-jwt

# (Optional) lets members open Stripe's manage-subscription portal:
supabase functions deploy billing-portal
```

Set the secrets (these stay on Supabase — never in the app):

```bash
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
supabase secrets set STRIPE_WEBHOOK_SECRET=whsec_xxx   # from step 4
```

`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, and `SUPABASE_ANON_KEY` are
provided automatically to Edge Functions.

## 4. Point Stripe at the webhook

1. Stripe Dashboard → **Developers → Webhooks → Add endpoint**.
2. URL: `https://ynkyqovqlfmnpkdsaonu.functions.supabase.co/stripe-webhook`
3. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copy the **Signing secret** (`whsec_...`) → that's `STRIPE_WEBHOOK_SECRET`
   in step 3.

## 5. Turn it on in the app

Edit the config block in `index.html` (search for `__PIRI_BILLING`). Paste each
plan's **Payment Link** into `paymentLink` and its **Price ID** into `priceId`:

```js
window.__PIRI_BILLING = {
  currency:      "£",
  functionsBase: "https://ynkyqovqlfmnpkdsaonu.functions.supabase.co",
  portalEnabled: true,   // true only if you deployed billing-portal in step 3
  plans: [
    { key:"monthly",   label:"Monthly",  amount:8.99,  period:"month",    perMonth:8.99,
      billedNote:"Billed £8.99 each month",
      paymentLink:"https://buy.stripe.com/AAAA",  priceId:"price_monthly_id" },
    { key:"quarterly", label:"3 months", amount:20.00, period:"3 months", perMonth:6.67,
      billedNote:"Billed £20 every 3 months", tag:"Save ~26%",
      paymentLink:"https://buy.stripe.com/BBBB",  priceId:"price_quarterly_id" },
    { key:"yearly",    label:"Yearly",   amount:60.00, period:"year",     perMonth:5.00,
      billedNote:"Billed £60 every 12 months", tag:"Best value · Save ~44%", highlight:true,
      paymentLink:"https://buy.stripe.com/CCCC",  priceId:"price_yearly_id" }
  ]
};
```

- `paymentLink` — where the "Choose <plan>" button sends the user (required for
  a plan to appear). `priceId` — used to display the correct plan name on an
  active member's panel (optional but recommended).
- The **Membership** tab in Settings shows the three pricing cards to signed-in
  non-members. Until **every** `paymentLink` is blank the panel just shows
  "Premium plans & billing are coming soon." — so the app is safe to ship at any
  point during setup. You can also go live with only some plans filled in; only
  plans that have a `paymentLink` are shown.

### Test links vs live links (safety gate)

A **test** Payment Link (`https://buy.stripe.com/test_…`) is only shown when you
opt in by visiting the site with **`?billing=test`** on the URL once (it then
sticks on that device via localStorage; clear it with `?billing=off`). Real
visitors never see a test checkout in production. **Live** links
(`https://buy.stripe.com/…`, no `test_`) are shown to everyone normally.

So the flow is: paste your **test** links now → test on the real site with
`?billing=test` → once verified, replace them with the **live** links, which go
live for all users automatically.

**Give me the three Payment Link URLs (and Price IDs) and I'll plug them in + verify the flow.**

---

## How it flows

1. Signed-in user picks a plan (**Monthly / 3 months / Yearly**) → sent to that
   plan's Payment Link with their Supabase user id as `client_reference_id`.
2. They pay on Stripe's hosted page.
3. Stripe calls `stripe-webhook` → it upserts their `memberships` row to
   `status = active`.
4. The app reads that row → `window.__isMember()` returns `true`, the panel
   shows **Premium**.
5. On cancel/expiry, Stripe fires `customer.subscription.deleted/updated` →
   the webhook sets `status = canceled` → membership drops.

## Testing without real cards

Use Stripe **test mode**: test keys, a test Payment Link, and card
`4242 4242 4242 4242`. `stripe listen --forward-to <webhook-url>` replays
events locally.

## Note on content protection

All notes/MCQs/flashcards currently ship inside `index.html`, so the lock is
client-side (a deterrent, standard for launch — not tamper-proof). If piracy
becomes a real problem later, the fix is to serve premium content from the
backend only after checking membership. Not needed now.
