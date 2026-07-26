create table if not exists editorial_story_leads (
  id uuid primary key,
  fingerprint text not null unique,
  content_type text not null check (content_type in ('failure_file','solution_blueprint','expensive_shortcut','build_note')),
  working_title text not null,
  hook text not null,
  summary text not null,
  industry text not null,
  capability text not null,
  why_now text not null,
  failure text not null,
  consequences text not null,
  solution text not null,
  evidence_notes text not null,
  facts jsonb not null default '[]'::jsonb,
  source_urls jsonb not null default '[]'::jsonb,
  evidence_score integer not null default 0 check (evidence_score between 0 and 100),
  novelty_score integer not null default 0 check (novelty_score between 0 and 100),
  commercial_fit_score integer not null default 0 check (commercial_fit_score between 0 and 100),
  significance_score integer not null default 0 check (significance_score between 0 and 100),
  status text not null default 'new' check (status in ('new','drafted','dismissed','published')),
  discovered_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists editorial_story_leads_queue_idx
  on editorial_story_leads (status, significance_score desc, evidence_score desc, novelty_score desc, created_at desc);

create table if not exists editorial_articles (
  id uuid primary key,
  story_lead_id uuid references editorial_story_leads(id) on delete set null,
  slug text not null unique,
  content_type text not null check (content_type in ('failure_file','solution_blueprint','expensive_shortcut','build_note')),
  title text not null,
  dek text not null,
  body_markdown text not null,
  industry text not null,
  capability text not null,
  author_name text not null default 'D. Saul Jameson',
  source_urls jsonb not null default '[]'::jsonb,
  methodology text not null,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists editorial_articles_lead_uidx
  on editorial_articles (story_lead_id) where story_lead_id is not null;
create index if not exists editorial_articles_public_idx
  on editorial_articles (status, published_at desc, created_at desc);

create table if not exists editorial_social_posts (
  id uuid primary key,
  article_id uuid not null unique references editorial_articles(id) on delete cascade,
  caption_linkedin text not null default '',
  caption_instagram text not null default '',
  caption_facebook text not null default '',
  image_headline text not null,
  image_alt text not null,
  image_mime text not null default 'image/jpeg',
  image_data bytea,
  status text not null default 'draft' check (status in ('draft','scheduled','published','archived','failed')),
  scheduled_at timestamptz,
  published_at timestamptz,
  generation_error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists editorial_social_posts_status_idx
  on editorial_social_posts (status, scheduled_at, created_at desc);

create table if not exists editorial_social_deliveries (
  id uuid primary key,
  social_post_id uuid not null references editorial_social_posts(id) on delete cascade,
  provider text not null default 'ghl',
  platform text not null check (platform in ('instagram','linkedin','facebook')),
  account_id text not null,
  account_name text,
  delivery_mode text not null check (delivery_mode in ('draft','scheduled','published')),
  status text not null default 'pending' check (status in ('pending','created','published','cancelled','failed')),
  provider_post_id text,
  scheduled_at timestamptz,
  published_at timestamptz,
  error_message text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists editorial_social_deliveries_post_idx
  on editorial_social_deliveries (social_post_id, created_at desc);

create table if not exists editorial_login_attempts (
  client_key text primary key,
  attempts integer not null default 0,
  blocked_until timestamptz,
  updated_at timestamptz not null default now()
);

create or replace function editorial_set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists editorial_story_leads_updated_at on editorial_story_leads;
create trigger editorial_story_leads_updated_at before update on editorial_story_leads
for each row execute function editorial_set_updated_at();

drop trigger if exists editorial_articles_updated_at on editorial_articles;
create trigger editorial_articles_updated_at before update on editorial_articles
for each row execute function editorial_set_updated_at();

drop trigger if exists editorial_social_posts_updated_at on editorial_social_posts;
create trigger editorial_social_posts_updated_at before update on editorial_social_posts
for each row execute function editorial_set_updated_at();

drop trigger if exists editorial_social_deliveries_updated_at on editorial_social_deliveries;
create trigger editorial_social_deliveries_updated_at before update on editorial_social_deliveries
for each row execute function editorial_set_updated_at();
