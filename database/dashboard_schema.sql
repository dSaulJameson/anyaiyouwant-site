create table if not exists dashboard_observations (
  vertical_slug text not null,
  period_start date not null,
  segment text not null,
  location text not null,
  channel text not null,
  metrics jsonb not null,
  created_at timestamptz not null default now(),
  primary key (vertical_slug, period_start, segment, location, channel),
  constraint dashboard_metrics_object check (jsonb_typeof(metrics) = 'object')
);

create index if not exists dashboard_observations_vertical_period_idx
  on dashboard_observations (vertical_slug, period_start desc);

comment on table dashboard_observations is
  'Synthetic demonstration data for Any AI You Want industry dashboards.';
