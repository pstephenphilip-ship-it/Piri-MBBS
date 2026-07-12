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

## 2. Stripe product + Payment Link

1. Stripe Dashboard → **Product catalog** → add a product (e.g. "DoctoRise
   Premium"), with a **recurring price** (monthly and/or yearly).
2. **Payment Links** → create a link for that price.
   - Under **After payment**, set a confirmation/redirect back to
     `https://doctorise.co.uk` (or your domain).
3. Copy the link URL — looks like `https://buy.stripe.com/xxxxxxxx`.

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

Edit the config block in `index.html` (search for `__PIRI_BILLING`):

```js
window.__PIRI_BILLING = {
  paymentLink:  "https://buy.stripe.com/xxxxxxxx",  // from step 2
  priceLabel:   "Premium",
  functionsBase:"https://ynkyqovqlfmnpkdsaonu.functions.supabase.co",
  portalEnabled:true   // true only if you deployed billing-portal in step 3
};
```

Until `paymentLink` is filled in, the Membership panel just shows
"Premium plans & billing are coming soon." — so the app is safe to ship at any
point during setup.

**Give me the Payment Link URL and I'll plug it in + verify the flow.**

---

## How it flows

1. Signed-in user clicks **Upgrade** → sent to the Payment Link with their
   Supabase user id as `client_reference_id`.
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
