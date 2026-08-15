-- Single trusted device per account (new-device email-code gate).
-- The client stores the account's one trusted device in profiles.trusted_device and
-- updates it when a new device is verified. This migration adds the columns and the
-- row-level-security policy that lets a signed-in user read/update ONLY their own row,
-- so the trusted-device claim can actually persist (without it, the claim silently fails
-- and the app keeps re-prompting on every login).

-- 1) Columns (safe to re-run)
alter table public.profiles add column if not exists trusted_device    text;
alter table public.profiles add column if not exists trusted_device_at timestamptz;

-- 2) Make sure RLS is on
alter table public.profiles enable row level security;

-- 3) A user may read their own profile row
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

-- 4) A user may update their own profile row (this is what the trusted-device claim needs)
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Note: this assumes profiles.id = auth.users.id (the app queries .eq('id', user.id)).
-- If your profiles primary key column is named differently, adjust auth.uid() = id accordingly.
