-- ============================================================================
-- Server-authoritative daily topic unlocks (day-pass) for DoctoRise
-- ----------------------------------------------------------------------------
-- Free (signed-in) accounts may unlock up to 3 locked topics per rolling 24h.
-- The cap is enforced SERVER-SIDE so it cannot be reset by clearing localStorage
-- or switching browser/device. Clients can read their own unlocks but can never
-- write the table directly — the only way to add a row is via consume_unlock(),
-- a SECURITY DEFINER function that checks the limit before inserting.
-- ============================================================================

create table if not exists public.daily_unlocks (
  id          bigint generated always as identity primary key,
  user_id     uuid not null references auth.users(id) on delete cascade,
  topic_key   text not null,                       -- "<tab>|<system>|<topic>"
  unlocked_at timestamptz not null default now()
);

create index if not exists daily_unlocks_user_time_idx
  on public.daily_unlocks (user_id, unlocked_at desc);

alter table public.daily_unlocks enable row level security;

-- A signed-in user may READ only their own unlock rows (to know what's active).
drop policy if exists "read own unlocks" on public.daily_unlocks;
create policy "read own unlocks"
  on public.daily_unlocks
  for select
  using (auth.uid() = user_id);

-- No insert/update/delete policies for authenticated users on purpose:
-- the only write path is consume_unlock() below, which enforces the cap.

-- ----------------------------------------------------------------------------
-- consume_unlock(topic_key): atomically spend one daily unlock, enforcing the
-- 3-per-rolling-24h cap. Returns JSON { ok, already, remaining, reason }.
--  * already unlocked within 24h -> ok:true, already:true (no new slot used)
--  * under the cap               -> inserts a row, ok:true
--  * at the cap                  -> ok:false, reason:'limit'
-- ----------------------------------------------------------------------------
create or replace function public.consume_unlock(p_topic_key text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid    uuid := auth.uid();
  v_active int;
  v_exists boolean;
  v_limit  constant int := 3;
begin
  if v_uid is null then
    return json_build_object('ok', false, 'reason', 'not_authenticated', 'remaining', 0);
  end if;
  if p_topic_key is null or length(trim(p_topic_key)) = 0 then
    return json_build_object('ok', false, 'reason', 'bad_key', 'remaining', 0);
  end if;

  select exists(
    select 1 from public.daily_unlocks
     where user_id = v_uid
       and topic_key = p_topic_key
       and unlocked_at > now() - interval '24 hours'
  ) into v_exists;

  select count(*) from public.daily_unlocks
   where user_id = v_uid
     and unlocked_at > now() - interval '24 hours'
   into v_active;

  if v_exists then
    return json_build_object('ok', true, 'already', true,
                             'remaining', greatest(0, v_limit - v_active));
  end if;

  if v_active >= v_limit then
    return json_build_object('ok', false, 'reason', 'limit', 'remaining', 0);
  end if;

  insert into public.daily_unlocks(user_id, topic_key) values (v_uid, p_topic_key);
  return json_build_object('ok', true, 'already', false,
                           'remaining', greatest(0, v_limit - (v_active + 1)));
end;
$$;

grant execute on function public.consume_unlock(text) to authenticated;
