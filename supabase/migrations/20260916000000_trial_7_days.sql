-- ============================================================================
-- Shorten the free trial from 14 days to 7 days.
-- ----------------------------------------------------------------------------
-- Amends 20260911000000_profiles_free_trial.sql and
-- 20260911010000_trial_starts_on_confirmation.sql. Safe to run after them; safe
-- to re-run.
--
-- WHAT CHANGES: every place the trial length is computed server-side moves from
-- `interval '14 days'` to `interval '7 days'` — the column default, the
-- confirmation-aware guard trigger, and the start_trial_if_due() RPC. The logic
-- (server-computed, immutable to the client, started at email confirmation) is
-- unchanged; only the duration differs.
--
-- EXISTING TRIALS ARE UNTOUCHED: trial_ends_at is stamped once, at signup /
-- confirmation, and the trigger keeps it immutable thereafter. Anyone already on
-- a 14-day trial keeps their existing end date; only signups AFTER this migration
-- is applied get 7 days.
-- ============================================================================

-- 1) Column default (covers any insert path that bypasses the trigger).
alter table public.profiles
  alter column trial_ends_at set default (now() + interval '7 days');

-- 2) Confirmation-aware guard trigger — identical to the previous version except
--    the interval. Server-computed on insert, immutable thereafter, started at
--    email confirmation.
create or replace function public.profiles_guard_trial()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  confirmed timestamptz;
begin
  if current_user <> 'authenticated' then
    return new;
  end if;

  select u.email_confirmed_at into confirmed
    from auth.users u
   where u.id = new.id;

  if tg_op = 'INSERT' then
    new.trial_ends_at := case when confirmed is null
                              then null
                              else now() + interval '7 days'
                         end;
  else
    if old.trial_ends_at is null and confirmed is not null then
      new.trial_ends_at := now() + interval '7 days';
    else
      new.trial_ends_at := old.trial_ends_at;
    end if;
  end if;

  return new;
end;
$$;

-- 3) Deterministic safety-net RPC — same as before, 7 days. Only ever fills a
--    NULL, so it can never extend or revive an existing/expired trial.
create or replace function public.start_trial_if_due()
returns timestamptz
language plpgsql
security definer
set search_path = public
as $$
declare
  uid       uuid := auth.uid();
  confirmed timestamptz;
  ends      timestamptz;
begin
  if uid is null then
    return null;
  end if;

  select u.email_confirmed_at into confirmed from auth.users u where u.id = uid;
  if confirmed is null then
    return null;
  end if;

  update public.profiles
     set trial_ends_at = now() + interval '7 days'
   where id = uid and trial_ends_at is null
   returning trial_ends_at into ends;

  if ends is null then
    select p.trial_ends_at into ends from public.profiles p where p.id = uid;
  end if;

  return ends;
end;
$$;

revoke all on function public.start_trial_if_due() from public, anon;
grant execute on function public.start_trial_if_due() to authenticated;
