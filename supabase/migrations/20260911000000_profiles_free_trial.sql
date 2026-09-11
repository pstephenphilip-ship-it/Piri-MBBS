-- ============================================================================
-- 14-day free trial for new signups — no Stripe involvement.
-- ----------------------------------------------------------------------------
-- WHY NOT STRIPE: a Stripe trial normally needs a card up front, which costs a
-- large share of trial starts in a student market. A card-free Stripe trial
-- requires creating the subscription with the secret key server-side, and this
-- project deliberately has no server (Payment Links exist so no secret key ever
-- touches the browser). So the trial lives here instead.
--
-- WHY NOT THE `memberships` TABLE: that table is written ONLY by the Stripe
-- webhook, and the client reads `status` WITHOUT checking `current_period_end`
-- (see __isMember / loadMembership in index.html) — so a row with
-- status='trialing' would never expire. Keep Stripe's table Stripe's.
--
-- THE TRAP THIS SOLVES: `profiles_update_own` lets a signed-in user update
-- their own profile row (the trusted-device claim needs it), and the profile row
-- is INSERTED BY THE CLIENT, not by a trigger on auth.users. So a plain column
-- would let anyone set their own trial to the year 3000 from the browser
-- console. The trigger below makes the value server-computed on insert and
-- immutable thereafter, for callers using the `authenticated` role.
--
-- Until this migration is applied the client simply sees no `trial_ends_at`
-- and behaves exactly as it does today, so shipping the two in either order is
-- safe.
-- ============================================================================

-- 1) The column. The default covers any path that does not go through the
--    trigger, and documents the trial length in one place.
alter table public.profiles
  add column if not exists trial_ends_at timestamptz default (now() + interval '14 days');

-- 2) Server-side guard. Column-level GRANT/REVOKE is not used here because the
--    full `profiles` column list is not known to this migration, and any column
--    added later would silently lose its privilege. A trigger is schema-agnostic.
create or replace function public.profiles_guard_trial()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Service-role and superuser callers (the Stripe webhook, the SQL editor,
  -- admin scripts) pass straight through, so you can still grant, extend or
  -- clear a trial by hand. Only the browser's `authenticated` role is guarded.
  if current_user <> 'authenticated' then
    return new;
  end if;

  if tg_op = 'INSERT' then
    -- Always server-computed: whatever the client sent is discarded.
    new.trial_ends_at := now() + interval '14 days';
  else
    -- Immutable after creation: the client cannot extend its own trial.
    new.trial_ends_at := old.trial_ends_at;
  end if;

  return new;
end;
$$;

drop trigger if exists profiles_guard_trial on public.profiles;
create trigger profiles_guard_trial
  before insert or update on public.profiles
  for each row execute function public.profiles_guard_trial();

-- ----------------------------------------------------------------------------
-- EXISTING USERS get nothing: the trigger fires on insert, and rows that
-- already exist keep trial_ends_at = NULL, which the client reads as "no
-- trial". To give the current free users a trial too, run this ONCE:
--
--   update public.profiles
--      set trial_ends_at = now() + interval '14 days'
--    where trial_ends_at is null;
--
-- (Run it from the SQL editor, which is not the `authenticated` role, so the
-- trigger lets it through.)
--
-- To grant or extend one person:
--   update public.profiles set trial_ends_at = now() + interval '30 days'
--    where id = '<user-uuid>';
--
-- To end someone's trial now:
--   update public.profiles set trial_ends_at = now() where id = '<user-uuid>';
--
-- To see trials in flight:
--   select id, username, trial_ends_at
--     from public.profiles
--    where trial_ends_at > now()
--    order by trial_ends_at;
-- ----------------------------------------------------------------------------
