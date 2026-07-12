-- ============================================================================
-- Membership / subscription state for DoctoRise (Piri-MBBS)
-- ----------------------------------------------------------------------------
-- One row per user. Written ONLY by the Stripe webhook (service role, which
-- bypasses RLS). The browser client can read its own row but can never write
-- it, so a user cannot grant themselves membership from the front-end.
-- ============================================================================

create table if not exists public.memberships (
  user_id               uuid primary key references auth.users(id) on delete cascade,
  status                text,                       -- active | trialing | past_due | canceled | incomplete | null
  plan                  text,                       -- e.g. 'premium_monthly'
  stripe_customer_id    text,
  stripe_subscription_id text,
  current_period_end    timestamptz,
  updated_at            timestamptz not null default now()
);

-- Fast lookup from a Stripe customer id (used by subscription.updated/deleted).
create index if not exists memberships_stripe_customer_idx
  on public.memberships (stripe_customer_id);

alter table public.memberships enable row level security;

-- A signed-in user may read ONLY their own membership row.
drop policy if exists "read own membership" on public.memberships;
create policy "read own membership"
  on public.memberships
  for select
  using (auth.uid() = user_id);

-- No insert/update/delete policies for authenticated users on purpose:
-- the service-role key used by the webhook bypasses RLS, so only the
-- server can mutate membership state.
