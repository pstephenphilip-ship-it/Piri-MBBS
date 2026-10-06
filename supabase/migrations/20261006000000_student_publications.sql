-- ============================================================================
-- Student Publications: table + storage for shared student research
-- ----------------------------------------------------------------------------
-- Backs the "Student Publications" tab. Students (signed in) submit a PDF + metadata;
-- every submission lands as status='pending' and is only shown publicly once YOU approve
-- it (set status='approved'). Anyone can READ approved publications; a submitter can read
-- and delete their OWN rows (any status). Run this in the Supabase SQL editor.
--
-- Approving a submission:
--   update public.publications set status='approved' where id='<row id>';
-- Rejecting / hiding:
--   update public.publications set status='rejected' where id='<row id>';
-- ============================================================================

create extension if not exists pgcrypto;

create table if not exists public.publications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users(id) on delete cascade,
  title      text not null,
  authors    text not null,
  university text,
  ptype      text not null default 'Other'
             check (ptype in ('SSC','Dissertation','Audit','Case report','Research','Other')),
  year       int,
  abstract   text,
  file_path  text not null,
  status     text not null default 'pending'
             check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);

create index if not exists publications_status_idx  on public.publications (status, created_at desc);
create index if not exists publications_user_idx     on public.publications (user_id);

alter table public.publications enable row level security;

-- Anyone (incl. signed-out) may read APPROVED rows; a user may also read their own (any status).
drop policy if exists "read approved or own publications" on public.publications;
create policy "read approved or own publications" on public.publications
  for select using (status = 'approved' or auth.uid() = user_id);

-- A signed-in user may insert their OWN row, and only as 'pending' (never self-approve).
drop policy if exists "insert own pending publication" on public.publications;
create policy "insert own pending publication" on public.publications
  for insert to authenticated with check (auth.uid() = user_id and status = 'pending');

-- A user may delete their own submission.
drop policy if exists "delete own publication" on public.publications;
create policy "delete own publication" on public.publications
  for delete to authenticated using (auth.uid() = user_id);

-- (No UPDATE policy: approving/rejecting is done by you via the dashboard / service role.)

-- ---------------------------------------------------------------------------
-- Storage: a public-read bucket for the PDFs. Each file lives under <user_id>/...
-- so a user can only write/delete inside their own folder.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('publications', 'publications', true)
on conflict (id) do update set public = true;

drop policy if exists "publications read" on storage.objects;
create policy "publications read" on storage.objects
  for select using (bucket_id = 'publications');

drop policy if exists "publications upload own" on storage.objects;
create policy "publications upload own" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'publications' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "publications delete own" on storage.objects;
create policy "publications delete own" on storage.objects
  for delete to authenticated
  using (bucket_id = 'publications' and (storage.foldername(name))[1] = auth.uid()::text);
