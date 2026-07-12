// ============================================================================
// Stripe webhook -> Supabase membership sync   (Supabase Edge Function, Deno)
// ----------------------------------------------------------------------------
// Grants membership when a subscription becomes active, and revokes it when it
// lapses/cancels. Writes with the SERVICE ROLE key (bypasses RLS), so this is
// the ONLY thing that can change a user's membership.
//
// Required function secrets (set with `supabase secrets set ...`):
//   STRIPE_SECRET_KEY            sk_live_... / sk_test_...
//   STRIPE_WEBHOOK_SECRET        whsec_...   (from the webhook endpoint)
//   SUPABASE_URL                 (auto-provided by the platform)
//   SUPABASE_SERVICE_ROLE_KEY    (auto-provided by the platform)
//
// Deploy WITHOUT JWT verification (Stripe calls it, not a signed-in user):
//   supabase functions deploy stripe-webhook --no-verify-jwt
// ============================================================================

import Stripe from "https://esm.sh/stripe@16?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});
const cryptoProvider = Stripe.createSubtleCryptoProvider();
const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET")!;

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

const ACTIVE = new Set(["active", "trialing"]);

async function upsertMembership(row: Record<string, unknown>) {
  const { error } = await admin
    .from("memberships")
    .upsert({ ...row, updated_at: new Date().toISOString() }, { onConflict: "user_id" });
  if (error) console.error("upsert membership failed:", error);
}

// Resolve our Supabase user id from a Stripe customer id (for subscription.*).
async function userIdForCustomer(customerId: string): Promise<string | null> {
  const { data } = await admin
    .from("memberships")
    .select("user_id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  return data?.user_id ?? null;
}

Deno.serve(async (req) => {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();
  let event: Stripe.Event;
  try {
    event = await stripe.webhooks.constructEventAsync(body, sig!, webhookSecret, undefined, cryptoProvider);
  } catch (err) {
    console.error("signature verification failed:", (err as Error).message);
    return new Response("Bad signature", { status: 400 });
  }

  try {
    switch (event.type) {
      // Fired when someone completes checkout via the Payment Link.
      // We pass the Supabase user id as `client_reference_id` on the link.
      case "checkout.session.completed": {
        const s = event.data.object as Stripe.Checkout.Session;
        const userId = s.client_reference_id;
        if (!userId) { console.warn("checkout.session.completed with no client_reference_id"); break; }
        let periodEnd: string | null = null;
        let plan: string | null = null;
        if (s.subscription) {
          const sub = await stripe.subscriptions.retrieve(s.subscription as string);
          periodEnd = new Date(sub.current_period_end * 1000).toISOString();
          plan = sub.items.data[0]?.price?.id ?? null;
        }
        await upsertMembership({
          user_id: userId,
          status: "active",
          plan,
          stripe_customer_id: (s.customer as string) ?? null,
          stripe_subscription_id: (s.subscription as string) ?? null,
          current_period_end: periodEnd,
        });
        break;
      }

      // Ongoing lifecycle: renewals, cancellations, payment failures, etc.
      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const userId = await userIdForCustomer(sub.customer as string);
        if (!userId) { console.warn("no user for customer", sub.customer); break; }
        const status = event.type === "customer.subscription.deleted" ? "canceled" : sub.status;
        await upsertMembership({
          user_id: userId,
          status,
          plan: sub.items.data[0]?.price?.id ?? null,
          stripe_customer_id: sub.customer as string,
          stripe_subscription_id: sub.id,
          current_period_end: new Date(sub.current_period_end * 1000).toISOString(),
        });
        break;
      }

      default:
        // Unhandled event types are fine — just acknowledge them.
        break;
    }
  } catch (err) {
    console.error("handler error:", (err as Error).message);
    return new Response("Handler error", { status: 500 });
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});

// Note: `active` in this app = status ∈ {active, trialing}. See ACTIVE above;
// the front-end applies the same rule when reading the row.
export { ACTIVE };
