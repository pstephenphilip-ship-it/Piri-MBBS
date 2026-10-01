-- ============================================================================
-- Add KCL Women in Society (KCLWIS) to the affiliate registry.
-- ----------------------------------------------------------------------------
-- One-line addition to public.affiliates (see 20260906010000_affiliates.sql).
-- Codes are stored/compared UPPERCASE; safe to re-run.
-- ============================================================================

insert into public.affiliates (code, name, type) values
  ('KCLWIS', 'KCL Women in Society', 'society')
on conflict (code) do update
  set name = excluded.name, type = excluded.type, active = true;
