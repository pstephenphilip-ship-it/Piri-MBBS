-- ============================================================================
-- Rename the Korean Society affiliate: QMKSOC -> BARTSKSOC
-- ----------------------------------------------------------------------------
-- Supersedes 20260919000000_affiliate_qmksoc.sql. There are two Korean societies
-- at QMUL, so this partner uses a Barts-specific code to disambiguate.
-- `code` is the primary key, so this removes the old row and inserts the new one.
-- Safe to run whether or not QMKSOC was ever applied; safe to re-run.
-- ============================================================================

delete from public.affiliates where code = 'QMKSOC';

insert into public.affiliates (code, name, type) values
  ('BARTSKSOC', 'Barts Korean Society', 'society')
on conflict (code) do update
  set name = excluded.name, type = excluded.type, active = true;
