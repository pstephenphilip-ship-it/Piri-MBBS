-- ============================================================================
-- Add KCL Women in Medicine (KCLWIM) to the affiliate registry.
-- ----------------------------------------------------------------------------
-- Supersedes the KCLWIS row from 20261001000000_affiliate_kclwis.sql (that name
-- was wrong). Removes KCLWIS if present and adds the corrected KCLWIM.
-- Codes are stored/compared UPPERCASE; safe to run whether or not KCLWIS was
-- ever applied; safe to re-run.
-- ============================================================================

delete from public.affiliates where code = 'KCLWIS';

insert into public.affiliates (code, name, type) values
  ('KCLWIM', 'KCL Women in Medicine', 'society')
on conflict (code) do update
  set name = excluded.name, type = excluded.type, active = true;
