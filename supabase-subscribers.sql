-- Newsletter subscribers for The Singleton.
-- Run once in the Supabase SQL editor after supabase-setup.sql.

create table if not exists public.subscribers (
  id bigserial primary key,
  email text unique not null check (email = lower(email) and position('@' in email) > 1),
  novel_slug text not null default 'the-senior-observer',
  language text not null default 'en' check (language in ('en', 'zh')),
  source text,
  created_at timestamptz not null default now(),
  confirmed_at timestamptz,
  unsubscribed_at timestamptz
);

create index if not exists subscribers_novel_slug_idx
  on public.subscribers (novel_slug);
create index if not exists subscribers_created_at_idx
  on public.subscribers (created_at desc);

-- RLS: lock the table down. Public client (anon) cannot read or write.
-- Inserts go through the /api/subscribe API route, which uses the service-role
-- key on the server. The service role bypasses RLS automatically.
alter table public.subscribers enable row level security;

-- No policies = no public access. Done.

comment on table public.subscribers is
  'Newsletter signups. Inserts via /api/subscribe (service role). No public RLS.';
