// ============================================================================
// Stripe Billing Portal session   (Supabase Edge Function, Deno)
// ----------------------------------------------------------------------------
// Lets a signed-in member open Stripe's hosted "manage subscription" portal
// (update card, cancel, view invoices). The caller must send their Supabase
// access token as a Bearer header; we look up their Stripe customer id from
// the memberships table and return a portal URL to redirect to.
//
// Required function secrets:
//   STRIPE_SECRET_KEY            sk_live_... / sk_test_...
//   SUPABASE_URL                 (auto-provided)
//   SUPABASE_SERVICE_ROLE_KEY    (auto-provided)
//   SUPABASE_ANON_KEY            (auto-provided)
//
// Deploy (JWT verification ON — a signed-in user calls this):
//   supabase functions deploy billing-portal
// ============================================================================

import Stripe from "https://esm.sh/stripe@16?target=deno";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const json = (b: unknown, s = 200) =>
    new Response(JSON.stringify(b), { status: s, headers: { ...cors, "Content-Type": "application/json" } });

  try {
    const token = (req.headers.get("Authorization") || "").replace("Bearer ", "");
    if (!token) return json({ error: "Not signed in" }, 401);

    // Identify the caller from their access token.
    const authed = createClient(SUPABASE_URL, ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false },
    });
    const { data: { user }, error: uErr } = await authed.auth.getUser();
    if (uErr || !user) return json({ error: "Not signed in" }, 401);

    // Look up their Stripe customer id (service role — bypasses RLS).
    const admin = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false } });
    const { data: row } = await admin
      .from("memberships")
      .select("stripe_customer_id")
      .eq("user_id", user.id)
      .maybeSingle();

    if (!row?.stripe_customer_id) return json({ error: "No subscription found" }, 404);

    const origin = req.headers.get("Origin") || "https://doctorise.co.uk";
    const session = await stripe.billingPortal.sessions.create({
      customer: row.stripe_customer_id,
      return_url: origin,
    });
    return json({ url: session.url });
  } catch (err) {
    console.error("portal error:", (err as Error).message);
    return json({ error: "Server error" }, 500);
  }
});
