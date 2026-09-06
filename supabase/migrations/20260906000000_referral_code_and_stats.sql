-- ============================================================================
-- Referral code + per-code reporting (societies AND individuals)
-- ----------------------------------------------------------------------------
-- profiles.ref_code holds a single free-text affiliate code (a society OR a
-- person). This migration adds that column, a small price lookup, and an
-- admin-only view that rolls up sign-ups and current subscription revenue per
-- code.
--
-- NOTE ON "revenue": Supabase stores only the CURRENT subscription (plan +
-- status), not the full payment history — so the money figures here are the
-- value of ACTIVE subscriptions attributable to a code (a live run-rate / MRR),
-- not lifetime cash collected. Lifetime cash lives in Stripe.
-- ============================================================================

-- 1) The referral code on each profile (set at signup / in Edit profile).
alter table public.profiles add column if not exists ref_code text;

-- 2) Map each Stripe PRICE ID -> its GBP amount and billing period so revenue
--    can be computed. memberships.plan stores the Stripe price id (price_...),
--    so fill these with YOUR three real price ids — the same values you paste
--    into the app's __PIRI_BILLING config. Re-run this INSERT if prices change.
create table if not exists public.plan_prices (
  price_id      text primary key,
  label         text,
  amount_gbp    numeric(10,2) not null,
  period_months integer       not null check (period_months > 0)
);

insert into public.plan_prices (price_id, label, amount_gbp, period_months) values
  ('price_REPLACE_MONTHLY',   'Monthly',   8.99,  1),
  ('price_REPLACE_QUARTERLY', '3 months', 20.00,  3),
  ('price_REPLACE_YEARLY',    'Yearly',   60.00, 12)
on conflict (price_id) do update
  set label = excluded.label,
      amount_gbp = excluded.amount_gbp,
      period_months = excluded.period_months;

-- 3) The report: one row per code.
--    signups            = everyone who signed up with that code
--    active_members     = of those, how many currently have an active/trialing sub
--    mrr_gbp            = monthly-equivalent recurring revenue from those active subs
--    billed_per_period_gbp = sum of what those active members are billed each period
create or replace view public.referral_stats as
select
  p.ref_code                                                        as code,
  count(*)                                                          as signups,
  count(*) filter (where m.status in ('active','trialing'))         as active_members,
  round(coalesce(sum(pp.amount_gbp / pp.period_months)
        filter (where m.status in ('active','trialing')), 0), 2)    as mrr_gbp,
  round(coalesce(sum(pp.amount_gbp)
        filter (where m.status in ('active','trialing')), 0), 2)    as billed_per_period_gbp
from public.profiles p
left join public.memberships m on m.user_id = p.id
left join public.plan_prices pp on pp.price_id = m.plan
where p.ref_code is not null and p.ref_code <> ''
group by p.ref_code
order by active_members desc, signups desc;

-- 4) Keep these out of the public API — dashboard / service-role only, never
--    exposed to signed-in or anonymous clients.
revoke all on public.referral_stats from anon, authenticated;
revoke all on public.plan_prices   from anon, authenticated;
