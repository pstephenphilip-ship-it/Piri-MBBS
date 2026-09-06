-- ============================================================================
-- Official affiliate registry (societies + individuals)
-- ----------------------------------------------------------------------------
-- One row per official affiliate code. The sign-up / Edit-profile referral field
-- looks a typed code up here (anon-readable) to show "✓ Supporting <name>", and
-- the referral_stats report joins it so you see names, not just raw codes.
-- Codes are stored/compared UPPERCASE (the app uppercases what the user types).
-- Add a future affiliate with a one-line INSERT — no app redeploy needed.
-- ============================================================================

create table if not exists public.affiliates (
  code       text primary key,
  name       text not null,
  type       text not null default 'individual' check (type in ('individual','society')),
  active     boolean not null default true,
  created_at timestamptz not null default now()
);

-- Anyone (incl. signed-out visitors on the sign-up form) may read ACTIVE affiliates
-- so their code can be confirmed. Only you (dashboard / service role) can add or edit.
alter table public.affiliates enable row level security;
drop policy if exists "read active affiliates" on public.affiliates;
create policy "read active affiliates" on public.affiliates for select using (active);

-- Seed the first official affiliates. Edit names/types freely; NEUROQM assumed a society.
insert into public.affiliates (code, name, type) values
  ('PIRI',     'Piri',                       'individual'),
  ('ANANYA',   'Ananya',                     'individual'),
  ('YIHSIU',   'Yihsiu',                     'individual'),
  ('THARUN',   'Tharun',                     'individual'),
  ('KAVIN',    'Kavin',                      'individual'),
  ('VISAKAN',  'Visakan',                    'individual'),
  ('SHREYASH', 'Shreyash',                   'individual'),
  ('NEUROQM',  'QMUL Neuroscience Society',  'society')
on conflict (code) do update
  set name = excluded.name, type = excluded.type, active = true;

-- Report, now with the affiliate's name/type alongside the numbers.
-- Drop first: CREATE OR REPLACE VIEW cannot reorder/rename existing columns, and this
-- version inserts affiliate/affiliate_type ahead of the original columns.
drop view if exists public.referral_stats;
create view public.referral_stats as
select
  p.ref_code                                                        as code,
  a.name                                                            as affiliate,
  a.type                                                            as affiliate_type,
  count(*)                                                          as signups,
  count(*) filter (where m.status in ('active','trialing'))         as active_members,
  round(coalesce(sum(pp.amount_gbp / pp.period_months)
        filter (where m.status in ('active','trialing')), 0), 2)    as mrr_gbp,
  round(coalesce(sum(pp.amount_gbp)
        filter (where m.status in ('active','trialing')), 0), 2)    as billed_per_period_gbp
from public.profiles p
left join public.affiliates  a  on a.code = upper(p.ref_code)
left join public.memberships m  on m.user_id = p.id
left join public.plan_prices pp on pp.price_id = m.plan
where p.ref_code is not null and p.ref_code <> ''
group by p.ref_code, a.name, a.type
order by active_members desc, signups desc;

revoke all on public.referral_stats from anon, authenticated;
