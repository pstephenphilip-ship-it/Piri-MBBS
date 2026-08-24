-- ============================================================================
-- Cross-device progress sync table.
-- ----------------------------------------------------------------------------
-- The app mirrors the whole piri_* localStorage namespace (bookmarks, planner
-- notes, study streaks, mock history, day-pass cache, etc.) into ONE JSON blob
-- per user. The client upserts the blob and reads it back on another device:
--
--   sb.from('user_progress').select('data,updated_at').eq('user_id', uid).maybeSingle()
--   sb.from('user_progress').upsert({ user_id, data, updated_at })   -- conflict on user_id
--
-- Without this table (and its RLS policies) every one of those calls silently
-- errors and the client swallows it, so nothing ever leaves the device — notes
-- appear to "save on one device regardless of which account is logged in".
--
-- user_id is the PRIMARY KEY so the client's upsert (no explicit onConflict)
-- resolves to insert-or-update on that key instead of creating duplicate rows.
-- ============================================================================

create table if not exists public.user_progress (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  data       jsonb       not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- RLS: a signed-in user may read/write ONLY their own row.
alter table public.user_progress enable row level security;

drop policy if exists "user_progress_select_own" on public.user_progress;
create policy "user_progress_select_own" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "user_progress_insert_own" on public.user_progress;
create policy "user_progress_insert_own" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "user_progress_update_own" on public.user_progress;
create policy "user_progress_update_own" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
