-- ============================================================================
-- Start the 14-day trial at EMAIL CONFIRMATION, not at signup.
-- ----------------------------------------------------------------------------
-- Amends 20260911000000_profiles_free_trial.sql. Safe to run after it; safe to
-- re-run.
--
-- THE PROBLEM: with email confirmation ON, the profile row may be created at
-- one of two different moments depending on a project setting this migration
-- cannot see:
--
--   * NO `handle_new_user` trigger on auth.users — the row is inserted by the
--     client in ensureProfile(), which only runs once there is a session, i.e.
--     AFTER the user confirms and signs in. The original trigger is correct.
--
--   * WITH a `handle_new_user` trigger (the app's own code comments note this
--     is common) — the row is created at signup, BEFORE confirmation. The
--     original trigger would start the clock there, so someone who takes three
--     days to click the confirmation link arrives with 11 days left.
--
-- THE FIX: stamp trial_ends_at only once auth.users.email_confirmed_at is set.
-- An unconfirmed insert leaves it NULL, and the trial begins at the first
-- profile write after confirmation. This is correct under BOTH arrangements,
-- and stays correct if email confirmation is later switched off (in that case
-- the user is confirmed at signup, so the clock starts immediately).
-- ============================================================================

create or replace function public.profiles_guard_trial()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  confirmed timestamptz;
begin
  -- Service-role / superuser callers pass straight through, so trials can still
  -- be granted, extended or ended by hand from the SQL editor.
  if current_user <> 'authenticated' then
    return new;
  end if;

  select u.email_confirmed_at into confirmed
    from auth.users u
   where u.id = new.id;

  if tg_op = 'INSERT' then
    -- Unconfirmed signups get no clock yet; confirmed ones start immediately.
    new.trial_ends_at := case when confirmed is null
                              then null
                              else now() + interval '14 days'
                         end;
  else
    -- Immutable once set. If it was never set (the row was created before the
    -- user confirmed), start it now that they are confirmed.
    if old.trial_ends_at is null and confirmed is not null then
      new.trial_ends_at := now() + interval '14 days';
    else
      new.trial_ends_at := old.trial_ends_at;
    end if;
  end if;

  return new;
end;
$$;

-- ----------------------------------------------------------------------------
-- Safety net. The UPDATE branch above only fires if something actually writes
-- to the profile row after confirmation. ensureProfile() only does that when it
-- has pending signup data in localStorage — so a user who signs up on their
-- phone and confirms on a laptop could otherwise never get a trial.
--
-- This RPC starts the trial deterministically for the CURRENT user, once, and
-- is safe to call on every sign-in. It is SECURITY DEFINER, so its own UPDATE
-- runs as the function owner and is not blocked by the guard above.
-- ----------------------------------------------------------------------------
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
    return null;                                  -- not signed in
  end if;

  select u.email_confirmed_at into confirmed from auth.users u where u.id = uid;
  if confirmed is null then
    return null;                                  -- not confirmed yet
  end if;

  -- Only ever fills a NULL: it can never extend an existing or expired trial.
  update public.profiles
     set trial_ends_at = now() + interval '14 days'
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
