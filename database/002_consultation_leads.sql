create table if not exists consultation_leads (
  id uuid primary key,
  name text not null,
  email text not null,
  company text,
  phone text,
  project_type text not null,
  budget text,
  timeline text,
  brief text not null,
  landing_path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  status text not null default 'new' check (status in ('new','reviewing','contacted','qualified','closed','spam')),
  dedupe_key text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists consultation_leads_status_created_idx
  on consultation_leads (status, created_at desc);

