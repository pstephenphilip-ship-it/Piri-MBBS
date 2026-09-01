-- ============================================================================
-- Referral tracking for university-society partnerships.
-- ----------------------------------------------------------------------------
-- Two nullable columns on the profile row capture where a new signup was
-- referred from: which partner university and which of its societies. They are
-- set at signup from the dropdowns on the sign-up form (best-effort, via the
-- client), so both are optional and default to NULL for organic signups.
--
-- Until this migration is applied the client simply keeps the pending referral
-- in localStorage and retries on the next login, so signups never break.
--
-- To see referral counts once data is flowing:
--   select ref_university, ref_society, count(*)
--   from public.profiles
--   where ref_university is not null or ref_society is not null
--   group by ref_university, ref_society
--   order by count(*) desc;
-- ============================================================================

alter table public.profiles add column if not exists ref_university text;
alter table public.profiles add column if not exists ref_society   text;
