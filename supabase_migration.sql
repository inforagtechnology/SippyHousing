-- ============================================================
-- Sippy Housing — Testimonials & Website Settings
-- Run this in the Supabase SQL Editor (Project > SQL Editor > New query)
-- ============================================================

-- ----------------------------------------------------------------
-- 1) TESTIMONIALS TABLE
-- ----------------------------------------------------------------
create table if not exists public.testimonials (
  id           bigint generated always as identity primary key,
  name         text not null,
  designation  text default '',
  review       text not null,
  rating       smallint not null default 5 check (rating between 1 and 5),
  image        text,
  is_published boolean not null default true,
  created_at   timestamptz not null default now()
);

-- Keep a sensible default sort order (newest first) without needing
-- the app to always specify it.
create index if not exists testimonials_created_at_idx
  on public.testimonials (created_at desc);

alter table public.testimonials enable row level security;

-- Anyone (anon + authenticated) can read PUBLISHED testimonials.
-- This is what the public About Us page uses.
drop policy if exists "Public can read published testimonials" on public.testimonials;
create policy "Public can read published testimonials"
  on public.testimonials
  for select
  to anon, authenticated
  using (is_published = true);

-- Authenticated admins can read ALL testimonials (including unpublished),
-- so the admin list shows everything regardless of publish state.
drop policy if exists "Authenticated can read all testimonials" on public.testimonials;
create policy "Authenticated can read all testimonials"
  on public.testimonials
  for select
  to authenticated
  using (true);

-- Only authenticated users (admins) can insert / update / delete.
drop policy if exists "Authenticated can insert testimonials" on public.testimonials;
create policy "Authenticated can insert testimonials"
  on public.testimonials
  for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated can update testimonials" on public.testimonials;
create policy "Authenticated can update testimonials"
  on public.testimonials
  for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated can delete testimonials" on public.testimonials;
create policy "Authenticated can delete testimonials"
  on public.testimonials
  for delete
  to authenticated
  using (true);

-- Optional: a couple of seed rows so the section isn't empty on first load.
-- Safe to delete from the admin panel afterwards.
insert into public.testimonials (name, designation, review, rating)
select 'Rohit Patel', 'Homebuyer, Worli', 'Sippy Housing made our first home purchase smooth and transparent from start to finish.', 5
where not exists (select 1 from public.testimonials);


-- ----------------------------------------------------------------
-- 2) WEBSITE_SETTINGS TABLE  (single row, id = 1)
-- ----------------------------------------------------------------
create table if not exists public.website_settings (
  id               bigint primary key default 1,
  company_name     text default 'Sippy Housing',
  company_email    text default '',
  company_phone    text default '',
  company_address  text default '',
  facebook_url     text default '',
  instagram_url    text default '',
  linkedin_url     text default '',
  youtube_url      text default '',
  footer_copyright text default '',
  logo_url         text default '',
  favicon_url      text default '',
  quick_links      jsonb default '[]'::jsonb,  -- [{ "label": "About Us", "url": "/about" }, ...]
  updated_at       timestamptz not null default now(),

  -- enforce single-row table
  constraint website_settings_singleton check (id = 1)
);

alter table public.website_settings enable row level security;

-- Anyone can read settings (footer/contact info is public-facing).
drop policy if exists "Public can read website settings" on public.website_settings;
create policy "Public can read website settings"
  on public.website_settings
  for select
  to anon, authenticated
  using (true);

-- Only authenticated admins can update. (No insert/delete policy on
-- purpose — this is a singleton row seeded once below.)
drop policy if exists "Authenticated can update website settings" on public.website_settings;
create policy "Authenticated can update website settings"
  on public.website_settings
  for update
  to authenticated
  using (id = 1)
  with check (id = 1);

-- Seed the single settings row if it doesn't exist yet.
insert into public.website_settings (id, company_name, company_email, company_phone, quick_links)
values (
  1,
  'Sippy Housing',
  'info@sippyhousing.com',
  '7777030607',
  '[
    {"label": "About Us", "url": "/about"},
    {"label": "Properties", "url": "/#properties"},
    {"label": "Contact", "url": "/#contact"},
    {"label": "Favorites", "url": "/favorites"}
  ]'::jsonb
)
on conflict (id) do nothing;

-- Keep updated_at fresh automatically on every update.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists website_settings_set_updated_at on public.website_settings;
create trigger website_settings_set_updated_at
  before update on public.website_settings
  for each row
  execute function public.set_updated_at();
