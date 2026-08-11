-- ============================================================================
-- Update the day-pass caps: up to 6 topic unlocks per rolling 24h in total,
-- but no more than 3 from any single section (tab). The section is the first
-- segment of topic_key ("<tab>|<system>|<topic>").
-- Safe to run after 20260811000000_daily_unlocks.sql (create-or-replace).
-- ============================================================================

create or replace function public.consume_unlock(p_topic_key text)
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid       uuid := auth.uid();
  v_tab       text := split_part(p_topic_key, '|', 1);
  v_total     int;
  v_tab_count int;
  v_exists    boolean;
  v_total_limit constant int := 6;
  v_tab_limit   constant int := 3;
begin
  if v_uid is null then
    return json_build_object('ok', false, 'reason', 'not_authenticated');
  end if;
  if p_topic_key is null or length(trim(p_topic_key)) = 0 then
    return json_build_object('ok', false, 'reason', 'bad_key');
  end if;

  -- Already unlocked within the last 24h? -> allow, no new slot used.
  select exists(
    select 1 from public.daily_unlocks
     where user_id = v_uid and topic_key = p_topic_key
       and unlocked_at > now() - interval '24 hours'
  ) into v_exists;

  select count(*) from public.daily_unlocks
   where user_id = v_uid and unlocked_at > now() - interval '24 hours'
   into v_total;

  select count(*) from public.daily_unlocks
   where user_id = v_uid
     and split_part(topic_key, '|', 1) = v_tab
     and unlocked_at > now() - interval '24 hours'
   into v_tab_count;

  if v_exists then
    return json_build_object('ok', true, 'already', true,
      'remaining_total', greatest(0, v_total_limit - v_total),
      'remaining_tab',   greatest(0, v_tab_limit   - v_tab_count));
  end if;

  if v_total >= v_total_limit then
    return json_build_object('ok', false, 'reason', 'limit_total',
      'remaining_total', 0,
      'remaining_tab',   greatest(0, v_tab_limit - v_tab_count));
  end if;

  if v_tab_count >= v_tab_limit then
    return json_build_object('ok', false, 'reason', 'limit_tab',
      'remaining_total', greatest(0, v_total_limit - v_total),
      'remaining_tab',   0);
  end if;

  insert into public.daily_unlocks(user_id, topic_key) values (v_uid, p_topic_key);
  return json_build_object('ok', true, 'already', false,
    'remaining_total', greatest(0, v_total_limit - (v_total + 1)),
    'remaining_tab',   greatest(0, v_tab_limit   - (v_tab_count + 1)));
end;
$$;

grant execute on function public.consume_unlock(text) to authenticated;
