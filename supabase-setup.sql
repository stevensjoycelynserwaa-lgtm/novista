-- Run this once in your Supabase project's SQL Editor
-- (Project > SQL Editor > New query > paste this > Run)

create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamp with time zone default now(),
  name text not null,
  phone text not null,
  email text not null,
  service_type text not null,
  message text not null
);

-- Allow the public website (using the anon key) to insert new inquiries,
-- but not read, update, or delete existing ones.
alter table public.inquiries enable row level security;

create policy "Allow public inserts"
  on public.inquiries
  for insert
  to anon
  with check (true);

-- To view submissions, go to Table Editor > inquiries in your Supabase dashboard.
