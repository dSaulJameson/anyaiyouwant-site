import { dashboardConfigs, generateDashboardRows } from "../lib/dashboard-data.mjs";

const csv = (value) => `"${String(value).replaceAll('"', '""')}"`;

process.stdout.write("begin;\nset role anyaiyouwant_owner;\ntruncate dashboard_observations;\n");
process.stdout.write("copy dashboard_observations (vertical_slug, period_start, segment, location, channel, metrics) from stdin with (format csv);\n");

for (const config of dashboardConfigs) {
  for (const row of generateDashboardRows(config.slug)) {
    process.stdout.write([
      csv(config.slug),
      csv(row.period),
      csv(row.segment),
      csv(row.location),
      csv(row.channel),
      csv(JSON.stringify(row.values)),
    ].join(",") + "\n");
  }
}

process.stdout.write("\\.\ncommit;\n");
